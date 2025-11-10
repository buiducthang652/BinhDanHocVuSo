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