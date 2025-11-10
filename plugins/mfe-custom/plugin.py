from tutor import hooks

# Plugin configuration
config = {
    "defaults": {
        "VERSION": "1.0.0",
    }
}

# Plugin name and version
__version__ = "1.0.0"

# Enable this plugin to override MFE footer
hooks.Filters.ENV_TEMPLATE_TARGETS.add_item(
    ("mfe-custom/build/mfe", "plugins/mfe/build/mfe")
)

# Add custom footer configuration
@hooks.Filters.ENV_PATCHES.add()
def _mfe_custom_footer_env_patches(patches):
    """Add custom footer patches to MFE env.config.jsx"""
    patches.append(
        (
            "mfe-docker-post-npm-install", 
            """
# Install custom footer component dependencies if needed
# RUN npm install --save react react-dom
"""
        )
    )
    return patches