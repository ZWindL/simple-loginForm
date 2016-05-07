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
            //先将该元素转换为信息球
            this.addClass('.id_info');
            function info_ball_str() {
                /*
                <span class="id_info_title">您好 :</span>
                <hr>
                <div class="id_info_content">请登录</div>
                */
            }
            this.append(info_ball_str.heredoc());
            //得到信息球的位置信息
            var _right = parseInt(this.css('right')) + parseInt(this.css('width')) + 'px';
            var _top = this.find('hr').offset().top;
            
            //生成一个登录框
            //验证码的 source 在这里
            function login_form_str() {
                /*
                 <div class="login_form">
                 <div class="login_form_top_line"></div>
                 <form action="#" id="login_form_form" class="login_form_content"><div>
                 <input type="text" autocomplete="off" class="ipt" id="login_username" placeholder="请输入帐号">
                 </div><div><input type="password" autocomplete="off" class="ipt" id="login_password" placeholder="请输入密码">
                 </div><div><input type="text" autocomplete="off" class="ipt ipt_check_code" placeholder="验证码">
                 <img src="../controller/requests/no_robot/confirm_code.php"
                 onclick="this.src='../controller/requests/no_robot/confirm_code.php?'+Math.random()"
                 class="check_code" alt="加载失败"></div><div class="buttons_container">
                 <input type="submit" id="login_form_login" value="登录" class="buttons">
                 <input type="button" id="login_form_reg" value="注册" class="buttons reg_btn">
                 </div></form><div class="login_form_slideup"><div class="slideup_arrow"></div>
                 <div class="slideup_arrow_mask"></div></div></div>
                 */
            }
            function loged_form_str() {
                /*
                 <div class="login_form_loged">
                 <div class="login_form_top_line"></div><div class="login_form_content">
                 <div><a class="edit_info" href="#">修改信息</a></div><div><a class="logout" href="#">退出登录</a></div>
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
            this.after(_login_form);    //添加于信息球之后
            var query_str = (login_or_loged == 'login')?'.login_form':'.login_form_loged';
            var login_form = this.siblings(query_str);

            //制作动画
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
