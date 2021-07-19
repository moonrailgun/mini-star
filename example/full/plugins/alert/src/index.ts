// import cowsay from 'cowsay-browser';
import Swal from 'sweetalert2';

export function alert(text: string) {
  Swal.fire(text);
}
