// ================= SEED (CẤU HÌNH MẶC ĐỊNH SỬA TÊN SHOP) =================
async function seedData() {
    if (!await User.findOne({ role: 'admin' })) {
        await User.create({ 
            username: 'admin', 
            password: await bcrypt.hash('admin123', 10), 
            role: 'admin' 
        });
        console.log('👑 Đã tạo Admin duy nhất: admin / admin123');
    }

    if (!await User.findOne({ username: 'user' })) {
        await User.create({ username: 'user', password: await bcrypt.hash('user123', 10), role: 'user', balance: 500000 });
        console.log('👤 user/user123');
    }

    if (await Product.countDocuments() === 0) {
        const demo = [
            { title: "Acc Liên Quân Full Tướng", category: "acc", desc: "Rank Kim Cương", price: 250000, oldPrice: 400000, icon: "🎮" },
            { title: "Tool Auto Farm Blox Fruits", category: "tool", desc: "Auto farm", price: 150000, oldPrice: 250000, icon: "🤖" },
            { title: "Proxy Dân Cư VN", category: "proxy", desc: "Proxy VN", price: 100000, icon: "🌐" },
            { title: "License Photoshop 2025", category: "license", desc: "Vĩnh viễn", price: 500000, oldPrice: 800000, icon: "🎨" }
        ];
        const created = await Product.insertMany(demo);
        for (const p of created) {
            await Resource.create([
                { productId: p._id, data: `KEY-${p._id.toString().slice(-6)}-001` },
                { productId: p._id, data: `KEY-${p._id.toString().slice(-6)}-002` },
                { productId: p._id, data: `KEY-${p._id.toString().slice(-6)}-003` }
            ]);
        }
        console.log('📦 Seed 4 sản phẩm mẫu');
    }

    // ĐỔI TÊN SHOP VÀ THÔNG BÁO MẶC ĐỊNH TẠI ĐÂY
    const def = { 
        shopName: 'Shop Tài Nguyên MMO', 
        notice: 'Chào mừng bạn đến với Shop Tài Nguyên MMO uy tín hàng đầu!', 
        bankInfo: 'Momo: 0123456789\nVietcombank: 1234567890\nNội dung: [Username]', 
        depositRate: 1 
    };
    
    for (const [key, value] of Object.entries(def)) {
        await Setting.findOneAndUpdate({ key }, { value }, { upsert: true });
    }
}
