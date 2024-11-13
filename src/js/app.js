import '../vendor/style.css';
import '../vendor/main.css';

var app = (function ($) {
  // const languages = [
  //   { code: 'en', path: require('../lang/en.js') },
  //   { code: 'vi', path: require('../lang/vi.js') },
  // ];

  // console.log(languages)


  function addMetaTag(name, content) {
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("name", name);
    metaTag.setAttribute("content", content);
    document.head.appendChild(metaTag);
  }
  function addProperty(name, content) {
    const metaTag = document.createElement("meta");
    metaTag.setAttribute("property", name);
    metaTag.setAttribute("content", content);
    document.head.appendChild(metaTag);
  }

  function getParams () {
    const urlParams = new URLSearchParams(window.location.search);
    const params = {};
    urlParams.forEach((value, key) => {
        params[key] = value;
    });
    addMetaTag("description", "This is a dynamically created description.");
    addMetaTag("keywords", "JavaScript, HTML, metadata, dynamic");
    addMetaTag("author", "Jane Doe");
    addProperty("og:title", `${params.siteName || ''} Experienceday | Mitsubishi Motors Vietnam`);
    $('.container').find('.primary-site').text(params.siteName);
    $('.link-site').attr ('href' , `${window.location.href}`);
  }

  function init () {
    // document.title = `Updated Page Title`;
    // const metaDescription = document.querySelector("meta[name='description']");
    // const metaProperty = document.querySelector("meta[property='og:title']");
   // metaDescription.setAttribute("content", `${window.location.href} Mitsubishi Motors Việt Nam`);
    // metaProperty.setAttribute("content", `${window.location.href} Mitsubishi Motors Việt Nam`);

    

    getParams();
  }
  return {
    init
  }
})(jQuery);

$(document).ready(function () {
    app.init();
})



