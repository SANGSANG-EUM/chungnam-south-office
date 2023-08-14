$(document).ready(function () {

  // 동일 박스 높이
  $(".match_h > *").matchHeight();


  if ($(window).width() > 1025) {
    let last_scrollTop = 0;
    $(window).scroll(function () {
      if ($(this).scrollTop() > 150) {
        let tmp = $(this).scrollTop();
        if (tmp > last_scrollTop) {
          // scroll down event
          $('.header').addClass('hidden');
        } else {
          // scroll up event
          $('.header').removeClass('hidden');
        }
        last_scrollTop = tmp;
      } else {
        $('.header').removeClass('hidden');
      }
    });
  }

  // 모바일 헤더 그림자
  if ($(window).width() > 1025) {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 0) {
        $('.header').addClass('shadow');
      } else {
        $('.header').removeClass('shadow');
      }
    });
  }

  // gnb 오버
  $('body').on('mouseenter focusin', '.nav--menu .gnb-li', function () {
    $('.nav--menu .gnb-dep2-ul').stop().slideUp(200);
    $(this).find('.gnb-dep2-ul').stop().slideDown(200);
  });
  $('body').on('mouseleave focusout', '.nav--menu .gnb-li', function () {
    $('.nav--menu .gnb-dep2-ul').stop().slideUp(200);
  });

  // 사이트맵
  $('body').on('click', '.sitemap-open', function () {

    let sitemapHidden = $(".skip, .nav--menu");
    let sitemapTab = $('.sitemap').find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
    let sitemapTabFirst = sitemapTab && sitemapTab.first();
    let sitemapTabLast = sitemapTab && sitemapTab.last();

    $('.sitemap').fadeIn().focus();
    $(".match_h > *").matchHeight();
    $('body, html, .container').addClass('scroll-lock');

    sitemapHidden.attr("aria-hidden", "true"); // 레이어 바깥 영역을 스크린리더가 읽지 않게

    sitemapTab.length ? sitemapTabFirst.focus().on("keydown", function (event) {
      // 레이어 열리자마자 초점 받을 수 있는 첫번째 요소로 초점 이동
      if (event.shiftKey && (event.keyCode || event.which) === 9) {
        // Shift + Tab키 : 초점 받을 수 있는 첫번째 요소에서 마지막 요소로 초점 이동
        event.preventDefault();
        sitemapTabLast.focus();
      }
    }) : lpObj.attr("tabindex", "0").focus().on("keydown", function (event) {
      tabDisable = true;
      if ((event.keyCode || event.which) === 9) event.preventDefault();
      // Tab키 / Shift + Tab키 : 초점 받을 수 있는 요소가 없을 경우 레이어 밖으로 초점 이동 안되게
    });

    sitemapTabLast.on("keydown", function (event) {
      if (!event.shiftKey && (event.keyCode || event.which) === 9) {
        // Tab키 : 초점 받을 수 있는 마지막 요소에서 첫번째 요소으로 초점 이동
        event.preventDefault();
        sitemapTabFirst.focus();
      }
    });

    $('.sitemap').keydown(function (event) {
      if (event.keyCode == 27 || event.which == 27) { //ecs키로 사이트맵 닫기
        $('.sitemap').fadeOut();
      }
    });
  });

  $('body').on('click', '.sitemap-close', function () {
    $('.sitemap').fadeOut();
    $('body, html, .container').removeClass('scroll-lock');
  });


  // 푸터 슬라이드
  $(window).on('load', function () {
    $(".footer-slider").slick({
      slidesToShow: 1,
      variableWidth: true,
      accessibility: true,
      slidesToScroll: 1,
      infinite: true,
      arrows: true,
      autoplay: true,
      responsive: [{
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
        }
      }]
    });

    // accessibility가 false일 경우에 슬라이드 한번씩 다 흩기
    // $('.footer-slide.slick-cloned a').attr('tabindex', '-1')

    // > controller
    let $ft_sl_prev = $(".footer-slider").find(".slick-prev"),
      $ft_sl_next = $(".footer-slider").find(".slick-next");

    let $ft_sl_prev_tg = $(".footer-sl-prev"),
      $ft_sl_next_tg = $(".footer-sl-next"),
      $ft_sl_pause = $(".footer-sl-pause");
    $ft_sl_play = $(".footer-sl-play");

    // >> prev, next
    $ft_sl_prev_tg.on('click', function () {
      $ft_sl_prev.trigger('click');
    });
    $ft_sl_next_tg.on('click', function () {
      $ft_sl_next.trigger('click');
    });

    // >> pause, play
    $ft_sl_pause.on('click', function () {
      $(".footer-slider").slick('slickPause');
      $(this).css('display', 'none');
      $ft_sl_play.css('display', 'flex');
    });
    $ft_sl_play.on('click', function () {
      $(".footer-slider").slick('slickPlay');
      $(this).css('display', 'none');
      $ft_sl_pause.css('display', 'flex');
    });
  });


  // 푸터 탑버튼
  $(window).on('scroll', function () {
    if ($(window).scrollTop() > 100) {
      $('.btn-top').fadeIn().css('display', 'flex');
    } else {
      $('.btn-top').fadeOut();
    }
  });

  $('body').on('click', '.btn-top', function () {
    $('html, body').animate({
      scrollTop: 0 // 0 까지 animation 이동합니다. 
    }, 400); // 속도 400 
    return false;
  });

  $(window).scroll(function () {
    if ($(document).height() - 138 <= $(window).scrollTop() + $(window).height()) {
      $('.btn-top').addClass('abs')
    } else {
      $('.btn-top').removeClass('abs')
    }
  });



  // 메인비주얼 슬라이드        
  let mainvisual = new Swiper(".main-visual-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    effect: "fade",
    pagination: {
      el: ".main-visual-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".main-visual-arrow.next",
      prevEl: ".main-visual-arrow.prev",
    },
    on: {
      slideChange: function () {
        $('.main-visual-current').text(mainvisual.realIndex + 1)
      },
    },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
  });

  // praction 커스텀
  $('.main-visual-current').text('1');
  let mainTot = $('.main-visual-slider .main-visual-slide').length;
  $('.main-visual-total').text(mainTot);

  // 메인 비주얼 슬라이드 정지
  $(".main-visual-btn.pause").click(function () {
    mainvisual.autoplay.stop();
    $(this).css('display', 'none');
    $(".main-visual-btn.play").css('display', 'flex');
  });

  // 메인 비주얼 슬라이드 다시재생
  $(".main-visual-btn.play").click(function () {
    mainvisual.autoplay.start();
    $(this).css('display', 'none');
    $(".main-visual-btn.pause").css('display', 'flex');
  });


  // 메인 팝업(배너) 슬라이드        
  let bannerSl = new Swiper(".main-banner-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".main-banner-arrow.next",
      prevEl: ".main-banner-arrow.prev",
    },
    on: {
      slideChange: function () {
        $('.main-banner-current').text(bannerSl.realIndex + 1)
      },
    },
    a11y: {
      prevSlideMessage: '이전 슬라이드',
      nextSlideMessage: '다음 슬라이드',
      slideLabelMessage: '총 {{slidesLength}}장의 슬라이드 중 {{index}}번 슬라이드 입니다.',
    },
  });

  // praction 커스텀
  $('.main-banner-current').text('1');
  let bannerTot = $('.main-banner-slider .main-banner-slide').length;
  $('.main-banner-total').text(bannerTot);

  // 메인 비주얼 슬라이드 정지
  $(".main-banner-btn.pause").click(function () {
    bannerSl.autoplay.stop();
    $(this).css('display', 'none');
    $(".main-banner-btn.play").css('display', 'flex');
  });

  // 메인 비주얼 슬라이드 다시재생
  $(".main-banner-btn.play").click(function () {
    bannerSl.autoplay.start();
    $(this).css('display', 'none');
    $(".main-banner-btn.pause").css('display', 'flex');
  });


  // 메인 출장소 새소식 탭박스
  $('.main-news-cate').on('focus', function () {
    let newsLabel = $(this).attr('aria-controls');
    $('.main-news-cate').removeClass('active');
    $(this).addClass('active');
    $('.main-news-box-ul').removeClass('active');
    $(`.${newsLabel}`).addClass('active');
  });


  //서브로케이션
  $('.sub-loca-selbtn').attr('title', '열기');
  $('.sub-loca-selbtn').click(function () { //tab키로 바로 하위 메뉴로 접근하려면 click 대신 mousedown을 사용 / enter로 하위 메뉴 접근시에는 click 사용
    if ($(this).siblings('.sub-loca-li-inner').hasClass('on')) {
      $(this).siblings('.sub-loca-li-inner').removeClass('on');
      $(this).attr('title', '열기').removeClass('on');
    } else {
      $('.sub-loca-li-inner').removeClass('on');
      $(this).siblings('.sub-loca-li-inner').addClass('on');
      $('.sub-loca-selbtn').removeClass('on');
      $('.sub-loca-selbtn').attr('title', '열기');
      $(this).attr('title', '닫기').addClass('on');
    }
  });

  // $('.sub-loca-btn').on('focus', function() { //mousedown 사용시에 주석 해제
  //   $('.sub-loca-li-inner').removeClass('on');
  //   $(this).siblings('.sub-loca-li-inner').addClass('on');
  // });

  // 서브로케이션 외의 영역 클릭시 박스 사라짐
  $(document).on('mouseup focusout', function (e) {
    if ($(".sub-location-ul").has(e.target).length === 0) {
      $('.sub-loca-li-inner').removeClass('on');
      $('.sub-loca-selbtn').removeClass('on');
      $('.sub-loca-selbtn').attr('title', '열기');
    }
  });

});