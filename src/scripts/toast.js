export function showToast(type) {
    const toast = document.getElementById(type + "-toast");
    toast.classList.remove("hide");
    setTimeout(function() {
      toast.classList.add("hide");
    }, 2000);
  }