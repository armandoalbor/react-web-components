var KN = Object.defineProperty;
var XN = (i, s, c) => s in i ? KN(i, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : i[s] = c;
var qv = (i, s, c) => XN(i, typeof s != "symbol" ? s + "" : s, c);
import * as De from "react";
import Rn, { forwardRef as ZN, useContext as JN, Children as e2, isValidElement as Lg, cloneElement as zg, useEffect as t2, useState as n2 } from "react";
function r2(i) {
  return i && i.__esModule && Object.prototype.hasOwnProperty.call(i, "default") ? i.default : i;
}
var dE = { exports: {} }, ri = {}, bg = { exports: {} }, YC = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fw;
function a2() {
  return Fw || (Fw = 1, function(i) {
    function s(ge, ke) {
      var W = ge.length;
      ge.push(ke);
      e: for (; 0 < W; ) {
        var pe = W - 1 >>> 1, Ne = ge[pe];
        if (0 < y(Ne, ke)) ge[pe] = ke, ge[W] = Ne, W = pe;
        else break e;
      }
    }
    function c(ge) {
      return ge.length === 0 ? null : ge[0];
    }
    function p(ge) {
      if (ge.length === 0) return null;
      var ke = ge[0], W = ge.pop();
      if (W !== ke) {
        ge[0] = W;
        e: for (var pe = 0, Ne = ge.length, Ze = Ne >>> 1; pe < Ze; ) {
          var Fe = 2 * (pe + 1) - 1, yt = ge[Fe], We = Fe + 1, ot = ge[We];
          if (0 > y(yt, W)) We < Ne && 0 > y(ot, yt) ? (ge[pe] = ot, ge[We] = W, pe = We) : (ge[pe] = yt, ge[Fe] = W, pe = Fe);
          else if (We < Ne && 0 > y(ot, W)) ge[pe] = ot, ge[We] = W, pe = We;
          else break e;
        }
      }
      return ke;
    }
    function y(ge, ke) {
      var W = ge.sortIndex - ke.sortIndex;
      return W !== 0 ? W : ge.id - ke.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var g = performance;
      i.unstable_now = function() {
        return g.now();
      };
    } else {
      var h = Date, T = h.now();
      i.unstable_now = function() {
        return h.now() - T;
      };
    }
    var w = [], _ = [], A = 1, O = null, L = 3, H = !1, Y = !1, B = !1, P = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, ae = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function I(ge) {
      for (var ke = c(_); ke !== null; ) {
        if (ke.callback === null) p(_);
        else if (ke.startTime <= ge) p(_), ke.sortIndex = ke.expirationTime, s(w, ke);
        else break;
        ke = c(_);
      }
    }
    function J(ge) {
      if (B = !1, I(ge), !Y) if (c(w) !== null) Y = !0, Be(U);
      else {
        var ke = c(_);
        ke !== null && Ct(J, ke.startTime - ge);
      }
    }
    function U(ge, ke) {
      Y = !1, B && (B = !1, se(Xe), Xe = -1), H = !0;
      var W = L;
      try {
        for (I(ke), O = c(w); O !== null && (!(O.expirationTime > ke) || ge && !_e()); ) {
          var pe = O.callback;
          if (typeof pe == "function") {
            O.callback = null, L = O.priorityLevel;
            var Ne = pe(O.expirationTime <= ke);
            ke = i.unstable_now(), typeof Ne == "function" ? O.callback = Ne : O === c(w) && p(w), I(ke);
          } else p(w);
          O = c(w);
        }
        if (O !== null) var Ze = !0;
        else {
          var Fe = c(_);
          Fe !== null && Ct(J, Fe.startTime - ke), Ze = !1;
        }
        return Ze;
      } finally {
        O = null, L = W, H = !1;
      }
    }
    var de = !1, ie = null, Xe = -1, D = 5, ce = -1;
    function _e() {
      return !(i.unstable_now() - ce < D);
    }
    function he() {
      if (ie !== null) {
        var ge = i.unstable_now();
        ce = ge;
        var ke = !0;
        try {
          ke = ie(!0, ge);
        } finally {
          ke ? ve() : (de = !1, ie = null);
        }
      } else de = !1;
    }
    var ve;
    if (typeof ae == "function") ve = function() {
      ae(he);
    };
    else if (typeof MessageChannel < "u") {
      var Re = new MessageChannel(), it = Re.port2;
      Re.port1.onmessage = he, ve = function() {
        it.postMessage(null);
      };
    } else ve = function() {
      P(he, 0);
    };
    function Be(ge) {
      ie = ge, de || (de = !0, ve());
    }
    function Ct(ge, ke) {
      Xe = P(function() {
        ge(i.unstable_now());
      }, ke);
    }
    i.unstable_IdlePriority = 5, i.unstable_ImmediatePriority = 1, i.unstable_LowPriority = 4, i.unstable_NormalPriority = 3, i.unstable_Profiling = null, i.unstable_UserBlockingPriority = 2, i.unstable_cancelCallback = function(ge) {
      ge.callback = null;
    }, i.unstable_continueExecution = function() {
      Y || H || (Y = !0, Be(U));
    }, i.unstable_forceFrameRate = function(ge) {
      0 > ge || 125 < ge ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : D = 0 < ge ? Math.floor(1e3 / ge) : 5;
    }, i.unstable_getCurrentPriorityLevel = function() {
      return L;
    }, i.unstable_getFirstCallbackNode = function() {
      return c(w);
    }, i.unstable_next = function(ge) {
      switch (L) {
        case 1:
        case 2:
        case 3:
          var ke = 3;
          break;
        default:
          ke = L;
      }
      var W = L;
      L = ke;
      try {
        return ge();
      } finally {
        L = W;
      }
    }, i.unstable_pauseExecution = function() {
    }, i.unstable_requestPaint = function() {
    }, i.unstable_runWithPriority = function(ge, ke) {
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
      var W = L;
      L = ge;
      try {
        return ke();
      } finally {
        L = W;
      }
    }, i.unstable_scheduleCallback = function(ge, ke, W) {
      var pe = i.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? pe + W : pe) : W = pe, ge) {
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
      return Ne = W + Ne, ge = { id: A++, callback: ke, priorityLevel: ge, startTime: W, expirationTime: Ne, sortIndex: -1 }, W > pe ? (ge.sortIndex = W, s(_, ge), c(w) === null && ge === c(_) && (B ? (se(Xe), Xe = -1) : B = !0, Ct(J, W - pe))) : (ge.sortIndex = Ne, s(w, ge), Y || H || (Y = !0, Be(U))), ge;
    }, i.unstable_shouldYield = _e, i.unstable_wrapCallback = function(ge) {
      var ke = L;
      return function() {
        var W = L;
        L = ke;
        try {
          return ge.apply(this, arguments);
        } finally {
          L = W;
        }
      };
    };
  }(YC)), YC;
}
var WC = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $w;
function i2() {
  return $w || ($w = 1, function(i) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var s = !1, c = !1, p = 5;
      function y(Me, st) {
        var At = Me.length;
        Me.push(st), T(Me, st, At);
      }
      function g(Me) {
        return Me.length === 0 ? null : Me[0];
      }
      function h(Me) {
        if (Me.length === 0)
          return null;
        var st = Me[0], At = Me.pop();
        return At !== st && (Me[0] = At, w(Me, At, 0)), st;
      }
      function T(Me, st, At) {
        for (var qt = At; qt > 0; ) {
          var hn = qt - 1 >>> 1, sr = Me[hn];
          if (_(sr, st) > 0)
            Me[hn] = st, Me[qt] = sr, qt = hn;
          else
            return;
        }
      }
      function w(Me, st, At) {
        for (var qt = At, hn = Me.length, sr = hn >>> 1; qt < sr; ) {
          var $n = (qt + 1) * 2 - 1, Xr = Me[$n], mn = $n + 1, ya = Me[mn];
          if (_(Xr, st) < 0)
            mn < hn && _(ya, Xr) < 0 ? (Me[qt] = ya, Me[mn] = st, qt = mn) : (Me[qt] = Xr, Me[$n] = st, qt = $n);
          else if (mn < hn && _(ya, st) < 0)
            Me[qt] = ya, Me[mn] = st, qt = mn;
          else
            return;
        }
      }
      function _(Me, st) {
        var At = Me.sortIndex - st.sortIndex;
        return At !== 0 ? At : Me.id - st.id;
      }
      var A = 1, O = 2, L = 3, H = 4, Y = 5;
      function B(Me, st) {
      }
      var P = typeof performance == "object" && typeof performance.now == "function";
      if (P) {
        var se = performance;
        i.unstable_now = function() {
          return se.now();
        };
      } else {
        var ae = Date, I = ae.now();
        i.unstable_now = function() {
          return ae.now() - I;
        };
      }
      var J = 1073741823, U = -1, de = 250, ie = 5e3, Xe = 1e4, D = J, ce = [], _e = [], he = 1, ve = null, Re = L, it = !1, Be = !1, Ct = !1, ge = typeof setTimeout == "function" ? setTimeout : null, ke = typeof clearTimeout == "function" ? clearTimeout : null, W = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function pe(Me) {
        for (var st = g(_e); st !== null; ) {
          if (st.callback === null)
            h(_e);
          else if (st.startTime <= Me)
            h(_e), st.sortIndex = st.expirationTime, y(ce, st);
          else
            return;
          st = g(_e);
        }
      }
      function Ne(Me) {
        if (Ct = !1, pe(Me), !Be)
          if (g(ce) !== null)
            Be = !0, vt(Ze);
          else {
            var st = g(_e);
            st !== null && tt(Ne, st.startTime - Me);
          }
      }
      function Ze(Me, st) {
        Be = !1, Ct && (Ct = !1, vn()), it = !0;
        var At = Re;
        try {
          var qt;
          if (!c) return Fe(Me, st);
        } finally {
          ve = null, Re = At, it = !1;
        }
      }
      function Fe(Me, st) {
        var At = st;
        for (pe(At), ve = g(ce); ve !== null && !s && !(ve.expirationTime > At && (!Me || G())); ) {
          var qt = ve.callback;
          if (typeof qt == "function") {
            ve.callback = null, Re = ve.priorityLevel;
            var hn = ve.expirationTime <= At, sr = qt(hn);
            At = i.unstable_now(), typeof sr == "function" ? ve.callback = sr : ve === g(ce) && h(ce), pe(At);
          } else
            h(ce);
          ve = g(ce);
        }
        if (ve !== null)
          return !0;
        var $n = g(_e);
        return $n !== null && tt(Ne, $n.startTime - At), !1;
      }
      function yt(Me, st) {
        switch (Me) {
          case A:
          case O:
          case L:
          case H:
          case Y:
            break;
          default:
            Me = L;
        }
        var At = Re;
        Re = Me;
        try {
          return st();
        } finally {
          Re = At;
        }
      }
      function We(Me) {
        var st;
        switch (Re) {
          case A:
          case O:
          case L:
            st = L;
            break;
          default:
            st = Re;
            break;
        }
        var At = Re;
        Re = st;
        try {
          return Me();
        } finally {
          Re = At;
        }
      }
      function ot(Me) {
        var st = Re;
        return function() {
          var At = Re;
          Re = st;
          try {
            return Me.apply(this, arguments);
          } finally {
            Re = At;
          }
        };
      }
      function nt(Me, st, At) {
        var qt = i.unstable_now(), hn;
        if (typeof At == "object" && At !== null) {
          var sr = At.delay;
          typeof sr == "number" && sr > 0 ? hn = qt + sr : hn = qt;
        } else
          hn = qt;
        var $n;
        switch (Me) {
          case A:
            $n = U;
            break;
          case O:
            $n = de;
            break;
          case Y:
            $n = D;
            break;
          case H:
            $n = Xe;
            break;
          case L:
          default:
            $n = ie;
            break;
        }
        var Xr = hn + $n, mn = {
          id: he++,
          callback: st,
          priorityLevel: Me,
          startTime: hn,
          expirationTime: Xr,
          sortIndex: -1
        };
        return hn > qt ? (mn.sortIndex = hn, y(_e, mn), g(ce) === null && mn === g(_e) && (Ct ? vn() : Ct = !0, tt(Ne, hn - qt))) : (mn.sortIndex = Xr, y(ce, mn), !Be && !it && (Be = !0, vt(Ze))), mn;
      }
      function pt() {
      }
      function gt() {
        !Be && !it && (Be = !0, vt(Ze));
      }
      function Nt() {
        return g(ce);
      }
      function xe(Me) {
        Me.callback = null;
      }
      function xt() {
        return Re;
      }
      var Le = !1, Gt = null, jt = -1, rn = p, N = -1;
      function G() {
        var Me = i.unstable_now() - N;
        return !(Me < rn);
      }
      function re() {
      }
      function Oe(Me) {
        if (Me < 0 || Me > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Me > 0 ? rn = Math.floor(1e3 / Me) : rn = p;
      }
      var Te = function() {
        if (Gt !== null) {
          var Me = i.unstable_now();
          N = Me;
          var st = !0, At = !0;
          try {
            At = Gt(st, Me);
          } finally {
            At ? ne() : (Le = !1, Gt = null);
          }
        } else
          Le = !1;
      }, ne;
      if (typeof W == "function")
        ne = function() {
          W(Te);
        };
      else if (typeof MessageChannel < "u") {
        var $e = new MessageChannel(), Et = $e.port2;
        $e.port1.onmessage = Te, ne = function() {
          Et.postMessage(null);
        };
      } else
        ne = function() {
          ge(Te, 0);
        };
      function vt(Me) {
        Gt = Me, Le || (Le = !0, ne());
      }
      function tt(Me, st) {
        jt = ge(function() {
          Me(i.unstable_now());
        }, st);
      }
      function vn() {
        ke(jt), jt = -1;
      }
      var ma = re, Zn = null;
      i.unstable_IdlePriority = Y, i.unstable_ImmediatePriority = A, i.unstable_LowPriority = H, i.unstable_NormalPriority = L, i.unstable_Profiling = Zn, i.unstable_UserBlockingPriority = O, i.unstable_cancelCallback = xe, i.unstable_continueExecution = gt, i.unstable_forceFrameRate = Oe, i.unstable_getCurrentPriorityLevel = xt, i.unstable_getFirstCallbackNode = Nt, i.unstable_next = We, i.unstable_pauseExecution = pt, i.unstable_requestPaint = ma, i.unstable_runWithPriority = yt, i.unstable_scheduleCallback = nt, i.unstable_shouldYield = G, i.unstable_wrapCallback = ot, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(WC)), WC;
}
var Vw;
function GR() {
  return Vw || (Vw = 1, process.env.NODE_ENV === "production" ? bg.exports = a2() : bg.exports = i2()), bg.exports;
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
var Bw;
function o2() {
  if (Bw) return ri;
  Bw = 1;
  var i = Rn, s = GR();
  function c(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var p = /* @__PURE__ */ new Set(), y = {};
  function g(n, r) {
    h(n, r), h(n + "Capture", r);
  }
  function h(n, r) {
    for (y[n] = r, n = 0; n < r.length; n++) p.add(r[n]);
  }
  var T = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), w = Object.prototype.hasOwnProperty, _ = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, A = {}, O = {};
  function L(n) {
    return w.call(O, n) ? !0 : w.call(A, n) ? !1 : _.test(n) ? O[n] = !0 : (A[n] = !0, !1);
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
  function Y(n, r, l, f) {
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
  function B(n, r, l, f, v, S, E) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = f, this.attributeNamespace = v, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = S, this.removeEmptyString = E;
  }
  var P = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    P[n] = new B(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    P[r] = new B(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    P[n] = new B(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    P[n] = new B(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    P[n] = new B(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    P[n] = new B(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    P[n] = new B(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    P[n] = new B(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    P[n] = new B(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var se = /[\-:]([a-z])/g;
  function ae(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      se,
      ae
    );
    P[r] = new B(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(se, ae);
    P[r] = new B(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(se, ae);
    P[r] = new B(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    P[n] = new B(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), P.xlinkHref = new B("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    P[n] = new B(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function I(n, r, l, f) {
    var v = P.hasOwnProperty(r) ? P[r] : null;
    (v !== null ? v.type !== 0 : f || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Y(r, l, v, f) && (l = null), f || v === null ? L(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : v.mustUseProperty ? n[v.propertyName] = l === null ? v.type === 3 ? !1 : "" : l : (r = v.attributeName, f = v.attributeNamespace, l === null ? n.removeAttribute(r) : (v = v.type, l = v === 3 || v === 4 && l === !0 ? "" : "" + l, f ? n.setAttributeNS(f, r, l) : n.setAttribute(r, l))));
  }
  var J = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, U = Symbol.for("react.element"), de = Symbol.for("react.portal"), ie = Symbol.for("react.fragment"), Xe = Symbol.for("react.strict_mode"), D = Symbol.for("react.profiler"), ce = Symbol.for("react.provider"), _e = Symbol.for("react.context"), he = Symbol.for("react.forward_ref"), ve = Symbol.for("react.suspense"), Re = Symbol.for("react.suspense_list"), it = Symbol.for("react.memo"), Be = Symbol.for("react.lazy"), Ct = Symbol.for("react.offscreen"), ge = Symbol.iterator;
  function ke(n) {
    return n === null || typeof n != "object" ? null : (n = ge && n[ge] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var W = Object.assign, pe;
  function Ne(n) {
    if (pe === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      pe = r && r[1] || "";
    }
    return `
` + pe + n;
  }
  var Ze = !1;
  function Fe(n, r) {
    if (!n || Ze) return "";
    Ze = !0;
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
        } catch (ee) {
          var f = ee;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (ee) {
          f = ee;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (ee) {
          f = ee;
        }
        n();
      }
    } catch (ee) {
      if (ee && f && typeof ee.stack == "string") {
        for (var v = ee.stack.split(`
`), S = f.stack.split(`
`), E = v.length - 1, M = S.length - 1; 1 <= E && 0 <= M && v[E] !== S[M]; ) M--;
        for (; 1 <= E && 0 <= M; E--, M--) if (v[E] !== S[M]) {
          if (E !== 1 || M !== 1)
            do
              if (E--, M--, 0 > M || v[E] !== S[M]) {
                var j = `
` + v[E].replace(" at new ", " at ");
                return n.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", n.displayName)), j;
              }
            while (1 <= E && 0 <= M);
          break;
        }
      }
    } finally {
      Ze = !1, Error.prepareStackTrace = l;
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
        return n = Fe(n.type, !1), n;
      case 11:
        return n = Fe(n.type.render, !1), n;
      case 1:
        return n = Fe(n.type, !0), n;
      default:
        return "";
    }
  }
  function We(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case ie:
        return "Fragment";
      case de:
        return "Portal";
      case D:
        return "Profiler";
      case Xe:
        return "StrictMode";
      case ve:
        return "Suspense";
      case Re:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case _e:
        return (n.displayName || "Context") + ".Consumer";
      case ce:
        return (n._context.displayName || "Context") + ".Provider";
      case he:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case it:
        return r = n.displayName || null, r !== null ? r : We(n.type) || "Memo";
      case Be:
        r = n._payload, n = n._init;
        try {
          return We(n(r));
        } catch {
        }
    }
    return null;
  }
  function ot(n) {
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
        return We(r);
      case 8:
        return r === Xe ? "StrictMode" : "Mode";
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
  function nt(n) {
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
      var v = l.get, S = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return v.call(this);
      }, set: function(E) {
        f = "" + E, S.call(this, E);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return f;
      }, setValue: function(E) {
        f = "" + E;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Nt(n) {
    n._valueTracker || (n._valueTracker = gt(n));
  }
  function xe(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), f = "";
    return n && (f = pt(n) ? n.checked ? "true" : "false" : n.value), n = f, n !== l ? (r.setValue(n), !0) : !1;
  }
  function xt(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Le(n, r) {
    var l = r.checked;
    return W({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Gt(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, f = r.checked != null ? r.checked : r.defaultChecked;
    l = nt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: f, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function jt(n, r) {
    r = r.checked, r != null && I(n, "checked", r, !1);
  }
  function rn(n, r) {
    jt(n, r);
    var l = nt(r.value), f = r.type;
    if (l != null) f === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (f === "submit" || f === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? G(n, r.type, l) : r.hasOwnProperty("defaultValue") && G(n, r.type, nt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
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
    (r !== "number" || xt(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var re = Array.isArray;
  function Oe(n, r, l, f) {
    if (n = n.options, r) {
      r = {};
      for (var v = 0; v < l.length; v++) r["$" + l[v]] = !0;
      for (l = 0; l < n.length; l++) v = r.hasOwnProperty("$" + n[l].value), n[l].selected !== v && (n[l].selected = v), v && f && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + nt(l), r = null, v = 0; v < n.length; v++) {
        if (n[v].value === l) {
          n[v].selected = !0, f && (n[v].defaultSelected = !0);
          return;
        }
        r !== null || n[v].disabled || (r = n[v]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Te(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(c(91));
    return W({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function ne(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(c(92));
        if (re(l)) {
          if (1 < l.length) throw Error(c(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: nt(l) };
  }
  function $e(n, r) {
    var l = nt(r.value), f = nt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), f != null && (n.defaultValue = "" + f);
  }
  function Et(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function vt(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function tt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? vt(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var vn, ma = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, f, v) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, f, v);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (vn = vn || document.createElement("div"), vn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = vn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Zn(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Me = {
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
  }, st = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Me).forEach(function(n) {
    st.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Me[r] = Me[n];
    });
  });
  function At(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Me.hasOwnProperty(n) && Me[n] ? ("" + r).trim() : r + "px";
  }
  function qt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var f = l.indexOf("--") === 0, v = At(l, r[l], f);
      l === "float" && (l = "cssFloat"), f ? n.setProperty(l, v) : n[l] = v;
    }
  }
  var hn = W({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function sr(n, r) {
    if (r) {
      if (hn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(c(137, n));
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
  function mn(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var ya = null, dn = null, yn = null;
  function Kl(n) {
    if (n = Ns(n)) {
      if (typeof ya != "function") throw Error(c(280));
      var r = n.stateNode;
      r && (r = dt(r), ya(n.stateNode, n.type, r));
    }
  }
  function al(n) {
    dn ? yn ? yn.push(n) : yn = [n] : dn = n;
  }
  function Xl() {
    if (dn) {
      var n = dn, r = yn;
      if (yn = dn = null, Kl(n), r) for (n = 0; n < r.length; n++) Kl(r[n]);
    }
  }
  function fs(n, r) {
    return n(r);
  }
  function wc() {
  }
  var il = !1;
  function Zl(n, r, l) {
    if (il) return n(r, l);
    il = !0;
    try {
      return fs(n, r, l);
    } finally {
      il = !1, (dn !== null || yn !== null) && (wc(), Xl());
    }
  }
  function ol(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var f = dt(l);
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
  var Jl = !1;
  if (T) try {
    var Ci = {};
    Object.defineProperty(Ci, "passive", { get: function() {
      Jl = !0;
    } }), window.addEventListener("test", Ci, Ci), window.removeEventListener("test", Ci, Ci);
  } catch {
    Jl = !1;
  }
  function Vi(n, r, l, f, v, S, E, M, j) {
    var ee = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, ee);
    } catch (Se) {
      this.onError(Se);
    }
  }
  var ga = !1, li = null, go = !1, ll = null, z = { onError: function(n) {
    ga = !0, li = n;
  } };
  function be(n, r, l, f, v, S, E, M, j) {
    ga = !1, li = null, Vi.apply(z, arguments);
  }
  function ze(n, r, l, f, v, S, E, M, j) {
    if (be.apply(this, arguments), ga) {
      if (ga) {
        var ee = li;
        ga = !1, li = null;
      } else throw Error(c(198));
      go || (go = !0, ll = ee);
    }
  }
  function ct(n) {
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
  function $t(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Ht(n) {
    if (ct(n) !== n) throw Error(c(188));
  }
  function bt(n) {
    var r = n.alternate;
    if (!r) {
      if (r = ct(n), r === null) throw Error(c(188));
      return r !== n ? null : n;
    }
    for (var l = n, f = r; ; ) {
      var v = l.return;
      if (v === null) break;
      var S = v.alternate;
      if (S === null) {
        if (f = v.return, f !== null) {
          l = f;
          continue;
        }
        break;
      }
      if (v.child === S.child) {
        for (S = v.child; S; ) {
          if (S === l) return Ht(v), n;
          if (S === f) return Ht(v), r;
          S = S.sibling;
        }
        throw Error(c(188));
      }
      if (l.return !== f.return) l = v, f = S;
      else {
        for (var E = !1, M = v.child; M; ) {
          if (M === l) {
            E = !0, l = v, f = S;
            break;
          }
          if (M === f) {
            E = !0, f = v, l = S;
            break;
          }
          M = M.sibling;
        }
        if (!E) {
          for (M = S.child; M; ) {
            if (M === l) {
              E = !0, l = S, f = v;
              break;
            }
            if (M === f) {
              E = !0, f = S, l = v;
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
  function Lt(n) {
    return n = bt(n), n !== null ? cr(n) : null;
  }
  function cr(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = cr(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var Sn = s.unstable_scheduleCallback, Dn = s.unstable_cancelCallback, Zr = s.unstable_shouldYield, So = s.unstable_requestPaint, Kt = s.unstable_now, Ar = s.unstable_getCurrentPriorityLevel, Sa = s.unstable_ImmediatePriority, zt = s.unstable_UserBlockingPriority, Ei = s.unstable_NormalPriority, yh = s.unstable_LowPriority, jd = s.unstable_IdlePriority, ds = null, ui = null;
  function gh(n) {
    if (ui && typeof ui.onCommitFiberRoot == "function") try {
      ui.onCommitFiberRoot(ds, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var za = Math.clz32 ? Math.clz32 : y0, Sh = Math.log, bh = Math.LN2;
  function y0(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Sh(n) / bh | 0) | 0;
  }
  var Rc = 64, eu = 4194304;
  function ul(n) {
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
  function si(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var f = 0, v = n.suspendedLanes, S = n.pingedLanes, E = l & 268435455;
    if (E !== 0) {
      var M = E & ~v;
      M !== 0 ? f = ul(M) : (S &= E, S !== 0 && (f = ul(S)));
    } else E = l & ~v, E !== 0 ? f = ul(E) : S !== 0 && (f = ul(S));
    if (f === 0) return 0;
    if (r !== 0 && r !== f && !(r & v) && (v = f & -f, S = r & -r, v >= S || v === 16 && (S & 4194240) !== 0)) return r;
    if (f & 4 && (f |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= f; 0 < r; ) l = 31 - za(r), v = 1 << l, f |= n[l], r &= ~v;
    return f;
  }
  function Pd(n, r) {
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
  function _c(n, r) {
    for (var l = n.suspendedLanes, f = n.pingedLanes, v = n.expirationTimes, S = n.pendingLanes; 0 < S; ) {
      var E = 31 - za(S), M = 1 << E, j = v[E];
      j === -1 ? (!(M & l) || M & f) && (v[E] = Pd(M, r)) : j <= r && (n.expiredLanes |= M), S &= ~M;
    }
  }
  function Fd(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function kc() {
    var n = Rc;
    return Rc <<= 1, !(Rc & 4194240) && (Rc = 64), n;
  }
  function $d(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function sl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - za(r), n[r] = l;
  }
  function g0(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var f = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var v = 31 - za(l), S = 1 << v;
      r[v] = 0, f[v] = -1, n[v] = -1, l &= ~S;
    }
  }
  function ps(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var f = 31 - za(l), v = 1 << f;
      v & r | n[f] & r && (n[f] |= r), l &= ~v;
    }
  }
  var Jt = 0;
  function Vd(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Ch, Oc, en, Eh, Bd, Ot = !1, vs = [], Yn = null, Ua = null, ja = null, hs = /* @__PURE__ */ new Map(), Jn = /* @__PURE__ */ new Map(), an = [], S0 = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ci(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Yn = null;
        break;
      case "dragenter":
      case "dragleave":
        Ua = null;
        break;
      case "mouseover":
      case "mouseout":
        ja = null;
        break;
      case "pointerover":
      case "pointerout":
        hs.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Jn.delete(r.pointerId);
    }
  }
  function Nr(n, r, l, f, v, S) {
    return n === null || n.nativeEvent !== S ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: f, nativeEvent: S, targetContainers: [v] }, r !== null && (r = Ns(r), r !== null && Oc(r)), n) : (n.eventSystemFlags |= f, r = n.targetContainers, v !== null && r.indexOf(v) === -1 && r.push(v), n);
  }
  function bo(n, r, l, f, v) {
    switch (r) {
      case "focusin":
        return Yn = Nr(Yn, n, r, l, f, v), !0;
      case "dragenter":
        return Ua = Nr(Ua, n, r, l, f, v), !0;
      case "mouseover":
        return ja = Nr(ja, n, r, l, f, v), !0;
      case "pointerover":
        var S = v.pointerId;
        return hs.set(S, Nr(hs.get(S) || null, n, r, l, f, v)), !0;
      case "gotpointercapture":
        return S = v.pointerId, Jn.set(S, Nr(Jn.get(S) || null, n, r, l, f, v)), !0;
    }
    return !1;
  }
  function Th(n) {
    var r = Fa(n.target);
    if (r !== null) {
      var l = ct(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = $t(l), r !== null) {
            n.blockedOn = r, Bd(n.priority, function() {
              en(l);
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
  function tu(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Ac(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var f = new l.constructor(l.type, l);
        Xr = f, l.target.dispatchEvent(f), Xr = null;
      } else return r = Ns(l), r !== null && Oc(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function Hd(n, r, l) {
    tu(n) && l.delete(r);
  }
  function xh() {
    Ot = !1, Yn !== null && tu(Yn) && (Yn = null), Ua !== null && tu(Ua) && (Ua = null), ja !== null && tu(ja) && (ja = null), hs.forEach(Hd), Jn.forEach(Hd);
  }
  function ms(n, r) {
    n.blockedOn === r && (n.blockedOn = null, Ot || (Ot = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, xh)));
  }
  function ys(n) {
    function r(v) {
      return ms(v, n);
    }
    if (0 < vs.length) {
      ms(vs[0], n);
      for (var l = 1; l < vs.length; l++) {
        var f = vs[l];
        f.blockedOn === n && (f.blockedOn = null);
      }
    }
    for (Yn !== null && ms(Yn, n), Ua !== null && ms(Ua, n), ja !== null && ms(ja, n), hs.forEach(r), Jn.forEach(r), l = 0; l < an.length; l++) f = an[l], f.blockedOn === n && (f.blockedOn = null);
    for (; 0 < an.length && (l = an[0], l.blockedOn === null); ) Th(l), l.blockedOn === null && an.shift();
  }
  var nu = J.ReactCurrentBatchConfig, cl = !0;
  function wh(n, r, l, f) {
    var v = Jt, S = nu.transition;
    nu.transition = null;
    try {
      Jt = 1, Mc(n, r, l, f);
    } finally {
      Jt = v, nu.transition = S;
    }
  }
  function Dc(n, r, l, f) {
    var v = Jt, S = nu.transition;
    nu.transition = null;
    try {
      Jt = 4, Mc(n, r, l, f);
    } finally {
      Jt = v, nu.transition = S;
    }
  }
  function Mc(n, r, l, f) {
    if (cl) {
      var v = Ac(n, r, l, f);
      if (v === null) Ic(n, r, f, gs, l), ci(n, f);
      else if (bo(v, n, r, l, f)) f.stopPropagation();
      else if (ci(n, f), r & 4 && -1 < S0.indexOf(n)) {
        for (; v !== null; ) {
          var S = Ns(v);
          if (S !== null && Ch(S), S = Ac(n, r, l, f), S === null && Ic(n, r, f, gs, l), S === v) break;
          v = S;
        }
        v !== null && f.stopPropagation();
      } else Ic(n, r, f, null, l);
    }
  }
  var gs = null;
  function Ac(n, r, l, f) {
    if (gs = null, n = mn(f), n = Fa(n), n !== null) if (r = ct(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = $t(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return gs = n, null;
  }
  function Id(n) {
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
        switch (Ar()) {
          case Sa:
            return 1;
          case zt:
            return 4;
          case Ei:
          case yh:
            return 16;
          case jd:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Bi = null, Ss = null, bs = null;
  function Yd() {
    if (bs) return bs;
    var n, r = Ss, l = r.length, f, v = "value" in Bi ? Bi.value : Bi.textContent, S = v.length;
    for (n = 0; n < l && r[n] === v[n]; n++) ;
    var E = l - n;
    for (f = 1; f <= E && r[l - f] === v[S - f]; f++) ;
    return bs = v.slice(n, 1 < f ? 1 - f : void 0);
  }
  function ru(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Cs() {
    return !0;
  }
  function Rh() {
    return !1;
  }
  function ba(n) {
    function r(l, f, v, S, E) {
      this._reactName = l, this._targetInst = v, this.type = f, this.nativeEvent = S, this.target = E, this.currentTarget = null;
      for (var M in n) n.hasOwnProperty(M) && (l = n[M], this[M] = l ? l(S) : S[M]);
      return this.isDefaultPrevented = (S.defaultPrevented != null ? S.defaultPrevented : S.returnValue === !1) ? Cs : Rh, this.isPropagationStopped = Rh, this;
    }
    return W(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Cs);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Cs);
    }, persist: function() {
    }, isPersistent: Cs }), r;
  }
  var Co = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Nc = ba(Co), au = W({}, Co, { view: 0, detail: 0 }), _h = ba(au), Lc, Wd, Es, fr = W({}, au, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Kd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Es && (Es && n.type === "mousemove" ? (Lc = n.screenX - Es.screenX, Wd = n.screenY - Es.screenY) : Wd = Lc = 0, Es = n), Lc);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Wd;
  } }), zc = ba(fr), kh = W({}, fr, { dataTransfer: 0 }), Oh = ba(kh), b0 = W({}, au, { relatedTarget: 0 }), Eo = ba(b0), Gd = W({}, Co, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Dh = ba(Gd), C0 = W({}, Co, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), E0 = ba(C0), T0 = W({}, Co, { data: 0 }), qd = ba(T0), Qd = {
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
  }, Mh = {
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
  }, Ah = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Nh(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Ah[n]) ? !!r[n] : !1;
  }
  function Kd() {
    return Nh;
  }
  var Hi = W({}, au, { key: function(n) {
    if (n.key) {
      var r = Qd[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = ru(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Mh[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Kd, charCode: function(n) {
    return n.type === "keypress" ? ru(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? ru(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), x0 = ba(Hi), Xd = W({}, fr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Uc = ba(Xd), Zd = W({}, au, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Kd }), w0 = ba(Zd), jc = W({}, Co, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Lh = ba(jc), Jr = W({}, fr, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Ii = ba(Jr), Wn = [9, 13, 27, 32], fi = T && "CompositionEvent" in window, fl = null;
  T && "documentMode" in document && (fl = document.documentMode);
  var Pc = T && "TextEvent" in window && !fl, zh = T && (!fi || fl && 8 < fl && 11 >= fl), iu = " ", Uh = !1;
  function jh(n, r) {
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
  function Fc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var ou = !1;
  function R0(n, r) {
    switch (n) {
      case "compositionend":
        return Fc(r);
      case "keypress":
        return r.which !== 32 ? null : (Uh = !0, iu);
      case "textInput":
        return n = r.data, n === iu && Uh ? null : n;
      default:
        return null;
    }
  }
  function _0(n, r) {
    if (ou) return n === "compositionend" || !fi && jh(n, r) ? (n = Yd(), bs = Ss = Bi = null, ou = !1, n) : null;
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
        return zh && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Ph = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Fh(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Ph[n.type] : r === "textarea";
  }
  function $h(n, r, l, f) {
    al(f), r = Ds(r, "onChange"), 0 < r.length && (l = new Nc("onChange", "change", null, l, f), n.push({ event: l, listeners: r }));
  }
  var Ts = null, lu = null;
  function uu(n) {
    Hc(n, 0);
  }
  function su(n) {
    var r = fu(n);
    if (xe(r)) return n;
  }
  function Vh(n, r) {
    if (n === "change") return r;
  }
  var Jd = !1;
  if (T) {
    var ep;
    if (T) {
      var tp = "oninput" in document;
      if (!tp) {
        var Bh = document.createElement("div");
        Bh.setAttribute("oninput", "return;"), tp = typeof Bh.oninput == "function";
      }
      ep = tp;
    } else ep = !1;
    Jd = ep && (!document.documentMode || 9 < document.documentMode);
  }
  function Hh() {
    Ts && (Ts.detachEvent("onpropertychange", Ih), lu = Ts = null);
  }
  function Ih(n) {
    if (n.propertyName === "value" && su(lu)) {
      var r = [];
      $h(r, lu, n, mn(n)), Zl(uu, r);
    }
  }
  function k0(n, r, l) {
    n === "focusin" ? (Hh(), Ts = r, lu = l, Ts.attachEvent("onpropertychange", Ih)) : n === "focusout" && Hh();
  }
  function O0(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return su(lu);
  }
  function D0(n, r) {
    if (n === "click") return su(r);
  }
  function Yh(n, r) {
    if (n === "input" || n === "change") return su(r);
  }
  function M0(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Pa = typeof Object.is == "function" ? Object.is : M0;
  function xs(n, r) {
    if (Pa(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), f = Object.keys(r);
    if (l.length !== f.length) return !1;
    for (f = 0; f < l.length; f++) {
      var v = l[f];
      if (!w.call(r, v) || !Pa(n[v], r[v])) return !1;
    }
    return !0;
  }
  function Wh(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Gh(n, r) {
    var l = Wh(n);
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
      l = Wh(l);
    }
  }
  function qh(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? qh(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function $c() {
    for (var n = window, r = xt(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = xt(n.document);
    }
    return r;
  }
  function Yi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function Vc(n) {
    var r = $c(), l = n.focusedElem, f = n.selectionRange;
    if (r !== l && l && l.ownerDocument && qh(l.ownerDocument.documentElement, l)) {
      if (f !== null && Yi(l)) {
        if (r = f.start, n = f.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var v = l.textContent.length, S = Math.min(f.start, v);
          f = f.end === void 0 ? S : Math.min(f.end, v), !n.extend && S > f && (v = f, f = S, S = v), v = Gh(l, S);
          var E = Gh(
            l,
            f
          );
          v && E && (n.rangeCount !== 1 || n.anchorNode !== v.node || n.anchorOffset !== v.offset || n.focusNode !== E.node || n.focusOffset !== E.offset) && (r = r.createRange(), r.setStart(v.node, v.offset), n.removeAllRanges(), S > f ? (n.addRange(r), n.extend(E.node, E.offset)) : (r.setEnd(E.node, E.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Qh = T && "documentMode" in document && 11 >= document.documentMode, di = null, np = null, ws = null, rp = !1;
  function Kh(n, r, l) {
    var f = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    rp || di == null || di !== xt(f) || (f = di, "selectionStart" in f && Yi(f) ? f = { start: f.selectionStart, end: f.selectionEnd } : (f = (f.ownerDocument && f.ownerDocument.defaultView || window).getSelection(), f = { anchorNode: f.anchorNode, anchorOffset: f.anchorOffset, focusNode: f.focusNode, focusOffset: f.focusOffset }), ws && xs(ws, f) || (ws = f, f = Ds(np, "onSelect"), 0 < f.length && (r = new Nc("onSelect", "select", null, r, l), n.push({ event: r, listeners: f }), r.target = di)));
  }
  function Bc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var dl = { animationend: Bc("Animation", "AnimationEnd"), animationiteration: Bc("Animation", "AnimationIteration"), animationstart: Bc("Animation", "AnimationStart"), transitionend: Bc("Transition", "TransitionEnd") }, ap = {}, ip = {};
  T && (ip = document.createElement("div").style, "AnimationEvent" in window || (delete dl.animationend.animation, delete dl.animationiteration.animation, delete dl.animationstart.animation), "TransitionEvent" in window || delete dl.transitionend.transition);
  function dr(n) {
    if (ap[n]) return ap[n];
    if (!dl[n]) return n;
    var r = dl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in ip) return ap[n] = r[l];
    return n;
  }
  var op = dr("animationend"), Xh = dr("animationiteration"), Zh = dr("animationstart"), Jh = dr("transitionend"), em = /* @__PURE__ */ new Map(), tm = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Wi(n, r) {
    em.set(n, r), g(r, [n]);
  }
  for (var Rs = 0; Rs < tm.length; Rs++) {
    var pl = tm[Rs], A0 = pl.toLowerCase(), _s = pl[0].toUpperCase() + pl.slice(1);
    Wi(A0, "on" + _s);
  }
  Wi(op, "onAnimationEnd"), Wi(Xh, "onAnimationIteration"), Wi(Zh, "onAnimationStart"), Wi("dblclick", "onDoubleClick"), Wi("focusin", "onFocus"), Wi("focusout", "onBlur"), Wi(Jh, "onTransitionEnd"), h("onMouseEnter", ["mouseout", "mouseover"]), h("onMouseLeave", ["mouseout", "mouseover"]), h("onPointerEnter", ["pointerout", "pointerover"]), h("onPointerLeave", ["pointerout", "pointerover"]), g("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), g("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), g("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), g("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), g("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), g("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ks = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), N0 = new Set("cancel close invalid load scroll toggle".split(" ").concat(ks));
  function nm(n, r, l) {
    var f = n.type || "unknown-event";
    n.currentTarget = l, ze(f, r, void 0, n), n.currentTarget = null;
  }
  function Hc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var f = n[l], v = f.event;
      f = f.listeners;
      e: {
        var S = void 0;
        if (r) for (var E = f.length - 1; 0 <= E; E--) {
          var M = f[E], j = M.instance, ee = M.currentTarget;
          if (M = M.listener, j !== S && v.isPropagationStopped()) break e;
          nm(v, M, ee), S = j;
        }
        else for (E = 0; E < f.length; E++) {
          if (M = f[E], j = M.instance, ee = M.currentTarget, M = M.listener, j !== S && v.isPropagationStopped()) break e;
          nm(v, M, ee), S = j;
        }
      }
    }
    if (go) throw n = ll, go = !1, ll = null, n;
  }
  function pn(n, r) {
    var l = r[pp];
    l === void 0 && (l = r[pp] = /* @__PURE__ */ new Set());
    var f = n + "__bubble";
    l.has(f) || (rm(r, n, 2, !1), l.add(f));
  }
  function To(n, r, l) {
    var f = 0;
    r && (f |= 4), rm(l, n, f, r);
  }
  var Gi = "_reactListening" + Math.random().toString(36).slice(2);
  function cu(n) {
    if (!n[Gi]) {
      n[Gi] = !0, p.forEach(function(l) {
        l !== "selectionchange" && (N0.has(l) || To(l, !1, n), To(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Gi] || (r[Gi] = !0, To("selectionchange", !1, r));
    }
  }
  function rm(n, r, l, f) {
    switch (Id(r)) {
      case 1:
        var v = wh;
        break;
      case 4:
        v = Dc;
        break;
      default:
        v = Mc;
    }
    l = v.bind(null, r, l, n), v = void 0, !Jl || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (v = !0), f ? v !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: v }) : n.addEventListener(r, l, !0) : v !== void 0 ? n.addEventListener(r, l, { passive: v }) : n.addEventListener(r, l, !1);
  }
  function Ic(n, r, l, f, v) {
    var S = f;
    if (!(r & 1) && !(r & 2) && f !== null) e: for (; ; ) {
      if (f === null) return;
      var E = f.tag;
      if (E === 3 || E === 4) {
        var M = f.stateNode.containerInfo;
        if (M === v || M.nodeType === 8 && M.parentNode === v) break;
        if (E === 4) for (E = f.return; E !== null; ) {
          var j = E.tag;
          if ((j === 3 || j === 4) && (j = E.stateNode.containerInfo, j === v || j.nodeType === 8 && j.parentNode === v)) return;
          E = E.return;
        }
        for (; M !== null; ) {
          if (E = Fa(M), E === null) return;
          if (j = E.tag, j === 5 || j === 6) {
            f = S = E;
            continue e;
          }
          M = M.parentNode;
        }
      }
      f = f.return;
    }
    Zl(function() {
      var ee = S, Se = mn(l), Ce = [];
      e: {
        var ye = em.get(n);
        if (ye !== void 0) {
          var He = Nc, qe = n;
          switch (n) {
            case "keypress":
              if (ru(l) === 0) break e;
            case "keydown":
            case "keyup":
              He = x0;
              break;
            case "focusin":
              qe = "focus", He = Eo;
              break;
            case "focusout":
              qe = "blur", He = Eo;
              break;
            case "beforeblur":
            case "afterblur":
              He = Eo;
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
              He = zc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              He = Oh;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              He = w0;
              break;
            case op:
            case Xh:
            case Zh:
              He = Dh;
              break;
            case Jh:
              He = Lh;
              break;
            case "scroll":
              He = _h;
              break;
            case "wheel":
              He = Ii;
              break;
            case "copy":
            case "cut":
            case "paste":
              He = E0;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              He = Uc;
          }
          var Je = (r & 4) !== 0, Hn = !Je && n === "scroll", q = Je ? ye !== null ? ye + "Capture" : null : ye;
          Je = [];
          for (var $ = ee, X; $ !== null; ) {
            X = $;
            var we = X.stateNode;
            if (X.tag === 5 && we !== null && (X = we, q !== null && (we = ol($, q), we != null && Je.push(Os($, we, X)))), Hn) break;
            $ = $.return;
          }
          0 < Je.length && (ye = new He(ye, qe, null, l, Se), Ce.push({ event: ye, listeners: Je }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (ye = n === "mouseover" || n === "pointerover", He = n === "mouseout" || n === "pointerout", ye && l !== Xr && (qe = l.relatedTarget || l.fromElement) && (Fa(qe) || qe[qi])) break e;
          if ((He || ye) && (ye = Se.window === Se ? Se : (ye = Se.ownerDocument) ? ye.defaultView || ye.parentWindow : window, He ? (qe = l.relatedTarget || l.toElement, He = ee, qe = qe ? Fa(qe) : null, qe !== null && (Hn = ct(qe), qe !== Hn || qe.tag !== 5 && qe.tag !== 6) && (qe = null)) : (He = null, qe = ee), He !== qe)) {
            if (Je = zc, we = "onMouseLeave", q = "onMouseEnter", $ = "mouse", (n === "pointerout" || n === "pointerover") && (Je = Uc, we = "onPointerLeave", q = "onPointerEnter", $ = "pointer"), Hn = He == null ? ye : fu(He), X = qe == null ? ye : fu(qe), ye = new Je(we, $ + "leave", He, l, Se), ye.target = Hn, ye.relatedTarget = X, we = null, Fa(Se) === ee && (Je = new Je(q, $ + "enter", qe, l, Se), Je.target = X, Je.relatedTarget = Hn, we = Je), Hn = we, He && qe) t: {
              for (Je = He, q = qe, $ = 0, X = Je; X; X = vl(X)) $++;
              for (X = 0, we = q; we; we = vl(we)) X++;
              for (; 0 < $ - X; ) Je = vl(Je), $--;
              for (; 0 < X - $; ) q = vl(q), X--;
              for (; $--; ) {
                if (Je === q || q !== null && Je === q.alternate) break t;
                Je = vl(Je), q = vl(q);
              }
              Je = null;
            }
            else Je = null;
            He !== null && lp(Ce, ye, He, Je, !1), qe !== null && Hn !== null && lp(Ce, Hn, qe, Je, !0);
          }
        }
        e: {
          if (ye = ee ? fu(ee) : window, He = ye.nodeName && ye.nodeName.toLowerCase(), He === "select" || He === "input" && ye.type === "file") var at = Vh;
          else if (Fh(ye)) if (Jd) at = Yh;
          else {
            at = O0;
            var mt = k0;
          }
          else (He = ye.nodeName) && He.toLowerCase() === "input" && (ye.type === "checkbox" || ye.type === "radio") && (at = D0);
          if (at && (at = at(n, ee))) {
            $h(Ce, at, l, Se);
            break e;
          }
          mt && mt(n, ye, ee), n === "focusout" && (mt = ye._wrapperState) && mt.controlled && ye.type === "number" && G(ye, "number", ye.value);
        }
        switch (mt = ee ? fu(ee) : window, n) {
          case "focusin":
            (Fh(mt) || mt.contentEditable === "true") && (di = mt, np = ee, ws = null);
            break;
          case "focusout":
            ws = np = di = null;
            break;
          case "mousedown":
            rp = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            rp = !1, Kh(Ce, l, Se);
            break;
          case "selectionchange":
            if (Qh) break;
          case "keydown":
          case "keyup":
            Kh(Ce, l, Se);
        }
        var Qe;
        if (fi) e: {
          switch (n) {
            case "compositionstart":
              var St = "onCompositionStart";
              break e;
            case "compositionend":
              St = "onCompositionEnd";
              break e;
            case "compositionupdate":
              St = "onCompositionUpdate";
              break e;
          }
          St = void 0;
        }
        else ou ? jh(n, l) && (St = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (St = "onCompositionStart");
        St && (zh && l.locale !== "ko" && (ou || St !== "onCompositionStart" ? St === "onCompositionEnd" && ou && (Qe = Yd()) : (Bi = Se, Ss = "value" in Bi ? Bi.value : Bi.textContent, ou = !0)), mt = Ds(ee, St), 0 < mt.length && (St = new qd(St, n, null, l, Se), Ce.push({ event: St, listeners: mt }), Qe ? St.data = Qe : (Qe = Fc(l), Qe !== null && (St.data = Qe)))), (Qe = Pc ? R0(n, l) : _0(n, l)) && (ee = Ds(ee, "onBeforeInput"), 0 < ee.length && (Se = new qd("onBeforeInput", "beforeinput", null, l, Se), Ce.push({ event: Se, listeners: ee }), Se.data = Qe));
      }
      Hc(Ce, r);
    });
  }
  function Os(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function Ds(n, r) {
    for (var l = r + "Capture", f = []; n !== null; ) {
      var v = n, S = v.stateNode;
      v.tag === 5 && S !== null && (v = S, S = ol(n, l), S != null && f.unshift(Os(n, S, v)), S = ol(n, r), S != null && f.push(Os(n, S, v))), n = n.return;
    }
    return f;
  }
  function vl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function lp(n, r, l, f, v) {
    for (var S = r._reactName, E = []; l !== null && l !== f; ) {
      var M = l, j = M.alternate, ee = M.stateNode;
      if (j !== null && j === f) break;
      M.tag === 5 && ee !== null && (M = ee, v ? (j = ol(l, S), j != null && E.unshift(Os(l, j, M))) : v || (j = ol(l, S), j != null && E.push(Os(l, j, M)))), l = l.return;
    }
    E.length !== 0 && n.push({ event: r, listeners: E });
  }
  var up = /\r\n?/g, L0 = /\u0000|\uFFFD/g;
  function sp(n) {
    return (typeof n == "string" ? n : "" + n).replace(up, `
`).replace(L0, "");
  }
  function Yc(n, r, l) {
    if (r = sp(r), sp(n) !== r && l) throw Error(c(425));
  }
  function Wc() {
  }
  var cp = null, hl = null;
  function Ms(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var ml = typeof setTimeout == "function" ? setTimeout : void 0, am = typeof clearTimeout == "function" ? clearTimeout : void 0, fp = typeof Promise == "function" ? Promise : void 0, dp = typeof queueMicrotask == "function" ? queueMicrotask : typeof fp < "u" ? function(n) {
    return fp.resolve(null).then(n).catch(z0);
  } : ml;
  function z0(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function xo(n, r) {
    var l = r, f = 0;
    do {
      var v = l.nextSibling;
      if (n.removeChild(l), v && v.nodeType === 8) if (l = v.data, l === "/$") {
        if (f === 0) {
          n.removeChild(v), ys(r);
          return;
        }
        f--;
      } else l !== "$" && l !== "$?" && l !== "$!" || f++;
      l = v;
    } while (l);
    ys(r);
  }
  function pi(n) {
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
  function As(n) {
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
  var wo = Math.random().toString(36).slice(2), Ti = "__reactFiber$" + wo, yl = "__reactProps$" + wo, qi = "__reactContainer$" + wo, pp = "__reactEvents$" + wo, U0 = "__reactListeners$" + wo, vp = "__reactHandles$" + wo;
  function Fa(n) {
    var r = n[Ti];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[qi] || l[Ti]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = As(n); n !== null; ) {
          if (l = n[Ti]) return l;
          n = As(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Ns(n) {
    return n = n[Ti] || n[qi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function fu(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(c(33));
  }
  function dt(n) {
    return n[yl] || null;
  }
  var Ro = [], bn = -1;
  function Mt(n) {
    return { current: n };
  }
  function Qt(n) {
    0 > bn || (n.current = Ro[bn], Ro[bn] = null, bn--);
  }
  function Xt(n, r) {
    bn++, Ro[bn] = n.current, n.current = r;
  }
  var xi = {}, wt = Mt(xi), zn = Mt(!1), ea = xi;
  function $a(n, r) {
    var l = n.type.contextTypes;
    if (!l) return xi;
    var f = n.stateNode;
    if (f && f.__reactInternalMemoizedUnmaskedChildContext === r) return f.__reactInternalMemoizedMaskedChildContext;
    var v = {}, S;
    for (S in l) v[S] = r[S];
    return f && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = v), v;
  }
  function _n(n) {
    return n = n.childContextTypes, n != null;
  }
  function Va() {
    Qt(zn), Qt(wt);
  }
  function _o(n, r, l) {
    if (wt.current !== xi) throw Error(c(168));
    Xt(wt, r), Xt(zn, l);
  }
  function Ls(n, r, l) {
    var f = n.stateNode;
    if (r = r.childContextTypes, typeof f.getChildContext != "function") return l;
    f = f.getChildContext();
    for (var v in f) if (!(v in r)) throw Error(c(108, ot(n) || "Unknown", v));
    return W({}, l, f);
  }
  function Gc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || xi, ea = wt.current, Xt(wt, n), Xt(zn, zn.current), !0;
  }
  function im(n, r, l) {
    var f = n.stateNode;
    if (!f) throw Error(c(169));
    l ? (n = Ls(n, r, ea), f.__reactInternalMemoizedMergedChildContext = n, Qt(zn), Qt(wt), Xt(wt, n)) : Qt(zn), Xt(zn, l);
  }
  var Ca = null, pr = !1, zs = !1;
  function hp(n) {
    Ca === null ? Ca = [n] : Ca.push(n);
  }
  function mp(n) {
    pr = !0, hp(n);
  }
  function ta() {
    if (!zs && Ca !== null) {
      zs = !0;
      var n = 0, r = Jt;
      try {
        var l = Ca;
        for (Jt = 1; n < l.length; n++) {
          var f = l[n];
          do
            f = f(!0);
          while (f !== null);
        }
        Ca = null, pr = !1;
      } catch (v) {
        throw Ca !== null && (Ca = Ca.slice(n + 1)), Sn(Sa, ta), v;
      } finally {
        Jt = r, zs = !1;
      }
    }
    return null;
  }
  var ko = [], na = 0, gl = null, du = 0, ra = [], Lr = 0, Ba = null, br = 1, Qi = "";
  function Ea(n, r) {
    ko[na++] = du, ko[na++] = gl, gl = n, du = r;
  }
  function yp(n, r, l) {
    ra[Lr++] = br, ra[Lr++] = Qi, ra[Lr++] = Ba, Ba = n;
    var f = br;
    n = Qi;
    var v = 32 - za(f) - 1;
    f &= ~(1 << v), l += 1;
    var S = 32 - za(r) + v;
    if (30 < S) {
      var E = v - v % 5;
      S = (f & (1 << E) - 1).toString(32), f >>= E, v -= E, br = 1 << 32 - za(r) + v | l << v | f, Qi = S + n;
    } else br = 1 << S | l << v | f, Qi = n;
  }
  function qc(n) {
    n.return !== null && (Ea(n, 1), yp(n, 1, 0));
  }
  function gp(n) {
    for (; n === gl; ) gl = ko[--na], ko[na] = null, du = ko[--na], ko[na] = null;
    for (; n === Ba; ) Ba = ra[--Lr], ra[Lr] = null, Qi = ra[--Lr], ra[Lr] = null, br = ra[--Lr], ra[Lr] = null;
  }
  var Ta = null, aa = null, Cn = !1, Ha = null;
  function Sp(n, r) {
    var l = Xa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function om(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Ta = n, aa = pi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Ta = n, aa = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Ba !== null ? { id: br, overflow: Qi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Xa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Ta = n, aa = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Qc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function Kc(n) {
    if (Cn) {
      var r = aa;
      if (r) {
        var l = r;
        if (!om(n, r)) {
          if (Qc(n)) throw Error(c(418));
          r = pi(l.nextSibling);
          var f = Ta;
          r && om(n, r) ? Sp(f, l) : (n.flags = n.flags & -4097 | 2, Cn = !1, Ta = n);
        }
      } else {
        if (Qc(n)) throw Error(c(418));
        n.flags = n.flags & -4097 | 2, Cn = !1, Ta = n;
      }
    }
  }
  function lm(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Ta = n;
  }
  function Xc(n) {
    if (n !== Ta) return !1;
    if (!Cn) return lm(n), Cn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Ms(n.type, n.memoizedProps)), r && (r = aa)) {
      if (Qc(n)) throw um(), Error(c(418));
      for (; r; ) Sp(n, r), r = pi(r.nextSibling);
    }
    if (lm(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(c(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                aa = pi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        aa = null;
      }
    } else aa = Ta ? pi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function um() {
    for (var n = aa; n; ) n = pi(n.nextSibling);
  }
  function Mn() {
    aa = Ta = null, Cn = !1;
  }
  function bp(n) {
    Ha === null ? Ha = [n] : Ha.push(n);
  }
  var Zc = J.ReactCurrentBatchConfig;
  function Sl(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(c(309));
          var f = l.stateNode;
        }
        if (!f) throw Error(c(147, n));
        var v = f, S = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === S ? r.ref : (r = function(E) {
          var M = v.refs;
          E === null ? delete M[S] : M[S] = E;
        }, r._stringRef = S, r);
      }
      if (typeof n != "string") throw Error(c(284));
      if (!l._owner) throw Error(c(290, n));
    }
    return n;
  }
  function wi(n, r) {
    throw n = Object.prototype.toString.call(r), Error(c(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function sm(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Jc(n) {
    function r(q, $) {
      if (n) {
        var X = q.deletions;
        X === null ? (q.deletions = [$], q.flags |= 16) : X.push($);
      }
    }
    function l(q, $) {
      if (!n) return null;
      for (; $ !== null; ) r(q, $), $ = $.sibling;
      return null;
    }
    function f(q, $) {
      for (q = /* @__PURE__ */ new Map(); $ !== null; ) $.key !== null ? q.set($.key, $) : q.set($.index, $), $ = $.sibling;
      return q;
    }
    function v(q, $) {
      return q = Uo(q, $), q.index = 0, q.sibling = null, q;
    }
    function S(q, $, X) {
      return q.index = X, n ? (X = q.alternate, X !== null ? (X = X.index, X < $ ? (q.flags |= 2, $) : X) : (q.flags |= 2, $)) : (q.flags |= 1048576, $);
    }
    function E(q) {
      return n && q.alternate === null && (q.flags |= 2), q;
    }
    function M(q, $, X, we) {
      return $ === null || $.tag !== 6 ? ($ = Vf(X, q.mode, we), $.return = q, $) : ($ = v($, X), $.return = q, $);
    }
    function j(q, $, X, we) {
      var at = X.type;
      return at === ie ? Se(q, $, X.props.children, we, X.key) : $ !== null && ($.elementType === at || typeof at == "object" && at !== null && at.$$typeof === Be && sm(at) === $.type) ? (we = v($, X.props), we.ref = Sl(q, $, X), we.return = q, we) : (we = Ff(X.type, X.key, X.props, null, q.mode, we), we.ref = Sl(q, $, X), we.return = q, we);
    }
    function ee(q, $, X, we) {
      return $ === null || $.tag !== 4 || $.stateNode.containerInfo !== X.containerInfo || $.stateNode.implementation !== X.implementation ? ($ = Js(X, q.mode, we), $.return = q, $) : ($ = v($, X.children || []), $.return = q, $);
    }
    function Se(q, $, X, we, at) {
      return $ === null || $.tag !== 7 ? ($ = Ll(X, q.mode, we, at), $.return = q, $) : ($ = v($, X), $.return = q, $);
    }
    function Ce(q, $, X) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") return $ = Vf("" + $, q.mode, X), $.return = q, $;
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case U:
            return X = Ff($.type, $.key, $.props, null, q.mode, X), X.ref = Sl(q, null, $), X.return = q, X;
          case de:
            return $ = Js($, q.mode, X), $.return = q, $;
          case Be:
            var we = $._init;
            return Ce(q, we($._payload), X);
        }
        if (re($) || ke($)) return $ = Ll($, q.mode, X, null), $.return = q, $;
        wi(q, $);
      }
      return null;
    }
    function ye(q, $, X, we) {
      var at = $ !== null ? $.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number") return at !== null ? null : M(q, $, "" + X, we);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case U:
            return X.key === at ? j(q, $, X, we) : null;
          case de:
            return X.key === at ? ee(q, $, X, we) : null;
          case Be:
            return at = X._init, ye(
              q,
              $,
              at(X._payload),
              we
            );
        }
        if (re(X) || ke(X)) return at !== null ? null : Se(q, $, X, we, null);
        wi(q, X);
      }
      return null;
    }
    function He(q, $, X, we, at) {
      if (typeof we == "string" && we !== "" || typeof we == "number") return q = q.get(X) || null, M($, q, "" + we, at);
      if (typeof we == "object" && we !== null) {
        switch (we.$$typeof) {
          case U:
            return q = q.get(we.key === null ? X : we.key) || null, j($, q, we, at);
          case de:
            return q = q.get(we.key === null ? X : we.key) || null, ee($, q, we, at);
          case Be:
            var mt = we._init;
            return He(q, $, X, mt(we._payload), at);
        }
        if (re(we) || ke(we)) return q = q.get(X) || null, Se($, q, we, at, null);
        wi($, we);
      }
      return null;
    }
    function qe(q, $, X, we) {
      for (var at = null, mt = null, Qe = $, St = $ = 0, ar = null; Qe !== null && St < X.length; St++) {
        Qe.index > St ? (ar = Qe, Qe = null) : ar = Qe.sibling;
        var It = ye(q, Qe, X[St], we);
        if (It === null) {
          Qe === null && (Qe = ar);
          break;
        }
        n && Qe && It.alternate === null && r(q, Qe), $ = S(It, $, St), mt === null ? at = It : mt.sibling = It, mt = It, Qe = ar;
      }
      if (St === X.length) return l(q, Qe), Cn && Ea(q, St), at;
      if (Qe === null) {
        for (; St < X.length; St++) Qe = Ce(q, X[St], we), Qe !== null && ($ = S(Qe, $, St), mt === null ? at = Qe : mt.sibling = Qe, mt = Qe);
        return Cn && Ea(q, St), at;
      }
      for (Qe = f(q, Qe); St < X.length; St++) ar = He(Qe, q, St, X[St], we), ar !== null && (n && ar.alternate !== null && Qe.delete(ar.key === null ? St : ar.key), $ = S(ar, $, St), mt === null ? at = ar : mt.sibling = ar, mt = ar);
      return n && Qe.forEach(function(no) {
        return r(q, no);
      }), Cn && Ea(q, St), at;
    }
    function Je(q, $, X, we) {
      var at = ke(X);
      if (typeof at != "function") throw Error(c(150));
      if (X = at.call(X), X == null) throw Error(c(151));
      for (var mt = at = null, Qe = $, St = $ = 0, ar = null, It = X.next(); Qe !== null && !It.done; St++, It = X.next()) {
        Qe.index > St ? (ar = Qe, Qe = null) : ar = Qe.sibling;
        var no = ye(q, Qe, It.value, we);
        if (no === null) {
          Qe === null && (Qe = ar);
          break;
        }
        n && Qe && no.alternate === null && r(q, Qe), $ = S(no, $, St), mt === null ? at = no : mt.sibling = no, mt = no, Qe = ar;
      }
      if (It.done) return l(
        q,
        Qe
      ), Cn && Ea(q, St), at;
      if (Qe === null) {
        for (; !It.done; St++, It = X.next()) It = Ce(q, It.value, we), It !== null && ($ = S(It, $, St), mt === null ? at = It : mt.sibling = It, mt = It);
        return Cn && Ea(q, St), at;
      }
      for (Qe = f(q, Qe); !It.done; St++, It = X.next()) It = He(Qe, q, St, It.value, we), It !== null && (n && It.alternate !== null && Qe.delete(It.key === null ? St : It.key), $ = S(It, $, St), mt === null ? at = It : mt.sibling = It, mt = It);
      return n && Qe.forEach(function(eS) {
        return r(q, eS);
      }), Cn && Ea(q, St), at;
    }
    function Hn(q, $, X, we) {
      if (typeof X == "object" && X !== null && X.type === ie && X.key === null && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case U:
            e: {
              for (var at = X.key, mt = $; mt !== null; ) {
                if (mt.key === at) {
                  if (at = X.type, at === ie) {
                    if (mt.tag === 7) {
                      l(q, mt.sibling), $ = v(mt, X.props.children), $.return = q, q = $;
                      break e;
                    }
                  } else if (mt.elementType === at || typeof at == "object" && at !== null && at.$$typeof === Be && sm(at) === mt.type) {
                    l(q, mt.sibling), $ = v(mt, X.props), $.ref = Sl(q, mt, X), $.return = q, q = $;
                    break e;
                  }
                  l(q, mt);
                  break;
                } else r(q, mt);
                mt = mt.sibling;
              }
              X.type === ie ? ($ = Ll(X.props.children, q.mode, we, X.key), $.return = q, q = $) : (we = Ff(X.type, X.key, X.props, null, q.mode, we), we.ref = Sl(q, $, X), we.return = q, q = we);
            }
            return E(q);
          case de:
            e: {
              for (mt = X.key; $ !== null; ) {
                if ($.key === mt) if ($.tag === 4 && $.stateNode.containerInfo === X.containerInfo && $.stateNode.implementation === X.implementation) {
                  l(q, $.sibling), $ = v($, X.children || []), $.return = q, q = $;
                  break e;
                } else {
                  l(q, $);
                  break;
                }
                else r(q, $);
                $ = $.sibling;
              }
              $ = Js(X, q.mode, we), $.return = q, q = $;
            }
            return E(q);
          case Be:
            return mt = X._init, Hn(q, $, mt(X._payload), we);
        }
        if (re(X)) return qe(q, $, X, we);
        if (ke(X)) return Je(q, $, X, we);
        wi(q, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" ? (X = "" + X, $ !== null && $.tag === 6 ? (l(q, $.sibling), $ = v($, X), $.return = q, q = $) : (l(q, $), $ = Vf(X, q.mode, we), $.return = q, q = $), E(q)) : l(q, $);
    }
    return Hn;
  }
  var pu = Jc(!0), cm = Jc(!1), Ki = Mt(null), er = null, Ue = null, Ia = null;
  function xa() {
    Ia = Ue = er = null;
  }
  function Cp(n) {
    var r = Ki.current;
    Qt(Ki), n._currentValue = r;
  }
  function Ep(n, r, l) {
    for (; n !== null; ) {
      var f = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, f !== null && (f.childLanes |= r)) : f !== null && (f.childLanes & r) !== r && (f.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function vu(n, r) {
    er = n, Ia = Ue = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (la = !0), n.firstContext = null);
  }
  function Ya(n) {
    var r = n._currentValue;
    if (Ia !== n) if (n = { context: n, memoizedValue: r, next: null }, Ue === null) {
      if (er === null) throw Error(c(308));
      Ue = n, er.dependencies = { lanes: 0, firstContext: n };
    } else Ue = Ue.next = n;
    return r;
  }
  var bl = null;
  function Gn(n) {
    bl === null ? bl = [n] : bl.push(n);
  }
  function fm(n, r, l, f) {
    var v = r.interleaved;
    return v === null ? (l.next = l, Gn(r)) : (l.next = v.next, v.next = l), r.interleaved = l, Xi(n, f);
  }
  function Xi(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Oo = !1;
  function ef(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function hu(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function ia(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Do(n, r, l) {
    var f = n.updateQueue;
    if (f === null) return null;
    if (f = f.shared, Pt & 2) {
      var v = f.pending;
      return v === null ? r.next = r : (r.next = v.next, v.next = r), f.pending = r, Xi(n, l);
    }
    return v = f.interleaved, v === null ? (r.next = r, Gn(f)) : (r.next = v.next, v.next = r), f.interleaved = r, Xi(n, l);
  }
  function tf(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var f = r.lanes;
      f &= n.pendingLanes, l |= f, r.lanes = l, ps(n, l);
    }
  }
  function dm(n, r) {
    var l = n.updateQueue, f = n.alternate;
    if (f !== null && (f = f.updateQueue, l === f)) {
      var v = null, S = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var E = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          S === null ? v = S = E : S = S.next = E, l = l.next;
        } while (l !== null);
        S === null ? v = S = r : S = S.next = r;
      } else v = S = r;
      l = { baseState: f.baseState, firstBaseUpdate: v, lastBaseUpdate: S, shared: f.shared, effects: f.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function nf(n, r, l, f) {
    var v = n.updateQueue;
    Oo = !1;
    var S = v.firstBaseUpdate, E = v.lastBaseUpdate, M = v.shared.pending;
    if (M !== null) {
      v.shared.pending = null;
      var j = M, ee = j.next;
      j.next = null, E === null ? S = ee : E.next = ee, E = j;
      var Se = n.alternate;
      Se !== null && (Se = Se.updateQueue, M = Se.lastBaseUpdate, M !== E && (M === null ? Se.firstBaseUpdate = ee : M.next = ee, Se.lastBaseUpdate = j));
    }
    if (S !== null) {
      var Ce = v.baseState;
      E = 0, Se = ee = j = null, M = S;
      do {
        var ye = M.lane, He = M.eventTime;
        if ((f & ye) === ye) {
          Se !== null && (Se = Se.next = {
            eventTime: He,
            lane: 0,
            tag: M.tag,
            payload: M.payload,
            callback: M.callback,
            next: null
          });
          e: {
            var qe = n, Je = M;
            switch (ye = r, He = l, Je.tag) {
              case 1:
                if (qe = Je.payload, typeof qe == "function") {
                  Ce = qe.call(He, Ce, ye);
                  break e;
                }
                Ce = qe;
                break e;
              case 3:
                qe.flags = qe.flags & -65537 | 128;
              case 0:
                if (qe = Je.payload, ye = typeof qe == "function" ? qe.call(He, Ce, ye) : qe, ye == null) break e;
                Ce = W({}, Ce, ye);
                break e;
              case 2:
                Oo = !0;
            }
          }
          M.callback !== null && M.lane !== 0 && (n.flags |= 64, ye = v.effects, ye === null ? v.effects = [M] : ye.push(M));
        } else He = { eventTime: He, lane: ye, tag: M.tag, payload: M.payload, callback: M.callback, next: null }, Se === null ? (ee = Se = He, j = Ce) : Se = Se.next = He, E |= ye;
        if (M = M.next, M === null) {
          if (M = v.shared.pending, M === null) break;
          ye = M, M = ye.next, ye.next = null, v.lastBaseUpdate = ye, v.shared.pending = null;
        }
      } while (!0);
      if (Se === null && (j = Ce), v.baseState = j, v.firstBaseUpdate = ee, v.lastBaseUpdate = Se, r = v.shared.interleaved, r !== null) {
        v = r;
        do
          E |= v.lane, v = v.next;
        while (v !== r);
      } else S === null && (v.shared.lanes = 0);
      Dl |= E, n.lanes = E, n.memoizedState = Ce;
    }
  }
  function pm(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var f = n[r], v = f.callback;
      if (v !== null) {
        if (f.callback = null, f = l, typeof v != "function") throw Error(c(191, v));
        v.call(f);
      }
    }
  }
  var Us = {}, vi = Mt(Us), mu = Mt(Us), js = Mt(Us);
  function Cl(n) {
    if (n === Us) throw Error(c(174));
    return n;
  }
  function Tp(n, r) {
    switch (Xt(js, r), Xt(mu, n), Xt(vi, Us), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : tt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = tt(r, n);
    }
    Qt(vi), Xt(vi, r);
  }
  function yu() {
    Qt(vi), Qt(mu), Qt(js);
  }
  function vm(n) {
    Cl(js.current);
    var r = Cl(vi.current), l = tt(r, n.type);
    r !== l && (Xt(mu, n), Xt(vi, l));
  }
  function xp(n) {
    mu.current === n && (Qt(vi), Qt(mu));
  }
  var kn = Mt(0);
  function rf(n) {
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
  var af = [];
  function wp() {
    for (var n = 0; n < af.length; n++) af[n]._workInProgressVersionPrimary = null;
    af.length = 0;
  }
  var of = J.ReactCurrentDispatcher, Ps = J.ReactCurrentBatchConfig, rt = 0, lt = null, Rt = null, Ut = null, wa = !1, gu = !1, Fs = 0, j0 = 0;
  function zr() {
    throw Error(c(321));
  }
  function $s(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Pa(n[l], r[l])) return !1;
    return !0;
  }
  function me(n, r, l, f, v, S) {
    if (rt = S, lt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, of.current = n === null || n.memoizedState === null ? P0 : gn, n = l(f, v), gu) {
      S = 0;
      do {
        if (gu = !1, Fs = 0, 25 <= S) throw Error(c(301));
        S += 1, Ut = Rt = null, r.updateQueue = null, of.current = Cf, n = l(f, v);
      } while (gu);
    }
    if (of.current = Ur, r = Rt !== null && Rt.next !== null, rt = 0, Ut = Rt = lt = null, wa = !1, r) throw Error(c(300));
    return n;
  }
  function qn() {
    var n = Fs !== 0;
    return Fs = 0, n;
  }
  function ft() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Ut === null ? lt.memoizedState = Ut = n : Ut = Ut.next = n, Ut;
  }
  function Cr() {
    if (Rt === null) {
      var n = lt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = Rt.next;
    var r = Ut === null ? lt.memoizedState : Ut.next;
    if (r !== null) Ut = r, Rt = n;
    else {
      if (n === null) throw Error(c(310));
      Rt = n, n = { memoizedState: Rt.memoizedState, baseState: Rt.baseState, baseQueue: Rt.baseQueue, queue: Rt.queue, next: null }, Ut === null ? lt.memoizedState = Ut = n : Ut = Ut.next = n;
    }
    return Ut;
  }
  function Ra(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Zi(n) {
    var r = Cr(), l = r.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var f = Rt, v = f.baseQueue, S = l.pending;
    if (S !== null) {
      if (v !== null) {
        var E = v.next;
        v.next = S.next, S.next = E;
      }
      f.baseQueue = v = S, l.pending = null;
    }
    if (v !== null) {
      S = v.next, f = f.baseState;
      var M = E = null, j = null, ee = S;
      do {
        var Se = ee.lane;
        if ((rt & Se) === Se) j !== null && (j = j.next = { lane: 0, action: ee.action, hasEagerState: ee.hasEagerState, eagerState: ee.eagerState, next: null }), f = ee.hasEagerState ? ee.eagerState : n(f, ee.action);
        else {
          var Ce = {
            lane: Se,
            action: ee.action,
            hasEagerState: ee.hasEagerState,
            eagerState: ee.eagerState,
            next: null
          };
          j === null ? (M = j = Ce, E = f) : j = j.next = Ce, lt.lanes |= Se, Dl |= Se;
        }
        ee = ee.next;
      } while (ee !== null && ee !== S);
      j === null ? E = f : j.next = M, Pa(f, r.memoizedState) || (la = !0), r.memoizedState = f, r.baseState = E, r.baseQueue = j, l.lastRenderedState = f;
    }
    if (n = l.interleaved, n !== null) {
      v = n;
      do
        S = v.lane, lt.lanes |= S, Dl |= S, v = v.next;
      while (v !== n);
    } else v === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Wa(n) {
    var r = Cr(), l = r.queue;
    if (l === null) throw Error(c(311));
    l.lastRenderedReducer = n;
    var f = l.dispatch, v = l.pending, S = r.memoizedState;
    if (v !== null) {
      l.pending = null;
      var E = v = v.next;
      do
        S = n(S, E.action), E = E.next;
      while (E !== v);
      Pa(S, r.memoizedState) || (la = !0), r.memoizedState = S, r.baseQueue === null && (r.baseState = S), l.lastRenderedState = S;
    }
    return [S, f];
  }
  function Su() {
  }
  function El(n, r) {
    var l = lt, f = Cr(), v = r(), S = !Pa(f.memoizedState, v);
    if (S && (f.memoizedState = v, la = !0), f = f.queue, Vs(uf.bind(null, l, f, n), [n]), f.getSnapshot !== r || S || Ut !== null && Ut.memoizedState.tag & 1) {
      if (l.flags |= 2048, Tl(9, lf.bind(null, l, f, v, r), void 0, null), jn === null) throw Error(c(349));
      rt & 30 || bu(l, r, v);
    }
    return v;
  }
  function bu(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, lt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function lf(n, r, l, f) {
    r.value = l, r.getSnapshot = f, sf(r) && cf(n);
  }
  function uf(n, r, l) {
    return l(function() {
      sf(r) && cf(n);
    });
  }
  function sf(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Pa(n, l);
    } catch {
      return !0;
    }
  }
  function cf(n) {
    var r = Xi(n, 1);
    r !== null && An(r, n, 1, -1);
  }
  function ff(n) {
    var r = ft();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ra, lastRenderedState: n }, r.queue = n, n = n.dispatch = Bs.bind(null, lt, n), [r.memoizedState, n];
  }
  function Tl(n, r, l, f) {
    return n = { tag: n, create: r, destroy: l, deps: f, next: null }, r = lt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, lt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (f = l.next, l.next = n, n.next = f, r.lastEffect = n)), n;
  }
  function df() {
    return Cr().memoizedState;
  }
  function Cu(n, r, l, f) {
    var v = ft();
    lt.flags |= n, v.memoizedState = Tl(1 | r, l, void 0, f === void 0 ? null : f);
  }
  function Eu(n, r, l, f) {
    var v = Cr();
    f = f === void 0 ? null : f;
    var S = void 0;
    if (Rt !== null) {
      var E = Rt.memoizedState;
      if (S = E.destroy, f !== null && $s(f, E.deps)) {
        v.memoizedState = Tl(r, l, S, f);
        return;
      }
    }
    lt.flags |= n, v.memoizedState = Tl(1 | r, l, S, f);
  }
  function pf(n, r) {
    return Cu(8390656, 8, n, r);
  }
  function Vs(n, r) {
    return Eu(2048, 8, n, r);
  }
  function vf(n, r) {
    return Eu(4, 2, n, r);
  }
  function hf(n, r) {
    return Eu(4, 4, n, r);
  }
  function mf(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function yf(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Eu(4, 4, mf.bind(null, r, n), l);
  }
  function Tu() {
  }
  function xl(n, r) {
    var l = Cr();
    r = r === void 0 ? null : r;
    var f = l.memoizedState;
    return f !== null && r !== null && $s(r, f[1]) ? f[0] : (l.memoizedState = [n, r], n);
  }
  function gf(n, r) {
    var l = Cr();
    r = r === void 0 ? null : r;
    var f = l.memoizedState;
    return f !== null && r !== null && $s(r, f[1]) ? f[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Sf(n, r, l) {
    return rt & 21 ? (Pa(l, r) || (l = kc(), lt.lanes |= l, Dl |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, la = !0), n.memoizedState = l);
  }
  function Rp(n, r) {
    var l = Jt;
    Jt = l !== 0 && 4 > l ? l : 4, n(!0);
    var f = Ps.transition;
    Ps.transition = {};
    try {
      n(!1), r();
    } finally {
      Jt = l, Ps.transition = f;
    }
  }
  function bf() {
    return Cr().memoizedState;
  }
  function hm(n, r, l) {
    var f = to(n);
    if (l = { lane: f, action: l, hasEagerState: !1, eagerState: null, next: null }, _p(n)) xu(r, l);
    else if (l = fm(n, r, l, f), l !== null) {
      var v = mr();
      An(l, n, f, v), Mo(l, r, f);
    }
  }
  function Bs(n, r, l) {
    var f = to(n), v = { lane: f, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (_p(n)) xu(r, v);
    else {
      var S = n.alternate;
      if (n.lanes === 0 && (S === null || S.lanes === 0) && (S = r.lastRenderedReducer, S !== null)) try {
        var E = r.lastRenderedState, M = S(E, l);
        if (v.hasEagerState = !0, v.eagerState = M, Pa(M, E)) {
          var j = r.interleaved;
          j === null ? (v.next = v, Gn(r)) : (v.next = j.next, j.next = v), r.interleaved = v;
          return;
        }
      } catch {
      } finally {
      }
      l = fm(n, r, v, f), l !== null && (v = mr(), An(l, n, f, v), Mo(l, r, f));
    }
  }
  function _p(n) {
    var r = n.alternate;
    return n === lt || r !== null && r === lt;
  }
  function xu(n, r) {
    gu = wa = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Mo(n, r, l) {
    if (l & 4194240) {
      var f = r.lanes;
      f &= n.pendingLanes, l |= f, r.lanes = l, ps(n, l);
    }
  }
  var Ur = { readContext: Ya, useCallback: zr, useContext: zr, useEffect: zr, useImperativeHandle: zr, useInsertionEffect: zr, useLayoutEffect: zr, useMemo: zr, useReducer: zr, useRef: zr, useState: zr, useDebugValue: zr, useDeferredValue: zr, useTransition: zr, useMutableSource: zr, useSyncExternalStore: zr, useId: zr, unstable_isNewReconciler: !1 }, P0 = { readContext: Ya, useCallback: function(n, r) {
    return ft().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ya, useEffect: pf, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Cu(
      4194308,
      4,
      mf.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Cu(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Cu(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = ft();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var f = ft();
    return r = l !== void 0 ? l(r) : r, f.memoizedState = f.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, f.queue = n, n = n.dispatch = hm.bind(null, lt, n), [f.memoizedState, n];
  }, useRef: function(n) {
    var r = ft();
    return n = { current: n }, r.memoizedState = n;
  }, useState: ff, useDebugValue: Tu, useDeferredValue: function(n) {
    return ft().memoizedState = n;
  }, useTransition: function() {
    var n = ff(!1), r = n[0];
    return n = Rp.bind(null, n[1]), ft().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var f = lt, v = ft();
    if (Cn) {
      if (l === void 0) throw Error(c(407));
      l = l();
    } else {
      if (l = r(), jn === null) throw Error(c(349));
      rt & 30 || bu(f, r, l);
    }
    v.memoizedState = l;
    var S = { value: l, getSnapshot: r };
    return v.queue = S, pf(uf.bind(
      null,
      f,
      S,
      n
    ), [n]), f.flags |= 2048, Tl(9, lf.bind(null, f, S, l, r), void 0, null), l;
  }, useId: function() {
    var n = ft(), r = jn.identifierPrefix;
    if (Cn) {
      var l = Qi, f = br;
      l = (f & ~(1 << 32 - za(f) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = Fs++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = j0++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, gn = {
    readContext: Ya,
    useCallback: xl,
    useContext: Ya,
    useEffect: Vs,
    useImperativeHandle: yf,
    useInsertionEffect: vf,
    useLayoutEffect: hf,
    useMemo: gf,
    useReducer: Zi,
    useRef: df,
    useState: function() {
      return Zi(Ra);
    },
    useDebugValue: Tu,
    useDeferredValue: function(n) {
      var r = Cr();
      return Sf(r, Rt.memoizedState, n);
    },
    useTransition: function() {
      var n = Zi(Ra)[0], r = Cr().memoizedState;
      return [n, r];
    },
    useMutableSource: Su,
    useSyncExternalStore: El,
    useId: bf,
    unstable_isNewReconciler: !1
  }, Cf = { readContext: Ya, useCallback: xl, useContext: Ya, useEffect: Vs, useImperativeHandle: yf, useInsertionEffect: vf, useLayoutEffect: hf, useMemo: gf, useReducer: Wa, useRef: df, useState: function() {
    return Wa(Ra);
  }, useDebugValue: Tu, useDeferredValue: function(n) {
    var r = Cr();
    return Rt === null ? r.memoizedState = n : Sf(r, Rt.memoizedState, n);
  }, useTransition: function() {
    var n = Wa(Ra)[0], r = Cr().memoizedState;
    return [n, r];
  }, useMutableSource: Su, useSyncExternalStore: El, useId: bf, unstable_isNewReconciler: !1 };
  function oa(n, r) {
    if (n && n.defaultProps) {
      r = W({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function wl(n, r, l, f) {
    r = n.memoizedState, l = l(f, r), l = l == null ? r : W({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Rl = { isMounted: function(n) {
    return (n = n._reactInternals) ? ct(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var f = mr(), v = to(n), S = ia(f, v);
    S.payload = r, l != null && (S.callback = l), r = Do(n, S, v), r !== null && (An(r, n, v, f), tf(r, n, v));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var f = mr(), v = to(n), S = ia(f, v);
    S.tag = 1, S.payload = r, l != null && (S.callback = l), r = Do(n, S, v), r !== null && (An(r, n, v, f), tf(r, n, v));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = mr(), f = to(n), v = ia(l, f);
    v.tag = 2, r != null && (v.callback = r), r = Do(n, v, f), r !== null && (An(r, n, f, l), tf(r, n, f));
  } };
  function mm(n, r, l, f, v, S, E) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(f, S, E) : r.prototype && r.prototype.isPureReactComponent ? !xs(l, f) || !xs(v, S) : !0;
  }
  function ym(n, r, l) {
    var f = !1, v = xi, S = r.contextType;
    return typeof S == "object" && S !== null ? S = Ya(S) : (v = _n(r) ? ea : wt.current, f = r.contextTypes, S = (f = f != null) ? $a(n, v) : xi), r = new r(l, S), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Rl, n.stateNode = r, r._reactInternals = n, f && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = v, n.__reactInternalMemoizedMaskedChildContext = S), r;
  }
  function gm(n, r, l, f) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, f), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, f), r.state !== n && Rl.enqueueReplaceState(r, r.state, null);
  }
  function kp(n, r, l, f) {
    var v = n.stateNode;
    v.props = l, v.state = n.memoizedState, v.refs = {}, ef(n);
    var S = r.contextType;
    typeof S == "object" && S !== null ? v.context = Ya(S) : (S = _n(r) ? ea : wt.current, v.context = $a(n, S)), v.state = n.memoizedState, S = r.getDerivedStateFromProps, typeof S == "function" && (wl(n, r, S, l), v.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function" || typeof v.UNSAFE_componentWillMount != "function" && typeof v.componentWillMount != "function" || (r = v.state, typeof v.componentWillMount == "function" && v.componentWillMount(), typeof v.UNSAFE_componentWillMount == "function" && v.UNSAFE_componentWillMount(), r !== v.state && Rl.enqueueReplaceState(v, v.state, null), nf(n, l, v, f), v.state = n.memoizedState), typeof v.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Ao(n, r) {
    try {
      var l = "", f = r;
      do
        l += yt(f), f = f.return;
      while (f);
      var v = l;
    } catch (S) {
      v = `
Error generating stack: ` + S.message + `
` + S.stack;
    }
    return { value: n, source: r, stack: v, digest: null };
  }
  function Op(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Hs(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Sm = typeof WeakMap == "function" ? WeakMap : Map;
  function bm(n, r, l) {
    l = ia(-1, l), l.tag = 3, l.payload = { element: null };
    var f = r.value;
    return l.callback = function() {
      Nf || (Nf = !0, Pp = f), Hs(n, r);
    }, l;
  }
  function Cm(n, r, l) {
    l = ia(-1, l), l.tag = 3;
    var f = n.type.getDerivedStateFromError;
    if (typeof f == "function") {
      var v = r.value;
      l.payload = function() {
        return f(v);
      }, l.callback = function() {
        Hs(n, r);
      };
    }
    var S = n.stateNode;
    return S !== null && typeof S.componentDidCatch == "function" && (l.callback = function() {
      Hs(n, r), typeof f != "function" && (Qa === null ? Qa = /* @__PURE__ */ new Set([this]) : Qa.add(this));
      var E = r.stack;
      this.componentDidCatch(r.value, { componentStack: E !== null ? E : "" });
    }), l;
  }
  function Is(n, r, l) {
    var f = n.pingCache;
    if (f === null) {
      f = n.pingCache = new Sm();
      var v = /* @__PURE__ */ new Set();
      f.set(r, v);
    } else v = f.get(r), v === void 0 && (v = /* @__PURE__ */ new Set(), f.set(r, v));
    v.has(l) || (v.add(l), n = q0.bind(null, n, r, l), r.then(n, n));
  }
  function Em(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Dp(n, r, l, f, v) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = v, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = ia(-1, 1), r.tag = 2, Do(l, r, 1))), l.lanes |= 1), n);
  }
  var Tm = J.ReactCurrentOwner, la = !1;
  function Vn(n, r, l, f) {
    r.child = n === null ? cm(r, null, l, f) : pu(r, n.child, l, f);
  }
  function wu(n, r, l, f, v) {
    l = l.render;
    var S = r.ref;
    return vu(r, v), f = me(n, r, l, f, S, v), l = qn(), n !== null && !la ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~v, Bn(n, r, v)) : (Cn && l && qc(r), r.flags |= 1, Vn(n, r, f, v), r.child);
  }
  function No(n, r, l, f, v) {
    if (n === null) {
      var S = l.type;
      return typeof S == "function" && !Hp(S) && S.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = S, Ef(n, r, S, f, v)) : (n = Ff(l.type, null, f, r, r.mode, v), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (S = n.child, !(n.lanes & v)) {
      var E = S.memoizedProps;
      if (l = l.compare, l = l !== null ? l : xs, l(E, f) && n.ref === r.ref) return Bn(n, r, v);
    }
    return r.flags |= 1, n = Uo(S, f), n.ref = r.ref, n.return = r, r.child = n;
  }
  function Ef(n, r, l, f, v) {
    if (n !== null) {
      var S = n.memoizedProps;
      if (xs(S, f) && n.ref === r.ref) if (la = !1, r.pendingProps = f = S, (n.lanes & v) !== 0) n.flags & 131072 && (la = !0);
      else return r.lanes = n.lanes, Bn(n, r, v);
    }
    return Dt(n, r, l, f, v);
  }
  function ua(n, r, l) {
    var f = r.pendingProps, v = f.children, S = n !== null ? n.memoizedState : null;
    if (f.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Xt(zu, sa), sa |= l;
    else {
      if (!(l & 1073741824)) return n = S !== null ? S.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Xt(zu, sa), sa |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, f = S !== null ? S.baseLanes : l, Xt(zu, sa), sa |= f;
    }
    else S !== null ? (f = S.baseLanes | l, r.memoizedState = null) : f = l, Xt(zu, sa), sa |= f;
    return Vn(n, r, v, l), r.child;
  }
  function _l(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Dt(n, r, l, f, v) {
    var S = _n(l) ? ea : wt.current;
    return S = $a(r, S), vu(r, v), l = me(n, r, l, f, S, v), f = qn(), n !== null && !la ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~v, Bn(n, r, v)) : (Cn && f && qc(r), r.flags |= 1, Vn(n, r, l, v), r.child);
  }
  function Ys(n, r, l, f, v) {
    if (_n(l)) {
      var S = !0;
      Gc(r);
    } else S = !1;
    if (vu(r, v), r.stateNode === null) Gs(n, r), ym(r, l, f), kp(r, l, f, v), f = !0;
    else if (n === null) {
      var E = r.stateNode, M = r.memoizedProps;
      E.props = M;
      var j = E.context, ee = l.contextType;
      typeof ee == "object" && ee !== null ? ee = Ya(ee) : (ee = _n(l) ? ea : wt.current, ee = $a(r, ee));
      var Se = l.getDerivedStateFromProps, Ce = typeof Se == "function" || typeof E.getSnapshotBeforeUpdate == "function";
      Ce || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (M !== f || j !== ee) && gm(r, E, f, ee), Oo = !1;
      var ye = r.memoizedState;
      E.state = ye, nf(r, f, E, v), j = r.memoizedState, M !== f || ye !== j || zn.current || Oo ? (typeof Se == "function" && (wl(r, l, Se, f), j = r.memoizedState), (M = Oo || mm(r, l, M, f, ye, j, ee)) ? (Ce || typeof E.UNSAFE_componentWillMount != "function" && typeof E.componentWillMount != "function" || (typeof E.componentWillMount == "function" && E.componentWillMount(), typeof E.UNSAFE_componentWillMount == "function" && E.UNSAFE_componentWillMount()), typeof E.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = f, r.memoizedState = j), E.props = f, E.state = j, E.context = ee, f = M) : (typeof E.componentDidMount == "function" && (r.flags |= 4194308), f = !1);
    } else {
      E = r.stateNode, hu(n, r), M = r.memoizedProps, ee = r.type === r.elementType ? M : oa(r.type, M), E.props = ee, Ce = r.pendingProps, ye = E.context, j = l.contextType, typeof j == "object" && j !== null ? j = Ya(j) : (j = _n(l) ? ea : wt.current, j = $a(r, j));
      var He = l.getDerivedStateFromProps;
      (Se = typeof He == "function" || typeof E.getSnapshotBeforeUpdate == "function") || typeof E.UNSAFE_componentWillReceiveProps != "function" && typeof E.componentWillReceiveProps != "function" || (M !== Ce || ye !== j) && gm(r, E, f, j), Oo = !1, ye = r.memoizedState, E.state = ye, nf(r, f, E, v);
      var qe = r.memoizedState;
      M !== Ce || ye !== qe || zn.current || Oo ? (typeof He == "function" && (wl(r, l, He, f), qe = r.memoizedState), (ee = Oo || mm(r, l, ee, f, ye, qe, j) || !1) ? (Se || typeof E.UNSAFE_componentWillUpdate != "function" && typeof E.componentWillUpdate != "function" || (typeof E.componentWillUpdate == "function" && E.componentWillUpdate(f, qe, j), typeof E.UNSAFE_componentWillUpdate == "function" && E.UNSAFE_componentWillUpdate(f, qe, j)), typeof E.componentDidUpdate == "function" && (r.flags |= 4), typeof E.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof E.componentDidUpdate != "function" || M === n.memoizedProps && ye === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && ye === n.memoizedState || (r.flags |= 1024), r.memoizedProps = f, r.memoizedState = qe), E.props = f, E.state = qe, E.context = j, f = ee) : (typeof E.componentDidUpdate != "function" || M === n.memoizedProps && ye === n.memoizedState || (r.flags |= 4), typeof E.getSnapshotBeforeUpdate != "function" || M === n.memoizedProps && ye === n.memoizedState || (r.flags |= 1024), f = !1);
    }
    return Tf(n, r, l, f, S, v);
  }
  function Tf(n, r, l, f, v, S) {
    _l(n, r);
    var E = (r.flags & 128) !== 0;
    if (!f && !E) return v && im(r, l, !1), Bn(n, r, S);
    f = r.stateNode, Tm.current = r;
    var M = E && typeof l.getDerivedStateFromError != "function" ? null : f.render();
    return r.flags |= 1, n !== null && E ? (r.child = pu(r, n.child, null, S), r.child = pu(r, null, M, S)) : Vn(n, r, M, S), r.memoizedState = f.state, v && im(r, l, !0), r.child;
  }
  function F0(n) {
    var r = n.stateNode;
    r.pendingContext ? _o(n, r.pendingContext, r.pendingContext !== r.context) : r.context && _o(n, r.context, !1), Tp(n, r.containerInfo);
  }
  function xm(n, r, l, f, v) {
    return Mn(), bp(v), r.flags |= 256, Vn(n, r, l, f), r.child;
  }
  var Ws = { dehydrated: null, treeContext: null, retryLane: 0 };
  function kl(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function wm(n, r, l) {
    var f = r.pendingProps, v = kn.current, S = !1, E = (r.flags & 128) !== 0, M;
    if ((M = E) || (M = n !== null && n.memoizedState === null ? !1 : (v & 2) !== 0), M ? (S = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (v |= 1), Xt(kn, v & 1), n === null)
      return Kc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (E = f.children, n = f.fallback, S ? (f = r.mode, S = r.child, E = { mode: "hidden", children: E }, !(f & 1) && S !== null ? (S.childLanes = 0, S.pendingProps = E) : S = $f(E, f, 0, null), n = Ll(n, f, l, null), S.return = r, n.return = r, S.sibling = n, r.child = S, r.child.memoizedState = kl(l), r.memoizedState = Ws, n) : xf(r, E));
    if (v = n.memoizedState, v !== null && (M = v.dehydrated, M !== null)) return Mp(n, r, E, f, M, v, l);
    if (S) {
      S = f.fallback, E = r.mode, v = n.child, M = v.sibling;
      var j = { mode: "hidden", children: f.children };
      return !(E & 1) && r.child !== v ? (f = r.child, f.childLanes = 0, f.pendingProps = j, r.deletions = null) : (f = Uo(v, j), f.subtreeFlags = v.subtreeFlags & 14680064), M !== null ? S = Uo(M, S) : (S = Ll(S, E, l, null), S.flags |= 2), S.return = r, f.return = r, f.sibling = S, r.child = f, f = S, S = r.child, E = n.child.memoizedState, E = E === null ? kl(l) : { baseLanes: E.baseLanes | l, cachePool: null, transitions: E.transitions }, S.memoizedState = E, S.childLanes = n.childLanes & ~l, r.memoizedState = Ws, f;
    }
    return S = n.child, n = S.sibling, f = Uo(S, { mode: "visible", children: f.children }), !(r.mode & 1) && (f.lanes = l), f.return = r, f.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = f, r.memoizedState = null, f;
  }
  function xf(n, r) {
    return r = $f({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function wf(n, r, l, f) {
    return f !== null && bp(f), pu(r, n.child, null, l), n = xf(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Mp(n, r, l, f, v, S, E) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, f = Op(Error(c(422))), wf(n, r, E, f)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (S = f.fallback, v = r.mode, f = $f({ mode: "visible", children: f.children }, v, 0, null), S = Ll(S, v, E, null), S.flags |= 2, f.return = r, S.return = r, f.sibling = S, r.child = f, r.mode & 1 && pu(r, n.child, null, E), r.child.memoizedState = kl(E), r.memoizedState = Ws, S);
    if (!(r.mode & 1)) return wf(n, r, E, null);
    if (v.data === "$!") {
      if (f = v.nextSibling && v.nextSibling.dataset, f) var M = f.dgst;
      return f = M, S = Error(c(419)), f = Op(S, f, void 0), wf(n, r, E, f);
    }
    if (M = (E & n.childLanes) !== 0, la || M) {
      if (f = jn, f !== null) {
        switch (E & -E) {
          case 4:
            v = 2;
            break;
          case 16:
            v = 8;
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
            v = 32;
            break;
          case 536870912:
            v = 268435456;
            break;
          default:
            v = 0;
        }
        v = v & (f.suspendedLanes | E) ? 0 : v, v !== 0 && v !== S.retryLane && (S.retryLane = v, Xi(n, v), An(f, n, v, -1));
      }
      return Zs(), f = Op(Error(c(421))), wf(n, r, E, f);
    }
    return v.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Bp.bind(null, n), v._reactRetry = r, null) : (n = S.treeContext, aa = pi(v.nextSibling), Ta = r, Cn = !0, Ha = null, n !== null && (ra[Lr++] = br, ra[Lr++] = Qi, ra[Lr++] = Ba, br = n.id, Qi = n.overflow, Ba = r), r = xf(r, f.children), r.flags |= 4096, r);
  }
  function Rm(n, r, l) {
    n.lanes |= r;
    var f = n.alternate;
    f !== null && (f.lanes |= r), Ep(n.return, r, l);
  }
  function Rf(n, r, l, f, v) {
    var S = n.memoizedState;
    S === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: f, tail: l, tailMode: v } : (S.isBackwards = r, S.rendering = null, S.renderingStartTime = 0, S.last = f, S.tail = l, S.tailMode = v);
  }
  function Ap(n, r, l) {
    var f = r.pendingProps, v = f.revealOrder, S = f.tail;
    if (Vn(n, r, f.children, l), f = kn.current, f & 2) f = f & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Rm(n, l, r);
        else if (n.tag === 19) Rm(n, l, r);
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
    if (Xt(kn, f), !(r.mode & 1)) r.memoizedState = null;
    else switch (v) {
      case "forwards":
        for (l = r.child, v = null; l !== null; ) n = l.alternate, n !== null && rf(n) === null && (v = l), l = l.sibling;
        l = v, l === null ? (v = r.child, r.child = null) : (v = l.sibling, l.sibling = null), Rf(r, !1, v, l, S);
        break;
      case "backwards":
        for (l = null, v = r.child, r.child = null; v !== null; ) {
          if (n = v.alternate, n !== null && rf(n) === null) {
            r.child = v;
            break;
          }
          n = v.sibling, v.sibling = l, l = v, v = n;
        }
        Rf(r, !0, l, null, S);
        break;
      case "together":
        Rf(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Gs(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Bn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Dl |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(c(153));
    if (r.child !== null) {
      for (n = r.child, l = Uo(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Uo(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Ji(n, r, l) {
    switch (r.tag) {
      case 3:
        F0(r), Mn();
        break;
      case 5:
        vm(r);
        break;
      case 1:
        _n(r.type) && Gc(r);
        break;
      case 4:
        Tp(r, r.stateNode.containerInfo);
        break;
      case 10:
        var f = r.type._context, v = r.memoizedProps.value;
        Xt(Ki, f._currentValue), f._currentValue = v;
        break;
      case 13:
        if (f = r.memoizedState, f !== null)
          return f.dehydrated !== null ? (Xt(kn, kn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? wm(n, r, l) : (Xt(kn, kn.current & 1), n = Bn(n, r, l), n !== null ? n.sibling : null);
        Xt(kn, kn.current & 1);
        break;
      case 19:
        if (f = (l & r.childLanes) !== 0, n.flags & 128) {
          if (f) return Ap(n, r, l);
          r.flags |= 128;
        }
        if (v = r.memoizedState, v !== null && (v.rendering = null, v.tail = null, v.lastEffect = null), Xt(kn, kn.current), f) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, ua(n, r, l);
    }
    return Bn(n, r, l);
  }
  var Ri, Ru, _u, Ga;
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
  }, Ru = function() {
  }, _u = function(n, r, l, f) {
    var v = n.memoizedProps;
    if (v !== f) {
      n = r.stateNode, Cl(vi.current);
      var S = null;
      switch (l) {
        case "input":
          v = Le(n, v), f = Le(n, f), S = [];
          break;
        case "select":
          v = W({}, v, { value: void 0 }), f = W({}, f, { value: void 0 }), S = [];
          break;
        case "textarea":
          v = Te(n, v), f = Te(n, f), S = [];
          break;
        default:
          typeof v.onClick != "function" && typeof f.onClick == "function" && (n.onclick = Wc);
      }
      sr(l, f);
      var E;
      l = null;
      for (ee in v) if (!f.hasOwnProperty(ee) && v.hasOwnProperty(ee) && v[ee] != null) if (ee === "style") {
        var M = v[ee];
        for (E in M) M.hasOwnProperty(E) && (l || (l = {}), l[E] = "");
      } else ee !== "dangerouslySetInnerHTML" && ee !== "children" && ee !== "suppressContentEditableWarning" && ee !== "suppressHydrationWarning" && ee !== "autoFocus" && (y.hasOwnProperty(ee) ? S || (S = []) : (S = S || []).push(ee, null));
      for (ee in f) {
        var j = f[ee];
        if (M = v != null ? v[ee] : void 0, f.hasOwnProperty(ee) && j !== M && (j != null || M != null)) if (ee === "style") if (M) {
          for (E in M) !M.hasOwnProperty(E) || j && j.hasOwnProperty(E) || (l || (l = {}), l[E] = "");
          for (E in j) j.hasOwnProperty(E) && M[E] !== j[E] && (l || (l = {}), l[E] = j[E]);
        } else l || (S || (S = []), S.push(
          ee,
          l
        )), l = j;
        else ee === "dangerouslySetInnerHTML" ? (j = j ? j.__html : void 0, M = M ? M.__html : void 0, j != null && M !== j && (S = S || []).push(ee, j)) : ee === "children" ? typeof j != "string" && typeof j != "number" || (S = S || []).push(ee, "" + j) : ee !== "suppressContentEditableWarning" && ee !== "suppressHydrationWarning" && (y.hasOwnProperty(ee) ? (j != null && ee === "onScroll" && pn("scroll", n), S || M === j || (S = [])) : (S = S || []).push(ee, j));
      }
      l && (S = S || []).push("style", l);
      var ee = S;
      (r.updateQueue = ee) && (r.flags |= 4);
    }
  }, Ga = function(n, r, l, f) {
    l !== f && (r.flags |= 4);
  };
  function Un(n, r) {
    if (!Cn) switch (n.tailMode) {
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
  function jr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, f = 0;
    if (r) for (var v = n.child; v !== null; ) l |= v.lanes | v.childLanes, f |= v.subtreeFlags & 14680064, f |= v.flags & 14680064, v.return = n, v = v.sibling;
    else for (v = n.child; v !== null; ) l |= v.lanes | v.childLanes, f |= v.subtreeFlags, f |= v.flags, v.return = n, v = v.sibling;
    return n.subtreeFlags |= f, n.childLanes = l, r;
  }
  function $0(n, r, l) {
    var f = r.pendingProps;
    switch (gp(r), r.tag) {
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
        return jr(r), null;
      case 1:
        return _n(r.type) && Va(), jr(r), null;
      case 3:
        return f = r.stateNode, yu(), Qt(zn), Qt(wt), wp(), f.pendingContext && (f.context = f.pendingContext, f.pendingContext = null), (n === null || n.child === null) && (Xc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ha !== null && (Fp(Ha), Ha = null))), Ru(n, r), jr(r), null;
      case 5:
        xp(r);
        var v = Cl(js.current);
        if (l = r.type, n !== null && r.stateNode != null) _u(n, r, l, f, v), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!f) {
            if (r.stateNode === null) throw Error(c(166));
            return jr(r), null;
          }
          if (n = Cl(vi.current), Xc(r)) {
            f = r.stateNode, l = r.type;
            var S = r.memoizedProps;
            switch (f[Ti] = r, f[yl] = S, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                pn("cancel", f), pn("close", f);
                break;
              case "iframe":
              case "object":
              case "embed":
                pn("load", f);
                break;
              case "video":
              case "audio":
                for (v = 0; v < ks.length; v++) pn(ks[v], f);
                break;
              case "source":
                pn("error", f);
                break;
              case "img":
              case "image":
              case "link":
                pn(
                  "error",
                  f
                ), pn("load", f);
                break;
              case "details":
                pn("toggle", f);
                break;
              case "input":
                Gt(f, S), pn("invalid", f);
                break;
              case "select":
                f._wrapperState = { wasMultiple: !!S.multiple }, pn("invalid", f);
                break;
              case "textarea":
                ne(f, S), pn("invalid", f);
            }
            sr(l, S), v = null;
            for (var E in S) if (S.hasOwnProperty(E)) {
              var M = S[E];
              E === "children" ? typeof M == "string" ? f.textContent !== M && (S.suppressHydrationWarning !== !0 && Yc(f.textContent, M, n), v = ["children", M]) : typeof M == "number" && f.textContent !== "" + M && (S.suppressHydrationWarning !== !0 && Yc(
                f.textContent,
                M,
                n
              ), v = ["children", "" + M]) : y.hasOwnProperty(E) && M != null && E === "onScroll" && pn("scroll", f);
            }
            switch (l) {
              case "input":
                Nt(f), N(f, S, !0);
                break;
              case "textarea":
                Nt(f), Et(f);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof S.onClick == "function" && (f.onclick = Wc);
            }
            f = v, r.updateQueue = f, f !== null && (r.flags |= 4);
          } else {
            E = v.nodeType === 9 ? v : v.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = vt(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = E.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof f.is == "string" ? n = E.createElement(l, { is: f.is }) : (n = E.createElement(l), l === "select" && (E = n, f.multiple ? E.multiple = !0 : f.size && (E.size = f.size))) : n = E.createElementNS(n, l), n[Ti] = r, n[yl] = f, Ri(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (E = $n(l, f), l) {
                case "dialog":
                  pn("cancel", n), pn("close", n), v = f;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  pn("load", n), v = f;
                  break;
                case "video":
                case "audio":
                  for (v = 0; v < ks.length; v++) pn(ks[v], n);
                  v = f;
                  break;
                case "source":
                  pn("error", n), v = f;
                  break;
                case "img":
                case "image":
                case "link":
                  pn(
                    "error",
                    n
                  ), pn("load", n), v = f;
                  break;
                case "details":
                  pn("toggle", n), v = f;
                  break;
                case "input":
                  Gt(n, f), v = Le(n, f), pn("invalid", n);
                  break;
                case "option":
                  v = f;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!f.multiple }, v = W({}, f, { value: void 0 }), pn("invalid", n);
                  break;
                case "textarea":
                  ne(n, f), v = Te(n, f), pn("invalid", n);
                  break;
                default:
                  v = f;
              }
              sr(l, v), M = v;
              for (S in M) if (M.hasOwnProperty(S)) {
                var j = M[S];
                S === "style" ? qt(n, j) : S === "dangerouslySetInnerHTML" ? (j = j ? j.__html : void 0, j != null && ma(n, j)) : S === "children" ? typeof j == "string" ? (l !== "textarea" || j !== "") && Zn(n, j) : typeof j == "number" && Zn(n, "" + j) : S !== "suppressContentEditableWarning" && S !== "suppressHydrationWarning" && S !== "autoFocus" && (y.hasOwnProperty(S) ? j != null && S === "onScroll" && pn("scroll", n) : j != null && I(n, S, j, E));
              }
              switch (l) {
                case "input":
                  Nt(n), N(n, f, !1);
                  break;
                case "textarea":
                  Nt(n), Et(n);
                  break;
                case "option":
                  f.value != null && n.setAttribute("value", "" + nt(f.value));
                  break;
                case "select":
                  n.multiple = !!f.multiple, S = f.value, S != null ? Oe(n, !!f.multiple, S, !1) : f.defaultValue != null && Oe(
                    n,
                    !!f.multiple,
                    f.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof v.onClick == "function" && (n.onclick = Wc);
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
        return jr(r), null;
      case 6:
        if (n && r.stateNode != null) Ga(n, r, n.memoizedProps, f);
        else {
          if (typeof f != "string" && r.stateNode === null) throw Error(c(166));
          if (l = Cl(js.current), Cl(vi.current), Xc(r)) {
            if (f = r.stateNode, l = r.memoizedProps, f[Ti] = r, (S = f.nodeValue !== l) && (n = Ta, n !== null)) switch (n.tag) {
              case 3:
                Yc(f.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Yc(f.nodeValue, l, (n.mode & 1) !== 0);
            }
            S && (r.flags |= 4);
          } else f = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(f), f[Ti] = r, r.stateNode = f;
        }
        return jr(r), null;
      case 13:
        if (Qt(kn), f = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Cn && aa !== null && r.mode & 1 && !(r.flags & 128)) um(), Mn(), r.flags |= 98560, S = !1;
          else if (S = Xc(r), f !== null && f.dehydrated !== null) {
            if (n === null) {
              if (!S) throw Error(c(318));
              if (S = r.memoizedState, S = S !== null ? S.dehydrated : null, !S) throw Error(c(317));
              S[Ti] = r;
            } else Mn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            jr(r), S = !1;
          } else Ha !== null && (Fp(Ha), Ha = null), S = !0;
          if (!S) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (f = f !== null, f !== (n !== null && n.memoizedState !== null) && f && (r.child.flags |= 8192, r.mode & 1 && (n === null || kn.current & 1 ? nr === 0 && (nr = 3) : Zs())), r.updateQueue !== null && (r.flags |= 4), jr(r), null);
      case 4:
        return yu(), Ru(n, r), n === null && cu(r.stateNode.containerInfo), jr(r), null;
      case 10:
        return Cp(r.type._context), jr(r), null;
      case 17:
        return _n(r.type) && Va(), jr(r), null;
      case 19:
        if (Qt(kn), S = r.memoizedState, S === null) return jr(r), null;
        if (f = (r.flags & 128) !== 0, E = S.rendering, E === null) if (f) Un(S, !1);
        else {
          if (nr !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (E = rf(n), E !== null) {
              for (r.flags |= 128, Un(S, !1), f = E.updateQueue, f !== null && (r.updateQueue = f, r.flags |= 4), r.subtreeFlags = 0, f = l, l = r.child; l !== null; ) S = l, n = f, S.flags &= 14680066, E = S.alternate, E === null ? (S.childLanes = 0, S.lanes = n, S.child = null, S.subtreeFlags = 0, S.memoizedProps = null, S.memoizedState = null, S.updateQueue = null, S.dependencies = null, S.stateNode = null) : (S.childLanes = E.childLanes, S.lanes = E.lanes, S.child = E.child, S.subtreeFlags = 0, S.deletions = null, S.memoizedProps = E.memoizedProps, S.memoizedState = E.memoizedState, S.updateQueue = E.updateQueue, S.type = E.type, n = E.dependencies, S.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Xt(kn, kn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          S.tail !== null && Kt() > ju && (r.flags |= 128, f = !0, Un(S, !1), r.lanes = 4194304);
        }
        else {
          if (!f) if (n = rf(E), n !== null) {
            if (r.flags |= 128, f = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), Un(S, !0), S.tail === null && S.tailMode === "hidden" && !E.alternate && !Cn) return jr(r), null;
          } else 2 * Kt() - S.renderingStartTime > ju && l !== 1073741824 && (r.flags |= 128, f = !0, Un(S, !1), r.lanes = 4194304);
          S.isBackwards ? (E.sibling = r.child, r.child = E) : (l = S.last, l !== null ? l.sibling = E : r.child = E, S.last = E);
        }
        return S.tail !== null ? (r = S.tail, S.rendering = r, S.tail = r.sibling, S.renderingStartTime = Kt(), r.sibling = null, l = kn.current, Xt(kn, f ? l & 1 | 2 : l & 1), r) : (jr(r), null);
      case 22:
      case 23:
        return jf(), f = r.memoizedState !== null, n !== null && n.memoizedState !== null !== f && (r.flags |= 8192), f && r.mode & 1 ? sa & 1073741824 && (jr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : jr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(c(156, r.tag));
  }
  function V0(n, r) {
    switch (gp(r), r.tag) {
      case 1:
        return _n(r.type) && Va(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return yu(), Qt(zn), Qt(wt), wp(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return xp(r), null;
      case 13:
        if (Qt(kn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(c(340));
          Mn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Qt(kn), null;
      case 4:
        return yu(), null;
      case 10:
        return Cp(r.type._context), null;
      case 22:
      case 23:
        return jf(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var ku = !1, Er = !1, _f = typeof WeakSet == "function" ? WeakSet : Set, Ge = null;
  function Ou(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (f) {
      Pn(n, r, f);
    }
    else l.current = null;
  }
  function Np(n, r, l) {
    try {
      l();
    } catch (f) {
      Pn(n, r, f);
    }
  }
  var kf = !1;
  function B0(n, r) {
    if (cp = cl, n = $c(), Yi(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var f = l.getSelection && l.getSelection();
        if (f && f.rangeCount !== 0) {
          l = f.anchorNode;
          var v = f.anchorOffset, S = f.focusNode;
          f = f.focusOffset;
          try {
            l.nodeType, S.nodeType;
          } catch {
            l = null;
            break e;
          }
          var E = 0, M = -1, j = -1, ee = 0, Se = 0, Ce = n, ye = null;
          t: for (; ; ) {
            for (var He; Ce !== l || v !== 0 && Ce.nodeType !== 3 || (M = E + v), Ce !== S || f !== 0 && Ce.nodeType !== 3 || (j = E + f), Ce.nodeType === 3 && (E += Ce.nodeValue.length), (He = Ce.firstChild) !== null; )
              ye = Ce, Ce = He;
            for (; ; ) {
              if (Ce === n) break t;
              if (ye === l && ++ee === v && (M = E), ye === S && ++Se === f && (j = E), (He = Ce.nextSibling) !== null) break;
              Ce = ye, ye = Ce.parentNode;
            }
            Ce = He;
          }
          l = M === -1 || j === -1 ? null : { start: M, end: j };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (hl = { focusedElem: n, selectionRange: l }, cl = !1, Ge = r; Ge !== null; ) if (r = Ge, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, Ge = n;
    else for (; Ge !== null; ) {
      r = Ge;
      try {
        var qe = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (qe !== null) {
              var Je = qe.memoizedProps, Hn = qe.memoizedState, q = r.stateNode, $ = q.getSnapshotBeforeUpdate(r.elementType === r.type ? Je : oa(r.type, Je), Hn);
              q.__reactInternalSnapshotBeforeUpdate = $;
            }
            break;
          case 3:
            var X = r.stateNode.containerInfo;
            X.nodeType === 1 ? X.textContent = "" : X.nodeType === 9 && X.documentElement && X.removeChild(X.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(c(163));
        }
      } catch (we) {
        Pn(r, r.return, we);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, Ge = n;
        break;
      }
      Ge = r.return;
    }
    return qe = kf, kf = !1, qe;
  }
  function Du(n, r, l) {
    var f = r.updateQueue;
    if (f = f !== null ? f.lastEffect : null, f !== null) {
      var v = f = f.next;
      do {
        if ((v.tag & n) === n) {
          var S = v.destroy;
          v.destroy = void 0, S !== void 0 && Np(r, l, S);
        }
        v = v.next;
      } while (v !== f);
    }
  }
  function Of(n, r) {
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
  function Df(n) {
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
  function _m(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, _m(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ti], delete r[yl], delete r[pp], delete r[U0], delete r[vp])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Lp(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function km(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Lp(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function qs(n, r, l) {
    var f = n.tag;
    if (f === 5 || f === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Wc));
    else if (f !== 4 && (n = n.child, n !== null)) for (qs(n, r, l), n = n.sibling; n !== null; ) qs(n, r, l), n = n.sibling;
  }
  function Mu(n, r, l) {
    var f = n.tag;
    if (f === 5 || f === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (f !== 4 && (n = n.child, n !== null)) for (Mu(n, r, l), n = n.sibling; n !== null; ) Mu(n, r, l), n = n.sibling;
  }
  var On = null, vr = !1;
  function Fr(n, r, l) {
    for (l = l.child; l !== null; ) Au(n, r, l), l = l.sibling;
  }
  function Au(n, r, l) {
    if (ui && typeof ui.onCommitFiberUnmount == "function") try {
      ui.onCommitFiberUnmount(ds, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Er || Ou(l, r);
      case 6:
        var f = On, v = vr;
        On = null, Fr(n, r, l), On = f, vr = v, On !== null && (vr ? (n = On, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : On.removeChild(l.stateNode));
        break;
      case 18:
        On !== null && (vr ? (n = On, l = l.stateNode, n.nodeType === 8 ? xo(n.parentNode, l) : n.nodeType === 1 && xo(n, l), ys(n)) : xo(On, l.stateNode));
        break;
      case 4:
        f = On, v = vr, On = l.stateNode.containerInfo, vr = !0, Fr(n, r, l), On = f, vr = v;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Er && (f = l.updateQueue, f !== null && (f = f.lastEffect, f !== null))) {
          v = f = f.next;
          do {
            var S = v, E = S.destroy;
            S = S.tag, E !== void 0 && (S & 2 || S & 4) && Np(l, r, E), v = v.next;
          } while (v !== f);
        }
        Fr(n, r, l);
        break;
      case 1:
        if (!Er && (Ou(l, r), f = l.stateNode, typeof f.componentWillUnmount == "function")) try {
          f.props = l.memoizedProps, f.state = l.memoizedState, f.componentWillUnmount();
        } catch (M) {
          Pn(l, r, M);
        }
        Fr(n, r, l);
        break;
      case 21:
        Fr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Er = (f = Er) || l.memoizedState !== null, Fr(n, r, l), Er = f) : Fr(n, r, l);
        break;
      default:
        Fr(n, r, l);
    }
  }
  function Nu(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new _f()), r.forEach(function(f) {
        var v = Q0.bind(null, n, f);
        l.has(f) || (l.add(f), f.then(v, v));
      });
    }
  }
  function hr(n, r) {
    var l = r.deletions;
    if (l !== null) for (var f = 0; f < l.length; f++) {
      var v = l[f];
      try {
        var S = n, E = r, M = E;
        e: for (; M !== null; ) {
          switch (M.tag) {
            case 5:
              On = M.stateNode, vr = !1;
              break e;
            case 3:
              On = M.stateNode.containerInfo, vr = !0;
              break e;
            case 4:
              On = M.stateNode.containerInfo, vr = !0;
              break e;
          }
          M = M.return;
        }
        if (On === null) throw Error(c(160));
        Au(S, E, v), On = null, vr = !1;
        var j = v.alternate;
        j !== null && (j.return = null), v.return = null;
      } catch (ee) {
        Pn(v, r, ee);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Om(r, n), r = r.sibling;
  }
  function Om(n, r) {
    var l = n.alternate, f = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (hr(r, n), _i(n), f & 4) {
          try {
            Du(3, n, n.return), Of(3, n);
          } catch (Je) {
            Pn(n, n.return, Je);
          }
          try {
            Du(5, n, n.return);
          } catch (Je) {
            Pn(n, n.return, Je);
          }
        }
        break;
      case 1:
        hr(r, n), _i(n), f & 512 && l !== null && Ou(l, l.return);
        break;
      case 5:
        if (hr(r, n), _i(n), f & 512 && l !== null && Ou(l, l.return), n.flags & 32) {
          var v = n.stateNode;
          try {
            Zn(v, "");
          } catch (Je) {
            Pn(n, n.return, Je);
          }
        }
        if (f & 4 && (v = n.stateNode, v != null)) {
          var S = n.memoizedProps, E = l !== null ? l.memoizedProps : S, M = n.type, j = n.updateQueue;
          if (n.updateQueue = null, j !== null) try {
            M === "input" && S.type === "radio" && S.name != null && jt(v, S), $n(M, E);
            var ee = $n(M, S);
            for (E = 0; E < j.length; E += 2) {
              var Se = j[E], Ce = j[E + 1];
              Se === "style" ? qt(v, Ce) : Se === "dangerouslySetInnerHTML" ? ma(v, Ce) : Se === "children" ? Zn(v, Ce) : I(v, Se, Ce, ee);
            }
            switch (M) {
              case "input":
                rn(v, S);
                break;
              case "textarea":
                $e(v, S);
                break;
              case "select":
                var ye = v._wrapperState.wasMultiple;
                v._wrapperState.wasMultiple = !!S.multiple;
                var He = S.value;
                He != null ? Oe(v, !!S.multiple, He, !1) : ye !== !!S.multiple && (S.defaultValue != null ? Oe(
                  v,
                  !!S.multiple,
                  S.defaultValue,
                  !0
                ) : Oe(v, !!S.multiple, S.multiple ? [] : "", !1));
            }
            v[yl] = S;
          } catch (Je) {
            Pn(n, n.return, Je);
          }
        }
        break;
      case 6:
        if (hr(r, n), _i(n), f & 4) {
          if (n.stateNode === null) throw Error(c(162));
          v = n.stateNode, S = n.memoizedProps;
          try {
            v.nodeValue = S;
          } catch (Je) {
            Pn(n, n.return, Je);
          }
        }
        break;
      case 3:
        if (hr(r, n), _i(n), f & 4 && l !== null && l.memoizedState.isDehydrated) try {
          ys(r.containerInfo);
        } catch (Je) {
          Pn(n, n.return, Je);
        }
        break;
      case 4:
        hr(r, n), _i(n);
        break;
      case 13:
        hr(r, n), _i(n), v = n.child, v.flags & 8192 && (S = v.memoizedState !== null, v.stateNode.isHidden = S, !S || v.alternate !== null && v.alternate.memoizedState !== null || (Af = Kt())), f & 4 && Nu(n);
        break;
      case 22:
        if (Se = l !== null && l.memoizedState !== null, n.mode & 1 ? (Er = (ee = Er) || Se, hr(r, n), Er = ee) : hr(r, n), _i(n), f & 8192) {
          if (ee = n.memoizedState !== null, (n.stateNode.isHidden = ee) && !Se && n.mode & 1) for (Ge = n, Se = n.child; Se !== null; ) {
            for (Ce = Ge = Se; Ge !== null; ) {
              switch (ye = Ge, He = ye.child, ye.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Du(4, ye, ye.return);
                  break;
                case 1:
                  Ou(ye, ye.return);
                  var qe = ye.stateNode;
                  if (typeof qe.componentWillUnmount == "function") {
                    f = ye, l = ye.return;
                    try {
                      r = f, qe.props = r.memoizedProps, qe.state = r.memoizedState, qe.componentWillUnmount();
                    } catch (Je) {
                      Pn(f, l, Je);
                    }
                  }
                  break;
                case 5:
                  Ou(ye, ye.return);
                  break;
                case 22:
                  if (ye.memoizedState !== null) {
                    Dm(Ce);
                    continue;
                  }
              }
              He !== null ? (He.return = ye, Ge = He) : Dm(Ce);
            }
            Se = Se.sibling;
          }
          e: for (Se = null, Ce = n; ; ) {
            if (Ce.tag === 5) {
              if (Se === null) {
                Se = Ce;
                try {
                  v = Ce.stateNode, ee ? (S = v.style, typeof S.setProperty == "function" ? S.setProperty("display", "none", "important") : S.display = "none") : (M = Ce.stateNode, j = Ce.memoizedProps.style, E = j != null && j.hasOwnProperty("display") ? j.display : null, M.style.display = At("display", E));
                } catch (Je) {
                  Pn(n, n.return, Je);
                }
              }
            } else if (Ce.tag === 6) {
              if (Se === null) try {
                Ce.stateNode.nodeValue = ee ? "" : Ce.memoizedProps;
              } catch (Je) {
                Pn(n, n.return, Je);
              }
            } else if ((Ce.tag !== 22 && Ce.tag !== 23 || Ce.memoizedState === null || Ce === n) && Ce.child !== null) {
              Ce.child.return = Ce, Ce = Ce.child;
              continue;
            }
            if (Ce === n) break e;
            for (; Ce.sibling === null; ) {
              if (Ce.return === null || Ce.return === n) break e;
              Se === Ce && (Se = null), Ce = Ce.return;
            }
            Se === Ce && (Se = null), Ce.sibling.return = Ce.return, Ce = Ce.sibling;
          }
        }
        break;
      case 19:
        hr(r, n), _i(n), f & 4 && Nu(n);
        break;
      case 21:
        break;
      default:
        hr(
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
            if (Lp(l)) {
              var f = l;
              break e;
            }
            l = l.return;
          }
          throw Error(c(160));
        }
        switch (f.tag) {
          case 5:
            var v = f.stateNode;
            f.flags & 32 && (Zn(v, ""), f.flags &= -33);
            var S = km(n);
            Mu(n, S, v);
            break;
          case 3:
          case 4:
            var E = f.stateNode.containerInfo, M = km(n);
            qs(n, M, E);
            break;
          default:
            throw Error(c(161));
        }
      } catch (j) {
        Pn(n, n.return, j);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function H0(n, r, l) {
    Ge = n, zp(n);
  }
  function zp(n, r, l) {
    for (var f = (n.mode & 1) !== 0; Ge !== null; ) {
      var v = Ge, S = v.child;
      if (v.tag === 22 && f) {
        var E = v.memoizedState !== null || ku;
        if (!E) {
          var M = v.alternate, j = M !== null && M.memoizedState !== null || Er;
          M = ku;
          var ee = Er;
          if (ku = E, (Er = j) && !ee) for (Ge = v; Ge !== null; ) E = Ge, j = E.child, E.tag === 22 && E.memoizedState !== null ? Up(v) : j !== null ? (j.return = E, Ge = j) : Up(v);
          for (; S !== null; ) Ge = S, zp(S), S = S.sibling;
          Ge = v, ku = M, Er = ee;
        }
        Lu(n);
      } else v.subtreeFlags & 8772 && S !== null ? (S.return = v, Ge = S) : Lu(n);
    }
  }
  function Lu(n) {
    for (; Ge !== null; ) {
      var r = Ge;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Er || Of(5, r);
              break;
            case 1:
              var f = r.stateNode;
              if (r.flags & 4 && !Er) if (l === null) f.componentDidMount();
              else {
                var v = r.elementType === r.type ? l.memoizedProps : oa(r.type, l.memoizedProps);
                f.componentDidUpdate(v, l.memoizedState, f.__reactInternalSnapshotBeforeUpdate);
              }
              var S = r.updateQueue;
              S !== null && pm(r, S, f);
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
                pm(r, E, l);
              }
              break;
            case 5:
              var M = r.stateNode;
              if (l === null && r.flags & 4) {
                l = M;
                var j = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    j.autoFocus && l.focus();
                    break;
                  case "img":
                    j.src && (l.src = j.src);
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
                var ee = r.alternate;
                if (ee !== null) {
                  var Se = ee.memoizedState;
                  if (Se !== null) {
                    var Ce = Se.dehydrated;
                    Ce !== null && ys(Ce);
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
          Er || r.flags & 512 && Df(r);
        } catch (ye) {
          Pn(r, r.return, ye);
        }
      }
      if (r === n) {
        Ge = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, Ge = l;
        break;
      }
      Ge = r.return;
    }
  }
  function Dm(n) {
    for (; Ge !== null; ) {
      var r = Ge;
      if (r === n) {
        Ge = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, Ge = l;
        break;
      }
      Ge = r.return;
    }
  }
  function Up(n) {
    for (; Ge !== null; ) {
      var r = Ge;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Of(4, r);
            } catch (j) {
              Pn(r, l, j);
            }
            break;
          case 1:
            var f = r.stateNode;
            if (typeof f.componentDidMount == "function") {
              var v = r.return;
              try {
                f.componentDidMount();
              } catch (j) {
                Pn(r, v, j);
              }
            }
            var S = r.return;
            try {
              Df(r);
            } catch (j) {
              Pn(r, S, j);
            }
            break;
          case 5:
            var E = r.return;
            try {
              Df(r);
            } catch (j) {
              Pn(r, E, j);
            }
        }
      } catch (j) {
        Pn(r, r.return, j);
      }
      if (r === n) {
        Ge = null;
        break;
      }
      var M = r.sibling;
      if (M !== null) {
        M.return = r.return, Ge = M;
        break;
      }
      Ge = r.return;
    }
  }
  var I0 = Math.ceil, Ol = J.ReactCurrentDispatcher, Mf = J.ReactCurrentOwner, qa = J.ReactCurrentBatchConfig, Pt = 0, jn = null, En = null, tr = 0, sa = 0, zu = Mt(0), nr = 0, Qs = null, Dl = 0, Uu = 0, jp = 0, Lo = null, Pr = null, Af = 0, ju = 1 / 0, eo = null, Nf = !1, Pp = null, Qa = null, Pu = !1, Ka = null, Lf = 0, Ks = 0, zf = null, Xs = -1, Ml = 0;
  function mr() {
    return Pt & 6 ? Kt() : Xs !== -1 ? Xs : Xs = Kt();
  }
  function to(n) {
    return n.mode & 1 ? Pt & 2 && tr !== 0 ? tr & -tr : Zc.transition !== null ? (Ml === 0 && (Ml = kc()), Ml) : (n = Jt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : Id(n.type)), n) : 1;
  }
  function An(n, r, l, f) {
    if (50 < Ks) throw Ks = 0, zf = null, Error(c(185));
    sl(n, l, f), (!(Pt & 2) || n !== jn) && (n === jn && (!(Pt & 2) && (Uu |= l), nr === 4 && ki(n, tr)), rr(n, f), l === 1 && Pt === 0 && !(r.mode & 1) && (ju = Kt() + 500, pr && ta()));
  }
  function rr(n, r) {
    var l = n.callbackNode;
    _c(n, r);
    var f = si(n, n === jn ? tr : 0);
    if (f === 0) l !== null && Dn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = f & -f, n.callbackPriority !== r) {
      if (l != null && Dn(l), r === 1) n.tag === 0 ? mp(Fu.bind(null, n)) : hp(Fu.bind(null, n)), dp(function() {
        !(Pt & 6) && ta();
      }), l = null;
      else {
        switch (Vd(f)) {
          case 1:
            l = Sa;
            break;
          case 4:
            l = zt;
            break;
          case 16:
            l = Ei;
            break;
          case 536870912:
            l = jd;
            break;
          default:
            l = Ei;
        }
        l = Pm(l, Uf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function Uf(n, r) {
    if (Xs = -1, Ml = 0, Pt & 6) throw Error(c(327));
    var l = n.callbackNode;
    if ($u() && n.callbackNode !== l) return null;
    var f = si(n, n === jn ? tr : 0);
    if (f === 0) return null;
    if (f & 30 || f & n.expiredLanes || r) r = Pf(n, f);
    else {
      r = f;
      var v = Pt;
      Pt |= 2;
      var S = Am();
      (jn !== n || tr !== r) && (eo = null, ju = Kt() + 500, Nl(n, r));
      do
        try {
          W0();
          break;
        } catch (M) {
          Mm(n, M);
        }
      while (!0);
      xa(), Ol.current = S, Pt = v, En !== null ? r = 0 : (jn = null, tr = 0, r = nr);
    }
    if (r !== 0) {
      if (r === 2 && (v = Fd(n), v !== 0 && (f = v, r = Al(n, v))), r === 1) throw l = Qs, Nl(n, 0), ki(n, f), rr(n, Kt()), l;
      if (r === 6) ki(n, f);
      else {
        if (v = n.current.alternate, !(f & 30) && !$p(v) && (r = Pf(n, f), r === 2 && (S = Fd(n), S !== 0 && (f = S, r = Al(n, S))), r === 1)) throw l = Qs, Nl(n, 0), ki(n, f), rr(n, Kt()), l;
        switch (n.finishedWork = v, n.finishedLanes = f, r) {
          case 0:
          case 1:
            throw Error(c(345));
          case 2:
            zo(n, Pr, eo);
            break;
          case 3:
            if (ki(n, f), (f & 130023424) === f && (r = Af + 500 - Kt(), 10 < r)) {
              if (si(n, 0) !== 0) break;
              if (v = n.suspendedLanes, (v & f) !== f) {
                mr(), n.pingedLanes |= n.suspendedLanes & v;
                break;
              }
              n.timeoutHandle = ml(zo.bind(null, n, Pr, eo), r);
              break;
            }
            zo(n, Pr, eo);
            break;
          case 4:
            if (ki(n, f), (f & 4194240) === f) break;
            for (r = n.eventTimes, v = -1; 0 < f; ) {
              var E = 31 - za(f);
              S = 1 << E, E = r[E], E > v && (v = E), f &= ~S;
            }
            if (f = v, f = Kt() - f, f = (120 > f ? 120 : 480 > f ? 480 : 1080 > f ? 1080 : 1920 > f ? 1920 : 3e3 > f ? 3e3 : 4320 > f ? 4320 : 1960 * I0(f / 1960)) - f, 10 < f) {
              n.timeoutHandle = ml(zo.bind(null, n, Pr, eo), f);
              break;
            }
            zo(n, Pr, eo);
            break;
          case 5:
            zo(n, Pr, eo);
            break;
          default:
            throw Error(c(329));
        }
      }
    }
    return rr(n, Kt()), n.callbackNode === l ? Uf.bind(null, n) : null;
  }
  function Al(n, r) {
    var l = Lo;
    return n.current.memoizedState.isDehydrated && (Nl(n, r).flags |= 256), n = Pf(n, r), n !== 2 && (r = Pr, Pr = l, r !== null && Fp(r)), n;
  }
  function Fp(n) {
    Pr === null ? Pr = n : Pr.push.apply(Pr, n);
  }
  function $p(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var f = 0; f < l.length; f++) {
          var v = l[f], S = v.getSnapshot;
          v = v.value;
          try {
            if (!Pa(S(), v)) return !1;
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
    for (r &= ~jp, r &= ~Uu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - za(r), f = 1 << l;
      n[l] = -1, r &= ~f;
    }
  }
  function Fu(n) {
    if (Pt & 6) throw Error(c(327));
    $u();
    var r = si(n, 0);
    if (!(r & 1)) return rr(n, Kt()), null;
    var l = Pf(n, r);
    if (n.tag !== 0 && l === 2) {
      var f = Fd(n);
      f !== 0 && (r = f, l = Al(n, f));
    }
    if (l === 1) throw l = Qs, Nl(n, 0), ki(n, r), rr(n, Kt()), l;
    if (l === 6) throw Error(c(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, zo(n, Pr, eo), rr(n, Kt()), null;
  }
  function Vp(n, r) {
    var l = Pt;
    Pt |= 1;
    try {
      return n(r);
    } finally {
      Pt = l, Pt === 0 && (ju = Kt() + 500, pr && ta());
    }
  }
  function Oi(n) {
    Ka !== null && Ka.tag === 0 && !(Pt & 6) && $u();
    var r = Pt;
    Pt |= 1;
    var l = qa.transition, f = Jt;
    try {
      if (qa.transition = null, Jt = 1, n) return n();
    } finally {
      Jt = f, qa.transition = l, Pt = r, !(Pt & 6) && ta();
    }
  }
  function jf() {
    sa = zu.current, Qt(zu);
  }
  function Nl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, am(l)), En !== null) for (l = En.return; l !== null; ) {
      var f = l;
      switch (gp(f), f.tag) {
        case 1:
          f = f.type.childContextTypes, f != null && Va();
          break;
        case 3:
          yu(), Qt(zn), Qt(wt), wp();
          break;
        case 5:
          xp(f);
          break;
        case 4:
          yu();
          break;
        case 13:
          Qt(kn);
          break;
        case 19:
          Qt(kn);
          break;
        case 10:
          Cp(f.type._context);
          break;
        case 22:
        case 23:
          jf();
      }
      l = l.return;
    }
    if (jn = n, En = n = Uo(n.current, null), tr = sa = r, nr = 0, Qs = null, jp = Uu = Dl = 0, Pr = Lo = null, bl !== null) {
      for (r = 0; r < bl.length; r++) if (l = bl[r], f = l.interleaved, f !== null) {
        l.interleaved = null;
        var v = f.next, S = l.pending;
        if (S !== null) {
          var E = S.next;
          S.next = v, f.next = E;
        }
        l.pending = f;
      }
      bl = null;
    }
    return n;
  }
  function Mm(n, r) {
    do {
      var l = En;
      try {
        if (xa(), of.current = Ur, wa) {
          for (var f = lt.memoizedState; f !== null; ) {
            var v = f.queue;
            v !== null && (v.pending = null), f = f.next;
          }
          wa = !1;
        }
        if (rt = 0, Ut = Rt = lt = null, gu = !1, Fs = 0, Mf.current = null, l === null || l.return === null) {
          nr = 1, Qs = r, En = null;
          break;
        }
        e: {
          var S = n, E = l.return, M = l, j = r;
          if (r = tr, M.flags |= 32768, j !== null && typeof j == "object" && typeof j.then == "function") {
            var ee = j, Se = M, Ce = Se.tag;
            if (!(Se.mode & 1) && (Ce === 0 || Ce === 11 || Ce === 15)) {
              var ye = Se.alternate;
              ye ? (Se.updateQueue = ye.updateQueue, Se.memoizedState = ye.memoizedState, Se.lanes = ye.lanes) : (Se.updateQueue = null, Se.memoizedState = null);
            }
            var He = Em(E);
            if (He !== null) {
              He.flags &= -257, Dp(He, E, M, S, r), He.mode & 1 && Is(S, ee, r), r = He, j = ee;
              var qe = r.updateQueue;
              if (qe === null) {
                var Je = /* @__PURE__ */ new Set();
                Je.add(j), r.updateQueue = Je;
              } else qe.add(j);
              break e;
            } else {
              if (!(r & 1)) {
                Is(S, ee, r), Zs();
                break e;
              }
              j = Error(c(426));
            }
          } else if (Cn && M.mode & 1) {
            var Hn = Em(E);
            if (Hn !== null) {
              !(Hn.flags & 65536) && (Hn.flags |= 256), Dp(Hn, E, M, S, r), bp(Ao(j, M));
              break e;
            }
          }
          S = j = Ao(j, M), nr !== 4 && (nr = 2), Lo === null ? Lo = [S] : Lo.push(S), S = E;
          do {
            switch (S.tag) {
              case 3:
                S.flags |= 65536, r &= -r, S.lanes |= r;
                var q = bm(S, j, r);
                dm(S, q);
                break e;
              case 1:
                M = j;
                var $ = S.type, X = S.stateNode;
                if (!(S.flags & 128) && (typeof $.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && (Qa === null || !Qa.has(X)))) {
                  S.flags |= 65536, r &= -r, S.lanes |= r;
                  var we = Cm(S, M, r);
                  dm(S, we);
                  break e;
                }
            }
            S = S.return;
          } while (S !== null);
        }
        Lm(l);
      } catch (at) {
        r = at, En === l && l !== null && (En = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Am() {
    var n = Ol.current;
    return Ol.current = Ur, n === null ? Ur : n;
  }
  function Zs() {
    (nr === 0 || nr === 3 || nr === 2) && (nr = 4), jn === null || !(Dl & 268435455) && !(Uu & 268435455) || ki(jn, tr);
  }
  function Pf(n, r) {
    var l = Pt;
    Pt |= 2;
    var f = Am();
    (jn !== n || tr !== r) && (eo = null, Nl(n, r));
    do
      try {
        Y0();
        break;
      } catch (v) {
        Mm(n, v);
      }
    while (!0);
    if (xa(), Pt = l, Ol.current = f, En !== null) throw Error(c(261));
    return jn = null, tr = 0, nr;
  }
  function Y0() {
    for (; En !== null; ) Nm(En);
  }
  function W0() {
    for (; En !== null && !Zr(); ) Nm(En);
  }
  function Nm(n) {
    var r = jm(n.alternate, n, sa);
    n.memoizedProps = n.pendingProps, r === null ? Lm(n) : En = r, Mf.current = null;
  }
  function Lm(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = V0(l, r), l !== null) {
          l.flags &= 32767, En = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          nr = 6, En = null;
          return;
        }
      } else if (l = $0(l, r, sa), l !== null) {
        En = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        En = r;
        return;
      }
      En = r = n;
    } while (r !== null);
    nr === 0 && (nr = 5);
  }
  function zo(n, r, l) {
    var f = Jt, v = qa.transition;
    try {
      qa.transition = null, Jt = 1, G0(n, r, l, f);
    } finally {
      qa.transition = v, Jt = f;
    }
    return null;
  }
  function G0(n, r, l, f) {
    do
      $u();
    while (Ka !== null);
    if (Pt & 6) throw Error(c(327));
    l = n.finishedWork;
    var v = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(c(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var S = l.lanes | l.childLanes;
    if (g0(n, S), n === jn && (En = jn = null, tr = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Pu || (Pu = !0, Pm(Ei, function() {
      return $u(), null;
    })), S = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || S) {
      S = qa.transition, qa.transition = null;
      var E = Jt;
      Jt = 1;
      var M = Pt;
      Pt |= 4, Mf.current = null, B0(n, l), Om(l, n), Vc(hl), cl = !!cp, hl = cp = null, n.current = l, H0(l), So(), Pt = M, Jt = E, qa.transition = S;
    } else n.current = l;
    if (Pu && (Pu = !1, Ka = n, Lf = v), S = n.pendingLanes, S === 0 && (Qa = null), gh(l.stateNode), rr(n, Kt()), r !== null) for (f = n.onRecoverableError, l = 0; l < r.length; l++) v = r[l], f(v.value, { componentStack: v.stack, digest: v.digest });
    if (Nf) throw Nf = !1, n = Pp, Pp = null, n;
    return Lf & 1 && n.tag !== 0 && $u(), S = n.pendingLanes, S & 1 ? n === zf ? Ks++ : (Ks = 0, zf = n) : Ks = 0, ta(), null;
  }
  function $u() {
    if (Ka !== null) {
      var n = Vd(Lf), r = qa.transition, l = Jt;
      try {
        if (qa.transition = null, Jt = 16 > n ? 16 : n, Ka === null) var f = !1;
        else {
          if (n = Ka, Ka = null, Lf = 0, Pt & 6) throw Error(c(331));
          var v = Pt;
          for (Pt |= 4, Ge = n.current; Ge !== null; ) {
            var S = Ge, E = S.child;
            if (Ge.flags & 16) {
              var M = S.deletions;
              if (M !== null) {
                for (var j = 0; j < M.length; j++) {
                  var ee = M[j];
                  for (Ge = ee; Ge !== null; ) {
                    var Se = Ge;
                    switch (Se.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Du(8, Se, S);
                    }
                    var Ce = Se.child;
                    if (Ce !== null) Ce.return = Se, Ge = Ce;
                    else for (; Ge !== null; ) {
                      Se = Ge;
                      var ye = Se.sibling, He = Se.return;
                      if (_m(Se), Se === ee) {
                        Ge = null;
                        break;
                      }
                      if (ye !== null) {
                        ye.return = He, Ge = ye;
                        break;
                      }
                      Ge = He;
                    }
                  }
                }
                var qe = S.alternate;
                if (qe !== null) {
                  var Je = qe.child;
                  if (Je !== null) {
                    qe.child = null;
                    do {
                      var Hn = Je.sibling;
                      Je.sibling = null, Je = Hn;
                    } while (Je !== null);
                  }
                }
                Ge = S;
              }
            }
            if (S.subtreeFlags & 2064 && E !== null) E.return = S, Ge = E;
            else e: for (; Ge !== null; ) {
              if (S = Ge, S.flags & 2048) switch (S.tag) {
                case 0:
                case 11:
                case 15:
                  Du(9, S, S.return);
              }
              var q = S.sibling;
              if (q !== null) {
                q.return = S.return, Ge = q;
                break e;
              }
              Ge = S.return;
            }
          }
          var $ = n.current;
          for (Ge = $; Ge !== null; ) {
            E = Ge;
            var X = E.child;
            if (E.subtreeFlags & 2064 && X !== null) X.return = E, Ge = X;
            else e: for (E = $; Ge !== null; ) {
              if (M = Ge, M.flags & 2048) try {
                switch (M.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Of(9, M);
                }
              } catch (at) {
                Pn(M, M.return, at);
              }
              if (M === E) {
                Ge = null;
                break e;
              }
              var we = M.sibling;
              if (we !== null) {
                we.return = M.return, Ge = we;
                break e;
              }
              Ge = M.return;
            }
          }
          if (Pt = v, ta(), ui && typeof ui.onPostCommitFiberRoot == "function") try {
            ui.onPostCommitFiberRoot(ds, n);
          } catch {
          }
          f = !0;
        }
        return f;
      } finally {
        Jt = l, qa.transition = r;
      }
    }
    return !1;
  }
  function zm(n, r, l) {
    r = Ao(l, r), r = bm(n, r, 1), n = Do(n, r, 1), r = mr(), n !== null && (sl(n, 1, r), rr(n, r));
  }
  function Pn(n, r, l) {
    if (n.tag === 3) zm(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        zm(r, n, l);
        break;
      } else if (r.tag === 1) {
        var f = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof f.componentDidCatch == "function" && (Qa === null || !Qa.has(f))) {
          n = Ao(l, n), n = Cm(r, n, 1), r = Do(r, n, 1), n = mr(), r !== null && (sl(r, 1, n), rr(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function q0(n, r, l) {
    var f = n.pingCache;
    f !== null && f.delete(r), r = mr(), n.pingedLanes |= n.suspendedLanes & l, jn === n && (tr & l) === l && (nr === 4 || nr === 3 && (tr & 130023424) === tr && 500 > Kt() - Af ? Nl(n, 0) : jp |= l), rr(n, r);
  }
  function Um(n, r) {
    r === 0 && (n.mode & 1 ? (r = eu, eu <<= 1, !(eu & 130023424) && (eu = 4194304)) : r = 1);
    var l = mr();
    n = Xi(n, r), n !== null && (sl(n, r, l), rr(n, l));
  }
  function Bp(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Um(n, l);
  }
  function Q0(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var f = n.stateNode, v = n.memoizedState;
        v !== null && (l = v.retryLane);
        break;
      case 19:
        f = n.stateNode;
        break;
      default:
        throw Error(c(314));
    }
    f !== null && f.delete(r), Um(n, l);
  }
  var jm;
  jm = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || zn.current) la = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return la = !1, Ji(n, r, l);
      la = !!(n.flags & 131072);
    }
    else la = !1, Cn && r.flags & 1048576 && yp(r, du, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var f = r.type;
        Gs(n, r), n = r.pendingProps;
        var v = $a(r, wt.current);
        vu(r, l), v = me(null, r, f, n, v, l);
        var S = qn();
        return r.flags |= 1, typeof v == "object" && v !== null && typeof v.render == "function" && v.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, _n(f) ? (S = !0, Gc(r)) : S = !1, r.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null, ef(r), v.updater = Rl, r.stateNode = v, v._reactInternals = r, kp(r, f, n, l), r = Tf(null, r, f, !0, S, l)) : (r.tag = 0, Cn && S && qc(r), Vn(null, r, v, l), r = r.child), r;
      case 16:
        f = r.elementType;
        e: {
          switch (Gs(n, r), n = r.pendingProps, v = f._init, f = v(f._payload), r.type = f, v = r.tag = K0(f), n = oa(f, n), v) {
            case 0:
              r = Dt(null, r, f, n, l);
              break e;
            case 1:
              r = Ys(null, r, f, n, l);
              break e;
            case 11:
              r = wu(null, r, f, n, l);
              break e;
            case 14:
              r = No(null, r, f, oa(f.type, n), l);
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
        return f = r.type, v = r.pendingProps, v = r.elementType === f ? v : oa(f, v), Dt(n, r, f, v, l);
      case 1:
        return f = r.type, v = r.pendingProps, v = r.elementType === f ? v : oa(f, v), Ys(n, r, f, v, l);
      case 3:
        e: {
          if (F0(r), n === null) throw Error(c(387));
          f = r.pendingProps, S = r.memoizedState, v = S.element, hu(n, r), nf(r, f, null, l);
          var E = r.memoizedState;
          if (f = E.element, S.isDehydrated) if (S = { element: f, isDehydrated: !1, cache: E.cache, pendingSuspenseBoundaries: E.pendingSuspenseBoundaries, transitions: E.transitions }, r.updateQueue.baseState = S, r.memoizedState = S, r.flags & 256) {
            v = Ao(Error(c(423)), r), r = xm(n, r, f, l, v);
            break e;
          } else if (f !== v) {
            v = Ao(Error(c(424)), r), r = xm(n, r, f, l, v);
            break e;
          } else for (aa = pi(r.stateNode.containerInfo.firstChild), Ta = r, Cn = !0, Ha = null, l = cm(r, null, f, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Mn(), f === v) {
              r = Bn(n, r, l);
              break e;
            }
            Vn(n, r, f, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return vm(r), n === null && Kc(r), f = r.type, v = r.pendingProps, S = n !== null ? n.memoizedProps : null, E = v.children, Ms(f, v) ? E = null : S !== null && Ms(f, S) && (r.flags |= 32), _l(n, r), Vn(n, r, E, l), r.child;
      case 6:
        return n === null && Kc(r), null;
      case 13:
        return wm(n, r, l);
      case 4:
        return Tp(r, r.stateNode.containerInfo), f = r.pendingProps, n === null ? r.child = pu(r, null, f, l) : Vn(n, r, f, l), r.child;
      case 11:
        return f = r.type, v = r.pendingProps, v = r.elementType === f ? v : oa(f, v), wu(n, r, f, v, l);
      case 7:
        return Vn(n, r, r.pendingProps, l), r.child;
      case 8:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return Vn(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (f = r.type._context, v = r.pendingProps, S = r.memoizedProps, E = v.value, Xt(Ki, f._currentValue), f._currentValue = E, S !== null) if (Pa(S.value, E)) {
            if (S.children === v.children && !zn.current) {
              r = Bn(n, r, l);
              break e;
            }
          } else for (S = r.child, S !== null && (S.return = r); S !== null; ) {
            var M = S.dependencies;
            if (M !== null) {
              E = S.child;
              for (var j = M.firstContext; j !== null; ) {
                if (j.context === f) {
                  if (S.tag === 1) {
                    j = ia(-1, l & -l), j.tag = 2;
                    var ee = S.updateQueue;
                    if (ee !== null) {
                      ee = ee.shared;
                      var Se = ee.pending;
                      Se === null ? j.next = j : (j.next = Se.next, Se.next = j), ee.pending = j;
                    }
                  }
                  S.lanes |= l, j = S.alternate, j !== null && (j.lanes |= l), Ep(
                    S.return,
                    l,
                    r
                  ), M.lanes |= l;
                  break;
                }
                j = j.next;
              }
            } else if (S.tag === 10) E = S.type === r.type ? null : S.child;
            else if (S.tag === 18) {
              if (E = S.return, E === null) throw Error(c(341));
              E.lanes |= l, M = E.alternate, M !== null && (M.lanes |= l), Ep(E, l, r), E = S.sibling;
            } else E = S.child;
            if (E !== null) E.return = S;
            else for (E = S; E !== null; ) {
              if (E === r) {
                E = null;
                break;
              }
              if (S = E.sibling, S !== null) {
                S.return = E.return, E = S;
                break;
              }
              E = E.return;
            }
            S = E;
          }
          Vn(n, r, v.children, l), r = r.child;
        }
        return r;
      case 9:
        return v = r.type, f = r.pendingProps.children, vu(r, l), v = Ya(v), f = f(v), r.flags |= 1, Vn(n, r, f, l), r.child;
      case 14:
        return f = r.type, v = oa(f, r.pendingProps), v = oa(f.type, v), No(n, r, f, v, l);
      case 15:
        return Ef(n, r, r.type, r.pendingProps, l);
      case 17:
        return f = r.type, v = r.pendingProps, v = r.elementType === f ? v : oa(f, v), Gs(n, r), r.tag = 1, _n(f) ? (n = !0, Gc(r)) : n = !1, vu(r, l), ym(r, f, v), kp(r, f, v, l), Tf(null, r, f, !0, n, l);
      case 19:
        return Ap(n, r, l);
      case 22:
        return ua(n, r, l);
    }
    throw Error(c(156, r.tag));
  };
  function Pm(n, r) {
    return Sn(n, r);
  }
  function Fm(n, r, l, f) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = f, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Xa(n, r, l, f) {
    return new Fm(n, r, l, f);
  }
  function Hp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function K0(n) {
    if (typeof n == "function") return Hp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === he) return 11;
      if (n === it) return 14;
    }
    return 2;
  }
  function Uo(n, r) {
    var l = n.alternate;
    return l === null ? (l = Xa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Ff(n, r, l, f, v, S) {
    var E = 2;
    if (f = n, typeof n == "function") Hp(n) && (E = 1);
    else if (typeof n == "string") E = 5;
    else e: switch (n) {
      case ie:
        return Ll(l.children, v, S, r);
      case Xe:
        E = 8, v |= 8;
        break;
      case D:
        return n = Xa(12, l, r, v | 2), n.elementType = D, n.lanes = S, n;
      case ve:
        return n = Xa(13, l, r, v), n.elementType = ve, n.lanes = S, n;
      case Re:
        return n = Xa(19, l, r, v), n.elementType = Re, n.lanes = S, n;
      case Ct:
        return $f(l, v, S, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case ce:
            E = 10;
            break e;
          case _e:
            E = 9;
            break e;
          case he:
            E = 11;
            break e;
          case it:
            E = 14;
            break e;
          case Be:
            E = 16, f = null;
            break e;
        }
        throw Error(c(130, n == null ? n : typeof n, ""));
    }
    return r = Xa(E, l, r, v), r.elementType = n, r.type = f, r.lanes = S, r;
  }
  function Ll(n, r, l, f) {
    return n = Xa(7, n, f, r), n.lanes = l, n;
  }
  function $f(n, r, l, f) {
    return n = Xa(22, n, f, r), n.elementType = Ct, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Vf(n, r, l) {
    return n = Xa(6, n, null, r), n.lanes = l, n;
  }
  function Js(n, r, l) {
    return r = Xa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function ec(n, r, l, f, v) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $d(0), this.expirationTimes = $d(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $d(0), this.identifierPrefix = f, this.onRecoverableError = v, this.mutableSourceEagerHydrationData = null;
  }
  function Ip(n, r, l, f, v, S, E, M, j) {
    return n = new ec(n, r, l, M, j), r === 1 ? (r = 1, S === !0 && (r |= 8)) : r = 0, S = Xa(3, null, null, r), n.current = S, S.stateNode = n, S.memoizedState = { element: f, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, ef(S), n;
  }
  function $m(n, r, l) {
    var f = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: de, key: f == null ? null : "" + f, children: n, containerInfo: r, implementation: l };
  }
  function Yp(n) {
    if (!n) return xi;
    n = n._reactInternals;
    e: {
      if (ct(n) !== n || n.tag !== 1) throw Error(c(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (_n(r.type)) {
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
      if (_n(l)) return Ls(n, l, r);
    }
    return r;
  }
  function Wp(n, r, l, f, v, S, E, M, j) {
    return n = Ip(l, f, !0, n, v, S, E, M, j), n.context = Yp(null), l = n.current, f = mr(), v = to(l), S = ia(f, v), S.callback = r ?? null, Do(l, S, v), n.current.lanes = v, sl(n, v, f), rr(n, f), n;
  }
  function Bf(n, r, l, f) {
    var v = r.current, S = mr(), E = to(v);
    return l = Yp(l), r.context === null ? r.context = l : r.pendingContext = l, r = ia(S, E), r.payload = { element: n }, f = f === void 0 ? null : f, f !== null && (r.callback = f), n = Do(v, r, E), n !== null && (An(n, v, E, S), tf(n, v, E)), E;
  }
  function tc(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Vm(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Gp(n, r) {
    Vm(n, r), (n = n.alternate) && Vm(n, r);
  }
  function X0() {
    return null;
  }
  var qp = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Hf(n) {
    this._internalRoot = n;
  }
  nc.prototype.render = Hf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(c(409));
    Bf(n, r, null, null);
  }, nc.prototype.unmount = Hf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Oi(function() {
        Bf(null, n, null, null);
      }), r[qi] = null;
    }
  };
  function nc(n) {
    this._internalRoot = n;
  }
  nc.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Eh();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < an.length && r !== 0 && r < an[l].priority; l++) ;
      an.splice(l, 0, n), l === 0 && Th(n);
    }
  };
  function jo(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function If(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Bm() {
  }
  function Z0(n, r, l, f, v) {
    if (v) {
      if (typeof f == "function") {
        var S = f;
        f = function() {
          var ee = tc(E);
          S.call(ee);
        };
      }
      var E = Wp(r, f, n, 0, null, !1, !1, "", Bm);
      return n._reactRootContainer = E, n[qi] = E.current, cu(n.nodeType === 8 ? n.parentNode : n), Oi(), E;
    }
    for (; v = n.lastChild; ) n.removeChild(v);
    if (typeof f == "function") {
      var M = f;
      f = function() {
        var ee = tc(j);
        M.call(ee);
      };
    }
    var j = Ip(n, 0, !1, null, null, !1, !1, "", Bm);
    return n._reactRootContainer = j, n[qi] = j.current, cu(n.nodeType === 8 ? n.parentNode : n), Oi(function() {
      Bf(r, j, l, f);
    }), j;
  }
  function Yf(n, r, l, f, v) {
    var S = l._reactRootContainer;
    if (S) {
      var E = S;
      if (typeof v == "function") {
        var M = v;
        v = function() {
          var j = tc(E);
          M.call(j);
        };
      }
      Bf(r, E, n, v);
    } else E = Z0(l, r, n, v, f);
    return tc(E);
  }
  Ch = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = ul(r.pendingLanes);
          l !== 0 && (ps(r, l | 1), rr(r, Kt()), !(Pt & 6) && (ju = Kt() + 500, ta()));
        }
        break;
      case 13:
        Oi(function() {
          var f = Xi(n, 1);
          if (f !== null) {
            var v = mr();
            An(f, n, 1, v);
          }
        }), Gp(n, 1);
    }
  }, Oc = function(n) {
    if (n.tag === 13) {
      var r = Xi(n, 134217728);
      if (r !== null) {
        var l = mr();
        An(r, n, 134217728, l);
      }
      Gp(n, 134217728);
    }
  }, en = function(n) {
    if (n.tag === 13) {
      var r = to(n), l = Xi(n, r);
      if (l !== null) {
        var f = mr();
        An(l, n, r, f);
      }
      Gp(n, r);
    }
  }, Eh = function() {
    return Jt;
  }, Bd = function(n, r) {
    var l = Jt;
    try {
      return Jt = n, r();
    } finally {
      Jt = l;
    }
  }, ya = function(n, r, l) {
    switch (r) {
      case "input":
        if (rn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var f = l[r];
            if (f !== n && f.form === n.form) {
              var v = dt(f);
              if (!v) throw Error(c(90));
              xe(f), rn(f, v);
            }
          }
        }
        break;
      case "textarea":
        $e(n, l);
        break;
      case "select":
        r = l.value, r != null && Oe(n, !!l.multiple, r, !1);
    }
  }, fs = Vp, wc = Oi;
  var J0 = { usingClientEntryPoint: !1, Events: [Ns, fu, dt, al, Xl, Vp] }, rc = { findFiberByHostInstance: Fa, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Hm = { bundleType: rc.bundleType, version: rc.version, rendererPackageName: rc.rendererPackageName, rendererConfig: rc.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: J.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Lt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: rc.findFiberByHostInstance || X0, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Wf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Wf.isDisabled && Wf.supportsFiber) try {
      ds = Wf.inject(Hm), ui = Wf;
    } catch {
    }
  }
  return ri.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = J0, ri.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!jo(r)) throw Error(c(200));
    return $m(n, r, null, l);
  }, ri.createRoot = function(n, r) {
    if (!jo(n)) throw Error(c(299));
    var l = !1, f = "", v = qp;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (f = r.identifierPrefix), r.onRecoverableError !== void 0 && (v = r.onRecoverableError)), r = Ip(n, 1, !1, null, null, l, !1, f, v), n[qi] = r.current, cu(n.nodeType === 8 ? n.parentNode : n), new Hf(r);
  }, ri.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(c(188)) : (n = Object.keys(n).join(","), Error(c(268, n)));
    return n = Lt(r), n = n === null ? null : n.stateNode, n;
  }, ri.flushSync = function(n) {
    return Oi(n);
  }, ri.hydrate = function(n, r, l) {
    if (!If(r)) throw Error(c(200));
    return Yf(null, n, r, !0, l);
  }, ri.hydrateRoot = function(n, r, l) {
    if (!jo(n)) throw Error(c(405));
    var f = l != null && l.hydratedSources || null, v = !1, S = "", E = qp;
    if (l != null && (l.unstable_strictMode === !0 && (v = !0), l.identifierPrefix !== void 0 && (S = l.identifierPrefix), l.onRecoverableError !== void 0 && (E = l.onRecoverableError)), r = Wp(r, null, n, 1, l ?? null, v, !1, S, E), n[qi] = r.current, cu(n), f) for (n = 0; n < f.length; n++) l = f[n], v = l._getVersion, v = v(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, v] : r.mutableSourceEagerHydrationData.push(
      l,
      v
    );
    return new nc(r);
  }, ri.render = function(n, r, l) {
    if (!If(r)) throw Error(c(200));
    return Yf(null, n, r, !1, l);
  }, ri.unmountComponentAtNode = function(n) {
    if (!If(n)) throw Error(c(40));
    return n._reactRootContainer ? (Oi(function() {
      Yf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[qi] = null;
      });
    }), !0) : !1;
  }, ri.unstable_batchedUpdates = Vp, ri.unstable_renderSubtreeIntoContainer = function(n, r, l, f) {
    if (!If(l)) throw Error(c(200));
    if (n == null || n._reactInternals === void 0) throw Error(c(38));
    return Yf(n, r, l, !1, f);
  }, ri.version = "18.3.1-next-f1338f8080-20240426", ri;
}
var ai = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Hw;
function l2() {
  return Hw || (Hw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var i = Rn, s = GR(), c = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, p = !1;
    function y(e) {
      p = e;
    }
    function g(e) {
      if (!p) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        T("warn", e, a);
      }
    }
    function h(e) {
      if (!p) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++)
          a[o - 1] = arguments[o];
        T("error", e, a);
      }
    }
    function T(e, t, a) {
      {
        var o = c.ReactDebugCurrentFrame, u = o.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var d = a.map(function(m) {
          return String(m);
        });
        d.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, d);
      }
    }
    var w = 0, _ = 1, A = 2, O = 3, L = 4, H = 5, Y = 6, B = 7, P = 8, se = 9, ae = 10, I = 11, J = 12, U = 13, de = 14, ie = 15, Xe = 16, D = 17, ce = 18, _e = 19, he = 21, ve = 22, Re = 23, it = 24, Be = 25, Ct = !0, ge = !1, ke = !1, W = !1, pe = !1, Ne = !0, Ze = !1, Fe = !0, yt = !0, We = !0, ot = !0, nt = /* @__PURE__ */ new Set(), pt = {}, gt = {};
    function Nt(e, t) {
      xe(e, t), xe(e + "Capture", t);
    }
    function xe(e, t) {
      pt[e] && h("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), pt[e] = t;
      {
        var a = e.toLowerCase();
        gt[a] = e, e === "onDoubleClick" && (gt.ondblclick = e);
      }
      for (var o = 0; o < t.length; o++)
        nt.add(t[o]);
    }
    var xt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Le = Object.prototype.hasOwnProperty;
    function Gt(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function jt(e) {
      try {
        return rn(e), !1;
      } catch {
        return !0;
      }
    }
    function rn(e) {
      return "" + e;
    }
    function N(e, t) {
      if (jt(e))
        return h("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Gt(e)), rn(e);
    }
    function G(e) {
      if (jt(e))
        return h("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Gt(e)), rn(e);
    }
    function re(e, t) {
      if (jt(e))
        return h("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Gt(e)), rn(e);
    }
    function Oe(e, t) {
      if (jt(e))
        return h("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Gt(e)), rn(e);
    }
    function Te(e) {
      if (jt(e))
        return h("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Gt(e)), rn(e);
    }
    function ne(e) {
      if (jt(e))
        return h("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Gt(e)), rn(e);
    }
    var $e = 0, Et = 1, vt = 2, tt = 3, vn = 4, ma = 5, Zn = 6, Me = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", st = Me + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", At = new RegExp("^[" + Me + "][" + st + "]*$"), qt = {}, hn = {};
    function sr(e) {
      return Le.call(hn, e) ? !0 : Le.call(qt, e) ? !1 : At.test(e) ? (hn[e] = !0, !0) : (qt[e] = !0, h("Invalid attribute name: `%s`", e), !1);
    }
    function $n(e, t, a) {
      return t !== null ? t.type === $e : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Xr(e, t, a, o) {
      if (a !== null && a.type === $e)
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
    function mn(e, t, a, o) {
      if (t === null || typeof t > "u" || Xr(e, t, a, o))
        return !0;
      if (o)
        return !1;
      if (a !== null)
        switch (a.type) {
          case tt:
            return !t;
          case vn:
            return t === !1;
          case ma:
            return isNaN(t);
          case Zn:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function ya(e) {
      return yn.hasOwnProperty(e) ? yn[e] : null;
    }
    function dn(e, t, a, o, u, d, m) {
      this.acceptsBooleans = t === vt || t === tt || t === vn, this.attributeName = o, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = d, this.removeEmptyString = m;
    }
    var yn = {}, Kl = [
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
    Kl.forEach(function(e) {
      yn[e] = new dn(
        e,
        $e,
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
      yn[t] = new dn(
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
      yn[e] = new dn(
        e,
        vt,
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
      yn[e] = new dn(
        e,
        vt,
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
      yn[e] = new dn(
        e,
        tt,
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
      yn[e] = new dn(
        e,
        tt,
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
      yn[e] = new dn(
        e,
        vn,
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
      yn[e] = new dn(
        e,
        Zn,
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
      yn[e] = new dn(
        e,
        ma,
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
    var al = /[\-\:]([a-z])/g, Xl = function(e) {
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
      var t = e.replace(al, Xl);
      yn[t] = new dn(
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
      var t = e.replace(al, Xl);
      yn[t] = new dn(
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
      var t = e.replace(al, Xl);
      yn[t] = new dn(
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
      yn[e] = new dn(
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
    var fs = "xlinkHref";
    yn[fs] = new dn(
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
      yn[e] = new dn(
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
    var wc = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, il = !1;
    function Zl(e) {
      !il && wc.test(e) && (il = !0, h("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ol(e, t, a, o) {
      if (o.mustUseProperty) {
        var u = o.propertyName;
        return e[u];
      } else {
        N(a, t), o.sanitizeURL && Zl("" + a);
        var d = o.attributeName, m = null;
        if (o.type === vn) {
          if (e.hasAttribute(d)) {
            var b = e.getAttribute(d);
            return b === "" ? !0 : mn(t, a, o, !1) ? b : b === "" + a ? a : b;
          }
        } else if (e.hasAttribute(d)) {
          if (mn(t, a, o, !1))
            return e.getAttribute(d);
          if (o.type === tt)
            return a;
          m = e.getAttribute(d);
        }
        return mn(t, a, o, !1) ? m === null ? a : m : m === "" + a ? a : m;
      }
    }
    function Jl(e, t, a, o) {
      {
        if (!sr(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return N(a, t), u === "" + a ? a : u;
      }
    }
    function Ci(e, t, a, o) {
      var u = ya(t);
      if (!$n(t, u, o)) {
        if (mn(t, a, u, o) && (a = null), o || u === null) {
          if (sr(t)) {
            var d = t;
            a === null ? e.removeAttribute(d) : (N(a, t), e.setAttribute(d, "" + a));
          }
          return;
        }
        var m = u.mustUseProperty;
        if (m) {
          var b = u.propertyName;
          if (a === null) {
            var C = u.type;
            e[b] = C === tt ? !1 : "";
          } else
            e[b] = a;
          return;
        }
        var x = u.attributeName, k = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(x);
        else {
          var V = u.type, F;
          V === tt || V === vn && a === !0 ? F = "" : (N(a, x), F = "" + a, u.sanitizeURL && Zl(F.toString())), k ? e.setAttributeNS(k, x, F) : e.setAttribute(x, F);
        }
      }
    }
    var Vi = Symbol.for("react.element"), ga = Symbol.for("react.portal"), li = Symbol.for("react.fragment"), go = Symbol.for("react.strict_mode"), ll = Symbol.for("react.profiler"), z = Symbol.for("react.provider"), be = Symbol.for("react.context"), ze = Symbol.for("react.forward_ref"), ct = Symbol.for("react.suspense"), $t = Symbol.for("react.suspense_list"), Ht = Symbol.for("react.memo"), bt = Symbol.for("react.lazy"), Lt = Symbol.for("react.scope"), cr = Symbol.for("react.debug_trace_mode"), Sn = Symbol.for("react.offscreen"), Dn = Symbol.for("react.legacy_hidden"), Zr = Symbol.for("react.cache"), So = Symbol.for("react.tracing_marker"), Kt = Symbol.iterator, Ar = "@@iterator";
    function Sa(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Kt && e[Kt] || e[Ar];
      return typeof t == "function" ? t : null;
    }
    var zt = Object.assign, Ei = 0, yh, jd, ds, ui, gh, za, Sh;
    function bh() {
    }
    bh.__reactDisabledLog = !0;
    function y0() {
      {
        if (Ei === 0) {
          yh = console.log, jd = console.info, ds = console.warn, ui = console.error, gh = console.group, za = console.groupCollapsed, Sh = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: bh,
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
    function Rc() {
      {
        if (Ei--, Ei === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: zt({}, e, {
              value: yh
            }),
            info: zt({}, e, {
              value: jd
            }),
            warn: zt({}, e, {
              value: ds
            }),
            error: zt({}, e, {
              value: ui
            }),
            group: zt({}, e, {
              value: gh
            }),
            groupCollapsed: zt({}, e, {
              value: za
            }),
            groupEnd: zt({}, e, {
              value: Sh
            })
          });
        }
        Ei < 0 && h("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var eu = c.ReactCurrentDispatcher, ul;
    function si(e, t, a) {
      {
        if (ul === void 0)
          try {
            throw Error();
          } catch (u) {
            var o = u.stack.trim().match(/\n( *(at )?)/);
            ul = o && o[1] || "";
          }
        return `
` + ul + e;
      }
    }
    var Pd = !1, _c;
    {
      var Fd = typeof WeakMap == "function" ? WeakMap : Map;
      _c = new Fd();
    }
    function kc(e, t) {
      if (!e || Pd)
        return "";
      {
        var a = _c.get(e);
        if (a !== void 0)
          return a;
      }
      var o;
      Pd = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var d;
      d = eu.current, eu.current = null, y0();
      try {
        if (t) {
          var m = function() {
            throw Error();
          };
          if (Object.defineProperty(m.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(m, []);
            } catch (te) {
              o = te;
            }
            Reflect.construct(e, [], m);
          } else {
            try {
              m.call();
            } catch (te) {
              o = te;
            }
            e.call(m.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (te) {
            o = te;
          }
          e();
        }
      } catch (te) {
        if (te && o && typeof te.stack == "string") {
          for (var b = te.stack.split(`
`), C = o.stack.split(`
`), x = b.length - 1, k = C.length - 1; x >= 1 && k >= 0 && b[x] !== C[k]; )
            k--;
          for (; x >= 1 && k >= 0; x--, k--)
            if (b[x] !== C[k]) {
              if (x !== 1 || k !== 1)
                do
                  if (x--, k--, k < 0 || b[x] !== C[k]) {
                    var V = `
` + b[x].replace(" at new ", " at ");
                    return e.displayName && V.includes("<anonymous>") && (V = V.replace("<anonymous>", e.displayName)), typeof e == "function" && _c.set(e, V), V;
                  }
                while (x >= 1 && k >= 0);
              break;
            }
        }
      } finally {
        Pd = !1, eu.current = d, Rc(), Error.prepareStackTrace = u;
      }
      var F = e ? e.displayName || e.name : "", Z = F ? si(F) : "";
      return typeof e == "function" && _c.set(e, Z), Z;
    }
    function $d(e, t, a) {
      return kc(e, !0);
    }
    function sl(e, t, a) {
      return kc(e, !1);
    }
    function g0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function ps(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return kc(e, g0(e));
      if (typeof e == "string")
        return si(e);
      switch (e) {
        case ct:
          return si("Suspense");
        case $t:
          return si("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case ze:
            return sl(e.render);
          case Ht:
            return ps(e.type, t, a);
          case bt: {
            var o = e, u = o._payload, d = o._init;
            try {
              return ps(d(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Jt(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case H:
          return si(e.type);
        case Xe:
          return si("Lazy");
        case U:
          return si("Suspense");
        case _e:
          return si("SuspenseList");
        case w:
        case A:
        case ie:
          return sl(e.type);
        case I:
          return sl(e.type.render);
        case _:
          return $d(e.type);
        default:
          return "";
      }
    }
    function Vd(e) {
      try {
        var t = "", a = e;
        do
          t += Jt(a), a = a.return;
        while (a);
        return t;
      } catch (o) {
        return `
Error generating stack: ` + o.message + `
` + o.stack;
      }
    }
    function Ch(e, t, a) {
      var o = e.displayName;
      if (o)
        return o;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Oc(e) {
      return e.displayName || "Context";
    }
    function en(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && h("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case li:
          return "Fragment";
        case ga:
          return "Portal";
        case ll:
          return "Profiler";
        case go:
          return "StrictMode";
        case ct:
          return "Suspense";
        case $t:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case be:
            var t = e;
            return Oc(t) + ".Consumer";
          case z:
            var a = e;
            return Oc(a._context) + ".Provider";
          case ze:
            return Ch(e, e.render, "ForwardRef");
          case Ht:
            var o = e.displayName || null;
            return o !== null ? o : en(e.type) || "Memo";
          case bt: {
            var u = e, d = u._payload, m = u._init;
            try {
              return en(m(d));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Eh(e, t, a) {
      var o = t.displayName || t.name || "";
      return e.displayName || (o !== "" ? a + "(" + o + ")" : a);
    }
    function Bd(e) {
      return e.displayName || "Context";
    }
    function Ot(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case it:
          return "Cache";
        case se:
          var o = a;
          return Bd(o) + ".Consumer";
        case ae:
          var u = a;
          return Bd(u._context) + ".Provider";
        case ce:
          return "DehydratedFragment";
        case I:
          return Eh(a, a.render, "ForwardRef");
        case B:
          return "Fragment";
        case H:
          return a;
        case L:
          return "Portal";
        case O:
          return "Root";
        case Y:
          return "Text";
        case Xe:
          return en(a);
        case P:
          return a === go ? "StrictMode" : "Mode";
        case ve:
          return "Offscreen";
        case J:
          return "Profiler";
        case he:
          return "Scope";
        case U:
          return "Suspense";
        case _e:
          return "SuspenseList";
        case Be:
          return "TracingMarker";
        case _:
        case w:
        case D:
        case A:
        case de:
        case ie:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var vs = c.ReactDebugCurrentFrame, Yn = null, Ua = !1;
    function ja() {
      {
        if (Yn === null)
          return null;
        var e = Yn._debugOwner;
        if (e !== null && typeof e < "u")
          return Ot(e);
      }
      return null;
    }
    function hs() {
      return Yn === null ? "" : Vd(Yn);
    }
    function Jn() {
      vs.getCurrentStack = null, Yn = null, Ua = !1;
    }
    function an(e) {
      vs.getCurrentStack = e === null ? null : hs, Yn = e, Ua = !1;
    }
    function S0() {
      return Yn;
    }
    function ci(e) {
      Ua = e;
    }
    function Nr(e) {
      return "" + e;
    }
    function bo(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return ne(e), e;
        default:
          return "";
      }
    }
    var Th = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function tu(e, t) {
      Th[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || h("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || h("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Hd(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function xh(e) {
      return e._valueTracker;
    }
    function ms(e) {
      e._valueTracker = null;
    }
    function ys(e) {
      var t = "";
      return e && (Hd(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function nu(e) {
      var t = Hd(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      ne(e[t]);
      var o = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, d = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(b) {
            ne(b), o = "" + b, d.call(this, b);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var m = {
          getValue: function() {
            return o;
          },
          setValue: function(b) {
            ne(b), o = "" + b;
          },
          stopTracking: function() {
            ms(e), delete e[t];
          }
        };
        return m;
      }
    }
    function cl(e) {
      xh(e) || (e._valueTracker = nu(e));
    }
    function wh(e) {
      if (!e)
        return !1;
      var t = xh(e);
      if (!t)
        return !0;
      var a = t.getValue(), o = ys(e);
      return o !== a ? (t.setValue(o), !0) : !1;
    }
    function Dc(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Mc = !1, gs = !1, Ac = !1, Id = !1;
    function Bi(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function Ss(e, t) {
      var a = e, o = t.checked, u = zt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: o ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function bs(e, t) {
      tu("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !gs && (h("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", ja() || "A component", t.type), gs = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Mc && (h("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", ja() || "A component", t.type), Mc = !0);
      var a = e, o = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: bo(t.value != null ? t.value : o),
        controlled: Bi(t)
      };
    }
    function Yd(e, t) {
      var a = e, o = t.checked;
      o != null && Ci(a, "checked", o, !1);
    }
    function ru(e, t) {
      var a = e;
      {
        var o = Bi(t);
        !a._wrapperState.controlled && o && !Id && (h("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Id = !0), a._wrapperState.controlled && !o && !Ac && (h("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Ac = !0);
      }
      Yd(e, t);
      var u = bo(t.value), d = t.type;
      if (u != null)
        d === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Nr(u)) : a.value !== Nr(u) && (a.value = Nr(u));
      else if (d === "submit" || d === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Co(a, t.type, u) : t.hasOwnProperty("defaultValue") && Co(a, t.type, bo(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Cs(e, t, a) {
      var o = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, d = u === "submit" || u === "reset";
        if (d && (t.value === void 0 || t.value === null))
          return;
        var m = Nr(o._wrapperState.initialValue);
        a || m !== o.value && (o.value = m), o.defaultValue = m;
      }
      var b = o.name;
      b !== "" && (o.name = ""), o.defaultChecked = !o.defaultChecked, o.defaultChecked = !!o._wrapperState.initialChecked, b !== "" && (o.name = b);
    }
    function Rh(e, t) {
      var a = e;
      ru(a, t), ba(a, t);
    }
    function ba(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var o = e; o.parentNode; )
          o = o.parentNode;
        N(a, "name");
        for (var u = o.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), d = 0; d < u.length; d++) {
          var m = u[d];
          if (!(m === e || m.form !== e.form)) {
            var b = oy(m);
            if (!b)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            wh(m), ru(m, b);
          }
        }
      }
    }
    function Co(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Dc(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Nr(e._wrapperState.initialValue) : e.defaultValue !== Nr(a) && (e.defaultValue = Nr(a)));
    }
    var Nc = !1, au = !1, _h = !1;
    function Lc(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? i.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || au || (au = !0, h("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (_h || (_h = !0, h("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Nc && (h("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Nc = !0);
    }
    function Wd(e, t) {
      t.value != null && e.setAttribute("value", Nr(bo(t.value)));
    }
    var Es = Array.isArray;
    function fr(e) {
      return Es(e);
    }
    var zc;
    zc = !1;
    function kh() {
      var e = ja();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Oh = ["value", "defaultValue"];
    function b0(e) {
      {
        tu("select", e);
        for (var t = 0; t < Oh.length; t++) {
          var a = Oh[t];
          if (e[a] != null) {
            var o = fr(e[a]);
            e.multiple && !o ? h("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, kh()) : !e.multiple && o && h("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, kh());
          }
        }
      }
    }
    function Eo(e, t, a, o) {
      var u = e.options;
      if (t) {
        for (var d = a, m = {}, b = 0; b < d.length; b++)
          m["$" + d[b]] = !0;
        for (var C = 0; C < u.length; C++) {
          var x = m.hasOwnProperty("$" + u[C].value);
          u[C].selected !== x && (u[C].selected = x), x && o && (u[C].defaultSelected = !0);
        }
      } else {
        for (var k = Nr(bo(a)), V = null, F = 0; F < u.length; F++) {
          if (u[F].value === k) {
            u[F].selected = !0, o && (u[F].defaultSelected = !0);
            return;
          }
          V === null && !u[F].disabled && (V = u[F]);
        }
        V !== null && (V.selected = !0);
      }
    }
    function Gd(e, t) {
      return zt({}, t, {
        value: void 0
      });
    }
    function Dh(e, t) {
      var a = e;
      b0(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !zc && (h("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), zc = !0);
    }
    function C0(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var o = t.value;
      o != null ? Eo(a, !!t.multiple, o, !1) : t.defaultValue != null && Eo(a, !!t.multiple, t.defaultValue, !0);
    }
    function E0(e, t) {
      var a = e, o = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Eo(a, !!t.multiple, u, !1) : o !== !!t.multiple && (t.defaultValue != null ? Eo(a, !!t.multiple, t.defaultValue, !0) : Eo(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function T0(e, t) {
      var a = e, o = t.value;
      o != null && Eo(a, !!t.multiple, o, !1);
    }
    var qd = !1;
    function Qd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var o = zt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Nr(a._wrapperState.initialValue)
      });
      return o;
    }
    function Mh(e, t) {
      var a = e;
      tu("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !qd && (h("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", ja() || "A component"), qd = !0);
      var o = t.value;
      if (o == null) {
        var u = t.children, d = t.defaultValue;
        if (u != null) {
          h("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (d != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (fr(u)) {
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
        initialValue: bo(o)
      };
    }
    function Ah(e, t) {
      var a = e, o = bo(t.value), u = bo(t.defaultValue);
      if (o != null) {
        var d = Nr(o);
        d !== a.value && (a.value = d), t.defaultValue == null && a.defaultValue !== d && (a.defaultValue = d);
      }
      u != null && (a.defaultValue = Nr(u));
    }
    function Nh(e, t) {
      var a = e, o = a.textContent;
      o === a._wrapperState.initialValue && o !== "" && o !== null && (a.value = o);
    }
    function Kd(e, t) {
      Ah(e, t);
    }
    var Hi = "http://www.w3.org/1999/xhtml", x0 = "http://www.w3.org/1998/Math/MathML", Xd = "http://www.w3.org/2000/svg";
    function Uc(e) {
      switch (e) {
        case "svg":
          return Xd;
        case "math":
          return x0;
        default:
          return Hi;
      }
    }
    function Zd(e, t) {
      return e == null || e === Hi ? Uc(t) : e === Xd && t === "foreignObject" ? Hi : e;
    }
    var w0 = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, o, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, o, u);
        });
      } : e;
    }, jc, Lh = w0(function(e, t) {
      if (e.namespaceURI === Xd && !("innerHTML" in e)) {
        jc = jc || document.createElement("div"), jc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = jc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Jr = 1, Ii = 3, Wn = 8, fi = 9, fl = 11, Pc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Ii) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, zh = {
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
    }, iu = {
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
    function Uh(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var jh = ["Webkit", "ms", "Moz", "O"];
    Object.keys(iu).forEach(function(e) {
      jh.forEach(function(t) {
        iu[Uh(t, e)] = iu[e];
      });
    });
    function Fc(e, t, a) {
      var o = t == null || typeof t == "boolean" || t === "";
      return o ? "" : !a && typeof t == "number" && t !== 0 && !(iu.hasOwnProperty(e) && iu[e]) ? t + "px" : (Oe(t, e), ("" + t).trim());
    }
    var ou = /([A-Z])/g, R0 = /^ms-/;
    function _0(e) {
      return e.replace(ou, "-$1").toLowerCase().replace(R0, "-ms-");
    }
    var Ph = function() {
    };
    {
      var Fh = /^(?:webkit|moz|o)[A-Z]/, $h = /^-ms-/, Ts = /-(.)/g, lu = /;\s*$/, uu = {}, su = {}, Vh = !1, Jd = !1, ep = function(e) {
        return e.replace(Ts, function(t, a) {
          return a.toUpperCase();
        });
      }, tp = function(e) {
        uu.hasOwnProperty(e) && uu[e] || (uu[e] = !0, h(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          ep(e.replace($h, "ms-"))
        ));
      }, Bh = function(e) {
        uu.hasOwnProperty(e) && uu[e] || (uu[e] = !0, h("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Hh = function(e, t) {
        su.hasOwnProperty(t) && su[t] || (su[t] = !0, h(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(lu, "")));
      }, Ih = function(e, t) {
        Vh || (Vh = !0, h("`NaN` is an invalid value for the `%s` css style property.", e));
      }, k0 = function(e, t) {
        Jd || (Jd = !0, h("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Ph = function(e, t) {
        e.indexOf("-") > -1 ? tp(e) : Fh.test(e) ? Bh(e) : lu.test(t) && Hh(e, t), typeof t == "number" && (isNaN(t) ? Ih(e, t) : isFinite(t) || k0(e, t));
      };
    }
    var O0 = Ph;
    function D0(e) {
      {
        var t = "", a = "";
        for (var o in e)
          if (e.hasOwnProperty(o)) {
            var u = e[o];
            if (u != null) {
              var d = o.indexOf("--") === 0;
              t += a + (d ? o : _0(o)) + ":", t += Fc(o, u, d), a = ";";
            }
          }
        return t || null;
      }
    }
    function Yh(e, t) {
      var a = e.style;
      for (var o in t)
        if (t.hasOwnProperty(o)) {
          var u = o.indexOf("--") === 0;
          u || O0(o, t[o]);
          var d = Fc(o, t[o], u);
          o === "float" && (o = "cssFloat"), u ? a.setProperty(o, d) : a[o] = d;
        }
    }
    function M0(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Pa(e) {
      var t = {};
      for (var a in e)
        for (var o = zh[a] || [a], u = 0; u < o.length; u++)
          t[o[u]] = a;
      return t;
    }
    function xs(e, t) {
      {
        if (!t)
          return;
        var a = Pa(e), o = Pa(t), u = {};
        for (var d in a) {
          var m = a[d], b = o[d];
          if (b && m !== b) {
            var C = m + "," + b;
            if (u[C])
              continue;
            u[C] = !0, h("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", M0(e[m]) ? "Removing" : "Updating", m, b);
          }
        }
      }
    }
    var Wh = {
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
    }, Gh = zt({
      menuitem: !0
    }, Wh), qh = "__html";
    function $c(e, t) {
      if (t) {
        if (Gh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(qh in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && h("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
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
    var Vc = {
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
    }, Qh = {
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
    }, di = {}, np = new RegExp("^(aria)-[" + st + "]*$"), ws = new RegExp("^(aria)[A-Z][" + st + "]*$");
    function rp(e, t) {
      {
        if (Le.call(di, t) && di[t])
          return !0;
        if (ws.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), o = Qh.hasOwnProperty(a) ? a : null;
          if (o == null)
            return h("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), di[t] = !0, !0;
          if (t !== o)
            return h("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, o), di[t] = !0, !0;
        }
        if (np.test(t)) {
          var u = t.toLowerCase(), d = Qh.hasOwnProperty(u) ? u : null;
          if (d == null)
            return di[t] = !0, !1;
          if (t !== d)
            return h("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, d), di[t] = !0, !0;
        }
      }
      return !0;
    }
    function Kh(e, t) {
      {
        var a = [];
        for (var o in t) {
          var u = rp(e, o);
          u || a.push(o);
        }
        var d = a.map(function(m) {
          return "`" + m + "`";
        }).join(", ");
        a.length === 1 ? h("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e) : a.length > 1 && h("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", d, e);
      }
    }
    function Bc(e, t) {
      Yi(e, t) || Kh(e, t);
    }
    var dl = !1;
    function ap(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !dl && (dl = !0, e === "select" && t.multiple ? h("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : h("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var ip = function() {
    };
    {
      var dr = {}, op = /^on./, Xh = /^on[^A-Z]/, Zh = new RegExp("^(aria)-[" + st + "]*$"), Jh = new RegExp("^(aria)[A-Z][" + st + "]*$");
      ip = function(e, t, a, o) {
        if (Le.call(dr, t) && dr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return h("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), dr[t] = !0, !0;
        if (o != null) {
          var d = o.registrationNameDependencies, m = o.possibleRegistrationNames;
          if (d.hasOwnProperty(t))
            return !0;
          var b = m.hasOwnProperty(u) ? m[u] : null;
          if (b != null)
            return h("Invalid event handler property `%s`. Did you mean `%s`?", t, b), dr[t] = !0, !0;
          if (op.test(t))
            return h("Unknown event handler property `%s`. It will be ignored.", t), dr[t] = !0, !0;
        } else if (op.test(t))
          return Xh.test(t) && h("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), dr[t] = !0, !0;
        if (Zh.test(t) || Jh.test(t))
          return !0;
        if (u === "innerhtml")
          return h("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), dr[t] = !0, !0;
        if (u === "aria")
          return h("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), dr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return h("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), dr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return h("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), dr[t] = !0, !0;
        var C = ya(t), x = C !== null && C.type === $e;
        if (Vc.hasOwnProperty(u)) {
          var k = Vc[u];
          if (k !== t)
            return h("Invalid DOM property `%s`. Did you mean `%s`?", t, k), dr[t] = !0, !0;
        } else if (!x && t !== u)
          return h("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), dr[t] = !0, !0;
        return typeof a == "boolean" && Xr(t, a, C, !1) ? (a ? h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : h('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), dr[t] = !0, !0) : x ? !0 : Xr(t, a, C, !1) ? (dr[t] = !0, !1) : ((a === "false" || a === "true") && C !== null && C.type === tt && (h("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), dr[t] = !0), !0);
      };
    }
    var em = function(e, t, a) {
      {
        var o = [];
        for (var u in t) {
          var d = ip(e, u, t[u], a);
          d || o.push(u);
        }
        var m = o.map(function(b) {
          return "`" + b + "`";
        }).join(", ");
        o.length === 1 ? h("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", m, e) : o.length > 1 && h("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", m, e);
      }
    };
    function tm(e, t, a) {
      Yi(e, t) || em(e, t, a);
    }
    var Wi = 1, Rs = 2, pl = 4, A0 = Wi | Rs | pl, _s = null;
    function ks(e) {
      _s !== null && h("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), _s = e;
    }
    function N0() {
      _s === null && h("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), _s = null;
    }
    function nm(e) {
      return e === _s;
    }
    function Hc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Ii ? t.parentNode : t;
    }
    var pn = null, To = null, Gi = null;
    function cu(e) {
      var t = Hu(e);
      if (t) {
        if (typeof pn != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var o = oy(a);
          pn(t.stateNode, t.type, o);
        }
      }
    }
    function rm(e) {
      pn = e;
    }
    function Ic(e) {
      To ? Gi ? Gi.push(e) : Gi = [e] : To = e;
    }
    function Os() {
      return To !== null || Gi !== null;
    }
    function Ds() {
      if (To) {
        var e = To, t = Gi;
        if (To = null, Gi = null, cu(e), t)
          for (var a = 0; a < t.length; a++)
            cu(t[a]);
      }
    }
    var vl = function(e, t) {
      return e(t);
    }, lp = function() {
    }, up = !1;
    function L0() {
      var e = Os();
      e && (lp(), Ds());
    }
    function sp(e, t, a) {
      if (up)
        return e(t, a);
      up = !0;
      try {
        return vl(e, t, a);
      } finally {
        up = !1, L0();
      }
    }
    function Yc(e, t, a) {
      vl = e, lp = a;
    }
    function Wc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function cp(e, t, a) {
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
          return !!(a.disabled && Wc(t));
        default:
          return !1;
      }
    }
    function hl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var o = oy(a);
      if (o === null)
        return null;
      var u = o[t];
      if (cp(t, e.type, o))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var Ms = !1;
    if (xt)
      try {
        var ml = {};
        Object.defineProperty(ml, "passive", {
          get: function() {
            Ms = !0;
          }
        }), window.addEventListener("test", ml, ml), window.removeEventListener("test", ml, ml);
      } catch {
        Ms = !1;
      }
    function am(e, t, a, o, u, d, m, b, C) {
      var x = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, x);
      } catch (k) {
        this.onError(k);
      }
    }
    var fp = am;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var dp = document.createElement("react");
      fp = function(t, a, o, u, d, m, b, C, x) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var k = document.createEvent("Event"), V = !1, F = !0, Z = window.event, te = Object.getOwnPropertyDescriptor(window, "event");
        function oe() {
          dp.removeEventListener(le, ht, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = Z);
        }
        var Pe = Array.prototype.slice.call(arguments, 3);
        function ht() {
          V = !0, oe(), a.apply(o, Pe), F = !1;
        }
        var ut, Bt = !1, Ft = !1;
        function Q(K) {
          if (ut = K.error, Bt = !0, ut === null && K.colno === 0 && K.lineno === 0 && (Ft = !0), K.defaultPrevented && ut != null && typeof ut == "object")
            try {
              ut._suppressLogging = !0;
            } catch {
            }
        }
        var le = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", Q), dp.addEventListener(le, ht, !1), k.initEvent(le, !1, !1), dp.dispatchEvent(k), te && Object.defineProperty(window, "event", te), V && F && (Bt ? Ft && (ut = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : ut = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(ut)), window.removeEventListener("error", Q), !V)
          return oe(), am.apply(this, arguments);
      };
    }
    var z0 = fp, xo = !1, pi = null, As = !1, wo = null, Ti = {
      onError: function(e) {
        xo = !0, pi = e;
      }
    };
    function yl(e, t, a, o, u, d, m, b, C) {
      xo = !1, pi = null, z0.apply(Ti, arguments);
    }
    function qi(e, t, a, o, u, d, m, b, C) {
      if (yl.apply(this, arguments), xo) {
        var x = vp();
        As || (As = !0, wo = x);
      }
    }
    function pp() {
      if (As) {
        var e = wo;
        throw As = !1, wo = null, e;
      }
    }
    function U0() {
      return xo;
    }
    function vp() {
      if (xo) {
        var e = pi;
        return xo = !1, pi = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Fa(e) {
      return e._reactInternals;
    }
    function Ns(e) {
      return e._reactInternals !== void 0;
    }
    function fu(e, t) {
      e._reactInternals = t;
    }
    var dt = (
      /*                      */
      0
    ), Ro = (
      /*                */
      1
    ), bn = (
      /*                    */
      2
    ), Mt = (
      /*                       */
      4
    ), Qt = (
      /*                */
      16
    ), Xt = (
      /*                 */
      32
    ), xi = (
      /*                     */
      64
    ), wt = (
      /*                   */
      128
    ), zn = (
      /*            */
      256
    ), ea = (
      /*                          */
      512
    ), $a = (
      /*                     */
      1024
    ), _n = (
      /*                      */
      2048
    ), Va = (
      /*                    */
      4096
    ), _o = (
      /*                   */
      8192
    ), Ls = (
      /*             */
      16384
    ), Gc = _n | Mt | xi | ea | $a | Ls, im = (
      /*               */
      32767
    ), Ca = (
      /*                   */
      32768
    ), pr = (
      /*                */
      65536
    ), zs = (
      /* */
      131072
    ), hp = (
      /*                       */
      1048576
    ), mp = (
      /*                    */
      2097152
    ), ta = (
      /*                 */
      4194304
    ), ko = (
      /*                */
      8388608
    ), na = (
      /*               */
      16777216
    ), gl = (
      /*              */
      33554432
    ), du = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Mt | $a | 0
    ), ra = bn | Mt | Qt | Xt | ea | Va | _o, Lr = Mt | xi | ea | _o, Ba = _n | Qt, br = ta | ko | mp, Qi = c.ReactCurrentOwner;
    function Ea(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var o = t;
        do
          t = o, (t.flags & (bn | Va)) !== dt && (a = t.return), o = t.return;
        while (o);
      }
      return t.tag === O ? a : null;
    }
    function yp(e) {
      if (e.tag === U) {
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
    function qc(e) {
      return e.tag === O ? e.stateNode.containerInfo : null;
    }
    function gp(e) {
      return Ea(e) === e;
    }
    function Ta(e) {
      {
        var t = Qi.current;
        if (t !== null && t.tag === _) {
          var a = t, o = a.stateNode;
          o._warnedAboutRefsInRender || h("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ot(a) || "A component"), o._warnedAboutRefsInRender = !0;
        }
      }
      var u = Fa(e);
      return u ? Ea(u) === u : !1;
    }
    function aa(e) {
      if (Ea(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Cn(e) {
      var t = e.alternate;
      if (!t) {
        var a = Ea(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var o = e, u = t; ; ) {
        var d = o.return;
        if (d === null)
          break;
        var m = d.alternate;
        if (m === null) {
          var b = d.return;
          if (b !== null) {
            o = u = b;
            continue;
          }
          break;
        }
        if (d.child === m.child) {
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
          o = d, u = m;
        else {
          for (var x = !1, k = d.child; k; ) {
            if (k === o) {
              x = !0, o = d, u = m;
              break;
            }
            if (k === u) {
              x = !0, u = d, o = m;
              break;
            }
            k = k.sibling;
          }
          if (!x) {
            for (k = m.child; k; ) {
              if (k === o) {
                x = !0, o = m, u = d;
                break;
              }
              if (k === u) {
                x = !0, u = m, o = d;
                break;
              }
              k = k.sibling;
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
    function Ha(e) {
      var t = Cn(e);
      return t !== null ? Sp(t) : null;
    }
    function Sp(e) {
      if (e.tag === H || e.tag === Y)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Sp(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function om(e) {
      var t = Cn(e);
      return t !== null ? Qc(t) : null;
    }
    function Qc(e) {
      if (e.tag === H || e.tag === Y)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== L) {
          var a = Qc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var Kc = s.unstable_scheduleCallback, lm = s.unstable_cancelCallback, Xc = s.unstable_shouldYield, um = s.unstable_requestPaint, Mn = s.unstable_now, bp = s.unstable_getCurrentPriorityLevel, Zc = s.unstable_ImmediatePriority, Sl = s.unstable_UserBlockingPriority, wi = s.unstable_NormalPriority, sm = s.unstable_LowPriority, Jc = s.unstable_IdlePriority, pu = s.unstable_yieldValue, cm = s.unstable_setDisableYieldValue, Ki = null, er = null, Ue = null, Ia = !1, xa = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Cp(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return h("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        yt && (e = zt({}, e, {
          getLaneLabelMap: Xi,
          injectProfilingHooks: fm
        })), Ki = t.inject(e), er = t;
      } catch (a) {
        h("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Ep(e, t) {
      if (er && typeof er.onScheduleFiberRoot == "function")
        try {
          er.onScheduleFiberRoot(Ki, e, t);
        } catch (a) {
          Ia || (Ia = !0, h("React instrumentation encountered an error: %s", a));
        }
    }
    function vu(e, t) {
      if (er && typeof er.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & wt) === wt;
          if (We) {
            var o;
            switch (t) {
              case Bn:
                o = Zc;
                break;
              case Ji:
                o = Sl;
                break;
              case Ri:
                o = wi;
                break;
              case Ru:
                o = Jc;
                break;
              default:
                o = wi;
                break;
            }
            er.onCommitFiberRoot(Ki, e, o, a);
          }
        } catch (u) {
          Ia || (Ia = !0, h("React instrumentation encountered an error: %s", u));
        }
    }
    function Ya(e) {
      if (er && typeof er.onPostCommitFiberRoot == "function")
        try {
          er.onPostCommitFiberRoot(Ki, e);
        } catch (t) {
          Ia || (Ia = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function bl(e) {
      if (er && typeof er.onCommitFiberUnmount == "function")
        try {
          er.onCommitFiberUnmount(Ki, e);
        } catch (t) {
          Ia || (Ia = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function Gn(e) {
      if (typeof pu == "function" && (cm(e), y(e)), er && typeof er.setStrictMode == "function")
        try {
          er.setStrictMode(Ki, e);
        } catch (t) {
          Ia || (Ia = !0, h("React instrumentation encountered an error: %s", t));
        }
    }
    function fm(e) {
      Ue = e;
    }
    function Xi() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < $s; a++) {
          var o = P0(t);
          e.set(t, o), t *= 2;
        }
        return e;
      }
    }
    function Oo(e) {
      Ue !== null && typeof Ue.markCommitStarted == "function" && Ue.markCommitStarted(e);
    }
    function ef() {
      Ue !== null && typeof Ue.markCommitStopped == "function" && Ue.markCommitStopped();
    }
    function hu(e) {
      Ue !== null && typeof Ue.markComponentRenderStarted == "function" && Ue.markComponentRenderStarted(e);
    }
    function ia() {
      Ue !== null && typeof Ue.markComponentRenderStopped == "function" && Ue.markComponentRenderStopped();
    }
    function Do(e) {
      Ue !== null && typeof Ue.markComponentPassiveEffectMountStarted == "function" && Ue.markComponentPassiveEffectMountStarted(e);
    }
    function tf() {
      Ue !== null && typeof Ue.markComponentPassiveEffectMountStopped == "function" && Ue.markComponentPassiveEffectMountStopped();
    }
    function dm(e) {
      Ue !== null && typeof Ue.markComponentPassiveEffectUnmountStarted == "function" && Ue.markComponentPassiveEffectUnmountStarted(e);
    }
    function nf() {
      Ue !== null && typeof Ue.markComponentPassiveEffectUnmountStopped == "function" && Ue.markComponentPassiveEffectUnmountStopped();
    }
    function pm(e) {
      Ue !== null && typeof Ue.markComponentLayoutEffectMountStarted == "function" && Ue.markComponentLayoutEffectMountStarted(e);
    }
    function Us() {
      Ue !== null && typeof Ue.markComponentLayoutEffectMountStopped == "function" && Ue.markComponentLayoutEffectMountStopped();
    }
    function vi(e) {
      Ue !== null && typeof Ue.markComponentLayoutEffectUnmountStarted == "function" && Ue.markComponentLayoutEffectUnmountStarted(e);
    }
    function mu() {
      Ue !== null && typeof Ue.markComponentLayoutEffectUnmountStopped == "function" && Ue.markComponentLayoutEffectUnmountStopped();
    }
    function js(e, t, a) {
      Ue !== null && typeof Ue.markComponentErrored == "function" && Ue.markComponentErrored(e, t, a);
    }
    function Cl(e, t, a) {
      Ue !== null && typeof Ue.markComponentSuspended == "function" && Ue.markComponentSuspended(e, t, a);
    }
    function Tp(e) {
      Ue !== null && typeof Ue.markLayoutEffectsStarted == "function" && Ue.markLayoutEffectsStarted(e);
    }
    function yu() {
      Ue !== null && typeof Ue.markLayoutEffectsStopped == "function" && Ue.markLayoutEffectsStopped();
    }
    function vm(e) {
      Ue !== null && typeof Ue.markPassiveEffectsStarted == "function" && Ue.markPassiveEffectsStarted(e);
    }
    function xp() {
      Ue !== null && typeof Ue.markPassiveEffectsStopped == "function" && Ue.markPassiveEffectsStopped();
    }
    function kn(e) {
      Ue !== null && typeof Ue.markRenderStarted == "function" && Ue.markRenderStarted(e);
    }
    function rf() {
      Ue !== null && typeof Ue.markRenderYielded == "function" && Ue.markRenderYielded();
    }
    function af() {
      Ue !== null && typeof Ue.markRenderStopped == "function" && Ue.markRenderStopped();
    }
    function wp(e) {
      Ue !== null && typeof Ue.markRenderScheduled == "function" && Ue.markRenderScheduled(e);
    }
    function of(e, t) {
      Ue !== null && typeof Ue.markForceUpdateScheduled == "function" && Ue.markForceUpdateScheduled(e, t);
    }
    function Ps(e, t) {
      Ue !== null && typeof Ue.markStateUpdateScheduled == "function" && Ue.markStateUpdateScheduled(e, t);
    }
    var rt = (
      /*                         */
      0
    ), lt = (
      /*                 */
      1
    ), Rt = (
      /*                    */
      2
    ), Ut = (
      /*               */
      8
    ), wa = (
      /*              */
      16
    ), gu = Math.clz32 ? Math.clz32 : zr, Fs = Math.log, j0 = Math.LN2;
    function zr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Fs(t) / j0 | 0) | 0;
    }
    var $s = 31, me = (
      /*                        */
      0
    ), qn = (
      /*                          */
      0
    ), ft = (
      /*                        */
      1
    ), Cr = (
      /*    */
      2
    ), Ra = (
      /*             */
      4
    ), Zi = (
      /*            */
      8
    ), Wa = (
      /*                     */
      16
    ), Su = (
      /*                */
      32
    ), El = (
      /*                       */
      4194240
    ), bu = (
      /*                        */
      64
    ), lf = (
      /*                        */
      128
    ), uf = (
      /*                        */
      256
    ), sf = (
      /*                        */
      512
    ), cf = (
      /*                        */
      1024
    ), ff = (
      /*                        */
      2048
    ), Tl = (
      /*                        */
      4096
    ), df = (
      /*                        */
      8192
    ), Cu = (
      /*                        */
      16384
    ), Eu = (
      /*                       */
      32768
    ), pf = (
      /*                       */
      65536
    ), Vs = (
      /*                       */
      131072
    ), vf = (
      /*                       */
      262144
    ), hf = (
      /*                       */
      524288
    ), mf = (
      /*                       */
      1048576
    ), yf = (
      /*                       */
      2097152
    ), Tu = (
      /*                            */
      130023424
    ), xl = (
      /*                             */
      4194304
    ), gf = (
      /*                             */
      8388608
    ), Sf = (
      /*                             */
      16777216
    ), Rp = (
      /*                             */
      33554432
    ), bf = (
      /*                             */
      67108864
    ), hm = xl, Bs = (
      /*          */
      134217728
    ), _p = (
      /*                          */
      268435455
    ), xu = (
      /*               */
      268435456
    ), Mo = (
      /*                        */
      536870912
    ), Ur = (
      /*                   */
      1073741824
    );
    function P0(e) {
      {
        if (e & ft)
          return "Sync";
        if (e & Cr)
          return "InputContinuousHydration";
        if (e & Ra)
          return "InputContinuous";
        if (e & Zi)
          return "DefaultHydration";
        if (e & Wa)
          return "Default";
        if (e & Su)
          return "TransitionHydration";
        if (e & El)
          return "Transition";
        if (e & Tu)
          return "Retry";
        if (e & Bs)
          return "SelectiveHydration";
        if (e & xu)
          return "IdleHydration";
        if (e & Mo)
          return "Idle";
        if (e & Ur)
          return "Offscreen";
      }
    }
    var gn = -1, Cf = bu, oa = xl;
    function wl(e) {
      switch (Vn(e)) {
        case ft:
          return ft;
        case Cr:
          return Cr;
        case Ra:
          return Ra;
        case Zi:
          return Zi;
        case Wa:
          return Wa;
        case Su:
          return Su;
        case bu:
        case lf:
        case uf:
        case sf:
        case cf:
        case ff:
        case Tl:
        case df:
        case Cu:
        case Eu:
        case pf:
        case Vs:
        case vf:
        case hf:
        case mf:
        case yf:
          return e & El;
        case xl:
        case gf:
        case Sf:
        case Rp:
        case bf:
          return e & Tu;
        case Bs:
          return Bs;
        case xu:
          return xu;
        case Mo:
          return Mo;
        case Ur:
          return Ur;
        default:
          return h("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Rl(e, t) {
      var a = e.pendingLanes;
      if (a === me)
        return me;
      var o = me, u = e.suspendedLanes, d = e.pingedLanes, m = a & _p;
      if (m !== me) {
        var b = m & ~u;
        if (b !== me)
          o = wl(b);
        else {
          var C = m & d;
          C !== me && (o = wl(C));
        }
      } else {
        var x = a & ~u;
        x !== me ? o = wl(x) : d !== me && (o = wl(d));
      }
      if (o === me)
        return me;
      if (t !== me && t !== o && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === me) {
        var k = Vn(o), V = Vn(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          k >= V || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          k === Wa && (V & El) !== me
        )
          return t;
      }
      (o & Ra) !== me && (o |= a & Wa);
      var F = e.entangledLanes;
      if (F !== me)
        for (var Z = e.entanglements, te = o & F; te > 0; ) {
          var oe = No(te), Pe = 1 << oe;
          o |= Z[oe], te &= ~Pe;
        }
      return o;
    }
    function mm(e, t) {
      for (var a = e.eventTimes, o = gn; t > 0; ) {
        var u = No(t), d = 1 << u, m = a[u];
        m > o && (o = m), t &= ~d;
      }
      return o;
    }
    function ym(e, t) {
      switch (e) {
        case ft:
        case Cr:
        case Ra:
          return t + 250;
        case Zi:
        case Wa:
        case Su:
        case bu:
        case lf:
        case uf:
        case sf:
        case cf:
        case ff:
        case Tl:
        case df:
        case Cu:
        case Eu:
        case pf:
        case Vs:
        case vf:
        case hf:
        case mf:
        case yf:
          return t + 5e3;
        case xl:
        case gf:
        case Sf:
        case Rp:
        case bf:
          return gn;
        case Bs:
        case xu:
        case Mo:
        case Ur:
          return gn;
        default:
          return h("Should have found matching lanes. This is a bug in React."), gn;
      }
    }
    function gm(e, t) {
      for (var a = e.pendingLanes, o = e.suspendedLanes, u = e.pingedLanes, d = e.expirationTimes, m = a; m > 0; ) {
        var b = No(m), C = 1 << b, x = d[b];
        x === gn ? ((C & o) === me || (C & u) !== me) && (d[b] = ym(C, t)) : x <= t && (e.expiredLanes |= C), m &= ~C;
      }
    }
    function kp(e) {
      return wl(e.pendingLanes);
    }
    function Ao(e) {
      var t = e.pendingLanes & ~Ur;
      return t !== me ? t : t & Ur ? Ur : me;
    }
    function Op(e) {
      return (e & ft) !== me;
    }
    function Hs(e) {
      return (e & _p) !== me;
    }
    function Sm(e) {
      return (e & Tu) === e;
    }
    function bm(e) {
      var t = ft | Ra | Wa;
      return (e & t) === me;
    }
    function Cm(e) {
      return (e & El) === e;
    }
    function Is(e, t) {
      var a = Cr | Ra | Zi | Wa;
      return (t & a) !== me;
    }
    function Em(e, t) {
      return (t & e.expiredLanes) !== me;
    }
    function Dp(e) {
      return (e & El) !== me;
    }
    function Tm() {
      var e = Cf;
      return Cf <<= 1, (Cf & El) === me && (Cf = bu), e;
    }
    function la() {
      var e = oa;
      return oa <<= 1, (oa & Tu) === me && (oa = xl), e;
    }
    function Vn(e) {
      return e & -e;
    }
    function wu(e) {
      return Vn(e);
    }
    function No(e) {
      return 31 - gu(e);
    }
    function Ef(e) {
      return No(e);
    }
    function ua(e, t) {
      return (e & t) !== me;
    }
    function _l(e, t) {
      return (e & t) === t;
    }
    function Dt(e, t) {
      return e | t;
    }
    function Ys(e, t) {
      return e & ~t;
    }
    function Tf(e, t) {
      return e & t;
    }
    function F0(e) {
      return e;
    }
    function xm(e, t) {
      return e !== qn && e < t ? e : t;
    }
    function Ws(e) {
      for (var t = [], a = 0; a < $s; a++)
        t.push(e);
      return t;
    }
    function kl(e, t, a) {
      e.pendingLanes |= t, t !== Mo && (e.suspendedLanes = me, e.pingedLanes = me);
      var o = e.eventTimes, u = Ef(t);
      o[u] = a;
    }
    function wm(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, o = t; o > 0; ) {
        var u = No(o), d = 1 << u;
        a[u] = gn, o &= ~d;
      }
    }
    function xf(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function wf(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = me, e.pingedLanes = me, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var o = e.entanglements, u = e.eventTimes, d = e.expirationTimes, m = a; m > 0; ) {
        var b = No(m), C = 1 << b;
        o[b] = me, u[b] = gn, d[b] = gn, m &= ~C;
      }
    }
    function Mp(e, t) {
      for (var a = e.entangledLanes |= t, o = e.entanglements, u = a; u; ) {
        var d = No(u), m = 1 << d;
        // Is this one of the newly entangled lanes?
        m & t | // Is this lane transitively entangled with the newly entangled lanes?
        o[d] & t && (o[d] |= t), u &= ~m;
      }
    }
    function Rm(e, t) {
      var a = Vn(t), o;
      switch (a) {
        case Ra:
          o = Cr;
          break;
        case Wa:
          o = Zi;
          break;
        case bu:
        case lf:
        case uf:
        case sf:
        case cf:
        case ff:
        case Tl:
        case df:
        case Cu:
        case Eu:
        case pf:
        case Vs:
        case vf:
        case hf:
        case mf:
        case yf:
        case xl:
        case gf:
        case Sf:
        case Rp:
        case bf:
          o = Su;
          break;
        case Mo:
          o = xu;
          break;
        default:
          o = qn;
          break;
      }
      return (o & (e.suspendedLanes | t)) !== qn ? qn : o;
    }
    function Rf(e, t, a) {
      if (xa)
        for (var o = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = Ef(a), d = 1 << u, m = o[u];
          m.add(t), a &= ~d;
        }
    }
    function Ap(e, t) {
      if (xa)
        for (var a = e.pendingUpdatersLaneMap, o = e.memoizedUpdaters; t > 0; ) {
          var u = Ef(t), d = 1 << u, m = a[u];
          m.size > 0 && (m.forEach(function(b) {
            var C = b.alternate;
            (C === null || !o.has(C)) && o.add(b);
          }), m.clear()), t &= ~d;
        }
    }
    function Gs(e, t) {
      return null;
    }
    var Bn = ft, Ji = Ra, Ri = Wa, Ru = Mo, _u = qn;
    function Ga() {
      return _u;
    }
    function Un(e) {
      _u = e;
    }
    function jr(e, t) {
      var a = _u;
      try {
        return _u = e, t();
      } finally {
        _u = a;
      }
    }
    function $0(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function V0(e, t) {
      return e > t ? e : t;
    }
    function ku(e, t) {
      return e !== 0 && e < t;
    }
    function Er(e) {
      var t = Vn(e);
      return ku(Bn, t) ? ku(Ji, t) ? Hs(t) ? Ri : Ru : Ji : Bn;
    }
    function _f(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var Ge;
    function Ou(e) {
      Ge = e;
    }
    function Np(e) {
      Ge(e);
    }
    var kf;
    function B0(e) {
      kf = e;
    }
    var Du;
    function Of(e) {
      Du = e;
    }
    var Df;
    function _m(e) {
      Df = e;
    }
    var Lp;
    function km(e) {
      Lp = e;
    }
    var qs = !1, Mu = [], On = null, vr = null, Fr = null, Au = /* @__PURE__ */ new Map(), Nu = /* @__PURE__ */ new Map(), hr = [], Om = [
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
      return Om.indexOf(e) > -1;
    }
    function H0(e, t, a, o, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [o]
      };
    }
    function zp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          On = null;
          break;
        case "dragenter":
        case "dragleave":
          vr = null;
          break;
        case "mouseover":
        case "mouseout":
          Fr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Au.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var o = t.pointerId;
          Nu.delete(o);
          break;
        }
      }
    }
    function Lu(e, t, a, o, u, d) {
      if (e === null || e.nativeEvent !== d) {
        var m = H0(t, a, o, u, d);
        if (t !== null) {
          var b = Hu(t);
          b !== null && kf(b);
        }
        return m;
      }
      e.eventSystemFlags |= o;
      var C = e.targetContainers;
      return u !== null && C.indexOf(u) === -1 && C.push(u), e;
    }
    function Dm(e, t, a, o, u) {
      switch (t) {
        case "focusin": {
          var d = u;
          return On = Lu(On, e, t, a, o, d), !0;
        }
        case "dragenter": {
          var m = u;
          return vr = Lu(vr, e, t, a, o, m), !0;
        }
        case "mouseover": {
          var b = u;
          return Fr = Lu(Fr, e, t, a, o, b), !0;
        }
        case "pointerover": {
          var C = u, x = C.pointerId;
          return Au.set(x, Lu(Au.get(x) || null, e, t, a, o, C)), !0;
        }
        case "gotpointercapture": {
          var k = u, V = k.pointerId;
          return Nu.set(V, Lu(Nu.get(V) || null, e, t, a, o, k)), !0;
        }
      }
      return !1;
    }
    function Up(e) {
      var t = oc(e.target);
      if (t !== null) {
        var a = Ea(t);
        if (a !== null) {
          var o = a.tag;
          if (o === U) {
            var u = yp(a);
            if (u !== null) {
              e.blockedOn = u, Lp(e.priority, function() {
                Du(a);
              });
              return;
            }
          } else if (o === O) {
            var d = a.stateNode;
            if (_f(d)) {
              e.blockedOn = qc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function I0(e) {
      for (var t = Df(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, o = 0; o < hr.length && ku(t, hr[o].priority); o++)
        ;
      hr.splice(o, 0, a), o === 0 && Up(a);
    }
    function Ol(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], o = Pr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (o === null) {
          var u = e.nativeEvent, d = new u.constructor(u.type, u);
          ks(d), u.target.dispatchEvent(d), N0();
        } else {
          var m = Hu(o);
          return m !== null && kf(m), e.blockedOn = o, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Mf(e, t, a) {
      Ol(e) && a.delete(t);
    }
    function qa() {
      qs = !1, On !== null && Ol(On) && (On = null), vr !== null && Ol(vr) && (vr = null), Fr !== null && Ol(Fr) && (Fr = null), Au.forEach(Mf), Nu.forEach(Mf);
    }
    function Pt(e, t) {
      e.blockedOn === t && (e.blockedOn = null, qs || (qs = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, qa)));
    }
    function jn(e) {
      if (Mu.length > 0) {
        Pt(Mu[0], e);
        for (var t = 1; t < Mu.length; t++) {
          var a = Mu[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      On !== null && Pt(On, e), vr !== null && Pt(vr, e), Fr !== null && Pt(Fr, e);
      var o = function(b) {
        return Pt(b, e);
      };
      Au.forEach(o), Nu.forEach(o);
      for (var u = 0; u < hr.length; u++) {
        var d = hr[u];
        d.blockedOn === e && (d.blockedOn = null);
      }
      for (; hr.length > 0; ) {
        var m = hr[0];
        if (m.blockedOn !== null)
          break;
        Up(m), m.blockedOn === null && hr.shift();
      }
    }
    var En = c.ReactCurrentBatchConfig, tr = !0;
    function sa(e) {
      tr = !!e;
    }
    function zu() {
      return tr;
    }
    function nr(e, t, a) {
      var o = Af(t), u;
      switch (o) {
        case Bn:
          u = Qs;
          break;
        case Ji:
          u = Dl;
          break;
        case Ri:
        default:
          u = Uu;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Qs(e, t, a, o) {
      var u = Ga(), d = En.transition;
      En.transition = null;
      try {
        Un(Bn), Uu(e, t, a, o);
      } finally {
        Un(u), En.transition = d;
      }
    }
    function Dl(e, t, a, o) {
      var u = Ga(), d = En.transition;
      En.transition = null;
      try {
        Un(Ji), Uu(e, t, a, o);
      } finally {
        Un(u), En.transition = d;
      }
    }
    function Uu(e, t, a, o) {
      tr && jp(e, t, a, o);
    }
    function jp(e, t, a, o) {
      var u = Pr(e, t, a, o);
      if (u === null) {
        lS(e, t, o, Lo, a), zp(e, o);
        return;
      }
      if (Dm(u, e, t, a, o)) {
        o.stopPropagation();
        return;
      }
      if (zp(e, o), t & pl && _i(e)) {
        for (; u !== null; ) {
          var d = Hu(u);
          d !== null && Np(d);
          var m = Pr(e, t, a, o);
          if (m === null && lS(e, t, o, Lo, a), m === u)
            break;
          u = m;
        }
        u !== null && o.stopPropagation();
        return;
      }
      lS(e, t, o, null, a);
    }
    var Lo = null;
    function Pr(e, t, a, o) {
      Lo = null;
      var u = Hc(o), d = oc(u);
      if (d !== null) {
        var m = Ea(d);
        if (m === null)
          d = null;
        else {
          var b = m.tag;
          if (b === U) {
            var C = yp(m);
            if (C !== null)
              return C;
            d = null;
          } else if (b === O) {
            var x = m.stateNode;
            if (_f(x))
              return qc(m);
            d = null;
          } else m !== d && (d = null);
        }
      }
      return Lo = d, null;
    }
    function Af(e) {
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
          var t = bp();
          switch (t) {
            case Zc:
              return Bn;
            case Sl:
              return Ji;
            case wi:
            case sm:
              return Ri;
            case Jc:
              return Ru;
            default:
              return Ri;
          }
        }
        default:
          return Ri;
      }
    }
    function ju(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function eo(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Nf(e, t, a, o) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: o
      }), a;
    }
    function Pp(e, t, a, o) {
      return e.addEventListener(t, a, {
        passive: o
      }), a;
    }
    var Qa = null, Pu = null, Ka = null;
    function Lf(e) {
      return Qa = e, Pu = Xs(), !0;
    }
    function Ks() {
      Qa = null, Pu = null, Ka = null;
    }
    function zf() {
      if (Ka)
        return Ka;
      var e, t = Pu, a = t.length, o, u = Xs(), d = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var m = a - e;
      for (o = 1; o <= m && t[a - o] === u[d - o]; o++)
        ;
      var b = o > 1 ? 1 - o : void 0;
      return Ka = u.slice(e, b), Ka;
    }
    function Xs() {
      return "value" in Qa ? Qa.value : Qa.textContent;
    }
    function Ml(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function mr() {
      return !0;
    }
    function to() {
      return !1;
    }
    function An(e) {
      function t(a, o, u, d, m) {
        this._reactName = a, this._targetInst = u, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
        for (var b in e)
          if (e.hasOwnProperty(b)) {
            var C = e[b];
            C ? this[b] = C(d) : this[b] = d[b];
          }
        var x = d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1;
        return x ? this.isDefaultPrevented = mr : this.isDefaultPrevented = to, this.isPropagationStopped = to, this;
      }
      return zt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = mr);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = mr);
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
        isPersistent: mr
      }), t;
    }
    var rr = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Uf = An(rr), Al = zt({}, rr, {
      view: 0,
      detail: 0
    }), Fp = An(Al), $p, ki, Fu;
    function Vp(e) {
      e !== Fu && (Fu && e.type === "mousemove" ? ($p = e.screenX - Fu.screenX, ki = e.screenY - Fu.screenY) : ($p = 0, ki = 0), Fu = e);
    }
    var Oi = zt({}, Al, {
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
      getModifierState: Bp,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Vp(e), $p);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : ki;
      }
    }), jf = An(Oi), Nl = zt({}, Oi, {
      dataTransfer: 0
    }), Mm = An(Nl), Am = zt({}, Al, {
      relatedTarget: 0
    }), Zs = An(Am), Pf = zt({}, rr, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Y0 = An(Pf), W0 = zt({}, rr, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Nm = An(W0), Lm = zt({}, rr, {
      data: 0
    }), zo = An(Lm), G0 = zo, $u = {
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
    }, zm = {
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
    function Pn(e) {
      if (e.key) {
        var t = $u[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Ml(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? zm[e.keyCode] || "Unidentified" : "";
    }
    var q0 = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Um(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var o = q0[e];
      return o ? !!a[o] : !1;
    }
    function Bp(e) {
      return Um;
    }
    var Q0 = zt({}, Al, {
      key: Pn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Bp,
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
    }), jm = An(Q0), Pm = zt({}, Oi, {
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
    }), Fm = An(Pm), Xa = zt({}, Al, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Bp
    }), Hp = An(Xa), K0 = zt({}, rr, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Uo = An(K0), Ff = zt({}, Oi, {
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
    }), Ll = An(Ff), $f = [9, 13, 27, 32], Vf = 229, Js = xt && "CompositionEvent" in window, ec = null;
    xt && "documentMode" in document && (ec = document.documentMode);
    var Ip = xt && "TextEvent" in window && !ec, $m = xt && (!Js || ec && ec > 8 && ec <= 11), Yp = 32, Wp = String.fromCharCode(Yp);
    function Bf() {
      Nt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Nt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Nt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Nt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var tc = !1;
    function Vm(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Gp(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function X0(e, t) {
      return e === "keydown" && t.keyCode === Vf;
    }
    function qp(e, t) {
      switch (e) {
        case "keyup":
          return $f.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Vf;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Hf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function nc(e) {
      return e.locale === "ko";
    }
    var jo = !1;
    function If(e, t, a, o, u) {
      var d, m;
      if (Js ? d = Gp(t) : jo ? qp(t, o) && (d = "onCompositionEnd") : X0(t, o) && (d = "onCompositionStart"), !d)
        return null;
      $m && !nc(o) && (!jo && d === "onCompositionStart" ? jo = Lf(u) : d === "onCompositionEnd" && jo && (m = zf()));
      var b = Gm(a, d);
      if (b.length > 0) {
        var C = new zo(d, t, null, o, u);
        if (e.push({
          event: C,
          listeners: b
        }), m)
          C.data = m;
        else {
          var x = Hf(o);
          x !== null && (C.data = x);
        }
      }
    }
    function Bm(e, t) {
      switch (e) {
        case "compositionend":
          return Hf(t);
        case "keypress":
          var a = t.which;
          return a !== Yp ? null : (tc = !0, Wp);
        case "textInput":
          var o = t.data;
          return o === Wp && tc ? null : o;
        default:
          return null;
      }
    }
    function Z0(e, t) {
      if (jo) {
        if (e === "compositionend" || !Js && qp(e, t)) {
          var a = zf();
          return Ks(), jo = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Vm(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return $m && !nc(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Yf(e, t, a, o, u) {
      var d;
      if (Ip ? d = Bm(t, o) : d = Z0(t, o), !d)
        return null;
      var m = Gm(a, "onBeforeInput");
      if (m.length > 0) {
        var b = new G0("onBeforeInput", "beforeinput", null, o, u);
        e.push({
          event: b,
          listeners: m
        }), b.data = d;
      }
    }
    function J0(e, t, a, o, u, d, m) {
      If(e, t, a, o, u), Yf(e, t, a, o, u);
    }
    var rc = {
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
    function Hm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!rc[e.type] : t === "textarea";
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
    function Wf(e) {
      if (!xt)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var o = document.createElement("div");
        o.setAttribute(t, "return;"), a = typeof o[t] == "function";
      }
      return a;
    }
    function n() {
      Nt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, o) {
      Ic(o);
      var u = Gm(t, "onChange");
      if (u.length > 0) {
        var d = new Uf("onChange", "change", null, a, o);
        e.push({
          event: d,
          listeners: u
        });
      }
    }
    var l = null, f = null;
    function v(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function S(e) {
      var t = [];
      r(t, f, e, Hc(e)), sp(E, t);
    }
    function E(e) {
      m1(e, 0);
    }
    function M(e) {
      var t = Zf(e);
      if (wh(t))
        return e;
    }
    function j(e, t) {
      if (e === "change")
        return t;
    }
    var ee = !1;
    xt && (ee = Wf("input") && (!document.documentMode || document.documentMode > 9));
    function Se(e, t) {
      l = e, f = t, l.attachEvent("onpropertychange", ye);
    }
    function Ce() {
      l && (l.detachEvent("onpropertychange", ye), l = null, f = null);
    }
    function ye(e) {
      e.propertyName === "value" && M(f) && S(e);
    }
    function He(e, t, a) {
      e === "focusin" ? (Ce(), Se(t, a)) : e === "focusout" && Ce();
    }
    function qe(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return M(f);
    }
    function Je(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Hn(e, t) {
      if (e === "click")
        return M(t);
    }
    function q(e, t) {
      if (e === "input" || e === "change")
        return M(t);
    }
    function $(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Co(e, "number", e.value);
    }
    function X(e, t, a, o, u, d, m) {
      var b = a ? Zf(a) : window, C, x;
      if (v(b) ? C = j : Hm(b) ? ee ? C = q : (C = qe, x = He) : Je(b) && (C = Hn), C) {
        var k = C(t, a);
        if (k) {
          r(e, k, o, u);
          return;
        }
      }
      x && x(t, b, a), t === "focusout" && $(b);
    }
    function we() {
      xe("onMouseEnter", ["mouseout", "mouseover"]), xe("onMouseLeave", ["mouseout", "mouseover"]), xe("onPointerEnter", ["pointerout", "pointerover"]), xe("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function at(e, t, a, o, u, d, m) {
      var b = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout";
      if (b && !nm(o)) {
        var x = o.relatedTarget || o.fromElement;
        if (x && (oc(x) || uv(x)))
          return;
      }
      if (!(!C && !b)) {
        var k;
        if (u.window === u)
          k = u;
        else {
          var V = u.ownerDocument;
          V ? k = V.defaultView || V.parentWindow : k = window;
        }
        var F, Z;
        if (C) {
          var te = o.relatedTarget || o.toElement;
          if (F = a, Z = te ? oc(te) : null, Z !== null) {
            var oe = Ea(Z);
            (Z !== oe || Z.tag !== H && Z.tag !== Y) && (Z = null);
          }
        } else
          F = null, Z = a;
        if (F !== Z) {
          var Pe = jf, ht = "onMouseLeave", ut = "onMouseEnter", Bt = "mouse";
          (t === "pointerout" || t === "pointerover") && (Pe = Fm, ht = "onPointerLeave", ut = "onPointerEnter", Bt = "pointer");
          var Ft = F == null ? k : Zf(F), Q = Z == null ? k : Zf(Z), le = new Pe(ht, Bt + "leave", F, o, u);
          le.target = Ft, le.relatedTarget = Q;
          var K = null, Ee = oc(u);
          if (Ee === a) {
            var Ye = new Pe(ut, Bt + "enter", Z, o, u);
            Ye.target = Q, Ye.relatedTarget = Ft, K = Ye;
          }
          kk(e, le, K, F, Z);
        }
      }
    }
    function mt(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Qe = typeof Object.is == "function" ? Object.is : mt;
    function St(e, t) {
      if (Qe(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), o = Object.keys(t);
      if (a.length !== o.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var d = a[u];
        if (!Le.call(t, d) || !Qe(e[d], t[d]))
          return !1;
      }
      return !0;
    }
    function ar(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function It(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function no(e, t) {
      for (var a = ar(e), o = 0, u = 0; a; ) {
        if (a.nodeType === Ii) {
          if (u = o + a.textContent.length, o <= t && u >= t)
            return {
              node: a,
              offset: t - o
            };
          o = u;
        }
        a = ar(It(a));
      }
    }
    function eS(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, o = a.getSelection && a.getSelection();
      if (!o || o.rangeCount === 0)
        return null;
      var u = o.anchorNode, d = o.anchorOffset, m = o.focusNode, b = o.focusOffset;
      try {
        u.nodeType, m.nodeType;
      } catch {
        return null;
      }
      return uk(e, u, d, m, b);
    }
    function uk(e, t, a, o, u) {
      var d = 0, m = -1, b = -1, C = 0, x = 0, k = e, V = null;
      e: for (; ; ) {
        for (var F = null; k === t && (a === 0 || k.nodeType === Ii) && (m = d + a), k === o && (u === 0 || k.nodeType === Ii) && (b = d + u), k.nodeType === Ii && (d += k.nodeValue.length), (F = k.firstChild) !== null; )
          V = k, k = F;
        for (; ; ) {
          if (k === e)
            break e;
          if (V === t && ++C === a && (m = d), V === o && ++x === u && (b = d), (F = k.nextSibling) !== null)
            break;
          k = V, V = k.parentNode;
        }
        k = F;
      }
      return m === -1 || b === -1 ? null : {
        start: m,
        end: b
      };
    }
    function sk(e, t) {
      var a = e.ownerDocument || document, o = a && a.defaultView || window;
      if (o.getSelection) {
        var u = o.getSelection(), d = e.textContent.length, m = Math.min(t.start, d), b = t.end === void 0 ? m : Math.min(t.end, d);
        if (!u.extend && m > b) {
          var C = b;
          b = m, m = C;
        }
        var x = no(e, m), k = no(e, b);
        if (x && k) {
          if (u.rangeCount === 1 && u.anchorNode === x.node && u.anchorOffset === x.offset && u.focusNode === k.node && u.focusOffset === k.offset)
            return;
          var V = a.createRange();
          V.setStart(x.node, x.offset), u.removeAllRanges(), m > b ? (u.addRange(V), u.extend(k.node, k.offset)) : (V.setEnd(k.node, k.offset), u.addRange(V));
        }
      }
    }
    function a1(e) {
      return e && e.nodeType === Ii;
    }
    function i1(e, t) {
      return !e || !t ? !1 : e === t ? !0 : a1(e) ? !1 : a1(t) ? i1(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function ck(e) {
      return e && e.ownerDocument && i1(e.ownerDocument.documentElement, e);
    }
    function fk(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function o1() {
      for (var e = window, t = Dc(); t instanceof e.HTMLIFrameElement; ) {
        if (fk(t))
          e = t.contentWindow;
        else
          return t;
        t = Dc(e.document);
      }
      return t;
    }
    function tS(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function dk() {
      var e = o1();
      return {
        focusedElem: e,
        selectionRange: tS(e) ? vk(e) : null
      };
    }
    function pk(e) {
      var t = o1(), a = e.focusedElem, o = e.selectionRange;
      if (t !== a && ck(a)) {
        o !== null && tS(a) && hk(a, o);
        for (var u = [], d = a; d = d.parentNode; )
          d.nodeType === Jr && u.push({
            element: d,
            left: d.scrollLeft,
            top: d.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var m = 0; m < u.length; m++) {
          var b = u[m];
          b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
        }
      }
    }
    function vk(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = eS(e), t || {
        start: 0,
        end: 0
      };
    }
    function hk(e, t) {
      var a = t.start, o = t.end;
      o === void 0 && (o = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(o, e.value.length)) : sk(e, t);
    }
    var mk = xt && "documentMode" in document && document.documentMode <= 11;
    function yk() {
      Nt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Gf = null, nS = null, Qp = null, rS = !1;
    function gk(e) {
      if ("selectionStart" in e && tS(e))
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
    function Sk(e) {
      return e.window === e ? e.document : e.nodeType === fi ? e : e.ownerDocument;
    }
    function l1(e, t, a) {
      var o = Sk(a);
      if (!(rS || Gf == null || Gf !== Dc(o))) {
        var u = gk(Gf);
        if (!Qp || !St(Qp, u)) {
          Qp = u;
          var d = Gm(nS, "onSelect");
          if (d.length > 0) {
            var m = new Uf("onSelect", "select", null, t, a);
            e.push({
              event: m,
              listeners: d
            }), m.target = Gf;
          }
        }
      }
    }
    function bk(e, t, a, o, u, d, m) {
      var b = a ? Zf(a) : window;
      switch (t) {
        case "focusin":
          (Hm(b) || b.contentEditable === "true") && (Gf = b, nS = a, Qp = null);
          break;
        case "focusout":
          Gf = null, nS = null, Qp = null;
          break;
        case "mousedown":
          rS = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          rS = !1, l1(e, o, u);
          break;
        case "selectionchange":
          if (mk)
            break;
        case "keydown":
        case "keyup":
          l1(e, o, u);
      }
    }
    function Im(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var qf = {
      animationend: Im("Animation", "AnimationEnd"),
      animationiteration: Im("Animation", "AnimationIteration"),
      animationstart: Im("Animation", "AnimationStart"),
      transitionend: Im("Transition", "TransitionEnd")
    }, aS = {}, u1 = {};
    xt && (u1 = document.createElement("div").style, "AnimationEvent" in window || (delete qf.animationend.animation, delete qf.animationiteration.animation, delete qf.animationstart.animation), "TransitionEvent" in window || delete qf.transitionend.transition);
    function Ym(e) {
      if (aS[e])
        return aS[e];
      if (!qf[e])
        return e;
      var t = qf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in u1)
          return aS[e] = t[a];
      return e;
    }
    var s1 = Ym("animationend"), c1 = Ym("animationiteration"), f1 = Ym("animationstart"), d1 = Ym("transitionend"), p1 = /* @__PURE__ */ new Map(), v1 = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Vu(e, t) {
      p1.set(e, t), Nt(t, [e]);
    }
    function Ck() {
      for (var e = 0; e < v1.length; e++) {
        var t = v1[e], a = t.toLowerCase(), o = t[0].toUpperCase() + t.slice(1);
        Vu(a, "on" + o);
      }
      Vu(s1, "onAnimationEnd"), Vu(c1, "onAnimationIteration"), Vu(f1, "onAnimationStart"), Vu("dblclick", "onDoubleClick"), Vu("focusin", "onFocus"), Vu("focusout", "onBlur"), Vu(d1, "onTransitionEnd");
    }
    function Ek(e, t, a, o, u, d, m) {
      var b = p1.get(t);
      if (b !== void 0) {
        var C = Uf, x = t;
        switch (t) {
          case "keypress":
            if (Ml(o) === 0)
              return;
          case "keydown":
          case "keyup":
            C = jm;
            break;
          case "focusin":
            x = "focus", C = Zs;
            break;
          case "focusout":
            x = "blur", C = Zs;
            break;
          case "beforeblur":
          case "afterblur":
            C = Zs;
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
            C = jf;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            C = Mm;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            C = Hp;
            break;
          case s1:
          case c1:
          case f1:
            C = Y0;
            break;
          case d1:
            C = Uo;
            break;
          case "scroll":
            C = Fp;
            break;
          case "wheel":
            C = Ll;
            break;
          case "copy":
          case "cut":
          case "paste":
            C = Nm;
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
        var k = (d & pl) !== 0;
        {
          var V = !k && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", F = Rk(a, b, o.type, k, V);
          if (F.length > 0) {
            var Z = new C(b, x, null, o, u);
            e.push({
              event: Z,
              listeners: F
            });
          }
        }
      }
    }
    Ck(), we(), n(), yk(), Bf();
    function Tk(e, t, a, o, u, d, m) {
      Ek(e, t, a, o, u, d);
      var b = (d & A0) === 0;
      b && (at(e, t, a, o, u), X(e, t, a, o, u), bk(e, t, a, o, u), J0(e, t, a, o, u));
    }
    var Kp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], iS = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Kp));
    function h1(e, t, a) {
      var o = e.type || "unknown-event";
      e.currentTarget = a, qi(o, t, void 0, e), e.currentTarget = null;
    }
    function xk(e, t, a) {
      var o;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var d = t[u], m = d.instance, b = d.currentTarget, C = d.listener;
          if (m !== o && e.isPropagationStopped())
            return;
          h1(e, C, b), o = m;
        }
      else
        for (var x = 0; x < t.length; x++) {
          var k = t[x], V = k.instance, F = k.currentTarget, Z = k.listener;
          if (V !== o && e.isPropagationStopped())
            return;
          h1(e, Z, F), o = V;
        }
    }
    function m1(e, t) {
      for (var a = (t & pl) !== 0, o = 0; o < e.length; o++) {
        var u = e[o], d = u.event, m = u.listeners;
        xk(d, m, a);
      }
      pp();
    }
    function wk(e, t, a, o, u) {
      var d = Hc(a), m = [];
      Tk(m, e, o, a, d, t), m1(m, t);
    }
    function Nn(e, t) {
      iS.has(e) || h('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, o = tD(t), u = Ok(e);
      o.has(u) || (y1(t, e, Rs, a), o.add(u));
    }
    function oS(e, t, a) {
      iS.has(e) && !t && h('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var o = 0;
      t && (o |= pl), y1(a, e, o, t);
    }
    var Wm = "_reactListening" + Math.random().toString(36).slice(2);
    function Xp(e) {
      if (!e[Wm]) {
        e[Wm] = !0, nt.forEach(function(a) {
          a !== "selectionchange" && (iS.has(a) || oS(a, !1, e), oS(a, !0, e));
        });
        var t = e.nodeType === fi ? e : e.ownerDocument;
        t !== null && (t[Wm] || (t[Wm] = !0, oS("selectionchange", !1, t)));
      }
    }
    function y1(e, t, a, o, u) {
      var d = nr(e, t, a), m = void 0;
      Ms && (t === "touchstart" || t === "touchmove" || t === "wheel") && (m = !0), e = e, o ? m !== void 0 ? Nf(e, t, d, m) : eo(e, t, d) : m !== void 0 ? Pp(e, t, d, m) : ju(e, t, d);
    }
    function g1(e, t) {
      return e === t || e.nodeType === Wn && e.parentNode === t;
    }
    function lS(e, t, a, o, u) {
      var d = o;
      if (!(t & Wi) && !(t & Rs)) {
        var m = u;
        if (o !== null) {
          var b = o;
          e: for (; ; ) {
            if (b === null)
              return;
            var C = b.tag;
            if (C === O || C === L) {
              var x = b.stateNode.containerInfo;
              if (g1(x, m))
                break;
              if (C === L)
                for (var k = b.return; k !== null; ) {
                  var V = k.tag;
                  if (V === O || V === L) {
                    var F = k.stateNode.containerInfo;
                    if (g1(F, m))
                      return;
                  }
                  k = k.return;
                }
              for (; x !== null; ) {
                var Z = oc(x);
                if (Z === null)
                  return;
                var te = Z.tag;
                if (te === H || te === Y) {
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
      sp(function() {
        return wk(e, t, a, d);
      });
    }
    function Zp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function Rk(e, t, a, o, u, d) {
      for (var m = t !== null ? t + "Capture" : null, b = o ? m : t, C = [], x = e, k = null; x !== null; ) {
        var V = x, F = V.stateNode, Z = V.tag;
        if (Z === H && F !== null && (k = F, b !== null)) {
          var te = hl(x, b);
          te != null && C.push(Zp(x, te, k));
        }
        if (u)
          break;
        x = x.return;
      }
      return C;
    }
    function Gm(e, t) {
      for (var a = t + "Capture", o = [], u = e; u !== null; ) {
        var d = u, m = d.stateNode, b = d.tag;
        if (b === H && m !== null) {
          var C = m, x = hl(u, a);
          x != null && o.unshift(Zp(u, x, C));
          var k = hl(u, t);
          k != null && o.push(Zp(u, k, C));
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
    function _k(e, t) {
      for (var a = e, o = t, u = 0, d = a; d; d = Qf(d))
        u++;
      for (var m = 0, b = o; b; b = Qf(b))
        m++;
      for (; u - m > 0; )
        a = Qf(a), u--;
      for (; m - u > 0; )
        o = Qf(o), m--;
      for (var C = u; C--; ) {
        if (a === o || o !== null && a === o.alternate)
          return a;
        a = Qf(a), o = Qf(o);
      }
      return null;
    }
    function S1(e, t, a, o, u) {
      for (var d = t._reactName, m = [], b = a; b !== null && b !== o; ) {
        var C = b, x = C.alternate, k = C.stateNode, V = C.tag;
        if (x !== null && x === o)
          break;
        if (V === H && k !== null) {
          var F = k;
          if (u) {
            var Z = hl(b, d);
            Z != null && m.unshift(Zp(b, Z, F));
          } else if (!u) {
            var te = hl(b, d);
            te != null && m.push(Zp(b, te, F));
          }
        }
        b = b.return;
      }
      m.length !== 0 && e.push({
        event: t,
        listeners: m
      });
    }
    function kk(e, t, a, o, u) {
      var d = o && u ? _k(o, u) : null;
      o !== null && S1(e, t, o, d, !1), u !== null && a !== null && S1(e, a, u, d, !0);
    }
    function Ok(e, t) {
      return e + "__bubble";
    }
    var Za = !1, Jp = "dangerouslySetInnerHTML", qm = "suppressContentEditableWarning", Bu = "suppressHydrationWarning", b1 = "autoFocus", ac = "children", ic = "style", Qm = "__html", uS, Km, ev, C1, Xm, E1, T1;
    uS = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, Km = function(e, t) {
      Bc(e, t), ap(e, t), tm(e, t, {
        registrationNameDependencies: pt,
        possibleRegistrationNames: gt
      });
    }, E1 = xt && !document.documentMode, ev = function(e, t, a) {
      if (!Za) {
        var o = Zm(a), u = Zm(t);
        u !== o && (Za = !0, h("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(o)));
      }
    }, C1 = function(e) {
      if (!Za) {
        Za = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), h("Extra attributes from the server: %s", t);
      }
    }, Xm = function(e, t) {
      t === !1 ? h("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : h("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, T1 = function(e, t) {
      var a = e.namespaceURI === Hi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var Dk = /\r\n?/g, Mk = /\u0000|\uFFFD/g;
    function Zm(e) {
      Te(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(Dk, `
`).replace(Mk, "");
    }
    function Jm(e, t, a, o) {
      var u = Zm(t), d = Zm(e);
      if (d !== u && (o && (Za || (Za = !0, h('Text content did not match. Server: "%s" Client: "%s"', d, u))), a && Ct))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function x1(e) {
      return e.nodeType === fi ? e : e.ownerDocument;
    }
    function Ak() {
    }
    function ey(e) {
      e.onclick = Ak;
    }
    function Nk(e, t, a, o, u) {
      for (var d in o)
        if (o.hasOwnProperty(d)) {
          var m = o[d];
          if (d === ic)
            m && Object.freeze(m), Yh(t, m);
          else if (d === Jp) {
            var b = m ? m[Qm] : void 0;
            b != null && Lh(t, b);
          } else if (d === ac)
            if (typeof m == "string") {
              var C = e !== "textarea" || m !== "";
              C && Pc(t, m);
            } else typeof m == "number" && Pc(t, "" + m);
          else d === qm || d === Bu || d === b1 || (pt.hasOwnProperty(d) ? m != null && (typeof m != "function" && Xm(d, m), d === "onScroll" && Nn("scroll", t)) : m != null && Ci(t, d, m, u));
        }
    }
    function Lk(e, t, a, o) {
      for (var u = 0; u < t.length; u += 2) {
        var d = t[u], m = t[u + 1];
        d === ic ? Yh(e, m) : d === Jp ? Lh(e, m) : d === ac ? Pc(e, m) : Ci(e, d, m, o);
      }
    }
    function zk(e, t, a, o) {
      var u, d = x1(a), m, b = o;
      if (b === Hi && (b = Uc(e)), b === Hi) {
        if (u = Yi(e, t), !u && e !== e.toLowerCase() && h("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var C = d.createElement("div");
          C.innerHTML = "<script><\/script>";
          var x = C.firstChild;
          m = C.removeChild(x);
        } else if (typeof t.is == "string")
          m = d.createElement(e, {
            is: t.is
          });
        else if (m = d.createElement(e), e === "select") {
          var k = m;
          t.multiple ? k.multiple = !0 : t.size && (k.size = t.size);
        }
      } else
        m = d.createElementNS(b, e);
      return b === Hi && !u && Object.prototype.toString.call(m) === "[object HTMLUnknownElement]" && !Le.call(uS, e) && (uS[e] = !0, h("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), m;
    }
    function Uk(e, t) {
      return x1(t).createTextNode(e);
    }
    function jk(e, t, a, o) {
      var u = Yi(t, a);
      Km(t, a);
      var d;
      switch (t) {
        case "dialog":
          Nn("cancel", e), Nn("close", e), d = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Nn("load", e), d = a;
          break;
        case "video":
        case "audio":
          for (var m = 0; m < Kp.length; m++)
            Nn(Kp[m], e);
          d = a;
          break;
        case "source":
          Nn("error", e), d = a;
          break;
        case "img":
        case "image":
        case "link":
          Nn("error", e), Nn("load", e), d = a;
          break;
        case "details":
          Nn("toggle", e), d = a;
          break;
        case "input":
          bs(e, a), d = Ss(e, a), Nn("invalid", e);
          break;
        case "option":
          Lc(e, a), d = a;
          break;
        case "select":
          Dh(e, a), d = Gd(e, a), Nn("invalid", e);
          break;
        case "textarea":
          Mh(e, a), d = Qd(e, a), Nn("invalid", e);
          break;
        default:
          d = a;
      }
      switch ($c(t, d), Nk(t, e, o, d, u), t) {
        case "input":
          cl(e), Cs(e, a, !1);
          break;
        case "textarea":
          cl(e), Nh(e);
          break;
        case "option":
          Wd(e, a);
          break;
        case "select":
          C0(e, a);
          break;
        default:
          typeof d.onClick == "function" && ey(e);
          break;
      }
    }
    function Pk(e, t, a, o, u) {
      Km(t, o);
      var d = null, m, b;
      switch (t) {
        case "input":
          m = Ss(e, a), b = Ss(e, o), d = [];
          break;
        case "select":
          m = Gd(e, a), b = Gd(e, o), d = [];
          break;
        case "textarea":
          m = Qd(e, a), b = Qd(e, o), d = [];
          break;
        default:
          m = a, b = o, typeof m.onClick != "function" && typeof b.onClick == "function" && ey(e);
          break;
      }
      $c(t, b);
      var C, x, k = null;
      for (C in m)
        if (!(b.hasOwnProperty(C) || !m.hasOwnProperty(C) || m[C] == null))
          if (C === ic) {
            var V = m[C];
            for (x in V)
              V.hasOwnProperty(x) && (k || (k = {}), k[x] = "");
          } else C === Jp || C === ac || C === qm || C === Bu || C === b1 || (pt.hasOwnProperty(C) ? d || (d = []) : (d = d || []).push(C, null));
      for (C in b) {
        var F = b[C], Z = m != null ? m[C] : void 0;
        if (!(!b.hasOwnProperty(C) || F === Z || F == null && Z == null))
          if (C === ic)
            if (F && Object.freeze(F), Z) {
              for (x in Z)
                Z.hasOwnProperty(x) && (!F || !F.hasOwnProperty(x)) && (k || (k = {}), k[x] = "");
              for (x in F)
                F.hasOwnProperty(x) && Z[x] !== F[x] && (k || (k = {}), k[x] = F[x]);
            } else
              k || (d || (d = []), d.push(C, k)), k = F;
          else if (C === Jp) {
            var te = F ? F[Qm] : void 0, oe = Z ? Z[Qm] : void 0;
            te != null && oe !== te && (d = d || []).push(C, te);
          } else C === ac ? (typeof F == "string" || typeof F == "number") && (d = d || []).push(C, "" + F) : C === qm || C === Bu || (pt.hasOwnProperty(C) ? (F != null && (typeof F != "function" && Xm(C, F), C === "onScroll" && Nn("scroll", e)), !d && Z !== F && (d = [])) : (d = d || []).push(C, F));
      }
      return k && (xs(k, b[ic]), (d = d || []).push(ic, k)), d;
    }
    function Fk(e, t, a, o, u) {
      a === "input" && u.type === "radio" && u.name != null && Yd(e, u);
      var d = Yi(a, o), m = Yi(a, u);
      switch (Lk(e, t, d, m), a) {
        case "input":
          ru(e, u);
          break;
        case "textarea":
          Ah(e, u);
          break;
        case "select":
          E0(e, u);
          break;
      }
    }
    function $k(e) {
      {
        var t = e.toLowerCase();
        return Vc.hasOwnProperty(t) && Vc[t] || null;
      }
    }
    function Vk(e, t, a, o, u, d, m) {
      var b, C;
      switch (b = Yi(t, a), Km(t, a), t) {
        case "dialog":
          Nn("cancel", e), Nn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Nn("load", e);
          break;
        case "video":
        case "audio":
          for (var x = 0; x < Kp.length; x++)
            Nn(Kp[x], e);
          break;
        case "source":
          Nn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Nn("error", e), Nn("load", e);
          break;
        case "details":
          Nn("toggle", e);
          break;
        case "input":
          bs(e, a), Nn("invalid", e);
          break;
        case "option":
          Lc(e, a);
          break;
        case "select":
          Dh(e, a), Nn("invalid", e);
          break;
        case "textarea":
          Mh(e, a), Nn("invalid", e);
          break;
      }
      $c(t, a);
      {
        C = /* @__PURE__ */ new Set();
        for (var k = e.attributes, V = 0; V < k.length; V++) {
          var F = k[V].name.toLowerCase();
          switch (F) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              C.add(k[V].name);
          }
        }
      }
      var Z = null;
      for (var te in a)
        if (a.hasOwnProperty(te)) {
          var oe = a[te];
          if (te === ac)
            typeof oe == "string" ? e.textContent !== oe && (a[Bu] !== !0 && Jm(e.textContent, oe, d, m), Z = [ac, oe]) : typeof oe == "number" && e.textContent !== "" + oe && (a[Bu] !== !0 && Jm(e.textContent, oe, d, m), Z = [ac, "" + oe]);
          else if (pt.hasOwnProperty(te))
            oe != null && (typeof oe != "function" && Xm(te, oe), te === "onScroll" && Nn("scroll", e));
          else if (m && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof b == "boolean") {
            var Pe = void 0, ht = b && Ze ? null : ya(te);
            if (a[Bu] !== !0) {
              if (!(te === qm || te === Bu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              te === "value" || te === "checked" || te === "selected")) {
                if (te === Jp) {
                  var ut = e.innerHTML, Bt = oe ? oe[Qm] : void 0;
                  if (Bt != null) {
                    var Ft = T1(e, Bt);
                    Ft !== ut && ev(te, ut, Ft);
                  }
                } else if (te === ic) {
                  if (C.delete(te), E1) {
                    var Q = D0(oe);
                    Pe = e.getAttribute("style"), Q !== Pe && ev(te, Pe, Q);
                  }
                } else if (b && !Ze)
                  C.delete(te.toLowerCase()), Pe = Jl(e, te, oe), oe !== Pe && ev(te, Pe, oe);
                else if (!$n(te, ht, b) && !mn(te, oe, ht, b)) {
                  var le = !1;
                  if (ht !== null)
                    C.delete(ht.attributeName), Pe = ol(e, te, oe, ht);
                  else {
                    var K = o;
                    if (K === Hi && (K = Uc(t)), K === Hi)
                      C.delete(te.toLowerCase());
                    else {
                      var Ee = $k(te);
                      Ee !== null && Ee !== te && (le = !0, C.delete(Ee)), C.delete(te);
                    }
                    Pe = Jl(e, te, oe);
                  }
                  var Ye = Ze;
                  !Ye && oe !== Pe && !le && ev(te, Pe, oe);
                }
              }
            }
          }
        }
      switch (m && // $FlowFixMe - Should be inferred as not undefined.
      C.size > 0 && a[Bu] !== !0 && C1(C), t) {
        case "input":
          cl(e), Cs(e, a, !0);
          break;
        case "textarea":
          cl(e), Nh(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && ey(e);
          break;
      }
      return Z;
    }
    function Bk(e, t, a) {
      var o = e.nodeValue !== t;
      return o;
    }
    function sS(e, t) {
      {
        if (Za)
          return;
        Za = !0, h("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function cS(e, t) {
      {
        if (Za)
          return;
        Za = !0, h('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function fS(e, t, a) {
      {
        if (Za)
          return;
        Za = !0, h("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function dS(e, t) {
      {
        if (t === "" || Za)
          return;
        Za = !0, h('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function Hk(e, t, a) {
      switch (t) {
        case "input":
          Rh(e, a);
          return;
        case "textarea":
          Kd(e, a);
          return;
        case "select":
          T0(e, a);
          return;
      }
    }
    var tv = function() {
    }, nv = function() {
    };
    {
      var Ik = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], w1 = [
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
      ], Yk = w1.concat(["button"]), Wk = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], R1 = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      nv = function(e, t) {
        var a = zt({}, e || R1), o = {
          tag: t
        };
        return w1.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), Yk.indexOf(t) !== -1 && (a.pTagInButtonScope = null), Ik.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = o, t === "form" && (a.formTag = o), t === "a" && (a.aTagInScope = o), t === "button" && (a.buttonTagInScope = o), t === "nobr" && (a.nobrTagInScope = o), t === "p" && (a.pTagInButtonScope = o), t === "li" && (a.listItemTagAutoclosing = o), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = o), a;
      };
      var Gk = function(e, t) {
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
            return Wk.indexOf(t) === -1;
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
      }, qk = function(e, t) {
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
      }, _1 = {};
      tv = function(e, t, a) {
        a = a || R1;
        var o = a.current, u = o && o.tag;
        t != null && (e != null && h("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var d = Gk(e, u) ? null : o, m = d ? null : qk(e, a), b = d || m;
        if (b) {
          var C = b.tag, x = !!d + "|" + e + "|" + C;
          if (!_1[x]) {
            _1[x] = !0;
            var k = e, V = "";
            if (e === "#text" ? /\S/.test(t) ? k = "Text nodes" : (k = "Whitespace text nodes", V = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : k = "<" + e + ">", d) {
              var F = "";
              C === "table" && e === "tr" && (F += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), h("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", k, C, V, F);
            } else
              h("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", k, C);
          }
        }
      };
    }
    var ty = "suppressHydrationWarning", ny = "$", ry = "/$", rv = "$?", av = "$!", Qk = "style", pS = null, vS = null;
    function Kk(e) {
      var t, a, o = e.nodeType;
      switch (o) {
        case fi:
        case fl: {
          t = o === fi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Zd(null, "");
          break;
        }
        default: {
          var d = o === Wn ? e.parentNode : e, m = d.namespaceURI || null;
          t = d.tagName, a = Zd(m, t);
          break;
        }
      }
      {
        var b = t.toLowerCase(), C = nv(null, b);
        return {
          namespace: a,
          ancestorInfo: C
        };
      }
    }
    function Xk(e, t, a) {
      {
        var o = e, u = Zd(o.namespace, t), d = nv(o.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: d
        };
      }
    }
    function n3(e) {
      return e;
    }
    function Zk(e) {
      pS = zu(), vS = dk();
      var t = null;
      return sa(!1), t;
    }
    function Jk(e) {
      pk(vS), sa(pS), pS = null, vS = null;
    }
    function eO(e, t, a, o, u) {
      var d;
      {
        var m = o;
        if (tv(e, null, m.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var b = "" + t.children, C = nv(m.ancestorInfo, e);
          tv(null, b, C);
        }
        d = m.namespace;
      }
      var x = zk(e, t, a, d);
      return lv(u, x), ES(x, t), x;
    }
    function tO(e, t) {
      e.appendChild(t);
    }
    function nO(e, t, a, o, u) {
      switch (jk(e, t, a, o), t) {
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
    function rO(e, t, a, o, u, d) {
      {
        var m = d;
        if (typeof o.children != typeof a.children && (typeof o.children == "string" || typeof o.children == "number")) {
          var b = "" + o.children, C = nv(m.ancestorInfo, t);
          tv(null, b, C);
        }
      }
      return Pk(e, t, a, o);
    }
    function hS(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function aO(e, t, a, o) {
      {
        var u = a;
        tv(null, e, u.ancestorInfo);
      }
      var d = Uk(e, t);
      return lv(o, d), d;
    }
    function iO() {
      var e = window.event;
      return e === void 0 ? Ri : Af(e.type);
    }
    var mS = typeof setTimeout == "function" ? setTimeout : void 0, oO = typeof clearTimeout == "function" ? clearTimeout : void 0, yS = -1, k1 = typeof Promise == "function" ? Promise : void 0, lO = typeof queueMicrotask == "function" ? queueMicrotask : typeof k1 < "u" ? function(e) {
      return k1.resolve(null).then(e).catch(uO);
    } : mS;
    function uO(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function sO(e, t, a, o) {
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
    function cO(e, t, a, o, u, d) {
      Fk(e, t, a, o, u), ES(e, u);
    }
    function O1(e) {
      Pc(e, "");
    }
    function fO(e, t, a) {
      e.nodeValue = a;
    }
    function dO(e, t) {
      e.appendChild(t);
    }
    function pO(e, t) {
      var a;
      e.nodeType === Wn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var o = e._reactRootContainer;
      o == null && a.onclick === null && ey(a);
    }
    function vO(e, t, a) {
      e.insertBefore(t, a);
    }
    function hO(e, t, a) {
      e.nodeType === Wn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function mO(e, t) {
      e.removeChild(t);
    }
    function yO(e, t) {
      e.nodeType === Wn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function gS(e, t) {
      var a = t, o = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Wn) {
          var d = u.data;
          if (d === ry)
            if (o === 0) {
              e.removeChild(u), jn(t);
              return;
            } else
              o--;
          else (d === ny || d === rv || d === av) && o++;
        }
        a = u;
      } while (a);
      jn(t);
    }
    function gO(e, t) {
      e.nodeType === Wn ? gS(e.parentNode, t) : e.nodeType === Jr && gS(e, t), jn(e);
    }
    function SO(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function bO(e) {
      e.nodeValue = "";
    }
    function CO(e, t) {
      e = e;
      var a = t[Qk], o = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Fc("display", o);
    }
    function EO(e, t) {
      e.nodeValue = t;
    }
    function TO(e) {
      e.nodeType === Jr ? e.textContent = "" : e.nodeType === fi && e.documentElement && e.removeChild(e.documentElement);
    }
    function xO(e, t, a) {
      return e.nodeType !== Jr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function wO(e, t) {
      return t === "" || e.nodeType !== Ii ? null : e;
    }
    function RO(e) {
      return e.nodeType !== Wn ? null : e;
    }
    function D1(e) {
      return e.data === rv;
    }
    function SS(e) {
      return e.data === av;
    }
    function _O(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, o, u;
      return t && (a = t.dgst, o = t.msg, u = t.stck), {
        message: o,
        digest: a,
        stack: u
      };
    }
    function kO(e, t) {
      e._reactRetry = t;
    }
    function ay(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Jr || t === Ii)
          break;
        if (t === Wn) {
          var a = e.data;
          if (a === ny || a === av || a === rv)
            break;
          if (a === ry)
            return null;
        }
      }
      return e;
    }
    function iv(e) {
      return ay(e.nextSibling);
    }
    function OO(e) {
      return ay(e.firstChild);
    }
    function DO(e) {
      return ay(e.firstChild);
    }
    function MO(e) {
      return ay(e.nextSibling);
    }
    function AO(e, t, a, o, u, d, m) {
      lv(d, e), ES(e, a);
      var b;
      {
        var C = u;
        b = C.namespace;
      }
      var x = (d.mode & lt) !== rt;
      return Vk(e, t, a, b, o, x, m);
    }
    function NO(e, t, a, o) {
      return lv(a, e), a.mode & lt, Bk(e, t);
    }
    function LO(e, t) {
      lv(t, e);
    }
    function zO(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === ry) {
            if (a === 0)
              return iv(t);
            a--;
          } else (o === ny || o === av || o === rv) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function M1(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Wn) {
          var o = t.data;
          if (o === ny || o === av || o === rv) {
            if (a === 0)
              return t;
            a--;
          } else o === ry && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function UO(e) {
      jn(e);
    }
    function jO(e) {
      jn(e);
    }
    function PO(e) {
      return e !== "head" && e !== "body";
    }
    function FO(e, t, a, o) {
      var u = !0;
      Jm(t.nodeValue, a, o, u);
    }
    function $O(e, t, a, o, u, d) {
      if (t[ty] !== !0) {
        var m = !0;
        Jm(o.nodeValue, u, d, m);
      }
    }
    function VO(e, t) {
      t.nodeType === Jr ? sS(e, t) : t.nodeType === Wn || cS(e, t);
    }
    function BO(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Jr ? sS(a, t) : t.nodeType === Wn || cS(a, t));
      }
    }
    function HO(e, t, a, o, u) {
      (u || t[ty] !== !0) && (o.nodeType === Jr ? sS(a, o) : o.nodeType === Wn || cS(a, o));
    }
    function IO(e, t, a) {
      fS(e, t);
    }
    function YO(e, t) {
      dS(e, t);
    }
    function WO(e, t, a) {
      {
        var o = e.parentNode;
        o !== null && fS(o, t);
      }
    }
    function GO(e, t) {
      {
        var a = e.parentNode;
        a !== null && dS(a, t);
      }
    }
    function qO(e, t, a, o, u, d) {
      (d || t[ty] !== !0) && fS(a, o);
    }
    function QO(e, t, a, o, u) {
      (u || t[ty] !== !0) && dS(a, o);
    }
    function KO(e) {
      h("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function XO(e) {
      Xp(e);
    }
    var Kf = Math.random().toString(36).slice(2), Xf = "__reactFiber$" + Kf, bS = "__reactProps$" + Kf, ov = "__reactContainer$" + Kf, CS = "__reactEvents$" + Kf, ZO = "__reactListeners$" + Kf, JO = "__reactHandles$" + Kf;
    function eD(e) {
      delete e[Xf], delete e[bS], delete e[CS], delete e[ZO], delete e[JO];
    }
    function lv(e, t) {
      t[Xf] = e;
    }
    function iy(e, t) {
      t[ov] = e;
    }
    function A1(e) {
      e[ov] = null;
    }
    function uv(e) {
      return !!e[ov];
    }
    function oc(e) {
      var t = e[Xf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[ov] || a[Xf], t) {
          var o = t.alternate;
          if (t.child !== null || o !== null && o.child !== null)
            for (var u = M1(e); u !== null; ) {
              var d = u[Xf];
              if (d)
                return d;
              u = M1(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Hu(e) {
      var t = e[Xf] || e[ov];
      return t && (t.tag === H || t.tag === Y || t.tag === U || t.tag === O) ? t : null;
    }
    function Zf(e) {
      if (e.tag === H || e.tag === Y)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function oy(e) {
      return e[bS] || null;
    }
    function ES(e, t) {
      e[bS] = t;
    }
    function tD(e) {
      var t = e[CS];
      return t === void 0 && (t = e[CS] = /* @__PURE__ */ new Set()), t;
    }
    var N1 = {}, L1 = c.ReactDebugCurrentFrame;
    function ly(e) {
      if (e) {
        var t = e._owner, a = ps(e.type, e._source, t ? t.type : null);
        L1.setExtraStackFrame(a);
      } else
        L1.setExtraStackFrame(null);
    }
    function ro(e, t, a, o, u) {
      {
        var d = Function.call.bind(Le);
        for (var m in e)
          if (d(e, m)) {
            var b = void 0;
            try {
              if (typeof e[m] != "function") {
                var C = Error((o || "React class") + ": " + a + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw C.name = "Invariant Violation", C;
              }
              b = e[m](t, m, o, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (x) {
              b = x;
            }
            b && !(b instanceof Error) && (ly(u), h("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", o || "React class", a, m, typeof b), ly(null)), b instanceof Error && !(b.message in N1) && (N1[b.message] = !0, ly(u), h("Failed %s type: %s", a, b.message), ly(null));
          }
      }
    }
    var TS = [], uy;
    uy = [];
    var zl = -1;
    function Iu(e) {
      return {
        current: e
      };
    }
    function ca(e, t) {
      if (zl < 0) {
        h("Unexpected pop.");
        return;
      }
      t !== uy[zl] && h("Unexpected Fiber popped."), e.current = TS[zl], TS[zl] = null, uy[zl] = null, zl--;
    }
    function fa(e, t, a) {
      zl++, TS[zl] = e.current, uy[zl] = a, e.current = t;
    }
    var xS;
    xS = {};
    var hi = {};
    Object.freeze(hi);
    var Ul = Iu(hi), Po = Iu(!1), wS = hi;
    function Jf(e, t, a) {
      return a && Fo(t) ? wS : Ul.current;
    }
    function z1(e, t, a) {
      {
        var o = e.stateNode;
        o.__reactInternalMemoizedUnmaskedChildContext = t, o.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function ed(e, t) {
      {
        var a = e.type, o = a.contextTypes;
        if (!o)
          return hi;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var d = {};
        for (var m in o)
          d[m] = t[m];
        {
          var b = Ot(e) || "Unknown";
          ro(o, d, "context", b);
        }
        return u && z1(e, t, d), d;
      }
    }
    function sy() {
      return Po.current;
    }
    function Fo(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function cy(e) {
      ca(Po, e), ca(Ul, e);
    }
    function RS(e) {
      ca(Po, e), ca(Ul, e);
    }
    function U1(e, t, a) {
      {
        if (Ul.current !== hi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        fa(Ul, t, e), fa(Po, a, e);
      }
    }
    function j1(e, t, a) {
      {
        var o = e.stateNode, u = t.childContextTypes;
        if (typeof o.getChildContext != "function") {
          {
            var d = Ot(e) || "Unknown";
            xS[d] || (xS[d] = !0, h("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", d, d));
          }
          return a;
        }
        var m = o.getChildContext();
        for (var b in m)
          if (!(b in u))
            throw new Error((Ot(e) || "Unknown") + '.getChildContext(): key "' + b + '" is not defined in childContextTypes.');
        {
          var C = Ot(e) || "Unknown";
          ro(u, m, "child context", C);
        }
        return zt({}, a, m);
      }
    }
    function fy(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || hi;
        return wS = Ul.current, fa(Ul, a, e), fa(Po, Po.current, e), !0;
      }
    }
    function P1(e, t, a) {
      {
        var o = e.stateNode;
        if (!o)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = j1(e, t, wS);
          o.__reactInternalMemoizedMergedChildContext = u, ca(Po, e), ca(Ul, e), fa(Ul, u, e), fa(Po, a, e);
        } else
          ca(Po, e), fa(Po, a, e);
      }
    }
    function nD(e) {
      {
        if (!gp(e) || e.tag !== _)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case O:
              return t.stateNode.context;
            case _: {
              var a = t.type;
              if (Fo(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Yu = 0, dy = 1, jl = null, _S = !1, kS = !1;
    function F1(e) {
      jl === null ? jl = [e] : jl.push(e);
    }
    function rD(e) {
      _S = !0, F1(e);
    }
    function $1() {
      _S && Wu();
    }
    function Wu() {
      if (!kS && jl !== null) {
        kS = !0;
        var e = 0, t = Ga();
        try {
          var a = !0, o = jl;
          for (Un(Bn); e < o.length; e++) {
            var u = o[e];
            do
              u = u(a);
            while (u !== null);
          }
          jl = null, _S = !1;
        } catch (d) {
          throw jl !== null && (jl = jl.slice(e + 1)), Kc(Zc, Wu), d;
        } finally {
          Un(t), kS = !1;
        }
      }
      return null;
    }
    var td = [], nd = 0, py = null, vy = 0, Di = [], Mi = 0, lc = null, Pl = 1, Fl = "";
    function aD(e) {
      return sc(), (e.flags & hp) !== dt;
    }
    function iD(e) {
      return sc(), vy;
    }
    function oD() {
      var e = Fl, t = Pl, a = t & ~lD(t);
      return a.toString(32) + e;
    }
    function uc(e, t) {
      sc(), td[nd++] = vy, td[nd++] = py, py = e, vy = t;
    }
    function V1(e, t, a) {
      sc(), Di[Mi++] = Pl, Di[Mi++] = Fl, Di[Mi++] = lc, lc = e;
      var o = Pl, u = Fl, d = hy(o) - 1, m = o & ~(1 << d), b = a + 1, C = hy(t) + d;
      if (C > 30) {
        var x = d - d % 5, k = (1 << x) - 1, V = (m & k).toString(32), F = m >> x, Z = d - x, te = hy(t) + Z, oe = b << Z, Pe = oe | F, ht = V + u;
        Pl = 1 << te | Pe, Fl = ht;
      } else {
        var ut = b << d, Bt = ut | m, Ft = u;
        Pl = 1 << C | Bt, Fl = Ft;
      }
    }
    function OS(e) {
      sc();
      var t = e.return;
      if (t !== null) {
        var a = 1, o = 0;
        uc(e, a), V1(e, a, o);
      }
    }
    function hy(e) {
      return 32 - gu(e);
    }
    function lD(e) {
      return 1 << hy(e) - 1;
    }
    function DS(e) {
      for (; e === py; )
        py = td[--nd], td[nd] = null, vy = td[--nd], td[nd] = null;
      for (; e === lc; )
        lc = Di[--Mi], Di[Mi] = null, Fl = Di[--Mi], Di[Mi] = null, Pl = Di[--Mi], Di[Mi] = null;
    }
    function uD() {
      return sc(), lc !== null ? {
        id: Pl,
        overflow: Fl
      } : null;
    }
    function sD(e, t) {
      sc(), Di[Mi++] = Pl, Di[Mi++] = Fl, Di[Mi++] = lc, Pl = t.id, Fl = t.overflow, lc = e;
    }
    function sc() {
      Vr() || h("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var $r = null, Ai = null, ao = !1, cc = !1, Gu = null;
    function cD() {
      ao && h("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function B1() {
      cc = !0;
    }
    function fD() {
      return cc;
    }
    function dD(e) {
      var t = e.stateNode.containerInfo;
      return Ai = DO(t), $r = e, ao = !0, Gu = null, cc = !1, !0;
    }
    function pD(e, t, a) {
      return Ai = MO(t), $r = e, ao = !0, Gu = null, cc = !1, a !== null && sD(e, a), !0;
    }
    function H1(e, t) {
      switch (e.tag) {
        case O: {
          VO(e.stateNode.containerInfo, t);
          break;
        }
        case H: {
          var a = (e.mode & lt) !== rt;
          HO(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case U: {
          var o = e.memoizedState;
          o.dehydrated !== null && BO(o.dehydrated, t);
          break;
        }
      }
    }
    function I1(e, t) {
      H1(e, t);
      var a = yN();
      a.stateNode = t, a.return = e;
      var o = e.deletions;
      o === null ? (e.deletions = [a], e.flags |= Qt) : o.push(a);
    }
    function MS(e, t) {
      {
        if (cc)
          return;
        switch (e.tag) {
          case O: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case H:
                var o = t.type;
                t.pendingProps, IO(a, o);
                break;
              case Y:
                var u = t.pendingProps;
                YO(a, u);
                break;
            }
            break;
          }
          case H: {
            var d = e.type, m = e.memoizedProps, b = e.stateNode;
            switch (t.tag) {
              case H: {
                var C = t.type, x = t.pendingProps, k = (e.mode & lt) !== rt;
                qO(
                  d,
                  m,
                  b,
                  C,
                  x,
                  // TODO: Delete this argument when we remove the legacy root API.
                  k
                );
                break;
              }
              case Y: {
                var V = t.pendingProps, F = (e.mode & lt) !== rt;
                QO(
                  d,
                  m,
                  b,
                  V,
                  // TODO: Delete this argument when we remove the legacy root API.
                  F
                );
                break;
              }
            }
            break;
          }
          case U: {
            var Z = e.memoizedState, te = Z.dehydrated;
            if (te !== null) switch (t.tag) {
              case H:
                var oe = t.type;
                t.pendingProps, WO(te, oe);
                break;
              case Y:
                var Pe = t.pendingProps;
                GO(te, Pe);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function Y1(e, t) {
      t.flags = t.flags & ~Va | bn, MS(e, t);
    }
    function W1(e, t) {
      switch (e.tag) {
        case H: {
          var a = e.type;
          e.pendingProps;
          var o = xO(t, a);
          return o !== null ? (e.stateNode = o, $r = e, Ai = OO(o), !0) : !1;
        }
        case Y: {
          var u = e.pendingProps, d = wO(t, u);
          return d !== null ? (e.stateNode = d, $r = e, Ai = null, !0) : !1;
        }
        case U: {
          var m = RO(t);
          if (m !== null) {
            var b = {
              dehydrated: m,
              treeContext: uD(),
              retryLane: Ur
            };
            e.memoizedState = b;
            var C = gN(m);
            return C.return = e, e.child = C, $r = e, Ai = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function AS(e) {
      return (e.mode & lt) !== rt && (e.flags & wt) === dt;
    }
    function NS(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function LS(e) {
      if (ao) {
        var t = Ai;
        if (!t) {
          AS(e) && (MS($r, e), NS()), Y1($r, e), ao = !1, $r = e;
          return;
        }
        var a = t;
        if (!W1(e, t)) {
          AS(e) && (MS($r, e), NS()), t = iv(a);
          var o = $r;
          if (!t || !W1(e, t)) {
            Y1($r, e), ao = !1, $r = e;
            return;
          }
          I1(o, a);
        }
      }
    }
    function vD(e, t, a) {
      var o = e.stateNode, u = !cc, d = AO(o, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = d, d !== null;
    }
    function hD(e) {
      var t = e.stateNode, a = e.memoizedProps, o = NO(t, a, e);
      if (o) {
        var u = $r;
        if (u !== null)
          switch (u.tag) {
            case O: {
              var d = u.stateNode.containerInfo, m = (u.mode & lt) !== rt;
              FO(
                d,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                m
              );
              break;
            }
            case H: {
              var b = u.type, C = u.memoizedProps, x = u.stateNode, k = (u.mode & lt) !== rt;
              $O(
                b,
                C,
                x,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                k
              );
              break;
            }
          }
      }
      return o;
    }
    function mD(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      LO(a, e);
    }
    function yD(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return zO(a);
    }
    function G1(e) {
      for (var t = e.return; t !== null && t.tag !== H && t.tag !== O && t.tag !== U; )
        t = t.return;
      $r = t;
    }
    function my(e) {
      if (e !== $r)
        return !1;
      if (!ao)
        return G1(e), ao = !0, !1;
      if (e.tag !== O && (e.tag !== H || PO(e.type) && !hS(e.type, e.memoizedProps))) {
        var t = Ai;
        if (t)
          if (AS(e))
            q1(e), NS();
          else
            for (; t; )
              I1(e, t), t = iv(t);
      }
      return G1(e), e.tag === U ? Ai = yD(e) : Ai = $r ? iv(e.stateNode) : null, !0;
    }
    function gD() {
      return ao && Ai !== null;
    }
    function q1(e) {
      for (var t = Ai; t; )
        H1(e, t), t = iv(t);
    }
    function rd() {
      $r = null, Ai = null, ao = !1, cc = !1;
    }
    function Q1() {
      Gu !== null && (Bx(Gu), Gu = null);
    }
    function Vr() {
      return ao;
    }
    function zS(e) {
      Gu === null ? Gu = [e] : Gu.push(e);
    }
    var SD = c.ReactCurrentBatchConfig, bD = null;
    function CD() {
      return SD.transition;
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
      var ED = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Ut && (t = a), a = a.return;
        return t;
      }, fc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, sv = [], cv = [], fv = [], dv = [], pv = [], vv = [], dc = /* @__PURE__ */ new Set();
      io.recordUnsafeLifecycleWarnings = function(e, t) {
        dc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && sv.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillMount == "function" && cv.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && fv.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillReceiveProps == "function" && dv.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && pv.push(e), e.mode & Ut && typeof t.UNSAFE_componentWillUpdate == "function" && vv.push(e));
      }, io.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        sv.length > 0 && (sv.forEach(function(F) {
          e.add(Ot(F) || "Component"), dc.add(F.type);
        }), sv = []);
        var t = /* @__PURE__ */ new Set();
        cv.length > 0 && (cv.forEach(function(F) {
          t.add(Ot(F) || "Component"), dc.add(F.type);
        }), cv = []);
        var a = /* @__PURE__ */ new Set();
        fv.length > 0 && (fv.forEach(function(F) {
          a.add(Ot(F) || "Component"), dc.add(F.type);
        }), fv = []);
        var o = /* @__PURE__ */ new Set();
        dv.length > 0 && (dv.forEach(function(F) {
          o.add(Ot(F) || "Component"), dc.add(F.type);
        }), dv = []);
        var u = /* @__PURE__ */ new Set();
        pv.length > 0 && (pv.forEach(function(F) {
          u.add(Ot(F) || "Component"), dc.add(F.type);
        }), pv = []);
        var d = /* @__PURE__ */ new Set();
        if (vv.length > 0 && (vv.forEach(function(F) {
          d.add(Ot(F) || "Component"), dc.add(F.type);
        }), vv = []), t.size > 0) {
          var m = fc(t);
          h(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, m);
        }
        if (o.size > 0) {
          var b = fc(o);
          h(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, b);
        }
        if (d.size > 0) {
          var C = fc(d);
          h(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, C);
        }
        if (e.size > 0) {
          var x = fc(e);
          g(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
        if (a.size > 0) {
          var k = fc(a);
          g(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, k);
        }
        if (u.size > 0) {
          var V = fc(u);
          g(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, V);
        }
      };
      var yy = /* @__PURE__ */ new Map(), K1 = /* @__PURE__ */ new Set();
      io.recordLegacyContextWarning = function(e, t) {
        var a = ED(e);
        if (a === null) {
          h("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!K1.has(e.type)) {
          var o = yy.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (o === void 0 && (o = [], yy.set(a, o)), o.push(e));
        }
      }, io.flushLegacyContextWarning = function() {
        yy.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], o = /* @__PURE__ */ new Set();
            e.forEach(function(d) {
              o.add(Ot(d) || "Component"), K1.add(d.type);
            });
            var u = fc(o);
            try {
              an(a), h(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              Jn();
            }
          }
        });
      }, io.discardPendingWarnings = function() {
        sv = [], cv = [], fv = [], dv = [], pv = [], vv = [], yy = /* @__PURE__ */ new Map();
      };
    }
    var US, jS, PS, FS, $S, X1 = function(e, t) {
    };
    US = !1, jS = !1, PS = {}, FS = {}, $S = {}, X1 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Ot(t) || "Component";
        FS[a] || (FS[a] = !0, h('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function TD(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function hv(e, t, a) {
      var o = a.ref;
      if (o !== null && typeof o != "function" && typeof o != "object") {
        if ((e.mode & Ut || Fe) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== _) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !TD(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Ot(e) || "Component";
          PS[u] || (h('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, o), PS[u] = !0);
        }
        if (a._owner) {
          var d = a._owner, m;
          if (d) {
            var b = d;
            if (b.tag !== _)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            m = b.stateNode;
          }
          if (!m)
            throw new Error("Missing owner for string ref " + o + ". This error is likely caused by a bug in React. Please file an issue.");
          var C = m;
          re(o, "ref");
          var x = "" + o;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === x)
            return t.ref;
          var k = function(V) {
            var F = C.refs;
            V === null ? delete F[x] : F[x] = V;
          };
          return k._stringRef = x, k;
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
    function gy(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Sy(e) {
      {
        var t = Ot(e) || "Component";
        if ($S[t])
          return;
        $S[t] = !0, h("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function Z1(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function J1(e) {
      function t(Q, le) {
        if (e) {
          var K = Q.deletions;
          K === null ? (Q.deletions = [le], Q.flags |= Qt) : K.push(le);
        }
      }
      function a(Q, le) {
        if (!e)
          return null;
        for (var K = le; K !== null; )
          t(Q, K), K = K.sibling;
        return null;
      }
      function o(Q, le) {
        for (var K = /* @__PURE__ */ new Map(), Ee = le; Ee !== null; )
          Ee.key !== null ? K.set(Ee.key, Ee) : K.set(Ee.index, Ee), Ee = Ee.sibling;
        return K;
      }
      function u(Q, le) {
        var K = Cc(Q, le);
        return K.index = 0, K.sibling = null, K;
      }
      function d(Q, le, K) {
        if (Q.index = K, !e)
          return Q.flags |= hp, le;
        var Ee = Q.alternate;
        if (Ee !== null) {
          var Ye = Ee.index;
          return Ye < le ? (Q.flags |= bn, le) : Ye;
        } else
          return Q.flags |= bn, le;
      }
      function m(Q) {
        return e && Q.alternate === null && (Q.flags |= bn), Q;
      }
      function b(Q, le, K, Ee) {
        if (le === null || le.tag !== Y) {
          var Ye = zC(K, Q.mode, Ee);
          return Ye.return = Q, Ye;
        } else {
          var Ve = u(le, K);
          return Ve.return = Q, Ve;
        }
      }
      function C(Q, le, K, Ee) {
        var Ye = K.type;
        if (Ye === li)
          return k(Q, le, K.props.children, Ee, K.key);
        if (le !== null && (le.elementType === Ye || // Keep this check inline so it only runs on the false path:
        aw(le, K) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Ye == "object" && Ye !== null && Ye.$$typeof === bt && Z1(Ye) === le.type)) {
          var Ve = u(le, K.props);
          return Ve.ref = hv(Q, le, K), Ve.return = Q, Ve._debugSource = K._source, Ve._debugOwner = K._owner, Ve;
        }
        var Tt = LC(K, Q.mode, Ee);
        return Tt.ref = hv(Q, le, K), Tt.return = Q, Tt;
      }
      function x(Q, le, K, Ee) {
        if (le === null || le.tag !== L || le.stateNode.containerInfo !== K.containerInfo || le.stateNode.implementation !== K.implementation) {
          var Ye = UC(K, Q.mode, Ee);
          return Ye.return = Q, Ye;
        } else {
          var Ve = u(le, K.children || []);
          return Ve.return = Q, Ve;
        }
      }
      function k(Q, le, K, Ee, Ye) {
        if (le === null || le.tag !== B) {
          var Ve = as(K, Q.mode, Ee, Ye);
          return Ve.return = Q, Ve;
        } else {
          var Tt = u(le, K);
          return Tt.return = Q, Tt;
        }
      }
      function V(Q, le, K) {
        if (typeof le == "string" && le !== "" || typeof le == "number") {
          var Ee = zC("" + le, Q.mode, K);
          return Ee.return = Q, Ee;
        }
        if (typeof le == "object" && le !== null) {
          switch (le.$$typeof) {
            case Vi: {
              var Ye = LC(le, Q.mode, K);
              return Ye.ref = hv(Q, null, le), Ye.return = Q, Ye;
            }
            case ga: {
              var Ve = UC(le, Q.mode, K);
              return Ve.return = Q, Ve;
            }
            case bt: {
              var Tt = le._payload, kt = le._init;
              return V(Q, kt(Tt), K);
            }
          }
          if (fr(le) || Sa(le)) {
            var ln = as(le, Q.mode, K, null);
            return ln.return = Q, ln;
          }
          gy(Q, le);
        }
        return typeof le == "function" && Sy(Q), null;
      }
      function F(Q, le, K, Ee) {
        var Ye = le !== null ? le.key : null;
        if (typeof K == "string" && K !== "" || typeof K == "number")
          return Ye !== null ? null : b(Q, le, "" + K, Ee);
        if (typeof K == "object" && K !== null) {
          switch (K.$$typeof) {
            case Vi:
              return K.key === Ye ? C(Q, le, K, Ee) : null;
            case ga:
              return K.key === Ye ? x(Q, le, K, Ee) : null;
            case bt: {
              var Ve = K._payload, Tt = K._init;
              return F(Q, le, Tt(Ve), Ee);
            }
          }
          if (fr(K) || Sa(K))
            return Ye !== null ? null : k(Q, le, K, Ee, null);
          gy(Q, K);
        }
        return typeof K == "function" && Sy(Q), null;
      }
      function Z(Q, le, K, Ee, Ye) {
        if (typeof Ee == "string" && Ee !== "" || typeof Ee == "number") {
          var Ve = Q.get(K) || null;
          return b(le, Ve, "" + Ee, Ye);
        }
        if (typeof Ee == "object" && Ee !== null) {
          switch (Ee.$$typeof) {
            case Vi: {
              var Tt = Q.get(Ee.key === null ? K : Ee.key) || null;
              return C(le, Tt, Ee, Ye);
            }
            case ga: {
              var kt = Q.get(Ee.key === null ? K : Ee.key) || null;
              return x(le, kt, Ee, Ye);
            }
            case bt:
              var ln = Ee._payload, Yt = Ee._init;
              return Z(Q, le, K, Yt(ln), Ye);
          }
          if (fr(Ee) || Sa(Ee)) {
            var ir = Q.get(K) || null;
            return k(le, ir, Ee, Ye, null);
          }
          gy(le, Ee);
        }
        return typeof Ee == "function" && Sy(le), null;
      }
      function te(Q, le, K) {
        {
          if (typeof Q != "object" || Q === null)
            return le;
          switch (Q.$$typeof) {
            case Vi:
            case ga:
              X1(Q, K);
              var Ee = Q.key;
              if (typeof Ee != "string")
                break;
              if (le === null) {
                le = /* @__PURE__ */ new Set(), le.add(Ee);
                break;
              }
              if (!le.has(Ee)) {
                le.add(Ee);
                break;
              }
              h("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", Ee);
              break;
            case bt:
              var Ye = Q._payload, Ve = Q._init;
              te(Ve(Ye), le, K);
              break;
          }
        }
        return le;
      }
      function oe(Q, le, K, Ee) {
        for (var Ye = null, Ve = 0; Ve < K.length; Ve++) {
          var Tt = K[Ve];
          Ye = te(Tt, Ye, Q);
        }
        for (var kt = null, ln = null, Yt = le, ir = 0, Wt = 0, Qn = null; Yt !== null && Wt < K.length; Wt++) {
          Yt.index > Wt ? (Qn = Yt, Yt = null) : Qn = Yt.sibling;
          var pa = F(Q, Yt, K[Wt], Ee);
          if (pa === null) {
            Yt === null && (Yt = Qn);
            break;
          }
          e && Yt && pa.alternate === null && t(Q, Yt), ir = d(pa, ir, Wt), ln === null ? kt = pa : ln.sibling = pa, ln = pa, Yt = Qn;
        }
        if (Wt === K.length) {
          if (a(Q, Yt), Vr()) {
            var qr = Wt;
            uc(Q, qr);
          }
          return kt;
        }
        if (Yt === null) {
          for (; Wt < K.length; Wt++) {
            var yi = V(Q, K[Wt], Ee);
            yi !== null && (ir = d(yi, ir, Wt), ln === null ? kt = yi : ln.sibling = yi, ln = yi);
          }
          if (Vr()) {
            var Da = Wt;
            uc(Q, Da);
          }
          return kt;
        }
        for (var Ma = o(Q, Yt); Wt < K.length; Wt++) {
          var va = Z(Ma, Q, Wt, K[Wt], Ee);
          va !== null && (e && va.alternate !== null && Ma.delete(va.key === null ? Wt : va.key), ir = d(va, ir, Wt), ln === null ? kt = va : ln.sibling = va, ln = va);
        }
        if (e && Ma.forEach(function(Ed) {
          return t(Q, Ed);
        }), Vr()) {
          var Wl = Wt;
          uc(Q, Wl);
        }
        return kt;
      }
      function Pe(Q, le, K, Ee) {
        var Ye = Sa(K);
        if (typeof Ye != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          K[Symbol.toStringTag] === "Generator" && (jS || h("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), jS = !0), K.entries === Ye && (US || h("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), US = !0);
          var Ve = Ye.call(K);
          if (Ve)
            for (var Tt = null, kt = Ve.next(); !kt.done; kt = Ve.next()) {
              var ln = kt.value;
              Tt = te(ln, Tt, Q);
            }
        }
        var Yt = Ye.call(K);
        if (Yt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var ir = null, Wt = null, Qn = le, pa = 0, qr = 0, yi = null, Da = Yt.next(); Qn !== null && !Da.done; qr++, Da = Yt.next()) {
          Qn.index > qr ? (yi = Qn, Qn = null) : yi = Qn.sibling;
          var Ma = F(Q, Qn, Da.value, Ee);
          if (Ma === null) {
            Qn === null && (Qn = yi);
            break;
          }
          e && Qn && Ma.alternate === null && t(Q, Qn), pa = d(Ma, pa, qr), Wt === null ? ir = Ma : Wt.sibling = Ma, Wt = Ma, Qn = yi;
        }
        if (Da.done) {
          if (a(Q, Qn), Vr()) {
            var va = qr;
            uc(Q, va);
          }
          return ir;
        }
        if (Qn === null) {
          for (; !Da.done; qr++, Da = Yt.next()) {
            var Wl = V(Q, Da.value, Ee);
            Wl !== null && (pa = d(Wl, pa, qr), Wt === null ? ir = Wl : Wt.sibling = Wl, Wt = Wl);
          }
          if (Vr()) {
            var Ed = qr;
            uc(Q, Ed);
          }
          return ir;
        }
        for (var Gv = o(Q, Qn); !Da.done; qr++, Da = Yt.next()) {
          var Go = Z(Gv, Q, qr, Da.value, Ee);
          Go !== null && (e && Go.alternate !== null && Gv.delete(Go.key === null ? qr : Go.key), pa = d(Go, pa, qr), Wt === null ? ir = Go : Wt.sibling = Go, Wt = Go);
        }
        if (e && Gv.forEach(function(QN) {
          return t(Q, QN);
        }), Vr()) {
          var qN = qr;
          uc(Q, qN);
        }
        return ir;
      }
      function ht(Q, le, K, Ee) {
        if (le !== null && le.tag === Y) {
          a(Q, le.sibling);
          var Ye = u(le, K);
          return Ye.return = Q, Ye;
        }
        a(Q, le);
        var Ve = zC(K, Q.mode, Ee);
        return Ve.return = Q, Ve;
      }
      function ut(Q, le, K, Ee) {
        for (var Ye = K.key, Ve = le; Ve !== null; ) {
          if (Ve.key === Ye) {
            var Tt = K.type;
            if (Tt === li) {
              if (Ve.tag === B) {
                a(Q, Ve.sibling);
                var kt = u(Ve, K.props.children);
                return kt.return = Q, kt._debugSource = K._source, kt._debugOwner = K._owner, kt;
              }
            } else if (Ve.elementType === Tt || // Keep this check inline so it only runs on the false path:
            aw(Ve, K) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Tt == "object" && Tt !== null && Tt.$$typeof === bt && Z1(Tt) === Ve.type) {
              a(Q, Ve.sibling);
              var ln = u(Ve, K.props);
              return ln.ref = hv(Q, Ve, K), ln.return = Q, ln._debugSource = K._source, ln._debugOwner = K._owner, ln;
            }
            a(Q, Ve);
            break;
          } else
            t(Q, Ve);
          Ve = Ve.sibling;
        }
        if (K.type === li) {
          var Yt = as(K.props.children, Q.mode, Ee, K.key);
          return Yt.return = Q, Yt;
        } else {
          var ir = LC(K, Q.mode, Ee);
          return ir.ref = hv(Q, le, K), ir.return = Q, ir;
        }
      }
      function Bt(Q, le, K, Ee) {
        for (var Ye = K.key, Ve = le; Ve !== null; ) {
          if (Ve.key === Ye)
            if (Ve.tag === L && Ve.stateNode.containerInfo === K.containerInfo && Ve.stateNode.implementation === K.implementation) {
              a(Q, Ve.sibling);
              var Tt = u(Ve, K.children || []);
              return Tt.return = Q, Tt;
            } else {
              a(Q, Ve);
              break;
            }
          else
            t(Q, Ve);
          Ve = Ve.sibling;
        }
        var kt = UC(K, Q.mode, Ee);
        return kt.return = Q, kt;
      }
      function Ft(Q, le, K, Ee) {
        var Ye = typeof K == "object" && K !== null && K.type === li && K.key === null;
        if (Ye && (K = K.props.children), typeof K == "object" && K !== null) {
          switch (K.$$typeof) {
            case Vi:
              return m(ut(Q, le, K, Ee));
            case ga:
              return m(Bt(Q, le, K, Ee));
            case bt:
              var Ve = K._payload, Tt = K._init;
              return Ft(Q, le, Tt(Ve), Ee);
          }
          if (fr(K))
            return oe(Q, le, K, Ee);
          if (Sa(K))
            return Pe(Q, le, K, Ee);
          gy(Q, K);
        }
        return typeof K == "string" && K !== "" || typeof K == "number" ? m(ht(Q, le, "" + K, Ee)) : (typeof K == "function" && Sy(Q), a(Q, le));
      }
      return Ft;
    }
    var ad = J1(!0), eT = J1(!1);
    function xD(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, o = Cc(a, a.pendingProps);
        for (t.child = o, o.return = t; a.sibling !== null; )
          a = a.sibling, o = o.sibling = Cc(a, a.pendingProps), o.return = t;
        o.sibling = null;
      }
    }
    function wD(e, t) {
      for (var a = e.child; a !== null; )
        dN(a, t), a = a.sibling;
    }
    var VS = Iu(null), BS;
    BS = {};
    var by = null, id = null, HS = null, Cy = !1;
    function Ey() {
      by = null, id = null, HS = null, Cy = !1;
    }
    function tT() {
      Cy = !0;
    }
    function nT() {
      Cy = !1;
    }
    function rT(e, t, a) {
      fa(VS, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== BS && h("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = BS;
    }
    function IS(e, t) {
      var a = VS.current;
      ca(VS, t), e._currentValue = a;
    }
    function YS(e, t, a) {
      for (var o = e; o !== null; ) {
        var u = o.alternate;
        if (_l(o.childLanes, t) ? u !== null && !_l(u.childLanes, t) && (u.childLanes = Dt(u.childLanes, t)) : (o.childLanes = Dt(o.childLanes, t), u !== null && (u.childLanes = Dt(u.childLanes, t))), o === a)
          break;
        o = o.return;
      }
      o !== a && h("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function RD(e, t, a) {
      _D(e, t, a);
    }
    function _D(e, t, a) {
      var o = e.child;
      for (o !== null && (o.return = e); o !== null; ) {
        var u = void 0, d = o.dependencies;
        if (d !== null) {
          u = o.child;
          for (var m = d.firstContext; m !== null; ) {
            if (m.context === t) {
              if (o.tag === _) {
                var b = wu(a), C = $l(gn, b);
                C.tag = xy;
                var x = o.updateQueue;
                if (x !== null) {
                  var k = x.shared, V = k.pending;
                  V === null ? C.next = C : (C.next = V.next, V.next = C), k.pending = C;
                }
              }
              o.lanes = Dt(o.lanes, a);
              var F = o.alternate;
              F !== null && (F.lanes = Dt(F.lanes, a)), YS(o.return, a, e), d.lanes = Dt(d.lanes, a);
              break;
            }
            m = m.next;
          }
        } else if (o.tag === ae)
          u = o.type === e.type ? null : o.child;
        else if (o.tag === ce) {
          var Z = o.return;
          if (Z === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          Z.lanes = Dt(Z.lanes, a);
          var te = Z.alternate;
          te !== null && (te.lanes = Dt(te.lanes, a)), YS(Z, a, e), u = o.sibling;
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
            var oe = u.sibling;
            if (oe !== null) {
              oe.return = u.return, u = oe;
              break;
            }
            u = u.return;
          }
        o = u;
      }
    }
    function od(e, t) {
      by = e, id = null, HS = null;
      var a = e.dependencies;
      if (a !== null) {
        var o = a.firstContext;
        o !== null && (ua(a.lanes, t) && Dv(), a.firstContext = null);
      }
    }
    function yr(e) {
      Cy && h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (HS !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (id === null) {
          if (by === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          id = a, by.dependencies = {
            lanes: me,
            firstContext: a
          };
        } else
          id = id.next = a;
      }
      return t;
    }
    var pc = null;
    function WS(e) {
      pc === null ? pc = [e] : pc.push(e);
    }
    function kD() {
      if (pc !== null) {
        for (var e = 0; e < pc.length; e++) {
          var t = pc[e], a = t.interleaved;
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
        pc = null;
      }
    }
    function aT(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, WS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ty(e, o);
    }
    function OD(e, t, a, o) {
      var u = t.interleaved;
      u === null ? (a.next = a, WS(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function DD(e, t, a, o) {
      var u = t.interleaved;
      return u === null ? (a.next = a, WS(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Ty(e, o);
    }
    function Ja(e, t) {
      return Ty(e, t);
    }
    var MD = Ty;
    function Ty(e, t) {
      e.lanes = Dt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Dt(a.lanes, t)), a === null && (e.flags & (bn | Va)) !== dt && ew(e);
      for (var o = e, u = e.return; u !== null; )
        u.childLanes = Dt(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = Dt(a.childLanes, t) : (u.flags & (bn | Va)) !== dt && ew(e), o = u, u = u.return;
      if (o.tag === O) {
        var d = o.stateNode;
        return d;
      } else
        return null;
    }
    var iT = 0, oT = 1, xy = 2, GS = 3, wy = !1, qS, Ry;
    qS = !1, Ry = null;
    function QS(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: me
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function lT(e, t) {
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
    function $l(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: iT,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function qu(e, t, a) {
      var o = e.updateQueue;
      if (o === null)
        return null;
      var u = o.shared;
      if (Ry === u && !qS && (h("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), qS = !0), OA()) {
        var d = u.pending;
        return d === null ? t.next = t : (t.next = d.next, d.next = t), u.pending = t, MD(e, a);
      } else
        return DD(e, u, t, a);
    }
    function _y(e, t, a) {
      var o = t.updateQueue;
      if (o !== null) {
        var u = o.shared;
        if (Dp(a)) {
          var d = u.lanes;
          d = Tf(d, e.pendingLanes);
          var m = Dt(d, a);
          u.lanes = m, Mp(e, m);
        }
      }
    }
    function KS(e, t) {
      var a = e.updateQueue, o = e.alternate;
      if (o !== null) {
        var u = o.updateQueue;
        if (a === u) {
          var d = null, m = null, b = a.firstBaseUpdate;
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
              m === null ? d = m = x : (m.next = x, m = x), C = C.next;
            } while (C !== null);
            m === null ? d = m = t : (m.next = t, m = t);
          } else
            d = m = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: d,
            lastBaseUpdate: m,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var k = a.lastBaseUpdate;
      k === null ? a.firstBaseUpdate = t : k.next = t, a.lastBaseUpdate = t;
    }
    function AD(e, t, a, o, u, d) {
      switch (a.tag) {
        case oT: {
          var m = a.payload;
          if (typeof m == "function") {
            tT();
            var b = m.call(d, o, u);
            {
              if (e.mode & Ut) {
                Gn(!0);
                try {
                  m.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              nT();
            }
            return b;
          }
          return m;
        }
        case GS:
          e.flags = e.flags & ~pr | wt;
        case iT: {
          var C = a.payload, x;
          if (typeof C == "function") {
            tT(), x = C.call(d, o, u);
            {
              if (e.mode & Ut) {
                Gn(!0);
                try {
                  C.call(d, o, u);
                } finally {
                  Gn(!1);
                }
              }
              nT();
            }
          } else
            x = C;
          return x == null ? o : zt({}, o, x);
        }
        case xy:
          return wy = !0, o;
      }
      return o;
    }
    function ky(e, t, a, o) {
      var u = e.updateQueue;
      wy = !1, Ry = u.shared;
      var d = u.firstBaseUpdate, m = u.lastBaseUpdate, b = u.shared.pending;
      if (b !== null) {
        u.shared.pending = null;
        var C = b, x = C.next;
        C.next = null, m === null ? d = x : m.next = x, m = C;
        var k = e.alternate;
        if (k !== null) {
          var V = k.updateQueue, F = V.lastBaseUpdate;
          F !== m && (F === null ? V.firstBaseUpdate = x : F.next = x, V.lastBaseUpdate = C);
        }
      }
      if (d !== null) {
        var Z = u.baseState, te = me, oe = null, Pe = null, ht = null, ut = d;
        do {
          var Bt = ut.lane, Ft = ut.eventTime;
          if (_l(o, Bt)) {
            if (ht !== null) {
              var le = {
                eventTime: Ft,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: qn,
                tag: ut.tag,
                payload: ut.payload,
                callback: ut.callback,
                next: null
              };
              ht = ht.next = le;
            }
            Z = AD(e, u, ut, Z, t, a);
            var K = ut.callback;
            if (K !== null && // If the update was already committed, we should not queue its
            // callback again.
            ut.lane !== qn) {
              e.flags |= xi;
              var Ee = u.effects;
              Ee === null ? u.effects = [ut] : Ee.push(ut);
            }
          } else {
            var Q = {
              eventTime: Ft,
              lane: Bt,
              tag: ut.tag,
              payload: ut.payload,
              callback: ut.callback,
              next: null
            };
            ht === null ? (Pe = ht = Q, oe = Z) : ht = ht.next = Q, te = Dt(te, Bt);
          }
          if (ut = ut.next, ut === null) {
            if (b = u.shared.pending, b === null)
              break;
            var Ye = b, Ve = Ye.next;
            Ye.next = null, ut = Ve, u.lastBaseUpdate = Ye, u.shared.pending = null;
          }
        } while (!0);
        ht === null && (oe = Z), u.baseState = oe, u.firstBaseUpdate = Pe, u.lastBaseUpdate = ht;
        var Tt = u.shared.interleaved;
        if (Tt !== null) {
          var kt = Tt;
          do
            te = Dt(te, kt.lane), kt = kt.next;
          while (kt !== Tt);
        } else d === null && (u.shared.lanes = me);
        Bv(te), e.lanes = te, e.memoizedState = Z;
      }
      Ry = null;
    }
    function ND(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function uT() {
      wy = !1;
    }
    function Oy() {
      return wy;
    }
    function sT(e, t, a) {
      var o = t.effects;
      if (t.effects = null, o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u], m = d.callback;
          m !== null && (d.callback = null, ND(m, a));
        }
    }
    var mv = {}, Qu = Iu(mv), yv = Iu(mv), Dy = Iu(mv);
    function My(e) {
      if (e === mv)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function cT() {
      var e = My(Dy.current);
      return e;
    }
    function XS(e, t) {
      fa(Dy, t, e), fa(yv, e, e), fa(Qu, mv, e);
      var a = Kk(t);
      ca(Qu, e), fa(Qu, a, e);
    }
    function ld(e) {
      ca(Qu, e), ca(yv, e), ca(Dy, e);
    }
    function ZS() {
      var e = My(Qu.current);
      return e;
    }
    function fT(e) {
      My(Dy.current);
      var t = My(Qu.current), a = Xk(t, e.type);
      t !== a && (fa(yv, e, e), fa(Qu, a, e));
    }
    function JS(e) {
      yv.current === e && (ca(Qu, e), ca(yv, e));
    }
    var LD = 0, dT = 1, pT = 1, gv = 2, oo = Iu(LD);
    function eb(e, t) {
      return (e & t) !== 0;
    }
    function ud(e) {
      return e & dT;
    }
    function tb(e, t) {
      return e & dT | t;
    }
    function zD(e, t) {
      return e | t;
    }
    function Ku(e, t) {
      fa(oo, t, e);
    }
    function sd(e) {
      ca(oo, e);
    }
    function UD(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Ay(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === U) {
          var a = t.memoizedState;
          if (a !== null) {
            var o = a.dehydrated;
            if (o === null || D1(o) || SS(o))
              return t;
          }
        } else if (t.tag === _e && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & wt) !== dt;
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
    var ei = (
      /*   */
      0
    ), Tr = (
      /* */
      1
    ), $o = (
      /*  */
      2
    ), xr = (
      /*    */
      4
    ), Br = (
      /*   */
      8
    ), nb = [];
    function rb() {
      for (var e = 0; e < nb.length; e++) {
        var t = nb[e];
        t._workInProgressVersionPrimary = null;
      }
      nb.length = 0;
    }
    function jD(e, t) {
      var a = t._getVersion, o = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, o] : e.mutableSourceEagerHydrationData.push(t, o);
    }
    var Ie = c.ReactCurrentDispatcher, Sv = c.ReactCurrentBatchConfig, ab, cd;
    ab = /* @__PURE__ */ new Set();
    var vc = me, on = null, wr = null, Rr = null, Ny = !1, bv = !1, Cv = 0, PD = 0, FD = 25, fe = null, Ni = null, Xu = -1, ib = !1;
    function Zt() {
      {
        var e = fe;
        Ni === null ? Ni = [e] : Ni.push(e);
      }
    }
    function je() {
      {
        var e = fe;
        Ni !== null && (Xu++, Ni[Xu] !== e && $D(e));
      }
    }
    function fd(e) {
      e != null && !fr(e) && h("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", fe, typeof e);
    }
    function $D(e) {
      {
        var t = Ot(on);
        if (!ab.has(t) && (ab.add(t), Ni !== null)) {
          for (var a = "", o = 30, u = 0; u <= Xu; u++) {
            for (var d = Ni[u], m = u === Xu ? e : d, b = u + 1 + ". " + d; b.length < o; )
              b += " ";
            b += m + `
`, a += b;
          }
          h(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

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
    function ob(e, t) {
      if (ib)
        return !1;
      if (t === null)
        return h("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", fe), !1;
      e.length !== t.length && h(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, fe, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Qe(e[a], t[a]))
          return !1;
      return !0;
    }
    function dd(e, t, a, o, u, d) {
      vc = d, on = t, Ni = e !== null ? e._debugHookTypes : null, Xu = -1, ib = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = me, e !== null && e.memoizedState !== null ? Ie.current = zT : Ni !== null ? Ie.current = LT : Ie.current = NT;
      var m = a(o, u);
      if (bv) {
        var b = 0;
        do {
          if (bv = !1, Cv = 0, b >= FD)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          b += 1, ib = !1, wr = null, Rr = null, t.updateQueue = null, Xu = -1, Ie.current = UT, m = a(o, u);
        } while (bv);
      }
      Ie.current = Wy, t._debugHookTypes = Ni;
      var C = wr !== null && wr.next !== null;
      if (vc = me, on = null, wr = null, Rr = null, fe = null, Ni = null, Xu = -1, e !== null && (e.flags & br) !== (t.flags & br) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & lt) !== rt && h("Internal React error: Expected static flag was missing. Please notify the React team."), Ny = !1, C)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return m;
    }
    function pd() {
      var e = Cv !== 0;
      return Cv = 0, e;
    }
    function vT(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & wa) !== rt ? t.flags &= ~(gl | na | _n | Mt) : t.flags &= ~(_n | Mt), e.lanes = Ys(e.lanes, a);
    }
    function hT() {
      if (Ie.current = Wy, Ny) {
        for (var e = on.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Ny = !1;
      }
      vc = me, on = null, wr = null, Rr = null, Ni = null, Xu = -1, fe = null, kT = !1, bv = !1, Cv = 0;
    }
    function Vo() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return Rr === null ? on.memoizedState = Rr = e : Rr = Rr.next = e, Rr;
    }
    function Li() {
      var e;
      if (wr === null) {
        var t = on.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = wr.next;
      var a;
      if (Rr === null ? a = on.memoizedState : a = Rr.next, a !== null)
        Rr = a, a = Rr.next, wr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        wr = e;
        var o = {
          memoizedState: wr.memoizedState,
          baseState: wr.baseState,
          baseQueue: wr.baseQueue,
          queue: wr.queue,
          next: null
        };
        Rr === null ? on.memoizedState = Rr = o : Rr = Rr.next = o;
      }
      return Rr;
    }
    function mT() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function lb(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function ub(e, t, a) {
      var o = Vo(), u;
      a !== void 0 ? u = a(t) : u = t, o.memoizedState = o.baseState = u;
      var d = {
        pending: null,
        interleaved: null,
        lanes: me,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      o.queue = d;
      var m = d.dispatch = ID.bind(null, on, d);
      return [o.memoizedState, m];
    }
    function sb(e, t, a) {
      var o = Li(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = wr, m = d.baseQueue, b = u.pending;
      if (b !== null) {
        if (m !== null) {
          var C = m.next, x = b.next;
          m.next = x, b.next = C;
        }
        d.baseQueue !== m && h("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), d.baseQueue = m = b, u.pending = null;
      }
      if (m !== null) {
        var k = m.next, V = d.baseState, F = null, Z = null, te = null, oe = k;
        do {
          var Pe = oe.lane;
          if (_l(vc, Pe)) {
            if (te !== null) {
              var ut = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: qn,
                action: oe.action,
                hasEagerState: oe.hasEagerState,
                eagerState: oe.eagerState,
                next: null
              };
              te = te.next = ut;
            }
            if (oe.hasEagerState)
              V = oe.eagerState;
            else {
              var Bt = oe.action;
              V = e(V, Bt);
            }
          } else {
            var ht = {
              lane: Pe,
              action: oe.action,
              hasEagerState: oe.hasEagerState,
              eagerState: oe.eagerState,
              next: null
            };
            te === null ? (Z = te = ht, F = V) : te = te.next = ht, on.lanes = Dt(on.lanes, Pe), Bv(Pe);
          }
          oe = oe.next;
        } while (oe !== null && oe !== k);
        te === null ? F = V : te.next = Z, Qe(V, o.memoizedState) || Dv(), o.memoizedState = V, o.baseState = F, o.baseQueue = te, u.lastRenderedState = V;
      }
      var Ft = u.interleaved;
      if (Ft !== null) {
        var Q = Ft;
        do {
          var le = Q.lane;
          on.lanes = Dt(on.lanes, le), Bv(le), Q = Q.next;
        } while (Q !== Ft);
      } else m === null && (u.lanes = me);
      var K = u.dispatch;
      return [o.memoizedState, K];
    }
    function cb(e, t, a) {
      var o = Li(), u = o.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var d = u.dispatch, m = u.pending, b = o.memoizedState;
      if (m !== null) {
        u.pending = null;
        var C = m.next, x = C;
        do {
          var k = x.action;
          b = e(b, k), x = x.next;
        } while (x !== C);
        Qe(b, o.memoizedState) || Dv(), o.memoizedState = b, o.baseQueue === null && (o.baseState = b), u.lastRenderedState = b;
      }
      return [b, d];
    }
    function r3(e, t, a) {
    }
    function a3(e, t, a) {
    }
    function fb(e, t, a) {
      var o = on, u = Vo(), d, m = Vr();
      if (m) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        d = a(), cd || d !== a() && (h("The result of getServerSnapshot should be cached to avoid an infinite loop"), cd = !0);
      } else {
        if (d = t(), !cd) {
          var b = t();
          Qe(d, b) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), cd = !0);
        }
        var C = fg();
        if (C === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Is(C, vc) || yT(o, t, d);
      }
      u.memoizedState = d;
      var x = {
        value: d,
        getSnapshot: t
      };
      return u.queue = x, Py(ST.bind(null, o, x, e), [e]), o.flags |= _n, Ev(Tr | Br, gT.bind(null, o, x, d, t), void 0, null), d;
    }
    function Ly(e, t, a) {
      var o = on, u = Li(), d = t();
      if (!cd) {
        var m = t();
        Qe(d, m) || (h("The result of getSnapshot should be cached to avoid an infinite loop"), cd = !0);
      }
      var b = u.memoizedState, C = !Qe(b, d);
      C && (u.memoizedState = d, Dv());
      var x = u.queue;
      if (xv(ST.bind(null, o, x, e), [e]), x.getSnapshot !== t || C || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      Rr !== null && Rr.memoizedState.tag & Tr) {
        o.flags |= _n, Ev(Tr | Br, gT.bind(null, o, x, d, t), void 0, null);
        var k = fg();
        if (k === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Is(k, vc) || yT(o, t, d);
      }
      return d;
    }
    function yT(e, t, a) {
      e.flags |= Ls;
      var o = {
        getSnapshot: t,
        value: a
      }, u = on.updateQueue;
      if (u === null)
        u = mT(), on.updateQueue = u, u.stores = [o];
      else {
        var d = u.stores;
        d === null ? u.stores = [o] : d.push(o);
      }
    }
    function gT(e, t, a, o) {
      t.value = a, t.getSnapshot = o, bT(t) && CT(e);
    }
    function ST(e, t, a) {
      var o = function() {
        bT(t) && CT(e);
      };
      return a(o);
    }
    function bT(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var o = t();
        return !Qe(a, o);
      } catch {
        return !0;
      }
    }
    function CT(e) {
      var t = Ja(e, ft);
      t !== null && Dr(t, e, ft, gn);
    }
    function zy(e) {
      var t = Vo();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: me,
        dispatch: null,
        lastRenderedReducer: lb,
        lastRenderedState: e
      };
      t.queue = a;
      var o = a.dispatch = YD.bind(null, on, a);
      return [t.memoizedState, o];
    }
    function db(e) {
      return sb(lb);
    }
    function pb(e) {
      return cb(lb);
    }
    function Ev(e, t, a, o) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: o,
        // Circular
        next: null
      }, d = on.updateQueue;
      if (d === null)
        d = mT(), on.updateQueue = d, d.lastEffect = u.next = u;
      else {
        var m = d.lastEffect;
        if (m === null)
          d.lastEffect = u.next = u;
        else {
          var b = m.next;
          m.next = u, u.next = b, d.lastEffect = u;
        }
      }
      return u;
    }
    function vb(e) {
      var t = Vo();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function Uy(e) {
      var t = Li();
      return t.memoizedState;
    }
    function Tv(e, t, a, o) {
      var u = Vo(), d = o === void 0 ? null : o;
      on.flags |= e, u.memoizedState = Ev(Tr | t, a, void 0, d);
    }
    function jy(e, t, a, o) {
      var u = Li(), d = o === void 0 ? null : o, m = void 0;
      if (wr !== null) {
        var b = wr.memoizedState;
        if (m = b.destroy, d !== null) {
          var C = b.deps;
          if (ob(d, C)) {
            u.memoizedState = Ev(t, a, m, d);
            return;
          }
        }
      }
      on.flags |= e, u.memoizedState = Ev(Tr | t, a, m, d);
    }
    function Py(e, t) {
      return (on.mode & wa) !== rt ? Tv(gl | _n | ko, Br, e, t) : Tv(_n | ko, Br, e, t);
    }
    function xv(e, t) {
      return jy(_n, Br, e, t);
    }
    function hb(e, t) {
      return Tv(Mt, $o, e, t);
    }
    function Fy(e, t) {
      return jy(Mt, $o, e, t);
    }
    function mb(e, t) {
      var a = Mt;
      return a |= ta, (on.mode & wa) !== rt && (a |= na), Tv(a, xr, e, t);
    }
    function $y(e, t) {
      return jy(Mt, xr, e, t);
    }
    function ET(e, t) {
      if (typeof t == "function") {
        var a = t, o = e();
        return a(o), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || h("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var d = e();
        return u.current = d, function() {
          u.current = null;
        };
      }
    }
    function yb(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null, u = Mt;
      return u |= ta, (on.mode & wa) !== rt && (u |= na), Tv(u, xr, ET.bind(null, t, e), o);
    }
    function Vy(e, t, a) {
      typeof t != "function" && h("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var o = a != null ? a.concat([e]) : null;
      return jy(Mt, xr, ET.bind(null, t, e), o);
    }
    function VD(e, t) {
    }
    var By = VD;
    function gb(e, t) {
      var a = Vo(), o = t === void 0 ? null : t;
      return a.memoizedState = [e, o], e;
    }
    function Hy(e, t) {
      var a = Li(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (ob(o, d))
          return u[0];
      }
      return a.memoizedState = [e, o], e;
    }
    function Sb(e, t) {
      var a = Vo(), o = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, o], u;
    }
    function Iy(e, t) {
      var a = Li(), o = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && o !== null) {
        var d = u[1];
        if (ob(o, d))
          return u[0];
      }
      var m = e();
      return a.memoizedState = [m, o], m;
    }
    function bb(e) {
      var t = Vo();
      return t.memoizedState = e, e;
    }
    function TT(e) {
      var t = Li(), a = wr, o = a.memoizedState;
      return wT(t, o, e);
    }
    function xT(e) {
      var t = Li();
      if (wr === null)
        return t.memoizedState = e, e;
      var a = wr.memoizedState;
      return wT(t, a, e);
    }
    function wT(e, t, a) {
      var o = !bm(vc);
      if (o) {
        if (!Qe(a, t)) {
          var u = Tm();
          on.lanes = Dt(on.lanes, u), Bv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Dv()), e.memoizedState = a, a;
    }
    function BD(e, t, a) {
      var o = Ga();
      Un($0(o, Ji)), e(!0);
      var u = Sv.transition;
      Sv.transition = {};
      var d = Sv.transition;
      Sv.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Un(o), Sv.transition = u, u === null && d._updatedFibers) {
          var m = d._updatedFibers.size;
          m > 10 && g("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), d._updatedFibers.clear();
        }
      }
    }
    function Cb() {
      var e = zy(!1), t = e[0], a = e[1], o = BD.bind(null, a), u = Vo();
      return u.memoizedState = o, [t, o];
    }
    function RT() {
      var e = db(), t = e[0], a = Li(), o = a.memoizedState;
      return [t, o];
    }
    function _T() {
      var e = pb(), t = e[0], a = Li(), o = a.memoizedState;
      return [t, o];
    }
    var kT = !1;
    function HD() {
      return kT;
    }
    function Eb() {
      var e = Vo(), t = fg(), a = t.identifierPrefix, o;
      if (Vr()) {
        var u = oD();
        o = ":" + a + "R" + u;
        var d = Cv++;
        d > 0 && (o += "H" + d.toString(32)), o += ":";
      } else {
        var m = PD++;
        o = ":" + a + "r" + m.toString(32) + ":";
      }
      return e.memoizedState = o, o;
    }
    function Yy() {
      var e = Li(), t = e.memoizedState;
      return t;
    }
    function ID(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ns(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (OT(e))
        DT(t, u);
      else {
        var d = aT(e, t, u, o);
        if (d !== null) {
          var m = Oa();
          Dr(d, e, o, m), MT(d, t, o);
        }
      }
      AT(e, o);
    }
    function YD(e, t, a) {
      typeof arguments[3] == "function" && h("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var o = ns(e), u = {
        lane: o,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (OT(e))
        DT(t, u);
      else {
        var d = e.alternate;
        if (e.lanes === me && (d === null || d.lanes === me)) {
          var m = t.lastRenderedReducer;
          if (m !== null) {
            var b;
            b = Ie.current, Ie.current = lo;
            try {
              var C = t.lastRenderedState, x = m(C, a);
              if (u.hasEagerState = !0, u.eagerState = x, Qe(x, C)) {
                OD(e, t, u, o);
                return;
              }
            } catch {
            } finally {
              Ie.current = b;
            }
          }
        }
        var k = aT(e, t, u, o);
        if (k !== null) {
          var V = Oa();
          Dr(k, e, o, V), MT(k, t, o);
        }
      }
      AT(e, o);
    }
    function OT(e) {
      var t = e.alternate;
      return e === on || t !== null && t === on;
    }
    function DT(e, t) {
      bv = Ny = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function MT(e, t, a) {
      if (Dp(a)) {
        var o = t.lanes;
        o = Tf(o, e.pendingLanes);
        var u = Dt(o, a);
        t.lanes = u, Mp(e, u);
      }
    }
    function AT(e, t, a) {
      Ps(e, t);
    }
    var Wy = {
      readContext: yr,
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
    }, NT = null, LT = null, zT = null, UT = null, Bo = null, lo = null, Gy = null;
    {
      var Tb = function() {
        h("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, _t = function() {
        h("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      NT = {
        readContext: function(e) {
          return yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", Zt(), fd(t), gb(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", Zt(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", Zt(), fd(t), Py(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", Zt(), fd(a), yb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", Zt(), fd(t), hb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", Zt(), fd(t), mb(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", Zt(), fd(t);
          var a = Ie.current;
          Ie.current = Bo;
          try {
            return Sb(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", Zt();
          var o = Ie.current;
          Ie.current = Bo;
          try {
            return ub(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", Zt(), vb(e);
        },
        useState: function(e) {
          fe = "useState", Zt();
          var t = Ie.current;
          Ie.current = Bo;
          try {
            return zy(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", Zt(), void 0;
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", Zt(), bb(e);
        },
        useTransition: function() {
          return fe = "useTransition", Zt(), Cb();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", Zt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", Zt(), fb(e, t, a);
        },
        useId: function() {
          return fe = "useId", Zt(), Eb();
        },
        unstable_isNewReconciler: ge
      }, LT = {
        readContext: function(e) {
          return yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", je(), gb(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", je(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", je(), Py(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", je(), yb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", je(), hb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", je(), mb(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", je();
          var a = Ie.current;
          Ie.current = Bo;
          try {
            return Sb(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", je();
          var o = Ie.current;
          Ie.current = Bo;
          try {
            return ub(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", je(), vb(e);
        },
        useState: function(e) {
          fe = "useState", je();
          var t = Ie.current;
          Ie.current = Bo;
          try {
            return zy(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", je(), void 0;
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", je(), bb(e);
        },
        useTransition: function() {
          return fe = "useTransition", je(), Cb();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", je(), fb(e, t, a);
        },
        useId: function() {
          return fe = "useId", je(), Eb();
        },
        unstable_isNewReconciler: ge
      }, zT = {
        readContext: function(e) {
          return yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", je(), Hy(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", je(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", je(), xv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", je(), Vy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", je(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", je(), $y(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", je();
          var a = Ie.current;
          Ie.current = lo;
          try {
            return Iy(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", je();
          var o = Ie.current;
          Ie.current = lo;
          try {
            return sb(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", je(), Uy();
        },
        useState: function(e) {
          fe = "useState", je();
          var t = Ie.current;
          Ie.current = lo;
          try {
            return db(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", je(), By();
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", je(), TT(e);
        },
        useTransition: function() {
          return fe = "useTransition", je(), RT();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", je(), Ly(e, t);
        },
        useId: function() {
          return fe = "useId", je(), Yy();
        },
        unstable_isNewReconciler: ge
      }, UT = {
        readContext: function(e) {
          return yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", je(), Hy(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", je(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", je(), xv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", je(), Vy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", je(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", je(), $y(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", je();
          var a = Ie.current;
          Ie.current = Gy;
          try {
            return Iy(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", je();
          var o = Ie.current;
          Ie.current = Gy;
          try {
            return cb(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", je(), Uy();
        },
        useState: function(e) {
          fe = "useState", je();
          var t = Ie.current;
          Ie.current = Gy;
          try {
            return pb(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", je(), By();
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", je(), xT(e);
        },
        useTransition: function() {
          return fe = "useTransition", je(), _T();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", je(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", je(), Ly(e, t);
        },
        useId: function() {
          return fe = "useId", je(), Yy();
        },
        unstable_isNewReconciler: ge
      }, Bo = {
        readContext: function(e) {
          return Tb(), yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", _t(), Zt(), gb(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", _t(), Zt(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", _t(), Zt(), Py(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", _t(), Zt(), yb(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", _t(), Zt(), hb(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", _t(), Zt(), mb(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", _t(), Zt();
          var a = Ie.current;
          Ie.current = Bo;
          try {
            return Sb(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", _t(), Zt();
          var o = Ie.current;
          Ie.current = Bo;
          try {
            return ub(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", _t(), Zt(), vb(e);
        },
        useState: function(e) {
          fe = "useState", _t(), Zt();
          var t = Ie.current;
          Ie.current = Bo;
          try {
            return zy(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", _t(), Zt(), void 0;
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", _t(), Zt(), bb(e);
        },
        useTransition: function() {
          return fe = "useTransition", _t(), Zt(), Cb();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", _t(), Zt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", _t(), Zt(), fb(e, t, a);
        },
        useId: function() {
          return fe = "useId", _t(), Zt(), Eb();
        },
        unstable_isNewReconciler: ge
      }, lo = {
        readContext: function(e) {
          return Tb(), yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", _t(), je(), Hy(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", _t(), je(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", _t(), je(), xv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", _t(), je(), Vy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", _t(), je(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", _t(), je(), $y(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", _t(), je();
          var a = Ie.current;
          Ie.current = lo;
          try {
            return Iy(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", _t(), je();
          var o = Ie.current;
          Ie.current = lo;
          try {
            return sb(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", _t(), je(), Uy();
        },
        useState: function(e) {
          fe = "useState", _t(), je();
          var t = Ie.current;
          Ie.current = lo;
          try {
            return db(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", _t(), je(), By();
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", _t(), je(), TT(e);
        },
        useTransition: function() {
          return fe = "useTransition", _t(), je(), RT();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", _t(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", _t(), je(), Ly(e, t);
        },
        useId: function() {
          return fe = "useId", _t(), je(), Yy();
        },
        unstable_isNewReconciler: ge
      }, Gy = {
        readContext: function(e) {
          return Tb(), yr(e);
        },
        useCallback: function(e, t) {
          return fe = "useCallback", _t(), je(), Hy(e, t);
        },
        useContext: function(e) {
          return fe = "useContext", _t(), je(), yr(e);
        },
        useEffect: function(e, t) {
          return fe = "useEffect", _t(), je(), xv(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return fe = "useImperativeHandle", _t(), je(), Vy(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return fe = "useInsertionEffect", _t(), je(), Fy(e, t);
        },
        useLayoutEffect: function(e, t) {
          return fe = "useLayoutEffect", _t(), je(), $y(e, t);
        },
        useMemo: function(e, t) {
          fe = "useMemo", _t(), je();
          var a = Ie.current;
          Ie.current = lo;
          try {
            return Iy(e, t);
          } finally {
            Ie.current = a;
          }
        },
        useReducer: function(e, t, a) {
          fe = "useReducer", _t(), je();
          var o = Ie.current;
          Ie.current = lo;
          try {
            return cb(e, t, a);
          } finally {
            Ie.current = o;
          }
        },
        useRef: function(e) {
          return fe = "useRef", _t(), je(), Uy();
        },
        useState: function(e) {
          fe = "useState", _t(), je();
          var t = Ie.current;
          Ie.current = lo;
          try {
            return pb(e);
          } finally {
            Ie.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return fe = "useDebugValue", _t(), je(), By();
        },
        useDeferredValue: function(e) {
          return fe = "useDeferredValue", _t(), je(), xT(e);
        },
        useTransition: function() {
          return fe = "useTransition", _t(), je(), _T();
        },
        useMutableSource: function(e, t, a) {
          return fe = "useMutableSource", _t(), je(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return fe = "useSyncExternalStore", _t(), je(), Ly(e, t);
        },
        useId: function() {
          return fe = "useId", _t(), je(), Yy();
        },
        unstable_isNewReconciler: ge
      };
    }
    var Zu = s.unstable_now, jT = 0, qy = -1, wv = -1, Qy = -1, xb = !1, Ky = !1;
    function PT() {
      return xb;
    }
    function WD() {
      Ky = !0;
    }
    function GD() {
      xb = !1, Ky = !1;
    }
    function qD() {
      xb = Ky, Ky = !1;
    }
    function FT() {
      return jT;
    }
    function $T() {
      jT = Zu();
    }
    function wb(e) {
      wv = Zu(), e.actualStartTime < 0 && (e.actualStartTime = Zu());
    }
    function VT(e) {
      wv = -1;
    }
    function Xy(e, t) {
      if (wv >= 0) {
        var a = Zu() - wv;
        e.actualDuration += a, t && (e.selfBaseDuration = a), wv = -1;
      }
    }
    function Ho(e) {
      if (qy >= 0) {
        var t = Zu() - qy;
        qy = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
            case J:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Rb(e) {
      if (Qy >= 0) {
        var t = Zu() - Qy;
        Qy = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case O:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
            case J:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Io() {
      qy = Zu();
    }
    function _b() {
      Qy = Zu();
    }
    function kb(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function uo(e, t) {
      if (e && e.defaultProps) {
        var a = zt({}, t), o = e.defaultProps;
        for (var u in o)
          a[u] === void 0 && (a[u] = o[u]);
        return a;
      }
      return t;
    }
    var Ob = {}, Db, Mb, Ab, Nb, Lb, BT, Zy, zb, Ub, jb, Rv;
    {
      Db = /* @__PURE__ */ new Set(), Mb = /* @__PURE__ */ new Set(), Ab = /* @__PURE__ */ new Set(), Nb = /* @__PURE__ */ new Set(), zb = /* @__PURE__ */ new Set(), Lb = /* @__PURE__ */ new Set(), Ub = /* @__PURE__ */ new Set(), jb = /* @__PURE__ */ new Set(), Rv = /* @__PURE__ */ new Set();
      var HT = /* @__PURE__ */ new Set();
      Zy = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          HT.has(a) || (HT.add(a), h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, BT = function(e, t) {
        if (t === void 0) {
          var a = en(e) || "Component";
          Lb.has(a) || (Lb.add(a), h("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Ob, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Ob);
    }
    function Pb(e, t, a, o) {
      var u = e.memoizedState, d = a(o, u);
      {
        if (e.mode & Ut) {
          Gn(!0);
          try {
            d = a(o, u);
          } finally {
            Gn(!1);
          }
        }
        BT(t, d);
      }
      var m = d == null ? u : zt({}, u, d);
      if (e.memoizedState = m, e.lanes === me) {
        var b = e.updateQueue;
        b.baseState = m;
      }
    }
    var Fb = {
      isMounted: Ta,
      enqueueSetState: function(e, t, a) {
        var o = Fa(e), u = Oa(), d = ns(o), m = $l(u, d);
        m.payload = t, a != null && (Zy(a, "setState"), m.callback = a);
        var b = qu(o, m, d);
        b !== null && (Dr(b, o, d, u), _y(b, o, d)), Ps(o, d);
      },
      enqueueReplaceState: function(e, t, a) {
        var o = Fa(e), u = Oa(), d = ns(o), m = $l(u, d);
        m.tag = oT, m.payload = t, a != null && (Zy(a, "replaceState"), m.callback = a);
        var b = qu(o, m, d);
        b !== null && (Dr(b, o, d, u), _y(b, o, d)), Ps(o, d);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Fa(e), o = Oa(), u = ns(a), d = $l(o, u);
        d.tag = xy, t != null && (Zy(t, "forceUpdate"), d.callback = t);
        var m = qu(a, d, u);
        m !== null && (Dr(m, a, u, o), _y(m, a, u)), of(a, u);
      }
    };
    function IT(e, t, a, o, u, d, m) {
      var b = e.stateNode;
      if (typeof b.shouldComponentUpdate == "function") {
        var C = b.shouldComponentUpdate(o, d, m);
        {
          if (e.mode & Ut) {
            Gn(!0);
            try {
              C = b.shouldComponentUpdate(o, d, m);
            } finally {
              Gn(!1);
            }
          }
          C === void 0 && h("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", en(t) || "Component");
        }
        return C;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !St(a, o) || !St(u, d) : !0;
    }
    function QD(e, t, a) {
      var o = e.stateNode;
      {
        var u = en(t) || "Component", d = o.render;
        d || (t.prototype && typeof t.prototype.render == "function" ? h("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : h("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), o.getInitialState && !o.getInitialState.isReactClassApproved && !o.state && h("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), o.getDefaultProps && !o.getDefaultProps.isReactClassApproved && h("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), o.propTypes && h("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), o.contextType && h("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Rv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ut) === rt && (Rv.add(t), h(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Rv.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Ut) === rt && (Rv.add(t), h(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), o.contextTypes && h("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !Ub.has(t) && (Ub.add(t), h("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof o.componentShouldUpdate == "function" && h("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof o.shouldComponentUpdate < "u" && h("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", en(t) || "A pure component"), typeof o.componentDidUnmount == "function" && h("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof o.componentDidReceiveProps == "function" && h("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof o.componentWillRecieveProps == "function" && h("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof o.UNSAFE_componentWillRecieveProps == "function" && h("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var m = o.props !== a;
        o.props !== void 0 && m && h("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), o.defaultProps && h("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof o.getSnapshotBeforeUpdate == "function" && typeof o.componentDidUpdate != "function" && !Ab.has(t) && (Ab.add(t), h("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", en(t))), typeof o.getDerivedStateFromProps == "function" && h("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof o.getDerivedStateFromError == "function" && h("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && h("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var b = o.state;
        b && (typeof b != "object" || fr(b)) && h("%s.state: must be set to an object or null", u), typeof o.getChildContext == "function" && typeof t.childContextTypes != "object" && h("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function YT(e, t) {
      t.updater = Fb, e.stateNode = t, fu(t, e), t._reactInternalInstance = Ob;
    }
    function WT(e, t, a) {
      var o = !1, u = hi, d = hi, m = t.contextType;
      if ("contextType" in t) {
        var b = (
          // Allow null for conditional declaration
          m === null || m !== void 0 && m.$$typeof === be && m._context === void 0
        );
        if (!b && !jb.has(t)) {
          jb.add(t);
          var C = "";
          m === void 0 ? C = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof m != "object" ? C = " However, it is set to a " + typeof m + "." : m.$$typeof === z ? C = " Did you accidentally pass the Context.Provider instead?" : m._context !== void 0 ? C = " Did you accidentally pass the Context.Consumer instead?" : C = " However, it is set to an object with keys {" + Object.keys(m).join(", ") + "}.", h("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", en(t) || "Component", C);
        }
      }
      if (typeof m == "object" && m !== null)
        d = yr(m);
      else {
        u = Jf(e, t, !0);
        var x = t.contextTypes;
        o = x != null, d = o ? ed(e, u) : hi;
      }
      var k = new t(a, d);
      if (e.mode & Ut) {
        Gn(!0);
        try {
          k = new t(a, d);
        } finally {
          Gn(!1);
        }
      }
      var V = e.memoizedState = k.state !== null && k.state !== void 0 ? k.state : null;
      YT(e, k);
      {
        if (typeof t.getDerivedStateFromProps == "function" && V === null) {
          var F = en(t) || "Component";
          Mb.has(F) || (Mb.add(F), h("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", F, k.state === null ? "null" : "undefined", F));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof k.getSnapshotBeforeUpdate == "function") {
          var Z = null, te = null, oe = null;
          if (typeof k.componentWillMount == "function" && k.componentWillMount.__suppressDeprecationWarning !== !0 ? Z = "componentWillMount" : typeof k.UNSAFE_componentWillMount == "function" && (Z = "UNSAFE_componentWillMount"), typeof k.componentWillReceiveProps == "function" && k.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? te = "componentWillReceiveProps" : typeof k.UNSAFE_componentWillReceiveProps == "function" && (te = "UNSAFE_componentWillReceiveProps"), typeof k.componentWillUpdate == "function" && k.componentWillUpdate.__suppressDeprecationWarning !== !0 ? oe = "componentWillUpdate" : typeof k.UNSAFE_componentWillUpdate == "function" && (oe = "UNSAFE_componentWillUpdate"), Z !== null || te !== null || oe !== null) {
            var Pe = en(t) || "Component", ht = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            Nb.has(Pe) || (Nb.add(Pe), h(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, Pe, ht, Z !== null ? `
  ` + Z : "", te !== null ? `
  ` + te : "", oe !== null ? `
  ` + oe : ""));
          }
        }
      }
      return o && z1(e, u, d), k;
    }
    function KD(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (h("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ot(e) || "Component"), Fb.enqueueReplaceState(t, t.state, null));
    }
    function GT(e, t, a, o) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, o), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, o), t.state !== u) {
        {
          var d = Ot(e) || "Component";
          Db.has(d) || (Db.add(d), h("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", d));
        }
        Fb.enqueueReplaceState(t, t.state, null);
      }
    }
    function $b(e, t, a, o) {
      QD(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, QS(e);
      var d = t.contextType;
      if (typeof d == "object" && d !== null)
        u.context = yr(d);
      else {
        var m = Jf(e, t, !0);
        u.context = ed(e, m);
      }
      {
        if (u.state === a) {
          var b = en(t) || "Component";
          zb.has(b) || (zb.add(b), h("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", b));
        }
        e.mode & Ut && io.recordLegacyContextWarning(e, u), io.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var C = t.getDerivedStateFromProps;
      if (typeof C == "function" && (Pb(e, t, C, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (KD(e, u), ky(e, a, u, o), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var x = Mt;
        x |= ta, (e.mode & wa) !== rt && (x |= na), e.flags |= x;
      }
    }
    function XD(e, t, a, o) {
      var u = e.stateNode, d = e.memoizedProps;
      u.props = d;
      var m = u.context, b = t.contextType, C = hi;
      if (typeof b == "object" && b !== null)
        C = yr(b);
      else {
        var x = Jf(e, t, !0);
        C = ed(e, x);
      }
      var k = t.getDerivedStateFromProps, V = typeof k == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !V && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (d !== a || m !== C) && GT(e, u, a, C), uT();
      var F = e.memoizedState, Z = u.state = F;
      if (ky(e, a, u, o), Z = e.memoizedState, d === a && F === Z && !sy() && !Oy()) {
        if (typeof u.componentDidMount == "function") {
          var te = Mt;
          te |= ta, (e.mode & wa) !== rt && (te |= na), e.flags |= te;
        }
        return !1;
      }
      typeof k == "function" && (Pb(e, t, k, a), Z = e.memoizedState);
      var oe = Oy() || IT(e, t, d, a, F, Z, C);
      if (oe) {
        if (!V && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var Pe = Mt;
          Pe |= ta, (e.mode & wa) !== rt && (Pe |= na), e.flags |= Pe;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var ht = Mt;
          ht |= ta, (e.mode & wa) !== rt && (ht |= na), e.flags |= ht;
        }
        e.memoizedProps = a, e.memoizedState = Z;
      }
      return u.props = a, u.state = Z, u.context = C, oe;
    }
    function ZD(e, t, a, o, u) {
      var d = t.stateNode;
      lT(e, t);
      var m = t.memoizedProps, b = t.type === t.elementType ? m : uo(t.type, m);
      d.props = b;
      var C = t.pendingProps, x = d.context, k = a.contextType, V = hi;
      if (typeof k == "object" && k !== null)
        V = yr(k);
      else {
        var F = Jf(t, a, !0);
        V = ed(t, F);
      }
      var Z = a.getDerivedStateFromProps, te = typeof Z == "function" || typeof d.getSnapshotBeforeUpdate == "function";
      !te && (typeof d.UNSAFE_componentWillReceiveProps == "function" || typeof d.componentWillReceiveProps == "function") && (m !== C || x !== V) && GT(t, d, o, V), uT();
      var oe = t.memoizedState, Pe = d.state = oe;
      if (ky(t, o, d, u), Pe = t.memoizedState, m === C && oe === Pe && !sy() && !Oy() && !ke)
        return typeof d.componentDidUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= Mt), typeof d.getSnapshotBeforeUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= $a), !1;
      typeof Z == "function" && (Pb(t, a, Z, o), Pe = t.memoizedState);
      var ht = Oy() || IT(t, a, b, o, oe, Pe, V) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      ke;
      return ht ? (!te && (typeof d.UNSAFE_componentWillUpdate == "function" || typeof d.componentWillUpdate == "function") && (typeof d.componentWillUpdate == "function" && d.componentWillUpdate(o, Pe, V), typeof d.UNSAFE_componentWillUpdate == "function" && d.UNSAFE_componentWillUpdate(o, Pe, V)), typeof d.componentDidUpdate == "function" && (t.flags |= Mt), typeof d.getSnapshotBeforeUpdate == "function" && (t.flags |= $a)) : (typeof d.componentDidUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= Mt), typeof d.getSnapshotBeforeUpdate == "function" && (m !== e.memoizedProps || oe !== e.memoizedState) && (t.flags |= $a), t.memoizedProps = o, t.memoizedState = Pe), d.props = o, d.state = Pe, d.context = V, ht;
    }
    function hc(e, t) {
      return {
        value: e,
        source: t,
        stack: Vd(t),
        digest: null
      };
    }
    function Vb(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function JD(e, t) {
      return !0;
    }
    function Bb(e, t) {
      try {
        var a = JD(e, t);
        if (a === !1)
          return;
        var o = t.value, u = t.source, d = t.stack, m = d !== null ? d : "";
        if (o != null && o._suppressLogging) {
          if (e.tag === _)
            return;
          console.error(o);
        }
        var b = u ? Ot(u) : null, C = b ? "The above error occurred in the <" + b + "> component:" : "The above error occurred in one of your React components:", x;
        if (e.tag === O)
          x = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var k = Ot(e) || "Anonymous";
          x = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + k + ".");
        }
        var V = C + `
` + m + `

` + ("" + x);
        console.error(V);
      } catch (F) {
        setTimeout(function() {
          throw F;
        });
      }
    }
    var eM = typeof WeakMap == "function" ? WeakMap : Map;
    function qT(e, t, a) {
      var o = $l(gn, a);
      o.tag = GS, o.payload = {
        element: null
      };
      var u = t.value;
      return o.callback = function() {
        WA(u), Bb(e, t);
      }, o;
    }
    function Hb(e, t, a) {
      var o = $l(gn, a);
      o.tag = GS;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var d = t.value;
        o.payload = function() {
          return u(d);
        }, o.callback = function() {
          iw(e), Bb(e, t);
        };
      }
      var m = e.stateNode;
      return m !== null && typeof m.componentDidCatch == "function" && (o.callback = function() {
        iw(e), Bb(e, t), typeof u != "function" && IA(this);
        var C = t.value, x = t.stack;
        this.componentDidCatch(C, {
          componentStack: x !== null ? x : ""
        }), typeof u != "function" && (ua(e.lanes, ft) || h("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ot(e) || "Unknown"));
      }), o;
    }
    function QT(e, t, a) {
      var o = e.pingCache, u;
      if (o === null ? (o = e.pingCache = new eM(), u = /* @__PURE__ */ new Set(), o.set(t, u)) : (u = o.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), o.set(t, u))), !u.has(a)) {
        u.add(a);
        var d = GA.bind(null, e, t, a);
        xa && Hv(e, a), t.then(d, d);
      }
    }
    function tM(e, t, a, o) {
      var u = e.updateQueue;
      if (u === null) {
        var d = /* @__PURE__ */ new Set();
        d.add(a), e.updateQueue = d;
      } else
        u.add(a);
    }
    function nM(e, t) {
      var a = e.tag;
      if ((e.mode & lt) === rt && (a === w || a === I || a === ie)) {
        var o = e.alternate;
        o ? (e.updateQueue = o.updateQueue, e.memoizedState = o.memoizedState, e.lanes = o.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function KT(e) {
      var t = e;
      do {
        if (t.tag === U && UD(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function XT(e, t, a, o, u) {
      if ((e.mode & lt) === rt) {
        if (e === t)
          e.flags |= pr;
        else {
          if (e.flags |= wt, a.flags |= zs, a.flags &= ~(Gc | Ca), a.tag === _) {
            var d = a.alternate;
            if (d === null)
              a.tag = D;
            else {
              var m = $l(gn, ft);
              m.tag = xy, qu(a, m, ft);
            }
          }
          a.lanes = Dt(a.lanes, ft);
        }
        return e;
      }
      return e.flags |= pr, e.lanes = u, e;
    }
    function rM(e, t, a, o, u) {
      if (a.flags |= Ca, xa && Hv(e, u), o !== null && typeof o == "object" && typeof o.then == "function") {
        var d = o;
        nM(a), Vr() && a.mode & lt && B1();
        var m = KT(t);
        if (m !== null) {
          m.flags &= ~zn, XT(m, t, a, e, u), m.mode & lt && QT(e, d, u), tM(m, e, d);
          return;
        } else {
          if (!Op(u)) {
            QT(e, d, u), EC();
            return;
          }
          var b = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          o = b;
        }
      } else if (Vr() && a.mode & lt) {
        B1();
        var C = KT(t);
        if (C !== null) {
          (C.flags & pr) === dt && (C.flags |= zn), XT(C, t, a, e, u), zS(hc(o, a));
          return;
        }
      }
      o = hc(o, a), UA(o);
      var x = t;
      do {
        switch (x.tag) {
          case O: {
            var k = o;
            x.flags |= pr;
            var V = wu(u);
            x.lanes = Dt(x.lanes, V);
            var F = qT(x, k, V);
            KS(x, F);
            return;
          }
          case _:
            var Z = o, te = x.type, oe = x.stateNode;
            if ((x.flags & wt) === dt && (typeof te.getDerivedStateFromError == "function" || oe !== null && typeof oe.componentDidCatch == "function" && !Kx(oe))) {
              x.flags |= pr;
              var Pe = wu(u);
              x.lanes = Dt(x.lanes, Pe);
              var ht = Hb(x, Z, Pe);
              KS(x, ht);
              return;
            }
            break;
        }
        x = x.return;
      } while (x !== null);
    }
    function aM() {
      return null;
    }
    var _v = c.ReactCurrentOwner, so = !1, Ib, kv, Yb, Wb, Gb, mc, qb, Jy, Ov;
    Ib = {}, kv = {}, Yb = {}, Wb = {}, Gb = {}, mc = !1, qb = {}, Jy = {}, Ov = {};
    function _a(e, t, a, o) {
      e === null ? t.child = eT(t, null, a, o) : t.child = ad(t, e.child, a, o);
    }
    function iM(e, t, a, o) {
      t.child = ad(t, e.child, null, o), t.child = ad(t, null, a, o);
    }
    function ZT(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && ro(
          d,
          o,
          // Resolved props
          "prop",
          en(a)
        );
      }
      var m = a.render, b = t.ref, C, x;
      od(t, u), hu(t);
      {
        if (_v.current = t, ci(!0), C = dd(e, t, m, o, b, u), x = pd(), t.mode & Ut) {
          Gn(!0);
          try {
            C = dd(e, t, m, o, b, u), x = pd();
          } finally {
            Gn(!1);
          }
        }
        ci(!1);
      }
      return ia(), e !== null && !so ? (vT(e, t, u), Vl(e, t, u)) : (Vr() && x && OS(t), t.flags |= Ro, _a(e, t, C, u), t.child);
    }
    function JT(e, t, a, o, u) {
      if (e === null) {
        var d = a.type;
        if (cN(d) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var m = d;
          return m = Cd(d), t.tag = ie, t.type = m, Xb(t, d), ex(e, t, m, o, u);
        }
        {
          var b = d.propTypes;
          if (b && ro(
            b,
            o,
            // Resolved props
            "prop",
            en(d)
          ), a.defaultProps !== void 0) {
            var C = en(d) || "Unknown";
            Ov[C] || (h("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", C), Ov[C] = !0);
          }
        }
        var x = NC(a.type, null, o, t, t.mode, u);
        return x.ref = t.ref, x.return = t, t.child = x, x;
      }
      {
        var k = a.type, V = k.propTypes;
        V && ro(
          V,
          o,
          // Resolved props
          "prop",
          en(k)
        );
      }
      var F = e.child, Z = rC(e, u);
      if (!Z) {
        var te = F.memoizedProps, oe = a.compare;
        if (oe = oe !== null ? oe : St, oe(te, o) && e.ref === t.ref)
          return Vl(e, t, u);
      }
      t.flags |= Ro;
      var Pe = Cc(F, o);
      return Pe.ref = t.ref, Pe.return = t, t.child = Pe, Pe;
    }
    function ex(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = t.elementType;
        if (d.$$typeof === bt) {
          var m = d, b = m._payload, C = m._init;
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
            en(d)
          );
        }
      }
      if (e !== null) {
        var k = e.memoizedProps;
        if (St(k, o) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (so = !1, t.pendingProps = o = k, rC(e, u))
            (e.flags & zs) !== dt && (so = !0);
          else return t.lanes = e.lanes, Vl(e, t, u);
      }
      return Qb(e, t, a, o, u);
    }
    function tx(e, t, a) {
      var o = t.pendingProps, u = o.children, d = e !== null ? e.memoizedState : null;
      if (o.mode === "hidden" || W)
        if ((t.mode & lt) === rt) {
          var m = {
            baseLanes: me,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = m, dg(t, a);
        } else if (ua(a, Ur)) {
          var V = {
            baseLanes: me,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = V;
          var F = d !== null ? d.baseLanes : a;
          dg(t, F);
        } else {
          var b = null, C;
          if (d !== null) {
            var x = d.baseLanes;
            C = Dt(x, a);
          } else
            C = a;
          t.lanes = t.childLanes = Ur;
          var k = {
            baseLanes: C,
            cachePool: b,
            transitions: null
          };
          return t.memoizedState = k, t.updateQueue = null, dg(t, C), null;
        }
      else {
        var Z;
        d !== null ? (Z = Dt(d.baseLanes, a), t.memoizedState = null) : Z = a, dg(t, Z);
      }
      return _a(e, t, u, a), t.child;
    }
    function oM(e, t, a) {
      var o = t.pendingProps;
      return _a(e, t, o, a), t.child;
    }
    function lM(e, t, a) {
      var o = t.pendingProps.children;
      return _a(e, t, o, a), t.child;
    }
    function uM(e, t, a) {
      {
        t.flags |= Mt;
        {
          var o = t.stateNode;
          o.effectDuration = 0, o.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, d = u.children;
      return _a(e, t, d, a), t.child;
    }
    function nx(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= ea, t.flags |= mp);
    }
    function Qb(e, t, a, o, u) {
      if (t.type !== t.elementType) {
        var d = a.propTypes;
        d && ro(
          d,
          o,
          // Resolved props
          "prop",
          en(a)
        );
      }
      var m;
      {
        var b = Jf(t, a, !0);
        m = ed(t, b);
      }
      var C, x;
      od(t, u), hu(t);
      {
        if (_v.current = t, ci(!0), C = dd(e, t, a, o, m, u), x = pd(), t.mode & Ut) {
          Gn(!0);
          try {
            C = dd(e, t, a, o, m, u), x = pd();
          } finally {
            Gn(!1);
          }
        }
        ci(!1);
      }
      return ia(), e !== null && !so ? (vT(e, t, u), Vl(e, t, u)) : (Vr() && x && OS(t), t.flags |= Ro, _a(e, t, C, u), t.child);
    }
    function rx(e, t, a, o, u) {
      {
        switch (wN(t)) {
          case !1: {
            var d = t.stateNode, m = t.type, b = new m(t.memoizedProps, d.context), C = b.state;
            d.updater.enqueueSetState(d, C, null);
            break;
          }
          case !0: {
            t.flags |= wt, t.flags |= pr;
            var x = new Error("Simulated error coming from DevTools"), k = wu(u);
            t.lanes = Dt(t.lanes, k);
            var V = Hb(t, hc(x, t), k);
            KS(t, V);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var F = a.propTypes;
          F && ro(
            F,
            o,
            // Resolved props
            "prop",
            en(a)
          );
        }
      }
      var Z;
      Fo(a) ? (Z = !0, fy(t)) : Z = !1, od(t, u);
      var te = t.stateNode, oe;
      te === null ? (tg(e, t), WT(t, a, o), $b(t, a, o, u), oe = !0) : e === null ? oe = XD(t, a, o, u) : oe = ZD(e, t, a, o, u);
      var Pe = Kb(e, t, a, oe, Z, u);
      {
        var ht = t.stateNode;
        oe && ht.props !== o && (mc || h("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ot(t) || "a component"), mc = !0);
      }
      return Pe;
    }
    function Kb(e, t, a, o, u, d) {
      nx(e, t);
      var m = (t.flags & wt) !== dt;
      if (!o && !m)
        return u && P1(t, a, !1), Vl(e, t, d);
      var b = t.stateNode;
      _v.current = t;
      var C;
      if (m && typeof a.getDerivedStateFromError != "function")
        C = null, VT();
      else {
        hu(t);
        {
          if (ci(!0), C = b.render(), t.mode & Ut) {
            Gn(!0);
            try {
              b.render();
            } finally {
              Gn(!1);
            }
          }
          ci(!1);
        }
        ia();
      }
      return t.flags |= Ro, e !== null && m ? iM(e, t, C, d) : _a(e, t, C, d), t.memoizedState = b.state, u && P1(t, a, !0), t.child;
    }
    function ax(e) {
      var t = e.stateNode;
      t.pendingContext ? U1(e, t.pendingContext, t.pendingContext !== t.context) : t.context && U1(e, t.context, !1), XS(e, t.containerInfo);
    }
    function sM(e, t, a) {
      if (ax(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var o = t.pendingProps, u = t.memoizedState, d = u.element;
      lT(e, t), ky(t, o, null, a);
      var m = t.memoizedState;
      t.stateNode;
      var b = m.element;
      if (u.isDehydrated) {
        var C = {
          element: b,
          isDehydrated: !1,
          cache: m.cache,
          pendingSuspenseBoundaries: m.pendingSuspenseBoundaries,
          transitions: m.transitions
        }, x = t.updateQueue;
        if (x.baseState = C, t.memoizedState = C, t.flags & zn) {
          var k = hc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return ix(e, t, b, a, k);
        } else if (b !== d) {
          var V = hc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return ix(e, t, b, a, V);
        } else {
          dD(t);
          var F = eT(t, null, b, a);
          t.child = F;
          for (var Z = F; Z; )
            Z.flags = Z.flags & ~bn | Va, Z = Z.sibling;
        }
      } else {
        if (rd(), b === d)
          return Vl(e, t, a);
        _a(e, t, b, a);
      }
      return t.child;
    }
    function ix(e, t, a, o, u) {
      return rd(), zS(u), t.flags |= zn, _a(e, t, a, o), t.child;
    }
    function cM(e, t, a) {
      fT(t), e === null && LS(t);
      var o = t.type, u = t.pendingProps, d = e !== null ? e.memoizedProps : null, m = u.children, b = hS(o, u);
      return b ? m = null : d !== null && hS(o, d) && (t.flags |= Xt), nx(e, t), _a(e, t, m, a), t.child;
    }
    function fM(e, t) {
      return e === null && LS(t), null;
    }
    function dM(e, t, a, o) {
      tg(e, t);
      var u = t.pendingProps, d = a, m = d._payload, b = d._init, C = b(m);
      t.type = C;
      var x = t.tag = fN(C), k = uo(C, u), V;
      switch (x) {
        case w:
          return Xb(t, C), t.type = C = Cd(C), V = Qb(null, t, C, k, o), V;
        case _:
          return t.type = C = _C(C), V = rx(null, t, C, k, o), V;
        case I:
          return t.type = C = kC(C), V = ZT(null, t, C, k, o), V;
        case de: {
          if (t.type !== t.elementType) {
            var F = C.propTypes;
            F && ro(
              F,
              k,
              // Resolved for outer only
              "prop",
              en(C)
            );
          }
          return V = JT(
            null,
            t,
            C,
            uo(C.type, k),
            // The inner type can have defaults too
            o
          ), V;
        }
      }
      var Z = "";
      throw C !== null && typeof C == "object" && C.$$typeof === bt && (Z = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + C + ". " + ("Lazy element type must resolve to a class or function." + Z));
    }
    function pM(e, t, a, o, u) {
      tg(e, t), t.tag = _;
      var d;
      return Fo(a) ? (d = !0, fy(t)) : d = !1, od(t, u), WT(t, a, o), $b(t, a, o, u), Kb(null, t, a, !0, d, u);
    }
    function vM(e, t, a, o) {
      tg(e, t);
      var u = t.pendingProps, d;
      {
        var m = Jf(t, a, !1);
        d = ed(t, m);
      }
      od(t, o);
      var b, C;
      hu(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var x = en(a) || "Unknown";
          Ib[x] || (h("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", x, x), Ib[x] = !0);
        }
        t.mode & Ut && io.recordLegacyContextWarning(t, null), ci(!0), _v.current = t, b = dd(null, t, a, u, d, o), C = pd(), ci(!1);
      }
      if (ia(), t.flags |= Ro, typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0) {
        var k = en(a) || "Unknown";
        kv[k] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", k, k, k), kv[k] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof b == "object" && b !== null && typeof b.render == "function" && b.$$typeof === void 0
      ) {
        {
          var V = en(a) || "Unknown";
          kv[V] || (h("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", V, V, V), kv[V] = !0);
        }
        t.tag = _, t.memoizedState = null, t.updateQueue = null;
        var F = !1;
        return Fo(a) ? (F = !0, fy(t)) : F = !1, t.memoizedState = b.state !== null && b.state !== void 0 ? b.state : null, QS(t), YT(t, b), $b(t, a, u, o), Kb(null, t, a, !0, F, o);
      } else {
        if (t.tag = w, t.mode & Ut) {
          Gn(!0);
          try {
            b = dd(null, t, a, u, d, o), C = pd();
          } finally {
            Gn(!1);
          }
        }
        return Vr() && C && OS(t), _a(null, t, b, o), Xb(t, a), t.child;
      }
    }
    function Xb(e, t) {
      {
        if (t && t.childContextTypes && h("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", o = ja();
          o && (a += `

Check the render method of \`` + o + "`.");
          var u = o || "", d = e._debugSource;
          d && (u = d.fileName + ":" + d.lineNumber), Gb[u] || (Gb[u] = !0, h("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var m = en(t) || "Unknown";
          Ov[m] || (h("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", m), Ov[m] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var b = en(t) || "Unknown";
          Wb[b] || (h("%s: Function components do not support getDerivedStateFromProps.", b), Wb[b] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var C = en(t) || "Unknown";
          Yb[C] || (h("%s: Function components do not support contextType.", C), Yb[C] = !0);
        }
      }
    }
    var Zb = {
      dehydrated: null,
      treeContext: null,
      retryLane: qn
    };
    function Jb(e) {
      return {
        baseLanes: e,
        cachePool: aM(),
        transitions: null
      };
    }
    function hM(e, t) {
      var a = null;
      return {
        baseLanes: Dt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function mM(e, t, a, o) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return eb(e, gv);
    }
    function yM(e, t) {
      return Ys(e.childLanes, t);
    }
    function ox(e, t, a) {
      var o = t.pendingProps;
      RN(t) && (t.flags |= wt);
      var u = oo.current, d = !1, m = (t.flags & wt) !== dt;
      if (m || mM(u, e) ? (d = !0, t.flags &= ~wt) : (e === null || e.memoizedState !== null) && (u = zD(u, pT)), u = ud(u), Ku(t, u), e === null) {
        LS(t);
        var b = t.memoizedState;
        if (b !== null) {
          var C = b.dehydrated;
          if (C !== null)
            return EM(t, C);
        }
        var x = o.children, k = o.fallback;
        if (d) {
          var V = gM(t, x, k, a), F = t.child;
          return F.memoizedState = Jb(a), t.memoizedState = Zb, V;
        } else
          return eC(t, x);
      } else {
        var Z = e.memoizedState;
        if (Z !== null) {
          var te = Z.dehydrated;
          if (te !== null)
            return TM(e, t, m, o, te, Z, a);
        }
        if (d) {
          var oe = o.fallback, Pe = o.children, ht = bM(e, t, Pe, oe, a), ut = t.child, Bt = e.child.memoizedState;
          return ut.memoizedState = Bt === null ? Jb(a) : hM(Bt, a), ut.childLanes = yM(e, a), t.memoizedState = Zb, ht;
        } else {
          var Ft = o.children, Q = SM(e, t, Ft, a);
          return t.memoizedState = null, Q;
        }
      }
    }
    function eC(e, t, a) {
      var o = e.mode, u = {
        mode: "visible",
        children: t
      }, d = tC(u, o);
      return d.return = e, e.child = d, d;
    }
    function gM(e, t, a, o) {
      var u = e.mode, d = e.child, m = {
        mode: "hidden",
        children: t
      }, b, C;
      return (u & lt) === rt && d !== null ? (b = d, b.childLanes = me, b.pendingProps = m, e.mode & Rt && (b.actualDuration = 0, b.actualStartTime = -1, b.selfBaseDuration = 0, b.treeBaseDuration = 0), C = as(a, u, o, null)) : (b = tC(m, u), C = as(a, u, o, null)), b.return = e, C.return = e, b.sibling = C, e.child = b, C;
    }
    function tC(e, t, a) {
      return lw(e, t, me, null);
    }
    function lx(e, t) {
      return Cc(e, t);
    }
    function SM(e, t, a, o) {
      var u = e.child, d = u.sibling, m = lx(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & lt) === rt && (m.lanes = o), m.return = t, m.sibling = null, d !== null) {
        var b = t.deletions;
        b === null ? (t.deletions = [d], t.flags |= Qt) : b.push(d);
      }
      return t.child = m, m;
    }
    function bM(e, t, a, o, u) {
      var d = t.mode, m = e.child, b = m.sibling, C = {
        mode: "hidden",
        children: a
      }, x;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (d & lt) === rt && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== m
      ) {
        var k = t.child;
        x = k, x.childLanes = me, x.pendingProps = C, t.mode & Rt && (x.actualDuration = 0, x.actualStartTime = -1, x.selfBaseDuration = m.selfBaseDuration, x.treeBaseDuration = m.treeBaseDuration), t.deletions = null;
      } else
        x = lx(m, C), x.subtreeFlags = m.subtreeFlags & br;
      var V;
      return b !== null ? V = Cc(b, o) : (V = as(o, d, u, null), V.flags |= bn), V.return = t, x.return = t, x.sibling = V, t.child = x, V;
    }
    function eg(e, t, a, o) {
      o !== null && zS(o), ad(t, e.child, null, a);
      var u = t.pendingProps, d = u.children, m = eC(t, d);
      return m.flags |= bn, t.memoizedState = null, m;
    }
    function CM(e, t, a, o, u) {
      var d = t.mode, m = {
        mode: "visible",
        children: a
      }, b = tC(m, d), C = as(o, d, u, null);
      return C.flags |= bn, b.return = t, C.return = t, b.sibling = C, t.child = b, (t.mode & lt) !== rt && ad(t, e.child, null, u), C;
    }
    function EM(e, t, a) {
      return (e.mode & lt) === rt ? (h("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = ft) : SS(t) ? e.lanes = Zi : e.lanes = Ur, null;
    }
    function TM(e, t, a, o, u, d, m) {
      if (a)
        if (t.flags & zn) {
          t.flags &= ~zn;
          var Q = Vb(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return eg(e, t, m, Q);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= wt, null;
          var le = o.children, K = o.fallback, Ee = CM(e, t, le, K, m), Ye = t.child;
          return Ye.memoizedState = Jb(m), t.memoizedState = Zb, Ee;
        }
      else {
        if (cD(), (t.mode & lt) === rt)
          return eg(
            e,
            t,
            m,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (SS(u)) {
          var b, C, x;
          {
            var k = _O(u);
            b = k.digest, C = k.message, x = k.stack;
          }
          var V;
          C ? V = new Error(C) : V = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var F = Vb(V, b, x);
          return eg(e, t, m, F);
        }
        var Z = ua(m, e.childLanes);
        if (so || Z) {
          var te = fg();
          if (te !== null) {
            var oe = Rm(te, m);
            if (oe !== qn && oe !== d.retryLane) {
              d.retryLane = oe;
              var Pe = gn;
              Ja(e, oe), Dr(te, e, oe, Pe);
            }
          }
          EC();
          var ht = Vb(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return eg(e, t, m, ht);
        } else if (D1(u)) {
          t.flags |= wt, t.child = e.child;
          var ut = qA.bind(null, e);
          return kO(u, ut), null;
        } else {
          pD(t, u, d.treeContext);
          var Bt = o.children, Ft = eC(t, Bt);
          return Ft.flags |= Va, Ft;
        }
      }
    }
    function ux(e, t, a) {
      e.lanes = Dt(e.lanes, t);
      var o = e.alternate;
      o !== null && (o.lanes = Dt(o.lanes, t)), YS(e.return, t, a);
    }
    function xM(e, t, a) {
      for (var o = t; o !== null; ) {
        if (o.tag === U) {
          var u = o.memoizedState;
          u !== null && ux(o, a, e);
        } else if (o.tag === _e)
          ux(o, a, e);
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
    function wM(e) {
      for (var t = e, a = null; t !== null; ) {
        var o = t.alternate;
        o !== null && Ay(o) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function RM(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !qb[e])
        if (qb[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              h('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              h('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          h('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function _M(e, t) {
      e !== void 0 && !Jy[e] && (e !== "collapsed" && e !== "hidden" ? (Jy[e] = !0, h('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Jy[e] = !0, h('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function sx(e, t) {
      {
        var a = fr(e), o = !a && typeof Sa(e) == "function";
        if (a || o) {
          var u = a ? "array" : "iterable";
          return h("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function kM(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (fr(e)) {
          for (var a = 0; a < e.length; a++)
            if (!sx(e[a], a))
              return;
        } else {
          var o = Sa(e);
          if (typeof o == "function") {
            var u = o.call(e);
            if (u)
              for (var d = u.next(), m = 0; !d.done; d = u.next()) {
                if (!sx(d.value, m))
                  return;
                m++;
              }
          } else
            h('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function nC(e, t, a, o, u) {
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
    function cx(e, t, a) {
      var o = t.pendingProps, u = o.revealOrder, d = o.tail, m = o.children;
      RM(u), _M(d, u), kM(m, u), _a(e, t, m, a);
      var b = oo.current, C = eb(b, gv);
      if (C)
        b = tb(b, gv), t.flags |= wt;
      else {
        var x = e !== null && (e.flags & wt) !== dt;
        x && xM(t, t.child, a), b = ud(b);
      }
      if (Ku(t, b), (t.mode & lt) === rt)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var k = wM(t.child), V;
            k === null ? (V = t.child, t.child = null) : (V = k.sibling, k.sibling = null), nC(
              t,
              !1,
              // isBackwards
              V,
              k,
              d
            );
            break;
          }
          case "backwards": {
            var F = null, Z = t.child;
            for (t.child = null; Z !== null; ) {
              var te = Z.alternate;
              if (te !== null && Ay(te) === null) {
                t.child = Z;
                break;
              }
              var oe = Z.sibling;
              Z.sibling = F, F = Z, Z = oe;
            }
            nC(
              t,
              !0,
              // isBackwards
              F,
              null,
              // last
              d
            );
            break;
          }
          case "together": {
            nC(
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
    function OM(e, t, a) {
      XS(t, t.stateNode.containerInfo);
      var o = t.pendingProps;
      return e === null ? t.child = ad(t, null, o, a) : _a(e, t, o, a), t.child;
    }
    var fx = !1;
    function DM(e, t, a) {
      var o = t.type, u = o._context, d = t.pendingProps, m = t.memoizedProps, b = d.value;
      {
        "value" in d || fx || (fx = !0, h("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var C = t.type.propTypes;
        C && ro(C, d, "prop", "Context.Provider");
      }
      if (rT(t, u, b), m !== null) {
        var x = m.value;
        if (Qe(x, b)) {
          if (m.children === d.children && !sy())
            return Vl(e, t, a);
        } else
          RD(t, u, a);
      }
      var k = d.children;
      return _a(e, t, k, a), t.child;
    }
    var dx = !1;
    function MM(e, t, a) {
      var o = t.type;
      o._context === void 0 ? o !== o.Consumer && (dx || (dx = !0, h("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : o = o._context;
      var u = t.pendingProps, d = u.children;
      typeof d != "function" && h("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), od(t, a);
      var m = yr(o);
      hu(t);
      var b;
      return _v.current = t, ci(!0), b = d(m), ci(!1), ia(), t.flags |= Ro, _a(e, t, b, a), t.child;
    }
    function Dv() {
      so = !0;
    }
    function tg(e, t) {
      (t.mode & lt) === rt && e !== null && (e.alternate = null, t.alternate = null, t.flags |= bn);
    }
    function Vl(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), VT(), Bv(t.lanes), ua(a, t.childLanes) ? (xD(e, t), t.child) : null;
    }
    function AM(e, t, a) {
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
        return d === null ? (o.deletions = [e], o.flags |= Qt) : d.push(e), a.flags |= bn, a;
      }
    }
    function rC(e, t) {
      var a = e.lanes;
      return !!ua(a, t);
    }
    function NM(e, t, a) {
      switch (t.tag) {
        case O:
          ax(t), t.stateNode, rd();
          break;
        case H:
          fT(t);
          break;
        case _: {
          var o = t.type;
          Fo(o) && fy(t);
          break;
        }
        case L:
          XS(t, t.stateNode.containerInfo);
          break;
        case ae: {
          var u = t.memoizedProps.value, d = t.type._context;
          rT(t, d, u);
          break;
        }
        case J:
          {
            var m = ua(a, t.childLanes);
            m && (t.flags |= Mt);
            {
              var b = t.stateNode;
              b.effectDuration = 0, b.passiveEffectDuration = 0;
            }
          }
          break;
        case U: {
          var C = t.memoizedState;
          if (C !== null) {
            if (C.dehydrated !== null)
              return Ku(t, ud(oo.current)), t.flags |= wt, null;
            var x = t.child, k = x.childLanes;
            if (ua(a, k))
              return ox(e, t, a);
            Ku(t, ud(oo.current));
            var V = Vl(e, t, a);
            return V !== null ? V.sibling : null;
          } else
            Ku(t, ud(oo.current));
          break;
        }
        case _e: {
          var F = (e.flags & wt) !== dt, Z = ua(a, t.childLanes);
          if (F) {
            if (Z)
              return cx(e, t, a);
            t.flags |= wt;
          }
          var te = t.memoizedState;
          if (te !== null && (te.rendering = null, te.tail = null, te.lastEffect = null), Ku(t, oo.current), Z)
            break;
          return null;
        }
        case ve:
        case Re:
          return t.lanes = me, tx(e, t, a);
      }
      return Vl(e, t, a);
    }
    function px(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return AM(e, t, NC(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var o = e.memoizedProps, u = t.pendingProps;
        if (o !== u || sy() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          so = !0;
        else {
          var d = rC(e, a);
          if (!d && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & wt) === dt)
            return so = !1, NM(e, t, a);
          (e.flags & zs) !== dt ? so = !0 : so = !1;
        }
      } else if (so = !1, Vr() && aD(t)) {
        var m = t.index, b = iD();
        V1(t, b, m);
      }
      switch (t.lanes = me, t.tag) {
        case A:
          return vM(e, t, t.type, a);
        case Xe: {
          var C = t.elementType;
          return dM(e, t, C, a);
        }
        case w: {
          var x = t.type, k = t.pendingProps, V = t.elementType === x ? k : uo(x, k);
          return Qb(e, t, x, V, a);
        }
        case _: {
          var F = t.type, Z = t.pendingProps, te = t.elementType === F ? Z : uo(F, Z);
          return rx(e, t, F, te, a);
        }
        case O:
          return sM(e, t, a);
        case H:
          return cM(e, t, a);
        case Y:
          return fM(e, t);
        case U:
          return ox(e, t, a);
        case L:
          return OM(e, t, a);
        case I: {
          var oe = t.type, Pe = t.pendingProps, ht = t.elementType === oe ? Pe : uo(oe, Pe);
          return ZT(e, t, oe, ht, a);
        }
        case B:
          return oM(e, t, a);
        case P:
          return lM(e, t, a);
        case J:
          return uM(e, t, a);
        case ae:
          return DM(e, t, a);
        case se:
          return MM(e, t, a);
        case de: {
          var ut = t.type, Bt = t.pendingProps, Ft = uo(ut, Bt);
          if (t.type !== t.elementType) {
            var Q = ut.propTypes;
            Q && ro(
              Q,
              Ft,
              // Resolved for outer only
              "prop",
              en(ut)
            );
          }
          return Ft = uo(ut.type, Ft), JT(e, t, ut, Ft, a);
        }
        case ie:
          return ex(e, t, t.type, t.pendingProps, a);
        case D: {
          var le = t.type, K = t.pendingProps, Ee = t.elementType === le ? K : uo(le, K);
          return pM(e, t, le, Ee, a);
        }
        case _e:
          return cx(e, t, a);
        case he:
          break;
        case ve:
          return tx(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function vd(e) {
      e.flags |= Mt;
    }
    function vx(e) {
      e.flags |= ea, e.flags |= mp;
    }
    var hx, aC, mx, yx;
    hx = function(e, t, a, o) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === H || u.tag === Y)
          tO(e, u.stateNode);
        else if (u.tag !== L) {
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
    }, aC = function(e, t) {
    }, mx = function(e, t, a, o, u) {
      var d = e.memoizedProps;
      if (d !== o) {
        var m = t.stateNode, b = ZS(), C = rO(m, a, d, o, u, b);
        t.updateQueue = C, C && vd(t);
      }
    }, yx = function(e, t, a, o) {
      a !== o && vd(t);
    };
    function Mv(e, t) {
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
      var t = e.alternate !== null && e.alternate.child === e.child, a = me, o = dt;
      if (t) {
        if ((e.mode & Rt) !== rt) {
          for (var C = e.selfBaseDuration, x = e.child; x !== null; )
            a = Dt(a, Dt(x.lanes, x.childLanes)), o |= x.subtreeFlags & br, o |= x.flags & br, C += x.treeBaseDuration, x = x.sibling;
          e.treeBaseDuration = C;
        } else
          for (var k = e.child; k !== null; )
            a = Dt(a, Dt(k.lanes, k.childLanes)), o |= k.subtreeFlags & br, o |= k.flags & br, k.return = e, k = k.sibling;
        e.subtreeFlags |= o;
      } else {
        if ((e.mode & Rt) !== rt) {
          for (var u = e.actualDuration, d = e.selfBaseDuration, m = e.child; m !== null; )
            a = Dt(a, Dt(m.lanes, m.childLanes)), o |= m.subtreeFlags, o |= m.flags, u += m.actualDuration, d += m.treeBaseDuration, m = m.sibling;
          e.actualDuration = u, e.treeBaseDuration = d;
        } else
          for (var b = e.child; b !== null; )
            a = Dt(a, Dt(b.lanes, b.childLanes)), o |= b.subtreeFlags, o |= b.flags, b.return = e, b = b.sibling;
        e.subtreeFlags |= o;
      }
      return e.childLanes = a, t;
    }
    function LM(e, t, a) {
      if (gD() && (t.mode & lt) !== rt && (t.flags & wt) === dt)
        return q1(t), rd(), t.flags |= zn | Ca | pr, !1;
      var o = my(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!o)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (mD(t), Hr(t), (t.mode & Rt) !== rt) {
            var u = a !== null;
            if (u) {
              var d = t.child;
              d !== null && (t.treeBaseDuration -= d.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (rd(), (t.flags & wt) === dt && (t.memoizedState = null), t.flags |= Mt, Hr(t), (t.mode & Rt) !== rt) {
            var m = a !== null;
            if (m) {
              var b = t.child;
              b !== null && (t.treeBaseDuration -= b.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return Q1(), !0;
    }
    function gx(e, t, a) {
      var o = t.pendingProps;
      switch (DS(t), t.tag) {
        case A:
        case Xe:
        case ie:
        case w:
        case I:
        case B:
        case P:
        case J:
        case se:
        case de:
          return Hr(t), null;
        case _: {
          var u = t.type;
          return Fo(u) && cy(t), Hr(t), null;
        }
        case O: {
          var d = t.stateNode;
          if (ld(t), RS(t), rb(), d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null), e === null || e.child === null) {
            var m = my(t);
            if (m)
              vd(t);
            else if (e !== null) {
              var b = e.memoizedState;
              // Check if this is a client root
              (!b.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & zn) !== dt) && (t.flags |= $a, Q1());
            }
          }
          return aC(e, t), Hr(t), null;
        }
        case H: {
          JS(t);
          var C = cT(), x = t.type;
          if (e !== null && t.stateNode != null)
            mx(e, t, x, o, C), e.ref !== t.ref && vx(t);
          else {
            if (!o) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Hr(t), null;
            }
            var k = ZS(), V = my(t);
            if (V)
              vD(t, C, k) && vd(t);
            else {
              var F = eO(x, o, C, k, t);
              hx(F, t, !1, !1), t.stateNode = F, nO(F, x, o, C) && vd(t);
            }
            t.ref !== null && vx(t);
          }
          return Hr(t), null;
        }
        case Y: {
          var Z = o;
          if (e && t.stateNode != null) {
            var te = e.memoizedProps;
            yx(e, t, te, Z);
          } else {
            if (typeof Z != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var oe = cT(), Pe = ZS(), ht = my(t);
            ht ? hD(t) && vd(t) : t.stateNode = aO(Z, oe, Pe, t);
          }
          return Hr(t), null;
        }
        case U: {
          sd(t);
          var ut = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Bt = LM(e, t, ut);
            if (!Bt)
              return t.flags & pr ? t : null;
          }
          if ((t.flags & wt) !== dt)
            return t.lanes = a, (t.mode & Rt) !== rt && kb(t), t;
          var Ft = ut !== null, Q = e !== null && e.memoizedState !== null;
          if (Ft !== Q && Ft) {
            var le = t.child;
            if (le.flags |= _o, (t.mode & lt) !== rt) {
              var K = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !pe);
              K || eb(oo.current, pT) ? zA() : EC();
            }
          }
          var Ee = t.updateQueue;
          if (Ee !== null && (t.flags |= Mt), Hr(t), (t.mode & Rt) !== rt && Ft) {
            var Ye = t.child;
            Ye !== null && (t.treeBaseDuration -= Ye.treeBaseDuration);
          }
          return null;
        }
        case L:
          return ld(t), aC(e, t), e === null && XO(t.stateNode.containerInfo), Hr(t), null;
        case ae:
          var Ve = t.type._context;
          return IS(Ve, t), Hr(t), null;
        case D: {
          var Tt = t.type;
          return Fo(Tt) && cy(t), Hr(t), null;
        }
        case _e: {
          sd(t);
          var kt = t.memoizedState;
          if (kt === null)
            return Hr(t), null;
          var ln = (t.flags & wt) !== dt, Yt = kt.rendering;
          if (Yt === null)
            if (ln)
              Mv(kt, !1);
            else {
              var ir = jA() && (e === null || (e.flags & wt) === dt);
              if (!ir)
                for (var Wt = t.child; Wt !== null; ) {
                  var Qn = Ay(Wt);
                  if (Qn !== null) {
                    ln = !0, t.flags |= wt, Mv(kt, !1);
                    var pa = Qn.updateQueue;
                    return pa !== null && (t.updateQueue = pa, t.flags |= Mt), t.subtreeFlags = dt, wD(t, a), Ku(t, tb(oo.current, gv)), t.child;
                  }
                  Wt = Wt.sibling;
                }
              kt.tail !== null && Mn() > Fx() && (t.flags |= wt, ln = !0, Mv(kt, !1), t.lanes = hm);
            }
          else {
            if (!ln) {
              var qr = Ay(Yt);
              if (qr !== null) {
                t.flags |= wt, ln = !0;
                var yi = qr.updateQueue;
                if (yi !== null && (t.updateQueue = yi, t.flags |= Mt), Mv(kt, !0), kt.tail === null && kt.tailMode === "hidden" && !Yt.alternate && !Vr())
                  return Hr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Mn() * 2 - kt.renderingStartTime > Fx() && a !== Ur && (t.flags |= wt, ln = !0, Mv(kt, !1), t.lanes = hm);
            }
            if (kt.isBackwards)
              Yt.sibling = t.child, t.child = Yt;
            else {
              var Da = kt.last;
              Da !== null ? Da.sibling = Yt : t.child = Yt, kt.last = Yt;
            }
          }
          if (kt.tail !== null) {
            var Ma = kt.tail;
            kt.rendering = Ma, kt.tail = Ma.sibling, kt.renderingStartTime = Mn(), Ma.sibling = null;
            var va = oo.current;
            return ln ? va = tb(va, gv) : va = ud(va), Ku(t, va), Ma;
          }
          return Hr(t), null;
        }
        case he:
          break;
        case ve:
        case Re: {
          CC(t);
          var Wl = t.memoizedState, Ed = Wl !== null;
          if (e !== null) {
            var Gv = e.memoizedState, Go = Gv !== null;
            Go !== Ed && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !W && (t.flags |= _o);
          }
          return !Ed || (t.mode & lt) === rt ? Hr(t) : ua(Wo, Ur) && (Hr(t), t.subtreeFlags & (bn | Mt) && (t.flags |= _o)), null;
        }
        case it:
          return null;
        case Be:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function zM(e, t, a) {
      switch (DS(t), t.tag) {
        case _: {
          var o = t.type;
          Fo(o) && cy(t);
          var u = t.flags;
          return u & pr ? (t.flags = u & ~pr | wt, (t.mode & Rt) !== rt && kb(t), t) : null;
        }
        case O: {
          t.stateNode, ld(t), RS(t), rb();
          var d = t.flags;
          return (d & pr) !== dt && (d & wt) === dt ? (t.flags = d & ~pr | wt, t) : null;
        }
        case H:
          return JS(t), null;
        case U: {
          sd(t);
          var m = t.memoizedState;
          if (m !== null && m.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            rd();
          }
          var b = t.flags;
          return b & pr ? (t.flags = b & ~pr | wt, (t.mode & Rt) !== rt && kb(t), t) : null;
        }
        case _e:
          return sd(t), null;
        case L:
          return ld(t), null;
        case ae:
          var C = t.type._context;
          return IS(C, t), null;
        case ve:
        case Re:
          return CC(t), null;
        case it:
          return null;
        default:
          return null;
      }
    }
    function Sx(e, t, a) {
      switch (DS(t), t.tag) {
        case _: {
          var o = t.type.childContextTypes;
          o != null && cy(t);
          break;
        }
        case O: {
          t.stateNode, ld(t), RS(t), rb();
          break;
        }
        case H: {
          JS(t);
          break;
        }
        case L:
          ld(t);
          break;
        case U:
          sd(t);
          break;
        case _e:
          sd(t);
          break;
        case ae:
          var u = t.type._context;
          IS(u, t);
          break;
        case ve:
        case Re:
          CC(t);
          break;
      }
    }
    var bx = null;
    bx = /* @__PURE__ */ new Set();
    var ng = !1, Ir = !1, UM = typeof WeakSet == "function" ? WeakSet : Set, Ke = null, hd = null, md = null;
    function jM(e) {
      yl(null, function() {
        throw e;
      }), vp();
    }
    var PM = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Rt)
        try {
          Io(), t.componentWillUnmount();
        } finally {
          Ho(e);
        }
      else
        t.componentWillUnmount();
    };
    function Cx(e, t) {
      try {
        Ju(xr, e);
      } catch (a) {
        Tn(e, t, a);
      }
    }
    function iC(e, t, a) {
      try {
        PM(e, a);
      } catch (o) {
        Tn(e, t, o);
      }
    }
    function FM(e, t, a) {
      try {
        a.componentDidMount();
      } catch (o) {
        Tn(e, t, o);
      }
    }
    function Ex(e, t) {
      try {
        xx(e);
      } catch (a) {
        Tn(e, t, a);
      }
    }
    function yd(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var o;
          try {
            if (We && ot && e.mode & Rt)
              try {
                Io(), o = a(null);
              } finally {
                Ho(e);
              }
            else
              o = a(null);
          } catch (u) {
            Tn(e, t, u);
          }
          typeof o == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ot(e));
        } else
          a.current = null;
    }
    function rg(e, t, a) {
      try {
        a();
      } catch (o) {
        Tn(e, t, o);
      }
    }
    var Tx = !1;
    function $M(e, t) {
      Zk(e.containerInfo), Ke = t, VM();
      var a = Tx;
      return Tx = !1, a;
    }
    function VM() {
      for (; Ke !== null; ) {
        var e = Ke, t = e.child;
        (e.subtreeFlags & du) !== dt && t !== null ? (t.return = e, Ke = t) : BM();
      }
    }
    function BM() {
      for (; Ke !== null; ) {
        var e = Ke;
        an(e);
        try {
          HM(e);
        } catch (a) {
          Tn(e, e.return, a);
        }
        Jn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ke = t;
          return;
        }
        Ke = e.return;
      }
    }
    function HM(e) {
      var t = e.alternate, a = e.flags;
      if ((a & $a) !== dt) {
        switch (an(e), e.tag) {
          case w:
          case I:
          case ie:
            break;
          case _: {
            if (t !== null) {
              var o = t.memoizedProps, u = t.memoizedState, d = e.stateNode;
              e.type === e.elementType && !mc && (d.props !== e.memoizedProps && h("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ot(e) || "instance"), d.state !== e.memoizedState && h("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ot(e) || "instance"));
              var m = d.getSnapshotBeforeUpdate(e.elementType === e.type ? o : uo(e.type, o), u);
              {
                var b = bx;
                m === void 0 && !b.has(e.type) && (b.add(e.type), h("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ot(e)));
              }
              d.__reactInternalSnapshotBeforeUpdate = m;
            }
            break;
          }
          case O: {
            {
              var C = e.stateNode;
              TO(C.containerInfo);
            }
            break;
          }
          case H:
          case Y:
          case L:
          case D:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        Jn();
      }
    }
    function co(e, t, a) {
      var o = t.updateQueue, u = o !== null ? o.lastEffect : null;
      if (u !== null) {
        var d = u.next, m = d;
        do {
          if ((m.tag & e) === e) {
            var b = m.destroy;
            m.destroy = void 0, b !== void 0 && ((e & Br) !== ei ? dm(t) : (e & xr) !== ei && vi(t), (e & $o) !== ei && Iv(!0), rg(t, a, b), (e & $o) !== ei && Iv(!1), (e & Br) !== ei ? nf() : (e & xr) !== ei && mu());
          }
          m = m.next;
        } while (m !== d);
      }
    }
    function Ju(e, t) {
      var a = t.updateQueue, o = a !== null ? a.lastEffect : null;
      if (o !== null) {
        var u = o.next, d = u;
        do {
          if ((d.tag & e) === e) {
            (e & Br) !== ei ? Do(t) : (e & xr) !== ei && pm(t);
            var m = d.create;
            (e & $o) !== ei && Iv(!0), d.destroy = m(), (e & $o) !== ei && Iv(!1), (e & Br) !== ei ? tf() : (e & xr) !== ei && Us();
            {
              var b = d.destroy;
              if (b !== void 0 && typeof b != "function") {
                var C = void 0;
                (d.tag & xr) !== dt ? C = "useLayoutEffect" : (d.tag & $o) !== dt ? C = "useInsertionEffect" : C = "useEffect";
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

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : x = " You returned: " + b, h("%s must not return anything besides a function, which is used for clean-up.%s", C, x);
              }
            }
          }
          d = d.next;
        } while (d !== u);
      }
    }
    function IM(e, t) {
      if ((t.flags & Mt) !== dt)
        switch (t.tag) {
          case J: {
            var a = t.stateNode.passiveEffectDuration, o = t.memoizedProps, u = o.id, d = o.onPostCommit, m = FT(), b = t.alternate === null ? "mount" : "update";
            PT() && (b = "nested-update"), typeof d == "function" && d(u, b, a, m);
            var C = t.return;
            e: for (; C !== null; ) {
              switch (C.tag) {
                case O:
                  var x = C.stateNode;
                  x.passiveEffectDuration += a;
                  break e;
                case J:
                  var k = C.stateNode;
                  k.passiveEffectDuration += a;
                  break e;
              }
              C = C.return;
            }
            break;
          }
        }
    }
    function YM(e, t, a, o) {
      if ((a.flags & Lr) !== dt)
        switch (a.tag) {
          case w:
          case I:
          case ie: {
            if (!Ir)
              if (a.mode & Rt)
                try {
                  Io(), Ju(xr | Tr, a);
                } finally {
                  Ho(a);
                }
              else
                Ju(xr | Tr, a);
            break;
          }
          case _: {
            var u = a.stateNode;
            if (a.flags & Mt && !Ir)
              if (t === null)
                if (a.type === a.elementType && !mc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ot(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ot(a) || "instance")), a.mode & Rt)
                  try {
                    Io(), u.componentDidMount();
                  } finally {
                    Ho(a);
                  }
                else
                  u.componentDidMount();
              else {
                var d = a.elementType === a.type ? t.memoizedProps : uo(a.type, t.memoizedProps), m = t.memoizedState;
                if (a.type === a.elementType && !mc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ot(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ot(a) || "instance")), a.mode & Rt)
                  try {
                    Io(), u.componentDidUpdate(d, m, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ho(a);
                  }
                else
                  u.componentDidUpdate(d, m, u.__reactInternalSnapshotBeforeUpdate);
              }
            var b = a.updateQueue;
            b !== null && (a.type === a.elementType && !mc && (u.props !== a.memoizedProps && h("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ot(a) || "instance"), u.state !== a.memoizedState && h("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ot(a) || "instance")), sT(a, b, u));
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
                  case _:
                    x = a.child.stateNode;
                    break;
                }
              sT(a, C, x);
            }
            break;
          }
          case H: {
            var k = a.stateNode;
            if (t === null && a.flags & Mt) {
              var V = a.type, F = a.memoizedProps;
              sO(k, V, F);
            }
            break;
          }
          case Y:
            break;
          case L:
            break;
          case J: {
            {
              var Z = a.memoizedProps, te = Z.onCommit, oe = Z.onRender, Pe = a.stateNode.effectDuration, ht = FT(), ut = t === null ? "mount" : "update";
              PT() && (ut = "nested-update"), typeof oe == "function" && oe(a.memoizedProps.id, ut, a.actualDuration, a.treeBaseDuration, a.actualStartTime, ht);
              {
                typeof te == "function" && te(a.memoizedProps.id, ut, Pe, ht), BA(a);
                var Bt = a.return;
                e: for (; Bt !== null; ) {
                  switch (Bt.tag) {
                    case O:
                      var Ft = Bt.stateNode;
                      Ft.effectDuration += Pe;
                      break e;
                    case J:
                      var Q = Bt.stateNode;
                      Q.effectDuration += Pe;
                      break e;
                  }
                  Bt = Bt.return;
                }
              }
            }
            break;
          }
          case U: {
            JM(e, a);
            break;
          }
          case _e:
          case D:
          case he:
          case ve:
          case Re:
          case Be:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ir || a.flags & ea && xx(a);
    }
    function WM(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          if (e.mode & Rt)
            try {
              Io(), Cx(e, e.return);
            } finally {
              Ho(e);
            }
          else
            Cx(e, e.return);
          break;
        }
        case _: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && FM(e, e.return, t), Ex(e, e.return);
          break;
        }
        case H: {
          Ex(e, e.return);
          break;
        }
      }
    }
    function GM(e, t) {
      for (var a = null, o = e; ; ) {
        if (o.tag === H) {
          if (a === null) {
            a = o;
            try {
              var u = o.stateNode;
              t ? SO(u) : CO(o.stateNode, o.memoizedProps);
            } catch (m) {
              Tn(e, e.return, m);
            }
          }
        } else if (o.tag === Y) {
          if (a === null)
            try {
              var d = o.stateNode;
              t ? bO(d) : EO(d, o.memoizedProps);
            } catch (m) {
              Tn(e, e.return, m);
            }
        } else if (!((o.tag === ve || o.tag === Re) && o.memoizedState !== null && o !== e)) {
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
    function xx(e) {
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
          if (e.mode & Rt)
            try {
              Io(), u = t(o);
            } finally {
              Ho(e);
            }
          else
            u = t(o);
          typeof u == "function" && h("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ot(e));
        } else
          t.hasOwnProperty("current") || h("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ot(e)), t.current = o;
      }
    }
    function qM(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function wx(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, wx(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === H) {
          var a = e.stateNode;
          a !== null && eD(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function QM(e) {
      for (var t = e.return; t !== null; ) {
        if (Rx(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Rx(e) {
      return e.tag === H || e.tag === O || e.tag === L;
    }
    function _x(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Rx(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== H && t.tag !== Y && t.tag !== ce; ) {
          if (t.flags & bn || t.child === null || t.tag === L)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & bn))
          return t.stateNode;
      }
    }
    function KM(e) {
      var t = QM(e);
      switch (t.tag) {
        case H: {
          var a = t.stateNode;
          t.flags & Xt && (O1(a), t.flags &= ~Xt);
          var o = _x(e);
          lC(e, o, a);
          break;
        }
        case O:
        case L: {
          var u = t.stateNode.containerInfo, d = _x(e);
          oC(e, d, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function oC(e, t, a) {
      var o = e.tag, u = o === H || o === Y;
      if (u) {
        var d = e.stateNode;
        t ? hO(a, d, t) : pO(a, d);
      } else if (o !== L) {
        var m = e.child;
        if (m !== null) {
          oC(m, t, a);
          for (var b = m.sibling; b !== null; )
            oC(b, t, a), b = b.sibling;
        }
      }
    }
    function lC(e, t, a) {
      var o = e.tag, u = o === H || o === Y;
      if (u) {
        var d = e.stateNode;
        t ? vO(a, d, t) : dO(a, d);
      } else if (o !== L) {
        var m = e.child;
        if (m !== null) {
          lC(m, t, a);
          for (var b = m.sibling; b !== null; )
            lC(b, t, a), b = b.sibling;
        }
      }
    }
    var Yr = null, fo = !1;
    function XM(e, t, a) {
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
            case L: {
              Yr = o.stateNode.containerInfo, fo = !0;
              break e;
            }
          }
          o = o.return;
        }
        if (Yr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        kx(e, t, a), Yr = null, fo = !1;
      }
      qM(a);
    }
    function es(e, t, a) {
      for (var o = a.child; o !== null; )
        kx(e, t, o), o = o.sibling;
    }
    function kx(e, t, a) {
      switch (bl(a), a.tag) {
        case H:
          Ir || yd(a, t);
        case Y: {
          {
            var o = Yr, u = fo;
            Yr = null, es(e, t, a), Yr = o, fo = u, Yr !== null && (fo ? yO(Yr, a.stateNode) : mO(Yr, a.stateNode));
          }
          return;
        }
        case ce: {
          Yr !== null && (fo ? gO(Yr, a.stateNode) : gS(Yr, a.stateNode));
          return;
        }
        case L: {
          {
            var d = Yr, m = fo;
            Yr = a.stateNode.containerInfo, fo = !0, es(e, t, a), Yr = d, fo = m;
          }
          return;
        }
        case w:
        case I:
        case de:
        case ie: {
          if (!Ir) {
            var b = a.updateQueue;
            if (b !== null) {
              var C = b.lastEffect;
              if (C !== null) {
                var x = C.next, k = x;
                do {
                  var V = k, F = V.destroy, Z = V.tag;
                  F !== void 0 && ((Z & $o) !== ei ? rg(a, t, F) : (Z & xr) !== ei && (vi(a), a.mode & Rt ? (Io(), rg(a, t, F), Ho(a)) : rg(a, t, F), mu())), k = k.next;
                } while (k !== x);
              }
            }
          }
          es(e, t, a);
          return;
        }
        case _: {
          if (!Ir) {
            yd(a, t);
            var te = a.stateNode;
            typeof te.componentWillUnmount == "function" && iC(a, t, te);
          }
          es(e, t, a);
          return;
        }
        case he: {
          es(e, t, a);
          return;
        }
        case ve: {
          if (
            // TODO: Remove this dead flag
            a.mode & lt
          ) {
            var oe = Ir;
            Ir = oe || a.memoizedState !== null, es(e, t, a), Ir = oe;
          } else
            es(e, t, a);
          break;
        }
        default: {
          es(e, t, a);
          return;
        }
      }
    }
    function ZM(e) {
      e.memoizedState;
    }
    function JM(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var o = t.alternate;
        if (o !== null) {
          var u = o.memoizedState;
          if (u !== null) {
            var d = u.dehydrated;
            d !== null && jO(d);
          }
        }
      }
    }
    function Ox(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new UM()), t.forEach(function(o) {
          var u = QA.bind(null, e, o);
          if (!a.has(o)) {
            if (a.add(o), xa)
              if (hd !== null && md !== null)
                Hv(md, hd);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            o.then(u, u);
          }
        });
      }
    }
    function eA(e, t, a) {
      hd = a, md = e, an(t), Dx(t, e), an(t), hd = null, md = null;
    }
    function po(e, t, a) {
      var o = t.deletions;
      if (o !== null)
        for (var u = 0; u < o.length; u++) {
          var d = o[u];
          try {
            XM(e, t, d);
          } catch (C) {
            Tn(d, t, C);
          }
        }
      var m = S0();
      if (t.subtreeFlags & ra)
        for (var b = t.child; b !== null; )
          an(b), Dx(b, e), b = b.sibling;
      an(m);
    }
    function Dx(e, t, a) {
      var o = e.alternate, u = e.flags;
      switch (e.tag) {
        case w:
        case I:
        case de:
        case ie: {
          if (po(t, e), Yo(e), u & Mt) {
            try {
              co($o | Tr, e, e.return), Ju($o | Tr, e);
            } catch (Tt) {
              Tn(e, e.return, Tt);
            }
            if (e.mode & Rt) {
              try {
                Io(), co(xr | Tr, e, e.return);
              } catch (Tt) {
                Tn(e, e.return, Tt);
              }
              Ho(e);
            } else
              try {
                co(xr | Tr, e, e.return);
              } catch (Tt) {
                Tn(e, e.return, Tt);
              }
          }
          return;
        }
        case _: {
          po(t, e), Yo(e), u & ea && o !== null && yd(o, o.return);
          return;
        }
        case H: {
          po(t, e), Yo(e), u & ea && o !== null && yd(o, o.return);
          {
            if (e.flags & Xt) {
              var d = e.stateNode;
              try {
                O1(d);
              } catch (Tt) {
                Tn(e, e.return, Tt);
              }
            }
            if (u & Mt) {
              var m = e.stateNode;
              if (m != null) {
                var b = e.memoizedProps, C = o !== null ? o.memoizedProps : b, x = e.type, k = e.updateQueue;
                if (e.updateQueue = null, k !== null)
                  try {
                    cO(m, k, x, C, b, e);
                  } catch (Tt) {
                    Tn(e, e.return, Tt);
                  }
              }
            }
          }
          return;
        }
        case Y: {
          if (po(t, e), Yo(e), u & Mt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var V = e.stateNode, F = e.memoizedProps, Z = o !== null ? o.memoizedProps : F;
            try {
              fO(V, Z, F);
            } catch (Tt) {
              Tn(e, e.return, Tt);
            }
          }
          return;
        }
        case O: {
          if (po(t, e), Yo(e), u & Mt && o !== null) {
            var te = o.memoizedState;
            if (te.isDehydrated)
              try {
                UO(t.containerInfo);
              } catch (Tt) {
                Tn(e, e.return, Tt);
              }
          }
          return;
        }
        case L: {
          po(t, e), Yo(e);
          return;
        }
        case U: {
          po(t, e), Yo(e);
          var oe = e.child;
          if (oe.flags & _o) {
            var Pe = oe.stateNode, ht = oe.memoizedState, ut = ht !== null;
            if (Pe.isHidden = ut, ut) {
              var Bt = oe.alternate !== null && oe.alternate.memoizedState !== null;
              Bt || LA();
            }
          }
          if (u & Mt) {
            try {
              ZM(e);
            } catch (Tt) {
              Tn(e, e.return, Tt);
            }
            Ox(e);
          }
          return;
        }
        case ve: {
          var Ft = o !== null && o.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & lt
          ) {
            var Q = Ir;
            Ir = Q || Ft, po(t, e), Ir = Q;
          } else
            po(t, e);
          if (Yo(e), u & _o) {
            var le = e.stateNode, K = e.memoizedState, Ee = K !== null, Ye = e;
            if (le.isHidden = Ee, Ee && !Ft && (Ye.mode & lt) !== rt) {
              Ke = Ye;
              for (var Ve = Ye.child; Ve !== null; )
                Ke = Ve, nA(Ve), Ve = Ve.sibling;
            }
            GM(Ye, Ee);
          }
          return;
        }
        case _e: {
          po(t, e), Yo(e), u & Mt && Ox(e);
          return;
        }
        case he:
          return;
        default: {
          po(t, e), Yo(e);
          return;
        }
      }
    }
    function Yo(e) {
      var t = e.flags;
      if (t & bn) {
        try {
          KM(e);
        } catch (a) {
          Tn(e, e.return, a);
        }
        e.flags &= ~bn;
      }
      t & Va && (e.flags &= ~Va);
    }
    function tA(e, t, a) {
      hd = a, md = t, Ke = e, Mx(e, t, a), hd = null, md = null;
    }
    function Mx(e, t, a) {
      for (var o = (e.mode & lt) !== rt; Ke !== null; ) {
        var u = Ke, d = u.child;
        if (u.tag === ve && o) {
          var m = u.memoizedState !== null, b = m || ng;
          if (b) {
            uC(e, t, a);
            continue;
          } else {
            var C = u.alternate, x = C !== null && C.memoizedState !== null, k = x || Ir, V = ng, F = Ir;
            ng = b, Ir = k, Ir && !F && (Ke = u, rA(u));
            for (var Z = d; Z !== null; )
              Ke = Z, Mx(
                Z,
                // New root; bubble back up to here and stop.
                t,
                a
              ), Z = Z.sibling;
            Ke = u, ng = V, Ir = F, uC(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Lr) !== dt && d !== null ? (d.return = u, Ke = d) : uC(e, t, a);
      }
    }
    function uC(e, t, a) {
      for (; Ke !== null; ) {
        var o = Ke;
        if ((o.flags & Lr) !== dt) {
          var u = o.alternate;
          an(o);
          try {
            YM(t, u, o, a);
          } catch (m) {
            Tn(o, o.return, m);
          }
          Jn();
        }
        if (o === e) {
          Ke = null;
          return;
        }
        var d = o.sibling;
        if (d !== null) {
          d.return = o.return, Ke = d;
          return;
        }
        Ke = o.return;
      }
    }
    function nA(e) {
      for (; Ke !== null; ) {
        var t = Ke, a = t.child;
        switch (t.tag) {
          case w:
          case I:
          case de:
          case ie: {
            if (t.mode & Rt)
              try {
                Io(), co(xr, t, t.return);
              } finally {
                Ho(t);
              }
            else
              co(xr, t, t.return);
            break;
          }
          case _: {
            yd(t, t.return);
            var o = t.stateNode;
            typeof o.componentWillUnmount == "function" && iC(t, t.return, o);
            break;
          }
          case H: {
            yd(t, t.return);
            break;
          }
          case ve: {
            var u = t.memoizedState !== null;
            if (u) {
              Ax(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Ke = a) : Ax(e);
      }
    }
    function Ax(e) {
      for (; Ke !== null; ) {
        var t = Ke;
        if (t === e) {
          Ke = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ke = a;
          return;
        }
        Ke = t.return;
      }
    }
    function rA(e) {
      for (; Ke !== null; ) {
        var t = Ke, a = t.child;
        if (t.tag === ve) {
          var o = t.memoizedState !== null;
          if (o) {
            Nx(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Ke = a) : Nx(e);
      }
    }
    function Nx(e) {
      for (; Ke !== null; ) {
        var t = Ke;
        an(t);
        try {
          WM(t);
        } catch (o) {
          Tn(t, t.return, o);
        }
        if (Jn(), t === e) {
          Ke = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Ke = a;
          return;
        }
        Ke = t.return;
      }
    }
    function aA(e, t, a, o) {
      Ke = t, iA(t, e, a, o);
    }
    function iA(e, t, a, o) {
      for (; Ke !== null; ) {
        var u = Ke, d = u.child;
        (u.subtreeFlags & Ba) !== dt && d !== null ? (d.return = u, Ke = d) : oA(e, t, a, o);
      }
    }
    function oA(e, t, a, o) {
      for (; Ke !== null; ) {
        var u = Ke;
        if ((u.flags & _n) !== dt) {
          an(u);
          try {
            lA(t, u, a, o);
          } catch (m) {
            Tn(u, u.return, m);
          }
          Jn();
        }
        if (u === e) {
          Ke = null;
          return;
        }
        var d = u.sibling;
        if (d !== null) {
          d.return = u.return, Ke = d;
          return;
        }
        Ke = u.return;
      }
    }
    function lA(e, t, a, o) {
      switch (t.tag) {
        case w:
        case I:
        case ie: {
          if (t.mode & Rt) {
            _b();
            try {
              Ju(Br | Tr, t);
            } finally {
              Rb(t);
            }
          } else
            Ju(Br | Tr, t);
          break;
        }
      }
    }
    function uA(e) {
      Ke = e, sA();
    }
    function sA() {
      for (; Ke !== null; ) {
        var e = Ke, t = e.child;
        if ((Ke.flags & Qt) !== dt) {
          var a = e.deletions;
          if (a !== null) {
            for (var o = 0; o < a.length; o++) {
              var u = a[o];
              Ke = u, dA(u, e);
            }
            {
              var d = e.alternate;
              if (d !== null) {
                var m = d.child;
                if (m !== null) {
                  d.child = null;
                  do {
                    var b = m.sibling;
                    m.sibling = null, m = b;
                  } while (m !== null);
                }
              }
            }
            Ke = e;
          }
        }
        (e.subtreeFlags & Ba) !== dt && t !== null ? (t.return = e, Ke = t) : cA();
      }
    }
    function cA() {
      for (; Ke !== null; ) {
        var e = Ke;
        (e.flags & _n) !== dt && (an(e), fA(e), Jn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Ke = t;
          return;
        }
        Ke = e.return;
      }
    }
    function fA(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          e.mode & Rt ? (_b(), co(Br | Tr, e, e.return), Rb(e)) : co(Br | Tr, e, e.return);
          break;
        }
      }
    }
    function dA(e, t) {
      for (; Ke !== null; ) {
        var a = Ke;
        an(a), vA(a, t), Jn();
        var o = a.child;
        o !== null ? (o.return = a, Ke = o) : pA(e);
      }
    }
    function pA(e) {
      for (; Ke !== null; ) {
        var t = Ke, a = t.sibling, o = t.return;
        if (wx(t), t === e) {
          Ke = null;
          return;
        }
        if (a !== null) {
          a.return = o, Ke = a;
          return;
        }
        Ke = o;
      }
    }
    function vA(e, t) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          e.mode & Rt ? (_b(), co(Br, e, t), Rb(e)) : co(Br, e, t);
          break;
        }
      }
    }
    function hA(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          try {
            Ju(xr | Tr, e);
          } catch (a) {
            Tn(e, e.return, a);
          }
          break;
        }
        case _: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            Tn(e, e.return, a);
          }
          break;
        }
      }
    }
    function mA(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          try {
            Ju(Br | Tr, e);
          } catch (t) {
            Tn(e, e.return, t);
          }
          break;
        }
      }
    }
    function yA(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie: {
          try {
            co(xr | Tr, e, e.return);
          } catch (a) {
            Tn(e, e.return, a);
          }
          break;
        }
        case _: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && iC(e, e.return, t);
          break;
        }
      }
    }
    function gA(e) {
      switch (e.tag) {
        case w:
        case I:
        case ie:
          try {
            co(Br | Tr, e, e.return);
          } catch (t) {
            Tn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Av = Symbol.for;
      Av("selector.component"), Av("selector.has_pseudo_class"), Av("selector.role"), Av("selector.test_id"), Av("selector.text");
    }
    var SA = [];
    function bA() {
      SA.forEach(function(e) {
        return e();
      });
    }
    var CA = c.ReactCurrentActQueue;
    function EA(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Lx() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && CA.current !== null && h("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var TA = Math.ceil, sC = c.ReactCurrentDispatcher, cC = c.ReactCurrentOwner, Wr = c.ReactCurrentBatchConfig, vo = c.ReactCurrentActQueue, _r = (
      /*             */
      0
    ), zx = (
      /*               */
      1
    ), Gr = (
      /*                */
      2
    ), zi = (
      /*                */
      4
    ), Bl = 0, Nv = 1, yc = 2, ag = 3, Lv = 4, Ux = 5, fC = 6, Vt = _r, ka = null, In = null, kr = me, Wo = me, dC = Iu(me), Or = Bl, zv = null, ig = me, Uv = me, og = me, jv = null, ti = null, pC = 0, jx = 500, Px = 1 / 0, xA = 500, Hl = null;
    function Pv() {
      Px = Mn() + xA;
    }
    function Fx() {
      return Px;
    }
    var lg = !1, vC = null, gd = null, gc = !1, ts = null, Fv = me, hC = [], mC = null, wA = 50, $v = 0, yC = null, gC = !1, ug = !1, RA = 50, Sd = 0, sg = null, Vv = gn, cg = me, $x = !1;
    function fg() {
      return ka;
    }
    function Oa() {
      return (Vt & (Gr | zi)) !== _r ? Mn() : (Vv !== gn || (Vv = Mn()), Vv);
    }
    function ns(e) {
      var t = e.mode;
      if ((t & lt) === rt)
        return ft;
      if ((Vt & Gr) !== _r && kr !== me)
        return wu(kr);
      var a = CD() !== bD;
      if (a) {
        if (Wr.transition !== null) {
          var o = Wr.transition;
          o._updatedFibers || (o._updatedFibers = /* @__PURE__ */ new Set()), o._updatedFibers.add(e);
        }
        return cg === qn && (cg = Tm()), cg;
      }
      var u = Ga();
      if (u !== qn)
        return u;
      var d = iO();
      return d;
    }
    function _A(e) {
      var t = e.mode;
      return (t & lt) === rt ? ft : la();
    }
    function Dr(e, t, a, o) {
      XA(), $x && h("useInsertionEffect must not schedule updates."), gC && (ug = !0), kl(e, a, o), (Vt & Gr) !== me && e === ka ? eN(t) : (xa && Rf(e, t, a), tN(t), e === ka && ((Vt & Gr) === _r && (Uv = Dt(Uv, a)), Or === Lv && rs(e, kr)), ni(e, o), a === ft && Vt === _r && (t.mode & lt) === rt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !vo.isBatchingLegacy && (Pv(), $1()));
    }
    function kA(e, t, a) {
      var o = e.current;
      o.lanes = t, kl(e, t, a), ni(e, a);
    }
    function OA(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Vt & Gr) !== _r
      );
    }
    function ni(e, t) {
      var a = e.callbackNode;
      gm(e, t);
      var o = Rl(e, e === ka ? kr : me);
      if (o === me) {
        a !== null && nw(a), e.callbackNode = null, e.callbackPriority = qn;
        return;
      }
      var u = Vn(o), d = e.callbackPriority;
      if (d === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(vo.current !== null && a !== wC)) {
        a == null && d !== ft && h("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && nw(a);
      var m;
      if (u === ft)
        e.tag === Yu ? (vo.isBatchingLegacy !== null && (vo.didScheduleLegacyUpdate = !0), rD(Hx.bind(null, e))) : F1(Hx.bind(null, e)), vo.current !== null ? vo.current.push(Wu) : lO(function() {
          (Vt & (Gr | zi)) === _r && Wu();
        }), m = null;
      else {
        var b;
        switch (Er(o)) {
          case Bn:
            b = Zc;
            break;
          case Ji:
            b = Sl;
            break;
          case Ri:
            b = wi;
            break;
          case Ru:
            b = Jc;
            break;
          default:
            b = wi;
            break;
        }
        m = RC(b, Vx.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = m;
    }
    function Vx(e, t) {
      if (GD(), Vv = gn, cg = me, (Vt & (Gr | zi)) !== _r)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, o = Yl();
      if (o && e.callbackNode !== a)
        return null;
      var u = Rl(e, e === ka ? kr : me);
      if (u === me)
        return null;
      var d = !Is(e, u) && !Em(e, u) && !t, m = d ? FA(e, u) : pg(e, u);
      if (m !== Bl) {
        if (m === yc) {
          var b = Ao(e);
          b !== me && (u = b, m = SC(e, b));
        }
        if (m === Nv) {
          var C = zv;
          throw Sc(e, me), rs(e, u), ni(e, Mn()), C;
        }
        if (m === fC)
          rs(e, u);
        else {
          var x = !Is(e, u), k = e.current.alternate;
          if (x && !MA(k)) {
            if (m = pg(e, u), m === yc) {
              var V = Ao(e);
              V !== me && (u = V, m = SC(e, V));
            }
            if (m === Nv) {
              var F = zv;
              throw Sc(e, me), rs(e, u), ni(e, Mn()), F;
            }
          }
          e.finishedWork = k, e.finishedLanes = u, DA(e, m, u);
        }
      }
      return ni(e, Mn()), e.callbackNode === a ? Vx.bind(null, e) : null;
    }
    function SC(e, t) {
      var a = jv;
      if (_f(e)) {
        var o = Sc(e, t);
        o.flags |= zn, KO(e.containerInfo);
      }
      var u = pg(e, t);
      if (u !== yc) {
        var d = ti;
        ti = a, d !== null && Bx(d);
      }
      return u;
    }
    function Bx(e) {
      ti === null ? ti = e : ti.push.apply(ti, e);
    }
    function DA(e, t, a) {
      switch (t) {
        case Bl:
        case Nv:
          throw new Error("Root did not complete. This is a bug in React.");
        case yc: {
          bc(e, ti, Hl);
          break;
        }
        case ag: {
          if (rs(e, a), Sm(a) && // do not delay if we're inside an act() scope
          !rw()) {
            var o = pC + jx - Mn();
            if (o > 10) {
              var u = Rl(e, me);
              if (u !== me)
                break;
              var d = e.suspendedLanes;
              if (!_l(d, a)) {
                Oa(), xf(e, d);
                break;
              }
              e.timeoutHandle = mS(bc.bind(null, e, ti, Hl), o);
              break;
            }
          }
          bc(e, ti, Hl);
          break;
        }
        case Lv: {
          if (rs(e, a), Cm(a))
            break;
          if (!rw()) {
            var m = mm(e, a), b = m, C = Mn() - b, x = KA(C) - C;
            if (x > 10) {
              e.timeoutHandle = mS(bc.bind(null, e, ti, Hl), x);
              break;
            }
          }
          bc(e, ti, Hl);
          break;
        }
        case Ux: {
          bc(e, ti, Hl);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function MA(e) {
      for (var t = e; ; ) {
        if (t.flags & Ls) {
          var a = t.updateQueue;
          if (a !== null) {
            var o = a.stores;
            if (o !== null)
              for (var u = 0; u < o.length; u++) {
                var d = o[u], m = d.getSnapshot, b = d.value;
                try {
                  if (!Qe(m(), b))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var C = t.child;
        if (t.subtreeFlags & Ls && C !== null) {
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
    function rs(e, t) {
      t = Ys(t, og), t = Ys(t, Uv), wm(e, t);
    }
    function Hx(e) {
      if (qD(), (Vt & (Gr | zi)) !== _r)
        throw new Error("Should not already be working.");
      Yl();
      var t = Rl(e, me);
      if (!ua(t, ft))
        return ni(e, Mn()), null;
      var a = pg(e, t);
      if (e.tag !== Yu && a === yc) {
        var o = Ao(e);
        o !== me && (t = o, a = SC(e, o));
      }
      if (a === Nv) {
        var u = zv;
        throw Sc(e, me), rs(e, t), ni(e, Mn()), u;
      }
      if (a === fC)
        throw new Error("Root did not complete. This is a bug in React.");
      var d = e.current.alternate;
      return e.finishedWork = d, e.finishedLanes = t, bc(e, ti, Hl), ni(e, Mn()), null;
    }
    function AA(e, t) {
      t !== me && (Mp(e, Dt(t, ft)), ni(e, Mn()), (Vt & (Gr | zi)) === _r && (Pv(), Wu()));
    }
    function bC(e, t) {
      var a = Vt;
      Vt |= zx;
      try {
        return e(t);
      } finally {
        Vt = a, Vt === _r && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !vo.isBatchingLegacy && (Pv(), $1());
      }
    }
    function NA(e, t, a, o, u) {
      var d = Ga(), m = Wr.transition;
      try {
        return Wr.transition = null, Un(Bn), e(t, a, o, u);
      } finally {
        Un(d), Wr.transition = m, Vt === _r && Pv();
      }
    }
    function Il(e) {
      ts !== null && ts.tag === Yu && (Vt & (Gr | zi)) === _r && Yl();
      var t = Vt;
      Vt |= zx;
      var a = Wr.transition, o = Ga();
      try {
        return Wr.transition = null, Un(Bn), e ? e() : void 0;
      } finally {
        Un(o), Wr.transition = a, Vt = t, (Vt & (Gr | zi)) === _r && Wu();
      }
    }
    function Ix() {
      return (Vt & (Gr | zi)) !== _r;
    }
    function dg(e, t) {
      fa(dC, Wo, e), Wo = Dt(Wo, t);
    }
    function CC(e) {
      Wo = dC.current, ca(dC, e);
    }
    function Sc(e, t) {
      e.finishedWork = null, e.finishedLanes = me;
      var a = e.timeoutHandle;
      if (a !== yS && (e.timeoutHandle = yS, oO(a)), In !== null)
        for (var o = In.return; o !== null; ) {
          var u = o.alternate;
          Sx(u, o), o = o.return;
        }
      ka = e;
      var d = Cc(e.current, null);
      return In = d, kr = Wo = t, Or = Bl, zv = null, ig = me, Uv = me, og = me, jv = null, ti = null, kD(), io.discardPendingWarnings(), d;
    }
    function Yx(e, t) {
      do {
        var a = In;
        try {
          if (Ey(), hT(), Jn(), cC.current = null, a === null || a.return === null) {
            Or = Nv, zv = t, In = null;
            return;
          }
          if (We && a.mode & Rt && Xy(a, !0), yt)
            if (ia(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var o = t;
              Cl(a, o, kr);
            } else
              js(a, t, kr);
          rM(e, a.return, a, t, kr), Qx(a);
        } catch (u) {
          t = u, In === a && a !== null ? (a = a.return, In = a) : a = In;
          continue;
        }
        return;
      } while (!0);
    }
    function Wx() {
      var e = sC.current;
      return sC.current = Wy, e === null ? Wy : e;
    }
    function Gx(e) {
      sC.current = e;
    }
    function LA() {
      pC = Mn();
    }
    function Bv(e) {
      ig = Dt(e, ig);
    }
    function zA() {
      Or === Bl && (Or = ag);
    }
    function EC() {
      (Or === Bl || Or === ag || Or === yc) && (Or = Lv), ka !== null && (Hs(ig) || Hs(Uv)) && rs(ka, kr);
    }
    function UA(e) {
      Or !== Lv && (Or = yc), jv === null ? jv = [e] : jv.push(e);
    }
    function jA() {
      return Or === Bl;
    }
    function pg(e, t) {
      var a = Vt;
      Vt |= Gr;
      var o = Wx();
      if (ka !== e || kr !== t) {
        if (xa) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Hv(e, kr), u.clear()), Ap(e, t);
        }
        Hl = Gs(), Sc(e, t);
      }
      kn(t);
      do
        try {
          PA();
          break;
        } catch (d) {
          Yx(e, d);
        }
      while (!0);
      if (Ey(), Vt = a, Gx(o), In !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return af(), ka = null, kr = me, Or;
    }
    function PA() {
      for (; In !== null; )
        qx(In);
    }
    function FA(e, t) {
      var a = Vt;
      Vt |= Gr;
      var o = Wx();
      if (ka !== e || kr !== t) {
        if (xa) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Hv(e, kr), u.clear()), Ap(e, t);
        }
        Hl = Gs(), Pv(), Sc(e, t);
      }
      kn(t);
      do
        try {
          $A();
          break;
        } catch (d) {
          Yx(e, d);
        }
      while (!0);
      return Ey(), Gx(o), Vt = a, In !== null ? (rf(), Bl) : (af(), ka = null, kr = me, Or);
    }
    function $A() {
      for (; In !== null && !Xc(); )
        qx(In);
    }
    function qx(e) {
      var t = e.alternate;
      an(e);
      var a;
      (e.mode & Rt) !== rt ? (wb(e), a = TC(t, e, Wo), Xy(e, !0)) : a = TC(t, e, Wo), Jn(), e.memoizedProps = e.pendingProps, a === null ? Qx(e) : In = a, cC.current = null;
    }
    function Qx(e) {
      var t = e;
      do {
        var a = t.alternate, o = t.return;
        if ((t.flags & Ca) === dt) {
          an(t);
          var u = void 0;
          if ((t.mode & Rt) === rt ? u = gx(a, t, Wo) : (wb(t), u = gx(a, t, Wo), Xy(t, !1)), Jn(), u !== null) {
            In = u;
            return;
          }
        } else {
          var d = zM(a, t);
          if (d !== null) {
            d.flags &= im, In = d;
            return;
          }
          if ((t.mode & Rt) !== rt) {
            Xy(t, !1);
            for (var m = t.actualDuration, b = t.child; b !== null; )
              m += b.actualDuration, b = b.sibling;
            t.actualDuration = m;
          }
          if (o !== null)
            o.flags |= Ca, o.subtreeFlags = dt, o.deletions = null;
          else {
            Or = fC, In = null;
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
      Or === Bl && (Or = Ux);
    }
    function bc(e, t, a) {
      var o = Ga(), u = Wr.transition;
      try {
        Wr.transition = null, Un(Bn), VA(e, t, a, o);
      } finally {
        Wr.transition = u, Un(o);
      }
      return null;
    }
    function VA(e, t, a, o) {
      do
        Yl();
      while (ts !== null);
      if (ZA(), (Vt & (Gr | zi)) !== _r)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, d = e.finishedLanes;
      if (Oo(d), u === null)
        return ef(), null;
      if (d === me && h("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = me, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = qn;
      var m = Dt(u.lanes, u.childLanes);
      wf(e, m), e === ka && (ka = null, In = null, kr = me), ((u.subtreeFlags & Ba) !== dt || (u.flags & Ba) !== dt) && (gc || (gc = !0, mC = a, RC(wi, function() {
        return Yl(), null;
      })));
      var b = (u.subtreeFlags & (du | ra | Lr | Ba)) !== dt, C = (u.flags & (du | ra | Lr | Ba)) !== dt;
      if (b || C) {
        var x = Wr.transition;
        Wr.transition = null;
        var k = Ga();
        Un(Bn);
        var V = Vt;
        Vt |= zi, cC.current = null, $M(e, u), $T(), eA(e, u, d), Jk(e.containerInfo), e.current = u, Tp(d), tA(u, e, d), yu(), um(), Vt = V, Un(k), Wr.transition = x;
      } else
        e.current = u, $T();
      var F = gc;
      if (gc ? (gc = !1, ts = e, Fv = d) : (Sd = 0, sg = null), m = e.pendingLanes, m === me && (gd = null), F || Jx(e.current, !1), vu(u.stateNode, o), xa && e.memoizedUpdaters.clear(), bA(), ni(e, Mn()), t !== null)
        for (var Z = e.onRecoverableError, te = 0; te < t.length; te++) {
          var oe = t[te], Pe = oe.stack, ht = oe.digest;
          Z(oe.value, {
            componentStack: Pe,
            digest: ht
          });
        }
      if (lg) {
        lg = !1;
        var ut = vC;
        throw vC = null, ut;
      }
      return ua(Fv, ft) && e.tag !== Yu && Yl(), m = e.pendingLanes, ua(m, ft) ? (WD(), e === yC ? $v++ : ($v = 0, yC = e)) : $v = 0, Wu(), ef(), null;
    }
    function Yl() {
      if (ts !== null) {
        var e = Er(Fv), t = V0(Ri, e), a = Wr.transition, o = Ga();
        try {
          return Wr.transition = null, Un(t), HA();
        } finally {
          Un(o), Wr.transition = a;
        }
      }
      return !1;
    }
    function BA(e) {
      hC.push(e), gc || (gc = !0, RC(wi, function() {
        return Yl(), null;
      }));
    }
    function HA() {
      if (ts === null)
        return !1;
      var e = mC;
      mC = null;
      var t = ts, a = Fv;
      if (ts = null, Fv = me, (Vt & (Gr | zi)) !== _r)
        throw new Error("Cannot flush passive effects while already rendering.");
      gC = !0, ug = !1, vm(a);
      var o = Vt;
      Vt |= zi, uA(t.current), aA(t, t.current, a, e);
      {
        var u = hC;
        hC = [];
        for (var d = 0; d < u.length; d++) {
          var m = u[d];
          IM(t, m);
        }
      }
      xp(), Jx(t.current, !0), Vt = o, Wu(), ug ? t === sg ? Sd++ : (Sd = 0, sg = t) : Sd = 0, gC = !1, ug = !1, Ya(t);
      {
        var b = t.current.stateNode;
        b.effectDuration = 0, b.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Kx(e) {
      return gd !== null && gd.has(e);
    }
    function IA(e) {
      gd === null ? gd = /* @__PURE__ */ new Set([e]) : gd.add(e);
    }
    function YA(e) {
      lg || (lg = !0, vC = e);
    }
    var WA = YA;
    function Xx(e, t, a) {
      var o = hc(a, t), u = qT(e, o, ft), d = qu(e, u, ft), m = Oa();
      d !== null && (kl(d, ft, m), ni(d, m));
    }
    function Tn(e, t, a) {
      if (jM(a), Iv(!1), e.tag === O) {
        Xx(e, e, a);
        return;
      }
      var o = null;
      for (o = t; o !== null; ) {
        if (o.tag === O) {
          Xx(o, e, a);
          return;
        } else if (o.tag === _) {
          var u = o.type, d = o.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof d.componentDidCatch == "function" && !Kx(d)) {
            var m = hc(a, e), b = Hb(o, m, ft), C = qu(o, b, ft), x = Oa();
            C !== null && (kl(C, ft, x), ni(C, x));
            return;
          }
        }
        o = o.return;
      }
      h(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function GA(e, t, a) {
      var o = e.pingCache;
      o !== null && o.delete(t);
      var u = Oa();
      xf(e, a), nN(e), ka === e && _l(kr, a) && (Or === Lv || Or === ag && Sm(kr) && Mn() - pC < jx ? Sc(e, me) : og = Dt(og, a)), ni(e, u);
    }
    function Zx(e, t) {
      t === qn && (t = _A(e));
      var a = Oa(), o = Ja(e, t);
      o !== null && (kl(o, t, a), ni(o, a));
    }
    function qA(e) {
      var t = e.memoizedState, a = qn;
      t !== null && (a = t.retryLane), Zx(e, a);
    }
    function QA(e, t) {
      var a = qn, o;
      switch (e.tag) {
        case U:
          o = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case _e:
          o = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      o !== null && o.delete(t), Zx(e, a);
    }
    function KA(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : TA(e / 1960) * 1960;
    }
    function XA() {
      if ($v > wA)
        throw $v = 0, yC = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Sd > RA && (Sd = 0, sg = null, h("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function ZA() {
      io.flushLegacyContextWarning(), io.flushPendingUnsafeLifecycleWarnings();
    }
    function Jx(e, t) {
      an(e), vg(e, na, yA), t && vg(e, gl, gA), vg(e, na, hA), t && vg(e, gl, mA), Jn();
    }
    function vg(e, t, a) {
      for (var o = e, u = null; o !== null; ) {
        var d = o.subtreeFlags & t;
        o !== u && o.child !== null && d !== dt ? o = o.child : ((o.flags & t) !== dt && a(o), o.sibling !== null ? o = o.sibling : o = u = o.return);
      }
    }
    var hg = null;
    function ew(e) {
      {
        if ((Vt & Gr) !== _r || !(e.mode & lt))
          return;
        var t = e.tag;
        if (t !== A && t !== O && t !== _ && t !== w && t !== I && t !== de && t !== ie)
          return;
        var a = Ot(e) || "ReactComponent";
        if (hg !== null) {
          if (hg.has(a))
            return;
          hg.add(a);
        } else
          hg = /* @__PURE__ */ new Set([a]);
        var o = Yn;
        try {
          an(e), h("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          o ? an(e) : Jn();
        }
      }
    }
    var TC;
    {
      var JA = null;
      TC = function(e, t, a) {
        var o = uw(JA, t);
        try {
          return px(e, t, a);
        } catch (d) {
          if (fD() || d !== null && typeof d == "object" && typeof d.then == "function")
            throw d;
          if (Ey(), hT(), Sx(e, t), uw(t, o), t.mode & Rt && wb(t), yl(null, px, null, e, t, a), U0()) {
            var u = vp();
            typeof u == "object" && u !== null && u._suppressLogging && typeof d == "object" && d !== null && !d._suppressLogging && (d._suppressLogging = !0);
          }
          throw d;
        }
      };
    }
    var tw = !1, xC;
    xC = /* @__PURE__ */ new Set();
    function eN(e) {
      if (Ua && !HD())
        switch (e.tag) {
          case w:
          case I:
          case ie: {
            var t = In && Ot(In) || "Unknown", a = t;
            if (!xC.has(a)) {
              xC.add(a);
              var o = Ot(e) || "Unknown";
              h("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", o, t, t);
            }
            break;
          }
          case _: {
            tw || (h("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), tw = !0);
            break;
          }
        }
    }
    function Hv(e, t) {
      if (xa) {
        var a = e.memoizedUpdaters;
        a.forEach(function(o) {
          Rf(e, o, t);
        });
      }
    }
    var wC = {};
    function RC(e, t) {
      {
        var a = vo.current;
        return a !== null ? (a.push(t), wC) : Kc(e, t);
      }
    }
    function nw(e) {
      if (e !== wC)
        return lm(e);
    }
    function rw() {
      return vo.current !== null;
    }
    function tN(e) {
      {
        if (e.mode & lt) {
          if (!Lx())
            return;
        } else if (!EA() || Vt !== _r || e.tag !== w && e.tag !== I && e.tag !== ie)
          return;
        if (vo.current === null) {
          var t = Yn;
          try {
            an(e), h(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ot(e));
          } finally {
            t ? an(e) : Jn();
          }
        }
      }
    }
    function nN(e) {
      e.tag !== Yu && Lx() && vo.current === null && h(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Iv(e) {
      $x = e;
    }
    var Ui = null, bd = null, rN = function(e) {
      Ui = e;
    };
    function Cd(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        return t === void 0 ? e : t.current;
      }
    }
    function _C(e) {
      return Cd(e);
    }
    function kC(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Cd(e.render);
            if (e.render !== a) {
              var o = {
                $$typeof: ze,
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
    function aw(e, t) {
      {
        if (Ui === null)
          return !1;
        var a = e.elementType, o = t.type, u = !1, d = typeof o == "object" && o !== null ? o.$$typeof : null;
        switch (e.tag) {
          case _: {
            typeof o == "function" && (u = !0);
            break;
          }
          case w: {
            (typeof o == "function" || d === bt) && (u = !0);
            break;
          }
          case I: {
            (d === ze || d === bt) && (u = !0);
            break;
          }
          case de:
          case ie: {
            (d === Ht || d === bt) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var m = Ui(a);
          if (m !== void 0 && m === Ui(o))
            return !0;
        }
        return !1;
      }
    }
    function iw(e) {
      {
        if (Ui === null || typeof WeakSet != "function")
          return;
        bd === null && (bd = /* @__PURE__ */ new WeakSet()), bd.add(e);
      }
    }
    var aN = function(e, t) {
      {
        if (Ui === null)
          return;
        var a = t.staleFamilies, o = t.updatedFamilies;
        Yl(), Il(function() {
          OC(e.current, o, a);
        });
      }
    }, iN = function(e, t) {
      {
        if (e.context !== hi)
          return;
        Yl(), Il(function() {
          Yv(t, e, null, null);
        });
      }
    };
    function OC(e, t, a) {
      {
        var o = e.alternate, u = e.child, d = e.sibling, m = e.tag, b = e.type, C = null;
        switch (m) {
          case w:
          case ie:
          case _:
            C = b;
            break;
          case I:
            C = b.render;
            break;
        }
        if (Ui === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var x = !1, k = !1;
        if (C !== null) {
          var V = Ui(C);
          V !== void 0 && (a.has(V) ? k = !0 : t.has(V) && (m === _ ? k = !0 : x = !0));
        }
        if (bd !== null && (bd.has(e) || o !== null && bd.has(o)) && (k = !0), k && (e._debugNeedsRemount = !0), k || x) {
          var F = Ja(e, ft);
          F !== null && Dr(F, e, ft, gn);
        }
        u !== null && !k && OC(u, t, a), d !== null && OC(d, t, a);
      }
    }
    var oN = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), o = new Set(t.map(function(u) {
          return u.current;
        }));
        return DC(e.current, o, a), a;
      }
    };
    function DC(e, t, a) {
      {
        var o = e.child, u = e.sibling, d = e.tag, m = e.type, b = null;
        switch (d) {
          case w:
          case ie:
          case _:
            b = m;
            break;
          case I:
            b = m.render;
            break;
        }
        var C = !1;
        b !== null && t.has(b) && (C = !0), C ? lN(e, a) : o !== null && DC(o, t, a), u !== null && DC(u, t, a);
      }
    }
    function lN(e, t) {
      {
        var a = uN(e, t);
        if (a)
          return;
        for (var o = e; ; ) {
          switch (o.tag) {
            case H:
              t.add(o.stateNode);
              return;
            case L:
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
    function uN(e, t) {
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
    var MC;
    {
      MC = !1;
      try {
        var ow = Object.preventExtensions({});
      } catch {
        MC = !0;
      }
    }
    function sN(e, t, a, o) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = o, this.flags = dt, this.subtreeFlags = dt, this.deletions = null, this.lanes = me, this.childLanes = me, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !MC && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var mi = function(e, t, a, o) {
      return new sN(e, t, a, o);
    };
    function AC(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function cN(e) {
      return typeof e == "function" && !AC(e) && e.defaultProps === void 0;
    }
    function fN(e) {
      if (typeof e == "function")
        return AC(e) ? _ : w;
      if (e != null) {
        var t = e.$$typeof;
        if (t === ze)
          return I;
        if (t === Ht)
          return de;
      }
      return A;
    }
    function Cc(e, t) {
      var a = e.alternate;
      a === null ? (a = mi(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = dt, a.subtreeFlags = dt, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & br, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var o = e.dependencies;
      switch (a.dependencies = o === null ? null : {
        lanes: o.lanes,
        firstContext: o.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case A:
        case w:
        case ie:
          a.type = Cd(e.type);
          break;
        case _:
          a.type = _C(e.type);
          break;
        case I:
          a.type = kC(e.type);
          break;
      }
      return a;
    }
    function dN(e, t) {
      e.flags &= br | bn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = me, e.lanes = t, e.child = null, e.subtreeFlags = dt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = dt, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var o = a.dependencies;
        e.dependencies = o === null ? null : {
          lanes: o.lanes,
          firstContext: o.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function pN(e, t, a) {
      var o;
      return e === dy ? (o = lt, t === !0 && (o |= Ut, o |= wa)) : o = rt, xa && (o |= Rt), mi(O, null, null, o);
    }
    function NC(e, t, a, o, u, d) {
      var m = A, b = e;
      if (typeof e == "function")
        AC(e) ? (m = _, b = _C(b)) : b = Cd(b);
      else if (typeof e == "string")
        m = H;
      else
        e: switch (e) {
          case li:
            return as(a.children, u, d, t);
          case go:
            m = P, u |= Ut, (u & lt) !== rt && (u |= wa);
            break;
          case ll:
            return vN(a, u, d, t);
          case ct:
            return hN(a, u, d, t);
          case $t:
            return mN(a, u, d, t);
          case Sn:
            return lw(a, u, d, t);
          case Dn:
          case Lt:
          case Zr:
          case So:
          case cr:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case z:
                  m = ae;
                  break e;
                case be:
                  m = se;
                  break e;
                case ze:
                  m = I, b = kC(b);
                  break e;
                case Ht:
                  m = de;
                  break e;
                case bt:
                  m = Xe, b = null;
                  break e;
              }
            var C = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (C += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var x = o ? Ot(o) : null;
              x && (C += `

Check the render method of \`` + x + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + C));
          }
        }
      var k = mi(m, a, t, u);
      return k.elementType = e, k.type = b, k.lanes = d, k._debugOwner = o, k;
    }
    function LC(e, t, a) {
      var o = null;
      o = e._owner;
      var u = e.type, d = e.key, m = e.props, b = NC(u, d, m, o, t, a);
      return b._debugSource = e._source, b._debugOwner = e._owner, b;
    }
    function as(e, t, a, o) {
      var u = mi(B, e, o, t);
      return u.lanes = a, u;
    }
    function vN(e, t, a, o) {
      typeof e.id != "string" && h('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = mi(J, e, o, t | Rt);
      return u.elementType = ll, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function hN(e, t, a, o) {
      var u = mi(U, e, o, t);
      return u.elementType = ct, u.lanes = a, u;
    }
    function mN(e, t, a, o) {
      var u = mi(_e, e, o, t);
      return u.elementType = $t, u.lanes = a, u;
    }
    function lw(e, t, a, o) {
      var u = mi(ve, e, o, t);
      u.elementType = Sn, u.lanes = a;
      var d = {
        isHidden: !1
      };
      return u.stateNode = d, u;
    }
    function zC(e, t, a) {
      var o = mi(Y, e, null, t);
      return o.lanes = a, o;
    }
    function yN() {
      var e = mi(H, null, null, rt);
      return e.elementType = "DELETED", e;
    }
    function gN(e) {
      var t = mi(ce, null, null, rt);
      return t.stateNode = e, t;
    }
    function UC(e, t, a) {
      var o = e.children !== null ? e.children : [], u = mi(L, o, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function uw(e, t) {
      return e === null && (e = mi(A, null, null, rt)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function SN(e, t, a, o, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = yS, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = qn, this.eventTimes = Ws(me), this.expirationTimes = Ws(gn), this.pendingLanes = me, this.suspendedLanes = me, this.pingedLanes = me, this.expiredLanes = me, this.mutableReadLanes = me, this.finishedLanes = me, this.entangledLanes = me, this.entanglements = Ws(me), this.identifierPrefix = o, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var d = this.pendingUpdatersLaneMap = [], m = 0; m < $s; m++)
          d.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case dy:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Yu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function sw(e, t, a, o, u, d, m, b, C, x) {
      var k = new SN(e, t, a, b, C), V = pN(t, d);
      k.current = V, V.stateNode = k;
      {
        var F = {
          element: o,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        V.memoizedState = F;
      }
      return QS(V), k;
    }
    var jC = "18.3.1";
    function bN(e, t, a) {
      var o = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return G(o), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: ga,
        key: o == null ? null : "" + o,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var PC, FC;
    PC = !1, FC = {};
    function cw(e) {
      if (!e)
        return hi;
      var t = Fa(e), a = nD(t);
      if (t.tag === _) {
        var o = t.type;
        if (Fo(o))
          return j1(t, o, a);
      }
      return a;
    }
    function CN(e, t) {
      {
        var a = Fa(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var o = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + o);
        }
        var u = Ha(a);
        if (u === null)
          return null;
        if (u.mode & Ut) {
          var d = Ot(a) || "Component";
          if (!FC[d]) {
            FC[d] = !0;
            var m = Yn;
            try {
              an(u), a.mode & Ut ? h("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d) : h("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, d);
            } finally {
              m ? an(m) : Jn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function fw(e, t, a, o, u, d, m, b) {
      var C = !1, x = null;
      return sw(e, t, C, x, a, o, u, d, m);
    }
    function dw(e, t, a, o, u, d, m, b, C, x) {
      var k = !0, V = sw(a, o, k, e, u, d, m, b, C);
      V.context = cw(null);
      var F = V.current, Z = Oa(), te = ns(F), oe = $l(Z, te);
      return oe.callback = t ?? null, qu(F, oe, te), kA(V, te, Z), V;
    }
    function Yv(e, t, a, o) {
      Ep(t, e);
      var u = t.current, d = Oa(), m = ns(u);
      wp(m);
      var b = cw(a);
      t.context === null ? t.context = b : t.pendingContext = b, Ua && Yn !== null && !PC && (PC = !0, h(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ot(Yn) || "Unknown"));
      var C = $l(d, m);
      C.payload = {
        element: e
      }, o = o === void 0 ? null : o, o !== null && (typeof o != "function" && h("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", o), C.callback = o);
      var x = qu(u, C, m);
      return x !== null && (Dr(x, u, m, d), _y(x, u, m)), m;
    }
    function mg(e) {
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
    function EN(e) {
      switch (e.tag) {
        case O: {
          var t = e.stateNode;
          if (_f(t)) {
            var a = kp(t);
            AA(t, a);
          }
          break;
        }
        case U: {
          Il(function() {
            var u = Ja(e, ft);
            if (u !== null) {
              var d = Oa();
              Dr(u, e, ft, d);
            }
          });
          var o = ft;
          $C(e, o);
          break;
        }
      }
    }
    function pw(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = xm(a.retryLane, t));
    }
    function $C(e, t) {
      pw(e, t);
      var a = e.alternate;
      a && pw(a, t);
    }
    function TN(e) {
      if (e.tag === U) {
        var t = Bs, a = Ja(e, t);
        if (a !== null) {
          var o = Oa();
          Dr(a, e, t, o);
        }
        $C(e, t);
      }
    }
    function xN(e) {
      if (e.tag === U) {
        var t = ns(e), a = Ja(e, t);
        if (a !== null) {
          var o = Oa();
          Dr(a, e, t, o);
        }
        $C(e, t);
      }
    }
    function vw(e) {
      var t = om(e);
      return t === null ? null : t.stateNode;
    }
    var hw = function(e) {
      return null;
    };
    function wN(e) {
      return hw(e);
    }
    var mw = function(e) {
      return !1;
    };
    function RN(e) {
      return mw(e);
    }
    var yw = null, gw = null, Sw = null, bw = null, Cw = null, Ew = null, Tw = null, xw = null, ww = null;
    {
      var Rw = function(e, t, a) {
        var o = t[a], u = fr(e) ? e.slice() : zt({}, e);
        return a + 1 === t.length ? (fr(u) ? u.splice(o, 1) : delete u[o], u) : (u[o] = Rw(e[o], t, a + 1), u);
      }, _w = function(e, t) {
        return Rw(e, t, 0);
      }, kw = function(e, t, a, o) {
        var u = t[o], d = fr(e) ? e.slice() : zt({}, e);
        if (o + 1 === t.length) {
          var m = a[o];
          d[m] = d[u], fr(d) ? d.splice(u, 1) : delete d[u];
        } else
          d[u] = kw(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            o + 1
          );
        return d;
      }, Ow = function(e, t, a) {
        if (t.length !== a.length) {
          g("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var o = 0; o < a.length - 1; o++)
            if (t[o] !== a[o]) {
              g("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return kw(e, t, a, 0);
      }, Dw = function(e, t, a, o) {
        if (a >= t.length)
          return o;
        var u = t[a], d = fr(e) ? e.slice() : zt({}, e);
        return d[u] = Dw(e[u], t, a + 1, o), d;
      }, Mw = function(e, t, a) {
        return Dw(e, t, 0, a);
      }, VC = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      yw = function(e, t, a, o) {
        var u = VC(e, t);
        if (u !== null) {
          var d = Mw(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = zt({}, e.memoizedProps);
          var m = Ja(e, ft);
          m !== null && Dr(m, e, ft, gn);
        }
      }, gw = function(e, t, a) {
        var o = VC(e, t);
        if (o !== null) {
          var u = _w(o.memoizedState, a);
          o.memoizedState = u, o.baseState = u, e.memoizedProps = zt({}, e.memoizedProps);
          var d = Ja(e, ft);
          d !== null && Dr(d, e, ft, gn);
        }
      }, Sw = function(e, t, a, o) {
        var u = VC(e, t);
        if (u !== null) {
          var d = Ow(u.memoizedState, a, o);
          u.memoizedState = d, u.baseState = d, e.memoizedProps = zt({}, e.memoizedProps);
          var m = Ja(e, ft);
          m !== null && Dr(m, e, ft, gn);
        }
      }, bw = function(e, t, a) {
        e.pendingProps = Mw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ja(e, ft);
        o !== null && Dr(o, e, ft, gn);
      }, Cw = function(e, t) {
        e.pendingProps = _w(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ja(e, ft);
        a !== null && Dr(a, e, ft, gn);
      }, Ew = function(e, t, a) {
        e.pendingProps = Ow(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var o = Ja(e, ft);
        o !== null && Dr(o, e, ft, gn);
      }, Tw = function(e) {
        var t = Ja(e, ft);
        t !== null && Dr(t, e, ft, gn);
      }, xw = function(e) {
        hw = e;
      }, ww = function(e) {
        mw = e;
      };
    }
    function _N(e) {
      var t = Ha(e);
      return t === null ? null : t.stateNode;
    }
    function kN(e) {
      return null;
    }
    function ON() {
      return Yn;
    }
    function DN(e) {
      var t = e.findFiberByHostInstance, a = c.ReactCurrentDispatcher;
      return Cp({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: yw,
        overrideHookStateDeletePath: gw,
        overrideHookStateRenamePath: Sw,
        overrideProps: bw,
        overridePropsDeletePath: Cw,
        overridePropsRenamePath: Ew,
        setErrorHandler: xw,
        setSuspenseHandler: ww,
        scheduleUpdate: Tw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: _N,
        findFiberByHostInstance: t || kN,
        // React Refresh
        findHostInstancesForRefresh: oN,
        scheduleRefresh: aN,
        scheduleRoot: iN,
        setRefreshHandler: rN,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: ON,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: jC
      });
    }
    var Aw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function BC(e) {
      this._internalRoot = e;
    }
    yg.prototype.render = BC.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? h("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : gg(arguments[1]) ? h("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && h("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Wn) {
          var o = vw(t.current);
          o && o.parentNode !== a && h("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Yv(e, t, null, null);
    }, yg.prototype.unmount = BC.prototype.unmount = function() {
      typeof arguments[0] == "function" && h("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        Ix() && h("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Il(function() {
          Yv(null, e, null, null);
        }), A1(t);
      }
    };
    function MN(e, t) {
      if (!gg(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      Nw(e);
      var a = !1, o = !1, u = "", d = Aw;
      t != null && (t.hydrate ? g("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Vi && h(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (d = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var m = fw(e, dy, null, a, o, u, d);
      iy(m.current, e);
      var b = e.nodeType === Wn ? e.parentNode : e;
      return Xp(b), new BC(m);
    }
    function yg(e) {
      this._internalRoot = e;
    }
    function AN(e) {
      e && I0(e);
    }
    yg.prototype.unstable_scheduleHydration = AN;
    function NN(e, t, a) {
      if (!gg(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      Nw(e), t === void 0 && h("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var o = a ?? null, u = a != null && a.hydratedSources || null, d = !1, m = !1, b = "", C = Aw;
      a != null && (a.unstable_strictMode === !0 && (d = !0), a.identifierPrefix !== void 0 && (b = a.identifierPrefix), a.onRecoverableError !== void 0 && (C = a.onRecoverableError));
      var x = dw(t, null, e, dy, o, d, m, b, C);
      if (iy(x.current, e), Xp(e), u)
        for (var k = 0; k < u.length; k++) {
          var V = u[k];
          jD(x, V);
        }
      return new yg(x);
    }
    function gg(e) {
      return !!(e && (e.nodeType === Jr || e.nodeType === fi || e.nodeType === fl || !Ne));
    }
    function Wv(e) {
      return !!(e && (e.nodeType === Jr || e.nodeType === fi || e.nodeType === fl || e.nodeType === Wn && e.nodeValue === " react-mount-point-unstable "));
    }
    function Nw(e) {
      e.nodeType === Jr && e.tagName && e.tagName.toUpperCase() === "BODY" && h("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), uv(e) && (e._reactRootContainer ? h("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : h("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var LN = c.ReactCurrentOwner, Lw;
    Lw = function(e) {
      if (e._reactRootContainer && e.nodeType !== Wn) {
        var t = vw(e._reactRootContainer.current);
        t && t.parentNode !== e && h("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, o = HC(e), u = !!(o && Hu(o));
      u && !a && h("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Jr && e.tagName && e.tagName.toUpperCase() === "BODY" && h("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function HC(e) {
      return e ? e.nodeType === fi ? e.documentElement : e.firstChild : null;
    }
    function zw() {
    }
    function zN(e, t, a, o, u) {
      if (u) {
        if (typeof o == "function") {
          var d = o;
          o = function() {
            var F = mg(m);
            d.call(F);
          };
        }
        var m = dw(
          t,
          o,
          e,
          Yu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          zw
        );
        e._reactRootContainer = m, iy(m.current, e);
        var b = e.nodeType === Wn ? e.parentNode : e;
        return Xp(b), Il(), m;
      } else {
        for (var C; C = e.lastChild; )
          e.removeChild(C);
        if (typeof o == "function") {
          var x = o;
          o = function() {
            var F = mg(k);
            x.call(F);
          };
        }
        var k = fw(
          e,
          Yu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          zw
        );
        e._reactRootContainer = k, iy(k.current, e);
        var V = e.nodeType === Wn ? e.parentNode : e;
        return Xp(V), Il(function() {
          Yv(t, k, a, o);
        }), k;
      }
    }
    function UN(e, t) {
      e !== null && typeof e != "function" && h("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Sg(e, t, a, o, u) {
      Lw(a), UN(u === void 0 ? null : u, "render");
      var d = a._reactRootContainer, m;
      if (!d)
        m = zN(a, t, e, u, o);
      else {
        if (m = d, typeof u == "function") {
          var b = u;
          u = function() {
            var C = mg(m);
            b.call(C);
          };
        }
        Yv(t, m, e, u);
      }
      return mg(m);
    }
    var Uw = !1;
    function jN(e) {
      {
        Uw || (Uw = !0, h("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = LN.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || h("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", en(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Jr ? e : CN(e, "findDOMNode");
    }
    function PN(e, t, a) {
      if (h("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = uv(t) && t._reactRootContainer === void 0;
        o && h("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Sg(null, e, t, !0, a);
    }
    function FN(e, t, a) {
      if (h("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var o = uv(t) && t._reactRootContainer === void 0;
        o && h("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Sg(null, e, t, !1, a);
    }
    function $N(e, t, a, o) {
      if (h("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Ns(e))
        throw new Error("parentComponent must be a valid React Component");
      return Sg(e, t, a, !1, o);
    }
    var jw = !1;
    function VN(e) {
      if (jw || (jw = !0, h("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Wv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = uv(e) && e._reactRootContainer === void 0;
        t && h("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = HC(e), o = a && !Hu(a);
          o && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Il(function() {
          Sg(null, null, e, !1, function() {
            e._reactRootContainer = null, A1(e);
          });
        }), !0;
      } else {
        {
          var u = HC(e), d = !!(u && Hu(u)), m = e.nodeType === Jr && Wv(e.parentNode) && !!e.parentNode._reactRootContainer;
          d && h("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", m ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Ou(EN), B0(TN), Of(xN), _m(Ga), km(jr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && h("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), rm(Hk), Yc(bC, NA, Il);
    function BN(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!gg(t))
        throw new Error("Target container is not a DOM element.");
      return bN(e, t, null, a);
    }
    function HN(e, t, a, o) {
      return $N(e, t, a, o);
    }
    var IC = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Hu, Zf, oy, Ic, Ds, bC]
    };
    function IN(e, t) {
      return IC.usingClientEntryPoint || h('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), MN(e, t);
    }
    function YN(e, t, a) {
      return IC.usingClientEntryPoint || h('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), NN(e, t, a);
    }
    function WN(e) {
      return Ix() && h("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Il(e);
    }
    var GN = DN({
      findFiberByHostInstance: oc,
      bundleType: 1,
      version: jC,
      rendererPackageName: "react-dom"
    });
    if (!GN && xt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var Pw = window.location.protocol;
      /^(https?|file):$/.test(Pw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (Pw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    ai.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = IC, ai.createPortal = BN, ai.createRoot = IN, ai.findDOMNode = jN, ai.flushSync = WN, ai.hydrate = PN, ai.hydrateRoot = YN, ai.render = FN, ai.unmountComponentAtNode = VN, ai.unstable_batchedUpdates = bC, ai.unstable_renderSubtreeIntoContainer = HN, ai.version = jC, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), ai;
}
function qR() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(qR);
    } catch (i) {
      console.error(i);
    }
  }
}
process.env.NODE_ENV === "production" ? (qR(), dE.exports = o2()) : dE.exports = l2();
var u2 = dE.exports, pE, Cg = u2;
if (process.env.NODE_ENV === "production")
  pE = Cg.createRoot, Cg.hydrateRoot;
else {
  var Iw = Cg.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  pE = function(i, s) {
    Iw.usingClientEntryPoint = !0;
    try {
      return Cg.createRoot(i, s);
    } finally {
      Iw.usingClientEntryPoint = !1;
    }
  };
}
var s2 = Object.defineProperty, c2 = (i, s, c) => s in i ? s2(i, s, { enumerable: !0, configurable: !0, writable: !0, value: c }) : i[s] = c, Eg = (i, s, c) => (c2(i, typeof s != "symbol" ? s + "" : s, c), c);
const f2 = {
  stringify: (i) => i,
  parse: (i) => i
}, d2 = {
  stringify: (i) => `${i}`,
  parse: (i) => parseFloat(i)
}, p2 = {
  stringify: (i) => i ? "true" : "false",
  parse: (i) => /^[ty1-9]/i.test(i)
}, v2 = {
  stringify: (i) => i.name,
  parse: (i, s, c) => {
    const p = (() => {
      if (typeof window < "u" && i in window)
        return window[i];
      if (typeof global < "u" && i in global)
        return global[i];
    })();
    return typeof p == "function" ? p.bind(c) : void 0;
  }
}, h2 = {
  stringify: (i) => JSON.stringify(i),
  parse: (i) => JSON.parse(i)
}, GC = {
  string: f2,
  number: d2,
  boolean: p2,
  function: v2,
  json: h2
};
function m2(i) {
  return i.replace(
    /([a-z0-9])([A-Z])/g,
    (s, c, p) => `${c}-${p.toLowerCase()}`
  );
}
const Tg = Symbol.for("r2wc.render"), xg = Symbol.for("r2wc.connected"), Ec = Symbol.for("r2wc.context"), is = Symbol.for("r2wc.props");
function y2(i, s, c) {
  var p, y, g;
  s.props || (s.props = i.propTypes ? Object.keys(i.propTypes) : []);
  const h = Array.isArray(s.props) ? s.props.slice() : Object.keys(s.props), T = {}, w = {}, _ = {};
  for (const O of h) {
    T[O] = Array.isArray(s.props) ? "string" : s.props[O];
    const L = m2(O);
    w[O] = L, _[L] = O;
  }
  class A extends HTMLElement {
    constructor() {
      super(), Eg(this, p, !0), Eg(this, y), Eg(this, g, {}), Eg(this, "container"), s.shadow ? this.container = this.attachShadow({
        mode: s.shadow
      }) : this.container = this, this[is].container = this.container;
      for (const L of h) {
        const H = w[L], Y = this.getAttribute(H), B = T[L], P = B ? GC[B] : null;
        P != null && P.parse && Y && (this[is][L] = P.parse(Y, H, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(_);
    }
    connectedCallback() {
      this[xg] = !0, this[Tg]();
    }
    disconnectedCallback() {
      this[xg] = !1, this[Ec] && c.unmount(this[Ec]), delete this[Ec];
    }
    attributeChangedCallback(L, H, Y) {
      const B = _[L], P = T[B], se = P ? GC[P] : null;
      B in T && se != null && se.parse && Y && (this[is][B] = se.parse(Y, L, this), this[Tg]());
    }
    [(p = xg, y = Ec, g = is, Tg)]() {
      this[xg] && (this[Ec] ? c.update(this[Ec], this[is]) : this[Ec] = c.mount(
        this.container,
        i,
        this[is]
      ));
    }
  }
  for (const O of h) {
    const L = w[O], H = T[O];
    Object.defineProperty(A.prototype, O, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[is][O];
      },
      set(Y) {
        this[is][O] = Y;
        const B = H ? GC[H] : null;
        if (B != null && B.stringify) {
          const P = B.stringify(Y, L, this);
          this.getAttribute(L) !== P && this.setAttribute(L, P);
        } else
          this[Tg]();
      }
    });
  }
  return A;
}
function g2(i, s, c) {
  const p = pE(i), y = Rn.createElement(s, c);
  return p.render(y), {
    root: p,
    ReactComponent: s
  };
}
function S2({ root: i, ReactComponent: s }, c) {
  const p = Rn.createElement(s, c);
  i.render(p);
}
function b2({ root: i }) {
  i.unmount();
}
function Ld(i, s = {}) {
  return y2(i, s, { mount: g2, update: S2, unmount: b2 });
}
var vE = { exports: {} }, Qv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yw;
function C2() {
  if (Yw) return Qv;
  Yw = 1;
  var i = Rn, s = Symbol.for("react.element"), c = Symbol.for("react.fragment"), p = Object.prototype.hasOwnProperty, y = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, g = { key: !0, ref: !0, __self: !0, __source: !0 };
  function h(T, w, _) {
    var A, O = {}, L = null, H = null;
    _ !== void 0 && (L = "" + _), w.key !== void 0 && (L = "" + w.key), w.ref !== void 0 && (H = w.ref);
    for (A in w) p.call(w, A) && !g.hasOwnProperty(A) && (O[A] = w[A]);
    if (T && T.defaultProps) for (A in w = T.defaultProps, w) O[A] === void 0 && (O[A] = w[A]);
    return { $$typeof: s, type: T, key: L, ref: H, props: O, _owner: y.current };
  }
  return Qv.Fragment = c, Qv.jsx = h, Qv.jsxs = h, Qv;
}
var Kv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ww;
function E2() {
  return Ww || (Ww = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Rn, s = Symbol.for("react.element"), c = Symbol.for("react.portal"), p = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), g = Symbol.for("react.profiler"), h = Symbol.for("react.provider"), T = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), Y = Symbol.iterator, B = "@@iterator";
    function P(z) {
      if (z === null || typeof z != "object")
        return null;
      var be = Y && z[Y] || z[B];
      return typeof be == "function" ? be : null;
    }
    var se = i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ae(z) {
      {
        for (var be = arguments.length, ze = new Array(be > 1 ? be - 1 : 0), ct = 1; ct < be; ct++)
          ze[ct - 1] = arguments[ct];
        I("error", z, ze);
      }
    }
    function I(z, be, ze) {
      {
        var ct = se.ReactDebugCurrentFrame, $t = ct.getStackAddendum();
        $t !== "" && (be += "%s", ze = ze.concat([$t]));
        var Ht = ze.map(function(bt) {
          return String(bt);
        });
        Ht.unshift("Warning: " + be), Function.prototype.apply.call(console[z], console, Ht);
      }
    }
    var J = !1, U = !1, de = !1, ie = !1, Xe = !1, D;
    D = Symbol.for("react.module.reference");
    function ce(z) {
      return !!(typeof z == "string" || typeof z == "function" || z === p || z === g || Xe || z === y || z === _ || z === A || ie || z === H || J || U || de || typeof z == "object" && z !== null && (z.$$typeof === L || z.$$typeof === O || z.$$typeof === h || z.$$typeof === T || z.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      z.$$typeof === D || z.getModuleId !== void 0));
    }
    function _e(z, be, ze) {
      var ct = z.displayName;
      if (ct)
        return ct;
      var $t = be.displayName || be.name || "";
      return $t !== "" ? ze + "(" + $t + ")" : ze;
    }
    function he(z) {
      return z.displayName || "Context";
    }
    function ve(z) {
      if (z == null)
        return null;
      if (typeof z.tag == "number" && ae("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof z == "function")
        return z.displayName || z.name || null;
      if (typeof z == "string")
        return z;
      switch (z) {
        case p:
          return "Fragment";
        case c:
          return "Portal";
        case g:
          return "Profiler";
        case y:
          return "StrictMode";
        case _:
          return "Suspense";
        case A:
          return "SuspenseList";
      }
      if (typeof z == "object")
        switch (z.$$typeof) {
          case T:
            var be = z;
            return he(be) + ".Consumer";
          case h:
            var ze = z;
            return he(ze._context) + ".Provider";
          case w:
            return _e(z, z.render, "ForwardRef");
          case O:
            var ct = z.displayName || null;
            return ct !== null ? ct : ve(z.type) || "Memo";
          case L: {
            var $t = z, Ht = $t._payload, bt = $t._init;
            try {
              return ve(bt(Ht));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Re = Object.assign, it = 0, Be, Ct, ge, ke, W, pe, Ne;
    function Ze() {
    }
    Ze.__reactDisabledLog = !0;
    function Fe() {
      {
        if (it === 0) {
          Be = console.log, Ct = console.info, ge = console.warn, ke = console.error, W = console.group, pe = console.groupCollapsed, Ne = console.groupEnd;
          var z = {
            configurable: !0,
            enumerable: !0,
            value: Ze,
            writable: !0
          };
          Object.defineProperties(console, {
            info: z,
            log: z,
            warn: z,
            error: z,
            group: z,
            groupCollapsed: z,
            groupEnd: z
          });
        }
        it++;
      }
    }
    function yt() {
      {
        if (it--, it === 0) {
          var z = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Re({}, z, {
              value: Be
            }),
            info: Re({}, z, {
              value: Ct
            }),
            warn: Re({}, z, {
              value: ge
            }),
            error: Re({}, z, {
              value: ke
            }),
            group: Re({}, z, {
              value: W
            }),
            groupCollapsed: Re({}, z, {
              value: pe
            }),
            groupEnd: Re({}, z, {
              value: Ne
            })
          });
        }
        it < 0 && ae("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var We = se.ReactCurrentDispatcher, ot;
    function nt(z, be, ze) {
      {
        if (ot === void 0)
          try {
            throw Error();
          } catch ($t) {
            var ct = $t.stack.trim().match(/\n( *(at )?)/);
            ot = ct && ct[1] || "";
          }
        return `
` + ot + z;
      }
    }
    var pt = !1, gt;
    {
      var Nt = typeof WeakMap == "function" ? WeakMap : Map;
      gt = new Nt();
    }
    function xe(z, be) {
      if (!z || pt)
        return "";
      {
        var ze = gt.get(z);
        if (ze !== void 0)
          return ze;
      }
      var ct;
      pt = !0;
      var $t = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ht;
      Ht = We.current, We.current = null, Fe();
      try {
        if (be) {
          var bt = function() {
            throw Error();
          };
          if (Object.defineProperty(bt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(bt, []);
            } catch (Ar) {
              ct = Ar;
            }
            Reflect.construct(z, [], bt);
          } else {
            try {
              bt.call();
            } catch (Ar) {
              ct = Ar;
            }
            z.call(bt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ar) {
            ct = Ar;
          }
          z();
        }
      } catch (Ar) {
        if (Ar && ct && typeof Ar.stack == "string") {
          for (var Lt = Ar.stack.split(`
`), cr = ct.stack.split(`
`), Sn = Lt.length - 1, Dn = cr.length - 1; Sn >= 1 && Dn >= 0 && Lt[Sn] !== cr[Dn]; )
            Dn--;
          for (; Sn >= 1 && Dn >= 0; Sn--, Dn--)
            if (Lt[Sn] !== cr[Dn]) {
              if (Sn !== 1 || Dn !== 1)
                do
                  if (Sn--, Dn--, Dn < 0 || Lt[Sn] !== cr[Dn]) {
                    var Zr = `
` + Lt[Sn].replace(" at new ", " at ");
                    return z.displayName && Zr.includes("<anonymous>") && (Zr = Zr.replace("<anonymous>", z.displayName)), typeof z == "function" && gt.set(z, Zr), Zr;
                  }
                while (Sn >= 1 && Dn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, We.current = Ht, yt(), Error.prepareStackTrace = $t;
      }
      var So = z ? z.displayName || z.name : "", Kt = So ? nt(So) : "";
      return typeof z == "function" && gt.set(z, Kt), Kt;
    }
    function xt(z, be, ze) {
      return xe(z, !1);
    }
    function Le(z) {
      var be = z.prototype;
      return !!(be && be.isReactComponent);
    }
    function Gt(z, be, ze) {
      if (z == null)
        return "";
      if (typeof z == "function")
        return xe(z, Le(z));
      if (typeof z == "string")
        return nt(z);
      switch (z) {
        case _:
          return nt("Suspense");
        case A:
          return nt("SuspenseList");
      }
      if (typeof z == "object")
        switch (z.$$typeof) {
          case w:
            return xt(z.render);
          case O:
            return Gt(z.type, be, ze);
          case L: {
            var ct = z, $t = ct._payload, Ht = ct._init;
            try {
              return Gt(Ht($t), be, ze);
            } catch {
            }
          }
        }
      return "";
    }
    var jt = Object.prototype.hasOwnProperty, rn = {}, N = se.ReactDebugCurrentFrame;
    function G(z) {
      if (z) {
        var be = z._owner, ze = Gt(z.type, z._source, be ? be.type : null);
        N.setExtraStackFrame(ze);
      } else
        N.setExtraStackFrame(null);
    }
    function re(z, be, ze, ct, $t) {
      {
        var Ht = Function.call.bind(jt);
        for (var bt in z)
          if (Ht(z, bt)) {
            var Lt = void 0;
            try {
              if (typeof z[bt] != "function") {
                var cr = Error((ct || "React class") + ": " + ze + " type `" + bt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof z[bt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw cr.name = "Invariant Violation", cr;
              }
              Lt = z[bt](be, bt, ct, ze, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Sn) {
              Lt = Sn;
            }
            Lt && !(Lt instanceof Error) && (G($t), ae("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ct || "React class", ze, bt, typeof Lt), G(null)), Lt instanceof Error && !(Lt.message in rn) && (rn[Lt.message] = !0, G($t), ae("Failed %s type: %s", ze, Lt.message), G(null));
          }
      }
    }
    var Oe = Array.isArray;
    function Te(z) {
      return Oe(z);
    }
    function ne(z) {
      {
        var be = typeof Symbol == "function" && Symbol.toStringTag, ze = be && z[Symbol.toStringTag] || z.constructor.name || "Object";
        return ze;
      }
    }
    function $e(z) {
      try {
        return Et(z), !1;
      } catch {
        return !0;
      }
    }
    function Et(z) {
      return "" + z;
    }
    function vt(z) {
      if ($e(z))
        return ae("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ne(z)), Et(z);
    }
    var tt = se.ReactCurrentOwner, vn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, ma, Zn, Me;
    Me = {};
    function st(z) {
      if (jt.call(z, "ref")) {
        var be = Object.getOwnPropertyDescriptor(z, "ref").get;
        if (be && be.isReactWarning)
          return !1;
      }
      return z.ref !== void 0;
    }
    function At(z) {
      if (jt.call(z, "key")) {
        var be = Object.getOwnPropertyDescriptor(z, "key").get;
        if (be && be.isReactWarning)
          return !1;
      }
      return z.key !== void 0;
    }
    function qt(z, be) {
      if (typeof z.ref == "string" && tt.current && be && tt.current.stateNode !== be) {
        var ze = ve(tt.current.type);
        Me[ze] || (ae('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ve(tt.current.type), z.ref), Me[ze] = !0);
      }
    }
    function hn(z, be) {
      {
        var ze = function() {
          ma || (ma = !0, ae("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", be));
        };
        ze.isReactWarning = !0, Object.defineProperty(z, "key", {
          get: ze,
          configurable: !0
        });
      }
    }
    function sr(z, be) {
      {
        var ze = function() {
          Zn || (Zn = !0, ae("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", be));
        };
        ze.isReactWarning = !0, Object.defineProperty(z, "ref", {
          get: ze,
          configurable: !0
        });
      }
    }
    var $n = function(z, be, ze, ct, $t, Ht, bt) {
      var Lt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: s,
        // Built-in properties that belong on the element
        type: z,
        key: be,
        ref: ze,
        props: bt,
        // Record the component responsible for creating this element.
        _owner: Ht
      };
      return Lt._store = {}, Object.defineProperty(Lt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Lt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ct
      }), Object.defineProperty(Lt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: $t
      }), Object.freeze && (Object.freeze(Lt.props), Object.freeze(Lt)), Lt;
    };
    function Xr(z, be, ze, ct, $t) {
      {
        var Ht, bt = {}, Lt = null, cr = null;
        ze !== void 0 && (vt(ze), Lt = "" + ze), At(be) && (vt(be.key), Lt = "" + be.key), st(be) && (cr = be.ref, qt(be, $t));
        for (Ht in be)
          jt.call(be, Ht) && !vn.hasOwnProperty(Ht) && (bt[Ht] = be[Ht]);
        if (z && z.defaultProps) {
          var Sn = z.defaultProps;
          for (Ht in Sn)
            bt[Ht] === void 0 && (bt[Ht] = Sn[Ht]);
        }
        if (Lt || cr) {
          var Dn = typeof z == "function" ? z.displayName || z.name || "Unknown" : z;
          Lt && hn(bt, Dn), cr && sr(bt, Dn);
        }
        return $n(z, Lt, cr, $t, ct, tt.current, bt);
      }
    }
    var mn = se.ReactCurrentOwner, ya = se.ReactDebugCurrentFrame;
    function dn(z) {
      if (z) {
        var be = z._owner, ze = Gt(z.type, z._source, be ? be.type : null);
        ya.setExtraStackFrame(ze);
      } else
        ya.setExtraStackFrame(null);
    }
    var yn;
    yn = !1;
    function Kl(z) {
      return typeof z == "object" && z !== null && z.$$typeof === s;
    }
    function al() {
      {
        if (mn.current) {
          var z = ve(mn.current.type);
          if (z)
            return `

Check the render method of \`` + z + "`.";
        }
        return "";
      }
    }
    function Xl(z) {
      return "";
    }
    var fs = {};
    function wc(z) {
      {
        var be = al();
        if (!be) {
          var ze = typeof z == "string" ? z : z.displayName || z.name;
          ze && (be = `

Check the top-level render call using <` + ze + ">.");
        }
        return be;
      }
    }
    function il(z, be) {
      {
        if (!z._store || z._store.validated || z.key != null)
          return;
        z._store.validated = !0;
        var ze = wc(be);
        if (fs[ze])
          return;
        fs[ze] = !0;
        var ct = "";
        z && z._owner && z._owner !== mn.current && (ct = " It was passed a child from " + ve(z._owner.type) + "."), dn(z), ae('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ze, ct), dn(null);
      }
    }
    function Zl(z, be) {
      {
        if (typeof z != "object")
          return;
        if (Te(z))
          for (var ze = 0; ze < z.length; ze++) {
            var ct = z[ze];
            Kl(ct) && il(ct, be);
          }
        else if (Kl(z))
          z._store && (z._store.validated = !0);
        else if (z) {
          var $t = P(z);
          if (typeof $t == "function" && $t !== z.entries)
            for (var Ht = $t.call(z), bt; !(bt = Ht.next()).done; )
              Kl(bt.value) && il(bt.value, be);
        }
      }
    }
    function ol(z) {
      {
        var be = z.type;
        if (be == null || typeof be == "string")
          return;
        var ze;
        if (typeof be == "function")
          ze = be.propTypes;
        else if (typeof be == "object" && (be.$$typeof === w || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        be.$$typeof === O))
          ze = be.propTypes;
        else
          return;
        if (ze) {
          var ct = ve(be);
          re(ze, z.props, "prop", ct, z);
        } else if (be.PropTypes !== void 0 && !yn) {
          yn = !0;
          var $t = ve(be);
          ae("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", $t || "Unknown");
        }
        typeof be.getDefaultProps == "function" && !be.getDefaultProps.isReactClassApproved && ae("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Jl(z) {
      {
        for (var be = Object.keys(z.props), ze = 0; ze < be.length; ze++) {
          var ct = be[ze];
          if (ct !== "children" && ct !== "key") {
            dn(z), ae("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ct), dn(null);
            break;
          }
        }
        z.ref !== null && (dn(z), ae("Invalid attribute `ref` supplied to `React.Fragment`."), dn(null));
      }
    }
    var Ci = {};
    function Vi(z, be, ze, ct, $t, Ht) {
      {
        var bt = ce(z);
        if (!bt) {
          var Lt = "";
          (z === void 0 || typeof z == "object" && z !== null && Object.keys(z).length === 0) && (Lt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var cr = Xl();
          cr ? Lt += cr : Lt += al();
          var Sn;
          z === null ? Sn = "null" : Te(z) ? Sn = "array" : z !== void 0 && z.$$typeof === s ? (Sn = "<" + (ve(z.type) || "Unknown") + " />", Lt = " Did you accidentally export a JSX literal instead of a component?") : Sn = typeof z, ae("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Sn, Lt);
        }
        var Dn = Xr(z, be, ze, $t, Ht);
        if (Dn == null)
          return Dn;
        if (bt) {
          var Zr = be.children;
          if (Zr !== void 0)
            if (ct)
              if (Te(Zr)) {
                for (var So = 0; So < Zr.length; So++)
                  Zl(Zr[So], z);
                Object.freeze && Object.freeze(Zr);
              } else
                ae("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Zl(Zr, z);
        }
        if (jt.call(be, "key")) {
          var Kt = ve(z), Ar = Object.keys(be).filter(function(Ei) {
            return Ei !== "key";
          }), Sa = Ar.length > 0 ? "{key: someKey, " + Ar.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Ci[Kt + Sa]) {
            var zt = Ar.length > 0 ? "{" + Ar.join(": ..., ") + ": ...}" : "{}";
            ae(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Sa, Kt, zt, Kt), Ci[Kt + Sa] = !0;
          }
        }
        return z === p ? Jl(Dn) : ol(Dn), Dn;
      }
    }
    function ga(z, be, ze) {
      return Vi(z, be, ze, !0);
    }
    function li(z, be, ze) {
      return Vi(z, be, ze, !1);
    }
    var go = li, ll = ga;
    Kv.Fragment = p, Kv.jsx = go, Kv.jsxs = ll;
  }()), Kv;
}
process.env.NODE_ENV === "production" ? vE.exports = C2() : vE.exports = E2();
var Ae = vE.exports;
const T2 = "_wrapper_5bkbt_1", x2 = "_logo_5bkbt_19", w2 = "_title_5bkbt_33", qC = {
  wrapper: T2,
  logo: x2,
  title: w2
}, R2 = ({ text: i, image: s }) => /* @__PURE__ */ Ae.jsx("header", { children: /* @__PURE__ */ Ae.jsxs("div", { className: qC.wrapper, children: [
  /* @__PURE__ */ Ae.jsx("div", { children: /* @__PURE__ */ Ae.jsx("img", { width: 150, height: 150, className: qC.logo, src: s }) }),
  /* @__PURE__ */ Ae.jsx("h1", { className: qC.title, children: i })
] }) });
var hE = { exports: {} }, wg = { exports: {} }, un = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Gw;
function _2() {
  if (Gw) return un;
  Gw = 1;
  var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, c = i ? Symbol.for("react.portal") : 60106, p = i ? Symbol.for("react.fragment") : 60107, y = i ? Symbol.for("react.strict_mode") : 60108, g = i ? Symbol.for("react.profiler") : 60114, h = i ? Symbol.for("react.provider") : 60109, T = i ? Symbol.for("react.context") : 60110, w = i ? Symbol.for("react.async_mode") : 60111, _ = i ? Symbol.for("react.concurrent_mode") : 60111, A = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, L = i ? Symbol.for("react.suspense_list") : 60120, H = i ? Symbol.for("react.memo") : 60115, Y = i ? Symbol.for("react.lazy") : 60116, B = i ? Symbol.for("react.block") : 60121, P = i ? Symbol.for("react.fundamental") : 60117, se = i ? Symbol.for("react.responder") : 60118, ae = i ? Symbol.for("react.scope") : 60119;
  function I(U) {
    if (typeof U == "object" && U !== null) {
      var de = U.$$typeof;
      switch (de) {
        case s:
          switch (U = U.type, U) {
            case w:
            case _:
            case p:
            case g:
            case y:
            case O:
              return U;
            default:
              switch (U = U && U.$$typeof, U) {
                case T:
                case A:
                case Y:
                case H:
                case h:
                  return U;
                default:
                  return de;
              }
          }
        case c:
          return de;
      }
    }
  }
  function J(U) {
    return I(U) === _;
  }
  return un.AsyncMode = w, un.ConcurrentMode = _, un.ContextConsumer = T, un.ContextProvider = h, un.Element = s, un.ForwardRef = A, un.Fragment = p, un.Lazy = Y, un.Memo = H, un.Portal = c, un.Profiler = g, un.StrictMode = y, un.Suspense = O, un.isAsyncMode = function(U) {
    return J(U) || I(U) === w;
  }, un.isConcurrentMode = J, un.isContextConsumer = function(U) {
    return I(U) === T;
  }, un.isContextProvider = function(U) {
    return I(U) === h;
  }, un.isElement = function(U) {
    return typeof U == "object" && U !== null && U.$$typeof === s;
  }, un.isForwardRef = function(U) {
    return I(U) === A;
  }, un.isFragment = function(U) {
    return I(U) === p;
  }, un.isLazy = function(U) {
    return I(U) === Y;
  }, un.isMemo = function(U) {
    return I(U) === H;
  }, un.isPortal = function(U) {
    return I(U) === c;
  }, un.isProfiler = function(U) {
    return I(U) === g;
  }, un.isStrictMode = function(U) {
    return I(U) === y;
  }, un.isSuspense = function(U) {
    return I(U) === O;
  }, un.isValidElementType = function(U) {
    return typeof U == "string" || typeof U == "function" || U === p || U === _ || U === g || U === y || U === O || U === L || typeof U == "object" && U !== null && (U.$$typeof === Y || U.$$typeof === H || U.$$typeof === h || U.$$typeof === T || U.$$typeof === A || U.$$typeof === P || U.$$typeof === se || U.$$typeof === ae || U.$$typeof === B);
  }, un.typeOf = I, un;
}
var sn = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qw;
function k2() {
  return qw || (qw = 1, process.env.NODE_ENV !== "production" && function() {
    var i = typeof Symbol == "function" && Symbol.for, s = i ? Symbol.for("react.element") : 60103, c = i ? Symbol.for("react.portal") : 60106, p = i ? Symbol.for("react.fragment") : 60107, y = i ? Symbol.for("react.strict_mode") : 60108, g = i ? Symbol.for("react.profiler") : 60114, h = i ? Symbol.for("react.provider") : 60109, T = i ? Symbol.for("react.context") : 60110, w = i ? Symbol.for("react.async_mode") : 60111, _ = i ? Symbol.for("react.concurrent_mode") : 60111, A = i ? Symbol.for("react.forward_ref") : 60112, O = i ? Symbol.for("react.suspense") : 60113, L = i ? Symbol.for("react.suspense_list") : 60120, H = i ? Symbol.for("react.memo") : 60115, Y = i ? Symbol.for("react.lazy") : 60116, B = i ? Symbol.for("react.block") : 60121, P = i ? Symbol.for("react.fundamental") : 60117, se = i ? Symbol.for("react.responder") : 60118, ae = i ? Symbol.for("react.scope") : 60119;
    function I(xe) {
      return typeof xe == "string" || typeof xe == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      xe === p || xe === _ || xe === g || xe === y || xe === O || xe === L || typeof xe == "object" && xe !== null && (xe.$$typeof === Y || xe.$$typeof === H || xe.$$typeof === h || xe.$$typeof === T || xe.$$typeof === A || xe.$$typeof === P || xe.$$typeof === se || xe.$$typeof === ae || xe.$$typeof === B);
    }
    function J(xe) {
      if (typeof xe == "object" && xe !== null) {
        var xt = xe.$$typeof;
        switch (xt) {
          case s:
            var Le = xe.type;
            switch (Le) {
              case w:
              case _:
              case p:
              case g:
              case y:
              case O:
                return Le;
              default:
                var Gt = Le && Le.$$typeof;
                switch (Gt) {
                  case T:
                  case A:
                  case Y:
                  case H:
                  case h:
                    return Gt;
                  default:
                    return xt;
                }
            }
          case c:
            return xt;
        }
      }
    }
    var U = w, de = _, ie = T, Xe = h, D = s, ce = A, _e = p, he = Y, ve = H, Re = c, it = g, Be = y, Ct = O, ge = !1;
    function ke(xe) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), W(xe) || J(xe) === w;
    }
    function W(xe) {
      return J(xe) === _;
    }
    function pe(xe) {
      return J(xe) === T;
    }
    function Ne(xe) {
      return J(xe) === h;
    }
    function Ze(xe) {
      return typeof xe == "object" && xe !== null && xe.$$typeof === s;
    }
    function Fe(xe) {
      return J(xe) === A;
    }
    function yt(xe) {
      return J(xe) === p;
    }
    function We(xe) {
      return J(xe) === Y;
    }
    function ot(xe) {
      return J(xe) === H;
    }
    function nt(xe) {
      return J(xe) === c;
    }
    function pt(xe) {
      return J(xe) === g;
    }
    function gt(xe) {
      return J(xe) === y;
    }
    function Nt(xe) {
      return J(xe) === O;
    }
    sn.AsyncMode = U, sn.ConcurrentMode = de, sn.ContextConsumer = ie, sn.ContextProvider = Xe, sn.Element = D, sn.ForwardRef = ce, sn.Fragment = _e, sn.Lazy = he, sn.Memo = ve, sn.Portal = Re, sn.Profiler = it, sn.StrictMode = Be, sn.Suspense = Ct, sn.isAsyncMode = ke, sn.isConcurrentMode = W, sn.isContextConsumer = pe, sn.isContextProvider = Ne, sn.isElement = Ze, sn.isForwardRef = Fe, sn.isFragment = yt, sn.isLazy = We, sn.isMemo = ot, sn.isPortal = nt, sn.isProfiler = pt, sn.isStrictMode = gt, sn.isSuspense = Nt, sn.isValidElementType = I, sn.typeOf = J;
  }()), sn;
}
var Qw;
function kE() {
  return Qw || (Qw = 1, process.env.NODE_ENV === "production" ? wg.exports = _2() : wg.exports = k2()), wg.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var QC, Kw;
function O2() {
  if (Kw) return QC;
  Kw = 1;
  var i = Object.getOwnPropertySymbols, s = Object.prototype.hasOwnProperty, c = Object.prototype.propertyIsEnumerable;
  function p(g) {
    if (g == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(g);
  }
  function y() {
    try {
      if (!Object.assign)
        return !1;
      var g = new String("abc");
      if (g[5] = "de", Object.getOwnPropertyNames(g)[0] === "5")
        return !1;
      for (var h = {}, T = 0; T < 10; T++)
        h["_" + String.fromCharCode(T)] = T;
      var w = Object.getOwnPropertyNames(h).map(function(A) {
        return h[A];
      });
      if (w.join("") !== "0123456789")
        return !1;
      var _ = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(A) {
        _[A] = A;
      }), Object.keys(Object.assign({}, _)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return QC = y() ? Object.assign : function(g, h) {
    for (var T, w = p(g), _, A = 1; A < arguments.length; A++) {
      T = Object(arguments[A]);
      for (var O in T)
        s.call(T, O) && (w[O] = T[O]);
      if (i) {
        _ = i(T);
        for (var L = 0; L < _.length; L++)
          c.call(T, _[L]) && (w[_[L]] = T[_[L]]);
      }
    }
    return w;
  }, QC;
}
var KC, Xw;
function OE() {
  if (Xw) return KC;
  Xw = 1;
  var i = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return KC = i, KC;
}
var XC, Zw;
function QR() {
  return Zw || (Zw = 1, XC = Function.call.bind(Object.prototype.hasOwnProperty)), XC;
}
var ZC, Jw;
function D2() {
  if (Jw) return ZC;
  Jw = 1;
  var i = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var s = OE(), c = {}, p = QR();
    i = function(g) {
      var h = "Warning: " + g;
      typeof console < "u" && console.error(h);
      try {
        throw new Error(h);
      } catch {
      }
    };
  }
  function y(g, h, T, w, _) {
    if (process.env.NODE_ENV !== "production") {
      for (var A in g)
        if (p(g, A)) {
          var O;
          try {
            if (typeof g[A] != "function") {
              var L = Error(
                (w || "React class") + ": " + T + " type `" + A + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof g[A] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw L.name = "Invariant Violation", L;
            }
            O = g[A](h, A, w, T, null, s);
          } catch (Y) {
            O = Y;
          }
          if (O && !(O instanceof Error) && i(
            (w || "React class") + ": type specification of " + T + " `" + A + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof O + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), O instanceof Error && !(O.message in c)) {
            c[O.message] = !0;
            var H = _ ? _() : "";
            i(
              "Failed " + T + " type: " + O.message + (H ?? "")
            );
          }
        }
    }
  }
  return y.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (c = {});
  }, ZC = y, ZC;
}
var JC, eR;
function M2() {
  if (eR) return JC;
  eR = 1;
  var i = kE(), s = O2(), c = OE(), p = QR(), y = D2(), g = function() {
  };
  process.env.NODE_ENV !== "production" && (g = function(T) {
    var w = "Warning: " + T;
    typeof console < "u" && console.error(w);
    try {
      throw new Error(w);
    } catch {
    }
  });
  function h() {
    return null;
  }
  return JC = function(T, w) {
    var _ = typeof Symbol == "function" && Symbol.iterator, A = "@@iterator";
    function O(W) {
      var pe = W && (_ && W[_] || W[A]);
      if (typeof pe == "function")
        return pe;
    }
    var L = "<<anonymous>>", H = {
      array: se("array"),
      bigint: se("bigint"),
      bool: se("boolean"),
      func: se("function"),
      number: se("number"),
      object: se("object"),
      string: se("string"),
      symbol: se("symbol"),
      any: ae(),
      arrayOf: I,
      element: J(),
      elementType: U(),
      instanceOf: de,
      node: ce(),
      objectOf: Xe,
      oneOf: ie,
      oneOfType: D,
      shape: he,
      exact: ve
    };
    function Y(W, pe) {
      return W === pe ? W !== 0 || 1 / W === 1 / pe : W !== W && pe !== pe;
    }
    function B(W, pe) {
      this.message = W, this.data = pe && typeof pe == "object" ? pe : {}, this.stack = "";
    }
    B.prototype = Error.prototype;
    function P(W) {
      if (process.env.NODE_ENV !== "production")
        var pe = {}, Ne = 0;
      function Ze(yt, We, ot, nt, pt, gt, Nt) {
        if (nt = nt || L, gt = gt || ot, Nt !== c) {
          if (w) {
            var xe = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw xe.name = "Invariant Violation", xe;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var xt = nt + ":" + ot;
            !pe[xt] && // Avoid spamming the console because they are often not actionable except for lib authors
            Ne < 3 && (g(
              "You are manually calling a React.PropTypes validation function for the `" + gt + "` prop on `" + nt + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), pe[xt] = !0, Ne++);
          }
        }
        return We[ot] == null ? yt ? We[ot] === null ? new B("The " + pt + " `" + gt + "` is marked as required " + ("in `" + nt + "`, but its value is `null`.")) : new B("The " + pt + " `" + gt + "` is marked as required in " + ("`" + nt + "`, but its value is `undefined`.")) : null : W(We, ot, nt, pt, gt);
      }
      var Fe = Ze.bind(null, !1);
      return Fe.isRequired = Ze.bind(null, !0), Fe;
    }
    function se(W) {
      function pe(Ne, Ze, Fe, yt, We, ot) {
        var nt = Ne[Ze], pt = Be(nt);
        if (pt !== W) {
          var gt = Ct(nt);
          return new B(
            "Invalid " + yt + " `" + We + "` of type " + ("`" + gt + "` supplied to `" + Fe + "`, expected ") + ("`" + W + "`."),
            { expectedType: W }
          );
        }
        return null;
      }
      return P(pe);
    }
    function ae() {
      return P(h);
    }
    function I(W) {
      function pe(Ne, Ze, Fe, yt, We) {
        if (typeof W != "function")
          return new B("Property `" + We + "` of component `" + Fe + "` has invalid PropType notation inside arrayOf.");
        var ot = Ne[Ze];
        if (!Array.isArray(ot)) {
          var nt = Be(ot);
          return new B("Invalid " + yt + " `" + We + "` of type " + ("`" + nt + "` supplied to `" + Fe + "`, expected an array."));
        }
        for (var pt = 0; pt < ot.length; pt++) {
          var gt = W(ot, pt, Fe, yt, We + "[" + pt + "]", c);
          if (gt instanceof Error)
            return gt;
        }
        return null;
      }
      return P(pe);
    }
    function J() {
      function W(pe, Ne, Ze, Fe, yt) {
        var We = pe[Ne];
        if (!T(We)) {
          var ot = Be(We);
          return new B("Invalid " + Fe + " `" + yt + "` of type " + ("`" + ot + "` supplied to `" + Ze + "`, expected a single ReactElement."));
        }
        return null;
      }
      return P(W);
    }
    function U() {
      function W(pe, Ne, Ze, Fe, yt) {
        var We = pe[Ne];
        if (!i.isValidElementType(We)) {
          var ot = Be(We);
          return new B("Invalid " + Fe + " `" + yt + "` of type " + ("`" + ot + "` supplied to `" + Ze + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return P(W);
    }
    function de(W) {
      function pe(Ne, Ze, Fe, yt, We) {
        if (!(Ne[Ze] instanceof W)) {
          var ot = W.name || L, nt = ke(Ne[Ze]);
          return new B("Invalid " + yt + " `" + We + "` of type " + ("`" + nt + "` supplied to `" + Fe + "`, expected ") + ("instance of `" + ot + "`."));
        }
        return null;
      }
      return P(pe);
    }
    function ie(W) {
      if (!Array.isArray(W))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? g(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : g("Invalid argument supplied to oneOf, expected an array.")), h;
      function pe(Ne, Ze, Fe, yt, We) {
        for (var ot = Ne[Ze], nt = 0; nt < W.length; nt++)
          if (Y(ot, W[nt]))
            return null;
        var pt = JSON.stringify(W, function(Nt, xe) {
          var xt = Ct(xe);
          return xt === "symbol" ? String(xe) : xe;
        });
        return new B("Invalid " + yt + " `" + We + "` of value `" + String(ot) + "` " + ("supplied to `" + Fe + "`, expected one of " + pt + "."));
      }
      return P(pe);
    }
    function Xe(W) {
      function pe(Ne, Ze, Fe, yt, We) {
        if (typeof W != "function")
          return new B("Property `" + We + "` of component `" + Fe + "` has invalid PropType notation inside objectOf.");
        var ot = Ne[Ze], nt = Be(ot);
        if (nt !== "object")
          return new B("Invalid " + yt + " `" + We + "` of type " + ("`" + nt + "` supplied to `" + Fe + "`, expected an object."));
        for (var pt in ot)
          if (p(ot, pt)) {
            var gt = W(ot, pt, Fe, yt, We + "." + pt, c);
            if (gt instanceof Error)
              return gt;
          }
        return null;
      }
      return P(pe);
    }
    function D(W) {
      if (!Array.isArray(W))
        return process.env.NODE_ENV !== "production" && g("Invalid argument supplied to oneOfType, expected an instance of array."), h;
      for (var pe = 0; pe < W.length; pe++) {
        var Ne = W[pe];
        if (typeof Ne != "function")
          return g(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ge(Ne) + " at index " + pe + "."
          ), h;
      }
      function Ze(Fe, yt, We, ot, nt) {
        for (var pt = [], gt = 0; gt < W.length; gt++) {
          var Nt = W[gt], xe = Nt(Fe, yt, We, ot, nt, c);
          if (xe == null)
            return null;
          xe.data && p(xe.data, "expectedType") && pt.push(xe.data.expectedType);
        }
        var xt = pt.length > 0 ? ", expected one of type [" + pt.join(", ") + "]" : "";
        return new B("Invalid " + ot + " `" + nt + "` supplied to " + ("`" + We + "`" + xt + "."));
      }
      return P(Ze);
    }
    function ce() {
      function W(pe, Ne, Ze, Fe, yt) {
        return Re(pe[Ne]) ? null : new B("Invalid " + Fe + " `" + yt + "` supplied to " + ("`" + Ze + "`, expected a ReactNode."));
      }
      return P(W);
    }
    function _e(W, pe, Ne, Ze, Fe) {
      return new B(
        (W || "React class") + ": " + pe + " type `" + Ne + "." + Ze + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + Fe + "`."
      );
    }
    function he(W) {
      function pe(Ne, Ze, Fe, yt, We) {
        var ot = Ne[Ze], nt = Be(ot);
        if (nt !== "object")
          return new B("Invalid " + yt + " `" + We + "` of type `" + nt + "` " + ("supplied to `" + Fe + "`, expected `object`."));
        for (var pt in W) {
          var gt = W[pt];
          if (typeof gt != "function")
            return _e(Fe, yt, We, pt, Ct(gt));
          var Nt = gt(ot, pt, Fe, yt, We + "." + pt, c);
          if (Nt)
            return Nt;
        }
        return null;
      }
      return P(pe);
    }
    function ve(W) {
      function pe(Ne, Ze, Fe, yt, We) {
        var ot = Ne[Ze], nt = Be(ot);
        if (nt !== "object")
          return new B("Invalid " + yt + " `" + We + "` of type `" + nt + "` " + ("supplied to `" + Fe + "`, expected `object`."));
        var pt = s({}, Ne[Ze], W);
        for (var gt in pt) {
          var Nt = W[gt];
          if (p(W, gt) && typeof Nt != "function")
            return _e(Fe, yt, We, gt, Ct(Nt));
          if (!Nt)
            return new B(
              "Invalid " + yt + " `" + We + "` key `" + gt + "` supplied to `" + Fe + "`.\nBad object: " + JSON.stringify(Ne[Ze], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(W), null, "  ")
            );
          var xe = Nt(ot, gt, Fe, yt, We + "." + gt, c);
          if (xe)
            return xe;
        }
        return null;
      }
      return P(pe);
    }
    function Re(W) {
      switch (typeof W) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !W;
        case "object":
          if (Array.isArray(W))
            return W.every(Re);
          if (W === null || T(W))
            return !0;
          var pe = O(W);
          if (pe) {
            var Ne = pe.call(W), Ze;
            if (pe !== W.entries) {
              for (; !(Ze = Ne.next()).done; )
                if (!Re(Ze.value))
                  return !1;
            } else
              for (; !(Ze = Ne.next()).done; ) {
                var Fe = Ze.value;
                if (Fe && !Re(Fe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function it(W, pe) {
      return W === "symbol" ? !0 : pe ? pe["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && pe instanceof Symbol : !1;
    }
    function Be(W) {
      var pe = typeof W;
      return Array.isArray(W) ? "array" : W instanceof RegExp ? "object" : it(pe, W) ? "symbol" : pe;
    }
    function Ct(W) {
      if (typeof W > "u" || W === null)
        return "" + W;
      var pe = Be(W);
      if (pe === "object") {
        if (W instanceof Date)
          return "date";
        if (W instanceof RegExp)
          return "regexp";
      }
      return pe;
    }
    function ge(W) {
      var pe = Ct(W);
      switch (pe) {
        case "array":
        case "object":
          return "an " + pe;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + pe;
        default:
          return pe;
      }
    }
    function ke(W) {
      return !W.constructor || !W.constructor.name ? L : W.constructor.name;
    }
    return H.checkPropTypes = y, H.resetWarningCache = y.resetWarningCache, H.PropTypes = H, H;
  }, JC;
}
var eE, tR;
function A2() {
  if (tR) return eE;
  tR = 1;
  var i = OE();
  function s() {
  }
  function c() {
  }
  return c.resetWarningCache = s, eE = function() {
    function p(h, T, w, _, A, O) {
      if (O !== i) {
        var L = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw L.name = "Invariant Violation", L;
      }
    }
    p.isRequired = p;
    function y() {
      return p;
    }
    var g = {
      array: p,
      bigint: p,
      bool: p,
      func: p,
      number: p,
      object: p,
      string: p,
      symbol: p,
      any: p,
      arrayOf: y,
      element: p,
      elementType: p,
      instanceOf: y,
      node: p,
      objectOf: y,
      oneOf: y,
      oneOfType: y,
      shape: y,
      exact: y,
      checkPropTypes: c,
      resetWarningCache: s
    };
    return g.PropTypes = g, g;
  }, eE;
}
if (process.env.NODE_ENV !== "production") {
  var N2 = kE(), L2 = !0;
  hE.exports = M2()(N2.isElement, L2);
} else
  hE.exports = A2()();
var z2 = hE.exports;
const R = /* @__PURE__ */ r2(z2);
function us(i) {
  let s = "https://mui.com/production-error/?code=" + i;
  for (let c = 1; c < arguments.length; c += 1)
    s += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified MUI error #" + i + "; visit " + s + " for the full message.";
}
function Bg() {
  return Bg = Object.assign ? Object.assign.bind() : function(i) {
    for (var s = 1; s < arguments.length; s++) {
      var c = arguments[s];
      for (var p in c) ({}).hasOwnProperty.call(c, p) && (i[p] = c[p]);
    }
    return i;
  }, Bg.apply(null, arguments);
}
function KR(i) {
  var s = /* @__PURE__ */ Object.create(null);
  return function(c) {
    return s[c] === void 0 && (s[c] = i(c)), s[c];
  };
}
var U2 = /^((children|dangerouslySetInnerHTML|key|ref|autoFocus|defaultValue|defaultChecked|innerHTML|suppressContentEditableWarning|suppressHydrationWarning|valueLink|abbr|accept|acceptCharset|accessKey|action|allow|allowUserMedia|allowPaymentRequest|allowFullScreen|allowTransparency|alt|async|autoComplete|autoPlay|capture|cellPadding|cellSpacing|challenge|charSet|checked|cite|classID|className|cols|colSpan|content|contentEditable|contextMenu|controls|controlsList|coords|crossOrigin|data|dateTime|decoding|default|defer|dir|disabled|disablePictureInPicture|disableRemotePlayback|download|draggable|encType|enterKeyHint|fetchpriority|fetchPriority|form|formAction|formEncType|formMethod|formNoValidate|formTarget|frameBorder|headers|height|hidden|high|href|hrefLang|htmlFor|httpEquiv|id|inputMode|integrity|is|keyParams|keyType|kind|label|lang|list|loading|loop|low|marginHeight|marginWidth|max|maxLength|media|mediaGroup|method|min|minLength|multiple|muted|name|nonce|noValidate|open|optimum|pattern|placeholder|playsInline|poster|preload|profile|radioGroup|readOnly|referrerPolicy|rel|required|reversed|role|rows|rowSpan|sandbox|scope|scoped|scrolling|seamless|selected|shape|size|sizes|slot|span|spellCheck|src|srcDoc|srcLang|srcSet|start|step|style|summary|tabIndex|target|title|translate|type|useMap|value|width|wmode|wrap|about|datatype|inlist|prefix|property|resource|typeof|vocab|autoCapitalize|autoCorrect|autoSave|color|incremental|fallback|inert|itemProp|itemScope|itemType|itemID|itemRef|on|option|results|security|unselectable|accentHeight|accumulate|additive|alignmentBaseline|allowReorder|alphabetic|amplitude|arabicForm|ascent|attributeName|attributeType|autoReverse|azimuth|baseFrequency|baselineShift|baseProfile|bbox|begin|bias|by|calcMode|capHeight|clip|clipPathUnits|clipPath|clipRule|colorInterpolation|colorInterpolationFilters|colorProfile|colorRendering|contentScriptType|contentStyleType|cursor|cx|cy|d|decelerate|descent|diffuseConstant|direction|display|divisor|dominantBaseline|dur|dx|dy|edgeMode|elevation|enableBackground|end|exponent|externalResourcesRequired|fill|fillOpacity|fillRule|filter|filterRes|filterUnits|floodColor|floodOpacity|focusable|fontFamily|fontSize|fontSizeAdjust|fontStretch|fontStyle|fontVariant|fontWeight|format|from|fr|fx|fy|g1|g2|glyphName|glyphOrientationHorizontal|glyphOrientationVertical|glyphRef|gradientTransform|gradientUnits|hanging|horizAdvX|horizOriginX|ideographic|imageRendering|in|in2|intercept|k|k1|k2|k3|k4|kernelMatrix|kernelUnitLength|kerning|keyPoints|keySplines|keyTimes|lengthAdjust|letterSpacing|lightingColor|limitingConeAngle|local|markerEnd|markerMid|markerStart|markerHeight|markerUnits|markerWidth|mask|maskContentUnits|maskUnits|mathematical|mode|numOctaves|offset|opacity|operator|order|orient|orientation|origin|overflow|overlinePosition|overlineThickness|panose1|paintOrder|pathLength|patternContentUnits|patternTransform|patternUnits|pointerEvents|points|pointsAtX|pointsAtY|pointsAtZ|preserveAlpha|preserveAspectRatio|primitiveUnits|r|radius|refX|refY|renderingIntent|repeatCount|repeatDur|requiredExtensions|requiredFeatures|restart|result|rotate|rx|ry|scale|seed|shapeRendering|slope|spacing|specularConstant|specularExponent|speed|spreadMethod|startOffset|stdDeviation|stemh|stemv|stitchTiles|stopColor|stopOpacity|strikethroughPosition|strikethroughThickness|string|stroke|strokeDasharray|strokeDashoffset|strokeLinecap|strokeLinejoin|strokeMiterlimit|strokeOpacity|strokeWidth|surfaceScale|systemLanguage|tableValues|targetX|targetY|textAnchor|textDecoration|textRendering|textLength|to|transform|u1|u2|underlinePosition|underlineThickness|unicode|unicodeBidi|unicodeRange|unitsPerEm|vAlphabetic|vHanging|vIdeographic|vMathematical|values|vectorEffect|version|vertAdvY|vertOriginX|vertOriginY|viewBox|viewTarget|visibility|widths|wordSpacing|writingMode|x|xHeight|x1|x2|xChannelSelector|xlinkActuate|xlinkArcrole|xlinkHref|xlinkRole|xlinkShow|xlinkTitle|xlinkType|xmlBase|xmlns|xmlnsXlink|xmlLang|xmlSpace|y|y1|y2|yChannelSelector|z|zoomAndPan|for|class|autofocus)|(([Dd][Aa][Tt][Aa]|[Aa][Rr][Ii][Aa]|x)-.*))$/, j2 = /* @__PURE__ */ KR(
  function(i) {
    return U2.test(i) || i.charCodeAt(0) === 111 && i.charCodeAt(1) === 110 && i.charCodeAt(2) < 91;
  }
  /* Z+1 */
), P2 = !1;
function F2(i) {
  if (i.sheet)
    return i.sheet;
  for (var s = 0; s < document.styleSheets.length; s++)
    if (document.styleSheets[s].ownerNode === i)
      return document.styleSheets[s];
}
function $2(i) {
  var s = document.createElement("style");
  return s.setAttribute("data-emotion", i.key), i.nonce !== void 0 && s.setAttribute("nonce", i.nonce), s.appendChild(document.createTextNode("")), s.setAttribute("data-s", ""), s;
}
var V2 = /* @__PURE__ */ function() {
  function i(c) {
    var p = this;
    this._insertTag = function(y) {
      var g;
      p.tags.length === 0 ? p.insertionPoint ? g = p.insertionPoint.nextSibling : p.prepend ? g = p.container.firstChild : g = p.before : g = p.tags[p.tags.length - 1].nextSibling, p.container.insertBefore(y, g), p.tags.push(y);
    }, this.isSpeedy = c.speedy === void 0 ? !P2 : c.speedy, this.tags = [], this.ctr = 0, this.nonce = c.nonce, this.key = c.key, this.container = c.container, this.prepend = c.prepend, this.insertionPoint = c.insertionPoint, this.before = null;
  }
  var s = i.prototype;
  return s.hydrate = function(p) {
    p.forEach(this._insertTag);
  }, s.insert = function(p) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) === 0 && this._insertTag($2(this));
    var y = this.tags[this.tags.length - 1];
    if (this.isSpeedy) {
      var g = F2(y);
      try {
        g.insertRule(p, g.cssRules.length);
      } catch {
      }
    } else
      y.appendChild(document.createTextNode(p));
    this.ctr++;
  }, s.flush = function() {
    this.tags.forEach(function(p) {
      var y;
      return (y = p.parentNode) == null ? void 0 : y.removeChild(p);
    }), this.tags = [], this.ctr = 0;
  }, i;
}(), ha = "-ms-", Hg = "-moz-", tn = "-webkit-", XR = "comm", DE = "rule", ME = "decl", B2 = "@import", ZR = "@keyframes", H2 = "@layer", I2 = Math.abs, Zg = String.fromCharCode, Y2 = Object.assign;
function W2(i, s) {
  return Qr(i, 0) ^ 45 ? (((s << 2 ^ Qr(i, 0)) << 2 ^ Qr(i, 1)) << 2 ^ Qr(i, 2)) << 2 ^ Qr(i, 3) : 0;
}
function JR(i) {
  return i.trim();
}
function G2(i, s) {
  return (i = s.exec(i)) ? i[0] : i;
}
function nn(i, s, c) {
  return i.replace(s, c);
}
function mE(i, s) {
  return i.indexOf(s);
}
function Qr(i, s) {
  return i.charCodeAt(s) | 0;
}
function oh(i, s, c) {
  return i.slice(s, c);
}
function Ko(i) {
  return i.length;
}
function AE(i) {
  return i.length;
}
function Rg(i, s) {
  return s.push(i), i;
}
function q2(i, s) {
  return i.map(s).join("");
}
var Jg = 1, Nd = 1, e_ = 0, oi = 0, gr = 0, zd = "";
function e0(i, s, c, p, y, g, h) {
  return { value: i, root: s, parent: c, type: p, props: y, children: g, line: Jg, column: Nd, length: h, return: "" };
}
function Xv(i, s) {
  return Y2(e0("", null, null, "", null, null, 0), i, { length: -i.length }, s);
}
function Q2() {
  return gr;
}
function K2() {
  return gr = oi > 0 ? Qr(zd, --oi) : 0, Nd--, gr === 10 && (Nd = 1, Jg--), gr;
}
function bi() {
  return gr = oi < e_ ? Qr(zd, oi++) : 0, Nd++, gr === 10 && (Nd = 1, Jg++), gr;
}
function el() {
  return Qr(zd, oi);
}
function Ug() {
  return oi;
}
function dh(i, s) {
  return oh(zd, i, s);
}
function lh(i) {
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
function t_(i) {
  return Jg = Nd = 1, e_ = Ko(zd = i), oi = 0, [];
}
function n_(i) {
  return zd = "", i;
}
function jg(i) {
  return JR(dh(oi - 1, yE(i === 91 ? i + 2 : i === 40 ? i + 1 : i)));
}
function X2(i) {
  for (; (gr = el()) && gr < 33; )
    bi();
  return lh(i) > 2 || lh(gr) > 3 ? "" : " ";
}
function Z2(i, s) {
  for (; --s && bi() && !(gr < 48 || gr > 102 || gr > 57 && gr < 65 || gr > 70 && gr < 97); )
    ;
  return dh(i, Ug() + (s < 6 && el() == 32 && bi() == 32));
}
function yE(i) {
  for (; bi(); )
    switch (gr) {
      case i:
        return oi;
      case 34:
      case 39:
        i !== 34 && i !== 39 && yE(gr);
        break;
      case 40:
        i === 41 && yE(i);
        break;
      case 92:
        bi();
        break;
    }
  return oi;
}
function J2(i, s) {
  for (; bi() && i + gr !== 57; )
    if (i + gr === 84 && el() === 47)
      break;
  return "/*" + dh(s, oi - 1) + "*" + Zg(i === 47 ? i : bi());
}
function eL(i) {
  for (; !lh(el()); )
    bi();
  return dh(i, oi);
}
function tL(i) {
  return n_(Pg("", null, null, null, [""], i = t_(i), 0, [0], i));
}
function Pg(i, s, c, p, y, g, h, T, w) {
  for (var _ = 0, A = 0, O = h, L = 0, H = 0, Y = 0, B = 1, P = 1, se = 1, ae = 0, I = "", J = y, U = g, de = p, ie = I; P; )
    switch (Y = ae, ae = bi()) {
      case 40:
        if (Y != 108 && Qr(ie, O - 1) == 58) {
          mE(ie += nn(jg(ae), "&", "&\f"), "&\f") != -1 && (se = -1);
          break;
        }
      case 34:
      case 39:
      case 91:
        ie += jg(ae);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        ie += X2(Y);
        break;
      case 92:
        ie += Z2(Ug() - 1, 7);
        continue;
      case 47:
        switch (el()) {
          case 42:
          case 47:
            Rg(nL(J2(bi(), Ug()), s, c), w);
            break;
          default:
            ie += "/";
        }
        break;
      case 123 * B:
        T[_++] = Ko(ie) * se;
      case 125 * B:
      case 59:
      case 0:
        switch (ae) {
          case 0:
          case 125:
            P = 0;
          case 59 + A:
            se == -1 && (ie = nn(ie, /\f/g, "")), H > 0 && Ko(ie) - O && Rg(H > 32 ? rR(ie + ";", p, c, O - 1) : rR(nn(ie, " ", "") + ";", p, c, O - 2), w);
            break;
          case 59:
            ie += ";";
          default:
            if (Rg(de = nR(ie, s, c, _, A, y, T, I, J = [], U = [], O), g), ae === 123)
              if (A === 0)
                Pg(ie, s, de, de, J, g, O, T, U);
              else
                switch (L === 99 && Qr(ie, 3) === 110 ? 100 : L) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    Pg(i, de, de, p && Rg(nR(i, de, de, 0, 0, y, T, I, y, J = [], O), U), y, U, O, T, p ? J : U);
                    break;
                  default:
                    Pg(ie, de, de, de, [""], U, 0, T, U);
                }
        }
        _ = A = H = 0, B = se = 1, I = ie = "", O = h;
        break;
      case 58:
        O = 1 + Ko(ie), H = Y;
      default:
        if (B < 1) {
          if (ae == 123)
            --B;
          else if (ae == 125 && B++ == 0 && K2() == 125)
            continue;
        }
        switch (ie += Zg(ae), ae * B) {
          case 38:
            se = A > 0 ? 1 : (ie += "\f", -1);
            break;
          case 44:
            T[_++] = (Ko(ie) - 1) * se, se = 1;
            break;
          case 64:
            el() === 45 && (ie += jg(bi())), L = el(), A = O = Ko(I = ie += eL(Ug())), ae++;
            break;
          case 45:
            Y === 45 && Ko(ie) == 2 && (B = 0);
        }
    }
  return g;
}
function nR(i, s, c, p, y, g, h, T, w, _, A) {
  for (var O = y - 1, L = y === 0 ? g : [""], H = AE(L), Y = 0, B = 0, P = 0; Y < p; ++Y)
    for (var se = 0, ae = oh(i, O + 1, O = I2(B = h[Y])), I = i; se < H; ++se)
      (I = JR(B > 0 ? L[se] + " " + ae : nn(ae, /&\f/g, L[se]))) && (w[P++] = I);
  return e0(i, s, c, y === 0 ? DE : T, w, _, A);
}
function nL(i, s, c) {
  return e0(i, s, c, XR, Zg(Q2()), oh(i, 2, -2), 0);
}
function rR(i, s, c, p) {
  return e0(i, s, c, ME, oh(i, 0, p), oh(i, p + 1, -1), p);
}
function Md(i, s) {
  for (var c = "", p = AE(i), y = 0; y < p; y++)
    c += s(i[y], y, i, s) || "";
  return c;
}
function rL(i, s, c, p) {
  switch (i.type) {
    case H2:
      if (i.children.length) break;
    case B2:
    case ME:
      return i.return = i.return || i.value;
    case XR:
      return "";
    case ZR:
      return i.return = i.value + "{" + Md(i.children, p) + "}";
    case DE:
      i.value = i.props.join(",");
  }
  return Ko(c = Md(i.children, p)) ? i.return = i.value + "{" + c + "}" : "";
}
function aL(i) {
  var s = AE(i);
  return function(c, p, y, g) {
    for (var h = "", T = 0; T < s; T++)
      h += i[T](c, p, y, g) || "";
    return h;
  };
}
function iL(i) {
  return function(s) {
    s.root || (s = s.return) && i(s);
  };
}
var oL = function(s, c, p) {
  for (var y = 0, g = 0; y = g, g = el(), y === 38 && g === 12 && (c[p] = 1), !lh(g); )
    bi();
  return dh(s, oi);
}, lL = function(s, c) {
  var p = -1, y = 44;
  do
    switch (lh(y)) {
      case 0:
        y === 38 && el() === 12 && (c[p] = 1), s[p] += oL(oi - 1, c, p);
        break;
      case 2:
        s[p] += jg(y);
        break;
      case 4:
        if (y === 44) {
          s[++p] = el() === 58 ? "&\f" : "", c[p] = s[p].length;
          break;
        }
      default:
        s[p] += Zg(y);
    }
  while (y = bi());
  return s;
}, uL = function(s, c) {
  return n_(lL(t_(s), c));
}, aR = /* @__PURE__ */ new WeakMap(), sL = function(s) {
  if (!(s.type !== "rule" || !s.parent || // positive .length indicates that this rule contains pseudo
  // negative .length indicates that this rule has been already prefixed
  s.length < 1)) {
    for (var c = s.value, p = s.parent, y = s.column === p.column && s.line === p.line; p.type !== "rule"; )
      if (p = p.parent, !p) return;
    if (!(s.props.length === 1 && c.charCodeAt(0) !== 58 && !aR.get(p)) && !y) {
      aR.set(s, !0);
      for (var g = [], h = uL(c, g), T = p.props, w = 0, _ = 0; w < h.length; w++)
        for (var A = 0; A < T.length; A++, _++)
          s.props[_] = g[w] ? h[w].replace(/&\f/g, T[A]) : T[A] + " " + h[w];
    }
  }
}, cL = function(s) {
  if (s.type === "decl") {
    var c = s.value;
    // charcode for l
    c.charCodeAt(0) === 108 && // charcode for b
    c.charCodeAt(2) === 98 && (s.return = "", s.value = "");
  }
};
function r_(i, s) {
  switch (W2(i, s)) {
    case 5103:
      return tn + "print-" + i + i;
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
      return tn + i + i;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return tn + i + Hg + i + ha + i + i;
    case 6828:
    case 4268:
      return tn + i + ha + i + i;
    case 6165:
      return tn + i + ha + "flex-" + i + i;
    case 5187:
      return tn + i + nn(i, /(\w+).+(:[^]+)/, tn + "box-$1$2" + ha + "flex-$1$2") + i;
    case 5443:
      return tn + i + ha + "flex-item-" + nn(i, /flex-|-self/, "") + i;
    case 4675:
      return tn + i + ha + "flex-line-pack" + nn(i, /align-content|flex-|-self/, "") + i;
    case 5548:
      return tn + i + ha + nn(i, "shrink", "negative") + i;
    case 5292:
      return tn + i + ha + nn(i, "basis", "preferred-size") + i;
    case 6060:
      return tn + "box-" + nn(i, "-grow", "") + tn + i + ha + nn(i, "grow", "positive") + i;
    case 4554:
      return tn + nn(i, /([^-])(transform)/g, "$1" + tn + "$2") + i;
    case 6187:
      return nn(nn(nn(i, /(zoom-|grab)/, tn + "$1"), /(image-set)/, tn + "$1"), i, "") + i;
    case 5495:
    case 3959:
      return nn(i, /(image-set\([^]*)/, tn + "$1$`$1");
    case 4968:
      return nn(nn(i, /(.+:)(flex-)?(.*)/, tn + "box-pack:$3" + ha + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + tn + i + i;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return nn(i, /(.+)-inline(.+)/, tn + "$1$2") + i;
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
      if (Ko(i) - 1 - s > 6) switch (Qr(i, s + 1)) {
        case 109:
          if (Qr(i, s + 4) !== 45) break;
        case 102:
          return nn(i, /(.+:)(.+)-([^]+)/, "$1" + tn + "$2-$3$1" + Hg + (Qr(i, s + 3) == 108 ? "$3" : "$2-$3")) + i;
        case 115:
          return ~mE(i, "stretch") ? r_(nn(i, "stretch", "fill-available"), s) + i : i;
      }
      break;
    case 4949:
      if (Qr(i, s + 1) !== 115) break;
    case 6444:
      switch (Qr(i, Ko(i) - 3 - (~mE(i, "!important") && 10))) {
        case 107:
          return nn(i, ":", ":" + tn) + i;
        case 101:
          return nn(i, /(.+:)([^;!]+)(;|!.+)?/, "$1" + tn + (Qr(i, 14) === 45 ? "inline-" : "") + "box$3$1" + tn + "$2$3$1" + ha + "$2box$3") + i;
      }
      break;
    case 5936:
      switch (Qr(i, s + 11)) {
        case 114:
          return tn + i + ha + nn(i, /[svh]\w+-[tblr]{2}/, "tb") + i;
        case 108:
          return tn + i + ha + nn(i, /[svh]\w+-[tblr]{2}/, "tb-rl") + i;
        case 45:
          return tn + i + ha + nn(i, /[svh]\w+-[tblr]{2}/, "lr") + i;
      }
      return tn + i + ha + i + i;
  }
  return i;
}
var fL = function(s, c, p, y) {
  if (s.length > -1 && !s.return) switch (s.type) {
    case ME:
      s.return = r_(s.value, s.length);
      break;
    case ZR:
      return Md([Xv(s, {
        value: nn(s.value, "@", "@" + tn)
      })], y);
    case DE:
      if (s.length) return q2(s.props, function(g) {
        switch (G2(g, /(::plac\w+|:read-\w+)/)) {
          case ":read-only":
          case ":read-write":
            return Md([Xv(s, {
              props: [nn(g, /:(read-\w+)/, ":" + Hg + "$1")]
            })], y);
          case "::placeholder":
            return Md([Xv(s, {
              props: [nn(g, /:(plac\w+)/, ":" + tn + "input-$1")]
            }), Xv(s, {
              props: [nn(g, /:(plac\w+)/, ":" + Hg + "$1")]
            }), Xv(s, {
              props: [nn(g, /:(plac\w+)/, ha + "input-$1")]
            })], y);
        }
        return "";
      });
  }
}, dL = [fL], pL = function(s) {
  var c = s.key;
  if (c === "css") {
    var p = document.querySelectorAll("style[data-emotion]:not([data-s])");
    Array.prototype.forEach.call(p, function(B) {
      var P = B.getAttribute("data-emotion");
      P.indexOf(" ") !== -1 && (document.head.appendChild(B), B.setAttribute("data-s", ""));
    });
  }
  var y = s.stylisPlugins || dL, g = {}, h, T = [];
  h = s.container || document.head, Array.prototype.forEach.call(
    // this means we will ignore elements which don't have a space in them which
    // means that the style elements we're looking at are only Emotion 11 server-rendered style elements
    document.querySelectorAll('style[data-emotion^="' + c + ' "]'),
    function(B) {
      for (var P = B.getAttribute("data-emotion").split(" "), se = 1; se < P.length; se++)
        g[P[se]] = !0;
      T.push(B);
    }
  );
  var w, _ = [sL, cL];
  {
    var A, O = [rL, iL(function(B) {
      A.insert(B);
    })], L = aL(_.concat(y, O)), H = function(P) {
      return Md(tL(P), L);
    };
    w = function(P, se, ae, I) {
      A = ae, H(P ? P + "{" + se.styles + "}" : se.styles), I && (Y.inserted[se.name] = !0);
    };
  }
  var Y = {
    key: c,
    sheet: new V2({
      key: c,
      container: h,
      nonce: s.nonce,
      speedy: s.speedy,
      prepend: s.prepend,
      insertionPoint: s.insertionPoint
    }),
    nonce: s.nonce,
    inserted: g,
    registered: {},
    insert: w
  };
  return Y.sheet.hydrate(T), Y;
}, a_ = kE(), vL = {
  $$typeof: !0,
  render: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0
}, hL = {
  $$typeof: !0,
  compare: !0,
  defaultProps: !0,
  displayName: !0,
  propTypes: !0,
  type: !0
}, i_ = {};
i_[a_.ForwardRef] = vL;
i_[a_.Memo] = hL;
var mL = !0;
function yL(i, s, c) {
  var p = "";
  return c.split(" ").forEach(function(y) {
    i[y] !== void 0 ? s.push(i[y] + ";") : y && (p += y + " ");
  }), p;
}
var o_ = function(s, c, p) {
  var y = s.key + "-" + c.name;
  // we only need to add the styles to the registered cache if the
  // class name could be used further down
  // the tree but if it's a string tag, we know it won't
  // so we don't have to add it to registered cache.
  // this improves memory usage since we can avoid storing the whole style string
  (p === !1 || // we need to always store it if we're in compat mode and
  // in node since emotion-server relies on whether a style is in
  // the registered cache to know whether a style is global or not
  // also, note that this check will be dead code eliminated in the browser
  mL === !1) && s.registered[y] === void 0 && (s.registered[y] = c.styles);
}, l_ = function(s, c, p) {
  o_(s, c, p);
  var y = s.key + "-" + c.name;
  if (s.inserted[c.name] === void 0) {
    var g = c;
    do
      s.insert(c === g ? "." + y : "", g, s.sheet, !0), g = g.next;
    while (g !== void 0);
  }
};
function gL(i) {
  for (var s = 0, c, p = 0, y = i.length; y >= 4; ++p, y -= 4)
    c = i.charCodeAt(p) & 255 | (i.charCodeAt(++p) & 255) << 8 | (i.charCodeAt(++p) & 255) << 16 | (i.charCodeAt(++p) & 255) << 24, c = /* Math.imul(k, m): */
    (c & 65535) * 1540483477 + ((c >>> 16) * 59797 << 16), c ^= /* k >>> r: */
    c >>> 24, s = /* Math.imul(k, m): */
    (c & 65535) * 1540483477 + ((c >>> 16) * 59797 << 16) ^ /* Math.imul(h, m): */
    (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  switch (y) {
    case 3:
      s ^= (i.charCodeAt(p + 2) & 255) << 16;
    case 2:
      s ^= (i.charCodeAt(p + 1) & 255) << 8;
    case 1:
      s ^= i.charCodeAt(p) & 255, s = /* Math.imul(h, m): */
      (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16);
  }
  return s ^= s >>> 13, s = /* Math.imul(h, m): */
  (s & 65535) * 1540483477 + ((s >>> 16) * 59797 << 16), ((s ^ s >>> 15) >>> 0).toString(36);
}
var SL = {
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
}, bL = !1, CL = /[A-Z]|^ms/g, EL = /_EMO_([^_]+?)_([^]*?)_EMO_/g, u_ = function(s) {
  return s.charCodeAt(1) === 45;
}, iR = function(s) {
  return s != null && typeof s != "boolean";
}, tE = /* @__PURE__ */ KR(function(i) {
  return u_(i) ? i : i.replace(CL, "-$&").toLowerCase();
}), oR = function(s, c) {
  switch (s) {
    case "animation":
    case "animationName":
      if (typeof c == "string")
        return c.replace(EL, function(p, y, g) {
          return Xo = {
            name: y,
            styles: g,
            next: Xo
          }, y;
        });
  }
  return SL[s] !== 1 && !u_(s) && typeof c == "number" && c !== 0 ? c + "px" : c;
}, TL = "Component selectors can only be used in conjunction with @emotion/babel-plugin, the swc Emotion plugin, or another Emotion-aware compiler transform.";
function uh(i, s, c) {
  if (c == null)
    return "";
  var p = c;
  if (p.__emotion_styles !== void 0)
    return p;
  switch (typeof c) {
    case "boolean":
      return "";
    case "object": {
      var y = c;
      if (y.anim === 1)
        return Xo = {
          name: y.name,
          styles: y.styles,
          next: Xo
        }, y.name;
      var g = c;
      if (g.styles !== void 0) {
        var h = g.next;
        if (h !== void 0)
          for (; h !== void 0; )
            Xo = {
              name: h.name,
              styles: h.styles,
              next: Xo
            }, h = h.next;
        var T = g.styles + ";";
        return T;
      }
      return xL(i, s, c);
    }
    case "function": {
      if (i !== void 0) {
        var w = Xo, _ = c(i);
        return Xo = w, uh(i, s, _);
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
function xL(i, s, c) {
  var p = "";
  if (Array.isArray(c))
    for (var y = 0; y < c.length; y++)
      p += uh(i, s, c[y]) + ";";
  else
    for (var g in c) {
      var h = c[g];
      if (typeof h != "object") {
        var T = h;
        s != null && s[T] !== void 0 ? p += g + "{" + s[T] + "}" : iR(T) && (p += tE(g) + ":" + oR(g, T) + ";");
      } else {
        if (g === "NO_COMPONENT_SELECTOR" && bL)
          throw new Error(TL);
        if (Array.isArray(h) && typeof h[0] == "string" && (s == null || s[h[0]] === void 0))
          for (var w = 0; w < h.length; w++)
            iR(h[w]) && (p += tE(g) + ":" + oR(g, h[w]) + ";");
        else {
          var _ = uh(i, s, h);
          switch (g) {
            case "animation":
            case "animationName": {
              p += tE(g) + ":" + _ + ";";
              break;
            }
            default:
              p += g + "{" + _ + "}";
          }
        }
      }
    }
  return p;
}
var lR = /label:\s*([^\s;{]+)\s*(;|$)/g, Xo;
function NE(i, s, c) {
  if (i.length === 1 && typeof i[0] == "object" && i[0] !== null && i[0].styles !== void 0)
    return i[0];
  var p = !0, y = "";
  Xo = void 0;
  var g = i[0];
  if (g == null || g.raw === void 0)
    p = !1, y += uh(c, s, g);
  else {
    var h = g;
    y += h[0];
  }
  for (var T = 1; T < i.length; T++)
    if (y += uh(c, s, i[T]), p) {
      var w = g;
      y += w[T];
    }
  lR.lastIndex = 0;
  for (var _ = "", A; (A = lR.exec(y)) !== null; )
    _ += "-" + A[1];
  var O = gL(y) + _;
  return {
    name: O,
    styles: y,
    next: Xo
  };
}
var wL = function(s) {
  return s();
}, s_ = De.useInsertionEffect ? De.useInsertionEffect : !1, RL = s_ || wL, uR = s_ || De.useLayoutEffect, c_ = /* @__PURE__ */ De.createContext(
  // we're doing this to avoid preconstruct's dead code elimination in this one case
  // because this module is primarily intended for the browser and node
  // but it's also required in react native and similar environments sometimes
  // and we could have a special build just for that
  // but this is much easier and the native packages
  // might use a different theme context in the future anyway
  typeof HTMLElement < "u" ? /* @__PURE__ */ pL({
    key: "css"
  }) : null
);
c_.Provider;
var f_ = function(s) {
  return /* @__PURE__ */ ZN(function(c, p) {
    var y = JN(c_);
    return s(c, y, p);
  });
}, t0 = /* @__PURE__ */ De.createContext({}), _L = /* @__PURE__ */ f_(function(i, s) {
  var c = i.styles, p = NE([c], void 0, De.useContext(t0)), y = De.useRef();
  return uR(function() {
    var g = s.key + "-global", h = new s.sheet.constructor({
      key: g,
      nonce: s.sheet.nonce,
      container: s.sheet.container,
      speedy: s.sheet.isSpeedy
    }), T = !1, w = document.querySelector('style[data-emotion="' + g + " " + p.name + '"]');
    return s.sheet.tags.length && (h.before = s.sheet.tags[0]), w !== null && (T = !0, w.setAttribute("data-emotion", g), h.hydrate([w])), y.current = [h, T], function() {
      h.flush();
    };
  }, [s]), uR(function() {
    var g = y.current, h = g[0], T = g[1];
    if (T) {
      g[1] = !1;
      return;
    }
    if (p.next !== void 0 && l_(s, p.next, !0), h.tags.length) {
      var w = h.tags[h.tags.length - 1].nextElementSibling;
      h.before = w, h.flush();
    }
    s.insert("", p, h, !1);
  }, [s, p.name]), null;
});
function kL() {
  for (var i = arguments.length, s = new Array(i), c = 0; c < i; c++)
    s[c] = arguments[c];
  return NE(s);
}
var LE = function() {
  var s = kL.apply(void 0, arguments), c = "animation-" + s.name;
  return {
    name: c,
    styles: "@keyframes " + c + "{" + s.styles + "}",
    anim: 1,
    toString: function() {
      return "_EMO_" + this.name + "_" + this.styles + "_EMO_";
    }
  };
}, OL = j2, DL = function(s) {
  return s !== "theme";
}, sR = function(s) {
  return typeof s == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  s.charCodeAt(0) > 96 ? OL : DL;
}, cR = function(s, c, p) {
  var y;
  if (c) {
    var g = c.shouldForwardProp;
    y = s.__emotion_forwardProp && g ? function(h) {
      return s.__emotion_forwardProp(h) && g(h);
    } : g;
  }
  return typeof y != "function" && p && (y = s.__emotion_forwardProp), y;
}, ML = !1, AL = function(s) {
  var c = s.cache, p = s.serialized, y = s.isStringTag;
  return o_(c, p, y), RL(function() {
    return l_(c, p, y);
  }), null;
}, NL = function i(s, c) {
  var p = s.__emotion_real === s, y = p && s.__emotion_base || s, g, h;
  c !== void 0 && (g = c.label, h = c.target);
  var T = cR(s, c, p), w = T || sR(y), _ = !w("as");
  return function() {
    var A = arguments, O = p && s.__emotion_styles !== void 0 ? s.__emotion_styles.slice(0) : [];
    if (g !== void 0 && O.push("label:" + g + ";"), A[0] == null || A[0].raw === void 0)
      O.push.apply(O, A);
    else {
      O.push(A[0][0]);
      for (var L = A.length, H = 1; H < L; H++)
        O.push(A[H], A[0][H]);
    }
    var Y = f_(function(B, P, se) {
      var ae = _ && B.as || y, I = "", J = [], U = B;
      if (B.theme == null) {
        U = {};
        for (var de in B)
          U[de] = B[de];
        U.theme = De.useContext(t0);
      }
      typeof B.className == "string" ? I = yL(P.registered, J, B.className) : B.className != null && (I = B.className + " ");
      var ie = NE(O.concat(J), P.registered, U);
      I += P.key + "-" + ie.name, h !== void 0 && (I += " " + h);
      var Xe = _ && T === void 0 ? sR(ae) : w, D = {};
      for (var ce in B)
        _ && ce === "as" || Xe(ce) && (D[ce] = B[ce]);
      return D.className = I, se && (D.ref = se), /* @__PURE__ */ De.createElement(De.Fragment, null, /* @__PURE__ */ De.createElement(AL, {
        cache: P,
        serialized: ie,
        isStringTag: typeof ae == "string"
      }), /* @__PURE__ */ De.createElement(ae, D));
    });
    return Y.displayName = g !== void 0 ? g : "Styled(" + (typeof y == "string" ? y : y.displayName || y.name || "Component") + ")", Y.defaultProps = s.defaultProps, Y.__emotion_real = Y, Y.__emotion_base = y, Y.__emotion_styles = O, Y.__emotion_forwardProp = T, Object.defineProperty(Y, "toString", {
      value: function() {
        return h === void 0 && ML ? "NO_COMPONENT_SELECTOR" : "." + h;
      }
    }), Y.withComponent = function(B, P) {
      return i(B, Bg({}, c, P, {
        shouldForwardProp: cR(Y, P, !0)
      })).apply(void 0, O);
    }, Y;
  };
}, LL = [
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
], gE = NL.bind();
LL.forEach(function(i) {
  gE[i] = gE(i);
});
function zL(i) {
  return i == null || Object.keys(i).length === 0;
}
function zE(i) {
  const {
    styles: s,
    defaultTheme: c = {}
  } = i, p = typeof s == "function" ? (y) => s(zL(y) ? c : y) : s;
  return /* @__PURE__ */ Ae.jsx(_L, {
    styles: p
  });
}
process.env.NODE_ENV !== "production" && (zE.propTypes = {
  defaultTheme: R.object,
  styles: R.oneOfType([R.array, R.string, R.object, R.func])
});
/**
 * @mui/styled-engine v6.1.1
 *
 * @license MIT
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
function UL(i, s) {
  const c = gE(i, s);
  return process.env.NODE_ENV !== "production" ? (...p) => {
    const y = typeof i == "string" ? `"${i}"` : "component";
    return p.length === 0 ? console.error([`MUI: Seems like you called \`styled(${y})()\` without a \`style\` argument.`, 'You must provide a `styles` argument: `styled("div")(styleYouForgotToPass)`.'].join(`
`)) : p.some((g) => g === void 0) && console.error(`MUI: the styled(${y})(...args) API requires all its args to be defined.`), c(...p);
  } : c;
}
const jL = (i, s) => {
  Array.isArray(i.__emotion_styles) && (i.__emotion_styles = s(i.__emotion_styles));
};
function Zo(i) {
  if (typeof i != "object" || i === null)
    return !1;
  const s = Object.getPrototypeOf(i);
  return (s === null || s === Object.prototype || Object.getPrototypeOf(s) === null) && !(Symbol.toStringTag in i) && !(Symbol.iterator in i);
}
function d_(i) {
  if (!Zo(i))
    return i;
  const s = {};
  return Object.keys(i).forEach((c) => {
    s[c] = d_(i[c]);
  }), s;
}
function Na(i, s, c = {
  clone: !0
}) {
  const p = c.clone ? {
    ...i
  } : i;
  return Zo(i) && Zo(s) && Object.keys(s).forEach((y) => {
    Zo(s[y]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(i, y) && Zo(i[y]) ? p[y] = Na(i[y], s[y], c) : c.clone ? p[y] = Zo(s[y]) ? d_(s[y]) : s[y] : p[y] = s[y];
  }), p;
}
const PL = (i) => {
  const s = Object.keys(i).map((c) => ({
    key: c,
    val: i[c]
  })) || [];
  return s.sort((c, p) => c.val - p.val), s.reduce((c, p) => ({
    ...c,
    [p.key]: p.val
  }), {});
};
function FL(i) {
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
    step: p = 5,
    ...y
  } = i, g = PL(s), h = Object.keys(g);
  function T(L) {
    return `@media (min-width:${typeof s[L] == "number" ? s[L] : L}${c})`;
  }
  function w(L) {
    return `@media (max-width:${(typeof s[L] == "number" ? s[L] : L) - p / 100}${c})`;
  }
  function _(L, H) {
    const Y = h.indexOf(H);
    return `@media (min-width:${typeof s[L] == "number" ? s[L] : L}${c}) and (max-width:${(Y !== -1 && typeof s[h[Y]] == "number" ? s[h[Y]] : H) - p / 100}${c})`;
  }
  function A(L) {
    return h.indexOf(L) + 1 < h.length ? _(L, h[h.indexOf(L) + 1]) : T(L);
  }
  function O(L) {
    const H = h.indexOf(L);
    return H === 0 ? T(h[1]) : H === h.length - 1 ? w(h[H]) : _(L, h[h.indexOf(L) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: h,
    values: g,
    up: T,
    down: w,
    between: _,
    only: A,
    not: O,
    unit: c,
    ...y
  };
}
function $L(i, s) {
  if (!i.containerQueries)
    return s;
  const c = Object.keys(s).filter((p) => p.startsWith("@container")).sort((p, y) => {
    var h, T;
    const g = /min-width:\s*([0-9.]+)/;
    return +(((h = p.match(g)) == null ? void 0 : h[1]) || 0) - +(((T = y.match(g)) == null ? void 0 : T[1]) || 0);
  });
  return c.length ? c.reduce((p, y) => {
    const g = s[y];
    return delete p[y], p[y] = g, p;
  }, {
    ...s
  }) : s;
}
function VL(i, s) {
  return s === "@" || s.startsWith("@") && (i.some((c) => s.startsWith(`@${c}`)) || !!s.match(/^@\d/));
}
function BL(i, s) {
  const c = s.match(/^@([^/]+)?\/?(.+)?$/);
  if (!c) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${s})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : us(18, `(${s})`));
    return null;
  }
  const [, p, y] = c, g = Number.isNaN(+p) ? p || 0 : +p;
  return i.containerQueries(y).up(g);
}
function HL(i) {
  const s = (g, h) => g.replace("@media", h ? `@container ${h}` : "@container");
  function c(g, h) {
    g.up = (...T) => s(i.breakpoints.up(...T), h), g.down = (...T) => s(i.breakpoints.down(...T), h), g.between = (...T) => s(i.breakpoints.between(...T), h), g.only = (...T) => s(i.breakpoints.only(...T), h), g.not = (...T) => {
      const w = s(i.breakpoints.not(...T), h);
      return w.includes("not all and") ? w.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : w;
    };
  }
  const p = {}, y = (g) => (c(p, g), p);
  return c(y), {
    ...i,
    containerQueries: y
  };
}
const IL = {
  borderRadius: 4
}, cs = process.env.NODE_ENV !== "production" ? R.oneOfType([R.number, R.string, R.object, R.array]) : {};
function nh(i, s) {
  return s ? Na(i, s, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : i;
}
const n0 = {
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
}, fR = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (i) => `@media (min-width:${n0[i]}px)`
}, YL = {
  containerQueries: (i) => ({
    up: (s) => {
      let c = typeof s == "number" ? s : n0[s] || s;
      return typeof c == "number" && (c = `${c}px`), i ? `@container ${i} (min-width:${c})` : `@container (min-width:${c})`;
    }
  })
};
function mo(i, s, c) {
  const p = i.theme || {};
  if (Array.isArray(s)) {
    const g = p.breakpoints || fR;
    return s.reduce((h, T, w) => (h[g.up(g.keys[w])] = c(s[w]), h), {});
  }
  if (typeof s == "object") {
    const g = p.breakpoints || fR;
    return Object.keys(s).reduce((h, T) => {
      if (VL(g.keys, T)) {
        const w = BL(p.containerQueries ? p : YL, T);
        w && (h[w] = c(s[T], T));
      } else if (Object.keys(g.values || n0).includes(T)) {
        const w = g.up(T);
        h[w] = c(s[T], T);
      } else {
        const w = T;
        h[w] = s[w];
      }
      return h;
    }, {});
  }
  return c(s);
}
function p_(i = {}) {
  var c;
  return ((c = i.keys) == null ? void 0 : c.reduce((p, y) => {
    const g = i.up(y);
    return p[g] = {}, p;
  }, {})) || {};
}
function v_(i, s) {
  return i.reduce((c, p) => {
    const y = c[p];
    return (!y || Object.keys(y).length === 0) && delete c[p], c;
  }, s);
}
function WL(i, ...s) {
  const c = p_(i), p = [c, ...s].reduce((y, g) => Na(y, g), {});
  return v_(Object.keys(c), p);
}
function GL(i, s) {
  if (typeof i != "object")
    return {};
  const c = {}, p = Object.keys(s);
  return Array.isArray(i) ? p.forEach((y, g) => {
    g < i.length && (c[y] = !0);
  }) : p.forEach((y) => {
    i[y] != null && (c[y] = !0);
  }), c;
}
function nE({
  values: i,
  breakpoints: s,
  base: c
}) {
  const p = c || GL(i, s), y = Object.keys(p);
  if (y.length === 0)
    return i;
  let g;
  return y.reduce((h, T, w) => (Array.isArray(i) ? (h[T] = i[w] != null ? i[w] : i[g], g = w) : typeof i == "object" ? (h[T] = i[T] != null ? i[T] : i[g], g = T) : h[T] = i, h), {});
}
function Kr(i) {
  if (typeof i != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : us(7));
  return i.charAt(0).toUpperCase() + i.slice(1);
}
function r0(i, s, c = !0) {
  if (!s || typeof s != "string")
    return null;
  if (i && i.vars && c) {
    const p = `vars.${s}`.split(".").reduce((y, g) => y && y[g] ? y[g] : null, i);
    if (p != null)
      return p;
  }
  return s.split(".").reduce((p, y) => p && p[y] != null ? p[y] : null, i);
}
function Ig(i, s, c, p = c) {
  let y;
  return typeof i == "function" ? y = i(c) : Array.isArray(i) ? y = i[c] || p : y = r0(i, c) || p, s && (y = s(y, p, i)), y;
}
function ur(i) {
  const {
    prop: s,
    cssProperty: c = i.prop,
    themeKey: p,
    transform: y
  } = i, g = (h) => {
    if (h[s] == null)
      return null;
    const T = h[s], w = h.theme, _ = r0(w, p) || {};
    return mo(h, T, (O) => {
      let L = Ig(_, y, O);
      return O === L && typeof O == "string" && (L = Ig(_, y, `${s}${O === "default" ? "" : Kr(O)}`, O)), c === !1 ? L : {
        [c]: L
      };
    });
  };
  return g.propTypes = process.env.NODE_ENV !== "production" ? {
    [s]: cs
  } : {}, g.filterProps = [s], g;
}
function qL(i) {
  const s = {};
  return (c) => (s[c] === void 0 && (s[c] = i(c)), s[c]);
}
const QL = {
  m: "margin",
  p: "padding"
}, KL = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, dR = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, XL = qL((i) => {
  if (i.length > 2)
    if (dR[i])
      i = dR[i];
    else
      return [i];
  const [s, c] = i.split(""), p = QL[s], y = KL[c] || "";
  return Array.isArray(y) ? y.map((g) => p + g) : [p + y];
}), a0 = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], i0 = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], ZL = [...a0, ...i0];
function ph(i, s, c, p) {
  const y = r0(i, s, !0) ?? c;
  return typeof y == "number" || typeof y == "string" ? (g) => typeof g == "string" ? g : (process.env.NODE_ENV !== "production" && typeof g != "number" && console.error(`MUI: Expected ${p} argument to be a number or a string, got ${g}.`), typeof y == "string" ? `calc(${g} * ${y})` : y * g) : Array.isArray(y) ? (g) => {
    if (typeof g == "string")
      return g;
    const h = Math.abs(g);
    process.env.NODE_ENV !== "production" && (Number.isInteger(h) ? h > y.length - 1 && console.error([`MUI: The value provided (${h}) overflows.`, `The supported values are: ${JSON.stringify(y)}.`, `${h} > ${y.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${s}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${s}\` as a number.`].join(`
`)));
    const T = y[h];
    return g >= 0 ? T : typeof T == "number" ? -T : `-${T}`;
  } : typeof y == "function" ? y : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${s}\` value (${y}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function o0(i) {
  return ph(i, "spacing", 8, "spacing");
}
function xc(i, s) {
  return typeof s == "string" || s == null ? s : i(s);
}
function JL(i, s) {
  return (c) => i.reduce((p, y) => (p[y] = xc(s, c), p), {});
}
function ez(i, s, c, p) {
  if (!s.includes(c))
    return null;
  const y = XL(c), g = JL(y, p), h = i[c];
  return mo(i, h, g);
}
function h_(i, s) {
  const c = o0(i.theme);
  return Object.keys(i).map((p) => ez(i, s, p, c)).reduce(nh, {});
}
function Kn(i) {
  return h_(i, a0);
}
Kn.propTypes = process.env.NODE_ENV !== "production" ? a0.reduce((i, s) => (i[s] = cs, i), {}) : {};
Kn.filterProps = a0;
function Xn(i) {
  return h_(i, i0);
}
Xn.propTypes = process.env.NODE_ENV !== "production" ? i0.reduce((i, s) => (i[s] = cs, i), {}) : {};
Xn.filterProps = i0;
process.env.NODE_ENV !== "production" && ZL.reduce((i, s) => (i[s] = cs, i), {});
function m_(i = 8, s = o0({
  spacing: i
})) {
  if (i.mui)
    return i;
  const c = (...p) => (process.env.NODE_ENV !== "production" && (p.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${p.length}`)), (p.length === 0 ? [1] : p).map((g) => {
    const h = s(g);
    return typeof h == "number" ? `${h}px` : h;
  }).join(" "));
  return c.mui = !0, c;
}
function l0(...i) {
  const s = i.reduce((p, y) => (y.filterProps.forEach((g) => {
    p[g] = y;
  }), p), {}), c = (p) => Object.keys(p).reduce((y, g) => s[g] ? nh(y, s[g](p)) : y, {});
  return c.propTypes = process.env.NODE_ENV !== "production" ? i.reduce((p, y) => Object.assign(p, y.propTypes), {}) : {}, c.filterProps = i.reduce((p, y) => p.concat(y.filterProps), []), c;
}
function Pi(i) {
  return typeof i != "number" ? i : `${i}px solid`;
}
function Fi(i, s) {
  return ur({
    prop: i,
    themeKey: "borders",
    transform: s
  });
}
const tz = Fi("border", Pi), nz = Fi("borderTop", Pi), rz = Fi("borderRight", Pi), az = Fi("borderBottom", Pi), iz = Fi("borderLeft", Pi), oz = Fi("borderColor"), lz = Fi("borderTopColor"), uz = Fi("borderRightColor"), sz = Fi("borderBottomColor"), cz = Fi("borderLeftColor"), fz = Fi("outline", Pi), dz = Fi("outlineColor"), u0 = (i) => {
  if (i.borderRadius !== void 0 && i.borderRadius !== null) {
    const s = ph(i.theme, "shape.borderRadius", 4, "borderRadius"), c = (p) => ({
      borderRadius: xc(s, p)
    });
    return mo(i, i.borderRadius, c);
  }
  return null;
};
u0.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: cs
} : {};
u0.filterProps = ["borderRadius"];
l0(tz, nz, rz, az, iz, oz, lz, uz, sz, cz, u0, fz, dz);
const s0 = (i) => {
  if (i.gap !== void 0 && i.gap !== null) {
    const s = ph(i.theme, "spacing", 8, "gap"), c = (p) => ({
      gap: xc(s, p)
    });
    return mo(i, i.gap, c);
  }
  return null;
};
s0.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: cs
} : {};
s0.filterProps = ["gap"];
const c0 = (i) => {
  if (i.columnGap !== void 0 && i.columnGap !== null) {
    const s = ph(i.theme, "spacing", 8, "columnGap"), c = (p) => ({
      columnGap: xc(s, p)
    });
    return mo(i, i.columnGap, c);
  }
  return null;
};
c0.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: cs
} : {};
c0.filterProps = ["columnGap"];
const f0 = (i) => {
  if (i.rowGap !== void 0 && i.rowGap !== null) {
    const s = ph(i.theme, "spacing", 8, "rowGap"), c = (p) => ({
      rowGap: xc(s, p)
    });
    return mo(i, i.rowGap, c);
  }
  return null;
};
f0.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: cs
} : {};
f0.filterProps = ["rowGap"];
const pz = ur({
  prop: "gridColumn"
}), vz = ur({
  prop: "gridRow"
}), hz = ur({
  prop: "gridAutoFlow"
}), mz = ur({
  prop: "gridAutoColumns"
}), yz = ur({
  prop: "gridAutoRows"
}), gz = ur({
  prop: "gridTemplateColumns"
}), Sz = ur({
  prop: "gridTemplateRows"
}), bz = ur({
  prop: "gridTemplateAreas"
}), Cz = ur({
  prop: "gridArea"
});
l0(s0, c0, f0, pz, vz, hz, mz, yz, gz, Sz, bz, Cz);
function Ad(i, s) {
  return s === "grey" ? s : i;
}
const Ez = ur({
  prop: "color",
  themeKey: "palette",
  transform: Ad
}), Tz = ur({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ad
}), xz = ur({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ad
});
l0(Ez, Tz, xz);
function Si(i) {
  return i <= 1 && i !== 0 ? `${i * 100}%` : i;
}
const wz = ur({
  prop: "width",
  transform: Si
}), UE = (i) => {
  if (i.maxWidth !== void 0 && i.maxWidth !== null) {
    const s = (c) => {
      var y, g, h, T, w;
      const p = ((h = (g = (y = i.theme) == null ? void 0 : y.breakpoints) == null ? void 0 : g.values) == null ? void 0 : h[c]) || n0[c];
      return p ? ((w = (T = i.theme) == null ? void 0 : T.breakpoints) == null ? void 0 : w.unit) !== "px" ? {
        maxWidth: `${p}${i.theme.breakpoints.unit}`
      } : {
        maxWidth: p
      } : {
        maxWidth: Si(c)
      };
    };
    return mo(i, i.maxWidth, s);
  }
  return null;
};
UE.filterProps = ["maxWidth"];
const Rz = ur({
  prop: "minWidth",
  transform: Si
}), _z = ur({
  prop: "height",
  transform: Si
}), kz = ur({
  prop: "maxHeight",
  transform: Si
}), Oz = ur({
  prop: "minHeight",
  transform: Si
});
ur({
  prop: "size",
  cssProperty: "width",
  transform: Si
});
ur({
  prop: "size",
  cssProperty: "height",
  transform: Si
});
const Dz = ur({
  prop: "boxSizing"
});
l0(wz, UE, Rz, _z, kz, Oz, Dz);
const vh = {
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
    style: u0
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ad
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ad
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ad
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
    style: s0
  },
  rowGap: {
    style: f0
  },
  columnGap: {
    style: c0
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
    transform: Si
  },
  maxWidth: {
    style: UE
  },
  minWidth: {
    transform: Si
  },
  height: {
    transform: Si
  },
  maxHeight: {
    transform: Si
  },
  minHeight: {
    transform: Si
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
function Mz(...i) {
  const s = i.reduce((p, y) => p.concat(Object.keys(y)), []), c = new Set(s);
  return i.every((p) => c.size === Object.keys(p).length);
}
function Az(i, s) {
  return typeof i == "function" ? i(s) : i;
}
function Nz() {
  function i(c, p, y, g) {
    const h = {
      [c]: p,
      theme: y
    }, T = g[c];
    if (!T)
      return {
        [c]: p
      };
    const {
      cssProperty: w = c,
      themeKey: _,
      transform: A,
      style: O
    } = T;
    if (p == null)
      return null;
    if (_ === "typography" && p === "inherit")
      return {
        [c]: p
      };
    const L = r0(y, _) || {};
    return O ? O(h) : mo(h, p, (Y) => {
      let B = Ig(L, A, Y);
      return Y === B && typeof Y == "string" && (B = Ig(L, A, `${c}${Y === "default" ? "" : Kr(Y)}`, Y)), w === !1 ? B : {
        [w]: B
      };
    });
  }
  function s(c) {
    const {
      sx: p,
      theme: y = {}
    } = c || {};
    if (!p)
      return null;
    const g = y.unstable_sxConfig ?? vh;
    function h(T) {
      let w = T;
      if (typeof T == "function")
        w = T(y);
      else if (typeof T != "object")
        return T;
      if (!w)
        return null;
      const _ = p_(y.breakpoints), A = Object.keys(_);
      let O = _;
      return Object.keys(w).forEach((L) => {
        const H = Az(w[L], y);
        if (H != null)
          if (typeof H == "object")
            if (g[L])
              O = nh(O, i(L, H, y, g));
            else {
              const Y = mo({
                theme: y
              }, H, (B) => ({
                [L]: B
              }));
              Mz(Y, H) ? O[L] = s({
                sx: H,
                theme: y
              }) : O = nh(O, Y);
            }
          else
            O = nh(O, i(L, H, y, g));
      }), $L(y, v_(A, O));
    }
    return Array.isArray(p) ? p.map(h) : h(p);
  }
  return s;
}
const Ud = Nz();
Ud.filterProps = ["sx"];
function Lz(i, s) {
  var p;
  const c = this;
  if (c.vars) {
    if (!((p = c.colorSchemes) != null && p[i]) || typeof c.getColorSchemeSelector != "function")
      return {};
    let y = c.getColorSchemeSelector(i);
    return y === "&" ? s : ((y.includes("data-") || y.includes(".")) && (y = `*:where(${y.replace(/\s*&$/, "")}) &`), {
      [y]: s
    });
  }
  return c.palette.mode === i ? s : {};
}
function d0(i = {}, ...s) {
  const {
    breakpoints: c = {},
    palette: p = {},
    spacing: y,
    shape: g = {},
    ...h
  } = i, T = FL(c), w = m_(y);
  let _ = Na({
    breakpoints: T,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...p
    },
    spacing: w,
    shape: {
      ...IL,
      ...g
    }
  }, h);
  return _ = HL(_), _.applyStyles = Lz, _ = s.reduce((A, O) => Na(A, O), _), _.unstable_sxConfig = {
    ...vh,
    ...h == null ? void 0 : h.unstable_sxConfig
  }, _.unstable_sx = function(O) {
    return Ud({
      sx: O,
      theme: this
    });
  }, _;
}
function zz(i) {
  return Object.keys(i).length === 0;
}
function y_(i = null) {
  const s = De.useContext(t0);
  return !s || zz(s) ? i : s;
}
const Uz = d0();
function jE(i = Uz) {
  return y_(i);
}
function g_({
  styles: i,
  themeId: s,
  defaultTheme: c = {}
}) {
  const p = jE(c), y = typeof i == "function" ? i(s && p[s] || p) : i;
  return /* @__PURE__ */ Ae.jsx(zE, {
    styles: y
  });
}
process.env.NODE_ENV !== "production" && (g_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  defaultTheme: R.object,
  /**
   * @ignore
   */
  styles: R.oneOfType([R.array, R.func, R.number, R.object, R.string, R.bool]),
  /**
   * @ignore
   */
  themeId: R.string
});
const jz = (i) => {
  var p;
  const s = {
    systemProps: {},
    otherProps: {}
  }, c = ((p = i == null ? void 0 : i.theme) == null ? void 0 : p.unstable_sxConfig) ?? vh;
  return Object.keys(i).forEach((y) => {
    c[y] ? s.systemProps[y] = i[y] : s.otherProps[y] = i[y];
  }), s;
};
function S_(i) {
  const {
    sx: s,
    ...c
  } = i, {
    systemProps: p,
    otherProps: y
  } = jz(c);
  let g;
  return Array.isArray(s) ? g = [p, ...s] : typeof s == "function" ? g = (...h) => {
    const T = s(...h);
    return Zo(T) ? {
      ...p,
      ...T
    } : p;
  } : g = {
    ...p,
    ...s
  }, {
    ...y,
    sx: g
  };
}
const pR = (i) => i, Pz = () => {
  let i = pR;
  return {
    configure(s) {
      i = s;
    },
    generate(s) {
      return i(s);
    },
    reset() {
      i = pR;
    }
  };
}, Fz = Pz();
function b_(i) {
  var s, c, p = "";
  if (typeof i == "string" || typeof i == "number") p += i;
  else if (typeof i == "object") if (Array.isArray(i)) {
    var y = i.length;
    for (s = 0; s < y; s++) i[s] && (c = b_(i[s])) && (p && (p += " "), p += c);
  } else for (c in i) i[c] && (p && (p += " "), p += c);
  return p;
}
function lr() {
  for (var i, s, c = 0, p = "", y = arguments.length; c < y; c++) (i = arguments[c]) && (s = b_(i)) && (p && (p += " "), p += s);
  return p;
}
const $z = {
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
  const p = $z[s];
  return p ? `${c}-${p}` : `${Fz.generate(i)}-${s}`;
}
function nl(i, s, c = "Mui") {
  const p = {};
  return s.forEach((y) => {
    p[y] = $i(i, y, c);
  }), p;
}
var SE = { exports: {} }, cn = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vR;
function Vz() {
  if (vR) return cn;
  vR = 1;
  var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), T = Symbol.for("react.server_context"), w = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), Y;
  Y = Symbol.for("react.module.reference");
  function B(P) {
    if (typeof P == "object" && P !== null) {
      var se = P.$$typeof;
      switch (se) {
        case i:
          switch (P = P.type, P) {
            case c:
            case y:
            case p:
            case _:
            case A:
              return P;
            default:
              switch (P = P && P.$$typeof, P) {
                case T:
                case h:
                case w:
                case L:
                case O:
                case g:
                  return P;
                default:
                  return se;
              }
          }
        case s:
          return se;
      }
    }
  }
  return cn.ContextConsumer = h, cn.ContextProvider = g, cn.Element = i, cn.ForwardRef = w, cn.Fragment = c, cn.Lazy = L, cn.Memo = O, cn.Portal = s, cn.Profiler = y, cn.StrictMode = p, cn.Suspense = _, cn.SuspenseList = A, cn.isAsyncMode = function() {
    return !1;
  }, cn.isConcurrentMode = function() {
    return !1;
  }, cn.isContextConsumer = function(P) {
    return B(P) === h;
  }, cn.isContextProvider = function(P) {
    return B(P) === g;
  }, cn.isElement = function(P) {
    return typeof P == "object" && P !== null && P.$$typeof === i;
  }, cn.isForwardRef = function(P) {
    return B(P) === w;
  }, cn.isFragment = function(P) {
    return B(P) === c;
  }, cn.isLazy = function(P) {
    return B(P) === L;
  }, cn.isMemo = function(P) {
    return B(P) === O;
  }, cn.isPortal = function(P) {
    return B(P) === s;
  }, cn.isProfiler = function(P) {
    return B(P) === y;
  }, cn.isStrictMode = function(P) {
    return B(P) === p;
  }, cn.isSuspense = function(P) {
    return B(P) === _;
  }, cn.isSuspenseList = function(P) {
    return B(P) === A;
  }, cn.isValidElementType = function(P) {
    return typeof P == "string" || typeof P == "function" || P === c || P === y || P === p || P === _ || P === A || P === H || typeof P == "object" && P !== null && (P.$$typeof === L || P.$$typeof === O || P.$$typeof === g || P.$$typeof === h || P.$$typeof === w || P.$$typeof === Y || P.getModuleId !== void 0);
  }, cn.typeOf = B, cn;
}
var fn = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hR;
function Bz() {
  return hR || (hR = 1, process.env.NODE_ENV !== "production" && function() {
    var i = Symbol.for("react.element"), s = Symbol.for("react.portal"), c = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), y = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), h = Symbol.for("react.context"), T = Symbol.for("react.server_context"), w = Symbol.for("react.forward_ref"), _ = Symbol.for("react.suspense"), A = Symbol.for("react.suspense_list"), O = Symbol.for("react.memo"), L = Symbol.for("react.lazy"), H = Symbol.for("react.offscreen"), Y = !1, B = !1, P = !1, se = !1, ae = !1, I;
    I = Symbol.for("react.module.reference");
    function J(Le) {
      return !!(typeof Le == "string" || typeof Le == "function" || Le === c || Le === y || ae || Le === p || Le === _ || Le === A || se || Le === H || Y || B || P || typeof Le == "object" && Le !== null && (Le.$$typeof === L || Le.$$typeof === O || Le.$$typeof === g || Le.$$typeof === h || Le.$$typeof === w || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      Le.$$typeof === I || Le.getModuleId !== void 0));
    }
    function U(Le) {
      if (typeof Le == "object" && Le !== null) {
        var Gt = Le.$$typeof;
        switch (Gt) {
          case i:
            var jt = Le.type;
            switch (jt) {
              case c:
              case y:
              case p:
              case _:
              case A:
                return jt;
              default:
                var rn = jt && jt.$$typeof;
                switch (rn) {
                  case T:
                  case h:
                  case w:
                  case L:
                  case O:
                  case g:
                    return rn;
                  default:
                    return Gt;
                }
            }
          case s:
            return Gt;
        }
      }
    }
    var de = h, ie = g, Xe = i, D = w, ce = c, _e = L, he = O, ve = s, Re = y, it = p, Be = _, Ct = A, ge = !1, ke = !1;
    function W(Le) {
      return ge || (ge = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function pe(Le) {
      return ke || (ke = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function Ne(Le) {
      return U(Le) === h;
    }
    function Ze(Le) {
      return U(Le) === g;
    }
    function Fe(Le) {
      return typeof Le == "object" && Le !== null && Le.$$typeof === i;
    }
    function yt(Le) {
      return U(Le) === w;
    }
    function We(Le) {
      return U(Le) === c;
    }
    function ot(Le) {
      return U(Le) === L;
    }
    function nt(Le) {
      return U(Le) === O;
    }
    function pt(Le) {
      return U(Le) === s;
    }
    function gt(Le) {
      return U(Le) === y;
    }
    function Nt(Le) {
      return U(Le) === p;
    }
    function xe(Le) {
      return U(Le) === _;
    }
    function xt(Le) {
      return U(Le) === A;
    }
    fn.ContextConsumer = de, fn.ContextProvider = ie, fn.Element = Xe, fn.ForwardRef = D, fn.Fragment = ce, fn.Lazy = _e, fn.Memo = he, fn.Portal = ve, fn.Profiler = Re, fn.StrictMode = it, fn.Suspense = Be, fn.SuspenseList = Ct, fn.isAsyncMode = W, fn.isConcurrentMode = pe, fn.isContextConsumer = Ne, fn.isContextProvider = Ze, fn.isElement = Fe, fn.isForwardRef = yt, fn.isFragment = We, fn.isLazy = ot, fn.isMemo = nt, fn.isPortal = pt, fn.isProfiler = gt, fn.isStrictMode = Nt, fn.isSuspense = xe, fn.isSuspenseList = xt, fn.isValidElementType = J, fn.typeOf = U;
  }()), fn;
}
process.env.NODE_ENV === "production" ? SE.exports = Vz() : SE.exports = Bz();
var mR = SE.exports;
function C_(i, s = "") {
  return i.displayName || i.name || s;
}
function yR(i, s, c) {
  const p = C_(s);
  return i.displayName || (p !== "" ? `${c}(${p})` : c);
}
function Hz(i) {
  if (i != null) {
    if (typeof i == "string")
      return i;
    if (typeof i == "function")
      return C_(i, "Component");
    if (typeof i == "object")
      switch (i.$$typeof) {
        case mR.ForwardRef:
          return yR(i, i.render, "ForwardRef");
        case mR.Memo:
          return yR(i, i.type, "memo");
        default:
          return;
      }
  }
}
const Iz = d0();
function rE(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
function bE(i, s, c) {
  return Wz(s) ? c : s[i] || s;
}
const _g = Symbol("mui.processed_props");
function kg(i, s, c) {
  if (_g in i)
    return i[_g];
  const p = {
    ...i,
    theme: bE(s, i.theme, c)
  };
  return i[_g] = p, p[_g] = p, p;
}
function Yz(i) {
  return i ? (s, c) => c[i] : null;
}
function Fg(i, s) {
  var p;
  const c = typeof i == "function" ? i(s) : i;
  if (Array.isArray(c))
    return c.flatMap((y) => Fg(y, s));
  if (Array.isArray(c == null ? void 0 : c.variants)) {
    const {
      variants: y,
      ...g
    } = c;
    let h = g, T;
    e: for (let w = 0; w < y.length; w += 1) {
      const _ = y[w];
      if (typeof _.props == "function") {
        if (T ?? (T = {
          ...s,
          ...s.ownerState,
          ownerState: s.ownerState
        }), !_.props(T))
          continue;
      } else
        for (const A in _.props)
          if (s[A] !== _.props[A] && ((p = s.ownerState) == null ? void 0 : p[A]) !== _.props[A])
            continue e;
      Array.isArray(h) || (h = [h]), typeof _.style == "function" ? (T ?? (T = {
        ...s,
        ...s.ownerState,
        ownerState: s.ownerState
      }), h.push(_.style(T))) : h.push(_.style);
    }
    return h;
  }
  return c;
}
function E_(i = {}) {
  const {
    themeId: s,
    defaultTheme: c = Iz,
    rootShouldForwardProp: p = rE,
    slotShouldForwardProp: y = rE
  } = i, g = (T) => Ud(kg(T, s, c));
  return g.__mui_systemSx = !0, (T, w = {}) => {
    jL(T, (de) => de.filter((ie) => !(ie != null && ie.__mui_systemSx)));
    const {
      name: _,
      slot: A,
      skipVariantsResolver: O,
      skipSx: L,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: H = Yz(gR(A)),
      ...Y
    } = w, B = O !== void 0 ? O : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      A && A !== "Root" && A !== "root" || !1
    ), P = L || !1;
    let se;
    process.env.NODE_ENV !== "production" && _ && (se = `${_}-${gR(A || "Root")}`);
    let ae = rE;
    A === "Root" || A === "root" ? ae = p : A ? ae = y : Gz(T) && (ae = void 0);
    const I = UL(T, {
      shouldForwardProp: ae,
      label: se,
      ...Y
    }), J = (de) => typeof de == "function" && de.__emotion_real !== de || Zo(de) ? (ie) => Fg(de, kg(ie, s, c)) : de, U = (de, ...ie) => {
      let Xe = J(de);
      const D = ie ? ie.map(J) : [];
      _ && H && D.push((he) => {
        const ve = bE(s, he.theme, c);
        if (!ve.components || !ve.components[_] || !ve.components[_].styleOverrides)
          return null;
        const Re = ve.components[_].styleOverrides, it = {}, Be = kg(he, s, c);
        for (const Ct in Re)
          it[Ct] = Fg(Re[Ct], Be);
        return H(he, it);
      }), _ && !B && D.push((he) => {
        var it, Be;
        const ve = bE(s, he.theme, c), Re = (Be = (it = ve == null ? void 0 : ve.components) == null ? void 0 : it[_]) == null ? void 0 : Be.variants;
        return Re ? Fg({
          variants: Re
        }, kg(he, s, c)) : null;
      }), P || D.push(g);
      const ce = D.length - ie.length;
      if (Array.isArray(de) && ce > 0) {
        const he = new Array(ce).fill("");
        Xe = [...de, ...he], Xe.raw = [...de.raw, ...he];
      }
      const _e = I(Xe, ...D);
      if (process.env.NODE_ENV !== "production") {
        let he;
        _ && (he = `${_}${Kr(A || "")}`), he === void 0 && (he = `Styled(${Hz(T)})`), _e.displayName = he;
      }
      return T.muiName && (_e.muiName = T.muiName), _e;
    };
    return I.withConfig && (U.withConfig = I.withConfig), U;
  };
}
function Wz(i) {
  for (const s in i)
    return !1;
  return !0;
}
function Gz(i) {
  return typeof i == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  i.charCodeAt(0) > 96;
}
function gR(i) {
  return i && i.charAt(0).toLowerCase() + i.slice(1);
}
const qz = E_();
function sh(i, s) {
  const c = {
    ...s
  };
  for (const p in i)
    if (Object.prototype.hasOwnProperty.call(i, p)) {
      const y = p;
      if (y === "components" || y === "slots")
        c[y] = {
          ...i[y],
          ...c[y]
        };
      else if (y === "componentsProps" || y === "slotProps") {
        const g = i[y], h = s[y];
        if (!h)
          c[y] = g || {};
        else if (!g)
          c[y] = h;
        else {
          c[y] = {
            ...h
          };
          for (const T in g)
            if (Object.prototype.hasOwnProperty.call(g, T)) {
              const w = T;
              c[y][w] = sh(g[w], h[w]);
            }
        }
      } else c[y] === void 0 && (c[y] = i[y]);
    }
  return c;
}
function Qz(i) {
  const {
    theme: s,
    name: c,
    props: p
  } = i;
  return !s || !s.components || !s.components[c] || !s.components[c].defaultProps ? p : sh(s.components[c].defaultProps, p);
}
function T_({
  props: i,
  name: s,
  defaultTheme: c,
  themeId: p
}) {
  let y = jE(c);
  return p && (y = y[p] || y), Qz({
    theme: y,
    name: s,
    props: i
  });
}
const Kz = typeof window < "u" ? De.useLayoutEffect : De.useEffect;
function Xz(i, s = Number.MIN_SAFE_INTEGER, c = Number.MAX_SAFE_INTEGER) {
  return Math.max(s, Math.min(i, c));
}
function PE(i, s = 0, c = 1) {
  return process.env.NODE_ENV !== "production" && (i < s || i > c) && console.error(`MUI: The value provided ${i} is out of range [${s}, ${c}].`), Xz(i, s, c);
}
function Zz(i) {
  i = i.slice(1);
  const s = new RegExp(`.{1,${i.length >= 6 ? 2 : 1}}`, "g");
  let c = i.match(s);
  return c && c[0].length === 1 && (c = c.map((p) => p + p)), c ? `rgb${c.length === 4 ? "a" : ""}(${c.map((p, y) => y < 3 ? parseInt(p, 16) : Math.round(parseInt(p, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function ss(i) {
  if (i.type)
    return i;
  if (i.charAt(0) === "#")
    return ss(Zz(i));
  const s = i.indexOf("("), c = i.substring(0, s);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(c))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${i}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : us(9, i));
  let p = i.substring(s + 1, i.length - 1), y;
  if (c === "color") {
    if (p = p.split(" "), y = p.shift(), p.length === 4 && p[3].charAt(0) === "/" && (p[3] = p[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(y))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${y}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : us(10, y));
  } else
    p = p.split(",");
  return p = p.map((g) => parseFloat(g)), {
    type: c,
    values: p,
    colorSpace: y
  };
}
const Jz = (i) => {
  const s = ss(i);
  return s.values.slice(0, 3).map((c, p) => s.type.includes("hsl") && p !== 0 ? `${c}%` : c).join(" ");
}, eh = (i, s) => {
  try {
    return Jz(i);
  } catch {
    return s && process.env.NODE_ENV !== "production" && console.warn(s), i;
  }
};
function p0(i) {
  const {
    type: s,
    colorSpace: c
  } = i;
  let {
    values: p
  } = i;
  return s.includes("rgb") ? p = p.map((y, g) => g < 3 ? parseInt(y, 10) : y) : s.includes("hsl") && (p[1] = `${p[1]}%`, p[2] = `${p[2]}%`), s.includes("color") ? p = `${c} ${p.join(" ")}` : p = `${p.join(", ")}`, `${s}(${p})`;
}
function x_(i) {
  i = ss(i);
  const {
    values: s
  } = i, c = s[0], p = s[1] / 100, y = s[2] / 100, g = p * Math.min(y, 1 - y), h = (_, A = (_ + c / 30) % 12) => y - g * Math.max(Math.min(A - 3, 9 - A, 1), -1);
  let T = "rgb";
  const w = [Math.round(h(0) * 255), Math.round(h(8) * 255), Math.round(h(4) * 255)];
  return i.type === "hsla" && (T += "a", w.push(s[3])), p0({
    type: T,
    values: w
  });
}
function CE(i) {
  i = ss(i);
  let s = i.type === "hsl" || i.type === "hsla" ? ss(x_(i)).values : i.values;
  return s = s.map((c) => (i.type !== "color" && (c /= 255), c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)), Number((0.2126 * s[0] + 0.7152 * s[1] + 0.0722 * s[2]).toFixed(3));
}
function SR(i, s) {
  const c = CE(i), p = CE(s);
  return (Math.max(c, p) + 0.05) / (Math.min(c, p) + 0.05);
}
function os(i, s) {
  return i = ss(i), s = PE(s), (i.type === "rgb" || i.type === "hsl") && (i.type += "a"), i.type === "color" ? i.values[3] = `/${s}` : i.values[3] = s, p0(i);
}
function Og(i, s, c) {
  try {
    return os(i, s);
  } catch {
    return i;
  }
}
function FE(i, s) {
  if (i = ss(i), s = PE(s), i.type.includes("hsl"))
    i.values[2] *= 1 - s;
  else if (i.type.includes("rgb") || i.type.includes("color"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] *= 1 - s;
  return p0(i);
}
function xn(i, s, c) {
  try {
    return FE(i, s);
  } catch {
    return i;
  }
}
function $E(i, s) {
  if (i = ss(i), s = PE(s), i.type.includes("hsl"))
    i.values[2] += (100 - i.values[2]) * s;
  else if (i.type.includes("rgb"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] += (255 - i.values[c]) * s;
  else if (i.type.includes("color"))
    for (let c = 0; c < 3; c += 1)
      i.values[c] += (1 - i.values[c]) * s;
  return p0(i);
}
function wn(i, s, c) {
  try {
    return $E(i, s);
  } catch {
    return i;
  }
}
function eU(i, s = 0.15) {
  return CE(i) > 0.5 ? FE(i, s) : $E(i, s);
}
function Dg(i, s, c) {
  try {
    return eU(i, s);
  } catch {
    return i;
  }
}
function v0(i, s) {
  return process.env.NODE_ENV === "production" ? () => null : function(...p) {
    return i(...p) || s(...p);
  };
}
function tU(i) {
  const {
    prototype: s = {}
  } = i;
  return !!s.isReactComponent;
}
function nU(i, s, c, p, y) {
  const g = i[s], h = y || s;
  if (g == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let T;
  return typeof g == "function" && !tU(g) && (T = "Did you accidentally provide a plain function component instead?"), T !== void 0 ? new Error(`Invalid ${p} \`${h}\` supplied to \`${c}\`. Expected an element type that can hold a ref. ${T} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const rU = v0(R.elementType, nU), aU = "exact-prop: ​";
function w_(i) {
  return process.env.NODE_ENV === "production" ? i : {
    ...i,
    [aU]: (s) => {
      const c = Object.keys(s).filter((p) => !i.hasOwnProperty(p));
      return c.length > 0 ? new Error(`The following props are not supported: ${c.map((p) => `\`${p}\``).join(", ")}. Please remove them.`) : null;
    }
  };
}
const iU = R.oneOfType([R.func, R.object]);
function oU(i, s) {
  typeof i == "function" ? i(s) : i && (i.current = s);
}
function Mg(i) {
  const s = De.useRef(i);
  return Kz(() => {
    s.current = i;
  }), De.useRef((...c) => (
    // @ts-expect-error hide `this`
    (0, s.current)(...c)
  )).current;
}
function bR(...i) {
  return De.useMemo(() => i.every((s) => s == null) ? null : (s) => {
    i.forEach((c) => {
      oU(c, s);
    });
  }, i);
}
const CR = {};
function R_(i, s) {
  const c = De.useRef(CR);
  return c.current === CR && (c.current = i(s)), c;
}
const lU = [];
function uU(i) {
  De.useEffect(i, lU);
}
class VE {
  constructor() {
    qv(this, "currentId", null);
    qv(this, "clear", () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    });
    qv(this, "disposeEffect", () => this.clear);
  }
  static create() {
    return new VE();
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
function sU() {
  const i = R_(VE.create).current;
  return uU(i.disposeEffect), i;
}
function ER(i) {
  try {
    return i.matches(":focus-visible");
  } catch {
    process.env.NODE_ENV !== "production" && !/jsdom/.test(window.navigator.userAgent) && console.warn(["MUI: The `:focus-visible` pseudo class is not supported in this browser.", "Some components rely on this feature to work properly."].join(`
`));
  }
  return !1;
}
function cU(i) {
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
function __(i, s, c, p) {
  const y = i[s];
  if (y == null || !Number.isInteger(y)) {
    const g = cU(y);
    return new RangeError(`Invalid ${p} \`${s}\` of type \`${g}\` supplied to \`${c}\`, expected \`integer\`.`);
  }
  return null;
}
function k_(i, s, ...c) {
  return i[s] === void 0 ? null : __(i, s, ...c);
}
function EE() {
  return null;
}
k_.isRequired = __;
EE.isRequired = EE;
const fU = process.env.NODE_ENV === "production" ? EE : k_;
function rl(i, s, c = void 0) {
  const p = {};
  for (const y in i) {
    const g = i[y];
    let h = "", T = !0;
    for (let w = 0; w < g.length; w += 1) {
      const _ = g[w];
      _ && (h += (T === !0 ? "" : " ") + s(_), T = !1, c && c[_] && (h += " " + c[_]));
    }
    p[y] = h;
  }
  return p;
}
const BE = /* @__PURE__ */ De.createContext(null);
process.env.NODE_ENV !== "production" && (BE.displayName = "ThemeContext");
function HE() {
  const i = De.useContext(BE);
  return process.env.NODE_ENV !== "production" && De.useDebugValue(i), i;
}
const dU = typeof Symbol == "function" && Symbol.for, pU = dU ? Symbol.for("mui.nested") : "__THEME_NESTED__";
function vU(i, s) {
  if (typeof s == "function") {
    const c = s(i);
    return process.env.NODE_ENV !== "production" && (c || console.error(["MUI: You should return an object from your theme function, i.e.", "<ThemeProvider theme={() => ({})} />"].join(`
`))), c;
  }
  return {
    ...i,
    ...s
  };
}
function Yg(i) {
  const {
    children: s,
    theme: c
  } = i, p = HE();
  process.env.NODE_ENV !== "production" && p === null && typeof c == "function" && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const y = De.useMemo(() => {
    const g = p === null ? {
      ...c
    } : vU(p, c);
    return g != null && (g[pU] = p !== null), g;
  }, [c, p]);
  return /* @__PURE__ */ Ae.jsx(BE.Provider, {
    value: y,
    children: s
  });
}
process.env.NODE_ENV !== "production" && (Yg.propTypes = {
  /**
   * Your component tree.
   */
  children: R.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: R.oneOfType([R.object, R.func]).isRequired
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (Yg.propTypes = w_(Yg.propTypes));
const hU = /* @__PURE__ */ De.createContext();
function O_({
  value: i,
  ...s
}) {
  return /* @__PURE__ */ Ae.jsx(hU.Provider, {
    value: i ?? !0,
    ...s
  });
}
process.env.NODE_ENV !== "production" && (O_.propTypes = {
  children: R.node,
  value: R.bool
});
const D_ = /* @__PURE__ */ De.createContext(void 0);
function M_({
  value: i,
  children: s
}) {
  return /* @__PURE__ */ Ae.jsx(D_.Provider, {
    value: i,
    children: s
  });
}
process.env.NODE_ENV !== "production" && (M_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * @ignore
   */
  children: R.node,
  /**
   * @ignore
   */
  value: R.object
});
function mU(i) {
  const {
    theme: s,
    name: c,
    props: p
  } = i;
  if (!s || !s.components || !s.components[c])
    return p;
  const y = s.components[c];
  return y.defaultProps ? sh(y.defaultProps, p) : !y.styleOverrides && !y.variants ? sh(y, p) : p;
}
function yU({
  props: i,
  name: s
}) {
  const c = De.useContext(D_);
  return mU({
    props: i,
    name: s,
    theme: {
      components: c
    }
  });
}
const TR = {};
function xR(i, s, c, p = !1) {
  return De.useMemo(() => {
    const y = i && s[i] || s;
    if (typeof c == "function") {
      const g = c(y), h = i ? {
        ...s,
        [i]: g
      } : g;
      return p ? () => h : h;
    }
    return i ? {
      ...s,
      [i]: c
    } : {
      ...s,
      ...c
    };
  }, [i, s, c, p]);
}
function ch(i) {
  const {
    children: s,
    theme: c,
    themeId: p
  } = i, y = y_(TR), g = HE() || TR;
  process.env.NODE_ENV !== "production" && (y === null && typeof c == "function" || p && y && !y[p] && typeof c == "function") && console.error(["MUI: You are providing a theme function prop to the ThemeProvider component:", "<ThemeProvider theme={outerTheme => outerTheme} />", "", "However, no outer theme is present.", "Make sure a theme is already injected higher in the React tree or provide a theme object."].join(`
`));
  const h = xR(p, y, c), T = xR(p, g, c, !0), w = h.direction === "rtl";
  return /* @__PURE__ */ Ae.jsx(Yg, {
    theme: T,
    children: /* @__PURE__ */ Ae.jsx(t0.Provider, {
      value: h,
      children: /* @__PURE__ */ Ae.jsx(O_, {
        value: w,
        children: /* @__PURE__ */ Ae.jsx(M_, {
          value: h == null ? void 0 : h.components,
          children: s
        })
      })
    })
  });
}
process.env.NODE_ENV !== "production" && (ch.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Your component tree.
   */
  children: R.node,
  /**
   * A theme object. You can provide a function to extend the outer theme.
   */
  theme: R.oneOfType([R.func, R.object]).isRequired,
  /**
   * The design system's unique id for getting the corresponded theme when there are multiple design systems.
   */
  themeId: R.string
});
process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "production" && (ch.propTypes = w_(ch.propTypes));
const IE = "mode", YE = "color-scheme", gU = "data-color-scheme";
function SU(i) {
  const {
    defaultLightColorScheme: s = "light",
    defaultDarkColorScheme: c = "dark",
    modeStorageKey: p = IE,
    colorSchemeStorageKey: y = YE,
    attribute: g = gU,
    colorSchemeNode: h = "document.documentElement",
    nonce: T
  } = i || {};
  let w = "", _ = g;
  if (g === "class" && (_ = ".%s"), g === "data" && (_ = "[data-%s]"), _.startsWith(".")) {
    const O = _.substring(1);
    w += `${h}.classList.remove('${O}'.replace('%s', light), '${O}'.replace('%s', dark));
      ${h}.classList.add('${O}'.replace('%s', colorScheme));`;
  }
  const A = _.match(/\[([^\]]+)\]/);
  if (A) {
    const [O, L] = A[1].split("=");
    L || (w += `${h}.removeAttribute('${O}'.replace('%s', light));
      ${h}.removeAttribute('${O}'.replace('%s', dark));`), w += `
      ${h}.setAttribute('${O}'.replace('%s', colorScheme), ${L ? `${L}.replace('%s', colorScheme)` : '""'});`;
  } else
    w += `${h}.setAttribute('${_}', colorScheme);`;
  return /* @__PURE__ */ Ae.jsx("script", {
    suppressHydrationWarning: !0,
    nonce: typeof window > "u" ? T : "",
    dangerouslySetInnerHTML: {
      __html: `(function() {
try {
  let colorScheme = '';
  const mode = localStorage.getItem('${p}') || 'system';
  const dark = localStorage.getItem('${y}-dark') || '${c}';
  const light = localStorage.getItem('${y}-light') || '${s}';
  if (mode === 'system') {
    // handle system mode
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    if (mql.matches) {
      colorScheme = dark
    } else {
      colorScheme = light
    }
  }
  if (mode === 'light') {
    colorScheme = light;
  }
  if (mode === 'dark') {
    colorScheme = dark;
  }
  if (colorScheme) {
    ${w}
  }
} catch(e){}})();`
    }
  }, "mui-color-scheme-init");
}
function wR(i) {
  if (typeof window < "u" && typeof window.matchMedia == "function" && i === "system")
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function A_(i, s) {
  if (i.mode === "light" || i.mode === "system" && i.systemMode === "light")
    return s("light");
  if (i.mode === "dark" || i.mode === "system" && i.systemMode === "dark")
    return s("dark");
}
function bU(i) {
  return A_(i, (s) => {
    if (s === "light")
      return i.lightColorScheme;
    if (s === "dark")
      return i.darkColorScheme;
  });
}
function aE(i, s) {
  if (typeof window > "u")
    return;
  let c;
  try {
    c = localStorage.getItem(i) || void 0, c || localStorage.setItem(i, s);
  } catch {
  }
  return c || s;
}
function CU(i) {
  const {
    defaultMode: s = "light",
    defaultLightColorScheme: c,
    defaultDarkColorScheme: p,
    supportedColorSchemes: y = [],
    modeStorageKey: g = IE,
    colorSchemeStorageKey: h = YE,
    storageWindow: T = typeof window > "u" ? void 0 : window
  } = i, w = y.join(","), _ = y.length > 1, [A, O] = De.useState(() => {
    const I = aE(g, s), J = aE(`${h}-light`, c), U = aE(`${h}-dark`, p);
    return {
      mode: I,
      systemMode: wR(I),
      lightColorScheme: J,
      darkColorScheme: U
    };
  }), [, L] = De.useState(!1), H = De.useRef(!1);
  De.useEffect(() => {
    _ && L(!0), H.current = !0;
  }, [_]);
  const Y = bU(A), B = De.useCallback((I) => {
    O((J) => {
      if (I === J.mode)
        return J;
      const U = I ?? s;
      try {
        localStorage.setItem(g, U);
      } catch {
      }
      return {
        ...J,
        mode: U,
        systemMode: wR(U)
      };
    });
  }, [g, s]), P = De.useCallback((I) => {
    I ? typeof I == "string" ? I && !w.includes(I) ? console.error(`\`${I}\` does not exist in \`theme.colorSchemes\`.`) : O((J) => {
      const U = {
        ...J
      };
      return A_(J, (de) => {
        try {
          localStorage.setItem(`${h}-${de}`, I);
        } catch {
        }
        de === "light" && (U.lightColorScheme = I), de === "dark" && (U.darkColorScheme = I);
      }), U;
    }) : O((J) => {
      const U = {
        ...J
      }, de = I.light === null ? c : I.light, ie = I.dark === null ? p : I.dark;
      if (de)
        if (!w.includes(de))
          console.error(`\`${de}\` does not exist in \`theme.colorSchemes\`.`);
        else {
          U.lightColorScheme = de;
          try {
            localStorage.setItem(`${h}-light`, de);
          } catch {
          }
        }
      if (ie)
        if (!w.includes(ie))
          console.error(`\`${ie}\` does not exist in \`theme.colorSchemes\`.`);
        else {
          U.darkColorScheme = ie;
          try {
            localStorage.setItem(`${h}-dark`, ie);
          } catch {
          }
        }
      return U;
    }) : O((J) => {
      try {
        localStorage.setItem(`${h}-light`, c), localStorage.setItem(`${h}-dark`, p);
      } catch {
      }
      return {
        ...J,
        lightColorScheme: c,
        darkColorScheme: p
      };
    });
  }, [w, h, c, p]), se = De.useCallback((I) => {
    A.mode === "system" && O((J) => {
      const U = I != null && I.matches ? "dark" : "light";
      return J.systemMode === U ? J : {
        ...J,
        systemMode: U
      };
    });
  }, [A.mode]), ae = De.useRef(se);
  return ae.current = se, De.useEffect(() => {
    if (typeof window.matchMedia != "function" || !_)
      return;
    const I = (...U) => ae.current(...U), J = window.matchMedia("(prefers-color-scheme: dark)");
    return J.addListener(I), I(J), () => {
      J.removeListener(I);
    };
  }, [_]), De.useEffect(() => {
    if (T && _) {
      const I = (J) => {
        const U = J.newValue;
        typeof J.key == "string" && J.key.startsWith(h) && (!U || w.match(U)) && (J.key.endsWith("light") && P({
          light: U
        }), J.key.endsWith("dark") && P({
          dark: U
        })), J.key === g && (!U || ["light", "dark", "system"].includes(U)) && B(U || s);
      };
      return T.addEventListener("storage", I), () => {
        T.removeEventListener("storage", I);
      };
    }
  }, [P, B, g, h, w, s, T, _]), {
    ...A,
    mode: H.current || !_ ? A.mode : void 0,
    systemMode: H.current || !_ ? A.systemMode : void 0,
    colorScheme: H.current || !_ ? Y : void 0,
    setMode: B,
    setColorScheme: P
  };
}
const EU = "*{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}";
function TU(i) {
  const {
    themeId: s,
    /**
     * This `theme` object needs to follow a certain structure to
     * be used correctly by the finel `CssVarsProvider`. It should have a
     * `colorSchemes` key with the light and dark (and any other) palette.
     * It should also ideally have a vars object created using `prepareCssVars`.
     */
    theme: c = {},
    modeStorageKey: p = IE,
    colorSchemeStorageKey: y = YE,
    disableTransitionOnChange: g = !1,
    defaultColorScheme: h,
    resolveTheme: T
  } = i, w = {
    allColorSchemes: [],
    colorScheme: void 0,
    darkColorScheme: void 0,
    lightColorScheme: void 0,
    mode: void 0,
    setColorScheme: () => {
    },
    setMode: () => {
    },
    systemMode: void 0
  }, _ = /* @__PURE__ */ De.createContext(void 0);
  process.env.NODE_ENV !== "production" && (_.displayName = "ColorSchemeContext");
  const A = () => De.useContext(_) || w;
  function O(B) {
    var Oe, Te, ne, $e, Et;
    const {
      children: P,
      theme: se,
      modeStorageKey: ae = p,
      colorSchemeStorageKey: I = y,
      disableTransitionOnChange: J = g,
      storageWindow: U = typeof window > "u" ? void 0 : window,
      documentNode: de = typeof document > "u" ? void 0 : document,
      colorSchemeNode: ie = typeof document > "u" ? void 0 : document.documentElement,
      disableNestedContext: Xe = !1,
      disableStyleSheetGeneration: D = !1
    } = B, ce = De.useRef(!1), _e = HE(), he = De.useContext(_), ve = !!he && !Xe, Re = De.useMemo(() => se || (typeof c == "function" ? c() : c), [se]), it = Re[s], {
      colorSchemes: Be = {},
      components: Ct = {},
      cssVarPrefix: ge,
      ...ke
    } = it || Re, W = Object.keys(Be).filter((vt) => !!Be[vt]).join(","), pe = De.useMemo(() => W.split(","), [W]), Ne = typeof h == "string" ? h : h.light, Ze = typeof h == "string" ? h : h.dark, Fe = Be[Ne] && Be[Ze] ? "system" : ((Te = (Oe = Be[ke.defaultColorScheme]) == null ? void 0 : Oe.palette) == null ? void 0 : Te.mode) || ((ne = ke.palette) == null ? void 0 : ne.mode), {
      mode: yt,
      setMode: We,
      systemMode: ot,
      lightColorScheme: nt,
      darkColorScheme: pt,
      colorScheme: gt,
      setColorScheme: Nt
    } = CU({
      supportedColorSchemes: pe,
      defaultLightColorScheme: Ne,
      defaultDarkColorScheme: Ze,
      modeStorageKey: ae,
      colorSchemeStorageKey: I,
      defaultMode: Fe,
      storageWindow: U
    });
    let xe = yt, xt = gt;
    ve && (xe = he.mode, xt = he.colorScheme);
    const Le = xt || ke.defaultColorScheme, Gt = (($e = ke.generateThemeVars) == null ? void 0 : $e.call(ke)) || ke.vars, jt = {
      ...ke,
      components: Ct,
      colorSchemes: Be,
      cssVarPrefix: ge,
      vars: Gt
    };
    if (typeof jt.generateSpacing == "function" && (jt.spacing = jt.generateSpacing()), Le) {
      const vt = Be[Le];
      vt && typeof vt == "object" && Object.keys(vt).forEach((tt) => {
        vt[tt] && typeof vt[tt] == "object" ? jt[tt] = {
          ...jt[tt],
          ...vt[tt]
        } : jt[tt] = vt[tt];
      });
    }
    const rn = ke.colorSchemeSelector;
    De.useEffect(() => {
      if (xt && ie && rn && rn !== "media") {
        const vt = rn;
        let tt = rn;
        if (vt === "class" && (tt = ".%s"), vt === "data" && (tt = "[data-%s]"), vt != null && vt.startsWith("data-") && !vt.includes("%s") && (tt = `[${vt}="%s"]`), tt.startsWith("."))
          ie.classList.remove(...pe.map((vn) => tt.substring(1).replace("%s", vn))), ie.classList.add(tt.substring(1).replace("%s", xt));
        else {
          const vn = tt.replace("%s", xt).match(/\[([^\]]+)\]/);
          if (vn) {
            const [ma, Zn] = vn[1].split("=");
            Zn || pe.forEach((Me) => {
              ie.removeAttribute(ma.replace(xt, Me));
            }), ie.setAttribute(ma, Zn ? Zn.replace(/"|'/g, "") : "");
          } else
            ie.setAttribute(tt, xt);
        }
      }
    }, [xt, rn, ie, pe]), De.useEffect(() => {
      let vt;
      if (J && ce.current && de) {
        const tt = de.createElement("style");
        tt.appendChild(de.createTextNode(EU)), de.head.appendChild(tt), window.getComputedStyle(de.body), vt = setTimeout(() => {
          de.head.removeChild(tt);
        }, 1);
      }
      return () => {
        clearTimeout(vt);
      };
    }, [xt, J, de]), De.useEffect(() => (ce.current = !0, () => {
      ce.current = !1;
    }), []);
    const N = De.useMemo(() => ({
      allColorSchemes: pe,
      colorScheme: xt,
      darkColorScheme: pt,
      lightColorScheme: nt,
      mode: xe,
      setColorScheme: Nt,
      setMode: We,
      systemMode: ot
    }), [pe, xt, pt, nt, xe, Nt, We, ot]);
    let G = !0;
    (D || ke.cssVariables === !1 || ve && (_e == null ? void 0 : _e.cssVarPrefix) === ge) && (G = !1);
    const re = /* @__PURE__ */ Ae.jsxs(De.Fragment, {
      children: [/* @__PURE__ */ Ae.jsx(ch, {
        themeId: it ? s : void 0,
        theme: T ? T(jt) : jt,
        children: P
      }), G && /* @__PURE__ */ Ae.jsx(zE, {
        styles: ((Et = jt.generateStyleSheets) == null ? void 0 : Et.call(jt)) || []
      })]
    });
    return ve ? re : /* @__PURE__ */ Ae.jsx(_.Provider, {
      value: N,
      children: re
    });
  }
  process.env.NODE_ENV !== "production" && (O.propTypes = {
    /**
     * The component tree.
     */
    children: R.node,
    /**
     * The node used to attach the color-scheme attribute
     */
    colorSchemeNode: R.any,
    /**
     * localStorage key used to store `colorScheme`
     */
    colorSchemeStorageKey: R.string,
    /**
     * If `true`, the provider creates its own context and generate stylesheet as if it is a root `CssVarsProvider`.
     */
    disableNestedContext: R.bool,
    /**
     * If `true`, the style sheet won't be generated.
     *
     * This is useful for controlling nested CssVarsProvider behavior.
     */
    disableStyleSheetGeneration: R.bool,
    /**
     * Disable CSS transitions when switching between modes or color schemes.
     */
    disableTransitionOnChange: R.bool,
    /**
     * The document to attach the attribute to.
     */
    documentNode: R.any,
    /**
     * The key in the local storage used to store current color scheme.
     */
    modeStorageKey: R.string,
    /**
     * The window that attaches the 'storage' event listener.
     * @default window
     */
    storageWindow: R.any,
    /**
     * The calculated theme object that will be passed through context.
     */
    theme: R.object
  });
  const L = typeof h == "string" ? h : h.light, H = typeof h == "string" ? h : h.dark;
  return {
    CssVarsProvider: O,
    useColorScheme: A,
    getInitColorSchemeScript: (B) => SU({
      colorSchemeStorageKey: y,
      defaultLightColorScheme: L,
      defaultDarkColorScheme: H,
      modeStorageKey: p,
      ...B
    })
  };
}
function xU(i = "") {
  function s(...p) {
    if (!p.length)
      return "";
    const y = p[0];
    return typeof y == "string" && !y.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${i ? `${i}-` : ""}${y}${s(...p.slice(1))})` : `, ${y}`;
  }
  return (p, ...y) => `var(--${i ? `${i}-` : ""}${p}${s(...y)})`;
}
const RR = (i, s, c, p = []) => {
  let y = i;
  s.forEach((g, h) => {
    h === s.length - 1 ? Array.isArray(y) ? y[Number(g)] = c : y && typeof y == "object" && (y[g] = c) : y && typeof y == "object" && (y[g] || (y[g] = p.includes(g) ? [] : {}), y = y[g]);
  });
}, wU = (i, s, c) => {
  function p(y, g = [], h = []) {
    Object.entries(y).forEach(([T, w]) => {
      (!c || c && !c([...g, T])) && w != null && (typeof w == "object" && Object.keys(w).length > 0 ? p(w, [...g, T], Array.isArray(w) ? [...h, T] : h) : s([...g, T], w, h));
    });
  }
  p(i);
}, RU = (i, s) => typeof s == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((p) => i.includes(p)) || i[i.length - 1].toLowerCase().includes("opacity") ? s : `${s}px` : s;
function iE(i, s) {
  const {
    prefix: c,
    shouldSkipGeneratingVar: p
  } = s || {}, y = {}, g = {}, h = {};
  return wU(
    i,
    (T, w, _) => {
      if ((typeof w == "string" || typeof w == "number") && (!p || !p(T, w))) {
        const A = `--${c ? `${c}-` : ""}${T.join("-")}`, O = RU(T, w);
        Object.assign(y, {
          [A]: O
        }), RR(g, T, `var(${A})`, _), RR(h, T, `var(${A}, ${O})`, _);
      }
    },
    (T) => T[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: y,
    vars: g,
    varsWithDefaults: h
  };
}
function _U(i, s = {}) {
  const {
    getSelector: c = P,
    disableCssColorScheme: p,
    colorSchemeSelector: y
  } = s, {
    colorSchemes: g = {},
    components: h,
    defaultColorScheme: T = "light",
    ...w
  } = i, {
    vars: _,
    css: A,
    varsWithDefaults: O
  } = iE(w, s);
  let L = O;
  const H = {}, {
    [T]: Y,
    ...B
  } = g;
  if (Object.entries(B || {}).forEach(([I, J]) => {
    const {
      vars: U,
      css: de,
      varsWithDefaults: ie
    } = iE(J, s);
    L = Na(L, ie), H[I] = {
      css: de,
      vars: U
    };
  }), Y) {
    const {
      css: I,
      vars: J,
      varsWithDefaults: U
    } = iE(Y, s);
    L = Na(L, U), H[T] = {
      css: I,
      vars: J
    };
  }
  function P(I, J) {
    var de, ie;
    let U = y;
    if (y === "class" && (U = ".%s"), y === "data" && (U = "[data-%s]"), y != null && y.startsWith("data-") && !y.includes("%s") && (U = `[${y}="%s"]`), I) {
      if (U === "media")
        return i.defaultColorScheme === I ? ":root" : {
          [`@media (prefers-color-scheme: ${((ie = (de = g[I]) == null ? void 0 : de.palette) == null ? void 0 : ie.mode) || I})`]: {
            ":root": J
          }
        };
      if (U)
        return i.defaultColorScheme === I ? `:root, ${U.replace("%s", String(I))}` : U.replace("%s", String(I));
    }
    return ":root";
  }
  return {
    vars: L,
    generateThemeVars: () => {
      let I = {
        ..._
      };
      return Object.entries(H).forEach(([, {
        vars: J
      }]) => {
        I = Na(I, J);
      }), I;
    },
    generateStyleSheets: () => {
      var Xe, D;
      const I = [], J = i.defaultColorScheme || "light";
      function U(ce, _e) {
        Object.keys(_e).length && I.push(typeof ce == "string" ? {
          [ce]: {
            ..._e
          }
        } : ce);
      }
      U(c(void 0, {
        ...A
      }), A);
      const {
        [J]: de,
        ...ie
      } = H;
      if (de) {
        const {
          css: ce
        } = de, _e = (D = (Xe = g[J]) == null ? void 0 : Xe.palette) == null ? void 0 : D.mode, he = !p && _e ? {
          colorScheme: _e,
          ...ce
        } : {
          ...ce
        };
        U(c(J, {
          ...he
        }), he);
      }
      return Object.entries(ie).forEach(([ce, {
        css: _e
      }]) => {
        var Re, it;
        const he = (it = (Re = g[ce]) == null ? void 0 : Re.palette) == null ? void 0 : it.mode, ve = !p && he ? {
          colorScheme: he,
          ..._e
        } : {
          ..._e
        };
        U(c(ce, {
          ...ve
        }), ve);
      }), I;
    }
  };
}
function kU(i) {
  return function(c) {
    return i === "media" ? (process.env.NODE_ENV !== "production" && c !== "light" && c !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${c}'.`), `@media (prefers-color-scheme: ${c})`) : i ? i.startsWith("data-") && !i.includes("%s") ? `[${i}="${c}"] &` : i === "class" ? `.${c} &` : i === "data" ? `[data-${c}] &` : `${i.replace("%s", c)} &` : "&";
  };
}
const OU = d0(), DU = qz("div", {
  name: "MuiStack",
  slot: "Root",
  overridesResolver: (i, s) => s.root
});
function MU(i) {
  return T_({
    props: i,
    name: "MuiStack",
    defaultTheme: OU
  });
}
function AU(i, s) {
  const c = De.Children.toArray(i).filter(Boolean);
  return c.reduce((p, y, g) => (p.push(y), g < c.length - 1 && p.push(/* @__PURE__ */ De.cloneElement(s, {
    key: `separator-${g}`
  })), p), []);
}
const NU = (i) => ({
  row: "Left",
  "row-reverse": "Right",
  column: "Top",
  "column-reverse": "Bottom"
})[i], LU = ({
  ownerState: i,
  theme: s
}) => {
  let c = {
    display: "flex",
    flexDirection: "column",
    ...mo({
      theme: s
    }, nE({
      values: i.direction,
      breakpoints: s.breakpoints.values
    }), (p) => ({
      flexDirection: p
    }))
  };
  if (i.spacing) {
    const p = o0(s), y = Object.keys(s.breakpoints.values).reduce((w, _) => ((typeof i.spacing == "object" && i.spacing[_] != null || typeof i.direction == "object" && i.direction[_] != null) && (w[_] = !0), w), {}), g = nE({
      values: i.direction,
      base: y
    }), h = nE({
      values: i.spacing,
      base: y
    });
    typeof g == "object" && Object.keys(g).forEach((w, _, A) => {
      if (!g[w]) {
        const L = _ > 0 ? g[A[_ - 1]] : "column";
        g[w] = L;
      }
    }), c = Na(c, mo({
      theme: s
    }, h, (w, _) => i.useFlexGap ? {
      gap: xc(p, w)
    } : {
      // The useFlexGap={false} implement relies on each child to give up control of the margin.
      // We need to reset the margin to avoid double spacing.
      "& > :not(style):not(style)": {
        margin: 0
      },
      "& > :not(style) ~ :not(style)": {
        [`margin${NU(_ ? g[_] : i.direction)}`]: xc(p, w)
      }
    }));
  }
  return c = WL(s.breakpoints, c), c;
};
function zU(i = {}) {
  const {
    // This will allow adding custom styled fn (for example for custom sx style function)
    createStyledComponent: s = DU,
    useThemeProps: c = MU,
    componentName: p = "MuiStack"
  } = i, y = () => rl({
    root: ["root"]
  }, (w) => $i(p, w), {}), g = s(LU), h = /* @__PURE__ */ De.forwardRef(function(w, _) {
    const A = c(w), O = S_(A), {
      component: L = "div",
      direction: H = "column",
      spacing: Y = 0,
      divider: B,
      children: P,
      className: se,
      useFlexGap: ae = !1,
      ...I
    } = O, J = {
      direction: H,
      spacing: Y,
      useFlexGap: ae
    }, U = y();
    return /* @__PURE__ */ Ae.jsx(g, {
      as: L,
      ownerState: J,
      ref: _,
      className: lr(U.root, se),
      ...I,
      children: B ? AU(P, B) : P
    });
  });
  return process.env.NODE_ENV !== "production" && (h.propTypes = {
    children: R.node,
    direction: R.oneOfType([R.oneOf(["column-reverse", "column", "row-reverse", "row"]), R.arrayOf(R.oneOf(["column-reverse", "column", "row-reverse", "row"])), R.object]),
    divider: R.node,
    spacing: R.oneOfType([R.arrayOf(R.oneOfType([R.number, R.string])), R.number, R.object, R.string]),
    sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
  }), h;
}
const fh = {
  black: "#000",
  white: "#fff"
}, UU = {
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
}, Td = {
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
}, xd = {
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
}, Zv = {
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
}, wd = {
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
}, Rd = {
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
}, _d = {
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
}, _R = {
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
    paper: fh.white,
    default: fh.white
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
}, oE = {
  text: {
    primary: fh.white,
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
    active: fh.white,
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
function kR(i, s, c, p) {
  const y = p.light || p, g = p.dark || p * 1.5;
  i[s] || (i.hasOwnProperty(c) ? i[s] = i[c] : s === "light" ? i.light = $E(i.main, y) : s === "dark" && (i.dark = FE(i.main, g)));
}
function jU(i = "light") {
  return i === "dark" ? {
    main: wd[200],
    light: wd[50],
    dark: wd[400]
  } : {
    main: wd[700],
    light: wd[400],
    dark: wd[800]
  };
}
function PU(i = "light") {
  return i === "dark" ? {
    main: Td[200],
    light: Td[50],
    dark: Td[400]
  } : {
    main: Td[500],
    light: Td[300],
    dark: Td[700]
  };
}
function FU(i = "light") {
  return i === "dark" ? {
    main: xd[500],
    light: xd[300],
    dark: xd[700]
  } : {
    main: xd[700],
    light: xd[400],
    dark: xd[800]
  };
}
function $U(i = "light") {
  return i === "dark" ? {
    main: Rd[400],
    light: Rd[300],
    dark: Rd[700]
  } : {
    main: Rd[700],
    light: Rd[500],
    dark: Rd[900]
  };
}
function VU(i = "light") {
  return i === "dark" ? {
    main: _d[400],
    light: _d[300],
    dark: _d[700]
  } : {
    main: _d[800],
    light: _d[500],
    dark: _d[900]
  };
}
function BU(i = "light") {
  return i === "dark" ? {
    main: Zv[400],
    light: Zv[300],
    dark: Zv[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Zv[500],
    dark: Zv[900]
  };
}
function WE(i) {
  const {
    mode: s = "light",
    contrastThreshold: c = 3,
    tonalOffset: p = 0.2,
    ...y
  } = i, g = i.primary || jU(s), h = i.secondary || PU(s), T = i.error || FU(s), w = i.info || $U(s), _ = i.success || VU(s), A = i.warning || BU(s);
  function O(B) {
    const P = SR(B, oE.text.primary) >= c ? oE.text.primary : _R.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const se = SR(B, P);
      se < 3 && console.error([`MUI: The contrast ratio of ${se}:1 for ${P} on ${B}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return P;
  }
  const L = ({
    color: B,
    name: P,
    mainShade: se = 500,
    lightShade: ae = 300,
    darkShade: I = 700
  }) => {
    if (B = {
      ...B
    }, !B.main && B[se] && (B.main = B[se]), !B.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${P ? ` (${P})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${se}\` property.` : us(11, P ? ` (${P})` : "", se));
    if (typeof B.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${P ? ` (${P})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(B.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : us(12, P ? ` (${P})` : "", JSON.stringify(B.main)));
    return kR(B, "light", ae, p), kR(B, "dark", I, p), B.contrastText || (B.contrastText = O(B.main)), B;
  }, H = {
    dark: oE,
    light: _R
  };
  return process.env.NODE_ENV !== "production" && (H[s] || console.error(`MUI: The palette mode \`${s}\` is not supported.`)), Na({
    // A collection of common colors.
    common: {
      ...fh
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: s,
    // The colors used to represent primary interface elements for a user.
    primary: L({
      color: g,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: L({
      color: h,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: L({
      color: T,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: L({
      color: A,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: L({
      color: w,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: L({
      color: _,
      name: "success"
    }),
    // The grey colors.
    grey: UU,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: c,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: O,
    // Generate a rich color object.
    augmentColor: L,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: p,
    // The light and dark mode object.
    ...H[s]
  }, y);
}
function HU(i) {
  const s = {};
  return Object.entries(i).forEach((p) => {
    const [y, g] = p;
    typeof g == "object" && (s[y] = `${g.fontStyle ? `${g.fontStyle} ` : ""}${g.fontVariant ? `${g.fontVariant} ` : ""}${g.fontWeight ? `${g.fontWeight} ` : ""}${g.fontStretch ? `${g.fontStretch} ` : ""}${g.fontSize || ""}${g.lineHeight ? `/${g.lineHeight} ` : ""}${g.fontFamily || ""}`);
  }), s;
}
function IU(i, s) {
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
function YU(i) {
  return Math.round(i * 1e5) / 1e5;
}
const OR = {
  textTransform: "uppercase"
}, DR = '"Roboto", "Helvetica", "Arial", sans-serif';
function N_(i, s) {
  const {
    fontFamily: c = DR,
    // The default font size of the Material Specification.
    fontSize: p = 14,
    // px
    fontWeightLight: y = 300,
    fontWeightRegular: g = 400,
    fontWeightMedium: h = 500,
    fontWeightBold: T = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: w = 16,
    // Apply the CSS properties to all the variants.
    allVariants: _,
    pxToRem: A,
    ...O
  } = typeof s == "function" ? s(i) : s;
  process.env.NODE_ENV !== "production" && (typeof p != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof w != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const L = p / 14, H = A || ((P) => `${P / w * L}rem`), Y = (P, se, ae, I, J) => ({
    fontFamily: c,
    fontWeight: P,
    fontSize: H(se),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: ae,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...c === DR ? {
      letterSpacing: `${YU(I / se)}em`
    } : {},
    ...J,
    ..._
  }), B = {
    h1: Y(y, 96, 1.167, -1.5),
    h2: Y(y, 60, 1.2, -0.5),
    h3: Y(g, 48, 1.167, 0),
    h4: Y(g, 34, 1.235, 0.25),
    h5: Y(g, 24, 1.334, 0),
    h6: Y(h, 20, 1.6, 0.15),
    subtitle1: Y(g, 16, 1.75, 0.15),
    subtitle2: Y(h, 14, 1.57, 0.1),
    body1: Y(g, 16, 1.5, 0.15),
    body2: Y(g, 14, 1.43, 0.15),
    button: Y(h, 14, 1.75, 0.4, OR),
    caption: Y(g, 12, 1.66, 0.4),
    overline: Y(g, 12, 2.66, 1, OR),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Na({
    htmlFontSize: w,
    pxToRem: H,
    fontFamily: c,
    fontSize: p,
    fontWeightLight: y,
    fontWeightRegular: g,
    fontWeightMedium: h,
    fontWeightBold: T,
    ...B
  }, O, {
    clone: !1
    // No need to clone deep
  });
}
const WU = 0.2, GU = 0.14, qU = 0.12;
function Fn(...i) {
  return [`${i[0]}px ${i[1]}px ${i[2]}px ${i[3]}px rgba(0,0,0,${WU})`, `${i[4]}px ${i[5]}px ${i[6]}px ${i[7]}px rgba(0,0,0,${GU})`, `${i[8]}px ${i[9]}px ${i[10]}px ${i[11]}px rgba(0,0,0,${qU})`].join(",");
}
const QU = ["none", Fn(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), Fn(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), Fn(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), Fn(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), Fn(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), Fn(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), Fn(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), Fn(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), Fn(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), Fn(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), Fn(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), Fn(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), Fn(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), Fn(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), Fn(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), Fn(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), Fn(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), Fn(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), Fn(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), Fn(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), Fn(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), Fn(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), Fn(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), Fn(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], KU = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, XU = {
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
function MR(i) {
  return `${Math.round(i)}ms`;
}
function ZU(i) {
  if (!i)
    return 0;
  const s = i / 36;
  return Math.min(Math.round((4 + 15 * s ** 0.25 + s / 5) * 10), 3e3);
}
function JU(i) {
  const s = {
    ...KU,
    ...i.easing
  }, c = {
    ...XU,
    ...i.duration
  };
  return {
    getAutoHeightDuration: ZU,
    create: (y = ["all"], g = {}) => {
      const {
        duration: h = c.standard,
        easing: T = s.easeInOut,
        delay: w = 0,
        ..._
      } = g;
      if (process.env.NODE_ENV !== "production") {
        const A = (L) => typeof L == "string", O = (L) => !Number.isNaN(parseFloat(L));
        !A(y) && !Array.isArray(y) && console.error('MUI: Argument "props" must be a string or Array.'), !O(h) && !A(h) && console.error(`MUI: Argument "duration" must be a number or a string but found ${h}.`), A(T) || console.error('MUI: Argument "easing" must be a string.'), !O(w) && !A(w) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof g != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(_).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(_).join(",")}].`);
      }
      return (Array.isArray(y) ? y : [y]).map((A) => `${A} ${typeof h == "string" ? h : MR(h)} ${T} ${typeof w == "string" ? w : MR(w)}`).join(",");
    },
    ...i,
    easing: s,
    duration: c
  };
}
const ej = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function TE(i = {}, ...s) {
  const {
    breakpoints: c,
    mixins: p = {},
    spacing: y,
    palette: g = {},
    transitions: h = {},
    typography: T = {},
    shape: w,
    ..._
  } = i;
  if (i.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : us(20));
  const A = WE(g), O = d0(i);
  let L = Na(O, {
    mixins: IU(O.breakpoints, p),
    palette: A,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: QU.slice(),
    typography: N_(A, T),
    transitions: JU(h),
    zIndex: {
      ...ej
    }
  });
  if (L = Na(L, _), L = s.reduce((H, Y) => Na(H, Y), L), process.env.NODE_ENV !== "production") {
    const H = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], Y = (B, P) => {
      let se;
      for (se in B) {
        const ae = B[se];
        if (H.includes(se) && Object.keys(ae).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const I = $i("", se);
            console.error([`MUI: The \`${P}\` component increases the CSS specificity of the \`${se}\` internal state.`, "You can not override it like this: ", JSON.stringify(B, null, 2), "", `Instead, you need to use the '&.${I}' syntax:`, JSON.stringify({
              root: {
                [`&.${I}`]: ae
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          B[se] = {};
        }
      }
    };
    Object.keys(L.components).forEach((B) => {
      const P = L.components[B].styleOverrides;
      P && B.startsWith("Mui") && Y(P, B);
    });
  }
  return L.unstable_sxConfig = {
    ...vh,
    ..._ == null ? void 0 : _.unstable_sxConfig
  }, L.unstable_sx = function(Y) {
    return Ud({
      sx: Y,
      theme: this
    });
  }, L;
}
function xE(i) {
  let s;
  return i < 1 ? s = 5.11916 * i ** 2 : s = 4.5 * Math.log(i + 1) + 2, Math.round(s * 10) / 1e3;
}
const tj = [...Array(25)].map((i, s) => {
  if (s === 0)
    return "none";
  const c = xE(s);
  return `linear-gradient(rgba(255 255 255 / ${c}), rgba(255 255 255 / ${c}))`;
});
function L_(i) {
  return {
    inputPlaceholder: i === "dark" ? 0.5 : 0.42,
    inputUnderline: i === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: i === "dark" ? 0.2 : 0.12,
    switchTrack: i === "dark" ? 0.3 : 0.38
  };
}
function z_(i) {
  return i === "dark" ? tj : [];
}
function nj(i) {
  const {
    palette: s = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: c,
    overlays: p,
    ...y
  } = i, g = WE(s);
  return {
    palette: g,
    opacity: {
      ...L_(g.mode),
      ...c
    },
    overlays: p || z_(g.mode),
    ...y
  };
}
function rj(i) {
  var s;
  return !!i[0].match(/(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/) || !!i[0].match(/sxConfig$/) || // ends with sxConfig
  i[0] === "palette" && !!((s = i[1]) != null && s.match(/(mode|contrastThreshold|tonalOffset)/));
}
const aj = (i) => [...[...Array(25)].map((s, c) => `--${i ? `${i}-` : ""}overlays-${c}`), `--${i ? `${i}-` : ""}palette-AppBar-darkBg`, `--${i ? `${i}-` : ""}palette-AppBar-darkColor`], ij = (i) => (s, c) => {
  const p = i.colorSchemeSelector;
  let y = p;
  if (p === "class" && (y = ".%s"), p === "data" && (y = "[data-%s]"), p != null && p.startsWith("data-") && !p.includes("%s") && (y = `[${p}="%s"]`), i.defaultColorScheme === s) {
    if (s === "dark") {
      const g = {};
      return aj(i.cssVarPrefix).forEach((h) => {
        g[h] = c[h], delete c[h];
      }), y === "media" ? {
        ":root": c,
        "@media (prefers-color-scheme: dark)": {
          ":root": g
        }
      } : y ? {
        [y.replace("%s", s)]: g,
        [`:root, ${y.replace("%s", s)}`]: c
      } : {
        ":root": {
          ...c,
          ...g
        }
      };
    }
    if (y && y !== "media")
      return `:root, ${y.replace("%s", String(s))}`;
  } else if (s) {
    if (y === "media")
      return {
        [`@media (prefers-color-scheme: ${String(s)})`]: {
          ":root": c
        }
      };
    if (y)
      return y.replace("%s", String(s));
  }
  return ":root";
};
function oj(i) {
  return Zo(i) || typeof i > "u" || typeof i == "string" || typeof i == "boolean" || typeof i == "number" || Array.isArray(i);
}
function lj(i = {}) {
  const s = {
    ...i
  };
  function c(p) {
    const y = Object.entries(p);
    for (let g = 0; g < y.length; g++) {
      const [h, T] = y[g];
      !oj(T) || h.startsWith("unstable_") ? delete p[h] : Zo(T) && (p[h] = {
        ...T
      }, c(p[h]));
    }
  }
  return c(s), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(s, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function uj(i, s) {
  s.forEach((c) => {
    i[c] || (i[c] = {});
  });
}
function ue(i, s, c) {
  !i[s] && c && (i[s] = c);
}
function th(i) {
  return !i || !i.startsWith("hsl") ? i : x_(i);
}
function Gl(i, s) {
  `${s}Channel` in i || (i[`${s}Channel`] = eh(th(i[s]), `MUI: Can't create \`palette.${s}Channel\` because \`palette.${s}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${s}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function sj(i) {
  return typeof i == "number" ? `${i}px` : typeof i == "string" || typeof i == "function" || Array.isArray(i) ? i : "8px";
}
const qo = (i) => {
  try {
    return i();
  } catch {
  }
}, cj = (i = "mui") => xU(i);
function lE(i, s, c, p) {
  if (!s)
    return;
  s = s === !0 ? {} : s;
  const y = p === "dark" ? "dark" : "light";
  if (!c) {
    i[p] = nj({
      ...s,
      palette: {
        mode: y,
        ...s == null ? void 0 : s.palette
      }
    });
    return;
  }
  const {
    palette: g,
    ...h
  } = TE({
    ...c,
    palette: {
      mode: y,
      ...s == null ? void 0 : s.palette
    }
  });
  return i[p] = {
    ...s,
    palette: g,
    opacity: {
      ...L_(y),
      ...s == null ? void 0 : s.opacity
    },
    overlays: (s == null ? void 0 : s.overlays) || z_(y)
  }, h;
}
function fj(i = {}, ...s) {
  const {
    colorSchemes: c = {
      light: !0
    },
    defaultColorScheme: p,
    disableCssColorScheme: y = !1,
    cssVarPrefix: g = "mui",
    shouldSkipGeneratingVar: h = rj,
    colorSchemeSelector: T = c.light && c.dark ? "media" : void 0,
    ...w
  } = i, _ = Object.keys(c)[0], A = p || (c.light && _ !== "light" ? "light" : _), O = cj(g), {
    [A]: L,
    light: H,
    dark: Y,
    ...B
  } = c, P = {
    ...B
  };
  let se = L;
  if ((A === "dark" && !("dark" in c) || A === "light" && !("light" in c)) && (se = !0), !se)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${A}\` option is either missing or invalid.` : us(21, A));
  const ae = lE(P, se, w, A);
  H && !P.light && lE(P, H, void 0, "light"), Y && !P.dark && lE(P, Y, void 0, "dark");
  let I = {
    defaultColorScheme: A,
    ...ae,
    cssVarPrefix: g,
    colorSchemeSelector: T,
    getCssVar: O,
    colorSchemes: P,
    font: {
      ...HU(ae.typography),
      ...ae.font
    },
    spacing: sj(w.spacing)
  };
  Object.keys(I.colorSchemes).forEach((Xe) => {
    const D = I.colorSchemes[Xe].palette, ce = (_e) => {
      const he = _e.split("-"), ve = he[1], Re = he[2];
      return O(_e, D[ve][Re]);
    };
    if (D.mode === "light" && (ue(D.common, "background", "#fff"), ue(D.common, "onBackground", "#000")), D.mode === "dark" && (ue(D.common, "background", "#000"), ue(D.common, "onBackground", "#fff")), uj(D, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), D.mode === "light") {
      ue(D.Alert, "errorColor", xn(D.error.light, 0.6)), ue(D.Alert, "infoColor", xn(D.info.light, 0.6)), ue(D.Alert, "successColor", xn(D.success.light, 0.6)), ue(D.Alert, "warningColor", xn(D.warning.light, 0.6)), ue(D.Alert, "errorFilledBg", ce("palette-error-main")), ue(D.Alert, "infoFilledBg", ce("palette-info-main")), ue(D.Alert, "successFilledBg", ce("palette-success-main")), ue(D.Alert, "warningFilledBg", ce("palette-warning-main")), ue(D.Alert, "errorFilledColor", qo(() => D.getContrastText(D.error.main))), ue(D.Alert, "infoFilledColor", qo(() => D.getContrastText(D.info.main))), ue(D.Alert, "successFilledColor", qo(() => D.getContrastText(D.success.main))), ue(D.Alert, "warningFilledColor", qo(() => D.getContrastText(D.warning.main))), ue(D.Alert, "errorStandardBg", wn(D.error.light, 0.9)), ue(D.Alert, "infoStandardBg", wn(D.info.light, 0.9)), ue(D.Alert, "successStandardBg", wn(D.success.light, 0.9)), ue(D.Alert, "warningStandardBg", wn(D.warning.light, 0.9)), ue(D.Alert, "errorIconColor", ce("palette-error-main")), ue(D.Alert, "infoIconColor", ce("palette-info-main")), ue(D.Alert, "successIconColor", ce("palette-success-main")), ue(D.Alert, "warningIconColor", ce("palette-warning-main")), ue(D.AppBar, "defaultBg", ce("palette-grey-100")), ue(D.Avatar, "defaultBg", ce("palette-grey-400")), ue(D.Button, "inheritContainedBg", ce("palette-grey-300")), ue(D.Button, "inheritContainedHoverBg", ce("palette-grey-A100")), ue(D.Chip, "defaultBorder", ce("palette-grey-400")), ue(D.Chip, "defaultAvatarColor", ce("palette-grey-700")), ue(D.Chip, "defaultIconColor", ce("palette-grey-700")), ue(D.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), ue(D.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), ue(D.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), ue(D.LinearProgress, "primaryBg", wn(D.primary.main, 0.62)), ue(D.LinearProgress, "secondaryBg", wn(D.secondary.main, 0.62)), ue(D.LinearProgress, "errorBg", wn(D.error.main, 0.62)), ue(D.LinearProgress, "infoBg", wn(D.info.main, 0.62)), ue(D.LinearProgress, "successBg", wn(D.success.main, 0.62)), ue(D.LinearProgress, "warningBg", wn(D.warning.main, 0.62)), ue(D.Skeleton, "bg", `rgba(${ce("palette-text-primaryChannel")} / 0.11)`), ue(D.Slider, "primaryTrack", wn(D.primary.main, 0.62)), ue(D.Slider, "secondaryTrack", wn(D.secondary.main, 0.62)), ue(D.Slider, "errorTrack", wn(D.error.main, 0.62)), ue(D.Slider, "infoTrack", wn(D.info.main, 0.62)), ue(D.Slider, "successTrack", wn(D.success.main, 0.62)), ue(D.Slider, "warningTrack", wn(D.warning.main, 0.62));
      const _e = Dg(D.background.default, 0.8);
      ue(D.SnackbarContent, "bg", _e), ue(D.SnackbarContent, "color", qo(() => D.getContrastText(_e))), ue(D.SpeedDialAction, "fabHoverBg", Dg(D.background.paper, 0.15)), ue(D.StepConnector, "border", ce("palette-grey-400")), ue(D.StepContent, "border", ce("palette-grey-400")), ue(D.Switch, "defaultColor", ce("palette-common-white")), ue(D.Switch, "defaultDisabledColor", ce("palette-grey-100")), ue(D.Switch, "primaryDisabledColor", wn(D.primary.main, 0.62)), ue(D.Switch, "secondaryDisabledColor", wn(D.secondary.main, 0.62)), ue(D.Switch, "errorDisabledColor", wn(D.error.main, 0.62)), ue(D.Switch, "infoDisabledColor", wn(D.info.main, 0.62)), ue(D.Switch, "successDisabledColor", wn(D.success.main, 0.62)), ue(D.Switch, "warningDisabledColor", wn(D.warning.main, 0.62)), ue(D.TableCell, "border", wn(Og(D.divider, 1), 0.88)), ue(D.Tooltip, "bg", Og(D.grey[700], 0.92));
    }
    if (D.mode === "dark") {
      ue(D.Alert, "errorColor", wn(D.error.light, 0.6)), ue(D.Alert, "infoColor", wn(D.info.light, 0.6)), ue(D.Alert, "successColor", wn(D.success.light, 0.6)), ue(D.Alert, "warningColor", wn(D.warning.light, 0.6)), ue(D.Alert, "errorFilledBg", ce("palette-error-dark")), ue(D.Alert, "infoFilledBg", ce("palette-info-dark")), ue(D.Alert, "successFilledBg", ce("palette-success-dark")), ue(D.Alert, "warningFilledBg", ce("palette-warning-dark")), ue(D.Alert, "errorFilledColor", qo(() => D.getContrastText(D.error.dark))), ue(D.Alert, "infoFilledColor", qo(() => D.getContrastText(D.info.dark))), ue(D.Alert, "successFilledColor", qo(() => D.getContrastText(D.success.dark))), ue(D.Alert, "warningFilledColor", qo(() => D.getContrastText(D.warning.dark))), ue(D.Alert, "errorStandardBg", xn(D.error.light, 0.9)), ue(D.Alert, "infoStandardBg", xn(D.info.light, 0.9)), ue(D.Alert, "successStandardBg", xn(D.success.light, 0.9)), ue(D.Alert, "warningStandardBg", xn(D.warning.light, 0.9)), ue(D.Alert, "errorIconColor", ce("palette-error-main")), ue(D.Alert, "infoIconColor", ce("palette-info-main")), ue(D.Alert, "successIconColor", ce("palette-success-main")), ue(D.Alert, "warningIconColor", ce("palette-warning-main")), ue(D.AppBar, "defaultBg", ce("palette-grey-900")), ue(D.AppBar, "darkBg", ce("palette-background-paper")), ue(D.AppBar, "darkColor", ce("palette-text-primary")), ue(D.Avatar, "defaultBg", ce("palette-grey-600")), ue(D.Button, "inheritContainedBg", ce("palette-grey-800")), ue(D.Button, "inheritContainedHoverBg", ce("palette-grey-700")), ue(D.Chip, "defaultBorder", ce("palette-grey-700")), ue(D.Chip, "defaultAvatarColor", ce("palette-grey-300")), ue(D.Chip, "defaultIconColor", ce("palette-grey-300")), ue(D.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), ue(D.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), ue(D.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), ue(D.LinearProgress, "primaryBg", xn(D.primary.main, 0.5)), ue(D.LinearProgress, "secondaryBg", xn(D.secondary.main, 0.5)), ue(D.LinearProgress, "errorBg", xn(D.error.main, 0.5)), ue(D.LinearProgress, "infoBg", xn(D.info.main, 0.5)), ue(D.LinearProgress, "successBg", xn(D.success.main, 0.5)), ue(D.LinearProgress, "warningBg", xn(D.warning.main, 0.5)), ue(D.Skeleton, "bg", `rgba(${ce("palette-text-primaryChannel")} / 0.13)`), ue(D.Slider, "primaryTrack", xn(D.primary.main, 0.5)), ue(D.Slider, "secondaryTrack", xn(D.secondary.main, 0.5)), ue(D.Slider, "errorTrack", xn(D.error.main, 0.5)), ue(D.Slider, "infoTrack", xn(D.info.main, 0.5)), ue(D.Slider, "successTrack", xn(D.success.main, 0.5)), ue(D.Slider, "warningTrack", xn(D.warning.main, 0.5));
      const _e = Dg(D.background.default, 0.98);
      ue(D.SnackbarContent, "bg", _e), ue(D.SnackbarContent, "color", qo(() => D.getContrastText(_e))), ue(D.SpeedDialAction, "fabHoverBg", Dg(D.background.paper, 0.15)), ue(D.StepConnector, "border", ce("palette-grey-600")), ue(D.StepContent, "border", ce("palette-grey-600")), ue(D.Switch, "defaultColor", ce("palette-grey-300")), ue(D.Switch, "defaultDisabledColor", ce("palette-grey-600")), ue(D.Switch, "primaryDisabledColor", xn(D.primary.main, 0.55)), ue(D.Switch, "secondaryDisabledColor", xn(D.secondary.main, 0.55)), ue(D.Switch, "errorDisabledColor", xn(D.error.main, 0.55)), ue(D.Switch, "infoDisabledColor", xn(D.info.main, 0.55)), ue(D.Switch, "successDisabledColor", xn(D.success.main, 0.55)), ue(D.Switch, "warningDisabledColor", xn(D.warning.main, 0.55)), ue(D.TableCell, "border", xn(Og(D.divider, 1), 0.68)), ue(D.Tooltip, "bg", Og(D.grey[700], 0.92));
    }
    Gl(D.background, "default"), Gl(D.background, "paper"), Gl(D.common, "background"), Gl(D.common, "onBackground"), Gl(D, "divider"), Object.keys(D).forEach((_e) => {
      const he = D[_e];
      he && typeof he == "object" && (he.main && ue(D[_e], "mainChannel", eh(th(he.main))), he.light && ue(D[_e], "lightChannel", eh(th(he.light))), he.dark && ue(D[_e], "darkChannel", eh(th(he.dark))), he.contrastText && ue(D[_e], "contrastTextChannel", eh(th(he.contrastText))), _e === "text" && (Gl(D[_e], "primary"), Gl(D[_e], "secondary")), _e === "action" && (he.active && Gl(D[_e], "active"), he.selected && Gl(D[_e], "selected")));
    });
  }), I = s.reduce((Xe, D) => Na(Xe, D), I);
  const J = {
    prefix: g,
    disableCssColorScheme: y,
    shouldSkipGeneratingVar: h,
    getSelector: ij(I)
  }, {
    vars: U,
    generateThemeVars: de,
    generateStyleSheets: ie
  } = _U(I, J);
  return I.vars = U, Object.entries(I.colorSchemes[I.defaultColorScheme]).forEach(([Xe, D]) => {
    I[Xe] = D;
  }), I.generateThemeVars = de, I.generateStyleSheets = ie, I.generateSpacing = function() {
    return m_(w.spacing, o0(this));
  }, I.getColorSchemeSelector = kU(T), I.spacing = I.generateSpacing(), I.shouldSkipGeneratingVar = h, I.unstable_sxConfig = {
    ...vh,
    ...w == null ? void 0 : w.unstable_sxConfig
  }, I.unstable_sx = function(D) {
    return Ud({
      sx: D,
      theme: this
    });
  }, I.toRuntimeSource = lj, I;
}
function AR(i, s, c) {
  i.colorSchemes && c && (i.colorSchemes[s] = {
    ...c !== !0 && c,
    palette: WE({
      ...c === !0 ? {} : c.palette,
      mode: s
    })
    // cast type to skip module augmentation test
  });
}
function GE(i = {}, ...s) {
  const {
    palette: c,
    cssVariables: p = !1,
    colorSchemes: y = c ? void 0 : {
      light: !0
    },
    defaultColorScheme: g = c == null ? void 0 : c.mode,
    ...h
  } = i, T = g || "light", w = y == null ? void 0 : y[T], _ = {
    ...y,
    ...c ? {
      [T]: {
        ...typeof w != "boolean" && w,
        palette: c
      }
    } : void 0
  };
  if (p === !1) {
    if (!("colorSchemes" in i))
      return TE(i, ...s);
    let A = c;
    "palette" in i || _[T] && (_[T] !== !0 ? A = _[T].palette : T === "dark" && (A = {
      mode: "dark"
    }));
    const O = TE({
      ...i,
      palette: A
    }, ...s);
    return O.defaultColorScheme = T, O.colorSchemes = _, O.palette.mode === "light" && (O.colorSchemes.light = {
      ..._.light !== !0 && _.light,
      palette: O.palette
    }, AR(O, "dark", _.dark)), O.palette.mode === "dark" && (O.colorSchemes.dark = {
      ..._.dark !== !0 && _.dark,
      palette: O.palette
    }, AR(O, "light", _.light)), O;
  }
  return !c && !("light" in _) && T === "light" && (_.light = !0), fj({
    ...h,
    colorSchemes: _,
    defaultColorScheme: T,
    ...typeof p != "boolean" && p
  }, ...s);
}
const h0 = GE(), tl = "$$material";
function dj(i) {
  return i !== "ownerState" && i !== "theme" && i !== "sx" && i !== "as";
}
const U_ = (i) => dj(i) && i !== "classes", La = E_({
  themeId: tl,
  defaultTheme: h0,
  rootShouldForwardProp: U_
});
function pj({
  props: i,
  name: s
}) {
  return T_({
    props: i,
    name: s,
    defaultTheme: h0,
    themeId: tl
  });
}
const j_ = zU({
  createStyledComponent: La("div", {
    name: "MuiStack",
    slot: "Root",
    overridesResolver: (i, s) => s.root
  }),
  useThemeProps: (i) => pj({
    props: i,
    name: "MuiStack"
  })
});
process.env.NODE_ENV !== "production" && (j_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * Defines the `flex-direction` style property.
   * It is applied for all screen sizes.
   * @default 'column'
   */
  direction: R.oneOfType([R.oneOf(["column-reverse", "column", "row-reverse", "row"]), R.arrayOf(R.oneOf(["column-reverse", "column", "row-reverse", "row"])), R.object]),
  /**
   * Add an element between each child.
   */
  divider: R.node,
  /**
   * Defines the space between immediate children.
   * @default 0
   */
  spacing: R.oneOfType([R.arrayOf(R.oneOfType([R.number, R.string])), R.number, R.object, R.string]),
  /**
   * The system prop, which allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object]),
  /**
   * If `true`, the CSS flexbox `gap` is used instead of applying `margin` to children.
   *
   * While CSS `gap` removes the [known limitations](https://mui.com/joy-ui/react-stack/#limitations),
   * it is not fully supported in some browsers. We recommend checking https://caniuse.com/?search=flex%20gap before using this flag.
   *
   * To enable this flag globally, follow the [theme's default props](https://mui.com/material-ui/customization/theme-components/#default-props) configuration.
   * @default false
   */
  useFlexGap: R.bool
});
function vj() {
  const i = jE(h0);
  return process.env.NODE_ENV !== "production" && De.useDebugValue(i), i[tl] || i;
}
function P_(i) {
  return /* @__PURE__ */ Ae.jsx(g_, {
    ...i,
    defaultTheme: h0,
    themeId: tl
  });
}
process.env.NODE_ENV !== "production" && (P_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The styles you want to apply globally.
   */
  styles: R.oneOfType([R.array, R.func, R.number, R.object, R.string, R.bool])
});
function F_(i) {
  return function(c) {
    return (
      // Pigment CSS `globalCss` support callback with theme inside an object but `GlobalStyles` support theme as a callback value.
      /* @__PURE__ */ Ae.jsx(P_, {
        styles: typeof i == "function" ? (p) => i({
          theme: p,
          ...c
        }) : i
      })
    );
  };
}
function hj() {
  return S_;
}
const NR = {
  theme: void 0
};
function hh(i) {
  let s, c;
  return (p) => {
    let y = s;
    return (y === void 0 || p.theme !== c) && (NR.theme = p.theme, y = i(NR), s = y, c = p.theme), y;
  };
}
process.env.NODE_ENV !== "production" && (R.node, R.object.isRequired);
function yo(i) {
  return yU(i);
}
class Wg {
  constructor() {
    qv(this, "mountEffect", () => {
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
    return new Wg();
  }
  static use() {
    const s = R_(Wg.create).current, [c, p] = De.useState(!1);
    return s.shouldMount = c, s.setShouldMount = p, De.useEffect(s.mountEffect, [c]), s;
  }
  mount() {
    return this.mounted || (this.mounted = yj(), this.shouldMount = !0, this.setShouldMount(this.shouldMount)), this.mounted;
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
function mj() {
  return Wg.use();
}
function yj() {
  let i, s;
  const c = new Promise((p, y) => {
    i = p, s = y;
  });
  return c.resolve = i, c.reject = s, c;
}
function gj(i, s) {
  if (i == null) return {};
  var c = {};
  for (var p in i) if ({}.hasOwnProperty.call(i, p)) {
    if (s.includes(p)) continue;
    c[p] = i[p];
  }
  return c;
}
function wE(i, s) {
  return wE = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(c, p) {
    return c.__proto__ = p, c;
  }, wE(i, s);
}
function Sj(i, s) {
  i.prototype = Object.create(s.prototype), i.prototype.constructor = i, wE(i, s);
}
const LR = Rn.createContext(null);
function bj(i) {
  if (i === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return i;
}
function qE(i, s) {
  var c = function(g) {
    return s && Lg(g) ? s(g) : g;
  }, p = /* @__PURE__ */ Object.create(null);
  return i && e2.map(i, function(y) {
    return y;
  }).forEach(function(y) {
    p[y.key] = c(y);
  }), p;
}
function Cj(i, s) {
  i = i || {}, s = s || {};
  function c(A) {
    return A in s ? s[A] : i[A];
  }
  var p = /* @__PURE__ */ Object.create(null), y = [];
  for (var g in i)
    g in s ? y.length && (p[g] = y, y = []) : y.push(g);
  var h, T = {};
  for (var w in s) {
    if (p[w])
      for (h = 0; h < p[w].length; h++) {
        var _ = p[w][h];
        T[p[w][h]] = c(_);
      }
    T[w] = c(w);
  }
  for (h = 0; h < y.length; h++)
    T[y[h]] = c(y[h]);
  return T;
}
function Tc(i, s, c) {
  return c[s] != null ? c[s] : i.props[s];
}
function Ej(i, s) {
  return qE(i.children, function(c) {
    return zg(c, {
      onExited: s.bind(null, c),
      in: !0,
      appear: Tc(c, "appear", i),
      enter: Tc(c, "enter", i),
      exit: Tc(c, "exit", i)
    });
  });
}
function Tj(i, s, c) {
  var p = qE(i.children), y = Cj(s, p);
  return Object.keys(y).forEach(function(g) {
    var h = y[g];
    if (Lg(h)) {
      var T = g in s, w = g in p, _ = s[g], A = Lg(_) && !_.props.in;
      w && (!T || A) ? y[g] = zg(h, {
        onExited: c.bind(null, h),
        in: !0,
        exit: Tc(h, "exit", i),
        enter: Tc(h, "enter", i)
      }) : !w && T && !A ? y[g] = zg(h, {
        in: !1
      }) : w && T && Lg(_) && (y[g] = zg(h, {
        onExited: c.bind(null, h),
        in: _.props.in,
        exit: Tc(h, "exit", i),
        enter: Tc(h, "enter", i)
      }));
    }
  }), y;
}
var xj = Object.values || function(i) {
  return Object.keys(i).map(function(s) {
    return i[s];
  });
}, wj = {
  component: "div",
  childFactory: function(s) {
    return s;
  }
}, QE = /* @__PURE__ */ function(i) {
  Sj(s, i);
  function s(p, y) {
    var g;
    g = i.call(this, p, y) || this;
    var h = g.handleExited.bind(bj(g));
    return g.state = {
      contextValue: {
        isMounting: !0
      },
      handleExited: h,
      firstRender: !0
    }, g;
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
  }, s.getDerivedStateFromProps = function(y, g) {
    var h = g.children, T = g.handleExited, w = g.firstRender;
    return {
      children: w ? Ej(y, T) : Tj(y, h, T),
      firstRender: !1
    };
  }, c.handleExited = function(y, g) {
    var h = qE(this.props.children);
    y.key in h || (y.props.onExited && y.props.onExited(g), this.mounted && this.setState(function(T) {
      var w = Bg({}, T.children);
      return delete w[y.key], {
        children: w
      };
    }));
  }, c.render = function() {
    var y = this.props, g = y.component, h = y.childFactory, T = gj(y, ["component", "childFactory"]), w = this.state.contextValue, _ = xj(this.state.children).map(h);
    return delete T.appear, delete T.enter, delete T.exit, g === null ? /* @__PURE__ */ Rn.createElement(LR.Provider, {
      value: w
    }, _) : /* @__PURE__ */ Rn.createElement(LR.Provider, {
      value: w
    }, /* @__PURE__ */ Rn.createElement(g, T, _));
  }, s;
}(Rn.Component);
QE.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * `<TransitionGroup>` renders a `<div>` by default. You can change this
   * behavior by providing a `component` prop.
   * If you use React v16+ and would like to avoid a wrapping `<div>` element
   * you can pass in `component={null}`. This is useful if the wrapping div
   * borks your css styles.
   */
  component: R.any,
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
  children: R.node,
  /**
   * A convenience prop that enables or disables appear animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  appear: R.bool,
  /**
   * A convenience prop that enables or disables enter animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  enter: R.bool,
  /**
   * A convenience prop that enables or disables exit animations
   * for all children. Note that specifying this will override any defaults set
   * on individual children Transitions.
   */
  exit: R.bool,
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
  childFactory: R.func
} : {};
QE.defaultProps = wj;
function $_(i) {
  const {
    className: s,
    classes: c,
    pulsate: p = !1,
    rippleX: y,
    rippleY: g,
    rippleSize: h,
    in: T,
    onExited: w,
    timeout: _
  } = i, [A, O] = De.useState(!1), L = lr(s, c.ripple, c.rippleVisible, p && c.ripplePulsate), H = {
    width: h,
    height: h,
    top: -(h / 2) + g,
    left: -(h / 2) + y
  }, Y = lr(c.child, A && c.childLeaving, p && c.childPulsate);
  return !T && !A && O(!0), De.useEffect(() => {
    if (!T && w != null) {
      const B = setTimeout(w, _);
      return () => {
        clearTimeout(B);
      };
    }
  }, [w, T, _]), /* @__PURE__ */ Ae.jsx("span", {
    className: L,
    style: H,
    children: /* @__PURE__ */ Ae.jsx("span", {
      className: Y
    })
  });
}
process.env.NODE_ENV !== "production" && ($_.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object.isRequired,
  className: R.string,
  /**
   * @ignore - injected from TransitionGroup
   */
  in: R.bool,
  /**
   * @ignore - injected from TransitionGroup
   */
  onExited: R.func,
  /**
   * If `true`, the ripple pulsates, typically indicating the keyboard focus state of an element.
   */
  pulsate: R.bool,
  /**
   * Diameter of the ripple.
   */
  rippleSize: R.number,
  /**
   * Horizontal position of the ripple center.
   */
  rippleX: R.number,
  /**
   * Vertical position of the ripple center.
   */
  rippleY: R.number,
  /**
   * exit delay
   */
  timeout: R.number.isRequired
});
const ji = nl("MuiTouchRipple", ["root", "ripple", "rippleVisible", "ripplePulsate", "child", "childLeaving", "childPulsate"]), RE = 550, Rj = 80, _j = LE`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`, kj = LE`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`, Oj = LE`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`, Dj = La("span", {
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
}), Mj = La($_, {
  name: "MuiTouchRipple",
  slot: "Ripple"
})`
  opacity: 0;
  position: absolute;

  &.${ji.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${_j};
    animation-duration: ${RE}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  &.${ji.ripplePulsate} {
    animation-duration: ${({
  theme: i
}) => i.transitions.duration.shorter}ms;
  }

  & .${ji.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${ji.childLeaving} {
    opacity: 0;
    animation-name: ${kj};
    animation-duration: ${RE}ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
  }

  & .${ji.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Oj};
    animation-duration: 2500ms;
    animation-timing-function: ${({
  theme: i
}) => i.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`, V_ = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiTouchRipple"
  }), {
    center: y = !1,
    classes: g = {},
    className: h,
    ...T
  } = p, [w, _] = De.useState([]), A = De.useRef(0), O = De.useRef(null);
  De.useEffect(() => {
    O.current && (O.current(), O.current = null);
  }, [w]);
  const L = De.useRef(!1), H = sU(), Y = De.useRef(null), B = De.useRef(null), P = De.useCallback((J) => {
    const {
      pulsate: U,
      rippleX: de,
      rippleY: ie,
      rippleSize: Xe,
      cb: D
    } = J;
    _((ce) => [...ce, /* @__PURE__ */ Ae.jsx(Mj, {
      classes: {
        ripple: lr(g.ripple, ji.ripple),
        rippleVisible: lr(g.rippleVisible, ji.rippleVisible),
        ripplePulsate: lr(g.ripplePulsate, ji.ripplePulsate),
        child: lr(g.child, ji.child),
        childLeaving: lr(g.childLeaving, ji.childLeaving),
        childPulsate: lr(g.childPulsate, ji.childPulsate)
      },
      timeout: RE,
      pulsate: U,
      rippleX: de,
      rippleY: ie,
      rippleSize: Xe
    }, A.current)]), A.current += 1, O.current = D;
  }, [g]), se = De.useCallback((J = {}, U = {}, de = () => {
  }) => {
    const {
      pulsate: ie = !1,
      center: Xe = y || U.pulsate,
      fakeElement: D = !1
      // For test purposes
    } = U;
    if ((J == null ? void 0 : J.type) === "mousedown" && L.current) {
      L.current = !1;
      return;
    }
    (J == null ? void 0 : J.type) === "touchstart" && (L.current = !0);
    const ce = D ? null : B.current, _e = ce ? ce.getBoundingClientRect() : {
      width: 0,
      height: 0,
      left: 0,
      top: 0
    };
    let he, ve, Re;
    if (Xe || J === void 0 || J.clientX === 0 && J.clientY === 0 || !J.clientX && !J.touches)
      he = Math.round(_e.width / 2), ve = Math.round(_e.height / 2);
    else {
      const {
        clientX: it,
        clientY: Be
      } = J.touches && J.touches.length > 0 ? J.touches[0] : J;
      he = Math.round(it - _e.left), ve = Math.round(Be - _e.top);
    }
    if (Xe)
      Re = Math.sqrt((2 * _e.width ** 2 + _e.height ** 2) / 3), Re % 2 === 0 && (Re += 1);
    else {
      const it = Math.max(Math.abs((ce ? ce.clientWidth : 0) - he), he) * 2 + 2, Be = Math.max(Math.abs((ce ? ce.clientHeight : 0) - ve), ve) * 2 + 2;
      Re = Math.sqrt(it ** 2 + Be ** 2);
    }
    J != null && J.touches ? Y.current === null && (Y.current = () => {
      P({
        pulsate: ie,
        rippleX: he,
        rippleY: ve,
        rippleSize: Re,
        cb: de
      });
    }, H.start(Rj, () => {
      Y.current && (Y.current(), Y.current = null);
    })) : P({
      pulsate: ie,
      rippleX: he,
      rippleY: ve,
      rippleSize: Re,
      cb: de
    });
  }, [y, P, H]), ae = De.useCallback(() => {
    se({}, {
      pulsate: !0
    });
  }, [se]), I = De.useCallback((J, U) => {
    if (H.clear(), (J == null ? void 0 : J.type) === "touchend" && Y.current) {
      Y.current(), Y.current = null, H.start(0, () => {
        I(J, U);
      });
      return;
    }
    Y.current = null, _((de) => de.length > 0 ? de.slice(1) : de), O.current = U;
  }, [H]);
  return De.useImperativeHandle(c, () => ({
    pulsate: ae,
    start: se,
    stop: I
  }), [ae, se, I]), /* @__PURE__ */ Ae.jsx(Dj, {
    className: lr(ji.root, g.root, h),
    ref: B,
    ...T,
    children: /* @__PURE__ */ Ae.jsx(QE, {
      component: null,
      exit: !0,
      children: w
    })
  });
});
process.env.NODE_ENV !== "production" && (V_.propTypes = {
  /**
   * If `true`, the ripple starts at the center of the component
   * rather than at the point of interaction.
   */
  center: R.bool,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string
});
function Aj(i) {
  return $i("MuiButtonBase", i);
}
const Nj = nl("MuiButtonBase", ["root", "disabled", "focusVisible"]), Lj = (i) => {
  const {
    disabled: s,
    focusVisible: c,
    focusVisibleClassName: p,
    classes: y
  } = i, h = rl({
    root: ["root", s && "disabled", c && "focusVisible"]
  }, Aj, y);
  return c && p && (h.root += ` ${p}`), h;
}, zj = La("button", {
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
  [`&.${Nj.disabled}`]: {
    pointerEvents: "none",
    // Disable link interactions
    cursor: "default"
  },
  "@media print": {
    colorAdjust: "exact"
  }
}), KE = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiButtonBase"
  }), {
    action: y,
    centerRipple: g = !1,
    children: h,
    className: T,
    component: w = "button",
    disabled: _ = !1,
    disableRipple: A = !1,
    disableTouchRipple: O = !1,
    focusRipple: L = !1,
    focusVisibleClassName: H,
    LinkComponent: Y = "a",
    onBlur: B,
    onClick: P,
    onContextMenu: se,
    onDragLeave: ae,
    onFocus: I,
    onFocusVisible: J,
    onKeyDown: U,
    onKeyUp: de,
    onMouseDown: ie,
    onMouseLeave: Xe,
    onMouseUp: D,
    onTouchEnd: ce,
    onTouchMove: _e,
    onTouchStart: he,
    tabIndex: ve = 0,
    TouchRippleProps: Re,
    touchRippleRef: it,
    type: Be,
    ...Ct
  } = p, ge = De.useRef(null), ke = mj(), W = bR(ke.ref, it), [pe, Ne] = De.useState(!1);
  _ && pe && Ne(!1), De.useImperativeHandle(y, () => ({
    focusVisible: () => {
      Ne(!0), ge.current.focus();
    }
  }), []);
  const Ze = ke.shouldMount && !A && !_;
  De.useEffect(() => {
    pe && L && !A && ke.pulsate();
  }, [A, L, pe, ke]);
  function Fe(ne, $e, Et = O) {
    return Mg((vt) => ($e && $e(vt), Et || ke[ne](vt), !0));
  }
  const yt = Fe("start", ie), We = Fe("stop", se), ot = Fe("stop", ae), nt = Fe("stop", D), pt = Fe("stop", (ne) => {
    pe && ne.preventDefault(), Xe && Xe(ne);
  }), gt = Fe("start", he), Nt = Fe("stop", ce), xe = Fe("stop", _e), xt = Fe("stop", (ne) => {
    ER(ne.target) || Ne(!1), B && B(ne);
  }, !1), Le = Mg((ne) => {
    ge.current || (ge.current = ne.currentTarget), ER(ne.target) && (Ne(!0), J && J(ne)), I && I(ne);
  }), Gt = () => {
    const ne = ge.current;
    return w && w !== "button" && !(ne.tagName === "A" && ne.href);
  }, jt = Mg((ne) => {
    L && !ne.repeat && pe && ne.key === " " && ke.stop(ne, () => {
      ke.start(ne);
    }), ne.target === ne.currentTarget && Gt() && ne.key === " " && ne.preventDefault(), U && U(ne), ne.target === ne.currentTarget && Gt() && ne.key === "Enter" && !_ && (ne.preventDefault(), P && P(ne));
  }), rn = Mg((ne) => {
    L && ne.key === " " && pe && !ne.defaultPrevented && ke.stop(ne, () => {
      ke.pulsate(ne);
    }), de && de(ne), P && ne.target === ne.currentTarget && Gt() && ne.key === " " && !ne.defaultPrevented && P(ne);
  });
  let N = w;
  N === "button" && (Ct.href || Ct.to) && (N = Y);
  const G = {};
  N === "button" ? (G.type = Be === void 0 ? "button" : Be, G.disabled = _) : (!Ct.href && !Ct.to && (G.role = "button"), _ && (G["aria-disabled"] = _));
  const re = bR(c, ge), Oe = {
    ...p,
    centerRipple: g,
    component: w,
    disabled: _,
    disableRipple: A,
    disableTouchRipple: O,
    focusRipple: L,
    tabIndex: ve,
    focusVisible: pe
  }, Te = Lj(Oe);
  return /* @__PURE__ */ Ae.jsxs(zj, {
    as: N,
    className: lr(Te.root, T),
    ownerState: Oe,
    onBlur: xt,
    onClick: P,
    onContextMenu: We,
    onFocus: Le,
    onKeyDown: jt,
    onKeyUp: rn,
    onMouseDown: yt,
    onMouseLeave: pt,
    onMouseUp: nt,
    onDragLeave: ot,
    onTouchEnd: Nt,
    onTouchMove: xe,
    onTouchStart: gt,
    ref: re,
    tabIndex: _ ? -1 : ve,
    type: Be,
    ...G,
    ...Ct,
    children: [h, Ze ? /* @__PURE__ */ Ae.jsx(V_, {
      ref: W,
      center: g,
      ...Re
    }) : null]
  });
});
process.env.NODE_ENV !== "production" && (KE.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports `focusVisible()` action.
   */
  action: iU,
  /**
   * If `true`, the ripples are centered.
   * They won't start at the cursor interaction position.
   * @default false
   */
  centerRipple: R.bool,
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: rU,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: R.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: R.bool,
  /**
   * If `true`, the touch ripple effect is disabled.
   * @default false
   */
  disableTouchRipple: R.bool,
  /**
   * If `true`, the base button will have a keyboard focus ripple.
   * @default false
   */
  focusRipple: R.bool,
  /**
   * This prop can help identify which element has keyboard focus.
   * The class name will be applied when the element gains the focus through keyboard interaction.
   * It's a polyfill for the [CSS :focus-visible selector](https://drafts.csswg.org/selectors-4/#the-focus-visible-pseudo).
   * The rationale for using this feature [is explained here](https://github.com/WICG/focus-visible/blob/HEAD/explainer.md).
   * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
   * if needed.
   */
  focusVisibleClassName: R.string,
  /**
   * @ignore
   */
  href: R.any,
  /**
   * The component used to render a link when the `href` prop is provided.
   * @default 'a'
   */
  LinkComponent: R.elementType,
  /**
   * @ignore
   */
  onBlur: R.func,
  /**
   * @ignore
   */
  onClick: R.func,
  /**
   * @ignore
   */
  onContextMenu: R.func,
  /**
   * @ignore
   */
  onDragLeave: R.func,
  /**
   * @ignore
   */
  onFocus: R.func,
  /**
   * Callback fired when the component is focused with a keyboard.
   * We trigger a `onFocus` callback too.
   */
  onFocusVisible: R.func,
  /**
   * @ignore
   */
  onKeyDown: R.func,
  /**
   * @ignore
   */
  onKeyUp: R.func,
  /**
   * @ignore
   */
  onMouseDown: R.func,
  /**
   * @ignore
   */
  onMouseLeave: R.func,
  /**
   * @ignore
   */
  onMouseUp: R.func,
  /**
   * @ignore
   */
  onTouchEnd: R.func,
  /**
   * @ignore
   */
  onTouchMove: R.func,
  /**
   * @ignore
   */
  onTouchStart: R.func,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object]),
  /**
   * @default 0
   */
  tabIndex: R.number,
  /**
   * Props applied to the `TouchRipple` element.
   */
  TouchRippleProps: R.object,
  /**
   * A ref that points to the `TouchRipple` element.
   */
  touchRippleRef: R.oneOfType([R.func, R.shape({
    current: R.shape({
      pulsate: R.func.isRequired,
      start: R.func.isRequired,
      stop: R.func.isRequired
    })
  })]),
  /**
   * @ignore
   */
  type: R.oneOfType([R.oneOf(["button", "reset", "submit"]), R.string])
});
function Uj(i) {
  return typeof i.main == "string";
}
function jj(i, s = []) {
  if (!Uj(i))
    return !1;
  for (const c of s)
    if (!i.hasOwnProperty(c) || typeof i[c] != "string")
      return !1;
  return !0;
}
function B_(i = []) {
  return ([, s]) => s && jj(s, i);
}
function Pj(i) {
  return $i("MuiButton", i);
}
const kd = nl("MuiButton", ["root", "text", "textInherit", "textPrimary", "textSecondary", "textSuccess", "textError", "textInfo", "textWarning", "outlined", "outlinedInherit", "outlinedPrimary", "outlinedSecondary", "outlinedSuccess", "outlinedError", "outlinedInfo", "outlinedWarning", "contained", "containedInherit", "containedPrimary", "containedSecondary", "containedSuccess", "containedError", "containedInfo", "containedWarning", "disableElevation", "focusVisible", "disabled", "colorInherit", "colorPrimary", "colorSecondary", "colorSuccess", "colorError", "colorInfo", "colorWarning", "textSizeSmall", "textSizeMedium", "textSizeLarge", "outlinedSizeSmall", "outlinedSizeMedium", "outlinedSizeLarge", "containedSizeSmall", "containedSizeMedium", "containedSizeLarge", "sizeMedium", "sizeSmall", "sizeLarge", "fullWidth", "startIcon", "endIcon", "icon", "iconSizeSmall", "iconSizeMedium", "iconSizeLarge"]), H_ = /* @__PURE__ */ De.createContext({});
process.env.NODE_ENV !== "production" && (H_.displayName = "ButtonGroupContext");
const I_ = /* @__PURE__ */ De.createContext(void 0);
process.env.NODE_ENV !== "production" && (I_.displayName = "ButtonGroupButtonContext");
const Fj = (i) => {
  const {
    color: s,
    disableElevation: c,
    fullWidth: p,
    size: y,
    variant: g,
    classes: h
  } = i, T = {
    root: ["root", g, `${g}${Kr(s)}`, `size${Kr(y)}`, `${g}Size${Kr(y)}`, `color${Kr(s)}`, c && "disableElevation", p && "fullWidth"],
    label: ["label"],
    startIcon: ["icon", "startIcon", `iconSize${Kr(y)}`],
    endIcon: ["icon", "endIcon", `iconSize${Kr(y)}`]
  }, w = rl(T, Pj, h);
  return {
    ...h,
    // forward the focused, disabled, etc. classes to the ButtonBase
    ...w
  };
}, Y_ = [{
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
}], $j = La(KE, {
  shouldForwardProp: (i) => U_(i) || i === "classes",
  name: "MuiButton",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, s[c.variant], s[`${c.variant}${Kr(c.color)}`], s[`size${Kr(c.size)}`], s[`${c.variant}Size${Kr(c.size)}`], c.color === "inherit" && s.colorInherit, c.disableElevation && s.disableElevation, c.fullWidth && s.fullWidth];
  }
})(hh(({
  theme: i
}) => {
  var p, y;
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
    [`&.${kd.disabled}`]: {
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
        [`&.${kd.focusVisible}`]: {
          boxShadow: (i.vars || i).shadows[6]
        },
        [`&.${kd.disabled}`]: {
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
        [`&.${kd.disabled}`]: {
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
    }, ...Object.entries(i.palette).filter(B_(["dark", "contrastText"])).map(([g]) => ({
      props: {
        color: g
      },
      style: {
        "--variant-textColor": (i.vars || i).palette[g].main,
        "--variant-outlinedColor": (i.vars || i).palette[g].main,
        "--variant-outlinedBorder": i.vars ? `rgba(${i.vars.palette[g].mainChannel} / 0.5)` : os(i.palette[g].main, 0.5),
        "--variant-containedColor": (i.vars || i).palette[g].contrastText,
        "--variant-containedBg": (i.vars || i).palette[g].main,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": (i.vars || i).palette[g].dark,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette[g].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : os(i.palette[g].main, i.palette.action.hoverOpacity),
            "--variant-outlinedBorder": (i.vars || i).palette[g].main,
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette[g].mainChannel} / ${i.vars.palette.action.hoverOpacity})` : os(i.palette[g].main, i.palette.action.hoverOpacity)
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
        ) : (y = (p = i.palette).getContrastText) == null ? void 0 : y.call(p, s),
        "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedBg : s,
        "@media (hover: hover)": {
          "&:hover": {
            "--variant-containedBg": i.vars ? i.vars.palette.Button.inheritContainedHoverBg : c,
            "--variant-textBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : os(i.palette.text.primary, i.palette.action.hoverOpacity),
            "--variant-outlinedBg": i.vars ? `rgba(${i.vars.palette.text.primaryChannel} / ${i.vars.palette.action.hoverOpacity})` : os(i.palette.text.primary, i.palette.action.hoverOpacity)
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
        [`&.${kd.focusVisible}`]: {
          boxShadow: "none"
        },
        "&:active": {
          boxShadow: "none"
        },
        [`&.${kd.disabled}`]: {
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
})), Vj = La("span", {
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
  }, ...Y_]
}), Bj = La("span", {
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
  }, ...Y_]
}), rh = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = De.useContext(H_), y = De.useContext(I_), g = sh(p, s), h = yo({
    props: g,
    name: "MuiButton"
  }), {
    children: T,
    color: w = "primary",
    component: _ = "button",
    className: A,
    disabled: O = !1,
    disableElevation: L = !1,
    disableFocusRipple: H = !1,
    endIcon: Y,
    focusVisibleClassName: B,
    fullWidth: P = !1,
    size: se = "medium",
    startIcon: ae,
    type: I,
    variant: J = "text",
    ...U
  } = h, de = {
    ...h,
    color: w,
    component: _,
    disabled: O,
    disableElevation: L,
    disableFocusRipple: H,
    fullWidth: P,
    size: se,
    type: I,
    variant: J
  }, ie = Fj(de), Xe = ae && /* @__PURE__ */ Ae.jsx(Vj, {
    className: ie.startIcon,
    ownerState: de,
    children: ae
  }), D = Y && /* @__PURE__ */ Ae.jsx(Bj, {
    className: ie.endIcon,
    ownerState: de,
    children: Y
  }), ce = y || "";
  return /* @__PURE__ */ Ae.jsxs($j, {
    ownerState: de,
    className: lr(p.className, ie.root, A, ce),
    component: _,
    disabled: O,
    focusRipple: !H,
    focusVisibleClassName: lr(ie.focusVisible, B),
    ref: c,
    type: I,
    ...U,
    classes: ie,
    children: [Xe, T, D]
  });
});
process.env.NODE_ENV !== "production" && (rh.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * @default 'primary'
   */
  color: R.oneOfType([R.oneOf(["inherit", "primary", "secondary", "success", "error", "info", "warning"]), R.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled: R.bool,
  /**
   * If `true`, no elevation is used.
   * @default false
   */
  disableElevation: R.bool,
  /**
   * If `true`, the  keyboard focus ripple is disabled.
   * @default false
   */
  disableFocusRipple: R.bool,
  /**
   * If `true`, the ripple effect is disabled.
   *
   * ⚠️ Without a ripple there is no styling for :focus-visible by default. Be sure
   * to highlight the element by applying separate styles with the `.Mui-focusVisible` class.
   * @default false
   */
  disableRipple: R.bool,
  /**
   * Element placed after the children.
   */
  endIcon: R.node,
  /**
   * @ignore
   */
  focusVisibleClassName: R.string,
  /**
   * If `true`, the button will take up the full width of its container.
   * @default false
   */
  fullWidth: R.bool,
  /**
   * The URL to link to when the button is clicked.
   * If defined, an `a` element will be used as the root node.
   */
  href: R.string,
  /**
   * The size of the component.
   * `small` is equivalent to the dense button styling.
   * @default 'medium'
   */
  size: R.oneOfType([R.oneOf(["small", "medium", "large"]), R.string]),
  /**
   * Element placed before the children.
   */
  startIcon: R.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object]),
  /**
   * @ignore
   */
  type: R.oneOfType([R.oneOf(["button", "reset", "submit"]), R.string]),
  /**
   * The variant to use.
   * @default 'text'
   */
  variant: R.oneOfType([R.oneOf(["contained", "outlined", "text"]), R.string])
});
function zR({
  theme: i,
  ...s
}) {
  const c = tl in i ? i[tl] : void 0;
  return /* @__PURE__ */ Ae.jsx(ch, {
    ...s,
    themeId: c ? tl : void 0,
    theme: c || i
  });
}
const Ag = {
  attribute: "data-mui-color-scheme",
  colorSchemeStorageKey: "mui-color-scheme",
  defaultLightColorScheme: "light",
  defaultDarkColorScheme: "dark",
  modeStorageKey: "mui-mode"
}, {
  CssVarsProvider: Hj,
  useColorScheme: l3,
  getInitColorSchemeScript: u3
} = TU({
  themeId: tl,
  // @ts-ignore ignore module augmentation tests
  theme: () => GE({
    cssVariables: !0
  }),
  colorSchemeStorageKey: Ag.colorSchemeStorageKey,
  modeStorageKey: Ag.modeStorageKey,
  defaultColorScheme: {
    light: Ag.defaultLightColorScheme,
    dark: Ag.defaultDarkColorScheme
  },
  resolveTheme: (i) => {
    const s = {
      ...i,
      typography: N_(i.palette, i.typography)
    };
    return s.unstable_sx = function(p) {
      return Ud({
        sx: p,
        theme: this
      });
    }, s;
  }
}), Ij = Hj;
function Yj({
  theme: i,
  ...s
}) {
  return typeof i == "function" ? /* @__PURE__ */ Ae.jsx(zR, {
    theme: i,
    ...s
  }) : "colorSchemes" in (tl in i ? i[tl] : i) ? /* @__PURE__ */ Ae.jsx(Ij, {
    theme: i,
    ...s
  }) : /* @__PURE__ */ Ae.jsx(zR, {
    theme: i,
    ...s
  });
}
const Wj = GE({
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
function Gj(i) {
  return $i("MuiPaper", i);
}
nl("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const qj = (i) => {
  const {
    square: s,
    elevation: c,
    variant: p,
    classes: y
  } = i, g = {
    root: ["root", p, !s && "rounded", p === "elevation" && `elevation${c}`]
  };
  return rl(g, Gj, y);
}, Qj = La("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, s[c.variant], !c.square && s.rounded, c.variant === "elevation" && s[`elevation${c.elevation}`]];
  }
})(hh(({
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
}))), W_ = /* @__PURE__ */ De.forwardRef(function(s, c) {
  var H;
  const p = yo({
    props: s,
    name: "MuiPaper"
  }), y = vj(), {
    className: g,
    component: h = "div",
    elevation: T = 1,
    square: w = !1,
    variant: _ = "elevation",
    ...A
  } = p, O = {
    ...p,
    component: h,
    elevation: T,
    square: w,
    variant: _
  }, L = qj(O);
  return process.env.NODE_ENV !== "production" && y.shadows[T] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${T}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${T}]\` is defined.`].join(`
`)), /* @__PURE__ */ Ae.jsx(Qj, {
    as: h,
    ownerState: O,
    className: lr(L.root, g),
    ref: c,
    ...A,
    style: {
      ..._ === "elevation" && {
        "--Paper-shadow": (y.vars || y).shadows[T],
        ...y.vars && {
          "--Paper-overlay": (H = y.vars.overlays) == null ? void 0 : H[T]
        },
        ...!y.vars && y.palette.mode === "dark" && {
          "--Paper-overlay": `linear-gradient(${os("#fff", xE(T))}, ${os("#fff", xE(T))})`
        }
      },
      ...A.style
    }
  });
});
process.env.NODE_ENV !== "production" && (W_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: v0(fU, (i) => {
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
  square: R.bool,
  /**
   * @ignore
   */
  style: R.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: R.oneOfType([R.oneOf(["elevation", "outlined"]), R.string])
});
function Kj(i) {
  return $i("MuiTypography", i);
}
nl("MuiTypography", ["root", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "body1", "body2", "inherit", "button", "caption", "overline", "alignLeft", "alignRight", "alignCenter", "alignJustify", "noWrap", "gutterBottom", "paragraph"]);
const Xj = {
  primary: !0,
  secondary: !0,
  error: !0,
  info: !0,
  success: !0,
  warning: !0,
  textPrimary: !0,
  textSecondary: !0,
  textDisabled: !0
}, Zj = hj(), Jj = (i) => {
  const {
    align: s,
    gutterBottom: c,
    noWrap: p,
    paragraph: y,
    variant: g,
    classes: h
  } = i, T = {
    root: ["root", g, i.align !== "inherit" && `align${Kr(s)}`, c && "gutterBottom", p && "noWrap", y && "paragraph"]
  };
  return rl(T, Kj, h);
}, eP = La("span", {
  name: "MuiTypography",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i;
    return [s.root, c.variant && s[c.variant], c.align !== "inherit" && s[`align${Kr(c.align)}`], c.noWrap && s.noWrap, c.gutterBottom && s.gutterBottom, c.paragraph && s.paragraph];
  }
})(hh(({
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
    }, ...Object.entries(i.typography).filter(([c, p]) => c !== "inherit" && p && typeof p == "object").map(([c, p]) => ({
      props: {
        variant: c
      },
      style: p
    })), ...Object.entries(i.palette).filter(B_()).map(([c]) => ({
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
})), UR = {
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
}, Gg = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const {
    color: p,
    ...y
  } = yo({
    props: s,
    name: "MuiTypography"
  }), g = !Xj[p], h = Zj({
    ...y,
    ...g && {
      color: p
    }
  }), {
    align: T = "inherit",
    className: w,
    component: _,
    gutterBottom: A = !1,
    noWrap: O = !1,
    paragraph: L = !1,
    variant: H = "body1",
    variantMapping: Y = UR,
    ...B
  } = h, P = {
    ...h,
    align: T,
    color: p,
    className: w,
    component: _,
    gutterBottom: A,
    noWrap: O,
    paragraph: L,
    variant: H,
    variantMapping: Y
  }, se = _ || (L ? "p" : Y[H] || UR[H]) || "span", ae = Jj(P);
  return /* @__PURE__ */ Ae.jsx(eP, {
    as: se,
    ref: c,
    className: lr(ae.root, w),
    ...B,
    ownerState: P,
    style: {
      ...T !== "inherit" && {
        "--Typography-textAlign": T
      },
      ...B.style
    }
  });
});
process.env.NODE_ENV !== "production" && (Gg.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Set the text-align on the component.
   * @default 'inherit'
   */
  align: R.oneOf(["center", "inherit", "justify", "left", "right"]),
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   */
  color: R.oneOfType([R.oneOf(["primary", "secondary", "success", "error", "info", "warning", "textPrimary", "textSecondary", "textDisabled"]), R.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * If `true`, the text will have a bottom margin.
   * @default false
   */
  gutterBottom: R.bool,
  /**
   * If `true`, the text will not wrap, but instead will truncate with a text overflow ellipsis.
   *
   * Note that text overflow can only happen with block or inline-block level elements
   * (the element needs to have a width in order to overflow).
   * @default false
   */
  noWrap: R.bool,
  /**
   * If `true`, the element will be a paragraph element.
   * @default false
   * @deprecated Use the `component` prop instead. This prop will be removed in v7. See [Migrating from deprecated APIs](https://mui.com/material-ui/migration/migrating-from-deprecated-apis/) for more details.
   */
  paragraph: R.bool,
  /**
   * @ignore
   */
  style: R.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object]),
  /**
   * Applies the theme typography styles.
   * @default 'body1'
   */
  variant: R.oneOfType([R.oneOf(["body1", "body2", "button", "caption", "h1", "h2", "h3", "h4", "h5", "h6", "inherit", "overline", "subtitle1", "subtitle2"]), R.string]),
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
  variantMapping: R.object
});
function tP(i) {
  return $i("MuiCard", i);
}
nl("MuiCard", ["root"]);
const nP = (i) => {
  const {
    classes: s
  } = i;
  return rl({
    root: ["root"]
  }, tP, s);
}, rP = La(W_, {
  name: "MuiCard",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})({
  overflow: "hidden"
}), XE = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiCard"
  }), {
    className: y,
    raised: g = !1,
    ...h
  } = p, T = {
    ...p,
    raised: g
  }, w = nP(T);
  return /* @__PURE__ */ Ae.jsx(rP, {
    className: lr(w.root, y),
    elevation: g ? 8 : void 0,
    ref: c,
    ownerState: T,
    ...h
  });
});
process.env.NODE_ENV !== "production" && (XE.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * If `true`, the card will use raised styling.
   * @default false
   */
  raised: v0(R.bool, (i) => i.raised && i.variant === "outlined" ? new Error('MUI: Combining `raised={true}` with `variant="outlined"` has no effect.') : null),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
});
function aP(i) {
  return $i("MuiCardActionArea", i);
}
const uE = nl("MuiCardActionArea", ["root", "focusVisible", "focusHighlight"]), iP = (i) => {
  const {
    classes: s
  } = i;
  return rl({
    root: ["root"],
    focusHighlight: ["focusHighlight"]
  }, aP, s);
}, oP = La(KE, {
  name: "MuiCardActionArea",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})(hh(({
  theme: i
}) => ({
  display: "block",
  textAlign: "inherit",
  borderRadius: "inherit",
  // for Safari to work https://github.com/mui/material-ui/issues/36285.
  width: "100%",
  [`&:hover .${uE.focusHighlight}`]: {
    opacity: (i.vars || i).palette.action.hoverOpacity,
    "@media (hover: none)": {
      opacity: 0
    }
  },
  [`&.${uE.focusVisible} .${uE.focusHighlight}`]: {
    opacity: (i.vars || i).palette.action.focusOpacity
  }
}))), lP = La("span", {
  name: "MuiCardActionArea",
  slot: "FocusHighlight",
  overridesResolver: (i, s) => s.focusHighlight
})(hh(({
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
}))), ZE = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiCardActionArea"
  }), {
    children: y,
    className: g,
    focusVisibleClassName: h,
    ...T
  } = p, w = p, _ = iP(w);
  return /* @__PURE__ */ Ae.jsxs(oP, {
    className: lr(_.root, g),
    focusVisibleClassName: lr(h, _.focusVisible),
    ref: c,
    ownerState: w,
    ...T,
    children: [y, /* @__PURE__ */ Ae.jsx(lP, {
      className: _.focusHighlight,
      ownerState: w
    })]
  });
});
process.env.NODE_ENV !== "production" && (ZE.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * @ignore
   */
  focusVisibleClassName: R.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
});
function uP(i) {
  return $i("MuiCardActions", i);
}
nl("MuiCardActions", ["root", "spacing"]);
const sP = (i) => {
  const {
    classes: s,
    disableSpacing: c
  } = i;
  return rl({
    root: ["root", !c && "spacing"]
  }, uP, s);
}, cP = La("div", {
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
}), G_ = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiCardActions"
  }), {
    disableSpacing: y = !1,
    className: g,
    ...h
  } = p, T = {
    ...p,
    disableSpacing: y
  }, w = sP(T);
  return /* @__PURE__ */ Ae.jsx(cP, {
    className: lr(w.root, g),
    ownerState: T,
    ref: c,
    ...h
  });
});
process.env.NODE_ENV !== "production" && (G_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * If `true`, the actions do not have additional margin.
   * @default false
   */
  disableSpacing: R.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
});
function fP(i) {
  return $i("MuiCardContent", i);
}
nl("MuiCardContent", ["root"]);
const dP = (i) => {
  const {
    classes: s
  } = i;
  return rl({
    root: ["root"]
  }, fP, s);
}, pP = La("div", {
  name: "MuiCardContent",
  slot: "Root",
  overridesResolver: (i, s) => s.root
})({
  padding: 16,
  "&:last-child": {
    paddingBottom: 24
  }
}), JE = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiCardContent"
  }), {
    className: y,
    component: g = "div",
    ...h
  } = p, T = {
    ...p,
    component: g
  }, w = dP(T);
  return /* @__PURE__ */ Ae.jsx(pP, {
    as: g,
    className: lr(w.root, y),
    ownerState: T,
    ref: c,
    ...h
  });
});
process.env.NODE_ENV !== "production" && (JE.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: R.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
});
function vP(i) {
  return $i("MuiCardMedia", i);
}
nl("MuiCardMedia", ["root", "media", "img"]);
const hP = (i) => {
  const {
    classes: s,
    isMediaComponent: c,
    isImageComponent: p
  } = i;
  return rl({
    root: ["root", c && "media", p && "img"]
  }, vP, s);
}, mP = La("div", {
  name: "MuiCardMedia",
  slot: "Root",
  overridesResolver: (i, s) => {
    const {
      ownerState: c
    } = i, {
      isMediaComponent: p,
      isImageComponent: y
    } = c;
    return [s.root, p && s.media, y && s.img];
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
}), yP = ["video", "audio", "picture", "iframe", "img"], gP = ["picture", "img"], q_ = /* @__PURE__ */ De.forwardRef(function(s, c) {
  const p = yo({
    props: s,
    name: "MuiCardMedia"
  }), {
    children: y,
    className: g,
    component: h = "div",
    image: T,
    src: w,
    style: _,
    ...A
  } = p, O = yP.includes(h), L = !O && T ? {
    backgroundImage: `url("${T}")`,
    ..._
  } : _, H = {
    ...p,
    component: h,
    isMediaComponent: O,
    isImageComponent: gP.includes(h)
  }, Y = hP(H);
  return /* @__PURE__ */ Ae.jsx(mP, {
    className: lr(Y.root, g),
    as: h,
    role: !O && T ? "img" : void 0,
    ref: c,
    style: L,
    ownerState: H,
    src: O ? T || w : void 0,
    ...A,
    children: y
  });
});
process.env.NODE_ENV !== "production" && (q_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: v0(R.node, (i) => !i.children && !i.image && !i.src && !i.component ? new Error("MUI: Either `children`, `image`, `src` or `component` prop must be specified.") : null),
  /**
   * Override or extend the styles applied to the component.
   */
  classes: R.object,
  /**
   * @ignore
   */
  className: R.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: R.elementType,
  /**
   * Image to be displayed as a background image.
   * Either `image` or `src` prop must be specified.
   * Note that caller must specify height otherwise the image will not be visible.
   */
  image: R.string,
  /**
   * An alias for `image` property.
   * Available only with media components.
   * Media components: `video`, `audio`, `picture`, `iframe`, `img`.
   */
  src: R.string,
  /**
   * @ignore
   */
  style: R.object,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: R.oneOfType([R.arrayOf(R.oneOfType([R.func, R.object, R.bool])), R.func, R.object])
});
const _E = typeof F_({}) == "function", SP = (i, s) => ({
  WebkitFontSmoothing: "antialiased",
  // Antialiasing.
  MozOsxFontSmoothing: "grayscale",
  // Antialiasing.
  // Change from `box-sizing: content-box` so that `width`
  // is not affected by `padding` or `border`.
  boxSizing: "border-box",
  // Fix font resize problem in iOS
  WebkitTextSizeAdjust: "100%",
  // When used under CssVarsProvider, colorScheme should not be applied dynamically because it will generate the stylesheet twice for server-rendered applications.
  ...s && !i.vars && {
    colorScheme: i.palette.mode
  }
}), bP = (i) => ({
  color: (i.vars || i).palette.text.primary,
  ...i.typography.body1,
  backgroundColor: (i.vars || i).palette.background.default,
  "@media print": {
    // Save printer ink.
    backgroundColor: (i.vars || i).palette.common.white
  }
}), Q_ = (i, s = !1) => {
  var g, h;
  const c = {};
  s && i.colorSchemes && typeof i.getColorSchemeSelector == "function" && Object.entries(i.colorSchemes).forEach(([T, w]) => {
    var A, O;
    const _ = i.getColorSchemeSelector(T);
    _.startsWith("@") ? c[_] = {
      ":root": {
        colorScheme: (A = w.palette) == null ? void 0 : A.mode
      }
    } : c[_.replace(/\s*&/, "")] = {
      colorScheme: (O = w.palette) == null ? void 0 : O.mode
    };
  });
  let p = {
    html: SP(i, s),
    "*, *::before, *::after": {
      boxSizing: "inherit"
    },
    "strong, b": {
      fontWeight: i.typography.fontWeightBold
    },
    body: {
      margin: 0,
      // Remove the margin in all browsers.
      ...bP(i),
      // Add support for document.body.requestFullScreen().
      // Other elements, if background transparent, are not supported.
      "&::backdrop": {
        backgroundColor: (i.vars || i).palette.background.default
      }
    },
    ...c
  };
  const y = (h = (g = i.components) == null ? void 0 : g.MuiCssBaseline) == null ? void 0 : h.styleOverrides;
  return y && (p = [p, y]), p;
}, $g = "mui-ecs", CP = (i) => {
  const s = Q_(i, !1), c = Array.isArray(s) ? s[0] : s;
  return !i.vars && c && (c.html[`:root:has(${$g})`] = {
    colorScheme: i.palette.mode
  }), i.colorSchemes && Object.entries(i.colorSchemes).forEach(([p, y]) => {
    var h, T;
    const g = i.getColorSchemeSelector(p);
    g.startsWith("@") ? c[g] = {
      [`:root:not(:has(.${$g}))`]: {
        colorScheme: (h = y.palette) == null ? void 0 : h.mode
      }
    } : c[g.replace(/\s*&/, "")] = {
      [`&:not(:has(.${$g}))`]: {
        colorScheme: (T = y.palette) == null ? void 0 : T.mode
      }
    };
  }), s;
}, EP = F_(_E ? ({
  theme: i,
  enableColorScheme: s
}) => Q_(i, s) : ({
  theme: i
}) => CP(i));
function K_(i) {
  const s = yo({
    props: i,
    name: "MuiCssBaseline"
  }), {
    children: c,
    enableColorScheme: p = !1
  } = s;
  return /* @__PURE__ */ Ae.jsxs(De.Fragment, {
    children: [_E && /* @__PURE__ */ Ae.jsx(EP, {
      enableColorScheme: p
    }), !_E && !p && /* @__PURE__ */ Ae.jsx("span", {
      className: $g,
      style: {
        display: "none"
      }
    }), c]
  });
}
process.env.NODE_ENV !== "production" && (K_.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * You can wrap a node.
   */
  children: R.node,
  /**
   * Enable `color-scheme` CSS property to use `theme.palette.mode`.
   * For more details, check out https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme
   * For browser support, check out https://caniuse.com/?search=color-scheme
   * @default false
   */
  enableColorScheme: R.bool
});
const TP = ({ children: i }) => /* @__PURE__ */ Ae.jsxs(Yj, { theme: Wj, children: [
  /* @__PURE__ */ Ae.jsx(K_, {}),
  i
] }), xP = () => /* @__PURE__ */ Ae.jsx(TP, { children: /* @__PURE__ */ Ae.jsxs(j_, { spacing: 2, direction: "row", children: [
  /* @__PURE__ */ Ae.jsx(rh, { variant: "text", children: "Text" }),
  /* @__PURE__ */ Ae.jsx(rh, { variant: "contained", children: "Contained" }),
  /* @__PURE__ */ Ae.jsx(rh, { variant: "outlined", children: "Outlined" })
] }) });
var mh = (i) => i.type === "checkbox", Dd = (i) => i instanceof Date, Aa = (i) => i == null;
const X_ = (i) => typeof i == "object";
var Sr = (i) => !Aa(i) && !Array.isArray(i) && X_(i) && !Dd(i), wP = (i) => Sr(i) && i.target ? mh(i.target) ? i.target.checked : i.target.value : i, RP = (i) => i.substring(0, i.search(/\.\d+(\.|$)/)) || i, _P = (i, s) => i.has(RP(s)), kP = (i) => {
  const s = i.constructor && i.constructor.prototype;
  return Sr(s) && s.hasOwnProperty("isPrototypeOf");
}, e1 = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function gi(i) {
  let s;
  const c = Array.isArray(i);
  if (i instanceof Date)
    s = new Date(i);
  else if (i instanceof Set)
    s = new Set(i);
  else if (!(e1 && (i instanceof Blob || i instanceof FileList)) && (c || Sr(i)))
    if (s = c ? [] : {}, !c && !kP(i))
      s = i;
    else
      for (const p in i)
        i.hasOwnProperty(p) && (s[p] = gi(i[p]));
  else
    return i;
  return s;
}
var m0 = (i) => Array.isArray(i) ? i.filter(Boolean) : [], or = (i) => i === void 0, et = (i, s, c) => {
  if (!s || !Sr(i))
    return c;
  const p = m0(s.split(/[,[\].]+?/)).reduce((y, g) => Aa(y) ? y : y[g], i);
  return or(p) || p === i ? or(i[s]) ? c : i[s] : p;
}, Qo = (i) => typeof i == "boolean", t1 = (i) => /^\w*$/.test(i), Z_ = (i) => m0(i.replace(/["|']|\]/g, "").split(/\.|\[/)), Ln = (i, s, c) => {
  let p = -1;
  const y = t1(s) ? [s] : Z_(s), g = y.length, h = g - 1;
  for (; ++p < g; ) {
    const T = y[p];
    let w = c;
    if (p !== h) {
      const _ = i[T];
      w = Sr(_) || Array.isArray(_) ? _ : isNaN(+y[p + 1]) ? {} : [];
    }
    if (T === "__proto__")
      return;
    i[T] = w, i = i[T];
  }
  return i;
};
const jR = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, ho = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, ql = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, OP = Rn.createContext(null), DP = () => Rn.useContext(OP);
var MP = (i, s, c, p = !0) => {
  const y = {
    defaultValues: s._defaultValues
  };
  for (const g in i)
    Object.defineProperty(y, g, {
      get: () => {
        const h = g;
        return s._proxyFormState[h] !== ho.all && (s._proxyFormState[h] = !p || ho.all), i[h];
      }
    });
  return y;
}, ii = (i) => Sr(i) && !Object.keys(i).length, AP = (i, s, c, p) => {
  c(i);
  const { name: y, ...g } = i;
  return ii(g) || Object.keys(g).length >= Object.keys(s).length || Object.keys(g).find((h) => s[h] === ho.all);
}, ah = (i) => Array.isArray(i) ? i : [i], NP = (i, s, c) => !i || !s || i === s || ah(i).some((p) => p && (c ? p === s : p.startsWith(s) || s.startsWith(p)));
function J_(i) {
  const s = Rn.useRef(i);
  s.current = i, Rn.useEffect(() => {
    const c = !i.disabled && s.current.subject && s.current.subject.subscribe({
      next: s.current.next
    });
    return () => {
      c && c.unsubscribe();
    };
  }, [i.disabled]);
}
var Jo = (i) => typeof i == "string", ek = (i, s, c, p, y) => Jo(i) ? (p && s.watch.add(i), et(c, i, y)) : Array.isArray(i) ? i.map((g) => (p && s.watch.add(g), et(c, g))) : (p && (s.watchAll = !0), c);
function LP(i) {
  const s = DP(), { control: c = s.control, name: p, defaultValue: y, disabled: g, exact: h } = i || {}, T = Rn.useRef(p);
  T.current = p, J_({
    disabled: g,
    subject: c._subjects.values,
    next: (A) => {
      NP(T.current, A.name, h) && _(gi(ek(T.current, c._names, A.values || c._formValues, !1, y)));
    }
  });
  const [w, _] = Rn.useState(c._getWatch(p, y));
  return Rn.useEffect(() => c._removeUnmounted()), w;
}
var zP = (i, s, c, p, y) => s ? {
  ...c[i],
  types: {
    ...c[i] && c[i].types ? c[i].types : {},
    [p]: y || !0
  }
} : {}, PR = (i) => ({
  isOnSubmit: !i || i === ho.onSubmit,
  isOnBlur: i === ho.onBlur,
  isOnChange: i === ho.onChange,
  isOnAll: i === ho.all,
  isOnTouch: i === ho.onTouched
}), FR = (i, s, c) => !c && (s.watchAll || s.watch.has(i) || [...s.watch].some((p) => i.startsWith(p) && /^\.\w+/.test(i.slice(p.length))));
const ih = (i, s, c, p) => {
  for (const y of c || Object.keys(i)) {
    const g = et(i, y);
    if (g) {
      const { _f: h, ...T } = g;
      if (h) {
        if (h.refs && h.refs[0] && s(h.refs[0], y) && !p)
          return !0;
        if (h.ref && s(h.ref, h.name) && !p)
          return !0;
        if (ih(T, s))
          break;
      } else if (Sr(T) && ih(T, s))
        break;
    }
  }
};
var UP = (i, s, c) => {
  const p = ah(et(i, c));
  return Ln(p, "root", s[c]), Ln(i, c, p), i;
}, n1 = (i) => i.type === "file", Ql = (i) => typeof i == "function", qg = (i) => {
  if (!e1)
    return !1;
  const s = i ? i.ownerDocument : 0;
  return i instanceof (s && s.defaultView ? s.defaultView.HTMLElement : HTMLElement);
}, Vg = (i) => Jo(i), r1 = (i) => i.type === "radio", Qg = (i) => i instanceof RegExp;
const $R = {
  value: !1,
  isValid: !1
}, VR = { value: !0, isValid: !0 };
var tk = (i) => {
  if (Array.isArray(i)) {
    if (i.length > 1) {
      const s = i.filter((c) => c && c.checked && !c.disabled).map((c) => c.value);
      return { value: s, isValid: !!s.length };
    }
    return i[0].checked && !i[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      i[0].attributes && !or(i[0].attributes.value) ? or(i[0].value) || i[0].value === "" ? VR : { value: i[0].value, isValid: !0 } : VR
    ) : $R;
  }
  return $R;
};
const BR = {
  isValid: !1,
  value: null
};
var nk = (i) => Array.isArray(i) ? i.reduce((s, c) => c && c.checked && !c.disabled ? {
  isValid: !0,
  value: c.value
} : s, BR) : BR;
function HR(i, s, c = "validate") {
  if (Vg(i) || Array.isArray(i) && i.every(Vg) || Qo(i) && !i)
    return {
      type: c,
      message: Vg(i) ? i : "",
      ref: s
    };
}
var Od = (i) => Sr(i) && !Qg(i) ? i : {
  value: i,
  message: ""
}, IR = async (i, s, c, p, y) => {
  const { ref: g, refs: h, required: T, maxLength: w, minLength: _, min: A, max: O, pattern: L, validate: H, name: Y, valueAsNumber: B, mount: P, disabled: se } = i._f, ae = et(s, Y);
  if (!P || se)
    return {};
  const I = h ? h[0] : g, J = (he) => {
    p && I.reportValidity && (I.setCustomValidity(Qo(he) ? "" : he || ""), I.reportValidity());
  }, U = {}, de = r1(g), ie = mh(g), Xe = de || ie, D = (B || n1(g)) && or(g.value) && or(ae) || qg(g) && g.value === "" || ae === "" || Array.isArray(ae) && !ae.length, ce = zP.bind(null, Y, c, U), _e = (he, ve, Re, it = ql.maxLength, Be = ql.minLength) => {
    const Ct = he ? ve : Re;
    U[Y] = {
      type: he ? it : Be,
      message: Ct,
      ref: g,
      ...ce(he ? it : Be, Ct)
    };
  };
  if (y ? !Array.isArray(ae) || !ae.length : T && (!Xe && (D || Aa(ae)) || Qo(ae) && !ae || ie && !tk(h).isValid || de && !nk(h).isValid)) {
    const { value: he, message: ve } = Vg(T) ? { value: !!T, message: T } : Od(T);
    if (he && (U[Y] = {
      type: ql.required,
      message: ve,
      ref: I,
      ...ce(ql.required, ve)
    }, !c))
      return J(ve), U;
  }
  if (!D && (!Aa(A) || !Aa(O))) {
    let he, ve;
    const Re = Od(O), it = Od(A);
    if (!Aa(ae) && !isNaN(ae)) {
      const Be = g.valueAsNumber || ae && +ae;
      Aa(Re.value) || (he = Be > Re.value), Aa(it.value) || (ve = Be < it.value);
    } else {
      const Be = g.valueAsDate || new Date(ae), Ct = (W) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + W), ge = g.type == "time", ke = g.type == "week";
      Jo(Re.value) && ae && (he = ge ? Ct(ae) > Ct(Re.value) : ke ? ae > Re.value : Be > new Date(Re.value)), Jo(it.value) && ae && (ve = ge ? Ct(ae) < Ct(it.value) : ke ? ae < it.value : Be < new Date(it.value));
    }
    if ((he || ve) && (_e(!!he, Re.message, it.message, ql.max, ql.min), !c))
      return J(U[Y].message), U;
  }
  if ((w || _) && !D && (Jo(ae) || y && Array.isArray(ae))) {
    const he = Od(w), ve = Od(_), Re = !Aa(he.value) && ae.length > +he.value, it = !Aa(ve.value) && ae.length < +ve.value;
    if ((Re || it) && (_e(Re, he.message, ve.message), !c))
      return J(U[Y].message), U;
  }
  if (L && !D && Jo(ae)) {
    const { value: he, message: ve } = Od(L);
    if (Qg(he) && !ae.match(he) && (U[Y] = {
      type: ql.pattern,
      message: ve,
      ref: g,
      ...ce(ql.pattern, ve)
    }, !c))
      return J(ve), U;
  }
  if (H) {
    if (Ql(H)) {
      const he = await H(ae, s), ve = HR(he, I);
      if (ve && (U[Y] = {
        ...ve,
        ...ce(ql.validate, ve.message)
      }, !c))
        return J(ve.message), U;
    } else if (Sr(H)) {
      let he = {};
      for (const ve in H) {
        if (!ii(he) && !c)
          break;
        const Re = HR(await H[ve](ae, s), I, ve);
        Re && (he = {
          ...Re,
          ...ce(ve, Re.message)
        }, J(Re.message), c && (U[Y] = he));
      }
      if (!ii(he) && (U[Y] = {
        ref: I,
        ...he
      }, !c))
        return U;
    }
  }
  return J(!0), U;
};
function jP(i, s) {
  const c = s.slice(0, -1).length;
  let p = 0;
  for (; p < c; )
    i = or(i) ? p++ : i[s[p++]];
  return i;
}
function PP(i) {
  for (const s in i)
    if (i.hasOwnProperty(s) && !or(i[s]))
      return !1;
  return !0;
}
function Mr(i, s) {
  const c = Array.isArray(s) ? s : t1(s) ? [s] : Z_(s), p = c.length === 1 ? i : jP(i, c), y = c.length - 1, g = c[y];
  return p && delete p[g], y !== 0 && (Sr(p) && ii(p) || Array.isArray(p) && PP(p)) && Mr(i, c.slice(0, -1)), i;
}
var sE = () => {
  let i = [];
  return {
    get observers() {
      return i;
    },
    next: (y) => {
      for (const g of i)
        g.next && g.next(y);
    },
    subscribe: (y) => (i.push(y), {
      unsubscribe: () => {
        i = i.filter((g) => g !== y);
      }
    }),
    unsubscribe: () => {
      i = [];
    }
  };
}, Kg = (i) => Aa(i) || !X_(i);
function ls(i, s) {
  if (Kg(i) || Kg(s))
    return i === s;
  if (Dd(i) && Dd(s))
    return i.getTime() === s.getTime();
  const c = Object.keys(i), p = Object.keys(s);
  if (c.length !== p.length)
    return !1;
  for (const y of c) {
    const g = i[y];
    if (!p.includes(y))
      return !1;
    if (y !== "ref") {
      const h = s[y];
      if (Dd(g) && Dd(h) || Sr(g) && Sr(h) || Array.isArray(g) && Array.isArray(h) ? !ls(g, h) : g !== h)
        return !1;
    }
  }
  return !0;
}
var rk = (i) => i.type === "select-multiple", FP = (i) => r1(i) || mh(i), cE = (i) => qg(i) && i.isConnected, ak = (i) => {
  for (const s in i)
    if (Ql(i[s]))
      return !0;
  return !1;
};
function Xg(i, s = {}) {
  const c = Array.isArray(i);
  if (Sr(i) || c)
    for (const p in i)
      Array.isArray(i[p]) || Sr(i[p]) && !ak(i[p]) ? (s[p] = Array.isArray(i[p]) ? [] : {}, Xg(i[p], s[p])) : Aa(i[p]) || (s[p] = !0);
  return s;
}
function ik(i, s, c) {
  const p = Array.isArray(i);
  if (Sr(i) || p)
    for (const y in i)
      Array.isArray(i[y]) || Sr(i[y]) && !ak(i[y]) ? or(s) || Kg(c[y]) ? c[y] = Array.isArray(i[y]) ? Xg(i[y], []) : { ...Xg(i[y]) } : ik(i[y], Aa(s) ? {} : s[y], c[y]) : c[y] = !ls(i[y], s[y]);
  return c;
}
var Ng = (i, s) => ik(i, s, Xg(s)), ok = (i, { valueAsNumber: s, valueAsDate: c, setValueAs: p }) => or(i) ? i : s ? i === "" ? NaN : i && +i : c && Jo(i) ? new Date(i) : p ? p(i) : i;
function fE(i) {
  const s = i.ref;
  if (!(i.refs ? i.refs.every((c) => c.disabled) : s.disabled))
    return n1(s) ? s.files : r1(s) ? nk(i.refs).value : rk(s) ? [...s.selectedOptions].map(({ value: c }) => c) : mh(s) ? tk(i.refs).value : ok(or(s.value) ? i.ref.value : s.value, i);
}
var $P = (i, s, c, p) => {
  const y = {};
  for (const g of i) {
    const h = et(s, g);
    h && Ln(y, g, h._f);
  }
  return {
    criteriaMode: c,
    names: [...i],
    fields: y,
    shouldUseNativeValidation: p
  };
}, Jv = (i) => or(i) ? i : Qg(i) ? i.source : Sr(i) ? Qg(i.value) ? i.value.source : i.value : i;
const YR = "AsyncFunction";
var VP = (i) => (!i || !i.validate) && !!(Ql(i.validate) && i.validate.constructor.name === YR || Sr(i.validate) && Object.values(i.validate).find((s) => s.constructor.name === YR)), BP = (i) => i.mount && (i.required || i.min || i.max || i.maxLength || i.minLength || i.pattern || i.validate);
function WR(i, s, c) {
  const p = et(i, c);
  if (p || t1(c))
    return {
      error: p,
      name: c
    };
  const y = c.split(".");
  for (; y.length; ) {
    const g = y.join("."), h = et(s, g), T = et(i, g);
    if (h && !Array.isArray(h) && c !== g)
      return { name: c };
    if (T && T.type)
      return {
        name: g,
        error: T
      };
    y.pop();
  }
  return {
    name: c
  };
}
var HP = (i, s, c, p, y) => y.isOnAll ? !1 : !c && y.isOnTouch ? !(s || i) : (c ? p.isOnBlur : y.isOnBlur) ? !i : (c ? p.isOnChange : y.isOnChange) ? i : !0, IP = (i, s) => !m0(et(i, s)).length && Mr(i, s);
const YP = {
  mode: ho.onSubmit,
  reValidateMode: ho.onChange,
  shouldFocusError: !0
};
function WP(i = {}) {
  let s = {
    ...YP,
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
  }, p = {}, y = Sr(s.defaultValues) || Sr(s.values) ? gi(s.defaultValues || s.values) || {} : {}, g = s.shouldUnregister ? {} : gi(y), h = {
    action: !1,
    mount: !1,
    watch: !1
  }, T = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, w, _ = 0;
  const A = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, O = {
    values: sE(),
    array: sE(),
    state: sE()
  }, L = PR(s.mode), H = PR(s.reValidateMode), Y = s.criteriaMode === ho.all, B = (N) => (G) => {
    clearTimeout(_), _ = setTimeout(N, G);
  }, P = async (N) => {
    if (A.isValid || N) {
      const G = s.resolver ? ii((await Xe()).errors) : await ce(p, !0);
      G !== c.isValid && O.state.next({
        isValid: G
      });
    }
  }, se = (N, G) => {
    (A.isValidating || A.validatingFields) && ((N || Array.from(T.mount)).forEach((re) => {
      re && (G ? Ln(c.validatingFields, re, G) : Mr(c.validatingFields, re));
    }), O.state.next({
      validatingFields: c.validatingFields,
      isValidating: !ii(c.validatingFields)
    }));
  }, ae = (N, G = [], re, Oe, Te = !0, ne = !0) => {
    if (Oe && re) {
      if (h.action = !0, ne && Array.isArray(et(p, N))) {
        const $e = re(et(p, N), Oe.argA, Oe.argB);
        Te && Ln(p, N, $e);
      }
      if (ne && Array.isArray(et(c.errors, N))) {
        const $e = re(et(c.errors, N), Oe.argA, Oe.argB);
        Te && Ln(c.errors, N, $e), IP(c.errors, N);
      }
      if (A.touchedFields && ne && Array.isArray(et(c.touchedFields, N))) {
        const $e = re(et(c.touchedFields, N), Oe.argA, Oe.argB);
        Te && Ln(c.touchedFields, N, $e);
      }
      A.dirtyFields && (c.dirtyFields = Ng(y, g)), O.state.next({
        name: N,
        isDirty: he(N, G),
        dirtyFields: c.dirtyFields,
        errors: c.errors,
        isValid: c.isValid
      });
    } else
      Ln(g, N, G);
  }, I = (N, G) => {
    Ln(c.errors, N, G), O.state.next({
      errors: c.errors
    });
  }, J = (N) => {
    c.errors = N, O.state.next({
      errors: c.errors,
      isValid: !1
    });
  }, U = (N, G, re, Oe) => {
    const Te = et(p, N);
    if (Te) {
      const ne = et(g, N, or(re) ? et(y, N) : re);
      or(ne) || Oe && Oe.defaultChecked || G ? Ln(g, N, G ? ne : fE(Te._f)) : it(N, ne), h.mount && P();
    }
  }, de = (N, G, re, Oe, Te) => {
    let ne = !1, $e = !1;
    const Et = {
      name: N
    }, vt = !!(et(p, N) && et(p, N)._f && et(p, N)._f.disabled);
    if (!re || Oe) {
      A.isDirty && ($e = c.isDirty, c.isDirty = Et.isDirty = he(), ne = $e !== Et.isDirty);
      const tt = vt || ls(et(y, N), G);
      $e = !!(!vt && et(c.dirtyFields, N)), tt || vt ? Mr(c.dirtyFields, N) : Ln(c.dirtyFields, N, !0), Et.dirtyFields = c.dirtyFields, ne = ne || A.dirtyFields && $e !== !tt;
    }
    if (re) {
      const tt = et(c.touchedFields, N);
      tt || (Ln(c.touchedFields, N, re), Et.touchedFields = c.touchedFields, ne = ne || A.touchedFields && tt !== re);
    }
    return ne && Te && O.state.next(Et), ne ? Et : {};
  }, ie = (N, G, re, Oe) => {
    const Te = et(c.errors, N), ne = A.isValid && Qo(G) && c.isValid !== G;
    if (i.delayError && re ? (w = B(() => I(N, re)), w(i.delayError)) : (clearTimeout(_), w = null, re ? Ln(c.errors, N, re) : Mr(c.errors, N)), (re ? !ls(Te, re) : Te) || !ii(Oe) || ne) {
      const $e = {
        ...Oe,
        ...ne && Qo(G) ? { isValid: G } : {},
        errors: c.errors,
        name: N
      };
      c = {
        ...c,
        ...$e
      }, O.state.next($e);
    }
  }, Xe = async (N) => {
    se(N, !0);
    const G = await s.resolver(g, s.context, $P(N || T.mount, p, s.criteriaMode, s.shouldUseNativeValidation));
    return se(N), G;
  }, D = async (N) => {
    const { errors: G } = await Xe(N);
    if (N)
      for (const re of N) {
        const Oe = et(G, re);
        Oe ? Ln(c.errors, re, Oe) : Mr(c.errors, re);
      }
    else
      c.errors = G;
    return G;
  }, ce = async (N, G, re = {
    valid: !0
  }) => {
    for (const Oe in N) {
      const Te = N[Oe];
      if (Te) {
        const { _f: ne, ...$e } = Te;
        if (ne) {
          const Et = T.array.has(ne.name), vt = Te._f && VP(Te._f);
          vt && A.validatingFields && se([Oe], !0);
          const tt = await IR(Te, g, Y, s.shouldUseNativeValidation && !G, Et);
          if (vt && A.validatingFields && se([Oe]), tt[ne.name] && (re.valid = !1, G))
            break;
          !G && (et(tt, ne.name) ? Et ? UP(c.errors, tt, ne.name) : Ln(c.errors, ne.name, tt[ne.name]) : Mr(c.errors, ne.name));
        }
        !ii($e) && await ce($e, G, re);
      }
    }
    return re.valid;
  }, _e = () => {
    for (const N of T.unMount) {
      const G = et(p, N);
      G && (G._f.refs ? G._f.refs.every((re) => !cE(re)) : !cE(G._f.ref)) && We(N);
    }
    T.unMount = /* @__PURE__ */ new Set();
  }, he = (N, G) => (N && G && Ln(g, N, G), !ls(pe(), y)), ve = (N, G, re) => ek(N, T, {
    ...h.mount ? g : or(G) ? y : Jo(N) ? { [N]: G } : G
  }, re, G), Re = (N) => m0(et(h.mount ? g : y, N, i.shouldUnregister ? et(y, N, []) : [])), it = (N, G, re = {}) => {
    const Oe = et(p, N);
    let Te = G;
    if (Oe) {
      const ne = Oe._f;
      ne && (!ne.disabled && Ln(g, N, ok(G, ne)), Te = qg(ne.ref) && Aa(G) ? "" : G, rk(ne.ref) ? [...ne.ref.options].forEach(($e) => $e.selected = Te.includes($e.value)) : ne.refs ? mh(ne.ref) ? ne.refs.length > 1 ? ne.refs.forEach(($e) => (!$e.defaultChecked || !$e.disabled) && ($e.checked = Array.isArray(Te) ? !!Te.find((Et) => Et === $e.value) : Te === $e.value)) : ne.refs[0] && (ne.refs[0].checked = !!Te) : ne.refs.forEach(($e) => $e.checked = $e.value === Te) : n1(ne.ref) ? ne.ref.value = "" : (ne.ref.value = Te, ne.ref.type || O.values.next({
        name: N,
        values: { ...g }
      })));
    }
    (re.shouldDirty || re.shouldTouch) && de(N, Te, re.shouldTouch, re.shouldDirty, !0), re.shouldValidate && W(N);
  }, Be = (N, G, re) => {
    for (const Oe in G) {
      const Te = G[Oe], ne = `${N}.${Oe}`, $e = et(p, ne);
      (T.array.has(N) || !Kg(Te) || $e && !$e._f) && !Dd(Te) ? Be(ne, Te, re) : it(ne, Te, re);
    }
  }, Ct = (N, G, re = {}) => {
    const Oe = et(p, N), Te = T.array.has(N), ne = gi(G);
    Ln(g, N, ne), Te ? (O.array.next({
      name: N,
      values: { ...g }
    }), (A.isDirty || A.dirtyFields) && re.shouldDirty && O.state.next({
      name: N,
      dirtyFields: Ng(y, g),
      isDirty: he(N, ne)
    })) : Oe && !Oe._f && !Aa(ne) ? Be(N, ne, re) : it(N, ne, re), FR(N, T) && O.state.next({ ...c }), O.values.next({
      name: h.mount ? N : void 0,
      values: { ...g }
    });
  }, ge = async (N) => {
    h.mount = !0;
    const G = N.target;
    let re = G.name, Oe = !0;
    const Te = et(p, re), ne = () => G.type ? fE(Te._f) : wP(N), $e = (Et) => {
      Oe = Number.isNaN(Et) || ls(Et, et(g, re, Et));
    };
    if (Te) {
      let Et, vt;
      const tt = ne(), vn = N.type === jR.BLUR || N.type === jR.FOCUS_OUT, ma = !BP(Te._f) && !s.resolver && !et(c.errors, re) && !Te._f.deps || HP(vn, et(c.touchedFields, re), c.isSubmitted, H, L), Zn = FR(re, T, vn);
      Ln(g, re, tt), vn ? (Te._f.onBlur && Te._f.onBlur(N), w && w(0)) : Te._f.onChange && Te._f.onChange(N);
      const Me = de(re, tt, vn, !1), st = !ii(Me) || Zn;
      if (!vn && O.values.next({
        name: re,
        type: N.type,
        values: { ...g }
      }), ma)
        return A.isValid && (i.mode === "onBlur" ? vn && P() : P()), st && O.state.next({ name: re, ...Zn ? {} : Me });
      if (!vn && Zn && O.state.next({ ...c }), s.resolver) {
        const { errors: At } = await Xe([re]);
        if ($e(tt), Oe) {
          const qt = WR(c.errors, p, re), hn = WR(At, p, qt.name || re);
          Et = hn.error, re = hn.name, vt = ii(At);
        }
      } else
        se([re], !0), Et = (await IR(Te, g, Y, s.shouldUseNativeValidation))[re], se([re]), $e(tt), Oe && (Et ? vt = !1 : A.isValid && (vt = await ce(p, !0)));
      Oe && (Te._f.deps && W(Te._f.deps), ie(re, vt, Et, Me));
    }
  }, ke = (N, G) => {
    if (et(c.errors, G) && N.focus)
      return N.focus(), 1;
  }, W = async (N, G = {}) => {
    let re, Oe;
    const Te = ah(N);
    if (s.resolver) {
      const ne = await D(or(N) ? N : Te);
      re = ii(ne), Oe = N ? !Te.some(($e) => et(ne, $e)) : re;
    } else N ? (Oe = (await Promise.all(Te.map(async (ne) => {
      const $e = et(p, ne);
      return await ce($e && $e._f ? { [ne]: $e } : $e);
    }))).every(Boolean), !(!Oe && !c.isValid) && P()) : Oe = re = await ce(p);
    return O.state.next({
      ...!Jo(N) || A.isValid && re !== c.isValid ? {} : { name: N },
      ...s.resolver || !N ? { isValid: re } : {},
      errors: c.errors
    }), G.shouldFocus && !Oe && ih(p, ke, N ? Te : T.mount), Oe;
  }, pe = (N) => {
    const G = {
      ...h.mount ? g : y
    };
    return or(N) ? G : Jo(N) ? et(G, N) : N.map((re) => et(G, re));
  }, Ne = (N, G) => ({
    invalid: !!et((G || c).errors, N),
    isDirty: !!et((G || c).dirtyFields, N),
    error: et((G || c).errors, N),
    isValidating: !!et(c.validatingFields, N),
    isTouched: !!et((G || c).touchedFields, N)
  }), Ze = (N) => {
    N && ah(N).forEach((G) => Mr(c.errors, G)), O.state.next({
      errors: N ? c.errors : {}
    });
  }, Fe = (N, G, re) => {
    const Oe = (et(p, N, { _f: {} })._f || {}).ref, Te = et(c.errors, N) || {}, { ref: ne, message: $e, type: Et, ...vt } = Te;
    Ln(c.errors, N, {
      ...vt,
      ...G,
      ref: Oe
    }), O.state.next({
      name: N,
      errors: c.errors,
      isValid: !1
    }), re && re.shouldFocus && Oe && Oe.focus && Oe.focus();
  }, yt = (N, G) => Ql(N) ? O.values.subscribe({
    next: (re) => N(ve(void 0, G), re)
  }) : ve(N, G, !0), We = (N, G = {}) => {
    for (const re of N ? ah(N) : T.mount)
      T.mount.delete(re), T.array.delete(re), G.keepValue || (Mr(p, re), Mr(g, re)), !G.keepError && Mr(c.errors, re), !G.keepDirty && Mr(c.dirtyFields, re), !G.keepTouched && Mr(c.touchedFields, re), !G.keepIsValidating && Mr(c.validatingFields, re), !s.shouldUnregister && !G.keepDefaultValue && Mr(y, re);
    O.values.next({
      values: { ...g }
    }), O.state.next({
      ...c,
      ...G.keepDirty ? { isDirty: he() } : {}
    }), !G.keepIsValid && P();
  }, ot = ({ disabled: N, name: G, field: re, fields: Oe, value: Te }) => {
    if (Qo(N) && h.mount || N) {
      const ne = N ? void 0 : or(Te) ? fE(re ? re._f : et(Oe, G)._f) : Te;
      Ln(g, G, ne), de(G, ne, !1, !1, !0);
    }
  }, nt = (N, G = {}) => {
    let re = et(p, N);
    const Oe = Qo(G.disabled) || Qo(i.disabled);
    return Ln(p, N, {
      ...re || {},
      _f: {
        ...re && re._f ? re._f : { ref: { name: N } },
        name: N,
        mount: !0,
        ...G
      }
    }), T.mount.add(N), re ? ot({
      field: re,
      disabled: Qo(G.disabled) ? G.disabled : i.disabled,
      name: N,
      value: G.value
    }) : U(N, !0, G.value), {
      ...Oe ? { disabled: G.disabled || i.disabled } : {},
      ...s.progressive ? {
        required: !!G.required,
        min: Jv(G.min),
        max: Jv(G.max),
        minLength: Jv(G.minLength),
        maxLength: Jv(G.maxLength),
        pattern: Jv(G.pattern)
      } : {},
      name: N,
      onChange: ge,
      onBlur: ge,
      ref: (Te) => {
        if (Te) {
          nt(N, G), re = et(p, N);
          const ne = or(Te.value) && Te.querySelectorAll && Te.querySelectorAll("input,select,textarea")[0] || Te, $e = FP(ne), Et = re._f.refs || [];
          if ($e ? Et.find((vt) => vt === ne) : ne === re._f.ref)
            return;
          Ln(p, N, {
            _f: {
              ...re._f,
              ...$e ? {
                refs: [
                  ...Et.filter(cE),
                  ne,
                  ...Array.isArray(et(y, N)) ? [{}] : []
                ],
                ref: { type: ne.type, name: N }
              } : { ref: ne }
            }
          }), U(N, !1, void 0, ne);
        } else
          re = et(p, N, {}), re._f && (re._f.mount = !1), (s.shouldUnregister || G.shouldUnregister) && !(_P(T.array, N) && h.action) && T.unMount.add(N);
      }
    };
  }, pt = () => s.shouldFocusError && ih(p, ke, T.mount), gt = (N) => {
    Qo(N) && (O.state.next({ disabled: N }), ih(p, (G, re) => {
      const Oe = et(p, re);
      Oe && (G.disabled = Oe._f.disabled || N, Array.isArray(Oe._f.refs) && Oe._f.refs.forEach((Te) => {
        Te.disabled = Oe._f.disabled || N;
      }));
    }, 0, !1));
  }, Nt = (N, G) => async (re) => {
    let Oe;
    re && (re.preventDefault && re.preventDefault(), re.persist && re.persist());
    let Te = gi(g);
    if (O.state.next({
      isSubmitting: !0
    }), s.resolver) {
      const { errors: ne, values: $e } = await Xe();
      c.errors = ne, Te = $e;
    } else
      await ce(p);
    if (Mr(c.errors, "root"), ii(c.errors)) {
      O.state.next({
        errors: {}
      });
      try {
        await N(Te, re);
      } catch (ne) {
        Oe = ne;
      }
    } else
      G && await G({ ...c.errors }, re), pt(), setTimeout(pt);
    if (O.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: ii(c.errors) && !Oe,
      submitCount: c.submitCount + 1,
      errors: c.errors
    }), Oe)
      throw Oe;
  }, xe = (N, G = {}) => {
    et(p, N) && (or(G.defaultValue) ? Ct(N, gi(et(y, N))) : (Ct(N, G.defaultValue), Ln(y, N, gi(G.defaultValue))), G.keepTouched || Mr(c.touchedFields, N), G.keepDirty || (Mr(c.dirtyFields, N), c.isDirty = G.defaultValue ? he(N, gi(et(y, N))) : he()), G.keepError || (Mr(c.errors, N), A.isValid && P()), O.state.next({ ...c }));
  }, xt = (N, G = {}) => {
    const re = N ? gi(N) : y, Oe = gi(re), Te = ii(N), ne = Te ? y : Oe;
    if (G.keepDefaultValues || (y = re), !G.keepValues) {
      if (G.keepDirtyValues)
        for (const $e of T.mount)
          et(c.dirtyFields, $e) ? Ln(ne, $e, et(g, $e)) : Ct($e, et(ne, $e));
      else {
        if (e1 && or(N))
          for (const $e of T.mount) {
            const Et = et(p, $e);
            if (Et && Et._f) {
              const vt = Array.isArray(Et._f.refs) ? Et._f.refs[0] : Et._f.ref;
              if (qg(vt)) {
                const tt = vt.closest("form");
                if (tt) {
                  tt.reset();
                  break;
                }
              }
            }
          }
        p = {};
      }
      g = i.shouldUnregister ? G.keepDefaultValues ? gi(y) : {} : gi(ne), O.array.next({
        values: { ...ne }
      }), O.values.next({
        values: { ...ne }
      });
    }
    T = {
      mount: G.keepDirtyValues ? T.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, h.mount = !A.isValid || !!G.keepIsValid || !!G.keepDirtyValues, h.watch = !!i.shouldUnregister, O.state.next({
      submitCount: G.keepSubmitCount ? c.submitCount : 0,
      isDirty: Te ? !1 : G.keepDirty ? c.isDirty : !!(G.keepDefaultValues && !ls(N, y)),
      isSubmitted: G.keepIsSubmitted ? c.isSubmitted : !1,
      dirtyFields: Te ? {} : G.keepDirtyValues ? G.keepDefaultValues && g ? Ng(y, g) : c.dirtyFields : G.keepDefaultValues && N ? Ng(y, N) : G.keepDirty ? c.dirtyFields : {},
      touchedFields: G.keepTouched ? c.touchedFields : {},
      errors: G.keepErrors ? c.errors : {},
      isSubmitSuccessful: G.keepIsSubmitSuccessful ? c.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, Le = (N, G) => xt(Ql(N) ? N(g) : N, G);
  return {
    control: {
      register: nt,
      unregister: We,
      getFieldState: Ne,
      handleSubmit: Nt,
      setError: Fe,
      _executeSchema: Xe,
      _getWatch: ve,
      _getDirty: he,
      _updateValid: P,
      _removeUnmounted: _e,
      _updateFieldArray: ae,
      _updateDisabledField: ot,
      _getFieldArray: Re,
      _reset: xt,
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
      _setErrors: J,
      get _fields() {
        return p;
      },
      get _formValues() {
        return g;
      },
      get _state() {
        return h;
      },
      set _state(N) {
        h = N;
      },
      get _defaultValues() {
        return y;
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
    trigger: W,
    register: nt,
    handleSubmit: Nt,
    watch: yt,
    setValue: Ct,
    getValues: pe,
    reset: Le,
    resetField: xe,
    clearErrors: Ze,
    unregister: We,
    setError: Fe,
    setFocus: (N, G = {}) => {
      const re = et(p, N), Oe = re && re._f;
      if (Oe) {
        const Te = Oe.refs ? Oe.refs[0] : Oe.ref;
        Te.focus && (Te.focus(), G.shouldSelect && Te.select());
      }
    },
    getFieldState: Ne
  };
}
function GP(i = {}) {
  const s = Rn.useRef(), c = Rn.useRef(), [p, y] = Rn.useState({
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
    ...WP(i),
    formState: p
  });
  const g = s.current.control;
  return g._options = i, J_({
    subject: g._subjects.state,
    next: (h) => {
      AP(h, g._proxyFormState, g._updateFormState) && y({ ...g._formState });
    }
  }), Rn.useEffect(() => g._disableForm(i.disabled), [g, i.disabled]), Rn.useEffect(() => {
    if (g._proxyFormState.isDirty) {
      const h = g._getDirty();
      h !== p.isDirty && g._subjects.state.next({
        isDirty: h
      });
    }
  }, [g, p.isDirty]), Rn.useEffect(() => {
    i.values && !ls(i.values, c.current) ? (g._reset(i.values, g._options.resetOptions), c.current = i.values, y((h) => ({ ...h }))) : g._resetDefaultValues();
  }, [i.values, g]), Rn.useEffect(() => {
    i.errors && g._setErrors(i.errors);
  }, [i.errors, g]), Rn.useEffect(() => {
    g._state.mount || (g._updateValid(), g._state.mount = !0), g._state.watch && (g._state.watch = !1, g._subjects.state.next({ ...g._formState })), g._removeUnmounted();
  }), Rn.useEffect(() => {
    i.shouldUnregister && g._subjects.values.next({
      values: g._getWatch()
    });
  }, [i.shouldUnregister, g]), s.current.formState = MP(p, g), s.current;
}
const qP = ({ handleOnSubmit: i }) => {
  const {
    register: s,
    handleSubmit: c,
    formState: { errors: p },
    control: y
  } = GP(), g = (T) => {
    console.log("Internal submit from Form component:", T);
    const w = { type: "onSubmitForm", payload: T };
    window.postMessage(w, window.location.origin), i && i(T);
  }, h = LP({ control: y, name: "name" });
  return t2(() => {
    console.log("useEffect name updated", h);
  }, [h]), /* @__PURE__ */ Ae.jsxs("form", { onSubmit: c(g), children: [
    /* @__PURE__ */ Ae.jsxs("div", { children: [
      /* @__PURE__ */ Ae.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ Ae.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...s("name", { required: "Este campo es requerido" })
        }
      ),
      p.name && /* @__PURE__ */ Ae.jsx("span", { children: p.name.message })
    ] }),
    /* @__PURE__ */ Ae.jsxs("div", { children: [
      /* @__PURE__ */ Ae.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ Ae.jsx(
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
      p.email && /* @__PURE__ */ Ae.jsx("span", { children: p.email.message })
    ] }),
    /* @__PURE__ */ Ae.jsx("button", { type: "submit", children: "Enviar" })
  ] });
}, QP = "_form-container_cx8oy_1", KP = "_cs-input_cx8oy_49", lk = {
  "form-container": "_form-container_cx8oy_1",
  formContainer: QP,
  "cs-input": "_cs-input_cx8oy_49",
  csInput: KP
}, XP = ({
  id: i,
  name: s,
  label: c,
  placeholder: p,
  value: y,
  onChange: g,
  required: h
}) => /* @__PURE__ */ Ae.jsxs("div", { className: lk["cs-input"], children: [
  /* @__PURE__ */ Ae.jsx(
    "input",
    {
      type: "text",
      id: i,
      name: s,
      placeholder: p,
      value: y,
      onChange: (T) => g && g(T.target.value),
      required: h
    }
  ),
  c && /* @__PURE__ */ Ae.jsx("label", { htmlFor: i, style: { marginRight: 8 }, children: c })
] }), ZP = ({
  fields: i,
  // layout,
  // gridTemplateColumns,
  onSubmit: s
}) => {
  const [c, p] = n2({}), y = (g) => {
    g.preventDefault(), s(c);
  };
  return /* @__PURE__ */ Ae.jsxs("form", { onSubmit: y, className: lk["form-container"], children: [
    i.map((g, h) => {
      switch (g.type) {
        case "text":
          return /* @__PURE__ */ Ae.jsx(
            XP,
            {
              id: g.id,
              name: g.name,
              label: g.label,
              placeholder: g.placeholder,
              required: !0,
              value: c[g.name],
              onChange: (T) => {
                p((w) => ({ ...w, [g.name]: T }));
              }
            },
            h
          );
        default:
          return null;
      }
    }),
    /* @__PURE__ */ Ae.jsx("button", { type: "submit", children: "Submit" })
  ] });
}, JP = ({ formConfig: i, onSubmit: s }) => /* @__PURE__ */ Ae.jsx(
  ZP,
  {
    fields: i.fields,
    layout: i.layout,
    gridTemplateColumns: i.gridTemplateColumns,
    onSubmit: s
  }
), e3 = () => /* @__PURE__ */ Ae.jsxs(XE, { sx: { maxWidth: 345 }, children: [
  /* @__PURE__ */ Ae.jsxs(ZE, { children: [
    /* @__PURE__ */ Ae.jsx(
      q_,
      {
        component: "img",
        height: "140",
        image: "https://mui.com/static/images/cards/contemplative-reptile.jpg",
        alt: "green iguana"
      }
    ),
    /* @__PURE__ */ Ae.jsxs(JE, { children: [
      /* @__PURE__ */ Ae.jsx(Gg, { gutterBottom: !0, variant: "h5", component: "div", children: "Lizard" }),
      /* @__PURE__ */ Ae.jsx(Gg, { variant: "body2", sx: { color: "text.secondary" }, children: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica" })
    ] })
  ] }),
  /* @__PURE__ */ Ae.jsx(G_, { children: /* @__PURE__ */ Ae.jsx(rh, { size: "small", color: "primary", children: "Share" }) })
] }), t3 = ({ children: i }) => /* @__PURE__ */ Ae.jsx(XE, { sx: { maxWidth: 345 }, children: /* @__PURE__ */ Ae.jsxs(ZE, { children: [
  /* @__PURE__ */ Ae.jsx(Gg, { children: "CardWithChild" }),
  /* @__PURE__ */ Ae.jsx(JE, { children: i })
] }) });
customElements.define(
  "rwc-header",
  Ld(R2, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  Ld(qP, {
    props: { handleOnSubmit: "function" }
  })
);
customElements.define(
  "rwc-dinamyc-form",
  Ld(JP, {
    props: { formConfig: "json", onSubmit: "function" }
  })
);
customElements.define("rwc-basic-buttons", Ld(xP));
customElements.define("rwc-card-example", Ld(e3));
customElements.define("rwc-card-child-example", Ld(t3));
export {
  xP as BasicButtons,
  t3 as CardWithChild,
  qP as Form,
  R2 as Header,
  e3 as MultiActionAreaCard,
  TP as ThemeProvider,
  JP as WrapperForm,
  Wj as theme
};
