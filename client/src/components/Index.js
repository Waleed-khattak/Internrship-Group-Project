import React, { useEffect, useRef } from 'react';
const Index = () => {
    const container = useRef(null);
    useEffect(() => {
        if (!container.current) return;
        container.current.innerHTML = `<body>
<!-- Banner Area Start -->
<div class="banner__one pt-0 pt-md-5">
<div class="banner-shape">
<div class="shape banner-shape-1 d-none d-sm-none d-md-block"></div>
<div class="shape banner-shape-2 d-none d-sm-none d-md-block"></div>
<div class="shape banner-shape-3 d-none d-sm-none d-md-block"></div>
<div class="shape banner-shape-4 d-none d-sm-none d-md-block"></div>
<img alt="image" class="shape banner-shape-5 d-none d-sm-none d-md-block" src="images/shape-banner-shape.png"/>
<div class="shape banner-shape-7 d-none d-sm-none d-md-block"></div>
<div class="shape banner-shape-6 d-none d-sm-none d-md-block"></div>
</div>
<div class="container">
<div class="row align-items-center gy-4 justify-content-center">
<div class="col-xl-6 col-lg-6">
<div class="banner__one-content">
<span class="subtitle-one">School Management Software</span>
<h2>College &amp; School Management <span>Software</span></h2>
<p>Automate Institute Daily Operations, Generate Insightful Reports, Make Better &amp; Faster
                            Decisions. Ilmi Markaz is an online school management
                            system software that simplifies the institute's academic &amp; administrative process
                            effortlessly.</p>
<a class="btn-two" href="../SignUp/" target="_blank">Register Your Institute
                            <i class="fas fa-arrow-right"></i>
</a>
<a class="btn-one" download="" href="Ilmi-Markaz-Desktop-Setup-1.0.0.html" target="_blank">Download Desktop .exe
                            <i class="fas fa-arrow-right"></i>
</a>
</div>
</div>
<div class="col-xl-5 offset-xl-1 col-lg-6 col-md-9">
<div class="banner__one-image">
<div class="banner__one-image-wrapper">
<div class="banner__one-image-wrapper-shapes animate-rotate">
<div class="shape shape-1"></div>
<div class="shape shape-2"></div>
</div>
<img alt="image" src="images/banner-banner-right-img.png"/>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Banner Area End -->
<!-- About Area Start -->
<div class="about__one mt-4">
<div class="container">
<div class="row align-items-center flex-wrap-reverse gy-4">
<div class="col-xl-6 col-lg-5">
<div class="about__one-image">
<div class="experience-bar animate-y-axis-slider">
<i class="flaticon-consultant"></i>
<div class="experience-bar-right">
<div class="experience-bar-counter">
<h4 class="counter">30</h4>
<span>+</span>
</div>
<span>Schools Registered</span>
</div>
</div>
<div class="about__one-image-wrapper">
<img alt="" class="image-1" src="images/about-about-ilmimarkaz-techs.gif"/>
<img alt="" class="image-2" src="images/about-about-2.png"/>
</div>
</div>
</div>
<div class="col-xl-6 col-lg-7 col-md-9">
<div class="about__one-content">
<span class="subtitle-one">About us</span>
<h2>Transform Institute to Technology</h2>
<p>In today’s rapidly evolving world, technology is redefining the way educational institutions
                            operate, enabling them to meet the needs of
                            modern learners. By embracing digital solutions, institutes can improve accessibility,
                            enhance learning experiences, streamline administrative
                            tasks, and foster a collaborative and engaging environment. Here’s how technology is
                            transforming traditional institutes into modern
                            educational powerhouses:</p>
<div class="about__one-content-service">
<div class="service">
<i class="far fa-check-circle"></i>
<span>Data Management Experts</span>
</div>
<div class="service">
<i class="far fa-check-circle"></i>
<span>Mobile App Developments</span>
</div>
<div class="service">
<i class="far fa-check-circle"></i>
<span>IT Infrastructure Solutions</span>
</div>
<div class="service">
<i class="far fa-check-circle"></i>
<span>Data Analytics Consulting</span>
</div>
</div>
<a class="btn-one" href="about.html">Discover More
                            <i class="fas fa-arrow-right"></i>
</a>
</div>
</div>
</div>
</div>
</div>
<!-- About Area End -->
<div class="brand__area py-5 bg-light">
<div class="container">
<!-- Section Header -->
<div class="text-center mb-4">
<h3 class="fw-bold">Our Partner Schools</h3>
<p class="text-muted">Trusted by top institutions across the country</p>
</div>
<!-- Logos Slider -->
<div class="row brand__area-border">
<div class="col-xl-12">
<div class="swiper brand__slider">
<div class="swiper-wrapper">
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-1.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-2.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-3.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-4.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-6.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-7.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-8.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-9.jpg" title="school name"/>
</div>
</div>
<div class="brand__area-item swiper-slide text-center p-3">
<div class="school-logo-card shadow-sm p-3 bg-white rounded">
<img alt="school name" class="img-fluid school-logo" src="images/logos-10.jpg" title="school name"/>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Work Process Three Area End -->
<div class="work-process__three" style="background-image: url(http://ilmimarkaz.com/assets/img/work-process/work-process-bg-2.png);">
<div class="container">
<div class="row justify-content-center text-center mb-50">
<div class="col-xl-8 col-lg-8 col-md-9">
<span class="subtitle-one">Registration Process</span>
<h2>Get Your School Set Up in 3 Easy Steps</h2>
</div>
</div>
<div class="work-process__three-card">
<div class="work-process__three-card-arrows">
<img alt="" class="arrow-1" src="images/work-process-work-process-arrow-1.png"/>
<img alt="" class="arrow-2" src="images/work-process-work-process-arrow-2.png"/>
<img alt="" class="arrow-3" src="images/work-process-work-process-arrow-1.png"/>
</div>
<!-- Step 1: Register Account -->
<div class="work-process__three-card-single">
<h3>01</h3>
<h5>Register Your Account</h5>
<p>Sign up to create a secure account for your school. This quick setup helps you manage everything
                        from a single platform.</p>
</div>
<!-- Step 2: Insert School Details -->
<div class="work-process__three-card-single middle">
<h3>02</h3>
<h5>Insert School Information</h5>
<p>Enter your school's details, including campus locations, available facilities, and class
                        structure. This data ensures seamless school operations.</p>
</div>
<!-- Step 3: Ready for School Activities -->
<div class="work-process__three-card-single">
<h3>03</h3>
<h5>Ready for School Activities</h5>
<p>Once your setup is complete, you can start managing admissions, timetables, fees, and more. Your
                        school is now ready for all daily activities.</p>
</div>
</div>
</div>
</div>
<!-- Work Process Three Area End -->
<!-- Why Choose us Area Start -->
<div class="why-choose-us__one section-padding">
<div class="container">
<div class="row gy-4 align-items-center">
<div class="col-xl-6 col-lg-7 col-md-9">
<div class="why-choose-us__one-left">
<div class="why-choose-us__one-title">
<span class="subtitle-one">Why Chose Us</span>
<h2>Free, Secure, Flexible and Scalable</h2>
<p>Our software grows with you. Whether you’re a small institution or a large network of
                                schools, our system scales to accommodate your needs
                                without compromising on performance or usability.</p>
</div>
<div class="why-choose-us__one-quality">
<div class="why-choose-us__one-quality-single">
<div class="icon">
<i class="flaticon-machine-repair"></i>
</div>
<div class="why-choose-us__one-quality-single-content">
<h4>User-Friendly and Accessible</h4>
<p>We prioritize a smooth user experience, ensuring that our software is accessible
                                        to educators, parents, and administrators of all
                                        technical skill levels. we make managing and engaging with the platform easy.
                                    </p>
</div>
</div>
<div class="why-choose-us__one-quality-single">
<div class="icon">
<i class="flaticon-web-research"></i>
</div>
<div class="why-choose-us__one-quality-single-content">
<h4>Reliable Global Support</h4>
<p>Our dedicated support team is available to help you with setup, customization,
                                        training, and ongoing support, ensuring a smooth
                                        experience for every user.</p>
</div>
</div>
</div>
</div>
</div>
<div class="col-xl-5 offset-xl-1 col-lg-6 col-md-10">
<div class="why-choose-us__one-image">
<div class="why-choose-us__one-image-shape">
<div class="shape shape-1 animate-x-axis"></div>
<div class="shape shape-2 animate-x-axis"></div>
<img alt="" class="shape shape-3 animate-y-axis" src="images/shape-why-choose-shape.png"/>
</div>
<img alt="image" src="images/why-choose-us-why-choose.png"/>
</div>
</div>
</div>
</div>
</div>
<!-- Why choose us Area End -->
<!-- Services Area Start -->
<div class="services__one mt-5">
<div class="container">
<div class="row justify-content-center text-center">
<div class="col-xl-9 col-lg-9 col-md-10 services__one-title">
<span class="subtitle-one">Core Benefits</span>
<h2>School Management System Features &amp; Benefits</h2>
</div>
</div>
<div class="row align-items-center justify-content-center">
<div class="col-xl-3">
<div class="row">
<div class="col-xl-12 col-md-6">
<div class="single-service">
<div class="services__one-single-service-icon">
<i class="flaticon-global-network"></i>
</div>
<div class="services__one-single-service-content">
<h4>Secure Data Storage and Accessibility</h4>
<p>Data backups, encryption, and strict access controls help protect student and
                                        school data, allowing you to focus on education with peace
                                        of mind.</p>
</div>
</div>
</div>
<div class="col-xl-12 col-md-6 xl-mb-30">
<div class="single-service">
<div class="services__one-single-service-icon">
<i class="flaticon-mobile-phone-1"></i>
</div>
<div class="services__one-single-service-content">
<h4>Customizable to Fit Your Unique Needs</h4>
<p>Every school has unique requirements, and our software is built with
                                        customization in mind.</p>
</div>
</div>
</div>
</div>
</div>
<div class="col-xl-6 col-lg-7">
<div class="services-image-wrapper">
<img alt="image" src="images/service-services.png"/>
</div>
</div>
<div class="col-xl-3">
<div class="row">
<div class="col-xl-12 col-md-6">
<div class="single-service">
<div class="services__one-single-service-icon">
<i class="flaticon-idea"></i>
</div>
<div class="services__one-single-service-content">
<h4>Mobile Accessibility</h4>
<p>Our mobile-friendly software allows users to access key features on the go,
                                        ensuring that everyone stays connected, whether they’re in
                                        the classroom, at home, or on the road.</p>
</div>
</div>
</div>
<div class="col-xl-12 col-md-6">
<div class="single-service">
<div class="services__one-single-service-icon">
<i class="flaticon-it"></i>
</div>
<div class="services__one-single-service-content">
<h4>Automated Financial Management</h4>
<p>Our software includes built-in financial management features that automate
                                        billing, invoicing, and payment tracking.</p>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Services Area End -->
<!-- Blog Area Start -->
<div class="blog__four my-5">
<div class="container">
<div class="row justify-content-center text-center">
<div class="col-xl-7 col-lg-7 col-md-8 col-sm-9">
<div class="blog__four-title">
<span class="subtitle-one">Blog And news</span>
<h2>Read our latest articles for your</h2>
</div>
</div>
</div>
<div class="row gy-4">
<div class="col-xl-4 col-lg-6">
<div class="blog__one-single-blog">
<div class="blog__one-single-blog-image">
<img alt="image" src="images/blog-why-choose-ilmi-markaz.png"/>
</div>
<div class="blog__one-single-blog-date">
<span class="date">22</span>
<span class="month">Nov</span>
</div>
<div class="blog__one-single-blog-content">
<div class="blog__one-single-blog-content-top">
<span>
<i class="fas fa-user"></i>
                                    by Admin
                                </span>
</div>
<a class="blog-heading" href="why-choose-ilmimarkaz.html"> Why
                                Choose Ilmi Markaz for Your School Management System?</a>
<a class="btn-three" href="why-choose-ilmimarkaz.html">Read More
                                <i class="fas fa-angle-right"></i>
</a>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6">
<div class="blog__one-single-blog">
<div class="blog__one-single-blog-image">
<img alt="image" src="images/blog-school-management-system-free%E2%80%93school-software-in-pakistan.png"/>
</div>
<div class="blog__one-single-blog-date">
<span class="date">09</span>
<span class="month">Mar</span>
</div>
<div class="blog__one-single-blog-content">
<div class="blog__one-single-blog-content-top">
<span>
<i class="fas fa-user"></i>
                                    by Admin
                                </span>
</div>
<a class="blog-heading" href="school-software-in-pakistan.html">School Management System Free – School Software in Pakistan</a>
<a class="btn-three" href="school-software-in-pakistan.html">Read
                                More
                                <i class="fas fa-angle-right"></i>
</a>
</div>
</div>
</div>
<div class="col-xl-4 col-lg-6">
<div class="blog__one-single-blog">
<div class="blog__one-single-blog-image">
<img alt="image" src="images/blog-pakistans-no.1-free-school-management-software.png"/>
</div>
<div class="blog__one-single-blog-date">
<span class="date">01</span>
<span class="month">Jun</span>
</div>
<div class="blog__one-single-blog-content">
<div class="blog__one-single-blog-content-top">
<span>
<i class="fas fa-user"></i>
                                    by Admin
                                </span>
</div>
<a class="blog-heading" href="pakistans-no1-school-management-software.html">Pakistan's No.1 Free School Management Software</a>
<a class="btn-three" href="pakistans-no1-school-management-software.html">Read More
                                <i class="fas fa-angle-right"></i>
</a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Blog Area End -->
<!-- Footer Two Area Start -->
<div class="footer__two">
<img alt="image" class="footer__two-shape" src="images/shape-footer-two-bg.png"/>
<div class="container">
<div class="row gy-4 justify-content-between">
<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6">
<div class="footer__two-widget">
<div class="footer__two-widget-about">
<a href="#"><img alt="image" src="images/img-ilmi-markaz-background-transparent-logo.png"/></a>
<p>Smart Solutions for Smarter Schools</p>
<div class="footer__two-widget-about-location">
<div class="footer__two-widget-about-location-item">
<div class="footer__two-widget-about-location-item-icon">
<i class="flaticon-telephone-call"></i>
</div>
<div class="footer__two-widget-about-location-item-info">
<span>Phone Number</span>
<a href="tel:923363473602">+92 (336) 3473602</a>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
<div class="footer__two-widget ml-85">
<h4>Quick Links</h4>
<div class="footer__two-widget-solution">
<ul>
<li><a href="features.html"><i class="far fa-chevron-double-right"></i>Features</a></li>
<li><a href="blogs.html"><i class="far fa-chevron-double-right"></i>Blogs</a></li>
<li><a href="contact-us.html"><i class="far fa-chevron-double-right"></i>Contact Us</a></li>
<li><a href="about-us.html"><i class="far fa-chevron-double-right"></i>About Us</a></li>
</ul>
</div>
</div>
</div>
<div class="col-xl-3 col-lg-3 col-md-6 col-sm-6">
<div class="footer__two-widget">
<h4>Our Services</h4>
<div class="footer__two-widget-solution">
<ul>
<li><a href="#"><i class="far fa-chevron-double-right"></i>Software Support</a></li>
<li><a href="#"><i class="far fa-chevron-double-right"></i>Customize Software</a></li>
<li><a href="#"><i class="far fa-chevron-double-right"></i>Dedicated Hosting</a></li>
</ul>
</div>
</div>
</div>
<div class="col-xl-2 col-lg-3 col-md-6 col-sm-6">
<div class="footer__two-widget">
<h4>Follow Us</h4>
<div class="footer__two-widget-subscribe">
<p>The latest news, articles, sent to your inbox weekly.</p>
<div class="footer__two-widget-social">
<ul>
<li><a href="https://www.facebook.com/ab.ilmimarkaz"><i class="fab fa-facebook-f"></i></a></li>
<li><a href="https://twitter.com/alaphbay"><i class="fab fa-twitter"></i></a></li>
<li><a href="https://www.linkedin.com/company/alaphbay/"><i class="fab fa-linkedin"></i></a></li>
</ul>
</div>
</div>
</div>
</div>
</div>
</div>
<div class="copyright__one">
<div class="container">
<div class="row justify-content-between copyright__one-container-area">
<div class="col-xl-5 col-lg-6">
<div class="copyright__one-left">
<p>© ilmi markaz 2024 | All Rights Reserved</p>
</div>
</div>
<div class="col-xl-5 col-lg-6">
<div class="copyright__one-right">
<a href="contact-us.html">Contact Us</a>
</div>
</div>
</div>
</div>
</div>
</div>
<!-- Footer Two Area End -->
<!-- Start of HubSpot Embed Code -->
<script async="" defer="" id="hs-script-loader" src="js/243830041.js" type="text/javascript"></script>
<!-- End of HubSpot Embed Code -->
<!-- Scroll Btn Start -->
<div class="scroll-up">
<svg class="scroll-circle svg-content" height="100%" viewbox="-1 -1 102 102" width="100%">
<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
</svg>
</div>
<!-- Scroll Btn End -->
<!-- Main JS -->
<script src="js/js-jquery-3.6.0.min.js"></script>
<!-- Bootstrap JS -->
<script src="js/js-bootstrap.min.js"></script>
<!-- Counter Up JS -->
<script src="js/js-jquery.counterup.min.js"></script>
<!-- Popper JS -->
<script src="js/js-popper.min.js"></script>
<!-- Progressbar JS -->
<script src="js/js-progressbar.min.js"></script>
<!-- Magnific Popup JS -->
<script src="js/js-jquery.magnific-popup.min.js"></script>
<!-- Swiper Bundle JS -->
<script src="js/js-swiper-bundle.min.js"></script>
<!-- Slick JS -->
<script src="js/js-slick.min.js"></script>
<!-- Isotope JS -->
<script src="js/js-isotope.pkgd.min.js"></script>
<!-- Waypoints JS -->
<script src="js/js-jquery.waypoints.min.js"></script>
<!-- Mean Menu JS -->
<script src="js/js-jquery.meanmenu.min.js"></script>
<!-- Custom JS -->
<script src="js/js-custom.js"></script>
</body>`;
        // Insert inline scripts preserved from original HTML

        (function () {
            {
                var s = document.createElement('script');
                s.type = 'text/javascript';
                s.text = "\n        window.dataLayer = window.dataLayer || [];\n        function gtag(){dataLayer.push(arguments);}\n        gtag('js', new Date());\n\n        gtag('config', 'G-P5K1ZPSY73');\n    ";
                container.current.appendChild(s);
            }
        })();
        return () => {
            if (container.current) container.current.innerHTML = '';
        };
    }, []);
    return <div ref={container} />;
};

export default Index;
