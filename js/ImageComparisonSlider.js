window.Scrobbleme = {
    widthToScaleUp: 300,
    methods: ['overlay'],
    versions: {
        'ImageComparisonSlider': '1.12'
    }
};

Scrobbleme.ImageComparisonSlider = function (element, jQuery) {
    var slide, slider;

    if (jQuery == undefined) {
        jQuery = window.jQuery;
    }

    this.domNode = jQuery(element);
    this.domNode.originalWidth = this.domNode[0].style.width;
    this.domNode.find('.images .left').width(this.domNode.width() / 2);
    this.domNode.find('.images img').width(this.domNode.width());
    slide = this.slide_overlay;
    slider = this.domNode.find('.slider')[0];
    noUiSlider.create(slider, {
        start: 50,
        animate: false,
        range: {
            'min': 0,
            'max': 100
        }
    });
    slider.noUiSlider.on('slide', function (value) {
        this.domNode.attr('data-ic-slider-value', value[0]);
        jQuery.proxy(slide, this)(null, {value: value[0]});
    }.bind(this));
    jQuery.proxy(slide, this)(null, {value: 50});
    jQuery.proxy(this.resize_callback, this)({data: {'slider': slider, 'slide': slide, 'element': this}});
    jQuery(window).resize({'slider': slider, 'slide': slide, 'element': this}, this.resize_callback);
    this.domNode.find('.images').click({'slider': slider, 'slide': slide}, this.clickable_callback.bind(this));

    /** Extras */
    if (this.domNode.hasClass('hover') && this.supports_hover()) {
        this.domNode.find('.images').mousemove({
            'slider': slider,
            'slide': slide
        }, this.throttle(this.clickable_callback.bind(this), 15));
    }
}
;

Scrobbleme.ImageComparisonSlider.prototype = {
    slide_overlay: function (event, ui) {
        this.domNode.find('.images .left').width(ui.value * this.domNode.width() / 100);
    },

    clickable_callback: function (event) {
        var newValue = (event.pageX - event.currentTarget.getBoundingClientRect().left) / event.currentTarget.clientWidth * 100;
        jQuery.proxy(event.data.slide, this)(null, {value: newValue});
        event.data.slider.noUiSlider.set(newValue);
    },

    resize_callback: function (options) {
        var data = options.data;
        var domNode = data.element.domNode;
        if (domNode.width() <= Scrobbleme.widthToScaleUp && !domNode.modeChanged) {
            domNode.modeChanged = true;
            domNode[0].style.width = '100%';
            domNode.upperSizeBound = domNode.width();
        } else if (domNode.modeChanged && domNode.width() > domNode.upperSizeBound) {
            domNode[0].style.width = domNode.originalWidth;
            domNode.modeChanged = false;
        }

        domNode.find('.images img').height('auto');
        if (domNode.hasClass('overlay')) {
            domNode.find('.images .left').width(domNode.width() / 2);
            domNode.find('.images img').width(domNode.width());
        }
        var currentValue = data.slider.noUiSlider.get();
        jQuery.proxy(data.slide, data.element)(null, {value: currentValue});
    },

    /**
     * Returns true, if the device supports "hover" in the plugins sense.
     */
    supports_hover: function () {
        return !navigator.userAgent.match(/(iPod|iPhone|iPad|Android|Windows\sPhone|BlackBerry)/i);
    },

    // Thanks: http://sampsonblog.com/749/simple-throttle-function
    throttle: function (callback, threshhold) {
        var wait = false;
        return function (event) {
            if (!wait) {
                callback(event);
                wait = true;
                setTimeout(function () {
                    wait = false;
                }, threshhold);
            }
        }
    }
};

jQuery(function (jQuery) {
    jQuery('.image-comparator').each(function (index, element) {
        new Scrobbleme.ImageComparisonSlider(element, jQuery);
    });
});