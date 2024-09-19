import {
  AccountInfo,
  Cluster,
  clusterApiUrl,
  Commitment,
  ConfirmedSignatureInfo,
  Connection,
  LAMPORTS_PER_SOL,
  ParsedAccountData,
  ParsedTransactionWithMeta,
  PublicKey,
  RpcResponseAndContext,
  TransactionSignature
} from '@solana/web3.js';

class SolanaService {
  private static connection: Connection | null = null;

  // Private method to initialize the connection only once
  private static getConnection(
    clusterUrl: Cluster = 'devnet',
    commitment: Commitment = 'confirmed'
  ): Connection {
    if (!this.connection) {
      this.connection = new Connection(clusterApiUrl(clusterUrl), commitment);
    }
    return this.connection;
  }

  // Fetch account information for a given public key
  async getAccountInfo(
    publicKey: string,
    clusterUrl: Cluster = 'devnet'
  ): Promise<RpcResponseAndContext<AccountInfo<Buffer | ParsedAccountData> | null>> {
    try {
      const connection = SolanaService.getConnection(clusterUrl);
      const wallet = new PublicKey(publicKey);
      return await connection.getParsedAccountInfo(wallet);
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }
  async getSignaturesForAddress(
    publicKey: string,
    limit: number = 25,
    clusterUrl: Cluster = 'devnet',
    before?: string
  ): Promise<Array<ConfirmedSignatureInfo>> {
    try {
      let params = {};

      if (before) {
        params = { ...params, before: before };
      }
      if (limit) {
        params = { ...params, limit: limit };
      }
      const connection = SolanaService.getConnection(clusterUrl);
      const wallet = new PublicKey(publicKey);
      return await connection.getSignaturesForAddress(wallet, { ...params });
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  // Fetch balance for a given public key
  async getBalance(publicKey: string, clusterUrl: Cluster = 'devnet'): Promise<number | null> {
    try {
      const connection = SolanaService.getConnection(clusterUrl);
      const wallet = new PublicKey(publicKey);
      const balance = await connection.getBalance(wallet);
      return balance / LAMPORTS_PER_SOL; // Convert lamports to SOL
    } catch (error) {
      console.error('Error fetching balance:', error);
      return null;
    }
  }

  async getParsedTransaction(
    signature: TransactionSignature,
    clusterUrl: Cluster = 'devnet'
  ): Promise<ParsedTransactionWithMeta | null> {
    try {
      const connection = SolanaService.getConnection(clusterUrl);
      return await connection.getParsedTransaction(signature, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0
      });
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }
  async requestAirDrop(
    publicKey: string,
    lamports: number,
    clusterUrl: Cluster = 'devnet'
  ): Promise<TransactionSignature | null> {
    const publicK = new PublicKey(publicKey);
    try {
      const connection = SolanaService.getConnection(clusterUrl);
      return await connection.requestAirdrop(publicK, lamports);
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }
}

export default new SolanaService(); // Export a single instance of the service
