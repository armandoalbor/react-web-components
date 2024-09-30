var SN = Object.defineProperty;
var bN = (i, s, c) => s in i ? SN(i, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : i[s] = c;
var Yv = (i, s, c) => bN(i, typeof s != "symbol" ? s + "" : s, c);
import * as ct from "react";
import xn, { forwardRef as CN, useContext as EN, Children as TN, isValidElement as Mg, cloneElement as Ag, useEffect as xN, useState as wN } from "react";
function RN(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var rC = { exports: {} }, ni = {}, gg = { exports: {} }, F1 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Cw;
function _N() {
  return Cw || (Cw = 1, function(i) {
    function s(ge, ze) {
      var Y = ge.length;
      ge.push(ze);
      e: for (; 0 < Y; ) {
        var de = Y - 1 >>> 1, Ne = ge[de];
        if (0 < m(Ne, ze)) ge[de] = ze, ge[Y] = Ne, Y = de;
        else break e;
      }
    }
    function c(ge) {
      return ge.length === 0 ? null : ge[0];
    }
    function v(ge) {
      if (ge.length === 0) return null;
      var ze = ge[0], Y = ge.pop();
      if (Y !== ze) {
        ge[0] = Y;
        e: for (var de = 0, Ne = ge.length, Xe = Ne >>> 1; de < Xe; ) {
          var Pe = 2 * (de + 1) - 1, yt = ge[Pe], Ie = Pe + 1, ut = ge[Ie];
          if (0 > m(yt, Y)) Ie < Ne && 0 > m(ut, yt) ? (ge[de] = ut, ge[Ie] = Y, de = Ie) : (ge[de] = yt, ge[Pe] = Y, de = Pe);
          else if (Ie < Ne && 0 > m(ut, Y)) ge[de] = ut, ge[Ie] = Y, de = Ie;
          else break e;
        }
      }
      return ze;
    }
    function m(ge, ze) {
      var Y = ge.sortIndex - ze.sortIndex;
      return Y !== 0 ? Y : ge.id - ze.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var S = performance;
      i.unstable_now = function() {
        return S.now();
      };
    } else {
      var y = Date, T = y.now();
      i.unstable_now = function() {
        return y.now() - T;
      };
    }
    var w = [], k = [], A = 1, O = null, z = 3, H = !1, I = !1, B = !1, F = typeof setTimeout == "function" ? setTimeout : null, ce = typeof clearTimeout == "function" ? clearTimeout : null, oe = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function X(ge) {
      for (var ze = c(k); ze !== null; ) {
        if (ze.callback === null) v(k);
        else if (ze.startTime <= ge) v(k), ze.sortIndex = ze.expirationTime, s(w, ze);
        else break;
        ze = c(k);
      }
    }
    function le(ge) {
      if (B = !1, X(ge), !I) if (c(w) !== null) I = !0, Qe(V);
      else {
        var ze = c(k);
        ze !== null && Et(le, ze.startTime - ge);
      }
    }
    function V(ge, ze) {
      I = !1, B && (B = !1, ce(et), et = -1), H = !0;
      var Y = z;
      try {
        for (X(ze), O = c(w); O !== null && (!(O.expirationTime > ze) || ge && !ke()); ) {
          var de = O.callback;
          if (typeof de == "function") {
            O.callback = null, z = O.priorityLevel;
            var Ne = de(O.expirationTime <= ze);
            ze = i.unstable_now(), typeof Ne == "function" ? O.callback = Ne : O === c(w) && v(w), X(ze);
          } else v(w);
          O = c(w);
        }
        if (O !== null) var Xe = !0;
        else {
          var Pe = c(k);
          Pe !== null && Et(le, Pe.startTime - ze), Xe = !1;
        }
        return Xe;
      } finally {
        O = null, z = Y, H = !1;
      }
    }
    var be = !1, fe = null, et = -1, _ = 5, se = -1;
    function ke() {
      return !(i.unstable_now() - se < _);
    }
    function ve() {
      if (fe !== null) {
        var ge = i.unstable_now();
        se = ge;
        var ze = !0;
        try {
          ze = fe(!0, ge);
        } finally {
          ze ? pe() : (be = !1, fe = null);
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
      fe = ge, be || (be = !0, pe());
    }
    function Et(ge, ze) {
      et = F(function() {
        ge(i.unstable_now());
      }, ze);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(ge) {
      ge.callback = null;
    }, i.unstable_continueExecution = function() {
      I || H || (I = !0, Qe(V));
    }, i.unstable_forceFrameRate = function(ge) {
      0 > ge || 125 < ge ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : _ = 0 < ge ? Math.floor(1e3 / ge) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, i.unstable_getFirstCallbackNode = function() {
      return c(w);
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
      var Y = z;
      z = ze;
      try {
        return ge();
      } finally {
        z = Y;
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
      var Y = z;
      z = ge;
      try {
        return ze();
      } finally {
        z = Y;
      }
    }, i.unstable_scheduleCallback = function(ge, ze, Y) {
      var de = i.unstable_now();
      switch (typeof Y == "object" && Y !== null ? (Y = Y.delay, Y = typeof Y == "number" && 0 < Y ? de + Y : de) : Y = de, ge) {
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
      return Ne = Y + Ne, ge = { id: A++, callback: ze, priorityLevel: ge, startTime: Y, expirationTime: Ne, sortIndex: -1 }, Y > de ? (ge.sortIndex = Y, s(k, ge), c(w) === null && ge === c(k) && (B ? (ce(et), et = -1) : B = !0, Et(le, Y - de))) : (ge.sortIndex = Ne, s(w, ge), I || H || (I = !0, Qe(V))), ge;
    }, i.unstable_shouldYield = ke, i.unstable_wrapCallback = function(ge) {
      var ze = z;
      return function() {
        var Y = z;
        z = ze;
        try {
          return ge.apply(this, arguments);
        } finally {
          z = Y;
        }
      };
    };
  }(F1)), F1;
}
var P1 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ew;
function kN() {
  return Ew || (Ew = 1, function(i) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = !1, c = !1, v = 5;
      function m(Oe, at) {
        var Ot = Oe.length;
        Oe.push(at), T(Oe, at, Ot);
      }
      function S(Oe) {
        return Oe.length === 0 ? null : Oe[0];
      }
      function y(Oe) {
        if (Oe.length === 0)
          return null;
        var at = Oe[0], Ot = Oe.pop();
        return Ot !== at && (Oe[0] = Ot, w(Oe, Ot, 0)), at;
      }
      function T(Oe, at, Ot) {
        for (var Wt = Ot; Wt > 0; ) {
          var dn = Wt - 1 >>> 1, ur = Oe[dn];
          if (k(ur, at) > 0)
            Oe[dn] = at, Oe[Wt] = ur, Wt = dn;
          else
            return;
        }
      }
      function w(Oe, at, Ot) {
        for (var Wt = Ot, dn = Oe.length, ur = dn >>> 1; Wt < ur; ) {
          var $n = (Wt + 1) * 2 - 1, Xr = Oe[$n], pn = $n + 1, ma = Oe[pn];
          if (k(Xr, at) < 0)
            pn < dn && k(ma, Xr) < 0 ? (Oe[Wt] = ma, Oe[pn] = at, Wt = pn) : (Oe[Wt] = Xr, Oe[$n] = at, Wt = $n);
          else if (pn < dn && k(ma, at) < 0)
            Oe[Wt] = ma, Oe[pn] = at, Wt = pn;
          else
            return;
        }
      }
      function k(Oe, at) {
        var Ot = Oe.sortIndex - at.sortIndex;
        return Ot !== 0 ? Ot : Oe.id - at.id;
      }
      var A = 1, O = 2, z = 3, H = 4, I = 5;
      function B(Oe, at) {
      }
      var F = typeof performance == "object" && typeof performance.now == "function";
      if (F) {
        var ce = performance;
        i.unstable_now = function() {
          return ce.now();
        };
      } else {
        var oe = Date, X = oe.now();
        i.unstable_now = function() {
          return oe.now() - X;
        };
      }
      var le = 1073741823, V = -1, be = 250, fe = 5e3, et = 1e4, _ = le, se = [], ke = [], ve = 1, pe = null, Re = z, lt = !1, Qe = !1, Et = !1, ge = typeof setTimeout == "function" ? setTimeout : null, ze = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
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
        if (Et = !1, de(Oe), !Qe)
          if (S(se) !== null)
            Qe = !0, Bt(Xe);
          else {
            var at = S(ke);
            at !== null && Dt(Ne, at.startTime - Oe);
          }
      }
      function Xe(Oe, at) {
        Qe = !1, Et && (Et = !1, jn()), lt = !0;
        var Ot = Re;
        try {
          var Wt;
          if (!c) return Pe(Oe, at);
        } finally {
          pe = null, Re = Ot, lt = !1;
        }
      }
      function Pe(Oe, at) {
        var Ot = at;
        for (de(Ot), pe = S(se); pe !== null && !s && !(pe.expirationTime > Ot && (!Oe || G())); ) {
          var Wt = pe.callback;
          if (typeof Wt == "function") {
            pe.callback = null, Re = pe.priorityLevel;
            var dn = pe.expirationTime <= Ot, ur = Wt(dn);
            Ot = i.unstable_now(), typeof ur == "function" ? pe.callback = ur : pe === S(se) && y(se), de(Ot);
          } else
            y(se);
          pe = S(se);
        }
        if (pe !== null)
          return !0;
        var $n = S(ke);
        return $n !== null && Dt(Ne, $n.startTime - Ot), !1;
      }
      function yt(Oe, at) {
        switch (Oe) {
          case A:
          case O:
          case z:
          case H:
          case I:
            break;
          default:
            Oe = z;
        }
        var Ot = Re;
        Re = Oe;
        try {
          return at();
        } finally {
          Re = Ot;
        }
      }
      function Ie(Oe) {
        var at;
        switch (Re) {
          case A:
          case O:
          case z:
            at = z;
            break;
          default:
            at = Re;
            break;
        }
        var Ot = Re;
        Re = at;
        try {
          return Oe();
        } finally {
          Re = Ot;
        }
      }
      function ut(Oe) {
        var at = Re;
        return function() {
          var Ot = Re;
          Re = at;
          try {
            return Oe.apply(this, arguments);
          } finally {
            Re = Ot;
          }
        };
      }
      function rt(Oe, at, Ot) {
        var Wt = i.unstable_now(), dn;
        if (typeof Ot == "object" && Ot !== null) {
          var ur = Ot.delay;
          typeof ur == "number" && ur > 0 ? dn = Wt + ur : dn = Wt;
        } else
          dn = Wt;
        var $n;
        switch (Oe) {
          case A:
            $n = V;
            break;
          case O:
            $n = be;
            break;
          case I:
            $n = _;
            break;
          case H:
            $n = et;
            break;
          case z:
          default:
            $n = fe;
            break;
        }
        var Xr = dn + $n, pn = {
          id: ve++,
          callback: at,
          priorityLevel: Oe,
          startTime: dn,
          expirationTime: Xr,
          sortIndex: -1
        };
        return dn > Wt ? (pn.sortIndex = dn, m(ke, pn), S(se) === null && pn === S(ke) && (Et ? jn() : Et = !0, Dt(Ne, dn - Wt))) : (pn.sortIndex = Xr, m(se, pn), !Qe && !lt && (Qe = !0, Bt(Xe))), pn;
      }
      function pt() {
      }
      function gt() {
        !Qe && !lt && (Qe = !0, Bt(Xe));
      }
      function Ut() {
        return S(se);
      }
      function we(Oe) {
        Oe.callback = null;
      }
      function Ft() {
        return Re;
      }
      var Le = !1, Xt = null, mn = -1, Nn = v, N = -1;
      function G() {
        var Oe = i.unstable_now() - N;
        return !(Oe < Nn);
      }
      function ne() {
      }
      function _e(Oe) {
        if (Oe < 0 || Oe > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Oe > 0 ? Nn = Math.floor(1e3 / Oe) : Nn = v;
      }
      var Te = function() {
        if (Xt !== null) {
          var Oe = i.unstable_now();
          N = Oe;
          var at = !0, Ot = !0;
          try {
            Ot = Xt(at, Oe);
          } finally {
            Ot ? te() : (Le = !1, Xt = null);
          }
        } else
          Le = !1;
      }, te;
      if (typeof Y == "function")
        te = function() {
          Y(Te);
        };
      else if (typeof MessageChannel < "u") {
        var Ve = new MessageChannel(), Tt = Ve.port2;
        Ve.port1.onmessage = Te, te = function() {
          Tt.postMessage(null);
        };
      } else
        te = function() {
          ge(Te, 0);
        };
      function Bt(Oe) {
        Xt = Oe, Le || (Le = !0, te());
      }
      function Dt(Oe, at) {
        mn = ge(function() {
          Oe(i.unstable_now());
        }, at);
      }
      function jn() {
        ze(mn), mn = -1;
      }
      var bi = ne, Pr = null;
      i.unstable_IdlePriority = I, i.unstable_ImmediatePriority = A, i.unstable_LowPriority = H, i.unstable_NormalPriority = z, i.unstable_Profiling = Pr, i.unstable_UserBlockingPriority = O, i.unstable_cancelCallback = we, i.unstable_continueExecution = gt, i.unstable_forceFrameRate = _e, i.unstable_getCurrentPriorityLevel = Ft, i.unstable_getFirstCallbackNode = Ut, i.unstable_next = Ie, i.unstable_pauseExecution = pt, i.unstable_requestPaint = bi, i.unstable_runWithPriority = yt, i.unstable_scheduleCallback = rt, i.unstable_shouldYield = G, i.unstable_wrapCallback = ut, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(P1)), P1;
}
var Tw;
function xR() {
  return Tw || (Tw = 1, process.env.NODE_ENV === "production" ? gg.exports = _N() : gg.exports = kN()), gg.exports;
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
var xw;
function ON() {
  if (xw) return ni;
  xw = 1;
  var i = xn, s = xR();
  function c(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var v = /* @__PURE__ */ new Set(), m = {};
  function S(n, r) {
    y(n, r), y(n + "Capture", r);
  }
  function y(n, r) {
    for (m[n] = r, n = 0; n < r.length; n++) v.add(r[n]);
  }
  var T = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), w = Object.prototype.hasOwnProperty, k = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, A = {}, O = {};
  function z(n) {
    return w.call(O, n) ? !0 : w.call(A, n) ? !1 : k.test(n) ? O[n] = !0 : (A[n] = !0, !1);
  }
  function H(n, r, l, f) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return f ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function I(n, r, l, f) {
    if (r === null || typeof r > "u" || H(n, r, l, f)) return !0;
    if (f) return !1;
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
  function B(n, r, l, f, p, g, E) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = f, this.attributeNamespace = p, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = g, this.removeEmptyString = E;
  }
  var F = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    F[n] = new B(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    F[r] = new B(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    F[n] = new B(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    F[n] = new B(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    F[n] = new B(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    F[n] = new B(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    F[n] = new B(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    F[n] = new B(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    F[n] = new B(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var ce = /[\-:]([a-z])/g;
  function oe(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      ce,
      oe
    );
    F[r] = new B(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(ce, oe);
    F[r] = new B(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(ce, oe);
    F[r] = new B(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    F[n] = new B(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), F.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    F[n] = new B(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function X(n, r, l, f) {
    var p = F.hasOwnProperty(r) ? F[r] : null;
    (p !== null ? p.type !== 0 : f || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (I(r, l, p, f) && (l = null), f || p === null ? z(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : p.mustUseProperty ? n[p.propertyName] = l === null ? p.type === 3 ? !1 : "" : l : (r = p.attributeName, f = p.attributeNamespace, l === null ? n.removeAttribute(r) : (p = p.type, l = p === 3 || p === 4 && l === !0 ? "" : "" + l, f ? n.setAttributeNS(f, r, l) : n.setAttribute(r, l))));
  }
  var le = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, V = Symbol.for("react.element"), be = Symbol.for("react.portal"), fe = Symbol.for("react.fragment"), et = Symbol.for("react.strict_mode"), _ = Symbol.for("react.profiler"), se = Symbol.for("react.provider"), ke = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), Re = Symbol.for("react.suspense_list"), lt = Symbol.for("react.memo"), Qe = Symbol.for("react.lazy"), Et = Symbol.for("react.offscreen"), ge = Symbol.iterator;
  function ze(n) {
    return n === null || typeof n != "object" ? null : (n = ge && n[ge] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Y = Object.assign, de;
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
          var f = J;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (J) {
          f = J;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (J) {
          f = J;
        }
        n();
      }
    } catch (J) {
      if (J && f && typeof J.stack == "string") {
        for (var p = J.stack.split(`
`), g = f.stack.split(`
`), E = p.length - 1, M = g.length - 1; 1 <= E && 0 <= M && p[E] !== g[M]; ) M--;
        for (; 1 <= E && 0 <= M; E--, M--) if (p[E] !== g[M]) {
          if (E !== 1 || M !== 1)
            do
              if (E--, M--, 0 > M || p[E] !== g[M]) {
                var U = `
` + p[E].replace(" at new ", " at ");
                return n.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", n.displayName)), U;
              }
            while (1 <= E && 0 <= M);
          break;
        }
      }
    } finally {
      Xe = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? Ne(n) : "";
  }
  function yt(n) {
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
      case fe:
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
  function pt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function gt(n) {
    var r = pt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), f = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var p = l.get, g = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return p.call(this);
      }, set: function(E) {
        f = "" + E, g.call(this, E);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return f;
      }, setValue: function(E) {
        f = "" + E;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Ut(n) {
    n._valueTracker || (n._valueTracker = gt(n));
  }
  function we(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), f = "";
    return n && (f = pt(n) ? n.checked ? "true" : "false" : n.value), n = f, n !== l ? (r.setValue(n), !0) : !1;
  }
  function Ft(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Le(n, r) {
    var l = r.checked;
    return Y({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Xt(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, f = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: f, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function mn(n, r) {
    r = r.checked, r != null && X(n, "checked", r, !1);
  }
  function Nn(n, r) {
    mn(n, r);
    var l = rt(r.value), f = r.type;
    if (l != null) f === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (f === "submit" || f === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? G(n, r.type, l) : r.hasOwnProperty("defaultValue") && G(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function N(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var f = r.type;
      if (!(f !== "submit" && f !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function G(n, r, l) {
    (r !== "number" || Ft(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var ne = Array.isArray;
  function _e(n, r, l, f) {
    if (n = n.options, r) {
      r = {};
      for (var p = 0; p < l.length; p++) r["$" + l[p]] = !0;
      for (l = 0; l < n.length; l++) p = r.hasOwnProperty("$" + n[l].value), n[l].selected !== p && (n[l].selected = p), p && f && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, p = 0; p < n.length; p++) {
        if (n[p].value === l) {
          n[p].selected = !0, f && (n[p].defaultSelected = !0);
          return;
        }
        r !== null || n[p].disabled || (r = n[p]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Te(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(c(91));
    return Y({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function te(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(c(92));
        if (ne(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function Ve(n, r) {
    var l = rt(r.value), f = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), f != null && (n.defaultValue = "" + f);
  }
  function Tt(n) {
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
  function Dt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Bt(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var jn, bi = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, f, p) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, f, p);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (jn = jn || document.createElement("div"), jn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = jn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Pr(n, r) {
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
  function Ot(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Oe.hasOwnProperty(n) && Oe[n] ? ("" + r).trim() : r + "px";
  }
  function Wt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var f = l.indexOf("--") === 0, p = Ot(l, r[l], f);
      l === "float" && (l = "cssFloat"), f ? n.setProperty(l, p) : n[l] = p;
    }
  }
  var dn = Y({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function ur(n, r) {
    if (r) {
      if (dn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(c(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(c(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(c(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(c(62));
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
  var Xr = null;
  function pn(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var ma = null, cn = null, vn = null;
  function ql(n) {
    if (n = As(n)) {
      if (typeof ma != "function") throw Error(c(280));
      var r = n.stateNode;
      r && (r = st(r), ma(n.stateNode, n.type, r));
    }
  }
  function rl(n) {
    cn ? vn ? vn.push(n) : vn = [n] : cn = n;
  }
  function Kl() {
    if (cn) {
      var n = cn, r = vn;
      if (vn = cn = null, ql(n), r) for (n = 0; n < r.length; n++) ql(r[n]);
    }
  }
  function cs(n, r) {
    return n(r);
  }
  function xc() {
  }
  var al = !1;
  function Xl(n, r, l) {
    if (al) return n(r, l);
    al = !0;
    try {
      return cs(n, r, l);
    } finally {
      al = !1, (cn !== null || vn !== null) && (xc(), Kl());
    }
  }
  function il(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var f = st(l);
    if (f === null) return null;
    l = f[r];
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
        (f = !f.disabled) || (n = n.type, f = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !f;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(c(231, r, typeof l));
    return l;
  }
  var Zl = !1;
  if (T) try {
    var Ci = {};
    Object.defineProperty(Ci, "passive", { get: function() {
      Zl = !0;
    } }), window.addEventListener("test", Ci, Ci), window.removeEventListener("test", Ci, Ci);
  } catch {
    Zl = !1;
  }
  function Vi(n, r, l, f, p, g, E, M, U) {
    var J = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, J);
    } catch (ye) {
      this.onError(ye);
    }
  }
  var ya = !1, oi = null, yo = !1, ol = null, L = { onError: function(n) {
    ya = !0, oi = n;
  } };
  function Se(n, r, l, f, p, g, E, M, U) {
    ya = !1, oi = null, Vi.apply(L, arguments);
  }
  function De(n, r, l, f, p, g, E, M, U) {
    if (Se.apply(this, arguments), ya) {
      if (ya) {
        var J = oi;
        ya = !1, oi = null;
      } else throw Error(c(198));
      yo || (yo = !0, ol = J);
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
  function Pt(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Vt(n) {
    if (it(n) !== n) throw Error(c(188));
  }
  function mt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = it(n), r === null) throw Error(c(188));
      return r !== n ? null : n;
    }
    for (var l = n, f = r; ; ) {
      var p = l.return;
      if (p === null) break;
      var g = p.alternate;
      if (g === null) {
        if (f = p.return, f !== null) {
          l = f;
          continue;
        }
        break;
      }
      if (p.child === g.child) {
        for (g = p.child; g; ) {
          if (g === l) return Vt(p), n;
          if (g === f) return Vt(p), r;
          g = g.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== f.return) l = p, f = g;
      else {
        for (var E = !1, M = p.child; M; ) {
          if (M === l) {
            E = !0, l = p, f = g;
            break;
          }
          if (M === f) {
            E = !0, f = p, l = g;
            break;
          }
          M = M.sibling;
        }
        if (!E) {
          for (M = g.child; M; ) {
            if (M === l) {
              E = !0, l = g, f = p;
              break;
            }
            if (M === f) {
              E = !0, f = g, l = p;
              break;
            }
            M = M.sibling;
          }
          if (!E) throw Error(c(189));
        }
      }
      if (l.alternate !== f) throw Error(c(190));
    }
    if (l.tag !== 3) throw Error(c(188));
    return l.stateNode.current === l ? n : r;
  }
  function Mt(n) {
    return n = mt(n), n !== null ? sr(n) : null;
  }
  function sr(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = sr(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var yn = s.unstable_scheduleCallback, kn = s.unstable_cancelCallback, Zr = s.unstable_shouldYield, go = s.unstable_requestPaint, Qt = s.unstable_now, Mr = s.unstable_getCurrentPriorityLevel, ga = s.unstable_ImmediatePriority, At = s.unstable_UserBlockingPriority, Ei = s.unstable_NormalPriority, hh = s.unstable_LowPriority, Ld = s.unstable_IdlePriority, fs = null, li = null;
  function mh(n) {
    if (li && typeof li.onCommitFiberRoot == "function") try {
      li.onCommitFiberRoot(fs, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var La = Math.clz32 ? Math.clz32 : s0, yh = Math.log, gh = Math.LN2;
  function s0(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (yh(n) / gh | 0) | 0;
  }
  var wc = 64, Jl = 4194304;
  function ll(n) {
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
  function ui(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var f = 0, p = n.suspendedLanes, g = n.pingedLanes, E = l & 268435455;
    if (E !== 0) {
      var M = E & ~p;
      M !== 0 ? f = ll(M) : (g &= E, g !== 0 && (f = ll(g)));
    } else E = l & ~p, E !== 0 ? f = ll(E) : g !== 0 && (f = ll(g));
    if (f === 0) return 0;
    if (r !== 0 && r !== f && !(r & p) && (p = f & -f, g = r & -r, p >= g || p === 16 && (g & 4194240) !== 0)) return r;
    if (f & 4 && (f |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= f; 0 < r; ) l = 31 - La(r), p = 1 << l, f |= n[l], r &= ~p;
    return f;
  }
  function zd(n, r) {
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
  function Rc(n, r) {
    for (var l = n.suspendedLanes, f = n.pingedLanes, p = n.expirationTimes, g = n.pendingLanes; 0 < g; ) {
      var E = 31 - La(g), M = 1 << E, U = p[E];
      U === -1 ? (!(M & l) || M & f) && (p[E] = zd(M, r)) : U <= r && (n.expiredLanes |= M), g &= ~M;
    }
  }
  function Ud(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function _c() {
    var n = wc;
    return wc <<= 1, !(wc & 4194240) && (wc = 64), n;
  }
  function Fd(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function ul(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - La(r), n[r] = l;
  }
  function c0(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var f = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var p = 31 - La(l), g = 1 << p;
      r[p] = 0, f[p] = -1, n[p] = -1, l &= ~g;
    }
  }
  function ds(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var f = 31 - La(l), p = 1 << f;
      p & r | n[f] & r && (n[f] |= r), l &= ~p;
    }
  }
  var Zt = 0;
  function Pd(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Sh, kc, Jt, bh, jd, Rt = !1, ps = [], Yn = null, za = null, Ua = null, vs = /* @__PURE__ */ new Map(), Zn = /* @__PURE__ */ new Map(), nn = [], f0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function si(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Yn = null;
        break;
      case "dragenter":
      case "dragleave":
        za = null;
        break;
      case "mouseover":
      case "mouseout":
        Ua = null;
        break;
      case "pointerover":
      case "pointerout":
        vs.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Zn.delete(r.pointerId);
    }
  }
  function Ar(n, r, l, f, p, g) {
    return n === null || n.nativeEvent !== g ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: f, nativeEvent: g, targetContainers: [p] }, r !== null && (r = As(r), r !== null && kc(r)), n) : (n.eventSystemFlags |= f, r = n.targetContainers, p !== null && r.indexOf(p) === -1 && r.push(p), n);
  }
  function So(n, r, l, f, p) {
    switch (r) {
      case "focusin":
        return Yn = Ar(Yn, n, r, l, f, p), !0;
      case "dragenter":
        return za = Ar(za, n, r, l, f, p), !0;
      case "mouseover":
        return Ua = Ar(Ua, n, r, l, f, p), !0;
      case "pointerover":
        var g = p.pointerId;
        return vs.set(g, Ar(vs.get(g) || null, n, r, l, f, p)), !0;
      case "gotpointercapture":
        return g = p.pointerId, Zn.set(g, Ar(Zn.get(g) || null, n, r, l, f, p)), !0;
    }
    return !1;
  }
  function Ch(n) {
    var r = Pa(n.target);
    if (r !== null) {
      var l = it(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Pt(l), r !== null) {
            n.blockedOn = r, jd(n.priority, function() {
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
  function eu(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Mc(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var f = new l.constructor(l.type, l);
        Xr = f, l.target.dispatchEvent(f), Xr = null;
      } else return r = As(l), r !== null && kc(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function $d(n, r, l) {
    eu(n) && l.delete(r);
  }
  function Eh() {
    Rt = !1, Yn !== null && eu(Yn) && (Yn = null), za !== null && eu(za) && (za = null), Ua !== null && eu(Ua) && (Ua = null), vs.forEach($d), Zn.forEach($d);
  }
  function hs(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Rt || (Rt = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, Eh)));
  }
  function ms(n) {
    function r(p) {
      return hs(p, n);
    }
    if (0 < ps.length) {
      hs(ps[0], n);
      for (var l = 1; l < ps.length; l++) {
        var f = ps[l];
        f.blockedOn === n && (f.blockedOn = null);
      }
    }
    for (Yn !== null && hs(Yn, n), za !== null && hs(za, n), Ua !== null && hs(Ua, n), vs.forEach(r), Zn.forEach(r), l = 0; l < nn.length; l++) f = nn[l], f.blockedOn === n && (f.blockedOn = null);
    for (; 0 < nn.length && (l = nn[0], l.blockedOn === null); ) Ch(l), l.blockedOn === null && nn.shift();
  }
  var tu = le.ReactCurrentBatchConfig, sl = !0;
  function Th(n, r, l, f) {
    var p = Zt, g = tu.transition;
    tu.transition = null;
    try {
      Zt = 1, Dc(n, r, l, f);
    } finally {
      Zt = p, tu.transition = g;
    }
  }
  function Oc(n, r, l, f) {
    var p = Zt, g = tu.transition;
    tu.transition = null;
    try {
      Zt = 4, Dc(n, r, l, f);
    } finally {
      Zt = p, tu.transition = g;
    }
  }
  function Dc(n, r, l, f) {
    if (sl) {
      var p = Mc(n, r, l, f);
      if (p === null) Hc(n, r, f, ys, l), si(n, f);
      else if (So(p, n, r, l, f)) f.stopPropagation();
      else if (si(n, f), r & 4 && -1 < f0.indexOf(n)) {
        for (; p !== null; ) {
          var g = As(p);
          if (g !== null && Sh(g), g = Mc(n, r, l, f), g === null && Hc(n, r, f, ys, l), g === p) break;
          p = g;
        }
        p !== null && f.stopPropagation();
      } else Hc(n, r, f, null, l);
    }
  }
  var ys = null;
  function Mc(n, r, l, f) {
    if (ys = null, n = pn(f), n = Pa(n), n !== null) if (r = it(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Pt(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return ys = n, null;
  }
  function Vd(n) {
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
        switch (Mr()) {
          case ga:
            return 1;
          case At:
            return 4;
          case Ei:
          case hh:
            return 16;
          case Ld:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Bi = null, gs = null, Ss = null;
  function Bd() {
    if (Ss) return Ss;
    var n, r = gs, l = r.length, f, p = "value" in Bi ? Bi.value : Bi.textContent, g = p.length;
    for (n = 0; n < l && r[n] === p[n]; n++) ;
    var E = l - n;
    for (f = 1; f <= E && r[l - f] === p[g - f]; f++) ;
    return Ss = p.slice(n, 1 < f ? 1 - f : void 0);
  }
  function nu(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function bs() {
    return !0;
  }
  function xh() {
    return !1;
  }
  function Sa(n) {
    function r(l, f, p, g, E) {
      this._reactName = l, this._targetInst = p, this.type = f, this.nativeEvent = g, this.target = E, this.currentTarget = null;
      for (var M in n) n.hasOwnProperty(M) && (l = n[M], this[M] = l ? l(g) : g[M]);
      return this.isDefaultPrevented = (g.defaultPrevented != null ? g.defaultPrevented : g.returnValue === !1) ? bs : xh, this.isPropagationStopped = xh, this;
    }
    return Y(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = bs);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = bs);
    }, persist: function() {
    }, isPersistent: bs }), r;
  }
  var bo = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ac = Sa(bo), ru = Y({}, bo, { view: 0, detail: 0 }), wh = Sa(ru), Nc, Hd, Cs, cr = Y({}, ru, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Gd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Cs && (Cs && n.type === "mousemove" ? (Nc = n.screenX - Cs.screenX, Hd = n.screenY - Cs.screenY) : Hd = Nc = 0, Cs = n), Nc);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Hd;
  } }), Lc = Sa(cr), Rh = Y({}, cr, { dataTransfer: 0 }), _h = Sa(Rh), d0 = Y({}, ru, { relatedTarget: 0 }), Co = Sa(d0), Id = Y({}, bo, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), kh = Sa(Id), p0 = Y({}, bo, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), v0 = Sa(p0), h0 = Y({}, bo, { data: 0 }), Yd = Sa(h0), Wd = {
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
  }, Oh = {
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
  }, Dh = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Mh(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Dh[n]) ? !!r[n] : !1;
  }
  function Gd() {
    return Mh;
  }
  var Hi = Y({}, ru, { key: function(n) {
    if (n.key) {
      var r = Wd[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = nu(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Oh[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Gd, charCode: function(n) {
    return n.type === "keypress" ? nu(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? nu(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), m0 = Sa(Hi), Qd = Y({}, cr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), zc = Sa(Qd), qd = Y({}, ru, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Gd }), y0 = Sa(qd), Uc = Y({}, bo, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Ah = Sa(Uc), Jr = Y({}, cr, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ii = Sa(Jr), Wn = [9, 13, 27, 32], ci = T && "CompositionEvent" in window, cl = null;
  T && "documentMode" in document && (cl = document.documentMode);
  var Fc = T && "TextEvent" in window && !cl, Nh = T && (!ci || cl && 8 < cl && 11 >= cl), au = " ", Lh = !1;
  function zh(n, r) {
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
  function Pc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var iu = !1;
  function g0(n, r) {
    switch (n) {
      case "compositionend":
        return Pc(r);
      case "keypress":
        return r.which !== 32 ? null : (Lh = !0, au);
      case "textInput":
        return n = r.data, n === au && Lh ? null : n;
      default:
        return null;
    }
  }
  function S0(n, r) {
    if (iu) return n === "compositionend" || !ci && zh(n, r) ? (n = Bd(), Ss = gs = Bi = null, iu = !1, n) : null;
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
        return Nh && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Uh = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Fh(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Uh[n.type] : r === "textarea";
  }
  function Ph(n, r, l, f) {
    rl(f), r = Os(r, "onChange"), 0 < r.length && (l = new Ac("onChange", "change", null, l, f), n.push({ event: l, listeners: r }));
  }
  var Es = null, ou = null;
  function lu(n) {
    Bc(n, 0);
  }
  function uu(n) {
    var r = cu(n);
    if (we(r)) return n;
  }
  function jh(n, r) {
    if (n === "change") return r;
  }
  var Kd = !1;
  if (T) {
    var Xd;
    if (T) {
      var Zd = "oninput" in document;
      if (!Zd) {
        var $h = document.createElement("div");
        $h.setAttribute("oninput", "return;"), Zd = typeof $h.oninput == "function";
      }
      Xd = Zd;
    } else Xd = !1;
    Kd = Xd && (!document.documentMode || 9 < document.documentMode);
  }
  function Vh() {
    Es && (Es.detachEvent("onpropertychange", Bh), ou = Es = null);
  }
  function Bh(n) {
    if (n.propertyName === "value" && uu(ou)) {
      var r = [];
      Ph(r, ou, n, pn(n)), Xl(lu, r);
    }
  }
  function b0(n, r, l) {
    n === "focusin" ? (Vh(), Es = r, ou = l, Es.attachEvent("onpropertychange", Bh)) : n === "focusout" && Vh();
  }
  function C0(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return uu(ou);
  }
  function E0(n, r) {
    if (n === "click") return uu(r);
  }
  function Hh(n, r) {
    if (n === "input" || n === "change") return uu(r);
  }
  function T0(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Fa = typeof Object.is == "function" ? Object.is : T0;
  function Ts(n, r) {
    if (Fa(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), f = Object.keys(r);
    if (l.length !== f.length) return !1;
    for (f = 0; f < l.length; f++) {
      var p = l[f];
      if (!w.call(r, p) || !Fa(n[p], r[p])) return !1;
    }
    return !0;
  }
  function Ih(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Yh(n, r) {
    var l = Ih(n);
    n = 0;
    for (var f; l; ) {
      if (l.nodeType === 3) {
        if (f = n + l.textContent.length, n <= r && f >= r) return { node: l, offset: r - n };
        n = f;
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
      l = Ih(l);
    }
  }
  function Wh(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Wh(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function jc() {
    for (var n = window, r = Ft(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = Ft(n.document);
    }
    return r;
  }
  function Yi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function $c(n) {
    var r = jc(), l = n.focusedElem, f = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Wh(l.ownerDocument.documentElement, l)) {
      if (f !== null && Yi(l)) {
        if (r = f.start, n = f.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var p = l.textContent.length, g = Math.min(f.start, p);
          f = f.end === void 0 ? g : Math.min(f.end, p), !n.extend && g > f && (p = f, f = g, g = p), p = Yh(l, g);
          var E = Yh(
            l,
            f
          );
          p && E && (n.rangeCount !== 1 || n.anchorNode !== p.node || n.anchorOffset !== p.offset || n.focusNode !== E.node || n.focusOffset !== E.offset) && (r = r.createRange(), r.setStart(p.node, p.offset), n.removeAllRanges(), g > f ? (n.addRange(r), n.extend(E.node, E.offset)) : (r.setEnd(E.node, E.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Gh = T && "documentMode" in document && 11 >= document.documentMode, fi = null, Jd = null, xs = null, ep = !1;
  function Qh(n, r, l) {
    var f = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    ep || fi == null || fi !== Ft(f) || (f = fi, "selectionStart" in f && Yi(f) ? f = { start: f.selectionStart, end: f.selectionEnd } : (f = (f.ownerDocument && f.ownerDocument.defaultView || window).getSelection(), f = { anchorNode: f.anchorNode, anchorOffset: f.anchorOffset, focusNode: f.focusNode, focusOffset: f.focusOffset }), xs && Ts(xs, f) || (xs = f, f = Os(Jd, "onSelect"), 0 < f.length && (r = new Ac("onSelect", "select", null, r, l), n.push({ event: r, listeners: f }), r.target = fi)));
  }
  function Vc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var fl = { animationend: Vc("Animation", "AnimationEnd"), animationiteration: Vc("Animation", "AnimationIteration"), animationstart: Vc("Animation", "AnimationStart"), transitionend: Vc("Transition", "TransitionEnd") }, tp = {}, np = {};
  T && (np = document.createElement("div").style, "AnimationEvent" in window || (delete fl.animationend.animation, delete fl.animationiteration.animation, delete fl.animationstart.animation), "TransitionEvent" in window || delete fl.transitionend.transition);
  function fr(n) {
    if (tp[n]) return tp[n];
    if (!fl[n]) return n;
    var r = fl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in np) return tp[n] = r[l];
    return n;
  }
  var rp = fr("animationend"), qh = fr("animationiteration"), Kh = fr("animationstart"), Xh = fr("transitionend"), Zh = /* @__PURE__ */ new Map(), Jh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Wi(n, r) {
    Zh.set(n, r), S(r, [n]);
  }
  for (var ws = 0; ws < Jh.length; ws++) {
    var dl = Jh[ws], x0 = dl.toLowerCase(), Rs = dl[0].toUpperCase() + dl.slice(1);
    Wi(x0, "on" + Rs);
  }
  Wi(rp, "onAnimationEnd"), Wi(qh, "onAnimationIteration"), Wi(Kh, "onAnimationStart"), Wi("dblclick", "onDoubleClick"), Wi("focusin", "onFocus"), Wi("focusout", "onBlur"), Wi(Xh, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), S("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), S("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), S("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), S("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), S("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), S("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var _s = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), w0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(_s));
  function em(n, r, l) {
    var f = n.type || "unknown-event";
    n.currentTarget = l, De(f, r, void 0, n), n.currentTarget = null;
  }
  function Bc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var f = n[l], p = f.event;
      f = f.listeners;
      e: {
        var g = void 0;
        if (r) for (var E = f.length - 1; 0 <= E; E--) {
          var M = f[E], U = M.instance, J = M.currentTarget;
          if (M = M.listener, U !== g && p.isPropagationStopped()) break e;
          em(p, M, J), g = U;
        }
        else for (E = 0; E < f.length; E++) {
          if (M = f[E], U = M.instance, J = M.currentTarget, M = M.listener, U !== g && p.isPropagationStopped()) break e;
          em(p, M, J), g = U;
        }
      }
    }
    if (yo) throw n = ol, yo = !1, ol = null, n;
  }
  function fn(n, r) {
    var l = r[cp];
    l === void 0 && (l = r[cp] = /* @__PURE__ */ new Set());
    var f = n + "__bubble";
    l.has(f) || (tm(r, n, 2, !1), l.add(f));
  }
  function Eo(n, r, l) {
    var f = 0;
    r && (f |= 4), tm(l, n, f, r);
  }
  var Gi = "_reactListening" + Math.random().toString(36).slice(2);
  function su(n) {
    if (!n[Gi]) {
      n[Gi] = !0, v.forEach(function(l) {
        l !== "selectionchange" && (w0.has(l) || Eo(l, !1, n), Eo(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Gi] || (r[Gi] = !0, Eo("selectionchange", !1, r));
    }
  }
  function tm(n, r, l, f) {
    switch (Vd(r)) {
      case 1:
        var p = Th;
        break;
      case 4:
        p = Oc;
        break;
      default:
        p = Dc;
    }
    l = p.bind(null, r, l, n), p = void 0, !Zl || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (p = !0), f ? p !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: p }) : n.addEventListener(r, l, !0) : p !== void 0 ? n.addEventListener(r, l, { passive: p }) : n.addEventListener(r, l, !1);
  }
  function Hc(n, r, l, f, p) {
    var g = f;
    if (!(r & 1) && !(r & 2) && f !== null) e: for (; ; ) {
      if (f === null) return;
      var E = f.tag;
      if (E === 3 || E === 4) {
        var M = f.stateNode.containerInfo;
        if (M === p || M.nodeType === 8 && M.parentNode === p) break;
        if (E === 4) for (E = f.return; E !== null; ) {
          var U = E.tag;
          if ((U === 3 || U === 4) && (U = E.stateNode.containerInfo, U === p || U.nodeType === 8 && U.parentNode === p)) return;
          E = E.return;
        }
        for (; M !== null; ) {
          if (E = Pa(M), E === null) return;
          if (U = E.tag, U === 5 || U === 6) {
            f = g = E;
            continue e;
          }
          M = M.parentNode;
        }
      }
      f = f.return;
    }
    Xl(function() {
      var J = g, ye = pn(l), Ce = [];
      e: {
        var me = Zh.get(n);
        if (me !== void 0) {
          var je = Ac, Ye = n;
          switch (n) {
            case "keypress":
              if (nu(l) === 0) break e;
            case "keydown":
            case "keyup":
              je = m0;
              break;
            case "focusin":
              Ye = "focus", je = Co;
              break;
            case "focusout":
              Ye = "blur", je = Co;
              break;
            case "beforeblur":
            case "afterblur":
              je = Co;
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
              je = Lc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              je = _h;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              je = y0;
              break;
            case rp:
            case qh:
            case Kh:
              je = kh;
              break;
            case Xh:
              je = Ah;
              break;
            case "scroll":
              je = wh;
              break;
            case "wheel":
              je = Ii;
              break;
            case "copy":
            case "cut":
            case "paste":
              je = v0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              je = zc;
          }
          var qe = (r & 4) !== 0, Hn = !qe && n === "scroll", W = qe ? me !== null ? me + "Capture" : null : me;
          qe = [];
          for (var j = J, K; j !== null; ) {
            K = j;
            var xe = K.stateNode;
            if (K.tag === 5 && xe !== null && (K = xe, W !== null && (xe = il(j, W), xe != null && qe.push(ks(j, xe, K)))), Hn) break;
            j = j.return;
          }
          0 < qe.length && (me = new je(me, Ye, null, l, ye), Ce.push({ event: me, listeners: qe }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (me = n === "mouseover" || n === "pointerover", je = n === "mouseout" || n === "pointerout", me && l !== Xr && (Ye = l.relatedTarget || l.fromElement) && (Pa(Ye) || Ye[Qi])) break e;
          if ((je || me) && (me = ye.window === ye ? ye : (me = ye.ownerDocument) ? me.defaultView || me.parentWindow : window, je ? (Ye = l.relatedTarget || l.toElement, je = J, Ye = Ye ? Pa(Ye) : null, Ye !== null && (Hn = it(Ye), Ye !== Hn || Ye.tag !== 5 && Ye.tag !== 6) && (Ye = null)) : (je = null, Ye = J), je !== Ye)) {
            if (qe = Lc, xe = "onMouseLeave", W = "onMouseEnter", j = "mouse", (n === "pointerout" || n === "pointerover") && (qe = zc, xe = "onPointerLeave", W = "onPointerEnter", j = "pointer"), Hn = je == null ? me : cu(je), K = Ye == null ? me : cu(Ye), me = new qe(xe, j + "leave", je, l, ye), me.target = Hn, me.relatedTarget = K, xe = null, Pa(ye) === J && (qe = new qe(W, j + "enter", Ye, l, ye), qe.target = K, qe.relatedTarget = Hn, xe = qe), Hn = xe, je && Ye) t: {
              for (qe = je, W = Ye, j = 0, K = qe; K; K = pl(K)) j++;
              for (K = 0, xe = W; xe; xe = pl(xe)) K++;
              for (; 0 < j - K; ) qe = pl(qe), j--;
              for (; 0 < K - j; ) W = pl(W), K--;
              for (; j--; ) {
                if (qe === W || W !== null && qe === W.alternate) break t;
                qe = pl(qe), W = pl(W);
              }
              qe = null;
            }
            else qe = null;
            je !== null && ap(Ce, me, je, qe, !1), Ye !== null && Hn !== null && ap(Ce, Hn, Ye, qe, !0);
          }
        }
        e: {
          if (me = J ? cu(J) : window, je = me.nodeName && me.nodeName.toLowerCase(), je === "select" || je === "input" && me.type === "file") var Je = jh;
          else if (Fh(me)) if (Kd) Je = Hh;
          else {
            Je = C0;
            var dt = b0;
          }
          else (je = me.nodeName) && je.toLowerCase() === "input" && (me.type === "checkbox" || me.type === "radio") && (Je = E0);
          if (Je && (Je = Je(n, J))) {
            Ph(Ce, Je, l, ye);
            break e;
          }
          dt && dt(n, me, J), n === "focusout" && (dt = me._wrapperState) && dt.controlled && me.type === "number" && G(me, "number", me.value);
        }
        switch (dt = J ? cu(J) : window, n) {
          case "focusin":
            (Fh(dt) || dt.contentEditable === "true") && (fi = dt, Jd = J, xs = null);
            break;
          case "focusout":
            xs = Jd = fi = null;
            break;
          case "mousedown":
            ep = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ep = !1, Qh(Ce, l, ye);
            break;
          case "selectionchange":
            if (Gh) break;
          case "keydown":
          case "keyup":
            Qh(Ce, l, ye);
        }
        var We;
        if (ci) e: {
          switch (n) {
            case "compositionstart":
              var vt = "onCompositionStart";
              break e;
            case "compositionend":
              vt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              vt = "onCompositionUpdate";
              break e;
          }
          vt = void 0;
        }
        else iu ? zh(n, l) && (vt = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (vt = "onCompositionStart");
        vt && (Nh && l.locale !== "ko" && (iu || vt !== "onCompositionStart" ? vt === "onCompositionEnd" && iu && (We = Bd()) : (Bi = ye, gs = "value" in Bi ? Bi.value : Bi.textContent, iu = !0)), dt = Os(J, vt), 0 < dt.length && (vt = new Yd(vt, n, null, l, ye), Ce.push({ event: vt, listeners: dt }), We ? vt.data = We : (We = Pc(l), We !== null && (vt.data = We)))), (We = Fc ? g0(n, l) : S0(n, l)) && (J = Os(J, "onBeforeInput"), 0 < J.length && (ye = new Yd("onBeforeInput", "beforeinput", null, l, ye), Ce.push({ event: ye, listeners: J }), ye.data = We));
      }
      Bc(Ce, r);
    });
  }
  function ks(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function Os(n, r) {
    for (var l = r + "Capture", f = []; n !== null; ) {
      var p = n, g = p.stateNode;
      p.tag === 5 && g !== null && (p = g, g = il(n, l), g != null && f.unshift(ks(n, g, p)), g = il(n, r), g != null && f.push(ks(n, g, p))), n = n.return;
    }
    return f;
  }
  function pl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function ap(n, r, l, f, p) {
    for (var g = r._reactName, E = []; l !== null && l !== f; ) {
      var M = l, U = M.alternate, J = M.stateNode;
      if (U !== null && U === f) break;
      M.tag === 5 && J !== null && (M = J, p ? (U = il(l, g), U != null && E.unshift(ks(l, U, M))) : p || (U = il(l, g), U != null && E.push(ks(l, U, M)))), l = l.return;
    }
    E.length !== 0 && n.push({ event: r, listeners: E });
  }
  var ip = /\r\n?/g, R0 = /\u0000|\uFFFD/g;
  function op(n) {
    return (typeof n == "string" ? n : "" + n).replace(ip, `
`).replace(R0, "");
  }
  function Ic(n, r, l) {
    if (r = op(r), op(n) !== r && l) throw Error(c(425));
  }
  function Yc() {
  }
  var lp = null, vl = null;
  function Ds(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var hl = typeof setTimeout == "function" ? setTimeout : void 0, nm = typeof clearTimeout == "function" ? clearTimeout : void 0, up = typeof Promise == "function" ? Promise : void 0, sp = typeof queueMicrotask == "function" ? queueMicrotask : typeof up < "u" ? function(n) {
    return up.resolve(null).then(n).catch(_0);
  } : hl;
  function _0(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function To(n, r) {
    var l = r, f = 0;
    do {
      var p = l.nextSibling;
      if (n.removeChild(l), p && p.nodeType === 8) if (l = p.data, l === "/$") {
        if (f === 0) {
          n.removeChild(p), ms(r);
          return;
        }
        f--;
      } else l !== "$" && l !== "$?" && l !== "$!" || f++;
      l = p;
    } while (l);
    ms(r);
  }
  function di(n) {
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
  function Ms(n) {
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
  var xo = Math.random().toString(36).slice(2), Ti = "__reactFiber$" + xo, ml = "__reactProps$" + xo, Qi = "__reactContainer$" + xo, cp = "__reactEvents$" + xo, k0 = "__reactListeners$" + xo, fp = "__reactHandles$" + xo;
  function Pa(n) {
    var r = n[Ti];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Qi] || l[Ti]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Ms(n); n !== null; ) {
          if (l = n[Ti]) return l;
          n = Ms(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function As(n) {
    return n = n[Ti] || n[Qi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function cu(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(c(33));
  }
  function st(n) {
    return n[ml] || null;
  }
  var wo = [], gn = -1;
  function kt(n) {
    return { current: n };
  }
  function Gt(n) {
    0 > gn || (n.current = wo[gn], wo[gn] = null, gn--);
  }
  function qt(n, r) {
    gn++, wo[gn] = n.current, n.current = r;
  }
  var xi = {}, bt = kt(xi), Ln = kt(!1), ea = xi;
  function ja(n, r) {
    var l = n.type.contextTypes;
    if (!l) return xi;
    var f = n.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === r) return f.__reactInternalMemoizedMaskedChildContext;
    var p = {}, g;
    for (g in l) p[g] = r[g];
    return f && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = p), p;
  }
  function wn(n) {
    return n = n.childContextTypes, n != null;
  }
  function $a() {
    Gt(Ln), Gt(bt);
  }
  function Ro(n, r, l) {
    if (bt.current !== xi) throw Error(c(168));
    qt(bt, r), qt(Ln, l);
  }
  function Ns(n, r, l) {
    var f = n.stateNode;
    if (r = r.childContextTypes, typeof f.getChildContext != "function") return l;
    f = f.getChildContext();
    for (var p in f) if (!(p in r)) throw Error(c(108, ut(n) || "Unknown", p));
    return Y({}, l, f);
  }
  function Wc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || xi, ea = bt.current, qt(bt, n), qt(Ln, Ln.current), !0;
  }
  function rm(n, r, l) {
    var f = n.stateNode;
    if (!f) throw Error(c(169));
    l ? (n = Ns(n, r, ea), f.__reactInternalMemoizedMergedChildContext = n, Gt(Ln), Gt(bt), qt(bt, n)) : Gt(Ln), qt(Ln, l);
  }
  var ba = null, dr = !1, Ls = !1;
  function dp(n) {
    ba === null ? ba = [n] : ba.push(n);
  }
  function pp(n) {
    dr = !0, dp(n);
  }
  function ta() {
    if (!Ls && ba !== null) {
      Ls = !0;
      var n = 0, r = Zt;
      try {
        var l = ba;
        for (Zt = 1; n < l.length; n++) {
          var f = l[n];
          do
            f = f(!0);
          while (f !== null);
        }
        ba = null, dr = !1;
      } catch (p) {
        throw ba !== null && (ba = ba.slice(n + 1)), yn(ga, ta), p;
      } finally {
        Zt = r, Ls = !1;
      }
    }
    return null;
  }
  var _o = [], na = 0, yl = null, fu = 0, ra = [], Nr = 0, Va = null, Sr = 1, qi = "";
  function Ca(n, r) {
    _o[na++] = fu, _o[na++] = yl, yl = n, fu = r;
  }
  function vp(n, r, l) {
    ra[Nr++] = Sr, ra[Nr++] = qi, ra[Nr++] = Va, Va = n;
    var f = Sr;
    n = qi;
    var p = 32 - La(f) - 1;
    f &= ~(1 << p), l += 1;
    var g = 32 - La(r) + p;
    if (30 < g) {
      var E = p - p % 5;
      g = (f & (1 << E) - 1).toString(32), f >>= E, p -= E, Sr = 1 << 32 - La(r) + p | l << p | f, qi = g + n;
    } else Sr = 1 << g | l << p | f, qi = n;
  }
  function Gc(n) {
    n.return !== null && (Ca(n, 1), vp(n, 1, 0));
  }
  function hp(n) {
    for (; n === yl; ) yl = _o[--na], _o[na] = null, fu = _o[--na], _o[na] = null;
    for (; n === Va; ) Va = ra[--Nr], ra[Nr] = null, qi = ra[--Nr], ra[Nr] = null, Sr = ra[--Nr], ra[Nr] = null;
  }
  var Ea = null, aa = null, Sn = !1, Ba = null;
  function mp(n, r) {
    var l = Ka(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function am(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Ea = n, aa = di(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Ea = n, aa = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Va !== null ? { id: Sr, overflow: qi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Ka(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Ea = n, aa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Qc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function qc(n) {
    if (Sn) {
      var r = aa;
      if (r) {
        var l = r;
        if (!am(n, r)) {
          if (Qc(n)) throw Error(c(418));
          r = di(l.nextSibling);
          var f = Ea;
          r && am(n, r) ? mp(f, l) : (n.flags = n.flags & -4097 | 2, Sn = !1, Ea = n);
        }
      } else {
        if (Qc(n)) throw Error(c(418));
        n.flags = n.flags & -4097 | 2, Sn = !1, Ea = n;
      }
    }
  }
  function im(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Ea = n;
  }
  function Kc(n) {
    if (n !== Ea) return !1;
    if (!Sn) return im(n), Sn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ds(n.type, n.memoizedProps)), r && (r = aa)) {
      if (Qc(n)) throw om(), Error(c(418));
      for (; r; ) mp(n, r), r = di(r.nextSibling);
    }
    if (im(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                aa = di(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        aa = null;
      }
    } else aa = Ea ? di(n.stateNode.nextSibling) : null;
    return !0;
  }
  function om() {
    for (var n = aa; n; ) n = di(n.nextSibling);
  }
  function On() {
    aa = Ea = null, Sn = !1;
  }
  function yp(n) {
    Ba === null ? Ba = [n] : Ba.push(n);
  }
  var Xc = le.ReactCurrentBatchConfig;
  function gl(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(c(309));
          var f = l.stateNode;
        }
        if (!f) throw Error(c(147, n));
        var p = f, g = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === g ? r.ref : (r = function(E) {
          var M = p.refs;
          E === null ? delete M[g] : M[g] = E;
        }, r._stringRef = g, r);
      }
      if (typeof n != "string") throw Error(c(284));
      if (!l._owner) throw Error(c(290, n));
    }
    return n;
  }
  function wi(n, r) {
    throw n = Object.prototype.toString.call(r), Error(c(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function lm(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Zc(n) {
    function r(W, j) {
      if (n) {
        var K = W.deletions;
        K === null ? (W.deletions = [j], W.flags |= 16) : K.push(j);
      }
    }
    function l(W, j) {
      if (!n) return null;
      for (; j !== null; ) r(W, j), j = j.sibling;
      return null;
    }
    function f(W, j) {
      for (W = /* @__PURE__ */ new Map(); j !== null; ) j.key !== null ? W.set(j.key, j) : W.set(j.index, j), j = j.sibling;
      return W;
    }
    function p(W, j) {
      return W = zo(W, j), W.index = 0, W.sibling = null, W;
    }
    function g(W, j, K) {
      return W.index = K, n ? (K = W.alternate, K !== null ? (K = K.index, K < j ? (W.flags |= 2, j) : K) : (W.flags |= 2, j)) : (W.flags |= 1048576, j);
    }
    function E(W) {
      return n && W.alternate === null && (W.flags |= 2), W;
    }
    function M(W, j, K, xe) {
      return j === null || j.tag !== 6 ? (j = $f(K, W.mode, xe), j.return = W, j) : (j = p(j, K), j.return = W, j);
    }
    function U(W, j, K, xe) {
      var Je = K.type;
      return Je === fe ? ye(W, j, K.props.children, xe, K.key) : j !== null && (j.elementType === Je || typeof Je == "object" && Je !== null && Je.$$typeof === Qe && lm(Je) === j.type) ? (xe = p(j, K.props), xe.ref = gl(W, j, K), xe.return = W, xe) : (xe = Pf(K.type, K.key, K.props, null, W.mode, xe), xe.ref = gl(W, j, K), xe.return = W, xe);
    }
    function J(W, j, K, xe) {
      return j === null || j.tag !== 4 || j.stateNode.containerInfo !== K.containerInfo || j.stateNode.implementation !== K.implementation ? (j = Zs(K, W.mode, xe), j.return = W, j) : (j = p(j, K.children || []), j.return = W, j);
    }
    function ye(W, j, K, xe, Je) {
      return j === null || j.tag !== 7 ? (j = Nl(K, W.mode, xe, Je), j.return = W, j) : (j = p(j, K), j.return = W, j);
    }
    function Ce(W, j, K) {
      if (typeof j == "string" && j !== "" || typeof j == "number") return j = $f("" + j, W.mode, K), j.return = W, j;
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case V:
            return K = Pf(j.type, j.key, j.props, null, W.mode, K), K.ref = gl(W, null, j), K.return = W, K;
          case be:
            return j = Zs(j, W.mode, K), j.return = W, j;
          case Qe:
            var xe = j._init;
            return Ce(W, xe(j._payload), K);
        }
        if (ne(j) || ze(j)) return j = Nl(j, W.mode, K, null), j.return = W, j;
        wi(W, j);
      }
      return null;
    }
    function me(W, j, K, xe) {
      var Je = j !== null ? j.key : null;
      if (typeof K == "string" && K !== "" || typeof K == "number") return Je !== null ? null : M(W, j, "" + K, xe);
      if (typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case V:
            return K.key === Je ? U(W, j, K, xe) : null;
          case be:
            return K.key === Je ? J(W, j, K, xe) : null;
          case Qe:
            return Je = K._init, me(
              W,
              j,
              Je(K._payload),
              xe
            );
        }
        if (ne(K) || ze(K)) return Je !== null ? null : ye(W, j, K, xe, null);
        wi(W, K);
      }
      return null;
    }
    function je(W, j, K, xe, Je) {
      if (typeof xe == "string" && xe !== "" || typeof xe == "number") return W = W.get(K) || null, M(j, W, "" + xe, Je);
      if (typeof xe == "object" && xe !== null) {
        switch (xe.$$typeof) {
          case V:
            return W = W.get(xe.key === null ? K : xe.key) || null, U(j, W, xe, Je);
          case be:
            return W = W.get(xe.key === null ? K : xe.key) || null, J(j, W, xe, Je);
          case Qe:
            var dt = xe._init;
            return je(W, j, K, dt(xe._payload), Je);
        }
        if (ne(xe) || ze(xe)) return W = W.get(K) || null, ye(j, W, xe, Je, null);
        wi(j, xe);
      }
      return null;
    }
    function Ye(W, j, K, xe) {
      for (var Je = null, dt = null, We = j, vt = j = 0, rr = null; We !== null && vt < K.length; vt++) {
        We.index > vt ? (rr = We, We = null) : rr = We.sibling;
        var Ht = me(W, We, K[vt], xe);
        if (Ht === null) {
          We === null && (We = rr);
          break;
        }
        n && We && Ht.alternate === null && r(W, We), j = g(Ht, j, vt), dt === null ? Je = Ht : dt.sibling = Ht, dt = Ht, We = rr;
      }
      if (vt === K.length) return l(W, We), Sn && Ca(W, vt), Je;
      if (We === null) {
        for (; vt < K.length; vt++) We = Ce(W, K[vt], xe), We !== null && (j = g(We, j, vt), dt === null ? Je = We : dt.sibling = We, dt = We);
        return Sn && Ca(W, vt), Je;
      }
      for (We = f(W, We); vt < K.length; vt++) rr = je(We, W, vt, K[vt], xe), rr !== null && (n && rr.alternate !== null && We.delete(rr.key === null ? vt : rr.key), j = g(rr, j, vt), dt === null ? Je = rr : dt.sibling = rr, dt = rr);
      return n && We.forEach(function(no) {
        return r(W, no);
      }), Sn && Ca(W, vt), Je;
    }
    function qe(W, j, K, xe) {
      var Je = ze(K);
      if (typeof Je != "function") throw Error(c(150));
      if (K = Je.call(K), K == null) throw Error(c(151));
      for (var dt = Je = null, We = j, vt = j = 0, rr = null, Ht = K.next(); We !== null && !Ht.done; vt++, Ht = K.next()) {
        We.index > vt ? (rr = We, We = null) : rr = We.sibling;
        var no = me(W, We, Ht.value, xe);
        if (no === null) {
          We === null && (We = rr);
          break;
        }
        n && We && no.alternate === null && r(W, We), j = g(no, j, vt), dt === null ? Je = no : dt.sibling = no, dt = no, We = rr;
      }
      if (Ht.done) return l(
        W,
        We
      ), Sn && Ca(W, vt), Je;
      if (We === null) {
        for (; !Ht.done; vt++, Ht = K.next()) Ht = Ce(W, Ht.value, xe), Ht !== null && (j = g(Ht, j, vt), dt === null ? Je = Ht : dt.sibling = Ht, dt = Ht);
        return Sn && Ca(W, vt), Je;
      }
      for (We = f(W, We); !Ht.done; vt++, Ht = K.next()) Ht = je(We, W, vt, Ht.value, xe), Ht !== null && (n && Ht.alternate !== null && We.delete(Ht.key === null ? vt : Ht.key), j = g(Ht, j, vt), dt === null ? Je = Ht : dt.sibling = Ht, dt = Ht);
      return n && We.forEach(function(W0) {
        return r(W, W0);
      }), Sn && Ca(W, vt), Je;
    }
    function Hn(W, j, K, xe) {
      if (typeof K == "object" && K !== null && K.type === fe && K.key === null && (K = K.props.children), typeof K == "object" && K !== null) {
        switch (K.$$typeof) {
          case V:
            e: {
              for (var Je = K.key, dt = j; dt !== null; ) {
                if (dt.key === Je) {
                  if (Je = K.type, Je === fe) {
                    if (dt.tag === 7) {
                      l(W, dt.sibling), j = p(dt, K.props.children), j.return = W, W = j;
                      break e;
                    }
                  } else if (dt.elementType === Je || typeof Je == "object" && Je !== null && Je.$$typeof === Qe && lm(Je) === dt.type) {
                    l(W, dt.sibling), j = p(dt, K.props), j.ref = gl(W, dt, K), j.return = W, W = j;
                    break e;
                  }
                  l(W, dt);
                  break;
                } else r(W, dt);
                dt = dt.sibling;
              }
              K.type === fe ? (j = Nl(K.props.children, W.mode, xe, K.key), j.return = W, W = j) : (xe = Pf(K.type, K.key, K.props, null, W.mode, xe), xe.ref = gl(W, j, K), xe.return = W, W = xe);
            }
            return E(W);
          case be:
            e: {
              for (dt = K.key; j !== null; ) {
                if (j.key === dt) if (j.tag === 4 && j.stateNode.containerInfo === K.containerInfo && j.stateNode.implementation === K.implementation) {
                  l(W, j.sibling), j = p(j, K.children || []), j.return = W, W = j;
                  break e;
                } else {
                  l(W, j);
                  break;
                }
                else r(W, j);
                j = j.sibling;
              }
              j = Zs(K, W.mode, xe), j.return = W, W = j;
            }
            return E(W);
          case Qe:
            return dt = K._init, Hn(W, j, dt(K._payload), xe);
        }
        if (ne(K)) return Ye(W, j, K, xe);
        if (ze(K)) return qe(W, j, K, xe);
        wi(W, K);
      }
      return typeof K == "string" && K !== "" || typeof K == "number" ? (K = "" + K, j !== null && j.tag === 6 ? (l(W, j.sibling), j = p(j, K), j.return = W, W = j) : (l(W, j), j = $f(K, W.mode, xe), j.return = W, W = j), E(W)) : l(W, j);
    }
    return Hn;
  }
  var du = Zc(!0), um = Zc(!1), Ki = kt(null), Jn = null, Me = null, Ha = null;
  function Ta() {
    Ha = Me = Jn = null;
  }
  function gp(n) {
    var r = Ki.current;
    Gt(Ki), n._currentValue = r;
  }
  function Sp(n, r, l) {
    for (; n !== null; ) {
      var f = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, f !== null && (f.childLanes |= r)) : f !== null && (f.childLanes & r) !== r && (f.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function pu(n, r) {
    Jn = n, Ha = Me = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (la = !0), n.firstContext = null);
  }
  function Ia(n) {
    var r = n._currentValue;
    if (Ha !== n) if (n = { context: n, memoizedValue: r, next: null }, Me === null) {
      if (Jn === null) throw Error(c(308));
      Me = n, Jn.dependencies = { lanes: 0, firstContext: n };
    } else Me = Me.next = n;
    return r;
  }
  var Sl = null;
  function Gn(n) {
    Sl === null ? Sl = [n] : Sl.push(n);
  }
  function sm(n, r, l, f) {
    var p = r.interleaved;
    return p === null ? (l.next = l, Gn(r)) : (l.next = p.next, p.next = l), r.interleaved = l, Xi(n, f);
  }
  function Xi(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ko = !1;
  function Jc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function vu(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ia(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Oo(n, r, l) {
    var f = n.updateQueue;
    if (f === null) return null;
    if (f = f.shared, Lt & 2) {
      var p = f.pending;
      return p === null ? r.next = r : (r.next = p.next, p.next = r), f.pending = r, Xi(n, l);
    }
    return p = f.interleaved, p === null ? (r.next = r, Gn(f)) : (r.next = p.next, p.next = r), f.interleaved = r, Xi(n, l);
  }
  function ef(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var f = r.lanes;
      f &= n.pendingLanes, l |= f, r.lanes = l, ds(n, l);
    }
  }
  function cm(n, r) {
    var l = n.updateQueue, f = n.alternate;
    if (f !== null && (f = f.updateQueue, l === f)) {
      var p = null, g = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var E = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          g === null ? p = g = E : g = g.next = E, l = l.next;
        } while (l !== null);
        g === null ? p = g = r : g = g.next = r;
      } else p = g = r;
      l = { baseState: f.baseState, firstBaseUpdate: p, lastBaseUpdate: g, shared: f.shared, effects: f.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function tf(n, r, l, f) {
    var p = n.updateQueue;
    ko = !1;
    var g = p.firstBaseUpdate, E = p.lastBaseUpdate, M = p.shared.pending;
    if (M !== null) {
      p.shared.pending = null;
      var U = M, J = U.next;
      U.next = null, E === null ? g = J : E.next = J, E = U;
      var ye = n.alternate;
      ye !== null && (ye = ye.updateQueue, M = ye.lastBaseUpdate, M !== E && (M === null ? ye.firstBaseUpdate = J : M.next = J, ye.lastBaseUpdate = U));
    }
    if (g !== null) {
      var Ce = p.baseState;
      E = 0, ye = J = U = null, M = g;
      do {
        var me = M.lane, je = M.eventTime;
        if ((f & me) === me) {
          ye !== null && (ye = ye.next = {
            eventTime: je,
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          });
          e: {
            var Ye = n, qe = M;
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
                Ce = Y({}, Ce, me);
                break e;
              case 2:
                ko = !0;
            }
          }
          M.callback !== null && M.lane !== 0 && (n.flags |= 64, me = p.effects, me === null ? p.effects = [M] : me.push(M));
        } else je = { eventTime: je, lane: me, tag: M.tag, payload: M.payload, callback: M.callback, next: null }, ye === null ? (J = ye = je, U = Ce) : ye = ye.next = je, E |= me;
        if (M = M.next, M === null) {
          if (M = p.shared.pending, M === null) break;
          me = M, M = me.next, me.next = null, p.lastBaseUpdate = me, p.shared.pending = null;
        }
      } while (!0);
      if (ye === null && (U = Ce), p.baseState = U, p.firstBaseUpdate = J, p.lastBaseUpdate = ye, r = p.shared.interleaved, r !== null) {
        p = r;
        do
          E |= p.lane, p = p.next;
        while (p !== r);
      } else g === null && (p.shared.lanes = 0);
      Ol |= E, n.lanes = E, n.memoizedState = Ce;
    }
  }
  function fm(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var f = n[r], p = f.callback;
      if (p !== null) {
        if (f.callback = null, f = l, typeof p != "function") throw Error(c(191, p));
        p.call(f);
      }
    }
  }
  var zs = {}, pi = kt(zs), hu = kt(zs), Us = kt(zs);
  function bl(n) {
    if (n === zs) throw Error(c(174));
    return n;
  }
  function bp(n, r) {
    switch (qt(Us, r), qt(hu, n), qt(pi, zs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Dt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Dt(r, n);
    }
    Gt(pi), qt(pi, r);
  }
  function mu() {
    Gt(pi), Gt(hu), Gt(Us);
  }
  function dm(n) {
    bl(Us.current);
    var r = bl(pi.current), l = Dt(r, n.type);
    r !== l && (qt(hu, n), qt(pi, l));
  }
  function Cp(n) {
    hu.current === n && (Gt(pi), Gt(hu));
  }
  var Rn = kt(0);
  function nf(n) {
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
  var rf = [];
  function Ep() {
    for (var n = 0; n < rf.length; n++) rf[n]._workInProgressVersionPrimary = null;
    rf.length = 0;
  }
  var af = le.ReactCurrentDispatcher, Fs = le.ReactCurrentBatchConfig, Ze = 0, tt = null, Ct = null, Nt = null, xa = !1, yu = !1, Ps = 0, O0 = 0;
  function Lr() {
    throw Error(c(321));
  }
  function js(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Fa(n[l], r[l])) return !1;
    return !0;
  }
  function he(n, r, l, f, p, g) {
    if (Ze = g, tt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, af.current = n === null || n.memoizedState === null ? D0 : hn, n = l(f, p), yu) {
      g = 0;
      do {
        if (yu = !1, Ps = 0, 25 <= g) throw Error(c(301));
        g += 1, Nt = Ct = null, r.updateQueue = null, af.current = bf, n = l(f, p);
      } while (yu);
    }
    if (af.current = zr, r = Ct !== null && Ct.next !== null, Ze = 0, Nt = Ct = tt = null, xa = !1, r) throw Error(c(300));
    return n;
  }
  function Qn() {
    var n = Ps !== 0;
    return Ps = 0, n;
  }
  function ot() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Nt === null ? tt.memoizedState = Nt = n : Nt = Nt.next = n, Nt;
  }
  function br() {
    if (Ct === null) {
      var n = tt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Ct.next;
    var r = Nt === null ? tt.memoizedState : Nt.next;
    if (r !== null) Nt = r, Ct = n;
    else {
      if (n === null) throw Error(c(310));
      Ct = n, n = { memoizedState: Ct.memoizedState, baseState: Ct.baseState, baseQueue: Ct.baseQueue, queue: Ct.queue, next: null }, Nt === null ? tt.memoizedState = Nt = n : Nt = Nt.next = n;
    }
    return Nt;
  }
  function wa(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Zi(n) {
    var r = br(), l = r.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var f = Ct, p = f.baseQueue, g = l.pending;
    if (g !== null) {
      if (p !== null) {
        var E = p.next;
        p.next = g.next, g.next = E;
      }
      f.baseQueue = p = g, l.pending = null;
    }
    if (p !== null) {
      g = p.next, f = f.baseState;
      var M = E = null, U = null, J = g;
      do {
        var ye = J.lane;
        if ((Ze & ye) === ye) U !== null && (U = U.next = { lane: 0, action: J.action, hasEagerState: J.hasEagerState, eagerState: J.eagerState, next: null }), f = J.hasEagerState ? J.eagerState : n(f, J.action);
        else {
          var Ce = {
            lane: ye,
            action: J.action,
            hasEagerState: J.hasEagerState,
            eagerState: J.eagerState,
            next: null
          };
          U === null ? (M = U = Ce, E = f) : U = U.next = Ce, tt.lanes |= ye, Ol |= ye;
        }
        J = J.next;
      } while (J !== null && J !== g);
      U === null ? E = f : U.next = M, Fa(f, r.memoizedState) || (la = !0), r.memoizedState = f, r.baseState = E, r.baseQueue = U, l.lastRenderedState = f;
    }
    if (n = l.interleaved, n !== null) {
      p = n;
      do
        g = p.lane, tt.lanes |= g, Ol |= g, p = p.next;
      while (p !== n);
    } else p === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Ya(n) {
    var r = br(), l = r.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var f = l.dispatch, p = l.pending, g = r.memoizedState;
    if (p !== null) {
      l.pending = null;
      var E = p = p.next;
      do
        g = n(g, E.action), E = E.next;
      while (E !== p);
      Fa(g, r.memoizedState) || (la = !0), r.memoizedState = g, r.baseQueue === null && (r.baseState = g), l.lastRenderedState = g;
    }
    return [g, f];
  }
  function gu() {
  }
  function Cl(n, r) {
    var l = tt, f = br(), p = r(), g = !Fa(f.memoizedState, p);
    if (g && (f.memoizedState = p, la = !0), f = f.queue, $s(lf.bind(null, l, f, n), [n]), f.getSnapshot !== r || g || Nt !== null && Nt.memoizedState.tag & 1) {
      if (l.flags |= 2048, El(9, of.bind(null, l, f, p, r), void 0, null), Un === null) throw Error(c(349));
      Ze & 30 || Su(l, r, p);
    }
    return p;
  }
  function Su(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = tt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, tt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function of(n, r, l, f) {
    r.value = l, r.getSnapshot = f, uf(r) && sf(n);
  }
  function lf(n, r, l) {
    return l(function() {
      uf(r) && sf(n);
    });
  }
  function uf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Fa(n, l);
    } catch {
      return !0;
    }
  }
  function sf(n) {
    var r = Xi(n, 1);
    r !== null && Dn(r, n, 1, -1);
  }
  function cf(n) {
    var r = ot();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: wa, lastRenderedState: n }, r.queue = n, n = n.dispatch = Vs.bind(null, tt, n), [r.memoizedState, n];
  }
  function El(n, r, l, f) {
    return n = { tag: n, create: r, destroy: l, deps: f, next: null }, r = tt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, tt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (f = l.next, l.next = n, n.next = f, r.lastEffect = n)), n;
  }
  function ff() {
    return br().memoizedState;
  }
  function bu(n, r, l, f) {
    var p = ot();
    tt.flags |= n, p.memoizedState = El(1 | r, l, void 0, f === void 0 ? null : f);
  }
  function Cu(n, r, l, f) {
    var p = br();
    f = f === void 0 ? null : f;
    var g = void 0;
    if (Ct !== null) {
      var E = Ct.memoizedState;
      if (g = E.destroy, f !== null && js(f, E.deps)) {
        p.memoizedState = El(r, l, g, f);
        return;
      }
    }
    tt.flags |= n, p.memoizedState = El(1 | r, l, g, f);
  }
  function df(n, r) {
    return bu(8390656, 8, n, r);
  }
  function $s(n, r) {
    return Cu(2048, 8, n, r);
  }
  function pf(n, r) {
    return Cu(4, 2, n, r);
  }
  function vf(n, r) {
    return Cu(4, 4, n, r);
  }
  function hf(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function mf(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Cu(4, 4, hf.bind(null, r, n), l);
  }
  function Eu() {
  }
  function Tl(n, r) {
    var l = br();
    r = r === void 0 ? null : r;
    var f = l.memoizedState;
    return f !== null && r !== null && js(r, f[1]) ? f[0] : (l.memoizedState = [n, r], n);
  }
  function yf(n, r) {
    var l = br();
    r = r === void 0 ? null : r;
    var f = l.memoizedState;
    return f !== null && r !== null && js(r, f[1]) ? f[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function gf(n, r, l) {
    return Ze & 21 ? (Fa(l, r) || (l = _c(), tt.lanes |= l, Ol |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, la = !0), n.memoizedState = l);
  }
  function Tp(n, r) {
    var l = Zt;
    Zt = l !== 0 && 4 > l ? l : 4, n(!0);
    var f = Fs.transition;
    Fs.transition = {};
    try {
      n(!1), r();
    } finally {
      Zt = l, Fs.transition = f;
    }
  }
  function Sf() {
    return br().memoizedState;
  }
  function pm(n, r, l) {
    var f = to(n);
    if (l = { lane: f, action: l, hasEagerState: !1, eagerState: null, next: null }, xp(n)) Tu(r, l);
    else if (l = sm(n, r, l, f), l !== null) {
      var p = hr();
      Dn(l, n, f, p), Do(l, r, f);
    }
  }
  function Vs(n, r, l) {
    var f = to(n), p = { lane: f, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (xp(n)) Tu(r, p);
    else {
      var g = n.alternate;
      if (n.lanes === 0 && (g === null || g.lanes === 0) && (g = r.lastRenderedReducer, g !== null)) try {
        var E = r.lastRenderedState, M = g(E, l);
        if (p.hasEagerState = !0, p.eagerState = M, Fa(M, E)) {
          var U = r.interleaved;
          U === null ? (p.next = p, Gn(r)) : (p.next = U.next, U.next = p), r.interleaved = p;
          return;
        }
      } catch {
      } finally {
      }
      l = sm(n, r, p, f), l !== null && (p = hr(), Dn(l, n, f, p), Do(l, r, f));
    }
  }
  function xp(n) {
    var r = n.alternate;
    return n === tt || r !== null && r === tt;
  }
  function Tu(n, r) {
    yu = xa = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Do(n, r, l) {
    if (l & 4194240) {
      var f = r.lanes;
      f &= n.pendingLanes, l |= f, r.lanes = l, ds(n, l);
    }
  }
  var zr = { readContext: Ia, useCallback: Lr, useContext: Lr, useEffect: Lr, useImperativeHandle: Lr, useInsertionEffect: Lr, useLayoutEffect: Lr, useMemo: Lr, useReducer: Lr, useRef: Lr, useState: Lr, useDebugValue: Lr, useDeferredValue: Lr, useTransition: Lr, useMutableSource: Lr, useSyncExternalStore: Lr, useId: Lr, unstable_isNewReconciler: !1 }, D0 = { readContext: Ia, useCallback: function(n, r) {
    return ot().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ia, useEffect: df, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, bu(
      4194308,
      4,
      hf.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return bu(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return bu(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = ot();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var f = ot();
    return r = l !== void 0 ? l(r) : r, f.memoizedState = f.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, f.queue = n, n = n.dispatch = pm.bind(null, tt, n), [f.memoizedState, n];
  }, useRef: function(n) {
    var r = ot();
    return n = { current: n }, r.memoizedState = n;
  }, useState: cf, useDebugValue: Eu, useDeferredValue: function(n) {
    return ot().memoizedState = n;
  }, useTransition: function() {
    var n = cf(!1), r = n[0];
    return n = Tp.bind(null, n[1]), ot().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var f = tt, p = ot();
    if (Sn) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else {
      if (l = r(), Un === null) throw Error(c(349));
      Ze & 30 || Su(f, r, l);
    }
    p.memoizedState = l;
    var g = { value: l, getSnapshot: r };
    return p.queue = g, df(lf.bind(
      null,
      f,
      g,
      n
    ), [n]), f.flags |= 2048, El(9, of.bind(null, f, g, l, r), void 0, null), l;
  }, useId: function() {
    var n = ot(), r = Un.identifierPrefix;
    if (Sn) {
      var l = qi, f = Sr;
      l = (f & ~(1 << 32 - La(f) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Ps++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = O0++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, hn = {
    readContext: Ia,
    useCallback: Tl,
    useContext: Ia,
    useEffect: $s,
    useImperativeHandle: mf,
    useInsertionEffect: pf,
    useLayoutEffect: vf,
    useMemo: yf,
    useReducer: Zi,
    useRef: ff,
    useState: function() {
      return Zi(wa);
    },
    useDebugValue: Eu,
    useDeferredValue: function(n) {
      var r = br();
      return gf(r, Ct.memoizedState, n);
    },
    useTransition: function() {
      var n = Zi(wa)[0], r = br().memoizedState;
      return [n, r];
    },
    useMutableSource: gu,
    useSyncExternalStore: Cl,
    useId: Sf,
    unstable_isNewReconciler: !1
  }, bf = { readContext: Ia, useCallback: Tl, useContext: Ia, useEffect: $s, useImperativeHandle: mf, useInsertionEffect: pf, useLayoutEffect: vf, useMemo: yf, useReducer: Ya, useRef: ff, useState: function() {
    return Ya(wa);
  }, useDebugValue: Eu, useDeferredValue: function(n) {
    var r = br();
    return Ct === null ? r.memoizedState = n : gf(r, Ct.memoizedState, n);
  }, useTransition: function() {
    var n = Ya(wa)[0], r = br().memoizedState;
    return [n, r];
  }, useMutableSource: gu, useSyncExternalStore: Cl, useId: Sf, unstable_isNewReconciler: !1 };
  function oa(n, r) {
    if (n && n.defaultProps) {
      r = Y({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function xl(n, r, l, f) {
    r = n.memoizedState, l = l(f, r), l = l == null ? r : Y({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var wl = { isMounted: function(n) {
    return (n = n._reactInternals) ? it(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var f = hr(), p = to(n), g = ia(f, p);
    g.payload = r, l != null && (g.callback = l), r = Oo(n, g, p), r !== null && (Dn(r, n, p, f), ef(r, n, p));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var f = hr(), p = to(n), g = ia(f, p);
    g.tag = 1, g.payload = r, l != null && (g.callback = l), r = Oo(n, g, p), r !== null && (Dn(r, n, p, f), ef(r, n, p));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = hr(), f = to(n), p = ia(l, f);
    p.tag = 2, r != null && (p.callback = r), r = Oo(n, p, f), r !== null && (Dn(r, n, f, l), ef(r, n, f));
  } };
  function vm(n, r, l, f, p, g, E) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(f, g, E) : r.prototype && r.prototype.isPureReactComponent ? !Ts(l, f) || !Ts(p, g) : !0;
  }
  function hm(n, r, l) {
    var f = !1, p = xi, g = r.contextType;
    return typeof g == "object" && g !== null ? g = Ia(g) : (p = wn(r) ? ea : bt.current, f = r.contextTypes, g = (f = f != null) ? ja(n, p) : xi), r = new r(l, g), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = wl, n.stateNode = r, r._reactInternals = n, f && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = p, n.__reactInternalMemoizedMaskedChildContext = g), r;
  }
  function mm(n, r, l, f) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, f), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, f), r.state !== n && wl.enqueueReplaceState(r, r.state, null);
  }
  function wp(n, r, l, f) {
    var p = n.stateNode;
    p.props = l, p.state = n.memoizedState, p.refs = {}, Jc(n);
    var g = r.contextType;
    typeof g == "object" && g !== null ? p.context = Ia(g) : (g = wn(r) ? ea : bt.current, p.context = ja(n, g)), p.state = n.memoizedState, g = r.getDerivedStateFromProps, typeof g == "function" && (xl(n, r, g, l), p.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof p.getSnapshotBeforeUpdate == "function" || typeof p.UNSAFE_componentWillMount != "function" && typeof p.componentWillMount != "function" || (r = p.state, typeof p.componentWillMount == "function" && p.componentWillMount(), typeof p.UNSAFE_componentWillMount == "function" && p.UNSAFE_componentWillMount(), r !== p.state && wl.enqueueReplaceState(p, p.state, null), tf(n, l, p, f), p.state = n.memoizedState), typeof p.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Mo(n, r) {
    try {
      var l = "", f = r;
      do
        l += yt(f), f = f.return;
      while (f);
      var p = l;
    } catch (g) {
      p = `
Error generating stack: ` + g.message + `
` + g.stack;
    }
    return { value: n, source: r, stack: p, digest: null };
  }
  function Rp(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Bs(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var ym = typeof WeakMap == "function" ? WeakMap : Map;
  function gm(n, r, l) {
    l = ia(-1, l), l.tag = 3, l.payload = { element: null };
    var f = r.value;
    return l.callback = function() {
      Af || (Af = !0, zp = f), Bs(n, r);
    }, l;
  }
  function Sm(n, r, l) {
    l = ia(-1, l), l.tag = 3;
    var f = n.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var p = r.value;
      l.payload = function() {
        return f(p);
      }, l.callback = function() {
        Bs(n, r);
      };
    }
    var g = n.stateNode;
    return g !== null && typeof g.componentDidCatch == "function" && (l.callback = function() {
      Bs(n, r), typeof f != "function" && (Qa === null ? Qa = /* @__PURE__ */ new Set([this]) : Qa.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, { componentStack: E !== null ? E : "" });
    }), l;
  }
  function Hs(n, r, l) {
    var f = n.pingCache;
    if (f === null) {
      f = n.pingCache = new ym();
      var p = /* @__PURE__ */ new Set();
      f.set(r, p);
    } else p = f.get(r), p === void 0 && (p = /* @__PURE__ */ new Set(), f.set(r, p));
    p.has(l) || (p.add(l), n = $0.bind(null, n, r, l), r.then(n, n));
  }
  function bm(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function _p(n, r, l, f, p) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = p, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ia(-1, 1), r.tag = 2, Oo(l, r, 1))), l.lanes |= 1), n);
  }
  var Cm = le.ReactCurrentOwner, la = !1;
  function Vn(n, r, l, f) {
    r.child = n === null ? um(r, null, l, f) : du(r, n.child, l, f);
  }
  function xu(n, r, l, f, p) {
    l = l.render;
    var g = r.ref;
    return pu(r, p), f = he(n, r, l, f, g, p), l = Qn(), n !== null && !la ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Bn(n, r, p)) : (Sn && l && Gc(r), r.flags |= 1, Vn(n, r, f, p), r.child);
  }
  function Ao(n, r, l, f, p) {
    if (n === null) {
      var g = l.type;
      return typeof g == "function" && !$p(g) && g.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = g, Cf(n, r, g, f, p)) : (n = Pf(l.type, null, f, r, r.mode, p), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (g = n.child, !(n.lanes & p)) {
      var E = g.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Ts, l(E, f) && n.ref === r.ref) return Bn(n, r, p);
    }
    return r.flags |= 1, n = zo(g, f), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Cf(n, r, l, f, p) {
    if (n !== null) {
      var g = n.memoizedProps;
      if (Ts(g, f) && n.ref === r.ref) if (la = !1, r.pendingProps = f = g, (n.lanes & p) !== 0) n.flags & 131072 && (la = !0);
      else return r.lanes = n.lanes, Bn(n, r, p);
    }
    return _t(n, r, l, f, p);
  }
  function ua(n, r, l) {
    var f = r.pendingProps, p = f.children, g = n !== null ? n.memoizedState : null;
    if (f.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, qt(Lu, sa), sa |= l;
    else {
      if (!(l & 1073741824)) return n = g !== null ? g.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, qt(Lu, sa), sa |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = g !== null ? g.baseLanes : l, qt(Lu, sa), sa |= f;
    }
    else g !== null ? (f = g.baseLanes | l, r.memoizedState = null) : f = l, qt(Lu, sa), sa |= f;
    return Vn(n, r, p, l), r.child;
  }
  function Rl(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function _t(n, r, l, f, p) {
    var g = wn(l) ? ea : bt.current;
    return g = ja(r, g), pu(r, p), l = he(n, r, l, f, g, p), f = Qn(), n !== null && !la ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~p, Bn(n, r, p)) : (Sn && f && Gc(r), r.flags |= 1, Vn(n, r, l, p), r.child);
  }
  function Is(n, r, l, f, p) {
    if (wn(l)) {
      var g = !0;
      Wc(r);
    } else g = !1;
    if (pu(r, p), r.stateNode === null) Ws(n, r), hm(r, l, f), wp(r, l, f, p), f = !0;
    else if (n === null) {
      var E = r.stateNode, M = r.memoizedProps;
      E.props = M;
      var U = E.context, J = l.contextType;
      typeof J == "object" && J !== null ? J = Ia(J) : (J = wn(l) ? ea : bt.current, J = ja(r, J));
      var ye = l.getDerivedStateFromProps, Ce = typeof ye == "function" || typeof E.getSnapshotBeforeUpdate == "function";
      Ce || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (M !== f || U !== J) && mm(r, E, f, J), ko = !1;
      var me = r.memoizedState;
      E.state = me, tf(r, f, E, p), U = r.memoizedState, M !== f || me !== U || Ln.current || ko ? (typeof ye == "function" && (xl(r, l, ye, f), U = r.memoizedState), (M = ko || vm(r, l, M, f, me, U, J)) ? (Ce || typeof E.UNSAFE_componentWillMount != "function" && typeof E.componentWillMount != "function" || (typeof E.componentWillMount == "function" && E.componentWillMount(), typeof E.UNSAFE_componentWillMount == "function" && E.UNSAFE_componentWillMount()), typeof E.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = f, r.memoizedState = U), E.props = f, E.state = U, E.context = J, f = M) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), f = !1);
    } else {
      E = r.stateNode, vu(n, r), M = r.memoizedProps, J = r.type === r.elementType ? M : oa(r.type, M), E.props = J, Ce = r.pendingProps, me = E.context, U = l.contextType, typeof U == "object" && U !== null ? U = Ia(U) : (U = wn(l) ? ea : bt.current, U = ja(r, U));
      var je = l.getDerivedStateFromProps;
      (ye = typeof je == "function" || typeof E.getSnapshotBeforeUpdate == "function") || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (M !== Ce || me !== U) && mm(r, E, f, U), ko = !1, me = r.memoizedState, E.state = me, tf(r, f, E, p);
      var Ye = r.memoizedState;
      M !== Ce || me !== Ye || Ln.current || ko ? (typeof je == "function" && (xl(r, l, je, f), Ye = r.memoizedState), (J = ko || vm(r, l, J, f, me, Ye, U) || !1) ? (ye || typeof E.UNSAFE_componentWillUpdate != "function" && typeof E.componentWillUpdate != "function" || (typeof E.componentWillUpdate == "function" && E.componentWillUpdate(f, Ye, U), typeof E.UNSAFE_componentWillUpdate == "function" && E.UNSAFE_componentWillUpdate(f, Ye, U)), typeof E.componentDidUpdate == "function" && (r.flags |= 4), typeof E.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof E.componentDidUpdate != "function" || M === n.memoizedProps && me === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && me === n.memoizedState || (r.flags |= 1024), r.memoizedProps = f, r.memoizedState = Ye), E.props = f, E.state = Ye, E.context = U, f = J) : (typeof E.componentDidUpdate != "function" || M === n.memoizedProps && me === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && me === n.memoizedState || (r.flags |= 1024), f = !1);
    }
    return Ef(n, r, l, f, g, p);
  }
  function Ef(n, r, l, f, p, g) {
    Rl(n, r);
    var E = (r.flags & 128) !== 0;
    if (!f && !E) return p && rm(r, l, !1), Bn(n, r, g);
    f = r.stateNode, Cm.current = r;
    var M = E && typeof l.getDerivedStateFromError != "function" ? null : f.render();
    return r.flags |= 1, n !== null && E ? (r.child = du(r, n.child, null, g), r.child = du(r, null, M, g)) : Vn(n, r, M, g), r.memoizedState = f.state, p && rm(r, l, !0), r.child;
  }
  function M0(n) {
    var r = n.stateNode;
    r.pendingContext ? Ro(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Ro(n, r.context, !1), bp(n, r.containerInfo);
  }
  function Em(n, r, l, f, p) {
    return On(), yp(p), r.flags |= 256, Vn(n, r, l, f), r.child;
  }
  var Ys = { dehydrated: null, treeContext: null, retryLane: 0 };
  function _l(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Tm(n, r, l) {
    var f = r.pendingProps, p = Rn.current, g = !1, E = (r.flags & 128) !== 0, M;
    if ((M = E) || (M = n !== null && n.memoizedState === null ? !1 : (p & 2) !== 0), M ? (g = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (p |= 1), qt(Rn, p & 1), n === null)
      return qc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (E = f.children, n = f.fallback, g ? (f = r.mode, g = r.child, E = { mode: "hidden", children: E }, !(f & 1) && g !== null ? (g.childLanes = 0, g.pendingProps = E) : g = jf(E, f, 0, null), n = Nl(n, f, l, null), g.return = r, n.return = r, g.sibling = n, r.child = g, r.child.memoizedState = _l(l), r.memoizedState = Ys, n) : Tf(r, E));
    if (p = n.memoizedState, p !== null && (M = p.dehydrated, M !== null)) return kp(n, r, E, f, M, p, l);
    if (g) {
      g = f.fallback, E = r.mode, p = n.child, M = p.sibling;
      var U = { mode: "hidden", children: f.children };
      return !(E & 1) && r.child !== p ? (f = r.child, f.childLanes = 0, f.pendingProps = U, r.deletions = null) : (f = zo(p, U), f.subtreeFlags = p.subtreeFlags & 14680064), M !== null ? g = zo(M, g) : (g = Nl(g, E, l, null), g.flags |= 2), g.return = r, f.return = r, f.sibling = g, r.child = f, f = g, g = r.child, E = n.child.memoizedState, E = E === null ? _l(l) : { baseLanes: E.baseLanes | l, cachePool: null, transitions: E.transitions }, g.memoizedState = E, g.childLanes = n.childLanes & ~l, r.memoizedState = Ys, f;
    }
    return g = n.child, n = g.sibling, f = zo(g, { mode: "visible", children: f.children }), !(r.mode & 1) && (f.lanes = l), f.return = r, f.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = f, r.memoizedState = null, f;
  }
  function Tf(n, r) {
    return r = jf({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function xf(n, r, l, f) {
    return f !== null && yp(f), du(r, n.child, null, l), n = Tf(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function kp(n, r, l, f, p, g, E) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, f = Rp(Error(c(422))), xf(n, r, E, f)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (g = f.fallback, p = r.mode, f = jf({ mode: "visible", children: f.children }, p, 0, null), g = Nl(g, p, E, null), g.flags |= 2, f.return = r, g.return = r, f.sibling = g, r.child = f, r.mode & 1 && du(r, n.child, null, E), r.child.memoizedState = _l(E), r.memoizedState = Ys, g);
    if (!(r.mode & 1)) return xf(n, r, E, null);
    if (p.data === "$!") {
      if (f = p.nextSibling && p.nextSibling.dataset, f) var M = f.dgst;
      return f = M, g = Error(c(419)), f = Rp(g, f, void 0), xf(n, r, E, f);
    }
    if (M = (E & n.childLanes) !== 0, la || M) {
      if (f = Un, f !== null) {
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
        p = p & (f.suspendedLanes | E) ? 0 : p, p !== 0 && p !== g.retryLane && (g.retryLane = p, Xi(n, p), Dn(f, n, p, -1));
      }
      return Xs(), f = Rp(Error(c(421))), xf(n, r, E, f);
    }
    return p.data === "$?" ? (r.flags |= 128, r.child = n.child, r = jp.bind(null, n), p._reactRetry = r, null) : (n = g.treeContext, aa = di(p.nextSibling), Ea = r, Sn = !0, Ba = null, n !== null && (ra[Nr++] = Sr, ra[Nr++] = qi, ra[Nr++] = Va, Sr = n.id, qi = n.overflow, Va = r), r = Tf(r, f.children), r.flags |= 4096, r);
  }
  function xm(n, r, l) {
    n.lanes |= r;
    var f = n.alternate;
    f !== null && (f.lanes |= r), Sp(n.return, r, l);
  }
  function wf(n, r, l, f, p) {
    var g = n.memoizedState;
    g === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: f, tail: l, tailMode: p } : (g.isBackwards = r, g.rendering = null, g.renderingStartTime = 0, g.last = f, g.tail = l, g.tailMode = p);
  }
  function Op(n, r, l) {
    var f = r.pendingProps, p = f.revealOrder, g = f.tail;
    if (Vn(n, r, f.children, l), f = Rn.current, f & 2) f = f & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && xm(n, l, r);
        else if (n.tag === 19) xm(n, l, r);
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
      f &= 1;
    }
    if (qt(Rn, f), !(r.mode & 1)) r.memoizedState = null;
    else switch (p) {
      case "forwards":
        for (l = r.child, p = null; l !== null; ) n = l.alternate, n !== null && nf(n) === null && (p = l), l = l.sibling;
        l = p, l === null ? (p = r.child, r.child = null) : (p = l.sibling, l.sibling = null), wf(r, !1, p, l, g);
        break;
      case "backwards":
        for (l = null, p = r.child, r.child = null; p !== null; ) {
          if (n = p.alternate, n !== null && nf(n) === null) {
            r.child = p;
            break;
          }
          n = p.sibling, p.sibling = l, l = p, p = n;
        }
        wf(r, !0, l, null, g);
        break;
      case "together":
        wf(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ws(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Bn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Ol |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(c(153));
    if (r.child !== null) {
      for (n = r.child, l = zo(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = zo(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Ji(n, r, l) {
    switch (r.tag) {
      case 3:
        M0(r), On();
        break;
      case 5:
        dm(r);
        break;
      case 1:
        wn(r.type) && Wc(r);
        break;
      case 4:
        bp(r, r.stateNode.containerInfo);
        break;
      case 10:
        var f = r.type._context, p = r.memoizedProps.value;
        qt(Ki, f._currentValue), f._currentValue = p;
        break;
      case 13:
        if (f = r.memoizedState, f !== null)
          return f.dehydrated !== null ? (qt(Rn, Rn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Tm(n, r, l) : (qt(Rn, Rn.current & 1), n = Bn(n, r, l), n !== null ? n.sibling : null);
        qt(Rn, Rn.current & 1);
        break;
      case 19:
        if (f = (l & r.childLanes) !== 0, n.flags & 128) {
          if (f) return Op(n, r, l);
          r.flags |= 128;
        }
        if (p = r.memoizedState, p !== null && (p.rendering = null, p.tail = null, p.lastEffect = null), qt(Rn, Rn.current), f) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ua(n, r, l);
    }
    return Bn(n, r, l);
  }
  var Ri, wu, Ru, Wa;
  Ri = function(n, r) {
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
  }, wu = function() {
  }, Ru = function(n, r, l, f) {
    var p = n.memoizedProps;
    if (p !== f) {
      n = r.stateNode, bl(pi.current);
      var g = null;
      switch (l) {
        case "input":
          p = Le(n, p), f = Le(n, f), g = [];
          break;
        case "select":
          p = Y({}, p, { value: void 0 }), f = Y({}, f, { value: void 0 }), g = [];
          break;
        case "textarea":
          p = Te(n, p), f = Te(n, f), g = [];
          break;
        default:
          typeof p.onClick != "function" && typeof f.onClick == "function" && (n.onclick = Yc);
      }
      ur(l, f);
      var E;
      l = null;
      for (J in p) if (!f.hasOwnProperty(J) && p.hasOwnProperty(J) && p[J] != null) if (J === "style") {
        var M = p[J];
        for (E in M) M.hasOwnProperty(E) && (l || (l = {}), l[E] = "");
      } else J !== "dangerouslySetInnerHTML" && J !== "children" && J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && J !== "autoFocus" && (m.hasOwnProperty(J) ? g || (g = []) : (g = g || []).push(J, null));
      for (J in f) {
        var U = f[J];
        if (M = p != null ? p[J] : void 0, f.hasOwnProperty(J) && U !== M && (U != null || M != null)) if (J === "style") if (M) {
          for (E in M) !M.hasOwnProperty(E) || U && U.hasOwnProperty(E) || (l || (l = {}), l[E] = "");
          for (E in U) U.hasOwnProperty(E) && M[E] !== U[E] && (l || (l = {}), l[E] = U[E]);
        } else l || (g || (g = []), g.push(
          J,
          l
        )), l = U;
        else J === "dangerouslySetInnerHTML" ? (U = U ? U.__html : void 0, M = M ? M.__html : void 0, U != null && M !== U && (g = g || []).push(J, U)) : J === "children" ? typeof U != "string" && typeof U != "number" || (g = g || []).push(J, "" + U) : J !== "suppressContentEditableWarning" && J !== "suppressHydrationWarning" && (m.hasOwnProperty(J) ? (U != null && J === "onScroll" && fn("scroll", n), g || M === U || (g = [])) : (g = g || []).push(J, U));
      }
      l && (g = g || []).push("style", l);
      var J = g;
      (r.updateQueue = J) && (r.flags |= 4);
    }
  }, Wa = function(n, r, l, f) {
    l !== f && (r.flags |= 4);
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
        for (var f = null; l !== null; ) l.alternate !== null && (f = l), l = l.sibling;
        f === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : f.sibling = null;
    }
  }
  function Ur(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, f = 0;
    if (r) for (var p = n.child; p !== null; ) l |= p.lanes | p.childLanes, f |= p.subtreeFlags & 14680064, f |= p.flags & 14680064, p.return = n, p = p.sibling;
    else for (p = n.child; p !== null; ) l |= p.lanes | p.childLanes, f |= p.subtreeFlags, f |= p.flags, p.return = n, p = p.sibling;
    return n.subtreeFlags |= f, n.childLanes = l, r;
  }
  function A0(n, r, l) {
    var f = r.pendingProps;
    switch (hp(r), r.tag) {
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
        return Ur(r), null;
      case 1:
        return wn(r.type) && $a(), Ur(r), null;
      case 3:
        return f = r.stateNode, mu(), Gt(Ln), Gt(bt), Ep(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), (n === null || n.child === null) && (Kc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ba !== null && (Up(Ba), Ba = null))), wu(n, r), Ur(r), null;
      case 5:
        Cp(r);
        var p = bl(Us.current);
        if (l = r.type, n !== null && r.stateNode != null) Ru(n, r, l, f, p), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!f) {
            if (r.stateNode === null) throw Error(c(166));
            return Ur(r), null;
          }
          if (n = bl(pi.current), Kc(r)) {
            f = r.stateNode, l = r.type;
            var g = r.memoizedProps;
            switch (f[Ti] = r, f[ml] = g, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                fn("cancel", f), fn("close", f);
                break;
              case "iframe":
              case "object":
              case "embed":
                fn("load", f);
                break;
              case "video":
              case "audio":
                for (p = 0; p < _s.length; p++) fn(_s[p], f);
                break;
              case "source":
                fn("error", f);
                break;
              case "img":
              case "image":
              case "link":
                fn(
                  "error",
                  f
                ), fn("load", f);
                break;
              case "details":
                fn("toggle", f);
                break;
              case "input":
                Xt(f, g), fn("invalid", f);
                break;
              case "select":
                f._wrapperState = { wasMultiple: !!g.multiple }, fn("invalid", f);
                break;
              case "textarea":
                te(f, g), fn("invalid", f);
            }
            ur(l, g), p = null;
            for (var E in g) if (g.hasOwnProperty(E)) {
              var M = g[E];
              E === "children" ? typeof M == "string" ? f.textContent !== M && (g.suppressHydrationWarning !== !0 && Ic(f.textContent, M, n), p = ["children", M]) : typeof M == "number" && f.textContent !== "" + M && (g.suppressHydrationWarning !== !0 && Ic(
                f.textContent,
                M,
                n
              ), p = ["children", "" + M]) : m.hasOwnProperty(E) && M != null && E === "onScroll" && fn("scroll", f);
            }
            switch (l) {
              case "input":
                Ut(f), N(f, g, !0);
                break;
              case "textarea":
                Ut(f), Tt(f);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof g.onClick == "function" && (f.onclick = Yc);
            }
            f = p, r.updateQueue = f, f !== null && (r.flags |= 4);
          } else {
            E = p.nodeType === 9 ? p : p.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Bt(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = E.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof f.is == "string" ? n = E.createElement(l, { is: f.is }) : (n = E.createElement(l), l === "select" && (E = n, f.multiple ? E.multiple = !0 : f.size && (E.size = f.size))) : n = E.createElementNS(n, l), n[Ti] = r, n[ml] = f, Ri(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (E = $n(l, f), l) {
                case "dialog":
                  fn("cancel", n), fn("close", n), p = f;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  fn("load", n), p = f;
                  break;
                case "video":
                case "audio":
                  for (p = 0; p < _s.length; p++) fn(_s[p], n);
                  p = f;
                  break;
                case "source":
                  fn("error", n), p = f;
                  break;
                case "img":
                case "image":
                case "link":
                  fn(
                    "error",
                    n
                  ), fn("load", n), p = f;
                  break;
                case "details":
                  fn("toggle", n), p = f;
                  break;
                case "input":
                  Xt(n, f), p = Le(n, f), fn("invalid", n);
                  break;
                case "option":
                  p = f;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!f.multiple }, p = Y({}, f, { value: void 0 }), fn("invalid", n);
                  break;
                case "textarea":
                  te(n, f), p = Te(n, f), fn("invalid", n);
                  break;
                default:
                  p = f;
              }
              ur(l, p), M = p;
              for (g in M) if (M.hasOwnProperty(g)) {
                var U = M[g];
                g === "style" ? Wt(n, U) : g === "dangerouslySetInnerHTML" ? (U = U ? U.__html : void 0, U != null && bi(n, U)) : g === "children" ? typeof U == "string" ? (l !== "textarea" || U !== "") && Pr(n, U) : typeof U == "number" && Pr(n, "" + U) : g !== "suppressContentEditableWarning" && g !== "suppressHydrationWarning" && g !== "autoFocus" && (m.hasOwnProperty(g) ? U != null && g === "onScroll" && fn("scroll", n) : U != null && X(n, g, U, E));
              }
              switch (l) {
                case "input":
                  Ut(n), N(n, f, !1);
                  break;
                case "textarea":
                  Ut(n), Tt(n);
                  break;
                case "option":
                  f.value != null && n.setAttribute("value", "" + rt(f.value));
                  break;
                case "select":
                  n.multiple = !!f.multiple, g = f.value, g != null ? _e(n, !!f.multiple, g, !1) : f.defaultValue != null && _e(
                    n,
                    !!f.multiple,
                    f.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof p.onClick == "function" && (n.onclick = Yc);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  f = !!f.autoFocus;
                  break e;
                case "img":
                  f = !0;
                  break e;
                default:
                  f = !1;
              }
            }
            f && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return Ur(r), null;
      case 6:
        if (n && r.stateNode != null) Wa(n, r, n.memoizedProps, f);
        else {
          if (typeof f != "string" && r.stateNode === null) throw Error(c(166));
          if (l = bl(Us.current), bl(pi.current), Kc(r)) {
            if (f = r.stateNode, l = r.memoizedProps, f[Ti] = r, (g = f.nodeValue !== l) && (n = Ea, n !== null)) switch (n.tag) {
              case 3:
                Ic(f.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Ic(f.nodeValue, l, (n.mode & 1) !== 0);
            }
            g && (r.flags |= 4);
          } else f = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(f), f[Ti] = r, r.stateNode = f;
        }
        return Ur(r), null;
      case 13:
        if (Gt(Rn), f = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Sn && aa !== null && r.mode & 1 && !(r.flags & 128)) om(), On(), r.flags |= 98560, g = !1;
          else if (g = Kc(r), f !== null && f.dehydrated !== null) {
            if (n === null) {
              if (!g) throw Error(c(318));
              if (g = r.memoizedState, g = g !== null ? g.dehydrated : null, !g) throw Error(c(317));
              g[Ti] = r;
            } else On(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Ur(r), g = !1;
          } else Ba !== null && (Up(Ba), Ba = null), g = !0;
          if (!g) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (f = f !== null, f !== (n !== null && n.memoizedState !== null) && f && (r.child.flags |= 8192, r.mode & 1 && (n === null || Rn.current & 1 ? tr === 0 && (tr = 3) : Xs())), r.updateQueue !== null && (r.flags |= 4), Ur(r), null);
      case 4:
        return mu(), wu(n, r), n === null && su(r.stateNode.containerInfo), Ur(r), null;
      case 10:
        return gp(r.type._context), Ur(r), null;
      case 17:
        return wn(r.type) && $a(), Ur(r), null;
      case 19:
        if (Gt(Rn), g = r.memoizedState, g === null) return Ur(r), null;
        if (f = (r.flags & 128) !== 0, E = g.rendering, E === null) if (f) zn(g, !1);
        else {
          if (tr !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (E = nf(n), E !== null) {
              for (r.flags |= 128, zn(g, !1), f = E.updateQueue, f !== null && (r.updateQueue = f, r.flags |= 4), r.subtreeFlags = 0, f = l, l = r.child; l !== null; ) g = l, n = f, g.flags &= 14680066, E = g.alternate, E === null ? (g.childLanes = 0, g.lanes = n, g.child = null, g.subtreeFlags = 0, g.memoizedProps = null, g.memoizedState = null, g.updateQueue = null, g.dependencies = null, g.stateNode = null) : (g.childLanes = E.childLanes, g.lanes = E.lanes, g.child = E.child, g.subtreeFlags = 0, g.deletions = null, g.memoizedProps = E.memoizedProps, g.memoizedState = E.memoizedState, g.updateQueue = E.updateQueue, g.type = E.type, n = E.dependencies, g.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return qt(Rn, Rn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          g.tail !== null && Qt() > Uu && (r.flags |= 128, f = !0, zn(g, !1), r.lanes = 4194304);
        }
        else {
          if (!f) if (n = nf(E), n !== null) {
            if (r.flags |= 128, f = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), zn(g, !0), g.tail === null && g.tailMode === "hidden" && !E.alternate && !Sn) return Ur(r), null;
          } else 2 * Qt() - g.renderingStartTime > Uu && l !== 1073741824 && (r.flags |= 128, f = !0, zn(g, !1), r.lanes = 4194304);
          g.isBackwards ? (E.sibling = r.child, r.child = E) : (l = g.last, l !== null ? l.sibling = E : r.child = E, g.last = E);
        }
        return g.tail !== null ? (r = g.tail, g.rendering = r, g.tail = r.sibling, g.renderingStartTime = Qt(), r.sibling = null, l = Rn.current, qt(Rn, f ? l & 1 | 2 : l & 1), r) : (Ur(r), null);
      case 22:
      case 23:
        return Uf(), f = r.memoizedState !== null, n !== null && n.memoizedState !== null !== f && (r.flags |= 8192), f && r.mode & 1 ? sa & 1073741824 && (Ur(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Ur(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, r.tag));
  }
  function N0(n, r) {
    switch (hp(r), r.tag) {
      case 1:
        return wn(r.type) && $a(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return mu(), Gt(Ln), Gt(bt), Ep(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Cp(r), null;
      case 13:
        if (Gt(Rn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(c(340));
          On();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Gt(Rn), null;
      case 4:
        return mu(), null;
      case 10:
        return gp(r.type._context), null;
      case 22:
      case 23:
        return Uf(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var _u = !1, Cr = !1, Rf = typeof WeakSet == "function" ? WeakSet : Set, He = null;
  function ku(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (f) {
      Fn(n, r, f);
    }
    else l.current = null;
  }
  function Dp(n, r, l) {
    try {
      l();
    } catch (f) {
      Fn(n, r, f);
    }
  }
  var _f = !1;
  function L0(n, r) {
    if (lp = sl, n = jc(), Yi(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var f = l.getSelection && l.getSelection();
        if (f && f.rangeCount !== 0) {
          l = f.anchorNode;
          var p = f.anchorOffset, g = f.focusNode;
          f = f.focusOffset;
          try {
            l.nodeType, g.nodeType;
          } catch {
            l = null;
            break e;
          }
          var E = 0, M = -1, U = -1, J = 0, ye = 0, Ce = n, me = null;
          t: for (; ; ) {
            for (var je; Ce !== l || p !== 0 && Ce.nodeType !== 3 || (M = E + p), Ce !== g || f !== 0 && Ce.nodeType !== 3 || (U = E + f), Ce.nodeType === 3 && (E += Ce.nodeValue.length), (je = Ce.firstChild) !== null; )
              me = Ce, Ce = je;
            for (; ; ) {
              if (Ce === n) break t;
              if (me === l && ++J === p && (M = E), me === g && ++ye === f && (U = E), (je = Ce.nextSibling) !== null) break;
              Ce = me, me = Ce.parentNode;
            }
            Ce = je;
          }
          l = M === -1 || U === -1 ? null : { start: M, end: U };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (vl = { focusedElem: n, selectionRange: l }, sl = !1, He = r; He !== null; ) if (r = He, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, He = n;
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
              var qe = Ye.memoizedProps, Hn = Ye.memoizedState, W = r.stateNode, j = W.getSnapshotBeforeUpdate(r.elementType === r.type ? qe : oa(r.type, qe), Hn);
              W.__reactInternalSnapshotBeforeUpdate = j;
            }
            break;
          case 3:
            var K = r.stateNode.containerInfo;
            K.nodeType === 1 ? K.textContent = "" : K.nodeType === 9 && K.documentElement && K.removeChild(K.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(c(163));
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
    return Ye = _f, _f = !1, Ye;
  }
  function Ou(n, r, l) {
    var f = r.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var p = f = f.next;
      do {
        if ((p.tag & n) === n) {
          var g = p.destroy;
          p.destroy = void 0, g !== void 0 && Dp(r, l, g);
        }
        p = p.next;
      } while (p !== f);
    }
  }
  function kf(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var f = l.create;
          l.destroy = f();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Of(n) {
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
  function wm(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, wm(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ti], delete r[ml], delete r[cp], delete r[k0], delete r[fp])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Mp(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Rm(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Mp(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Gs(n, r, l) {
    var f = n.tag;
    if (f === 5 || f === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Yc));
    else if (f !== 4 && (n = n.child, n !== null)) for (Gs(n, r, l), n = n.sibling; n !== null; ) Gs(n, r, l), n = n.sibling;
  }
  function Du(n, r, l) {
    var f = n.tag;
    if (f === 5 || f === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (f !== 4 && (n = n.child, n !== null)) for (Du(n, r, l), n = n.sibling; n !== null; ) Du(n, r, l), n = n.sibling;
  }
  var _n = null, pr = !1;
  function jr(n, r, l) {
    for (l = l.child; l !== null; ) Mu(n, r, l), l = l.sibling;
  }
  function Mu(n, r, l) {
    if (li && typeof li.onCommitFiberUnmount == "function") try {
      li.onCommitFiberUnmount(fs, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Cr || ku(l, r);
      case 6:
        var f = _n, p = pr;
        _n = null, jr(n, r, l), _n = f, pr = p, _n !== null && (pr ? (n = _n, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : _n.removeChild(l.stateNode));
        break;
      case 18:
        _n !== null && (pr ? (n = _n, l = l.stateNode, n.nodeType === 8 ? To(n.parentNode, l) : n.nodeType === 1 && To(n, l), ms(n)) : To(_n, l.stateNode));
        break;
      case 4:
        f = _n, p = pr, _n = l.stateNode.containerInfo, pr = !0, jr(n, r, l), _n = f, pr = p;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Cr && (f = l.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          p = f = f.next;
          do {
            var g = p, E = g.destroy;
            g = g.tag, E !== void 0 && (g & 2 || g & 4) && Dp(l, r, E), p = p.next;
          } while (p !== f);
        }
        jr(n, r, l);
        break;
      case 1:
        if (!Cr && (ku(l, r), f = l.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = l.memoizedProps, f.state = l.memoizedState, f.componentWillUnmount();
        } catch (M) {
          Fn(l, r, M);
        }
        jr(n, r, l);
        break;
      case 21:
        jr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Cr = (f = Cr) || l.memoizedState !== null, jr(n, r, l), Cr = f) : jr(n, r, l);
        break;
      default:
        jr(n, r, l);
    }
  }
  function Au(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new Rf()), r.forEach(function(f) {
        var p = V0.bind(null, n, f);
        l.has(f) || (l.add(f), f.then(p, p));
      });
    }
  }
  function vr(n, r) {
    var l = r.deletions;
    if (l !== null) for (var f = 0; f < l.length; f++) {
      var p = l[f];
      try {
        var g = n, E = r, M = E;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 5:
              _n = M.stateNode, pr = !1;
              break e;
            case 3:
              _n = M.stateNode.containerInfo, pr = !0;
              break e;
            case 4:
              _n = M.stateNode.containerInfo, pr = !0;
              break e;
          }
          M = M.return;
        }
        if (_n === null) throw Error(c(160));
        Mu(g, E, p), _n = null, pr = !1;
        var U = p.alternate;
        U !== null && (U.return = null), p.return = null;
      } catch (J) {
        Fn(p, r, J);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) _m(r, n), r = r.sibling;
  }
  function _m(n, r) {
    var l = n.alternate, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (vr(r, n), _i(n), f & 4) {
          try {
            Ou(3, n, n.return), kf(3, n);
          } catch (qe) {
            Fn(n, n.return, qe);
          }
          try {
            Ou(5, n, n.return);
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 1:
        vr(r, n), _i(n), f & 512 && l !== null && ku(l, l.return);
        break;
      case 5:
        if (vr(r, n), _i(n), f & 512 && l !== null && ku(l, l.return), n.flags & 32) {
          var p = n.stateNode;
          try {
            Pr(p, "");
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        if (f & 4 && (p = n.stateNode, p != null)) {
          var g = n.memoizedProps, E = l !== null ? l.memoizedProps : g, M = n.type, U = n.updateQueue;
          if (n.updateQueue = null, U !== null) try {
            M === "input" && g.type === "radio" && g.name != null && mn(p, g), $n(M, E);
            var J = $n(M, g);
            for (E = 0; E < U.length; E += 2) {
              var ye = U[E], Ce = U[E + 1];
              ye === "style" ? Wt(p, Ce) : ye === "dangerouslySetInnerHTML" ? bi(p, Ce) : ye === "children" ? Pr(p, Ce) : X(p, ye, Ce, J);
            }
            switch (M) {
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
            p[ml] = g;
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 6:
        if (vr(r, n), _i(n), f & 4) {
          if (n.stateNode === null) throw Error(c(162));
          p = n.stateNode, g = n.memoizedProps;
          try {
            p.nodeValue = g;
          } catch (qe) {
            Fn(n, n.return, qe);
          }
        }
        break;
      case 3:
        if (vr(r, n), _i(n), f & 4 && l !== null && l.memoizedState.isDehydrated) try {
          ms(r.containerInfo);
        } catch (qe) {
          Fn(n, n.return, qe);
        }
        break;
      case 4:
        vr(r, n), _i(n);
        break;
      case 13:
        vr(r, n), _i(n), p = n.child, p.flags & 8192 && (g = p.memoizedState !== null, p.stateNode.isHidden = g, !g || p.alternate !== null && p.alternate.memoizedState !== null || (Mf = Qt())), f & 4 && Au(n);
        break;
      case 22:
        if (ye = l !== null && l.memoizedState !== null, n.mode & 1 ? (Cr = (J = Cr) || ye, vr(r, n), Cr = J) : vr(r, n), _i(n), f & 8192) {
          if (J = n.memoizedState !== null, (n.stateNode.isHidden = J) && !ye && n.mode & 1) for (He = n, ye = n.child; ye !== null; ) {
            for (Ce = He = ye; He !== null; ) {
              switch (me = He, je = me.child, me.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ou(4, me, me.return);
                  break;
                case 1:
                  ku(me, me.return);
                  var Ye = me.stateNode;
                  if (typeof Ye.componentWillUnmount == "function") {
                    f = me, l = me.return;
                    try {
                      r = f, Ye.props = r.memoizedProps, Ye.state = r.memoizedState, Ye.componentWillUnmount();
                    } catch (qe) {
                      Fn(f, l, qe);
                    }
                  }
                  break;
                case 5:
                  ku(me, me.return);
                  break;
                case 22:
                  if (me.memoizedState !== null) {
                    km(Ce);
                    continue;
                  }
              }
              je !== null ? (je.return = me, He = je) : km(Ce);
            }
            ye = ye.sibling;
          }
          e: for (ye = null, Ce = n; ; ) {
            if (Ce.tag === 5) {
              if (ye === null) {
                ye = Ce;
                try {
                  p = Ce.stateNode, J ? (g = p.style, typeof g.setProperty == "function" ? g.setProperty("display", "none", "important") : g.display = "none") : (M = Ce.stateNode, U = Ce.memoizedProps.style, E = U != null && U.hasOwnProperty("display") ? U.display : null, M.style.display = Ot("display", E));
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
        vr(r, n), _i(n), f & 4 && Au(n);
        break;
      case 21:
        break;
      default:
        vr(
          r,
          n
        ), _i(n);
    }
  }
  function _i(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Mp(l)) {
              var f = l;
              break e;
            }
            l = l.return;
          }
          throw Error(c(160));
        }
        switch (f.tag) {
          case 5:
            var p = f.stateNode;
            f.flags & 32 && (Pr(p, ""), f.flags &= -33);
            var g = Rm(n);
            Du(n, g, p);
            break;
          case 3:
          case 4:
            var E = f.stateNode.containerInfo, M = Rm(n);
            Gs(n, M, E);
            break;
          default:
            throw Error(c(161));
        }
      } catch (U) {
        Fn(n, n.return, U);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function z0(n, r, l) {
    He = n, Ap(n);
  }
  function Ap(n, r, l) {
    for (var f = (n.mode & 1) !== 0; He !== null; ) {
      var p = He, g = p.child;
      if (p.tag === 22 && f) {
        var E = p.memoizedState !== null || _u;
        if (!E) {
          var M = p.alternate, U = M !== null && M.memoizedState !== null || Cr;
          M = _u;
          var J = Cr;
          if (_u = E, (Cr = U) && !J) for (He = p; He !== null; ) E = He, U = E.child, E.tag === 22 && E.memoizedState !== null ? Np(p) : U !== null ? (U.return = E, He = U) : Np(p);
          for (; g !== null; ) He = g, Ap(g), g = g.sibling;
          He = p, _u = M, Cr = J;
        }
        Nu(n);
      } else p.subtreeFlags & 8772 && g !== null ? (g.return = p, He = g) : Nu(n);
    }
  }
  function Nu(n) {
    for (; He !== null; ) {
      var r = He;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Cr || kf(5, r);
              break;
            case 1:
              var f = r.stateNode;
              if (r.flags & 4 && !Cr) if (l === null) f.componentDidMount();
              else {
                var p = r.elementType === r.type ? l.memoizedProps : oa(r.type, l.memoizedProps);
                f.componentDidUpdate(p, l.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var g = r.updateQueue;
              g !== null && fm(r, g, f);
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
                fm(r, E, l);
              }
              break;
            case 5:
              var M = r.stateNode;
              if (l === null && r.flags & 4) {
                l = M;
                var U = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    U.autoFocus && l.focus();
                    break;
                  case "img":
                    U.src && (l.src = U.src);
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
                    Ce !== null && ms(Ce);
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
              throw Error(c(163));
          }
          Cr || r.flags & 512 && Of(r);
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
  function km(n) {
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
  function Np(n) {
    for (; He !== null; ) {
      var r = He;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              kf(4, r);
            } catch (U) {
              Fn(r, l, U);
            }
            break;
          case 1:
            var f = r.stateNode;
            if (typeof f.componentDidMount == "function") {
              var p = r.return;
              try {
                f.componentDidMount();
              } catch (U) {
                Fn(r, p, U);
              }
            }
            var g = r.return;
            try {
              Of(r);
            } catch (U) {
              Fn(r, g, U);
            }
            break;
          case 5:
            var E = r.return;
            try {
              Of(r);
            } catch (U) {
              Fn(r, E, U);
            }
        }
      } catch (U) {
        Fn(r, r.return, U);
      }
      if (r === n) {
        He = null;
        break;
      }
      var M = r.sibling;
      if (M !== null) {
        M.return = r.return, He = M;
        break;
      }
      He = r.return;
    }
  }
  var U0 = Math.ceil, kl = le.ReactCurrentDispatcher, Df = le.ReactCurrentOwner, Ga = le.ReactCurrentBatchConfig, Lt = 0, Un = null, bn = null, er = 0, sa = 0, Lu = kt(0), tr = 0, Qs = null, Ol = 0, zu = 0, Lp = 0, No = null, Fr = null, Mf = 0, Uu = 1 / 0, eo = null, Af = !1, zp = null, Qa = null, Fu = !1, qa = null, Nf = 0, qs = 0, Lf = null, Ks = -1, Dl = 0;
  function hr() {
    return Lt & 6 ? Qt() : Ks !== -1 ? Ks : Ks = Qt();
  }
  function to(n) {
    return n.mode & 1 ? Lt & 2 && er !== 0 ? er & -er : Xc.transition !== null ? (Dl === 0 && (Dl = _c()), Dl) : (n = Zt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Vd(n.type)), n) : 1;
  }
  function Dn(n, r, l, f) {
    if (50 < qs) throw qs = 0, Lf = null, Error(c(185));
    ul(n, l, f), (!(Lt & 2) || n !== Un) && (n === Un && (!(Lt & 2) && (zu |= l), tr === 4 && ki(n, er)), nr(n, f), l === 1 && Lt === 0 && !(r.mode & 1) && (Uu = Qt() + 500, dr && ta()));
  }
  function nr(n, r) {
    var l = n.callbackNode;
    Rc(n, r);
    var f = ui(n, n === Un ? er : 0);
    if (f === 0) l !== null && kn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = f & -f, n.callbackPriority !== r) {
      if (l != null && kn(l), r === 1) n.tag === 0 ? pp(Pu.bind(null, n)) : dp(Pu.bind(null, n)), sp(function() {
        !(Lt & 6) && ta();
      }), l = null;
      else {
        switch (Pd(f)) {
          case 1:
            l = ga;
            break;
          case 4:
            l = At;
            break;
          case 16:
            l = Ei;
            break;
          case 536870912:
            l = Ld;
            break;
          default:
            l = Ei;
        }
        l = Um(l, zf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function zf(n, r) {
    if (Ks = -1, Dl = 0, Lt & 6) throw Error(c(327));
    var l = n.callbackNode;
    if (ju() && n.callbackNode !== l) return null;
    var f = ui(n, n === Un ? er : 0);
    if (f === 0) return null;
    if (f & 30 || f & n.expiredLanes || r) r = Ff(n, f);
    else {
      r = f;
      var p = Lt;
      Lt |= 2;
      var g = Dm();
      (Un !== n || er !== r) && (eo = null, Uu = Qt() + 500, Al(n, r));
      do
        try {
          P0();
          break;
        } catch (M) {
          Om(n, M);
        }
      while (!0);
      Ta(), kl.current = g, Lt = p, bn !== null ? r = 0 : (Un = null, er = 0, r = tr);
    }
    if (r !== 0) {
      if (r === 2 && (p = Ud(n), p !== 0 && (f = p, r = Ml(n, p))), r === 1) throw l = Qs, Al(n, 0), ki(n, f), nr(n, Qt()), l;
      if (r === 6) ki(n, f);
      else {
        if (p = n.current.alternate, !(f & 30) && !Fp(p) && (r = Ff(n, f), r === 2 && (g = Ud(n), g !== 0 && (f = g, r = Ml(n, g))), r === 1)) throw l = Qs, Al(n, 0), ki(n, f), nr(n, Qt()), l;
        switch (n.finishedWork = p, n.finishedLanes = f, r) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            Lo(n, Fr, eo);
            break;
          case 3:
            if (ki(n, f), (f & 130023424) === f && (r = Mf + 500 - Qt(), 10 < r)) {
              if (ui(n, 0) !== 0) break;
              if (p = n.suspendedLanes, (p & f) !== f) {
                hr(), n.pingedLanes |= n.suspendedLanes & p;
                break;
              }
              n.timeoutHandle = hl(Lo.bind(null, n, Fr, eo), r);
              break;
            }
            Lo(n, Fr, eo);
            break;
          case 4:
            if (ki(n, f), (f & 4194240) === f) break;
            for (r = n.eventTimes, p = -1; 0 < f; ) {
              var E = 31 - La(f);
              g = 1 << E, E = r[E], E > p && (p = E), f &= ~g;
            }
            if (f = p, f = Qt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * U0(f / 1960)) - f, 10 < f) {
              n.timeoutHandle = hl(Lo.bind(null, n, Fr, eo), f);
              break;
            }
            Lo(n, Fr, eo);
            break;
          case 5:
            Lo(n, Fr, eo);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return nr(n, Qt()), n.callbackNode === l ? zf.bind(null, n) : null;
  }
  function Ml(n, r) {
    var l = No;
    return n.current.memoizedState.isDehydrated && (Al(n, r).flags |= 256), n = Ff(n, r), n !== 2 && (r = Fr, Fr = l, r !== null && Up(r)), n;
  }
  function Up(n) {
    Fr === null ? Fr = n : Fr.push.apply(Fr, n);
  }
  function Fp(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var f = 0; f < l.length; f++) {
          var p = l[f], g = p.getSnapshot;
          p = p.value;
          try {
            if (!Fa(g(), p)) return !1;
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
  function ki(n, r) {
    for (r &= ~Lp, r &= ~zu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - La(r), f = 1 << l;
      n[l] = -1, r &= ~f;
    }
  }
  function Pu(n) {
    if (Lt & 6) throw Error(c(327));
    ju();
    var r = ui(n, 0);
    if (!(r & 1)) return nr(n, Qt()), null;
    var l = Ff(n, r);
    if (n.tag !== 0 && l === 2) {
      var f = Ud(n);
      f !== 0 && (r = f, l = Ml(n, f));
    }
    if (l === 1) throw l = Qs, Al(n, 0), ki(n, r), nr(n, Qt()), l;
    if (l === 6) throw Error(c(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, Lo(n, Fr, eo), nr(n, Qt()), null;
  }
  function Pp(n, r) {
    var l = Lt;
    Lt |= 1;
    try {
      return n(r);
    } finally {
      Lt = l, Lt === 0 && (Uu = Qt() + 500, dr && ta());
    }
  }
  function Oi(n) {
    qa !== null && qa.tag === 0 && !(Lt & 6) && ju();
    var r = Lt;
    Lt |= 1;
    var l = Ga.transition, f = Zt;
    try {
      if (Ga.transition = null, Zt = 1, n) return n();
    } finally {
      Zt = f, Ga.transition = l, Lt = r, !(Lt & 6) && ta();
    }
  }
  function Uf() {
    sa = Lu.current, Gt(Lu);
  }
  function Al(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, nm(l)), bn !== null) for (l = bn.return; l !== null; ) {
      var f = l;
      switch (hp(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && $a();
          break;
        case 3:
          mu(), Gt(Ln), Gt(bt), Ep();
          break;
        case 5:
          Cp(f);
          break;
        case 4:
          mu();
          break;
        case 13:
          Gt(Rn);
          break;
        case 19:
          Gt(Rn);
          break;
        case 10:
          gp(f.type._context);
          break;
        case 22:
        case 23:
          Uf();
      }
      l = l.return;
    }
    if (Un = n, bn = n = zo(n.current, null), er = sa = r, tr = 0, Qs = null, Lp = zu = Ol = 0, Fr = No = null, Sl !== null) {
      for (r = 0; r < Sl.length; r++) if (l = Sl[r], f = l.interleaved, f !== null) {
        l.interleaved = null;
        var p = f.next, g = l.pending;
        if (g !== null) {
          var E = g.next;
          g.next = p, f.next = E;
        }
        l.pending = f;
      }
      Sl = null;
    }
    return n;
  }
  function Om(n, r) {
    do {
      var l = bn;
      try {
        if (Ta(), af.current = zr, xa) {
          for (var f = tt.memoizedState; f !== null; ) {
            var p = f.queue;
            p !== null && (p.pending = null), f = f.next;
          }
          xa = !1;
        }
        if (Ze = 0, Nt = Ct = tt = null, yu = !1, Ps = 0, Df.current = null, l === null || l.return === null) {
          tr = 1, Qs = r, bn = null;
          break;
        }
        e: {
          var g = n, E = l.return, M = l, U = r;
          if (r = er, M.flags |= 32768, U !== null && typeof U == "object" && typeof U.then == "function") {
            var J = U, ye = M, Ce = ye.tag;
            if (!(ye.mode & 1) && (Ce === 0 || Ce === 11 || Ce === 15)) {
              var me = ye.alternate;
              me ? (ye.updateQueue = me.updateQueue, ye.memoizedState = me.memoizedState, ye.lanes = me.lanes) : (ye.updateQueue = null, ye.memoizedState = null);
            }
            var je = bm(E);
            if (je !== null) {
              je.flags &= -257, _p(je, E, M, g, r), je.mode & 1 && Hs(g, J, r), r = je, U = J;
              var Ye = r.updateQueue;
              if (Ye === null) {
                var qe = /* @__PURE__ */ new Set();
                qe.add(U), r.updateQueue = qe;
              } else Ye.add(U);
              break e;
            } else {
              if (!(r & 1)) {
                Hs(g, J, r), Xs();
                break e;
              }
              U = Error(c(426));
            }
          } else if (Sn && M.mode & 1) {
            var Hn = bm(E);
            if (Hn !== null) {
              !(Hn.flags & 65536) && (Hn.flags |= 256), _p(Hn, E, M, g, r), yp(Mo(U, M));
              break e;
            }
          }
          g = U = Mo(U, M), tr !== 4 && (tr = 2), No === null ? No = [g] : No.push(g), g = E;
          do {
            switch (g.tag) {
              case 3:
                g.flags |= 65536, r &= -r, g.lanes |= r;
                var W = gm(g, U, r);
                cm(g, W);
                break e;
              case 1:
                M = U;
                var j = g.type, K = g.stateNode;
                if (!(g.flags & 128) && (typeof j.getDerivedStateFromError == "function" || K !== null && typeof K.componentDidCatch == "function" && (Qa === null || !Qa.has(K)))) {
                  g.flags |= 65536, r &= -r, g.lanes |= r;
                  var xe = Sm(g, M, r);
                  cm(g, xe);
                  break e;
                }
            }
            g = g.return;
          } while (g !== null);
        }
        Am(l);
      } catch (Je) {
        r = Je, bn === l && l !== null && (bn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Dm() {
    var n = kl.current;
    return kl.current = zr, n === null ? zr : n;
  }
  function Xs() {
    (tr === 0 || tr === 3 || tr === 2) && (tr = 4), Un === null || !(Ol & 268435455) && !(zu & 268435455) || ki(Un, er);
  }
  function Ff(n, r) {
    var l = Lt;
    Lt |= 2;
    var f = Dm();
    (Un !== n || er !== r) && (eo = null, Al(n, r));
    do
      try {
        F0();
        break;
      } catch (p) {
        Om(n, p);
      }
    while (!0);
    if (Ta(), Lt = l, kl.current = f, bn !== null) throw Error(c(261));
    return Un = null, er = 0, tr;
  }
  function F0() {
    for (; bn !== null; ) Mm(bn);
  }
  function P0() {
    for (; bn !== null && !Zr(); ) Mm(bn);
  }
  function Mm(n) {
    var r = zm(n.alternate, n, sa);
    n.memoizedProps = n.pendingProps, r === null ? Am(n) : bn = r, Df.current = null;
  }
  function Am(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = N0(l, r), l !== null) {
          l.flags &= 32767, bn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          tr = 6, bn = null;
          return;
        }
      } else if (l = A0(l, r, sa), l !== null) {
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
  function Lo(n, r, l) {
    var f = Zt, p = Ga.transition;
    try {
      Ga.transition = null, Zt = 1, j0(n, r, l, f);
    } finally {
      Ga.transition = p, Zt = f;
    }
    return null;
  }
  function j0(n, r, l, f) {
    do
      ju();
    while (qa !== null);
    if (Lt & 6) throw Error(c(327));
    l = n.finishedWork;
    var p = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(c(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var g = l.lanes | l.childLanes;
    if (c0(n, g), n === Un && (bn = Un = null, er = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Fu || (Fu = !0, Um(Ei, function() {
      return ju(), null;
    })), g = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || g) {
      g = Ga.transition, Ga.transition = null;
      var E = Zt;
      Zt = 1;
      var M = Lt;
      Lt |= 4, Df.current = null, L0(n, l), _m(l, n), $c(vl), sl = !!lp, vl = lp = null, n.current = l, z0(l), go(), Lt = M, Zt = E, Ga.transition = g;
    } else n.current = l;
    if (Fu && (Fu = !1, qa = n, Nf = p), g = n.pendingLanes, g === 0 && (Qa = null), mh(l.stateNode), nr(n, Qt()), r !== null) for (f = n.onRecoverableError, l = 0; l < r.length; l++) p = r[l], f(p.value, { componentStack: p.stack, digest: p.digest });
    if (Af) throw Af = !1, n = zp, zp = null, n;
    return Nf & 1 && n.tag !== 0 && ju(), g = n.pendingLanes, g & 1 ? n === Lf ? qs++ : (qs = 0, Lf = n) : qs = 0, ta(), null;
  }
  function ju() {
    if (qa !== null) {
      var n = Pd(Nf), r = Ga.transition, l = Zt;
      try {
        if (Ga.transition = null, Zt = 16 > n ? 16 : n, qa === null) var f = !1;
        else {
          if (n = qa, qa = null, Nf = 0, Lt & 6) throw Error(c(331));
          var p = Lt;
          for (Lt |= 4, He = n.current; He !== null; ) {
            var g = He, E = g.child;
            if (He.flags & 16) {
              var M = g.deletions;
              if (M !== null) {
                for (var U = 0; U < M.length; U++) {
                  var J = M[U];
                  for (He = J; He !== null; ) {
                    var ye = He;
                    switch (ye.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ou(8, ye, g);
                    }
                    var Ce = ye.child;
                    if (Ce !== null) Ce.return = ye, He = Ce;
                    else for (; He !== null; ) {
                      ye = He;
                      var me = ye.sibling, je = ye.return;
                      if (wm(ye), ye === J) {
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
                  Ou(9, g, g.return);
              }
              var W = g.sibling;
              if (W !== null) {
                W.return = g.return, He = W;
                break e;
              }
              He = g.return;
            }
          }
          var j = n.current;
          for (He = j; He !== null; ) {
            E = He;
            var K = E.child;
            if (E.subtreeFlags & 2064 && K !== null) K.return = E, He = K;
            else e: for (E = j; He !== null; ) {
              if (M = He, M.flags & 2048) try {
                switch (M.tag) {
                  case 0:
                  case 11:
                  case 15:
                    kf(9, M);
                }
              } catch (Je) {
                Fn(M, M.return, Je);
              }
              if (M === E) {
                He = null;
                break e;
              }
              var xe = M.sibling;
              if (xe !== null) {
                xe.return = M.return, He = xe;
                break e;
              }
              He = M.return;
            }
          }
          if (Lt = p, ta(), li && typeof li.onPostCommitFiberRoot == "function") try {
            li.onPostCommitFiberRoot(fs, n);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        Zt = l, Ga.transition = r;
      }
    }
    return !1;
  }
  function Nm(n, r, l) {
    r = Mo(l, r), r = gm(n, r, 1), n = Oo(n, r, 1), r = hr(), n !== null && (ul(n, 1, r), nr(n, r));
  }
  function Fn(n, r, l) {
    if (n.tag === 3) Nm(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Nm(r, n, l);
        break;
      } else if (r.tag === 1) {
        var f = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (Qa === null || !Qa.has(f))) {
          n = Mo(l, n), n = Sm(r, n, 1), r = Oo(r, n, 1), n = hr(), r !== null && (ul(r, 1, n), nr(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function $0(n, r, l) {
    var f = n.pingCache;
    f !== null && f.delete(r), r = hr(), n.pingedLanes |= n.suspendedLanes & l, Un === n && (er & l) === l && (tr === 4 || tr === 3 && (er & 130023424) === er && 500 > Qt() - Mf ? Al(n, 0) : Lp |= l), nr(n, r);
  }
  function Lm(n, r) {
    r === 0 && (n.mode & 1 ? (r = Jl, Jl <<= 1, !(Jl & 130023424) && (Jl = 4194304)) : r = 1);
    var l = hr();
    n = Xi(n, r), n !== null && (ul(n, r, l), nr(n, l));
  }
  function jp(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Lm(n, l);
  }
  function V0(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var f = n.stateNode, p = n.memoizedState;
        p !== null && (l = p.retryLane);
        break;
      case 19:
        f = n.stateNode;
        break;
      default:
        throw Error(c(314));
    }
    f !== null && f.delete(r), Lm(n, l);
  }
  var zm;
  zm = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Ln.current) la = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return la = !1, Ji(n, r, l);
      la = !!(n.flags & 131072);
    }
    else la = !1, Sn && r.flags & 1048576 && vp(r, fu, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var f = r.type;
        Ws(n, r), n = r.pendingProps;
        var p = ja(r, bt.current);
        pu(r, l), p = he(null, r, f, n, p, l);
        var g = Qn();
        return r.flags |= 1, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, wn(f) ? (g = !0, Wc(r)) : g = !1, r.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, Jc(r), p.updater = wl, r.stateNode = p, p._reactInternals = r, wp(r, f, n, l), r = Ef(null, r, f, !0, g, l)) : (r.tag = 0, Sn && g && Gc(r), Vn(null, r, p, l), r = r.child), r;
      case 16:
        f = r.elementType;
        e: {
          switch (Ws(n, r), n = r.pendingProps, p = f._init, f = p(f._payload), r.type = f, p = r.tag = B0(f), n = oa(f, n), p) {
            case 0:
              r = _t(null, r, f, n, l);
              break e;
            case 1:
              r = Is(null, r, f, n, l);
              break e;
            case 11:
              r = xu(null, r, f, n, l);
              break e;
            case 14:
              r = Ao(null, r, f, oa(f.type, n), l);
              break e;
          }
          throw Error(c(
            306,
            f,
            ""
          ));
        }
        return r;
      case 0:
        return f = r.type, p = r.pendingProps, p = r.elementType === f ? p : oa(f, p), _t(n, r, f, p, l);
      case 1:
        return f = r.type, p = r.pendingProps, p = r.elementType === f ? p : oa(f, p), Is(n, r, f, p, l);
      case 3:
        e: {
          if (M0(r), n === null) throw Error(c(387));
          f = r.pendingProps, g = r.memoizedState, p = g.element, vu(n, r), tf(r, f, null, l);
          var E = r.memoizedState;
          if (f = E.element, g.isDehydrated) if (g = { element: f, isDehydrated: !1, cache: E.cache, pendingSuspenseBoundaries: E.pendingSuspenseBoundaries, transitions: E.transitions }, r.updateQueue.baseState = g, r.memoizedState = g, r.flags & 256) {
            p = Mo(Error(c(423)), r), r = Em(n, r, f, l, p);
            break e;
          } else if (f !== p) {
            p = Mo(Error(c(424)), r), r = Em(n, r, f, l, p);
            break e;
          } else for (aa = di(r.stateNode.containerInfo.firstChild), Ea = r, Sn = !0, Ba = null, l = um(r, null, f, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (On(), f === p) {
              r = Bn(n, r, l);
              break e;
            }
            Vn(n, r, f, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return dm(r), n === null && qc(r), f = r.type, p = r.pendingProps, g = n !== null ? n.memoizedProps : null, E = p.children, Ds(f, p) ? E = null : g !== null && Ds(f, g) && (r.flags |= 32), Rl(n, r), Vn(n, r, E, l), r.child;
      case 6:
        return n === null && qc(r), null;
      case 13:
        return Tm(n, r, l);
      case 4:
        return bp(r, r.stateNode.containerInfo), f = r.pendingProps, n === null ? r.child = du(r, null, f, l) : Vn(n, r, f, l), r.child;
      case 11:
        return f = r.type, p = r.pendingProps, p = r.elementType === f ? p : oa(f, p), xu(n, r, f, p, l);
      case 7:
        return Vn(n, r, r.pendingProps, l), r.child;
      case 8:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (f = r.type._context, p = r.pendingProps, g = r.memoizedProps, E = p.value, qt(Ki, f._currentValue), f._currentValue = E, g !== null) if (Fa(g.value, E)) {
            if (g.children === p.children && !Ln.current) {
              r = Bn(n, r, l);
              break e;
            }
          } else for (g = r.child, g !== null && (g.return = r); g !== null; ) {
            var M = g.dependencies;
            if (M !== null) {
              E = g.child;
              for (var U = M.firstContext; U !== null; ) {
                if (U.context === f) {
                  if (g.tag === 1) {
                    U = ia(-1, l & -l), U.tag = 2;
                    var J = g.updateQueue;
                    if (J !== null) {
                      J = J.shared;
                      var ye = J.pending;
                      ye === null ? U.next = U : (U.next = ye.next, ye.next = U), J.pending = U;
                    }
                  }
                  g.lanes |= l, U = g.alternate, U !== null && (U.lanes |= l), Sp(
                    g.return,
                    l,
                    r
                  ), M.lanes |= l;
                  break;
                }
                U = U.next;
              }
            } else if (g.tag === 10) E = g.type === r.type ? null : g.child;
            else if (g.tag === 18) {
              if (E = g.return, E === null) throw Error(c(341));
              E.lanes |= l, M = E.alternate, M !== null && (M.lanes |= l), Sp(E, l, r), E = g.sibling;
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
        return p = r.type, f = r.pendingProps.children, pu(r, l), p = Ia(p), f = f(p), r.flags |= 1, Vn(n, r, f, l), r.child;
      case 14:
        return f = r.type, p = oa(f, r.pendingProps), p = oa(f.type, p), Ao(n, r, f, p, l);
      case 15:
        return Cf(n, r, r.type, r.pendingProps, l);
      case 17:
        return f = r.type, p = r.pendingProps, p = r.elementType === f ? p : oa(f, p), Ws(n, r), r.tag = 1, wn(f) ? (n = !0, Wc(r)) : n = !1, pu(r, l), hm(r, f, p), wp(r, f, p, l), Ef(null, r, f, !0, n, l);
      case 19:
        return Op(n, r, l);
      case 22:
        return ua(n, r, l);
    }
    throw Error(c(156, r.tag));
  };
  function Um(n, r) {
    return yn(n, r);
  }
  function Fm(n, r, l, f) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Ka(n, r, l, f) {
    return new Fm(n, r, l, f);
  }
  function $p(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function B0(n) {
    if (typeof n == "function") return $p(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === ve) return 11;
      if (n === lt) return 14;
    }
    return 2;
  }
  function zo(n, r) {
    var l = n.alternate;
    return l === null ? (l = Ka(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Pf(n, r, l, f, p, g) {
    var E = 2;
    if (f = n, typeof n == "function") $p(n) && (E = 1);
    else if (typeof n == "string") E = 5;
    else e: switch (n) {
      case fe:
        return Nl(l.children, p, g, r);
      case et:
        E = 8, p |= 8;
        break;
      case _:
        return n = Ka(12, l, r, p | 2), n.elementType = _, n.lanes = g, n;
      case pe:
        return n = Ka(13, l, r, p), n.elementType = pe, n.lanes = g, n;
      case Re:
        return n = Ka(19, l, r, p), n.elementType = Re, n.lanes = g, n;
      case Et:
        return jf(l, p, g, r);
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
            E = 16, f = null;
            break e;
        }
        throw Error(c(130, n == null ? n : typeof n, ""));
    }
    return r = Ka(E, l, r, p), r.elementType = n, r.type = f, r.lanes = g, r;
  }
  function Nl(n, r, l, f) {
    return n = Ka(7, n, f, r), n.lanes = l, n;
  }
  function jf(n, r, l, f) {
    return n = Ka(22, n, f, r), n.elementType = Et, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function $f(n, r, l) {
    return n = Ka(6, n, null, r), n.lanes = l, n;
  }
  function Zs(n, r, l) {
    return r = Ka(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Js(n, r, l, f, p) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Fd(0), this.expirationTimes = Fd(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Fd(0), this.identifierPrefix = f, this.onRecoverableError = p, this.mutableSourceEagerHydrationData = null;
  }
  function Vp(n, r, l, f, p, g, E, M, U) {
    return n = new Js(n, r, l, M, U), r === 1 ? (r = 1, g === !0 && (r |= 8)) : r = 0, g = Ka(3, null, null, r), n.current = g, g.stateNode = n, g.memoizedState = { element: f, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Jc(g), n;
  }
  function Pm(n, r, l) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: be, key: f == null ? null : "" + f, children: n, containerInfo: r, implementation: l };
  }
  function Bp(n) {
    if (!n) return xi;
    n = n._reactInternals;
    e: {
      if (it(n) !== n || n.tag !== 1) throw Error(c(170));
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
      throw Error(c(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (wn(l)) return Ns(n, l, r);
    }
    return r;
  }
  function Hp(n, r, l, f, p, g, E, M, U) {
    return n = Vp(l, f, !0, n, p, g, E, M, U), n.context = Bp(null), l = n.current, f = hr(), p = to(l), g = ia(f, p), g.callback = r ?? null, Oo(l, g, p), n.current.lanes = p, ul(n, p, f), nr(n, f), n;
  }
  function Vf(n, r, l, f) {
    var p = r.current, g = hr(), E = to(p);
    return l = Bp(l), r.context === null ? r.context = l : r.pendingContext = l, r = ia(g, E), r.payload = { element: n }, f = f === void 0 ? null : f, f !== null && (r.callback = f), n = Oo(p, r, E), n !== null && (Dn(n, p, E, g), ef(n, p, E)), E;
  }
  function ec(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function jm(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Ip(n, r) {
    jm(n, r), (n = n.alternate) && jm(n, r);
  }
  function H0() {
    return null;
  }
  var Yp = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Bf(n) {
    this._internalRoot = n;
  }
  tc.prototype.render = Bf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(c(409));
    Vf(n, r, null, null);
  }, tc.prototype.unmount = Bf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Oi(function() {
        Vf(null, n, null, null);
      }), r[Qi] = null;
    }
  };
  function tc(n) {
    this._internalRoot = n;
  }
  tc.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = bh();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < nn.length && r !== 0 && r < nn[l].priority; l++) ;
      nn.splice(l, 0, n), l === 0 && Ch(n);
    }
  };
  function Uo(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Hf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function $m() {
  }
  function I0(n, r, l, f, p) {
    if (p) {
      if (typeof f == "function") {
        var g = f;
        f = function() {
          var J = ec(E);
          g.call(J);
        };
      }
      var E = Hp(r, f, n, 0, null, !1, !1, "", $m);
      return n._reactRootContainer = E, n[Qi] = E.current, su(n.nodeType === 8 ? n.parentNode : n), Oi(), E;
    }
    for (; p = n.lastChild; ) n.removeChild(p);
    if (typeof f == "function") {
      var M = f;
      f = function() {
        var J = ec(U);
        M.call(J);
      };
    }
    var U = Vp(n, 0, !1, null, null, !1, !1, "", $m);
    return n._reactRootContainer = U, n[Qi] = U.current, su(n.nodeType === 8 ? n.parentNode : n), Oi(function() {
      Vf(r, U, l, f);
    }), U;
  }
  function If(n, r, l, f, p) {
    var g = l._reactRootContainer;
    if (g) {
      var E = g;
      if (typeof p == "function") {
        var M = p;
        p = function() {
          var U = ec(E);
          M.call(U);
        };
      }
      Vf(r, E, n, p);
    } else E = I0(l, r, n, p, f);
    return ec(E);
  }
  Sh = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = ll(r.pendingLanes);
          l !== 0 && (ds(r, l | 1), nr(r, Qt()), !(Lt & 6) && (Uu = Qt() + 500, ta()));
        }
        break;
      case 13:
        Oi(function() {
          var f = Xi(n, 1);
          if (f !== null) {
            var p = hr();
            Dn(f, n, 1, p);
          }
        }), Ip(n, 1);
    }
  }, kc = function(n) {
    if (n.tag === 13) {
      var r = Xi(n, 134217728);
      if (r !== null) {
        var l = hr();
        Dn(r, n, 134217728, l);
      }
      Ip(n, 134217728);
    }
  }, Jt = function(n) {
    if (n.tag === 13) {
      var r = to(n), l = Xi(n, r);
      if (l !== null) {
        var f = hr();
        Dn(l, n, r, f);
      }
      Ip(n, r);
    }
  }, bh = function() {
    return Zt;
  }, jd = function(n, r) {
    var l = Zt;
    try {
      return Zt = n, r();
    } finally {
      Zt = l;
    }
  }, ma = function(n, r, l) {
    switch (r) {
      case "input":
        if (Nn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var f = l[r];
            if (f !== n && f.form === n.form) {
              var p = st(f);
              if (!p) throw Error(c(90));
              we(f), Nn(f, p);
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
  }, cs = Pp, xc = Oi;
  var Y0 = { usingClientEntryPoint: !1, Events: [As, cu, st, rl, Kl, Pp] }, nc = { findFiberByHostInstance: Pa, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Vm = { bundleType: nc.bundleType, version: nc.version, rendererPackageName: nc.rendererPackageName, rendererConfig: nc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: le.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Mt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: nc.findFiberByHostInstance || H0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Yf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Yf.isDisabled && Yf.supportsFiber) try {
      fs = Yf.inject(Vm), li = Yf;
    } catch {
    }
  }
  return ni.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Y0, ni.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!Uo(r)) throw Error(c(200));
    return Pm(n, r, null, l);
  }, ni.createRoot = function(n, r) {
    if (!Uo(n)) throw Error(c(299));
    var l = !1, f = "", p = Yp;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (f = r.identifierPrefix), r.onRecoverableError !== void 0 && (p = r.onRecoverableError)), r = Vp(n, 1, !1, null, null, l, !1, f, p), n[Qi] = r.current, su(n.nodeType === 8 ? n.parentNode : n), new Bf(r);
  }, ni.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(c(188)) : (n = Object.keys(n).join(","), Error(c(268, n)));
    return n = Mt(r), n = n === null ? null : n.stateNode, n;
  }, ni.flushSync = function(n) {
    return Oi(n);
  }, ni.hydrate = function(n, r, l) {
    if (!Hf(r)) throw Error(c(200));
    return If(null, n, r, !0, l);
  }, ni.hydrateRoot = function(n, r, l) {
    if (!Uo(n)) throw Error(c(405));
    var f = l != null && l.hydratedSources || null, p = !1, g = "", E = Yp;
    if (l != null && (l.unstable_strictMode === !0 && (p = !0), l.identifierPrefix !== void 0 && (g = l.identifierPrefix), l.onRecoverableError !== void 0 && (E = l.onRecoverableError)), r = Hp(r, null, n, 1, l ?? null, p, !1, g, E), n[Qi] = r.current, su(n), f) for (n = 0; n < f.length; n++) l = f[n], p = l._getVersion, p = p(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, p] : r.mutableSourceEagerHydrationData.push(
      l,
      p
    );
    return new tc(r);
  }, ni.render = function(n, r, l) {
    if (!Hf(r)) throw Error(c(200));
    return If(null, n, r, !1, l);
  }, ni.unmountComponentAtNode = function(n) {
    if (!Hf(n)) throw Error(c(40));
    return n._reactRootContainer ? (Oi(function() {
      If(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Qi] = null;
      });
    }), !0) : !1;
  }, ni.unstable_batchedUpdates = Pp, ni.unstable_renderSubtreeIntoContainer = function(n, r, l, f) {
    if (!Hf(l)) throw Error(c(200));
    if (n == null || n._reactInternals === void 0) throw Error(c(38));
    return If(n, r, l, !1, f);
  }, ni.version = "18.3.1-next-f1338f8080-20240426", ni;
}
var ri = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ww;
function DN() {
  return ww || (ww = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var i = xn, s = xR(), c = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, v = !1;
    function m(e) {
      v = e;
    }
    function S(e) {
      if (!v) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        T("warn", e, a);
      }
    }
    function y(e) {
      if (!v) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        T("error", e, a);
      }
    }
    function T(e, t, a) {
      {
        var o = c.ReactDebugCurrentFrame, u = o.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var d = a.map(function(h) {
          return String(h);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var w = 0, k = 1, A = 2, O = 3, z = 4, H = 5, I = 6, B = 7, F = 8, ce = 9, oe = 10, X = 11, le = 12, V = 13, be = 14, fe = 15, et = 16, _ = 17, se = 18, ke = 19, ve = 21, pe = 22, Re = 23, lt = 24, Qe = 25, Et = !0, ge = !1, ze = !1, Y = !1, de = !1, Ne = !0, Xe = !1, Pe = !0, yt = !0, Ie = !0, ut = !0, rt = /* @__PURE__ */ new Set(), pt = {}, gt = {};
    function Ut(e, t) {
      we(e, t), we(e + "Capture", t);
    }
    function we(e, t) {
      pt[e] && y("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), pt[e] = t;
      {
        var a = e.toLowerCase();
        gt[a] = e, e === "onDoubleClick" && (gt.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        rt.add(t[o]);
    }
    var Ft = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Le = Object.prototype.hasOwnProperty;
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
    function N(e, t) {
      if (mn(e))
        return y("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Xt(e)), Nn(e);
    }
    function G(e) {
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
    var Ve = 0, Tt = 1, Bt = 2, Dt = 3, jn = 4, bi = 5, Pr = 6, Oe = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", at = Oe + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ot = new RegExp("^[" + Oe + "][" + at + "]*$"), Wt = {}, dn = {};
    function ur(e) {
      return Le.call(dn, e) ? !0 : Le.call(Wt, e) ? !1 : Ot.test(e) ? (dn[e] = !0, !0) : (Wt[e] = !0, y("Invalid attribute name: `%s`", e), !1);
    }
    function $n(e, t, a) {
      return t !== null ? t.type === Ve : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Xr(e, t, a, o) {
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
      if (t === null || typeof t > "u" || Xr(e, t, a, o))
        return !0;
      if (o)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Dt:
            return !t;
          case jn:
            return t === !1;
          case bi:
            return isNaN(t);
          case Pr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function ma(e) {
      return vn.hasOwnProperty(e) ? vn[e] : null;
    }
    function cn(e, t, a, o, u, d, h) {
      this.acceptsBooleans = t === Bt || t === Dt || t === jn, this.attributeName = o, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = h;
    }
    var vn = {}, ql = [
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
    ql.forEach(function(e) {
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
        Tt,
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
        Dt,
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
        Dt,
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
        Pr,
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
        bi,
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
    var rl = /[\-\:]([a-z])/g, Kl = function(e) {
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
      var t = e.replace(rl, Kl);
      vn[t] = new cn(
        t,
        Tt,
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
      var t = e.replace(rl, Kl);
      vn[t] = new cn(
        t,
        Tt,
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
      var t = e.replace(rl, Kl);
      vn[t] = new cn(
        t,
        Tt,
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
        Tt,
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
    var cs = "xlinkHref";
    vn[cs] = new cn(
      "xlinkHref",
      Tt,
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
        Tt,
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
    var xc = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, al = !1;
    function Xl(e) {
      !al && xc.test(e) && (al = !0, y("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function il(e, t, a, o) {
      if (o.mustUseProperty) {
        var u = o.propertyName;
        return e[u];
      } else {
        N(a, t), o.sanitizeURL && Xl("" + a);
        var d = o.attributeName, h = null;
        if (o.type === jn) {
          if (e.hasAttribute(d)) {
            var b = e.getAttribute(d);
            return b === "" ? !0 : pn(t, a, o, !1) ? b : b === "" + a ? a : b;
          }
        } else if (e.hasAttribute(d)) {
          if (pn(t, a, o, !1))
            return e.getAttribute(d);
          if (o.type === Dt)
            return a;
          h = e.getAttribute(d);
        }
        return pn(t, a, o, !1) ? h === null ? a : h : h === "" + a ? a : h;
      }
    }
    function Zl(e, t, a, o) {
      {
        if (!ur(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return N(a, t), u === "" + a ? a : u;
      }
    }
    function Ci(e, t, a, o) {
      var u = ma(t);
      if (!$n(t, u, o)) {
        if (pn(t, a, u, o) && (a = null), o || u === null) {
          if (ur(t)) {
            var d = t;
            a === null ? e.removeAttribute(d) : (N(a, t), e.setAttribute(d, "" + a));
          }
          return;
        }
        var h = u.mustUseProperty;
        if (h) {
          var b = u.propertyName;
          if (a === null) {
            var C = u.type;
            e[b] = C === Dt ? !1 : "";
          } else
            e[b] = a;
          return;
        }
        var x = u.attributeName, R = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(x);
        else {
          var $ = u.type, P;
          $ === Dt || $ === jn && a === !0 ? P = "" : (N(a, x), P = "" + a, u.sanitizeURL && Xl(P.toString())), R ? e.setAttributeNS(R, x, P) : e.setAttribute(x, P);
        }
      }
    }
    var Vi = Symbol.for("react.element"), ya = Symbol.for("react.portal"), oi = Symbol.for("react.fragment"), yo = Symbol.for("react.strict_mode"), ol = Symbol.for("react.profiler"), L = Symbol.for("react.provider"), Se = Symbol.for("react.context"), De = Symbol.for("react.forward_ref"), it = Symbol.for("react.suspense"), Pt = Symbol.for("react.suspense_list"), Vt = Symbol.for("react.memo"), mt = Symbol.for("react.lazy"), Mt = Symbol.for("react.scope"), sr = Symbol.for("react.debug_trace_mode"), yn = Symbol.for("react.offscreen"), kn = Symbol.for("react.legacy_hidden"), Zr = Symbol.for("react.cache"), go = Symbol.for("react.tracing_marker"), Qt = Symbol.iterator, Mr = "@@iterator";
    function ga(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Qt && e[Qt] || e[Mr];
      return typeof t == "function" ? t : null;
    }
    var At = Object.assign, Ei = 0, hh, Ld, fs, li, mh, La, yh;
    function gh() {
    }
    gh.__reactDisabledLog = !0;
    function s0() {
      {
        if (Ei === 0) {
          hh = console.log, Ld = console.info, fs = console.warn, li = console.error, mh = console.group, La = console.groupCollapsed, yh = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: gh,
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
        Ei++;
      }
    }
    function wc() {
      {
        if (Ei--, Ei === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: At({}, e, {
              value: hh
            }),
            info: At({}, e, {
              value: Ld
            }),
            warn: At({}, e, {
              value: fs
            }),
            error: At({}, e, {
              value: li
            }),
            group: At({}, e, {
              value: mh
            }),
            groupCollapsed: At({}, e, {
              value: La
            }),
            groupEnd: At({}, e, {
              value: yh
            })
          });
        }
        Ei < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Jl = c.ReactCurrentDispatcher, ll;
    function ui(e, t, a) {
      {
        if (ll === void 0)
          try {
            throw Error();
          } catch (u) {
            var o = u.stack.trim().match(/\n( *(at )?)/);
            ll = o && o[1] || "";
          }
        return `
` + ll + e;
      }
    }
    var zd = !1, Rc;
    {
      var Ud = typeof WeakMap == "function" ? WeakMap : Map;
      Rc = new Ud();
    }
    function _c(e, t) {
      if (!e || zd)
        return "";
      {
        var a = Rc.get(e);
        if (a !== void 0)
          return a;
      }
      var o;
      zd = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = Jl.current, Jl.current = null, s0();
      try {
        if (t) {
          var h = function() {
            throw Error();
          };
          if (Object.defineProperty(h.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(h, []);
            } catch (ee) {
              o = ee;
            }
            Reflect.construct(e, [], h);
          } else {
            try {
              h.call();
            } catch (ee) {
              o = ee;
            }
            e.call(h.prototype);
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
`), x = b.length - 1, R = C.length - 1; x >= 1 && R >= 0 && b[x] !== C[R]; )
            R--;
          for (; x >= 1 && R >= 0; x--, R--)
            if (b[x] !== C[R]) {
              if (x !== 1 || R !== 1)
                do
                  if (x--, R--, R < 0 || b[x] !== C[R]) {
                    var $ = `
` + b[x].replace(" at new ", " at ");
                    return e.displayName && $.includes("<anonymous>") && ($ = $.replace("<anonymous>", e.displayName)), typeof e == "function" && Rc.set(e, $), $;
                  }
                while (x >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        zd = !1, Jl.current = d, wc(), Error.prepareStackTrace = u;
      }
      var P = e ? e.displayName || e.name : "", Z = P ? ui(P) : "";
      return typeof e == "function" && Rc.set(e, Z), Z;
    }
    function Fd(e, t, a) {
      return _c(e, !0);
    }
    function ul(e, t, a) {
      return _c(e, !1);
    }
    function c0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ds(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return _c(e, c0(e));
      if (typeof e == "string")
        return ui(e);
      switch (e) {
        case it:
          return ui("Suspense");
        case Pt:
          return ui("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case De:
            return ul(e.render);
          case Vt:
            return ds(e.type, t, a);
          case mt: {
            var o = e, u = o._payload, d = o._init;
            try {
              return ds(d(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Zt(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case H:
          return ui(e.type);
        case et:
          return ui("Lazy");
        case V:
          return ui("Suspense");
        case ke:
          return ui("SuspenseList");
        case w:
        case A:
        case fe:
          return ul(e.type);
        case X:
          return ul(e.type.render);
        case k:
          return Fd(e.type);
        default:
          return "";
      }
    }
    function Pd(e) {
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
    function Sh(e, t, a) {
      var o = e.displayName;
      if (o)
        return o;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function kc(e) {
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
        case oi:
          return "Fragment";
        case ya:
          return "Portal";
        case ol:
          return "Profiler";
        case yo:
          return "StrictMode";
        case it:
          return "Suspense";
        case Pt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Se:
            var t = e;
            return kc(t) + ".Consumer";
          case L:
            var a = e;
            return kc(a._context) + ".Provider";
          case De:
            return Sh(e, e.render, "ForwardRef");
          case Vt:
            var o = e.displayName || null;
            return o !== null ? o : Jt(e.type) || "Memo";
          case mt: {
            var u = e, d = u._payload, h = u._init;
            try {
              return Jt(h(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function bh(e, t, a) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? a + "(" + o + ")" : a);
    }
    function jd(e) {
      return e.displayName || "Context";
    }
    function Rt(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case lt:
          return "Cache";
        case ce:
          var o = a;
          return jd(o) + ".Consumer";
        case oe:
          var u = a;
          return jd(u._context) + ".Provider";
        case se:
          return "DehydratedFragment";
        case X:
          return bh(a, a.render, "ForwardRef");
        case B:
          return "Fragment";
        case H:
          return a;
        case z:
          return "Portal";
        case O:
          return "Root";
        case I:
          return "Text";
        case et:
          return Jt(a);
        case F:
          return a === yo ? "StrictMode" : "Mode";
        case pe:
          return "Offscreen";
        case le:
          return "Profiler";
        case ve:
          return "Scope";
        case V:
          return "Suspense";
        case ke:
          return "SuspenseList";
        case Qe:
          return "TracingMarker";
        case k:
        case w:
        case _:
        case A:
        case be:
        case fe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ps = c.ReactDebugCurrentFrame, Yn = null, za = !1;
    function Ua() {
      {
        if (Yn === null)
          return null;
        var e = Yn._debugOwner;
        if (e !== null && typeof e < "u")
          return Rt(e);
      }
      return null;
    }
    function vs() {
      return Yn === null ? "" : Pd(Yn);
    }
    function Zn() {
      ps.getCurrentStack = null, Yn = null, za = !1;
    }
    function nn(e) {
      ps.getCurrentStack = e === null ? null : vs, Yn = e, za = !1;
    }
    function f0() {
      return Yn;
    }
    function si(e) {
      za = e;
    }
    function Ar(e) {
      return "" + e;
    }
    function So(e) {
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
    var Ch = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function eu(e, t) {
      Ch[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || y("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || y("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function $d(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Eh(e) {
      return e._valueTracker;
    }
    function hs(e) {
      e._valueTracker = null;
    }
    function ms(e) {
      var t = "";
      return e && ($d(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function tu(e) {
      var t = $d(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
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
        var h = {
          getValue: function() {
            return o;
          },
          setValue: function(b) {
            te(b), o = "" + b;
          },
          stopTracking: function() {
            hs(e), delete e[t];
          }
        };
        return h;
      }
    }
    function sl(e) {
      Eh(e) || (e._valueTracker = tu(e));
    }
    function Th(e) {
      if (!e)
        return !1;
      var t = Eh(e);
      if (!t)
        return !0;
      var a = t.getValue(), o = ms(e);
      return o !== a ? (t.setValue(o), !0) : !1;
    }
    function Oc(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Dc = !1, ys = !1, Mc = !1, Vd = !1;
    function Bi(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function gs(e, t) {
      var a = e, o = t.checked, u = At({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Ss(e, t) {
      eu("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ys && (y("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ua() || "A component", t.type), ys = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Dc && (y("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ua() || "A component", t.type), Dc = !0);
      var a = e, o = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: So(t.value != null ? t.value : o),
        controlled: Bi(t)
      };
    }
    function Bd(e, t) {
      var a = e, o = t.checked;
      o != null && Ci(a, "checked", o, !1);
    }
    function nu(e, t) {
      var a = e;
      {
        var o = Bi(t);
        !a._wrapperState.controlled && o && !Vd && (y("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Vd = !0), a._wrapperState.controlled && !o && !Mc && (y("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Mc = !0);
      }
      Bd(e, t);
      var u = So(t.value), d = t.type;
      if (u != null)
        d === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Ar(u)) : a.value !== Ar(u) && (a.value = Ar(u));
      else if (d === "submit" || d === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? bo(a, t.type, u) : t.hasOwnProperty("defaultValue") && bo(a, t.type, So(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function bs(e, t, a) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, d = u === "submit" || u === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var h = Ar(o._wrapperState.initialValue);
        a || h !== o.value && (o.value = h), o.defaultValue = h;
      }
      var b = o.name;
      b !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, b !== "" && (o.name = b);
    }
    function xh(e, t) {
      var a = e;
      nu(a, t), Sa(a, t);
    }
    function Sa(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        N(a, "name");
        for (var u = o.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), d = 0; d < u.length; d++) {
          var h = u[d];
          if (!(h === e || h.form !== e.form)) {
            var b = ay(h);
            if (!b)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            Th(h), nu(h, b);
          }
        }
      }
    }
    function bo(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Oc(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Ar(e._wrapperState.initialValue) : e.defaultValue !== Ar(a) && (e.defaultValue = Ar(a)));
    }
    var Ac = !1, ru = !1, wh = !1;
    function Nc(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? i.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || ru || (ru = !0, y("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (wh || (wh = !0, y("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ac && (y("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ac = !0);
    }
    function Hd(e, t) {
      t.value != null && e.setAttribute("value", Ar(So(t.value)));
    }
    var Cs = Array.isArray;
    function cr(e) {
      return Cs(e);
    }
    var Lc;
    Lc = !1;
    function Rh() {
      var e = Ua();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var _h = ["value", "defaultValue"];
    function d0(e) {
      {
        eu("select", e);
        for (var t = 0; t < _h.length; t++) {
          var a = _h[t];
          if (e[a] != null) {
            var o = cr(e[a]);
            e.multiple && !o ? y("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Rh()) : !e.multiple && o && y("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Rh());
          }
        }
      }
    }
    function Co(e, t, a, o) {
      var u = e.options;
      if (t) {
        for (var d = a, h = {}, b = 0; b < d.length; b++)
          h["$" + d[b]] = !0;
        for (var C = 0; C < u.length; C++) {
          var x = h.hasOwnProperty("$" + u[C].value);
          u[C].selected !== x && (u[C].selected = x), x && o && (u[C].defaultSelected = !0);
        }
      } else {
        for (var R = Ar(So(a)), $ = null, P = 0; P < u.length; P++) {
          if (u[P].value === R) {
            u[P].selected = !0, o && (u[P].defaultSelected = !0);
            return;
          }
          $ === null && !u[P].disabled && ($ = u[P]);
        }
        $ !== null && ($.selected = !0);
      }
    }
    function Id(e, t) {
      return At({}, t, {
        value: void 0
      });
    }
    function kh(e, t) {
      var a = e;
      d0(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Lc && (y("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Lc = !0);
    }
    function p0(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var o = t.value;
      o != null ? Co(a, !!t.multiple, o, !1) : t.defaultValue != null && Co(a, !!t.multiple, t.defaultValue, !0);
    }
    function v0(e, t) {
      var a = e, o = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Co(a, !!t.multiple, u, !1) : o !== !!t.multiple && (t.defaultValue != null ? Co(a, !!t.multiple, t.defaultValue, !0) : Co(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function h0(e, t) {
      var a = e, o = t.value;
      o != null && Co(a, !!t.multiple, o, !1);
    }
    var Yd = !1;
    function Wd(e, t) {
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
    function Oh(e, t) {
      var a = e;
      eu("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Yd && (y("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ua() || "A component"), Yd = !0);
      var o = t.value;
      if (o == null) {
        var u = t.children, d = t.defaultValue;
        if (u != null) {
          y("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (cr(u)) {
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
        initialValue: So(o)
      };
    }
    function Dh(e, t) {
      var a = e, o = So(t.value), u = So(t.defaultValue);
      if (o != null) {
        var d = Ar(o);
        d !== a.value && (a.value = d), t.defaultValue == null && a.defaultValue !== d && (a.defaultValue = d);
      }
      u != null && (a.defaultValue = Ar(u));
    }
    function Mh(e, t) {
      var a = e, o = a.textContent;
      o === a._wrapperState.initialValue && o !== "" && o !== null && (a.value = o);
    }
    function Gd(e, t) {
      Dh(e, t);
    }
    var Hi = "http://www.w3.org/1999/xhtml", m0 = "http://www.w3.org/1998/Math/MathML", Qd = "http://www.w3.org/2000/svg";
    function zc(e) {
      switch (e) {
        case "svg":
          return Qd;
        case "math":
          return m0;
        default:
          return Hi;
      }
    }
    function qd(e, t) {
      return e == null || e === Hi ? zc(t) : e === Qd && t === "foreignObject" ? Hi : e;
    }
    var y0 = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, o, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, o, u);
        });
      } : e;
    }, Uc, Ah = y0(function(e, t) {
      if (e.namespaceURI === Qd && !("innerHTML" in e)) {
        Uc = Uc || document.createElement("div"), Uc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Uc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Jr = 1, Ii = 3, Wn = 8, ci = 9, cl = 11, Fc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Ii) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Nh = {
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
    }, au = {
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
    function Lh(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var zh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(au).forEach(function(e) {
      zh.forEach(function(t) {
        au[Lh(t, e)] = au[e];
      });
    });
    function Pc(e, t, a) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !a && typeof t == "number" && t !== 0 && !(au.hasOwnProperty(e) && au[e]) ? t + "px" : (_e(t, e), ("" + t).trim());
    }
    var iu = /([A-Z])/g, g0 = /^ms-/;
    function S0(e) {
      return e.replace(iu, "-$1").toLowerCase().replace(g0, "-ms-");
    }
    var Uh = function() {
    };
    {
      var Fh = /^(?:webkit|moz|o)[A-Z]/, Ph = /^-ms-/, Es = /-(.)/g, ou = /;\s*$/, lu = {}, uu = {}, jh = !1, Kd = !1, Xd = function(e) {
        return e.replace(Es, function(t, a) {
          return a.toUpperCase();
        });
      }, Zd = function(e) {
        lu.hasOwnProperty(e) && lu[e] || (lu[e] = !0, y(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Xd(e.replace(Ph, "ms-"))
        ));
      }, $h = function(e) {
        lu.hasOwnProperty(e) && lu[e] || (lu[e] = !0, y("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Vh = function(e, t) {
        uu.hasOwnProperty(t) && uu[t] || (uu[t] = !0, y(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(ou, "")));
      }, Bh = function(e, t) {
        jh || (jh = !0, y("`NaN` is an invalid value for the `%s` css style property.", e));
      }, b0 = function(e, t) {
        Kd || (Kd = !0, y("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Uh = function(e, t) {
        e.indexOf("-") > -1 ? Zd(e) : Fh.test(e) ? $h(e) : ou.test(t) && Vh(e, t), typeof t == "number" && (isNaN(t) ? Bh(e, t) : isFinite(t) || b0(e, t));
      };
    }
    var C0 = Uh;
    function E0(e) {
      {
        var t = "", a = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var u = e[o];
            if (u != null) {
              var d = o.indexOf("--") === 0;
              t += a + (d ? o : S0(o)) + ":", t += Pc(o, u, d), a = ";";
            }
          }
        return t || null;
      }
    }
    function Hh(e, t) {
      var a = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var u = o.indexOf("--") === 0;
          u || C0(o, t[o]);
          var d = Pc(o, t[o], u);
          o === "float" && (o = "cssFloat"), u ? a.setProperty(o, d) : a[o] = d;
        }
    }
    function T0(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Fa(e) {
      var t = {};
      for (var a in e)
        for (var o = Nh[a] || [a], u = 0; u < o.length; u++)
          t[o[u]] = a;
      return t;
    }
    function Ts(e, t) {
      {
        if (!t)
          return;
        var a = Fa(e), o = Fa(t), u = {};
        for (var d in a) {
          var h = a[d], b = o[d];
          if (b && h !== b) {
            var C = h + "," + b;
            if (u[C])
              continue;
            u[C] = !0, y("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", T0(e[h]) ? "Removing" : "Updating", h, b);
          }
        }
      }
    }
    var Ih = {
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
    }, Yh = At({
      menuitem: !0
    }, Ih), Wh = "__html";
    function jc(e, t) {
      if (t) {
        if (Yh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Wh in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && y("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Yi(e, t) {
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
    var $c = {
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
    }, Gh = {
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
    }, fi = {}, Jd = new RegExp("^(aria)-[" + at + "]*$"), xs = new RegExp("^(aria)[A-Z][" + at + "]*$");
    function ep(e, t) {
      {
        if (Le.call(fi, t) && fi[t])
          return !0;
        if (xs.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), o = Gh.hasOwnProperty(a) ? a : null;
          if (o == null)
            return y("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), fi[t] = !0, !0;
          if (t !== o)
            return y("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), fi[t] = !0, !0;
        }
        if (Jd.test(t)) {
          var u = t.toLowerCase(), d = Gh.hasOwnProperty(u) ? u : null;
          if (d == null)
            return fi[t] = !0, !1;
          if (t !== d)
            return y("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), fi[t] = !0, !0;
        }
      }
      return !0;
    }
    function Qh(e, t) {
      {
        var a = [];
        for (var o in t) {
          var u = ep(e, o);
          u || a.push(o);
        }
        var d = a.map(function(h) {
          return "`" + h + "`";
        }).join(", ");
        a.length === 1 ? y("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : a.length > 1 && y("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function Vc(e, t) {
      Yi(e, t) || Qh(e, t);
    }
    var fl = !1;
    function tp(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !fl && (fl = !0, e === "select" && t.multiple ? y("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : y("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var np = function() {
    };
    {
      var fr = {}, rp = /^on./, qh = /^on[^A-Z]/, Kh = new RegExp("^(aria)-[" + at + "]*$"), Xh = new RegExp("^(aria)[A-Z][" + at + "]*$");
      np = function(e, t, a, o) {
        if (Le.call(fr, t) && fr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return y("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), fr[t] = !0, !0;
        if (o != null) {
          var d = o.registrationNameDependencies, h = o.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var b = h.hasOwnProperty(u) ? h[u] : null;
          if (b != null)
            return y("Invalid event handler property `%s`. Did you mean `%s`?", t, b), fr[t] = !0, !0;
          if (rp.test(t))
            return y("Unknown event handler property `%s`. It will be ignored.", t), fr[t] = !0, !0;
        } else if (rp.test(t))
          return qh.test(t) && y("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), fr[t] = !0, !0;
        if (Kh.test(t) || Xh.test(t))
          return !0;
        if (u === "innerhtml")
          return y("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), fr[t] = !0, !0;
        if (u === "aria")
          return y("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), fr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return y("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), fr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return y("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), fr[t] = !0, !0;
        var C = ma(t), x = C !== null && C.type === Ve;
        if ($c.hasOwnProperty(u)) {
          var R = $c[u];
          if (R !== t)
            return y("Invalid DOM property `%s`. Did you mean `%s`?", t, R), fr[t] = !0, !0;
        } else if (!x && t !== u)
          return y("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), fr[t] = !0, !0;
        return typeof a == "boolean" && Xr(t, a, C, !1) ? (a ? y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), fr[t] = !0, !0) : x ? !0 : Xr(t, a, C, !1) ? (fr[t] = !0, !1) : ((a === "false" || a === "true") && C !== null && C.type === Dt && (y("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), fr[t] = !0), !0);
      };
    }
    var Zh = function(e, t, a) {
      {
        var o = [];
        for (var u in t) {
          var d = np(e, u, t[u], a);
          d || o.push(u);
        }
        var h = o.map(function(b) {
          return "`" + b + "`";
        }).join(", ");
        o.length === 1 ? y("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e) : o.length > 1 && y("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", h, e);
      }
    };
    function Jh(e, t, a) {
      Yi(e, t) || Zh(e, t, a);
    }
    var Wi = 1, ws = 2, dl = 4, x0 = Wi | ws | dl, Rs = null;
    function _s(e) {
      Rs !== null && y("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Rs = e;
    }
    function w0() {
      Rs === null && y("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Rs = null;
    }
    function em(e) {
      return e === Rs;
    }
    function Bc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Ii ? t.parentNode : t;
    }
    var fn = null, Eo = null, Gi = null;
    function su(e) {
      var t = Bu(e);
      if (t) {
        if (typeof fn != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var o = ay(a);
          fn(t.stateNode, t.type, o);
        }
      }
    }
    function tm(e) {
      fn = e;
    }
    function Hc(e) {
      Eo ? Gi ? Gi.push(e) : Gi = [e] : Eo = e;
    }
    function ks() {
      return Eo !== null || Gi !== null;
    }
    function Os() {
      if (Eo) {
        var e = Eo, t = Gi;
        if (Eo = null, Gi = null, su(e), t)
          for (var a = 0; a < t.length; a++)
            su(t[a]);
      }
    }
    var pl = function(e, t) {
      return e(t);
    }, ap = function() {
    }, ip = !1;
    function R0() {
      var e = ks();
      e && (ap(), Os());
    }
    function op(e, t, a) {
      if (ip)
        return e(t, a);
      ip = !0;
      try {
        return pl(e, t, a);
      } finally {
        ip = !1, R0();
      }
    }
    function Ic(e, t, a) {
      pl = e, ap = a;
    }
    function Yc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function lp(e, t, a) {
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
          return !!(a.disabled && Yc(t));
        default:
          return !1;
      }
    }
    function vl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var o = ay(a);
      if (o === null)
        return null;
      var u = o[t];
      if (lp(t, e.type, o))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var Ds = !1;
    if (Ft)
      try {
        var hl = {};
        Object.defineProperty(hl, "passive", {
          get: function() {
            Ds = !0;
          }
        }), window.addEventListener("test", hl, hl), window.removeEventListener("test", hl, hl);
      } catch {
        Ds = !1;
      }
    function nm(e, t, a, o, u, d, h, b, C) {
      var x = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, x);
      } catch (R) {
        this.onError(R);
      }
    }
    var up = nm;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var sp = document.createElement("react");
      up = function(t, a, o, u, d, h, b, C, x) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var R = document.createEvent("Event"), $ = !1, P = !0, Z = window.event, ee = Object.getOwnPropertyDescriptor(window, "event");
        function re() {
          sp.removeEventListener(ae, ft, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = Z);
        }
        var Ue = Array.prototype.slice.call(arguments, 3);
        function ft() {
          $ = !0, re(), a.apply(o, Ue), P = !1;
        }
        var nt, $t = !1, zt = !1;
        function Q(q) {
          if (nt = q.error, $t = !0, nt === null && q.colno === 0 && q.lineno === 0 && (zt = !0), q.defaultPrevented && nt != null && typeof nt == "object")
            try {
              nt._suppressLogging = !0;
            } catch {
            }
        }
        var ae = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", Q), sp.addEventListener(ae, ft, !1), R.initEvent(ae, !1, !1), sp.dispatchEvent(R), ee && Object.defineProperty(window, "event", ee), $ && P && ($t ? zt && (nt = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : nt = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(nt)), window.removeEventListener("error", Q), !$)
          return re(), nm.apply(this, arguments);
      };
    }
    var _0 = up, To = !1, di = null, Ms = !1, xo = null, Ti = {
      onError: function(e) {
        To = !0, di = e;
      }
    };
    function ml(e, t, a, o, u, d, h, b, C) {
      To = !1, di = null, _0.apply(Ti, arguments);
    }
    function Qi(e, t, a, o, u, d, h, b, C) {
      if (ml.apply(this, arguments), To) {
        var x = fp();
        Ms || (Ms = !0, xo = x);
      }
    }
    function cp() {
      if (Ms) {
        var e = xo;
        throw Ms = !1, xo = null, e;
      }
    }
    function k0() {
      return To;
    }
    function fp() {
      if (To) {
        var e = di;
        return To = !1, di = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Pa(e) {
      return e._reactInternals;
    }
    function As(e) {
      return e._reactInternals !== void 0;
    }
    function cu(e, t) {
      e._reactInternals = t;
    }
    var st = (
      /*                      */
      0
    ), wo = (
      /*                */
      1
    ), gn = (
      /*                    */
      2
    ), kt = (
      /*                       */
      4
    ), Gt = (
      /*                */
      16
    ), qt = (
      /*                 */
      32
    ), xi = (
      /*                     */
      64
    ), bt = (
      /*                   */
      128
    ), Ln = (
      /*            */
      256
    ), ea = (
      /*                          */
      512
    ), ja = (
      /*                     */
      1024
    ), wn = (
      /*                      */
      2048
    ), $a = (
      /*                    */
      4096
    ), Ro = (
      /*                   */
      8192
    ), Ns = (
      /*             */
      16384
    ), Wc = wn | kt | xi | ea | ja | Ns, rm = (
      /*               */
      32767
    ), ba = (
      /*                   */
      32768
    ), dr = (
      /*                */
      65536
    ), Ls = (
      /* */
      131072
    ), dp = (
      /*                       */
      1048576
    ), pp = (
      /*                    */
      2097152
    ), ta = (
      /*                 */
      4194304
    ), _o = (
      /*                */
      8388608
    ), na = (
      /*               */
      16777216
    ), yl = (
      /*              */
      33554432
    ), fu = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      kt | ja | 0
    ), ra = gn | kt | Gt | qt | ea | $a | Ro, Nr = kt | xi | ea | Ro, Va = wn | Gt, Sr = ta | _o | pp, qi = c.ReactCurrentOwner;
    function Ca(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (gn | $a)) !== st && (a = t.return), o = t.return;
        while (o);
      }
      return t.tag === O ? a : null;
    }
    function vp(e) {
      if (e.tag === V) {
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
    function Gc(e) {
      return e.tag === O ? e.stateNode.containerInfo : null;
    }
    function hp(e) {
      return Ca(e) === e;
    }
    function Ea(e) {
      {
        var t = qi.current;
        if (t !== null && t.tag === k) {
          var a = t, o = a.stateNode;
          o._warnedAboutRefsInRender || y("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Rt(a) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var u = Pa(e);
      return u ? Ca(u) === u : !1;
    }
    function aa(e) {
      if (Ca(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Sn(e) {
      var t = e.alternate;
      if (!t) {
        var a = Ca(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var o = e, u = t; ; ) {
        var d = o.return;
        if (d === null)
          break;
        var h = d.alternate;
        if (h === null) {
          var b = d.return;
          if (b !== null) {
            o = u = b;
            continue;
          }
          break;
        }
        if (d.child === h.child) {
          for (var C = d.child; C; ) {
            if (C === o)
              return aa(d), e;
            if (C === u)
              return aa(d), t;
            C = C.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (o.return !== u.return)
          o = d, u = h;
        else {
          for (var x = !1, R = d.child; R; ) {
            if (R === o) {
              x = !0, o = d, u = h;
              break;
            }
            if (R === u) {
              x = !0, u = d, o = h;
              break;
            }
            R = R.sibling;
          }
          if (!x) {
            for (R = h.child; R; ) {
              if (R === o) {
                x = !0, o = h, u = d;
                break;
              }
              if (R === u) {
                x = !0, u = h, o = d;
                break;
              }
              R = R.sibling;
            }
            if (!x)
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
    function Ba(e) {
      var t = Sn(e);
      return t !== null ? mp(t) : null;
    }
    function mp(e) {
      if (e.tag === H || e.tag === I)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = mp(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function am(e) {
      var t = Sn(e);
      return t !== null ? Qc(t) : null;
    }
    function Qc(e) {
      if (e.tag === H || e.tag === I)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== z) {
          var a = Qc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var qc = s.unstable_scheduleCallback, im = s.unstable_cancelCallback, Kc = s.unstable_shouldYield, om = s.unstable_requestPaint, On = s.unstable_now, yp = s.unstable_getCurrentPriorityLevel, Xc = s.unstable_ImmediatePriority, gl = s.unstable_UserBlockingPriority, wi = s.unstable_NormalPriority, lm = s.unstable_LowPriority, Zc = s.unstable_IdlePriority, du = s.unstable_yieldValue, um = s.unstable_setDisableYieldValue, Ki = null, Jn = null, Me = null, Ha = !1, Ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function gp(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return y("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        yt && (e = At({}, e, {
          getLaneLabelMap: Xi,
          injectProfilingHooks: sm
        })), Ki = t.inject(e), Jn = t;
      } catch (a) {
        y("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Sp(e, t) {
      if (Jn && typeof Jn.onScheduleFiberRoot == "function")
        try {
          Jn.onScheduleFiberRoot(Ki, e, t);
        } catch (a) {
          Ha || (Ha = !0, y("React instrumentation encountered an error: %s", a));
        }
    }
    function pu(e, t) {
      if (Jn && typeof Jn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & bt) === bt;
          if (Ie) {
            var o;
            switch (t) {
              case Bn:
                o = Xc;
                break;
              case Ji:
                o = gl;
                break;
              case Ri:
                o = wi;
                break;
              case wu:
                o = Zc;
                break;
              default:
                o = wi;
                break;
            }
            Jn.onCommitFiberRoot(Ki, e, o, a);
          }
        } catch (u) {
          Ha || (Ha = !0, y("React instrumentation encountered an error: %s", u));
        }
    }
    function Ia(e) {
      if (Jn && typeof Jn.onPostCommitFiberRoot == "function")
        try {
          Jn.onPostCommitFiberRoot(Ki, e);
        } catch (t) {
          Ha || (Ha = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function Sl(e) {
      if (Jn && typeof Jn.onCommitFiberUnmount == "function")
        try {
          Jn.onCommitFiberUnmount(Ki, e);
        } catch (t) {
          Ha || (Ha = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function Gn(e) {
      if (typeof du == "function" && (um(e), m(e)), Jn && typeof Jn.setStrictMode == "function")
        try {
          Jn.setStrictMode(Ki, e);
        } catch (t) {
          Ha || (Ha = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function sm(e) {
      Me = e;
    }
    function Xi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < js; a++) {
          var o = D0(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function ko(e) {
      Me !== null && typeof Me.markCommitStarted == "function" && Me.markCommitStarted(e);
    }
    function Jc() {
      Me !== null && typeof Me.markCommitStopped == "function" && Me.markCommitStopped();
    }
    function vu(e) {
      Me !== null && typeof Me.markComponentRenderStarted == "function" && Me.markComponentRenderStarted(e);
    }
    function ia() {
      Me !== null && typeof Me.markComponentRenderStopped == "function" && Me.markComponentRenderStopped();
    }
    function Oo(e) {
      Me !== null && typeof Me.markComponentPassiveEffectMountStarted == "function" && Me.markComponentPassiveEffectMountStarted(e);
    }
    function ef() {
      Me !== null && typeof Me.markComponentPassiveEffectMountStopped == "function" && Me.markComponentPassiveEffectMountStopped();
    }
    function cm(e) {
      Me !== null && typeof Me.markComponentPassiveEffectUnmountStarted == "function" && Me.markComponentPassiveEffectUnmountStarted(e);
    }
    function tf() {
      Me !== null && typeof Me.markComponentPassiveEffectUnmountStopped == "function" && Me.markComponentPassiveEffectUnmountStopped();
    }
    function fm(e) {
      Me !== null && typeof Me.markComponentLayoutEffectMountStarted == "function" && Me.markComponentLayoutEffectMountStarted(e);
    }
    function zs() {
      Me !== null && typeof Me.markComponentLayoutEffectMountStopped == "function" && Me.markComponentLayoutEffectMountStopped();
    }
    function pi(e) {
      Me !== null && typeof Me.markComponentLayoutEffectUnmountStarted == "function" && Me.markComponentLayoutEffectUnmountStarted(e);
    }
    function hu() {
      Me !== null && typeof Me.markComponentLayoutEffectUnmountStopped == "function" && Me.markComponentLayoutEffectUnmountStopped();
    }
    function Us(e, t, a) {
      Me !== null && typeof Me.markComponentErrored == "function" && Me.markComponentErrored(e, t, a);
    }
    function bl(e, t, a) {
      Me !== null && typeof Me.markComponentSuspended == "function" && Me.markComponentSuspended(e, t, a);
    }
    function bp(e) {
      Me !== null && typeof Me.markLayoutEffectsStarted == "function" && Me.markLayoutEffectsStarted(e);
    }
    function mu() {
      Me !== null && typeof Me.markLayoutEffectsStopped == "function" && Me.markLayoutEffectsStopped();
    }
    function dm(e) {
      Me !== null && typeof Me.markPassiveEffectsStarted == "function" && Me.markPassiveEffectsStarted(e);
    }
    function Cp() {
      Me !== null && typeof Me.markPassiveEffectsStopped == "function" && Me.markPassiveEffectsStopped();
    }
    function Rn(e) {
      Me !== null && typeof Me.markRenderStarted == "function" && Me.markRenderStarted(e);
    }
    function nf() {
      Me !== null && typeof Me.markRenderYielded == "function" && Me.markRenderYielded();
    }
    function rf() {
      Me !== null && typeof Me.markRenderStopped == "function" && Me.markRenderStopped();
    }
    function Ep(e) {
      Me !== null && typeof Me.markRenderScheduled == "function" && Me.markRenderScheduled(e);
    }
    function af(e, t) {
      Me !== null && typeof Me.markForceUpdateScheduled == "function" && Me.markForceUpdateScheduled(e, t);
    }
    function Fs(e, t) {
      Me !== null && typeof Me.markStateUpdateScheduled == "function" && Me.markStateUpdateScheduled(e, t);
    }
    var Ze = (
      /*                         */
      0
    ), tt = (
      /*                 */
      1
    ), Ct = (
      /*                    */
      2
    ), Nt = (
      /*               */
      8
    ), xa = (
      /*              */
      16
    ), yu = Math.clz32 ? Math.clz32 : Lr, Ps = Math.log, O0 = Math.LN2;
    function Lr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Ps(t) / O0 | 0) | 0;
    }
    var js = 31, he = (
      /*                        */
      0
    ), Qn = (
      /*                          */
      0
    ), ot = (
      /*                        */
      1
    ), br = (
      /*    */
      2
    ), wa = (
      /*             */
      4
    ), Zi = (
      /*            */
      8
    ), Ya = (
      /*                     */
      16
    ), gu = (
      /*                */
      32
    ), Cl = (
      /*                       */
      4194240
    ), Su = (
      /*                        */
      64
    ), of = (
      /*                        */
      128
    ), lf = (
      /*                        */
      256
    ), uf = (
      /*                        */
      512
    ), sf = (
      /*                        */
      1024
    ), cf = (
      /*                        */
      2048
    ), El = (
      /*                        */
      4096
    ), ff = (
      /*                        */
      8192
    ), bu = (
      /*                        */
      16384
    ), Cu = (
      /*                       */
      32768
    ), df = (
      /*                       */
      65536
    ), $s = (
      /*                       */
      131072
    ), pf = (
      /*                       */
      262144
    ), vf = (
      /*                       */
      524288
    ), hf = (
      /*                       */
      1048576
    ), mf = (
      /*                       */
      2097152
    ), Eu = (
      /*                            */
      130023424
    ), Tl = (
      /*                             */
      4194304
    ), yf = (
      /*                             */
      8388608
    ), gf = (
      /*                             */
      16777216
    ), Tp = (
      /*                             */
      33554432
    ), Sf = (
      /*                             */
      67108864
    ), pm = Tl, Vs = (
      /*          */
      134217728
    ), xp = (
      /*                          */
      268435455
    ), Tu = (
      /*               */
      268435456
    ), Do = (
      /*                        */
      536870912
    ), zr = (
      /*                   */
      1073741824
    );
    function D0(e) {
      {
        if (e & ot)
          return "Sync";
        if (e & br)
          return "InputContinuousHydration";
        if (e & wa)
          return "InputContinuous";
        if (e & Zi)
          return "DefaultHydration";
        if (e & Ya)
          return "Default";
        if (e & gu)
          return "TransitionHydration";
        if (e & Cl)
          return "Transition";
        if (e & Eu)
          return "Retry";
        if (e & Vs)
          return "SelectiveHydration";
        if (e & Tu)
          return "IdleHydration";
        if (e & Do)
          return "Idle";
        if (e & zr)
          return "Offscreen";
      }
    }
    var hn = -1, bf = Su, oa = Tl;
    function xl(e) {
      switch (Vn(e)) {
        case ot:
          return ot;
        case br:
          return br;
        case wa:
          return wa;
        case Zi:
          return Zi;
        case Ya:
          return Ya;
        case gu:
          return gu;
        case Su:
        case of:
        case lf:
        case uf:
        case sf:
        case cf:
        case El:
        case ff:
        case bu:
        case Cu:
        case df:
        case $s:
        case pf:
        case vf:
        case hf:
        case mf:
          return e & Cl;
        case Tl:
        case yf:
        case gf:
        case Tp:
        case Sf:
          return e & Eu;
        case Vs:
          return Vs;
        case Tu:
          return Tu;
        case Do:
          return Do;
        case zr:
          return zr;
        default:
          return y("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function wl(e, t) {
      var a = e.pendingLanes;
      if (a === he)
        return he;
      var o = he, u = e.suspendedLanes, d = e.pingedLanes, h = a & xp;
      if (h !== he) {
        var b = h & ~u;
        if (b !== he)
          o = xl(b);
        else {
          var C = h & d;
          C !== he && (o = xl(C));
        }
      } else {
        var x = a & ~u;
        x !== he ? o = xl(x) : d !== he && (o = xl(d));
      }
      if (o === he)
        return he;
      if (t !== he && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === he) {
        var R = Vn(o), $ = Vn(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          R >= $ || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          R === Ya && ($ & Cl) !== he
        )
          return t;
      }
      (o & wa) !== he && (o |= a & Ya);
      var P = e.entangledLanes;
      if (P !== he)
        for (var Z = e.entanglements, ee = o & P; ee > 0; ) {
          var re = Ao(ee), Ue = 1 << re;
          o |= Z[re], ee &= ~Ue;
        }
      return o;
    }
    function vm(e, t) {
      for (var a = e.eventTimes, o = hn; t > 0; ) {
        var u = Ao(t), d = 1 << u, h = a[u];
        h > o && (o = h), t &= ~d;
      }
      return o;
    }
    function hm(e, t) {
      switch (e) {
        case ot:
        case br:
        case wa:
          return t + 250;
        case Zi:
        case Ya:
        case gu:
        case Su:
        case of:
        case lf:
        case uf:
        case sf:
        case cf:
        case El:
        case ff:
        case bu:
        case Cu:
        case df:
        case $s:
        case pf:
        case vf:
        case hf:
        case mf:
          return t + 5e3;
        case Tl:
        case yf:
        case gf:
        case Tp:
        case Sf:
          return hn;
        case Vs:
        case Tu:
        case Do:
        case zr:
          return hn;
        default:
          return y("Should have found matching lanes. This is a bug in React."), hn;
      }
    }
    function mm(e, t) {
      for (var a = e.pendingLanes, o = e.suspendedLanes, u = e.pingedLanes, d = e.expirationTimes, h = a; h > 0; ) {
        var b = Ao(h), C = 1 << b, x = d[b];
        x === hn ? ((C & o) === he || (C & u) !== he) && (d[b] = hm(C, t)) : x <= t && (e.expiredLanes |= C), h &= ~C;
      }
    }
    function wp(e) {
      return xl(e.pendingLanes);
    }
    function Mo(e) {
      var t = e.pendingLanes & ~zr;
      return t !== he ? t : t & zr ? zr : he;
    }
    function Rp(e) {
      return (e & ot) !== he;
    }
    function Bs(e) {
      return (e & xp) !== he;
    }
    function ym(e) {
      return (e & Eu) === e;
    }
    function gm(e) {
      var t = ot | wa | Ya;
      return (e & t) === he;
    }
    function Sm(e) {
      return (e & Cl) === e;
    }
    function Hs(e, t) {
      var a = br | wa | Zi | Ya;
      return (t & a) !== he;
    }
    function bm(e, t) {
      return (t & e.expiredLanes) !== he;
    }
    function _p(e) {
      return (e & Cl) !== he;
    }
    function Cm() {
      var e = bf;
      return bf <<= 1, (bf & Cl) === he && (bf = Su), e;
    }
    function la() {
      var e = oa;
      return oa <<= 1, (oa & Eu) === he && (oa = Tl), e;
    }
    function Vn(e) {
      return e & -e;
    }
    function xu(e) {
      return Vn(e);
    }
    function Ao(e) {
      return 31 - yu(e);
    }
    function Cf(e) {
      return Ao(e);
    }
    function ua(e, t) {
      return (e & t) !== he;
    }
    function Rl(e, t) {
      return (e & t) === t;
    }
    function _t(e, t) {
      return e | t;
    }
    function Is(e, t) {
      return e & ~t;
    }
    function Ef(e, t) {
      return e & t;
    }
    function M0(e) {
      return e;
    }
    function Em(e, t) {
      return e !== Qn && e < t ? e : t;
    }
    function Ys(e) {
      for (var t = [], a = 0; a < js; a++)
        t.push(e);
      return t;
    }
    function _l(e, t, a) {
      e.pendingLanes |= t, t !== Do && (e.suspendedLanes = he, e.pingedLanes = he);
      var o = e.eventTimes, u = Cf(t);
      o[u] = a;
    }
    function Tm(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, o = t; o > 0; ) {
        var u = Ao(o), d = 1 << u;
        a[u] = hn, o &= ~d;
      }
    }
    function Tf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function xf(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = he, e.pingedLanes = he, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, u = e.eventTimes, d = e.expirationTimes, h = a; h > 0; ) {
        var b = Ao(h), C = 1 << b;
        o[b] = he, u[b] = hn, d[b] = hn, h &= ~C;
      }
    }
    function kp(e, t) {
      for (var a = e.entangledLanes |= t, o = e.entanglements, u = a; u; ) {
        var d = Ao(u), h = 1 << d;
        // Is this one of the newly entangled lanes?
        h & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[d] & t && (o[d] |= t), u &= ~h;
      }
    }
    function xm(e, t) {
      var a = Vn(t), o;
      switch (a) {
        case wa:
          o = br;
          break;
        case Ya:
          o = Zi;
          break;
        case Su:
        case of:
        case lf:
        case uf:
        case sf:
        case cf:
        case El:
        case ff:
        case bu:
        case Cu:
        case df:
        case $s:
        case pf:
        case vf:
        case hf:
        case mf:
        case Tl:
        case yf:
        case gf:
        case Tp:
        case Sf:
          o = gu;
          break;
        case Do:
          o = Tu;
          break;
        default:
          o = Qn;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== Qn ? Qn : o;
    }
    function wf(e, t, a) {
      if (Ta)
        for (var o = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = Cf(a), d = 1 << u, h = o[u];
          h.add(t), a &= ~d;
        }
    }
    function Op(e, t) {
      if (Ta)
        for (var a = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var u = Cf(t), d = 1 << u, h = a[u];
          h.size > 0 && (h.forEach(function(b) {
            var C = b.alternate;
            (C === null || !o.has(C)) && o.add(b);
          }), h.clear()), t &= ~d;
        }
    }
    function Ws(e, t) {
      return null;
    }
    var Bn = ot, Ji = wa, Ri = Ya, wu = Do, Ru = Qn;
    function Wa() {
      return Ru;
    }
    function zn(e) {
      Ru = e;
    }
    function Ur(e, t) {
      var a = Ru;
      try {
        return Ru = e, t();
      } finally {
        Ru = a;
      }
    }
    function A0(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function N0(e, t) {
      return e > t ? e : t;
    }
    function _u(e, t) {
      return e !== 0 && e < t;
    }
    function Cr(e) {
      var t = Vn(e);
      return _u(Bn, t) ? _u(Ji, t) ? Bs(t) ? Ri : wu : Ji : Bn;
    }
    function Rf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var He;
    function ku(e) {
      He = e;
    }
    function Dp(e) {
      He(e);
    }
    var _f;
    function L0(e) {
      _f = e;
    }
    var Ou;
    function kf(e) {
      Ou = e;
    }
    var Of;
    function wm(e) {
      Of = e;
    }
    var Mp;
    function Rm(e) {
      Mp = e;
    }
    var Gs = !1, Du = [], _n = null, pr = null, jr = null, Mu = /* @__PURE__ */ new Map(), Au = /* @__PURE__ */ new Map(), vr = [], _m = [
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
    function _i(e) {
      return _m.indexOf(e) > -1;
    }
    function z0(e, t, a, o, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [o]
      };
    }
    function Ap(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          _n = null;
          break;
        case "dragenter":
        case "dragleave":
          pr = null;
          break;
        case "mouseover":
        case "mouseout":
          jr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Mu.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          Au.delete(o);
          break;
        }
      }
    }
    function Nu(e, t, a, o, u, d) {
      if (e === null || e.nativeEvent !== d) {
        var h = z0(t, a, o, u, d);
        if (t !== null) {
          var b = Bu(t);
          b !== null && _f(b);
        }
        return h;
      }
      e.eventSystemFlags |= o;
      var C = e.targetContainers;
      return u !== null && C.indexOf(u) === -1 && C.push(u), e;
    }
    function km(e, t, a, o, u) {
      switch (t) {
        case "focusin": {
          var d = u;
          return _n = Nu(_n, e, t, a, o, d), !0;
        }
        case "dragenter": {
          var h = u;
          return pr = Nu(pr, e, t, a, o, h), !0;
        }
        case "mouseover": {
          var b = u;
          return jr = Nu(jr, e, t, a, o, b), !0;
        }
        case "pointerover": {
          var C = u, x = C.pointerId;
          return Mu.set(x, Nu(Mu.get(x) || null, e, t, a, o, C)), !0;
        }
        case "gotpointercapture": {
          var R = u, $ = R.pointerId;
          return Au.set($, Nu(Au.get($) || null, e, t, a, o, R)), !0;
        }
      }
      return !1;
    }
    function Np(e) {
      var t = ic(e.target);
      if (t !== null) {
        var a = Ca(t);
        if (a !== null) {
          var o = a.tag;
          if (o === V) {
            var u = vp(a);
            if (u !== null) {
              e.blockedOn = u, Mp(e.priority, function() {
                Ou(a);
              });
              return;
            }
          } else if (o === O) {
            var d = a.stateNode;
            if (Rf(d)) {
              e.blockedOn = Gc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function U0(e) {
      for (var t = Of(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < vr.length && _u(t, vr[o].priority); o++)
        ;
      vr.splice(o, 0, a), o === 0 && Np(a);
    }
    function kl(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], o = Fr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (o === null) {
          var u = e.nativeEvent, d = new u.constructor(u.type, u);
          _s(d), u.target.dispatchEvent(d), w0();
        } else {
          var h = Bu(o);
          return h !== null && _f(h), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Df(e, t, a) {
      kl(e) && a.delete(t);
    }
    function Ga() {
      Gs = !1, _n !== null && kl(_n) && (_n = null), pr !== null && kl(pr) && (pr = null), jr !== null && kl(jr) && (jr = null), Mu.forEach(Df), Au.forEach(Df);
    }
    function Lt(e, t) {
      e.blockedOn === t && (e.blockedOn = null, Gs || (Gs = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, Ga)));
    }
    function Un(e) {
      if (Du.length > 0) {
        Lt(Du[0], e);
        for (var t = 1; t < Du.length; t++) {
          var a = Du[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      _n !== null && Lt(_n, e), pr !== null && Lt(pr, e), jr !== null && Lt(jr, e);
      var o = function(b) {
        return Lt(b, e);
      };
      Mu.forEach(o), Au.forEach(o);
      for (var u = 0; u < vr.length; u++) {
        var d = vr[u];
        d.blockedOn === e && (d.blockedOn = null);
      }
      for (; vr.length > 0; ) {
        var h = vr[0];
        if (h.blockedOn !== null)
          break;
        Np(h), h.blockedOn === null && vr.shift();
      }
    }
    var bn = c.ReactCurrentBatchConfig, er = !0;
    function sa(e) {
      er = !!e;
    }
    function Lu() {
      return er;
    }
    function tr(e, t, a) {
      var o = Mf(t), u;
      switch (o) {
        case Bn:
          u = Qs;
          break;
        case Ji:
          u = Ol;
          break;
        case Ri:
        default:
          u = zu;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Qs(e, t, a, o) {
      var u = Wa(), d = bn.transition;
      bn.transition = null;
      try {
        zn(Bn), zu(e, t, a, o);
      } finally {
        zn(u), bn.transition = d;
      }
    }
    function Ol(e, t, a, o) {
      var u = Wa(), d = bn.transition;
      bn.transition = null;
      try {
        zn(Ji), zu(e, t, a, o);
      } finally {
        zn(u), bn.transition = d;
      }
    }
    function zu(e, t, a, o) {
      er && Lp(e, t, a, o);
    }
    function Lp(e, t, a, o) {
      var u = Fr(e, t, a, o);
      if (u === null) {
        J0(e, t, o, No, a), Ap(e, o);
        return;
      }
      if (km(u, e, t, a, o)) {
        o.stopPropagation();
        return;
      }
      if (Ap(e, o), t & dl && _i(e)) {
        for (; u !== null; ) {
          var d = Bu(u);
          d !== null && Dp(d);
          var h = Fr(e, t, a, o);
          if (h === null && J0(e, t, o, No, a), h === u)
            break;
          u = h;
        }
        u !== null && o.stopPropagation();
        return;
      }
      J0(e, t, o, null, a);
    }
    var No = null;
    function Fr(e, t, a, o) {
      No = null;
      var u = Bc(o), d = ic(u);
      if (d !== null) {
        var h = Ca(d);
        if (h === null)
          d = null;
        else {
          var b = h.tag;
          if (b === V) {
            var C = vp(h);
            if (C !== null)
              return C;
            d = null;
          } else if (b === O) {
            var x = h.stateNode;
            if (Rf(x))
              return Gc(h);
            d = null;
          } else h !== d && (d = null);
        }
      }
      return No = d, null;
    }
    function Mf(e) {
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
          return Ji;
        case "message": {
          var t = yp();
          switch (t) {
            case Xc:
              return Bn;
            case gl:
              return Ji;
            case wi:
            case lm:
              return Ri;
            case Zc:
              return wu;
            default:
              return Ri;
          }
        }
        default:
          return Ri;
      }
    }
    function Uu(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function eo(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Af(e, t, a, o) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }), a;
    }
    function zp(e, t, a, o) {
      return e.addEventListener(t, a, {
        passive: o
      }), a;
    }
    var Qa = null, Fu = null, qa = null;
    function Nf(e) {
      return Qa = e, Fu = Ks(), !0;
    }
    function qs() {
      Qa = null, Fu = null, qa = null;
    }
    function Lf() {
      if (qa)
        return qa;
      var e, t = Fu, a = t.length, o, u = Ks(), d = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var h = a - e;
      for (o = 1; o <= h && t[a - o] === u[d - o]; o++)
        ;
      var b = o > 1 ? 1 - o : void 0;
      return qa = u.slice(e, b), qa;
    }
    function Ks() {
      return "value" in Qa ? Qa.value : Qa.textContent;
    }
    function Dl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function hr() {
      return !0;
    }
    function to() {
      return !1;
    }
    function Dn(e) {
      function t(a, o, u, d, h) {
        this._reactName = a, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = h, this.currentTarget = null;
        for (var b in e)
          if (e.hasOwnProperty(b)) {
            var C = e[b];
            C ? this[b] = C(d) : this[b] = d[b];
          }
        var x = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return x ? this.isDefaultPrevented = hr : this.isDefaultPrevented = to, this.isPropagationStopped = to, this;
      }
      return At(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = hr);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = hr);
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
        isPersistent: hr
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
    }, zf = Dn(nr), Ml = At({}, nr, {
      view: 0,
      detail: 0
    }), Up = Dn(Ml), Fp, ki, Pu;
    function Pp(e) {
      e !== Pu && (Pu && e.type === "mousemove" ? (Fp = e.screenX - Pu.screenX, ki = e.screenY - Pu.screenY) : (Fp = 0, ki = 0), Pu = e);
    }
    var Oi = At({}, Ml, {
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
      getModifierState: jp,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Pp(e), Fp);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : ki;
      }
    }), Uf = Dn(Oi), Al = At({}, Oi, {
      dataTransfer: 0
    }), Om = Dn(Al), Dm = At({}, Ml, {
      relatedTarget: 0
    }), Xs = Dn(Dm), Ff = At({}, nr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), F0 = Dn(Ff), P0 = At({}, nr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Mm = Dn(P0), Am = At({}, nr, {
      data: 0
    }), Lo = Dn(Am), j0 = Lo, ju = {
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
    }, Nm = {
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
        var t = ju[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Dl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Nm[e.keyCode] || "Unidentified" : "";
    }
    var $0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Lm(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var o = $0[e];
      return o ? !!a[o] : !1;
    }
    function jp(e) {
      return Lm;
    }
    var V0 = At({}, Ml, {
      key: Fn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: jp,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Dl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Dl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), zm = Dn(V0), Um = At({}, Oi, {
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
    }), Fm = Dn(Um), Ka = At({}, Ml, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: jp
    }), $p = Dn(Ka), B0 = At({}, nr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), zo = Dn(B0), Pf = At({}, Oi, {
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
    }), Nl = Dn(Pf), jf = [9, 13, 27, 32], $f = 229, Zs = Ft && "CompositionEvent" in window, Js = null;
    Ft && "documentMode" in document && (Js = document.documentMode);
    var Vp = Ft && "TextEvent" in window && !Js, Pm = Ft && (!Zs || Js && Js > 8 && Js <= 11), Bp = 32, Hp = String.fromCharCode(Bp);
    function Vf() {
      Ut("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Ut("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ut("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Ut("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var ec = !1;
    function jm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Ip(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function H0(e, t) {
      return e === "keydown" && t.keyCode === $f;
    }
    function Yp(e, t) {
      switch (e) {
        case "keyup":
          return jf.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== $f;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Bf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function tc(e) {
      return e.locale === "ko";
    }
    var Uo = !1;
    function Hf(e, t, a, o, u) {
      var d, h;
      if (Zs ? d = Ip(t) : Uo ? Yp(t, o) && (d = "onCompositionEnd") : H0(t, o) && (d = "onCompositionStart"), !d)
        return null;
      Pm && !tc(o) && (!Uo && d === "onCompositionStart" ? Uo = Nf(u) : d === "onCompositionEnd" && Uo && (h = Lf()));
      var b = Ym(a, d);
      if (b.length > 0) {
        var C = new Lo(d, t, null, o, u);
        if (e.push({
          event: C,
          listeners: b
        }), h)
          C.data = h;
        else {
          var x = Bf(o);
          x !== null && (C.data = x);
        }
      }
    }
    function $m(e, t) {
      switch (e) {
        case "compositionend":
          return Bf(t);
        case "keypress":
          var a = t.which;
          return a !== Bp ? null : (ec = !0, Hp);
        case "textInput":
          var o = t.data;
          return o === Hp && ec ? null : o;
        default:
          return null;
      }
    }
    function I0(e, t) {
      if (Uo) {
        if (e === "compositionend" || !Zs && Yp(e, t)) {
          var a = Lf();
          return qs(), Uo = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!jm(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Pm && !tc(t) ? null : t.data;
        default:
          return null;
      }
    }
    function If(e, t, a, o, u) {
      var d;
      if (Vp ? d = $m(t, o) : d = I0(t, o), !d)
        return null;
      var h = Ym(a, "onBeforeInput");
      if (h.length > 0) {
        var b = new j0("onBeforeInput", "beforeinput", null, o, u);
        e.push({
          event: b,
          listeners: h
        }), b.data = d;
      }
    }
    function Y0(e, t, a, o, u, d, h) {
      Hf(e, t, a, o, u), If(e, t, a, o, u);
    }
    var nc = {
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
    function Vm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!nc[e.type] : t === "textarea";
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
    function Yf(e) {
      if (!Ft)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), a = typeof o[t] == "function";
      }
      return a;
    }
    function n() {
      Ut("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, o) {
      Hc(o);
      var u = Ym(t, "onChange");
      if (u.length > 0) {
        var d = new zf("onChange", "change", null, a, o);
        e.push({
          event: d,
          listeners: u
        });
      }
    }
    var l = null, f = null;
    function p(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function g(e) {
      var t = [];
      r(t, f, e, Bc(e)), op(E, t);
    }
    function E(e) {
      ZC(e, 0);
    }
    function M(e) {
      var t = Xf(e);
      if (Th(t))
        return e;
    }
    function U(e, t) {
      if (e === "change")
        return t;
    }
    var J = !1;
    Ft && (J = Yf("input") && (!document.documentMode || document.documentMode > 9));
    function ye(e, t) {
      l = e, f = t, l.attachEvent("onpropertychange", me);
    }
    function Ce() {
      l && (l.detachEvent("onpropertychange", me), l = null, f = null);
    }
    function me(e) {
      e.propertyName === "value" && M(f) && g(e);
    }
    function je(e, t, a) {
      e === "focusin" ? (Ce(), ye(t, a)) : e === "focusout" && Ce();
    }
    function Ye(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return M(f);
    }
    function qe(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Hn(e, t) {
      if (e === "click")
        return M(t);
    }
    function W(e, t) {
      if (e === "input" || e === "change")
        return M(t);
    }
    function j(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || bo(e, "number", e.value);
    }
    function K(e, t, a, o, u, d, h) {
      var b = a ? Xf(a) : window, C, x;
      if (p(b) ? C = U : Vm(b) ? J ? C = W : (C = Ye, x = je) : qe(b) && (C = Hn), C) {
        var R = C(t, a);
        if (R) {
          r(e, R, o, u);
          return;
        }
      }
      x && x(t, b, a), t === "focusout" && j(b);
    }
    function xe() {
      we("onMouseEnter", ["mouseout", "mouseover"]), we("onMouseLeave", ["mouseout", "mouseover"]), we("onPointerEnter", ["pointerout", "pointerover"]), we("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function Je(e, t, a, o, u, d, h) {
      var b = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout";
      if (b && !em(o)) {
        var x = o.relatedTarget || o.fromElement;
        if (x && (ic(x) || iv(x)))
          return;
      }
      if (!(!C && !b)) {
        var R;
        if (u.window === u)
          R = u;
        else {
          var $ = u.ownerDocument;
          $ ? R = $.defaultView || $.parentWindow : R = window;
        }
        var P, Z;
        if (C) {
          var ee = o.relatedTarget || o.toElement;
          if (P = a, Z = ee ? ic(ee) : null, Z !== null) {
            var re = Ca(Z);
            (Z !== re || Z.tag !== H && Z.tag !== I) && (Z = null);
          }
        } else
          P = null, Z = a;
        if (P !== Z) {
          var Ue = Uf, ft = "onMouseLeave", nt = "onMouseEnter", $t = "mouse";
          (t === "pointerout" || t === "pointerover") && (Ue = Fm, ft = "onPointerLeave", nt = "onPointerEnter", $t = "pointer");
          var zt = P == null ? R : Xf(P), Q = Z == null ? R : Xf(Z), ae = new Ue(ft, $t + "leave", P, o, u);
          ae.target = zt, ae.relatedTarget = Q;
          var q = null, Ee = ic(u);
          if (Ee === a) {
            var Be = new Ue(nt, $t + "enter", Z, o, u);
            Be.target = Q, Be.relatedTarget = zt, q = Be;
          }
          X_(e, ae, q, P, Z);
        }
      }
    }
    function dt(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var We = typeof Object.is == "function" ? Object.is : dt;
    function vt(e, t) {
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
    function no(e, t) {
      for (var a = rr(e), o = 0, u = 0; a; ) {
        if (a.nodeType === Ii) {
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
    function W0(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, o = a.getSelection && a.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var u = o.anchorNode, d = o.anchorOffset, h = o.focusNode, b = o.focusOffset;
      try {
        u.nodeType, h.nodeType;
      } catch {
        return null;
      }
      return M_(e, u, d, h, b);
    }
    function M_(e, t, a, o, u) {
      var d = 0, h = -1, b = -1, C = 0, x = 0, R = e, $ = null;
      e: for (; ; ) {
        for (var P = null; R === t && (a === 0 || R.nodeType === Ii) && (h = d + a), R === o && (u === 0 || R.nodeType === Ii) && (b = d + u), R.nodeType === Ii && (d += R.nodeValue.length), (P = R.firstChild) !== null; )
          $ = R, R = P;
        for (; ; ) {
          if (R === e)
            break e;
          if ($ === t && ++C === a && (h = d), $ === o && ++x === u && (b = d), (P = R.nextSibling) !== null)
            break;
          R = $, $ = R.parentNode;
        }
        R = P;
      }
      return h === -1 || b === -1 ? null : {
        start: h,
        end: b
      };
    }
    function A_(e, t) {
      var a = e.ownerDocument || document, o = a && a.defaultView || window;
      if (o.getSelection) {
        var u = o.getSelection(), d = e.textContent.length, h = Math.min(t.start, d), b = t.end === void 0 ? h : Math.min(t.end, d);
        if (!u.extend && h > b) {
          var C = b;
          b = h, h = C;
        }
        var x = no(e, h), R = no(e, b);
        if (x && R) {
          if (u.rangeCount === 1 && u.anchorNode === x.node && u.anchorOffset === x.offset && u.focusNode === R.node && u.focusOffset === R.offset)
            return;
          var $ = a.createRange();
          $.setStart(x.node, x.offset), u.removeAllRanges(), h > b ? (u.addRange($), u.extend(R.node, R.offset)) : ($.setEnd(R.node, R.offset), u.addRange($));
        }
      }
    }
    function $C(e) {
      return e && e.nodeType === Ii;
    }
    function VC(e, t) {
      return !e || !t ? !1 : e === t ? !0 : $C(e) ? !1 : $C(t) ? VC(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function N_(e) {
      return e && e.ownerDocument && VC(e.ownerDocument.documentElement, e);
    }
    function L_(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function BC() {
      for (var e = window, t = Oc(); t instanceof e.HTMLIFrameElement; ) {
        if (L_(t))
          e = t.contentWindow;
        else
          return t;
        t = Oc(e.document);
      }
      return t;
    }
    function G0(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function z_() {
      var e = BC();
      return {
        focusedElem: e,
        selectionRange: G0(e) ? F_(e) : null
      };
    }
    function U_(e) {
      var t = BC(), a = e.focusedElem, o = e.selectionRange;
      if (t !== a && N_(a)) {
        o !== null && G0(a) && P_(a, o);
        for (var u = [], d = a; d = d.parentNode; )
          d.nodeType === Jr && u.push({
            element: d,
            left: d.scrollLeft,
            top: d.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var h = 0; h < u.length; h++) {
          var b = u[h];
          b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
        }
      }
    }
    function F_(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = W0(e), t || {
        start: 0,
        end: 0
      };
    }
    function P_(e, t) {
      var a = t.start, o = t.end;
      o === void 0 && (o = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(o, e.value.length)) : A_(e, t);
    }
    var j_ = Ft && "documentMode" in document && document.documentMode <= 11;
    function $_() {
      Ut("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Wf = null, Q0 = null, Wp = null, q0 = !1;
    function V_(e) {
      if ("selectionStart" in e && G0(e))
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
    function B_(e) {
      return e.window === e ? e.document : e.nodeType === ci ? e : e.ownerDocument;
    }
    function HC(e, t, a) {
      var o = B_(a);
      if (!(q0 || Wf == null || Wf !== Oc(o))) {
        var u = V_(Wf);
        if (!Wp || !vt(Wp, u)) {
          Wp = u;
          var d = Ym(Q0, "onSelect");
          if (d.length > 0) {
            var h = new zf("onSelect", "select", null, t, a);
            e.push({
              event: h,
              listeners: d
            }), h.target = Wf;
          }
        }
      }
    }
    function H_(e, t, a, o, u, d, h) {
      var b = a ? Xf(a) : window;
      switch (t) {
        case "focusin":
          (Vm(b) || b.contentEditable === "true") && (Wf = b, Q0 = a, Wp = null);
          break;
        case "focusout":
          Wf = null, Q0 = null, Wp = null;
          break;
        case "mousedown":
          q0 = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          q0 = !1, HC(e, o, u);
          break;
        case "selectionchange":
          if (j_)
            break;
        case "keydown":
        case "keyup":
          HC(e, o, u);
      }
    }
    function Bm(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var Gf = {
      animationend: Bm("Animation", "AnimationEnd"),
      animationiteration: Bm("Animation", "AnimationIteration"),
      animationstart: Bm("Animation", "AnimationStart"),
      transitionend: Bm("Transition", "TransitionEnd")
    }, K0 = {}, IC = {};
    Ft && (IC = document.createElement("div").style, "AnimationEvent" in window || (delete Gf.animationend.animation, delete Gf.animationiteration.animation, delete Gf.animationstart.animation), "TransitionEvent" in window || delete Gf.transitionend.transition);
    function Hm(e) {
      if (K0[e])
        return K0[e];
      if (!Gf[e])
        return e;
      var t = Gf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in IC)
          return K0[e] = t[a];
      return e;
    }
    var YC = Hm("animationend"), WC = Hm("animationiteration"), GC = Hm("animationstart"), QC = Hm("transitionend"), qC = /* @__PURE__ */ new Map(), KC = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function $u(e, t) {
      qC.set(e, t), Ut(t, [e]);
    }
    function I_() {
      for (var e = 0; e < KC.length; e++) {
        var t = KC[e], a = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        $u(a, "on" + o);
      }
      $u(YC, "onAnimationEnd"), $u(WC, "onAnimationIteration"), $u(GC, "onAnimationStart"), $u("dblclick", "onDoubleClick"), $u("focusin", "onFocus"), $u("focusout", "onBlur"), $u(QC, "onTransitionEnd");
    }
    function Y_(e, t, a, o, u, d, h) {
      var b = qC.get(t);
      if (b !== void 0) {
        var C = zf, x = t;
        switch (t) {
          case "keypress":
            if (Dl(o) === 0)
              return;
          case "keydown":
          case "keyup":
            C = zm;
            break;
          case "focusin":
            x = "focus", C = Xs;
            break;
          case "focusout":
            x = "blur", C = Xs;
            break;
          case "beforeblur":
          case "afterblur":
            C = Xs;
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
            C = Uf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            C = Om;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            C = $p;
            break;
          case YC:
          case WC:
          case GC:
            C = F0;
            break;
          case QC:
            C = zo;
            break;
          case "scroll":
            C = Up;
            break;
          case "wheel":
            C = Nl;
            break;
          case "copy":
          case "cut":
          case "paste":
            C = Mm;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            C = Fm;
            break;
        }
        var R = (d & dl) !== 0;
        {
          var $ = !R && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", P = q_(a, b, o.type, R, $);
          if (P.length > 0) {
            var Z = new C(b, x, null, o, u);
            e.push({
              event: Z,
              listeners: P
            });
          }
        }
      }
    }
    I_(), xe(), n(), $_(), Vf();
    function W_(e, t, a, o, u, d, h) {
      Y_(e, t, a, o, u, d);
      var b = (d & x0) === 0;
      b && (Je(e, t, a, o, u), K(e, t, a, o, u), H_(e, t, a, o, u), Y0(e, t, a, o, u));
    }
    var Gp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], X0 = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Gp));
    function XC(e, t, a) {
      var o = e.type || "unknown-event";
      e.currentTarget = a, Qi(o, t, void 0, e), e.currentTarget = null;
    }
    function G_(e, t, a) {
      var o;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var d = t[u], h = d.instance, b = d.currentTarget, C = d.listener;
          if (h !== o && e.isPropagationStopped())
            return;
          XC(e, C, b), o = h;
        }
      else
        for (var x = 0; x < t.length; x++) {
          var R = t[x], $ = R.instance, P = R.currentTarget, Z = R.listener;
          if ($ !== o && e.isPropagationStopped())
            return;
          XC(e, Z, P), o = $;
        }
    }
    function ZC(e, t) {
      for (var a = (t & dl) !== 0, o = 0; o < e.length; o++) {
        var u = e[o], d = u.event, h = u.listeners;
        G_(d, h, a);
      }
      cp();
    }
    function Q_(e, t, a, o, u) {
      var d = Bc(a), h = [];
      W_(h, e, o, a, d, t), ZC(h, t);
    }
    function Mn(e, t) {
      X0.has(e) || y('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, o = xO(t), u = Z_(e);
      o.has(u) || (JC(t, e, ws, a), o.add(u));
    }
    function Z0(e, t, a) {
      X0.has(e) && !t && y('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= dl), JC(a, e, o, t);
    }
    var Im = "_reactListening" + Math.random().toString(36).slice(2);
    function Qp(e) {
      if (!e[Im]) {
        e[Im] = !0, rt.forEach(function(a) {
          a !== "selectionchange" && (X0.has(a) || Z0(a, !1, e), Z0(a, !0, e));
        });
        var t = e.nodeType === ci ? e : e.ownerDocument;
        t !== null && (t[Im] || (t[Im] = !0, Z0("selectionchange", !1, t)));
      }
    }
    function JC(e, t, a, o, u) {
      var d = tr(e, t, a), h = void 0;
      Ds && (t === "touchstart" || t === "touchmove" || t === "wheel") && (h = !0), e = e, o ? h !== void 0 ? Af(e, t, d, h) : eo(e, t, d) : h !== void 0 ? zp(e, t, d, h) : Uu(e, t, d);
    }
    function eE(e, t) {
      return e === t || e.nodeType === Wn && e.parentNode === t;
    }
    function J0(e, t, a, o, u) {
      var d = o;
      if (!(t & Wi) && !(t & ws)) {
        var h = u;
        if (o !== null) {
          var b = o;
          e: for (; ; ) {
            if (b === null)
              return;
            var C = b.tag;
            if (C === O || C === z) {
              var x = b.stateNode.containerInfo;
              if (eE(x, h))
                break;
              if (C === z)
                for (var R = b.return; R !== null; ) {
                  var $ = R.tag;
                  if ($ === O || $ === z) {
                    var P = R.stateNode.containerInfo;
                    if (eE(P, h))
                      return;
                  }
                  R = R.return;
                }
              for (; x !== null; ) {
                var Z = ic(x);
                if (Z === null)
                  return;
                var ee = Z.tag;
                if (ee === H || ee === I) {
                  b = d = Z;
                  continue e;
                }
                x = x.parentNode;
              }
            }
            b = b.return;
          }
        }
      }
      op(function() {
        return Q_(e, t, a, d);
      });
    }
    function qp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function q_(e, t, a, o, u, d) {
      for (var h = t !== null ? t + "Capture" : null, b = o ? h : t, C = [], x = e, R = null; x !== null; ) {
        var $ = x, P = $.stateNode, Z = $.tag;
        if (Z === H && P !== null && (R = P, b !== null)) {
          var ee = vl(x, b);
          ee != null && C.push(qp(x, ee, R));
        }
        if (u)
          break;
        x = x.return;
      }
      return C;
    }
    function Ym(e, t) {
      for (var a = t + "Capture", o = [], u = e; u !== null; ) {
        var d = u, h = d.stateNode, b = d.tag;
        if (b === H && h !== null) {
          var C = h, x = vl(u, a);
          x != null && o.unshift(qp(u, x, C));
          var R = vl(u, t);
          R != null && o.push(qp(u, R, C));
        }
        u = u.return;
      }
      return o;
    }
    function Qf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== H);
      return e || null;
    }
    function K_(e, t) {
      for (var a = e, o = t, u = 0, d = a; d; d = Qf(d))
        u++;
      for (var h = 0, b = o; b; b = Qf(b))
        h++;
      for (; u - h > 0; )
        a = Qf(a), u--;
      for (; h - u > 0; )
        o = Qf(o), h--;
      for (var C = u; C--; ) {
        if (a === o || o !== null && a === o.alternate)
          return a;
        a = Qf(a), o = Qf(o);
      }
      return null;
    }
    function tE(e, t, a, o, u) {
      for (var d = t._reactName, h = [], b = a; b !== null && b !== o; ) {
        var C = b, x = C.alternate, R = C.stateNode, $ = C.tag;
        if (x !== null && x === o)
          break;
        if ($ === H && R !== null) {
          var P = R;
          if (u) {
            var Z = vl(b, d);
            Z != null && h.unshift(qp(b, Z, P));
          } else if (!u) {
            var ee = vl(b, d);
            ee != null && h.push(qp(b, ee, P));
          }
        }
        b = b.return;
      }
      h.length !== 0 && e.push({
        event: t,
        listeners: h
      });
    }
    function X_(e, t, a, o, u) {
      var d = o && u ? K_(o, u) : null;
      o !== null && tE(e, t, o, d, !1), u !== null && a !== null && tE(e, a, u, d, !0);
    }
    function Z_(e, t) {
      return e + "__bubble";
    }
    var Xa = !1, Kp = "dangerouslySetInnerHTML", Wm = "suppressContentEditableWarning", Vu = "suppressHydrationWarning", nE = "autoFocus", rc = "children", ac = "style", Gm = "__html", eS, Qm, Xp, rE, qm, aE, iE;
    eS = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Qm = function(e, t) {
      Vc(e, t), tp(e, t), Jh(e, t, {
        registrationNameDependencies: pt,
        possibleRegistrationNames: gt
      });
    }, aE = Ft && !document.documentMode, Xp = function(e, t, a) {
      if (!Xa) {
        var o = Km(a), u = Km(t);
        u !== o && (Xa = !0, y("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(o)));
      }
    }, rE = function(e) {
      if (!Xa) {
        Xa = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), y("Extra attributes from the server: %s", t);
      }
    }, qm = function(e, t) {
      t === !1 ? y("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : y("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, iE = function(e, t) {
      var a = e.namespaceURI === Hi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var J_ = /\r\n?/g, ek = /\u0000|\uFFFD/g;
    function Km(e) {
      Te(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(J_, `
`).replace(ek, "");
    }
    function Xm(e, t, a, o) {
      var u = Km(t), d = Km(e);
      if (d !== u && (o && (Xa || (Xa = !0, y('Text content did not match. Server: "%s" Client: "%s"', d, u))), a && Et))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function oE(e) {
      return e.nodeType === ci ? e : e.ownerDocument;
    }
    function tk() {
    }
    function Zm(e) {
      e.onclick = tk;
    }
    function nk(e, t, a, o, u) {
      for (var d in o)
        if (o.hasOwnProperty(d)) {
          var h = o[d];
          if (d === ac)
            h && Object.freeze(h), Hh(t, h);
          else if (d === Kp) {
            var b = h ? h[Gm] : void 0;
            b != null && Ah(t, b);
          } else if (d === rc)
            if (typeof h == "string") {
              var C = e !== "textarea" || h !== "";
              C && Fc(t, h);
            } else typeof h == "number" && Fc(t, "" + h);
          else d === Wm || d === Vu || d === nE || (pt.hasOwnProperty(d) ? h != null && (typeof h != "function" && qm(d, h), d === "onScroll" && Mn("scroll", t)) : h != null && Ci(t, d, h, u));
        }
    }
    function rk(e, t, a, o) {
      for (var u = 0; u < t.length; u += 2) {
        var d = t[u], h = t[u + 1];
        d === ac ? Hh(e, h) : d === Kp ? Ah(e, h) : d === rc ? Fc(e, h) : Ci(e, d, h, o);
      }
    }
    function ak(e, t, a, o) {
      var u, d = oE(a), h, b = o;
      if (b === Hi && (b = zc(e)), b === Hi) {
        if (u = Yi(e, t), !u && e !== e.toLowerCase() && y("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var C = d.createElement("div");
          C.innerHTML = "<script><\/script>";
          var x = C.firstChild;
          h = C.removeChild(x);
        } else if (typeof t.is == "string")
          h = d.createElement(e, {
            is: t.is
          });
        else if (h = d.createElement(e), e === "select") {
          var R = h;
          t.multiple ? R.multiple = !0 : t.size && (R.size = t.size);
        }
      } else
        h = d.createElementNS(b, e);
      return b === Hi && !u && Object.prototype.toString.call(h) === "[object HTMLUnknownElement]" && !Le.call(eS, e) && (eS[e] = !0, y("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), h;
    }
    function ik(e, t) {
      return oE(t).createTextNode(e);
    }
    function ok(e, t, a, o) {
      var u = Yi(t, a);
      Qm(t, a);
      var d;
      switch (t) {
        case "dialog":
          Mn("cancel", e), Mn("close", e), d = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Mn("load", e), d = a;
          break;
        case "video":
        case "audio":
          for (var h = 0; h < Gp.length; h++)
            Mn(Gp[h], e);
          d = a;
          break;
        case "source":
          Mn("error", e), d = a;
          break;
        case "img":
        case "image":
        case "link":
          Mn("error", e), Mn("load", e), d = a;
          break;
        case "details":
          Mn("toggle", e), d = a;
          break;
        case "input":
          Ss(e, a), d = gs(e, a), Mn("invalid", e);
          break;
        case "option":
          Nc(e, a), d = a;
          break;
        case "select":
          kh(e, a), d = Id(e, a), Mn("invalid", e);
          break;
        case "textarea":
          Oh(e, a), d = Wd(e, a), Mn("invalid", e);
          break;
        default:
          d = a;
      }
      switch (jc(t, d), nk(t, e, o, d, u), t) {
        case "input":
          sl(e), bs(e, a, !1);
          break;
        case "textarea":
          sl(e), Mh(e);
          break;
        case "option":
          Hd(e, a);
          break;
        case "select":
          p0(e, a);
          break;
        default:
          typeof d.onClick == "function" && Zm(e);
          break;
      }
    }
    function lk(e, t, a, o, u) {
      Qm(t, o);
      var d = null, h, b;
      switch (t) {
        case "input":
          h = gs(e, a), b = gs(e, o), d = [];
          break;
        case "select":
          h = Id(e, a), b = Id(e, o), d = [];
          break;
        case "textarea":
          h = Wd(e, a), b = Wd(e, o), d = [];
          break;
        default:
          h = a, b = o, typeof h.onClick != "function" && typeof b.onClick == "function" && Zm(e);
          break;
      }
      jc(t, b);
      var C, x, R = null;
      for (C in h)
        if (!(b.hasOwnProperty(C) || !h.hasOwnProperty(C) || h[C] == null))
          if (C === ac) {
            var $ = h[C];
            for (x in $)
              $.hasOwnProperty(x) && (R || (R = {}), R[x] = "");
          } else C === Kp || C === rc || C === Wm || C === Vu || C === nE || (pt.hasOwnProperty(C) ? d || (d = []) : (d = d || []).push(C, null));
      for (C in b) {
        var P = b[C], Z = h != null ? h[C] : void 0;
        if (!(!b.hasOwnProperty(C) || P === Z || P == null && Z == null))
          if (C === ac)
            if (P && Object.freeze(P), Z) {
              for (x in Z)
                Z.hasOwnProperty(x) && (!P || !P.hasOwnProperty(x)) && (R || (R = {}), R[x] = "");
              for (x in P)
                P.hasOwnProperty(x) && Z[x] !== P[x] && (R || (R = {}), R[x] = P[x]);
            } else
              R || (d || (d = []), d.push(C, R)), R = P;
          else if (C === Kp) {
            var ee = P ? P[Gm] : void 0, re = Z ? Z[Gm] : void 0;
            ee != null && re !== ee && (d = d || []).push(C, ee);
          } else C === rc ? (typeof P == "string" || typeof P == "number") && (d = d || []).push(C, "" + P) : C === Wm || C === Vu || (pt.hasOwnProperty(C) ? (P != null && (typeof P != "function" && qm(C, P), C === "onScroll" && Mn("scroll", e)), !d && Z !== P && (d = [])) : (d = d || []).push(C, P));
      }
      return R && (Ts(R, b[ac]), (d = d || []).push(ac, R)), d;
    }
    function uk(e, t, a, o, u) {
      a === "input" && u.type === "radio" && u.name != null && Bd(e, u);
      var d = Yi(a, o), h = Yi(a, u);
      switch (rk(e, t, d, h), a) {
        case "input":
          nu(e, u);
          break;
        case "textarea":
          Dh(e, u);
          break;
        case "select":
          v0(e, u);
          break;
      }
    }
    function sk(e) {
      {
        var t = e.toLowerCase();
        return $c.hasOwnProperty(t) && $c[t] || null;
      }
    }
    function ck(e, t, a, o, u, d, h) {
      var b, C;
      switch (b = Yi(t, a), Qm(t, a), t) {
        case "dialog":
          Mn("cancel", e), Mn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Mn("load", e);
          break;
        case "video":
        case "audio":
          for (var x = 0; x < Gp.length; x++)
            Mn(Gp[x], e);
          break;
        case "source":
          Mn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Mn("error", e), Mn("load", e);
          break;
        case "details":
          Mn("toggle", e);
          break;
        case "input":
          Ss(e, a), Mn("invalid", e);
          break;
        case "option":
          Nc(e, a);
          break;
        case "select":
          kh(e, a), Mn("invalid", e);
          break;
        case "textarea":
          Oh(e, a), Mn("invalid", e);
          break;
      }
      jc(t, a);
      {
        C = /* @__PURE__ */ new Set();
        for (var R = e.attributes, $ = 0; $ < R.length; $++) {
          var P = R[$].name.toLowerCase();
          switch (P) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              C.add(R[$].name);
          }
        }
      }
      var Z = null;
      for (var ee in a)
        if (a.hasOwnProperty(ee)) {
          var re = a[ee];
          if (ee === rc)
            typeof re == "string" ? e.textContent !== re && (a[Vu] !== !0 && Xm(e.textContent, re, d, h), Z = [rc, re]) : typeof re == "number" && e.textContent !== "" + re && (a[Vu] !== !0 && Xm(e.textContent, re, d, h), Z = [rc, "" + re]);
          else if (pt.hasOwnProperty(ee))
            re != null && (typeof re != "function" && qm(ee, re), ee === "onScroll" && Mn("scroll", e));
          else if (h && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof b == "boolean") {
            var Ue = void 0, ft = b && Xe ? null : ma(ee);
            if (a[Vu] !== !0) {
              if (!(ee === Wm || ee === Vu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              ee === "value" || ee === "checked" || ee === "selected")) {
                if (ee === Kp) {
                  var nt = e.innerHTML, $t = re ? re[Gm] : void 0;
                  if ($t != null) {
                    var zt = iE(e, $t);
                    zt !== nt && Xp(ee, nt, zt);
                  }
                } else if (ee === ac) {
                  if (C.delete(ee), aE) {
                    var Q = E0(re);
                    Ue = e.getAttribute("style"), Q !== Ue && Xp(ee, Ue, Q);
                  }
                } else if (b && !Xe)
                  C.delete(ee.toLowerCase()), Ue = Zl(e, ee, re), re !== Ue && Xp(ee, Ue, re);
                else if (!$n(ee, ft, b) && !pn(ee, re, ft, b)) {
                  var ae = !1;
                  if (ft !== null)
                    C.delete(ft.attributeName), Ue = il(e, ee, re, ft);
                  else {
                    var q = o;
                    if (q === Hi && (q = zc(t)), q === Hi)
                      C.delete(ee.toLowerCase());
                    else {
                      var Ee = sk(ee);
                      Ee !== null && Ee !== ee && (ae = !0, C.delete(Ee)), C.delete(ee);
                    }
                    Ue = Zl(e, ee, re);
                  }
                  var Be = Xe;
                  !Be && re !== Ue && !ae && Xp(ee, Ue, re);
                }
              }
            }
          }
        }
      switch (h && // $FlowFixMe - Should be inferred as not undefined.
      C.size > 0 && a[Vu] !== !0 && rE(C), t) {
        case "input":
          sl(e), bs(e, a, !0);
          break;
        case "textarea":
          sl(e), Mh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Zm(e);
          break;
      }
      return Z;
    }
    function fk(e, t, a) {
      var o = e.nodeValue !== t;
      return o;
    }
    function tS(e, t) {
      {
        if (Xa)
          return;
        Xa = !0, y("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function nS(e, t) {
      {
        if (Xa)
          return;
        Xa = !0, y('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function rS(e, t, a) {
      {
        if (Xa)
          return;
        Xa = !0, y("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function aS(e, t) {
      {
        if (t === "" || Xa)
          return;
        Xa = !0, y('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function dk(e, t, a) {
      switch (t) {
        case "input":
          xh(e, a);
          return;
        case "textarea":
          Gd(e, a);
          return;
        case "select":
          h0(e, a);
          return;
      }
    }
    var Zp = function() {
    }, Jp = function() {
    };
    {
      var pk = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], lE = [
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
      ], vk = lE.concat(["button"]), hk = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], uE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Jp = function(e, t) {
        var a = At({}, e || uE), o = {
          tag: t
        };
        return lE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), vk.indexOf(t) !== -1 && (a.pTagInButtonScope = null), pk.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = o, t === "form" && (a.formTag = o), t === "a" && (a.aTagInScope = o), t === "button" && (a.buttonTagInScope = o), t === "nobr" && (a.nobrTagInScope = o), t === "p" && (a.pTagInButtonScope = o), t === "li" && (a.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = o), a;
      };
      var mk = function(e, t) {
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
            return hk.indexOf(t) === -1;
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
      }, yk = function(e, t) {
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
      }, sE = {};
      Zp = function(e, t, a) {
        a = a || uE;
        var o = a.current, u = o && o.tag;
        t != null && (e != null && y("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var d = mk(e, u) ? null : o, h = d ? null : yk(e, a), b = d || h;
        if (b) {
          var C = b.tag, x = !!d + "|" + e + "|" + C;
          if (!sE[x]) {
            sE[x] = !0;
            var R = e, $ = "";
            if (e === "#text" ? /\S/.test(t) ? R = "Text nodes" : (R = "Whitespace text nodes", $ = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : R = "<" + e + ">", d) {
              var P = "";
              C === "table" && e === "tr" && (P += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), y("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", R, C, $, P);
            } else
              y("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", R, C);
          }
        }
      };
    }
    var Jm = "suppressHydrationWarning", ey = "$", ty = "/$", ev = "$?", tv = "$!", gk = "style", iS = null, oS = null;
    function Sk(e) {
      var t, a, o = e.nodeType;
      switch (o) {
        case ci:
        case cl: {
          t = o === ci ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : qd(null, "");
          break;
        }
        default: {
          var d = o === Wn ? e.parentNode : e, h = d.namespaceURI || null;
          t = d.tagName, a = qd(h, t);
          break;
        }
      }
      {
        var b = t.toLowerCase(), C = Jp(null, b);
        return {
          namespace: a,
          ancestorInfo: C
        };
      }
    }
    function bk(e, t, a) {
      {
        var o = e, u = qd(o.namespace, t), d = Jp(o.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: d
        };
      }
    }
    function u5(e) {
      return e;
    }
    function Ck(e) {
      iS = Lu(), oS = z_();
      var t = null;
      return sa(!1), t;
    }
    function Ek(e) {
      U_(oS), sa(iS), iS = null, oS = null;
    }
    function Tk(e, t, a, o, u) {
      var d;
      {
        var h = o;
        if (Zp(e, null, h.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var b = "" + t.children, C = Jp(h.ancestorInfo, e);
          Zp(null, b, C);
        }
        d = h.namespace;
      }
      var x = ak(e, t, a, d);
      return av(u, x), vS(x, t), x;
    }
    function xk(e, t) {
      e.appendChild(t);
    }
    function wk(e, t, a, o, u) {
      switch (ok(e, t, a, o), t) {
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
    function Rk(e, t, a, o, u, d) {
      {
        var h = d;
        if (typeof o.children != typeof a.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var b = "" + o.children, C = Jp(h.ancestorInfo, t);
          Zp(null, b, C);
        }
      }
      return lk(e, t, a, o);
    }
    function lS(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function _k(e, t, a, o) {
      {
        var u = a;
        Zp(null, e, u.ancestorInfo);
      }
      var d = ik(e, t);
      return av(o, d), d;
    }
    function kk() {
      var e = window.event;
      return e === void 0 ? Ri : Mf(e.type);
    }
    var uS = typeof setTimeout == "function" ? setTimeout : void 0, Ok = typeof clearTimeout == "function" ? clearTimeout : void 0, sS = -1, cE = typeof Promise == "function" ? Promise : void 0, Dk = typeof queueMicrotask == "function" ? queueMicrotask : typeof cE < "u" ? function(e) {
      return cE.resolve(null).then(e).catch(Mk);
    } : uS;
    function Mk(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function Ak(e, t, a, o) {
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
    function Nk(e, t, a, o, u, d) {
      uk(e, t, a, o, u), vS(e, u);
    }
    function fE(e) {
      Fc(e, "");
    }
    function Lk(e, t, a) {
      e.nodeValue = a;
    }
    function zk(e, t) {
      e.appendChild(t);
    }
    function Uk(e, t) {
      var a;
      e.nodeType === Wn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var o = e._reactRootContainer;
      o == null && a.onclick === null && Zm(a);
    }
    function Fk(e, t, a) {
      e.insertBefore(t, a);
    }
    function Pk(e, t, a) {
      e.nodeType === Wn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function jk(e, t) {
      e.removeChild(t);
    }
    function $k(e, t) {
      e.nodeType === Wn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function cS(e, t) {
      var a = t, o = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Wn) {
          var d = u.data;
          if (d === ty)
            if (o === 0) {
              e.removeChild(u), Un(t);
              return;
            } else
              o--;
          else (d === ey || d === ev || d === tv) && o++;
        }
        a = u;
      } while (a);
      Un(t);
    }
    function Vk(e, t) {
      e.nodeType === Wn ? cS(e.parentNode, t) : e.nodeType === Jr && cS(e, t), Un(e);
    }
    function Bk(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function Hk(e) {
      e.nodeValue = "";
    }
    function Ik(e, t) {
      e = e;
      var a = t[gk], o = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Pc("display", o);
    }
    function Yk(e, t) {
      e.nodeValue = t;
    }
    function Wk(e) {
      e.nodeType === Jr ? e.textContent = "" : e.nodeType === ci && e.documentElement && e.removeChild(e.documentElement);
    }
    function Gk(e, t, a) {
      return e.nodeType !== Jr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function Qk(e, t) {
      return t === "" || e.nodeType !== Ii ? null : e;
    }
    function qk(e) {
      return e.nodeType !== Wn ? null : e;
    }
    function dE(e) {
      return e.data === ev;
    }
    function fS(e) {
      return e.data === tv;
    }
    function Kk(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, o, u;
      return t && (a = t.dgst, o = t.msg, u = t.stck), {
        message: o,
        digest: a,
        stack: u
      };
    }
    function Xk(e, t) {
      e._reactRetry = t;
    }
    function ny(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Jr || t === Ii)
          break;
        if (t === Wn) {
          var a = e.data;
          if (a === ey || a === tv || a === ev)
            break;
          if (a === ty)
            return null;
        }
      }
      return e;
    }
    function nv(e) {
      return ny(e.nextSibling);
    }
    function Zk(e) {
      return ny(e.firstChild);
    }
    function Jk(e) {
      return ny(e.firstChild);
    }
    function eO(e) {
      return ny(e.nextSibling);
    }
    function tO(e, t, a, o, u, d, h) {
      av(d, e), vS(e, a);
      var b;
      {
        var C = u;
        b = C.namespace;
      }
      var x = (d.mode & tt) !== Ze;
      return ck(e, t, a, b, o, x, h);
    }
    function nO(e, t, a, o) {
      return av(a, e), a.mode & tt, fk(e, t);
    }
    function rO(e, t) {
      av(t, e);
    }
    function aO(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === ty) {
            if (a === 0)
              return nv(t);
            a--;
          } else (o === ey || o === tv || o === ev) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function pE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === ey || o === tv || o === ev) {
            if (a === 0)
              return t;
            a--;
          } else o === ty && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function iO(e) {
      Un(e);
    }
    function oO(e) {
      Un(e);
    }
    function lO(e) {
      return e !== "head" && e !== "body";
    }
    function uO(e, t, a, o) {
      var u = !0;
      Xm(t.nodeValue, a, o, u);
    }
    function sO(e, t, a, o, u, d) {
      if (t[Jm] !== !0) {
        var h = !0;
        Xm(o.nodeValue, u, d, h);
      }
    }
    function cO(e, t) {
      t.nodeType === Jr ? tS(e, t) : t.nodeType === Wn || nS(e, t);
    }
    function fO(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Jr ? tS(a, t) : t.nodeType === Wn || nS(a, t));
      }
    }
    function dO(e, t, a, o, u) {
      (u || t[Jm] !== !0) && (o.nodeType === Jr ? tS(a, o) : o.nodeType === Wn || nS(a, o));
    }
    function pO(e, t, a) {
      rS(e, t);
    }
    function vO(e, t) {
      aS(e, t);
    }
    function hO(e, t, a) {
      {
        var o = e.parentNode;
        o !== null && rS(o, t);
      }
    }
    function mO(e, t) {
      {
        var a = e.parentNode;
        a !== null && aS(a, t);
      }
    }
    function yO(e, t, a, o, u, d) {
      (d || t[Jm] !== !0) && rS(a, o);
    }
    function gO(e, t, a, o, u) {
      (u || t[Jm] !== !0) && aS(a, o);
    }
    function SO(e) {
      y("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function bO(e) {
      Qp(e);
    }
    var qf = Math.random().toString(36).slice(2), Kf = "__reactFiber$" + qf, dS = "__reactProps$" + qf, rv = "__reactContainer$" + qf, pS = "__reactEvents$" + qf, CO = "__reactListeners$" + qf, EO = "__reactHandles$" + qf;
    function TO(e) {
      delete e[Kf], delete e[dS], delete e[pS], delete e[CO], delete e[EO];
    }
    function av(e, t) {
      t[Kf] = e;
    }
    function ry(e, t) {
      t[rv] = e;
    }
    function vE(e) {
      e[rv] = null;
    }
    function iv(e) {
      return !!e[rv];
    }
    function ic(e) {
      var t = e[Kf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[rv] || a[Kf], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var u = pE(e); u !== null; ) {
              var d = u[Kf];
              if (d)
                return d;
              u = pE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Bu(e) {
      var t = e[Kf] || e[rv];
      return t && (t.tag === H || t.tag === I || t.tag === V || t.tag === O) ? t : null;
    }
    function Xf(e) {
      if (e.tag === H || e.tag === I)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function ay(e) {
      return e[dS] || null;
    }
    function vS(e, t) {
      e[dS] = t;
    }
    function xO(e) {
      var t = e[pS];
      return t === void 0 && (t = e[pS] = /* @__PURE__ */ new Set()), t;
    }
    var hE = {}, mE = c.ReactDebugCurrentFrame;
    function iy(e) {
      if (e) {
        var t = e._owner, a = ds(e.type, e._source, t ? t.type : null);
        mE.setExtraStackFrame(a);
      } else
        mE.setExtraStackFrame(null);
    }
    function ro(e, t, a, o, u) {
      {
        var d = Function.call.bind(Le);
        for (var h in e)
          if (d(e, h)) {
            var b = void 0;
            try {
              if (typeof e[h] != "function") {
                var C = Error((o || "React class") + ": " + a + " type `" + h + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[h] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              b = e[h](t, h, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              b = x;
            }
            b && !(b instanceof Error) && (iy(u), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, h, typeof b), iy(null)), b instanceof Error && !(b.message in hE) && (hE[b.message] = !0, iy(u), y("Failed %s type: %s", a, b.message), iy(null));
          }
      }
    }
    var hS = [], oy;
    oy = [];
    var Ll = -1;
    function Hu(e) {
      return {
        current: e
      };
    }
    function ca(e, t) {
      if (Ll < 0) {
        y("Unexpected pop.");
        return;
      }
      t !== oy[Ll] && y("Unexpected Fiber popped."), e.current = hS[Ll], hS[Ll] = null, oy[Ll] = null, Ll--;
    }
    function fa(e, t, a) {
      Ll++, hS[Ll] = e.current, oy[Ll] = a, e.current = t;
    }
    var mS;
    mS = {};
    var vi = {};
    Object.freeze(vi);
    var zl = Hu(vi), Fo = Hu(!1), yS = vi;
    function Zf(e, t, a) {
      return a && Po(t) ? yS : zl.current;
    }
    function yE(e, t, a) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Jf(e, t) {
      {
        var a = e.type, o = a.contextTypes;
        if (!o)
          return vi;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var h in o)
          d[h] = t[h];
        {
          var b = Rt(e) || "Unknown";
          ro(o, d, "context", b);
        }
        return u && yE(e, t, d), d;
      }
    }
    function ly() {
      return Fo.current;
    }
    function Po(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function uy(e) {
      ca(Fo, e), ca(zl, e);
    }
    function gS(e) {
      ca(Fo, e), ca(zl, e);
    }
    function gE(e, t, a) {
      {
        if (zl.current !== vi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        fa(zl, t, e), fa(Fo, a, e);
      }
    }
    function SE(e, t, a) {
      {
        var o = e.stateNode, u = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var d = Rt(e) || "Unknown";
            mS[d] || (mS[d] = !0, y("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return a;
        }
        var h = o.getChildContext();
        for (var b in h)
          if (!(b in u))
            throw new Error((Rt(e) || "Unknown") + '.getChildContext(): key "' + b + '" is not defined in childContextTypes.');
        {
          var C = Rt(e) || "Unknown";
          ro(u, h, "child context", C);
        }
        return At({}, a, h);
      }
    }
    function sy(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || vi;
        return yS = zl.current, fa(zl, a, e), fa(Fo, Fo.current, e), !0;
      }
    }
    function bE(e, t, a) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = SE(e, t, yS);
          o.__reactInternalMemoizedMergedChildContext = u, ca(Fo, e), ca(zl, e), fa(zl, u, e), fa(Fo, a, e);
        } else
          ca(Fo, e), fa(Fo, a, e);
      }
    }
    function wO(e) {
      {
        if (!hp(e) || e.tag !== k)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case O:
              return t.stateNode.context;
            case k: {
              var a = t.type;
              if (Po(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Iu = 0, cy = 1, Ul = null, SS = !1, bS = !1;
    function CE(e) {
      Ul === null ? Ul = [e] : Ul.push(e);
    }
    function RO(e) {
      SS = !0, CE(e);
    }
    function EE() {
      SS && Yu();
    }
    function Yu() {
      if (!bS && Ul !== null) {
        bS = !0;
        var e = 0, t = Wa();
        try {
          var a = !0, o = Ul;
          for (zn(Bn); e < o.length; e++) {
            var u = o[e];
            do
              u = u(a);
            while (u !== null);
          }
          Ul = null, SS = !1;
        } catch (d) {
          throw Ul !== null && (Ul = Ul.slice(e + 1)), qc(Xc, Yu), d;
        } finally {
          zn(t), bS = !1;
        }
      }
      return null;
    }
    var ed = [], td = 0, fy = null, dy = 0, Di = [], Mi = 0, oc = null, Fl = 1, Pl = "";
    function _O(e) {
      return uc(), (e.flags & dp) !== st;
    }
    function kO(e) {
      return uc(), dy;
    }
    function OO() {
      var e = Pl, t = Fl, a = t & ~DO(t);
      return a.toString(32) + e;
    }
    function lc(e, t) {
      uc(), ed[td++] = dy, ed[td++] = fy, fy = e, dy = t;
    }
    function TE(e, t, a) {
      uc(), Di[Mi++] = Fl, Di[Mi++] = Pl, Di[Mi++] = oc, oc = e;
      var o = Fl, u = Pl, d = py(o) - 1, h = o & ~(1 << d), b = a + 1, C = py(t) + d;
      if (C > 30) {
        var x = d - d % 5, R = (1 << x) - 1, $ = (h & R).toString(32), P = h >> x, Z = d - x, ee = py(t) + Z, re = b << Z, Ue = re | P, ft = $ + u;
        Fl = 1 << ee | Ue, Pl = ft;
      } else {
        var nt = b << d, $t = nt | h, zt = u;
        Fl = 1 << C | $t, Pl = zt;
      }
    }
    function CS(e) {
      uc();
      var t = e.return;
      if (t !== null) {
        var a = 1, o = 0;
        lc(e, a), TE(e, a, o);
      }
    }
    function py(e) {
      return 32 - yu(e);
    }
    function DO(e) {
      return 1 << py(e) - 1;
    }
    function ES(e) {
      for (; e === fy; )
        fy = ed[--td], ed[td] = null, dy = ed[--td], ed[td] = null;
      for (; e === oc; )
        oc = Di[--Mi], Di[Mi] = null, Pl = Di[--Mi], Di[Mi] = null, Fl = Di[--Mi], Di[Mi] = null;
    }
    function MO() {
      return uc(), oc !== null ? {
        id: Fl,
        overflow: Pl
      } : null;
    }
    function AO(e, t) {
      uc(), Di[Mi++] = Fl, Di[Mi++] = Pl, Di[Mi++] = oc, Fl = t.id, Pl = t.overflow, oc = e;
    }
    function uc() {
      Vr() || y("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var $r = null, Ai = null, ao = !1, sc = !1, Wu = null;
    function NO() {
      ao && y("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function xE() {
      sc = !0;
    }
    function LO() {
      return sc;
    }
    function zO(e) {
      var t = e.stateNode.containerInfo;
      return Ai = Jk(t), $r = e, ao = !0, Wu = null, sc = !1, !0;
    }
    function UO(e, t, a) {
      return Ai = eO(t), $r = e, ao = !0, Wu = null, sc = !1, a !== null && AO(e, a), !0;
    }
    function wE(e, t) {
      switch (e.tag) {
        case O: {
          cO(e.stateNode.containerInfo, t);
          break;
        }
        case H: {
          var a = (e.mode & tt) !== Ze;
          dO(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case V: {
          var o = e.memoizedState;
          o.dehydrated !== null && fO(o.dehydrated, t);
          break;
        }
      }
    }
    function RE(e, t) {
      wE(e, t);
      var a = $A();
      a.stateNode = t, a.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [a], e.flags |= Gt) : o.push(a);
    }
    function TS(e, t) {
      {
        if (sc)
          return;
        switch (e.tag) {
          case O: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case H:
                var o = t.type;
                t.pendingProps, pO(a, o);
                break;
              case I:
                var u = t.pendingProps;
                vO(a, u);
                break;
            }
            break;
          }
          case H: {
            var d = e.type, h = e.memoizedProps, b = e.stateNode;
            switch (t.tag) {
              case H: {
                var C = t.type, x = t.pendingProps, R = (e.mode & tt) !== Ze;
                yO(
                  d,
                  h,
                  b,
                  C,
                  x,
                  // TODO: Delete this argument when we remove the legacy root API.
                  R
                );
                break;
              }
              case I: {
                var $ = t.pendingProps, P = (e.mode & tt) !== Ze;
                gO(
                  d,
                  h,
                  b,
                  $,
                  // TODO: Delete this argument when we remove the legacy root API.
                  P
                );
                break;
              }
            }
            break;
          }
          case V: {
            var Z = e.memoizedState, ee = Z.dehydrated;
            if (ee !== null) switch (t.tag) {
              case H:
                var re = t.type;
                t.pendingProps, hO(ee, re);
                break;
              case I:
                var Ue = t.pendingProps;
                mO(ee, Ue);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function _E(e, t) {
      t.flags = t.flags & ~$a | gn, TS(e, t);
    }
    function kE(e, t) {
      switch (e.tag) {
        case H: {
          var a = e.type;
          e.pendingProps;
          var o = Gk(t, a);
          return o !== null ? (e.stateNode = o, $r = e, Ai = Zk(o), !0) : !1;
        }
        case I: {
          var u = e.pendingProps, d = Qk(t, u);
          return d !== null ? (e.stateNode = d, $r = e, Ai = null, !0) : !1;
        }
        case V: {
          var h = qk(t);
          if (h !== null) {
            var b = {
              dehydrated: h,
              treeContext: MO(),
              retryLane: zr
            };
            e.memoizedState = b;
            var C = VA(h);
            return C.return = e, e.child = C, $r = e, Ai = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function xS(e) {
      return (e.mode & tt) !== Ze && (e.flags & bt) === st;
    }
    function wS(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function RS(e) {
      if (ao) {
        var t = Ai;
        if (!t) {
          xS(e) && (TS($r, e), wS()), _E($r, e), ao = !1, $r = e;
          return;
        }
        var a = t;
        if (!kE(e, t)) {
          xS(e) && (TS($r, e), wS()), t = nv(a);
          var o = $r;
          if (!t || !kE(e, t)) {
            _E($r, e), ao = !1, $r = e;
            return;
          }
          RE(o, a);
        }
      }
    }
    function FO(e, t, a) {
      var o = e.stateNode, u = !sc, d = tO(o, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = d, d !== null;
    }
    function PO(e) {
      var t = e.stateNode, a = e.memoizedProps, o = nO(t, a, e);
      if (o) {
        var u = $r;
        if (u !== null)
          switch (u.tag) {
            case O: {
              var d = u.stateNode.containerInfo, h = (u.mode & tt) !== Ze;
              uO(
                d,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                h
              );
              break;
            }
            case H: {
              var b = u.type, C = u.memoizedProps, x = u.stateNode, R = (u.mode & tt) !== Ze;
              sO(
                b,
                C,
                x,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                R
              );
              break;
            }
          }
      }
      return o;
    }
    function jO(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      rO(a, e);
    }
    function $O(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return aO(a);
    }
    function OE(e) {
      for (var t = e.return; t !== null && t.tag !== H && t.tag !== O && t.tag !== V; )
        t = t.return;
      $r = t;
    }
    function vy(e) {
      if (e !== $r)
        return !1;
      if (!ao)
        return OE(e), ao = !0, !1;
      if (e.tag !== O && (e.tag !== H || lO(e.type) && !lS(e.type, e.memoizedProps))) {
        var t = Ai;
        if (t)
          if (xS(e))
            DE(e), wS();
          else
            for (; t; )
              RE(e, t), t = nv(t);
      }
      return OE(e), e.tag === V ? Ai = $O(e) : Ai = $r ? nv(e.stateNode) : null, !0;
    }
    function VO() {
      return ao && Ai !== null;
    }
    function DE(e) {
      for (var t = Ai; t; )
        wE(e, t), t = nv(t);
    }
    function nd() {
      $r = null, Ai = null, ao = !1, sc = !1;
    }
    function ME() {
      Wu !== null && (xx(Wu), Wu = null);
    }
    function Vr() {
      return ao;
    }
    function _S(e) {
      Wu === null ? Wu = [e] : Wu.push(e);
    }
    var BO = c.ReactCurrentBatchConfig, HO = null;
    function IO() {
      return BO.transition;
    }
    var io = {
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
      var YO = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Nt && (t = a), a = a.return;
        return t;
      }, cc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, ov = [], lv = [], uv = [], sv = [], cv = [], fv = [], fc = /* @__PURE__ */ new Set();
      io.recordUnsafeLifecycleWarnings = function(e, t) {
        fc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && ov.push(e), e.mode & Nt && typeof t.UNSAFE_componentWillMount == "function" && lv.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && uv.push(e), e.mode & Nt && typeof t.UNSAFE_componentWillReceiveProps == "function" && sv.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && cv.push(e), e.mode & Nt && typeof t.UNSAFE_componentWillUpdate == "function" && fv.push(e));
      }, io.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        ov.length > 0 && (ov.forEach(function(P) {
          e.add(Rt(P) || "Component"), fc.add(P.type);
        }), ov = []);
        var t = /* @__PURE__ */ new Set();
        lv.length > 0 && (lv.forEach(function(P) {
          t.add(Rt(P) || "Component"), fc.add(P.type);
        }), lv = []);
        var a = /* @__PURE__ */ new Set();
        uv.length > 0 && (uv.forEach(function(P) {
          a.add(Rt(P) || "Component"), fc.add(P.type);
        }), uv = []);
        var o = /* @__PURE__ */ new Set();
        sv.length > 0 && (sv.forEach(function(P) {
          o.add(Rt(P) || "Component"), fc.add(P.type);
        }), sv = []);
        var u = /* @__PURE__ */ new Set();
        cv.length > 0 && (cv.forEach(function(P) {
          u.add(Rt(P) || "Component"), fc.add(P.type);
        }), cv = []);
        var d = /* @__PURE__ */ new Set();
        if (fv.length > 0 && (fv.forEach(function(P) {
          d.add(Rt(P) || "Component"), fc.add(P.type);
        }), fv = []), t.size > 0) {
          var h = cc(t);
          y(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, h);
        }
        if (o.size > 0) {
          var b = cc(o);
          y(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, b);
        }
        if (d.size > 0) {
          var C = cc(d);
          y(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, C);
        }
        if (e.size > 0) {
          var x = cc(e);
          S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
        if (a.size > 0) {
          var R = cc(a);
          S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, R);
        }
        if (u.size > 0) {
          var $ = cc(u);
          S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, $);
        }
      };
      var hy = /* @__PURE__ */ new Map(), AE = /* @__PURE__ */ new Set();
      io.recordLegacyContextWarning = function(e, t) {
        var a = YO(e);
        if (a === null) {
          y("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!AE.has(e.type)) {
          var o = hy.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], hy.set(a, o)), o.push(e));
        }
      }, io.flushLegacyContextWarning = function() {
        hy.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              o.add(Rt(d) || "Component"), AE.add(d.type);
            });
            var u = cc(o);
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
      }, io.discardPendingWarnings = function() {
        ov = [], lv = [], uv = [], sv = [], cv = [], fv = [], hy = /* @__PURE__ */ new Map();
      };
    }
    var kS, OS, DS, MS, AS, NE = function(e, t) {
    };
    kS = !1, OS = !1, DS = {}, MS = {}, AS = {}, NE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Rt(t) || "Component";
        MS[a] || (MS[a] = !0, y('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function WO(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function dv(e, t, a) {
      var o = a.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & Nt || Pe) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== k) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !WO(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Rt(e) || "Component";
          DS[u] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, o), DS[u] = !0);
        }
        if (a._owner) {
          var d = a._owner, h;
          if (d) {
            var b = d;
            if (b.tag !== k)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            h = b.stateNode;
          }
          if (!h)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var C = h;
          ne(o, "ref");
          var x = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === x)
            return t.ref;
          var R = function($) {
            var P = C.refs;
            $ === null ? delete P[x] : P[x] = $;
          };
          return R._stringRef = x, R;
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
    function my(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function yy(e) {
      {
        var t = Rt(e) || "Component";
        if (AS[t])
          return;
        AS[t] = !0, y("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function LE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function zE(e) {
      function t(Q, ae) {
        if (e) {
          var q = Q.deletions;
          q === null ? (Q.deletions = [ae], Q.flags |= Gt) : q.push(ae);
        }
      }
      function a(Q, ae) {
        if (!e)
          return null;
        for (var q = ae; q !== null; )
          t(Q, q), q = q.sibling;
        return null;
      }
      function o(Q, ae) {
        for (var q = /* @__PURE__ */ new Map(), Ee = ae; Ee !== null; )
          Ee.key !== null ? q.set(Ee.key, Ee) : q.set(Ee.index, Ee), Ee = Ee.sibling;
        return q;
      }
      function u(Q, ae) {
        var q = bc(Q, ae);
        return q.index = 0, q.sibling = null, q;
      }
      function d(Q, ae, q) {
        if (Q.index = q, !e)
          return Q.flags |= dp, ae;
        var Ee = Q.alternate;
        if (Ee !== null) {
          var Be = Ee.index;
          return Be < ae ? (Q.flags |= gn, ae) : Be;
        } else
          return Q.flags |= gn, ae;
      }
      function h(Q) {
        return e && Q.alternate === null && (Q.flags |= gn), Q;
      }
      function b(Q, ae, q, Ee) {
        if (ae === null || ae.tag !== I) {
          var Be = _1(q, Q.mode, Ee);
          return Be.return = Q, Be;
        } else {
          var Fe = u(ae, q);
          return Fe.return = Q, Fe;
        }
      }
      function C(Q, ae, q, Ee) {
        var Be = q.type;
        if (Be === oi)
          return R(Q, ae, q.props.children, Ee, q.key);
        if (ae !== null && (ae.elementType === Be || // Keep this check inline so it only runs on the false path:
        $x(ae, q) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Be == "object" && Be !== null && Be.$$typeof === mt && LE(Be) === ae.type)) {
          var Fe = u(ae, q.props);
          return Fe.ref = dv(Q, ae, q), Fe.return = Q, Fe._debugSource = q._source, Fe._debugOwner = q._owner, Fe;
        }
        var St = R1(q, Q.mode, Ee);
        return St.ref = dv(Q, ae, q), St.return = Q, St;
      }
      function x(Q, ae, q, Ee) {
        if (ae === null || ae.tag !== z || ae.stateNode.containerInfo !== q.containerInfo || ae.stateNode.implementation !== q.implementation) {
          var Be = k1(q, Q.mode, Ee);
          return Be.return = Q, Be;
        } else {
          var Fe = u(ae, q.children || []);
          return Fe.return = Q, Fe;
        }
      }
      function R(Q, ae, q, Ee, Be) {
        if (ae === null || ae.tag !== B) {
          var Fe = rs(q, Q.mode, Ee, Be);
          return Fe.return = Q, Fe;
        } else {
          var St = u(ae, q);
          return St.return = Q, St;
        }
      }
      function $(Q, ae, q) {
        if (typeof ae == "string" && ae !== "" || typeof ae == "number") {
          var Ee = _1("" + ae, Q.mode, q);
          return Ee.return = Q, Ee;
        }
        if (typeof ae == "object" && ae !== null) {
          switch (ae.$$typeof) {
            case Vi: {
              var Be = R1(ae, Q.mode, q);
              return Be.ref = dv(Q, null, ae), Be.return = Q, Be;
            }
            case ya: {
              var Fe = k1(ae, Q.mode, q);
              return Fe.return = Q, Fe;
            }
            case mt: {
              var St = ae._payload, wt = ae._init;
              return $(Q, wt(St), q);
            }
          }
          if (cr(ae) || ga(ae)) {
            var an = rs(ae, Q.mode, q, null);
            return an.return = Q, an;
          }
          my(Q, ae);
        }
        return typeof ae == "function" && yy(Q), null;
      }
      function P(Q, ae, q, Ee) {
        var Be = ae !== null ? ae.key : null;
        if (typeof q == "string" && q !== "" || typeof q == "number")
          return Be !== null ? null : b(Q, ae, "" + q, Ee);
        if (typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case Vi:
              return q.key === Be ? C(Q, ae, q, Ee) : null;
            case ya:
              return q.key === Be ? x(Q, ae, q, Ee) : null;
            case mt: {
              var Fe = q._payload, St = q._init;
              return P(Q, ae, St(Fe), Ee);
            }
          }
          if (cr(q) || ga(q))
            return Be !== null ? null : R(Q, ae, q, Ee, null);
          my(Q, q);
        }
        return typeof q == "function" && yy(Q), null;
      }
      function Z(Q, ae, q, Ee, Be) {
        if (typeof Ee == "string" && Ee !== "" || typeof Ee == "number") {
          var Fe = Q.get(q) || null;
          return b(ae, Fe, "" + Ee, Be);
        }
        if (typeof Ee == "object" && Ee !== null) {
          switch (Ee.$$typeof) {
            case Vi: {
              var St = Q.get(Ee.key === null ? q : Ee.key) || null;
              return C(ae, St, Ee, Be);
            }
            case ya: {
              var wt = Q.get(Ee.key === null ? q : Ee.key) || null;
              return x(ae, wt, Ee, Be);
            }
            case mt:
              var an = Ee._payload, It = Ee._init;
              return Z(Q, ae, q, It(an), Be);
          }
          if (cr(Ee) || ga(Ee)) {
            var ar = Q.get(q) || null;
            return R(ae, ar, Ee, Be, null);
          }
          my(ae, Ee);
        }
        return typeof Ee == "function" && yy(ae), null;
      }
      function ee(Q, ae, q) {
        {
          if (typeof Q != "object" || Q === null)
            return ae;
          switch (Q.$$typeof) {
            case Vi:
            case ya:
              NE(Q, q);
              var Ee = Q.key;
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
            case mt:
              var Be = Q._payload, Fe = Q._init;
              ee(Fe(Be), ae, q);
              break;
          }
        }
        return ae;
      }
      function re(Q, ae, q, Ee) {
        for (var Be = null, Fe = 0; Fe < q.length; Fe++) {
          var St = q[Fe];
          Be = ee(St, Be, Q);
        }
        for (var wt = null, an = null, It = ae, ar = 0, Yt = 0, qn = null; It !== null && Yt < q.length; Yt++) {
          It.index > Yt ? (qn = It, It = null) : qn = It.sibling;
          var pa = P(Q, It, q[Yt], Ee);
          if (pa === null) {
            It === null && (It = qn);
            break;
          }
          e && It && pa.alternate === null && t(Q, It), ar = d(pa, ar, Yt), an === null ? wt = pa : an.sibling = pa, an = pa, It = qn;
        }
        if (Yt === q.length) {
          if (a(Q, It), Vr()) {
            var Qr = Yt;
            lc(Q, Qr);
          }
          return wt;
        }
        if (It === null) {
          for (; Yt < q.length; Yt++) {
            var mi = $(Q, q[Yt], Ee);
            mi !== null && (ar = d(mi, ar, Yt), an === null ? wt = mi : an.sibling = mi, an = mi);
          }
          if (Vr()) {
            var Oa = Yt;
            lc(Q, Oa);
          }
          return wt;
        }
        for (var Da = o(Q, It); Yt < q.length; Yt++) {
          var va = Z(Da, Q, Yt, q[Yt], Ee);
          va !== null && (e && va.alternate !== null && Da.delete(va.key === null ? Yt : va.key), ar = d(va, ar, Yt), an === null ? wt = va : an.sibling = va, an = va);
        }
        if (e && Da.forEach(function(Cd) {
          return t(Q, Cd);
        }), Vr()) {
          var Yl = Yt;
          lc(Q, Yl);
        }
        return wt;
      }
      function Ue(Q, ae, q, Ee) {
        var Be = ga(q);
        if (typeof Be != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          q[Symbol.toStringTag] === "Generator" && (OS || y("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), OS = !0), q.entries === Be && (kS || y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), kS = !0);
          var Fe = Be.call(q);
          if (Fe)
            for (var St = null, wt = Fe.next(); !wt.done; wt = Fe.next()) {
              var an = wt.value;
              St = ee(an, St, Q);
            }
        }
        var It = Be.call(q);
        if (It == null)
          throw new Error("An iterable object provided no iterator.");
        for (var ar = null, Yt = null, qn = ae, pa = 0, Qr = 0, mi = null, Oa = It.next(); qn !== null && !Oa.done; Qr++, Oa = It.next()) {
          qn.index > Qr ? (mi = qn, qn = null) : mi = qn.sibling;
          var Da = P(Q, qn, Oa.value, Ee);
          if (Da === null) {
            qn === null && (qn = mi);
            break;
          }
          e && qn && Da.alternate === null && t(Q, qn), pa = d(Da, pa, Qr), Yt === null ? ar = Da : Yt.sibling = Da, Yt = Da, qn = mi;
        }
        if (Oa.done) {
          if (a(Q, qn), Vr()) {
            var va = Qr;
            lc(Q, va);
          }
          return ar;
        }
        if (qn === null) {
          for (; !Oa.done; Qr++, Oa = It.next()) {
            var Yl = $(Q, Oa.value, Ee);
            Yl !== null && (pa = d(Yl, pa, Qr), Yt === null ? ar = Yl : Yt.sibling = Yl, Yt = Yl);
          }
          if (Vr()) {
            var Cd = Qr;
            lc(Q, Cd);
          }
          return ar;
        }
        for (var Iv = o(Q, qn); !Oa.done; Qr++, Oa = It.next()) {
          var Wo = Z(Iv, Q, Qr, Oa.value, Ee);
          Wo !== null && (e && Wo.alternate !== null && Iv.delete(Wo.key === null ? Qr : Wo.key), pa = d(Wo, pa, Qr), Yt === null ? ar = Wo : Yt.sibling = Wo, Yt = Wo);
        }
        if (e && Iv.forEach(function(gN) {
          return t(Q, gN);
        }), Vr()) {
          var yN = Qr;
          lc(Q, yN);
        }
        return ar;
      }
      function ft(Q, ae, q, Ee) {
        if (ae !== null && ae.tag === I) {
          a(Q, ae.sibling);
          var Be = u(ae, q);
          return Be.return = Q, Be;
        }
        a(Q, ae);
        var Fe = _1(q, Q.mode, Ee);
        return Fe.return = Q, Fe;
      }
      function nt(Q, ae, q, Ee) {
        for (var Be = q.key, Fe = ae; Fe !== null; ) {
          if (Fe.key === Be) {
            var St = q.type;
            if (St === oi) {
              if (Fe.tag === B) {
                a(Q, Fe.sibling);
                var wt = u(Fe, q.props.children);
                return wt.return = Q, wt._debugSource = q._source, wt._debugOwner = q._owner, wt;
              }
            } else if (Fe.elementType === St || // Keep this check inline so it only runs on the false path:
            $x(Fe, q) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof St == "object" && St !== null && St.$$typeof === mt && LE(St) === Fe.type) {
              a(Q, Fe.sibling);
              var an = u(Fe, q.props);
              return an.ref = dv(Q, Fe, q), an.return = Q, an._debugSource = q._source, an._debugOwner = q._owner, an;
            }
            a(Q, Fe);
            break;
          } else
            t(Q, Fe);
          Fe = Fe.sibling;
        }
        if (q.type === oi) {
          var It = rs(q.props.children, Q.mode, Ee, q.key);
          return It.return = Q, It;
        } else {
          var ar = R1(q, Q.mode, Ee);
          return ar.ref = dv(Q, ae, q), ar.return = Q, ar;
        }
      }
      function $t(Q, ae, q, Ee) {
        for (var Be = q.key, Fe = ae; Fe !== null; ) {
          if (Fe.key === Be)
            if (Fe.tag === z && Fe.stateNode.containerInfo === q.containerInfo && Fe.stateNode.implementation === q.implementation) {
              a(Q, Fe.sibling);
              var St = u(Fe, q.children || []);
              return St.return = Q, St;
            } else {
              a(Q, Fe);
              break;
            }
          else
            t(Q, Fe);
          Fe = Fe.sibling;
        }
        var wt = k1(q, Q.mode, Ee);
        return wt.return = Q, wt;
      }
      function zt(Q, ae, q, Ee) {
        var Be = typeof q == "object" && q !== null && q.type === oi && q.key === null;
        if (Be && (q = q.props.children), typeof q == "object" && q !== null) {
          switch (q.$$typeof) {
            case Vi:
              return h(nt(Q, ae, q, Ee));
            case ya:
              return h($t(Q, ae, q, Ee));
            case mt:
              var Fe = q._payload, St = q._init;
              return zt(Q, ae, St(Fe), Ee);
          }
          if (cr(q))
            return re(Q, ae, q, Ee);
          if (ga(q))
            return Ue(Q, ae, q, Ee);
          my(Q, q);
        }
        return typeof q == "string" && q !== "" || typeof q == "number" ? h(ft(Q, ae, "" + q, Ee)) : (typeof q == "function" && yy(Q), a(Q, ae));
      }
      return zt;
    }
    var rd = zE(!0), UE = zE(!1);
    function GO(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, o = bc(a, a.pendingProps);
        for (t.child = o, o.return = t; a.sibling !== null; )
          a = a.sibling, o = o.sibling = bc(a, a.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function QO(e, t) {
      for (var a = e.child; a !== null; )
        zA(a, t), a = a.sibling;
    }
    var NS = Hu(null), LS;
    LS = {};
    var gy = null, ad = null, zS = null, Sy = !1;
    function by() {
      gy = null, ad = null, zS = null, Sy = !1;
    }
    function FE() {
      Sy = !0;
    }
    function PE() {
      Sy = !1;
    }
    function jE(e, t, a) {
      fa(NS, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== LS && y("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = LS;
    }
    function US(e, t) {
      var a = NS.current;
      ca(NS, t), e._currentValue = a;
    }
    function FS(e, t, a) {
      for (var o = e; o !== null; ) {
        var u = o.alternate;
        if (Rl(o.childLanes, t) ? u !== null && !Rl(u.childLanes, t) && (u.childLanes = _t(u.childLanes, t)) : (o.childLanes = _t(o.childLanes, t), u !== null && (u.childLanes = _t(u.childLanes, t))), o === a)
          break;
        o = o.return;
      }
      o !== a && y("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function qO(e, t, a) {
      KO(e, t, a);
    }
    function KO(e, t, a) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var u = void 0, d = o.dependencies;
        if (d !== null) {
          u = o.child;
          for (var h = d.firstContext; h !== null; ) {
            if (h.context === t) {
              if (o.tag === k) {
                var b = xu(a), C = jl(hn, b);
                C.tag = Ey;
                var x = o.updateQueue;
                if (x !== null) {
                  var R = x.shared, $ = R.pending;
                  $ === null ? C.next = C : (C.next = $.next, $.next = C), R.pending = C;
                }
              }
              o.lanes = _t(o.lanes, a);
              var P = o.alternate;
              P !== null && (P.lanes = _t(P.lanes, a)), FS(o.return, a, e), d.lanes = _t(d.lanes, a);
              break;
            }
            h = h.next;
          }
        } else if (o.tag === oe)
          u = o.type === e.type ? null : o.child;
        else if (o.tag === se) {
          var Z = o.return;
          if (Z === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          Z.lanes = _t(Z.lanes, a);
          var ee = Z.alternate;
          ee !== null && (ee.lanes = _t(ee.lanes, a)), FS(Z, a, e), u = o.sibling;
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
    function id(e, t) {
      gy = e, ad = null, zS = null;
      var a = e.dependencies;
      if (a !== null) {
        var o = a.firstContext;
        o !== null && (ua(a.lanes, t) && _v(), a.firstContext = null);
      }
    }
    function mr(e) {
      Sy && y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (zS !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (ad === null) {
          if (gy === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          ad = a, gy.dependencies = {
            lanes: he,
            firstContext: a
          };
        } else
          ad = ad.next = a;
      }
      return t;
    }
    var dc = null;
    function PS(e) {
      dc === null ? dc = [e] : dc.push(e);
    }
    function XO() {
      if (dc !== null) {
        for (var e = 0; e < dc.length; e++) {
          var t = dc[e], a = t.interleaved;
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
        dc = null;
      }
    }
    function $E(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, PS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Cy(e, o);
    }
    function ZO(e, t, a, o) {
      var u = t.interleaved;
      u === null ? (a.next = a, PS(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function JO(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, PS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Cy(e, o);
    }
    function Za(e, t) {
      return Cy(e, t);
    }
    var eD = Cy;
    function Cy(e, t) {
      e.lanes = _t(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = _t(a.lanes, t)), a === null && (e.flags & (gn | $a)) !== st && Ux(e);
      for (var o = e, u = e.return; u !== null; )
        u.childLanes = _t(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = _t(a.childLanes, t) : (u.flags & (gn | $a)) !== st && Ux(e), o = u, u = u.return;
      if (o.tag === O) {
        var d = o.stateNode;
        return d;
      } else
        return null;
    }
    var VE = 0, BE = 1, Ey = 2, jS = 3, Ty = !1, $S, xy;
    $S = !1, xy = null;
    function VS(e) {
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
    function HE(e, t) {
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
    function jl(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: VE,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Gu(e, t, a) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var u = o.shared;
      if (xy === u && !$S && (y("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), $S = !0), ZM()) {
        var d = u.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), u.pending = t, eD(e, a);
      } else
        return JO(e, u, t, a);
    }
    function wy(e, t, a) {
      var o = t.updateQueue;
      if (o !== null) {
        var u = o.shared;
        if (_p(a)) {
          var d = u.lanes;
          d = Ef(d, e.pendingLanes);
          var h = _t(d, a);
          u.lanes = h, kp(e, h);
        }
      }
    }
    function BS(e, t) {
      var a = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var u = o.updateQueue;
        if (a === u) {
          var d = null, h = null, b = a.firstBaseUpdate;
          if (b !== null) {
            var C = b;
            do {
              var x = {
                eventTime: C.eventTime,
                lane: C.lane,
                tag: C.tag,
                payload: C.payload,
                callback: C.callback,
                next: null
              };
              h === null ? d = h = x : (h.next = x, h = x), C = C.next;
            } while (C !== null);
            h === null ? d = h = t : (h.next = t, h = t);
          } else
            d = h = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: d,
            lastBaseUpdate: h,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var R = a.lastBaseUpdate;
      R === null ? a.firstBaseUpdate = t : R.next = t, a.lastBaseUpdate = t;
    }
    function tD(e, t, a, o, u, d) {
      switch (a.tag) {
        case BE: {
          var h = a.payload;
          if (typeof h == "function") {
            FE();
            var b = h.call(d, o, u);
            {
              if (e.mode & Nt) {
                Gn(!0);
                try {
                  h.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              PE();
            }
            return b;
          }
          return h;
        }
        case jS:
          e.flags = e.flags & ~dr | bt;
        case VE: {
          var C = a.payload, x;
          if (typeof C == "function") {
            FE(), x = C.call(d, o, u);
            {
              if (e.mode & Nt) {
                Gn(!0);
                try {
                  C.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              PE();
            }
          } else
            x = C;
          return x == null ? o : At({}, o, x);
        }
        case Ey:
          return Ty = !0, o;
      }
      return o;
    }
    function Ry(e, t, a, o) {
      var u = e.updateQueue;
      Ty = !1, xy = u.shared;
      var d = u.firstBaseUpdate, h = u.lastBaseUpdate, b = u.shared.pending;
      if (b !== null) {
        u.shared.pending = null;
        var C = b, x = C.next;
        C.next = null, h === null ? d = x : h.next = x, h = C;
        var R = e.alternate;
        if (R !== null) {
          var $ = R.updateQueue, P = $.lastBaseUpdate;
          P !== h && (P === null ? $.firstBaseUpdate = x : P.next = x, $.lastBaseUpdate = C);
        }
      }
      if (d !== null) {
        var Z = u.baseState, ee = he, re = null, Ue = null, ft = null, nt = d;
        do {
          var $t = nt.lane, zt = nt.eventTime;
          if (Rl(o, $t)) {
            if (ft !== null) {
              var ae = {
                eventTime: zt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Qn,
                tag: nt.tag,
                payload: nt.payload,
                callback: nt.callback,
                next: null
              };
              ft = ft.next = ae;
            }
            Z = tD(e, u, nt, Z, t, a);
            var q = nt.callback;
            if (q !== null && // If the update was already committed, we should not queue its
            // callback again.
            nt.lane !== Qn) {
              e.flags |= xi;
              var Ee = u.effects;
              Ee === null ? u.effects = [nt] : Ee.push(nt);
            }
          } else {
            var Q = {
              eventTime: zt,
              lane: $t,
              tag: nt.tag,
              payload: nt.payload,
              callback: nt.callback,
              next: null
            };
            ft === null ? (Ue = ft = Q, re = Z) : ft = ft.next = Q, ee = _t(ee, $t);
          }
          if (nt = nt.next, nt === null) {
            if (b = u.shared.pending, b === null)
              break;
            var Be = b, Fe = Be.next;
            Be.next = null, nt = Fe, u.lastBaseUpdate = Be, u.shared.pending = null;
          }
        } while (!0);
        ft === null && (re = Z), u.baseState = re, u.firstBaseUpdate = Ue, u.lastBaseUpdate = ft;
        var St = u.shared.interleaved;
        if (St !== null) {
          var wt = St;
          do
            ee = _t(ee, wt.lane), wt = wt.next;
          while (wt !== St);
        } else d === null && (u.shared.lanes = he);
        jv(ee), e.lanes = ee, e.memoizedState = Z;
      }
      xy = null;
    }
    function nD(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function IE() {
      Ty = !1;
    }
    function _y() {
      return Ty;
    }
    function YE(e, t, a) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u], h = d.callback;
          h !== null && (d.callback = null, nD(h, a));
        }
    }
    var pv = {}, Qu = Hu(pv), vv = Hu(pv), ky = Hu(pv);
    function Oy(e) {
      if (e === pv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function WE() {
      var e = Oy(ky.current);
      return e;
    }
    function HS(e, t) {
      fa(ky, t, e), fa(vv, e, e), fa(Qu, pv, e);
      var a = Sk(t);
      ca(Qu, e), fa(Qu, a, e);
    }
    function od(e) {
      ca(Qu, e), ca(vv, e), ca(ky, e);
    }
    function IS() {
      var e = Oy(Qu.current);
      return e;
    }
    function GE(e) {
      Oy(ky.current);
      var t = Oy(Qu.current), a = bk(t, e.type);
      t !== a && (fa(vv, e, e), fa(Qu, a, e));
    }
    function YS(e) {
      vv.current === e && (ca(Qu, e), ca(vv, e));
    }
    var rD = 0, QE = 1, qE = 1, hv = 2, oo = Hu(rD);
    function WS(e, t) {
      return (e & t) !== 0;
    }
    function ld(e) {
      return e & QE;
    }
    function GS(e, t) {
      return e & QE | t;
    }
    function aD(e, t) {
      return e | t;
    }
    function qu(e, t) {
      fa(oo, t, e);
    }
    function ud(e) {
      ca(oo, e);
    }
    function iD(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Dy(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === V) {
          var a = t.memoizedState;
          if (a !== null) {
            var o = a.dehydrated;
            if (o === null || dE(o) || fS(o))
              return t;
          }
        } else if (t.tag === ke && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & bt) !== st;
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
    var Ja = (
      /*   */
      0
    ), Er = (
      /* */
      1
    ), jo = (
      /*  */
      2
    ), Tr = (
      /*    */
      4
    ), Br = (
      /*   */
      8
    ), QS = [];
    function qS() {
      for (var e = 0; e < QS.length; e++) {
        var t = QS[e];
        t._workInProgressVersionPrimary = null;
      }
      QS.length = 0;
    }
    function oD(e, t) {
      var a = t._getVersion, o = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var $e = c.ReactCurrentDispatcher, mv = c.ReactCurrentBatchConfig, KS, sd;
    KS = /* @__PURE__ */ new Set();
    var pc = he, rn = null, xr = null, wr = null, My = !1, yv = !1, gv = 0, lD = 0, uD = 25, ue = null, Ni = null, Ku = -1, XS = !1;
    function Kt() {
      {
        var e = ue;
        Ni === null ? Ni = [e] : Ni.push(e);
      }
    }
    function Ae() {
      {
        var e = ue;
        Ni !== null && (Ku++, Ni[Ku] !== e && sD(e));
      }
    }
    function cd(e) {
      e != null && !cr(e) && y("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", ue, typeof e);
    }
    function sD(e) {
      {
        var t = Rt(rn);
        if (!KS.has(t) && (KS.add(t), Ni !== null)) {
          for (var a = "", o = 30, u = 0; u <= Ku; u++) {
            for (var d = Ni[u], h = u === Ku ? e : d, b = u + 1 + ". " + d; b.length < o; )
              b += " ";
            b += h + `
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
    function da() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function ZS(e, t) {
      if (XS)
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
    function fd(e, t, a, o, u, d) {
      pc = d, rn = t, Ni = e !== null ? e._debugHookTypes : null, Ku = -1, XS = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = he, e !== null && e.memoizedState !== null ? $e.current = yT : Ni !== null ? $e.current = mT : $e.current = hT;
      var h = a(o, u);
      if (yv) {
        var b = 0;
        do {
          if (yv = !1, gv = 0, b >= uD)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          b += 1, XS = !1, xr = null, wr = null, t.updateQueue = null, Ku = -1, $e.current = gT, h = a(o, u);
        } while (yv);
      }
      $e.current = Iy, t._debugHookTypes = Ni;
      var C = xr !== null && xr.next !== null;
      if (pc = he, rn = null, xr = null, wr = null, ue = null, Ni = null, Ku = -1, e !== null && (e.flags & Sr) !== (t.flags & Sr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & tt) !== Ze && y("Internal React error: Expected static flag was missing. Please notify the React team."), My = !1, C)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return h;
    }
    function dd() {
      var e = gv !== 0;
      return gv = 0, e;
    }
    function KE(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & xa) !== Ze ? t.flags &= ~(yl | na | wn | kt) : t.flags &= ~(wn | kt), e.lanes = Is(e.lanes, a);
    }
    function XE() {
      if ($e.current = Iy, My) {
        for (var e = rn.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        My = !1;
      }
      pc = he, rn = null, xr = null, wr = null, Ni = null, Ku = -1, ue = null, cT = !1, yv = !1, gv = 0;
    }
    function $o() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return wr === null ? rn.memoizedState = wr = e : wr = wr.next = e, wr;
    }
    function Li() {
      var e;
      if (xr === null) {
        var t = rn.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = xr.next;
      var a;
      if (wr === null ? a = rn.memoizedState : a = wr.next, a !== null)
        wr = a, a = wr.next, xr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        xr = e;
        var o = {
          memoizedState: xr.memoizedState,
          baseState: xr.baseState,
          baseQueue: xr.baseQueue,
          queue: xr.queue,
          next: null
        };
        wr === null ? rn.memoizedState = wr = o : wr = wr.next = o;
      }
      return wr;
    }
    function ZE() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function JS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function eb(e, t, a) {
      var o = $o(), u;
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
      var h = d.dispatch = pD.bind(null, rn, d);
      return [o.memoizedState, h];
    }
    function tb(e, t, a) {
      var o = Li(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = xr, h = d.baseQueue, b = u.pending;
      if (b !== null) {
        if (h !== null) {
          var C = h.next, x = b.next;
          h.next = x, b.next = C;
        }
        d.baseQueue !== h && y("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), d.baseQueue = h = b, u.pending = null;
      }
      if (h !== null) {
        var R = h.next, $ = d.baseState, P = null, Z = null, ee = null, re = R;
        do {
          var Ue = re.lane;
          if (Rl(pc, Ue)) {
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
              $ = re.eagerState;
            else {
              var $t = re.action;
              $ = e($, $t);
            }
          } else {
            var ft = {
              lane: Ue,
              action: re.action,
              hasEagerState: re.hasEagerState,
              eagerState: re.eagerState,
              next: null
            };
            ee === null ? (Z = ee = ft, P = $) : ee = ee.next = ft, rn.lanes = _t(rn.lanes, Ue), jv(Ue);
          }
          re = re.next;
        } while (re !== null && re !== R);
        ee === null ? P = $ : ee.next = Z, We($, o.memoizedState) || _v(), o.memoizedState = $, o.baseState = P, o.baseQueue = ee, u.lastRenderedState = $;
      }
      var zt = u.interleaved;
      if (zt !== null) {
        var Q = zt;
        do {
          var ae = Q.lane;
          rn.lanes = _t(rn.lanes, ae), jv(ae), Q = Q.next;
        } while (Q !== zt);
      } else h === null && (u.lanes = he);
      var q = u.dispatch;
      return [o.memoizedState, q];
    }
    function nb(e, t, a) {
      var o = Li(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = u.dispatch, h = u.pending, b = o.memoizedState;
      if (h !== null) {
        u.pending = null;
        var C = h.next, x = C;
        do {
          var R = x.action;
          b = e(b, R), x = x.next;
        } while (x !== C);
        We(b, o.memoizedState) || _v(), o.memoizedState = b, o.baseQueue === null && (o.baseState = b), u.lastRenderedState = b;
      }
      return [b, d];
    }
    function s5(e, t, a) {
    }
    function c5(e, t, a) {
    }
    function rb(e, t, a) {
      var o = rn, u = $o(), d, h = Vr();
      if (h) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = a(), sd || d !== a() && (y("The result of getServerSnapshot should be cached to avoid an infinite loop"), sd = !0);
      } else {
        if (d = t(), !sd) {
          var b = t();
          We(d, b) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), sd = !0);
        }
        var C = sg();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Hs(C, pc) || JE(o, t, d);
      }
      u.memoizedState = d;
      var x = {
        value: d,
        getSnapshot: t
      };
      return u.queue = x, Uy(tT.bind(null, o, x, e), [e]), o.flags |= wn, Sv(Er | Br, eT.bind(null, o, x, d, t), void 0, null), d;
    }
    function Ay(e, t, a) {
      var o = rn, u = Li(), d = t();
      if (!sd) {
        var h = t();
        We(d, h) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), sd = !0);
      }
      var b = u.memoizedState, C = !We(b, d);
      C && (u.memoizedState = d, _v());
      var x = u.queue;
      if (Cv(tT.bind(null, o, x, e), [e]), x.getSnapshot !== t || C || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      wr !== null && wr.memoizedState.tag & Er) {
        o.flags |= wn, Sv(Er | Br, eT.bind(null, o, x, d, t), void 0, null);
        var R = sg();
        if (R === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Hs(R, pc) || JE(o, t, d);
      }
      return d;
    }
    function JE(e, t, a) {
      e.flags |= Ns;
      var o = {
        getSnapshot: t,
        value: a
      }, u = rn.updateQueue;
      if (u === null)
        u = ZE(), rn.updateQueue = u, u.stores = [o];
      else {
        var d = u.stores;
        d === null ? u.stores = [o] : d.push(o);
      }
    }
    function eT(e, t, a, o) {
      t.value = a, t.getSnapshot = o, nT(t) && rT(e);
    }
    function tT(e, t, a) {
      var o = function() {
        nT(t) && rT(e);
      };
      return a(o);
    }
    function nT(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var o = t();
        return !We(a, o);
      } catch {
        return !0;
      }
    }
    function rT(e) {
      var t = Za(e, ot);
      t !== null && Or(t, e, ot, hn);
    }
    function Ny(e) {
      var t = $o();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: he,
        dispatch: null,
        lastRenderedReducer: JS,
        lastRenderedState: e
      };
      t.queue = a;
      var o = a.dispatch = vD.bind(null, rn, a);
      return [t.memoizedState, o];
    }
    function ab(e) {
      return tb(JS);
    }
    function ib(e) {
      return nb(JS);
    }
    function Sv(e, t, a, o) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: o,
        // Circular
        next: null
      }, d = rn.updateQueue;
      if (d === null)
        d = ZE(), rn.updateQueue = d, d.lastEffect = u.next = u;
      else {
        var h = d.lastEffect;
        if (h === null)
          d.lastEffect = u.next = u;
        else {
          var b = h.next;
          h.next = u, u.next = b, d.lastEffect = u;
        }
      }
      return u;
    }
    function ob(e) {
      var t = $o();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Ly(e) {
      var t = Li();
      return t.memoizedState;
    }
    function bv(e, t, a, o) {
      var u = $o(), d = o === void 0 ? null : o;
      rn.flags |= e, u.memoizedState = Sv(Er | t, a, void 0, d);
    }
    function zy(e, t, a, o) {
      var u = Li(), d = o === void 0 ? null : o, h = void 0;
      if (xr !== null) {
        var b = xr.memoizedState;
        if (h = b.destroy, d !== null) {
          var C = b.deps;
          if (ZS(d, C)) {
            u.memoizedState = Sv(t, a, h, d);
            return;
          }
        }
      }
      rn.flags |= e, u.memoizedState = Sv(Er | t, a, h, d);
    }
    function Uy(e, t) {
      return (rn.mode & xa) !== Ze ? bv(yl | wn | _o, Br, e, t) : bv(wn | _o, Br, e, t);
    }
    function Cv(e, t) {
      return zy(wn, Br, e, t);
    }
    function lb(e, t) {
      return bv(kt, jo, e, t);
    }
    function Fy(e, t) {
      return zy(kt, jo, e, t);
    }
    function ub(e, t) {
      var a = kt;
      return a |= ta, (rn.mode & xa) !== Ze && (a |= na), bv(a, Tr, e, t);
    }
    function Py(e, t) {
      return zy(kt, Tr, e, t);
    }
    function aT(e, t) {
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
    function sb(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null, u = kt;
      return u |= ta, (rn.mode & xa) !== Ze && (u |= na), bv(u, Tr, aT.bind(null, t, e), o);
    }
    function jy(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null;
      return zy(kt, Tr, aT.bind(null, t, e), o);
    }
    function cD(e, t) {
    }
    var $y = cD;
    function cb(e, t) {
      var a = $o(), o = t === void 0 ? null : t;
      return a.memoizedState = [e, o], e;
    }
    function Vy(e, t) {
      var a = Li(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (ZS(o, d))
          return u[0];
      }
      return a.memoizedState = [e, o], e;
    }
    function fb(e, t) {
      var a = $o(), o = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, o], u;
    }
    function By(e, t) {
      var a = Li(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (ZS(o, d))
          return u[0];
      }
      var h = e();
      return a.memoizedState = [h, o], h;
    }
    function db(e) {
      var t = $o();
      return t.memoizedState = e, e;
    }
    function iT(e) {
      var t = Li(), a = xr, o = a.memoizedState;
      return lT(t, o, e);
    }
    function oT(e) {
      var t = Li();
      if (xr === null)
        return t.memoizedState = e, e;
      var a = xr.memoizedState;
      return lT(t, a, e);
    }
    function lT(e, t, a) {
      var o = !gm(pc);
      if (o) {
        if (!We(a, t)) {
          var u = Cm();
          rn.lanes = _t(rn.lanes, u), jv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, _v()), e.memoizedState = a, a;
    }
    function fD(e, t, a) {
      var o = Wa();
      zn(A0(o, Ji)), e(!0);
      var u = mv.transition;
      mv.transition = {};
      var d = mv.transition;
      mv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (zn(o), mv.transition = u, u === null && d._updatedFibers) {
          var h = d._updatedFibers.size;
          h > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function pb() {
      var e = Ny(!1), t = e[0], a = e[1], o = fD.bind(null, a), u = $o();
      return u.memoizedState = o, [t, o];
    }
    function uT() {
      var e = ab(), t = e[0], a = Li(), o = a.memoizedState;
      return [t, o];
    }
    function sT() {
      var e = ib(), t = e[0], a = Li(), o = a.memoizedState;
      return [t, o];
    }
    var cT = !1;
    function dD() {
      return cT;
    }
    function vb() {
      var e = $o(), t = sg(), a = t.identifierPrefix, o;
      if (Vr()) {
        var u = OO();
        o = ":" + a + "R" + u;
        var d = gv++;
        d > 0 && (o += "H" + d.toString(32)), o += ":";
      } else {
        var h = lD++;
        o = ":" + a + "r" + h.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Hy() {
      var e = Li(), t = e.memoizedState;
      return t;
    }
    function pD(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ts(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (fT(e))
        dT(t, u);
      else {
        var d = $E(e, t, u, o);
        if (d !== null) {
          var h = ka();
          Or(d, e, o, h), pT(d, t, o);
        }
      }
      vT(e, o);
    }
    function vD(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ts(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (fT(e))
        dT(t, u);
      else {
        var d = e.alternate;
        if (e.lanes === he && (d === null || d.lanes === he)) {
          var h = t.lastRenderedReducer;
          if (h !== null) {
            var b;
            b = $e.current, $e.current = lo;
            try {
              var C = t.lastRenderedState, x = h(C, a);
              if (u.hasEagerState = !0, u.eagerState = x, We(x, C)) {
                ZO(e, t, u, o);
                return;
              }
            } catch {
            } finally {
              $e.current = b;
            }
          }
        }
        var R = $E(e, t, u, o);
        if (R !== null) {
          var $ = ka();
          Or(R, e, o, $), pT(R, t, o);
        }
      }
      vT(e, o);
    }
    function fT(e) {
      var t = e.alternate;
      return e === rn || t !== null && t === rn;
    }
    function dT(e, t) {
      yv = My = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function pT(e, t, a) {
      if (_p(a)) {
        var o = t.lanes;
        o = Ef(o, e.pendingLanes);
        var u = _t(o, a);
        t.lanes = u, kp(e, u);
      }
    }
    function vT(e, t, a) {
      Fs(e, t);
    }
    var Iy = {
      readContext: mr,
      useCallback: da,
      useContext: da,
      useEffect: da,
      useImperativeHandle: da,
      useInsertionEffect: da,
      useLayoutEffect: da,
      useMemo: da,
      useReducer: da,
      useRef: da,
      useState: da,
      useDebugValue: da,
      useDeferredValue: da,
      useTransition: da,
      useMutableSource: da,
      useSyncExternalStore: da,
      useId: da,
      unstable_isNewReconciler: ge
    }, hT = null, mT = null, yT = null, gT = null, Vo = null, lo = null, Yy = null;
    {
      var hb = function() {
        y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, xt = function() {
        y("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      hT = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Kt(), cd(t), cb(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Kt(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Kt(), cd(t), Uy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Kt(), cd(a), sb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Kt(), cd(t), lb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Kt(), cd(t), ub(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Kt(), cd(t);
          var a = $e.current;
          $e.current = Vo;
          try {
            return fb(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Kt();
          var o = $e.current;
          $e.current = Vo;
          try {
            return eb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Kt(), ob(e);
        },
        useState: function(e) {
          ue = "useState", Kt();
          var t = $e.current;
          $e.current = Vo;
          try {
            return Ny(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Kt(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Kt(), db(e);
        },
        useTransition: function() {
          return ue = "useTransition", Kt(), pb();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Kt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Kt(), rb(e, t, a);
        },
        useId: function() {
          return ue = "useId", Kt(), vb();
        },
        unstable_isNewReconciler: ge
      }, mT = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Ae(), cb(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Ae(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Ae(), Uy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Ae(), sb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Ae(), lb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Ae(), ub(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Ae();
          var a = $e.current;
          $e.current = Vo;
          try {
            return fb(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Ae();
          var o = $e.current;
          $e.current = Vo;
          try {
            return eb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Ae(), ob(e);
        },
        useState: function(e) {
          ue = "useState", Ae();
          var t = $e.current;
          $e.current = Vo;
          try {
            return Ny(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Ae(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Ae(), db(e);
        },
        useTransition: function() {
          return ue = "useTransition", Ae(), pb();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Ae(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Ae(), rb(e, t, a);
        },
        useId: function() {
          return ue = "useId", Ae(), vb();
        },
        unstable_isNewReconciler: ge
      }, yT = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Ae(), Vy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Ae(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Ae(), Cv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Ae(), jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Ae(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Ae(), Py(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Ae();
          var a = $e.current;
          $e.current = lo;
          try {
            return By(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Ae();
          var o = $e.current;
          $e.current = lo;
          try {
            return tb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Ae(), Ly();
        },
        useState: function(e) {
          ue = "useState", Ae();
          var t = $e.current;
          $e.current = lo;
          try {
            return ab(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Ae(), $y();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Ae(), iT(e);
        },
        useTransition: function() {
          return ue = "useTransition", Ae(), uT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Ae(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Ae(), Ay(e, t);
        },
        useId: function() {
          return ue = "useId", Ae(), Hy();
        },
        unstable_isNewReconciler: ge
      }, gT = {
        readContext: function(e) {
          return mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", Ae(), Vy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", Ae(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", Ae(), Cv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", Ae(), jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", Ae(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", Ae(), Py(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", Ae();
          var a = $e.current;
          $e.current = Yy;
          try {
            return By(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", Ae();
          var o = $e.current;
          $e.current = Yy;
          try {
            return nb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", Ae(), Ly();
        },
        useState: function(e) {
          ue = "useState", Ae();
          var t = $e.current;
          $e.current = Yy;
          try {
            return ib(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", Ae(), $y();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", Ae(), oT(e);
        },
        useTransition: function() {
          return ue = "useTransition", Ae(), sT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", Ae(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", Ae(), Ay(e, t);
        },
        useId: function() {
          return ue = "useId", Ae(), Hy();
        },
        unstable_isNewReconciler: ge
      }, Vo = {
        readContext: function(e) {
          return hb(), mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", xt(), Kt(), cb(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", xt(), Kt(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", xt(), Kt(), Uy(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", xt(), Kt(), sb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", xt(), Kt(), lb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", xt(), Kt(), ub(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", xt(), Kt();
          var a = $e.current;
          $e.current = Vo;
          try {
            return fb(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", xt(), Kt();
          var o = $e.current;
          $e.current = Vo;
          try {
            return eb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", xt(), Kt(), ob(e);
        },
        useState: function(e) {
          ue = "useState", xt(), Kt();
          var t = $e.current;
          $e.current = Vo;
          try {
            return Ny(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", xt(), Kt(), void 0;
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", xt(), Kt(), db(e);
        },
        useTransition: function() {
          return ue = "useTransition", xt(), Kt(), pb();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", xt(), Kt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", xt(), Kt(), rb(e, t, a);
        },
        useId: function() {
          return ue = "useId", xt(), Kt(), vb();
        },
        unstable_isNewReconciler: ge
      }, lo = {
        readContext: function(e) {
          return hb(), mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", xt(), Ae(), Vy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", xt(), Ae(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", xt(), Ae(), Cv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", xt(), Ae(), jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", xt(), Ae(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", xt(), Ae(), Py(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", xt(), Ae();
          var a = $e.current;
          $e.current = lo;
          try {
            return By(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", xt(), Ae();
          var o = $e.current;
          $e.current = lo;
          try {
            return tb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", xt(), Ae(), Ly();
        },
        useState: function(e) {
          ue = "useState", xt(), Ae();
          var t = $e.current;
          $e.current = lo;
          try {
            return ab(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", xt(), Ae(), $y();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", xt(), Ae(), iT(e);
        },
        useTransition: function() {
          return ue = "useTransition", xt(), Ae(), uT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", xt(), Ae(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", xt(), Ae(), Ay(e, t);
        },
        useId: function() {
          return ue = "useId", xt(), Ae(), Hy();
        },
        unstable_isNewReconciler: ge
      }, Yy = {
        readContext: function(e) {
          return hb(), mr(e);
        },
        useCallback: function(e, t) {
          return ue = "useCallback", xt(), Ae(), Vy(e, t);
        },
        useContext: function(e) {
          return ue = "useContext", xt(), Ae(), mr(e);
        },
        useEffect: function(e, t) {
          return ue = "useEffect", xt(), Ae(), Cv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return ue = "useImperativeHandle", xt(), Ae(), jy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return ue = "useInsertionEffect", xt(), Ae(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return ue = "useLayoutEffect", xt(), Ae(), Py(e, t);
        },
        useMemo: function(e, t) {
          ue = "useMemo", xt(), Ae();
          var a = $e.current;
          $e.current = lo;
          try {
            return By(e, t);
          } finally {
            $e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          ue = "useReducer", xt(), Ae();
          var o = $e.current;
          $e.current = lo;
          try {
            return nb(e, t, a);
          } finally {
            $e.current = o;
          }
        },
        useRef: function(e) {
          return ue = "useRef", xt(), Ae(), Ly();
        },
        useState: function(e) {
          ue = "useState", xt(), Ae();
          var t = $e.current;
          $e.current = lo;
          try {
            return ib(e);
          } finally {
            $e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return ue = "useDebugValue", xt(), Ae(), $y();
        },
        useDeferredValue: function(e) {
          return ue = "useDeferredValue", xt(), Ae(), oT(e);
        },
        useTransition: function() {
          return ue = "useTransition", xt(), Ae(), sT();
        },
        useMutableSource: function(e, t, a) {
          return ue = "useMutableSource", xt(), Ae(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return ue = "useSyncExternalStore", xt(), Ae(), Ay(e, t);
        },
        useId: function() {
          return ue = "useId", xt(), Ae(), Hy();
        },
        unstable_isNewReconciler: ge
      };
    }
    var Xu = s.unstable_now, ST = 0, Wy = -1, Ev = -1, Gy = -1, mb = !1, Qy = !1;
    function bT() {
      return mb;
    }
    function hD() {
      Qy = !0;
    }
    function mD() {
      mb = !1, Qy = !1;
    }
    function yD() {
      mb = Qy, Qy = !1;
    }
    function CT() {
      return ST;
    }
    function ET() {
      ST = Xu();
    }
    function yb(e) {
      Ev = Xu(), e.actualStartTime < 0 && (e.actualStartTime = Xu());
    }
    function TT(e) {
      Ev = -1;
    }
    function qy(e, t) {
      if (Ev >= 0) {
        var a = Xu() - Ev;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Ev = -1;
      }
    }
    function Bo(e) {
      if (Wy >= 0) {
        var t = Xu() - Wy;
        Wy = -1;
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
    function gb(e) {
      if (Gy >= 0) {
        var t = Xu() - Gy;
        Gy = -1;
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
    function Ho() {
      Wy = Xu();
    }
    function Sb() {
      Gy = Xu();
    }
    function bb(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function uo(e, t) {
      if (e && e.defaultProps) {
        var a = At({}, t), o = e.defaultProps;
        for (var u in o)
          a[u] === void 0 && (a[u] = o[u]);
        return a;
      }
      return t;
    }
    var Cb = {}, Eb, Tb, xb, wb, Rb, xT, Ky, _b, kb, Ob, Tv;
    {
      Eb = /* @__PURE__ */ new Set(), Tb = /* @__PURE__ */ new Set(), xb = /* @__PURE__ */ new Set(), wb = /* @__PURE__ */ new Set(), _b = /* @__PURE__ */ new Set(), Rb = /* @__PURE__ */ new Set(), kb = /* @__PURE__ */ new Set(), Ob = /* @__PURE__ */ new Set(), Tv = /* @__PURE__ */ new Set();
      var wT = /* @__PURE__ */ new Set();
      Ky = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          wT.has(a) || (wT.add(a), y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, xT = function(e, t) {
        if (t === void 0) {
          var a = Jt(e) || "Component";
          Rb.has(a) || (Rb.add(a), y("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Cb, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Cb);
    }
    function Db(e, t, a, o) {
      var u = e.memoizedState, d = a(o, u);
      {
        if (e.mode & Nt) {
          Gn(!0);
          try {
            d = a(o, u);
          } finally {
            Gn(!1);
          }
        }
        xT(t, d);
      }
      var h = d == null ? u : At({}, u, d);
      if (e.memoizedState = h, e.lanes === he) {
        var b = e.updateQueue;
        b.baseState = h;
      }
    }
    var Mb = {
      isMounted: Ea,
      enqueueSetState: function(e, t, a) {
        var o = Pa(e), u = ka(), d = ts(o), h = jl(u, d);
        h.payload = t, a != null && (Ky(a, "setState"), h.callback = a);
        var b = Gu(o, h, d);
        b !== null && (Or(b, o, d, u), wy(b, o, d)), Fs(o, d);
      },
      enqueueReplaceState: function(e, t, a) {
        var o = Pa(e), u = ka(), d = ts(o), h = jl(u, d);
        h.tag = BE, h.payload = t, a != null && (Ky(a, "replaceState"), h.callback = a);
        var b = Gu(o, h, d);
        b !== null && (Or(b, o, d, u), wy(b, o, d)), Fs(o, d);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Pa(e), o = ka(), u = ts(a), d = jl(o, u);
        d.tag = Ey, t != null && (Ky(t, "forceUpdate"), d.callback = t);
        var h = Gu(a, d, u);
        h !== null && (Or(h, a, u, o), wy(h, a, u)), af(a, u);
      }
    };
    function RT(e, t, a, o, u, d, h) {
      var b = e.stateNode;
      if (typeof b.shouldComponentUpdate == "function") {
        var C = b.shouldComponentUpdate(o, d, h);
        {
          if (e.mode & Nt) {
            Gn(!0);
            try {
              C = b.shouldComponentUpdate(o, d, h);
            } finally {
              Gn(!1);
            }
          }
          C === void 0 && y("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Jt(t) || "Component");
        }
        return C;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !vt(a, o) || !vt(u, d) : !0;
    }
    function gD(e, t, a) {
      var o = e.stateNode;
      {
        var u = Jt(t) || "Component", d = o.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? y("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : y("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && y("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && y("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), o.propTypes && y("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), o.contextType && y("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Tv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Nt) === Ze && (Tv.add(t), y(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Tv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Nt) === Ze && (Tv.add(t), y(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), o.contextTypes && y("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !kb.has(t) && (kb.add(t), y("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof o.componentShouldUpdate == "function" && y("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && y("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Jt(t) || "A pure component"), typeof o.componentDidUnmount == "function" && y("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof o.componentDidReceiveProps == "function" && y("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof o.componentWillRecieveProps == "function" && y("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof o.UNSAFE_componentWillRecieveProps == "function" && y("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var h = o.props !== a;
        o.props !== void 0 && h && y("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), o.defaultProps && y("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !xb.has(t) && (xb.add(t), y("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Jt(t))), typeof o.getDerivedStateFromProps == "function" && y("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof o.getDerivedStateFromError == "function" && y("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && y("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var b = o.state;
        b && (typeof b != "object" || cr(b)) && y("%s.state: must be set to an object or null", u), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && y("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function _T(e, t) {
      t.updater = Mb, e.stateNode = t, cu(t, e), t._reactInternalInstance = Cb;
    }
    function kT(e, t, a) {
      var o = !1, u = vi, d = vi, h = t.contextType;
      if ("contextType" in t) {
        var b = (
          // Allow null for conditional declaration
          h === null || h !== void 0 && h.$$typeof === Se && h._context === void 0
        );
        if (!b && !Ob.has(t)) {
          Ob.add(t);
          var C = "";
          h === void 0 ? C = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof h != "object" ? C = " However, it is set to a " + typeof h + "." : h.$$typeof === L ? C = " Did you accidentally pass the Context.Provider instead?" : h._context !== void 0 ? C = " Did you accidentally pass the Context.Consumer instead?" : C = " However, it is set to an object with keys {" + Object.keys(h).join(", ") + "}.", y("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Jt(t) || "Component", C);
        }
      }
      if (typeof h == "object" && h !== null)
        d = mr(h);
      else {
        u = Zf(e, t, !0);
        var x = t.contextTypes;
        o = x != null, d = o ? Jf(e, u) : vi;
      }
      var R = new t(a, d);
      if (e.mode & Nt) {
        Gn(!0);
        try {
          R = new t(a, d);
        } finally {
          Gn(!1);
        }
      }
      var $ = e.memoizedState = R.state !== null && R.state !== void 0 ? R.state : null;
      _T(e, R);
      {
        if (typeof t.getDerivedStateFromProps == "function" && $ === null) {
          var P = Jt(t) || "Component";
          Tb.has(P) || (Tb.add(P), y("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", P, R.state === null ? "null" : "undefined", P));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof R.getSnapshotBeforeUpdate == "function") {
          var Z = null, ee = null, re = null;
          if (typeof R.componentWillMount == "function" && R.componentWillMount.__suppressDeprecationWarning !== !0 ? Z = "componentWillMount" : typeof R.UNSAFE_componentWillMount == "function" && (Z = "UNSAFE_componentWillMount"), typeof R.componentWillReceiveProps == "function" && R.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? ee = "componentWillReceiveProps" : typeof R.UNSAFE_componentWillReceiveProps == "function" && (ee = "UNSAFE_componentWillReceiveProps"), typeof R.componentWillUpdate == "function" && R.componentWillUpdate.__suppressDeprecationWarning !== !0 ? re = "componentWillUpdate" : typeof R.UNSAFE_componentWillUpdate == "function" && (re = "UNSAFE_componentWillUpdate"), Z !== null || ee !== null || re !== null) {
            var Ue = Jt(t) || "Component", ft = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            wb.has(Ue) || (wb.add(Ue), y(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Ue, ft, Z !== null ? `
  ` + Z : "", ee !== null ? `
  ` + ee : "", re !== null ? `
  ` + re : ""));
          }
        }
      }
      return o && yE(e, u, d), R;
    }
    function SD(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (y("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Rt(e) || "Component"), Mb.enqueueReplaceState(t, t.state, null));
    }
    function OT(e, t, a, o) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== u) {
        {
          var d = Rt(e) || "Component";
          Eb.has(d) || (Eb.add(d), y("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", d));
        }
        Mb.enqueueReplaceState(t, t.state, null);
      }
    }
    function Ab(e, t, a, o) {
      gD(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, VS(e);
      var d = t.contextType;
      if (typeof d == "object" && d !== null)
        u.context = mr(d);
      else {
        var h = Zf(e, t, !0);
        u.context = Jf(e, h);
      }
      {
        if (u.state === a) {
          var b = Jt(t) || "Component";
          _b.has(b) || (_b.add(b), y("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", b));
        }
        e.mode & Nt && io.recordLegacyContextWarning(e, u), io.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var C = t.getDerivedStateFromProps;
      if (typeof C == "function" && (Db(e, t, C, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (SD(e, u), Ry(e, a, u, o), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var x = kt;
        x |= ta, (e.mode & xa) !== Ze && (x |= na), e.flags |= x;
      }
    }
    function bD(e, t, a, o) {
      var u = e.stateNode, d = e.memoizedProps;
      u.props = d;
      var h = u.context, b = t.contextType, C = vi;
      if (typeof b == "object" && b !== null)
        C = mr(b);
      else {
        var x = Zf(e, t, !0);
        C = Jf(e, x);
      }
      var R = t.getDerivedStateFromProps, $ = typeof R == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !$ && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (d !== a || h !== C) && OT(e, u, a, C), IE();
      var P = e.memoizedState, Z = u.state = P;
      if (Ry(e, a, u, o), Z = e.memoizedState, d === a && P === Z && !ly() && !_y()) {
        if (typeof u.componentDidMount == "function") {
          var ee = kt;
          ee |= ta, (e.mode & xa) !== Ze && (ee |= na), e.flags |= ee;
        }
        return !1;
      }
      typeof R == "function" && (Db(e, t, R, a), Z = e.memoizedState);
      var re = _y() || RT(e, t, d, a, P, Z, C);
      if (re) {
        if (!$ && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Ue = kt;
          Ue |= ta, (e.mode & xa) !== Ze && (Ue |= na), e.flags |= Ue;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var ft = kt;
          ft |= ta, (e.mode & xa) !== Ze && (ft |= na), e.flags |= ft;
        }
        e.memoizedProps = a, e.memoizedState = Z;
      }
      return u.props = a, u.state = Z, u.context = C, re;
    }
    function CD(e, t, a, o, u) {
      var d = t.stateNode;
      HE(e, t);
      var h = t.memoizedProps, b = t.type === t.elementType ? h : uo(t.type, h);
      d.props = b;
      var C = t.pendingProps, x = d.context, R = a.contextType, $ = vi;
      if (typeof R == "object" && R !== null)
        $ = mr(R);
      else {
        var P = Zf(t, a, !0);
        $ = Jf(t, P);
      }
      var Z = a.getDerivedStateFromProps, ee = typeof Z == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !ee && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (h !== C || x !== $) && OT(t, d, o, $), IE();
      var re = t.memoizedState, Ue = d.state = re;
      if (Ry(t, o, d, u), Ue = t.memoizedState, h === C && re === Ue && !ly() && !_y() && !ze)
        return typeof d.componentDidUpdate == "function" && (h !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= kt), typeof d.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= ja), !1;
      typeof Z == "function" && (Db(t, a, Z, o), Ue = t.memoizedState);
      var ft = _y() || RT(t, a, b, o, re, Ue, $) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ze;
      return ft ? (!ee && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Ue, $), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, Ue, $)), typeof d.componentDidUpdate == "function" && (t.flags |= kt), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= ja)) : (typeof d.componentDidUpdate == "function" && (h !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= kt), typeof d.getSnapshotBeforeUpdate == "function" && (h !== e.memoizedProps || re !== e.memoizedState) && (t.flags |= ja), t.memoizedProps = o, t.memoizedState = Ue), d.props = o, d.state = Ue, d.context = $, ft;
    }
    function vc(e, t) {
      return {
        value: e,
        source: t,
        stack: Pd(t),
        digest: null
      };
    }
    function Nb(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function ED(e, t) {
      return !0;
    }
    function Lb(e, t) {
      try {
        var a = ED(e, t);
        if (a === !1)
          return;
        var o = t.value, u = t.source, d = t.stack, h = d !== null ? d : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === k)
            return;
          console.error(o);
        }
        var b = u ? Rt(u) : null, C = b ? "The above error occurred in the <" + b + "> component:" : "The above error occurred in one of your React components:", x;
        if (e.tag === O)
          x = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var R = Rt(e) || "Anonymous";
          x = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + R + ".");
        }
        var $ = C + `
` + h + `

` + ("" + x);
        console.error($);
      } catch (P) {
        setTimeout(function() {
          throw P;
        });
      }
    }
    var TD = typeof WeakMap == "function" ? WeakMap : Map;
    function DT(e, t, a) {
      var o = jl(hn, a);
      o.tag = jS, o.payload = {
        element: null
      };
      var u = t.value;
      return o.callback = function() {
        hA(u), Lb(e, t);
      }, o;
    }
    function zb(e, t, a) {
      var o = jl(hn, a);
      o.tag = jS;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var d = t.value;
        o.payload = function() {
          return u(d);
        }, o.callback = function() {
          Vx(e), Lb(e, t);
        };
      }
      var h = e.stateNode;
      return h !== null && typeof h.componentDidCatch == "function" && (o.callback = function() {
        Vx(e), Lb(e, t), typeof u != "function" && pA(this);
        var C = t.value, x = t.stack;
        this.componentDidCatch(C, {
          componentStack: x !== null ? x : ""
        }), typeof u != "function" && (ua(e.lanes, ot) || y("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Rt(e) || "Unknown"));
      }), o;
    }
    function MT(e, t, a) {
      var o = e.pingCache, u;
      if (o === null ? (o = e.pingCache = new TD(), u = /* @__PURE__ */ new Set(), o.set(t, u)) : (u = o.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(t, u))), !u.has(a)) {
        u.add(a);
        var d = mA.bind(null, e, t, a);
        Ta && $v(e, a), t.then(d, d);
      }
    }
    function xD(e, t, a, o) {
      var u = e.updateQueue;
      if (u === null) {
        var d = /* @__PURE__ */ new Set();
        d.add(a), e.updateQueue = d;
      } else
        u.add(a);
    }
    function wD(e, t) {
      var a = e.tag;
      if ((e.mode & tt) === Ze && (a === w || a === X || a === fe)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function AT(e) {
      var t = e;
      do {
        if (t.tag === V && iD(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function NT(e, t, a, o, u) {
      if ((e.mode & tt) === Ze) {
        if (e === t)
          e.flags |= dr;
        else {
          if (e.flags |= bt, a.flags |= Ls, a.flags &= ~(Wc | ba), a.tag === k) {
            var d = a.alternate;
            if (d === null)
              a.tag = _;
            else {
              var h = jl(hn, ot);
              h.tag = Ey, Gu(a, h, ot);
            }
          }
          a.lanes = _t(a.lanes, ot);
        }
        return e;
      }
      return e.flags |= dr, e.lanes = u, e;
    }
    function RD(e, t, a, o, u) {
      if (a.flags |= ba, Ta && $v(e, u), o !== null && typeof o == "object" && typeof o.then == "function") {
        var d = o;
        wD(a), Vr() && a.mode & tt && xE();
        var h = AT(t);
        if (h !== null) {
          h.flags &= ~Ln, NT(h, t, a, e, u), h.mode & tt && MT(e, d, u), xD(h, e, d);
          return;
        } else {
          if (!Rp(u)) {
            MT(e, d, u), v1();
            return;
          }
          var b = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = b;
        }
      } else if (Vr() && a.mode & tt) {
        xE();
        var C = AT(t);
        if (C !== null) {
          (C.flags & dr) === st && (C.flags |= Ln), NT(C, t, a, e, u), _S(vc(o, a));
          return;
        }
      }
      o = vc(o, a), iA(o);
      var x = t;
      do {
        switch (x.tag) {
          case O: {
            var R = o;
            x.flags |= dr;
            var $ = xu(u);
            x.lanes = _t(x.lanes, $);
            var P = DT(x, R, $);
            BS(x, P);
            return;
          }
          case k:
            var Z = o, ee = x.type, re = x.stateNode;
            if ((x.flags & bt) === st && (typeof ee.getDerivedStateFromError == "function" || re !== null && typeof re.componentDidCatch == "function" && !Ax(re))) {
              x.flags |= dr;
              var Ue = xu(u);
              x.lanes = _t(x.lanes, Ue);
              var ft = zb(x, Z, Ue);
              BS(x, ft);
              return;
            }
            break;
        }
        x = x.return;
      } while (x !== null);
    }
    function _D() {
      return null;
    }
    var xv = c.ReactCurrentOwner, so = !1, Ub, wv, Fb, Pb, jb, hc, $b, Xy, Rv;
    Ub = {}, wv = {}, Fb = {}, Pb = {}, jb = {}, hc = !1, $b = {}, Xy = {}, Rv = {};
    function Ra(e, t, a, o) {
      e === null ? t.child = UE(t, null, a, o) : t.child = rd(t, e.child, a, o);
    }
    function kD(e, t, a, o) {
      t.child = rd(t, e.child, null, o), t.child = rd(t, null, a, o);
    }
    function LT(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && ro(
          d,
          o,
          // Resolved props
          "prop",
          Jt(a)
        );
      }
      var h = a.render, b = t.ref, C, x;
      id(t, u), vu(t);
      {
        if (xv.current = t, si(!0), C = fd(e, t, h, o, b, u), x = dd(), t.mode & Nt) {
          Gn(!0);
          try {
            C = fd(e, t, h, o, b, u), x = dd();
          } finally {
            Gn(!1);
          }
        }
        si(!1);
      }
      return ia(), e !== null && !so ? (KE(e, t, u), $l(e, t, u)) : (Vr() && x && CS(t), t.flags |= wo, Ra(e, t, C, u), t.child);
    }
    function zT(e, t, a, o, u) {
      if (e === null) {
        var d = a.type;
        if (NA(d) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var h = d;
          return h = bd(d), t.tag = fe, t.type = h, Hb(t, d), UT(e, t, h, o, u);
        }
        {
          var b = d.propTypes;
          if (b && ro(
            b,
            o,
            // Resolved props
            "prop",
            Jt(d)
          ), a.defaultProps !== void 0) {
            var C = Jt(d) || "Unknown";
            Rv[C] || (y("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", C), Rv[C] = !0);
          }
        }
        var x = w1(a.type, null, o, t, t.mode, u);
        return x.ref = t.ref, x.return = t, t.child = x, x;
      }
      {
        var R = a.type, $ = R.propTypes;
        $ && ro(
          $,
          o,
          // Resolved props
          "prop",
          Jt(R)
        );
      }
      var P = e.child, Z = qb(e, u);
      if (!Z) {
        var ee = P.memoizedProps, re = a.compare;
        if (re = re !== null ? re : vt, re(ee, o) && e.ref === t.ref)
          return $l(e, t, u);
      }
      t.flags |= wo;
      var Ue = bc(P, o);
      return Ue.ref = t.ref, Ue.return = t, t.child = Ue, Ue;
    }
    function UT(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === mt) {
          var h = d, b = h._payload, C = h._init;
          try {
            d = C(b);
          } catch {
            d = null;
          }
          var x = d && d.propTypes;
          x && ro(
            x,
            o,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Jt(d)
          );
        }
      }
      if (e !== null) {
        var R = e.memoizedProps;
        if (vt(R, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (so = !1, t.pendingProps = o = R, qb(e, u))
            (e.flags & Ls) !== st && (so = !0);
          else return t.lanes = e.lanes, $l(e, t, u);
      }
      return Vb(e, t, a, o, u);
    }
    function FT(e, t, a) {
      var o = t.pendingProps, u = o.children, d = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || Y)
        if ((t.mode & tt) === Ze) {
          var h = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = h, cg(t, a);
        } else if (ua(a, zr)) {
          var $ = {
            baseLanes: he,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = $;
          var P = d !== null ? d.baseLanes : a;
          cg(t, P);
        } else {
          var b = null, C;
          if (d !== null) {
            var x = d.baseLanes;
            C = _t(x, a);
          } else
            C = a;
          t.lanes = t.childLanes = zr;
          var R = {
            baseLanes: C,
            cachePool: b,
            transitions: null
          };
          return t.memoizedState = R, t.updateQueue = null, cg(t, C), null;
        }
      else {
        var Z;
        d !== null ? (Z = _t(d.baseLanes, a), t.memoizedState = null) : Z = a, cg(t, Z);
      }
      return Ra(e, t, u, a), t.child;
    }
    function OD(e, t, a) {
      var o = t.pendingProps;
      return Ra(e, t, o, a), t.child;
    }
    function DD(e, t, a) {
      var o = t.pendingProps.children;
      return Ra(e, t, o, a), t.child;
    }
    function MD(e, t, a) {
      {
        t.flags |= kt;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, d = u.children;
      return Ra(e, t, d, a), t.child;
    }
    function PT(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= ea, t.flags |= pp);
    }
    function Vb(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && ro(
          d,
          o,
          // Resolved props
          "prop",
          Jt(a)
        );
      }
      var h;
      {
        var b = Zf(t, a, !0);
        h = Jf(t, b);
      }
      var C, x;
      id(t, u), vu(t);
      {
        if (xv.current = t, si(!0), C = fd(e, t, a, o, h, u), x = dd(), t.mode & Nt) {
          Gn(!0);
          try {
            C = fd(e, t, a, o, h, u), x = dd();
          } finally {
            Gn(!1);
          }
        }
        si(!1);
      }
      return ia(), e !== null && !so ? (KE(e, t, u), $l(e, t, u)) : (Vr() && x && CS(t), t.flags |= wo, Ra(e, t, C, u), t.child);
    }
    function jT(e, t, a, o, u) {
      {
        switch (QA(t)) {
          case !1: {
            var d = t.stateNode, h = t.type, b = new h(t.memoizedProps, d.context), C = b.state;
            d.updater.enqueueSetState(d, C, null);
            break;
          }
          case !0: {
            t.flags |= bt, t.flags |= dr;
            var x = new Error("Simulated error coming from DevTools"), R = xu(u);
            t.lanes = _t(t.lanes, R);
            var $ = zb(t, vc(x, t), R);
            BS(t, $);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var P = a.propTypes;
          P && ro(
            P,
            o,
            // Resolved props
            "prop",
            Jt(a)
          );
        }
      }
      var Z;
      Po(a) ? (Z = !0, sy(t)) : Z = !1, id(t, u);
      var ee = t.stateNode, re;
      ee === null ? (Jy(e, t), kT(t, a, o), Ab(t, a, o, u), re = !0) : e === null ? re = bD(t, a, o, u) : re = CD(e, t, a, o, u);
      var Ue = Bb(e, t, a, re, Z, u);
      {
        var ft = t.stateNode;
        re && ft.props !== o && (hc || y("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Rt(t) || "a component"), hc = !0);
      }
      return Ue;
    }
    function Bb(e, t, a, o, u, d) {
      PT(e, t);
      var h = (t.flags & bt) !== st;
      if (!o && !h)
        return u && bE(t, a, !1), $l(e, t, d);
      var b = t.stateNode;
      xv.current = t;
      var C;
      if (h && typeof a.getDerivedStateFromError != "function")
        C = null, TT();
      else {
        vu(t);
        {
          if (si(!0), C = b.render(), t.mode & Nt) {
            Gn(!0);
            try {
              b.render();
            } finally {
              Gn(!1);
            }
          }
          si(!1);
        }
        ia();
      }
      return t.flags |= wo, e !== null && h ? kD(e, t, C, d) : Ra(e, t, C, d), t.memoizedState = b.state, u && bE(t, a, !0), t.child;
    }
    function $T(e) {
      var t = e.stateNode;
      t.pendingContext ? gE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && gE(e, t.context, !1), HS(e, t.containerInfo);
    }
    function AD(e, t, a) {
      if ($T(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, u = t.memoizedState, d = u.element;
      HE(e, t), Ry(t, o, null, a);
      var h = t.memoizedState;
      t.stateNode;
      var b = h.element;
      if (u.isDehydrated) {
        var C = {
          element: b,
          isDehydrated: !1,
          cache: h.cache,
          pendingSuspenseBoundaries: h.pendingSuspenseBoundaries,
          transitions: h.transitions
        }, x = t.updateQueue;
        if (x.baseState = C, t.memoizedState = C, t.flags & Ln) {
          var R = vc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return VT(e, t, b, a, R);
        } else if (b !== d) {
          var $ = vc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return VT(e, t, b, a, $);
        } else {
          zO(t);
          var P = UE(t, null, b, a);
          t.child = P;
          for (var Z = P; Z; )
            Z.flags = Z.flags & ~gn | $a, Z = Z.sibling;
        }
      } else {
        if (nd(), b === d)
          return $l(e, t, a);
        Ra(e, t, b, a);
      }
      return t.child;
    }
    function VT(e, t, a, o, u) {
      return nd(), _S(u), t.flags |= Ln, Ra(e, t, a, o), t.child;
    }
    function ND(e, t, a) {
      GE(t), e === null && RS(t);
      var o = t.type, u = t.pendingProps, d = e !== null ? e.memoizedProps : null, h = u.children, b = lS(o, u);
      return b ? h = null : d !== null && lS(o, d) && (t.flags |= qt), PT(e, t), Ra(e, t, h, a), t.child;
    }
    function LD(e, t) {
      return e === null && RS(t), null;
    }
    function zD(e, t, a, o) {
      Jy(e, t);
      var u = t.pendingProps, d = a, h = d._payload, b = d._init, C = b(h);
      t.type = C;
      var x = t.tag = LA(C), R = uo(C, u), $;
      switch (x) {
        case w:
          return Hb(t, C), t.type = C = bd(C), $ = Vb(null, t, C, R, o), $;
        case k:
          return t.type = C = S1(C), $ = jT(null, t, C, R, o), $;
        case X:
          return t.type = C = b1(C), $ = LT(null, t, C, R, o), $;
        case be: {
          if (t.type !== t.elementType) {
            var P = C.propTypes;
            P && ro(
              P,
              R,
              // Resolved for outer only
              "prop",
              Jt(C)
            );
          }
          return $ = zT(
            null,
            t,
            C,
            uo(C.type, R),
            // The inner type can have defaults too
            o
          ), $;
        }
      }
      var Z = "";
      throw C !== null && typeof C == "object" && C.$$typeof === mt && (Z = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + C + ". " + ("Lazy element type must resolve to a class or function." + Z));
    }
    function UD(e, t, a, o, u) {
      Jy(e, t), t.tag = k;
      var d;
      return Po(a) ? (d = !0, sy(t)) : d = !1, id(t, u), kT(t, a, o), Ab(t, a, o, u), Bb(null, t, a, !0, d, u);
    }
    function FD(e, t, a, o) {
      Jy(e, t);
      var u = t.pendingProps, d;
      {
        var h = Zf(t, a, !1);
        d = Jf(t, h);
      }
      id(t, o);
      var b, C;
      vu(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var x = Jt(a) || "Unknown";
          Ub[x] || (y("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", x, x), Ub[x] = !0);
        }
        t.mode & Nt && io.recordLegacyContextWarning(t, null), si(!0), xv.current = t, b = fd(null, t, a, u, d, o), C = dd(), si(!1);
      }
      if (ia(), t.flags |= wo, typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0) {
        var R = Jt(a) || "Unknown";
        wv[R] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", R, R, R), wv[R] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0
      ) {
        {
          var $ = Jt(a) || "Unknown";
          wv[$] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", $, $, $), wv[$] = !0);
        }
        t.tag = k, t.memoizedState = null, t.updateQueue = null;
        var P = !1;
        return Po(a) ? (P = !0, sy(t)) : P = !1, t.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null, VS(t), _T(t, b), Ab(t, a, u, o), Bb(null, t, a, !0, P, o);
      } else {
        if (t.tag = w, t.mode & Nt) {
          Gn(!0);
          try {
            b = fd(null, t, a, u, d, o), C = dd();
          } finally {
            Gn(!1);
          }
        }
        return Vr() && C && CS(t), Ra(null, t, b, o), Hb(t, a), t.child;
      }
    }
    function Hb(e, t) {
      {
        if (t && t.childContextTypes && y("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", o = Ua();
          o && (a += `

Check the render method of \`` + o + "`.");
          var u = o || "", d = e._debugSource;
          d && (u = d.fileName + ":" + d.lineNumber), jb[u] || (jb[u] = !0, y("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var h = Jt(t) || "Unknown";
          Rv[h] || (y("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", h), Rv[h] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var b = Jt(t) || "Unknown";
          Pb[b] || (y("%s: Function components do not support getDerivedStateFromProps.", b), Pb[b] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var C = Jt(t) || "Unknown";
          Fb[C] || (y("%s: Function components do not support contextType.", C), Fb[C] = !0);
        }
      }
    }
    var Ib = {
      dehydrated: null,
      treeContext: null,
      retryLane: Qn
    };
    function Yb(e) {
      return {
        baseLanes: e,
        cachePool: _D(),
        transitions: null
      };
    }
    function PD(e, t) {
      var a = null;
      return {
        baseLanes: _t(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function jD(e, t, a, o) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return WS(e, hv);
    }
    function $D(e, t) {
      return Is(e.childLanes, t);
    }
    function BT(e, t, a) {
      var o = t.pendingProps;
      qA(t) && (t.flags |= bt);
      var u = oo.current, d = !1, h = (t.flags & bt) !== st;
      if (h || jD(u, e) ? (d = !0, t.flags &= ~bt) : (e === null || e.memoizedState !== null) && (u = aD(u, qE)), u = ld(u), qu(t, u), e === null) {
        RS(t);
        var b = t.memoizedState;
        if (b !== null) {
          var C = b.dehydrated;
          if (C !== null)
            return YD(t, C);
        }
        var x = o.children, R = o.fallback;
        if (d) {
          var $ = VD(t, x, R, a), P = t.child;
          return P.memoizedState = Yb(a), t.memoizedState = Ib, $;
        } else
          return Wb(t, x);
      } else {
        var Z = e.memoizedState;
        if (Z !== null) {
          var ee = Z.dehydrated;
          if (ee !== null)
            return WD(e, t, h, o, ee, Z, a);
        }
        if (d) {
          var re = o.fallback, Ue = o.children, ft = HD(e, t, Ue, re, a), nt = t.child, $t = e.child.memoizedState;
          return nt.memoizedState = $t === null ? Yb(a) : PD($t, a), nt.childLanes = $D(e, a), t.memoizedState = Ib, ft;
        } else {
          var zt = o.children, Q = BD(e, t, zt, a);
          return t.memoizedState = null, Q;
        }
      }
    }
    function Wb(e, t, a) {
      var o = e.mode, u = {
        mode: "visible",
        children: t
      }, d = Gb(u, o);
      return d.return = e, e.child = d, d;
    }
    function VD(e, t, a, o) {
      var u = e.mode, d = e.child, h = {
        mode: "hidden",
        children: t
      }, b, C;
      return (u & tt) === Ze && d !== null ? (b = d, b.childLanes = he, b.pendingProps = h, e.mode & Ct && (b.actualDuration = 0, b.actualStartTime = -1, b.selfBaseDuration = 0, b.treeBaseDuration = 0), C = rs(a, u, o, null)) : (b = Gb(h, u), C = rs(a, u, o, null)), b.return = e, C.return = e, b.sibling = C, e.child = b, C;
    }
    function Gb(e, t, a) {
      return Hx(e, t, he, null);
    }
    function HT(e, t) {
      return bc(e, t);
    }
    function BD(e, t, a, o) {
      var u = e.child, d = u.sibling, h = HT(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & tt) === Ze && (h.lanes = o), h.return = t, h.sibling = null, d !== null) {
        var b = t.deletions;
        b === null ? (t.deletions = [d], t.flags |= Gt) : b.push(d);
      }
      return t.child = h, h;
    }
    function HD(e, t, a, o, u) {
      var d = t.mode, h = e.child, b = h.sibling, C = {
        mode: "hidden",
        children: a
      }, x;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (d & tt) === Ze && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== h
      ) {
        var R = t.child;
        x = R, x.childLanes = he, x.pendingProps = C, t.mode & Ct && (x.actualDuration = 0, x.actualStartTime = -1, x.selfBaseDuration = h.selfBaseDuration, x.treeBaseDuration = h.treeBaseDuration), t.deletions = null;
      } else
        x = HT(h, C), x.subtreeFlags = h.subtreeFlags & Sr;
      var $;
      return b !== null ? $ = bc(b, o) : ($ = rs(o, d, u, null), $.flags |= gn), $.return = t, x.return = t, x.sibling = $, t.child = x, $;
    }
    function Zy(e, t, a, o) {
      o !== null && _S(o), rd(t, e.child, null, a);
      var u = t.pendingProps, d = u.children, h = Wb(t, d);
      return h.flags |= gn, t.memoizedState = null, h;
    }
    function ID(e, t, a, o, u) {
      var d = t.mode, h = {
        mode: "visible",
        children: a
      }, b = Gb(h, d), C = rs(o, d, u, null);
      return C.flags |= gn, b.return = t, C.return = t, b.sibling = C, t.child = b, (t.mode & tt) !== Ze && rd(t, e.child, null, u), C;
    }
    function YD(e, t, a) {
      return (e.mode & tt) === Ze ? (y("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = ot) : fS(t) ? e.lanes = Zi : e.lanes = zr, null;
    }
    function WD(e, t, a, o, u, d, h) {
      if (a)
        if (t.flags & Ln) {
          t.flags &= ~Ln;
          var Q = Nb(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Zy(e, t, h, Q);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= bt, null;
          var ae = o.children, q = o.fallback, Ee = ID(e, t, ae, q, h), Be = t.child;
          return Be.memoizedState = Yb(h), t.memoizedState = Ib, Ee;
        }
      else {
        if (NO(), (t.mode & tt) === Ze)
          return Zy(
            e,
            t,
            h,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (fS(u)) {
          var b, C, x;
          {
            var R = Kk(u);
            b = R.digest, C = R.message, x = R.stack;
          }
          var $;
          C ? $ = new Error(C) : $ = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var P = Nb($, b, x);
          return Zy(e, t, h, P);
        }
        var Z = ua(h, e.childLanes);
        if (so || Z) {
          var ee = sg();
          if (ee !== null) {
            var re = xm(ee, h);
            if (re !== Qn && re !== d.retryLane) {
              d.retryLane = re;
              var Ue = hn;
              Za(e, re), Or(ee, e, re, Ue);
            }
          }
          v1();
          var ft = Nb(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Zy(e, t, h, ft);
        } else if (dE(u)) {
          t.flags |= bt, t.child = e.child;
          var nt = yA.bind(null, e);
          return Xk(u, nt), null;
        } else {
          UO(t, u, d.treeContext);
          var $t = o.children, zt = Wb(t, $t);
          return zt.flags |= $a, zt;
        }
      }
    }
    function IT(e, t, a) {
      e.lanes = _t(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = _t(o.lanes, t)), FS(e.return, t, a);
    }
    function GD(e, t, a) {
      for (var o = t; o !== null; ) {
        if (o.tag === V) {
          var u = o.memoizedState;
          u !== null && IT(o, a, e);
        } else if (o.tag === ke)
          IT(o, a, e);
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
    function QD(e) {
      for (var t = e, a = null; t !== null; ) {
        var o = t.alternate;
        o !== null && Dy(o) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function qD(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !$b[e])
        if ($b[e] = !0, typeof e == "string")
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
    function KD(e, t) {
      e !== void 0 && !Xy[e] && (e !== "collapsed" && e !== "hidden" ? (Xy[e] = !0, y('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Xy[e] = !0, y('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function YT(e, t) {
      {
        var a = cr(e), o = !a && typeof ga(e) == "function";
        if (a || o) {
          var u = a ? "array" : "iterable";
          return y("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function XD(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (cr(e)) {
          for (var a = 0; a < e.length; a++)
            if (!YT(e[a], a))
              return;
        } else {
          var o = ga(e);
          if (typeof o == "function") {
            var u = o.call(e);
            if (u)
              for (var d = u.next(), h = 0; !d.done; d = u.next()) {
                if (!YT(d.value, h))
                  return;
                h++;
              }
          } else
            y('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function Qb(e, t, a, o, u) {
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
    function WT(e, t, a) {
      var o = t.pendingProps, u = o.revealOrder, d = o.tail, h = o.children;
      qD(u), KD(d, u), XD(h, u), Ra(e, t, h, a);
      var b = oo.current, C = WS(b, hv);
      if (C)
        b = GS(b, hv), t.flags |= bt;
      else {
        var x = e !== null && (e.flags & bt) !== st;
        x && GD(t, t.child, a), b = ld(b);
      }
      if (qu(t, b), (t.mode & tt) === Ze)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var R = QD(t.child), $;
            R === null ? ($ = t.child, t.child = null) : ($ = R.sibling, R.sibling = null), Qb(
              t,
              !1,
              // isBackwards
              $,
              R,
              d
            );
            break;
          }
          case "backwards": {
            var P = null, Z = t.child;
            for (t.child = null; Z !== null; ) {
              var ee = Z.alternate;
              if (ee !== null && Dy(ee) === null) {
                t.child = Z;
                break;
              }
              var re = Z.sibling;
              Z.sibling = P, P = Z, Z = re;
            }
            Qb(
              t,
              !0,
              // isBackwards
              P,
              null,
              // last
              d
            );
            break;
          }
          case "together": {
            Qb(
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
    function ZD(e, t, a) {
      HS(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = rd(t, null, o, a) : Ra(e, t, o, a), t.child;
    }
    var GT = !1;
    function JD(e, t, a) {
      var o = t.type, u = o._context, d = t.pendingProps, h = t.memoizedProps, b = d.value;
      {
        "value" in d || GT || (GT = !0, y("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var C = t.type.propTypes;
        C && ro(C, d, "prop", "Context.Provider");
      }
      if (jE(t, u, b), h !== null) {
        var x = h.value;
        if (We(x, b)) {
          if (h.children === d.children && !ly())
            return $l(e, t, a);
        } else
          qO(t, u, a);
      }
      var R = d.children;
      return Ra(e, t, R, a), t.child;
    }
    var QT = !1;
    function eM(e, t, a) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (QT || (QT = !0, y("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var u = t.pendingProps, d = u.children;
      typeof d != "function" && y("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), id(t, a);
      var h = mr(o);
      vu(t);
      var b;
      return xv.current = t, si(!0), b = d(h), si(!1), ia(), t.flags |= wo, Ra(e, t, b, a), t.child;
    }
    function _v() {
      so = !0;
    }
    function Jy(e, t) {
      (t.mode & tt) === Ze && e !== null && (e.alternate = null, t.alternate = null, t.flags |= gn);
    }
    function $l(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), TT(), jv(t.lanes), ua(a, t.childLanes) ? (GO(e, t), t.child) : null;
    }
    function tM(e, t, a) {
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
    function qb(e, t) {
      var a = e.lanes;
      return !!ua(a, t);
    }
    function nM(e, t, a) {
      switch (t.tag) {
        case O:
          $T(t), t.stateNode, nd();
          break;
        case H:
          GE(t);
          break;
        case k: {
          var o = t.type;
          Po(o) && sy(t);
          break;
        }
        case z:
          HS(t, t.stateNode.containerInfo);
          break;
        case oe: {
          var u = t.memoizedProps.value, d = t.type._context;
          jE(t, d, u);
          break;
        }
        case le:
          {
            var h = ua(a, t.childLanes);
            h && (t.flags |= kt);
            {
              var b = t.stateNode;
              b.effectDuration = 0, b.passiveEffectDuration = 0;
            }
          }
          break;
        case V: {
          var C = t.memoizedState;
          if (C !== null) {
            if (C.dehydrated !== null)
              return qu(t, ld(oo.current)), t.flags |= bt, null;
            var x = t.child, R = x.childLanes;
            if (ua(a, R))
              return BT(e, t, a);
            qu(t, ld(oo.current));
            var $ = $l(e, t, a);
            return $ !== null ? $.sibling : null;
          } else
            qu(t, ld(oo.current));
          break;
        }
        case ke: {
          var P = (e.flags & bt) !== st, Z = ua(a, t.childLanes);
          if (P) {
            if (Z)
              return WT(e, t, a);
            t.flags |= bt;
          }
          var ee = t.memoizedState;
          if (ee !== null && (ee.rendering = null, ee.tail = null, ee.lastEffect = null), qu(t, oo.current), Z)
            break;
          return null;
        }
        case pe:
        case Re:
          return t.lanes = he, FT(e, t, a);
      }
      return $l(e, t, a);
    }
    function qT(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return tM(e, t, w1(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, u = t.pendingProps;
        if (o !== u || ly() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          so = !0;
        else {
          var d = qb(e, a);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & bt) === st)
            return so = !1, nM(e, t, a);
          (e.flags & Ls) !== st ? so = !0 : so = !1;
        }
      } else if (so = !1, Vr() && _O(t)) {
        var h = t.index, b = kO();
        TE(t, b, h);
      }
      switch (t.lanes = he, t.tag) {
        case A:
          return FD(e, t, t.type, a);
        case et: {
          var C = t.elementType;
          return zD(e, t, C, a);
        }
        case w: {
          var x = t.type, R = t.pendingProps, $ = t.elementType === x ? R : uo(x, R);
          return Vb(e, t, x, $, a);
        }
        case k: {
          var P = t.type, Z = t.pendingProps, ee = t.elementType === P ? Z : uo(P, Z);
          return jT(e, t, P, ee, a);
        }
        case O:
          return AD(e, t, a);
        case H:
          return ND(e, t, a);
        case I:
          return LD(e, t);
        case V:
          return BT(e, t, a);
        case z:
          return ZD(e, t, a);
        case X: {
          var re = t.type, Ue = t.pendingProps, ft = t.elementType === re ? Ue : uo(re, Ue);
          return LT(e, t, re, ft, a);
        }
        case B:
          return OD(e, t, a);
        case F:
          return DD(e, t, a);
        case le:
          return MD(e, t, a);
        case oe:
          return JD(e, t, a);
        case ce:
          return eM(e, t, a);
        case be: {
          var nt = t.type, $t = t.pendingProps, zt = uo(nt, $t);
          if (t.type !== t.elementType) {
            var Q = nt.propTypes;
            Q && ro(
              Q,
              zt,
              // Resolved for outer only
              "prop",
              Jt(nt)
            );
          }
          return zt = uo(nt.type, zt), zT(e, t, nt, zt, a);
        }
        case fe:
          return UT(e, t, t.type, t.pendingProps, a);
        case _: {
          var ae = t.type, q = t.pendingProps, Ee = t.elementType === ae ? q : uo(ae, q);
          return UD(e, t, ae, Ee, a);
        }
        case ke:
          return WT(e, t, a);
        case ve:
          break;
        case pe:
          return FT(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function pd(e) {
      e.flags |= kt;
    }
    function KT(e) {
      e.flags |= ea, e.flags |= pp;
    }
    var XT, Kb, ZT, JT;
    XT = function(e, t, a, o) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === H || u.tag === I)
          xk(e, u.stateNode);
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
    }, Kb = function(e, t) {
    }, ZT = function(e, t, a, o, u) {
      var d = e.memoizedProps;
      if (d !== o) {
        var h = t.stateNode, b = IS(), C = Rk(h, a, d, o, u, b);
        t.updateQueue = C, C && pd(t);
      }
    }, JT = function(e, t, a, o) {
      a !== o && pd(t);
    };
    function kv(e, t) {
      if (!Vr())
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
    function Hr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = he, o = st;
      if (t) {
        if ((e.mode & Ct) !== Ze) {
          for (var C = e.selfBaseDuration, x = e.child; x !== null; )
            a = _t(a, _t(x.lanes, x.childLanes)), o |= x.subtreeFlags & Sr, o |= x.flags & Sr, C += x.treeBaseDuration, x = x.sibling;
          e.treeBaseDuration = C;
        } else
          for (var R = e.child; R !== null; )
            a = _t(a, _t(R.lanes, R.childLanes)), o |= R.subtreeFlags & Sr, o |= R.flags & Sr, R.return = e, R = R.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & Ct) !== Ze) {
          for (var u = e.actualDuration, d = e.selfBaseDuration, h = e.child; h !== null; )
            a = _t(a, _t(h.lanes, h.childLanes)), o |= h.subtreeFlags, o |= h.flags, u += h.actualDuration, d += h.treeBaseDuration, h = h.sibling;
          e.actualDuration = u, e.treeBaseDuration = d;
        } else
          for (var b = e.child; b !== null; )
            a = _t(a, _t(b.lanes, b.childLanes)), o |= b.subtreeFlags, o |= b.flags, b.return = e, b = b.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = a, t;
    }
    function rM(e, t, a) {
      if (VO() && (t.mode & tt) !== Ze && (t.flags & bt) === st)
        return DE(t), nd(), t.flags |= Ln | ba | dr, !1;
      var o = vy(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (jO(t), Hr(t), (t.mode & Ct) !== Ze) {
            var u = a !== null;
            if (u) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (nd(), (t.flags & bt) === st && (t.memoizedState = null), t.flags |= kt, Hr(t), (t.mode & Ct) !== Ze) {
            var h = a !== null;
            if (h) {
              var b = t.child;
              b !== null && (t.treeBaseDuration -= b.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return ME(), !0;
    }
    function ex(e, t, a) {
      var o = t.pendingProps;
      switch (ES(t), t.tag) {
        case A:
        case et:
        case fe:
        case w:
        case X:
        case B:
        case F:
        case le:
        case ce:
        case be:
          return Hr(t), null;
        case k: {
          var u = t.type;
          return Po(u) && uy(t), Hr(t), null;
        }
        case O: {
          var d = t.stateNode;
          if (od(t), gS(t), qS(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var h = vy(t);
            if (h)
              pd(t);
            else if (e !== null) {
              var b = e.memoizedState;
              // Check if this is a client root
              (!b.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Ln) !== st) && (t.flags |= ja, ME());
            }
          }
          return Kb(e, t), Hr(t), null;
        }
        case H: {
          YS(t);
          var C = WE(), x = t.type;
          if (e !== null && t.stateNode != null)
            ZT(e, t, x, o, C), e.ref !== t.ref && KT(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Hr(t), null;
            }
            var R = IS(), $ = vy(t);
            if ($)
              FO(t, C, R) && pd(t);
            else {
              var P = Tk(x, o, C, R, t);
              XT(P, t, !1, !1), t.stateNode = P, wk(P, x, o, C) && pd(t);
            }
            t.ref !== null && KT(t);
          }
          return Hr(t), null;
        }
        case I: {
          var Z = o;
          if (e && t.stateNode != null) {
            var ee = e.memoizedProps;
            JT(e, t, ee, Z);
          } else {
            if (typeof Z != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var re = WE(), Ue = IS(), ft = vy(t);
            ft ? PO(t) && pd(t) : t.stateNode = _k(Z, re, Ue, t);
          }
          return Hr(t), null;
        }
        case V: {
          ud(t);
          var nt = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var $t = rM(e, t, nt);
            if (!$t)
              return t.flags & dr ? t : null;
          }
          if ((t.flags & bt) !== st)
            return t.lanes = a, (t.mode & Ct) !== Ze && bb(t), t;
          var zt = nt !== null, Q = e !== null && e.memoizedState !== null;
          if (zt !== Q && zt) {
            var ae = t.child;
            if (ae.flags |= Ro, (t.mode & tt) !== Ze) {
              var q = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !de);
              q || WS(oo.current, qE) ? aA() : v1();
            }
          }
          var Ee = t.updateQueue;
          if (Ee !== null && (t.flags |= kt), Hr(t), (t.mode & Ct) !== Ze && zt) {
            var Be = t.child;
            Be !== null && (t.treeBaseDuration -= Be.treeBaseDuration);
          }
          return null;
        }
        case z:
          return od(t), Kb(e, t), e === null && bO(t.stateNode.containerInfo), Hr(t), null;
        case oe:
          var Fe = t.type._context;
          return US(Fe, t), Hr(t), null;
        case _: {
          var St = t.type;
          return Po(St) && uy(t), Hr(t), null;
        }
        case ke: {
          ud(t);
          var wt = t.memoizedState;
          if (wt === null)
            return Hr(t), null;
          var an = (t.flags & bt) !== st, It = wt.rendering;
          if (It === null)
            if (an)
              kv(wt, !1);
            else {
              var ar = oA() && (e === null || (e.flags & bt) === st);
              if (!ar)
                for (var Yt = t.child; Yt !== null; ) {
                  var qn = Dy(Yt);
                  if (qn !== null) {
                    an = !0, t.flags |= bt, kv(wt, !1);
                    var pa = qn.updateQueue;
                    return pa !== null && (t.updateQueue = pa, t.flags |= kt), t.subtreeFlags = st, QO(t, a), qu(t, GS(oo.current, hv)), t.child;
                  }
                  Yt = Yt.sibling;
                }
              wt.tail !== null && On() > Cx() && (t.flags |= bt, an = !0, kv(wt, !1), t.lanes = pm);
            }
          else {
            if (!an) {
              var Qr = Dy(It);
              if (Qr !== null) {
                t.flags |= bt, an = !0;
                var mi = Qr.updateQueue;
                if (mi !== null && (t.updateQueue = mi, t.flags |= kt), kv(wt, !0), wt.tail === null && wt.tailMode === "hidden" && !It.alternate && !Vr())
                  return Hr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              On() * 2 - wt.renderingStartTime > Cx() && a !== zr && (t.flags |= bt, an = !0, kv(wt, !1), t.lanes = pm);
            }
            if (wt.isBackwards)
              It.sibling = t.child, t.child = It;
            else {
              var Oa = wt.last;
              Oa !== null ? Oa.sibling = It : t.child = It, wt.last = It;
            }
          }
          if (wt.tail !== null) {
            var Da = wt.tail;
            wt.rendering = Da, wt.tail = Da.sibling, wt.renderingStartTime = On(), Da.sibling = null;
            var va = oo.current;
            return an ? va = GS(va, hv) : va = ld(va), qu(t, va), Da;
          }
          return Hr(t), null;
        }
        case ve:
          break;
        case pe:
        case Re: {
          p1(t);
          var Yl = t.memoizedState, Cd = Yl !== null;
          if (e !== null) {
            var Iv = e.memoizedState, Wo = Iv !== null;
            Wo !== Cd && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !Y && (t.flags |= Ro);
          }
          return !Cd || (t.mode & tt) === Ze ? Hr(t) : ua(Yo, zr) && (Hr(t), t.subtreeFlags & (gn | kt) && (t.flags |= Ro)), null;
        }
        case lt:
          return null;
        case Qe:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function aM(e, t, a) {
      switch (ES(t), t.tag) {
        case k: {
          var o = t.type;
          Po(o) && uy(t);
          var u = t.flags;
          return u & dr ? (t.flags = u & ~dr | bt, (t.mode & Ct) !== Ze && bb(t), t) : null;
        }
        case O: {
          t.stateNode, od(t), gS(t), qS();
          var d = t.flags;
          return (d & dr) !== st && (d & bt) === st ? (t.flags = d & ~dr | bt, t) : null;
        }
        case H:
          return YS(t), null;
        case V: {
          ud(t);
          var h = t.memoizedState;
          if (h !== null && h.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            nd();
          }
          var b = t.flags;
          return b & dr ? (t.flags = b & ~dr | bt, (t.mode & Ct) !== Ze && bb(t), t) : null;
        }
        case ke:
          return ud(t), null;
        case z:
          return od(t), null;
        case oe:
          var C = t.type._context;
          return US(C, t), null;
        case pe:
        case Re:
          return p1(t), null;
        case lt:
          return null;
        default:
          return null;
      }
    }
    function tx(e, t, a) {
      switch (ES(t), t.tag) {
        case k: {
          var o = t.type.childContextTypes;
          o != null && uy(t);
          break;
        }
        case O: {
          t.stateNode, od(t), gS(t), qS();
          break;
        }
        case H: {
          YS(t);
          break;
        }
        case z:
          od(t);
          break;
        case V:
          ud(t);
          break;
        case ke:
          ud(t);
          break;
        case oe:
          var u = t.type._context;
          US(u, t);
          break;
        case pe:
        case Re:
          p1(t);
          break;
      }
    }
    var nx = null;
    nx = /* @__PURE__ */ new Set();
    var eg = !1, Ir = !1, iM = typeof WeakSet == "function" ? WeakSet : Set, Ge = null, vd = null, hd = null;
    function oM(e) {
      ml(null, function() {
        throw e;
      }), fp();
    }
    var lM = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Ct)
        try {
          Ho(), t.componentWillUnmount();
        } finally {
          Bo(e);
        }
      else
        t.componentWillUnmount();
    };
    function rx(e, t) {
      try {
        Zu(Tr, e);
      } catch (a) {
        Cn(e, t, a);
      }
    }
    function Xb(e, t, a) {
      try {
        lM(e, a);
      } catch (o) {
        Cn(e, t, o);
      }
    }
    function uM(e, t, a) {
      try {
        a.componentDidMount();
      } catch (o) {
        Cn(e, t, o);
      }
    }
    function ax(e, t) {
      try {
        ox(e);
      } catch (a) {
        Cn(e, t, a);
      }
    }
    function md(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var o;
          try {
            if (Ie && ut && e.mode & Ct)
              try {
                Ho(), o = a(null);
              } finally {
                Bo(e);
              }
            else
              o = a(null);
          } catch (u) {
            Cn(e, t, u);
          }
          typeof o == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Rt(e));
        } else
          a.current = null;
    }
    function tg(e, t, a) {
      try {
        a();
      } catch (o) {
        Cn(e, t, o);
      }
    }
    var ix = !1;
    function sM(e, t) {
      Ck(e.containerInfo), Ge = t, cM();
      var a = ix;
      return ix = !1, a;
    }
    function cM() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        (e.subtreeFlags & fu) !== st && t !== null ? (t.return = e, Ge = t) : fM();
      }
    }
    function fM() {
      for (; Ge !== null; ) {
        var e = Ge;
        nn(e);
        try {
          dM(e);
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
    function dM(e) {
      var t = e.alternate, a = e.flags;
      if ((a & ja) !== st) {
        switch (nn(e), e.tag) {
          case w:
          case X:
          case fe:
            break;
          case k: {
            if (t !== null) {
              var o = t.memoizedProps, u = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !hc && (d.props !== e.memoizedProps && y("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Rt(e) || "instance"), d.state !== e.memoizedState && y("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Rt(e) || "instance"));
              var h = d.getSnapshotBeforeUpdate(e.elementType === e.type ? o : uo(e.type, o), u);
              {
                var b = nx;
                h === void 0 && !b.has(e.type) && (b.add(e.type), y("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Rt(e)));
              }
              d.__reactInternalSnapshotBeforeUpdate = h;
            }
            break;
          }
          case O: {
            {
              var C = e.stateNode;
              Wk(C.containerInfo);
            }
            break;
          }
          case H:
          case I:
          case z:
          case _:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Zn();
      }
    }
    function co(e, t, a) {
      var o = t.updateQueue, u = o !== null ? o.lastEffect : null;
      if (u !== null) {
        var d = u.next, h = d;
        do {
          if ((h.tag & e) === e) {
            var b = h.destroy;
            h.destroy = void 0, b !== void 0 && ((e & Br) !== Ja ? cm(t) : (e & Tr) !== Ja && pi(t), (e & jo) !== Ja && Vv(!0), tg(t, a, b), (e & jo) !== Ja && Vv(!1), (e & Br) !== Ja ? tf() : (e & Tr) !== Ja && hu());
          }
          h = h.next;
        } while (h !== d);
      }
    }
    function Zu(e, t) {
      var a = t.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var u = o.next, d = u;
        do {
          if ((d.tag & e) === e) {
            (e & Br) !== Ja ? Oo(t) : (e & Tr) !== Ja && fm(t);
            var h = d.create;
            (e & jo) !== Ja && Vv(!0), d.destroy = h(), (e & jo) !== Ja && Vv(!1), (e & Br) !== Ja ? ef() : (e & Tr) !== Ja && zs();
            {
              var b = d.destroy;
              if (b !== void 0 && typeof b != "function") {
                var C = void 0;
                (d.tag & Tr) !== st ? C = "useLayoutEffect" : (d.tag & jo) !== st ? C = "useInsertionEffect" : C = "useEffect";
                var x = void 0;
                b === null ? x = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof b.then == "function" ? x = `

It looks like you wrote ` + C + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + C + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : x = " You returned: " + b, y("%s must not return anything besides a function, which is used for clean-up.%s", C, x);
              }
            }
          }
          d = d.next;
        } while (d !== u);
      }
    }
    function pM(e, t) {
      if ((t.flags & kt) !== st)
        switch (t.tag) {
          case le: {
            var a = t.stateNode.passiveEffectDuration, o = t.memoizedProps, u = o.id, d = o.onPostCommit, h = CT(), b = t.alternate === null ? "mount" : "update";
            bT() && (b = "nested-update"), typeof d == "function" && d(u, b, a, h);
            var C = t.return;
            e: for (; C !== null; ) {
              switch (C.tag) {
                case O:
                  var x = C.stateNode;
                  x.passiveEffectDuration += a;
                  break e;
                case le:
                  var R = C.stateNode;
                  R.passiveEffectDuration += a;
                  break e;
              }
              C = C.return;
            }
            break;
          }
        }
    }
    function vM(e, t, a, o) {
      if ((a.flags & Nr) !== st)
        switch (a.tag) {
          case w:
          case X:
          case fe: {
            if (!Ir)
              if (a.mode & Ct)
                try {
                  Ho(), Zu(Tr | Er, a);
                } finally {
                  Bo(a);
                }
              else
                Zu(Tr | Er, a);
            break;
          }
          case k: {
            var u = a.stateNode;
            if (a.flags & kt && !Ir)
              if (t === null)
                if (a.type === a.elementType && !hc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Rt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Rt(a) || "instance")), a.mode & Ct)
                  try {
                    Ho(), u.componentDidMount();
                  } finally {
                    Bo(a);
                  }
                else
                  u.componentDidMount();
              else {
                var d = a.elementType === a.type ? t.memoizedProps : uo(a.type, t.memoizedProps), h = t.memoizedState;
                if (a.type === a.elementType && !hc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Rt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Rt(a) || "instance")), a.mode & Ct)
                  try {
                    Ho(), u.componentDidUpdate(d, h, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Bo(a);
                  }
                else
                  u.componentDidUpdate(d, h, u.__reactInternalSnapshotBeforeUpdate);
              }
            var b = a.updateQueue;
            b !== null && (a.type === a.elementType && !hc && (u.props !== a.memoizedProps && y("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Rt(a) || "instance"), u.state !== a.memoizedState && y("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Rt(a) || "instance")), YE(a, b, u));
            break;
          }
          case O: {
            var C = a.updateQueue;
            if (C !== null) {
              var x = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case H:
                    x = a.child.stateNode;
                    break;
                  case k:
                    x = a.child.stateNode;
                    break;
                }
              YE(a, C, x);
            }
            break;
          }
          case H: {
            var R = a.stateNode;
            if (t === null && a.flags & kt) {
              var $ = a.type, P = a.memoizedProps;
              Ak(R, $, P);
            }
            break;
          }
          case I:
            break;
          case z:
            break;
          case le: {
            {
              var Z = a.memoizedProps, ee = Z.onCommit, re = Z.onRender, Ue = a.stateNode.effectDuration, ft = CT(), nt = t === null ? "mount" : "update";
              bT() && (nt = "nested-update"), typeof re == "function" && re(a.memoizedProps.id, nt, a.actualDuration, a.treeBaseDuration, a.actualStartTime, ft);
              {
                typeof ee == "function" && ee(a.memoizedProps.id, nt, Ue, ft), fA(a);
                var $t = a.return;
                e: for (; $t !== null; ) {
                  switch ($t.tag) {
                    case O:
                      var zt = $t.stateNode;
                      zt.effectDuration += Ue;
                      break e;
                    case le:
                      var Q = $t.stateNode;
                      Q.effectDuration += Ue;
                      break e;
                  }
                  $t = $t.return;
                }
              }
            }
            break;
          }
          case V: {
            EM(e, a);
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
      Ir || a.flags & ea && ox(a);
    }
    function hM(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          if (e.mode & Ct)
            try {
              Ho(), rx(e, e.return);
            } finally {
              Bo(e);
            }
          else
            rx(e, e.return);
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && uM(e, e.return, t), ax(e, e.return);
          break;
        }
        case H: {
          ax(e, e.return);
          break;
        }
      }
    }
    function mM(e, t) {
      for (var a = null, o = e; ; ) {
        if (o.tag === H) {
          if (a === null) {
            a = o;
            try {
              var u = o.stateNode;
              t ? Bk(u) : Ik(o.stateNode, o.memoizedProps);
            } catch (h) {
              Cn(e, e.return, h);
            }
          }
        } else if (o.tag === I) {
          if (a === null)
            try {
              var d = o.stateNode;
              t ? Hk(d) : Yk(d, o.memoizedProps);
            } catch (h) {
              Cn(e, e.return, h);
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
    function ox(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, o;
        switch (e.tag) {
          case H:
            o = a;
            break;
          default:
            o = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Ct)
            try {
              Ho(), u = t(o);
            } finally {
              Bo(e);
            }
          else
            u = t(o);
          typeof u == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Rt(e));
        } else
          t.hasOwnProperty("current") || y("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Rt(e)), t.current = o;
      }
    }
    function yM(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function lx(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, lx(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === H) {
          var a = e.stateNode;
          a !== null && TO(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function gM(e) {
      for (var t = e.return; t !== null; ) {
        if (ux(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ux(e) {
      return e.tag === H || e.tag === O || e.tag === z;
    }
    function sx(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || ux(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== H && t.tag !== I && t.tag !== se; ) {
          if (t.flags & gn || t.child === null || t.tag === z)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & gn))
          return t.stateNode;
      }
    }
    function SM(e) {
      var t = gM(e);
      switch (t.tag) {
        case H: {
          var a = t.stateNode;
          t.flags & qt && (fE(a), t.flags &= ~qt);
          var o = sx(e);
          Jb(e, o, a);
          break;
        }
        case O:
        case z: {
          var u = t.stateNode.containerInfo, d = sx(e);
          Zb(e, d, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function Zb(e, t, a) {
      var o = e.tag, u = o === H || o === I;
      if (u) {
        var d = e.stateNode;
        t ? Pk(a, d, t) : Uk(a, d);
      } else if (o !== z) {
        var h = e.child;
        if (h !== null) {
          Zb(h, t, a);
          for (var b = h.sibling; b !== null; )
            Zb(b, t, a), b = b.sibling;
        }
      }
    }
    function Jb(e, t, a) {
      var o = e.tag, u = o === H || o === I;
      if (u) {
        var d = e.stateNode;
        t ? Fk(a, d, t) : zk(a, d);
      } else if (o !== z) {
        var h = e.child;
        if (h !== null) {
          Jb(h, t, a);
          for (var b = h.sibling; b !== null; )
            Jb(b, t, a), b = b.sibling;
        }
      }
    }
    var Yr = null, fo = !1;
    function bM(e, t, a) {
      {
        var o = t;
        e: for (; o !== null; ) {
          switch (o.tag) {
            case H: {
              Yr = o.stateNode, fo = !1;
              break e;
            }
            case O: {
              Yr = o.stateNode.containerInfo, fo = !0;
              break e;
            }
            case z: {
              Yr = o.stateNode.containerInfo, fo = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Yr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        cx(e, t, a), Yr = null, fo = !1;
      }
      yM(a);
    }
    function Ju(e, t, a) {
      for (var o = a.child; o !== null; )
        cx(e, t, o), o = o.sibling;
    }
    function cx(e, t, a) {
      switch (Sl(a), a.tag) {
        case H:
          Ir || md(a, t);
        case I: {
          {
            var o = Yr, u = fo;
            Yr = null, Ju(e, t, a), Yr = o, fo = u, Yr !== null && (fo ? $k(Yr, a.stateNode) : jk(Yr, a.stateNode));
          }
          return;
        }
        case se: {
          Yr !== null && (fo ? Vk(Yr, a.stateNode) : cS(Yr, a.stateNode));
          return;
        }
        case z: {
          {
            var d = Yr, h = fo;
            Yr = a.stateNode.containerInfo, fo = !0, Ju(e, t, a), Yr = d, fo = h;
          }
          return;
        }
        case w:
        case X:
        case be:
        case fe: {
          if (!Ir) {
            var b = a.updateQueue;
            if (b !== null) {
              var C = b.lastEffect;
              if (C !== null) {
                var x = C.next, R = x;
                do {
                  var $ = R, P = $.destroy, Z = $.tag;
                  P !== void 0 && ((Z & jo) !== Ja ? tg(a, t, P) : (Z & Tr) !== Ja && (pi(a), a.mode & Ct ? (Ho(), tg(a, t, P), Bo(a)) : tg(a, t, P), hu())), R = R.next;
                } while (R !== x);
              }
            }
          }
          Ju(e, t, a);
          return;
        }
        case k: {
          if (!Ir) {
            md(a, t);
            var ee = a.stateNode;
            typeof ee.componentWillUnmount == "function" && Xb(a, t, ee);
          }
          Ju(e, t, a);
          return;
        }
        case ve: {
          Ju(e, t, a);
          return;
        }
        case pe: {
          if (
            // TODO: Remove this dead flag
            a.mode & tt
          ) {
            var re = Ir;
            Ir = re || a.memoizedState !== null, Ju(e, t, a), Ir = re;
          } else
            Ju(e, t, a);
          break;
        }
        default: {
          Ju(e, t, a);
          return;
        }
      }
    }
    function CM(e) {
      e.memoizedState;
    }
    function EM(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var o = t.alternate;
        if (o !== null) {
          var u = o.memoizedState;
          if (u !== null) {
            var d = u.dehydrated;
            d !== null && oO(d);
          }
        }
      }
    }
    function fx(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new iM()), t.forEach(function(o) {
          var u = gA.bind(null, e, o);
          if (!a.has(o)) {
            if (a.add(o), Ta)
              if (vd !== null && hd !== null)
                $v(hd, vd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(u, u);
          }
        });
      }
    }
    function TM(e, t, a) {
      vd = a, hd = e, nn(t), dx(t, e), nn(t), vd = null, hd = null;
    }
    function po(e, t, a) {
      var o = t.deletions;
      if (o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u];
          try {
            bM(e, t, d);
          } catch (C) {
            Cn(d, t, C);
          }
        }
      var h = f0();
      if (t.subtreeFlags & ra)
        for (var b = t.child; b !== null; )
          nn(b), dx(b, e), b = b.sibling;
      nn(h);
    }
    function dx(e, t, a) {
      var o = e.alternate, u = e.flags;
      switch (e.tag) {
        case w:
        case X:
        case be:
        case fe: {
          if (po(t, e), Io(e), u & kt) {
            try {
              co(jo | Er, e, e.return), Zu(jo | Er, e);
            } catch (St) {
              Cn(e, e.return, St);
            }
            if (e.mode & Ct) {
              try {
                Ho(), co(Tr | Er, e, e.return);
              } catch (St) {
                Cn(e, e.return, St);
              }
              Bo(e);
            } else
              try {
                co(Tr | Er, e, e.return);
              } catch (St) {
                Cn(e, e.return, St);
              }
          }
          return;
        }
        case k: {
          po(t, e), Io(e), u & ea && o !== null && md(o, o.return);
          return;
        }
        case H: {
          po(t, e), Io(e), u & ea && o !== null && md(o, o.return);
          {
            if (e.flags & qt) {
              var d = e.stateNode;
              try {
                fE(d);
              } catch (St) {
                Cn(e, e.return, St);
              }
            }
            if (u & kt) {
              var h = e.stateNode;
              if (h != null) {
                var b = e.memoizedProps, C = o !== null ? o.memoizedProps : b, x = e.type, R = e.updateQueue;
                if (e.updateQueue = null, R !== null)
                  try {
                    Nk(h, R, x, C, b, e);
                  } catch (St) {
                    Cn(e, e.return, St);
                  }
              }
            }
          }
          return;
        }
        case I: {
          if (po(t, e), Io(e), u & kt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var $ = e.stateNode, P = e.memoizedProps, Z = o !== null ? o.memoizedProps : P;
            try {
              Lk($, Z, P);
            } catch (St) {
              Cn(e, e.return, St);
            }
          }
          return;
        }
        case O: {
          if (po(t, e), Io(e), u & kt && o !== null) {
            var ee = o.memoizedState;
            if (ee.isDehydrated)
              try {
                iO(t.containerInfo);
              } catch (St) {
                Cn(e, e.return, St);
              }
          }
          return;
        }
        case z: {
          po(t, e), Io(e);
          return;
        }
        case V: {
          po(t, e), Io(e);
          var re = e.child;
          if (re.flags & Ro) {
            var Ue = re.stateNode, ft = re.memoizedState, nt = ft !== null;
            if (Ue.isHidden = nt, nt) {
              var $t = re.alternate !== null && re.alternate.memoizedState !== null;
              $t || rA();
            }
          }
          if (u & kt) {
            try {
              CM(e);
            } catch (St) {
              Cn(e, e.return, St);
            }
            fx(e);
          }
          return;
        }
        case pe: {
          var zt = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & tt
          ) {
            var Q = Ir;
            Ir = Q || zt, po(t, e), Ir = Q;
          } else
            po(t, e);
          if (Io(e), u & Ro) {
            var ae = e.stateNode, q = e.memoizedState, Ee = q !== null, Be = e;
            if (ae.isHidden = Ee, Ee && !zt && (Be.mode & tt) !== Ze) {
              Ge = Be;
              for (var Fe = Be.child; Fe !== null; )
                Ge = Fe, wM(Fe), Fe = Fe.sibling;
            }
            mM(Be, Ee);
          }
          return;
        }
        case ke: {
          po(t, e), Io(e), u & kt && fx(e);
          return;
        }
        case ve:
          return;
        default: {
          po(t, e), Io(e);
          return;
        }
      }
    }
    function Io(e) {
      var t = e.flags;
      if (t & gn) {
        try {
          SM(e);
        } catch (a) {
          Cn(e, e.return, a);
        }
        e.flags &= ~gn;
      }
      t & $a && (e.flags &= ~$a);
    }
    function xM(e, t, a) {
      vd = a, hd = t, Ge = e, px(e, t, a), vd = null, hd = null;
    }
    function px(e, t, a) {
      for (var o = (e.mode & tt) !== Ze; Ge !== null; ) {
        var u = Ge, d = u.child;
        if (u.tag === pe && o) {
          var h = u.memoizedState !== null, b = h || eg;
          if (b) {
            e1(e, t, a);
            continue;
          } else {
            var C = u.alternate, x = C !== null && C.memoizedState !== null, R = x || Ir, $ = eg, P = Ir;
            eg = b, Ir = R, Ir && !P && (Ge = u, RM(u));
            for (var Z = d; Z !== null; )
              Ge = Z, px(
                Z,
                // New root; bubble back up to here and stop.
                t,
                a
              ), Z = Z.sibling;
            Ge = u, eg = $, Ir = P, e1(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Nr) !== st && d !== null ? (d.return = u, Ge = d) : e1(e, t, a);
      }
    }
    function e1(e, t, a) {
      for (; Ge !== null; ) {
        var o = Ge;
        if ((o.flags & Nr) !== st) {
          var u = o.alternate;
          nn(o);
          try {
            vM(t, u, o, a);
          } catch (h) {
            Cn(o, o.return, h);
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
    function wM(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        switch (t.tag) {
          case w:
          case X:
          case be:
          case fe: {
            if (t.mode & Ct)
              try {
                Ho(), co(Tr, t, t.return);
              } finally {
                Bo(t);
              }
            else
              co(Tr, t, t.return);
            break;
          }
          case k: {
            md(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && Xb(t, t.return, o);
            break;
          }
          case H: {
            md(t, t.return);
            break;
          }
          case pe: {
            var u = t.memoizedState !== null;
            if (u) {
              vx(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ge = a) : vx(e);
      }
    }
    function vx(e) {
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
    function RM(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.child;
        if (t.tag === pe) {
          var o = t.memoizedState !== null;
          if (o) {
            hx(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ge = a) : hx(e);
      }
    }
    function hx(e) {
      for (; Ge !== null; ) {
        var t = Ge;
        nn(t);
        try {
          hM(t);
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
    function _M(e, t, a, o) {
      Ge = t, kM(t, e, a, o);
    }
    function kM(e, t, a, o) {
      for (; Ge !== null; ) {
        var u = Ge, d = u.child;
        (u.subtreeFlags & Va) !== st && d !== null ? (d.return = u, Ge = d) : OM(e, t, a, o);
      }
    }
    function OM(e, t, a, o) {
      for (; Ge !== null; ) {
        var u = Ge;
        if ((u.flags & wn) !== st) {
          nn(u);
          try {
            DM(t, u, a, o);
          } catch (h) {
            Cn(u, u.return, h);
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
    function DM(e, t, a, o) {
      switch (t.tag) {
        case w:
        case X:
        case fe: {
          if (t.mode & Ct) {
            Sb();
            try {
              Zu(Br | Er, t);
            } finally {
              gb(t);
            }
          } else
            Zu(Br | Er, t);
          break;
        }
      }
    }
    function MM(e) {
      Ge = e, AM();
    }
    function AM() {
      for (; Ge !== null; ) {
        var e = Ge, t = e.child;
        if ((Ge.flags & Gt) !== st) {
          var a = e.deletions;
          if (a !== null) {
            for (var o = 0; o < a.length; o++) {
              var u = a[o];
              Ge = u, zM(u, e);
            }
            {
              var d = e.alternate;
              if (d !== null) {
                var h = d.child;
                if (h !== null) {
                  d.child = null;
                  do {
                    var b = h.sibling;
                    h.sibling = null, h = b;
                  } while (h !== null);
                }
              }
            }
            Ge = e;
          }
        }
        (e.subtreeFlags & Va) !== st && t !== null ? (t.return = e, Ge = t) : NM();
      }
    }
    function NM() {
      for (; Ge !== null; ) {
        var e = Ge;
        (e.flags & wn) !== st && (nn(e), LM(e), Zn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ge = t;
          return;
        }
        Ge = e.return;
      }
    }
    function LM(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          e.mode & Ct ? (Sb(), co(Br | Er, e, e.return), gb(e)) : co(Br | Er, e, e.return);
          break;
        }
      }
    }
    function zM(e, t) {
      for (; Ge !== null; ) {
        var a = Ge;
        nn(a), FM(a, t), Zn();
        var o = a.child;
        o !== null ? (o.return = a, Ge = o) : UM(e);
      }
    }
    function UM(e) {
      for (; Ge !== null; ) {
        var t = Ge, a = t.sibling, o = t.return;
        if (lx(t), t === e) {
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
    function FM(e, t) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          e.mode & Ct ? (Sb(), co(Br, e, t), gb(e)) : co(Br, e, t);
          break;
        }
      }
    }
    function PM(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          try {
            Zu(Tr | Er, e);
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
    function jM(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          try {
            Zu(Br | Er, e);
          } catch (t) {
            Cn(e, e.return, t);
          }
          break;
        }
      }
    }
    function $M(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe: {
          try {
            co(Tr | Er, e, e.return);
          } catch (a) {
            Cn(e, e.return, a);
          }
          break;
        }
        case k: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && Xb(e, e.return, t);
          break;
        }
      }
    }
    function VM(e) {
      switch (e.tag) {
        case w:
        case X:
        case fe:
          try {
            co(Br | Er, e, e.return);
          } catch (t) {
            Cn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Ov = Symbol.for;
      Ov("selector.component"), Ov("selector.has_pseudo_class"), Ov("selector.role"), Ov("selector.test_id"), Ov("selector.text");
    }
    var BM = [];
    function HM() {
      BM.forEach(function(e) {
        return e();
      });
    }
    var IM = c.ReactCurrentActQueue;
    function YM(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function mx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && IM.current !== null && y("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var WM = Math.ceil, t1 = c.ReactCurrentDispatcher, n1 = c.ReactCurrentOwner, Wr = c.ReactCurrentBatchConfig, vo = c.ReactCurrentActQueue, Rr = (
      /*             */
      0
    ), yx = (
      /*               */
      1
    ), Gr = (
      /*                */
      2
    ), zi = (
      /*                */
      4
    ), Vl = 0, Dv = 1, mc = 2, ng = 3, Mv = 4, gx = 5, r1 = 6, jt = Rr, _a = null, In = null, _r = he, Yo = he, a1 = Hu(he), kr = Vl, Av = null, rg = he, Nv = he, ag = he, Lv = null, ei = null, i1 = 0, Sx = 500, bx = 1 / 0, GM = 500, Bl = null;
    function zv() {
      bx = On() + GM;
    }
    function Cx() {
      return bx;
    }
    var ig = !1, o1 = null, yd = null, yc = !1, es = null, Uv = he, l1 = [], u1 = null, QM = 50, Fv = 0, s1 = null, c1 = !1, og = !1, qM = 50, gd = 0, lg = null, Pv = hn, ug = he, Ex = !1;
    function sg() {
      return _a;
    }
    function ka() {
      return (jt & (Gr | zi)) !== Rr ? On() : (Pv !== hn || (Pv = On()), Pv);
    }
    function ts(e) {
      var t = e.mode;
      if ((t & tt) === Ze)
        return ot;
      if ((jt & Gr) !== Rr && _r !== he)
        return xu(_r);
      var a = IO() !== HO;
      if (a) {
        if (Wr.transition !== null) {
          var o = Wr.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return ug === Qn && (ug = Cm()), ug;
      }
      var u = Wa();
      if (u !== Qn)
        return u;
      var d = kk();
      return d;
    }
    function KM(e) {
      var t = e.mode;
      return (t & tt) === Ze ? ot : la();
    }
    function Or(e, t, a, o) {
      bA(), Ex && y("useInsertionEffect must not schedule updates."), c1 && (og = !0), _l(e, a, o), (jt & Gr) !== he && e === _a ? TA(t) : (Ta && wf(e, t, a), xA(t), e === _a && ((jt & Gr) === Rr && (Nv = _t(Nv, a)), kr === Mv && ns(e, _r)), ti(e, o), a === ot && jt === Rr && (t.mode & tt) === Ze && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !vo.isBatchingLegacy && (zv(), EE()));
    }
    function XM(e, t, a) {
      var o = e.current;
      o.lanes = t, _l(e, t, a), ti(e, a);
    }
    function ZM(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (jt & Gr) !== Rr
      );
    }
    function ti(e, t) {
      var a = e.callbackNode;
      mm(e, t);
      var o = wl(e, e === _a ? _r : he);
      if (o === he) {
        a !== null && Px(a), e.callbackNode = null, e.callbackPriority = Qn;
        return;
      }
      var u = Vn(o), d = e.callbackPriority;
      if (d === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(vo.current !== null && a !== y1)) {
        a == null && d !== ot && y("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Px(a);
      var h;
      if (u === ot)
        e.tag === Iu ? (vo.isBatchingLegacy !== null && (vo.didScheduleLegacyUpdate = !0), RO(wx.bind(null, e))) : CE(wx.bind(null, e)), vo.current !== null ? vo.current.push(Yu) : Dk(function() {
          (jt & (Gr | zi)) === Rr && Yu();
        }), h = null;
      else {
        var b;
        switch (Cr(o)) {
          case Bn:
            b = Xc;
            break;
          case Ji:
            b = gl;
            break;
          case Ri:
            b = wi;
            break;
          case wu:
            b = Zc;
            break;
          default:
            b = wi;
            break;
        }
        h = g1(b, Tx.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = h;
    }
    function Tx(e, t) {
      if (mD(), Pv = hn, ug = he, (jt & (Gr | zi)) !== Rr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, o = Il();
      if (o && e.callbackNode !== a)
        return null;
      var u = wl(e, e === _a ? _r : he);
      if (u === he)
        return null;
      var d = !Hs(e, u) && !bm(e, u) && !t, h = d ? uA(e, u) : fg(e, u);
      if (h !== Vl) {
        if (h === mc) {
          var b = Mo(e);
          b !== he && (u = b, h = f1(e, b));
        }
        if (h === Dv) {
          var C = Av;
          throw gc(e, he), ns(e, u), ti(e, On()), C;
        }
        if (h === r1)
          ns(e, u);
        else {
          var x = !Hs(e, u), R = e.current.alternate;
          if (x && !eA(R)) {
            if (h = fg(e, u), h === mc) {
              var $ = Mo(e);
              $ !== he && (u = $, h = f1(e, $));
            }
            if (h === Dv) {
              var P = Av;
              throw gc(e, he), ns(e, u), ti(e, On()), P;
            }
          }
          e.finishedWork = R, e.finishedLanes = u, JM(e, h, u);
        }
      }
      return ti(e, On()), e.callbackNode === a ? Tx.bind(null, e) : null;
    }
    function f1(e, t) {
      var a = Lv;
      if (Rf(e)) {
        var o = gc(e, t);
        o.flags |= Ln, SO(e.containerInfo);
      }
      var u = fg(e, t);
      if (u !== mc) {
        var d = ei;
        ei = a, d !== null && xx(d);
      }
      return u;
    }
    function xx(e) {
      ei === null ? ei = e : ei.push.apply(ei, e);
    }
    function JM(e, t, a) {
      switch (t) {
        case Vl:
        case Dv:
          throw new Error("Root did not complete. This is a bug in React.");
        case mc: {
          Sc(e, ei, Bl);
          break;
        }
        case ng: {
          if (ns(e, a), ym(a) && // do not delay if we're inside an act() scope
          !jx()) {
            var o = i1 + Sx - On();
            if (o > 10) {
              var u = wl(e, he);
              if (u !== he)
                break;
              var d = e.suspendedLanes;
              if (!Rl(d, a)) {
                ka(), Tf(e, d);
                break;
              }
              e.timeoutHandle = uS(Sc.bind(null, e, ei, Bl), o);
              break;
            }
          }
          Sc(e, ei, Bl);
          break;
        }
        case Mv: {
          if (ns(e, a), Sm(a))
            break;
          if (!jx()) {
            var h = vm(e, a), b = h, C = On() - b, x = SA(C) - C;
            if (x > 10) {
              e.timeoutHandle = uS(Sc.bind(null, e, ei, Bl), x);
              break;
            }
          }
          Sc(e, ei, Bl);
          break;
        }
        case gx: {
          Sc(e, ei, Bl);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function eA(e) {
      for (var t = e; ; ) {
        if (t.flags & Ns) {
          var a = t.updateQueue;
          if (a !== null) {
            var o = a.stores;
            if (o !== null)
              for (var u = 0; u < o.length; u++) {
                var d = o[u], h = d.getSnapshot, b = d.value;
                try {
                  if (!We(h(), b))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var C = t.child;
        if (t.subtreeFlags & Ns && C !== null) {
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
    function ns(e, t) {
      t = Is(t, ag), t = Is(t, Nv), Tm(e, t);
    }
    function wx(e) {
      if (yD(), (jt & (Gr | zi)) !== Rr)
        throw new Error("Should not already be working.");
      Il();
      var t = wl(e, he);
      if (!ua(t, ot))
        return ti(e, On()), null;
      var a = fg(e, t);
      if (e.tag !== Iu && a === mc) {
        var o = Mo(e);
        o !== he && (t = o, a = f1(e, o));
      }
      if (a === Dv) {
        var u = Av;
        throw gc(e, he), ns(e, t), ti(e, On()), u;
      }
      if (a === r1)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, Sc(e, ei, Bl), ti(e, On()), null;
    }
    function tA(e, t) {
      t !== he && (kp(e, _t(t, ot)), ti(e, On()), (jt & (Gr | zi)) === Rr && (zv(), Yu()));
    }
    function d1(e, t) {
      var a = jt;
      jt |= yx;
      try {
        return e(t);
      } finally {
        jt = a, jt === Rr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !vo.isBatchingLegacy && (zv(), EE());
      }
    }
    function nA(e, t, a, o, u) {
      var d = Wa(), h = Wr.transition;
      try {
        return Wr.transition = null, zn(Bn), e(t, a, o, u);
      } finally {
        zn(d), Wr.transition = h, jt === Rr && zv();
      }
    }
    function Hl(e) {
      es !== null && es.tag === Iu && (jt & (Gr | zi)) === Rr && Il();
      var t = jt;
      jt |= yx;
      var a = Wr.transition, o = Wa();
      try {
        return Wr.transition = null, zn(Bn), e ? e() : void 0;
      } finally {
        zn(o), Wr.transition = a, jt = t, (jt & (Gr | zi)) === Rr && Yu();
      }
    }
    function Rx() {
      return (jt & (Gr | zi)) !== Rr;
    }
    function cg(e, t) {
      fa(a1, Yo, e), Yo = _t(Yo, t);
    }
    function p1(e) {
      Yo = a1.current, ca(a1, e);
    }
    function gc(e, t) {
      e.finishedWork = null, e.finishedLanes = he;
      var a = e.timeoutHandle;
      if (a !== sS && (e.timeoutHandle = sS, Ok(a)), In !== null)
        for (var o = In.return; o !== null; ) {
          var u = o.alternate;
          tx(u, o), o = o.return;
        }
      _a = e;
      var d = bc(e.current, null);
      return In = d, _r = Yo = t, kr = Vl, Av = null, rg = he, Nv = he, ag = he, Lv = null, ei = null, XO(), io.discardPendingWarnings(), d;
    }
    function _x(e, t) {
      do {
        var a = In;
        try {
          if (by(), XE(), Zn(), n1.current = null, a === null || a.return === null) {
            kr = Dv, Av = t, In = null;
            return;
          }
          if (Ie && a.mode & Ct && qy(a, !0), yt)
            if (ia(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              bl(a, o, _r);
            } else
              Us(a, t, _r);
          RD(e, a.return, a, t, _r), Mx(a);
        } catch (u) {
          t = u, In === a && a !== null ? (a = a.return, In = a) : a = In;
          continue;
        }
        return;
      } while (!0);
    }
    function kx() {
      var e = t1.current;
      return t1.current = Iy, e === null ? Iy : e;
    }
    function Ox(e) {
      t1.current = e;
    }
    function rA() {
      i1 = On();
    }
    function jv(e) {
      rg = _t(e, rg);
    }
    function aA() {
      kr === Vl && (kr = ng);
    }
    function v1() {
      (kr === Vl || kr === ng || kr === mc) && (kr = Mv), _a !== null && (Bs(rg) || Bs(Nv)) && ns(_a, _r);
    }
    function iA(e) {
      kr !== Mv && (kr = mc), Lv === null ? Lv = [e] : Lv.push(e);
    }
    function oA() {
      return kr === Vl;
    }
    function fg(e, t) {
      var a = jt;
      jt |= Gr;
      var o = kx();
      if (_a !== e || _r !== t) {
        if (Ta) {
          var u = e.memoizedUpdaters;
          u.size > 0 && ($v(e, _r), u.clear()), Op(e, t);
        }
        Bl = Ws(), gc(e, t);
      }
      Rn(t);
      do
        try {
          lA();
          break;
        } catch (d) {
          _x(e, d);
        }
      while (!0);
      if (by(), jt = a, Ox(o), In !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return rf(), _a = null, _r = he, kr;
    }
    function lA() {
      for (; In !== null; )
        Dx(In);
    }
    function uA(e, t) {
      var a = jt;
      jt |= Gr;
      var o = kx();
      if (_a !== e || _r !== t) {
        if (Ta) {
          var u = e.memoizedUpdaters;
          u.size > 0 && ($v(e, _r), u.clear()), Op(e, t);
        }
        Bl = Ws(), zv(), gc(e, t);
      }
      Rn(t);
      do
        try {
          sA();
          break;
        } catch (d) {
          _x(e, d);
        }
      while (!0);
      return by(), Ox(o), jt = a, In !== null ? (nf(), Vl) : (rf(), _a = null, _r = he, kr);
    }
    function sA() {
      for (; In !== null && !Kc(); )
        Dx(In);
    }
    function Dx(e) {
      var t = e.alternate;
      nn(e);
      var a;
      (e.mode & Ct) !== Ze ? (yb(e), a = h1(t, e, Yo), qy(e, !0)) : a = h1(t, e, Yo), Zn(), e.memoizedProps = e.pendingProps, a === null ? Mx(e) : In = a, n1.current = null;
    }
    function Mx(e) {
      var t = e;
      do {
        var a = t.alternate, o = t.return;
        if ((t.flags & ba) === st) {
          nn(t);
          var u = void 0;
          if ((t.mode & Ct) === Ze ? u = ex(a, t, Yo) : (yb(t), u = ex(a, t, Yo), qy(t, !1)), Zn(), u !== null) {
            In = u;
            return;
          }
        } else {
          var d = aM(a, t);
          if (d !== null) {
            d.flags &= rm, In = d;
            return;
          }
          if ((t.mode & Ct) !== Ze) {
            qy(t, !1);
            for (var h = t.actualDuration, b = t.child; b !== null; )
              h += b.actualDuration, b = b.sibling;
            t.actualDuration = h;
          }
          if (o !== null)
            o.flags |= ba, o.subtreeFlags = st, o.deletions = null;
          else {
            kr = r1, In = null;
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
      kr === Vl && (kr = gx);
    }
    function Sc(e, t, a) {
      var o = Wa(), u = Wr.transition;
      try {
        Wr.transition = null, zn(Bn), cA(e, t, a, o);
      } finally {
        Wr.transition = u, zn(o);
      }
      return null;
    }
    function cA(e, t, a, o) {
      do
        Il();
      while (es !== null);
      if (CA(), (jt & (Gr | zi)) !== Rr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, d = e.finishedLanes;
      if (ko(d), u === null)
        return Jc(), null;
      if (d === he && y("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = he, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Qn;
      var h = _t(u.lanes, u.childLanes);
      xf(e, h), e === _a && (_a = null, In = null, _r = he), ((u.subtreeFlags & Va) !== st || (u.flags & Va) !== st) && (yc || (yc = !0, u1 = a, g1(wi, function() {
        return Il(), null;
      })));
      var b = (u.subtreeFlags & (fu | ra | Nr | Va)) !== st, C = (u.flags & (fu | ra | Nr | Va)) !== st;
      if (b || C) {
        var x = Wr.transition;
        Wr.transition = null;
        var R = Wa();
        zn(Bn);
        var $ = jt;
        jt |= zi, n1.current = null, sM(e, u), ET(), TM(e, u, d), Ek(e.containerInfo), e.current = u, bp(d), xM(u, e, d), mu(), om(), jt = $, zn(R), Wr.transition = x;
      } else
        e.current = u, ET();
      var P = yc;
      if (yc ? (yc = !1, es = e, Uv = d) : (gd = 0, lg = null), h = e.pendingLanes, h === he && (yd = null), P || zx(e.current, !1), pu(u.stateNode, o), Ta && e.memoizedUpdaters.clear(), HM(), ti(e, On()), t !== null)
        for (var Z = e.onRecoverableError, ee = 0; ee < t.length; ee++) {
          var re = t[ee], Ue = re.stack, ft = re.digest;
          Z(re.value, {
            componentStack: Ue,
            digest: ft
          });
        }
      if (ig) {
        ig = !1;
        var nt = o1;
        throw o1 = null, nt;
      }
      return ua(Uv, ot) && e.tag !== Iu && Il(), h = e.pendingLanes, ua(h, ot) ? (hD(), e === s1 ? Fv++ : (Fv = 0, s1 = e)) : Fv = 0, Yu(), Jc(), null;
    }
    function Il() {
      if (es !== null) {
        var e = Cr(Uv), t = N0(Ri, e), a = Wr.transition, o = Wa();
        try {
          return Wr.transition = null, zn(t), dA();
        } finally {
          zn(o), Wr.transition = a;
        }
      }
      return !1;
    }
    function fA(e) {
      l1.push(e), yc || (yc = !0, g1(wi, function() {
        return Il(), null;
      }));
    }
    function dA() {
      if (es === null)
        return !1;
      var e = u1;
      u1 = null;
      var t = es, a = Uv;
      if (es = null, Uv = he, (jt & (Gr | zi)) !== Rr)
        throw new Error("Cannot flush passive effects while already rendering.");
      c1 = !0, og = !1, dm(a);
      var o = jt;
      jt |= zi, MM(t.current), _M(t, t.current, a, e);
      {
        var u = l1;
        l1 = [];
        for (var d = 0; d < u.length; d++) {
          var h = u[d];
          pM(t, h);
        }
      }
      Cp(), zx(t.current, !0), jt = o, Yu(), og ? t === lg ? gd++ : (gd = 0, lg = t) : gd = 0, c1 = !1, og = !1, Ia(t);
      {
        var b = t.current.stateNode;
        b.effectDuration = 0, b.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Ax(e) {
      return yd !== null && yd.has(e);
    }
    function pA(e) {
      yd === null ? yd = /* @__PURE__ */ new Set([e]) : yd.add(e);
    }
    function vA(e) {
      ig || (ig = !0, o1 = e);
    }
    var hA = vA;
    function Nx(e, t, a) {
      var o = vc(a, t), u = DT(e, o, ot), d = Gu(e, u, ot), h = ka();
      d !== null && (_l(d, ot, h), ti(d, h));
    }
    function Cn(e, t, a) {
      if (oM(a), Vv(!1), e.tag === O) {
        Nx(e, e, a);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === O) {
          Nx(o, e, a);
          return;
        } else if (o.tag === k) {
          var u = o.type, d = o.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && !Ax(d)) {
            var h = vc(a, e), b = zb(o, h, ot), C = Gu(o, b, ot), x = ka();
            C !== null && (_l(C, ot, x), ti(C, x));
            return;
          }
        }
        o = o.return;
      }
      y(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function mA(e, t, a) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var u = ka();
      Tf(e, a), wA(e), _a === e && Rl(_r, a) && (kr === Mv || kr === ng && ym(_r) && On() - i1 < Sx ? gc(e, he) : ag = _t(ag, a)), ti(e, u);
    }
    function Lx(e, t) {
      t === Qn && (t = KM(e));
      var a = ka(), o = Za(e, t);
      o !== null && (_l(o, t, a), ti(o, a));
    }
    function yA(e) {
      var t = e.memoizedState, a = Qn;
      t !== null && (a = t.retryLane), Lx(e, a);
    }
    function gA(e, t) {
      var a = Qn, o;
      switch (e.tag) {
        case V:
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
      o !== null && o.delete(t), Lx(e, a);
    }
    function SA(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : WM(e / 1960) * 1960;
    }
    function bA() {
      if (Fv > QM)
        throw Fv = 0, s1 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      gd > qM && (gd = 0, lg = null, y("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function CA() {
      io.flushLegacyContextWarning(), io.flushPendingUnsafeLifecycleWarnings();
    }
    function zx(e, t) {
      nn(e), dg(e, na, $M), t && dg(e, yl, VM), dg(e, na, PM), t && dg(e, yl, jM), Zn();
    }
    function dg(e, t, a) {
      for (var o = e, u = null; o !== null; ) {
        var d = o.subtreeFlags & t;
        o !== u && o.child !== null && d !== st ? o = o.child : ((o.flags & t) !== st && a(o), o.sibling !== null ? o = o.sibling : o = u = o.return);
      }
    }
    var pg = null;
    function Ux(e) {
      {
        if ((jt & Gr) !== Rr || !(e.mode & tt))
          return;
        var t = e.tag;
        if (t !== A && t !== O && t !== k && t !== w && t !== X && t !== be && t !== fe)
          return;
        var a = Rt(e) || "ReactComponent";
        if (pg !== null) {
          if (pg.has(a))
            return;
          pg.add(a);
        } else
          pg = /* @__PURE__ */ new Set([a]);
        var o = Yn;
        try {
          nn(e), y("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? nn(e) : Zn();
        }
      }
    }
    var h1;
    {
      var EA = null;
      h1 = function(e, t, a) {
        var o = Ix(EA, t);
        try {
          return qT(e, t, a);
        } catch (d) {
          if (LO() || d !== null && typeof d == "object" && typeof d.then == "function")
            throw d;
          if (by(), XE(), tx(e, t), Ix(t, o), t.mode & Ct && yb(t), ml(null, qT, null, e, t, a), k0()) {
            var u = fp();
            typeof u == "object" && u !== null && u._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var Fx = !1, m1;
    m1 = /* @__PURE__ */ new Set();
    function TA(e) {
      if (za && !dD())
        switch (e.tag) {
          case w:
          case X:
          case fe: {
            var t = In && Rt(In) || "Unknown", a = t;
            if (!m1.has(a)) {
              m1.add(a);
              var o = Rt(e) || "Unknown";
              y("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case k: {
            Fx || (y("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), Fx = !0);
            break;
          }
        }
    }
    function $v(e, t) {
      if (Ta) {
        var a = e.memoizedUpdaters;
        a.forEach(function(o) {
          wf(e, o, t);
        });
      }
    }
    var y1 = {};
    function g1(e, t) {
      {
        var a = vo.current;
        return a !== null ? (a.push(t), y1) : qc(e, t);
      }
    }
    function Px(e) {
      if (e !== y1)
        return im(e);
    }
    function jx() {
      return vo.current !== null;
    }
    function xA(e) {
      {
        if (e.mode & tt) {
          if (!mx())
            return;
        } else if (!YM() || jt !== Rr || e.tag !== w && e.tag !== X && e.tag !== fe)
          return;
        if (vo.current === null) {
          var t = Yn;
          try {
            nn(e), y(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Rt(e));
          } finally {
            t ? nn(e) : Zn();
          }
        }
      }
    }
    function wA(e) {
      e.tag !== Iu && mx() && vo.current === null && y(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Vv(e) {
      Ex = e;
    }
    var Ui = null, Sd = null, RA = function(e) {
      Ui = e;
    };
    function bd(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        return t === void 0 ? e : t.current;
      }
    }
    function S1(e) {
      return bd(e);
    }
    function b1(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = bd(e.render);
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
    function $x(e, t) {
      {
        if (Ui === null)
          return !1;
        var a = e.elementType, o = t.type, u = !1, d = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case k: {
            typeof o == "function" && (u = !0);
            break;
          }
          case w: {
            (typeof o == "function" || d === mt) && (u = !0);
            break;
          }
          case X: {
            (d === De || d === mt) && (u = !0);
            break;
          }
          case be:
          case fe: {
            (d === Vt || d === mt) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var h = Ui(a);
          if (h !== void 0 && h === Ui(o))
            return !0;
        }
        return !1;
      }
    }
    function Vx(e) {
      {
        if (Ui === null || typeof WeakSet != "function")
          return;
        Sd === null && (Sd = /* @__PURE__ */ new WeakSet()), Sd.add(e);
      }
    }
    var _A = function(e, t) {
      {
        if (Ui === null)
          return;
        var a = t.staleFamilies, o = t.updatedFamilies;
        Il(), Hl(function() {
          C1(e.current, o, a);
        });
      }
    }, kA = function(e, t) {
      {
        if (e.context !== vi)
          return;
        Il(), Hl(function() {
          Bv(t, e, null, null);
        });
      }
    };
    function C1(e, t, a) {
      {
        var o = e.alternate, u = e.child, d = e.sibling, h = e.tag, b = e.type, C = null;
        switch (h) {
          case w:
          case fe:
          case k:
            C = b;
            break;
          case X:
            C = b.render;
            break;
        }
        if (Ui === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var x = !1, R = !1;
        if (C !== null) {
          var $ = Ui(C);
          $ !== void 0 && (a.has($) ? R = !0 : t.has($) && (h === k ? R = !0 : x = !0));
        }
        if (Sd !== null && (Sd.has(e) || o !== null && Sd.has(o)) && (R = !0), R && (e._debugNeedsRemount = !0), R || x) {
          var P = Za(e, ot);
          P !== null && Or(P, e, ot, hn);
        }
        u !== null && !R && C1(u, t, a), d !== null && C1(d, t, a);
      }
    }
    var OA = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), o = new Set(t.map(function(u) {
          return u.current;
        }));
        return E1(e.current, o, a), a;
      }
    };
    function E1(e, t, a) {
      {
        var o = e.child, u = e.sibling, d = e.tag, h = e.type, b = null;
        switch (d) {
          case w:
          case fe:
          case k:
            b = h;
            break;
          case X:
            b = h.render;
            break;
        }
        var C = !1;
        b !== null && t.has(b) && (C = !0), C ? DA(e, a) : o !== null && E1(o, t, a), u !== null && E1(u, t, a);
      }
    }
    function DA(e, t) {
      {
        var a = MA(e, t);
        if (a)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case H:
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
    function MA(e, t) {
      for (var a = e, o = !1; ; ) {
        if (a.tag === H)
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
    var T1;
    {
      T1 = !1;
      try {
        var Bx = Object.preventExtensions({});
      } catch {
        T1 = !0;
      }
    }
    function AA(e, t, a, o) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = st, this.subtreeFlags = st, this.deletions = null, this.lanes = he, this.childLanes = he, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !T1 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var hi = function(e, t, a, o) {
      return new AA(e, t, a, o);
    };
    function x1(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function NA(e) {
      return typeof e == "function" && !x1(e) && e.defaultProps === void 0;
    }
    function LA(e) {
      if (typeof e == "function")
        return x1(e) ? k : w;
      if (e != null) {
        var t = e.$$typeof;
        if (t === De)
          return X;
        if (t === Vt)
          return be;
      }
      return A;
    }
    function bc(e, t) {
      var a = e.alternate;
      a === null ? (a = hi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = st, a.subtreeFlags = st, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Sr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (a.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case A:
        case w:
        case fe:
          a.type = bd(e.type);
          break;
        case k:
          a.type = S1(e.type);
          break;
        case X:
          a.type = b1(e.type);
          break;
      }
      return a;
    }
    function zA(e, t) {
      e.flags &= Sr | gn;
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
    function UA(e, t, a) {
      var o;
      return e === cy ? (o = tt, t === !0 && (o |= Nt, o |= xa)) : o = Ze, Ta && (o |= Ct), hi(O, null, null, o);
    }
    function w1(e, t, a, o, u, d) {
      var h = A, b = e;
      if (typeof e == "function")
        x1(e) ? (h = k, b = S1(b)) : b = bd(b);
      else if (typeof e == "string")
        h = H;
      else
        e: switch (e) {
          case oi:
            return rs(a.children, u, d, t);
          case yo:
            h = F, u |= Nt, (u & tt) !== Ze && (u |= xa);
            break;
          case ol:
            return FA(a, u, d, t);
          case it:
            return PA(a, u, d, t);
          case Pt:
            return jA(a, u, d, t);
          case yn:
            return Hx(a, u, d, t);
          case kn:
          case Mt:
          case Zr:
          case go:
          case sr:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case L:
                  h = oe;
                  break e;
                case Se:
                  h = ce;
                  break e;
                case De:
                  h = X, b = b1(b);
                  break e;
                case Vt:
                  h = be;
                  break e;
                case mt:
                  h = et, b = null;
                  break e;
              }
            var C = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var x = o ? Rt(o) : null;
              x && (C += `

Check the render method of \`` + x + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + C));
          }
        }
      var R = hi(h, a, t, u);
      return R.elementType = e, R.type = b, R.lanes = d, R._debugOwner = o, R;
    }
    function R1(e, t, a) {
      var o = null;
      o = e._owner;
      var u = e.type, d = e.key, h = e.props, b = w1(u, d, h, o, t, a);
      return b._debugSource = e._source, b._debugOwner = e._owner, b;
    }
    function rs(e, t, a, o) {
      var u = hi(B, e, o, t);
      return u.lanes = a, u;
    }
    function FA(e, t, a, o) {
      typeof e.id != "string" && y('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = hi(le, e, o, t | Ct);
      return u.elementType = ol, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function PA(e, t, a, o) {
      var u = hi(V, e, o, t);
      return u.elementType = it, u.lanes = a, u;
    }
    function jA(e, t, a, o) {
      var u = hi(ke, e, o, t);
      return u.elementType = Pt, u.lanes = a, u;
    }
    function Hx(e, t, a, o) {
      var u = hi(pe, e, o, t);
      u.elementType = yn, u.lanes = a;
      var d = {
        isHidden: !1
      };
      return u.stateNode = d, u;
    }
    function _1(e, t, a) {
      var o = hi(I, e, null, t);
      return o.lanes = a, o;
    }
    function $A() {
      var e = hi(H, null, null, Ze);
      return e.elementType = "DELETED", e;
    }
    function VA(e) {
      var t = hi(se, null, null, Ze);
      return t.stateNode = e, t;
    }
    function k1(e, t, a) {
      var o = e.children !== null ? e.children : [], u = hi(z, o, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function Ix(e, t) {
      return e === null && (e = hi(A, null, null, Ze)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function BA(e, t, a, o, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = sS, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Qn, this.eventTimes = Ys(he), this.expirationTimes = Ys(hn), this.pendingLanes = he, this.suspendedLanes = he, this.pingedLanes = he, this.expiredLanes = he, this.mutableReadLanes = he, this.finishedLanes = he, this.entangledLanes = he, this.entanglements = Ys(he), this.identifierPrefix = o, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], h = 0; h < js; h++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case cy:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Iu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function Yx(e, t, a, o, u, d, h, b, C, x) {
      var R = new BA(e, t, a, b, C), $ = UA(t, d);
      R.current = $, $.stateNode = R;
      {
        var P = {
          element: o,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        $.memoizedState = P;
      }
      return VS($), R;
    }
    var O1 = "18.3.1";
    function HA(e, t, a) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return G(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: ya,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var D1, M1;
    D1 = !1, M1 = {};
    function Wx(e) {
      if (!e)
        return vi;
      var t = Pa(e), a = wO(t);
      if (t.tag === k) {
        var o = t.type;
        if (Po(o))
          return SE(t, o, a);
      }
      return a;
    }
    function IA(e, t) {
      {
        var a = Pa(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var u = Ba(a);
        if (u === null)
          return null;
        if (u.mode & Nt) {
          var d = Rt(a) || "Component";
          if (!M1[d]) {
            M1[d] = !0;
            var h = Yn;
            try {
              nn(u), a.mode & Nt ? y("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : y("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              h ? nn(h) : Zn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function Gx(e, t, a, o, u, d, h, b) {
      var C = !1, x = null;
      return Yx(e, t, C, x, a, o, u, d, h);
    }
    function Qx(e, t, a, o, u, d, h, b, C, x) {
      var R = !0, $ = Yx(a, o, R, e, u, d, h, b, C);
      $.context = Wx(null);
      var P = $.current, Z = ka(), ee = ts(P), re = jl(Z, ee);
      return re.callback = t ?? null, Gu(P, re, ee), XM($, ee, Z), $;
    }
    function Bv(e, t, a, o) {
      Sp(t, e);
      var u = t.current, d = ka(), h = ts(u);
      Ep(h);
      var b = Wx(a);
      t.context === null ? t.context = b : t.pendingContext = b, za && Yn !== null && !D1 && (D1 = !0, y(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Rt(Yn) || "Unknown"));
      var C = jl(d, h);
      C.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && y("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), C.callback = o);
      var x = Gu(u, C, h);
      return x !== null && (Or(x, u, h, d), wy(x, u, h)), h;
    }
    function vg(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case H:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function YA(e) {
      switch (e.tag) {
        case O: {
          var t = e.stateNode;
          if (Rf(t)) {
            var a = wp(t);
            tA(t, a);
          }
          break;
        }
        case V: {
          Hl(function() {
            var u = Za(e, ot);
            if (u !== null) {
              var d = ka();
              Or(u, e, ot, d);
            }
          });
          var o = ot;
          A1(e, o);
          break;
        }
      }
    }
    function qx(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Em(a.retryLane, t));
    }
    function A1(e, t) {
      qx(e, t);
      var a = e.alternate;
      a && qx(a, t);
    }
    function WA(e) {
      if (e.tag === V) {
        var t = Vs, a = Za(e, t);
        if (a !== null) {
          var o = ka();
          Or(a, e, t, o);
        }
        A1(e, t);
      }
    }
    function GA(e) {
      if (e.tag === V) {
        var t = ts(e), a = Za(e, t);
        if (a !== null) {
          var o = ka();
          Or(a, e, t, o);
        }
        A1(e, t);
      }
    }
    function Kx(e) {
      var t = am(e);
      return t === null ? null : t.stateNode;
    }
    var Xx = function(e) {
      return null;
    };
    function QA(e) {
      return Xx(e);
    }
    var Zx = function(e) {
      return !1;
    };
    function qA(e) {
      return Zx(e);
    }
    var Jx = null, ew = null, tw = null, nw = null, rw = null, aw = null, iw = null, ow = null, lw = null;
    {
      var uw = function(e, t, a) {
        var o = t[a], u = cr(e) ? e.slice() : At({}, e);
        return a + 1 === t.length ? (cr(u) ? u.splice(o, 1) : delete u[o], u) : (u[o] = uw(e[o], t, a + 1), u);
      }, sw = function(e, t) {
        return uw(e, t, 0);
      }, cw = function(e, t, a, o) {
        var u = t[o], d = cr(e) ? e.slice() : At({}, e);
        if (o + 1 === t.length) {
          var h = a[o];
          d[h] = d[u], cr(d) ? d.splice(u, 1) : delete d[u];
        } else
          d[u] = cw(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            o + 1
          );
        return d;
      }, fw = function(e, t, a) {
        if (t.length !== a.length) {
          S("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < a.length - 1; o++)
            if (t[o] !== a[o]) {
              S("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return cw(e, t, a, 0);
      }, dw = function(e, t, a, o) {
        if (a >= t.length)
          return o;
        var u = t[a], d = cr(e) ? e.slice() : At({}, e);
        return d[u] = dw(e[u], t, a + 1, o), d;
      }, pw = function(e, t, a) {
        return dw(e, t, 0, a);
      }, N1 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      Jx = function(e, t, a, o) {
        var u = N1(e, t);
        if (u !== null) {
          var d = pw(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = At({}, e.memoizedProps);
          var h = Za(e, ot);
          h !== null && Or(h, e, ot, hn);
        }
      }, ew = function(e, t, a) {
        var o = N1(e, t);
        if (o !== null) {
          var u = sw(o.memoizedState, a);
          o.memoizedState = u, o.baseState = u, e.memoizedProps = At({}, e.memoizedProps);
          var d = Za(e, ot);
          d !== null && Or(d, e, ot, hn);
        }
      }, tw = function(e, t, a, o) {
        var u = N1(e, t);
        if (u !== null) {
          var d = fw(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = At({}, e.memoizedProps);
          var h = Za(e, ot);
          h !== null && Or(h, e, ot, hn);
        }
      }, nw = function(e, t, a) {
        e.pendingProps = pw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Za(e, ot);
        o !== null && Or(o, e, ot, hn);
      }, rw = function(e, t) {
        e.pendingProps = sw(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Za(e, ot);
        a !== null && Or(a, e, ot, hn);
      }, aw = function(e, t, a) {
        e.pendingProps = fw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Za(e, ot);
        o !== null && Or(o, e, ot, hn);
      }, iw = function(e) {
        var t = Za(e, ot);
        t !== null && Or(t, e, ot, hn);
      }, ow = function(e) {
        Xx = e;
      }, lw = function(e) {
        Zx = e;
      };
    }
    function KA(e) {
      var t = Ba(e);
      return t === null ? null : t.stateNode;
    }
    function XA(e) {
      return null;
    }
    function ZA() {
      return Yn;
    }
    function JA(e) {
      var t = e.findFiberByHostInstance, a = c.ReactCurrentDispatcher;
      return gp({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: Jx,
        overrideHookStateDeletePath: ew,
        overrideHookStateRenamePath: tw,
        overrideProps: nw,
        overridePropsDeletePath: rw,
        overridePropsRenamePath: aw,
        setErrorHandler: ow,
        setSuspenseHandler: lw,
        scheduleUpdate: iw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: KA,
        findFiberByHostInstance: t || XA,
        // React Refresh
        findHostInstancesForRefresh: OA,
        scheduleRefresh: _A,
        scheduleRoot: kA,
        setRefreshHandler: RA,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: ZA,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: O1
      });
    }
    var vw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function L1(e) {
      this._internalRoot = e;
    }
    hg.prototype.render = L1.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? y("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : mg(arguments[1]) ? y("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && y("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Wn) {
          var o = Kx(t.current);
          o && o.parentNode !== a && y("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Bv(e, t, null, null);
    }, hg.prototype.unmount = L1.prototype.unmount = function() {
      typeof arguments[0] == "function" && y("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Rx() && y("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Hl(function() {
          Bv(null, e, null, null);
        }), vE(t);
      }
    };
    function eN(e, t) {
      if (!mg(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      hw(e);
      var a = !1, o = !1, u = "", d = vw;
      t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Vi && y(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var h = Gx(e, cy, null, a, o, u, d);
      ry(h.current, e);
      var b = e.nodeType === Wn ? e.parentNode : e;
      return Qp(b), new L1(h);
    }
    function hg(e) {
      this._internalRoot = e;
    }
    function tN(e) {
      e && U0(e);
    }
    hg.prototype.unstable_scheduleHydration = tN;
    function nN(e, t, a) {
      if (!mg(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      hw(e), t === void 0 && y("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = a ?? null, u = a != null && a.hydratedSources || null, d = !1, h = !1, b = "", C = vw;
      a != null && (a.unstable_strictMode === !0 && (d = !0), a.identifierPrefix !== void 0 && (b = a.identifierPrefix), a.onRecoverableError !== void 0 && (C = a.onRecoverableError));
      var x = Qx(t, null, e, cy, o, d, h, b, C);
      if (ry(x.current, e), Qp(e), u)
        for (var R = 0; R < u.length; R++) {
          var $ = u[R];
          oD(x, $);
        }
      return new hg(x);
    }
    function mg(e) {
      return !!(e && (e.nodeType === Jr || e.nodeType === ci || e.nodeType === cl || !Ne));
    }
    function Hv(e) {
      return !!(e && (e.nodeType === Jr || e.nodeType === ci || e.nodeType === cl || e.nodeType === Wn && e.nodeValue === " react-mount-point-unstable "));
    }
    function hw(e) {
      e.nodeType === Jr && e.tagName && e.tagName.toUpperCase() === "BODY" && y("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), iv(e) && (e._reactRootContainer ? y("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : y("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var rN = c.ReactCurrentOwner, mw;
    mw = function(e) {
      if (e._reactRootContainer && e.nodeType !== Wn) {
        var t = Kx(e._reactRootContainer.current);
        t && t.parentNode !== e && y("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, o = z1(e), u = !!(o && Bu(o));
      u && !a && y("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Jr && e.tagName && e.tagName.toUpperCase() === "BODY" && y("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function z1(e) {
      return e ? e.nodeType === ci ? e.documentElement : e.firstChild : null;
    }
    function yw() {
    }
    function aN(e, t, a, o, u) {
      if (u) {
        if (typeof o == "function") {
          var d = o;
          o = function() {
            var P = vg(h);
            d.call(P);
          };
        }
        var h = Qx(
          t,
          o,
          e,
          Iu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          yw
        );
        e._reactRootContainer = h, ry(h.current, e);
        var b = e.nodeType === Wn ? e.parentNode : e;
        return Qp(b), Hl(), h;
      } else {
        for (var C; C = e.lastChild; )
          e.removeChild(C);
        if (typeof o == "function") {
          var x = o;
          o = function() {
            var P = vg(R);
            x.call(P);
          };
        }
        var R = Gx(
          e,
          Iu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          yw
        );
        e._reactRootContainer = R, ry(R.current, e);
        var $ = e.nodeType === Wn ? e.parentNode : e;
        return Qp($), Hl(function() {
          Bv(t, R, a, o);
        }), R;
      }
    }
    function iN(e, t) {
      e !== null && typeof e != "function" && y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function yg(e, t, a, o, u) {
      mw(a), iN(u === void 0 ? null : u, "render");
      var d = a._reactRootContainer, h;
      if (!d)
        h = aN(a, t, e, u, o);
      else {
        if (h = d, typeof u == "function") {
          var b = u;
          u = function() {
            var C = vg(h);
            b.call(C);
          };
        }
        Bv(t, h, e, u);
      }
      return vg(h);
    }
    var gw = !1;
    function oN(e) {
      {
        gw || (gw = !0, y("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = rN.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || y("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Jt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Jr ? e : IA(e, "findDOMNode");
    }
    function lN(e, t, a) {
      if (y("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Hv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = iv(t) && t._reactRootContainer === void 0;
        o && y("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return yg(null, e, t, !0, a);
    }
    function uN(e, t, a) {
      if (y("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Hv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = iv(t) && t._reactRootContainer === void 0;
        o && y("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return yg(null, e, t, !1, a);
    }
    function sN(e, t, a, o) {
      if (y("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Hv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !As(e))
        throw new Error("parentComponent must be a valid React Component");
      return yg(e, t, a, !1, o);
    }
    var Sw = !1;
    function cN(e) {
      if (Sw || (Sw = !0, y("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Hv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = iv(e) && e._reactRootContainer === void 0;
        t && y("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = z1(e), o = a && !Bu(a);
          o && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Hl(function() {
          yg(null, null, e, !1, function() {
            e._reactRootContainer = null, vE(e);
          });
        }), !0;
      } else {
        {
          var u = z1(e), d = !!(u && Bu(u)), h = e.nodeType === Jr && Hv(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", h ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    ku(YA), L0(WA), kf(GA), wm(Wa), Rm(Ur), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && y("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), tm(dk), Ic(d1, nA, Hl);
    function fN(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!mg(t))
        throw new Error("Target container is not a DOM element.");
      return HA(e, t, null, a);
    }
    function dN(e, t, a, o) {
      return sN(e, t, a, o);
    }
    var U1 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Bu, Xf, ay, Hc, Os, d1]
    };
    function pN(e, t) {
      return U1.usingClientEntryPoint || y('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), eN(e, t);
    }
    function vN(e, t, a) {
      return U1.usingClientEntryPoint || y('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), nN(e, t, a);
    }
    function hN(e) {
      return Rx() && y("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Hl(e);
    }
    var mN = JA({
      findFiberByHostInstance: ic,
      bundleType: 1,
      version: O1,
      rendererPackageName: "react-dom"
    });
    if (!mN && Ft && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var bw = window.location.protocol;
      /^(https?|file):$/.test(bw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (bw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = U1, ri.createPortal = fN, ri.createRoot = pN, ri.findDOMNode = oN, ri.flushSync = hN, ri.hydrate = lN, ri.hydrateRoot = vN, ri.render = uN, ri.unmountComponentAtNode = cN, ri.unstable_batchedUpdates = d1, ri.unstable_renderSubtreeIntoContainer = dN, ri.version = O1, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ri;
}
function wR() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wR);
    } catch (i) {
      console.error(i);
    }
  }
}
process.env.NODE_ENV === "production" ? (wR(), rC.exports = ON()) : rC.exports = DN();
var MN = rC.exports, aC, Sg = MN;
if (process.env.NODE_ENV === "production")
  aC = Sg.createRoot, Sg.hydrateRoot;
else {
  var Rw = Sg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  aC = function(i, s) {
    Rw.usingClientEntryPoint = !0;
    try {
      return Sg.createRoot(i, s);
    } finally {
      Rw.usingClientEntryPoint = !1;
    }
  };
}
var AN = Object.defineProperty, NN = (i, s, c) => s in i ? AN(i, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : i[s] = c, bg = (i, s, c) => (NN(i, typeof s != "symbol" ? s + "" : s, c), c);
const LN = {
  stringify: (i) => i,
  parse: (i) => i
}, zN = {
  stringify: (i) => `${i}`,
  parse: (i) => parseFloat(i)
}, UN = {
  stringify: (i) => i ? "true" : "false",
  parse: (i) => /^[ty1-9]/i.test(i)
}, FN = {
  stringify: (i) => i.name,
  parse: (i, s, c) => {
    const v = (() => {
      if (typeof window < "u" && i in window)
        return window[i];
      if (typeof global < "u" && i in global)
        return global[i];
    })();
    return typeof v == "function" ? v.bind(c) : void 0;
  }
}, PN = {
  stringify: (i) => JSON.stringify(i),
  parse: (i) => JSON.parse(i)
}, j1 = {
  string: LN,
  number: zN,
  boolean: UN,
  function: FN,
  json: PN
};
function jN(i) {
  return i.replace(
    /([a-z0-9])([A-Z])/g,
    (s, c, v) => `${c}-${v.toLowerCase()}`
  );
}
const Cg = Symbol.for("r2wc.render"), Eg = Symbol.for("r2wc.connected"), Cc = Symbol.for("r2wc.context"), as = Symbol.for("r2wc.props");
function $N(i, s, c) {
  var v, m, S;
  s.props || (s.props = i.propTypes ? Object.keys(i.propTypes) : []);
  const y = Array.isArray(s.props) ? s.props.slice() : Object.keys(s.props), T = {}, w = {}, k = {};
  for (const O of y) {
    T[O] = Array.isArray(s.props) ? "string" : s.props[O];
    const z = jN(O);
    w[O] = z, k[z] = O;
  }
  class A extends HTMLElement {
    constructor() {
      super(), bg(this, v, !0), bg(this, m), bg(this, S, {}), bg(this, "container"), s.shadow ? this.container = this.attachShadow({
        mode: s.shadow
      }) : this.container = this, this[as].container = this.container;
      for (const z of y) {
        const H = w[z], I = this.getAttribute(H), B = T[z], F = B ? j1[B] : null;
        F != null && F.parse && I && (this[as][z] = F.parse(I, H, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(k);
    }
    connectedCallback() {
      this[Eg] = !0, this[Cg]();
    }
    disconnectedCallback() {
      this[Eg] = !1, this[Cc] && c.unmount(this[Cc]), delete this[Cc];
    }
    attributeChangedCallback(z, H, I) {
      const B = k[z], F = T[B], ce = F ? j1[F] : null;
      B in T && ce != null && ce.parse && I && (this[as][B] = ce.parse(I, z, this), this[Cg]());
    }
    [(v = Eg, m = Cc, S = as, Cg)]() {
      this[Eg] && (this[Cc] ? c.update(this[Cc], this[as]) : this[Cc] = c.mount(
        this.container,
        i,
        this[as]
      ));
    }
  }
  for (const O of y) {
    const z = w[O], H = T[O];
    Object.defineProperty(A.prototype, O, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[as][O];
      },
      set(I) {
        this[as][O] = I;
        const B = H ? j1[H] : null;
        if (B != null && B.stringify) {
          const F = B.stringify(I, z, this);
          this.getAttribute(z) !== F && this.setAttribute(z, F);
        } else
          this[Cg]();
      }
    });
  }
  return A;
}
function VN(i, s, c) {
  const v = aC(i), m = xn.createElement(s, c);
  return v.render(m), {
    root: v,
    ReactComponent: s
  };
}
function BN({ root: i, ReactComponent: s }, c) {
  const v = xn.createElement(s, c);
  i.render(v);
}
function HN({ root: i }) {
  i.unmount();
}
function uh(i, s = {}) {
  return $N(i, s, { mount: VN, update: BN, unmount: HN });
}
var iC = { exports: {} }, Wv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _w;
function IN() {
  if (_w) return Wv;
  _w = 1;
  var i = xn, s = Symbol.for("react.element"), c = Symbol.for("react.fragment"), v = Object.prototype.hasOwnProperty, m = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, S = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(T, w, k) {
    var A, O = {}, z = null, H = null;
    k !== void 0 && (z = "" + k), w.key !== void 0 && (z = "" + w.key), w.ref !== void 0 && (H = w.ref);
    for (A in w) v.call(w, A) && !S.hasOwnProperty(A) && (O[A] = w[A]);
    if (T && T.defaultProps) for (A in w = T.defaultProps, w) O[A] === void 0 && (O[A] = w[A]);
    return { $$typeof: s, type: T, key: z, ref: H, props: O, _owner: m.current };
  }
  return Wv.Fragment = c, Wv.jsx = y, Wv.jsxs = y, Wv;
}
var Gv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var kw;
function YN() {
  return kw || (kw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = xn, s = Symbol.for("react.element"), c = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), m = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), T = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), I = Symbol.iterator, B = "@@iterator";
    function F(L) {
      if (L === null || typeof L != "object")
        return null;
      var Se = I && L[I] || L[B];
      return typeof Se == "function" ? Se : null;
    }
    var ce = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function oe(L) {
      {
        for (var Se = arguments.length, De = new Array(Se > 1 ? Se - 1 : 0), it = 1; it < Se; it++)
          De[it - 1] = arguments[it];
        X("error", L, De);
      }
    }
    function X(L, Se, De) {
      {
        var it = ce.ReactDebugCurrentFrame, Pt = it.getStackAddendum();
        Pt !== "" && (Se += "%s", De = De.concat([Pt]));
        var Vt = De.map(function(mt) {
          return String(mt);
        });
        Vt.unshift("Warning: " + Se), Function.prototype.apply.call(console[L], console, Vt);
      }
    }
    var le = !1, V = !1, be = !1, fe = !1, et = !1, _;
    _ = Symbol.for("react.module.reference");
    function se(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === v || L === S || et || L === m || L === k || L === A || fe || L === H || le || V || be || typeof L == "object" && L !== null && (L.$$typeof === z || L.$$typeof === O || L.$$typeof === y || L.$$typeof === T || L.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === _ || L.getModuleId !== void 0));
    }
    function ke(L, Se, De) {
      var it = L.displayName;
      if (it)
        return it;
      var Pt = Se.displayName || Se.name || "";
      return Pt !== "" ? De + "(" + Pt + ")" : De;
    }
    function ve(L) {
      return L.displayName || "Context";
    }
    function pe(L) {
      if (L == null)
        return null;
      if (typeof L.tag == "number" && oe("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof L == "function")
        return L.displayName || L.name || null;
      if (typeof L == "string")
        return L;
      switch (L) {
        case v:
          return "Fragment";
        case c:
          return "Portal";
        case S:
          return "Profiler";
        case m:
          return "StrictMode";
        case k:
          return "Suspense";
        case A:
          return "SuspenseList";
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case T:
            var Se = L;
            return ve(Se) + ".Consumer";
          case y:
            var De = L;
            return ve(De._context) + ".Provider";
          case w:
            return ke(L, L.render, "ForwardRef");
          case O:
            var it = L.displayName || null;
            return it !== null ? it : pe(L.type) || "Memo";
          case z: {
            var Pt = L, Vt = Pt._payload, mt = Pt._init;
            try {
              return pe(mt(Vt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Re = Object.assign, lt = 0, Qe, Et, ge, ze, Y, de, Ne;
    function Xe() {
    }
    Xe.__reactDisabledLog = !0;
    function Pe() {
      {
        if (lt === 0) {
          Qe = console.log, Et = console.info, ge = console.warn, ze = console.error, Y = console.group, de = console.groupCollapsed, Ne = console.groupEnd;
          var L = {
            configurable: !0,
            enumerable: !0,
            value: Xe,
            writable: !0
          };
          Object.defineProperties(console, {
            info: L,
            log: L,
            warn: L,
            error: L,
            group: L,
            groupCollapsed: L,
            groupEnd: L
          });
        }
        lt++;
      }
    }
    function yt() {
      {
        if (lt--, lt === 0) {
          var L = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Re({}, L, {
              value: Qe
            }),
            info: Re({}, L, {
              value: Et
            }),
            warn: Re({}, L, {
              value: ge
            }),
            error: Re({}, L, {
              value: ze
            }),
            group: Re({}, L, {
              value: Y
            }),
            groupCollapsed: Re({}, L, {
              value: de
            }),
            groupEnd: Re({}, L, {
              value: Ne
            })
          });
        }
        lt < 0 && oe("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = ce.ReactCurrentDispatcher, ut;
    function rt(L, Se, De) {
      {
        if (ut === void 0)
          try {
            throw Error();
          } catch (Pt) {
            var it = Pt.stack.trim().match(/\n( *(at )?)/);
            ut = it && it[1] || "";
          }
        return `
` + ut + L;
      }
    }
    var pt = !1, gt;
    {
      var Ut = typeof WeakMap == "function" ? WeakMap : Map;
      gt = new Ut();
    }
    function we(L, Se) {
      if (!L || pt)
        return "";
      {
        var De = gt.get(L);
        if (De !== void 0)
          return De;
      }
      var it;
      pt = !0;
      var Pt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Vt;
      Vt = Ie.current, Ie.current = null, Pe();
      try {
        if (Se) {
          var mt = function() {
            throw Error();
          };
          if (Object.defineProperty(mt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(mt, []);
            } catch (Mr) {
              it = Mr;
            }
            Reflect.construct(L, [], mt);
          } else {
            try {
              mt.call();
            } catch (Mr) {
              it = Mr;
            }
            L.call(mt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Mr) {
            it = Mr;
          }
          L();
        }
      } catch (Mr) {
        if (Mr && it && typeof Mr.stack == "string") {
          for (var Mt = Mr.stack.split(`
`), sr = it.stack.split(`
`), yn = Mt.length - 1, kn = sr.length - 1; yn >= 1 && kn >= 0 && Mt[yn] !== sr[kn]; )
            kn--;
          for (; yn >= 1 && kn >= 0; yn--, kn--)
            if (Mt[yn] !== sr[kn]) {
              if (yn !== 1 || kn !== 1)
                do
                  if (yn--, kn--, kn < 0 || Mt[yn] !== sr[kn]) {
                    var Zr = `
` + Mt[yn].replace(" at new ", " at ");
                    return L.displayName && Zr.includes("<anonymous>") && (Zr = Zr.replace("<anonymous>", L.displayName)), typeof L == "function" && gt.set(L, Zr), Zr;
                  }
                while (yn >= 1 && kn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, Ie.current = Vt, yt(), Error.prepareStackTrace = Pt;
      }
      var go = L ? L.displayName || L.name : "", Qt = go ? rt(go) : "";
      return typeof L == "function" && gt.set(L, Qt), Qt;
    }
    function Ft(L, Se, De) {
      return we(L, !1);
    }
    function Le(L) {
      var Se = L.prototype;
      return !!(Se && Se.isReactComponent);
    }
    function Xt(L, Se, De) {
      if (L == null)
        return "";
      if (typeof L == "function")
        return we(L, Le(L));
      if (typeof L == "string")
        return rt(L);
      switch (L) {
        case k:
          return rt("Suspense");
        case A:
          return rt("SuspenseList");
      }
      if (typeof L == "object")
        switch (L.$$typeof) {
          case w:
            return Ft(L.render);
          case O:
            return Xt(L.type, Se, De);
          case z: {
            var it = L, Pt = it._payload, Vt = it._init;
            try {
              return Xt(Vt(Pt), Se, De);
            } catch {
            }
          }
        }
      return "";
    }
    var mn = Object.prototype.hasOwnProperty, Nn = {}, N = ce.ReactDebugCurrentFrame;
    function G(L) {
      if (L) {
        var Se = L._owner, De = Xt(L.type, L._source, Se ? Se.type : null);
        N.setExtraStackFrame(De);
      } else
        N.setExtraStackFrame(null);
    }
    function ne(L, Se, De, it, Pt) {
      {
        var Vt = Function.call.bind(mn);
        for (var mt in L)
          if (Vt(L, mt)) {
            var Mt = void 0;
            try {
              if (typeof L[mt] != "function") {
                var sr = Error((it || "React class") + ": " + De + " type `" + mt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof L[mt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw sr.name = "Invariant Violation", sr;
              }
              Mt = L[mt](Se, mt, it, De, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (yn) {
              Mt = yn;
            }
            Mt && !(Mt instanceof Error) && (G(Pt), oe("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", it || "React class", De, mt, typeof Mt), G(null)), Mt instanceof Error && !(Mt.message in Nn) && (Nn[Mt.message] = !0, G(Pt), oe("Failed %s type: %s", De, Mt.message), G(null));
          }
      }
    }
    var _e = Array.isArray;
    function Te(L) {
      return _e(L);
    }
    function te(L) {
      {
        var Se = typeof Symbol == "function" && Symbol.toStringTag, De = Se && L[Symbol.toStringTag] || L.constructor.name || "Object";
        return De;
      }
    }
    function Ve(L) {
      try {
        return Tt(L), !1;
      } catch {
        return !0;
      }
    }
    function Tt(L) {
      return "" + L;
    }
    function Bt(L) {
      if (Ve(L))
        return oe("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", te(L)), Tt(L);
    }
    var Dt = ce.ReactCurrentOwner, jn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, bi, Pr, Oe;
    Oe = {};
    function at(L) {
      if (mn.call(L, "ref")) {
        var Se = Object.getOwnPropertyDescriptor(L, "ref").get;
        if (Se && Se.isReactWarning)
          return !1;
      }
      return L.ref !== void 0;
    }
    function Ot(L) {
      if (mn.call(L, "key")) {
        var Se = Object.getOwnPropertyDescriptor(L, "key").get;
        if (Se && Se.isReactWarning)
          return !1;
      }
      return L.key !== void 0;
    }
    function Wt(L, Se) {
      if (typeof L.ref == "string" && Dt.current && Se && Dt.current.stateNode !== Se) {
        var De = pe(Dt.current.type);
        Oe[De] || (oe('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', pe(Dt.current.type), L.ref), Oe[De] = !0);
      }
    }
    function dn(L, Se) {
      {
        var De = function() {
          bi || (bi = !0, oe("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Se));
        };
        De.isReactWarning = !0, Object.defineProperty(L, "key", {
          get: De,
          configurable: !0
        });
      }
    }
    function ur(L, Se) {
      {
        var De = function() {
          Pr || (Pr = !0, oe("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Se));
        };
        De.isReactWarning = !0, Object.defineProperty(L, "ref", {
          get: De,
          configurable: !0
        });
      }
    }
    var $n = function(L, Se, De, it, Pt, Vt, mt) {
      var Mt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: L,
        key: Se,
        ref: De,
        props: mt,
        // Record the component responsible for creating this element.
        _owner: Vt
      };
      return Mt._store = {}, Object.defineProperty(Mt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Mt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: it
      }), Object.defineProperty(Mt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Pt
      }), Object.freeze && (Object.freeze(Mt.props), Object.freeze(Mt)), Mt;
    };
    function Xr(L, Se, De, it, Pt) {
      {
        var Vt, mt = {}, Mt = null, sr = null;
        De !== void 0 && (Bt(De), Mt = "" + De), Ot(Se) && (Bt(Se.key), Mt = "" + Se.key), at(Se) && (sr = Se.ref, Wt(Se, Pt));
        for (Vt in Se)
          mn.call(Se, Vt) && !jn.hasOwnProperty(Vt) && (mt[Vt] = Se[Vt]);
        if (L && L.defaultProps) {
          var yn = L.defaultProps;
          for (Vt in yn)
            mt[Vt] === void 0 && (mt[Vt] = yn[Vt]);
        }
        if (Mt || sr) {
          var kn = typeof L == "function" ? L.displayName || L.name || "Unknown" : L;
          Mt && dn(mt, kn), sr && ur(mt, kn);
        }
        return $n(L, Mt, sr, Pt, it, Dt.current, mt);
      }
    }
    var pn = ce.ReactCurrentOwner, ma = ce.ReactDebugCurrentFrame;
    function cn(L) {
      if (L) {
        var Se = L._owner, De = Xt(L.type, L._source, Se ? Se.type : null);
        ma.setExtraStackFrame(De);
      } else
        ma.setExtraStackFrame(null);
    }
    var vn;
    vn = !1;
    function ql(L) {
      return typeof L == "object" && L !== null && L.$$typeof === s;
    }
    function rl() {
      {
        if (pn.current) {
          var L = pe(pn.current.type);
          if (L)
            return `

Check the render method of \`` + L + "`.";
        }
        return "";
      }
    }
    function Kl(L) {
      return "";
    }
    var cs = {};
    function xc(L) {
      {
        var Se = rl();
        if (!Se) {
          var De = typeof L == "string" ? L : L.displayName || L.name;
          De && (Se = `

Check the top-level render call using <` + De + ">.");
        }
        return Se;
      }
    }
    function al(L, Se) {
      {
        if (!L._store || L._store.validated || L.key != null)
          return;
        L._store.validated = !0;
        var De = xc(Se);
        if (cs[De])
          return;
        cs[De] = !0;
        var it = "";
        L && L._owner && L._owner !== pn.current && (it = " It was passed a child from " + pe(L._owner.type) + "."), cn(L), oe('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', De, it), cn(null);
      }
    }
    function Xl(L, Se) {
      {
        if (typeof L != "object")
          return;
        if (Te(L))
          for (var De = 0; De < L.length; De++) {
            var it = L[De];
            ql(it) && al(it, Se);
          }
        else if (ql(L))
          L._store && (L._store.validated = !0);
        else if (L) {
          var Pt = F(L);
          if (typeof Pt == "function" && Pt !== L.entries)
            for (var Vt = Pt.call(L), mt; !(mt = Vt.next()).done; )
              ql(mt.value) && al(mt.value, Se);
        }
      }
    }
    function il(L) {
      {
        var Se = L.type;
        if (Se == null || typeof Se == "string")
          return;
        var De;
        if (typeof Se == "function")
          De = Se.propTypes;
        else if (typeof Se == "object" && (Se.$$typeof === w || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        Se.$$typeof === O))
          De = Se.propTypes;
        else
          return;
        if (De) {
          var it = pe(Se);
          ne(De, L.props, "prop", it, L);
        } else if (Se.PropTypes !== void 0 && !vn) {
          vn = !0;
          var Pt = pe(Se);
          oe("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Pt || "Unknown");
        }
        typeof Se.getDefaultProps == "function" && !Se.getDefaultProps.isReactClassApproved && oe("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Zl(L) {
      {
        for (var Se = Object.keys(L.props), De = 0; De < Se.length; De++) {
          var it = Se[De];
          if (it !== "children" && it !== "key") {
            cn(L), oe("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", it), cn(null);
            break;
          }
        }
        L.ref !== null && (cn(L), oe("Invalid attribute `ref` supplied to `React.Fragment`."), cn(null));
      }
    }
    var Ci = {};
    function Vi(L, Se, De, it, Pt, Vt) {
      {
        var mt = se(L);
        if (!mt) {
          var Mt = "";
          (L === void 0 || typeof L == "object" && L !== null && Object.keys(L).length === 0) && (Mt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var sr = Kl();
          sr ? Mt += sr : Mt += rl();
          var yn;
          L === null ? yn = "null" : Te(L) ? yn = "array" : L !== void 0 && L.$$typeof === s ? (yn = "<" + (pe(L.type) || "Unknown") + " />", Mt = " Did you accidentally export a JSX literal instead of a component?") : yn = typeof L, oe("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", yn, Mt);
        }
        var kn = Xr(L, Se, De, Pt, Vt);
        if (kn == null)
          return kn;
        if (mt) {
          var Zr = Se.children;
          if (Zr !== void 0)
            if (it)
              if (Te(Zr)) {
                for (var go = 0; go < Zr.length; go++)
                  Xl(Zr[go], L);
                Object.freeze && Object.freeze(Zr);
              } else
                oe("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Xl(Zr, L);
        }
        if (mn.call(Se, "key")) {
          var Qt = pe(L), Mr = Object.keys(Se).filter(function(Ei) {
            return Ei !== "key";
          }), ga = Mr.length > 0 ? "{key: someKey, " + Mr.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ci[Qt + ga]) {
            var At = Mr.length > 0 ? "{" + Mr.join(": ..., ") + ": ...}" : "{}";
            oe(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, ga, Qt, At, Qt), Ci[Qt + ga] = !0;
          }
        }
        return L === v ? Zl(kn) : il(kn), kn;
      }
    }
    function ya(L, Se, De) {
      return Vi(L, Se, De, !0);
    }
    function oi(L, Se, De) {
      return Vi(L, Se, De, !1);
    }
    var yo = oi, ol = ya;
    Gv.Fragment = v, Gv.jsx = yo, Gv.jsxs = ol;
  }()), Gv;
}
process.env.NODE_ENV === "production" ? iC.exports = IN() : iC.exports = YN();
var ht = iC.exports;
const WN = "_wrapper_5bkbt_1", GN = "_logo_5bkbt_19", QN = "_title_5bkbt_33", $1 = {
  wrapper: WN,
  logo: GN,
  title: QN
}, qN = ({ text: i, image: s }) => /* @__PURE__ */ ht.jsx("header", { children: /* @__PURE__ */ ht.jsxs("div", { className: $1.wrapper, children: [
  /* @__PURE__ */ ht.jsx("div", { children: /* @__PURE__ */ ht.jsx("img", { width: 150, height: 150, className: $1.logo, src: s }) }),
  /* @__PURE__ */ ht.jsx("h1", { className: $1.title, children: i })
] }) });
var oC = { exports: {} }, Tg = { exports: {} }, on = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ow;
function KN() {
  if (Ow) return on;
  Ow = 1;
  var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, c = i ? Symbol.for("react.portal") : 60106, v = i ? Symbol.for("react.fragment") : 60107, m = i ? Symbol.for("react.strict_mode") : 60108, S = i ? Symbol.for("react.profiler") : 60114, y = i ? Symbol.for("react.provider") : 60109, T = i ? Symbol.for("react.context") : 60110, w = i ? Symbol.for("react.async_mode") : 60111, k = i ? Symbol.for("react.concurrent_mode") : 60111, A = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, z = i ? Symbol.for("react.suspense_list") : 60120, H = i ? Symbol.for("react.memo") : 60115, I = i ? Symbol.for("react.lazy") : 60116, B = i ? Symbol.for("react.block") : 60121, F = i ? Symbol.for("react.fundamental") : 60117, ce = i ? Symbol.for("react.responder") : 60118, oe = i ? Symbol.for("react.scope") : 60119;
  function X(V) {
    if (typeof V == "object" && V !== null) {
      var be = V.$$typeof;
      switch (be) {
        case s:
          switch (V = V.type, V) {
            case w:
            case k:
            case v:
            case S:
            case m:
            case O:
              return V;
            default:
              switch (V = V && V.$$typeof, V) {
                case T:
                case A:
                case I:
                case H:
                case y:
                  return V;
                default:
                  return be;
              }
          }
        case c:
          return be;
      }
    }
  }
  function le(V) {
    return X(V) === k;
  }
  return on.AsyncMode = w, on.ConcurrentMode = k, on.ContextConsumer = T, on.ContextProvider = y, on.Element = s, on.ForwardRef = A, on.Fragment = v, on.Lazy = I, on.Memo = H, on.Portal = c, on.Profiler = S, on.StrictMode = m, on.Suspense = O, on.isAsyncMode = function(V) {
    return le(V) || X(V) === w;
  }, on.isConcurrentMode = le, on.isContextConsumer = function(V) {
    return X(V) === T;
  }, on.isContextProvider = function(V) {
    return X(V) === y;
  }, on.isElement = function(V) {
    return typeof V == "object" && V !== null && V.$$typeof === s;
  }, on.isForwardRef = function(V) {
    return X(V) === A;
  }, on.isFragment = function(V) {
    return X(V) === v;
  }, on.isLazy = function(V) {
    return X(V) === I;
  }, on.isMemo = function(V) {
    return X(V) === H;
  }, on.isPortal = function(V) {
    return X(V) === c;
  }, on.isProfiler = function(V) {
    return X(V) === S;
  }, on.isStrictMode = function(V) {
    return X(V) === m;
  }, on.isSuspense = function(V) {
    return X(V) === O;
  }, on.isValidElementType = function(V) {
    return typeof V == "string" || typeof V == "function" || V === v || V === k || V === S || V === m || V === O || V === z || typeof V == "object" && V !== null && (V.$$typeof === I || V.$$typeof === H || V.$$typeof === y || V.$$typeof === T || V.$$typeof === A || V.$$typeof === F || V.$$typeof === ce || V.$$typeof === oe || V.$$typeof === B);
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
var Dw;
function XN() {
  return Dw || (Dw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, c = i ? Symbol.for("react.portal") : 60106, v = i ? Symbol.for("react.fragment") : 60107, m = i ? Symbol.for("react.strict_mode") : 60108, S = i ? Symbol.for("react.profiler") : 60114, y = i ? Symbol.for("react.provider") : 60109, T = i ? Symbol.for("react.context") : 60110, w = i ? Symbol.for("react.async_mode") : 60111, k = i ? Symbol.for("react.concurrent_mode") : 60111, A = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, z = i ? Symbol.for("react.suspense_list") : 60120, H = i ? Symbol.for("react.memo") : 60115, I = i ? Symbol.for("react.lazy") : 60116, B = i ? Symbol.for("react.block") : 60121, F = i ? Symbol.for("react.fundamental") : 60117, ce = i ? Symbol.for("react.responder") : 60118, oe = i ? Symbol.for("react.scope") : 60119;
    function X(we) {
      return typeof we == "string" || typeof we == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      we === v || we === k || we === S || we === m || we === O || we === z || typeof we == "object" && we !== null && (we.$$typeof === I || we.$$typeof === H || we.$$typeof === y || we.$$typeof === T || we.$$typeof === A || we.$$typeof === F || we.$$typeof === ce || we.$$typeof === oe || we.$$typeof === B);
    }
    function le(we) {
      if (typeof we == "object" && we !== null) {
        var Ft = we.$$typeof;
        switch (Ft) {
          case s:
            var Le = we.type;
            switch (Le) {
              case w:
              case k:
              case v:
              case S:
              case m:
              case O:
                return Le;
              default:
                var Xt = Le && Le.$$typeof;
                switch (Xt) {
                  case T:
                  case A:
                  case I:
                  case H:
                  case y:
                    return Xt;
                  default:
                    return Ft;
                }
            }
          case c:
            return Ft;
        }
      }
    }
    var V = w, be = k, fe = T, et = y, _ = s, se = A, ke = v, ve = I, pe = H, Re = c, lt = S, Qe = m, Et = O, ge = !1;
    function ze(we) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), Y(we) || le(we) === w;
    }
    function Y(we) {
      return le(we) === k;
    }
    function de(we) {
      return le(we) === T;
    }
    function Ne(we) {
      return le(we) === y;
    }
    function Xe(we) {
      return typeof we == "object" && we !== null && we.$$typeof === s;
    }
    function Pe(we) {
      return le(we) === A;
    }
    function yt(we) {
      return le(we) === v;
    }
    function Ie(we) {
      return le(we) === I;
    }
    function ut(we) {
      return le(we) === H;
    }
    function rt(we) {
      return le(we) === c;
    }
    function pt(we) {
      return le(we) === S;
    }
    function gt(we) {
      return le(we) === m;
    }
    function Ut(we) {
      return le(we) === O;
    }
    ln.AsyncMode = V, ln.ConcurrentMode = be, ln.ContextConsumer = fe, ln.ContextProvider = et, ln.Element = _, ln.ForwardRef = se, ln.Fragment = ke, ln.Lazy = ve, ln.Memo = pe, ln.Portal = Re, ln.Profiler = lt, ln.StrictMode = Qe, ln.Suspense = Et, ln.isAsyncMode = ze, ln.isConcurrentMode = Y, ln.isContextConsumer = de, ln.isContextProvider = Ne, ln.isElement = Xe, ln.isForwardRef = Pe, ln.isFragment = yt, ln.isLazy = Ie, ln.isMemo = ut, ln.isPortal = rt, ln.isProfiler = pt, ln.isStrictMode = gt, ln.isSuspense = Ut, ln.isValidElementType = X, ln.typeOf = le;
  }()), ln;
}
var Mw;
function SC() {
  return Mw || (Mw = 1, process.env.NODE_ENV === "production" ? Tg.exports = KN() : Tg.exports = XN()), Tg.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var V1, Aw;
function ZN() {
  if (Aw) return V1;
  Aw = 1;
  var i = Object.getOwnPropertySymbols, s = Object.prototype.hasOwnProperty, c = Object.prototype.propertyIsEnumerable;
  function v(S) {
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
      for (var y = {}, T = 0; T < 10; T++)
        y["_" + String.fromCharCode(T)] = T;
      var w = Object.getOwnPropertyNames(y).map(function(A) {
        return y[A];
      });
      if (w.join("") !== "0123456789")
        return !1;
      var k = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(A) {
        k[A] = A;
      }), Object.keys(Object.assign({}, k)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return V1 = m() ? Object.assign : function(S, y) {
    for (var T, w = v(S), k, A = 1; A < arguments.length; A++) {
      T = Object(arguments[A]);
      for (var O in T)
        s.call(T, O) && (w[O] = T[O]);
      if (i) {
        k = i(T);
        for (var z = 0; z < k.length; z++)
          c.call(T, k[z]) && (w[k[z]] = T[k[z]]);
      }
    }
    return w;
  }, V1;
}
var B1, Nw;
function bC() {
  if (Nw) return B1;
  Nw = 1;
  var i = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return B1 = i, B1;
}
var H1, Lw;
function RR() {
  return Lw || (Lw = 1, H1 = Function.call.bind(Object.prototype.hasOwnProperty)), H1;
}
var I1, zw;
function JN() {
  if (zw) return I1;
  zw = 1;
  var i = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var s = bC(), c = {}, v = RR();
    i = function(S) {
      var y = "Warning: " + S;
      typeof console < "u" && console.error(y);
      try {
        throw new Error(y);
      } catch {
      }
    };
  }
  function m(S, y, T, w, k) {
    if (process.env.NODE_ENV !== "production") {
      for (var A in S)
        if (v(S, A)) {
          var O;
          try {
            if (typeof S[A] != "function") {
              var z = Error(
                (w || "React class") + ": " + T + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof S[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw z.name = "Invariant Violation", z;
            }
            O = S[A](y, A, w, T, null, s);
          } catch (I) {
            O = I;
          }
          if (O && !(O instanceof Error) && i(
            (w || "React class") + ": type specification of " + T + " `" + A + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof O + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), O instanceof Error && !(O.message in c)) {
            c[O.message] = !0;
            var H = k ? k() : "";
            i(
              "Failed " + T + " type: " + O.message + (H ?? "")
            );
          }
        }
    }
  }
  return m.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (c = {});
  }, I1 = m, I1;
}
var Y1, Uw;
function e2() {
  if (Uw) return Y1;
  Uw = 1;
  var i = SC(), s = ZN(), c = bC(), v = RR(), m = JN(), S = function() {
  };
  process.env.NODE_ENV !== "production" && (S = function(T) {
    var w = "Warning: " + T;
    typeof console < "u" && console.error(w);
    try {
      throw new Error(w);
    } catch {
    }
  });
  function y() {
    return null;
  }
  return Y1 = function(T, w) {
    var k = typeof Symbol == "function" && Symbol.iterator, A = "@@iterator";
    function O(Y) {
      var de = Y && (k && Y[k] || Y[A]);
      if (typeof de == "function")
        return de;
    }
    var z = "<<anonymous>>", H = {
      array: ce("array"),
      bigint: ce("bigint"),
      bool: ce("boolean"),
      func: ce("function"),
      number: ce("number"),
      object: ce("object"),
      string: ce("string"),
      symbol: ce("symbol"),
      any: oe(),
      arrayOf: X,
      element: le(),
      elementType: V(),
      instanceOf: be,
      node: se(),
      objectOf: et,
      oneOf: fe,
      oneOfType: _,
      shape: ve,
      exact: pe
    };
    function I(Y, de) {
      return Y === de ? Y !== 0 || 1 / Y === 1 / de : Y !== Y && de !== de;
    }
    function B(Y, de) {
      this.message = Y, this.data = de && typeof de == "object" ? de : {}, this.stack = "";
    }
    B.prototype = Error.prototype;
    function F(Y) {
      if (process.env.NODE_ENV !== "production")
        var de = {}, Ne = 0;
      function Xe(yt, Ie, ut, rt, pt, gt, Ut) {
        if (rt = rt || z, gt = gt || ut, Ut !== c) {
          if (w) {
            var we = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw we.name = "Invariant Violation", we;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ft = rt + ":" + ut;
            !de[Ft] && // Avoid spamming the console because they are often not actionable except for lib authors
            Ne < 3 && (S(
              "You are manually calling a React.PropTypes validation function for the `" + gt + "` prop on `" + rt + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), de[Ft] = !0, Ne++);
          }
        }
        return Ie[ut] == null ? yt ? Ie[ut] === null ? new B("The " + pt + " `" + gt + "` is marked as required " + ("in `" + rt + "`, but its value is `null`.")) : new B("The " + pt + " `" + gt + "` is marked as required in " + ("`" + rt + "`, but its value is `undefined`.")) : null : Y(Ie, ut, rt, pt, gt);
      }
      var Pe = Xe.bind(null, !1);
      return Pe.isRequired = Xe.bind(null, !0), Pe;
    }
    function ce(Y) {
      function de(Ne, Xe, Pe, yt, Ie, ut) {
        var rt = Ne[Xe], pt = Qe(rt);
        if (pt !== Y) {
          var gt = Et(rt);
          return new B(
            "Invalid " + yt + " `" + Ie + "` of type " + ("`" + gt + "` supplied to `" + Pe + "`, expected ") + ("`" + Y + "`."),
            { expectedType: Y }
          );
        }
        return null;
      }
      return F(de);
    }
    function oe() {
      return F(y);
    }
    function X(Y) {
      function de(Ne, Xe, Pe, yt, Ie) {
        if (typeof Y != "function")
          return new B("Property `" + Ie + "` of component `" + Pe + "` has invalid PropType notation inside arrayOf.");
        var ut = Ne[Xe];
        if (!Array.isArray(ut)) {
          var rt = Qe(ut);
          return new B("Invalid " + yt + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected an array."));
        }
        for (var pt = 0; pt < ut.length; pt++) {
          var gt = Y(ut, pt, Pe, yt, Ie + "[" + pt + "]", c);
          if (gt instanceof Error)
            return gt;
        }
        return null;
      }
      return F(de);
    }
    function le() {
      function Y(de, Ne, Xe, Pe, yt) {
        var Ie = de[Ne];
        if (!T(Ie)) {
          var ut = Qe(Ie);
          return new B("Invalid " + Pe + " `" + yt + "` of type " + ("`" + ut + "` supplied to `" + Xe + "`, expected a single ReactElement."));
        }
        return null;
      }
      return F(Y);
    }
    function V() {
      function Y(de, Ne, Xe, Pe, yt) {
        var Ie = de[Ne];
        if (!i.isValidElementType(Ie)) {
          var ut = Qe(Ie);
          return new B("Invalid " + Pe + " `" + yt + "` of type " + ("`" + ut + "` supplied to `" + Xe + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return F(Y);
    }
    function be(Y) {
      function de(Ne, Xe, Pe, yt, Ie) {
        if (!(Ne[Xe] instanceof Y)) {
          var ut = Y.name || z, rt = ze(Ne[Xe]);
          return new B("Invalid " + yt + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected ") + ("instance of `" + ut + "`."));
        }
        return null;
      }
      return F(de);
    }
    function fe(Y) {
      if (!Array.isArray(Y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? S(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : S("Invalid argument supplied to oneOf, expected an array.")), y;
      function de(Ne, Xe, Pe, yt, Ie) {
        for (var ut = Ne[Xe], rt = 0; rt < Y.length; rt++)
          if (I(ut, Y[rt]))
            return null;
        var pt = JSON.stringify(Y, function(Ut, we) {
          var Ft = Et(we);
          return Ft === "symbol" ? String(we) : we;
        });
        return new B("Invalid " + yt + " `" + Ie + "` of value `" + String(ut) + "` " + ("supplied to `" + Pe + "`, expected one of " + pt + "."));
      }
      return F(de);
    }
    function et(Y) {
      function de(Ne, Xe, Pe, yt, Ie) {
        if (typeof Y != "function")
          return new B("Property `" + Ie + "` of component `" + Pe + "` has invalid PropType notation inside objectOf.");
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new B("Invalid " + yt + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Pe + "`, expected an object."));
        for (var pt in ut)
          if (v(ut, pt)) {
            var gt = Y(ut, pt, Pe, yt, Ie + "." + pt, c);
            if (gt instanceof Error)
              return gt;
          }
        return null;
      }
      return F(de);
    }
    function _(Y) {
      if (!Array.isArray(Y))
        return process.env.NODE_ENV !== "production" && S("Invalid argument supplied to oneOfType, expected an instance of array."), y;
      for (var de = 0; de < Y.length; de++) {
        var Ne = Y[de];
        if (typeof Ne != "function")
          return S(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ge(Ne) + " at index " + de + "."
          ), y;
      }
      function Xe(Pe, yt, Ie, ut, rt) {
        for (var pt = [], gt = 0; gt < Y.length; gt++) {
          var Ut = Y[gt], we = Ut(Pe, yt, Ie, ut, rt, c);
          if (we == null)
            return null;
          we.data && v(we.data, "expectedType") && pt.push(we.data.expectedType);
        }
        var Ft = pt.length > 0 ? ", expected one of type [" + pt.join(", ") + "]" : "";
        return new B("Invalid " + ut + " `" + rt + "` supplied to " + ("`" + Ie + "`" + Ft + "."));
      }
      return F(Xe);
    }
    function se() {
      function Y(de, Ne, Xe, Pe, yt) {
        return Re(de[Ne]) ? null : new B("Invalid " + Pe + " `" + yt + "` supplied to " + ("`" + Xe + "`, expected a ReactNode."));
      }
      return F(Y);
    }
    function ke(Y, de, Ne, Xe, Pe) {
      return new B(
        (Y || "React class") + ": " + de + " type `" + Ne + "." + Xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + Pe + "`."
      );
    }
    function ve(Y) {
      function de(Ne, Xe, Pe, yt, Ie) {
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new B("Invalid " + yt + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Pe + "`, expected `object`."));
        for (var pt in Y) {
          var gt = Y[pt];
          if (typeof gt != "function")
            return ke(Pe, yt, Ie, pt, Et(gt));
          var Ut = gt(ut, pt, Pe, yt, Ie + "." + pt, c);
          if (Ut)
            return Ut;
        }
        return null;
      }
      return F(de);
    }
    function pe(Y) {
      function de(Ne, Xe, Pe, yt, Ie) {
        var ut = Ne[Xe], rt = Qe(ut);
        if (rt !== "object")
          return new B("Invalid " + yt + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Pe + "`, expected `object`."));
        var pt = s({}, Ne[Xe], Y);
        for (var gt in pt) {
          var Ut = Y[gt];
          if (v(Y, gt) && typeof Ut != "function")
            return ke(Pe, yt, Ie, gt, Et(Ut));
          if (!Ut)
            return new B(
              "Invalid " + yt + " `" + Ie + "` key `" + gt + "` supplied to `" + Pe + "`.\nBad object: " + JSON.stringify(Ne[Xe], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(Y), null, "  ")
            );
          var we = Ut(ut, gt, Pe, yt, Ie + "." + gt, c);
          if (we)
            return we;
        }
        return null;
      }
      return F(de);
    }
    function Re(Y) {
      switch (typeof Y) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !Y;
        case "object":
          if (Array.isArray(Y))
            return Y.every(Re);
          if (Y === null || T(Y))
            return !0;
          var de = O(Y);
          if (de) {
            var Ne = de.call(Y), Xe;
            if (de !== Y.entries) {
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
    function lt(Y, de) {
      return Y === "symbol" ? !0 : de ? de["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && de instanceof Symbol : !1;
    }
    function Qe(Y) {
      var de = typeof Y;
      return Array.isArray(Y) ? "array" : Y instanceof RegExp ? "object" : lt(de, Y) ? "symbol" : de;
    }
    function Et(Y) {
      if (typeof Y > "u" || Y === null)
        return "" + Y;
      var de = Qe(Y);
      if (de === "object") {
        if (Y instanceof Date)
          return "date";
        if (Y instanceof RegExp)
          return "regexp";
      }
      return de;
    }
    function ge(Y) {
      var de = Et(Y);
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
    function ze(Y) {
      return !Y.constructor || !Y.constructor.name ? z : Y.constructor.name;
    }
    return H.checkPropTypes = m, H.resetWarningCache = m.resetWarningCache, H.PropTypes = H, H;
  }, Y1;
}
var W1, Fw;
function t2() {
  if (Fw) return W1;
  Fw = 1;
  var i = bC();
  function s() {
  }
  function c() {
  }
  return c.resetWarningCache = s, W1 = function() {
    function v(y, T, w, k, A, O) {
      if (O !== i) {
        var z = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw z.name = "Invariant Violation", z;
      }
    }
    v.isRequired = v;
    function m() {
      return v;
    }
    var S = {
      array: v,
      bigint: v,
      bool: v,
      func: v,
      number: v,
      object: v,
      string: v,
      symbol: v,
      any: v,
      arrayOf: m,
      element: v,
      elementType: v,
      instanceOf: m,
      node: v,
      objectOf: m,
      oneOf: m,
      oneOfType: m,
      shape: m,
      exact: m,
      checkPropTypes: c,
      resetWarningCache: s
    };
    return S.PropTypes = S, S;
  }, W1;
}
if (process.env.NODE_ENV !== "production") {
  var n2 = SC(), r2 = !0;
  oC.exports = e2()(n2.isElement, r2);
} else
  oC.exports = t2()();
var a2 = oC.exports;
const D = /* @__PURE__ */ RN(a2);
function ls(i) {
  let s = "https://mui.com/production-error/?code=" + i;
  for (let c = 1; c < arguments.length; c += 1)
    s += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified MUI error #" + i + "; visit " + s + " for the full message.";
}
function Pg() {
  return Pg = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var c = arguments[s];
      for (var v in c) ({}).hasOwnProperty.call(c, v) && (i[v] = c[v]);
    }
    return i;
  }, Pg.apply(null, arguments);
}
function _R(i) {
  var s = /* @__PURE__ */ Object.create(null);
  return function(c) {
    return s[c] === void 0 && (s[c] = i(c)), s[c];
  };
}
var i2 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, o2 = /* @__PURE__ */ _R(
  function(i) {
    return i2.test(i) || i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) < 91;
  }
  /* Z+1 */
), l2 = !1;
function u2(i) {
  if (i.sheet)
    return i.sheet;
  for (var s = 0; s < document.styleSheets.length; s++)
    if (document.styleSheets[s].ownerNode === i)
      return document.styleSheets[s];
}
function s2(i) {
  var s = document.createElement("style");
  return s.setAttribute("data-emotion", i.key), i.nonce !== void 0 && s.setAttribute("nonce", i.nonce), s.appendChild(document.createTextNode("")), s.setAttribute("data-s", ""), s;
}
var c2 = /* @__PURE__ */ function() {
  function i(c) {
    var v = this;
    this._insertTag = function(m) {
      var S;
      v.tags.length === 0 ? v.insertionPoint ? S = v.insertionPoint.nextSibling : v.prepend ? S = v.container.firstChild : S = v.before : S = v.tags[v.tags.length - 1].nextSibling, v.container.insertBefore(m, S), v.tags.push(m);
    }, this.isSpeedy = c.speedy === void 0 ? !l2 : c.speedy, this.tags = [], this.ctr = 0, this.nonce = c.nonce, this.key = c.key, this.container = c.container, this.prepend = c.prepend, this.insertionPoint = c.insertionPoint, this.before = null;
  }
  var s = i.prototype;
  return s.hydrate = function(v) {
    v.forEach(this._insertTag);
  }, s.insert = function(v) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag(s2(this));
    var m = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var S = u2(m);
      try {
        S.insertRule(v, S.cssRules.length);
      } catch {
      }
    } else
      m.appendChild(document.createTextNode(v));
    this.ctr++;
  }, s.flush = function() {
    this.tags.forEach(function(v) {
      var m;
      return (m = v.parentNode) == null ? void 0 : m.removeChild(v);
    }), this.tags = [], this.ctr = 0;
  }, i;
}(), ha = "-ms-", jg = "-moz-", en = "-webkit-", kR = "comm", CC = "rule", EC = "decl", f2 = "@import", OR = "@keyframes", d2 = "@layer", p2 = Math.abs, Wg = String.fromCharCode, v2 = Object.assign;
function h2(i, s) {
  return qr(i, 0) ^ 45 ? (((s << 2 ^ qr(i, 0)) << 2 ^ qr(i, 1)) << 2 ^ qr(i, 2)) << 2 ^ qr(i, 3) : 0;
}
function DR(i) {
  return i.trim();
}
function m2(i, s) {
  return (i = s.exec(i)) ? i[0] : i;
}
function tn(i, s, c) {
  return i.replace(s, c);
}
function lC(i, s) {
  return i.indexOf(s);
}
function qr(i, s) {
  return i.charCodeAt(s) | 0;
}
function rh(i, s, c) {
  return i.slice(s, c);
}
function qo(i) {
  return i.length;
}
function TC(i) {
  return i.length;
}
function xg(i, s) {
  return s.push(i), i;
}
function y2(i, s) {
  return i.map(s).join("");
}
var Gg = 1, Ad = 1, MR = 0, ii = 0, yr = 0, Nd = "";
function Qg(i, s, c, v, m, S, y) {
  return { value: i, root: s, parent: c, type: v, props: m, children: S, line: Gg, column: Ad, length: y, return: "" };
}
function Qv(i, s) {
  return v2(Qg("", null, null, "", null, null, 0), i, { length: -i.length }, s);
}
function g2() {
  return yr;
}
function S2() {
  return yr = ii > 0 ? qr(Nd, --ii) : 0, Ad--, yr === 10 && (Ad = 1, Gg--), yr;
}
function Si() {
  return yr = ii < MR ? qr(Nd, ii++) : 0, Ad++, yr === 10 && (Ad = 1, Gg++), yr;
}
function Jo() {
  return qr(Nd, ii);
}
function Ng() {
  return ii;
}
function sh(i, s) {
  return rh(Nd, i, s);
}
function ah(i) {
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
function AR(i) {
  return Gg = Ad = 1, MR = qo(Nd = i), ii = 0, [];
}
function NR(i) {
  return Nd = "", i;
}
function Lg(i) {
  return DR(sh(ii - 1, uC(i === 91 ? i + 2 : i === 40 ? i + 1 : i)));
}
function b2(i) {
  for (; (yr = Jo()) && yr < 33; )
    Si();
  return ah(i) > 2 || ah(yr) > 3 ? "" : " ";
}
function C2(i, s) {
  for (; --s && Si() && !(yr < 48 || yr > 102 || yr > 57 && yr < 65 || yr > 70 && yr < 97); )
    ;
  return sh(i, Ng() + (s < 6 && Jo() == 32 && Si() == 32));
}
function uC(i) {
  for (; Si(); )
    switch (yr) {
      case i:
        return ii;
      case 34:
      case 39:
        i !== 34 && i !== 39 && uC(yr);
        break;
      case 40:
        i === 41 && uC(i);
        break;
      case 92:
        Si();
        break;
    }
  return ii;
}
function E2(i, s) {
  for (; Si() && i + yr !== 57; )
    if (i + yr === 84 && Jo() === 47)
      break;
  return "/*" + sh(s, ii - 1) + "*" + Wg(i === 47 ? i : Si());
}
function T2(i) {
  for (; !ah(Jo()); )
    Si();
  return sh(i, ii);
}
function x2(i) {
  return NR(zg("", null, null, null, [""], i = AR(i), 0, [0], i));
}
function zg(i, s, c, v, m, S, y, T, w) {
  for (var k = 0, A = 0, O = y, z = 0, H = 0, I = 0, B = 1, F = 1, ce = 1, oe = 0, X = "", le = m, V = S, be = v, fe = X; F; )
    switch (I = oe, oe = Si()) {
      case 40:
        if (I != 108 && qr(fe, O - 1) == 58) {
          lC(fe += tn(Lg(oe), "&", "&\f"), "&\f") != -1 && (ce = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        fe += Lg(oe);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        fe += b2(I);
        break;
      case 92:
        fe += C2(Ng() - 1, 7);
        continue;
      case 47:
        switch (Jo()) {
          case 42:
          case 47:
            xg(w2(E2(Si(), Ng()), s, c), w);
            break;
          default:
            fe += "/";
        }
        break;
      case 123 * B:
        T[k++] = qo(fe) * ce;
      case 125 * B:
      case 59:
      case 0:
        switch (oe) {
          case 0:
          case 125:
            F = 0;
          case 59 + A:
            ce == -1 && (fe = tn(fe, /\f/g, "")), H > 0 && qo(fe) - O && xg(H > 32 ? jw(fe + ";", v, c, O - 1) : jw(tn(fe, " ", "") + ";", v, c, O - 2), w);
            break;
          case 59:
            fe += ";";
          default:
            if (xg(be = Pw(fe, s, c, k, A, m, T, X, le = [], V = [], O), S), oe === 123)
              if (A === 0)
                zg(fe, s, be, be, le, S, O, T, V);
              else
                switch (z === 99 && qr(fe, 3) === 110 ? 100 : z) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    zg(i, be, be, v && xg(Pw(i, be, be, 0, 0, m, T, X, m, le = [], O), V), m, V, O, T, v ? le : V);
                    break;
                  default:
                    zg(fe, be, be, be, [""], V, 0, T, V);
                }
        }
        k = A = H = 0, B = ce = 1, X = fe = "", O = y;
        break;
      case 58:
        O = 1 + qo(fe), H = I;
      default:
        if (B < 1) {
          if (oe == 123)
            --B;
          else if (oe == 125 && B++ == 0 && S2() == 125)
            continue;
        }
        switch (fe += Wg(oe), oe * B) {
          case 38:
            ce = A > 0 ? 1 : (fe += "\f", -1);
            break;
          case 44:
            T[k++] = (qo(fe) - 1) * ce, ce = 1;
            break;
          case 64:
            Jo() === 45 && (fe += Lg(Si())), z = Jo(), A = O = qo(X = fe += T2(Ng())), oe++;
            break;
          case 45:
            I === 45 && qo(fe) == 2 && (B = 0);
        }
    }
  return S;
}
function Pw(i, s, c, v, m, S, y, T, w, k, A) {
  for (var O = m - 1, z = m === 0 ? S : [""], H = TC(z), I = 0, B = 0, F = 0; I < v; ++I)
    for (var ce = 0, oe = rh(i, O + 1, O = p2(B = y[I])), X = i; ce < H; ++ce)
      (X = DR(B > 0 ? z[ce] + " " + oe : tn(oe, /&\f/g, z[ce]))) && (w[F++] = X);
  return Qg(i, s, c, m === 0 ? CC : T, w, k, A);
}
function w2(i, s, c) {
  return Qg(i, s, c, kR, Wg(g2()), rh(i, 2, -2), 0);
}
function jw(i, s, c, v) {
  return Qg(i, s, c, EC, rh(i, 0, v), rh(i, v + 1, -1), v);
}
function Dd(i, s) {
  for (var c = "", v = TC(i), m = 0; m < v; m++)
    c += s(i[m], m, i, s) || "";
  return c;
}
function R2(i, s, c, v) {
  switch (i.type) {
    case d2:
      if (i.children.length) break;
    case f2:
    case EC:
      return i.return = i.return || i.value;
    case kR:
      return "";
    case OR:
      return i.return = i.value + "{" + Dd(i.children, v) + "}";
    case CC:
      i.value = i.props.join(",");
  }
  return qo(c = Dd(i.children, v)) ? i.return = i.value + "{" + c + "}" : "";
}
function _2(i) {
  var s = TC(i);
  return function(c, v, m, S) {
    for (var y = "", T = 0; T < s; T++)
      y += i[T](c, v, m, S) || "";
    return y;
  };
}
function k2(i) {
  return function(s) {
    s.root || (s = s.return) && i(s);
  };
}
var O2 = function(s, c, v) {
  for (var m = 0, S = 0; m = S, S = Jo(), m === 38 && S === 12 && (c[v] = 1), !ah(S); )
    Si();
  return sh(s, ii);
}, D2 = function(s, c) {
  var v = -1, m = 44;
  do
    switch (ah(m)) {
      case 0:
        m === 38 && Jo() === 12 && (c[v] = 1), s[v] += O2(ii - 1, c, v);
        break;
      case 2:
        s[v] += Lg(m);
        break;
      case 4:
        if (m === 44) {
          s[++v] = Jo() === 58 ? "&\f" : "", c[v] = s[v].length;
          break;
        }
      default:
        s[v] += Wg(m);
    }
  while (m = Si());
  return s;
}, M2 = function(s, c) {
  return NR(D2(AR(s), c));
}, $w = /* @__PURE__ */ new WeakMap(), A2 = function(s) {
  if (!(s.type !== "rule" || !s.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  s.length < 1)) {
    for (var c = s.value, v = s.parent, m = s.column === v.column && s.line === v.line; v.type !== "rule"; )
      if (v = v.parent, !v) return;
    if (!(s.props.length === 1 && c.charCodeAt(0) !== 58 && !$w.get(v)) && !m) {
      $w.set(s, !0);
      for (var S = [], y = M2(c, S), T = v.props, w = 0, k = 0; w < y.length; w++)
        for (var A = 0; A < T.length; A++, k++)
          s.props[k] = S[w] ? y[w].replace(/&\f/g, T[A]) : T[A] + " " + y[w];
    }
  }
}, N2 = function(s) {
  if (s.type === "decl") {
    var c = s.value;
    // charcode for l
    c.charCodeAt(0) === 108 && // charcode for b
    c.charCodeAt(2) === 98 && (s.return = "", s.value = "");
  }
};
function LR(i, s) {
  switch (h2(i, s)) {
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
      return en + i + jg + i + ha + i + i;
    case 6828:
    case 4268:
      return en + i + ha + i + i;
    case 6165:
      return en + i + ha + "flex-" + i + i;
    case 5187:
      return en + i + tn(i, /(\w+).+(:[^]+)/, en + "box-$1$2" + ha + "flex-$1$2") + i;
    case 5443:
      return en + i + ha + "flex-item-" + tn(i, /flex-|-self/, "") + i;
    case 4675:
      return en + i + ha + "flex-line-pack" + tn(i, /align-content|flex-|-self/, "") + i;
    case 5548:
      return en + i + ha + tn(i, "shrink", "negative") + i;
    case 5292:
      return en + i + ha + tn(i, "basis", "preferred-size") + i;
    case 6060:
      return en + "box-" + tn(i, "-grow", "") + en + i + ha + tn(i, "grow", "positive") + i;
    case 4554:
      return en + tn(i, /([^-])(transform)/g, "$1" + en + "$2") + i;
    case 6187:
      return tn(tn(tn(i, /(zoom-|grab)/, en + "$1"), /(image-set)/, en + "$1"), i, "") + i;
    case 5495:
    case 3959:
      return tn(i, /(image-set\([^]*)/, en + "$1$`$1");
    case 4968:
      return tn(tn(i, /(.+:)(flex-)?(.*)/, en + "box-pack:$3" + ha + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + en + i + i;
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
      if (qo(i) - 1 - s > 6) switch (qr(i, s + 1)) {
        case 109:
          if (qr(i, s + 4) !== 45) break;
        case 102:
          return tn(i, /(.+:)(.+)-([^]+)/, "$1" + en + "$2-$3$1" + jg + (qr(i, s + 3) == 108 ? "$3" : "$2-$3")) + i;
        case 115:
          return ~lC(i, "stretch") ? LR(tn(i, "stretch", "fill-available"), s) + i : i;
      }
      break;
    case 4949:
      if (qr(i, s + 1) !== 115) break;
    case 6444:
      switch (qr(i, qo(i) - 3 - (~lC(i, "!important") && 10))) {
        case 107:
          return tn(i, ":", ":" + en) + i;
        case 101:
          return tn(i, /(.+:)([^;!]+)(;|!.+)?/, "$1" + en + (qr(i, 14) === 45 ? "inline-" : "") + "box$3$1" + en + "$2$3$1" + ha + "$2box$3") + i;
      }
      break;
    case 5936:
      switch (qr(i, s + 11)) {
        case 114:
          return en + i + ha + tn(i, /[svh]\w+-[tblr]{2}/, "tb") + i;
        case 108:
          return en + i + ha + tn(i, /[svh]\w+-[tblr]{2}/, "tb-rl") + i;
        case 45:
          return en + i + ha + tn(i, /[svh]\w+-[tblr]{2}/, "lr") + i;
      }
      return en + i + ha + i + i;
  }
  return i;
}
var L2 = function(s, c, v, m) {
  if (s.length > -1 && !s.return) switch (s.type) {
    case EC:
      s.return = LR(s.value, s.length);
      break;
    case OR:
      return Dd([Qv(s, {
        value: tn(s.value, "@", "@" + en)
      })], m);
    case CC:
      if (s.length) return y2(s.props, function(S) {
        switch (m2(S, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Dd([Qv(s, {
              props: [tn(S, /:(read-\w+)/, ":" + jg + "$1")]
            })], m);
          case "::placeholder":
            return Dd([Qv(s, {
              props: [tn(S, /:(plac\w+)/, ":" + en + "input-$1")]
            }), Qv(s, {
              props: [tn(S, /:(plac\w+)/, ":" + jg + "$1")]
            }), Qv(s, {
              props: [tn(S, /:(plac\w+)/, ha + "input-$1")]
            })], m);
        }
        return "";
      });
  }
}, z2 = [L2], U2 = function(s) {
  var c = s.key;
  if (c === "css") {
    var v = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(v, function(B) {
      var F = B.getAttribute("data-emotion");
      F.indexOf(" ") !== -1 && (document.head.appendChild(B), B.setAttribute("data-s", ""));
    });
  }
  var m = s.stylisPlugins || z2, S = {}, y, T = [];
  y = s.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + c + ' "]'),
    function(B) {
      for (var F = B.getAttribute("data-emotion").split(" "), ce = 1; ce < F.length; ce++)
        S[F[ce]] = !0;
      T.push(B);
    }
  );
  var w, k = [A2, N2];
  {
    var A, O = [R2, k2(function(B) {
      A.insert(B);
    })], z = _2(k.concat(m, O)), H = function(F) {
      return Dd(x2(F), z);
    };
    w = function(F, ce, oe, X) {
      A = oe, H(F ? F + "{" + ce.styles + "}" : ce.styles), X && (I.inserted[ce.name] = !0);
    };
  }
  var I = {
    key: c,
    sheet: new c2({
      key: c,
      container: y,
      nonce: s.nonce,
      speedy: s.speedy,
      prepend: s.prepend,
      insertionPoint: s.insertionPoint
    }),
    nonce: s.nonce,
    inserted: S,
    registered: {},
    insert: w
  };
  return I.sheet.hydrate(T), I;
}, zR = SC(), F2 = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, P2 = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, UR = {};
UR[zR.ForwardRef] = F2;
UR[zR.Memo] = P2;
var j2 = !0;
function $2(i, s, c) {
  var v = "";
  return c.split(" ").forEach(function(m) {
    i[m] !== void 0 ? s.push(i[m] + ";") : m && (v += m + " ");
  }), v;
}
var FR = function(s, c, v) {
  var m = s.key + "-" + c.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (v === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  j2 === !1) && s.registered[m] === void 0 && (s.registered[m] = c.styles);
}, V2 = function(s, c, v) {
  FR(s, c, v);
  var m = s.key + "-" + c.name;
  if (s.inserted[c.name] === void 0) {
    var S = c;
    do
      s.insert(c === S ? "." + m : "", S, s.sheet, !0), S = S.next;
    while (S !== void 0);
  }
};
function B2(i) {
  for (var s = 0, c, v = 0, m = i.length; m >= 4; ++v, m -= 4)
    c = i.charCodeAt(v) & 255 | (i.charCodeAt(++v) & 255) << 8 | (i.charCodeAt(++v) & 255) << 16 | (i.charCodeAt(++v) & 255) << 24, c = /* Math.imul(k, m): */
    (c & 65535) * 1540483477 + ((c >>> 16) * 59797 << 16), c ^= /* k >>> r: */
    c >>> 24, s = /* Math.imul(k, m): */
    (c & 65535) * 1540483477 + ((c >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  switch (m) {
    case 3:
      s ^= (i.charCodeAt(v + 2) & 255) << 16;
    case 2:
      s ^= (i.charCodeAt(v + 1) & 255) << 8;
    case 1:
      s ^= i.charCodeAt(v) & 255, s = /* Math.imul(h, m): */
      (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  }
  return s ^= s >>> 13, s = /* Math.imul(h, m): */
  (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16), ((s ^ s >>> 15) >>> 0).toString(36);
}
var H2 = {
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
}, I2 = !1, Y2 = /[A-Z]|^ms/g, W2 = /_EMO_([^_]+?)_([^]*?)_EMO_/g, PR = function(s) {
  return s.charCodeAt(1) === 45;
}, Vw = function(s) {
  return s != null && typeof s != "boolean";
}, G1 = /* @__PURE__ */ _R(function(i) {
  return PR(i) ? i : i.replace(Y2, "-$&").toLowerCase();
}), Bw = function(s, c) {
  switch (s) {
    case "animation":
    case "animationName":
      if (typeof c == "string")
        return c.replace(W2, function(v, m, S) {
          return Ko = {
            name: m,
            styles: S,
            next: Ko
          }, m;
        });
  }
  return H2[s] !== 1 && !PR(s) && typeof c == "number" && c !== 0 ? c + "px" : c;
}, G2 = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function ih(i, s, c) {
  if (c == null)
    return "";
  var v = c;
  if (v.__emotion_styles !== void 0)
    return v;
  switch (typeof c) {
    case "boolean":
      return "";
    case "object": {
      var m = c;
      if (m.anim === 1)
        return Ko = {
          name: m.name,
          styles: m.styles,
          next: Ko
        }, m.name;
      var S = c;
      if (S.styles !== void 0) {
        var y = S.next;
        if (y !== void 0)
          for (; y !== void 0; )
            Ko = {
              name: y.name,
              styles: y.styles,
              next: Ko
            }, y = y.next;
        var T = S.styles + ";";
        return T;
      }
      return Q2(i, s, c);
    }
    case "function": {
      if (i !== void 0) {
        var w = Ko, k = c(i);
        return Ko = w, ih(i, s, k);
      }
      break;
    }
  }
  var A = c;
  if (s == null)
    return A;
  var O = s[A];
  return O !== void 0 ? O : A;
}
function Q2(i, s, c) {
  var v = "";
  if (Array.isArray(c))
    for (var m = 0; m < c.length; m++)
      v += ih(i, s, c[m]) + ";";
  else
    for (var S in c) {
      var y = c[S];
      if (typeof y != "object") {
        var T = y;
        s != null && s[T] !== void 0 ? v += S + "{" + s[T] + "}" : Vw(T) && (v += G1(S) + ":" + Bw(S, T) + ";");
      } else {
        if (S === "NO_COMPONENT_SELECTOR" && I2)
          throw new Error(G2);
        if (Array.isArray(y) && typeof y[0] == "string" && (s == null || s[y[0]] === void 0))
          for (var w = 0; w < y.length; w++)
            Vw(y[w]) && (v += G1(S) + ":" + Bw(S, y[w]) + ";");
        else {
          var k = ih(i, s, y);
          switch (S) {
            case "animation":
            case "animationName": {
              v += G1(S) + ":" + k + ";";
              break;
            }
            default:
              v += S + "{" + k + "}";
          }
        }
      }
    }
  return v;
}
var Hw = /label:\s*([^\s;{]+)\s*(;|$)/g, Ko;
function jR(i, s, c) {
  if (i.length === 1 && typeof i[0] == "object" && i[0] !== null && i[0].styles !== void 0)
    return i[0];
  var v = !0, m = "";
  Ko = void 0;
  var S = i[0];
  if (S == null || S.raw === void 0)
    v = !1, m += ih(c, s, S);
  else {
    var y = S;
    m += y[0];
  }
  for (var T = 1; T < i.length; T++)
    if (m += ih(c, s, i[T]), v) {
      var w = S;
      m += w[T];
    }
  Hw.lastIndex = 0;
  for (var k = "", A; (A = Hw.exec(m)) !== null; )
    k += "-" + A[1];
  var O = B2(m) + k;
  return {
    name: O,
    styles: m,
    next: Ko
  };
}
var q2 = function(s) {
  return s();
}, K2 = ct.useInsertionEffect ? ct.useInsertionEffect : !1, X2 = K2 || q2, $R = /* @__PURE__ */ ct.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ U2({
    key: "css"
  }) : null
);
$R.Provider;
var Z2 = function(s) {
  return /* @__PURE__ */ CN(function(c, v) {
    var m = EN($R);
    return s(c, m, v);
  });
}, VR = /* @__PURE__ */ ct.createContext({});
function J2() {
  for (var i = arguments.length, s = new Array(i), c = 0; c < i; c++)
    s[c] = arguments[c];
  return jR(s);
}
var xC = function() {
  var s = J2.apply(void 0, arguments), c = "animation-" + s.name;
  return {
    name: c,
    styles: "@keyframes " + c + "{" + s.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, eL = o2, tL = function(s) {
  return s !== "theme";
}, Iw = function(s) {
  return typeof s == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  s.charCodeAt(0) > 96 ? eL : tL;
}, Yw = function(s, c, v) {
  var m;
  if (c) {
    var S = c.shouldForwardProp;
    m = s.__emotion_forwardProp && S ? function(y) {
      return s.__emotion_forwardProp(y) && S(y);
    } : S;
  }
  return typeof m != "function" && v && (m = s.__emotion_forwardProp), m;
}, nL = !1, rL = function(s) {
  var c = s.cache, v = s.serialized, m = s.isStringTag;
  return FR(c, v, m), X2(function() {
    return V2(c, v, m);
  }), null;
}, aL = function i(s, c) {
  var v = s.__emotion_real === s, m = v && s.__emotion_base || s, S, y;
  c !== void 0 && (S = c.label, y = c.target);
  var T = Yw(s, c, v), w = T || Iw(m), k = !w("as");
  return function() {
    var A = arguments, O = v && s.__emotion_styles !== void 0 ? s.__emotion_styles.slice(0) : [];
    if (S !== void 0 && O.push("label:" + S + ";"), A[0] == null || A[0].raw === void 0)
      O.push.apply(O, A);
    else {
      O.push(A[0][0]);
      for (var z = A.length, H = 1; H < z; H++)
        O.push(A[H], A[0][H]);
    }
    var I = Z2(function(B, F, ce) {
      var oe = k && B.as || m, X = "", le = [], V = B;
      if (B.theme == null) {
        V = {};
        for (var be in B)
          V[be] = B[be];
        V.theme = ct.useContext(VR);
      }
      typeof B.className == "string" ? X = $2(F.registered, le, B.className) : B.className != null && (X = B.className + " ");
      var fe = jR(O.concat(le), F.registered, V);
      X += F.key + "-" + fe.name, y !== void 0 && (X += " " + y);
      var et = k && T === void 0 ? Iw(oe) : w, _ = {};
      for (var se in B)
        k && se === "as" || et(se) && (_[se] = B[se]);
      return _.className = X, ce && (_.ref = ce), /* @__PURE__ */ ct.createElement(ct.Fragment, null, /* @__PURE__ */ ct.createElement(rL, {
        cache: F,
        serialized: fe,
        isStringTag: typeof oe == "string"
      }), /* @__PURE__ */ ct.createElement(oe, _));
    });
    return I.displayName = S !== void 0 ? S : "Styled(" + (typeof m == "string" ? m : m.displayName || m.name || "Component") + ")", I.defaultProps = s.defaultProps, I.__emotion_real = I, I.__emotion_base = m, I.__emotion_styles = O, I.__emotion_forwardProp = T, Object.defineProperty(I, "toString", {
      value: function() {
        return y === void 0 && nL ? "NO_COMPONENT_SELECTOR" : "." + y;
      }
    }), I.withComponent = function(B, F) {
      return i(B, Pg({}, c, F, {
        shouldForwardProp: Yw(I, F, !0)
      })).apply(void 0, O);
    }, I;
  };
}, iL = [
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
], sC = aL.bind();
iL.forEach(function(i) {
  sC[i] = sC(i);
});
/**
 * @mui/styled-engine v6.1.1
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function oL(i, s) {
  const c = sC(i, s);
  return process.env.NODE_ENV !== "production" ? (...v) => {
    const m = typeof i == "string" ? `"${i}"` : "component";
    return v.length === 0 ? console.error([`MUI: Seems like you called \`styled(${m})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : v.some((S) => S === void 0) && console.error(`MUI: the styled(${m})(...args) API requires all its args to be defined.`), c(...v);
  } : c;
}
const lL = (i, s) => {
  Array.isArray(i.__emotion_styles) && (i.__emotion_styles = s(i.__emotion_styles));
};
function Xo(i) {
  if (typeof i != "object" || i === null)
    return !1;
  const s = Object.getPrototypeOf(i);
  return (s === null || s === Object.prototype || Object.getPrototypeOf(s) === null) && !(Symbol.toStringTag in i) && !(Symbol.iterator in i);
}
function BR(i) {
  if (!Xo(i))
    return i;
  const s = {};
  return Object.keys(i).forEach((c) => {
    s[c] = BR(i[c]);
  }), s;
}
function Aa(i, s, c = {
  clone: !0
}) {
  const v = c.clone ? {
    ...i
  } : i;
  return Xo(i) && Xo(s) && Object.keys(s).forEach((m) => {
    Xo(s[m]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(i, m) && Xo(i[m]) ? v[m] = Aa(i[m], s[m], c) : c.clone ? v[m] = Xo(s[m]) ? BR(s[m]) : s[m] : v[m] = s[m];
  }), v;
}
const uL = (i) => {
  const s = Object.keys(i).map((c) => ({
    key: c,
    val: i[c]
  })) || [];
  return s.sort((c, v) => c.val - v.val), s.reduce((c, v) => ({
    ...c,
    [v.key]: v.val
  }), {});
};
function sL(i) {
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
    unit: c = "px",
    step: v = 5,
    ...m
  } = i, S = uL(s), y = Object.keys(S);
  function T(z) {
    return `@media (min-width:${typeof s[z] == "number" ? s[z] : z}${c})`;
  }
  function w(z) {
    return `@media (max-width:${(typeof s[z] == "number" ? s[z] : z) - v / 100}${c})`;
  }
  function k(z, H) {
    const I = y.indexOf(H);
    return `@media (min-width:${typeof s[z] == "number" ? s[z] : z}${c}) and (max-width:${(I !== -1 && typeof s[y[I]] == "number" ? s[y[I]] : H) - v / 100}${c})`;
  }
  function A(z) {
    return y.indexOf(z) + 1 < y.length ? k(z, y[y.indexOf(z) + 1]) : T(z);
  }
  function O(z) {
    const H = y.indexOf(z);
    return H === 0 ? T(y[1]) : H === y.length - 1 ? w(y[H]) : k(z, y[y.indexOf(z) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: y,
    values: S,
    up: T,
    down: w,
    between: k,
    only: A,
    not: O,
    unit: c,
    ...m
  };
}
function cL(i, s) {
  if (!i.containerQueries)
    return s;
  const c = Object.keys(s).filter((v) => v.startsWith("@container")).sort((v, m) => {
    var y, T;
    const S = /min-width:\s*([0-9.]+)/;
    return +(((y = v.match(S)) == null ? void 0 : y[1]) || 0) - +(((T = m.match(S)) == null ? void 0 : T[1]) || 0);
  });
  return c.length ? c.reduce((v, m) => {
    const S = s[m];
    return delete v[m], v[m] = S, v;
  }, {
    ...s
  }) : s;
}
function fL(i, s) {
  return s === "@" || s.startsWith("@") && (i.some((c) => s.startsWith(`@${c}`)) || !!s.match(/^@\d/));
}
function dL(i, s) {
  const c = s.match(/^@([^/]+)?\/?(.+)?$/);
  if (!c) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${s})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : ls(18, `(${s})`));
    return null;
  }
  const [, v, m] = c, S = Number.isNaN(+v) ? v || 0 : +v;
  return i.containerQueries(m).up(S);
}
function pL(i) {
  const s = (S, y) => S.replace("@media", y ? `@container ${y}` : "@container");
  function c(S, y) {
    S.up = (...T) => s(i.breakpoints.up(...T), y), S.down = (...T) => s(i.breakpoints.down(...T), y), S.between = (...T) => s(i.breakpoints.between(...T), y), S.only = (...T) => s(i.breakpoints.only(...T), y), S.not = (...T) => {
      const w = s(i.breakpoints.not(...T), y);
      return w.includes("not all and") ? w.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : w;
    };
  }
  const v = {}, m = (S) => (c(v, S), v);
  return c(m), {
    ...i,
    containerQueries: m
  };
}
const vL = {
  borderRadius: 4
}, ss = process.env.NODE_ENV !== "production" ? D.oneOfType([D.number, D.string, D.object, D.array]) : {};
function Jv(i, s) {
  return s ? Aa(i, s, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : i;
}
const qg = {
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
}, Ww = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (i) => `@media (min-width:${qg[i]}px)`
}, hL = {
  containerQueries: (i) => ({
    up: (s) => {
      let c = typeof s == "number" ? s : qg[s] || s;
      return typeof c == "number" && (c = `${c}px`), i ? `@container ${i} (min-width:${c})` : `@container (min-width:${c})`;
    }
  })
};
function mo(i, s, c) {
  const v = i.theme || {};
  if (Array.isArray(s)) {
    const S = v.breakpoints || Ww;
    return s.reduce((y, T, w) => (y[S.up(S.keys[w])] = c(s[w]), y), {});
  }
  if (typeof s == "object") {
    const S = v.breakpoints || Ww;
    return Object.keys(s).reduce((y, T) => {
      if (fL(S.keys, T)) {
        const w = dL(v.containerQueries ? v : hL, T);
        w && (y[w] = c(s[T], T));
      } else if (Object.keys(S.values || qg).includes(T)) {
        const w = S.up(T);
        y[w] = c(s[T], T);
      } else {
        const w = T;
        y[w] = s[w];
      }
      return y;
    }, {});
  }
  return c(s);
}
function HR(i = {}) {
  var c;
  return ((c = i.keys) == null ? void 0 : c.reduce((v, m) => {
    const S = i.up(m);
    return v[S] = {}, v;
  }, {})) || {};
}
function IR(i, s) {
  return i.reduce((c, v) => {
    const m = c[v];
    return (!m || Object.keys(m).length === 0) && delete c[v], c;
  }, s);
}
function mL(i, ...s) {
  const c = HR(i), v = [c, ...s].reduce((m, S) => Aa(m, S), {});
  return IR(Object.keys(c), v);
}
function yL(i, s) {
  if (typeof i != "object")
    return {};
  const c = {}, v = Object.keys(s);
  return Array.isArray(i) ? v.forEach((m, S) => {
    S < i.length && (c[m] = !0);
  }) : v.forEach((m) => {
    i[m] != null && (c[m] = !0);
  }), c;
}
function Q1({
  values: i,
  breakpoints: s,
  base: c
}) {
  const v = c || yL(i, s), m = Object.keys(v);
  if (m.length === 0)
    return i;
  let S;
  return m.reduce((y, T, w) => (Array.isArray(i) ? (y[T] = i[w] != null ? i[w] : i[S], S = w) : typeof i == "object" ? (y[T] = i[T] != null ? i[T] : i[S], S = T) : y[T] = i, y), {});
}
function Kr(i) {
  if (typeof i != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : ls(7));
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function Kg(i, s, c = !0) {
  if (!s || typeof s != "string")
    return null;
  if (i && i.vars && c) {
    const v = `vars.${s}`.split(".").reduce((m, S) => m && m[S] ? m[S] : null, i);
    if (v != null)
      return v;
  }
  return s.split(".").reduce((v, m) => v && v[m] != null ? v[m] : null, i);
}
function $g(i, s, c, v = c) {
  let m;
  return typeof i == "function" ? m = i(c) : Array.isArray(i) ? m = i[c] || v : m = Kg(i, c) || v, s && (m = s(m, v, i)), m;
}
function lr(i) {
  const {
    prop: s,
    cssProperty: c = i.prop,
    themeKey: v,
    transform: m
  } = i, S = (y) => {
    if (y[s] == null)
      return null;
    const T = y[s], w = y.theme, k = Kg(w, v) || {};
    return mo(y, T, (O) => {
      let z = $g(k, m, O);
      return O === z && typeof O == "string" && (z = $g(k, m, `${s}${O === "default" ? "" : Kr(O)}`, O)), c === !1 ? z : {
        [c]: z
      };
    });
  };
  return S.propTypes = process.env.NODE_ENV !== "production" ? {
    [s]: ss
  } : {}, S.filterProps = [s], S;
}
function gL(i) {
  const s = {};
  return (c) => (s[c] === void 0 && (s[c] = i(c)), s[c]);
}
const SL = {
  m: "margin",
  p: "padding"
}, bL = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Gw = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, CL = gL((i) => {
  if (i.length > 2)
    if (Gw[i])
      i = Gw[i];
    else
      return [i];
  const [s, c] = i.split(""), v = SL[s], m = bL[c] || "";
  return Array.isArray(m) ? m.map((S) => v + S) : [v + m];
}), Xg = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Zg = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], EL = [...Xg, ...Zg];
function ch(i, s, c, v) {
  const m = Kg(i, s, !0) ?? c;
  return typeof m == "number" || typeof m == "string" ? (S) => typeof S == "string" ? S : (process.env.NODE_ENV !== "production" && typeof S != "number" && console.error(`MUI: Expected ${v} argument to be a number or a string, got ${S}.`), typeof m == "string" ? `calc(${S} * ${m})` : m * S) : Array.isArray(m) ? (S) => {
    if (typeof S == "string")
      return S;
    const y = Math.abs(S);
    process.env.NODE_ENV !== "production" && (Number.isInteger(y) ? y > m.length - 1 && console.error([`MUI: The value provided (${y}) overflows.`, `The supported values are: ${JSON.stringify(m)}.`, `${y} > ${m.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${s}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${s}\` as a number.`].join(`
`)));
    const T = m[y];
    return S >= 0 ? T : typeof T == "number" ? -T : `-${T}`;
  } : typeof m == "function" ? m : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${s}\` value (${m}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Jg(i) {
  return ch(i, "spacing", 8, "spacing");
}
function Tc(i, s) {
  return typeof s == "string" || s == null ? s : i(s);
}
function TL(i, s) {
  return (c) => i.reduce((v, m) => (v[m] = Tc(s, c), v), {});
}
function xL(i, s, c, v) {
  if (!s.includes(c))
    return null;
  const m = CL(c), S = TL(m, v), y = i[c];
  return mo(i, y, S);
}
function YR(i, s) {
  const c = Jg(i.theme);
  return Object.keys(i).map((v) => xL(i, s, v, c)).reduce(Jv, {});
}
function Kn(i) {
  return YR(i, Xg);
}
Kn.propTypes = process.env.NODE_ENV !== "production" ? Xg.reduce((i, s) => (i[s] = ss, i), {}) : {};
Kn.filterProps = Xg;
function Xn(i) {
  return YR(i, Zg);
}
Xn.propTypes = process.env.NODE_ENV !== "production" ? Zg.reduce((i, s) => (i[s] = ss, i), {}) : {};
Xn.filterProps = Zg;
process.env.NODE_ENV !== "production" && EL.reduce((i, s) => (i[s] = ss, i), {});
function WR(i = 8, s = Jg({
  spacing: i
})) {
  if (i.mui)
    return i;
  const c = (...v) => (process.env.NODE_ENV !== "production" && (v.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${v.length}`)), (v.length === 0 ? [1] : v).map((S) => {
    const y = s(S);
    return typeof y == "number" ? `${y}px` : y;
  }).join(" "));
  return c.mui = !0, c;
}
function e0(...i) {
  const s = i.reduce((v, m) => (m.filterProps.forEach((S) => {
    v[S] = m;
  }), v), {}), c = (v) => Object.keys(v).reduce((m, S) => s[S] ? Jv(m, s[S](v)) : m, {});
  return c.propTypes = process.env.NODE_ENV !== "production" ? i.reduce((v, m) => Object.assign(v, m.propTypes), {}) : {}, c.filterProps = i.reduce((v, m) => v.concat(m.filterProps), []), c;
}
function Pi(i) {
  return typeof i != "number" ? i : `${i}px solid`;
}
function ji(i, s) {
  return lr({
    prop: i,
    themeKey: "borders",
    transform: s
  });
}
const wL = ji("border", Pi), RL = ji("borderTop", Pi), _L = ji("borderRight", Pi), kL = ji("borderBottom", Pi), OL = ji("borderLeft", Pi), DL = ji("borderColor"), ML = ji("borderTopColor"), AL = ji("borderRightColor"), NL = ji("borderBottomColor"), LL = ji("borderLeftColor"), zL = ji("outline", Pi), UL = ji("outlineColor"), t0 = (i) => {
  if (i.borderRadius !== void 0 && i.borderRadius !== null) {
    const s = ch(i.theme, "shape.borderRadius", 4, "borderRadius"), c = (v) => ({
      borderRadius: Tc(s, v)
    });
    return mo(i, i.borderRadius, c);
  }
  return null;
};
t0.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ss
} : {};
t0.filterProps = ["borderRadius"];
e0(wL, RL, _L, kL, OL, DL, ML, AL, NL, LL, t0, zL, UL);
const n0 = (i) => {
  if (i.gap !== void 0 && i.gap !== null) {
    const s = ch(i.theme, "spacing", 8, "gap"), c = (v) => ({
      gap: Tc(s, v)
    });
    return mo(i, i.gap, c);
  }
  return null;
};
n0.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ss
} : {};
n0.filterProps = ["gap"];
const r0 = (i) => {
  if (i.columnGap !== void 0 && i.columnGap !== null) {
    const s = ch(i.theme, "spacing", 8, "columnGap"), c = (v) => ({
      columnGap: Tc(s, v)
    });
    return mo(i, i.columnGap, c);
  }
  return null;
};
r0.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ss
} : {};
r0.filterProps = ["columnGap"];
const a0 = (i) => {
  if (i.rowGap !== void 0 && i.rowGap !== null) {
    const s = ch(i.theme, "spacing", 8, "rowGap"), c = (v) => ({
      rowGap: Tc(s, v)
    });
    return mo(i, i.rowGap, c);
  }
  return null;
};
a0.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ss
} : {};
a0.filterProps = ["rowGap"];
const FL = lr({
  prop: "gridColumn"
}), PL = lr({
  prop: "gridRow"
}), jL = lr({
  prop: "gridAutoFlow"
}), $L = lr({
  prop: "gridAutoColumns"
}), VL = lr({
  prop: "gridAutoRows"
}), BL = lr({
  prop: "gridTemplateColumns"
}), HL = lr({
  prop: "gridTemplateRows"
}), IL = lr({
  prop: "gridTemplateAreas"
}), YL = lr({
  prop: "gridArea"
});
e0(n0, r0, a0, FL, PL, jL, $L, VL, BL, HL, IL, YL);
function Md(i, s) {
  return s === "grey" ? s : i;
}
const WL = lr({
  prop: "color",
  themeKey: "palette",
  transform: Md
}), GL = lr({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Md
}), QL = lr({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Md
});
e0(WL, GL, QL);
function gi(i) {
  return i <= 1 && i !== 0 ? `${i * 100}%` : i;
}
const qL = lr({
  prop: "width",
  transform: gi
}), wC = (i) => {
  if (i.maxWidth !== void 0 && i.maxWidth !== null) {
    const s = (c) => {
      var m, S, y, T, w;
      const v = ((y = (S = (m = i.theme) == null ? void 0 : m.breakpoints) == null ? void 0 : S.values) == null ? void 0 : y[c]) || qg[c];
      return v ? ((w = (T = i.theme) == null ? void 0 : T.breakpoints) == null ? void 0 : w.unit) !== "px" ? {
        maxWidth: `${v}${i.theme.breakpoints.unit}`
      } : {
        maxWidth: v
      } : {
        maxWidth: gi(c)
      };
    };
    return mo(i, i.maxWidth, s);
  }
  return null;
};
wC.filterProps = ["maxWidth"];
const KL = lr({
  prop: "minWidth",
  transform: gi
}), XL = lr({
  prop: "height",
  transform: gi
}), ZL = lr({
  prop: "maxHeight",
  transform: gi
}), JL = lr({
  prop: "minHeight",
  transform: gi
});
lr({
  prop: "size",
  cssProperty: "width",
  transform: gi
});
lr({
  prop: "size",
  cssProperty: "height",
  transform: gi
});
const ez = lr({
  prop: "boxSizing"
});
e0(qL, wC, KL, XL, ZL, JL, ez);
const fh = {
  // borders
  border: {
    themeKey: "borders",
    transform: Pi
  },
  borderTop: {
    themeKey: "borders",
    transform: Pi
  },
  borderRight: {
    themeKey: "borders",
    transform: Pi
  },
  borderBottom: {
    themeKey: "borders",
    transform: Pi
  },
  borderLeft: {
    themeKey: "borders",
    transform: Pi
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
    transform: Pi
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: t0
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Md
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Md
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Md
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
    style: n0
  },
  rowGap: {
    style: a0
  },
  columnGap: {
    style: r0
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
    transform: gi
  },
  maxWidth: {
    style: wC
  },
  minWidth: {
    transform: gi
  },
  height: {
    transform: gi
  },
  maxHeight: {
    transform: gi
  },
  minHeight: {
    transform: gi
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
function tz(...i) {
  const s = i.reduce((v, m) => v.concat(Object.keys(m)), []), c = new Set(s);
  return i.every((v) => c.size === Object.keys(v).length);
}
function nz(i, s) {
  return typeof i == "function" ? i(s) : i;
}
function rz() {
  function i(c, v, m, S) {
    const y = {
      [c]: v,
      theme: m
    }, T = S[c];
    if (!T)
      return {
        [c]: v
      };
    const {
      cssProperty: w = c,
      themeKey: k,
      transform: A,
      style: O
    } = T;
    if (v == null)
      return null;
    if (k === "typography" && v === "inherit")
      return {
        [c]: v
      };
    const z = Kg(m, k) || {};
    return O ? O(y) : mo(y, v, (I) => {
      let B = $g(z, A, I);
      return I === B && typeof I == "string" && (B = $g(z, A, `${c}${I === "default" ? "" : Kr(I)}`, I)), w === !1 ? B : {
        [w]: B
      };
    });
  }
  function s(c) {
    const {
      sx: v,
      theme: m = {}
    } = c || {};
    if (!v)
      return null;
    const S = m.unstable_sxConfig ?? fh;
    function y(T) {
      let w = T;
      if (typeof T == "function")
        w = T(m);
      else if (typeof T != "object")
        return T;
      if (!w)
        return null;
      const k = HR(m.breakpoints), A = Object.keys(k);
      let O = k;
      return Object.keys(w).forEach((z) => {
        const H = nz(w[z], m);
        if (H != null)
          if (typeof H == "object")
            if (S[z])
              O = Jv(O, i(z, H, m, S));
            else {
              const I = mo({
                theme: m
              }, H, (B) => ({
                [z]: B
              }));
              tz(I, H) ? O[z] = s({
                sx: H,
                theme: m
              }) : O = Jv(O, I);
            }
          else
            O = Jv(O, i(z, H, m, S));
      }), cL(m, IR(A, O));
    }
    return Array.isArray(v) ? v.map(y) : y(v);
  }
  return s;
}
const dh = rz();
dh.filterProps = ["sx"];
function az(i, s) {
  var v;
  const c = this;
  if (c.vars) {
    if (!((v = c.colorSchemes) != null && v[i]) || typeof c.getColorSchemeSelector != "function")
      return {};
    let m = c.getColorSchemeSelector(i);
    return m === "&" ? s : ((m.includes("data-") || m.includes(".")) && (m = `*:where(${m.replace(/\s*&$/, "")}) &`), {
      [m]: s
    });
  }
  return c.palette.mode === i ? s : {};
}
function i0(i = {}, ...s) {
  const {
    breakpoints: c = {},
    palette: v = {},
    spacing: m,
    shape: S = {},
    ...y
  } = i, T = sL(c), w = WR(m);
  let k = Aa({
    breakpoints: T,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...v
    },
    spacing: w,
    shape: {
      ...vL,
      ...S
    }
  }, y);
  return k = pL(k), k.applyStyles = az, k = s.reduce((A, O) => Aa(A, O), k), k.unstable_sxConfig = {
    ...fh,
    ...y == null ? void 0 : y.unstable_sxConfig
  }, k.unstable_sx = function(O) {
    return dh({
      sx: O,
      theme: this
    });
  }, k;
}
function iz(i) {
  return Object.keys(i).length === 0;
}
function oz(i = null) {
  const s = ct.useContext(VR);
  return !s || iz(s) ? i : s;
}
const lz = i0();
function GR(i = lz) {
  return oz(i);
}
const uz = (i) => {
  var v;
  const s = {
    systemProps: {},
    otherProps: {}
  }, c = ((v = i == null ? void 0 : i.theme) == null ? void 0 : v.unstable_sxConfig) ?? fh;
  return Object.keys(i).forEach((m) => {
    c[m] ? s.systemProps[m] = i[m] : s.otherProps[m] = i[m];
  }), s;
};
function QR(i) {
  const {
    sx: s,
    ...c
  } = i, {
    systemProps: v,
    otherProps: m
  } = uz(c);
  let S;
  return Array.isArray(s) ? S = [v, ...s] : typeof s == "function" ? S = (...y) => {
    const T = s(...y);
    return Xo(T) ? {
      ...v,
      ...T
    } : v;
  } : S = {
    ...v,
    ...s
  }, {
    ...m,
    sx: S
  };
}
const Qw = (i) => i, sz = () => {
  let i = Qw;
  return {
    configure(s) {
      i = s;
    },
    generate(s) {
      return i(s);
    },
    reset() {
      i = Qw;
    }
  };
}, cz = sz();
function qR(i) {
  var s, c, v = "";
  if (typeof i == "string" || typeof i == "number") v += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var m = i.length;
    for (s = 0; s < m; s++) i[s] && (c = qR(i[s])) && (v && (v += " "), v += c);
  } else for (c in i) i[c] && (v && (v += " "), v += c);
  return v;
}
function or() {
  for (var i, s, c = 0, v = "", m = arguments.length; c < m; c++) (i = arguments[c]) && (s = qR(i)) && (v && (v += " "), v += s);
  return v;
}
const fz = {
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
function $i(i, s, c = "Mui") {
  const v = fz[s];
  return v ? `${c}-${v}` : `${cz.generate(i)}-${s}`;
}
function el(i, s, c = "Mui") {
  const v = {};
  return s.forEach((m) => {
    v[m] = $i(i, m, c);
  }), v;
}
var cC = { exports: {} }, un = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qw;
function dz() {
  if (qw) return un;
  qw = 1;
  var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), y = Symbol.for("react.context"), T = Symbol.for("react.server_context"), w = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), I;
  I = Symbol.for("react.module.reference");
  function B(F) {
    if (typeof F == "object" && F !== null) {
      var ce = F.$$typeof;
      switch (ce) {
        case i:
          switch (F = F.type, F) {
            case c:
            case m:
            case v:
            case k:
            case A:
              return F;
            default:
              switch (F = F && F.$$typeof, F) {
                case T:
                case y:
                case w:
                case z:
                case O:
                case S:
                  return F;
                default:
                  return ce;
              }
          }
        case s:
          return ce;
      }
    }
  }
  return un.ContextConsumer = y, un.ContextProvider = S, un.Element = i, un.ForwardRef = w, un.Fragment = c, un.Lazy = z, un.Memo = O, un.Portal = s, un.Profiler = m, un.StrictMode = v, un.Suspense = k, un.SuspenseList = A, un.isAsyncMode = function() {
    return !1;
  }, un.isConcurrentMode = function() {
    return !1;
  }, un.isContextConsumer = function(F) {
    return B(F) === y;
  }, un.isContextProvider = function(F) {
    return B(F) === S;
  }, un.isElement = function(F) {
    return typeof F == "object" && F !== null && F.$$typeof === i;
  }, un.isForwardRef = function(F) {
    return B(F) === w;
  }, un.isFragment = function(F) {
    return B(F) === c;
  }, un.isLazy = function(F) {
    return B(F) === z;
  }, un.isMemo = function(F) {
    return B(F) === O;
  }, un.isPortal = function(F) {
    return B(F) === s;
  }, un.isProfiler = function(F) {
    return B(F) === m;
  }, un.isStrictMode = function(F) {
    return B(F) === v;
  }, un.isSuspense = function(F) {
    return B(F) === k;
  }, un.isSuspenseList = function(F) {
    return B(F) === A;
  }, un.isValidElementType = function(F) {
    return typeof F == "string" || typeof F == "function" || F === c || F === m || F === v || F === k || F === A || F === H || typeof F == "object" && F !== null && (F.$$typeof === z || F.$$typeof === O || F.$$typeof === S || F.$$typeof === y || F.$$typeof === w || F.$$typeof === I || F.getModuleId !== void 0);
  }, un.typeOf = B, un;
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
var Kw;
function pz() {
  return Kw || (Kw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), v = Symbol.for("react.strict_mode"), m = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), y = Symbol.for("react.context"), T = Symbol.for("react.server_context"), w = Symbol.for("react.forward_ref"), k = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), I = !1, B = !1, F = !1, ce = !1, oe = !1, X;
    X = Symbol.for("react.module.reference");
    function le(Le) {
      return !!(typeof Le == "string" || typeof Le == "function" || Le === c || Le === m || oe || Le === v || Le === k || Le === A || ce || Le === H || I || B || F || typeof Le == "object" && Le !== null && (Le.$$typeof === z || Le.$$typeof === O || Le.$$typeof === S || Le.$$typeof === y || Le.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      Le.$$typeof === X || Le.getModuleId !== void 0));
    }
    function V(Le) {
      if (typeof Le == "object" && Le !== null) {
        var Xt = Le.$$typeof;
        switch (Xt) {
          case i:
            var mn = Le.type;
            switch (mn) {
              case c:
              case m:
              case v:
              case k:
              case A:
                return mn;
              default:
                var Nn = mn && mn.$$typeof;
                switch (Nn) {
                  case T:
                  case y:
                  case w:
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
    var be = y, fe = S, et = i, _ = w, se = c, ke = z, ve = O, pe = s, Re = m, lt = v, Qe = k, Et = A, ge = !1, ze = !1;
    function Y(Le) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function de(Le) {
      return ze || (ze = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Ne(Le) {
      return V(Le) === y;
    }
    function Xe(Le) {
      return V(Le) === S;
    }
    function Pe(Le) {
      return typeof Le == "object" && Le !== null && Le.$$typeof === i;
    }
    function yt(Le) {
      return V(Le) === w;
    }
    function Ie(Le) {
      return V(Le) === c;
    }
    function ut(Le) {
      return V(Le) === z;
    }
    function rt(Le) {
      return V(Le) === O;
    }
    function pt(Le) {
      return V(Le) === s;
    }
    function gt(Le) {
      return V(Le) === m;
    }
    function Ut(Le) {
      return V(Le) === v;
    }
    function we(Le) {
      return V(Le) === k;
    }
    function Ft(Le) {
      return V(Le) === A;
    }
    sn.ContextConsumer = be, sn.ContextProvider = fe, sn.Element = et, sn.ForwardRef = _, sn.Fragment = se, sn.Lazy = ke, sn.Memo = ve, sn.Portal = pe, sn.Profiler = Re, sn.StrictMode = lt, sn.Suspense = Qe, sn.SuspenseList = Et, sn.isAsyncMode = Y, sn.isConcurrentMode = de, sn.isContextConsumer = Ne, sn.isContextProvider = Xe, sn.isElement = Pe, sn.isForwardRef = yt, sn.isFragment = Ie, sn.isLazy = ut, sn.isMemo = rt, sn.isPortal = pt, sn.isProfiler = gt, sn.isStrictMode = Ut, sn.isSuspense = we, sn.isSuspenseList = Ft, sn.isValidElementType = le, sn.typeOf = V;
  }()), sn;
}
process.env.NODE_ENV === "production" ? cC.exports = dz() : cC.exports = pz();
var Xw = cC.exports;
function KR(i, s = "") {
  return i.displayName || i.name || s;
}
function Zw(i, s, c) {
  const v = KR(s);
  return i.displayName || (v !== "" ? `${c}(${v})` : c);
}
function vz(i) {
  if (i != null) {
    if (typeof i == "string")
      return i;
    if (typeof i == "function")
      return KR(i, "Component");
    if (typeof i == "object")
      switch (i.$$typeof) {
        case Xw.ForwardRef:
          return Zw(i, i.render, "ForwardRef");
        case Xw.Memo:
          return Zw(i, i.type, "memo");
        default:
          return;
      }
  }
}
const hz = i0();
function q1(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
function fC(i, s, c) {
  return yz(s) ? c : s[i] || s;
}
const wg = Symbol("mui.processed_props");
function Rg(i, s, c) {
  if (wg in i)
    return i[wg];
  const v = {
    ...i,
    theme: fC(s, i.theme, c)
  };
  return i[wg] = v, v[wg] = v, v;
}
function mz(i) {
  return i ? (s, c) => c[i] : null;
}
function Ug(i, s) {
  var v;
  const c = typeof i == "function" ? i(s) : i;
  if (Array.isArray(c))
    return c.flatMap((m) => Ug(m, s));
  if (Array.isArray(c == null ? void 0 : c.variants)) {
    const {
      variants: m,
      ...S
    } = c;
    let y = S, T;
    e: for (let w = 0; w < m.length; w += 1) {
      const k = m[w];
      if (typeof k.props == "function") {
        if (T ?? (T = {
          ...s,
          ...s.ownerState,
          ownerState: s.ownerState
        }), !k.props(T))
          continue;
      } else
        for (const A in k.props)
          if (s[A] !== k.props[A] && ((v = s.ownerState) == null ? void 0 : v[A]) !== k.props[A])
            continue e;
      Array.isArray(y) || (y = [y]), typeof k.style == "function" ? (T ?? (T = {
        ...s,
        ...s.ownerState,
        ownerState: s.ownerState
      }), y.push(k.style(T))) : y.push(k.style);
    }
    return y;
  }
  return c;
}
function XR(i = {}) {
  const {
    themeId: s,
    defaultTheme: c = hz,
    rootShouldForwardProp: v = q1,
    slotShouldForwardProp: m = q1
  } = i, S = (T) => dh(Rg(T, s, c));
  return S.__mui_systemSx = !0, (T, w = {}) => {
    lL(T, (be) => be.filter((fe) => !(fe != null && fe.__mui_systemSx)));
    const {
      name: k,
      slot: A,
      skipVariantsResolver: O,
      skipSx: z,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: H = mz(Jw(A)),
      ...I
    } = w, B = O !== void 0 ? O : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      A && A !== "Root" && A !== "root" || !1
    ), F = z || !1;
    let ce;
    process.env.NODE_ENV !== "production" && k && (ce = `${k}-${Jw(A || "Root")}`);
    let oe = q1;
    A === "Root" || A === "root" ? oe = v : A ? oe = m : gz(T) && (oe = void 0);
    const X = oL(T, {
      shouldForwardProp: oe,
      label: ce,
      ...I
    }), le = (be) => typeof be == "function" && be.__emotion_real !== be || Xo(be) ? (fe) => Ug(be, Rg(fe, s, c)) : be, V = (be, ...fe) => {
      let et = le(be);
      const _ = fe ? fe.map(le) : [];
      k && H && _.push((ve) => {
        const pe = fC(s, ve.theme, c);
        if (!pe.components || !pe.components[k] || !pe.components[k].styleOverrides)
          return null;
        const Re = pe.components[k].styleOverrides, lt = {}, Qe = Rg(ve, s, c);
        for (const Et in Re)
          lt[Et] = Ug(Re[Et], Qe);
        return H(ve, lt);
      }), k && !B && _.push((ve) => {
        var lt, Qe;
        const pe = fC(s, ve.theme, c), Re = (Qe = (lt = pe == null ? void 0 : pe.components) == null ? void 0 : lt[k]) == null ? void 0 : Qe.variants;
        return Re ? Ug({
          variants: Re
        }, Rg(ve, s, c)) : null;
      }), F || _.push(S);
      const se = _.length - fe.length;
      if (Array.isArray(be) && se > 0) {
        const ve = new Array(se).fill("");
        et = [...be, ...ve], et.raw = [...be.raw, ...ve];
      }
      const ke = X(et, ..._);
      if (process.env.NODE_ENV !== "production") {
        let ve;
        k && (ve = `${k}${Kr(A || "")}`), ve === void 0 && (ve = `Styled(${vz(T)})`), ke.displayName = ve;
      }
      return T.muiName && (ke.muiName = T.muiName), ke;
    };
    return X.withConfig && (V.withConfig = X.withConfig), V;
  };
}
function yz(i) {
  for (const s in i)
    return !1;
  return !0;
}
function gz(i) {
  return typeof i == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  i.charCodeAt(0) > 96;
}
function Jw(i) {
  return i && i.charAt(0).toLowerCase() + i.slice(1);
}
const Sz = XR();
function oh(i, s) {
  const c = {
    ...s
  };
  for (const v in i)
    if (Object.prototype.hasOwnProperty.call(i, v)) {
      const m = v;
      if (m === "components" || m === "slots")
        c[m] = {
          ...i[m],
          ...c[m]
        };
      else if (m === "componentsProps" || m === "slotProps") {
        const S = i[m], y = s[m];
        if (!y)
          c[m] = S || {};
        else if (!S)
          c[m] = y;
        else {
          c[m] = {
            ...y
          };
          for (const T in S)
            if (Object.prototype.hasOwnProperty.call(S, T)) {
              const w = T;
              c[m][w] = oh(S[w], y[w]);
            }
        }
      } else c[m] === void 0 && (c[m] = i[m]);
    }
  return c;
}
function bz(i) {
  const {
    theme: s,
    name: c,
    props: v
  } = i;
  return !s || !s.components || !s.components[c] || !s.components[c].defaultProps ? v : oh(s.components[c].defaultProps, v);
}
function ZR({
  props: i,
  name: s,
  defaultTheme: c,
  themeId: v
}) {
  let m = GR(c);
  return v && (m = m[v] || m), bz({
    theme: m,
    name: s,
    props: i
  });
}
const Cz = typeof window < "u" ? ct.useLayoutEffect : ct.useEffect;
function Ez(i, s = Number.MIN_SAFE_INTEGER, c = Number.MAX_SAFE_INTEGER) {
  return Math.max(s, Math.min(i, c));
}
function RC(i, s = 0, c = 1) {
  return process.env.NODE_ENV !== "production" && (i < s || i > c) && console.error(`MUI: The value provided ${i} is out of range [${s}, ${c}].`), Ez(i, s, c);
}
function Tz(i) {
  i = i.slice(1);
  const s = new RegExp(`.{1,${i.length >= 6 ? 2 : 1}}`, "g");
  let c = i.match(s);
  return c && c[0].length === 1 && (c = c.map((v) => v + v)), c ? `rgb${c.length === 4 ? "a" : ""}(${c.map((v, m) => m < 3 ? parseInt(v, 16) : Math.round(parseInt(v, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function us(i) {
  if (i.type)
    return i;
  if (i.charAt(0) === "#")
    return us(Tz(i));
  const s = i.indexOf("("), c = i.substring(0, s);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(c))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${i}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : ls(9, i));
  let v = i.substring(s + 1, i.length - 1), m;
  if (c === "color") {
    if (v = v.split(" "), m = v.shift(), v.length === 4 && v[3].charAt(0) === "/" && (v[3] = v[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(m))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${m}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : ls(10, m));
  } else
    v = v.split(",");
  return v = v.map((S) => parseFloat(S)), {
    type: c,
    values: v,
    colorSpace: m
  };
}
const xz = (i) => {
  const s = us(i);
  return s.values.slice(0, 3).map((c, v) => s.type.includes("hsl") && v !== 0 ? `${c}%` : c).join(" ");
}, Xv = (i, s) => {
  try {
    return xz(i);
  } catch {
    return s && process.env.NODE_ENV !== "production" && console.warn(s), i;
  }
};
function o0(i) {
  const {
    type: s,
    colorSpace: c
  } = i;
  let {
    values: v
  } = i;
  return s.includes("rgb") ? v = v.map((m, S) => S < 3 ? parseInt(m, 10) : m) : s.includes("hsl") && (v[1] = `${v[1]}%`, v[2] = `${v[2]}%`), s.includes("color") ? v = `${c} ${v.join(" ")}` : v = `${v.join(", ")}`, `${s}(${v})`;
}
function JR(i) {
  i = us(i);
  const {
    values: s
  } = i, c = s[0], v = s[1] / 100, m = s[2] / 100, S = v * Math.min(m, 1 - m), y = (k, A = (k + c / 30) % 12) => m - S * Math.max(Math.min(A - 3, 9 - A, 1), -1);
  let T = "rgb";
  const w = [Math.round(y(0) * 255), Math.round(y(8) * 255), Math.round(y(4) * 255)];
  return i.type === "hsla" && (T += "a", w.push(s[3])), o0({
    type: T,
    values: w
  });
}
function dC(i) {
  i = us(i);
  let s = i.type === "hsl" || i.type === "hsla" ? us(JR(i)).values : i.values;
  return s = s.map((c) => (i.type !== "color" && (c /= 255), c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)), Number((0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]).toFixed(3));
}
function eR(i, s) {
  const c = dC(i), v = dC(s);
  return (Math.max(c, v) + 0.05) / (Math.min(c, v) + 0.05);
}
function is(i, s) {
  return i = us(i), s = RC(s), (i.type === "rgb" || i.type === "hsl") && (i.type += "a"), i.type === "color" ? i.values[3] = `/${s}` : i.values[3] = s, o0(i);
}
function _g(i, s, c) {
  try {
    return is(i, s);
  } catch {
    return i;
  }
}
function _C(i, s) {
  if (i = us(i), s = RC(s), i.type.includes("hsl"))
    i.values[2] *= 1 - s;
  else if (i.type.includes("rgb") || i.type.includes("color"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] *= 1 - s;
  return o0(i);
}
function En(i, s, c) {
  try {
    return _C(i, s);
  } catch {
    return i;
  }
}
function kC(i, s) {
  if (i = us(i), s = RC(s), i.type.includes("hsl"))
    i.values[2] += (100 - i.values[2]) * s;
  else if (i.type.includes("rgb"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] += (255 - i.values[c]) * s;
  else if (i.type.includes("color"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] += (1 - i.values[c]) * s;
  return o0(i);
}
function Tn(i, s, c) {
  try {
    return kC(i, s);
  } catch {
    return i;
  }
}
function wz(i, s = 0.15) {
  return dC(i) > 0.5 ? _C(i, s) : kC(i, s);
}
function kg(i, s, c) {
  try {
    return wz(i, s);
  } catch {
    return i;
  }
}
function l0(i, s) {
  return process.env.NODE_ENV === "production" ? () => null : function(...v) {
    return i(...v) || s(...v);
  };
}
function Rz(i) {
  const {
    prototype: s = {}
  } = i;
  return !!s.isReactComponent;
}
function _z(i, s, c, v, m) {
  const S = i[s], y = m || s;
  if (S == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let T;
  return typeof S == "function" && !Rz(S) && (T = "Did you accidentally provide a plain function component instead?"), T !== void 0 ? new Error(`Invalid ${v} \`${y}\` supplied to \`${c}\`. Expected an element type that can hold a ref. ${T} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const kz = l0(D.elementType, _z), Oz = D.oneOfType([D.func, D.object]);
function Dz(i, s) {
  typeof i == "function" ? i(s) : i && (i.current = s);
}
function Og(i) {
  const s = ct.useRef(i);
  return Cz(() => {
    s.current = i;
  }), ct.useRef((...c) => (
    // @ts-expect-error hide `this`
    (0, s.current)(...c)
  )).current;
}
function tR(...i) {
  return ct.useMemo(() => i.every((s) => s == null) ? null : (s) => {
    i.forEach((c) => {
      Dz(c, s);
    });
  }, i);
}
const nR = {};
function e_(i, s) {
  const c = ct.useRef(nR);
  return c.current === nR && (c.current = i(s)), c;
}
const Mz = [];
function Az(i) {
  ct.useEffect(i, Mz);
}
class OC {
  constructor() {
    Yv(this, "currentId", null);
    Yv(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    Yv(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new OC();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(s, c) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, c();
    }, s);
  }
}
function Nz() {
  const i = e_(OC.create).current;
  return Az(i.disposeEffect), i;
}
function rR(i) {
  try {
    return i.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !/jsdom/.test(window.navigator.userAgent) && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function Lz(i) {
  const s = typeof i;
  switch (s) {
    case "number":
      return Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? i !== Math.floor(i) ? "float" : "number" : "Infinity";
    case "object":
      return i === null ? "null" : i.constructor.name;
    default:
      return s;
  }
}
function t_(i, s, c, v) {
  const m = i[s];
  if (m == null || !Number.isInteger(m)) {
    const S = Lz(m);
    return new RangeError(`Invalid ${v} \`${s}\` of type \`${S}\` supplied to \`${c}\`, expected \`integer\`.`);
  }
  return null;
}
function n_(i, s, ...c) {
  return i[s] === void 0 ? null : t_(i, s, ...c);
}
function pC() {
  return null;
}
n_.isRequired = t_;
pC.isRequired = pC;
const zz = process.env.NODE_ENV === "production" ? pC : n_;
function tl(i, s, c = void 0) {
  const v = {};
  for (const m in i) {
    const S = i[m];
    let y = "", T = !0;
    for (let w = 0; w < S.length; w += 1) {
      const k = S[w];
      k && (y += (T === !0 ? "" : " ") + s(k), T = !1, c && c[k] && (y += " " + c[k]));
    }
    v[m] = y;
  }
  return v;
}
const Uz = /* @__PURE__ */ ct.createContext(void 0);
process.env.NODE_ENV !== "production" && (D.node, D.object);
function Fz(i) {
  const {
    theme: s,
    name: c,
    props: v
  } = i;
  if (!s || !s.components || !s.components[c])
    return v;
  const m = s.components[c];
  return m.defaultProps ? oh(m.defaultProps, v) : !m.styleOverrides && !m.variants ? oh(m, v) : v;
}
function Pz({
  props: i,
  name: s
}) {
  const c = ct.useContext(Uz);
  return Fz({
    props: i,
    name: s,
    theme: {
      components: c
    }
  });
}
function jz(i = "") {
  function s(...v) {
    if (!v.length)
      return "";
    const m = v[0];
    return typeof m == "string" && !m.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${i ? `${i}-` : ""}${m}${s(...v.slice(1))})` : `, ${m}`;
  }
  return (v, ...m) => `var(--${i ? `${i}-` : ""}${v}${s(...m)})`;
}
const aR = (i, s, c, v = []) => {
  let m = i;
  s.forEach((S, y) => {
    y === s.length - 1 ? Array.isArray(m) ? m[Number(S)] = c : m && typeof m == "object" && (m[S] = c) : m && typeof m == "object" && (m[S] || (m[S] = v.includes(S) ? [] : {}), m = m[S]);
  });
}, $z = (i, s, c) => {
  function v(m, S = [], y = []) {
    Object.entries(m).forEach(([T, w]) => {
      (!c || c && !c([...S, T])) && w != null && (typeof w == "object" && Object.keys(w).length > 0 ? v(w, [...S, T], Array.isArray(w) ? [...y, T] : y) : s([...S, T], w, y));
    });
  }
  v(i);
}, Vz = (i, s) => typeof s == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((v) => i.includes(v)) || i[i.length - 1].toLowerCase().includes("opacity") ? s : `${s}px` : s;
function K1(i, s) {
  const {
    prefix: c,
    shouldSkipGeneratingVar: v
  } = s || {}, m = {}, S = {}, y = {};
  return $z(
    i,
    (T, w, k) => {
      if ((typeof w == "string" || typeof w == "number") && (!v || !v(T, w))) {
        const A = `--${c ? `${c}-` : ""}${T.join("-")}`, O = Vz(T, w);
        Object.assign(m, {
          [A]: O
        }), aR(S, T, `var(${A})`, k), aR(y, T, `var(${A}, ${O})`, k);
      }
    },
    (T) => T[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: m,
    vars: S,
    varsWithDefaults: y
  };
}
function Bz(i, s = {}) {
  const {
    getSelector: c = F,
    disableCssColorScheme: v,
    colorSchemeSelector: m
  } = s, {
    colorSchemes: S = {},
    components: y,
    defaultColorScheme: T = "light",
    ...w
  } = i, {
    vars: k,
    css: A,
    varsWithDefaults: O
  } = K1(w, s);
  let z = O;
  const H = {}, {
    [T]: I,
    ...B
  } = S;
  if (Object.entries(B || {}).forEach(([X, le]) => {
    const {
      vars: V,
      css: be,
      varsWithDefaults: fe
    } = K1(le, s);
    z = Aa(z, fe), H[X] = {
      css: be,
      vars: V
    };
  }), I) {
    const {
      css: X,
      vars: le,
      varsWithDefaults: V
    } = K1(I, s);
    z = Aa(z, V), H[T] = {
      css: X,
      vars: le
    };
  }
  function F(X, le) {
    var be, fe;
    let V = m;
    if (m === "class" && (V = ".%s"), m === "data" && (V = "[data-%s]"), m != null && m.startsWith("data-") && !m.includes("%s") && (V = `[${m}="%s"]`), X) {
      if (V === "media")
        return i.defaultColorScheme === X ? ":root" : {
          [`@media (prefers-color-scheme: ${((fe = (be = S[X]) == null ? void 0 : be.palette) == null ? void 0 : fe.mode) || X})`]: {
            ":root": le
          }
        };
      if (V)
        return i.defaultColorScheme === X ? `:root, ${V.replace("%s", String(X))}` : V.replace("%s", String(X));
    }
    return ":root";
  }
  return {
    vars: z,
    generateThemeVars: () => {
      let X = {
        ...k
      };
      return Object.entries(H).forEach(([, {
        vars: le
      }]) => {
        X = Aa(X, le);
      }), X;
    },
    generateStyleSheets: () => {
      var et, _;
      const X = [], le = i.defaultColorScheme || "light";
      function V(se, ke) {
        Object.keys(ke).length && X.push(typeof se == "string" ? {
          [se]: {
            ...ke
          }
        } : se);
      }
      V(c(void 0, {
        ...A
      }), A);
      const {
        [le]: be,
        ...fe
      } = H;
      if (be) {
        const {
          css: se
        } = be, ke = (_ = (et = S[le]) == null ? void 0 : et.palette) == null ? void 0 : _.mode, ve = !v && ke ? {
          colorScheme: ke,
          ...se
        } : {
          ...se
        };
        V(c(le, {
          ...ve
        }), ve);
      }
      return Object.entries(fe).forEach(([se, {
        css: ke
      }]) => {
        var Re, lt;
        const ve = (lt = (Re = S[se]) == null ? void 0 : Re.palette) == null ? void 0 : lt.mode, pe = !v && ve ? {
          colorScheme: ve,
          ...ke
        } : {
          ...ke
        };
        V(c(se, {
          ...pe
        }), pe);
      }), X;
    }
  };
}
function Hz(i) {
  return function(c) {
    return i === "media" ? (process.env.NODE_ENV !== "production" && c !== "light" && c !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${c}'.`), `@media (prefers-color-scheme: ${c})`) : i ? i.startsWith("data-") && !i.includes("%s") ? `[${i}="${c}"] &` : i === "class" ? `.${c} &` : i === "data" ? `[data-${c}] &` : `${i.replace("%s", c)} &` : "&";
  };
}
const Iz = i0(), Yz = Sz("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (i, s) => s.root
});
function Wz(i) {
  return ZR({
    props: i,
    name: "MuiStack",
    defaultTheme: Iz
  });
}
function Gz(i, s) {
  const c = ct.Children.toArray(i).filter(Boolean);
  return c.reduce((v, m, S) => (v.push(m), S < c.length - 1 && v.push(/* @__PURE__ */ ct.cloneElement(s, {
    key: `separator-${S}`
  })), v), []);
}
const Qz = (i) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[i], qz = ({
  ownerState: i,
  theme: s
}) => {
  let c = {
    display: "flex",
    flexDirection: "column",
    ...mo({
      theme: s
    }, Q1({
      values: i.direction,
      breakpoints: s.breakpoints.values
    }), (v) => ({
      flexDirection: v
    }))
  };
  if (i.spacing) {
    const v = Jg(s), m = Object.keys(s.breakpoints.values).reduce((w, k) => ((typeof i.spacing == "object" && i.spacing[k] != null || typeof i.direction == "object" && i.direction[k] != null) && (w[k] = !0), w), {}), S = Q1({
      values: i.direction,
      base: m
    }), y = Q1({
      values: i.spacing,
      base: m
    });
    typeof S == "object" && Object.keys(S).forEach((w, k, A) => {
      if (!S[w]) {
        const z = k > 0 ? S[A[k - 1]] : "column";
        S[w] = z;
      }
    }), c = Aa(c, mo({
      theme: s
    }, y, (w, k) => i.useFlexGap ? {
      gap: Tc(v, w)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${Qz(k ? S[k] : i.direction)}`]: Tc(v, w)
      }
    }));
  }
  return c = mL(s.breakpoints, c), c;
};
function Kz(i = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: s = Yz,
    useThemeProps: c = Wz,
    componentName: v = "MuiStack"
  } = i, m = () => tl({
    root: ["root"]
  }, (w) => $i(v, w), {}), S = s(qz), y = /* @__PURE__ */ ct.forwardRef(function(w, k) {
    const A = c(w), O = QR(A), {
      component: z = "div",
      direction: H = "column",
      spacing: I = 0,
      divider: B,
      children: F,
      className: ce,
      useFlexGap: oe = !1,
      ...X
    } = O, le = {
      direction: H,
      spacing: I,
      useFlexGap: oe
    }, V = m();
    return /* @__PURE__ */ ht.jsx(S, {
      as: z,
      ownerState: le,
      ref: k,
      className: or(V.root, ce),
      ...X,
      children: B ? Gz(F, B) : F
    });
  });
  return process.env.NODE_ENV !== "production" && (y.propTypes = {
    children: D.node,
    direction: D.oneOfType([D.oneOf(["column-reverse", "column", "row-reverse", "row"]), D.arrayOf(D.oneOf(["column-reverse", "column", "row-reverse", "row"])), D.object]),
    divider: D.node,
    spacing: D.oneOfType([D.arrayOf(D.oneOfType([D.number, D.string])), D.number, D.object, D.string]),
    sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
  }), y;
}
const lh = {
  black: "#000",
  white: "#fff"
}, Xz = {
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
}, Ed = {
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
}, Td = {
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
}, qv = {
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
}, xd = {
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
}, wd = {
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
}, Rd = {
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
}, iR = {
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
    paper: lh.white,
    default: lh.white
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
}, X1 = {
  text: {
    primary: lh.white,
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
    active: lh.white,
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
function oR(i, s, c, v) {
  const m = v.light || v, S = v.dark || v * 1.5;
  i[s] || (i.hasOwnProperty(c) ? i[s] = i[c] : s === "light" ? i.light = kC(i.main, m) : s === "dark" && (i.dark = _C(i.main, S)));
}
function Zz(i = "light") {
  return i === "dark" ? {
    main: xd[200],
    light: xd[50],
    dark: xd[400]
  } : {
    main: xd[700],
    light: xd[400],
    dark: xd[800]
  };
}
function Jz(i = "light") {
  return i === "dark" ? {
    main: Ed[200],
    light: Ed[50],
    dark: Ed[400]
  } : {
    main: Ed[500],
    light: Ed[300],
    dark: Ed[700]
  };
}
function eU(i = "light") {
  return i === "dark" ? {
    main: Td[500],
    light: Td[300],
    dark: Td[700]
  } : {
    main: Td[700],
    light: Td[400],
    dark: Td[800]
  };
}
function tU(i = "light") {
  return i === "dark" ? {
    main: wd[400],
    light: wd[300],
    dark: wd[700]
  } : {
    main: wd[700],
    light: wd[500],
    dark: wd[900]
  };
}
function nU(i = "light") {
  return i === "dark" ? {
    main: Rd[400],
    light: Rd[300],
    dark: Rd[700]
  } : {
    main: Rd[800],
    light: Rd[500],
    dark: Rd[900]
  };
}
function rU(i = "light") {
  return i === "dark" ? {
    main: qv[400],
    light: qv[300],
    dark: qv[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: qv[500],
    dark: qv[900]
  };
}
function DC(i) {
  const {
    mode: s = "light",
    contrastThreshold: c = 3,
    tonalOffset: v = 0.2,
    ...m
  } = i, S = i.primary || Zz(s), y = i.secondary || Jz(s), T = i.error || eU(s), w = i.info || tU(s), k = i.success || nU(s), A = i.warning || rU(s);
  function O(B) {
    const F = eR(B, X1.text.primary) >= c ? X1.text.primary : iR.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const ce = eR(B, F);
      ce < 3 && console.error([`MUI: The contrast ratio of ${ce}:1 for ${F} on ${B}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return F;
  }
  const z = ({
    color: B,
    name: F,
    mainShade: ce = 500,
    lightShade: oe = 300,
    darkShade: X = 700
  }) => {
    if (B = {
      ...B
    }, !B.main && B[ce] && (B.main = B[ce]), !B.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${F ? ` (${F})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${ce}\` property.` : ls(11, F ? ` (${F})` : "", ce));
    if (typeof B.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${F ? ` (${F})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(B.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : ls(12, F ? ` (${F})` : "", JSON.stringify(B.main)));
    return oR(B, "light", oe, v), oR(B, "dark", X, v), B.contrastText || (B.contrastText = O(B.main)), B;
  }, H = {
    dark: X1,
    light: iR
  };
  return process.env.NODE_ENV !== "production" && (H[s] || console.error(`MUI: The palette mode \`${s}\` is not supported.`)), Aa({
    // A collection of common colors.
    common: {
      ...lh
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
      color: T,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: z({
      color: A,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: z({
      color: w,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: z({
      color: k,
      name: "success"
    }),
    // The grey colors.
    grey: Xz,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: c,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: O,
    // Generate a rich color object.
    augmentColor: z,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: v,
    // The light and dark mode object.
    ...H[s]
  }, m);
}
function aU(i) {
  const s = {};
  return Object.entries(i).forEach((v) => {
    const [m, S] = v;
    typeof S == "object" && (s[m] = `${S.fontStyle ? `${S.fontStyle} ` : ""}${S.fontVariant ? `${S.fontVariant} ` : ""}${S.fontWeight ? `${S.fontWeight} ` : ""}${S.fontStretch ? `${S.fontStretch} ` : ""}${S.fontSize || ""}${S.lineHeight ? `/${S.lineHeight} ` : ""}${S.fontFamily || ""}`);
  }), s;
}
function iU(i, s) {
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
function oU(i) {
  return Math.round(i * 1e5) / 1e5;
}
const lR = {
  textTransform: "uppercase"
}, uR = '"Roboto", "Helvetica", "Arial", sans-serif';
function lU(i, s) {
  const {
    fontFamily: c = uR,
    // The default font size of the Material Specification.
    fontSize: v = 14,
    // px
    fontWeightLight: m = 300,
    fontWeightRegular: S = 400,
    fontWeightMedium: y = 500,
    fontWeightBold: T = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: w = 16,
    // Apply the CSS properties to all the variants.
    allVariants: k,
    pxToRem: A,
    ...O
  } = typeof s == "function" ? s(i) : s;
  process.env.NODE_ENV !== "production" && (typeof v != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof w != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const z = v / 14, H = A || ((F) => `${F / w * z}rem`), I = (F, ce, oe, X, le) => ({
    fontFamily: c,
    fontWeight: F,
    fontSize: H(ce),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: oe,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...c === uR ? {
      letterSpacing: `${oU(X / ce)}em`
    } : {},
    ...le,
    ...k
  }), B = {
    h1: I(m, 96, 1.167, -1.5),
    h2: I(m, 60, 1.2, -0.5),
    h3: I(S, 48, 1.167, 0),
    h4: I(S, 34, 1.235, 0.25),
    h5: I(S, 24, 1.334, 0),
    h6: I(y, 20, 1.6, 0.15),
    subtitle1: I(S, 16, 1.75, 0.15),
    subtitle2: I(y, 14, 1.57, 0.1),
    body1: I(S, 16, 1.5, 0.15),
    body2: I(S, 14, 1.43, 0.15),
    button: I(y, 14, 1.75, 0.4, lR),
    caption: I(S, 12, 1.66, 0.4),
    overline: I(S, 12, 2.66, 1, lR),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Aa({
    htmlFontSize: w,
    pxToRem: H,
    fontFamily: c,
    fontSize: v,
    fontWeightLight: m,
    fontWeightRegular: S,
    fontWeightMedium: y,
    fontWeightBold: T,
    ...B
  }, O, {
    clone: !1
    // No need to clone deep
  });
}
const uU = 0.2, sU = 0.14, cU = 0.12;
function Pn(...i) {
  return [`${i[0]}px ${i[1]}px ${i[2]}px ${i[3]}px rgba(0,0,0,${uU})`, `${i[4]}px ${i[5]}px ${i[6]}px ${i[7]}px rgba(0,0,0,${sU})`, `${i[8]}px ${i[9]}px ${i[10]}px ${i[11]}px rgba(0,0,0,${cU})`].join(",");
}
const fU = ["none", Pn(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Pn(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Pn(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Pn(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Pn(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Pn(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Pn(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Pn(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Pn(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Pn(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Pn(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Pn(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Pn(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Pn(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Pn(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Pn(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Pn(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Pn(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Pn(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Pn(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Pn(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Pn(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Pn(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Pn(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], dU = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, pU = {
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
function sR(i) {
  return `${Math.round(i)}ms`;
}
function vU(i) {
  if (!i)
    return 0;
  const s = i / 36;
  return Math.min(Math.round((4 + 15 * s ** 0.25 + s / 5) * 10), 3e3);
}
function hU(i) {
  const s = {
    ...dU,
    ...i.easing
  }, c = {
    ...pU,
    ...i.duration
  };
  return {
    getAutoHeightDuration: vU,
    create: (m = ["all"], S = {}) => {
      const {
        duration: y = c.standard,
        easing: T = s.easeInOut,
        delay: w = 0,
        ...k
      } = S;
      if (process.env.NODE_ENV !== "production") {
        const A = (z) => typeof z == "string", O = (z) => !Number.isNaN(parseFloat(z));
        !A(m) && !Array.isArray(m) && console.error('MUI: Argument "props" must be a string or Array.'), !O(y) && !A(y) && console.error(`MUI: Argument "duration" must be a number or a string but found ${y}.`), A(T) || console.error('MUI: Argument "easing" must be a string.'), !O(w) && !A(w) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof S != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(k).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(k).join(",")}].`);
      }
      return (Array.isArray(m) ? m : [m]).map((A) => `${A} ${typeof y == "string" ? y : sR(y)} ${T} ${typeof w == "string" ? w : sR(w)}`).join(",");
    },
    ...i,
    easing: s,
    duration: c
  };
}
const mU = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function vC(i = {}, ...s) {
  const {
    breakpoints: c,
    mixins: v = {},
    spacing: m,
    palette: S = {},
    transitions: y = {},
    typography: T = {},
    shape: w,
    ...k
  } = i;
  if (i.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : ls(20));
  const A = DC(S), O = i0(i);
  let z = Aa(O, {
    mixins: iU(O.breakpoints, v),
    palette: A,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: fU.slice(),
    typography: lU(A, T),
    transitions: hU(y),
    zIndex: {
      ...mU
    }
  });
  if (z = Aa(z, k), z = s.reduce((H, I) => Aa(H, I), z), process.env.NODE_ENV !== "production") {
    const H = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], I = (B, F) => {
      let ce;
      for (ce in B) {
        const oe = B[ce];
        if (H.includes(ce) && Object.keys(oe).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const X = $i("", ce);
            console.error([`MUI: The \`${F}\` component increases the CSS specificity of the \`${ce}\` internal state.`, "You can not override it like this: ", JSON.stringify(B, null, 2), "", `Instead, you need to use the '&.${X}' syntax:`, JSON.stringify({
              root: {
                [`&.${X}`]: oe
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          B[ce] = {};
        }
      }
    };
    Object.keys(z.components).forEach((B) => {
      const F = z.components[B].styleOverrides;
      F && B.startsWith("Mui") && I(F, B);
    });
  }
  return z.unstable_sxConfig = {
    ...fh,
    ...k == null ? void 0 : k.unstable_sxConfig
  }, z.unstable_sx = function(I) {
    return dh({
      sx: I,
      theme: this
    });
  }, z;
}
function hC(i) {
  let s;
  return i < 1 ? s = 5.11916 * i ** 2 : s = 4.5 * Math.log(i + 1) + 2, Math.round(s * 10) / 1e3;
}
const yU = [...Array(25)].map((i, s) => {
  if (s === 0)
    return "none";
  const c = hC(s);
  return `linear-gradient(rgba(255 255 255 / ${c}), rgba(255 255 255 / ${c}))`;
});
function r_(i) {
  return {
    inputPlaceholder: i === "dark" ? 0.5 : 0.42,
    inputUnderline: i === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: i === "dark" ? 0.2 : 0.12,
    switchTrack: i === "dark" ? 0.3 : 0.38
  };
}
function a_(i) {
  return i === "dark" ? yU : [];
}
function gU(i) {
  const {
    palette: s = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: c,
    overlays: v,
    ...m
  } = i, S = DC(s);
  return {
    palette: S,
    opacity: {
      ...r_(S.mode),
      ...c
    },
    overlays: v || a_(S.mode),
    ...m
  };
}
function SU(i) {
  var s;
  return !!i[0].match(/(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/) || !!i[0].match(/sxConfig$/) || // ends with sxConfig
  i[0] === "palette" && !!((s = i[1]) != null && s.match(/(mode|contrastThreshold|tonalOffset)/));
}
const bU = (i) => [...[...Array(25)].map((s, c) => `--${i ? `${i}-` : ""}overlays-${c}`), `--${i ? `${i}-` : ""}palette-AppBar-darkBg`, `--${i ? `${i}-` : ""}palette-AppBar-darkColor`], CU = (i) => (s, c) => {
  const v = i.colorSchemeSelector;
  let m = v;
  if (v === "class" && (m = ".%s"), v === "data" && (m = "[data-%s]"), v != null && v.startsWith("data-") && !v.includes("%s") && (m = `[${v}="%s"]`), i.defaultColorScheme === s) {
    if (s === "dark") {
      const S = {};
      return bU(i.cssVarPrefix).forEach((y) => {
        S[y] = c[y], delete c[y];
      }), m === "media" ? {
        ":root": c,
        "@media (prefers-color-scheme: dark)": {
          ":root": S
        }
      } : m ? {
        [m.replace("%s", s)]: S,
        [`:root, ${m.replace("%s", s)}`]: c
      } : {
        ":root": {
          ...c,
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
          ":root": c
        }
      };
    if (m)
      return m.replace("%s", String(s));
  }
  return ":root";
};
function EU(i) {
  return Xo(i) || typeof i > "u" || typeof i == "string" || typeof i == "boolean" || typeof i == "number" || Array.isArray(i);
}
function TU(i = {}) {
  const s = {
    ...i
  };
  function c(v) {
    const m = Object.entries(v);
    for (let S = 0; S < m.length; S++) {
      const [y, T] = m[S];
      !EU(T) || y.startsWith("unstable_") ? delete v[y] : Xo(T) && (v[y] = {
        ...T
      }, c(v[y]));
    }
  }
  return c(s), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(s, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function xU(i, s) {
  s.forEach((c) => {
    i[c] || (i[c] = {});
  });
}
function ie(i, s, c) {
  !i[s] && c && (i[s] = c);
}
function Zv(i) {
  return !i || !i.startsWith("hsl") ? i : JR(i);
}
function Wl(i, s) {
  `${s}Channel` in i || (i[`${s}Channel`] = Xv(Zv(i[s]), `MUI: Can't create \`palette.${s}Channel\` because \`palette.${s}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${s}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function wU(i) {
  return typeof i == "number" ? `${i}px` : typeof i == "string" || typeof i == "function" || Array.isArray(i) ? i : "8px";
}
const Go = (i) => {
  try {
    return i();
  } catch {
  }
}, RU = (i = "mui") => jz(i);
function Z1(i, s, c, v) {
  if (!s)
    return;
  s = s === !0 ? {} : s;
  const m = v === "dark" ? "dark" : "light";
  if (!c) {
    i[v] = gU({
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
  } = vC({
    ...c,
    palette: {
      mode: m,
      ...s == null ? void 0 : s.palette
    }
  });
  return i[v] = {
    ...s,
    palette: S,
    opacity: {
      ...r_(m),
      ...s == null ? void 0 : s.opacity
    },
    overlays: (s == null ? void 0 : s.overlays) || a_(m)
  }, y;
}
function _U(i = {}, ...s) {
  const {
    colorSchemes: c = {
      light: !0
    },
    defaultColorScheme: v,
    disableCssColorScheme: m = !1,
    cssVarPrefix: S = "mui",
    shouldSkipGeneratingVar: y = SU,
    colorSchemeSelector: T = c.light && c.dark ? "media" : void 0,
    ...w
  } = i, k = Object.keys(c)[0], A = v || (c.light && k !== "light" ? "light" : k), O = RU(S), {
    [A]: z,
    light: H,
    dark: I,
    ...B
  } = c, F = {
    ...B
  };
  let ce = z;
  if ((A === "dark" && !("dark" in c) || A === "light" && !("light" in c)) && (ce = !0), !ce)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${A}\` option is either missing or invalid.` : ls(21, A));
  const oe = Z1(F, ce, w, A);
  H && !F.light && Z1(F, H, void 0, "light"), I && !F.dark && Z1(F, I, void 0, "dark");
  let X = {
    defaultColorScheme: A,
    ...oe,
    cssVarPrefix: S,
    colorSchemeSelector: T,
    getCssVar: O,
    colorSchemes: F,
    font: {
      ...aU(oe.typography),
      ...oe.font
    },
    spacing: wU(w.spacing)
  };
  Object.keys(X.colorSchemes).forEach((et) => {
    const _ = X.colorSchemes[et].palette, se = (ke) => {
      const ve = ke.split("-"), pe = ve[1], Re = ve[2];
      return O(ke, _[pe][Re]);
    };
    if (_.mode === "light" && (ie(_.common, "background", "#fff"), ie(_.common, "onBackground", "#000")), _.mode === "dark" && (ie(_.common, "background", "#000"), ie(_.common, "onBackground", "#fff")), xU(_, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), _.mode === "light") {
      ie(_.Alert, "errorColor", En(_.error.light, 0.6)), ie(_.Alert, "infoColor", En(_.info.light, 0.6)), ie(_.Alert, "successColor", En(_.success.light, 0.6)), ie(_.Alert, "warningColor", En(_.warning.light, 0.6)), ie(_.Alert, "errorFilledBg", se("palette-error-main")), ie(_.Alert, "infoFilledBg", se("palette-info-main")), ie(_.Alert, "successFilledBg", se("palette-success-main")), ie(_.Alert, "warningFilledBg", se("palette-warning-main")), ie(_.Alert, "errorFilledColor", Go(() => _.getContrastText(_.error.main))), ie(_.Alert, "infoFilledColor", Go(() => _.getContrastText(_.info.main))), ie(_.Alert, "successFilledColor", Go(() => _.getContrastText(_.success.main))), ie(_.Alert, "warningFilledColor", Go(() => _.getContrastText(_.warning.main))), ie(_.Alert, "errorStandardBg", Tn(_.error.light, 0.9)), ie(_.Alert, "infoStandardBg", Tn(_.info.light, 0.9)), ie(_.Alert, "successStandardBg", Tn(_.success.light, 0.9)), ie(_.Alert, "warningStandardBg", Tn(_.warning.light, 0.9)), ie(_.Alert, "errorIconColor", se("palette-error-main")), ie(_.Alert, "infoIconColor", se("palette-info-main")), ie(_.Alert, "successIconColor", se("palette-success-main")), ie(_.Alert, "warningIconColor", se("palette-warning-main")), ie(_.AppBar, "defaultBg", se("palette-grey-100")), ie(_.Avatar, "defaultBg", se("palette-grey-400")), ie(_.Button, "inheritContainedBg", se("palette-grey-300")), ie(_.Button, "inheritContainedHoverBg", se("palette-grey-A100")), ie(_.Chip, "defaultBorder", se("palette-grey-400")), ie(_.Chip, "defaultAvatarColor", se("palette-grey-700")), ie(_.Chip, "defaultIconColor", se("palette-grey-700")), ie(_.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ie(_.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ie(_.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ie(_.LinearProgress, "primaryBg", Tn(_.primary.main, 0.62)), ie(_.LinearProgress, "secondaryBg", Tn(_.secondary.main, 0.62)), ie(_.LinearProgress, "errorBg", Tn(_.error.main, 0.62)), ie(_.LinearProgress, "infoBg", Tn(_.info.main, 0.62)), ie(_.LinearProgress, "successBg", Tn(_.success.main, 0.62)), ie(_.LinearProgress, "warningBg", Tn(_.warning.main, 0.62)), ie(_.Skeleton, "bg", `rgba(${se("palette-text-primaryChannel")} / 0.11)`), ie(_.Slider, "primaryTrack", Tn(_.primary.main, 0.62)), ie(_.Slider, "secondaryTrack", Tn(_.secondary.main, 0.62)), ie(_.Slider, "errorTrack", Tn(_.error.main, 0.62)), ie(_.Slider, "infoTrack", Tn(_.info.main, 0.62)), ie(_.Slider, "successTrack", Tn(_.success.main, 0.62)), ie(_.Slider, "warningTrack", Tn(_.warning.main, 0.62));
      const ke = kg(_.background.default, 0.8);
      ie(_.SnackbarContent, "bg", ke), ie(_.SnackbarContent, "color", Go(() => _.getContrastText(ke))), ie(_.SpeedDialAction, "fabHoverBg", kg(_.background.paper, 0.15)), ie(_.StepConnector, "border", se("palette-grey-400")), ie(_.StepContent, "border", se("palette-grey-400")), ie(_.Switch, "defaultColor", se("palette-common-white")), ie(_.Switch, "defaultDisabledColor", se("palette-grey-100")), ie(_.Switch, "primaryDisabledColor", Tn(_.primary.main, 0.62)), ie(_.Switch, "secondaryDisabledColor", Tn(_.secondary.main, 0.62)), ie(_.Switch, "errorDisabledColor", Tn(_.error.main, 0.62)), ie(_.Switch, "infoDisabledColor", Tn(_.info.main, 0.62)), ie(_.Switch, "successDisabledColor", Tn(_.success.main, 0.62)), ie(_.Switch, "warningDisabledColor", Tn(_.warning.main, 0.62)), ie(_.TableCell, "border", Tn(_g(_.divider, 1), 0.88)), ie(_.Tooltip, "bg", _g(_.grey[700], 0.92));
    }
    if (_.mode === "dark") {
      ie(_.Alert, "errorColor", Tn(_.error.light, 0.6)), ie(_.Alert, "infoColor", Tn(_.info.light, 0.6)), ie(_.Alert, "successColor", Tn(_.success.light, 0.6)), ie(_.Alert, "warningColor", Tn(_.warning.light, 0.6)), ie(_.Alert, "errorFilledBg", se("palette-error-dark")), ie(_.Alert, "infoFilledBg", se("palette-info-dark")), ie(_.Alert, "successFilledBg", se("palette-success-dark")), ie(_.Alert, "warningFilledBg", se("palette-warning-dark")), ie(_.Alert, "errorFilledColor", Go(() => _.getContrastText(_.error.dark))), ie(_.Alert, "infoFilledColor", Go(() => _.getContrastText(_.info.dark))), ie(_.Alert, "successFilledColor", Go(() => _.getContrastText(_.success.dark))), ie(_.Alert, "warningFilledColor", Go(() => _.getContrastText(_.warning.dark))), ie(_.Alert, "errorStandardBg", En(_.error.light, 0.9)), ie(_.Alert, "infoStandardBg", En(_.info.light, 0.9)), ie(_.Alert, "successStandardBg", En(_.success.light, 0.9)), ie(_.Alert, "warningStandardBg", En(_.warning.light, 0.9)), ie(_.Alert, "errorIconColor", se("palette-error-main")), ie(_.Alert, "infoIconColor", se("palette-info-main")), ie(_.Alert, "successIconColor", se("palette-success-main")), ie(_.Alert, "warningIconColor", se("palette-warning-main")), ie(_.AppBar, "defaultBg", se("palette-grey-900")), ie(_.AppBar, "darkBg", se("palette-background-paper")), ie(_.AppBar, "darkColor", se("palette-text-primary")), ie(_.Avatar, "defaultBg", se("palette-grey-600")), ie(_.Button, "inheritContainedBg", se("palette-grey-800")), ie(_.Button, "inheritContainedHoverBg", se("palette-grey-700")), ie(_.Chip, "defaultBorder", se("palette-grey-700")), ie(_.Chip, "defaultAvatarColor", se("palette-grey-300")), ie(_.Chip, "defaultIconColor", se("palette-grey-300")), ie(_.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ie(_.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ie(_.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ie(_.LinearProgress, "primaryBg", En(_.primary.main, 0.5)), ie(_.LinearProgress, "secondaryBg", En(_.secondary.main, 0.5)), ie(_.LinearProgress, "errorBg", En(_.error.main, 0.5)), ie(_.LinearProgress, "infoBg", En(_.info.main, 0.5)), ie(_.LinearProgress, "successBg", En(_.success.main, 0.5)), ie(_.LinearProgress, "warningBg", En(_.warning.main, 0.5)), ie(_.Skeleton, "bg", `rgba(${se("palette-text-primaryChannel")} / 0.13)`), ie(_.Slider, "primaryTrack", En(_.primary.main, 0.5)), ie(_.Slider, "secondaryTrack", En(_.secondary.main, 0.5)), ie(_.Slider, "errorTrack", En(_.error.main, 0.5)), ie(_.Slider, "infoTrack", En(_.info.main, 0.5)), ie(_.Slider, "successTrack", En(_.success.main, 0.5)), ie(_.Slider, "warningTrack", En(_.warning.main, 0.5));
      const ke = kg(_.background.default, 0.98);
      ie(_.SnackbarContent, "bg", ke), ie(_.SnackbarContent, "color", Go(() => _.getContrastText(ke))), ie(_.SpeedDialAction, "fabHoverBg", kg(_.background.paper, 0.15)), ie(_.StepConnector, "border", se("palette-grey-600")), ie(_.StepContent, "border", se("palette-grey-600")), ie(_.Switch, "defaultColor", se("palette-grey-300")), ie(_.Switch, "defaultDisabledColor", se("palette-grey-600")), ie(_.Switch, "primaryDisabledColor", En(_.primary.main, 0.55)), ie(_.Switch, "secondaryDisabledColor", En(_.secondary.main, 0.55)), ie(_.Switch, "errorDisabledColor", En(_.error.main, 0.55)), ie(_.Switch, "infoDisabledColor", En(_.info.main, 0.55)), ie(_.Switch, "successDisabledColor", En(_.success.main, 0.55)), ie(_.Switch, "warningDisabledColor", En(_.warning.main, 0.55)), ie(_.TableCell, "border", En(_g(_.divider, 1), 0.68)), ie(_.Tooltip, "bg", _g(_.grey[700], 0.92));
    }
    Wl(_.background, "default"), Wl(_.background, "paper"), Wl(_.common, "background"), Wl(_.common, "onBackground"), Wl(_, "divider"), Object.keys(_).forEach((ke) => {
      const ve = _[ke];
      ve && typeof ve == "object" && (ve.main && ie(_[ke], "mainChannel", Xv(Zv(ve.main))), ve.light && ie(_[ke], "lightChannel", Xv(Zv(ve.light))), ve.dark && ie(_[ke], "darkChannel", Xv(Zv(ve.dark))), ve.contrastText && ie(_[ke], "contrastTextChannel", Xv(Zv(ve.contrastText))), ke === "text" && (Wl(_[ke], "primary"), Wl(_[ke], "secondary")), ke === "action" && (ve.active && Wl(_[ke], "active"), ve.selected && Wl(_[ke], "selected")));
    });
  }), X = s.reduce((et, _) => Aa(et, _), X);
  const le = {
    prefix: S,
    disableCssColorScheme: m,
    shouldSkipGeneratingVar: y,
    getSelector: CU(X)
  }, {
    vars: V,
    generateThemeVars: be,
    generateStyleSheets: fe
  } = Bz(X, le);
  return X.vars = V, Object.entries(X.colorSchemes[X.defaultColorScheme]).forEach(([et, _]) => {
    X[et] = _;
  }), X.generateThemeVars = be, X.generateStyleSheets = fe, X.generateSpacing = function() {
    return WR(w.spacing, Jg(this));
  }, X.getColorSchemeSelector = Hz(T), X.spacing = X.generateSpacing(), X.shouldSkipGeneratingVar = y, X.unstable_sxConfig = {
    ...fh,
    ...w == null ? void 0 : w.unstable_sxConfig
  }, X.unstable_sx = function(_) {
    return dh({
      sx: _,
      theme: this
    });
  }, X.toRuntimeSource = TU, X;
}
function cR(i, s, c) {
  i.colorSchemes && c && (i.colorSchemes[s] = {
    ...c !== !0 && c,
    palette: DC({
      ...c === !0 ? {} : c.palette,
      mode: s
    })
    // cast type to skip module augmentation test
  });
}
function i_(i = {}, ...s) {
  const {
    palette: c,
    cssVariables: v = !1,
    colorSchemes: m = c ? void 0 : {
      light: !0
    },
    defaultColorScheme: S = c == null ? void 0 : c.mode,
    ...y
  } = i, T = S || "light", w = m == null ? void 0 : m[T], k = {
    ...m,
    ...c ? {
      [T]: {
        ...typeof w != "boolean" && w,
        palette: c
      }
    } : void 0
  };
  if (v === !1) {
    if (!("colorSchemes" in i))
      return vC(i, ...s);
    let A = c;
    "palette" in i || k[T] && (k[T] !== !0 ? A = k[T].palette : T === "dark" && (A = {
      mode: "dark"
    }));
    const O = vC({
      ...i,
      palette: A
    }, ...s);
    return O.defaultColorScheme = T, O.colorSchemes = k, O.palette.mode === "light" && (O.colorSchemes.light = {
      ...k.light !== !0 && k.light,
      palette: O.palette
    }, cR(O, "dark", k.dark)), O.palette.mode === "dark" && (O.colorSchemes.dark = {
      ...k.dark !== !0 && k.dark,
      palette: O.palette
    }, cR(O, "light", k.light)), O;
  }
  return !c && !("light" in k) && T === "light" && (k.light = !0), _U({
    ...y,
    colorSchemes: k,
    defaultColorScheme: T,
    ...typeof v != "boolean" && v
  }, ...s);
}
const MC = i_(), AC = "$$material";
function kU(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
const o_ = (i) => kU(i) && i !== "classes", Na = XR({
  themeId: AC,
  defaultTheme: MC,
  rootShouldForwardProp: o_
});
function OU({
  props: i,
  name: s
}) {
  return ZR({
    props: i,
    name: s,
    defaultTheme: MC,
    themeId: AC
  });
}
const l_ = Kz({
  createStyledComponent: Na("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (i, s) => s.root
  }),
  useThemeProps: (i) => OU({
    props: i,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (l_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: D.oneOfType([D.oneOf(["column-reverse", "column", "row-reverse", "row"]), D.arrayOf(D.oneOf(["column-reverse", "column", "row-reverse", "row"])), D.object]),
  /**
   * Add an element between each child.
   */
  divider: D.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: D.oneOfType([D.arrayOf(D.oneOfType([D.number, D.string])), D.number, D.object, D.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: D.bool
});
function DU() {
  const i = GR(MC);
  return process.env.NODE_ENV !== "production" && ct.useDebugValue(i), i[AC] || i;
}
function MU() {
  return QR;
}
const fR = {
  theme: void 0
};
function ph(i) {
  let s, c;
  return (v) => {
    let m = s;
    return (m === void 0 || v.theme !== c) && (fR.theme = v.theme, m = i(fR), s = m, c = v.theme), m;
  };
}
process.env.NODE_ENV !== "production" && (D.node, D.object.isRequired);
function nl(i) {
  return Pz(i);
}
class Vg {
  constructor() {
    Yv(this, "mountEffect", () => {
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
    return new Vg();
  }
  static use() {
    const s = e_(Vg.create).current, [c, v] = ct.useState(!1);
    return s.shouldMount = c, s.setShouldMount = v, ct.useEffect(s.mountEffect, [c]), s;
  }
  mount() {
    return this.mounted || (this.mounted = NU(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
  }
  /* Ripple API */
  start(...s) {
    this.mount().then(() => {
      var c;
      return (c = this.ref.current) == null ? void 0 : c.start(...s);
    });
  }
  stop(...s) {
    this.mount().then(() => {
      var c;
      return (c = this.ref.current) == null ? void 0 : c.stop(...s);
    });
  }
  pulsate(...s) {
    this.mount().then(() => {
      var c;
      return (c = this.ref.current) == null ? void 0 : c.pulsate(...s);
    });
  }
}
function AU() {
  return Vg.use();
}
function NU() {
  let i, s;
  const c = new Promise((v, m) => {
    i = v, s = m;
  });
  return c.resolve = i, c.reject = s, c;
}
function LU(i, s) {
  if (i == null) return {};
  var c = {};
  for (var v in i) if ({}.hasOwnProperty.call(i, v)) {
    if (s.includes(v)) continue;
    c[v] = i[v];
  }
  return c;
}
function mC(i, s) {
  return mC = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(c, v) {
    return c.__proto__ = v, c;
  }, mC(i, s);
}
function zU(i, s) {
  i.prototype = Object.create(s.prototype), i.prototype.constructor = i, mC(i, s);
}
const dR = xn.createContext(null);
function UU(i) {
  if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function NC(i, s) {
  var c = function(S) {
    return s && Mg(S) ? s(S) : S;
  }, v = /* @__PURE__ */ Object.create(null);
  return i && TN.map(i, function(m) {
    return m;
  }).forEach(function(m) {
    v[m.key] = c(m);
  }), v;
}
function FU(i, s) {
  i = i || {}, s = s || {};
  function c(A) {
    return A in s ? s[A] : i[A];
  }
  var v = /* @__PURE__ */ Object.create(null), m = [];
  for (var S in i)
    S in s ? m.length && (v[S] = m, m = []) : m.push(S);
  var y, T = {};
  for (var w in s) {
    if (v[w])
      for (y = 0; y < v[w].length; y++) {
        var k = v[w][y];
        T[v[w][y]] = c(k);
      }
    T[w] = c(w);
  }
  for (y = 0; y < m.length; y++)
    T[m[y]] = c(m[y]);
  return T;
}
function Ec(i, s, c) {
  return c[s] != null ? c[s] : i.props[s];
}
function PU(i, s) {
  return NC(i.children, function(c) {
    return Ag(c, {
      onExited: s.bind(null, c),
      in: !0,
      appear: Ec(c, "appear", i),
      enter: Ec(c, "enter", i),
      exit: Ec(c, "exit", i)
    });
  });
}
function jU(i, s, c) {
  var v = NC(i.children), m = FU(s, v);
  return Object.keys(m).forEach(function(S) {
    var y = m[S];
    if (Mg(y)) {
      var T = S in s, w = S in v, k = s[S], A = Mg(k) && !k.props.in;
      w && (!T || A) ? m[S] = Ag(y, {
        onExited: c.bind(null, y),
        in: !0,
        exit: Ec(y, "exit", i),
        enter: Ec(y, "enter", i)
      }) : !w && T && !A ? m[S] = Ag(y, {
        in: !1
      }) : w && T && Mg(k) && (m[S] = Ag(y, {
        onExited: c.bind(null, y),
        in: k.props.in,
        exit: Ec(y, "exit", i),
        enter: Ec(y, "enter", i)
      }));
    }
  }), m;
}
var $U = Object.values || function(i) {
  return Object.keys(i).map(function(s) {
    return i[s];
  });
}, VU = {
  component: "div",
  childFactory: function(s) {
    return s;
  }
}, LC = /* @__PURE__ */ function(i) {
  zU(s, i);
  function s(v, m) {
    var S;
    S = i.call(this, v, m) || this;
    var y = S.handleExited.bind(UU(S));
    return S.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: y,
      firstRender: !0
    }, S;
  }
  var c = s.prototype;
  return c.componentDidMount = function() {
    this.mounted = !0, this.setState({
      contextValue: {
        isMounting: !1
      }
    });
  }, c.componentWillUnmount = function() {
    this.mounted = !1;
  }, s.getDerivedStateFromProps = function(m, S) {
    var y = S.children, T = S.handleExited, w = S.firstRender;
    return {
      children: w ? PU(m, T) : jU(m, y, T),
      firstRender: !1
    };
  }, c.handleExited = function(m, S) {
    var y = NC(this.props.children);
    m.key in y || (m.props.onExited && m.props.onExited(S), this.mounted && this.setState(function(T) {
      var w = Pg({}, T.children);
      return delete w[m.key], {
        children: w
      };
    }));
  }, c.render = function() {
    var m = this.props, S = m.component, y = m.childFactory, T = LU(m, ["component", "childFactory"]), w = this.state.contextValue, k = $U(this.state.children).map(y);
    return delete T.appear, delete T.enter, delete T.exit, S === null ? /* @__PURE__ */ xn.createElement(dR.Provider, {
      value: w
    }, k) : /* @__PURE__ */ xn.createElement(dR.Provider, {
      value: w
    }, /* @__PURE__ */ xn.createElement(S, T, k));
  }, s;
}(xn.Component);
LC.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: D.any,
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
  children: D.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: D.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: D.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: D.bool,
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
  childFactory: D.func
} : {};
LC.defaultProps = VU;
function u_(i) {
  const {
    className: s,
    classes: c,
    pulsate: v = !1,
    rippleX: m,
    rippleY: S,
    rippleSize: y,
    in: T,
    onExited: w,
    timeout: k
  } = i, [A, O] = ct.useState(!1), z = or(s, c.ripple, c.rippleVisible, v && c.ripplePulsate), H = {
    width: y,
    height: y,
    top: -(y / 2) + S,
    left: -(y / 2) + m
  }, I = or(c.child, A && c.childLeaving, v && c.childPulsate);
  return !T && !A && O(!0), ct.useEffect(() => {
    if (!T && w != null) {
      const B = setTimeout(w, k);
      return () => {
        clearTimeout(B);
      };
    }
  }, [w, T, k]), /* @__PURE__ */ ht.jsx("span", {
    className: z,
    style: H,
    children: /* @__PURE__ */ ht.jsx("span", {
      className: I
    })
  });
}
process.env.NODE_ENV !== "production" && (u_.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object.isRequired,
  className: D.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: D.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: D.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: D.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: D.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: D.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: D.number,
  /**
   * exit delay
   */
  timeout: D.number.isRequired
});
const Fi = el("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), yC = 550, BU = 80, HU = xC`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, IU = xC`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, YU = xC`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, WU = Na("span", {
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
}), GU = Na(u_, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${Fi.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${HU};
    animation-duration: ${yC}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  &.${Fi.ripplePulsate} {
    animation-duration: ${({
  theme: i
}) => i.transitions.duration.shorter}ms;
  }

  & .${Fi.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${Fi.childLeaving} {
    opacity: 0;
    animation-name: ${IU};
    animation-duration: ${yC}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  & .${Fi.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${YU};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, s_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiTouchRipple"
  }), {
    center: m = !1,
    classes: S = {},
    className: y,
    ...T
  } = v, [w, k] = ct.useState([]), A = ct.useRef(0), O = ct.useRef(null);
  ct.useEffect(() => {
    O.current && (O.current(), O.current = null);
  }, [w]);
  const z = ct.useRef(!1), H = Nz(), I = ct.useRef(null), B = ct.useRef(null), F = ct.useCallback((le) => {
    const {
      pulsate: V,
      rippleX: be,
      rippleY: fe,
      rippleSize: et,
      cb: _
    } = le;
    k((se) => [...se, /* @__PURE__ */ ht.jsx(GU, {
      classes: {
        ripple: or(S.ripple, Fi.ripple),
        rippleVisible: or(S.rippleVisible, Fi.rippleVisible),
        ripplePulsate: or(S.ripplePulsate, Fi.ripplePulsate),
        child: or(S.child, Fi.child),
        childLeaving: or(S.childLeaving, Fi.childLeaving),
        childPulsate: or(S.childPulsate, Fi.childPulsate)
      },
      timeout: yC,
      pulsate: V,
      rippleX: be,
      rippleY: fe,
      rippleSize: et
    }, A.current)]), A.current += 1, O.current = _;
  }, [S]), ce = ct.useCallback((le = {}, V = {}, be = () => {
  }) => {
    const {
      pulsate: fe = !1,
      center: et = m || V.pulsate,
      fakeElement: _ = !1
      // For test purposes
    } = V;
    if ((le == null ? void 0 : le.type) === "mousedown" && z.current) {
      z.current = !1;
      return;
    }
    (le == null ? void 0 : le.type) === "touchstart" && (z.current = !0);
    const se = _ ? null : B.current, ke = se ? se.getBoundingClientRect() : {
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
    le != null && le.touches ? I.current === null && (I.current = () => {
      F({
        pulsate: fe,
        rippleX: ve,
        rippleY: pe,
        rippleSize: Re,
        cb: be
      });
    }, H.start(BU, () => {
      I.current && (I.current(), I.current = null);
    })) : F({
      pulsate: fe,
      rippleX: ve,
      rippleY: pe,
      rippleSize: Re,
      cb: be
    });
  }, [m, F, H]), oe = ct.useCallback(() => {
    ce({}, {
      pulsate: !0
    });
  }, [ce]), X = ct.useCallback((le, V) => {
    if (H.clear(), (le == null ? void 0 : le.type) === "touchend" && I.current) {
      I.current(), I.current = null, H.start(0, () => {
        X(le, V);
      });
      return;
    }
    I.current = null, k((be) => be.length > 0 ? be.slice(1) : be), O.current = V;
  }, [H]);
  return ct.useImperativeHandle(c, () => ({
    pulsate: oe,
    start: ce,
    stop: X
  }), [oe, ce, X]), /* @__PURE__ */ ht.jsx(WU, {
    className: or(Fi.root, S.root, y),
    ref: B,
    ...T,
    children: /* @__PURE__ */ ht.jsx(LC, {
      component: null,
      exit: !0,
      children: w
    })
  });
});
process.env.NODE_ENV !== "production" && (s_.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: D.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string
});
function QU(i) {
  return $i("MuiButtonBase", i);
}
const qU = el("MuiButtonBase", ["root", "disabled", "focusVisible"]), KU = (i) => {
  const {
    disabled: s,
    focusVisible: c,
    focusVisibleClassName: v,
    classes: m
  } = i, y = tl({
    root: ["root", s && "disabled", c && "focusVisible"]
  }, QU, m);
  return c && v && (y.root += ` ${v}`), y;
}, XU = Na("button", {
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
  [`&.${qU.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), zC = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiButtonBase"
  }), {
    action: m,
    centerRipple: S = !1,
    children: y,
    className: T,
    component: w = "button",
    disabled: k = !1,
    disableRipple: A = !1,
    disableTouchRipple: O = !1,
    focusRipple: z = !1,
    focusVisibleClassName: H,
    LinkComponent: I = "a",
    onBlur: B,
    onClick: F,
    onContextMenu: ce,
    onDragLeave: oe,
    onFocus: X,
    onFocusVisible: le,
    onKeyDown: V,
    onKeyUp: be,
    onMouseDown: fe,
    onMouseLeave: et,
    onMouseUp: _,
    onTouchEnd: se,
    onTouchMove: ke,
    onTouchStart: ve,
    tabIndex: pe = 0,
    TouchRippleProps: Re,
    touchRippleRef: lt,
    type: Qe,
    ...Et
  } = v, ge = ct.useRef(null), ze = AU(), Y = tR(ze.ref, lt), [de, Ne] = ct.useState(!1);
  k && de && Ne(!1), ct.useImperativeHandle(m, () => ({
    focusVisible: () => {
      Ne(!0), ge.current.focus();
    }
  }), []);
  const Xe = ze.shouldMount && !A && !k;
  ct.useEffect(() => {
    de && z && !A && ze.pulsate();
  }, [A, z, de, ze]);
  function Pe(te, Ve, Tt = O) {
    return Og((Bt) => (Ve && Ve(Bt), Tt || ze[te](Bt), !0));
  }
  const yt = Pe("start", fe), Ie = Pe("stop", ce), ut = Pe("stop", oe), rt = Pe("stop", _), pt = Pe("stop", (te) => {
    de && te.preventDefault(), et && et(te);
  }), gt = Pe("start", ve), Ut = Pe("stop", se), we = Pe("stop", ke), Ft = Pe("stop", (te) => {
    rR(te.target) || Ne(!1), B && B(te);
  }, !1), Le = Og((te) => {
    ge.current || (ge.current = te.currentTarget), rR(te.target) && (Ne(!0), le && le(te)), X && X(te);
  }), Xt = () => {
    const te = ge.current;
    return w && w !== "button" && !(te.tagName === "A" && te.href);
  }, mn = Og((te) => {
    z && !te.repeat && de && te.key === " " && ze.stop(te, () => {
      ze.start(te);
    }), te.target === te.currentTarget && Xt() && te.key === " " && te.preventDefault(), V && V(te), te.target === te.currentTarget && Xt() && te.key === "Enter" && !k && (te.preventDefault(), F && F(te));
  }), Nn = Og((te) => {
    z && te.key === " " && de && !te.defaultPrevented && ze.stop(te, () => {
      ze.pulsate(te);
    }), be && be(te), F && te.target === te.currentTarget && Xt() && te.key === " " && !te.defaultPrevented && F(te);
  });
  let N = w;
  N === "button" && (Et.href || Et.to) && (N = I);
  const G = {};
  N === "button" ? (G.type = Qe === void 0 ? "button" : Qe, G.disabled = k) : (!Et.href && !Et.to && (G.role = "button"), k && (G["aria-disabled"] = k));
  const ne = tR(c, ge), _e = {
    ...v,
    centerRipple: S,
    component: w,
    disabled: k,
    disableRipple: A,
    disableTouchRipple: O,
    focusRipple: z,
    tabIndex: pe,
    focusVisible: de
  }, Te = KU(_e);
  return /* @__PURE__ */ ht.jsxs(XU, {
    as: N,
    className: or(Te.root, T),
    ownerState: _e,
    onBlur: Ft,
    onClick: F,
    onContextMenu: Ie,
    onFocus: Le,
    onKeyDown: mn,
    onKeyUp: Nn,
    onMouseDown: yt,
    onMouseLeave: pt,
    onMouseUp: rt,
    onDragLeave: ut,
    onTouchEnd: Ut,
    onTouchMove: we,
    onTouchStart: gt,
    ref: ne,
    tabIndex: k ? -1 : pe,
    type: Qe,
    ...G,
    ...Et,
    children: [y, Xe ? /* @__PURE__ */ ht.jsx(s_, {
      ref: Y,
      center: S,
      ...Re
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (zC.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: Oz,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: D.bool,
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: kz,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: D.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: D.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: D.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: D.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: D.string,
  /**
   * @ignore
   */
  href: D.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: D.elementType,
  /**
   * @ignore
   */
  onBlur: D.func,
  /**
   * @ignore
   */
  onClick: D.func,
  /**
   * @ignore
   */
  onContextMenu: D.func,
  /**
   * @ignore
   */
  onDragLeave: D.func,
  /**
   * @ignore
   */
  onFocus: D.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: D.func,
  /**
   * @ignore
   */
  onKeyDown: D.func,
  /**
   * @ignore
   */
  onKeyUp: D.func,
  /**
   * @ignore
   */
  onMouseDown: D.func,
  /**
   * @ignore
   */
  onMouseLeave: D.func,
  /**
   * @ignore
   */
  onMouseUp: D.func,
  /**
   * @ignore
   */
  onTouchEnd: D.func,
  /**
   * @ignore
   */
  onTouchMove: D.func,
  /**
   * @ignore
   */
  onTouchStart: D.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object]),
  /**
   * @default 0
   */
  tabIndex: D.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: D.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: D.oneOfType([D.func, D.shape({
    current: D.shape({
      pulsate: D.func.isRequired,
      start: D.func.isRequired,
      stop: D.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: D.oneOfType([D.oneOf(["button", "reset", "submit"]), D.string])
});
function ZU(i) {
  return typeof i.main == "string";
}
function JU(i, s = []) {
  if (!ZU(i))
    return !1;
  for (const c of s)
    if (!i.hasOwnProperty(c) || typeof i[c] != "string")
      return !1;
  return !0;
}
function c_(i = []) {
  return ([, s]) => s && JU(s, i);
}
function e3(i) {
  return $i("MuiButton", i);
}
const _d = el("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), f_ = /* @__PURE__ */ ct.createContext({});
process.env.NODE_ENV !== "production" && (f_.displayName = "ButtonGroupContext");
const d_ = /* @__PURE__ */ ct.createContext(void 0);
process.env.NODE_ENV !== "production" && (d_.displayName = "ButtonGroupButtonContext");
const t3 = (i) => {
  const {
    color: s,
    disableElevation: c,
    fullWidth: v,
    size: m,
    variant: S,
    classes: y
  } = i, T = {
    root: ["root", S, `${S}${Kr(s)}`, `size${Kr(m)}`, `${S}Size${Kr(m)}`, `color${Kr(s)}`, c && "disableElevation", v && "fullWidth"],
    label: ["label"],
    startIcon: ["icon", "startIcon", `iconSize${Kr(m)}`],
    endIcon: ["icon", "endIcon", `iconSize${Kr(m)}`]
  }, w = tl(T, e3, y);
  return {
    ...y,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...w
  };
}, p_ = [{
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
}], n3 = Na(zC, {
  shouldForwardProp: (i) => o_(i) || i === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, s[c.variant], s[`${c.variant}${Kr(c.color)}`], s[`size${Kr(c.size)}`], s[`${c.variant}Size${Kr(c.size)}`], c.color === "inherit" && s.colorInherit, c.disableElevation && s.disableElevation, c.fullWidth && s.fullWidth];
  }
})(ph(({
  theme: i
}) => {
  var v, m;
  const s = i.palette.mode === "light" ? i.palette.grey[300] : i.palette.grey[800], c = i.palette.mode === "light" ? i.palette.grey.A100 : i.palette.grey[700];
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
    [`&.${_d.disabled}`]: {
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
        [`&.${_d.focusVisible}`]: {
          boxShadow: (i.vars || i).shadows[6]
        },
        [`&.${_d.disabled}`]: {
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
        [`&.${_d.disabled}`]: {
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
    }, ...Object.entries(i.palette).filter(c_(["dark", "contrastText"])).map(([S]) => ({
      props: {
        color: S
      },
      style: {
        "--variant-textColor": (i.vars || i).palette[S].main,
        "--variant-outlinedColor": (i.vars || i).palette[S].main,
        "--variant-outlinedBorder": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / 0.5)` : is(i.palette[S].main, 0.5),
        "--variant-containedColor": (i.vars || i).palette[S].contrastText,
        "--variant-containedBg": (i.vars || i).palette[S].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (i.vars || i).palette[S].dark,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : is(i.palette[S].main, i.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (i.vars || i).palette[S].main,
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette[S].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : is(i.palette[S].main, i.palette.action.hoverOpacity)
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
        ) : (m = (v = i.palette).getContrastText) == null ? void 0 : m.call(v, s),
        "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedBg : s,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedHoverBg : c,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : is(i.palette.text.primary, i.palette.action.hoverOpacity),
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : is(i.palette.text.primary, i.palette.action.hoverOpacity)
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
        [`&.${_d.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${_d.disabled}`]: {
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
})), r3 = Na("span", {
  name: "MuiButton",
  slot: "StartIcon",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.startIcon, s[`iconSize${Kr(c.size)}`]];
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
  }, ...p_]
}), a3 = Na("span", {
  name: "MuiButton",
  slot: "EndIcon",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.endIcon, s[`iconSize${Kr(c.size)}`]];
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
  }, ...p_]
}), eh = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = ct.useContext(f_), m = ct.useContext(d_), S = oh(v, s), y = nl({
    props: S,
    name: "MuiButton"
  }), {
    children: T,
    color: w = "primary",
    component: k = "button",
    className: A,
    disabled: O = !1,
    disableElevation: z = !1,
    disableFocusRipple: H = !1,
    endIcon: I,
    focusVisibleClassName: B,
    fullWidth: F = !1,
    size: ce = "medium",
    startIcon: oe,
    type: X,
    variant: le = "text",
    ...V
  } = y, be = {
    ...y,
    color: w,
    component: k,
    disabled: O,
    disableElevation: z,
    disableFocusRipple: H,
    fullWidth: F,
    size: ce,
    type: X,
    variant: le
  }, fe = t3(be), et = oe && /* @__PURE__ */ ht.jsx(r3, {
    className: fe.startIcon,
    ownerState: be,
    children: oe
  }), _ = I && /* @__PURE__ */ ht.jsx(a3, {
    className: fe.endIcon,
    ownerState: be,
    children: I
  }), se = m || "";
  return /* @__PURE__ */ ht.jsxs(n3, {
    ownerState: be,
    className: or(v.className, fe.root, A, se),
    component: k,
    disabled: O,
    focusRipple: !H,
    focusVisibleClassName: or(fe.focusVisible, B),
    ref: c,
    type: X,
    ...V,
    classes: fe,
    children: [et, T, _]
  });
});
process.env.NODE_ENV !== "production" && (eh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: D.oneOfType([D.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), D.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: D.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: D.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: D.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: D.bool,
  /**
   * Element placed after the children.
   */
  endIcon: D.node,
  /**
   * @ignore
   */
  focusVisibleClassName: D.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: D.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: D.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: D.oneOfType([D.oneOf(["small", "medium", "large"]), D.string]),
  /**
   * Element placed before the children.
   */
  startIcon: D.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object]),
  /**
   * @ignore
   */
  type: D.oneOfType([D.oneOf(["button", "reset", "submit"]), D.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: D.oneOfType([D.oneOf(["contained", "outlined", "text"]), D.string])
});
const i3 = () => /* @__PURE__ */ ht.jsxs(l_, { spacing: 2, direction: "row", children: [
  /* @__PURE__ */ ht.jsx(eh, { variant: "text", children: "Text" }),
  /* @__PURE__ */ ht.jsx(eh, { variant: "contained", children: "Contained" }),
  /* @__PURE__ */ ht.jsx(eh, { variant: "outlined", children: "Outlined" })
] });
var vh = (i) => i.type === "checkbox", Od = (i) => i instanceof Date, Ma = (i) => i == null;
const v_ = (i) => typeof i == "object";
var gr = (i) => !Ma(i) && !Array.isArray(i) && v_(i) && !Od(i), o3 = (i) => gr(i) && i.target ? vh(i.target) ? i.target.checked : i.target.value : i, l3 = (i) => i.substring(0, i.search(/\.\d+(\.|$)/)) || i, u3 = (i, s) => i.has(l3(s)), s3 = (i) => {
  const s = i.constructor && i.constructor.prototype;
  return gr(s) && s.hasOwnProperty("isPrototypeOf");
}, UC = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function yi(i) {
  let s;
  const c = Array.isArray(i);
  if (i instanceof Date)
    s = new Date(i);
  else if (i instanceof Set)
    s = new Set(i);
  else if (!(UC && (i instanceof Blob || i instanceof FileList)) && (c || gr(i)))
    if (s = c ? [] : {}, !c && !s3(i))
      s = i;
    else
      for (const v in i)
        i.hasOwnProperty(v) && (s[v] = yi(i[v]));
  else
    return i;
  return s;
}
var u0 = (i) => Array.isArray(i) ? i.filter(Boolean) : [], ir = (i) => i === void 0, Ke = (i, s, c) => {
  if (!s || !gr(i))
    return c;
  const v = u0(s.split(/[,[\].]+?/)).reduce((m, S) => Ma(m) ? m : m[S], i);
  return ir(v) || v === i ? ir(i[s]) ? c : i[s] : v;
}, Qo = (i) => typeof i == "boolean", FC = (i) => /^\w*$/.test(i), h_ = (i) => u0(i.replace(/["|']|\]/g, "").split(/\.|\[/)), An = (i, s, c) => {
  let v = -1;
  const m = FC(s) ? [s] : h_(s), S = m.length, y = S - 1;
  for (; ++v < S; ) {
    const T = m[v];
    let w = c;
    if (v !== y) {
      const k = i[T];
      w = gr(k) || Array.isArray(k) ? k : isNaN(+m[v + 1]) ? {} : [];
    }
    if (T === "__proto__")
      return;
    i[T] = w, i = i[T];
  }
  return i;
};
const pR = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, ho = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, Gl = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, c3 = xn.createContext(null), f3 = () => xn.useContext(c3);
var d3 = (i, s, c, v = !0) => {
  const m = {
    defaultValues: s._defaultValues
  };
  for (const S in i)
    Object.defineProperty(m, S, {
      get: () => {
        const y = S;
        return s._proxyFormState[y] !== ho.all && (s._proxyFormState[y] = !v || ho.all), i[y];
      }
    });
  return m;
}, ai = (i) => gr(i) && !Object.keys(i).length, p3 = (i, s, c, v) => {
  c(i);
  const { name: m, ...S } = i;
  return ai(S) || Object.keys(S).length >= Object.keys(s).length || Object.keys(S).find((y) => s[y] === ho.all);
}, th = (i) => Array.isArray(i) ? i : [i], v3 = (i, s, c) => !i || !s || i === s || th(i).some((v) => v && (c ? v === s : v.startsWith(s) || s.startsWith(v)));
function m_(i) {
  const s = xn.useRef(i);
  s.current = i, xn.useEffect(() => {
    const c = !i.disabled && s.current.subject && s.current.subject.subscribe({
      next: s.current.next
    });
    return () => {
      c && c.unsubscribe();
    };
  }, [i.disabled]);
}
var Zo = (i) => typeof i == "string", y_ = (i, s, c, v, m) => Zo(i) ? (v && s.watch.add(i), Ke(c, i, m)) : Array.isArray(i) ? i.map((S) => (v && s.watch.add(S), Ke(c, S))) : (v && (s.watchAll = !0), c);
function h3(i) {
  const s = f3(), { control: c = s.control, name: v, defaultValue: m, disabled: S, exact: y } = i || {}, T = xn.useRef(v);
  T.current = v, m_({
    disabled: S,
    subject: c._subjects.values,
    next: (A) => {
      v3(T.current, A.name, y) && k(yi(y_(T.current, c._names, A.values || c._formValues, !1, m)));
    }
  });
  const [w, k] = xn.useState(c._getWatch(v, m));
  return xn.useEffect(() => c._removeUnmounted()), w;
}
var m3 = (i, s, c, v, m) => s ? {
  ...c[i],
  types: {
    ...c[i] && c[i].types ? c[i].types : {},
    [v]: m || !0
  }
} : {}, vR = (i) => ({
  isOnSubmit: !i || i === ho.onSubmit,
  isOnBlur: i === ho.onBlur,
  isOnChange: i === ho.onChange,
  isOnAll: i === ho.all,
  isOnTouch: i === ho.onTouched
}), hR = (i, s, c) => !c && (s.watchAll || s.watch.has(i) || [...s.watch].some((v) => i.startsWith(v) && /^\.\w+/.test(i.slice(v.length))));
const nh = (i, s, c, v) => {
  for (const m of c || Object.keys(i)) {
    const S = Ke(i, m);
    if (S) {
      const { _f: y, ...T } = S;
      if (y) {
        if (y.refs && y.refs[0] && s(y.refs[0], m) && !v)
          return !0;
        if (y.ref && s(y.ref, y.name) && !v)
          return !0;
        if (nh(T, s))
          break;
      } else if (gr(T) && nh(T, s))
        break;
    }
  }
};
var y3 = (i, s, c) => {
  const v = th(Ke(i, c));
  return An(v, "root", s[c]), An(i, c, v), i;
}, PC = (i) => i.type === "file", Ql = (i) => typeof i == "function", Bg = (i) => {
  if (!UC)
    return !1;
  const s = i ? i.ownerDocument : 0;
  return i instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
}, Fg = (i) => Zo(i), jC = (i) => i.type === "radio", Hg = (i) => i instanceof RegExp;
const mR = {
  value: !1,
  isValid: !1
}, yR = { value: !0, isValid: !0 };
var g_ = (i) => {
  if (Array.isArray(i)) {
    if (i.length > 1) {
      const s = i.filter((c) => c && c.checked && !c.disabled).map((c) => c.value);
      return { value: s, isValid: !!s.length };
    }
    return i[0].checked && !i[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      i[0].attributes && !ir(i[0].attributes.value) ? ir(i[0].value) || i[0].value === "" ? yR : { value: i[0].value, isValid: !0 } : yR
    ) : mR;
  }
  return mR;
};
const gR = {
  isValid: !1,
  value: null
};
var S_ = (i) => Array.isArray(i) ? i.reduce((s, c) => c && c.checked && !c.disabled ? {
  isValid: !0,
  value: c.value
} : s, gR) : gR;
function SR(i, s, c = "validate") {
  if (Fg(i) || Array.isArray(i) && i.every(Fg) || Qo(i) && !i)
    return {
      type: c,
      message: Fg(i) ? i : "",
      ref: s
    };
}
var kd = (i) => gr(i) && !Hg(i) ? i : {
  value: i,
  message: ""
}, bR = async (i, s, c, v, m) => {
  const { ref: S, refs: y, required: T, maxLength: w, minLength: k, min: A, max: O, pattern: z, validate: H, name: I, valueAsNumber: B, mount: F, disabled: ce } = i._f, oe = Ke(s, I);
  if (!F || ce)
    return {};
  const X = y ? y[0] : S, le = (ve) => {
    v && X.reportValidity && (X.setCustomValidity(Qo(ve) ? "" : ve || ""), X.reportValidity());
  }, V = {}, be = jC(S), fe = vh(S), et = be || fe, _ = (B || PC(S)) && ir(S.value) && ir(oe) || Bg(S) && S.value === "" || oe === "" || Array.isArray(oe) && !oe.length, se = m3.bind(null, I, c, V), ke = (ve, pe, Re, lt = Gl.maxLength, Qe = Gl.minLength) => {
    const Et = ve ? pe : Re;
    V[I] = {
      type: ve ? lt : Qe,
      message: Et,
      ref: S,
      ...se(ve ? lt : Qe, Et)
    };
  };
  if (m ? !Array.isArray(oe) || !oe.length : T && (!et && (_ || Ma(oe)) || Qo(oe) && !oe || fe && !g_(y).isValid || be && !S_(y).isValid)) {
    const { value: ve, message: pe } = Fg(T) ? { value: !!T, message: T } : kd(T);
    if (ve && (V[I] = {
      type: Gl.required,
      message: pe,
      ref: X,
      ...se(Gl.required, pe)
    }, !c))
      return le(pe), V;
  }
  if (!_ && (!Ma(A) || !Ma(O))) {
    let ve, pe;
    const Re = kd(O), lt = kd(A);
    if (!Ma(oe) && !isNaN(oe)) {
      const Qe = S.valueAsNumber || oe && +oe;
      Ma(Re.value) || (ve = Qe > Re.value), Ma(lt.value) || (pe = Qe < lt.value);
    } else {
      const Qe = S.valueAsDate || new Date(oe), Et = (Y) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + Y), ge = S.type == "time", ze = S.type == "week";
      Zo(Re.value) && oe && (ve = ge ? Et(oe) > Et(Re.value) : ze ? oe > Re.value : Qe > new Date(Re.value)), Zo(lt.value) && oe && (pe = ge ? Et(oe) < Et(lt.value) : ze ? oe < lt.value : Qe < new Date(lt.value));
    }
    if ((ve || pe) && (ke(!!ve, Re.message, lt.message, Gl.max, Gl.min), !c))
      return le(V[I].message), V;
  }
  if ((w || k) && !_ && (Zo(oe) || m && Array.isArray(oe))) {
    const ve = kd(w), pe = kd(k), Re = !Ma(ve.value) && oe.length > +ve.value, lt = !Ma(pe.value) && oe.length < +pe.value;
    if ((Re || lt) && (ke(Re, ve.message, pe.message), !c))
      return le(V[I].message), V;
  }
  if (z && !_ && Zo(oe)) {
    const { value: ve, message: pe } = kd(z);
    if (Hg(ve) && !oe.match(ve) && (V[I] = {
      type: Gl.pattern,
      message: pe,
      ref: S,
      ...se(Gl.pattern, pe)
    }, !c))
      return le(pe), V;
  }
  if (H) {
    if (Ql(H)) {
      const ve = await H(oe, s), pe = SR(ve, X);
      if (pe && (V[I] = {
        ...pe,
        ...se(Gl.validate, pe.message)
      }, !c))
        return le(pe.message), V;
    } else if (gr(H)) {
      let ve = {};
      for (const pe in H) {
        if (!ai(ve) && !c)
          break;
        const Re = SR(await H[pe](oe, s), X, pe);
        Re && (ve = {
          ...Re,
          ...se(pe, Re.message)
        }, le(Re.message), c && (V[I] = ve));
      }
      if (!ai(ve) && (V[I] = {
        ref: X,
        ...ve
      }, !c))
        return V;
    }
  }
  return le(!0), V;
};
function g3(i, s) {
  const c = s.slice(0, -1).length;
  let v = 0;
  for (; v < c; )
    i = ir(i) ? v++ : i[s[v++]];
  return i;
}
function S3(i) {
  for (const s in i)
    if (i.hasOwnProperty(s) && !ir(i[s]))
      return !1;
  return !0;
}
function Dr(i, s) {
  const c = Array.isArray(s) ? s : FC(s) ? [s] : h_(s), v = c.length === 1 ? i : g3(i, c), m = c.length - 1, S = c[m];
  return v && delete v[S], m !== 0 && (gr(v) && ai(v) || Array.isArray(v) && S3(v)) && Dr(i, c.slice(0, -1)), i;
}
var J1 = () => {
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
}, Ig = (i) => Ma(i) || !v_(i);
function os(i, s) {
  if (Ig(i) || Ig(s))
    return i === s;
  if (Od(i) && Od(s))
    return i.getTime() === s.getTime();
  const c = Object.keys(i), v = Object.keys(s);
  if (c.length !== v.length)
    return !1;
  for (const m of c) {
    const S = i[m];
    if (!v.includes(m))
      return !1;
    if (m !== "ref") {
      const y = s[m];
      if (Od(S) && Od(y) || gr(S) && gr(y) || Array.isArray(S) && Array.isArray(y) ? !os(S, y) : S !== y)
        return !1;
    }
  }
  return !0;
}
var b_ = (i) => i.type === "select-multiple", b3 = (i) => jC(i) || vh(i), eC = (i) => Bg(i) && i.isConnected, C_ = (i) => {
  for (const s in i)
    if (Ql(i[s]))
      return !0;
  return !1;
};
function Yg(i, s = {}) {
  const c = Array.isArray(i);
  if (gr(i) || c)
    for (const v in i)
      Array.isArray(i[v]) || gr(i[v]) && !C_(i[v]) ? (s[v] = Array.isArray(i[v]) ? [] : {}, Yg(i[v], s[v])) : Ma(i[v]) || (s[v] = !0);
  return s;
}
function E_(i, s, c) {
  const v = Array.isArray(i);
  if (gr(i) || v)
    for (const m in i)
      Array.isArray(i[m]) || gr(i[m]) && !C_(i[m]) ? ir(s) || Ig(c[m]) ? c[m] = Array.isArray(i[m]) ? Yg(i[m], []) : { ...Yg(i[m]) } : E_(i[m], Ma(s) ? {} : s[m], c[m]) : c[m] = !os(i[m], s[m]);
  return c;
}
var Dg = (i, s) => E_(i, s, Yg(s)), T_ = (i, { valueAsNumber: s, valueAsDate: c, setValueAs: v }) => ir(i) ? i : s ? i === "" ? NaN : i && +i : c && Zo(i) ? new Date(i) : v ? v(i) : i;
function tC(i) {
  const s = i.ref;
  if (!(i.refs ? i.refs.every((c) => c.disabled) : s.disabled))
    return PC(s) ? s.files : jC(s) ? S_(i.refs).value : b_(s) ? [...s.selectedOptions].map(({ value: c }) => c) : vh(s) ? g_(i.refs).value : T_(ir(s.value) ? i.ref.value : s.value, i);
}
var C3 = (i, s, c, v) => {
  const m = {};
  for (const S of i) {
    const y = Ke(s, S);
    y && An(m, S, y._f);
  }
  return {
    criteriaMode: c,
    names: [...i],
    fields: m,
    shouldUseNativeValidation: v
  };
}, Kv = (i) => ir(i) ? i : Hg(i) ? i.source : gr(i) ? Hg(i.value) ? i.value.source : i.value : i;
const CR = "AsyncFunction";
var E3 = (i) => (!i || !i.validate) && !!(Ql(i.validate) && i.validate.constructor.name === CR || gr(i.validate) && Object.values(i.validate).find((s) => s.constructor.name === CR)), T3 = (i) => i.mount && (i.required || i.min || i.max || i.maxLength || i.minLength || i.pattern || i.validate);
function ER(i, s, c) {
  const v = Ke(i, c);
  if (v || FC(c))
    return {
      error: v,
      name: c
    };
  const m = c.split(".");
  for (; m.length; ) {
    const S = m.join("."), y = Ke(s, S), T = Ke(i, S);
    if (y && !Array.isArray(y) && c !== S)
      return { name: c };
    if (T && T.type)
      return {
        name: S,
        error: T
      };
    m.pop();
  }
  return {
    name: c
  };
}
var x3 = (i, s, c, v, m) => m.isOnAll ? !1 : !c && m.isOnTouch ? !(s || i) : (c ? v.isOnBlur : m.isOnBlur) ? !i : (c ? v.isOnChange : m.isOnChange) ? i : !0, w3 = (i, s) => !u0(Ke(i, s)).length && Dr(i, s);
const R3 = {
  mode: ho.onSubmit,
  reValidateMode: ho.onChange,
  shouldFocusError: !0
};
function _3(i = {}) {
  let s = {
    ...R3,
    ...i
  }, c = {
    submitCount: 0,
    isDirty: !1,
    isLoading: Ql(s.defaultValues),
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
  }, v = {}, m = gr(s.defaultValues) || gr(s.values) ? yi(s.defaultValues || s.values) || {} : {}, S = s.shouldUnregister ? {} : yi(m), y = {
    action: !1,
    mount: !1,
    watch: !1
  }, T = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, w, k = 0;
  const A = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, O = {
    values: J1(),
    array: J1(),
    state: J1()
  }, z = vR(s.mode), H = vR(s.reValidateMode), I = s.criteriaMode === ho.all, B = (N) => (G) => {
    clearTimeout(k), k = setTimeout(N, G);
  }, F = async (N) => {
    if (A.isValid || N) {
      const G = s.resolver ? ai((await et()).errors) : await se(v, !0);
      G !== c.isValid && O.state.next({
        isValid: G
      });
    }
  }, ce = (N, G) => {
    (A.isValidating || A.validatingFields) && ((N || Array.from(T.mount)).forEach((ne) => {
      ne && (G ? An(c.validatingFields, ne, G) : Dr(c.validatingFields, ne));
    }), O.state.next({
      validatingFields: c.validatingFields,
      isValidating: !ai(c.validatingFields)
    }));
  }, oe = (N, G = [], ne, _e, Te = !0, te = !0) => {
    if (_e && ne) {
      if (y.action = !0, te && Array.isArray(Ke(v, N))) {
        const Ve = ne(Ke(v, N), _e.argA, _e.argB);
        Te && An(v, N, Ve);
      }
      if (te && Array.isArray(Ke(c.errors, N))) {
        const Ve = ne(Ke(c.errors, N), _e.argA, _e.argB);
        Te && An(c.errors, N, Ve), w3(c.errors, N);
      }
      if (A.touchedFields && te && Array.isArray(Ke(c.touchedFields, N))) {
        const Ve = ne(Ke(c.touchedFields, N), _e.argA, _e.argB);
        Te && An(c.touchedFields, N, Ve);
      }
      A.dirtyFields && (c.dirtyFields = Dg(m, S)), O.state.next({
        name: N,
        isDirty: ve(N, G),
        dirtyFields: c.dirtyFields,
        errors: c.errors,
        isValid: c.isValid
      });
    } else
      An(S, N, G);
  }, X = (N, G) => {
    An(c.errors, N, G), O.state.next({
      errors: c.errors
    });
  }, le = (N) => {
    c.errors = N, O.state.next({
      errors: c.errors,
      isValid: !1
    });
  }, V = (N, G, ne, _e) => {
    const Te = Ke(v, N);
    if (Te) {
      const te = Ke(S, N, ir(ne) ? Ke(m, N) : ne);
      ir(te) || _e && _e.defaultChecked || G ? An(S, N, G ? te : tC(Te._f)) : lt(N, te), y.mount && F();
    }
  }, be = (N, G, ne, _e, Te) => {
    let te = !1, Ve = !1;
    const Tt = {
      name: N
    }, Bt = !!(Ke(v, N) && Ke(v, N)._f && Ke(v, N)._f.disabled);
    if (!ne || _e) {
      A.isDirty && (Ve = c.isDirty, c.isDirty = Tt.isDirty = ve(), te = Ve !== Tt.isDirty);
      const Dt = Bt || os(Ke(m, N), G);
      Ve = !!(!Bt && Ke(c.dirtyFields, N)), Dt || Bt ? Dr(c.dirtyFields, N) : An(c.dirtyFields, N, !0), Tt.dirtyFields = c.dirtyFields, te = te || A.dirtyFields && Ve !== !Dt;
    }
    if (ne) {
      const Dt = Ke(c.touchedFields, N);
      Dt || (An(c.touchedFields, N, ne), Tt.touchedFields = c.touchedFields, te = te || A.touchedFields && Dt !== ne);
    }
    return te && Te && O.state.next(Tt), te ? Tt : {};
  }, fe = (N, G, ne, _e) => {
    const Te = Ke(c.errors, N), te = A.isValid && Qo(G) && c.isValid !== G;
    if (i.delayError && ne ? (w = B(() => X(N, ne)), w(i.delayError)) : (clearTimeout(k), w = null, ne ? An(c.errors, N, ne) : Dr(c.errors, N)), (ne ? !os(Te, ne) : Te) || !ai(_e) || te) {
      const Ve = {
        ..._e,
        ...te && Qo(G) ? { isValid: G } : {},
        errors: c.errors,
        name: N
      };
      c = {
        ...c,
        ...Ve
      }, O.state.next(Ve);
    }
  }, et = async (N) => {
    ce(N, !0);
    const G = await s.resolver(S, s.context, C3(N || T.mount, v, s.criteriaMode, s.shouldUseNativeValidation));
    return ce(N), G;
  }, _ = async (N) => {
    const { errors: G } = await et(N);
    if (N)
      for (const ne of N) {
        const _e = Ke(G, ne);
        _e ? An(c.errors, ne, _e) : Dr(c.errors, ne);
      }
    else
      c.errors = G;
    return G;
  }, se = async (N, G, ne = {
    valid: !0
  }) => {
    for (const _e in N) {
      const Te = N[_e];
      if (Te) {
        const { _f: te, ...Ve } = Te;
        if (te) {
          const Tt = T.array.has(te.name), Bt = Te._f && E3(Te._f);
          Bt && A.validatingFields && ce([_e], !0);
          const Dt = await bR(Te, S, I, s.shouldUseNativeValidation && !G, Tt);
          if (Bt && A.validatingFields && ce([_e]), Dt[te.name] && (ne.valid = !1, G))
            break;
          !G && (Ke(Dt, te.name) ? Tt ? y3(c.errors, Dt, te.name) : An(c.errors, te.name, Dt[te.name]) : Dr(c.errors, te.name));
        }
        !ai(Ve) && await se(Ve, G, ne);
      }
    }
    return ne.valid;
  }, ke = () => {
    for (const N of T.unMount) {
      const G = Ke(v, N);
      G && (G._f.refs ? G._f.refs.every((ne) => !eC(ne)) : !eC(G._f.ref)) && Ie(N);
    }
    T.unMount = /* @__PURE__ */ new Set();
  }, ve = (N, G) => (N && G && An(S, N, G), !os(de(), m)), pe = (N, G, ne) => y_(N, T, {
    ...y.mount ? S : ir(G) ? m : Zo(N) ? { [N]: G } : G
  }, ne, G), Re = (N) => u0(Ke(y.mount ? S : m, N, i.shouldUnregister ? Ke(m, N, []) : [])), lt = (N, G, ne = {}) => {
    const _e = Ke(v, N);
    let Te = G;
    if (_e) {
      const te = _e._f;
      te && (!te.disabled && An(S, N, T_(G, te)), Te = Bg(te.ref) && Ma(G) ? "" : G, b_(te.ref) ? [...te.ref.options].forEach((Ve) => Ve.selected = Te.includes(Ve.value)) : te.refs ? vh(te.ref) ? te.refs.length > 1 ? te.refs.forEach((Ve) => (!Ve.defaultChecked || !Ve.disabled) && (Ve.checked = Array.isArray(Te) ? !!Te.find((Tt) => Tt === Ve.value) : Te === Ve.value)) : te.refs[0] && (te.refs[0].checked = !!Te) : te.refs.forEach((Ve) => Ve.checked = Ve.value === Te) : PC(te.ref) ? te.ref.value = "" : (te.ref.value = Te, te.ref.type || O.values.next({
        name: N,
        values: { ...S }
      })));
    }
    (ne.shouldDirty || ne.shouldTouch) && be(N, Te, ne.shouldTouch, ne.shouldDirty, !0), ne.shouldValidate && Y(N);
  }, Qe = (N, G, ne) => {
    for (const _e in G) {
      const Te = G[_e], te = `${N}.${_e}`, Ve = Ke(v, te);
      (T.array.has(N) || !Ig(Te) || Ve && !Ve._f) && !Od(Te) ? Qe(te, Te, ne) : lt(te, Te, ne);
    }
  }, Et = (N, G, ne = {}) => {
    const _e = Ke(v, N), Te = T.array.has(N), te = yi(G);
    An(S, N, te), Te ? (O.array.next({
      name: N,
      values: { ...S }
    }), (A.isDirty || A.dirtyFields) && ne.shouldDirty && O.state.next({
      name: N,
      dirtyFields: Dg(m, S),
      isDirty: ve(N, te)
    })) : _e && !_e._f && !Ma(te) ? Qe(N, te, ne) : lt(N, te, ne), hR(N, T) && O.state.next({ ...c }), O.values.next({
      name: y.mount ? N : void 0,
      values: { ...S }
    });
  }, ge = async (N) => {
    y.mount = !0;
    const G = N.target;
    let ne = G.name, _e = !0;
    const Te = Ke(v, ne), te = () => G.type ? tC(Te._f) : o3(N), Ve = (Tt) => {
      _e = Number.isNaN(Tt) || os(Tt, Ke(S, ne, Tt));
    };
    if (Te) {
      let Tt, Bt;
      const Dt = te(), jn = N.type === pR.BLUR || N.type === pR.FOCUS_OUT, bi = !T3(Te._f) && !s.resolver && !Ke(c.errors, ne) && !Te._f.deps || x3(jn, Ke(c.touchedFields, ne), c.isSubmitted, H, z), Pr = hR(ne, T, jn);
      An(S, ne, Dt), jn ? (Te._f.onBlur && Te._f.onBlur(N), w && w(0)) : Te._f.onChange && Te._f.onChange(N);
      const Oe = be(ne, Dt, jn, !1), at = !ai(Oe) || Pr;
      if (!jn && O.values.next({
        name: ne,
        type: N.type,
        values: { ...S }
      }), bi)
        return A.isValid && (i.mode === "onBlur" ? jn && F() : F()), at && O.state.next({ name: ne, ...Pr ? {} : Oe });
      if (!jn && Pr && O.state.next({ ...c }), s.resolver) {
        const { errors: Ot } = await et([ne]);
        if (Ve(Dt), _e) {
          const Wt = ER(c.errors, v, ne), dn = ER(Ot, v, Wt.name || ne);
          Tt = dn.error, ne = dn.name, Bt = ai(Ot);
        }
      } else
        ce([ne], !0), Tt = (await bR(Te, S, I, s.shouldUseNativeValidation))[ne], ce([ne]), Ve(Dt), _e && (Tt ? Bt = !1 : A.isValid && (Bt = await se(v, !0)));
      _e && (Te._f.deps && Y(Te._f.deps), fe(ne, Bt, Tt, Oe));
    }
  }, ze = (N, G) => {
    if (Ke(c.errors, G) && N.focus)
      return N.focus(), 1;
  }, Y = async (N, G = {}) => {
    let ne, _e;
    const Te = th(N);
    if (s.resolver) {
      const te = await _(ir(N) ? N : Te);
      ne = ai(te), _e = N ? !Te.some((Ve) => Ke(te, Ve)) : ne;
    } else N ? (_e = (await Promise.all(Te.map(async (te) => {
      const Ve = Ke(v, te);
      return await se(Ve && Ve._f ? { [te]: Ve } : Ve);
    }))).every(Boolean), !(!_e && !c.isValid) && F()) : _e = ne = await se(v);
    return O.state.next({
      ...!Zo(N) || A.isValid && ne !== c.isValid ? {} : { name: N },
      ...s.resolver || !N ? { isValid: ne } : {},
      errors: c.errors
    }), G.shouldFocus && !_e && nh(v, ze, N ? Te : T.mount), _e;
  }, de = (N) => {
    const G = {
      ...y.mount ? S : m
    };
    return ir(N) ? G : Zo(N) ? Ke(G, N) : N.map((ne) => Ke(G, ne));
  }, Ne = (N, G) => ({
    invalid: !!Ke((G || c).errors, N),
    isDirty: !!Ke((G || c).dirtyFields, N),
    error: Ke((G || c).errors, N),
    isValidating: !!Ke(c.validatingFields, N),
    isTouched: !!Ke((G || c).touchedFields, N)
  }), Xe = (N) => {
    N && th(N).forEach((G) => Dr(c.errors, G)), O.state.next({
      errors: N ? c.errors : {}
    });
  }, Pe = (N, G, ne) => {
    const _e = (Ke(v, N, { _f: {} })._f || {}).ref, Te = Ke(c.errors, N) || {}, { ref: te, message: Ve, type: Tt, ...Bt } = Te;
    An(c.errors, N, {
      ...Bt,
      ...G,
      ref: _e
    }), O.state.next({
      name: N,
      errors: c.errors,
      isValid: !1
    }), ne && ne.shouldFocus && _e && _e.focus && _e.focus();
  }, yt = (N, G) => Ql(N) ? O.values.subscribe({
    next: (ne) => N(pe(void 0, G), ne)
  }) : pe(N, G, !0), Ie = (N, G = {}) => {
    for (const ne of N ? th(N) : T.mount)
      T.mount.delete(ne), T.array.delete(ne), G.keepValue || (Dr(v, ne), Dr(S, ne)), !G.keepError && Dr(c.errors, ne), !G.keepDirty && Dr(c.dirtyFields, ne), !G.keepTouched && Dr(c.touchedFields, ne), !G.keepIsValidating && Dr(c.validatingFields, ne), !s.shouldUnregister && !G.keepDefaultValue && Dr(m, ne);
    O.values.next({
      values: { ...S }
    }), O.state.next({
      ...c,
      ...G.keepDirty ? { isDirty: ve() } : {}
    }), !G.keepIsValid && F();
  }, ut = ({ disabled: N, name: G, field: ne, fields: _e, value: Te }) => {
    if (Qo(N) && y.mount || N) {
      const te = N ? void 0 : ir(Te) ? tC(ne ? ne._f : Ke(_e, G)._f) : Te;
      An(S, G, te), be(G, te, !1, !1, !0);
    }
  }, rt = (N, G = {}) => {
    let ne = Ke(v, N);
    const _e = Qo(G.disabled) || Qo(i.disabled);
    return An(v, N, {
      ...ne || {},
      _f: {
        ...ne && ne._f ? ne._f : { ref: { name: N } },
        name: N,
        mount: !0,
        ...G
      }
    }), T.mount.add(N), ne ? ut({
      field: ne,
      disabled: Qo(G.disabled) ? G.disabled : i.disabled,
      name: N,
      value: G.value
    }) : V(N, !0, G.value), {
      ..._e ? { disabled: G.disabled || i.disabled } : {},
      ...s.progressive ? {
        required: !!G.required,
        min: Kv(G.min),
        max: Kv(G.max),
        minLength: Kv(G.minLength),
        maxLength: Kv(G.maxLength),
        pattern: Kv(G.pattern)
      } : {},
      name: N,
      onChange: ge,
      onBlur: ge,
      ref: (Te) => {
        if (Te) {
          rt(N, G), ne = Ke(v, N);
          const te = ir(Te.value) && Te.querySelectorAll && Te.querySelectorAll("input,select,textarea")[0] || Te, Ve = b3(te), Tt = ne._f.refs || [];
          if (Ve ? Tt.find((Bt) => Bt === te) : te === ne._f.ref)
            return;
          An(v, N, {
            _f: {
              ...ne._f,
              ...Ve ? {
                refs: [
                  ...Tt.filter(eC),
                  te,
                  ...Array.isArray(Ke(m, N)) ? [{}] : []
                ],
                ref: { type: te.type, name: N }
              } : { ref: te }
            }
          }), V(N, !1, void 0, te);
        } else
          ne = Ke(v, N, {}), ne._f && (ne._f.mount = !1), (s.shouldUnregister || G.shouldUnregister) && !(u3(T.array, N) && y.action) && T.unMount.add(N);
      }
    };
  }, pt = () => s.shouldFocusError && nh(v, ze, T.mount), gt = (N) => {
    Qo(N) && (O.state.next({ disabled: N }), nh(v, (G, ne) => {
      const _e = Ke(v, ne);
      _e && (G.disabled = _e._f.disabled || N, Array.isArray(_e._f.refs) && _e._f.refs.forEach((Te) => {
        Te.disabled = _e._f.disabled || N;
      }));
    }, 0, !1));
  }, Ut = (N, G) => async (ne) => {
    let _e;
    ne && (ne.preventDefault && ne.preventDefault(), ne.persist && ne.persist());
    let Te = yi(S);
    if (O.state.next({
      isSubmitting: !0
    }), s.resolver) {
      const { errors: te, values: Ve } = await et();
      c.errors = te, Te = Ve;
    } else
      await se(v);
    if (Dr(c.errors, "root"), ai(c.errors)) {
      O.state.next({
        errors: {}
      });
      try {
        await N(Te, ne);
      } catch (te) {
        _e = te;
      }
    } else
      G && await G({ ...c.errors }, ne), pt(), setTimeout(pt);
    if (O.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: ai(c.errors) && !_e,
      submitCount: c.submitCount + 1,
      errors: c.errors
    }), _e)
      throw _e;
  }, we = (N, G = {}) => {
    Ke(v, N) && (ir(G.defaultValue) ? Et(N, yi(Ke(m, N))) : (Et(N, G.defaultValue), An(m, N, yi(G.defaultValue))), G.keepTouched || Dr(c.touchedFields, N), G.keepDirty || (Dr(c.dirtyFields, N), c.isDirty = G.defaultValue ? ve(N, yi(Ke(m, N))) : ve()), G.keepError || (Dr(c.errors, N), A.isValid && F()), O.state.next({ ...c }));
  }, Ft = (N, G = {}) => {
    const ne = N ? yi(N) : m, _e = yi(ne), Te = ai(N), te = Te ? m : _e;
    if (G.keepDefaultValues || (m = ne), !G.keepValues) {
      if (G.keepDirtyValues)
        for (const Ve of T.mount)
          Ke(c.dirtyFields, Ve) ? An(te, Ve, Ke(S, Ve)) : Et(Ve, Ke(te, Ve));
      else {
        if (UC && ir(N))
          for (const Ve of T.mount) {
            const Tt = Ke(v, Ve);
            if (Tt && Tt._f) {
              const Bt = Array.isArray(Tt._f.refs) ? Tt._f.refs[0] : Tt._f.ref;
              if (Bg(Bt)) {
                const Dt = Bt.closest("form");
                if (Dt) {
                  Dt.reset();
                  break;
                }
              }
            }
          }
        v = {};
      }
      S = i.shouldUnregister ? G.keepDefaultValues ? yi(m) : {} : yi(te), O.array.next({
        values: { ...te }
      }), O.values.next({
        values: { ...te }
      });
    }
    T = {
      mount: G.keepDirtyValues ? T.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, y.mount = !A.isValid || !!G.keepIsValid || !!G.keepDirtyValues, y.watch = !!i.shouldUnregister, O.state.next({
      submitCount: G.keepSubmitCount ? c.submitCount : 0,
      isDirty: Te ? !1 : G.keepDirty ? c.isDirty : !!(G.keepDefaultValues && !os(N, m)),
      isSubmitted: G.keepIsSubmitted ? c.isSubmitted : !1,
      dirtyFields: Te ? {} : G.keepDirtyValues ? G.keepDefaultValues && S ? Dg(m, S) : c.dirtyFields : G.keepDefaultValues && N ? Dg(m, N) : G.keepDirty ? c.dirtyFields : {},
      touchedFields: G.keepTouched ? c.touchedFields : {},
      errors: G.keepErrors ? c.errors : {},
      isSubmitSuccessful: G.keepIsSubmitSuccessful ? c.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, Le = (N, G) => Ft(Ql(N) ? N(S) : N, G);
  return {
    control: {
      register: rt,
      unregister: Ie,
      getFieldState: Ne,
      handleSubmit: Ut,
      setError: Pe,
      _executeSchema: et,
      _getWatch: pe,
      _getDirty: ve,
      _updateValid: F,
      _removeUnmounted: ke,
      _updateFieldArray: oe,
      _updateDisabledField: ut,
      _getFieldArray: Re,
      _reset: Ft,
      _resetDefaultValues: () => Ql(s.defaultValues) && s.defaultValues().then((N) => {
        Le(N, s.resetOptions), O.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (N) => {
        c = {
          ...c,
          ...N
        };
      },
      _disableForm: gt,
      _subjects: O,
      _proxyFormState: A,
      _setErrors: le,
      get _fields() {
        return v;
      },
      get _formValues() {
        return S;
      },
      get _state() {
        return y;
      },
      set _state(N) {
        y = N;
      },
      get _defaultValues() {
        return m;
      },
      get _names() {
        return T;
      },
      set _names(N) {
        T = N;
      },
      get _formState() {
        return c;
      },
      set _formState(N) {
        c = N;
      },
      get _options() {
        return s;
      },
      set _options(N) {
        s = {
          ...s,
          ...N
        };
      }
    },
    trigger: Y,
    register: rt,
    handleSubmit: Ut,
    watch: yt,
    setValue: Et,
    getValues: de,
    reset: Le,
    resetField: we,
    clearErrors: Xe,
    unregister: Ie,
    setError: Pe,
    setFocus: (N, G = {}) => {
      const ne = Ke(v, N), _e = ne && ne._f;
      if (_e) {
        const Te = _e.refs ? _e.refs[0] : _e.ref;
        Te.focus && (Te.focus(), G.shouldSelect && Te.select());
      }
    },
    getFieldState: Ne
  };
}
function k3(i = {}) {
  const s = xn.useRef(), c = xn.useRef(), [v, m] = xn.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: Ql(i.defaultValues),
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
    defaultValues: Ql(i.defaultValues) ? void 0 : i.defaultValues
  });
  s.current || (s.current = {
    ..._3(i),
    formState: v
  });
  const S = s.current.control;
  return S._options = i, m_({
    subject: S._subjects.state,
    next: (y) => {
      p3(y, S._proxyFormState, S._updateFormState) && m({ ...S._formState });
    }
  }), xn.useEffect(() => S._disableForm(i.disabled), [S, i.disabled]), xn.useEffect(() => {
    if (S._proxyFormState.isDirty) {
      const y = S._getDirty();
      y !== v.isDirty && S._subjects.state.next({
        isDirty: y
      });
    }
  }, [S, v.isDirty]), xn.useEffect(() => {
    i.values && !os(i.values, c.current) ? (S._reset(i.values, S._options.resetOptions), c.current = i.values, m((y) => ({ ...y }))) : S._resetDefaultValues();
  }, [i.values, S]), xn.useEffect(() => {
    i.errors && S._setErrors(i.errors);
  }, [i.errors, S]), xn.useEffect(() => {
    S._state.mount || (S._updateValid(), S._state.mount = !0), S._state.watch && (S._state.watch = !1, S._subjects.state.next({ ...S._formState })), S._removeUnmounted();
  }), xn.useEffect(() => {
    i.shouldUnregister && S._subjects.values.next({
      values: S._getWatch()
    });
  }, [i.shouldUnregister, S]), s.current.formState = d3(v, S), s.current;
}
const O3 = ({ handleOnSubmit: i }) => {
  const {
    register: s,
    handleSubmit: c,
    formState: { errors: v },
    control: m
  } = k3(), S = (T) => {
    console.log("Internal submit from Form component:", T);
    const w = { type: "onSubmitForm", payload: T };
    window.postMessage(w, window.location.origin), i && i(T);
  }, y = h3({ control: m, name: "name" });
  return xN(() => {
    console.log("useEffect name updated", y);
  }, [y]), /* @__PURE__ */ ht.jsxs("form", { onSubmit: c(S), children: [
    /* @__PURE__ */ ht.jsxs("div", { children: [
      /* @__PURE__ */ ht.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ ht.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...s("name", { required: "Este campo es requerido" })
        }
      ),
      v.name && /* @__PURE__ */ ht.jsx("span", { children: v.name.message })
    ] }),
    /* @__PURE__ */ ht.jsxs("div", { children: [
      /* @__PURE__ */ ht.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ ht.jsx(
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
      v.email && /* @__PURE__ */ ht.jsx("span", { children: v.email.message })
    ] }),
    /* @__PURE__ */ ht.jsx("button", { type: "submit", children: "Enviar" })
  ] });
}, D3 = "_form-container_cx8oy_1", M3 = "_cs-input_cx8oy_49", x_ = {
  "form-container": "_form-container_cx8oy_1",
  formContainer: D3,
  "cs-input": "_cs-input_cx8oy_49",
  csInput: M3
}, A3 = ({
  id: i,
  name: s,
  label: c,
  placeholder: v,
  value: m,
  onChange: S,
  required: y
}) => /* @__PURE__ */ ht.jsxs("div", { className: x_["cs-input"], children: [
  /* @__PURE__ */ ht.jsx(
    "input",
    {
      type: "text",
      id: i,
      name: s,
      placeholder: v,
      value: m,
      onChange: (T) => S && S(T.target.value),
      required: y
    }
  ),
  c && /* @__PURE__ */ ht.jsx("label", { htmlFor: i, style: { marginRight: 8 }, children: c })
] }), N3 = ({
  fields: i,
  // layout,
  // gridTemplateColumns,
  onSubmit: s
}) => {
  const [c, v] = wN({}), m = (S) => {
    S.preventDefault(), s(c);
  };
  return /* @__PURE__ */ ht.jsxs("form", { onSubmit: m, className: x_["form-container"], children: [
    i.map((S, y) => {
      switch (S.type) {
        case "text":
          return /* @__PURE__ */ ht.jsx(
            A3,
            {
              id: S.id,
              name: S.name,
              label: S.label,
              placeholder: S.placeholder,
              required: !0,
              value: c[S.name],
              onChange: (T) => {
                v((w) => ({ ...w, [S.name]: T }));
              }
            },
            y
          );
        default:
          return null;
      }
    }),
    /* @__PURE__ */ ht.jsx("button", { type: "submit", children: "Submit" })
  ] });
}, L3 = ({ formConfig: i, onSubmit: s }) => /* @__PURE__ */ ht.jsx(
  N3,
  {
    fields: i.fields,
    layout: i.layout,
    gridTemplateColumns: i.gridTemplateColumns,
    onSubmit: s
  }
);
function z3(i) {
  return $i("MuiPaper", i);
}
el("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const U3 = (i) => {
  const {
    square: s,
    elevation: c,
    variant: v,
    classes: m
  } = i, S = {
    root: ["root", v, !s && "rounded", v === "elevation" && `elevation${c}`]
  };
  return tl(S, z3, m);
}, F3 = Na("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, s[c.variant], !c.square && s.rounded, c.variant === "elevation" && s[`elevation${c.elevation}`]];
  }
})(ph(({
  theme: i
}) => ({
  backgroundColor: (i.vars || i).palette.background.paper,
  color: (i.vars || i).palette.text.primary,
  transition: i.transitions.create("box-shadow"),
  variants: [{
    props: ({
      ownerState: s
    }) => !s.square,
    style: {
      borderRadius: i.shape.borderRadius
    }
  }, {
    props: {
      variant: "outlined"
    },
    style: {
      border: `1px solid ${(i.vars || i).palette.divider}`
    }
  }, {
    props: {
      variant: "elevation"
    },
    style: {
      boxShadow: "var(--Paper-shadow)",
      backgroundImage: "var(--Paper-overlay)"
    }
  }]
}))), w_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  var H;
  const v = nl({
    props: s,
    name: "MuiPaper"
  }), m = DU(), {
    className: S,
    component: y = "div",
    elevation: T = 1,
    square: w = !1,
    variant: k = "elevation",
    ...A
  } = v, O = {
    ...v,
    component: y,
    elevation: T,
    square: w,
    variant: k
  }, z = U3(O);
  return process.env.NODE_ENV !== "production" && m.shadows[T] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${T}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${T}]\` is defined.`].join(`
`)), /* @__PURE__ */ ht.jsx(F3, {
    as: y,
    ownerState: O,
    className: or(z.root, S),
    ref: c,
    ...A,
    style: {
      ...k === "elevation" && {
        "--Paper-shadow": (m.vars || m).shadows[T],
        ...m.vars && {
          "--Paper-overlay": (H = m.vars.overlays) == null ? void 0 : H[T]
        },
        ...!m.vars && m.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${is("#fff", hC(T))}, ${is("#fff", hC(T))})`
        }
      },
      ...A.style
    }
  });
});
process.env.NODE_ENV !== "production" && (w_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: l0(zz, (i) => {
    const {
      elevation: s,
      variant: c
    } = i;
    return s > 0 && c === "outlined" ? new Error(`MUI: Combining \`elevation={${s}}\` with \`variant="${c}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: D.bool,
  /**
   * @ignore
   */
  style: D.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: D.oneOfType([D.oneOf(["elevation", "outlined"]), D.string])
});
function P3(i) {
  return $i("MuiCard", i);
}
el("MuiCard", ["root"]);
const j3 = (i) => {
  const {
    classes: s
  } = i;
  return tl({
    root: ["root"]
  }, P3, s);
}, $3 = Na(w_, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})({
  overflow: "hidden"
}), R_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiCard"
  }), {
    className: m,
    raised: S = !1,
    ...y
  } = v, T = {
    ...v,
    raised: S
  }, w = j3(T);
  return /* @__PURE__ */ ht.jsx($3, {
    className: or(w.root, m),
    elevation: S ? 8 : void 0,
    ref: c,
    ownerState: T,
    ...y
  });
});
process.env.NODE_ENV !== "production" && (R_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: l0(D.bool, (i) => i.raised && i.variant === "outlined" ? new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.') : null),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
});
function V3(i) {
  return $i("MuiCardContent", i);
}
el("MuiCardContent", ["root"]);
const B3 = (i) => {
  const {
    classes: s
  } = i;
  return tl({
    root: ["root"]
  }, V3, s);
}, H3 = Na("div", {
  name: "MuiCardContent",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
}), __ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiCardContent"
  }), {
    className: m,
    component: S = "div",
    ...y
  } = v, T = {
    ...v,
    component: S
  }, w = B3(T);
  return /* @__PURE__ */ ht.jsx(H3, {
    as: S,
    className: or(w.root, m),
    ownerState: T,
    ref: c,
    ...y
  });
});
process.env.NODE_ENV !== "production" && (__.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
});
function I3(i) {
  return $i("MuiCardMedia", i);
}
el("MuiCardMedia", ["root", "media", "img"]);
const Y3 = (i) => {
  const {
    classes: s,
    isMediaComponent: c,
    isImageComponent: v
  } = i;
  return tl({
    root: ["root", c && "media", v && "img"]
  }, I3, s);
}, W3 = Na("div", {
  name: "MuiCardMedia",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i, {
      isMediaComponent: v,
      isImageComponent: m
    } = c;
    return [s.root, v && s.media, m && s.img];
  }
})({
  display: "block",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  variants: [{
    props: {
      isMediaComponent: !0
    },
    style: {
      width: "100%"
    }
  }, {
    props: {
      isImageComponent: !0
    },
    style: {
      objectFit: "cover"
    }
  }]
}), G3 = ["video", "audio", "picture", "iframe", "img"], Q3 = ["picture", "img"], k_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiCardMedia"
  }), {
    children: m,
    className: S,
    component: y = "div",
    image: T,
    src: w,
    style: k,
    ...A
  } = v, O = G3.includes(y), z = !O && T ? {
    backgroundImage: `url("${T}")`,
    ...k
  } : k, H = {
    ...v,
    component: y,
    isMediaComponent: O,
    isImageComponent: Q3.includes(y)
  }, I = Y3(H);
  return /* @__PURE__ */ ht.jsx(W3, {
    className: or(I.root, S),
    as: y,
    role: !O && T ? "img" : void 0,
    ref: c,
    style: z,
    ownerState: H,
    src: O ? T || w : void 0,
    ...A,
    children: m
  });
});
process.env.NODE_ENV !== "production" && (k_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l0(D.node, (i) => !i.children && !i.image && !i.src && !i.component ? new Error("MUI: Either `children`, `image`, `src` or `component` prop must be specified.") : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: D.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: D.string,
  /**
   * @ignore
   */
  style: D.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
});
function q3(i) {
  return $i("MuiTypography", i);
}
el("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const K3 = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, X3 = MU(), Z3 = (i) => {
  const {
    align: s,
    gutterBottom: c,
    noWrap: v,
    paragraph: m,
    variant: S,
    classes: y
  } = i, T = {
    root: ["root", S, i.align !== "inherit" && `align${Kr(s)}`, c && "gutterBottom", v && "noWrap", m && "paragraph"]
  };
  return tl(T, q3, y);
}, J3 = Na("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, c.variant && s[c.variant], c.align !== "inherit" && s[`align${Kr(c.align)}`], c.noWrap && s.noWrap, c.gutterBottom && s.gutterBottom, c.paragraph && s.paragraph];
  }
})(ph(({
  theme: i
}) => {
  var s;
  return {
    margin: 0,
    variants: [{
      props: {
        variant: "inherit"
      },
      style: {
        // Some elements, like <button> on Chrome have default font that doesn't inherit, reset this.
        font: "inherit",
        lineHeight: "inherit",
        letterSpacing: "inherit"
      }
    }, ...Object.entries(i.typography).filter(([c, v]) => c !== "inherit" && v && typeof v == "object").map(([c, v]) => ({
      props: {
        variant: c
      },
      style: v
    })), ...Object.entries(i.palette).filter(c_()).map(([c]) => ({
      props: {
        color: c
      },
      style: {
        color: (i.vars || i).palette[c].main
      }
    })), ...Object.entries(((s = i.palette) == null ? void 0 : s.text) || {}).filter(([, c]) => typeof c == "string").map(([c]) => ({
      props: {
        color: `text${Kr(c)}`
      },
      style: {
        color: (i.vars || i).palette.text[c]
      }
    })), {
      props: ({
        ownerState: c
      }) => c.align !== "inherit",
      style: {
        textAlign: "var(--Typography-textAlign)"
      }
    }, {
      props: ({
        ownerState: c
      }) => c.noWrap,
      style: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, {
      props: ({
        ownerState: c
      }) => c.gutterBottom,
      style: {
        marginBottom: "0.35em"
      }
    }, {
      props: ({
        ownerState: c
      }) => c.paragraph,
      style: {
        marginBottom: 16
      }
    }]
  };
})), TR = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  subtitle1: "h6",
  subtitle2: "h6",
  body1: "p",
  body2: "p",
  inherit: "p"
}, gC = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const {
    color: v,
    ...m
  } = nl({
    props: s,
    name: "MuiTypography"
  }), S = !K3[v], y = X3({
    ...m,
    ...S && {
      color: v
    }
  }), {
    align: T = "inherit",
    className: w,
    component: k,
    gutterBottom: A = !1,
    noWrap: O = !1,
    paragraph: z = !1,
    variant: H = "body1",
    variantMapping: I = TR,
    ...B
  } = y, F = {
    ...y,
    align: T,
    color: v,
    className: w,
    component: k,
    gutterBottom: A,
    noWrap: O,
    paragraph: z,
    variant: H,
    variantMapping: I
  }, ce = k || (z ? "p" : I[H] || TR[H]) || "span", oe = Z3(F);
  return /* @__PURE__ */ ht.jsx(J3, {
    as: ce,
    ref: c,
    className: or(oe.root, w),
    ...B,
    ownerState: F,
    style: {
      ...T !== "inherit" && {
        "--Typography-textAlign": T
      },
      ...B.style
    }
  });
});
process.env.NODE_ENV !== "production" && (gC.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: D.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: D.oneOfType([D.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), D.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: D.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: D.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: D.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   * @deprecated Use the `component` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paragraph: D.bool,
  /**
   * @ignore
   */
  style: D.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: D.oneOfType([D.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), D.string]),
  /**
   * The component maps the variant prop to a range of different HTML element types.
   * For instance, subtitle1 to `<h6>`.
   * If you wish to change that mapping, you can provide your own.
   * Alternatively, you can use the `component` prop.
   * @default {
   *   h1: 'h1',
   *   h2: 'h2',
   *   h3: 'h3',
   *   h4: 'h4',
   *   h5: 'h5',
   *   h6: 'h6',
   *   subtitle1: 'h6',
   *   subtitle2: 'h6',
   *   body1: 'p',
   *   body2: 'p',
   *   inherit: 'p',
   * }
   */
  variantMapping: D.object
});
function e5(i) {
  return $i("MuiCardActionArea", i);
}
const nC = el("MuiCardActionArea", ["root", "focusVisible", "focusHighlight"]), t5 = (i) => {
  const {
    classes: s
  } = i;
  return tl({
    root: ["root"],
    focusHighlight: ["focusHighlight"]
  }, e5, s);
}, n5 = Na(zC, {
  name: "MuiCardActionArea",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})(ph(({
  theme: i
}) => ({
  display: "block",
  textAlign: "inherit",
  borderRadius: "inherit",
  // for Safari to work https://github.com/mui/material-ui/issues/36285.
  width: "100%",
  [`&:hover .${nC.focusHighlight}`]: {
    opacity: (i.vars || i).palette.action.hoverOpacity,
    "@media (hover: none)": {
      opacity: 0
    }
  },
  [`&.${nC.focusVisible} .${nC.focusHighlight}`]: {
    opacity: (i.vars || i).palette.action.focusOpacity
  }
}))), r5 = Na("span", {
  name: "MuiCardActionArea",
  slot: "FocusHighlight",
  overridesResolver: (i, s) => s.focusHighlight
})(ph(({
  theme: i
}) => ({
  overflow: "hidden",
  pointerEvents: "none",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  borderRadius: "inherit",
  opacity: 0,
  backgroundColor: "currentcolor",
  transition: i.transitions.create("opacity", {
    duration: i.transitions.duration.short
  })
}))), O_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiCardActionArea"
  }), {
    children: m,
    className: S,
    focusVisibleClassName: y,
    ...T
  } = v, w = v, k = t5(w);
  return /* @__PURE__ */ ht.jsxs(n5, {
    className: or(k.root, S),
    focusVisibleClassName: or(y, k.focusVisible),
    ref: c,
    ownerState: w,
    ...T,
    children: [m, /* @__PURE__ */ ht.jsx(r5, {
      className: k.focusHighlight,
      ownerState: w
    })]
  });
});
process.env.NODE_ENV !== "production" && (O_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * @ignore
   */
  focusVisibleClassName: D.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
});
function a5(i) {
  return $i("MuiCardActions", i);
}
el("MuiCardActions", ["root", "spacing"]);
const i5 = (i) => {
  const {
    classes: s,
    disableSpacing: c
  } = i;
  return tl({
    root: ["root", !c && "spacing"]
  }, a5, s);
}, o5 = Na("div", {
  name: "MuiCardActions",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, !c.disableSpacing && s.spacing];
  }
})({
  display: "flex",
  alignItems: "center",
  padding: 8,
  variants: [{
    props: {
      disableSpacing: !1
    },
    style: {
      "& > :not(style) ~ :not(style)": {
        marginLeft: 8
      }
    }
  }]
}), D_ = /* @__PURE__ */ ct.forwardRef(function(s, c) {
  const v = nl({
    props: s,
    name: "MuiCardActions"
  }), {
    disableSpacing: m = !1,
    className: S,
    ...y
  } = v, T = {
    ...v,
    disableSpacing: m
  }, w = i5(T);
  return /* @__PURE__ */ ht.jsx(o5, {
    className: or(w.root, S),
    ownerState: T,
    ref: c,
    ...y
  });
});
process.env.NODE_ENV !== "production" && (D_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: D.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: D.object,
  /**
   * @ignore
   */
  className: D.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: D.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: D.oneOfType([D.arrayOf(D.oneOfType([D.func, D.object, D.bool])), D.func, D.object])
});
const l5 = () => /* @__PURE__ */ ht.jsxs(R_, { sx: { maxWidth: 345 }, children: [
  /* @__PURE__ */ ht.jsxs(O_, { children: [
    /* @__PURE__ */ ht.jsx(
      k_,
      {
        component: "img",
        height: "140",
        image: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
        alt: "green iguana"
      }
    ),
    /* @__PURE__ */ ht.jsxs(__, { children: [
      /* @__PURE__ */ ht.jsx(gC, { gutterBottom: !0, variant: "h5", component: "div", children: "Lizard" }),
      /* @__PURE__ */ ht.jsx(gC, { variant: "body2", sx: { color: "text.secondary" }, children: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" })
    ] })
  ] }),
  /* @__PURE__ */ ht.jsx(D_, { children: /* @__PURE__ */ ht.jsx(eh, { size: "small", color: "primary", children: "Share" }) })
] }), p5 = i_({
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
  uh(qN, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  uh(O3, {
    props: { handleOnSubmit: "function" }
  })
);
customElements.define(
  "rwc-dinamyc-form",
  uh(L3, {
    props: { formConfig: "json", onSubmit: "function" }
  })
);
customElements.define("rwc-basic-buttons", uh(i3));
customElements.define("rwc-card-example", uh(l5));
export {
  i3 as BasicButtons,
  O3 as Form,
  qN as Header,
  l5 as MultiActionAreaCard,
  L3 as WrapperForm,
  p5 as theme
};
