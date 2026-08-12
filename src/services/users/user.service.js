/**
 * 👥 User Service - Gestione Utenti
 */

class UserService {
    constructor() {
        this.users = [];
        this.initUsers();
    }

    // Inizializza utenti
    initUsers() {
        this.users = [
            {
                id: 'user_1',
                username: 'Pytho',
                email: 'pytho@myzubster.com',
                role: 'admin',
                status: 'active',
                plants: 14,
                payments: 8,
                level: 50,
                xp: 10000,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            },
            {
                id: 'user_2',
                username: 'GreenMaster',
                email: 'green@myzubster.com',
                role: 'botanist',
                status: 'active',
                plants: 25,
                payments: 12,
                level: 42,
                xp: 8500,
                createdAt: new Date(Date.now() - 604800000).toISOString(),
                lastLogin: new Date(Date.now() - 3600000).toISOString()
            },
            {
                id: 'user_3',
                username: 'TimeWizard',
                email: 'time@myzubster.com',
                role: 'user',
                status: 'active',
                plants: 8,
                payments: 5,
                level: 36,
                xp: 7200,
                createdAt: new Date(Date.now() - 1209600000).toISOString(),
                lastLogin: new Date(Date.now() - 86400000).toISOString()
            }
        ];
    }

    // Ottieni tutti gli utenti
    async getUsers() {
        try {
            return {
                success: true,
                users: this.users,
                total: this.users.length
            };
        } catch (error) {
            console.error('❌ Errore getUsers:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni utente per ID
    async getUserById(id) {
        try {
            const user = this.users.find(u => u.id === id);
            if (!user) {
                throw new Error('Utente non trovato');
            }
            return {
                success: true,
                user: user
            };
        } catch (error) {
            console.error('❌ Errore getUserById:', error);
            return { success: false, error: error.message };
        }
    }

    // Crea utente
    async createUser(userData) {
        try {
            const user = {
                id: `user_${Date.now()}`,
                ...userData,
                status: 'active',
                plants: 0,
                payments: 0,
                level: 1,
                xp: 0,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            this.users.push(user);
            return {
                success: true,
                user: user,
                message: '👤 Utente creato con successo!'
            };
        } catch (error) {
            console.error('❌ Errore createUser:', error);
            return { success: false, error: error.message };
        }
    }

    // Aggiorna utente
    async updateUser(id, updates) {
        try {
            const user = this.users.find(u => u.id === id);
            if (!user) {
                throw new Error('Utente non trovato');
            }
            Object.assign(user, updates);
            user.updatedAt = new Date().toISOString();
            return {
                success: true,
                user: user,
                message: '✅ Utente aggiornato con successo!'
            };
        } catch (error) {
            console.error('❌ Errore updateUser:', error);
            return { success: false, error: error.message };
        }
    }

    // Elimina utente
    async deleteUser(id) {
        try {
            const index = this.users.findIndex(u => u.id === id);
            if (index === -1) {
                throw new Error('Utente non trovato');
            }
            this.users.splice(index, 1);
            return {
                success: true,
                message: '🗑️ Utente eliminato con successo!'
            };
        } catch (error) {
            console.error('❌ Errore deleteUser:', error);
            return { success: false, error: error.message };
        }
    }

    // Ottieni statistiche utenti
    async getStats() {
        try {
            const total = this.users.length;
            const active = this.users.filter(u => u.status === 'active').length;
            const admins = this.users.filter(u => u.role === 'admin').length;
            const botanists = this.users.filter(u => u.role === 'botanist').length;
            const users = this.users.filter(u => u.role === 'user').length;

            const totalPlants = this.users.reduce((sum, u) => sum + u.plants, 0);
            const totalPayments = this.users.reduce((sum, u) => sum + u.payments, 0);
            const avgLevel = Math.round(this.users.reduce((sum, u) => sum + u.level, 0) / total);

            return {
                success: true,
                stats: {
                    total: total,
                    active: active,
                    admins: admins,
                    botanists: botanists,
                    users: users,
                    totalPlants: totalPlants,
                    totalPayments: totalPayments,
                    avgLevel: avgLevel
                }
            };
        } catch (error) {
            console.error('❌ Errore getStats:', error);
            return { success: false, error: error.message };
        }
    }

    // Ricerca utenti
    async searchUsers(query) {
        try {
            const results = this.users.filter(u => 
                u.username.toLowerCase().includes(query.toLowerCase()) ||
                u.email.toLowerCase().includes(query.toLowerCase())
            );
            return {
                success: true,
                results: results,
                total: results.length
            };
        } catch (error) {
            console.error('❌ Errore searchUsers:', error);
            return { success: false, error: error.message };
        }
    }
}

export const userService = new UserService();
