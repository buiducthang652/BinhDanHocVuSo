/**
 * User Dashboard Redirect Functionality
 * When user clicks on their username, redirect to dashboard instead of showing dropdown
 */

$(document).ready(function() {
    'use strict';

    const $toggleUserDropdown = $('.toggle-user-dropdown');
    const $dropdownMenu = $('.dropdown-user-menu');
    
    // Handle click on username to redirect to dashboard
    $toggleUserDropdown.on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Add visual feedback
        $(this).css('transform', 'translateY(1px) scale(0.98)');
        
        // Redirect to dashboard after brief delay for visual feedback
        setTimeout(function() {
            window.location.href = '/dashboard';
        }, 100);
    });

    // Handle keyboard navigation
    $toggleUserDropdown.on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // Hide dropdown menu since we're redirecting instead
    $dropdownMenu.hide();
    
    // Update ARIA attributes to reflect new behavior
    $toggleUserDropdown.attr({
        'aria-expanded': 'false',
        'aria-haspopup': 'false',
        'title': 'Chuyển đến Dashboard'
    });

    // Optional: Add tooltip for better UX
    $toggleUserDropdown.attr('title', 'Click để chuyển đến Dashboard');
    
    // Remove dropdown arrow since we're not showing dropdown
    $toggleUserDropdown.addClass('no-dropdown-arrow');
});