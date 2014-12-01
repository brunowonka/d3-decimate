
(function(d3) {
    var methods = ["mean","max",'min'],
        method_step = {
            mean : function(cur,n) {
                return cur + n;
            },
            max : function(cur,n) {
                return Math.max(cur,n);
            },
            min : function(cur,n) {
                return Math.min(cur,n);
            }
        },
        method_final = {
            mean : function(cur,count) {
                return cur/count;
            },
            max : function(cur) {
                return cur;
            },
            min : function(cur) {
                return cur;
            }
        };

    function d3_decimate() {

        var x = function (d) {
                return d.x;
            },
            y = function (d) {
                return d.y;
            },
            sx = function (d) {
                return d;
            },
            sy = function (d) {
                return d;
            },
            x_method = "mean",
            y_method = "mean",
            filter = null,
            maxpoints = 0;



        function decimate(data) {
            if( filter ) {
                data = data.filter(filter);
            }
            function remap(data) {
                return data.map(function (v) {
                    return {
                        x: sx(x(v)),
                        y: sy(y(v))
                    }
                });
            }

            if (maxpoints == 0 || data.length < maxpoints) {
                return remap(data);
            } else {
                var ppp = Math.round(data.length / maxpoints);
                if (ppp === 1) {
                    return remap(data);
                } else {
                    var l = data.length,
                        i, j, k,
                        r = [],
                        fsx = method_step[x_method],
                        fsy = method_step[y_method],
                        ffx = method_final[x_method],
                        ffy = method_final[y_method];

                    for (i = 0; i < l && (i + ppp) <= l; i += ppp) {
                        var ax = 0,
                            ay = 0;
                        k = i + ppp;
                        for (j = i; j < k; j++) {
                            ax = fsx(ax,x(data[j]));
                            ay = fsy(ay, y(data[j]));
                        }
                        ax = ffx(ax,ppp);
                        ay = ffy(ay,ppp);
                        r.push({
                            x: sx(ax),
                            y: sy(ay)
                        });
                    }
                    return r;
                }
            }
        }

        decimate.x = function (_) {
            if (!arguments.length) {
                return x;
            }
            x = _;
            return decimate;
        };

        decimate.sx = function (_) {
            if (!arguments.length) {
                return sx;
            }
            sx = _;
            return decimate;
        };

        decimate.filter = function (_) {
            if (!arguments.length) {
                return filter;
            }
            filter = _;
            return decimate;
        };

        decimate.y = function (_) {
            if (!arguments.length) {
                return y;
            }
            y = _;
            return decimate;
        };

        decimate.sy = function (_) {
            if (!arguments.length) {
                return sy;
            }
            sy = _;
            return decimate;
        };

        decimate.x_method = function(_) {
            if( ! arguments.length ) {
                return x_method;
            }
            if( methods.indexOf(_) >= 0 ) {
                x_method = _;
                return decimate;
            }
        };

        decimate.y_method = function(_) {
            if( ! arguments.length ) {
                return y_method;
            }
            if( methods.indexOf(_) >= 0 ) {
                y_method = _;
                return decimate;
            }
        };

        decimate.maxpoints = function (_) {
            if (!arguments.length) {
                return maxpoints;
            }
            maxpoints = _;
            return decimate;
        };

        return decimate;
    }


    d3.decimate = d3_decimate;
})(d3);