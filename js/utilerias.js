const toast = msg => {
  const $toast = document.querySelectorAll(".toast")[0];
  const $toastbody = $toast.getElementsByClassName("toast-body")[0];
  //como segundo parámetro admite opciones como: animation, autohide, delay
  const bootToast = new bootstrap.Toast($toast);
  if ($toastbody) {
    $toastbody.innerText = msg;
    bootToast.show();
  }
}

document.querySelector('.nav-link').onclick = () => {
  alert(target);
};



