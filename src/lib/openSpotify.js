! function(t) {
  function e(r) {
      if (n[r]) return n[r].exports;
      var o = n[r] = {
          i: r,
          l: !1,
          exports: {}
      };
      return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
  }
  var n = {};
  e.m = t, e.c = n, e.i = function(t) {
      return t
  }, e.d = function(t, n, r) {
      e.o(t, n) || Object.defineProperty(t, n, {
          configurable: !1,
          enumerable: !0,
          get: r
      })
  }, e.n = function(t) {
      var n = t && t.__esModule ? function() {
          return t.default
      } : function() {
          return t
      };
      return e.d(n, "a", n), n
  }, e.o = function(t, e) {
      return Object.prototype.hasOwnProperty.call(t, e)
  }, e.p = "https://open.scdn.co/static/", e(e.s = 44)
}([function(t, e) {
  t.exports.toggle = function(t) {
      return {
          type: "PLAY_TOGGLE",
          data: {
              source: t
          }
      }
  }, t.exports.playIndex = function(t, e) {
      return {
          type: "PLAY_INDEX",
          data: {
              index: t,
              source: e
          }
      }
  }, t.exports.next = function() {
      return {
          type: "NEXT"
      }
  }, t.exports.previous = function() {
      return {
          type: "PREVIOUS"
      }
  }, t.exports.stop = function() {
      return {
          type: "STOP"
      }
  }, t.exports.progress = function(t, e) {
      return {
          type: "PROGRESS",
          data: {
              time: t,
              total: e
          }
      }
  }, t.exports.remoteStatusUpdate = function(t) {
      return {
          type: "REMOTE_STATUS_UPDATE",
          data: {
              status: t
          }
      }
  }, t.exports.callToAction = function(t) {
      return {
          type: "CALL_TO_ACTION",
          data: {
              source: t
          }
      }
  }, t.exports.dismissChoiceModal = function(t) {
      return {
          type: "DISMISS_CHOICE_MODAL",
          data: {
              source: t
          }
      }
  }, t.exports.dismissUpsellModal = function(t) {
      return {
          type: "DISMISS_UPSELL_MODAL",
          data: {
              source: t
          }
      }
  }, t.exports.downloadApp = function(t) {
      return {
          type: "DOWNLOAD_APP",
          data: {
              source: t
          }
      }
  }, t.exports.playInApp = function(t) {
      return {
          type: "PLAY_IN_APP",
          data: {
              source: t
          }
      }
  }, t.exports.playInWebPlayer = function(t) {
      return {
          type: "PLAY_IN_WEB_PLAYER",
          data: {
              source: t
          }
      }
  }, t.exports.showUpsell = function() {
      return {
          type: "SHOW_UPSELL"
      }
  }, t.exports.switchPlaybackStrategy = function(t) {
      return {
          type: "SWITCH_PLAYBACK_STRATEGY",
          data: {
              strategy: t
          }
      }
  }, t.exports.launchConcertsHub = function() {
      return {
          type: "LAUNCH_CONCERTS_HUB"
      }
  }
}, function(t, e) {
  t.exports = function(t, e, n) {
      function r() {
          var r = o,
              i = e(t.getState());
          o = i, JSON.stringify(i) !== JSON.stringify(r) && n(i, r || i)
      }
      var o, i = t.subscribe(r);
      return r(), i
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(0),
      i = n(12).RafHandler;
  t.exports = function(t) {
      var e = function() {},
          n = new Audio,
          a = function() {
              t.dispatch(o.progress(1e3 * n.currentTime, 1e3 * n.duration))
          },
          s = new i(a),
          c = function() {
              t.dispatch(o.next())
          };
      return {
          subscribe: function() {
              n.addEventListener("ended", c), e = r(t, function(t) {
                  return {
                      track: t.context.tracks[t.index_playing - 1],
                      playing: t.playing
                  }
              }, function(e) {
                  if (e.playing) {
                      if (null === e.track.preview_url) return void t.dispatch(o.next());
                      n.src !== e.track.preview_url && (n.src = e.track.preview_url), n.play(), s.subscribe()
                  } else n.pause(), s.unsubscribe()
              })
          },
          unsubscribe: function() {
              e(), n.pause(), n.removeEventListener("ended", c), s.unsubscribe()
          }
      }
  }
}, function(t, e) {
  t.exports = {
      getCookie: function(t) {
          return t && this.hasCookie(t) ? decodeURIComponent(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + decodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1")) : null
      },
      hasCookie: function(t) {
          return new RegExp("(?:^|;\\s*)" + decodeURIComponent(t).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=").test(document.cookie)
      },
      setCookie: function(t, e, n, r, o, i) {
          document.cookie = t + "=" + encodeURIComponent(e) + (i ? ";expires=" + i : ";expires=Fri, 01 Jan 2038 17:14:16 GMT") + (n ? ";path=" + n : "") + (r ? ";domain=" + r : "") + (o ? ";secure" : "")
      },
      deleteCookie: function(t, e, n) {
          document.cookie = t + "=;expires=Fri, 01 Jan 1970 17:14:16 GMT" + (e ? ";path=" + e : "") + (n ? ";domain=" + n : "")
      },
      getTopDomain: function() {
          var t = "." + document.domain.split(".").slice(-2).join(".");
          return t = ".localhost" === t ? "localhost" : t
      },
      getExpireTime: function(t) {
          var e = new Date,
              n = e.getTime();
          return n += parseInt(t), e.setTime(n), e.toUTCString()
      }
  }
}, function(t, e) {
  var n;
  n = function() {
      return this
  }();
  try {
      n = n || Function("return this")() || (0, eval)("this")
  } catch (t) {
      "object" == typeof window && (n = window)
  }
  t.exports = n
}, function(t, e, n) {
  function r(t) {
      this.autoplay = t.autoplay, this.context = t.context || {}, this.platform = t.platform, this.strings = t.strings || {}, this.isMobile = t.isMobile, this.isChromebook = window.hasOwnProperty("navigator") && -1 !== window.navigator.userAgent.indexOf("CrOS "), this.isTouchDevice = !!("ontouchstart" in window || window.hasOwnProperty("navigator") && window.navigator.msMaxTouchPoints), this.usesWebPlayer = t.usesWebPlayer, this.downloadLink = t.downloadLink, this.webPlayerUrl = "https://play.spotify.com/" + this.context.uri.split(":").slice(1, this.context.uri.length).join("/"), this.topDomain = "." + document.domain.split(".").slice(-2).join("."), this.urlParams = this.getQueryParams(), this.remoteDebug = void 0 !== this.urlParams.remoteDebug && 0 !== this.urlParams.remoteDebug, this.remotePort = parseInt(this.urlParams.remotePort) || 1080, this.testAutomation = "1" === this.urlParams.testAutomation, this.coverArtPlaysPreview = t.isMobile && "1" === this.urlParams.capp, this.isUserSignedIn = t.isUserSignedIn || !1
  }
  var o = n(3);
  r.prototype.setHasSpotify = function(t) {
      return t ? o.setCookie("is_spotified", "yes", "/", this.topDomain) : o.deleteCookie("is_spotified", "/", this.topDomain), this
  }, r.prototype.hasSpotify = function() {
      return "yes" === o.getCookie("is_spotified")
  }, r.prototype.getQueryParams = function() {
      for (var t = location.search ? location.search.substr(1).split("&") : [], e = {}, n = 0; n < t.length; n++) {
          var r = t[n].split("=");
          e[r[0]] = r[1] ? decodeURIComponent(r[1]) : void 0
      }
      return e
  }, r.prototype.getString = function(t) {
      return this.strings[t] || t
  }, r.prototype.getPlatformLink = function() {
      return this.downloadLink
  }, r.prototype.getContextURI = function() {
      return this.context.uri
  }, r.prototype.setContextURI = function(t) {
      this.context.uri = t
  }, r.prototype.getTrackURI = function() {
      return this.context.track
  }, r.prototype.getContextType = function() {
      return this.context.type
  }, r.prototype.getReferrer = function() {
      return document.referrer ? document.referrer.split("/")[2] : ""
  }, t.exports = r
}, function(t, e, n) {
  (function(e, r) {
      ! function(e, n) {
          t.exports = n()
      }(0, function() {
          "use strict";

          function t(t) {
              return "function" == typeof t || "object" == typeof t && null !== t
          }

          function o(t) {
              return "function" == typeof t
          }

          function i(t) {
              Y = t
          }

          function a(t) {
              K = t
          }

          function s() {
              return function() {
                  G(u)
              }
          }

          function c() {
              var t = setTimeout;
              return function() {
                  return t(u, 1)
              }
          }

          function u() {
              for (var t = 0; t < W; t += 2) {
                  (0, $[t])($[t + 1]), $[t] = void 0, $[t + 1] = void 0
              }
              W = 0
          }

          function l(t, e) {
              var n = arguments,
                  r = this,
                  o = new this.constructor(p);
              void 0 === o[tt] && L(o);
              var i = r._state;
              return i ? function() {
                  var t = n[i - 1];
                  K(function() {
                      return C(i, o, t, r._result)
                  })
              }() : k(r, o, t, e), o
          }

          function f(t) {
              var e = this;
              if (t && "object" == typeof t && t.constructor === e) return t;
              var n = new e(p);
              return w(n, t), n
          }

          function p() {}

          function d() {
              return new TypeError("You cannot resolve a promise with itself")
          }

          function h() {
              return new TypeError("A promises callback cannot return that same promise.")
          }

          function y(t) {
              try {
                  return t.then
              } catch (t) {
                  return ot.error = t, ot
              }
          }

          function v(t, e, n, r) {
              try {
                  t.call(e, n, r)
              } catch (t) {
                  return t
              }
          }

          function m(t, e, n) {
              K(function(t) {
                  var r = !1,
                      o = v(n, e, function(n) {
                          r || (r = !0, e !== n ? w(t, n) : T(t, n))
                      }, function(e) {
                          r || (r = !0, E(t, e))
                      }, "Settle: " + (t._label || " unknown promise"));
                  !r && o && (r = !0, E(t, o))
              }, t)
          }

          function _(t, e) {
              e._state === nt ? T(t, e._result) : e._state === rt ? E(t, e._result) : k(e, void 0, function(e) {
                  return w(t, e)
              }, function(e) {
                  return E(t, e)
              })
          }

          function g(t, e, n) {
              e.constructor === t.constructor && n === l && e.constructor.resolve === f ? _(t, e) : n === ot ? E(t, ot.error) : void 0 === n ? T(t, e) : o(n) ? m(t, e, n) : T(t, e)
          }

          function w(e, n) {
              e === n ? E(e, d()) : t(n) ? g(e, n, y(n)) : T(e, n)
          }

          function b(t) {
              t._onerror && t._onerror(t._result), A(t)
          }

          function T(t, e) {
              t._state === et && (t._result = e, t._state = nt, 0 !== t._subscribers.length && K(A, t))
          }

          function E(t, e) {
              t._state === et && (t._state = rt, t._result = e, K(b, t))
          }

          function k(t, e, n, r) {
              var o = t._subscribers,
                  i = o.length;
              t._onerror = null, o[i] = e, o[i + nt] = n, o[i + rt] = r, 0 === i && t._state && K(A, t)
          }

          function A(t) {
              var e = t._subscribers,
                  n = t._state;
              if (0 !== e.length) {
                  for (var r = void 0, o = void 0, i = t._result, a = 0; a < e.length; a += 3) r = e[a], o = e[a + n], r ? C(n, r, o, i) : o(i);
                  t._subscribers.length = 0
              }
          }

          function O() {
              this.error = null
          }

          function P(t, e) {
              try {
                  return t(e)
              } catch (t) {
                  return it.error = t, it
              }
          }

          function C(t, e, n, r) {
              var i = o(n),
                  a = void 0,
                  s = void 0,
                  c = void 0,
                  u = void 0;
              if (i) {
                  if (a = P(n, r), a === it ? (u = !0, s = a.error, a = null) : c = !0, e === a) return void E(e, h())
              } else a = r, c = !0;
              e._state !== et || (i && c ? w(e, a) : u ? E(e, s) : t === nt ? T(e, a) : t === rt && E(e, a))
          }

          function x(t, e) {
              try {
                  e(function(e) {
                      w(t, e)
                  }, function(e) {
                      E(t, e)
                  })
              } catch (e) {
                  E(t, e)
              }
          }

          function S() {
              return at++
          }

          function L(t) {
              t[tt] = at++, t._state = void 0, t._result = void 0, t._subscribers = []
          }

          function I(t, e) {
              this._instanceConstructor = t, this.promise = new t(p), this.promise[tt] || L(this.promise), F(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? T(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && T(this.promise, this._result))) : E(this.promise, N())
          }

          function N() {
              return new Error("Array Methods must be provided an Array")
          }

          function U(t) {
              return new I(this, t).promise
          }

          function M(t) {
              var e = this;
              return new e(F(t) ? function(n, r) {
                  for (var o = t.length, i = 0; i < o; i++) e.resolve(t[i]).then(n, r)
              } : function(t, e) {
                  return e(new TypeError("You must pass an array to race."))
              })
          }

          function D(t) {
              var e = this,
                  n = new e(p);
              return E(n, t), n
          }

          function R() {
              throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
          }

          function j() {
              throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
          }

          function H(t) {
              this[tt] = S(), this._result = this._state = void 0, this._subscribers = [], p !== t && ("function" != typeof t && R(), this instanceof H ? x(this, t) : j())
          }

          function B() {
              var t = void 0;
              if (void 0 !== r) t = r;
              else if ("undefined" != typeof self) t = self;
              else try {
                  t = Function("return this")()
              } catch (t) {
                  throw new Error("polyfill failed because global object is unavailable in this environment")
              }
              var e = t.Promise;
              if (e) {
                  var n = null;
                  try {
                      n = Object.prototype.toString.call(e.resolve())
                  } catch (t) {}
                  if ("[object Promise]" === n && !e.cast) return
              }
              t.Promise = H
          }
          var q = void 0;
          q = Array.isArray ? Array.isArray : function(t) {
              return "[object Array]" === Object.prototype.toString.call(t)
          };
          var F = q,
              W = 0,
              G = void 0,
              Y = void 0,
              K = function(t, e) {
                  $[W] = t, $[W + 1] = e, 2 === (W += 2) && (Y ? Y(u) : Z())
              },
              X = "undefined" != typeof window ? window : void 0,
              V = X || {},
              z = V.MutationObserver || V.WebKitMutationObserver,
              Q = "undefined" == typeof self && void 0 !== e && "[object process]" === {}.toString.call(e),
              J = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
              $ = new Array(1e3),
              Z = void 0;
          Z = Q ? function() {
              return function() {
                  return e.nextTick(u)
              }
          }() : z ? function() {
              var t = 0,
                  e = new z(u),
                  n = document.createTextNode("");
              return e.observe(n, {
                      characterData: !0
                  }),
                  function() {
                      n.data = t = ++t % 2
                  }
          }() : J ? function() {
              var t = new MessageChannel;
              return t.port1.onmessage = u,
                  function() {
                      return t.port2.postMessage(0)
                  }
          }() : void 0 === X ? function() {
              try {
                  var t = n(62);
                  return G = t.runOnLoop || t.runOnContext, s()
              } catch (t) {
                  return c()
              }
          }() : c();
          var tt = Math.random().toString(36).substring(16),
              et = void 0,
              nt = 1,
              rt = 2,
              ot = new O,
              it = new O,
              at = 0;
          return I.prototype._enumerate = function() {
              for (var t = this.length, e = this._input, n = 0; this._state === et && n < t; n++) this._eachEntry(e[n], n)
          }, I.prototype._eachEntry = function(t, e) {
              var n = this._instanceConstructor,
                  r = n.resolve;
              if (r === f) {
                  var o = y(t);
                  if (o === l && t._state !== et) this._settledAt(t._state, e, t._result);
                  else if ("function" != typeof o) this._remaining--, this._result[e] = t;
                  else if (n === H) {
                      var i = new n(p);
                      g(i, t, o), this._willSettleAt(i, e)
                  } else this._willSettleAt(new n(function(e) {
                      return e(t)
                  }), e)
              } else this._willSettleAt(r(t), e)
          }, I.prototype._settledAt = function(t, e, n) {
              var r = this.promise;
              r._state === et && (this._remaining--, t === rt ? E(r, n) : this._result[e] = n), 0 === this._remaining && T(r, this._result)
          }, I.prototype._willSettleAt = function(t, e) {
              var n = this;
              k(t, void 0, function(t) {
                  return n._settledAt(nt, e, t)
              }, function(t) {
                  return n._settledAt(rt, e, t)
              })
          }, H.all = U, H.race = M, H.resolve = f, H.reject = D, H._setScheduler = i, H._setAsap = a, H._asap = K, H.prototype = {
              constructor: H,
              then: l,
              catch: function(t) {
                  return this.then(null, t)
              }
          }, B(), H.polyfill = B, H.Promise = H, H
      })
  }).call(e, n(54), n(4))
}, function(t, e, n) {
  "use strict";
  var r = n(52),
      o = r.a.Symbol;
  e.a = o
}, function(t, e, n) {
  "use strict";

  function r(t) {
      if (!n.i(a.a)(t) || n.i(o.a)(t) != s) return !1;
      var e = n.i(i.a)(t);
      if (null === e) return !0;
      var r = f.call(e, "constructor") && e.constructor;
      return "function" == typeof r && r instanceof r && l.call(r) == p
  }
  var o = n(46),
      i = n(48),
      a = n(53),
      s = "[object Object]",
      c = Function.prototype,
      u = Object.prototype,
      l = c.toString,
      f = u.hasOwnProperty,
      p = l.call(Object);
  e.a = r
}, function(t, e, n) {
  "use strict";

  function r() {
      for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
      if (0 === e.length) return function(t) {
          return t
      };
      if (1 === e.length) return e[0];
      var r = e[e.length - 1],
          o = e.slice(0, -1);
      return function() {
          return o.reduceRight(function(t, e) {
              return e(t)
          }, r.apply(void 0, arguments))
      }
  }
  e.a = r
}, function(t, e, n) {
  "use strict";

  function r(t, e, i) {
      function c() {
          _ === m && (_ = m.slice())
      }

      function u() {
          return v
      }

      function l(t) {
          if ("function" != typeof t) throw new Error("Expected listener to be a function.");
          var e = !0;
          return c(), _.push(t),
              function() {
                  if (e) {
                      e = !1, c();
                      var n = _.indexOf(t);
                      _.splice(n, 1)
                  }
              }
      }

      function f(t) {
          if (!n.i(o.a)(t)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
          if (void 0 === t.type) throw new Error('Actions may not have an undefined "type" property. Have you misspelled a constant?');
          if (g) throw new Error("Reducers may not dispatch actions.");
          try {
              g = !0, v = y(v, t)
          } finally {
              g = !1
          }
          for (var e = m = _, r = 0; r < e.length; r++) e[r]();
          return t
      }

      function p(t) {
          if ("function" != typeof t) throw new Error("Expected the nextReducer to be a function.");
          y = t, f({
              type: s.INIT
          })
      }

      function d() {
          var t, e = l;
          return t = {
              subscribe: function(t) {
                  function n() {
                      t.next && t.next(u())
                  }
                  if ("object" != typeof t) throw new TypeError("Expected the observer to be an object.");
                  return n(), {
                      unsubscribe: e(n)
                  }
              }
          }, t[a.a] = function() {
              return this
          }, t
      }
      var h;
      if ("function" == typeof e && void 0 === i && (i = e, e = void 0), void 0 !== i) {
          if ("function" != typeof i) throw new Error("Expected the enhancer to be a function.");
          return i(r)(t, e)
      }
      if ("function" != typeof t) throw new Error("Expected the reducer to be a function.");
      var y = t,
          v = e,
          m = [],
          _ = m,
          g = !1;
      return f({
          type: s.INIT
      }), h = {
          dispatch: f,
          subscribe: l,
          getState: u,
          replaceReducer: p
      }, h[a.a] = d, h
  }
  n.d(e, "b", function() {
      return s
  }), e.a = r;
  var o = n(8),
      i = n(58),
      a = n.n(i),
      s = {
          INIT: "@@redux/INIT"
      }
}, function(t, e, n) {
  "use strict"
}, function(t, e, n) {
  "use strict";
  var r = function() {
          return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(t) {
              setTimeout(t, 1e3 / 60)
          }
      }(),
      o = function() {
          return window.cancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
      }(),
      i = function(t) {
          function e() {
              n ? (t(), i = r(e)) : o(i)
          }
          var n = !1,
              i = null;
          return {
              subscribe: function() {
                  n || (n = !0, i = r(e))
              },
              unsubscribe: function() {
                  n = !1, o(i)
              }
          }
      };
  t.exports.raf = r, t.exports.rafCancel = o, t.exports.RafHandler = i
}, function(t, e, n) {
  "use strict";
  (function(e) {
      function r(t, e) {
          if (!this instanceof r) return new r(t, e);
          o.call(this), t = t || {}, this._win = e || window, this._protocol = t.protocol || this._win.location.protocol, this._csrf = "", t.debug ? this._delayedConnect = new r.Promise(function(t) {
              this._win.startRemote = t
          }.bind(this)) : this._delayedConnect = Promise.resolve(), t.port && t.debug ? this._startPort = this._endPort = t.port : (this._startPort = 4380, this._endPort = 4389), this._currentPort = this._startPort, this._runningPort = 0, this._clientOpen = !1, this._connected = !1, this._backoffIndex = 0, this.state = null, this._retryConnect = t.retryConnect || !1, this._reconnectOnLogout = t.reconnectOnLogout || !1, this._reopenOnReconnect = t.reopenOnReconnect || !1, this._pollClient = t.pollClient || !1, this._pollBackoff = t.pollBackoff || [1, 1, 1, 1, 3, 3, 5], this._longPollingTime = t.longPollingTime || 6e4, this._token = t.token || "", this._referrer = t.referrer || this._win.location.href
      }
      var o = n(61);
      ! function(t, e) {
          function n() {}
          var r = e.prototype;
          n.prototype = t._super = r, n.prototype.constructor = e, t.prototype = new n
      }(r, o), t.exports = r, r.Promise = e.Promise;
      var i = {
          STATUS_CHANGE: "STATUS_CHANGE",
          CONNECTION_ESTABLISHED: "CONNECTION_ESTABLISHED",
          CONNECTION_FAILED: "CONNECTION_FAILED"
      };
      r.Event = i;
      var a = {
          INVALID_OAUTH_TOKEN: "4102",
          EXPIRED_OAUTH_TOKEN: "4103",
          INVALID_CSRF_TOKEN: "4107",
          OAUTH_TOKEN_INVALID_FOR_USER: "4108",
          NO_USER_LOGGED_IN: "4110",
          COULD_NOT_DETECT_PORT: "6000",
          COULD_NOT_OPEN_CLIENT: "6010",
          COULD_NOT_FETCH_CSRF_TOKEN: "6020",
          COULD_NOT_FETCH_STATUS: "6030",
          COULD_NOT_PLAY_TRACK: "6040",
          COULD_NOT_BROWSE_TO_CONTEXT: "6041",
          NO_TRACK_LOADED: "6050",
          CORS_REQUESTS_DISABLED: "6060",
          REQUEST_TIMED_OUT: "6061"
      };
      r.Error = a, r.prototype.isCurrent = function(t) {
          return this.getCurrentTrackUri() === t
      }, r.prototype.getCurrentTrackUri = function() {
          var t = this.state,
              e = null;
          return null !== t && t.track && t.track.track_resource && t.track.track_resource.uri && (e = t.track.track_resource.uri), e
      }, r.prototype.enabled = function() {
          return this._runningPort > 0
      }, r.prototype._detectPort = function(t) {
          if (t || (t = {
                  resolve: null,
                  reject: null
              }, t.promise = new r.Promise(function(e, n) {
                  t.resolve = e, t.reject = n
              })), 0 < this._runningPort) t.resolve(this._runningPort);
          else {
              var e = this,
                  n = this._buildUrl("service/version.json", {
                      service: "remote"
                  });
              e._request(n, function(n, r) {
                  n ? e._currentPort < e._endPort ? (e._currentPort++, e._detectPort(t)) : e._pollClient ? (e._currentPort = e._startPort, setTimeout(function() {
                      e._detectPort(t)
                  }, 1e3 * e._nextPollInterval())) : t.reject({
                      type: a.COULD_NOT_DETECT_PORT,
                      message: "Could not detect any port"
                  }) : (e._resetBackoffCounter(), e._runningPort = e._currentPort, e._clientOpen = !1 !== r.running, t.resolve(e._currentPort))
              })
          }
          return t.promise
      }, r.prototype._openClient = function() {
          var t = this;
          return new r.Promise(function(e, n) {
              if (t._clientOpen) e();
              else {
                  var r = t._buildUrl("remote/open.json");
                  t._request(r, function(r, o) {
                      r ? n({
                          type: a.COULD_NOT_OPEN_CLIENT,
                          message: "Could not open client"
                      }) : o.running ? (t._clientOpen = !0, e()) : n({
                          type: a.COULD_NOT_OPEN_CLIENT,
                          message: "Could not open client"
                      })
                  }, 3e4)
              }
          })
      }, r.prototype._csrfToken = function() {
          var t = this;
          return new r.Promise(function(e, n) {
              if ("" !== t._csrf) e(t._csrf);
              else {
                  var r = t._buildUrl("simplecsrf/token.json");
                  t._request(r, function(r, o) {
                      r ? n({
                          type: a.COULD_NOT_FETCH_CSRF_TOKEN,
                          message: "Could not fetch csrf token"
                      }) : o.token ? (t._csrf = o.token, e(o.token)) : n({
                          type: a.COULD_NOT_FETCH_CSRF_TOKEN,
                          message: "Could not fetch csrf token"
                      })
                  })
              }
          })
      }, r.prototype._status = function(t, e, n) {
          var r = this,
              o = {
                  csrf: r._csrf,
                  oauth: r._token
              };
          n = n || 500, t && (o.returnon = "login,logout,play,pause,error,ap", o.returnafter = n / 1e3);
          var i = r._buildUrl("remote/status.json", o);
          this._request(i, function(t, n) {
              if (t) {
                  var o = t.type || a.COULD_NOT_FETCH_STATUS;
                  e({
                      type: o,
                      message: "Could not fetch status"
                  })
              } else n.error ? (!1 === n.running && (r._clientOpen = !1), e(n.error)) : e(null, n)
          }, n + 1e3)
      }, r.prototype._statusChange = function() {
          var t = this;
          this._status(!0, function(e, n) {
              if (e) switch (e.code = e.code || e.type, e.code) {
                  case a.NO_USER_LOGGED_IN:
                      t._connected = !1, t._connection = null, t._reconnectOnLogout && t._reconnect(), t.emit(i.CONNECTION_FAILED, e);
                      break;
                  case a.INVALID_OAUTH_TOKEN:
                  case a.EXPIRED_OAUTH_TOKEN:
                  case a.OAUTH_TOKEN_INVALID_FOR_USER:
                      t._token = "", t._connected = !1, t._connection = null, t.emit(i.CONNECTION_FAILED, e);
                      break;
                  case a.INVALID_CSRF_TOKEN:
                      t._csrf = "", t._csrfToken().then(function() {
                          t._statusChange()
                      });
                      break;
                  default:
                      t._connected = !1, t._connection = null, t.emit(i.CONNECTION_FAILED, e)
              } else t._statusChange(), t.state = n, t.emit(i.STATUS_CHANGE, n)
          }, t._longPollingTime)
      }, r.prototype._connect = function(t) {
          var e = this;
          return new r.Promise(function(n, r) {
              e._connected ? n(e.state) : e._status(!1, function(o, i) {
                  if (o) switch (o.type) {
                      case a.NO_USER_LOGGED_IN:
                          !t && e._retryConnect ? setTimeout(function() {
                              e._reconnect().then(function(t) {
                                  n(t)
                              })
                          }, 1e3 * e._nextPollInterval()) : r(o);
                          break;
                      default:
                          r(o)
                  } else e._resetBackoffCounter(), e._connected = !0, e.state = i, e._statusChange(), n(i)
              })
          })
      }, r.prototype.connect = function() {
          var t = this;
          return this._connection || (this._connection = this._delayedConnect.then(function() {
              return t._detectPort()
          }).then(function() {
              return new r.Promise(function(e, n) {
                  t._clientOpen ? t._csrfToken().then(function() {
                      return t._connect(!0).catch(function(t) {
                          switch (t.type) {
                              case a.NO_USER_LOGGED_IN:
                                  e()
                          }
                      })
                  }, function(t) {
                      n(t)
                  }).then(function(t) {
                      e(t)
                  }) : e(null)
              })
          })), this._connection.then(function(e) {
              return t.state || e
          })
      }, r.prototype._reconnect = function() {
          var t = this;
          return this._detectPort().then(function() {
              return t._reopenOnReconnect ? t._openClient() : t
          }).then(function() {
              return t._csrfToken()
          }).then(function() {
              return t._connect()
          })
      }, r.prototype.setToken = function(t) {
          this._token = t
      }, r.prototype.play = function(t, e, n) {
          var o = this,
              a = this._playPromise && this._connection ? this._playPromise : this.connect();
          return this._playPromise = a.then(function() {
              return o._openClient()
          }).then(function() {
              return o._csrfToken()
          }).then(function() {
              return o._connect()
          }).then(function() {
              var a = {
                  csrf: o._csrf,
                  oauth: o._token,
                  context: t
              };
              return a.uri = e || t, n && (a.uri += "#" + o._formatPlayPosition(n)), new r.Promise(function(t, e) {
                  var n = o._buildUrl("remote/play.json", a);
                  o._request(n, function(e, n) {
                      e ? t() : n.error ? t() : (o.state = n, o.emit(i.STATUS_CHANGE, n), t(n))
                  })
              })
          }).catch(function(t) {
              throw o._playPromise = null, t
          })
      }, r.prototype._pause = function(t) {
          var e = {
                  csrf: this._csrf,
                  oauth: this._token,
                  pause: !0 === t ? "true" : "false"
              },
              n = this._buildUrl("remote/pause.json", e);
          return new r.Promise(function(t, e) {
              this._request(n, function(n, r) {
                  if (n) {
                      var o = n.type || a.COULD_NOT_TOGGLE_PLAYBACK;
                      e({
                          type: o,
                          message: "Could not toggle playback"
                      })
                  } else r.error ? e(r.error) : t(r)
              })
          }.bind(this))
      }, r.prototype.pause = function() {
          var t = this;
          return this.connect().then(function(e) {
              return new r.Promise(function(n, r) {
                  e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(!0).then(function(t) {
                      n(t)
                  }, function(t) {
                      r(t)
                  }) : r({
                      type: a.NO_TRACK_LOADED,
                      message: "Could not pause non existing track"
                  })
              })
          })
      }, r.prototype.resume = function() {
          var t = this;
          return this.connect().then(function(e) {
              return new r.Promise(function(n, r) {
                  e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(!1).then(function(t) {
                      n(t)
                  }, function(t) {
                      r(t)
                  }) : r({
                      type: a.NO_TRACK_LOADED,
                      message: "Could not pause non existing track"
                  })
              })
          })
      }, r.prototype.toggle = function() {
          var t = this;
          return this.connect().then(function(e) {
              return new r.Promise(function(n, r) {
                  e.track && e.track.track_resource && e.track.track_resource.uri ? t._pause(e.playing).then(function(t) {
                      n(t)
                  }) : r({
                      type: a.NO_TRACK_LOADED,
                      message: "Could not toggle playback for non existing track"
                  })
              })
          })
      }, r.prototype.browse = function(t, e) {
          var n = this;
          return this.connect().then(function() {
              var o = {
                  csrf: n._csrf,
                  oauth: n._token,
                  context: t
              };
              return e && (o.uri = e), new r.Promise(function(t, e) {
                  var r = n._buildUrl("remote/browse.json", o);
                  n._request(r, function(n, r) {
                      n ? e({
                          type: a.COULD_NOT_BROWSE_TO_CONTEXT,
                          message: "Could not browse to context"
                      }) : r.error ? e(r.error) : t(r)
                  })
              })
          }).catch(function(t) {
              throw t
          })
      }, r.prototype._baseUrl = function() {
          return "http://127.0.0.1"
      }, r.prototype._request = function(t, e, n) {
          var r = this,
              o = function() {
                  if (void 0 !== r._win.XDomainRequest) return new r._win.XDomainRequest;
                  if (void 0 !== r._win.XMLHttpRequest) return new r._win.XMLHttpRequest;
                  try {
                      return new ActiveXObject("Microsoft.XMLHTTP")
                  } catch (t) {}
                  try {
                      return new ActiveXObject("Msxml2.XMLHTTP.6.0")
                  } catch (t) {}
                  try {
                      return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                  } catch (t) {}
                  try {
                      return new ActiveXObject("Msxml2.XMLHTTP")
                  } catch (t) {}
                  return null
              }();
          o ? (o.onload = function() {
              var t = o.responseText;
              t = JSON.parse(t), e(null, t)
          }, o.onerror = function() {
              e({
                  type: o.status,
                  message: "Request error"
              })
          }, o.ontimeout = function() {
              e({
                  type: a.REQUEST_TIMED_OUT,
                  message: "Request timed out"
              })
          }, o.onprogress = function() {}, o.open("GET", t), o.timeout = n || 5e3, o.send()) : e({
              type: a.CORS_REQUESTS_DISABLED,
              message: "CORS Requests are not enabled"
          })
      }, r.prototype._buildUrl = function(t, e) {
          e = e || {}, e.cors = "", e.ref = e.ref || this._referrer;
          var n = this._buildQuery(e);
          return this._baseUrl() + ":" + this._currentPort + "/" + t + "?" + n
      }, r.prototype._buildQuery = function(t) {
          var e = [];
          for (var n in t) t.hasOwnProperty(n) && e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]));
          return e.join("&")
      }, r.prototype._nextPollInterval = function() {
          var t = this._pollBackoff[this._backoffIndex];
          return this._pollBackoff[this._backoffIndex + 1] && this._backoffIndex++, t
      }, r.prototype._resetBackoffCounter = function() {
          this._backoffIndex = 0
      }, r.prototype._formatPlayPosition = function(t) {
          var e = Math.floor(t / 60),
              n = (t % 60).toFixed(3);
          return n < 10 && (n = "0" + n), e + ":" + n
      }
  }).call(e, n(4))
}, function(t, e) {
  t.exports = function(t) {
      return t.webpackPolyfill || (t.deprecate = function() {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
          enumerable: !0,
          get: function() {
              return t.l
          }
      }), Object.defineProperty(t, "id", {
          enumerable: !0,
          get: function() {
              return t.i
          }
      }), t.webpackPolyfill = 1), t
  }
}, function(t, e, n) {
  var r = n(3),
      o = "cookieNotice",
      i = r.getExpireTime(7776e6),
      a = r.getTopDomain();
  t.exports = {
      set: r.setCookie.bind(r, o, "1", "/", a, !1, i),
      get: r.getCookie.bind(r, o),
      delete: r.deleteCookie.bind(r, o, "/", a)
  }
}, , function(t, e, n) {
  var r = window.SpotifyEnvironment,
      o = n(5),
      i = n(42),
      a = new o(r),
      s = new i(r);
  t.exports = function(t) {
      return function(e) {
          return function(n) {
              var r = e(n),
                  o = t.getState();
              switch (n.type) {
                  case "DOWNLOAD_APP":
                  case "PLAY_IN_APP":
                  case "PLAY_IN_WEB_PLAYER":
                  case "LAUNCH_CONCERTS_HUB":
                  case "CALL_TO_ACTION":
                      switch (o.navigate) {
                          case "playInApp":
                              a.setHasSpotify(!0), s.launch(o.context.uri);
                              break;
                          case "launchConcertsHub":
                              a.setHasSpotify(!0), s.launch("spotify:app:concerts");
                              break;
                          case "downloadApp":
                              window.location = a.getPlatformLink();
                              break;
                          case "webplayer":
                              var i = o.context.uri,
                                  c = "https://play.spotify.com/" + i.split(":").slice(1, i.length).join("/");
                              window.open(c);
                              break;
                          case "runningWebsite":
                              window.location = "https://www.spotify.com/running"
                      }
              }
              return r
          }
      }
  }
}, function(t, e, n) {
  var r = n(41)("Open3");
  r.loadPage();
  var o = function(t, e) {
          var n = window.SpotifyEnvironment.isMobile;
          switch (t) {
              case "playInApp":
                  n ? r.playInMobileApp(e) : r.playInDesktopApp(e);
                  break;
              case "downloadApp":
                  n ? r.goToDownloadAppStore(e) : r.goToDownloadWww(e);
                  break;
              case "webplayer":
                  r.playInWebPlayer(e)
          }
      },
      i = function(t, e) {
          "preview" === t ? r.play30sPreview(e) : "remote" === t && r.playInDesktopApp(e)
      };
  t.exports = function(t) {
      return function(e) {
          return function(n) {
              var a = t.getState(),
                  s = e(n),
                  c = t.getState();
              switch (n.type) {
                  case "PLAY_INDEX":
                      if (c.playing && i(c.playbackStrategy, n.data.source), !a.showUpsellModal && c.showUpsellModal) {
                          r.showUpsellModal(n.data.source);
                          break
                      }
                      break;
                  case "TOGGLE":
                      c.playing && i(c.playbackStrategy, n.data.source);
                      break;
                  case "CALL_TO_ACTION":
                      if (c.navigate) {
                          o(c.navigate, n.data.source);
                          break
                      }
                      if (c.showChoiceModal) {
                          r.showModal(n.data.source);
                          break
                      }
                      if (c.playing) {
                          i(c.playbackStrategy, n.data.source);
                          break
                      }
                      break;
                  case "DOWNLOAD_APP":
                  case "PLAY_IN_APP":
                  case "PLAY_IN_WEB_PLAYER":
                      if (c.navigate) {
                          o(c.navigate, n.data.source);
                          break
                      }
                      break;
                  case "DISMISS_CHOICE_MODAL":
                      r.dismissModal(n.data.source);
                      break;
                  case "DISMISS_UPSELL_MODAL":
                      r.dismissUpsellModal(n.data.source);
                      break;
                  case "SWITCH_PLAYBACK_STRATEGY":
                      r.loadPlaybackStrategy(n.data.strategy)
              }
              return s
          }
      }
  }
}, function(t, e) {
  var n = function() {
      window && window.dataLayer && 0 === window.location.pathname.indexOf("/user/spotifydiscover/playlist/") && window.dataLayer.push({
          event: "discover_weekly_play_on_spotify"
      })
  };
  t.exports = function() {
      return function(t) {
          return function(e) {
              var r = t(e);
              switch (e.type) {
                  case "CALL_TO_ACTION":
                      n()
              }
              return r
          }
      }
  }
}, function(t, e) {
  "function" != typeof Object.assign && function() {
      Object.assign = function(t) {
          "use strict";
          if (void 0 === t || null === t) throw new TypeError("Cannot convert undefined or null to object");
          for (var e = Object(t), n = 1; n < arguments.length; n++) {
              var r = arguments[n];
              if (void 0 !== r && null !== r)
                  for (var o in r) r.hasOwnProperty(o) && (e[o] = r[o])
          }
          return e
      }
  }()
}, function(t, e) {
  t.exports = function(t, e) {
      function n(t, e) {
          for (var n = t.context.tracks, r = 0, o = n.length; r < o; r++)
              if (n[r].uri === e) return r + 1;
          return !1
      }

      function r(t, e) {
          return Object.assign({}, t, e)
      }
      var o = {
          context: t,
          playing: !1,
          index_playing: 1,
          playbackStrategy: "none",
          showChoiceModal: !1,
          showUpsellModal: !1,
          progress: {
              time: 0,
              total: 0
          },
          tracksPreviewed: 0,
          env: e
      };
      return function(t, e) {
          var i = t && "none" === t.playbackStrategy;
          switch (e.type) {
              case "PLAY_INDEX":
                  if (i) return t;
                  var a = t.index_playing === e.data.index,
                      s = 0 === t.tracksPreviewed || !a,
                      c = s ? t.tracksPreviewed + 1 : t.tracksPreviewed,
                      u = !a || !t.playing,
                      l = !t.env.hasSpotify && (t.showUpsellModal || "preview" === t.playbackStrategy && u && s && c % 5 == 1);
                  return r(t, {
                      playing: u,
                      index_playing: e.data.index,
                      progress: a ? t.progress : {
                          time: 0,
                          total: 0
                      },
                      tracksPreviewed: c,
                      showUpsellModal: l
                  });
              case "PLAY_TOGGLE":
                  return i ? t : (l = e.data.source && "CTA cover-art" === e.data.source && 0 === t.tracksPreviewed && t.env.coverArtPlaysPreview, r(t, {
                      playing: !t.playing,
                      showUpsellModal: l,
                      tracksPreviewed: 0 === t.tracksPreviewed ? 1 : t.tracksPreviewed
                  }));
              case "NEXT":
                  if (i) return t;
                  return r(t, t.index_playing < t.context.tracks.length ? {
                      playing: !0,
                      index_playing: t.index_playing + 1,
                      progress: {
                          time: 0,
                          total: 0
                      }
                  } : {
                      playing: !1,
                      progress: {
                          time: 0,
                          total: 0
                      }
                  });
              case "PREVIOUS":
                  return i ? t : r(t, {
                      playing: !0,
                      index_playing: t.index_playing > 1 ? t.index_playing - 1 : t.index_playing,
                      progress: {
                          time: 0,
                          total: 0
                      }
                  });
              case "STOP":
                  return i ? t : r(t, {
                      playing: !1,
                      progress: {
                          time: 0,
                          total: 0
                      }
                  });
              case "CALL_TO_ACTION":
                  if (t.env.isMobile) return t.env.hasSpotify ? r(t, {
                      navigate: "playInApp"
                  }) : r(t, {
                      showChoiceModal: !0,
                      showUpsellModal: !1,
                      navigate: null
                  });
                  if (t.env.isChromebook) return r(t, {
                      navigate: "webplayer"
                  });
                  if (!t.env.isMobile && "running" === t.context.type) return r(t, {
                      navigate: "runningWebsite"
                  });
                  switch (t.playbackStrategy) {
                      case "remote":
                          return r(t, {
                              playing: !t.playing,
                              navigate: null
                          });
                      default:
                          return t.env.hasSpotify ? r(t, {
                              navigate: "playInApp"
                          }) : r(t, {
                              showChoiceModal: !0,
                              showUpsellModal: !1,
                              navigate: null
                          })
                  }
              case "LAUNCH_CONCERTS_HUB":
                  return t.env.hasSpotify ? r(t, {
                      navigate: "launchConcertsHub"
                  }) : r(t, {
                      showChoiceModal: !0,
                      showUpsellModal: !1,
                      navigate: null
                  });
              case "PLAY_IN_APP":
                  return "concert" === t.context.type ? r(t, {
                      navigate: "launchConcertsHub",
                      showChoiceModal: !1
                  }) : r(t, {
                      navigate: "playInApp",
                      showChoiceModal: !1
                  });
              case "PLAY_IN_WEB_PLAYER":
                  return r(t, {
                      navigate: "webplayer",
                      showChoiceModal: !1
                  });
              case "DOWNLOAD_APP":
                  return r(t, {
                      navigate: "downloadApp",
                      showChoiceModal: !1
                  });
              case "DISMISS_CHOICE_MODAL":
                  return r(t, {
                      showChoiceModal: !1
                  });
              case "DISMISS_UPSELL_MODAL":
                  return r(t, {
                      showUpsellModal: !1
                  });
              case "REMOTE_STATUS_UPDATE":
                  var f = e.data.status && e.data.status.track && e.data.status.track.track_resource,
                      p = f ? n(t, f.uri) : null;
                  return p ? r(t, {
                      playing: e.data.status.playing,
                      index_playing: p
                  }) : r(t, {
                      playing: !1
                  });
              case "PROGRESS":
                  return r(t, {
                      progress: {
                          time: e.data.time,
                          total: e.data.total
                      }
                  });
              case "SWITCH_PLAYBACK_STRATEGY":
                  return r(t, {
                      playbackStrategy: e.data.strategy
                  });
              default:
                  return t || o
          }
      }
  }
}, function(t, e) {
  t.exports = function(t) {
      var e = {
          uri: t.uri,
          type: t.type,
          tracks: []
      };
      switch (t.type) {
          case "album":
          case "playlist":
              e.tracks = t.tracks.items.map(function(t) {
                  var e = t.track ? t.track : t;
                  return "linked_from" in e ? Object.assign(e, e.linked_from) : e
              });
              break;
          case "artist":
              e.tracks = t.top_tracks;
              break;
          case "track":
              e.tracks = [t];
              break;
          case "show":
              e.tracks = t.episodes.items;
              break;
          case "episode":
              e.tracks = [t];
              break;
          case "concert":
              e.tracks = t.tracks.map(function(t) {
                  return t.data
              });
              break;
          case "user":
          case "view":
          case "concerthub":
          case "running":
              break;
          default:
              e.tracks = t.tracks.items
      }
      return "playlist" === t.type && (e.tracks = e.tracks.slice(0, 30)), e
  }
}, function(t, e, n) {
  var r = n(6).Promise,
      o = n(13);
  o.Promise = r;
  var i = n(5);
  t.exports = function() {
      var t = new i(window.SpotifyEnvironment);
      return new r(function(e) {
          if (t.urlParams.playback) return void e({
              type: t.urlParams.playback
          });
          t.isMobile || t.isChromebook ? e({
              type: "preview"
          }) : t.context && t.context.uri && /spotify:app:concerts:(\w+)/.exec(t.context.uri) ? e({
              type: "preview"
          }) : fetch("/token").then(function(t) {
              return t.text()
          }).then(function(t) {
              var e = JSON.parse(t).t;
              return console.log("Fetched OAuth token", e), e
          }).then(function(t) {
              var n = new o({
                  token: t,
                  pollClient: !1,
                  retryConnect: !0,
                  reconnectOnLogout: !0,
                  debug: !1,
                  port: 1080
              });
              n.connect().then(function(t) {
                  console.log("Connected to the SpotifyWebHelper", t), e({
                      type: "remote",
                      data: {
                          remoteStatus: t,
                          remoteControl: n
                      }
                  })
              }).catch(function() {
                  console.log("Failed to connect to the SpotifyWebHelper"), e({
                      type: "preview"
                  })
              })
          }).catch(function() {
              console.log("Failed to fetch the OAuth token"), e({
                  type: "preview"
              })
          })
      })
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(13);
  o.Promise = n(6).Promise;
  var i = n(0);
  t.exports = function(t, e, n) {
      var a = t;
      t && n.dispatch(i.remoteStatusUpdate(t));
      var s = {
          timeUpdateFrequency: 100,
          currentTime: t ? 1e3 * t.playing_position : 0,
          totalTime: t ? 1e3 * t.track.length : 0,
          interval: null,
          start: function() {
              this.interval || (this.interval = setInterval(function() {
                  this.currentTime += this.timeUpdateFrequency, n.dispatch(i.progress(this.currentTime, this.totalTime))
              }.bind(this), this.timeUpdateFrequency))
          },
          stop: function() {
              clearInterval(this.interval), this.interval = null
          }
      };
      e.on(o.Event.STATUS_CHANGE, function(t) {
          console.log("Received status from SpotifyWebHelper", t), a = t, t.playing_position && t.track && (s.currentTime = 1e3 * t.playing_position, s.totalTime = 1e3 * t.track.length), n.dispatch(i.remoteStatusUpdate(t))
      }), e.on(o.Event.CONNECTION_FAILED, function() {
          console.log("Remotecontrol Connection failed"), a = null, n.dispatch(i.stop())
      });
      var c = function(t, e) {
          for (var n = 0; n < e.tracks.length; n++)
              if (e.tracks[n].uri === t) return !0;
          return !1
      };
      r(n, function(t) {
          return {
              envContext: t.env.context,
              context: t.context,
              trackUri: t.context.tracks[t.index_playing - 1].uri,
              playing: t.playing
          }
      }, function(t, n) {
          if (!a) return void(t.playing && (e.play(t.envContext.uri, t.trackUri), s.start()));
          var r = t.trackUri !== n.trackUri,
              o = a.track.track_resource,
              i = !!o && c(o.uri, t.context);
          r && (s.stop(), s.currentTime = 0), t.playing ? s.start() : s.stop(), t.playing && r || t.playing && !i ? e.play(t.envContext.uri, t.trackUri) : i && (t.playing && !a.playing ? e.toggle() : !t.playing && a.playing && e.toggle())
      })
  }
}, function(t, e, n) {
  var r = n(0);
  t.exports = function(t) {
      for (var e = document.querySelectorAll(".js-concerts-hub-button"), n = 0; n < e.length; n++) e[n].addEventListener("click", function(e) {
          t.dispatch(r.launchConcertsHub()), e.preventDefault()
      })
  }
}, function(t, e, n) {
  var r = n(0);
  t.exports = function(t) {
      for (var e = document.querySelectorAll(".js-action-button"), n = 0; n < e.length; n++) e[n].addEventListener("click", function(e) {
          var n = e.currentTarget.getAttribute("data-track-type");
          t.dispatch(r.callToAction("CTA " + n)), e.preventDefault()
      })
  }
}, function(t, e, n) {
  var r = n(45);
  t.exports = function() {
      var t = document.querySelectorAll(".btn-scroll");
      Array.apply(null, t).forEach(function(t) {
          t.addEventListener("click", function() {
              var t = document.getElementById(this.hash.substr(1));
              return t && r(t.offsetTop, 500), !0
          })
      })
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(0);
  t.exports = function(t, e) {
      if (e) {
          var n = null,
              i = e.querySelector("#mobile-download"),
              a = e.querySelector("#mobile-play"),
              s = e.querySelector("#choice-web-player"),
              c = e.querySelector(".btn-close"),
              u = a;
          i.addEventListener("click", function() {
              t.dispatch(o.downloadApp("Modal"))
          }), s && (s.addEventListener("click", function() {
              t.dispatch(o.playInWebPlayer("Modal"))
          }), u = s), a.addEventListener("click", function() {
              t.dispatch(o.playInApp("Modal"))
          }), c.addEventListener("click", function() {
              t.dispatch(o.dismissChoiceModal("Modal"))
          }), e.addEventListener("click", function(n) {
              n.target === e && t.dispatch(o.dismissChoiceModal("Modal"))
          }), e.addEventListener("keydown", function(e) {
              switch (e.which) {
                  case 9:
                      e.shiftKey ? document.activeElement === c && e.preventDefault() : document.activeElement === u && e.preventDefault();
                      break;
                  case 27:
                      t.dispatch(o.dismissChoiceModal("Modal"))
              }
          });
          r(t, function(t) {
              return {
                  showChoiceModal: t.showChoiceModal
              }
          }, function(t) {
              t.showChoiceModal ? (e.classList.remove("hide"), document.body.classList.add("modal-open")) : (e.classList.add("hide"), document.body.classList.remove("modal-open")), e.setAttribute("aria-hidden", t.showChoiceModal ? "false" : "true"), document.querySelector(".page").setAttribute("aria-hidden", t.showChoiceModal ? "true" : "false"), t.showChoiceModal ? (n = document.activeElement, i.focus()) : n && (n.focus(), n = null)
          })
      }
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(0);
  t.exports = function(t, e, n) {
      if (e) {
          e.addEventListener("click", function(e) {
              var r = e.currentTarget.getAttribute("data-track-type");
              n && n.coverArtPlaysPreview ? t.dispatch(o.toggle("CTA " + r)) : t.dispatch(o.callToAction("CTA " + r))
          });
          r(t, function(t) {
              return {
                  playing: t.playing
              }
          }, function(t) {
              t.playing ? e.classList.add("playing") : e.classList.remove("playing")
          })
      }
  }
}, function(t, e) {
  t.exports = function(t) {
      function e() {
          o.parentNode.removeChild(o), t && t.onClose && t.onClose()
      }

      function n() {
          a.parentNode.removeChild(a)
      }

      function r() {
          "japan" === o.dataset.country ? u.set() : c.set(), e()
      }
      var o = document.querySelector(".notice"),
          i = document.querySelector(".notice button"),
          a = document.querySelector(".concert-notice"),
          s = document.querySelector(".concert-notice button"),
          c = t.cookieNotice,
          u = t.japanNotice;
      o && i && i.addEventListener("click", r), a && s && s.addEventListener("click", n)
  }
}, function(t, e) {
  t.exports = function(t, e) {
      function n(t, e) {
          e = e || {}, this.elm = t, this.elmToggle = t.querySelector(".expand-toggle"), this.isExpanded = !1, this.onExpanded = e.onExpanded
      }
      n.prototype.init = function() {
          this.elmToggle && this.elmToggle.addEventListener("click", this.onToggleClick.bind(this))
      }, n.prototype.onToggleClick = function() {
          this.isExpanded = !this.isExpanded, this.isExpanded ? this.elm.classList.add("expand_expanded") : this.elm.classList.remove("expand_expanded"), this.isExpanded && this.onExpanded && this.onExpanded()
      };
      for (var r = t.querySelectorAll(".expand"), o = 0; o < r.length; o++) {
          new n(r[o], e).init()
      }
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(0),
      i = n(40);
  t.exports = function(t, e) {
      if (e) {
          var n = e.querySelectorAll(".js-track-row"),
              a = function(t, e) {
                  for (var n = t; n;) {
                      if (i.hasClass(n, e)) return n;
                      n = n.parentNode
                  }
                  return null
              },
              s = function(e) {
                  if ("A" !== e.target.nodeName) {
                      var n = a(e.target, "js-track-row");
                      if (n && i.hasClass(n, "track-playback-enabled")) {
                          var r = parseInt(n.getAttribute("data-position"));
                          t.dispatch(o.playIndex(r, "tracklist"))
                      }
                  }
              };
          e.addEventListener("click", s), e.addEventListener("keydown", function(t) {
              32 !== t.keyCode && 13 !== t.keyCode || (s.call(this, t), t.preventDefault())
          });
          r(t, function(t) {
              return {
                  playing: t.playing,
                  indexPlaying: t.index_playing,
                  playbackStrategy: t.playbackStrategy
              }
          }, function(t) {
              for (var e = 0; e < n.length; e++) {
                  var r = n[e];
                  r.classList.remove("playing"), "preview" === t.playbackStrategy ? r.classList.add("preview-strategy") : r.classList.remove("preview-strategy"), "remote" === t.playbackStrategy || "preview" === t.playbackStrategy && r.classList.contains("track-has-preview") ? r.classList.add("track-playback-enabled") : r.classList.remove("track-playback-enabled"), t.playing && parseInt(r.getAttribute("data-position")) === t.indexPlaying && r.classList.add("playing"), r.querySelector(".progress-bar").style.width = "0%"
              }
          });
          r(t, function(t) {
              return {
                  indexPlaying: t.index_playing,
                  progressTime: t.progress.time,
                  progressTotal: t.progress.total
              }
          }, function(t) {
              var n = '.js-track-row[data-position="' + t.indexPlaying + '"] .progress-bar',
                  r = e.querySelector(n);
              r && (r.style.width = 100 * t.progressTime / t.progressTotal + "%")
          })
      }
  }
}, function(t, e, n) {
  var r = n(1),
      o = n(0);
  t.exports = function(t, e) {
      if (e) {
          var n = null,
              i = e.querySelector(".link"),
              a = e.querySelector(".btn-close");
          i.addEventListener("click", function() {
              n.focus(), n = null, t.dispatch(o.callToAction("Upsell Modal"))
          }), a.addEventListener("click", function() {
              t.dispatch(o.dismissUpsellModal("Upsell Modal"))
          }), e.addEventListener("click", function(n) {
              n.target === e && t.dispatch(o.dismissUpsellModal("Upsell Modal"))
          }), e.addEventListener("keydown", function(e) {
              switch (e.which) {
                  case 9:
                      e.shiftKey ? document.activeElement === a && e.preventDefault() : document.activeElement === i && e.preventDefault();
                      break;
                  case 27:
                      t.dispatch(o.dismissUpsellModal("Upsell Modal"))
              }
          });
          r(t, function(t) {
              return {
                  showUpsellModal: t.showUpsellModal
              }
          }, function(t) {
              t.showUpsellModal ? (n = document.activeElement, e.classList.remove("hide"), i.focus(), setTimeout(function() {
                  e.classList.remove("fade-out")
              }, 0)) : (setTimeout(function() {
                  e.classList.add("hide")
              }, 500), e.classList.add("fade-out"), n && (n.focus(), n = null)), e.setAttribute("aria-hidden", t.showUpsellModal ? "false" : "true"), document.querySelector(".page").setAttribute("aria-hidden", t.showUpsellModal ? "true" : "false"), t.showUpsellModal ? document.body.classList.add("modal-open") : document.body.classList.remove("modal-open")
          })
      }
  }
}, function(t, e) {
  "document" in window.self && ("classList" in document.createElement("_") && (!document.createElementNS || "classList" in document.createElementNS("http://www.w3.org/2000/svg", "g")) ? function() {
      "use strict";
      var t = document.createElement("_");
      if (t.classList.add("c1", "c2"), !t.classList.contains("c2")) {
          var e = function(t) {
              var e = DOMTokenList.prototype[t];
              DOMTokenList.prototype[t] = function(t) {
                  var n, r = arguments.length;
                  for (n = 0; n < r; n++) t = arguments[n], e.call(this, t)
              }
          };
          e("add"), e("remove")
      }
      if (t.classList.toggle("c3", !1), t.classList.contains("c3")) {
          var n = DOMTokenList.prototype.toggle;
          DOMTokenList.prototype.toggle = function(t, e) {
              return 1 in arguments && !this.contains(t) == !e ? e : n.call(this, t)
          }
      }
      t = null
  }() : function(t) {
      "use strict";
      if ("Element" in t) {
          var e = t.Element.prototype,
              n = Object,
              r = String.prototype.trim || function() {
                  return this.replace(/^\s+|\s+$/g, "")
              },
              o = Array.prototype.indexOf || function(t) {
                  for (var e = 0, n = this.length; e < n; e++)
                      if (e in this && this[e] === t) return e;
                  return -1
              },
              i = function(t, e) {
                  this.name = t, this.code = DOMException[t], this.message = e
              },
              a = function(t, e) {
                  if ("" === e) throw new i("SYNTAX_ERR", "An invalid or illegal string was specified");
                  if (/\s/.test(e)) throw new i("INVALID_CHARACTER_ERR", "String contains an invalid character");
                  return o.call(t, e)
              },
              s = function(t) {
                  for (var e = r.call(t.getAttribute("class") || ""), n = e ? e.split(/\s+/) : [], o = 0, i = n.length; o < i; o++) this.push(n[o]);
                  this._updateClassName = function() {
                      t.setAttribute("class", this.toString())
                  }
              },
              c = s.prototype = [],
              u = function() {
                  return new s(this)
              };
          if (i.prototype = Error.prototype, c.item = function(t) {
                  return this[t] || null
              }, c.contains = function(t) {
                  return t += "", -1 !== a(this, t)
              }, c.add = function() {
                  var t, e = arguments,
                      n = 0,
                      r = e.length,
                      o = !1;
                  do {
                      t = e[n] + "", -1 === a(this, t) && (this.push(t), o = !0)
                  } while (++n < r);
                  o && this._updateClassName()
              }, c.remove = function() {
                  var t, e, n = arguments,
                      r = 0,
                      o = n.length,
                      i = !1;
                  do {
                      for (t = n[r] + "", e = a(this, t); - 1 !== e;) this.splice(e, 1), i = !0, e = a(this, t)
                  } while (++r < o);
                  i && this._updateClassName()
              }, c.toggle = function(t, e) {
                  t += "";
                  var n = this.contains(t),
                      r = n ? !0 !== e && "remove" : !1 !== e && "add";
                  return r && this[r](t), !0 === e || !1 === e ? e : !n
              }, c.toString = function() {
                  return this.join(" ")
              }, n.defineProperty) {
              var l = {
                  get: u,
                  enumerable: !0,
                  configurable: !0
              };
              try {
                  n.defineProperty(e, "classList", l)
              } catch (t) {
                  -2146823252 === t.number && (l.enumerable = !1, n.defineProperty(e, "classList", l))
              }
          } else n.prototype.__defineGetter__ && e.__defineGetter__("classList", u)
      }
  }(window.self))
}, function(t, e) {}, , function(t, e, n) {
  "use strict";
  Object.defineProperty(e, "__esModule", {
      value: !0
  });
  var r = n(10),
      o = n(57),
      i = n(56),
      a = n(55),
      s = n(9);
  n(11);
  n.d(e, "createStore", function() {
      return r.a
  }), n.d(e, "combineReducers", function() {
      return o.a
  }), n.d(e, "bindActionCreators", function() {
      return i.a
  }), n.d(e, "applyMiddleware", function() {
      return a.a
  }), n.d(e, "compose", function() {
      return s.a
  })
}, function(t, e, n) {
  (function(t) {
      ! function() {
          "use strict";
          var e, n = function() {
                  var t, e = function() {},
                      n = function(n) {
                          n.forEach(function(n) {
                              if (!(n.intersectionRatio <= 0)) {
                                  var r = n.target;
                                  t.unobserve(r), e(r)
                              }
                          })
                      },
                      r = function(e) {
                          if (e) {
                              t = new IntersectionObserver(n);
                              for (var r = 0; r < e.length; r++) t.observe(e[r])
                          }
                      };
                  return {
                      init: function(t, n) {
                          e = n, r(t)
                      },
                      reload: function(t) {
                          return this.destroy(), this.init(t, e)
                      },
                      destroy: function() {
                          t = null
                      }
                  }
              },
              r = function() {
                  var t = ["load", "scroll", "resize", "touchmove"],
                      e = ["load", "resize"],
                      n = null,
                      r = null,
                      o = !0,
                      i = null,
                      a = function() {},
                      s = function() {
                          return window.addEventListener ? window.addEventListener : function(t, e) {
                              window.attachEvent("on" + t, e, {
                                  passive: !0
                              })
                          }
                      }(),
                      c = function() {
                          return window.removeEventListener ? window.removeEventListener : function(t, e) {
                              window.detachEvent("on" + t, e, {
                                  passive: !0
                              })
                          }
                      }(),
                      u = function() {
                          var n, r;
                          for (n = 0, r = e.length; n < r; n++) s(e[n], p);
                          for (n = 0, r = t.length; n < r; n++) s(t[n], f);
                          p(), f()
                      },
                      l = function() {
                          var n, r;
                          for (n = 0, r = e.length; n < r; n++) c(e[n], p);
                          for (n = 0, r = t.length; n < r; n++) c(t[n], f)
                      },
                      f = function() {
                          o && (o = !1, setTimeout(function() {
                              h(), 0 === i.length && l(), o = !0
                          }.bind(this), 200))
                      },
                      p = function() {
                          n = window.innerWidth || document.documentElement.clientWidth, r = window.innerHeight || document.documentElement.clientHeight
                      },
                      d = function(t) {
                          if (null === t.offsetParent) return !1;
                          var e = t.getBoundingClientRect();
                          return (e.left >= 0 && e.left <= n || e.right >= 0 && e.right <= n) && (e.top >= 0 && e.top <= r || e.bottom >= 0 && e.bottom <= r)
                      },
                      h = function() {
                          i = i.filter(function(t) {
                              return !d(t) || (a(t), !1)
                          })
                      };
                  return {
                      init: function(t, e) {
                          i = t, u(), a = e
                      },
                      reload: function() {
                          this.destroy(), u()
                      },
                      destroy: function() {
                          l()
                      }
                  }
              },
              o = function(t) {
                  var n = t.currentTarget;
                  e && (n.className += " " + e)
              },
              i = function() {
                  if (window.matchMedia) {
                      var t = window.matchMedia("only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)");
                      return t && t.matches || window.devicePixelRatio > 1
                  }
              }(),
              a = function(t) {
                  var e = t.getAttribute("data-src"),
                      n = t.getAttribute("data-src2x"),
                      r = n && i ? n : e;
                  if ("IMG" === t.nodeName) t.addEventListener("load", o), t.src = r;
                  else {
                      var a = new Image;
                      a.addEventListener("load", o.bind(null, {
                          currentTarget: t
                      })), a.src = r, t.style.backgroundImage = "url(" + r + ")"
                  }
              },
              s = function(t) {
                  return Array.prototype.slice.call(document.querySelectorAll("[data-src], [data-src2x]")).filter(function(e) {
                      return -1 === e.className.split(" ").indexOf(t)
                  })
              },
              c = ("undefined" != typeof IntersectionObserver ? n : r)(),
              u = {
                  init: function(t) {
                      t = t || {}, e = t.classLoaded, c.init(s(t.classLoaded), a)
                  },
                  reload: function() {
                      c.init(s(), a)
                  },
                  detach: function() {
                      c.destroy()
                  }
              };
          "object" == typeof t && t.hasOwnProperty("exports") ? t.exports = u : window.Sloth = u
      }()
  }).call(e, n(14)(t))
}, function(t, e) {
  ! function(t) {
      "use strict";

      function e(t) {
          if ("string" != typeof t && (t = String(t)), /[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(t)) throw new TypeError("Invalid character in header field name");
          return t.toLowerCase()
      }

      function n(t) {
          return "string" != typeof t && (t = String(t)), t
      }

      function r(t) {
          var e = {
              next: function() {
                  var e = t.shift();
                  return {
                      done: void 0 === e,
                      value: e
                  }
              }
          };
          return m.iterable && (e[Symbol.iterator] = function() {
              return e
          }), e
      }

      function o(t) {
          this.map = {}, t instanceof o ? t.forEach(function(t, e) {
              this.append(e, t)
          }, this) : Array.isArray(t) ? t.forEach(function(t) {
              this.append(t[0], t[1])
          }, this) : t && Object.getOwnPropertyNames(t).forEach(function(e) {
              this.append(e, t[e])
          }, this)
      }

      function i(t) {
          if (t.bodyUsed) return Promise.reject(new TypeError("Already read"));
          t.bodyUsed = !0
      }

      function a(t) {
          return new Promise(function(e, n) {
              t.onload = function() {
                  e(t.result)
              }, t.onerror = function() {
                  n(t.error)
              }
          })
      }

      function s(t) {
          var e = new FileReader,
              n = a(e);
          return e.readAsArrayBuffer(t), n
      }

      function c(t) {
          var e = new FileReader,
              n = a(e);
          return e.readAsText(t), n
      }

      function u(t) {
          for (var e = new Uint8Array(t), n = new Array(e.length), r = 0; r < e.length; r++) n[r] = String.fromCharCode(e[r]);
          return n.join("")
      }

      function l(t) {
          if (t.slice) return t.slice(0);
          var e = new Uint8Array(t.byteLength);
          return e.set(new Uint8Array(t)), e.buffer
      }

      function f() {
          return this.bodyUsed = !1, this._initBody = function(t) {
              if (this._bodyInit = t, t)
                  if ("string" == typeof t) this._bodyText = t;
                  else if (m.blob && Blob.prototype.isPrototypeOf(t)) this._bodyBlob = t;
              else if (m.formData && FormData.prototype.isPrototypeOf(t)) this._bodyFormData = t;
              else if (m.searchParams && URLSearchParams.prototype.isPrototypeOf(t)) this._bodyText = t.toString();
              else if (m.arrayBuffer && m.blob && g(t)) this._bodyArrayBuffer = l(t.buffer), this._bodyInit = new Blob([this._bodyArrayBuffer]);
              else {
                  if (!m.arrayBuffer || !ArrayBuffer.prototype.isPrototypeOf(t) && !w(t)) throw new Error("unsupported BodyInit type");
                  this._bodyArrayBuffer = l(t)
              } else this._bodyText = "";
              this.headers.get("content-type") || ("string" == typeof t ? this.headers.set("content-type", "text/plain;charset=UTF-8") : this._bodyBlob && this._bodyBlob.type ? this.headers.set("content-type", this._bodyBlob.type) : m.searchParams && URLSearchParams.prototype.isPrototypeOf(t) && this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8"))
          }, m.blob && (this.blob = function() {
              var t = i(this);
              if (t) return t;
              if (this._bodyBlob) return Promise.resolve(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              if (this._bodyFormData) throw new Error("could not read FormData body as blob");
              return Promise.resolve(new Blob([this._bodyText]))
          }, this.arrayBuffer = function() {
              return this._bodyArrayBuffer ? i(this) || Promise.resolve(this._bodyArrayBuffer) : this.blob().then(s)
          }), this.text = function() {
              var t = i(this);
              if (t) return t;
              if (this._bodyBlob) return c(this._bodyBlob);
              if (this._bodyArrayBuffer) return Promise.resolve(u(this._bodyArrayBuffer));
              if (this._bodyFormData) throw new Error("could not read FormData body as text");
              return Promise.resolve(this._bodyText)
          }, m.formData && (this.formData = function() {
              return this.text().then(h)
          }), this.json = function() {
              return this.text().then(JSON.parse)
          }, this
      }

      function p(t) {
          var e = t.toUpperCase();
          return b.indexOf(e) > -1 ? e : t
      }

      function d(t, e) {
          e = e || {};
          var n = e.body;
          if (t instanceof d) {
              if (t.bodyUsed) throw new TypeError("Already read");
              this.url = t.url, this.credentials = t.credentials, e.headers || (this.headers = new o(t.headers)), this.method = t.method, this.mode = t.mode, n || null == t._bodyInit || (n = t._bodyInit, t.bodyUsed = !0)
          } else this.url = String(t);
          if (this.credentials = e.credentials || this.credentials || "omit", !e.headers && this.headers || (this.headers = new o(e.headers)), this.method = p(e.method || this.method || "GET"), this.mode = e.mode || this.mode || null, this.referrer = null, ("GET" === this.method || "HEAD" === this.method) && n) throw new TypeError("Body not allowed for GET or HEAD requests");
          this._initBody(n)
      }

      function h(t) {
          var e = new FormData;
          return t.trim().split("&").forEach(function(t) {
              if (t) {
                  var n = t.split("="),
                      r = n.shift().replace(/\+/g, " "),
                      o = n.join("=").replace(/\+/g, " ");
                  e.append(decodeURIComponent(r), decodeURIComponent(o))
              }
          }), e
      }

      function y(t) {
          var e = new o;
          return t.split(/\r?\n/).forEach(function(t) {
              var n = t.split(":"),
                  r = n.shift().trim();
              if (r) {
                  var o = n.join(":").trim();
                  e.append(r, o)
              }
          }), e
      }

      function v(t, e) {
          e || (e = {}), this.type = "default", this.status = "status" in e ? e.status : 200, this.ok = this.status >= 200 && this.status < 300, this.statusText = "statusText" in e ? e.statusText : "OK", this.headers = new o(e.headers), this.url = e.url || "", this._initBody(t)
      }
      if (!t.fetch) {
          var m = {
              searchParams: "URLSearchParams" in t,
              iterable: "Symbol" in t && "iterator" in Symbol,
              blob: "FileReader" in t && "Blob" in t && function() {
                  try {
                      return new Blob, !0
                  } catch (t) {
                      return !1
                  }
              }(),
              formData: "FormData" in t,
              arrayBuffer: "ArrayBuffer" in t
          };
          if (m.arrayBuffer) var _ = ["[object Int8Array]", "[object Uint8Array]", "[object Uint8ClampedArray]", "[object Int16Array]", "[object Uint16Array]", "[object Int32Array]", "[object Uint32Array]", "[object Float32Array]", "[object Float64Array]"],
              g = function(t) {
                  return t && DataView.prototype.isPrototypeOf(t)
              },
              w = ArrayBuffer.isView || function(t) {
                  return t && _.indexOf(Object.prototype.toString.call(t)) > -1
              };
          o.prototype.append = function(t, r) {
              t = e(t), r = n(r);
              var o = this.map[t];
              this.map[t] = o ? o + "," + r : r
          }, o.prototype.delete = function(t) {
              delete this.map[e(t)]
          }, o.prototype.get = function(t) {
              return t = e(t), this.has(t) ? this.map[t] : null
          }, o.prototype.has = function(t) {
              return this.map.hasOwnProperty(e(t))
          }, o.prototype.set = function(t, r) {
              this.map[e(t)] = n(r)
          }, o.prototype.forEach = function(t, e) {
              for (var n in this.map) this.map.hasOwnProperty(n) && t.call(e, this.map[n], n, this)
          }, o.prototype.keys = function() {
              var t = [];
              return this.forEach(function(e, n) {
                  t.push(n)
              }), r(t)
          }, o.prototype.values = function() {
              var t = [];
              return this.forEach(function(e) {
                  t.push(e)
              }), r(t)
          }, o.prototype.entries = function() {
              var t = [];
              return this.forEach(function(e, n) {
                  t.push([n, e])
              }), r(t)
          }, m.iterable && (o.prototype[Symbol.iterator] = o.prototype.entries);
          var b = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
          d.prototype.clone = function() {
              return new d(this, {
                  body: this._bodyInit
              })
          }, f.call(d.prototype), f.call(v.prototype), v.prototype.clone = function() {
              return new v(this._bodyInit, {
                  status: this.status,
                  statusText: this.statusText,
                  headers: new o(this.headers),
                  url: this.url
              })
          }, v.error = function() {
              var t = new v(null, {
                  status: 0,
                  statusText: ""
              });
              return t.type = "error", t
          };
          var T = [301, 302, 303, 307, 308];
          v.redirect = function(t, e) {
              if (-1 === T.indexOf(e)) throw new RangeError("Invalid status code");
              return new v(null, {
                  status: e,
                  headers: {
                      location: t
                  }
              })
          }, t.Headers = o, t.Request = d, t.Response = v, t.fetch = function(t, e) {
              return new Promise(function(n, r) {
                  var o = new d(t, e),
                      i = new XMLHttpRequest;
                  i.onload = function() {
                      var t = {
                          status: i.status,
                          statusText: i.statusText,
                          headers: y(i.getAllResponseHeaders() || "")
                      };
                      t.url = "responseURL" in i ? i.responseURL : t.headers.get("X-Request-URL");
                      var e = "response" in i ? i.response : i.responseText;
                      n(new v(e, t))
                  }, i.onerror = function() {
                      r(new TypeError("Network request failed"))
                  }, i.ontimeout = function() {
                      r(new TypeError("Network request failed"))
                  }, i.open(o.method, o.url, !0), "include" === o.credentials && (i.withCredentials = !0), "responseType" in i && m.blob && (i.responseType = "blob"), o.headers.forEach(function(t, e) {
                      i.setRequestHeader(e, t)
                  }), i.send(void 0 === o._bodyInit ? null : o._bodyInit)
              })
          }, t.fetch.polyfill = !0
      }
  }("undefined" != typeof self ? self : this)
}, function(t, e) {
  function n(t) {
      return "undefined" != typeof NodeList && t instanceof NodeList ? [].slice.call(t) : [].concat(t)
  }

  function r(t, e, r) {
      e = n(e);
      for (var o = 0; o < e.length; o++) t.attachEvent && !t.addEventListener ? t.attachEvent(e[o], r) : t.addEventListener(e[o], r, !1)
  }
  e.addListener = r, e.setText = "textContent" in document.body ? function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].textContent = e
  } : function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].innerText = e
  };
  var o, i, a, s = function(t, e) {
      for (var n = (t || "").replace(/^\s+|\s+$/g, "").split(/\s+/), r = [], o = {}, i = 0, a = n.length; i < a; i++) {
          var s = n[i];
          o[s] || s === e || (r.push(s), o[s] = 1)
      }
      return r
  };
  "classList" in document.body ? (o = function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].classList.add(e);
      return t
  }, i = function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].classList.remove(e);
      return t
  }, a = function(t, e) {
      return t.classList.contains(e)
  }) : (o = function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].className = s(t[r].className + " " + e).join(" ");
      return t
  }, i = function(t, e) {
      t = n(t);
      for (var r = 0; r < t.length; r++) t[r].className = s(t[r].className, e).join(" ")
  }, a = function(t, e) {
      for (var n = s(t.className), r = n.length; r--;)
          if (n[r] === e) return !0;
      return !1
  }), e.addClass = o, e.removeClass = i, e.hasClass = a
}, function(t, e) {
  var n = function(t, e, n, r) {
      try {
          ga("send", "event", t, e, n, r)
      } catch (t) {}
  };
  t.exports = function(t) {
      return {
          loadPage: function() {
              var e = document.body.getAttribute("data-abtest");
              n(t, "Load page", e || "", {
                  nonInteraction: !0
              })
          },
          loadPageSignedIn: function() {
              n(t, "Signed In Load page")
          },
          loadPlaybackStrategy: function(e) {
              n(t, "Load playback strategy", e, {
                  nonInteraction: !0
              })
          },
          showModal: function(e) {
              n(t, "Show modal", e)
          },
          dismissModal: function(e) {
              n(t, "Dismiss modal", e)
          },
          showUpsellModal: function(e) {
              n(t, "Show upsell modal", e)
          },
          dismissUpsellModal: function(e) {
              n(t, "Dismiss upsell modal", e)
          },
          goToWww: function(e) {
              n(t, "Go to WWW", e)
          },
          goToSignupWww: function(e) {
              n(t, "Go to signup in WWW", e)
          },
          goToDownloadWww: function(e) {
              n(t, "Go to download in WWW", e)
          },
          goToDownloadAppStore: function(e) {
              n(t, "Go to download in App Store", e)
          },
          play30sPreview: function(e) {
              n(t, "Play 30s preview", e)
          },
          playInDesktopApp: function(e) {
              n(t, "Play in desktop app", e)
          },
          playInMobileApp: function(e) {
              n(t, "Play in mobile app", e)
          },
          playInWebPlayer: function(e) {
              n(t, "Play in Web Player", e)
          },
          sendSMS: function() {
              n(t, "SMS send")
          },
          sendSMSError: function(e) {
              n(t, "SMS send error", e)
          },
          skipPrev: function(e) {
              n(t, "Skip previous", e)
          },
          skipNext: function(e) {
              n(t, "Skip next", e)
          }
      }
  }
}, function(t, e, n) {
  "use strict";

  function r(t) {
      this._env = t
  }
  t.exports = r, r.prototype.launch = function(t) {
      t += (t.indexOf("?") > -1 ? "&" + location.search.substring(1) : location.search).replace(/\|/g, "%7C"), t = this._removeUrlParam(t, "fo"), t = this._removeUrlParam(t, "noredir"), this._launchIFrame(t)
  }, r.prototype._getSpotifyHref = function(t) {
      var e = t.split("?").length,
          n = t.split("?").shift(),
          r = e > 1 ? t.split("?").pop() : null,
          o = n.split(":").slice(1),
          i = this._env;
      return "album" === i.context.type && i.context.track && o.splice(o.length - 1, 0, "play"), "spotify://" + o.join("/") + (null !== r ? "?" + r : "")
  }, r.prototype._launchIFrame = function(t) {
      var e = this._env;
      if (e.isMobile) {
          window.platform = e.platform;
          var n = this._getSpotifyHref(t);
          window.functionalTesting = {
              locationHref: n
          }, "test" !== e.environment && (location.href = n)
      } else {
          var r = document.createElement("iframe");
          r.style.display = "none", r.src = t, document.body.appendChild(r)
      }
  }, r.prototype._removeUrlParam = function(t, e) {
      var n = t.split("?");
      if (n.length >= 2) {
          for (var r = encodeURIComponent(e) + "=", o = n[1].split(/[&;]/g), i = o.length; i-- > 0;) - 1 !== o[i].lastIndexOf(r, 0) && o.splice(i, 1);
          t = n[0] + (o.length > 0 ? "?" + o.join("&") : "")
      }
      return t
  }
}, , function(t, e, n) {
  n(35), n(39), n(20), n(34);
  var r = n(37),
      o = n(0),
      i = n(22),
      a = n(38),
      s = n(23),
      c = n(15),
      u = window.SpotifyEnvironment,
      l = n(5),
      f = new l(u);
  a.init({
      immediate: !0,
      classLoaded: "lazy-image_loaded"
  }), "ontouchstart" in document.documentElement || document.documentElement.classList.add("no-touch"), document.body.addEventListener("keyup", function(t) {
      9 === t.which && document.documentElement.classList.remove("no-focus-outline")
  });
  var p = r.createStore(n(21)(i(Spotify.Entity), {
      hasSpotify: f.hasSpotify(),
      isMobile: f.isMobile,
      isChromebook: f.isChromebook,
      coverArtPlaysPreview: f.coverArtPlaysPreview,
      context: f.context
  }), r.compose(r.applyMiddleware(n(18), n(19), n(17)), window.devToolsExtension ? window.devToolsExtension() : function(t) {
      return t
  }));
  n(30)({
      onClose: a.reload,
      cookieNotice: c
  }), n(27)(), n(28)(p, document.querySelector(".js-choice-modal")), n(33)(p, document.querySelector(".js-upsell-modal")), n(26)(p), n(25)(p), n(32)(p, document.querySelector(".js-track-list")), n(29)(p, document.querySelector(".js-cover-art"), {
      coverArtPlaysPreview: f.coverArtPlaysPreview
  }), n(31)(document.body, {
      onExpanded: a.reload
  }), document.querySelectorAll(".playable-context").length && s().then(function(t) {
      switch (console.log("Initializing playback strategy", t), p.dispatch(o.switchPlaybackStrategy(t.type)), t.type) {
          case "preview":
          case "webplayer":
          case "mobileapp":
              n(2)(p).subscribe();
              break;
          case "remote":
              n(24)(t.data.remoteStatus, t.data.remoteControl, p)
      }
  })
}, function(t, e, n) {
  var r = n(12).raf,
      o = function(t, e, n, r) {
          return (t /= r / 2) < 1 ? n / 2 * t * t + e : (t--, -n / 2 * (t * (t - 2) - 1) + e)
      },
      i = function() {
          return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      },
      a = function(t, e) {
          var n = document.body,
              a = document.documentElement,
              s = Math.max(n.scrollHeight, n.offsetHeight, a.clientHeight, a.scrollHeight, a.offsetHeight),
              c = window.innerHeight,
              u = Math.min(t, s - c),
              l = i(),
              f = u - l,
              p = +new Date,
              d = !0,
              h = null,
              y = function() {
                  if (d) {
                      r(y);
                      var t = +new Date,
                          n = Math.floor(o(t - p, l, f, e));
                      h ? Math.abs(h - i()) < 2 ? (h = n, window.scrollTo(0, n)) : d = !1 : (h = n, window.scrollTo(0, n)), t > p + e && (window.scrollTo(0, u), d = !1)
                  }
              };
          r(y)
      };
  t.exports = a
}, function(t, e, n) {
  "use strict";

  function r(t) {
      return null == t ? void 0 === t ? c : s : u && u in Object(t) ? n.i(i.a)(t) : n.i(a.a)(t)
  }
  var o = n(7),
      i = n(49),
      a = n(50),
      s = "[object Null]",
      c = "[object Undefined]",
      u = o.a ? o.a.toStringTag : void 0;
  e.a = r
}, function(t, e, n) {
  "use strict";
  (function(t) {
      var n = "object" == typeof t && t && t.Object === Object && t;
      e.a = n
  }).call(e, n(4))
}, function(t, e, n) {
  "use strict";
  var r = n(51),
      o = n.i(r.a)(Object.getPrototypeOf, Object);
  e.a = o
}, function(t, e, n) {
  "use strict";

  function r(t) {
      var e = a.call(t, c),
          n = t[c];
      try {
          t[c] = void 0;
          var r = !0
      } catch (t) {}
      var o = s.call(t);
      return r && (e ? t[c] = n : delete t[c]), o
  }
  var o = n(7),
      i = Object.prototype,
      a = i.hasOwnProperty,
      s = i.toString,
      c = o.a ? o.a.toStringTag : void 0;
  e.a = r
}, function(t, e, n) {
  "use strict";

  function r(t) {
      return i.call(t)
  }
  var o = Object.prototype,
      i = o.toString;
  e.a = r
}, function(t, e, n) {
  "use strict";

  function r(t, e) {
      return function(n) {
          return t(e(n))
      }
  }
  e.a = r
}, function(t, e, n) {
  "use strict";
  var r = n(47),
      o = "object" == typeof self && self && self.Object === Object && self,
      i = r.a || o || Function("return this")();
  e.a = i
}, function(t, e, n) {
  "use strict";

  function r(t) {
      return null != t && "object" == typeof t
  }
  e.a = r
}, function(t, e) {
  function n() {
      throw new Error("setTimeout has not been defined")
  }

  function r() {
      throw new Error("clearTimeout has not been defined")
  }

  function o(t) {
      if (l === setTimeout) return setTimeout(t, 0);
      if ((l === n || !l) && setTimeout) return l = setTimeout, setTimeout(t, 0);
      try {
          return l(t, 0)
      } catch (e) {
          try {
              return l.call(null, t, 0)
          } catch (e) {
              return l.call(this, t, 0)
          }
      }
  }

  function i(t) {
      if (f === clearTimeout) return clearTimeout(t);
      if ((f === r || !f) && clearTimeout) return f = clearTimeout, clearTimeout(t);
      try {
          return f(t)
      } catch (e) {
          try {
              return f.call(null, t)
          } catch (e) {
              return f.call(this, t)
          }
      }
  }

  function a() {
      y && d && (y = !1, d.length ? h = d.concat(h) : v = -1, h.length && s())
  }

  function s() {
      if (!y) {
          var t = o(a);
          y = !0;
          for (var e = h.length; e;) {
              for (d = h, h = []; ++v < e;) d && d[v].run();
              v = -1, e = h.length
          }
          d = null, y = !1, i(t)
      }
  }

  function c(t, e) {
      this.fun = t, this.array = e
  }

  function u() {}
  var l, f, p = t.exports = {};
  ! function() {
      try {
          l = "function" == typeof setTimeout ? setTimeout : n
      } catch (t) {
          l = n
      }
      try {
          f = "function" == typeof clearTimeout ? clearTimeout : r
      } catch (t) {
          f = r
      }
  }();
  var d, h = [],
      y = !1,
      v = -1;
  p.nextTick = function(t) {
      var e = new Array(arguments.length - 1);
      if (arguments.length > 1)
          for (var n = 1; n < arguments.length; n++) e[n - 1] = arguments[n];
      h.push(new c(t, e)), 1 !== h.length || y || o(s)
  }, c.prototype.run = function() {
      this.fun.apply(null, this.array)
  }, p.title = "browser", p.browser = !0, p.env = {}, p.argv = [], p.version = "", p.versions = {}, p.on = u, p.addListener = u, p.once = u, p.off = u, p.removeListener = u, p.removeAllListeners = u, p.emit = u, p.binding = function(t) {
      throw new Error("process.binding is not supported")
  }, p.cwd = function() {
      return "/"
  }, p.chdir = function(t) {
      throw new Error("process.chdir is not supported")
  }, p.umask = function() {
      return 0
  }
}, function(t, e, n) {
  "use strict";

  function r() {
      for (var t = arguments.length, e = Array(t), n = 0; n < t; n++) e[n] = arguments[n];
      return function(t) {
          return function(n, r, a) {
              var s = t(n, r, a),
                  c = s.dispatch,
                  u = [],
                  l = {
                      getState: s.getState,
                      dispatch: function(t) {
                          return c(t)
                      }
                  };
              return u = e.map(function(t) {
                  return t(l)
              }), c = o.a.apply(void 0, u)(s.dispatch), i({}, s, {
                  dispatch: c
              })
          }
      }
  }
  e.a = r;
  var o = n(9),
      i = Object.assign || function(t) {
          for (var e = 1; e < arguments.length; e++) {
              var n = arguments[e];
              for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
          }
          return t
      }
}, function(t, e, n) {
  "use strict";

  function r(t, e) {
      return function() {
          return e(t.apply(void 0, arguments))
      }
  }

  function o(t, e) {
      if ("function" == typeof t) return r(t, e);
      if ("object" != typeof t || null === t) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === t ? "null" : typeof t) + '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
      for (var n = Object.keys(t), o = {}, i = 0; i < n.length; i++) {
          var a = n[i],
              s = t[a];
          "function" == typeof s && (o[a] = r(s, e))
      }
      return o
  }
  e.a = o
}, function(t, e, n) {
  "use strict";

  function r(t, e) {
      var n = e && e.type;
      return "Given action " + (n && '"' + n.toString() + '"' || "an action") + ', reducer "' + t + '" returned undefined. To ignore an action, you must explicitly return the previous state.'
  }

  function o(t) {
      Object.keys(t).forEach(function(e) {
          var n = t[e];
          if (void 0 === n(void 0, {
                  type: a.b.INIT
              })) throw new Error('Reducer "' + e + '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.');
          if (void 0 === n(void 0, {
                  type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
              })) throw new Error('Reducer "' + e + "\" returned undefined when probed with a random type. Don't try to handle " + a.b.INIT + ' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined.')
      })
  }

  function i(t) {
      for (var e = Object.keys(t), n = {}, i = 0; i < e.length; i++) {
          var a = e[i];
          "function" == typeof t[a] && (n[a] = t[a])
      }
      var s, c = Object.keys(n);
      try {
          o(n)
      } catch (t) {
          s = t
      }
      return function() {
          var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0],
              e = arguments[1];
          if (s) throw s;
          for (var o = !1, i = {}, a = 0; a < c.length; a++) {
              var u = c[a],
                  l = n[u],
                  f = t[u],
                  p = l(f, e);
              if (void 0 === p) {
                  var d = r(u, e);
                  throw new Error(d)
              }
              i[u] = p, o = o || p !== f
          }
          return o ? i : t
      }
  }
  e.a = i;
  var a = n(10);
  n(8), n(11)
}, function(t, e, n) {
  t.exports = n(59)
}, function(t, e, n) {
  "use strict";
  (function(t, r) {
      Object.defineProperty(e, "__esModule", {
          value: !0
      });
      var o, i = n(60),
          a = function(t) {
              return t && t.__esModule ? t : {
                  default: t
              }
          }(i);
      o = "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : r;
      var s = (0, a.default)(o);
      e.default = s
  }).call(e, n(4), n(14)(t))
}, function(t, e, n) {
  "use strict";

  function r(t) {
      var e, n = t.Symbol;
      return "function" == typeof n ? n.observable ? e = n.observable : (e = n("observable"), n.observable = e) : e = "@@observable", e
  }
  Object.defineProperty(e, "__esModule", {
      value: !0
  }), e.default = r
}, function(t, e) {
  function n() {}
  n.prototype = {
      on: function(t, e, n) {
          var r = this.e || (this.e = {});
          return (r[t] || (r[t] = [])).push({
              fn: e,
              ctx: n
          }), this
      },
      once: function(t, e, n) {
          function r() {
              o.off(t, r), e.apply(n, arguments)
          }
          var o = this;
          return r._ = e, this.on(t, r, n)
      },
      emit: function(t) {
          var e = [].slice.call(arguments, 1),
              n = ((this.e || (this.e = {}))[t] || []).slice(),
              r = 0,
              o = n.length;
          for (r; r < o; r++) n[r].fn.apply(n[r].ctx, e);
          return this
      },
      off: function(t, e) {
          var n = this.e || (this.e = {}),
              r = n[t],
              o = [];
          if (r && e)
              for (var i = 0, a = r.length; i < a; i++) r[i].fn !== e && r[i].fn._ !== e && o.push(r[i]);
          return o.length ? n[t] = o : delete n[t], this
      }
  }, t.exports = n
}, function(t, e) {}]);