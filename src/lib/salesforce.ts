import jsforce from 'jsforce';

interface SalesforceConfig {
  loginUrl: string;
  username: string;
  password: string;
  securityToken: string;
}

const config: SalesforceConfig = {
  loginUrl: process.env.SALESFORCE_LOGIN_URL || 'https://login.salesforce.com',
  username: process.env.SALESFORCE_USERNAME || '',
  password: process.env.SALESFORCE_PASSWORD || '',
  securityToken: process.env.SALESFORCE_SECURITY_TOKEN || '',
};

let connection: jsforce.Connection | null = null;

export async function getSalesforceConnection(): Promise<jsforce.Connection> {
  if (connection && connection.accessToken) {
    return connection;
  }

  connection = new jsforce.Connection({
    loginUrl: config.loginUrl,
  });

  try {
    await connection.login(
      config.username,
      config.password + config.securityToken
    );
    return connection;
  } catch (error) {
    console.error('Salesforce login error:', error);
    throw new Error('Failed to connect to Salesforce');
  }
}

export interface Opportunity {
  Id: string;
  Name: string;
  Amount: number;
  StageName: string;
  CloseDate: string;
  Probability: number;
  AccountName?: string;
  Owner?: {
    Name: string;
  };
}

export async function getOpenOpportunities(ownerId?: string) {
  try {
    const conn = await getSalesforceConnection();
    
    let query = `
      SELECT Id, Name, Amount, StageName, CloseDate, Probability, 
             Account.Name, Owner.Name
      FROM Opportunity
      WHERE IsClosed = false
    `;

    if (ownerId) {
      query += ` AND OwnerId = '${ownerId}'`;
    }

    query += ' ORDER BY CloseDate ASC LIMIT 50';

    const result = await conn.query(query);
    return result.records as any[];
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    throw error;
  }
}

export async function getOpportunitiesByStage(stage: string) {
  try {
    const conn = await getSalesforceConnection();
    
    const query = `
      SELECT Id, Name, Amount, StageName, CloseDate, Probability,
             Account.Name, Owner.Name
      FROM Opportunity
      WHERE StageName = '${stage}' AND IsClosed = false
      ORDER BY Amount DESC
      LIMIT 20
    `;

    const result = await conn.query(query);
    return result.records as any[];
  } catch (error) {
    console.error('Error fetching opportunities by stage:', error);
    throw error;
  }
}

export async function getTotalPipelineValue(ownerId?: string) {
  try {
    const conn = await getSalesforceConnection();
    
    let query = `
      SELECT SUM(Amount) totalValue, COUNT(Id) totalCount
      FROM Opportunity
      WHERE IsClosed = false
    `;

    if (ownerId) {
      query += ` AND OwnerId = '${ownerId}'`;
    }

    const result = await conn.query(query);
    return result.records[0] as any;
  } catch (error) {
    console.error('Error calculating pipeline value:', error);
    throw error;
  }
}

export async function getRecentlyUpdatedOpportunities(days: number = 7) {
  try {
    const conn = await getSalesforceConnection();
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - days);
    
    const query = `
      SELECT Id, Name, Amount, StageName, CloseDate, LastModifiedDate,
             Account.Name, Owner.Name
      FROM Opportunity
      WHERE LastModifiedDate >= ${dateThreshold.toISOString()}
        AND IsClosed = false
      ORDER BY LastModifiedDate DESC
      LIMIT 15
    `;

    const result = await conn.query(query);
    return result.records as any[];
  } catch (error) {
    console.error('Error fetching recently updated opportunities:', error);
    throw error;
  }
}