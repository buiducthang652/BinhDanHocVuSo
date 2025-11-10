import React, { useEffect } from 'react';
import Cookies from 'universal-cookie';

import { getConfig } from '@edx/frontend-platform';

function addPlugins(config, slot_name, plugins) {
  if (config?.pluginSlots && config.pluginSlots[slot_name]) {
    config.pluginSlots[slot_name].plugins.push(...plugins);
  }
}

// HNUE Login Branding Component
const HNUELoginBranding = () => {
  const styles = {
    brandingContainer: {
      background: 'linear-gradient(135deg, #0066cc 0%, #004499 100%)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: "'Inter', sans-serif",
    },
    brandingContent: {
      textAlign: 'center',
      color: 'white',
      maxWidth: '400px',
      padding: '40px 30px',
    },
    logo: {
      width: '120px',
      height: 'auto',
      marginBottom: '30px',
      filter: 'brightness(0) invert(1)',
    },
    title: {
      fontSize: '28px',
      fontWeight: '700',
      marginBottom: '15px',
      lineHeight: '1.3',
    },
    subtitle: {
      fontSize: '16px',
      opacity: '0.9',
      marginBottom: '30px',
      lineHeight: '1.5',
    },
    features: {
      textAlign: 'left',
      fontSize: '14px',
      opacity: '0.9',
    },
    featureItem: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },
    featureIcon: {
      marginRight: '12px',
      fontSize: '16px',
    },
  };

  return (
    <div style={styles.brandingContainer}>
      <div style={styles.brandingContent}>
        <div style={styles.title}>
          Trường Đại học Sư phạm Hà Nội
        </div>
        <div style={styles.subtitle}>
          Nền tảng Bình dân học vụ số
        </div>
        <div style={styles.features}>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🎓</span>
            <span>Học tập trực tuyến hiện đại</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🏆</span>
            <span>Chứng chỉ uy tín từ HNUE</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>📱</span>
            <span>Truy cập mọi lúc, mọi nơi</span>
          </div>
          <div style={styles.featureItem}>
            <span style={styles.featureIcon}>🤝</span>
            <span>Cộng đồng học tập năng động</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// HNUE Login Styling Component
const HNUELoginStyles = () => {
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* HNUE Login Page Customization */
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif !important;
        background: #f8f9fa !important;
      }

      /* Main login container */
      .container-fluid {
        max-width: 1200px !important;
        margin: 0 auto !important;
        padding: 0 !important;
      }

      /* Login form container */
      .form-container {
        background: white !important;
        border-radius: 12px !important;
        box-shadow: 0 8px 32px rgba(0,0,0,0.1) !important;
        padding: 40px !important;
        margin: 20px !important;
      }

      /* Form styling */
      .form-group label {
        font-weight: 600 !important;
        color: #333 !important;
        margin-bottom: 8px !important;
        font-size: 14px !important;
      }

      .form-control {
        border: 2px solid #e1e5e9 !important;
        border-radius: 8px !important;
        padding: 12px 16px !important;
        font-size: 14px !important;
        transition: all 0.3s ease !important;
        background: white !important;
      }

      .form-control:focus {
        border-color: #0066cc !important;
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1) !important;
        outline: none !important;
      }

      /* HNUE branded buttons */
      .btn-primary, .btn-brand {
        background: linear-gradient(135deg, #0066cc 0%, #004499 100%) !important;
        border: none !important;
        padding: 12px 24px !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
        text-transform: none !important;
        font-size: 14px !important;
      }

      .btn-primary:hover, .btn-brand:hover {
        background: linear-gradient(135deg, #0052a3 0%, #003366 100%) !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3) !important;
      }

      .btn-outline {
        background: transparent !important;
        border: 2px solid #0066cc !important;
        color: #0066cc !important;
        padding: 10px 24px !important;
        font-weight: 600 !important;
        border-radius: 8px !important;
        transition: all 0.3s ease !important;
      }

      .btn-outline:hover {
        background: #0066cc !important;
        color: white !important;
      }

      /* Header styling */
      .login-header, .register-header {
        text-align: center !important;
        margin-bottom: 30px !important;
      }

      .login-header h1, .register-header h1 {
        color: #0066cc !important;
        font-weight: 700 !important;
        font-size: 28px !important;
        margin-bottom: 10px !important;
      }

      .login-header p, .register-header p {
        color: #666 !important;
        font-size: 16px !important;
        margin-bottom: 0 !important;
      }

      /* Links styling */
      a {
        color: #0066cc !important;
        text-decoration: none !important;
        font-weight: 500 !important;
      }

      a:hover {
        color: #004499 !important;
        text-decoration: underline !important;
      }

      /* Alert/error messages */
      .alert {
        border-radius: 8px !important;
        border: none !important;
        padding: 12px 16px !important;
        margin-bottom: 20px !important;
      }

      .alert-danger {
        background: #ffebee !important;
        color: #c62828 !important;
        border-left: 4px solid #c62828 !important;
      }

      .alert-info {
        background: #e3f2fd !important;
        color: #1565c0 !important;
        border-left: 4px solid #1565c0 !important;
      }

      /* Social auth buttons */
      .social-auth-provider {
        border: 2px solid #e1e5e9 !important;
        border-radius: 8px !important;
        padding: 12px !important;
        margin-bottom: 10px !important;
        transition: all 0.3s ease !important;
      }

      .social-auth-provider:hover {
        border-color: #0066cc !important;
        box-shadow: 0 2px 8px rgba(0, 102, 204, 0.1) !important;
      }

      /* Responsive adjustments */
      @media (max-width: 768px) {
        .form-container {
          margin: 10px !important;
          padding: 20px !important;
        }

        .login-header h1, .register-header h1 {
          font-size: 24px !important;
        }
      }

      /* Tab navigation */
      .nav-tabs {
        border-bottom: 2px solid #e1e5e9 !important;
        margin-bottom: 30px !important;
      }

      .nav-tabs .nav-link {
        border: none !important;
        padding: 12px 24px !important;
        font-weight: 600 !important;
        color: #666 !important;
        border-radius: 8px 8px 0 0 !important;
      }

      .nav-tabs .nav-link.active {
        background: #0066cc !important;
        color: white !important;
        border-bottom: 2px solid #0066cc !important;
      }

      /* Loading states */
      .spinner-border {
        color: #0066cc !important;
      }

      /* Custom checkbox and radio styling */
      .form-check-input:checked {
        background-color: #0066cc !important;
        border-color: #0066cc !important;
      }

      .form-check-input:focus {
        box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1) !important;
      }
    `;
    document.head.appendChild(style);

    // Add Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    return () => {
      document.head.removeChild(style);
      if (document.head.contains(fontLink)) {
        document.head.removeChild(fontLink);
      }
    };
  }, []);

  return null;
};

// HNUE Logo Header for Login
const HNUELoginHeader = () => {
  const styles = {
    headerContainer: {
      background: 'white',
      borderBottom: '1px solid #e1e5e9',
      padding: '20px 0',
      textAlign: 'center',
    },
    logoContainer: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
    },
    title: {
      fontSize: '24px',
      fontWeight: '700',
      color: '#0066cc',
      margin: '10px 0 5px 0',
      fontFamily: "'Inter', sans-serif",
    },
    subtitle: {
      fontSize: '14px',
      color: '#666',
      margin: 0,
      fontFamily: "'Inter', sans-serif",
    },
  };

  return (
    <div style={styles.headerContainer}>
      <div style={styles.logoContainer}>
        <div style={styles.title}>
          Trường Đại học Sư phạm Hà Nội
        </div>
        <div style={styles.subtitle}>
          Nền tảng Bình dân học vụ số
        </div>
      </div>
    </div>
  );
};

let themeCookie = 'indigo-toggle-dark';
let themeCookieExpiry = 90; // days

const AddDarkTheme = () => {
  const cookies = new Cookies();
  const isThemeToggleEnabled = getConfig().INDIGO_ENABLE_DARK_TOGGLE;

  const getCookieExpiry = () => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + themeCookieExpiry);
  };

  const getCookieOptions = () => {
    const serverURL = new URL(getConfig().LMS_BASE_URL);
    const options = { domain: serverURL.hostname, path: '/', expires: getCookieExpiry() };
    return options;
  };

  const addDarkThemeToIframes = () => {
    const iframes = document.getElementsByTagName('iframe');
    const iframesLength = iframes.length;
    if (iframesLength > 0) {
      Array.from({ length: iframesLength }).forEach((_, index) => {
        const style = document.createElement('style');
        style.textContent = `
          body{
            background-color: #0D0D0E;
            color: #ccc;
          }
          a {color: #ccc;}
          a:hover{color: #d3d3d3;}
          `;
        if (iframes[index].contentDocument) { iframes[index].contentDocument.head.appendChild(style); }
      });
    }
  };

  useEffect(() => {
    const theme = cookies.get(themeCookie);

    // - When page loads, Footer loads before MFE content. Since there is no iframe on page,
    // it does not append any class. MutationObserver observes changes in DOM and hence appends dark
    // attributes when iframe is added. After 15 sec, this observer is destroyed to conserve resources. 
    // - It has been added outside dark-theme condition so that it can be removed on Component Unmount.
    // - Observer can be passed to `addDarkThemeToIframes` function and disconnected after observing Iframe.
    // This approach has a limitation: the observer first detects the iframe and then detects the docSrc. 
    // We need to wait for docSrc to fully load before appending the style tag.
    const observer = new MutationObserver(() => {
      addDarkThemeToIframes();
    });

    if (isThemeToggleEnabled && theme === 'dark') {
      document.body.classList.add('indigo-dark-theme');
      
      observer.observe(document.body, { childList: true, subtree: true });
      setTimeout(() => observer?.disconnect(), 15000); // clear after 15 sec to avoid resource usage

      cookies.set(themeCookie, theme, getCookieOptions());      //  on page load, update expiry
    }

    return () => observer?.disconnect();
  }, []);

  return (<div />);
};

// Custom HNUE Footer Component
const HNUEFooter = () => {
  return React.createElement('footer', {
    className: 'footer d-flex border-top py-3 px-4',
    role: 'contentinfo',
    'aria-label': 'Page Footer'
  }, 
    React.createElement('div', { className: 'container-fluid' },
      React.createElement('div', { className: 'row align-items-center' },
        React.createElement('div', { className: 'col-md-12 text-center' },
          React.createElement('div', { className: 'footer-copyright' },
            React.createElement('span', { className: 'small text-muted' },
              'Hệ thống được xây dựng và vận hành bởi Trung tâm Công nghệ thông tin - Trường Đại học Sư phạm Hà Nội'
            )
          )
        )
      )
    )
  );
};

async function setConfig () {
  let config = {
    pluginSlots: {}
  };

  try {
    /* We can't assume FPF exists, as it's not declared as a dependency in all
     * MFEs, so we import it dynamically. In addition, for dynamic imports to
     * work with Webpack all of the code that actually uses the imported module
     * needs to be inside the `try{}` block.
     */
    const { DIRECT_PLUGIN, PLUGIN_OPERATIONS } = await import('@openedx/frontend-plugin-framework');
    if (process.env.APP_ID == 'authn') {
      // Add HNUE styling globally
      addPlugins(config, 'header_slot', [
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'hnue_login_header',
            type: DIRECT_PLUGIN,
            priority: 1,
            RenderWidget: HNUELoginHeader,
          },
        },
        {
          op: PLUGIN_OPERATIONS.Insert,
          widget: {
            id: 'hnue_login_styles',
            type: DIRECT_PLUGIN,
            priority: 2,
            RenderWidget: HNUELoginStyles,
          },
        },
      ]);

      // Try multiple slots for branding
      const brandingSlots = ['sidebar_slot', 'left_sidebar_slot', 'content_before_slot', 'header_actions_slot'];
      brandingSlots.forEach(slotName => {
        try {
          addPlugins(config, slotName, [
            {
              op: PLUGIN_OPERATIONS.Insert,
              widget: {
                id: `hnue_login_branding_${slotName}`,
                type: DIRECT_PLUGIN,
                priority: 1,
                RenderWidget: HNUELoginBranding,
              },
            },
          ]);
        } catch (e) {
          // Slot might not exist, continue
        }
      });

      // Add HNUE footer
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
    if (process.env.APP_ID == 'authoring') {
    }
    if (process.env.APP_ID == 'account') {
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
    if (process.env.APP_ID == 'communications') {
    }
    if (process.env.APP_ID == 'discussions') {
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
    if (process.env.APP_ID == 'gradebook') {
    }
    if (process.env.APP_ID == 'learner-dashboard') {
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
    if (process.env.APP_ID == 'learning') {
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
    if (process.env.APP_ID == 'ora-grading') {
    }
    if (process.env.APP_ID == 'profile') {
      addPlugins(config, 'footer_slot', [ 
            {
                op: PLUGIN_OPERATIONS.Hide,
                widgetId: 'default_contents',
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'hnue_footer',
                    type: DIRECT_PLUGIN,
                    priority: 1,
                    RenderWidget: HNUEFooter,
                },
            },
            {
                op: PLUGIN_OPERATIONS.Insert,
                widget: {
                    id: 'read_theme_cookie',
                    type: DIRECT_PLUGIN,
                    priority: 2,
                    RenderWidget: AddDarkTheme,
                },
            },
  ]);
    }
  } catch (err) { console.error("env.config.jsx failed to apply: ", err);}

  return config;
}

export default setConfig;