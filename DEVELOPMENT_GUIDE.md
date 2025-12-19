# Hướng Dẫn Phát Triển Dự Án Bình Dân Học Vụ Số - HNUE

## 📋 Thông Tin Dự Án

**Tên dự án**: Bình Dân Học Vụ Số - Trường Đại học Sư phạm Hà Nội (HNUE)  
**Platform**: Open edX 20.0.1 (Teak.2 release)  
**Deployment**: Tutor (Docker-based)  
**Domains**:
- LMS: https://binhdanhocvuso.hnue.edu.vn
- Studio (CMS): https://studio.binhdanhocvuso.hnue.edu.vn
- MFE: https://apps.binhdanhocvuso.hnue.edu.vn

**Repository**: BinhDanHocVuSo (buiducthang652)

---

## 🏗️ Kiến Trúc Hệ Thống

### 1. Cấu Trúc Thư Mục Chính

```
/root/.local/share/tutor/
├── config.yml                    # Cấu hình chính của Tutor
├── data/                         # Dữ liệu runtime
│   ├── caddy/                   # Reverse proxy
│   ├── lms/                     # LMS data (logs, modulestore, ora2)
│   ├── cms/                     # Studio data
│   ├── mongodb/                 # MongoDB database files
│   ├── mysql/                   # MySQL database files
│   ├── redis/                   # Redis cache
│   ├── meilisearch/            # Search engine
│   └── openedx-media/          # Course assets (images, videos)
├── env/                         # Environment configs
│   ├── build/openedx/themes/   # Custom themes
│   │   └── indigo/             # Theme hiện tại
│   │       └── lms/templates/  # LMS templates
│   ├── apps/                   # App configs
│   ├── local/                  # Local development
│   └── plugins/                # Plugin configs
└── plugins/                     # Custom plugins
    ├── autoactivate.yml        # Auto-activate user accounts
    ├── email-verification.yml  # Email verification settings
    └── mfe-custom/             # Custom MFE modifications
        ├── HNUEFooter.jsx      # Custom footer
        └── CustomHeaderStyles.jsx  # Header customizations
```

### 2. Database Structure

#### MySQL (port 3306)
- **openedx** (31.13 MB, 562 tables):
  - `auth_user`: User accounts
  - `student_courseenrollment`: Course enrollments
  - `grades_*`: Grading tables
  - `organizations_*`: Organization management
  - `certificates_*`: Certificate management

#### MongoDB (port 27017)
- **openedx** (58.82 MB, 5 collections):
  - `modulestore`: Course structure and content
  - `fs.files`, `fs.chunks`: GridFS for file storage
  - Course definitions and configurations

#### Redis (port 6379)
- Cache and session storage
- Celery task queue

#### Meilisearch (port 7700)
- Full-text search for courses and content

---

## 🎨 Theme Customization

### Theme Location
```
/root/.local/share/tutor/env/build/openedx/themes/indigo/
```

### Key Template Files

#### 1. Homepage (`lms/templates/index.html`)
**Đặc điểm**:
- Hero slider với 4 slides
- Font: Inter (Google Fonts)
- Màu chủ đạo: HNUE blue (#0c4da2, #1e6bb8)
- Clean white design với subtle shadows

**Cách chỉnh sửa**:
```bash
# Edit file
vim /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/templates/index.html

# Copy vào container và restart
docker cp /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/templates/index.html \
  tutor_local-lms-1:/openedx/themes/indigo/lms/templates/index.html
docker restart tutor_local-lms-1
```

#### 2. Courses Page (`lms/templates/courseware/courses.html`)
**Đặc điểm**:
- 3 categories: Chung, Học sinh/Sinh viên, Giáo viên/Giảng viên
- Clean white hero section
- Color-coded categories:
  - Chung: Xanh HNUE (#0c4da2 → #1e6bb8)
  - Học sinh/SV: Cam (#e8833a → #f39c12)
  - Giáo viên: Xanh lá (#27ae60 → #2ecc71)
- No emoji icons
- Responsive grid layout

**Cách chỉnh sửa**:
```bash
# Edit file
vim /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/templates/courseware/courses.html

# Backup trước khi sửa
cp courses.html courses.html.backup.$(date +%Y%m%d_%H%M%S)

# Copy và restart
docker cp courses.html tutor_local-lms-1:/openedx/themes/indigo/lms/templates/courseware/courses.html
docker restart tutor_local-lms-1
```

### CSS Guidelines

**Color Palette**:
```css
/* HNUE Primary Colors */
--hnue-blue-dark: #0c4da2;
--hnue-blue-light: #1e6bb8;
--hnue-orange: #e8833a;
--hnue-orange-light: #f39c12;
--hnue-green: #27ae60;
--hnue-green-light: #2ecc71;

/* Neutrals */
--text-primary: #333;
--text-secondary: #666;
--bg-primary: #f8f9fa;
--bg-white: #ffffff;
--border-light: #e5e5e5;
```

**Typography**:
```css
font-family: 'Inter', sans-serif;
```

**Spacing System**:
```css
/* Use consistent spacing */
padding: 20px, 30px, 40px, 60px, 80px;
border-radius: 12px, 16px, 20px, 30px;
```

---

## 🔌 Plugin Development

### Custom Plugins Location
```
/root/.local/share/tutor/plugins/
```

### 1. Auto-Activate Plugin (`autoactivate.yml`)
**Chức năng**: Tự động activate tài khoản user mới không cần email verification

**Nội dung**:
```yaml
name: autoactivate
version: 1.0.0
patches:
  openedx-lms-production-settings: |
    # Auto-activate new users
    from django.db.models.signals import post_save
    from django.dispatch import receiver
    from django.contrib.auth.models import User
    
    @receiver(post_save, sender=User)
    def auto_activate_user(sender, instance, created, **kwargs):
        if created and not instance.is_active:
            instance.is_active = True
            instance.save()
```

### 2. Custom MFE Plugin (`mfe-custom/`)
**Chức năng**: Custom header và footer cho MFE apps

**Files**:
- `HNUEFooter.jsx`: Custom footer với thông tin HNUE
- `CustomHeaderStyles.jsx`: Logo size 60px, custom colors

**Cách cập nhật**:
```bash
# Edit plugin files
vim /root/.local/share/tutor/plugins/mfe-custom/HNUEFooter.jsx

# Rebuild MFE
tutor images build mfe
tutor local restart mfe
```

---

## 📊 Course Organization System

### Organization Structure
Hệ thống sử dụng Django Organizations để phân loại khóa học:

1. **CHUNG** (Khóa học chung)
   - Dành cho mọi đối tượng
   - Màu: Xanh HNUE

2. **HOCSINH** (Học sinh/Sinh viên)
   - Khóa học cho học sinh, sinh viên
   - Màu: Cam

3. **GIAOVIEN** (Giáo viên/Giảng viên)
   - Khóa học bồi dưỡng cho giáo viên
   - Màu: Xanh lá

### Tạo Organizations

```python
# Script: create_organizations.py
from organizations.models import Organization

# Create organizations
org_chung = Organization.objects.create(
    short_name='CHUNG',
    name='Khóa học chung',
    description='Dành cho mọi đối tượng',
    active=True
)

org_hocsinh = Organization.objects.create(
    short_name='HOCSINH',
    name='Học sinh/Sinh viên',
    description='Khóa học dành cho học sinh, sinh viên',
    active=True
)

org_giaovien = Organization.objects.create(
    short_name='GIAOVIEN',
    name='Giáo viên/Giảng viên',
    description='Khóa học bồi dưỡng dành cho giáo viên và giảng viên',
    active=True
)
```

### Gán Course vào Organization

```python
# Script: categorize_courses.py
from organizations.models import Organization, OrganizationCourse
from opaque_keys.edx.keys import CourseKey

# Get organization
org = Organization.objects.get(short_name='HOCSINH')

# Add course
course_id = CourseKey.from_string('course-v1:ORG+COURSE+RUN')
OrganizationCourse.objects.create(
    organization=org,
    course_id=course_id,
    active=True
)
```

### Chạy Scripts trong Container

```bash
# Copy script vào container
docker cp script.py tutor_local-lms-1:/tmp/

# Execute trong Django shell
docker exec tutor_local-lms-1 bash -c \
  "cd /openedx/edx-platform && python manage.py lms shell < /tmp/script.py"
```

---

## 🗄️ Database Operations

### MySQL Access

```bash
# Connect to MySQL
docker exec -it tutor_local-mysql-1 mysql -u root -p
# Password: từ config.yml -> MYSQL_ROOT_PASSWORD

# List databases
SHOW DATABASES;

# Use openedx database
USE openedx;

# List tables
SHOW TABLES;

# Query examples
SELECT id, username, email, is_active FROM auth_user LIMIT 10;
SELECT * FROM organizations_organization;
SELECT * FROM student_courseenrollment WHERE course_id LIKE '%KHOASINHHOC%';
```

### MongoDB Access

```bash
# Connect to MongoDB
docker exec -it tutor_local-mongodb-1 mongosh mongodb://localhost:27017/openedx

# List collections
show collections

# Query examples
db.modulestore.find({}).limit(5)
db.modulestore.find({"_id.org": "KHOASINHHOC"})
```

### Database Backup

```bash
# MySQL backup
docker exec tutor_local-mysql-1 mysqldump -u root -p openedx > backup_$(date +%Y%m%d).sql

# MongoDB backup
docker exec tutor_local-mongodb-1 mongodump --out=/tmp/backup --db=openedx
docker cp tutor_local-mongodb-1:/tmp/backup ./mongodb_backup_$(date +%Y%m%d)

# Media files backup
tar -czf media_backup_$(date +%Y%m%d).tar.gz /root/.local/share/tutor/data/openedx-media/
```

---

## 🔧 Common Development Tasks

### 1. Add New Course

**Via Studio**:
1. Login to https://studio.binhdanhocvuso.hnue.edu.vn
2. Create new course
3. Set course settings (start date, end date, enrollment)
4. Add to organization via Django admin or script

**Via Django Admin**:
1. https://binhdanhocvuso.hnue.edu.vn/admin
2. Organizations → Add OrganizationCourse

### 2. Delete Course

**Cảnh báo**: Xóa course sẽ xóa tất cả data liên quan!

```python
# Script: delete_course.py
from django.contrib.auth.models import User
from openedx.core.djangoapps.content.course_overviews.models import CourseOverview
from student.models import CourseEnrollment
from opaque_keys.edx.keys import CourseKey
import shutil
import os

course_id = CourseKey.from_string('course-v1:ORG+COURSE+RUN')

# Delete enrollments
CourseEnrollment.objects.filter(course_id=course_id).delete()

# Delete course overview
CourseOverview.objects.filter(id=course_id).delete()

# Delete from modulestore (MongoDB)
from xmodule.modulestore.django import modulestore
store = modulestore()
store.delete_course(course_id, User.objects.get(username='admin').id)

# Delete media files
media_path = f'/openedx/media/course-v1:{course_id.org}+{course_id.course}+{course_id.run}/'
if os.path.exists(media_path):
    shutil.rmtree(media_path)

print(f"✅ Deleted course: {course_id}")
```

### 3. Modify CSS/Theme

**Quick CSS changes (không cần rebuild)**:
```bash
# Edit file
vim /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/static/sass/custom.scss

# Copy vào container
docker cp custom.scss tutor_local-lms-1:/openedx/themes/indigo/lms/static/sass/
docker restart tutor_local-lms-1
```

**Full theme rebuild** (cần khi thay đổi template logic):
```bash
# Edit templates
vim /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/templates/index.html

# Rebuild image (lâu, ~10-15 phút)
tutor images build openedx

# Restart services
tutor local restart lms cms
```

### 4. Add New Plugin

```bash
# Create plugin file
cat > /root/.local/share/tutor/plugins/my-plugin.yml << EOF
name: my-plugin
version: 1.0.0
patches:
  openedx-lms-production-settings: |
    # Your custom settings here
    MY_CUSTOM_SETTING = True
EOF

# Enable plugin
tutor plugins enable my-plugin

# Rebuild and restart
tutor config save
tutor local restart
```

### 5. User Management

**Create superuser**:
```bash
tutor local do createuser --staff --superuser admin admin@example.com
```

**Reset password**:
```bash
tutor local exec lms bash -c "echo \"from django.contrib.auth.models import User; u=User.objects.get(username='admin'); u.set_password('newpassword'); u.save()\" | python manage.py lms shell"
```

**List users**:
```bash
tutor local exec lms python manage.py lms shell -c "from django.contrib.auth.models import User; [print(f'{u.username} - {u.email}') for u in User.objects.all()[:10]]"
```

---

## 🚀 Deployment & Maintenance

### Start/Stop Services

```bash
# Start all services
tutor local start -d

# Stop all services
tutor local stop

# Restart specific service
tutor local restart lms
tutor local restart cms
tutor local restart mfe

# View logs
tutor local logs -f lms
tutor local logs -f cms --tail=100
```

### Update Open edX Version

```bash
# Backup first!
tutor local stop
tar -czf backup_full_$(date +%Y%m%d).tar.gz /root/.local/share/tutor/

# Update Tutor
pip install --upgrade "tutor[full]"

# Upgrade Open edX
tutor images build all
tutor local do init
tutor local start -d
```

### Performance Monitoring

```bash
# Check container stats
docker stats

# Check disk usage
du -sh /root/.local/share/tutor/data/*

# Check MySQL size
docker exec tutor_local-mysql-1 mysql -u root -p -e "SELECT table_schema, SUM(data_length + index_length) / 1024 / 1024 AS 'Size (MB)' FROM information_schema.tables GROUP BY table_schema;"

# Check MongoDB size
docker exec tutor_local-mongodb-1 mongosh --eval "db.stats(1024*1024)"
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. "500 Internal Server Error" on courses page
```bash
# Check logs
docker logs tutor_local-lms-1 --tail=100

# Common causes:
# - Template syntax error
# - Missing imports in template
# - Database connection issue

# Fix: Check template file for errors
docker exec tutor_local-lms-1 head -50 /openedx/themes/indigo/lms/templates/courseware/courses.html
```

#### 2. Template changes not showing
```bash
# Clear cache and restart
docker restart tutor_local-lms-1 tutor_local-cms-1

# Check if file is in container
docker exec tutor_local-lms-1 ls -la /openedx/themes/indigo/lms/templates/courseware/

# Force browser refresh: Ctrl+F5 or curl with ?nocache parameter
curl -s "https://binhdanhocvuso.hnue.edu.vn/courses?nocache=$(date +%s)"
```

#### 3. Container restart loop
```bash
# Check logs for error
docker logs tutor_local-lms-1 2>&1 | grep -i error

# Common causes:
# - Database connection failed (check mysql/mongodb status)
# - Configuration error in config.yml
# - Disk space full

# Check disk space
df -h

# Restart all services
tutor local stop
tutor local start -d
```

#### 4. MySQL connection error
```bash
# Check MySQL status
docker ps | grep mysql

# Restart MySQL
docker restart tutor_local-mysql-1

# Wait for MySQL to fully start (30-60 seconds)
sleep 60
docker restart tutor_local-lms-1
```

---

## 📝 Development Workflow

### Recommended Development Flow

1. **Make changes on host**:
   ```bash
   cd /root/.local/share/tutor/env/build/openedx/themes/indigo/lms/templates/
   vim courseware/courses.html
   ```

2. **Test locally** (optional - for syntax):
   ```bash
   # Validate Mako syntax
   docker exec tutor_local-lms-1 python -c "from mako.template import Template; Template(filename='/openedx/themes/indigo/lms/templates/courseware/courses.html')"
   ```

3. **Deploy to container**:
   ```bash
   docker cp courses.html tutor_local-lms-1:/openedx/themes/indigo/lms/templates/courseware/courses.html
   ```

4. **Restart service**:
   ```bash
   docker restart tutor_local-lms-1
   ```

5. **Test on browser**:
   ```bash
   # Check HTTP status
   curl -I https://binhdanhocvuso.hnue.edu.vn/courses
   
   # Verify changes
   curl -s https://binhdanhocvuso.hnue.edu.vn/courses | grep "your-test-string"
   ```

6. **Commit changes**:
   ```bash
   cd /root/.local/share/tutor
   git add env/build/openedx/themes/indigo/
   git commit -m "Update courses page design"
   git push
   ```

---

## 🔐 Security Best Practices

1. **Change default passwords**:
   - MySQL root password (MYSQL_ROOT_PASSWORD in config.yml)
   - Django superuser password
   - Secret keys (SECRET_KEY, JWT_SECRET_KEY)

2. **Backup regularly**:
   - Daily database backups
   - Weekly full system backups
   - Store backups off-site

3. **Update regularly**:
   ```bash
   # Update Tutor
   pip install --upgrade tutor
   
   # Check for security updates
   tutor config save --set OPENEDX_COMMON_VERSION=open-release/teak.2
   ```

4. **Monitor logs**:
   ```bash
   # Check for suspicious activity
   tutor local logs -f lms | grep -E "(ERROR|WARNING|CRITICAL)"
   ```

5. **SSL/TLS**:
   - Certificates managed by Caddy automatically
   - Check certificate expiry: https://www.ssllabs.com/ssltest/

---

## 📚 Useful Commands Reference

### Tutor Commands
```bash
# Configuration
tutor config save                    # Save configuration
tutor config printroot              # Show Tutor root directory
tutor config printvalue LMS_HOST    # Print specific config value

# Images
tutor images build all              # Build all images
tutor images build openedx          # Build only Open edX image
tutor images pull all               # Pull pre-built images

# Local deployment
tutor local start -d                # Start in detached mode
tutor local stop                    # Stop all services
tutor local restart lms cms         # Restart specific services
tutor local exec lms bash           # Execute bash in LMS container
tutor local logs -f lms             # Follow LMS logs

# Initialization
tutor local do init                 # Initialize platform (first time)
tutor local do createuser           # Create user
tutor local do importdemocourse     # Import demo course

# Plugins
tutor plugins list                  # List available plugins
tutor plugins enable myplugin       # Enable plugin
tutor plugins disable myplugin      # Disable plugin
```

### Docker Commands
```bash
# Container management
docker ps                           # List running containers
docker ps -a                        # List all containers
docker restart tutor_local-lms-1   # Restart specific container
docker exec -it tutor_local-lms-1 bash  # Access container bash

# Logs
docker logs tutor_local-lms-1      # View container logs
docker logs -f --tail=100 tutor_local-lms-1  # Follow logs

# Cleanup
docker system prune -a             # Remove unused containers/images
docker volume prune                # Remove unused volumes
```

---

## 📞 Support & Resources

### Official Documentation
- **Open edX**: https://docs.openedx.org/
- **Tutor**: https://docs.tutor.overhang.io/
- **Open edX API**: https://openedx.readthedocs.io/

### Community
- Open edX Forum: https://discuss.openedx.org/
- Tutor Forum: https://discuss.overhang.io/

### HNUE Contacts
- Technical Support: [contact info]
- Project Owner: buiducthang652

---

## 🎯 Project Roadmap

### Completed
- ✅ Open edX installation and configuration
- ✅ Custom HNUE theme with Inter font
- ✅ 3-category course organization system
- ✅ Clean white design with HNUE colors
- ✅ Auto-activation plugin
- ✅ Custom MFE footer/header
- ✅ 11 courses organized and categorized

### In Progress
- 🔄 Backup/restore automation
- 🔄 Certificate customization
- 🔄 Email notification templates

### Planned
- 📋 Mobile app integration
- 📋 Advanced analytics dashboard
- 📋 Integration with HNUE student information system
- 📋 Multi-language support (Vietnamese/English)

---

## 📌 Important Notes

1. **Always backup before major changes**
2. **Test on staging environment first** (if available)
3. **Document all customizations**
4. **Keep plugins minimal** - only use what's necessary
5. **Monitor disk space** - course media files can grow large
6. **Regular security updates** - check for Open edX security patches
7. **Database optimization** - run OPTIMIZE TABLE regularly on MySQL
8. **Log rotation** - setup logrotate to prevent disk fill

---

**Last Updated**: December 19, 2025  
**Version**: 1.0  
**Maintained by**: HNUE Technical Team
