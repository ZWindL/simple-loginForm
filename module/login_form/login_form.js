/**
 * Created by zwindl on 16-5-5.
 * The function heredoc is referenced from http://www.jb51.net/article/49194.htm
 * and http://www.tuicool.com/articles/YRn6fmU
 */
Function.prototype.heredoc = function () {
    return this.toString().split(/\n/)
        .slice(2, -2).join('\n');
};

!function ($) {
    $.fn.extend({
        "PopUpLoginForm" : function (login_or_loged, submit_fun, login_btn_fun, reg_btn_fun) {
            //Change it to an info ball
            this.addClass('id_info');
            function info_ball_str() {
                /*
                <span class="id_info_title">Hello :</span>
                <hr>
                <div class="id_info_content"></div>
                */
            }
            //Get innerHtml
            var username_str = this.html();
            this.empty();
            this.append(info_ball_str.heredoc());
            this.find('.id_info_content').html(username_str);
            // Get the ball's position info
            var _right = parseInt(this.css('right')) + parseInt(this.css('width')) + 'px';
            var _top = this.find('hr').offset().top;
            
            //Create a new form block
            //The check code's source is here
            function login_form_str() {
                /*
                 <div class="login_form">
                 <div class="login_form_top_line"></div>
                 <form action="#" id="login_form_form" class="login_form_content"><div>
                 <input type="text" autocomplete="off" class="ipt" id="login_username" placeholder="Input your account">
                 </div><div><input type="password" autocomplete="off" class="ipt" id="login_password" placeholder="Input your password">
                 </div><div><input type="text" autocomplete="off" class="ipt ipt_check_code" placeholder="Check code">
                 <img src="../controller/requests/no_robot/confirm_code.php"
                 onclick="this.src='../controller/requests/no_robot/confirm_code.php?'+Math.random()"
                 class="check_code" alt="Failed loading"></div><div class="buttons_container">
                 <input type="submit" id="login_form_login" value="SignIn" class="buttons">
                 <input type="button" id="login_form_reg" value="SignUp" class="buttons reg_btn">
                 </div></form><div class="login_form_slideup"><div class="slideup_arrow"></div>
                 <div class="slideup_arrow_mask"></div></div></div>
                 */
            }
            function loged_form_str() {
                /*
                 <div class="login_form_loged">
                 <div class="login_form_top_line"></div><div class="login_form_content">
                 <div><a class="edit_info" href="#">Settings</a></div><div><a class="logout" href="#">LogOut</a></div>
                 </div><div class="login_form_slideup"><div class="slideup_arrow">
                 </div><div class="slideup_arrow_mask"></div></div></div>
                 */
            }
            var login_form_html_str = (login_or_loged == 'login')?
                (login_form_str.heredoc() +
                    '<script>$(function(){$("#login_form_form").bind("submit",'+submit_fun
                    +');$("#login_form_login").bind("click",'+login_btn_fun
                    +');$("#login_form_reg").bind("click",'+reg_btn_fun+');});</script>')
                :loged_form_str.heredoc();
            var _login_form = $(login_form_html_str);
            this.after(_login_form);    //Append to info ball
            var query_str = (login_or_loged == 'login')?'.login_form':'.login_form_loged';
            var login_form = this.siblings(query_str);

            //Make animation
            this.bind('click', function () {
                if(_login_form.find('.login_form_content').is(':hidden') && $(login_form).not(':animated')){
                    _login_form.find('.login_form_top_line').css({position:'fixed', right: _right, top: _top})
                        .animate({width: '9rem'},500,function(){
                            var _right_form = parseInt($(this).css('right')) + 14 + 'px';
                            _login_form.css({position: 'fixed', right:_right_form, top: _top});
                            _login_form.slideDown(400);
                        });
                } else {
                    _login_form.slideUp(400);
                    _login_form.find('.login_form_top_line').delay(400).animate({width: 0}, 800);
                }
            });
            login_form.find('.login_form_slideup').bind('click', function () {
                _login_form.slideUp(400);
                _login_form.find('.login_form_top_line').delay(400).animate({width: 0}, 800);
            });
            login_form.find('.reg_btn').bind('click', function () {
                _login_form.slideUp(400);
                _login_form.find('.login_form_top_line').delay(400).animate({width: 0}, 800);
            });
        }
    });
}(window.jQuery);
