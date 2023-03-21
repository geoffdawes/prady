//All pages splitting up the headings for the intro/outro animation
let typeSplit;
function runSplit() {
  typeSplit = new SplitType("[text-split], [scroll-split]", {
    types: "lines, words, chars"
  });
}
runSplit();

let windowWidth = $(window).innerWidth();
window.addEventListener("resize", function () {
  if (windowWidth !== $(window).innerWidth()) {
    windowWidth = $(window).innerWidth();
    typeSplit.revert();
    runSplit();
    gsap.to("[text-split] .char", {
      y: "0%",
      ease: "power2.out",
      stagger: {
        each: 0.04,
        from: "start"
      }
    });
  }
});

//COUNTUP TEXT
$(".skill-value").each(function (index) {
  // assign ID
  let thisId = "countup" + index;
  $(this).attr("id", thisId);
  // create variables
  let startNumber = +$(this).text();
  let endNumber = +$(this).attr("final-number");
  let decimals = 0;
  let duration = $(this).attr("count-duration");
  // animate number
  let myCounter = new CountUp(
    thisId,
    startNumber,
    endNumber,
    decimals,
    duration
  );
  // Scroll out of view trigger
  ScrollTrigger.create({
    trigger: $(this),
    start: "top bottom",
    end: "bottom top",
    onLeaveBack: () => {
      myCounter.reset();
    }
  });
  // Scroll into view trigger
  ScrollTrigger.create({
    trigger: $(this),
    start: "top 90%",
    end: "bottom top",
    onEnter: () => {
      myCounter.start();
    }
  });
});
//LENIS SMOOTH SCROLL
const lenis = new Lenis({
  duration: 2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  direction: "vertical", // vertical, horizontal
  gestureDirection: "vertical", // vertical, horizontal, both
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
//END LENIS SMOOTH SCROLL

//GROW SQUARE SCROLLTRIGGER
function animateFloatingShape() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(".floating-section"),
      start: "top center",
      end: "bottom bottom",
      scrub: true,
      transformOrigin: "bottom left"
    }
  });
  tl.to($(".floating-shape"), { width: "60%", ease: "none" });
}

function animateFloatingShapeMobile() {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(".floating-section"),
      start: "top bottom",
      end: "bottom 20%",
      scrub: true,
      transformOrigin: "bottom left"
    }
  });
  tl.to($(".floating-shape"), { width: "70%", ease: "none" });
}

//END GROW SQUARE SCROLLTRIGGER

//WORK CURSOR IMAGE
$(".work-row").on("mouseenter", function () {
  $(this).addClass("hovered");
});
$(".work-row").on("mouseleave", function () {
  var $this = $(this);
  setTimeout(function () {
    $this.removeClass("hovered");
  }, 400);
});
$(".work-wrapper").on("mouseenter mouseleave", function () {
  $(".cursor_wrapper").toggleClass("show");
});
//END WORK CURSOR IMAGE

$(".portfolio-row").on("mouseenter touchstart", function () {
  $(this).toggleClass("hovered");
});

$(".portfolio-row").on("mouseleave touchend", function () {
  var $this = $(this);
  setTimeout(function () {
    $this.removeClass("hovered");
  }, 400);
});

//WORD SCRAMBLE TO NEW WORD ON HOVER
$(document).ready(function () {
  $(".hover-scramble").each(function () {
    var $scrambleHolder = $(this);
    var originalWord = $scrambleHolder.attr("original-word");
    var alternateWord = $scrambleHolder.attr("alternate-word");
    var shuffleCount = 0;
    var intervalId;
    var initialText;

    $scrambleHolder.on("mouseenter touchstart", function () {
      initialText = $scrambleHolder.text();
      if (initialText !== originalWord) {
        originalWord = $scrambleHolder.attr("alternate-word");
        alternateWord = $scrambleHolder.attr("original-word");
      }
      $scrambleHolder.text(originalWord);
      intervalId = setInterval(shuffleLetters, 100);
    });

    $scrambleHolder.on("mouseleave touchend", function () {
      clearInterval(intervalId);
      $scrambleHolder.text(initialText);
      shuffleCount = 0;
    });

    function shuffleLetters() {
      var word = $scrambleHolder.text();
      var letters = word.split("");
      for (var i = letters.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = letters[i];
        letters[i] = letters[j];
        letters[j] = temp;
      }
      $scrambleHolder.text(letters.join(""));
      shuffleCount++;
      if (shuffleCount === 3) {
        clearInterval(intervalId);
        $scrambleHolder.text(alternateWord);
        shuffleCount = 0;
      }
    }
  });
});

//END WORD SCRAMBLE TO NEW WORD ON HOVER

//WORDS SHUFFLING ON LOOP
$(document).ready(function () {
  var $loopScramble = $(".scramble-holder");
  var loopOriginal = $loopScramble.text();
  var loopAlternate = $loopScramble.attr("looping-words").split(",");
  var loopIndex = 0;
  var loopCount = 0;
  var loopintervalId;

  // Show the original word on page load
  $loopScramble.text(loopOriginal);

  // Start the scramble animation loop after a delay of 1 second
  setTimeout(function () {
    loopintervalId = setInterval(scrambleLetters, 100);
  }, 1000);

  function scrambleLetters() {
    var word = $loopScramble.text();
    var letters = word.split("");
    for (var i = letters.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = letters[i];
      letters[i] = letters[j];
      letters[j] = temp;
    }
    $loopScramble.text(letters.join(""));
    loopCount++;

    // If the current word has been scrambled 3 times, pause the animation and
    // show the unscrambled word for 1 second before resuming the animation
    if (loopCount === 4) {
      clearInterval(loopintervalId);
      setTimeout(function () {
        $loopScramble.text(loopAlternate[loopIndex]);
        setTimeout(function () {
          loopCount = 0;
          loopIndex++;
          if (loopIndex === loopAlternate.length) {
            loopIndex = 0;
          }
          loopintervalId = setInterval(scrambleLetters, 100);
        }, 1000);
      }, 0);
    }
  }
});

//END WORDS SHUFFLING ON LOOP

// CMS LIST SYNC POWER-UP
window.addEventListener("DOMContentLoaded", (event) => {
  // attribute value checker
  function attr(defaultVal, attrVal) {
    const defaultValType = typeof defaultVal;
    if (typeof attrVal !== "string" || attrVal.trim() === "") return defaultVal;
    if (attrVal === "true" && defaultValType === "boolean") return true;
    if (attrVal === "false" && defaultValType === "boolean") return false;
    if (isNaN(attrVal) && defaultValType === "string") return attrVal;
    if (!isNaN(attrVal) && defaultValType === "number") return +attrVal;
    return defaultVal;
  }
  // cms list sync component
  $("[tr-listsync-element='component']").each(function (index) {
    let componentEl = $(this),
      cmsListEl = componentEl.find("[tr-listsync-element='list']"),
      cmsItemEl = cmsListEl.children(),
      prevButtonEl = componentEl.find("[tr-listsync-element='button-prev']"),
      nextButtonEl = componentEl.find("[tr-listsync-element='button-next']");
    let onLoadSetting = attr(false, componentEl.attr("tr-listsync-onload")),
      activeIndexSetting = attr(0, componentEl.attr("tr-listsync-activeindex")),
      activeClassSetting = attr(
        "is-active",
        componentEl.attr("tr-listsync-activeclass")
      );
    function addActive(trigger) {
      cmsItemEl.removeClass(activeClassSetting);
      let itemIndex = trigger.index();
      cmsListEl.each(function () {
        $(this).children().eq(itemIndex).addClass(activeClassSetting);
      });
    }
    if (onLoadSetting) addActive(cmsItemEl.eq(activeIndexSetting));
    cmsListEl.each(function () {
      let childrenItemEl = $(this).children(),
        clickSetting = attr(true, $(this).attr("tr-listsync-click")),
        hoverInSetting = attr(false, $(this).attr("tr-listsync-hoverin")),
        hoverOutSetting = attr(false, $(this).attr("tr-listsync-hoverout"));
      if (clickSetting) {
        childrenItemEl.on("click", function () {
          addActive($(this));
        });
      }
      if (hoverInSetting) {
        childrenItemEl.on("mouseenter", function () {
          addActive($(this));
        });
      }
      if (hoverOutSetting) {
        childrenItemEl.on("mouseleave", function () {
          cmsItemEl.removeClass(activeClassSetting);
        });
      }
    });
    prevButtonEl.on("click", function () {
      cmsListEl.each(function (index) {
        let childrenItemEl = $(this).children();
        let currentItemEl = childrenItemEl
          .filter("." + activeClassSetting)
          .removeClass(activeClassSetting);
        let prevItemEl = currentItemEl.prev();
        if (prevItemEl.length === 0) prevItemEl = childrenItemEl.last();
        prevItemEl.addClass(activeClassSetting);
      });
    });
    nextButtonEl.on("click", function () {
      cmsListEl.each(function (index) {
        let childrenItemEl = $(this).children();
        let currentItemEl = childrenItemEl
          .filter("." + activeClassSetting)
          .removeClass(activeClassSetting);
        let nextItemEl = currentItemEl.next();
        if (nextItemEl.length === 0) nextItemEl = childrenItemEl.first();
        nextItemEl.addClass(activeClassSetting);
      });
    });
  });
});

//PAGE LOAD ANIMATIONS
function pageLoad() {
  let introTl = gsap.timeline();
  introTl.to(".page-content", {
    opacity: 1,
    ease: "power4.out",
    duration: 0.4
  });

  introTl.from(".intro-h1", {
    opacity: 0,
    ease: "power2.out",
    duration: 1
  });

  introTl.to("[load-line-expand]", {
    width: "100%",
    duration: 1.4,
    ease: "power3.inOut"
  });
  introTl.to(
    ".nav-flex",
    {
      y: "0%",
      opacity: 1,
      ease: "power2.inOut",
      duration: 1.4
    },
    "<"
  );

  introTl.to(
    "[text-split] .char",
    {
      y: "0%",
      ease: "power2.out",
      stagger: {
        each: 0.04,
        from: "start"
      }
    },
    "<"
  );

  introTl.to(
    ".intro-img_holder",
    {
      clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      duration: 1.4,
      ease: "power2.out"
    },
    3
  );

  introTl.to(
    ".social-section",
    {
      duration: 0.4,
      opacity: 1,
      ease: "power4.in"
    },
    3
  );
}
pageLoad();

//SCROLL TRIGGERS

$("[lr-expand]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 90%",
      end: "top 90%"
    }
  });
  tl.from($(this), { width: "0%", duration: 1.4, ease: "power2.out" });
});

$("[scroll-split]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 90%",
      end: "top 90%"
    }
  });
  tl.from($(this).find(".char"), {
    duration: 0.6,
    y: "110%",
    ease: "power2.out",
    stagger: {
      each: 0.04,
      from: "start"
    }
  });
});

$("[fade-in]").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 80%",
      end: "top 80%"
    }
  });
  tl.from($(this), {
    duration: 0.4,
    opacity: 0,
    ease: "power4.in"
  });
});

$(".strike").each(function (index) {
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: $(this),
      start: "top 90%",
      end: "top 90%"
    }
  });
  tl.from($(this), { width: "0%", duration: 1.4, ease: "power2.out" }, 0.4);
});

//END SCROLL ANIMATIONS

$(".work-imgHolder").appendTo($(".cursor-item"));

//PIXELLATE IMAGES
// library code
(function (root) {
  window.URL = window.URL || window.webkitURL || window.mozURL;
  function disableSmoothRendering(ctx) {
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.msImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    return ctx;
  }
  function Pixelate(image, opts) {
    opts = opts || {};
    this.image = image;
    this.setAmount(opts.amount);
    var imageLoaded = function () {
      this.imageUrl = image.src;
      this.width = image.clientWidth;
      this.height = image.clientHeight;
      this.canvas = document.createElement("canvas");
      this.canvas.style.display = "none";
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      this.canvas.style.cssText =
        "image-rendering: optimizeSpeed;" + // FireFox < 6.0
        "image-rendering: -moz-crisp-edges;" + // FireFox
        "image-rendering: -o-crisp-edges;" + // Opera
        "image-rendering: -webkit-crisp-edges;" + // Chrome
        "image-rendering: crisp-edges;" + // Chrome
        "image-rendering: -webkit-optimize-contrast;" + // Safari
        "image-rendering: pixelated; " + // Future browsers
        "-ms-interpolation-mode: nearest-neighbor;"; // IE
      this.ctx = this.canvas.getContext("2d");
      this.ctx = disableSmoothRendering(this.ctx);
      this.image.parentNode.appendChild(this.canvas, this.image);
      this.image.onload = null;
      this.pixelImage = new Image();
      this.pixelImage.onload = function () {
        this.ready = true;
        this.render();
      }.bind(this);
      this.pixelImage.src = this.imageUrl;
    }.bind(this);
    if (this.image.complete) {
      imageLoaded();
    }
    this.image.onload = imageLoaded;
    return this;
  }
  Pixelate.prototype.setAmount = function (amount) {
    this.amount = 1 - (amount || 0);
    return this;
  };
  Pixelate.prototype.setWidth = function (width) {
    var height = (this.height / this.width) * width;
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = disableSmoothRendering(this.ctx);
    return this;
  };
  Pixelate.prototype.render = function () {
    if (!this.ready) return this;
    var w = this.width * (this.amount <= 0 ? 0.01 : this.amount);
    var h = this.height * (this.amount <= 0 ? 0.01 : this.amount);
    // render smaller image
    this.ctx.drawImage(this.pixelImage, 0, 0, w, h);
    // stretch the smaller image
    this.ctx.drawImage(this.canvas, 0, 0, w, h, 0, 0, this.width, this.height);
    this.image.src = this.canvas.toDataURL("image/jpeg");
    return this;
  };
  if (typeof exports !== "undefined") {
    if (typeof module !== "undefined" && module.exports) {
      exports = module.exports = Pixelate;
    }
    exports.pixelate = Pixelate;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return Pixelate;
    });
  } else {
    root.Pixelate = Pixelate;
  }
})(this);

// MY SCRIPT
$("[pixellate]").each(function (index) {
  let childImg = $(this).find("img")[0];
  let pixelate = new Pixelate(childImg, { amount: 0 });
  let progress = { value: 0.98 };

  let tl = gsap.timeline({
    paused: true,
    onUpdate: () => {
      pixelate.setAmount(progress.value).render();
    },
    ease: "power2.in",
    defaults: {
      delay: 0.1
    }
  });
  tl.set(progress, { value: 0.92, delay: 0 });
  tl.set(progress, { value: 0.88 });
  tl.set(progress, { value: 0.82 });
  tl.set(progress, { value: 0 });

  $(this).on("mouseenter", function () {
    tl.restart();
  });

  $(".logo").on("click", function () {
    tl.restart();
  });

  window.addEventListener("resize", function () {
    pixelate.setWidth(childImg.parentNode.clientWidth).render();
  });
});

//MOBILE ACCORDION
$(".faq_toggle").on("click", function () {
  // Close other accordions when opening new one
  if (!$(this).hasClass("open")) {
    $(".faq_toggle.open").click();
  }
  // Save the sibling of the toggle we clicked on
  let sibling = $(this).siblings(".faq_content");
  let animationDuration = 400;

  if ($(this).hasClass("open")) {
    // Close the content div if already open
    sibling.animate({ height: "0px" }, animationDuration);
  } else {
    // Open the content div if already closed
    sibling.css("height", "auto");
    let autoHeight = sibling.height();
    sibling.css("height", "0px");
    sibling.animate({ height: autoHeight }, animationDuration, function () {
      sibling.css("height", "auto");
    });
  }
  // Open and close the toggle div
  $(this).toggleClass("open");
});

$(".socials-bar_trigger").on("click", function () {
  $(".social-section").toggleClass("show");
});

$(".socials-bar_trigger").click(function () {
  if ($(".social-link_text").text() == "SOCIALS") {
    $(".social-link_text").text("CLOSE");
  } else {
    $(".social-link_text").text("SOCIALS");
  }
});

//GSAP MATCHMEDIA
let mm = gsap.matchMedia();
mm.add("(min-width: 768px)", () => {
  animateFloatingShape();
});

mm.add("(max-width: 767px)", () => {
  animateFloatingShapeMobile();
});
