import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';
import AWS from 'aws-sdk';
import axios from 'axios';

export async function POST(req) {
  const { query, budget, traffic, techStack, database, trafficPattern } = await req.json();

  if (!query || !budget || !traffic) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  try {
    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Enhanced prompt
    const prompt = `
      You are an expert cloud service advisor with deep knowledge of AWS, DigitalOcean, Hostinger, Google Cloud Platform, Microsoft Azure, and Oracle Cloud Infrastructure. Based on the following user input, provide detailed, actionable recommendations for cloud hosting services:
      - Project description: "${query}"
      - Monthly budget: $${budget} (strict limit, prioritize options within this amount)
      - Expected monthly traffic: ${traffic} users (consider both current and potential growth)
      - Tech stack: "${techStack || 'Not specified'}"
      - Database needs: "${database || 'None'}"
      - Traffic pattern: "${trafficPattern || 'Steady'}"

      Provide your response in this structured format:
      1. **Recommended Cloud Providers**:
         - For each provider, include:
           - Specific service/plan (e.g., "AWS EC2 t3.micro")
           - Estimated monthly cost (stay within $${budget} unless no viable options)
           - Key features (e.g., CPU, RAM, storage, bandwidth)
           - Why it suits the project (brief reasoning)
      2. **Scalability Tips**:
         - Suggest at least 2 specific strategies (e.g., load balancing, CDN, auto-scaling)
      3. **Deployment Guide**:
         - For each recommended provider, provide a concise 3-5 step guide to deploy the project.

      Ensure recommendations match the project's technical needs, respect the budget, and are actionable.
    `;

    // Generate AI recommendations
    const result = await model.generateContent(prompt);
    const recommendation = await result.response.text();

    // Fetch AWS Pricing dynamically
    AWS.config.update({
      region: 'us-east-1',
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const pricing = new AWS.Pricing();
    let awsPrice;
    try {
      const awsData = await pricing
        .getProducts({
          ServiceCode: 'AmazonEC2',
          Filters: [
            { Type: 'TERM_MATCH', Field: 'instanceType', Value: 't3.micro' },
            { Type: 'TERM_MATCH', Field: 'location', Value: 'US East (N. Virginia)' },
          ],
        })
        .promise();
      awsPrice = awsData.PriceList[0]
        ? JSON.parse(awsData.PriceList[0]).terms.OnDemand[
            Object.keys(JSON.parse(awsData.PriceList[0]).terms.OnDemand)[0]
          ].priceDimensions[
            Object.keys(
              JSON.parse(awsData.PriceList[0]).terms.OnDemand[
                Object.keys(JSON.parse(awsData.PriceList[0]).terms.OnDemand)[0]
              ].priceDimensions
            )[0]
          ].pricePerUnit.USD * 730
        : 10.15;
    } catch (awsError) {
      console.error('AWS Pricing Error:', awsError);
      awsPrice = 10.15; // Fallback
    }

    // // Fetch DigitalOcean sizes (semi-dynamic)
    let doPrice;
    try {
      const doResponse = await axios.get('https://api.digitalocean.com/v2/sizes', {
        headers: { Authorization: `Bearer ${process.env.DIGITALOCEAN_API_TOKEN}` },
      });
      doPrice = doResponse.data.sizes.find(size => size.slug === 's-2vcpu-4gb')?.price_monthly || 10.00;
    } catch (doError) {
      console.error('DigitalOcean Error:', doError);
      doPrice = 10.00; // Fallback
    }

    // Pricing options with affiliate links
    const pricingOptions = [
      { provider: 'AWS', cost: 10.15, features: '2 vCPUs, 1GB RAM, 10GB SSD', minTraffic: 1000, uptime: '99.99%', affiliateLink: 'https://aws.amazon.com' },
      { provider: 'DigitalOcean', cost: doPrice, features: '2 vCPUs, 4GB RAM, 25GB SSD', minTraffic: 500, uptime: '99.95%', affiliateLink: 'https://www.digitalocean.com/' },
      { provider: 'Hostinger', cost: 9.99, features: '2 vCPUs, 4GB RAM, 200GB NVMe', minTraffic: 100, uptime: '99.90%', affiliateLink: 'https://www.hostinger.com' },
      { provider: 'Google Cloud Platform', cost: 13.50, features: '2 vCPUs, 1GB RAM, 10GB SSD', minTraffic: 1000, uptime: '99.98%', affiliateLink: 'https://cloud.google.com' },
      { provider: 'Microsoft Azure', cost: 12.40, features: '2 vCPUs, 4GB RAM, 16GB SSD', minTraffic: 800, uptime: '99.95%', affiliateLink: 'https://azure.microsoft.com' },
      { provider: 'Oracle Cloud Infrastructure', cost: 8.50, features: '1 vCPU, 1GB RAM, 20GB SSD', minTraffic: 200, uptime: '99.95%', affiliateLink: 'https://www.oracle.com/cloud' },
    
      // Additional Providers
      { provider: 'Linode', cost: 10.00, features: '1 vCPU, 2GB RAM, 50GB SSD', minTraffic: 300, uptime: '99.99%', affiliateLink: 'https://www.linode.com' },
      { provider: 'Vultr', cost: 6.00, features: '1 vCPU, 1GB RAM, 25GB SSD', minTraffic: 250, uptime: '99.95%', affiliateLink: 'https://www.vultr.com' },
      { provider: 'Hetzner Cloud', cost: 4.50, features: '1 vCPU, 2GB RAM, 20GB SSD', minTraffic: 200, uptime: '99.99%', affiliateLink: 'https://www.hetzner.com/cloud' },
      { provider: 'Kamatera', cost: 4.00, features: '1 vCPU, 1GB RAM, 20GB SSD', minTraffic: 150, uptime: '99.95%', affiliateLink: 'https://www.kamatera.com' },
      { provider: 'UpCloud', cost: 5.00, features: '1 vCPU, 1GB RAM, 25GB MaxIOPS', minTraffic: 300, uptime: '99.99%', affiliateLink: 'https://upcloud.com' },
      { provider: 'Scaleway', cost: 3.99, features: '1 vCPU, 2GB RAM, 20GB SSD', minTraffic: 200, uptime: '99.90%', affiliateLink: 'https://www.scaleway.com' },
      { provider: 'OVHcloud', cost: 5.50, features: '1 vCPU, 2GB RAM, 40GB SSD', minTraffic: 250, uptime: '99.95%', affiliateLink: 'https://www.ovhcloud.com' },
      { provider: 'Alibaba Cloud', cost: 11.00, features: '2 vCPUs, 4GB RAM, 40GB SSD', minTraffic: 700, uptime: '99.95%', affiliateLink: 'https://www.alibabacloud.com' },
      { provider: 'Tencent Cloud', cost: 9.00, features: '2 vCPUs, 4GB RAM, 50GB SSD', minTraffic: 600, uptime: '99.90%', affiliateLink: 'https://intl.cloud.tencent.com' },
    
      // Additional Providers
      { provider: 'AWS Lightsail', cost: 5.00, features: '1 vCPU, 1GB RAM, 20GB SSD', minTraffic: 300, uptime: '99.99%', affiliateLink: 'https://aws.amazon.com/lightsail' },
      { provider: 'Bluehost', cost: 7.99, features: '2 vCPUs, 4GB RAM, 50GB SSD', minTraffic: 500, uptime: '99.90%', affiliateLink: 'https://www.bluehost.com' },
      { provider: 'GreenGeeks', cost: 10.95, features: '2 vCPUs, 3GB RAM, 50GB SSD', minTraffic: 300, uptime: '99.95%', affiliateLink: 'https://www.greengeeks.com' },
      { provider: 'SiteGround', cost: 6.99, features: '1 vCPU, 2GB RAM, 20GB SSD', minTraffic: 400, uptime: '99.99%', affiliateLink: 'https://www.siteground.com' },
      { provider: 'A2 Hosting', cost: 4.99, features: '1 vCPU, 2GB RAM, 30GB SSD', minTraffic: 200, uptime: '99.95%', affiliateLink: 'https://www.a2hosting.com' },
      { provider: 'FastComet', cost: 6.95, features: '2 vCPUs, 3GB RAM, 35GB SSD', minTraffic: 250, uptime: '99.99%', affiliateLink: 'https://www.fastcomet.com' },
      { provider: 'Cloudways', cost: 12.00, features: '2 vCPUs, 4GB RAM, 40GB SSD', minTraffic: 600, uptime: '99.95%', affiliateLink: 'https://www.cloudways.com' },
      { provider: 'Vexxhost', cost: 7.99, features: '2 vCPUs, 4GB RAM, 50GB SSD', minTraffic: 300, uptime: '99.98%', affiliateLink: 'https://vexxhost.com' },
      { provider: 'Contabo', cost: 8.00, features: '2 vCPUs, 4GB RAM, 60GB SSD', minTraffic: 400, uptime: '99.90%', affiliateLink: 'https://www.contabo.com' },
      { provider: 'DreamHost', cost: 10.00, features: '1 vCPU, 2GB RAM, 30GB SSD', minTraffic: 200, uptime: '99.95%', affiliateLink: 'https://www.dreamhost.com' },
      { provider: 'Ionos', cost: 4.00, features: '1 vCPU, 1GB RAM, 10GB SSD', minTraffic: 100, uptime: '99.90%', affiliateLink: 'https://www.ionos.com' },
    
      // More Providers
      { provider: 'Vultr Cloud Compute', cost: 7.00, features: '2 vCPUs, 4GB RAM, 50GB SSD', minTraffic: 500, uptime: '99.95%', affiliateLink: 'https://www.vultr.com/cloud-compute' },
      { provider: 'Exoscale', cost: 5.00, features: '1 vCPU, 2GB RAM, 30GB SSD', minTraffic: 200, uptime: '99.99%', affiliateLink: 'https://www.exoscale.com' },
      { provider: 'Lunanode', cost: 4.50, features: '1 vCPU, 2GB RAM, 40GB SSD', minTraffic: 300, uptime: '99.99%', affiliateLink: 'https://www.lunanode.com' },
      { provider: 'Hostwinds', cost: 8.99, features: '2 vCPUs, 4GB RAM, 30GB SSD', minTraffic: 400, uptime: '99.99%', affiliateLink: 'https://www.hostwinds.com' },
      { provider: 'InterServer', cost: 6.00, features: '2 vCPUs, 4GB RAM, 30GB SSD', minTraffic: 300, uptime: '99.90%', affiliateLink: 'https://www.interserver.net' },
      { provider: 'Paperspace', cost: 12.00, features: '2 vCPUs, 4GB RAM, 40GB SSD', minTraffic: 600, uptime: '99.99%', affiliateLink: 'https://www.paperspace.com' },
      { provider: 'UpStack', cost: 10.00, features: '2 vCPUs, 8GB RAM, 100GB SSD', minTraffic: 800, uptime: '99.99%', affiliateLink: 'https://www.upstack.co' },
      { provider: 'Rackspace', cost: 13.00, features: '2 vCPUs, 8GB RAM, 50GB SSD', minTraffic: 1000, uptime: '99.99%', affiliateLink: 'https://www.rackspace.com' },
      { provider: 'Webdock', cost: 6.99, features: '1 vCPU, 2GB RAM, 30GB SSD', minTraffic: 200, uptime: '99.95%', affiliateLink: 'https://www.webdock.io' }
    ];
    

    // Filter pricing
    const filteredPricing = pricingOptions.filter(
      (option) => option.cost <= budget && option.minTraffic <= traffic
    );

    // Cost projections
    const yearlyCosts = pricingOptions.map(option => ({
      ...option,
      yearlyCost: option.cost * 12,
      savingsWithCDN: option.cost * 12 * 0.9, // 10% savings estimate
    }));

    return NextResponse.json({
      recommendation,
      pricing: filteredPricing.length > 0 ? filteredPricing : pricingOptions,
      yearlyCosts,
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to generate recommendations' }, { status: 500 });
  }
}