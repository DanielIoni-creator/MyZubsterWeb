/**
 * 💰 Payment Service - Sistema Pagamenti
 */

class PaymentService {
    constructor() {
        this.payments = [];
        this.initPayments();
    }

    // Inizializza pagamenti
    initPayments() {
        this.payments = [
            {
                id: 'pay_1',
                userId: 'user_1',
                amount: 25,
                currency: 'MYZ',
                status: 'completed',
                description: 'Acquisto Salvia Quantica',
                createdAt: new Date().toISOString()
            },
            {
                id: 'pay_2',
                userId: 'user_2',
                amount: 15,
                currency: 'MYZ',
                status: 'pending',
                description: 'Acquisto Rosa Antica',
                createdAt: new Date().toISOString()
            },
            {
                id: 'pay_3',
                userId: 'user_1',
                amount: 50,
                currency: 'XMR',
                status: 'completed',
                description: 'Bounty completato',
                createdAt: new Date().toISOString()
            }
        ];
    }

    // Crea pagamento
    async createPayment(paymentData) {
        try {
            const payment = {
                id: `pay_${Date.now()}`,
                ...paymentData,
                status: 'pending',
                createdAt: new Date().toISOString()
            };
            this.payments.push(payment);
            
            // Genera QR code (simulato)
            const qrData = {
                address: 'myz_77d6ddd05bf30e8fef178ac1b5b5e112',
                amount: paymentData.amount,
                currency: paymentData.currency,
                id: payment.id
            };

            return {
                success: true,
                payment: payment,
                qrData: qrData,
                message: '💰 Pagamento creato con successo!'
            };
        } catch (error) {
            console.error('❌ Errore createPayment:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni pagamenti utente
    async getUserPayments(userId) {
        try {
            const payments = this.payments.filter(p => p.userId === userId);
            return {
                success: true,
                payments: payments,
                total: payments.length,
                totalAmount: payments.reduce((sum, p) => sum + p.amount, 0)
            };
        } catch (error) {
            console.error('❌ Errore getUserPayments:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni pagamento per ID
    async getPaymentById(id) {
        try {
            const payment = this.payments.find(p => p.id === id);
            if (!payment) {
                throw new Error('Pagamento non trovato');
            }
            return {
                success: true,
                payment: payment
            };
        } catch (error) {
            console.error('❌ Errore getPaymentById:', error);
            return { success: false, error: error.message };
        }
    }

    // Aggiorna pagamento
    async updatePayment(id, status) {
        try {
            const payment = this.payments.find(p => p.id === id);
            if (!payment) {
                throw new Error('Pagamento non trovato');
            }
            payment.status = status;
            payment.updatedAt = new Date().toISOString();
            return {
                success: true,
                payment: payment,
                message: `✅ Pagamento aggiornato a: ${status}`
            };
        } catch (error) {
            console.error('❌ Errore updatePayment:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni statistiche
    async getStats() {
        try {
            const total = this.payments.length;
            const completed = this.payments.filter(p => p.status === 'completed').length;
            const pending = this.payments.filter(p => p.status === 'pending').length;
            const totalAmount = this.payments
                .filter(p => p.status === 'completed')
                .reduce((sum, p) => sum + p.amount, 0);

            const byCurrency = {};
            this.payments.forEach(p => {
                byCurrency[p.currency] = (byCurrency[p.currency] || 0) + p.amount;
            });

            return {
                success: true,
                stats: {
                    total: total,
                    completed: completed,
                    pending: pending,
                    totalAmount: totalAmount,
                    byCurrency: byCurrency,
                    completionRate: total > 0 ? (completed / total * 100).toFixed(1) : 0
                }
            };
        } catch (error) {
            console.error('❌ Errore getStats:', error);
            return { success: false, error: error.message };
        }
    }

    // Webhook per pagamenti
    async webhookHandler(data) {
        try {
            const { paymentId, status, txHash } = data;
            
            const payment = this.payments.find(p => p.id === paymentId);
            if (!payment) {
                throw new Error('Pagamento non trovato');
            }

            payment.status = status;
            payment.txHash = txHash;
            payment.updatedAt = new Date().toISOString();

            // Se pagamento completato, aggiorna wallet utente
            if (status === 'completed') {
                // In produzione, qui si aggiorna il wallet
                console.log(`💰 Pagamento ${paymentId} completato!`);
            }

            return {
                success: true,
                payment: payment,
                message: '✅ Webhook processato con successo!'
            };
        } catch (error) {
            console.error('❌ Errore webhookHandler:', error);
            return { success: false, error: error.message };
        }
    }
}

export const paymentService = new PaymentService();
