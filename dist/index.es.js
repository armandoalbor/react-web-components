var t2 = Object.defineProperty;
var n2 = (i, s, f) => s in i ? t2(i, s, { enumerable: !0, configurable: !0, writable: !0, value: f }) : i[s] = f;
var Vv = (i, s, f) => n2(i, typeof s != "symbol" ? s + "" : s, f);
import * as Ct from "react";
import xn, { forwardRef as r2, useContext as a2, Children as i2, isValidElement as wg, cloneElement as Rg, useEffect as o2, useState as l2 } from "react";
function u2(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var Xb = { exports: {} }, Ja = {}, dg = { exports: {} }, Mb = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var dw;
function s2() {
  return dw || (dw = 1, function(i) {
    function s(ge, ze) {
      var I = ge.length;
      ge.push(ze);
      e: for (; 0 < I; ) {
        var de = I - 1 >>> 1, Ne = ge[de];
        if (0 < m(Ne, ze)) ge[de] = ze, ge[I] = Ne, I = de;
        else break e;
      }
    }
    function f(ge) {
      return ge.length === 0 ? null : ge[0];
    }
    function h(ge) {
      if (ge.length === 0) return null;
      var ze = ge[0], I = ge.pop();
      if (I !== ze) {
        ge[0] = I;
        e: for (var de = 0, Ne = ge.length, Xe = Ne >>> 1; de < Xe; ) {
          var Pe = 2 * (de + 1) - 1, ht = ge[Pe], Ie = Pe + 1, ut = ge[Ie];
          if (0 > m(ht, I)) Ie < Ne && 0 > m(ut, ht) ? (ge[de] = ut, ge[Ie] = I, de = Ie) : (ge[de] = ht, ge[Pe] = I, de = Pe);
          else if (Ie < Ne && 0 > m(ut, I)) ge[de] = ut, ge[Ie] = I, de = Ie;
          else break e;
        }
      }
      return ze;
    }
    function m(ge, ze) {
      var I = ge.sortIndex - ze.sortIndex;
      return I !== 0 ? I : ge.id - ze.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var S = performance;
      i.unstable_now = function() {
        return S.now();
      };
    } else {
      var y = Date, x = y.now();
      i.unstable_now = function() {
        return y.now() - x;
      };
    }
    var R = [], k = [], N = 1, O = null, z = 3, B = !1, H = !1, V = !1, F = typeof setTimeout == "function" ? setTimeout : null, fe = typeof clearTimeout == "function" ? clearTimeout : null, oe = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function X(ge) {
      for (var ze = f(k); ze !== null; ) {
        if (ze.callback === null) h(k);
        else if (ze.startTime <= ge) h(k), ze.sortIndex = ze.expirationTime, s(R, ze);
        else break;
        ze = f(k);
      }
    }
    function le(ge) {
      if (V = !1, X(ge), !H) if (f(R) !== null) H = !0, Qe($);
      else {
        var ze = f(k);
        ze !== null && bt(le, ze.startTime - ge);
      }
    }
    function $(ge, ze) {
      H = !1, V && (V = !1, fe(et), et = -1), B = !0;
      var I = z;
      try {
        for (X(ze), O = f(R); O !== null && (!(O.expirationTime > ze) || ge && !ke()); ) {
          var de = O.callback;
          if (typeof de == "function") {
            O.callback = null, z = O.priorityLevel;
            var Ne = de(O.expirationTime <= ze);
            ze = i.unstable_now(), typeof Ne == "function" ? O.callback = Ne : O === f(R) && h(R), X(ze);
          } else h(R);
          O = f(R);
        }
        if (O !== null) var Xe = !0;
        else {
          var Pe = f(k);
          Pe !== null && bt(le, Pe.startTime - ze), Xe = !1;
        }
        return Xe;
      } finally {
        O = null, z = I, B = !1;
      }
    }
    var be = !1, ce = null, et = -1, _ = 5, se = -1;
    function ke() {
      return !(i.unstable_now() - se < _);
    }
    function ve() {
      if (ce !== null) {
        var ge = i.unstable_now();
        se = ge;
        var ze = !0;
        try {
          ze = ce(!0, ge);
        } finally {
          ze ? pe() : (be = !1, ce = null);
        }
      } else be = !1;
    }
    var pe;
    if (typeof oe == "function") pe = function() {
      oe(ve);
    };
    else if (typeof MessageChannel < "u") {
      var Re = new MessageChannel(), lt = Re.port2;
      Re.port1.onmessage = ve, pe = function() {
        lt.postMessage(null);
      };
    } else pe = function() {
      F(ve, 0);
    };
    function Qe(ge) {
      ce = ge, be || (be = !0, pe());
    }
    function bt(ge, ze) {
      et = F(function() {
        ge(i.unstable_now());
      }, ze);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(ge) {
      ge.callback = null;
    }, i.unstable_continueExecution = function() {
      H || B || (H = !0, Qe($));
    }, i.unstable_forceFrameRate = function(ge) {
      0 > ge || 125 < ge ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _ = 0 < ge ? Math.floor(1e3 / ge) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, i.unstable_getFirstCallbackNode = function() {
      return f(R);
    }, i.unstable_next = function(ge) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var ze = 3;
          break;
        default:
          ze = z;
      }
      var I = z;
      z = ze;
      try {
        return ge();
      } finally {
        z = I;
      }
    }, i.unstable_pauseExecution = function() {
    }, i.unstable_requestPaint = function() {
    }, i.unstable_runWithPriority = function(ge, ze) {
      switch (ge) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ge = 3;
      }
      var I = z;
      z = ge;
      try {
        return ze();
      } finally {
        z = I;
      }
    }, i.unstable_scheduleCallback = function(ge, ze, I) {
      var de = i.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? de + I : de) : I = de, ge) {
        case 1:
          var Ne = -1;
          break;
        case 2:
          Ne = 250;
          break;
        case 5:
          Ne = 1073741823;
          break;
        case 4:
          Ne = 1e4;
          break;
        default:
          Ne = 5e3;
      }
      return Ne = I + Ne, ge = { id: N++, callback: ze, priorityLevel: ge, startTime: I, expirationTime: Ne, sortIndex: -1 }, I > de ? (ge.sortIndex = I, s(k, ge), f(R) === null && ge === f(k) && (V ? (fe(et), et = -1) : V = !0, bt(le, I - de))) : (ge.sortIndex = Ne, s(R, ge), H || B || (H = !0, Qe($))), ge;
    }, i.unstable_shouldYield = ke, i.unstable_wrapCallback = function(ge) {
      var ze = z;
      return function() {
        var I = z;
        z = ze;
        try {
          return ge.apply(this, arguments);
        } finally {
          z = I;
        }
      };
    };
  }(Mb)), Mb;
}
var Nb = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pw;
function c2() {
  return pw || (pw = 1, function(i) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = !1, f = !1, h = 5;
      function m(Oe, at) {
        var kt = Oe.length;
        Oe.push(at), x(Oe, at, kt);
      }
      function S(Oe) {
        return Oe.length === 0 ? null : Oe[0];
      }
      function y(Oe) {
        if (Oe.length === 0)
          return null;
        var at = Oe[0], kt = Oe.pop();
        return kt !== at && (Oe[0] = kt, R(Oe, kt, 0)), at;
      }
      function x(Oe, at, kt) {
        for (var Wt = kt; Wt > 0; ) {
          var dn = Wt - 1 >>> 1, lr = Oe[dn];
          if (k(lr, at) > 0)
            Oe[dn] = at, Oe[Wt] = lr, Wt = dn;
          else
            return;
        }
      }
      function R(Oe, at, kt) {
        for (var Wt = kt, dn = Oe.length, lr = dn >>> 1; Wt < lr; ) {
          var $n = (Wt + 1) * 2 - 1, qr = Oe[$n], pn = $n + 1, va = Oe[pn];
          if (k(qr, at) < 0)
            pn < dn && k(va, qr) < 0 ? (Oe[Wt] = va, Oe[pn] = at, Wt = pn) : (Oe[Wt] = qr, Oe[$n] = at, Wt = $n);
          else if (pn < dn && k(va, at) < 0)
            Oe[Wt] = va, Oe[pn] = at, Wt = pn;
          else
            return;
        }
      }
      function k(Oe, at) {
        var kt = Oe.sortIndex - at.sortIndex;
        return kt !== 0 ? kt : Oe.id - at.id;
      }
      var N = 1, O = 2, z = 3, B = 4, H = 5;
      function V(Oe, at) {
      }
      var F = typeof performance == "object" && typeof performance.now == "function";
      if (F) {
        var fe = performance;
        i.unstable_now = function() {
          return fe.now();
        };
      } else {
        var oe = Date, X = oe.now();
        i.unstable_now = function() {
          return oe.now() - X;
        };
      }
      var le = 1073741823, $ = -1, be = 250, ce = 5e3, et = 1e4, _ = le, se = [], ke = [], ve = 1, pe = null, Re = z, lt = !1, Qe = !1, bt = !1, ge = typeof setTimeout == "function" ? setTimeout : null, ze = typeof clearTimeout == "function" ? clearTimeout : null, I = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function de(Oe) {
        for (var at = S(ke); at !== null; ) {
          if (at.callback === null)
            y(ke);
          else if (at.startTime <= Oe)
            y(ke), at.sortIndex = at.expirationTime, m(se, at);
          else
            return;
          at = S(ke);
        }
      }
      function Ne(Oe) {
        if (bt = !1, de(Oe), !Qe)
          if (S(se) !== null)
            Qe = !0, Bt(Xe);
          else {
            var at = S(ke);
            at !== null && Ot(Ne, at.startTime - Oe);
          }
      }
      function Xe(Oe, at) {
        Qe = !1, bt && (bt = !1, jn()), lt = !0;
        var kt = Re;
        try {
          var Wt;
          if (!f) return Pe(Oe, at);
        } finally {
          pe = null, Re = kt, lt = !1;
        }
      }
      function Pe(Oe, at) {
        var kt = at;
        for (de(kt), pe = S(se); pe !== null && !s && !(pe.expirationTime > kt && (!Oe || W())); ) {
          var Wt = pe.callback;
          if (typeof Wt == "function") {
            pe.callback = null, Re = pe.priorityLevel;
            var dn = pe.expirationTime <= kt, lr = Wt(dn);
            kt = i.unstable_now(), typeof lr == "function" ? pe.callback = lr : pe === S(se) && y(se), de(kt);
          } else
            y(se);
          pe = S(se);
        }
        if (pe !== null)
          return !0;
        var $n = S(ke);
        return $n !== null && Ot(Ne, $n.startTime - kt), !1;
      }
      function ht(Oe, at) {
        switch (Oe) {
          case N:
          case O:
          case z:
          case B:
          case H:
            break;
          default:
            Oe = z;
        }
        var kt = Re;
        Re = Oe;
        try {
          return at();
        } finally {
          Re = kt;
        }
      }
      function Ie(Oe) {
        var at;
        switch (Re) {
          case N:
          case O:
          case z:
            at = z;
            break;
          default:
            at = Re;
            break;
        }
        var kt = Re;
        Re = at;
        try {
          return Oe();
        } finally {
          Re = kt;
        }
      }
      function ut(Oe) {
        var at = Re;
        return function() {
          var kt = Re;
          Re = at;
          try {
            return Oe.apply(this, arguments);
          } finally {
            Re = kt;
          }
        };
      }
      function rt(Oe, at, kt) {
        var Wt = i.unstable_now(), dn;
        if (typeof kt == "object" && kt !== null) {
          var lr = kt.delay;
          typeof lr == "number" && lr > 0 ? dn = Wt + lr : dn = Wt;
        } else
          dn = Wt;
        var $n;
        switch (Oe) {
          case N:
            $n = $;
            break;
          case O:
            $n = be;
            break;
          case H:
            $n = _;
            break;
          case B:
            $n = et;
            break;
          case z:
          default:
            $n = ce;
            break;
        }
        var qr = dn + $n, pn = {
          id: ve++,
          callback: at,
          priorityLevel: Oe,
          startTime: dn,
          expirationTime: qr,
          sortIndex: -1
        };
        return dn > Wt ? (pn.sortIndex = dn, m(ke, pn), S(se) === null && pn === S(ke) && (bt ? jn() : bt = !0, Ot(Ne, dn - Wt))) : (pn.sortIndex = qr, m(se, pn), !Qe && !lt && (Qe = !0, Bt(Xe))), pn;
      }
      function dt() {
      }
      function mt() {
        !Qe && !lt && (Qe = !0, Bt(Xe));
      }
      function zt() {
        return S(se);
      }
      function we(Oe) {
        Oe.callback = null;
      }
      function Ut() {
        return Re;
      }
      var Le = !1, Xt = null, mn = -1, Nn = h, A = -1;
      function W() {
        var Oe = i.unstable_now() - A;
        return !(Oe < Nn);
      }
      function ne() {
      }
      function _e(Oe) {
        if (Oe < 0 || Oe > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Oe > 0 ? Nn = Math.floor(1e3 / Oe) : Nn = h;
      }
      var Te = function() {
        if (Xt !== null) {
          var Oe = i.unstable_now();
          A = Oe;
          var at = !0, kt = !0;
          try {
            kt = Xt(at, Oe);
          } finally {
            kt ? te() : (Le = !1, Xt = null);
          }
        } else
          Le = !1;
      }, te;
      if (typeof I == "function")
        te = function() {
          I(Te);
        };
      else if (typeof MessageChannel < "u") {
        var Ve = new MessageChannel(), Et = Ve.port2;
        Ve.port1.onmessage = Te, te = function() {
          Et.postMessage(null);
        };
      } else
        te = function() {
          ge(Te, 0);
        };
      function Bt(Oe) {
        Xt = Oe, Le || (Le = !0, te());
      }
      function Ot(Oe, at) {
        mn = ge(function() {
          Oe(i.unstable_now());
        }, at);
      }
      function jn() {
        ze(mn), mn = -1;
      }
      var Si = ne, Fr = null;
      i.unstable_IdlePriority = H, i.unstable_ImmediatePriority = N, i.unstable_LowPriority = B, i.unstable_NormalPriority = z, i.unstable_Profiling = Fr, i.unstable_UserBlockingPriority = O, i.unstable_cancelCallback = we, i.unstable_continueExecution = mt, i.unstable_forceFrameRate = _e, i.unstable_getCurrentPriorityLevel = Ut, i.unstable_getFirstCallbackNode = zt, i.unstable_next = Ie, i.unstable_pauseExecution = dt, i.unstable_requestPaint = Si, i.unstable_runWithPriority = ht, i.unstable_scheduleCallback = rt, i.unstable_shouldYield = W, i.unstable_wrapCallback = ut, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(Nb)), Nb;
}
var vw;
function vR() {
  return vw || (vw = 1, process.env.NODE_ENV === "production" ? dg.exports = s2() : dg.exports = c2()), dg.exports;
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
var hw;
function f2() {
  if (hw) return Ja;
  hw = 1;
  var i = xn, s = vR();
  function f(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var h = /* @__PURE__ */ new Set(), m = {};
  function S(n, r) {
    y(n, r), y(n + "Capture", r);
  }
  function y(n, r) {
    for (m[n] = r, n = 0; n < r.length; n++) h.add(r[n]);
  }
  var x = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), R = Object.prototype.hasOwnProperty, k = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, N = {}, O = {};
  function z(n) {
    return R.call(O, n) ? !0 : R.call(N, n) ? !1 : k.test(n) ? O[n] = !0 : (N[n] = !0, !1);
  }
  function B(n, r, l, c) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return c ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function H(n, r, l, c) {
    if (r === null || typeof r > "u" || B(n, r, l, c)) return !0;
    if (c) return !1;
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
  function V(n, r, l, c, p, g, E) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = c, this.attributeNamespace = p, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = g, this.removeEmptyString = E;
  }
  var F = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    F[n] = new V(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    F[r] = new V(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    F[n] = new V(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    F[n] = new V(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    F[n] = new V(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    F[n] = new V(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    F[n] = new V(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    F[n] = new V(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    F[n] = new V(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var fe = /[\-:]([a-z])/g;
  function oe(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      fe,
      oe
    );
    F[r] = new V(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(fe, oe);
    F[r] = new V(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(fe, oe);
    F[r] = new V(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    F[n] = new V(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), F.xlinkHref = new V("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    F[n] = new V(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function X(n, r, l, c) {
    var p = F.hasOwnProperty(r) ? F[r] : null;
    (p !== null ? p.type !== 0 : c || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (H(r, l, p, c) && (l = null), c || p === null ? z(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : p.mustUseProperty ? n[p.propertyName] = l === null ? p.type === 3 ? !1 : "" : l : (r = p.attributeName, c = p.attributeNamespace, l === null ? n.removeAttribute(r) : (p = p.type, l = p === 3 || p === 4 && l === !0 ? "" : "" + l, c ? n.setAttributeNS(c, r, l) : n.setAttribute(r, l))));
  }
  var le = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, $ = Symbol.for("react.element"), be = Symbol.for("react.portal"), ce = Symbol.for("react.fragment"), et = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), se = Symbol.for("react.provider"), ke = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Re = Symbol.for("react.suspense_list"), lt = Symbol.for("react.memo"), Qe = Symbol.for("react.lazy"), bt = Symbol.for("react.offscreen"), ge = Symbol.iterator;
  function ze(n) {
    return n === null || typeof n != "object" ? null : (n = ge && n[ge] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var I = Object.assign, de;
  function Ne(n) {
    if (de === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      de = r && r[1] || "";
    }
    return `
` + de + n;
  }
  var Xe = !1;
  function Pe(n, r) {
    if (!n || Xe) return "";
    Xe = !0;
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
        } catch (J) {
          var c = J;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (J) {
          c = J;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (J) {
          c = J;
        }
        n();
      }
    } catch (J) {
      if (J && c && typeof J.stack == "string") {
        for (var p = J.stack.split(`
`), g = c.stack.split(`
`), E = p.length - 1, D = g.length - 1; 1 <= E && 0 <= D && p[E] !== g[D]; ) D--;
        for (; 1 <= E && 0 <= D; E--, D--) if (p[E] !== g[D]) {
          if (E !== 1 || D !== 1)
            do
              if (E--, D--, 0 > D || p[E] !== g[D]) {
                var L = `
` + p[E].replace(" at new ", " at ");
                return n.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", n.displayName)), L;
              }
            while (1 <= E && 0 <= D);
          break;
        }
      }
    } finally {
      Xe = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? Ne(n) : "";
  }
  function ht(n) {
    switch (n.tag) {
      case 5:
        return Ne(n.type);
      case 16:
        return Ne("Lazy");
      case 13:
        return Ne("Suspense");
      case 19:
        return Ne("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Pe(n.type, !1), n;
      case 11:
        return n = Pe(n.type.render, !1), n;
      case 1:
        return n = Pe(n.type, !0), n;
      default:
        return "";
    }
  }
  function Ie(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case ce:
        return "Fragment";
      case be:
        return "Portal";
      case _:
        return "Profiler";
      case et:
        return "StrictMode";
      case pe:
        return "Suspense";
      case Re:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case ke:
        return (n.displayName || "Context") + ".Consumer";
      case se:
        return (n._context.displayName || "Context") + ".Provider";
      case ve:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case lt:
        return r = n.displayName || null, r !== null ? r : Ie(n.type) || "Memo";
      case Qe:
        r = n._payload, n = n._init;
        try {
          return Ie(n(r));
        } catch {
        }
    }
    return null;
  }
  function ut(n) {
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
        return Ie(r);
      case 8:
        return r === et ? "StrictMode" : "Mode";
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
  function rt(n) {
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
  function dt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function mt(n) {
    var r = dt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), c = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var p = l.get, g = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return p.call(this);
      }, set: function(E) {
        c = "" + E, g.call(this, E);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return c;
      }, setValue: function(E) {
        c = "" + E;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function zt(n) {
    n._valueTracker || (n._valueTracker = mt(n));
  }
  function we(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), c = "";
    return n && (c = dt(n) ? n.checked ? "true" : "false" : n.value), n = c, n !== l ? (r.setValue(n), !0) : !1;
  }
  function Ut(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Le(n, r) {
    var l = r.checked;
    return I({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Xt(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, c = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: c, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function mn(n, r) {
    r = r.checked, r != null && X(n, "checked", r, !1);
  }
  function Nn(n, r) {
    mn(n, r);
    var l = rt(r.value), c = r.type;
    if (l != null) c === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (c === "submit" || c === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? W(n, r.type, l) : r.hasOwnProperty("defaultValue") && W(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function A(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var c = r.type;
      if (!(c !== "submit" && c !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function W(n, r, l) {
    (r !== "number" || Ut(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var ne = Array.isArray;
  function _e(n, r, l, c) {
    if (n = n.options, r) {
      r = {};
      for (var p = 0; p < l.length; p++) r["$" + l[p]] = !0;
      for (l = 0; l < n.length; l++) p = r.hasOwnProperty("$" + n[l].value), n[l].selected !== p && (n[l].selected = p), p && c && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, p = 0; p < n.length; p++) {
        if (n[p].value === l) {
          n[p].selected = !0, c && (n[p].defaultSelected = !0);
          return;
        }
        r !== null || n[p].disabled || (r = n[p]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Te(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(f(91));
    return I({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function te(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(f(92));
        if (ne(l)) {
          if (1 < l.length) throw Error(f(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function Ve(n, r) {
    var l = rt(r.value), c = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), c != null && (n.defaultValue = "" + c);
  }
  function Et(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Bt(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Ot(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Bt(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var jn, Si = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, c, p) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, c, p);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (jn = jn || document.createElement("div"), jn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = jn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Fr(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Oe = {
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
  }, at = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Oe).forEach(function(n) {
    at.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Oe[r] = Oe[n];
    });
  });
  function kt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Oe.hasOwnProperty(n) && Oe[n] ? ("" + r).trim() : r + "px";
  }
  function Wt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var c = l.indexOf("--") === 0, p = kt(l, r[l], c);
      l === "float" && (l = "cssFloat"), c ? n.setProperty(l, p) : n[l] = p;
    }
  }
  var dn = I({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function lr(n, r) {
    if (r) {
      if (dn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(f(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(f(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(f(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(f(62));
    }
  }
  function $n(n, r) {
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
  var qr = null;
  function pn(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var va = null, cn = null, vn = null;
  function Il(n) {
    if (n = Rs(n)) {
      if (typeof va != "function") throw Error(f(280));
      var r = n.stateNode;
      r && (r = st(r), va(n.stateNode, n.type, r));
    }
  }
  function Zo(n) {
    cn ? vn ? vn.push(n) : vn = [n] : cn = n;
  }
  function Yl() {
    if (cn) {
      var n = cn, r = vn;
      if (vn = cn = null, Il(n), r) for (n = 0; n < r.length; n++) Il(r[n]);
    }
  }
  function as(n, r) {
    return n(r);
  }
  function Sc() {
  }
  var Jo = !1;
  function Wl(n, r, l) {
    if (Jo) return n(r, l);
    Jo = !0;
    try {
      return as(n, r, l);
    } finally {
      Jo = !1, (cn !== null || vn !== null) && (Sc(), Yl());
    }
  }
  function el(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var c = st(l);
    if (c === null) return null;
    l = c[r];
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
        (c = !c.disabled) || (n = n.type, c = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !c;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(f(231, r, typeof l));
    return l;
  }
  var Gl = !1;
  if (x) try {
    var bi = {};
    Object.defineProperty(bi, "passive", { get: function() {
      Gl = !0;
    } }), window.addEventListener("test", bi, bi), window.removeEventListener("test", bi, bi);
  } catch {
    Gl = !1;
  }
  function ji(n, r, l, c, p, g, E, D, L) {
    var J = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, J);
    } catch (ye) {
      this.onError(ye);
    }
  }
  var ha = !1, ai = null, ho = !1, tl = null, M = { onError: function(n) {
    ha = !0, ai = n;
  } };
  function Se(n, r, l, c, p, g, E, D, L) {
    ha = !1, ai = null, ji.apply(M, arguments);
  }
  function De(n, r, l, c, p, g, E, D, L) {
    if (Se.apply(this, arguments), ha) {
      if (ha) {
        var J = ai;
        ha = !1, ai = null;
      } else throw Error(f(198));
      ho || (ho = !0, tl = J);
    }
  }
  function it(n) {
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
  function Ft(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Vt(n) {
    if (it(n) !== n) throw Error(f(188));
  }
  function vt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = it(n), r === null) throw Error(f(188));
      return r !== n ? null : n;
    }
    for (var l = n, c = r; ; ) {
      var p = l.return;
      if (p === null) break;
      var g = p.alternate;
      if (g === null) {
        if (c = p.return, c !== null) {
          l = c;
          continue;
        }
        break;
      }
      if (p.child === g.child) {
        for (g = p.child; g; ) {
          if (g === l) return Vt(p), n;
          if (g === c) return Vt(p), r;
          g = g.sibling;
        }
        throw Error(f(188));
      }
      if (l.return !== c.return) l = p, c = g;
      else {
        for (var E = !1, D = p.child; D; ) {
          if (D === l) {
            E = !0, l = p, c = g;
            break;
          }
          if (D === c) {
            E = !0, c = p, l = g;
            break;
          }
          D = D.sibling;
        }
        if (!E) {
          for (D = g.child; D; ) {
            if (D === l) {
              E = !0, l = g, c = p;
              break;
            }
            if (D === c) {
              E = !0, c = g, l = p;
              break;
            }
            D = D.sibling;
          }
          if (!E) throw Error(f(189));
        }
      }
      if (l.alternate !== c) throw Error(f(190));
    }
    if (l.tag !== 3) throw Error(f(188));
    return l.stateNode.current === l ? n : r;
  }
  function Dt(n) {
    return n = vt(n), n !== null ? ur(n) : null;
  }
  function ur(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = ur(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var yn = s.unstable_scheduleCallback, kn = s.unstable_cancelCallback, Kr = s.unstable_shouldYield, mo = s.unstable_requestPaint, Qt = s.unstable_now, Dr = s.unstable_getCurrentPriorityLevel, ma = s.unstable_ImmediatePriority, At = s.unstable_UserBlockingPriority, Ci = s.unstable_NormalPriority, sh = s.unstable_LowPriority, Dd = s.unstable_IdlePriority, is = null, ii = null;
  function ch(n) {
    if (ii && typeof ii.onCommitFiberRoot == "function") try {
      ii.onCommitFiberRoot(is, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Aa = Math.clz32 ? Math.clz32 : a0, fh = Math.log, dh = Math.LN2;
  function a0(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (fh(n) / dh | 0) | 0;
  }
  var bc = 64, Ql = 4194304;
  function nl(n) {
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
  function oi(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var c = 0, p = n.suspendedLanes, g = n.pingedLanes, E = l & 268435455;
    if (E !== 0) {
      var D = E & ~p;
      D !== 0 ? c = nl(D) : (g &= E, g !== 0 && (c = nl(g)));
    } else E = l & ~p, E !== 0 ? c = nl(E) : g !== 0 && (c = nl(g));
    if (c === 0) return 0;
    if (r !== 0 && r !== c && !(r & p) && (p = c & -c, g = r & -r, p >= g || p === 16 && (g & 4194240) !== 0)) return r;
    if (c & 4 && (c |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= c; 0 < r; ) l = 31 - Aa(r), p = 1 << l, c |= n[l], r &= ~p;
    return c;
  }
  function Ad(n, r) {
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
  function Cc(n, r) {
    for (var l = n.suspendedLanes, c = n.pingedLanes, p = n.expirationTimes, g = n.pendingLanes; 0 < g; ) {
      var E = 31 - Aa(g), D = 1 << E, L = p[E];
      L === -1 ? (!(D & l) || D & c) && (p[E] = Ad(D, r)) : L <= r && (n.expiredLanes |= D), g &= ~D;
    }
  }
  function Md(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Ec() {
    var n = bc;
    return bc <<= 1, !(bc & 4194240) && (bc = 64), n;
  }
  function Nd(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function rl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Aa(r), n[r] = l;
  }
  function i0(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var c = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var p = 31 - Aa(l), g = 1 << p;
      r[p] = 0, c[p] = -1, n[p] = -1, l &= ~g;
    }
  }
  function os(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var c = 31 - Aa(l), p = 1 << c;
      p & r | n[c] & r && (n[c] |= r), l &= ~p;
    }
  }
  var Zt = 0;
  function Ld(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var ph, Tc, Jt, vh, zd, wt = !1, ls = [], Yn = null, Ma = null, Na = null, us = /* @__PURE__ */ new Map(), Zn = /* @__PURE__ */ new Map(), nn = [], o0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function li(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Yn = null;
        break;
      case "dragenter":
      case "dragleave":
        Ma = null;
        break;
      case "mouseover":
      case "mouseout":
        Na = null;
        break;
      case "pointerover":
      case "pointerout":
        us.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Zn.delete(r.pointerId);
    }
  }
  function Ar(n, r, l, c, p, g) {
    return n === null || n.nativeEvent !== g ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: c, nativeEvent: g, targetContainers: [p] }, r !== null && (r = Rs(r), r !== null && Tc(r)), n) : (n.eventSystemFlags |= c, r = n.targetContainers, p !== null && r.indexOf(p) === -1 && r.push(p), n);
  }
  function yo(n, r, l, c, p) {
    switch (r) {
      case "focusin":
        return Yn = Ar(Yn, n, r, l, c, p), !0;
      case "dragenter":
        return Ma = Ar(Ma, n, r, l, c, p), !0;
      case "mouseover":
        return Na = Ar(Na, n, r, l, c, p), !0;
      case "pointerover":
        var g = p.pointerId;
        return us.set(g, Ar(us.get(g) || null, n, r, l, c, p)), !0;
      case "gotpointercapture":
        return g = p.pointerId, Zn.set(g, Ar(Zn.get(g) || null, n, r, l, c, p)), !0;
    }
    return !1;
  }
  function hh(n) {
    var r = za(n.target);
    if (r !== null) {
      var l = it(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Ft(l), r !== null) {
            n.blockedOn = r, zd(n.priority, function() {
              Jt(l);
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
  function ql(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Rc(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var c = new l.constructor(l.type, l);
        qr = c, l.target.dispatchEvent(c), qr = null;
      } else return r = Rs(l), r !== null && Tc(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function Ud(n, r, l) {
    ql(n) && l.delete(r);
  }
  function mh() {
    wt = !1, Yn !== null && ql(Yn) && (Yn = null), Ma !== null && ql(Ma) && (Ma = null), Na !== null && ql(Na) && (Na = null), us.forEach(Ud), Zn.forEach(Ud);
  }
  function ss(n, r) {
    n.blockedOn === r && (n.blockedOn = null, wt || (wt = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, mh)));
  }
  function cs(n) {
    function r(p) {
      return ss(p, n);
    }
    if (0 < ls.length) {
      ss(ls[0], n);
      for (var l = 1; l < ls.length; l++) {
        var c = ls[l];
        c.blockedOn === n && (c.blockedOn = null);
      }
    }
    for (Yn !== null && ss(Yn, n), Ma !== null && ss(Ma, n), Na !== null && ss(Na, n), us.forEach(r), Zn.forEach(r), l = 0; l < nn.length; l++) c = nn[l], c.blockedOn === n && (c.blockedOn = null);
    for (; 0 < nn.length && (l = nn[0], l.blockedOn === null); ) hh(l), l.blockedOn === null && nn.shift();
  }
  var Kl = le.ReactCurrentBatchConfig, al = !0;
  function yh(n, r, l, c) {
    var p = Zt, g = Kl.transition;
    Kl.transition = null;
    try {
      Zt = 1, wc(n, r, l, c);
    } finally {
      Zt = p, Kl.transition = g;
    }
  }
  function xc(n, r, l, c) {
    var p = Zt, g = Kl.transition;
    Kl.transition = null;
    try {
      Zt = 4, wc(n, r, l, c);
    } finally {
      Zt = p, Kl.transition = g;
    }
  }
  function wc(n, r, l, c) {
    if (al) {
      var p = Rc(n, r, l, c);
      if (p === null) Pc(n, r, c, fs, l), li(n, c);
      else if (yo(p, n, r, l, c)) c.stopPropagation();
      else if (li(n, c), r & 4 && -1 < o0.indexOf(n)) {
        for (; p !== null; ) {
          var g = Rs(p);
          if (g !== null && ph(g), g = Rc(n, r, l, c), g === null && Pc(n, r, c, fs, l), g === p) break;
          p = g;
        }
        p !== null && c.stopPropagation();
      } else Pc(n, r, c, null, l);
    }
  }
  var fs = null;
  function Rc(n, r, l, c) {
    if (fs = null, n = pn(c), n = za(n), n !== null) if (r = it(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Ft(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return fs = n, null;
  }
  function Fd(n) {
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
        switch (Dr()) {
          case ma:
            return 1;
          case At:
            return 4;
          case Ci:
          case sh:
            return 16;
          case Dd:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var $i = null, ds = null, ps = null;
  function Pd() {
    if (ps) return ps;
    var n, r = ds, l = r.length, c, p = "value" in $i ? $i.value : $i.textContent, g = p.length;
    for (n = 0; n < l && r[n] === p[n]; n++) ;
    var E = l - n;
    for (c = 1; c <= E && r[l - c] === p[g - c]; c++) ;
    return ps = p.slice(n, 1 < c ? 1 - c : void 0);
  }
  function Xl(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function vs() {
    return !0;
  }
  function gh() {
    return !1;
  }
  function ya(n) {
    function r(l, c, p, g, E) {
      this._reactName = l, this._targetInst = p, this.type = c, this.nativeEvent = g, this.target = E, this.currentTarget = null;
      for (var D in n) n.hasOwnProperty(D) && (l = n[D], this[D] = l ? l(g) : g[D]);
      return this.isDefaultPrevented = (g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1) ? vs : gh, this.isPropagationStopped = gh, this;
    }
    return I(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = vs);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = vs);
    }, persist: function() {
    }, isPersistent: vs }), r;
  }
  var go = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, _c = ya(go), Zl = I({}, go, { view: 0, detail: 0 }), Sh = ya(Zl), kc, jd, hs, sr = I({}, Zl, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Hd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== hs && (hs && n.type === "mousemove" ? (kc = n.screenX - hs.screenX, jd = n.screenY - hs.screenY) : jd = kc = 0, hs = n), kc);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : jd;
  } }), Oc = ya(sr), bh = I({}, sr, { dataTransfer: 0 }), Ch = ya(bh), l0 = I({}, Zl, { relatedTarget: 0 }), So = ya(l0), $d = I({}, go, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Eh = ya($d), u0 = I({}, go, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), s0 = ya(u0), c0 = I({}, go, { data: 0 }), Vd = ya(c0), Bd = {
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
  }, Th = {
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
  }, xh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function wh(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = xh[n]) ? !!r[n] : !1;
  }
  function Hd() {
    return wh;
  }
  var Vi = I({}, Zl, { key: function(n) {
    if (n.key) {
      var r = Bd[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = Xl(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Th[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Hd, charCode: function(n) {
    return n.type === "keypress" ? Xl(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Xl(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), f0 = ya(Vi), Id = I({}, sr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Dc = ya(Id), Yd = I({}, Zl, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Hd }), d0 = ya(Yd), Ac = I({}, go, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Rh = ya(Ac), Xr = I({}, sr, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Bi = ya(Xr), Wn = [9, 13, 27, 32], ui = x && "CompositionEvent" in window, il = null;
  x && "documentMode" in document && (il = document.documentMode);
  var Mc = x && "TextEvent" in window && !il, _h = x && (!ui || il && 8 < il && 11 >= il), Jl = " ", kh = !1;
  function Oh(n, r) {
    switch (n) {
      case "keyup":
        return Wn.indexOf(r.keyCode) !== -1;
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
  function Nc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var eu = !1;
  function p0(n, r) {
    switch (n) {
      case "compositionend":
        return Nc(r);
      case "keypress":
        return r.which !== 32 ? null : (kh = !0, Jl);
      case "textInput":
        return n = r.data, n === Jl && kh ? null : n;
      default:
        return null;
    }
  }
  function v0(n, r) {
    if (eu) return n === "compositionend" || !ui && Oh(n, r) ? (n = Pd(), ps = ds = $i = null, eu = !1, n) : null;
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
        return _h && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Dh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Ah(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Dh[n.type] : r === "textarea";
  }
  function Mh(n, r, l, c) {
    Zo(c), r = Ts(r, "onChange"), 0 < r.length && (l = new _c("onChange", "change", null, l, c), n.push({ event: l, listeners: r }));
  }
  var ms = null, tu = null;
  function nu(n) {
    Fc(n, 0);
  }
  function ru(n) {
    var r = iu(n);
    if (we(r)) return n;
  }
  function Nh(n, r) {
    if (n === "change") return r;
  }
  var Wd = !1;
  if (x) {
    var Gd;
    if (x) {
      var Qd = "oninput" in document;
      if (!Qd) {
        var Lh = document.createElement("div");
        Lh.setAttribute("oninput", "return;"), Qd = typeof Lh.oninput == "function";
      }
      Gd = Qd;
    } else Gd = !1;
    Wd = Gd && (!document.documentMode || 9 < document.documentMode);
  }
  function zh() {
    ms && (ms.detachEvent("onpropertychange", Uh), tu = ms = null);
  }
  function Uh(n) {
    if (n.propertyName === "value" && ru(tu)) {
      var r = [];
      Mh(r, tu, n, pn(n)), Wl(nu, r);
    }
  }
  function h0(n, r, l) {
    n === "focusin" ? (zh(), ms = r, tu = l, ms.attachEvent("onpropertychange", Uh)) : n === "focusout" && zh();
  }
  function m0(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return ru(tu);
  }
  function y0(n, r) {
    if (n === "click") return ru(r);
  }
  function Fh(n, r) {
    if (n === "input" || n === "change") return ru(r);
  }
  function g0(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var La = typeof Object.is == "function" ? Object.is : g0;
  function ys(n, r) {
    if (La(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), c = Object.keys(r);
    if (l.length !== c.length) return !1;
    for (c = 0; c < l.length; c++) {
      var p = l[c];
      if (!R.call(r, p) || !La(n[p], r[p])) return !1;
    }
    return !0;
  }
  function Ph(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function jh(n, r) {
    var l = Ph(n);
    n = 0;
    for (var c; l; ) {
      if (l.nodeType === 3) {
        if (c = n + l.textContent.length, n <= r && c >= r) return { node: l, offset: r - n };
        n = c;
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
      l = Ph(l);
    }
  }
  function $h(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? $h(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Lc() {
    for (var n = window, r = Ut(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = Ut(n.document);
    }
    return r;
  }
  function Hi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function zc(n) {
    var r = Lc(), l = n.focusedElem, c = n.selectionRange;
    if (r !== l && l && l.ownerDocument && $h(l.ownerDocument.documentElement, l)) {
      if (c !== null && Hi(l)) {
        if (r = c.start, n = c.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var p = l.textContent.length, g = Math.min(c.start, p);
          c = c.end === void 0 ? g : Math.min(c.end, p), !n.extend && g > c && (p = c, c = g, g = p), p = jh(l, g);
          var E = jh(
            l,
            c
          );
          p && E && (n.rangeCount !== 1 || n.anchorNode !== p.node || n.anchorOffset !== p.offset || n.focusNode !== E.node || n.focusOffset !== E.offset) && (r = r.createRange(), r.setStart(p.node, p.offset), n.removeAllRanges(), g > c ? (n.addRange(r), n.extend(E.node, E.offset)) : (r.setEnd(E.node, E.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Vh = x && "documentMode" in document && 11 >= document.documentMode, si = null, qd = null, gs = null, Kd = !1;
  function Bh(n, r, l) {
    var c = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Kd || si == null || si !== Ut(c) || (c = si, "selectionStart" in c && Hi(c) ? c = { start: c.selectionStart, end: c.selectionEnd } : (c = (c.ownerDocument && c.ownerDocument.defaultView || window).getSelection(), c = { anchorNode: c.anchorNode, anchorOffset: c.anchorOffset, focusNode: c.focusNode, focusOffset: c.focusOffset }), gs && ys(gs, c) || (gs = c, c = Ts(qd, "onSelect"), 0 < c.length && (r = new _c("onSelect", "select", null, r, l), n.push({ event: r, listeners: c }), r.target = si)));
  }
  function Uc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var ol = { animationend: Uc("Animation", "AnimationEnd"), animationiteration: Uc("Animation", "AnimationIteration"), animationstart: Uc("Animation", "AnimationStart"), transitionend: Uc("Transition", "TransitionEnd") }, Xd = {}, Zd = {};
  x && (Zd = document.createElement("div").style, "AnimationEvent" in window || (delete ol.animationend.animation, delete ol.animationiteration.animation, delete ol.animationstart.animation), "TransitionEvent" in window || delete ol.transitionend.transition);
  function cr(n) {
    if (Xd[n]) return Xd[n];
    if (!ol[n]) return n;
    var r = ol[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Zd) return Xd[n] = r[l];
    return n;
  }
  var Jd = cr("animationend"), Hh = cr("animationiteration"), Ih = cr("animationstart"), Yh = cr("transitionend"), Wh = /* @__PURE__ */ new Map(), Gh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Ii(n, r) {
    Wh.set(n, r), S(r, [n]);
  }
  for (var Ss = 0; Ss < Gh.length; Ss++) {
    var ll = Gh[Ss], S0 = ll.toLowerCase(), bs = ll[0].toUpperCase() + ll.slice(1);
    Ii(S0, "on" + bs);
  }
  Ii(Jd, "onAnimationEnd"), Ii(Hh, "onAnimationIteration"), Ii(Ih, "onAnimationStart"), Ii("dblclick", "onDoubleClick"), Ii("focusin", "onFocus"), Ii("focusout", "onBlur"), Ii(Yh, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), S("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), S("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), S("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), S("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), S("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), S("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Cs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), b0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(Cs));
  function Qh(n, r, l) {
    var c = n.type || "unknown-event";
    n.currentTarget = l, De(c, r, void 0, n), n.currentTarget = null;
  }
  function Fc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var c = n[l], p = c.event;
      c = c.listeners;
      e: {
        var g = void 0;
        if (r) for (var E = c.length - 1; 0 <= E; E--) {
          var D = c[E], L = D.instance, J = D.currentTarget;
          if (D = D.listener, L !== g && p.isPropagationStopped()) break e;
          Qh(p, D, J), g = L;
        }
        else for (E = 0; E < c.length; E++) {
          if (D = c[E], L = D.instance, J = D.currentTarget, D = D.listener, L !== g && p.isPropagationStopped()) break e;
          Qh(p, D, J), g = L;
        }
      }
    }
    if (ho) throw n = tl, ho = !1, tl = null, n;
  }
  function fn(n, r) {
    var l = r[op];
    l === void 0 && (l = r[op] = /* @__PURE__ */ new Set());
    var c = n + "__bubble";
    l.has(c) || (qh(r, n, 2, !1), l.add(c));
  }
  function bo(n, r, l) {
    var c = 0;
    r && (c |= 4), qh(l, n, c, r);
  }
  var Yi = "_reactListening" + Math.random().toString(36).slice(2);
  function au(n) {
    if (!n[Yi]) {
      n[Yi] = !0, h.forEach(function(l) {
        l !== "selectionchange" && (b0.has(l) || bo(l, !1, n), bo(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Yi] || (r[Yi] = !0, bo("selectionchange", !1, r));
    }
  }
  function qh(n, r, l, c) {
    switch (Fd(r)) {
      case 1:
        var p = yh;
        break;
      case 4:
        p = xc;
        break;
      default:
        p = wc;
    }
    l = p.bind(null, r, l, n), p = void 0, !Gl || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (p = !0), c ? p !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: p }) : n.addEventListener(r, l, !0) : p !== void 0 ? n.addEventListener(r, l, { passive: p }) : n.addEventListener(r, l, !1);
  }
  function Pc(n, r, l, c, p) {
    var g = c;
    if (!(r & 1) && !(r & 2) && c !== null) e: for (; ; ) {
      if (c === null) return;
      var E = c.tag;
      if (E === 3 || E === 4) {
        var D = c.stateNode.containerInfo;
        if (D === p || D.nodeType === 8 && D.parentNode === p) break;
        if (E === 4) for (E = c.return; E !== null; ) {
          var L = E.tag;
          if ((L === 3 || L === 4) && (L = E.stateNode.containerInfo, L === p || L.nodeType === 8 && L.parentNode === p)) return;
          E = E.return;
        }
        for (; D !== null; ) {
          if (E = za(D), E === null) return;
          if (L = E.tag, L === 5 || L === 6) {
            c = g = E;
            continue e;
          }
          D = D.parentNode;
        }
      }
      c = c.return;
    }
    Wl(function() {
      var J = g, ye = pn(l), Ce = [];
      e: {
        var me = Wh.get(n);
        if (me !== void 0) {
          var je = _c, Ye = n;
          switch (n) {
            case "keypress":
              if (Xl(l) === 0) break e;
            case "keydown":
            case "keyup":
              je = f0;
              break;
            case "focusin":
              Ye = "focus", je = So;
              break;
            case "focusout":
              Ye = "blur", je = So;
              break;
            case "beforeblur":
            case "afterblur":
              je = So;
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
              je = Oc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              je = Ch;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              je = d0;
              break;
            case Jd:
            case Hh:
            case Ih:
              je = Eh;
              break;
            case Yh:
              je = Rh;
              break;
            case "scroll":
              je = Sh;
              break;
            case "wheel":
              je = Bi;
              break;
            case "copy":
            case "cut":
            case "paste":
              je = s0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              je = Dc;
          }
          var qe = (r & 4) !== 0, Hn = !qe && n === "scroll", Y = qe ? me !== null ? me + "Capture" : null : me;
          qe = [];
          for (var P = J, q; P !== null; ) {
            q = P;
            var xe = q.stateNode;
            if (q.tag === 5 && xe !== null && (q = xe, Y !== null && (xe = el(P, Y), xe != null && qe.push(Es(P, xe, q)))), Hn) break;
            P = P.return;
          }
          0 < qe.length && (me = new je(me, Ye, null, l, ye), Ce.push({ event: me, listeners: qe }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (me = n === "mouseover" || n === "pointerover", je = n === "mouseout" || n === "pointerout", me && l !== qr && (Ye = l.relatedTarget || l.fromElement) && (za(Ye) || Ye[Wi])) break e;
          if ((je || me) && (me = ye.window === ye ? ye : (me = ye.ownerDocument) ? me.defaultView || me.parentWindow : window, je ? (Ye = l.relatedTarget || l.toElement, je = J, Ye = Ye ? za(Ye) : null, Ye !== null && (Hn = it(Ye), Ye !== Hn || Ye.tag !== 5 && Ye.tag !== 6) && (Ye = null)) : (je = null, Ye = J), je !== Ye)) {
            if (qe = Oc, xe = "onMouseLeave", Y = "onMouseEnter", P = "mouse", (n === "pointerout" || n === "pointerover") && (qe = Dc, xe = "onPointerLeave", Y = "onPointerEnter", P = "pointer"), Hn = je == null ? me : iu(je), q = Ye == null ? me : iu(Ye), me = new qe(xe, P + "leave", je, l, ye), me.target = Hn, me.relatedTarget = q, xe = null, za(ye) === J && (qe = new qe(Y, P + "enter", Ye, l, ye), qe.target = q, qe.relatedTarget = Hn, xe = qe), Hn = xe, je && Ye) t: {
              for (qe = je, Y = Ye, P = 0, q = qe; q; q = ul(q)) P++;
              for (q = 0, xe = Y; xe; xe = ul(xe)) q++;
              for (; 0 < P - q; ) qe = ul(qe), P--;
              for (; 0 < q - P; ) Y = ul(Y), q--;
              for (; P--; ) {
                if (qe === Y || Y !== null && qe === Y.alternate) break t;
                qe = ul(qe), Y = ul(Y);
              }
              qe = null;
            }
            else qe = null;
            je !== null && ep(Ce, me, je, qe, !1), Ye !== null && Hn !== null && ep(Ce, Hn, Ye, qe, !0);
          }
        }
        e: {
          if (me = J ? iu(J) : window, je = me.nodeName && me.nodeName.toLowerCase(), je === "select" || je === "input" && me.type === "file") var Je = Nh;
          else if (Ah(me)) if (Wd) Je = Fh;
          else {
            Je = m0;
            var ft = h0;
          }
          else (je = me.nodeName) && je.toLowerCase() === "input" && (me.type === "checkbox" || me.type === "radio") && (Je = y0);
          if (Je && (Je = Je(n, J))) {
            Mh(Ce, Je, l, ye);
            break e;
          }
          ft && ft(n, me, J), n === "focusout" && (ft = me._wrapperState) && ft.controlled && me.type === "number" && W(me, "number", me.value);
        }
        switch (ft = J ? iu(J) : window, n) {
          case "focusin":
            (Ah(ft) || ft.contentEditable === "true") && (si = ft, qd = J, gs = null);
            break;
          case "focusout":
            gs = qd = si = null;
            break;
          case "mousedown":
            Kd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Kd = !1, Bh(Ce, l, ye);
            break;
          case "selectionchange":
            if (Vh) break;
          case "keydown":
          case "keyup":
            Bh(Ce, l, ye);
        }
        var We;
        if (ui) e: {
          switch (n) {
            case "compositionstart":
              var pt = "onCompositionStart";
              break e;
            case "compositionend":
              pt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              pt = "onCompositionUpdate";
              break e;
          }
          pt = void 0;
        }
        else eu ? Oh(n, l) && (pt = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (pt = "onCompositionStart");
        pt && (_h && l.locale !== "ko" && (eu || pt !== "onCompositionStart" ? pt === "onCompositionEnd" && eu && (We = Pd()) : ($i = ye, ds = "value" in $i ? $i.value : $i.textContent, eu = !0)), ft = Ts(J, pt), 0 < ft.length && (pt = new Vd(pt, n, null, l, ye), Ce.push({ event: pt, listeners: ft }), We ? pt.data = We : (We = Nc(l), We !== null && (pt.data = We)))), (We = Mc ? p0(n, l) : v0(n, l)) && (J = Ts(J, "onBeforeInput"), 0 < J.length && (ye = new Vd("onBeforeInput", "beforeinput", null, l, ye), Ce.push({ event: ye, listeners: J }), ye.data = We));
      }
      Fc(Ce, r);
    });
  }
  function Es(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function Ts(n, r) {
    for (var l = r + "Capture", c = []; n !== null; ) {
      var p = n, g = p.stateNode;
      p.tag === 5 && g !== null && (p = g, g = el(n, l), g != null && c.unshift(Es(n, g, p)), g = el(n, r), g != null && c.push(Es(n, g, p))), n = n.return;
    }
    return c;
  }
  function ul(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function ep(n, r, l, c, p) {
    for (var g = r._reactName, E = []; l !== null && l !== c; ) {
      var D = l, L = D.alternate, J = D.stateNode;
      if (L !== null && L === c) break;
      D.tag === 5 && J !== null && (D = J, p ? (L = el(l, g), L != null && E.unshift(Es(l, L, D))) : p || (L = el(l, g), L != null && E.push(Es(l, L, D)))), l = l.return;
    }
    E.length !== 0 && n.push({ event: r, listeners: E });
  }
  var tp = /\r\n?/g, C0 = /\u0000|\uFFFD/g;
  function np(n) {
    return (typeof n == "string" ? n : "" + n).replace(tp, `
`).replace(C0, "");
  }
  function jc(n, r, l) {
    if (r = np(r), np(n) !== r && l) throw Error(f(425));
  }
  function $c() {
  }
  var rp = null, sl = null;
  function xs(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var cl = typeof setTimeout == "function" ? setTimeout : void 0, Kh = typeof clearTimeout == "function" ? clearTimeout : void 0, ap = typeof Promise == "function" ? Promise : void 0, ip = typeof queueMicrotask == "function" ? queueMicrotask : typeof ap < "u" ? function(n) {
    return ap.resolve(null).then(n).catch(E0);
  } : cl;
  function E0(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Co(n, r) {
    var l = r, c = 0;
    do {
      var p = l.nextSibling;
      if (n.removeChild(l), p && p.nodeType === 8) if (l = p.data, l === "/$") {
        if (c === 0) {
          n.removeChild(p), cs(r);
          return;
        }
        c--;
      } else l !== "$" && l !== "$?" && l !== "$!" || c++;
      l = p;
    } while (l);
    cs(r);
  }
  function ci(n) {
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
  function ws(n) {
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
  var Eo = Math.random().toString(36).slice(2), Ei = "__reactFiber$" + Eo, fl = "__reactProps$" + Eo, Wi = "__reactContainer$" + Eo, op = "__reactEvents$" + Eo, T0 = "__reactListeners$" + Eo, lp = "__reactHandles$" + Eo;
  function za(n) {
    var r = n[Ei];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Wi] || l[Ei]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = ws(n); n !== null; ) {
          if (l = n[Ei]) return l;
          n = ws(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Rs(n) {
    return n = n[Ei] || n[Wi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function iu(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(f(33));
  }
  function st(n) {
    return n[fl] || null;
  }
  var To = [], gn = -1;
  function _t(n) {
    return { current: n };
  }
  function Gt(n) {
    0 > gn || (n.current = To[gn], To[gn] = null, gn--);
  }
  function qt(n, r) {
    gn++, To[gn] = n.current, n.current = r;
  }
  var Ti = {}, gt = _t(Ti), Ln = _t(!1), Zr = Ti;
  function Ua(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Ti;
    var c = n.stateNode;
    if (c && c.__reactInternalMemoizedUnmaskedChildContext === r) return c.__reactInternalMemoizedMaskedChildContext;
    var p = {}, g;
    for (g in l) p[g] = r[g];
    return c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = p), p;
  }
  function wn(n) {
    return n = n.childContextTypes, n != null;
  }
  function Fa() {
    Gt(Ln), Gt(gt);
  }
  function xo(n, r, l) {
    if (gt.current !== Ti) throw Error(f(168));
    qt(gt, r), qt(Ln, l);
  }
  function _s(n, r, l) {
    var c = n.stateNode;
    if (r = r.childContextTypes, typeof c.getChildContext != "function") return l;
    c = c.getChildContext();
    for (var p in c) if (!(p in r)) throw Error(f(108, ut(n) || "Unknown", p));
    return I({}, l, c);
  }
  function Vc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ti, Zr = gt.current, qt(gt, n), qt(Ln, Ln.current), !0;
  }
  function Xh(n, r, l) {
    var c = n.stateNode;
    if (!c) throw Error(f(169));
    l ? (n = _s(n, r, Zr), c.__reactInternalMemoizedMergedChildContext = n, Gt(Ln), Gt(gt), qt(gt, n)) : Gt(Ln), qt(Ln, l);
  }
  var ga = null, fr = !1, ks = !1;
  function up(n) {
    ga === null ? ga = [n] : ga.push(n);
  }
  function sp(n) {
    fr = !0, up(n);
  }
  function Jr() {
    if (!ks && ga !== null) {
      ks = !0;
      var n = 0, r = Zt;
      try {
        var l = ga;
        for (Zt = 1; n < l.length; n++) {
          var c = l[n];
          do
            c = c(!0);
          while (c !== null);
        }
        ga = null, fr = !1;
      } catch (p) {
        throw ga !== null && (ga = ga.slice(n + 1)), yn(ma, Jr), p;
      } finally {
        Zt = r, ks = !1;
      }
    }
    return null;
  }
  var wo = [], ea = 0, dl = null, ou = 0, ta = [], Mr = 0, Pa = null, gr = 1, Gi = "";
  function Sa(n, r) {
    wo[ea++] = ou, wo[ea++] = dl, dl = n, ou = r;
  }
  function cp(n, r, l) {
    ta[Mr++] = gr, ta[Mr++] = Gi, ta[Mr++] = Pa, Pa = n;
    var c = gr;
    n = Gi;
    var p = 32 - Aa(c) - 1;
    c &= ~(1 << p), l += 1;
    var g = 32 - Aa(r) + p;
    if (30 < g) {
      var E = p - p % 5;
      g = (c & (1 << E) - 1).toString(32), c >>= E, p -= E, gr = 1 << 32 - Aa(r) + p | l << p | c, Gi = g + n;
    } else gr = 1 << g | l << p | c, Gi = n;
  }
  function Bc(n) {
    n.return !== null && (Sa(n, 1), cp(n, 1, 0));
  }
  function fp(n) {
    for (; n === dl; ) dl = wo[--ea], wo[ea] = null, ou = wo[--ea], wo[ea] = null;
    for (; n === Pa; ) Pa = ta[--Mr], ta[Mr] = null, Gi = ta[--Mr], ta[Mr] = null, gr = ta[--Mr], ta[Mr] = null;
  }
  var ba = null, na = null, Sn = !1, ja = null;
  function dp(n, r) {
    var l = Ga(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Zh(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ba = n, na = ci(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ba = n, na = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Pa !== null ? { id: gr, overflow: Gi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Ga(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, ba = n, na = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Hc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Ic(n) {
    if (Sn) {
      var r = na;
      if (r) {
        var l = r;
        if (!Zh(n, r)) {
          if (Hc(n)) throw Error(f(418));
          r = ci(l.nextSibling);
          var c = ba;
          r && Zh(n, r) ? dp(c, l) : (n.flags = n.flags & -4097 | 2, Sn = !1, ba = n);
        }
      } else {
        if (Hc(n)) throw Error(f(418));
        n.flags = n.flags & -4097 | 2, Sn = !1, ba = n;
      }
    }
  }
  function Jh(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ba = n;
  }
  function Yc(n) {
    if (n !== ba) return !1;
    if (!Sn) return Jh(n), Sn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !xs(n.type, n.memoizedProps)), r && (r = na)) {
      if (Hc(n)) throw em(), Error(f(418));
      for (; r; ) dp(n, r), r = ci(r.nextSibling);
    }
    if (Jh(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(f(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                na = ci(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        na = null;
      }
    } else na = ba ? ci(n.stateNode.nextSibling) : null;
    return !0;
  }
  function em() {
    for (var n = na; n; ) n = ci(n.nextSibling);
  }
  function On() {
    na = ba = null, Sn = !1;
  }
  function pp(n) {
    ja === null ? ja = [n] : ja.push(n);
  }
  var Wc = le.ReactCurrentBatchConfig;
  function pl(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(f(309));
          var c = l.stateNode;
        }
        if (!c) throw Error(f(147, n));
        var p = c, g = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === g ? r.ref : (r = function(E) {
          var D = p.refs;
          E === null ? delete D[g] : D[g] = E;
        }, r._stringRef = g, r);
      }
      if (typeof n != "string") throw Error(f(284));
      if (!l._owner) throw Error(f(290, n));
    }
    return n;
  }
  function xi(n, r) {
    throw n = Object.prototype.toString.call(r), Error(f(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function tm(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Gc(n) {
    function r(Y, P) {
      if (n) {
        var q = Y.deletions;
        q === null ? (Y.deletions = [P], Y.flags |= 16) : q.push(P);
      }
    }
    function l(Y, P) {
      if (!n) return null;
      for (; P !== null; ) r(Y, P), P = P.sibling;
      return null;
    }
    function c(Y, P) {
      for (Y = /* @__PURE__ */ new Map(); P !== null; ) P.key !== null ? Y.set(P.key, P) : Y.set(P.index, P), P = P.sibling;
      return Y;
    }
    function p(Y, P) {
      return Y = No(Y, P), Y.index = 0, Y.sibling = null, Y;
    }
    function g(Y, P, q) {
      return Y.index = q, n ? (q = Y.alternate, q !== null ? (q = q.index, q < P ? (Y.flags |= 2, P) : q) : (Y.flags |= 2, P)) : (Y.flags |= 1048576, P);
    }
    function E(Y) {
      return n && Y.alternate === null && (Y.flags |= 2), Y;
    }
    function D(Y, P, q, xe) {
      return P === null || P.tag !== 6 ? (P = zf(q, Y.mode, xe), P.return = Y, P) : (P = p(P, q), P.return = Y, P);
    }
    function L(Y, P, q, xe) {
      var Je = q.type;
      return Je === ce ? ye(Y, P, q.props.children, xe, q.key) : P !== null && (P.elementType === Je || typeof Je == "object" && Je !== null && Je.$$typeof === Qe && tm(Je) === P.type) ? (xe = p(P, q.props), xe.ref = pl(Y, P, q), xe.return = Y, xe) : (xe = Nf(q.type, q.key, q.props, null, Y.mode, xe), xe.ref = pl(Y, P, q), xe.return = Y, xe);
    }
    function J(Y, P, q, xe) {
      return P === null || P.tag !== 4 || P.stateNode.containerInfo !== q.containerInfo || P.stateNode.implementation !== q.implementation ? (P = Ws(q, Y.mode, xe), P.return = Y, P) : (P = p(P, q.children || []), P.return = Y, P);
    }
    function ye(Y, P, q, xe, Je) {
      return P === null || P.tag !== 7 ? (P = kl(q, Y.mode, xe, Je), P.return = Y, P) : (P = p(P, q), P.return = Y, P);
    }
    function Ce(Y, P, q) {
      if (typeof P == "string" && P !== "" || typeof P == "number") return P = zf("" + P, Y.mode, q), P.return = Y, P;
      if (typeof P == "object" && P !== null) {
        switch (P.$$typeof) {
          case $:
            return q = Nf(P.type, P.key, P.props, null, Y.mode, q), q.ref = pl(Y, null, P), q.return = Y, q;
          case be:
            return P = Ws(P, Y.mode, q), P.return = Y, P;
          case Qe:
            var xe = P._init;
            return Ce(Y, xe(P._payload), q);
        }
        if (ne(P) || ze(P)) return P = kl(P, Y.mode, q, null), P.return = Y, P;
        xi(Y, P);
      }
      return null;
    }
    function me(Y, P, q, xe) {
      var Je = P !== null ? P.key : null;
      if (typeof q == "string" && q !== "" || typeof q == "number") return Je !== null ? null : D(Y, P, "" + q, xe);
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case $:
            return q.key === Je ? L(Y, P, q, xe) : null;
          case be:
            return q.key === Je ? J(Y, P, q, xe) : null;
          case Qe:
            return Je = q._init, me(
              Y,
              P,
              Je(q._payload),
              xe
            );
        }
        if (ne(q) || ze(q)) return Je !== null ? null : ye(Y, P, q, xe, null);
        xi(Y, q);
      }
      return null;
    }
    function je(Y, P, q, xe, Je) {
      if (typeof xe == "string" && xe !== "" || typeof xe == "number") return Y = Y.get(q) || null, D(P, Y, "" + xe, Je);
      if (typeof xe == "object" && xe !== null) {
        switch (xe.$$typeof) {
          case $:
            return Y = Y.get(xe.key === null ? q : xe.key) || null, L(P, Y, xe, Je);
          case be:
            return Y = Y.get(xe.key === null ? q : xe.key) || null, J(P, Y, xe, Je);
          case Qe:
            var ft = xe._init;
            return je(Y, P, q, ft(xe._payload), Je);
        }
        if (ne(xe) || ze(xe)) return Y = Y.get(q) || null, ye(P, Y, xe, Je, null);
        xi(P, xe);
      }
      return null;
    }
    function Ye(Y, P, q, xe) {
      for (var Je = null, ft = null, We = P, pt = P = 0, rr = null; We !== null && pt < q.length; pt++) {
        We.index > pt ? (rr = We, We = null) : rr = We.sibling;
        var Ht = me(Y, We, q[pt], xe);
        if (Ht === null) {
          We === null && (We = rr);
          break;
        }
        n && We && Ht.alternate === null && r(Y, We), P = g(Ht, P, pt), ft === null ? Je = Ht : ft.sibling = Ht, ft = Ht, We = rr;
      }
      if (pt === q.length) return l(Y, We), Sn && Sa(Y, pt), Je;
      if (We === null) {
        for (; pt < q.length; pt++) We = Ce(Y, q[pt], xe), We !== null && (P = g(We, P, pt), ft === null ? Je = We : ft.sibling = We, ft = We);
        return Sn && Sa(Y, pt), Je;
      }
      for (We = c(Y, We); pt < q.length; pt++) rr = je(We, Y, pt, q[pt], xe), rr !== null && (n && rr.alternate !== null && We.delete(rr.key === null ? pt : rr.key), P = g(rr, P, pt), ft === null ? Je = rr : ft.sibling = rr, ft = rr);
      return n && We.forEach(function(eo) {
        return r(Y, eo);
      }), Sn && Sa(Y, pt), Je;
    }
    function qe(Y, P, q, xe) {
      var Je = ze(q);
      if (typeof Je != "function") throw Error(f(150));
      if (q = Je.call(q), q == null) throw Error(f(151));
      for (var ft = Je = null, We = P, pt = P = 0, rr = null, Ht = q.next(); We !== null && !Ht.done; pt++, Ht = q.next()) {
        We.index > pt ? (rr = We, We = null) : rr = We.sibling;
        var eo = me(Y, We, Ht.value, xe);
        if (eo === null) {
          We === null && (We = rr);
          break;
        }
        n && We && eo.alternate === null && r(Y, We), P = g(eo, P, pt), ft === null ? Je = eo : ft.sibling = eo, ft = eo, We = rr;
      }
      if (Ht.done) return l(
        Y,
        We
      ), Sn && Sa(Y, pt), Je;
      if (We === null) {
        for (; !Ht.done; pt++, Ht = q.next()) Ht = Ce(Y, Ht.value, xe), Ht !== null && (P = g(Ht, P, pt), ft === null ? Je = Ht : ft.sibling = Ht, ft = Ht);
        return Sn && Sa(Y, pt), Je;
      }
      for (We = c(Y, We); !Ht.done; pt++, Ht = q.next()) Ht = je(We, Y, pt, Ht.value, xe), Ht !== null && (n && Ht.alternate !== null && We.delete(Ht.key === null ? pt : Ht.key), P = g(Ht, P, pt), ft === null ? Je = Ht : ft.sibling = Ht, ft = Ht);
      return n && We.forEach(function(V0) {
        return r(Y, V0);
      }), Sn && Sa(Y, pt), Je;
    }
    function Hn(Y, P, q, xe) {
      if (typeof q == "object" && q !== null && q.type === ce && q.key === null && (q = q.props.children), typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case $:
            e: {
              for (var Je = q.key, ft = P; ft !== null; ) {
                if (ft.key === Je) {
                  if (Je = q.type, Je === ce) {
                    if (ft.tag === 7) {
                      l(Y, ft.sibling), P = p(ft, q.props.children), P.return = Y, Y = P;
                      break e;
                    }
                  } else if (ft.elementType === Je || typeof Je == "object" && Je !== null && Je.$$typeof === Qe && tm(Je) === ft.type) {
                    l(Y, ft.sibling), P = p(ft, q.props), P.ref = pl(Y, ft, q), P.return = Y, Y = P;
                    break e;
                  }
                  l(Y, ft);
                  break;
                } else r(Y, ft);
                ft = ft.sibling;
              }
              q.type === ce ? (P = kl(q.props.children, Y.mode, xe, q.key), P.return = Y, Y = P) : (xe = Nf(q.type, q.key, q.props, null, Y.mode, xe), xe.ref = pl(Y, P, q), xe.return = Y, Y = xe);
            }
            return E(Y);
          case be:
            e: {
              for (ft = q.key; P !== null; ) {
                if (P.key === ft) if (P.tag === 4 && P.stateNode.containerInfo === q.containerInfo && P.stateNode.implementation === q.implementation) {
                  l(Y, P.sibling), P = p(P, q.children || []), P.return = Y, Y = P;
                  break e;
                } else {
                  l(Y, P);
                  break;
                }
                else r(Y, P);
                P = P.sibling;
              }
              P = Ws(q, Y.mode, xe), P.return = Y, Y = P;
            }
            return E(Y);
          case Qe:
            return ft = q._init, Hn(Y, P, ft(q._payload), xe);
        }
        if (ne(q)) return Ye(Y, P, q, xe);
        if (ze(q)) return qe(Y, P, q, xe);
        xi(Y, q);
      }
      return typeof q == "string" && q !== "" || typeof q == "number" ? (q = "" + q, P !== null && P.tag === 6 ? (l(Y, P.sibling), P = p(P, q), P.return = Y, Y = P) : (l(Y, P), P = zf(q, Y.mode, xe), P.return = Y, Y = P), E(Y)) : l(Y, P);
    }
    return Hn;
  }
  var lu = Gc(!0), nm = Gc(!1), Qi = _t(null), Jn = null, Ae = null, $a = null;
  function Ca() {
    $a = Ae = Jn = null;
  }
  function vp(n) {
    var r = Qi.current;
    Gt(Qi), n._currentValue = r;
  }
  function hp(n, r, l) {
    for (; n !== null; ) {
      var c = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, c !== null && (c.childLanes |= r)) : c !== null && (c.childLanes & r) !== r && (c.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function uu(n, r) {
    Jn = n, $a = Ae = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (ia = !0), n.firstContext = null);
  }
  function Va(n) {
    var r = n._currentValue;
    if ($a !== n) if (n = { context: n, memoizedValue: r, next: null }, Ae === null) {
      if (Jn === null) throw Error(f(308));
      Ae = n, Jn.dependencies = { lanes: 0, firstContext: n };
    } else Ae = Ae.next = n;
    return r;
  }
  var vl = null;
  function Gn(n) {
    vl === null ? vl = [n] : vl.push(n);
  }
  function rm(n, r, l, c) {
    var p = r.interleaved;
    return p === null ? (l.next = l, Gn(r)) : (l.next = p.next, p.next = l), r.interleaved = l, qi(n, c);
  }
  function qi(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ro = !1;
  function Qc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function su(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ra(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function _o(n, r, l) {
    var c = n.updateQueue;
    if (c === null) return null;
    if (c = c.shared, Nt & 2) {
      var p = c.pending;
      return p === null ? r.next = r : (r.next = p.next, p.next = r), c.pending = r, qi(n, l);
    }
    return p = c.interleaved, p === null ? (r.next = r, Gn(c)) : (r.next = p.next, p.next = r), c.interleaved = r, qi(n, l);
  }
  function qc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var c = r.lanes;
      c &= n.pendingLanes, l |= c, r.lanes = l, os(n, l);
    }
  }
  function am(n, r) {
    var l = n.updateQueue, c = n.alternate;
    if (c !== null && (c = c.updateQueue, l === c)) {
      var p = null, g = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var E = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          g === null ? p = g = E : g = g.next = E, l = l.next;
        } while (l !== null);
        g === null ? p = g = r : g = g.next = r;
      } else p = g = r;
      l = { baseState: c.baseState, firstBaseUpdate: p, lastBaseUpdate: g, shared: c.shared, effects: c.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Kc(n, r, l, c) {
    var p = n.updateQueue;
    Ro = !1;
    var g = p.firstBaseUpdate, E = p.lastBaseUpdate, D = p.shared.pending;
    if (D !== null) {
      p.shared.pending = null;
      var L = D, J = L.next;
      L.next = null, E === null ? g = J : E.next = J, E = L;
      var ye = n.alternate;
      ye !== null && (ye = ye.updateQueue, D = ye.lastBaseUpdate, D !== E && (D === null ? ye.firstBaseUpdate = J : D.next = J, ye.lastBaseUpdate = L));
    }
    if (g !== null) {
      var Ce = p.baseState;
      E = 0, ye = J = L = null, D = g;
      do {
        var me = D.lane, je = D.eventTime;
        if ((c & me) === me) {
          ye !== null && (ye = ye.next = {
            eventTime: je,
            lane: 0,
            tag: D.tag,
            payload: D.payload,
            callback: D.callback,
            next: null
          });
          e: {
            var Ye = n, qe = D;
            switch (me = r, je = l, qe.tag) {
              case 1:
                if (Ye = qe.payload, typeof Ye == "function") {
                  Ce = Ye.call(je, Ce, me);
                  break e;
                }
                Ce = Ye;
                break e;
              case 3:
                Ye.flags = Ye.flags & -65537 | 128;
              case 0:
                if (Ye = qe.payload, me = typeof Ye == "function" ? Ye.call(je, Ce, me) : Ye, me == null) break e;
                Ce = I({}, Ce, me);
                break e;
              case 2:
                Ro = !0;
            }
          }
          D.callback !== null && D.lane !== 0 && (n.flags |= 64, me = p.effects, me === null ? p.effects = [D] : me.push(D));
        } else je = { eventTime: je, lane: me, tag: D.tag, payload: D.payload, callback: D.callback, next: null }, ye === null ? (J = ye = je, L = Ce) : ye = ye.next = je, E |= me;
        if (D = D.next, D === null) {
          if (D = p.shared.pending, D === null) break;
          me = D, D = me.next, me.next = null, p.lastBaseUpdate = me, p.shared.pending = null;
        }
      } while (!0);
      if (ye === null && (L = Ce), p.baseState = L, p.firstBaseUpdate = J, p.lastBaseUpdate = ye, r = p.shared.interleaved, r !== null) {
        p = r;
        do
          E |= p.lane, p = p.next;
        while (p !== r);
      } else g === null && (p.shared.lanes = 0);
      xl |= E, n.lanes = E, n.memoizedState = Ce;
    }
  }
  function im(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var c = n[r], p = c.callback;
      if (p !== null) {
        if (c.callback = null, c = l, typeof p != "function") throw Error(f(191, p));
        p.call(c);
      }
    }
  }
  var Os = {}, fi = _t(Os), cu = _t(Os), Ds = _t(Os);
  function hl(n) {
    if (n === Os) throw Error(f(174));
    return n;
  }
  function mp(n, r) {
    switch (qt(Ds, r), qt(cu, n), qt(fi, Os), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Ot(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Ot(r, n);
    }
    Gt(fi), qt(fi, r);
  }
  function fu() {
    Gt(fi), Gt(cu), Gt(Ds);
  }
  function om(n) {
    hl(Ds.current);
    var r = hl(fi.current), l = Ot(r, n.type);
    r !== l && (qt(cu, n), qt(fi, l));
  }
  function yp(n) {
    cu.current === n && (Gt(fi), Gt(cu));
  }
  var Rn = _t(0);
  function Xc(n) {
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
  var Zc = [];
  function gp() {
    for (var n = 0; n < Zc.length; n++) Zc[n]._workInProgressVersionPrimary = null;
    Zc.length = 0;
  }
  var Jc = le.ReactCurrentDispatcher, As = le.ReactCurrentBatchConfig, Ze = 0, tt = null, St = null, Mt = null, Ea = !1, du = !1, Ms = 0, x0 = 0;
  function Nr() {
    throw Error(f(321));
  }
  function Ns(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!La(n[l], r[l])) return !1;
    return !0;
  }
  function he(n, r, l, c, p, g) {
    if (Ze = g, tt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Jc.current = n === null || n.memoizedState === null ? w0 : hn, n = l(c, p), du) {
      g = 0;
      do {
        if (du = !1, Ms = 0, 25 <= g) throw Error(f(301));
        g += 1, Mt = St = null, r.updateQueue = null, Jc.current = hf, n = l(c, p);
      } while (du);
    }
    if (Jc.current = Lr, r = St !== null && St.next !== null, Ze = 0, Mt = St = tt = null, Ea = !1, r) throw Error(f(300));
    return n;
  }
  function Qn() {
    var n = Ms !== 0;
    return Ms = 0, n;
  }
  function ot() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Mt === null ? tt.memoizedState = Mt = n : Mt = Mt.next = n, Mt;
  }
  function Sr() {
    if (St === null) {
      var n = tt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = St.next;
    var r = Mt === null ? tt.memoizedState : Mt.next;
    if (r !== null) Mt = r, St = n;
    else {
      if (n === null) throw Error(f(310));
      St = n, n = { memoizedState: St.memoizedState, baseState: St.baseState, baseQueue: St.baseQueue, queue: St.queue, next: null }, Mt === null ? tt.memoizedState = Mt = n : Mt = Mt.next = n;
    }
    return Mt;
  }
  function Ta(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ki(n) {
    var r = Sr(), l = r.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = n;
    var c = St, p = c.baseQueue, g = l.pending;
    if (g !== null) {
      if (p !== null) {
        var E = p.next;
        p.next = g.next, g.next = E;
      }
      c.baseQueue = p = g, l.pending = null;
    }
    if (p !== null) {
      g = p.next, c = c.baseState;
      var D = E = null, L = null, J = g;
      do {
        var ye = J.lane;
        if ((Ze & ye) === ye) L !== null && (L = L.next = { lane: 0, action: J.action, hasEagerState: J.hasEagerState, eagerState: J.eagerState, next: null }), c = J.hasEagerState ? J.eagerState : n(c, J.action);
        else {
          var Ce = {
            lane: ye,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          };
          L === null ? (D = L = Ce, E = c) : L = L.next = Ce, tt.lanes |= ye, xl |= ye;
        }
        J = J.next;
      } while (J !== null && J !== g);
      L === null ? E = c : L.next = D, La(c, r.memoizedState) || (ia = !0), r.memoizedState = c, r.baseState = E, r.baseQueue = L, l.lastRenderedState = c;
    }
    if (n = l.interleaved, n !== null) {
      p = n;
      do
        g = p.lane, tt.lanes |= g, xl |= g, p = p.next;
      while (p !== n);
    } else p === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Ba(n) {
    var r = Sr(), l = r.queue;
    if (l === null) throw Error(f(311));
    l.lastRenderedReducer = n;
    var c = l.dispatch, p = l.pending, g = r.memoizedState;
    if (p !== null) {
      l.pending = null;
      var E = p = p.next;
      do
        g = n(g, E.action), E = E.next;
      while (E !== p);
      La(g, r.memoizedState) || (ia = !0), r.memoizedState = g, r.baseQueue === null && (r.baseState = g), l.lastRenderedState = g;
    }
    return [g, c];
  }
  function pu() {
  }
  function ml(n, r) {
    var l = tt, c = Sr(), p = r(), g = !La(c.memoizedState, p);
    if (g && (c.memoizedState = p, ia = !0), c = c.queue, Ls(tf.bind(null, l, c, n), [n]), c.getSnapshot !== r || g || Mt !== null && Mt.memoizedState.tag & 1) {
      if (l.flags |= 2048, yl(9, ef.bind(null, l, c, p, r), void 0, null), Un === null) throw Error(f(349));
      Ze & 30 || vu(l, r, p);
    }
    return p;
  }
  function vu(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = tt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, tt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function ef(n, r, l, c) {
    r.value = l, r.getSnapshot = c, nf(r) && rf(n);
  }
  function tf(n, r, l) {
    return l(function() {
      nf(r) && rf(n);
    });
  }
  function nf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !La(n, l);
    } catch {
      return !0;
    }
  }
  function rf(n) {
    var r = qi(n, 1);
    r !== null && Dn(r, n, 1, -1);
  }
  function af(n) {
    var r = ot();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ta, lastRenderedState: n }, r.queue = n, n = n.dispatch = zs.bind(null, tt, n), [r.memoizedState, n];
  }
  function yl(n, r, l, c) {
    return n = { tag: n, create: r, destroy: l, deps: c, next: null }, r = tt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, tt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (c = l.next, l.next = n, n.next = c, r.lastEffect = n)), n;
  }
  function of() {
    return Sr().memoizedState;
  }
  function hu(n, r, l, c) {
    var p = ot();
    tt.flags |= n, p.memoizedState = yl(1 | r, l, void 0, c === void 0 ? null : c);
  }
  function mu(n, r, l, c) {
    var p = Sr();
    c = c === void 0 ? null : c;
    var g = void 0;
    if (St !== null) {
      var E = St.memoizedState;
      if (g = E.destroy, c !== null && Ns(c, E.deps)) {
        p.memoizedState = yl(r, l, g, c);
        return;
      }
    }
    tt.flags |= n, p.memoizedState = yl(1 | r, l, g, c);
  }
  function lf(n, r) {
    return hu(8390656, 8, n, r);
  }
  function Ls(n, r) {
    return mu(2048, 8, n, r);
  }
  function uf(n, r) {
    return mu(4, 2, n, r);
  }
  function sf(n, r) {
    return mu(4, 4, n, r);
  }
  function cf(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function ff(n, r, l) {
    return l = l != null ? l.concat([n]) : null, mu(4, 4, cf.bind(null, r, n), l);
  }
  function yu() {
  }
  function gl(n, r) {
    var l = Sr();
    r = r === void 0 ? null : r;
    var c = l.memoizedState;
    return c !== null && r !== null && Ns(r, c[1]) ? c[0] : (l.memoizedState = [n, r], n);
  }
  function df(n, r) {
    var l = Sr();
    r = r === void 0 ? null : r;
    var c = l.memoizedState;
    return c !== null && r !== null && Ns(r, c[1]) ? c[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function pf(n, r, l) {
    return Ze & 21 ? (La(l, r) || (l = Ec(), tt.lanes |= l, xl |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, ia = !0), n.memoizedState = l);
  }
  function Sp(n, r) {
    var l = Zt;
    Zt = l !== 0 && 4 > l ? l : 4, n(!0);
    var c = As.transition;
    As.transition = {};
    try {
      n(!1), r();
    } finally {
      Zt = l, As.transition = c;
    }
  }
  function vf() {
    return Sr().memoizedState;
  }
  function lm(n, r, l) {
    var c = Ji(n);
    if (l = { lane: c, action: l, hasEagerState: !1, eagerState: null, next: null }, bp(n)) gu(r, l);
    else if (l = rm(n, r, l, c), l !== null) {
      var p = vr();
      Dn(l, n, c, p), ko(l, r, c);
    }
  }
  function zs(n, r, l) {
    var c = Ji(n), p = { lane: c, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (bp(n)) gu(r, p);
    else {
      var g = n.alternate;
      if (n.lanes === 0 && (g === null || g.lanes === 0) && (g = r.lastRenderedReducer, g !== null)) try {
        var E = r.lastRenderedState, D = g(E, l);
        if (p.hasEagerState = !0, p.eagerState = D, La(D, E)) {
          var L = r.interleaved;
          L === null ? (p.next = p, Gn(r)) : (p.next = L.next, L.next = p), r.interleaved = p;
          return;
        }
      } catch {
      } finally {
      }
      l = rm(n, r, p, c), l !== null && (p = vr(), Dn(l, n, c, p), ko(l, r, c));
    }
  }
  function bp(n) {
    var r = n.alternate;
    return n === tt || r !== null && r === tt;
  }
  function gu(n, r) {
    du = Ea = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function ko(n, r, l) {
    if (l & 4194240) {
      var c = r.lanes;
      c &= n.pendingLanes, l |= c, r.lanes = l, os(n, l);
    }
  }
  var Lr = { readContext: Va, useCallback: Nr, useContext: Nr, useEffect: Nr, useImperativeHandle: Nr, useInsertionEffect: Nr, useLayoutEffect: Nr, useMemo: Nr, useReducer: Nr, useRef: Nr, useState: Nr, useDebugValue: Nr, useDeferredValue: Nr, useTransition: Nr, useMutableSource: Nr, useSyncExternalStore: Nr, useId: Nr, unstable_isNewReconciler: !1 }, w0 = { readContext: Va, useCallback: function(n, r) {
    return ot().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Va, useEffect: lf, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, hu(
      4194308,
      4,
      cf.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return hu(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return hu(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = ot();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var c = ot();
    return r = l !== void 0 ? l(r) : r, c.memoizedState = c.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, c.queue = n, n = n.dispatch = lm.bind(null, tt, n), [c.memoizedState, n];
  }, useRef: function(n) {
    var r = ot();
    return n = { current: n }, r.memoizedState = n;
  }, useState: af, useDebugValue: yu, useDeferredValue: function(n) {
    return ot().memoizedState = n;
  }, useTransition: function() {
    var n = af(!1), r = n[0];
    return n = Sp.bind(null, n[1]), ot().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var c = tt, p = ot();
    if (Sn) {
      if (l === void 0) throw Error(f(407));
      l = l();
    } else {
      if (l = r(), Un === null) throw Error(f(349));
      Ze & 30 || vu(c, r, l);
    }
    p.memoizedState = l;
    var g = { value: l, getSnapshot: r };
    return p.queue = g, lf(tf.bind(
      null,
      c,
      g,
      n
    ), [n]), c.flags |= 2048, yl(9, ef.bind(null, c, g, l, r), void 0, null), l;
  }, useId: function() {
    var n = ot(), r = Un.identifierPrefix;
    if (Sn) {
      var l = Gi, c = gr;
      l = (c & ~(1 << 32 - Aa(c) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Ms++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = x0++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, hn = {
    readContext: Va,
    useCallback: gl,
    useContext: Va,
    useEffect: Ls,
    useImperativeHandle: ff,
    useInsertionEffect: uf,
    useLayoutEffect: sf,
    useMemo: df,
    useReducer: Ki,
    useRef: of,
    useState: function() {
      return Ki(Ta);
    },
    useDebugValue: yu,
    useDeferredValue: function(n) {
      var r = Sr();
      return pf(r, St.memoizedState, n);
    },
    useTransition: function() {
      var n = Ki(Ta)[0], r = Sr().memoizedState;
      return [n, r];
    },
    useMutableSource: pu,
    useSyncExternalStore: ml,
    useId: vf,
    unstable_isNewReconciler: !1
  }, hf = { readContext: Va, useCallback: gl, useContext: Va, useEffect: Ls, useImperativeHandle: ff, useInsertionEffect: uf, useLayoutEffect: sf, useMemo: df, useReducer: Ba, useRef: of, useState: function() {
    return Ba(Ta);
  }, useDebugValue: yu, useDeferredValue: function(n) {
    var r = Sr();
    return St === null ? r.memoizedState = n : pf(r, St.memoizedState, n);
  }, useTransition: function() {
    var n = Ba(Ta)[0], r = Sr().memoizedState;
    return [n, r];
  }, useMutableSource: pu, useSyncExternalStore: ml, useId: vf, unstable_isNewReconciler: !1 };
  function aa(n, r) {
    if (n && n.defaultProps) {
      r = I({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Sl(n, r, l, c) {
    r = n.memoizedState, l = l(c, r), l = l == null ? r : I({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var bl = { isMounted: function(n) {
    return (n = n._reactInternals) ? it(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var c = vr(), p = Ji(n), g = ra(c, p);
    g.payload = r, l != null && (g.callback = l), r = _o(n, g, p), r !== null && (Dn(r, n, p, c), qc(r, n, p));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var c = vr(), p = Ji(n), g = ra(c, p);
    g.tag = 1, g.payload = r, l != null && (g.callback = l), r = _o(n, g, p), r !== null && (Dn(r, n, p, c), qc(r, n, p));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = vr(), c = Ji(n), p = ra(l, c);
    p.tag = 2, r != null && (p.callback = r), r = _o(n, p, c), r !== null && (Dn(r, n, c, l), qc(r, n, c));
  } };
  function um(n, r, l, c, p, g, E) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(c, g, E) : r.prototype && r.prototype.isPureReactComponent ? !ys(l, c) || !ys(p, g) : !0;
  }
  function sm(n, r, l) {
    var c = !1, p = Ti, g = r.contextType;
    return typeof g == "object" && g !== null ? g = Va(g) : (p = wn(r) ? Zr : gt.current, c = r.contextTypes, g = (c = c != null) ? Ua(n, p) : Ti), r = new r(l, g), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = bl, n.stateNode = r, r._reactInternals = n, c && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = p, n.__reactInternalMemoizedMaskedChildContext = g), r;
  }
  function cm(n, r, l, c) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, c), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, c), r.state !== n && bl.enqueueReplaceState(r, r.state, null);
  }
  function Cp(n, r, l, c) {
    var p = n.stateNode;
    p.props = l, p.state = n.memoizedState, p.refs = {}, Qc(n);
    var g = r.contextType;
    typeof g == "object" && g !== null ? p.context = Va(g) : (g = wn(r) ? Zr : gt.current, p.context = Ua(n, g)), p.state = n.memoizedState, g = r.getDerivedStateFromProps, typeof g == "function" && (Sl(n, r, g, l), p.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (r = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), r !== p.state && bl.enqueueReplaceState(p, p.state, null), Kc(n, l, p, c), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Oo(n, r) {
    try {
      var l = "", c = r;
      do
        l += ht(c), c = c.return;
      while (c);
      var p = l;
    } catch (g) {
      p = `
Error generating stack: ` + g.message + `
` + g.stack;
    }
    return { value: n, source: r, stack: p, digest: null };
  }
  function Ep(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Us(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var fm = typeof WeakMap == "function" ? WeakMap : Map;
  function dm(n, r, l) {
    l = ra(-1, l), l.tag = 3, l.payload = { element: null };
    var c = r.value;
    return l.callback = function() {
      _f || (_f = !0, Ap = c), Us(n, r);
    }, l;
  }
  function pm(n, r, l) {
    l = ra(-1, l), l.tag = 3;
    var c = n.type.getDerivedStateFromError;
    if (typeof c == "function") {
      var p = r.value;
      l.payload = function() {
        return c(p);
      }, l.callback = function() {
        Us(n, r);
      };
    }
    var g = n.stateNode;
    return g !== null && typeof g.componentDidCatch == "function" && (l.callback = function() {
      Us(n, r), typeof c != "function" && (Ya === null ? Ya = /* @__PURE__ */ new Set([this]) : Ya.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, { componentStack: E !== null ? E : "" });
    }), l;
  }
  function Fs(n, r, l) {
    var c = n.pingCache;
    if (c === null) {
      c = n.pingCache = new fm();
      var p = /* @__PURE__ */ new Set();
      c.set(r, p);
    } else p = c.get(r), p === void 0 && (p = /* @__PURE__ */ new Set(), c.set(r, p));
    p.has(l) || (p.add(l), n = z0.bind(null, n, r, l), r.then(n, n));
  }
  function vm(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Tp(n, r, l, c, p) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = p, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ra(-1, 1), r.tag = 2, _o(l, r, 1))), l.lanes |= 1), n);
  }
  var hm = le.ReactCurrentOwner, ia = !1;
  function Vn(n, r, l, c) {
    r.child = n === null ? nm(r, null, l, c) : lu(r, n.child, l, c);
  }
  function Su(n, r, l, c, p) {
    l = l.render;
    var g = r.ref;
    return uu(r, p), c = he(n, r, l, c, g, p), l = Qn(), n !== null && !ia ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Bn(n, r, p)) : (Sn && l && Bc(r), r.flags |= 1, Vn(n, r, c, p), r.child);
  }
  function Do(n, r, l, c, p) {
    if (n === null) {
      var g = l.type;
      return typeof g == "function" && !Up(g) && g.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = g, mf(n, r, g, c, p)) : (n = Nf(l.type, null, c, r, r.mode, p), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (g = n.child, !(n.lanes & p)) {
      var E = g.memoizedProps;
      if (l = l.compare, l = l !== null ? l : ys, l(E, c) && n.ref === r.ref) return Bn(n, r, p);
    }
    return r.flags |= 1, n = No(g, c), n.ref = r.ref, n.return = r, r.child = n;
  }
  function mf(n, r, l, c, p) {
    if (n !== null) {
      var g = n.memoizedProps;
      if (ys(g, c) && n.ref === r.ref) if (ia = !1, r.pendingProps = c = g, (n.lanes & p) !== 0) n.flags & 131072 && (ia = !0);
      else return r.lanes = n.lanes, Bn(n, r, p);
    }
    return Rt(n, r, l, c, p);
  }
  function oa(n, r, l) {
    var c = r.pendingProps, p = c.children, g = n !== null ? n.memoizedState : null;
    if (c.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, qt(Ou, la), la |= l;
    else {
      if (!(l & 1073741824)) return n = g !== null ? g.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, qt(Ou, la), la |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, c = g !== null ? g.baseLanes : l, qt(Ou, la), la |= c;
    }
    else g !== null ? (c = g.baseLanes | l, r.memoizedState = null) : c = l, qt(Ou, la), la |= c;
    return Vn(n, r, p, l), r.child;
  }
  function Cl(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Rt(n, r, l, c, p) {
    var g = wn(l) ? Zr : gt.current;
    return g = Ua(r, g), uu(r, p), l = he(n, r, l, c, g, p), c = Qn(), n !== null && !ia ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Bn(n, r, p)) : (Sn && c && Bc(r), r.flags |= 1, Vn(n, r, l, p), r.child);
  }
  function Ps(n, r, l, c, p) {
    if (wn(l)) {
      var g = !0;
      Vc(r);
    } else g = !1;
    if (uu(r, p), r.stateNode === null) $s(n, r), sm(r, l, c), Cp(r, l, c, p), c = !0;
    else if (n === null) {
      var E = r.stateNode, D = r.memoizedProps;
      E.props = D;
      var L = E.context, J = l.contextType;
      typeof J == "object" && J !== null ? J = Va(J) : (J = wn(l) ? Zr : gt.current, J = Ua(r, J));
      var ye = l.getDerivedStateFromProps, Ce = typeof ye == "function" || typeof E.getSnapshotBeforeUpdate == "function";
      Ce || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (D !== c || L !== J) && cm(r, E, c, J), Ro = !1;
      var me = r.memoizedState;
      E.state = me, Kc(r, c, E, p), L = r.memoizedState, D !== c || me !== L || Ln.current || Ro ? (typeof ye == "function" && (Sl(r, l, ye, c), L = r.memoizedState), (D = Ro || um(r, l, D, c, me, L, J)) ? (Ce || typeof E.UNSAFE_componentWillMount != "function" && typeof E.componentWillMount != "function" || (typeof E.componentWillMount == "function" && E.componentWillMount(), typeof E.UNSAFE_componentWillMount == "function" && E.UNSAFE_componentWillMount()), typeof E.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = c, r.memoizedState = L), E.props = c, E.state = L, E.context = J, c = D) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), c = !1);
    } else {
      E = r.stateNode, su(n, r), D = r.memoizedProps, J = r.type === r.elementType ? D : aa(r.type, D), E.props = J, Ce = r.pendingProps, me = E.context, L = l.contextType, typeof L == "object" && L !== null ? L = Va(L) : (L = wn(l) ? Zr : gt.current, L = Ua(r, L));
      var je = l.getDerivedStateFromProps;
      (ye = typeof je == "function" || typeof E.getSnapshotBeforeUpdate == "function") || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (D !== Ce || me !== L) && cm(r, E, c, L), Ro = !1, me = r.memoizedState, E.state = me, Kc(r, c, E, p);
      var Ye = r.memoizedState;
      D !== Ce || me !== Ye || Ln.current || Ro ? (typeof je == "function" && (Sl(r, l, je, c), Ye = r.memoizedState), (J = Ro || um(r, l, J, c, me, Ye, L) || !1) ? (ye || typeof E.UNSAFE_componentWillUpdate != "function" && typeof E.componentWillUpdate != "function" || (typeof E.componentWillUpdate == "function" && E.componentWillUpdate(c, Ye, L), typeof E.UNSAFE_componentWillUpdate == "function" && E.UNSAFE_componentWillUpdate(c, Ye, L)), typeof E.componentDidUpdate == "function" && (r.flags |= 4), typeof E.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof E.componentDidUpdate != "function" || D === n.memoizedProps && me === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || D === n.memoizedProps && me === n.memoizedState || (r.flags |= 1024), r.memoizedProps = c, r.memoizedState = Ye), E.props = c, E.state = Ye, E.context = L, c = J) : (typeof E.componentDidUpdate != "function" || D === n.memoizedProps && me === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || D === n.memoizedProps && me === n.memoizedState || (r.flags |= 1024), c = !1);
    }
    return yf(n, r, l, c, g, p);
  }
  function yf(n, r, l, c, p, g) {
    Cl(n, r);
    var E = (r.flags & 128) !== 0;
    if (!c && !E) return p && Xh(r, l, !1), Bn(n, r, g);
    c = r.stateNode, hm.current = r;
    var D = E && typeof l.getDerivedStateFromError != "function" ? null : c.render();
    return r.flags |= 1, n !== null && E ? (r.child = lu(r, n.child, null, g), r.child = lu(r, null, D, g)) : Vn(n, r, D, g), r.memoizedState = c.state, p && Xh(r, l, !0), r.child;
  }
  function R0(n) {
    var r = n.stateNode;
    r.pendingContext ? xo(n, r.pendingContext, r.pendingContext !== r.context) : r.context && xo(n, r.context, !1), mp(n, r.containerInfo);
  }
  function mm(n, r, l, c, p) {
    return On(), pp(p), r.flags |= 256, Vn(n, r, l, c), r.child;
  }
  var js = { dehydrated: null, treeContext: null, retryLane: 0 };
  function El(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ym(n, r, l) {
    var c = r.pendingProps, p = Rn.current, g = !1, E = (r.flags & 128) !== 0, D;
    if ((D = E) || (D = n !== null && n.memoizedState === null ? !1 : (p & 2) !== 0), D ? (g = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (p |= 1), qt(Rn, p & 1), n === null)
      return Ic(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (E = c.children, n = c.fallback, g ? (c = r.mode, g = r.child, E = { mode: "hidden", children: E }, !(c & 1) && g !== null ? (g.childLanes = 0, g.pendingProps = E) : g = Lf(E, c, 0, null), n = kl(n, c, l, null), g.return = r, n.return = r, g.sibling = n, r.child = g, r.child.memoizedState = El(l), r.memoizedState = js, n) : gf(r, E));
    if (p = n.memoizedState, p !== null && (D = p.dehydrated, D !== null)) return xp(n, r, E, c, D, p, l);
    if (g) {
      g = c.fallback, E = r.mode, p = n.child, D = p.sibling;
      var L = { mode: "hidden", children: c.children };
      return !(E & 1) && r.child !== p ? (c = r.child, c.childLanes = 0, c.pendingProps = L, r.deletions = null) : (c = No(p, L), c.subtreeFlags = p.subtreeFlags & 14680064), D !== null ? g = No(D, g) : (g = kl(g, E, l, null), g.flags |= 2), g.return = r, c.return = r, c.sibling = g, r.child = c, c = g, g = r.child, E = n.child.memoizedState, E = E === null ? El(l) : { baseLanes: E.baseLanes | l, cachePool: null, transitions: E.transitions }, g.memoizedState = E, g.childLanes = n.childLanes & ~l, r.memoizedState = js, c;
    }
    return g = n.child, n = g.sibling, c = No(g, { mode: "visible", children: c.children }), !(r.mode & 1) && (c.lanes = l), c.return = r, c.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = c, r.memoizedState = null, c;
  }
  function gf(n, r) {
    return r = Lf({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Sf(n, r, l, c) {
    return c !== null && pp(c), lu(r, n.child, null, l), n = gf(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function xp(n, r, l, c, p, g, E) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, c = Ep(Error(f(422))), Sf(n, r, E, c)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (g = c.fallback, p = r.mode, c = Lf({ mode: "visible", children: c.children }, p, 0, null), g = kl(g, p, E, null), g.flags |= 2, c.return = r, g.return = r, c.sibling = g, r.child = c, r.mode & 1 && lu(r, n.child, null, E), r.child.memoizedState = El(E), r.memoizedState = js, g);
    if (!(r.mode & 1)) return Sf(n, r, E, null);
    if (p.data === "$!") {
      if (c = p.nextSibling && p.nextSibling.dataset, c) var D = c.dgst;
      return c = D, g = Error(f(419)), c = Ep(g, c, void 0), Sf(n, r, E, c);
    }
    if (D = (E & n.childLanes) !== 0, ia || D) {
      if (c = Un, c !== null) {
        switch (E & -E) {
          case 4:
            p = 2;
            break;
          case 16:
            p = 8;
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
            p = 32;
            break;
          case 536870912:
            p = 268435456;
            break;
          default:
            p = 0;
        }
        p = p & (c.suspendedLanes | E) ? 0 : p, p !== 0 && p !== g.retryLane && (g.retryLane = p, qi(n, p), Dn(c, n, p, -1));
      }
      return Ys(), c = Ep(Error(f(421))), Sf(n, r, E, c);
    }
    return p.data === "$?" ? (r.flags |= 128, r.child = n.child, r = zp.bind(null, n), p._reactRetry = r, null) : (n = g.treeContext, na = ci(p.nextSibling), ba = r, Sn = !0, ja = null, n !== null && (ta[Mr++] = gr, ta[Mr++] = Gi, ta[Mr++] = Pa, gr = n.id, Gi = n.overflow, Pa = r), r = gf(r, c.children), r.flags |= 4096, r);
  }
  function gm(n, r, l) {
    n.lanes |= r;
    var c = n.alternate;
    c !== null && (c.lanes |= r), hp(n.return, r, l);
  }
  function bf(n, r, l, c, p) {
    var g = n.memoizedState;
    g === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: c, tail: l, tailMode: p } : (g.isBackwards = r, g.rendering = null, g.renderingStartTime = 0, g.last = c, g.tail = l, g.tailMode = p);
  }
  function wp(n, r, l) {
    var c = r.pendingProps, p = c.revealOrder, g = c.tail;
    if (Vn(n, r, c.children, l), c = Rn.current, c & 2) c = c & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && gm(n, l, r);
        else if (n.tag === 19) gm(n, l, r);
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
      c &= 1;
    }
    if (qt(Rn, c), !(r.mode & 1)) r.memoizedState = null;
    else switch (p) {
      case "forwards":
        for (l = r.child, p = null; l !== null; ) n = l.alternate, n !== null && Xc(n) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = r.child, r.child = null) : (p = l.sibling, l.sibling = null), bf(r, !1, p, l, g);
        break;
      case "backwards":
        for (l = null, p = r.child, r.child = null; p !== null; ) {
          if (n = p.alternate, n !== null && Xc(n) === null) {
            r.child = p;
            break;
          }
          n = p.sibling, p.sibling = l, l = p, p = n;
        }
        bf(r, !0, l, null, g);
        break;
      case "together":
        bf(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function $s(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Bn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), xl |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(f(153));
    if (r.child !== null) {
      for (n = r.child, l = No(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = No(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Xi(n, r, l) {
    switch (r.tag) {
      case 3:
        R0(r), On();
        break;
      case 5:
        om(r);
        break;
      case 1:
        wn(r.type) && Vc(r);
        break;
      case 4:
        mp(r, r.stateNode.containerInfo);
        break;
      case 10:
        var c = r.type._context, p = r.memoizedProps.value;
        qt(Qi, c._currentValue), c._currentValue = p;
        break;
      case 13:
        if (c = r.memoizedState, c !== null)
          return c.dehydrated !== null ? (qt(Rn, Rn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ym(n, r, l) : (qt(Rn, Rn.current & 1), n = Bn(n, r, l), n !== null ? n.sibling : null);
        qt(Rn, Rn.current & 1);
        break;
      case 19:
        if (c = (l & r.childLanes) !== 0, n.flags & 128) {
          if (c) return wp(n, r, l);
          r.flags |= 128;
        }
        if (p = r.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), qt(Rn, Rn.current), c) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, oa(n, r, l);
    }
    return Bn(n, r, l);
  }
  var wi, bu, Cu, Ha;
  wi = function(n, r) {
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
  }, bu = function() {
  }, Cu = function(n, r, l, c) {
    var p = n.memoizedProps;
    if (p !== c) {
      n = r.stateNode, hl(fi.current);
      var g = null;
      switch (l) {
        case "input":
          p = Le(n, p), c = Le(n, c), g = [];
          break;
        case "select":
          p = I({}, p, { value: void 0 }), c = I({}, c, { value: void 0 }), g = [];
          break;
        case "textarea":
          p = Te(n, p), c = Te(n, c), g = [];
          break;
        default:
          typeof p.onClick != "function" && typeof c.onClick == "function" && (n.onclick = $c);
      }
      lr(l, c);
      var E;
      l = null;
      for (J in p) if (!c.hasOwnProperty(J) && p.hasOwnProperty(J) && p[J] != null) if (J === "style") {
        var D = p[J];
        for (E in D) D.hasOwnProperty(E) && (l || (l = {}), l[E] = "");
      } else J !== "dangerouslySetInnerHTML" && J !== "children" && J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && J !== "autoFocus" && (m.hasOwnProperty(J) ? g || (g = []) : (g = g || []).push(J, null));
      for (J in c) {
        var L = c[J];
        if (D = p != null ? p[J] : void 0, c.hasOwnProperty(J) && L !== D && (L != null || D != null)) if (J === "style") if (D) {
          for (E in D) !D.hasOwnProperty(E) || L && L.hasOwnProperty(E) || (l || (l = {}), l[E] = "");
          for (E in L) L.hasOwnProperty(E) && D[E] !== L[E] && (l || (l = {}), l[E] = L[E]);
        } else l || (g || (g = []), g.push(
          J,
          l
        )), l = L;
        else J === "dangerouslySetInnerHTML" ? (L = L ? L.__html : void 0, D = D ? D.__html : void 0, L != null && D !== L && (g = g || []).push(J, L)) : J === "children" ? typeof L != "string" && typeof L != "number" || (g = g || []).push(J, "" + L) : J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && (m.hasOwnProperty(J) ? (L != null && J === "onScroll" && fn("scroll", n), g || D === L || (g = [])) : (g = g || []).push(J, L));
      }
      l && (g = g || []).push("style", l);
      var J = g;
      (r.updateQueue = J) && (r.flags |= 4);
    }
  }, Ha = function(n, r, l, c) {
    l !== c && (r.flags |= 4);
  };
  function zn(n, r) {
    if (!Sn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var c = null; l !== null; ) l.alternate !== null && (c = l), l = l.sibling;
        c === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : c.sibling = null;
    }
  }
  function zr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, c = 0;
    if (r) for (var p = n.child; p !== null; ) l |= p.lanes | p.childLanes, c |= p.subtreeFlags & 14680064, c |= p.flags & 14680064, p.return = n, p = p.sibling;
    else for (p = n.child; p !== null; ) l |= p.lanes | p.childLanes, c |= p.subtreeFlags, c |= p.flags, p.return = n, p = p.sibling;
    return n.subtreeFlags |= c, n.childLanes = l, r;
  }
  function _0(n, r, l) {
    var c = r.pendingProps;
    switch (fp(r), r.tag) {
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
        return zr(r), null;
      case 1:
        return wn(r.type) && Fa(), zr(r), null;
      case 3:
        return c = r.stateNode, fu(), Gt(Ln), Gt(gt), gp(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), (n === null || n.child === null) && (Yc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, ja !== null && (Mp(ja), ja = null))), bu(n, r), zr(r), null;
      case 5:
        yp(r);
        var p = hl(Ds.current);
        if (l = r.type, n !== null && r.stateNode != null) Cu(n, r, l, c, p), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!c) {
            if (r.stateNode === null) throw Error(f(166));
            return zr(r), null;
          }
          if (n = hl(fi.current), Yc(r)) {
            c = r.stateNode, l = r.type;
            var g = r.memoizedProps;
            switch (c[Ei] = r, c[fl] = g, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                fn("cancel", c), fn("close", c);
                break;
              case "iframe":
              case "object":
              case "embed":
                fn("load", c);
                break;
              case "video":
              case "audio":
                for (p = 0; p < Cs.length; p++) fn(Cs[p], c);
                break;
              case "source":
                fn("error", c);
                break;
              case "img":
              case "image":
              case "link":
                fn(
                  "error",
                  c
                ), fn("load", c);
                break;
              case "details":
                fn("toggle", c);
                break;
              case "input":
                Xt(c, g), fn("invalid", c);
                break;
              case "select":
                c._wrapperState = { wasMultiple: !!g.multiple }, fn("invalid", c);
                break;
              case "textarea":
                te(c, g), fn("invalid", c);
            }
            lr(l, g), p = null;
            for (var E in g) if (g.hasOwnProperty(E)) {
              var D = g[E];
              E === "children" ? typeof D == "string" ? c.textContent !== D && (g.suppressHydrationWarning !== !0 && jc(c.textContent, D, n), p = ["children", D]) : typeof D == "number" && c.textContent !== "" + D && (g.suppressHydrationWarning !== !0 && jc(
                c.textContent,
                D,
                n
              ), p = ["children", "" + D]) : m.hasOwnProperty(E) && D != null && E === "onScroll" && fn("scroll", c);
            }
            switch (l) {
              case "input":
                zt(c), A(c, g, !0);
                break;
              case "textarea":
                zt(c), Et(c);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof g.onClick == "function" && (c.onclick = $c);
            }
            c = p, r.updateQueue = c, c !== null && (r.flags |= 4);
          } else {
            E = p.nodeType === 9 ? p : p.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Bt(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = E.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof c.is == "string" ? n = E.createElement(l, { is: c.is }) : (n = E.createElement(l), l === "select" && (E = n, c.multiple ? E.multiple = !0 : c.size && (E.size = c.size))) : n = E.createElementNS(n, l), n[Ei] = r, n[fl] = c, wi(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (E = $n(l, c), l) {
                case "dialog":
                  fn("cancel", n), fn("close", n), p = c;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  fn("load", n), p = c;
                  break;
                case "video":
                case "audio":
                  for (p = 0; p < Cs.length; p++) fn(Cs[p], n);
                  p = c;
                  break;
                case "source":
                  fn("error", n), p = c;
                  break;
                case "img":
                case "image":
                case "link":
                  fn(
                    "error",
                    n
                  ), fn("load", n), p = c;
                  break;
                case "details":
                  fn("toggle", n), p = c;
                  break;
                case "input":
                  Xt(n, c), p = Le(n, c), fn("invalid", n);
                  break;
                case "option":
                  p = c;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!c.multiple }, p = I({}, c, { value: void 0 }), fn("invalid", n);
                  break;
                case "textarea":
                  te(n, c), p = Te(n, c), fn("invalid", n);
                  break;
                default:
                  p = c;
              }
              lr(l, p), D = p;
              for (g in D) if (D.hasOwnProperty(g)) {
                var L = D[g];
                g === "style" ? Wt(n, L) : g === "dangerouslySetInnerHTML" ? (L = L ? L.__html : void 0, L != null && Si(n, L)) : g === "children" ? typeof L == "string" ? (l !== "textarea" || L !== "") && Fr(n, L) : typeof L == "number" && Fr(n, "" + L) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (m.hasOwnProperty(g) ? L != null && g === "onScroll" && fn("scroll", n) : L != null && X(n, g, L, E));
              }
              switch (l) {
                case "input":
                  zt(n), A(n, c, !1);
                  break;
                case "textarea":
                  zt(n), Et(n);
                  break;
                case "option":
                  c.value != null && n.setAttribute("value", "" + rt(c.value));
                  break;
                case "select":
                  n.multiple = !!c.multiple, g = c.value, g != null ? _e(n, !!c.multiple, g, !1) : c.defaultValue != null && _e(
                    n,
                    !!c.multiple,
                    c.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof p.onClick == "function" && (n.onclick = $c);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  c = !!c.autoFocus;
                  break e;
                case "img":
                  c = !0;
                  break e;
                default:
                  c = !1;
              }
            }
            c && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return zr(r), null;
      case 6:
        if (n && r.stateNode != null) Ha(n, r, n.memoizedProps, c);
        else {
          if (typeof c != "string" && r.stateNode === null) throw Error(f(166));
          if (l = hl(Ds.current), hl(fi.current), Yc(r)) {
            if (c = r.stateNode, l = r.memoizedProps, c[Ei] = r, (g = c.nodeValue !== l) && (n = ba, n !== null)) switch (n.tag) {
              case 3:
                jc(c.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && jc(c.nodeValue, l, (n.mode & 1) !== 0);
            }
            g && (r.flags |= 4);
          } else c = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(c), c[Ei] = r, r.stateNode = c;
        }
        return zr(r), null;
      case 13:
        if (Gt(Rn), c = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Sn && na !== null && r.mode & 1 && !(r.flags & 128)) em(), On(), r.flags |= 98560, g = !1;
          else if (g = Yc(r), c !== null && c.dehydrated !== null) {
            if (n === null) {
              if (!g) throw Error(f(318));
              if (g = r.memoizedState, g = g !== null ? g.dehydrated : null, !g) throw Error(f(317));
              g[Ei] = r;
            } else On(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            zr(r), g = !1;
          } else ja !== null && (Mp(ja), ja = null), g = !0;
          if (!g) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (c = c !== null, c !== (n !== null && n.memoizedState !== null) && c && (r.child.flags |= 8192, r.mode & 1 && (n === null || Rn.current & 1 ? tr === 0 && (tr = 3) : Ys())), r.updateQueue !== null && (r.flags |= 4), zr(r), null);
      case 4:
        return fu(), bu(n, r), n === null && au(r.stateNode.containerInfo), zr(r), null;
      case 10:
        return vp(r.type._context), zr(r), null;
      case 17:
        return wn(r.type) && Fa(), zr(r), null;
      case 19:
        if (Gt(Rn), g = r.memoizedState, g === null) return zr(r), null;
        if (c = (r.flags & 128) !== 0, E = g.rendering, E === null) if (c) zn(g, !1);
        else {
          if (tr !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (E = Xc(n), E !== null) {
              for (r.flags |= 128, zn(g, !1), c = E.updateQueue, c !== null && (r.updateQueue = c, r.flags |= 4), r.subtreeFlags = 0, c = l, l = r.child; l !== null; ) g = l, n = c, g.flags &= 14680066, E = g.alternate, E === null ? (g.childLanes = 0, g.lanes = n, g.child = null, g.subtreeFlags = 0, g.memoizedProps = null, g.memoizedState = null, g.updateQueue = null, g.dependencies = null, g.stateNode = null) : (g.childLanes = E.childLanes, g.lanes = E.lanes, g.child = E.child, g.subtreeFlags = 0, g.deletions = null, g.memoizedProps = E.memoizedProps, g.memoizedState = E.memoizedState, g.updateQueue = E.updateQueue, g.type = E.type, n = E.dependencies, g.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return qt(Rn, Rn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          g.tail !== null && Qt() > Au && (r.flags |= 128, c = !0, zn(g, !1), r.lanes = 4194304);
        }
        else {
          if (!c) if (n = Xc(E), n !== null) {
            if (r.flags |= 128, c = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), zn(g, !0), g.tail === null && g.tailMode === "hidden" && !E.alternate && !Sn) return zr(r), null;
          } else 2 * Qt() - g.renderingStartTime > Au && l !== 1073741824 && (r.flags |= 128, c = !0, zn(g, !1), r.lanes = 4194304);
          g.isBackwards ? (E.sibling = r.child, r.child = E) : (l = g.last, l !== null ? l.sibling = E : r.child = E, g.last = E);
        }
        return g.tail !== null ? (r = g.tail, g.rendering = r, g.tail = r.sibling, g.renderingStartTime = Qt(), r.sibling = null, l = Rn.current, qt(Rn, c ? l & 1 | 2 : l & 1), r) : (zr(r), null);
      case 22:
      case 23:
        return Af(), c = r.memoizedState !== null, n !== null && n.memoizedState !== null !== c && (r.flags |= 8192), c && r.mode & 1 ? la & 1073741824 && (zr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : zr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(f(156, r.tag));
  }
  function k0(n, r) {
    switch (fp(r), r.tag) {
      case 1:
        return wn(r.type) && Fa(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return fu(), Gt(Ln), Gt(gt), gp(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return yp(r), null;
      case 13:
        if (Gt(Rn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(f(340));
          On();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Gt(Rn), null;
      case 4:
        return fu(), null;
      case 10:
        return vp(r.type._context), null;
      case 22:
      case 23:
        return Af(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Eu = !1, br = !1, Cf = typeof WeakSet == "function" ? WeakSet : Set, He = null;
  function Tu(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (c) {
      Fn(n, r, c);
    }
    else l.current = null;
  }
  function Rp(n, r, l) {
    try {
      l();
    } catch (c) {
      Fn(n, r, c);
    }
  }
  var Ef = !1;
  function O0(n, r) {
    if (rp = al, n = Lc(), Hi(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var c = l.getSelection && l.getSelection();
        if (c && c.rangeCount !== 0) {
          l = c.anchorNode;
          var p = c.anchorOffset, g = c.focusNode;
          c = c.focusOffset;
          try {
            l.nodeType, g.nodeType;
          } catch {
            l = null;
            break e;
          }
          var E = 0, D = -1, L = -1, J = 0, ye = 0, Ce = n, me = null;
          t: for (; ; ) {
            for (var je; Ce !== l || p !== 0 && Ce.nodeType !== 3 || (D = E + p), Ce !== g || c !== 0 && Ce.nodeType !== 3 || (L = E + c), Ce.nodeType === 3 && (E += Ce.nodeValue.length), (je = Ce.firstChild) !== null; )
              me = Ce, Ce = je;
            for (; ; ) {
              if (Ce === n) break t;
              if (me === l && ++J === p && (D = E), me === g && ++ye === c && (L = E), (je = Ce.nextSibling) !== null) break;
              Ce = me, me = Ce.parentNode;
            }
            Ce = je;
          }
          l = D === -1 || L === -1 ? null : { start: D, end: L };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (sl = { focusedElem: n, selectionRange: l }, al = !1, He = r; He !== null; ) if (r = He, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, He = n;
    else for (; He !== null; ) {
      r = He;
      try {
        var Ye = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Ye !== null) {
              var qe = Ye.memoizedProps, Hn = Ye.memoizedState, Y = r.stateNode, P = Y.getSnapshotBeforeUpdate(r.elementType === r.type ? qe : aa(r.type, qe), Hn);
              Y.__reactInternalSnapshotBeforeUpdate = P;
            }
            break;
          case 3:
            var q = r.stateNode.containerInfo;
            q.nodeType === 1 ? q.textContent = "" : q.nodeType === 9 && q.documentElement && q.removeChild(q.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(f(163));
        }
      } catch (xe) {
        Fn(r, r.return, xe);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, He = n;
        break;
      }
      He = r.return;
    }
    return Ye = Ef, Ef = !1, Ye;
  }
  function xu(n, r, l) {
    var c = r.updateQueue;
    if (c = c !== null ? c.lastEffect : null, c !== null) {
      var p = c = c.next;
      do {
        if ((p.tag & n) === n) {
          var g = p.destroy;
          p.destroy = void 0, g !== void 0 && Rp(r, l, g);
        }
        p = p.next;
      } while (p !== c);
    }
  }
  function Tf(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var c = l.create;
          l.destroy = c();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function xf(n) {
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
  function Sm(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Sm(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ei], delete r[fl], delete r[op], delete r[T0], delete r[lp])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function _p(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function bm(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || _p(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Vs(n, r, l) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = $c));
    else if (c !== 4 && (n = n.child, n !== null)) for (Vs(n, r, l), n = n.sibling; n !== null; ) Vs(n, r, l), n = n.sibling;
  }
  function wu(n, r, l) {
    var c = n.tag;
    if (c === 5 || c === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (c !== 4 && (n = n.child, n !== null)) for (wu(n, r, l), n = n.sibling; n !== null; ) wu(n, r, l), n = n.sibling;
  }
  var _n = null, dr = !1;
  function Pr(n, r, l) {
    for (l = l.child; l !== null; ) Ru(n, r, l), l = l.sibling;
  }
  function Ru(n, r, l) {
    if (ii && typeof ii.onCommitFiberUnmount == "function") try {
      ii.onCommitFiberUnmount(is, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        br || Tu(l, r);
      case 6:
        var c = _n, p = dr;
        _n = null, Pr(n, r, l), _n = c, dr = p, _n !== null && (dr ? (n = _n, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : _n.removeChild(l.stateNode));
        break;
      case 18:
        _n !== null && (dr ? (n = _n, l = l.stateNode, n.nodeType === 8 ? Co(n.parentNode, l) : n.nodeType === 1 && Co(n, l), cs(n)) : Co(_n, l.stateNode));
        break;
      case 4:
        c = _n, p = dr, _n = l.stateNode.containerInfo, dr = !0, Pr(n, r, l), _n = c, dr = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!br && (c = l.updateQueue, c !== null && (c = c.lastEffect, c !== null))) {
          p = c = c.next;
          do {
            var g = p, E = g.destroy;
            g = g.tag, E !== void 0 && (g & 2 || g & 4) && Rp(l, r, E), p = p.next;
          } while (p !== c);
        }
        Pr(n, r, l);
        break;
      case 1:
        if (!br && (Tu(l, r), c = l.stateNode, typeof c.componentWillUnmount == "function")) try {
          c.props = l.memoizedProps, c.state = l.memoizedState, c.componentWillUnmount();
        } catch (D) {
          Fn(l, r, D);
        }
        Pr(n, r, l);
        break;
      case 21:
        Pr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (br = (c = br) || l.memoizedState !== null, Pr(n, r, l), br = c) : Pr(n, r, l);
        break;
      default:
        Pr(n, r, l);
    }
  }
  function _u(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new Cf()), r.forEach(function(c) {
        var p = U0.bind(null, n, c);
        l.has(c) || (l.add(c), c.then(p, p));
      });
    }
  }
  function pr(n, r) {
    var l = r.deletions;
    if (l !== null) for (var c = 0; c < l.length; c++) {
      var p = l[c];
      try {
        var g = n, E = r, D = E;
        e: for (; D !== null; ) {
          switch (D.tag) {
            case 5:
              _n = D.stateNode, dr = !1;
              break e;
            case 3:
              _n = D.stateNode.containerInfo, dr = !0;
              break e;
            case 4:
              _n = D.stateNode.containerInfo, dr = !0;
              break e;
          }
          D = D.return;
        }
        if (_n === null) throw Error(f(160));
        Ru(g, E, p), _n = null, dr = !1;
        var L = p.alternate;
        L !== null && (L.return = null), p.return = null;
      } catch (J) {
        Fn(p, r, J);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Cm(r, n), r = r.sibling;
  }
  function Cm(n, r) {
    var l = n.alternate, c = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (pr(r, n), Ri(n), c & 4) {
          try {
            xu(3, n, n.return), Tf(3, n);
          } catch (qe) {
            Fn(n, n.return, qe);
          }
          try {
            xu(5, n, n.return);
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 1:
        pr(r, n), Ri(n), c & 512 && l !== null && Tu(l, l.return);
        break;
      case 5:
        if (pr(r, n), Ri(n), c & 512 && l !== null && Tu(l, l.return), n.flags & 32) {
          var p = n.stateNode;
          try {
            Fr(p, "");
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        if (c & 4 && (p = n.stateNode, p != null)) {
          var g = n.memoizedProps, E = l !== null ? l.memoizedProps : g, D = n.type, L = n.updateQueue;
          if (n.updateQueue = null, L !== null) try {
            D === "input" && g.type === "radio" && g.name != null && mn(p, g), $n(D, E);
            var J = $n(D, g);
            for (E = 0; E < L.length; E += 2) {
              var ye = L[E], Ce = L[E + 1];
              ye === "style" ? Wt(p, Ce) : ye === "dangerouslySetInnerHTML" ? Si(p, Ce) : ye === "children" ? Fr(p, Ce) : X(p, ye, Ce, J);
            }
            switch (D) {
              case "input":
                Nn(p, g);
                break;
              case "textarea":
                Ve(p, g);
                break;
              case "select":
                var me = p._wrapperState.wasMultiple;
                p._wrapperState.wasMultiple = !!g.multiple;
                var je = g.value;
                je != null ? _e(p, !!g.multiple, je, !1) : me !== !!g.multiple && (g.defaultValue != null ? _e(
                  p,
                  !!g.multiple,
                  g.defaultValue,
                  !0
                ) : _e(p, !!g.multiple, g.multiple ? [] : "", !1));
            }
            p[fl] = g;
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 6:
        if (pr(r, n), Ri(n), c & 4) {
          if (n.stateNode === null) throw Error(f(162));
          p = n.stateNode, g = n.memoizedProps;
          try {
            p.nodeValue = g;
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 3:
        if (pr(r, n), Ri(n), c & 4 && l !== null && l.memoizedState.isDehydrated) try {
          cs(r.containerInfo);
        } catch (qe) {
          Fn(n, n.return, qe);
        }
        break;
      case 4:
        pr(r, n), Ri(n);
        break;
      case 13:
        pr(r, n), Ri(n), p = n.child, p.flags & 8192 && (g = p.memoizedState !== null, p.stateNode.isHidden = g, !g || p.alternate !== null && p.alternate.memoizedState !== null || (Rf = Qt())), c & 4 && _u(n);
        break;
      case 22:
        if (ye = l !== null && l.memoizedState !== null, n.mode & 1 ? (br = (J = br) || ye, pr(r, n), br = J) : pr(r, n), Ri(n), c & 8192) {
          if (J = n.memoizedState !== null, (n.stateNode.isHidden = J) && !ye && n.mode & 1) for (He = n, ye = n.child; ye !== null; ) {
            for (Ce = He = ye; He !== null; ) {
              switch (me = He, je = me.child, me.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  xu(4, me, me.return);
                  break;
                case 1:
                  Tu(me, me.return);
                  var Ye = me.stateNode;
                  if (typeof Ye.componentWillUnmount == "function") {
                    c = me, l = me.return;
                    try {
                      r = c, Ye.props = r.memoizedProps, Ye.state = r.memoizedState, Ye.componentWillUnmount();
                    } catch (qe) {
                      Fn(c, l, qe);
                    }
                  }
                  break;
                case 5:
                  Tu(me, me.return);
                  break;
                case 22:
                  if (me.memoizedState !== null) {
                    Em(Ce);
                    continue;
                  }
              }
              je !== null ? (je.return = me, He = je) : Em(Ce);
            }
            ye = ye.sibling;
          }
          e: for (ye = null, Ce = n; ; ) {
            if (Ce.tag === 5) {
              if (ye === null) {
                ye = Ce;
                try {
                  p = Ce.stateNode, J ? (g = p.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none") : (D = Ce.stateNode, L = Ce.memoizedProps.style, E = L != null && L.hasOwnProperty("display") ? L.display : null, D.style.display = kt("display", E));
                } catch (qe) {
                  Fn(n, n.return, qe);
                }
              }
            } else if (Ce.tag === 6) {
              if (ye === null) try {
                Ce.stateNode.nodeValue = J ? "" : Ce.memoizedProps;
              } catch (qe) {
                Fn(n, n.return, qe);
              }
            } else if ((Ce.tag !== 22 && Ce.tag !== 23 || Ce.memoizedState === null || Ce === n) && Ce.child !== null) {
              Ce.child.return = Ce, Ce = Ce.child;
              continue;
            }
            if (Ce === n) break e;
            for (; Ce.sibling === null; ) {
              if (Ce.return === null || Ce.return === n) break e;
              ye === Ce && (ye = null), Ce = Ce.return;
            }
            ye === Ce && (ye = null), Ce.sibling.return = Ce.return, Ce = Ce.sibling;
          }
        }
        break;
      case 19:
        pr(r, n), Ri(n), c & 4 && _u(n);
        break;
      case 21:
        break;
      default:
        pr(
          r,
          n
        ), Ri(n);
    }
  }
  function Ri(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (_p(l)) {
              var c = l;
              break e;
            }
            l = l.return;
          }
          throw Error(f(160));
        }
        switch (c.tag) {
          case 5:
            var p = c.stateNode;
            c.flags & 32 && (Fr(p, ""), c.flags &= -33);
            var g = bm(n);
            wu(n, g, p);
            break;
          case 3:
          case 4:
            var E = c.stateNode.containerInfo, D = bm(n);
            Vs(n, D, E);
            break;
          default:
            throw Error(f(161));
        }
      } catch (L) {
        Fn(n, n.return, L);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function D0(n, r, l) {
    He = n, kp(n);
  }
  function kp(n, r, l) {
    for (var c = (n.mode & 1) !== 0; He !== null; ) {
      var p = He, g = p.child;
      if (p.tag === 22 && c) {
        var E = p.memoizedState !== null || Eu;
        if (!E) {
          var D = p.alternate, L = D !== null && D.memoizedState !== null || br;
          D = Eu;
          var J = br;
          if (Eu = E, (br = L) && !J) for (He = p; He !== null; ) E = He, L = E.child, E.tag === 22 && E.memoizedState !== null ? Op(p) : L !== null ? (L.return = E, He = L) : Op(p);
          for (; g !== null; ) He = g, kp(g), g = g.sibling;
          He = p, Eu = D, br = J;
        }
        ku(n);
      } else p.subtreeFlags & 8772 && g !== null ? (g.return = p, He = g) : ku(n);
    }
  }
  function ku(n) {
    for (; He !== null; ) {
      var r = He;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              br || Tf(5, r);
              break;
            case 1:
              var c = r.stateNode;
              if (r.flags & 4 && !br) if (l === null) c.componentDidMount();
              else {
                var p = r.elementType === r.type ? l.memoizedProps : aa(r.type, l.memoizedProps);
                c.componentDidUpdate(p, l.memoizedState, c.__reactInternalSnapshotBeforeUpdate);
              }
              var g = r.updateQueue;
              g !== null && im(r, g, c);
              break;
            case 3:
              var E = r.updateQueue;
              if (E !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                im(r, E, l);
              }
              break;
            case 5:
              var D = r.stateNode;
              if (l === null && r.flags & 4) {
                l = D;
                var L = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    L.autoFocus && l.focus();
                    break;
                  case "img":
                    L.src && (l.src = L.src);
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
                var J = r.alternate;
                if (J !== null) {
                  var ye = J.memoizedState;
                  if (ye !== null) {
                    var Ce = ye.dehydrated;
                    Ce !== null && cs(Ce);
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
              throw Error(f(163));
          }
          br || r.flags & 512 && xf(r);
        } catch (me) {
          Fn(r, r.return, me);
        }
      }
      if (r === n) {
        He = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, He = l;
        break;
      }
      He = r.return;
    }
  }
  function Em(n) {
    for (; He !== null; ) {
      var r = He;
      if (r === n) {
        He = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, He = l;
        break;
      }
      He = r.return;
    }
  }
  function Op(n) {
    for (; He !== null; ) {
      var r = He;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Tf(4, r);
            } catch (L) {
              Fn(r, l, L);
            }
            break;
          case 1:
            var c = r.stateNode;
            if (typeof c.componentDidMount == "function") {
              var p = r.return;
              try {
                c.componentDidMount();
              } catch (L) {
                Fn(r, p, L);
              }
            }
            var g = r.return;
            try {
              xf(r);
            } catch (L) {
              Fn(r, g, L);
            }
            break;
          case 5:
            var E = r.return;
            try {
              xf(r);
            } catch (L) {
              Fn(r, E, L);
            }
        }
      } catch (L) {
        Fn(r, r.return, L);
      }
      if (r === n) {
        He = null;
        break;
      }
      var D = r.sibling;
      if (D !== null) {
        D.return = r.return, He = D;
        break;
      }
      He = r.return;
    }
  }
  var A0 = Math.ceil, Tl = le.ReactCurrentDispatcher, wf = le.ReactCurrentOwner, Ia = le.ReactCurrentBatchConfig, Nt = 0, Un = null, bn = null, er = 0, la = 0, Ou = _t(0), tr = 0, Bs = null, xl = 0, Du = 0, Dp = 0, Ao = null, Ur = null, Rf = 0, Au = 1 / 0, Zi = null, _f = !1, Ap = null, Ya = null, Mu = !1, Wa = null, kf = 0, Hs = 0, Of = null, Is = -1, wl = 0;
  function vr() {
    return Nt & 6 ? Qt() : Is !== -1 ? Is : Is = Qt();
  }
  function Ji(n) {
    return n.mode & 1 ? Nt & 2 && er !== 0 ? er & -er : Wc.transition !== null ? (wl === 0 && (wl = Ec()), wl) : (n = Zt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Fd(n.type)), n) : 1;
  }
  function Dn(n, r, l, c) {
    if (50 < Hs) throw Hs = 0, Of = null, Error(f(185));
    rl(n, l, c), (!(Nt & 2) || n !== Un) && (n === Un && (!(Nt & 2) && (Du |= l), tr === 4 && _i(n, er)), nr(n, c), l === 1 && Nt === 0 && !(r.mode & 1) && (Au = Qt() + 500, fr && Jr()));
  }
  function nr(n, r) {
    var l = n.callbackNode;
    Cc(n, r);
    var c = oi(n, n === Un ? er : 0);
    if (c === 0) l !== null && kn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = c & -c, n.callbackPriority !== r) {
      if (l != null && kn(l), r === 1) n.tag === 0 ? sp(Nu.bind(null, n)) : up(Nu.bind(null, n)), ip(function() {
        !(Nt & 6) && Jr();
      }), l = null;
      else {
        switch (Ld(c)) {
          case 1:
            l = ma;
            break;
          case 4:
            l = At;
            break;
          case 16:
            l = Ci;
            break;
          case 536870912:
            l = Dd;
            break;
          default:
            l = Ci;
        }
        l = Dm(l, Df.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function Df(n, r) {
    if (Is = -1, wl = 0, Nt & 6) throw Error(f(327));
    var l = n.callbackNode;
    if (Lu() && n.callbackNode !== l) return null;
    var c = oi(n, n === Un ? er : 0);
    if (c === 0) return null;
    if (c & 30 || c & n.expiredLanes || r) r = Mf(n, c);
    else {
      r = c;
      var p = Nt;
      Nt |= 2;
      var g = xm();
      (Un !== n || er !== r) && (Zi = null, Au = Qt() + 500, _l(n, r));
      do
        try {
          N0();
          break;
        } catch (D) {
          Tm(n, D);
        }
      while (!0);
      Ca(), Tl.current = g, Nt = p, bn !== null ? r = 0 : (Un = null, er = 0, r = tr);
    }
    if (r !== 0) {
      if (r === 2 && (p = Md(n), p !== 0 && (c = p, r = Rl(n, p))), r === 1) throw l = Bs, _l(n, 0), _i(n, c), nr(n, Qt()), l;
      if (r === 6) _i(n, c);
      else {
        if (p = n.current.alternate, !(c & 30) && !Np(p) && (r = Mf(n, c), r === 2 && (g = Md(n), g !== 0 && (c = g, r = Rl(n, g))), r === 1)) throw l = Bs, _l(n, 0), _i(n, c), nr(n, Qt()), l;
        switch (n.finishedWork = p, n.finishedLanes = c, r) {
          case 0:
          case 1:
            throw Error(f(345));
          case 2:
            Mo(n, Ur, Zi);
            break;
          case 3:
            if (_i(n, c), (c & 130023424) === c && (r = Rf + 500 - Qt(), 10 < r)) {
              if (oi(n, 0) !== 0) break;
              if (p = n.suspendedLanes, (p & c) !== c) {
                vr(), n.pingedLanes |= n.suspendedLanes & p;
                break;
              }
              n.timeoutHandle = cl(Mo.bind(null, n, Ur, Zi), r);
              break;
            }
            Mo(n, Ur, Zi);
            break;
          case 4:
            if (_i(n, c), (c & 4194240) === c) break;
            for (r = n.eventTimes, p = -1; 0 < c; ) {
              var E = 31 - Aa(c);
              g = 1 << E, E = r[E], E > p && (p = E), c &= ~g;
            }
            if (c = p, c = Qt() - c, c = (120 > c ? 120 : 480 > c ? 480 : 1080 > c ? 1080 : 1920 > c ? 1920 : 3e3 > c ? 3e3 : 4320 > c ? 4320 : 1960 * A0(c / 1960)) - c, 10 < c) {
              n.timeoutHandle = cl(Mo.bind(null, n, Ur, Zi), c);
              break;
            }
            Mo(n, Ur, Zi);
            break;
          case 5:
            Mo(n, Ur, Zi);
            break;
          default:
            throw Error(f(329));
        }
      }
    }
    return nr(n, Qt()), n.callbackNode === l ? Df.bind(null, n) : null;
  }
  function Rl(n, r) {
    var l = Ao;
    return n.current.memoizedState.isDehydrated && (_l(n, r).flags |= 256), n = Mf(n, r), n !== 2 && (r = Ur, Ur = l, r !== null && Mp(r)), n;
  }
  function Mp(n) {
    Ur === null ? Ur = n : Ur.push.apply(Ur, n);
  }
  function Np(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var c = 0; c < l.length; c++) {
          var p = l[c], g = p.getSnapshot;
          p = p.value;
          try {
            if (!La(g(), p)) return !1;
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
  function _i(n, r) {
    for (r &= ~Dp, r &= ~Du, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Aa(r), c = 1 << l;
      n[l] = -1, r &= ~c;
    }
  }
  function Nu(n) {
    if (Nt & 6) throw Error(f(327));
    Lu();
    var r = oi(n, 0);
    if (!(r & 1)) return nr(n, Qt()), null;
    var l = Mf(n, r);
    if (n.tag !== 0 && l === 2) {
      var c = Md(n);
      c !== 0 && (r = c, l = Rl(n, c));
    }
    if (l === 1) throw l = Bs, _l(n, 0), _i(n, r), nr(n, Qt()), l;
    if (l === 6) throw Error(f(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Mo(n, Ur, Zi), nr(n, Qt()), null;
  }
  function Lp(n, r) {
    var l = Nt;
    Nt |= 1;
    try {
      return n(r);
    } finally {
      Nt = l, Nt === 0 && (Au = Qt() + 500, fr && Jr());
    }
  }
  function ki(n) {
    Wa !== null && Wa.tag === 0 && !(Nt & 6) && Lu();
    var r = Nt;
    Nt |= 1;
    var l = Ia.transition, c = Zt;
    try {
      if (Ia.transition = null, Zt = 1, n) return n();
    } finally {
      Zt = c, Ia.transition = l, Nt = r, !(Nt & 6) && Jr();
    }
  }
  function Af() {
    la = Ou.current, Gt(Ou);
  }
  function _l(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Kh(l)), bn !== null) for (l = bn.return; l !== null; ) {
      var c = l;
      switch (fp(c), c.tag) {
        case 1:
          c = c.type.childContextTypes, c != null && Fa();
          break;
        case 3:
          fu(), Gt(Ln), Gt(gt), gp();
          break;
        case 5:
          yp(c);
          break;
        case 4:
          fu();
          break;
        case 13:
          Gt(Rn);
          break;
        case 19:
          Gt(Rn);
          break;
        case 10:
          vp(c.type._context);
          break;
        case 22:
        case 23:
          Af();
      }
      l = l.return;
    }
    if (Un = n, bn = n = No(n.current, null), er = la = r, tr = 0, Bs = null, Dp = Du = xl = 0, Ur = Ao = null, vl !== null) {
      for (r = 0; r < vl.length; r++) if (l = vl[r], c = l.interleaved, c !== null) {
        l.interleaved = null;
        var p = c.next, g = l.pending;
        if (g !== null) {
          var E = g.next;
          g.next = p, c.next = E;
        }
        l.pending = c;
      }
      vl = null;
    }
    return n;
  }
  function Tm(n, r) {
    do {
      var l = bn;
      try {
        if (Ca(), Jc.current = Lr, Ea) {
          for (var c = tt.memoizedState; c !== null; ) {
            var p = c.queue;
            p !== null && (p.pending = null), c = c.next;
          }
          Ea = !1;
        }
        if (Ze = 0, Mt = St = tt = null, du = !1, Ms = 0, wf.current = null, l === null || l.return === null) {
          tr = 1, Bs = r, bn = null;
          break;
        }
        e: {
          var g = n, E = l.return, D = l, L = r;
          if (r = er, D.flags |= 32768, L !== null && typeof L == "object" && typeof L.then == "function") {
            var J = L, ye = D, Ce = ye.tag;
            if (!(ye.mode & 1) && (Ce === 0 || Ce === 11 || Ce === 15)) {
              var me = ye.alternate;
              me ? (ye.updateQueue = me.updateQueue, ye.memoizedState = me.memoizedState, ye.lanes = me.lanes) : (ye.updateQueue = null, ye.memoizedState = null);
            }
            var je = vm(E);
            if (je !== null) {
              je.flags &= -257, Tp(je, E, D, g, r), je.mode & 1 && Fs(g, J, r), r = je, L = J;
              var Ye = r.updateQueue;
              if (Ye === null) {
                var qe = /* @__PURE__ */ new Set();
                qe.add(L), r.updateQueue = qe;
              } else Ye.add(L);
              break e;
            } else {
              if (!(r & 1)) {
                Fs(g, J, r), Ys();
                break e;
              }
              L = Error(f(426));
            }
          } else if (Sn && D.mode & 1) {
            var Hn = vm(E);
            if (Hn !== null) {
              !(Hn.flags & 65536) && (Hn.flags |= 256), Tp(Hn, E, D, g, r), pp(Oo(L, D));
              break e;
            }
          }
          g = L = Oo(L, D), tr !== 4 && (tr = 2), Ao === null ? Ao = [g] : Ao.push(g), g = E;
          do {
            switch (g.tag) {
              case 3:
                g.flags |= 65536, r &= -r, g.lanes |= r;
                var Y = dm(g, L, r);
                am(g, Y);
                break e;
              case 1:
                D = L;
                var P = g.type, q = g.stateNode;
                if (!(g.flags & 128) && (typeof P.getDerivedStateFromError == "function" || q !== null && typeof q.componentDidCatch == "function" && (Ya === null || !Ya.has(q)))) {
                  g.flags |= 65536, r &= -r, g.lanes |= r;
                  var xe = pm(g, D, r);
                  am(g, xe);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        Rm(l);
      } catch (Je) {
        r = Je, bn === l && l !== null && (bn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function xm() {
    var n = Tl.current;
    return Tl.current = Lr, n === null ? Lr : n;
  }
  function Ys() {
    (tr === 0 || tr === 3 || tr === 2) && (tr = 4), Un === null || !(xl & 268435455) && !(Du & 268435455) || _i(Un, er);
  }
  function Mf(n, r) {
    var l = Nt;
    Nt |= 2;
    var c = xm();
    (Un !== n || er !== r) && (Zi = null, _l(n, r));
    do
      try {
        M0();
        break;
      } catch (p) {
        Tm(n, p);
      }
    while (!0);
    if (Ca(), Nt = l, Tl.current = c, bn !== null) throw Error(f(261));
    return Un = null, er = 0, tr;
  }
  function M0() {
    for (; bn !== null; ) wm(bn);
  }
  function N0() {
    for (; bn !== null && !Kr(); ) wm(bn);
  }
  function wm(n) {
    var r = Om(n.alternate, n, la);
    n.memoizedProps = n.pendingProps, r === null ? Rm(n) : bn = r, wf.current = null;
  }
  function Rm(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = k0(l, r), l !== null) {
          l.flags &= 32767, bn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          tr = 6, bn = null;
          return;
        }
      } else if (l = _0(l, r, la), l !== null) {
        bn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        bn = r;
        return;
      }
      bn = r = n;
    } while (r !== null);
    tr === 0 && (tr = 5);
  }
  function Mo(n, r, l) {
    var c = Zt, p = Ia.transition;
    try {
      Ia.transition = null, Zt = 1, L0(n, r, l, c);
    } finally {
      Ia.transition = p, Zt = c;
    }
    return null;
  }
  function L0(n, r, l, c) {
    do
      Lu();
    while (Wa !== null);
    if (Nt & 6) throw Error(f(327));
    l = n.finishedWork;
    var p = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(f(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var g = l.lanes | l.childLanes;
    if (i0(n, g), n === Un && (bn = Un = null, er = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Mu || (Mu = !0, Dm(Ci, function() {
      return Lu(), null;
    })), g = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || g) {
      g = Ia.transition, Ia.transition = null;
      var E = Zt;
      Zt = 1;
      var D = Nt;
      Nt |= 4, wf.current = null, O0(n, l), Cm(l, n), zc(sl), al = !!rp, sl = rp = null, n.current = l, D0(l), mo(), Nt = D, Zt = E, Ia.transition = g;
    } else n.current = l;
    if (Mu && (Mu = !1, Wa = n, kf = p), g = n.pendingLanes, g === 0 && (Ya = null), ch(l.stateNode), nr(n, Qt()), r !== null) for (c = n.onRecoverableError, l = 0; l < r.length; l++) p = r[l], c(p.value, { componentStack: p.stack, digest: p.digest });
    if (_f) throw _f = !1, n = Ap, Ap = null, n;
    return kf & 1 && n.tag !== 0 && Lu(), g = n.pendingLanes, g & 1 ? n === Of ? Hs++ : (Hs = 0, Of = n) : Hs = 0, Jr(), null;
  }
  function Lu() {
    if (Wa !== null) {
      var n = Ld(kf), r = Ia.transition, l = Zt;
      try {
        if (Ia.transition = null, Zt = 16 > n ? 16 : n, Wa === null) var c = !1;
        else {
          if (n = Wa, Wa = null, kf = 0, Nt & 6) throw Error(f(331));
          var p = Nt;
          for (Nt |= 4, He = n.current; He !== null; ) {
            var g = He, E = g.child;
            if (He.flags & 16) {
              var D = g.deletions;
              if (D !== null) {
                for (var L = 0; L < D.length; L++) {
                  var J = D[L];
                  for (He = J; He !== null; ) {
                    var ye = He;
                    switch (ye.tag) {
                      case 0:
                      case 11:
                      case 15:
                        xu(8, ye, g);
                    }
                    var Ce = ye.child;
                    if (Ce !== null) Ce.return = ye, He = Ce;
                    else for (; He !== null; ) {
                      ye = He;
                      var me = ye.sibling, je = ye.return;
                      if (Sm(ye), ye === J) {
                        He = null;
                        break;
                      }
                      if (me !== null) {
                        me.return = je, He = me;
                        break;
                      }
                      He = je;
                    }
                  }
                }
                var Ye = g.alternate;
                if (Ye !== null) {
                  var qe = Ye.child;
                  if (qe !== null) {
                    Ye.child = null;
                    do {
                      var Hn = qe.sibling;
                      qe.sibling = null, qe = Hn;
                    } while (qe !== null);
                  }
                }
                He = g;
              }
            }
            if (g.subtreeFlags & 2064 && E !== null) E.return = g, He = E;
            else e: for (; He !== null; ) {
              if (g = He, g.flags & 2048) switch (g.tag) {
                case 0:
                case 11:
                case 15:
                  xu(9, g, g.return);
              }
              var Y = g.sibling;
              if (Y !== null) {
                Y.return = g.return, He = Y;
                break e;
              }
              He = g.return;
            }
          }
          var P = n.current;
          for (He = P; He !== null; ) {
            E = He;
            var q = E.child;
            if (E.subtreeFlags & 2064 && q !== null) q.return = E, He = q;
            else e: for (E = P; He !== null; ) {
              if (D = He, D.flags & 2048) try {
                switch (D.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Tf(9, D);
                }
              } catch (Je) {
                Fn(D, D.return, Je);
              }
              if (D === E) {
                He = null;
                break e;
              }
              var xe = D.sibling;
              if (xe !== null) {
                xe.return = D.return, He = xe;
                break e;
              }
              He = D.return;
            }
          }
          if (Nt = p, Jr(), ii && typeof ii.onPostCommitFiberRoot == "function") try {
            ii.onPostCommitFiberRoot(is, n);
          } catch {
          }
          c = !0;
        }
        return c;
      } finally {
        Zt = l, Ia.transition = r;
      }
    }
    return !1;
  }
  function _m(n, r, l) {
    r = Oo(l, r), r = dm(n, r, 1), n = _o(n, r, 1), r = vr(), n !== null && (rl(n, 1, r), nr(n, r));
  }
  function Fn(n, r, l) {
    if (n.tag === 3) _m(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        _m(r, n, l);
        break;
      } else if (r.tag === 1) {
        var c = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && (Ya === null || !Ya.has(c))) {
          n = Oo(l, n), n = pm(r, n, 1), r = _o(r, n, 1), n = vr(), r !== null && (rl(r, 1, n), nr(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function z0(n, r, l) {
    var c = n.pingCache;
    c !== null && c.delete(r), r = vr(), n.pingedLanes |= n.suspendedLanes & l, Un === n && (er & l) === l && (tr === 4 || tr === 3 && (er & 130023424) === er && 500 > Qt() - Rf ? _l(n, 0) : Dp |= l), nr(n, r);
  }
  function km(n, r) {
    r === 0 && (n.mode & 1 ? (r = Ql, Ql <<= 1, !(Ql & 130023424) && (Ql = 4194304)) : r = 1);
    var l = vr();
    n = qi(n, r), n !== null && (rl(n, r, l), nr(n, l));
  }
  function zp(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), km(n, l);
  }
  function U0(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var c = n.stateNode, p = n.memoizedState;
        p !== null && (l = p.retryLane);
        break;
      case 19:
        c = n.stateNode;
        break;
      default:
        throw Error(f(314));
    }
    c !== null && c.delete(r), km(n, l);
  }
  var Om;
  Om = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Ln.current) ia = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return ia = !1, Xi(n, r, l);
      ia = !!(n.flags & 131072);
    }
    else ia = !1, Sn && r.flags & 1048576 && cp(r, ou, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var c = r.type;
        $s(n, r), n = r.pendingProps;
        var p = Ua(r, gt.current);
        uu(r, l), p = he(null, r, c, n, p, l);
        var g = Qn();
        return r.flags |= 1, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, wn(c) ? (g = !0, Vc(r)) : g = !1, r.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Qc(r), p.updater = bl, r.stateNode = p, p._reactInternals = r, Cp(r, c, n, l), r = yf(null, r, c, !0, g, l)) : (r.tag = 0, Sn && g && Bc(r), Vn(null, r, p, l), r = r.child), r;
      case 16:
        c = r.elementType;
        e: {
          switch ($s(n, r), n = r.pendingProps, p = c._init, c = p(c._payload), r.type = c, p = r.tag = F0(c), n = aa(c, n), p) {
            case 0:
              r = Rt(null, r, c, n, l);
              break e;
            case 1:
              r = Ps(null, r, c, n, l);
              break e;
            case 11:
              r = Su(null, r, c, n, l);
              break e;
            case 14:
              r = Do(null, r, c, aa(c.type, n), l);
              break e;
          }
          throw Error(f(
            306,
            c,
            ""
          ));
        }
        return r;
      case 0:
        return c = r.type, p = r.pendingProps, p = r.elementType === c ? p : aa(c, p), Rt(n, r, c, p, l);
      case 1:
        return c = r.type, p = r.pendingProps, p = r.elementType === c ? p : aa(c, p), Ps(n, r, c, p, l);
      case 3:
        e: {
          if (R0(r), n === null) throw Error(f(387));
          c = r.pendingProps, g = r.memoizedState, p = g.element, su(n, r), Kc(r, c, null, l);
          var E = r.memoizedState;
          if (c = E.element, g.isDehydrated) if (g = { element: c, isDehydrated: !1, cache: E.cache, pendingSuspenseBoundaries: E.pendingSuspenseBoundaries, transitions: E.transitions }, r.updateQueue.baseState = g, r.memoizedState = g, r.flags & 256) {
            p = Oo(Error(f(423)), r), r = mm(n, r, c, l, p);
            break e;
          } else if (c !== p) {
            p = Oo(Error(f(424)), r), r = mm(n, r, c, l, p);
            break e;
          } else for (na = ci(r.stateNode.containerInfo.firstChild), ba = r, Sn = !0, ja = null, l = nm(r, null, c, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (On(), c === p) {
              r = Bn(n, r, l);
              break e;
            }
            Vn(n, r, c, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return om(r), n === null && Ic(r), c = r.type, p = r.pendingProps, g = n !== null ? n.memoizedProps : null, E = p.children, xs(c, p) ? E = null : g !== null && xs(c, g) && (r.flags |= 32), Cl(n, r), Vn(n, r, E, l), r.child;
      case 6:
        return n === null && Ic(r), null;
      case 13:
        return ym(n, r, l);
      case 4:
        return mp(r, r.stateNode.containerInfo), c = r.pendingProps, n === null ? r.child = lu(r, null, c, l) : Vn(n, r, c, l), r.child;
      case 11:
        return c = r.type, p = r.pendingProps, p = r.elementType === c ? p : aa(c, p), Su(n, r, c, p, l);
      case 7:
        return Vn(n, r, r.pendingProps, l), r.child;
      case 8:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (c = r.type._context, p = r.pendingProps, g = r.memoizedProps, E = p.value, qt(Qi, c._currentValue), c._currentValue = E, g !== null) if (La(g.value, E)) {
            if (g.children === p.children && !Ln.current) {
              r = Bn(n, r, l);
              break e;
            }
          } else for (g = r.child, g !== null && (g.return = r); g !== null; ) {
            var D = g.dependencies;
            if (D !== null) {
              E = g.child;
              for (var L = D.firstContext; L !== null; ) {
                if (L.context === c) {
                  if (g.tag === 1) {
                    L = ra(-1, l & -l), L.tag = 2;
                    var J = g.updateQueue;
                    if (J !== null) {
                      J = J.shared;
                      var ye = J.pending;
                      ye === null ? L.next = L : (L.next = ye.next, ye.next = L), J.pending = L;
                    }
                  }
                  g.lanes |= l, L = g.alternate, L !== null && (L.lanes |= l), hp(
                    g.return,
                    l,
                    r
                  ), D.lanes |= l;
                  break;
                }
                L = L.next;
              }
            } else if (g.tag === 10) E = g.type === r.type ? null : g.child;
            else if (g.tag === 18) {
              if (E = g.return, E === null) throw Error(f(341));
              E.lanes |= l, D = E.alternate, D !== null && (D.lanes |= l), hp(E, l, r), E = g.sibling;
            } else E = g.child;
            if (E !== null) E.return = g;
            else for (E = g; E !== null; ) {
              if (E === r) {
                E = null;
                break;
              }
              if (g = E.sibling, g !== null) {
                g.return = E.return, E = g;
                break;
              }
              E = E.return;
            }
            g = E;
          }
          Vn(n, r, p.children, l), r = r.child;
        }
        return r;
      case 9:
        return p = r.type, c = r.pendingProps.children, uu(r, l), p = Va(p), c = c(p), r.flags |= 1, Vn(n, r, c, l), r.child;
      case 14:
        return c = r.type, p = aa(c, r.pendingProps), p = aa(c.type, p), Do(n, r, c, p, l);
      case 15:
        return mf(n, r, r.type, r.pendingProps, l);
      case 17:
        return c = r.type, p = r.pendingProps, p = r.elementType === c ? p : aa(c, p), $s(n, r), r.tag = 1, wn(c) ? (n = !0, Vc(r)) : n = !1, uu(r, l), sm(r, c, p), Cp(r, c, p, l), yf(null, r, c, !0, n, l);
      case 19:
        return wp(n, r, l);
      case 22:
        return oa(n, r, l);
    }
    throw Error(f(156, r.tag));
  };
  function Dm(n, r) {
    return yn(n, r);
  }
  function Am(n, r, l, c) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = c, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ga(n, r, l, c) {
    return new Am(n, r, l, c);
  }
  function Up(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function F0(n) {
    if (typeof n == "function") return Up(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === ve) return 11;
      if (n === lt) return 14;
    }
    return 2;
  }
  function No(n, r) {
    var l = n.alternate;
    return l === null ? (l = Ga(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Nf(n, r, l, c, p, g) {
    var E = 2;
    if (c = n, typeof n == "function") Up(n) && (E = 1);
    else if (typeof n == "string") E = 5;
    else e: switch (n) {
      case ce:
        return kl(l.children, p, g, r);
      case et:
        E = 8, p |= 8;
        break;
      case _:
        return n = Ga(12, l, r, p | 2), n.elementType = _, n.lanes = g, n;
      case pe:
        return n = Ga(13, l, r, p), n.elementType = pe, n.lanes = g, n;
      case Re:
        return n = Ga(19, l, r, p), n.elementType = Re, n.lanes = g, n;
      case bt:
        return Lf(l, p, g, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case se:
            E = 10;
            break e;
          case ke:
            E = 9;
            break e;
          case ve:
            E = 11;
            break e;
          case lt:
            E = 14;
            break e;
          case Qe:
            E = 16, c = null;
            break e;
        }
        throw Error(f(130, n == null ? n : typeof n, ""));
    }
    return r = Ga(E, l, r, p), r.elementType = n, r.type = c, r.lanes = g, r;
  }
  function kl(n, r, l, c) {
    return n = Ga(7, n, c, r), n.lanes = l, n;
  }
  function Lf(n, r, l, c) {
    return n = Ga(22, n, c, r), n.elementType = bt, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function zf(n, r, l) {
    return n = Ga(6, n, null, r), n.lanes = l, n;
  }
  function Ws(n, r, l) {
    return r = Ga(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Gs(n, r, l, c, p) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Nd(0), this.expirationTimes = Nd(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Nd(0), this.identifierPrefix = c, this.onRecoverableError = p, this.mutableSourceEagerHydrationData = null;
  }
  function Fp(n, r, l, c, p, g, E, D, L) {
    return n = new Gs(n, r, l, D, L), r === 1 ? (r = 1, g === !0 && (r |= 8)) : r = 0, g = Ga(3, null, null, r), n.current = g, g.stateNode = n, g.memoizedState = { element: c, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Qc(g), n;
  }
  function Mm(n, r, l) {
    var c = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: be, key: c == null ? null : "" + c, children: n, containerInfo: r, implementation: l };
  }
  function Pp(n) {
    if (!n) return Ti;
    n = n._reactInternals;
    e: {
      if (it(n) !== n || n.tag !== 1) throw Error(f(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (wn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(f(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (wn(l)) return _s(n, l, r);
    }
    return r;
  }
  function jp(n, r, l, c, p, g, E, D, L) {
    return n = Fp(l, c, !0, n, p, g, E, D, L), n.context = Pp(null), l = n.current, c = vr(), p = Ji(l), g = ra(c, p), g.callback = r ?? null, _o(l, g, p), n.current.lanes = p, rl(n, p, c), nr(n, c), n;
  }
  function Uf(n, r, l, c) {
    var p = r.current, g = vr(), E = Ji(p);
    return l = Pp(l), r.context === null ? r.context = l : r.pendingContext = l, r = ra(g, E), r.payload = { element: n }, c = c === void 0 ? null : c, c !== null && (r.callback = c), n = _o(p, r, E), n !== null && (Dn(n, p, E, g), qc(n, p, E)), E;
  }
  function Qs(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Nm(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function $p(n, r) {
    Nm(n, r), (n = n.alternate) && Nm(n, r);
  }
  function P0() {
    return null;
  }
  var Vp = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Ff(n) {
    this._internalRoot = n;
  }
  qs.prototype.render = Ff.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(f(409));
    Uf(n, r, null, null);
  }, qs.prototype.unmount = Ff.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      ki(function() {
        Uf(null, n, null, null);
      }), r[Wi] = null;
    }
  };
  function qs(n) {
    this._internalRoot = n;
  }
  qs.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = vh();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < nn.length && r !== 0 && r < nn[l].priority; l++) ;
      nn.splice(l, 0, n), l === 0 && hh(n);
    }
  };
  function Lo(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Pf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Lm() {
  }
  function j0(n, r, l, c, p) {
    if (p) {
      if (typeof c == "function") {
        var g = c;
        c = function() {
          var J = Qs(E);
          g.call(J);
        };
      }
      var E = jp(r, c, n, 0, null, !1, !1, "", Lm);
      return n._reactRootContainer = E, n[Wi] = E.current, au(n.nodeType === 8 ? n.parentNode : n), ki(), E;
    }
    for (; p = n.lastChild; ) n.removeChild(p);
    if (typeof c == "function") {
      var D = c;
      c = function() {
        var J = Qs(L);
        D.call(J);
      };
    }
    var L = Fp(n, 0, !1, null, null, !1, !1, "", Lm);
    return n._reactRootContainer = L, n[Wi] = L.current, au(n.nodeType === 8 ? n.parentNode : n), ki(function() {
      Uf(r, L, l, c);
    }), L;
  }
  function jf(n, r, l, c, p) {
    var g = l._reactRootContainer;
    if (g) {
      var E = g;
      if (typeof p == "function") {
        var D = p;
        p = function() {
          var L = Qs(E);
          D.call(L);
        };
      }
      Uf(r, E, n, p);
    } else E = j0(l, r, n, p, c);
    return Qs(E);
  }
  ph = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = nl(r.pendingLanes);
          l !== 0 && (os(r, l | 1), nr(r, Qt()), !(Nt & 6) && (Au = Qt() + 500, Jr()));
        }
        break;
      case 13:
        ki(function() {
          var c = qi(n, 1);
          if (c !== null) {
            var p = vr();
            Dn(c, n, 1, p);
          }
        }), $p(n, 1);
    }
  }, Tc = function(n) {
    if (n.tag === 13) {
      var r = qi(n, 134217728);
      if (r !== null) {
        var l = vr();
        Dn(r, n, 134217728, l);
      }
      $p(n, 134217728);
    }
  }, Jt = function(n) {
    if (n.tag === 13) {
      var r = Ji(n), l = qi(n, r);
      if (l !== null) {
        var c = vr();
        Dn(l, n, r, c);
      }
      $p(n, r);
    }
  }, vh = function() {
    return Zt;
  }, zd = function(n, r) {
    var l = Zt;
    try {
      return Zt = n, r();
    } finally {
      Zt = l;
    }
  }, va = function(n, r, l) {
    switch (r) {
      case "input":
        if (Nn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var c = l[r];
            if (c !== n && c.form === n.form) {
              var p = st(c);
              if (!p) throw Error(f(90));
              we(c), Nn(c, p);
            }
          }
        }
        break;
      case "textarea":
        Ve(n, l);
        break;
      case "select":
        r = l.value, r != null && _e(n, !!l.multiple, r, !1);
    }
  }, as = Lp, Sc = ki;
  var $0 = { usingClientEntryPoint: !1, Events: [Rs, iu, st, Zo, Yl, Lp] }, Ks = { findFiberByHostInstance: za, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, zm = { bundleType: Ks.bundleType, version: Ks.version, rendererPackageName: Ks.rendererPackageName, rendererConfig: Ks.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: le.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Dt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ks.findFiberByHostInstance || P0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $f = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$f.isDisabled && $f.supportsFiber) try {
      is = $f.inject(zm), ii = $f;
    } catch {
    }
  }
  return Ja.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = $0, Ja.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Lo(r)) throw Error(f(200));
    return Mm(n, r, null, l);
  }, Ja.createRoot = function(n, r) {
    if (!Lo(n)) throw Error(f(299));
    var l = !1, c = "", p = Vp;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (c = r.identifierPrefix), r.onRecoverableError !== void 0 && (p = r.onRecoverableError)), r = Fp(n, 1, !1, null, null, l, !1, c, p), n[Wi] = r.current, au(n.nodeType === 8 ? n.parentNode : n), new Ff(r);
  }, Ja.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(f(188)) : (n = Object.keys(n).join(","), Error(f(268, n)));
    return n = Dt(r), n = n === null ? null : n.stateNode, n;
  }, Ja.flushSync = function(n) {
    return ki(n);
  }, Ja.hydrate = function(n, r, l) {
    if (!Pf(r)) throw Error(f(200));
    return jf(null, n, r, !0, l);
  }, Ja.hydrateRoot = function(n, r, l) {
    if (!Lo(n)) throw Error(f(405));
    var c = l != null && l.hydratedSources || null, p = !1, g = "", E = Vp;
    if (l != null && (l.unstable_strictMode === !0 && (p = !0), l.identifierPrefix !== void 0 && (g = l.identifierPrefix), l.onRecoverableError !== void 0 && (E = l.onRecoverableError)), r = jp(r, null, n, 1, l ?? null, p, !1, g, E), n[Wi] = r.current, au(n), c) for (n = 0; n < c.length; n++) l = c[n], p = l._getVersion, p = p(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, p] : r.mutableSourceEagerHydrationData.push(
      l,
      p
    );
    return new qs(r);
  }, Ja.render = function(n, r, l) {
    if (!Pf(r)) throw Error(f(200));
    return jf(null, n, r, !1, l);
  }, Ja.unmountComponentAtNode = function(n) {
    if (!Pf(n)) throw Error(f(40));
    return n._reactRootContainer ? (ki(function() {
      jf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Wi] = null;
      });
    }), !0) : !1;
  }, Ja.unstable_batchedUpdates = Lp, Ja.unstable_renderSubtreeIntoContainer = function(n, r, l, c) {
    if (!Pf(l)) throw Error(f(200));
    if (n == null || n._reactInternals === void 0) throw Error(f(38));
    return jf(n, r, l, !1, c);
  }, Ja.version = "18.3.1-next-f1338f8080-20240426", Ja;
}
var ei = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mw;
function d2() {
  return mw || (mw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var i = xn, s = vR(), f = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, h = !1;
    function m(e) {
      h = e;
    }
    function S(e) {
      if (!h) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        x("warn", e, a);
      }
    }
    function y(e) {
      if (!h) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        x("error", e, a);
      }
    }
    function x(e, t, a) {
      {
        var o = f.ReactDebugCurrentFrame, u = o.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var d = a.map(function(v) {
          return String(v);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var R = 0, k = 1, N = 2, O = 3, z = 4, B = 5, H = 6, V = 7, F = 8, fe = 9, oe = 10, X = 11, le = 12, $ = 13, be = 14, ce = 15, et = 16, _ = 17, se = 18, ke = 19, ve = 21, pe = 22, Re = 23, lt = 24, Qe = 25, bt = !0, ge = !1, ze = !1, I = !1, de = !1, Ne = !0, Xe = !1, Pe = !0, ht = !0, Ie = !0, ut = !0, rt = /* @__PURE__ */ new Set(), dt = {}, mt = {};
    function zt(e, t) {
      we(e, t), we(e + "Capture", t);
    }
    function we(e, t) {
      dt[e] && y("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), dt[e] = t;
      {
        var a = e.toLowerCase();
        mt[a] = e, e === "onDoubleClick" && (mt.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        rt.add(t[o]);
    }
    var Ut = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Le = Object.prototype.hasOwnProperty;
    function Xt(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function mn(e) {
      try {
        return Nn(e), !1;
      } catch {
        return !0;
      }
    }
    function Nn(e) {
      return "" + e;
    }
    function A(e, t) {
      if (mn(e))
        return y("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Xt(e)), Nn(e);
    }
    function W(e) {
      if (mn(e))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Xt(e)), Nn(e);
    }
    function ne(e, t) {
      if (mn(e))
        return y("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Xt(e)), Nn(e);
    }
    function _e(e, t) {
      if (mn(e))
        return y("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Xt(e)), Nn(e);
    }
    function Te(e) {
      if (mn(e))
        return y("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Xt(e)), Nn(e);
    }
    function te(e) {
      if (mn(e))
        return y("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Xt(e)), Nn(e);
    }
    var Ve = 0, Et = 1, Bt = 2, Ot = 3, jn = 4, Si = 5, Fr = 6, Oe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", at = Oe + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", kt = new RegExp("^[" + Oe + "][" + at + "]*$"), Wt = {}, dn = {};
    function lr(e) {
      return Le.call(dn, e) ? !0 : Le.call(Wt, e) ? !1 : kt.test(e) ? (dn[e] = !0, !0) : (Wt[e] = !0, y("Invalid attribute name: `%s`", e), !1);
    }
    function $n(e, t, a) {
      return t !== null ? t.type === Ve : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function qr(e, t, a, o) {
      if (a !== null && a.type === Ve)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (o)
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
    function pn(e, t, a, o) {
      if (t === null || typeof t > "u" || qr(e, t, a, o))
        return !0;
      if (o)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Ot:
            return !t;
          case jn:
            return t === !1;
          case Si:
            return isNaN(t);
          case Fr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function va(e) {
      return vn.hasOwnProperty(e) ? vn[e] : null;
    }
    function cn(e, t, a, o, u, d, v) {
      this.acceptsBooleans = t === Bt || t === Ot || t === jn, this.attributeName = o, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = v;
    }
    var vn = {}, Il = [
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
    Il.forEach(function(e) {
      vn[e] = new cn(
        e,
        Ve,
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
      vn[t] = new cn(
        t,
        Et,
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
      vn[e] = new cn(
        e,
        Bt,
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
      vn[e] = new cn(
        e,
        Bt,
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
      vn[e] = new cn(
        e,
        Ot,
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
      vn[e] = new cn(
        e,
        Ot,
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
      vn[e] = new cn(
        e,
        jn,
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
      vn[e] = new cn(
        e,
        Fr,
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
      vn[e] = new cn(
        e,
        Si,
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
    var Zo = /[\-\:]([a-z])/g, Yl = function(e) {
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
      var t = e.replace(Zo, Yl);
      vn[t] = new cn(
        t,
        Et,
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
      var t = e.replace(Zo, Yl);
      vn[t] = new cn(
        t,
        Et,
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
      var t = e.replace(Zo, Yl);
      vn[t] = new cn(
        t,
        Et,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      vn[e] = new cn(
        e,
        Et,
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
    var as = "xlinkHref";
    vn[as] = new cn(
      "xlinkHref",
      Et,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      vn[e] = new cn(
        e,
        Et,
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
    var Sc = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Jo = !1;
    function Wl(e) {
      !Jo && Sc.test(e) && (Jo = !0, y("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function el(e, t, a, o) {
      if (o.mustUseProperty) {
        var u = o.propertyName;
        return e[u];
      } else {
        A(a, t), o.sanitizeURL && Wl("" + a);
        var d = o.attributeName, v = null;
        if (o.type === jn) {
          if (e.hasAttribute(d)) {
            var b = e.getAttribute(d);
            return b === "" ? !0 : pn(t, a, o, !1) ? b : b === "" + a ? a : b;
          }
        } else if (e.hasAttribute(d)) {
          if (pn(t, a, o, !1))
            return e.getAttribute(d);
          if (o.type === Ot)
            return a;
          v = e.getAttribute(d);
        }
        return pn(t, a, o, !1) ? v === null ? a : v : v === "" + a ? a : v;
      }
    }
    function Gl(e, t, a, o) {
      {
        if (!lr(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return A(a, t), u === "" + a ? a : u;
      }
    }
    function bi(e, t, a, o) {
      var u = va(t);
      if (!$n(t, u, o)) {
        if (pn(t, a, u, o) && (a = null), o || u === null) {
          if (lr(t)) {
            var d = t;
            a === null ? e.removeAttribute(d) : (A(a, t), e.setAttribute(d, "" + a));
          }
          return;
        }
        var v = u.mustUseProperty;
        if (v) {
          var b = u.propertyName;
          if (a === null) {
            var C = u.type;
            e[b] = C === Ot ? !1 : "";
          } else
            e[b] = a;
          return;
        }
        var T = u.attributeName, w = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(T);
        else {
          var j = u.type, U;
          j === Ot || j === jn && a === !0 ? U = "" : (A(a, T), U = "" + a, u.sanitizeURL && Wl(U.toString())), w ? e.setAttributeNS(w, T, U) : e.setAttribute(T, U);
        }
      }
    }
    var ji = Symbol.for("react.element"), ha = Symbol.for("react.portal"), ai = Symbol.for("react.fragment"), ho = Symbol.for("react.strict_mode"), tl = Symbol.for("react.profiler"), M = Symbol.for("react.provider"), Se = Symbol.for("react.context"), De = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), Ft = Symbol.for("react.suspense_list"), Vt = Symbol.for("react.memo"), vt = Symbol.for("react.lazy"), Dt = Symbol.for("react.scope"), ur = Symbol.for("react.debug_trace_mode"), yn = Symbol.for("react.offscreen"), kn = Symbol.for("react.legacy_hidden"), Kr = Symbol.for("react.cache"), mo = Symbol.for("react.tracing_marker"), Qt = Symbol.iterator, Dr = "@@iterator";
    function ma(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Qt && e[Qt] || e[Dr];
      return typeof t == "function" ? t : null;
    }
    var At = Object.assign, Ci = 0, sh, Dd, is, ii, ch, Aa, fh;
    function dh() {
    }
    dh.__reactDisabledLog = !0;
    function a0() {
      {
        if (Ci === 0) {
          sh = console.log, Dd = console.info, is = console.warn, ii = console.error, ch = console.group, Aa = console.groupCollapsed, fh = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: dh,
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
        Ci++;
      }
    }
    function bc() {
      {
        if (Ci--, Ci === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: At({}, e, {
              value: sh
            }),
            info: At({}, e, {
              value: Dd
            }),
            warn: At({}, e, {
              value: is
            }),
            error: At({}, e, {
              value: ii
            }),
            group: At({}, e, {
              value: ch
            }),
            groupCollapsed: At({}, e, {
              value: Aa
            }),
            groupEnd: At({}, e, {
              value: fh
            })
          });
        }
        Ci < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ql = f.ReactCurrentDispatcher, nl;
    function oi(e, t, a) {
      {
        if (nl === void 0)
          try {
            throw Error();
          } catch (u) {
            var o = u.stack.trim().match(/\n( *(at )?)/);
            nl = o && o[1] || "";
          }
        return `
` + nl + e;
      }
    }
    var Ad = !1, Cc;
    {
      var Md = typeof WeakMap == "function" ? WeakMap : Map;
      Cc = new Md();
    }
    function Ec(e, t) {
      if (!e || Ad)
        return "";
      {
        var a = Cc.get(e);
        if (a !== void 0)
          return a;
      }
      var o;
      Ad = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = Ql.current, Ql.current = null, a0();
      try {
        if (t) {
          var v = function() {
            throw Error();
          };
          if (Object.defineProperty(v.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(v, []);
            } catch (ee) {
              o = ee;
            }
            Reflect.construct(e, [], v);
          } else {
            try {
              v.call();
            } catch (ee) {
              o = ee;
            }
            e.call(v.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (ee) {
            o = ee;
          }
          e();
        }
      } catch (ee) {
        if (ee && o && typeof ee.stack == "string") {
          for (var b = ee.stack.split(`
`), C = o.stack.split(`
`), T = b.length - 1, w = C.length - 1; T >= 1 && w >= 0 && b[T] !== C[w]; )
            w--;
          for (; T >= 1 && w >= 0; T--, w--)
            if (b[T] !== C[w]) {
              if (T !== 1 || w !== 1)
                do
                  if (T--, w--, w < 0 || b[T] !== C[w]) {
                    var j = `
` + b[T].replace(" at new ", " at ");
                    return e.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", e.displayName)), typeof e == "function" && Cc.set(e, j), j;
                  }
                while (T >= 1 && w >= 0);
              break;
            }
        }
      } finally {
        Ad = !1, Ql.current = d, bc(), Error.prepareStackTrace = u;
      }
      var U = e ? e.displayName || e.name : "", Z = U ? oi(U) : "";
      return typeof e == "function" && Cc.set(e, Z), Z;
    }
    function Nd(e, t, a) {
      return Ec(e, !0);
    }
    function rl(e, t, a) {
      return Ec(e, !1);
    }
    function i0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function os(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return Ec(e, i0(e));
      if (typeof e == "string")
        return oi(e);
      switch (e) {
        case it:
          return oi("Suspense");
        case Ft:
          return oi("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case De:
            return rl(e.render);
          case Vt:
            return os(e.type, t, a);
          case vt: {
            var o = e, u = o._payload, d = o._init;
            try {
              return os(d(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Zt(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case B:
          return oi(e.type);
        case et:
          return oi("Lazy");
        case $:
          return oi("Suspense");
        case ke:
          return oi("SuspenseList");
        case R:
        case N:
        case ce:
          return rl(e.type);
        case X:
          return rl(e.type.render);
        case k:
          return Nd(e.type);
        default:
          return "";
      }
    }
    function Ld(e) {
      try {
        var t = "", a = e;
        do
          t += Zt(a), a = a.return;
        while (a);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function ph(e, t, a) {
      var o = e.displayName;
      if (o)
        return o;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Tc(e) {
      return e.displayName || "Context";
    }
    function Jt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case ai:
          return "Fragment";
        case ha:
          return "Portal";
        case tl:
          return "Profiler";
        case ho:
          return "StrictMode";
        case it:
          return "Suspense";
        case Ft:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Se:
            var t = e;
            return Tc(t) + ".Consumer";
          case M:
            var a = e;
            return Tc(a._context) + ".Provider";
          case De:
            return ph(e, e.render, "ForwardRef");
          case Vt:
            var o = e.displayName || null;
            return o !== null ? o : Jt(e.type) || "Memo";
          case vt: {
            var u = e, d = u._payload, v = u._init;
            try {
              return Jt(v(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function vh(e, t, a) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? a + "(" + o + ")" : a);
    }
    function zd(e) {
      return e.displayName || "Context";
    }
    function wt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case lt:
          return "Cache";
        case fe:
          var o = a;
          return zd(o) + ".Consumer";
        case oe:
          var u = a;
          return zd(u._context) + ".Provider";
        case se:
          return "DehydratedFragment";
        case X:
          return vh(a, a.render, "ForwardRef");
        case V:
          return "Fragment";
        case B:
          return a;
        case z:
          return "Portal";
        case O:
          return "Root";
        case H:
          return "Text";
        case et:
          return Jt(a);
        case F:
          return a === ho ? "StrictMode" : "Mode";
        case pe:
          return "Offscreen";
        case le:
          return "Profiler";
        case ve:
          return "Scope";
        case $:
          return "Suspense";
        case ke:
          return "SuspenseList";
        case Qe:
          return "TracingMarker";
        case k:
        case R:
        case _:
        case N:
        case be:
        case ce:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ls = f.ReactDebugCurrentFrame, Yn = null, Ma = !1;
    function Na() {
      {
        if (Yn === null)
          return null;
        var e = Yn._debugOwner;
        if (e !== null && typeof e < "u")
          return wt(e);
      }
      return null;
    }
    function us() {
      return Yn === null ? "" : Ld(Yn);
    }
    function Zn() {
      ls.getCurrentStack = null, Yn = null, Ma = !1;
    }
    function nn(e) {
      ls.getCurrentStack = e === null ? null : us, Yn = e, Ma = !1;
    }
    function o0() {
      return Yn;
    }
    function li(e) {
      Ma = e;
    }
    function Ar(e) {
      return "" + e;
    }
    function yo(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return te(e), e;
        default:
          return "";
      }
    }
    var hh = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function ql(e, t) {
      hh[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || y("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || y("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Ud(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function mh(e) {
      return e._valueTracker;
    }
    function ss(e) {
      e._valueTracker = null;
    }
    function cs(e) {
      var t = "";
      return e && (Ud(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Kl(e) {
      var t = Ud(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      te(e[t]);
      var o = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, d = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(b) {
            te(b), o = "" + b, d.call(this, b);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var v = {
          getValue: function() {
            return o;
          },
          setValue: function(b) {
            te(b), o = "" + b;
          },
          stopTracking: function() {
            ss(e), delete e[t];
          }
        };
        return v;
      }
    }
    function al(e) {
      mh(e) || (e._valueTracker = Kl(e));
    }
    function yh(e) {
      if (!e)
        return !1;
      var t = mh(e);
      if (!t)
        return !0;
      var a = t.getValue(), o = cs(e);
      return o !== a ? (t.setValue(o), !0) : !1;
    }
    function xc(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var wc = !1, fs = !1, Rc = !1, Fd = !1;
    function $i(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function ds(e, t) {
      var a = e, o = t.checked, u = At({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function ps(e, t) {
      ql("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !fs && (y("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Na() || "A component", t.type), fs = !0), t.value !== void 0 && t.defaultValue !== void 0 && !wc && (y("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Na() || "A component", t.type), wc = !0);
      var a = e, o = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: yo(t.value != null ? t.value : o),
        controlled: $i(t)
      };
    }
    function Pd(e, t) {
      var a = e, o = t.checked;
      o != null && bi(a, "checked", o, !1);
    }
    function Xl(e, t) {
      var a = e;
      {
        var o = $i(t);
        !a._wrapperState.controlled && o && !Fd && (y("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Fd = !0), a._wrapperState.controlled && !o && !Rc && (y("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Rc = !0);
      }
      Pd(e, t);
      var u = yo(t.value), d = t.type;
      if (u != null)
        d === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Ar(u)) : a.value !== Ar(u) && (a.value = Ar(u));
      else if (d === "submit" || d === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? go(a, t.type, u) : t.hasOwnProperty("defaultValue") && go(a, t.type, yo(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function vs(e, t, a) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, d = u === "submit" || u === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var v = Ar(o._wrapperState.initialValue);
        a || v !== o.value && (o.value = v), o.defaultValue = v;
      }
      var b = o.name;
      b !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, b !== "" && (o.name = b);
    }
    function gh(e, t) {
      var a = e;
      Xl(a, t), ya(a, t);
    }
    function ya(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        A(a, "name");
        for (var u = o.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), d = 0; d < u.length; d++) {
          var v = u[d];
          if (!(v === e || v.form !== e.form)) {
            var b = Zm(v);
            if (!b)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            yh(v), Xl(v, b);
          }
        }
      }
    }
    function go(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || xc(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Ar(e._wrapperState.initialValue) : e.defaultValue !== Ar(a) && (e.defaultValue = Ar(a)));
    }
    var _c = !1, Zl = !1, Sh = !1;
    function kc(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? i.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Zl || (Zl = !0, y("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Sh || (Sh = !0, y("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !_c && (y("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), _c = !0);
    }
    function jd(e, t) {
      t.value != null && e.setAttribute("value", Ar(yo(t.value)));
    }
    var hs = Array.isArray;
    function sr(e) {
      return hs(e);
    }
    var Oc;
    Oc = !1;
    function bh() {
      var e = Na();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Ch = ["value", "defaultValue"];
    function l0(e) {
      {
        ql("select", e);
        for (var t = 0; t < Ch.length; t++) {
          var a = Ch[t];
          if (e[a] != null) {
            var o = sr(e[a]);
            e.multiple && !o ? y("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, bh()) : !e.multiple && o && y("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, bh());
          }
        }
      }
    }
    function So(e, t, a, o) {
      var u = e.options;
      if (t) {
        for (var d = a, v = {}, b = 0; b < d.length; b++)
          v["$" + d[b]] = !0;
        for (var C = 0; C < u.length; C++) {
          var T = v.hasOwnProperty("$" + u[C].value);
          u[C].selected !== T && (u[C].selected = T), T && o && (u[C].defaultSelected = !0);
        }
      } else {
        for (var w = Ar(yo(a)), j = null, U = 0; U < u.length; U++) {
          if (u[U].value === w) {
            u[U].selected = !0, o && (u[U].defaultSelected = !0);
            return;
          }
          j === null && !u[U].disabled && (j = u[U]);
        }
        j !== null && (j.selected = !0);
      }
    }
    function $d(e, t) {
      return At({}, t, {
        value: void 0
      });
    }
    function Eh(e, t) {
      var a = e;
      l0(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Oc && (y("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Oc = !0);
    }
    function u0(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var o = t.value;
      o != null ? So(a, !!t.multiple, o, !1) : t.defaultValue != null && So(a, !!t.multiple, t.defaultValue, !0);
    }
    function s0(e, t) {
      var a = e, o = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? So(a, !!t.multiple, u, !1) : o !== !!t.multiple && (t.defaultValue != null ? So(a, !!t.multiple, t.defaultValue, !0) : So(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function c0(e, t) {
      var a = e, o = t.value;
      o != null && So(a, !!t.multiple, o, !1);
    }
    var Vd = !1;
    function Bd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = At({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Ar(a._wrapperState.initialValue)
      });
      return o;
    }
    function Th(e, t) {
      var a = e;
      ql("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Vd && (y("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Na() || "A component"), Vd = !0);
      var o = t.value;
      if (o == null) {
        var u = t.children, d = t.defaultValue;
        if (u != null) {
          y("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (sr(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            d = u;
          }
        }
        d == null && (d = ""), o = d;
      }
      a._wrapperState = {
        initialValue: yo(o)
      };
    }
    function xh(e, t) {
      var a = e, o = yo(t.value), u = yo(t.defaultValue);
      if (o != null) {
        var d = Ar(o);
        d !== a.value && (a.value = d), t.defaultValue == null && a.defaultValue !== d && (a.defaultValue = d);
      }
      u != null && (a.defaultValue = Ar(u));
    }
    function wh(e, t) {
      var a = e, o = a.textContent;
      o === a._wrapperState.initialValue && o !== "" && o !== null && (a.value = o);
    }
    function Hd(e, t) {
      xh(e, t);
    }
    var Vi = "http://www.w3.org/1999/xhtml", f0 = "http://www.w3.org/1998/Math/MathML", Id = "http://www.w3.org/2000/svg";
    function Dc(e) {
      switch (e) {
        case "svg":
          return Id;
        case "math":
          return f0;
        default:
          return Vi;
      }
    }
    function Yd(e, t) {
      return e == null || e === Vi ? Dc(t) : e === Id && t === "foreignObject" ? Vi : e;
    }
    var d0 = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, o, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, o, u);
        });
      } : e;
    }, Ac, Rh = d0(function(e, t) {
      if (e.namespaceURI === Id && !("innerHTML" in e)) {
        Ac = Ac || document.createElement("div"), Ac.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Ac.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Xr = 1, Bi = 3, Wn = 8, ui = 9, il = 11, Mc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Bi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, _h = {
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
    }, Jl = {
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
    function kh(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Oh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Jl).forEach(function(e) {
      Oh.forEach(function(t) {
        Jl[kh(t, e)] = Jl[e];
      });
    });
    function Nc(e, t, a) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !a && typeof t == "number" && t !== 0 && !(Jl.hasOwnProperty(e) && Jl[e]) ? t + "px" : (_e(t, e), ("" + t).trim());
    }
    var eu = /([A-Z])/g, p0 = /^ms-/;
    function v0(e) {
      return e.replace(eu, "-$1").toLowerCase().replace(p0, "-ms-");
    }
    var Dh = function() {
    };
    {
      var Ah = /^(?:webkit|moz|o)[A-Z]/, Mh = /^-ms-/, ms = /-(.)/g, tu = /;\s*$/, nu = {}, ru = {}, Nh = !1, Wd = !1, Gd = function(e) {
        return e.replace(ms, function(t, a) {
          return a.toUpperCase();
        });
      }, Qd = function(e) {
        nu.hasOwnProperty(e) && nu[e] || (nu[e] = !0, y(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Gd(e.replace(Mh, "ms-"))
        ));
      }, Lh = function(e) {
        nu.hasOwnProperty(e) && nu[e] || (nu[e] = !0, y("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, zh = function(e, t) {
        ru.hasOwnProperty(t) && ru[t] || (ru[t] = !0, y(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(tu, "")));
      }, Uh = function(e, t) {
        Nh || (Nh = !0, y("`NaN` is an invalid value for the `%s` css style property.", e));
      }, h0 = function(e, t) {
        Wd || (Wd = !0, y("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Dh = function(e, t) {
        e.indexOf("-") > -1 ? Qd(e) : Ah.test(e) ? Lh(e) : tu.test(t) && zh(e, t), typeof t == "number" && (isNaN(t) ? Uh(e, t) : isFinite(t) || h0(e, t));
      };
    }
    var m0 = Dh;
    function y0(e) {
      {
        var t = "", a = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var u = e[o];
            if (u != null) {
              var d = o.indexOf("--") === 0;
              t += a + (d ? o : v0(o)) + ":", t += Nc(o, u, d), a = ";";
            }
          }
        return t || null;
      }
    }
    function Fh(e, t) {
      var a = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var u = o.indexOf("--") === 0;
          u || m0(o, t[o]);
          var d = Nc(o, t[o], u);
          o === "float" && (o = "cssFloat"), u ? a.setProperty(o, d) : a[o] = d;
        }
    }
    function g0(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function La(e) {
      var t = {};
      for (var a in e)
        for (var o = _h[a] || [a], u = 0; u < o.length; u++)
          t[o[u]] = a;
      return t;
    }
    function ys(e, t) {
      {
        if (!t)
          return;
        var a = La(e), o = La(t), u = {};
        for (var d in a) {
          var v = a[d], b = o[d];
          if (b && v !== b) {
            var C = v + "," + b;
            if (u[C])
              continue;
            u[C] = !0, y("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", g0(e[v]) ? "Removing" : "Updating", v, b);
          }
        }
      }
    }
    var Ph = {
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
    }, jh = At({
      menuitem: !0
    }, Ph), $h = "__html";
    function Lc(e, t) {
      if (t) {
        if (jh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !($h in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && y("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Hi(e, t) {
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
    var zc = {
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
    }, Vh = {
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
    }, si = {}, qd = new RegExp("^(aria)-[" + at + "]*$"), gs = new RegExp("^(aria)[A-Z][" + at + "]*$");
    function Kd(e, t) {
      {
        if (Le.call(si, t) && si[t])
          return !0;
        if (gs.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), o = Vh.hasOwnProperty(a) ? a : null;
          if (o == null)
            return y("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), si[t] = !0, !0;
          if (t !== o)
            return y("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), si[t] = !0, !0;
        }
        if (qd.test(t)) {
          var u = t.toLowerCase(), d = Vh.hasOwnProperty(u) ? u : null;
          if (d == null)
            return si[t] = !0, !1;
          if (t !== d)
            return y("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), si[t] = !0, !0;
        }
      }
      return !0;
    }
    function Bh(e, t) {
      {
        var a = [];
        for (var o in t) {
          var u = Kd(e, o);
          u || a.push(o);
        }
        var d = a.map(function(v) {
          return "`" + v + "`";
        }).join(", ");
        a.length === 1 ? y("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : a.length > 1 && y("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function Uc(e, t) {
      Hi(e, t) || Bh(e, t);
    }
    var ol = !1;
    function Xd(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ol && (ol = !0, e === "select" && t.multiple ? y("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : y("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var Zd = function() {
    };
    {
      var cr = {}, Jd = /^on./, Hh = /^on[^A-Z]/, Ih = new RegExp("^(aria)-[" + at + "]*$"), Yh = new RegExp("^(aria)[A-Z][" + at + "]*$");
      Zd = function(e, t, a, o) {
        if (Le.call(cr, t) && cr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return y("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), cr[t] = !0, !0;
        if (o != null) {
          var d = o.registrationNameDependencies, v = o.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var b = v.hasOwnProperty(u) ? v[u] : null;
          if (b != null)
            return y("Invalid event handler property `%s`. Did you mean `%s`?", t, b), cr[t] = !0, !0;
          if (Jd.test(t))
            return y("Unknown event handler property `%s`. It will be ignored.", t), cr[t] = !0, !0;
        } else if (Jd.test(t))
          return Hh.test(t) && y("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), cr[t] = !0, !0;
        if (Ih.test(t) || Yh.test(t))
          return !0;
        if (u === "innerhtml")
          return y("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), cr[t] = !0, !0;
        if (u === "aria")
          return y("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), cr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return y("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), cr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return y("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), cr[t] = !0, !0;
        var C = va(t), T = C !== null && C.type === Ve;
        if (zc.hasOwnProperty(u)) {
          var w = zc[u];
          if (w !== t)
            return y("Invalid DOM property `%s`. Did you mean `%s`?", t, w), cr[t] = !0, !0;
        } else if (!T && t !== u)
          return y("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), cr[t] = !0, !0;
        return typeof a == "boolean" && qr(t, a, C, !1) ? (a ? y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), cr[t] = !0, !0) : T ? !0 : qr(t, a, C, !1) ? (cr[t] = !0, !1) : ((a === "false" || a === "true") && C !== null && C.type === Ot && (y("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), cr[t] = !0), !0);
      };
    }
    var Wh = function(e, t, a) {
      {
        var o = [];
        for (var u in t) {
          var d = Zd(e, u, t[u], a);
          d || o.push(u);
        }
        var v = o.map(function(b) {
          return "`" + b + "`";
        }).join(", ");
        o.length === 1 ? y("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", v, e) : o.length > 1 && y("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", v, e);
      }
    };
    function Gh(e, t, a) {
      Hi(e, t) || Wh(e, t, a);
    }
    var Ii = 1, Ss = 2, ll = 4, S0 = Ii | Ss | ll, bs = null;
    function Cs(e) {
      bs !== null && y("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), bs = e;
    }
    function b0() {
      bs === null && y("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), bs = null;
    }
    function Qh(e) {
      return e === bs;
    }
    function Fc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Bi ? t.parentNode : t;
    }
    var fn = null, bo = null, Yi = null;
    function au(e) {
      var t = Fu(e);
      if (t) {
        if (typeof fn != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var o = Zm(a);
          fn(t.stateNode, t.type, o);
        }
      }
    }
    function qh(e) {
      fn = e;
    }
    function Pc(e) {
      bo ? Yi ? Yi.push(e) : Yi = [e] : bo = e;
    }
    function Es() {
      return bo !== null || Yi !== null;
    }
    function Ts() {
      if (bo) {
        var e = bo, t = Yi;
        if (bo = null, Yi = null, au(e), t)
          for (var a = 0; a < t.length; a++)
            au(t[a]);
      }
    }
    var ul = function(e, t) {
      return e(t);
    }, ep = function() {
    }, tp = !1;
    function C0() {
      var e = Es();
      e && (ep(), Ts());
    }
    function np(e, t, a) {
      if (tp)
        return e(t, a);
      tp = !0;
      try {
        return ul(e, t, a);
      } finally {
        tp = !1, C0();
      }
    }
    function jc(e, t, a) {
      ul = e, ep = a;
    }
    function $c(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function rp(e, t, a) {
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
          return !!(a.disabled && $c(t));
        default:
          return !1;
      }
    }
    function sl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var o = Zm(a);
      if (o === null)
        return null;
      var u = o[t];
      if (rp(t, e.type, o))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var xs = !1;
    if (Ut)
      try {
        var cl = {};
        Object.defineProperty(cl, "passive", {
          get: function() {
            xs = !0;
          }
        }), window.addEventListener("test", cl, cl), window.removeEventListener("test", cl, cl);
      } catch {
        xs = !1;
      }
    function Kh(e, t, a, o, u, d, v, b, C) {
      var T = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, T);
      } catch (w) {
        this.onError(w);
      }
    }
    var ap = Kh;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var ip = document.createElement("react");
      ap = function(t, a, o, u, d, v, b, C, T) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var w = document.createEvent("Event"), j = !1, U = !0, Z = window.event, ee = Object.getOwnPropertyDescriptor(window, "event");
        function re() {
          ip.removeEventListener(ae, ct, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = Z);
        }
        var Ue = Array.prototype.slice.call(arguments, 3);
        function ct() {
          j = !0, re(), a.apply(o, Ue), U = !1;
        }
        var nt, jt = !1, Lt = !1;
        function G(Q) {
          if (nt = Q.error, jt = !0, nt === null && Q.colno === 0 && Q.lineno === 0 && (Lt = !0), Q.defaultPrevented && nt != null && typeof nt == "object")
            try {
              nt._suppressLogging = !0;
            } catch {
            }
        }
        var ae = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", G), ip.addEventListener(ae, ct, !1), w.initEvent(ae, !1, !1), ip.dispatchEvent(w), ee && Object.defineProperty(window, "event", ee), j && U && (jt ? Lt && (nt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : nt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(nt)), window.removeEventListener("error", G), !j)
          return re(), Kh.apply(this, arguments);
      };
    }
    var E0 = ap, Co = !1, ci = null, ws = !1, Eo = null, Ei = {
      onError: function(e) {
        Co = !0, ci = e;
      }
    };
    function fl(e, t, a, o, u, d, v, b, C) {
      Co = !1, ci = null, E0.apply(Ei, arguments);
    }
    function Wi(e, t, a, o, u, d, v, b, C) {
      if (fl.apply(this, arguments), Co) {
        var T = lp();
        ws || (ws = !0, Eo = T);
      }
    }
    function op() {
      if (ws) {
        var e = Eo;
        throw ws = !1, Eo = null, e;
      }
    }
    function T0() {
      return Co;
    }
    function lp() {
      if (Co) {
        var e = ci;
        return Co = !1, ci = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function za(e) {
      return e._reactInternals;
    }
    function Rs(e) {
      return e._reactInternals !== void 0;
    }
    function iu(e, t) {
      e._reactInternals = t;
    }
    var st = (
      /*                      */
      0
    ), To = (
      /*                */
      1
    ), gn = (
      /*                    */
      2
    ), _t = (
      /*                       */
      4
    ), Gt = (
      /*                */
      16
    ), qt = (
      /*                 */
      32
    ), Ti = (
      /*                     */
      64
    ), gt = (
      /*                   */
      128
    ), Ln = (
      /*            */
      256
    ), Zr = (
      /*                          */
      512
    ), Ua = (
      /*                     */
      1024
    ), wn = (
      /*                      */
      2048
    ), Fa = (
      /*                    */
      4096
    ), xo = (
      /*                   */
      8192
    ), _s = (
      /*             */
      16384
    ), Vc = wn | _t | Ti | Zr | Ua | _s, Xh = (
      /*               */
      32767
    ), ga = (
      /*                   */
      32768
    ), fr = (
      /*                */
      65536
    ), ks = (
      /* */
      131072
    ), up = (
      /*                       */
      1048576
    ), sp = (
      /*                    */
      2097152
    ), Jr = (
      /*                 */
      4194304
    ), wo = (
      /*                */
      8388608
    ), ea = (
      /*               */
      16777216
    ), dl = (
      /*              */
      33554432
    ), ou = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      _t | Ua | 0
    ), ta = gn | _t | Gt | qt | Zr | Fa | xo, Mr = _t | Ti | Zr | xo, Pa = wn | Gt, gr = Jr | wo | sp, Gi = f.ReactCurrentOwner;
    function Sa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (gn | Fa)) !== st && (a = t.return), o = t.return;
        while (o);
      }
      return t.tag === O ? a : null;
    }
    function cp(e) {
      if (e.tag === $) {
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
    function Bc(e) {
      return e.tag === O ? e.stateNode.containerInfo : null;
    }
    function fp(e) {
      return Sa(e) === e;
    }
    function ba(e) {
      {
        var t = Gi.current;
        if (t !== null && t.tag === k) {
          var a = t, o = a.stateNode;
          o._warnedAboutRefsInRender || y("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", wt(a) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var u = za(e);
      return u ? Sa(u) === u : !1;
    }
    function na(e) {
      if (Sa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Sn(e) {
      var t = e.alternate;
      if (!t) {
        var a = Sa(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var o = e, u = t; ; ) {
        var d = o.return;
        if (d === null)
          break;
        var v = d.alternate;
        if (v === null) {
          var b = d.return;
          if (b !== null) {
            o = u = b;
            continue;
          }
          break;
        }
        if (d.child === v.child) {
          for (var C = d.child; C; ) {
            if (C === o)
              return na(d), e;
            if (C === u)
              return na(d), t;
            C = C.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== u.return)
          o = d, u = v;
        else {
          for (var T = !1, w = d.child; w; ) {
            if (w === o) {
              T = !0, o = d, u = v;
              break;
            }
            if (w === u) {
              T = !0, u = d, o = v;
              break;
            }
            w = w.sibling;
          }
          if (!T) {
            for (w = v.child; w; ) {
              if (w === o) {
                T = !0, o = v, u = d;
                break;
              }
              if (w === u) {
                T = !0, u = v, o = d;
                break;
              }
              w = w.sibling;
            }
            if (!T)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (o.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (o.tag !== O)
        throw new Error("Unable to find node on an unmounted component.");
      return o.stateNode.current === o ? e : t;
    }
    function ja(e) {
      var t = Sn(e);
      return t !== null ? dp(t) : null;
    }
    function dp(e) {
      if (e.tag === B || e.tag === H)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = dp(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Zh(e) {
      var t = Sn(e);
      return t !== null ? Hc(t) : null;
    }
    function Hc(e) {
      if (e.tag === B || e.tag === H)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== z) {
          var a = Hc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Ic = s.unstable_scheduleCallback, Jh = s.unstable_cancelCallback, Yc = s.unstable_shouldYield, em = s.unstable_requestPaint, On = s.unstable_now, pp = s.unstable_getCurrentPriorityLevel, Wc = s.unstable_ImmediatePriority, pl = s.unstable_UserBlockingPriority, xi = s.unstable_NormalPriority, tm = s.unstable_LowPriority, Gc = s.unstable_IdlePriority, lu = s.unstable_yieldValue, nm = s.unstable_setDisableYieldValue, Qi = null, Jn = null, Ae = null, $a = !1, Ca = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function vp(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return y("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        ht && (e = At({}, e, {
          getLaneLabelMap: qi,
          injectProfilingHooks: rm
        })), Qi = t.inject(e), Jn = t;
      } catch (a) {
        y("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function hp(e, t) {
      if (Jn && typeof Jn.onScheduleFiberRoot == "function")
        try {
          Jn.onScheduleFiberRoot(Qi, e, t);
        } catch (a) {
          $a || ($a = !0, y("React instrumentation encountered an error: %s", a));
        }
    }
    function uu(e, t) {
      if (Jn && typeof Jn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & gt) === gt;
          if (Ie) {
            var o;
            switch (t) {
              case Bn:
                o = Wc;
                break;
              case Xi:
                o = pl;
                break;
              case wi:
                o = xi;
                break;
              case bu:
                o = Gc;
                break;
              default:
                o = xi;
                break;
            }
            Jn.onCommitFiberRoot(Qi, e, o, a);
          }
        } catch (u) {
          $a || ($a = !0, y("React instrumentation encountered an error: %s", u));
        }
    }
    function Va(e) {
      if (Jn && typeof Jn.onPostCommitFiberRoot == "function")
        try {
          Jn.onPostCommitFiberRoot(Qi, e);
        } catch (t) {
          $a || ($a = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function vl(e) {
      if (Jn && typeof Jn.onCommitFiberUnmount == "function")
        try {
          Jn.onCommitFiberUnmount(Qi, e);
        } catch (t) {
          $a || ($a = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function Gn(e) {
      if (typeof lu == "function" && (nm(e), m(e)), Jn && typeof Jn.setStrictMode == "function")
        try {
          Jn.setStrictMode(Qi, e);
        } catch (t) {
          $a || ($a = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function rm(e) {
      Ae = e;
    }
    function qi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Ns; a++) {
          var o = w0(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Ro(e) {
      Ae !== null && typeof Ae.markCommitStarted == "function" && Ae.markCommitStarted(e);
    }
    function Qc() {
      Ae !== null && typeof Ae.markCommitStopped == "function" && Ae.markCommitStopped();
    }
    function su(e) {
      Ae !== null && typeof Ae.markComponentRenderStarted == "function" && Ae.markComponentRenderStarted(e);
    }
    function ra() {
      Ae !== null && typeof Ae.markComponentRenderStopped == "function" && Ae.markComponentRenderStopped();
    }
    function _o(e) {
      Ae !== null && typeof Ae.markComponentPassiveEffectMountStarted == "function" && Ae.markComponentPassiveEffectMountStarted(e);
    }
    function qc() {
      Ae !== null && typeof Ae.markComponentPassiveEffectMountStopped == "function" && Ae.markComponentPassiveEffectMountStopped();
    }
    function am(e) {
      Ae !== null && typeof Ae.markComponentPassiveEffectUnmountStarted == "function" && Ae.markComponentPassiveEffectUnmountStarted(e);
    }
    function Kc() {
      Ae !== null && typeof Ae.markComponentPassiveEffectUnmountStopped == "function" && Ae.markComponentPassiveEffectUnmountStopped();
    }
    function im(e) {
      Ae !== null && typeof Ae.markComponentLayoutEffectMountStarted == "function" && Ae.markComponentLayoutEffectMountStarted(e);
    }
    function Os() {
      Ae !== null && typeof Ae.markComponentLayoutEffectMountStopped == "function" && Ae.markComponentLayoutEffectMountStopped();
    }
    function fi(e) {
      Ae !== null && typeof Ae.markComponentLayoutEffectUnmountStarted == "function" && Ae.markComponentLayoutEffectUnmountStarted(e);
    }
    function cu() {
      Ae !== null && typeof Ae.markComponentLayoutEffectUnmountStopped == "function" && Ae.markComponentLayoutEffectUnmountStopped();
    }
    function Ds(e, t, a) {
      Ae !== null && typeof Ae.markComponentErrored == "function" && Ae.markComponentErrored(e, t, a);
    }
    function hl(e, t, a) {
      Ae !== null && typeof Ae.markComponentSuspended == "function" && Ae.markComponentSuspended(e, t, a);
    }
    function mp(e) {
      Ae !== null && typeof Ae.markLayoutEffectsStarted == "function" && Ae.markLayoutEffectsStarted(e);
    }
    function fu() {
      Ae !== null && typeof Ae.markLayoutEffectsStopped == "function" && Ae.markLayoutEffectsStopped();
    }
    function om(e) {
      Ae !== null && typeof Ae.markPassiveEffectsStarted == "function" && Ae.markPassiveEffectsStarted(e);
    }
    function yp() {
      Ae !== null && typeof Ae.markPassiveEffectsStopped == "function" && Ae.markPassiveEffectsStopped();
    }
    function Rn(e) {
      Ae !== null && typeof Ae.markRenderStarted == "function" && Ae.markRenderStarted(e);
    }
    function Xc() {
      Ae !== null && typeof Ae.markRenderYielded == "function" && Ae.markRenderYielded();
    }
    function Zc() {
      Ae !== null && typeof Ae.markRenderStopped == "function" && Ae.markRenderStopped();
    }
    function gp(e) {
      Ae !== null && typeof Ae.markRenderScheduled == "function" && Ae.markRenderScheduled(e);
    }
    function Jc(e, t) {
      Ae !== null && typeof Ae.markForceUpdateScheduled == "function" && Ae.markForceUpdateScheduled(e, t);
    }
    function As(e, t) {
      Ae !== null && typeof Ae.markStateUpdateScheduled == "function" && Ae.markStateUpdateScheduled(e, t);
    }
    var Ze = (
      /*                         */
      0
    ), tt = (
      /*                 */
      1
    ), St = (
      /*                    */
      2
    ), Mt = (
      /*               */
      8
    ), Ea = (
      /*              */
      16
    ), du = Math.clz32 ? Math.clz32 : Nr, Ms = Math.log, x0 = Math.LN2;
    function Nr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Ms(t) / x0 | 0) | 0;
    }
    var Ns = 31, he = (
      /*                        */
      0
    ), Qn = (
      /*                          */
      0
    ), ot = (
      /*                        */
      1
    ), Sr = (
      /*    */
      2
    ), Ta = (
      /*             */
      4
    ), Ki = (
      /*            */
      8
    ), Ba = (
      /*                     */
      16
    ), pu = (
      /*                */
      32
    ), ml = (
      /*                       */
      4194240
    ), vu = (
      /*                        */
      64
    ), ef = (
      /*                        */
      128
    ), tf = (
      /*                        */
      256
    ), nf = (
      /*                        */
      512
    ), rf = (
      /*                        */
      1024
    ), af = (
      /*                        */
      2048
    ), yl = (
      /*                        */
      4096
    ), of = (
      /*                        */
      8192
    ), hu = (
      /*                        */
      16384
    ), mu = (
      /*                       */
      32768
    ), lf = (
      /*                       */
      65536
    ), Ls = (
      /*                       */
      131072
    ), uf = (
      /*                       */
      262144
    ), sf = (
      /*                       */
      524288
    ), cf = (
      /*                       */
      1048576
    ), ff = (
      /*                       */
      2097152
    ), yu = (
      /*                            */
      130023424
    ), gl = (
      /*                             */
      4194304
    ), df = (
      /*                             */
      8388608
    ), pf = (
      /*                             */
      16777216
    ), Sp = (
      /*                             */
      33554432
    ), vf = (
      /*                             */
      67108864
    ), lm = gl, zs = (
      /*          */
      134217728
    ), bp = (
      /*                          */
      268435455
    ), gu = (
      /*               */
      268435456
    ), ko = (
      /*                        */
      536870912
    ), Lr = (
      /*                   */
      1073741824
    );
    function w0(e) {
      {
        if (e & ot)
          return "Sync";
        if (e & Sr)
          return "InputContinuousHydration";
        if (e & Ta)
          return "InputContinuous";
        if (e & Ki)
          return "DefaultHydration";
        if (e & Ba)
          return "Default";
        if (e & pu)
          return "TransitionHydration";
        if (e & ml)
          return "Transition";
        if (e & yu)
          return "Retry";
        if (e & zs)
          return "SelectiveHydration";
        if (e & gu)
          return "IdleHydration";
        if (e & ko)
          return "Idle";
        if (e & Lr)
          return "Offscreen";
      }
    }
    var hn = -1, hf = vu, aa = gl;
    function Sl(e) {
      switch (Vn(e)) {
        case ot:
          return ot;
        case Sr:
          return Sr;
        case Ta:
          return Ta;
        case Ki:
          return Ki;
        case Ba:
          return Ba;
        case pu:
          return pu;
        case vu:
        case ef:
        case tf:
        case nf:
        case rf:
        case af:
        case yl:
        case of:
        case hu:
        case mu:
        case lf:
        case Ls:
        case uf:
        case sf:
        case cf:
        case ff:
          return e & ml;
        case gl:
        case df:
        case pf:
        case Sp:
        case vf:
          return e & yu;
        case zs:
          return zs;
        case gu:
          return gu;
        case ko:
          return ko;
        case Lr:
          return Lr;
        default:
          return y("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function bl(e, t) {
      var a = e.pendingLanes;
      if (a === he)
        return he;
      var o = he, u = e.suspendedLanes, d = e.pingedLanes, v = a & bp;
      if (v !== he) {
        var b = v & ~u;
        if (b !== he)
          o = Sl(b);
        else {
          var C = v & d;
          C !== he && (o = Sl(C));
        }
      } else {
        var T = a & ~u;
        T !== he ? o = Sl(T) : d !== he && (o = Sl(d));
      }
      if (o === he)
        return he;
      if (t !== he && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === he) {
        var w = Vn(o), j = Vn(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          w >= j || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          w === Ba && (j & ml) !== he
        )
          return t;
      }
      (o & Ta) !== he && (o |= a & Ba);
      var U = e.entangledLanes;
      if (U !== he)
        for (var Z = e.entanglements, ee = o & U; ee > 0; ) {
          var re = Do(ee), Ue = 1 << re;
          o |= Z[re], ee &= ~Ue;
        }
      return o;
    }
    function um(e, t) {
      for (var a = e.eventTimes, o = hn; t > 0; ) {
        var u = Do(t), d = 1 << u, v = a[u];
        v > o && (o = v), t &= ~d;
      }
      return o;
    }
    function sm(e, t) {
      switch (e) {
        case ot:
        case Sr:
        case Ta:
          return t + 250;
        case Ki:
        case Ba:
        case pu:
        case vu:
        case ef:
        case tf:
        case nf:
        case rf:
        case af:
        case yl:
        case of:
        case hu:
        case mu:
        case lf:
        case Ls:
        case uf:
        case sf:
        case cf:
        case ff:
          return t + 5e3;
        case gl:
        case df:
        case pf:
        case Sp:
        case vf:
          return hn;
        case zs:
        case gu:
        case ko:
        case Lr:
          return hn;
        default:
          return y("Should have found matching lanes. This is a bug in React."), hn;
      }
    }
    function cm(e, t) {
      for (var a = e.pendingLanes, o = e.suspendedLanes, u = e.pingedLanes, d = e.expirationTimes, v = a; v > 0; ) {
        var b = Do(v), C = 1 << b, T = d[b];
        T === hn ? ((C & o) === he || (C & u) !== he) && (d[b] = sm(C, t)) : T <= t && (e.expiredLanes |= C), v &= ~C;
      }
    }
    function Cp(e) {
      return Sl(e.pendingLanes);
    }
    function Oo(e) {
      var t = e.pendingLanes & ~Lr;
      return t !== he ? t : t & Lr ? Lr : he;
    }
    function Ep(e) {
      return (e & ot) !== he;
    }
    function Us(e) {
      return (e & bp) !== he;
    }
    function fm(e) {
      return (e & yu) === e;
    }
    function dm(e) {
      var t = ot | Ta | Ba;
      return (e & t) === he;
    }
    function pm(e) {
      return (e & ml) === e;
    }
    function Fs(e, t) {
      var a = Sr | Ta | Ki | Ba;
      return (t & a) !== he;
    }
    function vm(e, t) {
      return (t & e.expiredLanes) !== he;
    }
    function Tp(e) {
      return (e & ml) !== he;
    }
    function hm() {
      var e = hf;
      return hf <<= 1, (hf & ml) === he && (hf = vu), e;
    }
    function ia() {
      var e = aa;
      return aa <<= 1, (aa & yu) === he && (aa = gl), e;
    }
    function Vn(e) {
      return e & -e;
    }
    function Su(e) {
      return Vn(e);
    }
    function Do(e) {
      return 31 - du(e);
    }
    function mf(e) {
      return Do(e);
    }
    function oa(e, t) {
      return (e & t) !== he;
    }
    function Cl(e, t) {
      return (e & t) === t;
    }
    function Rt(e, t) {
      return e | t;
    }
    function Ps(e, t) {
      return e & ~t;
    }
    function yf(e, t) {
      return e & t;
    }
    function R0(e) {
      return e;
    }
    function mm(e, t) {
      return e !== Qn && e < t ? e : t;
    }
    function js(e) {
      for (var t = [], a = 0; a < Ns; a++)
        t.push(e);
      return t;
    }
    function El(e, t, a) {
      e.pendingLanes |= t, t !== ko && (e.suspendedLanes = he, e.pingedLanes = he);
      var o = e.eventTimes, u = mf(t);
      o[u] = a;
    }
    function ym(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, o = t; o > 0; ) {
        var u = Do(o), d = 1 << u;
        a[u] = hn, o &= ~d;
      }
    }
    function gf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Sf(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = he, e.pingedLanes = he, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, u = e.eventTimes, d = e.expirationTimes, v = a; v > 0; ) {
        var b = Do(v), C = 1 << b;
        o[b] = he, u[b] = hn, d[b] = hn, v &= ~C;
      }
    }
    function xp(e, t) {
      for (var a = e.entangledLanes |= t, o = e.entanglements, u = a; u; ) {
        var d = Do(u), v = 1 << d;
        // Is this one of the newly entangled lanes?
        v & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[d] & t && (o[d] |= t), u &= ~v;
      }
    }
    function gm(e, t) {
      var a = Vn(t), o;
      switch (a) {
        case Ta:
          o = Sr;
          break;
        case Ba:
          o = Ki;
          break;
        case vu:
        case ef:
        case tf:
        case nf:
        case rf:
        case af:
        case yl:
        case of:
        case hu:
        case mu:
        case lf:
        case Ls:
        case uf:
        case sf:
        case cf:
        case ff:
        case gl:
        case df:
        case pf:
        case Sp:
        case vf:
          o = pu;
          break;
        case ko:
          o = gu;
          break;
        default:
          o = Qn;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Qn ? Qn : o;
    }
    function bf(e, t, a) {
      if (Ca)
        for (var o = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = mf(a), d = 1 << u, v = o[u];
          v.add(t), a &= ~d;
        }
    }
    function wp(e, t) {
      if (Ca)
        for (var a = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var u = mf(t), d = 1 << u, v = a[u];
          v.size > 0 && (v.forEach(function(b) {
            var C = b.alternate;
            (C === null || !o.has(C)) && o.add(b);
          }), v.clear()), t &= ~d;
        }
    }
    function $s(e, t) {
      return null;
    }
    var Bn = ot, Xi = Ta, wi = Ba, bu = ko, Cu = Qn;
    function Ha() {
      return Cu;
    }
    function zn(e) {
      Cu = e;
    }
    function zr(e, t) {
      var a = Cu;
      try {
        return Cu = e, t();
      } finally {
        Cu = a;
      }
    }
    function _0(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function k0(e, t) {
      return e > t ? e : t;
    }
    function Eu(e, t) {
      return e !== 0 && e < t;
    }
    function br(e) {
      var t = Vn(e);
      return Eu(Bn, t) ? Eu(Xi, t) ? Us(t) ? wi : bu : Xi : Bn;
    }
    function Cf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var He;
    function Tu(e) {
      He = e;
    }
    function Rp(e) {
      He(e);
    }
    var Ef;
    function O0(e) {
      Ef = e;
    }
    var xu;
    function Tf(e) {
      xu = e;
    }
    var xf;
    function Sm(e) {
      xf = e;
    }
    var _p;
    function bm(e) {
      _p = e;
    }
    var Vs = !1, wu = [], _n = null, dr = null, Pr = null, Ru = /* @__PURE__ */ new Map(), _u = /* @__PURE__ */ new Map(), pr = [], Cm = [
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
    function Ri(e) {
      return Cm.indexOf(e) > -1;
    }
    function D0(e, t, a, o, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [o]
      };
    }
    function kp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          _n = null;
          break;
        case "dragenter":
        case "dragleave":
          dr = null;
          break;
        case "mouseover":
        case "mouseout":
          Pr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Ru.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          _u.delete(o);
          break;
        }
      }
    }
    function ku(e, t, a, o, u, d) {
      if (e === null || e.nativeEvent !== d) {
        var v = D0(t, a, o, u, d);
        if (t !== null) {
          var b = Fu(t);
          b !== null && Ef(b);
        }
        return v;
      }
      e.eventSystemFlags |= o;
      var C = e.targetContainers;
      return u !== null && C.indexOf(u) === -1 && C.push(u), e;
    }
    function Em(e, t, a, o, u) {
      switch (t) {
        case "focusin": {
          var d = u;
          return _n = ku(_n, e, t, a, o, d), !0;
        }
        case "dragenter": {
          var v = u;
          return dr = ku(dr, e, t, a, o, v), !0;
        }
        case "mouseover": {
          var b = u;
          return Pr = ku(Pr, e, t, a, o, b), !0;
        }
        case "pointerover": {
          var C = u, T = C.pointerId;
          return Ru.set(T, ku(Ru.get(T) || null, e, t, a, o, C)), !0;
        }
        case "gotpointercapture": {
          var w = u, j = w.pointerId;
          return _u.set(j, ku(_u.get(j) || null, e, t, a, o, w)), !0;
        }
      }
      return !1;
    }
    function Op(e) {
      var t = Js(e.target);
      if (t !== null) {
        var a = Sa(t);
        if (a !== null) {
          var o = a.tag;
          if (o === $) {
            var u = cp(a);
            if (u !== null) {
              e.blockedOn = u, _p(e.priority, function() {
                xu(a);
              });
              return;
            }
          } else if (o === O) {
            var d = a.stateNode;
            if (Cf(d)) {
              e.blockedOn = Bc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function A0(e) {
      for (var t = xf(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < pr.length && Eu(t, pr[o].priority); o++)
        ;
      pr.splice(o, 0, a), o === 0 && Op(a);
    }
    function Tl(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], o = Ur(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (o === null) {
          var u = e.nativeEvent, d = new u.constructor(u.type, u);
          Cs(d), u.target.dispatchEvent(d), b0();
        } else {
          var v = Fu(o);
          return v !== null && Ef(v), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function wf(e, t, a) {
      Tl(e) && a.delete(t);
    }
    function Ia() {
      Vs = !1, _n !== null && Tl(_n) && (_n = null), dr !== null && Tl(dr) && (dr = null), Pr !== null && Tl(Pr) && (Pr = null), Ru.forEach(wf), _u.forEach(wf);
    }
    function Nt(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Vs || (Vs = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, Ia)));
    }
    function Un(e) {
      if (wu.length > 0) {
        Nt(wu[0], e);
        for (var t = 1; t < wu.length; t++) {
          var a = wu[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      _n !== null && Nt(_n, e), dr !== null && Nt(dr, e), Pr !== null && Nt(Pr, e);
      var o = function(b) {
        return Nt(b, e);
      };
      Ru.forEach(o), _u.forEach(o);
      for (var u = 0; u < pr.length; u++) {
        var d = pr[u];
        d.blockedOn === e && (d.blockedOn = null);
      }
      for (; pr.length > 0; ) {
        var v = pr[0];
        if (v.blockedOn !== null)
          break;
        Op(v), v.blockedOn === null && pr.shift();
      }
    }
    var bn = f.ReactCurrentBatchConfig, er = !0;
    function la(e) {
      er = !!e;
    }
    function Ou() {
      return er;
    }
    function tr(e, t, a) {
      var o = Rf(t), u;
      switch (o) {
        case Bn:
          u = Bs;
          break;
        case Xi:
          u = xl;
          break;
        case wi:
        default:
          u = Du;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Bs(e, t, a, o) {
      var u = Ha(), d = bn.transition;
      bn.transition = null;
      try {
        zn(Bn), Du(e, t, a, o);
      } finally {
        zn(u), bn.transition = d;
      }
    }
    function xl(e, t, a, o) {
      var u = Ha(), d = bn.transition;
      bn.transition = null;
      try {
        zn(Xi), Du(e, t, a, o);
      } finally {
        zn(u), bn.transition = d;
      }
    }
    function Du(e, t, a, o) {
      er && Dp(e, t, a, o);
    }
    function Dp(e, t, a, o) {
      var u = Ur(e, t, a, o);
      if (u === null) {
        Q0(e, t, o, Ao, a), kp(e, o);
        return;
      }
      if (Em(u, e, t, a, o)) {
        o.stopPropagation();
        return;
      }
      if (kp(e, o), t & ll && Ri(e)) {
        for (; u !== null; ) {
          var d = Fu(u);
          d !== null && Rp(d);
          var v = Ur(e, t, a, o);
          if (v === null && Q0(e, t, o, Ao, a), v === u)
            break;
          u = v;
        }
        u !== null && o.stopPropagation();
        return;
      }
      Q0(e, t, o, null, a);
    }
    var Ao = null;
    function Ur(e, t, a, o) {
      Ao = null;
      var u = Fc(o), d = Js(u);
      if (d !== null) {
        var v = Sa(d);
        if (v === null)
          d = null;
        else {
          var b = v.tag;
          if (b === $) {
            var C = cp(v);
            if (C !== null)
              return C;
            d = null;
          } else if (b === O) {
            var T = v.stateNode;
            if (Cf(T))
              return Bc(v);
            d = null;
          } else v !== d && (d = null);
        }
      }
      return Ao = d, null;
    }
    function Rf(e) {
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
          return Bn;
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
          return Xi;
        case "message": {
          var t = pp();
          switch (t) {
            case Wc:
              return Bn;
            case pl:
              return Xi;
            case xi:
            case tm:
              return wi;
            case Gc:
              return bu;
            default:
              return wi;
          }
        }
        default:
          return wi;
      }
    }
    function Au(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function Zi(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function _f(e, t, a, o) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }), a;
    }
    function Ap(e, t, a, o) {
      return e.addEventListener(t, a, {
        passive: o
      }), a;
    }
    var Ya = null, Mu = null, Wa = null;
    function kf(e) {
      return Ya = e, Mu = Is(), !0;
    }
    function Hs() {
      Ya = null, Mu = null, Wa = null;
    }
    function Of() {
      if (Wa)
        return Wa;
      var e, t = Mu, a = t.length, o, u = Is(), d = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var v = a - e;
      for (o = 1; o <= v && t[a - o] === u[d - o]; o++)
        ;
      var b = o > 1 ? 1 - o : void 0;
      return Wa = u.slice(e, b), Wa;
    }
    function Is() {
      return "value" in Ya ? Ya.value : Ya.textContent;
    }
    function wl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function vr() {
      return !0;
    }
    function Ji() {
      return !1;
    }
    function Dn(e) {
      function t(a, o, u, d, v) {
        this._reactName = a, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = v, this.currentTarget = null;
        for (var b in e)
          if (e.hasOwnProperty(b)) {
            var C = e[b];
            C ? this[b] = C(d) : this[b] = d[b];
          }
        var T = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return T ? this.isDefaultPrevented = vr : this.isDefaultPrevented = Ji, this.isPropagationStopped = Ji, this;
      }
      return At(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = vr);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = vr);
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
        isPersistent: vr
      }), t;
    }
    var nr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Df = Dn(nr), Rl = At({}, nr, {
      view: 0,
      detail: 0
    }), Mp = Dn(Rl), Np, _i, Nu;
    function Lp(e) {
      e !== Nu && (Nu && e.type === "mousemove" ? (Np = e.screenX - Nu.screenX, _i = e.screenY - Nu.screenY) : (Np = 0, _i = 0), Nu = e);
    }
    var ki = At({}, Rl, {
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
      getModifierState: zp,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Lp(e), Np);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : _i;
      }
    }), Af = Dn(ki), _l = At({}, ki, {
      dataTransfer: 0
    }), Tm = Dn(_l), xm = At({}, Rl, {
      relatedTarget: 0
    }), Ys = Dn(xm), Mf = At({}, nr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), M0 = Dn(Mf), N0 = At({}, nr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), wm = Dn(N0), Rm = At({}, nr, {
      data: 0
    }), Mo = Dn(Rm), L0 = Mo, Lu = {
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
    }, _m = {
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
    function Fn(e) {
      if (e.key) {
        var t = Lu[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = wl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? _m[e.keyCode] || "Unidentified" : "";
    }
    var z0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function km(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var o = z0[e];
      return o ? !!a[o] : !1;
    }
    function zp(e) {
      return km;
    }
    var U0 = At({}, Rl, {
      key: Fn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: zp,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? wl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? wl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Om = Dn(U0), Dm = At({}, ki, {
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
    }), Am = Dn(Dm), Ga = At({}, Rl, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: zp
    }), Up = Dn(Ga), F0 = At({}, nr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), No = Dn(F0), Nf = At({}, ki, {
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
    }), kl = Dn(Nf), Lf = [9, 13, 27, 32], zf = 229, Ws = Ut && "CompositionEvent" in window, Gs = null;
    Ut && "documentMode" in document && (Gs = document.documentMode);
    var Fp = Ut && "TextEvent" in window && !Gs, Mm = Ut && (!Ws || Gs && Gs > 8 && Gs <= 11), Pp = 32, jp = String.fromCharCode(Pp);
    function Uf() {
      zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Qs = !1;
    function Nm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function $p(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function P0(e, t) {
      return e === "keydown" && t.keyCode === zf;
    }
    function Vp(e, t) {
      switch (e) {
        case "keyup":
          return Lf.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== zf;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Ff(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function qs(e) {
      return e.locale === "ko";
    }
    var Lo = !1;
    function Pf(e, t, a, o, u) {
      var d, v;
      if (Ws ? d = $p(t) : Lo ? Vp(t, o) && (d = "onCompositionEnd") : P0(t, o) && (d = "onCompositionStart"), !d)
        return null;
      Mm && !qs(o) && (!Lo && d === "onCompositionStart" ? Lo = kf(u) : d === "onCompositionEnd" && Lo && (v = Of()));
      var b = jm(a, d);
      if (b.length > 0) {
        var C = new Mo(d, t, null, o, u);
        if (e.push({
          event: C,
          listeners: b
        }), v)
          C.data = v;
        else {
          var T = Ff(o);
          T !== null && (C.data = T);
        }
      }
    }
    function Lm(e, t) {
      switch (e) {
        case "compositionend":
          return Ff(t);
        case "keypress":
          var a = t.which;
          return a !== Pp ? null : (Qs = !0, jp);
        case "textInput":
          var o = t.data;
          return o === jp && Qs ? null : o;
        default:
          return null;
      }
    }
    function j0(e, t) {
      if (Lo) {
        if (e === "compositionend" || !Ws && Vp(e, t)) {
          var a = Of();
          return Hs(), Lo = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Nm(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Mm && !qs(t) ? null : t.data;
        default:
          return null;
      }
    }
    function jf(e, t, a, o, u) {
      var d;
      if (Fp ? d = Lm(t, o) : d = j0(t, o), !d)
        return null;
      var v = jm(a, "onBeforeInput");
      if (v.length > 0) {
        var b = new L0("onBeforeInput", "beforeinput", null, o, u);
        e.push({
          event: b,
          listeners: v
        }), b.data = d;
      }
    }
    function $0(e, t, a, o, u, d, v) {
      Pf(e, t, a, o, u), jf(e, t, a, o, u);
    }
    var Ks = {
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
    function zm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Ks[e.type] : t === "textarea";
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
    function $f(e) {
      if (!Ut)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), a = typeof o[t] == "function";
      }
      return a;
    }
    function n() {
      zt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, o) {
      Pc(o);
      var u = jm(t, "onChange");
      if (u.length > 0) {
        var d = new Df("onChange", "change", null, a, o);
        e.push({
          event: d,
          listeners: u
        });
      }
    }
    var l = null, c = null;
    function p(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function g(e) {
      var t = [];
      r(t, c, e, Fc(e)), np(E, t);
    }
    function E(e) {
      HC(e, 0);
    }
    function D(e) {
      var t = Wf(e);
      if (yh(t))
        return e;
    }
    function L(e, t) {
      if (e === "change")
        return t;
    }
    var J = !1;
    Ut && (J = $f("input") && (!document.documentMode || document.documentMode > 9));
    function ye(e, t) {
      l = e, c = t, l.attachEvent("onpropertychange", me);
    }
    function Ce() {
      l && (l.detachEvent("onpropertychange", me), l = null, c = null);
    }
    function me(e) {
      e.propertyName === "value" && D(c) && g(e);
    }
    function je(e, t, a) {
      e === "focusin" ? (Ce(), ye(t, a)) : e === "focusout" && Ce();
    }
    function Ye(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return D(c);
    }
    function qe(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Hn(e, t) {
      if (e === "click")
        return D(t);
    }
    function Y(e, t) {
      if (e === "input" || e === "change")
        return D(t);
    }
    function P(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || go(e, "number", e.value);
    }
    function q(e, t, a, o, u, d, v) {
      var b = a ? Wf(a) : window, C, T;
      if (p(b) ? C = L : zm(b) ? J ? C = Y : (C = Ye, T = je) : qe(b) && (C = Hn), C) {
        var w = C(t, a);
        if (w) {
          r(e, w, o, u);
          return;
        }
      }
      T && T(t, b, a), t === "focusout" && P(b);
    }
    function xe() {
      we("onMouseEnter", ["mouseout", "mouseover"]), we("onMouseLeave", ["mouseout", "mouseover"]), we("onPointerEnter", ["pointerout", "pointerover"]), we("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function Je(e, t, a, o, u, d, v) {
      var b = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout";
      if (b && !Qh(o)) {
        var T = o.relatedTarget || o.fromElement;
        if (T && (Js(T) || tv(T)))
          return;
      }
      if (!(!C && !b)) {
        var w;
        if (u.window === u)
          w = u;
        else {
          var j = u.ownerDocument;
          j ? w = j.defaultView || j.parentWindow : w = window;
        }
        var U, Z;
        if (C) {
          var ee = o.relatedTarget || o.toElement;
          if (U = a, Z = ee ? Js(ee) : null, Z !== null) {
            var re = Sa(Z);
            (Z !== re || Z.tag !== B && Z.tag !== H) && (Z = null);
          }
        } else
          U = null, Z = a;
        if (U !== Z) {
          var Ue = Af, ct = "onMouseLeave", nt = "onMouseEnter", jt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Ue = Am, ct = "onPointerLeave", nt = "onPointerEnter", jt = "pointer");
          var Lt = U == null ? w : Wf(U), G = Z == null ? w : Wf(Z), ae = new Ue(ct, jt + "leave", U, o, u);
          ae.target = Lt, ae.relatedTarget = G;
          var Q = null, Ee = Js(u);
          if (Ee === a) {
            var Be = new Ue(nt, jt + "enter", Z, o, u);
            Be.target = G, Be.relatedTarget = Lt, Q = Be;
          }
          N_(e, ae, Q, U, Z);
        }
      }
    }
    function ft(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var We = typeof Object.is == "function" ? Object.is : ft;
    function pt(e, t) {
      if (We(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), o = Object.keys(t);
      if (a.length !== o.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var d = a[u];
        if (!Le.call(t, d) || !We(e[d], t[d]))
          return !1;
      }
      return !0;
    }
    function rr(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ht(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function eo(e, t) {
      for (var a = rr(e), o = 0, u = 0; a; ) {
        if (a.nodeType === Bi) {
          if (u = o + a.textContent.length, o <= t && u >= t)
            return {
              node: a,
              offset: t - o
            };
          o = u;
        }
        a = rr(Ht(a));
      }
    }
    function V0(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, o = a.getSelection && a.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var u = o.anchorNode, d = o.anchorOffset, v = o.focusNode, b = o.focusOffset;
      try {
        u.nodeType, v.nodeType;
      } catch {
        return null;
      }
      return p_(e, u, d, v, b);
    }
    function p_(e, t, a, o, u) {
      var d = 0, v = -1, b = -1, C = 0, T = 0, w = e, j = null;
      e: for (; ; ) {
        for (var U = null; w === t && (a === 0 || w.nodeType === Bi) && (v = d + a), w === o && (u === 0 || w.nodeType === Bi) && (b = d + u), w.nodeType === Bi && (d += w.nodeValue.length), (U = w.firstChild) !== null; )
          j = w, w = U;
        for (; ; ) {
          if (w === e)
            break e;
          if (j === t && ++C === a && (v = d), j === o && ++T === u && (b = d), (U = w.nextSibling) !== null)
            break;
          w = j, j = w.parentNode;
        }
        w = U;
      }
      return v === -1 || b === -1 ? null : {
        start: v,
        end: b
      };
    }
    function v_(e, t) {
      var a = e.ownerDocument || document, o = a && a.defaultView || window;
      if (o.getSelection) {
        var u = o.getSelection(), d = e.textContent.length, v = Math.min(t.start, d), b = t.end === void 0 ? v : Math.min(t.end, d);
        if (!u.extend && v > b) {
          var C = b;
          b = v, v = C;
        }
        var T = eo(e, v), w = eo(e, b);
        if (T && w) {
          if (u.rangeCount === 1 && u.anchorNode === T.node && u.anchorOffset === T.offset && u.focusNode === w.node && u.focusOffset === w.offset)
            return;
          var j = a.createRange();
          j.setStart(T.node, T.offset), u.removeAllRanges(), v > b ? (u.addRange(j), u.extend(w.node, w.offset)) : (j.setEnd(w.node, w.offset), u.addRange(j));
        }
      }
    }
    function AC(e) {
      return e && e.nodeType === Bi;
    }
    function MC(e, t) {
      return !e || !t ? !1 : e === t ? !0 : AC(e) ? !1 : AC(t) ? MC(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function h_(e) {
      return e && e.ownerDocument && MC(e.ownerDocument.documentElement, e);
    }
    function m_(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function NC() {
      for (var e = window, t = xc(); t instanceof e.HTMLIFrameElement; ) {
        if (m_(t))
          e = t.contentWindow;
        else
          return t;
        t = xc(e.document);
      }
      return t;
    }
    function B0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function y_() {
      var e = NC();
      return {
        focusedElem: e,
        selectionRange: B0(e) ? S_(e) : null
      };
    }
    function g_(e) {
      var t = NC(), a = e.focusedElem, o = e.selectionRange;
      if (t !== a && h_(a)) {
        o !== null && B0(a) && b_(a, o);
        for (var u = [], d = a; d = d.parentNode; )
          d.nodeType === Xr && u.push({
            element: d,
            left: d.scrollLeft,
            top: d.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var v = 0; v < u.length; v++) {
          var b = u[v];
          b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
        }
      }
    }
    function S_(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = V0(e), t || {
        start: 0,
        end: 0
      };
    }
    function b_(e, t) {
      var a = t.start, o = t.end;
      o === void 0 && (o = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(o, e.value.length)) : v_(e, t);
    }
    var C_ = Ut && "documentMode" in document && document.documentMode <= 11;
    function E_() {
      zt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Vf = null, H0 = null, Bp = null, I0 = !1;
    function T_(e) {
      if ("selectionStart" in e && B0(e))
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
    function x_(e) {
      return e.window === e ? e.document : e.nodeType === ui ? e : e.ownerDocument;
    }
    function LC(e, t, a) {
      var o = x_(a);
      if (!(I0 || Vf == null || Vf !== xc(o))) {
        var u = T_(Vf);
        if (!Bp || !pt(Bp, u)) {
          Bp = u;
          var d = jm(H0, "onSelect");
          if (d.length > 0) {
            var v = new Df("onSelect", "select", null, t, a);
            e.push({
              event: v,
              listeners: d
            }), v.target = Vf;
          }
        }
      }
    }
    function w_(e, t, a, o, u, d, v) {
      var b = a ? Wf(a) : window;
      switch (t) {
        case "focusin":
          (zm(b) || b.contentEditable === "true") && (Vf = b, H0 = a, Bp = null);
          break;
        case "focusout":
          Vf = null, H0 = null, Bp = null;
          break;
        case "mousedown":
          I0 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          I0 = !1, LC(e, o, u);
          break;
        case "selectionchange":
          if (C_)
            break;
        case "keydown":
        case "keyup":
          LC(e, o, u);
      }
    }
    function Um(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Bf = {
      animationend: Um("Animation", "AnimationEnd"),
      animationiteration: Um("Animation", "AnimationIteration"),
      animationstart: Um("Animation", "AnimationStart"),
      transitionend: Um("Transition", "TransitionEnd")
    }, Y0 = {}, zC = {};
    Ut && (zC = document.createElement("div").style, "AnimationEvent" in window || (delete Bf.animationend.animation, delete Bf.animationiteration.animation, delete Bf.animationstart.animation), "TransitionEvent" in window || delete Bf.transitionend.transition);
    function Fm(e) {
      if (Y0[e])
        return Y0[e];
      if (!Bf[e])
        return e;
      var t = Bf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in zC)
          return Y0[e] = t[a];
      return e;
    }
    var UC = Fm("animationend"), FC = Fm("animationiteration"), PC = Fm("animationstart"), jC = Fm("transitionend"), $C = /* @__PURE__ */ new Map(), VC = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function zu(e, t) {
      $C.set(e, t), zt(t, [e]);
    }
    function R_() {
      for (var e = 0; e < VC.length; e++) {
        var t = VC[e], a = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        zu(a, "on" + o);
      }
      zu(UC, "onAnimationEnd"), zu(FC, "onAnimationIteration"), zu(PC, "onAnimationStart"), zu("dblclick", "onDoubleClick"), zu("focusin", "onFocus"), zu("focusout", "onBlur"), zu(jC, "onTransitionEnd");
    }
    function __(e, t, a, o, u, d, v) {
      var b = $C.get(t);
      if (b !== void 0) {
        var C = Df, T = t;
        switch (t) {
          case "keypress":
            if (wl(o) === 0)
              return;
          case "keydown":
          case "keyup":
            C = Om;
            break;
          case "focusin":
            T = "focus", C = Ys;
            break;
          case "focusout":
            T = "blur", C = Ys;
            break;
          case "beforeblur":
          case "afterblur":
            C = Ys;
            break;
          case "click":
            if (o.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            C = Af;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            C = Tm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            C = Up;
            break;
          case UC:
          case FC:
          case PC:
            C = M0;
            break;
          case jC:
            C = No;
            break;
          case "scroll":
            C = Mp;
            break;
          case "wheel":
            C = kl;
            break;
          case "copy":
          case "cut":
          case "paste":
            C = wm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            C = Am;
            break;
        }
        var w = (d & ll) !== 0;
        {
          var j = !w && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", U = A_(a, b, o.type, w, j);
          if (U.length > 0) {
            var Z = new C(b, T, null, o, u);
            e.push({
              event: Z,
              listeners: U
            });
          }
        }
      }
    }
    R_(), xe(), n(), E_(), Uf();
    function k_(e, t, a, o, u, d, v) {
      __(e, t, a, o, u, d);
      var b = (d & S0) === 0;
      b && (Je(e, t, a, o, u), q(e, t, a, o, u), w_(e, t, a, o, u), $0(e, t, a, o, u));
    }
    var Hp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], W0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Hp));
    function BC(e, t, a) {
      var o = e.type || "unknown-event";
      e.currentTarget = a, Wi(o, t, void 0, e), e.currentTarget = null;
    }
    function O_(e, t, a) {
      var o;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var d = t[u], v = d.instance, b = d.currentTarget, C = d.listener;
          if (v !== o && e.isPropagationStopped())
            return;
          BC(e, C, b), o = v;
        }
      else
        for (var T = 0; T < t.length; T++) {
          var w = t[T], j = w.instance, U = w.currentTarget, Z = w.listener;
          if (j !== o && e.isPropagationStopped())
            return;
          BC(e, Z, U), o = j;
        }
    }
    function HC(e, t) {
      for (var a = (t & ll) !== 0, o = 0; o < e.length; o++) {
        var u = e[o], d = u.event, v = u.listeners;
        O_(d, v, a);
      }
      op();
    }
    function D_(e, t, a, o, u) {
      var d = Fc(a), v = [];
      k_(v, e, o, a, d, t), HC(v, t);
    }
    function An(e, t) {
      W0.has(e) || y('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, o = oO(t), u = L_(e);
      o.has(u) || (IC(t, e, Ss, a), o.add(u));
    }
    function G0(e, t, a) {
      W0.has(e) && !t && y('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= ll), IC(a, e, o, t);
    }
    var Pm = "_reactListening" + Math.random().toString(36).slice(2);
    function Ip(e) {
      if (!e[Pm]) {
        e[Pm] = !0, rt.forEach(function(a) {
          a !== "selectionchange" && (W0.has(a) || G0(a, !1, e), G0(a, !0, e));
        });
        var t = e.nodeType === ui ? e : e.ownerDocument;
        t !== null && (t[Pm] || (t[Pm] = !0, G0("selectionchange", !1, t)));
      }
    }
    function IC(e, t, a, o, u) {
      var d = tr(e, t, a), v = void 0;
      xs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (v = !0), e = e, o ? v !== void 0 ? _f(e, t, d, v) : Zi(e, t, d) : v !== void 0 ? Ap(e, t, d, v) : Au(e, t, d);
    }
    function YC(e, t) {
      return e === t || e.nodeType === Wn && e.parentNode === t;
    }
    function Q0(e, t, a, o, u) {
      var d = o;
      if (!(t & Ii) && !(t & Ss)) {
        var v = u;
        if (o !== null) {
          var b = o;
          e: for (; ; ) {
            if (b === null)
              return;
            var C = b.tag;
            if (C === O || C === z) {
              var T = b.stateNode.containerInfo;
              if (YC(T, v))
                break;
              if (C === z)
                for (var w = b.return; w !== null; ) {
                  var j = w.tag;
                  if (j === O || j === z) {
                    var U = w.stateNode.containerInfo;
                    if (YC(U, v))
                      return;
                  }
                  w = w.return;
                }
              for (; T !== null; ) {
                var Z = Js(T);
                if (Z === null)
                  return;
                var ee = Z.tag;
                if (ee === B || ee === H) {
                  b = d = Z;
                  continue e;
                }
                T = T.parentNode;
              }
            }
            b = b.return;
          }
        }
      }
      np(function() {
        return D_(e, t, a, d);
      });
    }
    function Yp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function A_(e, t, a, o, u, d) {
      for (var v = t !== null ? t + "Capture" : null, b = o ? v : t, C = [], T = e, w = null; T !== null; ) {
        var j = T, U = j.stateNode, Z = j.tag;
        if (Z === B && U !== null && (w = U, b !== null)) {
          var ee = sl(T, b);
          ee != null && C.push(Yp(T, ee, w));
        }
        if (u)
          break;
        T = T.return;
      }
      return C;
    }
    function jm(e, t) {
      for (var a = t + "Capture", o = [], u = e; u !== null; ) {
        var d = u, v = d.stateNode, b = d.tag;
        if (b === B && v !== null) {
          var C = v, T = sl(u, a);
          T != null && o.unshift(Yp(u, T, C));
          var w = sl(u, t);
          w != null && o.push(Yp(u, w, C));
        }
        u = u.return;
      }
      return o;
    }
    function Hf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== B);
      return e || null;
    }
    function M_(e, t) {
      for (var a = e, o = t, u = 0, d = a; d; d = Hf(d))
        u++;
      for (var v = 0, b = o; b; b = Hf(b))
        v++;
      for (; u - v > 0; )
        a = Hf(a), u--;
      for (; v - u > 0; )
        o = Hf(o), v--;
      for (var C = u; C--; ) {
        if (a === o || o !== null && a === o.alternate)
          return a;
        a = Hf(a), o = Hf(o);
      }
      return null;
    }
    function WC(e, t, a, o, u) {
      for (var d = t._reactName, v = [], b = a; b !== null && b !== o; ) {
        var C = b, T = C.alternate, w = C.stateNode, j = C.tag;
        if (T !== null && T === o)
          break;
        if (j === B && w !== null) {
          var U = w;
          if (u) {
            var Z = sl(b, d);
            Z != null && v.unshift(Yp(b, Z, U));
          } else if (!u) {
            var ee = sl(b, d);
            ee != null && v.push(Yp(b, ee, U));
          }
        }
        b = b.return;
      }
      v.length !== 0 && e.push({
        event: t,
        listeners: v
      });
    }
    function N_(e, t, a, o, u) {
      var d = o && u ? M_(o, u) : null;
      o !== null && WC(e, t, o, d, !1), u !== null && a !== null && WC(e, a, u, d, !0);
    }
    function L_(e, t) {
      return e + "__bubble";
    }
    var Qa = !1, Wp = "dangerouslySetInnerHTML", $m = "suppressContentEditableWarning", Uu = "suppressHydrationWarning", GC = "autoFocus", Xs = "children", Zs = "style", Vm = "__html", q0, Bm, Gp, QC, Hm, qC, KC;
    q0 = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Bm = function(e, t) {
      Uc(e, t), Xd(e, t), Gh(e, t, {
        registrationNameDependencies: dt,
        possibleRegistrationNames: mt
      });
    }, qC = Ut && !document.documentMode, Gp = function(e, t, a) {
      if (!Qa) {
        var o = Im(a), u = Im(t);
        u !== o && (Qa = !0, y("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(o)));
      }
    }, QC = function(e) {
      if (!Qa) {
        Qa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), y("Extra attributes from the server: %s", t);
      }
    }, Hm = function(e, t) {
      t === !1 ? y("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : y("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, KC = function(e, t) {
      var a = e.namespaceURI === Vi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var z_ = /\r\n?/g, U_ = /\u0000|\uFFFD/g;
    function Im(e) {
      Te(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(z_, `
`).replace(U_, "");
    }
    function Ym(e, t, a, o) {
      var u = Im(t), d = Im(e);
      if (d !== u && (o && (Qa || (Qa = !0, y('Text content did not match. Server: "%s" Client: "%s"', d, u))), a && bt))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function XC(e) {
      return e.nodeType === ui ? e : e.ownerDocument;
    }
    function F_() {
    }
    function Wm(e) {
      e.onclick = F_;
    }
    function P_(e, t, a, o, u) {
      for (var d in o)
        if (o.hasOwnProperty(d)) {
          var v = o[d];
          if (d === Zs)
            v && Object.freeze(v), Fh(t, v);
          else if (d === Wp) {
            var b = v ? v[Vm] : void 0;
            b != null && Rh(t, b);
          } else if (d === Xs)
            if (typeof v == "string") {
              var C = e !== "textarea" || v !== "";
              C && Mc(t, v);
            } else typeof v == "number" && Mc(t, "" + v);
          else d === $m || d === Uu || d === GC || (dt.hasOwnProperty(d) ? v != null && (typeof v != "function" && Hm(d, v), d === "onScroll" && An("scroll", t)) : v != null && bi(t, d, v, u));
        }
    }
    function j_(e, t, a, o) {
      for (var u = 0; u < t.length; u += 2) {
        var d = t[u], v = t[u + 1];
        d === Zs ? Fh(e, v) : d === Wp ? Rh(e, v) : d === Xs ? Mc(e, v) : bi(e, d, v, o);
      }
    }
    function $_(e, t, a, o) {
      var u, d = XC(a), v, b = o;
      if (b === Vi && (b = Dc(e)), b === Vi) {
        if (u = Hi(e, t), !u && e !== e.toLowerCase() && y("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var C = d.createElement("div");
          C.innerHTML = "<script><\/script>";
          var T = C.firstChild;
          v = C.removeChild(T);
        } else if (typeof t.is == "string")
          v = d.createElement(e, {
            is: t.is
          });
        else if (v = d.createElement(e), e === "select") {
          var w = v;
          t.multiple ? w.multiple = !0 : t.size && (w.size = t.size);
        }
      } else
        v = d.createElementNS(b, e);
      return b === Vi && !u && Object.prototype.toString.call(v) === "[object HTMLUnknownElement]" && !Le.call(q0, e) && (q0[e] = !0, y("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), v;
    }
    function V_(e, t) {
      return XC(t).createTextNode(e);
    }
    function B_(e, t, a, o) {
      var u = Hi(t, a);
      Bm(t, a);
      var d;
      switch (t) {
        case "dialog":
          An("cancel", e), An("close", e), d = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          An("load", e), d = a;
          break;
        case "video":
        case "audio":
          for (var v = 0; v < Hp.length; v++)
            An(Hp[v], e);
          d = a;
          break;
        case "source":
          An("error", e), d = a;
          break;
        case "img":
        case "image":
        case "link":
          An("error", e), An("load", e), d = a;
          break;
        case "details":
          An("toggle", e), d = a;
          break;
        case "input":
          ps(e, a), d = ds(e, a), An("invalid", e);
          break;
        case "option":
          kc(e, a), d = a;
          break;
        case "select":
          Eh(e, a), d = $d(e, a), An("invalid", e);
          break;
        case "textarea":
          Th(e, a), d = Bd(e, a), An("invalid", e);
          break;
        default:
          d = a;
      }
      switch (Lc(t, d), P_(t, e, o, d, u), t) {
        case "input":
          al(e), vs(e, a, !1);
          break;
        case "textarea":
          al(e), wh(e);
          break;
        case "option":
          jd(e, a);
          break;
        case "select":
          u0(e, a);
          break;
        default:
          typeof d.onClick == "function" && Wm(e);
          break;
      }
    }
    function H_(e, t, a, o, u) {
      Bm(t, o);
      var d = null, v, b;
      switch (t) {
        case "input":
          v = ds(e, a), b = ds(e, o), d = [];
          break;
        case "select":
          v = $d(e, a), b = $d(e, o), d = [];
          break;
        case "textarea":
          v = Bd(e, a), b = Bd(e, o), d = [];
          break;
        default:
          v = a, b = o, typeof v.onClick != "function" && typeof b.onClick == "function" && Wm(e);
          break;
      }
      Lc(t, b);
      var C, T, w = null;
      for (C in v)
        if (!(b.hasOwnProperty(C) || !v.hasOwnProperty(C) || v[C] == null))
          if (C === Zs) {
            var j = v[C];
            for (T in j)
              j.hasOwnProperty(T) && (w || (w = {}), w[T] = "");
          } else C === Wp || C === Xs || C === $m || C === Uu || C === GC || (dt.hasOwnProperty(C) ? d || (d = []) : (d = d || []).push(C, null));
      for (C in b) {
        var U = b[C], Z = v != null ? v[C] : void 0;
        if (!(!b.hasOwnProperty(C) || U === Z || U == null && Z == null))
          if (C === Zs)
            if (U && Object.freeze(U), Z) {
              for (T in Z)
                Z.hasOwnProperty(T) && (!U || !U.hasOwnProperty(T)) && (w || (w = {}), w[T] = "");
              for (T in U)
                U.hasOwnProperty(T) && Z[T] !== U[T] && (w || (w = {}), w[T] = U[T]);
            } else
              w || (d || (d = []), d.push(C, w)), w = U;
          else if (C === Wp) {
            var ee = U ? U[Vm] : void 0, re = Z ? Z[Vm] : void 0;
            ee != null && re !== ee && (d = d || []).push(C, ee);
          } else C === Xs ? (typeof U == "string" || typeof U == "number") && (d = d || []).push(C, "" + U) : C === $m || C === Uu || (dt.hasOwnProperty(C) ? (U != null && (typeof U != "function" && Hm(C, U), C === "onScroll" && An("scroll", e)), !d && Z !== U && (d = [])) : (d = d || []).push(C, U));
      }
      return w && (ys(w, b[Zs]), (d = d || []).push(Zs, w)), d;
    }
    function I_(e, t, a, o, u) {
      a === "input" && u.type === "radio" && u.name != null && Pd(e, u);
      var d = Hi(a, o), v = Hi(a, u);
      switch (j_(e, t, d, v), a) {
        case "input":
          Xl(e, u);
          break;
        case "textarea":
          xh(e, u);
          break;
        case "select":
          s0(e, u);
          break;
      }
    }
    function Y_(e) {
      {
        var t = e.toLowerCase();
        return zc.hasOwnProperty(t) && zc[t] || null;
      }
    }
    function W_(e, t, a, o, u, d, v) {
      var b, C;
      switch (b = Hi(t, a), Bm(t, a), t) {
        case "dialog":
          An("cancel", e), An("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          An("load", e);
          break;
        case "video":
        case "audio":
          for (var T = 0; T < Hp.length; T++)
            An(Hp[T], e);
          break;
        case "source":
          An("error", e);
          break;
        case "img":
        case "image":
        case "link":
          An("error", e), An("load", e);
          break;
        case "details":
          An("toggle", e);
          break;
        case "input":
          ps(e, a), An("invalid", e);
          break;
        case "option":
          kc(e, a);
          break;
        case "select":
          Eh(e, a), An("invalid", e);
          break;
        case "textarea":
          Th(e, a), An("invalid", e);
          break;
      }
      Lc(t, a);
      {
        C = /* @__PURE__ */ new Set();
        for (var w = e.attributes, j = 0; j < w.length; j++) {
          var U = w[j].name.toLowerCase();
          switch (U) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              C.add(w[j].name);
          }
        }
      }
      var Z = null;
      for (var ee in a)
        if (a.hasOwnProperty(ee)) {
          var re = a[ee];
          if (ee === Xs)
            typeof re == "string" ? e.textContent !== re && (a[Uu] !== !0 && Ym(e.textContent, re, d, v), Z = [Xs, re]) : typeof re == "number" && e.textContent !== "" + re && (a[Uu] !== !0 && Ym(e.textContent, re, d, v), Z = [Xs, "" + re]);
          else if (dt.hasOwnProperty(ee))
            re != null && (typeof re != "function" && Hm(ee, re), ee === "onScroll" && An("scroll", e));
          else if (v && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof b == "boolean") {
            var Ue = void 0, ct = b && Xe ? null : va(ee);
            if (a[Uu] !== !0) {
              if (!(ee === $m || ee === Uu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ee === "value" || ee === "checked" || ee === "selected")) {
                if (ee === Wp) {
                  var nt = e.innerHTML, jt = re ? re[Vm] : void 0;
                  if (jt != null) {
                    var Lt = KC(e, jt);
                    Lt !== nt && Gp(ee, nt, Lt);
                  }
                } else if (ee === Zs) {
                  if (C.delete(ee), qC) {
                    var G = y0(re);
                    Ue = e.getAttribute("style"), G !== Ue && Gp(ee, Ue, G);
                  }
                } else if (b && !Xe)
                  C.delete(ee.toLowerCase()), Ue = Gl(e, ee, re), re !== Ue && Gp(ee, Ue, re);
                else if (!$n(ee, ct, b) && !pn(ee, re, ct, b)) {
                  var ae = !1;
                  if (ct !== null)
                    C.delete(ct.attributeName), Ue = el(e, ee, re, ct);
                  else {
                    var Q = o;
                    if (Q === Vi && (Q = Dc(t)), Q === Vi)
                      C.delete(ee.toLowerCase());
                    else {
                      var Ee = Y_(ee);
                      Ee !== null && Ee !== ee && (ae = !0, C.delete(Ee)), C.delete(ee);
                    }
                    Ue = Gl(e, ee, re);
                  }
                  var Be = Xe;
                  !Be && re !== Ue && !ae && Gp(ee, Ue, re);
                }
              }
            }
          }
        }
      switch (v && // $FlowFixMe - Should be inferred as not undefined.
      C.size > 0 && a[Uu] !== !0 && QC(C), t) {
        case "input":
          al(e), vs(e, a, !0);
          break;
        case "textarea":
          al(e), wh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Wm(e);
          break;
      }
      return Z;
    }
    function G_(e, t, a) {
      var o = e.nodeValue !== t;
      return o;
    }
    function K0(e, t) {
      {
        if (Qa)
          return;
        Qa = !0, y("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function X0(e, t) {
      {
        if (Qa)
          return;
        Qa = !0, y('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Z0(e, t, a) {
      {
        if (Qa)
          return;
        Qa = !0, y("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function J0(e, t) {
      {
        if (t === "" || Qa)
          return;
        Qa = !0, y('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function Q_(e, t, a) {
      switch (t) {
        case "input":
          gh(e, a);
          return;
        case "textarea":
          Hd(e, a);
          return;
        case "select":
          c0(e, a);
          return;
      }
    }
    var Qp = function() {
    }, qp = function() {
    };
    {
      var q_ = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], ZC = [
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
      ], K_ = ZC.concat(["button"]), X_ = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], JC = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      qp = function(e, t) {
        var a = At({}, e || JC), o = {
          tag: t
        };
        return ZC.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), K_.indexOf(t) !== -1 && (a.pTagInButtonScope = null), q_.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = o, t === "form" && (a.formTag = o), t === "a" && (a.aTagInScope = o), t === "button" && (a.buttonTagInScope = o), t === "nobr" && (a.nobrTagInScope = o), t === "p" && (a.pTagInButtonScope = o), t === "li" && (a.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = o), a;
      };
      var Z_ = function(e, t) {
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
            return X_.indexOf(t) === -1;
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
      }, J_ = function(e, t) {
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
      }, eE = {};
      Qp = function(e, t, a) {
        a = a || JC;
        var o = a.current, u = o && o.tag;
        t != null && (e != null && y("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var d = Z_(e, u) ? null : o, v = d ? null : J_(e, a), b = d || v;
        if (b) {
          var C = b.tag, T = !!d + "|" + e + "|" + C;
          if (!eE[T]) {
            eE[T] = !0;
            var w = e, j = "";
            if (e === "#text" ? /\S/.test(t) ? w = "Text nodes" : (w = "Whitespace text nodes", j = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : w = "<" + e + ">", d) {
              var U = "";
              C === "table" && e === "tr" && (U += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), y("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", w, C, j, U);
            } else
              y("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", w, C);
          }
        }
      };
    }
    var Gm = "suppressHydrationWarning", Qm = "$", qm = "/$", Kp = "$?", Xp = "$!", ek = "style", eS = null, tS = null;
    function tk(e) {
      var t, a, o = e.nodeType;
      switch (o) {
        case ui:
        case il: {
          t = o === ui ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Yd(null, "");
          break;
        }
        default: {
          var d = o === Wn ? e.parentNode : e, v = d.namespaceURI || null;
          t = d.tagName, a = Yd(v, t);
          break;
        }
      }
      {
        var b = t.toLowerCase(), C = qp(null, b);
        return {
          namespace: a,
          ancestorInfo: C
        };
      }
    }
    function nk(e, t, a) {
      {
        var o = e, u = Yd(o.namespace, t), d = qp(o.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: d
        };
      }
    }
    function S3(e) {
      return e;
    }
    function rk(e) {
      eS = Ou(), tS = y_();
      var t = null;
      return la(!1), t;
    }
    function ak(e) {
      g_(tS), la(eS), eS = null, tS = null;
    }
    function ik(e, t, a, o, u) {
      var d;
      {
        var v = o;
        if (Qp(e, null, v.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var b = "" + t.children, C = qp(v.ancestorInfo, e);
          Qp(null, b, C);
        }
        d = v.namespace;
      }
      var T = $_(e, t, a, d);
      return ev(u, T), sS(T, t), T;
    }
    function ok(e, t) {
      e.appendChild(t);
    }
    function lk(e, t, a, o, u) {
      switch (B_(e, t, a, o), t) {
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
    function uk(e, t, a, o, u, d) {
      {
        var v = d;
        if (typeof o.children != typeof a.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var b = "" + o.children, C = qp(v.ancestorInfo, t);
          Qp(null, b, C);
        }
      }
      return H_(e, t, a, o);
    }
    function nS(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function sk(e, t, a, o) {
      {
        var u = a;
        Qp(null, e, u.ancestorInfo);
      }
      var d = V_(e, t);
      return ev(o, d), d;
    }
    function ck() {
      var e = window.event;
      return e === void 0 ? wi : Rf(e.type);
    }
    var rS = typeof setTimeout == "function" ? setTimeout : void 0, fk = typeof clearTimeout == "function" ? clearTimeout : void 0, aS = -1, tE = typeof Promise == "function" ? Promise : void 0, dk = typeof queueMicrotask == "function" ? queueMicrotask : typeof tE < "u" ? function(e) {
      return tE.resolve(null).then(e).catch(pk);
    } : rS;
    function pk(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function vk(e, t, a, o) {
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
    function hk(e, t, a, o, u, d) {
      I_(e, t, a, o, u), sS(e, u);
    }
    function nE(e) {
      Mc(e, "");
    }
    function mk(e, t, a) {
      e.nodeValue = a;
    }
    function yk(e, t) {
      e.appendChild(t);
    }
    function gk(e, t) {
      var a;
      e.nodeType === Wn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var o = e._reactRootContainer;
      o == null && a.onclick === null && Wm(a);
    }
    function Sk(e, t, a) {
      e.insertBefore(t, a);
    }
    function bk(e, t, a) {
      e.nodeType === Wn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function Ck(e, t) {
      e.removeChild(t);
    }
    function Ek(e, t) {
      e.nodeType === Wn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function iS(e, t) {
      var a = t, o = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Wn) {
          var d = u.data;
          if (d === qm)
            if (o === 0) {
              e.removeChild(u), Un(t);
              return;
            } else
              o--;
          else (d === Qm || d === Kp || d === Xp) && o++;
        }
        a = u;
      } while (a);
      Un(t);
    }
    function Tk(e, t) {
      e.nodeType === Wn ? iS(e.parentNode, t) : e.nodeType === Xr && iS(e, t), Un(e);
    }
    function xk(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function wk(e) {
      e.nodeValue = "";
    }
    function Rk(e, t) {
      e = e;
      var a = t[ek], o = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Nc("display", o);
    }
    function _k(e, t) {
      e.nodeValue = t;
    }
    function kk(e) {
      e.nodeType === Xr ? e.textContent = "" : e.nodeType === ui && e.documentElement && e.removeChild(e.documentElement);
    }
    function Ok(e, t, a) {
      return e.nodeType !== Xr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function Dk(e, t) {
      return t === "" || e.nodeType !== Bi ? null : e;
    }
    function Ak(e) {
      return e.nodeType !== Wn ? null : e;
    }
    function rE(e) {
      return e.data === Kp;
    }
    function oS(e) {
      return e.data === Xp;
    }
    function Mk(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, o, u;
      return t && (a = t.dgst, o = t.msg, u = t.stck), {
        message: o,
        digest: a,
        stack: u
      };
    }
    function Nk(e, t) {
      e._reactRetry = t;
    }
    function Km(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Xr || t === Bi)
          break;
        if (t === Wn) {
          var a = e.data;
          if (a === Qm || a === Xp || a === Kp)
            break;
          if (a === qm)
            return null;
        }
      }
      return e;
    }
    function Zp(e) {
      return Km(e.nextSibling);
    }
    function Lk(e) {
      return Km(e.firstChild);
    }
    function zk(e) {
      return Km(e.firstChild);
    }
    function Uk(e) {
      return Km(e.nextSibling);
    }
    function Fk(e, t, a, o, u, d, v) {
      ev(d, e), sS(e, a);
      var b;
      {
        var C = u;
        b = C.namespace;
      }
      var T = (d.mode & tt) !== Ze;
      return W_(e, t, a, b, o, T, v);
    }
    function Pk(e, t, a, o) {
      return ev(a, e), a.mode & tt, G_(e, t);
    }
    function jk(e, t) {
      ev(t, e);
    }
    function $k(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === qm) {
            if (a === 0)
              return Zp(t);
            a--;
          } else (o === Qm || o === Xp || o === Kp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function aE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === Qm || o === Xp || o === Kp) {
            if (a === 0)
              return t;
            a--;
          } else o === qm && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Vk(e) {
      Un(e);
    }
    function Bk(e) {
      Un(e);
    }
    function Hk(e) {
      return e !== "head" && e !== "body";
    }
    function Ik(e, t, a, o) {
      var u = !0;
      Ym(t.nodeValue, a, o, u);
    }
    function Yk(e, t, a, o, u, d) {
      if (t[Gm] !== !0) {
        var v = !0;
        Ym(o.nodeValue, u, d, v);
      }
    }
    function Wk(e, t) {
      t.nodeType === Xr ? K0(e, t) : t.nodeType === Wn || X0(e, t);
    }
    function Gk(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Xr ? K0(a, t) : t.nodeType === Wn || X0(a, t));
      }
    }
    function Qk(e, t, a, o, u) {
      (u || t[Gm] !== !0) && (o.nodeType === Xr ? K0(a, o) : o.nodeType === Wn || X0(a, o));
    }
    function qk(e, t, a) {
      Z0(e, t);
    }
    function Kk(e, t) {
      J0(e, t);
    }
    function Xk(e, t, a) {
      {
        var o = e.parentNode;
        o !== null && Z0(o, t);
      }
    }
    function Zk(e, t) {
      {
        var a = e.parentNode;
        a !== null && J0(a, t);
      }
    }
    function Jk(e, t, a, o, u, d) {
      (d || t[Gm] !== !0) && Z0(a, o);
    }
    function eO(e, t, a, o, u) {
      (u || t[Gm] !== !0) && J0(a, o);
    }
    function tO(e) {
      y("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function nO(e) {
      Ip(e);
    }
    var If = Math.random().toString(36).slice(2), Yf = "__reactFiber$" + If, lS = "__reactProps$" + If, Jp = "__reactContainer$" + If, uS = "__reactEvents$" + If, rO = "__reactListeners$" + If, aO = "__reactHandles$" + If;
    function iO(e) {
      delete e[Yf], delete e[lS], delete e[uS], delete e[rO], delete e[aO];
    }
    function ev(e, t) {
      t[Yf] = e;
    }
    function Xm(e, t) {
      t[Jp] = e;
    }
    function iE(e) {
      e[Jp] = null;
    }
    function tv(e) {
      return !!e[Jp];
    }
    function Js(e) {
      var t = e[Yf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Jp] || a[Yf], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var u = aE(e); u !== null; ) {
              var d = u[Yf];
              if (d)
                return d;
              u = aE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Fu(e) {
      var t = e[Yf] || e[Jp];
      return t && (t.tag === B || t.tag === H || t.tag === $ || t.tag === O) ? t : null;
    }
    function Wf(e) {
      if (e.tag === B || e.tag === H)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Zm(e) {
      return e[lS] || null;
    }
    function sS(e, t) {
      e[lS] = t;
    }
    function oO(e) {
      var t = e[uS];
      return t === void 0 && (t = e[uS] = /* @__PURE__ */ new Set()), t;
    }
    var oE = {}, lE = f.ReactDebugCurrentFrame;
    function Jm(e) {
      if (e) {
        var t = e._owner, a = os(e.type, e._source, t ? t.type : null);
        lE.setExtraStackFrame(a);
      } else
        lE.setExtraStackFrame(null);
    }
    function to(e, t, a, o, u) {
      {
        var d = Function.call.bind(Le);
        for (var v in e)
          if (d(e, v)) {
            var b = void 0;
            try {
              if (typeof e[v] != "function") {
                var C = Error((o || "React class") + ": " + a + " type `" + v + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[v] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              b = e[v](t, v, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              b = T;
            }
            b && !(b instanceof Error) && (Jm(u), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, v, typeof b), Jm(null)), b instanceof Error && !(b.message in oE) && (oE[b.message] = !0, Jm(u), y("Failed %s type: %s", a, b.message), Jm(null));
          }
      }
    }
    var cS = [], ey;
    ey = [];
    var Ol = -1;
    function Pu(e) {
      return {
        current: e
      };
    }
    function ua(e, t) {
      if (Ol < 0) {
        y("Unexpected pop.");
        return;
      }
      t !== ey[Ol] && y("Unexpected Fiber popped."), e.current = cS[Ol], cS[Ol] = null, ey[Ol] = null, Ol--;
    }
    function sa(e, t, a) {
      Ol++, cS[Ol] = e.current, ey[Ol] = a, e.current = t;
    }
    var fS;
    fS = {};
    var di = {};
    Object.freeze(di);
    var Dl = Pu(di), zo = Pu(!1), dS = di;
    function Gf(e, t, a) {
      return a && Uo(t) ? dS : Dl.current;
    }
    function uE(e, t, a) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Qf(e, t) {
      {
        var a = e.type, o = a.contextTypes;
        if (!o)
          return di;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var v in o)
          d[v] = t[v];
        {
          var b = wt(e) || "Unknown";
          to(o, d, "context", b);
        }
        return u && uE(e, t, d), d;
      }
    }
    function ty() {
      return zo.current;
    }
    function Uo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function ny(e) {
      ua(zo, e), ua(Dl, e);
    }
    function pS(e) {
      ua(zo, e), ua(Dl, e);
    }
    function sE(e, t, a) {
      {
        if (Dl.current !== di)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        sa(Dl, t, e), sa(zo, a, e);
      }
    }
    function cE(e, t, a) {
      {
        var o = e.stateNode, u = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var d = wt(e) || "Unknown";
            fS[d] || (fS[d] = !0, y("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return a;
        }
        var v = o.getChildContext();
        for (var b in v)
          if (!(b in u))
            throw new Error((wt(e) || "Unknown") + '.getChildContext(): key "' + b + '" is not defined in childContextTypes.');
        {
          var C = wt(e) || "Unknown";
          to(u, v, "child context", C);
        }
        return At({}, a, v);
      }
    }
    function ry(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || di;
        return dS = Dl.current, sa(Dl, a, e), sa(zo, zo.current, e), !0;
      }
    }
    function fE(e, t, a) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = cE(e, t, dS);
          o.__reactInternalMemoizedMergedChildContext = u, ua(zo, e), ua(Dl, e), sa(Dl, u, e), sa(zo, a, e);
        } else
          ua(zo, e), sa(zo, a, e);
      }
    }
    function lO(e) {
      {
        if (!fp(e) || e.tag !== k)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case O:
              return t.stateNode.context;
            case k: {
              var a = t.type;
              if (Uo(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ju = 0, ay = 1, Al = null, vS = !1, hS = !1;
    function dE(e) {
      Al === null ? Al = [e] : Al.push(e);
    }
    function uO(e) {
      vS = !0, dE(e);
    }
    function pE() {
      vS && $u();
    }
    function $u() {
      if (!hS && Al !== null) {
        hS = !0;
        var e = 0, t = Ha();
        try {
          var a = !0, o = Al;
          for (zn(Bn); e < o.length; e++) {
            var u = o[e];
            do
              u = u(a);
            while (u !== null);
          }
          Al = null, vS = !1;
        } catch (d) {
          throw Al !== null && (Al = Al.slice(e + 1)), Ic(Wc, $u), d;
        } finally {
          zn(t), hS = !1;
        }
      }
      return null;
    }
    var qf = [], Kf = 0, iy = null, oy = 0, Oi = [], Di = 0, ec = null, Ml = 1, Nl = "";
    function sO(e) {
      return nc(), (e.flags & up) !== st;
    }
    function cO(e) {
      return nc(), oy;
    }
    function fO() {
      var e = Nl, t = Ml, a = t & ~dO(t);
      return a.toString(32) + e;
    }
    function tc(e, t) {
      nc(), qf[Kf++] = oy, qf[Kf++] = iy, iy = e, oy = t;
    }
    function vE(e, t, a) {
      nc(), Oi[Di++] = Ml, Oi[Di++] = Nl, Oi[Di++] = ec, ec = e;
      var o = Ml, u = Nl, d = ly(o) - 1, v = o & ~(1 << d), b = a + 1, C = ly(t) + d;
      if (C > 30) {
        var T = d - d % 5, w = (1 << T) - 1, j = (v & w).toString(32), U = v >> T, Z = d - T, ee = ly(t) + Z, re = b << Z, Ue = re | U, ct = j + u;
        Ml = 1 << ee | Ue, Nl = ct;
      } else {
        var nt = b << d, jt = nt | v, Lt = u;
        Ml = 1 << C | jt, Nl = Lt;
      }
    }
    function mS(e) {
      nc();
      var t = e.return;
      if (t !== null) {
        var a = 1, o = 0;
        tc(e, a), vE(e, a, o);
      }
    }
    function ly(e) {
      return 32 - du(e);
    }
    function dO(e) {
      return 1 << ly(e) - 1;
    }
    function yS(e) {
      for (; e === iy; )
        iy = qf[--Kf], qf[Kf] = null, oy = qf[--Kf], qf[Kf] = null;
      for (; e === ec; )
        ec = Oi[--Di], Oi[Di] = null, Nl = Oi[--Di], Oi[Di] = null, Ml = Oi[--Di], Oi[Di] = null;
    }
    function pO() {
      return nc(), ec !== null ? {
        id: Ml,
        overflow: Nl
      } : null;
    }
    function vO(e, t) {
      nc(), Oi[Di++] = Ml, Oi[Di++] = Nl, Oi[Di++] = ec, Ml = t.id, Nl = t.overflow, ec = e;
    }
    function nc() {
      $r() || y("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var jr = null, Ai = null, no = !1, rc = !1, Vu = null;
    function hO() {
      no && y("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function hE() {
      rc = !0;
    }
    function mO() {
      return rc;
    }
    function yO(e) {
      var t = e.stateNode.containerInfo;
      return Ai = zk(t), jr = e, no = !0, Vu = null, rc = !1, !0;
    }
    function gO(e, t, a) {
      return Ai = Uk(t), jr = e, no = !0, Vu = null, rc = !1, a !== null && vO(e, a), !0;
    }
    function mE(e, t) {
      switch (e.tag) {
        case O: {
          Wk(e.stateNode.containerInfo, t);
          break;
        }
        case B: {
          var a = (e.mode & tt) !== Ze;
          Qk(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case $: {
          var o = e.memoizedState;
          o.dehydrated !== null && Gk(o.dehydrated, t);
          break;
        }
      }
    }
    function yE(e, t) {
      mE(e, t);
      var a = EM();
      a.stateNode = t, a.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [a], e.flags |= Gt) : o.push(a);
    }
    function gS(e, t) {
      {
        if (rc)
          return;
        switch (e.tag) {
          case O: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case B:
                var o = t.type;
                t.pendingProps, qk(a, o);
                break;
              case H:
                var u = t.pendingProps;
                Kk(a, u);
                break;
            }
            break;
          }
          case B: {
            var d = e.type, v = e.memoizedProps, b = e.stateNode;
            switch (t.tag) {
              case B: {
                var C = t.type, T = t.pendingProps, w = (e.mode & tt) !== Ze;
                Jk(
                  d,
                  v,
                  b,
                  C,
                  T,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
              case H: {
                var j = t.pendingProps, U = (e.mode & tt) !== Ze;
                eO(
                  d,
                  v,
                  b,
                  j,
                  // TODO: Delete this argument when we remove the legacy root API.
                  U
                );
                break;
              }
            }
            break;
          }
          case $: {
            var Z = e.memoizedState, ee = Z.dehydrated;
            if (ee !== null) switch (t.tag) {
              case B:
                var re = t.type;
                t.pendingProps, Xk(ee, re);
                break;
              case H:
                var Ue = t.pendingProps;
                Zk(ee, Ue);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function gE(e, t) {
      t.flags = t.flags & ~Fa | gn, gS(e, t);
    }
    function SE(e, t) {
      switch (e.tag) {
        case B: {
          var a = e.type;
          e.pendingProps;
          var o = Ok(t, a);
          return o !== null ? (e.stateNode = o, jr = e, Ai = Lk(o), !0) : !1;
        }
        case H: {
          var u = e.pendingProps, d = Dk(t, u);
          return d !== null ? (e.stateNode = d, jr = e, Ai = null, !0) : !1;
        }
        case $: {
          var v = Ak(t);
          if (v !== null) {
            var b = {
              dehydrated: v,
              treeContext: pO(),
              retryLane: Lr
            };
            e.memoizedState = b;
            var C = TM(v);
            return C.return = e, e.child = C, jr = e, Ai = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function SS(e) {
      return (e.mode & tt) !== Ze && (e.flags & gt) === st;
    }
    function bS(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function CS(e) {
      if (no) {
        var t = Ai;
        if (!t) {
          SS(e) && (gS(jr, e), bS()), gE(jr, e), no = !1, jr = e;
          return;
        }
        var a = t;
        if (!SE(e, t)) {
          SS(e) && (gS(jr, e), bS()), t = Zp(a);
          var o = jr;
          if (!t || !SE(e, t)) {
            gE(jr, e), no = !1, jr = e;
            return;
          }
          yE(o, a);
        }
      }
    }
    function SO(e, t, a) {
      var o = e.stateNode, u = !rc, d = Fk(o, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = d, d !== null;
    }
    function bO(e) {
      var t = e.stateNode, a = e.memoizedProps, o = Pk(t, a, e);
      if (o) {
        var u = jr;
        if (u !== null)
          switch (u.tag) {
            case O: {
              var d = u.stateNode.containerInfo, v = (u.mode & tt) !== Ze;
              Ik(
                d,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                v
              );
              break;
            }
            case B: {
              var b = u.type, C = u.memoizedProps, T = u.stateNode, w = (u.mode & tt) !== Ze;
              Yk(
                b,
                C,
                T,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                w
              );
              break;
            }
          }
      }
      return o;
    }
    function CO(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      jk(a, e);
    }
    function EO(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return $k(a);
    }
    function bE(e) {
      for (var t = e.return; t !== null && t.tag !== B && t.tag !== O && t.tag !== $; )
        t = t.return;
      jr = t;
    }
    function uy(e) {
      if (e !== jr)
        return !1;
      if (!no)
        return bE(e), no = !0, !1;
      if (e.tag !== O && (e.tag !== B || Hk(e.type) && !nS(e.type, e.memoizedProps))) {
        var t = Ai;
        if (t)
          if (SS(e))
            CE(e), bS();
          else
            for (; t; )
              yE(e, t), t = Zp(t);
      }
      return bE(e), e.tag === $ ? Ai = EO(e) : Ai = jr ? Zp(e.stateNode) : null, !0;
    }
    function TO() {
      return no && Ai !== null;
    }
    function CE(e) {
      for (var t = Ai; t; )
        mE(e, t), t = Zp(t);
    }
    function Xf() {
      jr = null, Ai = null, no = !1, rc = !1;
    }
    function EE() {
      Vu !== null && (hx(Vu), Vu = null);
    }
    function $r() {
      return no;
    }
    function ES(e) {
      Vu === null ? Vu = [e] : Vu.push(e);
    }
    var xO = f.ReactCurrentBatchConfig, wO = null;
    function RO() {
      return xO.transition;
    }
    var ro = {
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
      var _O = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Mt && (t = a), a = a.return;
        return t;
      }, ac = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, nv = [], rv = [], av = [], iv = [], ov = [], lv = [], ic = /* @__PURE__ */ new Set();
      ro.recordUnsafeLifecycleWarnings = function(e, t) {
        ic.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && nv.push(e), e.mode & Mt && typeof t.UNSAFE_componentWillMount == "function" && rv.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && av.push(e), e.mode & Mt && typeof t.UNSAFE_componentWillReceiveProps == "function" && iv.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && ov.push(e), e.mode & Mt && typeof t.UNSAFE_componentWillUpdate == "function" && lv.push(e));
      }, ro.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        nv.length > 0 && (nv.forEach(function(U) {
          e.add(wt(U) || "Component"), ic.add(U.type);
        }), nv = []);
        var t = /* @__PURE__ */ new Set();
        rv.length > 0 && (rv.forEach(function(U) {
          t.add(wt(U) || "Component"), ic.add(U.type);
        }), rv = []);
        var a = /* @__PURE__ */ new Set();
        av.length > 0 && (av.forEach(function(U) {
          a.add(wt(U) || "Component"), ic.add(U.type);
        }), av = []);
        var o = /* @__PURE__ */ new Set();
        iv.length > 0 && (iv.forEach(function(U) {
          o.add(wt(U) || "Component"), ic.add(U.type);
        }), iv = []);
        var u = /* @__PURE__ */ new Set();
        ov.length > 0 && (ov.forEach(function(U) {
          u.add(wt(U) || "Component"), ic.add(U.type);
        }), ov = []);
        var d = /* @__PURE__ */ new Set();
        if (lv.length > 0 && (lv.forEach(function(U) {
          d.add(wt(U) || "Component"), ic.add(U.type);
        }), lv = []), t.size > 0) {
          var v = ac(t);
          y(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, v);
        }
        if (o.size > 0) {
          var b = ac(o);
          y(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, b);
        }
        if (d.size > 0) {
          var C = ac(d);
          y(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, C);
        }
        if (e.size > 0) {
          var T = ac(e);
          S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
        }
        if (a.size > 0) {
          var w = ac(a);
          S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, w);
        }
        if (u.size > 0) {
          var j = ac(u);
          S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, j);
        }
      };
      var sy = /* @__PURE__ */ new Map(), TE = /* @__PURE__ */ new Set();
      ro.recordLegacyContextWarning = function(e, t) {
        var a = _O(e);
        if (a === null) {
          y("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!TE.has(e.type)) {
          var o = sy.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], sy.set(a, o)), o.push(e));
        }
      }, ro.flushLegacyContextWarning = function() {
        sy.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              o.add(wt(d) || "Component"), TE.add(d.type);
            });
            var u = ac(o);
            try {
              nn(a), y(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              Zn();
            }
          }
        });
      }, ro.discardPendingWarnings = function() {
        nv = [], rv = [], av = [], iv = [], ov = [], lv = [], sy = /* @__PURE__ */ new Map();
      };
    }
    var TS, xS, wS, RS, _S, xE = function(e, t) {
    };
    TS = !1, xS = !1, wS = {}, RS = {}, _S = {}, xE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = wt(t) || "Component";
        RS[a] || (RS[a] = !0, y('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function kO(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function uv(e, t, a) {
      var o = a.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & Mt || Pe) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== k) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !kO(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = wt(e) || "Component";
          wS[u] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, o), wS[u] = !0);
        }
        if (a._owner) {
          var d = a._owner, v;
          if (d) {
            var b = d;
            if (b.tag !== k)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            v = b.stateNode;
          }
          if (!v)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var C = v;
          ne(o, "ref");
          var T = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === T)
            return t.ref;
          var w = function(j) {
            var U = C.refs;
            j === null ? delete U[T] : U[T] = j;
          };
          return w._stringRef = T, w;
        } else {
          if (typeof o != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + o + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return o;
    }
    function cy(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function fy(e) {
      {
        var t = wt(e) || "Component";
        if (_S[t])
          return;
        _S[t] = !0, y("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function wE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function RE(e) {
      function t(G, ae) {
        if (e) {
          var Q = G.deletions;
          Q === null ? (G.deletions = [ae], G.flags |= Gt) : Q.push(ae);
        }
      }
      function a(G, ae) {
        if (!e)
          return null;
        for (var Q = ae; Q !== null; )
          t(G, Q), Q = Q.sibling;
        return null;
      }
      function o(G, ae) {
        for (var Q = /* @__PURE__ */ new Map(), Ee = ae; Ee !== null; )
          Ee.key !== null ? Q.set(Ee.key, Ee) : Q.set(Ee.index, Ee), Ee = Ee.sibling;
        return Q;
      }
      function u(G, ae) {
        var Q = vc(G, ae);
        return Q.index = 0, Q.sibling = null, Q;
      }
      function d(G, ae, Q) {
        if (G.index = Q, !e)
          return G.flags |= up, ae;
        var Ee = G.alternate;
        if (Ee !== null) {
          var Be = Ee.index;
          return Be < ae ? (G.flags |= gn, ae) : Be;
        } else
          return G.flags |= gn, ae;
      }
      function v(G) {
        return e && G.alternate === null && (G.flags |= gn), G;
      }
      function b(G, ae, Q, Ee) {
        if (ae === null || ae.tag !== H) {
          var Be = Eb(Q, G.mode, Ee);
          return Be.return = G, Be;
        } else {
          var Fe = u(ae, Q);
          return Fe.return = G, Fe;
        }
      }
      function C(G, ae, Q, Ee) {
        var Be = Q.type;
        if (Be === ai)
          return w(G, ae, Q.props.children, Ee, Q.key);
        if (ae !== null && (ae.elementType === Be || // Keep this check inline so it only runs on the false path:
        Ax(ae, Q) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Be == "object" && Be !== null && Be.$$typeof === vt && wE(Be) === ae.type)) {
          var Fe = u(ae, Q.props);
          return Fe.ref = uv(G, ae, Q), Fe.return = G, Fe._debugSource = Q._source, Fe._debugOwner = Q._owner, Fe;
        }
        var yt = Cb(Q, G.mode, Ee);
        return yt.ref = uv(G, ae, Q), yt.return = G, yt;
      }
      function T(G, ae, Q, Ee) {
        if (ae === null || ae.tag !== z || ae.stateNode.containerInfo !== Q.containerInfo || ae.stateNode.implementation !== Q.implementation) {
          var Be = Tb(Q, G.mode, Ee);
          return Be.return = G, Be;
        } else {
          var Fe = u(ae, Q.children || []);
          return Fe.return = G, Fe;
        }
      }
      function w(G, ae, Q, Ee, Be) {
        if (ae === null || ae.tag !== V) {
          var Fe = Zu(Q, G.mode, Ee, Be);
          return Fe.return = G, Fe;
        } else {
          var yt = u(ae, Q);
          return yt.return = G, yt;
        }
      }
      function j(G, ae, Q) {
        if (typeof ae == "string" && ae !== "" || typeof ae == "number") {
          var Ee = Eb("" + ae, G.mode, Q);
          return Ee.return = G, Ee;
        }
        if (typeof ae == "object" && ae !== null) {
          switch (ae.$$typeof) {
            case ji: {
              var Be = Cb(ae, G.mode, Q);
              return Be.ref = uv(G, null, ae), Be.return = G, Be;
            }
            case ha: {
              var Fe = Tb(ae, G.mode, Q);
              return Fe.return = G, Fe;
            }
            case vt: {
              var yt = ae._payload, xt = ae._init;
              return j(G, xt(yt), Q);
            }
          }
          if (sr(ae) || ma(ae)) {
            var an = Zu(ae, G.mode, Q, null);
            return an.return = G, an;
          }
          cy(G, ae);
        }
        return typeof ae == "function" && fy(G), null;
      }
      function U(G, ae, Q, Ee) {
        var Be = ae !== null ? ae.key : null;
        if (typeof Q == "string" && Q !== "" || typeof Q == "number")
          return Be !== null ? null : b(G, ae, "" + Q, Ee);
        if (typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case ji:
              return Q.key === Be ? C(G, ae, Q, Ee) : null;
            case ha:
              return Q.key === Be ? T(G, ae, Q, Ee) : null;
            case vt: {
              var Fe = Q._payload, yt = Q._init;
              return U(G, ae, yt(Fe), Ee);
            }
          }
          if (sr(Q) || ma(Q))
            return Be !== null ? null : w(G, ae, Q, Ee, null);
          cy(G, Q);
        }
        return typeof Q == "function" && fy(G), null;
      }
      function Z(G, ae, Q, Ee, Be) {
        if (typeof Ee == "string" && Ee !== "" || typeof Ee == "number") {
          var Fe = G.get(Q) || null;
          return b(ae, Fe, "" + Ee, Be);
        }
        if (typeof Ee == "object" && Ee !== null) {
          switch (Ee.$$typeof) {
            case ji: {
              var yt = G.get(Ee.key === null ? Q : Ee.key) || null;
              return C(ae, yt, Ee, Be);
            }
            case ha: {
              var xt = G.get(Ee.key === null ? Q : Ee.key) || null;
              return T(ae, xt, Ee, Be);
            }
            case vt:
              var an = Ee._payload, It = Ee._init;
              return Z(G, ae, Q, It(an), Be);
          }
          if (sr(Ee) || ma(Ee)) {
            var ar = G.get(Q) || null;
            return w(ae, ar, Ee, Be, null);
          }
          cy(ae, Ee);
        }
        return typeof Ee == "function" && fy(ae), null;
      }
      function ee(G, ae, Q) {
        {
          if (typeof G != "object" || G === null)
            return ae;
          switch (G.$$typeof) {
            case ji:
            case ha:
              xE(G, Q);
              var Ee = G.key;
              if (typeof Ee != "string")
                break;
              if (ae === null) {
                ae = /* @__PURE__ */ new Set(), ae.add(Ee);
                break;
              }
              if (!ae.has(Ee)) {
                ae.add(Ee);
                break;
              }
              y("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Ee);
              break;
            case vt:
              var Be = G._payload, Fe = G._init;
              ee(Fe(Be), ae, Q);
              break;
          }
        }
        return ae;
      }
      function re(G, ae, Q, Ee) {
        for (var Be = null, Fe = 0; Fe < Q.length; Fe++) {
          var yt = Q[Fe];
          Be = ee(yt, Be, G);
        }
        for (var xt = null, an = null, It = ae, ar = 0, Yt = 0, qn = null; It !== null && Yt < Q.length; Yt++) {
          It.index > Yt ? (qn = It, It = null) : qn = It.sibling;
          var fa = U(G, It, Q[Yt], Ee);
          if (fa === null) {
            It === null && (It = qn);
            break;
          }
          e && It && fa.alternate === null && t(G, It), ar = d(fa, ar, Yt), an === null ? xt = fa : an.sibling = fa, an = fa, It = qn;
        }
        if (Yt === Q.length) {
          if (a(G, It), $r()) {
            var Gr = Yt;
            tc(G, Gr);
          }
          return xt;
        }
        if (It === null) {
          for (; Yt < Q.length; Yt++) {
            var vi = j(G, Q[Yt], Ee);
            vi !== null && (ar = d(vi, ar, Yt), an === null ? xt = vi : an.sibling = vi, an = vi);
          }
          if ($r()) {
            var _a = Yt;
            tc(G, _a);
          }
          return xt;
        }
        for (var ka = o(G, It); Yt < Q.length; Yt++) {
          var da = Z(ka, G, Yt, Q[Yt], Ee);
          da !== null && (e && da.alternate !== null && ka.delete(da.key === null ? Yt : da.key), ar = d(da, ar, Yt), an === null ? xt = da : an.sibling = da, an = da);
        }
        if (e && ka.forEach(function(md) {
          return t(G, md);
        }), $r()) {
          var $l = Yt;
          tc(G, $l);
        }
        return xt;
      }
      function Ue(G, ae, Q, Ee) {
        var Be = ma(Q);
        if (typeof Be != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          Q[Symbol.toStringTag] === "Generator" && (xS || y("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), xS = !0), Q.entries === Be && (TS || y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), TS = !0);
          var Fe = Be.call(Q);
          if (Fe)
            for (var yt = null, xt = Fe.next(); !xt.done; xt = Fe.next()) {
              var an = xt.value;
              yt = ee(an, yt, G);
            }
        }
        var It = Be.call(Q);
        if (It == null)
          throw new Error("An iterable object provided no iterator.");
        for (var ar = null, Yt = null, qn = ae, fa = 0, Gr = 0, vi = null, _a = It.next(); qn !== null && !_a.done; Gr++, _a = It.next()) {
          qn.index > Gr ? (vi = qn, qn = null) : vi = qn.sibling;
          var ka = U(G, qn, _a.value, Ee);
          if (ka === null) {
            qn === null && (qn = vi);
            break;
          }
          e && qn && ka.alternate === null && t(G, qn), fa = d(ka, fa, Gr), Yt === null ? ar = ka : Yt.sibling = ka, Yt = ka, qn = vi;
        }
        if (_a.done) {
          if (a(G, qn), $r()) {
            var da = Gr;
            tc(G, da);
          }
          return ar;
        }
        if (qn === null) {
          for (; !_a.done; Gr++, _a = It.next()) {
            var $l = j(G, _a.value, Ee);
            $l !== null && (fa = d($l, fa, Gr), Yt === null ? ar = $l : Yt.sibling = $l, Yt = $l);
          }
          if ($r()) {
            var md = Gr;
            tc(G, md);
          }
          return ar;
        }
        for (var $v = o(G, qn); !_a.done; Gr++, _a = It.next()) {
          var Io = Z($v, G, Gr, _a.value, Ee);
          Io !== null && (e && Io.alternate !== null && $v.delete(Io.key === null ? Gr : Io.key), fa = d(Io, fa, Gr), Yt === null ? ar = Io : Yt.sibling = Io, Yt = Io);
        }
        if (e && $v.forEach(function(e2) {
          return t(G, e2);
        }), $r()) {
          var JM = Gr;
          tc(G, JM);
        }
        return ar;
      }
      function ct(G, ae, Q, Ee) {
        if (ae !== null && ae.tag === H) {
          a(G, ae.sibling);
          var Be = u(ae, Q);
          return Be.return = G, Be;
        }
        a(G, ae);
        var Fe = Eb(Q, G.mode, Ee);
        return Fe.return = G, Fe;
      }
      function nt(G, ae, Q, Ee) {
        for (var Be = Q.key, Fe = ae; Fe !== null; ) {
          if (Fe.key === Be) {
            var yt = Q.type;
            if (yt === ai) {
              if (Fe.tag === V) {
                a(G, Fe.sibling);
                var xt = u(Fe, Q.props.children);
                return xt.return = G, xt._debugSource = Q._source, xt._debugOwner = Q._owner, xt;
              }
            } else if (Fe.elementType === yt || // Keep this check inline so it only runs on the false path:
            Ax(Fe, Q) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof yt == "object" && yt !== null && yt.$$typeof === vt && wE(yt) === Fe.type) {
              a(G, Fe.sibling);
              var an = u(Fe, Q.props);
              return an.ref = uv(G, Fe, Q), an.return = G, an._debugSource = Q._source, an._debugOwner = Q._owner, an;
            }
            a(G, Fe);
            break;
          } else
            t(G, Fe);
          Fe = Fe.sibling;
        }
        if (Q.type === ai) {
          var It = Zu(Q.props.children, G.mode, Ee, Q.key);
          return It.return = G, It;
        } else {
          var ar = Cb(Q, G.mode, Ee);
          return ar.ref = uv(G, ae, Q), ar.return = G, ar;
        }
      }
      function jt(G, ae, Q, Ee) {
        for (var Be = Q.key, Fe = ae; Fe !== null; ) {
          if (Fe.key === Be)
            if (Fe.tag === z && Fe.stateNode.containerInfo === Q.containerInfo && Fe.stateNode.implementation === Q.implementation) {
              a(G, Fe.sibling);
              var yt = u(Fe, Q.children || []);
              return yt.return = G, yt;
            } else {
              a(G, Fe);
              break;
            }
          else
            t(G, Fe);
          Fe = Fe.sibling;
        }
        var xt = Tb(Q, G.mode, Ee);
        return xt.return = G, xt;
      }
      function Lt(G, ae, Q, Ee) {
        var Be = typeof Q == "object" && Q !== null && Q.type === ai && Q.key === null;
        if (Be && (Q = Q.props.children), typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case ji:
              return v(nt(G, ae, Q, Ee));
            case ha:
              return v(jt(G, ae, Q, Ee));
            case vt:
              var Fe = Q._payload, yt = Q._init;
              return Lt(G, ae, yt(Fe), Ee);
          }
          if (sr(Q))
            return re(G, ae, Q, Ee);
          if (ma(Q))
            return Ue(G, ae, Q, Ee);
          cy(G, Q);
        }
        return typeof Q == "string" && Q !== "" || typeof Q == "number" ? v(ct(G, ae, "" + Q, Ee)) : (typeof Q == "function" && fy(G), a(G, ae));
      }
      return Lt;
    }
    var Zf = RE(!0), _E = RE(!1);
    function OO(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, o = vc(a, a.pendingProps);
        for (t.child = o, o.return = t; a.sibling !== null; )
          a = a.sibling, o = o.sibling = vc(a, a.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function DO(e, t) {
      for (var a = e.child; a !== null; )
        yM(a, t), a = a.sibling;
    }
    var kS = Pu(null), OS;
    OS = {};
    var dy = null, Jf = null, DS = null, py = !1;
    function vy() {
      dy = null, Jf = null, DS = null, py = !1;
    }
    function kE() {
      py = !0;
    }
    function OE() {
      py = !1;
    }
    function DE(e, t, a) {
      sa(kS, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== OS && y("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = OS;
    }
    function AS(e, t) {
      var a = kS.current;
      ua(kS, t), e._currentValue = a;
    }
    function MS(e, t, a) {
      for (var o = e; o !== null; ) {
        var u = o.alternate;
        if (Cl(o.childLanes, t) ? u !== null && !Cl(u.childLanes, t) && (u.childLanes = Rt(u.childLanes, t)) : (o.childLanes = Rt(o.childLanes, t), u !== null && (u.childLanes = Rt(u.childLanes, t))), o === a)
          break;
        o = o.return;
      }
      o !== a && y("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function AO(e, t, a) {
      MO(e, t, a);
    }
    function MO(e, t, a) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var u = void 0, d = o.dependencies;
        if (d !== null) {
          u = o.child;
          for (var v = d.firstContext; v !== null; ) {
            if (v.context === t) {
              if (o.tag === k) {
                var b = Su(a), C = Ll(hn, b);
                C.tag = my;
                var T = o.updateQueue;
                if (T !== null) {
                  var w = T.shared, j = w.pending;
                  j === null ? C.next = C : (C.next = j.next, j.next = C), w.pending = C;
                }
              }
              o.lanes = Rt(o.lanes, a);
              var U = o.alternate;
              U !== null && (U.lanes = Rt(U.lanes, a)), MS(o.return, a, e), d.lanes = Rt(d.lanes, a);
              break;
            }
            v = v.next;
          }
        } else if (o.tag === oe)
          u = o.type === e.type ? null : o.child;
        else if (o.tag === se) {
          var Z = o.return;
          if (Z === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          Z.lanes = Rt(Z.lanes, a);
          var ee = Z.alternate;
          ee !== null && (ee.lanes = Rt(ee.lanes, a)), MS(Z, a, e), u = o.sibling;
        } else
          u = o.child;
        if (u !== null)
          u.return = o;
        else
          for (u = o; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var re = u.sibling;
            if (re !== null) {
              re.return = u.return, u = re;
              break;
            }
            u = u.return;
          }
        o = u;
      }
    }
    function ed(e, t) {
      dy = e, Jf = null, DS = null;
      var a = e.dependencies;
      if (a !== null) {
        var o = a.firstContext;
        o !== null && (oa(a.lanes, t) && Tv(), a.firstContext = null);
      }
    }
    function hr(e) {
      py && y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (DS !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Jf === null) {
          if (dy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Jf = a, dy.dependencies = {
            lanes: he,
            firstContext: a
          };
        } else
          Jf = Jf.next = a;
      }
      return t;
    }
    var oc = null;
    function NS(e) {
      oc === null ? oc = [e] : oc.push(e);
    }
    function NO() {
      if (oc !== null) {
        for (var e = 0; e < oc.length; e++) {
          var t = oc[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var o = a.next, u = t.pending;
            if (u !== null) {
              var d = u.next;
              u.next = o, a.next = d;
            }
            t.pending = a;
          }
        }
        oc = null;
      }
    }
    function AE(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, NS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, hy(e, o);
    }
    function LO(e, t, a, o) {
      var u = t.interleaved;
      u === null ? (a.next = a, NS(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function zO(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, NS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, hy(e, o);
    }
    function qa(e, t) {
      return hy(e, t);
    }
    var UO = hy;
    function hy(e, t) {
      e.lanes = Rt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Rt(a.lanes, t)), a === null && (e.flags & (gn | Fa)) !== st && _x(e);
      for (var o = e, u = e.return; u !== null; )
        u.childLanes = Rt(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Rt(a.childLanes, t) : (u.flags & (gn | Fa)) !== st && _x(e), o = u, u = u.return;
      if (o.tag === O) {
        var d = o.stateNode;
        return d;
      } else
        return null;
    }
    var ME = 0, NE = 1, my = 2, LS = 3, yy = !1, zS, gy;
    zS = !1, gy = null;
    function US(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: he
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function LE(e, t) {
      var a = t.updateQueue, o = e.updateQueue;
      if (a === o) {
        var u = {
          baseState: o.baseState,
          firstBaseUpdate: o.firstBaseUpdate,
          lastBaseUpdate: o.lastBaseUpdate,
          shared: o.shared,
          effects: o.effects
        };
        t.updateQueue = u;
      }
    }
    function Ll(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: ME,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Bu(e, t, a) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var u = o.shared;
      if (gy === u && !zS && (y("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), zS = !0), LA()) {
        var d = u.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), u.pending = t, UO(e, a);
      } else
        return zO(e, u, t, a);
    }
    function Sy(e, t, a) {
      var o = t.updateQueue;
      if (o !== null) {
        var u = o.shared;
        if (Tp(a)) {
          var d = u.lanes;
          d = yf(d, e.pendingLanes);
          var v = Rt(d, a);
          u.lanes = v, xp(e, v);
        }
      }
    }
    function FS(e, t) {
      var a = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var u = o.updateQueue;
        if (a === u) {
          var d = null, v = null, b = a.firstBaseUpdate;
          if (b !== null) {
            var C = b;
            do {
              var T = {
                eventTime: C.eventTime,
                lane: C.lane,
                tag: C.tag,
                payload: C.payload,
                callback: C.callback,
                next: null
              };
              v === null ? d = v = T : (v.next = T, v = T), C = C.next;
            } while (C !== null);
            v === null ? d = v = t : (v.next = t, v = t);
          } else
            d = v = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: d,
            lastBaseUpdate: v,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var w = a.lastBaseUpdate;
      w === null ? a.firstBaseUpdate = t : w.next = t, a.lastBaseUpdate = t;
    }
    function FO(e, t, a, o, u, d) {
      switch (a.tag) {
        case NE: {
          var v = a.payload;
          if (typeof v == "function") {
            kE();
            var b = v.call(d, o, u);
            {
              if (e.mode & Mt) {
                Gn(!0);
                try {
                  v.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              OE();
            }
            return b;
          }
          return v;
        }
        case LS:
          e.flags = e.flags & ~fr | gt;
        case ME: {
          var C = a.payload, T;
          if (typeof C == "function") {
            kE(), T = C.call(d, o, u);
            {
              if (e.mode & Mt) {
                Gn(!0);
                try {
                  C.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              OE();
            }
          } else
            T = C;
          return T == null ? o : At({}, o, T);
        }
        case my:
          return yy = !0, o;
      }
      return o;
    }
    function by(e, t, a, o) {
      var u = e.updateQueue;
      yy = !1, gy = u.shared;
      var d = u.firstBaseUpdate, v = u.lastBaseUpdate, b = u.shared.pending;
      if (b !== null) {
        u.shared.pending = null;
        var C = b, T = C.next;
        C.next = null, v === null ? d = T : v.next = T, v = C;
        var w = e.alternate;
        if (w !== null) {
          var j = w.updateQueue, U = j.lastBaseUpdate;
          U !== v && (U === null ? j.firstBaseUpdate = T : U.next = T, j.lastBaseUpdate = C);
        }
      }
      if (d !== null) {
        var Z = u.baseState, ee = he, re = null, Ue = null, ct = null, nt = d;
        do {
          var jt = nt.lane, Lt = nt.eventTime;
          if (Cl(o, jt)) {
            if (ct !== null) {
              var ae = {
                eventTime: Lt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Qn,
                tag: nt.tag,
                payload: nt.payload,
                callback: nt.callback,
                next: null
              };
              ct = ct.next = ae;
            }
            Z = FO(e, u, nt, Z, t, a);
            var Q = nt.callback;
            if (Q !== null && // If the update was already committed, we should not queue its
            // callback again.
            nt.lane !== Qn) {
              e.flags |= Ti;
              var Ee = u.effects;
              Ee === null ? u.effects = [nt] : Ee.push(nt);
            }
          } else {
            var G = {
              eventTime: Lt,
              lane: jt,
              tag: nt.tag,
              payload: nt.payload,
              callback: nt.callback,
              next: null
            };
            ct === null ? (Ue = ct = G, re = Z) : ct = ct.next = G, ee = Rt(ee, jt);
          }
          if (nt = nt.next, nt === null) {
            if (b = u.shared.pending, b === null)
              break;
            var Be = b, Fe = Be.next;
            Be.next = null, nt = Fe, u.lastBaseUpdate = Be, u.shared.pending = null;
          }
        } while (!0);
        ct === null && (re = Z), u.baseState = re, u.firstBaseUpdate = Ue, u.lastBaseUpdate = ct;
        var yt = u.shared.interleaved;
        if (yt !== null) {
          var xt = yt;
          do
            ee = Rt(ee, xt.lane), xt = xt.next;
          while (xt !== yt);
        } else d === null && (u.shared.lanes = he);
        zv(ee), e.lanes = ee, e.memoizedState = Z;
      }
      gy = null;
    }
    function PO(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function zE() {
      yy = !1;
    }
    function Cy() {
      return yy;
    }
    function UE(e, t, a) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u], v = d.callback;
          v !== null && (d.callback = null, PO(v, a));
        }
    }
    var sv = {}, Hu = Pu(sv), cv = Pu(sv), Ey = Pu(sv);
    function Ty(e) {
      if (e === sv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function FE() {
      var e = Ty(Ey.current);
      return e;
    }
    function PS(e, t) {
      sa(Ey, t, e), sa(cv, e, e), sa(Hu, sv, e);
      var a = tk(t);
      ua(Hu, e), sa(Hu, a, e);
    }
    function td(e) {
      ua(Hu, e), ua(cv, e), ua(Ey, e);
    }
    function jS() {
      var e = Ty(Hu.current);
      return e;
    }
    function PE(e) {
      Ty(Ey.current);
      var t = Ty(Hu.current), a = nk(t, e.type);
      t !== a && (sa(cv, e, e), sa(Hu, a, e));
    }
    function $S(e) {
      cv.current === e && (ua(Hu, e), ua(cv, e));
    }
    var jO = 0, jE = 1, $E = 1, fv = 2, ao = Pu(jO);
    function VS(e, t) {
      return (e & t) !== 0;
    }
    function nd(e) {
      return e & jE;
    }
    function BS(e, t) {
      return e & jE | t;
    }
    function $O(e, t) {
      return e | t;
    }
    function Iu(e, t) {
      sa(ao, t, e);
    }
    function rd(e) {
      ua(ao, e);
    }
    function VO(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function xy(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === $) {
          var a = t.memoizedState;
          if (a !== null) {
            var o = a.dehydrated;
            if (o === null || rE(o) || oS(o))
              return t;
          }
        } else if (t.tag === ke && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & gt) !== st;
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
    var Ka = (
      /*   */
      0
    ), Cr = (
      /* */
      1
    ), Fo = (
      /*  */
      2
    ), Er = (
      /*    */
      4
    ), Vr = (
      /*   */
      8
    ), HS = [];
    function IS() {
      for (var e = 0; e < HS.length; e++) {
        var t = HS[e];
        t._workInProgressVersionPrimary = null;
      }
      HS.length = 0;
    }
    function BO(e, t) {
      var a = t._getVersion, o = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var $e = f.ReactCurrentDispatcher, dv = f.ReactCurrentBatchConfig, YS, ad;
    YS = /* @__PURE__ */ new Set();
    var lc = he, rn = null, Tr = null, xr = null, wy = !1, pv = !1, vv = 0, HO = 0, IO = 25, ue = null, Mi = null, Yu = -1, WS = !1;
    function Kt() {
      {
        var e = ue;
        Mi === null ? Mi = [e] : Mi.push(e);
      }
    }
    function Me() {
      {
        var e = ue;
        Mi !== null && (Yu++, Mi[Yu] !== e && YO(e));
      }
    }
    function id(e) {
      e != null && !sr(e) && y("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ue, typeof e);
    }
    function YO(e) {
      {
        var t = wt(rn);
        if (!YS.has(t) && (YS.add(t), Mi !== null)) {
          for (var a = "", o = 30, u = 0; u <= Yu; u++) {
            for (var d = Mi[u], v = u === Yu ? e : d, b = u + 1 + ". " + d; b.length < o; )
              b += " ";
            b += v + `
`, a += b;
          }
          y(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ca() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function GS(e, t) {
      if (WS)
        return !1;
      if (t === null)
        return y("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", ue), !1;
      e.length !== t.length && y(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, ue, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!We(e[a], t[a]))
          return !1;
      return !0;
    }
    function od(e, t, a, o, u, d) {
      lc = d, rn = t, Mi = e !== null ? e._debugHookTypes : null, Yu = -1, WS = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = he, e !== null && e.memoizedState !== null ? $e.current = uT : Mi !== null ? $e.current = lT : $e.current = oT;
      var v = a(o, u);
      if (pv) {
        var b = 0;
        do {
          if (pv = !1, vv = 0, b >= IO)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          b += 1, WS = !1, Tr = null, xr = null, t.updateQueue = null, Yu = -1, $e.current = sT, v = a(o, u);
        } while (pv);
      }
      $e.current = Py, t._debugHookTypes = Mi;
      var C = Tr !== null && Tr.next !== null;
      if (lc = he, rn = null, Tr = null, xr = null, ue = null, Mi = null, Yu = -1, e !== null && (e.flags & gr) !== (t.flags & gr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & tt) !== Ze && y("Internal React error: Expected static flag was missing. Please notify the React team."), wy = !1, C)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return v;
    }
    function ld() {
      var e = vv !== 0;
      return vv = 0, e;
    }
    function VE(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Ea) !== Ze ? t.flags &= ~(dl | ea | wn | _t) : t.flags &= ~(wn | _t), e.lanes = Ps(e.lanes, a);
    }
    function BE() {
      if ($e.current = Py, wy) {
        for (var e = rn.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        wy = !1;
      }
      lc = he, rn = null, Tr = null, xr = null, Mi = null, Yu = -1, ue = null, tT = !1, pv = !1, vv = 0;
    }
    function Po() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return xr === null ? rn.memoizedState = xr = e : xr = xr.next = e, xr;
    }
    function Ni() {
      var e;
      if (Tr === null) {
        var t = rn.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = Tr.next;
      var a;
      if (xr === null ? a = rn.memoizedState : a = xr.next, a !== null)
        xr = a, a = xr.next, Tr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        Tr = e;
        var o = {
          memoizedState: Tr.memoizedState,
          baseState: Tr.baseState,
          baseQueue: Tr.baseQueue,
          queue: Tr.queue,
          next: null
        };
        xr === null ? rn.memoizedState = xr = o : xr = xr.next = o;
      }
      return xr;
    }
    function HE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function QS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function qS(e, t, a) {
      var o = Po(), u;
      a !== void 0 ? u = a(t) : u = t, o.memoizedState = o.baseState = u;
      var d = {
        pending: null,
        interleaved: null,
        lanes: he,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      o.queue = d;
      var v = d.dispatch = qO.bind(null, rn, d);
      return [o.memoizedState, v];
    }
    function KS(e, t, a) {
      var o = Ni(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = Tr, v = d.baseQueue, b = u.pending;
      if (b !== null) {
        if (v !== null) {
          var C = v.next, T = b.next;
          v.next = T, b.next = C;
        }
        d.baseQueue !== v && y("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), d.baseQueue = v = b, u.pending = null;
      }
      if (v !== null) {
        var w = v.next, j = d.baseState, U = null, Z = null, ee = null, re = w;
        do {
          var Ue = re.lane;
          if (Cl(lc, Ue)) {
            if (ee !== null) {
              var nt = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Qn,
                action: re.action,
                hasEagerState: re.hasEagerState,
                eagerState: re.eagerState,
                next: null
              };
              ee = ee.next = nt;
            }
            if (re.hasEagerState)
              j = re.eagerState;
            else {
              var jt = re.action;
              j = e(j, jt);
            }
          } else {
            var ct = {
              lane: Ue,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            };
            ee === null ? (Z = ee = ct, U = j) : ee = ee.next = ct, rn.lanes = Rt(rn.lanes, Ue), zv(Ue);
          }
          re = re.next;
        } while (re !== null && re !== w);
        ee === null ? U = j : ee.next = Z, We(j, o.memoizedState) || Tv(), o.memoizedState = j, o.baseState = U, o.baseQueue = ee, u.lastRenderedState = j;
      }
      var Lt = u.interleaved;
      if (Lt !== null) {
        var G = Lt;
        do {
          var ae = G.lane;
          rn.lanes = Rt(rn.lanes, ae), zv(ae), G = G.next;
        } while (G !== Lt);
      } else v === null && (u.lanes = he);
      var Q = u.dispatch;
      return [o.memoizedState, Q];
    }
    function XS(e, t, a) {
      var o = Ni(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = u.dispatch, v = u.pending, b = o.memoizedState;
      if (v !== null) {
        u.pending = null;
        var C = v.next, T = C;
        do {
          var w = T.action;
          b = e(b, w), T = T.next;
        } while (T !== C);
        We(b, o.memoizedState) || Tv(), o.memoizedState = b, o.baseQueue === null && (o.baseState = b), u.lastRenderedState = b;
      }
      return [b, d];
    }
    function b3(e, t, a) {
    }
    function C3(e, t, a) {
    }
    function ZS(e, t, a) {
      var o = rn, u = Po(), d, v = $r();
      if (v) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = a(), ad || d !== a() && (y("The result of getServerSnapshot should be cached to avoid an infinite loop"), ad = !0);
      } else {
        if (d = t(), !ad) {
          var b = t();
          We(d, b) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), ad = !0);
        }
        var C = rg();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Fs(C, lc) || IE(o, t, d);
      }
      u.memoizedState = d;
      var T = {
        value: d,
        getSnapshot: t
      };
      return u.queue = T, Dy(WE.bind(null, o, T, e), [e]), o.flags |= wn, hv(Cr | Vr, YE.bind(null, o, T, d, t), void 0, null), d;
    }
    function Ry(e, t, a) {
      var o = rn, u = Ni(), d = t();
      if (!ad) {
        var v = t();
        We(d, v) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), ad = !0);
      }
      var b = u.memoizedState, C = !We(b, d);
      C && (u.memoizedState = d, Tv());
      var T = u.queue;
      if (yv(WE.bind(null, o, T, e), [e]), T.getSnapshot !== t || C || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      xr !== null && xr.memoizedState.tag & Cr) {
        o.flags |= wn, hv(Cr | Vr, YE.bind(null, o, T, d, t), void 0, null);
        var w = rg();
        if (w === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Fs(w, lc) || IE(o, t, d);
      }
      return d;
    }
    function IE(e, t, a) {
      e.flags |= _s;
      var o = {
        getSnapshot: t,
        value: a
      }, u = rn.updateQueue;
      if (u === null)
        u = HE(), rn.updateQueue = u, u.stores = [o];
      else {
        var d = u.stores;
        d === null ? u.stores = [o] : d.push(o);
      }
    }
    function YE(e, t, a, o) {
      t.value = a, t.getSnapshot = o, GE(t) && QE(e);
    }
    function WE(e, t, a) {
      var o = function() {
        GE(t) && QE(e);
      };
      return a(o);
    }
    function GE(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var o = t();
        return !We(a, o);
      } catch {
        return !0;
      }
    }
    function QE(e) {
      var t = qa(e, ot);
      t !== null && kr(t, e, ot, hn);
    }
    function _y(e) {
      var t = Po();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: he,
        dispatch: null,
        lastRenderedReducer: QS,
        lastRenderedState: e
      };
      t.queue = a;
      var o = a.dispatch = KO.bind(null, rn, a);
      return [t.memoizedState, o];
    }
    function JS(e) {
      return KS(QS);
    }
    function e1(e) {
      return XS(QS);
    }
    function hv(e, t, a, o) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: o,
        // Circular
        next: null
      }, d = rn.updateQueue;
      if (d === null)
        d = HE(), rn.updateQueue = d, d.lastEffect = u.next = u;
      else {
        var v = d.lastEffect;
        if (v === null)
          d.lastEffect = u.next = u;
        else {
          var b = v.next;
          v.next = u, u.next = b, d.lastEffect = u;
        }
      }
      return u;
    }
    function t1(e) {
      var t = Po();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function ky(e) {
      var t = Ni();
      return t.memoizedState;
    }
    function mv(e, t, a, o) {
      var u = Po(), d = o === void 0 ? null : o;
      rn.flags |= e, u.memoizedState = hv(Cr | t, a, void 0, d);
    }
    function Oy(e, t, a, o) {
      var u = Ni(), d = o === void 0 ? null : o, v = void 0;
      if (Tr !== null) {
        var b = Tr.memoizedState;
        if (v = b.destroy, d !== null) {
          var C = b.deps;
          if (GS(d, C)) {
            u.memoizedState = hv(t, a, v, d);
            return;
          }
        }
      }
      rn.flags |= e, u.memoizedState = hv(Cr | t, a, v, d);
    }
    function Dy(e, t) {
      return (rn.mode & Ea) !== Ze ? mv(dl | wn | wo, Vr, e, t) : mv(wn | wo, Vr, e, t);
    }
    function yv(e, t) {
      return Oy(wn, Vr, e, t);
    }
    function n1(e, t) {
      return mv(_t, Fo, e, t);
    }
    function Ay(e, t) {
      return Oy(_t, Fo, e, t);
    }
    function r1(e, t) {
      var a = _t;
      return a |= Jr, (rn.mode & Ea) !== Ze && (a |= ea), mv(a, Er, e, t);
    }
    function My(e, t) {
      return Oy(_t, Er, e, t);
    }
    function qE(e, t) {
      if (typeof t == "function") {
        var a = t, o = e();
        return a(o), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || y("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var d = e();
        return u.current = d, function() {
          u.current = null;
        };
      }
    }
    function a1(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null, u = _t;
      return u |= Jr, (rn.mode & Ea) !== Ze && (u |= ea), mv(u, Er, qE.bind(null, t, e), o);
    }
    function Ny(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null;
      return Oy(_t, Er, qE.bind(null, t, e), o);
    }
    function WO(e, t) {
    }
    var Ly = WO;
    function i1(e, t) {
      var a = Po(), o = t === void 0 ? null : t;
      return a.memoizedState = [e, o], e;
    }
    function zy(e, t) {
      var a = Ni(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (GS(o, d))
          return u[0];
      }
      return a.memoizedState = [e, o], e;
    }
    function o1(e, t) {
      var a = Po(), o = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, o], u;
    }
    function Uy(e, t) {
      var a = Ni(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (GS(o, d))
          return u[0];
      }
      var v = e();
      return a.memoizedState = [v, o], v;
    }
    function l1(e) {
      var t = Po();
      return t.memoizedState = e, e;
    }
    function KE(e) {
      var t = Ni(), a = Tr, o = a.memoizedState;
      return ZE(t, o, e);
    }
    function XE(e) {
      var t = Ni();
      if (Tr === null)
        return t.memoizedState = e, e;
      var a = Tr.memoizedState;
      return ZE(t, a, e);
    }
    function ZE(e, t, a) {
      var o = !dm(lc);
      if (o) {
        if (!We(a, t)) {
          var u = hm();
          rn.lanes = Rt(rn.lanes, u), zv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Tv()), e.memoizedState = a, a;
    }
    function GO(e, t, a) {
      var o = Ha();
      zn(_0(o, Xi)), e(!0);
      var u = dv.transition;
      dv.transition = {};
      var d = dv.transition;
      dv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (zn(o), dv.transition = u, u === null && d._updatedFibers) {
          var v = d._updatedFibers.size;
          v > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function u1() {
      var e = _y(!1), t = e[0], a = e[1], o = GO.bind(null, a), u = Po();
      return u.memoizedState = o, [t, o];
    }
    function JE() {
      var e = JS(), t = e[0], a = Ni(), o = a.memoizedState;
      return [t, o];
    }
    function eT() {
      var e = e1(), t = e[0], a = Ni(), o = a.memoizedState;
      return [t, o];
    }
    var tT = !1;
    function QO() {
      return tT;
    }
    function s1() {
      var e = Po(), t = rg(), a = t.identifierPrefix, o;
      if ($r()) {
        var u = fO();
        o = ":" + a + "R" + u;
        var d = vv++;
        d > 0 && (o += "H" + d.toString(32)), o += ":";
      } else {
        var v = HO++;
        o = ":" + a + "r" + v.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Fy() {
      var e = Ni(), t = e.memoizedState;
      return t;
    }
    function qO(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Ku(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (nT(e))
        rT(t, u);
      else {
        var d = AE(e, t, u, o);
        if (d !== null) {
          var v = Ra();
          kr(d, e, o, v), aT(d, t, o);
        }
      }
      iT(e, o);
    }
    function KO(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = Ku(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (nT(e))
        rT(t, u);
      else {
        var d = e.alternate;
        if (e.lanes === he && (d === null || d.lanes === he)) {
          var v = t.lastRenderedReducer;
          if (v !== null) {
            var b;
            b = $e.current, $e.current = io;
            try {
              var C = t.lastRenderedState, T = v(C, a);
              if (u.hasEagerState = !0, u.eagerState = T, We(T, C)) {
                LO(e, t, u, o);
                return;
              }
            } catch {
            } finally {
              $e.current = b;
            }
          }
        }
        var w = AE(e, t, u, o);
        if (w !== null) {
          var j = Ra();
          kr(w, e, o, j), aT(w, t, o);
        }
      }
      iT(e, o);
    }
    function nT(e) {
      var t = e.alternate;
      return e === rn || t !== null && t === rn;
    }
    function rT(e, t) {
      pv = wy = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function aT(e, t, a) {
      if (Tp(a)) {
        var o = t.lanes;
        o = yf(o, e.pendingLanes);
        var u = Rt(o, a);
        t.lanes = u, xp(e, u);
      }
    }
    function iT(e, t, a) {
      As(e, t);
    }
    var Py = {
      readContext: hr,
      useCallback: ca,
      useContext: ca,
      useEffect: ca,
      useImperativeHandle: ca,
      useInsertionEffect: ca,
      useLayoutEffect: ca,
      useMemo: ca,
      useReducer: ca,
      useRef: ca,
      useState: ca,
      useDebugValue: ca,
      useDeferredValue: ca,
      useTransition: ca,
      useMutableSource: ca,
      useSyncExternalStore: ca,
      useId: ca,
      unstable_isNewReconciler: ge
    }, oT = null, lT = null, uT = null, sT = null, jo = null, io = null, jy = null;
    {
      var c1 = function() {
        y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Tt = function() {
        y("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      oT = {
        readContext: function(e) {
          return hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Kt(), id(t), i1(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Kt(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Kt(), id(t), Dy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Kt(), id(a), a1(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Kt(), id(t), n1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Kt(), id(t), r1(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Kt(), id(t);
          var a = $e.current;
          $e.current = jo;
          try {
            return o1(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Kt();
          var o = $e.current;
          $e.current = jo;
          try {
            return qS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Kt(), t1(e);
        },
        useState: function(e) {
          ue = "useState", Kt();
          var t = $e.current;
          $e.current = jo;
          try {
            return _y(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Kt(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Kt(), l1(e);
        },
        useTransition: function() {
          return ue = "useTransition", Kt(), u1();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Kt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Kt(), ZS(e, t, a);
        },
        useId: function() {
          return ue = "useId", Kt(), s1();
        },
        unstable_isNewReconciler: ge
      }, lT = {
        readContext: function(e) {
          return hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Me(), i1(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Me(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Me(), Dy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Me(), a1(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Me(), n1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Me(), r1(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Me();
          var a = $e.current;
          $e.current = jo;
          try {
            return o1(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Me();
          var o = $e.current;
          $e.current = jo;
          try {
            return qS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Me(), t1(e);
        },
        useState: function(e) {
          ue = "useState", Me();
          var t = $e.current;
          $e.current = jo;
          try {
            return _y(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Me(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Me(), l1(e);
        },
        useTransition: function() {
          return ue = "useTransition", Me(), u1();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Me(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Me(), ZS(e, t, a);
        },
        useId: function() {
          return ue = "useId", Me(), s1();
        },
        unstable_isNewReconciler: ge
      }, uT = {
        readContext: function(e) {
          return hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Me(), zy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Me(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Me(), yv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Me(), Ny(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Me(), Ay(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Me(), My(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Me();
          var a = $e.current;
          $e.current = io;
          try {
            return Uy(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Me();
          var o = $e.current;
          $e.current = io;
          try {
            return KS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Me(), ky();
        },
        useState: function(e) {
          ue = "useState", Me();
          var t = $e.current;
          $e.current = io;
          try {
            return JS(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Me(), Ly();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Me(), KE(e);
        },
        useTransition: function() {
          return ue = "useTransition", Me(), JE();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Me(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Me(), Ry(e, t);
        },
        useId: function() {
          return ue = "useId", Me(), Fy();
        },
        unstable_isNewReconciler: ge
      }, sT = {
        readContext: function(e) {
          return hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Me(), zy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Me(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Me(), yv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Me(), Ny(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Me(), Ay(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Me(), My(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Me();
          var a = $e.current;
          $e.current = jy;
          try {
            return Uy(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Me();
          var o = $e.current;
          $e.current = jy;
          try {
            return XS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Me(), ky();
        },
        useState: function(e) {
          ue = "useState", Me();
          var t = $e.current;
          $e.current = jy;
          try {
            return e1(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Me(), Ly();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Me(), XE(e);
        },
        useTransition: function() {
          return ue = "useTransition", Me(), eT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Me(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Me(), Ry(e, t);
        },
        useId: function() {
          return ue = "useId", Me(), Fy();
        },
        unstable_isNewReconciler: ge
      }, jo = {
        readContext: function(e) {
          return c1(), hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Tt(), Kt(), i1(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Tt(), Kt(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Tt(), Kt(), Dy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Tt(), Kt(), a1(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Tt(), Kt(), n1(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Tt(), Kt(), r1(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Tt(), Kt();
          var a = $e.current;
          $e.current = jo;
          try {
            return o1(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Tt(), Kt();
          var o = $e.current;
          $e.current = jo;
          try {
            return qS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Tt(), Kt(), t1(e);
        },
        useState: function(e) {
          ue = "useState", Tt(), Kt();
          var t = $e.current;
          $e.current = jo;
          try {
            return _y(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Tt(), Kt(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Tt(), Kt(), l1(e);
        },
        useTransition: function() {
          return ue = "useTransition", Tt(), Kt(), u1();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Tt(), Kt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Tt(), Kt(), ZS(e, t, a);
        },
        useId: function() {
          return ue = "useId", Tt(), Kt(), s1();
        },
        unstable_isNewReconciler: ge
      }, io = {
        readContext: function(e) {
          return c1(), hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Tt(), Me(), zy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Tt(), Me(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Tt(), Me(), yv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Tt(), Me(), Ny(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Tt(), Me(), Ay(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Tt(), Me(), My(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Tt(), Me();
          var a = $e.current;
          $e.current = io;
          try {
            return Uy(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Tt(), Me();
          var o = $e.current;
          $e.current = io;
          try {
            return KS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Tt(), Me(), ky();
        },
        useState: function(e) {
          ue = "useState", Tt(), Me();
          var t = $e.current;
          $e.current = io;
          try {
            return JS(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Tt(), Me(), Ly();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Tt(), Me(), KE(e);
        },
        useTransition: function() {
          return ue = "useTransition", Tt(), Me(), JE();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Tt(), Me(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Tt(), Me(), Ry(e, t);
        },
        useId: function() {
          return ue = "useId", Tt(), Me(), Fy();
        },
        unstable_isNewReconciler: ge
      }, jy = {
        readContext: function(e) {
          return c1(), hr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Tt(), Me(), zy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Tt(), Me(), hr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Tt(), Me(), yv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Tt(), Me(), Ny(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Tt(), Me(), Ay(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Tt(), Me(), My(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Tt(), Me();
          var a = $e.current;
          $e.current = io;
          try {
            return Uy(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Tt(), Me();
          var o = $e.current;
          $e.current = io;
          try {
            return XS(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Tt(), Me(), ky();
        },
        useState: function(e) {
          ue = "useState", Tt(), Me();
          var t = $e.current;
          $e.current = io;
          try {
            return e1(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Tt(), Me(), Ly();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Tt(), Me(), XE(e);
        },
        useTransition: function() {
          return ue = "useTransition", Tt(), Me(), eT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Tt(), Me(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Tt(), Me(), Ry(e, t);
        },
        useId: function() {
          return ue = "useId", Tt(), Me(), Fy();
        },
        unstable_isNewReconciler: ge
      };
    }
    var Wu = s.unstable_now, cT = 0, $y = -1, gv = -1, Vy = -1, f1 = !1, By = !1;
    function fT() {
      return f1;
    }
    function XO() {
      By = !0;
    }
    function ZO() {
      f1 = !1, By = !1;
    }
    function JO() {
      f1 = By, By = !1;
    }
    function dT() {
      return cT;
    }
    function pT() {
      cT = Wu();
    }
    function d1(e) {
      gv = Wu(), e.actualStartTime < 0 && (e.actualStartTime = Wu());
    }
    function vT(e) {
      gv = -1;
    }
    function Hy(e, t) {
      if (gv >= 0) {
        var a = Wu() - gv;
        e.actualDuration += a, t && (e.selfBaseDuration = a), gv = -1;
      }
    }
    function $o(e) {
      if ($y >= 0) {
        var t = Wu() - $y;
        $y = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
            case le:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function p1(e) {
      if (Vy >= 0) {
        var t = Wu() - Vy;
        Vy = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
            case le:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Vo() {
      $y = Wu();
    }
    function v1() {
      Vy = Wu();
    }
    function h1(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function oo(e, t) {
      if (e && e.defaultProps) {
        var a = At({}, t), o = e.defaultProps;
        for (var u in o)
          a[u] === void 0 && (a[u] = o[u]);
        return a;
      }
      return t;
    }
    var m1 = {}, y1, g1, S1, b1, C1, hT, Iy, E1, T1, x1, Sv;
    {
      y1 = /* @__PURE__ */ new Set(), g1 = /* @__PURE__ */ new Set(), S1 = /* @__PURE__ */ new Set(), b1 = /* @__PURE__ */ new Set(), E1 = /* @__PURE__ */ new Set(), C1 = /* @__PURE__ */ new Set(), T1 = /* @__PURE__ */ new Set(), x1 = /* @__PURE__ */ new Set(), Sv = /* @__PURE__ */ new Set();
      var mT = /* @__PURE__ */ new Set();
      Iy = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          mT.has(a) || (mT.add(a), y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, hT = function(e, t) {
        if (t === void 0) {
          var a = Jt(e) || "Component";
          C1.has(a) || (C1.add(a), y("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(m1, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(m1);
    }
    function w1(e, t, a, o) {
      var u = e.memoizedState, d = a(o, u);
      {
        if (e.mode & Mt) {
          Gn(!0);
          try {
            d = a(o, u);
          } finally {
            Gn(!1);
          }
        }
        hT(t, d);
      }
      var v = d == null ? u : At({}, u, d);
      if (e.memoizedState = v, e.lanes === he) {
        var b = e.updateQueue;
        b.baseState = v;
      }
    }
    var R1 = {
      isMounted: ba,
      enqueueSetState: function(e, t, a) {
        var o = za(e), u = Ra(), d = Ku(o), v = Ll(u, d);
        v.payload = t, a != null && (Iy(a, "setState"), v.callback = a);
        var b = Bu(o, v, d);
        b !== null && (kr(b, o, d, u), Sy(b, o, d)), As(o, d);
      },
      enqueueReplaceState: function(e, t, a) {
        var o = za(e), u = Ra(), d = Ku(o), v = Ll(u, d);
        v.tag = NE, v.payload = t, a != null && (Iy(a, "replaceState"), v.callback = a);
        var b = Bu(o, v, d);
        b !== null && (kr(b, o, d, u), Sy(b, o, d)), As(o, d);
      },
      enqueueForceUpdate: function(e, t) {
        var a = za(e), o = Ra(), u = Ku(a), d = Ll(o, u);
        d.tag = my, t != null && (Iy(t, "forceUpdate"), d.callback = t);
        var v = Bu(a, d, u);
        v !== null && (kr(v, a, u, o), Sy(v, a, u)), Jc(a, u);
      }
    };
    function yT(e, t, a, o, u, d, v) {
      var b = e.stateNode;
      if (typeof b.shouldComponentUpdate == "function") {
        var C = b.shouldComponentUpdate(o, d, v);
        {
          if (e.mode & Mt) {
            Gn(!0);
            try {
              C = b.shouldComponentUpdate(o, d, v);
            } finally {
              Gn(!1);
            }
          }
          C === void 0 && y("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Jt(t) || "Component");
        }
        return C;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !pt(a, o) || !pt(u, d) : !0;
    }
    function eD(e, t, a) {
      var o = e.stateNode;
      {
        var u = Jt(t) || "Component", d = o.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? y("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : y("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && y("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && y("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), o.propTypes && y("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), o.contextType && y("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Sv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Mt) === Ze && (Sv.add(t), y(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Sv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Mt) === Ze && (Sv.add(t), y(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), o.contextTypes && y("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !T1.has(t) && (T1.add(t), y("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof o.componentShouldUpdate == "function" && y("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && y("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Jt(t) || "A pure component"), typeof o.componentDidUnmount == "function" && y("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof o.componentDidReceiveProps == "function" && y("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof o.componentWillRecieveProps == "function" && y("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof o.UNSAFE_componentWillRecieveProps == "function" && y("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var v = o.props !== a;
        o.props !== void 0 && v && y("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), o.defaultProps && y("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !S1.has(t) && (S1.add(t), y("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Jt(t))), typeof o.getDerivedStateFromProps == "function" && y("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof o.getDerivedStateFromError == "function" && y("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && y("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var b = o.state;
        b && (typeof b != "object" || sr(b)) && y("%s.state: must be set to an object or null", u), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && y("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function gT(e, t) {
      t.updater = R1, e.stateNode = t, iu(t, e), t._reactInternalInstance = m1;
    }
    function ST(e, t, a) {
      var o = !1, u = di, d = di, v = t.contextType;
      if ("contextType" in t) {
        var b = (
          // Allow null for conditional declaration
          v === null || v !== void 0 && v.$$typeof === Se && v._context === void 0
        );
        if (!b && !x1.has(t)) {
          x1.add(t);
          var C = "";
          v === void 0 ? C = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof v != "object" ? C = " However, it is set to a " + typeof v + "." : v.$$typeof === M ? C = " Did you accidentally pass the Context.Provider instead?" : v._context !== void 0 ? C = " Did you accidentally pass the Context.Consumer instead?" : C = " However, it is set to an object with keys {" + Object.keys(v).join(", ") + "}.", y("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Jt(t) || "Component", C);
        }
      }
      if (typeof v == "object" && v !== null)
        d = hr(v);
      else {
        u = Gf(e, t, !0);
        var T = t.contextTypes;
        o = T != null, d = o ? Qf(e, u) : di;
      }
      var w = new t(a, d);
      if (e.mode & Mt) {
        Gn(!0);
        try {
          w = new t(a, d);
        } finally {
          Gn(!1);
        }
      }
      var j = e.memoizedState = w.state !== null && w.state !== void 0 ? w.state : null;
      gT(e, w);
      {
        if (typeof t.getDerivedStateFromProps == "function" && j === null) {
          var U = Jt(t) || "Component";
          g1.has(U) || (g1.add(U), y("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", U, w.state === null ? "null" : "undefined", U));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof w.getSnapshotBeforeUpdate == "function") {
          var Z = null, ee = null, re = null;
          if (typeof w.componentWillMount == "function" && w.componentWillMount.__suppressDeprecationWarning !== !0 ? Z = "componentWillMount" : typeof w.UNSAFE_componentWillMount == "function" && (Z = "UNSAFE_componentWillMount"), typeof w.componentWillReceiveProps == "function" && w.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ee = "componentWillReceiveProps" : typeof w.UNSAFE_componentWillReceiveProps == "function" && (ee = "UNSAFE_componentWillReceiveProps"), typeof w.componentWillUpdate == "function" && w.componentWillUpdate.__suppressDeprecationWarning !== !0 ? re = "componentWillUpdate" : typeof w.UNSAFE_componentWillUpdate == "function" && (re = "UNSAFE_componentWillUpdate"), Z !== null || ee !== null || re !== null) {
            var Ue = Jt(t) || "Component", ct = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            b1.has(Ue) || (b1.add(Ue), y(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Ue, ct, Z !== null ? `
  ` + Z : "", ee !== null ? `
  ` + ee : "", re !== null ? `
  ` + re : ""));
          }
        }
      }
      return o && uE(e, u, d), w;
    }
    function tD(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (y("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", wt(e) || "Component"), R1.enqueueReplaceState(t, t.state, null));
    }
    function bT(e, t, a, o) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== u) {
        {
          var d = wt(e) || "Component";
          y1.has(d) || (y1.add(d), y("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", d));
        }
        R1.enqueueReplaceState(t, t.state, null);
      }
    }
    function _1(e, t, a, o) {
      eD(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, US(e);
      var d = t.contextType;
      if (typeof d == "object" && d !== null)
        u.context = hr(d);
      else {
        var v = Gf(e, t, !0);
        u.context = Qf(e, v);
      }
      {
        if (u.state === a) {
          var b = Jt(t) || "Component";
          E1.has(b) || (E1.add(b), y("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", b));
        }
        e.mode & Mt && ro.recordLegacyContextWarning(e, u), ro.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var C = t.getDerivedStateFromProps;
      if (typeof C == "function" && (w1(e, t, C, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (tD(e, u), by(e, a, u, o), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var T = _t;
        T |= Jr, (e.mode & Ea) !== Ze && (T |= ea), e.flags |= T;
      }
    }
    function nD(e, t, a, o) {
      var u = e.stateNode, d = e.memoizedProps;
      u.props = d;
      var v = u.context, b = t.contextType, C = di;
      if (typeof b == "object" && b !== null)
        C = hr(b);
      else {
        var T = Gf(e, t, !0);
        C = Qf(e, T);
      }
      var w = t.getDerivedStateFromProps, j = typeof w == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !j && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (d !== a || v !== C) && bT(e, u, a, C), zE();
      var U = e.memoizedState, Z = u.state = U;
      if (by(e, a, u, o), Z = e.memoizedState, d === a && U === Z && !ty() && !Cy()) {
        if (typeof u.componentDidMount == "function") {
          var ee = _t;
          ee |= Jr, (e.mode & Ea) !== Ze && (ee |= ea), e.flags |= ee;
        }
        return !1;
      }
      typeof w == "function" && (w1(e, t, w, a), Z = e.memoizedState);
      var re = Cy() || yT(e, t, d, a, U, Z, C);
      if (re) {
        if (!j && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Ue = _t;
          Ue |= Jr, (e.mode & Ea) !== Ze && (Ue |= ea), e.flags |= Ue;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var ct = _t;
          ct |= Jr, (e.mode & Ea) !== Ze && (ct |= ea), e.flags |= ct;
        }
        e.memoizedProps = a, e.memoizedState = Z;
      }
      return u.props = a, u.state = Z, u.context = C, re;
    }
    function rD(e, t, a, o, u) {
      var d = t.stateNode;
      LE(e, t);
      var v = t.memoizedProps, b = t.type === t.elementType ? v : oo(t.type, v);
      d.props = b;
      var C = t.pendingProps, T = d.context, w = a.contextType, j = di;
      if (typeof w == "object" && w !== null)
        j = hr(w);
      else {
        var U = Gf(t, a, !0);
        j = Qf(t, U);
      }
      var Z = a.getDerivedStateFromProps, ee = typeof Z == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !ee && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (v !== C || T !== j) && bT(t, d, o, j), zE();
      var re = t.memoizedState, Ue = d.state = re;
      if (by(t, o, d, u), Ue = t.memoizedState, v === C && re === Ue && !ty() && !Cy() && !ze)
        return typeof d.componentDidUpdate == "function" && (v !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= _t), typeof d.getSnapshotBeforeUpdate == "function" && (v !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= Ua), !1;
      typeof Z == "function" && (w1(t, a, Z, o), Ue = t.memoizedState);
      var ct = Cy() || yT(t, a, b, o, re, Ue, j) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ze;
      return ct ? (!ee && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Ue, j), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, Ue, j)), typeof d.componentDidUpdate == "function" && (t.flags |= _t), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= Ua)) : (typeof d.componentDidUpdate == "function" && (v !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= _t), typeof d.getSnapshotBeforeUpdate == "function" && (v !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= Ua), t.memoizedProps = o, t.memoizedState = Ue), d.props = o, d.state = Ue, d.context = j, ct;
    }
    function uc(e, t) {
      return {
        value: e,
        source: t,
        stack: Ld(t),
        digest: null
      };
    }
    function k1(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function aD(e, t) {
      return !0;
    }
    function O1(e, t) {
      try {
        var a = aD(e, t);
        if (a === !1)
          return;
        var o = t.value, u = t.source, d = t.stack, v = d !== null ? d : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === k)
            return;
          console.error(o);
        }
        var b = u ? wt(u) : null, C = b ? "The above error occurred in the <" + b + "> component:" : "The above error occurred in one of your React components:", T;
        if (e.tag === O)
          T = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var w = wt(e) || "Anonymous";
          T = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + w + ".");
        }
        var j = C + `
` + v + `

` + ("" + T);
        console.error(j);
      } catch (U) {
        setTimeout(function() {
          throw U;
        });
      }
    }
    var iD = typeof WeakMap == "function" ? WeakMap : Map;
    function CT(e, t, a) {
      var o = Ll(hn, a);
      o.tag = LS, o.payload = {
        element: null
      };
      var u = t.value;
      return o.callback = function() {
        XA(u), O1(e, t);
      }, o;
    }
    function D1(e, t, a) {
      var o = Ll(hn, a);
      o.tag = LS;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var d = t.value;
        o.payload = function() {
          return u(d);
        }, o.callback = function() {
          Mx(e), O1(e, t);
        };
      }
      var v = e.stateNode;
      return v !== null && typeof v.componentDidCatch == "function" && (o.callback = function() {
        Mx(e), O1(e, t), typeof u != "function" && qA(this);
        var C = t.value, T = t.stack;
        this.componentDidCatch(C, {
          componentStack: T !== null ? T : ""
        }), typeof u != "function" && (oa(e.lanes, ot) || y("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", wt(e) || "Unknown"));
      }), o;
    }
    function ET(e, t, a) {
      var o = e.pingCache, u;
      if (o === null ? (o = e.pingCache = new iD(), u = /* @__PURE__ */ new Set(), o.set(t, u)) : (u = o.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(t, u))), !u.has(a)) {
        u.add(a);
        var d = ZA.bind(null, e, t, a);
        Ca && Uv(e, a), t.then(d, d);
      }
    }
    function oD(e, t, a, o) {
      var u = e.updateQueue;
      if (u === null) {
        var d = /* @__PURE__ */ new Set();
        d.add(a), e.updateQueue = d;
      } else
        u.add(a);
    }
    function lD(e, t) {
      var a = e.tag;
      if ((e.mode & tt) === Ze && (a === R || a === X || a === ce)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function TT(e) {
      var t = e;
      do {
        if (t.tag === $ && VO(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function xT(e, t, a, o, u) {
      if ((e.mode & tt) === Ze) {
        if (e === t)
          e.flags |= fr;
        else {
          if (e.flags |= gt, a.flags |= ks, a.flags &= ~(Vc | ga), a.tag === k) {
            var d = a.alternate;
            if (d === null)
              a.tag = _;
            else {
              var v = Ll(hn, ot);
              v.tag = my, Bu(a, v, ot);
            }
          }
          a.lanes = Rt(a.lanes, ot);
        }
        return e;
      }
      return e.flags |= fr, e.lanes = u, e;
    }
    function uD(e, t, a, o, u) {
      if (a.flags |= ga, Ca && Uv(e, u), o !== null && typeof o == "object" && typeof o.then == "function") {
        var d = o;
        lD(a), $r() && a.mode & tt && hE();
        var v = TT(t);
        if (v !== null) {
          v.flags &= ~Ln, xT(v, t, a, e, u), v.mode & tt && ET(e, d, u), oD(v, e, d);
          return;
        } else {
          if (!Ep(u)) {
            ET(e, d, u), sb();
            return;
          }
          var b = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = b;
        }
      } else if ($r() && a.mode & tt) {
        hE();
        var C = TT(t);
        if (C !== null) {
          (C.flags & fr) === st && (C.flags |= Ln), xT(C, t, a, e, u), ES(uc(o, a));
          return;
        }
      }
      o = uc(o, a), VA(o);
      var T = t;
      do {
        switch (T.tag) {
          case O: {
            var w = o;
            T.flags |= fr;
            var j = Su(u);
            T.lanes = Rt(T.lanes, j);
            var U = CT(T, w, j);
            FS(T, U);
            return;
          }
          case k:
            var Z = o, ee = T.type, re = T.stateNode;
            if ((T.flags & gt) === st && (typeof ee.getDerivedStateFromError == "function" || re !== null && typeof re.componentDidCatch == "function" && !Tx(re))) {
              T.flags |= fr;
              var Ue = Su(u);
              T.lanes = Rt(T.lanes, Ue);
              var ct = D1(T, Z, Ue);
              FS(T, ct);
              return;
            }
            break;
        }
        T = T.return;
      } while (T !== null);
    }
    function sD() {
      return null;
    }
    var bv = f.ReactCurrentOwner, lo = !1, A1, Cv, M1, N1, L1, sc, z1, Yy, Ev;
    A1 = {}, Cv = {}, M1 = {}, N1 = {}, L1 = {}, sc = !1, z1 = {}, Yy = {}, Ev = {};
    function xa(e, t, a, o) {
      e === null ? t.child = _E(t, null, a, o) : t.child = Zf(t, e.child, a, o);
    }
    function cD(e, t, a, o) {
      t.child = Zf(t, e.child, null, o), t.child = Zf(t, null, a, o);
    }
    function wT(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && to(
          d,
          o,
          // Resolved props
          "prop",
          Jt(a)
        );
      }
      var v = a.render, b = t.ref, C, T;
      ed(t, u), su(t);
      {
        if (bv.current = t, li(!0), C = od(e, t, v, o, b, u), T = ld(), t.mode & Mt) {
          Gn(!0);
          try {
            C = od(e, t, v, o, b, u), T = ld();
          } finally {
            Gn(!1);
          }
        }
        li(!1);
      }
      return ra(), e !== null && !lo ? (VE(e, t, u), zl(e, t, u)) : ($r() && T && mS(t), t.flags |= To, xa(e, t, C, u), t.child);
    }
    function RT(e, t, a, o, u) {
      if (e === null) {
        var d = a.type;
        if (hM(d) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var v = d;
          return v = hd(d), t.tag = ce, t.type = v, P1(t, d), _T(e, t, v, o, u);
        }
        {
          var b = d.propTypes;
          if (b && to(
            b,
            o,
            // Resolved props
            "prop",
            Jt(d)
          ), a.defaultProps !== void 0) {
            var C = Jt(d) || "Unknown";
            Ev[C] || (y("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", C), Ev[C] = !0);
          }
        }
        var T = bb(a.type, null, o, t, t.mode, u);
        return T.ref = t.ref, T.return = t, t.child = T, T;
      }
      {
        var w = a.type, j = w.propTypes;
        j && to(
          j,
          o,
          // Resolved props
          "prop",
          Jt(w)
        );
      }
      var U = e.child, Z = I1(e, u);
      if (!Z) {
        var ee = U.memoizedProps, re = a.compare;
        if (re = re !== null ? re : pt, re(ee, o) && e.ref === t.ref)
          return zl(e, t, u);
      }
      t.flags |= To;
      var Ue = vc(U, o);
      return Ue.ref = t.ref, Ue.return = t, t.child = Ue, Ue;
    }
    function _T(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === vt) {
          var v = d, b = v._payload, C = v._init;
          try {
            d = C(b);
          } catch {
            d = null;
          }
          var T = d && d.propTypes;
          T && to(
            T,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Jt(d)
          );
        }
      }
      if (e !== null) {
        var w = e.memoizedProps;
        if (pt(w, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (lo = !1, t.pendingProps = o = w, I1(e, u))
            (e.flags & ks) !== st && (lo = !0);
          else return t.lanes = e.lanes, zl(e, t, u);
      }
      return U1(e, t, a, o, u);
    }
    function kT(e, t, a) {
      var o = t.pendingProps, u = o.children, d = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || I)
        if ((t.mode & tt) === Ze) {
          var v = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = v, ag(t, a);
        } else if (oa(a, Lr)) {
          var j = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = j;
          var U = d !== null ? d.baseLanes : a;
          ag(t, U);
        } else {
          var b = null, C;
          if (d !== null) {
            var T = d.baseLanes;
            C = Rt(T, a);
          } else
            C = a;
          t.lanes = t.childLanes = Lr;
          var w = {
            baseLanes: C,
            cachePool: b,
            transitions: null
          };
          return t.memoizedState = w, t.updateQueue = null, ag(t, C), null;
        }
      else {
        var Z;
        d !== null ? (Z = Rt(d.baseLanes, a), t.memoizedState = null) : Z = a, ag(t, Z);
      }
      return xa(e, t, u, a), t.child;
    }
    function fD(e, t, a) {
      var o = t.pendingProps;
      return xa(e, t, o, a), t.child;
    }
    function dD(e, t, a) {
      var o = t.pendingProps.children;
      return xa(e, t, o, a), t.child;
    }
    function pD(e, t, a) {
      {
        t.flags |= _t;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, d = u.children;
      return xa(e, t, d, a), t.child;
    }
    function OT(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Zr, t.flags |= sp);
    }
    function U1(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && to(
          d,
          o,
          // Resolved props
          "prop",
          Jt(a)
        );
      }
      var v;
      {
        var b = Gf(t, a, !0);
        v = Qf(t, b);
      }
      var C, T;
      ed(t, u), su(t);
      {
        if (bv.current = t, li(!0), C = od(e, t, a, o, v, u), T = ld(), t.mode & Mt) {
          Gn(!0);
          try {
            C = od(e, t, a, o, v, u), T = ld();
          } finally {
            Gn(!1);
          }
        }
        li(!1);
      }
      return ra(), e !== null && !lo ? (VE(e, t, u), zl(e, t, u)) : ($r() && T && mS(t), t.flags |= To, xa(e, t, C, u), t.child);
    }
    function DT(e, t, a, o, u) {
      {
        switch (DM(t)) {
          case !1: {
            var d = t.stateNode, v = t.type, b = new v(t.memoizedProps, d.context), C = b.state;
            d.updater.enqueueSetState(d, C, null);
            break;
          }
          case !0: {
            t.flags |= gt, t.flags |= fr;
            var T = new Error("Simulated error coming from DevTools"), w = Su(u);
            t.lanes = Rt(t.lanes, w);
            var j = D1(t, uc(T, t), w);
            FS(t, j);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var U = a.propTypes;
          U && to(
            U,
            o,
            // Resolved props
            "prop",
            Jt(a)
          );
        }
      }
      var Z;
      Uo(a) ? (Z = !0, ry(t)) : Z = !1, ed(t, u);
      var ee = t.stateNode, re;
      ee === null ? (Gy(e, t), ST(t, a, o), _1(t, a, o, u), re = !0) : e === null ? re = nD(t, a, o, u) : re = rD(e, t, a, o, u);
      var Ue = F1(e, t, a, re, Z, u);
      {
        var ct = t.stateNode;
        re && ct.props !== o && (sc || y("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", wt(t) || "a component"), sc = !0);
      }
      return Ue;
    }
    function F1(e, t, a, o, u, d) {
      OT(e, t);
      var v = (t.flags & gt) !== st;
      if (!o && !v)
        return u && fE(t, a, !1), zl(e, t, d);
      var b = t.stateNode;
      bv.current = t;
      var C;
      if (v && typeof a.getDerivedStateFromError != "function")
        C = null, vT();
      else {
        su(t);
        {
          if (li(!0), C = b.render(), t.mode & Mt) {
            Gn(!0);
            try {
              b.render();
            } finally {
              Gn(!1);
            }
          }
          li(!1);
        }
        ra();
      }
      return t.flags |= To, e !== null && v ? cD(e, t, C, d) : xa(e, t, C, d), t.memoizedState = b.state, u && fE(t, a, !0), t.child;
    }
    function AT(e) {
      var t = e.stateNode;
      t.pendingContext ? sE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && sE(e, t.context, !1), PS(e, t.containerInfo);
    }
    function vD(e, t, a) {
      if (AT(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, u = t.memoizedState, d = u.element;
      LE(e, t), by(t, o, null, a);
      var v = t.memoizedState;
      t.stateNode;
      var b = v.element;
      if (u.isDehydrated) {
        var C = {
          element: b,
          isDehydrated: !1,
          cache: v.cache,
          pendingSuspenseBoundaries: v.pendingSuspenseBoundaries,
          transitions: v.transitions
        }, T = t.updateQueue;
        if (T.baseState = C, t.memoizedState = C, t.flags & Ln) {
          var w = uc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return MT(e, t, b, a, w);
        } else if (b !== d) {
          var j = uc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return MT(e, t, b, a, j);
        } else {
          yO(t);
          var U = _E(t, null, b, a);
          t.child = U;
          for (var Z = U; Z; )
            Z.flags = Z.flags & ~gn | Fa, Z = Z.sibling;
        }
      } else {
        if (Xf(), b === d)
          return zl(e, t, a);
        xa(e, t, b, a);
      }
      return t.child;
    }
    function MT(e, t, a, o, u) {
      return Xf(), ES(u), t.flags |= Ln, xa(e, t, a, o), t.child;
    }
    function hD(e, t, a) {
      PE(t), e === null && CS(t);
      var o = t.type, u = t.pendingProps, d = e !== null ? e.memoizedProps : null, v = u.children, b = nS(o, u);
      return b ? v = null : d !== null && nS(o, d) && (t.flags |= qt), OT(e, t), xa(e, t, v, a), t.child;
    }
    function mD(e, t) {
      return e === null && CS(t), null;
    }
    function yD(e, t, a, o) {
      Gy(e, t);
      var u = t.pendingProps, d = a, v = d._payload, b = d._init, C = b(v);
      t.type = C;
      var T = t.tag = mM(C), w = oo(C, u), j;
      switch (T) {
        case R:
          return P1(t, C), t.type = C = hd(C), j = U1(null, t, C, w, o), j;
        case k:
          return t.type = C = vb(C), j = DT(null, t, C, w, o), j;
        case X:
          return t.type = C = hb(C), j = wT(null, t, C, w, o), j;
        case be: {
          if (t.type !== t.elementType) {
            var U = C.propTypes;
            U && to(
              U,
              w,
              // Resolved for outer only
              "prop",
              Jt(C)
            );
          }
          return j = RT(
            null,
            t,
            C,
            oo(C.type, w),
            // The inner type can have defaults too
            o
          ), j;
        }
      }
      var Z = "";
      throw C !== null && typeof C == "object" && C.$$typeof === vt && (Z = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + C + ". " + ("Lazy element type must resolve to a class or function." + Z));
    }
    function gD(e, t, a, o, u) {
      Gy(e, t), t.tag = k;
      var d;
      return Uo(a) ? (d = !0, ry(t)) : d = !1, ed(t, u), ST(t, a, o), _1(t, a, o, u), F1(null, t, a, !0, d, u);
    }
    function SD(e, t, a, o) {
      Gy(e, t);
      var u = t.pendingProps, d;
      {
        var v = Gf(t, a, !1);
        d = Qf(t, v);
      }
      ed(t, o);
      var b, C;
      su(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var T = Jt(a) || "Unknown";
          A1[T] || (y("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", T, T), A1[T] = !0);
        }
        t.mode & Mt && ro.recordLegacyContextWarning(t, null), li(!0), bv.current = t, b = od(null, t, a, u, d, o), C = ld(), li(!1);
      }
      if (ra(), t.flags |= To, typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0) {
        var w = Jt(a) || "Unknown";
        Cv[w] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", w, w, w), Cv[w] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0
      ) {
        {
          var j = Jt(a) || "Unknown";
          Cv[j] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", j, j, j), Cv[j] = !0);
        }
        t.tag = k, t.memoizedState = null, t.updateQueue = null;
        var U = !1;
        return Uo(a) ? (U = !0, ry(t)) : U = !1, t.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null, US(t), gT(t, b), _1(t, a, u, o), F1(null, t, a, !0, U, o);
      } else {
        if (t.tag = R, t.mode & Mt) {
          Gn(!0);
          try {
            b = od(null, t, a, u, d, o), C = ld();
          } finally {
            Gn(!1);
          }
        }
        return $r() && C && mS(t), xa(null, t, b, o), P1(t, a), t.child;
      }
    }
    function P1(e, t) {
      {
        if (t && t.childContextTypes && y("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", o = Na();
          o && (a += `

Check the render method of \`` + o + "`.");
          var u = o || "", d = e._debugSource;
          d && (u = d.fileName + ":" + d.lineNumber), L1[u] || (L1[u] = !0, y("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var v = Jt(t) || "Unknown";
          Ev[v] || (y("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", v), Ev[v] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var b = Jt(t) || "Unknown";
          N1[b] || (y("%s: Function components do not support getDerivedStateFromProps.", b), N1[b] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var C = Jt(t) || "Unknown";
          M1[C] || (y("%s: Function components do not support contextType.", C), M1[C] = !0);
        }
      }
    }
    var j1 = {
      dehydrated: null,
      treeContext: null,
      retryLane: Qn
    };
    function $1(e) {
      return {
        baseLanes: e,
        cachePool: sD(),
        transitions: null
      };
    }
    function bD(e, t) {
      var a = null;
      return {
        baseLanes: Rt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function CD(e, t, a, o) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return VS(e, fv);
    }
    function ED(e, t) {
      return Ps(e.childLanes, t);
    }
    function NT(e, t, a) {
      var o = t.pendingProps;
      AM(t) && (t.flags |= gt);
      var u = ao.current, d = !1, v = (t.flags & gt) !== st;
      if (v || CD(u, e) ? (d = !0, t.flags &= ~gt) : (e === null || e.memoizedState !== null) && (u = $O(u, $E)), u = nd(u), Iu(t, u), e === null) {
        CS(t);
        var b = t.memoizedState;
        if (b !== null) {
          var C = b.dehydrated;
          if (C !== null)
            return _D(t, C);
        }
        var T = o.children, w = o.fallback;
        if (d) {
          var j = TD(t, T, w, a), U = t.child;
          return U.memoizedState = $1(a), t.memoizedState = j1, j;
        } else
          return V1(t, T);
      } else {
        var Z = e.memoizedState;
        if (Z !== null) {
          var ee = Z.dehydrated;
          if (ee !== null)
            return kD(e, t, v, o, ee, Z, a);
        }
        if (d) {
          var re = o.fallback, Ue = o.children, ct = wD(e, t, Ue, re, a), nt = t.child, jt = e.child.memoizedState;
          return nt.memoizedState = jt === null ? $1(a) : bD(jt, a), nt.childLanes = ED(e, a), t.memoizedState = j1, ct;
        } else {
          var Lt = o.children, G = xD(e, t, Lt, a);
          return t.memoizedState = null, G;
        }
      }
    }
    function V1(e, t, a) {
      var o = e.mode, u = {
        mode: "visible",
        children: t
      }, d = B1(u, o);
      return d.return = e, e.child = d, d;
    }
    function TD(e, t, a, o) {
      var u = e.mode, d = e.child, v = {
        mode: "hidden",
        children: t
      }, b, C;
      return (u & tt) === Ze && d !== null ? (b = d, b.childLanes = he, b.pendingProps = v, e.mode & St && (b.actualDuration = 0, b.actualStartTime = -1, b.selfBaseDuration = 0, b.treeBaseDuration = 0), C = Zu(a, u, o, null)) : (b = B1(v, u), C = Zu(a, u, o, null)), b.return = e, C.return = e, b.sibling = C, e.child = b, C;
    }
    function B1(e, t, a) {
      return Lx(e, t, he, null);
    }
    function LT(e, t) {
      return vc(e, t);
    }
    function xD(e, t, a, o) {
      var u = e.child, d = u.sibling, v = LT(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & tt) === Ze && (v.lanes = o), v.return = t, v.sibling = null, d !== null) {
        var b = t.deletions;
        b === null ? (t.deletions = [d], t.flags |= Gt) : b.push(d);
      }
      return t.child = v, v;
    }
    function wD(e, t, a, o, u) {
      var d = t.mode, v = e.child, b = v.sibling, C = {
        mode: "hidden",
        children: a
      }, T;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (d & tt) === Ze && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== v
      ) {
        var w = t.child;
        T = w, T.childLanes = he, T.pendingProps = C, t.mode & St && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = v.selfBaseDuration, T.treeBaseDuration = v.treeBaseDuration), t.deletions = null;
      } else
        T = LT(v, C), T.subtreeFlags = v.subtreeFlags & gr;
      var j;
      return b !== null ? j = vc(b, o) : (j = Zu(o, d, u, null), j.flags |= gn), j.return = t, T.return = t, T.sibling = j, t.child = T, j;
    }
    function Wy(e, t, a, o) {
      o !== null && ES(o), Zf(t, e.child, null, a);
      var u = t.pendingProps, d = u.children, v = V1(t, d);
      return v.flags |= gn, t.memoizedState = null, v;
    }
    function RD(e, t, a, o, u) {
      var d = t.mode, v = {
        mode: "visible",
        children: a
      }, b = B1(v, d), C = Zu(o, d, u, null);
      return C.flags |= gn, b.return = t, C.return = t, b.sibling = C, t.child = b, (t.mode & tt) !== Ze && Zf(t, e.child, null, u), C;
    }
    function _D(e, t, a) {
      return (e.mode & tt) === Ze ? (y("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = ot) : oS(t) ? e.lanes = Ki : e.lanes = Lr, null;
    }
    function kD(e, t, a, o, u, d, v) {
      if (a)
        if (t.flags & Ln) {
          t.flags &= ~Ln;
          var G = k1(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Wy(e, t, v, G);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= gt, null;
          var ae = o.children, Q = o.fallback, Ee = RD(e, t, ae, Q, v), Be = t.child;
          return Be.memoizedState = $1(v), t.memoizedState = j1, Ee;
        }
      else {
        if (hO(), (t.mode & tt) === Ze)
          return Wy(
            e,
            t,
            v,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (oS(u)) {
          var b, C, T;
          {
            var w = Mk(u);
            b = w.digest, C = w.message, T = w.stack;
          }
          var j;
          C ? j = new Error(C) : j = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var U = k1(j, b, T);
          return Wy(e, t, v, U);
        }
        var Z = oa(v, e.childLanes);
        if (lo || Z) {
          var ee = rg();
          if (ee !== null) {
            var re = gm(ee, v);
            if (re !== Qn && re !== d.retryLane) {
              d.retryLane = re;
              var Ue = hn;
              qa(e, re), kr(ee, e, re, Ue);
            }
          }
          sb();
          var ct = k1(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Wy(e, t, v, ct);
        } else if (rE(u)) {
          t.flags |= gt, t.child = e.child;
          var nt = JA.bind(null, e);
          return Nk(u, nt), null;
        } else {
          gO(t, u, d.treeContext);
          var jt = o.children, Lt = V1(t, jt);
          return Lt.flags |= Fa, Lt;
        }
      }
    }
    function zT(e, t, a) {
      e.lanes = Rt(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = Rt(o.lanes, t)), MS(e.return, t, a);
    }
    function OD(e, t, a) {
      for (var o = t; o !== null; ) {
        if (o.tag === $) {
          var u = o.memoizedState;
          u !== null && zT(o, a, e);
        } else if (o.tag === ke)
          zT(o, a, e);
        else if (o.child !== null) {
          o.child.return = o, o = o.child;
          continue;
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }
    function DD(e) {
      for (var t = e, a = null; t !== null; ) {
        var o = t.alternate;
        o !== null && xy(o) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function AD(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !z1[e])
        if (z1[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              y('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              y('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              y('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          y('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function MD(e, t) {
      e !== void 0 && !Yy[e] && (e !== "collapsed" && e !== "hidden" ? (Yy[e] = !0, y('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Yy[e] = !0, y('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function UT(e, t) {
      {
        var a = sr(e), o = !a && typeof ma(e) == "function";
        if (a || o) {
          var u = a ? "array" : "iterable";
          return y("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function ND(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (sr(e)) {
          for (var a = 0; a < e.length; a++)
            if (!UT(e[a], a))
              return;
        } else {
          var o = ma(e);
          if (typeof o == "function") {
            var u = o.call(e);
            if (u)
              for (var d = u.next(), v = 0; !d.done; d = u.next()) {
                if (!UT(d.value, v))
                  return;
                v++;
              }
          } else
            y('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function H1(e, t, a, o, u) {
      var d = e.memoizedState;
      d === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: o,
        tail: a,
        tailMode: u
      } : (d.isBackwards = t, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = a, d.tailMode = u);
    }
    function FT(e, t, a) {
      var o = t.pendingProps, u = o.revealOrder, d = o.tail, v = o.children;
      AD(u), MD(d, u), ND(v, u), xa(e, t, v, a);
      var b = ao.current, C = VS(b, fv);
      if (C)
        b = BS(b, fv), t.flags |= gt;
      else {
        var T = e !== null && (e.flags & gt) !== st;
        T && OD(t, t.child, a), b = nd(b);
      }
      if (Iu(t, b), (t.mode & tt) === Ze)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var w = DD(t.child), j;
            w === null ? (j = t.child, t.child = null) : (j = w.sibling, w.sibling = null), H1(
              t,
              !1,
              // isBackwards
              j,
              w,
              d
            );
            break;
          }
          case "backwards": {
            var U = null, Z = t.child;
            for (t.child = null; Z !== null; ) {
              var ee = Z.alternate;
              if (ee !== null && xy(ee) === null) {
                t.child = Z;
                break;
              }
              var re = Z.sibling;
              Z.sibling = U, U = Z, Z = re;
            }
            H1(
              t,
              !0,
              // isBackwards
              U,
              null,
              // last
              d
            );
            break;
          }
          case "together": {
            H1(
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
    function LD(e, t, a) {
      PS(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = Zf(t, null, o, a) : xa(e, t, o, a), t.child;
    }
    var PT = !1;
    function zD(e, t, a) {
      var o = t.type, u = o._context, d = t.pendingProps, v = t.memoizedProps, b = d.value;
      {
        "value" in d || PT || (PT = !0, y("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var C = t.type.propTypes;
        C && to(C, d, "prop", "Context.Provider");
      }
      if (DE(t, u, b), v !== null) {
        var T = v.value;
        if (We(T, b)) {
          if (v.children === d.children && !ty())
            return zl(e, t, a);
        } else
          AO(t, u, a);
      }
      var w = d.children;
      return xa(e, t, w, a), t.child;
    }
    var jT = !1;
    function UD(e, t, a) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (jT || (jT = !0, y("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var u = t.pendingProps, d = u.children;
      typeof d != "function" && y("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), ed(t, a);
      var v = hr(o);
      su(t);
      var b;
      return bv.current = t, li(!0), b = d(v), li(!1), ra(), t.flags |= To, xa(e, t, b, a), t.child;
    }
    function Tv() {
      lo = !0;
    }
    function Gy(e, t) {
      (t.mode & tt) === Ze && e !== null && (e.alternate = null, t.alternate = null, t.flags |= gn);
    }
    function zl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), vT(), zv(t.lanes), oa(a, t.childLanes) ? (OO(e, t), t.child) : null;
    }
    function FD(e, t, a) {
      {
        var o = t.return;
        if (o === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === o.child)
          o.child = a;
        else {
          var u = o.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var d = o.deletions;
        return d === null ? (o.deletions = [e], o.flags |= Gt) : d.push(e), a.flags |= gn, a;
      }
    }
    function I1(e, t) {
      var a = e.lanes;
      return !!oa(a, t);
    }
    function PD(e, t, a) {
      switch (t.tag) {
        case O:
          AT(t), t.stateNode, Xf();
          break;
        case B:
          PE(t);
          break;
        case k: {
          var o = t.type;
          Uo(o) && ry(t);
          break;
        }
        case z:
          PS(t, t.stateNode.containerInfo);
          break;
        case oe: {
          var u = t.memoizedProps.value, d = t.type._context;
          DE(t, d, u);
          break;
        }
        case le:
          {
            var v = oa(a, t.childLanes);
            v && (t.flags |= _t);
            {
              var b = t.stateNode;
              b.effectDuration = 0, b.passiveEffectDuration = 0;
            }
          }
          break;
        case $: {
          var C = t.memoizedState;
          if (C !== null) {
            if (C.dehydrated !== null)
              return Iu(t, nd(ao.current)), t.flags |= gt, null;
            var T = t.child, w = T.childLanes;
            if (oa(a, w))
              return NT(e, t, a);
            Iu(t, nd(ao.current));
            var j = zl(e, t, a);
            return j !== null ? j.sibling : null;
          } else
            Iu(t, nd(ao.current));
          break;
        }
        case ke: {
          var U = (e.flags & gt) !== st, Z = oa(a, t.childLanes);
          if (U) {
            if (Z)
              return FT(e, t, a);
            t.flags |= gt;
          }
          var ee = t.memoizedState;
          if (ee !== null && (ee.rendering = null, ee.tail = null, ee.lastEffect = null), Iu(t, ao.current), Z)
            break;
          return null;
        }
        case pe:
        case Re:
          return t.lanes = he, kT(e, t, a);
      }
      return zl(e, t, a);
    }
    function $T(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return FD(e, t, bb(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, u = t.pendingProps;
        if (o !== u || ty() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          lo = !0;
        else {
          var d = I1(e, a);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & gt) === st)
            return lo = !1, PD(e, t, a);
          (e.flags & ks) !== st ? lo = !0 : lo = !1;
        }
      } else if (lo = !1, $r() && sO(t)) {
        var v = t.index, b = cO();
        vE(t, b, v);
      }
      switch (t.lanes = he, t.tag) {
        case N:
          return SD(e, t, t.type, a);
        case et: {
          var C = t.elementType;
          return yD(e, t, C, a);
        }
        case R: {
          var T = t.type, w = t.pendingProps, j = t.elementType === T ? w : oo(T, w);
          return U1(e, t, T, j, a);
        }
        case k: {
          var U = t.type, Z = t.pendingProps, ee = t.elementType === U ? Z : oo(U, Z);
          return DT(e, t, U, ee, a);
        }
        case O:
          return vD(e, t, a);
        case B:
          return hD(e, t, a);
        case H:
          return mD(e, t);
        case $:
          return NT(e, t, a);
        case z:
          return LD(e, t, a);
        case X: {
          var re = t.type, Ue = t.pendingProps, ct = t.elementType === re ? Ue : oo(re, Ue);
          return wT(e, t, re, ct, a);
        }
        case V:
          return fD(e, t, a);
        case F:
          return dD(e, t, a);
        case le:
          return pD(e, t, a);
        case oe:
          return zD(e, t, a);
        case fe:
          return UD(e, t, a);
        case be: {
          var nt = t.type, jt = t.pendingProps, Lt = oo(nt, jt);
          if (t.type !== t.elementType) {
            var G = nt.propTypes;
            G && to(
              G,
              Lt,
              // Resolved for outer only
              "prop",
              Jt(nt)
            );
          }
          return Lt = oo(nt.type, Lt), RT(e, t, nt, Lt, a);
        }
        case ce:
          return _T(e, t, t.type, t.pendingProps, a);
        case _: {
          var ae = t.type, Q = t.pendingProps, Ee = t.elementType === ae ? Q : oo(ae, Q);
          return gD(e, t, ae, Ee, a);
        }
        case ke:
          return FT(e, t, a);
        case ve:
          break;
        case pe:
          return kT(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function ud(e) {
      e.flags |= _t;
    }
    function VT(e) {
      e.flags |= Zr, e.flags |= sp;
    }
    var BT, Y1, HT, IT;
    BT = function(e, t, a, o) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === B || u.tag === H)
          ok(e, u.stateNode);
        else if (u.tag !== z) {
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
    }, Y1 = function(e, t) {
    }, HT = function(e, t, a, o, u) {
      var d = e.memoizedProps;
      if (d !== o) {
        var v = t.stateNode, b = jS(), C = uk(v, a, d, o, u, b);
        t.updateQueue = C, C && ud(t);
      }
    }, IT = function(e, t, a, o) {
      a !== o && ud(t);
    };
    function xv(e, t) {
      if (!$r())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, o = null; a !== null; )
              a.alternate !== null && (o = a), a = a.sibling;
            o === null ? e.tail = null : o.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, d = null; u !== null; )
              u.alternate !== null && (d = u), u = u.sibling;
            d === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : d.sibling = null;
            break;
          }
        }
    }
    function Br(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = he, o = st;
      if (t) {
        if ((e.mode & St) !== Ze) {
          for (var C = e.selfBaseDuration, T = e.child; T !== null; )
            a = Rt(a, Rt(T.lanes, T.childLanes)), o |= T.subtreeFlags & gr, o |= T.flags & gr, C += T.treeBaseDuration, T = T.sibling;
          e.treeBaseDuration = C;
        } else
          for (var w = e.child; w !== null; )
            a = Rt(a, Rt(w.lanes, w.childLanes)), o |= w.subtreeFlags & gr, o |= w.flags & gr, w.return = e, w = w.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & St) !== Ze) {
          for (var u = e.actualDuration, d = e.selfBaseDuration, v = e.child; v !== null; )
            a = Rt(a, Rt(v.lanes, v.childLanes)), o |= v.subtreeFlags, o |= v.flags, u += v.actualDuration, d += v.treeBaseDuration, v = v.sibling;
          e.actualDuration = u, e.treeBaseDuration = d;
        } else
          for (var b = e.child; b !== null; )
            a = Rt(a, Rt(b.lanes, b.childLanes)), o |= b.subtreeFlags, o |= b.flags, b.return = e, b = b.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = a, t;
    }
    function jD(e, t, a) {
      if (TO() && (t.mode & tt) !== Ze && (t.flags & gt) === st)
        return CE(t), Xf(), t.flags |= Ln | ga | fr, !1;
      var o = uy(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (CO(t), Br(t), (t.mode & St) !== Ze) {
            var u = a !== null;
            if (u) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Xf(), (t.flags & gt) === st && (t.memoizedState = null), t.flags |= _t, Br(t), (t.mode & St) !== Ze) {
            var v = a !== null;
            if (v) {
              var b = t.child;
              b !== null && (t.treeBaseDuration -= b.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return EE(), !0;
    }
    function YT(e, t, a) {
      var o = t.pendingProps;
      switch (yS(t), t.tag) {
        case N:
        case et:
        case ce:
        case R:
        case X:
        case V:
        case F:
        case le:
        case fe:
        case be:
          return Br(t), null;
        case k: {
          var u = t.type;
          return Uo(u) && ny(t), Br(t), null;
        }
        case O: {
          var d = t.stateNode;
          if (td(t), pS(t), IS(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var v = uy(t);
            if (v)
              ud(t);
            else if (e !== null) {
              var b = e.memoizedState;
              // Check if this is a client root
              (!b.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Ln) !== st) && (t.flags |= Ua, EE());
            }
          }
          return Y1(e, t), Br(t), null;
        }
        case B: {
          $S(t);
          var C = FE(), T = t.type;
          if (e !== null && t.stateNode != null)
            HT(e, t, T, o, C), e.ref !== t.ref && VT(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Br(t), null;
            }
            var w = jS(), j = uy(t);
            if (j)
              SO(t, C, w) && ud(t);
            else {
              var U = ik(T, o, C, w, t);
              BT(U, t, !1, !1), t.stateNode = U, lk(U, T, o, C) && ud(t);
            }
            t.ref !== null && VT(t);
          }
          return Br(t), null;
        }
        case H: {
          var Z = o;
          if (e && t.stateNode != null) {
            var ee = e.memoizedProps;
            IT(e, t, ee, Z);
          } else {
            if (typeof Z != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var re = FE(), Ue = jS(), ct = uy(t);
            ct ? bO(t) && ud(t) : t.stateNode = sk(Z, re, Ue, t);
          }
          return Br(t), null;
        }
        case $: {
          rd(t);
          var nt = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var jt = jD(e, t, nt);
            if (!jt)
              return t.flags & fr ? t : null;
          }
          if ((t.flags & gt) !== st)
            return t.lanes = a, (t.mode & St) !== Ze && h1(t), t;
          var Lt = nt !== null, G = e !== null && e.memoizedState !== null;
          if (Lt !== G && Lt) {
            var ae = t.child;
            if (ae.flags |= xo, (t.mode & tt) !== Ze) {
              var Q = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !de);
              Q || VS(ao.current, $E) ? $A() : sb();
            }
          }
          var Ee = t.updateQueue;
          if (Ee !== null && (t.flags |= _t), Br(t), (t.mode & St) !== Ze && Lt) {
            var Be = t.child;
            Be !== null && (t.treeBaseDuration -= Be.treeBaseDuration);
          }
          return null;
        }
        case z:
          return td(t), Y1(e, t), e === null && nO(t.stateNode.containerInfo), Br(t), null;
        case oe:
          var Fe = t.type._context;
          return AS(Fe, t), Br(t), null;
        case _: {
          var yt = t.type;
          return Uo(yt) && ny(t), Br(t), null;
        }
        case ke: {
          rd(t);
          var xt = t.memoizedState;
          if (xt === null)
            return Br(t), null;
          var an = (t.flags & gt) !== st, It = xt.rendering;
          if (It === null)
            if (an)
              xv(xt, !1);
            else {
              var ar = BA() && (e === null || (e.flags & gt) === st);
              if (!ar)
                for (var Yt = t.child; Yt !== null; ) {
                  var qn = xy(Yt);
                  if (qn !== null) {
                    an = !0, t.flags |= gt, xv(xt, !1);
                    var fa = qn.updateQueue;
                    return fa !== null && (t.updateQueue = fa, t.flags |= _t), t.subtreeFlags = st, DO(t, a), Iu(t, BS(ao.current, fv)), t.child;
                  }
                  Yt = Yt.sibling;
                }
              xt.tail !== null && On() > dx() && (t.flags |= gt, an = !0, xv(xt, !1), t.lanes = lm);
            }
          else {
            if (!an) {
              var Gr = xy(It);
              if (Gr !== null) {
                t.flags |= gt, an = !0;
                var vi = Gr.updateQueue;
                if (vi !== null && (t.updateQueue = vi, t.flags |= _t), xv(xt, !0), xt.tail === null && xt.tailMode === "hidden" && !It.alternate && !$r())
                  return Br(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              On() * 2 - xt.renderingStartTime > dx() && a !== Lr && (t.flags |= gt, an = !0, xv(xt, !1), t.lanes = lm);
            }
            if (xt.isBackwards)
              It.sibling = t.child, t.child = It;
            else {
              var _a = xt.last;
              _a !== null ? _a.sibling = It : t.child = It, xt.last = It;
            }
          }
          if (xt.tail !== null) {
            var ka = xt.tail;
            xt.rendering = ka, xt.tail = ka.sibling, xt.renderingStartTime = On(), ka.sibling = null;
            var da = ao.current;
            return an ? da = BS(da, fv) : da = nd(da), Iu(t, da), ka;
          }
          return Br(t), null;
        }
        case ve:
          break;
        case pe:
        case Re: {
          ub(t);
          var $l = t.memoizedState, md = $l !== null;
          if (e !== null) {
            var $v = e.memoizedState, Io = $v !== null;
            Io !== md && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !I && (t.flags |= xo);
          }
          return !md || (t.mode & tt) === Ze ? Br(t) : oa(Ho, Lr) && (Br(t), t.subtreeFlags & (gn | _t) && (t.flags |= xo)), null;
        }
        case lt:
          return null;
        case Qe:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function $D(e, t, a) {
      switch (yS(t), t.tag) {
        case k: {
          var o = t.type;
          Uo(o) && ny(t);
          var u = t.flags;
          return u & fr ? (t.flags = u & ~fr | gt, (t.mode & St) !== Ze && h1(t), t) : null;
        }
        case O: {
          t.stateNode, td(t), pS(t), IS();
          var d = t.flags;
          return (d & fr) !== st && (d & gt) === st ? (t.flags = d & ~fr | gt, t) : null;
        }
        case B:
          return $S(t), null;
        case $: {
          rd(t);
          var v = t.memoizedState;
          if (v !== null && v.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Xf();
          }
          var b = t.flags;
          return b & fr ? (t.flags = b & ~fr | gt, (t.mode & St) !== Ze && h1(t), t) : null;
        }
        case ke:
          return rd(t), null;
        case z:
          return td(t), null;
        case oe:
          var C = t.type._context;
          return AS(C, t), null;
        case pe:
        case Re:
          return ub(t), null;
        case lt:
          return null;
        default:
          return null;
      }
    }
    function WT(e, t, a) {
      switch (yS(t), t.tag) {
        case k: {
          var o = t.type.childContextTypes;
          o != null && ny(t);
          break;
        }
        case O: {
          t.stateNode, td(t), pS(t), IS();
          break;
        }
        case B: {
          $S(t);
          break;
        }
        case z:
          td(t);
          break;
        case $:
          rd(t);
          break;
        case ke:
          rd(t);
          break;
        case oe:
          var u = t.type._context;
          AS(u, t);
          break;
        case pe:
        case Re:
          ub(t);
          break;
      }
    }
    var GT = null;
    GT = /* @__PURE__ */ new Set();
    var Qy = !1, Hr = !1, VD = typeof WeakSet == "function" ? WeakSet : Set, Ge = null, sd = null, cd = null;
    function BD(e) {
      fl(null, function() {
        throw e;
      }), lp();
    }
    var HD = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & St)
        try {
          Vo(), t.componentWillUnmount();
        } finally {
          $o(e);
        }
      else
        t.componentWillUnmount();
    };
    function QT(e, t) {
      try {
        Gu(Er, e);
      } catch (a) {
        Cn(e, t, a);
      }
    }
    function W1(e, t, a) {
      try {
        HD(e, a);
      } catch (o) {
        Cn(e, t, o);
      }
    }
    function ID(e, t, a) {
      try {
        a.componentDidMount();
      } catch (o) {
        Cn(e, t, o);
      }
    }
    function qT(e, t) {
      try {
        XT(e);
      } catch (a) {
        Cn(e, t, a);
      }
    }
    function fd(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var o;
          try {
            if (Ie && ut && e.mode & St)
              try {
                Vo(), o = a(null);
              } finally {
                $o(e);
              }
            else
              o = a(null);
          } catch (u) {
            Cn(e, t, u);
          }
          typeof o == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", wt(e));
        } else
          a.current = null;
    }
    function qy(e, t, a) {
      try {
        a();
      } catch (o) {
        Cn(e, t, o);
      }
    }
    var KT = !1;
    function YD(e, t) {
      rk(e.containerInfo), Ge = t, WD();
      var a = KT;
      return KT = !1, a;
    }
    function WD() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        (e.subtreeFlags & ou) !== st && t !== null ? (t.return = e, Ge = t) : GD();
      }
    }
    function GD() {
      for (; Ge !== null; ) {
        var e = Ge;
        nn(e);
        try {
          QD(e);
        } catch (a) {
          Cn(e, e.return, a);
        }
        Zn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ge = t;
          return;
        }
        Ge = e.return;
      }
    }
    function QD(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Ua) !== st) {
        switch (nn(e), e.tag) {
          case R:
          case X:
          case ce:
            break;
          case k: {
            if (t !== null) {
              var o = t.memoizedProps, u = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !sc && (d.props !== e.memoizedProps && y("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", wt(e) || "instance"), d.state !== e.memoizedState && y("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", wt(e) || "instance"));
              var v = d.getSnapshotBeforeUpdate(e.elementType === e.type ? o : oo(e.type, o), u);
              {
                var b = GT;
                v === void 0 && !b.has(e.type) && (b.add(e.type), y("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", wt(e)));
              }
              d.__reactInternalSnapshotBeforeUpdate = v;
            }
            break;
          }
          case O: {
            {
              var C = e.stateNode;
              kk(C.containerInfo);
            }
            break;
          }
          case B:
          case H:
          case z:
          case _:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Zn();
      }
    }
    function uo(e, t, a) {
      var o = t.updateQueue, u = o !== null ? o.lastEffect : null;
      if (u !== null) {
        var d = u.next, v = d;
        do {
          if ((v.tag & e) === e) {
            var b = v.destroy;
            v.destroy = void 0, b !== void 0 && ((e & Vr) !== Ka ? am(t) : (e & Er) !== Ka && fi(t), (e & Fo) !== Ka && Fv(!0), qy(t, a, b), (e & Fo) !== Ka && Fv(!1), (e & Vr) !== Ka ? Kc() : (e & Er) !== Ka && cu());
          }
          v = v.next;
        } while (v !== d);
      }
    }
    function Gu(e, t) {
      var a = t.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var u = o.next, d = u;
        do {
          if ((d.tag & e) === e) {
            (e & Vr) !== Ka ? _o(t) : (e & Er) !== Ka && im(t);
            var v = d.create;
            (e & Fo) !== Ka && Fv(!0), d.destroy = v(), (e & Fo) !== Ka && Fv(!1), (e & Vr) !== Ka ? qc() : (e & Er) !== Ka && Os();
            {
              var b = d.destroy;
              if (b !== void 0 && typeof b != "function") {
                var C = void 0;
                (d.tag & Er) !== st ? C = "useLayoutEffect" : (d.tag & Fo) !== st ? C = "useInsertionEffect" : C = "useEffect";
                var T = void 0;
                b === null ? T = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof b.then == "function" ? T = `

It looks like you wrote ` + C + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + C + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : T = " You returned: " + b, y("%s must not return anything besides a function, which is used for clean-up.%s", C, T);
              }
            }
          }
          d = d.next;
        } while (d !== u);
      }
    }
    function qD(e, t) {
      if ((t.flags & _t) !== st)
        switch (t.tag) {
          case le: {
            var a = t.stateNode.passiveEffectDuration, o = t.memoizedProps, u = o.id, d = o.onPostCommit, v = dT(), b = t.alternate === null ? "mount" : "update";
            fT() && (b = "nested-update"), typeof d == "function" && d(u, b, a, v);
            var C = t.return;
            e: for (; C !== null; ) {
              switch (C.tag) {
                case O:
                  var T = C.stateNode;
                  T.passiveEffectDuration += a;
                  break e;
                case le:
                  var w = C.stateNode;
                  w.passiveEffectDuration += a;
                  break e;
              }
              C = C.return;
            }
            break;
          }
        }
    }
    function KD(e, t, a, o) {
      if ((a.flags & Mr) !== st)
        switch (a.tag) {
          case R:
          case X:
          case ce: {
            if (!Hr)
              if (a.mode & St)
                try {
                  Vo(), Gu(Er | Cr, a);
                } finally {
                  $o(a);
                }
              else
                Gu(Er | Cr, a);
            break;
          }
          case k: {
            var u = a.stateNode;
            if (a.flags & _t && !Hr)
              if (t === null)
                if (a.type === a.elementType && !sc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", wt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", wt(a) || "instance")), a.mode & St)
                  try {
                    Vo(), u.componentDidMount();
                  } finally {
                    $o(a);
                  }
                else
                  u.componentDidMount();
              else {
                var d = a.elementType === a.type ? t.memoizedProps : oo(a.type, t.memoizedProps), v = t.memoizedState;
                if (a.type === a.elementType && !sc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", wt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", wt(a) || "instance")), a.mode & St)
                  try {
                    Vo(), u.componentDidUpdate(d, v, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    $o(a);
                  }
                else
                  u.componentDidUpdate(d, v, u.__reactInternalSnapshotBeforeUpdate);
              }
            var b = a.updateQueue;
            b !== null && (a.type === a.elementType && !sc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", wt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", wt(a) || "instance")), UE(a, b, u));
            break;
          }
          case O: {
            var C = a.updateQueue;
            if (C !== null) {
              var T = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case B:
                    T = a.child.stateNode;
                    break;
                  case k:
                    T = a.child.stateNode;
                    break;
                }
              UE(a, C, T);
            }
            break;
          }
          case B: {
            var w = a.stateNode;
            if (t === null && a.flags & _t) {
              var j = a.type, U = a.memoizedProps;
              vk(w, j, U);
            }
            break;
          }
          case H:
            break;
          case z:
            break;
          case le: {
            {
              var Z = a.memoizedProps, ee = Z.onCommit, re = Z.onRender, Ue = a.stateNode.effectDuration, ct = dT(), nt = t === null ? "mount" : "update";
              fT() && (nt = "nested-update"), typeof re == "function" && re(a.memoizedProps.id, nt, a.actualDuration, a.treeBaseDuration, a.actualStartTime, ct);
              {
                typeof ee == "function" && ee(a.memoizedProps.id, nt, Ue, ct), GA(a);
                var jt = a.return;
                e: for (; jt !== null; ) {
                  switch (jt.tag) {
                    case O:
                      var Lt = jt.stateNode;
                      Lt.effectDuration += Ue;
                      break e;
                    case le:
                      var G = jt.stateNode;
                      G.effectDuration += Ue;
                      break e;
                  }
                  jt = jt.return;
                }
              }
            }
            break;
          }
          case $: {
            aA(e, a);
            break;
          }
          case ke:
          case _:
          case ve:
          case pe:
          case Re:
          case Qe:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Hr || a.flags & Zr && XT(a);
    }
    function XD(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          if (e.mode & St)
            try {
              Vo(), QT(e, e.return);
            } finally {
              $o(e);
            }
          else
            QT(e, e.return);
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && ID(e, e.return, t), qT(e, e.return);
          break;
        }
        case B: {
          qT(e, e.return);
          break;
        }
      }
    }
    function ZD(e, t) {
      for (var a = null, o = e; ; ) {
        if (o.tag === B) {
          if (a === null) {
            a = o;
            try {
              var u = o.stateNode;
              t ? xk(u) : Rk(o.stateNode, o.memoizedProps);
            } catch (v) {
              Cn(e, e.return, v);
            }
          }
        } else if (o.tag === H) {
          if (a === null)
            try {
              var d = o.stateNode;
              t ? wk(d) : _k(d, o.memoizedProps);
            } catch (v) {
              Cn(e, e.return, v);
            }
        } else if (!((o.tag === pe || o.tag === Re) && o.memoizedState !== null && o !== e)) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === e)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === e)
            return;
          a === o && (a = null), o = o.return;
        }
        a === o && (a = null), o.sibling.return = o.return, o = o.sibling;
      }
    }
    function XT(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, o;
        switch (e.tag) {
          case B:
            o = a;
            break;
          default:
            o = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & St)
            try {
              Vo(), u = t(o);
            } finally {
              $o(e);
            }
          else
            u = t(o);
          typeof u == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", wt(e));
        } else
          t.hasOwnProperty("current") || y("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", wt(e)), t.current = o;
      }
    }
    function JD(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function ZT(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, ZT(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === B) {
          var a = e.stateNode;
          a !== null && iO(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function eA(e) {
      for (var t = e.return; t !== null; ) {
        if (JT(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function JT(e) {
      return e.tag === B || e.tag === O || e.tag === z;
    }
    function ex(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || JT(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== B && t.tag !== H && t.tag !== se; ) {
          if (t.flags & gn || t.child === null || t.tag === z)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & gn))
          return t.stateNode;
      }
    }
    function tA(e) {
      var t = eA(e);
      switch (t.tag) {
        case B: {
          var a = t.stateNode;
          t.flags & qt && (nE(a), t.flags &= ~qt);
          var o = ex(e);
          Q1(e, o, a);
          break;
        }
        case O:
        case z: {
          var u = t.stateNode.containerInfo, d = ex(e);
          G1(e, d, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function G1(e, t, a) {
      var o = e.tag, u = o === B || o === H;
      if (u) {
        var d = e.stateNode;
        t ? bk(a, d, t) : gk(a, d);
      } else if (o !== z) {
        var v = e.child;
        if (v !== null) {
          G1(v, t, a);
          for (var b = v.sibling; b !== null; )
            G1(b, t, a), b = b.sibling;
        }
      }
    }
    function Q1(e, t, a) {
      var o = e.tag, u = o === B || o === H;
      if (u) {
        var d = e.stateNode;
        t ? Sk(a, d, t) : yk(a, d);
      } else if (o !== z) {
        var v = e.child;
        if (v !== null) {
          Q1(v, t, a);
          for (var b = v.sibling; b !== null; )
            Q1(b, t, a), b = b.sibling;
        }
      }
    }
    var Ir = null, so = !1;
    function nA(e, t, a) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case B: {
              Ir = o.stateNode, so = !1;
              break e;
            }
            case O: {
              Ir = o.stateNode.containerInfo, so = !0;
              break e;
            }
            case z: {
              Ir = o.stateNode.containerInfo, so = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Ir === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        tx(e, t, a), Ir = null, so = !1;
      }
      JD(a);
    }
    function Qu(e, t, a) {
      for (var o = a.child; o !== null; )
        tx(e, t, o), o = o.sibling;
    }
    function tx(e, t, a) {
      switch (vl(a), a.tag) {
        case B:
          Hr || fd(a, t);
        case H: {
          {
            var o = Ir, u = so;
            Ir = null, Qu(e, t, a), Ir = o, so = u, Ir !== null && (so ? Ek(Ir, a.stateNode) : Ck(Ir, a.stateNode));
          }
          return;
        }
        case se: {
          Ir !== null && (so ? Tk(Ir, a.stateNode) : iS(Ir, a.stateNode));
          return;
        }
        case z: {
          {
            var d = Ir, v = so;
            Ir = a.stateNode.containerInfo, so = !0, Qu(e, t, a), Ir = d, so = v;
          }
          return;
        }
        case R:
        case X:
        case be:
        case ce: {
          if (!Hr) {
            var b = a.updateQueue;
            if (b !== null) {
              var C = b.lastEffect;
              if (C !== null) {
                var T = C.next, w = T;
                do {
                  var j = w, U = j.destroy, Z = j.tag;
                  U !== void 0 && ((Z & Fo) !== Ka ? qy(a, t, U) : (Z & Er) !== Ka && (fi(a), a.mode & St ? (Vo(), qy(a, t, U), $o(a)) : qy(a, t, U), cu())), w = w.next;
                } while (w !== T);
              }
            }
          }
          Qu(e, t, a);
          return;
        }
        case k: {
          if (!Hr) {
            fd(a, t);
            var ee = a.stateNode;
            typeof ee.componentWillUnmount == "function" && W1(a, t, ee);
          }
          Qu(e, t, a);
          return;
        }
        case ve: {
          Qu(e, t, a);
          return;
        }
        case pe: {
          if (
            // TODO: Remove this dead flag
            a.mode & tt
          ) {
            var re = Hr;
            Hr = re || a.memoizedState !== null, Qu(e, t, a), Hr = re;
          } else
            Qu(e, t, a);
          break;
        }
        default: {
          Qu(e, t, a);
          return;
        }
      }
    }
    function rA(e) {
      e.memoizedState;
    }
    function aA(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var o = t.alternate;
        if (o !== null) {
          var u = o.memoizedState;
          if (u !== null) {
            var d = u.dehydrated;
            d !== null && Bk(d);
          }
        }
      }
    }
    function nx(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new VD()), t.forEach(function(o) {
          var u = eM.bind(null, e, o);
          if (!a.has(o)) {
            if (a.add(o), Ca)
              if (sd !== null && cd !== null)
                Uv(cd, sd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(u, u);
          }
        });
      }
    }
    function iA(e, t, a) {
      sd = a, cd = e, nn(t), rx(t, e), nn(t), sd = null, cd = null;
    }
    function co(e, t, a) {
      var o = t.deletions;
      if (o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u];
          try {
            nA(e, t, d);
          } catch (C) {
            Cn(d, t, C);
          }
        }
      var v = o0();
      if (t.subtreeFlags & ta)
        for (var b = t.child; b !== null; )
          nn(b), rx(b, e), b = b.sibling;
      nn(v);
    }
    function rx(e, t, a) {
      var o = e.alternate, u = e.flags;
      switch (e.tag) {
        case R:
        case X:
        case be:
        case ce: {
          if (co(t, e), Bo(e), u & _t) {
            try {
              uo(Fo | Cr, e, e.return), Gu(Fo | Cr, e);
            } catch (yt) {
              Cn(e, e.return, yt);
            }
            if (e.mode & St) {
              try {
                Vo(), uo(Er | Cr, e, e.return);
              } catch (yt) {
                Cn(e, e.return, yt);
              }
              $o(e);
            } else
              try {
                uo(Er | Cr, e, e.return);
              } catch (yt) {
                Cn(e, e.return, yt);
              }
          }
          return;
        }
        case k: {
          co(t, e), Bo(e), u & Zr && o !== null && fd(o, o.return);
          return;
        }
        case B: {
          co(t, e), Bo(e), u & Zr && o !== null && fd(o, o.return);
          {
            if (e.flags & qt) {
              var d = e.stateNode;
              try {
                nE(d);
              } catch (yt) {
                Cn(e, e.return, yt);
              }
            }
            if (u & _t) {
              var v = e.stateNode;
              if (v != null) {
                var b = e.memoizedProps, C = o !== null ? o.memoizedProps : b, T = e.type, w = e.updateQueue;
                if (e.updateQueue = null, w !== null)
                  try {
                    hk(v, w, T, C, b, e);
                  } catch (yt) {
                    Cn(e, e.return, yt);
                  }
              }
            }
          }
          return;
        }
        case H: {
          if (co(t, e), Bo(e), u & _t) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var j = e.stateNode, U = e.memoizedProps, Z = o !== null ? o.memoizedProps : U;
            try {
              mk(j, Z, U);
            } catch (yt) {
              Cn(e, e.return, yt);
            }
          }
          return;
        }
        case O: {
          if (co(t, e), Bo(e), u & _t && o !== null) {
            var ee = o.memoizedState;
            if (ee.isDehydrated)
              try {
                Vk(t.containerInfo);
              } catch (yt) {
                Cn(e, e.return, yt);
              }
          }
          return;
        }
        case z: {
          co(t, e), Bo(e);
          return;
        }
        case $: {
          co(t, e), Bo(e);
          var re = e.child;
          if (re.flags & xo) {
            var Ue = re.stateNode, ct = re.memoizedState, nt = ct !== null;
            if (Ue.isHidden = nt, nt) {
              var jt = re.alternate !== null && re.alternate.memoizedState !== null;
              jt || jA();
            }
          }
          if (u & _t) {
            try {
              rA(e);
            } catch (yt) {
              Cn(e, e.return, yt);
            }
            nx(e);
          }
          return;
        }
        case pe: {
          var Lt = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & tt
          ) {
            var G = Hr;
            Hr = G || Lt, co(t, e), Hr = G;
          } else
            co(t, e);
          if (Bo(e), u & xo) {
            var ae = e.stateNode, Q = e.memoizedState, Ee = Q !== null, Be = e;
            if (ae.isHidden = Ee, Ee && !Lt && (Be.mode & tt) !== Ze) {
              Ge = Be;
              for (var Fe = Be.child; Fe !== null; )
                Ge = Fe, lA(Fe), Fe = Fe.sibling;
            }
            ZD(Be, Ee);
          }
          return;
        }
        case ke: {
          co(t, e), Bo(e), u & _t && nx(e);
          return;
        }
        case ve:
          return;
        default: {
          co(t, e), Bo(e);
          return;
        }
      }
    }
    function Bo(e) {
      var t = e.flags;
      if (t & gn) {
        try {
          tA(e);
        } catch (a) {
          Cn(e, e.return, a);
        }
        e.flags &= ~gn;
      }
      t & Fa && (e.flags &= ~Fa);
    }
    function oA(e, t, a) {
      sd = a, cd = t, Ge = e, ax(e, t, a), sd = null, cd = null;
    }
    function ax(e, t, a) {
      for (var o = (e.mode & tt) !== Ze; Ge !== null; ) {
        var u = Ge, d = u.child;
        if (u.tag === pe && o) {
          var v = u.memoizedState !== null, b = v || Qy;
          if (b) {
            q1(e, t, a);
            continue;
          } else {
            var C = u.alternate, T = C !== null && C.memoizedState !== null, w = T || Hr, j = Qy, U = Hr;
            Qy = b, Hr = w, Hr && !U && (Ge = u, uA(u));
            for (var Z = d; Z !== null; )
              Ge = Z, ax(
                Z,
                // New root; bubble back up to here and stop.
                t,
                a
              ), Z = Z.sibling;
            Ge = u, Qy = j, Hr = U, q1(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Mr) !== st && d !== null ? (d.return = u, Ge = d) : q1(e, t, a);
      }
    }
    function q1(e, t, a) {
      for (; Ge !== null; ) {
        var o = Ge;
        if ((o.flags & Mr) !== st) {
          var u = o.alternate;
          nn(o);
          try {
            KD(t, u, o, a);
          } catch (v) {
            Cn(o, o.return, v);
          }
          Zn();
        }
        if (o === e) {
          Ge = null;
          return;
        }
        var d = o.sibling;
        if (d !== null) {
          d.return = o.return, Ge = d;
          return;
        }
        Ge = o.return;
      }
    }
    function lA(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        switch (t.tag) {
          case R:
          case X:
          case be:
          case ce: {
            if (t.mode & St)
              try {
                Vo(), uo(Er, t, t.return);
              } finally {
                $o(t);
              }
            else
              uo(Er, t, t.return);
            break;
          }
          case k: {
            fd(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && W1(t, t.return, o);
            break;
          }
          case B: {
            fd(t, t.return);
            break;
          }
          case pe: {
            var u = t.memoizedState !== null;
            if (u) {
              ix(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ge = a) : ix(e);
      }
    }
    function ix(e) {
      for (; Ge !== null; ) {
        var t = Ge;
        if (t === e) {
          Ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ge = a;
          return;
        }
        Ge = t.return;
      }
    }
    function uA(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        if (t.tag === pe) {
          var o = t.memoizedState !== null;
          if (o) {
            ox(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ge = a) : ox(e);
      }
    }
    function ox(e) {
      for (; Ge !== null; ) {
        var t = Ge;
        nn(t);
        try {
          XD(t);
        } catch (o) {
          Cn(t, t.return, o);
        }
        if (Zn(), t === e) {
          Ge = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ge = a;
          return;
        }
        Ge = t.return;
      }
    }
    function sA(e, t, a, o) {
      Ge = t, cA(t, e, a, o);
    }
    function cA(e, t, a, o) {
      for (; Ge !== null; ) {
        var u = Ge, d = u.child;
        (u.subtreeFlags & Pa) !== st && d !== null ? (d.return = u, Ge = d) : fA(e, t, a, o);
      }
    }
    function fA(e, t, a, o) {
      for (; Ge !== null; ) {
        var u = Ge;
        if ((u.flags & wn) !== st) {
          nn(u);
          try {
            dA(t, u, a, o);
          } catch (v) {
            Cn(u, u.return, v);
          }
          Zn();
        }
        if (u === e) {
          Ge = null;
          return;
        }
        var d = u.sibling;
        if (d !== null) {
          d.return = u.return, Ge = d;
          return;
        }
        Ge = u.return;
      }
    }
    function dA(e, t, a, o) {
      switch (t.tag) {
        case R:
        case X:
        case ce: {
          if (t.mode & St) {
            v1();
            try {
              Gu(Vr | Cr, t);
            } finally {
              p1(t);
            }
          } else
            Gu(Vr | Cr, t);
          break;
        }
      }
    }
    function pA(e) {
      Ge = e, vA();
    }
    function vA() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        if ((Ge.flags & Gt) !== st) {
          var a = e.deletions;
          if (a !== null) {
            for (var o = 0; o < a.length; o++) {
              var u = a[o];
              Ge = u, yA(u, e);
            }
            {
              var d = e.alternate;
              if (d !== null) {
                var v = d.child;
                if (v !== null) {
                  d.child = null;
                  do {
                    var b = v.sibling;
                    v.sibling = null, v = b;
                  } while (v !== null);
                }
              }
            }
            Ge = e;
          }
        }
        (e.subtreeFlags & Pa) !== st && t !== null ? (t.return = e, Ge = t) : hA();
      }
    }
    function hA() {
      for (; Ge !== null; ) {
        var e = Ge;
        (e.flags & wn) !== st && (nn(e), mA(e), Zn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ge = t;
          return;
        }
        Ge = e.return;
      }
    }
    function mA(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          e.mode & St ? (v1(), uo(Vr | Cr, e, e.return), p1(e)) : uo(Vr | Cr, e, e.return);
          break;
        }
      }
    }
    function yA(e, t) {
      for (; Ge !== null; ) {
        var a = Ge;
        nn(a), SA(a, t), Zn();
        var o = a.child;
        o !== null ? (o.return = a, Ge = o) : gA(e);
      }
    }
    function gA(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.sibling, o = t.return;
        if (ZT(t), t === e) {
          Ge = null;
          return;
        }
        if (a !== null) {
          a.return = o, Ge = a;
          return;
        }
        Ge = o;
      }
    }
    function SA(e, t) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          e.mode & St ? (v1(), uo(Vr, e, t), p1(e)) : uo(Vr, e, t);
          break;
        }
      }
    }
    function bA(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          try {
            Gu(Er | Cr, e);
          } catch (a) {
            Cn(e, e.return, a);
          }
          break;
        }
        case k: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Cn(e, e.return, a);
          }
          break;
        }
      }
    }
    function CA(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          try {
            Gu(Vr | Cr, e);
          } catch (t) {
            Cn(e, e.return, t);
          }
          break;
        }
      }
    }
    function EA(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce: {
          try {
            uo(Er | Cr, e, e.return);
          } catch (a) {
            Cn(e, e.return, a);
          }
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && W1(e, e.return, t);
          break;
        }
      }
    }
    function TA(e) {
      switch (e.tag) {
        case R:
        case X:
        case ce:
          try {
            uo(Vr | Cr, e, e.return);
          } catch (t) {
            Cn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var wv = Symbol.for;
      wv("selector.component"), wv("selector.has_pseudo_class"), wv("selector.role"), wv("selector.test_id"), wv("selector.text");
    }
    var xA = [];
    function wA() {
      xA.forEach(function(e) {
        return e();
      });
    }
    var RA = f.ReactCurrentActQueue;
    function _A(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function lx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && RA.current !== null && y("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var kA = Math.ceil, K1 = f.ReactCurrentDispatcher, X1 = f.ReactCurrentOwner, Yr = f.ReactCurrentBatchConfig, fo = f.ReactCurrentActQueue, wr = (
      /*             */
      0
    ), ux = (
      /*               */
      1
    ), Wr = (
      /*                */
      2
    ), Li = (
      /*                */
      4
    ), Ul = 0, Rv = 1, cc = 2, Ky = 3, _v = 4, sx = 5, Z1 = 6, Pt = wr, wa = null, In = null, Rr = he, Ho = he, J1 = Pu(he), _r = Ul, kv = null, Xy = he, Ov = he, Zy = he, Dv = null, Xa = null, eb = 0, cx = 500, fx = 1 / 0, OA = 500, Fl = null;
    function Av() {
      fx = On() + OA;
    }
    function dx() {
      return fx;
    }
    var Jy = !1, tb = null, dd = null, fc = !1, qu = null, Mv = he, nb = [], rb = null, DA = 50, Nv = 0, ab = null, ib = !1, eg = !1, AA = 50, pd = 0, tg = null, Lv = hn, ng = he, px = !1;
    function rg() {
      return wa;
    }
    function Ra() {
      return (Pt & (Wr | Li)) !== wr ? On() : (Lv !== hn || (Lv = On()), Lv);
    }
    function Ku(e) {
      var t = e.mode;
      if ((t & tt) === Ze)
        return ot;
      if ((Pt & Wr) !== wr && Rr !== he)
        return Su(Rr);
      var a = RO() !== wO;
      if (a) {
        if (Yr.transition !== null) {
          var o = Yr.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return ng === Qn && (ng = hm()), ng;
      }
      var u = Ha();
      if (u !== Qn)
        return u;
      var d = ck();
      return d;
    }
    function MA(e) {
      var t = e.mode;
      return (t & tt) === Ze ? ot : ia();
    }
    function kr(e, t, a, o) {
      nM(), px && y("useInsertionEffect must not schedule updates."), ib && (eg = !0), El(e, a, o), (Pt & Wr) !== he && e === wa ? iM(t) : (Ca && bf(e, t, a), oM(t), e === wa && ((Pt & Wr) === wr && (Ov = Rt(Ov, a)), _r === _v && Xu(e, Rr)), Za(e, o), a === ot && Pt === wr && (t.mode & tt) === Ze && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !fo.isBatchingLegacy && (Av(), pE()));
    }
    function NA(e, t, a) {
      var o = e.current;
      o.lanes = t, El(e, t, a), Za(e, a);
    }
    function LA(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Pt & Wr) !== wr
      );
    }
    function Za(e, t) {
      var a = e.callbackNode;
      cm(e, t);
      var o = bl(e, e === wa ? Rr : he);
      if (o === he) {
        a !== null && Ox(a), e.callbackNode = null, e.callbackPriority = Qn;
        return;
      }
      var u = Vn(o), d = e.callbackPriority;
      if (d === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(fo.current !== null && a !== db)) {
        a == null && d !== ot && y("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Ox(a);
      var v;
      if (u === ot)
        e.tag === ju ? (fo.isBatchingLegacy !== null && (fo.didScheduleLegacyUpdate = !0), uO(mx.bind(null, e))) : dE(mx.bind(null, e)), fo.current !== null ? fo.current.push($u) : dk(function() {
          (Pt & (Wr | Li)) === wr && $u();
        }), v = null;
      else {
        var b;
        switch (br(o)) {
          case Bn:
            b = Wc;
            break;
          case Xi:
            b = pl;
            break;
          case wi:
            b = xi;
            break;
          case bu:
            b = Gc;
            break;
          default:
            b = xi;
            break;
        }
        v = pb(b, vx.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = v;
    }
    function vx(e, t) {
      if (ZO(), Lv = hn, ng = he, (Pt & (Wr | Li)) !== wr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, o = jl();
      if (o && e.callbackNode !== a)
        return null;
      var u = bl(e, e === wa ? Rr : he);
      if (u === he)
        return null;
      var d = !Fs(e, u) && !vm(e, u) && !t, v = d ? IA(e, u) : ig(e, u);
      if (v !== Ul) {
        if (v === cc) {
          var b = Oo(e);
          b !== he && (u = b, v = ob(e, b));
        }
        if (v === Rv) {
          var C = kv;
          throw dc(e, he), Xu(e, u), Za(e, On()), C;
        }
        if (v === Z1)
          Xu(e, u);
        else {
          var T = !Fs(e, u), w = e.current.alternate;
          if (T && !UA(w)) {
            if (v = ig(e, u), v === cc) {
              var j = Oo(e);
              j !== he && (u = j, v = ob(e, j));
            }
            if (v === Rv) {
              var U = kv;
              throw dc(e, he), Xu(e, u), Za(e, On()), U;
            }
          }
          e.finishedWork = w, e.finishedLanes = u, zA(e, v, u);
        }
      }
      return Za(e, On()), e.callbackNode === a ? vx.bind(null, e) : null;
    }
    function ob(e, t) {
      var a = Dv;
      if (Cf(e)) {
        var o = dc(e, t);
        o.flags |= Ln, tO(e.containerInfo);
      }
      var u = ig(e, t);
      if (u !== cc) {
        var d = Xa;
        Xa = a, d !== null && hx(d);
      }
      return u;
    }
    function hx(e) {
      Xa === null ? Xa = e : Xa.push.apply(Xa, e);
    }
    function zA(e, t, a) {
      switch (t) {
        case Ul:
        case Rv:
          throw new Error("Root did not complete. This is a bug in React.");
        case cc: {
          pc(e, Xa, Fl);
          break;
        }
        case Ky: {
          if (Xu(e, a), fm(a) && // do not delay if we're inside an act() scope
          !Dx()) {
            var o = eb + cx - On();
            if (o > 10) {
              var u = bl(e, he);
              if (u !== he)
                break;
              var d = e.suspendedLanes;
              if (!Cl(d, a)) {
                Ra(), gf(e, d);
                break;
              }
              e.timeoutHandle = rS(pc.bind(null, e, Xa, Fl), o);
              break;
            }
          }
          pc(e, Xa, Fl);
          break;
        }
        case _v: {
          if (Xu(e, a), pm(a))
            break;
          if (!Dx()) {
            var v = um(e, a), b = v, C = On() - b, T = tM(C) - C;
            if (T > 10) {
              e.timeoutHandle = rS(pc.bind(null, e, Xa, Fl), T);
              break;
            }
          }
          pc(e, Xa, Fl);
          break;
        }
        case sx: {
          pc(e, Xa, Fl);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function UA(e) {
      for (var t = e; ; ) {
        if (t.flags & _s) {
          var a = t.updateQueue;
          if (a !== null) {
            var o = a.stores;
            if (o !== null)
              for (var u = 0; u < o.length; u++) {
                var d = o[u], v = d.getSnapshot, b = d.value;
                try {
                  if (!We(v(), b))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var C = t.child;
        if (t.subtreeFlags & _s && C !== null) {
          C.return = t, t = C;
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
    function Xu(e, t) {
      t = Ps(t, Zy), t = Ps(t, Ov), ym(e, t);
    }
    function mx(e) {
      if (JO(), (Pt & (Wr | Li)) !== wr)
        throw new Error("Should not already be working.");
      jl();
      var t = bl(e, he);
      if (!oa(t, ot))
        return Za(e, On()), null;
      var a = ig(e, t);
      if (e.tag !== ju && a === cc) {
        var o = Oo(e);
        o !== he && (t = o, a = ob(e, o));
      }
      if (a === Rv) {
        var u = kv;
        throw dc(e, he), Xu(e, t), Za(e, On()), u;
      }
      if (a === Z1)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, pc(e, Xa, Fl), Za(e, On()), null;
    }
    function FA(e, t) {
      t !== he && (xp(e, Rt(t, ot)), Za(e, On()), (Pt & (Wr | Li)) === wr && (Av(), $u()));
    }
    function lb(e, t) {
      var a = Pt;
      Pt |= ux;
      try {
        return e(t);
      } finally {
        Pt = a, Pt === wr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !fo.isBatchingLegacy && (Av(), pE());
      }
    }
    function PA(e, t, a, o, u) {
      var d = Ha(), v = Yr.transition;
      try {
        return Yr.transition = null, zn(Bn), e(t, a, o, u);
      } finally {
        zn(d), Yr.transition = v, Pt === wr && Av();
      }
    }
    function Pl(e) {
      qu !== null && qu.tag === ju && (Pt & (Wr | Li)) === wr && jl();
      var t = Pt;
      Pt |= ux;
      var a = Yr.transition, o = Ha();
      try {
        return Yr.transition = null, zn(Bn), e ? e() : void 0;
      } finally {
        zn(o), Yr.transition = a, Pt = t, (Pt & (Wr | Li)) === wr && $u();
      }
    }
    function yx() {
      return (Pt & (Wr | Li)) !== wr;
    }
    function ag(e, t) {
      sa(J1, Ho, e), Ho = Rt(Ho, t);
    }
    function ub(e) {
      Ho = J1.current, ua(J1, e);
    }
    function dc(e, t) {
      e.finishedWork = null, e.finishedLanes = he;
      var a = e.timeoutHandle;
      if (a !== aS && (e.timeoutHandle = aS, fk(a)), In !== null)
        for (var o = In.return; o !== null; ) {
          var u = o.alternate;
          WT(u, o), o = o.return;
        }
      wa = e;
      var d = vc(e.current, null);
      return In = d, Rr = Ho = t, _r = Ul, kv = null, Xy = he, Ov = he, Zy = he, Dv = null, Xa = null, NO(), ro.discardPendingWarnings(), d;
    }
    function gx(e, t) {
      do {
        var a = In;
        try {
          if (vy(), BE(), Zn(), X1.current = null, a === null || a.return === null) {
            _r = Rv, kv = t, In = null;
            return;
          }
          if (Ie && a.mode & St && Hy(a, !0), ht)
            if (ra(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              hl(a, o, Rr);
            } else
              Ds(a, t, Rr);
          uD(e, a.return, a, t, Rr), Ex(a);
        } catch (u) {
          t = u, In === a && a !== null ? (a = a.return, In = a) : a = In;
          continue;
        }
        return;
      } while (!0);
    }
    function Sx() {
      var e = K1.current;
      return K1.current = Py, e === null ? Py : e;
    }
    function bx(e) {
      K1.current = e;
    }
    function jA() {
      eb = On();
    }
    function zv(e) {
      Xy = Rt(e, Xy);
    }
    function $A() {
      _r === Ul && (_r = Ky);
    }
    function sb() {
      (_r === Ul || _r === Ky || _r === cc) && (_r = _v), wa !== null && (Us(Xy) || Us(Ov)) && Xu(wa, Rr);
    }
    function VA(e) {
      _r !== _v && (_r = cc), Dv === null ? Dv = [e] : Dv.push(e);
    }
    function BA() {
      return _r === Ul;
    }
    function ig(e, t) {
      var a = Pt;
      Pt |= Wr;
      var o = Sx();
      if (wa !== e || Rr !== t) {
        if (Ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Uv(e, Rr), u.clear()), wp(e, t);
        }
        Fl = $s(), dc(e, t);
      }
      Rn(t);
      do
        try {
          HA();
          break;
        } catch (d) {
          gx(e, d);
        }
      while (!0);
      if (vy(), Pt = a, bx(o), In !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Zc(), wa = null, Rr = he, _r;
    }
    function HA() {
      for (; In !== null; )
        Cx(In);
    }
    function IA(e, t) {
      var a = Pt;
      Pt |= Wr;
      var o = Sx();
      if (wa !== e || Rr !== t) {
        if (Ca) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Uv(e, Rr), u.clear()), wp(e, t);
        }
        Fl = $s(), Av(), dc(e, t);
      }
      Rn(t);
      do
        try {
          YA();
          break;
        } catch (d) {
          gx(e, d);
        }
      while (!0);
      return vy(), bx(o), Pt = a, In !== null ? (Xc(), Ul) : (Zc(), wa = null, Rr = he, _r);
    }
    function YA() {
      for (; In !== null && !Yc(); )
        Cx(In);
    }
    function Cx(e) {
      var t = e.alternate;
      nn(e);
      var a;
      (e.mode & St) !== Ze ? (d1(e), a = cb(t, e, Ho), Hy(e, !0)) : a = cb(t, e, Ho), Zn(), e.memoizedProps = e.pendingProps, a === null ? Ex(e) : In = a, X1.current = null;
    }
    function Ex(e) {
      var t = e;
      do {
        var a = t.alternate, o = t.return;
        if ((t.flags & ga) === st) {
          nn(t);
          var u = void 0;
          if ((t.mode & St) === Ze ? u = YT(a, t, Ho) : (d1(t), u = YT(a, t, Ho), Hy(t, !1)), Zn(), u !== null) {
            In = u;
            return;
          }
        } else {
          var d = $D(a, t);
          if (d !== null) {
            d.flags &= Xh, In = d;
            return;
          }
          if ((t.mode & St) !== Ze) {
            Hy(t, !1);
            for (var v = t.actualDuration, b = t.child; b !== null; )
              v += b.actualDuration, b = b.sibling;
            t.actualDuration = v;
          }
          if (o !== null)
            o.flags |= ga, o.subtreeFlags = st, o.deletions = null;
          else {
            _r = Z1, In = null;
            return;
          }
        }
        var C = t.sibling;
        if (C !== null) {
          In = C;
          return;
        }
        t = o, In = t;
      } while (t !== null);
      _r === Ul && (_r = sx);
    }
    function pc(e, t, a) {
      var o = Ha(), u = Yr.transition;
      try {
        Yr.transition = null, zn(Bn), WA(e, t, a, o);
      } finally {
        Yr.transition = u, zn(o);
      }
      return null;
    }
    function WA(e, t, a, o) {
      do
        jl();
      while (qu !== null);
      if (rM(), (Pt & (Wr | Li)) !== wr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, d = e.finishedLanes;
      if (Ro(d), u === null)
        return Qc(), null;
      if (d === he && y("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = he, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Qn;
      var v = Rt(u.lanes, u.childLanes);
      Sf(e, v), e === wa && (wa = null, In = null, Rr = he), ((u.subtreeFlags & Pa) !== st || (u.flags & Pa) !== st) && (fc || (fc = !0, rb = a, pb(xi, function() {
        return jl(), null;
      })));
      var b = (u.subtreeFlags & (ou | ta | Mr | Pa)) !== st, C = (u.flags & (ou | ta | Mr | Pa)) !== st;
      if (b || C) {
        var T = Yr.transition;
        Yr.transition = null;
        var w = Ha();
        zn(Bn);
        var j = Pt;
        Pt |= Li, X1.current = null, YD(e, u), pT(), iA(e, u, d), ak(e.containerInfo), e.current = u, mp(d), oA(u, e, d), fu(), em(), Pt = j, zn(w), Yr.transition = T;
      } else
        e.current = u, pT();
      var U = fc;
      if (fc ? (fc = !1, qu = e, Mv = d) : (pd = 0, tg = null), v = e.pendingLanes, v === he && (dd = null), U || Rx(e.current, !1), uu(u.stateNode, o), Ca && e.memoizedUpdaters.clear(), wA(), Za(e, On()), t !== null)
        for (var Z = e.onRecoverableError, ee = 0; ee < t.length; ee++) {
          var re = t[ee], Ue = re.stack, ct = re.digest;
          Z(re.value, {
            componentStack: Ue,
            digest: ct
          });
        }
      if (Jy) {
        Jy = !1;
        var nt = tb;
        throw tb = null, nt;
      }
      return oa(Mv, ot) && e.tag !== ju && jl(), v = e.pendingLanes, oa(v, ot) ? (XO(), e === ab ? Nv++ : (Nv = 0, ab = e)) : Nv = 0, $u(), Qc(), null;
    }
    function jl() {
      if (qu !== null) {
        var e = br(Mv), t = k0(wi, e), a = Yr.transition, o = Ha();
        try {
          return Yr.transition = null, zn(t), QA();
        } finally {
          zn(o), Yr.transition = a;
        }
      }
      return !1;
    }
    function GA(e) {
      nb.push(e), fc || (fc = !0, pb(xi, function() {
        return jl(), null;
      }));
    }
    function QA() {
      if (qu === null)
        return !1;
      var e = rb;
      rb = null;
      var t = qu, a = Mv;
      if (qu = null, Mv = he, (Pt & (Wr | Li)) !== wr)
        throw new Error("Cannot flush passive effects while already rendering.");
      ib = !0, eg = !1, om(a);
      var o = Pt;
      Pt |= Li, pA(t.current), sA(t, t.current, a, e);
      {
        var u = nb;
        nb = [];
        for (var d = 0; d < u.length; d++) {
          var v = u[d];
          qD(t, v);
        }
      }
      yp(), Rx(t.current, !0), Pt = o, $u(), eg ? t === tg ? pd++ : (pd = 0, tg = t) : pd = 0, ib = !1, eg = !1, Va(t);
      {
        var b = t.current.stateNode;
        b.effectDuration = 0, b.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Tx(e) {
      return dd !== null && dd.has(e);
    }
    function qA(e) {
      dd === null ? dd = /* @__PURE__ */ new Set([e]) : dd.add(e);
    }
    function KA(e) {
      Jy || (Jy = !0, tb = e);
    }
    var XA = KA;
    function xx(e, t, a) {
      var o = uc(a, t), u = CT(e, o, ot), d = Bu(e, u, ot), v = Ra();
      d !== null && (El(d, ot, v), Za(d, v));
    }
    function Cn(e, t, a) {
      if (BD(a), Fv(!1), e.tag === O) {
        xx(e, e, a);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === O) {
          xx(o, e, a);
          return;
        } else if (o.tag === k) {
          var u = o.type, d = o.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && !Tx(d)) {
            var v = uc(a, e), b = D1(o, v, ot), C = Bu(o, b, ot), T = Ra();
            C !== null && (El(C, ot, T), Za(C, T));
            return;
          }
        }
        o = o.return;
      }
      y(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function ZA(e, t, a) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var u = Ra();
      gf(e, a), lM(e), wa === e && Cl(Rr, a) && (_r === _v || _r === Ky && fm(Rr) && On() - eb < cx ? dc(e, he) : Zy = Rt(Zy, a)), Za(e, u);
    }
    function wx(e, t) {
      t === Qn && (t = MA(e));
      var a = Ra(), o = qa(e, t);
      o !== null && (El(o, t, a), Za(o, a));
    }
    function JA(e) {
      var t = e.memoizedState, a = Qn;
      t !== null && (a = t.retryLane), wx(e, a);
    }
    function eM(e, t) {
      var a = Qn, o;
      switch (e.tag) {
        case $:
          o = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case ke:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(t), wx(e, a);
    }
    function tM(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : kA(e / 1960) * 1960;
    }
    function nM() {
      if (Nv > DA)
        throw Nv = 0, ab = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      pd > AA && (pd = 0, tg = null, y("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function rM() {
      ro.flushLegacyContextWarning(), ro.flushPendingUnsafeLifecycleWarnings();
    }
    function Rx(e, t) {
      nn(e), og(e, ea, EA), t && og(e, dl, TA), og(e, ea, bA), t && og(e, dl, CA), Zn();
    }
    function og(e, t, a) {
      for (var o = e, u = null; o !== null; ) {
        var d = o.subtreeFlags & t;
        o !== u && o.child !== null && d !== st ? o = o.child : ((o.flags & t) !== st && a(o), o.sibling !== null ? o = o.sibling : o = u = o.return);
      }
    }
    var lg = null;
    function _x(e) {
      {
        if ((Pt & Wr) !== wr || !(e.mode & tt))
          return;
        var t = e.tag;
        if (t !== N && t !== O && t !== k && t !== R && t !== X && t !== be && t !== ce)
          return;
        var a = wt(e) || "ReactComponent";
        if (lg !== null) {
          if (lg.has(a))
            return;
          lg.add(a);
        } else
          lg = /* @__PURE__ */ new Set([a]);
        var o = Yn;
        try {
          nn(e), y("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? nn(e) : Zn();
        }
      }
    }
    var cb;
    {
      var aM = null;
      cb = function(e, t, a) {
        var o = zx(aM, t);
        try {
          return $T(e, t, a);
        } catch (d) {
          if (mO() || d !== null && typeof d == "object" && typeof d.then == "function")
            throw d;
          if (vy(), BE(), WT(e, t), zx(t, o), t.mode & St && d1(t), fl(null, $T, null, e, t, a), T0()) {
            var u = lp();
            typeof u == "object" && u !== null && u._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var kx = !1, fb;
    fb = /* @__PURE__ */ new Set();
    function iM(e) {
      if (Ma && !QO())
        switch (e.tag) {
          case R:
          case X:
          case ce: {
            var t = In && wt(In) || "Unknown", a = t;
            if (!fb.has(a)) {
              fb.add(a);
              var o = wt(e) || "Unknown";
              y("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case k: {
            kx || (y("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), kx = !0);
            break;
          }
        }
    }
    function Uv(e, t) {
      if (Ca) {
        var a = e.memoizedUpdaters;
        a.forEach(function(o) {
          bf(e, o, t);
        });
      }
    }
    var db = {};
    function pb(e, t) {
      {
        var a = fo.current;
        return a !== null ? (a.push(t), db) : Ic(e, t);
      }
    }
    function Ox(e) {
      if (e !== db)
        return Jh(e);
    }
    function Dx() {
      return fo.current !== null;
    }
    function oM(e) {
      {
        if (e.mode & tt) {
          if (!lx())
            return;
        } else if (!_A() || Pt !== wr || e.tag !== R && e.tag !== X && e.tag !== ce)
          return;
        if (fo.current === null) {
          var t = Yn;
          try {
            nn(e), y(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, wt(e));
          } finally {
            t ? nn(e) : Zn();
          }
        }
      }
    }
    function lM(e) {
      e.tag !== ju && lx() && fo.current === null && y(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Fv(e) {
      px = e;
    }
    var zi = null, vd = null, uM = function(e) {
      zi = e;
    };
    function hd(e) {
      {
        if (zi === null)
          return e;
        var t = zi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function vb(e) {
      return hd(e);
    }
    function hb(e) {
      {
        if (zi === null)
          return e;
        var t = zi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = hd(e.render);
            if (e.render !== a) {
              var o = {
                $$typeof: De,
                render: a
              };
              return e.displayName !== void 0 && (o.displayName = e.displayName), o;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function Ax(e, t) {
      {
        if (zi === null)
          return !1;
        var a = e.elementType, o = t.type, u = !1, d = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case k: {
            typeof o == "function" && (u = !0);
            break;
          }
          case R: {
            (typeof o == "function" || d === vt) && (u = !0);
            break;
          }
          case X: {
            (d === De || d === vt) && (u = !0);
            break;
          }
          case be:
          case ce: {
            (d === Vt || d === vt) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var v = zi(a);
          if (v !== void 0 && v === zi(o))
            return !0;
        }
        return !1;
      }
    }
    function Mx(e) {
      {
        if (zi === null || typeof WeakSet != "function")
          return;
        vd === null && (vd = /* @__PURE__ */ new WeakSet()), vd.add(e);
      }
    }
    var sM = function(e, t) {
      {
        if (zi === null)
          return;
        var a = t.staleFamilies, o = t.updatedFamilies;
        jl(), Pl(function() {
          mb(e.current, o, a);
        });
      }
    }, cM = function(e, t) {
      {
        if (e.context !== di)
          return;
        jl(), Pl(function() {
          Pv(t, e, null, null);
        });
      }
    };
    function mb(e, t, a) {
      {
        var o = e.alternate, u = e.child, d = e.sibling, v = e.tag, b = e.type, C = null;
        switch (v) {
          case R:
          case ce:
          case k:
            C = b;
            break;
          case X:
            C = b.render;
            break;
        }
        if (zi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var T = !1, w = !1;
        if (C !== null) {
          var j = zi(C);
          j !== void 0 && (a.has(j) ? w = !0 : t.has(j) && (v === k ? w = !0 : T = !0));
        }
        if (vd !== null && (vd.has(e) || o !== null && vd.has(o)) && (w = !0), w && (e._debugNeedsRemount = !0), w || T) {
          var U = qa(e, ot);
          U !== null && kr(U, e, ot, hn);
        }
        u !== null && !w && mb(u, t, a), d !== null && mb(d, t, a);
      }
    }
    var fM = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), o = new Set(t.map(function(u) {
          return u.current;
        }));
        return yb(e.current, o, a), a;
      }
    };
    function yb(e, t, a) {
      {
        var o = e.child, u = e.sibling, d = e.tag, v = e.type, b = null;
        switch (d) {
          case R:
          case ce:
          case k:
            b = v;
            break;
          case X:
            b = v.render;
            break;
        }
        var C = !1;
        b !== null && t.has(b) && (C = !0), C ? dM(e, a) : o !== null && yb(o, t, a), u !== null && yb(u, t, a);
      }
    }
    function dM(e, t) {
      {
        var a = pM(e, t);
        if (a)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case B:
              t.add(o.stateNode);
              return;
            case z:
              t.add(o.stateNode.containerInfo);
              return;
            case O:
              t.add(o.stateNode.containerInfo);
              return;
          }
          if (o.return === null)
            throw new Error("Expected to reach root first.");
          o = o.return;
        }
      }
    }
    function pM(e, t) {
      for (var a = e, o = !1; ; ) {
        if (a.tag === B)
          o = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return o;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return o;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var gb;
    {
      gb = !1;
      try {
        var Nx = Object.preventExtensions({});
      } catch {
        gb = !0;
      }
    }
    function vM(e, t, a, o) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = st, this.subtreeFlags = st, this.deletions = null, this.lanes = he, this.childLanes = he, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !gb && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var pi = function(e, t, a, o) {
      return new vM(e, t, a, o);
    };
    function Sb(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function hM(e) {
      return typeof e == "function" && !Sb(e) && e.defaultProps === void 0;
    }
    function mM(e) {
      if (typeof e == "function")
        return Sb(e) ? k : R;
      if (e != null) {
        var t = e.$$typeof;
        if (t === De)
          return X;
        if (t === Vt)
          return be;
      }
      return N;
    }
    function vc(e, t) {
      var a = e.alternate;
      a === null ? (a = pi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = st, a.subtreeFlags = st, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & gr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (a.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case N:
        case R:
        case ce:
          a.type = hd(e.type);
          break;
        case k:
          a.type = vb(e.type);
          break;
        case X:
          a.type = hb(e.type);
          break;
      }
      return a;
    }
    function yM(e, t) {
      e.flags &= gr | gn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = he, e.lanes = t, e.child = null, e.subtreeFlags = st, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = st, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var o = a.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function gM(e, t, a) {
      var o;
      return e === ay ? (o = tt, t === !0 && (o |= Mt, o |= Ea)) : o = Ze, Ca && (o |= St), pi(O, null, null, o);
    }
    function bb(e, t, a, o, u, d) {
      var v = N, b = e;
      if (typeof e == "function")
        Sb(e) ? (v = k, b = vb(b)) : b = hd(b);
      else if (typeof e == "string")
        v = B;
      else
        e: switch (e) {
          case ai:
            return Zu(a.children, u, d, t);
          case ho:
            v = F, u |= Mt, (u & tt) !== Ze && (u |= Ea);
            break;
          case tl:
            return SM(a, u, d, t);
          case it:
            return bM(a, u, d, t);
          case Ft:
            return CM(a, u, d, t);
          case yn:
            return Lx(a, u, d, t);
          case kn:
          case Dt:
          case Kr:
          case mo:
          case ur:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case M:
                  v = oe;
                  break e;
                case Se:
                  v = fe;
                  break e;
                case De:
                  v = X, b = hb(b);
                  break e;
                case Vt:
                  v = be;
                  break e;
                case vt:
                  v = et, b = null;
                  break e;
              }
            var C = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var T = o ? wt(o) : null;
              T && (C += `

Check the render method of \`` + T + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + C));
          }
        }
      var w = pi(v, a, t, u);
      return w.elementType = e, w.type = b, w.lanes = d, w._debugOwner = o, w;
    }
    function Cb(e, t, a) {
      var o = null;
      o = e._owner;
      var u = e.type, d = e.key, v = e.props, b = bb(u, d, v, o, t, a);
      return b._debugSource = e._source, b._debugOwner = e._owner, b;
    }
    function Zu(e, t, a, o) {
      var u = pi(V, e, o, t);
      return u.lanes = a, u;
    }
    function SM(e, t, a, o) {
      typeof e.id != "string" && y('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = pi(le, e, o, t | St);
      return u.elementType = tl, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function bM(e, t, a, o) {
      var u = pi($, e, o, t);
      return u.elementType = it, u.lanes = a, u;
    }
    function CM(e, t, a, o) {
      var u = pi(ke, e, o, t);
      return u.elementType = Ft, u.lanes = a, u;
    }
    function Lx(e, t, a, o) {
      var u = pi(pe, e, o, t);
      u.elementType = yn, u.lanes = a;
      var d = {
        isHidden: !1
      };
      return u.stateNode = d, u;
    }
    function Eb(e, t, a) {
      var o = pi(H, e, null, t);
      return o.lanes = a, o;
    }
    function EM() {
      var e = pi(B, null, null, Ze);
      return e.elementType = "DELETED", e;
    }
    function TM(e) {
      var t = pi(se, null, null, Ze);
      return t.stateNode = e, t;
    }
    function Tb(e, t, a) {
      var o = e.children !== null ? e.children : [], u = pi(z, o, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function zx(e, t) {
      return e === null && (e = pi(N, null, null, Ze)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function xM(e, t, a, o, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = aS, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Qn, this.eventTimes = js(he), this.expirationTimes = js(hn), this.pendingLanes = he, this.suspendedLanes = he, this.pingedLanes = he, this.expiredLanes = he, this.mutableReadLanes = he, this.finishedLanes = he, this.entangledLanes = he, this.entanglements = js(he), this.identifierPrefix = o, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], v = 0; v < Ns; v++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case ay:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case ju:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function Ux(e, t, a, o, u, d, v, b, C, T) {
      var w = new xM(e, t, a, b, C), j = gM(t, d);
      w.current = j, j.stateNode = w;
      {
        var U = {
          element: o,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        j.memoizedState = U;
      }
      return US(j), w;
    }
    var xb = "18.3.1";
    function wM(e, t, a) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return W(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: ha,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var wb, Rb;
    wb = !1, Rb = {};
    function Fx(e) {
      if (!e)
        return di;
      var t = za(e), a = lO(t);
      if (t.tag === k) {
        var o = t.type;
        if (Uo(o))
          return cE(t, o, a);
      }
      return a;
    }
    function RM(e, t) {
      {
        var a = za(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var u = ja(a);
        if (u === null)
          return null;
        if (u.mode & Mt) {
          var d = wt(a) || "Component";
          if (!Rb[d]) {
            Rb[d] = !0;
            var v = Yn;
            try {
              nn(u), a.mode & Mt ? y("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : y("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              v ? nn(v) : Zn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function Px(e, t, a, o, u, d, v, b) {
      var C = !1, T = null;
      return Ux(e, t, C, T, a, o, u, d, v);
    }
    function jx(e, t, a, o, u, d, v, b, C, T) {
      var w = !0, j = Ux(a, o, w, e, u, d, v, b, C);
      j.context = Fx(null);
      var U = j.current, Z = Ra(), ee = Ku(U), re = Ll(Z, ee);
      return re.callback = t ?? null, Bu(U, re, ee), NA(j, ee, Z), j;
    }
    function Pv(e, t, a, o) {
      hp(t, e);
      var u = t.current, d = Ra(), v = Ku(u);
      gp(v);
      var b = Fx(a);
      t.context === null ? t.context = b : t.pendingContext = b, Ma && Yn !== null && !wb && (wb = !0, y(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, wt(Yn) || "Unknown"));
      var C = Ll(d, v);
      C.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && y("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), C.callback = o);
      var T = Bu(u, C, v);
      return T !== null && (kr(T, u, v, d), Sy(T, u, v)), v;
    }
    function ug(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case B:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function _M(e) {
      switch (e.tag) {
        case O: {
          var t = e.stateNode;
          if (Cf(t)) {
            var a = Cp(t);
            FA(t, a);
          }
          break;
        }
        case $: {
          Pl(function() {
            var u = qa(e, ot);
            if (u !== null) {
              var d = Ra();
              kr(u, e, ot, d);
            }
          });
          var o = ot;
          _b(e, o);
          break;
        }
      }
    }
    function $x(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = mm(a.retryLane, t));
    }
    function _b(e, t) {
      $x(e, t);
      var a = e.alternate;
      a && $x(a, t);
    }
    function kM(e) {
      if (e.tag === $) {
        var t = zs, a = qa(e, t);
        if (a !== null) {
          var o = Ra();
          kr(a, e, t, o);
        }
        _b(e, t);
      }
    }
    function OM(e) {
      if (e.tag === $) {
        var t = Ku(e), a = qa(e, t);
        if (a !== null) {
          var o = Ra();
          kr(a, e, t, o);
        }
        _b(e, t);
      }
    }
    function Vx(e) {
      var t = Zh(e);
      return t === null ? null : t.stateNode;
    }
    var Bx = function(e) {
      return null;
    };
    function DM(e) {
      return Bx(e);
    }
    var Hx = function(e) {
      return !1;
    };
    function AM(e) {
      return Hx(e);
    }
    var Ix = null, Yx = null, Wx = null, Gx = null, Qx = null, qx = null, Kx = null, Xx = null, Zx = null;
    {
      var Jx = function(e, t, a) {
        var o = t[a], u = sr(e) ? e.slice() : At({}, e);
        return a + 1 === t.length ? (sr(u) ? u.splice(o, 1) : delete u[o], u) : (u[o] = Jx(e[o], t, a + 1), u);
      }, ew = function(e, t) {
        return Jx(e, t, 0);
      }, tw = function(e, t, a, o) {
        var u = t[o], d = sr(e) ? e.slice() : At({}, e);
        if (o + 1 === t.length) {
          var v = a[o];
          d[v] = d[u], sr(d) ? d.splice(u, 1) : delete d[u];
        } else
          d[u] = tw(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            o + 1
          );
        return d;
      }, nw = function(e, t, a) {
        if (t.length !== a.length) {
          S("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < a.length - 1; o++)
            if (t[o] !== a[o]) {
              S("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return tw(e, t, a, 0);
      }, rw = function(e, t, a, o) {
        if (a >= t.length)
          return o;
        var u = t[a], d = sr(e) ? e.slice() : At({}, e);
        return d[u] = rw(e[u], t, a + 1, o), d;
      }, aw = function(e, t, a) {
        return rw(e, t, 0, a);
      }, kb = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      Ix = function(e, t, a, o) {
        var u = kb(e, t);
        if (u !== null) {
          var d = aw(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = At({}, e.memoizedProps);
          var v = qa(e, ot);
          v !== null && kr(v, e, ot, hn);
        }
      }, Yx = function(e, t, a) {
        var o = kb(e, t);
        if (o !== null) {
          var u = ew(o.memoizedState, a);
          o.memoizedState = u, o.baseState = u, e.memoizedProps = At({}, e.memoizedProps);
          var d = qa(e, ot);
          d !== null && kr(d, e, ot, hn);
        }
      }, Wx = function(e, t, a, o) {
        var u = kb(e, t);
        if (u !== null) {
          var d = nw(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = At({}, e.memoizedProps);
          var v = qa(e, ot);
          v !== null && kr(v, e, ot, hn);
        }
      }, Gx = function(e, t, a) {
        e.pendingProps = aw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = qa(e, ot);
        o !== null && kr(o, e, ot, hn);
      }, Qx = function(e, t) {
        e.pendingProps = ew(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = qa(e, ot);
        a !== null && kr(a, e, ot, hn);
      }, qx = function(e, t, a) {
        e.pendingProps = nw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = qa(e, ot);
        o !== null && kr(o, e, ot, hn);
      }, Kx = function(e) {
        var t = qa(e, ot);
        t !== null && kr(t, e, ot, hn);
      }, Xx = function(e) {
        Bx = e;
      }, Zx = function(e) {
        Hx = e;
      };
    }
    function MM(e) {
      var t = ja(e);
      return t === null ? null : t.stateNode;
    }
    function NM(e) {
      return null;
    }
    function LM() {
      return Yn;
    }
    function zM(e) {
      var t = e.findFiberByHostInstance, a = f.ReactCurrentDispatcher;
      return vp({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Ix,
        overrideHookStateDeletePath: Yx,
        overrideHookStateRenamePath: Wx,
        overrideProps: Gx,
        overridePropsDeletePath: Qx,
        overridePropsRenamePath: qx,
        setErrorHandler: Xx,
        setSuspenseHandler: Zx,
        scheduleUpdate: Kx,
        currentDispatcherRef: a,
        findHostInstanceByFiber: MM,
        findFiberByHostInstance: t || NM,
        // React Refresh
        findHostInstancesForRefresh: fM,
        scheduleRefresh: sM,
        scheduleRoot: cM,
        setRefreshHandler: uM,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: LM,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: xb
      });
    }
    var iw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function Ob(e) {
      this._internalRoot = e;
    }
    sg.prototype.render = Ob.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? y("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : cg(arguments[1]) ? y("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && y("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Wn) {
          var o = Vx(t.current);
          o && o.parentNode !== a && y("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Pv(e, t, null, null);
    }, sg.prototype.unmount = Ob.prototype.unmount = function() {
      typeof arguments[0] == "function" && y("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        yx() && y("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Pl(function() {
          Pv(null, e, null, null);
        }), iE(t);
      }
    };
    function UM(e, t) {
      if (!cg(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      ow(e);
      var a = !1, o = !1, u = "", d = iw;
      t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ji && y(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var v = Px(e, ay, null, a, o, u, d);
      Xm(v.current, e);
      var b = e.nodeType === Wn ? e.parentNode : e;
      return Ip(b), new Ob(v);
    }
    function sg(e) {
      this._internalRoot = e;
    }
    function FM(e) {
      e && A0(e);
    }
    sg.prototype.unstable_scheduleHydration = FM;
    function PM(e, t, a) {
      if (!cg(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      ow(e), t === void 0 && y("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = a ?? null, u = a != null && a.hydratedSources || null, d = !1, v = !1, b = "", C = iw;
      a != null && (a.unstable_strictMode === !0 && (d = !0), a.identifierPrefix !== void 0 && (b = a.identifierPrefix), a.onRecoverableError !== void 0 && (C = a.onRecoverableError));
      var T = jx(t, null, e, ay, o, d, v, b, C);
      if (Xm(T.current, e), Ip(e), u)
        for (var w = 0; w < u.length; w++) {
          var j = u[w];
          BO(T, j);
        }
      return new sg(T);
    }
    function cg(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === ui || e.nodeType === il || !Ne));
    }
    function jv(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === ui || e.nodeType === il || e.nodeType === Wn && e.nodeValue === " react-mount-point-unstable "));
    }
    function ow(e) {
      e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && y("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), tv(e) && (e._reactRootContainer ? y("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : y("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var jM = f.ReactCurrentOwner, lw;
    lw = function(e) {
      if (e._reactRootContainer && e.nodeType !== Wn) {
        var t = Vx(e._reactRootContainer.current);
        t && t.parentNode !== e && y("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, o = Db(e), u = !!(o && Fu(o));
      u && !a && y("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && y("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function Db(e) {
      return e ? e.nodeType === ui ? e.documentElement : e.firstChild : null;
    }
    function uw() {
    }
    function $M(e, t, a, o, u) {
      if (u) {
        if (typeof o == "function") {
          var d = o;
          o = function() {
            var U = ug(v);
            d.call(U);
          };
        }
        var v = jx(
          t,
          o,
          e,
          ju,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          uw
        );
        e._reactRootContainer = v, Xm(v.current, e);
        var b = e.nodeType === Wn ? e.parentNode : e;
        return Ip(b), Pl(), v;
      } else {
        for (var C; C = e.lastChild; )
          e.removeChild(C);
        if (typeof o == "function") {
          var T = o;
          o = function() {
            var U = ug(w);
            T.call(U);
          };
        }
        var w = Px(
          e,
          ju,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          uw
        );
        e._reactRootContainer = w, Xm(w.current, e);
        var j = e.nodeType === Wn ? e.parentNode : e;
        return Ip(j), Pl(function() {
          Pv(t, w, a, o);
        }), w;
      }
    }
    function VM(e, t) {
      e !== null && typeof e != "function" && y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function fg(e, t, a, o, u) {
      lw(a), VM(u === void 0 ? null : u, "render");
      var d = a._reactRootContainer, v;
      if (!d)
        v = $M(a, t, e, u, o);
      else {
        if (v = d, typeof u == "function") {
          var b = u;
          u = function() {
            var C = ug(v);
            b.call(C);
          };
        }
        Pv(t, v, e, u);
      }
      return ug(v);
    }
    var sw = !1;
    function BM(e) {
      {
        sw || (sw = !0, y("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = jM.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || y("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Jt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Xr ? e : RM(e, "findDOMNode");
    }
    function HM(e, t, a) {
      if (y("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !jv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = tv(t) && t._reactRootContainer === void 0;
        o && y("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return fg(null, e, t, !0, a);
    }
    function IM(e, t, a) {
      if (y("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !jv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = tv(t) && t._reactRootContainer === void 0;
        o && y("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return fg(null, e, t, !1, a);
    }
    function YM(e, t, a, o) {
      if (y("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !jv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Rs(e))
        throw new Error("parentComponent must be a valid React Component");
      return fg(e, t, a, !1, o);
    }
    var cw = !1;
    function WM(e) {
      if (cw || (cw = !0, y("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !jv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = tv(e) && e._reactRootContainer === void 0;
        t && y("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = Db(e), o = a && !Fu(a);
          o && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Pl(function() {
          fg(null, null, e, !1, function() {
            e._reactRootContainer = null, iE(e);
          });
        }), !0;
      } else {
        {
          var u = Db(e), d = !!(u && Fu(u)), v = e.nodeType === Xr && jv(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", v ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Tu(_M), O0(kM), Tf(OM), Sm(Ha), bm(zr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && y("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), qh(Q_), jc(lb, PA, Pl);
    function GM(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!cg(t))
        throw new Error("Target container is not a DOM element.");
      return wM(e, t, null, a);
    }
    function QM(e, t, a, o) {
      return YM(e, t, a, o);
    }
    var Ab = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Fu, Wf, Zm, Pc, Ts, lb]
    };
    function qM(e, t) {
      return Ab.usingClientEntryPoint || y('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), UM(e, t);
    }
    function KM(e, t, a) {
      return Ab.usingClientEntryPoint || y('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), PM(e, t, a);
    }
    function XM(e) {
      return yx() && y("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Pl(e);
    }
    var ZM = zM({
      findFiberByHostInstance: Js,
      bundleType: 1,
      version: xb,
      rendererPackageName: "react-dom"
    });
    if (!ZM && Ut && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var fw = window.location.protocol;
      /^(https?|file):$/.test(fw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (fw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ei.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ab, ei.createPortal = GM, ei.createRoot = qM, ei.findDOMNode = BM, ei.flushSync = XM, ei.hydrate = HM, ei.hydrateRoot = KM, ei.render = IM, ei.unmountComponentAtNode = WM, ei.unstable_batchedUpdates = lb, ei.unstable_renderSubtreeIntoContainer = QM, ei.version = xb, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ei;
}
function hR() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(hR);
    } catch (i) {
      console.error(i);
    }
  }
}
process.env.NODE_ENV === "production" ? (hR(), Xb.exports = f2()) : Xb.exports = d2();
var p2 = Xb.exports, Zb, pg = p2;
if (process.env.NODE_ENV === "production")
  Zb = pg.createRoot, pg.hydrateRoot;
else {
  var yw = pg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Zb = function(i, s) {
    yw.usingClientEntryPoint = !0;
    try {
      return pg.createRoot(i, s);
    } finally {
      yw.usingClientEntryPoint = !1;
    }
  };
}
var v2 = Object.defineProperty, h2 = (i, s, f) => s in i ? v2(i, s, { enumerable: !0, configurable: !0, writable: !0, value: f }) : i[s] = f, vg = (i, s, f) => (h2(i, typeof s != "symbol" ? s + "" : s, f), f);
const m2 = {
  stringify: (i) => i,
  parse: (i) => i
}, y2 = {
  stringify: (i) => `${i}`,
  parse: (i) => parseFloat(i)
}, g2 = {
  stringify: (i) => i ? "true" : "false",
  parse: (i) => /^[ty1-9]/i.test(i)
}, S2 = {
  stringify: (i) => i.name,
  parse: (i, s, f) => {
    const h = (() => {
      if (typeof window < "u" && i in window)
        return window[i];
      if (typeof global < "u" && i in global)
        return global[i];
    })();
    return typeof h == "function" ? h.bind(f) : void 0;
  }
}, b2 = {
  stringify: (i) => JSON.stringify(i),
  parse: (i) => JSON.parse(i)
}, Lb = {
  string: m2,
  number: y2,
  boolean: g2,
  function: S2,
  json: b2
};
function C2(i) {
  return i.replace(
    /([a-z0-9])([A-Z])/g,
    (s, f, h) => `${f}-${h.toLowerCase()}`
  );
}
const hg = Symbol.for("r2wc.render"), mg = Symbol.for("r2wc.connected"), hc = Symbol.for("r2wc.context"), Ju = Symbol.for("r2wc.props");
function E2(i, s, f) {
  var h, m, S;
  s.props || (s.props = i.propTypes ? Object.keys(i.propTypes) : []);
  const y = Array.isArray(s.props) ? s.props.slice() : Object.keys(s.props), x = {}, R = {}, k = {};
  for (const O of y) {
    x[O] = Array.isArray(s.props) ? "string" : s.props[O];
    const z = C2(O);
    R[O] = z, k[z] = O;
  }
  class N extends HTMLElement {
    constructor() {
      super(), vg(this, h, !0), vg(this, m), vg(this, S, {}), vg(this, "container"), s.shadow ? this.container = this.attachShadow({
        mode: s.shadow
      }) : this.container = this, this[Ju].container = this.container;
      for (const z of y) {
        const B = R[z], H = this.getAttribute(B), V = x[z], F = V ? Lb[V] : null;
        F != null && F.parse && H && (this[Ju][z] = F.parse(H, B, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(k);
    }
    connectedCallback() {
      this[mg] = !0, this[hg]();
    }
    disconnectedCallback() {
      this[mg] = !1, this[hc] && f.unmount(this[hc]), delete this[hc];
    }
    attributeChangedCallback(z, B, H) {
      const V = k[z], F = x[V], fe = F ? Lb[F] : null;
      V in x && fe != null && fe.parse && H && (this[Ju][V] = fe.parse(H, z, this), this[hg]());
    }
    [(h = mg, m = hc, S = Ju, hg)]() {
      this[mg] && (this[hc] ? f.update(this[hc], this[Ju]) : this[hc] = f.mount(
        this.container,
        i,
        this[Ju]
      ));
    }
  }
  for (const O of y) {
    const z = R[O], B = x[O];
    Object.defineProperty(N.prototype, O, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Ju][O];
      },
      set(H) {
        this[Ju][O] = H;
        const V = B ? Lb[B] : null;
        if (V != null && V.stringify) {
          const F = V.stringify(H, z, this);
          this.getAttribute(z) !== F && this.setAttribute(z, F);
        } else
          this[hg]();
      }
    });
  }
  return N;
}
function T2(i, s, f) {
  const h = Zb(i), m = xn.createElement(s, f);
  return h.render(m), {
    root: h,
    ReactComponent: s
  };
}
function x2({ root: i, ReactComponent: s }, f) {
  const h = xn.createElement(s, f);
  i.render(h);
}
function w2({ root: i }) {
  i.unmount();
}
function Vg(i, s = {}) {
  return E2(i, s, { mount: T2, update: x2, unmount: w2 });
}
var Jb = { exports: {} }, Bv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gw;
function R2() {
  if (gw) return Bv;
  gw = 1;
  var i = xn, s = Symbol.for("react.element"), f = Symbol.for("react.fragment"), h = Object.prototype.hasOwnProperty, m = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(x, R, k) {
    var N, O = {}, z = null, B = null;
    k !== void 0 && (z = "" + k), R.key !== void 0 && (z = "" + R.key), R.ref !== void 0 && (B = R.ref);
    for (N in R) h.call(R, N) && !S.hasOwnProperty(N) && (O[N] = R[N]);
    if (x && x.defaultProps) for (N in R = x.defaultProps, R) O[N] === void 0 && (O[N] = R[N]);
    return { $$typeof: s, type: x, key: z, ref: B, props: O, _owner: m.current };
  }
  return Bv.Fragment = f, Bv.jsx = y, Bv.jsxs = y, Bv;
}
var Hv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sw;
function _2() {
  return Sw || (Sw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = xn, s = Symbol.for("react.element"), f = Symbol.for("react.portal"), h = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), x = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), H = Symbol.iterator, V = "@@iterator";
    function F(M) {
      if (M === null || typeof M != "object")
        return null;
      var Se = H && M[H] || M[V];
      return typeof Se == "function" ? Se : null;
    }
    var fe = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function oe(M) {
      {
        for (var Se = arguments.length, De = new Array(Se > 1 ? Se - 1 : 0), it = 1; it < Se; it++)
          De[it - 1] = arguments[it];
        X("error", M, De);
      }
    }
    function X(M, Se, De) {
      {
        var it = fe.ReactDebugCurrentFrame, Ft = it.getStackAddendum();
        Ft !== "" && (Se += "%s", De = De.concat([Ft]));
        var Vt = De.map(function(vt) {
          return String(vt);
        });
        Vt.unshift("Warning: " + Se), Function.prototype.apply.call(console[M], console, Vt);
      }
    }
    var le = !1, $ = !1, be = !1, ce = !1, et = !1, _;
    _ = Symbol.for("react.module.reference");
    function se(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === h || M === S || et || M === m || M === k || M === N || ce || M === B || le || $ || be || typeof M == "object" && M !== null && (M.$$typeof === z || M.$$typeof === O || M.$$typeof === y || M.$$typeof === x || M.$$typeof === R || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === _ || M.getModuleId !== void 0));
    }
    function ke(M, Se, De) {
      var it = M.displayName;
      if (it)
        return it;
      var Ft = Se.displayName || Se.name || "";
      return Ft !== "" ? De + "(" + Ft + ")" : De;
    }
    function ve(M) {
      return M.displayName || "Context";
    }
    function pe(M) {
      if (M == null)
        return null;
      if (typeof M.tag == "number" && oe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof M == "function")
        return M.displayName || M.name || null;
      if (typeof M == "string")
        return M;
      switch (M) {
        case h:
          return "Fragment";
        case f:
          return "Portal";
        case S:
          return "Profiler";
        case m:
          return "StrictMode";
        case k:
          return "Suspense";
        case N:
          return "SuspenseList";
      }
      if (typeof M == "object")
        switch (M.$$typeof) {
          case x:
            var Se = M;
            return ve(Se) + ".Consumer";
          case y:
            var De = M;
            return ve(De._context) + ".Provider";
          case R:
            return ke(M, M.render, "ForwardRef");
          case O:
            var it = M.displayName || null;
            return it !== null ? it : pe(M.type) || "Memo";
          case z: {
            var Ft = M, Vt = Ft._payload, vt = Ft._init;
            try {
              return pe(vt(Vt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Re = Object.assign, lt = 0, Qe, bt, ge, ze, I, de, Ne;
    function Xe() {
    }
    Xe.__reactDisabledLog = !0;
    function Pe() {
      {
        if (lt === 0) {
          Qe = console.log, bt = console.info, ge = console.warn, ze = console.error, I = console.group, de = console.groupCollapsed, Ne = console.groupEnd;
          var M = {
            configurable: !0,
            enumerable: !0,
            value: Xe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: M,
            log: M,
            warn: M,
            error: M,
            group: M,
            groupCollapsed: M,
            groupEnd: M
          });
        }
        lt++;
      }
    }
    function ht() {
      {
        if (lt--, lt === 0) {
          var M = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Re({}, M, {
              value: Qe
            }),
            info: Re({}, M, {
              value: bt
            }),
            warn: Re({}, M, {
              value: ge
            }),
            error: Re({}, M, {
              value: ze
            }),
            group: Re({}, M, {
              value: I
            }),
            groupCollapsed: Re({}, M, {
              value: de
            }),
            groupEnd: Re({}, M, {
              value: Ne
            })
          });
        }
        lt < 0 && oe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = fe.ReactCurrentDispatcher, ut;
    function rt(M, Se, De) {
      {
        if (ut === void 0)
          try {
            throw Error();
          } catch (Ft) {
            var it = Ft.stack.trim().match(/\n( *(at )?)/);
            ut = it && it[1] || "";
          }
        return `
` + ut + M;
      }
    }
    var dt = !1, mt;
    {
      var zt = typeof WeakMap == "function" ? WeakMap : Map;
      mt = new zt();
    }
    function we(M, Se) {
      if (!M || dt)
        return "";
      {
        var De = mt.get(M);
        if (De !== void 0)
          return De;
      }
      var it;
      dt = !0;
      var Ft = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Vt;
      Vt = Ie.current, Ie.current = null, Pe();
      try {
        if (Se) {
          var vt = function() {
            throw Error();
          };
          if (Object.defineProperty(vt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(vt, []);
            } catch (Dr) {
              it = Dr;
            }
            Reflect.construct(M, [], vt);
          } else {
            try {
              vt.call();
            } catch (Dr) {
              it = Dr;
            }
            M.call(vt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Dr) {
            it = Dr;
          }
          M();
        }
      } catch (Dr) {
        if (Dr && it && typeof Dr.stack == "string") {
          for (var Dt = Dr.stack.split(`
`), ur = it.stack.split(`
`), yn = Dt.length - 1, kn = ur.length - 1; yn >= 1 && kn >= 0 && Dt[yn] !== ur[kn]; )
            kn--;
          for (; yn >= 1 && kn >= 0; yn--, kn--)
            if (Dt[yn] !== ur[kn]) {
              if (yn !== 1 || kn !== 1)
                do
                  if (yn--, kn--, kn < 0 || Dt[yn] !== ur[kn]) {
                    var Kr = `
` + Dt[yn].replace(" at new ", " at ");
                    return M.displayName && Kr.includes("<anonymous>") && (Kr = Kr.replace("<anonymous>", M.displayName)), typeof M == "function" && mt.set(M, Kr), Kr;
                  }
                while (yn >= 1 && kn >= 0);
              break;
            }
        }
      } finally {
        dt = !1, Ie.current = Vt, ht(), Error.prepareStackTrace = Ft;
      }
      var mo = M ? M.displayName || M.name : "", Qt = mo ? rt(mo) : "";
      return typeof M == "function" && mt.set(M, Qt), Qt;
    }
    function Ut(M, Se, De) {
      return we(M, !1);
    }
    function Le(M) {
      var Se = M.prototype;
      return !!(Se && Se.isReactComponent);
    }
    function Xt(M, Se, De) {
      if (M == null)
        return "";
      if (typeof M == "function")
        return we(M, Le(M));
      if (typeof M == "string")
        return rt(M);
      switch (M) {
        case k:
          return rt("Suspense");
        case N:
          return rt("SuspenseList");
      }
      if (typeof M == "object")
        switch (M.$$typeof) {
          case R:
            return Ut(M.render);
          case O:
            return Xt(M.type, Se, De);
          case z: {
            var it = M, Ft = it._payload, Vt = it._init;
            try {
              return Xt(Vt(Ft), Se, De);
            } catch {
            }
          }
        }
      return "";
    }
    var mn = Object.prototype.hasOwnProperty, Nn = {}, A = fe.ReactDebugCurrentFrame;
    function W(M) {
      if (M) {
        var Se = M._owner, De = Xt(M.type, M._source, Se ? Se.type : null);
        A.setExtraStackFrame(De);
      } else
        A.setExtraStackFrame(null);
    }
    function ne(M, Se, De, it, Ft) {
      {
        var Vt = Function.call.bind(mn);
        for (var vt in M)
          if (Vt(M, vt)) {
            var Dt = void 0;
            try {
              if (typeof M[vt] != "function") {
                var ur = Error((it || "React class") + ": " + De + " type `" + vt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof M[vt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw ur.name = "Invariant Violation", ur;
              }
              Dt = M[vt](Se, vt, it, De, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (yn) {
              Dt = yn;
            }
            Dt && !(Dt instanceof Error) && (W(Ft), oe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", it || "React class", De, vt, typeof Dt), W(null)), Dt instanceof Error && !(Dt.message in Nn) && (Nn[Dt.message] = !0, W(Ft), oe("Failed %s type: %s", De, Dt.message), W(null));
          }
      }
    }
    var _e = Array.isArray;
    function Te(M) {
      return _e(M);
    }
    function te(M) {
      {
        var Se = typeof Symbol == "function" && Symbol.toStringTag, De = Se && M[Symbol.toStringTag] || M.constructor.name || "Object";
        return De;
      }
    }
    function Ve(M) {
      try {
        return Et(M), !1;
      } catch {
        return !0;
      }
    }
    function Et(M) {
      return "" + M;
    }
    function Bt(M) {
      if (Ve(M))
        return oe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", te(M)), Et(M);
    }
    var Ot = fe.ReactCurrentOwner, jn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, Si, Fr, Oe;
    Oe = {};
    function at(M) {
      if (mn.call(M, "ref")) {
        var Se = Object.getOwnPropertyDescriptor(M, "ref").get;
        if (Se && Se.isReactWarning)
          return !1;
      }
      return M.ref !== void 0;
    }
    function kt(M) {
      if (mn.call(M, "key")) {
        var Se = Object.getOwnPropertyDescriptor(M, "key").get;
        if (Se && Se.isReactWarning)
          return !1;
      }
      return M.key !== void 0;
    }
    function Wt(M, Se) {
      if (typeof M.ref == "string" && Ot.current && Se && Ot.current.stateNode !== Se) {
        var De = pe(Ot.current.type);
        Oe[De] || (oe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', pe(Ot.current.type), M.ref), Oe[De] = !0);
      }
    }
    function dn(M, Se) {
      {
        var De = function() {
          Si || (Si = !0, oe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Se));
        };
        De.isReactWarning = !0, Object.defineProperty(M, "key", {
          get: De,
          configurable: !0
        });
      }
    }
    function lr(M, Se) {
      {
        var De = function() {
          Fr || (Fr = !0, oe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Se));
        };
        De.isReactWarning = !0, Object.defineProperty(M, "ref", {
          get: De,
          configurable: !0
        });
      }
    }
    var $n = function(M, Se, De, it, Ft, Vt, vt) {
      var Dt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: M,
        key: Se,
        ref: De,
        props: vt,
        // Record the component responsible for creating this element.
        _owner: Vt
      };
      return Dt._store = {}, Object.defineProperty(Dt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Dt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: it
      }), Object.defineProperty(Dt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Ft
      }), Object.freeze && (Object.freeze(Dt.props), Object.freeze(Dt)), Dt;
    };
    function qr(M, Se, De, it, Ft) {
      {
        var Vt, vt = {}, Dt = null, ur = null;
        De !== void 0 && (Bt(De), Dt = "" + De), kt(Se) && (Bt(Se.key), Dt = "" + Se.key), at(Se) && (ur = Se.ref, Wt(Se, Ft));
        for (Vt in Se)
          mn.call(Se, Vt) && !jn.hasOwnProperty(Vt) && (vt[Vt] = Se[Vt]);
        if (M && M.defaultProps) {
          var yn = M.defaultProps;
          for (Vt in yn)
            vt[Vt] === void 0 && (vt[Vt] = yn[Vt]);
        }
        if (Dt || ur) {
          var kn = typeof M == "function" ? M.displayName || M.name || "Unknown" : M;
          Dt && dn(vt, kn), ur && lr(vt, kn);
        }
        return $n(M, Dt, ur, Ft, it, Ot.current, vt);
      }
    }
    var pn = fe.ReactCurrentOwner, va = fe.ReactDebugCurrentFrame;
    function cn(M) {
      if (M) {
        var Se = M._owner, De = Xt(M.type, M._source, Se ? Se.type : null);
        va.setExtraStackFrame(De);
      } else
        va.setExtraStackFrame(null);
    }
    var vn;
    vn = !1;
    function Il(M) {
      return typeof M == "object" && M !== null && M.$$typeof === s;
    }
    function Zo() {
      {
        if (pn.current) {
          var M = pe(pn.current.type);
          if (M)
            return `

Check the render method of \`` + M + "`.";
        }
        return "";
      }
    }
    function Yl(M) {
      return "";
    }
    var as = {};
    function Sc(M) {
      {
        var Se = Zo();
        if (!Se) {
          var De = typeof M == "string" ? M : M.displayName || M.name;
          De && (Se = `

Check the top-level render call using <` + De + ">.");
        }
        return Se;
      }
    }
    function Jo(M, Se) {
      {
        if (!M._store || M._store.validated || M.key != null)
          return;
        M._store.validated = !0;
        var De = Sc(Se);
        if (as[De])
          return;
        as[De] = !0;
        var it = "";
        M && M._owner && M._owner !== pn.current && (it = " It was passed a child from " + pe(M._owner.type) + "."), cn(M), oe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', De, it), cn(null);
      }
    }
    function Wl(M, Se) {
      {
        if (typeof M != "object")
          return;
        if (Te(M))
          for (var De = 0; De < M.length; De++) {
            var it = M[De];
            Il(it) && Jo(it, Se);
          }
        else if (Il(M))
          M._store && (M._store.validated = !0);
        else if (M) {
          var Ft = F(M);
          if (typeof Ft == "function" && Ft !== M.entries)
            for (var Vt = Ft.call(M), vt; !(vt = Vt.next()).done; )
              Il(vt.value) && Jo(vt.value, Se);
        }
      }
    }
    function el(M) {
      {
        var Se = M.type;
        if (Se == null || typeof Se == "string")
          return;
        var De;
        if (typeof Se == "function")
          De = Se.propTypes;
        else if (typeof Se == "object" && (Se.$$typeof === R || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        Se.$$typeof === O))
          De = Se.propTypes;
        else
          return;
        if (De) {
          var it = pe(Se);
          ne(De, M.props, "prop", it, M);
        } else if (Se.PropTypes !== void 0 && !vn) {
          vn = !0;
          var Ft = pe(Se);
          oe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ft || "Unknown");
        }
        typeof Se.getDefaultProps == "function" && !Se.getDefaultProps.isReactClassApproved && oe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Gl(M) {
      {
        for (var Se = Object.keys(M.props), De = 0; De < Se.length; De++) {
          var it = Se[De];
          if (it !== "children" && it !== "key") {
            cn(M), oe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", it), cn(null);
            break;
          }
        }
        M.ref !== null && (cn(M), oe("Invalid attribute `ref` supplied to `React.Fragment`."), cn(null));
      }
    }
    var bi = {};
    function ji(M, Se, De, it, Ft, Vt) {
      {
        var vt = se(M);
        if (!vt) {
          var Dt = "";
          (M === void 0 || typeof M == "object" && M !== null && Object.keys(M).length === 0) && (Dt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var ur = Yl();
          ur ? Dt += ur : Dt += Zo();
          var yn;
          M === null ? yn = "null" : Te(M) ? yn = "array" : M !== void 0 && M.$$typeof === s ? (yn = "<" + (pe(M.type) || "Unknown") + " />", Dt = " Did you accidentally export a JSX literal instead of a component?") : yn = typeof M, oe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", yn, Dt);
        }
        var kn = qr(M, Se, De, Ft, Vt);
        if (kn == null)
          return kn;
        if (vt) {
          var Kr = Se.children;
          if (Kr !== void 0)
            if (it)
              if (Te(Kr)) {
                for (var mo = 0; mo < Kr.length; mo++)
                  Wl(Kr[mo], M);
                Object.freeze && Object.freeze(Kr);
              } else
                oe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Wl(Kr, M);
        }
        if (mn.call(Se, "key")) {
          var Qt = pe(M), Dr = Object.keys(Se).filter(function(Ci) {
            return Ci !== "key";
          }), ma = Dr.length > 0 ? "{key: someKey, " + Dr.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!bi[Qt + ma]) {
            var At = Dr.length > 0 ? "{" + Dr.join(": ..., ") + ": ...}" : "{}";
            oe(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ma, Qt, At, Qt), bi[Qt + ma] = !0;
          }
        }
        return M === h ? Gl(kn) : el(kn), kn;
      }
    }
    function ha(M, Se, De) {
      return ji(M, Se, De, !0);
    }
    function ai(M, Se, De) {
      return ji(M, Se, De, !1);
    }
    var ho = ai, tl = ha;
    Hv.Fragment = h, Hv.jsx = ho, Hv.jsxs = tl;
  }()), Hv;
}
process.env.NODE_ENV === "production" ? Jb.exports = R2() : Jb.exports = _2();
var $t = Jb.exports;
const k2 = "_wrapper_5bkbt_1", O2 = "_logo_5bkbt_19", D2 = "_title_5bkbt_33", zb = {
  wrapper: k2,
  logo: O2,
  title: D2
}, A2 = ({ text: i, image: s }) => /* @__PURE__ */ $t.jsx("header", { children: /* @__PURE__ */ $t.jsxs("div", { className: zb.wrapper, children: [
  /* @__PURE__ */ $t.jsx("div", { children: /* @__PURE__ */ $t.jsx("img", { width: 150, height: 150, className: zb.logo, src: s }) }),
  /* @__PURE__ */ $t.jsx("h1", { className: zb.title, children: i })
] }) });
var eC = { exports: {} }, yg = { exports: {} }, on = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var bw;
function M2() {
  if (bw) return on;
  bw = 1;
  var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, f = i ? Symbol.for("react.portal") : 60106, h = i ? Symbol.for("react.fragment") : 60107, m = i ? Symbol.for("react.strict_mode") : 60108, S = i ? Symbol.for("react.profiler") : 60114, y = i ? Symbol.for("react.provider") : 60109, x = i ? Symbol.for("react.context") : 60110, R = i ? Symbol.for("react.async_mode") : 60111, k = i ? Symbol.for("react.concurrent_mode") : 60111, N = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, z = i ? Symbol.for("react.suspense_list") : 60120, B = i ? Symbol.for("react.memo") : 60115, H = i ? Symbol.for("react.lazy") : 60116, V = i ? Symbol.for("react.block") : 60121, F = i ? Symbol.for("react.fundamental") : 60117, fe = i ? Symbol.for("react.responder") : 60118, oe = i ? Symbol.for("react.scope") : 60119;
  function X($) {
    if (typeof $ == "object" && $ !== null) {
      var be = $.$$typeof;
      switch (be) {
        case s:
          switch ($ = $.type, $) {
            case R:
            case k:
            case h:
            case S:
            case m:
            case O:
              return $;
            default:
              switch ($ = $ && $.$$typeof, $) {
                case x:
                case N:
                case H:
                case B:
                case y:
                  return $;
                default:
                  return be;
              }
          }
        case f:
          return be;
      }
    }
  }
  function le($) {
    return X($) === k;
  }
  return on.AsyncMode = R, on.ConcurrentMode = k, on.ContextConsumer = x, on.ContextProvider = y, on.Element = s, on.ForwardRef = N, on.Fragment = h, on.Lazy = H, on.Memo = B, on.Portal = f, on.Profiler = S, on.StrictMode = m, on.Suspense = O, on.isAsyncMode = function($) {
    return le($) || X($) === R;
  }, on.isConcurrentMode = le, on.isContextConsumer = function($) {
    return X($) === x;
  }, on.isContextProvider = function($) {
    return X($) === y;
  }, on.isElement = function($) {
    return typeof $ == "object" && $ !== null && $.$$typeof === s;
  }, on.isForwardRef = function($) {
    return X($) === N;
  }, on.isFragment = function($) {
    return X($) === h;
  }, on.isLazy = function($) {
    return X($) === H;
  }, on.isMemo = function($) {
    return X($) === B;
  }, on.isPortal = function($) {
    return X($) === f;
  }, on.isProfiler = function($) {
    return X($) === S;
  }, on.isStrictMode = function($) {
    return X($) === m;
  }, on.isSuspense = function($) {
    return X($) === O;
  }, on.isValidElementType = function($) {
    return typeof $ == "string" || typeof $ == "function" || $ === h || $ === k || $ === S || $ === m || $ === O || $ === z || typeof $ == "object" && $ !== null && ($.$$typeof === H || $.$$typeof === B || $.$$typeof === y || $.$$typeof === x || $.$$typeof === N || $.$$typeof === F || $.$$typeof === fe || $.$$typeof === oe || $.$$typeof === V);
  }, on.typeOf = X, on;
}
var ln = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cw;
function N2() {
  return Cw || (Cw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, f = i ? Symbol.for("react.portal") : 60106, h = i ? Symbol.for("react.fragment") : 60107, m = i ? Symbol.for("react.strict_mode") : 60108, S = i ? Symbol.for("react.profiler") : 60114, y = i ? Symbol.for("react.provider") : 60109, x = i ? Symbol.for("react.context") : 60110, R = i ? Symbol.for("react.async_mode") : 60111, k = i ? Symbol.for("react.concurrent_mode") : 60111, N = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, z = i ? Symbol.for("react.suspense_list") : 60120, B = i ? Symbol.for("react.memo") : 60115, H = i ? Symbol.for("react.lazy") : 60116, V = i ? Symbol.for("react.block") : 60121, F = i ? Symbol.for("react.fundamental") : 60117, fe = i ? Symbol.for("react.responder") : 60118, oe = i ? Symbol.for("react.scope") : 60119;
    function X(we) {
      return typeof we == "string" || typeof we == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      we === h || we === k || we === S || we === m || we === O || we === z || typeof we == "object" && we !== null && (we.$$typeof === H || we.$$typeof === B || we.$$typeof === y || we.$$typeof === x || we.$$typeof === N || we.$$typeof === F || we.$$typeof === fe || we.$$typeof === oe || we.$$typeof === V);
    }
    function le(we) {
      if (typeof we == "object" && we !== null) {
        var Ut = we.$$typeof;
        switch (Ut) {
          case s:
            var Le = we.type;
            switch (Le) {
              case R:
              case k:
              case h:
              case S:
              case m:
              case O:
                return Le;
              default:
                var Xt = Le && Le.$$typeof;
                switch (Xt) {
                  case x:
                  case N:
                  case H:
                  case B:
                  case y:
                    return Xt;
                  default:
                    return Ut;
                }
            }
          case f:
            return Ut;
        }
      }
    }
    var $ = R, be = k, ce = x, et = y, _ = s, se = N, ke = h, ve = H, pe = B, Re = f, lt = S, Qe = m, bt = O, ge = !1;
    function ze(we) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), I(we) || le(we) === R;
    }
    function I(we) {
      return le(we) === k;
    }
    function de(we) {
      return le(we) === x;
    }
    function Ne(we) {
      return le(we) === y;
    }
    function Xe(we) {
      return typeof we == "object" && we !== null && we.$$typeof === s;
    }
    function Pe(we) {
      return le(we) === N;
    }
    function ht(we) {
      return le(we) === h;
    }
    function Ie(we) {
      return le(we) === H;
    }
    function ut(we) {
      return le(we) === B;
    }
    function rt(we) {
      return le(we) === f;
    }
    function dt(we) {
      return le(we) === S;
    }
    function mt(we) {
      return le(we) === m;
    }
    function zt(we) {
      return le(we) === O;
    }
    ln.AsyncMode = $, ln.ConcurrentMode = be, ln.ContextConsumer = ce, ln.ContextProvider = et, ln.Element = _, ln.ForwardRef = se, ln.Fragment = ke, ln.Lazy = ve, ln.Memo = pe, ln.Portal = Re, ln.Profiler = lt, ln.StrictMode = Qe, ln.Suspense = bt, ln.isAsyncMode = ze, ln.isConcurrentMode = I, ln.isContextConsumer = de, ln.isContextProvider = Ne, ln.isElement = Xe, ln.isForwardRef = Pe, ln.isFragment = ht, ln.isLazy = Ie, ln.isMemo = ut, ln.isPortal = rt, ln.isProfiler = dt, ln.isStrictMode = mt, ln.isSuspense = zt, ln.isValidElementType = X, ln.typeOf = le;
  }()), ln;
}
var Ew;
function cC() {
  return Ew || (Ew = 1, process.env.NODE_ENV === "production" ? yg.exports = M2() : yg.exports = N2()), yg.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Ub, Tw;
function L2() {
  if (Tw) return Ub;
  Tw = 1;
  var i = Object.getOwnPropertySymbols, s = Object.prototype.hasOwnProperty, f = Object.prototype.propertyIsEnumerable;
  function h(S) {
    if (S == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(S);
  }
  function m() {
    try {
      if (!Object.assign)
        return !1;
      var S = new String("abc");
      if (S[5] = "de", Object.getOwnPropertyNames(S)[0] === "5")
        return !1;
      for (var y = {}, x = 0; x < 10; x++)
        y["_" + String.fromCharCode(x)] = x;
      var R = Object.getOwnPropertyNames(y).map(function(N) {
        return y[N];
      });
      if (R.join("") !== "0123456789")
        return !1;
      var k = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(N) {
        k[N] = N;
      }), Object.keys(Object.assign({}, k)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Ub = m() ? Object.assign : function(S, y) {
    for (var x, R = h(S), k, N = 1; N < arguments.length; N++) {
      x = Object(arguments[N]);
      for (var O in x)
        s.call(x, O) && (R[O] = x[O]);
      if (i) {
        k = i(x);
        for (var z = 0; z < k.length; z++)
          f.call(x, k[z]) && (R[k[z]] = x[k[z]]);
      }
    }
    return R;
  }, Ub;
}
var Fb, xw;
function fC() {
  if (xw) return Fb;
  xw = 1;
  var i = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Fb = i, Fb;
}
var Pb, ww;
function mR() {
  return ww || (ww = 1, Pb = Function.call.bind(Object.prototype.hasOwnProperty)), Pb;
}
var jb, Rw;
function z2() {
  if (Rw) return jb;
  Rw = 1;
  var i = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var s = fC(), f = {}, h = mR();
    i = function(S) {
      var y = "Warning: " + S;
      typeof console < "u" && console.error(y);
      try {
        throw new Error(y);
      } catch {
      }
    };
  }
  function m(S, y, x, R, k) {
    if (process.env.NODE_ENV !== "production") {
      for (var N in S)
        if (h(S, N)) {
          var O;
          try {
            if (typeof S[N] != "function") {
              var z = Error(
                (R || "React class") + ": " + x + " type `" + N + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof S[N] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw z.name = "Invariant Violation", z;
            }
            O = S[N](y, N, R, x, null, s);
          } catch (H) {
            O = H;
          }
          if (O && !(O instanceof Error) && i(
            (R || "React class") + ": type specification of " + x + " `" + N + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof O + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), O instanceof Error && !(O.message in f)) {
            f[O.message] = !0;
            var B = k ? k() : "";
            i(
              "Failed " + x + " type: " + O.message + (B ?? "")
            );
          }
        }
    }
  }
  return m.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (f = {});
  }, jb = m, jb;
}
var $b, _w;
function U2() {
  if (_w) return $b;
  _w = 1;
  var i = cC(), s = L2(), f = fC(), h = mR(), m = z2(), S = function() {
  };
  process.env.NODE_ENV !== "production" && (S = function(x) {
    var R = "Warning: " + x;
    typeof console < "u" && console.error(R);
    try {
      throw new Error(R);
    } catch {
    }
  });
  function y() {
    return null;
  }
  return $b = function(x, R) {
    var k = typeof Symbol == "function" && Symbol.iterator, N = "@@iterator";
    function O(I) {
      var de = I && (k && I[k] || I[N]);
      if (typeof de == "function")
        return de;
    }
    var z = "<<anonymous>>", B = {
      array: fe("array"),
      bigint: fe("bigint"),
      bool: fe("boolean"),
      func: fe("function"),
      number: fe("number"),
      object: fe("object"),
      string: fe("string"),
      symbol: fe("symbol"),
      any: oe(),
      arrayOf: X,
      element: le(),
      elementType: $(),
      instanceOf: be,
      node: se(),
      objectOf: et,
      oneOf: ce,
      oneOfType: _,
      shape: ve,
      exact: pe
    };
    function H(I, de) {
      return I === de ? I !== 0 || 1 / I === 1 / de : I !== I && de !== de;
    }
    function V(I, de) {
      this.message = I, this.data = de && typeof de == "object" ? de : {}, this.stack = "";
    }
    V.prototype = Error.prototype;
    function F(I) {
      if (process.env.NODE_ENV !== "production")
        var de = {}, Ne = 0;
      function Xe(ht, Ie, ut, rt, dt, mt, zt) {
        if (rt = rt || z, mt = mt || ut, zt !== f) {
          if (R) {
            var we = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw we.name = "Invariant Violation", we;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ut = rt + ":" + ut;
            !de[Ut] && // Avoid spamming the console because they are often not actionable except for lib authors
            Ne < 3 && (S(
              "You are manually calling a React.PropTypes validation function for the `" + mt + "` prop on `" + rt + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), de[Ut] = !0, Ne++);
          }
        }
        return Ie[ut] == null ? ht ? Ie[ut] === null ? new V("The " + dt + " `" + mt + "` is marked as required " + ("in `" + rt + "`, but its value is `null`.")) : new V("The " + dt + " `" + mt + "` is marked as required in " + ("`" + rt + "`, but its value is `undefined`.")) : null : I(Ie, ut, rt, dt, mt);
      }
      var Pe = Xe.bind(null, !1);
      return Pe.isRequired = Xe.bind(null, !0), Pe;
    }
    function fe(I) {
      function de(Ne, Xe, Pe, ht, Ie, ut) {
        var rt = Ne[Xe], dt = Qe(rt);
        if (dt !== I) {
          var mt = bt(rt);
          return new V(
            "Invalid " + ht + " `" + Ie + "` of type " + ("`" + mt + "` supplied to `" + Pe + "`, expected ") + ("`" + I + "`."),
            { expectedType: I }
          );
        }
        return null;
      }
      return F(de);
    }
    function oe() {
      return F(y);
    }
    function X(I) {
      function de(Ne, Xe, Pe, ht, Ie) {
        if (typeof I != "function")
          return new V("Property `" + Ie + "` of component `" + Pe + "` has invalid PropType notation inside arrayOf.");
        var ut = Ne[Xe];
        if (!Array.isArray(ut)) {
          var rt = Qe(ut);
          return new V("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected an array."));
        }
        for (var dt = 0; dt < ut.length; dt++) {
          var mt = I(ut, dt, Pe, ht, Ie + "[" + dt + "]", f);
          if (mt instanceof Error)
            return mt;
        }
        return null;
      }
      return F(de);
    }
    function le() {
      function I(de, Ne, Xe, Pe, ht) {
        var Ie = de[Ne];
        if (!x(Ie)) {
          var ut = Qe(Ie);
          return new V("Invalid " + Pe + " `" + ht + "` of type " + ("`" + ut + "` supplied to `" + Xe + "`, expected a single ReactElement."));
        }
        return null;
      }
      return F(I);
    }
    function $() {
      function I(de, Ne, Xe, Pe, ht) {
        var Ie = de[Ne];
        if (!i.isValidElementType(Ie)) {
          var ut = Qe(Ie);
          return new V("Invalid " + Pe + " `" + ht + "` of type " + ("`" + ut + "` supplied to `" + Xe + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return F(I);
    }
    function be(I) {
      function de(Ne, Xe, Pe, ht, Ie) {
        if (!(Ne[Xe] instanceof I)) {
          var ut = I.name || z, rt = ze(Ne[Xe]);
          return new V("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected ") + ("instance of `" + ut + "`."));
        }
        return null;
      }
      return F(de);
    }
    function ce(I) {
      if (!Array.isArray(I))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? S(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : S("Invalid argument supplied to oneOf, expected an array.")), y;
      function de(Ne, Xe, Pe, ht, Ie) {
        for (var ut = Ne[Xe], rt = 0; rt < I.length; rt++)
          if (H(ut, I[rt]))
            return null;
        var dt = JSON.stringify(I, function(zt, we) {
          var Ut = bt(we);
          return Ut === "symbol" ? String(we) : we;
        });
        return new V("Invalid " + ht + " `" + Ie + "` of value `" + String(ut) + "` " + ("supplied to `" + Pe + "`, expected one of " + dt + "."));
      }
      return F(de);
    }
    function et(I) {
      function de(Ne, Xe, Pe, ht, Ie) {
        if (typeof I != "function")
          return new V("Property `" + Ie + "` of component `" + Pe + "` has invalid PropType notation inside objectOf.");
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new V("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected an object."));
        for (var dt in ut)
          if (h(ut, dt)) {
            var mt = I(ut, dt, Pe, ht, Ie + "." + dt, f);
            if (mt instanceof Error)
              return mt;
          }
        return null;
      }
      return F(de);
    }
    function _(I) {
      if (!Array.isArray(I))
        return process.env.NODE_ENV !== "production" && S("Invalid argument supplied to oneOfType, expected an instance of array."), y;
      for (var de = 0; de < I.length; de++) {
        var Ne = I[de];
        if (typeof Ne != "function")
          return S(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ge(Ne) + " at index " + de + "."
          ), y;
      }
      function Xe(Pe, ht, Ie, ut, rt) {
        for (var dt = [], mt = 0; mt < I.length; mt++) {
          var zt = I[mt], we = zt(Pe, ht, Ie, ut, rt, f);
          if (we == null)
            return null;
          we.data && h(we.data, "expectedType") && dt.push(we.data.expectedType);
        }
        var Ut = dt.length > 0 ? ", expected one of type [" + dt.join(", ") + "]" : "";
        return new V("Invalid " + ut + " `" + rt + "` supplied to " + ("`" + Ie + "`" + Ut + "."));
      }
      return F(Xe);
    }
    function se() {
      function I(de, Ne, Xe, Pe, ht) {
        return Re(de[Ne]) ? null : new V("Invalid " + Pe + " `" + ht + "` supplied to " + ("`" + Xe + "`, expected a ReactNode."));
      }
      return F(I);
    }
    function ke(I, de, Ne, Xe, Pe) {
      return new V(
        (I || "React class") + ": " + de + " type `" + Ne + "." + Xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + Pe + "`."
      );
    }
    function ve(I) {
      function de(Ne, Xe, Pe, ht, Ie) {
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new V("Invalid " + ht + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Pe + "`, expected `object`."));
        for (var dt in I) {
          var mt = I[dt];
          if (typeof mt != "function")
            return ke(Pe, ht, Ie, dt, bt(mt));
          var zt = mt(ut, dt, Pe, ht, Ie + "." + dt, f);
          if (zt)
            return zt;
        }
        return null;
      }
      return F(de);
    }
    function pe(I) {
      function de(Ne, Xe, Pe, ht, Ie) {
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new V("Invalid " + ht + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Pe + "`, expected `object`."));
        var dt = s({}, Ne[Xe], I);
        for (var mt in dt) {
          var zt = I[mt];
          if (h(I, mt) && typeof zt != "function")
            return ke(Pe, ht, Ie, mt, bt(zt));
          if (!zt)
            return new V(
              "Invalid " + ht + " `" + Ie + "` key `" + mt + "` supplied to `" + Pe + "`.\nBad object: " + JSON.stringify(Ne[Xe], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(I), null, "  ")
            );
          var we = zt(ut, mt, Pe, ht, Ie + "." + mt, f);
          if (we)
            return we;
        }
        return null;
      }
      return F(de);
    }
    function Re(I) {
      switch (typeof I) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !I;
        case "object":
          if (Array.isArray(I))
            return I.every(Re);
          if (I === null || x(I))
            return !0;
          var de = O(I);
          if (de) {
            var Ne = de.call(I), Xe;
            if (de !== I.entries) {
              for (; !(Xe = Ne.next()).done; )
                if (!Re(Xe.value))
                  return !1;
            } else
              for (; !(Xe = Ne.next()).done; ) {
                var Pe = Xe.value;
                if (Pe && !Re(Pe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function lt(I, de) {
      return I === "symbol" ? !0 : de ? de["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && de instanceof Symbol : !1;
    }
    function Qe(I) {
      var de = typeof I;
      return Array.isArray(I) ? "array" : I instanceof RegExp ? "object" : lt(de, I) ? "symbol" : de;
    }
    function bt(I) {
      if (typeof I > "u" || I === null)
        return "" + I;
      var de = Qe(I);
      if (de === "object") {
        if (I instanceof Date)
          return "date";
        if (I instanceof RegExp)
          return "regexp";
      }
      return de;
    }
    function ge(I) {
      var de = bt(I);
      switch (de) {
        case "array":
        case "object":
          return "an " + de;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + de;
        default:
          return de;
      }
    }
    function ze(I) {
      return !I.constructor || !I.constructor.name ? z : I.constructor.name;
    }
    return B.checkPropTypes = m, B.resetWarningCache = m.resetWarningCache, B.PropTypes = B, B;
  }, $b;
}
var Vb, kw;
function F2() {
  if (kw) return Vb;
  kw = 1;
  var i = fC();
  function s() {
  }
  function f() {
  }
  return f.resetWarningCache = s, Vb = function() {
    function h(y, x, R, k, N, O) {
      if (O !== i) {
        var z = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw z.name = "Invariant Violation", z;
      }
    }
    h.isRequired = h;
    function m() {
      return h;
    }
    var S = {
      array: h,
      bigint: h,
      bool: h,
      func: h,
      number: h,
      object: h,
      string: h,
      symbol: h,
      any: h,
      arrayOf: m,
      element: h,
      elementType: h,
      instanceOf: m,
      node: h,
      objectOf: m,
      oneOf: m,
      oneOfType: m,
      shape: m,
      exact: m,
      checkPropTypes: f,
      resetWarningCache: s
    };
    return S.PropTypes = S, S;
  }, Vb;
}
if (process.env.NODE_ENV !== "production") {
  var P2 = cC(), j2 = !0;
  eC.exports = U2()(P2.isElement, j2);
} else
  eC.exports = F2()();
var $2 = eC.exports;
const K = /* @__PURE__ */ u2($2);
function ts(i) {
  let s = "https://mui.com/production-error/?code=" + i;
  for (let f = 1; f < arguments.length; f += 1)
    s += "&args[]=" + encodeURIComponent(arguments[f]);
  return "Minified MUI error #" + i + "; visit " + s + " for the full message.";
}
function Ng() {
  return Ng = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var f = arguments[s];
      for (var h in f) ({}).hasOwnProperty.call(f, h) && (i[h] = f[h]);
    }
    return i;
  }, Ng.apply(null, arguments);
}
function yR(i) {
  var s = /* @__PURE__ */ Object.create(null);
  return function(f) {
    return s[f] === void 0 && (s[f] = i(f)), s[f];
  };
}
var V2 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, B2 = /* @__PURE__ */ yR(
  function(i) {
    return V2.test(i) || i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) < 91;
  }
  /* Z+1 */
), H2 = !1;
function I2(i) {
  if (i.sheet)
    return i.sheet;
  for (var s = 0; s < document.styleSheets.length; s++)
    if (document.styleSheets[s].ownerNode === i)
      return document.styleSheets[s];
}
function Y2(i) {
  var s = document.createElement("style");
  return s.setAttribute("data-emotion", i.key), i.nonce !== void 0 && s.setAttribute("nonce", i.nonce), s.appendChild(document.createTextNode("")), s.setAttribute("data-s", ""), s;
}
var W2 = /* @__PURE__ */ function() {
  function i(f) {
    var h = this;
    this._insertTag = function(m) {
      var S;
      h.tags.length === 0 ? h.insertionPoint ? S = h.insertionPoint.nextSibling : h.prepend ? S = h.container.firstChild : S = h.before : S = h.tags[h.tags.length - 1].nextSibling, h.container.insertBefore(m, S), h.tags.push(m);
    }, this.isSpeedy = f.speedy === void 0 ? !H2 : f.speedy, this.tags = [], this.ctr = 0, this.nonce = f.nonce, this.key = f.key, this.container = f.container, this.prepend = f.prepend, this.insertionPoint = f.insertionPoint, this.before = null;
  }
  var s = i.prototype;
  return s.hydrate = function(h) {
    h.forEach(this._insertTag);
  }, s.insert = function(h) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(Y2(this));
    var m = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var S = I2(m);
      try {
        S.insertRule(h, S.cssRules.length);
      } catch {
      }
    } else
      m.appendChild(document.createTextNode(h));
    this.ctr++;
  }, s.flush = function() {
    this.tags.forEach(function(h) {
      var m;
      return (m = h.parentNode) == null ? void 0 : m.removeChild(h);
    }), this.tags = [], this.ctr = 0;
  }, i;
}(), pa = "-ms-", Lg = "-moz-", en = "-webkit-", gR = "comm", dC = "rule", pC = "decl", G2 = "@import", SR = "@keyframes", Q2 = "@layer", q2 = Math.abs, Bg = String.fromCharCode, K2 = Object.assign;
function X2(i, s) {
  return Qr(i, 0) ^ 45 ? (((s << 2 ^ Qr(i, 0)) << 2 ^ Qr(i, 1)) << 2 ^ Qr(i, 2)) << 2 ^ Qr(i, 3) : 0;
}
function bR(i) {
  return i.trim();
}
function Z2(i, s) {
  return (i = s.exec(i)) ? i[0] : i;
}
function tn(i, s, f) {
  return i.replace(s, f);
}
function tC(i, s) {
  return i.indexOf(s);
}
function Qr(i, s) {
  return i.charCodeAt(s) | 0;
}
function Zv(i, s, f) {
  return i.slice(s, f);
}
function Go(i) {
  return i.length;
}
function vC(i) {
  return i.length;
}
function gg(i, s) {
  return s.push(i), i;
}
function J2(i, s) {
  return i.map(s).join("");
}
var Hg = 1, kd = 1, CR = 0, ri = 0, mr = 0, Od = "";
function Ig(i, s, f, h, m, S, y) {
  return { value: i, root: s, parent: f, type: h, props: m, children: S, line: Hg, column: kd, length: y, return: "" };
}
function Iv(i, s) {
  return K2(Ig("", null, null, "", null, null, 0), i, { length: -i.length }, s);
}
function eN() {
  return mr;
}
function tN() {
  return mr = ri > 0 ? Qr(Od, --ri) : 0, kd--, mr === 10 && (kd = 1, Hg--), mr;
}
function gi() {
  return mr = ri < CR ? Qr(Od, ri++) : 0, kd++, mr === 10 && (kd = 1, Hg++), mr;
}
function Xo() {
  return Qr(Od, ri);
}
function _g() {
  return ri;
}
function rh(i, s) {
  return Zv(Od, i, s);
}
function Jv(i) {
  switch (i) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function ER(i) {
  return Hg = kd = 1, CR = Go(Od = i), ri = 0, [];
}
function TR(i) {
  return Od = "", i;
}
function kg(i) {
  return bR(rh(ri - 1, nC(i === 91 ? i + 2 : i === 40 ? i + 1 : i)));
}
function nN(i) {
  for (; (mr = Xo()) && mr < 33; )
    gi();
  return Jv(i) > 2 || Jv(mr) > 3 ? "" : " ";
}
function rN(i, s) {
  for (; --s && gi() && !(mr < 48 || mr > 102 || mr > 57 && mr < 65 || mr > 70 && mr < 97); )
    ;
  return rh(i, _g() + (s < 6 && Xo() == 32 && gi() == 32));
}
function nC(i) {
  for (; gi(); )
    switch (mr) {
      case i:
        return ri;
      case 34:
      case 39:
        i !== 34 && i !== 39 && nC(mr);
        break;
      case 40:
        i === 41 && nC(i);
        break;
      case 92:
        gi();
        break;
    }
  return ri;
}
function aN(i, s) {
  for (; gi() && i + mr !== 57; )
    if (i + mr === 84 && Xo() === 47)
      break;
  return "/*" + rh(s, ri - 1) + "*" + Bg(i === 47 ? i : gi());
}
function iN(i) {
  for (; !Jv(Xo()); )
    gi();
  return rh(i, ri);
}
function oN(i) {
  return TR(Og("", null, null, null, [""], i = ER(i), 0, [0], i));
}
function Og(i, s, f, h, m, S, y, x, R) {
  for (var k = 0, N = 0, O = y, z = 0, B = 0, H = 0, V = 1, F = 1, fe = 1, oe = 0, X = "", le = m, $ = S, be = h, ce = X; F; )
    switch (H = oe, oe = gi()) {
      case 40:
        if (H != 108 && Qr(ce, O - 1) == 58) {
          tC(ce += tn(kg(oe), "&", "&\f"), "&\f") != -1 && (fe = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        ce += kg(oe);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        ce += nN(H);
        break;
      case 92:
        ce += rN(_g() - 1, 7);
        continue;
      case 47:
        switch (Xo()) {
          case 42:
          case 47:
            gg(lN(aN(gi(), _g()), s, f), R);
            break;
          default:
            ce += "/";
        }
        break;
      case 123 * V:
        x[k++] = Go(ce) * fe;
      case 125 * V:
      case 59:
      case 0:
        switch (oe) {
          case 0:
          case 125:
            F = 0;
          case 59 + N:
            fe == -1 && (ce = tn(ce, /\f/g, "")), B > 0 && Go(ce) - O && gg(B > 32 ? Dw(ce + ";", h, f, O - 1) : Dw(tn(ce, " ", "") + ";", h, f, O - 2), R);
            break;
          case 59:
            ce += ";";
          default:
            if (gg(be = Ow(ce, s, f, k, N, m, x, X, le = [], $ = [], O), S), oe === 123)
              if (N === 0)
                Og(ce, s, be, be, le, S, O, x, $);
              else
                switch (z === 99 && Qr(ce, 3) === 110 ? 100 : z) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Og(i, be, be, h && gg(Ow(i, be, be, 0, 0, m, x, X, m, le = [], O), $), m, $, O, x, h ? le : $);
                    break;
                  default:
                    Og(ce, be, be, be, [""], $, 0, x, $);
                }
        }
        k = N = B = 0, V = fe = 1, X = ce = "", O = y;
        break;
      case 58:
        O = 1 + Go(ce), B = H;
      default:
        if (V < 1) {
          if (oe == 123)
            --V;
          else if (oe == 125 && V++ == 0 && tN() == 125)
            continue;
        }
        switch (ce += Bg(oe), oe * V) {
          case 38:
            fe = N > 0 ? 1 : (ce += "\f", -1);
            break;
          case 44:
            x[k++] = (Go(ce) - 1) * fe, fe = 1;
            break;
          case 64:
            Xo() === 45 && (ce += kg(gi())), z = Xo(), N = O = Go(X = ce += iN(_g())), oe++;
            break;
          case 45:
            H === 45 && Go(ce) == 2 && (V = 0);
        }
    }
  return S;
}
function Ow(i, s, f, h, m, S, y, x, R, k, N) {
  for (var O = m - 1, z = m === 0 ? S : [""], B = vC(z), H = 0, V = 0, F = 0; H < h; ++H)
    for (var fe = 0, oe = Zv(i, O + 1, O = q2(V = y[H])), X = i; fe < B; ++fe)
      (X = bR(V > 0 ? z[fe] + " " + oe : tn(oe, /&\f/g, z[fe]))) && (R[F++] = X);
  return Ig(i, s, f, m === 0 ? dC : x, R, k, N);
}
function lN(i, s, f) {
  return Ig(i, s, f, gR, Bg(eN()), Zv(i, 2, -2), 0);
}
function Dw(i, s, f, h) {
  return Ig(i, s, f, pC, Zv(i, 0, h), Zv(i, h + 1, -1), h);
}
function Rd(i, s) {
  for (var f = "", h = vC(i), m = 0; m < h; m++)
    f += s(i[m], m, i, s) || "";
  return f;
}
function uN(i, s, f, h) {
  switch (i.type) {
    case Q2:
      if (i.children.length) break;
    case G2:
    case pC:
      return i.return = i.return || i.value;
    case gR:
      return "";
    case SR:
      return i.return = i.value + "{" + Rd(i.children, h) + "}";
    case dC:
      i.value = i.props.join(",");
  }
  return Go(f = Rd(i.children, h)) ? i.return = i.value + "{" + f + "}" : "";
}
function sN(i) {
  var s = vC(i);
  return function(f, h, m, S) {
    for (var y = "", x = 0; x < s; x++)
      y += i[x](f, h, m, S) || "";
    return y;
  };
}
function cN(i) {
  return function(s) {
    s.root || (s = s.return) && i(s);
  };
}
var fN = function(s, f, h) {
  for (var m = 0, S = 0; m = S, S = Xo(), m === 38 && S === 12 && (f[h] = 1), !Jv(S); )
    gi();
  return rh(s, ri);
}, dN = function(s, f) {
  var h = -1, m = 44;
  do
    switch (Jv(m)) {
      case 0:
        m === 38 && Xo() === 12 && (f[h] = 1), s[h] += fN(ri - 1, f, h);
        break;
      case 2:
        s[h] += kg(m);
        break;
      case 4:
        if (m === 44) {
          s[++h] = Xo() === 58 ? "&\f" : "", f[h] = s[h].length;
          break;
        }
      default:
        s[h] += Bg(m);
    }
  while (m = gi());
  return s;
}, pN = function(s, f) {
  return TR(dN(ER(s), f));
}, Aw = /* @__PURE__ */ new WeakMap(), vN = function(s) {
  if (!(s.type !== "rule" || !s.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  s.length < 1)) {
    for (var f = s.value, h = s.parent, m = s.column === h.column && s.line === h.line; h.type !== "rule"; )
      if (h = h.parent, !h) return;
    if (!(s.props.length === 1 && f.charCodeAt(0) !== 58 && !Aw.get(h)) && !m) {
      Aw.set(s, !0);
      for (var S = [], y = pN(f, S), x = h.props, R = 0, k = 0; R < y.length; R++)
        for (var N = 0; N < x.length; N++, k++)
          s.props[k] = S[R] ? y[R].replace(/&\f/g, x[N]) : x[N] + " " + y[R];
    }
  }
}, hN = function(s) {
  if (s.type === "decl") {
    var f = s.value;
    // charcode for l
    f.charCodeAt(0) === 108 && // charcode for b
    f.charCodeAt(2) === 98 && (s.return = "", s.value = "");
  }
};
function xR(i, s) {
  switch (X2(i, s)) {
    case 5103:
      return en + "print-" + i + i;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return en + i + i;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return en + i + Lg + i + pa + i + i;
    case 6828:
    case 4268:
      return en + i + pa + i + i;
    case 6165:
      return en + i + pa + "flex-" + i + i;
    case 5187:
      return en + i + tn(i, /(\w+).+(:[^]+)/, en + "box-$1$2" + pa + "flex-$1$2") + i;
    case 5443:
      return en + i + pa + "flex-item-" + tn(i, /flex-|-self/, "") + i;
    case 4675:
      return en + i + pa + "flex-line-pack" + tn(i, /align-content|flex-|-self/, "") + i;
    case 5548:
      return en + i + pa + tn(i, "shrink", "negative") + i;
    case 5292:
      return en + i + pa + tn(i, "basis", "preferred-size") + i;
    case 6060:
      return en + "box-" + tn(i, "-grow", "") + en + i + pa + tn(i, "grow", "positive") + i;
    case 4554:
      return en + tn(i, /([^-])(transform)/g, "$1" + en + "$2") + i;
    case 6187:
      return tn(tn(tn(i, /(zoom-|grab)/, en + "$1"), /(image-set)/, en + "$1"), i, "") + i;
    case 5495:
    case 3959:
      return tn(i, /(image-set\([^]*)/, en + "$1$`$1");
    case 4968:
      return tn(tn(i, /(.+:)(flex-)?(.*)/, en + "box-pack:$3" + pa + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + en + i + i;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return tn(i, /(.+)-inline(.+)/, en + "$1$2") + i;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (Go(i) - 1 - s > 6) switch (Qr(i, s + 1)) {
        case 109:
          if (Qr(i, s + 4) !== 45) break;
        case 102:
          return tn(i, /(.+:)(.+)-([^]+)/, "$1" + en + "$2-$3$1" + Lg + (Qr(i, s + 3) == 108 ? "$3" : "$2-$3")) + i;
        case 115:
          return ~tC(i, "stretch") ? xR(tn(i, "stretch", "fill-available"), s) + i : i;
      }
      break;
    case 4949:
      if (Qr(i, s + 1) !== 115) break;
    case 6444:
      switch (Qr(i, Go(i) - 3 - (~tC(i, "!important") && 10))) {
        case 107:
          return tn(i, ":", ":" + en) + i;
        case 101:
          return tn(i, /(.+:)([^;!]+)(;|!.+)?/, "$1" + en + (Qr(i, 14) === 45 ? "inline-" : "") + "box$3$1" + en + "$2$3$1" + pa + "$2box$3") + i;
      }
      break;
    case 5936:
      switch (Qr(i, s + 11)) {
        case 114:
          return en + i + pa + tn(i, /[svh]\w+-[tblr]{2}/, "tb") + i;
        case 108:
          return en + i + pa + tn(i, /[svh]\w+-[tblr]{2}/, "tb-rl") + i;
        case 45:
          return en + i + pa + tn(i, /[svh]\w+-[tblr]{2}/, "lr") + i;
      }
      return en + i + pa + i + i;
  }
  return i;
}
var mN = function(s, f, h, m) {
  if (s.length > -1 && !s.return) switch (s.type) {
    case pC:
      s.return = xR(s.value, s.length);
      break;
    case SR:
      return Rd([Iv(s, {
        value: tn(s.value, "@", "@" + en)
      })], m);
    case dC:
      if (s.length) return J2(s.props, function(S) {
        switch (Z2(S, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Rd([Iv(s, {
              props: [tn(S, /:(read-\w+)/, ":" + Lg + "$1")]
            })], m);
          case "::placeholder":
            return Rd([Iv(s, {
              props: [tn(S, /:(plac\w+)/, ":" + en + "input-$1")]
            }), Iv(s, {
              props: [tn(S, /:(plac\w+)/, ":" + Lg + "$1")]
            }), Iv(s, {
              props: [tn(S, /:(plac\w+)/, pa + "input-$1")]
            })], m);
        }
        return "";
      });
  }
}, yN = [mN], gN = function(s) {
  var f = s.key;
  if (f === "css") {
    var h = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(h, function(V) {
      var F = V.getAttribute("data-emotion");
      F.indexOf(" ") !== -1 && (document.head.appendChild(V), V.setAttribute("data-s", ""));
    });
  }
  var m = s.stylisPlugins || yN, S = {}, y, x = [];
  y = s.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + f + ' "]'),
    function(V) {
      for (var F = V.getAttribute("data-emotion").split(" "), fe = 1; fe < F.length; fe++)
        S[F[fe]] = !0;
      x.push(V);
    }
  );
  var R, k = [vN, hN];
  {
    var N, O = [uN, cN(function(V) {
      N.insert(V);
    })], z = sN(k.concat(m, O)), B = function(F) {
      return Rd(oN(F), z);
    };
    R = function(F, fe, oe, X) {
      N = oe, B(F ? F + "{" + fe.styles + "}" : fe.styles), X && (H.inserted[fe.name] = !0);
    };
  }
  var H = {
    key: f,
    sheet: new W2({
      key: f,
      container: y,
      nonce: s.nonce,
      speedy: s.speedy,
      prepend: s.prepend,
      insertionPoint: s.insertionPoint
    }),
    nonce: s.nonce,
    inserted: S,
    registered: {},
    insert: R
  };
  return H.sheet.hydrate(x), H;
}, wR = cC(), SN = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, bN = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, RR = {};
RR[wR.ForwardRef] = SN;
RR[wR.Memo] = bN;
var CN = !0;
function EN(i, s, f) {
  var h = "";
  return f.split(" ").forEach(function(m) {
    i[m] !== void 0 ? s.push(i[m] + ";") : m && (h += m + " ");
  }), h;
}
var _R = function(s, f, h) {
  var m = s.key + "-" + f.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (h === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  CN === !1) && s.registered[m] === void 0 && (s.registered[m] = f.styles);
}, TN = function(s, f, h) {
  _R(s, f, h);
  var m = s.key + "-" + f.name;
  if (s.inserted[f.name] === void 0) {
    var S = f;
    do
      s.insert(f === S ? "." + m : "", S, s.sheet, !0), S = S.next;
    while (S !== void 0);
  }
};
function xN(i) {
  for (var s = 0, f, h = 0, m = i.length; m >= 4; ++h, m -= 4)
    f = i.charCodeAt(h) & 255 | (i.charCodeAt(++h) & 255) << 8 | (i.charCodeAt(++h) & 255) << 16 | (i.charCodeAt(++h) & 255) << 24, f = /* Math.imul(k, m): */
    (f & 65535) * 1540483477 + ((f >>> 16) * 59797 << 16), f ^= /* k >>> r: */
    f >>> 24, s = /* Math.imul(k, m): */
    (f & 65535) * 1540483477 + ((f >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  switch (m) {
    case 3:
      s ^= (i.charCodeAt(h + 2) & 255) << 16;
    case 2:
      s ^= (i.charCodeAt(h + 1) & 255) << 8;
    case 1:
      s ^= i.charCodeAt(h) & 255, s = /* Math.imul(h, m): */
      (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  }
  return s ^= s >>> 13, s = /* Math.imul(h, m): */
  (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16), ((s ^ s >>> 15) >>> 0).toString(36);
}
var wN = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  scale: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}, RN = !1, _N = /[A-Z]|^ms/g, kN = /_EMO_([^_]+?)_([^]*?)_EMO_/g, kR = function(s) {
  return s.charCodeAt(1) === 45;
}, Mw = function(s) {
  return s != null && typeof s != "boolean";
}, Bb = /* @__PURE__ */ yR(function(i) {
  return kR(i) ? i : i.replace(_N, "-$&").toLowerCase();
}), Nw = function(s, f) {
  switch (s) {
    case "animation":
    case "animationName":
      if (typeof f == "string")
        return f.replace(kN, function(h, m, S) {
          return Qo = {
            name: m,
            styles: S,
            next: Qo
          }, m;
        });
  }
  return wN[s] !== 1 && !kR(s) && typeof f == "number" && f !== 0 ? f + "px" : f;
}, ON = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function eh(i, s, f) {
  if (f == null)
    return "";
  var h = f;
  if (h.__emotion_styles !== void 0)
    return h;
  switch (typeof f) {
    case "boolean":
      return "";
    case "object": {
      var m = f;
      if (m.anim === 1)
        return Qo = {
          name: m.name,
          styles: m.styles,
          next: Qo
        }, m.name;
      var S = f;
      if (S.styles !== void 0) {
        var y = S.next;
        if (y !== void 0)
          for (; y !== void 0; )
            Qo = {
              name: y.name,
              styles: y.styles,
              next: Qo
            }, y = y.next;
        var x = S.styles + ";";
        return x;
      }
      return DN(i, s, f);
    }
    case "function": {
      if (i !== void 0) {
        var R = Qo, k = f(i);
        return Qo = R, eh(i, s, k);
      }
      break;
    }
  }
  var N = f;
  if (s == null)
    return N;
  var O = s[N];
  return O !== void 0 ? O : N;
}
function DN(i, s, f) {
  var h = "";
  if (Array.isArray(f))
    for (var m = 0; m < f.length; m++)
      h += eh(i, s, f[m]) + ";";
  else
    for (var S in f) {
      var y = f[S];
      if (typeof y != "object") {
        var x = y;
        s != null && s[x] !== void 0 ? h += S + "{" + s[x] + "}" : Mw(x) && (h += Bb(S) + ":" + Nw(S, x) + ";");
      } else {
        if (S === "NO_COMPONENT_SELECTOR" && RN)
          throw new Error(ON);
        if (Array.isArray(y) && typeof y[0] == "string" && (s == null || s[y[0]] === void 0))
          for (var R = 0; R < y.length; R++)
            Mw(y[R]) && (h += Bb(S) + ":" + Nw(S, y[R]) + ";");
        else {
          var k = eh(i, s, y);
          switch (S) {
            case "animation":
            case "animationName": {
              h += Bb(S) + ":" + k + ";";
              break;
            }
            default:
              h += S + "{" + k + "}";
          }
        }
      }
    }
  return h;
}
var Lw = /label:\s*([^\s;{]+)\s*(;|$)/g, Qo;
function OR(i, s, f) {
  if (i.length === 1 && typeof i[0] == "object" && i[0] !== null && i[0].styles !== void 0)
    return i[0];
  var h = !0, m = "";
  Qo = void 0;
  var S = i[0];
  if (S == null || S.raw === void 0)
    h = !1, m += eh(f, s, S);
  else {
    var y = S;
    m += y[0];
  }
  for (var x = 1; x < i.length; x++)
    if (m += eh(f, s, i[x]), h) {
      var R = S;
      m += R[x];
    }
  Lw.lastIndex = 0;
  for (var k = "", N; (N = Lw.exec(m)) !== null; )
    k += "-" + N[1];
  var O = xN(m) + k;
  return {
    name: O,
    styles: m,
    next: Qo
  };
}
var AN = function(s) {
  return s();
}, MN = Ct.useInsertionEffect ? Ct.useInsertionEffect : !1, NN = MN || AN, DR = /* @__PURE__ */ Ct.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ gN({
    key: "css"
  }) : null
);
DR.Provider;
var LN = function(s) {
  return /* @__PURE__ */ r2(function(f, h) {
    var m = a2(DR);
    return s(f, m, h);
  });
}, AR = /* @__PURE__ */ Ct.createContext({});
function zN() {
  for (var i = arguments.length, s = new Array(i), f = 0; f < i; f++)
    s[f] = arguments[f];
  return OR(s);
}
var hC = function() {
  var s = zN.apply(void 0, arguments), f = "animation-" + s.name;
  return {
    name: f,
    styles: "@keyframes " + f + "{" + s.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, UN = B2, FN = function(s) {
  return s !== "theme";
}, zw = function(s) {
  return typeof s == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  s.charCodeAt(0) > 96 ? UN : FN;
}, Uw = function(s, f, h) {
  var m;
  if (f) {
    var S = f.shouldForwardProp;
    m = s.__emotion_forwardProp && S ? function(y) {
      return s.__emotion_forwardProp(y) && S(y);
    } : S;
  }
  return typeof m != "function" && h && (m = s.__emotion_forwardProp), m;
}, PN = !1, jN = function(s) {
  var f = s.cache, h = s.serialized, m = s.isStringTag;
  return _R(f, h, m), NN(function() {
    return TN(f, h, m);
  }), null;
}, $N = function i(s, f) {
  var h = s.__emotion_real === s, m = h && s.__emotion_base || s, S, y;
  f !== void 0 && (S = f.label, y = f.target);
  var x = Uw(s, f, h), R = x || zw(m), k = !R("as");
  return function() {
    var N = arguments, O = h && s.__emotion_styles !== void 0 ? s.__emotion_styles.slice(0) : [];
    if (S !== void 0 && O.push("label:" + S + ";"), N[0] == null || N[0].raw === void 0)
      O.push.apply(O, N);
    else {
      O.push(N[0][0]);
      for (var z = N.length, B = 1; B < z; B++)
        O.push(N[B], N[0][B]);
    }
    var H = LN(function(V, F, fe) {
      var oe = k && V.as || m, X = "", le = [], $ = V;
      if (V.theme == null) {
        $ = {};
        for (var be in V)
          $[be] = V[be];
        $.theme = Ct.useContext(AR);
      }
      typeof V.className == "string" ? X = EN(F.registered, le, V.className) : V.className != null && (X = V.className + " ");
      var ce = OR(O.concat(le), F.registered, $);
      X += F.key + "-" + ce.name, y !== void 0 && (X += " " + y);
      var et = k && x === void 0 ? zw(oe) : R, _ = {};
      for (var se in V)
        k && se === "as" || et(se) && (_[se] = V[se]);
      return _.className = X, fe && (_.ref = fe), /* @__PURE__ */ Ct.createElement(Ct.Fragment, null, /* @__PURE__ */ Ct.createElement(jN, {
        cache: F,
        serialized: ce,
        isStringTag: typeof oe == "string"
      }), /* @__PURE__ */ Ct.createElement(oe, _));
    });
    return H.displayName = S !== void 0 ? S : "Styled(" + (typeof m == "string" ? m : m.displayName || m.name || "Component") + ")", H.defaultProps = s.defaultProps, H.__emotion_real = H, H.__emotion_base = m, H.__emotion_styles = O, H.__emotion_forwardProp = x, Object.defineProperty(H, "toString", {
      value: function() {
        return y === void 0 && PN ? "NO_COMPONENT_SELECTOR" : "." + y;
      }
    }), H.withComponent = function(V, F) {
      return i(V, Ng({}, f, F, {
        shouldForwardProp: Uw(H, F, !0)
      })).apply(void 0, O);
    }, H;
  };
}, VN = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "marquee",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  // SVG
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
], rC = $N.bind();
VN.forEach(function(i) {
  rC[i] = rC(i);
});
/**
 * @mui/styled-engine v6.1.1
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function BN(i, s) {
  const f = rC(i, s);
  return process.env.NODE_ENV !== "production" ? (...h) => {
    const m = typeof i == "string" ? `"${i}"` : "component";
    return h.length === 0 ? console.error([`MUI: Seems like you called \`styled(${m})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : h.some((S) => S === void 0) && console.error(`MUI: the styled(${m})(...args) API requires all its args to be defined.`), f(...h);
  } : f;
}
const HN = (i, s) => {
  Array.isArray(i.__emotion_styles) && (i.__emotion_styles = s(i.__emotion_styles));
};
function qo(i) {
  if (typeof i != "object" || i === null)
    return !1;
  const s = Object.getPrototypeOf(i);
  return (s === null || s === Object.prototype || Object.getPrototypeOf(s) === null) && !(Symbol.toStringTag in i) && !(Symbol.iterator in i);
}
function MR(i) {
  if (!qo(i))
    return i;
  const s = {};
  return Object.keys(i).forEach((f) => {
    s[f] = MR(i[f]);
  }), s;
}
function Da(i, s, f = {
  clone: !0
}) {
  const h = f.clone ? {
    ...i
  } : i;
  return qo(i) && qo(s) && Object.keys(s).forEach((m) => {
    qo(s[m]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(i, m) && qo(i[m]) ? h[m] = Da(i[m], s[m], f) : f.clone ? h[m] = qo(s[m]) ? MR(s[m]) : s[m] : h[m] = s[m];
  }), h;
}
const IN = (i) => {
  const s = Object.keys(i).map((f) => ({
    key: f,
    val: i[f]
  })) || [];
  return s.sort((f, h) => f.val - h.val), s.reduce((f, h) => ({
    ...f,
    [h.key]: h.val
  }), {});
};
function YN(i) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: s = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: f = "px",
    step: h = 5,
    ...m
  } = i, S = IN(s), y = Object.keys(S);
  function x(z) {
    return `@media (min-width:${typeof s[z] == "number" ? s[z] : z}${f})`;
  }
  function R(z) {
    return `@media (max-width:${(typeof s[z] == "number" ? s[z] : z) - h / 100}${f})`;
  }
  function k(z, B) {
    const H = y.indexOf(B);
    return `@media (min-width:${typeof s[z] == "number" ? s[z] : z}${f}) and (max-width:${(H !== -1 && typeof s[y[H]] == "number" ? s[y[H]] : B) - h / 100}${f})`;
  }
  function N(z) {
    return y.indexOf(z) + 1 < y.length ? k(z, y[y.indexOf(z) + 1]) : x(z);
  }
  function O(z) {
    const B = y.indexOf(z);
    return B === 0 ? x(y[1]) : B === y.length - 1 ? R(y[B]) : k(z, y[y.indexOf(z) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: y,
    values: S,
    up: x,
    down: R,
    between: k,
    only: N,
    not: O,
    unit: f,
    ...m
  };
}
function WN(i, s) {
  if (!i.containerQueries)
    return s;
  const f = Object.keys(s).filter((h) => h.startsWith("@container")).sort((h, m) => {
    var y, x;
    const S = /min-width:\s*([0-9.]+)/;
    return +(((y = h.match(S)) == null ? void 0 : y[1]) || 0) - +(((x = m.match(S)) == null ? void 0 : x[1]) || 0);
  });
  return f.length ? f.reduce((h, m) => {
    const S = s[m];
    return delete h[m], h[m] = S, h;
  }, {
    ...s
  }) : s;
}
function GN(i, s) {
  return s === "@" || s.startsWith("@") && (i.some((f) => s.startsWith(`@${f}`)) || !!s.match(/^@\d/));
}
function QN(i, s) {
  const f = s.match(/^@([^/]+)?\/?(.+)?$/);
  if (!f) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${s})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : ts(18, `(${s})`));
    return null;
  }
  const [, h, m] = f, S = Number.isNaN(+h) ? h || 0 : +h;
  return i.containerQueries(m).up(S);
}
function qN(i) {
  const s = (S, y) => S.replace("@media", y ? `@container ${y}` : "@container");
  function f(S, y) {
    S.up = (...x) => s(i.breakpoints.up(...x), y), S.down = (...x) => s(i.breakpoints.down(...x), y), S.between = (...x) => s(i.breakpoints.between(...x), y), S.only = (...x) => s(i.breakpoints.only(...x), y), S.not = (...x) => {
      const R = s(i.breakpoints.not(...x), y);
      return R.includes("not all and") ? R.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : R;
    };
  }
  const h = {}, m = (S) => (f(h, S), h);
  return f(m), {
    ...i,
    containerQueries: m
  };
}
const KN = {
  borderRadius: 4
}, rs = process.env.NODE_ENV !== "production" ? K.oneOfType([K.number, K.string, K.object, K.array]) : {};
function qv(i, s) {
  return s ? Da(i, s, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : i;
}
const Yg = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, Fw = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (i) => `@media (min-width:${Yg[i]}px)`
}, XN = {
  containerQueries: (i) => ({
    up: (s) => {
      let f = typeof s == "number" ? s : Yg[s] || s;
      return typeof f == "number" && (f = `${f}px`), i ? `@container ${i} (min-width:${f})` : `@container (min-width:${f})`;
    }
  })
};
function vo(i, s, f) {
  const h = i.theme || {};
  if (Array.isArray(s)) {
    const S = h.breakpoints || Fw;
    return s.reduce((y, x, R) => (y[S.up(S.keys[R])] = f(s[R]), y), {});
  }
  if (typeof s == "object") {
    const S = h.breakpoints || Fw;
    return Object.keys(s).reduce((y, x) => {
      if (GN(S.keys, x)) {
        const R = QN(h.containerQueries ? h : XN, x);
        R && (y[R] = f(s[x], x));
      } else if (Object.keys(S.values || Yg).includes(x)) {
        const R = S.up(x);
        y[R] = f(s[x], x);
      } else {
        const R = x;
        y[R] = s[R];
      }
      return y;
    }, {});
  }
  return f(s);
}
function NR(i = {}) {
  var f;
  return ((f = i.keys) == null ? void 0 : f.reduce((h, m) => {
    const S = i.up(m);
    return h[S] = {}, h;
  }, {})) || {};
}
function LR(i, s) {
  return i.reduce((f, h) => {
    const m = f[h];
    return (!m || Object.keys(m).length === 0) && delete f[h], f;
  }, s);
}
function ZN(i, ...s) {
  const f = NR(i), h = [f, ...s].reduce((m, S) => Da(m, S), {});
  return LR(Object.keys(f), h);
}
function JN(i, s) {
  if (typeof i != "object")
    return {};
  const f = {}, h = Object.keys(s);
  return Array.isArray(i) ? h.forEach((m, S) => {
    S < i.length && (f[m] = !0);
  }) : h.forEach((m) => {
    i[m] != null && (f[m] = !0);
  }), f;
}
function Hb({
  values: i,
  breakpoints: s,
  base: f
}) {
  const h = f || JN(i, s), m = Object.keys(h);
  if (m.length === 0)
    return i;
  let S;
  return m.reduce((y, x, R) => (Array.isArray(i) ? (y[x] = i[R] != null ? i[R] : i[S], S = R) : typeof i == "object" ? (y[x] = i[x] != null ? i[x] : i[S], S = x) : y[x] = i, y), {});
}
function ni(i) {
  if (typeof i != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : ts(7));
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Wg(i, s, f = !0) {
  if (!s || typeof s != "string")
    return null;
  if (i && i.vars && f) {
    const h = `vars.${s}`.split(".").reduce((m, S) => m && m[S] ? m[S] : null, i);
    if (h != null)
      return h;
  }
  return s.split(".").reduce((h, m) => h && h[m] != null ? h[m] : null, i);
}
function zg(i, s, f, h = f) {
  let m;
  return typeof i == "function" ? m = i(f) : Array.isArray(i) ? m = i[f] || h : m = Wg(i, f) || h, s && (m = s(m, h, i)), m;
}
function or(i) {
  const {
    prop: s,
    cssProperty: f = i.prop,
    themeKey: h,
    transform: m
  } = i, S = (y) => {
    if (y[s] == null)
      return null;
    const x = y[s], R = y.theme, k = Wg(R, h) || {};
    return vo(y, x, (O) => {
      let z = zg(k, m, O);
      return O === z && typeof O == "string" && (z = zg(k, m, `${s}${O === "default" ? "" : ni(O)}`, O)), f === !1 ? z : {
        [f]: z
      };
    });
  };
  return S.propTypes = process.env.NODE_ENV !== "production" ? {
    [s]: rs
  } : {}, S.filterProps = [s], S;
}
function eL(i) {
  const s = {};
  return (f) => (s[f] === void 0 && (s[f] = i(f)), s[f]);
}
const tL = {
  m: "margin",
  p: "padding"
}, nL = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Pw = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, rL = eL((i) => {
  if (i.length > 2)
    if (Pw[i])
      i = Pw[i];
    else
      return [i];
  const [s, f] = i.split(""), h = tL[s], m = nL[f] || "";
  return Array.isArray(m) ? m.map((S) => h + S) : [h + m];
}), Gg = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Qg = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], aL = [...Gg, ...Qg];
function ah(i, s, f, h) {
  const m = Wg(i, s, !0) ?? f;
  return typeof m == "number" || typeof m == "string" ? (S) => typeof S == "string" ? S : (process.env.NODE_ENV !== "production" && typeof S != "number" && console.error(`MUI: Expected ${h} argument to be a number or a string, got ${S}.`), typeof m == "string" ? `calc(${S} * ${m})` : m * S) : Array.isArray(m) ? (S) => {
    if (typeof S == "string")
      return S;
    const y = Math.abs(S);
    process.env.NODE_ENV !== "production" && (Number.isInteger(y) ? y > m.length - 1 && console.error([`MUI: The value provided (${y}) overflows.`, `The supported values are: ${JSON.stringify(m)}.`, `${y} > ${m.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${s}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${s}\` as a number.`].join(`
`)));
    const x = m[y];
    return S >= 0 ? x : typeof x == "number" ? -x : `-${x}`;
  } : typeof m == "function" ? m : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${s}\` value (${m}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function qg(i) {
  return ah(i, "spacing", 8, "spacing");
}
function yc(i, s) {
  return typeof s == "string" || s == null ? s : i(s);
}
function iL(i, s) {
  return (f) => i.reduce((h, m) => (h[m] = yc(s, f), h), {});
}
function oL(i, s, f, h) {
  if (!s.includes(f))
    return null;
  const m = rL(f), S = iL(m, h), y = i[f];
  return vo(i, y, S);
}
function zR(i, s) {
  const f = qg(i.theme);
  return Object.keys(i).map((h) => oL(i, s, h, f)).reduce(qv, {});
}
function Kn(i) {
  return zR(i, Gg);
}
Kn.propTypes = process.env.NODE_ENV !== "production" ? Gg.reduce((i, s) => (i[s] = rs, i), {}) : {};
Kn.filterProps = Gg;
function Xn(i) {
  return zR(i, Qg);
}
Xn.propTypes = process.env.NODE_ENV !== "production" ? Qg.reduce((i, s) => (i[s] = rs, i), {}) : {};
Xn.filterProps = Qg;
process.env.NODE_ENV !== "production" && aL.reduce((i, s) => (i[s] = rs, i), {});
function UR(i = 8, s = qg({
  spacing: i
})) {
  if (i.mui)
    return i;
  const f = (...h) => (process.env.NODE_ENV !== "production" && (h.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${h.length}`)), (h.length === 0 ? [1] : h).map((S) => {
    const y = s(S);
    return typeof y == "number" ? `${y}px` : y;
  }).join(" "));
  return f.mui = !0, f;
}
function Kg(...i) {
  const s = i.reduce((h, m) => (m.filterProps.forEach((S) => {
    h[S] = m;
  }), h), {}), f = (h) => Object.keys(h).reduce((m, S) => s[S] ? qv(m, s[S](h)) : m, {});
  return f.propTypes = process.env.NODE_ENV !== "production" ? i.reduce((h, m) => Object.assign(h, m.propTypes), {}) : {}, f.filterProps = i.reduce((h, m) => h.concat(m.filterProps), []), f;
}
function Fi(i) {
  return typeof i != "number" ? i : `${i}px solid`;
}
function Pi(i, s) {
  return or({
    prop: i,
    themeKey: "borders",
    transform: s
  });
}
const lL = Pi("border", Fi), uL = Pi("borderTop", Fi), sL = Pi("borderRight", Fi), cL = Pi("borderBottom", Fi), fL = Pi("borderLeft", Fi), dL = Pi("borderColor"), pL = Pi("borderTopColor"), vL = Pi("borderRightColor"), hL = Pi("borderBottomColor"), mL = Pi("borderLeftColor"), yL = Pi("outline", Fi), gL = Pi("outlineColor"), Xg = (i) => {
  if (i.borderRadius !== void 0 && i.borderRadius !== null) {
    const s = ah(i.theme, "shape.borderRadius", 4, "borderRadius"), f = (h) => ({
      borderRadius: yc(s, h)
    });
    return vo(i, i.borderRadius, f);
  }
  return null;
};
Xg.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: rs
} : {};
Xg.filterProps = ["borderRadius"];
Kg(lL, uL, sL, cL, fL, dL, pL, vL, hL, mL, Xg, yL, gL);
const Zg = (i) => {
  if (i.gap !== void 0 && i.gap !== null) {
    const s = ah(i.theme, "spacing", 8, "gap"), f = (h) => ({
      gap: yc(s, h)
    });
    return vo(i, i.gap, f);
  }
  return null;
};
Zg.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: rs
} : {};
Zg.filterProps = ["gap"];
const Jg = (i) => {
  if (i.columnGap !== void 0 && i.columnGap !== null) {
    const s = ah(i.theme, "spacing", 8, "columnGap"), f = (h) => ({
      columnGap: yc(s, h)
    });
    return vo(i, i.columnGap, f);
  }
  return null;
};
Jg.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: rs
} : {};
Jg.filterProps = ["columnGap"];
const e0 = (i) => {
  if (i.rowGap !== void 0 && i.rowGap !== null) {
    const s = ah(i.theme, "spacing", 8, "rowGap"), f = (h) => ({
      rowGap: yc(s, h)
    });
    return vo(i, i.rowGap, f);
  }
  return null;
};
e0.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: rs
} : {};
e0.filterProps = ["rowGap"];
const SL = or({
  prop: "gridColumn"
}), bL = or({
  prop: "gridRow"
}), CL = or({
  prop: "gridAutoFlow"
}), EL = or({
  prop: "gridAutoColumns"
}), TL = or({
  prop: "gridAutoRows"
}), xL = or({
  prop: "gridTemplateColumns"
}), wL = or({
  prop: "gridTemplateRows"
}), RL = or({
  prop: "gridTemplateAreas"
}), _L = or({
  prop: "gridArea"
});
Kg(Zg, Jg, e0, SL, bL, CL, EL, TL, xL, wL, RL, _L);
function _d(i, s) {
  return s === "grey" ? s : i;
}
const kL = or({
  prop: "color",
  themeKey: "palette",
  transform: _d
}), OL = or({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: _d
}), DL = or({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: _d
});
Kg(kL, OL, DL);
function yi(i) {
  return i <= 1 && i !== 0 ? `${i * 100}%` : i;
}
const AL = or({
  prop: "width",
  transform: yi
}), mC = (i) => {
  if (i.maxWidth !== void 0 && i.maxWidth !== null) {
    const s = (f) => {
      var m, S, y, x, R;
      const h = ((y = (S = (m = i.theme) == null ? void 0 : m.breakpoints) == null ? void 0 : S.values) == null ? void 0 : y[f]) || Yg[f];
      return h ? ((R = (x = i.theme) == null ? void 0 : x.breakpoints) == null ? void 0 : R.unit) !== "px" ? {
        maxWidth: `${h}${i.theme.breakpoints.unit}`
      } : {
        maxWidth: h
      } : {
        maxWidth: yi(f)
      };
    };
    return vo(i, i.maxWidth, s);
  }
  return null;
};
mC.filterProps = ["maxWidth"];
const ML = or({
  prop: "minWidth",
  transform: yi
}), NL = or({
  prop: "height",
  transform: yi
}), LL = or({
  prop: "maxHeight",
  transform: yi
}), zL = or({
  prop: "minHeight",
  transform: yi
});
or({
  prop: "size",
  cssProperty: "width",
  transform: yi
});
or({
  prop: "size",
  cssProperty: "height",
  transform: yi
});
const UL = or({
  prop: "boxSizing"
});
Kg(AL, mC, ML, NL, LL, zL, UL);
const ih = {
  // borders
  border: {
    themeKey: "borders",
    transform: Fi
  },
  borderTop: {
    themeKey: "borders",
    transform: Fi
  },
  borderRight: {
    themeKey: "borders",
    transform: Fi
  },
  borderBottom: {
    themeKey: "borders",
    transform: Fi
  },
  borderLeft: {
    themeKey: "borders",
    transform: Fi
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: Fi
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Xg
  },
  // palette
  color: {
    themeKey: "palette",
    transform: _d
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: _d
  },
  backgroundColor: {
    themeKey: "palette",
    transform: _d
  },
  // spacing
  p: {
    style: Xn
  },
  pt: {
    style: Xn
  },
  pr: {
    style: Xn
  },
  pb: {
    style: Xn
  },
  pl: {
    style: Xn
  },
  px: {
    style: Xn
  },
  py: {
    style: Xn
  },
  padding: {
    style: Xn
  },
  paddingTop: {
    style: Xn
  },
  paddingRight: {
    style: Xn
  },
  paddingBottom: {
    style: Xn
  },
  paddingLeft: {
    style: Xn
  },
  paddingX: {
    style: Xn
  },
  paddingY: {
    style: Xn
  },
  paddingInline: {
    style: Xn
  },
  paddingInlineStart: {
    style: Xn
  },
  paddingInlineEnd: {
    style: Xn
  },
  paddingBlock: {
    style: Xn
  },
  paddingBlockStart: {
    style: Xn
  },
  paddingBlockEnd: {
    style: Xn
  },
  m: {
    style: Kn
  },
  mt: {
    style: Kn
  },
  mr: {
    style: Kn
  },
  mb: {
    style: Kn
  },
  ml: {
    style: Kn
  },
  mx: {
    style: Kn
  },
  my: {
    style: Kn
  },
  margin: {
    style: Kn
  },
  marginTop: {
    style: Kn
  },
  marginRight: {
    style: Kn
  },
  marginBottom: {
    style: Kn
  },
  marginLeft: {
    style: Kn
  },
  marginX: {
    style: Kn
  },
  marginY: {
    style: Kn
  },
  marginInline: {
    style: Kn
  },
  marginInlineStart: {
    style: Kn
  },
  marginInlineEnd: {
    style: Kn
  },
  marginBlock: {
    style: Kn
  },
  marginBlockStart: {
    style: Kn
  },
  marginBlockEnd: {
    style: Kn
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (i) => ({
      "@media print": {
        display: i
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: Zg
  },
  rowGap: {
    style: e0
  },
  columnGap: {
    style: Jg
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: yi
  },
  maxWidth: {
    style: mC
  },
  minWidth: {
    transform: yi
  },
  height: {
    transform: yi
  },
  maxHeight: {
    transform: yi
  },
  minHeight: {
    transform: yi
  },
  boxSizing: {},
  // typography
  font: {
    themeKey: "font"
  },
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
};
function FL(...i) {
  const s = i.reduce((h, m) => h.concat(Object.keys(m)), []), f = new Set(s);
  return i.every((h) => f.size === Object.keys(h).length);
}
function PL(i, s) {
  return typeof i == "function" ? i(s) : i;
}
function jL() {
  function i(f, h, m, S) {
    const y = {
      [f]: h,
      theme: m
    }, x = S[f];
    if (!x)
      return {
        [f]: h
      };
    const {
      cssProperty: R = f,
      themeKey: k,
      transform: N,
      style: O
    } = x;
    if (h == null)
      return null;
    if (k === "typography" && h === "inherit")
      return {
        [f]: h
      };
    const z = Wg(m, k) || {};
    return O ? O(y) : vo(y, h, (H) => {
      let V = zg(z, N, H);
      return H === V && typeof H == "string" && (V = zg(z, N, `${f}${H === "default" ? "" : ni(H)}`, H)), R === !1 ? V : {
        [R]: V
      };
    });
  }
  function s(f) {
    const {
      sx: h,
      theme: m = {}
    } = f || {};
    if (!h)
      return null;
    const S = m.unstable_sxConfig ?? ih;
    function y(x) {
      let R = x;
      if (typeof x == "function")
        R = x(m);
      else if (typeof x != "object")
        return x;
      if (!R)
        return null;
      const k = NR(m.breakpoints), N = Object.keys(k);
      let O = k;
      return Object.keys(R).forEach((z) => {
        const B = PL(R[z], m);
        if (B != null)
          if (typeof B == "object")
            if (S[z])
              O = qv(O, i(z, B, m, S));
            else {
              const H = vo({
                theme: m
              }, B, (V) => ({
                [z]: V
              }));
              FL(H, B) ? O[z] = s({
                sx: B,
                theme: m
              }) : O = qv(O, H);
            }
          else
            O = qv(O, i(z, B, m, S));
      }), WN(m, LR(N, O));
    }
    return Array.isArray(h) ? h.map(y) : y(h);
  }
  return s;
}
const oh = jL();
oh.filterProps = ["sx"];
function $L(i, s) {
  var h;
  const f = this;
  if (f.vars) {
    if (!((h = f.colorSchemes) != null && h[i]) || typeof f.getColorSchemeSelector != "function")
      return {};
    let m = f.getColorSchemeSelector(i);
    return m === "&" ? s : ((m.includes("data-") || m.includes(".")) && (m = `*:where(${m.replace(/\s*&$/, "")}) &`), {
      [m]: s
    });
  }
  return f.palette.mode === i ? s : {};
}
function t0(i = {}, ...s) {
  const {
    breakpoints: f = {},
    palette: h = {},
    spacing: m,
    shape: S = {},
    ...y
  } = i, x = YN(f), R = UR(m);
  let k = Da({
    breakpoints: x,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...h
    },
    spacing: R,
    shape: {
      ...KN,
      ...S
    }
  }, y);
  return k = qN(k), k.applyStyles = $L, k = s.reduce((N, O) => Da(N, O), k), k.unstable_sxConfig = {
    ...ih,
    ...y == null ? void 0 : y.unstable_sxConfig
  }, k.unstable_sx = function(O) {
    return oh({
      sx: O,
      theme: this
    });
  }, k;
}
function VL(i) {
  return Object.keys(i).length === 0;
}
function BL(i = null) {
  const s = Ct.useContext(AR);
  return !s || VL(s) ? i : s;
}
const HL = t0();
function IL(i = HL) {
  return BL(i);
}
const YL = (i) => {
  var h;
  const s = {
    systemProps: {},
    otherProps: {}
  }, f = ((h = i == null ? void 0 : i.theme) == null ? void 0 : h.unstable_sxConfig) ?? ih;
  return Object.keys(i).forEach((m) => {
    f[m] ? s.systemProps[m] = i[m] : s.otherProps[m] = i[m];
  }), s;
};
function WL(i) {
  const {
    sx: s,
    ...f
  } = i, {
    systemProps: h,
    otherProps: m
  } = YL(f);
  let S;
  return Array.isArray(s) ? S = [h, ...s] : typeof s == "function" ? S = (...y) => {
    const x = s(...y);
    return qo(x) ? {
      ...h,
      ...x
    } : h;
  } : S = {
    ...h,
    ...s
  }, {
    ...m,
    sx: S
  };
}
const jw = (i) => i, GL = () => {
  let i = jw;
  return {
    configure(s) {
      i = s;
    },
    generate(s) {
      return i(s);
    },
    reset() {
      i = jw;
    }
  };
}, QL = GL();
function FR(i) {
  var s, f, h = "";
  if (typeof i == "string" || typeof i == "number") h += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var m = i.length;
    for (s = 0; s < m; s++) i[s] && (f = FR(i[s])) && (h && (h += " "), h += f);
  } else for (f in i) i[f] && (h && (h += " "), h += f);
  return h;
}
function mi() {
  for (var i, s, f = 0, h = "", m = arguments.length; f < m; f++) (i = arguments[f]) && (s = FR(i)) && (h && (h += " "), h += s);
  return h;
}
const qL = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function lh(i, s, f = "Mui") {
  const h = qL[s];
  return h ? `${f}-${h}` : `${QL.generate(i)}-${s}`;
}
function yC(i, s, f = "Mui") {
  const h = {};
  return s.forEach((m) => {
    h[m] = lh(i, m, f);
  }), h;
}
var aC = { exports: {} }, un = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $w;
function KL() {
  if ($w) return un;
  $w = 1;
  var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), y = Symbol.for("react.context"), x = Symbol.for("react.server_context"), R = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), H;
  H = Symbol.for("react.module.reference");
  function V(F) {
    if (typeof F == "object" && F !== null) {
      var fe = F.$$typeof;
      switch (fe) {
        case i:
          switch (F = F.type, F) {
            case f:
            case m:
            case h:
            case k:
            case N:
              return F;
            default:
              switch (F = F && F.$$typeof, F) {
                case x:
                case y:
                case R:
                case z:
                case O:
                case S:
                  return F;
                default:
                  return fe;
              }
          }
        case s:
          return fe;
      }
    }
  }
  return un.ContextConsumer = y, un.ContextProvider = S, un.Element = i, un.ForwardRef = R, un.Fragment = f, un.Lazy = z, un.Memo = O, un.Portal = s, un.Profiler = m, un.StrictMode = h, un.Suspense = k, un.SuspenseList = N, un.isAsyncMode = function() {
    return !1;
  }, un.isConcurrentMode = function() {
    return !1;
  }, un.isContextConsumer = function(F) {
    return V(F) === y;
  }, un.isContextProvider = function(F) {
    return V(F) === S;
  }, un.isElement = function(F) {
    return typeof F == "object" && F !== null && F.$$typeof === i;
  }, un.isForwardRef = function(F) {
    return V(F) === R;
  }, un.isFragment = function(F) {
    return V(F) === f;
  }, un.isLazy = function(F) {
    return V(F) === z;
  }, un.isMemo = function(F) {
    return V(F) === O;
  }, un.isPortal = function(F) {
    return V(F) === s;
  }, un.isProfiler = function(F) {
    return V(F) === m;
  }, un.isStrictMode = function(F) {
    return V(F) === h;
  }, un.isSuspense = function(F) {
    return V(F) === k;
  }, un.isSuspenseList = function(F) {
    return V(F) === N;
  }, un.isValidElementType = function(F) {
    return typeof F == "string" || typeof F == "function" || F === f || F === m || F === h || F === k || F === N || F === B || typeof F == "object" && F !== null && (F.$$typeof === z || F.$$typeof === O || F.$$typeof === S || F.$$typeof === y || F.$$typeof === R || F.$$typeof === H || F.getModuleId !== void 0);
  }, un.typeOf = V, un;
}
var sn = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vw;
function XL() {
  return Vw || (Vw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), f = Symbol.for("react.fragment"), h = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), y = Symbol.for("react.context"), x = Symbol.for("react.server_context"), R = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), N = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), B = Symbol.for("react.offscreen"), H = !1, V = !1, F = !1, fe = !1, oe = !1, X;
    X = Symbol.for("react.module.reference");
    function le(Le) {
      return !!(typeof Le == "string" || typeof Le == "function" || Le === f || Le === m || oe || Le === h || Le === k || Le === N || fe || Le === B || H || V || F || typeof Le == "object" && Le !== null && (Le.$$typeof === z || Le.$$typeof === O || Le.$$typeof === S || Le.$$typeof === y || Le.$$typeof === R || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      Le.$$typeof === X || Le.getModuleId !== void 0));
    }
    function $(Le) {
      if (typeof Le == "object" && Le !== null) {
        var Xt = Le.$$typeof;
        switch (Xt) {
          case i:
            var mn = Le.type;
            switch (mn) {
              case f:
              case m:
              case h:
              case k:
              case N:
                return mn;
              default:
                var Nn = mn && mn.$$typeof;
                switch (Nn) {
                  case x:
                  case y:
                  case R:
                  case z:
                  case O:
                  case S:
                    return Nn;
                  default:
                    return Xt;
                }
            }
          case s:
            return Xt;
        }
      }
    }
    var be = y, ce = S, et = i, _ = R, se = f, ke = z, ve = O, pe = s, Re = m, lt = h, Qe = k, bt = N, ge = !1, ze = !1;
    function I(Le) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function de(Le) {
      return ze || (ze = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Ne(Le) {
      return $(Le) === y;
    }
    function Xe(Le) {
      return $(Le) === S;
    }
    function Pe(Le) {
      return typeof Le == "object" && Le !== null && Le.$$typeof === i;
    }
    function ht(Le) {
      return $(Le) === R;
    }
    function Ie(Le) {
      return $(Le) === f;
    }
    function ut(Le) {
      return $(Le) === z;
    }
    function rt(Le) {
      return $(Le) === O;
    }
    function dt(Le) {
      return $(Le) === s;
    }
    function mt(Le) {
      return $(Le) === m;
    }
    function zt(Le) {
      return $(Le) === h;
    }
    function we(Le) {
      return $(Le) === k;
    }
    function Ut(Le) {
      return $(Le) === N;
    }
    sn.ContextConsumer = be, sn.ContextProvider = ce, sn.Element = et, sn.ForwardRef = _, sn.Fragment = se, sn.Lazy = ke, sn.Memo = ve, sn.Portal = pe, sn.Profiler = Re, sn.StrictMode = lt, sn.Suspense = Qe, sn.SuspenseList = bt, sn.isAsyncMode = I, sn.isConcurrentMode = de, sn.isContextConsumer = Ne, sn.isContextProvider = Xe, sn.isElement = Pe, sn.isForwardRef = ht, sn.isFragment = Ie, sn.isLazy = ut, sn.isMemo = rt, sn.isPortal = dt, sn.isProfiler = mt, sn.isStrictMode = zt, sn.isSuspense = we, sn.isSuspenseList = Ut, sn.isValidElementType = le, sn.typeOf = $;
  }()), sn;
}
process.env.NODE_ENV === "production" ? aC.exports = KL() : aC.exports = XL();
var Bw = aC.exports;
function PR(i, s = "") {
  return i.displayName || i.name || s;
}
function Hw(i, s, f) {
  const h = PR(s);
  return i.displayName || (h !== "" ? `${f}(${h})` : f);
}
function ZL(i) {
  if (i != null) {
    if (typeof i == "string")
      return i;
    if (typeof i == "function")
      return PR(i, "Component");
    if (typeof i == "object")
      switch (i.$$typeof) {
        case Bw.ForwardRef:
          return Hw(i, i.render, "ForwardRef");
        case Bw.Memo:
          return Hw(i, i.type, "memo");
        default:
          return;
      }
  }
}
const JL = t0();
function Ib(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
function iC(i, s, f) {
  return tz(s) ? f : s[i] || s;
}
const Sg = Symbol("mui.processed_props");
function bg(i, s, f) {
  if (Sg in i)
    return i[Sg];
  const h = {
    ...i,
    theme: iC(s, i.theme, f)
  };
  return i[Sg] = h, h[Sg] = h, h;
}
function ez(i) {
  return i ? (s, f) => f[i] : null;
}
function Dg(i, s) {
  var h;
  const f = typeof i == "function" ? i(s) : i;
  if (Array.isArray(f))
    return f.flatMap((m) => Dg(m, s));
  if (Array.isArray(f == null ? void 0 : f.variants)) {
    const {
      variants: m,
      ...S
    } = f;
    let y = S, x;
    e: for (let R = 0; R < m.length; R += 1) {
      const k = m[R];
      if (typeof k.props == "function") {
        if (x ?? (x = {
          ...s,
          ...s.ownerState,
          ownerState: s.ownerState
        }), !k.props(x))
          continue;
      } else
        for (const N in k.props)
          if (s[N] !== k.props[N] && ((h = s.ownerState) == null ? void 0 : h[N]) !== k.props[N])
            continue e;
      Array.isArray(y) || (y = [y]), typeof k.style == "function" ? (x ?? (x = {
        ...s,
        ...s.ownerState,
        ownerState: s.ownerState
      }), y.push(k.style(x))) : y.push(k.style);
    }
    return y;
  }
  return f;
}
function jR(i = {}) {
  const {
    themeId: s,
    defaultTheme: f = JL,
    rootShouldForwardProp: h = Ib,
    slotShouldForwardProp: m = Ib
  } = i, S = (x) => oh(bg(x, s, f));
  return S.__mui_systemSx = !0, (x, R = {}) => {
    HN(x, (be) => be.filter((ce) => !(ce != null && ce.__mui_systemSx)));
    const {
      name: k,
      slot: N,
      skipVariantsResolver: O,
      skipSx: z,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: B = ez(Iw(N)),
      ...H
    } = R, V = O !== void 0 ? O : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      N && N !== "Root" && N !== "root" || !1
    ), F = z || !1;
    let fe;
    process.env.NODE_ENV !== "production" && k && (fe = `${k}-${Iw(N || "Root")}`);
    let oe = Ib;
    N === "Root" || N === "root" ? oe = h : N ? oe = m : nz(x) && (oe = void 0);
    const X = BN(x, {
      shouldForwardProp: oe,
      label: fe,
      ...H
    }), le = (be) => typeof be == "function" && be.__emotion_real !== be || qo(be) ? (ce) => Dg(be, bg(ce, s, f)) : be, $ = (be, ...ce) => {
      let et = le(be);
      const _ = ce ? ce.map(le) : [];
      k && B && _.push((ve) => {
        const pe = iC(s, ve.theme, f);
        if (!pe.components || !pe.components[k] || !pe.components[k].styleOverrides)
          return null;
        const Re = pe.components[k].styleOverrides, lt = {}, Qe = bg(ve, s, f);
        for (const bt in Re)
          lt[bt] = Dg(Re[bt], Qe);
        return B(ve, lt);
      }), k && !V && _.push((ve) => {
        var lt, Qe;
        const pe = iC(s, ve.theme, f), Re = (Qe = (lt = pe == null ? void 0 : pe.components) == null ? void 0 : lt[k]) == null ? void 0 : Qe.variants;
        return Re ? Dg({
          variants: Re
        }, bg(ve, s, f)) : null;
      }), F || _.push(S);
      const se = _.length - ce.length;
      if (Array.isArray(be) && se > 0) {
        const ve = new Array(se).fill("");
        et = [...be, ...ve], et.raw = [...be.raw, ...ve];
      }
      const ke = X(et, ..._);
      if (process.env.NODE_ENV !== "production") {
        let ve;
        k && (ve = `${k}${ni(N || "")}`), ve === void 0 && (ve = `Styled(${ZL(x)})`), ke.displayName = ve;
      }
      return x.muiName && (ke.muiName = x.muiName), ke;
    };
    return X.withConfig && ($.withConfig = X.withConfig), $;
  };
}
function tz(i) {
  for (const s in i)
    return !1;
  return !0;
}
function nz(i) {
  return typeof i == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  i.charCodeAt(0) > 96;
}
function Iw(i) {
  return i && i.charAt(0).toLowerCase() + i.slice(1);
}
const rz = jR();
function th(i, s) {
  const f = {
    ...s
  };
  for (const h in i)
    if (Object.prototype.hasOwnProperty.call(i, h)) {
      const m = h;
      if (m === "components" || m === "slots")
        f[m] = {
          ...i[m],
          ...f[m]
        };
      else if (m === "componentsProps" || m === "slotProps") {
        const S = i[m], y = s[m];
        if (!y)
          f[m] = S || {};
        else if (!S)
          f[m] = y;
        else {
          f[m] = {
            ...y
          };
          for (const x in S)
            if (Object.prototype.hasOwnProperty.call(S, x)) {
              const R = x;
              f[m][R] = th(S[R], y[R]);
            }
        }
      } else f[m] === void 0 && (f[m] = i[m]);
    }
  return f;
}
function az(i) {
  const {
    theme: s,
    name: f,
    props: h
  } = i;
  return !s || !s.components || !s.components[f] || !s.components[f].defaultProps ? h : th(s.components[f].defaultProps, h);
}
function $R({
  props: i,
  name: s,
  defaultTheme: f,
  themeId: h
}) {
  let m = IL(f);
  return h && (m = m[h] || m), az({
    theme: m,
    name: s,
    props: i
  });
}
const iz = typeof window < "u" ? Ct.useLayoutEffect : Ct.useEffect;
function oz(i, s = Number.MIN_SAFE_INTEGER, f = Number.MAX_SAFE_INTEGER) {
  return Math.max(s, Math.min(i, f));
}
function gC(i, s = 0, f = 1) {
  return process.env.NODE_ENV !== "production" && (i < s || i > f) && console.error(`MUI: The value provided ${i} is out of range [${s}, ${f}].`), oz(i, s, f);
}
function lz(i) {
  i = i.slice(1);
  const s = new RegExp(`.{1,${i.length >= 6 ? 2 : 1}}`, "g");
  let f = i.match(s);
  return f && f[0].length === 1 && (f = f.map((h) => h + h)), f ? `rgb${f.length === 4 ? "a" : ""}(${f.map((h, m) => m < 3 ? parseInt(h, 16) : Math.round(parseInt(h, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ns(i) {
  if (i.type)
    return i;
  if (i.charAt(0) === "#")
    return ns(lz(i));
  const s = i.indexOf("("), f = i.substring(0, s);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(f))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${i}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : ts(9, i));
  let h = i.substring(s + 1, i.length - 1), m;
  if (f === "color") {
    if (h = h.split(" "), m = h.shift(), h.length === 4 && h[3].charAt(0) === "/" && (h[3] = h[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(m))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${m}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : ts(10, m));
  } else
    h = h.split(",");
  return h = h.map((S) => parseFloat(S)), {
    type: f,
    values: h,
    colorSpace: m
  };
}
const uz = (i) => {
  const s = ns(i);
  return s.values.slice(0, 3).map((f, h) => s.type.includes("hsl") && h !== 0 ? `${f}%` : f).join(" ");
}, Gv = (i, s) => {
  try {
    return uz(i);
  } catch {
    return s && process.env.NODE_ENV !== "production" && console.warn(s), i;
  }
};
function n0(i) {
  const {
    type: s,
    colorSpace: f
  } = i;
  let {
    values: h
  } = i;
  return s.includes("rgb") ? h = h.map((m, S) => S < 3 ? parseInt(m, 10) : m) : s.includes("hsl") && (h[1] = `${h[1]}%`, h[2] = `${h[2]}%`), s.includes("color") ? h = `${f} ${h.join(" ")}` : h = `${h.join(", ")}`, `${s}(${h})`;
}
function VR(i) {
  i = ns(i);
  const {
    values: s
  } = i, f = s[0], h = s[1] / 100, m = s[2] / 100, S = h * Math.min(m, 1 - m), y = (k, N = (k + f / 30) % 12) => m - S * Math.max(Math.min(N - 3, 9 - N, 1), -1);
  let x = "rgb";
  const R = [Math.round(y(0) * 255), Math.round(y(8) * 255), Math.round(y(4) * 255)];
  return i.type === "hsla" && (x += "a", R.push(s[3])), n0({
    type: x,
    values: R
  });
}
function oC(i) {
  i = ns(i);
  let s = i.type === "hsl" || i.type === "hsla" ? ns(VR(i)).values : i.values;
  return s = s.map((f) => (i.type !== "color" && (f /= 255), f <= 0.03928 ? f / 12.92 : ((f + 0.055) / 1.055) ** 2.4)), Number((0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]).toFixed(3));
}
function Yw(i, s) {
  const f = oC(i), h = oC(s);
  return (Math.max(f, h) + 0.05) / (Math.min(f, h) + 0.05);
}
function xd(i, s) {
  return i = ns(i), s = gC(s), (i.type === "rgb" || i.type === "hsl") && (i.type += "a"), i.type === "color" ? i.values[3] = `/${s}` : i.values[3] = s, n0(i);
}
function Cg(i, s, f) {
  try {
    return xd(i, s);
  } catch {
    return i;
  }
}
function SC(i, s) {
  if (i = ns(i), s = gC(s), i.type.includes("hsl"))
    i.values[2] *= 1 - s;
  else if (i.type.includes("rgb") || i.type.includes("color"))
    for (let f = 0; f < 3; f += 1)
      i.values[f] *= 1 - s;
  return n0(i);
}
function En(i, s, f) {
  try {
    return SC(i, s);
  } catch {
    return i;
  }
}
function bC(i, s) {
  if (i = ns(i), s = gC(s), i.type.includes("hsl"))
    i.values[2] += (100 - i.values[2]) * s;
  else if (i.type.includes("rgb"))
    for (let f = 0; f < 3; f += 1)
      i.values[f] += (255 - i.values[f]) * s;
  else if (i.type.includes("color"))
    for (let f = 0; f < 3; f += 1)
      i.values[f] += (1 - i.values[f]) * s;
  return n0(i);
}
function Tn(i, s, f) {
  try {
    return bC(i, s);
  } catch {
    return i;
  }
}
function sz(i, s = 0.15) {
  return oC(i) > 0.5 ? SC(i, s) : bC(i, s);
}
function Eg(i, s, f) {
  try {
    return sz(i, s);
  } catch {
    return i;
  }
}
function cz(i, s) {
  return process.env.NODE_ENV === "production" ? () => null : function(...h) {
    return i(...h) || s(...h);
  };
}
function fz(i) {
  const {
    prototype: s = {}
  } = i;
  return !!s.isReactComponent;
}
function dz(i, s, f, h, m) {
  const S = i[s], y = m || s;
  if (S == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let x;
  return typeof S == "function" && !fz(S) && (x = "Did you accidentally provide a plain function component instead?"), x !== void 0 ? new Error(`Invalid ${h} \`${y}\` supplied to \`${f}\`. Expected an element type that can hold a ref. ${x} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const pz = cz(K.elementType, dz), vz = K.oneOfType([K.func, K.object]);
function hz(i, s) {
  typeof i == "function" ? i(s) : i && (i.current = s);
}
function Tg(i) {
  const s = Ct.useRef(i);
  return iz(() => {
    s.current = i;
  }), Ct.useRef((...f) => (
    // @ts-expect-error hide `this`
    (0, s.current)(...f)
  )).current;
}
function Ww(...i) {
  return Ct.useMemo(() => i.every((s) => s == null) ? null : (s) => {
    i.forEach((f) => {
      hz(f, s);
    });
  }, i);
}
const Gw = {};
function BR(i, s) {
  const f = Ct.useRef(Gw);
  return f.current === Gw && (f.current = i(s)), f;
}
const mz = [];
function yz(i) {
  Ct.useEffect(i, mz);
}
class CC {
  constructor() {
    Vv(this, "currentId", null);
    Vv(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    Vv(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new CC();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(s, f) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, f();
    }, s);
  }
}
function gz() {
  const i = BR(CC.create).current;
  return yz(i.disposeEffect), i;
}
function Qw(i) {
  try {
    return i.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !/jsdom/.test(window.navigator.userAgent) && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function EC(i, s, f = void 0) {
  const h = {};
  for (const m in i) {
    const S = i[m];
    let y = "", x = !0;
    for (let R = 0; R < S.length; R += 1) {
      const k = S[R];
      k && (y += (x === !0 ? "" : " ") + s(k), x = !1, f && f[k] && (y += " " + f[k]));
    }
    h[m] = y;
  }
  return h;
}
const Sz = /* @__PURE__ */ Ct.createContext(void 0);
process.env.NODE_ENV !== "production" && (K.node, K.object);
function bz(i) {
  const {
    theme: s,
    name: f,
    props: h
  } = i;
  if (!s || !s.components || !s.components[f])
    return h;
  const m = s.components[f];
  return m.defaultProps ? th(m.defaultProps, h) : !m.styleOverrides && !m.variants ? th(m, h) : h;
}
function Cz({
  props: i,
  name: s
}) {
  const f = Ct.useContext(Sz);
  return bz({
    props: i,
    name: s,
    theme: {
      components: f
    }
  });
}
function Ez(i = "") {
  function s(...h) {
    if (!h.length)
      return "";
    const m = h[0];
    return typeof m == "string" && !m.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${i ? `${i}-` : ""}${m}${s(...h.slice(1))})` : `, ${m}`;
  }
  return (h, ...m) => `var(--${i ? `${i}-` : ""}${h}${s(...m)})`;
}
const qw = (i, s, f, h = []) => {
  let m = i;
  s.forEach((S, y) => {
    y === s.length - 1 ? Array.isArray(m) ? m[Number(S)] = f : m && typeof m == "object" && (m[S] = f) : m && typeof m == "object" && (m[S] || (m[S] = h.includes(S) ? [] : {}), m = m[S]);
  });
}, Tz = (i, s, f) => {
  function h(m, S = [], y = []) {
    Object.entries(m).forEach(([x, R]) => {
      (!f || f && !f([...S, x])) && R != null && (typeof R == "object" && Object.keys(R).length > 0 ? h(R, [...S, x], Array.isArray(R) ? [...y, x] : y) : s([...S, x], R, y));
    });
  }
  h(i);
}, xz = (i, s) => typeof s == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((h) => i.includes(h)) || i[i.length - 1].toLowerCase().includes("opacity") ? s : `${s}px` : s;
function Yb(i, s) {
  const {
    prefix: f,
    shouldSkipGeneratingVar: h
  } = s || {}, m = {}, S = {}, y = {};
  return Tz(
    i,
    (x, R, k) => {
      if ((typeof R == "string" || typeof R == "number") && (!h || !h(x, R))) {
        const N = `--${f ? `${f}-` : ""}${x.join("-")}`, O = xz(x, R);
        Object.assign(m, {
          [N]: O
        }), qw(S, x, `var(${N})`, k), qw(y, x, `var(${N}, ${O})`, k);
      }
    },
    (x) => x[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: m,
    vars: S,
    varsWithDefaults: y
  };
}
function wz(i, s = {}) {
  const {
    getSelector: f = F,
    disableCssColorScheme: h,
    colorSchemeSelector: m
  } = s, {
    colorSchemes: S = {},
    components: y,
    defaultColorScheme: x = "light",
    ...R
  } = i, {
    vars: k,
    css: N,
    varsWithDefaults: O
  } = Yb(R, s);
  let z = O;
  const B = {}, {
    [x]: H,
    ...V
  } = S;
  if (Object.entries(V || {}).forEach(([X, le]) => {
    const {
      vars: $,
      css: be,
      varsWithDefaults: ce
    } = Yb(le, s);
    z = Da(z, ce), B[X] = {
      css: be,
      vars: $
    };
  }), H) {
    const {
      css: X,
      vars: le,
      varsWithDefaults: $
    } = Yb(H, s);
    z = Da(z, $), B[x] = {
      css: X,
      vars: le
    };
  }
  function F(X, le) {
    var be, ce;
    let $ = m;
    if (m === "class" && ($ = ".%s"), m === "data" && ($ = "[data-%s]"), m != null && m.startsWith("data-") && !m.includes("%s") && ($ = `[${m}="%s"]`), X) {
      if ($ === "media")
        return i.defaultColorScheme === X ? ":root" : {
          [`@media (prefers-color-scheme: ${((ce = (be = S[X]) == null ? void 0 : be.palette) == null ? void 0 : ce.mode) || X})`]: {
            ":root": le
          }
        };
      if ($)
        return i.defaultColorScheme === X ? `:root, ${$.replace("%s", String(X))}` : $.replace("%s", String(X));
    }
    return ":root";
  }
  return {
    vars: z,
    generateThemeVars: () => {
      let X = {
        ...k
      };
      return Object.entries(B).forEach(([, {
        vars: le
      }]) => {
        X = Da(X, le);
      }), X;
    },
    generateStyleSheets: () => {
      var et, _;
      const X = [], le = i.defaultColorScheme || "light";
      function $(se, ke) {
        Object.keys(ke).length && X.push(typeof se == "string" ? {
          [se]: {
            ...ke
          }
        } : se);
      }
      $(f(void 0, {
        ...N
      }), N);
      const {
        [le]: be,
        ...ce
      } = B;
      if (be) {
        const {
          css: se
        } = be, ke = (_ = (et = S[le]) == null ? void 0 : et.palette) == null ? void 0 : _.mode, ve = !h && ke ? {
          colorScheme: ke,
          ...se
        } : {
          ...se
        };
        $(f(le, {
          ...ve
        }), ve);
      }
      return Object.entries(ce).forEach(([se, {
        css: ke
      }]) => {
        var Re, lt;
        const ve = (lt = (Re = S[se]) == null ? void 0 : Re.palette) == null ? void 0 : lt.mode, pe = !h && ve ? {
          colorScheme: ve,
          ...ke
        } : {
          ...ke
        };
        $(f(se, {
          ...pe
        }), pe);
      }), X;
    }
  };
}
function Rz(i) {
  return function(f) {
    return i === "media" ? (process.env.NODE_ENV !== "production" && f !== "light" && f !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${f}'.`), `@media (prefers-color-scheme: ${f})`) : i ? i.startsWith("data-") && !i.includes("%s") ? `[${i}="${f}"] &` : i === "class" ? `.${f} &` : i === "data" ? `[data-${f}] &` : `${i.replace("%s", f)} &` : "&";
  };
}
const _z = t0(), kz = rz("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (i, s) => s.root
});
function Oz(i) {
  return $R({
    props: i,
    name: "MuiStack",
    defaultTheme: _z
  });
}
function Dz(i, s) {
  const f = Ct.Children.toArray(i).filter(Boolean);
  return f.reduce((h, m, S) => (h.push(m), S < f.length - 1 && h.push(/* @__PURE__ */ Ct.cloneElement(s, {
    key: `separator-${S}`
  })), h), []);
}
const Az = (i) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[i], Mz = ({
  ownerState: i,
  theme: s
}) => {
  let f = {
    display: "flex",
    flexDirection: "column",
    ...vo({
      theme: s
    }, Hb({
      values: i.direction,
      breakpoints: s.breakpoints.values
    }), (h) => ({
      flexDirection: h
    }))
  };
  if (i.spacing) {
    const h = qg(s), m = Object.keys(s.breakpoints.values).reduce((R, k) => ((typeof i.spacing == "object" && i.spacing[k] != null || typeof i.direction == "object" && i.direction[k] != null) && (R[k] = !0), R), {}), S = Hb({
      values: i.direction,
      base: m
    }), y = Hb({
      values: i.spacing,
      base: m
    });
    typeof S == "object" && Object.keys(S).forEach((R, k, N) => {
      if (!S[R]) {
        const z = k > 0 ? S[N[k - 1]] : "column";
        S[R] = z;
      }
    }), f = Da(f, vo({
      theme: s
    }, y, (R, k) => i.useFlexGap ? {
      gap: yc(h, R)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Az(k ? S[k] : i.direction)}`]: yc(h, R)
      }
    }));
  }
  return f = ZN(s.breakpoints, f), f;
};
function Nz(i = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: s = kz,
    useThemeProps: f = Oz,
    componentName: h = "MuiStack"
  } = i, m = () => EC({
    root: ["root"]
  }, (R) => lh(h, R), {}), S = s(Mz), y = /* @__PURE__ */ Ct.forwardRef(function(R, k) {
    const N = f(R), O = WL(N), {
      component: z = "div",
      direction: B = "column",
      spacing: H = 0,
      divider: V,
      children: F,
      className: fe,
      useFlexGap: oe = !1,
      ...X
    } = O, le = {
      direction: B,
      spacing: H,
      useFlexGap: oe
    }, $ = m();
    return /* @__PURE__ */ $t.jsx(S, {
      as: z,
      ownerState: le,
      ref: k,
      className: mi($.root, fe),
      ...X,
      children: V ? Dz(F, V) : F
    });
  });
  return process.env.NODE_ENV !== "production" && (y.propTypes = {
    children: K.node,
    direction: K.oneOfType([K.oneOf(["column-reverse", "column", "row-reverse", "row"]), K.arrayOf(K.oneOf(["column-reverse", "column", "row-reverse", "row"])), K.object]),
    divider: K.node,
    spacing: K.oneOfType([K.arrayOf(K.oneOfType([K.number, K.string])), K.number, K.object, K.string]),
    sx: K.oneOfType([K.arrayOf(K.oneOfType([K.func, K.object, K.bool])), K.func, K.object])
  }), y;
}
const nh = {
  black: "#000",
  white: "#fff"
}, Lz = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, yd = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, gd = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, Yv = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, Sd = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, bd = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Cd = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, Kw = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: nh.white,
    default: nh.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, Wb = {
  text: {
    primary: nh.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: nh.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function Xw(i, s, f, h) {
  const m = h.light || h, S = h.dark || h * 1.5;
  i[s] || (i.hasOwnProperty(f) ? i[s] = i[f] : s === "light" ? i.light = bC(i.main, m) : s === "dark" && (i.dark = SC(i.main, S)));
}
function zz(i = "light") {
  return i === "dark" ? {
    main: Sd[200],
    light: Sd[50],
    dark: Sd[400]
  } : {
    main: Sd[700],
    light: Sd[400],
    dark: Sd[800]
  };
}
function Uz(i = "light") {
  return i === "dark" ? {
    main: yd[200],
    light: yd[50],
    dark: yd[400]
  } : {
    main: yd[500],
    light: yd[300],
    dark: yd[700]
  };
}
function Fz(i = "light") {
  return i === "dark" ? {
    main: gd[500],
    light: gd[300],
    dark: gd[700]
  } : {
    main: gd[700],
    light: gd[400],
    dark: gd[800]
  };
}
function Pz(i = "light") {
  return i === "dark" ? {
    main: bd[400],
    light: bd[300],
    dark: bd[700]
  } : {
    main: bd[700],
    light: bd[500],
    dark: bd[900]
  };
}
function jz(i = "light") {
  return i === "dark" ? {
    main: Cd[400],
    light: Cd[300],
    dark: Cd[700]
  } : {
    main: Cd[800],
    light: Cd[500],
    dark: Cd[900]
  };
}
function $z(i = "light") {
  return i === "dark" ? {
    main: Yv[400],
    light: Yv[300],
    dark: Yv[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Yv[500],
    dark: Yv[900]
  };
}
function TC(i) {
  const {
    mode: s = "light",
    contrastThreshold: f = 3,
    tonalOffset: h = 0.2,
    ...m
  } = i, S = i.primary || zz(s), y = i.secondary || Uz(s), x = i.error || Fz(s), R = i.info || Pz(s), k = i.success || jz(s), N = i.warning || $z(s);
  function O(V) {
    const F = Yw(V, Wb.text.primary) >= f ? Wb.text.primary : Kw.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const fe = Yw(V, F);
      fe < 3 && console.error([`MUI: The contrast ratio of ${fe}:1 for ${F} on ${V}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return F;
  }
  const z = ({
    color: V,
    name: F,
    mainShade: fe = 500,
    lightShade: oe = 300,
    darkShade: X = 700
  }) => {
    if (V = {
      ...V
    }, !V.main && V[fe] && (V.main = V[fe]), !V.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${F ? ` (${F})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${fe}\` property.` : ts(11, F ? ` (${F})` : "", fe));
    if (typeof V.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${F ? ` (${F})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(V.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : ts(12, F ? ` (${F})` : "", JSON.stringify(V.main)));
    return Xw(V, "light", oe, h), Xw(V, "dark", X, h), V.contrastText || (V.contrastText = O(V.main)), V;
  }, B = {
    dark: Wb,
    light: Kw
  };
  return process.env.NODE_ENV !== "production" && (B[s] || console.error(`MUI: The palette mode \`${s}\` is not supported.`)), Da({
    // A collection of common colors.
    common: {
      ...nh
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: s,
    // The colors used to represent primary interface elements for a user.
    primary: z({
      color: S,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: z({
      color: y,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: z({
      color: x,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: z({
      color: N,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: z({
      color: R,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: z({
      color: k,
      name: "success"
    }),
    // The grey colors.
    grey: Lz,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: f,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: O,
    // Generate a rich color object.
    augmentColor: z,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: h,
    // The light and dark mode object.
    ...B[s]
  }, m);
}
function Vz(i) {
  const s = {};
  return Object.entries(i).forEach((h) => {
    const [m, S] = h;
    typeof S == "object" && (s[m] = `${S.fontStyle ? `${S.fontStyle} ` : ""}${S.fontVariant ? `${S.fontVariant} ` : ""}${S.fontWeight ? `${S.fontWeight} ` : ""}${S.fontStretch ? `${S.fontStretch} ` : ""}${S.fontSize || ""}${S.lineHeight ? `/${S.lineHeight} ` : ""}${S.fontFamily || ""}`);
  }), s;
}
function Bz(i, s) {
  return {
    toolbar: {
      minHeight: 56,
      [i.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [i.up("sm")]: {
        minHeight: 64
      }
    },
    ...s
  };
}
function Hz(i) {
  return Math.round(i * 1e5) / 1e5;
}
const Zw = {
  textTransform: "uppercase"
}, Jw = '"Roboto", "Helvetica", "Arial", sans-serif';
function Iz(i, s) {
  const {
    fontFamily: f = Jw,
    // The default font size of the Material Specification.
    fontSize: h = 14,
    // px
    fontWeightLight: m = 300,
    fontWeightRegular: S = 400,
    fontWeightMedium: y = 500,
    fontWeightBold: x = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: R = 16,
    // Apply the CSS properties to all the variants.
    allVariants: k,
    pxToRem: N,
    ...O
  } = typeof s == "function" ? s(i) : s;
  process.env.NODE_ENV !== "production" && (typeof h != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof R != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const z = h / 14, B = N || ((F) => `${F / R * z}rem`), H = (F, fe, oe, X, le) => ({
    fontFamily: f,
    fontWeight: F,
    fontSize: B(fe),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: oe,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...f === Jw ? {
      letterSpacing: `${Hz(X / fe)}em`
    } : {},
    ...le,
    ...k
  }), V = {
    h1: H(m, 96, 1.167, -1.5),
    h2: H(m, 60, 1.2, -0.5),
    h3: H(S, 48, 1.167, 0),
    h4: H(S, 34, 1.235, 0.25),
    h5: H(S, 24, 1.334, 0),
    h6: H(y, 20, 1.6, 0.15),
    subtitle1: H(S, 16, 1.75, 0.15),
    subtitle2: H(y, 14, 1.57, 0.1),
    body1: H(S, 16, 1.5, 0.15),
    body2: H(S, 14, 1.43, 0.15),
    button: H(y, 14, 1.75, 0.4, Zw),
    caption: H(S, 12, 1.66, 0.4),
    overline: H(S, 12, 2.66, 1, Zw),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Da({
    htmlFontSize: R,
    pxToRem: B,
    fontFamily: f,
    fontSize: h,
    fontWeightLight: m,
    fontWeightRegular: S,
    fontWeightMedium: y,
    fontWeightBold: x,
    ...V
  }, O, {
    clone: !1
    // No need to clone deep
  });
}
const Yz = 0.2, Wz = 0.14, Gz = 0.12;
function Pn(...i) {
  return [`${i[0]}px ${i[1]}px ${i[2]}px ${i[3]}px rgba(0,0,0,${Yz})`, `${i[4]}px ${i[5]}px ${i[6]}px ${i[7]}px rgba(0,0,0,${Wz})`, `${i[8]}px ${i[9]}px ${i[10]}px ${i[11]}px rgba(0,0,0,${Gz})`].join(",");
}
const Qz = ["none", Pn(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Pn(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Pn(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Pn(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Pn(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Pn(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Pn(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Pn(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Pn(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Pn(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Pn(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Pn(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Pn(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Pn(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Pn(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Pn(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Pn(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Pn(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Pn(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Pn(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Pn(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Pn(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Pn(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Pn(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], qz = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Kz = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function eR(i) {
  return `${Math.round(i)}ms`;
}
function Xz(i) {
  if (!i)
    return 0;
  const s = i / 36;
  return Math.min(Math.round((4 + 15 * s ** 0.25 + s / 5) * 10), 3e3);
}
function Zz(i) {
  const s = {
    ...qz,
    ...i.easing
  }, f = {
    ...Kz,
    ...i.duration
  };
  return {
    getAutoHeightDuration: Xz,
    create: (m = ["all"], S = {}) => {
      const {
        duration: y = f.standard,
        easing: x = s.easeInOut,
        delay: R = 0,
        ...k
      } = S;
      if (process.env.NODE_ENV !== "production") {
        const N = (z) => typeof z == "string", O = (z) => !Number.isNaN(parseFloat(z));
        !N(m) && !Array.isArray(m) && console.error('MUI: Argument "props" must be a string or Array.'), !O(y) && !N(y) && console.error(`MUI: Argument "duration" must be a number or a string but found ${y}.`), N(x) || console.error('MUI: Argument "easing" must be a string.'), !O(R) && !N(R) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof S != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(k).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(k).join(",")}].`);
      }
      return (Array.isArray(m) ? m : [m]).map((N) => `${N} ${typeof y == "string" ? y : eR(y)} ${x} ${typeof R == "string" ? R : eR(R)}`).join(",");
    },
    ...i,
    easing: s,
    duration: f
  };
}
const Jz = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function lC(i = {}, ...s) {
  const {
    breakpoints: f,
    mixins: h = {},
    spacing: m,
    palette: S = {},
    transitions: y = {},
    typography: x = {},
    shape: R,
    ...k
  } = i;
  if (i.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : ts(20));
  const N = TC(S), O = t0(i);
  let z = Da(O, {
    mixins: Bz(O.breakpoints, h),
    palette: N,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Qz.slice(),
    typography: Iz(N, x),
    transitions: Zz(y),
    zIndex: {
      ...Jz
    }
  });
  if (z = Da(z, k), z = s.reduce((B, H) => Da(B, H), z), process.env.NODE_ENV !== "production") {
    const B = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], H = (V, F) => {
      let fe;
      for (fe in V) {
        const oe = V[fe];
        if (B.includes(fe) && Object.keys(oe).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const X = lh("", fe);
            console.error([`MUI: The \`${F}\` component increases the CSS specificity of the \`${fe}\` internal state.`, "You can not override it like this: ", JSON.stringify(V, null, 2), "", `Instead, you need to use the '&.${X}' syntax:`, JSON.stringify({
              root: {
                [`&.${X}`]: oe
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          V[fe] = {};
        }
      }
    };
    Object.keys(z.components).forEach((V) => {
      const F = z.components[V].styleOverrides;
      F && V.startsWith("Mui") && H(F, V);
    });
  }
  return z.unstable_sxConfig = {
    ...ih,
    ...k == null ? void 0 : k.unstable_sxConfig
  }, z.unstable_sx = function(H) {
    return oh({
      sx: H,
      theme: this
    });
  }, z;
}
function eU(i) {
  let s;
  return i < 1 ? s = 5.11916 * i ** 2 : s = 4.5 * Math.log(i + 1) + 2, Math.round(s * 10) / 1e3;
}
const tU = [...Array(25)].map((i, s) => {
  if (s === 0)
    return "none";
  const f = eU(s);
  return `linear-gradient(rgba(255 255 255 / ${f}), rgba(255 255 255 / ${f}))`;
});
function HR(i) {
  return {
    inputPlaceholder: i === "dark" ? 0.5 : 0.42,
    inputUnderline: i === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: i === "dark" ? 0.2 : 0.12,
    switchTrack: i === "dark" ? 0.3 : 0.38
  };
}
function IR(i) {
  return i === "dark" ? tU : [];
}
function nU(i) {
  const {
    palette: s = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: f,
    overlays: h,
    ...m
  } = i, S = TC(s);
  return {
    palette: S,
    opacity: {
      ...HR(S.mode),
      ...f
    },
    overlays: h || IR(S.mode),
    ...m
  };
}
function rU(i) {
  var s;
  return !!i[0].match(/(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/) || !!i[0].match(/sxConfig$/) || // ends with sxConfig
  i[0] === "palette" && !!((s = i[1]) != null && s.match(/(mode|contrastThreshold|tonalOffset)/));
}
const aU = (i) => [...[...Array(25)].map((s, f) => `--${i ? `${i}-` : ""}overlays-${f}`), `--${i ? `${i}-` : ""}palette-AppBar-darkBg`, `--${i ? `${i}-` : ""}palette-AppBar-darkColor`], iU = (i) => (s, f) => {
  const h = i.colorSchemeSelector;
  let m = h;
  if (h === "class" && (m = ".%s"), h === "data" && (m = "[data-%s]"), h != null && h.startsWith("data-") && !h.includes("%s") && (m = `[${h}="%s"]`), i.defaultColorScheme === s) {
    if (s === "dark") {
      const S = {};
      return aU(i.cssVarPrefix).forEach((y) => {
        S[y] = f[y], delete f[y];
      }), m === "media" ? {
        ":root": f,
        "@media (prefers-color-scheme: dark)": {
          ":root": S
        }
      } : m ? {
        [m.replace("%s", s)]: S,
        [`:root, ${m.replace("%s", s)}`]: f
      } : {
        ":root": {
          ...f,
          ...S
        }
      };
    }
    if (m && m !== "media")
      return `:root, ${m.replace("%s", String(s))}`;
  } else if (s) {
    if (m === "media")
      return {
        [`@media (prefers-color-scheme: ${String(s)})`]: {
          ":root": f
        }
      };
    if (m)
      return m.replace("%s", String(s));
  }
  return ":root";
};
function oU(i) {
  return qo(i) || typeof i > "u" || typeof i == "string" || typeof i == "boolean" || typeof i == "number" || Array.isArray(i);
}
function lU(i = {}) {
  const s = {
    ...i
  };
  function f(h) {
    const m = Object.entries(h);
    for (let S = 0; S < m.length; S++) {
      const [y, x] = m[S];
      !oU(x) || y.startsWith("unstable_") ? delete h[y] : qo(x) && (h[y] = {
        ...x
      }, f(h[y]));
    }
  }
  return f(s), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(s, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function uU(i, s) {
  s.forEach((f) => {
    i[f] || (i[f] = {});
  });
}
function ie(i, s, f) {
  !i[s] && f && (i[s] = f);
}
function Qv(i) {
  return !i || !i.startsWith("hsl") ? i : VR(i);
}
function Vl(i, s) {
  `${s}Channel` in i || (i[`${s}Channel`] = Gv(Qv(i[s]), `MUI: Can't create \`palette.${s}Channel\` because \`palette.${s}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${s}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function sU(i) {
  return typeof i == "number" ? `${i}px` : typeof i == "string" || typeof i == "function" || Array.isArray(i) ? i : "8px";
}
const Yo = (i) => {
  try {
    return i();
  } catch {
  }
}, cU = (i = "mui") => Ez(i);
function Gb(i, s, f, h) {
  if (!s)
    return;
  s = s === !0 ? {} : s;
  const m = h === "dark" ? "dark" : "light";
  if (!f) {
    i[h] = nU({
      ...s,
      palette: {
        mode: m,
        ...s == null ? void 0 : s.palette
      }
    });
    return;
  }
  const {
    palette: S,
    ...y
  } = lC({
    ...f,
    palette: {
      mode: m,
      ...s == null ? void 0 : s.palette
    }
  });
  return i[h] = {
    ...s,
    palette: S,
    opacity: {
      ...HR(m),
      ...s == null ? void 0 : s.opacity
    },
    overlays: (s == null ? void 0 : s.overlays) || IR(m)
  }, y;
}
function fU(i = {}, ...s) {
  const {
    colorSchemes: f = {
      light: !0
    },
    defaultColorScheme: h,
    disableCssColorScheme: m = !1,
    cssVarPrefix: S = "mui",
    shouldSkipGeneratingVar: y = rU,
    colorSchemeSelector: x = f.light && f.dark ? "media" : void 0,
    ...R
  } = i, k = Object.keys(f)[0], N = h || (f.light && k !== "light" ? "light" : k), O = cU(S), {
    [N]: z,
    light: B,
    dark: H,
    ...V
  } = f, F = {
    ...V
  };
  let fe = z;
  if ((N === "dark" && !("dark" in f) || N === "light" && !("light" in f)) && (fe = !0), !fe)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${N}\` option is either missing or invalid.` : ts(21, N));
  const oe = Gb(F, fe, R, N);
  B && !F.light && Gb(F, B, void 0, "light"), H && !F.dark && Gb(F, H, void 0, "dark");
  let X = {
    defaultColorScheme: N,
    ...oe,
    cssVarPrefix: S,
    colorSchemeSelector: x,
    getCssVar: O,
    colorSchemes: F,
    font: {
      ...Vz(oe.typography),
      ...oe.font
    },
    spacing: sU(R.spacing)
  };
  Object.keys(X.colorSchemes).forEach((et) => {
    const _ = X.colorSchemes[et].palette, se = (ke) => {
      const ve = ke.split("-"), pe = ve[1], Re = ve[2];
      return O(ke, _[pe][Re]);
    };
    if (_.mode === "light" && (ie(_.common, "background", "#fff"), ie(_.common, "onBackground", "#000")), _.mode === "dark" && (ie(_.common, "background", "#000"), ie(_.common, "onBackground", "#fff")), uU(_, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), _.mode === "light") {
      ie(_.Alert, "errorColor", En(_.error.light, 0.6)), ie(_.Alert, "infoColor", En(_.info.light, 0.6)), ie(_.Alert, "successColor", En(_.success.light, 0.6)), ie(_.Alert, "warningColor", En(_.warning.light, 0.6)), ie(_.Alert, "errorFilledBg", se("palette-error-main")), ie(_.Alert, "infoFilledBg", se("palette-info-main")), ie(_.Alert, "successFilledBg", se("palette-success-main")), ie(_.Alert, "warningFilledBg", se("palette-warning-main")), ie(_.Alert, "errorFilledColor", Yo(() => _.getContrastText(_.error.main))), ie(_.Alert, "infoFilledColor", Yo(() => _.getContrastText(_.info.main))), ie(_.Alert, "successFilledColor", Yo(() => _.getContrastText(_.success.main))), ie(_.Alert, "warningFilledColor", Yo(() => _.getContrastText(_.warning.main))), ie(_.Alert, "errorStandardBg", Tn(_.error.light, 0.9)), ie(_.Alert, "infoStandardBg", Tn(_.info.light, 0.9)), ie(_.Alert, "successStandardBg", Tn(_.success.light, 0.9)), ie(_.Alert, "warningStandardBg", Tn(_.warning.light, 0.9)), ie(_.Alert, "errorIconColor", se("palette-error-main")), ie(_.Alert, "infoIconColor", se("palette-info-main")), ie(_.Alert, "successIconColor", se("palette-success-main")), ie(_.Alert, "warningIconColor", se("palette-warning-main")), ie(_.AppBar, "defaultBg", se("palette-grey-100")), ie(_.Avatar, "defaultBg", se("palette-grey-400")), ie(_.Button, "inheritContainedBg", se("palette-grey-300")), ie(_.Button, "inheritContainedHoverBg", se("palette-grey-A100")), ie(_.Chip, "defaultBorder", se("palette-grey-400")), ie(_.Chip, "defaultAvatarColor", se("palette-grey-700")), ie(_.Chip, "defaultIconColor", se("palette-grey-700")), ie(_.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ie(_.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ie(_.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ie(_.LinearProgress, "primaryBg", Tn(_.primary.main, 0.62)), ie(_.LinearProgress, "secondaryBg", Tn(_.secondary.main, 0.62)), ie(_.LinearProgress, "errorBg", Tn(_.error.main, 0.62)), ie(_.LinearProgress, "infoBg", Tn(_.info.main, 0.62)), ie(_.LinearProgress, "successBg", Tn(_.success.main, 0.62)), ie(_.LinearProgress, "warningBg", Tn(_.warning.main, 0.62)), ie(_.Skeleton, "bg", `rgba(${se("palette-text-primaryChannel")} / 0.11)`), ie(_.Slider, "primaryTrack", Tn(_.primary.main, 0.62)), ie(_.Slider, "secondaryTrack", Tn(_.secondary.main, 0.62)), ie(_.Slider, "errorTrack", Tn(_.error.main, 0.62)), ie(_.Slider, "infoTrack", Tn(_.info.main, 0.62)), ie(_.Slider, "successTrack", Tn(_.success.main, 0.62)), ie(_.Slider, "warningTrack", Tn(_.warning.main, 0.62));
      const ke = Eg(_.background.default, 0.8);
      ie(_.SnackbarContent, "bg", ke), ie(_.SnackbarContent, "color", Yo(() => _.getContrastText(ke))), ie(_.SpeedDialAction, "fabHoverBg", Eg(_.background.paper, 0.15)), ie(_.StepConnector, "border", se("palette-grey-400")), ie(_.StepContent, "border", se("palette-grey-400")), ie(_.Switch, "defaultColor", se("palette-common-white")), ie(_.Switch, "defaultDisabledColor", se("palette-grey-100")), ie(_.Switch, "primaryDisabledColor", Tn(_.primary.main, 0.62)), ie(_.Switch, "secondaryDisabledColor", Tn(_.secondary.main, 0.62)), ie(_.Switch, "errorDisabledColor", Tn(_.error.main, 0.62)), ie(_.Switch, "infoDisabledColor", Tn(_.info.main, 0.62)), ie(_.Switch, "successDisabledColor", Tn(_.success.main, 0.62)), ie(_.Switch, "warningDisabledColor", Tn(_.warning.main, 0.62)), ie(_.TableCell, "border", Tn(Cg(_.divider, 1), 0.88)), ie(_.Tooltip, "bg", Cg(_.grey[700], 0.92));
    }
    if (_.mode === "dark") {
      ie(_.Alert, "errorColor", Tn(_.error.light, 0.6)), ie(_.Alert, "infoColor", Tn(_.info.light, 0.6)), ie(_.Alert, "successColor", Tn(_.success.light, 0.6)), ie(_.Alert, "warningColor", Tn(_.warning.light, 0.6)), ie(_.Alert, "errorFilledBg", se("palette-error-dark")), ie(_.Alert, "infoFilledBg", se("palette-info-dark")), ie(_.Alert, "successFilledBg", se("palette-success-dark")), ie(_.Alert, "warningFilledBg", se("palette-warning-dark")), ie(_.Alert, "errorFilledColor", Yo(() => _.getContrastText(_.error.dark))), ie(_.Alert, "infoFilledColor", Yo(() => _.getContrastText(_.info.dark))), ie(_.Alert, "successFilledColor", Yo(() => _.getContrastText(_.success.dark))), ie(_.Alert, "warningFilledColor", Yo(() => _.getContrastText(_.warning.dark))), ie(_.Alert, "errorStandardBg", En(_.error.light, 0.9)), ie(_.Alert, "infoStandardBg", En(_.info.light, 0.9)), ie(_.Alert, "successStandardBg", En(_.success.light, 0.9)), ie(_.Alert, "warningStandardBg", En(_.warning.light, 0.9)), ie(_.Alert, "errorIconColor", se("palette-error-main")), ie(_.Alert, "infoIconColor", se("palette-info-main")), ie(_.Alert, "successIconColor", se("palette-success-main")), ie(_.Alert, "warningIconColor", se("palette-warning-main")), ie(_.AppBar, "defaultBg", se("palette-grey-900")), ie(_.AppBar, "darkBg", se("palette-background-paper")), ie(_.AppBar, "darkColor", se("palette-text-primary")), ie(_.Avatar, "defaultBg", se("palette-grey-600")), ie(_.Button, "inheritContainedBg", se("palette-grey-800")), ie(_.Button, "inheritContainedHoverBg", se("palette-grey-700")), ie(_.Chip, "defaultBorder", se("palette-grey-700")), ie(_.Chip, "defaultAvatarColor", se("palette-grey-300")), ie(_.Chip, "defaultIconColor", se("palette-grey-300")), ie(_.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ie(_.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ie(_.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ie(_.LinearProgress, "primaryBg", En(_.primary.main, 0.5)), ie(_.LinearProgress, "secondaryBg", En(_.secondary.main, 0.5)), ie(_.LinearProgress, "errorBg", En(_.error.main, 0.5)), ie(_.LinearProgress, "infoBg", En(_.info.main, 0.5)), ie(_.LinearProgress, "successBg", En(_.success.main, 0.5)), ie(_.LinearProgress, "warningBg", En(_.warning.main, 0.5)), ie(_.Skeleton, "bg", `rgba(${se("palette-text-primaryChannel")} / 0.13)`), ie(_.Slider, "primaryTrack", En(_.primary.main, 0.5)), ie(_.Slider, "secondaryTrack", En(_.secondary.main, 0.5)), ie(_.Slider, "errorTrack", En(_.error.main, 0.5)), ie(_.Slider, "infoTrack", En(_.info.main, 0.5)), ie(_.Slider, "successTrack", En(_.success.main, 0.5)), ie(_.Slider, "warningTrack", En(_.warning.main, 0.5));
      const ke = Eg(_.background.default, 0.98);
      ie(_.SnackbarContent, "bg", ke), ie(_.SnackbarContent, "color", Yo(() => _.getContrastText(ke))), ie(_.SpeedDialAction, "fabHoverBg", Eg(_.background.paper, 0.15)), ie(_.StepConnector, "border", se("palette-grey-600")), ie(_.StepContent, "border", se("palette-grey-600")), ie(_.Switch, "defaultColor", se("palette-grey-300")), ie(_.Switch, "defaultDisabledColor", se("palette-grey-600")), ie(_.Switch, "primaryDisabledColor", En(_.primary.main, 0.55)), ie(_.Switch, "secondaryDisabledColor", En(_.secondary.main, 0.55)), ie(_.Switch, "errorDisabledColor", En(_.error.main, 0.55)), ie(_.Switch, "infoDisabledColor", En(_.info.main, 0.55)), ie(_.Switch, "successDisabledColor", En(_.success.main, 0.55)), ie(_.Switch, "warningDisabledColor", En(_.warning.main, 0.55)), ie(_.TableCell, "border", En(Cg(_.divider, 1), 0.68)), ie(_.Tooltip, "bg", Cg(_.grey[700], 0.92));
    }
    Vl(_.background, "default"), Vl(_.background, "paper"), Vl(_.common, "background"), Vl(_.common, "onBackground"), Vl(_, "divider"), Object.keys(_).forEach((ke) => {
      const ve = _[ke];
      ve && typeof ve == "object" && (ve.main && ie(_[ke], "mainChannel", Gv(Qv(ve.main))), ve.light && ie(_[ke], "lightChannel", Gv(Qv(ve.light))), ve.dark && ie(_[ke], "darkChannel", Gv(Qv(ve.dark))), ve.contrastText && ie(_[ke], "contrastTextChannel", Gv(Qv(ve.contrastText))), ke === "text" && (Vl(_[ke], "primary"), Vl(_[ke], "secondary")), ke === "action" && (ve.active && Vl(_[ke], "active"), ve.selected && Vl(_[ke], "selected")));
    });
  }), X = s.reduce((et, _) => Da(et, _), X);
  const le = {
    prefix: S,
    disableCssColorScheme: m,
    shouldSkipGeneratingVar: y,
    getSelector: iU(X)
  }, {
    vars: $,
    generateThemeVars: be,
    generateStyleSheets: ce
  } = wz(X, le);
  return X.vars = $, Object.entries(X.colorSchemes[X.defaultColorScheme]).forEach(([et, _]) => {
    X[et] = _;
  }), X.generateThemeVars = be, X.generateStyleSheets = ce, X.generateSpacing = function() {
    return UR(R.spacing, qg(this));
  }, X.getColorSchemeSelector = Rz(x), X.spacing = X.generateSpacing(), X.shouldSkipGeneratingVar = y, X.unstable_sxConfig = {
    ...ih,
    ...R == null ? void 0 : R.unstable_sxConfig
  }, X.unstable_sx = function(_) {
    return oh({
      sx: _,
      theme: this
    });
  }, X.toRuntimeSource = lU, X;
}
function tR(i, s, f) {
  i.colorSchemes && f && (i.colorSchemes[s] = {
    ...f !== !0 && f,
    palette: TC({
      ...f === !0 ? {} : f.palette,
      mode: s
    })
    // cast type to skip module augmentation test
  });
}
function YR(i = {}, ...s) {
  const {
    palette: f,
    cssVariables: h = !1,
    colorSchemes: m = f ? void 0 : {
      light: !0
    },
    defaultColorScheme: S = f == null ? void 0 : f.mode,
    ...y
  } = i, x = S || "light", R = m == null ? void 0 : m[x], k = {
    ...m,
    ...f ? {
      [x]: {
        ...typeof R != "boolean" && R,
        palette: f
      }
    } : void 0
  };
  if (h === !1) {
    if (!("colorSchemes" in i))
      return lC(i, ...s);
    let N = f;
    "palette" in i || k[x] && (k[x] !== !0 ? N = k[x].palette : x === "dark" && (N = {
      mode: "dark"
    }));
    const O = lC({
      ...i,
      palette: N
    }, ...s);
    return O.defaultColorScheme = x, O.colorSchemes = k, O.palette.mode === "light" && (O.colorSchemes.light = {
      ...k.light !== !0 && k.light,
      palette: O.palette
    }, tR(O, "dark", k.dark)), O.palette.mode === "dark" && (O.colorSchemes.dark = {
      ...k.dark !== !0 && k.dark,
      palette: O.palette
    }, tR(O, "light", k.light)), O;
  }
  return !f && !("light" in k) && x === "light" && (k.light = !0), fU({
    ...y,
    colorSchemes: k,
    defaultColorScheme: x,
    ...typeof h != "boolean" && h
  }, ...s);
}
const WR = YR(), GR = "$$material";
function dU(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
const QR = (i) => dU(i) && i !== "classes", gc = jR({
  themeId: GR,
  defaultTheme: WR,
  rootShouldForwardProp: QR
});
function pU({
  props: i,
  name: s
}) {
  return $R({
    props: i,
    name: s,
    defaultTheme: WR,
    themeId: GR
  });
}
const qR = Nz({
  createStyledComponent: gc("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (i, s) => s.root
  }),
  useThemeProps: (i) => pU({
    props: i,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (qR.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: K.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: K.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: K.oneOfType([K.oneOf(["column-reverse", "column", "row-reverse", "row"]), K.arrayOf(K.oneOf(["column-reverse", "column", "row-reverse", "row"])), K.object]),
  /**
   * Add an element between each child.
   */
  divider: K.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: K.oneOfType([K.arrayOf(K.oneOfType([K.number, K.string])), K.number, K.object, K.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: K.oneOfType([K.arrayOf(K.oneOfType([K.func, K.object, K.bool])), K.func, K.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: K.bool
});
const nR = {
  theme: void 0
};
function vU(i) {
  let s, f;
  return (h) => {
    let m = s;
    return (m === void 0 || h.theme !== f) && (nR.theme = h.theme, m = i(nR), s = m, f = h.theme), m;
  };
}
process.env.NODE_ENV !== "production" && (K.node, K.object.isRequired);
function xC(i) {
  return Cz(i);
}
class Ug {
  constructor() {
    Vv(this, "mountEffect", () => {
      this.shouldMount && !this.didMount && this.ref.current !== null && (this.didMount = !0, this.mounted.resolve());
    });
    this.ref = {
      current: null
    }, this.mounted = null, this.didMount = !1, this.shouldMount = !1, this.setShouldMount = null;
  }
  /** React ref to the ripple instance */
  /** If the ripple component should be mounted */
  /** Promise that resolves when the ripple component is mounted */
  /** If the ripple component has been mounted */
  /** React state hook setter */
  static create() {
    return new Ug();
  }
  static use() {
    const s = BR(Ug.create).current, [f, h] = Ct.useState(!1);
    return s.shouldMount = f, s.setShouldMount = h, Ct.useEffect(s.mountEffect, [f]), s;
  }
  mount() {
    return this.mounted || (this.mounted = mU(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  /* Ripple API */
  start(...s) {
    this.mount().then(() => {
      var f;
      return (f = this.ref.current) == null ? void 0 : f.start(...s);
    });
  }
  stop(...s) {
    this.mount().then(() => {
      var f;
      return (f = this.ref.current) == null ? void 0 : f.stop(...s);
    });
  }
  pulsate(...s) {
    this.mount().then(() => {
      var f;
      return (f = this.ref.current) == null ? void 0 : f.pulsate(...s);
    });
  }
}
function hU() {
  return Ug.use();
}
function mU() {
  let i, s;
  const f = new Promise((h, m) => {
    i = h, s = m;
  });
  return f.resolve = i, f.reject = s, f;
}
function yU(i, s) {
  if (i == null) return {};
  var f = {};
  for (var h in i) if ({}.hasOwnProperty.call(i, h)) {
    if (s.includes(h)) continue;
    f[h] = i[h];
  }
  return f;
}
function uC(i, s) {
  return uC = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(f, h) {
    return f.__proto__ = h, f;
  }, uC(i, s);
}
function gU(i, s) {
  i.prototype = Object.create(s.prototype), i.prototype.constructor = i, uC(i, s);
}
const rR = xn.createContext(null);
function SU(i) {
  if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function wC(i, s) {
  var f = function(S) {
    return s && wg(S) ? s(S) : S;
  }, h = /* @__PURE__ */ Object.create(null);
  return i && i2.map(i, function(m) {
    return m;
  }).forEach(function(m) {
    h[m.key] = f(m);
  }), h;
}
function bU(i, s) {
  i = i || {}, s = s || {};
  function f(N) {
    return N in s ? s[N] : i[N];
  }
  var h = /* @__PURE__ */ Object.create(null), m = [];
  for (var S in i)
    S in s ? m.length && (h[S] = m, m = []) : m.push(S);
  var y, x = {};
  for (var R in s) {
    if (h[R])
      for (y = 0; y < h[R].length; y++) {
        var k = h[R][y];
        x[h[R][y]] = f(k);
      }
    x[R] = f(R);
  }
  for (y = 0; y < m.length; y++)
    x[m[y]] = f(m[y]);
  return x;
}
function mc(i, s, f) {
  return f[s] != null ? f[s] : i.props[s];
}
function CU(i, s) {
  return wC(i.children, function(f) {
    return Rg(f, {
      onExited: s.bind(null, f),
      in: !0,
      appear: mc(f, "appear", i),
      enter: mc(f, "enter", i),
      exit: mc(f, "exit", i)
    });
  });
}
function EU(i, s, f) {
  var h = wC(i.children), m = bU(s, h);
  return Object.keys(m).forEach(function(S) {
    var y = m[S];
    if (wg(y)) {
      var x = S in s, R = S in h, k = s[S], N = wg(k) && !k.props.in;
      R && (!x || N) ? m[S] = Rg(y, {
        onExited: f.bind(null, y),
        in: !0,
        exit: mc(y, "exit", i),
        enter: mc(y, "enter", i)
      }) : !R && x && !N ? m[S] = Rg(y, {
        in: !1
      }) : R && x && wg(k) && (m[S] = Rg(y, {
        onExited: f.bind(null, y),
        in: k.props.in,
        exit: mc(y, "exit", i),
        enter: mc(y, "enter", i)
      }));
    }
  }), m;
}
var TU = Object.values || function(i) {
  return Object.keys(i).map(function(s) {
    return i[s];
  });
}, xU = {
  component: "div",
  childFactory: function(s) {
    return s;
  }
}, RC = /* @__PURE__ */ function(i) {
  gU(s, i);
  function s(h, m) {
    var S;
    S = i.call(this, h, m) || this;
    var y = S.handleExited.bind(SU(S));
    return S.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: y,
      firstRender: !0
    }, S;
  }
  var f = s.prototype;
  return f.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, f.componentWillUnmount = function() {
    this.mounted = !1;
  }, s.getDerivedStateFromProps = function(m, S) {
    var y = S.children, x = S.handleExited, R = S.firstRender;
    return {
      children: R ? CU(m, x) : EU(m, y, x),
      firstRender: !1
    };
  }, f.handleExited = function(m, S) {
    var y = wC(this.props.children);
    m.key in y || (m.props.onExited && m.props.onExited(S), this.mounted && this.setState(function(x) {
      var R = Ng({}, x.children);
      return delete R[m.key], {
        children: R
      };
    }));
  }, f.render = function() {
    var m = this.props, S = m.component, y = m.childFactory, x = yU(m, ["component", "childFactory"]), R = this.state.contextValue, k = TU(this.state.children).map(y);
    return delete x.appear, delete x.enter, delete x.exit, S === null ? /* @__PURE__ */ xn.createElement(rR.Provider, {
      value: R
    }, k) : /* @__PURE__ */ xn.createElement(rR.Provider, {
      value: R
    }, /* @__PURE__ */ xn.createElement(S, x, k));
  }, s;
}(xn.Component);
RC.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: K.any,
  /**
   * A set of `<Transition>` components, that are toggled `in` and out as they
   * leave. the `<TransitionGroup>` will inject specific transition props, so
   * remember to spread them through if you are wrapping the `<Transition>` as
   * with our `<Fade>` example.
   *
   * While this component is meant for multiple `Transition` or `CSSTransition`
   * children, sometimes you may want to have a single transition child with
   * content that you want to be transitioned out and in when you change it
   * (e.g. routes, images etc.) In that case you can change the `key` prop of
   * the transition child as you change its content, this will cause
   * `TransitionGroup` to transition the child out and back in.
   */
  children: K.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: K.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: K.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: K.bool,
  /**
   * You may need to apply reactive updates to a child as it is exiting.
   * This is generally done by using `cloneElement` however in the case of an exiting
   * child the element has already been removed and not accessible to the consumer.
   *
   * If you do need to update a child as it leaves you can provide a `childFactory`
   * to wrap every child, even the ones that are leaving.
   *
   * @type Function(child: ReactElement) -> ReactElement
   */
  childFactory: K.func
} : {};
RC.defaultProps = xU;
function KR(i) {
  const {
    className: s,
    classes: f,
    pulsate: h = !1,
    rippleX: m,
    rippleY: S,
    rippleSize: y,
    in: x,
    onExited: R,
    timeout: k
  } = i, [N, O] = Ct.useState(!1), z = mi(s, f.ripple, f.rippleVisible, h && f.ripplePulsate), B = {
    width: y,
    height: y,
    top: -(y / 2) + S,
    left: -(y / 2) + m
  }, H = mi(f.child, N && f.childLeaving, h && f.childPulsate);
  return !x && !N && O(!0), Ct.useEffect(() => {
    if (!x && R != null) {
      const V = setTimeout(R, k);
      return () => {
        clearTimeout(V);
      };
    }
  }, [R, x, k]), /* @__PURE__ */ $t.jsx("span", {
    className: z,
    style: B,
    children: /* @__PURE__ */ $t.jsx("span", {
      className: H
    })
  });
}
process.env.NODE_ENV !== "production" && (KR.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: K.object.isRequired,
  className: K.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: K.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: K.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: K.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: K.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: K.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: K.number,
  /**
   * exit delay
   */
  timeout: K.number.isRequired
});
const Ui = yC("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), sC = 550, wU = 80, RU = hC`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, _U = hC`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, kU = hC`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, OU = gc("span", {
  name: "MuiTouchRipple",
  slot: "Root"
})({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  zIndex: 0,
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit"
}), DU = gc(KR, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${Ui.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${RU};
    animation-duration: ${sC}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  &.${Ui.ripplePulsate} {
    animation-duration: ${({
  theme: i
}) => i.transitions.duration.shorter}ms;
  }

  & .${Ui.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${Ui.childLeaving} {
    opacity: 0;
    animation-name: ${_U};
    animation-duration: ${sC}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  & .${Ui.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${kU};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, XR = /* @__PURE__ */ Ct.forwardRef(function(s, f) {
  const h = xC({
    props: s,
    name: "MuiTouchRipple"
  }), {
    center: m = !1,
    classes: S = {},
    className: y,
    ...x
  } = h, [R, k] = Ct.useState([]), N = Ct.useRef(0), O = Ct.useRef(null);
  Ct.useEffect(() => {
    O.current && (O.current(), O.current = null);
  }, [R]);
  const z = Ct.useRef(!1), B = gz(), H = Ct.useRef(null), V = Ct.useRef(null), F = Ct.useCallback((le) => {
    const {
      pulsate: $,
      rippleX: be,
      rippleY: ce,
      rippleSize: et,
      cb: _
    } = le;
    k((se) => [...se, /* @__PURE__ */ $t.jsx(DU, {
      classes: {
        ripple: mi(S.ripple, Ui.ripple),
        rippleVisible: mi(S.rippleVisible, Ui.rippleVisible),
        ripplePulsate: mi(S.ripplePulsate, Ui.ripplePulsate),
        child: mi(S.child, Ui.child),
        childLeaving: mi(S.childLeaving, Ui.childLeaving),
        childPulsate: mi(S.childPulsate, Ui.childPulsate)
      },
      timeout: sC,
      pulsate: $,
      rippleX: be,
      rippleY: ce,
      rippleSize: et
    }, N.current)]), N.current += 1, O.current = _;
  }, [S]), fe = Ct.useCallback((le = {}, $ = {}, be = () => {
  }) => {
    const {
      pulsate: ce = !1,
      center: et = m || $.pulsate,
      fakeElement: _ = !1
      // For test purposes
    } = $;
    if ((le == null ? void 0 : le.type) === "mousedown" && z.current) {
      z.current = !1;
      return;
    }
    (le == null ? void 0 : le.type) === "touchstart" && (z.current = !0);
    const se = _ ? null : V.current, ke = se ? se.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let ve, pe, Re;
    if (et || le === void 0 || le.clientX === 0 && le.clientY === 0 || !le.clientX && !le.touches)
      ve = Math.round(ke.width / 2), pe = Math.round(ke.height / 2);
    else {
      const {
        clientX: lt,
        clientY: Qe
      } = le.touches && le.touches.length > 0 ? le.touches[0] : le;
      ve = Math.round(lt - ke.left), pe = Math.round(Qe - ke.top);
    }
    if (et)
      Re = Math.sqrt((2 * ke.width ** 2 + ke.height ** 2) / 3), Re % 2 === 0 && (Re += 1);
    else {
      const lt = Math.max(Math.abs((se ? se.clientWidth : 0) - ve), ve) * 2 + 2, Qe = Math.max(Math.abs((se ? se.clientHeight : 0) - pe), pe) * 2 + 2;
      Re = Math.sqrt(lt ** 2 + Qe ** 2);
    }
    le != null && le.touches ? H.current === null && (H.current = () => {
      F({
        pulsate: ce,
        rippleX: ve,
        rippleY: pe,
        rippleSize: Re,
        cb: be
      });
    }, B.start(wU, () => {
      H.current && (H.current(), H.current = null);
    })) : F({
      pulsate: ce,
      rippleX: ve,
      rippleY: pe,
      rippleSize: Re,
      cb: be
    });
  }, [m, F, B]), oe = Ct.useCallback(() => {
    fe({}, {
      pulsate: !0
    });
  }, [fe]), X = Ct.useCallback((le, $) => {
    if (B.clear(), (le == null ? void 0 : le.type) === "touchend" && H.current) {
      H.current(), H.current = null, B.start(0, () => {
        X(le, $);
      });
      return;
    }
    H.current = null, k((be) => be.length > 0 ? be.slice(1) : be), O.current = $;
  }, [B]);
  return Ct.useImperativeHandle(f, () => ({
    pulsate: oe,
    start: fe,
    stop: X
  }), [oe, fe, X]), /* @__PURE__ */ $t.jsx(OU, {
    className: mi(Ui.root, S.root, y),
    ref: V,
    ...x,
    children: /* @__PURE__ */ $t.jsx(RC, {
      component: null,
      exit: !0,
      children: R
    })
  });
});
process.env.NODE_ENV !== "production" && (XR.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: K.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: K.object,
  /**
   * @ignore
   */
  className: K.string
});
function AU(i) {
  return lh("MuiButtonBase", i);
}
const MU = yC("MuiButtonBase", ["root", "disabled", "focusVisible"]), NU = (i) => {
  const {
    disabled: s,
    focusVisible: f,
    focusVisibleClassName: h,
    classes: m
  } = i, y = EC({
    root: ["root", s && "disabled", f && "focusVisible"]
  }, AU, m);
  return f && h && (y.root += ` ${h}`), y;
}, LU = gc("button", {
  name: "MuiButtonBase",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  // Reset default value
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0,
  border: 0,
  margin: 0,
  // Remove the margin in Safari
  borderRadius: 0,
  padding: 0,
  // Remove the padding in Firefox
  cursor: "pointer",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  // Reset
  WebkitAppearance: "none",
  // Reset
  textDecoration: "none",
  // So we take precedent over the style of a native <a /> element.
  color: "inherit",
  "&::-moz-focus-inner": {
    borderStyle: "none"
    // Remove Firefox dotted outline.
  },
  [`&.${MU.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), ZR = /* @__PURE__ */ Ct.forwardRef(function(s, f) {
  const h = xC({
    props: s,
    name: "MuiButtonBase"
  }), {
    action: m,
    centerRipple: S = !1,
    children: y,
    className: x,
    component: R = "button",
    disabled: k = !1,
    disableRipple: N = !1,
    disableTouchRipple: O = !1,
    focusRipple: z = !1,
    focusVisibleClassName: B,
    LinkComponent: H = "a",
    onBlur: V,
    onClick: F,
    onContextMenu: fe,
    onDragLeave: oe,
    onFocus: X,
    onFocusVisible: le,
    onKeyDown: $,
    onKeyUp: be,
    onMouseDown: ce,
    onMouseLeave: et,
    onMouseUp: _,
    onTouchEnd: se,
    onTouchMove: ke,
    onTouchStart: ve,
    tabIndex: pe = 0,
    TouchRippleProps: Re,
    touchRippleRef: lt,
    type: Qe,
    ...bt
  } = h, ge = Ct.useRef(null), ze = hU(), I = Ww(ze.ref, lt), [de, Ne] = Ct.useState(!1);
  k && de && Ne(!1), Ct.useImperativeHandle(m, () => ({
    focusVisible: () => {
      Ne(!0), ge.current.focus();
    }
  }), []);
  const Xe = ze.shouldMount && !N && !k;
  Ct.useEffect(() => {
    de && z && !N && ze.pulsate();
  }, [N, z, de, ze]);
  function Pe(te, Ve, Et = O) {
    return Tg((Bt) => (Ve && Ve(Bt), Et || ze[te](Bt), !0));
  }
  const ht = Pe("start", ce), Ie = Pe("stop", fe), ut = Pe("stop", oe), rt = Pe("stop", _), dt = Pe("stop", (te) => {
    de && te.preventDefault(), et && et(te);
  }), mt = Pe("start", ve), zt = Pe("stop", se), we = Pe("stop", ke), Ut = Pe("stop", (te) => {
    Qw(te.target) || Ne(!1), V && V(te);
  }, !1), Le = Tg((te) => {
    ge.current || (ge.current = te.currentTarget), Qw(te.target) && (Ne(!0), le && le(te)), X && X(te);
  }), Xt = () => {
    const te = ge.current;
    return R && R !== "button" && !(te.tagName === "A" && te.href);
  }, mn = Tg((te) => {
    z && !te.repeat && de && te.key === " " && ze.stop(te, () => {
      ze.start(te);
    }), te.target === te.currentTarget && Xt() && te.key === " " && te.preventDefault(), $ && $(te), te.target === te.currentTarget && Xt() && te.key === "Enter" && !k && (te.preventDefault(), F && F(te));
  }), Nn = Tg((te) => {
    z && te.key === " " && de && !te.defaultPrevented && ze.stop(te, () => {
      ze.pulsate(te);
    }), be && be(te), F && te.target === te.currentTarget && Xt() && te.key === " " && !te.defaultPrevented && F(te);
  });
  let A = R;
  A === "button" && (bt.href || bt.to) && (A = H);
  const W = {};
  A === "button" ? (W.type = Qe === void 0 ? "button" : Qe, W.disabled = k) : (!bt.href && !bt.to && (W.role = "button"), k && (W["aria-disabled"] = k));
  const ne = Ww(f, ge), _e = {
    ...h,
    centerRipple: S,
    component: R,
    disabled: k,
    disableRipple: N,
    disableTouchRipple: O,
    focusRipple: z,
    tabIndex: pe,
    focusVisible: de
  }, Te = NU(_e);
  return /* @__PURE__ */ $t.jsxs(LU, {
    as: A,
    className: mi(Te.root, x),
    ownerState: _e,
    onBlur: Ut,
    onClick: F,
    onContextMenu: Ie,
    onFocus: Le,
    onKeyDown: mn,
    onKeyUp: Nn,
    onMouseDown: ht,
    onMouseLeave: dt,
    onMouseUp: rt,
    onDragLeave: ut,
    onTouchEnd: zt,
    onTouchMove: we,
    onTouchStart: mt,
    ref: ne,
    tabIndex: k ? -1 : pe,
    type: Qe,
    ...W,
    ...bt,
    children: [y, Xe ? /* @__PURE__ */ $t.jsx(XR, {
      ref: I,
      center: S,
      ...Re
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (ZR.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: vz,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: K.bool,
  /**
   * The content of the component.
   */
  children: K.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: K.object,
  /**
   * @ignore
   */
  className: K.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: pz,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: K.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: K.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: K.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: K.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: K.string,
  /**
   * @ignore
   */
  href: K.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: K.elementType,
  /**
   * @ignore
   */
  onBlur: K.func,
  /**
   * @ignore
   */
  onClick: K.func,
  /**
   * @ignore
   */
  onContextMenu: K.func,
  /**
   * @ignore
   */
  onDragLeave: K.func,
  /**
   * @ignore
   */
  onFocus: K.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: K.func,
  /**
   * @ignore
   */
  onKeyDown: K.func,
  /**
   * @ignore
   */
  onKeyUp: K.func,
  /**
   * @ignore
   */
  onMouseDown: K.func,
  /**
   * @ignore
   */
  onMouseLeave: K.func,
  /**
   * @ignore
   */
  onMouseUp: K.func,
  /**
   * @ignore
   */
  onTouchEnd: K.func,
  /**
   * @ignore
   */
  onTouchMove: K.func,
  /**
   * @ignore
   */
  onTouchStart: K.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: K.oneOfType([K.arrayOf(K.oneOfType([K.func, K.object, K.bool])), K.func, K.object]),
  /**
   * @default 0
   */
  tabIndex: K.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: K.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: K.oneOfType([K.func, K.shape({
    current: K.shape({
      pulsate: K.func.isRequired,
      start: K.func.isRequired,
      stop: K.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: K.oneOfType([K.oneOf(["button", "reset", "submit"]), K.string])
});
function zU(i) {
  return typeof i.main == "string";
}
function UU(i, s = []) {
  if (!zU(i))
    return !1;
  for (const f of s)
    if (!i.hasOwnProperty(f) || typeof i[f] != "string")
      return !1;
  return !0;
}
function FU(i = []) {
  return ([, s]) => s && UU(s, i);
}
function PU(i) {
  return lh("MuiButton", i);
}
const Ed = yC("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), JR = /* @__PURE__ */ Ct.createContext({});
process.env.NODE_ENV !== "production" && (JR.displayName = "ButtonGroupContext");
const e_ = /* @__PURE__ */ Ct.createContext(void 0);
process.env.NODE_ENV !== "production" && (e_.displayName = "ButtonGroupButtonContext");
const jU = (i) => {
  const {
    color: s,
    disableElevation: f,
    fullWidth: h,
    size: m,
    variant: S,
    classes: y
  } = i, x = {
    root: ["root", S, `${S}${ni(s)}`, `size${ni(m)}`, `${S}Size${ni(m)}`, `color${ni(s)}`, f && "disableElevation", h && "fullWidth"],
    label: ["label"],
    startIcon: ["icon", "startIcon", `iconSize${ni(m)}`],
    endIcon: ["icon", "endIcon", `iconSize${ni(m)}`]
  }, R = EC(x, PU, y);
  return {
    ...y,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...R
  };
}, t_ = [{
  props: {
    size: "small"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 18
    }
  }
}, {
  props: {
    size: "medium"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 20
    }
  }
}, {
  props: {
    size: "large"
  },
  style: {
    "& > *:nth-of-type(1)": {
      fontSize: 22
    }
  }
}], $U = gc(ZR, {
  shouldForwardProp: (i) => QR(i) || i === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: f
    } = i;
    return [s.root, s[f.variant], s[`${f.variant}${ni(f.color)}`], s[`size${ni(f.size)}`], s[`${f.variant}Size${ni(f.size)}`], f.color === "inherit" && s.colorInherit, f.disableElevation && s.disableElevation, f.fullWidth && s.fullWidth];
  }
})(vU(({
  theme: i
}) => {
  var h, m;
  const s = i.palette.mode === "light" ? i.palette.grey[300] : i.palette.grey[800], f = i.palette.mode === "light" ? i.palette.grey.A100 : i.palette.grey[700];
  return {
    ...i.typography.button,
    minWidth: 64,
    padding: "6px 16px",
    border: 0,
    borderRadius: (i.vars || i).shape.borderRadius,
    transition: i.transitions.create(["background-color", "box-shadow", "border-color", "color"], {
      duration: i.transitions.duration.short
    }),
    "&:hover": {
      textDecoration: "none"
    },
    [`&.${Ed.disabled}`]: {
      color: (i.vars || i).palette.action.disabled
    },
    variants: [{
      props: {
        variant: "contained"
      },
      style: {
        color: "var(--variant-containedColor)",
        backgroundColor: "var(--variant-containedBg)",
        boxShadow: (i.vars || i).shadows[2],
        "&:hover": {
          boxShadow: (i.vars || i).shadows[4],
          // Reset on touch devices, it doesn't add specificity
          "@media (hover: none)": {
            boxShadow: (i.vars || i).shadows[2]
          }
        },
        "&:active": {
          boxShadow: (i.vars || i).shadows[8]
        },
        [`&.${Ed.focusVisible}`]: {
          boxShadow: (i.vars || i).shadows[6]
        },
        [`&.${Ed.disabled}`]: {
          color: (i.vars || i).palette.action.disabled,
          boxShadow: (i.vars || i).shadows[0],
          backgroundColor: (i.vars || i).palette.action.disabledBackground
        }
      }
    }, {
      props: {
        variant: "outlined"
      },
      style: {
        padding: "5px 15px",
        border: "1px solid currentColor",
        borderColor: "var(--variant-outlinedBorder, currentColor)",
        backgroundColor: "var(--variant-outlinedBg)",
        color: "var(--variant-outlinedColor)",
        [`&.${Ed.disabled}`]: {
          border: `1px solid ${(i.vars || i).palette.action.disabledBackground}`
        }
      }
    }, {
      props: {
        variant: "text"
      },
      style: {
        padding: "6px 8px",
        color: "var(--variant-textColor)",
        backgroundColor: "var(--variant-textBg)"
      }
    }, ...Object.entries(i.palette).filter(FU(["dark", "contrastText"])).map(([S]) => ({
      props: {
        color: S
      },
      style: {
        "--variant-textColor": (i.vars || i).palette[S].main,
        "--variant-outlinedColor": (i.vars || i).palette[S].main,
        "--variant-outlinedBorder": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / 0.5)` : xd(i.palette[S].main, 0.5),
        "--variant-containedColor": (i.vars || i).palette[S].contrastText,
        "--variant-containedBg": (i.vars || i).palette[S].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (i.vars || i).palette[S].dark,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : xd(i.palette[S].main, i.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (i.vars || i).palette[S].main,
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : xd(i.palette[S].main, i.palette.action.hoverOpacity)
          }
        }
      }
    })), {
      props: {
        color: "inherit"
      },
      style: {
        "--variant-containedColor": i.vars ? (
          // this is safe because grey does not change between default light/dark mode
          i.vars.palette.text.primary
        ) : (m = (h = i.palette).getContrastText) == null ? void 0 : m.call(h, s),
        "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedBg : s,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedHoverBg : f,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : xd(i.palette.text.primary, i.palette.action.hoverOpacity),
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : xd(i.palette.text.primary, i.palette.action.hoverOpacity)
          }
        }
      }
    }, {
      props: {
        size: "small",
        variant: "text"
      },
      style: {
        padding: "4px 5px",
        fontSize: i.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "text"
      },
      style: {
        padding: "8px 11px",
        fontSize: i.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "outlined"
      },
      style: {
        padding: "3px 9px",
        fontSize: i.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "outlined"
      },
      style: {
        padding: "7px 21px",
        fontSize: i.typography.pxToRem(15)
      }
    }, {
      props: {
        size: "small",
        variant: "contained"
      },
      style: {
        padding: "4px 10px",
        fontSize: i.typography.pxToRem(13)
      }
    }, {
      props: {
        size: "large",
        variant: "contained"
      },
      style: {
        padding: "8px 22px",
        fontSize: i.typography.pxToRem(15)
      }
    }, {
      props: {
        disableElevation: !0
      },
      style: {
        boxShadow: "none",
        "&:hover": {
          boxShadow: "none"
        },
        [`&.${Ed.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${Ed.disabled}`]: {
          boxShadow: "none"
        }
      }
    }, {
      props: {
        fullWidth: !0
      },
      style: {
        width: "100%"
      }
    }]
  };
})), VU = gc("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (i, s) => {
    const {
      ownerState: f
    } = i;
    return [s.startIcon, s[`iconSize${ni(f.size)}`]];
  }
})({
  display: "inherit",
  marginRight: 8,
  marginLeft: -4,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginLeft: -2
    }
  }, ...t_]
}), BU = gc("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (i, s) => {
    const {
      ownerState: f
    } = i;
    return [s.endIcon, s[`iconSize${ni(f.size)}`]];
  }
})({
  display: "inherit",
  marginRight: -4,
  marginLeft: 8,
  variants: [{
    props: {
      size: "small"
    },
    style: {
      marginRight: -2
    }
  }, ...t_]
}), Ag = /* @__PURE__ */ Ct.forwardRef(function(s, f) {
  const h = Ct.useContext(JR), m = Ct.useContext(e_), S = th(h, s), y = xC({
    props: S,
    name: "MuiButton"
  }), {
    children: x,
    color: R = "primary",
    component: k = "button",
    className: N,
    disabled: O = !1,
    disableElevation: z = !1,
    disableFocusRipple: B = !1,
    endIcon: H,
    focusVisibleClassName: V,
    fullWidth: F = !1,
    size: fe = "medium",
    startIcon: oe,
    type: X,
    variant: le = "text",
    ...$
  } = y, be = {
    ...y,
    color: R,
    component: k,
    disabled: O,
    disableElevation: z,
    disableFocusRipple: B,
    fullWidth: F,
    size: fe,
    type: X,
    variant: le
  }, ce = jU(be), et = oe && /* @__PURE__ */ $t.jsx(VU, {
    className: ce.startIcon,
    ownerState: be,
    children: oe
  }), _ = H && /* @__PURE__ */ $t.jsx(BU, {
    className: ce.endIcon,
    ownerState: be,
    children: H
  }), se = m || "";
  return /* @__PURE__ */ $t.jsxs($U, {
    ownerState: be,
    className: mi(h.className, ce.root, N, se),
    component: k,
    disabled: O,
    focusRipple: !B,
    focusVisibleClassName: mi(ce.focusVisible, V),
    ref: f,
    type: X,
    ...$,
    classes: ce,
    children: [et, x, _]
  });
});
process.env.NODE_ENV !== "production" && (Ag.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: K.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: K.object,
  /**
   * @ignore
   */
  className: K.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: K.oneOfType([K.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), K.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: K.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: K.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: K.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: K.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: K.bool,
  /**
   * Element placed after the children.
   */
  endIcon: K.node,
  /**
   * @ignore
   */
  focusVisibleClassName: K.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: K.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: K.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: K.oneOfType([K.oneOf(["small", "medium", "large"]), K.string]),
  /**
   * Element placed before the children.
   */
  startIcon: K.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: K.oneOfType([K.arrayOf(K.oneOfType([K.func, K.object, K.bool])), K.func, K.object]),
  /**
   * @ignore
   */
  type: K.oneOfType([K.oneOf(["button", "reset", "submit"]), K.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: K.oneOfType([K.oneOf(["contained", "outlined", "text"]), K.string])
});
const HU = () => /* @__PURE__ */ $t.jsxs(qR, { spacing: 2, direction: "row", children: [
  /* @__PURE__ */ $t.jsx(Ag, { variant: "text", children: "Text" }),
  /* @__PURE__ */ $t.jsx(Ag, { variant: "contained", children: "Contained" }),
  /* @__PURE__ */ $t.jsx(Ag, { variant: "outlined", children: "Outlined" })
] });
var uh = (i) => i.type === "checkbox", wd = (i) => i instanceof Date, Oa = (i) => i == null;
const n_ = (i) => typeof i == "object";
var yr = (i) => !Oa(i) && !Array.isArray(i) && n_(i) && !wd(i), IU = (i) => yr(i) && i.target ? uh(i.target) ? i.target.checked : i.target.value : i, YU = (i) => i.substring(0, i.search(/\.\d+(\.|$)/)) || i, WU = (i, s) => i.has(YU(s)), GU = (i) => {
  const s = i.constructor && i.constructor.prototype;
  return yr(s) && s.hasOwnProperty("isPrototypeOf");
}, _C = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function hi(i) {
  let s;
  const f = Array.isArray(i);
  if (i instanceof Date)
    s = new Date(i);
  else if (i instanceof Set)
    s = new Set(i);
  else if (!(_C && (i instanceof Blob || i instanceof FileList)) && (f || yr(i)))
    if (s = f ? [] : {}, !f && !GU(i))
      s = i;
    else
      for (const h in i)
        i.hasOwnProperty(h) && (s[h] = hi(i[h]));
  else
    return i;
  return s;
}
var r0 = (i) => Array.isArray(i) ? i.filter(Boolean) : [], ir = (i) => i === void 0, Ke = (i, s, f) => {
  if (!s || !yr(i))
    return f;
  const h = r0(s.split(/[,[\].]+?/)).reduce((m, S) => Oa(m) ? m : m[S], i);
  return ir(h) || h === i ? ir(i[s]) ? f : i[s] : h;
}, Wo = (i) => typeof i == "boolean", kC = (i) => /^\w*$/.test(i), r_ = (i) => r0(i.replace(/["|']|\]/g, "").split(/\.|\[/)), Mn = (i, s, f) => {
  let h = -1;
  const m = kC(s) ? [s] : r_(s), S = m.length, y = S - 1;
  for (; ++h < S; ) {
    const x = m[h];
    let R = f;
    if (h !== y) {
      const k = i[x];
      R = yr(k) || Array.isArray(k) ? k : isNaN(+m[h + 1]) ? {} : [];
    }
    if (x === "__proto__")
      return;
    i[x] = R, i = i[x];
  }
  return i;
};
const aR = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, po = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, Bl = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, QU = xn.createContext(null), qU = () => xn.useContext(QU);
var KU = (i, s, f, h = !0) => {
  const m = {
    defaultValues: s._defaultValues
  };
  for (const S in i)
    Object.defineProperty(m, S, {
      get: () => {
        const y = S;
        return s._proxyFormState[y] !== po.all && (s._proxyFormState[y] = !h || po.all), i[y];
      }
    });
  return m;
}, ti = (i) => yr(i) && !Object.keys(i).length, XU = (i, s, f, h) => {
  f(i);
  const { name: m, ...S } = i;
  return ti(S) || Object.keys(S).length >= Object.keys(s).length || Object.keys(S).find((y) => s[y] === po.all);
}, Kv = (i) => Array.isArray(i) ? i : [i], ZU = (i, s, f) => !i || !s || i === s || Kv(i).some((h) => h && (f ? h === s : h.startsWith(s) || s.startsWith(h)));
function a_(i) {
  const s = xn.useRef(i);
  s.current = i, xn.useEffect(() => {
    const f = !i.disabled && s.current.subject && s.current.subject.subscribe({
      next: s.current.next
    });
    return () => {
      f && f.unsubscribe();
    };
  }, [i.disabled]);
}
var Ko = (i) => typeof i == "string", i_ = (i, s, f, h, m) => Ko(i) ? (h && s.watch.add(i), Ke(f, i, m)) : Array.isArray(i) ? i.map((S) => (h && s.watch.add(S), Ke(f, S))) : (h && (s.watchAll = !0), f);
function JU(i) {
  const s = qU(), { control: f = s.control, name: h, defaultValue: m, disabled: S, exact: y } = i || {}, x = xn.useRef(h);
  x.current = h, a_({
    disabled: S,
    subject: f._subjects.values,
    next: (N) => {
      ZU(x.current, N.name, y) && k(hi(i_(x.current, f._names, N.values || f._formValues, !1, m)));
    }
  });
  const [R, k] = xn.useState(f._getWatch(h, m));
  return xn.useEffect(() => f._removeUnmounted()), R;
}
var e3 = (i, s, f, h, m) => s ? {
  ...f[i],
  types: {
    ...f[i] && f[i].types ? f[i].types : {},
    [h]: m || !0
  }
} : {}, iR = (i) => ({
  isOnSubmit: !i || i === po.onSubmit,
  isOnBlur: i === po.onBlur,
  isOnChange: i === po.onChange,
  isOnAll: i === po.all,
  isOnTouch: i === po.onTouched
}), oR = (i, s, f) => !f && (s.watchAll || s.watch.has(i) || [...s.watch].some((h) => i.startsWith(h) && /^\.\w+/.test(i.slice(h.length))));
const Xv = (i, s, f, h) => {
  for (const m of f || Object.keys(i)) {
    const S = Ke(i, m);
    if (S) {
      const { _f: y, ...x } = S;
      if (y) {
        if (y.refs && y.refs[0] && s(y.refs[0], m) && !h)
          return !0;
        if (y.ref && s(y.ref, y.name) && !h)
          return !0;
        if (Xv(x, s))
          break;
      } else if (yr(x) && Xv(x, s))
        break;
    }
  }
};
var t3 = (i, s, f) => {
  const h = Kv(Ke(i, f));
  return Mn(h, "root", s[f]), Mn(i, f, h), i;
}, OC = (i) => i.type === "file", Hl = (i) => typeof i == "function", Fg = (i) => {
  if (!_C)
    return !1;
  const s = i ? i.ownerDocument : 0;
  return i instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
}, Mg = (i) => Ko(i), DC = (i) => i.type === "radio", Pg = (i) => i instanceof RegExp;
const lR = {
  value: !1,
  isValid: !1
}, uR = { value: !0, isValid: !0 };
var o_ = (i) => {
  if (Array.isArray(i)) {
    if (i.length > 1) {
      const s = i.filter((f) => f && f.checked && !f.disabled).map((f) => f.value);
      return { value: s, isValid: !!s.length };
    }
    return i[0].checked && !i[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      i[0].attributes && !ir(i[0].attributes.value) ? ir(i[0].value) || i[0].value === "" ? uR : { value: i[0].value, isValid: !0 } : uR
    ) : lR;
  }
  return lR;
};
const sR = {
  isValid: !1,
  value: null
};
var l_ = (i) => Array.isArray(i) ? i.reduce((s, f) => f && f.checked && !f.disabled ? {
  isValid: !0,
  value: f.value
} : s, sR) : sR;
function cR(i, s, f = "validate") {
  if (Mg(i) || Array.isArray(i) && i.every(Mg) || Wo(i) && !i)
    return {
      type: f,
      message: Mg(i) ? i : "",
      ref: s
    };
}
var Td = (i) => yr(i) && !Pg(i) ? i : {
  value: i,
  message: ""
}, fR = async (i, s, f, h, m) => {
  const { ref: S, refs: y, required: x, maxLength: R, minLength: k, min: N, max: O, pattern: z, validate: B, name: H, valueAsNumber: V, mount: F, disabled: fe } = i._f, oe = Ke(s, H);
  if (!F || fe)
    return {};
  const X = y ? y[0] : S, le = (ve) => {
    h && X.reportValidity && (X.setCustomValidity(Wo(ve) ? "" : ve || ""), X.reportValidity());
  }, $ = {}, be = DC(S), ce = uh(S), et = be || ce, _ = (V || OC(S)) && ir(S.value) && ir(oe) || Fg(S) && S.value === "" || oe === "" || Array.isArray(oe) && !oe.length, se = e3.bind(null, H, f, $), ke = (ve, pe, Re, lt = Bl.maxLength, Qe = Bl.minLength) => {
    const bt = ve ? pe : Re;
    $[H] = {
      type: ve ? lt : Qe,
      message: bt,
      ref: S,
      ...se(ve ? lt : Qe, bt)
    };
  };
  if (m ? !Array.isArray(oe) || !oe.length : x && (!et && (_ || Oa(oe)) || Wo(oe) && !oe || ce && !o_(y).isValid || be && !l_(y).isValid)) {
    const { value: ve, message: pe } = Mg(x) ? { value: !!x, message: x } : Td(x);
    if (ve && ($[H] = {
      type: Bl.required,
      message: pe,
      ref: X,
      ...se(Bl.required, pe)
    }, !f))
      return le(pe), $;
  }
  if (!_ && (!Oa(N) || !Oa(O))) {
    let ve, pe;
    const Re = Td(O), lt = Td(N);
    if (!Oa(oe) && !isNaN(oe)) {
      const Qe = S.valueAsNumber || oe && +oe;
      Oa(Re.value) || (ve = Qe > Re.value), Oa(lt.value) || (pe = Qe < lt.value);
    } else {
      const Qe = S.valueAsDate || new Date(oe), bt = (I) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + I), ge = S.type == "time", ze = S.type == "week";
      Ko(Re.value) && oe && (ve = ge ? bt(oe) > bt(Re.value) : ze ? oe > Re.value : Qe > new Date(Re.value)), Ko(lt.value) && oe && (pe = ge ? bt(oe) < bt(lt.value) : ze ? oe < lt.value : Qe < new Date(lt.value));
    }
    if ((ve || pe) && (ke(!!ve, Re.message, lt.message, Bl.max, Bl.min), !f))
      return le($[H].message), $;
  }
  if ((R || k) && !_ && (Ko(oe) || m && Array.isArray(oe))) {
    const ve = Td(R), pe = Td(k), Re = !Oa(ve.value) && oe.length > +ve.value, lt = !Oa(pe.value) && oe.length < +pe.value;
    if ((Re || lt) && (ke(Re, ve.message, pe.message), !f))
      return le($[H].message), $;
  }
  if (z && !_ && Ko(oe)) {
    const { value: ve, message: pe } = Td(z);
    if (Pg(ve) && !oe.match(ve) && ($[H] = {
      type: Bl.pattern,
      message: pe,
      ref: S,
      ...se(Bl.pattern, pe)
    }, !f))
      return le(pe), $;
  }
  if (B) {
    if (Hl(B)) {
      const ve = await B(oe, s), pe = cR(ve, X);
      if (pe && ($[H] = {
        ...pe,
        ...se(Bl.validate, pe.message)
      }, !f))
        return le(pe.message), $;
    } else if (yr(B)) {
      let ve = {};
      for (const pe in B) {
        if (!ti(ve) && !f)
          break;
        const Re = cR(await B[pe](oe, s), X, pe);
        Re && (ve = {
          ...Re,
          ...se(pe, Re.message)
        }, le(Re.message), f && ($[H] = ve));
      }
      if (!ti(ve) && ($[H] = {
        ref: X,
        ...ve
      }, !f))
        return $;
    }
  }
  return le(!0), $;
};
function n3(i, s) {
  const f = s.slice(0, -1).length;
  let h = 0;
  for (; h < f; )
    i = ir(i) ? h++ : i[s[h++]];
  return i;
}
function r3(i) {
  for (const s in i)
    if (i.hasOwnProperty(s) && !ir(i[s]))
      return !1;
  return !0;
}
function Or(i, s) {
  const f = Array.isArray(s) ? s : kC(s) ? [s] : r_(s), h = f.length === 1 ? i : n3(i, f), m = f.length - 1, S = f[m];
  return h && delete h[S], m !== 0 && (yr(h) && ti(h) || Array.isArray(h) && r3(h)) && Or(i, f.slice(0, -1)), i;
}
var Qb = () => {
  let i = [];
  return {
    get observers() {
      return i;
    },
    next: (m) => {
      for (const S of i)
        S.next && S.next(m);
    },
    subscribe: (m) => (i.push(m), {
      unsubscribe: () => {
        i = i.filter((S) => S !== m);
      }
    }),
    unsubscribe: () => {
      i = [];
    }
  };
}, jg = (i) => Oa(i) || !n_(i);
function es(i, s) {
  if (jg(i) || jg(s))
    return i === s;
  if (wd(i) && wd(s))
    return i.getTime() === s.getTime();
  const f = Object.keys(i), h = Object.keys(s);
  if (f.length !== h.length)
    return !1;
  for (const m of f) {
    const S = i[m];
    if (!h.includes(m))
      return !1;
    if (m !== "ref") {
      const y = s[m];
      if (wd(S) && wd(y) || yr(S) && yr(y) || Array.isArray(S) && Array.isArray(y) ? !es(S, y) : S !== y)
        return !1;
    }
  }
  return !0;
}
var u_ = (i) => i.type === "select-multiple", a3 = (i) => DC(i) || uh(i), qb = (i) => Fg(i) && i.isConnected, s_ = (i) => {
  for (const s in i)
    if (Hl(i[s]))
      return !0;
  return !1;
};
function $g(i, s = {}) {
  const f = Array.isArray(i);
  if (yr(i) || f)
    for (const h in i)
      Array.isArray(i[h]) || yr(i[h]) && !s_(i[h]) ? (s[h] = Array.isArray(i[h]) ? [] : {}, $g(i[h], s[h])) : Oa(i[h]) || (s[h] = !0);
  return s;
}
function c_(i, s, f) {
  const h = Array.isArray(i);
  if (yr(i) || h)
    for (const m in i)
      Array.isArray(i[m]) || yr(i[m]) && !s_(i[m]) ? ir(s) || jg(f[m]) ? f[m] = Array.isArray(i[m]) ? $g(i[m], []) : { ...$g(i[m]) } : c_(i[m], Oa(s) ? {} : s[m], f[m]) : f[m] = !es(i[m], s[m]);
  return f;
}
var xg = (i, s) => c_(i, s, $g(s)), f_ = (i, { valueAsNumber: s, valueAsDate: f, setValueAs: h }) => ir(i) ? i : s ? i === "" ? NaN : i && +i : f && Ko(i) ? new Date(i) : h ? h(i) : i;
function Kb(i) {
  const s = i.ref;
  if (!(i.refs ? i.refs.every((f) => f.disabled) : s.disabled))
    return OC(s) ? s.files : DC(s) ? l_(i.refs).value : u_(s) ? [...s.selectedOptions].map(({ value: f }) => f) : uh(s) ? o_(i.refs).value : f_(ir(s.value) ? i.ref.value : s.value, i);
}
var i3 = (i, s, f, h) => {
  const m = {};
  for (const S of i) {
    const y = Ke(s, S);
    y && Mn(m, S, y._f);
  }
  return {
    criteriaMode: f,
    names: [...i],
    fields: m,
    shouldUseNativeValidation: h
  };
}, Wv = (i) => ir(i) ? i : Pg(i) ? i.source : yr(i) ? Pg(i.value) ? i.value.source : i.value : i;
const dR = "AsyncFunction";
var o3 = (i) => (!i || !i.validate) && !!(Hl(i.validate) && i.validate.constructor.name === dR || yr(i.validate) && Object.values(i.validate).find((s) => s.constructor.name === dR)), l3 = (i) => i.mount && (i.required || i.min || i.max || i.maxLength || i.minLength || i.pattern || i.validate);
function pR(i, s, f) {
  const h = Ke(i, f);
  if (h || kC(f))
    return {
      error: h,
      name: f
    };
  const m = f.split(".");
  for (; m.length; ) {
    const S = m.join("."), y = Ke(s, S), x = Ke(i, S);
    if (y && !Array.isArray(y) && f !== S)
      return { name: f };
    if (x && x.type)
      return {
        name: S,
        error: x
      };
    m.pop();
  }
  return {
    name: f
  };
}
var u3 = (i, s, f, h, m) => m.isOnAll ? !1 : !f && m.isOnTouch ? !(s || i) : (f ? h.isOnBlur : m.isOnBlur) ? !i : (f ? h.isOnChange : m.isOnChange) ? i : !0, s3 = (i, s) => !r0(Ke(i, s)).length && Or(i, s);
const c3 = {
  mode: po.onSubmit,
  reValidateMode: po.onChange,
  shouldFocusError: !0
};
function f3(i = {}) {
  let s = {
    ...c3,
    ...i
  }, f = {
    submitCount: 0,
    isDirty: !1,
    isLoading: Hl(s.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: s.errors || {},
    disabled: s.disabled || !1
  }, h = {}, m = yr(s.defaultValues) || yr(s.values) ? hi(s.defaultValues || s.values) || {} : {}, S = s.shouldUnregister ? {} : hi(m), y = {
    action: !1,
    mount: !1,
    watch: !1
  }, x = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, R, k = 0;
  const N = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, O = {
    values: Qb(),
    array: Qb(),
    state: Qb()
  }, z = iR(s.mode), B = iR(s.reValidateMode), H = s.criteriaMode === po.all, V = (A) => (W) => {
    clearTimeout(k), k = setTimeout(A, W);
  }, F = async (A) => {
    if (N.isValid || A) {
      const W = s.resolver ? ti((await et()).errors) : await se(h, !0);
      W !== f.isValid && O.state.next({
        isValid: W
      });
    }
  }, fe = (A, W) => {
    (N.isValidating || N.validatingFields) && ((A || Array.from(x.mount)).forEach((ne) => {
      ne && (W ? Mn(f.validatingFields, ne, W) : Or(f.validatingFields, ne));
    }), O.state.next({
      validatingFields: f.validatingFields,
      isValidating: !ti(f.validatingFields)
    }));
  }, oe = (A, W = [], ne, _e, Te = !0, te = !0) => {
    if (_e && ne) {
      if (y.action = !0, te && Array.isArray(Ke(h, A))) {
        const Ve = ne(Ke(h, A), _e.argA, _e.argB);
        Te && Mn(h, A, Ve);
      }
      if (te && Array.isArray(Ke(f.errors, A))) {
        const Ve = ne(Ke(f.errors, A), _e.argA, _e.argB);
        Te && Mn(f.errors, A, Ve), s3(f.errors, A);
      }
      if (N.touchedFields && te && Array.isArray(Ke(f.touchedFields, A))) {
        const Ve = ne(Ke(f.touchedFields, A), _e.argA, _e.argB);
        Te && Mn(f.touchedFields, A, Ve);
      }
      N.dirtyFields && (f.dirtyFields = xg(m, S)), O.state.next({
        name: A,
        isDirty: ve(A, W),
        dirtyFields: f.dirtyFields,
        errors: f.errors,
        isValid: f.isValid
      });
    } else
      Mn(S, A, W);
  }, X = (A, W) => {
    Mn(f.errors, A, W), O.state.next({
      errors: f.errors
    });
  }, le = (A) => {
    f.errors = A, O.state.next({
      errors: f.errors,
      isValid: !1
    });
  }, $ = (A, W, ne, _e) => {
    const Te = Ke(h, A);
    if (Te) {
      const te = Ke(S, A, ir(ne) ? Ke(m, A) : ne);
      ir(te) || _e && _e.defaultChecked || W ? Mn(S, A, W ? te : Kb(Te._f)) : lt(A, te), y.mount && F();
    }
  }, be = (A, W, ne, _e, Te) => {
    let te = !1, Ve = !1;
    const Et = {
      name: A
    }, Bt = !!(Ke(h, A) && Ke(h, A)._f && Ke(h, A)._f.disabled);
    if (!ne || _e) {
      N.isDirty && (Ve = f.isDirty, f.isDirty = Et.isDirty = ve(), te = Ve !== Et.isDirty);
      const Ot = Bt || es(Ke(m, A), W);
      Ve = !!(!Bt && Ke(f.dirtyFields, A)), Ot || Bt ? Or(f.dirtyFields, A) : Mn(f.dirtyFields, A, !0), Et.dirtyFields = f.dirtyFields, te = te || N.dirtyFields && Ve !== !Ot;
    }
    if (ne) {
      const Ot = Ke(f.touchedFields, A);
      Ot || (Mn(f.touchedFields, A, ne), Et.touchedFields = f.touchedFields, te = te || N.touchedFields && Ot !== ne);
    }
    return te && Te && O.state.next(Et), te ? Et : {};
  }, ce = (A, W, ne, _e) => {
    const Te = Ke(f.errors, A), te = N.isValid && Wo(W) && f.isValid !== W;
    if (i.delayError && ne ? (R = V(() => X(A, ne)), R(i.delayError)) : (clearTimeout(k), R = null, ne ? Mn(f.errors, A, ne) : Or(f.errors, A)), (ne ? !es(Te, ne) : Te) || !ti(_e) || te) {
      const Ve = {
        ..._e,
        ...te && Wo(W) ? { isValid: W } : {},
        errors: f.errors,
        name: A
      };
      f = {
        ...f,
        ...Ve
      }, O.state.next(Ve);
    }
  }, et = async (A) => {
    fe(A, !0);
    const W = await s.resolver(S, s.context, i3(A || x.mount, h, s.criteriaMode, s.shouldUseNativeValidation));
    return fe(A), W;
  }, _ = async (A) => {
    const { errors: W } = await et(A);
    if (A)
      for (const ne of A) {
        const _e = Ke(W, ne);
        _e ? Mn(f.errors, ne, _e) : Or(f.errors, ne);
      }
    else
      f.errors = W;
    return W;
  }, se = async (A, W, ne = {
    valid: !0
  }) => {
    for (const _e in A) {
      const Te = A[_e];
      if (Te) {
        const { _f: te, ...Ve } = Te;
        if (te) {
          const Et = x.array.has(te.name), Bt = Te._f && o3(Te._f);
          Bt && N.validatingFields && fe([_e], !0);
          const Ot = await fR(Te, S, H, s.shouldUseNativeValidation && !W, Et);
          if (Bt && N.validatingFields && fe([_e]), Ot[te.name] && (ne.valid = !1, W))
            break;
          !W && (Ke(Ot, te.name) ? Et ? t3(f.errors, Ot, te.name) : Mn(f.errors, te.name, Ot[te.name]) : Or(f.errors, te.name));
        }
        !ti(Ve) && await se(Ve, W, ne);
      }
    }
    return ne.valid;
  }, ke = () => {
    for (const A of x.unMount) {
      const W = Ke(h, A);
      W && (W._f.refs ? W._f.refs.every((ne) => !qb(ne)) : !qb(W._f.ref)) && Ie(A);
    }
    x.unMount = /* @__PURE__ */ new Set();
  }, ve = (A, W) => (A && W && Mn(S, A, W), !es(de(), m)), pe = (A, W, ne) => i_(A, x, {
    ...y.mount ? S : ir(W) ? m : Ko(A) ? { [A]: W } : W
  }, ne, W), Re = (A) => r0(Ke(y.mount ? S : m, A, i.shouldUnregister ? Ke(m, A, []) : [])), lt = (A, W, ne = {}) => {
    const _e = Ke(h, A);
    let Te = W;
    if (_e) {
      const te = _e._f;
      te && (!te.disabled && Mn(S, A, f_(W, te)), Te = Fg(te.ref) && Oa(W) ? "" : W, u_(te.ref) ? [...te.ref.options].forEach((Ve) => Ve.selected = Te.includes(Ve.value)) : te.refs ? uh(te.ref) ? te.refs.length > 1 ? te.refs.forEach((Ve) => (!Ve.defaultChecked || !Ve.disabled) && (Ve.checked = Array.isArray(Te) ? !!Te.find((Et) => Et === Ve.value) : Te === Ve.value)) : te.refs[0] && (te.refs[0].checked = !!Te) : te.refs.forEach((Ve) => Ve.checked = Ve.value === Te) : OC(te.ref) ? te.ref.value = "" : (te.ref.value = Te, te.ref.type || O.values.next({
        name: A,
        values: { ...S }
      })));
    }
    (ne.shouldDirty || ne.shouldTouch) && be(A, Te, ne.shouldTouch, ne.shouldDirty, !0), ne.shouldValidate && I(A);
  }, Qe = (A, W, ne) => {
    for (const _e in W) {
      const Te = W[_e], te = `${A}.${_e}`, Ve = Ke(h, te);
      (x.array.has(A) || !jg(Te) || Ve && !Ve._f) && !wd(Te) ? Qe(te, Te, ne) : lt(te, Te, ne);
    }
  }, bt = (A, W, ne = {}) => {
    const _e = Ke(h, A), Te = x.array.has(A), te = hi(W);
    Mn(S, A, te), Te ? (O.array.next({
      name: A,
      values: { ...S }
    }), (N.isDirty || N.dirtyFields) && ne.shouldDirty && O.state.next({
      name: A,
      dirtyFields: xg(m, S),
      isDirty: ve(A, te)
    })) : _e && !_e._f && !Oa(te) ? Qe(A, te, ne) : lt(A, te, ne), oR(A, x) && O.state.next({ ...f }), O.values.next({
      name: y.mount ? A : void 0,
      values: { ...S }
    });
  }, ge = async (A) => {
    y.mount = !0;
    const W = A.target;
    let ne = W.name, _e = !0;
    const Te = Ke(h, ne), te = () => W.type ? Kb(Te._f) : IU(A), Ve = (Et) => {
      _e = Number.isNaN(Et) || es(Et, Ke(S, ne, Et));
    };
    if (Te) {
      let Et, Bt;
      const Ot = te(), jn = A.type === aR.BLUR || A.type === aR.FOCUS_OUT, Si = !l3(Te._f) && !s.resolver && !Ke(f.errors, ne) && !Te._f.deps || u3(jn, Ke(f.touchedFields, ne), f.isSubmitted, B, z), Fr = oR(ne, x, jn);
      Mn(S, ne, Ot), jn ? (Te._f.onBlur && Te._f.onBlur(A), R && R(0)) : Te._f.onChange && Te._f.onChange(A);
      const Oe = be(ne, Ot, jn, !1), at = !ti(Oe) || Fr;
      if (!jn && O.values.next({
        name: ne,
        type: A.type,
        values: { ...S }
      }), Si)
        return N.isValid && (i.mode === "onBlur" ? jn && F() : F()), at && O.state.next({ name: ne, ...Fr ? {} : Oe });
      if (!jn && Fr && O.state.next({ ...f }), s.resolver) {
        const { errors: kt } = await et([ne]);
        if (Ve(Ot), _e) {
          const Wt = pR(f.errors, h, ne), dn = pR(kt, h, Wt.name || ne);
          Et = dn.error, ne = dn.name, Bt = ti(kt);
        }
      } else
        fe([ne], !0), Et = (await fR(Te, S, H, s.shouldUseNativeValidation))[ne], fe([ne]), Ve(Ot), _e && (Et ? Bt = !1 : N.isValid && (Bt = await se(h, !0)));
      _e && (Te._f.deps && I(Te._f.deps), ce(ne, Bt, Et, Oe));
    }
  }, ze = (A, W) => {
    if (Ke(f.errors, W) && A.focus)
      return A.focus(), 1;
  }, I = async (A, W = {}) => {
    let ne, _e;
    const Te = Kv(A);
    if (s.resolver) {
      const te = await _(ir(A) ? A : Te);
      ne = ti(te), _e = A ? !Te.some((Ve) => Ke(te, Ve)) : ne;
    } else A ? (_e = (await Promise.all(Te.map(async (te) => {
      const Ve = Ke(h, te);
      return await se(Ve && Ve._f ? { [te]: Ve } : Ve);
    }))).every(Boolean), !(!_e && !f.isValid) && F()) : _e = ne = await se(h);
    return O.state.next({
      ...!Ko(A) || N.isValid && ne !== f.isValid ? {} : { name: A },
      ...s.resolver || !A ? { isValid: ne } : {},
      errors: f.errors
    }), W.shouldFocus && !_e && Xv(h, ze, A ? Te : x.mount), _e;
  }, de = (A) => {
    const W = {
      ...y.mount ? S : m
    };
    return ir(A) ? W : Ko(A) ? Ke(W, A) : A.map((ne) => Ke(W, ne));
  }, Ne = (A, W) => ({
    invalid: !!Ke((W || f).errors, A),
    isDirty: !!Ke((W || f).dirtyFields, A),
    error: Ke((W || f).errors, A),
    isValidating: !!Ke(f.validatingFields, A),
    isTouched: !!Ke((W || f).touchedFields, A)
  }), Xe = (A) => {
    A && Kv(A).forEach((W) => Or(f.errors, W)), O.state.next({
      errors: A ? f.errors : {}
    });
  }, Pe = (A, W, ne) => {
    const _e = (Ke(h, A, { _f: {} })._f || {}).ref, Te = Ke(f.errors, A) || {}, { ref: te, message: Ve, type: Et, ...Bt } = Te;
    Mn(f.errors, A, {
      ...Bt,
      ...W,
      ref: _e
    }), O.state.next({
      name: A,
      errors: f.errors,
      isValid: !1
    }), ne && ne.shouldFocus && _e && _e.focus && _e.focus();
  }, ht = (A, W) => Hl(A) ? O.values.subscribe({
    next: (ne) => A(pe(void 0, W), ne)
  }) : pe(A, W, !0), Ie = (A, W = {}) => {
    for (const ne of A ? Kv(A) : x.mount)
      x.mount.delete(ne), x.array.delete(ne), W.keepValue || (Or(h, ne), Or(S, ne)), !W.keepError && Or(f.errors, ne), !W.keepDirty && Or(f.dirtyFields, ne), !W.keepTouched && Or(f.touchedFields, ne), !W.keepIsValidating && Or(f.validatingFields, ne), !s.shouldUnregister && !W.keepDefaultValue && Or(m, ne);
    O.values.next({
      values: { ...S }
    }), O.state.next({
      ...f,
      ...W.keepDirty ? { isDirty: ve() } : {}
    }), !W.keepIsValid && F();
  }, ut = ({ disabled: A, name: W, field: ne, fields: _e, value: Te }) => {
    if (Wo(A) && y.mount || A) {
      const te = A ? void 0 : ir(Te) ? Kb(ne ? ne._f : Ke(_e, W)._f) : Te;
      Mn(S, W, te), be(W, te, !1, !1, !0);
    }
  }, rt = (A, W = {}) => {
    let ne = Ke(h, A);
    const _e = Wo(W.disabled) || Wo(i.disabled);
    return Mn(h, A, {
      ...ne || {},
      _f: {
        ...ne && ne._f ? ne._f : { ref: { name: A } },
        name: A,
        mount: !0,
        ...W
      }
    }), x.mount.add(A), ne ? ut({
      field: ne,
      disabled: Wo(W.disabled) ? W.disabled : i.disabled,
      name: A,
      value: W.value
    }) : $(A, !0, W.value), {
      ..._e ? { disabled: W.disabled || i.disabled } : {},
      ...s.progressive ? {
        required: !!W.required,
        min: Wv(W.min),
        max: Wv(W.max),
        minLength: Wv(W.minLength),
        maxLength: Wv(W.maxLength),
        pattern: Wv(W.pattern)
      } : {},
      name: A,
      onChange: ge,
      onBlur: ge,
      ref: (Te) => {
        if (Te) {
          rt(A, W), ne = Ke(h, A);
          const te = ir(Te.value) && Te.querySelectorAll && Te.querySelectorAll("input,select,textarea")[0] || Te, Ve = a3(te), Et = ne._f.refs || [];
          if (Ve ? Et.find((Bt) => Bt === te) : te === ne._f.ref)
            return;
          Mn(h, A, {
            _f: {
              ...ne._f,
              ...Ve ? {
                refs: [
                  ...Et.filter(qb),
                  te,
                  ...Array.isArray(Ke(m, A)) ? [{}] : []
                ],
                ref: { type: te.type, name: A }
              } : { ref: te }
            }
          }), $(A, !1, void 0, te);
        } else
          ne = Ke(h, A, {}), ne._f && (ne._f.mount = !1), (s.shouldUnregister || W.shouldUnregister) && !(WU(x.array, A) && y.action) && x.unMount.add(A);
      }
    };
  }, dt = () => s.shouldFocusError && Xv(h, ze, x.mount), mt = (A) => {
    Wo(A) && (O.state.next({ disabled: A }), Xv(h, (W, ne) => {
      const _e = Ke(h, ne);
      _e && (W.disabled = _e._f.disabled || A, Array.isArray(_e._f.refs) && _e._f.refs.forEach((Te) => {
        Te.disabled = _e._f.disabled || A;
      }));
    }, 0, !1));
  }, zt = (A, W) => async (ne) => {
    let _e;
    ne && (ne.preventDefault && ne.preventDefault(), ne.persist && ne.persist());
    let Te = hi(S);
    if (O.state.next({
      isSubmitting: !0
    }), s.resolver) {
      const { errors: te, values: Ve } = await et();
      f.errors = te, Te = Ve;
    } else
      await se(h);
    if (Or(f.errors, "root"), ti(f.errors)) {
      O.state.next({
        errors: {}
      });
      try {
        await A(Te, ne);
      } catch (te) {
        _e = te;
      }
    } else
      W && await W({ ...f.errors }, ne), dt(), setTimeout(dt);
    if (O.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: ti(f.errors) && !_e,
      submitCount: f.submitCount + 1,
      errors: f.errors
    }), _e)
      throw _e;
  }, we = (A, W = {}) => {
    Ke(h, A) && (ir(W.defaultValue) ? bt(A, hi(Ke(m, A))) : (bt(A, W.defaultValue), Mn(m, A, hi(W.defaultValue))), W.keepTouched || Or(f.touchedFields, A), W.keepDirty || (Or(f.dirtyFields, A), f.isDirty = W.defaultValue ? ve(A, hi(Ke(m, A))) : ve()), W.keepError || (Or(f.errors, A), N.isValid && F()), O.state.next({ ...f }));
  }, Ut = (A, W = {}) => {
    const ne = A ? hi(A) : m, _e = hi(ne), Te = ti(A), te = Te ? m : _e;
    if (W.keepDefaultValues || (m = ne), !W.keepValues) {
      if (W.keepDirtyValues)
        for (const Ve of x.mount)
          Ke(f.dirtyFields, Ve) ? Mn(te, Ve, Ke(S, Ve)) : bt(Ve, Ke(te, Ve));
      else {
        if (_C && ir(A))
          for (const Ve of x.mount) {
            const Et = Ke(h, Ve);
            if (Et && Et._f) {
              const Bt = Array.isArray(Et._f.refs) ? Et._f.refs[0] : Et._f.ref;
              if (Fg(Bt)) {
                const Ot = Bt.closest("form");
                if (Ot) {
                  Ot.reset();
                  break;
                }
              }
            }
          }
        h = {};
      }
      S = i.shouldUnregister ? W.keepDefaultValues ? hi(m) : {} : hi(te), O.array.next({
        values: { ...te }
      }), O.values.next({
        values: { ...te }
      });
    }
    x = {
      mount: W.keepDirtyValues ? x.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, y.mount = !N.isValid || !!W.keepIsValid || !!W.keepDirtyValues, y.watch = !!i.shouldUnregister, O.state.next({
      submitCount: W.keepSubmitCount ? f.submitCount : 0,
      isDirty: Te ? !1 : W.keepDirty ? f.isDirty : !!(W.keepDefaultValues && !es(A, m)),
      isSubmitted: W.keepIsSubmitted ? f.isSubmitted : !1,
      dirtyFields: Te ? {} : W.keepDirtyValues ? W.keepDefaultValues && S ? xg(m, S) : f.dirtyFields : W.keepDefaultValues && A ? xg(m, A) : W.keepDirty ? f.dirtyFields : {},
      touchedFields: W.keepTouched ? f.touchedFields : {},
      errors: W.keepErrors ? f.errors : {},
      isSubmitSuccessful: W.keepIsSubmitSuccessful ? f.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, Le = (A, W) => Ut(Hl(A) ? A(S) : A, W);
  return {
    control: {
      register: rt,
      unregister: Ie,
      getFieldState: Ne,
      handleSubmit: zt,
      setError: Pe,
      _executeSchema: et,
      _getWatch: pe,
      _getDirty: ve,
      _updateValid: F,
      _removeUnmounted: ke,
      _updateFieldArray: oe,
      _updateDisabledField: ut,
      _getFieldArray: Re,
      _reset: Ut,
      _resetDefaultValues: () => Hl(s.defaultValues) && s.defaultValues().then((A) => {
        Le(A, s.resetOptions), O.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (A) => {
        f = {
          ...f,
          ...A
        };
      },
      _disableForm: mt,
      _subjects: O,
      _proxyFormState: N,
      _setErrors: le,
      get _fields() {
        return h;
      },
      get _formValues() {
        return S;
      },
      get _state() {
        return y;
      },
      set _state(A) {
        y = A;
      },
      get _defaultValues() {
        return m;
      },
      get _names() {
        return x;
      },
      set _names(A) {
        x = A;
      },
      get _formState() {
        return f;
      },
      set _formState(A) {
        f = A;
      },
      get _options() {
        return s;
      },
      set _options(A) {
        s = {
          ...s,
          ...A
        };
      }
    },
    trigger: I,
    register: rt,
    handleSubmit: zt,
    watch: ht,
    setValue: bt,
    getValues: de,
    reset: Le,
    resetField: we,
    clearErrors: Xe,
    unregister: Ie,
    setError: Pe,
    setFocus: (A, W = {}) => {
      const ne = Ke(h, A), _e = ne && ne._f;
      if (_e) {
        const Te = _e.refs ? _e.refs[0] : _e.ref;
        Te.focus && (Te.focus(), W.shouldSelect && Te.select());
      }
    },
    getFieldState: Ne
  };
}
function d3(i = {}) {
  const s = xn.useRef(), f = xn.useRef(), [h, m] = xn.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: Hl(i.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: i.errors || {},
    disabled: i.disabled || !1,
    defaultValues: Hl(i.defaultValues) ? void 0 : i.defaultValues
  });
  s.current || (s.current = {
    ...f3(i),
    formState: h
  });
  const S = s.current.control;
  return S._options = i, a_({
    subject: S._subjects.state,
    next: (y) => {
      XU(y, S._proxyFormState, S._updateFormState) && m({ ...S._formState });
    }
  }), xn.useEffect(() => S._disableForm(i.disabled), [S, i.disabled]), xn.useEffect(() => {
    if (S._proxyFormState.isDirty) {
      const y = S._getDirty();
      y !== h.isDirty && S._subjects.state.next({
        isDirty: y
      });
    }
  }, [S, h.isDirty]), xn.useEffect(() => {
    i.values && !es(i.values, f.current) ? (S._reset(i.values, S._options.resetOptions), f.current = i.values, m((y) => ({ ...y }))) : S._resetDefaultValues();
  }, [i.values, S]), xn.useEffect(() => {
    i.errors && S._setErrors(i.errors);
  }, [i.errors, S]), xn.useEffect(() => {
    S._state.mount || (S._updateValid(), S._state.mount = !0), S._state.watch && (S._state.watch = !1, S._subjects.state.next({ ...S._formState })), S._removeUnmounted();
  }), xn.useEffect(() => {
    i.shouldUnregister && S._subjects.values.next({
      values: S._getWatch()
    });
  }, [i.shouldUnregister, S]), s.current.formState = KU(h, S), s.current;
}
const p3 = ({ handleOnSubmit: i }) => {
  const {
    register: s,
    handleSubmit: f,
    formState: { errors: h },
    control: m
  } = d3(), S = (x) => {
    console.log("Internal submit from Form component:", x);
    const R = { type: "onSubmitForm", payload: x };
    window.postMessage(R, window.location.origin), i && i(x);
  }, y = JU({ control: m, name: "name" });
  return o2(() => {
    console.log("useEffect name updated", y);
  }, [y]), /* @__PURE__ */ $t.jsxs("form", { onSubmit: f(S), children: [
    /* @__PURE__ */ $t.jsxs("div", { children: [
      /* @__PURE__ */ $t.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ $t.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...s("name", { required: "Este campo es requerido" })
        }
      ),
      h.name && /* @__PURE__ */ $t.jsx("span", { children: h.name.message })
    ] }),
    /* @__PURE__ */ $t.jsxs("div", { children: [
      /* @__PURE__ */ $t.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ $t.jsx(
        "input",
        {
          id: "email",
          type: "email",
          ...s("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo electrónico no válido"
            }
          })
        }
      ),
      h.email && /* @__PURE__ */ $t.jsx("span", { children: h.email.message })
    ] }),
    /* @__PURE__ */ $t.jsx("button", { type: "submit", children: "Enviar" })
  ] });
}, v3 = "_form-container_cx8oy_1", h3 = "_cs-input_cx8oy_49", d_ = {
  "form-container": "_form-container_cx8oy_1",
  formContainer: v3,
  "cs-input": "_cs-input_cx8oy_49",
  csInput: h3
}, m3 = ({
  id: i,
  name: s,
  label: f,
  placeholder: h,
  value: m,
  onChange: S,
  required: y
}) => /* @__PURE__ */ $t.jsxs("div", { className: d_["cs-input"], children: [
  /* @__PURE__ */ $t.jsx(
    "input",
    {
      type: "text",
      id: i,
      name: s,
      placeholder: h,
      value: m,
      onChange: (x) => S && S(x.target.value),
      required: y
    }
  ),
  f && /* @__PURE__ */ $t.jsx("label", { htmlFor: i, style: { marginRight: 8 }, children: f })
] }), y3 = ({
  fields: i,
  // layout,
  // gridTemplateColumns,
  onSubmit: s
}) => {
  const [f, h] = l2({}), m = (S) => {
    S.preventDefault(), s(f);
  };
  return /* @__PURE__ */ $t.jsxs("form", { onSubmit: m, className: d_["form-container"], children: [
    i.map((S, y) => {
      switch (S.type) {
        case "text":
          return /* @__PURE__ */ $t.jsx(
            m3,
            {
              id: S.id,
              name: S.name,
              label: S.label,
              placeholder: S.placeholder,
              required: !0,
              value: f[S.name],
              onChange: (x) => {
                h((R) => ({ ...R, [S.name]: x }));
              }
            },
            y
          );
        default:
          return null;
      }
    }),
    /* @__PURE__ */ $t.jsx("button", { type: "submit", children: "Submit" })
  ] });
}, g3 = ({ formConfig: i, onSubmit: s }) => /* @__PURE__ */ $t.jsx(
  y3,
  {
    fields: i.fields,
    layout: i.layout,
    gridTemplateColumns: i.gridTemplateColumns,
    onSubmit: s
  }
), x3 = YR({
  cssVariables: !0,
  palette: {
    mode: "light",
    // mode: "dark",
    primary: {
      main: "#6366f0"
      // Change primary color to tm
    },
    secondary: {
      main: "#07ab43"
      // Change secondary color to green
    },
    background: {
      default: "#f6f9fc"
    }
  },
  typography: {
    fontFamily: '"Poppins", sans-serif'
    // Change default font family
  },
  components: {
    MuiTextField: {
      defaultProps: {
        size: "small"
      }
    },
    // Override default button styles
    MuiButton: {
      styleOverrides: {
        root: {
          // fontSize: "1rem",
          // borderRadius: "8px", // Change the button border radius
          // padding: "10px 20px",
        },
        containedPrimary: {
          // backgroundColor: "#3f51b5", // Custom color for primary buttons
          // color: "#fff",
          // "&:hover": {
          //   backgroundColor: "#283593", // Darker shade on hover
          // },
        }
      }
    }
  }
});
customElements.define(
  "rwc-header",
  Vg(A2, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  Vg(p3, {
    props: { handleOnSubmit: "function" }
  })
);
customElements.define(
  "rwc-dinamyc-form",
  Vg(g3, {
    props: { formConfig: "json", onSubmit: "function" }
  })
);
customElements.define("rwc-basic-buttons", Vg(HU));
export {
  HU as BasicButtons,
  p3 as Form,
  A2 as Header,
  g3 as WrapperForm,
  x3 as theme
};
