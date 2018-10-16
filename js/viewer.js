var DC_URL = "http://gall.dcinside.com";

var gallTitle = $(".gall_tit a");

var tmp = null;

var viewer = new Preview();

gallTitle.on("mousemove", function(event) {
    var target = $(event.target);
    var x = event.clientX;
    var y = event.clientY;
    var targetUrl = DC_URL + target.attr("href");
    
    viewer.update(x, y, targetUrl);
});

gallTitle.on("mouseleave", function(event) {
    viewer.hide();
});

function Preview() {
    this.ifr = null;
    this.wnd = null;
    this.titleViewer = null;
    this.contentViewer = null;
    this.url = null;
    this.x = 0;
    this.y = 0;
    
    this.initIframe = function() {
        this.ifr = $("<iframe>");
        this.ifr.attr("src", DC_URL);
        
        $("body").append(this.ifr);
    };
    
    this.initWindow = function() {
        this.wnd = $("<div>");
        this.wnd.attr("id", "preview");
        
        this.wnd.css("width", "512px");
        this.wnd.css("height", "512px");
        this.wnd.css("position", "fixed");
        this.wnd.css("left", "0px");
        this.wnd.css("top", "0px");
        this.wnd.css("background-color", "white");
        this.wnd.css("border-radius", "8px");
        this.wnd.css("box-shadow", "0px 4px 8px 0px gray");
        this.wnd.css("z-index", "100");
        
        this.titleViewer = $("<div>");
        this.titleViewer.attr("id", "titleViewer");
        
        this.titleViewer.css("height", "24px");
        this.titleViewer.css("margin", "8px");
        this.titleViewer.css("line-height", "24px");
        this.titleViewer.css("font-size", "16px");
        
        this.contentViewer = $("<div>");
        this.contentViewer.attr("id", "contentViewer");
        
        this.contentViewer.css("width", "496px");
        this.contentViewer.css("height", "464px");
        this.contentViewer.css("margin", "8px");
        
        this.wnd.append(this.titleViewer);
        this.wnd.append(this.contentViewer);
        
        $("body").append(this.wnd);
    };
    
    
    this.update = function(x, y, targetUrl) {
        this.wnd.css("display", "block");
        if (this.url != targetUrl) {
            this.url = targetUrl;
            this.setPost("Loading...", "");
            this.ifr.attr("src", this.url);
            this.ifr.attr("onload", "viewer.onIfrLoad()");
        }
        
        this.updateWindow(x + 50, y);
    };
    
    this.setPost = function(title, content) {
        this.titleViewer.text(title);
        this.contentViewer.html(content);
        
        console.log(title);
        console.log(content);
    };
    
    this.hide = function() {
        this.wnd.css("display", "none");
    };
    
    this.updateWindow = function(x, y) {
        this.wnd.css("left", x + "px");
        this.wnd.css("top", y + "px");
    };
    
    this.onIfrLoad = function() {
        console.log("refreshed");
        tmp = this.ifr;
        this.setPost(
                        this.ifr.get(0).contentDocument.getElementsByClassName("title_subject")[0].innerText,
                        this.ifr.get(0).contentDocument.getElementsByClassName("writing_view_box")[0].innerHTML
                    );
    };
    
    this.initIframe();
    this.initWindow();
}