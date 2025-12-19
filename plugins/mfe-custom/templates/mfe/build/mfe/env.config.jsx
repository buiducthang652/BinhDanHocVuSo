import { DIRECT_PLUGIN, PLUGIN_OPERATIONS } from '@openedx/frontend-plugin-framework';

// Custom Footer Component for HNUE
const HNUEFooter = () => {
  return (
    <footer className="footer d-flex border-top py-3 px-4" role="contentinfo" aria-label="Page Footer">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <div className="footer-copyright">
              <span className="small text-muted">
                Hệ thống được xây dựng và vận hành bởi Trung tâm Công nghệ thông tin - Trường Đại học Sư phạm Hà Nội
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Custom Header styles to increase logo size
const CustomHeaderStyles = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      /* Increase logo size */
      .logo {
        max-height: 60px !important;
        height: 60px !important;
      }
      .site-header-desktop .logo,
      .site-header-mobile .logo {
        max-height: 60px !important;
        height: 60px !important;
      }
      .site-header-desktop .logo img,
      .site-header-mobile .logo img {
        max-height: 60px !important;
        height: 60px !important;
        width: auto !important;
      }
    `;
    document.head.appendChild(style);
    
    // Override menu text: "Khám phá mới" => "Khóa học", "Khóa học" => "Khóa học của tôi"
    const observer = new MutationObserver(() => {
      // Find all navigation links
      document.querySelectorAll('a, button, span').forEach(el => {
        if (el.textContent.trim() === 'Khám phá mới') {
          el.textContent = 'Khóa học';
        }
        if (el.textContent.trim() === 'Khóa học' && !el.textContent.includes('của tôi')) {
          // Only replace if it's not already "Khóa học của tôi"
          const parent = el.closest('[role="navigation"]');
          if (parent) {
            el.textContent = 'Khóa học của tôi';
          }
        }
      });
      
      // Alternative: Find by aria-label or data attributes
      document.querySelectorAll('[data-testid*="discover"], [aria-label*="Discover"]').forEach(el => {
        if (el.textContent.includes('Khám phá')) {
          el.textContent = el.textContent.replace('Khám phá mới', 'Khóa học');
        }
      });
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => {
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);
  return null;
};

// Plugin configuration to override footer in all MFEs
const config = {
  // Override footer in Account MFE
  account: {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
  },
  
  // Override footer in Authn MFE
  authn: {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
  },
  
  // Override footer in Learning MFE
  learning: {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer', 
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
  },
  
  // Override footer in Learner Dashboard MFE
  'learner-dashboard': {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
    'header.plugin': {
      op: PLUGIN_OPERATIONS.Insert,
      widget: {
        id: 'custom_header_styles',
        type: DIRECT_PLUGIN,
        priority: 1,
        RenderWidget: CustomHeaderStyles,
      },
    },
  },
  
  // Override footer in Profile MFE
  profile: {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
  },
  
  // Override footer in Discussions MFE
  discussions: {
    'footer.slot': {
      op: PLUGIN_OPERATIONS.Replace,
      widget: {
        id: 'custom_hnue_footer',
        type: DIRECT_PLUGIN,
        RenderWidget: HNUEFooter,
      },
    },
  },
};

export default config;