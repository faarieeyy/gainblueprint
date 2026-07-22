
'use client';
import { useEffect } from 'react';

export default function Page() {
    useEffect(() => {
        
        async function loadData() {
            try {
                const res = await fetch('/api/admin/users');
                if (res.status === 401) return window.location.href = '/admin/login';
                const data = await res.json();
                
                const sRes = await fetch('/api/admin/stats');
                const sData = await sRes.json();
                
                if (data.success) {
                    document.getElementById('stat-total').textContent = sData.stats.totalUsers;
                    document.getElementById('stat-sessions').textContent = sData.stats.activeSessions;
                    
                    const tbody = document.getElementById('users-table');
                    tbody.innerHTML = '';
                    data.users.forEach(u => {
                        tbody.innerHTML += `
                            <tr>
                                <td className="font-bold text-primary">${u.id}</td>
                                <td className="text-white">${u.name}</td>
                                <td>${u.phone}</td>
                                <td><span className="px-2 py-1 rounded-full text-[10px] uppercase font-bold ${u.status === 'Active' ? 'bg-[#25D366]/20 text-[#25D366]' : 'bg-red-500/20 text-red-500'}">${u.status}</span></td>
                                <td>${u.lastLogin ? new Date(u.lastLogin).toLocaleString() : 'Never'}</td>
                                <td>
                                    <button onClick={() => { deleteUser('${u.id}') }} className="text-red-400 hover:text-red-300 text-xs font-bold mr-3">Delete</button>
                                </td>
                            </tr>
                        `;
                    });
                }
            } catch (err) { console.error(err); }
        }

        async function createUser() {
            const name = document.getElementById('new-name').value;
            const phone = document.getElementById('new-phone').value;
            if (!name || !phone) return alert('Fill all fields');
            
            const res = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ name, phone })
            });
            const data = await res.json();
            if (data.success) {
                document.getElementById('add-user-modal').classList.add('hidden');
                document.getElementById('new-name').value = '';
                document.getElementById('new-phone').value = '';
                loadData();
            } else {
                alert(data.message);
            }
        }

        async function deleteUser(id) {
            if (confirm('Are you sure you want to delete this user? This will also end their active session.')) {
                await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
                loadData();
            }
        }

        async function logout() {
            await fetch('/api/auth/admin/logout', { method: 'POST' });
            window.location.href = '/admin/login';
        }

        window.onload = loadData;
    
    }, []);

    return (
        <>
            
    <header className="w-full bg-[#121912] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-black uppercase tracking-tighter text-white">ADMIN PORTAL</div>
            <button onClick={() => { logout() }} className="text-sm text-gray-400 hover:text-white transition-colors">Logout</button>
        </div>
    </header>

    <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-4 gap-6 mb-12">
            <div className="glass-card p-6 rounded-xl"><p className="text-xs text-gray-400 uppercase font-bold">Total Users</p><p id="stat-total" className="text-3xl font-black text-white">0</p></div>
            <div className="glass-card p-6 rounded-xl"><p className="text-xs text-gray-400 uppercase font-bold">Active Sessions</p><p id="stat-sessions" className="text-3xl font-black text-primary">0</p></div>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-lg font-bold text-white">Premium Users</h2>
                <button onClick={() => { document.getElementById('add-user-modal').classList.remove('hidden') }} className="bg-primary text-black px-4 py-2 rounded-lg font-bold text-sm">Add New User</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead><tr><th>ID</th><th>Name</th><th>Phone</th><th>Status</th><th>Last Login</th><th>Actions</th></tr></thead>
                    <tbody id="users-table"></tbody>
                </table>
            </div>
        </div>
    </main>

    {/*  Add User Modal  */}
    <div id="add-user-modal" className="hidden fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="glass-card p-8 rounded-2xl w-full max-w-md bg-[#121912]">
            <h3 className="text-xl font-bold text-white mb-6">Create Premium User</h3>
            <div className="space-y-4">
                <input type="text" id="new-name" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" />
                <input type="tel" id="new-phone" placeholder="Phone Number" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white" />
                <div className="flex gap-4 mt-6">
                    <button onClick={() => { document.getElementById('add-user-modal').classList.add('hidden') }} className="flex-1 py-3 bg-white/5 text-white rounded-xl">Cancel</button>
                    <button onClick={() => { createUser() }} className="flex-1 py-3 bg-primary text-black font-bold rounded-xl">Create</button>
                </div>
            </div>
        </div>
    </div>

    

        </>
    );
}
