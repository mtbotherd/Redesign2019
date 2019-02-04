<template>
  <!-- Top NavBar -->
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo01"
      aria-controls="navbarTogglerDemo01"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
      <a class="navbar-brand" href="#">Hidden brand</a>
      <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
        <li class="nav-item active">
          <a class="nav-link" href="#">
            Home
            <span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled" href="#">Disabled</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="http://example.com"
            id="navbarDropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >Dropdown link</a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <a class="dropdown-item" href="#">Action</a>
            </li>
            <li>
              <a class="dropdown-item" href="#">Another action</a>
            </li>
            <li class="dropdown-submenu">
              <a class="dropdown-item dropdown-toggle" href="#">Submenu</a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">Submenu action</a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">Another submenu action</a>
                </li>

                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle" href="#">Subsubmenu</a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">Subsubmenu action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Another subsubmenu action</a>
                    </li>
                  </ul>
                </li>
                <li class="dropdown-submenu">
                  <a class="dropdown-item dropdown-toggle" href="#">Second subsubmenu</a>
                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">Subsubmenu action</a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">Another subsubmenu action</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
    </div>
  </nav>
</template>

<script>
export default {};
const $ = require("jquery");
window.$ = $;

$(".dropdown-menu a.dropdown-toggle").on("click", function(e) {
  if (
    !$(this)
      .next()
      .hasClass("show")
  ) {
    $(this)
      .parents(".dropdown-menu")
      .first()
      .find(".show")
      .removeClass("show");
  }
  var $subMenu = $(this).next(".dropdown-menu");
  $subMenu.toggleClass("show");

  $(this)
    .parents("li.nav-item.dropdown.show")
    .on("hidden.bs.dropdown", function(e) {
      $(".dropdown-submenu .show").removeClass("show");
    });

  return false;
});
</script>

<style scoped>
.dropdown-submenu {
  position: relative;
}

.dropdown-submenu a::after {
  transform: rotate(-90deg);
  position: absolute;
  right: 6px;
  top: 0.8em;
}

.dropdown-submenu .dropdown-menu {
  top: 0;
  left: 100%;
  margin-left: 0.1rem;
  margin-right: 0.1rem;
}
</style>