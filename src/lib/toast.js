import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

// Neutral, premium theme matching the portfolio: cream / ink / accent (#fcba04)
const baseStyle = {
  background: '#fbfaf7',
  color: '#12120f',
  backdrop: `rgba(241, 240, 234, 0.9)`,
  confirmButtonColor: '#fcba04',
  denyButtonColor: '#6e6c63',
  cancelButtonColor: '#e4e0d5',
  showClass: {
    popup: 'swal2-show fade-in-down',
  },
  hideClass: {
    popup: 'swal2-hide fade-out-up',
  },
};

// Inject custom keyframe animations once
if (typeof document !== 'undefined' && !document.getElementById('swal-animations')) {
  const style = document.createElement('style');
  style.id = 'swal-animations';
  style.textContent = `
    @keyframes fade-in-down {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fade-out-up {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
    .swal2-title { font-family: 'DM Serif Display', Georgia, serif; font-weight: 400; letter-spacing: -0.01em; }
    .swal2-content { font-family: Raleway, ui-sans-serif, system-ui, sans-serif; font-size: 0.9375rem; line-height: 1.5; }
    .swal2-html-container { font-family: Raleway, ui-sans-serif, system-ui, sans-serif; }
    .swal2-popup { border-radius: 8px; border: 1px solid #e4e0d5; }
    .swal2-confirm { background: #fcba04; color: #12120f; border: none; border-radius: 4px; padding: 0.5em 1.25em; font-family: Raleway, ui-sans-serif, system-ui, sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.875rem; }
    .swal2-confirm:hover { background: #e6a800; }
    .swal2-deny { background: transparent; color: #6e6c63; border: 1px solid #e4e0d5; border-radius: 4px; font-family: Raleway, ui-sans-serif, system-ui, sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.875rem; }
    .swal2-deny:hover { background: #f3f1ea; }
    .swal2-cancel { background: transparent; color: #e4e0d5; border: 1px solid #e4e0d5; border-radius: 4px; font-family: Raleway, ui-sans-serif, system-ui, sans-serif; font-weight: 600; text-transform: uppercase; letter-spacing: 0.14em; font-size: 0.875rem; }
    .swal2-cancel:hover { background: #f3f1ea; }
  `;
  document.head.appendChild(style);
}

export const toast = {
  success: (title, message = '', timer = 3000) =>
    Swal.fire({
      ...baseStyle,
      icon: 'success',
      title,
      text: message,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      customClass: { popup: 'swal2-toast' },
    }),

  error: (title, message = '') =>
    Swal.fire({
      ...baseStyle,
      icon: 'error',
      title,
      text: message,
      confirmButtonText: 'OK',
    }),

  warning: (title, message = '') =>
    Swal.fire({
      ...baseStyle,
      icon: 'warning',
      title,
      text: message,
      confirmButtonText: 'OK',
    }),

  info: (title, message = '', timer = 4000) =>
    Swal.fire({
      ...baseStyle,
      icon: 'info',
      title,
      text: message,
      timer,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end',
      customClass: { popup: 'swal2-toast' },
    }),

  confirm: (title, message = '', { confirmText = 'Yes, delete', cancelText = 'Cancel' } = {}) =>
    Swal.fire({
      ...baseStyle,
      icon: 'warning',
      title,
      text: message,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      focusCancel: true,
    }).then((result) => result.isConfirmed),

  loading: (title = 'Please wait…') =>
    Swal.fire({
      ...baseStyle,
      title,
      text: '',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    }),

  close: () => Swal.close(),
};

export default toast;
