# Bình Dân Học Vụ Số - HNUE

Platform học trực tuyến sử dụng Open edX 20.0.1

## 🌐 Domains

- **LMS:** https://binhdanhocvuso.hnue.edu.vn
- **Studio:** https://studio.binhdanhocvuso.hnue.edu.vn  
- **MFE:** https://apps.binhdanhocvuso.hnue.edu.vn

## 📁 Tài Liệu

- `SECURITY_ALERT.md` - ⚠️ Cảnh báo bảo mật quan trọng
- `config.example.yml` - Template cấu hình (copy to config.yml)
- `CAI_TIEN_GIAO_DIEN_APPS.md` - Hướng dẫn tùy chỉnh MFE
- `inject-mfe-css.sh` - Script inject CSS vào MFE

## ⚙️ Setup

```bash
# Copy config template
cp config.example.yml config.yml

# Edit và thay đổi TẤT CẢ secrets
vim config.yml

# Start services
tutor local start
```

## 🔒 Bảo Mật

⚠️ **QUAN TRỌNG:** File `config.yml` chứa passwords và private keys.  
**KHÔNG BAO GIỜ** commit file này vào Git!

File `.gitignore` đã được cấu hình để ngăn chặn điều này.

## 🛠️ Development

```bash
# Rebuild theme
tutor images build openedx

# Rebuild MFE
tutor images build mfe

# Restart services
tutor local restart
```

## 📞 Support

- Email: support@hnue.edu.vn
- Admin: admin@hnue.edu.vn
