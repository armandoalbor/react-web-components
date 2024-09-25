import hf from "react";
var m0 = { exports: {} }, ya = {}, Nm = { exports: {} }, d0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function Zb() {
  return eT || (eT = 1, function(A) {
    function J(Q, Ce) {
      var re = Q.length;
      Q.push(Ce);
      e: for (; 0 < re; ) {
        var tt = re - 1 >>> 1, it = Q[tt];
        if (0 < Lt(it, Ce)) Q[tt] = Ce, Q[re] = it, re = tt;
        else break e;
      }
    }
    function M(Q) {
      return Q.length === 0 ? null : Q[0];
    }
    function et(Q) {
      if (Q.length === 0) return null;
      var Ce = Q[0], re = Q.pop();
      if (re !== Ce) {
        Q[0] = re;
        e: for (var tt = 0, it = Q.length, wn = it >>> 1; tt < wn; ) {
          var Kn = 2 * (tt + 1) - 1, za = Q[Kn], rn = Kn + 1, Ir = Q[rn];
          if (0 > Lt(za, re)) rn < it && 0 > Lt(Ir, za) ? (Q[tt] = Ir, Q[rn] = re, tt = rn) : (Q[tt] = za, Q[Kn] = re, tt = Kn);
          else if (rn < it && 0 > Lt(Ir, re)) Q[tt] = Ir, Q[rn] = re, tt = rn;
          else break e;
        }
      }
      return Ce;
    }
    function Lt(Q, Ce) {
      var re = Q.sortIndex - Ce.sortIndex;
      return re !== 0 ? re : Q.id - Ce.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var Ge = performance;
      A.unstable_now = function() {
        return Ge.now();
      };
    } else {
      var g = Date, pt = g.now();
      A.unstable_now = function() {
        return g.now() - pt;
      };
    }
    var ce = [], le = [], Ke = 1, Y = null, K = 3, ne = !1, we = !1, Ue = !1, Pe = typeof setTimeout == "function" ? setTimeout : null, Vt = typeof clearTimeout == "function" ? clearTimeout : null, Je = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Be(Q) {
      for (var Ce = M(le); Ce !== null; ) {
        if (Ce.callback === null) et(le);
        else if (Ce.startTime <= Q) et(le), Ce.sortIndex = Ce.expirationTime, J(ce, Ce);
        else break;
        Ce = M(le);
      }
    }
    function gt(Q) {
      if (Ue = !1, Be(Q), !we) if (M(ce) !== null) we = !0, wt($e);
      else {
        var Ce = M(le);
        Ce !== null && qn(gt, Ce.startTime - Q);
      }
    }
    function $e(Q, Ce) {
      we = !1, Ue && (Ue = !1, Vt(Rn), Rn = -1), ne = !0;
      var re = K;
      try {
        for (Be(Ce), Y = M(ce); Y !== null && (!(Y.expirationTime > Ce) || Q && !vt()); ) {
          var tt = Y.callback;
          if (typeof tt == "function") {
            Y.callback = null, K = Y.priorityLevel;
            var it = tt(Y.expirationTime <= Ce);
            Ce = A.unstable_now(), typeof it == "function" ? Y.callback = it : Y === M(ce) && et(ce), Be(Ce);
          } else et(ce);
          Y = M(ce);
        }
        if (Y !== null) var wn = !0;
        else {
          var Kn = M(le);
          Kn !== null && qn(gt, Kn.startTime - Ce), wn = !1;
        }
        return wn;
      } finally {
        Y = null, K = re, ne = !1;
      }
    }
    var xt = !1, Ae = null, Rn = -1, jn = 5, Bt = -1;
    function vt() {
      return !(A.unstable_now() - Bt < jn);
    }
    function xn() {
      if (Ae !== null) {
        var Q = A.unstable_now();
        Bt = Q;
        var Ce = !0;
        try {
          Ce = Ae(!0, Q);
        } finally {
          Ce ? _e() : (xt = !1, Ae = null);
        }
      } else xt = !1;
    }
    var _e;
    if (typeof Je == "function") _e = function() {
      Je(xn);
    };
    else if (typeof MessageChannel < "u") {
      var Ie = new MessageChannel(), dn = Ie.port2;
      Ie.port1.onmessage = xn, _e = function() {
        dn.postMessage(null);
      };
    } else _e = function() {
      Pe(xn, 0);
    };
    function wt(Q) {
      Ae = Q, xt || (xt = !0, _e());
    }
    function qn(Q, Ce) {
      Rn = Pe(function() {
        Q(A.unstable_now());
      }, Ce);
    }
    A.unstable_IdlePriority = 5, A.unstable_ImmediatePriority = 1, A.unstable_LowPriority = 4, A.unstable_NormalPriority = 3, A.unstable_Profiling = null, A.unstable_UserBlockingPriority = 2, A.unstable_cancelCallback = function(Q) {
      Q.callback = null;
    }, A.unstable_continueExecution = function() {
      we || ne || (we = !0, wt($e));
    }, A.unstable_forceFrameRate = function(Q) {
      0 > Q || 125 < Q ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : jn = 0 < Q ? Math.floor(1e3 / Q) : 5;
    }, A.unstable_getCurrentPriorityLevel = function() {
      return K;
    }, A.unstable_getFirstCallbackNode = function() {
      return M(ce);
    }, A.unstable_next = function(Q) {
      switch (K) {
        case 1:
        case 2:
        case 3:
          var Ce = 3;
          break;
        default:
          Ce = K;
      }
      var re = K;
      K = Ce;
      try {
        return Q();
      } finally {
        K = re;
      }
    }, A.unstable_pauseExecution = function() {
    }, A.unstable_requestPaint = function() {
    }, A.unstable_runWithPriority = function(Q, Ce) {
      switch (Q) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          Q = 3;
      }
      var re = K;
      K = Q;
      try {
        return Ce();
      } finally {
        K = re;
      }
    }, A.unstable_scheduleCallback = function(Q, Ce, re) {
      var tt = A.unstable_now();
      switch (typeof re == "object" && re !== null ? (re = re.delay, re = typeof re == "number" && 0 < re ? tt + re : tt) : re = tt, Q) {
        case 1:
          var it = -1;
          break;
        case 2:
          it = 250;
          break;
        case 5:
          it = 1073741823;
          break;
        case 4:
          it = 1e4;
          break;
        default:
          it = 5e3;
      }
      return it = re + it, Q = { id: Ke++, callback: Ce, priorityLevel: Q, startTime: re, expirationTime: it, sortIndex: -1 }, re > tt ? (Q.sortIndex = re, J(le, Q), M(ce) === null && Q === M(le) && (Ue ? (Vt(Rn), Rn = -1) : Ue = !0, qn(gt, re - tt))) : (Q.sortIndex = it, J(ce, Q), we || ne || (we = !0, wt($e))), Q;
    }, A.unstable_shouldYield = vt, A.unstable_wrapCallback = function(Q) {
      var Ce = K;
      return function() {
        var re = K;
        K = Ce;
        try {
          return Q.apply(this, arguments);
        } finally {
          K = re;
        }
      };
    };
  }(d0)), d0;
}
var p0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var tT;
function Jb() {
  return tT || (tT = 1, function(A) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var J = !1, M = !1, et = 5;
      function Lt(X, ge) {
        var He = X.length;
        X.push(ge), pt(X, ge, He);
      }
      function Ge(X) {
        return X.length === 0 ? null : X[0];
      }
      function g(X) {
        if (X.length === 0)
          return null;
        var ge = X[0], He = X.pop();
        return He !== ge && (X[0] = He, ce(X, He, 0)), ge;
      }
      function pt(X, ge, He) {
        for (var ct = He; ct > 0; ) {
          var Ut = ct - 1 >>> 1, vn = X[Ut];
          if (le(vn, ge) > 0)
            X[Ut] = ge, X[ct] = vn, ct = Ut;
          else
            return;
        }
      }
      function ce(X, ge, He) {
        for (var ct = He, Ut = X.length, vn = Ut >>> 1; ct < vn; ) {
          var It = (ct + 1) * 2 - 1, cr = X[It], Ct = It + 1, Lr = X[Ct];
          if (le(cr, ge) < 0)
            Ct < Ut && le(Lr, cr) < 0 ? (X[ct] = Lr, X[Ct] = ge, ct = Ct) : (X[ct] = cr, X[It] = ge, ct = It);
          else if (Ct < Ut && le(Lr, ge) < 0)
            X[ct] = Lr, X[Ct] = ge, ct = Ct;
          else
            return;
        }
      }
      function le(X, ge) {
        var He = X.sortIndex - ge.sortIndex;
        return He !== 0 ? He : X.id - ge.id;
      }
      var Ke = 1, Y = 2, K = 3, ne = 4, we = 5;
      function Ue(X, ge) {
      }
      var Pe = typeof performance == "object" && typeof performance.now == "function";
      if (Pe) {
        var Vt = performance;
        A.unstable_now = function() {
          return Vt.now();
        };
      } else {
        var Je = Date, Be = Je.now();
        A.unstable_now = function() {
          return Je.now() - Be;
        };
      }
      var gt = 1073741823, $e = -1, xt = 250, Ae = 5e3, Rn = 1e4, jn = gt, Bt = [], vt = [], xn = 1, _e = null, Ie = K, dn = !1, wt = !1, qn = !1, Q = typeof setTimeout == "function" ? setTimeout : null, Ce = typeof clearTimeout == "function" ? clearTimeout : null, re = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function tt(X) {
        for (var ge = Ge(vt); ge !== null; ) {
          if (ge.callback === null)
            g(vt);
          else if (ge.startTime <= X)
            g(vt), ge.sortIndex = ge.expirationTime, Lt(Bt, ge);
          else
            return;
          ge = Ge(vt);
        }
      }
      function it(X) {
        if (qn = !1, tt(X), !wt)
          if (Ge(Bt) !== null)
            wt = !0, Ca(wn);
          else {
            var ge = Ge(vt);
            ge !== null && Kt(it, ge.startTime - X);
          }
      }
      function wn(X, ge) {
        wt = !1, qn && (qn = !1, Or()), dn = !0;
        var He = Ie;
        try {
          var ct;
          if (!M) return Kn(X, ge);
        } finally {
          _e = null, Ie = He, dn = !1;
        }
      }
      function Kn(X, ge) {
        var He = ge;
        for (tt(He), _e = Ge(Bt); _e !== null && !J && !(_e.expirationTime > He && (!X || Sa())); ) {
          var ct = _e.callback;
          if (typeof ct == "function") {
            _e.callback = null, Ie = _e.priorityLevel;
            var Ut = _e.expirationTime <= He, vn = ct(Ut);
            He = A.unstable_now(), typeof vn == "function" ? _e.callback = vn : _e === Ge(Bt) && g(Bt), tt(He);
          } else
            g(Bt);
          _e = Ge(Bt);
        }
        if (_e !== null)
          return !0;
        var It = Ge(vt);
        return It !== null && Kt(it, It.startTime - He), !1;
      }
      function za(X, ge) {
        switch (X) {
          case Ke:
          case Y:
          case K:
          case ne:
          case we:
            break;
          default:
            X = K;
        }
        var He = Ie;
        Ie = X;
        try {
          return ge();
        } finally {
          Ie = He;
        }
      }
      function rn(X) {
        var ge;
        switch (Ie) {
          case Ke:
          case Y:
          case K:
            ge = K;
            break;
          default:
            ge = Ie;
            break;
        }
        var He = Ie;
        Ie = ge;
        try {
          return X();
        } finally {
          Ie = He;
        }
      }
      function Ir(X) {
        var ge = Ie;
        return function() {
          var He = Ie;
          Ie = ge;
          try {
            return X.apply(this, arguments);
          } finally {
            Ie = He;
          }
        };
      }
      function Vn(X, ge, He) {
        var ct = A.unstable_now(), Ut;
        if (typeof He == "object" && He !== null) {
          var vn = He.delay;
          typeof vn == "number" && vn > 0 ? Ut = ct + vn : Ut = ct;
        } else
          Ut = ct;
        var It;
        switch (X) {
          case Ke:
            It = $e;
            break;
          case Y:
            It = xt;
            break;
          case we:
            It = jn;
            break;
          case ne:
            It = Rn;
            break;
          case K:
          default:
            It = Ae;
            break;
        }
        var cr = Ut + It, Ct = {
          id: xn++,
          callback: ge,
          priorityLevel: X,
          startTime: Ut,
          expirationTime: cr,
          sortIndex: -1
        };
        return Ut > ct ? (Ct.sortIndex = Ut, Lt(vt, Ct), Ge(Bt) === null && Ct === Ge(vt) && (qn ? Or() : qn = !0, Kt(it, Ut - ct))) : (Ct.sortIndex = cr, Lt(Bt, Ct), !wt && !dn && (wt = !0, Ca(wn))), Ct;
      }
      function or() {
      }
      function Ua() {
        !wt && !dn && (wt = !0, Ca(wn));
      }
      function sr() {
        return Ge(Bt);
      }
      function Wr(X) {
        X.callback = null;
      }
      function pn() {
        return Ie;
      }
      var Bn = !1, Dn = null, bn = -1, Pn = et, Gr = -1;
      function Sa() {
        var X = A.unstable_now() - Gr;
        return !(X < Pn);
      }
      function ei() {
      }
      function Aa(X) {
        if (X < 0 || X > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        X > 0 ? Pn = Math.floor(1e3 / X) : Pn = et;
      }
      var Ea = function() {
        if (Dn !== null) {
          var X = A.unstable_now();
          Gr = X;
          var ge = !0, He = !0;
          try {
            He = Dn(ge, X);
          } finally {
            He ? kr() : (Bn = !1, Dn = null);
          }
        } else
          Bn = !1;
      }, kr;
      if (typeof re == "function")
        kr = function() {
          re(Ea);
        };
      else if (typeof MessageChannel < "u") {
        var Ha = new MessageChannel(), _r = Ha.port2;
        Ha.port1.onmessage = Ea, kr = function() {
          _r.postMessage(null);
        };
      } else
        kr = function() {
          Q(Ea, 0);
        };
      function Ca(X) {
        Dn = X, Bn || (Bn = !0, kr());
      }
      function Kt(X, ge) {
        bn = Q(function() {
          X(A.unstable_now());
        }, ge);
      }
      function Or() {
        Ce(bn), bn = -1;
      }
      var ki = ei, Ta = null;
      A.unstable_IdlePriority = we, A.unstable_ImmediatePriority = Ke, A.unstable_LowPriority = ne, A.unstable_NormalPriority = K, A.unstable_Profiling = Ta, A.unstable_UserBlockingPriority = Y, A.unstable_cancelCallback = Wr, A.unstable_continueExecution = Ua, A.unstable_forceFrameRate = Aa, A.unstable_getCurrentPriorityLevel = pn, A.unstable_getFirstCallbackNode = sr, A.unstable_next = rn, A.unstable_pauseExecution = or, A.unstable_requestPaint = ki, A.unstable_runWithPriority = za, A.unstable_scheduleCallback = Vn, A.unstable_shouldYield = Sa, A.unstable_wrapCallback = Ir, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(p0)), p0;
}
var nT;
function oT() {
  return nT || (nT = 1, process.env.NODE_ENV === "production" ? Nm.exports = Zb() : Nm.exports = Jb()), Nm.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rT;
function ek() {
  if (rT) return ya;
  rT = 1;
  var A = hf, J = oT();
  function M(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var et = /* @__PURE__ */ new Set(), Lt = {};
  function Ge(n, r) {
    g(n, r), g(n + "Capture", r);
  }
  function g(n, r) {
    for (Lt[n] = r, n = 0; n < r.length; n++) et.add(r[n]);
  }
  var pt = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ce = Object.prototype.hasOwnProperty, le = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, Ke = {}, Y = {};
  function K(n) {
    return ce.call(Y, n) ? !0 : ce.call(Ke, n) ? !1 : le.test(n) ? Y[n] = !0 : (Ke[n] = !0, !1);
  }
  function ne(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function we(n, r, l, o) {
    if (r === null || typeof r > "u" || ne(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function Ue(n, r, l, o, c, d, h) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = h;
  }
  var Pe = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    Pe[n] = new Ue(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    Pe[r] = new Ue(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    Pe[n] = new Ue(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    Pe[n] = new Ue(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    Pe[n] = new Ue(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    Pe[n] = new Ue(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    Pe[n] = new Ue(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    Pe[n] = new Ue(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    Pe[n] = new Ue(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var Vt = /[\-:]([a-z])/g;
  function Je(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      Vt,
      Je
    );
    Pe[r] = new Ue(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(Vt, Je);
    Pe[r] = new Ue(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(Vt, Je);
    Pe[r] = new Ue(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    Pe[n] = new Ue(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), Pe.xlinkHref = new Ue("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    Pe[n] = new Ue(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Be(n, r, l, o) {
    var c = Pe.hasOwnProperty(r) ? Pe[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (we(r, l, c, o) && (l = null), o || c === null ? K(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var gt = A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $e = Symbol.for("react.element"), xt = Symbol.for("react.portal"), Ae = Symbol.for("react.fragment"), Rn = Symbol.for("react.strict_mode"), jn = Symbol.for("react.profiler"), Bt = Symbol.for("react.provider"), vt = Symbol.for("react.context"), xn = Symbol.for("react.forward_ref"), _e = Symbol.for("react.suspense"), Ie = Symbol.for("react.suspense_list"), dn = Symbol.for("react.memo"), wt = Symbol.for("react.lazy"), qn = Symbol.for("react.offscreen"), Q = Symbol.iterator;
  function Ce(n) {
    return n === null || typeof n != "object" ? null : (n = Q && n[Q] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var re = Object.assign, tt;
  function it(n) {
    if (tt === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      tt = r && r[1] || "";
    }
    return `
` + tt + n;
  }
  var wn = !1;
  function Kn(n, r) {
    if (!n || wn) return "";
    wn = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (O) {
          var o = O;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (O) {
          o = O;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (O) {
          o = O;
        }
        n();
      }
    } catch (O) {
      if (O && o && typeof O.stack == "string") {
        for (var c = O.stack.split(`
`), d = o.stack.split(`
`), h = c.length - 1, S = d.length - 1; 1 <= h && 0 <= S && c[h] !== d[S]; ) S--;
        for (; 1 <= h && 0 <= S; h--, S--) if (c[h] !== d[S]) {
          if (h !== 1 || S !== 1)
            do
              if (h--, S--, 0 > S || c[h] !== d[S]) {
                var C = `
` + c[h].replace(" at new ", " at ");
                return n.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", n.displayName)), C;
              }
            while (1 <= h && 0 <= S);
          break;
        }
      }
    } finally {
      wn = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? it(n) : "";
  }
  function za(n) {
    switch (n.tag) {
      case 5:
        return it(n.type);
      case 16:
        return it("Lazy");
      case 13:
        return it("Suspense");
      case 19:
        return it("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Kn(n.type, !1), n;
      case 11:
        return n = Kn(n.type.render, !1), n;
      case 1:
        return n = Kn(n.type, !0), n;
      default:
        return "";
    }
  }
  function rn(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Ae:
        return "Fragment";
      case xt:
        return "Portal";
      case jn:
        return "Profiler";
      case Rn:
        return "StrictMode";
      case _e:
        return "Suspense";
      case Ie:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case vt:
        return (n.displayName || "Context") + ".Consumer";
      case Bt:
        return (n._context.displayName || "Context") + ".Provider";
      case xn:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case dn:
        return r = n.displayName || null, r !== null ? r : rn(n.type) || "Memo";
      case wt:
        r = n._payload, n = n._init;
        try {
          return rn(n(r));
        } catch {
        }
    }
    return null;
  }
  function Ir(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return rn(r);
      case 8:
        return r === Rn ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function Vn(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function or(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Ua(n) {
    var r = or(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(h) {
        o = "" + h, d.call(this, h);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(h) {
        o = "" + h;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function sr(n) {
    n._valueTracker || (n._valueTracker = Ua(n));
  }
  function Wr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = or(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function pn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Bn(n, r) {
    var l = r.checked;
    return re({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Dn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = Vn(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function bn(n, r) {
    r = r.checked, r != null && Be(n, "checked", r, !1);
  }
  function Pn(n, r) {
    bn(n, r);
    var l = Vn(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? Sa(n, r.type, l) : r.hasOwnProperty("defaultValue") && Sa(n, r.type, Vn(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function Gr(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function Sa(n, r, l) {
    (r !== "number" || pn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var ei = Array.isArray;
  function Aa(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + Vn(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Ea(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(M(91));
    return re({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function kr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(M(92));
        if (ei(l)) {
          if (1 < l.length) throw Error(M(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: Vn(l) };
  }
  function Ha(n, r) {
    var l = Vn(r.value), o = Vn(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function _r(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Ca(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Kt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Ca(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Or, ki = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Or = Or || document.createElement("div"), Or.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Or.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Ta(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var X = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  }, ge = ["Webkit", "ms", "Moz", "O"];
  Object.keys(X).forEach(function(n) {
    ge.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), X[r] = X[n];
    });
  });
  function He(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || X.hasOwnProperty(n) && X[n] ? ("" + r).trim() : r + "px";
  }
  function ct(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = He(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var Ut = re({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function vn(n, r) {
    if (r) {
      if (Ut[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(M(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(M(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(M(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(M(62));
    }
  }
  function It(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var cr = null;
  function Ct(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Lr = null, St = null, Tt = null;
  function Gl(n) {
    if (n = bo(n)) {
      if (typeof Lr != "function") throw Error(M(280));
      var r = n.stateNode;
      r && (r = Se(r), Lr(n.stateNode, n.type, r));
    }
  }
  function il(n) {
    St ? Tt ? Tt.push(n) : Tt = [n] : St = n;
  }
  function Xl() {
    if (St) {
      var n = St, r = Tt;
      if (Tt = St = null, Gl(n), r) for (n = 0; n < r.length; n++) Gl(r[n]);
    }
  }
  function ao(n, r) {
    return n(r);
  }
  function ys() {
  }
  var ll = !1;
  function ql(n, r, l) {
    if (ll) return n(r, l);
    ll = !0;
    try {
      return ao(n, r, l);
    } finally {
      ll = !1, (St !== null || Tt !== null) && (ys(), Xl());
    }
  }
  function ul(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = Se(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(M(231, r, typeof l));
    return l;
  }
  var Kl = !1;
  if (pt) try {
    var Fa = {};
    Object.defineProperty(Fa, "passive", { get: function() {
      Kl = !0;
    } }), window.addEventListener("test", Fa, Fa), window.removeEventListener("test", Fa, Fa);
  } catch {
    Kl = !1;
  }
  function ti(n, r, l, o, c, d, h, S, C) {
    var O = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, O);
    } catch (j) {
      this.onError(j);
    }
  }
  var Mr = !1, Ra = null, _i = !1, ol = null, E = { onError: function(n) {
    Mr = !0, Ra = n;
  } };
  function V(n, r, l, o, c, d, h, S, C) {
    Mr = !1, Ra = null, ti.apply(E, arguments);
  }
  function I(n, r, l, o, c, d, h, S, C) {
    if (V.apply(this, arguments), Mr) {
      if (Mr) {
        var O = Ra;
        Mr = !1, Ra = null;
      } else throw Error(M(198));
      _i || (_i = !0, ol = O);
    }
  }
  function me(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function We(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Ze(n) {
    if (me(n) !== n) throw Error(M(188));
  }
  function xe(n) {
    var r = n.alternate;
    if (!r) {
      if (r = me(n), r === null) throw Error(M(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return Ze(c), n;
          if (d === o) return Ze(c), r;
          d = d.sibling;
        }
        throw Error(M(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var h = !1, S = c.child; S; ) {
          if (S === l) {
            h = !0, l = c, o = d;
            break;
          }
          if (S === o) {
            h = !0, o = c, l = d;
            break;
          }
          S = S.sibling;
        }
        if (!h) {
          for (S = d.child; S; ) {
            if (S === l) {
              h = !0, l = d, o = c;
              break;
            }
            if (S === o) {
              h = !0, o = d, l = c;
              break;
            }
            S = S.sibling;
          }
          if (!h) throw Error(M(189));
        }
      }
      if (l.alternate !== o) throw Error(M(190));
    }
    if (l.tag !== 3) throw Error(M(188));
    return l.stateNode.current === l ? n : r;
  }
  function Fe(n) {
    return n = xe(n), n !== null ? hn(n) : null;
  }
  function hn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = hn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var Dt = J.unstable_scheduleCallback, At = J.unstable_cancelCallback, fr = J.unstable_shouldYield, Oi = J.unstable_requestPaint, ut = J.unstable_now, $n = J.unstable_getCurrentPriorityLevel, Nr = J.unstable_ImmediatePriority, je = J.unstable_UserBlockingPriority, ja = J.unstable_NormalPriority, Op = J.unstable_LowPriority, mf = J.unstable_IdlePriority, io = null, xa = null;
  function Lp(n) {
    if (xa && typeof xa.onCommitFiberRoot == "function") try {
      xa.onCommitFiberRoot(io, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Xr = Math.clz32 ? Math.clz32 : Fm, Mp = Math.log, Np = Math.LN2;
  function Fm(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Mp(n) / Np | 0) | 0;
  }
  var gs = 64, Zl = 4194304;
  function sl(n) {
    switch (n & -n) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function wa(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, h = l & 268435455;
    if (h !== 0) {
      var S = h & ~c;
      S !== 0 ? o = sl(S) : (d &= h, d !== 0 && (o = sl(d)));
    } else h = l & ~c, h !== 0 ? o = sl(h) : d !== 0 && (o = sl(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - Xr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function yf(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return r + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function Ss(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var h = 31 - Xr(d), S = 1 << h, C = c[h];
      C === -1 ? (!(S & l) || S & o) && (c[h] = yf(S, r)) : C <= r && (n.expiredLanes |= S), d &= ~S;
    }
  }
  function gf(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Es() {
    var n = gs;
    return gs <<= 1, !(gs & 4194240) && (gs = 64), n;
  }
  function Sf(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function cl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Xr(r), n[r] = l;
  }
  function jm(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Xr(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function lo(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Xr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var ft = 0;
  function Ef(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var zp, Cs, dt, Up, Cf, Me = !1, uo = [], Zt = null, qr = null, Kr = null, oo = /* @__PURE__ */ new Map(), an = /* @__PURE__ */ new Map(), ht = [], Vm = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Da(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Zt = null;
        break;
      case "dragenter":
      case "dragleave":
        qr = null;
        break;
      case "mouseover":
      case "mouseout":
        Kr = null;
        break;
      case "pointerover":
      case "pointerout":
        oo.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        an.delete(r.pointerId);
    }
  }
  function Yn(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = bo(r), r !== null && Cs(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Li(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Zt = Yn(Zt, n, r, l, o, c), !0;
      case "dragenter":
        return qr = Yn(qr, n, r, l, o, c), !0;
      case "mouseover":
        return Kr = Yn(Kr, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return oo.set(d, Yn(oo.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, an.set(d, Yn(an.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Ap(n) {
    var r = Jr(n.target);
    if (r !== null) {
      var l = me(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = We(l), r !== null) {
            n.blockedOn = r, Cf(n.priority, function() {
              dt(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function Jl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = xs(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        cr = o, l.target.dispatchEvent(o), cr = null;
      } else return r = bo(l), r !== null && Cs(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function Tf(n, r, l) {
    Jl(n) && l.delete(r);
  }
  function Hp() {
    Me = !1, Zt !== null && Jl(Zt) && (Zt = null), qr !== null && Jl(qr) && (qr = null), Kr !== null && Jl(Kr) && (Kr = null), oo.forEach(Tf), an.forEach(Tf);
  }
  function so(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Me || (Me = !0, J.unstable_scheduleCallback(J.unstable_NormalPriority, Hp)));
  }
  function co(n) {
    function r(c) {
      return so(c, n);
    }
    if (0 < uo.length) {
      so(uo[0], n);
      for (var l = 1; l < uo.length; l++) {
        var o = uo[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Zt !== null && so(Zt, n), qr !== null && so(qr, n), Kr !== null && so(Kr, n), oo.forEach(r), an.forEach(r), l = 0; l < ht.length; l++) o = ht[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < ht.length && (l = ht[0], l.blockedOn === null); ) Ap(l), l.blockedOn === null && ht.shift();
  }
  var eu = gt.ReactCurrentBatchConfig, fl = !0;
  function Fp(n, r, l, o) {
    var c = ft, d = eu.transition;
    eu.transition = null;
    try {
      ft = 1, Rs(n, r, l, o);
    } finally {
      ft = c, eu.transition = d;
    }
  }
  function Ts(n, r, l, o) {
    var c = ft, d = eu.transition;
    eu.transition = null;
    try {
      ft = 4, Rs(n, r, l, o);
    } finally {
      ft = c, eu.transition = d;
    }
  }
  function Rs(n, r, l, o) {
    if (fl) {
      var c = xs(n, r, l, o);
      if (c === null) As(n, r, o, fo, l), Da(n, o);
      else if (Li(c, n, r, l, o)) o.stopPropagation();
      else if (Da(n, o), r & 4 && -1 < Vm.indexOf(n)) {
        for (; c !== null; ) {
          var d = bo(c);
          if (d !== null && zp(d), d = xs(n, r, l, o), d === null && As(n, r, o, fo, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else As(n, r, o, null, l);
    }
  }
  var fo = null;
  function xs(n, r, l, o) {
    if (fo = null, n = Ct(o), n = Jr(n), n !== null) if (r = me(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = We(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return fo = n, null;
  }
  function Rf(n) {
    switch (n) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch ($n()) {
          case Nr:
            return 1;
          case je:
            return 4;
          case ja:
          case Op:
            return 16;
          case mf:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ni = null, po = null, vo = null;
  function xf() {
    if (vo) return vo;
    var n, r = po, l = r.length, o, c = "value" in ni ? ni.value : ni.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var h = l - n;
    for (o = 1; o <= h && r[l - o] === c[d - o]; o++) ;
    return vo = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function tu(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function ho() {
    return !0;
  }
  function jp() {
    return !1;
  }
  function zr(n) {
    function r(l, o, c, d, h) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = h, this.currentTarget = null;
      for (var S in n) n.hasOwnProperty(S) && (l = n[S], this[S] = l ? l(d) : d[S]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ho : jp, this.isPropagationStopped = jp, this;
    }
    return re(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ho);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ho);
    }, persist: function() {
    }, isPersistent: ho }), r;
  }
  var Mi = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ws = zr(Mi), nu = re({}, Mi, { view: 0, detail: 0 }), Vp = zr(nu), Ds, wf, mo, mn = re({}, nu, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: _f, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== mo && (mo && n.type === "mousemove" ? (Ds = n.screenX - mo.screenX, wf = n.screenY - mo.screenY) : wf = Ds = 0, mo = n), Ds);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : wf;
  } }), bs = zr(mn), Bp = re({}, mn, { dataTransfer: 0 }), Pp = zr(Bp), Bm = re({}, nu, { relatedTarget: 0 }), Ni = zr(Bm), Df = re({}, Mi, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), $p = zr(Df), Pm = re({}, Mi, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), $m = zr(Pm), Ym = re({}, Mi, { data: 0 }), bf = zr(Ym), kf = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, Yp = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, Qp = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Ip(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Qp[n]) ? !!r[n] : !1;
  }
  function _f() {
    return Ip;
  }
  var ri = re({}, nu, { key: function(n) {
    if (n.key) {
      var r = kf[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = tu(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Yp[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: _f, charCode: function(n) {
    return n.type === "keypress" ? tu(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? tu(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Qm = zr(ri), Of = re({}, mn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), ks = zr(Of), Lf = re({}, nu, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: _f }), Im = zr(Lf), _s = re({}, Mi, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Wp = zr(_s), dr = re({}, mn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ai = zr(dr), Jt = [9, 13, 27, 32], ba = pt && "CompositionEvent" in window, dl = null;
  pt && "documentMode" in document && (dl = document.documentMode);
  var Os = pt && "TextEvent" in window && !dl, Gp = pt && (!ba || dl && 8 < dl && 11 >= dl), ru = " ", Xp = !1;
  function qp(n, r) {
    switch (n) {
      case "keyup":
        return Jt.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Ls(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var au = !1;
  function Wm(n, r) {
    switch (n) {
      case "compositionend":
        return Ls(r);
      case "keypress":
        return r.which !== 32 ? null : (Xp = !0, ru);
      case "textInput":
        return n = r.data, n === ru && Xp ? null : n;
      default:
        return null;
    }
  }
  function Gm(n, r) {
    if (au) return n === "compositionend" || !ba && qp(n, r) ? (n = xf(), vo = po = ni = null, au = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Gp && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Kp = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Zp(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Kp[n.type] : r === "textarea";
  }
  function Jp(n, r, l, o) {
    il(o), r = xo(r, "onChange"), 0 < r.length && (l = new ws("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var yo = null, iu = null;
  function lu(n) {
    Us(n, 0);
  }
  function uu(n) {
    var r = su(n);
    if (Wr(r)) return n;
  }
  function ev(n, r) {
    if (n === "change") return r;
  }
  var Mf = !1;
  if (pt) {
    var Nf;
    if (pt) {
      var zf = "oninput" in document;
      if (!zf) {
        var tv = document.createElement("div");
        tv.setAttribute("oninput", "return;"), zf = typeof tv.oninput == "function";
      }
      Nf = zf;
    } else Nf = !1;
    Mf = Nf && (!document.documentMode || 9 < document.documentMode);
  }
  function nv() {
    yo && (yo.detachEvent("onpropertychange", rv), iu = yo = null);
  }
  function rv(n) {
    if (n.propertyName === "value" && uu(iu)) {
      var r = [];
      Jp(r, iu, n, Ct(n)), ql(lu, r);
    }
  }
  function Xm(n, r, l) {
    n === "focusin" ? (nv(), yo = r, iu = l, yo.attachEvent("onpropertychange", rv)) : n === "focusout" && nv();
  }
  function qm(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return uu(iu);
  }
  function Km(n, r) {
    if (n === "click") return uu(r);
  }
  function av(n, r) {
    if (n === "input" || n === "change") return uu(r);
  }
  function Zm(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Zr = typeof Object.is == "function" ? Object.is : Zm;
  function go(n, r) {
    if (Zr(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!ce.call(r, c) || !Zr(n[c], r[c])) return !1;
    }
    return !0;
  }
  function iv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function lv(n, r) {
    var l = iv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = iv(l);
    }
  }
  function uv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? uv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Ms() {
    for (var n = window, r = pn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = pn(n.document);
    }
    return r;
  }
  function ii(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Ns(n) {
    var r = Ms(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && uv(l.ownerDocument.documentElement, l)) {
      if (o !== null && ii(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = lv(l, d);
          var h = lv(
            l,
            o
          );
          c && h && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== h.node || n.focusOffset !== h.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(h.node, h.offset)) : (r.setEnd(h.node, h.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var ov = pt && "documentMode" in document && 11 >= document.documentMode, ka = null, Uf = null, So = null, Af = !1;
  function sv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Af || ka == null || ka !== pn(o) || (o = ka, "selectionStart" in o && ii(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), So && go(So, o) || (So = o, o = xo(Uf, "onSelect"), 0 < o.length && (r = new ws("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = ka)));
  }
  function zs(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var pl = { animationend: zs("Animation", "AnimationEnd"), animationiteration: zs("Animation", "AnimationIteration"), animationstart: zs("Animation", "AnimationStart"), transitionend: zs("Transition", "TransitionEnd") }, Hf = {}, Ff = {};
  pt && (Ff = document.createElement("div").style, "AnimationEvent" in window || (delete pl.animationend.animation, delete pl.animationiteration.animation, delete pl.animationstart.animation), "TransitionEvent" in window || delete pl.transitionend.transition);
  function yn(n) {
    if (Hf[n]) return Hf[n];
    if (!pl[n]) return n;
    var r = pl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Ff) return Hf[n] = r[l];
    return n;
  }
  var jf = yn("animationend"), cv = yn("animationiteration"), fv = yn("animationstart"), dv = yn("transitionend"), pv = /* @__PURE__ */ new Map(), vv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function li(n, r) {
    pv.set(n, r), Ge(r, [n]);
  }
  for (var Eo = 0; Eo < vv.length; Eo++) {
    var vl = vv[Eo], Jm = vl.toLowerCase(), Co = vl[0].toUpperCase() + vl.slice(1);
    li(Jm, "on" + Co);
  }
  li(jf, "onAnimationEnd"), li(cv, "onAnimationIteration"), li(fv, "onAnimationStart"), li("dblclick", "onDoubleClick"), li("focusin", "onFocus"), li("focusout", "onBlur"), li(dv, "onTransitionEnd"), g("onMouseEnter", ["mouseout", "mouseover"]), g("onMouseLeave", ["mouseout", "mouseover"]), g("onPointerEnter", ["pointerout", "pointerover"]), g("onPointerLeave", ["pointerout", "pointerover"]), Ge("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ge("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ge("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ge("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ge("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ge("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var To = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), ey = new Set("cancel close invalid load scroll toggle".split(" ").concat(To));
  function hv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, I(o, r, void 0, n), n.currentTarget = null;
  }
  function Us(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var h = o.length - 1; 0 <= h; h--) {
          var S = o[h], C = S.instance, O = S.currentTarget;
          if (S = S.listener, C !== d && c.isPropagationStopped()) break e;
          hv(c, S, O), d = C;
        }
        else for (h = 0; h < o.length; h++) {
          if (S = o[h], C = S.instance, O = S.currentTarget, S = S.listener, C !== d && c.isPropagationStopped()) break e;
          hv(c, S, O), d = C;
        }
      }
    }
    if (_i) throw n = ol, _i = !1, ol = null, n;
  }
  function Et(n, r) {
    var l = r[If];
    l === void 0 && (l = r[If] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (mv(r, n, 2, !1), l.add(o));
  }
  function zi(n, r, l) {
    var o = 0;
    r && (o |= 4), mv(l, n, o, r);
  }
  var ui = "_reactListening" + Math.random().toString(36).slice(2);
  function ou(n) {
    if (!n[ui]) {
      n[ui] = !0, et.forEach(function(l) {
        l !== "selectionchange" && (ey.has(l) || zi(l, !1, n), zi(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[ui] || (r[ui] = !0, zi("selectionchange", !1, r));
    }
  }
  function mv(n, r, l, o) {
    switch (Rf(r)) {
      case 1:
        var c = Fp;
        break;
      case 4:
        c = Ts;
        break;
      default:
        c = Rs;
    }
    l = c.bind(null, r, l, n), c = void 0, !Kl || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function As(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var h = o.tag;
      if (h === 3 || h === 4) {
        var S = o.stateNode.containerInfo;
        if (S === c || S.nodeType === 8 && S.parentNode === c) break;
        if (h === 4) for (h = o.return; h !== null; ) {
          var C = h.tag;
          if ((C === 3 || C === 4) && (C = h.stateNode.containerInfo, C === c || C.nodeType === 8 && C.parentNode === c)) return;
          h = h.return;
        }
        for (; S !== null; ) {
          if (h = Jr(S), h === null) return;
          if (C = h.tag, C === 5 || C === 6) {
            o = d = h;
            continue e;
          }
          S = S.parentNode;
        }
      }
      o = o.return;
    }
    ql(function() {
      var O = d, j = Ct(l), B = [];
      e: {
        var F = pv.get(n);
        if (F !== void 0) {
          var ee = ws, ue = n;
          switch (n) {
            case "keypress":
              if (tu(l) === 0) break e;
            case "keydown":
            case "keyup":
              ee = Qm;
              break;
            case "focusin":
              ue = "focus", ee = Ni;
              break;
            case "focusout":
              ue = "blur", ee = Ni;
              break;
            case "beforeblur":
            case "afterblur":
              ee = Ni;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              ee = bs;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              ee = Pp;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              ee = Im;
              break;
            case jf:
            case cv:
            case fv:
              ee = $p;
              break;
            case dv:
              ee = Wp;
              break;
            case "scroll":
              ee = Vp;
              break;
            case "wheel":
              ee = ai;
              break;
            case "copy":
            case "cut":
            case "paste":
              ee = $m;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              ee = ks;
          }
          var fe = (r & 4) !== 0, Xt = !fe && n === "scroll", w = fe ? F !== null ? F + "Capture" : null : F;
          fe = [];
          for (var R = O, k; R !== null; ) {
            k = R;
            var $ = k.stateNode;
            if (k.tag === 5 && $ !== null && (k = $, w !== null && ($ = ul(R, w), $ != null && fe.push(Ro(R, $, k)))), Xt) break;
            R = R.return;
          }
          0 < fe.length && (F = new ee(F, ue, null, l, j), B.push({ event: F, listeners: fe }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (F = n === "mouseover" || n === "pointerover", ee = n === "mouseout" || n === "pointerout", F && l !== cr && (ue = l.relatedTarget || l.fromElement) && (Jr(ue) || ue[oi])) break e;
          if ((ee || F) && (F = j.window === j ? j : (F = j.ownerDocument) ? F.defaultView || F.parentWindow : window, ee ? (ue = l.relatedTarget || l.toElement, ee = O, ue = ue ? Jr(ue) : null, ue !== null && (Xt = me(ue), ue !== Xt || ue.tag !== 5 && ue.tag !== 6) && (ue = null)) : (ee = null, ue = O), ee !== ue)) {
            if (fe = bs, $ = "onMouseLeave", w = "onMouseEnter", R = "mouse", (n === "pointerout" || n === "pointerover") && (fe = ks, $ = "onPointerLeave", w = "onPointerEnter", R = "pointer"), Xt = ee == null ? F : su(ee), k = ue == null ? F : su(ue), F = new fe($, R + "leave", ee, l, j), F.target = Xt, F.relatedTarget = k, $ = null, Jr(j) === O && (fe = new fe(w, R + "enter", ue, l, j), fe.target = k, fe.relatedTarget = Xt, $ = fe), Xt = $, ee && ue) t: {
              for (fe = ee, w = ue, R = 0, k = fe; k; k = hl(k)) R++;
              for (k = 0, $ = w; $; $ = hl($)) k++;
              for (; 0 < R - k; ) fe = hl(fe), R--;
              for (; 0 < k - R; ) w = hl(w), k--;
              for (; R--; ) {
                if (fe === w || w !== null && fe === w.alternate) break t;
                fe = hl(fe), w = hl(w);
              }
              fe = null;
            }
            else fe = null;
            ee !== null && Vf(B, F, ee, fe, !1), ue !== null && Xt !== null && Vf(B, Xt, ue, fe, !0);
          }
        }
        e: {
          if (F = O ? su(O) : window, ee = F.nodeName && F.nodeName.toLowerCase(), ee === "select" || ee === "input" && F.type === "file") var pe = ev;
          else if (Zp(F)) if (Mf) pe = av;
          else {
            pe = qm;
            var Te = Xm;
          }
          else (ee = F.nodeName) && ee.toLowerCase() === "input" && (F.type === "checkbox" || F.type === "radio") && (pe = Km);
          if (pe && (pe = pe(n, O))) {
            Jp(B, pe, l, j);
            break e;
          }
          Te && Te(n, F, O), n === "focusout" && (Te = F._wrapperState) && Te.controlled && F.type === "number" && Sa(F, "number", F.value);
        }
        switch (Te = O ? su(O) : window, n) {
          case "focusin":
            (Zp(Te) || Te.contentEditable === "true") && (ka = Te, Uf = O, So = null);
            break;
          case "focusout":
            So = Uf = ka = null;
            break;
          case "mousedown":
            Af = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Af = !1, sv(B, l, j);
            break;
          case "selectionchange":
            if (ov) break;
          case "keydown":
          case "keyup":
            sv(B, l, j);
        }
        var oe;
        if (ba) e: {
          switch (n) {
            case "compositionstart":
              var Re = "onCompositionStart";
              break e;
            case "compositionend":
              Re = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Re = "onCompositionUpdate";
              break e;
          }
          Re = void 0;
        }
        else au ? qp(n, l) && (Re = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Re = "onCompositionStart");
        Re && (Gp && l.locale !== "ko" && (au || Re !== "onCompositionStart" ? Re === "onCompositionEnd" && au && (oe = xf()) : (ni = j, po = "value" in ni ? ni.value : ni.textContent, au = !0)), Te = xo(O, Re), 0 < Te.length && (Re = new bf(Re, n, null, l, j), B.push({ event: Re, listeners: Te }), oe ? Re.data = oe : (oe = Ls(l), oe !== null && (Re.data = oe)))), (oe = Os ? Wm(n, l) : Gm(n, l)) && (O = xo(O, "onBeforeInput"), 0 < O.length && (j = new bf("onBeforeInput", "beforeinput", null, l, j), B.push({ event: j, listeners: O }), j.data = oe));
      }
      Us(B, r);
    });
  }
  function Ro(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function xo(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = ul(n, l), d != null && o.unshift(Ro(n, d, c)), d = ul(n, r), d != null && o.push(Ro(n, d, c))), n = n.return;
    }
    return o;
  }
  function hl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Vf(n, r, l, o, c) {
    for (var d = r._reactName, h = []; l !== null && l !== o; ) {
      var S = l, C = S.alternate, O = S.stateNode;
      if (C !== null && C === o) break;
      S.tag === 5 && O !== null && (S = O, c ? (C = ul(l, d), C != null && h.unshift(Ro(l, C, S))) : c || (C = ul(l, d), C != null && h.push(Ro(l, C, S)))), l = l.return;
    }
    h.length !== 0 && n.push({ event: r, listeners: h });
  }
  var Bf = /\r\n?/g, ty = /\u0000|\uFFFD/g;
  function Pf(n) {
    return (typeof n == "string" ? n : "" + n).replace(Bf, `
`).replace(ty, "");
  }
  function Hs(n, r, l) {
    if (r = Pf(r), Pf(n) !== r && l) throw Error(M(425));
  }
  function Fs() {
  }
  var $f = null, ml = null;
  function wo(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var yl = typeof setTimeout == "function" ? setTimeout : void 0, yv = typeof clearTimeout == "function" ? clearTimeout : void 0, Yf = typeof Promise == "function" ? Promise : void 0, Qf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yf < "u" ? function(n) {
    return Yf.resolve(null).then(n).catch(ny);
  } : yl;
  function ny(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Ui(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), co(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    co(r);
  }
  function _a(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function Do(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Ai = Math.random().toString(36).slice(2), Va = "__reactFiber$" + Ai, gl = "__reactProps$" + Ai, oi = "__reactContainer$" + Ai, If = "__reactEvents$" + Ai, ry = "__reactListeners$" + Ai, Wf = "__reactHandles$" + Ai;
  function Jr(n) {
    var r = n[Va];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[oi] || l[Va]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Do(n); n !== null; ) {
          if (l = n[Va]) return l;
          n = Do(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function bo(n) {
    return n = n[Va] || n[oi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function su(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(M(33));
  }
  function Se(n) {
    return n[gl] || null;
  }
  var Hi = [], bt = -1;
  function ze(n) {
    return { current: n };
  }
  function lt(n) {
    0 > bt || (n.current = Hi[bt], Hi[bt] = null, bt--);
  }
  function ot(n, r) {
    bt++, Hi[bt] = n.current, n.current = r;
  }
  var Ba = {}, be = ze(Ba), Pt = ze(!1), pr = Ba;
  function ea(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Ba;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mt(n) {
    return n = n.childContextTypes, n != null;
  }
  function ta() {
    lt(Pt), lt(be);
  }
  function Fi(n, r, l) {
    if (be.current !== Ba) throw Error(M(168));
    ot(be, r), ot(Pt, l);
  }
  function ko(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(M(108, Ir(n) || "Unknown", c));
    return re({}, l, o);
  }
  function js(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ba, pr = be.current, ot(be, n), ot(Pt, Pt.current), !0;
  }
  function gv(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(M(169));
    l ? (n = ko(n, r, pr), o.__reactInternalMemoizedMergedChildContext = n, lt(Pt), lt(be), ot(be, n)) : lt(Pt), ot(Pt, l);
  }
  var Ur = null, gn = !1, _o = !1;
  function Gf(n) {
    Ur === null ? Ur = [n] : Ur.push(n);
  }
  function Xf(n) {
    gn = !0, Gf(n);
  }
  function vr() {
    if (!_o && Ur !== null) {
      _o = !0;
      var n = 0, r = ft;
      try {
        var l = Ur;
        for (ft = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ur = null, gn = !1;
      } catch (c) {
        throw Ur !== null && (Ur = Ur.slice(n + 1)), Dt(Nr, vr), c;
      } finally {
        ft = r, _o = !1;
      }
    }
    return null;
  }
  var ji = [], hr = 0, Sl = null, cu = 0, mr = [], Qn = 0, na = null, kn = 1, si = "";
  function Ar(n, r) {
    ji[hr++] = cu, ji[hr++] = Sl, Sl = n, cu = r;
  }
  function qf(n, r, l) {
    mr[Qn++] = kn, mr[Qn++] = si, mr[Qn++] = na, na = n;
    var o = kn;
    n = si;
    var c = 32 - Xr(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Xr(r) + c;
    if (30 < d) {
      var h = c - c % 5;
      d = (o & (1 << h) - 1).toString(32), o >>= h, c -= h, kn = 1 << 32 - Xr(r) + c | l << c | o, si = d + n;
    } else kn = 1 << d | l << c | o, si = n;
  }
  function Vs(n) {
    n.return !== null && (Ar(n, 1), qf(n, 1, 0));
  }
  function Kf(n) {
    for (; n === Sl; ) Sl = ji[--hr], ji[hr] = null, cu = ji[--hr], ji[hr] = null;
    for (; n === na; ) na = mr[--Qn], mr[Qn] = null, si = mr[--Qn], mr[Qn] = null, kn = mr[--Qn], mr[Qn] = null;
  }
  var Hr = null, yr = null, kt = !1, ra = null;
  function Zf(n, r) {
    var l = fa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Sv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Hr = n, yr = _a(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Hr = n, yr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = na !== null ? { id: kn, overflow: si } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = fa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Hr = n, yr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Bs(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Ps(n) {
    if (kt) {
      var r = yr;
      if (r) {
        var l = r;
        if (!Sv(n, r)) {
          if (Bs(n)) throw Error(M(418));
          r = _a(l.nextSibling);
          var o = Hr;
          r && Sv(n, r) ? Zf(o, l) : (n.flags = n.flags & -4097 | 2, kt = !1, Hr = n);
        }
      } else {
        if (Bs(n)) throw Error(M(418));
        n.flags = n.flags & -4097 | 2, kt = !1, Hr = n;
      }
    }
  }
  function Ev(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Hr = n;
  }
  function $s(n) {
    if (n !== Hr) return !1;
    if (!kt) return Ev(n), kt = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !wo(n.type, n.memoizedProps)), r && (r = yr)) {
      if (Bs(n)) throw Cv(), Error(M(418));
      for (; r; ) Zf(n, r), r = _a(r.nextSibling);
    }
    if (Ev(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(M(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                yr = _a(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        yr = null;
      }
    } else yr = Hr ? _a(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Cv() {
    for (var n = yr; n; ) n = _a(n.nextSibling);
  }
  function Ht() {
    yr = Hr = null, kt = !1;
  }
  function Jf(n) {
    ra === null ? ra = [n] : ra.push(n);
  }
  var Ys = gt.ReactCurrentBatchConfig;
  function El(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(M(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(M(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(h) {
          var S = c.refs;
          h === null ? delete S[d] : S[d] = h;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(M(284));
      if (!l._owner) throw Error(M(290, n));
    }
    return n;
  }
  function Pa(n, r) {
    throw n = Object.prototype.toString.call(r), Error(M(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Tv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Qs(n) {
    function r(w, R) {
      if (n) {
        var k = w.deletions;
        k === null ? (w.deletions = [R], w.flags |= 16) : k.push(R);
      }
    }
    function l(w, R) {
      if (!n) return null;
      for (; R !== null; ) r(w, R), R = R.sibling;
      return null;
    }
    function o(w, R) {
      for (w = /* @__PURE__ */ new Map(); R !== null; ) R.key !== null ? w.set(R.key, R) : w.set(R.index, R), R = R.sibling;
      return w;
    }
    function c(w, R) {
      return w = Wi(w, R), w.index = 0, w.sibling = null, w;
    }
    function d(w, R, k) {
      return w.index = k, n ? (k = w.alternate, k !== null ? (k = k.index, k < R ? (w.flags |= 2, R) : k) : (w.flags |= 2, R)) : (w.flags |= 1048576, R);
    }
    function h(w) {
      return n && w.alternate === null && (w.flags |= 2), w;
    }
    function S(w, R, k, $) {
      return R === null || R.tag !== 6 ? (R = Mc(k, w.mode, $), R.return = w, R) : (R = c(R, k), R.return = w, R);
    }
    function C(w, R, k, $) {
      var pe = k.type;
      return pe === Ae ? j(w, R, k.props.children, $, k.key) : R !== null && (R.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === wt && Tv(pe) === R.type) ? ($ = c(R, k.props), $.ref = El(w, R, k), $.return = w, $) : ($ = Oc(k.type, k.key, k.props, null, w.mode, $), $.ref = El(w, R, k), $.return = w, $);
    }
    function O(w, R, k, $) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== k.containerInfo || R.stateNode.implementation !== k.implementation ? (R = Wo(k, w.mode, $), R.return = w, R) : (R = c(R, k.children || []), R.return = w, R);
    }
    function j(w, R, k, $, pe) {
      return R === null || R.tag !== 7 ? (R = Ul(k, w.mode, $, pe), R.return = w, R) : (R = c(R, k), R.return = w, R);
    }
    function B(w, R, k) {
      if (typeof R == "string" && R !== "" || typeof R == "number") return R = Mc("" + R, w.mode, k), R.return = w, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case $e:
            return k = Oc(R.type, R.key, R.props, null, w.mode, k), k.ref = El(w, null, R), k.return = w, k;
          case xt:
            return R = Wo(R, w.mode, k), R.return = w, R;
          case wt:
            var $ = R._init;
            return B(w, $(R._payload), k);
        }
        if (ei(R) || Ce(R)) return R = Ul(R, w.mode, k, null), R.return = w, R;
        Pa(w, R);
      }
      return null;
    }
    function F(w, R, k, $) {
      var pe = R !== null ? R.key : null;
      if (typeof k == "string" && k !== "" || typeof k == "number") return pe !== null ? null : S(w, R, "" + k, $);
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case $e:
            return k.key === pe ? C(w, R, k, $) : null;
          case xt:
            return k.key === pe ? O(w, R, k, $) : null;
          case wt:
            return pe = k._init, F(
              w,
              R,
              pe(k._payload),
              $
            );
        }
        if (ei(k) || Ce(k)) return pe !== null ? null : j(w, R, k, $, null);
        Pa(w, k);
      }
      return null;
    }
    function ee(w, R, k, $, pe) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") return w = w.get(k) || null, S(R, w, "" + $, pe);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case $e:
            return w = w.get($.key === null ? k : $.key) || null, C(R, w, $, pe);
          case xt:
            return w = w.get($.key === null ? k : $.key) || null, O(R, w, $, pe);
          case wt:
            var Te = $._init;
            return ee(w, R, k, Te($._payload), pe);
        }
        if (ei($) || Ce($)) return w = w.get(k) || null, j(R, w, $, pe, null);
        Pa(R, $);
      }
      return null;
    }
    function ue(w, R, k, $) {
      for (var pe = null, Te = null, oe = R, Re = R = 0, cn = null; oe !== null && Re < k.length; Re++) {
        oe.index > Re ? (cn = oe, oe = null) : cn = oe.sibling;
        var nt = F(w, oe, k[Re], $);
        if (nt === null) {
          oe === null && (oe = cn);
          break;
        }
        n && oe && nt.alternate === null && r(w, oe), R = d(nt, R, Re), Te === null ? pe = nt : Te.sibling = nt, Te = nt, oe = cn;
      }
      if (Re === k.length) return l(w, oe), kt && Ar(w, Re), pe;
      if (oe === null) {
        for (; Re < k.length; Re++) oe = B(w, k[Re], $), oe !== null && (R = d(oe, R, Re), Te === null ? pe = oe : Te.sibling = oe, Te = oe);
        return kt && Ar(w, Re), pe;
      }
      for (oe = o(w, oe); Re < k.length; Re++) cn = ee(oe, w, Re, k[Re], $), cn !== null && (n && cn.alternate !== null && oe.delete(cn.key === null ? Re : cn.key), R = d(cn, R, Re), Te === null ? pe = cn : Te.sibling = cn, Te = cn);
      return n && oe.forEach(function(mi) {
        return r(w, mi);
      }), kt && Ar(w, Re), pe;
    }
    function fe(w, R, k, $) {
      var pe = Ce(k);
      if (typeof pe != "function") throw Error(M(150));
      if (k = pe.call(k), k == null) throw Error(M(151));
      for (var Te = pe = null, oe = R, Re = R = 0, cn = null, nt = k.next(); oe !== null && !nt.done; Re++, nt = k.next()) {
        oe.index > Re ? (cn = oe, oe = null) : cn = oe.sibling;
        var mi = F(w, oe, nt.value, $);
        if (mi === null) {
          oe === null && (oe = cn);
          break;
        }
        n && oe && mi.alternate === null && r(w, oe), R = d(mi, R, Re), Te === null ? pe = mi : Te.sibling = mi, Te = mi, oe = cn;
      }
      if (nt.done) return l(
        w,
        oe
      ), kt && Ar(w, Re), pe;
      if (oe === null) {
        for (; !nt.done; Re++, nt = k.next()) nt = B(w, nt.value, $), nt !== null && (R = d(nt, R, Re), Te === null ? pe = nt : Te.sibling = nt, Te = nt);
        return kt && Ar(w, Re), pe;
      }
      for (oe = o(w, oe); !nt.done; Re++, nt = k.next()) nt = ee(oe, w, Re, nt.value, $), nt !== null && (n && nt.alternate !== null && oe.delete(nt.key === null ? Re : nt.key), R = d(nt, R, Re), Te === null ? pe = nt : Te.sibling = nt, Te = nt);
      return n && oe.forEach(function(Cy) {
        return r(w, Cy);
      }), kt && Ar(w, Re), pe;
    }
    function Xt(w, R, k, $) {
      if (typeof k == "object" && k !== null && k.type === Ae && k.key === null && (k = k.props.children), typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case $e:
            e: {
              for (var pe = k.key, Te = R; Te !== null; ) {
                if (Te.key === pe) {
                  if (pe = k.type, pe === Ae) {
                    if (Te.tag === 7) {
                      l(w, Te.sibling), R = c(Te, k.props.children), R.return = w, w = R;
                      break e;
                    }
                  } else if (Te.elementType === pe || typeof pe == "object" && pe !== null && pe.$$typeof === wt && Tv(pe) === Te.type) {
                    l(w, Te.sibling), R = c(Te, k.props), R.ref = El(w, Te, k), R.return = w, w = R;
                    break e;
                  }
                  l(w, Te);
                  break;
                } else r(w, Te);
                Te = Te.sibling;
              }
              k.type === Ae ? (R = Ul(k.props.children, w.mode, $, k.key), R.return = w, w = R) : ($ = Oc(k.type, k.key, k.props, null, w.mode, $), $.ref = El(w, R, k), $.return = w, w = $);
            }
            return h(w);
          case xt:
            e: {
              for (Te = k.key; R !== null; ) {
                if (R.key === Te) if (R.tag === 4 && R.stateNode.containerInfo === k.containerInfo && R.stateNode.implementation === k.implementation) {
                  l(w, R.sibling), R = c(R, k.children || []), R.return = w, w = R;
                  break e;
                } else {
                  l(w, R);
                  break;
                }
                else r(w, R);
                R = R.sibling;
              }
              R = Wo(k, w.mode, $), R.return = w, w = R;
            }
            return h(w);
          case wt:
            return Te = k._init, Xt(w, R, Te(k._payload), $);
        }
        if (ei(k)) return ue(w, R, k, $);
        if (Ce(k)) return fe(w, R, k, $);
        Pa(w, k);
      }
      return typeof k == "string" && k !== "" || typeof k == "number" ? (k = "" + k, R !== null && R.tag === 6 ? (l(w, R.sibling), R = c(R, k), R.return = w, w = R) : (l(w, R), R = Mc(k, w.mode, $), R.return = w, w = R), h(w)) : l(w, R);
    }
    return Xt;
  }
  var fu = Qs(!0), Rv = Qs(!1), ci = ze(null), ln = null, W = null, aa = null;
  function Fr() {
    aa = W = ln = null;
  }
  function ed(n) {
    var r = ci.current;
    lt(ci), n._currentValue = r;
  }
  function td(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function du(n, r) {
    ln = n, aa = W = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Er = !0), n.firstContext = null);
  }
  function ia(n) {
    var r = n._currentValue;
    if (aa !== n) if (n = { context: n, memoizedValue: r, next: null }, W === null) {
      if (ln === null) throw Error(M(308));
      W = n, ln.dependencies = { lanes: 0, firstContext: n };
    } else W = W.next = n;
    return r;
  }
  var Cl = null;
  function en(n) {
    Cl === null ? Cl = [n] : Cl.push(n);
  }
  function xv(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, en(r)) : (l.next = c.next, c.next = l), r.interleaved = l, fi(n, o);
  }
  function fi(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Vi = !1;
  function Is(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function pu(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function gr(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Bi(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, Ye & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, fi(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, en(o)) : (r.next = c.next, c.next = r), o.interleaved = r, fi(n, l);
  }
  function Ws(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, lo(n, l);
    }
  }
  function wv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var h = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = h : d = d.next = h, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Gs(n, r, l, o) {
    var c = n.updateQueue;
    Vi = !1;
    var d = c.firstBaseUpdate, h = c.lastBaseUpdate, S = c.shared.pending;
    if (S !== null) {
      c.shared.pending = null;
      var C = S, O = C.next;
      C.next = null, h === null ? d = O : h.next = O, h = C;
      var j = n.alternate;
      j !== null && (j = j.updateQueue, S = j.lastBaseUpdate, S !== h && (S === null ? j.firstBaseUpdate = O : S.next = O, j.lastBaseUpdate = C));
    }
    if (d !== null) {
      var B = c.baseState;
      h = 0, j = O = C = null, S = d;
      do {
        var F = S.lane, ee = S.eventTime;
        if ((o & F) === F) {
          j !== null && (j = j.next = {
            eventTime: ee,
            lane: 0,
            tag: S.tag,
            payload: S.payload,
            callback: S.callback,
            next: null
          });
          e: {
            var ue = n, fe = S;
            switch (F = r, ee = l, fe.tag) {
              case 1:
                if (ue = fe.payload, typeof ue == "function") {
                  B = ue.call(ee, B, F);
                  break e;
                }
                B = ue;
                break e;
              case 3:
                ue.flags = ue.flags & -65537 | 128;
              case 0:
                if (ue = fe.payload, F = typeof ue == "function" ? ue.call(ee, B, F) : ue, F == null) break e;
                B = re({}, B, F);
                break e;
              case 2:
                Vi = !0;
            }
          }
          S.callback !== null && S.lane !== 0 && (n.flags |= 64, F = c.effects, F === null ? c.effects = [S] : F.push(S));
        } else ee = { eventTime: ee, lane: F, tag: S.tag, payload: S.payload, callback: S.callback, next: null }, j === null ? (O = j = ee, C = B) : j = j.next = ee, h |= F;
        if (S = S.next, S === null) {
          if (S = c.shared.pending, S === null) break;
          F = S, S = F.next, F.next = null, c.lastBaseUpdate = F, c.shared.pending = null;
        }
      } while (!0);
      if (j === null && (C = B), c.baseState = C, c.firstBaseUpdate = O, c.lastBaseUpdate = j, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          h |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Ll |= h, n.lanes = h, n.memoizedState = B;
    }
  }
  function Dv(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(M(191, c));
        c.call(o);
      }
    }
  }
  var Oo = {}, Oa = ze(Oo), vu = ze(Oo), Lo = ze(Oo);
  function Tl(n) {
    if (n === Oo) throw Error(M(174));
    return n;
  }
  function nd(n, r) {
    switch (ot(Lo, r), ot(vu, n), ot(Oa, Oo), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Kt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Kt(r, n);
    }
    lt(Oa), ot(Oa, r);
  }
  function hu() {
    lt(Oa), lt(vu), lt(Lo);
  }
  function bv(n) {
    Tl(Lo.current);
    var r = Tl(Oa.current), l = Kt(r, n.type);
    r !== l && (ot(vu, n), ot(Oa, l));
  }
  function rd(n) {
    vu.current === n && (lt(Oa), lt(vu));
  }
  var Nt = ze(0);
  function Xs(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var qs = [];
  function ad() {
    for (var n = 0; n < qs.length; n++) qs[n]._workInProgressVersionPrimary = null;
    qs.length = 0;
  }
  var Ks = gt.ReactCurrentDispatcher, Mo = gt.ReactCurrentBatchConfig, de = 0, ve = null, ke = null, Ve = null, jr = !1, mu = !1, No = 0, ay = 0;
  function In() {
    throw Error(M(321));
  }
  function zo(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Zr(n[l], r[l])) return !1;
    return !0;
  }
  function H(n, r, l, o, c, d) {
    if (de = d, ve = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Ks.current = n === null || n.memoizedState === null ? iy : Rt, n = l(o, c), mu) {
      d = 0;
      do {
        if (mu = !1, No = 0, 25 <= d) throw Error(M(301));
        d += 1, Ve = ke = null, r.updateQueue = null, Ks.current = dc, n = l(o, c);
      } while (mu);
    }
    if (Ks.current = Wn, r = ke !== null && ke.next !== null, de = 0, Ve = ke = ve = null, jr = !1, r) throw Error(M(300));
    return n;
  }
  function tn() {
    var n = No !== 0;
    return No = 0, n;
  }
  function ye() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ve === null ? ve.memoizedState = Ve = n : Ve = Ve.next = n, Ve;
  }
  function _n() {
    if (ke === null) {
      var n = ve.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = ke.next;
    var r = Ve === null ? ve.memoizedState : Ve.next;
    if (r !== null) Ve = r, ke = n;
    else {
      if (n === null) throw Error(M(310));
      ke = n, n = { memoizedState: ke.memoizedState, baseState: ke.baseState, baseQueue: ke.baseQueue, queue: ke.queue, next: null }, Ve === null ? ve.memoizedState = Ve = n : Ve = Ve.next = n;
    }
    return Ve;
  }
  function Vr(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function di(n) {
    var r = _n(), l = r.queue;
    if (l === null) throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = ke, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var h = c.next;
        c.next = d.next, d.next = h;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var S = h = null, C = null, O = d;
      do {
        var j = O.lane;
        if ((de & j) === j) C !== null && (C = C.next = { lane: 0, action: O.action, hasEagerState: O.hasEagerState, eagerState: O.eagerState, next: null }), o = O.hasEagerState ? O.eagerState : n(o, O.action);
        else {
          var B = {
            lane: j,
            action: O.action,
            hasEagerState: O.hasEagerState,
            eagerState: O.eagerState,
            next: null
          };
          C === null ? (S = C = B, h = o) : C = C.next = B, ve.lanes |= j, Ll |= j;
        }
        O = O.next;
      } while (O !== null && O !== d);
      C === null ? h = o : C.next = S, Zr(o, r.memoizedState) || (Er = !0), r.memoizedState = o, r.baseState = h, r.baseQueue = C, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, ve.lanes |= d, Ll |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function la(n) {
    var r = _n(), l = r.queue;
    if (l === null) throw Error(M(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var h = c = c.next;
      do
        d = n(d, h.action), h = h.next;
      while (h !== c);
      Zr(d, r.memoizedState) || (Er = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function yu() {
  }
  function Rl(n, r) {
    var l = ve, o = _n(), c = r(), d = !Zr(o.memoizedState, c);
    if (d && (o.memoizedState = c, Er = !0), o = o.queue, Uo(Js.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Ve !== null && Ve.memoizedState.tag & 1) {
      if (l.flags |= 2048, xl(9, Zs.bind(null, l, o, c, r), void 0, null), Yt === null) throw Error(M(349));
      de & 30 || gu(l, r, c);
    }
    return c;
  }
  function gu(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = ve.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, ve.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Zs(n, r, l, o) {
    r.value = l, r.getSnapshot = o, ec(r) && tc(n);
  }
  function Js(n, r, l) {
    return l(function() {
      ec(r) && tc(n);
    });
  }
  function ec(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Zr(n, l);
    } catch {
      return !0;
    }
  }
  function tc(n) {
    var r = fi(n, 1);
    r !== null && Ft(r, n, 1, -1);
  }
  function nc(n) {
    var r = ye();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vr, lastRenderedState: n }, r.queue = n, n = n.dispatch = Ao.bind(null, ve, n), [r.memoizedState, n];
  }
  function xl(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = ve.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, ve.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function rc() {
    return _n().memoizedState;
  }
  function Su(n, r, l, o) {
    var c = ye();
    ve.flags |= n, c.memoizedState = xl(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function Eu(n, r, l, o) {
    var c = _n();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (ke !== null) {
      var h = ke.memoizedState;
      if (d = h.destroy, o !== null && zo(o, h.deps)) {
        c.memoizedState = xl(r, l, d, o);
        return;
      }
    }
    ve.flags |= n, c.memoizedState = xl(1 | r, l, d, o);
  }
  function ac(n, r) {
    return Su(8390656, 8, n, r);
  }
  function Uo(n, r) {
    return Eu(2048, 8, n, r);
  }
  function ic(n, r) {
    return Eu(4, 2, n, r);
  }
  function lc(n, r) {
    return Eu(4, 4, n, r);
  }
  function uc(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function oc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Eu(4, 4, uc.bind(null, r, n), l);
  }
  function Cu() {
  }
  function wl(n, r) {
    var l = _n();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && zo(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function sc(n, r) {
    var l = _n();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && zo(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function cc(n, r, l) {
    return de & 21 ? (Zr(l, r) || (l = Es(), ve.lanes |= l, Ll |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Er = !0), n.memoizedState = l);
  }
  function id(n, r) {
    var l = ft;
    ft = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Mo.transition;
    Mo.transition = {};
    try {
      n(!1), r();
    } finally {
      ft = l, Mo.transition = o;
    }
  }
  function fc() {
    return _n().memoizedState;
  }
  function kv(n, r, l) {
    var o = hi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, ld(n)) Tu(r, l);
    else if (l = xv(n, r, l, o), l !== null) {
      var c = Cn();
      Ft(l, n, o, c), Pi(l, r, o);
    }
  }
  function Ao(n, r, l) {
    var o = hi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (ld(n)) Tu(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var h = r.lastRenderedState, S = d(h, l);
        if (c.hasEagerState = !0, c.eagerState = S, Zr(S, h)) {
          var C = r.interleaved;
          C === null ? (c.next = c, en(r)) : (c.next = C.next, C.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = xv(n, r, c, o), l !== null && (c = Cn(), Ft(l, n, o, c), Pi(l, r, o));
    }
  }
  function ld(n) {
    var r = n.alternate;
    return n === ve || r !== null && r === ve;
  }
  function Tu(n, r) {
    mu = jr = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Pi(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, lo(n, l);
    }
  }
  var Wn = { readContext: ia, useCallback: In, useContext: In, useEffect: In, useImperativeHandle: In, useInsertionEffect: In, useLayoutEffect: In, useMemo: In, useReducer: In, useRef: In, useState: In, useDebugValue: In, useDeferredValue: In, useTransition: In, useMutableSource: In, useSyncExternalStore: In, useId: In, unstable_isNewReconciler: !1 }, iy = { readContext: ia, useCallback: function(n, r) {
    return ye().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: ia, useEffect: ac, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Su(
      4194308,
      4,
      uc.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Su(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Su(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = ye();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = ye();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = kv.bind(null, ve, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = ye();
    return n = { current: n }, r.memoizedState = n;
  }, useState: nc, useDebugValue: Cu, useDeferredValue: function(n) {
    return ye().memoizedState = n;
  }, useTransition: function() {
    var n = nc(!1), r = n[0];
    return n = id.bind(null, n[1]), ye().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = ve, c = ye();
    if (kt) {
      if (l === void 0) throw Error(M(407));
      l = l();
    } else {
      if (l = r(), Yt === null) throw Error(M(349));
      de & 30 || gu(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, ac(Js.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, xl(9, Zs.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = ye(), r = Yt.identifierPrefix;
    if (kt) {
      var l = si, o = kn;
      l = (o & ~(1 << 32 - Xr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = No++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = ay++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Rt = {
    readContext: ia,
    useCallback: wl,
    useContext: ia,
    useEffect: Uo,
    useImperativeHandle: oc,
    useInsertionEffect: ic,
    useLayoutEffect: lc,
    useMemo: sc,
    useReducer: di,
    useRef: rc,
    useState: function() {
      return di(Vr);
    },
    useDebugValue: Cu,
    useDeferredValue: function(n) {
      var r = _n();
      return cc(r, ke.memoizedState, n);
    },
    useTransition: function() {
      var n = di(Vr)[0], r = _n().memoizedState;
      return [n, r];
    },
    useMutableSource: yu,
    useSyncExternalStore: Rl,
    useId: fc,
    unstable_isNewReconciler: !1
  }, dc = { readContext: ia, useCallback: wl, useContext: ia, useEffect: Uo, useImperativeHandle: oc, useInsertionEffect: ic, useLayoutEffect: lc, useMemo: sc, useReducer: la, useRef: rc, useState: function() {
    return la(Vr);
  }, useDebugValue: Cu, useDeferredValue: function(n) {
    var r = _n();
    return ke === null ? r.memoizedState = n : cc(r, ke.memoizedState, n);
  }, useTransition: function() {
    var n = la(Vr)[0], r = _n().memoizedState;
    return [n, r];
  }, useMutableSource: yu, useSyncExternalStore: Rl, useId: fc, unstable_isNewReconciler: !1 };
  function Sr(n, r) {
    if (n && n.defaultProps) {
      r = re({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Dl(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : re({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var bl = { isMounted: function(n) {
    return (n = n._reactInternals) ? me(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Cn(), c = hi(n), d = gr(o, c);
    d.payload = r, l != null && (d.callback = l), r = Bi(n, d, c), r !== null && (Ft(r, n, c, o), Ws(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Cn(), c = hi(n), d = gr(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Bi(n, d, c), r !== null && (Ft(r, n, c, o), Ws(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Cn(), o = hi(n), c = gr(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Bi(n, c, o), r !== null && (Ft(r, n, o, l), Ws(r, n, o));
  } };
  function _v(n, r, l, o, c, d, h) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, h) : r.prototype && r.prototype.isPureReactComponent ? !go(l, o) || !go(c, d) : !0;
  }
  function Ov(n, r, l) {
    var o = !1, c = Ba, d = r.contextType;
    return typeof d == "object" && d !== null ? d = ia(d) : (c = Mt(r) ? pr : be.current, o = r.contextTypes, d = (o = o != null) ? ea(n, c) : Ba), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = bl, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Lv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && bl.enqueueReplaceState(r, r.state, null);
  }
  function ud(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Is(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = ia(d) : (d = Mt(r) ? pr : be.current, c.context = ea(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Dl(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && bl.enqueueReplaceState(c, c.state, null), Gs(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function $i(n, r) {
    try {
      var l = "", o = r;
      do
        l += za(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function od(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Ho(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Mv = typeof WeakMap == "function" ? WeakMap : Map;
  function Nv(n, r, l) {
    l = gr(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      xc || (xc = !0, yd = o), Ho(n, r);
    }, l;
  }
  function zv(n, r, l) {
    l = gr(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Ho(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Ho(n, r), typeof o != "function" && (sa === null ? sa = /* @__PURE__ */ new Set([this]) : sa.add(this));
      var h = r.stack;
      this.componentDidCatch(r.value, { componentStack: h !== null ? h : "" });
    }), l;
  }
  function Fo(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Mv();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = hy.bind(null, n, r, l), r.then(n, n));
  }
  function Uv(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function sd(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = gr(-1, 1), r.tag = 2, Bi(l, r, 1))), l.lanes |= 1), n);
  }
  var Av = gt.ReactCurrentOwner, Er = !1;
  function Wt(n, r, l, o) {
    r.child = n === null ? Rv(r, null, l, o) : fu(r, n.child, l, o);
  }
  function Ru(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return du(r, c), o = H(n, r, l, o, d, c), l = tn(), n !== null && !Er ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Gt(n, r, c)) : (kt && l && Vs(r), r.flags |= 1, Wt(n, r, o, c), r.child);
  }
  function Yi(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Td(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, pc(n, r, d, o, c)) : (n = Oc(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var h = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : go, l(h, o) && n.ref === r.ref) return Gt(n, r, c);
    }
    return r.flags |= 1, n = Wi(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function pc(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (go(d, o) && n.ref === r.ref) if (Er = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Er = !0);
      else return r.lanes = n.lanes, Gt(n, r, c);
    }
    return Ne(n, r, l, o, c);
  }
  function Cr(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, ot(Nu, Tr), Tr |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, ot(Nu, Tr), Tr |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, ot(Nu, Tr), Tr |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, ot(Nu, Tr), Tr |= o;
    return Wt(n, r, c, l), r.child;
  }
  function kl(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Ne(n, r, l, o, c) {
    var d = Mt(l) ? pr : be.current;
    return d = ea(r, d), du(r, c), l = H(n, r, l, o, d, c), o = tn(), n !== null && !Er ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Gt(n, r, c)) : (kt && o && Vs(r), r.flags |= 1, Wt(n, r, l, c), r.child);
  }
  function jo(n, r, l, o, c) {
    if (Mt(l)) {
      var d = !0;
      js(r);
    } else d = !1;
    if (du(r, c), r.stateNode === null) Bo(n, r), Ov(r, l, o), ud(r, l, o, c), o = !0;
    else if (n === null) {
      var h = r.stateNode, S = r.memoizedProps;
      h.props = S;
      var C = h.context, O = l.contextType;
      typeof O == "object" && O !== null ? O = ia(O) : (O = Mt(l) ? pr : be.current, O = ea(r, O));
      var j = l.getDerivedStateFromProps, B = typeof j == "function" || typeof h.getSnapshotBeforeUpdate == "function";
      B || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (S !== o || C !== O) && Lv(r, h, o, O), Vi = !1;
      var F = r.memoizedState;
      h.state = F, Gs(r, o, h, c), C = r.memoizedState, S !== o || F !== C || Pt.current || Vi ? (typeof j == "function" && (Dl(r, l, j, o), C = r.memoizedState), (S = Vi || _v(r, l, S, o, F, C, O)) ? (B || typeof h.UNSAFE_componentWillMount != "function" && typeof h.componentWillMount != "function" || (typeof h.componentWillMount == "function" && h.componentWillMount(), typeof h.UNSAFE_componentWillMount == "function" && h.UNSAFE_componentWillMount()), typeof h.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = C), h.props = o, h.state = C, h.context = O, o = S) : (typeof h.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      h = r.stateNode, pu(n, r), S = r.memoizedProps, O = r.type === r.elementType ? S : Sr(r.type, S), h.props = O, B = r.pendingProps, F = h.context, C = l.contextType, typeof C == "object" && C !== null ? C = ia(C) : (C = Mt(l) ? pr : be.current, C = ea(r, C));
      var ee = l.getDerivedStateFromProps;
      (j = typeof ee == "function" || typeof h.getSnapshotBeforeUpdate == "function") || typeof h.UNSAFE_componentWillReceiveProps != "function" && typeof h.componentWillReceiveProps != "function" || (S !== B || F !== C) && Lv(r, h, o, C), Vi = !1, F = r.memoizedState, h.state = F, Gs(r, o, h, c);
      var ue = r.memoizedState;
      S !== B || F !== ue || Pt.current || Vi ? (typeof ee == "function" && (Dl(r, l, ee, o), ue = r.memoizedState), (O = Vi || _v(r, l, O, o, F, ue, C) || !1) ? (j || typeof h.UNSAFE_componentWillUpdate != "function" && typeof h.componentWillUpdate != "function" || (typeof h.componentWillUpdate == "function" && h.componentWillUpdate(o, ue, C), typeof h.UNSAFE_componentWillUpdate == "function" && h.UNSAFE_componentWillUpdate(o, ue, C)), typeof h.componentDidUpdate == "function" && (r.flags |= 4), typeof h.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof h.componentDidUpdate != "function" || S === n.memoizedProps && F === n.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === n.memoizedProps && F === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = ue), h.props = o, h.state = ue, h.context = C, o = O) : (typeof h.componentDidUpdate != "function" || S === n.memoizedProps && F === n.memoizedState || (r.flags |= 4), typeof h.getSnapshotBeforeUpdate != "function" || S === n.memoizedProps && F === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return vc(n, r, l, o, d, c);
  }
  function vc(n, r, l, o, c, d) {
    kl(n, r);
    var h = (r.flags & 128) !== 0;
    if (!o && !h) return c && gv(r, l, !1), Gt(n, r, d);
    o = r.stateNode, Av.current = r;
    var S = h && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && h ? (r.child = fu(r, n.child, null, d), r.child = fu(r, null, S, d)) : Wt(n, r, S, d), r.memoizedState = o.state, c && gv(r, l, !0), r.child;
  }
  function ly(n) {
    var r = n.stateNode;
    r.pendingContext ? Fi(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Fi(n, r.context, !1), nd(n, r.containerInfo);
  }
  function Hv(n, r, l, o, c) {
    return Ht(), Jf(c), r.flags |= 256, Wt(n, r, l, o), r.child;
  }
  var Vo = { dehydrated: null, treeContext: null, retryLane: 0 };
  function _l(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Fv(n, r, l) {
    var o = r.pendingProps, c = Nt.current, d = !1, h = (r.flags & 128) !== 0, S;
    if ((S = h) || (S = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), S ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), ot(Nt, c & 1), n === null)
      return Ps(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (h = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, h = { mode: "hidden", children: h }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = h) : d = Lc(h, o, 0, null), n = Ul(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = _l(l), r.memoizedState = Vo, n) : hc(r, h));
    if (c = n.memoizedState, c !== null && (S = c.dehydrated, S !== null)) return cd(n, r, h, o, S, c, l);
    if (d) {
      d = o.fallback, h = r.mode, c = n.child, S = c.sibling;
      var C = { mode: "hidden", children: o.children };
      return !(h & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = C, r.deletions = null) : (o = Wi(c, C), o.subtreeFlags = c.subtreeFlags & 14680064), S !== null ? d = Wi(S, d) : (d = Ul(d, h, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, h = n.child.memoizedState, h = h === null ? _l(l) : { baseLanes: h.baseLanes | l, cachePool: null, transitions: h.transitions }, d.memoizedState = h, d.childLanes = n.childLanes & ~l, r.memoizedState = Vo, o;
    }
    return d = n.child, n = d.sibling, o = Wi(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function hc(n, r) {
    return r = Lc({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function mc(n, r, l, o) {
    return o !== null && Jf(o), fu(r, n.child, null, l), n = hc(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function cd(n, r, l, o, c, d, h) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = od(Error(M(422))), mc(n, r, h, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Lc({ mode: "visible", children: o.children }, c, 0, null), d = Ul(d, c, h, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && fu(r, n.child, null, h), r.child.memoizedState = _l(h), r.memoizedState = Vo, d);
    if (!(r.mode & 1)) return mc(n, r, h, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var S = o.dgst;
      return o = S, d = Error(M(419)), o = od(d, o, void 0), mc(n, r, h, o);
    }
    if (S = (h & n.childLanes) !== 0, Er || S) {
      if (o = Yt, o !== null) {
        switch (h & -h) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | h) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, fi(n, c), Ft(o, n, c, -1));
      }
      return Io(), o = od(Error(M(421))), mc(n, r, h, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Cd.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, yr = _a(c.nextSibling), Hr = r, kt = !0, ra = null, n !== null && (mr[Qn++] = kn, mr[Qn++] = si, mr[Qn++] = na, kn = n.id, si = n.overflow, na = r), r = hc(r, o.children), r.flags |= 4096, r);
  }
  function jv(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), td(n.return, r, l);
  }
  function yc(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function fd(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (Wt(n, r, o.children, l), o = Nt.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && jv(n, l, r);
        else if (n.tag === 19) jv(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (ot(Nt, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Xs(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), yc(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Xs(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        yc(r, !0, l, null, d);
        break;
      case "together":
        yc(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Bo(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Gt(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Ll |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(M(153));
    if (r.child !== null) {
      for (n = r.child, l = Wi(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Wi(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function pi(n, r, l) {
    switch (r.tag) {
      case 3:
        ly(r), Ht();
        break;
      case 5:
        bv(r);
        break;
      case 1:
        Mt(r.type) && js(r);
        break;
      case 4:
        nd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        ot(ci, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (ot(Nt, Nt.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Fv(n, r, l) : (ot(Nt, Nt.current & 1), n = Gt(n, r, l), n !== null ? n.sibling : null);
        ot(Nt, Nt.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return fd(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), ot(Nt, Nt.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Cr(n, r, l);
    }
    return Gt(n, r, l);
  }
  var $a, xu, wu, ua;
  $a = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, xu = function() {
  }, wu = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, Tl(Oa.current);
      var d = null;
      switch (l) {
        case "input":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        case "select":
          c = re({}, c, { value: void 0 }), o = re({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Ea(n, c), o = Ea(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Fs);
      }
      vn(l, o);
      var h;
      l = null;
      for (O in c) if (!o.hasOwnProperty(O) && c.hasOwnProperty(O) && c[O] != null) if (O === "style") {
        var S = c[O];
        for (h in S) S.hasOwnProperty(h) && (l || (l = {}), l[h] = "");
      } else O !== "dangerouslySetInnerHTML" && O !== "children" && O !== "suppressContentEditableWarning" && O !== "suppressHydrationWarning" && O !== "autoFocus" && (Lt.hasOwnProperty(O) ? d || (d = []) : (d = d || []).push(O, null));
      for (O in o) {
        var C = o[O];
        if (S = c != null ? c[O] : void 0, o.hasOwnProperty(O) && C !== S && (C != null || S != null)) if (O === "style") if (S) {
          for (h in S) !S.hasOwnProperty(h) || C && C.hasOwnProperty(h) || (l || (l = {}), l[h] = "");
          for (h in C) C.hasOwnProperty(h) && S[h] !== C[h] && (l || (l = {}), l[h] = C[h]);
        } else l || (d || (d = []), d.push(
          O,
          l
        )), l = C;
        else O === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, S = S ? S.__html : void 0, C != null && S !== C && (d = d || []).push(O, C)) : O === "children" ? typeof C != "string" && typeof C != "number" || (d = d || []).push(O, "" + C) : O !== "suppressContentEditableWarning" && O !== "suppressHydrationWarning" && (Lt.hasOwnProperty(O) ? (C != null && O === "onScroll" && Et("scroll", n), d || S === C || (d = [])) : (d = d || []).push(O, C));
      }
      l && (d = d || []).push("style", l);
      var O = d;
      (r.updateQueue = O) && (r.flags |= 4);
    }
  }, ua = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function $t(n, r) {
    if (!kt) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function Gn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function uy(n, r, l) {
    var o = r.pendingProps;
    switch (Kf(r), r.tag) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Gn(r), null;
      case 1:
        return Mt(r.type) && ta(), Gn(r), null;
      case 3:
        return o = r.stateNode, hu(), lt(Pt), lt(be), ad(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && ($s(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, ra !== null && (gd(ra), ra = null))), xu(n, r), Gn(r), null;
      case 5:
        rd(r);
        var c = Tl(Lo.current);
        if (l = r.type, n !== null && r.stateNode != null) wu(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(M(166));
            return Gn(r), null;
          }
          if (n = Tl(Oa.current), $s(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Va] = r, o[gl] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Et("cancel", o), Et("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Et("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < To.length; c++) Et(To[c], o);
                break;
              case "source":
                Et("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Et(
                  "error",
                  o
                ), Et("load", o);
                break;
              case "details":
                Et("toggle", o);
                break;
              case "input":
                Dn(o, d), Et("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Et("invalid", o);
                break;
              case "textarea":
                kr(o, d), Et("invalid", o);
            }
            vn(l, d), c = null;
            for (var h in d) if (d.hasOwnProperty(h)) {
              var S = d[h];
              h === "children" ? typeof S == "string" ? o.textContent !== S && (d.suppressHydrationWarning !== !0 && Hs(o.textContent, S, n), c = ["children", S]) : typeof S == "number" && o.textContent !== "" + S && (d.suppressHydrationWarning !== !0 && Hs(
                o.textContent,
                S,
                n
              ), c = ["children", "" + S]) : Lt.hasOwnProperty(h) && S != null && h === "onScroll" && Et("scroll", o);
            }
            switch (l) {
              case "input":
                sr(o), Gr(o, d, !0);
                break;
              case "textarea":
                sr(o), _r(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = Fs);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            h = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Ca(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = h.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = h.createElement(l, { is: o.is }) : (n = h.createElement(l), l === "select" && (h = n, o.multiple ? h.multiple = !0 : o.size && (h.size = o.size))) : n = h.createElementNS(n, l), n[Va] = r, n[gl] = o, $a(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (h = It(l, o), l) {
                case "dialog":
                  Et("cancel", n), Et("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Et("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < To.length; c++) Et(To[c], n);
                  c = o;
                  break;
                case "source":
                  Et("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Et(
                    "error",
                    n
                  ), Et("load", n), c = o;
                  break;
                case "details":
                  Et("toggle", n), c = o;
                  break;
                case "input":
                  Dn(n, o), c = Bn(n, o), Et("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = re({}, o, { value: void 0 }), Et("invalid", n);
                  break;
                case "textarea":
                  kr(n, o), c = Ea(n, o), Et("invalid", n);
                  break;
                default:
                  c = o;
              }
              vn(l, c), S = c;
              for (d in S) if (S.hasOwnProperty(d)) {
                var C = S[d];
                d === "style" ? ct(n, C) : d === "dangerouslySetInnerHTML" ? (C = C ? C.__html : void 0, C != null && ki(n, C)) : d === "children" ? typeof C == "string" ? (l !== "textarea" || C !== "") && Ta(n, C) : typeof C == "number" && Ta(n, "" + C) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Lt.hasOwnProperty(d) ? C != null && d === "onScroll" && Et("scroll", n) : C != null && Be(n, d, C, h));
              }
              switch (l) {
                case "input":
                  sr(n), Gr(n, o, !1);
                  break;
                case "textarea":
                  sr(n), _r(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + Vn(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Aa(n, !!o.multiple, d, !1) : o.defaultValue != null && Aa(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Fs);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Gn(r), null;
      case 6:
        if (n && r.stateNode != null) ua(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(M(166));
          if (l = Tl(Lo.current), Tl(Oa.current), $s(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Va] = r, (d = o.nodeValue !== l) && (n = Hr, n !== null)) switch (n.tag) {
              case 3:
                Hs(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Hs(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Va] = r, r.stateNode = o;
        }
        return Gn(r), null;
      case 13:
        if (lt(Nt), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (kt && yr !== null && r.mode & 1 && !(r.flags & 128)) Cv(), Ht(), r.flags |= 98560, d = !1;
          else if (d = $s(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(M(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(M(317));
              d[Va] = r;
            } else Ht(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Gn(r), d = !1;
          } else ra !== null && (gd(ra), ra = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || Nt.current & 1 ? on === 0 && (on = 3) : Io())), r.updateQueue !== null && (r.flags |= 4), Gn(r), null);
      case 4:
        return hu(), xu(n, r), n === null && ou(r.stateNode.containerInfo), Gn(r), null;
      case 10:
        return ed(r.type._context), Gn(r), null;
      case 17:
        return Mt(r.type) && ta(), Gn(r), null;
      case 19:
        if (lt(Nt), d = r.memoizedState, d === null) return Gn(r), null;
        if (o = (r.flags & 128) !== 0, h = d.rendering, h === null) if (o) $t(d, !1);
        else {
          if (on !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (h = Xs(n), h !== null) {
              for (r.flags |= 128, $t(d, !1), o = h.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, h = d.alternate, h === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = h.childLanes, d.lanes = h.lanes, d.child = h.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = h.memoizedProps, d.memoizedState = h.memoizedState, d.updateQueue = h.updateQueue, d.type = h.type, n = h.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return ot(Nt, Nt.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && ut() > Uu && (r.flags |= 128, o = !0, $t(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Xs(h), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), $t(d, !0), d.tail === null && d.tailMode === "hidden" && !h.alternate && !kt) return Gn(r), null;
          } else 2 * ut() - d.renderingStartTime > Uu && l !== 1073741824 && (r.flags |= 128, o = !0, $t(d, !1), r.lanes = 4194304);
          d.isBackwards ? (h.sibling = r.child, r.child = h) : (l = d.last, l !== null ? l.sibling = h : r.child = h, d.last = h);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = ut(), r.sibling = null, l = Nt.current, ot(Nt, o ? l & 1 | 2 : l & 1), r) : (Gn(r), null);
      case 22:
      case 23:
        return kc(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? Tr & 1073741824 && (Gn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Gn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(M(156, r.tag));
  }
  function oy(n, r) {
    switch (Kf(r), r.tag) {
      case 1:
        return Mt(r.type) && ta(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return hu(), lt(Pt), lt(be), ad(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return rd(r), null;
      case 13:
        if (lt(Nt), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(M(340));
          Ht();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return lt(Nt), null;
      case 4:
        return hu(), null;
      case 10:
        return ed(r.type._context), null;
      case 22:
      case 23:
        return kc(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Du = !1, On = !1, gc = typeof WeakSet == "function" ? WeakSet : Set, ie = null;
  function bu(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      Qt(n, r, o);
    }
    else l.current = null;
  }
  function dd(n, r, l) {
    try {
      l();
    } catch (o) {
      Qt(n, r, o);
    }
  }
  var Sc = !1;
  function sy(n, r) {
    if ($f = fl, n = Ms(), ii(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var h = 0, S = -1, C = -1, O = 0, j = 0, B = n, F = null;
          t: for (; ; ) {
            for (var ee; B !== l || c !== 0 && B.nodeType !== 3 || (S = h + c), B !== d || o !== 0 && B.nodeType !== 3 || (C = h + o), B.nodeType === 3 && (h += B.nodeValue.length), (ee = B.firstChild) !== null; )
              F = B, B = ee;
            for (; ; ) {
              if (B === n) break t;
              if (F === l && ++O === c && (S = h), F === d && ++j === o && (C = h), (ee = B.nextSibling) !== null) break;
              B = F, F = B.parentNode;
            }
            B = ee;
          }
          l = S === -1 || C === -1 ? null : { start: S, end: C };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (ml = { focusedElem: n, selectionRange: l }, fl = !1, ie = r; ie !== null; ) if (r = ie, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, ie = n;
    else for (; ie !== null; ) {
      r = ie;
      try {
        var ue = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ue !== null) {
              var fe = ue.memoizedProps, Xt = ue.memoizedState, w = r.stateNode, R = w.getSnapshotBeforeUpdate(r.elementType === r.type ? fe : Sr(r.type, fe), Xt);
              w.__reactInternalSnapshotBeforeUpdate = R;
            }
            break;
          case 3:
            var k = r.stateNode.containerInfo;
            k.nodeType === 1 ? k.textContent = "" : k.nodeType === 9 && k.documentElement && k.removeChild(k.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(M(163));
        }
      } catch ($) {
        Qt(r, r.return, $);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, ie = n;
        break;
      }
      ie = r.return;
    }
    return ue = Sc, Sc = !1, ue;
  }
  function ku(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && dd(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ec(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Cc(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function Vv(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Vv(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Va], delete r[gl], delete r[If], delete r[ry], delete r[Wf])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function pd(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Bv(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || pd(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Po(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Fs));
    else if (o !== 4 && (n = n.child, n !== null)) for (Po(n, r, l), n = n.sibling; n !== null; ) Po(n, r, l), n = n.sibling;
  }
  function _u(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (_u(n, r, l), n = n.sibling; n !== null; ) _u(n, r, l), n = n.sibling;
  }
  var zt = null, Sn = !1;
  function Zn(n, r, l) {
    for (l = l.child; l !== null; ) Ou(n, r, l), l = l.sibling;
  }
  function Ou(n, r, l) {
    if (xa && typeof xa.onCommitFiberUnmount == "function") try {
      xa.onCommitFiberUnmount(io, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        On || bu(l, r);
      case 6:
        var o = zt, c = Sn;
        zt = null, Zn(n, r, l), zt = o, Sn = c, zt !== null && (Sn ? (n = zt, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : zt.removeChild(l.stateNode));
        break;
      case 18:
        zt !== null && (Sn ? (n = zt, l = l.stateNode, n.nodeType === 8 ? Ui(n.parentNode, l) : n.nodeType === 1 && Ui(n, l), co(n)) : Ui(zt, l.stateNode));
        break;
      case 4:
        o = zt, c = Sn, zt = l.stateNode.containerInfo, Sn = !0, Zn(n, r, l), zt = o, Sn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!On && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, h = d.destroy;
            d = d.tag, h !== void 0 && (d & 2 || d & 4) && dd(l, r, h), c = c.next;
          } while (c !== o);
        }
        Zn(n, r, l);
        break;
      case 1:
        if (!On && (bu(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (S) {
          Qt(l, r, S);
        }
        Zn(n, r, l);
        break;
      case 21:
        Zn(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (On = (o = On) || l.memoizedState !== null, Zn(n, r, l), On = o) : Zn(n, r, l);
        break;
      default:
        Zn(n, r, l);
    }
  }
  function Lu(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new gc()), r.forEach(function(o) {
        var c = my.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function En(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, h = r, S = h;
        e: for (; S !== null; ) {
          switch (S.tag) {
            case 5:
              zt = S.stateNode, Sn = !1;
              break e;
            case 3:
              zt = S.stateNode.containerInfo, Sn = !0;
              break e;
            case 4:
              zt = S.stateNode.containerInfo, Sn = !0;
              break e;
          }
          S = S.return;
        }
        if (zt === null) throw Error(M(160));
        Ou(d, h, c), zt = null, Sn = !1;
        var C = c.alternate;
        C !== null && (C.return = null), c.return = null;
      } catch (O) {
        Qt(c, r, O);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Pv(r, n), r = r.sibling;
  }
  function Pv(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (En(r, n), Ya(n), o & 4) {
          try {
            ku(3, n, n.return), Ec(3, n);
          } catch (fe) {
            Qt(n, n.return, fe);
          }
          try {
            ku(5, n, n.return);
          } catch (fe) {
            Qt(n, n.return, fe);
          }
        }
        break;
      case 1:
        En(r, n), Ya(n), o & 512 && l !== null && bu(l, l.return);
        break;
      case 5:
        if (En(r, n), Ya(n), o & 512 && l !== null && bu(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            Ta(c, "");
          } catch (fe) {
            Qt(n, n.return, fe);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, h = l !== null ? l.memoizedProps : d, S = n.type, C = n.updateQueue;
          if (n.updateQueue = null, C !== null) try {
            S === "input" && d.type === "radio" && d.name != null && bn(c, d), It(S, h);
            var O = It(S, d);
            for (h = 0; h < C.length; h += 2) {
              var j = C[h], B = C[h + 1];
              j === "style" ? ct(c, B) : j === "dangerouslySetInnerHTML" ? ki(c, B) : j === "children" ? Ta(c, B) : Be(c, j, B, O);
            }
            switch (S) {
              case "input":
                Pn(c, d);
                break;
              case "textarea":
                Ha(c, d);
                break;
              case "select":
                var F = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var ee = d.value;
                ee != null ? Aa(c, !!d.multiple, ee, !1) : F !== !!d.multiple && (d.defaultValue != null ? Aa(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Aa(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[gl] = d;
          } catch (fe) {
            Qt(n, n.return, fe);
          }
        }
        break;
      case 6:
        if (En(r, n), Ya(n), o & 4) {
          if (n.stateNode === null) throw Error(M(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (fe) {
            Qt(n, n.return, fe);
          }
        }
        break;
      case 3:
        if (En(r, n), Ya(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          co(r.containerInfo);
        } catch (fe) {
          Qt(n, n.return, fe);
        }
        break;
      case 4:
        En(r, n), Ya(n);
        break;
      case 13:
        En(r, n), Ya(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Rc = ut())), o & 4 && Lu(n);
        break;
      case 22:
        if (j = l !== null && l.memoizedState !== null, n.mode & 1 ? (On = (O = On) || j, En(r, n), On = O) : En(r, n), Ya(n), o & 8192) {
          if (O = n.memoizedState !== null, (n.stateNode.isHidden = O) && !j && n.mode & 1) for (ie = n, j = n.child; j !== null; ) {
            for (B = ie = j; ie !== null; ) {
              switch (F = ie, ee = F.child, F.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  ku(4, F, F.return);
                  break;
                case 1:
                  bu(F, F.return);
                  var ue = F.stateNode;
                  if (typeof ue.componentWillUnmount == "function") {
                    o = F, l = F.return;
                    try {
                      r = o, ue.props = r.memoizedProps, ue.state = r.memoizedState, ue.componentWillUnmount();
                    } catch (fe) {
                      Qt(o, l, fe);
                    }
                  }
                  break;
                case 5:
                  bu(F, F.return);
                  break;
                case 22:
                  if (F.memoizedState !== null) {
                    $v(B);
                    continue;
                  }
              }
              ee !== null ? (ee.return = F, ie = ee) : $v(B);
            }
            j = j.sibling;
          }
          e: for (j = null, B = n; ; ) {
            if (B.tag === 5) {
              if (j === null) {
                j = B;
                try {
                  c = B.stateNode, O ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (S = B.stateNode, C = B.memoizedProps.style, h = C != null && C.hasOwnProperty("display") ? C.display : null, S.style.display = He("display", h));
                } catch (fe) {
                  Qt(n, n.return, fe);
                }
              }
            } else if (B.tag === 6) {
              if (j === null) try {
                B.stateNode.nodeValue = O ? "" : B.memoizedProps;
              } catch (fe) {
                Qt(n, n.return, fe);
              }
            } else if ((B.tag !== 22 && B.tag !== 23 || B.memoizedState === null || B === n) && B.child !== null) {
              B.child.return = B, B = B.child;
              continue;
            }
            if (B === n) break e;
            for (; B.sibling === null; ) {
              if (B.return === null || B.return === n) break e;
              j === B && (j = null), B = B.return;
            }
            j === B && (j = null), B.sibling.return = B.return, B = B.sibling;
          }
        }
        break;
      case 19:
        En(r, n), Ya(n), o & 4 && Lu(n);
        break;
      case 21:
        break;
      default:
        En(
          r,
          n
        ), Ya(n);
    }
  }
  function Ya(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (pd(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(M(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (Ta(c, ""), o.flags &= -33);
            var d = Bv(n);
            _u(n, d, c);
            break;
          case 3:
          case 4:
            var h = o.stateNode.containerInfo, S = Bv(n);
            Po(n, S, h);
            break;
          default:
            throw Error(M(161));
        }
      } catch (C) {
        Qt(n, n.return, C);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function cy(n, r, l) {
    ie = n, vd(n);
  }
  function vd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; ie !== null; ) {
      var c = ie, d = c.child;
      if (c.tag === 22 && o) {
        var h = c.memoizedState !== null || Du;
        if (!h) {
          var S = c.alternate, C = S !== null && S.memoizedState !== null || On;
          S = Du;
          var O = On;
          if (Du = h, (On = C) && !O) for (ie = c; ie !== null; ) h = ie, C = h.child, h.tag === 22 && h.memoizedState !== null ? hd(c) : C !== null ? (C.return = h, ie = C) : hd(c);
          for (; d !== null; ) ie = d, vd(d), d = d.sibling;
          ie = c, Du = S, On = O;
        }
        Mu(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, ie = d) : Mu(n);
    }
  }
  function Mu(n) {
    for (; ie !== null; ) {
      var r = ie;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              On || Ec(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !On) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : Sr(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Dv(r, d, o);
              break;
            case 3:
              var h = r.updateQueue;
              if (h !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Dv(r, h, l);
              }
              break;
            case 5:
              var S = r.stateNode;
              if (l === null && r.flags & 4) {
                l = S;
                var C = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    C.autoFocus && l.focus();
                    break;
                  case "img":
                    C.src && (l.src = C.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (r.memoizedState === null) {
                var O = r.alternate;
                if (O !== null) {
                  var j = O.memoizedState;
                  if (j !== null) {
                    var B = j.dehydrated;
                    B !== null && co(B);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(M(163));
          }
          On || r.flags & 512 && Cc(r);
        } catch (F) {
          Qt(r, r.return, F);
        }
      }
      if (r === n) {
        ie = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ie = l;
        break;
      }
      ie = r.return;
    }
  }
  function $v(n) {
    for (; ie !== null; ) {
      var r = ie;
      if (r === n) {
        ie = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ie = l;
        break;
      }
      ie = r.return;
    }
  }
  function hd(n) {
    for (; ie !== null; ) {
      var r = ie;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Ec(4, r);
            } catch (C) {
              Qt(r, l, C);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (C) {
                Qt(r, c, C);
              }
            }
            var d = r.return;
            try {
              Cc(r);
            } catch (C) {
              Qt(r, d, C);
            }
            break;
          case 5:
            var h = r.return;
            try {
              Cc(r);
            } catch (C) {
              Qt(r, h, C);
            }
        }
      } catch (C) {
        Qt(r, r.return, C);
      }
      if (r === n) {
        ie = null;
        break;
      }
      var S = r.sibling;
      if (S !== null) {
        S.return = r.return, ie = S;
        break;
      }
      ie = r.return;
    }
  }
  var fy = Math.ceil, Ol = gt.ReactCurrentDispatcher, Tc = gt.ReactCurrentOwner, oa = gt.ReactCurrentBatchConfig, Ye = 0, Yt = null, _t = null, un = 0, Tr = 0, Nu = ze(0), on = 0, $o = null, Ll = 0, zu = 0, md = 0, Qi = null, Xn = null, Rc = 0, Uu = 1 / 0, vi = null, xc = !1, yd = null, sa = null, Au = !1, ca = null, wc = 0, Yo = 0, Dc = null, Qo = -1, Ml = 0;
  function Cn() {
    return Ye & 6 ? ut() : Qo !== -1 ? Qo : Qo = ut();
  }
  function hi(n) {
    return n.mode & 1 ? Ye & 2 && un !== 0 ? un & -un : Ys.transition !== null ? (Ml === 0 && (Ml = Es()), Ml) : (n = ft, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Rf(n.type)), n) : 1;
  }
  function Ft(n, r, l, o) {
    if (50 < Yo) throw Yo = 0, Dc = null, Error(M(185));
    cl(n, l, o), (!(Ye & 2) || n !== Yt) && (n === Yt && (!(Ye & 2) && (zu |= l), on === 4 && Qa(n, un)), sn(n, o), l === 1 && Ye === 0 && !(r.mode & 1) && (Uu = ut() + 500, gn && vr()));
  }
  function sn(n, r) {
    var l = n.callbackNode;
    Ss(n, r);
    var o = wa(n, n === Yt ? un : 0);
    if (o === 0) l !== null && At(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && At(l), r === 1) n.tag === 0 ? Xf(Hu.bind(null, n)) : Gf(Hu.bind(null, n)), Qf(function() {
        !(Ye & 6) && vr();
      }), l = null;
      else {
        switch (Ef(o)) {
          case 1:
            l = Nr;
            break;
          case 4:
            l = je;
            break;
          case 16:
            l = ja;
            break;
          case 536870912:
            l = mf;
            break;
          default:
            l = ja;
        }
        l = Kv(l, bc.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function bc(n, r) {
    if (Qo = -1, Ml = 0, Ye & 6) throw Error(M(327));
    var l = n.callbackNode;
    if (Fu() && n.callbackNode !== l) return null;
    var o = wa(n, n === Yt ? un : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = _c(n, o);
    else {
      r = o;
      var c = Ye;
      Ye |= 2;
      var d = Qv();
      (Yt !== n || un !== r) && (vi = null, Uu = ut() + 500, zl(n, r));
      do
        try {
          py();
          break;
        } catch (S) {
          Yv(n, S);
        }
      while (!0);
      Fr(), Ol.current = d, Ye = c, _t !== null ? r = 0 : (Yt = null, un = 0, r = on);
    }
    if (r !== 0) {
      if (r === 2 && (c = gf(n), c !== 0 && (o = c, r = Nl(n, c))), r === 1) throw l = $o, zl(n, 0), Qa(n, o), sn(n, ut()), l;
      if (r === 6) Qa(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !Sd(c) && (r = _c(n, o), r === 2 && (d = gf(n), d !== 0 && (o = d, r = Nl(n, d))), r === 1)) throw l = $o, zl(n, 0), Qa(n, o), sn(n, ut()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(M(345));
          case 2:
            Ii(n, Xn, vi);
            break;
          case 3:
            if (Qa(n, o), (o & 130023424) === o && (r = Rc + 500 - ut(), 10 < r)) {
              if (wa(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Cn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = yl(Ii.bind(null, n, Xn, vi), r);
              break;
            }
            Ii(n, Xn, vi);
            break;
          case 4:
            if (Qa(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var h = 31 - Xr(o);
              d = 1 << h, h = r[h], h > c && (c = h), o &= ~d;
            }
            if (o = c, o = ut() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * fy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = yl(Ii.bind(null, n, Xn, vi), o);
              break;
            }
            Ii(n, Xn, vi);
            break;
          case 5:
            Ii(n, Xn, vi);
            break;
          default:
            throw Error(M(329));
        }
      }
    }
    return sn(n, ut()), n.callbackNode === l ? bc.bind(null, n) : null;
  }
  function Nl(n, r) {
    var l = Qi;
    return n.current.memoizedState.isDehydrated && (zl(n, r).flags |= 256), n = _c(n, r), n !== 2 && (r = Xn, Xn = l, r !== null && gd(r)), n;
  }
  function gd(n) {
    Xn === null ? Xn = n : Xn.push.apply(Xn, n);
  }
  function Sd(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Zr(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function Qa(n, r) {
    for (r &= ~md, r &= ~zu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Xr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Hu(n) {
    if (Ye & 6) throw Error(M(327));
    Fu();
    var r = wa(n, 0);
    if (!(r & 1)) return sn(n, ut()), null;
    var l = _c(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = gf(n);
      o !== 0 && (r = o, l = Nl(n, o));
    }
    if (l === 1) throw l = $o, zl(n, 0), Qa(n, r), sn(n, ut()), l;
    if (l === 6) throw Error(M(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Ii(n, Xn, vi), sn(n, ut()), null;
  }
  function Ed(n, r) {
    var l = Ye;
    Ye |= 1;
    try {
      return n(r);
    } finally {
      Ye = l, Ye === 0 && (Uu = ut() + 500, gn && vr());
    }
  }
  function Ia(n) {
    ca !== null && ca.tag === 0 && !(Ye & 6) && Fu();
    var r = Ye;
    Ye |= 1;
    var l = oa.transition, o = ft;
    try {
      if (oa.transition = null, ft = 1, n) return n();
    } finally {
      ft = o, oa.transition = l, Ye = r, !(Ye & 6) && vr();
    }
  }
  function kc() {
    Tr = Nu.current, lt(Nu);
  }
  function zl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, yv(l)), _t !== null) for (l = _t.return; l !== null; ) {
      var o = l;
      switch (Kf(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ta();
          break;
        case 3:
          hu(), lt(Pt), lt(be), ad();
          break;
        case 5:
          rd(o);
          break;
        case 4:
          hu();
          break;
        case 13:
          lt(Nt);
          break;
        case 19:
          lt(Nt);
          break;
        case 10:
          ed(o.type._context);
          break;
        case 22:
        case 23:
          kc();
      }
      l = l.return;
    }
    if (Yt = n, _t = n = Wi(n.current, null), un = Tr = r, on = 0, $o = null, md = zu = Ll = 0, Xn = Qi = null, Cl !== null) {
      for (r = 0; r < Cl.length; r++) if (l = Cl[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var h = d.next;
          d.next = c, o.next = h;
        }
        l.pending = o;
      }
      Cl = null;
    }
    return n;
  }
  function Yv(n, r) {
    do {
      var l = _t;
      try {
        if (Fr(), Ks.current = Wn, jr) {
          for (var o = ve.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          jr = !1;
        }
        if (de = 0, Ve = ke = ve = null, mu = !1, No = 0, Tc.current = null, l === null || l.return === null) {
          on = 1, $o = r, _t = null;
          break;
        }
        e: {
          var d = n, h = l.return, S = l, C = r;
          if (r = un, S.flags |= 32768, C !== null && typeof C == "object" && typeof C.then == "function") {
            var O = C, j = S, B = j.tag;
            if (!(j.mode & 1) && (B === 0 || B === 11 || B === 15)) {
              var F = j.alternate;
              F ? (j.updateQueue = F.updateQueue, j.memoizedState = F.memoizedState, j.lanes = F.lanes) : (j.updateQueue = null, j.memoizedState = null);
            }
            var ee = Uv(h);
            if (ee !== null) {
              ee.flags &= -257, sd(ee, h, S, d, r), ee.mode & 1 && Fo(d, O, r), r = ee, C = O;
              var ue = r.updateQueue;
              if (ue === null) {
                var fe = /* @__PURE__ */ new Set();
                fe.add(C), r.updateQueue = fe;
              } else ue.add(C);
              break e;
            } else {
              if (!(r & 1)) {
                Fo(d, O, r), Io();
                break e;
              }
              C = Error(M(426));
            }
          } else if (kt && S.mode & 1) {
            var Xt = Uv(h);
            if (Xt !== null) {
              !(Xt.flags & 65536) && (Xt.flags |= 256), sd(Xt, h, S, d, r), Jf($i(C, S));
              break e;
            }
          }
          d = C = $i(C, S), on !== 4 && (on = 2), Qi === null ? Qi = [d] : Qi.push(d), d = h;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var w = Nv(d, C, r);
                wv(d, w);
                break e;
              case 1:
                S = C;
                var R = d.type, k = d.stateNode;
                if (!(d.flags & 128) && (typeof R.getDerivedStateFromError == "function" || k !== null && typeof k.componentDidCatch == "function" && (sa === null || !sa.has(k)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var $ = zv(d, S, r);
                  wv(d, $);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Wv(l);
      } catch (pe) {
        r = pe, _t === l && l !== null && (_t = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Qv() {
    var n = Ol.current;
    return Ol.current = Wn, n === null ? Wn : n;
  }
  function Io() {
    (on === 0 || on === 3 || on === 2) && (on = 4), Yt === null || !(Ll & 268435455) && !(zu & 268435455) || Qa(Yt, un);
  }
  function _c(n, r) {
    var l = Ye;
    Ye |= 2;
    var o = Qv();
    (Yt !== n || un !== r) && (vi = null, zl(n, r));
    do
      try {
        dy();
        break;
      } catch (c) {
        Yv(n, c);
      }
    while (!0);
    if (Fr(), Ye = l, Ol.current = o, _t !== null) throw Error(M(261));
    return Yt = null, un = 0, on;
  }
  function dy() {
    for (; _t !== null; ) Iv(_t);
  }
  function py() {
    for (; _t !== null && !fr(); ) Iv(_t);
  }
  function Iv(n) {
    var r = qv(n.alternate, n, Tr);
    n.memoizedProps = n.pendingProps, r === null ? Wv(n) : _t = r, Tc.current = null;
  }
  function Wv(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = oy(l, r), l !== null) {
          l.flags &= 32767, _t = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          on = 6, _t = null;
          return;
        }
      } else if (l = uy(l, r, Tr), l !== null) {
        _t = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        _t = r;
        return;
      }
      _t = r = n;
    } while (r !== null);
    on === 0 && (on = 5);
  }
  function Ii(n, r, l) {
    var o = ft, c = oa.transition;
    try {
      oa.transition = null, ft = 1, vy(n, r, l, o);
    } finally {
      oa.transition = c, ft = o;
    }
    return null;
  }
  function vy(n, r, l, o) {
    do
      Fu();
    while (ca !== null);
    if (Ye & 6) throw Error(M(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(M(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (jm(n, d), n === Yt && (_t = Yt = null, un = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Au || (Au = !0, Kv(ja, function() {
      return Fu(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = oa.transition, oa.transition = null;
      var h = ft;
      ft = 1;
      var S = Ye;
      Ye |= 4, Tc.current = null, sy(n, l), Pv(l, n), Ns(ml), fl = !!$f, ml = $f = null, n.current = l, cy(l), Oi(), Ye = S, ft = h, oa.transition = d;
    } else n.current = l;
    if (Au && (Au = !1, ca = n, wc = c), d = n.pendingLanes, d === 0 && (sa = null), Lp(l.stateNode), sn(n, ut()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (xc) throw xc = !1, n = yd, yd = null, n;
    return wc & 1 && n.tag !== 0 && Fu(), d = n.pendingLanes, d & 1 ? n === Dc ? Yo++ : (Yo = 0, Dc = n) : Yo = 0, vr(), null;
  }
  function Fu() {
    if (ca !== null) {
      var n = Ef(wc), r = oa.transition, l = ft;
      try {
        if (oa.transition = null, ft = 16 > n ? 16 : n, ca === null) var o = !1;
        else {
          if (n = ca, ca = null, wc = 0, Ye & 6) throw Error(M(331));
          var c = Ye;
          for (Ye |= 4, ie = n.current; ie !== null; ) {
            var d = ie, h = d.child;
            if (ie.flags & 16) {
              var S = d.deletions;
              if (S !== null) {
                for (var C = 0; C < S.length; C++) {
                  var O = S[C];
                  for (ie = O; ie !== null; ) {
                    var j = ie;
                    switch (j.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ku(8, j, d);
                    }
                    var B = j.child;
                    if (B !== null) B.return = j, ie = B;
                    else for (; ie !== null; ) {
                      j = ie;
                      var F = j.sibling, ee = j.return;
                      if (Vv(j), j === O) {
                        ie = null;
                        break;
                      }
                      if (F !== null) {
                        F.return = ee, ie = F;
                        break;
                      }
                      ie = ee;
                    }
                  }
                }
                var ue = d.alternate;
                if (ue !== null) {
                  var fe = ue.child;
                  if (fe !== null) {
                    ue.child = null;
                    do {
                      var Xt = fe.sibling;
                      fe.sibling = null, fe = Xt;
                    } while (fe !== null);
                  }
                }
                ie = d;
              }
            }
            if (d.subtreeFlags & 2064 && h !== null) h.return = d, ie = h;
            else e: for (; ie !== null; ) {
              if (d = ie, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  ku(9, d, d.return);
              }
              var w = d.sibling;
              if (w !== null) {
                w.return = d.return, ie = w;
                break e;
              }
              ie = d.return;
            }
          }
          var R = n.current;
          for (ie = R; ie !== null; ) {
            h = ie;
            var k = h.child;
            if (h.subtreeFlags & 2064 && k !== null) k.return = h, ie = k;
            else e: for (h = R; ie !== null; ) {
              if (S = ie, S.flags & 2048) try {
                switch (S.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ec(9, S);
                }
              } catch (pe) {
                Qt(S, S.return, pe);
              }
              if (S === h) {
                ie = null;
                break e;
              }
              var $ = S.sibling;
              if ($ !== null) {
                $.return = S.return, ie = $;
                break e;
              }
              ie = S.return;
            }
          }
          if (Ye = c, vr(), xa && typeof xa.onPostCommitFiberRoot == "function") try {
            xa.onPostCommitFiberRoot(io, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        ft = l, oa.transition = r;
      }
    }
    return !1;
  }
  function Gv(n, r, l) {
    r = $i(l, r), r = Nv(n, r, 1), n = Bi(n, r, 1), r = Cn(), n !== null && (cl(n, 1, r), sn(n, r));
  }
  function Qt(n, r, l) {
    if (n.tag === 3) Gv(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Gv(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (sa === null || !sa.has(o))) {
          n = $i(l, n), n = zv(r, n, 1), r = Bi(r, n, 1), n = Cn(), r !== null && (cl(r, 1, n), sn(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function hy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Cn(), n.pingedLanes |= n.suspendedLanes & l, Yt === n && (un & l) === l && (on === 4 || on === 3 && (un & 130023424) === un && 500 > ut() - Rc ? zl(n, 0) : md |= l), sn(n, r);
  }
  function Xv(n, r) {
    r === 0 && (n.mode & 1 ? (r = Zl, Zl <<= 1, !(Zl & 130023424) && (Zl = 4194304)) : r = 1);
    var l = Cn();
    n = fi(n, r), n !== null && (cl(n, r, l), sn(n, l));
  }
  function Cd(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Xv(n, l);
  }
  function my(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(M(314));
    }
    o !== null && o.delete(r), Xv(n, l);
  }
  var qv;
  qv = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Pt.current) Er = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Er = !1, pi(n, r, l);
      Er = !!(n.flags & 131072);
    }
    else Er = !1, kt && r.flags & 1048576 && qf(r, cu, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        Bo(n, r), n = r.pendingProps;
        var c = ea(r, be.current);
        du(r, l), c = H(null, r, o, n, c, l);
        var d = tn();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mt(o) ? (d = !0, js(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Is(r), c.updater = bl, r.stateNode = c, c._reactInternals = r, ud(r, o, n, l), r = vc(null, r, o, !0, d, l)) : (r.tag = 0, kt && d && Vs(r), Wt(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (Bo(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = yy(o), n = Sr(o, n), c) {
            case 0:
              r = Ne(null, r, o, n, l);
              break e;
            case 1:
              r = jo(null, r, o, n, l);
              break e;
            case 11:
              r = Ru(null, r, o, n, l);
              break e;
            case 14:
              r = Yi(null, r, o, Sr(o.type, n), l);
              break e;
          }
          throw Error(M(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Sr(o, c), Ne(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Sr(o, c), jo(n, r, o, c, l);
      case 3:
        e: {
          if (ly(r), n === null) throw Error(M(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, pu(n, r), Gs(r, o, null, l);
          var h = r.memoizedState;
          if (o = h.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: h.cache, pendingSuspenseBoundaries: h.pendingSuspenseBoundaries, transitions: h.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = $i(Error(M(423)), r), r = Hv(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = $i(Error(M(424)), r), r = Hv(n, r, o, l, c);
            break e;
          } else for (yr = _a(r.stateNode.containerInfo.firstChild), Hr = r, kt = !0, ra = null, l = Rv(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ht(), o === c) {
              r = Gt(n, r, l);
              break e;
            }
            Wt(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return bv(r), n === null && Ps(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, h = c.children, wo(o, c) ? h = null : d !== null && wo(o, d) && (r.flags |= 32), kl(n, r), Wt(n, r, h, l), r.child;
      case 6:
        return n === null && Ps(r), null;
      case 13:
        return Fv(n, r, l);
      case 4:
        return nd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = fu(r, null, o, l) : Wt(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Sr(o, c), Ru(n, r, o, c, l);
      case 7:
        return Wt(n, r, r.pendingProps, l), r.child;
      case 8:
        return Wt(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Wt(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, h = c.value, ot(ci, o._currentValue), o._currentValue = h, d !== null) if (Zr(d.value, h)) {
            if (d.children === c.children && !Pt.current) {
              r = Gt(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var S = d.dependencies;
            if (S !== null) {
              h = d.child;
              for (var C = S.firstContext; C !== null; ) {
                if (C.context === o) {
                  if (d.tag === 1) {
                    C = gr(-1, l & -l), C.tag = 2;
                    var O = d.updateQueue;
                    if (O !== null) {
                      O = O.shared;
                      var j = O.pending;
                      j === null ? C.next = C : (C.next = j.next, j.next = C), O.pending = C;
                    }
                  }
                  d.lanes |= l, C = d.alternate, C !== null && (C.lanes |= l), td(
                    d.return,
                    l,
                    r
                  ), S.lanes |= l;
                  break;
                }
                C = C.next;
              }
            } else if (d.tag === 10) h = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (h = d.return, h === null) throw Error(M(341));
              h.lanes |= l, S = h.alternate, S !== null && (S.lanes |= l), td(h, l, r), h = d.sibling;
            } else h = d.child;
            if (h !== null) h.return = d;
            else for (h = d; h !== null; ) {
              if (h === r) {
                h = null;
                break;
              }
              if (d = h.sibling, d !== null) {
                d.return = h.return, h = d;
                break;
              }
              h = h.return;
            }
            d = h;
          }
          Wt(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, du(r, l), c = ia(c), o = o(c), r.flags |= 1, Wt(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = Sr(o, r.pendingProps), c = Sr(o.type, c), Yi(n, r, o, c, l);
      case 15:
        return pc(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Sr(o, c), Bo(n, r), r.tag = 1, Mt(o) ? (n = !0, js(r)) : n = !1, du(r, l), Ov(r, o, c), ud(r, o, c, l), vc(null, r, o, !0, n, l);
      case 19:
        return fd(n, r, l);
      case 22:
        return Cr(n, r, l);
    }
    throw Error(M(156, r.tag));
  };
  function Kv(n, r) {
    return Dt(n, r);
  }
  function Zv(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function fa(n, r, l, o) {
    return new Zv(n, r, l, o);
  }
  function Td(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function yy(n) {
    if (typeof n == "function") return Td(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === xn) return 11;
      if (n === dn) return 14;
    }
    return 2;
  }
  function Wi(n, r) {
    var l = n.alternate;
    return l === null ? (l = fa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Oc(n, r, l, o, c, d) {
    var h = 2;
    if (o = n, typeof n == "function") Td(n) && (h = 1);
    else if (typeof n == "string") h = 5;
    else e: switch (n) {
      case Ae:
        return Ul(l.children, c, d, r);
      case Rn:
        h = 8, c |= 8;
        break;
      case jn:
        return n = fa(12, l, r, c | 2), n.elementType = jn, n.lanes = d, n;
      case _e:
        return n = fa(13, l, r, c), n.elementType = _e, n.lanes = d, n;
      case Ie:
        return n = fa(19, l, r, c), n.elementType = Ie, n.lanes = d, n;
      case qn:
        return Lc(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Bt:
            h = 10;
            break e;
          case vt:
            h = 9;
            break e;
          case xn:
            h = 11;
            break e;
          case dn:
            h = 14;
            break e;
          case wt:
            h = 16, o = null;
            break e;
        }
        throw Error(M(130, n == null ? n : typeof n, ""));
    }
    return r = fa(h, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Ul(n, r, l, o) {
    return n = fa(7, n, o, r), n.lanes = l, n;
  }
  function Lc(n, r, l, o) {
    return n = fa(22, n, o, r), n.elementType = qn, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Mc(n, r, l) {
    return n = fa(6, n, null, r), n.lanes = l, n;
  }
  function Wo(n, r, l) {
    return r = fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Go(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Sf(0), this.expirationTimes = Sf(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Sf(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function Rd(n, r, l, o, c, d, h, S, C) {
    return n = new Go(n, r, l, S, C), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = fa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Is(d), n;
  }
  function Jv(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: xt, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function xd(n) {
    if (!n) return Ba;
    n = n._reactInternals;
    e: {
      if (me(n) !== n || n.tag !== 1) throw Error(M(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mt(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(M(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mt(l)) return ko(n, l, r);
    }
    return r;
  }
  function wd(n, r, l, o, c, d, h, S, C) {
    return n = Rd(l, o, !0, n, c, d, h, S, C), n.context = xd(null), l = n.current, o = Cn(), c = hi(l), d = gr(o, c), d.callback = r ?? null, Bi(l, d, c), n.current.lanes = c, cl(n, c, o), sn(n, o), n;
  }
  function Nc(n, r, l, o) {
    var c = r.current, d = Cn(), h = hi(c);
    return l = xd(l), r.context === null ? r.context = l : r.pendingContext = l, r = gr(d, h), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Bi(c, r, h), n !== null && (Ft(n, c, h, d), Ws(n, c, h)), h;
  }
  function Xo(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function eh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Dd(n, r) {
    eh(n, r), (n = n.alternate) && eh(n, r);
  }
  function gy() {
    return null;
  }
  var bd = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function zc(n) {
    this._internalRoot = n;
  }
  qo.prototype.render = zc.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(M(409));
    Nc(n, r, null, null);
  }, qo.prototype.unmount = zc.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Ia(function() {
        Nc(null, n, null, null);
      }), r[oi] = null;
    }
  };
  function qo(n) {
    this._internalRoot = n;
  }
  qo.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Up();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < ht.length && r !== 0 && r < ht[l].priority; l++) ;
      ht.splice(l, 0, n), l === 0 && Ap(n);
    }
  };
  function Gi(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Uc(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function th() {
  }
  function Sy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var O = Xo(h);
          d.call(O);
        };
      }
      var h = wd(r, o, n, 0, null, !1, !1, "", th);
      return n._reactRootContainer = h, n[oi] = h.current, ou(n.nodeType === 8 ? n.parentNode : n), Ia(), h;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var S = o;
      o = function() {
        var O = Xo(C);
        S.call(O);
      };
    }
    var C = Rd(n, 0, !1, null, null, !1, !1, "", th);
    return n._reactRootContainer = C, n[oi] = C.current, ou(n.nodeType === 8 ? n.parentNode : n), Ia(function() {
      Nc(r, C, l, o);
    }), C;
  }
  function Ac(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var h = d;
      if (typeof c == "function") {
        var S = c;
        c = function() {
          var C = Xo(h);
          S.call(C);
        };
      }
      Nc(r, h, n, c);
    } else h = Sy(l, r, n, c, o);
    return Xo(h);
  }
  zp = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = sl(r.pendingLanes);
          l !== 0 && (lo(r, l | 1), sn(r, ut()), !(Ye & 6) && (Uu = ut() + 500, vr()));
        }
        break;
      case 13:
        Ia(function() {
          var o = fi(n, 1);
          if (o !== null) {
            var c = Cn();
            Ft(o, n, 1, c);
          }
        }), Dd(n, 1);
    }
  }, Cs = function(n) {
    if (n.tag === 13) {
      var r = fi(n, 134217728);
      if (r !== null) {
        var l = Cn();
        Ft(r, n, 134217728, l);
      }
      Dd(n, 134217728);
    }
  }, dt = function(n) {
    if (n.tag === 13) {
      var r = hi(n), l = fi(n, r);
      if (l !== null) {
        var o = Cn();
        Ft(l, n, r, o);
      }
      Dd(n, r);
    }
  }, Up = function() {
    return ft;
  }, Cf = function(n, r) {
    var l = ft;
    try {
      return ft = n, r();
    } finally {
      ft = l;
    }
  }, Lr = function(n, r, l) {
    switch (r) {
      case "input":
        if (Pn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = Se(o);
              if (!c) throw Error(M(90));
              Wr(o), Pn(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ha(n, l);
        break;
      case "select":
        r = l.value, r != null && Aa(n, !!l.multiple, r, !1);
    }
  }, ao = Ed, ys = Ia;
  var Ey = { usingClientEntryPoint: !1, Events: [bo, su, Se, il, Xl, Ed] }, Ko = { findFiberByHostInstance: Jr, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, nh = { bundleType: Ko.bundleType, version: Ko.version, rendererPackageName: Ko.rendererPackageName, rendererConfig: Ko.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: gt.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Fe(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ko.findFiberByHostInstance || gy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hc.isDisabled && Hc.supportsFiber) try {
      io = Hc.inject(nh), xa = Hc;
    } catch {
    }
  }
  return ya.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ey, ya.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Gi(r)) throw Error(M(200));
    return Jv(n, r, null, l);
  }, ya.createRoot = function(n, r) {
    if (!Gi(n)) throw Error(M(299));
    var l = !1, o = "", c = bd;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = Rd(n, 1, !1, null, null, l, !1, o, c), n[oi] = r.current, ou(n.nodeType === 8 ? n.parentNode : n), new zc(r);
  }, ya.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(M(188)) : (n = Object.keys(n).join(","), Error(M(268, n)));
    return n = Fe(r), n = n === null ? null : n.stateNode, n;
  }, ya.flushSync = function(n) {
    return Ia(n);
  }, ya.hydrate = function(n, r, l) {
    if (!Uc(r)) throw Error(M(200));
    return Ac(null, n, r, !0, l);
  }, ya.hydrateRoot = function(n, r, l) {
    if (!Gi(n)) throw Error(M(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", h = bd;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (h = l.onRecoverableError)), r = wd(r, null, n, 1, l ?? null, c, !1, d, h), n[oi] = r.current, ou(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new qo(r);
  }, ya.render = function(n, r, l) {
    if (!Uc(r)) throw Error(M(200));
    return Ac(null, n, r, !1, l);
  }, ya.unmountComponentAtNode = function(n) {
    if (!Uc(n)) throw Error(M(40));
    return n._reactRootContainer ? (Ia(function() {
      Ac(null, null, n, !1, function() {
        n._reactRootContainer = null, n[oi] = null;
      });
    }), !0) : !1;
  }, ya.unstable_batchedUpdates = Ed, ya.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!Uc(l)) throw Error(M(200));
    if (n == null || n._reactInternals === void 0) throw Error(M(38));
    return Ac(n, r, l, !1, o);
  }, ya.version = "18.3.1-next-f1338f8080-20240426", ya;
}
var ga = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aT;
function tk() {
  return aT || (aT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var A = hf, J = oT(), M = A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, et = !1;
    function Lt(e) {
      et = e;
    }
    function Ge(e) {
      if (!et) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        pt("warn", e, a);
      }
    }
    function g(e) {
      if (!et) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        pt("error", e, a);
      }
    }
    function pt(e, t, a) {
      {
        var i = M.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var ce = 0, le = 1, Ke = 2, Y = 3, K = 4, ne = 5, we = 6, Ue = 7, Pe = 8, Vt = 9, Je = 10, Be = 11, gt = 12, $e = 13, xt = 14, Ae = 15, Rn = 16, jn = 17, Bt = 18, vt = 19, xn = 21, _e = 22, Ie = 23, dn = 24, wt = 25, qn = !0, Q = !1, Ce = !1, re = !1, tt = !1, it = !0, wn = !1, Kn = !0, za = !0, rn = !0, Ir = !0, Vn = /* @__PURE__ */ new Set(), or = {}, Ua = {};
    function sr(e, t) {
      Wr(e, t), Wr(e + "Capture", t);
    }
    function Wr(e, t) {
      or[e] && g("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), or[e] = t;
      {
        var a = e.toLowerCase();
        Ua[a] = e, e === "onDoubleClick" && (Ua.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Vn.add(t[i]);
    }
    var pn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Bn = Object.prototype.hasOwnProperty;
    function Dn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function bn(e) {
      try {
        return Pn(e), !1;
      } catch {
        return !0;
      }
    }
    function Pn(e) {
      return "" + e;
    }
    function Gr(e, t) {
      if (bn(e))
        return g("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function Sa(e) {
      if (bn(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    function ei(e, t) {
      if (bn(e))
        return g("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function Aa(e, t) {
      if (bn(e))
        return g("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Dn(e)), Pn(e);
    }
    function Ea(e) {
      if (bn(e))
        return g("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    function kr(e) {
      if (bn(e))
        return g("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Dn(e)), Pn(e);
    }
    var Ha = 0, _r = 1, Ca = 2, Kt = 3, Or = 4, ki = 5, Ta = 6, X = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ge = X + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", He = new RegExp("^[" + X + "][" + ge + "]*$"), ct = {}, Ut = {};
    function vn(e) {
      return Bn.call(Ut, e) ? !0 : Bn.call(ct, e) ? !1 : He.test(e) ? (Ut[e] = !0, !0) : (ct[e] = !0, g("Invalid attribute name: `%s`", e), !1);
    }
    function It(e, t, a) {
      return t !== null ? t.type === Ha : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function cr(e, t, a, i) {
      if (a !== null && a.type === Ha)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Ct(e, t, a, i) {
      if (t === null || typeof t > "u" || cr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Kt:
            return !t;
          case Or:
            return t === !1;
          case ki:
            return isNaN(t);
          case Ta:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Lr(e) {
      return Tt.hasOwnProperty(e) ? Tt[e] : null;
    }
    function St(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ca || t === Kt || t === Or, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var Tt = {}, Gl = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    Gl.forEach(function(e) {
      Tt[e] = new St(
        e,
        Ha,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      Tt[t] = new St(
        t,
        _r,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      Tt[e] = new St(
        e,
        Ca,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      Tt[e] = new St(
        e,
        Ca,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      Tt[e] = new St(
        e,
        Kt,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Tt[e] = new St(
        e,
        Kt,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Tt[e] = new St(
        e,
        Or,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      Tt[e] = new St(
        e,
        Ta,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      Tt[e] = new St(
        e,
        ki,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var il = /[\-\:]([a-z])/g, Xl = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(il, Xl);
      Tt[t] = new St(
        t,
        _r,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(il, Xl);
      Tt[t] = new St(
        t,
        _r,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(il, Xl);
      Tt[t] = new St(
        t,
        _r,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Tt[e] = new St(
        e,
        _r,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var ao = "xlinkHref";
    Tt[ao] = new St(
      "xlinkHref",
      _r,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Tt[e] = new St(
        e,
        _r,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var ys = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, ll = !1;
    function ql(e) {
      !ll && ys.test(e) && (ll = !0, g("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ul(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Gr(a, t), i.sanitizeURL && ql("" + a);
        var s = i.attributeName, f = null;
        if (i.type === Or) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Ct(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Ct(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Kt)
            return a;
          f = e.getAttribute(s);
        }
        return Ct(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function Kl(e, t, a, i) {
      {
        if (!vn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Gr(a, t), u === "" + a ? a : u;
      }
    }
    function Fa(e, t, a, i) {
      var u = Lr(t);
      if (!It(t, u, i)) {
        if (Ct(t, a, u, i) && (a = null), i || u === null) {
          if (vn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Gr(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === Kt ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var m = u.attributeName, y = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(m);
        else {
          var x = u.type, T;
          x === Kt || x === Or && a === !0 ? T = "" : (Gr(a, m), T = "" + a, u.sanitizeURL && ql(T.toString())), y ? e.setAttributeNS(y, m, T) : e.setAttribute(m, T);
        }
      }
    }
    var ti = Symbol.for("react.element"), Mr = Symbol.for("react.portal"), Ra = Symbol.for("react.fragment"), _i = Symbol.for("react.strict_mode"), ol = Symbol.for("react.profiler"), E = Symbol.for("react.provider"), V = Symbol.for("react.context"), I = Symbol.for("react.forward_ref"), me = Symbol.for("react.suspense"), We = Symbol.for("react.suspense_list"), Ze = Symbol.for("react.memo"), xe = Symbol.for("react.lazy"), Fe = Symbol.for("react.scope"), hn = Symbol.for("react.debug_trace_mode"), Dt = Symbol.for("react.offscreen"), At = Symbol.for("react.legacy_hidden"), fr = Symbol.for("react.cache"), Oi = Symbol.for("react.tracing_marker"), ut = Symbol.iterator, $n = "@@iterator";
    function Nr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = ut && e[ut] || e[$n];
      return typeof t == "function" ? t : null;
    }
    var je = Object.assign, ja = 0, Op, mf, io, xa, Lp, Xr, Mp;
    function Np() {
    }
    Np.__reactDisabledLog = !0;
    function Fm() {
      {
        if (ja === 0) {
          Op = console.log, mf = console.info, io = console.warn, xa = console.error, Lp = console.group, Xr = console.groupCollapsed, Mp = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Np,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        ja++;
      }
    }
    function gs() {
      {
        if (ja--, ja === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: je({}, e, {
              value: Op
            }),
            info: je({}, e, {
              value: mf
            }),
            warn: je({}, e, {
              value: io
            }),
            error: je({}, e, {
              value: xa
            }),
            group: je({}, e, {
              value: Lp
            }),
            groupCollapsed: je({}, e, {
              value: Xr
            }),
            groupEnd: je({}, e, {
              value: Mp
            })
          });
        }
        ja < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Zl = M.ReactCurrentDispatcher, sl;
    function wa(e, t, a) {
      {
        if (sl === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            sl = i && i[1] || "";
          }
        return `
` + sl + e;
      }
    }
    var yf = !1, Ss;
    {
      var gf = typeof WeakMap == "function" ? WeakMap : Map;
      Ss = new gf();
    }
    function Es(e, t) {
      if (!e || yf)
        return "";
      {
        var a = Ss.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      yf = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Zl.current, Zl.current = null, Fm();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (L) {
              i = L;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (L) {
              i = L;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (L) {
            i = L;
          }
          e();
        }
      } catch (L) {
        if (L && i && typeof L.stack == "string") {
          for (var p = L.stack.split(`
`), v = i.stack.split(`
`), m = p.length - 1, y = v.length - 1; m >= 1 && y >= 0 && p[m] !== v[y]; )
            y--;
          for (; m >= 1 && y >= 0; m--, y--)
            if (p[m] !== v[y]) {
              if (m !== 1 || y !== 1)
                do
                  if (m--, y--, y < 0 || p[m] !== v[y]) {
                    var x = `
` + p[m].replace(" at new ", " at ");
                    return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Ss.set(e, x), x;
                  }
                while (m >= 1 && y >= 0);
              break;
            }
        }
      } finally {
        yf = !1, Zl.current = s, gs(), Error.prepareStackTrace = u;
      }
      var T = e ? e.displayName || e.name : "", _ = T ? wa(T) : "";
      return typeof e == "function" && Ss.set(e, _), _;
    }
    function Sf(e, t, a) {
      return Es(e, !0);
    }
    function cl(e, t, a) {
      return Es(e, !1);
    }
    function jm(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function lo(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Es(e, jm(e));
      if (typeof e == "string")
        return wa(e);
      switch (e) {
        case me:
          return wa("Suspense");
        case We:
          return wa("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case I:
            return cl(e.render);
          case Ze:
            return lo(e.type, t, a);
          case xe: {
            var i = e, u = i._payload, s = i._init;
            try {
              return lo(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function ft(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ne:
          return wa(e.type);
        case Rn:
          return wa("Lazy");
        case $e:
          return wa("Suspense");
        case vt:
          return wa("SuspenseList");
        case ce:
        case Ke:
        case Ae:
          return cl(e.type);
        case Be:
          return cl(e.type.render);
        case le:
          return Sf(e.type);
        default:
          return "";
      }
    }
    function Ef(e) {
      try {
        var t = "", a = e;
        do
          t += ft(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function zp(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Cs(e) {
      return e.displayName || "Context";
    }
    function dt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Ra:
          return "Fragment";
        case Mr:
          return "Portal";
        case ol:
          return "Profiler";
        case _i:
          return "StrictMode";
        case me:
          return "Suspense";
        case We:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case V:
            var t = e;
            return Cs(t) + ".Consumer";
          case E:
            var a = e;
            return Cs(a._context) + ".Provider";
          case I:
            return zp(e, e.render, "ForwardRef");
          case Ze:
            var i = e.displayName || null;
            return i !== null ? i : dt(e.type) || "Memo";
          case xe: {
            var u = e, s = u._payload, f = u._init;
            try {
              return dt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Up(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Cf(e) {
      return e.displayName || "Context";
    }
    function Me(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case dn:
          return "Cache";
        case Vt:
          var i = a;
          return Cf(i) + ".Consumer";
        case Je:
          var u = a;
          return Cf(u._context) + ".Provider";
        case Bt:
          return "DehydratedFragment";
        case Be:
          return Up(a, a.render, "ForwardRef");
        case Ue:
          return "Fragment";
        case ne:
          return a;
        case K:
          return "Portal";
        case Y:
          return "Root";
        case we:
          return "Text";
        case Rn:
          return dt(a);
        case Pe:
          return a === _i ? "StrictMode" : "Mode";
        case _e:
          return "Offscreen";
        case gt:
          return "Profiler";
        case xn:
          return "Scope";
        case $e:
          return "Suspense";
        case vt:
          return "SuspenseList";
        case wt:
          return "TracingMarker";
        case le:
        case ce:
        case jn:
        case Ke:
        case xt:
        case Ae:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var uo = M.ReactDebugCurrentFrame, Zt = null, qr = !1;
    function Kr() {
      {
        if (Zt === null)
          return null;
        var e = Zt._debugOwner;
        if (e !== null && typeof e < "u")
          return Me(e);
      }
      return null;
    }
    function oo() {
      return Zt === null ? "" : Ef(Zt);
    }
    function an() {
      uo.getCurrentStack = null, Zt = null, qr = !1;
    }
    function ht(e) {
      uo.getCurrentStack = e === null ? null : oo, Zt = e, qr = !1;
    }
    function Vm() {
      return Zt;
    }
    function Da(e) {
      qr = e;
    }
    function Yn(e) {
      return "" + e;
    }
    function Li(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return kr(e), e;
        default:
          return "";
      }
    }
    var Ap = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Jl(e, t) {
      Ap[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || g("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || g("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Tf(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Hp(e) {
      return e._valueTracker;
    }
    function so(e) {
      e._valueTracker = null;
    }
    function co(e) {
      var t = "";
      return e && (Tf(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function eu(e) {
      var t = Tf(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      kr(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            kr(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            kr(p), i = "" + p;
          },
          stopTracking: function() {
            so(e), delete e[t];
          }
        };
        return f;
      }
    }
    function fl(e) {
      Hp(e) || (e._valueTracker = eu(e));
    }
    function Fp(e) {
      if (!e)
        return !1;
      var t = Hp(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = co(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Ts(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Rs = !1, fo = !1, xs = !1, Rf = !1;
    function ni(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function po(e, t) {
      var a = e, i = t.checked, u = je({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function vo(e, t) {
      Jl("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !fo && (g("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kr() || "A component", t.type), fo = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Rs && (g("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kr() || "A component", t.type), Rs = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Li(t.value != null ? t.value : i),
        controlled: ni(t)
      };
    }
    function xf(e, t) {
      var a = e, i = t.checked;
      i != null && Fa(a, "checked", i, !1);
    }
    function tu(e, t) {
      var a = e;
      {
        var i = ni(t);
        !a._wrapperState.controlled && i && !Rf && (g("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Rf = !0), a._wrapperState.controlled && !i && !xs && (g("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), xs = !0);
      }
      xf(e, t);
      var u = Li(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Yn(u)) : a.value !== Yn(u) && (a.value = Yn(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Mi(a, t.type, u) : t.hasOwnProperty("defaultValue") && Mi(a, t.type, Li(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function ho(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Yn(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function jp(e, t) {
      var a = e;
      tu(a, t), zr(a, t);
    }
    function zr(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Gr(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Sh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Fp(f), tu(f, p);
          }
        }
      }
    }
    function Mi(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Ts(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Yn(e._wrapperState.initialValue) : e.defaultValue !== Yn(a) && (e.defaultValue = Yn(a)));
    }
    var ws = !1, nu = !1, Vp = !1;
    function Ds(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? A.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || nu || (nu = !0, g("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Vp || (Vp = !0, g("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ws && (g("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ws = !0);
    }
    function wf(e, t) {
      t.value != null && e.setAttribute("value", Yn(Li(t.value)));
    }
    var mo = Array.isArray;
    function mn(e) {
      return mo(e);
    }
    var bs;
    bs = !1;
    function Bp() {
      var e = Kr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Pp = ["value", "defaultValue"];
    function Bm(e) {
      {
        Jl("select", e);
        for (var t = 0; t < Pp.length; t++) {
          var a = Pp[t];
          if (e[a] != null) {
            var i = mn(e[a]);
            e.multiple && !i ? g("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Bp()) : !e.multiple && i && g("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Bp());
          }
        }
      }
    }
    function Ni(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var m = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== m && (u[v].selected = m), m && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var y = Yn(Li(a)), x = null, T = 0; T < u.length; T++) {
          if (u[T].value === y) {
            u[T].selected = !0, i && (u[T].defaultSelected = !0);
            return;
          }
          x === null && !u[T].disabled && (x = u[T]);
        }
        x !== null && (x.selected = !0);
      }
    }
    function Df(e, t) {
      return je({}, t, {
        value: void 0
      });
    }
    function $p(e, t) {
      var a = e;
      Bm(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !bs && (g("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), bs = !0);
    }
    function Pm(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Ni(a, !!t.multiple, i, !1) : t.defaultValue != null && Ni(a, !!t.multiple, t.defaultValue, !0);
    }
    function $m(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Ni(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Ni(a, !!t.multiple, t.defaultValue, !0) : Ni(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Ym(e, t) {
      var a = e, i = t.value;
      i != null && Ni(a, !!t.multiple, i, !1);
    }
    var bf = !1;
    function kf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = je({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Yn(a._wrapperState.initialValue)
      });
      return i;
    }
    function Yp(e, t) {
      var a = e;
      Jl("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !bf && (g("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Kr() || "A component"), bf = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          g("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (mn(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Li(i)
      };
    }
    function Qp(e, t) {
      var a = e, i = Li(t.value), u = Li(t.defaultValue);
      if (i != null) {
        var s = Yn(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Yn(u));
    }
    function Ip(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function _f(e, t) {
      Qp(e, t);
    }
    var ri = "http://www.w3.org/1999/xhtml", Qm = "http://www.w3.org/1998/Math/MathML", Of = "http://www.w3.org/2000/svg";
    function ks(e) {
      switch (e) {
        case "svg":
          return Of;
        case "math":
          return Qm;
        default:
          return ri;
      }
    }
    function Lf(e, t) {
      return e == null || e === ri ? ks(t) : e === Of && t === "foreignObject" ? ri : e;
    }
    var Im = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, _s, Wp = Im(function(e, t) {
      if (e.namespaceURI === Of && !("innerHTML" in e)) {
        _s = _s || document.createElement("div"), _s.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = _s.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), dr = 1, ai = 3, Jt = 8, ba = 9, dl = 11, Os = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === ai) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Gp = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, ru = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Xp(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var qp = ["Webkit", "ms", "Moz", "O"];
    Object.keys(ru).forEach(function(e) {
      qp.forEach(function(t) {
        ru[Xp(t, e)] = ru[e];
      });
    });
    function Ls(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(ru.hasOwnProperty(e) && ru[e]) ? t + "px" : (Aa(t, e), ("" + t).trim());
    }
    var au = /([A-Z])/g, Wm = /^ms-/;
    function Gm(e) {
      return e.replace(au, "-$1").toLowerCase().replace(Wm, "-ms-");
    }
    var Kp = function() {
    };
    {
      var Zp = /^(?:webkit|moz|o)[A-Z]/, Jp = /^-ms-/, yo = /-(.)/g, iu = /;\s*$/, lu = {}, uu = {}, ev = !1, Mf = !1, Nf = function(e) {
        return e.replace(yo, function(t, a) {
          return a.toUpperCase();
        });
      }, zf = function(e) {
        lu.hasOwnProperty(e) && lu[e] || (lu[e] = !0, g(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Nf(e.replace(Jp, "ms-"))
        ));
      }, tv = function(e) {
        lu.hasOwnProperty(e) && lu[e] || (lu[e] = !0, g("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, nv = function(e, t) {
        uu.hasOwnProperty(t) && uu[t] || (uu[t] = !0, g(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(iu, "")));
      }, rv = function(e, t) {
        ev || (ev = !0, g("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Xm = function(e, t) {
        Mf || (Mf = !0, g("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Kp = function(e, t) {
        e.indexOf("-") > -1 ? zf(e) : Zp.test(e) ? tv(e) : iu.test(t) && nv(e, t), typeof t == "number" && (isNaN(t) ? rv(e, t) : isFinite(t) || Xm(e, t));
      };
    }
    var qm = Kp;
    function Km(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : Gm(i)) + ":", t += Ls(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function av(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || qm(i, t[i]);
          var s = Ls(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Zm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Zr(e) {
      var t = {};
      for (var a in e)
        for (var i = Gp[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function go(e, t) {
      {
        if (!t)
          return;
        var a = Zr(e), i = Zr(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, g("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Zm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var iv = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, lv = je({
      menuitem: !0
    }, iv), uv = "__html";
    function Ms(e, t) {
      if (t) {
        if (lv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(uv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && g("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function ii(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    var Ns = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, ov = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, ka = {}, Uf = new RegExp("^(aria)-[" + ge + "]*$"), So = new RegExp("^(aria)[A-Z][" + ge + "]*$");
    function Af(e, t) {
      {
        if (Bn.call(ka, t) && ka[t])
          return !0;
        if (So.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = ov.hasOwnProperty(a) ? a : null;
          if (i == null)
            return g("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ka[t] = !0, !0;
          if (t !== i)
            return g("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), ka[t] = !0, !0;
        }
        if (Uf.test(t)) {
          var u = t.toLowerCase(), s = ov.hasOwnProperty(u) ? u : null;
          if (s == null)
            return ka[t] = !0, !1;
          if (t !== s)
            return g("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), ka[t] = !0, !0;
        }
      }
      return !0;
    }
    function sv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = Af(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? g("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && g("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function zs(e, t) {
      ii(e, t) || sv(e, t);
    }
    var pl = !1;
    function Hf(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !pl && (pl = !0, e === "select" && t.multiple ? g("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : g("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Ff = function() {
    };
    {
      var yn = {}, jf = /^on./, cv = /^on[^A-Z]/, fv = new RegExp("^(aria)-[" + ge + "]*$"), dv = new RegExp("^(aria)[A-Z][" + ge + "]*$");
      Ff = function(e, t, a, i) {
        if (Bn.call(yn, t) && yn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return g("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), yn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return g("Invalid event handler property `%s`. Did you mean `%s`?", t, p), yn[t] = !0, !0;
          if (jf.test(t))
            return g("Unknown event handler property `%s`. It will be ignored.", t), yn[t] = !0, !0;
        } else if (jf.test(t))
          return cv.test(t) && g("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), yn[t] = !0, !0;
        if (fv.test(t) || dv.test(t))
          return !0;
        if (u === "innerhtml")
          return g("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), yn[t] = !0, !0;
        if (u === "aria")
          return g("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), yn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return g("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), yn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return g("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), yn[t] = !0, !0;
        var v = Lr(t), m = v !== null && v.type === Ha;
        if (Ns.hasOwnProperty(u)) {
          var y = Ns[u];
          if (y !== t)
            return g("Invalid DOM property `%s`. Did you mean `%s`?", t, y), yn[t] = !0, !0;
        } else if (!m && t !== u)
          return g("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), yn[t] = !0, !0;
        return typeof a == "boolean" && cr(t, a, v, !1) ? (a ? g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), yn[t] = !0, !0) : m ? !0 : cr(t, a, v, !1) ? (yn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Kt && (g("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), yn[t] = !0), !0);
      };
    }
    var pv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = Ff(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? g("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && g("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function vv(e, t, a) {
      ii(e, t) || pv(e, t, a);
    }
    var li = 1, Eo = 2, vl = 4, Jm = li | Eo | vl, Co = null;
    function To(e) {
      Co !== null && g("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
    }
    function ey() {
      Co === null && g("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
    }
    function hv(e) {
      return e === Co;
    }
    function Us(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ai ? t.parentNode : t;
    }
    var Et = null, zi = null, ui = null;
    function ou(e) {
      var t = Bu(e);
      if (t) {
        if (typeof Et != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Sh(a);
          Et(t.stateNode, t.type, i);
        }
      }
    }
    function mv(e) {
      Et = e;
    }
    function As(e) {
      zi ? ui ? ui.push(e) : ui = [e] : zi = e;
    }
    function Ro() {
      return zi !== null || ui !== null;
    }
    function xo() {
      if (zi) {
        var e = zi, t = ui;
        if (zi = null, ui = null, ou(e), t)
          for (var a = 0; a < t.length; a++)
            ou(t[a]);
      }
    }
    var hl = function(e, t) {
      return e(t);
    }, Vf = function() {
    }, Bf = !1;
    function ty() {
      var e = Ro();
      e && (Vf(), xo());
    }
    function Pf(e, t, a) {
      if (Bf)
        return e(t, a);
      Bf = !0;
      try {
        return hl(e, t, a);
      } finally {
        Bf = !1, ty();
      }
    }
    function Hs(e, t, a) {
      hl = e, Vf = a;
    }
    function Fs(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function $f(e, t, a) {
      switch (e) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
        case "onMouseEnter":
          return !!(a.disabled && Fs(t));
        default:
          return !1;
      }
    }
    function ml(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Sh(a);
      if (i === null)
        return null;
      var u = i[t];
      if ($f(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var wo = !1;
    if (pn)
      try {
        var yl = {};
        Object.defineProperty(yl, "passive", {
          get: function() {
            wo = !0;
          }
        }), window.addEventListener("test", yl, yl), window.removeEventListener("test", yl, yl);
      } catch {
        wo = !1;
      }
    function yv(e, t, a, i, u, s, f, p, v) {
      var m = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, m);
      } catch (y) {
        this.onError(y);
      }
    }
    var Yf = yv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Qf = document.createElement("react");
      Yf = function(t, a, i, u, s, f, p, v, m) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var y = document.createEvent("Event"), x = !1, T = !0, _ = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
        function N() {
          Qf.removeEventListener(z, Ee, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = _);
        }
        var q = Array.prototype.slice.call(arguments, 3);
        function Ee() {
          x = !0, N(), a.apply(i, q), T = !1;
        }
        var he, qe = !1, Qe = !1;
        function D(b) {
          if (he = b.error, qe = !0, he === null && b.colno === 0 && b.lineno === 0 && (Qe = !0), b.defaultPrevented && he != null && typeof he == "object")
            try {
              he._suppressLogging = !0;
            } catch {
            }
        }
        var z = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", D), Qf.addEventListener(z, Ee, !1), y.initEvent(z, !1, !1), Qf.dispatchEvent(y), L && Object.defineProperty(window, "event", L), x && T && (qe ? Qe && (he = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : he = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(he)), window.removeEventListener("error", D), !x)
          return N(), yv.apply(this, arguments);
      };
    }
    var ny = Yf, Ui = !1, _a = null, Do = !1, Ai = null, Va = {
      onError: function(e) {
        Ui = !0, _a = e;
      }
    };
    function gl(e, t, a, i, u, s, f, p, v) {
      Ui = !1, _a = null, ny.apply(Va, arguments);
    }
    function oi(e, t, a, i, u, s, f, p, v) {
      if (gl.apply(this, arguments), Ui) {
        var m = Wf();
        Do || (Do = !0, Ai = m);
      }
    }
    function If() {
      if (Do) {
        var e = Ai;
        throw Do = !1, Ai = null, e;
      }
    }
    function ry() {
      return Ui;
    }
    function Wf() {
      if (Ui) {
        var e = _a;
        return Ui = !1, _a = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Jr(e) {
      return e._reactInternals;
    }
    function bo(e) {
      return e._reactInternals !== void 0;
    }
    function su(e, t) {
      e._reactInternals = t;
    }
    var Se = (
      /*                      */
      0
    ), Hi = (
      /*                */
      1
    ), bt = (
      /*                    */
      2
    ), ze = (
      /*                       */
      4
    ), lt = (
      /*                */
      16
    ), ot = (
      /*                 */
      32
    ), Ba = (
      /*                     */
      64
    ), be = (
      /*                   */
      128
    ), Pt = (
      /*            */
      256
    ), pr = (
      /*                          */
      512
    ), ea = (
      /*                     */
      1024
    ), Mt = (
      /*                      */
      2048
    ), ta = (
      /*                    */
      4096
    ), Fi = (
      /*                   */
      8192
    ), ko = (
      /*             */
      16384
    ), js = Mt | ze | Ba | pr | ea | ko, gv = (
      /*               */
      32767
    ), Ur = (
      /*                   */
      32768
    ), gn = (
      /*                */
      65536
    ), _o = (
      /* */
      131072
    ), Gf = (
      /*                       */
      1048576
    ), Xf = (
      /*                    */
      2097152
    ), vr = (
      /*                 */
      4194304
    ), ji = (
      /*                */
      8388608
    ), hr = (
      /*               */
      16777216
    ), Sl = (
      /*              */
      33554432
    ), cu = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      ze | ea | 0
    ), mr = bt | ze | lt | ot | pr | ta | Fi, Qn = ze | Ba | pr | Fi, na = Mt | lt, kn = vr | ji | Xf, si = M.ReactCurrentOwner;
    function Ar(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (bt | ta)) !== Se && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === Y ? a : null;
    }
    function qf(e) {
      if (e.tag === $e) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function Vs(e) {
      return e.tag === Y ? e.stateNode.containerInfo : null;
    }
    function Kf(e) {
      return Ar(e) === e;
    }
    function Hr(e) {
      {
        var t = si.current;
        if (t !== null && t.tag === le) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || g("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Me(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = Jr(e);
      return u ? Ar(u) === u : !1;
    }
    function yr(e) {
      if (Ar(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function kt(e) {
      var t = e.alternate;
      if (!t) {
        var a = Ar(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return yr(s), e;
            if (v === u)
              return yr(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var m = !1, y = s.child; y; ) {
            if (y === i) {
              m = !0, i = s, u = f;
              break;
            }
            if (y === u) {
              m = !0, u = s, i = f;
              break;
            }
            y = y.sibling;
          }
          if (!m) {
            for (y = f.child; y; ) {
              if (y === i) {
                m = !0, i = f, u = s;
                break;
              }
              if (y === u) {
                m = !0, u = f, i = s;
                break;
              }
              y = y.sibling;
            }
            if (!m)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== Y)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ra(e) {
      var t = kt(e);
      return t !== null ? Zf(t) : null;
    }
    function Zf(e) {
      if (e.tag === ne || e.tag === we)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Zf(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Sv(e) {
      var t = kt(e);
      return t !== null ? Bs(t) : null;
    }
    function Bs(e) {
      if (e.tag === ne || e.tag === we)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== K) {
          var a = Bs(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Ps = J.unstable_scheduleCallback, Ev = J.unstable_cancelCallback, $s = J.unstable_shouldYield, Cv = J.unstable_requestPaint, Ht = J.unstable_now, Jf = J.unstable_getCurrentPriorityLevel, Ys = J.unstable_ImmediatePriority, El = J.unstable_UserBlockingPriority, Pa = J.unstable_NormalPriority, Tv = J.unstable_LowPriority, Qs = J.unstable_IdlePriority, fu = J.unstable_yieldValue, Rv = J.unstable_setDisableYieldValue, ci = null, ln = null, W = null, aa = !1, Fr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function ed(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return g("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        za && (e = je({}, e, {
          getLaneLabelMap: fi,
          injectProfilingHooks: xv
        })), ci = t.inject(e), ln = t;
      } catch (a) {
        g("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function td(e, t) {
      if (ln && typeof ln.onScheduleFiberRoot == "function")
        try {
          ln.onScheduleFiberRoot(ci, e, t);
        } catch (a) {
          aa || (aa = !0, g("React instrumentation encountered an error: %s", a));
        }
    }
    function du(e, t) {
      if (ln && typeof ln.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & be) === be;
          if (rn) {
            var i;
            switch (t) {
              case Gt:
                i = Ys;
                break;
              case pi:
                i = El;
                break;
              case $a:
                i = Pa;
                break;
              case xu:
                i = Qs;
                break;
              default:
                i = Pa;
                break;
            }
            ln.onCommitFiberRoot(ci, e, i, a);
          }
        } catch (u) {
          aa || (aa = !0, g("React instrumentation encountered an error: %s", u));
        }
    }
    function ia(e) {
      if (ln && typeof ln.onPostCommitFiberRoot == "function")
        try {
          ln.onPostCommitFiberRoot(ci, e);
        } catch (t) {
          aa || (aa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function Cl(e) {
      if (ln && typeof ln.onCommitFiberUnmount == "function")
        try {
          ln.onCommitFiberUnmount(ci, e);
        } catch (t) {
          aa || (aa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function en(e) {
      if (typeof fu == "function" && (Rv(e), Lt(e)), ln && typeof ln.setStrictMode == "function")
        try {
          ln.setStrictMode(ci, e);
        } catch (t) {
          aa || (aa = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function xv(e) {
      W = e;
    }
    function fi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < zo; a++) {
          var i = iy(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Vi(e) {
      W !== null && typeof W.markCommitStarted == "function" && W.markCommitStarted(e);
    }
    function Is() {
      W !== null && typeof W.markCommitStopped == "function" && W.markCommitStopped();
    }
    function pu(e) {
      W !== null && typeof W.markComponentRenderStarted == "function" && W.markComponentRenderStarted(e);
    }
    function gr() {
      W !== null && typeof W.markComponentRenderStopped == "function" && W.markComponentRenderStopped();
    }
    function Bi(e) {
      W !== null && typeof W.markComponentPassiveEffectMountStarted == "function" && W.markComponentPassiveEffectMountStarted(e);
    }
    function Ws() {
      W !== null && typeof W.markComponentPassiveEffectMountStopped == "function" && W.markComponentPassiveEffectMountStopped();
    }
    function wv(e) {
      W !== null && typeof W.markComponentPassiveEffectUnmountStarted == "function" && W.markComponentPassiveEffectUnmountStarted(e);
    }
    function Gs() {
      W !== null && typeof W.markComponentPassiveEffectUnmountStopped == "function" && W.markComponentPassiveEffectUnmountStopped();
    }
    function Dv(e) {
      W !== null && typeof W.markComponentLayoutEffectMountStarted == "function" && W.markComponentLayoutEffectMountStarted(e);
    }
    function Oo() {
      W !== null && typeof W.markComponentLayoutEffectMountStopped == "function" && W.markComponentLayoutEffectMountStopped();
    }
    function Oa(e) {
      W !== null && typeof W.markComponentLayoutEffectUnmountStarted == "function" && W.markComponentLayoutEffectUnmountStarted(e);
    }
    function vu() {
      W !== null && typeof W.markComponentLayoutEffectUnmountStopped == "function" && W.markComponentLayoutEffectUnmountStopped();
    }
    function Lo(e, t, a) {
      W !== null && typeof W.markComponentErrored == "function" && W.markComponentErrored(e, t, a);
    }
    function Tl(e, t, a) {
      W !== null && typeof W.markComponentSuspended == "function" && W.markComponentSuspended(e, t, a);
    }
    function nd(e) {
      W !== null && typeof W.markLayoutEffectsStarted == "function" && W.markLayoutEffectsStarted(e);
    }
    function hu() {
      W !== null && typeof W.markLayoutEffectsStopped == "function" && W.markLayoutEffectsStopped();
    }
    function bv(e) {
      W !== null && typeof W.markPassiveEffectsStarted == "function" && W.markPassiveEffectsStarted(e);
    }
    function rd() {
      W !== null && typeof W.markPassiveEffectsStopped == "function" && W.markPassiveEffectsStopped();
    }
    function Nt(e) {
      W !== null && typeof W.markRenderStarted == "function" && W.markRenderStarted(e);
    }
    function Xs() {
      W !== null && typeof W.markRenderYielded == "function" && W.markRenderYielded();
    }
    function qs() {
      W !== null && typeof W.markRenderStopped == "function" && W.markRenderStopped();
    }
    function ad(e) {
      W !== null && typeof W.markRenderScheduled == "function" && W.markRenderScheduled(e);
    }
    function Ks(e, t) {
      W !== null && typeof W.markForceUpdateScheduled == "function" && W.markForceUpdateScheduled(e, t);
    }
    function Mo(e, t) {
      W !== null && typeof W.markStateUpdateScheduled == "function" && W.markStateUpdateScheduled(e, t);
    }
    var de = (
      /*                         */
      0
    ), ve = (
      /*                 */
      1
    ), ke = (
      /*                    */
      2
    ), Ve = (
      /*               */
      8
    ), jr = (
      /*              */
      16
    ), mu = Math.clz32 ? Math.clz32 : In, No = Math.log, ay = Math.LN2;
    function In(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (No(t) / ay | 0) | 0;
    }
    var zo = 31, H = (
      /*                        */
      0
    ), tn = (
      /*                          */
      0
    ), ye = (
      /*                        */
      1
    ), _n = (
      /*    */
      2
    ), Vr = (
      /*             */
      4
    ), di = (
      /*            */
      8
    ), la = (
      /*                     */
      16
    ), yu = (
      /*                */
      32
    ), Rl = (
      /*                       */
      4194240
    ), gu = (
      /*                        */
      64
    ), Zs = (
      /*                        */
      128
    ), Js = (
      /*                        */
      256
    ), ec = (
      /*                        */
      512
    ), tc = (
      /*                        */
      1024
    ), nc = (
      /*                        */
      2048
    ), xl = (
      /*                        */
      4096
    ), rc = (
      /*                        */
      8192
    ), Su = (
      /*                        */
      16384
    ), Eu = (
      /*                       */
      32768
    ), ac = (
      /*                       */
      65536
    ), Uo = (
      /*                       */
      131072
    ), ic = (
      /*                       */
      262144
    ), lc = (
      /*                       */
      524288
    ), uc = (
      /*                       */
      1048576
    ), oc = (
      /*                       */
      2097152
    ), Cu = (
      /*                            */
      130023424
    ), wl = (
      /*                             */
      4194304
    ), sc = (
      /*                             */
      8388608
    ), cc = (
      /*                             */
      16777216
    ), id = (
      /*                             */
      33554432
    ), fc = (
      /*                             */
      67108864
    ), kv = wl, Ao = (
      /*          */
      134217728
    ), ld = (
      /*                          */
      268435455
    ), Tu = (
      /*               */
      268435456
    ), Pi = (
      /*                        */
      536870912
    ), Wn = (
      /*                   */
      1073741824
    );
    function iy(e) {
      {
        if (e & ye)
          return "Sync";
        if (e & _n)
          return "InputContinuousHydration";
        if (e & Vr)
          return "InputContinuous";
        if (e & di)
          return "DefaultHydration";
        if (e & la)
          return "Default";
        if (e & yu)
          return "TransitionHydration";
        if (e & Rl)
          return "Transition";
        if (e & Cu)
          return "Retry";
        if (e & Ao)
          return "SelectiveHydration";
        if (e & Tu)
          return "IdleHydration";
        if (e & Pi)
          return "Idle";
        if (e & Wn)
          return "Offscreen";
      }
    }
    var Rt = -1, dc = gu, Sr = wl;
    function Dl(e) {
      switch (Wt(e)) {
        case ye:
          return ye;
        case _n:
          return _n;
        case Vr:
          return Vr;
        case di:
          return di;
        case la:
          return la;
        case yu:
          return yu;
        case gu:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case xl:
        case rc:
        case Su:
        case Eu:
        case ac:
        case Uo:
        case ic:
        case lc:
        case uc:
        case oc:
          return e & Rl;
        case wl:
        case sc:
        case cc:
        case id:
        case fc:
          return e & Cu;
        case Ao:
          return Ao;
        case Tu:
          return Tu;
        case Pi:
          return Pi;
        case Wn:
          return Wn;
        default:
          return g("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function bl(e, t) {
      var a = e.pendingLanes;
      if (a === H)
        return H;
      var i = H, u = e.suspendedLanes, s = e.pingedLanes, f = a & ld;
      if (f !== H) {
        var p = f & ~u;
        if (p !== H)
          i = Dl(p);
        else {
          var v = f & s;
          v !== H && (i = Dl(v));
        }
      } else {
        var m = a & ~u;
        m !== H ? i = Dl(m) : s !== H && (i = Dl(s));
      }
      if (i === H)
        return H;
      if (t !== H && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === H) {
        var y = Wt(i), x = Wt(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          y >= x || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          y === la && (x & Rl) !== H
        )
          return t;
      }
      (i & Vr) !== H && (i |= a & la);
      var T = e.entangledLanes;
      if (T !== H)
        for (var _ = e.entanglements, L = i & T; L > 0; ) {
          var N = Yi(L), q = 1 << N;
          i |= _[N], L &= ~q;
        }
      return i;
    }
    function _v(e, t) {
      for (var a = e.eventTimes, i = Rt; t > 0; ) {
        var u = Yi(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Ov(e, t) {
      switch (e) {
        case ye:
        case _n:
        case Vr:
          return t + 250;
        case di:
        case la:
        case yu:
        case gu:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case xl:
        case rc:
        case Su:
        case Eu:
        case ac:
        case Uo:
        case ic:
        case lc:
        case uc:
        case oc:
          return t + 5e3;
        case wl:
        case sc:
        case cc:
        case id:
        case fc:
          return Rt;
        case Ao:
        case Tu:
        case Pi:
        case Wn:
          return Rt;
        default:
          return g("Should have found matching lanes. This is a bug in React."), Rt;
      }
    }
    function Lv(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Yi(f), v = 1 << p, m = s[p];
        m === Rt ? ((v & i) === H || (v & u) !== H) && (s[p] = Ov(v, t)) : m <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function ud(e) {
      return Dl(e.pendingLanes);
    }
    function $i(e) {
      var t = e.pendingLanes & ~Wn;
      return t !== H ? t : t & Wn ? Wn : H;
    }
    function od(e) {
      return (e & ye) !== H;
    }
    function Ho(e) {
      return (e & ld) !== H;
    }
    function Mv(e) {
      return (e & Cu) === e;
    }
    function Nv(e) {
      var t = ye | Vr | la;
      return (e & t) === H;
    }
    function zv(e) {
      return (e & Rl) === e;
    }
    function Fo(e, t) {
      var a = _n | Vr | di | la;
      return (t & a) !== H;
    }
    function Uv(e, t) {
      return (t & e.expiredLanes) !== H;
    }
    function sd(e) {
      return (e & Rl) !== H;
    }
    function Av() {
      var e = dc;
      return dc <<= 1, (dc & Rl) === H && (dc = gu), e;
    }
    function Er() {
      var e = Sr;
      return Sr <<= 1, (Sr & Cu) === H && (Sr = wl), e;
    }
    function Wt(e) {
      return e & -e;
    }
    function Ru(e) {
      return Wt(e);
    }
    function Yi(e) {
      return 31 - mu(e);
    }
    function pc(e) {
      return Yi(e);
    }
    function Cr(e, t) {
      return (e & t) !== H;
    }
    function kl(e, t) {
      return (e & t) === t;
    }
    function Ne(e, t) {
      return e | t;
    }
    function jo(e, t) {
      return e & ~t;
    }
    function vc(e, t) {
      return e & t;
    }
    function ly(e) {
      return e;
    }
    function Hv(e, t) {
      return e !== tn && e < t ? e : t;
    }
    function Vo(e) {
      for (var t = [], a = 0; a < zo; a++)
        t.push(e);
      return t;
    }
    function _l(e, t, a) {
      e.pendingLanes |= t, t !== Pi && (e.suspendedLanes = H, e.pingedLanes = H);
      var i = e.eventTimes, u = pc(t);
      i[u] = a;
    }
    function Fv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Yi(i), s = 1 << u;
        a[u] = Rt, i &= ~s;
      }
    }
    function hc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function mc(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = H, e.pingedLanes = H, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Yi(f), v = 1 << p;
        i[p] = H, u[p] = Rt, s[p] = Rt, f &= ~v;
      }
    }
    function cd(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Yi(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function jv(e, t) {
      var a = Wt(t), i;
      switch (a) {
        case Vr:
          i = _n;
          break;
        case la:
          i = di;
          break;
        case gu:
        case Zs:
        case Js:
        case ec:
        case tc:
        case nc:
        case xl:
        case rc:
        case Su:
        case Eu:
        case ac:
        case Uo:
        case ic:
        case lc:
        case uc:
        case oc:
        case wl:
        case sc:
        case cc:
        case id:
        case fc:
          i = yu;
          break;
        case Pi:
          i = Tu;
          break;
        default:
          i = tn;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== tn ? tn : i;
    }
    function yc(e, t, a) {
      if (Fr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = pc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function fd(e, t) {
      if (Fr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = pc(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Bo(e, t) {
      return null;
    }
    var Gt = ye, pi = Vr, $a = la, xu = Pi, wu = tn;
    function ua() {
      return wu;
    }
    function $t(e) {
      wu = e;
    }
    function Gn(e, t) {
      var a = wu;
      try {
        return wu = e, t();
      } finally {
        wu = a;
      }
    }
    function uy(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function oy(e, t) {
      return e > t ? e : t;
    }
    function Du(e, t) {
      return e !== 0 && e < t;
    }
    function On(e) {
      var t = Wt(e);
      return Du(Gt, t) ? Du(pi, t) ? Ho(t) ? $a : xu : pi : Gt;
    }
    function gc(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ie;
    function bu(e) {
      ie = e;
    }
    function dd(e) {
      ie(e);
    }
    var Sc;
    function sy(e) {
      Sc = e;
    }
    var ku;
    function Ec(e) {
      ku = e;
    }
    var Cc;
    function Vv(e) {
      Cc = e;
    }
    var pd;
    function Bv(e) {
      pd = e;
    }
    var Po = !1, _u = [], zt = null, Sn = null, Zn = null, Ou = /* @__PURE__ */ new Map(), Lu = /* @__PURE__ */ new Map(), En = [], Pv = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function Ya(e) {
      return Pv.indexOf(e) > -1;
    }
    function cy(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function vd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          zt = null;
          break;
        case "dragenter":
        case "dragleave":
          Sn = null;
          break;
        case "mouseover":
        case "mouseout":
          Zn = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Ou.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Lu.delete(i);
          break;
        }
      }
    }
    function Mu(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = cy(t, a, i, u, s);
        if (t !== null) {
          var p = Bu(t);
          p !== null && Sc(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function $v(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return zt = Mu(zt, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Sn = Mu(Sn, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Zn = Mu(Zn, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, m = v.pointerId;
          return Ou.set(m, Mu(Ou.get(m) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var y = u, x = y.pointerId;
          return Lu.set(x, Mu(Lu.get(x) || null, e, t, a, i, y)), !0;
        }
      }
      return !1;
    }
    function hd(e) {
      var t = es(e.target);
      if (t !== null) {
        var a = Ar(t);
        if (a !== null) {
          var i = a.tag;
          if (i === $e) {
            var u = qf(a);
            if (u !== null) {
              e.blockedOn = u, pd(e.priority, function() {
                ku(a);
              });
              return;
            }
          } else if (i === Y) {
            var s = a.stateNode;
            if (gc(s)) {
              e.blockedOn = Vs(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function fy(e) {
      for (var t = Cc(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < En.length && Du(t, En[i].priority); i++)
        ;
      En.splice(i, 0, a), i === 0 && hd(a);
    }
    function Ol(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Xn(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          To(s), u.target.dispatchEvent(s), ey();
        } else {
          var f = Bu(i);
          return f !== null && Sc(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Tc(e, t, a) {
      Ol(e) && a.delete(t);
    }
    function oa() {
      Po = !1, zt !== null && Ol(zt) && (zt = null), Sn !== null && Ol(Sn) && (Sn = null), Zn !== null && Ol(Zn) && (Zn = null), Ou.forEach(Tc), Lu.forEach(Tc);
    }
    function Ye(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Po || (Po = !0, J.unstable_scheduleCallback(J.unstable_NormalPriority, oa)));
    }
    function Yt(e) {
      if (_u.length > 0) {
        Ye(_u[0], e);
        for (var t = 1; t < _u.length; t++) {
          var a = _u[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      zt !== null && Ye(zt, e), Sn !== null && Ye(Sn, e), Zn !== null && Ye(Zn, e);
      var i = function(p) {
        return Ye(p, e);
      };
      Ou.forEach(i), Lu.forEach(i);
      for (var u = 0; u < En.length; u++) {
        var s = En[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; En.length > 0; ) {
        var f = En[0];
        if (f.blockedOn !== null)
          break;
        hd(f), f.blockedOn === null && En.shift();
      }
    }
    var _t = M.ReactCurrentBatchConfig, un = !0;
    function Tr(e) {
      un = !!e;
    }
    function Nu() {
      return un;
    }
    function on(e, t, a) {
      var i = Rc(t), u;
      switch (i) {
        case Gt:
          u = $o;
          break;
        case pi:
          u = Ll;
          break;
        case $a:
        default:
          u = zu;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function $o(e, t, a, i) {
      var u = ua(), s = _t.transition;
      _t.transition = null;
      try {
        $t(Gt), zu(e, t, a, i);
      } finally {
        $t(u), _t.transition = s;
      }
    }
    function Ll(e, t, a, i) {
      var u = ua(), s = _t.transition;
      _t.transition = null;
      try {
        $t(pi), zu(e, t, a, i);
      } finally {
        $t(u), _t.transition = s;
      }
    }
    function zu(e, t, a, i) {
      un && md(e, t, a, i);
    }
    function md(e, t, a, i) {
      var u = Xn(e, t, a, i);
      if (u === null) {
        ky(e, t, i, Qi, a), vd(e, i);
        return;
      }
      if ($v(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (vd(e, i), t & vl && Ya(e)) {
        for (; u !== null; ) {
          var s = Bu(u);
          s !== null && dd(s);
          var f = Xn(e, t, a, i);
          if (f === null && ky(e, t, i, Qi, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      ky(e, t, i, null, a);
    }
    var Qi = null;
    function Xn(e, t, a, i) {
      Qi = null;
      var u = Us(i), s = es(u);
      if (s !== null) {
        var f = Ar(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === $e) {
            var v = qf(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === Y) {
            var m = f.stateNode;
            if (gc(m))
              return Vs(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return Qi = s, null;
    }
    function Rc(e) {
      switch (e) {
        case "cancel":
        case "click":
        case "close":
        case "contextmenu":
        case "copy":
        case "cut":
        case "auxclick":
        case "dblclick":
        case "dragend":
        case "dragstart":
        case "drop":
        case "focusin":
        case "focusout":
        case "input":
        case "invalid":
        case "keydown":
        case "keypress":
        case "keyup":
        case "mousedown":
        case "mouseup":
        case "paste":
        case "pause":
        case "play":
        case "pointercancel":
        case "pointerdown":
        case "pointerup":
        case "ratechange":
        case "reset":
        case "resize":
        case "seeked":
        case "submit":
        case "touchcancel":
        case "touchend":
        case "touchstart":
        case "volumechange":
        case "change":
        case "selectionchange":
        case "textInput":
        case "compositionstart":
        case "compositionend":
        case "compositionupdate":
        case "beforeblur":
        case "afterblur":
        case "beforeinput":
        case "blur":
        case "fullscreenchange":
        case "focus":
        case "hashchange":
        case "popstate":
        case "select":
        case "selectstart":
          return Gt;
        case "drag":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "mousemove":
        case "mouseout":
        case "mouseover":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "scroll":
        case "toggle":
        case "touchmove":
        case "wheel":
        case "mouseenter":
        case "mouseleave":
        case "pointerenter":
        case "pointerleave":
          return pi;
        case "message": {
          var t = Jf();
          switch (t) {
            case Ys:
              return Gt;
            case El:
              return pi;
            case Pa:
            case Tv:
              return $a;
            case Qs:
              return xu;
            default:
              return $a;
          }
        }
        default:
          return $a;
      }
    }
    function Uu(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function vi(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function xc(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function yd(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var sa = null, Au = null, ca = null;
    function wc(e) {
      return sa = e, Au = Qo(), !0;
    }
    function Yo() {
      sa = null, Au = null, ca = null;
    }
    function Dc() {
      if (ca)
        return ca;
      var e, t = Au, a = t.length, i, u = Qo(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return ca = u.slice(e, p), ca;
    }
    function Qo() {
      return "value" in sa ? sa.value : sa.textContent;
    }
    function Ml(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Cn() {
      return !0;
    }
    function hi() {
      return !1;
    }
    function Ft(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var m = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return m ? this.isDefaultPrevented = Cn : this.isDefaultPrevented = hi, this.isPropagationStopped = hi, this;
      }
      return je(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Cn);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Cn);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: Cn
      }), t;
    }
    var sn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, bc = Ft(sn), Nl = je({}, sn, {
      view: 0,
      detail: 0
    }), gd = Ft(Nl), Sd, Qa, Hu;
    function Ed(e) {
      e !== Hu && (Hu && e.type === "mousemove" ? (Sd = e.screenX - Hu.screenX, Qa = e.screenY - Hu.screenY) : (Sd = 0, Qa = 0), Hu = e);
    }
    var Ia = je({}, Nl, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Cd,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Ed(e), Sd);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Qa;
      }
    }), kc = Ft(Ia), zl = je({}, Ia, {
      dataTransfer: 0
    }), Yv = Ft(zl), Qv = je({}, Nl, {
      relatedTarget: 0
    }), Io = Ft(Qv), _c = je({}, sn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), dy = Ft(_c), py = je({}, sn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Iv = Ft(py), Wv = je({}, sn, {
      data: 0
    }), Ii = Ft(Wv), vy = Ii, Fu = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified"
    }, Gv = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta"
    };
    function Qt(e) {
      if (e.key) {
        var t = Fu[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Ml(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Gv[e.keyCode] || "Unidentified" : "";
    }
    var hy = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Xv(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = hy[e];
      return i ? !!a[i] : !1;
    }
    function Cd(e) {
      return Xv;
    }
    var my = je({}, Nl, {
      key: Qt,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Cd,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Ml(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Ml(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), qv = Ft(my), Kv = je({}, Ia, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Zv = Ft(Kv), fa = je({}, Nl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Cd
    }), Td = Ft(fa), yy = je({}, sn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Wi = Ft(yy), Oc = je({}, Ia, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Ul = Ft(Oc), Lc = [9, 13, 27, 32], Mc = 229, Wo = pn && "CompositionEvent" in window, Go = null;
    pn && "documentMode" in document && (Go = document.documentMode);
    var Rd = pn && "TextEvent" in window && !Go, Jv = pn && (!Wo || Go && Go > 8 && Go <= 11), xd = 32, wd = String.fromCharCode(xd);
    function Nc() {
      sr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), sr("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), sr("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), sr("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Xo = !1;
    function eh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Dd(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function gy(e, t) {
      return e === "keydown" && t.keyCode === Mc;
    }
    function bd(e, t) {
      switch (e) {
        case "keyup":
          return Lc.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Mc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function zc(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function qo(e) {
      return e.locale === "ko";
    }
    var Gi = !1;
    function Uc(e, t, a, i, u) {
      var s, f;
      if (Wo ? s = Dd(t) : Gi ? bd(t, i) && (s = "onCompositionEnd") : gy(t, i) && (s = "onCompositionStart"), !s)
        return null;
      Jv && !qo(i) && (!Gi && s === "onCompositionStart" ? Gi = wc(u) : s === "onCompositionEnd" && Gi && (f = Dc()));
      var p = lh(a, s);
      if (p.length > 0) {
        var v = new Ii(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var m = zc(i);
          m !== null && (v.data = m);
        }
      }
    }
    function th(e, t) {
      switch (e) {
        case "compositionend":
          return zc(t);
        case "keypress":
          var a = t.which;
          return a !== xd ? null : (Xo = !0, wd);
        case "textInput":
          var i = t.data;
          return i === wd && Xo ? null : i;
        default:
          return null;
      }
    }
    function Sy(e, t) {
      if (Gi) {
        if (e === "compositionend" || !Wo && bd(e, t)) {
          var a = Dc();
          return Yo(), Gi = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!eh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Jv && !qo(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Ac(e, t, a, i, u) {
      var s;
      if (Rd ? s = th(t, i) : s = Sy(t, i), !s)
        return null;
      var f = lh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new vy("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Ey(e, t, a, i, u, s, f) {
      Uc(e, t, a, i, u), Ac(e, t, a, i, u);
    }
    var Ko = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function nh(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Ko[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function Hc(e) {
      if (!pn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function n() {
      sr("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      As(i);
      var u = lh(t, "onChange");
      if (u.length > 0) {
        var s = new bc("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var l = null, o = null;
    function c(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function d(e) {
      var t = [];
      r(t, o, e, Us(e)), Pf(h, t);
    }
    function h(e) {
      L0(e, 0);
    }
    function S(e) {
      var t = $c(e);
      if (Fp(t))
        return e;
    }
    function C(e, t) {
      if (e === "change")
        return t;
    }
    var O = !1;
    pn && (O = Hc("input") && (!document.documentMode || document.documentMode > 9));
    function j(e, t) {
      l = e, o = t, l.attachEvent("onpropertychange", F);
    }
    function B() {
      l && (l.detachEvent("onpropertychange", F), l = null, o = null);
    }
    function F(e) {
      e.propertyName === "value" && S(o) && d(e);
    }
    function ee(e, t, a) {
      e === "focusin" ? (B(), j(t, a)) : e === "focusout" && B();
    }
    function ue(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return S(o);
    }
    function fe(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Xt(e, t) {
      if (e === "click")
        return S(t);
    }
    function w(e, t) {
      if (e === "input" || e === "change")
        return S(t);
    }
    function R(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Mi(e, "number", e.value);
    }
    function k(e, t, a, i, u, s, f) {
      var p = a ? $c(a) : window, v, m;
      if (c(p) ? v = C : nh(p) ? O ? v = w : (v = ue, m = ee) : fe(p) && (v = Xt), v) {
        var y = v(t, a);
        if (y) {
          r(e, y, i, u);
          return;
        }
      }
      m && m(t, p, a), t === "focusout" && R(p);
    }
    function $() {
      Wr("onMouseEnter", ["mouseout", "mouseover"]), Wr("onMouseLeave", ["mouseout", "mouseover"]), Wr("onPointerEnter", ["pointerout", "pointerover"]), Wr("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function pe(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !hv(i)) {
        var m = i.relatedTarget || i.fromElement;
        if (m && (es(m) || Bd(m)))
          return;
      }
      if (!(!v && !p)) {
        var y;
        if (u.window === u)
          y = u;
        else {
          var x = u.ownerDocument;
          x ? y = x.defaultView || x.parentWindow : y = window;
        }
        var T, _;
        if (v) {
          var L = i.relatedTarget || i.toElement;
          if (T = a, _ = L ? es(L) : null, _ !== null) {
            var N = Ar(_);
            (_ !== N || _.tag !== ne && _.tag !== we) && (_ = null);
          }
        } else
          T = null, _ = a;
        if (T !== _) {
          var q = kc, Ee = "onMouseLeave", he = "onMouseEnter", qe = "mouse";
          (t === "pointerout" || t === "pointerover") && (q = Zv, Ee = "onPointerLeave", he = "onPointerEnter", qe = "pointer");
          var Qe = T == null ? y : $c(T), D = _ == null ? y : $c(_), z = new q(Ee, qe + "leave", T, i, u);
          z.target = Qe, z.relatedTarget = D;
          var b = null, P = es(u);
          if (P === a) {
            var ae = new q(he, qe + "enter", _, i, u);
            ae.target = D, ae.relatedTarget = Qe, b = ae;
          }
          OT(e, z, b, T, _);
        }
      }
    }
    function Te(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var oe = typeof Object.is == "function" ? Object.is : Te;
    function Re(e, t) {
      if (oe(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Bn.call(t, s) || !oe(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function cn(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function nt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function mi(e, t) {
      for (var a = cn(e), i = 0, u = 0; a; ) {
        if (a.nodeType === ai) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = cn(nt(a));
      }
    }
    function Cy(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return cT(e, u, s, f, p);
    }
    function cT(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, m = 0, y = e, x = null;
      e: for (; ; ) {
        for (var T = null; y === t && (a === 0 || y.nodeType === ai) && (f = s + a), y === i && (u === 0 || y.nodeType === ai) && (p = s + u), y.nodeType === ai && (s += y.nodeValue.length), (T = y.firstChild) !== null; )
          x = y, y = T;
        for (; ; ) {
          if (y === e)
            break e;
          if (x === t && ++v === a && (f = s), x === i && ++m === u && (p = s), (T = y.nextSibling) !== null)
            break;
          y = x, x = y.parentNode;
        }
        y = T;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function fT(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var m = mi(e, f), y = mi(e, p);
        if (m && y) {
          if (u.rangeCount === 1 && u.anchorNode === m.node && u.anchorOffset === m.offset && u.focusNode === y.node && u.focusOffset === y.offset)
            return;
          var x = a.createRange();
          x.setStart(m.node, m.offset), u.removeAllRanges(), f > p ? (u.addRange(x), u.extend(y.node, y.offset)) : (x.setEnd(y.node, y.offset), u.addRange(x));
        }
      }
    }
    function S0(e) {
      return e && e.nodeType === ai;
    }
    function E0(e, t) {
      return !e || !t ? !1 : e === t ? !0 : S0(e) ? !1 : S0(t) ? E0(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function dT(e) {
      return e && e.ownerDocument && E0(e.ownerDocument.documentElement, e);
    }
    function pT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function C0() {
      for (var e = window, t = Ts(); t instanceof e.HTMLIFrameElement; ) {
        if (pT(t))
          e = t.contentWindow;
        else
          return t;
        t = Ts(e.document);
      }
      return t;
    }
    function Ty(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function vT() {
      var e = C0();
      return {
        focusedElem: e,
        selectionRange: Ty(e) ? mT(e) : null
      };
    }
    function hT(e) {
      var t = C0(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && dT(a)) {
        i !== null && Ty(a) && yT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === dr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function mT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Cy(e), t || {
        start: 0,
        end: 0
      };
    }
    function yT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : fT(e, t);
    }
    var gT = pn && "documentMode" in document && document.documentMode <= 11;
    function ST() {
      sr("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Fc = null, Ry = null, kd = null, xy = !1;
    function ET(e) {
      if ("selectionStart" in e && Ty(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function CT(e) {
      return e.window === e ? e.document : e.nodeType === ba ? e : e.ownerDocument;
    }
    function T0(e, t, a) {
      var i = CT(a);
      if (!(xy || Fc == null || Fc !== Ts(i))) {
        var u = ET(Fc);
        if (!kd || !Re(kd, u)) {
          kd = u;
          var s = lh(Ry, "onSelect");
          if (s.length > 0) {
            var f = new bc("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = Fc;
          }
        }
      }
    }
    function TT(e, t, a, i, u, s, f) {
      var p = a ? $c(a) : window;
      switch (t) {
        case "focusin":
          (nh(p) || p.contentEditable === "true") && (Fc = p, Ry = a, kd = null);
          break;
        case "focusout":
          Fc = null, Ry = null, kd = null;
          break;
        case "mousedown":
          xy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          xy = !1, T0(e, i, u);
          break;
        case "selectionchange":
          if (gT)
            break;
        case "keydown":
        case "keyup":
          T0(e, i, u);
      }
    }
    function rh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var jc = {
      animationend: rh("Animation", "AnimationEnd"),
      animationiteration: rh("Animation", "AnimationIteration"),
      animationstart: rh("Animation", "AnimationStart"),
      transitionend: rh("Transition", "TransitionEnd")
    }, wy = {}, R0 = {};
    pn && (R0 = document.createElement("div").style, "AnimationEvent" in window || (delete jc.animationend.animation, delete jc.animationiteration.animation, delete jc.animationstart.animation), "TransitionEvent" in window || delete jc.transitionend.transition);
    function ah(e) {
      if (wy[e])
        return wy[e];
      if (!jc[e])
        return e;
      var t = jc[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in R0)
          return wy[e] = t[a];
      return e;
    }
    var x0 = ah("animationend"), w0 = ah("animationiteration"), D0 = ah("animationstart"), b0 = ah("transitionend"), k0 = /* @__PURE__ */ new Map(), _0 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function ju(e, t) {
      k0.set(e, t), sr(t, [e]);
    }
    function RT() {
      for (var e = 0; e < _0.length; e++) {
        var t = _0[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        ju(a, "on" + i);
      }
      ju(x0, "onAnimationEnd"), ju(w0, "onAnimationIteration"), ju(D0, "onAnimationStart"), ju("dblclick", "onDoubleClick"), ju("focusin", "onFocus"), ju("focusout", "onBlur"), ju(b0, "onTransitionEnd");
    }
    function xT(e, t, a, i, u, s, f) {
      var p = k0.get(t);
      if (p !== void 0) {
        var v = bc, m = t;
        switch (t) {
          case "keypress":
            if (Ml(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = qv;
            break;
          case "focusin":
            m = "focus", v = Io;
            break;
          case "focusout":
            m = "blur", v = Io;
            break;
          case "beforeblur":
          case "afterblur":
            v = Io;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = kc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Yv;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Td;
            break;
          case x0:
          case w0:
          case D0:
            v = dy;
            break;
          case b0:
            v = Wi;
            break;
          case "scroll":
            v = gd;
            break;
          case "wheel":
            v = Ul;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = Iv;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Zv;
            break;
        }
        var y = (s & vl) !== 0;
        {
          var x = !y && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", T = kT(a, p, i.type, y, x);
          if (T.length > 0) {
            var _ = new v(p, m, null, i, u);
            e.push({
              event: _,
              listeners: T
            });
          }
        }
      }
    }
    RT(), $(), n(), ST(), Nc();
    function wT(e, t, a, i, u, s, f) {
      xT(e, t, a, i, u, s);
      var p = (s & Jm) === 0;
      p && (pe(e, t, a, i, u), k(e, t, a, i, u), TT(e, t, a, i, u), Ey(e, t, a, i, u));
    }
    var _d = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Dy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(_d));
    function O0(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, oi(i, t, void 0, e), e.currentTarget = null;
    }
    function DT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          O0(e, v, p), i = f;
        }
      else
        for (var m = 0; m < t.length; m++) {
          var y = t[m], x = y.instance, T = y.currentTarget, _ = y.listener;
          if (x !== i && e.isPropagationStopped())
            return;
          O0(e, _, T), i = x;
        }
    }
    function L0(e, t) {
      for (var a = (t & vl) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        DT(s, f, a);
      }
      If();
    }
    function bT(e, t, a, i, u) {
      var s = Us(a), f = [];
      wT(f, e, i, a, s, t), L0(f, t);
    }
    function jt(e, t) {
      Dy.has(e) || g('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = rx(t), u = LT(e);
      i.has(u) || (M0(t, e, Eo, a), i.add(u));
    }
    function by(e, t, a) {
      Dy.has(e) && !t && g('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= vl), M0(a, e, i, t);
    }
    var ih = "_reactListening" + Math.random().toString(36).slice(2);
    function Od(e) {
      if (!e[ih]) {
        e[ih] = !0, Vn.forEach(function(a) {
          a !== "selectionchange" && (Dy.has(a) || by(a, !1, e), by(a, !0, e));
        });
        var t = e.nodeType === ba ? e : e.ownerDocument;
        t !== null && (t[ih] || (t[ih] = !0, by("selectionchange", !1, t)));
      }
    }
    function M0(e, t, a, i, u) {
      var s = on(e, t, a), f = void 0;
      wo && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? xc(e, t, s, f) : vi(e, t, s) : f !== void 0 ? yd(e, t, s, f) : Uu(e, t, s);
    }
    function N0(e, t) {
      return e === t || e.nodeType === Jt && e.parentNode === t;
    }
    function ky(e, t, a, i, u) {
      var s = i;
      if (!(t & li) && !(t & Eo)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === Y || v === K) {
              var m = p.stateNode.containerInfo;
              if (N0(m, f))
                break;
              if (v === K)
                for (var y = p.return; y !== null; ) {
                  var x = y.tag;
                  if (x === Y || x === K) {
                    var T = y.stateNode.containerInfo;
                    if (N0(T, f))
                      return;
                  }
                  y = y.return;
                }
              for (; m !== null; ) {
                var _ = es(m);
                if (_ === null)
                  return;
                var L = _.tag;
                if (L === ne || L === we) {
                  p = s = _;
                  continue e;
                }
                m = m.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Pf(function() {
        return bT(e, t, a, s);
      });
    }
    function Ld(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function kT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], m = e, y = null; m !== null; ) {
        var x = m, T = x.stateNode, _ = x.tag;
        if (_ === ne && T !== null && (y = T, p !== null)) {
          var L = ml(m, p);
          L != null && v.push(Ld(m, L, y));
        }
        if (u)
          break;
        m = m.return;
      }
      return v;
    }
    function lh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ne && f !== null) {
          var v = f, m = ml(u, a);
          m != null && i.unshift(Ld(u, m, v));
          var y = ml(u, t);
          y != null && i.push(Ld(u, y, v));
        }
        u = u.return;
      }
      return i;
    }
    function Vc(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ne);
      return e || null;
    }
    function _T(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = Vc(s))
        u++;
      for (var f = 0, p = i; p; p = Vc(p))
        f++;
      for (; u - f > 0; )
        a = Vc(a), u--;
      for (; f - u > 0; )
        i = Vc(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = Vc(a), i = Vc(i);
      }
      return null;
    }
    function z0(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, m = v.alternate, y = v.stateNode, x = v.tag;
        if (m !== null && m === i)
          break;
        if (x === ne && y !== null) {
          var T = y;
          if (u) {
            var _ = ml(p, s);
            _ != null && f.unshift(Ld(p, _, T));
          } else if (!u) {
            var L = ml(p, s);
            L != null && f.push(Ld(p, L, T));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function OT(e, t, a, i, u) {
      var s = i && u ? _T(i, u) : null;
      i !== null && z0(e, t, i, s, !1), u !== null && a !== null && z0(e, a, u, s, !0);
    }
    function LT(e, t) {
      return e + "__bubble";
    }
    var da = !1, Md = "dangerouslySetInnerHTML", uh = "suppressContentEditableWarning", Vu = "suppressHydrationWarning", U0 = "autoFocus", Zo = "children", Jo = "style", oh = "__html", _y, sh, Nd, A0, ch, H0, F0;
    _y = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, sh = function(e, t) {
      zs(e, t), Hf(e, t), vv(e, t, {
        registrationNameDependencies: or,
        possibleRegistrationNames: Ua
      });
    }, H0 = pn && !document.documentMode, Nd = function(e, t, a) {
      if (!da) {
        var i = fh(a), u = fh(t);
        u !== i && (da = !0, g("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, A0 = function(e) {
      if (!da) {
        da = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), g("Extra attributes from the server: %s", t);
      }
    }, ch = function(e, t) {
      t === !1 ? g("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : g("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, F0 = function(e, t) {
      var a = e.namespaceURI === ri ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var MT = /\r\n?/g, NT = /\u0000|\uFFFD/g;
    function fh(e) {
      Ea(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(MT, `
`).replace(NT, "");
    }
    function dh(e, t, a, i) {
      var u = fh(t), s = fh(e);
      if (s !== u && (i && (da || (da = !0, g('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && qn))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function j0(e) {
      return e.nodeType === ba ? e : e.ownerDocument;
    }
    function zT() {
    }
    function ph(e) {
      e.onclick = zT;
    }
    function UT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Jo)
            f && Object.freeze(f), av(t, f);
          else if (s === Md) {
            var p = f ? f[oh] : void 0;
            p != null && Wp(t, p);
          } else if (s === Zo)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && Os(t, f);
            } else typeof f == "number" && Os(t, "" + f);
          else s === uh || s === Vu || s === U0 || (or.hasOwnProperty(s) ? f != null && (typeof f != "function" && ch(s, f), s === "onScroll" && jt("scroll", t)) : f != null && Fa(t, s, f, u));
        }
    }
    function AT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Jo ? av(e, f) : s === Md ? Wp(e, f) : s === Zo ? Os(e, f) : Fa(e, s, f, i);
      }
    }
    function HT(e, t, a, i) {
      var u, s = j0(a), f, p = i;
      if (p === ri && (p = ks(e)), p === ri) {
        if (u = ii(e, t), !u && e !== e.toLowerCase() && g("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var m = v.firstChild;
          f = v.removeChild(m);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var y = f;
          t.multiple ? y.multiple = !0 : t.size && (y.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === ri && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Bn.call(_y, e) && (_y[e] = !0, g("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function FT(e, t) {
      return j0(t).createTextNode(e);
    }
    function jT(e, t, a, i) {
      var u = ii(t, a);
      sh(t, a);
      var s;
      switch (t) {
        case "dialog":
          jt("cancel", e), jt("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          jt("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < _d.length; f++)
            jt(_d[f], e);
          s = a;
          break;
        case "source":
          jt("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          jt("error", e), jt("load", e), s = a;
          break;
        case "details":
          jt("toggle", e), s = a;
          break;
        case "input":
          vo(e, a), s = po(e, a), jt("invalid", e);
          break;
        case "option":
          Ds(e, a), s = a;
          break;
        case "select":
          $p(e, a), s = Df(e, a), jt("invalid", e);
          break;
        case "textarea":
          Yp(e, a), s = kf(e, a), jt("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Ms(t, s), UT(t, e, i, s, u), t) {
        case "input":
          fl(e), ho(e, a, !1);
          break;
        case "textarea":
          fl(e), Ip(e);
          break;
        case "option":
          wf(e, a);
          break;
        case "select":
          Pm(e, a);
          break;
        default:
          typeof s.onClick == "function" && ph(e);
          break;
      }
    }
    function VT(e, t, a, i, u) {
      sh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = po(e, a), p = po(e, i), s = [];
          break;
        case "select":
          f = Df(e, a), p = Df(e, i), s = [];
          break;
        case "textarea":
          f = kf(e, a), p = kf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && ph(e);
          break;
      }
      Ms(t, p);
      var v, m, y = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Jo) {
            var x = f[v];
            for (m in x)
              x.hasOwnProperty(m) && (y || (y = {}), y[m] = "");
          } else v === Md || v === Zo || v === uh || v === Vu || v === U0 || (or.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var T = p[v], _ = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || T === _ || T == null && _ == null))
          if (v === Jo)
            if (T && Object.freeze(T), _) {
              for (m in _)
                _.hasOwnProperty(m) && (!T || !T.hasOwnProperty(m)) && (y || (y = {}), y[m] = "");
              for (m in T)
                T.hasOwnProperty(m) && _[m] !== T[m] && (y || (y = {}), y[m] = T[m]);
            } else
              y || (s || (s = []), s.push(v, y)), y = T;
          else if (v === Md) {
            var L = T ? T[oh] : void 0, N = _ ? _[oh] : void 0;
            L != null && N !== L && (s = s || []).push(v, L);
          } else v === Zo ? (typeof T == "string" || typeof T == "number") && (s = s || []).push(v, "" + T) : v === uh || v === Vu || (or.hasOwnProperty(v) ? (T != null && (typeof T != "function" && ch(v, T), v === "onScroll" && jt("scroll", e)), !s && _ !== T && (s = [])) : (s = s || []).push(v, T));
      }
      return y && (go(y, p[Jo]), (s = s || []).push(Jo, y)), s;
    }
    function BT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && xf(e, u);
      var s = ii(a, i), f = ii(a, u);
      switch (AT(e, t, s, f), a) {
        case "input":
          tu(e, u);
          break;
        case "textarea":
          Qp(e, u);
          break;
        case "select":
          $m(e, u);
          break;
      }
    }
    function PT(e) {
      {
        var t = e.toLowerCase();
        return Ns.hasOwnProperty(t) && Ns[t] || null;
      }
    }
    function $T(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = ii(t, a), sh(t, a), t) {
        case "dialog":
          jt("cancel", e), jt("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          jt("load", e);
          break;
        case "video":
        case "audio":
          for (var m = 0; m < _d.length; m++)
            jt(_d[m], e);
          break;
        case "source":
          jt("error", e);
          break;
        case "img":
        case "image":
        case "link":
          jt("error", e), jt("load", e);
          break;
        case "details":
          jt("toggle", e);
          break;
        case "input":
          vo(e, a), jt("invalid", e);
          break;
        case "option":
          Ds(e, a);
          break;
        case "select":
          $p(e, a), jt("invalid", e);
          break;
        case "textarea":
          Yp(e, a), jt("invalid", e);
          break;
      }
      Ms(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var y = e.attributes, x = 0; x < y.length; x++) {
          var T = y[x].name.toLowerCase();
          switch (T) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(y[x].name);
          }
        }
      }
      var _ = null;
      for (var L in a)
        if (a.hasOwnProperty(L)) {
          var N = a[L];
          if (L === Zo)
            typeof N == "string" ? e.textContent !== N && (a[Vu] !== !0 && dh(e.textContent, N, s, f), _ = [Zo, N]) : typeof N == "number" && e.textContent !== "" + N && (a[Vu] !== !0 && dh(e.textContent, N, s, f), _ = [Zo, "" + N]);
          else if (or.hasOwnProperty(L))
            N != null && (typeof N != "function" && ch(L, N), L === "onScroll" && jt("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var q = void 0, Ee = p && wn ? null : Lr(L);
            if (a[Vu] !== !0) {
              if (!(L === uh || L === Vu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              L === "value" || L === "checked" || L === "selected")) {
                if (L === Md) {
                  var he = e.innerHTML, qe = N ? N[oh] : void 0;
                  if (qe != null) {
                    var Qe = F0(e, qe);
                    Qe !== he && Nd(L, he, Qe);
                  }
                } else if (L === Jo) {
                  if (v.delete(L), H0) {
                    var D = Km(N);
                    q = e.getAttribute("style"), D !== q && Nd(L, q, D);
                  }
                } else if (p && !wn)
                  v.delete(L.toLowerCase()), q = Kl(e, L, N), N !== q && Nd(L, q, N);
                else if (!It(L, Ee, p) && !Ct(L, N, Ee, p)) {
                  var z = !1;
                  if (Ee !== null)
                    v.delete(Ee.attributeName), q = ul(e, L, N, Ee);
                  else {
                    var b = i;
                    if (b === ri && (b = ks(t)), b === ri)
                      v.delete(L.toLowerCase());
                    else {
                      var P = PT(L);
                      P !== null && P !== L && (z = !0, v.delete(P)), v.delete(L);
                    }
                    q = Kl(e, L, N);
                  }
                  var ae = wn;
                  !ae && N !== q && !z && Nd(L, q, N);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Vu] !== !0 && A0(v), t) {
        case "input":
          fl(e), ho(e, a, !0);
          break;
        case "textarea":
          fl(e), Ip(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && ph(e);
          break;
      }
      return _;
    }
    function YT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Oy(e, t) {
      {
        if (da)
          return;
        da = !0, g("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Ly(e, t) {
      {
        if (da)
          return;
        da = !0, g('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function My(e, t, a) {
      {
        if (da)
          return;
        da = !0, g("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Ny(e, t) {
      {
        if (t === "" || da)
          return;
        da = !0, g('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function QT(e, t, a) {
      switch (t) {
        case "input":
          jp(e, a);
          return;
        case "textarea":
          _f(e, a);
          return;
        case "select":
          Ym(e, a);
          return;
      }
    }
    var zd = function() {
    }, Ud = function() {
    };
    {
      var IT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], V0 = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], WT = V0.concat(["button"]), GT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], B0 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Ud = function(e, t) {
        var a = je({}, e || B0), i = {
          tag: t
        };
        return V0.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), WT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), IT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var XT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return GT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, qT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, P0 = {};
      zd = function(e, t, a) {
        a = a || B0;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && g("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = XT(e, u) ? null : i, f = s ? null : qT(e, a), p = s || f;
        if (p) {
          var v = p.tag, m = !!s + "|" + e + "|" + v;
          if (!P0[m]) {
            P0[m] = !0;
            var y = e, x = "";
            if (e === "#text" ? /\S/.test(t) ? y = "Text nodes" : (y = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : y = "<" + e + ">", s) {
              var T = "";
              v === "table" && e === "tr" && (T += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), g("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", y, v, x, T);
            } else
              g("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", y, v);
          }
        }
      };
    }
    var vh = "suppressHydrationWarning", hh = "$", mh = "/$", Ad = "$?", Hd = "$!", KT = "style", zy = null, Uy = null;
    function ZT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case ba:
        case dl: {
          t = i === ba ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Lf(null, "");
          break;
        }
        default: {
          var s = i === Jt ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Lf(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = Ud(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function JT(e, t, a) {
      {
        var i = e, u = Lf(i.namespace, t), s = Ud(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function Tk(e) {
      return e;
    }
    function eR(e) {
      zy = Nu(), Uy = vT();
      var t = null;
      return Tr(!1), t;
    }
    function tR(e) {
      hT(Uy), Tr(zy), zy = null, Uy = null;
    }
    function nR(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (zd(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = Ud(f.ancestorInfo, e);
          zd(null, p, v);
        }
        s = f.namespace;
      }
      var m = HT(e, t, a, s);
      return Vd(u, m), $y(m, t), m;
    }
    function rR(e, t) {
      e.appendChild(t);
    }
    function aR(e, t, a, i, u) {
      switch (jT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function iR(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = Ud(f.ancestorInfo, t);
          zd(null, p, v);
        }
      }
      return VT(e, t, a, i);
    }
    function Ay(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function lR(e, t, a, i) {
      {
        var u = a;
        zd(null, e, u.ancestorInfo);
      }
      var s = FT(e, t);
      return Vd(i, s), s;
    }
    function uR() {
      var e = window.event;
      return e === void 0 ? $a : Rc(e.type);
    }
    var Hy = typeof setTimeout == "function" ? setTimeout : void 0, oR = typeof clearTimeout == "function" ? clearTimeout : void 0, Fy = -1, $0 = typeof Promise == "function" ? Promise : void 0, sR = typeof queueMicrotask == "function" ? queueMicrotask : typeof $0 < "u" ? function(e) {
      return $0.resolve(null).then(e).catch(cR);
    } : Hy;
    function cR(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function fR(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function dR(e, t, a, i, u, s) {
      BT(e, t, a, i, u), $y(e, u);
    }
    function Y0(e) {
      Os(e, "");
    }
    function pR(e, t, a) {
      e.nodeValue = a;
    }
    function vR(e, t) {
      e.appendChild(t);
    }
    function hR(e, t) {
      var a;
      e.nodeType === Jt ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && ph(a);
    }
    function mR(e, t, a) {
      e.insertBefore(t, a);
    }
    function yR(e, t, a) {
      e.nodeType === Jt ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function gR(e, t) {
      e.removeChild(t);
    }
    function SR(e, t) {
      e.nodeType === Jt ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function jy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Jt) {
          var s = u.data;
          if (s === mh)
            if (i === 0) {
              e.removeChild(u), Yt(t);
              return;
            } else
              i--;
          else (s === hh || s === Ad || s === Hd) && i++;
        }
        a = u;
      } while (a);
      Yt(t);
    }
    function ER(e, t) {
      e.nodeType === Jt ? jy(e.parentNode, t) : e.nodeType === dr && jy(e, t), Yt(e);
    }
    function CR(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function TR(e) {
      e.nodeValue = "";
    }
    function RR(e, t) {
      e = e;
      var a = t[KT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Ls("display", i);
    }
    function xR(e, t) {
      e.nodeValue = t;
    }
    function wR(e) {
      e.nodeType === dr ? e.textContent = "" : e.nodeType === ba && e.documentElement && e.removeChild(e.documentElement);
    }
    function DR(e, t, a) {
      return e.nodeType !== dr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function bR(e, t) {
      return t === "" || e.nodeType !== ai ? null : e;
    }
    function kR(e) {
      return e.nodeType !== Jt ? null : e;
    }
    function Q0(e) {
      return e.data === Ad;
    }
    function Vy(e) {
      return e.data === Hd;
    }
    function _R(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function OR(e, t) {
      e._reactRetry = t;
    }
    function yh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === dr || t === ai)
          break;
        if (t === Jt) {
          var a = e.data;
          if (a === hh || a === Hd || a === Ad)
            break;
          if (a === mh)
            return null;
        }
      }
      return e;
    }
    function Fd(e) {
      return yh(e.nextSibling);
    }
    function LR(e) {
      return yh(e.firstChild);
    }
    function MR(e) {
      return yh(e.firstChild);
    }
    function NR(e) {
      return yh(e.nextSibling);
    }
    function zR(e, t, a, i, u, s, f) {
      Vd(s, e), $y(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var m = (s.mode & ve) !== de;
      return $T(e, t, a, p, i, m, f);
    }
    function UR(e, t, a, i) {
      return Vd(a, e), a.mode & ve, YT(e, t);
    }
    function AR(e, t) {
      Vd(t, e);
    }
    function HR(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Jt) {
          var i = t.data;
          if (i === mh) {
            if (a === 0)
              return Fd(t);
            a--;
          } else (i === hh || i === Hd || i === Ad) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function I0(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Jt) {
          var i = t.data;
          if (i === hh || i === Hd || i === Ad) {
            if (a === 0)
              return t;
            a--;
          } else i === mh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function FR(e) {
      Yt(e);
    }
    function jR(e) {
      Yt(e);
    }
    function VR(e) {
      return e !== "head" && e !== "body";
    }
    function BR(e, t, a, i) {
      var u = !0;
      dh(t.nodeValue, a, i, u);
    }
    function PR(e, t, a, i, u, s) {
      if (t[vh] !== !0) {
        var f = !0;
        dh(i.nodeValue, u, s, f);
      }
    }
    function $R(e, t) {
      t.nodeType === dr ? Oy(e, t) : t.nodeType === Jt || Ly(e, t);
    }
    function YR(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === dr ? Oy(a, t) : t.nodeType === Jt || Ly(a, t));
      }
    }
    function QR(e, t, a, i, u) {
      (u || t[vh] !== !0) && (i.nodeType === dr ? Oy(a, i) : i.nodeType === Jt || Ly(a, i));
    }
    function IR(e, t, a) {
      My(e, t);
    }
    function WR(e, t) {
      Ny(e, t);
    }
    function GR(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && My(i, t);
      }
    }
    function XR(e, t) {
      {
        var a = e.parentNode;
        a !== null && Ny(a, t);
      }
    }
    function qR(e, t, a, i, u, s) {
      (s || t[vh] !== !0) && My(a, i);
    }
    function KR(e, t, a, i, u) {
      (u || t[vh] !== !0) && Ny(a, i);
    }
    function ZR(e) {
      g("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function JR(e) {
      Od(e);
    }
    var Bc = Math.random().toString(36).slice(2), Pc = "__reactFiber$" + Bc, By = "__reactProps$" + Bc, jd = "__reactContainer$" + Bc, Py = "__reactEvents$" + Bc, ex = "__reactListeners$" + Bc, tx = "__reactHandles$" + Bc;
    function nx(e) {
      delete e[Pc], delete e[By], delete e[Py], delete e[ex], delete e[tx];
    }
    function Vd(e, t) {
      t[Pc] = e;
    }
    function gh(e, t) {
      t[jd] = e;
    }
    function W0(e) {
      e[jd] = null;
    }
    function Bd(e) {
      return !!e[jd];
    }
    function es(e) {
      var t = e[Pc];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[jd] || a[Pc], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = I0(e); u !== null; ) {
              var s = u[Pc];
              if (s)
                return s;
              u = I0(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Bu(e) {
      var t = e[Pc] || e[jd];
      return t && (t.tag === ne || t.tag === we || t.tag === $e || t.tag === Y) ? t : null;
    }
    function $c(e) {
      if (e.tag === ne || e.tag === we)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Sh(e) {
      return e[By] || null;
    }
    function $y(e, t) {
      e[By] = t;
    }
    function rx(e) {
      var t = e[Py];
      return t === void 0 && (t = e[Py] = /* @__PURE__ */ new Set()), t;
    }
    var G0 = {}, X0 = M.ReactDebugCurrentFrame;
    function Eh(e) {
      if (e) {
        var t = e._owner, a = lo(e.type, e._source, t ? t.type : null);
        X0.setExtraStackFrame(a);
      } else
        X0.setExtraStackFrame(null);
    }
    function yi(e, t, a, i, u) {
      {
        var s = Function.call.bind(Bn);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (m) {
              p = m;
            }
            p && !(p instanceof Error) && (Eh(u), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Eh(null)), p instanceof Error && !(p.message in G0) && (G0[p.message] = !0, Eh(u), g("Failed %s type: %s", a, p.message), Eh(null));
          }
      }
    }
    var Yy = [], Ch;
    Ch = [];
    var Al = -1;
    function Pu(e) {
      return {
        current: e
      };
    }
    function Rr(e, t) {
      if (Al < 0) {
        g("Unexpected pop.");
        return;
      }
      t !== Ch[Al] && g("Unexpected Fiber popped."), e.current = Yy[Al], Yy[Al] = null, Ch[Al] = null, Al--;
    }
    function xr(e, t, a) {
      Al++, Yy[Al] = e.current, Ch[Al] = a, e.current = t;
    }
    var Qy;
    Qy = {};
    var La = {};
    Object.freeze(La);
    var Hl = Pu(La), Xi = Pu(!1), Iy = La;
    function Yc(e, t, a) {
      return a && qi(t) ? Iy : Hl.current;
    }
    function q0(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Qc(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return La;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Me(e) || "Unknown";
          yi(i, s, "context", p);
        }
        return u && q0(e, t, s), s;
      }
    }
    function Th() {
      return Xi.current;
    }
    function qi(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Rh(e) {
      Rr(Xi, e), Rr(Hl, e);
    }
    function Wy(e) {
      Rr(Xi, e), Rr(Hl, e);
    }
    function K0(e, t, a) {
      {
        if (Hl.current !== La)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        xr(Hl, t, e), xr(Xi, a, e);
      }
    }
    function Z0(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Me(e) || "Unknown";
            Qy[s] || (Qy[s] = !0, g("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Me(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Me(e) || "Unknown";
          yi(u, f, "child context", v);
        }
        return je({}, a, f);
      }
    }
    function xh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || La;
        return Iy = Hl.current, xr(Hl, a, e), xr(Xi, Xi.current, e), !0;
      }
    }
    function J0(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = Z0(e, t, Iy);
          i.__reactInternalMemoizedMergedChildContext = u, Rr(Xi, e), Rr(Hl, e), xr(Hl, u, e), xr(Xi, a, e);
        } else
          Rr(Xi, e), xr(Xi, a, e);
      }
    }
    function ax(e) {
      {
        if (!Kf(e) || e.tag !== le)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case Y:
              return t.stateNode.context;
            case le: {
              var a = t.type;
              if (qi(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var $u = 0, wh = 1, Fl = null, Gy = !1, Xy = !1;
    function eE(e) {
      Fl === null ? Fl = [e] : Fl.push(e);
    }
    function ix(e) {
      Gy = !0, eE(e);
    }
    function tE() {
      Gy && Yu();
    }
    function Yu() {
      if (!Xy && Fl !== null) {
        Xy = !0;
        var e = 0, t = ua();
        try {
          var a = !0, i = Fl;
          for ($t(Gt); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Fl = null, Gy = !1;
        } catch (s) {
          throw Fl !== null && (Fl = Fl.slice(e + 1)), Ps(Ys, Yu), s;
        } finally {
          $t(t), Xy = !1;
        }
      }
      return null;
    }
    var Ic = [], Wc = 0, Dh = null, bh = 0, Wa = [], Ga = 0, ts = null, jl = 1, Vl = "";
    function lx(e) {
      return rs(), (e.flags & Gf) !== Se;
    }
    function ux(e) {
      return rs(), bh;
    }
    function ox() {
      var e = Vl, t = jl, a = t & ~sx(t);
      return a.toString(32) + e;
    }
    function ns(e, t) {
      rs(), Ic[Wc++] = bh, Ic[Wc++] = Dh, Dh = e, bh = t;
    }
    function nE(e, t, a) {
      rs(), Wa[Ga++] = jl, Wa[Ga++] = Vl, Wa[Ga++] = ts, ts = e;
      var i = jl, u = Vl, s = kh(i) - 1, f = i & ~(1 << s), p = a + 1, v = kh(t) + s;
      if (v > 30) {
        var m = s - s % 5, y = (1 << m) - 1, x = (f & y).toString(32), T = f >> m, _ = s - m, L = kh(t) + _, N = p << _, q = N | T, Ee = x + u;
        jl = 1 << L | q, Vl = Ee;
      } else {
        var he = p << s, qe = he | f, Qe = u;
        jl = 1 << v | qe, Vl = Qe;
      }
    }
    function qy(e) {
      rs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        ns(e, a), nE(e, a, i);
      }
    }
    function kh(e) {
      return 32 - mu(e);
    }
    function sx(e) {
      return 1 << kh(e) - 1;
    }
    function Ky(e) {
      for (; e === Dh; )
        Dh = Ic[--Wc], Ic[Wc] = null, bh = Ic[--Wc], Ic[Wc] = null;
      for (; e === ts; )
        ts = Wa[--Ga], Wa[Ga] = null, Vl = Wa[--Ga], Wa[Ga] = null, jl = Wa[--Ga], Wa[Ga] = null;
    }
    function cx() {
      return rs(), ts !== null ? {
        id: jl,
        overflow: Vl
      } : null;
    }
    function fx(e, t) {
      rs(), Wa[Ga++] = jl, Wa[Ga++] = Vl, Wa[Ga++] = ts, jl = t.id, Vl = t.overflow, ts = e;
    }
    function rs() {
      er() || g("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Jn = null, Xa = null, gi = !1, as = !1, Qu = null;
    function dx() {
      gi && g("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function rE() {
      as = !0;
    }
    function px() {
      return as;
    }
    function vx(e) {
      var t = e.stateNode.containerInfo;
      return Xa = MR(t), Jn = e, gi = !0, Qu = null, as = !1, !0;
    }
    function hx(e, t, a) {
      return Xa = NR(t), Jn = e, gi = !0, Qu = null, as = !1, a !== null && fx(e, a), !0;
    }
    function aE(e, t) {
      switch (e.tag) {
        case Y: {
          $R(e.stateNode.containerInfo, t);
          break;
        }
        case ne: {
          var a = (e.mode & ve) !== de;
          QR(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case $e: {
          var i = e.memoizedState;
          i.dehydrated !== null && YR(i.dehydrated, t);
          break;
        }
      }
    }
    function iE(e, t) {
      aE(e, t);
      var a = Sb();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= lt) : i.push(a);
    }
    function Zy(e, t) {
      {
        if (as)
          return;
        switch (e.tag) {
          case Y: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ne:
                var i = t.type;
                t.pendingProps, IR(a, i);
                break;
              case we:
                var u = t.pendingProps;
                WR(a, u);
                break;
            }
            break;
          }
          case ne: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ne: {
                var v = t.type, m = t.pendingProps, y = (e.mode & ve) !== de;
                qR(
                  s,
                  f,
                  p,
                  v,
                  m,
                  // TODO: Delete this argument when we remove the legacy root API.
                  y
                );
                break;
              }
              case we: {
                var x = t.pendingProps, T = (e.mode & ve) !== de;
                KR(
                  s,
                  f,
                  p,
                  x,
                  // TODO: Delete this argument when we remove the legacy root API.
                  T
                );
                break;
              }
            }
            break;
          }
          case $e: {
            var _ = e.memoizedState, L = _.dehydrated;
            if (L !== null) switch (t.tag) {
              case ne:
                var N = t.type;
                t.pendingProps, GR(L, N);
                break;
              case we:
                var q = t.pendingProps;
                XR(L, q);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function lE(e, t) {
      t.flags = t.flags & ~ta | bt, Zy(e, t);
    }
    function uE(e, t) {
      switch (e.tag) {
        case ne: {
          var a = e.type;
          e.pendingProps;
          var i = DR(t, a);
          return i !== null ? (e.stateNode = i, Jn = e, Xa = LR(i), !0) : !1;
        }
        case we: {
          var u = e.pendingProps, s = bR(t, u);
          return s !== null ? (e.stateNode = s, Jn = e, Xa = null, !0) : !1;
        }
        case $e: {
          var f = kR(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: cx(),
              retryLane: Wn
            };
            e.memoizedState = p;
            var v = Eb(f);
            return v.return = e, e.child = v, Jn = e, Xa = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Jy(e) {
      return (e.mode & ve) !== de && (e.flags & be) === Se;
    }
    function eg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function tg(e) {
      if (gi) {
        var t = Xa;
        if (!t) {
          Jy(e) && (Zy(Jn, e), eg()), lE(Jn, e), gi = !1, Jn = e;
          return;
        }
        var a = t;
        if (!uE(e, t)) {
          Jy(e) && (Zy(Jn, e), eg()), t = Fd(a);
          var i = Jn;
          if (!t || !uE(e, t)) {
            lE(Jn, e), gi = !1, Jn = e;
            return;
          }
          iE(i, a);
        }
      }
    }
    function mx(e, t, a) {
      var i = e.stateNode, u = !as, s = zR(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function yx(e) {
      var t = e.stateNode, a = e.memoizedProps, i = UR(t, a, e);
      if (i) {
        var u = Jn;
        if (u !== null)
          switch (u.tag) {
            case Y: {
              var s = u.stateNode.containerInfo, f = (u.mode & ve) !== de;
              BR(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ne: {
              var p = u.type, v = u.memoizedProps, m = u.stateNode, y = (u.mode & ve) !== de;
              PR(
                p,
                v,
                m,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                y
              );
              break;
            }
          }
      }
      return i;
    }
    function gx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      AR(a, e);
    }
    function Sx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return HR(a);
    }
    function oE(e) {
      for (var t = e.return; t !== null && t.tag !== ne && t.tag !== Y && t.tag !== $e; )
        t = t.return;
      Jn = t;
    }
    function _h(e) {
      if (e !== Jn)
        return !1;
      if (!gi)
        return oE(e), gi = !0, !1;
      if (e.tag !== Y && (e.tag !== ne || VR(e.type) && !Ay(e.type, e.memoizedProps))) {
        var t = Xa;
        if (t)
          if (Jy(e))
            sE(e), eg();
          else
            for (; t; )
              iE(e, t), t = Fd(t);
      }
      return oE(e), e.tag === $e ? Xa = Sx(e) : Xa = Jn ? Fd(e.stateNode) : null, !0;
    }
    function Ex() {
      return gi && Xa !== null;
    }
    function sE(e) {
      for (var t = Xa; t; )
        aE(e, t), t = Fd(t);
    }
    function Gc() {
      Jn = null, Xa = null, gi = !1, as = !1;
    }
    function cE() {
      Qu !== null && (r1(Qu), Qu = null);
    }
    function er() {
      return gi;
    }
    function ng(e) {
      Qu === null ? Qu = [e] : Qu.push(e);
    }
    var Cx = M.ReactCurrentBatchConfig, Tx = null;
    function Rx() {
      return Cx.transition;
    }
    var Si = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var xx = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Ve && (t = a), a = a.return;
        return t;
      }, is = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Pd = [], $d = [], Yd = [], Qd = [], Id = [], Wd = [], ls = /* @__PURE__ */ new Set();
      Si.recordUnsafeLifecycleWarnings = function(e, t) {
        ls.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Pd.push(e), e.mode & Ve && typeof t.UNSAFE_componentWillMount == "function" && $d.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Yd.push(e), e.mode & Ve && typeof t.UNSAFE_componentWillReceiveProps == "function" && Qd.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Id.push(e), e.mode & Ve && typeof t.UNSAFE_componentWillUpdate == "function" && Wd.push(e));
      }, Si.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Pd.length > 0 && (Pd.forEach(function(T) {
          e.add(Me(T) || "Component"), ls.add(T.type);
        }), Pd = []);
        var t = /* @__PURE__ */ new Set();
        $d.length > 0 && ($d.forEach(function(T) {
          t.add(Me(T) || "Component"), ls.add(T.type);
        }), $d = []);
        var a = /* @__PURE__ */ new Set();
        Yd.length > 0 && (Yd.forEach(function(T) {
          a.add(Me(T) || "Component"), ls.add(T.type);
        }), Yd = []);
        var i = /* @__PURE__ */ new Set();
        Qd.length > 0 && (Qd.forEach(function(T) {
          i.add(Me(T) || "Component"), ls.add(T.type);
        }), Qd = []);
        var u = /* @__PURE__ */ new Set();
        Id.length > 0 && (Id.forEach(function(T) {
          u.add(Me(T) || "Component"), ls.add(T.type);
        }), Id = []);
        var s = /* @__PURE__ */ new Set();
        if (Wd.length > 0 && (Wd.forEach(function(T) {
          s.add(Me(T) || "Component"), ls.add(T.type);
        }), Wd = []), t.size > 0) {
          var f = is(t);
          g(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = is(i);
          g(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = is(s);
          g(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var m = is(e);
          Ge(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, m);
        }
        if (a.size > 0) {
          var y = is(a);
          Ge(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (u.size > 0) {
          var x = is(u);
          Ge(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
      };
      var Oh = /* @__PURE__ */ new Map(), fE = /* @__PURE__ */ new Set();
      Si.recordLegacyContextWarning = function(e, t) {
        var a = xx(e);
        if (a === null) {
          g("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!fE.has(e.type)) {
          var i = Oh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Oh.set(a, i)), i.push(e));
        }
      }, Si.flushLegacyContextWarning = function() {
        Oh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Me(s) || "Component"), fE.add(s.type);
            });
            var u = is(i);
            try {
              ht(a), g(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              an();
            }
          }
        });
      }, Si.discardPendingWarnings = function() {
        Pd = [], $d = [], Yd = [], Qd = [], Id = [], Wd = [], Oh = /* @__PURE__ */ new Map();
      };
    }
    var rg, ag, ig, lg, ug, dE = function(e, t) {
    };
    rg = !1, ag = !1, ig = {}, lg = {}, ug = {}, dE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Me(t) || "Component";
        lg[a] || (lg[a] = !0, g('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function wx(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Gd(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Ve || Kn) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== le) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !wx(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Me(e) || "Component";
          ig[u] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), ig[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== le)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          ei(i, "ref");
          var m = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === m)
            return t.ref;
          var y = function(x) {
            var T = v.refs;
            x === null ? delete T[m] : T[m] = x;
          };
          return y._stringRef = m, y;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function Lh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Mh(e) {
      {
        var t = Me(e) || "Component";
        if (ug[t])
          return;
        ug[t] = !0, g("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function pE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function vE(e) {
      function t(D, z) {
        if (e) {
          var b = D.deletions;
          b === null ? (D.deletions = [z], D.flags |= lt) : b.push(z);
        }
      }
      function a(D, z) {
        if (!e)
          return null;
        for (var b = z; b !== null; )
          t(D, b), b = b.sibling;
        return null;
      }
      function i(D, z) {
        for (var b = /* @__PURE__ */ new Map(), P = z; P !== null; )
          P.key !== null ? b.set(P.key, P) : b.set(P.index, P), P = P.sibling;
        return b;
      }
      function u(D, z) {
        var b = hs(D, z);
        return b.index = 0, b.sibling = null, b;
      }
      function s(D, z, b) {
        if (D.index = b, !e)
          return D.flags |= Gf, z;
        var P = D.alternate;
        if (P !== null) {
          var ae = P.index;
          return ae < z ? (D.flags |= bt, z) : ae;
        } else
          return D.flags |= bt, z;
      }
      function f(D) {
        return e && D.alternate === null && (D.flags |= bt), D;
      }
      function p(D, z, b, P) {
        if (z === null || z.tag !== we) {
          var ae = n0(b, D.mode, P);
          return ae.return = D, ae;
        } else {
          var Z = u(z, b);
          return Z.return = D, Z;
        }
      }
      function v(D, z, b, P) {
        var ae = b.type;
        if (ae === Ra)
          return y(D, z, b.props.children, P, b.key);
        if (z !== null && (z.elementType === ae || // Keep this check inline so it only runs on the false path:
        S1(z, b) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ae == "object" && ae !== null && ae.$$typeof === xe && pE(ae) === z.type)) {
          var Z = u(z, b.props);
          return Z.ref = Gd(D, z, b), Z.return = D, Z._debugSource = b._source, Z._debugOwner = b._owner, Z;
        }
        var De = t0(b, D.mode, P);
        return De.ref = Gd(D, z, b), De.return = D, De;
      }
      function m(D, z, b, P) {
        if (z === null || z.tag !== K || z.stateNode.containerInfo !== b.containerInfo || z.stateNode.implementation !== b.implementation) {
          var ae = r0(b, D.mode, P);
          return ae.return = D, ae;
        } else {
          var Z = u(z, b.children || []);
          return Z.return = D, Z;
        }
      }
      function y(D, z, b, P, ae) {
        if (z === null || z.tag !== Ue) {
          var Z = no(b, D.mode, P, ae);
          return Z.return = D, Z;
        } else {
          var De = u(z, b);
          return De.return = D, De;
        }
      }
      function x(D, z, b) {
        if (typeof z == "string" && z !== "" || typeof z == "number") {
          var P = n0("" + z, D.mode, b);
          return P.return = D, P;
        }
        if (typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case ti: {
              var ae = t0(z, D.mode, b);
              return ae.ref = Gd(D, null, z), ae.return = D, ae;
            }
            case Mr: {
              var Z = r0(z, D.mode, b);
              return Z.return = D, Z;
            }
            case xe: {
              var De = z._payload, Le = z._init;
              return x(D, Le(De), b);
            }
          }
          if (mn(z) || Nr(z)) {
            var yt = no(z, D.mode, b, null);
            return yt.return = D, yt;
          }
          Lh(D, z);
        }
        return typeof z == "function" && Mh(D), null;
      }
      function T(D, z, b, P) {
        var ae = z !== null ? z.key : null;
        if (typeof b == "string" && b !== "" || typeof b == "number")
          return ae !== null ? null : p(D, z, "" + b, P);
        if (typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case ti:
              return b.key === ae ? v(D, z, b, P) : null;
            case Mr:
              return b.key === ae ? m(D, z, b, P) : null;
            case xe: {
              var Z = b._payload, De = b._init;
              return T(D, z, De(Z), P);
            }
          }
          if (mn(b) || Nr(b))
            return ae !== null ? null : y(D, z, b, P, null);
          Lh(D, b);
        }
        return typeof b == "function" && Mh(D), null;
      }
      function _(D, z, b, P, ae) {
        if (typeof P == "string" && P !== "" || typeof P == "number") {
          var Z = D.get(b) || null;
          return p(z, Z, "" + P, ae);
        }
        if (typeof P == "object" && P !== null) {
          switch (P.$$typeof) {
            case ti: {
              var De = D.get(P.key === null ? b : P.key) || null;
              return v(z, De, P, ae);
            }
            case Mr: {
              var Le = D.get(P.key === null ? b : P.key) || null;
              return m(z, Le, P, ae);
            }
            case xe:
              var yt = P._payload, rt = P._init;
              return _(D, z, b, rt(yt), ae);
          }
          if (mn(P) || Nr(P)) {
            var fn = D.get(b) || null;
            return y(z, fn, P, ae, null);
          }
          Lh(z, P);
        }
        return typeof P == "function" && Mh(z), null;
      }
      function L(D, z, b) {
        {
          if (typeof D != "object" || D === null)
            return z;
          switch (D.$$typeof) {
            case ti:
            case Mr:
              dE(D, b);
              var P = D.key;
              if (typeof P != "string")
                break;
              if (z === null) {
                z = /* @__PURE__ */ new Set(), z.add(P);
                break;
              }
              if (!z.has(P)) {
                z.add(P);
                break;
              }
              g("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", P);
              break;
            case xe:
              var ae = D._payload, Z = D._init;
              L(Z(ae), z, b);
              break;
          }
        }
        return z;
      }
      function N(D, z, b, P) {
        for (var ae = null, Z = 0; Z < b.length; Z++) {
          var De = b[Z];
          ae = L(De, ae, D);
        }
        for (var Le = null, yt = null, rt = z, fn = 0, at = 0, nn = null; rt !== null && at < b.length; at++) {
          rt.index > at ? (nn = rt, rt = null) : nn = rt.sibling;
          var Dr = T(D, rt, b[at], P);
          if (Dr === null) {
            rt === null && (rt = nn);
            break;
          }
          e && rt && Dr.alternate === null && t(D, rt), fn = s(Dr, fn, at), yt === null ? Le = Dr : yt.sibling = Dr, yt = Dr, rt = nn;
        }
        if (at === b.length) {
          if (a(D, rt), er()) {
            var ur = at;
            ns(D, ur);
          }
          return Le;
        }
        if (rt === null) {
          for (; at < b.length; at++) {
            var Na = x(D, b[at], P);
            Na !== null && (fn = s(Na, fn, at), yt === null ? Le = Na : yt.sibling = Na, yt = Na);
          }
          if (er()) {
            var Yr = at;
            ns(D, Yr);
          }
          return Le;
        }
        for (var Qr = i(D, rt); at < b.length; at++) {
          var br = _(Qr, D, at, b[at], P);
          br !== null && (e && br.alternate !== null && Qr.delete(br.key === null ? at : br.key), fn = s(br, fn, at), yt === null ? Le = br : yt.sibling = br, yt = br);
        }
        if (e && Qr.forEach(function(vf) {
          return t(D, vf);
        }), er()) {
          var Wl = at;
          ns(D, Wl);
        }
        return Le;
      }
      function q(D, z, b, P) {
        var ae = Nr(b);
        if (typeof ae != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          b[Symbol.toStringTag] === "Generator" && (ag || g("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), ag = !0), b.entries === ae && (rg || g("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rg = !0);
          var Z = ae.call(b);
          if (Z)
            for (var De = null, Le = Z.next(); !Le.done; Le = Z.next()) {
              var yt = Le.value;
              De = L(yt, De, D);
            }
        }
        var rt = ae.call(b);
        if (rt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var fn = null, at = null, nn = z, Dr = 0, ur = 0, Na = null, Yr = rt.next(); nn !== null && !Yr.done; ur++, Yr = rt.next()) {
          nn.index > ur ? (Na = nn, nn = null) : Na = nn.sibling;
          var Qr = T(D, nn, Yr.value, P);
          if (Qr === null) {
            nn === null && (nn = Na);
            break;
          }
          e && nn && Qr.alternate === null && t(D, nn), Dr = s(Qr, Dr, ur), at === null ? fn = Qr : at.sibling = Qr, at = Qr, nn = Na;
        }
        if (Yr.done) {
          if (a(D, nn), er()) {
            var br = ur;
            ns(D, br);
          }
          return fn;
        }
        if (nn === null) {
          for (; !Yr.done; ur++, Yr = rt.next()) {
            var Wl = x(D, Yr.value, P);
            Wl !== null && (Dr = s(Wl, Dr, ur), at === null ? fn = Wl : at.sibling = Wl, at = Wl);
          }
          if (er()) {
            var vf = ur;
            ns(D, vf);
          }
          return fn;
        }
        for (var Dp = i(D, nn); !Yr.done; ur++, Yr = rt.next()) {
          var al = _(Dp, D, ur, Yr.value, P);
          al !== null && (e && al.alternate !== null && Dp.delete(al.key === null ? ur : al.key), Dr = s(al, Dr, ur), at === null ? fn = al : at.sibling = al, at = al);
        }
        if (e && Dp.forEach(function(Kb) {
          return t(D, Kb);
        }), er()) {
          var qb = ur;
          ns(D, qb);
        }
        return fn;
      }
      function Ee(D, z, b, P) {
        if (z !== null && z.tag === we) {
          a(D, z.sibling);
          var ae = u(z, b);
          return ae.return = D, ae;
        }
        a(D, z);
        var Z = n0(b, D.mode, P);
        return Z.return = D, Z;
      }
      function he(D, z, b, P) {
        for (var ae = b.key, Z = z; Z !== null; ) {
          if (Z.key === ae) {
            var De = b.type;
            if (De === Ra) {
              if (Z.tag === Ue) {
                a(D, Z.sibling);
                var Le = u(Z, b.props.children);
                return Le.return = D, Le._debugSource = b._source, Le._debugOwner = b._owner, Le;
              }
            } else if (Z.elementType === De || // Keep this check inline so it only runs on the false path:
            S1(Z, b) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof De == "object" && De !== null && De.$$typeof === xe && pE(De) === Z.type) {
              a(D, Z.sibling);
              var yt = u(Z, b.props);
              return yt.ref = Gd(D, Z, b), yt.return = D, yt._debugSource = b._source, yt._debugOwner = b._owner, yt;
            }
            a(D, Z);
            break;
          } else
            t(D, Z);
          Z = Z.sibling;
        }
        if (b.type === Ra) {
          var rt = no(b.props.children, D.mode, P, b.key);
          return rt.return = D, rt;
        } else {
          var fn = t0(b, D.mode, P);
          return fn.ref = Gd(D, z, b), fn.return = D, fn;
        }
      }
      function qe(D, z, b, P) {
        for (var ae = b.key, Z = z; Z !== null; ) {
          if (Z.key === ae)
            if (Z.tag === K && Z.stateNode.containerInfo === b.containerInfo && Z.stateNode.implementation === b.implementation) {
              a(D, Z.sibling);
              var De = u(Z, b.children || []);
              return De.return = D, De;
            } else {
              a(D, Z);
              break;
            }
          else
            t(D, Z);
          Z = Z.sibling;
        }
        var Le = r0(b, D.mode, P);
        return Le.return = D, Le;
      }
      function Qe(D, z, b, P) {
        var ae = typeof b == "object" && b !== null && b.type === Ra && b.key === null;
        if (ae && (b = b.props.children), typeof b == "object" && b !== null) {
          switch (b.$$typeof) {
            case ti:
              return f(he(D, z, b, P));
            case Mr:
              return f(qe(D, z, b, P));
            case xe:
              var Z = b._payload, De = b._init;
              return Qe(D, z, De(Z), P);
          }
          if (mn(b))
            return N(D, z, b, P);
          if (Nr(b))
            return q(D, z, b, P);
          Lh(D, b);
        }
        return typeof b == "string" && b !== "" || typeof b == "number" ? f(Ee(D, z, "" + b, P)) : (typeof b == "function" && Mh(D), a(D, z));
      }
      return Qe;
    }
    var Xc = vE(!0), hE = vE(!1);
    function Dx(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = hs(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = hs(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function bx(e, t) {
      for (var a = e.child; a !== null; )
        vb(a, t), a = a.sibling;
    }
    var og = Pu(null), sg;
    sg = {};
    var Nh = null, qc = null, cg = null, zh = !1;
    function Uh() {
      Nh = null, qc = null, cg = null, zh = !1;
    }
    function mE() {
      zh = !0;
    }
    function yE() {
      zh = !1;
    }
    function gE(e, t, a) {
      xr(og, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== sg && g("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = sg;
    }
    function fg(e, t) {
      var a = og.current;
      Rr(og, t), e._currentValue = a;
    }
    function dg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (kl(i.childLanes, t) ? u !== null && !kl(u.childLanes, t) && (u.childLanes = Ne(u.childLanes, t)) : (i.childLanes = Ne(i.childLanes, t), u !== null && (u.childLanes = Ne(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && g("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function kx(e, t, a) {
      _x(e, t, a);
    }
    function _x(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === le) {
                var p = Ru(a), v = Bl(Rt, p);
                v.tag = Hh;
                var m = i.updateQueue;
                if (m !== null) {
                  var y = m.shared, x = y.pending;
                  x === null ? v.next = v : (v.next = x.next, x.next = v), y.pending = v;
                }
              }
              i.lanes = Ne(i.lanes, a);
              var T = i.alternate;
              T !== null && (T.lanes = Ne(T.lanes, a)), dg(i.return, a, e), s.lanes = Ne(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === Je)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Bt) {
          var _ = i.return;
          if (_ === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          _.lanes = Ne(_.lanes, a);
          var L = _.alternate;
          L !== null && (L.lanes = Ne(L.lanes, a)), dg(_, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var N = u.sibling;
            if (N !== null) {
              N.return = u.return, u = N;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function Kc(e, t) {
      Nh = e, qc = null, cg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Cr(a.lanes, t) && sp(), a.firstContext = null);
      }
    }
    function Tn(e) {
      zh && g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (cg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (qc === null) {
          if (Nh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          qc = a, Nh.dependencies = {
            lanes: H,
            firstContext: a
          };
        } else
          qc = qc.next = a;
      }
      return t;
    }
    var us = null;
    function pg(e) {
      us === null ? us = [e] : us.push(e);
    }
    function Ox() {
      if (us !== null) {
        for (var e = 0; e < us.length; e++) {
          var t = us[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        us = null;
      }
    }
    function SE(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ah(e, i);
    }
    function Lx(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Mx(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, pg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ah(e, i);
    }
    function pa(e, t) {
      return Ah(e, t);
    }
    var Nx = Ah;
    function Ah(e, t) {
      e.lanes = Ne(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Ne(a.lanes, t)), a === null && (e.flags & (bt | ta)) !== Se && h1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = Ne(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Ne(a.childLanes, t) : (u.flags & (bt | ta)) !== Se && h1(e), i = u, u = u.return;
      if (i.tag === Y) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var EE = 0, CE = 1, Hh = 2, vg = 3, Fh = !1, hg, jh;
    hg = !1, jh = null;
    function mg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: H
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function TE(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Bl(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: EE,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Iu(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (jh === u && !hg && (g("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), hg = !0), LD()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Nx(e, a);
      } else
        return Mx(e, u, t, a);
    }
    function Vh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (sd(a)) {
          var s = u.lanes;
          s = vc(s, e.pendingLanes);
          var f = Ne(s, a);
          u.lanes = f, cd(e, f);
        }
      }
    }
    function yg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var m = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = m : (f.next = m, f = m), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var y = a.lastBaseUpdate;
      y === null ? a.firstBaseUpdate = t : y.next = t, a.lastBaseUpdate = t;
    }
    function zx(e, t, a, i, u, s) {
      switch (a.tag) {
        case CE: {
          var f = a.payload;
          if (typeof f == "function") {
            mE();
            var p = f.call(s, i, u);
            {
              if (e.mode & Ve) {
                en(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  en(!1);
                }
              }
              yE();
            }
            return p;
          }
          return f;
        }
        case vg:
          e.flags = e.flags & ~gn | be;
        case EE: {
          var v = a.payload, m;
          if (typeof v == "function") {
            mE(), m = v.call(s, i, u);
            {
              if (e.mode & Ve) {
                en(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  en(!1);
                }
              }
              yE();
            }
          } else
            m = v;
          return m == null ? i : je({}, i, m);
        }
        case Hh:
          return Fh = !0, i;
      }
      return i;
    }
    function Bh(e, t, a, i) {
      var u = e.updateQueue;
      Fh = !1, jh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, m = v.next;
        v.next = null, f === null ? s = m : f.next = m, f = v;
        var y = e.alternate;
        if (y !== null) {
          var x = y.updateQueue, T = x.lastBaseUpdate;
          T !== f && (T === null ? x.firstBaseUpdate = m : T.next = m, x.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var _ = u.baseState, L = H, N = null, q = null, Ee = null, he = s;
        do {
          var qe = he.lane, Qe = he.eventTime;
          if (kl(i, qe)) {
            if (Ee !== null) {
              var z = {
                eventTime: Qe,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: tn,
                tag: he.tag,
                payload: he.payload,
                callback: he.callback,
                next: null
              };
              Ee = Ee.next = z;
            }
            _ = zx(e, u, he, _, t, a);
            var b = he.callback;
            if (b !== null && // If the update was already committed, we should not queue its
            // callback again.
            he.lane !== tn) {
              e.flags |= Ba;
              var P = u.effects;
              P === null ? u.effects = [he] : P.push(he);
            }
          } else {
            var D = {
              eventTime: Qe,
              lane: qe,
              tag: he.tag,
              payload: he.payload,
              callback: he.callback,
              next: null
            };
            Ee === null ? (q = Ee = D, N = _) : Ee = Ee.next = D, L = Ne(L, qe);
          }
          if (he = he.next, he === null) {
            if (p = u.shared.pending, p === null)
              break;
            var ae = p, Z = ae.next;
            ae.next = null, he = Z, u.lastBaseUpdate = ae, u.shared.pending = null;
          }
        } while (!0);
        Ee === null && (N = _), u.baseState = N, u.firstBaseUpdate = q, u.lastBaseUpdate = Ee;
        var De = u.shared.interleaved;
        if (De !== null) {
          var Le = De;
          do
            L = Ne(L, Le.lane), Le = Le.next;
          while (Le !== De);
        } else s === null && (u.shared.lanes = H);
        Cp(L), e.lanes = L, e.memoizedState = _;
      }
      jh = null;
    }
    function Ux(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function RE() {
      Fh = !1;
    }
    function Ph() {
      return Fh;
    }
    function xE(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Ux(f, a));
        }
    }
    var Xd = {}, Wu = Pu(Xd), qd = Pu(Xd), $h = Pu(Xd);
    function Yh(e) {
      if (e === Xd)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function wE() {
      var e = Yh($h.current);
      return e;
    }
    function gg(e, t) {
      xr($h, t, e), xr(qd, e, e), xr(Wu, Xd, e);
      var a = ZT(t);
      Rr(Wu, e), xr(Wu, a, e);
    }
    function Zc(e) {
      Rr(Wu, e), Rr(qd, e), Rr($h, e);
    }
    function Sg() {
      var e = Yh(Wu.current);
      return e;
    }
    function DE(e) {
      Yh($h.current);
      var t = Yh(Wu.current), a = JT(t, e.type);
      t !== a && (xr(qd, e, e), xr(Wu, a, e));
    }
    function Eg(e) {
      qd.current === e && (Rr(Wu, e), Rr(qd, e));
    }
    var Ax = 0, bE = 1, kE = 1, Kd = 2, Ei = Pu(Ax);
    function Cg(e, t) {
      return (e & t) !== 0;
    }
    function Jc(e) {
      return e & bE;
    }
    function Tg(e, t) {
      return e & bE | t;
    }
    function Hx(e, t) {
      return e | t;
    }
    function Gu(e, t) {
      xr(Ei, t, e);
    }
    function ef(e) {
      Rr(Ei, e);
    }
    function Fx(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Qh(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === $e) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || Q0(i) || Vy(i))
              return t;
          }
        } else if (t.tag === vt && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & be) !== Se;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var va = (
      /*   */
      0
    ), Ln = (
      /* */
      1
    ), Ki = (
      /*  */
      2
    ), Mn = (
      /*    */
      4
    ), tr = (
      /*   */
      8
    ), Rg = [];
    function xg() {
      for (var e = 0; e < Rg.length; e++) {
        var t = Rg[e];
        t._workInProgressVersionPrimary = null;
      }
      Rg.length = 0;
    }
    function jx(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var te = M.ReactCurrentDispatcher, Zd = M.ReactCurrentBatchConfig, wg, tf;
    wg = /* @__PURE__ */ new Set();
    var os = H, mt = null, Nn = null, zn = null, Ih = !1, Jd = !1, ep = 0, Vx = 0, Bx = 25, U = null, qa = null, Xu = -1, Dg = !1;
    function st() {
      {
        var e = U;
        qa === null ? qa = [e] : qa.push(e);
      }
    }
    function G() {
      {
        var e = U;
        qa !== null && (Xu++, qa[Xu] !== e && Px(e));
      }
    }
    function nf(e) {
      e != null && !mn(e) && g("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", U, typeof e);
    }
    function Px(e) {
      {
        var t = Me(mt);
        if (!wg.has(t) && (wg.add(t), qa !== null)) {
          for (var a = "", i = 30, u = 0; u <= Xu; u++) {
            for (var s = qa[u], f = u === Xu ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          g(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function wr() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function bg(e, t) {
      if (Dg)
        return !1;
      if (t === null)
        return g("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", U), !1;
      e.length !== t.length && g(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, U, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!oe(e[a], t[a]))
          return !1;
      return !0;
    }
    function rf(e, t, a, i, u, s) {
      os = s, mt = t, qa = e !== null ? e._debugHookTypes : null, Xu = -1, Dg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = H, e !== null && e.memoizedState !== null ? te.current = qE : qa !== null ? te.current = XE : te.current = GE;
      var f = a(i, u);
      if (Jd) {
        var p = 0;
        do {
          if (Jd = !1, ep = 0, p >= Bx)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Dg = !1, Nn = null, zn = null, t.updateQueue = null, Xu = -1, te.current = KE, f = a(i, u);
        } while (Jd);
      }
      te.current = im, t._debugHookTypes = qa;
      var v = Nn !== null && Nn.next !== null;
      if (os = H, mt = null, Nn = null, zn = null, U = null, qa = null, Xu = -1, e !== null && (e.flags & kn) !== (t.flags & kn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & ve) !== de && g("Internal React error: Expected static flag was missing. Please notify the React team."), Ih = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function af() {
      var e = ep !== 0;
      return ep = 0, e;
    }
    function _E(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & jr) !== de ? t.flags &= ~(Sl | hr | Mt | ze) : t.flags &= ~(Mt | ze), e.lanes = jo(e.lanes, a);
    }
    function OE() {
      if (te.current = im, Ih) {
        for (var e = mt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Ih = !1;
      }
      os = H, mt = null, Nn = null, zn = null, qa = null, Xu = -1, U = null, $E = !1, Jd = !1, ep = 0;
    }
    function Zi() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return zn === null ? mt.memoizedState = zn = e : zn = zn.next = e, zn;
    }
    function Ka() {
      var e;
      if (Nn === null) {
        var t = mt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = Nn.next;
      var a;
      if (zn === null ? a = mt.memoizedState : a = zn.next, a !== null)
        zn = a, a = zn.next, Nn = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Nn = e;
        var i = {
          memoizedState: Nn.memoizedState,
          baseState: Nn.baseState,
          baseQueue: Nn.baseQueue,
          queue: Nn.queue,
          next: null
        };
        zn === null ? mt.memoizedState = zn = i : zn = zn.next = i;
      }
      return zn;
    }
    function LE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function kg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function _g(e, t, a) {
      var i = Zi(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: H,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Ix.bind(null, mt, s);
      return [i.memoizedState, f];
    }
    function Og(e, t, a) {
      var i = Ka(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = Nn, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, m = p.next;
          f.next = m, p.next = v;
        }
        s.baseQueue !== f && g("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var y = f.next, x = s.baseState, T = null, _ = null, L = null, N = y;
        do {
          var q = N.lane;
          if (kl(os, q)) {
            if (L !== null) {
              var he = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: tn,
                action: N.action,
                hasEagerState: N.hasEagerState,
                eagerState: N.eagerState,
                next: null
              };
              L = L.next = he;
            }
            if (N.hasEagerState)
              x = N.eagerState;
            else {
              var qe = N.action;
              x = e(x, qe);
            }
          } else {
            var Ee = {
              lane: q,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            };
            L === null ? (_ = L = Ee, T = x) : L = L.next = Ee, mt.lanes = Ne(mt.lanes, q), Cp(q);
          }
          N = N.next;
        } while (N !== null && N !== y);
        L === null ? T = x : L.next = _, oe(x, i.memoizedState) || sp(), i.memoizedState = x, i.baseState = T, i.baseQueue = L, u.lastRenderedState = x;
      }
      var Qe = u.interleaved;
      if (Qe !== null) {
        var D = Qe;
        do {
          var z = D.lane;
          mt.lanes = Ne(mt.lanes, z), Cp(z), D = D.next;
        } while (D !== Qe);
      } else f === null && (u.lanes = H);
      var b = u.dispatch;
      return [i.memoizedState, b];
    }
    function Lg(e, t, a) {
      var i = Ka(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, m = v;
        do {
          var y = m.action;
          p = e(p, y), m = m.next;
        } while (m !== v);
        oe(p, i.memoizedState) || sp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function Rk(e, t, a) {
    }
    function xk(e, t, a) {
    }
    function Mg(e, t, a) {
      var i = mt, u = Zi(), s, f = er();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), tf || s !== a() && (g("The result of getServerSnapshot should be cached to avoid an infinite loop"), tf = !0);
      } else {
        if (s = t(), !tf) {
          var p = t();
          oe(s, p) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), tf = !0);
        }
        var v = xm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Fo(v, os) || ME(i, t, s);
      }
      u.memoizedState = s;
      var m = {
        value: s,
        getSnapshot: t
      };
      return u.queue = m, Kh(zE.bind(null, i, m, e), [e]), i.flags |= Mt, tp(Ln | tr, NE.bind(null, i, m, s, t), void 0, null), s;
    }
    function Wh(e, t, a) {
      var i = mt, u = Ka(), s = t();
      if (!tf) {
        var f = t();
        oe(s, f) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), tf = !0);
      }
      var p = u.memoizedState, v = !oe(p, s);
      v && (u.memoizedState = s, sp());
      var m = u.queue;
      if (rp(zE.bind(null, i, m, e), [e]), m.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      zn !== null && zn.memoizedState.tag & Ln) {
        i.flags |= Mt, tp(Ln | tr, NE.bind(null, i, m, s, t), void 0, null);
        var y = xm();
        if (y === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Fo(y, os) || ME(i, t, s);
      }
      return s;
    }
    function ME(e, t, a) {
      e.flags |= ko;
      var i = {
        getSnapshot: t,
        value: a
      }, u = mt.updateQueue;
      if (u === null)
        u = LE(), mt.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function NE(e, t, a, i) {
      t.value = a, t.getSnapshot = i, UE(t) && AE(e);
    }
    function zE(e, t, a) {
      var i = function() {
        UE(t) && AE(e);
      };
      return a(i);
    }
    function UE(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !oe(a, i);
      } catch {
        return !0;
      }
    }
    function AE(e) {
      var t = pa(e, ye);
      t !== null && Fn(t, e, ye, Rt);
    }
    function Gh(e) {
      var t = Zi();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: H,
        dispatch: null,
        lastRenderedReducer: kg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Wx.bind(null, mt, a);
      return [t.memoizedState, i];
    }
    function Ng(e) {
      return Og(kg);
    }
    function zg(e) {
      return Lg(kg);
    }
    function tp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = mt.updateQueue;
      if (s === null)
        s = LE(), mt.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function Ug(e) {
      var t = Zi();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Xh(e) {
      var t = Ka();
      return t.memoizedState;
    }
    function np(e, t, a, i) {
      var u = Zi(), s = i === void 0 ? null : i;
      mt.flags |= e, u.memoizedState = tp(Ln | t, a, void 0, s);
    }
    function qh(e, t, a, i) {
      var u = Ka(), s = i === void 0 ? null : i, f = void 0;
      if (Nn !== null) {
        var p = Nn.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (bg(s, v)) {
            u.memoizedState = tp(t, a, f, s);
            return;
          }
        }
      }
      mt.flags |= e, u.memoizedState = tp(Ln | t, a, f, s);
    }
    function Kh(e, t) {
      return (mt.mode & jr) !== de ? np(Sl | Mt | ji, tr, e, t) : np(Mt | ji, tr, e, t);
    }
    function rp(e, t) {
      return qh(Mt, tr, e, t);
    }
    function Ag(e, t) {
      return np(ze, Ki, e, t);
    }
    function Zh(e, t) {
      return qh(ze, Ki, e, t);
    }
    function Hg(e, t) {
      var a = ze;
      return a |= vr, (mt.mode & jr) !== de && (a |= hr), np(a, Mn, e, t);
    }
    function Jh(e, t) {
      return qh(ze, Mn, e, t);
    }
    function HE(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || g("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Fg(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = ze;
      return u |= vr, (mt.mode & jr) !== de && (u |= hr), np(u, Mn, HE.bind(null, t, e), i);
    }
    function em(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return qh(ze, Mn, HE.bind(null, t, e), i);
    }
    function $x(e, t) {
    }
    var tm = $x;
    function jg(e, t) {
      var a = Zi(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function nm(e, t) {
      var a = Ka(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Vg(e, t) {
      var a = Zi(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function rm(e, t) {
      var a = Ka(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (bg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Bg(e) {
      var t = Zi();
      return t.memoizedState = e, e;
    }
    function FE(e) {
      var t = Ka(), a = Nn, i = a.memoizedState;
      return VE(t, i, e);
    }
    function jE(e) {
      var t = Ka();
      if (Nn === null)
        return t.memoizedState = e, e;
      var a = Nn.memoizedState;
      return VE(t, a, e);
    }
    function VE(e, t, a) {
      var i = !Nv(os);
      if (i) {
        if (!oe(a, t)) {
          var u = Av();
          mt.lanes = Ne(mt.lanes, u), Cp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, sp()), e.memoizedState = a, a;
    }
    function Yx(e, t, a) {
      var i = ua();
      $t(uy(i, pi)), e(!0);
      var u = Zd.transition;
      Zd.transition = {};
      var s = Zd.transition;
      Zd.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if ($t(i), Zd.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && Ge("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Pg() {
      var e = Gh(!1), t = e[0], a = e[1], i = Yx.bind(null, a), u = Zi();
      return u.memoizedState = i, [t, i];
    }
    function BE() {
      var e = Ng(), t = e[0], a = Ka(), i = a.memoizedState;
      return [t, i];
    }
    function PE() {
      var e = zg(), t = e[0], a = Ka(), i = a.memoizedState;
      return [t, i];
    }
    var $E = !1;
    function Qx() {
      return $E;
    }
    function $g() {
      var e = Zi(), t = xm(), a = t.identifierPrefix, i;
      if (er()) {
        var u = ox();
        i = ":" + a + "R" + u;
        var s = ep++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Vx++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function am() {
      var e = Ka(), t = e.memoizedState;
      return t;
    }
    function Ix(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = eo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (YE(e))
        QE(t, u);
      else {
        var s = SE(e, t, u, i);
        if (s !== null) {
          var f = $r();
          Fn(s, e, i, f), IE(s, t, i);
        }
      }
      WE(e, i);
    }
    function Wx(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = eo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (YE(e))
        QE(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === H && (s === null || s.lanes === H)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = te.current, te.current = Ci;
            try {
              var v = t.lastRenderedState, m = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = m, oe(m, v)) {
                Lx(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              te.current = p;
            }
          }
        }
        var y = SE(e, t, u, i);
        if (y !== null) {
          var x = $r();
          Fn(y, e, i, x), IE(y, t, i);
        }
      }
      WE(e, i);
    }
    function YE(e) {
      var t = e.alternate;
      return e === mt || t !== null && t === mt;
    }
    function QE(e, t) {
      Jd = Ih = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function IE(e, t, a) {
      if (sd(a)) {
        var i = t.lanes;
        i = vc(i, e.pendingLanes);
        var u = Ne(i, a);
        t.lanes = u, cd(e, u);
      }
    }
    function WE(e, t, a) {
      Mo(e, t);
    }
    var im = {
      readContext: Tn,
      useCallback: wr,
      useContext: wr,
      useEffect: wr,
      useImperativeHandle: wr,
      useInsertionEffect: wr,
      useLayoutEffect: wr,
      useMemo: wr,
      useReducer: wr,
      useRef: wr,
      useState: wr,
      useDebugValue: wr,
      useDeferredValue: wr,
      useTransition: wr,
      useMutableSource: wr,
      useSyncExternalStore: wr,
      useId: wr,
      unstable_isNewReconciler: Q
    }, GE = null, XE = null, qE = null, KE = null, Ji = null, Ci = null, lm = null;
    {
      var Yg = function() {
        g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Oe = function() {
        g("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      GE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", st(), nf(t), jg(e, t);
        },
        useContext: function(e) {
          return U = "useContext", st(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", st(), nf(t), Kh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", st(), nf(a), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", st(), nf(t), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", st(), nf(t), Hg(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", st(), nf(t);
          var a = te.current;
          te.current = Ji;
          try {
            return Vg(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", st();
          var i = te.current;
          te.current = Ji;
          try {
            return _g(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", st(), Ug(e);
        },
        useState: function(e) {
          U = "useState", st();
          var t = te.current;
          te.current = Ji;
          try {
            return Gh(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", st(), void 0;
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", st(), Bg(e);
        },
        useTransition: function() {
          return U = "useTransition", st(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", st(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", st(), Mg(e, t, a);
        },
        useId: function() {
          return U = "useId", st(), $g();
        },
        unstable_isNewReconciler: Q
      }, XE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", G(), jg(e, t);
        },
        useContext: function(e) {
          return U = "useContext", G(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", G(), Kh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", G(), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", G(), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", G(), Hg(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", G();
          var a = te.current;
          te.current = Ji;
          try {
            return Vg(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", G();
          var i = te.current;
          te.current = Ji;
          try {
            return _g(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", G(), Ug(e);
        },
        useState: function(e) {
          U = "useState", G();
          var t = te.current;
          te.current = Ji;
          try {
            return Gh(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", G(), void 0;
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", G(), Bg(e);
        },
        useTransition: function() {
          return U = "useTransition", G(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", G(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", G(), Mg(e, t, a);
        },
        useId: function() {
          return U = "useId", G(), $g();
        },
        unstable_isNewReconciler: Q
      }, qE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", G(), nm(e, t);
        },
        useContext: function(e) {
          return U = "useContext", G(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", G(), rp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", G(), em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", G(), Zh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", G(), Jh(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", G();
          var a = te.current;
          te.current = Ci;
          try {
            return rm(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", G();
          var i = te.current;
          te.current = Ci;
          try {
            return Og(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", G(), Xh();
        },
        useState: function(e) {
          U = "useState", G();
          var t = te.current;
          te.current = Ci;
          try {
            return Ng(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", G(), tm();
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", G(), FE(e);
        },
        useTransition: function() {
          return U = "useTransition", G(), BE();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", G(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", G(), Wh(e, t);
        },
        useId: function() {
          return U = "useId", G(), am();
        },
        unstable_isNewReconciler: Q
      }, KE = {
        readContext: function(e) {
          return Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", G(), nm(e, t);
        },
        useContext: function(e) {
          return U = "useContext", G(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", G(), rp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", G(), em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", G(), Zh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", G(), Jh(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", G();
          var a = te.current;
          te.current = lm;
          try {
            return rm(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", G();
          var i = te.current;
          te.current = lm;
          try {
            return Lg(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", G(), Xh();
        },
        useState: function(e) {
          U = "useState", G();
          var t = te.current;
          te.current = lm;
          try {
            return zg(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", G(), tm();
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", G(), jE(e);
        },
        useTransition: function() {
          return U = "useTransition", G(), PE();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", G(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", G(), Wh(e, t);
        },
        useId: function() {
          return U = "useId", G(), am();
        },
        unstable_isNewReconciler: Q
      }, Ji = {
        readContext: function(e) {
          return Yg(), Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", Oe(), st(), jg(e, t);
        },
        useContext: function(e) {
          return U = "useContext", Oe(), st(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", Oe(), st(), Kh(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", Oe(), st(), Fg(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", Oe(), st(), Ag(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", Oe(), st(), Hg(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", Oe(), st();
          var a = te.current;
          te.current = Ji;
          try {
            return Vg(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", Oe(), st();
          var i = te.current;
          te.current = Ji;
          try {
            return _g(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", Oe(), st(), Ug(e);
        },
        useState: function(e) {
          U = "useState", Oe(), st();
          var t = te.current;
          te.current = Ji;
          try {
            return Gh(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", Oe(), st(), void 0;
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", Oe(), st(), Bg(e);
        },
        useTransition: function() {
          return U = "useTransition", Oe(), st(), Pg();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", Oe(), st(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", Oe(), st(), Mg(e, t, a);
        },
        useId: function() {
          return U = "useId", Oe(), st(), $g();
        },
        unstable_isNewReconciler: Q
      }, Ci = {
        readContext: function(e) {
          return Yg(), Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", Oe(), G(), nm(e, t);
        },
        useContext: function(e) {
          return U = "useContext", Oe(), G(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", Oe(), G(), rp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", Oe(), G(), em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", Oe(), G(), Zh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", Oe(), G(), Jh(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", Oe(), G();
          var a = te.current;
          te.current = Ci;
          try {
            return rm(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", Oe(), G();
          var i = te.current;
          te.current = Ci;
          try {
            return Og(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", Oe(), G(), Xh();
        },
        useState: function(e) {
          U = "useState", Oe(), G();
          var t = te.current;
          te.current = Ci;
          try {
            return Ng(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", Oe(), G(), tm();
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", Oe(), G(), FE(e);
        },
        useTransition: function() {
          return U = "useTransition", Oe(), G(), BE();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", Oe(), G(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", Oe(), G(), Wh(e, t);
        },
        useId: function() {
          return U = "useId", Oe(), G(), am();
        },
        unstable_isNewReconciler: Q
      }, lm = {
        readContext: function(e) {
          return Yg(), Tn(e);
        },
        useCallback: function(e, t) {
          return U = "useCallback", Oe(), G(), nm(e, t);
        },
        useContext: function(e) {
          return U = "useContext", Oe(), G(), Tn(e);
        },
        useEffect: function(e, t) {
          return U = "useEffect", Oe(), G(), rp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return U = "useImperativeHandle", Oe(), G(), em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return U = "useInsertionEffect", Oe(), G(), Zh(e, t);
        },
        useLayoutEffect: function(e, t) {
          return U = "useLayoutEffect", Oe(), G(), Jh(e, t);
        },
        useMemo: function(e, t) {
          U = "useMemo", Oe(), G();
          var a = te.current;
          te.current = Ci;
          try {
            return rm(e, t);
          } finally {
            te.current = a;
          }
        },
        useReducer: function(e, t, a) {
          U = "useReducer", Oe(), G();
          var i = te.current;
          te.current = Ci;
          try {
            return Lg(e, t, a);
          } finally {
            te.current = i;
          }
        },
        useRef: function(e) {
          return U = "useRef", Oe(), G(), Xh();
        },
        useState: function(e) {
          U = "useState", Oe(), G();
          var t = te.current;
          te.current = Ci;
          try {
            return zg(e);
          } finally {
            te.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return U = "useDebugValue", Oe(), G(), tm();
        },
        useDeferredValue: function(e) {
          return U = "useDeferredValue", Oe(), G(), jE(e);
        },
        useTransition: function() {
          return U = "useTransition", Oe(), G(), PE();
        },
        useMutableSource: function(e, t, a) {
          return U = "useMutableSource", Oe(), G(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return U = "useSyncExternalStore", Oe(), G(), Wh(e, t);
        },
        useId: function() {
          return U = "useId", Oe(), G(), am();
        },
        unstable_isNewReconciler: Q
      };
    }
    var qu = J.unstable_now, ZE = 0, um = -1, ap = -1, om = -1, Qg = !1, sm = !1;
    function JE() {
      return Qg;
    }
    function Gx() {
      sm = !0;
    }
    function Xx() {
      Qg = !1, sm = !1;
    }
    function qx() {
      Qg = sm, sm = !1;
    }
    function eC() {
      return ZE;
    }
    function tC() {
      ZE = qu();
    }
    function Ig(e) {
      ap = qu(), e.actualStartTime < 0 && (e.actualStartTime = qu());
    }
    function nC(e) {
      ap = -1;
    }
    function cm(e, t) {
      if (ap >= 0) {
        var a = qu() - ap;
        e.actualDuration += a, t && (e.selfBaseDuration = a), ap = -1;
      }
    }
    function el(e) {
      if (um >= 0) {
        var t = qu() - um;
        um = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case Y:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case gt:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Wg(e) {
      if (om >= 0) {
        var t = qu() - om;
        om = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case Y:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case gt:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function tl() {
      um = qu();
    }
    function Gg() {
      om = qu();
    }
    function Xg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Ti(e, t) {
      if (e && e.defaultProps) {
        var a = je({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var qg = {}, Kg, Zg, Jg, eS, tS, rC, fm, nS, rS, aS, ip;
    {
      Kg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), eS = /* @__PURE__ */ new Set(), nS = /* @__PURE__ */ new Set(), tS = /* @__PURE__ */ new Set(), rS = /* @__PURE__ */ new Set(), aS = /* @__PURE__ */ new Set(), ip = /* @__PURE__ */ new Set();
      var aC = /* @__PURE__ */ new Set();
      fm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          aC.has(a) || (aC.add(a), g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, rC = function(e, t) {
        if (t === void 0) {
          var a = dt(e) || "Component";
          tS.has(a) || (tS.add(a), g("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(qg, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(qg);
    }
    function iS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Ve) {
          en(!0);
          try {
            s = a(i, u);
          } finally {
            en(!1);
          }
        }
        rC(t, s);
      }
      var f = s == null ? u : je({}, u, s);
      if (e.memoizedState = f, e.lanes === H) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var lS = {
      isMounted: Hr,
      enqueueSetState: function(e, t, a) {
        var i = Jr(e), u = $r(), s = eo(i), f = Bl(u, s);
        f.payload = t, a != null && (fm(a, "setState"), f.callback = a);
        var p = Iu(i, f, s);
        p !== null && (Fn(p, i, s, u), Vh(p, i, s)), Mo(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Jr(e), u = $r(), s = eo(i), f = Bl(u, s);
        f.tag = CE, f.payload = t, a != null && (fm(a, "replaceState"), f.callback = a);
        var p = Iu(i, f, s);
        p !== null && (Fn(p, i, s, u), Vh(p, i, s)), Mo(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Jr(e), i = $r(), u = eo(a), s = Bl(i, u);
        s.tag = Hh, t != null && (fm(t, "forceUpdate"), s.callback = t);
        var f = Iu(a, s, u);
        f !== null && (Fn(f, a, u, i), Vh(f, a, u)), Ks(a, u);
      }
    };
    function iC(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Ve) {
            en(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              en(!1);
            }
          }
          v === void 0 && g("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", dt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Re(a, i) || !Re(u, s) : !0;
    }
    function Kx(e, t, a) {
      var i = e.stateNode;
      {
        var u = dt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? g("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : g("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && g("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && g("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && g("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && g("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !ip.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ve) === de && (ip.add(t), g(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !ip.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ve) === de && (ip.add(t), g(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && g("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !rS.has(t) && (rS.add(t), g("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && g("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && g("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", dt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && g("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && g("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && g("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && g("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && g("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && g("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Jg.has(t) && (Jg.add(t), g("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", dt(t))), typeof i.getDerivedStateFromProps == "function" && g("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && g("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && g("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || mn(p)) && g("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && g("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function lC(e, t) {
      t.updater = lS, e.stateNode = t, su(t, e), t._reactInternalInstance = qg;
    }
    function uC(e, t, a) {
      var i = !1, u = La, s = La, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === V && f._context === void 0
        );
        if (!p && !aS.has(t)) {
          aS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === E ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", g("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", dt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = Tn(f);
      else {
        u = Yc(e, t, !0);
        var m = t.contextTypes;
        i = m != null, s = i ? Qc(e, u) : La;
      }
      var y = new t(a, s);
      if (e.mode & Ve) {
        en(!0);
        try {
          y = new t(a, s);
        } finally {
          en(!1);
        }
      }
      var x = e.memoizedState = y.state !== null && y.state !== void 0 ? y.state : null;
      lC(e, y);
      {
        if (typeof t.getDerivedStateFromProps == "function" && x === null) {
          var T = dt(t) || "Component";
          Zg.has(T) || (Zg.add(T), g("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", T, y.state === null ? "null" : "undefined", T));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof y.getSnapshotBeforeUpdate == "function") {
          var _ = null, L = null, N = null;
          if (typeof y.componentWillMount == "function" && y.componentWillMount.__suppressDeprecationWarning !== !0 ? _ = "componentWillMount" : typeof y.UNSAFE_componentWillMount == "function" && (_ = "UNSAFE_componentWillMount"), typeof y.componentWillReceiveProps == "function" && y.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof y.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof y.componentWillUpdate == "function" && y.componentWillUpdate.__suppressDeprecationWarning !== !0 ? N = "componentWillUpdate" : typeof y.UNSAFE_componentWillUpdate == "function" && (N = "UNSAFE_componentWillUpdate"), _ !== null || L !== null || N !== null) {
            var q = dt(t) || "Component", Ee = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            eS.has(q) || (eS.add(q), g(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, q, Ee, _ !== null ? `
  ` + _ : "", L !== null ? `
  ` + L : "", N !== null ? `
  ` + N : ""));
          }
        }
      }
      return i && q0(e, u, s), y;
    }
    function Zx(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (g("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Me(e) || "Component"), lS.enqueueReplaceState(t, t.state, null));
    }
    function oC(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Me(e) || "Component";
          Kg.has(s) || (Kg.add(s), g("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        lS.enqueueReplaceState(t, t.state, null);
      }
    }
    function uS(e, t, a, i) {
      Kx(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, mg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = Tn(s);
      else {
        var f = Yc(e, t, !0);
        u.context = Qc(e, f);
      }
      {
        if (u.state === a) {
          var p = dt(t) || "Component";
          nS.has(p) || (nS.add(p), g("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Ve && Si.recordLegacyContextWarning(e, u), Si.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (iS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Zx(e, u), Bh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var m = ze;
        m |= vr, (e.mode & jr) !== de && (m |= hr), e.flags |= m;
      }
    }
    function Jx(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = La;
      if (typeof p == "object" && p !== null)
        v = Tn(p);
      else {
        var m = Yc(e, t, !0);
        v = Qc(e, m);
      }
      var y = t.getDerivedStateFromProps, x = typeof y == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !x && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && oC(e, u, a, v), RE();
      var T = e.memoizedState, _ = u.state = T;
      if (Bh(e, a, u, i), _ = e.memoizedState, s === a && T === _ && !Th() && !Ph()) {
        if (typeof u.componentDidMount == "function") {
          var L = ze;
          L |= vr, (e.mode & jr) !== de && (L |= hr), e.flags |= L;
        }
        return !1;
      }
      typeof y == "function" && (iS(e, t, y, a), _ = e.memoizedState);
      var N = Ph() || iC(e, t, s, a, T, _, v);
      if (N) {
        if (!x && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var q = ze;
          q |= vr, (e.mode & jr) !== de && (q |= hr), e.flags |= q;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Ee = ze;
          Ee |= vr, (e.mode & jr) !== de && (Ee |= hr), e.flags |= Ee;
        }
        e.memoizedProps = a, e.memoizedState = _;
      }
      return u.props = a, u.state = _, u.context = v, N;
    }
    function ew(e, t, a, i, u) {
      var s = t.stateNode;
      TE(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : Ti(t.type, f);
      s.props = p;
      var v = t.pendingProps, m = s.context, y = a.contextType, x = La;
      if (typeof y == "object" && y !== null)
        x = Tn(y);
      else {
        var T = Yc(t, a, !0);
        x = Qc(t, T);
      }
      var _ = a.getDerivedStateFromProps, L = typeof _ == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !L && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || m !== x) && oC(t, s, i, x), RE();
      var N = t.memoizedState, q = s.state = N;
      if (Bh(t, i, s, u), q = t.memoizedState, f === v && N === q && !Th() && !Ph() && !Ce)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= ze), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= ea), !1;
      typeof _ == "function" && (iS(t, a, _, i), q = t.memoizedState);
      var Ee = Ph() || iC(t, a, p, i, N, q, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ce;
      return Ee ? (!L && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, q, x), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, q, x)), typeof s.componentDidUpdate == "function" && (t.flags |= ze), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= ea)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= ze), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || N !== e.memoizedState) && (t.flags |= ea), t.memoizedProps = i, t.memoizedState = q), s.props = i, s.state = q, s.context = x, Ee;
    }
    function ss(e, t) {
      return {
        value: e,
        source: t,
        stack: Ef(t),
        digest: null
      };
    }
    function oS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function tw(e, t) {
      return !0;
    }
    function sS(e, t) {
      try {
        var a = tw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === le)
            return;
          console.error(i);
        }
        var p = u ? Me(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", m;
        if (e.tag === Y)
          m = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var y = Me(e) || "Anonymous";
          m = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + y + ".");
        }
        var x = v + `
` + f + `

` + ("" + m);
        console.error(x);
      } catch (T) {
        setTimeout(function() {
          throw T;
        });
      }
    }
    var nw = typeof WeakMap == "function" ? WeakMap : Map;
    function sC(e, t, a) {
      var i = Bl(Rt, a);
      i.tag = vg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        GD(u), sS(e, t);
      }, i;
    }
    function cS(e, t, a) {
      var i = Bl(Rt, a);
      i.tag = vg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          E1(e), sS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        E1(e), sS(e, t), typeof u != "function" && ID(this);
        var v = t.value, m = t.stack;
        this.componentDidCatch(v, {
          componentStack: m !== null ? m : ""
        }), typeof u != "function" && (Cr(e.lanes, ye) || g("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Me(e) || "Unknown"));
      }), i;
    }
    function cC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new nw(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = XD.bind(null, e, t, a);
        Fr && Tp(e, a), t.then(s, s);
      }
    }
    function rw(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function aw(e, t) {
      var a = e.tag;
      if ((e.mode & ve) === de && (a === ce || a === Be || a === Ae)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function fC(e) {
      var t = e;
      do {
        if (t.tag === $e && Fx(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function dC(e, t, a, i, u) {
      if ((e.mode & ve) === de) {
        if (e === t)
          e.flags |= gn;
        else {
          if (e.flags |= be, a.flags |= _o, a.flags &= ~(js | Ur), a.tag === le) {
            var s = a.alternate;
            if (s === null)
              a.tag = jn;
            else {
              var f = Bl(Rt, ye);
              f.tag = Hh, Iu(a, f, ye);
            }
          }
          a.lanes = Ne(a.lanes, ye);
        }
        return e;
      }
      return e.flags |= gn, e.lanes = u, e;
    }
    function iw(e, t, a, i, u) {
      if (a.flags |= Ur, Fr && Tp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        aw(a), er() && a.mode & ve && rE();
        var f = fC(t);
        if (f !== null) {
          f.flags &= ~Pt, dC(f, t, a, e, u), f.mode & ve && cC(e, s, u), rw(f, e, s);
          return;
        } else {
          if (!od(u)) {
            cC(e, s, u), $S();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (er() && a.mode & ve) {
        rE();
        var v = fC(t);
        if (v !== null) {
          (v.flags & gn) === Se && (v.flags |= Pt), dC(v, t, a, e, u), ng(ss(i, a));
          return;
        }
      }
      i = ss(i, a), FD(i);
      var m = t;
      do {
        switch (m.tag) {
          case Y: {
            var y = i;
            m.flags |= gn;
            var x = Ru(u);
            m.lanes = Ne(m.lanes, x);
            var T = sC(m, y, x);
            yg(m, T);
            return;
          }
          case le:
            var _ = i, L = m.type, N = m.stateNode;
            if ((m.flags & be) === Se && (typeof L.getDerivedStateFromError == "function" || N !== null && typeof N.componentDidCatch == "function" && !f1(N))) {
              m.flags |= gn;
              var q = Ru(u);
              m.lanes = Ne(m.lanes, q);
              var Ee = cS(m, _, q);
              yg(m, Ee);
              return;
            }
            break;
        }
        m = m.return;
      } while (m !== null);
    }
    function lw() {
      return null;
    }
    var lp = M.ReactCurrentOwner, Ri = !1, fS, up, dS, pS, vS, cs, hS, dm, op;
    fS = {}, up = {}, dS = {}, pS = {}, vS = {}, cs = !1, hS = {}, dm = {}, op = {};
    function Br(e, t, a, i) {
      e === null ? t.child = hE(t, null, a, i) : t.child = Xc(t, e.child, a, i);
    }
    function uw(e, t, a, i) {
      t.child = Xc(t, e.child, null, i), t.child = Xc(t, null, a, i);
    }
    function pC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && yi(
          s,
          i,
          // Resolved props
          "prop",
          dt(a)
        );
      }
      var f = a.render, p = t.ref, v, m;
      Kc(t, u), pu(t);
      {
        if (lp.current = t, Da(!0), v = rf(e, t, f, i, p, u), m = af(), t.mode & Ve) {
          en(!0);
          try {
            v = rf(e, t, f, i, p, u), m = af();
          } finally {
            en(!1);
          }
        }
        Da(!1);
      }
      return gr(), e !== null && !Ri ? (_E(e, t, u), Pl(e, t, u)) : (er() && m && qy(t), t.flags |= Hi, Br(e, t, v, u), t.child);
    }
    function vC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (db(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = pf(s), t.tag = Ae, t.type = f, gS(t, s), hC(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && yi(
            p,
            i,
            // Resolved props
            "prop",
            dt(s)
          ), a.defaultProps !== void 0) {
            var v = dt(s) || "Unknown";
            op[v] || (g("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), op[v] = !0);
          }
        }
        var m = e0(a.type, null, i, t, t.mode, u);
        return m.ref = t.ref, m.return = t, t.child = m, m;
      }
      {
        var y = a.type, x = y.propTypes;
        x && yi(
          x,
          i,
          // Resolved props
          "prop",
          dt(y)
        );
      }
      var T = e.child, _ = xS(e, u);
      if (!_) {
        var L = T.memoizedProps, N = a.compare;
        if (N = N !== null ? N : Re, N(L, i) && e.ref === t.ref)
          return Pl(e, t, u);
      }
      t.flags |= Hi;
      var q = hs(T, i);
      return q.ref = t.ref, q.return = t, t.child = q, q;
    }
    function hC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === xe) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var m = s && s.propTypes;
          m && yi(
            m,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            dt(s)
          );
        }
      }
      if (e !== null) {
        var y = e.memoizedProps;
        if (Re(y, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Ri = !1, t.pendingProps = i = y, xS(e, u))
            (e.flags & _o) !== Se && (Ri = !0);
          else return t.lanes = e.lanes, Pl(e, t, u);
      }
      return mS(e, t, a, i, u);
    }
    function mC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || re)
        if ((t.mode & ve) === de) {
          var f = {
            baseLanes: H,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, wm(t, a);
        } else if (Cr(a, Wn)) {
          var x = {
            baseLanes: H,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = x;
          var T = s !== null ? s.baseLanes : a;
          wm(t, T);
        } else {
          var p = null, v;
          if (s !== null) {
            var m = s.baseLanes;
            v = Ne(m, a);
          } else
            v = a;
          t.lanes = t.childLanes = Wn;
          var y = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = y, t.updateQueue = null, wm(t, v), null;
        }
      else {
        var _;
        s !== null ? (_ = Ne(s.baseLanes, a), t.memoizedState = null) : _ = a, wm(t, _);
      }
      return Br(e, t, u, a), t.child;
    }
    function ow(e, t, a) {
      var i = t.pendingProps;
      return Br(e, t, i, a), t.child;
    }
    function sw(e, t, a) {
      var i = t.pendingProps.children;
      return Br(e, t, i, a), t.child;
    }
    function cw(e, t, a) {
      {
        t.flags |= ze;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return Br(e, t, s, a), t.child;
    }
    function yC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= pr, t.flags |= Xf);
    }
    function mS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && yi(
          s,
          i,
          // Resolved props
          "prop",
          dt(a)
        );
      }
      var f;
      {
        var p = Yc(t, a, !0);
        f = Qc(t, p);
      }
      var v, m;
      Kc(t, u), pu(t);
      {
        if (lp.current = t, Da(!0), v = rf(e, t, a, i, f, u), m = af(), t.mode & Ve) {
          en(!0);
          try {
            v = rf(e, t, a, i, f, u), m = af();
          } finally {
            en(!1);
          }
        }
        Da(!1);
      }
      return gr(), e !== null && !Ri ? (_E(e, t, u), Pl(e, t, u)) : (er() && m && qy(t), t.flags |= Hi, Br(e, t, v, u), t.child);
    }
    function gC(e, t, a, i, u) {
      {
        switch (bb(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= be, t.flags |= gn;
            var m = new Error("Simulated error coming from DevTools"), y = Ru(u);
            t.lanes = Ne(t.lanes, y);
            var x = cS(t, ss(m, t), y);
            yg(t, x);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var T = a.propTypes;
          T && yi(
            T,
            i,
            // Resolved props
            "prop",
            dt(a)
          );
        }
      }
      var _;
      qi(a) ? (_ = !0, xh(t)) : _ = !1, Kc(t, u);
      var L = t.stateNode, N;
      L === null ? (vm(e, t), uC(t, a, i), uS(t, a, i, u), N = !0) : e === null ? N = Jx(t, a, i, u) : N = ew(e, t, a, i, u);
      var q = yS(e, t, a, N, _, u);
      {
        var Ee = t.stateNode;
        N && Ee.props !== i && (cs || g("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Me(t) || "a component"), cs = !0);
      }
      return q;
    }
    function yS(e, t, a, i, u, s) {
      yC(e, t);
      var f = (t.flags & be) !== Se;
      if (!i && !f)
        return u && J0(t, a, !1), Pl(e, t, s);
      var p = t.stateNode;
      lp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, nC();
      else {
        pu(t);
        {
          if (Da(!0), v = p.render(), t.mode & Ve) {
            en(!0);
            try {
              p.render();
            } finally {
              en(!1);
            }
          }
          Da(!1);
        }
        gr();
      }
      return t.flags |= Hi, e !== null && f ? uw(e, t, v, s) : Br(e, t, v, s), t.memoizedState = p.state, u && J0(t, a, !0), t.child;
    }
    function SC(e) {
      var t = e.stateNode;
      t.pendingContext ? K0(e, t.pendingContext, t.pendingContext !== t.context) : t.context && K0(e, t.context, !1), gg(e, t.containerInfo);
    }
    function fw(e, t, a) {
      if (SC(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      TE(e, t), Bh(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, m = t.updateQueue;
        if (m.baseState = v, t.memoizedState = v, t.flags & Pt) {
          var y = ss(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return EC(e, t, p, a, y);
        } else if (p !== s) {
          var x = ss(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return EC(e, t, p, a, x);
        } else {
          vx(t);
          var T = hE(t, null, p, a);
          t.child = T;
          for (var _ = T; _; )
            _.flags = _.flags & ~bt | ta, _ = _.sibling;
        }
      } else {
        if (Gc(), p === s)
          return Pl(e, t, a);
        Br(e, t, p, a);
      }
      return t.child;
    }
    function EC(e, t, a, i, u) {
      return Gc(), ng(u), t.flags |= Pt, Br(e, t, a, i), t.child;
    }
    function dw(e, t, a) {
      DE(t), e === null && tg(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ay(i, u);
      return p ? f = null : s !== null && Ay(i, s) && (t.flags |= ot), yC(e, t), Br(e, t, f, a), t.child;
    }
    function pw(e, t) {
      return e === null && tg(t), null;
    }
    function vw(e, t, a, i) {
      vm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var m = t.tag = pb(v), y = Ti(v, u), x;
      switch (m) {
        case ce:
          return gS(t, v), t.type = v = pf(v), x = mS(null, t, v, y, i), x;
        case le:
          return t.type = v = GS(v), x = gC(null, t, v, y, i), x;
        case Be:
          return t.type = v = XS(v), x = pC(null, t, v, y, i), x;
        case xt: {
          if (t.type !== t.elementType) {
            var T = v.propTypes;
            T && yi(
              T,
              y,
              // Resolved for outer only
              "prop",
              dt(v)
            );
          }
          return x = vC(
            null,
            t,
            v,
            Ti(v.type, y),
            // The inner type can have defaults too
            i
          ), x;
        }
      }
      var _ = "";
      throw v !== null && typeof v == "object" && v.$$typeof === xe && (_ = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + _));
    }
    function hw(e, t, a, i, u) {
      vm(e, t), t.tag = le;
      var s;
      return qi(a) ? (s = !0, xh(t)) : s = !1, Kc(t, u), uC(t, a, i), uS(t, a, i, u), yS(null, t, a, !0, s, u);
    }
    function mw(e, t, a, i) {
      vm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Yc(t, a, !1);
        s = Qc(t, f);
      }
      Kc(t, i);
      var p, v;
      pu(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var m = dt(a) || "Unknown";
          fS[m] || (g("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", m, m), fS[m] = !0);
        }
        t.mode & Ve && Si.recordLegacyContextWarning(t, null), Da(!0), lp.current = t, p = rf(null, t, a, u, s, i), v = af(), Da(!1);
      }
      if (gr(), t.flags |= Hi, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var y = dt(a) || "Unknown";
        up[y] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", y, y, y), up[y] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var x = dt(a) || "Unknown";
          up[x] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), up[x] = !0);
        }
        t.tag = le, t.memoizedState = null, t.updateQueue = null;
        var T = !1;
        return qi(a) ? (T = !0, xh(t)) : T = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, mg(t), lC(t, p), uS(t, a, u, i), yS(null, t, a, !0, T, i);
      } else {
        if (t.tag = ce, t.mode & Ve) {
          en(!0);
          try {
            p = rf(null, t, a, u, s, i), v = af();
          } finally {
            en(!1);
          }
        }
        return er() && v && qy(t), Br(null, t, p, i), gS(t, a), t.child;
      }
    }
    function gS(e, t) {
      {
        if (t && t.childContextTypes && g("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Kr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), vS[u] || (vS[u] = !0, g("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = dt(t) || "Unknown";
          op[f] || (g("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), op[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = dt(t) || "Unknown";
          pS[p] || (g("%s: Function components do not support getDerivedStateFromProps.", p), pS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = dt(t) || "Unknown";
          dS[v] || (g("%s: Function components do not support contextType.", v), dS[v] = !0);
        }
      }
    }
    var SS = {
      dehydrated: null,
      treeContext: null,
      retryLane: tn
    };
    function ES(e) {
      return {
        baseLanes: e,
        cachePool: lw(),
        transitions: null
      };
    }
    function yw(e, t) {
      var a = null;
      return {
        baseLanes: Ne(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function gw(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Cg(e, Kd);
    }
    function Sw(e, t) {
      return jo(e.childLanes, t);
    }
    function CC(e, t, a) {
      var i = t.pendingProps;
      kb(t) && (t.flags |= be);
      var u = Ei.current, s = !1, f = (t.flags & be) !== Se;
      if (f || gw(u, e) ? (s = !0, t.flags &= ~be) : (e === null || e.memoizedState !== null) && (u = Hx(u, kE)), u = Jc(u), Gu(t, u), e === null) {
        tg(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return xw(t, v);
        }
        var m = i.children, y = i.fallback;
        if (s) {
          var x = Ew(t, m, y, a), T = t.child;
          return T.memoizedState = ES(a), t.memoizedState = SS, x;
        } else
          return CS(t, m);
      } else {
        var _ = e.memoizedState;
        if (_ !== null) {
          var L = _.dehydrated;
          if (L !== null)
            return ww(e, t, f, i, L, _, a);
        }
        if (s) {
          var N = i.fallback, q = i.children, Ee = Tw(e, t, q, N, a), he = t.child, qe = e.child.memoizedState;
          return he.memoizedState = qe === null ? ES(a) : yw(qe, a), he.childLanes = Sw(e, a), t.memoizedState = SS, Ee;
        } else {
          var Qe = i.children, D = Cw(e, t, Qe, a);
          return t.memoizedState = null, D;
        }
      }
    }
    function CS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = TS(u, i);
      return s.return = e, e.child = s, s;
    }
    function Ew(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & ve) === de && s !== null ? (p = s, p.childLanes = H, p.pendingProps = f, e.mode & ke && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = no(a, u, i, null)) : (p = TS(f, u), v = no(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function TS(e, t, a) {
      return T1(e, t, H, null);
    }
    function TC(e, t) {
      return hs(e, t);
    }
    function Cw(e, t, a, i) {
      var u = e.child, s = u.sibling, f = TC(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & ve) === de && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= lt) : p.push(s);
      }
      return t.child = f, f;
    }
    function Tw(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, m;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & ve) === de && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var y = t.child;
        m = y, m.childLanes = H, m.pendingProps = v, t.mode & ke && (m.actualDuration = 0, m.actualStartTime = -1, m.selfBaseDuration = f.selfBaseDuration, m.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        m = TC(f, v), m.subtreeFlags = f.subtreeFlags & kn;
      var x;
      return p !== null ? x = hs(p, i) : (x = no(i, s, u, null), x.flags |= bt), x.return = t, m.return = t, m.sibling = x, t.child = m, x;
    }
    function pm(e, t, a, i) {
      i !== null && ng(i), Xc(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = CS(t, s);
      return f.flags |= bt, t.memoizedState = null, f;
    }
    function Rw(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = TS(f, s), v = no(i, s, u, null);
      return v.flags |= bt, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & ve) !== de && Xc(t, e.child, null, u), v;
    }
    function xw(e, t, a) {
      return (e.mode & ve) === de ? (g("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = ye) : Vy(t) ? e.lanes = di : e.lanes = Wn, null;
    }
    function ww(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Pt) {
          t.flags &= ~Pt;
          var D = oS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return pm(e, t, f, D);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= be, null;
          var z = i.children, b = i.fallback, P = Rw(e, t, z, b, f), ae = t.child;
          return ae.memoizedState = ES(f), t.memoizedState = SS, P;
        }
      else {
        if (dx(), (t.mode & ve) === de)
          return pm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Vy(u)) {
          var p, v, m;
          {
            var y = _R(u);
            p = y.digest, v = y.message, m = y.stack;
          }
          var x;
          v ? x = new Error(v) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var T = oS(x, p, m);
          return pm(e, t, f, T);
        }
        var _ = Cr(f, e.childLanes);
        if (Ri || _) {
          var L = xm();
          if (L !== null) {
            var N = jv(L, f);
            if (N !== tn && N !== s.retryLane) {
              s.retryLane = N;
              var q = Rt;
              pa(e, N), Fn(L, e, N, q);
            }
          }
          $S();
          var Ee = oS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return pm(e, t, f, Ee);
        } else if (Q0(u)) {
          t.flags |= be, t.child = e.child;
          var he = qD.bind(null, e);
          return OR(u, he), null;
        } else {
          hx(t, u, s.treeContext);
          var qe = i.children, Qe = CS(t, qe);
          return Qe.flags |= ta, Qe;
        }
      }
    }
    function RC(e, t, a) {
      e.lanes = Ne(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Ne(i.lanes, t)), dg(e.return, t, a);
    }
    function Dw(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === $e) {
          var u = i.memoizedState;
          u !== null && RC(i, a, e);
        } else if (i.tag === vt)
          RC(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function bw(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Qh(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function kw(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !hS[e])
        if (hS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              g('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          g('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function _w(e, t) {
      e !== void 0 && !dm[e] && (e !== "collapsed" && e !== "hidden" ? (dm[e] = !0, g('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (dm[e] = !0, g('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function xC(e, t) {
      {
        var a = mn(e), i = !a && typeof Nr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return g("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Ow(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (mn(e)) {
          for (var a = 0; a < e.length; a++)
            if (!xC(e[a], a))
              return;
        } else {
          var i = Nr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!xC(s.value, f))
                  return;
                f++;
              }
          } else
            g('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function RS(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function wC(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      kw(u), _w(s, u), Ow(f, u), Br(e, t, f, a);
      var p = Ei.current, v = Cg(p, Kd);
      if (v)
        p = Tg(p, Kd), t.flags |= be;
      else {
        var m = e !== null && (e.flags & be) !== Se;
        m && Dw(t, t.child, a), p = Jc(p);
      }
      if (Gu(t, p), (t.mode & ve) === de)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var y = bw(t.child), x;
            y === null ? (x = t.child, t.child = null) : (x = y.sibling, y.sibling = null), RS(
              t,
              !1,
              // isBackwards
              x,
              y,
              s
            );
            break;
          }
          case "backwards": {
            var T = null, _ = t.child;
            for (t.child = null; _ !== null; ) {
              var L = _.alternate;
              if (L !== null && Qh(L) === null) {
                t.child = _;
                break;
              }
              var N = _.sibling;
              _.sibling = T, T = _, _ = N;
            }
            RS(
              t,
              !0,
              // isBackwards
              T,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            RS(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function Lw(e, t, a) {
      gg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Xc(t, null, i, a) : Br(e, t, i, a), t.child;
    }
    var DC = !1;
    function Mw(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || DC || (DC = !0, g("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && yi(v, s, "prop", "Context.Provider");
      }
      if (gE(t, u, p), f !== null) {
        var m = f.value;
        if (oe(m, p)) {
          if (f.children === s.children && !Th())
            return Pl(e, t, a);
        } else
          kx(t, u, a);
      }
      var y = s.children;
      return Br(e, t, y, a), t.child;
    }
    var bC = !1;
    function Nw(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (bC || (bC = !0, g("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && g("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Kc(t, a);
      var f = Tn(i);
      pu(t);
      var p;
      return lp.current = t, Da(!0), p = s(f), Da(!1), gr(), t.flags |= Hi, Br(e, t, p, a), t.child;
    }
    function sp() {
      Ri = !0;
    }
    function vm(e, t) {
      (t.mode & ve) === de && e !== null && (e.alternate = null, t.alternate = null, t.flags |= bt);
    }
    function Pl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), nC(), Cp(t.lanes), Cr(a, t.childLanes) ? (Dx(e, t), t.child) : null;
    }
    function zw(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= lt) : s.push(e), a.flags |= bt, a;
      }
    }
    function xS(e, t) {
      var a = e.lanes;
      return !!Cr(a, t);
    }
    function Uw(e, t, a) {
      switch (t.tag) {
        case Y:
          SC(t), t.stateNode, Gc();
          break;
        case ne:
          DE(t);
          break;
        case le: {
          var i = t.type;
          qi(i) && xh(t);
          break;
        }
        case K:
          gg(t, t.stateNode.containerInfo);
          break;
        case Je: {
          var u = t.memoizedProps.value, s = t.type._context;
          gE(t, s, u);
          break;
        }
        case gt:
          {
            var f = Cr(a, t.childLanes);
            f && (t.flags |= ze);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case $e: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Gu(t, Jc(Ei.current)), t.flags |= be, null;
            var m = t.child, y = m.childLanes;
            if (Cr(a, y))
              return CC(e, t, a);
            Gu(t, Jc(Ei.current));
            var x = Pl(e, t, a);
            return x !== null ? x.sibling : null;
          } else
            Gu(t, Jc(Ei.current));
          break;
        }
        case vt: {
          var T = (e.flags & be) !== Se, _ = Cr(a, t.childLanes);
          if (T) {
            if (_)
              return wC(e, t, a);
            t.flags |= be;
          }
          var L = t.memoizedState;
          if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Gu(t, Ei.current), _)
            break;
          return null;
        }
        case _e:
        case Ie:
          return t.lanes = H, mC(e, t, a);
      }
      return Pl(e, t, a);
    }
    function kC(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return zw(e, t, e0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Th() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Ri = !0;
        else {
          var s = xS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & be) === Se)
            return Ri = !1, Uw(e, t, a);
          (e.flags & _o) !== Se ? Ri = !0 : Ri = !1;
        }
      } else if (Ri = !1, er() && lx(t)) {
        var f = t.index, p = ux();
        nE(t, p, f);
      }
      switch (t.lanes = H, t.tag) {
        case Ke:
          return mw(e, t, t.type, a);
        case Rn: {
          var v = t.elementType;
          return vw(e, t, v, a);
        }
        case ce: {
          var m = t.type, y = t.pendingProps, x = t.elementType === m ? y : Ti(m, y);
          return mS(e, t, m, x, a);
        }
        case le: {
          var T = t.type, _ = t.pendingProps, L = t.elementType === T ? _ : Ti(T, _);
          return gC(e, t, T, L, a);
        }
        case Y:
          return fw(e, t, a);
        case ne:
          return dw(e, t, a);
        case we:
          return pw(e, t);
        case $e:
          return CC(e, t, a);
        case K:
          return Lw(e, t, a);
        case Be: {
          var N = t.type, q = t.pendingProps, Ee = t.elementType === N ? q : Ti(N, q);
          return pC(e, t, N, Ee, a);
        }
        case Ue:
          return ow(e, t, a);
        case Pe:
          return sw(e, t, a);
        case gt:
          return cw(e, t, a);
        case Je:
          return Mw(e, t, a);
        case Vt:
          return Nw(e, t, a);
        case xt: {
          var he = t.type, qe = t.pendingProps, Qe = Ti(he, qe);
          if (t.type !== t.elementType) {
            var D = he.propTypes;
            D && yi(
              D,
              Qe,
              // Resolved for outer only
              "prop",
              dt(he)
            );
          }
          return Qe = Ti(he.type, Qe), vC(e, t, he, Qe, a);
        }
        case Ae:
          return hC(e, t, t.type, t.pendingProps, a);
        case jn: {
          var z = t.type, b = t.pendingProps, P = t.elementType === z ? b : Ti(z, b);
          return hw(e, t, z, P, a);
        }
        case vt:
          return wC(e, t, a);
        case xn:
          break;
        case _e:
          return mC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function lf(e) {
      e.flags |= ze;
    }
    function _C(e) {
      e.flags |= pr, e.flags |= Xf;
    }
    var OC, wS, LC, MC;
    OC = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ne || u.tag === we)
          rR(e, u.stateNode);
        else if (u.tag !== K) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, wS = function(e, t) {
    }, LC = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Sg(), v = iR(f, a, s, i, u, p);
        t.updateQueue = v, v && lf(t);
      }
    }, MC = function(e, t, a, i) {
      a !== i && lf(t);
    };
    function cp(e, t) {
      if (!er())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function nr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = H, i = Se;
      if (t) {
        if ((e.mode & ke) !== de) {
          for (var v = e.selfBaseDuration, m = e.child; m !== null; )
            a = Ne(a, Ne(m.lanes, m.childLanes)), i |= m.subtreeFlags & kn, i |= m.flags & kn, v += m.treeBaseDuration, m = m.sibling;
          e.treeBaseDuration = v;
        } else
          for (var y = e.child; y !== null; )
            a = Ne(a, Ne(y.lanes, y.childLanes)), i |= y.subtreeFlags & kn, i |= y.flags & kn, y.return = e, y = y.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & ke) !== de) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = Ne(a, Ne(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = Ne(a, Ne(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Aw(e, t, a) {
      if (Ex() && (t.mode & ve) !== de && (t.flags & be) === Se)
        return sE(t), Gc(), t.flags |= Pt | Ur | gn, !1;
      var i = _h(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (gx(t), nr(t), (t.mode & ke) !== de) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Gc(), (t.flags & be) === Se && (t.memoizedState = null), t.flags |= ze, nr(t), (t.mode & ke) !== de) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return cE(), !0;
    }
    function NC(e, t, a) {
      var i = t.pendingProps;
      switch (Ky(t), t.tag) {
        case Ke:
        case Rn:
        case Ae:
        case ce:
        case Be:
        case Ue:
        case Pe:
        case gt:
        case Vt:
        case xt:
          return nr(t), null;
        case le: {
          var u = t.type;
          return qi(u) && Rh(t), nr(t), null;
        }
        case Y: {
          var s = t.stateNode;
          if (Zc(t), Wy(t), xg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = _h(t);
            if (f)
              lf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Pt) !== Se) && (t.flags |= ea, cE());
            }
          }
          return wS(e, t), nr(t), null;
        }
        case ne: {
          Eg(t);
          var v = wE(), m = t.type;
          if (e !== null && t.stateNode != null)
            LC(e, t, m, i, v), e.ref !== t.ref && _C(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return nr(t), null;
            }
            var y = Sg(), x = _h(t);
            if (x)
              mx(t, v, y) && lf(t);
            else {
              var T = nR(m, i, v, y, t);
              OC(T, t, !1, !1), t.stateNode = T, aR(T, m, i, v) && lf(t);
            }
            t.ref !== null && _C(t);
          }
          return nr(t), null;
        }
        case we: {
          var _ = i;
          if (e && t.stateNode != null) {
            var L = e.memoizedProps;
            MC(e, t, L, _);
          } else {
            if (typeof _ != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var N = wE(), q = Sg(), Ee = _h(t);
            Ee ? yx(t) && lf(t) : t.stateNode = lR(_, N, q, t);
          }
          return nr(t), null;
        }
        case $e: {
          ef(t);
          var he = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var qe = Aw(e, t, he);
            if (!qe)
              return t.flags & gn ? t : null;
          }
          if ((t.flags & be) !== Se)
            return t.lanes = a, (t.mode & ke) !== de && Xg(t), t;
          var Qe = he !== null, D = e !== null && e.memoizedState !== null;
          if (Qe !== D && Qe) {
            var z = t.child;
            if (z.flags |= Fi, (t.mode & ve) !== de) {
              var b = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !tt);
              b || Cg(Ei.current, kE) ? HD() : $S();
            }
          }
          var P = t.updateQueue;
          if (P !== null && (t.flags |= ze), nr(t), (t.mode & ke) !== de && Qe) {
            var ae = t.child;
            ae !== null && (t.treeBaseDuration -= ae.treeBaseDuration);
          }
          return null;
        }
        case K:
          return Zc(t), wS(e, t), e === null && JR(t.stateNode.containerInfo), nr(t), null;
        case Je:
          var Z = t.type._context;
          return fg(Z, t), nr(t), null;
        case jn: {
          var De = t.type;
          return qi(De) && Rh(t), nr(t), null;
        }
        case vt: {
          ef(t);
          var Le = t.memoizedState;
          if (Le === null)
            return nr(t), null;
          var yt = (t.flags & be) !== Se, rt = Le.rendering;
          if (rt === null)
            if (yt)
              cp(Le, !1);
            else {
              var fn = jD() && (e === null || (e.flags & be) === Se);
              if (!fn)
                for (var at = t.child; at !== null; ) {
                  var nn = Qh(at);
                  if (nn !== null) {
                    yt = !0, t.flags |= be, cp(Le, !1);
                    var Dr = nn.updateQueue;
                    return Dr !== null && (t.updateQueue = Dr, t.flags |= ze), t.subtreeFlags = Se, bx(t, a), Gu(t, Tg(Ei.current, Kd)), t.child;
                  }
                  at = at.sibling;
                }
              Le.tail !== null && Ht() > e1() && (t.flags |= be, yt = !0, cp(Le, !1), t.lanes = kv);
            }
          else {
            if (!yt) {
              var ur = Qh(rt);
              if (ur !== null) {
                t.flags |= be, yt = !0;
                var Na = ur.updateQueue;
                if (Na !== null && (t.updateQueue = Na, t.flags |= ze), cp(Le, !0), Le.tail === null && Le.tailMode === "hidden" && !rt.alternate && !er())
                  return nr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Ht() * 2 - Le.renderingStartTime > e1() && a !== Wn && (t.flags |= be, yt = !0, cp(Le, !1), t.lanes = kv);
            }
            if (Le.isBackwards)
              rt.sibling = t.child, t.child = rt;
            else {
              var Yr = Le.last;
              Yr !== null ? Yr.sibling = rt : t.child = rt, Le.last = rt;
            }
          }
          if (Le.tail !== null) {
            var Qr = Le.tail;
            Le.rendering = Qr, Le.tail = Qr.sibling, Le.renderingStartTime = Ht(), Qr.sibling = null;
            var br = Ei.current;
            return yt ? br = Tg(br, Kd) : br = Jc(br), Gu(t, br), Qr;
          }
          return nr(t), null;
        }
        case xn:
          break;
        case _e:
        case Ie: {
          PS(t);
          var Wl = t.memoizedState, vf = Wl !== null;
          if (e !== null) {
            var Dp = e.memoizedState, al = Dp !== null;
            al !== vf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !re && (t.flags |= Fi);
          }
          return !vf || (t.mode & ve) === de ? nr(t) : Cr(rl, Wn) && (nr(t), t.subtreeFlags & (bt | ze) && (t.flags |= Fi)), null;
        }
        case dn:
          return null;
        case wt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Hw(e, t, a) {
      switch (Ky(t), t.tag) {
        case le: {
          var i = t.type;
          qi(i) && Rh(t);
          var u = t.flags;
          return u & gn ? (t.flags = u & ~gn | be, (t.mode & ke) !== de && Xg(t), t) : null;
        }
        case Y: {
          t.stateNode, Zc(t), Wy(t), xg();
          var s = t.flags;
          return (s & gn) !== Se && (s & be) === Se ? (t.flags = s & ~gn | be, t) : null;
        }
        case ne:
          return Eg(t), null;
        case $e: {
          ef(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Gc();
          }
          var p = t.flags;
          return p & gn ? (t.flags = p & ~gn | be, (t.mode & ke) !== de && Xg(t), t) : null;
        }
        case vt:
          return ef(t), null;
        case K:
          return Zc(t), null;
        case Je:
          var v = t.type._context;
          return fg(v, t), null;
        case _e:
        case Ie:
          return PS(t), null;
        case dn:
          return null;
        default:
          return null;
      }
    }
    function zC(e, t, a) {
      switch (Ky(t), t.tag) {
        case le: {
          var i = t.type.childContextTypes;
          i != null && Rh(t);
          break;
        }
        case Y: {
          t.stateNode, Zc(t), Wy(t), xg();
          break;
        }
        case ne: {
          Eg(t);
          break;
        }
        case K:
          Zc(t);
          break;
        case $e:
          ef(t);
          break;
        case vt:
          ef(t);
          break;
        case Je:
          var u = t.type._context;
          fg(u, t);
          break;
        case _e:
        case Ie:
          PS(t);
          break;
      }
    }
    var UC = null;
    UC = /* @__PURE__ */ new Set();
    var hm = !1, rr = !1, Fw = typeof WeakSet == "function" ? WeakSet : Set, se = null, uf = null, of = null;
    function jw(e) {
      gl(null, function() {
        throw e;
      }), Wf();
    }
    var Vw = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & ke)
        try {
          tl(), t.componentWillUnmount();
        } finally {
          el(e);
        }
      else
        t.componentWillUnmount();
    };
    function AC(e, t) {
      try {
        Ku(Mn, e);
      } catch (a) {
        Ot(e, t, a);
      }
    }
    function DS(e, t, a) {
      try {
        Vw(e, a);
      } catch (i) {
        Ot(e, t, i);
      }
    }
    function Bw(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        Ot(e, t, i);
      }
    }
    function HC(e, t) {
      try {
        jC(e);
      } catch (a) {
        Ot(e, t, a);
      }
    }
    function sf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (rn && Ir && e.mode & ke)
              try {
                tl(), i = a(null);
              } finally {
                el(e);
              }
            else
              i = a(null);
          } catch (u) {
            Ot(e, t, u);
          }
          typeof i == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
        } else
          a.current = null;
    }
    function mm(e, t, a) {
      try {
        a();
      } catch (i) {
        Ot(e, t, i);
      }
    }
    var FC = !1;
    function Pw(e, t) {
      eR(e.containerInfo), se = t, $w();
      var a = FC;
      return FC = !1, a;
    }
    function $w() {
      for (; se !== null; ) {
        var e = se, t = e.child;
        (e.subtreeFlags & cu) !== Se && t !== null ? (t.return = e, se = t) : Yw();
      }
    }
    function Yw() {
      for (; se !== null; ) {
        var e = se;
        ht(e);
        try {
          Qw(e);
        } catch (a) {
          Ot(e, e.return, a);
        }
        an();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, se = t;
          return;
        }
        se = e.return;
      }
    }
    function Qw(e) {
      var t = e.alternate, a = e.flags;
      if ((a & ea) !== Se) {
        switch (ht(e), e.tag) {
          case ce:
          case Be:
          case Ae:
            break;
          case le: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !cs && (s.props !== e.memoizedProps && g("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(e) || "instance"), s.state !== e.memoizedState && g("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Ti(e.type, i), u);
              {
                var p = UC;
                f === void 0 && !p.has(e.type) && (p.add(e.type), g("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Me(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case Y: {
            {
              var v = e.stateNode;
              wR(v.containerInfo);
            }
            break;
          }
          case ne:
          case we:
          case K:
          case jn:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        an();
      }
    }
    function xi(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & tr) !== va ? wv(t) : (e & Mn) !== va && Oa(t), (e & Ki) !== va && Rp(!0), mm(t, a, p), (e & Ki) !== va && Rp(!1), (e & tr) !== va ? Gs() : (e & Mn) !== va && vu());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Ku(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & tr) !== va ? Bi(t) : (e & Mn) !== va && Dv(t);
            var f = s.create;
            (e & Ki) !== va && Rp(!0), s.destroy = f(), (e & Ki) !== va && Rp(!1), (e & tr) !== va ? Ws() : (e & Mn) !== va && Oo();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & Mn) !== Se ? v = "useLayoutEffect" : (s.tag & Ki) !== Se ? v = "useInsertionEffect" : v = "useEffect";
                var m = void 0;
                p === null ? m = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? m = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : m = " You returned: " + p, g("%s must not return anything besides a function, which is used for clean-up.%s", v, m);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Iw(e, t) {
      if ((t.flags & ze) !== Se)
        switch (t.tag) {
          case gt: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = eC(), p = t.alternate === null ? "mount" : "update";
            JE() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case Y:
                  var m = v.stateNode;
                  m.passiveEffectDuration += a;
                  break e;
                case gt:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Ww(e, t, a, i) {
      if ((a.flags & Qn) !== Se)
        switch (a.tag) {
          case ce:
          case Be:
          case Ae: {
            if (!rr)
              if (a.mode & ke)
                try {
                  tl(), Ku(Mn | Ln, a);
                } finally {
                  el(a);
                }
              else
                Ku(Mn | Ln, a);
            break;
          }
          case le: {
            var u = a.stateNode;
            if (a.flags & ze && !rr)
              if (t === null)
                if (a.type === a.elementType && !cs && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(a) || "instance")), a.mode & ke)
                  try {
                    tl(), u.componentDidMount();
                  } finally {
                    el(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : Ti(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !cs && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(a) || "instance")), a.mode & ke)
                  try {
                    tl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    el(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !cs && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Me(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Me(a) || "instance")), xE(a, p, u));
            break;
          }
          case Y: {
            var v = a.updateQueue;
            if (v !== null) {
              var m = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ne:
                    m = a.child.stateNode;
                    break;
                  case le:
                    m = a.child.stateNode;
                    break;
                }
              xE(a, v, m);
            }
            break;
          }
          case ne: {
            var y = a.stateNode;
            if (t === null && a.flags & ze) {
              var x = a.type, T = a.memoizedProps;
              fR(y, x, T);
            }
            break;
          }
          case we:
            break;
          case K:
            break;
          case gt: {
            {
              var _ = a.memoizedProps, L = _.onCommit, N = _.onRender, q = a.stateNode.effectDuration, Ee = eC(), he = t === null ? "mount" : "update";
              JE() && (he = "nested-update"), typeof N == "function" && N(a.memoizedProps.id, he, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Ee);
              {
                typeof L == "function" && L(a.memoizedProps.id, he, q, Ee), YD(a);
                var qe = a.return;
                e: for (; qe !== null; ) {
                  switch (qe.tag) {
                    case Y:
                      var Qe = qe.stateNode;
                      Qe.effectDuration += q;
                      break e;
                    case gt:
                      var D = qe.stateNode;
                      D.effectDuration += q;
                      break e;
                  }
                  qe = qe.return;
                }
              }
            }
            break;
          }
          case $e: {
            tD(e, a);
            break;
          }
          case vt:
          case jn:
          case xn:
          case _e:
          case Ie:
          case wt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      rr || a.flags & pr && jC(a);
    }
    function Gw(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          if (e.mode & ke)
            try {
              tl(), AC(e, e.return);
            } finally {
              el(e);
            }
          else
            AC(e, e.return);
          break;
        }
        case le: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Bw(e, e.return, t), HC(e, e.return);
          break;
        }
        case ne: {
          HC(e, e.return);
          break;
        }
      }
    }
    function Xw(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ne) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? CR(u) : RR(i.stateNode, i.memoizedProps);
            } catch (f) {
              Ot(e, e.return, f);
            }
          }
        } else if (i.tag === we) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? TR(s) : xR(s, i.memoizedProps);
            } catch (f) {
              Ot(e, e.return, f);
            }
        } else if (!((i.tag === _e || i.tag === Ie) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function jC(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ne:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & ke)
            try {
              tl(), u = t(i);
            } finally {
              el(e);
            }
          else
            u = t(i);
          typeof u == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Me(e));
        } else
          t.hasOwnProperty("current") || g("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Me(e)), t.current = i;
      }
    }
    function qw(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function VC(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, VC(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ne) {
          var a = e.stateNode;
          a !== null && nx(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Kw(e) {
      for (var t = e.return; t !== null; ) {
        if (BC(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function BC(e) {
      return e.tag === ne || e.tag === Y || e.tag === K;
    }
    function PC(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || BC(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ne && t.tag !== we && t.tag !== Bt; ) {
          if (t.flags & bt || t.child === null || t.tag === K)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & bt))
          return t.stateNode;
      }
    }
    function Zw(e) {
      var t = Kw(e);
      switch (t.tag) {
        case ne: {
          var a = t.stateNode;
          t.flags & ot && (Y0(a), t.flags &= ~ot);
          var i = PC(e);
          kS(e, i, a);
          break;
        }
        case Y:
        case K: {
          var u = t.stateNode.containerInfo, s = PC(e);
          bS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function bS(e, t, a) {
      var i = e.tag, u = i === ne || i === we;
      if (u) {
        var s = e.stateNode;
        t ? yR(a, s, t) : hR(a, s);
      } else if (i !== K) {
        var f = e.child;
        if (f !== null) {
          bS(f, t, a);
          for (var p = f.sibling; p !== null; )
            bS(p, t, a), p = p.sibling;
        }
      }
    }
    function kS(e, t, a) {
      var i = e.tag, u = i === ne || i === we;
      if (u) {
        var s = e.stateNode;
        t ? mR(a, s, t) : vR(a, s);
      } else if (i !== K) {
        var f = e.child;
        if (f !== null) {
          kS(f, t, a);
          for (var p = f.sibling; p !== null; )
            kS(p, t, a), p = p.sibling;
        }
      }
    }
    var ar = null, wi = !1;
    function Jw(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ne: {
              ar = i.stateNode, wi = !1;
              break e;
            }
            case Y: {
              ar = i.stateNode.containerInfo, wi = !0;
              break e;
            }
            case K: {
              ar = i.stateNode.containerInfo, wi = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (ar === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        $C(e, t, a), ar = null, wi = !1;
      }
      qw(a);
    }
    function Zu(e, t, a) {
      for (var i = a.child; i !== null; )
        $C(e, t, i), i = i.sibling;
    }
    function $C(e, t, a) {
      switch (Cl(a), a.tag) {
        case ne:
          rr || sf(a, t);
        case we: {
          {
            var i = ar, u = wi;
            ar = null, Zu(e, t, a), ar = i, wi = u, ar !== null && (wi ? SR(ar, a.stateNode) : gR(ar, a.stateNode));
          }
          return;
        }
        case Bt: {
          ar !== null && (wi ? ER(ar, a.stateNode) : jy(ar, a.stateNode));
          return;
        }
        case K: {
          {
            var s = ar, f = wi;
            ar = a.stateNode.containerInfo, wi = !0, Zu(e, t, a), ar = s, wi = f;
          }
          return;
        }
        case ce:
        case Be:
        case xt:
        case Ae: {
          if (!rr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var m = v.next, y = m;
                do {
                  var x = y, T = x.destroy, _ = x.tag;
                  T !== void 0 && ((_ & Ki) !== va ? mm(a, t, T) : (_ & Mn) !== va && (Oa(a), a.mode & ke ? (tl(), mm(a, t, T), el(a)) : mm(a, t, T), vu())), y = y.next;
                } while (y !== m);
              }
            }
          }
          Zu(e, t, a);
          return;
        }
        case le: {
          if (!rr) {
            sf(a, t);
            var L = a.stateNode;
            typeof L.componentWillUnmount == "function" && DS(a, t, L);
          }
          Zu(e, t, a);
          return;
        }
        case xn: {
          Zu(e, t, a);
          return;
        }
        case _e: {
          if (
            // TODO: Remove this dead flag
            a.mode & ve
          ) {
            var N = rr;
            rr = N || a.memoizedState !== null, Zu(e, t, a), rr = N;
          } else
            Zu(e, t, a);
          break;
        }
        default: {
          Zu(e, t, a);
          return;
        }
      }
    }
    function eD(e) {
      e.memoizedState;
    }
    function tD(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && jR(s);
          }
        }
      }
    }
    function YC(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Fw()), t.forEach(function(i) {
          var u = KD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Fr)
              if (uf !== null && of !== null)
                Tp(of, uf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function nD(e, t, a) {
      uf = a, of = e, ht(t), QC(t, e), ht(t), uf = null, of = null;
    }
    function Di(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            Jw(e, t, s);
          } catch (v) {
            Ot(s, t, v);
          }
        }
      var f = Vm();
      if (t.subtreeFlags & mr)
        for (var p = t.child; p !== null; )
          ht(p), QC(p, e), p = p.sibling;
      ht(f);
    }
    function QC(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case ce:
        case Be:
        case xt:
        case Ae: {
          if (Di(t, e), nl(e), u & ze) {
            try {
              xi(Ki | Ln, e, e.return), Ku(Ki | Ln, e);
            } catch (De) {
              Ot(e, e.return, De);
            }
            if (e.mode & ke) {
              try {
                tl(), xi(Mn | Ln, e, e.return);
              } catch (De) {
                Ot(e, e.return, De);
              }
              el(e);
            } else
              try {
                xi(Mn | Ln, e, e.return);
              } catch (De) {
                Ot(e, e.return, De);
              }
          }
          return;
        }
        case le: {
          Di(t, e), nl(e), u & pr && i !== null && sf(i, i.return);
          return;
        }
        case ne: {
          Di(t, e), nl(e), u & pr && i !== null && sf(i, i.return);
          {
            if (e.flags & ot) {
              var s = e.stateNode;
              try {
                Y0(s);
              } catch (De) {
                Ot(e, e.return, De);
              }
            }
            if (u & ze) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, m = e.type, y = e.updateQueue;
                if (e.updateQueue = null, y !== null)
                  try {
                    dR(f, y, m, v, p, e);
                  } catch (De) {
                    Ot(e, e.return, De);
                  }
              }
            }
          }
          return;
        }
        case we: {
          if (Di(t, e), nl(e), u & ze) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var x = e.stateNode, T = e.memoizedProps, _ = i !== null ? i.memoizedProps : T;
            try {
              pR(x, _, T);
            } catch (De) {
              Ot(e, e.return, De);
            }
          }
          return;
        }
        case Y: {
          if (Di(t, e), nl(e), u & ze && i !== null) {
            var L = i.memoizedState;
            if (L.isDehydrated)
              try {
                FR(t.containerInfo);
              } catch (De) {
                Ot(e, e.return, De);
              }
          }
          return;
        }
        case K: {
          Di(t, e), nl(e);
          return;
        }
        case $e: {
          Di(t, e), nl(e);
          var N = e.child;
          if (N.flags & Fi) {
            var q = N.stateNode, Ee = N.memoizedState, he = Ee !== null;
            if (q.isHidden = he, he) {
              var qe = N.alternate !== null && N.alternate.memoizedState !== null;
              qe || AD();
            }
          }
          if (u & ze) {
            try {
              eD(e);
            } catch (De) {
              Ot(e, e.return, De);
            }
            YC(e);
          }
          return;
        }
        case _e: {
          var Qe = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & ve
          ) {
            var D = rr;
            rr = D || Qe, Di(t, e), rr = D;
          } else
            Di(t, e);
          if (nl(e), u & Fi) {
            var z = e.stateNode, b = e.memoizedState, P = b !== null, ae = e;
            if (z.isHidden = P, P && !Qe && (ae.mode & ve) !== de) {
              se = ae;
              for (var Z = ae.child; Z !== null; )
                se = Z, aD(Z), Z = Z.sibling;
            }
            Xw(ae, P);
          }
          return;
        }
        case vt: {
          Di(t, e), nl(e), u & ze && YC(e);
          return;
        }
        case xn:
          return;
        default: {
          Di(t, e), nl(e);
          return;
        }
      }
    }
    function nl(e) {
      var t = e.flags;
      if (t & bt) {
        try {
          Zw(e);
        } catch (a) {
          Ot(e, e.return, a);
        }
        e.flags &= ~bt;
      }
      t & ta && (e.flags &= ~ta);
    }
    function rD(e, t, a) {
      uf = a, of = t, se = e, IC(e, t, a), uf = null, of = null;
    }
    function IC(e, t, a) {
      for (var i = (e.mode & ve) !== de; se !== null; ) {
        var u = se, s = u.child;
        if (u.tag === _e && i) {
          var f = u.memoizedState !== null, p = f || hm;
          if (p) {
            _S(e, t, a);
            continue;
          } else {
            var v = u.alternate, m = v !== null && v.memoizedState !== null, y = m || rr, x = hm, T = rr;
            hm = p, rr = y, rr && !T && (se = u, iD(u));
            for (var _ = s; _ !== null; )
              se = _, IC(
                _,
                // New root; bubble back up to here and stop.
                t,
                a
              ), _ = _.sibling;
            se = u, hm = x, rr = T, _S(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Qn) !== Se && s !== null ? (s.return = u, se = s) : _S(e, t, a);
      }
    }
    function _S(e, t, a) {
      for (; se !== null; ) {
        var i = se;
        if ((i.flags & Qn) !== Se) {
          var u = i.alternate;
          ht(i);
          try {
            Ww(t, u, i, a);
          } catch (f) {
            Ot(i, i.return, f);
          }
          an();
        }
        if (i === e) {
          se = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, se = s;
          return;
        }
        se = i.return;
      }
    }
    function aD(e) {
      for (; se !== null; ) {
        var t = se, a = t.child;
        switch (t.tag) {
          case ce:
          case Be:
          case xt:
          case Ae: {
            if (t.mode & ke)
              try {
                tl(), xi(Mn, t, t.return);
              } finally {
                el(t);
              }
            else
              xi(Mn, t, t.return);
            break;
          }
          case le: {
            sf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && DS(t, t.return, i);
            break;
          }
          case ne: {
            sf(t, t.return);
            break;
          }
          case _e: {
            var u = t.memoizedState !== null;
            if (u) {
              WC(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, se = a) : WC(e);
      }
    }
    function WC(e) {
      for (; se !== null; ) {
        var t = se;
        if (t === e) {
          se = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, se = a;
          return;
        }
        se = t.return;
      }
    }
    function iD(e) {
      for (; se !== null; ) {
        var t = se, a = t.child;
        if (t.tag === _e) {
          var i = t.memoizedState !== null;
          if (i) {
            GC(e);
            continue;
          }
        }
        a !== null ? (a.return = t, se = a) : GC(e);
      }
    }
    function GC(e) {
      for (; se !== null; ) {
        var t = se;
        ht(t);
        try {
          Gw(t);
        } catch (i) {
          Ot(t, t.return, i);
        }
        if (an(), t === e) {
          se = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, se = a;
          return;
        }
        se = t.return;
      }
    }
    function lD(e, t, a, i) {
      se = t, uD(t, e, a, i);
    }
    function uD(e, t, a, i) {
      for (; se !== null; ) {
        var u = se, s = u.child;
        (u.subtreeFlags & na) !== Se && s !== null ? (s.return = u, se = s) : oD(e, t, a, i);
      }
    }
    function oD(e, t, a, i) {
      for (; se !== null; ) {
        var u = se;
        if ((u.flags & Mt) !== Se) {
          ht(u);
          try {
            sD(t, u, a, i);
          } catch (f) {
            Ot(u, u.return, f);
          }
          an();
        }
        if (u === e) {
          se = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, se = s;
          return;
        }
        se = u.return;
      }
    }
    function sD(e, t, a, i) {
      switch (t.tag) {
        case ce:
        case Be:
        case Ae: {
          if (t.mode & ke) {
            Gg();
            try {
              Ku(tr | Ln, t);
            } finally {
              Wg(t);
            }
          } else
            Ku(tr | Ln, t);
          break;
        }
      }
    }
    function cD(e) {
      se = e, fD();
    }
    function fD() {
      for (; se !== null; ) {
        var e = se, t = e.child;
        if ((se.flags & lt) !== Se) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              se = u, vD(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            se = e;
          }
        }
        (e.subtreeFlags & na) !== Se && t !== null ? (t.return = e, se = t) : dD();
      }
    }
    function dD() {
      for (; se !== null; ) {
        var e = se;
        (e.flags & Mt) !== Se && (ht(e), pD(e), an());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, se = t;
          return;
        }
        se = e.return;
      }
    }
    function pD(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          e.mode & ke ? (Gg(), xi(tr | Ln, e, e.return), Wg(e)) : xi(tr | Ln, e, e.return);
          break;
        }
      }
    }
    function vD(e, t) {
      for (; se !== null; ) {
        var a = se;
        ht(a), mD(a, t), an();
        var i = a.child;
        i !== null ? (i.return = a, se = i) : hD(e);
      }
    }
    function hD(e) {
      for (; se !== null; ) {
        var t = se, a = t.sibling, i = t.return;
        if (VC(t), t === e) {
          se = null;
          return;
        }
        if (a !== null) {
          a.return = i, se = a;
          return;
        }
        se = i;
      }
    }
    function mD(e, t) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          e.mode & ke ? (Gg(), xi(tr, e, t), Wg(e)) : xi(tr, e, t);
          break;
        }
      }
    }
    function yD(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          try {
            Ku(Mn | Ln, e);
          } catch (a) {
            Ot(e, e.return, a);
          }
          break;
        }
        case le: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Ot(e, e.return, a);
          }
          break;
        }
      }
    }
    function gD(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          try {
            Ku(tr | Ln, e);
          } catch (t) {
            Ot(e, e.return, t);
          }
          break;
        }
      }
    }
    function SD(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae: {
          try {
            xi(Mn | Ln, e, e.return);
          } catch (a) {
            Ot(e, e.return, a);
          }
          break;
        }
        case le: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && DS(e, e.return, t);
          break;
        }
      }
    }
    function ED(e) {
      switch (e.tag) {
        case ce:
        case Be:
        case Ae:
          try {
            xi(tr | Ln, e, e.return);
          } catch (t) {
            Ot(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var fp = Symbol.for;
      fp("selector.component"), fp("selector.has_pseudo_class"), fp("selector.role"), fp("selector.test_id"), fp("selector.text");
    }
    var CD = [];
    function TD() {
      CD.forEach(function(e) {
        return e();
      });
    }
    var RD = M.ReactCurrentActQueue;
    function xD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function XC() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && RD.current !== null && g("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var wD = Math.ceil, OS = M.ReactCurrentDispatcher, LS = M.ReactCurrentOwner, ir = M.ReactCurrentBatchConfig, bi = M.ReactCurrentActQueue, Un = (
      /*             */
      0
    ), qC = (
      /*               */
      1
    ), lr = (
      /*                */
      2
    ), Za = (
      /*                */
      4
    ), $l = 0, dp = 1, fs = 2, ym = 3, pp = 4, KC = 5, MS = 6, Xe = Un, Pr = null, qt = null, An = H, rl = H, NS = Pu(H), Hn = $l, vp = null, gm = H, hp = H, Sm = H, mp = null, ha = null, zS = 0, ZC = 500, JC = 1 / 0, DD = 500, Yl = null;
    function yp() {
      JC = Ht() + DD;
    }
    function e1() {
      return JC;
    }
    var Em = !1, US = null, cf = null, ds = !1, Ju = null, gp = H, AS = [], HS = null, bD = 50, Sp = 0, FS = null, jS = !1, Cm = !1, kD = 50, ff = 0, Tm = null, Ep = Rt, Rm = H, t1 = !1;
    function xm() {
      return Pr;
    }
    function $r() {
      return (Xe & (lr | Za)) !== Un ? Ht() : (Ep !== Rt || (Ep = Ht()), Ep);
    }
    function eo(e) {
      var t = e.mode;
      if ((t & ve) === de)
        return ye;
      if ((Xe & lr) !== Un && An !== H)
        return Ru(An);
      var a = Rx() !== Tx;
      if (a) {
        if (ir.transition !== null) {
          var i = ir.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Rm === tn && (Rm = Av()), Rm;
      }
      var u = ua();
      if (u !== tn)
        return u;
      var s = uR();
      return s;
    }
    function _D(e) {
      var t = e.mode;
      return (t & ve) === de ? ye : Er();
    }
    function Fn(e, t, a, i) {
      JD(), t1 && g("useInsertionEffect must not schedule updates."), jS && (Cm = !0), _l(e, a, i), (Xe & lr) !== H && e === Pr ? nb(t) : (Fr && yc(e, t, a), rb(t), e === Pr && ((Xe & lr) === Un && (hp = Ne(hp, a)), Hn === pp && to(e, An)), ma(e, i), a === ye && Xe === Un && (t.mode & ve) === de && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !bi.isBatchingLegacy && (yp(), tE()));
    }
    function OD(e, t, a) {
      var i = e.current;
      i.lanes = t, _l(e, t, a), ma(e, a);
    }
    function LD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Xe & lr) !== Un
      );
    }
    function ma(e, t) {
      var a = e.callbackNode;
      Lv(e, t);
      var i = bl(e, e === Pr ? An : H);
      if (i === H) {
        a !== null && y1(a), e.callbackNode = null, e.callbackPriority = tn;
        return;
      }
      var u = Wt(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(bi.current !== null && a !== IS)) {
        a == null && s !== ye && g("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && y1(a);
      var f;
      if (u === ye)
        e.tag === $u ? (bi.isBatchingLegacy !== null && (bi.didScheduleLegacyUpdate = !0), ix(a1.bind(null, e))) : eE(a1.bind(null, e)), bi.current !== null ? bi.current.push(Yu) : sR(function() {
          (Xe & (lr | Za)) === Un && Yu();
        }), f = null;
      else {
        var p;
        switch (On(i)) {
          case Gt:
            p = Ys;
            break;
          case pi:
            p = El;
            break;
          case $a:
            p = Pa;
            break;
          case xu:
            p = Qs;
            break;
          default:
            p = Pa;
            break;
        }
        f = WS(p, n1.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function n1(e, t) {
      if (Xx(), Ep = Rt, Rm = H, (Xe & (lr | Za)) !== Un)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Il();
      if (i && e.callbackNode !== a)
        return null;
      var u = bl(e, e === Pr ? An : H);
      if (u === H)
        return null;
      var s = !Fo(e, u) && !Uv(e, u) && !t, f = s ? BD(e, u) : Dm(e, u);
      if (f !== $l) {
        if (f === fs) {
          var p = $i(e);
          p !== H && (u = p, f = VS(e, p));
        }
        if (f === dp) {
          var v = vp;
          throw ps(e, H), to(e, u), ma(e, Ht()), v;
        }
        if (f === MS)
          to(e, u);
        else {
          var m = !Fo(e, u), y = e.current.alternate;
          if (m && !ND(y)) {
            if (f = Dm(e, u), f === fs) {
              var x = $i(e);
              x !== H && (u = x, f = VS(e, x));
            }
            if (f === dp) {
              var T = vp;
              throw ps(e, H), to(e, u), ma(e, Ht()), T;
            }
          }
          e.finishedWork = y, e.finishedLanes = u, MD(e, f, u);
        }
      }
      return ma(e, Ht()), e.callbackNode === a ? n1.bind(null, e) : null;
    }
    function VS(e, t) {
      var a = mp;
      if (gc(e)) {
        var i = ps(e, t);
        i.flags |= Pt, ZR(e.containerInfo);
      }
      var u = Dm(e, t);
      if (u !== fs) {
        var s = ha;
        ha = a, s !== null && r1(s);
      }
      return u;
    }
    function r1(e) {
      ha === null ? ha = e : ha.push.apply(ha, e);
    }
    function MD(e, t, a) {
      switch (t) {
        case $l:
        case dp:
          throw new Error("Root did not complete. This is a bug in React.");
        case fs: {
          vs(e, ha, Yl);
          break;
        }
        case ym: {
          if (to(e, a), Mv(a) && // do not delay if we're inside an act() scope
          !g1()) {
            var i = zS + ZC - Ht();
            if (i > 10) {
              var u = bl(e, H);
              if (u !== H)
                break;
              var s = e.suspendedLanes;
              if (!kl(s, a)) {
                $r(), hc(e, s);
                break;
              }
              e.timeoutHandle = Hy(vs.bind(null, e, ha, Yl), i);
              break;
            }
          }
          vs(e, ha, Yl);
          break;
        }
        case pp: {
          if (to(e, a), zv(a))
            break;
          if (!g1()) {
            var f = _v(e, a), p = f, v = Ht() - p, m = ZD(v) - v;
            if (m > 10) {
              e.timeoutHandle = Hy(vs.bind(null, e, ha, Yl), m);
              break;
            }
          }
          vs(e, ha, Yl);
          break;
        }
        case KC: {
          vs(e, ha, Yl);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function ND(e) {
      for (var t = e; ; ) {
        if (t.flags & ko) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!oe(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & ko && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function to(e, t) {
      t = jo(t, Sm), t = jo(t, hp), Fv(e, t);
    }
    function a1(e) {
      if (qx(), (Xe & (lr | Za)) !== Un)
        throw new Error("Should not already be working.");
      Il();
      var t = bl(e, H);
      if (!Cr(t, ye))
        return ma(e, Ht()), null;
      var a = Dm(e, t);
      if (e.tag !== $u && a === fs) {
        var i = $i(e);
        i !== H && (t = i, a = VS(e, i));
      }
      if (a === dp) {
        var u = vp;
        throw ps(e, H), to(e, t), ma(e, Ht()), u;
      }
      if (a === MS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, vs(e, ha, Yl), ma(e, Ht()), null;
    }
    function zD(e, t) {
      t !== H && (cd(e, Ne(t, ye)), ma(e, Ht()), (Xe & (lr | Za)) === Un && (yp(), Yu()));
    }
    function BS(e, t) {
      var a = Xe;
      Xe |= qC;
      try {
        return e(t);
      } finally {
        Xe = a, Xe === Un && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !bi.isBatchingLegacy && (yp(), tE());
      }
    }
    function UD(e, t, a, i, u) {
      var s = ua(), f = ir.transition;
      try {
        return ir.transition = null, $t(Gt), e(t, a, i, u);
      } finally {
        $t(s), ir.transition = f, Xe === Un && yp();
      }
    }
    function Ql(e) {
      Ju !== null && Ju.tag === $u && (Xe & (lr | Za)) === Un && Il();
      var t = Xe;
      Xe |= qC;
      var a = ir.transition, i = ua();
      try {
        return ir.transition = null, $t(Gt), e ? e() : void 0;
      } finally {
        $t(i), ir.transition = a, Xe = t, (Xe & (lr | Za)) === Un && Yu();
      }
    }
    function i1() {
      return (Xe & (lr | Za)) !== Un;
    }
    function wm(e, t) {
      xr(NS, rl, e), rl = Ne(rl, t);
    }
    function PS(e) {
      rl = NS.current, Rr(NS, e);
    }
    function ps(e, t) {
      e.finishedWork = null, e.finishedLanes = H;
      var a = e.timeoutHandle;
      if (a !== Fy && (e.timeoutHandle = Fy, oR(a)), qt !== null)
        for (var i = qt.return; i !== null; ) {
          var u = i.alternate;
          zC(u, i), i = i.return;
        }
      Pr = e;
      var s = hs(e.current, null);
      return qt = s, An = rl = t, Hn = $l, vp = null, gm = H, hp = H, Sm = H, mp = null, ha = null, Ox(), Si.discardPendingWarnings(), s;
    }
    function l1(e, t) {
      do {
        var a = qt;
        try {
          if (Uh(), OE(), an(), LS.current = null, a === null || a.return === null) {
            Hn = dp, vp = t, qt = null;
            return;
          }
          if (rn && a.mode & ke && cm(a, !0), za)
            if (gr(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Tl(a, i, An);
            } else
              Lo(a, t, An);
          iw(e, a.return, a, t, An), c1(a);
        } catch (u) {
          t = u, qt === a && a !== null ? (a = a.return, qt = a) : a = qt;
          continue;
        }
        return;
      } while (!0);
    }
    function u1() {
      var e = OS.current;
      return OS.current = im, e === null ? im : e;
    }
    function o1(e) {
      OS.current = e;
    }
    function AD() {
      zS = Ht();
    }
    function Cp(e) {
      gm = Ne(e, gm);
    }
    function HD() {
      Hn === $l && (Hn = ym);
    }
    function $S() {
      (Hn === $l || Hn === ym || Hn === fs) && (Hn = pp), Pr !== null && (Ho(gm) || Ho(hp)) && to(Pr, An);
    }
    function FD(e) {
      Hn !== pp && (Hn = fs), mp === null ? mp = [e] : mp.push(e);
    }
    function jD() {
      return Hn === $l;
    }
    function Dm(e, t) {
      var a = Xe;
      Xe |= lr;
      var i = u1();
      if (Pr !== e || An !== t) {
        if (Fr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Tp(e, An), u.clear()), fd(e, t);
        }
        Yl = Bo(), ps(e, t);
      }
      Nt(t);
      do
        try {
          VD();
          break;
        } catch (s) {
          l1(e, s);
        }
      while (!0);
      if (Uh(), Xe = a, o1(i), qt !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return qs(), Pr = null, An = H, Hn;
    }
    function VD() {
      for (; qt !== null; )
        s1(qt);
    }
    function BD(e, t) {
      var a = Xe;
      Xe |= lr;
      var i = u1();
      if (Pr !== e || An !== t) {
        if (Fr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Tp(e, An), u.clear()), fd(e, t);
        }
        Yl = Bo(), yp(), ps(e, t);
      }
      Nt(t);
      do
        try {
          PD();
          break;
        } catch (s) {
          l1(e, s);
        }
      while (!0);
      return Uh(), o1(i), Xe = a, qt !== null ? (Xs(), $l) : (qs(), Pr = null, An = H, Hn);
    }
    function PD() {
      for (; qt !== null && !$s(); )
        s1(qt);
    }
    function s1(e) {
      var t = e.alternate;
      ht(e);
      var a;
      (e.mode & ke) !== de ? (Ig(e), a = YS(t, e, rl), cm(e, !0)) : a = YS(t, e, rl), an(), e.memoizedProps = e.pendingProps, a === null ? c1(e) : qt = a, LS.current = null;
    }
    function c1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Ur) === Se) {
          ht(t);
          var u = void 0;
          if ((t.mode & ke) === de ? u = NC(a, t, rl) : (Ig(t), u = NC(a, t, rl), cm(t, !1)), an(), u !== null) {
            qt = u;
            return;
          }
        } else {
          var s = Hw(a, t);
          if (s !== null) {
            s.flags &= gv, qt = s;
            return;
          }
          if ((t.mode & ke) !== de) {
            cm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Ur, i.subtreeFlags = Se, i.deletions = null;
          else {
            Hn = MS, qt = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          qt = v;
          return;
        }
        t = i, qt = t;
      } while (t !== null);
      Hn === $l && (Hn = KC);
    }
    function vs(e, t, a) {
      var i = ua(), u = ir.transition;
      try {
        ir.transition = null, $t(Gt), $D(e, t, a, i);
      } finally {
        ir.transition = u, $t(i);
      }
      return null;
    }
    function $D(e, t, a, i) {
      do
        Il();
      while (Ju !== null);
      if (eb(), (Xe & (lr | Za)) !== Un)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Vi(s), u === null)
        return Is(), null;
      if (s === H && g("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = H, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = tn;
      var f = Ne(u.lanes, u.childLanes);
      mc(e, f), e === Pr && (Pr = null, qt = null, An = H), ((u.subtreeFlags & na) !== Se || (u.flags & na) !== Se) && (ds || (ds = !0, HS = a, WS(Pa, function() {
        return Il(), null;
      })));
      var p = (u.subtreeFlags & (cu | mr | Qn | na)) !== Se, v = (u.flags & (cu | mr | Qn | na)) !== Se;
      if (p || v) {
        var m = ir.transition;
        ir.transition = null;
        var y = ua();
        $t(Gt);
        var x = Xe;
        Xe |= Za, LS.current = null, Pw(e, u), tC(), nD(e, u, s), tR(e.containerInfo), e.current = u, nd(s), rD(u, e, s), hu(), Cv(), Xe = x, $t(y), ir.transition = m;
      } else
        e.current = u, tC();
      var T = ds;
      if (ds ? (ds = !1, Ju = e, gp = s) : (ff = 0, Tm = null), f = e.pendingLanes, f === H && (cf = null), T || v1(e.current, !1), du(u.stateNode, i), Fr && e.memoizedUpdaters.clear(), TD(), ma(e, Ht()), t !== null)
        for (var _ = e.onRecoverableError, L = 0; L < t.length; L++) {
          var N = t[L], q = N.stack, Ee = N.digest;
          _(N.value, {
            componentStack: q,
            digest: Ee
          });
        }
      if (Em) {
        Em = !1;
        var he = US;
        throw US = null, he;
      }
      return Cr(gp, ye) && e.tag !== $u && Il(), f = e.pendingLanes, Cr(f, ye) ? (Gx(), e === FS ? Sp++ : (Sp = 0, FS = e)) : Sp = 0, Yu(), Is(), null;
    }
    function Il() {
      if (Ju !== null) {
        var e = On(gp), t = oy($a, e), a = ir.transition, i = ua();
        try {
          return ir.transition = null, $t(t), QD();
        } finally {
          $t(i), ir.transition = a;
        }
      }
      return !1;
    }
    function YD(e) {
      AS.push(e), ds || (ds = !0, WS(Pa, function() {
        return Il(), null;
      }));
    }
    function QD() {
      if (Ju === null)
        return !1;
      var e = HS;
      HS = null;
      var t = Ju, a = gp;
      if (Ju = null, gp = H, (Xe & (lr | Za)) !== Un)
        throw new Error("Cannot flush passive effects while already rendering.");
      jS = !0, Cm = !1, bv(a);
      var i = Xe;
      Xe |= Za, cD(t.current), lD(t, t.current, a, e);
      {
        var u = AS;
        AS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Iw(t, f);
        }
      }
      rd(), v1(t.current, !0), Xe = i, Yu(), Cm ? t === Tm ? ff++ : (ff = 0, Tm = t) : ff = 0, jS = !1, Cm = !1, ia(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function f1(e) {
      return cf !== null && cf.has(e);
    }
    function ID(e) {
      cf === null ? cf = /* @__PURE__ */ new Set([e]) : cf.add(e);
    }
    function WD(e) {
      Em || (Em = !0, US = e);
    }
    var GD = WD;
    function d1(e, t, a) {
      var i = ss(a, t), u = sC(e, i, ye), s = Iu(e, u, ye), f = $r();
      s !== null && (_l(s, ye, f), ma(s, f));
    }
    function Ot(e, t, a) {
      if (jw(a), Rp(!1), e.tag === Y) {
        d1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === Y) {
          d1(i, e, a);
          return;
        } else if (i.tag === le) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !f1(s)) {
            var f = ss(a, e), p = cS(i, f, ye), v = Iu(i, p, ye), m = $r();
            v !== null && (_l(v, ye, m), ma(v, m));
            return;
          }
        }
        i = i.return;
      }
      g(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function XD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = $r();
      hc(e, a), ab(e), Pr === e && kl(An, a) && (Hn === pp || Hn === ym && Mv(An) && Ht() - zS < ZC ? ps(e, H) : Sm = Ne(Sm, a)), ma(e, u);
    }
    function p1(e, t) {
      t === tn && (t = _D(e));
      var a = $r(), i = pa(e, t);
      i !== null && (_l(i, t, a), ma(i, a));
    }
    function qD(e) {
      var t = e.memoizedState, a = tn;
      t !== null && (a = t.retryLane), p1(e, a);
    }
    function KD(e, t) {
      var a = tn, i;
      switch (e.tag) {
        case $e:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case vt:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), p1(e, a);
    }
    function ZD(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : wD(e / 1960) * 1960;
    }
    function JD() {
      if (Sp > bD)
        throw Sp = 0, FS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      ff > kD && (ff = 0, Tm = null, g("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function eb() {
      Si.flushLegacyContextWarning(), Si.flushPendingUnsafeLifecycleWarnings();
    }
    function v1(e, t) {
      ht(e), bm(e, hr, SD), t && bm(e, Sl, ED), bm(e, hr, yD), t && bm(e, Sl, gD), an();
    }
    function bm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== Se ? i = i.child : ((i.flags & t) !== Se && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var km = null;
    function h1(e) {
      {
        if ((Xe & lr) !== Un || !(e.mode & ve))
          return;
        var t = e.tag;
        if (t !== Ke && t !== Y && t !== le && t !== ce && t !== Be && t !== xt && t !== Ae)
          return;
        var a = Me(e) || "ReactComponent";
        if (km !== null) {
          if (km.has(a))
            return;
          km.add(a);
        } else
          km = /* @__PURE__ */ new Set([a]);
        var i = Zt;
        try {
          ht(e), g("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? ht(e) : an();
        }
      }
    }
    var YS;
    {
      var tb = null;
      YS = function(e, t, a) {
        var i = R1(tb, t);
        try {
          return kC(e, t, a);
        } catch (s) {
          if (px() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (Uh(), OE(), zC(e, t), R1(t, i), t.mode & ke && Ig(t), gl(null, kC, null, e, t, a), ry()) {
            var u = Wf();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var m1 = !1, QS;
    QS = /* @__PURE__ */ new Set();
    function nb(e) {
      if (qr && !Qx())
        switch (e.tag) {
          case ce:
          case Be:
          case Ae: {
            var t = qt && Me(qt) || "Unknown", a = t;
            if (!QS.has(a)) {
              QS.add(a);
              var i = Me(e) || "Unknown";
              g("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case le: {
            m1 || (g("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), m1 = !0);
            break;
          }
        }
    }
    function Tp(e, t) {
      if (Fr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          yc(e, i, t);
        });
      }
    }
    var IS = {};
    function WS(e, t) {
      {
        var a = bi.current;
        return a !== null ? (a.push(t), IS) : Ps(e, t);
      }
    }
    function y1(e) {
      if (e !== IS)
        return Ev(e);
    }
    function g1() {
      return bi.current !== null;
    }
    function rb(e) {
      {
        if (e.mode & ve) {
          if (!XC())
            return;
        } else if (!xD() || Xe !== Un || e.tag !== ce && e.tag !== Be && e.tag !== Ae)
          return;
        if (bi.current === null) {
          var t = Zt;
          try {
            ht(e), g(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Me(e));
          } finally {
            t ? ht(e) : an();
          }
        }
      }
    }
    function ab(e) {
      e.tag !== $u && XC() && bi.current === null && g(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Rp(e) {
      t1 = e;
    }
    var Ja = null, df = null, ib = function(e) {
      Ja = e;
    };
    function pf(e) {
      {
        if (Ja === null)
          return e;
        var t = Ja(e);
        return t === void 0 ? e : t.current;
      }
    }
    function GS(e) {
      return pf(e);
    }
    function XS(e) {
      {
        if (Ja === null)
          return e;
        var t = Ja(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = pf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: I,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function S1(e, t) {
      {
        if (Ja === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case le: {
            typeof i == "function" && (u = !0);
            break;
          }
          case ce: {
            (typeof i == "function" || s === xe) && (u = !0);
            break;
          }
          case Be: {
            (s === I || s === xe) && (u = !0);
            break;
          }
          case xt:
          case Ae: {
            (s === Ze || s === xe) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Ja(a);
          if (f !== void 0 && f === Ja(i))
            return !0;
        }
        return !1;
      }
    }
    function E1(e) {
      {
        if (Ja === null || typeof WeakSet != "function")
          return;
        df === null && (df = /* @__PURE__ */ new WeakSet()), df.add(e);
      }
    }
    var lb = function(e, t) {
      {
        if (Ja === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Il(), Ql(function() {
          qS(e.current, i, a);
        });
      }
    }, ub = function(e, t) {
      {
        if (e.context !== La)
          return;
        Il(), Ql(function() {
          xp(t, e, null, null);
        });
      }
    };
    function qS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case ce:
          case Ae:
          case le:
            v = p;
            break;
          case Be:
            v = p.render;
            break;
        }
        if (Ja === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var m = !1, y = !1;
        if (v !== null) {
          var x = Ja(v);
          x !== void 0 && (a.has(x) ? y = !0 : t.has(x) && (f === le ? y = !0 : m = !0));
        }
        if (df !== null && (df.has(e) || i !== null && df.has(i)) && (y = !0), y && (e._debugNeedsRemount = !0), y || m) {
          var T = pa(e, ye);
          T !== null && Fn(T, e, ye, Rt);
        }
        u !== null && !y && qS(u, t, a), s !== null && qS(s, t, a);
      }
    }
    var ob = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return KS(e.current, i, a), a;
      }
    };
    function KS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case ce:
          case Ae:
          case le:
            p = f;
            break;
          case Be:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? sb(e, a) : i !== null && KS(i, t, a), u !== null && KS(u, t, a);
      }
    }
    function sb(e, t) {
      {
        var a = cb(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ne:
              t.add(i.stateNode);
              return;
            case K:
              t.add(i.stateNode.containerInfo);
              return;
            case Y:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function cb(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ne)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var ZS;
    {
      ZS = !1;
      try {
        var C1 = Object.preventExtensions({});
      } catch {
        ZS = !0;
      }
    }
    function fb(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Se, this.subtreeFlags = Se, this.deletions = null, this.lanes = H, this.childLanes = H, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !ZS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Ma = function(e, t, a, i) {
      return new fb(e, t, a, i);
    };
    function JS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function db(e) {
      return typeof e == "function" && !JS(e) && e.defaultProps === void 0;
    }
    function pb(e) {
      if (typeof e == "function")
        return JS(e) ? le : ce;
      if (e != null) {
        var t = e.$$typeof;
        if (t === I)
          return Be;
        if (t === Ze)
          return xt;
      }
      return Ke;
    }
    function hs(e, t) {
      var a = e.alternate;
      a === null ? (a = Ma(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Se, a.subtreeFlags = Se, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & kn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case Ke:
        case ce:
        case Ae:
          a.type = pf(e.type);
          break;
        case le:
          a.type = GS(e.type);
          break;
        case Be:
          a.type = XS(e.type);
          break;
      }
      return a;
    }
    function vb(e, t) {
      e.flags &= kn | bt;
      var a = e.alternate;
      if (a === null)
        e.childLanes = H, e.lanes = t, e.child = null, e.subtreeFlags = Se, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Se, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function hb(e, t, a) {
      var i;
      return e === wh ? (i = ve, t === !0 && (i |= Ve, i |= jr)) : i = de, Fr && (i |= ke), Ma(Y, null, null, i);
    }
    function e0(e, t, a, i, u, s) {
      var f = Ke, p = e;
      if (typeof e == "function")
        JS(e) ? (f = le, p = GS(p)) : p = pf(p);
      else if (typeof e == "string")
        f = ne;
      else
        e: switch (e) {
          case Ra:
            return no(a.children, u, s, t);
          case _i:
            f = Pe, u |= Ve, (u & ve) !== de && (u |= jr);
            break;
          case ol:
            return mb(a, u, s, t);
          case me:
            return yb(a, u, s, t);
          case We:
            return gb(a, u, s, t);
          case Dt:
            return T1(a, u, s, t);
          case At:
          case Fe:
          case fr:
          case Oi:
          case hn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case E:
                  f = Je;
                  break e;
                case V:
                  f = Vt;
                  break e;
                case I:
                  f = Be, p = XS(p);
                  break e;
                case Ze:
                  f = xt;
                  break e;
                case xe:
                  f = Rn, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var m = i ? Me(i) : null;
              m && (v += `

Check the render method of \`` + m + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var y = Ma(f, a, t, u);
      return y.elementType = e, y.type = p, y.lanes = s, y._debugOwner = i, y;
    }
    function t0(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = e0(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function no(e, t, a, i) {
      var u = Ma(Ue, e, i, t);
      return u.lanes = a, u;
    }
    function mb(e, t, a, i) {
      typeof e.id != "string" && g('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = Ma(gt, e, i, t | ke);
      return u.elementType = ol, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function yb(e, t, a, i) {
      var u = Ma($e, e, i, t);
      return u.elementType = me, u.lanes = a, u;
    }
    function gb(e, t, a, i) {
      var u = Ma(vt, e, i, t);
      return u.elementType = We, u.lanes = a, u;
    }
    function T1(e, t, a, i) {
      var u = Ma(_e, e, i, t);
      u.elementType = Dt, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function n0(e, t, a) {
      var i = Ma(we, e, null, t);
      return i.lanes = a, i;
    }
    function Sb() {
      var e = Ma(ne, null, null, de);
      return e.elementType = "DELETED", e;
    }
    function Eb(e) {
      var t = Ma(Bt, null, null, de);
      return t.stateNode = e, t;
    }
    function r0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = Ma(K, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function R1(e, t) {
      return e === null && (e = Ma(Ke, null, null, de)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function Cb(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Fy, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = tn, this.eventTimes = Vo(H), this.expirationTimes = Vo(Rt), this.pendingLanes = H, this.suspendedLanes = H, this.pingedLanes = H, this.expiredLanes = H, this.mutableReadLanes = H, this.finishedLanes = H, this.entangledLanes = H, this.entanglements = Vo(H), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < zo; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case wh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case $u:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function x1(e, t, a, i, u, s, f, p, v, m) {
      var y = new Cb(e, t, a, p, v), x = hb(t, s);
      y.current = x, x.stateNode = y;
      {
        var T = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        x.memoizedState = T;
      }
      return mg(x), y;
    }
    var a0 = "18.3.1";
    function Tb(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Sa(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: Mr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var i0, l0;
    i0 = !1, l0 = {};
    function w1(e) {
      if (!e)
        return La;
      var t = Jr(e), a = ax(t);
      if (t.tag === le) {
        var i = t.type;
        if (qi(i))
          return Z0(t, i, a);
      }
      return a;
    }
    function Rb(e, t) {
      {
        var a = Jr(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = ra(a);
        if (u === null)
          return null;
        if (u.mode & Ve) {
          var s = Me(a) || "Component";
          if (!l0[s]) {
            l0[s] = !0;
            var f = Zt;
            try {
              ht(u), a.mode & Ve ? g("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : g("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? ht(f) : an();
            }
          }
        }
        return u.stateNode;
      }
    }
    function D1(e, t, a, i, u, s, f, p) {
      var v = !1, m = null;
      return x1(e, t, v, m, a, i, u, s, f);
    }
    function b1(e, t, a, i, u, s, f, p, v, m) {
      var y = !0, x = x1(a, i, y, e, u, s, f, p, v);
      x.context = w1(null);
      var T = x.current, _ = $r(), L = eo(T), N = Bl(_, L);
      return N.callback = t ?? null, Iu(T, N, L), OD(x, L, _), x;
    }
    function xp(e, t, a, i) {
      td(t, e);
      var u = t.current, s = $r(), f = eo(u);
      ad(f);
      var p = w1(a);
      t.context === null ? t.context = p : t.pendingContext = p, qr && Zt !== null && !i0 && (i0 = !0, g(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Me(Zt) || "Unknown"));
      var v = Bl(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && g("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var m = Iu(u, v, f);
      return m !== null && (Fn(m, u, f, s), Vh(m, u, f)), f;
    }
    function _m(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ne:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function xb(e) {
      switch (e.tag) {
        case Y: {
          var t = e.stateNode;
          if (gc(t)) {
            var a = ud(t);
            zD(t, a);
          }
          break;
        }
        case $e: {
          Ql(function() {
            var u = pa(e, ye);
            if (u !== null) {
              var s = $r();
              Fn(u, e, ye, s);
            }
          });
          var i = ye;
          u0(e, i);
          break;
        }
      }
    }
    function k1(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Hv(a.retryLane, t));
    }
    function u0(e, t) {
      k1(e, t);
      var a = e.alternate;
      a && k1(a, t);
    }
    function wb(e) {
      if (e.tag === $e) {
        var t = Ao, a = pa(e, t);
        if (a !== null) {
          var i = $r();
          Fn(a, e, t, i);
        }
        u0(e, t);
      }
    }
    function Db(e) {
      if (e.tag === $e) {
        var t = eo(e), a = pa(e, t);
        if (a !== null) {
          var i = $r();
          Fn(a, e, t, i);
        }
        u0(e, t);
      }
    }
    function _1(e) {
      var t = Sv(e);
      return t === null ? null : t.stateNode;
    }
    var O1 = function(e) {
      return null;
    };
    function bb(e) {
      return O1(e);
    }
    var L1 = function(e) {
      return !1;
    };
    function kb(e) {
      return L1(e);
    }
    var M1 = null, N1 = null, z1 = null, U1 = null, A1 = null, H1 = null, F1 = null, j1 = null, V1 = null;
    {
      var B1 = function(e, t, a) {
        var i = t[a], u = mn(e) ? e.slice() : je({}, e);
        return a + 1 === t.length ? (mn(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = B1(e[i], t, a + 1), u);
      }, P1 = function(e, t) {
        return B1(e, t, 0);
      }, $1 = function(e, t, a, i) {
        var u = t[i], s = mn(e) ? e.slice() : je({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], mn(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = $1(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, Y1 = function(e, t, a) {
        if (t.length !== a.length) {
          Ge("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              Ge("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return $1(e, t, a, 0);
      }, Q1 = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = mn(e) ? e.slice() : je({}, e);
        return s[u] = Q1(e[u], t, a + 1, i), s;
      }, I1 = function(e, t, a) {
        return Q1(e, t, 0, a);
      }, o0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      M1 = function(e, t, a, i) {
        var u = o0(e, t);
        if (u !== null) {
          var s = I1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = je({}, e.memoizedProps);
          var f = pa(e, ye);
          f !== null && Fn(f, e, ye, Rt);
        }
      }, N1 = function(e, t, a) {
        var i = o0(e, t);
        if (i !== null) {
          var u = P1(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = je({}, e.memoizedProps);
          var s = pa(e, ye);
          s !== null && Fn(s, e, ye, Rt);
        }
      }, z1 = function(e, t, a, i) {
        var u = o0(e, t);
        if (u !== null) {
          var s = Y1(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = je({}, e.memoizedProps);
          var f = pa(e, ye);
          f !== null && Fn(f, e, ye, Rt);
        }
      }, U1 = function(e, t, a) {
        e.pendingProps = I1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = pa(e, ye);
        i !== null && Fn(i, e, ye, Rt);
      }, A1 = function(e, t) {
        e.pendingProps = P1(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = pa(e, ye);
        a !== null && Fn(a, e, ye, Rt);
      }, H1 = function(e, t, a) {
        e.pendingProps = Y1(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = pa(e, ye);
        i !== null && Fn(i, e, ye, Rt);
      }, F1 = function(e) {
        var t = pa(e, ye);
        t !== null && Fn(t, e, ye, Rt);
      }, j1 = function(e) {
        O1 = e;
      }, V1 = function(e) {
        L1 = e;
      };
    }
    function _b(e) {
      var t = ra(e);
      return t === null ? null : t.stateNode;
    }
    function Ob(e) {
      return null;
    }
    function Lb() {
      return Zt;
    }
    function Mb(e) {
      var t = e.findFiberByHostInstance, a = M.ReactCurrentDispatcher;
      return ed({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: M1,
        overrideHookStateDeletePath: N1,
        overrideHookStateRenamePath: z1,
        overrideProps: U1,
        overridePropsDeletePath: A1,
        overridePropsRenamePath: H1,
        setErrorHandler: j1,
        setSuspenseHandler: V1,
        scheduleUpdate: F1,
        currentDispatcherRef: a,
        findHostInstanceByFiber: _b,
        findFiberByHostInstance: t || Ob,
        // React Refresh
        findHostInstancesForRefresh: ob,
        scheduleRefresh: lb,
        scheduleRoot: ub,
        setRefreshHandler: ib,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: Lb,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: a0
      });
    }
    var W1 = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function s0(e) {
      this._internalRoot = e;
    }
    Om.prototype.render = s0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? g("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Lm(arguments[1]) ? g("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && g("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Jt) {
          var i = _1(t.current);
          i && i.parentNode !== a && g("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      xp(e, t, null, null);
    }, Om.prototype.unmount = s0.prototype.unmount = function() {
      typeof arguments[0] == "function" && g("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        i1() && g("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Ql(function() {
          xp(null, e, null, null);
        }), W0(t);
      }
    };
    function Nb(e, t) {
      if (!Lm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      G1(e);
      var a = !1, i = !1, u = "", s = W1;
      t != null && (t.hydrate ? Ge("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ti && g(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = D1(e, wh, null, a, i, u, s);
      gh(f.current, e);
      var p = e.nodeType === Jt ? e.parentNode : e;
      return Od(p), new s0(f);
    }
    function Om(e) {
      this._internalRoot = e;
    }
    function zb(e) {
      e && fy(e);
    }
    Om.prototype.unstable_scheduleHydration = zb;
    function Ub(e, t, a) {
      if (!Lm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      G1(e), t === void 0 && g("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = W1;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var m = b1(t, null, e, wh, i, s, f, p, v);
      if (gh(m.current, e), Od(e), u)
        for (var y = 0; y < u.length; y++) {
          var x = u[y];
          jx(m, x);
        }
      return new Om(m);
    }
    function Lm(e) {
      return !!(e && (e.nodeType === dr || e.nodeType === ba || e.nodeType === dl || !it));
    }
    function wp(e) {
      return !!(e && (e.nodeType === dr || e.nodeType === ba || e.nodeType === dl || e.nodeType === Jt && e.nodeValue === " react-mount-point-unstable "));
    }
    function G1(e) {
      e.nodeType === dr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Bd(e) && (e._reactRootContainer ? g("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : g("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var Ab = M.ReactCurrentOwner, X1;
    X1 = function(e) {
      if (e._reactRootContainer && e.nodeType !== Jt) {
        var t = _1(e._reactRootContainer.current);
        t && t.parentNode !== e && g("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = c0(e), u = !!(i && Bu(i));
      u && !a && g("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === dr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function c0(e) {
      return e ? e.nodeType === ba ? e.documentElement : e.firstChild : null;
    }
    function q1() {
    }
    function Hb(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var T = _m(f);
            s.call(T);
          };
        }
        var f = b1(
          t,
          i,
          e,
          $u,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          q1
        );
        e._reactRootContainer = f, gh(f.current, e);
        var p = e.nodeType === Jt ? e.parentNode : e;
        return Od(p), Ql(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var m = i;
          i = function() {
            var T = _m(y);
            m.call(T);
          };
        }
        var y = D1(
          e,
          $u,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          q1
        );
        e._reactRootContainer = y, gh(y.current, e);
        var x = e.nodeType === Jt ? e.parentNode : e;
        return Od(x), Ql(function() {
          xp(t, y, a, i);
        }), y;
      }
    }
    function Fb(e, t) {
      e !== null && typeof e != "function" && g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Mm(e, t, a, i, u) {
      X1(a), Fb(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = Hb(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = _m(f);
            p.call(v);
          };
        }
        xp(t, f, e, u);
      }
      return _m(f);
    }
    var K1 = !1;
    function jb(e) {
      {
        K1 || (K1 = !0, g("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = Ab.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || g("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", dt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === dr ? e : Rb(e, "findDOMNode");
    }
    function Vb(e, t, a) {
      if (g("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Bd(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Mm(null, e, t, !0, a);
    }
    function Bb(e, t, a) {
      if (g("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Bd(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Mm(null, e, t, !1, a);
    }
    function Pb(e, t, a, i) {
      if (g("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !wp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !bo(e))
        throw new Error("parentComponent must be a valid React Component");
      return Mm(e, t, a, !1, i);
    }
    var Z1 = !1;
    function $b(e) {
      if (Z1 || (Z1 = !0, g("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !wp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Bd(e) && e._reactRootContainer === void 0;
        t && g("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = c0(e), i = a && !Bu(a);
          i && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Ql(function() {
          Mm(null, null, e, !1, function() {
            e._reactRootContainer = null, W0(e);
          });
        }), !0;
      } else {
        {
          var u = c0(e), s = !!(u && Bu(u)), f = e.nodeType === dr && wp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    bu(xb), sy(wb), Ec(Db), Vv(ua), Bv(Gn), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && g("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), mv(QT), Hs(BS, UD, Ql);
    function Yb(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Lm(t))
        throw new Error("Target container is not a DOM element.");
      return Tb(e, t, null, a);
    }
    function Qb(e, t, a, i) {
      return Pb(e, t, a, i);
    }
    var f0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Bu, $c, Sh, As, xo, BS]
    };
    function Ib(e, t) {
      return f0.usingClientEntryPoint || g('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Nb(e, t);
    }
    function Wb(e, t, a) {
      return f0.usingClientEntryPoint || g('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), Ub(e, t, a);
    }
    function Gb(e) {
      return i1() && g("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Ql(e);
    }
    var Xb = Mb({
      findFiberByHostInstance: es,
      bundleType: 1,
      version: a0,
      rendererPackageName: "react-dom"
    });
    if (!Xb && pn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var J1 = window.location.protocol;
      /^(https?|file):$/.test(J1) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (J1 === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ga.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = f0, ga.createPortal = Yb, ga.createRoot = Ib, ga.findDOMNode = jb, ga.flushSync = Gb, ga.hydrate = Vb, ga.hydrateRoot = Wb, ga.render = Bb, ga.unmountComponentAtNode = $b, ga.unstable_batchedUpdates = BS, ga.unstable_renderSubtreeIntoContainer = Qb, ga.version = a0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ga;
}
function sT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(sT);
    } catch (A) {
      console.error(A);
    }
  }
}
process.env.NODE_ENV === "production" ? (sT(), m0.exports = ek()) : m0.exports = tk();
var nk = m0.exports, y0, zm = nk;
if (process.env.NODE_ENV === "production")
  y0 = zm.createRoot, zm.hydrateRoot;
else {
  var iT = zm.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  y0 = function(A, J) {
    iT.usingClientEntryPoint = !0;
    try {
      return zm.createRoot(A, J);
    } finally {
      iT.usingClientEntryPoint = !1;
    }
  };
}
var rk = Object.defineProperty, ak = (A, J, M) => J in A ? rk(A, J, { enumerable: !0, configurable: !0, writable: !0, value: M }) : A[J] = M, Um = (A, J, M) => (ak(A, typeof J != "symbol" ? J + "" : J, M), M);
const ik = {
  stringify: (A) => A,
  parse: (A) => A
}, lk = {
  stringify: (A) => `${A}`,
  parse: (A) => parseFloat(A)
}, uk = {
  stringify: (A) => A ? "true" : "false",
  parse: (A) => /^[ty1-9]/i.test(A)
}, ok = {
  stringify: (A) => A.name,
  parse: (A, J, M) => {
    const et = (() => {
      if (typeof window < "u" && A in window)
        return window[A];
      if (typeof global < "u" && A in global)
        return global[A];
    })();
    return typeof et == "function" ? et.bind(M) : void 0;
  }
}, sk = {
  stringify: (A) => JSON.stringify(A),
  parse: (A) => JSON.parse(A)
}, v0 = {
  string: ik,
  number: lk,
  boolean: uk,
  function: ok,
  json: sk
};
function ck(A) {
  return A.replace(
    /([a-z0-9])([A-Z])/g,
    (J, M, et) => `${M}-${et.toLowerCase()}`
  );
}
const Am = Symbol.for("r2wc.render"), Hm = Symbol.for("r2wc.connected"), ms = Symbol.for("r2wc.context"), ro = Symbol.for("r2wc.props");
function fk(A, J, M) {
  var et, Lt, Ge;
  J.props || (J.props = A.propTypes ? Object.keys(A.propTypes) : []);
  const g = Array.isArray(J.props) ? J.props.slice() : Object.keys(J.props), pt = {}, ce = {}, le = {};
  for (const Y of g) {
    pt[Y] = Array.isArray(J.props) ? "string" : J.props[Y];
    const K = ck(Y);
    ce[Y] = K, le[K] = Y;
  }
  class Ke extends HTMLElement {
    constructor() {
      super(), Um(this, et, !0), Um(this, Lt), Um(this, Ge, {}), Um(this, "container"), J.shadow ? this.container = this.attachShadow({
        mode: J.shadow
      }) : this.container = this, this[ro].container = this.container;
      for (const K of g) {
        const ne = ce[K], we = this.getAttribute(ne), Ue = pt[K], Pe = Ue ? v0[Ue] : null;
        Pe != null && Pe.parse && we && (this[ro][K] = Pe.parse(we, ne, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(le);
    }
    connectedCallback() {
      this[Hm] = !0, this[Am]();
    }
    disconnectedCallback() {
      this[Hm] = !1, this[ms] && M.unmount(this[ms]), delete this[ms];
    }
    attributeChangedCallback(K, ne, we) {
      const Ue = le[K], Pe = pt[Ue], Vt = Pe ? v0[Pe] : null;
      Ue in pt && Vt != null && Vt.parse && we && (this[ro][Ue] = Vt.parse(we, K, this), this[Am]());
    }
    [(et = Hm, Lt = ms, Ge = ro, Am)]() {
      this[Hm] && (this[ms] ? M.update(this[ms], this[ro]) : this[ms] = M.mount(
        this.container,
        A,
        this[ro]
      ));
    }
  }
  for (const Y of g) {
    const K = ce[Y], ne = pt[Y];
    Object.defineProperty(Ke.prototype, Y, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[ro][Y];
      },
      set(we) {
        this[ro][Y] = we;
        const Ue = ne ? v0[ne] : null;
        if (Ue != null && Ue.stringify) {
          const Pe = Ue.stringify(we, K, this);
          this.getAttribute(K) !== Pe && this.setAttribute(K, Pe);
        } else
          this[Am]();
      }
    });
  }
  return Ke;
}
function dk(A, J, M) {
  const et = y0(A), Lt = hf.createElement(J, M);
  return et.render(Lt), {
    root: et,
    ReactComponent: J
  };
}
function pk({ root: A, ReactComponent: J }, M) {
  const et = hf.createElement(J, M);
  A.render(et);
}
function vk({ root: A }) {
  A.unmount();
}
function hk(A, J = {}) {
  return fk(A, J, { mount: dk, update: pk, unmount: vk });
}
var g0 = { exports: {} }, bp = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var lT;
function mk() {
  if (lT) return bp;
  lT = 1;
  var A = hf, J = Symbol.for("react.element"), M = Symbol.for("react.fragment"), et = Object.prototype.hasOwnProperty, Lt = A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, Ge = { key: !0, ref: !0, __self: !0, __source: !0 };
  function g(pt, ce, le) {
    var Ke, Y = {}, K = null, ne = null;
    le !== void 0 && (K = "" + le), ce.key !== void 0 && (K = "" + ce.key), ce.ref !== void 0 && (ne = ce.ref);
    for (Ke in ce) et.call(ce, Ke) && !Ge.hasOwnProperty(Ke) && (Y[Ke] = ce[Ke]);
    if (pt && pt.defaultProps) for (Ke in ce = pt.defaultProps, ce) Y[Ke] === void 0 && (Y[Ke] = ce[Ke]);
    return { $$typeof: J, type: pt, key: K, ref: ne, props: Y, _owner: Lt.current };
  }
  return bp.Fragment = M, bp.jsx = g, bp.jsxs = g, bp;
}
var kp = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var uT;
function yk() {
  return uT || (uT = 1, process.env.NODE_ENV !== "production" && function() {
    var A = hf, J = Symbol.for("react.element"), M = Symbol.for("react.portal"), et = Symbol.for("react.fragment"), Lt = Symbol.for("react.strict_mode"), Ge = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), pt = Symbol.for("react.context"), ce = Symbol.for("react.forward_ref"), le = Symbol.for("react.suspense"), Ke = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), K = Symbol.for("react.lazy"), ne = Symbol.for("react.offscreen"), we = Symbol.iterator, Ue = "@@iterator";
    function Pe(E) {
      if (E === null || typeof E != "object")
        return null;
      var V = we && E[we] || E[Ue];
      return typeof V == "function" ? V : null;
    }
    var Vt = A.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Je(E) {
      {
        for (var V = arguments.length, I = new Array(V > 1 ? V - 1 : 0), me = 1; me < V; me++)
          I[me - 1] = arguments[me];
        Be("error", E, I);
      }
    }
    function Be(E, V, I) {
      {
        var me = Vt.ReactDebugCurrentFrame, We = me.getStackAddendum();
        We !== "" && (V += "%s", I = I.concat([We]));
        var Ze = I.map(function(xe) {
          return String(xe);
        });
        Ze.unshift("Warning: " + V), Function.prototype.apply.call(console[E], console, Ze);
      }
    }
    var gt = !1, $e = !1, xt = !1, Ae = !1, Rn = !1, jn;
    jn = Symbol.for("react.module.reference");
    function Bt(E) {
      return !!(typeof E == "string" || typeof E == "function" || E === et || E === Ge || Rn || E === Lt || E === le || E === Ke || Ae || E === ne || gt || $e || xt || typeof E == "object" && E !== null && (E.$$typeof === K || E.$$typeof === Y || E.$$typeof === g || E.$$typeof === pt || E.$$typeof === ce || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      E.$$typeof === jn || E.getModuleId !== void 0));
    }
    function vt(E, V, I) {
      var me = E.displayName;
      if (me)
        return me;
      var We = V.displayName || V.name || "";
      return We !== "" ? I + "(" + We + ")" : I;
    }
    function xn(E) {
      return E.displayName || "Context";
    }
    function _e(E) {
      if (E == null)
        return null;
      if (typeof E.tag == "number" && Je("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
        return E.displayName || E.name || null;
      if (typeof E == "string")
        return E;
      switch (E) {
        case et:
          return "Fragment";
        case M:
          return "Portal";
        case Ge:
          return "Profiler";
        case Lt:
          return "StrictMode";
        case le:
          return "Suspense";
        case Ke:
          return "SuspenseList";
      }
      if (typeof E == "object")
        switch (E.$$typeof) {
          case pt:
            var V = E;
            return xn(V) + ".Consumer";
          case g:
            var I = E;
            return xn(I._context) + ".Provider";
          case ce:
            return vt(E, E.render, "ForwardRef");
          case Y:
            var me = E.displayName || null;
            return me !== null ? me : _e(E.type) || "Memo";
          case K: {
            var We = E, Ze = We._payload, xe = We._init;
            try {
              return _e(xe(Ze));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ie = Object.assign, dn = 0, wt, qn, Q, Ce, re, tt, it;
    function wn() {
    }
    wn.__reactDisabledLog = !0;
    function Kn() {
      {
        if (dn === 0) {
          wt = console.log, qn = console.info, Q = console.warn, Ce = console.error, re = console.group, tt = console.groupCollapsed, it = console.groupEnd;
          var E = {
            configurable: !0,
            enumerable: !0,
            value: wn,
            writable: !0
          };
          Object.defineProperties(console, {
            info: E,
            log: E,
            warn: E,
            error: E,
            group: E,
            groupCollapsed: E,
            groupEnd: E
          });
        }
        dn++;
      }
    }
    function za() {
      {
        if (dn--, dn === 0) {
          var E = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ie({}, E, {
              value: wt
            }),
            info: Ie({}, E, {
              value: qn
            }),
            warn: Ie({}, E, {
              value: Q
            }),
            error: Ie({}, E, {
              value: Ce
            }),
            group: Ie({}, E, {
              value: re
            }),
            groupCollapsed: Ie({}, E, {
              value: tt
            }),
            groupEnd: Ie({}, E, {
              value: it
            })
          });
        }
        dn < 0 && Je("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var rn = Vt.ReactCurrentDispatcher, Ir;
    function Vn(E, V, I) {
      {
        if (Ir === void 0)
          try {
            throw Error();
          } catch (We) {
            var me = We.stack.trim().match(/\n( *(at )?)/);
            Ir = me && me[1] || "";
          }
        return `
` + Ir + E;
      }
    }
    var or = !1, Ua;
    {
      var sr = typeof WeakMap == "function" ? WeakMap : Map;
      Ua = new sr();
    }
    function Wr(E, V) {
      if (!E || or)
        return "";
      {
        var I = Ua.get(E);
        if (I !== void 0)
          return I;
      }
      var me;
      or = !0;
      var We = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ze;
      Ze = rn.current, rn.current = null, Kn();
      try {
        if (V) {
          var xe = function() {
            throw Error();
          };
          if (Object.defineProperty(xe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(xe, []);
            } catch ($n) {
              me = $n;
            }
            Reflect.construct(E, [], xe);
          } else {
            try {
              xe.call();
            } catch ($n) {
              me = $n;
            }
            E.call(xe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($n) {
            me = $n;
          }
          E();
        }
      } catch ($n) {
        if ($n && me && typeof $n.stack == "string") {
          for (var Fe = $n.stack.split(`
`), hn = me.stack.split(`
`), Dt = Fe.length - 1, At = hn.length - 1; Dt >= 1 && At >= 0 && Fe[Dt] !== hn[At]; )
            At--;
          for (; Dt >= 1 && At >= 0; Dt--, At--)
            if (Fe[Dt] !== hn[At]) {
              if (Dt !== 1 || At !== 1)
                do
                  if (Dt--, At--, At < 0 || Fe[Dt] !== hn[At]) {
                    var fr = `
` + Fe[Dt].replace(" at new ", " at ");
                    return E.displayName && fr.includes("<anonymous>") && (fr = fr.replace("<anonymous>", E.displayName)), typeof E == "function" && Ua.set(E, fr), fr;
                  }
                while (Dt >= 1 && At >= 0);
              break;
            }
        }
      } finally {
        or = !1, rn.current = Ze, za(), Error.prepareStackTrace = We;
      }
      var Oi = E ? E.displayName || E.name : "", ut = Oi ? Vn(Oi) : "";
      return typeof E == "function" && Ua.set(E, ut), ut;
    }
    function pn(E, V, I) {
      return Wr(E, !1);
    }
    function Bn(E) {
      var V = E.prototype;
      return !!(V && V.isReactComponent);
    }
    function Dn(E, V, I) {
      if (E == null)
        return "";
      if (typeof E == "function")
        return Wr(E, Bn(E));
      if (typeof E == "string")
        return Vn(E);
      switch (E) {
        case le:
          return Vn("Suspense");
        case Ke:
          return Vn("SuspenseList");
      }
      if (typeof E == "object")
        switch (E.$$typeof) {
          case ce:
            return pn(E.render);
          case Y:
            return Dn(E.type, V, I);
          case K: {
            var me = E, We = me._payload, Ze = me._init;
            try {
              return Dn(Ze(We), V, I);
            } catch {
            }
          }
        }
      return "";
    }
    var bn = Object.prototype.hasOwnProperty, Pn = {}, Gr = Vt.ReactDebugCurrentFrame;
    function Sa(E) {
      if (E) {
        var V = E._owner, I = Dn(E.type, E._source, V ? V.type : null);
        Gr.setExtraStackFrame(I);
      } else
        Gr.setExtraStackFrame(null);
    }
    function ei(E, V, I, me, We) {
      {
        var Ze = Function.call.bind(bn);
        for (var xe in E)
          if (Ze(E, xe)) {
            var Fe = void 0;
            try {
              if (typeof E[xe] != "function") {
                var hn = Error((me || "React class") + ": " + I + " type `" + xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[xe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw hn.name = "Invariant Violation", hn;
              }
              Fe = E[xe](V, xe, me, I, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Dt) {
              Fe = Dt;
            }
            Fe && !(Fe instanceof Error) && (Sa(We), Je("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", me || "React class", I, xe, typeof Fe), Sa(null)), Fe instanceof Error && !(Fe.message in Pn) && (Pn[Fe.message] = !0, Sa(We), Je("Failed %s type: %s", I, Fe.message), Sa(null));
          }
      }
    }
    var Aa = Array.isArray;
    function Ea(E) {
      return Aa(E);
    }
    function kr(E) {
      {
        var V = typeof Symbol == "function" && Symbol.toStringTag, I = V && E[Symbol.toStringTag] || E.constructor.name || "Object";
        return I;
      }
    }
    function Ha(E) {
      try {
        return _r(E), !1;
      } catch {
        return !0;
      }
    }
    function _r(E) {
      return "" + E;
    }
    function Ca(E) {
      if (Ha(E))
        return Je("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kr(E)), _r(E);
    }
    var Kt = Vt.ReactCurrentOwner, Or = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ki, Ta, X;
    X = {};
    function ge(E) {
      if (bn.call(E, "ref")) {
        var V = Object.getOwnPropertyDescriptor(E, "ref").get;
        if (V && V.isReactWarning)
          return !1;
      }
      return E.ref !== void 0;
    }
    function He(E) {
      if (bn.call(E, "key")) {
        var V = Object.getOwnPropertyDescriptor(E, "key").get;
        if (V && V.isReactWarning)
          return !1;
      }
      return E.key !== void 0;
    }
    function ct(E, V) {
      if (typeof E.ref == "string" && Kt.current && V && Kt.current.stateNode !== V) {
        var I = _e(Kt.current.type);
        X[I] || (Je('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', _e(Kt.current.type), E.ref), X[I] = !0);
      }
    }
    function Ut(E, V) {
      {
        var I = function() {
          ki || (ki = !0, Je("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", V));
        };
        I.isReactWarning = !0, Object.defineProperty(E, "key", {
          get: I,
          configurable: !0
        });
      }
    }
    function vn(E, V) {
      {
        var I = function() {
          Ta || (Ta = !0, Je("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", V));
        };
        I.isReactWarning = !0, Object.defineProperty(E, "ref", {
          get: I,
          configurable: !0
        });
      }
    }
    var It = function(E, V, I, me, We, Ze, xe) {
      var Fe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: J,
        // Built-in properties that belong on the element
        type: E,
        key: V,
        ref: I,
        props: xe,
        // Record the component responsible for creating this element.
        _owner: Ze
      };
      return Fe._store = {}, Object.defineProperty(Fe._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Fe, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: me
      }), Object.defineProperty(Fe, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: We
      }), Object.freeze && (Object.freeze(Fe.props), Object.freeze(Fe)), Fe;
    };
    function cr(E, V, I, me, We) {
      {
        var Ze, xe = {}, Fe = null, hn = null;
        I !== void 0 && (Ca(I), Fe = "" + I), He(V) && (Ca(V.key), Fe = "" + V.key), ge(V) && (hn = V.ref, ct(V, We));
        for (Ze in V)
          bn.call(V, Ze) && !Or.hasOwnProperty(Ze) && (xe[Ze] = V[Ze]);
        if (E && E.defaultProps) {
          var Dt = E.defaultProps;
          for (Ze in Dt)
            xe[Ze] === void 0 && (xe[Ze] = Dt[Ze]);
        }
        if (Fe || hn) {
          var At = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
          Fe && Ut(xe, At), hn && vn(xe, At);
        }
        return It(E, Fe, hn, We, me, Kt.current, xe);
      }
    }
    var Ct = Vt.ReactCurrentOwner, Lr = Vt.ReactDebugCurrentFrame;
    function St(E) {
      if (E) {
        var V = E._owner, I = Dn(E.type, E._source, V ? V.type : null);
        Lr.setExtraStackFrame(I);
      } else
        Lr.setExtraStackFrame(null);
    }
    var Tt;
    Tt = !1;
    function Gl(E) {
      return typeof E == "object" && E !== null && E.$$typeof === J;
    }
    function il() {
      {
        if (Ct.current) {
          var E = _e(Ct.current.type);
          if (E)
            return `

Check the render method of \`` + E + "`.";
        }
        return "";
      }
    }
    function Xl(E) {
      return "";
    }
    var ao = {};
    function ys(E) {
      {
        var V = il();
        if (!V) {
          var I = typeof E == "string" ? E : E.displayName || E.name;
          I && (V = `

Check the top-level render call using <` + I + ">.");
        }
        return V;
      }
    }
    function ll(E, V) {
      {
        if (!E._store || E._store.validated || E.key != null)
          return;
        E._store.validated = !0;
        var I = ys(V);
        if (ao[I])
          return;
        ao[I] = !0;
        var me = "";
        E && E._owner && E._owner !== Ct.current && (me = " It was passed a child from " + _e(E._owner.type) + "."), St(E), Je('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', I, me), St(null);
      }
    }
    function ql(E, V) {
      {
        if (typeof E != "object")
          return;
        if (Ea(E))
          for (var I = 0; I < E.length; I++) {
            var me = E[I];
            Gl(me) && ll(me, V);
          }
        else if (Gl(E))
          E._store && (E._store.validated = !0);
        else if (E) {
          var We = Pe(E);
          if (typeof We == "function" && We !== E.entries)
            for (var Ze = We.call(E), xe; !(xe = Ze.next()).done; )
              Gl(xe.value) && ll(xe.value, V);
        }
      }
    }
    function ul(E) {
      {
        var V = E.type;
        if (V == null || typeof V == "string")
          return;
        var I;
        if (typeof V == "function")
          I = V.propTypes;
        else if (typeof V == "object" && (V.$$typeof === ce || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        V.$$typeof === Y))
          I = V.propTypes;
        else
          return;
        if (I) {
          var me = _e(V);
          ei(I, E.props, "prop", me, E);
        } else if (V.PropTypes !== void 0 && !Tt) {
          Tt = !0;
          var We = _e(V);
          Je("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
        }
        typeof V.getDefaultProps == "function" && !V.getDefaultProps.isReactClassApproved && Je("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Kl(E) {
      {
        for (var V = Object.keys(E.props), I = 0; I < V.length; I++) {
          var me = V[I];
          if (me !== "children" && me !== "key") {
            St(E), Je("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", me), St(null);
            break;
          }
        }
        E.ref !== null && (St(E), Je("Invalid attribute `ref` supplied to `React.Fragment`."), St(null));
      }
    }
    var Fa = {};
    function ti(E, V, I, me, We, Ze) {
      {
        var xe = Bt(E);
        if (!xe) {
          var Fe = "";
          (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (Fe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var hn = Xl();
          hn ? Fe += hn : Fe += il();
          var Dt;
          E === null ? Dt = "null" : Ea(E) ? Dt = "array" : E !== void 0 && E.$$typeof === J ? (Dt = "<" + (_e(E.type) || "Unknown") + " />", Fe = " Did you accidentally export a JSX literal instead of a component?") : Dt = typeof E, Je("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Dt, Fe);
        }
        var At = cr(E, V, I, We, Ze);
        if (At == null)
          return At;
        if (xe) {
          var fr = V.children;
          if (fr !== void 0)
            if (me)
              if (Ea(fr)) {
                for (var Oi = 0; Oi < fr.length; Oi++)
                  ql(fr[Oi], E);
                Object.freeze && Object.freeze(fr);
              } else
                Je("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ql(fr, E);
        }
        if (bn.call(V, "key")) {
          var ut = _e(E), $n = Object.keys(V).filter(function(ja) {
            return ja !== "key";
          }), Nr = $n.length > 0 ? "{key: someKey, " + $n.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Fa[ut + Nr]) {
            var je = $n.length > 0 ? "{" + $n.join(": ..., ") + ": ...}" : "{}";
            Je(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Nr, ut, je, ut), Fa[ut + Nr] = !0;
          }
        }
        return E === et ? Kl(At) : ul(At), At;
      }
    }
    function Mr(E, V, I) {
      return ti(E, V, I, !0);
    }
    function Ra(E, V, I) {
      return ti(E, V, I, !1);
    }
    var _i = Ra, ol = Mr;
    kp.Fragment = et, kp.jsx = _i, kp.jsxs = ol;
  }()), kp;
}
process.env.NODE_ENV === "production" ? g0.exports = mk() : g0.exports = yk();
var _p = g0.exports;
const gk = "_wrapper_5bkbt_1", Sk = "_logo_5bkbt_19", Ek = "_title_5bkbt_33", h0 = {
  wrapper: gk,
  logo: Sk,
  title: Ek
}, Ck = ({ text: A, image: J }) => /* @__PURE__ */ _p.jsx("header", { children: /* @__PURE__ */ _p.jsxs("div", { className: h0.wrapper, children: [
  /* @__PURE__ */ _p.jsx("div", { children: /* @__PURE__ */ _p.jsx("img", { width: 150, height: 150, className: h0.logo, src: J }) }),
  /* @__PURE__ */ _p.jsx("h1", { className: h0.title, children: A })
] }) });
customElements.define(
  "rwc-header",
  hk(Ck, {
    props: { text: "string", image: "string" }
  })
);
export {
  Ck as Header
};
