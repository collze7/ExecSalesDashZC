# Deployment Guide

## Overview
This guide covers deploying the Sales Executive Dashboard to various platforms.

## Prerequisites
- Node.js 18+ installed
- Docker installed (for container deployment)
- API credentials configured
- Domain name (for production)
- SSL certificate (for HTTPS)

## Environment Configuration

### Production Environment Variables
Create a `.env.production` file:

```env
# Application
NEXT_PUBLIC_APP_URL=https://dashboard.resourcepro.com
NODE_ENV=production

# Microsoft Graph API
MICROSOFT_CLIENT_ID=your_production_client_id
MICROSOFT_CLIENT_SECRET=your_production_secret
MICROSOFT_TENANT_ID=your_tenant_id
MICROSOFT_REDIRECT_URI=https://dashboard.resourcepro.com/api/auth/callback

# Salesforce API
SALESFORCE_CLIENT_ID=your_salesforce_client_id
SALESFORCE_CLIENT_SECRET=your_salesforce_secret
SALESFORCE_USERNAME=your_username
SALESFORCE_PASSWORD=your_password
SALESFORCE_SECURITY_TOKEN=your_token
SALESFORCE_LOGIN_URL=https://login.salesforce.com

# Weather API
OPENWEATHERMAP_API_KEY=your_api_key
WEATHER_LOCATION=New York,US
WEATHER_UNITS=imperial

# Writer API
WRITER_API_KEY=your_writer_api_key
WRITER_ORG_ID=your_org_id

# Dashboard
DASHBOARD_USER_EMAIL=your_email@resourcepro.com
DASHBOARD_REFRESH_INTERVAL=300000

# News API
NEWS_API_KEY=your_news_api_key

# Security
API_SECRET_KEY=your_secure_production_key
WEBHOOK_SECRET=your_webhook_secret_production
```

## Deployment Options

### Option 1: Vercel (Recommended)

**Pros:**
- Zero-config deployment
- Automatic HTTPS
- Global CDN
- Serverless functions
- Easy environment management

**Steps:**

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-org/dashboard.git
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Configure project settings

3. **Add Environment Variables**
- Go to Project Settings > Environment Variables
- Add all variables from `.env.production`
- Save and redeploy

4. **Custom Domain**
- Go to Project Settings > Domains
- Add your custom domain
- Follow DNS configuration instructions

5. **Deploy**
```bash
# Deploy via Vercel CLI
npm i -g vercel
vercel --prod
```

### Option 2: Docker on AWS ECS

**Pros:**
- Full control over infrastructure
- Scalable container orchestration
- Integration with other AWS services

**Steps:**

1. **Build Docker Image**
```bash
docker build -t sales-dashboard:latest .
```

2. **Push to Amazon ECR**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag sales-dashboard:latest \
  <account-id>.dkr.ecr.us-east-1.amazonaws.com/sales-dashboard:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/sales-dashboard:latest
```

3. **Create ECS Task Definition**
```json
{
  "family": "sales-dashboard",
  "containerDefinitions": [
    {
      "name": "dashboard",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/sales-dashboard:latest",
      "memory": 512,
      "cpu": 256,
      "essential": true,
      "portMappings": [
        {
          "containerPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "NODE_ENV", "value": "production"}
      ],
      "secrets": [
        {"name": "MICROSOFT_CLIENT_ID", "valueFrom": "arn:aws:secretsmanager:..."}
      ]
    }
  ]
}
```

4. **Create ECS Service**
```bash
aws ecs create-service \
  --cluster production \
  --service-name sales-dashboard \
  --task-definition sales-dashboard \
  --desired-count 2 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxx],securityGroups=[sg-xxx]}"
```

### Option 3: Azure App Service

**Steps:**

1. **Create App Service**
```bash
az webapp create \
  --resource-group myResourceGroup \
  --plan myAppServicePlan \
  --name sales-dashboard \
  --runtime "NODE|18-lts"
```

2. **Configure Environment Variables**
```bash
az webapp config appsettings set \
  --resource-group myResourceGroup \
  --name sales-dashboard \
  --settings @env.json
```

3. **Deploy with Docker**
```bash
az webapp config container set \
  --name sales-dashboard \
  --resource-group myResourceGroup \
  --docker-custom-image-name sales-dashboard:latest \
  --docker-registry-server-url https://myregistry.azurecr.io
```

### Option 4: Self-Hosted Server

**Requirements:**
- Ubuntu 20.04+ or similar
- Nginx for reverse proxy
- SSL certificate (Let's Encrypt)
- Docker and Docker Compose

**Steps:**

1. **Install Dependencies**
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Install Nginx
sudo apt install nginx -y
```

2. **Configure Nginx**
```nginx
# /etc/nginx/sites-available/dashboard
server {
    listen 80;
    server_name dashboard.resourcepro.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

3. **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/dashboard /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

4. **Install SSL Certificate**
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d dashboard.resourcepro.com
```

5. **Deploy Application**
```bash
# Clone repository
git clone https://github.com/your-org/dashboard.git
cd dashboard

# Create .env file
nano .env

# Start with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f
```

6. **Set Up Auto-Start**
```bash
# Create systemd service
sudo nano /etc/systemd/system/dashboard.service
```

```ini
[Unit]
Description=Sales Dashboard
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
RemainAfterExit=yes
WorkingDirectory=/home/user/dashboard
ExecStart=/usr/local/bin/docker-compose up -d
ExecStop=/usr/local/bin/docker-compose down

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable dashboard
sudo systemctl start dashboard
```

## Post-Deployment Checklist

### 1. Verify Functionality
```bash
# Test all API endpoints
curl https://your-domain.com/api/weather
curl https://your-domain.com/api/calendar
curl https://your-domain.com/api/opportunities
curl https://your-domain.com/api/news
```

### 2. Configure Monitoring
- Set up application monitoring (e.g., Datadog, New Relic)
- Configure error tracking (e.g., Sentry)
- Set up uptime monitoring (e.g., Pingdom, UptimeRobot)

### 3. Security Configuration
- Enable HTTPS
- Configure CORS properly
- Set up rate limiting
- Rotate secrets regularly
- Enable security headers

### 4. Performance Optimization
- Enable caching
- Configure CDN
- Optimize images
- Enable compression
- Set up database indexing

### 5. Backup Strategy
- Configure automated backups
- Test restore procedures
- Document recovery process

## Scaling Considerations

### Horizontal Scaling
```yaml
# docker-compose.yml with multiple instances
version: '3.8'
services:
  dashboard:
    image: sales-dashboard:latest
    deploy:
      replicas: 3
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
```

### Load Balancing
```nginx
upstream dashboard_backend {
    server dashboard1:3000;
    server dashboard2:3000;
    server dashboard3:3000;
}

server {
    location / {
        proxy_pass http://dashboard_backend;
    }
}
```

## Rollback Procedure

### Vercel
```bash
# List deployments
vercel ls

# Rollback to previous
vercel rollback <deployment-url>
```

### Docker
```bash
# Pull previous image version
docker pull sales-dashboard:previous

# Update and restart
docker-compose down
docker-compose up -d
```

## Monitoring & Maintenance

### Log Management
```bash
# View application logs
docker-compose logs -f dashboard

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Health Checks
```bash
# Add health check endpoint
# src/app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'healthy', timestamp: new Date() });
}
```

### Automated Updates
```bash
# Create update script
#!/bin/bash
cd /home/user/dashboard
git pull origin main
docker-compose build
docker-compose up -d
```

## Troubleshooting

### Issue: 502 Bad Gateway
**Solution:**
- Check if application is running: `docker ps`
- Check application logs: `docker-compose logs`
- Verify port mapping in docker-compose.yml

### Issue: Environment Variables Not Loading
**Solution:**
- Verify .env file exists and is readable
- Check docker-compose.yml env_file configuration
- Restart containers: `docker-compose restart`

### Issue: High Memory Usage
**Solution:**
- Increase memory limits in docker-compose.yml
- Enable Node.js memory optimization
- Implement caching strategy

## Support & Resources

- **Documentation**: `/docs` folder
- **API Reference**: `docs/API_DOCUMENTATION.md`
- **Playbook Guide**: `docs/WRITER_PLAYBOOK.md`
- **GitHub Issues**: [Repository Issues](https://github.com/your-org/dashboard/issues)