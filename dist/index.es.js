import $n, { useEffect as $O, useState as IO } from "react";
function YO(s) {
  return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
}
var KC = { exports: {} }, $a = {}, Ny = { exports: {} }, LC = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var KT;
function WO() {
  return KT || (KT = 1, function(s) {
    function v(ve, Pe) {
      var V = ve.length;
      ve.push(Pe);
      e: for (; 0 < V; ) {
        var se = V - 1 >>> 1, De = ve[se];
        if (0 < b(De, Pe)) ve[se] = Pe, ve[V] = De, V = se;
        else break e;
      }
    }
    function p(ve) {
      return ve.length === 0 ? null : ve[0];
    }
    function S(ve) {
      if (ve.length === 0) return null;
      var Pe = ve[0], V = ve.pop();
      if (V !== Pe) {
        ve[0] = V;
        e: for (var se = 0, De = ve.length, et = De >>> 1; se < et; ) {
          var Qe = 2 * (se + 1) - 1, ht = ve[Qe], Ie = Qe + 1, at = ve[Ie];
          if (0 > b(ht, V)) Ie < De && 0 > b(at, ht) ? (ve[se] = at, ve[Ie] = V, se = Ie) : (ve[se] = ht, ve[Qe] = V, se = Qe);
          else if (Ie < De && 0 > b(at, V)) ve[se] = at, ve[Ie] = V, se = Ie;
          else break e;
        }
      }
      return Pe;
    }
    function b(ve, Pe) {
      var V = ve.sortIndex - Pe.sortIndex;
      return V !== 0 ? V : ve.id - Pe.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var E = performance;
      s.unstable_now = function() {
        return E.now();
      };
    } else {
      var y = Date, D = y.now();
      s.unstable_now = function() {
        return y.now() - D;
      };
    }
    var U = [], j = [], G = 1, A = null, z = 3, q = !1, ee = !1, re = !1, de = typeof setTimeout == "function" ? setTimeout : null, Ue = typeof clearTimeout == "function" ? clearTimeout : null, ge = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ne(ve) {
      for (var Pe = p(j); Pe !== null; ) {
        if (Pe.callback === null) S(j);
        else if (Pe.startTime <= ve) S(j), Pe.sortIndex = Pe.expirationTime, v(U, Pe);
        else break;
        Pe = p(j);
      }
    }
    function _e(ve) {
      if (re = !1, ne(ve), !ee) if (p(U) !== null) ee = !0, ct(Q);
      else {
        var Pe = p(j);
        Pe !== null && At(_e, Pe.startTime - ve);
      }
    }
    function Q(ve, Pe) {
      ee = !1, re && (re = !1, Ue(xt), xt = -1), q = !0;
      var V = z;
      try {
        for (ne(Pe), A = p(U); A !== null && (!(A.expirationTime > Pe) || ve && !Ne()); ) {
          var se = A.callback;
          if (typeof se == "function") {
            A.callback = null, z = A.priorityLevel;
            var De = se(A.expirationTime <= Pe);
            Pe = s.unstable_now(), typeof De == "function" ? A.callback = De : A === p(U) && S(U), ne(Pe);
          } else S(U);
          A = p(U);
        }
        if (A !== null) var et = !0;
        else {
          var Qe = p(j);
          Qe !== null && At(_e, Qe.startTime - Pe), et = !1;
        }
        return et;
      } finally {
        A = null, z = V, q = !1;
      }
    }
    var ot = !1, Ke = null, xt = -1, R = 5, pe = -1;
    function Ne() {
      return !(s.unstable_now() - pe < R);
    }
    function be() {
      if (Ke !== null) {
        var ve = s.unstable_now();
        pe = ve;
        var Pe = !0;
        try {
          Pe = Ke(!0, ve);
        } finally {
          Pe ? ye() : (ot = !1, Ke = null);
        }
      } else ot = !1;
    }
    var ye;
    if (typeof ge == "function") ye = function() {
      ge(be);
    };
    else if (typeof MessageChannel < "u") {
      var Le = new MessageChannel(), bt = Le.port2;
      Le.port1.onmessage = be, ye = function() {
        bt.postMessage(null);
      };
    } else ye = function() {
      de(be, 0);
    };
    function ct(ve) {
      Ke = ve, ot || (ot = !0, ye());
    }
    function At(ve, Pe) {
      xt = de(function() {
        ve(s.unstable_now());
      }, Pe);
    }
    s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(ve) {
      ve.callback = null;
    }, s.unstable_continueExecution = function() {
      ee || q || (ee = !0, ct(Q));
    }, s.unstable_forceFrameRate = function(ve) {
      0 > ve || 125 < ve ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : R = 0 < ve ? Math.floor(1e3 / ve) : 5;
    }, s.unstable_getCurrentPriorityLevel = function() {
      return z;
    }, s.unstable_getFirstCallbackNode = function() {
      return p(U);
    }, s.unstable_next = function(ve) {
      switch (z) {
        case 1:
        case 2:
        case 3:
          var Pe = 3;
          break;
        default:
          Pe = z;
      }
      var V = z;
      z = Pe;
      try {
        return ve();
      } finally {
        z = V;
      }
    }, s.unstable_pauseExecution = function() {
    }, s.unstable_requestPaint = function() {
    }, s.unstable_runWithPriority = function(ve, Pe) {
      switch (ve) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ve = 3;
      }
      var V = z;
      z = ve;
      try {
        return Pe();
      } finally {
        z = V;
      }
    }, s.unstable_scheduleCallback = function(ve, Pe, V) {
      var se = s.unstable_now();
      switch (typeof V == "object" && V !== null ? (V = V.delay, V = typeof V == "number" && 0 < V ? se + V : se) : V = se, ve) {
        case 1:
          var De = -1;
          break;
        case 2:
          De = 250;
          break;
        case 5:
          De = 1073741823;
          break;
        case 4:
          De = 1e4;
          break;
        default:
          De = 5e3;
      }
      return De = V + De, ve = { id: G++, callback: Pe, priorityLevel: ve, startTime: V, expirationTime: De, sortIndex: -1 }, V > se ? (ve.sortIndex = V, v(j, ve), p(U) === null && ve === p(j) && (re ? (Ue(xt), xt = -1) : re = !0, At(_e, V - se))) : (ve.sortIndex = De, v(U, ve), ee || q || (ee = !0, ct(Q))), ve;
    }, s.unstable_shouldYield = Ne, s.unstable_wrapCallback = function(ve) {
      var Pe = z;
      return function() {
        var V = z;
        z = Pe;
        try {
          return ve.apply(this, arguments);
        } finally {
          z = V;
        }
      };
    };
  }(LC)), LC;
}
var UC = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XT;
function QO() {
  return XT || (XT = 1, function(s) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var v = !1, p = !1, S = 5;
      function b(Ee, Xe) {
        var Tt = Ee.length;
        Ee.push(Xe), D(Ee, Xe, Tt);
      }
      function E(Ee) {
        return Ee.length === 0 ? null : Ee[0];
      }
      function y(Ee) {
        if (Ee.length === 0)
          return null;
        var Xe = Ee[0], Tt = Ee.pop();
        return Tt !== Xe && (Ee[0] = Tt, U(Ee, Tt, 0)), Xe;
      }
      function D(Ee, Xe, Tt) {
        for (var Pt = Tt; Pt > 0; ) {
          var nn = Pt - 1 >>> 1, er = Ee[nn];
          if (j(er, Xe) > 0)
            Ee[nn] = Xe, Ee[Pt] = er, Pt = nn;
          else
            return;
        }
      }
      function U(Ee, Xe, Tt) {
        for (var Pt = Tt, nn = Ee.length, er = nn >>> 1; Pt < er; ) {
          var On = (Pt + 1) * 2 - 1, Pr = Ee[On], rn = On + 1, ia = Ee[rn];
          if (j(Pr, Xe) < 0)
            rn < nn && j(ia, Pr) < 0 ? (Ee[Pt] = ia, Ee[rn] = Xe, Pt = rn) : (Ee[Pt] = Pr, Ee[On] = Xe, Pt = On);
          else if (rn < nn && j(ia, Xe) < 0)
            Ee[Pt] = ia, Ee[rn] = Xe, Pt = rn;
          else
            return;
        }
      }
      function j(Ee, Xe) {
        var Tt = Ee.sortIndex - Xe.sortIndex;
        return Tt !== 0 ? Tt : Ee.id - Xe.id;
      }
      var G = 1, A = 2, z = 3, q = 4, ee = 5;
      function re(Ee, Xe) {
      }
      var de = typeof performance == "object" && typeof performance.now == "function";
      if (de) {
        var Ue = performance;
        s.unstable_now = function() {
          return Ue.now();
        };
      } else {
        var ge = Date, ne = ge.now();
        s.unstable_now = function() {
          return ge.now() - ne;
        };
      }
      var _e = 1073741823, Q = -1, ot = 250, Ke = 5e3, xt = 1e4, R = _e, pe = [], Ne = [], be = 1, ye = null, Le = z, bt = !1, ct = !1, At = !1, ve = typeof setTimeout == "function" ? setTimeout : null, Pe = typeof clearTimeout == "function" ? clearTimeout : null, V = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function se(Ee) {
        for (var Xe = E(Ne); Xe !== null; ) {
          if (Xe.callback === null)
            y(Ne);
          else if (Xe.startTime <= Ee)
            y(Ne), Xe.sortIndex = Xe.expirationTime, b(pe, Xe);
          else
            return;
          Xe = E(Ne);
        }
      }
      function De(Ee) {
        if (At = !1, se(Ee), !ct)
          if (E(pe) !== null)
            ct = !0, $t(et);
          else {
            var Xe = E(Ne);
            Xe !== null && Rt(De, Xe.startTime - Ee);
          }
      }
      function et(Ee, Xe) {
        ct = !1, At && (At = !1, Dn()), bt = !0;
        var Tt = Le;
        try {
          var Pt;
          if (!p) return Qe(Ee, Xe);
        } finally {
          ye = null, Le = Tt, bt = !1;
        }
      }
      function Qe(Ee, Xe) {
        var Tt = Xe;
        for (se(Tt), ye = E(pe); ye !== null && !v && !(ye.expirationTime > Tt && (!Ee || B())); ) {
          var Pt = ye.callback;
          if (typeof Pt == "function") {
            ye.callback = null, Le = ye.priorityLevel;
            var nn = ye.expirationTime <= Tt, er = Pt(nn);
            Tt = s.unstable_now(), typeof er == "function" ? ye.callback = er : ye === E(pe) && y(pe), se(Tt);
          } else
            y(pe);
          ye = E(pe);
        }
        if (ye !== null)
          return !0;
        var On = E(Ne);
        return On !== null && Rt(De, On.startTime - Tt), !1;
      }
      function ht(Ee, Xe) {
        switch (Ee) {
          case G:
          case A:
          case z:
          case q:
          case ee:
            break;
          default:
            Ee = z;
        }
        var Tt = Le;
        Le = Ee;
        try {
          return Xe();
        } finally {
          Le = Tt;
        }
      }
      function Ie(Ee) {
        var Xe;
        switch (Le) {
          case G:
          case A:
          case z:
            Xe = z;
            break;
          default:
            Xe = Le;
            break;
        }
        var Tt = Le;
        Le = Xe;
        try {
          return Ee();
        } finally {
          Le = Tt;
        }
      }
      function at(Ee) {
        var Xe = Le;
        return function() {
          var Tt = Le;
          Le = Xe;
          try {
            return Ee.apply(this, arguments);
          } finally {
            Le = Tt;
          }
        };
      }
      function rt(Ee, Xe, Tt) {
        var Pt = s.unstable_now(), nn;
        if (typeof Tt == "object" && Tt !== null) {
          var er = Tt.delay;
          typeof er == "number" && er > 0 ? nn = Pt + er : nn = Pt;
        } else
          nn = Pt;
        var On;
        switch (Ee) {
          case G:
            On = Q;
            break;
          case A:
            On = ot;
            break;
          case ee:
            On = R;
            break;
          case q:
            On = xt;
            break;
          case z:
          default:
            On = Ke;
            break;
        }
        var Pr = nn + On, rn = {
          id: be++,
          callback: Xe,
          priorityLevel: Ee,
          startTime: nn,
          expirationTime: Pr,
          sortIndex: -1
        };
        return nn > Pt ? (rn.sortIndex = nn, b(Ne, rn), E(pe) === null && rn === E(Ne) && (At ? Dn() : At = !0, Rt(De, nn - Pt))) : (rn.sortIndex = Pr, b(pe, rn), !ct && !bt && (ct = !0, $t(et))), rn;
      }
      function pt() {
      }
      function mt() {
        !ct && !bt && (ct = !0, $t(et));
      }
      function zt() {
        return E(pe);
      }
      function Se(Ee) {
        Ee.callback = null;
      }
      function Ft() {
        return Le;
      }
      var vn = !1, kn = null, Zn = -1, cr = S, k = -1;
      function B() {
        var Ee = s.unstable_now() - k;
        return !(Ee < cr);
      }
      function K() {
      }
      function Ce(Ee) {
        if (Ee < 0 || Ee > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        Ee > 0 ? cr = Math.floor(1e3 / Ee) : cr = S;
      }
      var he = function() {
        if (kn !== null) {
          var Ee = s.unstable_now();
          k = Ee;
          var Xe = !0, Tt = !0;
          try {
            Tt = kn(Xe, Ee);
          } finally {
            Tt ? ue() : (vn = !1, kn = null);
          }
        } else
          vn = !1;
      }, ue;
      if (typeof V == "function")
        ue = function() {
          V(he);
        };
      else if (typeof MessageChannel < "u") {
        var Fe = new MessageChannel(), gt = Fe.port2;
        Fe.port1.onmessage = he, ue = function() {
          gt.postMessage(null);
        };
      } else
        ue = function() {
          ve(he, 0);
        };
      function $t(Ee) {
        kn = Ee, vn || (vn = !0, ue());
      }
      function Rt(Ee, Xe) {
        Zn = ve(function() {
          Ee(s.unstable_now());
        }, Xe);
      }
      function Dn() {
        Pe(Zn), Zn = -1;
      }
      var li = K, Or = null;
      s.unstable_IdlePriority = ee, s.unstable_ImmediatePriority = G, s.unstable_LowPriority = q, s.unstable_NormalPriority = z, s.unstable_Profiling = Or, s.unstable_UserBlockingPriority = A, s.unstable_cancelCallback = Se, s.unstable_continueExecution = mt, s.unstable_forceFrameRate = Ce, s.unstable_getCurrentPriorityLevel = Ft, s.unstable_getFirstCallbackNode = zt, s.unstable_next = Ie, s.unstable_pauseExecution = pt, s.unstable_requestPaint = li, s.unstable_runWithPriority = ht, s.unstable_scheduleCallback = rt, s.unstable_shouldYield = B, s.unstable_wrapCallback = at, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(UC)), UC;
}
var JT;
function Nx() {
  return JT || (JT = 1, process.env.NODE_ENV === "production" ? Ny.exports = WO() : Ny.exports = QO()), Ny.exports;
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
var ZT;
function GO() {
  if (ZT) return $a;
  ZT = 1;
  var s = $n, v = Nx();
  function p(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var S = /* @__PURE__ */ new Set(), b = {};
  function E(n, r) {
    y(n, r), y(n + "Capture", r);
  }
  function y(n, r) {
    for (b[n] = r, n = 0; n < r.length; n++) S.add(r[n]);
  }
  var D = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), U = Object.prototype.hasOwnProperty, j = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, G = {}, A = {};
  function z(n) {
    return U.call(A, n) ? !0 : U.call(G, n) ? !1 : j.test(n) ? A[n] = !0 : (G[n] = !0, !1);
  }
  function q(n, r, l, u) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return u ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function ee(n, r, l, u) {
    if (r === null || typeof r > "u" || q(n, r, l, u)) return !0;
    if (u) return !1;
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
  function re(n, r, l, u, f, h, C) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = u, this.attributeNamespace = f, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = h, this.removeEmptyString = C;
  }
  var de = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    de[n] = new re(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    de[r] = new re(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    de[n] = new re(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    de[n] = new re(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    de[n] = new re(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    de[n] = new re(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    de[n] = new re(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    de[n] = new re(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    de[n] = new re(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var Ue = /[\-:]([a-z])/g;
  function ge(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      Ue,
      ge
    );
    de[r] = new re(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(Ue, ge);
    de[r] = new re(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(Ue, ge);
    de[r] = new re(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    de[n] = new re(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), de.xlinkHref = new re("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    de[n] = new re(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function ne(n, r, l, u) {
    var f = de.hasOwnProperty(r) ? de[r] : null;
    (f !== null ? f.type !== 0 : u || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (ee(r, l, f, u) && (l = null), u || f === null ? z(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : f.mustUseProperty ? n[f.propertyName] = l === null ? f.type === 3 ? !1 : "" : l : (r = f.attributeName, u = f.attributeNamespace, l === null ? n.removeAttribute(r) : (f = f.type, l = f === 3 || f === 4 && l === !0 ? "" : "" + l, u ? n.setAttributeNS(u, r, l) : n.setAttribute(r, l))));
  }
  var _e = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Q = Symbol.for("react.element"), ot = Symbol.for("react.portal"), Ke = Symbol.for("react.fragment"), xt = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), pe = Symbol.for("react.provider"), Ne = Symbol.for("react.context"), be = Symbol.for("react.forward_ref"), ye = Symbol.for("react.suspense"), Le = Symbol.for("react.suspense_list"), bt = Symbol.for("react.memo"), ct = Symbol.for("react.lazy"), At = Symbol.for("react.offscreen"), ve = Symbol.iterator;
  function Pe(n) {
    return n === null || typeof n != "object" ? null : (n = ve && n[ve] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var V = Object.assign, se;
  function De(n) {
    if (se === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      se = r && r[1] || "";
    }
    return `
` + se + n;
  }
  var et = !1;
  function Qe(n, r) {
    if (!n || et) return "";
    et = !0;
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
        } catch (Y) {
          var u = Y;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (Y) {
          u = Y;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (Y) {
          u = Y;
        }
        n();
      }
    } catch (Y) {
      if (Y && u && typeof Y.stack == "string") {
        for (var f = Y.stack.split(`
`), h = u.stack.split(`
`), C = f.length - 1, w = h.length - 1; 1 <= C && 0 <= w && f[C] !== h[w]; ) w--;
        for (; 1 <= C && 0 <= w; C--, w--) if (f[C] !== h[w]) {
          if (C !== 1 || w !== 1)
            do
              if (C--, w--, 0 > w || f[C] !== h[w]) {
                var O = `
` + f[C].replace(" at new ", " at ");
                return n.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", n.displayName)), O;
              }
            while (1 <= C && 0 <= w);
          break;
        }
      }
    } finally {
      et = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? De(n) : "";
  }
  function ht(n) {
    switch (n.tag) {
      case 5:
        return De(n.type);
      case 16:
        return De("Lazy");
      case 13:
        return De("Suspense");
      case 19:
        return De("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Qe(n.type, !1), n;
      case 11:
        return n = Qe(n.type.render, !1), n;
      case 1:
        return n = Qe(n.type, !0), n;
      default:
        return "";
    }
  }
  function Ie(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Ke:
        return "Fragment";
      case ot:
        return "Portal";
      case R:
        return "Profiler";
      case xt:
        return "StrictMode";
      case ye:
        return "Suspense";
      case Le:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ne:
        return (n.displayName || "Context") + ".Consumer";
      case pe:
        return (n._context.displayName || "Context") + ".Provider";
      case be:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case bt:
        return r = n.displayName || null, r !== null ? r : Ie(n.type) || "Memo";
      case ct:
        r = n._payload, n = n._init;
        try {
          return Ie(n(r));
        } catch {
        }
    }
    return null;
  }
  function at(n) {
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
        return r === xt ? "StrictMode" : "Mode";
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
  function mt(n) {
    var r = pt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), u = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var f = l.get, h = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return f.call(this);
      }, set: function(C) {
        u = "" + C, h.call(this, C);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return u;
      }, setValue: function(C) {
        u = "" + C;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function zt(n) {
    n._valueTracker || (n._valueTracker = mt(n));
  }
  function Se(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), u = "";
    return n && (u = pt(n) ? n.checked ? "true" : "false" : n.value), n = u, n !== l ? (r.setValue(n), !0) : !1;
  }
  function Ft(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function vn(n, r) {
    var l = r.checked;
    return V({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function kn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, u = r.checked != null ? r.checked : r.defaultChecked;
    l = rt(r.value != null ? r.value : l), n._wrapperState = { initialChecked: u, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Zn(n, r) {
    r = r.checked, r != null && ne(n, "checked", r, !1);
  }
  function cr(n, r) {
    Zn(n, r);
    var l = rt(r.value), u = r.type;
    if (l != null) u === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (u === "submit" || u === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? B(n, r.type, l) : r.hasOwnProperty("defaultValue") && B(n, r.type, rt(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function k(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var u = r.type;
      if (!(u !== "submit" && u !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function B(n, r, l) {
    (r !== "number" || Ft(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var K = Array.isArray;
  function Ce(n, r, l, u) {
    if (n = n.options, r) {
      r = {};
      for (var f = 0; f < l.length; f++) r["$" + l[f]] = !0;
      for (l = 0; l < n.length; l++) f = r.hasOwnProperty("$" + n[l].value), n[l].selected !== f && (n[l].selected = f), f && u && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + rt(l), r = null, f = 0; f < n.length; f++) {
        if (n[f].value === l) {
          n[f].selected = !0, u && (n[f].defaultSelected = !0);
          return;
        }
        r !== null || n[f].disabled || (r = n[f]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function he(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(p(91));
    return V({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function ue(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(p(92));
        if (K(l)) {
          if (1 < l.length) throw Error(p(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: rt(l) };
  }
  function Fe(n, r) {
    var l = rt(r.value), u = rt(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), u != null && (n.defaultValue = "" + u);
  }
  function gt(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function $t(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Rt(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? $t(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Dn, li = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, u, f) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, u, f);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Dn = Dn || document.createElement("div"), Dn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Dn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function Or(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Ee = {
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
  }, Xe = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ee).forEach(function(n) {
    Xe.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Ee[r] = Ee[n];
    });
  });
  function Tt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Ee.hasOwnProperty(n) && Ee[n] ? ("" + r).trim() : r + "px";
  }
  function Pt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var u = l.indexOf("--") === 0, f = Tt(l, r[l], u);
      l === "float" && (l = "cssFloat"), u ? n.setProperty(l, f) : n[l] = f;
    }
  }
  var nn = V({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function er(n, r) {
    if (r) {
      if (nn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(p(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(p(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(p(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(p(62));
    }
  }
  function On(n, r) {
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
  var Pr = null;
  function rn(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var ia = null, en = null, an = null;
  function wo(n) {
    if (n = ss(n)) {
      if (typeof ia != "function") throw Error(p(280));
      var r = n.stateNode;
      r && (r = tt(r), ia(n.stateNode, n.type, r));
    }
  }
  function Ml(n) {
    en ? an ? an.push(n) : an = [n] : en = n;
  }
  function _o() {
    if (en) {
      var n = en, r = an;
      if (an = en = null, wo(n), r) for (n = 0; n < r.length; n++) wo(r[n]);
    }
  }
  function Pu(n, r) {
    return n(r);
  }
  function Zs() {
  }
  var Nl = !1;
  function ko(n, r, l) {
    if (Nl) return n(r, l);
    Nl = !0;
    try {
      return Pu(n, r, l);
    } finally {
      Nl = !1, (en !== null || an !== null) && (Zs(), _o());
    }
  }
  function Ll(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var u = tt(l);
    if (u === null) return null;
    l = u[r];
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
        (u = !u.disabled) || (n = n.type, u = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !u;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(p(231, r, typeof l));
    return l;
  }
  var Do = !1;
  if (D) try {
    var oi = {};
    Object.defineProperty(oi, "passive", { get: function() {
      Do = !0;
    } }), window.addEventListener("test", oi, oi), window.removeEventListener("test", oi, oi);
  } catch {
    Do = !1;
  }
  function Ri(n, r, l, u, f, h, C, w, O) {
    var Y = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, Y);
    } catch (le) {
      this.onError(le);
    }
  }
  var la = !1, Wa = null, Zi = !1, Ul = null, _ = { onError: function(n) {
    la = !0, Wa = n;
  } };
  function oe(n, r, l, u, f, h, C, w, O) {
    la = !1, Wa = null, Ri.apply(_, arguments);
  }
  function Te(n, r, l, u, f, h, C, w, O) {
    if (oe.apply(this, arguments), la) {
      if (la) {
        var Y = Wa;
        la = !1, Wa = null;
      } else throw Error(p(198));
      Zi || (Zi = !0, Ul = Y);
    }
  }
  function Je(n) {
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
  function Mt(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Ut(n) {
    if (Je(n) !== n) throw Error(p(188));
  }
  function ut(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Je(n), r === null) throw Error(p(188));
      return r !== n ? null : n;
    }
    for (var l = n, u = r; ; ) {
      var f = l.return;
      if (f === null) break;
      var h = f.alternate;
      if (h === null) {
        if (u = f.return, u !== null) {
          l = u;
          continue;
        }
        break;
      }
      if (f.child === h.child) {
        for (h = f.child; h; ) {
          if (h === l) return Ut(f), n;
          if (h === u) return Ut(f), r;
          h = h.sibling;
        }
        throw Error(p(188));
      }
      if (l.return !== u.return) l = f, u = h;
      else {
        for (var C = !1, w = f.child; w; ) {
          if (w === l) {
            C = !0, l = f, u = h;
            break;
          }
          if (w === u) {
            C = !0, u = f, l = h;
            break;
          }
          w = w.sibling;
        }
        if (!C) {
          for (w = h.child; w; ) {
            if (w === l) {
              C = !0, l = h, u = f;
              break;
            }
            if (w === u) {
              C = !0, u = h, l = f;
              break;
            }
            w = w.sibling;
          }
          if (!C) throw Error(p(189));
        }
      }
      if (l.alternate !== u) throw Error(p(190));
    }
    if (l.tag !== 3) throw Error(p(188));
    return l.stateNode.current === l ? n : r;
  }
  function wt(n) {
    return n = ut(n), n !== null ? tr(n) : null;
  }
  function tr(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = tr(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var on = v.unstable_scheduleCallback, gn = v.unstable_cancelCallback, Br = v.unstable_shouldYield, el = v.unstable_requestPaint, It = v.unstable_now, Tr = v.unstable_getCurrentPriorityLevel, oa = v.unstable_ImmediatePriority, _t = v.unstable_UserBlockingPriority, ui = v.unstable_NormalPriority, Ov = v.unstable_LowPriority, id = v.unstable_IdlePriority, Bu = null, Qa = null;
  function Av(n) {
    if (Qa && typeof Qa.onCommitFiberRoot == "function") try {
      Qa.onCommitFiberRoot(Bu, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Ea = Math.clz32 ? Math.clz32 : lg, Mv = Math.log, Nv = Math.LN2;
  function lg(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Mv(n) / Nv | 0) | 0;
  }
  var ec = 64, Oo = 4194304;
  function zl(n) {
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
  function Ga(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var u = 0, f = n.suspendedLanes, h = n.pingedLanes, C = l & 268435455;
    if (C !== 0) {
      var w = C & ~f;
      w !== 0 ? u = zl(w) : (h &= C, h !== 0 && (u = zl(h)));
    } else C = l & ~f, C !== 0 ? u = zl(C) : h !== 0 && (u = zl(h));
    if (u === 0) return 0;
    if (r !== 0 && r !== u && !(r & f) && (f = u & -u, h = r & -r, f >= h || f === 16 && (h & 4194240) !== 0)) return r;
    if (u & 4 && (u |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= u; 0 < r; ) l = 31 - Ea(r), f = 1 << l, u |= n[l], r &= ~f;
    return u;
  }
  function ld(n, r) {
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
  function tc(n, r) {
    for (var l = n.suspendedLanes, u = n.pingedLanes, f = n.expirationTimes, h = n.pendingLanes; 0 < h; ) {
      var C = 31 - Ea(h), w = 1 << C, O = f[C];
      O === -1 ? (!(w & l) || w & u) && (f[C] = ld(w, r)) : O <= r && (n.expiredLanes |= w), h &= ~w;
    }
  }
  function od(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function nc() {
    var n = ec;
    return ec <<= 1, !(ec & 4194240) && (ec = 64), n;
  }
  function ud(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Fl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Ea(r), n[r] = l;
  }
  function og(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var u = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var f = 31 - Ea(l), h = 1 << f;
      r[f] = 0, u[f] = -1, n[f] = -1, l &= ~h;
    }
  }
  function $u(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var u = 31 - Ea(l), f = 1 << u;
      f & r | n[u] & r && (n[u] |= r), l &= ~f;
    }
  }
  var Qt = 0;
  function sd(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Lv, rc, Gt, Uv, cd, St = !1, Iu = [], Un = null, ba = null, Ta = null, Yu = /* @__PURE__ */ new Map(), In = /* @__PURE__ */ new Map(), qt = [], ug = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function qa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Un = null;
        break;
      case "dragenter":
      case "dragleave":
        ba = null;
        break;
      case "mouseover":
      case "mouseout":
        Ta = null;
        break;
      case "pointerover":
      case "pointerout":
        Yu.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        In.delete(r.pointerId);
    }
  }
  function xr(n, r, l, u, f, h) {
    return n === null || n.nativeEvent !== h ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: u, nativeEvent: h, targetContainers: [f] }, r !== null && (r = ss(r), r !== null && rc(r)), n) : (n.eventSystemFlags |= u, r = n.targetContainers, f !== null && r.indexOf(f) === -1 && r.push(f), n);
  }
  function tl(n, r, l, u, f) {
    switch (r) {
      case "focusin":
        return Un = xr(Un, n, r, l, u, f), !0;
      case "dragenter":
        return ba = xr(ba, n, r, l, u, f), !0;
      case "mouseover":
        return Ta = xr(Ta, n, r, l, u, f), !0;
      case "pointerover":
        var h = f.pointerId;
        return Yu.set(h, xr(Yu.get(h) || null, n, r, l, u, f)), !0;
      case "gotpointercapture":
        return h = f.pointerId, In.set(h, xr(In.get(h) || null, n, r, l, u, f)), !0;
    }
    return !1;
  }
  function zv(n) {
    var r = Ra(n.target);
    if (r !== null) {
      var l = Je(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Mt(l), r !== null) {
            n.blockedOn = r, cd(n.priority, function() {
              Gt(l);
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
  function Ao(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = lc(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var u = new l.constructor(l.type, l);
        Pr = u, l.target.dispatchEvent(u), Pr = null;
      } else return r = ss(l), r !== null && rc(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function fd(n, r, l) {
    Ao(n) && l.delete(r);
  }
  function Fv() {
    St = !1, Un !== null && Ao(Un) && (Un = null), ba !== null && Ao(ba) && (ba = null), Ta !== null && Ao(Ta) && (Ta = null), Yu.forEach(fd), In.forEach(fd);
  }
  function Wu(n, r) {
    n.blockedOn === r && (n.blockedOn = null, St || (St = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, Fv)));
  }
  function Qu(n) {
    function r(f) {
      return Wu(f, n);
    }
    if (0 < Iu.length) {
      Wu(Iu[0], n);
      for (var l = 1; l < Iu.length; l++) {
        var u = Iu[l];
        u.blockedOn === n && (u.blockedOn = null);
      }
    }
    for (Un !== null && Wu(Un, n), ba !== null && Wu(ba, n), Ta !== null && Wu(Ta, n), Yu.forEach(r), In.forEach(r), l = 0; l < qt.length; l++) u = qt[l], u.blockedOn === n && (u.blockedOn = null);
    for (; 0 < qt.length && (l = qt[0], l.blockedOn === null); ) zv(l), l.blockedOn === null && qt.shift();
  }
  var Mo = _e.ReactCurrentBatchConfig, jl = !0;
  function jv(n, r, l, u) {
    var f = Qt, h = Mo.transition;
    Mo.transition = null;
    try {
      Qt = 1, ic(n, r, l, u);
    } finally {
      Qt = f, Mo.transition = h;
    }
  }
  function ac(n, r, l, u) {
    var f = Qt, h = Mo.transition;
    Mo.transition = null;
    try {
      Qt = 4, ic(n, r, l, u);
    } finally {
      Qt = f, Mo.transition = h;
    }
  }
  function ic(n, r, l, u) {
    if (jl) {
      var f = lc(n, r, l, u);
      if (f === null) gc(n, r, u, Gu, l), qa(n, u);
      else if (tl(f, n, r, l, u)) u.stopPropagation();
      else if (qa(n, u), r & 4 && -1 < ug.indexOf(n)) {
        for (; f !== null; ) {
          var h = ss(f);
          if (h !== null && Lv(h), h = lc(n, r, l, u), h === null && gc(n, r, u, Gu, l), h === f) break;
          f = h;
        }
        f !== null && u.stopPropagation();
      } else gc(n, r, u, null, l);
    }
  }
  var Gu = null;
  function lc(n, r, l, u) {
    if (Gu = null, n = rn(u), n = Ra(n), n !== null) if (r = Je(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Mt(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return Gu = n, null;
  }
  function dd(n) {
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
        switch (Tr()) {
          case oa:
            return 1;
          case _t:
            return 4;
          case ui:
          case Ov:
            return 16;
          case id:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var wi = null, qu = null, Ku = null;
  function pd() {
    if (Ku) return Ku;
    var n, r = qu, l = r.length, u, f = "value" in wi ? wi.value : wi.textContent, h = f.length;
    for (n = 0; n < l && r[n] === f[n]; n++) ;
    var C = l - n;
    for (u = 1; u <= C && r[l - u] === f[h - u]; u++) ;
    return Ku = f.slice(n, 1 < u ? 1 - u : void 0);
  }
  function No(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Xu() {
    return !0;
  }
  function Vv() {
    return !1;
  }
  function ua(n) {
    function r(l, u, f, h, C) {
      this._reactName = l, this._targetInst = f, this.type = u, this.nativeEvent = h, this.target = C, this.currentTarget = null;
      for (var w in n) n.hasOwnProperty(w) && (l = n[w], this[w] = l ? l(h) : h[w]);
      return this.isDefaultPrevented = (h.defaultPrevented != null ? h.defaultPrevented : h.returnValue === !1) ? Xu : Vv, this.isPropagationStopped = Vv, this;
    }
    return V(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Xu);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Xu);
    }, persist: function() {
    }, isPersistent: Xu }), r;
  }
  var nl = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, oc = ua(nl), Lo = V({}, nl, { view: 0, detail: 0 }), Hv = ua(Lo), uc, vd, Ju, nr = V({}, Lo, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: gd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Ju && (Ju && n.type === "mousemove" ? (uc = n.screenX - Ju.screenX, vd = n.screenY - Ju.screenY) : vd = uc = 0, Ju = n), uc);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : vd;
  } }), sc = ua(nr), Pv = V({}, nr, { dataTransfer: 0 }), Bv = ua(Pv), sg = V({}, Lo, { relatedTarget: 0 }), rl = ua(sg), hd = V({}, nl, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), $v = ua(hd), cg = V({}, nl, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), fg = ua(cg), dg = V({}, nl, { data: 0 }), md = ua(dg), yd = {
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
  }, Iv = {
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
  }, Yv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Wv(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Yv[n]) ? !!r[n] : !1;
  }
  function gd() {
    return Wv;
  }
  var _i = V({}, Lo, { key: function(n) {
    if (n.key) {
      var r = yd[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = No(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Iv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: gd, charCode: function(n) {
    return n.type === "keypress" ? No(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? No(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), pg = ua(_i), Sd = V({}, nr, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), cc = ua(Sd), Cd = V({}, Lo, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: gd }), vg = ua(Cd), fc = V({}, nl, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Qv = ua(fc), $r = V({}, nr, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ki = ua($r), zn = [9, 13, 27, 32], Ka = D && "CompositionEvent" in window, Vl = null;
  D && "documentMode" in document && (Vl = document.documentMode);
  var dc = D && "TextEvent" in window && !Vl, Gv = D && (!Ka || Vl && 8 < Vl && 11 >= Vl), Uo = " ", qv = !1;
  function Kv(n, r) {
    switch (n) {
      case "keyup":
        return zn.indexOf(r.keyCode) !== -1;
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
  function pc(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var zo = !1;
  function hg(n, r) {
    switch (n) {
      case "compositionend":
        return pc(r);
      case "keypress":
        return r.which !== 32 ? null : (qv = !0, Uo);
      case "textInput":
        return n = r.data, n === Uo && qv ? null : n;
      default:
        return null;
    }
  }
  function mg(n, r) {
    if (zo) return n === "compositionend" || !Ka && Kv(n, r) ? (n = pd(), Ku = qu = wi = null, zo = !1, n) : null;
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
        return Gv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Xv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function Jv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Xv[n.type] : r === "textarea";
  }
  function Zv(n, r, l, u) {
    Ml(u), r = ls(r, "onChange"), 0 < r.length && (l = new oc("onChange", "change", null, l, u), n.push({ event: l, listeners: r }));
  }
  var Zu = null, Fo = null;
  function jo(n) {
    yc(n, 0);
  }
  function Vo(n) {
    var r = Po(n);
    if (Se(r)) return n;
  }
  function eh(n, r) {
    if (n === "change") return r;
  }
  var Ed = !1;
  if (D) {
    var bd;
    if (D) {
      var Td = "oninput" in document;
      if (!Td) {
        var th = document.createElement("div");
        th.setAttribute("oninput", "return;"), Td = typeof th.oninput == "function";
      }
      bd = Td;
    } else bd = !1;
    Ed = bd && (!document.documentMode || 9 < document.documentMode);
  }
  function nh() {
    Zu && (Zu.detachEvent("onpropertychange", rh), Fo = Zu = null);
  }
  function rh(n) {
    if (n.propertyName === "value" && Vo(Fo)) {
      var r = [];
      Zv(r, Fo, n, rn(n)), ko(jo, r);
    }
  }
  function yg(n, r, l) {
    n === "focusin" ? (nh(), Zu = r, Fo = l, Zu.attachEvent("onpropertychange", rh)) : n === "focusout" && nh();
  }
  function gg(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Vo(Fo);
  }
  function Sg(n, r) {
    if (n === "click") return Vo(r);
  }
  function ah(n, r) {
    if (n === "input" || n === "change") return Vo(r);
  }
  function Cg(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var xa = typeof Object.is == "function" ? Object.is : Cg;
  function es(n, r) {
    if (xa(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), u = Object.keys(r);
    if (l.length !== u.length) return !1;
    for (u = 0; u < l.length; u++) {
      var f = l[u];
      if (!U.call(r, f) || !xa(n[f], r[f])) return !1;
    }
    return !0;
  }
  function ih(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function lh(n, r) {
    var l = ih(n);
    n = 0;
    for (var u; l; ) {
      if (l.nodeType === 3) {
        if (u = n + l.textContent.length, n <= r && u >= r) return { node: l, offset: r - n };
        n = u;
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
      l = ih(l);
    }
  }
  function oh(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? oh(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function vc() {
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
  function Di(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function hc(n) {
    var r = vc(), l = n.focusedElem, u = n.selectionRange;
    if (r !== l && l && l.ownerDocument && oh(l.ownerDocument.documentElement, l)) {
      if (u !== null && Di(l)) {
        if (r = u.start, n = u.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var f = l.textContent.length, h = Math.min(u.start, f);
          u = u.end === void 0 ? h : Math.min(u.end, f), !n.extend && h > u && (f = u, u = h, h = f), f = lh(l, h);
          var C = lh(
            l,
            u
          );
          f && C && (n.rangeCount !== 1 || n.anchorNode !== f.node || n.anchorOffset !== f.offset || n.focusNode !== C.node || n.focusOffset !== C.offset) && (r = r.createRange(), r.setStart(f.node, f.offset), n.removeAllRanges(), h > u ? (n.addRange(r), n.extend(C.node, C.offset)) : (r.setEnd(C.node, C.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var uh = D && "documentMode" in document && 11 >= document.documentMode, Xa = null, xd = null, ts = null, Rd = !1;
  function sh(n, r, l) {
    var u = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Rd || Xa == null || Xa !== Ft(u) || (u = Xa, "selectionStart" in u && Di(u) ? u = { start: u.selectionStart, end: u.selectionEnd } : (u = (u.ownerDocument && u.ownerDocument.defaultView || window).getSelection(), u = { anchorNode: u.anchorNode, anchorOffset: u.anchorOffset, focusNode: u.focusNode, focusOffset: u.focusOffset }), ts && es(ts, u) || (ts = u, u = ls(xd, "onSelect"), 0 < u.length && (r = new oc("onSelect", "select", null, r, l), n.push({ event: r, listeners: u }), r.target = Xa)));
  }
  function mc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var Hl = { animationend: mc("Animation", "AnimationEnd"), animationiteration: mc("Animation", "AnimationIteration"), animationstart: mc("Animation", "AnimationStart"), transitionend: mc("Transition", "TransitionEnd") }, wd = {}, _d = {};
  D && (_d = document.createElement("div").style, "AnimationEvent" in window || (delete Hl.animationend.animation, delete Hl.animationiteration.animation, delete Hl.animationstart.animation), "TransitionEvent" in window || delete Hl.transitionend.transition);
  function rr(n) {
    if (wd[n]) return wd[n];
    if (!Hl[n]) return n;
    var r = Hl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in _d) return wd[n] = r[l];
    return n;
  }
  var kd = rr("animationend"), ch = rr("animationiteration"), fh = rr("animationstart"), dh = rr("transitionend"), ph = /* @__PURE__ */ new Map(), vh = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Oi(n, r) {
    ph.set(n, r), E(r, [n]);
  }
  for (var ns = 0; ns < vh.length; ns++) {
    var Pl = vh[ns], Eg = Pl.toLowerCase(), rs = Pl[0].toUpperCase() + Pl.slice(1);
    Oi(Eg, "on" + rs);
  }
  Oi(kd, "onAnimationEnd"), Oi(ch, "onAnimationIteration"), Oi(fh, "onAnimationStart"), Oi("dblclick", "onDoubleClick"), Oi("focusin", "onFocus"), Oi("focusout", "onBlur"), Oi(dh, "onTransitionEnd"), y("onMouseEnter", ["mouseout", "mouseover"]), y("onMouseLeave", ["mouseout", "mouseover"]), y("onPointerEnter", ["pointerout", "pointerover"]), y("onPointerLeave", ["pointerout", "pointerover"]), E("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), E("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), E("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), E("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), E("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), E("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var as = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), bg = new Set("cancel close invalid load scroll toggle".split(" ").concat(as));
  function hh(n, r, l) {
    var u = n.type || "unknown-event";
    n.currentTarget = l, Te(u, r, void 0, n), n.currentTarget = null;
  }
  function yc(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var u = n[l], f = u.event;
      u = u.listeners;
      e: {
        var h = void 0;
        if (r) for (var C = u.length - 1; 0 <= C; C--) {
          var w = u[C], O = w.instance, Y = w.currentTarget;
          if (w = w.listener, O !== h && f.isPropagationStopped()) break e;
          hh(f, w, Y), h = O;
        }
        else for (C = 0; C < u.length; C++) {
          if (w = u[C], O = w.instance, Y = w.currentTarget, w = w.listener, O !== h && f.isPropagationStopped()) break e;
          hh(f, w, Y), h = O;
        }
      }
    }
    if (Zi) throw n = Ul, Zi = !1, Ul = null, n;
  }
  function tn(n, r) {
    var l = r[Ud];
    l === void 0 && (l = r[Ud] = /* @__PURE__ */ new Set());
    var u = n + "__bubble";
    l.has(u) || (mh(r, n, 2, !1), l.add(u));
  }
  function al(n, r, l) {
    var u = 0;
    r && (u |= 4), mh(l, n, u, r);
  }
  var Ai = "_reactListening" + Math.random().toString(36).slice(2);
  function Ho(n) {
    if (!n[Ai]) {
      n[Ai] = !0, S.forEach(function(l) {
        l !== "selectionchange" && (bg.has(l) || al(l, !1, n), al(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[Ai] || (r[Ai] = !0, al("selectionchange", !1, r));
    }
  }
  function mh(n, r, l, u) {
    switch (dd(r)) {
      case 1:
        var f = jv;
        break;
      case 4:
        f = ac;
        break;
      default:
        f = ic;
    }
    l = f.bind(null, r, l, n), f = void 0, !Do || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (f = !0), u ? f !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: f }) : n.addEventListener(r, l, !0) : f !== void 0 ? n.addEventListener(r, l, { passive: f }) : n.addEventListener(r, l, !1);
  }
  function gc(n, r, l, u, f) {
    var h = u;
    if (!(r & 1) && !(r & 2) && u !== null) e: for (; ; ) {
      if (u === null) return;
      var C = u.tag;
      if (C === 3 || C === 4) {
        var w = u.stateNode.containerInfo;
        if (w === f || w.nodeType === 8 && w.parentNode === f) break;
        if (C === 4) for (C = u.return; C !== null; ) {
          var O = C.tag;
          if ((O === 3 || O === 4) && (O = C.stateNode.containerInfo, O === f || O.nodeType === 8 && O.parentNode === f)) return;
          C = C.return;
        }
        for (; w !== null; ) {
          if (C = Ra(w), C === null) return;
          if (O = C.tag, O === 5 || O === 6) {
            u = h = C;
            continue e;
          }
          w = w.parentNode;
        }
      }
      u = u.return;
    }
    ko(function() {
      var Y = h, le = rn(l), ce = [];
      e: {
        var ie = ph.get(n);
        if (ie !== void 0) {
          var Oe = oc, je = n;
          switch (n) {
            case "keypress":
              if (No(l) === 0) break e;
            case "keydown":
            case "keyup":
              Oe = pg;
              break;
            case "focusin":
              je = "focus", Oe = rl;
              break;
            case "focusout":
              je = "blur", Oe = rl;
              break;
            case "beforeblur":
            case "afterblur":
              Oe = rl;
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
              Oe = sc;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Oe = Bv;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Oe = vg;
              break;
            case kd:
            case ch:
            case fh:
              Oe = $v;
              break;
            case dh:
              Oe = Qv;
              break;
            case "scroll":
              Oe = Hv;
              break;
            case "wheel":
              Oe = ki;
              break;
            case "copy":
            case "cut":
            case "paste":
              Oe = fg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Oe = cc;
          }
          var Be = (r & 4) !== 0, Nn = !Be && n === "scroll", F = Be ? ie !== null ? ie + "Capture" : null : ie;
          Be = [];
          for (var N = Y, $; N !== null; ) {
            $ = N;
            var me = $.stateNode;
            if ($.tag === 5 && me !== null && ($ = me, F !== null && (me = Ll(N, F), me != null && Be.push(is(N, me, $)))), Nn) break;
            N = N.return;
          }
          0 < Be.length && (ie = new Oe(ie, je, null, l, le), ce.push({ event: ie, listeners: Be }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (ie = n === "mouseover" || n === "pointerover", Oe = n === "mouseout" || n === "pointerout", ie && l !== Pr && (je = l.relatedTarget || l.fromElement) && (Ra(je) || je[Mi])) break e;
          if ((Oe || ie) && (ie = le.window === le ? le : (ie = le.ownerDocument) ? ie.defaultView || ie.parentWindow : window, Oe ? (je = l.relatedTarget || l.toElement, Oe = Y, je = je ? Ra(je) : null, je !== null && (Nn = Je(je), je !== Nn || je.tag !== 5 && je.tag !== 6) && (je = null)) : (Oe = null, je = Y), Oe !== je)) {
            if (Be = sc, me = "onMouseLeave", F = "onMouseEnter", N = "mouse", (n === "pointerout" || n === "pointerover") && (Be = cc, me = "onPointerLeave", F = "onPointerEnter", N = "pointer"), Nn = Oe == null ? ie : Po(Oe), $ = je == null ? ie : Po(je), ie = new Be(me, N + "leave", Oe, l, le), ie.target = Nn, ie.relatedTarget = $, me = null, Ra(le) === Y && (Be = new Be(F, N + "enter", je, l, le), Be.target = $, Be.relatedTarget = Nn, me = Be), Nn = me, Oe && je) t: {
              for (Be = Oe, F = je, N = 0, $ = Be; $; $ = Bl($)) N++;
              for ($ = 0, me = F; me; me = Bl(me)) $++;
              for (; 0 < N - $; ) Be = Bl(Be), N--;
              for (; 0 < $ - N; ) F = Bl(F), $--;
              for (; N--; ) {
                if (Be === F || F !== null && Be === F.alternate) break t;
                Be = Bl(Be), F = Bl(F);
              }
              Be = null;
            }
            else Be = null;
            Oe !== null && Dd(ce, ie, Oe, Be, !1), je !== null && Nn !== null && Dd(ce, Nn, je, Be, !0);
          }
        }
        e: {
          if (ie = Y ? Po(Y) : window, Oe = ie.nodeName && ie.nodeName.toLowerCase(), Oe === "select" || Oe === "input" && ie.type === "file") var We = eh;
          else if (Jv(ie)) if (Ed) We = ah;
          else {
            We = gg;
            var it = yg;
          }
          else (Oe = ie.nodeName) && Oe.toLowerCase() === "input" && (ie.type === "checkbox" || ie.type === "radio") && (We = Sg);
          if (We && (We = We(n, Y))) {
            Zv(ce, We, l, le);
            break e;
          }
          it && it(n, ie, Y), n === "focusout" && (it = ie._wrapperState) && it.controlled && ie.type === "number" && B(ie, "number", ie.value);
        }
        switch (it = Y ? Po(Y) : window, n) {
          case "focusin":
            (Jv(it) || it.contentEditable === "true") && (Xa = it, xd = Y, ts = null);
            break;
          case "focusout":
            ts = xd = Xa = null;
            break;
          case "mousedown":
            Rd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Rd = !1, sh(ce, l, le);
            break;
          case "selectionchange":
            if (uh) break;
          case "keydown":
          case "keyup":
            sh(ce, l, le);
        }
        var Ve;
        if (Ka) e: {
          switch (n) {
            case "compositionstart":
              var lt = "onCompositionStart";
              break e;
            case "compositionend":
              lt = "onCompositionEnd";
              break e;
            case "compositionupdate":
              lt = "onCompositionUpdate";
              break e;
          }
          lt = void 0;
        }
        else zo ? Kv(n, l) && (lt = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (lt = "onCompositionStart");
        lt && (Gv && l.locale !== "ko" && (zo || lt !== "onCompositionStart" ? lt === "onCompositionEnd" && zo && (Ve = pd()) : (wi = le, qu = "value" in wi ? wi.value : wi.textContent, zo = !0)), it = ls(Y, lt), 0 < it.length && (lt = new md(lt, n, null, l, le), ce.push({ event: lt, listeners: it }), Ve ? lt.data = Ve : (Ve = pc(l), Ve !== null && (lt.data = Ve)))), (Ve = dc ? hg(n, l) : mg(n, l)) && (Y = ls(Y, "onBeforeInput"), 0 < Y.length && (le = new md("onBeforeInput", "beforeinput", null, l, le), ce.push({ event: le, listeners: Y }), le.data = Ve));
      }
      yc(ce, r);
    });
  }
  function is(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function ls(n, r) {
    for (var l = r + "Capture", u = []; n !== null; ) {
      var f = n, h = f.stateNode;
      f.tag === 5 && h !== null && (f = h, h = Ll(n, l), h != null && u.unshift(is(n, h, f)), h = Ll(n, r), h != null && u.push(is(n, h, f))), n = n.return;
    }
    return u;
  }
  function Bl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Dd(n, r, l, u, f) {
    for (var h = r._reactName, C = []; l !== null && l !== u; ) {
      var w = l, O = w.alternate, Y = w.stateNode;
      if (O !== null && O === u) break;
      w.tag === 5 && Y !== null && (w = Y, f ? (O = Ll(l, h), O != null && C.unshift(is(l, O, w))) : f || (O = Ll(l, h), O != null && C.push(is(l, O, w)))), l = l.return;
    }
    C.length !== 0 && n.push({ event: r, listeners: C });
  }
  var Od = /\r\n?/g, Tg = /\u0000|\uFFFD/g;
  function Ad(n) {
    return (typeof n == "string" ? n : "" + n).replace(Od, `
`).replace(Tg, "");
  }
  function Sc(n, r, l) {
    if (r = Ad(r), Ad(n) !== r && l) throw Error(p(425));
  }
  function Cc() {
  }
  var Md = null, $l = null;
  function os(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Il = typeof setTimeout == "function" ? setTimeout : void 0, yh = typeof clearTimeout == "function" ? clearTimeout : void 0, Nd = typeof Promise == "function" ? Promise : void 0, Ld = typeof queueMicrotask == "function" ? queueMicrotask : typeof Nd < "u" ? function(n) {
    return Nd.resolve(null).then(n).catch(xg);
  } : Il;
  function xg(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function il(n, r) {
    var l = r, u = 0;
    do {
      var f = l.nextSibling;
      if (n.removeChild(l), f && f.nodeType === 8) if (l = f.data, l === "/$") {
        if (u === 0) {
          n.removeChild(f), Qu(r);
          return;
        }
        u--;
      } else l !== "$" && l !== "$?" && l !== "$!" || u++;
      l = f;
    } while (l);
    Qu(r);
  }
  function Ja(n) {
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
  function us(n) {
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
  var ll = Math.random().toString(36).slice(2), si = "__reactFiber$" + ll, Yl = "__reactProps$" + ll, Mi = "__reactContainer$" + ll, Ud = "__reactEvents$" + ll, Rg = "__reactListeners$" + ll, zd = "__reactHandles$" + ll;
  function Ra(n) {
    var r = n[si];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Mi] || l[si]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = us(n); n !== null; ) {
          if (l = n[si]) return l;
          n = us(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function ss(n) {
    return n = n[si] || n[Mi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function Po(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(p(33));
  }
  function tt(n) {
    return n[Yl] || null;
  }
  var ol = [], un = -1;
  function Et(n) {
    return { current: n };
  }
  function Bt(n) {
    0 > un || (n.current = ol[un], ol[un] = null, un--);
  }
  function Yt(n, r) {
    un++, ol[un] = n.current, n.current = r;
  }
  var ci = {}, ft = Et(ci), Tn = Et(!1), Ir = ci;
  function wa(n, r) {
    var l = n.type.contextTypes;
    if (!l) return ci;
    var u = n.stateNode;
    if (u && u.__reactInternalMemoizedUnmaskedChildContext === r) return u.__reactInternalMemoizedMaskedChildContext;
    var f = {}, h;
    for (h in l) f[h] = r[h];
    return u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = f), f;
  }
  function hn(n) {
    return n = n.childContextTypes, n != null;
  }
  function _a() {
    Bt(Tn), Bt(ft);
  }
  function ul(n, r, l) {
    if (ft.current !== ci) throw Error(p(168));
    Yt(ft, r), Yt(Tn, l);
  }
  function cs(n, r, l) {
    var u = n.stateNode;
    if (r = r.childContextTypes, typeof u.getChildContext != "function") return l;
    u = u.getChildContext();
    for (var f in u) if (!(f in r)) throw Error(p(108, at(n) || "Unknown", f));
    return V({}, l, u);
  }
  function Ec(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || ci, Ir = ft.current, Yt(ft, n), Yt(Tn, Tn.current), !0;
  }
  function gh(n, r, l) {
    var u = n.stateNode;
    if (!u) throw Error(p(169));
    l ? (n = cs(n, r, Ir), u.__reactInternalMemoizedMergedChildContext = n, Bt(Tn), Bt(ft), Yt(ft, n)) : Bt(Tn), Yt(Tn, l);
  }
  var sa = null, ar = !1, fs = !1;
  function Fd(n) {
    sa === null ? sa = [n] : sa.push(n);
  }
  function jd(n) {
    ar = !0, Fd(n);
  }
  function Yr() {
    if (!fs && sa !== null) {
      fs = !0;
      var n = 0, r = Qt;
      try {
        var l = sa;
        for (Qt = 1; n < l.length; n++) {
          var u = l[n];
          do
            u = u(!0);
          while (u !== null);
        }
        sa = null, ar = !1;
      } catch (f) {
        throw sa !== null && (sa = sa.slice(n + 1)), on(oa, Yr), f;
      } finally {
        Qt = r, fs = !1;
      }
    }
    return null;
  }
  var sl = [], Wr = 0, Wl = null, Bo = 0, Qr = [], Rr = 0, ka = null, fr = 1, Ni = "";
  function ca(n, r) {
    sl[Wr++] = Bo, sl[Wr++] = Wl, Wl = n, Bo = r;
  }
  function Vd(n, r, l) {
    Qr[Rr++] = fr, Qr[Rr++] = Ni, Qr[Rr++] = ka, ka = n;
    var u = fr;
    n = Ni;
    var f = 32 - Ea(u) - 1;
    u &= ~(1 << f), l += 1;
    var h = 32 - Ea(r) + f;
    if (30 < h) {
      var C = f - f % 5;
      h = (u & (1 << C) - 1).toString(32), u >>= C, f -= C, fr = 1 << 32 - Ea(r) + f | l << f | u, Ni = h + n;
    } else fr = 1 << h | l << f | u, Ni = n;
  }
  function bc(n) {
    n.return !== null && (ca(n, 1), Vd(n, 1, 0));
  }
  function Hd(n) {
    for (; n === Wl; ) Wl = sl[--Wr], sl[Wr] = null, Bo = sl[--Wr], sl[Wr] = null;
    for (; n === ka; ) ka = Qr[--Rr], Qr[Rr] = null, Ni = Qr[--Rr], Qr[Rr] = null, fr = Qr[--Rr], Qr[Rr] = null;
  }
  var fa = null, Gr = null, sn = !1, Da = null;
  function Pd(n, r) {
    var l = Fa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Sh(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, fa = n, Gr = Ja(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, fa = n, Gr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = ka !== null ? { id: fr, overflow: Ni } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Fa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, fa = n, Gr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function Tc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function xc(n) {
    if (sn) {
      var r = Gr;
      if (r) {
        var l = r;
        if (!Sh(n, r)) {
          if (Tc(n)) throw Error(p(418));
          r = Ja(l.nextSibling);
          var u = fa;
          r && Sh(n, r) ? Pd(u, l) : (n.flags = n.flags & -4097 | 2, sn = !1, fa = n);
        }
      } else {
        if (Tc(n)) throw Error(p(418));
        n.flags = n.flags & -4097 | 2, sn = !1, fa = n;
      }
    }
  }
  function Ch(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    fa = n;
  }
  function Rc(n) {
    if (n !== fa) return !1;
    if (!sn) return Ch(n), sn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !os(n.type, n.memoizedProps)), r && (r = Gr)) {
      if (Tc(n)) throw Eh(), Error(p(418));
      for (; r; ) Pd(n, r), r = Ja(r.nextSibling);
    }
    if (Ch(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(p(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Gr = Ja(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Gr = null;
      }
    } else Gr = fa ? Ja(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Eh() {
    for (var n = Gr; n; ) n = Ja(n.nextSibling);
  }
  function Sn() {
    Gr = fa = null, sn = !1;
  }
  function Bd(n) {
    Da === null ? Da = [n] : Da.push(n);
  }
  var wc = _e.ReactCurrentBatchConfig;
  function Ql(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(p(309));
          var u = l.stateNode;
        }
        if (!u) throw Error(p(147, n));
        var f = u, h = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === h ? r.ref : (r = function(C) {
          var w = f.refs;
          C === null ? delete w[h] : w[h] = C;
        }, r._stringRef = h, r);
      }
      if (typeof n != "string") throw Error(p(284));
      if (!l._owner) throw Error(p(290, n));
    }
    return n;
  }
  function fi(n, r) {
    throw n = Object.prototype.toString.call(r), Error(p(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function bh(n) {
    var r = n._init;
    return r(n._payload);
  }
  function _c(n) {
    function r(F, N) {
      if (n) {
        var $ = F.deletions;
        $ === null ? (F.deletions = [N], F.flags |= 16) : $.push(N);
      }
    }
    function l(F, N) {
      if (!n) return null;
      for (; N !== null; ) r(F, N), N = N.sibling;
      return null;
    }
    function u(F, N) {
      for (F = /* @__PURE__ */ new Map(); N !== null; ) N.key !== null ? F.set(N.key, N) : F.set(N.index, N), N = N.sibling;
      return F;
    }
    function f(F, N) {
      return F = yl(F, N), F.index = 0, F.sibling = null, F;
    }
    function h(F, N, $) {
      return F.index = $, n ? ($ = F.alternate, $ !== null ? ($ = $.index, $ < N ? (F.flags |= 2, N) : $) : (F.flags |= 2, N)) : (F.flags |= 1048576, N);
    }
    function C(F) {
      return n && F.alternate === null && (F.flags |= 2), F;
    }
    function w(F, N, $, me) {
      return N === null || N.tag !== 6 ? (N = hf($, F.mode, me), N.return = F, N) : (N = f(N, $), N.return = F, N);
    }
    function O(F, N, $, me) {
      var We = $.type;
      return We === Ke ? le(F, N, $.props.children, me, $.key) : N !== null && (N.elementType === We || typeof We == "object" && We !== null && We.$$typeof === ct && bh(We) === N.type) ? (me = f(N, $.props), me.ref = Ql(F, N, $), me.return = F, me) : (me = pf($.type, $.key, $.props, null, F.mode, me), me.ref = Ql(F, N, $), me.return = F, me);
    }
    function Y(F, N, $, me) {
      return N === null || N.tag !== 4 || N.stateNode.containerInfo !== $.containerInfo || N.stateNode.implementation !== $.implementation ? (N = Ds($, F.mode, me), N.return = F, N) : (N = f(N, $.children || []), N.return = F, N);
    }
    function le(F, N, $, me, We) {
      return N === null || N.tag !== 7 ? (N = uo($, F.mode, me, We), N.return = F, N) : (N = f(N, $), N.return = F, N);
    }
    function ce(F, N, $) {
      if (typeof N == "string" && N !== "" || typeof N == "number") return N = hf("" + N, F.mode, $), N.return = F, N;
      if (typeof N == "object" && N !== null) {
        switch (N.$$typeof) {
          case Q:
            return $ = pf(N.type, N.key, N.props, null, F.mode, $), $.ref = Ql(F, null, N), $.return = F, $;
          case ot:
            return N = Ds(N, F.mode, $), N.return = F, N;
          case ct:
            var me = N._init;
            return ce(F, me(N._payload), $);
        }
        if (K(N) || Pe(N)) return N = uo(N, F.mode, $, null), N.return = F, N;
        fi(F, N);
      }
      return null;
    }
    function ie(F, N, $, me) {
      var We = N !== null ? N.key : null;
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") return We !== null ? null : w(F, N, "" + $, me);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case Q:
            return $.key === We ? O(F, N, $, me) : null;
          case ot:
            return $.key === We ? Y(F, N, $, me) : null;
          case ct:
            return We = $._init, ie(
              F,
              N,
              We($._payload),
              me
            );
        }
        if (K($) || Pe($)) return We !== null ? null : le(F, N, $, me, null);
        fi(F, $);
      }
      return null;
    }
    function Oe(F, N, $, me, We) {
      if (typeof me == "string" && me !== "" || typeof me == "number") return F = F.get($) || null, w(N, F, "" + me, We);
      if (typeof me == "object" && me !== null) {
        switch (me.$$typeof) {
          case Q:
            return F = F.get(me.key === null ? $ : me.key) || null, O(N, F, me, We);
          case ot:
            return F = F.get(me.key === null ? $ : me.key) || null, Y(N, F, me, We);
          case ct:
            var it = me._init;
            return Oe(F, N, $, it(me._payload), We);
        }
        if (K(me) || Pe(me)) return F = F.get($) || null, le(N, F, me, We, null);
        fi(N, me);
      }
      return null;
    }
    function je(F, N, $, me) {
      for (var We = null, it = null, Ve = N, lt = N = 0, qn = null; Ve !== null && lt < $.length; lt++) {
        Ve.index > lt ? (qn = Ve, Ve = null) : qn = Ve.sibling;
        var jt = ie(F, Ve, $[lt], me);
        if (jt === null) {
          Ve === null && (Ve = qn);
          break;
        }
        n && Ve && jt.alternate === null && r(F, Ve), N = h(jt, N, lt), it === null ? We = jt : it.sibling = jt, it = jt, Ve = qn;
      }
      if (lt === $.length) return l(F, Ve), sn && ca(F, lt), We;
      if (Ve === null) {
        for (; lt < $.length; lt++) Ve = ce(F, $[lt], me), Ve !== null && (N = h(Ve, N, lt), it === null ? We = Ve : it.sibling = Ve, it = Ve);
        return sn && ca(F, lt), We;
      }
      for (Ve = u(F, Ve); lt < $.length; lt++) qn = Oe(Ve, F, lt, $[lt], me), qn !== null && (n && qn.alternate !== null && Ve.delete(qn.key === null ? lt : qn.key), N = h(qn, N, lt), it === null ? We = qn : it.sibling = qn, it = qn);
      return n && Ve.forEach(function(Hi) {
        return r(F, Hi);
      }), sn && ca(F, lt), We;
    }
    function Be(F, N, $, me) {
      var We = Pe($);
      if (typeof We != "function") throw Error(p(150));
      if ($ = We.call($), $ == null) throw Error(p(151));
      for (var it = We = null, Ve = N, lt = N = 0, qn = null, jt = $.next(); Ve !== null && !jt.done; lt++, jt = $.next()) {
        Ve.index > lt ? (qn = Ve, Ve = null) : qn = Ve.sibling;
        var Hi = ie(F, Ve, jt.value, me);
        if (Hi === null) {
          Ve === null && (Ve = qn);
          break;
        }
        n && Ve && Hi.alternate === null && r(F, Ve), N = h(Hi, N, lt), it === null ? We = Hi : it.sibling = Hi, it = Hi, Ve = qn;
      }
      if (jt.done) return l(
        F,
        Ve
      ), sn && ca(F, lt), We;
      if (Ve === null) {
        for (; !jt.done; lt++, jt = $.next()) jt = ce(F, jt.value, me), jt !== null && (N = h(jt, N, lt), it === null ? We = jt : it.sibling = jt, it = jt);
        return sn && ca(F, lt), We;
      }
      for (Ve = u(F, Ve); !jt.done; lt++, jt = $.next()) jt = Oe(Ve, F, lt, jt.value, me), jt !== null && (n && jt.alternate !== null && Ve.delete(jt.key === null ? lt : jt.key), N = h(jt, N, lt), it === null ? We = jt : it.sibling = jt, it = jt);
      return n && Ve.forEach(function($g) {
        return r(F, $g);
      }), sn && ca(F, lt), We;
    }
    function Nn(F, N, $, me) {
      if (typeof $ == "object" && $ !== null && $.type === Ke && $.key === null && ($ = $.props.children), typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case Q:
            e: {
              for (var We = $.key, it = N; it !== null; ) {
                if (it.key === We) {
                  if (We = $.type, We === Ke) {
                    if (it.tag === 7) {
                      l(F, it.sibling), N = f(it, $.props.children), N.return = F, F = N;
                      break e;
                    }
                  } else if (it.elementType === We || typeof We == "object" && We !== null && We.$$typeof === ct && bh(We) === it.type) {
                    l(F, it.sibling), N = f(it, $.props), N.ref = Ql(F, it, $), N.return = F, F = N;
                    break e;
                  }
                  l(F, it);
                  break;
                } else r(F, it);
                it = it.sibling;
              }
              $.type === Ke ? (N = uo($.props.children, F.mode, me, $.key), N.return = F, F = N) : (me = pf($.type, $.key, $.props, null, F.mode, me), me.ref = Ql(F, N, $), me.return = F, F = me);
            }
            return C(F);
          case ot:
            e: {
              for (it = $.key; N !== null; ) {
                if (N.key === it) if (N.tag === 4 && N.stateNode.containerInfo === $.containerInfo && N.stateNode.implementation === $.implementation) {
                  l(F, N.sibling), N = f(N, $.children || []), N.return = F, F = N;
                  break e;
                } else {
                  l(F, N);
                  break;
                }
                else r(F, N);
                N = N.sibling;
              }
              N = Ds($, F.mode, me), N.return = F, F = N;
            }
            return C(F);
          case ct:
            return it = $._init, Nn(F, N, it($._payload), me);
        }
        if (K($)) return je(F, N, $, me);
        if (Pe($)) return Be(F, N, $, me);
        fi(F, $);
      }
      return typeof $ == "string" && $ !== "" || typeof $ == "number" ? ($ = "" + $, N !== null && N.tag === 6 ? (l(F, N.sibling), N = f(N, $), N.return = F, F = N) : (l(F, N), N = hf($, F.mode, me), N.return = F, F = N), C(F)) : l(F, N);
    }
    return Nn;
  }
  var $o = _c(!0), Th = _c(!1), Li = Et(null), Yn = null, xe = null, Oa = null;
  function da() {
    Oa = xe = Yn = null;
  }
  function $d(n) {
    var r = Li.current;
    Bt(Li), n._currentValue = r;
  }
  function Id(n, r, l) {
    for (; n !== null; ) {
      var u = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, u !== null && (u.childLanes |= r)) : u !== null && (u.childLanes & r) !== r && (u.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function Io(n, r) {
    Yn = n, Oa = xe = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Xr = !0), n.firstContext = null);
  }
  function Aa(n) {
    var r = n._currentValue;
    if (Oa !== n) if (n = { context: n, memoizedValue: r, next: null }, xe === null) {
      if (Yn === null) throw Error(p(308));
      xe = n, Yn.dependencies = { lanes: 0, firstContext: n };
    } else xe = xe.next = n;
    return r;
  }
  var Gl = null;
  function Fn(n) {
    Gl === null ? Gl = [n] : Gl.push(n);
  }
  function xh(n, r, l, u) {
    var f = r.interleaved;
    return f === null ? (l.next = l, Fn(r)) : (l.next = f.next, f.next = l), r.interleaved = l, Ui(n, u);
  }
  function Ui(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var cl = !1;
  function kc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Yo(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function qr(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function fl(n, r, l) {
    var u = n.updateQueue;
    if (u === null) return null;
    if (u = u.shared, Dt & 2) {
      var f = u.pending;
      return f === null ? r.next = r : (r.next = f.next, f.next = r), u.pending = r, Ui(n, l);
    }
    return f = u.interleaved, f === null ? (r.next = r, Fn(u)) : (r.next = f.next, f.next = r), u.interleaved = r, Ui(n, l);
  }
  function Dc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var u = r.lanes;
      u &= n.pendingLanes, l |= u, r.lanes = l, $u(n, l);
    }
  }
  function Rh(n, r) {
    var l = n.updateQueue, u = n.alternate;
    if (u !== null && (u = u.updateQueue, l === u)) {
      var f = null, h = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var C = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          h === null ? f = h = C : h = h.next = C, l = l.next;
        } while (l !== null);
        h === null ? f = h = r : h = h.next = r;
      } else f = h = r;
      l = { baseState: u.baseState, firstBaseUpdate: f, lastBaseUpdate: h, shared: u.shared, effects: u.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function Oc(n, r, l, u) {
    var f = n.updateQueue;
    cl = !1;
    var h = f.firstBaseUpdate, C = f.lastBaseUpdate, w = f.shared.pending;
    if (w !== null) {
      f.shared.pending = null;
      var O = w, Y = O.next;
      O.next = null, C === null ? h = Y : C.next = Y, C = O;
      var le = n.alternate;
      le !== null && (le = le.updateQueue, w = le.lastBaseUpdate, w !== C && (w === null ? le.firstBaseUpdate = Y : w.next = Y, le.lastBaseUpdate = O));
    }
    if (h !== null) {
      var ce = f.baseState;
      C = 0, le = Y = O = null, w = h;
      do {
        var ie = w.lane, Oe = w.eventTime;
        if ((u & ie) === ie) {
          le !== null && (le = le.next = {
            eventTime: Oe,
            lane: 0,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null
          });
          e: {
            var je = n, Be = w;
            switch (ie = r, Oe = l, Be.tag) {
              case 1:
                if (je = Be.payload, typeof je == "function") {
                  ce = je.call(Oe, ce, ie);
                  break e;
                }
                ce = je;
                break e;
              case 3:
                je.flags = je.flags & -65537 | 128;
              case 0:
                if (je = Be.payload, ie = typeof je == "function" ? je.call(Oe, ce, ie) : je, ie == null) break e;
                ce = V({}, ce, ie);
                break e;
              case 2:
                cl = !0;
            }
          }
          w.callback !== null && w.lane !== 0 && (n.flags |= 64, ie = f.effects, ie === null ? f.effects = [w] : ie.push(w));
        } else Oe = { eventTime: Oe, lane: ie, tag: w.tag, payload: w.payload, callback: w.callback, next: null }, le === null ? (Y = le = Oe, O = ce) : le = le.next = Oe, C |= ie;
        if (w = w.next, w === null) {
          if (w = f.shared.pending, w === null) break;
          ie = w, w = ie.next, ie.next = null, f.lastBaseUpdate = ie, f.shared.pending = null;
        }
      } while (!0);
      if (le === null && (O = ce), f.baseState = O, f.firstBaseUpdate = Y, f.lastBaseUpdate = le, r = f.shared.interleaved, r !== null) {
        f = r;
        do
          C |= f.lane, f = f.next;
        while (f !== r);
      } else h === null && (f.shared.lanes = 0);
      ao |= C, n.lanes = C, n.memoizedState = ce;
    }
  }
  function wh(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var u = n[r], f = u.callback;
      if (f !== null) {
        if (u.callback = null, u = l, typeof f != "function") throw Error(p(191, f));
        f.call(u);
      }
    }
  }
  var ds = {}, Za = Et(ds), Wo = Et(ds), ps = Et(ds);
  function ql(n) {
    if (n === ds) throw Error(p(174));
    return n;
  }
  function Yd(n, r) {
    switch (Yt(ps, r), Yt(Wo, n), Yt(Za, ds), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Rt(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Rt(r, n);
    }
    Bt(Za), Yt(Za, r);
  }
  function Qo() {
    Bt(Za), Bt(Wo), Bt(ps);
  }
  function _h(n) {
    ql(ps.current);
    var r = ql(Za.current), l = Rt(r, n.type);
    r !== l && (Yt(Wo, n), Yt(Za, l));
  }
  function Wd(n) {
    Wo.current === n && (Bt(Za), Bt(Wo));
  }
  var mn = Et(0);
  function Ac(n) {
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
  var Mc = [];
  function Qd() {
    for (var n = 0; n < Mc.length; n++) Mc[n]._workInProgressVersionPrimary = null;
    Mc.length = 0;
  }
  var Nc = _e.ReactCurrentDispatcher, vs = _e.ReactCurrentBatchConfig, Ye = 0, Ge = null, dt = null, kt = null, pa = !1, Go = !1, hs = 0, wg = 0;
  function wr() {
    throw Error(p(321));
  }
  function ms(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!xa(n[l], r[l])) return !1;
    return !0;
  }
  function ae(n, r, l, u, f, h) {
    if (Ye = h, Ge = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, Nc.current = n === null || n.memoizedState === null ? _g : ln, n = l(u, f), Go) {
      h = 0;
      do {
        if (Go = !1, hs = 0, 25 <= h) throw Error(p(301));
        h += 1, kt = dt = null, r.updateQueue = null, Nc.current = Gc, n = l(u, f);
      } while (Go);
    }
    if (Nc.current = _r, r = dt !== null && dt.next !== null, Ye = 0, kt = dt = Ge = null, pa = !1, r) throw Error(p(300));
    return n;
  }
  function jn() {
    var n = hs !== 0;
    return hs = 0, n;
  }
  function Ze() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return kt === null ? Ge.memoizedState = kt = n : kt = kt.next = n, kt;
  }
  function dr() {
    if (dt === null) {
      var n = Ge.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = dt.next;
    var r = kt === null ? Ge.memoizedState : kt.next;
    if (r !== null) kt = r, dt = n;
    else {
      if (n === null) throw Error(p(310));
      dt = n, n = { memoizedState: dt.memoizedState, baseState: dt.baseState, baseQueue: dt.baseQueue, queue: dt.queue, next: null }, kt === null ? Ge.memoizedState = kt = n : kt = kt.next = n;
    }
    return kt;
  }
  function va(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function zi(n) {
    var r = dr(), l = r.queue;
    if (l === null) throw Error(p(311));
    l.lastRenderedReducer = n;
    var u = dt, f = u.baseQueue, h = l.pending;
    if (h !== null) {
      if (f !== null) {
        var C = f.next;
        f.next = h.next, h.next = C;
      }
      u.baseQueue = f = h, l.pending = null;
    }
    if (f !== null) {
      h = f.next, u = u.baseState;
      var w = C = null, O = null, Y = h;
      do {
        var le = Y.lane;
        if ((Ye & le) === le) O !== null && (O = O.next = { lane: 0, action: Y.action, hasEagerState: Y.hasEagerState, eagerState: Y.eagerState, next: null }), u = Y.hasEagerState ? Y.eagerState : n(u, Y.action);
        else {
          var ce = {
            lane: le,
            action: Y.action,
            hasEagerState: Y.hasEagerState,
            eagerState: Y.eagerState,
            next: null
          };
          O === null ? (w = O = ce, C = u) : O = O.next = ce, Ge.lanes |= le, ao |= le;
        }
        Y = Y.next;
      } while (Y !== null && Y !== h);
      O === null ? C = u : O.next = w, xa(u, r.memoizedState) || (Xr = !0), r.memoizedState = u, r.baseState = C, r.baseQueue = O, l.lastRenderedState = u;
    }
    if (n = l.interleaved, n !== null) {
      f = n;
      do
        h = f.lane, Ge.lanes |= h, ao |= h, f = f.next;
      while (f !== n);
    } else f === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Ma(n) {
    var r = dr(), l = r.queue;
    if (l === null) throw Error(p(311));
    l.lastRenderedReducer = n;
    var u = l.dispatch, f = l.pending, h = r.memoizedState;
    if (f !== null) {
      l.pending = null;
      var C = f = f.next;
      do
        h = n(h, C.action), C = C.next;
      while (C !== f);
      xa(h, r.memoizedState) || (Xr = !0), r.memoizedState = h, r.baseQueue === null && (r.baseState = h), l.lastRenderedState = h;
    }
    return [h, u];
  }
  function qo() {
  }
  function Kl(n, r) {
    var l = Ge, u = dr(), f = r(), h = !xa(u.memoizedState, f);
    if (h && (u.memoizedState = f, Xr = !0), u = u.queue, ys(Uc.bind(null, l, u, n), [n]), u.getSnapshot !== r || h || kt !== null && kt.memoizedState.tag & 1) {
      if (l.flags |= 2048, Xl(9, Lc.bind(null, l, u, f, r), void 0, null), Rn === null) throw Error(p(349));
      Ye & 30 || Ko(l, r, f);
    }
    return f;
  }
  function Ko(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Ge.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ge.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Lc(n, r, l, u) {
    r.value = l, r.getSnapshot = u, zc(r) && Fc(n);
  }
  function Uc(n, r, l) {
    return l(function() {
      zc(r) && Fc(n);
    });
  }
  function zc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !xa(n, l);
    } catch {
      return !0;
    }
  }
  function Fc(n) {
    var r = Ui(n, 1);
    r !== null && Cn(r, n, 1, -1);
  }
  function jc(n) {
    var r = Ze();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: va, lastRenderedState: n }, r.queue = n, n = n.dispatch = gs.bind(null, Ge, n), [r.memoizedState, n];
  }
  function Xl(n, r, l, u) {
    return n = { tag: n, create: r, destroy: l, deps: u, next: null }, r = Ge.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Ge.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (u = l.next, l.next = n, n.next = u, r.lastEffect = n)), n;
  }
  function Vc() {
    return dr().memoizedState;
  }
  function Xo(n, r, l, u) {
    var f = Ze();
    Ge.flags |= n, f.memoizedState = Xl(1 | r, l, void 0, u === void 0 ? null : u);
  }
  function Jo(n, r, l, u) {
    var f = dr();
    u = u === void 0 ? null : u;
    var h = void 0;
    if (dt !== null) {
      var C = dt.memoizedState;
      if (h = C.destroy, u !== null && ms(u, C.deps)) {
        f.memoizedState = Xl(r, l, h, u);
        return;
      }
    }
    Ge.flags |= n, f.memoizedState = Xl(1 | r, l, h, u);
  }
  function Hc(n, r) {
    return Xo(8390656, 8, n, r);
  }
  function ys(n, r) {
    return Jo(2048, 8, n, r);
  }
  function Pc(n, r) {
    return Jo(4, 2, n, r);
  }
  function Bc(n, r) {
    return Jo(4, 4, n, r);
  }
  function $c(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Ic(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Jo(4, 4, $c.bind(null, r, n), l);
  }
  function Zo() {
  }
  function Jl(n, r) {
    var l = dr();
    r = r === void 0 ? null : r;
    var u = l.memoizedState;
    return u !== null && r !== null && ms(r, u[1]) ? u[0] : (l.memoizedState = [n, r], n);
  }
  function Yc(n, r) {
    var l = dr();
    r = r === void 0 ? null : r;
    var u = l.memoizedState;
    return u !== null && r !== null && ms(r, u[1]) ? u[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function Wc(n, r, l) {
    return Ye & 21 ? (xa(l, r) || (l = nc(), Ge.lanes |= l, ao |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Xr = !0), n.memoizedState = l);
  }
  function Gd(n, r) {
    var l = Qt;
    Qt = l !== 0 && 4 > l ? l : 4, n(!0);
    var u = vs.transition;
    vs.transition = {};
    try {
      n(!1), r();
    } finally {
      Qt = l, vs.transition = u;
    }
  }
  function Qc() {
    return dr().memoizedState;
  }
  function kh(n, r, l) {
    var u = Vi(n);
    if (l = { lane: u, action: l, hasEagerState: !1, eagerState: null, next: null }, qd(n)) eu(r, l);
    else if (l = xh(n, r, l, u), l !== null) {
      var f = or();
      Cn(l, n, u, f), dl(l, r, u);
    }
  }
  function gs(n, r, l) {
    var u = Vi(n), f = { lane: u, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (qd(n)) eu(r, f);
    else {
      var h = n.alternate;
      if (n.lanes === 0 && (h === null || h.lanes === 0) && (h = r.lastRenderedReducer, h !== null)) try {
        var C = r.lastRenderedState, w = h(C, l);
        if (f.hasEagerState = !0, f.eagerState = w, xa(w, C)) {
          var O = r.interleaved;
          O === null ? (f.next = f, Fn(r)) : (f.next = O.next, O.next = f), r.interleaved = f;
          return;
        }
      } catch {
      } finally {
      }
      l = xh(n, r, f, u), l !== null && (f = or(), Cn(l, n, u, f), dl(l, r, u));
    }
  }
  function qd(n) {
    var r = n.alternate;
    return n === Ge || r !== null && r === Ge;
  }
  function eu(n, r) {
    Go = pa = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function dl(n, r, l) {
    if (l & 4194240) {
      var u = r.lanes;
      u &= n.pendingLanes, l |= u, r.lanes = l, $u(n, l);
    }
  }
  var _r = { readContext: Aa, useCallback: wr, useContext: wr, useEffect: wr, useImperativeHandle: wr, useInsertionEffect: wr, useLayoutEffect: wr, useMemo: wr, useReducer: wr, useRef: wr, useState: wr, useDebugValue: wr, useDeferredValue: wr, useTransition: wr, useMutableSource: wr, useSyncExternalStore: wr, useId: wr, unstable_isNewReconciler: !1 }, _g = { readContext: Aa, useCallback: function(n, r) {
    return Ze().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Aa, useEffect: Hc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Xo(
      4194308,
      4,
      $c.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Xo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Xo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Ze();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var u = Ze();
    return r = l !== void 0 ? l(r) : r, u.memoizedState = u.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, u.queue = n, n = n.dispatch = kh.bind(null, Ge, n), [u.memoizedState, n];
  }, useRef: function(n) {
    var r = Ze();
    return n = { current: n }, r.memoizedState = n;
  }, useState: jc, useDebugValue: Zo, useDeferredValue: function(n) {
    return Ze().memoizedState = n;
  }, useTransition: function() {
    var n = jc(!1), r = n[0];
    return n = Gd.bind(null, n[1]), Ze().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var u = Ge, f = Ze();
    if (sn) {
      if (l === void 0) throw Error(p(407));
      l = l();
    } else {
      if (l = r(), Rn === null) throw Error(p(349));
      Ye & 30 || Ko(u, r, l);
    }
    f.memoizedState = l;
    var h = { value: l, getSnapshot: r };
    return f.queue = h, Hc(Uc.bind(
      null,
      u,
      h,
      n
    ), [n]), u.flags |= 2048, Xl(9, Lc.bind(null, u, h, l, r), void 0, null), l;
  }, useId: function() {
    var n = Ze(), r = Rn.identifierPrefix;
    if (sn) {
      var l = Ni, u = fr;
      l = (u & ~(1 << 32 - Ea(u) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = hs++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = wg++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, ln = {
    readContext: Aa,
    useCallback: Jl,
    useContext: Aa,
    useEffect: ys,
    useImperativeHandle: Ic,
    useInsertionEffect: Pc,
    useLayoutEffect: Bc,
    useMemo: Yc,
    useReducer: zi,
    useRef: Vc,
    useState: function() {
      return zi(va);
    },
    useDebugValue: Zo,
    useDeferredValue: function(n) {
      var r = dr();
      return Wc(r, dt.memoizedState, n);
    },
    useTransition: function() {
      var n = zi(va)[0], r = dr().memoizedState;
      return [n, r];
    },
    useMutableSource: qo,
    useSyncExternalStore: Kl,
    useId: Qc,
    unstable_isNewReconciler: !1
  }, Gc = { readContext: Aa, useCallback: Jl, useContext: Aa, useEffect: ys, useImperativeHandle: Ic, useInsertionEffect: Pc, useLayoutEffect: Bc, useMemo: Yc, useReducer: Ma, useRef: Vc, useState: function() {
    return Ma(va);
  }, useDebugValue: Zo, useDeferredValue: function(n) {
    var r = dr();
    return dt === null ? r.memoizedState = n : Wc(r, dt.memoizedState, n);
  }, useTransition: function() {
    var n = Ma(va)[0], r = dr().memoizedState;
    return [n, r];
  }, useMutableSource: qo, useSyncExternalStore: Kl, useId: Qc, unstable_isNewReconciler: !1 };
  function Kr(n, r) {
    if (n && n.defaultProps) {
      r = V({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Zl(n, r, l, u) {
    r = n.memoizedState, l = l(u, r), l = l == null ? r : V({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var eo = { isMounted: function(n) {
    return (n = n._reactInternals) ? Je(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var u = or(), f = Vi(n), h = qr(u, f);
    h.payload = r, l != null && (h.callback = l), r = fl(n, h, f), r !== null && (Cn(r, n, f, u), Dc(r, n, f));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var u = or(), f = Vi(n), h = qr(u, f);
    h.tag = 1, h.payload = r, l != null && (h.callback = l), r = fl(n, h, f), r !== null && (Cn(r, n, f, u), Dc(r, n, f));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = or(), u = Vi(n), f = qr(l, u);
    f.tag = 2, r != null && (f.callback = r), r = fl(n, f, u), r !== null && (Cn(r, n, u, l), Dc(r, n, u));
  } };
  function Dh(n, r, l, u, f, h, C) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(u, h, C) : r.prototype && r.prototype.isPureReactComponent ? !es(l, u) || !es(f, h) : !0;
  }
  function Oh(n, r, l) {
    var u = !1, f = ci, h = r.contextType;
    return typeof h == "object" && h !== null ? h = Aa(h) : (f = hn(r) ? Ir : ft.current, u = r.contextTypes, h = (u = u != null) ? wa(n, f) : ci), r = new r(l, h), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = eo, n.stateNode = r, r._reactInternals = n, u && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = f, n.__reactInternalMemoizedMaskedChildContext = h), r;
  }
  function Ah(n, r, l, u) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, u), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, u), r.state !== n && eo.enqueueReplaceState(r, r.state, null);
  }
  function Kd(n, r, l, u) {
    var f = n.stateNode;
    f.props = l, f.state = n.memoizedState, f.refs = {}, kc(n);
    var h = r.contextType;
    typeof h == "object" && h !== null ? f.context = Aa(h) : (h = hn(r) ? Ir : ft.current, f.context = wa(n, h)), f.state = n.memoizedState, h = r.getDerivedStateFromProps, typeof h == "function" && (Zl(n, r, h, l), f.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof f.getSnapshotBeforeUpdate == "function" || typeof f.UNSAFE_componentWillMount != "function" && typeof f.componentWillMount != "function" || (r = f.state, typeof f.componentWillMount == "function" && f.componentWillMount(), typeof f.UNSAFE_componentWillMount == "function" && f.UNSAFE_componentWillMount(), r !== f.state && eo.enqueueReplaceState(f, f.state, null), Oc(n, l, f, u), f.state = n.memoizedState), typeof f.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function pl(n, r) {
    try {
      var l = "", u = r;
      do
        l += ht(u), u = u.return;
      while (u);
      var f = l;
    } catch (h) {
      f = `
Error generating stack: ` + h.message + `
` + h.stack;
    }
    return { value: n, source: r, stack: f, digest: null };
  }
  function Xd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Ss(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Mh = typeof WeakMap == "function" ? WeakMap : Map;
  function Nh(n, r, l) {
    l = qr(-1, l), l.tag = 3, l.payload = { element: null };
    var u = r.value;
    return l.callback = function() {
      of || (of = !0, lp = u), Ss(n, r);
    }, l;
  }
  function Lh(n, r, l) {
    l = qr(-1, l), l.tag = 3;
    var u = n.type.getDerivedStateFromError;
    if (typeof u == "function") {
      var f = r.value;
      l.payload = function() {
        return u(f);
      }, l.callback = function() {
        Ss(n, r);
      };
    }
    var h = n.stateNode;
    return h !== null && typeof h.componentDidCatch == "function" && (l.callback = function() {
      Ss(n, r), typeof u != "function" && (Ua === null ? Ua = /* @__PURE__ */ new Set([this]) : Ua.add(this));
      var C = r.stack;
      this.componentDidCatch(r.value, { componentStack: C !== null ? C : "" });
    }), l;
  }
  function Cs(n, r, l) {
    var u = n.pingCache;
    if (u === null) {
      u = n.pingCache = new Mh();
      var f = /* @__PURE__ */ new Set();
      u.set(r, f);
    } else f = u.get(r), f === void 0 && (f = /* @__PURE__ */ new Set(), u.set(r, f));
    f.has(l) || (f.add(l), n = Fg.bind(null, n, r, l), r.then(n, n));
  }
  function Uh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Jd(n, r, l, u, f) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = f, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = qr(-1, 1), r.tag = 2, fl(l, r, 1))), l.lanes |= 1), n);
  }
  var zh = _e.ReactCurrentOwner, Xr = !1;
  function An(n, r, l, u) {
    r.child = n === null ? Th(r, null, l, u) : $o(r, n.child, l, u);
  }
  function tu(n, r, l, u, f) {
    l = l.render;
    var h = r.ref;
    return Io(r, f), u = ae(n, r, l, u, h, f), l = jn(), n !== null && !Xr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~f, Mn(n, r, f)) : (sn && l && bc(r), r.flags |= 1, An(n, r, u, f), r.child);
  }
  function vl(n, r, l, u, f) {
    if (n === null) {
      var h = l.type;
      return typeof h == "function" && !fp(h) && h.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = h, qc(n, r, h, u, f)) : (n = pf(l.type, null, u, r, r.mode, f), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (h = n.child, !(n.lanes & f)) {
      var C = h.memoizedProps;
      if (l = l.compare, l = l !== null ? l : es, l(C, u) && n.ref === r.ref) return Mn(n, r, f);
    }
    return r.flags |= 1, n = yl(h, u), n.ref = r.ref, n.return = r, r.child = n;
  }
  function qc(n, r, l, u, f) {
    if (n !== null) {
      var h = n.memoizedProps;
      if (es(h, u) && n.ref === r.ref) if (Xr = !1, r.pendingProps = u = h, (n.lanes & f) !== 0) n.flags & 131072 && (Xr = !0);
      else return r.lanes = n.lanes, Mn(n, r, f);
    }
    return Ct(n, r, l, u, f);
  }
  function Jr(n, r, l) {
    var u = r.pendingProps, f = u.children, h = n !== null ? n.memoizedState : null;
    if (u.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Yt(fu, Zr), Zr |= l;
    else {
      if (!(l & 1073741824)) return n = h !== null ? h.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Yt(fu, Zr), Zr |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, u = h !== null ? h.baseLanes : l, Yt(fu, Zr), Zr |= u;
    }
    else h !== null ? (u = h.baseLanes | l, r.memoizedState = null) : u = l, Yt(fu, Zr), Zr |= u;
    return An(n, r, f, l), r.child;
  }
  function to(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Ct(n, r, l, u, f) {
    var h = hn(l) ? Ir : ft.current;
    return h = wa(r, h), Io(r, f), l = ae(n, r, l, u, h, f), u = jn(), n !== null && !Xr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~f, Mn(n, r, f)) : (sn && u && bc(r), r.flags |= 1, An(n, r, l, f), r.child);
  }
  function Es(n, r, l, u, f) {
    if (hn(l)) {
      var h = !0;
      Ec(r);
    } else h = !1;
    if (Io(r, f), r.stateNode === null) Ts(n, r), Oh(r, l, u), Kd(r, l, u, f), u = !0;
    else if (n === null) {
      var C = r.stateNode, w = r.memoizedProps;
      C.props = w;
      var O = C.context, Y = l.contextType;
      typeof Y == "object" && Y !== null ? Y = Aa(Y) : (Y = hn(l) ? Ir : ft.current, Y = wa(r, Y));
      var le = l.getDerivedStateFromProps, ce = typeof le == "function" || typeof C.getSnapshotBeforeUpdate == "function";
      ce || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (w !== u || O !== Y) && Ah(r, C, u, Y), cl = !1;
      var ie = r.memoizedState;
      C.state = ie, Oc(r, u, C, f), O = r.memoizedState, w !== u || ie !== O || Tn.current || cl ? (typeof le == "function" && (Zl(r, l, le, u), O = r.memoizedState), (w = cl || Dh(r, l, w, u, ie, O, Y)) ? (ce || typeof C.UNSAFE_componentWillMount != "function" && typeof C.componentWillMount != "function" || (typeof C.componentWillMount == "function" && C.componentWillMount(), typeof C.UNSAFE_componentWillMount == "function" && C.UNSAFE_componentWillMount()), typeof C.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof C.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = u, r.memoizedState = O), C.props = u, C.state = O, C.context = Y, u = w) : (typeof C.componentDidMount == "function" && (r.flags |= 4194308), u = !1);
    } else {
      C = r.stateNode, Yo(n, r), w = r.memoizedProps, Y = r.type === r.elementType ? w : Kr(r.type, w), C.props = Y, ce = r.pendingProps, ie = C.context, O = l.contextType, typeof O == "object" && O !== null ? O = Aa(O) : (O = hn(l) ? Ir : ft.current, O = wa(r, O));
      var Oe = l.getDerivedStateFromProps;
      (le = typeof Oe == "function" || typeof C.getSnapshotBeforeUpdate == "function") || typeof C.UNSAFE_componentWillReceiveProps != "function" && typeof C.componentWillReceiveProps != "function" || (w !== ce || ie !== O) && Ah(r, C, u, O), cl = !1, ie = r.memoizedState, C.state = ie, Oc(r, u, C, f);
      var je = r.memoizedState;
      w !== ce || ie !== je || Tn.current || cl ? (typeof Oe == "function" && (Zl(r, l, Oe, u), je = r.memoizedState), (Y = cl || Dh(r, l, Y, u, ie, je, O) || !1) ? (le || typeof C.UNSAFE_componentWillUpdate != "function" && typeof C.componentWillUpdate != "function" || (typeof C.componentWillUpdate == "function" && C.componentWillUpdate(u, je, O), typeof C.UNSAFE_componentWillUpdate == "function" && C.UNSAFE_componentWillUpdate(u, je, O)), typeof C.componentDidUpdate == "function" && (r.flags |= 4), typeof C.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof C.componentDidUpdate != "function" || w === n.memoizedProps && ie === n.memoizedState || (r.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && ie === n.memoizedState || (r.flags |= 1024), r.memoizedProps = u, r.memoizedState = je), C.props = u, C.state = je, C.context = O, u = Y) : (typeof C.componentDidUpdate != "function" || w === n.memoizedProps && ie === n.memoizedState || (r.flags |= 4), typeof C.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && ie === n.memoizedState || (r.flags |= 1024), u = !1);
    }
    return Kc(n, r, l, u, h, f);
  }
  function Kc(n, r, l, u, f, h) {
    to(n, r);
    var C = (r.flags & 128) !== 0;
    if (!u && !C) return f && gh(r, l, !1), Mn(n, r, h);
    u = r.stateNode, zh.current = r;
    var w = C && typeof l.getDerivedStateFromError != "function" ? null : u.render();
    return r.flags |= 1, n !== null && C ? (r.child = $o(r, n.child, null, h), r.child = $o(r, null, w, h)) : An(n, r, w, h), r.memoizedState = u.state, f && gh(r, l, !0), r.child;
  }
  function kg(n) {
    var r = n.stateNode;
    r.pendingContext ? ul(n, r.pendingContext, r.pendingContext !== r.context) : r.context && ul(n, r.context, !1), Yd(n, r.containerInfo);
  }
  function Fh(n, r, l, u, f) {
    return Sn(), Bd(f), r.flags |= 256, An(n, r, l, u), r.child;
  }
  var bs = { dehydrated: null, treeContext: null, retryLane: 0 };
  function no(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function jh(n, r, l) {
    var u = r.pendingProps, f = mn.current, h = !1, C = (r.flags & 128) !== 0, w;
    if ((w = C) || (w = n !== null && n.memoizedState === null ? !1 : (f & 2) !== 0), w ? (h = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (f |= 1), Yt(mn, f & 1), n === null)
      return xc(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (C = u.children, n = u.fallback, h ? (u = r.mode, h = r.child, C = { mode: "hidden", children: C }, !(u & 1) && h !== null ? (h.childLanes = 0, h.pendingProps = C) : h = vf(C, u, 0, null), n = uo(n, u, l, null), h.return = r, n.return = r, h.sibling = n, r.child = h, r.child.memoizedState = no(l), r.memoizedState = bs, n) : Xc(r, C));
    if (f = n.memoizedState, f !== null && (w = f.dehydrated, w !== null)) return Zd(n, r, C, u, w, f, l);
    if (h) {
      h = u.fallback, C = r.mode, f = n.child, w = f.sibling;
      var O = { mode: "hidden", children: u.children };
      return !(C & 1) && r.child !== f ? (u = r.child, u.childLanes = 0, u.pendingProps = O, r.deletions = null) : (u = yl(f, O), u.subtreeFlags = f.subtreeFlags & 14680064), w !== null ? h = yl(w, h) : (h = uo(h, C, l, null), h.flags |= 2), h.return = r, u.return = r, u.sibling = h, r.child = u, u = h, h = r.child, C = n.child.memoizedState, C = C === null ? no(l) : { baseLanes: C.baseLanes | l, cachePool: null, transitions: C.transitions }, h.memoizedState = C, h.childLanes = n.childLanes & ~l, r.memoizedState = bs, u;
    }
    return h = n.child, n = h.sibling, u = yl(h, { mode: "visible", children: u.children }), !(r.mode & 1) && (u.lanes = l), u.return = r, u.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = u, r.memoizedState = null, u;
  }
  function Xc(n, r) {
    return r = vf({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Jc(n, r, l, u) {
    return u !== null && Bd(u), $o(r, n.child, null, l), n = Xc(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Zd(n, r, l, u, f, h, C) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, u = Xd(Error(p(422))), Jc(n, r, C, u)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (h = u.fallback, f = r.mode, u = vf({ mode: "visible", children: u.children }, f, 0, null), h = uo(h, f, C, null), h.flags |= 2, u.return = r, h.return = r, u.sibling = h, r.child = u, r.mode & 1 && $o(r, n.child, null, C), r.child.memoizedState = no(C), r.memoizedState = bs, h);
    if (!(r.mode & 1)) return Jc(n, r, C, null);
    if (f.data === "$!") {
      if (u = f.nextSibling && f.nextSibling.dataset, u) var w = u.dgst;
      return u = w, h = Error(p(419)), u = Xd(h, u, void 0), Jc(n, r, C, u);
    }
    if (w = (C & n.childLanes) !== 0, Xr || w) {
      if (u = Rn, u !== null) {
        switch (C & -C) {
          case 4:
            f = 2;
            break;
          case 16:
            f = 8;
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
            f = 32;
            break;
          case 536870912:
            f = 268435456;
            break;
          default:
            f = 0;
        }
        f = f & (u.suspendedLanes | C) ? 0 : f, f !== 0 && f !== h.retryLane && (h.retryLane = f, Ui(n, f), Cn(u, n, f, -1));
      }
      return ks(), u = Xd(Error(p(421))), Jc(n, r, C, u);
    }
    return f.data === "$?" ? (r.flags |= 128, r.child = n.child, r = cp.bind(null, n), f._reactRetry = r, null) : (n = h.treeContext, Gr = Ja(f.nextSibling), fa = r, sn = !0, Da = null, n !== null && (Qr[Rr++] = fr, Qr[Rr++] = Ni, Qr[Rr++] = ka, fr = n.id, Ni = n.overflow, ka = r), r = Xc(r, u.children), r.flags |= 4096, r);
  }
  function Vh(n, r, l) {
    n.lanes |= r;
    var u = n.alternate;
    u !== null && (u.lanes |= r), Id(n.return, r, l);
  }
  function Zc(n, r, l, u, f) {
    var h = n.memoizedState;
    h === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: u, tail: l, tailMode: f } : (h.isBackwards = r, h.rendering = null, h.renderingStartTime = 0, h.last = u, h.tail = l, h.tailMode = f);
  }
  function ep(n, r, l) {
    var u = r.pendingProps, f = u.revealOrder, h = u.tail;
    if (An(n, r, u.children, l), u = mn.current, u & 2) u = u & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Vh(n, l, r);
        else if (n.tag === 19) Vh(n, l, r);
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
      u &= 1;
    }
    if (Yt(mn, u), !(r.mode & 1)) r.memoizedState = null;
    else switch (f) {
      case "forwards":
        for (l = r.child, f = null; l !== null; ) n = l.alternate, n !== null && Ac(n) === null && (f = l), l = l.sibling;
        l = f, l === null ? (f = r.child, r.child = null) : (f = l.sibling, l.sibling = null), Zc(r, !1, f, l, h);
        break;
      case "backwards":
        for (l = null, f = r.child, r.child = null; f !== null; ) {
          if (n = f.alternate, n !== null && Ac(n) === null) {
            r.child = f;
            break;
          }
          n = f.sibling, f.sibling = l, l = f, f = n;
        }
        Zc(r, !0, l, null, h);
        break;
      case "together":
        Zc(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function Ts(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Mn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), ao |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(p(153));
    if (r.child !== null) {
      for (n = r.child, l = yl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = yl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Fi(n, r, l) {
    switch (r.tag) {
      case 3:
        kg(r), Sn();
        break;
      case 5:
        _h(r);
        break;
      case 1:
        hn(r.type) && Ec(r);
        break;
      case 4:
        Yd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var u = r.type._context, f = r.memoizedProps.value;
        Yt(Li, u._currentValue), u._currentValue = f;
        break;
      case 13:
        if (u = r.memoizedState, u !== null)
          return u.dehydrated !== null ? (Yt(mn, mn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? jh(n, r, l) : (Yt(mn, mn.current & 1), n = Mn(n, r, l), n !== null ? n.sibling : null);
        Yt(mn, mn.current & 1);
        break;
      case 19:
        if (u = (l & r.childLanes) !== 0, n.flags & 128) {
          if (u) return ep(n, r, l);
          r.flags |= 128;
        }
        if (f = r.memoizedState, f !== null && (f.rendering = null, f.tail = null, f.lastEffect = null), Yt(mn, mn.current), u) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Jr(n, r, l);
    }
    return Mn(n, r, l);
  }
  var di, nu, ru, Na;
  di = function(n, r) {
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
  }, nu = function() {
  }, ru = function(n, r, l, u) {
    var f = n.memoizedProps;
    if (f !== u) {
      n = r.stateNode, ql(Za.current);
      var h = null;
      switch (l) {
        case "input":
          f = vn(n, f), u = vn(n, u), h = [];
          break;
        case "select":
          f = V({}, f, { value: void 0 }), u = V({}, u, { value: void 0 }), h = [];
          break;
        case "textarea":
          f = he(n, f), u = he(n, u), h = [];
          break;
        default:
          typeof f.onClick != "function" && typeof u.onClick == "function" && (n.onclick = Cc);
      }
      er(l, u);
      var C;
      l = null;
      for (Y in f) if (!u.hasOwnProperty(Y) && f.hasOwnProperty(Y) && f[Y] != null) if (Y === "style") {
        var w = f[Y];
        for (C in w) w.hasOwnProperty(C) && (l || (l = {}), l[C] = "");
      } else Y !== "dangerouslySetInnerHTML" && Y !== "children" && Y !== "suppressContentEditableWarning" && Y !== "suppressHydrationWarning" && Y !== "autoFocus" && (b.hasOwnProperty(Y) ? h || (h = []) : (h = h || []).push(Y, null));
      for (Y in u) {
        var O = u[Y];
        if (w = f != null ? f[Y] : void 0, u.hasOwnProperty(Y) && O !== w && (O != null || w != null)) if (Y === "style") if (w) {
          for (C in w) !w.hasOwnProperty(C) || O && O.hasOwnProperty(C) || (l || (l = {}), l[C] = "");
          for (C in O) O.hasOwnProperty(C) && w[C] !== O[C] && (l || (l = {}), l[C] = O[C]);
        } else l || (h || (h = []), h.push(
          Y,
          l
        )), l = O;
        else Y === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, w = w ? w.__html : void 0, O != null && w !== O && (h = h || []).push(Y, O)) : Y === "children" ? typeof O != "string" && typeof O != "number" || (h = h || []).push(Y, "" + O) : Y !== "suppressContentEditableWarning" && Y !== "suppressHydrationWarning" && (b.hasOwnProperty(Y) ? (O != null && Y === "onScroll" && tn("scroll", n), h || w === O || (h = [])) : (h = h || []).push(Y, O));
      }
      l && (h = h || []).push("style", l);
      var Y = h;
      (r.updateQueue = Y) && (r.flags |= 4);
    }
  }, Na = function(n, r, l, u) {
    l !== u && (r.flags |= 4);
  };
  function xn(n, r) {
    if (!sn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var u = null; l !== null; ) l.alternate !== null && (u = l), l = l.sibling;
        u === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : u.sibling = null;
    }
  }
  function kr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, u = 0;
    if (r) for (var f = n.child; f !== null; ) l |= f.lanes | f.childLanes, u |= f.subtreeFlags & 14680064, u |= f.flags & 14680064, f.return = n, f = f.sibling;
    else for (f = n.child; f !== null; ) l |= f.lanes | f.childLanes, u |= f.subtreeFlags, u |= f.flags, f.return = n, f = f.sibling;
    return n.subtreeFlags |= u, n.childLanes = l, r;
  }
  function Dg(n, r, l) {
    var u = r.pendingProps;
    switch (Hd(r), r.tag) {
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
        return kr(r), null;
      case 1:
        return hn(r.type) && _a(), kr(r), null;
      case 3:
        return u = r.stateNode, Qo(), Bt(Tn), Bt(ft), Qd(), u.pendingContext && (u.context = u.pendingContext, u.pendingContext = null), (n === null || n.child === null) && (Rc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Da !== null && (op(Da), Da = null))), nu(n, r), kr(r), null;
      case 5:
        Wd(r);
        var f = ql(ps.current);
        if (l = r.type, n !== null && r.stateNode != null) ru(n, r, l, u, f), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!u) {
            if (r.stateNode === null) throw Error(p(166));
            return kr(r), null;
          }
          if (n = ql(Za.current), Rc(r)) {
            u = r.stateNode, l = r.type;
            var h = r.memoizedProps;
            switch (u[si] = r, u[Yl] = h, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                tn("cancel", u), tn("close", u);
                break;
              case "iframe":
              case "object":
              case "embed":
                tn("load", u);
                break;
              case "video":
              case "audio":
                for (f = 0; f < as.length; f++) tn(as[f], u);
                break;
              case "source":
                tn("error", u);
                break;
              case "img":
              case "image":
              case "link":
                tn(
                  "error",
                  u
                ), tn("load", u);
                break;
              case "details":
                tn("toggle", u);
                break;
              case "input":
                kn(u, h), tn("invalid", u);
                break;
              case "select":
                u._wrapperState = { wasMultiple: !!h.multiple }, tn("invalid", u);
                break;
              case "textarea":
                ue(u, h), tn("invalid", u);
            }
            er(l, h), f = null;
            for (var C in h) if (h.hasOwnProperty(C)) {
              var w = h[C];
              C === "children" ? typeof w == "string" ? u.textContent !== w && (h.suppressHydrationWarning !== !0 && Sc(u.textContent, w, n), f = ["children", w]) : typeof w == "number" && u.textContent !== "" + w && (h.suppressHydrationWarning !== !0 && Sc(
                u.textContent,
                w,
                n
              ), f = ["children", "" + w]) : b.hasOwnProperty(C) && w != null && C === "onScroll" && tn("scroll", u);
            }
            switch (l) {
              case "input":
                zt(u), k(u, h, !0);
                break;
              case "textarea":
                zt(u), gt(u);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof h.onClick == "function" && (u.onclick = Cc);
            }
            u = f, r.updateQueue = u, u !== null && (r.flags |= 4);
          } else {
            C = f.nodeType === 9 ? f : f.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = $t(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = C.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof u.is == "string" ? n = C.createElement(l, { is: u.is }) : (n = C.createElement(l), l === "select" && (C = n, u.multiple ? C.multiple = !0 : u.size && (C.size = u.size))) : n = C.createElementNS(n, l), n[si] = r, n[Yl] = u, di(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (C = On(l, u), l) {
                case "dialog":
                  tn("cancel", n), tn("close", n), f = u;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  tn("load", n), f = u;
                  break;
                case "video":
                case "audio":
                  for (f = 0; f < as.length; f++) tn(as[f], n);
                  f = u;
                  break;
                case "source":
                  tn("error", n), f = u;
                  break;
                case "img":
                case "image":
                case "link":
                  tn(
                    "error",
                    n
                  ), tn("load", n), f = u;
                  break;
                case "details":
                  tn("toggle", n), f = u;
                  break;
                case "input":
                  kn(n, u), f = vn(n, u), tn("invalid", n);
                  break;
                case "option":
                  f = u;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!u.multiple }, f = V({}, u, { value: void 0 }), tn("invalid", n);
                  break;
                case "textarea":
                  ue(n, u), f = he(n, u), tn("invalid", n);
                  break;
                default:
                  f = u;
              }
              er(l, f), w = f;
              for (h in w) if (w.hasOwnProperty(h)) {
                var O = w[h];
                h === "style" ? Pt(n, O) : h === "dangerouslySetInnerHTML" ? (O = O ? O.__html : void 0, O != null && li(n, O)) : h === "children" ? typeof O == "string" ? (l !== "textarea" || O !== "") && Or(n, O) : typeof O == "number" && Or(n, "" + O) : h !== "suppressContentEditableWarning" && h !== "suppressHydrationWarning" && h !== "autoFocus" && (b.hasOwnProperty(h) ? O != null && h === "onScroll" && tn("scroll", n) : O != null && ne(n, h, O, C));
              }
              switch (l) {
                case "input":
                  zt(n), k(n, u, !1);
                  break;
                case "textarea":
                  zt(n), gt(n);
                  break;
                case "option":
                  u.value != null && n.setAttribute("value", "" + rt(u.value));
                  break;
                case "select":
                  n.multiple = !!u.multiple, h = u.value, h != null ? Ce(n, !!u.multiple, h, !1) : u.defaultValue != null && Ce(
                    n,
                    !!u.multiple,
                    u.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof f.onClick == "function" && (n.onclick = Cc);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u = !!u.autoFocus;
                  break e;
                case "img":
                  u = !0;
                  break e;
                default:
                  u = !1;
              }
            }
            u && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return kr(r), null;
      case 6:
        if (n && r.stateNode != null) Na(n, r, n.memoizedProps, u);
        else {
          if (typeof u != "string" && r.stateNode === null) throw Error(p(166));
          if (l = ql(ps.current), ql(Za.current), Rc(r)) {
            if (u = r.stateNode, l = r.memoizedProps, u[si] = r, (h = u.nodeValue !== l) && (n = fa, n !== null)) switch (n.tag) {
              case 3:
                Sc(u.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Sc(u.nodeValue, l, (n.mode & 1) !== 0);
            }
            h && (r.flags |= 4);
          } else u = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(u), u[si] = r, r.stateNode = u;
        }
        return kr(r), null;
      case 13:
        if (Bt(mn), u = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (sn && Gr !== null && r.mode & 1 && !(r.flags & 128)) Eh(), Sn(), r.flags |= 98560, h = !1;
          else if (h = Rc(r), u !== null && u.dehydrated !== null) {
            if (n === null) {
              if (!h) throw Error(p(318));
              if (h = r.memoizedState, h = h !== null ? h.dehydrated : null, !h) throw Error(p(317));
              h[si] = r;
            } else Sn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            kr(r), h = !1;
          } else Da !== null && (op(Da), Da = null), h = !0;
          if (!h) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (u = u !== null, u !== (n !== null && n.memoizedState !== null) && u && (r.child.flags |= 8192, r.mode & 1 && (n === null || mn.current & 1 ? Qn === 0 && (Qn = 3) : ks())), r.updateQueue !== null && (r.flags |= 4), kr(r), null);
      case 4:
        return Qo(), nu(n, r), n === null && Ho(r.stateNode.containerInfo), kr(r), null;
      case 10:
        return $d(r.type._context), kr(r), null;
      case 17:
        return hn(r.type) && _a(), kr(r), null;
      case 19:
        if (Bt(mn), h = r.memoizedState, h === null) return kr(r), null;
        if (u = (r.flags & 128) !== 0, C = h.rendering, C === null) if (u) xn(h, !1);
        else {
          if (Qn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (C = Ac(n), C !== null) {
              for (r.flags |= 128, xn(h, !1), u = C.updateQueue, u !== null && (r.updateQueue = u, r.flags |= 4), r.subtreeFlags = 0, u = l, l = r.child; l !== null; ) h = l, n = u, h.flags &= 14680066, C = h.alternate, C === null ? (h.childLanes = 0, h.lanes = n, h.child = null, h.subtreeFlags = 0, h.memoizedProps = null, h.memoizedState = null, h.updateQueue = null, h.dependencies = null, h.stateNode = null) : (h.childLanes = C.childLanes, h.lanes = C.lanes, h.child = C.child, h.subtreeFlags = 0, h.deletions = null, h.memoizedProps = C.memoizedProps, h.memoizedState = C.memoizedState, h.updateQueue = C.updateQueue, h.type = C.type, n = C.dependencies, h.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Yt(mn, mn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          h.tail !== null && It() > pu && (r.flags |= 128, u = !0, xn(h, !1), r.lanes = 4194304);
        }
        else {
          if (!u) if (n = Ac(C), n !== null) {
            if (r.flags |= 128, u = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), xn(h, !0), h.tail === null && h.tailMode === "hidden" && !C.alternate && !sn) return kr(r), null;
          } else 2 * It() - h.renderingStartTime > pu && l !== 1073741824 && (r.flags |= 128, u = !0, xn(h, !1), r.lanes = 4194304);
          h.isBackwards ? (C.sibling = r.child, r.child = C) : (l = h.last, l !== null ? l.sibling = C : r.child = C, h.last = C);
        }
        return h.tail !== null ? (r = h.tail, h.rendering = r, h.tail = r.sibling, h.renderingStartTime = It(), r.sibling = null, l = mn.current, Yt(mn, u ? l & 1 | 2 : l & 1), r) : (kr(r), null);
      case 22:
      case 23:
        return ff(), u = r.memoizedState !== null, n !== null && n.memoizedState !== null !== u && (r.flags |= 8192), u && r.mode & 1 ? Zr & 1073741824 && (kr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : kr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(p(156, r.tag));
  }
  function Og(n, r) {
    switch (Hd(r), r.tag) {
      case 1:
        return hn(r.type) && _a(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Qo(), Bt(Tn), Bt(ft), Qd(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Wd(r), null;
      case 13:
        if (Bt(mn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(p(340));
          Sn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Bt(mn), null;
      case 4:
        return Qo(), null;
      case 10:
        return $d(r.type._context), null;
      case 22:
      case 23:
        return ff(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var au = !1, pr = !1, ef = typeof WeakSet == "function" ? WeakSet : Set, ze = null;
  function iu(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (u) {
      wn(n, r, u);
    }
    else l.current = null;
  }
  function tp(n, r, l) {
    try {
      l();
    } catch (u) {
      wn(n, r, u);
    }
  }
  var tf = !1;
  function Ag(n, r) {
    if (Md = jl, n = vc(), Di(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var u = l.getSelection && l.getSelection();
        if (u && u.rangeCount !== 0) {
          l = u.anchorNode;
          var f = u.anchorOffset, h = u.focusNode;
          u = u.focusOffset;
          try {
            l.nodeType, h.nodeType;
          } catch {
            l = null;
            break e;
          }
          var C = 0, w = -1, O = -1, Y = 0, le = 0, ce = n, ie = null;
          t: for (; ; ) {
            for (var Oe; ce !== l || f !== 0 && ce.nodeType !== 3 || (w = C + f), ce !== h || u !== 0 && ce.nodeType !== 3 || (O = C + u), ce.nodeType === 3 && (C += ce.nodeValue.length), (Oe = ce.firstChild) !== null; )
              ie = ce, ce = Oe;
            for (; ; ) {
              if (ce === n) break t;
              if (ie === l && ++Y === f && (w = C), ie === h && ++le === u && (O = C), (Oe = ce.nextSibling) !== null) break;
              ce = ie, ie = ce.parentNode;
            }
            ce = Oe;
          }
          l = w === -1 || O === -1 ? null : { start: w, end: O };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for ($l = { focusedElem: n, selectionRange: l }, jl = !1, ze = r; ze !== null; ) if (r = ze, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, ze = n;
    else for (; ze !== null; ) {
      r = ze;
      try {
        var je = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (je !== null) {
              var Be = je.memoizedProps, Nn = je.memoizedState, F = r.stateNode, N = F.getSnapshotBeforeUpdate(r.elementType === r.type ? Be : Kr(r.type, Be), Nn);
              F.__reactInternalSnapshotBeforeUpdate = N;
            }
            break;
          case 3:
            var $ = r.stateNode.containerInfo;
            $.nodeType === 1 ? $.textContent = "" : $.nodeType === 9 && $.documentElement && $.removeChild($.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(p(163));
        }
      } catch (me) {
        wn(r, r.return, me);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, ze = n;
        break;
      }
      ze = r.return;
    }
    return je = tf, tf = !1, je;
  }
  function lu(n, r, l) {
    var u = r.updateQueue;
    if (u = u !== null ? u.lastEffect : null, u !== null) {
      var f = u = u.next;
      do {
        if ((f.tag & n) === n) {
          var h = f.destroy;
          f.destroy = void 0, h !== void 0 && tp(r, l, h);
        }
        f = f.next;
      } while (f !== u);
    }
  }
  function nf(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var u = l.create;
          l.destroy = u();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function rf(n) {
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
  function Hh(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, Hh(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[si], delete r[Yl], delete r[Ud], delete r[Rg], delete r[zd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function np(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Ph(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || np(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function xs(n, r, l) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Cc));
    else if (u !== 4 && (n = n.child, n !== null)) for (xs(n, r, l), n = n.sibling; n !== null; ) xs(n, r, l), n = n.sibling;
  }
  function ou(n, r, l) {
    var u = n.tag;
    if (u === 5 || u === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (u !== 4 && (n = n.child, n !== null)) for (ou(n, r, l), n = n.sibling; n !== null; ) ou(n, r, l), n = n.sibling;
  }
  var yn = null, ir = !1;
  function Ar(n, r, l) {
    for (l = l.child; l !== null; ) uu(n, r, l), l = l.sibling;
  }
  function uu(n, r, l) {
    if (Qa && typeof Qa.onCommitFiberUnmount == "function") try {
      Qa.onCommitFiberUnmount(Bu, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        pr || iu(l, r);
      case 6:
        var u = yn, f = ir;
        yn = null, Ar(n, r, l), yn = u, ir = f, yn !== null && (ir ? (n = yn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : yn.removeChild(l.stateNode));
        break;
      case 18:
        yn !== null && (ir ? (n = yn, l = l.stateNode, n.nodeType === 8 ? il(n.parentNode, l) : n.nodeType === 1 && il(n, l), Qu(n)) : il(yn, l.stateNode));
        break;
      case 4:
        u = yn, f = ir, yn = l.stateNode.containerInfo, ir = !0, Ar(n, r, l), yn = u, ir = f;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!pr && (u = l.updateQueue, u !== null && (u = u.lastEffect, u !== null))) {
          f = u = u.next;
          do {
            var h = f, C = h.destroy;
            h = h.tag, C !== void 0 && (h & 2 || h & 4) && tp(l, r, C), f = f.next;
          } while (f !== u);
        }
        Ar(n, r, l);
        break;
      case 1:
        if (!pr && (iu(l, r), u = l.stateNode, typeof u.componentWillUnmount == "function")) try {
          u.props = l.memoizedProps, u.state = l.memoizedState, u.componentWillUnmount();
        } catch (w) {
          wn(l, r, w);
        }
        Ar(n, r, l);
        break;
      case 21:
        Ar(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (pr = (u = pr) || l.memoizedState !== null, Ar(n, r, l), pr = u) : Ar(n, r, l);
        break;
      default:
        Ar(n, r, l);
    }
  }
  function su(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new ef()), r.forEach(function(u) {
        var f = jg.bind(null, n, u);
        l.has(u) || (l.add(u), u.then(f, f));
      });
    }
  }
  function lr(n, r) {
    var l = r.deletions;
    if (l !== null) for (var u = 0; u < l.length; u++) {
      var f = l[u];
      try {
        var h = n, C = r, w = C;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 5:
              yn = w.stateNode, ir = !1;
              break e;
            case 3:
              yn = w.stateNode.containerInfo, ir = !0;
              break e;
            case 4:
              yn = w.stateNode.containerInfo, ir = !0;
              break e;
          }
          w = w.return;
        }
        if (yn === null) throw Error(p(160));
        uu(h, C, f), yn = null, ir = !1;
        var O = f.alternate;
        O !== null && (O.return = null), f.return = null;
      } catch (Y) {
        wn(f, r, Y);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Bh(r, n), r = r.sibling;
  }
  function Bh(n, r) {
    var l = n.alternate, u = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (lr(r, n), pi(n), u & 4) {
          try {
            lu(3, n, n.return), nf(3, n);
          } catch (Be) {
            wn(n, n.return, Be);
          }
          try {
            lu(5, n, n.return);
          } catch (Be) {
            wn(n, n.return, Be);
          }
        }
        break;
      case 1:
        lr(r, n), pi(n), u & 512 && l !== null && iu(l, l.return);
        break;
      case 5:
        if (lr(r, n), pi(n), u & 512 && l !== null && iu(l, l.return), n.flags & 32) {
          var f = n.stateNode;
          try {
            Or(f, "");
          } catch (Be) {
            wn(n, n.return, Be);
          }
        }
        if (u & 4 && (f = n.stateNode, f != null)) {
          var h = n.memoizedProps, C = l !== null ? l.memoizedProps : h, w = n.type, O = n.updateQueue;
          if (n.updateQueue = null, O !== null) try {
            w === "input" && h.type === "radio" && h.name != null && Zn(f, h), On(w, C);
            var Y = On(w, h);
            for (C = 0; C < O.length; C += 2) {
              var le = O[C], ce = O[C + 1];
              le === "style" ? Pt(f, ce) : le === "dangerouslySetInnerHTML" ? li(f, ce) : le === "children" ? Or(f, ce) : ne(f, le, ce, Y);
            }
            switch (w) {
              case "input":
                cr(f, h);
                break;
              case "textarea":
                Fe(f, h);
                break;
              case "select":
                var ie = f._wrapperState.wasMultiple;
                f._wrapperState.wasMultiple = !!h.multiple;
                var Oe = h.value;
                Oe != null ? Ce(f, !!h.multiple, Oe, !1) : ie !== !!h.multiple && (h.defaultValue != null ? Ce(
                  f,
                  !!h.multiple,
                  h.defaultValue,
                  !0
                ) : Ce(f, !!h.multiple, h.multiple ? [] : "", !1));
            }
            f[Yl] = h;
          } catch (Be) {
            wn(n, n.return, Be);
          }
        }
        break;
      case 6:
        if (lr(r, n), pi(n), u & 4) {
          if (n.stateNode === null) throw Error(p(162));
          f = n.stateNode, h = n.memoizedProps;
          try {
            f.nodeValue = h;
          } catch (Be) {
            wn(n, n.return, Be);
          }
        }
        break;
      case 3:
        if (lr(r, n), pi(n), u & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Qu(r.containerInfo);
        } catch (Be) {
          wn(n, n.return, Be);
        }
        break;
      case 4:
        lr(r, n), pi(n);
        break;
      case 13:
        lr(r, n), pi(n), f = n.child, f.flags & 8192 && (h = f.memoizedState !== null, f.stateNode.isHidden = h, !h || f.alternate !== null && f.alternate.memoizedState !== null || (lf = It())), u & 4 && su(n);
        break;
      case 22:
        if (le = l !== null && l.memoizedState !== null, n.mode & 1 ? (pr = (Y = pr) || le, lr(r, n), pr = Y) : lr(r, n), pi(n), u & 8192) {
          if (Y = n.memoizedState !== null, (n.stateNode.isHidden = Y) && !le && n.mode & 1) for (ze = n, le = n.child; le !== null; ) {
            for (ce = ze = le; ze !== null; ) {
              switch (ie = ze, Oe = ie.child, ie.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  lu(4, ie, ie.return);
                  break;
                case 1:
                  iu(ie, ie.return);
                  var je = ie.stateNode;
                  if (typeof je.componentWillUnmount == "function") {
                    u = ie, l = ie.return;
                    try {
                      r = u, je.props = r.memoizedProps, je.state = r.memoizedState, je.componentWillUnmount();
                    } catch (Be) {
                      wn(u, l, Be);
                    }
                  }
                  break;
                case 5:
                  iu(ie, ie.return);
                  break;
                case 22:
                  if (ie.memoizedState !== null) {
                    $h(ce);
                    continue;
                  }
              }
              Oe !== null ? (Oe.return = ie, ze = Oe) : $h(ce);
            }
            le = le.sibling;
          }
          e: for (le = null, ce = n; ; ) {
            if (ce.tag === 5) {
              if (le === null) {
                le = ce;
                try {
                  f = ce.stateNode, Y ? (h = f.style, typeof h.setProperty == "function" ? h.setProperty("display", "none", "important") : h.display = "none") : (w = ce.stateNode, O = ce.memoizedProps.style, C = O != null && O.hasOwnProperty("display") ? O.display : null, w.style.display = Tt("display", C));
                } catch (Be) {
                  wn(n, n.return, Be);
                }
              }
            } else if (ce.tag === 6) {
              if (le === null) try {
                ce.stateNode.nodeValue = Y ? "" : ce.memoizedProps;
              } catch (Be) {
                wn(n, n.return, Be);
              }
            } else if ((ce.tag !== 22 && ce.tag !== 23 || ce.memoizedState === null || ce === n) && ce.child !== null) {
              ce.child.return = ce, ce = ce.child;
              continue;
            }
            if (ce === n) break e;
            for (; ce.sibling === null; ) {
              if (ce.return === null || ce.return === n) break e;
              le === ce && (le = null), ce = ce.return;
            }
            le === ce && (le = null), ce.sibling.return = ce.return, ce = ce.sibling;
          }
        }
        break;
      case 19:
        lr(r, n), pi(n), u & 4 && su(n);
        break;
      case 21:
        break;
      default:
        lr(
          r,
          n
        ), pi(n);
    }
  }
  function pi(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (np(l)) {
              var u = l;
              break e;
            }
            l = l.return;
          }
          throw Error(p(160));
        }
        switch (u.tag) {
          case 5:
            var f = u.stateNode;
            u.flags & 32 && (Or(f, ""), u.flags &= -33);
            var h = Ph(n);
            ou(n, h, f);
            break;
          case 3:
          case 4:
            var C = u.stateNode.containerInfo, w = Ph(n);
            xs(n, w, C);
            break;
          default:
            throw Error(p(161));
        }
      } catch (O) {
        wn(n, n.return, O);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function Mg(n, r, l) {
    ze = n, rp(n);
  }
  function rp(n, r, l) {
    for (var u = (n.mode & 1) !== 0; ze !== null; ) {
      var f = ze, h = f.child;
      if (f.tag === 22 && u) {
        var C = f.memoizedState !== null || au;
        if (!C) {
          var w = f.alternate, O = w !== null && w.memoizedState !== null || pr;
          w = au;
          var Y = pr;
          if (au = C, (pr = O) && !Y) for (ze = f; ze !== null; ) C = ze, O = C.child, C.tag === 22 && C.memoizedState !== null ? ap(f) : O !== null ? (O.return = C, ze = O) : ap(f);
          for (; h !== null; ) ze = h, rp(h), h = h.sibling;
          ze = f, au = w, pr = Y;
        }
        cu(n);
      } else f.subtreeFlags & 8772 && h !== null ? (h.return = f, ze = h) : cu(n);
    }
  }
  function cu(n) {
    for (; ze !== null; ) {
      var r = ze;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              pr || nf(5, r);
              break;
            case 1:
              var u = r.stateNode;
              if (r.flags & 4 && !pr) if (l === null) u.componentDidMount();
              else {
                var f = r.elementType === r.type ? l.memoizedProps : Kr(r.type, l.memoizedProps);
                u.componentDidUpdate(f, l.memoizedState, u.__reactInternalSnapshotBeforeUpdate);
              }
              var h = r.updateQueue;
              h !== null && wh(r, h, u);
              break;
            case 3:
              var C = r.updateQueue;
              if (C !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                wh(r, C, l);
              }
              break;
            case 5:
              var w = r.stateNode;
              if (l === null && r.flags & 4) {
                l = w;
                var O = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    O.autoFocus && l.focus();
                    break;
                  case "img":
                    O.src && (l.src = O.src);
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
                var Y = r.alternate;
                if (Y !== null) {
                  var le = Y.memoizedState;
                  if (le !== null) {
                    var ce = le.dehydrated;
                    ce !== null && Qu(ce);
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
              throw Error(p(163));
          }
          pr || r.flags & 512 && rf(r);
        } catch (ie) {
          wn(r, r.return, ie);
        }
      }
      if (r === n) {
        ze = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ze = l;
        break;
      }
      ze = r.return;
    }
  }
  function $h(n) {
    for (; ze !== null; ) {
      var r = ze;
      if (r === n) {
        ze = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ze = l;
        break;
      }
      ze = r.return;
    }
  }
  function ap(n) {
    for (; ze !== null; ) {
      var r = ze;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              nf(4, r);
            } catch (O) {
              wn(r, l, O);
            }
            break;
          case 1:
            var u = r.stateNode;
            if (typeof u.componentDidMount == "function") {
              var f = r.return;
              try {
                u.componentDidMount();
              } catch (O) {
                wn(r, f, O);
              }
            }
            var h = r.return;
            try {
              rf(r);
            } catch (O) {
              wn(r, h, O);
            }
            break;
          case 5:
            var C = r.return;
            try {
              rf(r);
            } catch (O) {
              wn(r, C, O);
            }
        }
      } catch (O) {
        wn(r, r.return, O);
      }
      if (r === n) {
        ze = null;
        break;
      }
      var w = r.sibling;
      if (w !== null) {
        w.return = r.return, ze = w;
        break;
      }
      ze = r.return;
    }
  }
  var Ng = Math.ceil, ro = _e.ReactCurrentDispatcher, af = _e.ReactCurrentOwner, La = _e.ReactCurrentBatchConfig, Dt = 0, Rn = null, cn = null, Wn = 0, Zr = 0, fu = Et(0), Qn = 0, Rs = null, ao = 0, du = 0, ip = 0, hl = null, Dr = null, lf = 0, pu = 1 / 0, ji = null, of = !1, lp = null, Ua = null, vu = !1, za = null, uf = 0, ws = 0, sf = null, _s = -1, io = 0;
  function or() {
    return Dt & 6 ? It() : _s !== -1 ? _s : _s = It();
  }
  function Vi(n) {
    return n.mode & 1 ? Dt & 2 && Wn !== 0 ? Wn & -Wn : wc.transition !== null ? (io === 0 && (io = nc()), io) : (n = Qt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : dd(n.type)), n) : 1;
  }
  function Cn(n, r, l, u) {
    if (50 < ws) throw ws = 0, sf = null, Error(p(185));
    Fl(n, l, u), (!(Dt & 2) || n !== Rn) && (n === Rn && (!(Dt & 2) && (du |= l), Qn === 4 && vi(n, Wn)), Gn(n, u), l === 1 && Dt === 0 && !(r.mode & 1) && (pu = It() + 500, ar && Yr()));
  }
  function Gn(n, r) {
    var l = n.callbackNode;
    tc(n, r);
    var u = Ga(n, n === Rn ? Wn : 0);
    if (u === 0) l !== null && gn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = u & -u, n.callbackPriority !== r) {
      if (l != null && gn(l), r === 1) n.tag === 0 ? jd(hu.bind(null, n)) : Fd(hu.bind(null, n)), Ld(function() {
        !(Dt & 6) && Yr();
      }), l = null;
      else {
        switch (sd(u)) {
          case 1:
            l = oa;
            break;
          case 4:
            l = _t;
            break;
          case 16:
            l = ui;
            break;
          case 536870912:
            l = id;
            break;
          default:
            l = ui;
        }
        l = Xh(l, cf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function cf(n, r) {
    if (_s = -1, io = 0, Dt & 6) throw Error(p(327));
    var l = n.callbackNode;
    if (mu() && n.callbackNode !== l) return null;
    var u = Ga(n, n === Rn ? Wn : 0);
    if (u === 0) return null;
    if (u & 30 || u & n.expiredLanes || r) r = df(n, u);
    else {
      r = u;
      var f = Dt;
      Dt |= 2;
      var h = Yh();
      (Rn !== n || Wn !== r) && (ji = null, pu = It() + 500, oo(n, r));
      do
        try {
          Ug();
          break;
        } catch (w) {
          Ih(n, w);
        }
      while (!0);
      da(), ro.current = h, Dt = f, cn !== null ? r = 0 : (Rn = null, Wn = 0, r = Qn);
    }
    if (r !== 0) {
      if (r === 2 && (f = od(n), f !== 0 && (u = f, r = lo(n, f))), r === 1) throw l = Rs, oo(n, 0), vi(n, u), Gn(n, It()), l;
      if (r === 6) vi(n, u);
      else {
        if (f = n.current.alternate, !(u & 30) && !up(f) && (r = df(n, u), r === 2 && (h = od(n), h !== 0 && (u = h, r = lo(n, h))), r === 1)) throw l = Rs, oo(n, 0), vi(n, u), Gn(n, It()), l;
        switch (n.finishedWork = f, n.finishedLanes = u, r) {
          case 0:
          case 1:
            throw Error(p(345));
          case 2:
            ml(n, Dr, ji);
            break;
          case 3:
            if (vi(n, u), (u & 130023424) === u && (r = lf + 500 - It(), 10 < r)) {
              if (Ga(n, 0) !== 0) break;
              if (f = n.suspendedLanes, (f & u) !== u) {
                or(), n.pingedLanes |= n.suspendedLanes & f;
                break;
              }
              n.timeoutHandle = Il(ml.bind(null, n, Dr, ji), r);
              break;
            }
            ml(n, Dr, ji);
            break;
          case 4:
            if (vi(n, u), (u & 4194240) === u) break;
            for (r = n.eventTimes, f = -1; 0 < u; ) {
              var C = 31 - Ea(u);
              h = 1 << C, C = r[C], C > f && (f = C), u &= ~h;
            }
            if (u = f, u = It() - u, u = (120 > u ? 120 : 480 > u ? 480 : 1080 > u ? 1080 : 1920 > u ? 1920 : 3e3 > u ? 3e3 : 4320 > u ? 4320 : 1960 * Ng(u / 1960)) - u, 10 < u) {
              n.timeoutHandle = Il(ml.bind(null, n, Dr, ji), u);
              break;
            }
            ml(n, Dr, ji);
            break;
          case 5:
            ml(n, Dr, ji);
            break;
          default:
            throw Error(p(329));
        }
      }
    }
    return Gn(n, It()), n.callbackNode === l ? cf.bind(null, n) : null;
  }
  function lo(n, r) {
    var l = hl;
    return n.current.memoizedState.isDehydrated && (oo(n, r).flags |= 256), n = df(n, r), n !== 2 && (r = Dr, Dr = l, r !== null && op(r)), n;
  }
  function op(n) {
    Dr === null ? Dr = n : Dr.push.apply(Dr, n);
  }
  function up(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var u = 0; u < l.length; u++) {
          var f = l[u], h = f.getSnapshot;
          f = f.value;
          try {
            if (!xa(h(), f)) return !1;
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
  function vi(n, r) {
    for (r &= ~ip, r &= ~du, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Ea(r), u = 1 << l;
      n[l] = -1, r &= ~u;
    }
  }
  function hu(n) {
    if (Dt & 6) throw Error(p(327));
    mu();
    var r = Ga(n, 0);
    if (!(r & 1)) return Gn(n, It()), null;
    var l = df(n, r);
    if (n.tag !== 0 && l === 2) {
      var u = od(n);
      u !== 0 && (r = u, l = lo(n, u));
    }
    if (l === 1) throw l = Rs, oo(n, 0), vi(n, r), Gn(n, It()), l;
    if (l === 6) throw Error(p(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, ml(n, Dr, ji), Gn(n, It()), null;
  }
  function sp(n, r) {
    var l = Dt;
    Dt |= 1;
    try {
      return n(r);
    } finally {
      Dt = l, Dt === 0 && (pu = It() + 500, ar && Yr());
    }
  }
  function hi(n) {
    za !== null && za.tag === 0 && !(Dt & 6) && mu();
    var r = Dt;
    Dt |= 1;
    var l = La.transition, u = Qt;
    try {
      if (La.transition = null, Qt = 1, n) return n();
    } finally {
      Qt = u, La.transition = l, Dt = r, !(Dt & 6) && Yr();
    }
  }
  function ff() {
    Zr = fu.current, Bt(fu);
  }
  function oo(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, yh(l)), cn !== null) for (l = cn.return; l !== null; ) {
      var u = l;
      switch (Hd(u), u.tag) {
        case 1:
          u = u.type.childContextTypes, u != null && _a();
          break;
        case 3:
          Qo(), Bt(Tn), Bt(ft), Qd();
          break;
        case 5:
          Wd(u);
          break;
        case 4:
          Qo();
          break;
        case 13:
          Bt(mn);
          break;
        case 19:
          Bt(mn);
          break;
        case 10:
          $d(u.type._context);
          break;
        case 22:
        case 23:
          ff();
      }
      l = l.return;
    }
    if (Rn = n, cn = n = yl(n.current, null), Wn = Zr = r, Qn = 0, Rs = null, ip = du = ao = 0, Dr = hl = null, Gl !== null) {
      for (r = 0; r < Gl.length; r++) if (l = Gl[r], u = l.interleaved, u !== null) {
        l.interleaved = null;
        var f = u.next, h = l.pending;
        if (h !== null) {
          var C = h.next;
          h.next = f, u.next = C;
        }
        l.pending = u;
      }
      Gl = null;
    }
    return n;
  }
  function Ih(n, r) {
    do {
      var l = cn;
      try {
        if (da(), Nc.current = _r, pa) {
          for (var u = Ge.memoizedState; u !== null; ) {
            var f = u.queue;
            f !== null && (f.pending = null), u = u.next;
          }
          pa = !1;
        }
        if (Ye = 0, kt = dt = Ge = null, Go = !1, hs = 0, af.current = null, l === null || l.return === null) {
          Qn = 1, Rs = r, cn = null;
          break;
        }
        e: {
          var h = n, C = l.return, w = l, O = r;
          if (r = Wn, w.flags |= 32768, O !== null && typeof O == "object" && typeof O.then == "function") {
            var Y = O, le = w, ce = le.tag;
            if (!(le.mode & 1) && (ce === 0 || ce === 11 || ce === 15)) {
              var ie = le.alternate;
              ie ? (le.updateQueue = ie.updateQueue, le.memoizedState = ie.memoizedState, le.lanes = ie.lanes) : (le.updateQueue = null, le.memoizedState = null);
            }
            var Oe = Uh(C);
            if (Oe !== null) {
              Oe.flags &= -257, Jd(Oe, C, w, h, r), Oe.mode & 1 && Cs(h, Y, r), r = Oe, O = Y;
              var je = r.updateQueue;
              if (je === null) {
                var Be = /* @__PURE__ */ new Set();
                Be.add(O), r.updateQueue = Be;
              } else je.add(O);
              break e;
            } else {
              if (!(r & 1)) {
                Cs(h, Y, r), ks();
                break e;
              }
              O = Error(p(426));
            }
          } else if (sn && w.mode & 1) {
            var Nn = Uh(C);
            if (Nn !== null) {
              !(Nn.flags & 65536) && (Nn.flags |= 256), Jd(Nn, C, w, h, r), Bd(pl(O, w));
              break e;
            }
          }
          h = O = pl(O, w), Qn !== 4 && (Qn = 2), hl === null ? hl = [h] : hl.push(h), h = C;
          do {
            switch (h.tag) {
              case 3:
                h.flags |= 65536, r &= -r, h.lanes |= r;
                var F = Nh(h, O, r);
                Rh(h, F);
                break e;
              case 1:
                w = O;
                var N = h.type, $ = h.stateNode;
                if (!(h.flags & 128) && (typeof N.getDerivedStateFromError == "function" || $ !== null && typeof $.componentDidCatch == "function" && (Ua === null || !Ua.has($)))) {
                  h.flags |= 65536, r &= -r, h.lanes |= r;
                  var me = Lh(h, w, r);
                  Rh(h, me);
                  break e;
                }
            }
            h = h.return;
          } while (h !== null);
        }
        Qh(l);
      } catch (We) {
        r = We, cn === l && l !== null && (cn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Yh() {
    var n = ro.current;
    return ro.current = _r, n === null ? _r : n;
  }
  function ks() {
    (Qn === 0 || Qn === 3 || Qn === 2) && (Qn = 4), Rn === null || !(ao & 268435455) && !(du & 268435455) || vi(Rn, Wn);
  }
  function df(n, r) {
    var l = Dt;
    Dt |= 2;
    var u = Yh();
    (Rn !== n || Wn !== r) && (ji = null, oo(n, r));
    do
      try {
        Lg();
        break;
      } catch (f) {
        Ih(n, f);
      }
    while (!0);
    if (da(), Dt = l, ro.current = u, cn !== null) throw Error(p(261));
    return Rn = null, Wn = 0, Qn;
  }
  function Lg() {
    for (; cn !== null; ) Wh(cn);
  }
  function Ug() {
    for (; cn !== null && !Br(); ) Wh(cn);
  }
  function Wh(n) {
    var r = Kh(n.alternate, n, Zr);
    n.memoizedProps = n.pendingProps, r === null ? Qh(n) : cn = r, af.current = null;
  }
  function Qh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = Og(l, r), l !== null) {
          l.flags &= 32767, cn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Qn = 6, cn = null;
          return;
        }
      } else if (l = Dg(l, r, Zr), l !== null) {
        cn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        cn = r;
        return;
      }
      cn = r = n;
    } while (r !== null);
    Qn === 0 && (Qn = 5);
  }
  function ml(n, r, l) {
    var u = Qt, f = La.transition;
    try {
      La.transition = null, Qt = 1, zg(n, r, l, u);
    } finally {
      La.transition = f, Qt = u;
    }
    return null;
  }
  function zg(n, r, l, u) {
    do
      mu();
    while (za !== null);
    if (Dt & 6) throw Error(p(327));
    l = n.finishedWork;
    var f = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(p(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var h = l.lanes | l.childLanes;
    if (og(n, h), n === Rn && (cn = Rn = null, Wn = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || vu || (vu = !0, Xh(ui, function() {
      return mu(), null;
    })), h = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || h) {
      h = La.transition, La.transition = null;
      var C = Qt;
      Qt = 1;
      var w = Dt;
      Dt |= 4, af.current = null, Ag(n, l), Bh(l, n), hc($l), jl = !!Md, $l = Md = null, n.current = l, Mg(l), el(), Dt = w, Qt = C, La.transition = h;
    } else n.current = l;
    if (vu && (vu = !1, za = n, uf = f), h = n.pendingLanes, h === 0 && (Ua = null), Av(l.stateNode), Gn(n, It()), r !== null) for (u = n.onRecoverableError, l = 0; l < r.length; l++) f = r[l], u(f.value, { componentStack: f.stack, digest: f.digest });
    if (of) throw of = !1, n = lp, lp = null, n;
    return uf & 1 && n.tag !== 0 && mu(), h = n.pendingLanes, h & 1 ? n === sf ? ws++ : (ws = 0, sf = n) : ws = 0, Yr(), null;
  }
  function mu() {
    if (za !== null) {
      var n = sd(uf), r = La.transition, l = Qt;
      try {
        if (La.transition = null, Qt = 16 > n ? 16 : n, za === null) var u = !1;
        else {
          if (n = za, za = null, uf = 0, Dt & 6) throw Error(p(331));
          var f = Dt;
          for (Dt |= 4, ze = n.current; ze !== null; ) {
            var h = ze, C = h.child;
            if (ze.flags & 16) {
              var w = h.deletions;
              if (w !== null) {
                for (var O = 0; O < w.length; O++) {
                  var Y = w[O];
                  for (ze = Y; ze !== null; ) {
                    var le = ze;
                    switch (le.tag) {
                      case 0:
                      case 11:
                      case 15:
                        lu(8, le, h);
                    }
                    var ce = le.child;
                    if (ce !== null) ce.return = le, ze = ce;
                    else for (; ze !== null; ) {
                      le = ze;
                      var ie = le.sibling, Oe = le.return;
                      if (Hh(le), le === Y) {
                        ze = null;
                        break;
                      }
                      if (ie !== null) {
                        ie.return = Oe, ze = ie;
                        break;
                      }
                      ze = Oe;
                    }
                  }
                }
                var je = h.alternate;
                if (je !== null) {
                  var Be = je.child;
                  if (Be !== null) {
                    je.child = null;
                    do {
                      var Nn = Be.sibling;
                      Be.sibling = null, Be = Nn;
                    } while (Be !== null);
                  }
                }
                ze = h;
              }
            }
            if (h.subtreeFlags & 2064 && C !== null) C.return = h, ze = C;
            else e: for (; ze !== null; ) {
              if (h = ze, h.flags & 2048) switch (h.tag) {
                case 0:
                case 11:
                case 15:
                  lu(9, h, h.return);
              }
              var F = h.sibling;
              if (F !== null) {
                F.return = h.return, ze = F;
                break e;
              }
              ze = h.return;
            }
          }
          var N = n.current;
          for (ze = N; ze !== null; ) {
            C = ze;
            var $ = C.child;
            if (C.subtreeFlags & 2064 && $ !== null) $.return = C, ze = $;
            else e: for (C = N; ze !== null; ) {
              if (w = ze, w.flags & 2048) try {
                switch (w.tag) {
                  case 0:
                  case 11:
                  case 15:
                    nf(9, w);
                }
              } catch (We) {
                wn(w, w.return, We);
              }
              if (w === C) {
                ze = null;
                break e;
              }
              var me = w.sibling;
              if (me !== null) {
                me.return = w.return, ze = me;
                break e;
              }
              ze = w.return;
            }
          }
          if (Dt = f, Yr(), Qa && typeof Qa.onPostCommitFiberRoot == "function") try {
            Qa.onPostCommitFiberRoot(Bu, n);
          } catch {
          }
          u = !0;
        }
        return u;
      } finally {
        Qt = l, La.transition = r;
      }
    }
    return !1;
  }
  function Gh(n, r, l) {
    r = pl(l, r), r = Nh(n, r, 1), n = fl(n, r, 1), r = or(), n !== null && (Fl(n, 1, r), Gn(n, r));
  }
  function wn(n, r, l) {
    if (n.tag === 3) Gh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Gh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var u = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof u.componentDidCatch == "function" && (Ua === null || !Ua.has(u))) {
          n = pl(l, n), n = Lh(r, n, 1), r = fl(r, n, 1), n = or(), r !== null && (Fl(r, 1, n), Gn(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Fg(n, r, l) {
    var u = n.pingCache;
    u !== null && u.delete(r), r = or(), n.pingedLanes |= n.suspendedLanes & l, Rn === n && (Wn & l) === l && (Qn === 4 || Qn === 3 && (Wn & 130023424) === Wn && 500 > It() - lf ? oo(n, 0) : ip |= l), Gn(n, r);
  }
  function qh(n, r) {
    r === 0 && (n.mode & 1 ? (r = Oo, Oo <<= 1, !(Oo & 130023424) && (Oo = 4194304)) : r = 1);
    var l = or();
    n = Ui(n, r), n !== null && (Fl(n, r, l), Gn(n, l));
  }
  function cp(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), qh(n, l);
  }
  function jg(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var u = n.stateNode, f = n.memoizedState;
        f !== null && (l = f.retryLane);
        break;
      case 19:
        u = n.stateNode;
        break;
      default:
        throw Error(p(314));
    }
    u !== null && u.delete(r), qh(n, l);
  }
  var Kh;
  Kh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Tn.current) Xr = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Xr = !1, Fi(n, r, l);
      Xr = !!(n.flags & 131072);
    }
    else Xr = !1, sn && r.flags & 1048576 && Vd(r, Bo, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var u = r.type;
        Ts(n, r), n = r.pendingProps;
        var f = wa(r, ft.current);
        Io(r, l), f = ae(null, r, u, n, f, l);
        var h = jn();
        return r.flags |= 1, typeof f == "object" && f !== null && typeof f.render == "function" && f.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, hn(u) ? (h = !0, Ec(r)) : h = !1, r.memoizedState = f.state !== null && f.state !== void 0 ? f.state : null, kc(r), f.updater = eo, r.stateNode = f, f._reactInternals = r, Kd(r, u, n, l), r = Kc(null, r, u, !0, h, l)) : (r.tag = 0, sn && h && bc(r), An(null, r, f, l), r = r.child), r;
      case 16:
        u = r.elementType;
        e: {
          switch (Ts(n, r), n = r.pendingProps, f = u._init, u = f(u._payload), r.type = u, f = r.tag = Vg(u), n = Kr(u, n), f) {
            case 0:
              r = Ct(null, r, u, n, l);
              break e;
            case 1:
              r = Es(null, r, u, n, l);
              break e;
            case 11:
              r = tu(null, r, u, n, l);
              break e;
            case 14:
              r = vl(null, r, u, Kr(u.type, n), l);
              break e;
          }
          throw Error(p(
            306,
            u,
            ""
          ));
        }
        return r;
      case 0:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : Kr(u, f), Ct(n, r, u, f, l);
      case 1:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : Kr(u, f), Es(n, r, u, f, l);
      case 3:
        e: {
          if (kg(r), n === null) throw Error(p(387));
          u = r.pendingProps, h = r.memoizedState, f = h.element, Yo(n, r), Oc(r, u, null, l);
          var C = r.memoizedState;
          if (u = C.element, h.isDehydrated) if (h = { element: u, isDehydrated: !1, cache: C.cache, pendingSuspenseBoundaries: C.pendingSuspenseBoundaries, transitions: C.transitions }, r.updateQueue.baseState = h, r.memoizedState = h, r.flags & 256) {
            f = pl(Error(p(423)), r), r = Fh(n, r, u, l, f);
            break e;
          } else if (u !== f) {
            f = pl(Error(p(424)), r), r = Fh(n, r, u, l, f);
            break e;
          } else for (Gr = Ja(r.stateNode.containerInfo.firstChild), fa = r, sn = !0, Da = null, l = Th(r, null, u, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Sn(), u === f) {
              r = Mn(n, r, l);
              break e;
            }
            An(n, r, u, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return _h(r), n === null && xc(r), u = r.type, f = r.pendingProps, h = n !== null ? n.memoizedProps : null, C = f.children, os(u, f) ? C = null : h !== null && os(u, h) && (r.flags |= 32), to(n, r), An(n, r, C, l), r.child;
      case 6:
        return n === null && xc(r), null;
      case 13:
        return jh(n, r, l);
      case 4:
        return Yd(r, r.stateNode.containerInfo), u = r.pendingProps, n === null ? r.child = $o(r, null, u, l) : An(n, r, u, l), r.child;
      case 11:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : Kr(u, f), tu(n, r, u, f, l);
      case 7:
        return An(n, r, r.pendingProps, l), r.child;
      case 8:
        return An(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return An(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (u = r.type._context, f = r.pendingProps, h = r.memoizedProps, C = f.value, Yt(Li, u._currentValue), u._currentValue = C, h !== null) if (xa(h.value, C)) {
            if (h.children === f.children && !Tn.current) {
              r = Mn(n, r, l);
              break e;
            }
          } else for (h = r.child, h !== null && (h.return = r); h !== null; ) {
            var w = h.dependencies;
            if (w !== null) {
              C = h.child;
              for (var O = w.firstContext; O !== null; ) {
                if (O.context === u) {
                  if (h.tag === 1) {
                    O = qr(-1, l & -l), O.tag = 2;
                    var Y = h.updateQueue;
                    if (Y !== null) {
                      Y = Y.shared;
                      var le = Y.pending;
                      le === null ? O.next = O : (O.next = le.next, le.next = O), Y.pending = O;
                    }
                  }
                  h.lanes |= l, O = h.alternate, O !== null && (O.lanes |= l), Id(
                    h.return,
                    l,
                    r
                  ), w.lanes |= l;
                  break;
                }
                O = O.next;
              }
            } else if (h.tag === 10) C = h.type === r.type ? null : h.child;
            else if (h.tag === 18) {
              if (C = h.return, C === null) throw Error(p(341));
              C.lanes |= l, w = C.alternate, w !== null && (w.lanes |= l), Id(C, l, r), C = h.sibling;
            } else C = h.child;
            if (C !== null) C.return = h;
            else for (C = h; C !== null; ) {
              if (C === r) {
                C = null;
                break;
              }
              if (h = C.sibling, h !== null) {
                h.return = C.return, C = h;
                break;
              }
              C = C.return;
            }
            h = C;
          }
          An(n, r, f.children, l), r = r.child;
        }
        return r;
      case 9:
        return f = r.type, u = r.pendingProps.children, Io(r, l), f = Aa(f), u = u(f), r.flags |= 1, An(n, r, u, l), r.child;
      case 14:
        return u = r.type, f = Kr(u, r.pendingProps), f = Kr(u.type, f), vl(n, r, u, f, l);
      case 15:
        return qc(n, r, r.type, r.pendingProps, l);
      case 17:
        return u = r.type, f = r.pendingProps, f = r.elementType === u ? f : Kr(u, f), Ts(n, r), r.tag = 1, hn(u) ? (n = !0, Ec(r)) : n = !1, Io(r, l), Oh(r, u, f), Kd(r, u, f, l), Kc(null, r, u, !0, n, l);
      case 19:
        return ep(n, r, l);
      case 22:
        return Jr(n, r, l);
    }
    throw Error(p(156, r.tag));
  };
  function Xh(n, r) {
    return on(n, r);
  }
  function Jh(n, r, l, u) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = u, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Fa(n, r, l, u) {
    return new Jh(n, r, l, u);
  }
  function fp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Vg(n) {
    if (typeof n == "function") return fp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === be) return 11;
      if (n === bt) return 14;
    }
    return 2;
  }
  function yl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Fa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function pf(n, r, l, u, f, h) {
    var C = 2;
    if (u = n, typeof n == "function") fp(n) && (C = 1);
    else if (typeof n == "string") C = 5;
    else e: switch (n) {
      case Ke:
        return uo(l.children, f, h, r);
      case xt:
        C = 8, f |= 8;
        break;
      case R:
        return n = Fa(12, l, r, f | 2), n.elementType = R, n.lanes = h, n;
      case ye:
        return n = Fa(13, l, r, f), n.elementType = ye, n.lanes = h, n;
      case Le:
        return n = Fa(19, l, r, f), n.elementType = Le, n.lanes = h, n;
      case At:
        return vf(l, f, h, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case pe:
            C = 10;
            break e;
          case Ne:
            C = 9;
            break e;
          case be:
            C = 11;
            break e;
          case bt:
            C = 14;
            break e;
          case ct:
            C = 16, u = null;
            break e;
        }
        throw Error(p(130, n == null ? n : typeof n, ""));
    }
    return r = Fa(C, l, r, f), r.elementType = n, r.type = u, r.lanes = h, r;
  }
  function uo(n, r, l, u) {
    return n = Fa(7, n, u, r), n.lanes = l, n;
  }
  function vf(n, r, l, u) {
    return n = Fa(22, n, u, r), n.elementType = At, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function hf(n, r, l) {
    return n = Fa(6, n, null, r), n.lanes = l, n;
  }
  function Ds(n, r, l) {
    return r = Fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function Os(n, r, l, u, f) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = ud(0), this.expirationTimes = ud(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = ud(0), this.identifierPrefix = u, this.onRecoverableError = f, this.mutableSourceEagerHydrationData = null;
  }
  function dp(n, r, l, u, f, h, C, w, O) {
    return n = new Os(n, r, l, w, O), r === 1 ? (r = 1, h === !0 && (r |= 8)) : r = 0, h = Fa(3, null, null, r), n.current = h, h.stateNode = n, h.memoizedState = { element: u, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, kc(h), n;
  }
  function Zh(n, r, l) {
    var u = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: ot, key: u == null ? null : "" + u, children: n, containerInfo: r, implementation: l };
  }
  function pp(n) {
    if (!n) return ci;
    n = n._reactInternals;
    e: {
      if (Je(n) !== n || n.tag !== 1) throw Error(p(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (hn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(p(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (hn(l)) return cs(n, l, r);
    }
    return r;
  }
  function vp(n, r, l, u, f, h, C, w, O) {
    return n = dp(l, u, !0, n, f, h, C, w, O), n.context = pp(null), l = n.current, u = or(), f = Vi(l), h = qr(u, f), h.callback = r ?? null, fl(l, h, f), n.current.lanes = f, Fl(n, f, u), Gn(n, u), n;
  }
  function mf(n, r, l, u) {
    var f = r.current, h = or(), C = Vi(f);
    return l = pp(l), r.context === null ? r.context = l : r.pendingContext = l, r = qr(h, C), r.payload = { element: n }, u = u === void 0 ? null : u, u !== null && (r.callback = u), n = fl(f, r, C), n !== null && (Cn(n, f, C, h), Dc(n, f, C)), C;
  }
  function As(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function em(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function hp(n, r) {
    em(n, r), (n = n.alternate) && em(n, r);
  }
  function Hg() {
    return null;
  }
  var mp = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function yf(n) {
    this._internalRoot = n;
  }
  Ms.prototype.render = yf.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(p(409));
    mf(n, r, null, null);
  }, Ms.prototype.unmount = yf.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      hi(function() {
        mf(null, n, null, null);
      }), r[Mi] = null;
    }
  };
  function Ms(n) {
    this._internalRoot = n;
  }
  Ms.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Uv();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < qt.length && r !== 0 && r < qt[l].priority; l++) ;
      qt.splice(l, 0, n), l === 0 && zv(n);
    }
  };
  function gl(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function gf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function tm() {
  }
  function Pg(n, r, l, u, f) {
    if (f) {
      if (typeof u == "function") {
        var h = u;
        u = function() {
          var Y = As(C);
          h.call(Y);
        };
      }
      var C = vp(r, u, n, 0, null, !1, !1, "", tm);
      return n._reactRootContainer = C, n[Mi] = C.current, Ho(n.nodeType === 8 ? n.parentNode : n), hi(), C;
    }
    for (; f = n.lastChild; ) n.removeChild(f);
    if (typeof u == "function") {
      var w = u;
      u = function() {
        var Y = As(O);
        w.call(Y);
      };
    }
    var O = dp(n, 0, !1, null, null, !1, !1, "", tm);
    return n._reactRootContainer = O, n[Mi] = O.current, Ho(n.nodeType === 8 ? n.parentNode : n), hi(function() {
      mf(r, O, l, u);
    }), O;
  }
  function Sf(n, r, l, u, f) {
    var h = l._reactRootContainer;
    if (h) {
      var C = h;
      if (typeof f == "function") {
        var w = f;
        f = function() {
          var O = As(C);
          w.call(O);
        };
      }
      mf(r, C, n, f);
    } else C = Pg(l, r, n, f, u);
    return As(C);
  }
  Lv = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = zl(r.pendingLanes);
          l !== 0 && ($u(r, l | 1), Gn(r, It()), !(Dt & 6) && (pu = It() + 500, Yr()));
        }
        break;
      case 13:
        hi(function() {
          var u = Ui(n, 1);
          if (u !== null) {
            var f = or();
            Cn(u, n, 1, f);
          }
        }), hp(n, 1);
    }
  }, rc = function(n) {
    if (n.tag === 13) {
      var r = Ui(n, 134217728);
      if (r !== null) {
        var l = or();
        Cn(r, n, 134217728, l);
      }
      hp(n, 134217728);
    }
  }, Gt = function(n) {
    if (n.tag === 13) {
      var r = Vi(n), l = Ui(n, r);
      if (l !== null) {
        var u = or();
        Cn(l, n, r, u);
      }
      hp(n, r);
    }
  }, Uv = function() {
    return Qt;
  }, cd = function(n, r) {
    var l = Qt;
    try {
      return Qt = n, r();
    } finally {
      Qt = l;
    }
  }, ia = function(n, r, l) {
    switch (r) {
      case "input":
        if (cr(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var u = l[r];
            if (u !== n && u.form === n.form) {
              var f = tt(u);
              if (!f) throw Error(p(90));
              Se(u), cr(u, f);
            }
          }
        }
        break;
      case "textarea":
        Fe(n, l);
        break;
      case "select":
        r = l.value, r != null && Ce(n, !!l.multiple, r, !1);
    }
  }, Pu = sp, Zs = hi;
  var Bg = { usingClientEntryPoint: !1, Events: [ss, Po, tt, Ml, _o, sp] }, Ns = { findFiberByHostInstance: Ra, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, nm = { bundleType: Ns.bundleType, version: Ns.version, rendererPackageName: Ns.rendererPackageName, rendererConfig: Ns.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: _e.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = wt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Ns.findFiberByHostInstance || Hg, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Cf = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Cf.isDisabled && Cf.supportsFiber) try {
      Bu = Cf.inject(nm), Qa = Cf;
    } catch {
    }
  }
  return $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Bg, $a.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!gl(r)) throw Error(p(200));
    return Zh(n, r, null, l);
  }, $a.createRoot = function(n, r) {
    if (!gl(n)) throw Error(p(299));
    var l = !1, u = "", f = mp;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (u = r.identifierPrefix), r.onRecoverableError !== void 0 && (f = r.onRecoverableError)), r = dp(n, 1, !1, null, null, l, !1, u, f), n[Mi] = r.current, Ho(n.nodeType === 8 ? n.parentNode : n), new yf(r);
  }, $a.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(p(188)) : (n = Object.keys(n).join(","), Error(p(268, n)));
    return n = wt(r), n = n === null ? null : n.stateNode, n;
  }, $a.flushSync = function(n) {
    return hi(n);
  }, $a.hydrate = function(n, r, l) {
    if (!gf(r)) throw Error(p(200));
    return Sf(null, n, r, !0, l);
  }, $a.hydrateRoot = function(n, r, l) {
    if (!gl(n)) throw Error(p(405));
    var u = l != null && l.hydratedSources || null, f = !1, h = "", C = mp;
    if (l != null && (l.unstable_strictMode === !0 && (f = !0), l.identifierPrefix !== void 0 && (h = l.identifierPrefix), l.onRecoverableError !== void 0 && (C = l.onRecoverableError)), r = vp(r, null, n, 1, l ?? null, f, !1, h, C), n[Mi] = r.current, Ho(n), u) for (n = 0; n < u.length; n++) l = u[n], f = l._getVersion, f = f(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, f] : r.mutableSourceEagerHydrationData.push(
      l,
      f
    );
    return new Ms(r);
  }, $a.render = function(n, r, l) {
    if (!gf(r)) throw Error(p(200));
    return Sf(null, n, r, !1, l);
  }, $a.unmountComponentAtNode = function(n) {
    if (!gf(n)) throw Error(p(40));
    return n._reactRootContainer ? (hi(function() {
      Sf(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Mi] = null;
      });
    }), !0) : !1;
  }, $a.unstable_batchedUpdates = sp, $a.unstable_renderSubtreeIntoContainer = function(n, r, l, u) {
    if (!gf(l)) throw Error(p(200));
    if (n == null || n._reactInternals === void 0) throw Error(p(38));
    return Sf(n, r, l, !1, u);
  }, $a.version = "18.3.1-next-f1338f8080-20240426", $a;
}
var Ia = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ex;
function qO() {
  return ex || (ex = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var s = $n, v = Nx(), p = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, S = !1;
    function b(e) {
      S = e;
    }
    function E(e) {
      if (!S) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        D("warn", e, a);
      }
    }
    function y(e) {
      if (!S) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        D("error", e, a);
      }
    }
    function D(e, t, a) {
      {
        var i = p.ReactDebugCurrentFrame, o = i.getStackAddendum();
        o !== "" && (t += "%s", a = a.concat([o]));
        var c = a.map(function(d) {
          return String(d);
        });
        c.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, c);
      }
    }
    var U = 0, j = 1, G = 2, A = 3, z = 4, q = 5, ee = 6, re = 7, de = 8, Ue = 9, ge = 10, ne = 11, _e = 12, Q = 13, ot = 14, Ke = 15, xt = 16, R = 17, pe = 18, Ne = 19, be = 21, ye = 22, Le = 23, bt = 24, ct = 25, At = !0, ve = !1, Pe = !1, V = !1, se = !1, De = !0, et = !1, Qe = !0, ht = !0, Ie = !0, at = !0, rt = /* @__PURE__ */ new Set(), pt = {}, mt = {};
    function zt(e, t) {
      Se(e, t), Se(e + "Capture", t);
    }
    function Se(e, t) {
      pt[e] && y("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), pt[e] = t;
      {
        var a = e.toLowerCase();
        mt[a] = e, e === "onDoubleClick" && (mt.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        rt.add(t[i]);
    }
    var Ft = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", vn = Object.prototype.hasOwnProperty;
    function kn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Zn(e) {
      try {
        return cr(e), !1;
      } catch {
        return !0;
      }
    }
    function cr(e) {
      return "" + e;
    }
    function k(e, t) {
      if (Zn(e))
        return y("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), cr(e);
    }
    function B(e) {
      if (Zn(e))
        return y("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kn(e)), cr(e);
    }
    function K(e, t) {
      if (Zn(e))
        return y("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), cr(e);
    }
    function Ce(e, t) {
      if (Zn(e))
        return y("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, kn(e)), cr(e);
    }
    function he(e) {
      if (Zn(e))
        return y("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", kn(e)), cr(e);
    }
    function ue(e) {
      if (Zn(e))
        return y("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", kn(e)), cr(e);
    }
    var Fe = 0, gt = 1, $t = 2, Rt = 3, Dn = 4, li = 5, Or = 6, Ee = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Xe = Ee + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Tt = new RegExp("^[" + Ee + "][" + Xe + "]*$"), Pt = {}, nn = {};
    function er(e) {
      return vn.call(nn, e) ? !0 : vn.call(Pt, e) ? !1 : Tt.test(e) ? (nn[e] = !0, !0) : (Pt[e] = !0, y("Invalid attribute name: `%s`", e), !1);
    }
    function On(e, t, a) {
      return t !== null ? t.type === Fe : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Pr(e, t, a, i) {
      if (a !== null && a.type === Fe)
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
          var o = e.toLowerCase().slice(0, 5);
          return o !== "data-" && o !== "aria-";
        }
        default:
          return !1;
      }
    }
    function rn(e, t, a, i) {
      if (t === null || typeof t > "u" || Pr(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Rt:
            return !t;
          case Dn:
            return t === !1;
          case li:
            return isNaN(t);
          case Or:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function ia(e) {
      return an.hasOwnProperty(e) ? an[e] : null;
    }
    function en(e, t, a, i, o, c, d) {
      this.acceptsBooleans = t === $t || t === Rt || t === Dn, this.attributeName = i, this.attributeNamespace = o, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = c, this.removeEmptyString = d;
    }
    var an = {}, wo = [
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
    wo.forEach(function(e) {
      an[e] = new en(
        e,
        Fe,
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
      an[t] = new en(
        t,
        gt,
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
      an[e] = new en(
        e,
        $t,
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
      an[e] = new en(
        e,
        $t,
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
      an[e] = new en(
        e,
        Rt,
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
      an[e] = new en(
        e,
        Rt,
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
      an[e] = new en(
        e,
        Dn,
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
      an[e] = new en(
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
    }), ["rowSpan", "start"].forEach(function(e) {
      an[e] = new en(
        e,
        li,
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
    var Ml = /[\-\:]([a-z])/g, _o = function(e) {
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
      var t = e.replace(Ml, _o);
      an[t] = new en(
        t,
        gt,
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
      var t = e.replace(Ml, _o);
      an[t] = new en(
        t,
        gt,
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
      var t = e.replace(Ml, _o);
      an[t] = new en(
        t,
        gt,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      an[e] = new en(
        e,
        gt,
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
    var Pu = "xlinkHref";
    an[Pu] = new en(
      "xlinkHref",
      gt,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      an[e] = new en(
        e,
        gt,
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
    var Zs = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Nl = !1;
    function ko(e) {
      !Nl && Zs.test(e) && (Nl = !0, y("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function Ll(e, t, a, i) {
      if (i.mustUseProperty) {
        var o = i.propertyName;
        return e[o];
      } else {
        k(a, t), i.sanitizeURL && ko("" + a);
        var c = i.attributeName, d = null;
        if (i.type === Dn) {
          if (e.hasAttribute(c)) {
            var m = e.getAttribute(c);
            return m === "" ? !0 : rn(t, a, i, !1) ? m : m === "" + a ? a : m;
          }
        } else if (e.hasAttribute(c)) {
          if (rn(t, a, i, !1))
            return e.getAttribute(c);
          if (i.type === Rt)
            return a;
          d = e.getAttribute(c);
        }
        return rn(t, a, i, !1) ? d === null ? a : d : d === "" + a ? a : d;
      }
    }
    function Do(e, t, a, i) {
      {
        if (!er(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var o = e.getAttribute(t);
        return k(a, t), o === "" + a ? a : o;
      }
    }
    function oi(e, t, a, i) {
      var o = ia(t);
      if (!On(t, o, i)) {
        if (rn(t, a, o, i) && (a = null), i || o === null) {
          if (er(t)) {
            var c = t;
            a === null ? e.removeAttribute(c) : (k(a, t), e.setAttribute(c, "" + a));
          }
          return;
        }
        var d = o.mustUseProperty;
        if (d) {
          var m = o.propertyName;
          if (a === null) {
            var g = o.type;
            e[m] = g === Rt ? !1 : "";
          } else
            e[m] = a;
          return;
        }
        var T = o.attributeName, x = o.attributeNamespace;
        if (a === null)
          e.removeAttribute(T);
        else {
          var L = o.type, M;
          L === Rt || L === Dn && a === !0 ? M = "" : (k(a, T), M = "" + a, o.sanitizeURL && ko(M.toString())), x ? e.setAttributeNS(x, T, M) : e.setAttribute(T, M);
        }
      }
    }
    var Ri = Symbol.for("react.element"), la = Symbol.for("react.portal"), Wa = Symbol.for("react.fragment"), Zi = Symbol.for("react.strict_mode"), Ul = Symbol.for("react.profiler"), _ = Symbol.for("react.provider"), oe = Symbol.for("react.context"), Te = Symbol.for("react.forward_ref"), Je = Symbol.for("react.suspense"), Mt = Symbol.for("react.suspense_list"), Ut = Symbol.for("react.memo"), ut = Symbol.for("react.lazy"), wt = Symbol.for("react.scope"), tr = Symbol.for("react.debug_trace_mode"), on = Symbol.for("react.offscreen"), gn = Symbol.for("react.legacy_hidden"), Br = Symbol.for("react.cache"), el = Symbol.for("react.tracing_marker"), It = Symbol.iterator, Tr = "@@iterator";
    function oa(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = It && e[It] || e[Tr];
      return typeof t == "function" ? t : null;
    }
    var _t = Object.assign, ui = 0, Ov, id, Bu, Qa, Av, Ea, Mv;
    function Nv() {
    }
    Nv.__reactDisabledLog = !0;
    function lg() {
      {
        if (ui === 0) {
          Ov = console.log, id = console.info, Bu = console.warn, Qa = console.error, Av = console.group, Ea = console.groupCollapsed, Mv = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Nv,
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
        ui++;
      }
    }
    function ec() {
      {
        if (ui--, ui === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: _t({}, e, {
              value: Ov
            }),
            info: _t({}, e, {
              value: id
            }),
            warn: _t({}, e, {
              value: Bu
            }),
            error: _t({}, e, {
              value: Qa
            }),
            group: _t({}, e, {
              value: Av
            }),
            groupCollapsed: _t({}, e, {
              value: Ea
            }),
            groupEnd: _t({}, e, {
              value: Mv
            })
          });
        }
        ui < 0 && y("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Oo = p.ReactCurrentDispatcher, zl;
    function Ga(e, t, a) {
      {
        if (zl === void 0)
          try {
            throw Error();
          } catch (o) {
            var i = o.stack.trim().match(/\n( *(at )?)/);
            zl = i && i[1] || "";
          }
        return `
` + zl + e;
      }
    }
    var ld = !1, tc;
    {
      var od = typeof WeakMap == "function" ? WeakMap : Map;
      tc = new od();
    }
    function nc(e, t) {
      if (!e || ld)
        return "";
      {
        var a = tc.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      ld = !0;
      var o = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var c;
      c = Oo.current, Oo.current = null, lg();
      try {
        if (t) {
          var d = function() {
            throw Error();
          };
          if (Object.defineProperty(d.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(d, []);
            } catch (W) {
              i = W;
            }
            Reflect.construct(e, [], d);
          } else {
            try {
              d.call();
            } catch (W) {
              i = W;
            }
            e.call(d.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (W) {
            i = W;
          }
          e();
        }
      } catch (W) {
        if (W && i && typeof W.stack == "string") {
          for (var m = W.stack.split(`
`), g = i.stack.split(`
`), T = m.length - 1, x = g.length - 1; T >= 1 && x >= 0 && m[T] !== g[x]; )
            x--;
          for (; T >= 1 && x >= 0; T--, x--)
            if (m[T] !== g[x]) {
              if (T !== 1 || x !== 1)
                do
                  if (T--, x--, x < 0 || m[T] !== g[x]) {
                    var L = `
` + m[T].replace(" at new ", " at ");
                    return e.displayName && L.includes("<anonymous>") && (L = L.replace("<anonymous>", e.displayName)), typeof e == "function" && tc.set(e, L), L;
                  }
                while (T >= 1 && x >= 0);
              break;
            }
        }
      } finally {
        ld = !1, Oo.current = c, ec(), Error.prepareStackTrace = o;
      }
      var M = e ? e.displayName || e.name : "", I = M ? Ga(M) : "";
      return typeof e == "function" && tc.set(e, I), I;
    }
    function ud(e, t, a) {
      return nc(e, !0);
    }
    function Fl(e, t, a) {
      return nc(e, !1);
    }
    function og(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function $u(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return nc(e, og(e));
      if (typeof e == "string")
        return Ga(e);
      switch (e) {
        case Je:
          return Ga("Suspense");
        case Mt:
          return Ga("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Te:
            return Fl(e.render);
          case Ut:
            return $u(e.type, t, a);
          case ut: {
            var i = e, o = i._payload, c = i._init;
            try {
              return $u(c(o), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Qt(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case q:
          return Ga(e.type);
        case xt:
          return Ga("Lazy");
        case Q:
          return Ga("Suspense");
        case Ne:
          return Ga("SuspenseList");
        case U:
        case G:
        case Ke:
          return Fl(e.type);
        case ne:
          return Fl(e.type.render);
        case j:
          return ud(e.type);
        default:
          return "";
      }
    }
    function sd(e) {
      try {
        var t = "", a = e;
        do
          t += Qt(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Lv(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var o = t.displayName || t.name || "";
      return o !== "" ? a + "(" + o + ")" : a;
    }
    function rc(e) {
      return e.displayName || "Context";
    }
    function Gt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && y("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Wa:
          return "Fragment";
        case la:
          return "Portal";
        case Ul:
          return "Profiler";
        case Zi:
          return "StrictMode";
        case Je:
          return "Suspense";
        case Mt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case oe:
            var t = e;
            return rc(t) + ".Consumer";
          case _:
            var a = e;
            return rc(a._context) + ".Provider";
          case Te:
            return Lv(e, e.render, "ForwardRef");
          case Ut:
            var i = e.displayName || null;
            return i !== null ? i : Gt(e.type) || "Memo";
          case ut: {
            var o = e, c = o._payload, d = o._init;
            try {
              return Gt(d(c));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Uv(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function cd(e) {
      return e.displayName || "Context";
    }
    function St(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case bt:
          return "Cache";
        case Ue:
          var i = a;
          return cd(i) + ".Consumer";
        case ge:
          var o = a;
          return cd(o._context) + ".Provider";
        case pe:
          return "DehydratedFragment";
        case ne:
          return Uv(a, a.render, "ForwardRef");
        case re:
          return "Fragment";
        case q:
          return a;
        case z:
          return "Portal";
        case A:
          return "Root";
        case ee:
          return "Text";
        case xt:
          return Gt(a);
        case de:
          return a === Zi ? "StrictMode" : "Mode";
        case ye:
          return "Offscreen";
        case _e:
          return "Profiler";
        case be:
          return "Scope";
        case Q:
          return "Suspense";
        case Ne:
          return "SuspenseList";
        case ct:
          return "TracingMarker";
        case j:
        case U:
        case R:
        case G:
        case ot:
        case Ke:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Iu = p.ReactDebugCurrentFrame, Un = null, ba = !1;
    function Ta() {
      {
        if (Un === null)
          return null;
        var e = Un._debugOwner;
        if (e !== null && typeof e < "u")
          return St(e);
      }
      return null;
    }
    function Yu() {
      return Un === null ? "" : sd(Un);
    }
    function In() {
      Iu.getCurrentStack = null, Un = null, ba = !1;
    }
    function qt(e) {
      Iu.getCurrentStack = e === null ? null : Yu, Un = e, ba = !1;
    }
    function ug() {
      return Un;
    }
    function qa(e) {
      ba = e;
    }
    function xr(e) {
      return "" + e;
    }
    function tl(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return ue(e), e;
        default:
          return "";
      }
    }
    var zv = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Ao(e, t) {
      zv[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || y("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || y("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function fd(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function Fv(e) {
      return e._valueTracker;
    }
    function Wu(e) {
      e._valueTracker = null;
    }
    function Qu(e) {
      var t = "";
      return e && (fd(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Mo(e) {
      var t = fd(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      ue(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var o = a.get, c = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return o.call(this);
          },
          set: function(m) {
            ue(m), i = "" + m, c.call(this, m);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var d = {
          getValue: function() {
            return i;
          },
          setValue: function(m) {
            ue(m), i = "" + m;
          },
          stopTracking: function() {
            Wu(e), delete e[t];
          }
        };
        return d;
      }
    }
    function jl(e) {
      Fv(e) || (e._valueTracker = Mo(e));
    }
    function jv(e) {
      if (!e)
        return !1;
      var t = Fv(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Qu(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ac(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var ic = !1, Gu = !1, lc = !1, dd = !1;
    function wi(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function qu(e, t) {
      var a = e, i = t.checked, o = _t({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return o;
    }
    function Ku(e, t) {
      Ao("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Gu && (y("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ta() || "A component", t.type), Gu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !ic && (y("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ta() || "A component", t.type), ic = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: tl(t.value != null ? t.value : i),
        controlled: wi(t)
      };
    }
    function pd(e, t) {
      var a = e, i = t.checked;
      i != null && oi(a, "checked", i, !1);
    }
    function No(e, t) {
      var a = e;
      {
        var i = wi(t);
        !a._wrapperState.controlled && i && !dd && (y("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), dd = !0), a._wrapperState.controlled && !i && !lc && (y("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), lc = !0);
      }
      pd(e, t);
      var o = tl(t.value), c = t.type;
      if (o != null)
        c === "number" ? (o === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != o) && (a.value = xr(o)) : a.value !== xr(o) && (a.value = xr(o));
      else if (c === "submit" || c === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? nl(a, t.type, o) : t.hasOwnProperty("defaultValue") && nl(a, t.type, tl(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Xu(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var o = t.type, c = o === "submit" || o === "reset";
        if (c && (t.value === void 0 || t.value === null))
          return;
        var d = xr(i._wrapperState.initialValue);
        a || d !== i.value && (i.value = d), i.defaultValue = d;
      }
      var m = i.name;
      m !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, m !== "" && (i.name = m);
    }
    function Vv(e, t) {
      var a = e;
      No(a, t), ua(a, t);
    }
    function ua(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        k(a, "name");
        for (var o = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), c = 0; c < o.length; c++) {
          var d = o[c];
          if (!(d === e || d.form !== e.form)) {
            var m = Sm(d);
            if (!m)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            jv(d), No(d, m);
          }
        }
      }
    }
    function nl(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ac(e.ownerDocument) !== e) && (a == null ? e.defaultValue = xr(e._wrapperState.initialValue) : e.defaultValue !== xr(a) && (e.defaultValue = xr(a)));
    }
    var oc = !1, Lo = !1, Hv = !1;
    function uc(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? s.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || Lo || (Lo = !0, y("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Hv || (Hv = !0, y("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !oc && (y("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), oc = !0);
    }
    function vd(e, t) {
      t.value != null && e.setAttribute("value", xr(tl(t.value)));
    }
    var Ju = Array.isArray;
    function nr(e) {
      return Ju(e);
    }
    var sc;
    sc = !1;
    function Pv() {
      var e = Ta();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var Bv = ["value", "defaultValue"];
    function sg(e) {
      {
        Ao("select", e);
        for (var t = 0; t < Bv.length; t++) {
          var a = Bv[t];
          if (e[a] != null) {
            var i = nr(e[a]);
            e.multiple && !i ? y("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, Pv()) : !e.multiple && i && y("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, Pv());
          }
        }
      }
    }
    function rl(e, t, a, i) {
      var o = e.options;
      if (t) {
        for (var c = a, d = {}, m = 0; m < c.length; m++)
          d["$" + c[m]] = !0;
        for (var g = 0; g < o.length; g++) {
          var T = d.hasOwnProperty("$" + o[g].value);
          o[g].selected !== T && (o[g].selected = T), T && i && (o[g].defaultSelected = !0);
        }
      } else {
        for (var x = xr(tl(a)), L = null, M = 0; M < o.length; M++) {
          if (o[M].value === x) {
            o[M].selected = !0, i && (o[M].defaultSelected = !0);
            return;
          }
          L === null && !o[M].disabled && (L = o[M]);
        }
        L !== null && (L.selected = !0);
      }
    }
    function hd(e, t) {
      return _t({}, t, {
        value: void 0
      });
    }
    function $v(e, t) {
      var a = e;
      sg(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !sc && (y("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), sc = !0);
    }
    function cg(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? rl(a, !!t.multiple, i, !1) : t.defaultValue != null && rl(a, !!t.multiple, t.defaultValue, !0);
    }
    function fg(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var o = t.value;
      o != null ? rl(a, !!t.multiple, o, !1) : i !== !!t.multiple && (t.defaultValue != null ? rl(a, !!t.multiple, t.defaultValue, !0) : rl(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function dg(e, t) {
      var a = e, i = t.value;
      i != null && rl(a, !!t.multiple, i, !1);
    }
    var md = !1;
    function yd(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = _t({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: xr(a._wrapperState.initialValue)
      });
      return i;
    }
    function Iv(e, t) {
      var a = e;
      Ao("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !md && (y("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Ta() || "A component"), md = !0);
      var i = t.value;
      if (i == null) {
        var o = t.children, c = t.defaultValue;
        if (o != null) {
          y("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (c != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (nr(o)) {
              if (o.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              o = o[0];
            }
            c = o;
          }
        }
        c == null && (c = ""), i = c;
      }
      a._wrapperState = {
        initialValue: tl(i)
      };
    }
    function Yv(e, t) {
      var a = e, i = tl(t.value), o = tl(t.defaultValue);
      if (i != null) {
        var c = xr(i);
        c !== a.value && (a.value = c), t.defaultValue == null && a.defaultValue !== c && (a.defaultValue = c);
      }
      o != null && (a.defaultValue = xr(o));
    }
    function Wv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function gd(e, t) {
      Yv(e, t);
    }
    var _i = "http://www.w3.org/1999/xhtml", pg = "http://www.w3.org/1998/Math/MathML", Sd = "http://www.w3.org/2000/svg";
    function cc(e) {
      switch (e) {
        case "svg":
          return Sd;
        case "math":
          return pg;
        default:
          return _i;
      }
    }
    function Cd(e, t) {
      return e == null || e === _i ? cc(t) : e === Sd && t === "foreignObject" ? _i : e;
    }
    var vg = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, o) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, o);
        });
      } : e;
    }, fc, Qv = vg(function(e, t) {
      if (e.namespaceURI === Sd && !("innerHTML" in e)) {
        fc = fc || document.createElement("div"), fc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = fc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), $r = 1, ki = 3, zn = 8, Ka = 9, Vl = 11, dc = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === ki) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, Gv = {
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
    }, Uo = {
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
    function qv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Kv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Uo).forEach(function(e) {
      Kv.forEach(function(t) {
        Uo[qv(t, e)] = Uo[e];
      });
    });
    function pc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Uo.hasOwnProperty(e) && Uo[e]) ? t + "px" : (Ce(t, e), ("" + t).trim());
    }
    var zo = /([A-Z])/g, hg = /^ms-/;
    function mg(e) {
      return e.replace(zo, "-$1").toLowerCase().replace(hg, "-ms-");
    }
    var Xv = function() {
    };
    {
      var Jv = /^(?:webkit|moz|o)[A-Z]/, Zv = /^-ms-/, Zu = /-(.)/g, Fo = /;\s*$/, jo = {}, Vo = {}, eh = !1, Ed = !1, bd = function(e) {
        return e.replace(Zu, function(t, a) {
          return a.toUpperCase();
        });
      }, Td = function(e) {
        jo.hasOwnProperty(e) && jo[e] || (jo[e] = !0, y(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          bd(e.replace(Zv, "ms-"))
        ));
      }, th = function(e) {
        jo.hasOwnProperty(e) && jo[e] || (jo[e] = !0, y("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, nh = function(e, t) {
        Vo.hasOwnProperty(t) && Vo[t] || (Vo[t] = !0, y(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Fo, "")));
      }, rh = function(e, t) {
        eh || (eh = !0, y("`NaN` is an invalid value for the `%s` css style property.", e));
      }, yg = function(e, t) {
        Ed || (Ed = !0, y("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      Xv = function(e, t) {
        e.indexOf("-") > -1 ? Td(e) : Jv.test(e) ? th(e) : Fo.test(t) && nh(e, t), typeof t == "number" && (isNaN(t) ? rh(e, t) : isFinite(t) || yg(e, t));
      };
    }
    var gg = Xv;
    function Sg(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var o = e[i];
            if (o != null) {
              var c = i.indexOf("--") === 0;
              t += a + (c ? i : mg(i)) + ":", t += pc(i, o, c), a = ";";
            }
          }
        return t || null;
      }
    }
    function ah(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var o = i.indexOf("--") === 0;
          o || gg(i, t[i]);
          var c = pc(i, t[i], o);
          i === "float" && (i = "cssFloat"), o ? a.setProperty(i, c) : a[i] = c;
        }
    }
    function Cg(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function xa(e) {
      var t = {};
      for (var a in e)
        for (var i = Gv[a] || [a], o = 0; o < i.length; o++)
          t[i[o]] = a;
      return t;
    }
    function es(e, t) {
      {
        if (!t)
          return;
        var a = xa(e), i = xa(t), o = {};
        for (var c in a) {
          var d = a[c], m = i[c];
          if (m && d !== m) {
            var g = d + "," + m;
            if (o[g])
              continue;
            o[g] = !0, y("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Cg(e[d]) ? "Removing" : "Updating", d, m);
          }
        }
      }
    }
    var ih = {
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
    }, lh = _t({
      menuitem: !0
    }, ih), oh = "__html";
    function vc(e, t) {
      if (t) {
        if (lh[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(oh in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && y("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Di(e, t) {
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
    var hc = {
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
    }, uh = {
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
    }, Xa = {}, xd = new RegExp("^(aria)-[" + Xe + "]*$"), ts = new RegExp("^(aria)[A-Z][" + Xe + "]*$");
    function Rd(e, t) {
      {
        if (vn.call(Xa, t) && Xa[t])
          return !0;
        if (ts.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = uh.hasOwnProperty(a) ? a : null;
          if (i == null)
            return y("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Xa[t] = !0, !0;
          if (t !== i)
            return y("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Xa[t] = !0, !0;
        }
        if (xd.test(t)) {
          var o = t.toLowerCase(), c = uh.hasOwnProperty(o) ? o : null;
          if (c == null)
            return Xa[t] = !0, !1;
          if (t !== c)
            return y("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, c), Xa[t] = !0, !0;
        }
      }
      return !0;
    }
    function sh(e, t) {
      {
        var a = [];
        for (var i in t) {
          var o = Rd(e, i);
          o || a.push(i);
        }
        var c = a.map(function(d) {
          return "`" + d + "`";
        }).join(", ");
        a.length === 1 ? y("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", c, e) : a.length > 1 && y("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", c, e);
      }
    }
    function mc(e, t) {
      Di(e, t) || sh(e, t);
    }
    var Hl = !1;
    function wd(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Hl && (Hl = !0, e === "select" && t.multiple ? y("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : y("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var _d = function() {
    };
    {
      var rr = {}, kd = /^on./, ch = /^on[^A-Z]/, fh = new RegExp("^(aria)-[" + Xe + "]*$"), dh = new RegExp("^(aria)[A-Z][" + Xe + "]*$");
      _d = function(e, t, a, i) {
        if (vn.call(rr, t) && rr[t])
          return !0;
        var o = t.toLowerCase();
        if (o === "onfocusin" || o === "onfocusout")
          return y("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), rr[t] = !0, !0;
        if (i != null) {
          var c = i.registrationNameDependencies, d = i.possibleRegistrationNames;
          if (c.hasOwnProperty(t))
            return !0;
          var m = d.hasOwnProperty(o) ? d[o] : null;
          if (m != null)
            return y("Invalid event handler property `%s`. Did you mean `%s`?", t, m), rr[t] = !0, !0;
          if (kd.test(t))
            return y("Unknown event handler property `%s`. It will be ignored.", t), rr[t] = !0, !0;
        } else if (kd.test(t))
          return ch.test(t) && y("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), rr[t] = !0, !0;
        if (fh.test(t) || dh.test(t))
          return !0;
        if (o === "innerhtml")
          return y("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), rr[t] = !0, !0;
        if (o === "aria")
          return y("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), rr[t] = !0, !0;
        if (o === "is" && a !== null && a !== void 0 && typeof a != "string")
          return y("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), rr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return y("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), rr[t] = !0, !0;
        var g = ia(t), T = g !== null && g.type === Fe;
        if (hc.hasOwnProperty(o)) {
          var x = hc[o];
          if (x !== t)
            return y("Invalid DOM property `%s`. Did you mean `%s`?", t, x), rr[t] = !0, !0;
        } else if (!T && t !== o)
          return y("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, o), rr[t] = !0, !0;
        return typeof a == "boolean" && Pr(t, a, g, !1) ? (a ? y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : y('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), rr[t] = !0, !0) : T ? !0 : Pr(t, a, g, !1) ? (rr[t] = !0, !1) : ((a === "false" || a === "true") && g !== null && g.type === Rt && (y("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), rr[t] = !0), !0);
      };
    }
    var ph = function(e, t, a) {
      {
        var i = [];
        for (var o in t) {
          var c = _d(e, o, t[o], a);
          c || i.push(o);
        }
        var d = i.map(function(m) {
          return "`" + m + "`";
        }).join(", ");
        i.length === 1 ? y("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", d, e) : i.length > 1 && y("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", d, e);
      }
    };
    function vh(e, t, a) {
      Di(e, t) || ph(e, t, a);
    }
    var Oi = 1, ns = 2, Pl = 4, Eg = Oi | ns | Pl, rs = null;
    function as(e) {
      rs !== null && y("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), rs = e;
    }
    function bg() {
      rs === null && y("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), rs = null;
    }
    function hh(e) {
      return e === rs;
    }
    function yc(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ki ? t.parentNode : t;
    }
    var tn = null, al = null, Ai = null;
    function Ho(e) {
      var t = Su(e);
      if (t) {
        if (typeof tn != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Sm(a);
          tn(t.stateNode, t.type, i);
        }
      }
    }
    function mh(e) {
      tn = e;
    }
    function gc(e) {
      al ? Ai ? Ai.push(e) : Ai = [e] : al = e;
    }
    function is() {
      return al !== null || Ai !== null;
    }
    function ls() {
      if (al) {
        var e = al, t = Ai;
        if (al = null, Ai = null, Ho(e), t)
          for (var a = 0; a < t.length; a++)
            Ho(t[a]);
      }
    }
    var Bl = function(e, t) {
      return e(t);
    }, Dd = function() {
    }, Od = !1;
    function Tg() {
      var e = is();
      e && (Dd(), ls());
    }
    function Ad(e, t, a) {
      if (Od)
        return e(t, a);
      Od = !0;
      try {
        return Bl(e, t, a);
      } finally {
        Od = !1, Tg();
      }
    }
    function Sc(e, t, a) {
      Bl = e, Dd = a;
    }
    function Cc(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Md(e, t, a) {
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
          return !!(a.disabled && Cc(t));
        default:
          return !1;
      }
    }
    function $l(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Sm(a);
      if (i === null)
        return null;
      var o = i[t];
      if (Md(t, e.type, i))
        return null;
      if (o && typeof o != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof o + "` type.");
      return o;
    }
    var os = !1;
    if (Ft)
      try {
        var Il = {};
        Object.defineProperty(Il, "passive", {
          get: function() {
            os = !0;
          }
        }), window.addEventListener("test", Il, Il), window.removeEventListener("test", Il, Il);
      } catch {
        os = !1;
      }
    function yh(e, t, a, i, o, c, d, m, g) {
      var T = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, T);
      } catch (x) {
        this.onError(x);
      }
    }
    var Nd = yh;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Ld = document.createElement("react");
      Nd = function(t, a, i, o, c, d, m, g, T) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var x = document.createEvent("Event"), L = !1, M = !0, I = window.event, W = Object.getOwnPropertyDescriptor(window, "event");
        function X() {
          Ld.removeEventListener(J, nt, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = I);
        }
        var we = Array.prototype.slice.call(arguments, 3);
        function nt() {
          L = !0, X(), a.apply(i, we), M = !1;
        }
        var qe, Lt = !1, Ot = !1;
        function H(P) {
          if (qe = P.error, Lt = !0, qe === null && P.colno === 0 && P.lineno === 0 && (Ot = !0), P.defaultPrevented && qe != null && typeof qe == "object")
            try {
              qe._suppressLogging = !0;
            } catch {
            }
        }
        var J = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", H), Ld.addEventListener(J, nt, !1), x.initEvent(J, !1, !1), Ld.dispatchEvent(x), W && Object.defineProperty(window, "event", W), L && M && (Lt ? Ot && (qe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : qe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(qe)), window.removeEventListener("error", H), !L)
          return X(), yh.apply(this, arguments);
      };
    }
    var xg = Nd, il = !1, Ja = null, us = !1, ll = null, si = {
      onError: function(e) {
        il = !0, Ja = e;
      }
    };
    function Yl(e, t, a, i, o, c, d, m, g) {
      il = !1, Ja = null, xg.apply(si, arguments);
    }
    function Mi(e, t, a, i, o, c, d, m, g) {
      if (Yl.apply(this, arguments), il) {
        var T = zd();
        us || (us = !0, ll = T);
      }
    }
    function Ud() {
      if (us) {
        var e = ll;
        throw us = !1, ll = null, e;
      }
    }
    function Rg() {
      return il;
    }
    function zd() {
      if (il) {
        var e = Ja;
        return il = !1, Ja = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ra(e) {
      return e._reactInternals;
    }
    function ss(e) {
      return e._reactInternals !== void 0;
    }
    function Po(e, t) {
      e._reactInternals = t;
    }
    var tt = (
      /*                      */
      0
    ), ol = (
      /*                */
      1
    ), un = (
      /*                    */
      2
    ), Et = (
      /*                       */
      4
    ), Bt = (
      /*                */
      16
    ), Yt = (
      /*                 */
      32
    ), ci = (
      /*                     */
      64
    ), ft = (
      /*                   */
      128
    ), Tn = (
      /*            */
      256
    ), Ir = (
      /*                          */
      512
    ), wa = (
      /*                     */
      1024
    ), hn = (
      /*                      */
      2048
    ), _a = (
      /*                    */
      4096
    ), ul = (
      /*                   */
      8192
    ), cs = (
      /*             */
      16384
    ), Ec = hn | Et | ci | Ir | wa | cs, gh = (
      /*               */
      32767
    ), sa = (
      /*                   */
      32768
    ), ar = (
      /*                */
      65536
    ), fs = (
      /* */
      131072
    ), Fd = (
      /*                       */
      1048576
    ), jd = (
      /*                    */
      2097152
    ), Yr = (
      /*                 */
      4194304
    ), sl = (
      /*                */
      8388608
    ), Wr = (
      /*               */
      16777216
    ), Wl = (
      /*              */
      33554432
    ), Bo = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      Et | wa | 0
    ), Qr = un | Et | Bt | Yt | Ir | _a | ul, Rr = Et | ci | Ir | ul, ka = hn | Bt, fr = Yr | sl | jd, Ni = p.ReactCurrentOwner;
    function ca(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (un | _a)) !== tt && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === A ? a : null;
    }
    function Vd(e) {
      if (e.tag === Q) {
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
    function bc(e) {
      return e.tag === A ? e.stateNode.containerInfo : null;
    }
    function Hd(e) {
      return ca(e) === e;
    }
    function fa(e) {
      {
        var t = Ni.current;
        if (t !== null && t.tag === j) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || y("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", St(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var o = Ra(e);
      return o ? ca(o) === o : !1;
    }
    function Gr(e) {
      if (ca(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function sn(e) {
      var t = e.alternate;
      if (!t) {
        var a = ca(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, o = t; ; ) {
        var c = i.return;
        if (c === null)
          break;
        var d = c.alternate;
        if (d === null) {
          var m = c.return;
          if (m !== null) {
            i = o = m;
            continue;
          }
          break;
        }
        if (c.child === d.child) {
          for (var g = c.child; g; ) {
            if (g === i)
              return Gr(c), e;
            if (g === o)
              return Gr(c), t;
            g = g.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== o.return)
          i = c, o = d;
        else {
          for (var T = !1, x = c.child; x; ) {
            if (x === i) {
              T = !0, i = c, o = d;
              break;
            }
            if (x === o) {
              T = !0, o = c, i = d;
              break;
            }
            x = x.sibling;
          }
          if (!T) {
            for (x = d.child; x; ) {
              if (x === i) {
                T = !0, i = d, o = c;
                break;
              }
              if (x === o) {
                T = !0, o = d, i = c;
                break;
              }
              x = x.sibling;
            }
            if (!T)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== o)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== A)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Da(e) {
      var t = sn(e);
      return t !== null ? Pd(t) : null;
    }
    function Pd(e) {
      if (e.tag === q || e.tag === ee)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Pd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Sh(e) {
      var t = sn(e);
      return t !== null ? Tc(t) : null;
    }
    function Tc(e) {
      if (e.tag === q || e.tag === ee)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== z) {
          var a = Tc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var xc = v.unstable_scheduleCallback, Ch = v.unstable_cancelCallback, Rc = v.unstable_shouldYield, Eh = v.unstable_requestPaint, Sn = v.unstable_now, Bd = v.unstable_getCurrentPriorityLevel, wc = v.unstable_ImmediatePriority, Ql = v.unstable_UserBlockingPriority, fi = v.unstable_NormalPriority, bh = v.unstable_LowPriority, _c = v.unstable_IdlePriority, $o = v.unstable_yieldValue, Th = v.unstable_setDisableYieldValue, Li = null, Yn = null, xe = null, Oa = !1, da = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function $d(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return y("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        ht && (e = _t({}, e, {
          getLaneLabelMap: Ui,
          injectProfilingHooks: xh
        })), Li = t.inject(e), Yn = t;
      } catch (a) {
        y("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Id(e, t) {
      if (Yn && typeof Yn.onScheduleFiberRoot == "function")
        try {
          Yn.onScheduleFiberRoot(Li, e, t);
        } catch (a) {
          Oa || (Oa = !0, y("React instrumentation encountered an error: %s", a));
        }
    }
    function Io(e, t) {
      if (Yn && typeof Yn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & ft) === ft;
          if (Ie) {
            var i;
            switch (t) {
              case Mn:
                i = wc;
                break;
              case Fi:
                i = Ql;
                break;
              case di:
                i = fi;
                break;
              case nu:
                i = _c;
                break;
              default:
                i = fi;
                break;
            }
            Yn.onCommitFiberRoot(Li, e, i, a);
          }
        } catch (o) {
          Oa || (Oa = !0, y("React instrumentation encountered an error: %s", o));
        }
    }
    function Aa(e) {
      if (Yn && typeof Yn.onPostCommitFiberRoot == "function")
        try {
          Yn.onPostCommitFiberRoot(Li, e);
        } catch (t) {
          Oa || (Oa = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function Gl(e) {
      if (Yn && typeof Yn.onCommitFiberUnmount == "function")
        try {
          Yn.onCommitFiberUnmount(Li, e);
        } catch (t) {
          Oa || (Oa = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function Fn(e) {
      if (typeof $o == "function" && (Th(e), b(e)), Yn && typeof Yn.setStrictMode == "function")
        try {
          Yn.setStrictMode(Li, e);
        } catch (t) {
          Oa || (Oa = !0, y("React instrumentation encountered an error: %s", t));
        }
    }
    function xh(e) {
      xe = e;
    }
    function Ui() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < ms; a++) {
          var i = _g(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function cl(e) {
      xe !== null && typeof xe.markCommitStarted == "function" && xe.markCommitStarted(e);
    }
    function kc() {
      xe !== null && typeof xe.markCommitStopped == "function" && xe.markCommitStopped();
    }
    function Yo(e) {
      xe !== null && typeof xe.markComponentRenderStarted == "function" && xe.markComponentRenderStarted(e);
    }
    function qr() {
      xe !== null && typeof xe.markComponentRenderStopped == "function" && xe.markComponentRenderStopped();
    }
    function fl(e) {
      xe !== null && typeof xe.markComponentPassiveEffectMountStarted == "function" && xe.markComponentPassiveEffectMountStarted(e);
    }
    function Dc() {
      xe !== null && typeof xe.markComponentPassiveEffectMountStopped == "function" && xe.markComponentPassiveEffectMountStopped();
    }
    function Rh(e) {
      xe !== null && typeof xe.markComponentPassiveEffectUnmountStarted == "function" && xe.markComponentPassiveEffectUnmountStarted(e);
    }
    function Oc() {
      xe !== null && typeof xe.markComponentPassiveEffectUnmountStopped == "function" && xe.markComponentPassiveEffectUnmountStopped();
    }
    function wh(e) {
      xe !== null && typeof xe.markComponentLayoutEffectMountStarted == "function" && xe.markComponentLayoutEffectMountStarted(e);
    }
    function ds() {
      xe !== null && typeof xe.markComponentLayoutEffectMountStopped == "function" && xe.markComponentLayoutEffectMountStopped();
    }
    function Za(e) {
      xe !== null && typeof xe.markComponentLayoutEffectUnmountStarted == "function" && xe.markComponentLayoutEffectUnmountStarted(e);
    }
    function Wo() {
      xe !== null && typeof xe.markComponentLayoutEffectUnmountStopped == "function" && xe.markComponentLayoutEffectUnmountStopped();
    }
    function ps(e, t, a) {
      xe !== null && typeof xe.markComponentErrored == "function" && xe.markComponentErrored(e, t, a);
    }
    function ql(e, t, a) {
      xe !== null && typeof xe.markComponentSuspended == "function" && xe.markComponentSuspended(e, t, a);
    }
    function Yd(e) {
      xe !== null && typeof xe.markLayoutEffectsStarted == "function" && xe.markLayoutEffectsStarted(e);
    }
    function Qo() {
      xe !== null && typeof xe.markLayoutEffectsStopped == "function" && xe.markLayoutEffectsStopped();
    }
    function _h(e) {
      xe !== null && typeof xe.markPassiveEffectsStarted == "function" && xe.markPassiveEffectsStarted(e);
    }
    function Wd() {
      xe !== null && typeof xe.markPassiveEffectsStopped == "function" && xe.markPassiveEffectsStopped();
    }
    function mn(e) {
      xe !== null && typeof xe.markRenderStarted == "function" && xe.markRenderStarted(e);
    }
    function Ac() {
      xe !== null && typeof xe.markRenderYielded == "function" && xe.markRenderYielded();
    }
    function Mc() {
      xe !== null && typeof xe.markRenderStopped == "function" && xe.markRenderStopped();
    }
    function Qd(e) {
      xe !== null && typeof xe.markRenderScheduled == "function" && xe.markRenderScheduled(e);
    }
    function Nc(e, t) {
      xe !== null && typeof xe.markForceUpdateScheduled == "function" && xe.markForceUpdateScheduled(e, t);
    }
    function vs(e, t) {
      xe !== null && typeof xe.markStateUpdateScheduled == "function" && xe.markStateUpdateScheduled(e, t);
    }
    var Ye = (
      /*                         */
      0
    ), Ge = (
      /*                 */
      1
    ), dt = (
      /*                    */
      2
    ), kt = (
      /*               */
      8
    ), pa = (
      /*              */
      16
    ), Go = Math.clz32 ? Math.clz32 : wr, hs = Math.log, wg = Math.LN2;
    function wr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (hs(t) / wg | 0) | 0;
    }
    var ms = 31, ae = (
      /*                        */
      0
    ), jn = (
      /*                          */
      0
    ), Ze = (
      /*                        */
      1
    ), dr = (
      /*    */
      2
    ), va = (
      /*             */
      4
    ), zi = (
      /*            */
      8
    ), Ma = (
      /*                     */
      16
    ), qo = (
      /*                */
      32
    ), Kl = (
      /*                       */
      4194240
    ), Ko = (
      /*                        */
      64
    ), Lc = (
      /*                        */
      128
    ), Uc = (
      /*                        */
      256
    ), zc = (
      /*                        */
      512
    ), Fc = (
      /*                        */
      1024
    ), jc = (
      /*                        */
      2048
    ), Xl = (
      /*                        */
      4096
    ), Vc = (
      /*                        */
      8192
    ), Xo = (
      /*                        */
      16384
    ), Jo = (
      /*                       */
      32768
    ), Hc = (
      /*                       */
      65536
    ), ys = (
      /*                       */
      131072
    ), Pc = (
      /*                       */
      262144
    ), Bc = (
      /*                       */
      524288
    ), $c = (
      /*                       */
      1048576
    ), Ic = (
      /*                       */
      2097152
    ), Zo = (
      /*                            */
      130023424
    ), Jl = (
      /*                             */
      4194304
    ), Yc = (
      /*                             */
      8388608
    ), Wc = (
      /*                             */
      16777216
    ), Gd = (
      /*                             */
      33554432
    ), Qc = (
      /*                             */
      67108864
    ), kh = Jl, gs = (
      /*          */
      134217728
    ), qd = (
      /*                          */
      268435455
    ), eu = (
      /*               */
      268435456
    ), dl = (
      /*                        */
      536870912
    ), _r = (
      /*                   */
      1073741824
    );
    function _g(e) {
      {
        if (e & Ze)
          return "Sync";
        if (e & dr)
          return "InputContinuousHydration";
        if (e & va)
          return "InputContinuous";
        if (e & zi)
          return "DefaultHydration";
        if (e & Ma)
          return "Default";
        if (e & qo)
          return "TransitionHydration";
        if (e & Kl)
          return "Transition";
        if (e & Zo)
          return "Retry";
        if (e & gs)
          return "SelectiveHydration";
        if (e & eu)
          return "IdleHydration";
        if (e & dl)
          return "Idle";
        if (e & _r)
          return "Offscreen";
      }
    }
    var ln = -1, Gc = Ko, Kr = Jl;
    function Zl(e) {
      switch (An(e)) {
        case Ze:
          return Ze;
        case dr:
          return dr;
        case va:
          return va;
        case zi:
          return zi;
        case Ma:
          return Ma;
        case qo:
          return qo;
        case Ko:
        case Lc:
        case Uc:
        case zc:
        case Fc:
        case jc:
        case Xl:
        case Vc:
        case Xo:
        case Jo:
        case Hc:
        case ys:
        case Pc:
        case Bc:
        case $c:
        case Ic:
          return e & Kl;
        case Jl:
        case Yc:
        case Wc:
        case Gd:
        case Qc:
          return e & Zo;
        case gs:
          return gs;
        case eu:
          return eu;
        case dl:
          return dl;
        case _r:
          return _r;
        default:
          return y("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function eo(e, t) {
      var a = e.pendingLanes;
      if (a === ae)
        return ae;
      var i = ae, o = e.suspendedLanes, c = e.pingedLanes, d = a & qd;
      if (d !== ae) {
        var m = d & ~o;
        if (m !== ae)
          i = Zl(m);
        else {
          var g = d & c;
          g !== ae && (i = Zl(g));
        }
      } else {
        var T = a & ~o;
        T !== ae ? i = Zl(T) : c !== ae && (i = Zl(c));
      }
      if (i === ae)
        return ae;
      if (t !== ae && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & o) === ae) {
        var x = An(i), L = An(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          x >= L || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          x === Ma && (L & Kl) !== ae
        )
          return t;
      }
      (i & va) !== ae && (i |= a & Ma);
      var M = e.entangledLanes;
      if (M !== ae)
        for (var I = e.entanglements, W = i & M; W > 0; ) {
          var X = vl(W), we = 1 << X;
          i |= I[X], W &= ~we;
        }
      return i;
    }
    function Dh(e, t) {
      for (var a = e.eventTimes, i = ln; t > 0; ) {
        var o = vl(t), c = 1 << o, d = a[o];
        d > i && (i = d), t &= ~c;
      }
      return i;
    }
    function Oh(e, t) {
      switch (e) {
        case Ze:
        case dr:
        case va:
          return t + 250;
        case zi:
        case Ma:
        case qo:
        case Ko:
        case Lc:
        case Uc:
        case zc:
        case Fc:
        case jc:
        case Xl:
        case Vc:
        case Xo:
        case Jo:
        case Hc:
        case ys:
        case Pc:
        case Bc:
        case $c:
        case Ic:
          return t + 5e3;
        case Jl:
        case Yc:
        case Wc:
        case Gd:
        case Qc:
          return ln;
        case gs:
        case eu:
        case dl:
        case _r:
          return ln;
        default:
          return y("Should have found matching lanes. This is a bug in React."), ln;
      }
    }
    function Ah(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, o = e.pingedLanes, c = e.expirationTimes, d = a; d > 0; ) {
        var m = vl(d), g = 1 << m, T = c[m];
        T === ln ? ((g & i) === ae || (g & o) !== ae) && (c[m] = Oh(g, t)) : T <= t && (e.expiredLanes |= g), d &= ~g;
      }
    }
    function Kd(e) {
      return Zl(e.pendingLanes);
    }
    function pl(e) {
      var t = e.pendingLanes & ~_r;
      return t !== ae ? t : t & _r ? _r : ae;
    }
    function Xd(e) {
      return (e & Ze) !== ae;
    }
    function Ss(e) {
      return (e & qd) !== ae;
    }
    function Mh(e) {
      return (e & Zo) === e;
    }
    function Nh(e) {
      var t = Ze | va | Ma;
      return (e & t) === ae;
    }
    function Lh(e) {
      return (e & Kl) === e;
    }
    function Cs(e, t) {
      var a = dr | va | zi | Ma;
      return (t & a) !== ae;
    }
    function Uh(e, t) {
      return (t & e.expiredLanes) !== ae;
    }
    function Jd(e) {
      return (e & Kl) !== ae;
    }
    function zh() {
      var e = Gc;
      return Gc <<= 1, (Gc & Kl) === ae && (Gc = Ko), e;
    }
    function Xr() {
      var e = Kr;
      return Kr <<= 1, (Kr & Zo) === ae && (Kr = Jl), e;
    }
    function An(e) {
      return e & -e;
    }
    function tu(e) {
      return An(e);
    }
    function vl(e) {
      return 31 - Go(e);
    }
    function qc(e) {
      return vl(e);
    }
    function Jr(e, t) {
      return (e & t) !== ae;
    }
    function to(e, t) {
      return (e & t) === t;
    }
    function Ct(e, t) {
      return e | t;
    }
    function Es(e, t) {
      return e & ~t;
    }
    function Kc(e, t) {
      return e & t;
    }
    function kg(e) {
      return e;
    }
    function Fh(e, t) {
      return e !== jn && e < t ? e : t;
    }
    function bs(e) {
      for (var t = [], a = 0; a < ms; a++)
        t.push(e);
      return t;
    }
    function no(e, t, a) {
      e.pendingLanes |= t, t !== dl && (e.suspendedLanes = ae, e.pingedLanes = ae);
      var i = e.eventTimes, o = qc(t);
      i[o] = a;
    }
    function jh(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var o = vl(i), c = 1 << o;
        a[o] = ln, i &= ~c;
      }
    }
    function Xc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Jc(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = ae, e.pingedLanes = ae, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, o = e.eventTimes, c = e.expirationTimes, d = a; d > 0; ) {
        var m = vl(d), g = 1 << m;
        i[m] = ae, o[m] = ln, c[m] = ln, d &= ~g;
      }
    }
    function Zd(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, o = a; o; ) {
        var c = vl(o), d = 1 << c;
        // Is this one of the newly entangled lanes?
        d & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[c] & t && (i[c] |= t), o &= ~d;
      }
    }
    function Vh(e, t) {
      var a = An(t), i;
      switch (a) {
        case va:
          i = dr;
          break;
        case Ma:
          i = zi;
          break;
        case Ko:
        case Lc:
        case Uc:
        case zc:
        case Fc:
        case jc:
        case Xl:
        case Vc:
        case Xo:
        case Jo:
        case Hc:
        case ys:
        case Pc:
        case Bc:
        case $c:
        case Ic:
        case Jl:
        case Yc:
        case Wc:
        case Gd:
        case Qc:
          i = qo;
          break;
        case dl:
          i = eu;
          break;
        default:
          i = jn;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== jn ? jn : i;
    }
    function Zc(e, t, a) {
      if (da)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var o = qc(a), c = 1 << o, d = i[o];
          d.add(t), a &= ~c;
        }
    }
    function ep(e, t) {
      if (da)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var o = qc(t), c = 1 << o, d = a[o];
          d.size > 0 && (d.forEach(function(m) {
            var g = m.alternate;
            (g === null || !i.has(g)) && i.add(m);
          }), d.clear()), t &= ~c;
        }
    }
    function Ts(e, t) {
      return null;
    }
    var Mn = Ze, Fi = va, di = Ma, nu = dl, ru = jn;
    function Na() {
      return ru;
    }
    function xn(e) {
      ru = e;
    }
    function kr(e, t) {
      var a = ru;
      try {
        return ru = e, t();
      } finally {
        ru = a;
      }
    }
    function Dg(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function Og(e, t) {
      return e > t ? e : t;
    }
    function au(e, t) {
      return e !== 0 && e < t;
    }
    function pr(e) {
      var t = An(e);
      return au(Mn, t) ? au(Fi, t) ? Ss(t) ? di : nu : Fi : Mn;
    }
    function ef(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ze;
    function iu(e) {
      ze = e;
    }
    function tp(e) {
      ze(e);
    }
    var tf;
    function Ag(e) {
      tf = e;
    }
    var lu;
    function nf(e) {
      lu = e;
    }
    var rf;
    function Hh(e) {
      rf = e;
    }
    var np;
    function Ph(e) {
      np = e;
    }
    var xs = !1, ou = [], yn = null, ir = null, Ar = null, uu = /* @__PURE__ */ new Map(), su = /* @__PURE__ */ new Map(), lr = [], Bh = [
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
    function pi(e) {
      return Bh.indexOf(e) > -1;
    }
    function Mg(e, t, a, i, o) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: o,
        targetContainers: [i]
      };
    }
    function rp(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          yn = null;
          break;
        case "dragenter":
        case "dragleave":
          ir = null;
          break;
        case "mouseover":
        case "mouseout":
          Ar = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          uu.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          su.delete(i);
          break;
        }
      }
    }
    function cu(e, t, a, i, o, c) {
      if (e === null || e.nativeEvent !== c) {
        var d = Mg(t, a, i, o, c);
        if (t !== null) {
          var m = Su(t);
          m !== null && tf(m);
        }
        return d;
      }
      e.eventSystemFlags |= i;
      var g = e.targetContainers;
      return o !== null && g.indexOf(o) === -1 && g.push(o), e;
    }
    function $h(e, t, a, i, o) {
      switch (t) {
        case "focusin": {
          var c = o;
          return yn = cu(yn, e, t, a, i, c), !0;
        }
        case "dragenter": {
          var d = o;
          return ir = cu(ir, e, t, a, i, d), !0;
        }
        case "mouseover": {
          var m = o;
          return Ar = cu(Ar, e, t, a, i, m), !0;
        }
        case "pointerover": {
          var g = o, T = g.pointerId;
          return uu.set(T, cu(uu.get(T) || null, e, t, a, i, g)), !0;
        }
        case "gotpointercapture": {
          var x = o, L = x.pointerId;
          return su.set(L, cu(su.get(L) || null, e, t, a, i, x)), !0;
        }
      }
      return !1;
    }
    function ap(e) {
      var t = zs(e.target);
      if (t !== null) {
        var a = ca(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Q) {
            var o = Vd(a);
            if (o !== null) {
              e.blockedOn = o, np(e.priority, function() {
                lu(a);
              });
              return;
            }
          } else if (i === A) {
            var c = a.stateNode;
            if (ef(c)) {
              e.blockedOn = bc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Ng(e) {
      for (var t = rf(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < lr.length && au(t, lr[i].priority); i++)
        ;
      lr.splice(i, 0, a), i === 0 && ap(a);
    }
    function ro(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = Dr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var o = e.nativeEvent, c = new o.constructor(o.type, o);
          as(c), o.target.dispatchEvent(c), bg();
        } else {
          var d = Su(i);
          return d !== null && tf(d), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function af(e, t, a) {
      ro(e) && a.delete(t);
    }
    function La() {
      xs = !1, yn !== null && ro(yn) && (yn = null), ir !== null && ro(ir) && (ir = null), Ar !== null && ro(Ar) && (Ar = null), uu.forEach(af), su.forEach(af);
    }
    function Dt(e, t) {
      e.blockedOn === t && (e.blockedOn = null, xs || (xs = !0, v.unstable_scheduleCallback(v.unstable_NormalPriority, La)));
    }
    function Rn(e) {
      if (ou.length > 0) {
        Dt(ou[0], e);
        for (var t = 1; t < ou.length; t++) {
          var a = ou[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      yn !== null && Dt(yn, e), ir !== null && Dt(ir, e), Ar !== null && Dt(Ar, e);
      var i = function(m) {
        return Dt(m, e);
      };
      uu.forEach(i), su.forEach(i);
      for (var o = 0; o < lr.length; o++) {
        var c = lr[o];
        c.blockedOn === e && (c.blockedOn = null);
      }
      for (; lr.length > 0; ) {
        var d = lr[0];
        if (d.blockedOn !== null)
          break;
        ap(d), d.blockedOn === null && lr.shift();
      }
    }
    var cn = p.ReactCurrentBatchConfig, Wn = !0;
    function Zr(e) {
      Wn = !!e;
    }
    function fu() {
      return Wn;
    }
    function Qn(e, t, a) {
      var i = lf(t), o;
      switch (i) {
        case Mn:
          o = Rs;
          break;
        case Fi:
          o = ao;
          break;
        case di:
        default:
          o = du;
          break;
      }
      return o.bind(null, t, a, e);
    }
    function Rs(e, t, a, i) {
      var o = Na(), c = cn.transition;
      cn.transition = null;
      try {
        xn(Mn), du(e, t, a, i);
      } finally {
        xn(o), cn.transition = c;
      }
    }
    function ao(e, t, a, i) {
      var o = Na(), c = cn.transition;
      cn.transition = null;
      try {
        xn(Fi), du(e, t, a, i);
      } finally {
        xn(o), cn.transition = c;
      }
    }
    function du(e, t, a, i) {
      Wn && ip(e, t, a, i);
    }
    function ip(e, t, a, i) {
      var o = Dr(e, t, a, i);
      if (o === null) {
        Kg(e, t, i, hl, a), rp(e, i);
        return;
      }
      if ($h(o, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (rp(e, i), t & Pl && pi(e)) {
        for (; o !== null; ) {
          var c = Su(o);
          c !== null && tp(c);
          var d = Dr(e, t, a, i);
          if (d === null && Kg(e, t, i, hl, a), d === o)
            break;
          o = d;
        }
        o !== null && i.stopPropagation();
        return;
      }
      Kg(e, t, i, null, a);
    }
    var hl = null;
    function Dr(e, t, a, i) {
      hl = null;
      var o = yc(i), c = zs(o);
      if (c !== null) {
        var d = ca(c);
        if (d === null)
          c = null;
        else {
          var m = d.tag;
          if (m === Q) {
            var g = Vd(d);
            if (g !== null)
              return g;
            c = null;
          } else if (m === A) {
            var T = d.stateNode;
            if (ef(T))
              return bc(d);
            c = null;
          } else d !== c && (c = null);
        }
      }
      return hl = c, null;
    }
    function lf(e) {
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
          return Mn;
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
          return Fi;
        case "message": {
          var t = Bd();
          switch (t) {
            case wc:
              return Mn;
            case Ql:
              return Fi;
            case fi:
            case bh:
              return di;
            case _c:
              return nu;
            default:
              return di;
          }
        }
        default:
          return di;
      }
    }
    function pu(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ji(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function of(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function lp(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Ua = null, vu = null, za = null;
    function uf(e) {
      return Ua = e, vu = _s(), !0;
    }
    function ws() {
      Ua = null, vu = null, za = null;
    }
    function sf() {
      if (za)
        return za;
      var e, t = vu, a = t.length, i, o = _s(), c = o.length;
      for (e = 0; e < a && t[e] === o[e]; e++)
        ;
      var d = a - e;
      for (i = 1; i <= d && t[a - i] === o[c - i]; i++)
        ;
      var m = i > 1 ? 1 - i : void 0;
      return za = o.slice(e, m), za;
    }
    function _s() {
      return "value" in Ua ? Ua.value : Ua.textContent;
    }
    function io(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function or() {
      return !0;
    }
    function Vi() {
      return !1;
    }
    function Cn(e) {
      function t(a, i, o, c, d) {
        this._reactName = a, this._targetInst = o, this.type = i, this.nativeEvent = c, this.target = d, this.currentTarget = null;
        for (var m in e)
          if (e.hasOwnProperty(m)) {
            var g = e[m];
            g ? this[m] = g(c) : this[m] = c[m];
          }
        var T = c.defaultPrevented != null ? c.defaultPrevented : c.returnValue === !1;
        return T ? this.isDefaultPrevented = or : this.isDefaultPrevented = Vi, this.isPropagationStopped = Vi, this;
      }
      return _t(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = or);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = or);
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
        isPersistent: or
      }), t;
    }
    var Gn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, cf = Cn(Gn), lo = _t({}, Gn, {
      view: 0,
      detail: 0
    }), op = Cn(lo), up, vi, hu;
    function sp(e) {
      e !== hu && (hu && e.type === "mousemove" ? (up = e.screenX - hu.screenX, vi = e.screenY - hu.screenY) : (up = 0, vi = 0), hu = e);
    }
    var hi = _t({}, lo, {
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
      getModifierState: cp,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (sp(e), up);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : vi;
      }
    }), ff = Cn(hi), oo = _t({}, hi, {
      dataTransfer: 0
    }), Ih = Cn(oo), Yh = _t({}, lo, {
      relatedTarget: 0
    }), ks = Cn(Yh), df = _t({}, Gn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Lg = Cn(df), Ug = _t({}, Gn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), Wh = Cn(Ug), Qh = _t({}, Gn, {
      data: 0
    }), ml = Cn(Qh), zg = ml, mu = {
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
    }, Gh = {
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
    function wn(e) {
      if (e.key) {
        var t = mu[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = io(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? Gh[e.keyCode] || "Unidentified" : "";
    }
    var Fg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function qh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Fg[e];
      return i ? !!a[i] : !1;
    }
    function cp(e) {
      return qh;
    }
    var jg = _t({}, lo, {
      key: wn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: cp,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? io(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? io(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Kh = Cn(jg), Xh = _t({}, hi, {
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
    }), Jh = Cn(Xh), Fa = _t({}, lo, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: cp
    }), fp = Cn(Fa), Vg = _t({}, Gn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), yl = Cn(Vg), pf = _t({}, hi, {
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
    }), uo = Cn(pf), vf = [9, 13, 27, 32], hf = 229, Ds = Ft && "CompositionEvent" in window, Os = null;
    Ft && "documentMode" in document && (Os = document.documentMode);
    var dp = Ft && "TextEvent" in window && !Os, Zh = Ft && (!Ds || Os && Os > 8 && Os <= 11), pp = 32, vp = String.fromCharCode(pp);
    function mf() {
      zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), zt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), zt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), zt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var As = !1;
    function em(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function hp(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Hg(e, t) {
      return e === "keydown" && t.keyCode === hf;
    }
    function mp(e, t) {
      switch (e) {
        case "keyup":
          return vf.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== hf;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function yf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function Ms(e) {
      return e.locale === "ko";
    }
    var gl = !1;
    function gf(e, t, a, i, o) {
      var c, d;
      if (Ds ? c = hp(t) : gl ? mp(t, i) && (c = "onCompositionEnd") : Hg(t, i) && (c = "onCompositionStart"), !c)
        return null;
      Zh && !Ms(i) && (!gl && c === "onCompositionStart" ? gl = uf(o) : c === "onCompositionEnd" && gl && (d = sf()));
      var m = lm(a, c);
      if (m.length > 0) {
        var g = new ml(c, t, null, i, o);
        if (e.push({
          event: g,
          listeners: m
        }), d)
          g.data = d;
        else {
          var T = yf(i);
          T !== null && (g.data = T);
        }
      }
    }
    function tm(e, t) {
      switch (e) {
        case "compositionend":
          return yf(t);
        case "keypress":
          var a = t.which;
          return a !== pp ? null : (As = !0, vp);
        case "textInput":
          var i = t.data;
          return i === vp && As ? null : i;
        default:
          return null;
      }
    }
    function Pg(e, t) {
      if (gl) {
        if (e === "compositionend" || !Ds && mp(e, t)) {
          var a = sf();
          return ws(), gl = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!em(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Zh && !Ms(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Sf(e, t, a, i, o) {
      var c;
      if (dp ? c = tm(t, i) : c = Pg(t, i), !c)
        return null;
      var d = lm(a, "onBeforeInput");
      if (d.length > 0) {
        var m = new zg("onBeforeInput", "beforeinput", null, i, o);
        e.push({
          event: m,
          listeners: d
        }), m.data = c;
      }
    }
    function Bg(e, t, a, i, o, c, d) {
      gf(e, t, a, i, o), Sf(e, t, a, i, o);
    }
    var Ns = {
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
    function nm(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Ns[e.type] : t === "textarea";
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
    function Cf(e) {
      if (!Ft)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function n() {
      zt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      gc(i);
      var o = lm(t, "onChange");
      if (o.length > 0) {
        var c = new cf("onChange", "change", null, a, i);
        e.push({
          event: c,
          listeners: o
        });
      }
    }
    var l = null, u = null;
    function f(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function h(e) {
      var t = [];
      r(t, u, e, yc(e)), Ad(C, t);
    }
    function C(e) {
      _E(e, 0);
    }
    function w(e) {
      var t = wf(e);
      if (jv(t))
        return e;
    }
    function O(e, t) {
      if (e === "change")
        return t;
    }
    var Y = !1;
    Ft && (Y = Cf("input") && (!document.documentMode || document.documentMode > 9));
    function le(e, t) {
      l = e, u = t, l.attachEvent("onpropertychange", ie);
    }
    function ce() {
      l && (l.detachEvent("onpropertychange", ie), l = null, u = null);
    }
    function ie(e) {
      e.propertyName === "value" && w(u) && h(e);
    }
    function Oe(e, t, a) {
      e === "focusin" ? (ce(), le(t, a)) : e === "focusout" && ce();
    }
    function je(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return w(u);
    }
    function Be(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function Nn(e, t) {
      if (e === "click")
        return w(t);
    }
    function F(e, t) {
      if (e === "input" || e === "change")
        return w(t);
    }
    function N(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || nl(e, "number", e.value);
    }
    function $(e, t, a, i, o, c, d) {
      var m = a ? wf(a) : window, g, T;
      if (f(m) ? g = O : nm(m) ? Y ? g = F : (g = je, T = Oe) : Be(m) && (g = Nn), g) {
        var x = g(t, a);
        if (x) {
          r(e, x, i, o);
          return;
        }
      }
      T && T(t, m, a), t === "focusout" && N(m);
    }
    function me() {
      Se("onMouseEnter", ["mouseout", "mouseover"]), Se("onMouseLeave", ["mouseout", "mouseover"]), Se("onPointerEnter", ["pointerout", "pointerover"]), Se("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function We(e, t, a, i, o, c, d) {
      var m = t === "mouseover" || t === "pointerover", g = t === "mouseout" || t === "pointerout";
      if (m && !hh(i)) {
        var T = i.relatedTarget || i.fromElement;
        if (T && (zs(T) || Op(T)))
          return;
      }
      if (!(!g && !m)) {
        var x;
        if (o.window === o)
          x = o;
        else {
          var L = o.ownerDocument;
          L ? x = L.defaultView || L.parentWindow : x = window;
        }
        var M, I;
        if (g) {
          var W = i.relatedTarget || i.toElement;
          if (M = a, I = W ? zs(W) : null, I !== null) {
            var X = ca(I);
            (I !== X || I.tag !== q && I.tag !== ee) && (I = null);
          }
        } else
          M = null, I = a;
        if (M !== I) {
          var we = ff, nt = "onMouseLeave", qe = "onMouseEnter", Lt = "mouse";
          (t === "pointerout" || t === "pointerover") && (we = Jh, nt = "onPointerLeave", qe = "onPointerEnter", Lt = "pointer");
          var Ot = M == null ? x : wf(M), H = I == null ? x : wf(I), J = new we(nt, Lt + "leave", M, i, o);
          J.target = Ot, J.relatedTarget = H;
          var P = null, fe = zs(o);
          if (fe === a) {
            var Me = new we(qe, Lt + "enter", I, i, o);
            Me.target = H, Me.relatedTarget = Ot, P = Me;
          }
          ER(e, J, P, M, I);
        }
      }
    }
    function it(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Ve = typeof Object.is == "function" ? Object.is : it;
    function lt(e, t) {
      if (Ve(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var o = 0; o < a.length; o++) {
        var c = a[o];
        if (!vn.call(t, c) || !Ve(e[c], t[c]))
          return !1;
      }
      return !0;
    }
    function qn(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function jt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Hi(e, t) {
      for (var a = qn(e), i = 0, o = 0; a; ) {
        if (a.nodeType === ki) {
          if (o = i + a.textContent.length, i <= t && o >= t)
            return {
              node: a,
              offset: t - i
            };
          i = o;
        }
        a = qn(jt(a));
      }
    }
    function $g(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var o = i.anchorNode, c = i.anchorOffset, d = i.focusNode, m = i.focusOffset;
      try {
        o.nodeType, d.nodeType;
      } catch {
        return null;
      }
      return tR(e, o, c, d, m);
    }
    function tR(e, t, a, i, o) {
      var c = 0, d = -1, m = -1, g = 0, T = 0, x = e, L = null;
      e: for (; ; ) {
        for (var M = null; x === t && (a === 0 || x.nodeType === ki) && (d = c + a), x === i && (o === 0 || x.nodeType === ki) && (m = c + o), x.nodeType === ki && (c += x.nodeValue.length), (M = x.firstChild) !== null; )
          L = x, x = M;
        for (; ; ) {
          if (x === e)
            break e;
          if (L === t && ++g === a && (d = c), L === i && ++T === o && (m = c), (M = x.nextSibling) !== null)
            break;
          x = L, L = x.parentNode;
        }
        x = M;
      }
      return d === -1 || m === -1 ? null : {
        start: d,
        end: m
      };
    }
    function nR(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var o = i.getSelection(), c = e.textContent.length, d = Math.min(t.start, c), m = t.end === void 0 ? d : Math.min(t.end, c);
        if (!o.extend && d > m) {
          var g = m;
          m = d, d = g;
        }
        var T = Hi(e, d), x = Hi(e, m);
        if (T && x) {
          if (o.rangeCount === 1 && o.anchorNode === T.node && o.anchorOffset === T.offset && o.focusNode === x.node && o.focusOffset === x.offset)
            return;
          var L = a.createRange();
          L.setStart(T.node, T.offset), o.removeAllRanges(), d > m ? (o.addRange(L), o.extend(x.node, x.offset)) : (L.setEnd(x.node, x.offset), o.addRange(L));
        }
      }
    }
    function hE(e) {
      return e && e.nodeType === ki;
    }
    function mE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : hE(e) ? !1 : hE(t) ? mE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function rR(e) {
      return e && e.ownerDocument && mE(e.ownerDocument.documentElement, e);
    }
    function aR(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function yE() {
      for (var e = window, t = ac(); t instanceof e.HTMLIFrameElement; ) {
        if (aR(t))
          e = t.contentWindow;
        else
          return t;
        t = ac(e.document);
      }
      return t;
    }
    function Ig(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function iR() {
      var e = yE();
      return {
        focusedElem: e,
        selectionRange: Ig(e) ? oR(e) : null
      };
    }
    function lR(e) {
      var t = yE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && rR(a)) {
        i !== null && Ig(a) && uR(a, i);
        for (var o = [], c = a; c = c.parentNode; )
          c.nodeType === $r && o.push({
            element: c,
            left: c.scrollLeft,
            top: c.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var d = 0; d < o.length; d++) {
          var m = o[d];
          m.element.scrollLeft = m.left, m.element.scrollTop = m.top;
        }
      }
    }
    function oR(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = $g(e), t || {
        start: 0,
        end: 0
      };
    }
    function uR(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : nR(e, t);
    }
    var sR = Ft && "documentMode" in document && document.documentMode <= 11;
    function cR() {
      zt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Ef = null, Yg = null, yp = null, Wg = !1;
    function fR(e) {
      if ("selectionStart" in e && Ig(e))
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
    function dR(e) {
      return e.window === e ? e.document : e.nodeType === Ka ? e : e.ownerDocument;
    }
    function gE(e, t, a) {
      var i = dR(a);
      if (!(Wg || Ef == null || Ef !== ac(i))) {
        var o = fR(Ef);
        if (!yp || !lt(yp, o)) {
          yp = o;
          var c = lm(Yg, "onSelect");
          if (c.length > 0) {
            var d = new cf("onSelect", "select", null, t, a);
            e.push({
              event: d,
              listeners: c
            }), d.target = Ef;
          }
        }
      }
    }
    function pR(e, t, a, i, o, c, d) {
      var m = a ? wf(a) : window;
      switch (t) {
        case "focusin":
          (nm(m) || m.contentEditable === "true") && (Ef = m, Yg = a, yp = null);
          break;
        case "focusout":
          Ef = null, Yg = null, yp = null;
          break;
        case "mousedown":
          Wg = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Wg = !1, gE(e, i, o);
          break;
        case "selectionchange":
          if (sR)
            break;
        case "keydown":
        case "keyup":
          gE(e, i, o);
      }
    }
    function rm(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var bf = {
      animationend: rm("Animation", "AnimationEnd"),
      animationiteration: rm("Animation", "AnimationIteration"),
      animationstart: rm("Animation", "AnimationStart"),
      transitionend: rm("Transition", "TransitionEnd")
    }, Qg = {}, SE = {};
    Ft && (SE = document.createElement("div").style, "AnimationEvent" in window || (delete bf.animationend.animation, delete bf.animationiteration.animation, delete bf.animationstart.animation), "TransitionEvent" in window || delete bf.transitionend.transition);
    function am(e) {
      if (Qg[e])
        return Qg[e];
      if (!bf[e])
        return e;
      var t = bf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in SE)
          return Qg[e] = t[a];
      return e;
    }
    var CE = am("animationend"), EE = am("animationiteration"), bE = am("animationstart"), TE = am("transitionend"), xE = /* @__PURE__ */ new Map(), RE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function yu(e, t) {
      xE.set(e, t), zt(t, [e]);
    }
    function vR() {
      for (var e = 0; e < RE.length; e++) {
        var t = RE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        yu(a, "on" + i);
      }
      yu(CE, "onAnimationEnd"), yu(EE, "onAnimationIteration"), yu(bE, "onAnimationStart"), yu("dblclick", "onDoubleClick"), yu("focusin", "onFocus"), yu("focusout", "onBlur"), yu(TE, "onTransitionEnd");
    }
    function hR(e, t, a, i, o, c, d) {
      var m = xE.get(t);
      if (m !== void 0) {
        var g = cf, T = t;
        switch (t) {
          case "keypress":
            if (io(i) === 0)
              return;
          case "keydown":
          case "keyup":
            g = Kh;
            break;
          case "focusin":
            T = "focus", g = ks;
            break;
          case "focusout":
            T = "blur", g = ks;
            break;
          case "beforeblur":
          case "afterblur":
            g = ks;
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
            g = ff;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Ih;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = fp;
            break;
          case CE:
          case EE:
          case bE:
            g = Lg;
            break;
          case TE:
            g = yl;
            break;
          case "scroll":
            g = op;
            break;
          case "wheel":
            g = uo;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = Wh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = Jh;
            break;
        }
        var x = (c & Pl) !== 0;
        {
          var L = !x && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", M = SR(a, m, i.type, x, L);
          if (M.length > 0) {
            var I = new g(m, T, null, i, o);
            e.push({
              event: I,
              listeners: M
            });
          }
        }
      }
    }
    vR(), me(), n(), cR(), mf();
    function mR(e, t, a, i, o, c, d) {
      hR(e, t, a, i, o, c);
      var m = (c & Eg) === 0;
      m && (We(e, t, a, i, o), $(e, t, a, i, o), pR(e, t, a, i, o), Bg(e, t, a, i, o));
    }
    var gp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Gg = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(gp));
    function wE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Mi(i, t, void 0, e), e.currentTarget = null;
    }
    function yR(e, t, a) {
      var i;
      if (a)
        for (var o = t.length - 1; o >= 0; o--) {
          var c = t[o], d = c.instance, m = c.currentTarget, g = c.listener;
          if (d !== i && e.isPropagationStopped())
            return;
          wE(e, g, m), i = d;
        }
      else
        for (var T = 0; T < t.length; T++) {
          var x = t[T], L = x.instance, M = x.currentTarget, I = x.listener;
          if (L !== i && e.isPropagationStopped())
            return;
          wE(e, I, M), i = L;
        }
    }
    function _E(e, t) {
      for (var a = (t & Pl) !== 0, i = 0; i < e.length; i++) {
        var o = e[i], c = o.event, d = o.listeners;
        yR(c, d, a);
      }
      Ud();
    }
    function gR(e, t, a, i, o) {
      var c = yc(a), d = [];
      mR(d, e, i, a, c, t), _E(d, t);
    }
    function En(e, t) {
      Gg.has(e) || y('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = Gw(t), o = bR(e);
      i.has(o) || (kE(t, e, ns, a), i.add(o));
    }
    function qg(e, t, a) {
      Gg.has(e) && !t && y('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Pl), kE(a, e, i, t);
    }
    var im = "_reactListening" + Math.random().toString(36).slice(2);
    function Sp(e) {
      if (!e[im]) {
        e[im] = !0, rt.forEach(function(a) {
          a !== "selectionchange" && (Gg.has(a) || qg(a, !1, e), qg(a, !0, e));
        });
        var t = e.nodeType === Ka ? e : e.ownerDocument;
        t !== null && (t[im] || (t[im] = !0, qg("selectionchange", !1, t)));
      }
    }
    function kE(e, t, a, i, o) {
      var c = Qn(e, t, a), d = void 0;
      os && (t === "touchstart" || t === "touchmove" || t === "wheel") && (d = !0), e = e, i ? d !== void 0 ? of(e, t, c, d) : ji(e, t, c) : d !== void 0 ? lp(e, t, c, d) : pu(e, t, c);
    }
    function DE(e, t) {
      return e === t || e.nodeType === zn && e.parentNode === t;
    }
    function Kg(e, t, a, i, o) {
      var c = i;
      if (!(t & Oi) && !(t & ns)) {
        var d = o;
        if (i !== null) {
          var m = i;
          e: for (; ; ) {
            if (m === null)
              return;
            var g = m.tag;
            if (g === A || g === z) {
              var T = m.stateNode.containerInfo;
              if (DE(T, d))
                break;
              if (g === z)
                for (var x = m.return; x !== null; ) {
                  var L = x.tag;
                  if (L === A || L === z) {
                    var M = x.stateNode.containerInfo;
                    if (DE(M, d))
                      return;
                  }
                  x = x.return;
                }
              for (; T !== null; ) {
                var I = zs(T);
                if (I === null)
                  return;
                var W = I.tag;
                if (W === q || W === ee) {
                  m = c = I;
                  continue e;
                }
                T = T.parentNode;
              }
            }
            m = m.return;
          }
        }
      }
      Ad(function() {
        return gR(e, t, a, c);
      });
    }
    function Cp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function SR(e, t, a, i, o, c) {
      for (var d = t !== null ? t + "Capture" : null, m = i ? d : t, g = [], T = e, x = null; T !== null; ) {
        var L = T, M = L.stateNode, I = L.tag;
        if (I === q && M !== null && (x = M, m !== null)) {
          var W = $l(T, m);
          W != null && g.push(Cp(T, W, x));
        }
        if (o)
          break;
        T = T.return;
      }
      return g;
    }
    function lm(e, t) {
      for (var a = t + "Capture", i = [], o = e; o !== null; ) {
        var c = o, d = c.stateNode, m = c.tag;
        if (m === q && d !== null) {
          var g = d, T = $l(o, a);
          T != null && i.unshift(Cp(o, T, g));
          var x = $l(o, t);
          x != null && i.push(Cp(o, x, g));
        }
        o = o.return;
      }
      return i;
    }
    function Tf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== q);
      return e || null;
    }
    function CR(e, t) {
      for (var a = e, i = t, o = 0, c = a; c; c = Tf(c))
        o++;
      for (var d = 0, m = i; m; m = Tf(m))
        d++;
      for (; o - d > 0; )
        a = Tf(a), o--;
      for (; d - o > 0; )
        i = Tf(i), d--;
      for (var g = o; g--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = Tf(a), i = Tf(i);
      }
      return null;
    }
    function OE(e, t, a, i, o) {
      for (var c = t._reactName, d = [], m = a; m !== null && m !== i; ) {
        var g = m, T = g.alternate, x = g.stateNode, L = g.tag;
        if (T !== null && T === i)
          break;
        if (L === q && x !== null) {
          var M = x;
          if (o) {
            var I = $l(m, c);
            I != null && d.unshift(Cp(m, I, M));
          } else if (!o) {
            var W = $l(m, c);
            W != null && d.push(Cp(m, W, M));
          }
        }
        m = m.return;
      }
      d.length !== 0 && e.push({
        event: t,
        listeners: d
      });
    }
    function ER(e, t, a, i, o) {
      var c = i && o ? CR(i, o) : null;
      i !== null && OE(e, t, i, c, !1), o !== null && a !== null && OE(e, a, o, c, !0);
    }
    function bR(e, t) {
      return e + "__bubble";
    }
    var ja = !1, Ep = "dangerouslySetInnerHTML", om = "suppressContentEditableWarning", gu = "suppressHydrationWarning", AE = "autoFocus", Ls = "children", Us = "style", um = "__html", Xg, sm, bp, ME, cm, NE, LE;
    Xg = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, sm = function(e, t) {
      mc(e, t), wd(e, t), vh(e, t, {
        registrationNameDependencies: pt,
        possibleRegistrationNames: mt
      });
    }, NE = Ft && !document.documentMode, bp = function(e, t, a) {
      if (!ja) {
        var i = fm(a), o = fm(t);
        o !== i && (ja = !0, y("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(o), JSON.stringify(i)));
      }
    }, ME = function(e) {
      if (!ja) {
        ja = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), y("Extra attributes from the server: %s", t);
      }
    }, cm = function(e, t) {
      t === !1 ? y("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : y("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, LE = function(e, t) {
      var a = e.namespaceURI === _i ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var TR = /\r\n?/g, xR = /\u0000|\uFFFD/g;
    function fm(e) {
      he(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(TR, `
`).replace(xR, "");
    }
    function dm(e, t, a, i) {
      var o = fm(t), c = fm(e);
      if (c !== o && (i && (ja || (ja = !0, y('Text content did not match. Server: "%s" Client: "%s"', c, o))), a && At))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function UE(e) {
      return e.nodeType === Ka ? e : e.ownerDocument;
    }
    function RR() {
    }
    function pm(e) {
      e.onclick = RR;
    }
    function wR(e, t, a, i, o) {
      for (var c in i)
        if (i.hasOwnProperty(c)) {
          var d = i[c];
          if (c === Us)
            d && Object.freeze(d), ah(t, d);
          else if (c === Ep) {
            var m = d ? d[um] : void 0;
            m != null && Qv(t, m);
          } else if (c === Ls)
            if (typeof d == "string") {
              var g = e !== "textarea" || d !== "";
              g && dc(t, d);
            } else typeof d == "number" && dc(t, "" + d);
          else c === om || c === gu || c === AE || (pt.hasOwnProperty(c) ? d != null && (typeof d != "function" && cm(c, d), c === "onScroll" && En("scroll", t)) : d != null && oi(t, c, d, o));
        }
    }
    function _R(e, t, a, i) {
      for (var o = 0; o < t.length; o += 2) {
        var c = t[o], d = t[o + 1];
        c === Us ? ah(e, d) : c === Ep ? Qv(e, d) : c === Ls ? dc(e, d) : oi(e, c, d, i);
      }
    }
    function kR(e, t, a, i) {
      var o, c = UE(a), d, m = i;
      if (m === _i && (m = cc(e)), m === _i) {
        if (o = Di(e, t), !o && e !== e.toLowerCase() && y("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var g = c.createElement("div");
          g.innerHTML = "<script><\/script>";
          var T = g.firstChild;
          d = g.removeChild(T);
        } else if (typeof t.is == "string")
          d = c.createElement(e, {
            is: t.is
          });
        else if (d = c.createElement(e), e === "select") {
          var x = d;
          t.multiple ? x.multiple = !0 : t.size && (x.size = t.size);
        }
      } else
        d = c.createElementNS(m, e);
      return m === _i && !o && Object.prototype.toString.call(d) === "[object HTMLUnknownElement]" && !vn.call(Xg, e) && (Xg[e] = !0, y("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), d;
    }
    function DR(e, t) {
      return UE(t).createTextNode(e);
    }
    function OR(e, t, a, i) {
      var o = Di(t, a);
      sm(t, a);
      var c;
      switch (t) {
        case "dialog":
          En("cancel", e), En("close", e), c = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          En("load", e), c = a;
          break;
        case "video":
        case "audio":
          for (var d = 0; d < gp.length; d++)
            En(gp[d], e);
          c = a;
          break;
        case "source":
          En("error", e), c = a;
          break;
        case "img":
        case "image":
        case "link":
          En("error", e), En("load", e), c = a;
          break;
        case "details":
          En("toggle", e), c = a;
          break;
        case "input":
          Ku(e, a), c = qu(e, a), En("invalid", e);
          break;
        case "option":
          uc(e, a), c = a;
          break;
        case "select":
          $v(e, a), c = hd(e, a), En("invalid", e);
          break;
        case "textarea":
          Iv(e, a), c = yd(e, a), En("invalid", e);
          break;
        default:
          c = a;
      }
      switch (vc(t, c), wR(t, e, i, c, o), t) {
        case "input":
          jl(e), Xu(e, a, !1);
          break;
        case "textarea":
          jl(e), Wv(e);
          break;
        case "option":
          vd(e, a);
          break;
        case "select":
          cg(e, a);
          break;
        default:
          typeof c.onClick == "function" && pm(e);
          break;
      }
    }
    function AR(e, t, a, i, o) {
      sm(t, i);
      var c = null, d, m;
      switch (t) {
        case "input":
          d = qu(e, a), m = qu(e, i), c = [];
          break;
        case "select":
          d = hd(e, a), m = hd(e, i), c = [];
          break;
        case "textarea":
          d = yd(e, a), m = yd(e, i), c = [];
          break;
        default:
          d = a, m = i, typeof d.onClick != "function" && typeof m.onClick == "function" && pm(e);
          break;
      }
      vc(t, m);
      var g, T, x = null;
      for (g in d)
        if (!(m.hasOwnProperty(g) || !d.hasOwnProperty(g) || d[g] == null))
          if (g === Us) {
            var L = d[g];
            for (T in L)
              L.hasOwnProperty(T) && (x || (x = {}), x[T] = "");
          } else g === Ep || g === Ls || g === om || g === gu || g === AE || (pt.hasOwnProperty(g) ? c || (c = []) : (c = c || []).push(g, null));
      for (g in m) {
        var M = m[g], I = d != null ? d[g] : void 0;
        if (!(!m.hasOwnProperty(g) || M === I || M == null && I == null))
          if (g === Us)
            if (M && Object.freeze(M), I) {
              for (T in I)
                I.hasOwnProperty(T) && (!M || !M.hasOwnProperty(T)) && (x || (x = {}), x[T] = "");
              for (T in M)
                M.hasOwnProperty(T) && I[T] !== M[T] && (x || (x = {}), x[T] = M[T]);
            } else
              x || (c || (c = []), c.push(g, x)), x = M;
          else if (g === Ep) {
            var W = M ? M[um] : void 0, X = I ? I[um] : void 0;
            W != null && X !== W && (c = c || []).push(g, W);
          } else g === Ls ? (typeof M == "string" || typeof M == "number") && (c = c || []).push(g, "" + M) : g === om || g === gu || (pt.hasOwnProperty(g) ? (M != null && (typeof M != "function" && cm(g, M), g === "onScroll" && En("scroll", e)), !c && I !== M && (c = [])) : (c = c || []).push(g, M));
      }
      return x && (es(x, m[Us]), (c = c || []).push(Us, x)), c;
    }
    function MR(e, t, a, i, o) {
      a === "input" && o.type === "radio" && o.name != null && pd(e, o);
      var c = Di(a, i), d = Di(a, o);
      switch (_R(e, t, c, d), a) {
        case "input":
          No(e, o);
          break;
        case "textarea":
          Yv(e, o);
          break;
        case "select":
          fg(e, o);
          break;
      }
    }
    function NR(e) {
      {
        var t = e.toLowerCase();
        return hc.hasOwnProperty(t) && hc[t] || null;
      }
    }
    function LR(e, t, a, i, o, c, d) {
      var m, g;
      switch (m = Di(t, a), sm(t, a), t) {
        case "dialog":
          En("cancel", e), En("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          En("load", e);
          break;
        case "video":
        case "audio":
          for (var T = 0; T < gp.length; T++)
            En(gp[T], e);
          break;
        case "source":
          En("error", e);
          break;
        case "img":
        case "image":
        case "link":
          En("error", e), En("load", e);
          break;
        case "details":
          En("toggle", e);
          break;
        case "input":
          Ku(e, a), En("invalid", e);
          break;
        case "option":
          uc(e, a);
          break;
        case "select":
          $v(e, a), En("invalid", e);
          break;
        case "textarea":
          Iv(e, a), En("invalid", e);
          break;
      }
      vc(t, a);
      {
        g = /* @__PURE__ */ new Set();
        for (var x = e.attributes, L = 0; L < x.length; L++) {
          var M = x[L].name.toLowerCase();
          switch (M) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              g.add(x[L].name);
          }
        }
      }
      var I = null;
      for (var W in a)
        if (a.hasOwnProperty(W)) {
          var X = a[W];
          if (W === Ls)
            typeof X == "string" ? e.textContent !== X && (a[gu] !== !0 && dm(e.textContent, X, c, d), I = [Ls, X]) : typeof X == "number" && e.textContent !== "" + X && (a[gu] !== !0 && dm(e.textContent, X, c, d), I = [Ls, "" + X]);
          else if (pt.hasOwnProperty(W))
            X != null && (typeof X != "function" && cm(W, X), W === "onScroll" && En("scroll", e));
          else if (d && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof m == "boolean") {
            var we = void 0, nt = m && et ? null : ia(W);
            if (a[gu] !== !0) {
              if (!(W === om || W === gu || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              W === "value" || W === "checked" || W === "selected")) {
                if (W === Ep) {
                  var qe = e.innerHTML, Lt = X ? X[um] : void 0;
                  if (Lt != null) {
                    var Ot = LE(e, Lt);
                    Ot !== qe && bp(W, qe, Ot);
                  }
                } else if (W === Us) {
                  if (g.delete(W), NE) {
                    var H = Sg(X);
                    we = e.getAttribute("style"), H !== we && bp(W, we, H);
                  }
                } else if (m && !et)
                  g.delete(W.toLowerCase()), we = Do(e, W, X), X !== we && bp(W, we, X);
                else if (!On(W, nt, m) && !rn(W, X, nt, m)) {
                  var J = !1;
                  if (nt !== null)
                    g.delete(nt.attributeName), we = Ll(e, W, X, nt);
                  else {
                    var P = i;
                    if (P === _i && (P = cc(t)), P === _i)
                      g.delete(W.toLowerCase());
                    else {
                      var fe = NR(W);
                      fe !== null && fe !== W && (J = !0, g.delete(fe)), g.delete(W);
                    }
                    we = Do(e, W, X);
                  }
                  var Me = et;
                  !Me && X !== we && !J && bp(W, we, X);
                }
              }
            }
          }
        }
      switch (d && // $FlowFixMe - Should be inferred as not undefined.
      g.size > 0 && a[gu] !== !0 && ME(g), t) {
        case "input":
          jl(e), Xu(e, a, !0);
          break;
        case "textarea":
          jl(e), Wv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && pm(e);
          break;
      }
      return I;
    }
    function UR(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Jg(e, t) {
      {
        if (ja)
          return;
        ja = !0, y("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Zg(e, t) {
      {
        if (ja)
          return;
        ja = !0, y('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function e0(e, t, a) {
      {
        if (ja)
          return;
        ja = !0, y("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function t0(e, t) {
      {
        if (t === "" || ja)
          return;
        ja = !0, y('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function zR(e, t, a) {
      switch (t) {
        case "input":
          Vv(e, a);
          return;
        case "textarea":
          gd(e, a);
          return;
        case "select":
          dg(e, a);
          return;
      }
    }
    var Tp = function() {
    }, xp = function() {
    };
    {
      var FR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], zE = [
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
      ], jR = zE.concat(["button"]), VR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], FE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      xp = function(e, t) {
        var a = _t({}, e || FE), i = {
          tag: t
        };
        return zE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), jR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), FR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var HR = function(e, t) {
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
            return VR.indexOf(t) === -1;
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
      }, PR = function(e, t) {
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
      }, jE = {};
      Tp = function(e, t, a) {
        a = a || FE;
        var i = a.current, o = i && i.tag;
        t != null && (e != null && y("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var c = HR(e, o) ? null : i, d = c ? null : PR(e, a), m = c || d;
        if (m) {
          var g = m.tag, T = !!c + "|" + e + "|" + g;
          if (!jE[T]) {
            jE[T] = !0;
            var x = e, L = "";
            if (e === "#text" ? /\S/.test(t) ? x = "Text nodes" : (x = "Whitespace text nodes", L = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : x = "<" + e + ">", c) {
              var M = "";
              g === "table" && e === "tr" && (M += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), y("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", x, g, L, M);
            } else
              y("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", x, g);
          }
        }
      };
    }
    var vm = "suppressHydrationWarning", hm = "$", mm = "/$", Rp = "$?", wp = "$!", BR = "style", n0 = null, r0 = null;
    function $R(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ka:
        case Vl: {
          t = i === Ka ? "#document" : "#fragment";
          var o = e.documentElement;
          a = o ? o.namespaceURI : Cd(null, "");
          break;
        }
        default: {
          var c = i === zn ? e.parentNode : e, d = c.namespaceURI || null;
          t = c.tagName, a = Cd(d, t);
          break;
        }
      }
      {
        var m = t.toLowerCase(), g = xp(null, m);
        return {
          namespace: a,
          ancestorInfo: g
        };
      }
    }
    function IR(e, t, a) {
      {
        var i = e, o = Cd(i.namespace, t), c = xp(i.ancestorInfo, t);
        return {
          namespace: o,
          ancestorInfo: c
        };
      }
    }
    function I2(e) {
      return e;
    }
    function YR(e) {
      n0 = fu(), r0 = iR();
      var t = null;
      return Zr(!1), t;
    }
    function WR(e) {
      lR(r0), Zr(n0), n0 = null, r0 = null;
    }
    function QR(e, t, a, i, o) {
      var c;
      {
        var d = i;
        if (Tp(e, null, d.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var m = "" + t.children, g = xp(d.ancestorInfo, e);
          Tp(null, m, g);
        }
        c = d.namespace;
      }
      var T = kR(e, t, a, c);
      return Dp(o, T), f0(T, t), T;
    }
    function GR(e, t) {
      e.appendChild(t);
    }
    function qR(e, t, a, i, o) {
      switch (OR(e, t, a, i), t) {
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
    function KR(e, t, a, i, o, c) {
      {
        var d = c;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var m = "" + i.children, g = xp(d.ancestorInfo, t);
          Tp(null, m, g);
        }
      }
      return AR(e, t, a, i);
    }
    function a0(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function XR(e, t, a, i) {
      {
        var o = a;
        Tp(null, e, o.ancestorInfo);
      }
      var c = DR(e, t);
      return Dp(i, c), c;
    }
    function JR() {
      var e = window.event;
      return e === void 0 ? di : lf(e.type);
    }
    var i0 = typeof setTimeout == "function" ? setTimeout : void 0, ZR = typeof clearTimeout == "function" ? clearTimeout : void 0, l0 = -1, VE = typeof Promise == "function" ? Promise : void 0, ew = typeof queueMicrotask == "function" ? queueMicrotask : typeof VE < "u" ? function(e) {
      return VE.resolve(null).then(e).catch(tw);
    } : i0;
    function tw(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function nw(e, t, a, i) {
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
    function rw(e, t, a, i, o, c) {
      MR(e, t, a, i, o), f0(e, o);
    }
    function HE(e) {
      dc(e, "");
    }
    function aw(e, t, a) {
      e.nodeValue = a;
    }
    function iw(e, t) {
      e.appendChild(t);
    }
    function lw(e, t) {
      var a;
      e.nodeType === zn ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && pm(a);
    }
    function ow(e, t, a) {
      e.insertBefore(t, a);
    }
    function uw(e, t, a) {
      e.nodeType === zn ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function sw(e, t) {
      e.removeChild(t);
    }
    function cw(e, t) {
      e.nodeType === zn ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function o0(e, t) {
      var a = t, i = 0;
      do {
        var o = a.nextSibling;
        if (e.removeChild(a), o && o.nodeType === zn) {
          var c = o.data;
          if (c === mm)
            if (i === 0) {
              e.removeChild(o), Rn(t);
              return;
            } else
              i--;
          else (c === hm || c === Rp || c === wp) && i++;
        }
        a = o;
      } while (a);
      Rn(t);
    }
    function fw(e, t) {
      e.nodeType === zn ? o0(e.parentNode, t) : e.nodeType === $r && o0(e, t), Rn(e);
    }
    function dw(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function pw(e) {
      e.nodeValue = "";
    }
    function vw(e, t) {
      e = e;
      var a = t[BR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = pc("display", i);
    }
    function hw(e, t) {
      e.nodeValue = t;
    }
    function mw(e) {
      e.nodeType === $r ? e.textContent = "" : e.nodeType === Ka && e.documentElement && e.removeChild(e.documentElement);
    }
    function yw(e, t, a) {
      return e.nodeType !== $r || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function gw(e, t) {
      return t === "" || e.nodeType !== ki ? null : e;
    }
    function Sw(e) {
      return e.nodeType !== zn ? null : e;
    }
    function PE(e) {
      return e.data === Rp;
    }
    function u0(e) {
      return e.data === wp;
    }
    function Cw(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, o;
      return t && (a = t.dgst, i = t.msg, o = t.stck), {
        message: i,
        digest: a,
        stack: o
      };
    }
    function Ew(e, t) {
      e._reactRetry = t;
    }
    function ym(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === $r || t === ki)
          break;
        if (t === zn) {
          var a = e.data;
          if (a === hm || a === wp || a === Rp)
            break;
          if (a === mm)
            return null;
        }
      }
      return e;
    }
    function _p(e) {
      return ym(e.nextSibling);
    }
    function bw(e) {
      return ym(e.firstChild);
    }
    function Tw(e) {
      return ym(e.firstChild);
    }
    function xw(e) {
      return ym(e.nextSibling);
    }
    function Rw(e, t, a, i, o, c, d) {
      Dp(c, e), f0(e, a);
      var m;
      {
        var g = o;
        m = g.namespace;
      }
      var T = (c.mode & Ge) !== Ye;
      return LR(e, t, a, m, i, T, d);
    }
    function ww(e, t, a, i) {
      return Dp(a, e), a.mode & Ge, UR(e, t);
    }
    function _w(e, t) {
      Dp(t, e);
    }
    function kw(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === zn) {
          var i = t.data;
          if (i === mm) {
            if (a === 0)
              return _p(t);
            a--;
          } else (i === hm || i === wp || i === Rp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function BE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === zn) {
          var i = t.data;
          if (i === hm || i === wp || i === Rp) {
            if (a === 0)
              return t;
            a--;
          } else i === mm && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Dw(e) {
      Rn(e);
    }
    function Ow(e) {
      Rn(e);
    }
    function Aw(e) {
      return e !== "head" && e !== "body";
    }
    function Mw(e, t, a, i) {
      var o = !0;
      dm(t.nodeValue, a, i, o);
    }
    function Nw(e, t, a, i, o, c) {
      if (t[vm] !== !0) {
        var d = !0;
        dm(i.nodeValue, o, c, d);
      }
    }
    function Lw(e, t) {
      t.nodeType === $r ? Jg(e, t) : t.nodeType === zn || Zg(e, t);
    }
    function Uw(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === $r ? Jg(a, t) : t.nodeType === zn || Zg(a, t));
      }
    }
    function zw(e, t, a, i, o) {
      (o || t[vm] !== !0) && (i.nodeType === $r ? Jg(a, i) : i.nodeType === zn || Zg(a, i));
    }
    function Fw(e, t, a) {
      e0(e, t);
    }
    function jw(e, t) {
      t0(e, t);
    }
    function Vw(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && e0(i, t);
      }
    }
    function Hw(e, t) {
      {
        var a = e.parentNode;
        a !== null && t0(a, t);
      }
    }
    function Pw(e, t, a, i, o, c) {
      (c || t[vm] !== !0) && e0(a, i);
    }
    function Bw(e, t, a, i, o) {
      (o || t[vm] !== !0) && t0(a, i);
    }
    function $w(e) {
      y("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Iw(e) {
      Sp(e);
    }
    var xf = Math.random().toString(36).slice(2), Rf = "__reactFiber$" + xf, s0 = "__reactProps$" + xf, kp = "__reactContainer$" + xf, c0 = "__reactEvents$" + xf, Yw = "__reactListeners$" + xf, Ww = "__reactHandles$" + xf;
    function Qw(e) {
      delete e[Rf], delete e[s0], delete e[c0], delete e[Yw], delete e[Ww];
    }
    function Dp(e, t) {
      t[Rf] = e;
    }
    function gm(e, t) {
      t[kp] = e;
    }
    function $E(e) {
      e[kp] = null;
    }
    function Op(e) {
      return !!e[kp];
    }
    function zs(e) {
      var t = e[Rf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[kp] || a[Rf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var o = BE(e); o !== null; ) {
              var c = o[Rf];
              if (c)
                return c;
              o = BE(o);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Su(e) {
      var t = e[Rf] || e[kp];
      return t && (t.tag === q || t.tag === ee || t.tag === Q || t.tag === A) ? t : null;
    }
    function wf(e) {
      if (e.tag === q || e.tag === ee)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Sm(e) {
      return e[s0] || null;
    }
    function f0(e, t) {
      e[s0] = t;
    }
    function Gw(e) {
      var t = e[c0];
      return t === void 0 && (t = e[c0] = /* @__PURE__ */ new Set()), t;
    }
    var IE = {}, YE = p.ReactDebugCurrentFrame;
    function Cm(e) {
      if (e) {
        var t = e._owner, a = $u(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function Pi(e, t, a, i, o) {
      {
        var c = Function.call.bind(vn);
        for (var d in e)
          if (c(e, d)) {
            var m = void 0;
            try {
              if (typeof e[d] != "function") {
                var g = Error((i || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw g.name = "Invariant Violation", g;
              }
              m = e[d](t, d, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (T) {
              m = T;
            }
            m && !(m instanceof Error) && (Cm(o), y("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, d, typeof m), Cm(null)), m instanceof Error && !(m.message in IE) && (IE[m.message] = !0, Cm(o), y("Failed %s type: %s", a, m.message), Cm(null));
          }
      }
    }
    var d0 = [], Em;
    Em = [];
    var so = -1;
    function Cu(e) {
      return {
        current: e
      };
    }
    function ea(e, t) {
      if (so < 0) {
        y("Unexpected pop.");
        return;
      }
      t !== Em[so] && y("Unexpected Fiber popped."), e.current = d0[so], d0[so] = null, Em[so] = null, so--;
    }
    function ta(e, t, a) {
      so++, d0[so] = e.current, Em[so] = a, e.current = t;
    }
    var p0;
    p0 = {};
    var ei = {};
    Object.freeze(ei);
    var co = Cu(ei), Sl = Cu(!1), v0 = ei;
    function _f(e, t, a) {
      return a && Cl(t) ? v0 : co.current;
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function kf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ei;
        var o = e.stateNode;
        if (o && o.__reactInternalMemoizedUnmaskedChildContext === t)
          return o.__reactInternalMemoizedMaskedChildContext;
        var c = {};
        for (var d in i)
          c[d] = t[d];
        {
          var m = St(e) || "Unknown";
          Pi(i, c, "context", m);
        }
        return o && WE(e, t, c), c;
      }
    }
    function bm() {
      return Sl.current;
    }
    function Cl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Tm(e) {
      ea(Sl, e), ea(co, e);
    }
    function h0(e) {
      ea(Sl, e), ea(co, e);
    }
    function QE(e, t, a) {
      {
        if (co.current !== ei)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        ta(co, t, e), ta(Sl, a, e);
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode, o = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var c = St(e) || "Unknown";
            p0[c] || (p0[c] = !0, y("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", c, c));
          }
          return a;
        }
        var d = i.getChildContext();
        for (var m in d)
          if (!(m in o))
            throw new Error((St(e) || "Unknown") + '.getChildContext(): key "' + m + '" is not defined in childContextTypes.');
        {
          var g = St(e) || "Unknown";
          Pi(o, d, "child context", g);
        }
        return _t({}, a, d);
      }
    }
    function xm(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ei;
        return v0 = co.current, ta(co, a, e), ta(Sl, Sl.current, e), !0;
      }
    }
    function qE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var o = GE(e, t, v0);
          i.__reactInternalMemoizedMergedChildContext = o, ea(Sl, e), ea(co, e), ta(co, o, e), ta(Sl, a, e);
        } else
          ea(Sl, e), ta(Sl, a, e);
      }
    }
    function qw(e) {
      {
        if (!Hd(e) || e.tag !== j)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case A:
              return t.stateNode.context;
            case j: {
              var a = t.type;
              if (Cl(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Eu = 0, Rm = 1, fo = null, m0 = !1, y0 = !1;
    function KE(e) {
      fo === null ? fo = [e] : fo.push(e);
    }
    function Kw(e) {
      m0 = !0, KE(e);
    }
    function XE() {
      m0 && bu();
    }
    function bu() {
      if (!y0 && fo !== null) {
        y0 = !0;
        var e = 0, t = Na();
        try {
          var a = !0, i = fo;
          for (xn(Mn); e < i.length; e++) {
            var o = i[e];
            do
              o = o(a);
            while (o !== null);
          }
          fo = null, m0 = !1;
        } catch (c) {
          throw fo !== null && (fo = fo.slice(e + 1)), xc(wc, bu), c;
        } finally {
          xn(t), y0 = !1;
        }
      }
      return null;
    }
    var Df = [], Of = 0, wm = null, _m = 0, mi = [], yi = 0, Fs = null, po = 1, vo = "";
    function Xw(e) {
      return Vs(), (e.flags & Fd) !== tt;
    }
    function Jw(e) {
      return Vs(), _m;
    }
    function Zw() {
      var e = vo, t = po, a = t & ~e_(t);
      return a.toString(32) + e;
    }
    function js(e, t) {
      Vs(), Df[Of++] = _m, Df[Of++] = wm, wm = e, _m = t;
    }
    function JE(e, t, a) {
      Vs(), mi[yi++] = po, mi[yi++] = vo, mi[yi++] = Fs, Fs = e;
      var i = po, o = vo, c = km(i) - 1, d = i & ~(1 << c), m = a + 1, g = km(t) + c;
      if (g > 30) {
        var T = c - c % 5, x = (1 << T) - 1, L = (d & x).toString(32), M = d >> T, I = c - T, W = km(t) + I, X = m << I, we = X | M, nt = L + o;
        po = 1 << W | we, vo = nt;
      } else {
        var qe = m << c, Lt = qe | d, Ot = o;
        po = 1 << g | Lt, vo = Ot;
      }
    }
    function g0(e) {
      Vs();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        js(e, a), JE(e, a, i);
      }
    }
    function km(e) {
      return 32 - Go(e);
    }
    function e_(e) {
      return 1 << km(e) - 1;
    }
    function S0(e) {
      for (; e === wm; )
        wm = Df[--Of], Df[Of] = null, _m = Df[--Of], Df[Of] = null;
      for (; e === Fs; )
        Fs = mi[--yi], mi[yi] = null, vo = mi[--yi], mi[yi] = null, po = mi[--yi], mi[yi] = null;
    }
    function t_() {
      return Vs(), Fs !== null ? {
        id: po,
        overflow: vo
      } : null;
    }
    function n_(e, t) {
      Vs(), mi[yi++] = po, mi[yi++] = vo, mi[yi++] = Fs, po = t.id, vo = t.overflow, Fs = e;
    }
    function Vs() {
      Nr() || y("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Mr = null, gi = null, Bi = !1, Hs = !1, Tu = null;
    function r_() {
      Bi && y("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function ZE() {
      Hs = !0;
    }
    function a_() {
      return Hs;
    }
    function i_(e) {
      var t = e.stateNode.containerInfo;
      return gi = Tw(t), Mr = e, Bi = !0, Tu = null, Hs = !1, !0;
    }
    function l_(e, t, a) {
      return gi = xw(t), Mr = e, Bi = !0, Tu = null, Hs = !1, a !== null && n_(e, a), !0;
    }
    function e1(e, t) {
      switch (e.tag) {
        case A: {
          Lw(e.stateNode.containerInfo, t);
          break;
        }
        case q: {
          var a = (e.mode & Ge) !== Ye;
          zw(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Q: {
          var i = e.memoizedState;
          i.dehydrated !== null && Uw(i.dehydrated, t);
          break;
        }
      }
    }
    function t1(e, t) {
      e1(e, t);
      var a = cO();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Bt) : i.push(a);
    }
    function C0(e, t) {
      {
        if (Hs)
          return;
        switch (e.tag) {
          case A: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case q:
                var i = t.type;
                t.pendingProps, Fw(a, i);
                break;
              case ee:
                var o = t.pendingProps;
                jw(a, o);
                break;
            }
            break;
          }
          case q: {
            var c = e.type, d = e.memoizedProps, m = e.stateNode;
            switch (t.tag) {
              case q: {
                var g = t.type, T = t.pendingProps, x = (e.mode & Ge) !== Ye;
                Pw(
                  c,
                  d,
                  m,
                  g,
                  T,
                  // TODO: Delete this argument when we remove the legacy root API.
                  x
                );
                break;
              }
              case ee: {
                var L = t.pendingProps, M = (e.mode & Ge) !== Ye;
                Bw(
                  c,
                  d,
                  m,
                  L,
                  // TODO: Delete this argument when we remove the legacy root API.
                  M
                );
                break;
              }
            }
            break;
          }
          case Q: {
            var I = e.memoizedState, W = I.dehydrated;
            if (W !== null) switch (t.tag) {
              case q:
                var X = t.type;
                t.pendingProps, Vw(W, X);
                break;
              case ee:
                var we = t.pendingProps;
                Hw(W, we);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function n1(e, t) {
      t.flags = t.flags & ~_a | un, C0(e, t);
    }
    function r1(e, t) {
      switch (e.tag) {
        case q: {
          var a = e.type;
          e.pendingProps;
          var i = yw(t, a);
          return i !== null ? (e.stateNode = i, Mr = e, gi = bw(i), !0) : !1;
        }
        case ee: {
          var o = e.pendingProps, c = gw(t, o);
          return c !== null ? (e.stateNode = c, Mr = e, gi = null, !0) : !1;
        }
        case Q: {
          var d = Sw(t);
          if (d !== null) {
            var m = {
              dehydrated: d,
              treeContext: t_(),
              retryLane: _r
            };
            e.memoizedState = m;
            var g = fO(d);
            return g.return = e, e.child = g, Mr = e, gi = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function E0(e) {
      return (e.mode & Ge) !== Ye && (e.flags & ft) === tt;
    }
    function b0(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function T0(e) {
      if (Bi) {
        var t = gi;
        if (!t) {
          E0(e) && (C0(Mr, e), b0()), n1(Mr, e), Bi = !1, Mr = e;
          return;
        }
        var a = t;
        if (!r1(e, t)) {
          E0(e) && (C0(Mr, e), b0()), t = _p(a);
          var i = Mr;
          if (!t || !r1(e, t)) {
            n1(Mr, e), Bi = !1, Mr = e;
            return;
          }
          t1(i, a);
        }
      }
    }
    function o_(e, t, a) {
      var i = e.stateNode, o = !Hs, c = Rw(i, e.type, e.memoizedProps, t, a, e, o);
      return e.updateQueue = c, c !== null;
    }
    function u_(e) {
      var t = e.stateNode, a = e.memoizedProps, i = ww(t, a, e);
      if (i) {
        var o = Mr;
        if (o !== null)
          switch (o.tag) {
            case A: {
              var c = o.stateNode.containerInfo, d = (o.mode & Ge) !== Ye;
              Mw(
                c,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                d
              );
              break;
            }
            case q: {
              var m = o.type, g = o.memoizedProps, T = o.stateNode, x = (o.mode & Ge) !== Ye;
              Nw(
                m,
                g,
                T,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                x
              );
              break;
            }
          }
      }
      return i;
    }
    function s_(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      _w(a, e);
    }
    function c_(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return kw(a);
    }
    function a1(e) {
      for (var t = e.return; t !== null && t.tag !== q && t.tag !== A && t.tag !== Q; )
        t = t.return;
      Mr = t;
    }
    function Dm(e) {
      if (e !== Mr)
        return !1;
      if (!Bi)
        return a1(e), Bi = !0, !1;
      if (e.tag !== A && (e.tag !== q || Aw(e.type) && !a0(e.type, e.memoizedProps))) {
        var t = gi;
        if (t)
          if (E0(e))
            i1(e), b0();
          else
            for (; t; )
              t1(e, t), t = _p(t);
      }
      return a1(e), e.tag === Q ? gi = c_(e) : gi = Mr ? _p(e.stateNode) : null, !0;
    }
    function f_() {
      return Bi && gi !== null;
    }
    function i1(e) {
      for (var t = gi; t; )
        e1(e, t), t = _p(t);
    }
    function Af() {
      Mr = null, gi = null, Bi = !1, Hs = !1;
    }
    function l1() {
      Tu !== null && (Zb(Tu), Tu = null);
    }
    function Nr() {
      return Bi;
    }
    function x0(e) {
      Tu === null ? Tu = [e] : Tu.push(e);
    }
    var d_ = p.ReactCurrentBatchConfig, p_ = null;
    function v_() {
      return d_.transition;
    }
    var $i = {
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
      var h_ = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & kt && (t = a), a = a.return;
        return t;
      }, Ps = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, Ap = [], Mp = [], Np = [], Lp = [], Up = [], zp = [], Bs = /* @__PURE__ */ new Set();
      $i.recordUnsafeLifecycleWarnings = function(e, t) {
        Bs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && Ap.push(e), e.mode & kt && typeof t.UNSAFE_componentWillMount == "function" && Mp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && Np.push(e), e.mode & kt && typeof t.UNSAFE_componentWillReceiveProps == "function" && Lp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && Up.push(e), e.mode & kt && typeof t.UNSAFE_componentWillUpdate == "function" && zp.push(e));
      }, $i.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        Ap.length > 0 && (Ap.forEach(function(M) {
          e.add(St(M) || "Component"), Bs.add(M.type);
        }), Ap = []);
        var t = /* @__PURE__ */ new Set();
        Mp.length > 0 && (Mp.forEach(function(M) {
          t.add(St(M) || "Component"), Bs.add(M.type);
        }), Mp = []);
        var a = /* @__PURE__ */ new Set();
        Np.length > 0 && (Np.forEach(function(M) {
          a.add(St(M) || "Component"), Bs.add(M.type);
        }), Np = []);
        var i = /* @__PURE__ */ new Set();
        Lp.length > 0 && (Lp.forEach(function(M) {
          i.add(St(M) || "Component"), Bs.add(M.type);
        }), Lp = []);
        var o = /* @__PURE__ */ new Set();
        Up.length > 0 && (Up.forEach(function(M) {
          o.add(St(M) || "Component"), Bs.add(M.type);
        }), Up = []);
        var c = /* @__PURE__ */ new Set();
        if (zp.length > 0 && (zp.forEach(function(M) {
          c.add(St(M) || "Component"), Bs.add(M.type);
        }), zp = []), t.size > 0) {
          var d = Ps(t);
          y(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, d);
        }
        if (i.size > 0) {
          var m = Ps(i);
          y(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, m);
        }
        if (c.size > 0) {
          var g = Ps(c);
          y(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, g);
        }
        if (e.size > 0) {
          var T = Ps(e);
          E(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, T);
        }
        if (a.size > 0) {
          var x = Ps(a);
          E(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
        }
        if (o.size > 0) {
          var L = Ps(o);
          E(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, L);
        }
      };
      var Om = /* @__PURE__ */ new Map(), o1 = /* @__PURE__ */ new Set();
      $i.recordLegacyContextWarning = function(e, t) {
        var a = h_(e);
        if (a === null) {
          y("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!o1.has(e.type)) {
          var i = Om.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Om.set(a, i)), i.push(e));
        }
      }, $i.flushLegacyContextWarning = function() {
        Om.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(c) {
              i.add(St(c) || "Component"), o1.add(c.type);
            });
            var o = Ps(i);
            try {
              qt(a), y(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o);
            } finally {
              In();
            }
          }
        });
      }, $i.discardPendingWarnings = function() {
        Ap = [], Mp = [], Np = [], Lp = [], Up = [], zp = [], Om = /* @__PURE__ */ new Map();
      };
    }
    var R0, w0, _0, k0, D0, u1 = function(e, t) {
    };
    R0 = !1, w0 = !1, _0 = {}, k0 = {}, D0 = {}, u1 = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = St(t) || "Component";
        k0[a] || (k0[a] = !0, y('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function m_(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Fp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & kt || Qe) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== j) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !m_(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var o = St(e) || "Component";
          _0[o] || (y('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', o, i), _0[o] = !0);
        }
        if (a._owner) {
          var c = a._owner, d;
          if (c) {
            var m = c;
            if (m.tag !== j)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            d = m.stateNode;
          }
          if (!d)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var g = d;
          K(i, "ref");
          var T = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === T)
            return t.ref;
          var x = function(L) {
            var M = g.refs;
            L === null ? delete M[T] : M[T] = L;
          };
          return x._stringRef = T, x;
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
    function Am(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Mm(e) {
      {
        var t = St(e) || "Component";
        if (D0[t])
          return;
        D0[t] = !0, y("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function s1(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function c1(e) {
      function t(H, J) {
        if (e) {
          var P = H.deletions;
          P === null ? (H.deletions = [J], H.flags |= Bt) : P.push(J);
        }
      }
      function a(H, J) {
        if (!e)
          return null;
        for (var P = J; P !== null; )
          t(H, P), P = P.sibling;
        return null;
      }
      function i(H, J) {
        for (var P = /* @__PURE__ */ new Map(), fe = J; fe !== null; )
          fe.key !== null ? P.set(fe.key, fe) : P.set(fe.index, fe), fe = fe.sibling;
        return P;
      }
      function o(H, J) {
        var P = Xs(H, J);
        return P.index = 0, P.sibling = null, P;
      }
      function c(H, J, P) {
        if (H.index = P, !e)
          return H.flags |= Fd, J;
        var fe = H.alternate;
        if (fe !== null) {
          var Me = fe.index;
          return Me < J ? (H.flags |= un, J) : Me;
        } else
          return H.flags |= un, J;
      }
      function d(H) {
        return e && H.alternate === null && (H.flags |= un), H;
      }
      function m(H, J, P, fe) {
        if (J === null || J.tag !== ee) {
          var Me = xC(P, H.mode, fe);
          return Me.return = H, Me;
        } else {
          var ke = o(J, P);
          return ke.return = H, ke;
        }
      }
      function g(H, J, P, fe) {
        var Me = P.type;
        if (Me === Wa)
          return x(H, J, P.props.children, fe, P.key);
        if (J !== null && (J.elementType === Me || // Keep this check inline so it only runs on the false path:
        hT(J, P) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof Me == "object" && Me !== null && Me.$$typeof === ut && s1(Me) === J.type)) {
          var ke = o(J, P.props);
          return ke.ref = Fp(H, J, P), ke.return = H, ke._debugSource = P._source, ke._debugOwner = P._owner, ke;
        }
        var st = TC(P, H.mode, fe);
        return st.ref = Fp(H, J, P), st.return = H, st;
      }
      function T(H, J, P, fe) {
        if (J === null || J.tag !== z || J.stateNode.containerInfo !== P.containerInfo || J.stateNode.implementation !== P.implementation) {
          var Me = RC(P, H.mode, fe);
          return Me.return = H, Me;
        } else {
          var ke = o(J, P.children || []);
          return ke.return = H, ke;
        }
      }
      function x(H, J, P, fe, Me) {
        if (J === null || J.tag !== re) {
          var ke = Lu(P, H.mode, fe, Me);
          return ke.return = H, ke;
        } else {
          var st = o(J, P);
          return st.return = H, st;
        }
      }
      function L(H, J, P) {
        if (typeof J == "string" && J !== "" || typeof J == "number") {
          var fe = xC("" + J, H.mode, P);
          return fe.return = H, fe;
        }
        if (typeof J == "object" && J !== null) {
          switch (J.$$typeof) {
            case Ri: {
              var Me = TC(J, H.mode, P);
              return Me.ref = Fp(H, null, J), Me.return = H, Me;
            }
            case la: {
              var ke = RC(J, H.mode, P);
              return ke.return = H, ke;
            }
            case ut: {
              var st = J._payload, yt = J._init;
              return L(H, yt(st), P);
            }
          }
          if (nr(J) || oa(J)) {
            var Xt = Lu(J, H.mode, P, null);
            return Xt.return = H, Xt;
          }
          Am(H, J);
        }
        return typeof J == "function" && Mm(H), null;
      }
      function M(H, J, P, fe) {
        var Me = J !== null ? J.key : null;
        if (typeof P == "string" && P !== "" || typeof P == "number")
          return Me !== null ? null : m(H, J, "" + P, fe);
        if (typeof P == "object" && P !== null) {
          switch (P.$$typeof) {
            case Ri:
              return P.key === Me ? g(H, J, P, fe) : null;
            case la:
              return P.key === Me ? T(H, J, P, fe) : null;
            case ut: {
              var ke = P._payload, st = P._init;
              return M(H, J, st(ke), fe);
            }
          }
          if (nr(P) || oa(P))
            return Me !== null ? null : x(H, J, P, fe, null);
          Am(H, P);
        }
        return typeof P == "function" && Mm(H), null;
      }
      function I(H, J, P, fe, Me) {
        if (typeof fe == "string" && fe !== "" || typeof fe == "number") {
          var ke = H.get(P) || null;
          return m(J, ke, "" + fe, Me);
        }
        if (typeof fe == "object" && fe !== null) {
          switch (fe.$$typeof) {
            case Ri: {
              var st = H.get(fe.key === null ? P : fe.key) || null;
              return g(J, st, fe, Me);
            }
            case la: {
              var yt = H.get(fe.key === null ? P : fe.key) || null;
              return T(J, yt, fe, Me);
            }
            case ut:
              var Xt = fe._payload, Vt = fe._init;
              return I(H, J, P, Vt(Xt), Me);
          }
          if (nr(fe) || oa(fe)) {
            var Kn = H.get(P) || null;
            return x(J, Kn, fe, Me, null);
          }
          Am(J, fe);
        }
        return typeof fe == "function" && Mm(J), null;
      }
      function W(H, J, P) {
        {
          if (typeof H != "object" || H === null)
            return J;
          switch (H.$$typeof) {
            case Ri:
            case la:
              u1(H, P);
              var fe = H.key;
              if (typeof fe != "string")
                break;
              if (J === null) {
                J = /* @__PURE__ */ new Set(), J.add(fe);
                break;
              }
              if (!J.has(fe)) {
                J.add(fe);
                break;
              }
              y("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", fe);
              break;
            case ut:
              var Me = H._payload, ke = H._init;
              W(ke(Me), J, P);
              break;
          }
        }
        return J;
      }
      function X(H, J, P, fe) {
        for (var Me = null, ke = 0; ke < P.length; ke++) {
          var st = P[ke];
          Me = W(st, Me, H);
        }
        for (var yt = null, Xt = null, Vt = J, Kn = 0, Ht = 0, Vn = null; Vt !== null && Ht < P.length; Ht++) {
          Vt.index > Ht ? (Vn = Vt, Vt = null) : Vn = Vt.sibling;
          var ra = M(H, Vt, P[Ht], fe);
          if (ra === null) {
            Vt === null && (Vt = Vn);
            break;
          }
          e && Vt && ra.alternate === null && t(H, Vt), Kn = c(ra, Kn, Ht), Xt === null ? yt = ra : Xt.sibling = ra, Xt = ra, Vt = Vn;
        }
        if (Ht === P.length) {
          if (a(H, Vt), Nr()) {
            var Hr = Ht;
            js(H, Hr);
          }
          return yt;
        }
        if (Vt === null) {
          for (; Ht < P.length; Ht++) {
            var ni = L(H, P[Ht], fe);
            ni !== null && (Kn = c(ni, Kn, Ht), Xt === null ? yt = ni : Xt.sibling = ni, Xt = ni);
          }
          if (Nr()) {
            var ga = Ht;
            js(H, ga);
          }
          return yt;
        }
        for (var Sa = i(H, Vt); Ht < P.length; Ht++) {
          var aa = I(Sa, H, Ht, P[Ht], fe);
          aa !== null && (e && aa.alternate !== null && Sa.delete(aa.key === null ? Ht : aa.key), Kn = c(aa, Kn, Ht), Xt === null ? yt = aa : Xt.sibling = aa, Xt = aa);
        }
        if (e && Sa.forEach(function(Kf) {
          return t(H, Kf);
        }), Nr()) {
          var Eo = Ht;
          js(H, Eo);
        }
        return yt;
      }
      function we(H, J, P, fe) {
        var Me = oa(P);
        if (typeof Me != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          P[Symbol.toStringTag] === "Generator" && (w0 || y("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), w0 = !0), P.entries === Me && (R0 || y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), R0 = !0);
          var ke = Me.call(P);
          if (ke)
            for (var st = null, yt = ke.next(); !yt.done; yt = ke.next()) {
              var Xt = yt.value;
              st = W(Xt, st, H);
            }
        }
        var Vt = Me.call(P);
        if (Vt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Kn = null, Ht = null, Vn = J, ra = 0, Hr = 0, ni = null, ga = Vt.next(); Vn !== null && !ga.done; Hr++, ga = Vt.next()) {
          Vn.index > Hr ? (ni = Vn, Vn = null) : ni = Vn.sibling;
          var Sa = M(H, Vn, ga.value, fe);
          if (Sa === null) {
            Vn === null && (Vn = ni);
            break;
          }
          e && Vn && Sa.alternate === null && t(H, Vn), ra = c(Sa, ra, Hr), Ht === null ? Kn = Sa : Ht.sibling = Sa, Ht = Sa, Vn = ni;
        }
        if (ga.done) {
          if (a(H, Vn), Nr()) {
            var aa = Hr;
            js(H, aa);
          }
          return Kn;
        }
        if (Vn === null) {
          for (; !ga.done; Hr++, ga = Vt.next()) {
            var Eo = L(H, ga.value, fe);
            Eo !== null && (ra = c(Eo, ra, Hr), Ht === null ? Kn = Eo : Ht.sibling = Eo, Ht = Eo);
          }
          if (Nr()) {
            var Kf = Hr;
            js(H, Kf);
          }
          return Kn;
        }
        for (var hv = i(H, Vn); !ga.done; Hr++, ga = Vt.next()) {
          var kl = I(hv, H, Hr, ga.value, fe);
          kl !== null && (e && kl.alternate !== null && hv.delete(kl.key === null ? Hr : kl.key), ra = c(kl, ra, Hr), Ht === null ? Kn = kl : Ht.sibling = kl, Ht = kl);
        }
        if (e && hv.forEach(function(BO) {
          return t(H, BO);
        }), Nr()) {
          var PO = Hr;
          js(H, PO);
        }
        return Kn;
      }
      function nt(H, J, P, fe) {
        if (J !== null && J.tag === ee) {
          a(H, J.sibling);
          var Me = o(J, P);
          return Me.return = H, Me;
        }
        a(H, J);
        var ke = xC(P, H.mode, fe);
        return ke.return = H, ke;
      }
      function qe(H, J, P, fe) {
        for (var Me = P.key, ke = J; ke !== null; ) {
          if (ke.key === Me) {
            var st = P.type;
            if (st === Wa) {
              if (ke.tag === re) {
                a(H, ke.sibling);
                var yt = o(ke, P.props.children);
                return yt.return = H, yt._debugSource = P._source, yt._debugOwner = P._owner, yt;
              }
            } else if (ke.elementType === st || // Keep this check inline so it only runs on the false path:
            hT(ke, P) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof st == "object" && st !== null && st.$$typeof === ut && s1(st) === ke.type) {
              a(H, ke.sibling);
              var Xt = o(ke, P.props);
              return Xt.ref = Fp(H, ke, P), Xt.return = H, Xt._debugSource = P._source, Xt._debugOwner = P._owner, Xt;
            }
            a(H, ke);
            break;
          } else
            t(H, ke);
          ke = ke.sibling;
        }
        if (P.type === Wa) {
          var Vt = Lu(P.props.children, H.mode, fe, P.key);
          return Vt.return = H, Vt;
        } else {
          var Kn = TC(P, H.mode, fe);
          return Kn.ref = Fp(H, J, P), Kn.return = H, Kn;
        }
      }
      function Lt(H, J, P, fe) {
        for (var Me = P.key, ke = J; ke !== null; ) {
          if (ke.key === Me)
            if (ke.tag === z && ke.stateNode.containerInfo === P.containerInfo && ke.stateNode.implementation === P.implementation) {
              a(H, ke.sibling);
              var st = o(ke, P.children || []);
              return st.return = H, st;
            } else {
              a(H, ke);
              break;
            }
          else
            t(H, ke);
          ke = ke.sibling;
        }
        var yt = RC(P, H.mode, fe);
        return yt.return = H, yt;
      }
      function Ot(H, J, P, fe) {
        var Me = typeof P == "object" && P !== null && P.type === Wa && P.key === null;
        if (Me && (P = P.props.children), typeof P == "object" && P !== null) {
          switch (P.$$typeof) {
            case Ri:
              return d(qe(H, J, P, fe));
            case la:
              return d(Lt(H, J, P, fe));
            case ut:
              var ke = P._payload, st = P._init;
              return Ot(H, J, st(ke), fe);
          }
          if (nr(P))
            return X(H, J, P, fe);
          if (oa(P))
            return we(H, J, P, fe);
          Am(H, P);
        }
        return typeof P == "string" && P !== "" || typeof P == "number" ? d(nt(H, J, "" + P, fe)) : (typeof P == "function" && Mm(H), a(H, J));
      }
      return Ot;
    }
    var Mf = c1(!0), f1 = c1(!1);
    function y_(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = Xs(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = Xs(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function g_(e, t) {
      for (var a = e.child; a !== null; )
        iO(a, t), a = a.sibling;
    }
    var O0 = Cu(null), A0;
    A0 = {};
    var Nm = null, Nf = null, M0 = null, Lm = !1;
    function Um() {
      Nm = null, Nf = null, M0 = null, Lm = !1;
    }
    function d1() {
      Lm = !0;
    }
    function p1() {
      Lm = !1;
    }
    function v1(e, t, a) {
      ta(O0, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== A0 && y("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = A0;
    }
    function N0(e, t) {
      var a = O0.current;
      ea(O0, t), e._currentValue = a;
    }
    function L0(e, t, a) {
      for (var i = e; i !== null; ) {
        var o = i.alternate;
        if (to(i.childLanes, t) ? o !== null && !to(o.childLanes, t) && (o.childLanes = Ct(o.childLanes, t)) : (i.childLanes = Ct(i.childLanes, t), o !== null && (o.childLanes = Ct(o.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && y("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function S_(e, t, a) {
      C_(e, t, a);
    }
    function C_(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var o = void 0, c = i.dependencies;
        if (c !== null) {
          o = i.child;
          for (var d = c.firstContext; d !== null; ) {
            if (d.context === t) {
              if (i.tag === j) {
                var m = tu(a), g = ho(ln, m);
                g.tag = Fm;
                var T = i.updateQueue;
                if (T !== null) {
                  var x = T.shared, L = x.pending;
                  L === null ? g.next = g : (g.next = L.next, L.next = g), x.pending = g;
                }
              }
              i.lanes = Ct(i.lanes, a);
              var M = i.alternate;
              M !== null && (M.lanes = Ct(M.lanes, a)), L0(i.return, a, e), c.lanes = Ct(c.lanes, a);
              break;
            }
            d = d.next;
          }
        } else if (i.tag === ge)
          o = i.type === e.type ? null : i.child;
        else if (i.tag === pe) {
          var I = i.return;
          if (I === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          I.lanes = Ct(I.lanes, a);
          var W = I.alternate;
          W !== null && (W.lanes = Ct(W.lanes, a)), L0(I, a, e), o = i.sibling;
        } else
          o = i.child;
        if (o !== null)
          o.return = i;
        else
          for (o = i; o !== null; ) {
            if (o === e) {
              o = null;
              break;
            }
            var X = o.sibling;
            if (X !== null) {
              X.return = o.return, o = X;
              break;
            }
            o = o.return;
          }
        i = o;
      }
    }
    function Lf(e, t) {
      Nm = e, Nf = null, M0 = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Jr(a.lanes, t) && Jp(), a.firstContext = null);
      }
    }
    function ur(e) {
      Lm && y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (M0 !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Nf === null) {
          if (Nm === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Nf = a, Nm.dependencies = {
            lanes: ae,
            firstContext: a
          };
        } else
          Nf = Nf.next = a;
      }
      return t;
    }
    var $s = null;
    function U0(e) {
      $s === null ? $s = [e] : $s.push(e);
    }
    function E_() {
      if ($s !== null) {
        for (var e = 0; e < $s.length; e++) {
          var t = $s[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, o = t.pending;
            if (o !== null) {
              var c = o.next;
              o.next = i, a.next = c;
            }
            t.pending = a;
          }
        }
        $s = null;
      }
    }
    function h1(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, U0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, zm(e, i);
    }
    function b_(e, t, a, i) {
      var o = t.interleaved;
      o === null ? (a.next = a, U0(t)) : (a.next = o.next, o.next = a), t.interleaved = a;
    }
    function T_(e, t, a, i) {
      var o = t.interleaved;
      return o === null ? (a.next = a, U0(t)) : (a.next = o.next, o.next = a), t.interleaved = a, zm(e, i);
    }
    function Va(e, t) {
      return zm(e, t);
    }
    var x_ = zm;
    function zm(e, t) {
      e.lanes = Ct(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = Ct(a.lanes, t)), a === null && (e.flags & (un | _a)) !== tt && fT(e);
      for (var i = e, o = e.return; o !== null; )
        o.childLanes = Ct(o.childLanes, t), a = o.alternate, a !== null ? a.childLanes = Ct(a.childLanes, t) : (o.flags & (un | _a)) !== tt && fT(e), i = o, o = o.return;
      if (i.tag === A) {
        var c = i.stateNode;
        return c;
      } else
        return null;
    }
    var m1 = 0, y1 = 1, Fm = 2, z0 = 3, jm = !1, F0, Vm;
    F0 = !1, Vm = null;
    function j0(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: ae
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function g1(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var o = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = o;
      }
    }
    function ho(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: m1,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function xu(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var o = i.shared;
      if (Vm === o && !F0 && (y("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), F0 = !0), bD()) {
        var c = o.pending;
        return c === null ? t.next = t : (t.next = c.next, c.next = t), o.pending = t, x_(e, a);
      } else
        return T_(e, o, t, a);
    }
    function Hm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var o = i.shared;
        if (Jd(a)) {
          var c = o.lanes;
          c = Kc(c, e.pendingLanes);
          var d = Ct(c, a);
          o.lanes = d, Zd(e, d);
        }
      }
    }
    function V0(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var o = i.updateQueue;
        if (a === o) {
          var c = null, d = null, m = a.firstBaseUpdate;
          if (m !== null) {
            var g = m;
            do {
              var T = {
                eventTime: g.eventTime,
                lane: g.lane,
                tag: g.tag,
                payload: g.payload,
                callback: g.callback,
                next: null
              };
              d === null ? c = d = T : (d.next = T, d = T), g = g.next;
            } while (g !== null);
            d === null ? c = d = t : (d.next = t, d = t);
          } else
            c = d = t;
          a = {
            baseState: o.baseState,
            firstBaseUpdate: c,
            lastBaseUpdate: d,
            shared: o.shared,
            effects: o.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var x = a.lastBaseUpdate;
      x === null ? a.firstBaseUpdate = t : x.next = t, a.lastBaseUpdate = t;
    }
    function R_(e, t, a, i, o, c) {
      switch (a.tag) {
        case y1: {
          var d = a.payload;
          if (typeof d == "function") {
            d1();
            var m = d.call(c, i, o);
            {
              if (e.mode & kt) {
                Fn(!0);
                try {
                  d.call(c, i, o);
                } finally {
                  Fn(!1);
                }
              }
              p1();
            }
            return m;
          }
          return d;
        }
        case z0:
          e.flags = e.flags & ~ar | ft;
        case m1: {
          var g = a.payload, T;
          if (typeof g == "function") {
            d1(), T = g.call(c, i, o);
            {
              if (e.mode & kt) {
                Fn(!0);
                try {
                  g.call(c, i, o);
                } finally {
                  Fn(!1);
                }
              }
              p1();
            }
          } else
            T = g;
          return T == null ? i : _t({}, i, T);
        }
        case Fm:
          return jm = !0, i;
      }
      return i;
    }
    function Pm(e, t, a, i) {
      var o = e.updateQueue;
      jm = !1, Vm = o.shared;
      var c = o.firstBaseUpdate, d = o.lastBaseUpdate, m = o.shared.pending;
      if (m !== null) {
        o.shared.pending = null;
        var g = m, T = g.next;
        g.next = null, d === null ? c = T : d.next = T, d = g;
        var x = e.alternate;
        if (x !== null) {
          var L = x.updateQueue, M = L.lastBaseUpdate;
          M !== d && (M === null ? L.firstBaseUpdate = T : M.next = T, L.lastBaseUpdate = g);
        }
      }
      if (c !== null) {
        var I = o.baseState, W = ae, X = null, we = null, nt = null, qe = c;
        do {
          var Lt = qe.lane, Ot = qe.eventTime;
          if (to(i, Lt)) {
            if (nt !== null) {
              var J = {
                eventTime: Ot,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: jn,
                tag: qe.tag,
                payload: qe.payload,
                callback: qe.callback,
                next: null
              };
              nt = nt.next = J;
            }
            I = R_(e, o, qe, I, t, a);
            var P = qe.callback;
            if (P !== null && // If the update was already committed, we should not queue its
            // callback again.
            qe.lane !== jn) {
              e.flags |= ci;
              var fe = o.effects;
              fe === null ? o.effects = [qe] : fe.push(qe);
            }
          } else {
            var H = {
              eventTime: Ot,
              lane: Lt,
              tag: qe.tag,
              payload: qe.payload,
              callback: qe.callback,
              next: null
            };
            nt === null ? (we = nt = H, X = I) : nt = nt.next = H, W = Ct(W, Lt);
          }
          if (qe = qe.next, qe === null) {
            if (m = o.shared.pending, m === null)
              break;
            var Me = m, ke = Me.next;
            Me.next = null, qe = ke, o.lastBaseUpdate = Me, o.shared.pending = null;
          }
        } while (!0);
        nt === null && (X = I), o.baseState = X, o.firstBaseUpdate = we, o.lastBaseUpdate = nt;
        var st = o.shared.interleaved;
        if (st !== null) {
          var yt = st;
          do
            W = Ct(W, yt.lane), yt = yt.next;
          while (yt !== st);
        } else c === null && (o.shared.lanes = ae);
        cv(W), e.lanes = W, e.memoizedState = I;
      }
      Vm = null;
    }
    function w_(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function S1() {
      jm = !1;
    }
    function Bm() {
      return jm;
    }
    function C1(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var o = 0; o < i.length; o++) {
          var c = i[o], d = c.callback;
          d !== null && (c.callback = null, w_(d, a));
        }
    }
    var jp = {}, Ru = Cu(jp), Vp = Cu(jp), $m = Cu(jp);
    function Im(e) {
      if (e === jp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function E1() {
      var e = Im($m.current);
      return e;
    }
    function H0(e, t) {
      ta($m, t, e), ta(Vp, e, e), ta(Ru, jp, e);
      var a = $R(t);
      ea(Ru, e), ta(Ru, a, e);
    }
    function Uf(e) {
      ea(Ru, e), ea(Vp, e), ea($m, e);
    }
    function P0() {
      var e = Im(Ru.current);
      return e;
    }
    function b1(e) {
      Im($m.current);
      var t = Im(Ru.current), a = IR(t, e.type);
      t !== a && (ta(Vp, e, e), ta(Ru, a, e));
    }
    function B0(e) {
      Vp.current === e && (ea(Ru, e), ea(Vp, e));
    }
    var __ = 0, T1 = 1, x1 = 1, Hp = 2, Ii = Cu(__);
    function $0(e, t) {
      return (e & t) !== 0;
    }
    function zf(e) {
      return e & T1;
    }
    function I0(e, t) {
      return e & T1 | t;
    }
    function k_(e, t) {
      return e | t;
    }
    function wu(e, t) {
      ta(Ii, t, e);
    }
    function Ff(e) {
      ea(Ii, e);
    }
    function D_(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Ym(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Q) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || PE(i) || u0(i))
              return t;
          }
        } else if (t.tag === Ne && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var o = (t.flags & ft) !== tt;
          if (o)
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
    var Ha = (
      /*   */
      0
    ), vr = (
      /* */
      1
    ), El = (
      /*  */
      2
    ), hr = (
      /*    */
      4
    ), Lr = (
      /*   */
      8
    ), Y0 = [];
    function W0() {
      for (var e = 0; e < Y0.length; e++) {
        var t = Y0[e];
        t._workInProgressVersionPrimary = null;
      }
      Y0.length = 0;
    }
    function O_(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var Ae = p.ReactCurrentDispatcher, Pp = p.ReactCurrentBatchConfig, Q0, jf;
    Q0 = /* @__PURE__ */ new Set();
    var Is = ae, Kt = null, mr = null, yr = null, Wm = !1, Bp = !1, $p = 0, A_ = 0, M_ = 25, te = null, Si = null, _u = -1, G0 = !1;
    function Wt() {
      {
        var e = te;
        Si === null ? Si = [e] : Si.push(e);
      }
    }
    function Re() {
      {
        var e = te;
        Si !== null && (_u++, Si[_u] !== e && N_(e));
      }
    }
    function Vf(e) {
      e != null && !nr(e) && y("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", te, typeof e);
    }
    function N_(e) {
      {
        var t = St(Kt);
        if (!Q0.has(t) && (Q0.add(t), Si !== null)) {
          for (var a = "", i = 30, o = 0; o <= _u; o++) {
            for (var c = Si[o], d = o === _u ? e : c, m = o + 1 + ". " + c; m.length < i; )
              m += " ";
            m += d + `
`, a += m;
          }
          y(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function na() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function q0(e, t) {
      if (G0)
        return !1;
      if (t === null)
        return y("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", te), !1;
      e.length !== t.length && y(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, te, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Ve(e[a], t[a]))
          return !1;
      return !0;
    }
    function Hf(e, t, a, i, o, c) {
      Is = c, Kt = t, Si = e !== null ? e._debugHookTypes : null, _u = -1, G0 = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = ae, e !== null && e.memoizedState !== null ? Ae.current = W1 : Si !== null ? Ae.current = Y1 : Ae.current = I1;
      var d = a(i, o);
      if (Bp) {
        var m = 0;
        do {
          if (Bp = !1, $p = 0, m >= M_)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          m += 1, G0 = !1, mr = null, yr = null, t.updateQueue = null, _u = -1, Ae.current = Q1, d = a(i, o);
        } while (Bp);
      }
      Ae.current = iy, t._debugHookTypes = Si;
      var g = mr !== null && mr.next !== null;
      if (Is = ae, Kt = null, mr = null, yr = null, te = null, Si = null, _u = -1, e !== null && (e.flags & fr) !== (t.flags & fr) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Ge) !== Ye && y("Internal React error: Expected static flag was missing. Please notify the React team."), Wm = !1, g)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return d;
    }
    function Pf() {
      var e = $p !== 0;
      return $p = 0, e;
    }
    function R1(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & pa) !== Ye ? t.flags &= ~(Wl | Wr | hn | Et) : t.flags &= ~(hn | Et), e.lanes = Es(e.lanes, a);
    }
    function w1() {
      if (Ae.current = iy, Wm) {
        for (var e = Kt.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Wm = !1;
      }
      Is = ae, Kt = null, mr = null, yr = null, Si = null, _u = -1, te = null, V1 = !1, Bp = !1, $p = 0;
    }
    function bl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return yr === null ? Kt.memoizedState = yr = e : yr = yr.next = e, yr;
    }
    function Ci() {
      var e;
      if (mr === null) {
        var t = Kt.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = mr.next;
      var a;
      if (yr === null ? a = Kt.memoizedState : a = yr.next, a !== null)
        yr = a, a = yr.next, mr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        mr = e;
        var i = {
          memoizedState: mr.memoizedState,
          baseState: mr.baseState,
          baseQueue: mr.baseQueue,
          queue: mr.queue,
          next: null
        };
        yr === null ? Kt.memoizedState = yr = i : yr = yr.next = i;
      }
      return yr;
    }
    function _1() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function K0(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function X0(e, t, a) {
      var i = bl(), o;
      a !== void 0 ? o = a(t) : o = t, i.memoizedState = i.baseState = o;
      var c = {
        pending: null,
        interleaved: null,
        lanes: ae,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: o
      };
      i.queue = c;
      var d = c.dispatch = F_.bind(null, Kt, c);
      return [i.memoizedState, d];
    }
    function J0(e, t, a) {
      var i = Ci(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var c = mr, d = c.baseQueue, m = o.pending;
      if (m !== null) {
        if (d !== null) {
          var g = d.next, T = m.next;
          d.next = T, m.next = g;
        }
        c.baseQueue !== d && y("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), c.baseQueue = d = m, o.pending = null;
      }
      if (d !== null) {
        var x = d.next, L = c.baseState, M = null, I = null, W = null, X = x;
        do {
          var we = X.lane;
          if (to(Is, we)) {
            if (W !== null) {
              var qe = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: jn,
                action: X.action,
                hasEagerState: X.hasEagerState,
                eagerState: X.eagerState,
                next: null
              };
              W = W.next = qe;
            }
            if (X.hasEagerState)
              L = X.eagerState;
            else {
              var Lt = X.action;
              L = e(L, Lt);
            }
          } else {
            var nt = {
              lane: we,
              action: X.action,
              hasEagerState: X.hasEagerState,
              eagerState: X.eagerState,
              next: null
            };
            W === null ? (I = W = nt, M = L) : W = W.next = nt, Kt.lanes = Ct(Kt.lanes, we), cv(we);
          }
          X = X.next;
        } while (X !== null && X !== x);
        W === null ? M = L : W.next = I, Ve(L, i.memoizedState) || Jp(), i.memoizedState = L, i.baseState = M, i.baseQueue = W, o.lastRenderedState = L;
      }
      var Ot = o.interleaved;
      if (Ot !== null) {
        var H = Ot;
        do {
          var J = H.lane;
          Kt.lanes = Ct(Kt.lanes, J), cv(J), H = H.next;
        } while (H !== Ot);
      } else d === null && (o.lanes = ae);
      var P = o.dispatch;
      return [i.memoizedState, P];
    }
    function Z0(e, t, a) {
      var i = Ci(), o = i.queue;
      if (o === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      o.lastRenderedReducer = e;
      var c = o.dispatch, d = o.pending, m = i.memoizedState;
      if (d !== null) {
        o.pending = null;
        var g = d.next, T = g;
        do {
          var x = T.action;
          m = e(m, x), T = T.next;
        } while (T !== g);
        Ve(m, i.memoizedState) || Jp(), i.memoizedState = m, i.baseQueue === null && (i.baseState = m), o.lastRenderedState = m;
      }
      return [m, c];
    }
    function Y2(e, t, a) {
    }
    function W2(e, t, a) {
    }
    function eS(e, t, a) {
      var i = Kt, o = bl(), c, d = Nr();
      if (d) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        c = a(), jf || c !== a() && (y("The result of getServerSnapshot should be cached to avoid an infinite loop"), jf = !0);
      } else {
        if (c = t(), !jf) {
          var m = t();
          Ve(c, m) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), jf = !0);
        }
        var g = xy();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cs(g, Is) || k1(i, t, c);
      }
      o.memoizedState = c;
      var T = {
        value: c,
        getSnapshot: t
      };
      return o.queue = T, Xm(O1.bind(null, i, T, e), [e]), i.flags |= hn, Ip(vr | Lr, D1.bind(null, i, T, c, t), void 0, null), c;
    }
    function Qm(e, t, a) {
      var i = Kt, o = Ci(), c = t();
      if (!jf) {
        var d = t();
        Ve(c, d) || (y("The result of getSnapshot should be cached to avoid an infinite loop"), jf = !0);
      }
      var m = o.memoizedState, g = !Ve(m, c);
      g && (o.memoizedState = c, Jp());
      var T = o.queue;
      if (Wp(O1.bind(null, i, T, e), [e]), T.getSnapshot !== t || g || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      yr !== null && yr.memoizedState.tag & vr) {
        i.flags |= hn, Ip(vr | Lr, D1.bind(null, i, T, c, t), void 0, null);
        var x = xy();
        if (x === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Cs(x, Is) || k1(i, t, c);
      }
      return c;
    }
    function k1(e, t, a) {
      e.flags |= cs;
      var i = {
        getSnapshot: t,
        value: a
      }, o = Kt.updateQueue;
      if (o === null)
        o = _1(), Kt.updateQueue = o, o.stores = [i];
      else {
        var c = o.stores;
        c === null ? o.stores = [i] : c.push(i);
      }
    }
    function D1(e, t, a, i) {
      t.value = a, t.getSnapshot = i, A1(t) && M1(e);
    }
    function O1(e, t, a) {
      var i = function() {
        A1(t) && M1(e);
      };
      return a(i);
    }
    function A1(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Ve(a, i);
      } catch {
        return !0;
      }
    }
    function M1(e) {
      var t = Va(e, Ze);
      t !== null && Er(t, e, Ze, ln);
    }
    function Gm(e) {
      var t = bl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: ae,
        dispatch: null,
        lastRenderedReducer: K0,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = j_.bind(null, Kt, a);
      return [t.memoizedState, i];
    }
    function tS(e) {
      return J0(K0);
    }
    function nS(e) {
      return Z0(K0);
    }
    function Ip(e, t, a, i) {
      var o = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, c = Kt.updateQueue;
      if (c === null)
        c = _1(), Kt.updateQueue = c, c.lastEffect = o.next = o;
      else {
        var d = c.lastEffect;
        if (d === null)
          c.lastEffect = o.next = o;
        else {
          var m = d.next;
          d.next = o, o.next = m, c.lastEffect = o;
        }
      }
      return o;
    }
    function rS(e) {
      var t = bl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function qm(e) {
      var t = Ci();
      return t.memoizedState;
    }
    function Yp(e, t, a, i) {
      var o = bl(), c = i === void 0 ? null : i;
      Kt.flags |= e, o.memoizedState = Ip(vr | t, a, void 0, c);
    }
    function Km(e, t, a, i) {
      var o = Ci(), c = i === void 0 ? null : i, d = void 0;
      if (mr !== null) {
        var m = mr.memoizedState;
        if (d = m.destroy, c !== null) {
          var g = m.deps;
          if (q0(c, g)) {
            o.memoizedState = Ip(t, a, d, c);
            return;
          }
        }
      }
      Kt.flags |= e, o.memoizedState = Ip(vr | t, a, d, c);
    }
    function Xm(e, t) {
      return (Kt.mode & pa) !== Ye ? Yp(Wl | hn | sl, Lr, e, t) : Yp(hn | sl, Lr, e, t);
    }
    function Wp(e, t) {
      return Km(hn, Lr, e, t);
    }
    function aS(e, t) {
      return Yp(Et, El, e, t);
    }
    function Jm(e, t) {
      return Km(Et, El, e, t);
    }
    function iS(e, t) {
      var a = Et;
      return a |= Yr, (Kt.mode & pa) !== Ye && (a |= Wr), Yp(a, hr, e, t);
    }
    function Zm(e, t) {
      return Km(Et, hr, e, t);
    }
    function N1(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var o = t;
        o.hasOwnProperty("current") || y("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(o).join(", ") + "}");
        var c = e();
        return o.current = c, function() {
          o.current = null;
        };
      }
    }
    function lS(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, o = Et;
      return o |= Yr, (Kt.mode & pa) !== Ye && (o |= Wr), Yp(o, hr, N1.bind(null, t, e), i);
    }
    function ey(e, t, a) {
      typeof t != "function" && y("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Km(Et, hr, N1.bind(null, t, e), i);
    }
    function L_(e, t) {
    }
    var ty = L_;
    function oS(e, t) {
      var a = bl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function ny(e, t) {
      var a = Ci(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var c = o[1];
        if (q0(i, c))
          return o[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function uS(e, t) {
      var a = bl(), i = t === void 0 ? null : t, o = e();
      return a.memoizedState = [o, i], o;
    }
    function ry(e, t) {
      var a = Ci(), i = t === void 0 ? null : t, o = a.memoizedState;
      if (o !== null && i !== null) {
        var c = o[1];
        if (q0(i, c))
          return o[0];
      }
      var d = e();
      return a.memoizedState = [d, i], d;
    }
    function sS(e) {
      var t = bl();
      return t.memoizedState = e, e;
    }
    function L1(e) {
      var t = Ci(), a = mr, i = a.memoizedState;
      return z1(t, i, e);
    }
    function U1(e) {
      var t = Ci();
      if (mr === null)
        return t.memoizedState = e, e;
      var a = mr.memoizedState;
      return z1(t, a, e);
    }
    function z1(e, t, a) {
      var i = !Nh(Is);
      if (i) {
        if (!Ve(a, t)) {
          var o = zh();
          Kt.lanes = Ct(Kt.lanes, o), cv(o), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Jp()), e.memoizedState = a, a;
    }
    function U_(e, t, a) {
      var i = Na();
      xn(Dg(i, Fi)), e(!0);
      var o = Pp.transition;
      Pp.transition = {};
      var c = Pp.transition;
      Pp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (xn(i), Pp.transition = o, o === null && c._updatedFibers) {
          var d = c._updatedFibers.size;
          d > 10 && E("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), c._updatedFibers.clear();
        }
      }
    }
    function cS() {
      var e = Gm(!1), t = e[0], a = e[1], i = U_.bind(null, a), o = bl();
      return o.memoizedState = i, [t, i];
    }
    function F1() {
      var e = tS(), t = e[0], a = Ci(), i = a.memoizedState;
      return [t, i];
    }
    function j1() {
      var e = nS(), t = e[0], a = Ci(), i = a.memoizedState;
      return [t, i];
    }
    var V1 = !1;
    function z_() {
      return V1;
    }
    function fS() {
      var e = bl(), t = xy(), a = t.identifierPrefix, i;
      if (Nr()) {
        var o = Zw();
        i = ":" + a + "R" + o;
        var c = $p++;
        c > 0 && (i += "H" + c.toString(32)), i += ":";
      } else {
        var d = A_++;
        i = ":" + a + "r" + d.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function ay() {
      var e = Ci(), t = e.memoizedState;
      return t;
    }
    function F_(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Mu(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (H1(e))
        P1(t, o);
      else {
        var c = h1(e, t, o, i);
        if (c !== null) {
          var d = ya();
          Er(c, e, i, d), B1(c, t, i);
        }
      }
      $1(e, i);
    }
    function j_(e, t, a) {
      typeof arguments[3] == "function" && y("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Mu(e), o = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (H1(e))
        P1(t, o);
      else {
        var c = e.alternate;
        if (e.lanes === ae && (c === null || c.lanes === ae)) {
          var d = t.lastRenderedReducer;
          if (d !== null) {
            var m;
            m = Ae.current, Ae.current = Yi;
            try {
              var g = t.lastRenderedState, T = d(g, a);
              if (o.hasEagerState = !0, o.eagerState = T, Ve(T, g)) {
                b_(e, t, o, i);
                return;
              }
            } catch {
            } finally {
              Ae.current = m;
            }
          }
        }
        var x = h1(e, t, o, i);
        if (x !== null) {
          var L = ya();
          Er(x, e, i, L), B1(x, t, i);
        }
      }
      $1(e, i);
    }
    function H1(e) {
      var t = e.alternate;
      return e === Kt || t !== null && t === Kt;
    }
    function P1(e, t) {
      Bp = Wm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function B1(e, t, a) {
      if (Jd(a)) {
        var i = t.lanes;
        i = Kc(i, e.pendingLanes);
        var o = Ct(i, a);
        t.lanes = o, Zd(e, o);
      }
    }
    function $1(e, t, a) {
      vs(e, t);
    }
    var iy = {
      readContext: ur,
      useCallback: na,
      useContext: na,
      useEffect: na,
      useImperativeHandle: na,
      useInsertionEffect: na,
      useLayoutEffect: na,
      useMemo: na,
      useReducer: na,
      useRef: na,
      useState: na,
      useDebugValue: na,
      useDeferredValue: na,
      useTransition: na,
      useMutableSource: na,
      useSyncExternalStore: na,
      useId: na,
      unstable_isNewReconciler: ve
    }, I1 = null, Y1 = null, W1 = null, Q1 = null, Tl = null, Yi = null, ly = null;
    {
      var dS = function() {
        y("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, vt = function() {
        y("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      I1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", Wt(), Vf(t), oS(e, t);
        },
        useContext: function(e) {
          return te = "useContext", Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", Wt(), Vf(t), Xm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", Wt(), Vf(a), lS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", Wt(), Vf(t), aS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", Wt(), Vf(t), iS(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", Wt(), Vf(t);
          var a = Ae.current;
          Ae.current = Tl;
          try {
            return uS(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", Wt();
          var i = Ae.current;
          Ae.current = Tl;
          try {
            return X0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", Wt(), rS(e);
        },
        useState: function(e) {
          te = "useState", Wt();
          var t = Ae.current;
          Ae.current = Tl;
          try {
            return Gm(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", Wt(), sS(e);
        },
        useTransition: function() {
          return te = "useTransition", Wt(), cS();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", Wt(), eS(e, t, a);
        },
        useId: function() {
          return te = "useId", Wt(), fS();
        },
        unstable_isNewReconciler: ve
      }, Y1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", Re(), oS(e, t);
        },
        useContext: function(e) {
          return te = "useContext", Re(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", Re(), Xm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", Re(), lS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", Re(), aS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", Re(), iS(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", Re();
          var a = Ae.current;
          Ae.current = Tl;
          try {
            return uS(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", Re();
          var i = Ae.current;
          Ae.current = Tl;
          try {
            return X0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", Re(), rS(e);
        },
        useState: function(e) {
          te = "useState", Re();
          var t = Ae.current;
          Ae.current = Tl;
          try {
            return Gm(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", Re(), void 0;
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", Re(), sS(e);
        },
        useTransition: function() {
          return te = "useTransition", Re(), cS();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", Re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", Re(), eS(e, t, a);
        },
        useId: function() {
          return te = "useId", Re(), fS();
        },
        unstable_isNewReconciler: ve
      }, W1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", Re(), ny(e, t);
        },
        useContext: function(e) {
          return te = "useContext", Re(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", Re(), Wp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", Re(), ey(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", Re(), Jm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", Re(), Zm(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", Re();
          var a = Ae.current;
          Ae.current = Yi;
          try {
            return ry(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", Re();
          var i = Ae.current;
          Ae.current = Yi;
          try {
            return J0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", Re(), qm();
        },
        useState: function(e) {
          te = "useState", Re();
          var t = Ae.current;
          Ae.current = Yi;
          try {
            return tS(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", Re(), ty();
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", Re(), L1(e);
        },
        useTransition: function() {
          return te = "useTransition", Re(), F1();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", Re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", Re(), Qm(e, t);
        },
        useId: function() {
          return te = "useId", Re(), ay();
        },
        unstable_isNewReconciler: ve
      }, Q1 = {
        readContext: function(e) {
          return ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", Re(), ny(e, t);
        },
        useContext: function(e) {
          return te = "useContext", Re(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", Re(), Wp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", Re(), ey(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", Re(), Jm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", Re(), Zm(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", Re();
          var a = Ae.current;
          Ae.current = ly;
          try {
            return ry(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", Re();
          var i = Ae.current;
          Ae.current = ly;
          try {
            return Z0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", Re(), qm();
        },
        useState: function(e) {
          te = "useState", Re();
          var t = Ae.current;
          Ae.current = ly;
          try {
            return nS(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", Re(), ty();
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", Re(), U1(e);
        },
        useTransition: function() {
          return te = "useTransition", Re(), j1();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", Re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", Re(), Qm(e, t);
        },
        useId: function() {
          return te = "useId", Re(), ay();
        },
        unstable_isNewReconciler: ve
      }, Tl = {
        readContext: function(e) {
          return dS(), ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", vt(), Wt(), oS(e, t);
        },
        useContext: function(e) {
          return te = "useContext", vt(), Wt(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", vt(), Wt(), Xm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", vt(), Wt(), lS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", vt(), Wt(), aS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", vt(), Wt(), iS(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", vt(), Wt();
          var a = Ae.current;
          Ae.current = Tl;
          try {
            return uS(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", vt(), Wt();
          var i = Ae.current;
          Ae.current = Tl;
          try {
            return X0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", vt(), Wt(), rS(e);
        },
        useState: function(e) {
          te = "useState", vt(), Wt();
          var t = Ae.current;
          Ae.current = Tl;
          try {
            return Gm(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", vt(), Wt(), void 0;
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", vt(), Wt(), sS(e);
        },
        useTransition: function() {
          return te = "useTransition", vt(), Wt(), cS();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", vt(), Wt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", vt(), Wt(), eS(e, t, a);
        },
        useId: function() {
          return te = "useId", vt(), Wt(), fS();
        },
        unstable_isNewReconciler: ve
      }, Yi = {
        readContext: function(e) {
          return dS(), ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", vt(), Re(), ny(e, t);
        },
        useContext: function(e) {
          return te = "useContext", vt(), Re(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", vt(), Re(), Wp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", vt(), Re(), ey(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", vt(), Re(), Jm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", vt(), Re(), Zm(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", vt(), Re();
          var a = Ae.current;
          Ae.current = Yi;
          try {
            return ry(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", vt(), Re();
          var i = Ae.current;
          Ae.current = Yi;
          try {
            return J0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", vt(), Re(), qm();
        },
        useState: function(e) {
          te = "useState", vt(), Re();
          var t = Ae.current;
          Ae.current = Yi;
          try {
            return tS(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", vt(), Re(), ty();
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", vt(), Re(), L1(e);
        },
        useTransition: function() {
          return te = "useTransition", vt(), Re(), F1();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", vt(), Re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", vt(), Re(), Qm(e, t);
        },
        useId: function() {
          return te = "useId", vt(), Re(), ay();
        },
        unstable_isNewReconciler: ve
      }, ly = {
        readContext: function(e) {
          return dS(), ur(e);
        },
        useCallback: function(e, t) {
          return te = "useCallback", vt(), Re(), ny(e, t);
        },
        useContext: function(e) {
          return te = "useContext", vt(), Re(), ur(e);
        },
        useEffect: function(e, t) {
          return te = "useEffect", vt(), Re(), Wp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return te = "useImperativeHandle", vt(), Re(), ey(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return te = "useInsertionEffect", vt(), Re(), Jm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return te = "useLayoutEffect", vt(), Re(), Zm(e, t);
        },
        useMemo: function(e, t) {
          te = "useMemo", vt(), Re();
          var a = Ae.current;
          Ae.current = Yi;
          try {
            return ry(e, t);
          } finally {
            Ae.current = a;
          }
        },
        useReducer: function(e, t, a) {
          te = "useReducer", vt(), Re();
          var i = Ae.current;
          Ae.current = Yi;
          try {
            return Z0(e, t, a);
          } finally {
            Ae.current = i;
          }
        },
        useRef: function(e) {
          return te = "useRef", vt(), Re(), qm();
        },
        useState: function(e) {
          te = "useState", vt(), Re();
          var t = Ae.current;
          Ae.current = Yi;
          try {
            return nS(e);
          } finally {
            Ae.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return te = "useDebugValue", vt(), Re(), ty();
        },
        useDeferredValue: function(e) {
          return te = "useDeferredValue", vt(), Re(), U1(e);
        },
        useTransition: function() {
          return te = "useTransition", vt(), Re(), j1();
        },
        useMutableSource: function(e, t, a) {
          return te = "useMutableSource", vt(), Re(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return te = "useSyncExternalStore", vt(), Re(), Qm(e, t);
        },
        useId: function() {
          return te = "useId", vt(), Re(), ay();
        },
        unstable_isNewReconciler: ve
      };
    }
    var ku = v.unstable_now, G1 = 0, oy = -1, Qp = -1, uy = -1, pS = !1, sy = !1;
    function q1() {
      return pS;
    }
    function V_() {
      sy = !0;
    }
    function H_() {
      pS = !1, sy = !1;
    }
    function P_() {
      pS = sy, sy = !1;
    }
    function K1() {
      return G1;
    }
    function X1() {
      G1 = ku();
    }
    function vS(e) {
      Qp = ku(), e.actualStartTime < 0 && (e.actualStartTime = ku());
    }
    function J1(e) {
      Qp = -1;
    }
    function cy(e, t) {
      if (Qp >= 0) {
        var a = ku() - Qp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Qp = -1;
      }
    }
    function xl(e) {
      if (oy >= 0) {
        var t = ku() - oy;
        oy = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case A:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case _e:
              var o = a.stateNode;
              o.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function hS(e) {
      if (uy >= 0) {
        var t = ku() - uy;
        uy = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case A:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case _e:
              var o = a.stateNode;
              o !== null && (o.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Rl() {
      oy = ku();
    }
    function mS() {
      uy = ku();
    }
    function yS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Wi(e, t) {
      if (e && e.defaultProps) {
        var a = _t({}, t), i = e.defaultProps;
        for (var o in i)
          a[o] === void 0 && (a[o] = i[o]);
        return a;
      }
      return t;
    }
    var gS = {}, SS, CS, ES, bS, TS, Z1, fy, xS, RS, wS, Gp;
    {
      SS = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), ES = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), xS = /* @__PURE__ */ new Set(), TS = /* @__PURE__ */ new Set(), RS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), Gp = /* @__PURE__ */ new Set();
      var eb = /* @__PURE__ */ new Set();
      fy = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          eb.has(a) || (eb.add(a), y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, Z1 = function(e, t) {
        if (t === void 0) {
          var a = Gt(e) || "Component";
          TS.has(a) || (TS.add(a), y("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(gS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(gS);
    }
    function _S(e, t, a, i) {
      var o = e.memoizedState, c = a(i, o);
      {
        if (e.mode & kt) {
          Fn(!0);
          try {
            c = a(i, o);
          } finally {
            Fn(!1);
          }
        }
        Z1(t, c);
      }
      var d = c == null ? o : _t({}, o, c);
      if (e.memoizedState = d, e.lanes === ae) {
        var m = e.updateQueue;
        m.baseState = d;
      }
    }
    var kS = {
      isMounted: fa,
      enqueueSetState: function(e, t, a) {
        var i = Ra(e), o = ya(), c = Mu(i), d = ho(o, c);
        d.payload = t, a != null && (fy(a, "setState"), d.callback = a);
        var m = xu(i, d, c);
        m !== null && (Er(m, i, c, o), Hm(m, i, c)), vs(i, c);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = Ra(e), o = ya(), c = Mu(i), d = ho(o, c);
        d.tag = y1, d.payload = t, a != null && (fy(a, "replaceState"), d.callback = a);
        var m = xu(i, d, c);
        m !== null && (Er(m, i, c, o), Hm(m, i, c)), vs(i, c);
      },
      enqueueForceUpdate: function(e, t) {
        var a = Ra(e), i = ya(), o = Mu(a), c = ho(i, o);
        c.tag = Fm, t != null && (fy(t, "forceUpdate"), c.callback = t);
        var d = xu(a, c, o);
        d !== null && (Er(d, a, o, i), Hm(d, a, o)), Nc(a, o);
      }
    };
    function tb(e, t, a, i, o, c, d) {
      var m = e.stateNode;
      if (typeof m.shouldComponentUpdate == "function") {
        var g = m.shouldComponentUpdate(i, c, d);
        {
          if (e.mode & kt) {
            Fn(!0);
            try {
              g = m.shouldComponentUpdate(i, c, d);
            } finally {
              Fn(!1);
            }
          }
          g === void 0 && y("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Gt(t) || "Component");
        }
        return g;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !lt(a, i) || !lt(o, c) : !0;
    }
    function B_(e, t, a) {
      var i = e.stateNode;
      {
        var o = Gt(t) || "Component", c = i.render;
        c || (t.prototype && typeof t.prototype.render == "function" ? y("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", o) : y("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", o)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && y("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", o), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && y("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", o), i.propTypes && y("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", o), i.contextType && y("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", o), t.childContextTypes && !Gp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & kt) === Ye && (Gp.add(t), y(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), t.contextTypes && !Gp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & kt) === Ye && (Gp.add(t), y(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, o)), i.contextTypes && y("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", o), t.contextType && t.contextTypes && !RS.has(t) && (RS.add(t), y("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", o)), typeof i.componentShouldUpdate == "function" && y("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", o), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && y("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Gt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && y("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", o), typeof i.componentDidReceiveProps == "function" && y("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", o), typeof i.componentWillRecieveProps == "function" && y("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", o), typeof i.UNSAFE_componentWillRecieveProps == "function" && y("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", o);
        var d = i.props !== a;
        i.props !== void 0 && d && y("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", o, o), i.defaultProps && y("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", o, o), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !ES.has(t) && (ES.add(t), y("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Gt(t))), typeof i.getDerivedStateFromProps == "function" && y("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof i.getDerivedStateFromError == "function" && y("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", o), typeof t.getSnapshotBeforeUpdate == "function" && y("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", o);
        var m = i.state;
        m && (typeof m != "object" || nr(m)) && y("%s.state: must be set to an object or null", o), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && y("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", o);
      }
    }
    function nb(e, t) {
      t.updater = kS, e.stateNode = t, Po(t, e), t._reactInternalInstance = gS;
    }
    function rb(e, t, a) {
      var i = !1, o = ei, c = ei, d = t.contextType;
      if ("contextType" in t) {
        var m = (
          // Allow null for conditional declaration
          d === null || d !== void 0 && d.$$typeof === oe && d._context === void 0
        );
        if (!m && !wS.has(t)) {
          wS.add(t);
          var g = "";
          d === void 0 ? g = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof d != "object" ? g = " However, it is set to a " + typeof d + "." : d.$$typeof === _ ? g = " Did you accidentally pass the Context.Provider instead?" : d._context !== void 0 ? g = " Did you accidentally pass the Context.Consumer instead?" : g = " However, it is set to an object with keys {" + Object.keys(d).join(", ") + "}.", y("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Gt(t) || "Component", g);
        }
      }
      if (typeof d == "object" && d !== null)
        c = ur(d);
      else {
        o = _f(e, t, !0);
        var T = t.contextTypes;
        i = T != null, c = i ? kf(e, o) : ei;
      }
      var x = new t(a, c);
      if (e.mode & kt) {
        Fn(!0);
        try {
          x = new t(a, c);
        } finally {
          Fn(!1);
        }
      }
      var L = e.memoizedState = x.state !== null && x.state !== void 0 ? x.state : null;
      nb(e, x);
      {
        if (typeof t.getDerivedStateFromProps == "function" && L === null) {
          var M = Gt(t) || "Component";
          CS.has(M) || (CS.add(M), y("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", M, x.state === null ? "null" : "undefined", M));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof x.getSnapshotBeforeUpdate == "function") {
          var I = null, W = null, X = null;
          if (typeof x.componentWillMount == "function" && x.componentWillMount.__suppressDeprecationWarning !== !0 ? I = "componentWillMount" : typeof x.UNSAFE_componentWillMount == "function" && (I = "UNSAFE_componentWillMount"), typeof x.componentWillReceiveProps == "function" && x.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? W = "componentWillReceiveProps" : typeof x.UNSAFE_componentWillReceiveProps == "function" && (W = "UNSAFE_componentWillReceiveProps"), typeof x.componentWillUpdate == "function" && x.componentWillUpdate.__suppressDeprecationWarning !== !0 ? X = "componentWillUpdate" : typeof x.UNSAFE_componentWillUpdate == "function" && (X = "UNSAFE_componentWillUpdate"), I !== null || W !== null || X !== null) {
            var we = Gt(t) || "Component", nt = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            bS.has(we) || (bS.add(we), y(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, we, nt, I !== null ? `
  ` + I : "", W !== null ? `
  ` + W : "", X !== null ? `
  ` + X : ""));
          }
        }
      }
      return i && WE(e, o, c), x;
    }
    function $_(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (y("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", St(e) || "Component"), kS.enqueueReplaceState(t, t.state, null));
    }
    function ab(e, t, a, i) {
      var o = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== o) {
        {
          var c = St(e) || "Component";
          SS.has(c) || (SS.add(c), y("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", c));
        }
        kS.enqueueReplaceState(t, t.state, null);
      }
    }
    function DS(e, t, a, i) {
      B_(e, t, a);
      var o = e.stateNode;
      o.props = a, o.state = e.memoizedState, o.refs = {}, j0(e);
      var c = t.contextType;
      if (typeof c == "object" && c !== null)
        o.context = ur(c);
      else {
        var d = _f(e, t, !0);
        o.context = kf(e, d);
      }
      {
        if (o.state === a) {
          var m = Gt(t) || "Component";
          xS.has(m) || (xS.add(m), y("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", m));
        }
        e.mode & kt && $i.recordLegacyContextWarning(e, o), $i.recordUnsafeLifecycleWarnings(e, o);
      }
      o.state = e.memoizedState;
      var g = t.getDerivedStateFromProps;
      if (typeof g == "function" && (_S(e, t, g, a), o.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof o.getSnapshotBeforeUpdate != "function" && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && ($_(e, o), Pm(e, a, o, i), o.state = e.memoizedState), typeof o.componentDidMount == "function") {
        var T = Et;
        T |= Yr, (e.mode & pa) !== Ye && (T |= Wr), e.flags |= T;
      }
    }
    function I_(e, t, a, i) {
      var o = e.stateNode, c = e.memoizedProps;
      o.props = c;
      var d = o.context, m = t.contextType, g = ei;
      if (typeof m == "object" && m !== null)
        g = ur(m);
      else {
        var T = _f(e, t, !0);
        g = kf(e, T);
      }
      var x = t.getDerivedStateFromProps, L = typeof x == "function" || typeof o.getSnapshotBeforeUpdate == "function";
      !L && (typeof o.UNSAFE_componentWillReceiveProps == "function" || typeof o.componentWillReceiveProps == "function") && (c !== a || d !== g) && ab(e, o, a, g), S1();
      var M = e.memoizedState, I = o.state = M;
      if (Pm(e, a, o, i), I = e.memoizedState, c === a && M === I && !bm() && !Bm()) {
        if (typeof o.componentDidMount == "function") {
          var W = Et;
          W |= Yr, (e.mode & pa) !== Ye && (W |= Wr), e.flags |= W;
        }
        return !1;
      }
      typeof x == "function" && (_S(e, t, x, a), I = e.memoizedState);
      var X = Bm() || tb(e, t, c, a, M, I, g);
      if (X) {
        if (!L && (typeof o.UNSAFE_componentWillMount == "function" || typeof o.componentWillMount == "function") && (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function") {
          var we = Et;
          we |= Yr, (e.mode & pa) !== Ye && (we |= Wr), e.flags |= we;
        }
      } else {
        if (typeof o.componentDidMount == "function") {
          var nt = Et;
          nt |= Yr, (e.mode & pa) !== Ye && (nt |= Wr), e.flags |= nt;
        }
        e.memoizedProps = a, e.memoizedState = I;
      }
      return o.props = a, o.state = I, o.context = g, X;
    }
    function Y_(e, t, a, i, o) {
      var c = t.stateNode;
      g1(e, t);
      var d = t.memoizedProps, m = t.type === t.elementType ? d : Wi(t.type, d);
      c.props = m;
      var g = t.pendingProps, T = c.context, x = a.contextType, L = ei;
      if (typeof x == "object" && x !== null)
        L = ur(x);
      else {
        var M = _f(t, a, !0);
        L = kf(t, M);
      }
      var I = a.getDerivedStateFromProps, W = typeof I == "function" || typeof c.getSnapshotBeforeUpdate == "function";
      !W && (typeof c.UNSAFE_componentWillReceiveProps == "function" || typeof c.componentWillReceiveProps == "function") && (d !== g || T !== L) && ab(t, c, i, L), S1();
      var X = t.memoizedState, we = c.state = X;
      if (Pm(t, i, c, o), we = t.memoizedState, d === g && X === we && !bm() && !Bm() && !Pe)
        return typeof c.componentDidUpdate == "function" && (d !== e.memoizedProps || X !== e.memoizedState) && (t.flags |= Et), typeof c.getSnapshotBeforeUpdate == "function" && (d !== e.memoizedProps || X !== e.memoizedState) && (t.flags |= wa), !1;
      typeof I == "function" && (_S(t, a, I, i), we = t.memoizedState);
      var nt = Bm() || tb(t, a, m, i, X, we, L) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Pe;
      return nt ? (!W && (typeof c.UNSAFE_componentWillUpdate == "function" || typeof c.componentWillUpdate == "function") && (typeof c.componentWillUpdate == "function" && c.componentWillUpdate(i, we, L), typeof c.UNSAFE_componentWillUpdate == "function" && c.UNSAFE_componentWillUpdate(i, we, L)), typeof c.componentDidUpdate == "function" && (t.flags |= Et), typeof c.getSnapshotBeforeUpdate == "function" && (t.flags |= wa)) : (typeof c.componentDidUpdate == "function" && (d !== e.memoizedProps || X !== e.memoizedState) && (t.flags |= Et), typeof c.getSnapshotBeforeUpdate == "function" && (d !== e.memoizedProps || X !== e.memoizedState) && (t.flags |= wa), t.memoizedProps = i, t.memoizedState = we), c.props = i, c.state = we, c.context = L, nt;
    }
    function Ys(e, t) {
      return {
        value: e,
        source: t,
        stack: sd(t),
        digest: null
      };
    }
    function OS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function W_(e, t) {
      return !0;
    }
    function AS(e, t) {
      try {
        var a = W_(e, t);
        if (a === !1)
          return;
        var i = t.value, o = t.source, c = t.stack, d = c !== null ? c : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === j)
            return;
          console.error(i);
        }
        var m = o ? St(o) : null, g = m ? "The above error occurred in the <" + m + "> component:" : "The above error occurred in one of your React components:", T;
        if (e.tag === A)
          T = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var x = St(e) || "Anonymous";
          T = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + x + ".");
        }
        var L = g + `
` + d + `

` + ("" + T);
        console.error(L);
      } catch (M) {
        setTimeout(function() {
          throw M;
        });
      }
    }
    var Q_ = typeof WeakMap == "function" ? WeakMap : Map;
    function ib(e, t, a) {
      var i = ho(ln, a);
      i.tag = z0, i.payload = {
        element: null
      };
      var o = t.value;
      return i.callback = function() {
        VD(o), AS(e, t);
      }, i;
    }
    function MS(e, t, a) {
      var i = ho(ln, a);
      i.tag = z0;
      var o = e.type.getDerivedStateFromError;
      if (typeof o == "function") {
        var c = t.value;
        i.payload = function() {
          return o(c);
        }, i.callback = function() {
          mT(e), AS(e, t);
        };
      }
      var d = e.stateNode;
      return d !== null && typeof d.componentDidCatch == "function" && (i.callback = function() {
        mT(e), AS(e, t), typeof o != "function" && FD(this);
        var g = t.value, T = t.stack;
        this.componentDidCatch(g, {
          componentStack: T !== null ? T : ""
        }), typeof o != "function" && (Jr(e.lanes, Ze) || y("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", St(e) || "Unknown"));
      }), i;
    }
    function lb(e, t, a) {
      var i = e.pingCache, o;
      if (i === null ? (i = e.pingCache = new Q_(), o = /* @__PURE__ */ new Set(), i.set(t, o)) : (o = i.get(t), o === void 0 && (o = /* @__PURE__ */ new Set(), i.set(t, o))), !o.has(a)) {
        o.add(a);
        var c = HD.bind(null, e, t, a);
        da && fv(e, a), t.then(c, c);
      }
    }
    function G_(e, t, a, i) {
      var o = e.updateQueue;
      if (o === null) {
        var c = /* @__PURE__ */ new Set();
        c.add(a), e.updateQueue = c;
      } else
        o.add(a);
    }
    function q_(e, t) {
      var a = e.tag;
      if ((e.mode & Ge) === Ye && (a === U || a === ne || a === Ke)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function ob(e) {
      var t = e;
      do {
        if (t.tag === Q && D_(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function ub(e, t, a, i, o) {
      if ((e.mode & Ge) === Ye) {
        if (e === t)
          e.flags |= ar;
        else {
          if (e.flags |= ft, a.flags |= fs, a.flags &= ~(Ec | sa), a.tag === j) {
            var c = a.alternate;
            if (c === null)
              a.tag = R;
            else {
              var d = ho(ln, Ze);
              d.tag = Fm, xu(a, d, Ze);
            }
          }
          a.lanes = Ct(a.lanes, Ze);
        }
        return e;
      }
      return e.flags |= ar, e.lanes = o, e;
    }
    function K_(e, t, a, i, o) {
      if (a.flags |= sa, da && fv(e, o), i !== null && typeof i == "object" && typeof i.then == "function") {
        var c = i;
        q_(a), Nr() && a.mode & Ge && ZE();
        var d = ob(t);
        if (d !== null) {
          d.flags &= ~Tn, ub(d, t, a, e, o), d.mode & Ge && lb(e, c, o), G_(d, e, c);
          return;
        } else {
          if (!Xd(o)) {
            lb(e, c, o), fC();
            return;
          }
          var m = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = m;
        }
      } else if (Nr() && a.mode & Ge) {
        ZE();
        var g = ob(t);
        if (g !== null) {
          (g.flags & ar) === tt && (g.flags |= Tn), ub(g, t, a, e, o), x0(Ys(i, a));
          return;
        }
      }
      i = Ys(i, a), DD(i);
      var T = t;
      do {
        switch (T.tag) {
          case A: {
            var x = i;
            T.flags |= ar;
            var L = tu(o);
            T.lanes = Ct(T.lanes, L);
            var M = ib(T, x, L);
            V0(T, M);
            return;
          }
          case j:
            var I = i, W = T.type, X = T.stateNode;
            if ((T.flags & ft) === tt && (typeof W.getDerivedStateFromError == "function" || X !== null && typeof X.componentDidCatch == "function" && !oT(X))) {
              T.flags |= ar;
              var we = tu(o);
              T.lanes = Ct(T.lanes, we);
              var nt = MS(T, I, we);
              V0(T, nt);
              return;
            }
            break;
        }
        T = T.return;
      } while (T !== null);
    }
    function X_() {
      return null;
    }
    var qp = p.ReactCurrentOwner, Qi = !1, NS, Kp, LS, US, zS, Ws, FS, dy, Xp;
    NS = {}, Kp = {}, LS = {}, US = {}, zS = {}, Ws = !1, FS = {}, dy = {}, Xp = {};
    function ha(e, t, a, i) {
      e === null ? t.child = f1(t, null, a, i) : t.child = Mf(t, e.child, a, i);
    }
    function J_(e, t, a, i) {
      t.child = Mf(t, e.child, null, i), t.child = Mf(t, null, a, i);
    }
    function sb(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var c = a.propTypes;
        c && Pi(
          c,
          i,
          // Resolved props
          "prop",
          Gt(a)
        );
      }
      var d = a.render, m = t.ref, g, T;
      Lf(t, o), Yo(t);
      {
        if (qp.current = t, qa(!0), g = Hf(e, t, d, i, m, o), T = Pf(), t.mode & kt) {
          Fn(!0);
          try {
            g = Hf(e, t, d, i, m, o), T = Pf();
          } finally {
            Fn(!1);
          }
        }
        qa(!1);
      }
      return qr(), e !== null && !Qi ? (R1(e, t, o), mo(e, t, o)) : (Nr() && T && g0(t), t.flags |= ol, ha(e, t, g, o), t.child);
    }
    function cb(e, t, a, i, o) {
      if (e === null) {
        var c = a.type;
        if (rO(c) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var d = c;
          return d = qf(c), t.tag = Ke, t.type = d, HS(t, c), fb(e, t, d, i, o);
        }
        {
          var m = c.propTypes;
          if (m && Pi(
            m,
            i,
            // Resolved props
            "prop",
            Gt(c)
          ), a.defaultProps !== void 0) {
            var g = Gt(c) || "Unknown";
            Xp[g] || (y("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", g), Xp[g] = !0);
          }
        }
        var T = bC(a.type, null, i, t, t.mode, o);
        return T.ref = t.ref, T.return = t, t.child = T, T;
      }
      {
        var x = a.type, L = x.propTypes;
        L && Pi(
          L,
          i,
          // Resolved props
          "prop",
          Gt(x)
        );
      }
      var M = e.child, I = WS(e, o);
      if (!I) {
        var W = M.memoizedProps, X = a.compare;
        if (X = X !== null ? X : lt, X(W, i) && e.ref === t.ref)
          return mo(e, t, o);
      }
      t.flags |= ol;
      var we = Xs(M, i);
      return we.ref = t.ref, we.return = t, t.child = we, we;
    }
    function fb(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var c = t.elementType;
        if (c.$$typeof === ut) {
          var d = c, m = d._payload, g = d._init;
          try {
            c = g(m);
          } catch {
            c = null;
          }
          var T = c && c.propTypes;
          T && Pi(
            T,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Gt(c)
          );
        }
      }
      if (e !== null) {
        var x = e.memoizedProps;
        if (lt(x, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Qi = !1, t.pendingProps = i = x, WS(e, o))
            (e.flags & fs) !== tt && (Qi = !0);
          else return t.lanes = e.lanes, mo(e, t, o);
      }
      return jS(e, t, a, i, o);
    }
    function db(e, t, a) {
      var i = t.pendingProps, o = i.children, c = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || V)
        if ((t.mode & Ge) === Ye) {
          var d = {
            baseLanes: ae,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = d, Ry(t, a);
        } else if (Jr(a, _r)) {
          var L = {
            baseLanes: ae,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = L;
          var M = c !== null ? c.baseLanes : a;
          Ry(t, M);
        } else {
          var m = null, g;
          if (c !== null) {
            var T = c.baseLanes;
            g = Ct(T, a);
          } else
            g = a;
          t.lanes = t.childLanes = _r;
          var x = {
            baseLanes: g,
            cachePool: m,
            transitions: null
          };
          return t.memoizedState = x, t.updateQueue = null, Ry(t, g), null;
        }
      else {
        var I;
        c !== null ? (I = Ct(c.baseLanes, a), t.memoizedState = null) : I = a, Ry(t, I);
      }
      return ha(e, t, o, a), t.child;
    }
    function Z_(e, t, a) {
      var i = t.pendingProps;
      return ha(e, t, i, a), t.child;
    }
    function ek(e, t, a) {
      var i = t.pendingProps.children;
      return ha(e, t, i, a), t.child;
    }
    function tk(e, t, a) {
      {
        t.flags |= Et;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var o = t.pendingProps, c = o.children;
      return ha(e, t, c, a), t.child;
    }
    function pb(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Ir, t.flags |= jd);
    }
    function jS(e, t, a, i, o) {
      if (t.type !== t.elementType) {
        var c = a.propTypes;
        c && Pi(
          c,
          i,
          // Resolved props
          "prop",
          Gt(a)
        );
      }
      var d;
      {
        var m = _f(t, a, !0);
        d = kf(t, m);
      }
      var g, T;
      Lf(t, o), Yo(t);
      {
        if (qp.current = t, qa(!0), g = Hf(e, t, a, i, d, o), T = Pf(), t.mode & kt) {
          Fn(!0);
          try {
            g = Hf(e, t, a, i, d, o), T = Pf();
          } finally {
            Fn(!1);
          }
        }
        qa(!1);
      }
      return qr(), e !== null && !Qi ? (R1(e, t, o), mo(e, t, o)) : (Nr() && T && g0(t), t.flags |= ol, ha(e, t, g, o), t.child);
    }
    function vb(e, t, a, i, o) {
      {
        switch (gO(t)) {
          case !1: {
            var c = t.stateNode, d = t.type, m = new d(t.memoizedProps, c.context), g = m.state;
            c.updater.enqueueSetState(c, g, null);
            break;
          }
          case !0: {
            t.flags |= ft, t.flags |= ar;
            var T = new Error("Simulated error coming from DevTools"), x = tu(o);
            t.lanes = Ct(t.lanes, x);
            var L = MS(t, Ys(T, t), x);
            V0(t, L);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var M = a.propTypes;
          M && Pi(
            M,
            i,
            // Resolved props
            "prop",
            Gt(a)
          );
        }
      }
      var I;
      Cl(a) ? (I = !0, xm(t)) : I = !1, Lf(t, o);
      var W = t.stateNode, X;
      W === null ? (vy(e, t), rb(t, a, i), DS(t, a, i, o), X = !0) : e === null ? X = I_(t, a, i, o) : X = Y_(e, t, a, i, o);
      var we = VS(e, t, a, X, I, o);
      {
        var nt = t.stateNode;
        X && nt.props !== i && (Ws || y("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", St(t) || "a component"), Ws = !0);
      }
      return we;
    }
    function VS(e, t, a, i, o, c) {
      pb(e, t);
      var d = (t.flags & ft) !== tt;
      if (!i && !d)
        return o && qE(t, a, !1), mo(e, t, c);
      var m = t.stateNode;
      qp.current = t;
      var g;
      if (d && typeof a.getDerivedStateFromError != "function")
        g = null, J1();
      else {
        Yo(t);
        {
          if (qa(!0), g = m.render(), t.mode & kt) {
            Fn(!0);
            try {
              m.render();
            } finally {
              Fn(!1);
            }
          }
          qa(!1);
        }
        qr();
      }
      return t.flags |= ol, e !== null && d ? J_(e, t, g, c) : ha(e, t, g, c), t.memoizedState = m.state, o && qE(t, a, !0), t.child;
    }
    function hb(e) {
      var t = e.stateNode;
      t.pendingContext ? QE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && QE(e, t.context, !1), H0(e, t.containerInfo);
    }
    function nk(e, t, a) {
      if (hb(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, o = t.memoizedState, c = o.element;
      g1(e, t), Pm(t, i, null, a);
      var d = t.memoizedState;
      t.stateNode;
      var m = d.element;
      if (o.isDehydrated) {
        var g = {
          element: m,
          isDehydrated: !1,
          cache: d.cache,
          pendingSuspenseBoundaries: d.pendingSuspenseBoundaries,
          transitions: d.transitions
        }, T = t.updateQueue;
        if (T.baseState = g, t.memoizedState = g, t.flags & Tn) {
          var x = Ys(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return mb(e, t, m, a, x);
        } else if (m !== c) {
          var L = Ys(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return mb(e, t, m, a, L);
        } else {
          i_(t);
          var M = f1(t, null, m, a);
          t.child = M;
          for (var I = M; I; )
            I.flags = I.flags & ~un | _a, I = I.sibling;
        }
      } else {
        if (Af(), m === c)
          return mo(e, t, a);
        ha(e, t, m, a);
      }
      return t.child;
    }
    function mb(e, t, a, i, o) {
      return Af(), x0(o), t.flags |= Tn, ha(e, t, a, i), t.child;
    }
    function rk(e, t, a) {
      b1(t), e === null && T0(t);
      var i = t.type, o = t.pendingProps, c = e !== null ? e.memoizedProps : null, d = o.children, m = a0(i, o);
      return m ? d = null : c !== null && a0(i, c) && (t.flags |= Yt), pb(e, t), ha(e, t, d, a), t.child;
    }
    function ak(e, t) {
      return e === null && T0(t), null;
    }
    function ik(e, t, a, i) {
      vy(e, t);
      var o = t.pendingProps, c = a, d = c._payload, m = c._init, g = m(d);
      t.type = g;
      var T = t.tag = aO(g), x = Wi(g, o), L;
      switch (T) {
        case U:
          return HS(t, g), t.type = g = qf(g), L = jS(null, t, g, x, i), L;
        case j:
          return t.type = g = mC(g), L = vb(null, t, g, x, i), L;
        case ne:
          return t.type = g = yC(g), L = sb(null, t, g, x, i), L;
        case ot: {
          if (t.type !== t.elementType) {
            var M = g.propTypes;
            M && Pi(
              M,
              x,
              // Resolved for outer only
              "prop",
              Gt(g)
            );
          }
          return L = cb(
            null,
            t,
            g,
            Wi(g.type, x),
            // The inner type can have defaults too
            i
          ), L;
        }
      }
      var I = "";
      throw g !== null && typeof g == "object" && g.$$typeof === ut && (I = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + g + ". " + ("Lazy element type must resolve to a class or function." + I));
    }
    function lk(e, t, a, i, o) {
      vy(e, t), t.tag = j;
      var c;
      return Cl(a) ? (c = !0, xm(t)) : c = !1, Lf(t, o), rb(t, a, i), DS(t, a, i, o), VS(null, t, a, !0, c, o);
    }
    function ok(e, t, a, i) {
      vy(e, t);
      var o = t.pendingProps, c;
      {
        var d = _f(t, a, !1);
        c = kf(t, d);
      }
      Lf(t, i);
      var m, g;
      Yo(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var T = Gt(a) || "Unknown";
          NS[T] || (y("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", T, T), NS[T] = !0);
        }
        t.mode & kt && $i.recordLegacyContextWarning(t, null), qa(!0), qp.current = t, m = Hf(null, t, a, o, c, i), g = Pf(), qa(!1);
      }
      if (qr(), t.flags |= ol, typeof m == "object" && m !== null && typeof m.render == "function" && m.$$typeof === void 0) {
        var x = Gt(a) || "Unknown";
        Kp[x] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), Kp[x] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof m == "object" && m !== null && typeof m.render == "function" && m.$$typeof === void 0
      ) {
        {
          var L = Gt(a) || "Unknown";
          Kp[L] || (y("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", L, L, L), Kp[L] = !0);
        }
        t.tag = j, t.memoizedState = null, t.updateQueue = null;
        var M = !1;
        return Cl(a) ? (M = !0, xm(t)) : M = !1, t.memoizedState = m.state !== null && m.state !== void 0 ? m.state : null, j0(t), nb(t, m), DS(t, a, o, i), VS(null, t, a, !0, M, i);
      } else {
        if (t.tag = U, t.mode & kt) {
          Fn(!0);
          try {
            m = Hf(null, t, a, o, c, i), g = Pf();
          } finally {
            Fn(!1);
          }
        }
        return Nr() && g && g0(t), ha(null, t, m, i), HS(t, a), t.child;
      }
    }
    function HS(e, t) {
      {
        if (t && t.childContextTypes && y("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Ta();
          i && (a += `

Check the render method of \`` + i + "`.");
          var o = i || "", c = e._debugSource;
          c && (o = c.fileName + ":" + c.lineNumber), zS[o] || (zS[o] = !0, y("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var d = Gt(t) || "Unknown";
          Xp[d] || (y("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", d), Xp[d] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var m = Gt(t) || "Unknown";
          US[m] || (y("%s: Function components do not support getDerivedStateFromProps.", m), US[m] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var g = Gt(t) || "Unknown";
          LS[g] || (y("%s: Function components do not support contextType.", g), LS[g] = !0);
        }
      }
    }
    var PS = {
      dehydrated: null,
      treeContext: null,
      retryLane: jn
    };
    function BS(e) {
      return {
        baseLanes: e,
        cachePool: X_(),
        transitions: null
      };
    }
    function uk(e, t) {
      var a = null;
      return {
        baseLanes: Ct(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function sk(e, t, a, i) {
      if (t !== null) {
        var o = t.memoizedState;
        if (o === null)
          return !1;
      }
      return $0(e, Hp);
    }
    function ck(e, t) {
      return Es(e.childLanes, t);
    }
    function yb(e, t, a) {
      var i = t.pendingProps;
      SO(t) && (t.flags |= ft);
      var o = Ii.current, c = !1, d = (t.flags & ft) !== tt;
      if (d || sk(o, e) ? (c = !0, t.flags &= ~ft) : (e === null || e.memoizedState !== null) && (o = k_(o, x1)), o = zf(o), wu(t, o), e === null) {
        T0(t);
        var m = t.memoizedState;
        if (m !== null) {
          var g = m.dehydrated;
          if (g !== null)
            return hk(t, g);
        }
        var T = i.children, x = i.fallback;
        if (c) {
          var L = fk(t, T, x, a), M = t.child;
          return M.memoizedState = BS(a), t.memoizedState = PS, L;
        } else
          return $S(t, T);
      } else {
        var I = e.memoizedState;
        if (I !== null) {
          var W = I.dehydrated;
          if (W !== null)
            return mk(e, t, d, i, W, I, a);
        }
        if (c) {
          var X = i.fallback, we = i.children, nt = pk(e, t, we, X, a), qe = t.child, Lt = e.child.memoizedState;
          return qe.memoizedState = Lt === null ? BS(a) : uk(Lt, a), qe.childLanes = ck(e, a), t.memoizedState = PS, nt;
        } else {
          var Ot = i.children, H = dk(e, t, Ot, a);
          return t.memoizedState = null, H;
        }
      }
    }
    function $S(e, t, a) {
      var i = e.mode, o = {
        mode: "visible",
        children: t
      }, c = IS(o, i);
      return c.return = e, e.child = c, c;
    }
    function fk(e, t, a, i) {
      var o = e.mode, c = e.child, d = {
        mode: "hidden",
        children: t
      }, m, g;
      return (o & Ge) === Ye && c !== null ? (m = c, m.childLanes = ae, m.pendingProps = d, e.mode & dt && (m.actualDuration = 0, m.actualStartTime = -1, m.selfBaseDuration = 0, m.treeBaseDuration = 0), g = Lu(a, o, i, null)) : (m = IS(d, o), g = Lu(a, o, i, null)), m.return = e, g.return = e, m.sibling = g, e.child = m, g;
    }
    function IS(e, t, a) {
      return gT(e, t, ae, null);
    }
    function gb(e, t) {
      return Xs(e, t);
    }
    function dk(e, t, a, i) {
      var o = e.child, c = o.sibling, d = gb(o, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Ge) === Ye && (d.lanes = i), d.return = t, d.sibling = null, c !== null) {
        var m = t.deletions;
        m === null ? (t.deletions = [c], t.flags |= Bt) : m.push(c);
      }
      return t.child = d, d;
    }
    function pk(e, t, a, i, o) {
      var c = t.mode, d = e.child, m = d.sibling, g = {
        mode: "hidden",
        children: a
      }, T;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (c & Ge) === Ye && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== d
      ) {
        var x = t.child;
        T = x, T.childLanes = ae, T.pendingProps = g, t.mode & dt && (T.actualDuration = 0, T.actualStartTime = -1, T.selfBaseDuration = d.selfBaseDuration, T.treeBaseDuration = d.treeBaseDuration), t.deletions = null;
      } else
        T = gb(d, g), T.subtreeFlags = d.subtreeFlags & fr;
      var L;
      return m !== null ? L = Xs(m, i) : (L = Lu(i, c, o, null), L.flags |= un), L.return = t, T.return = t, T.sibling = L, t.child = T, L;
    }
    function py(e, t, a, i) {
      i !== null && x0(i), Mf(t, e.child, null, a);
      var o = t.pendingProps, c = o.children, d = $S(t, c);
      return d.flags |= un, t.memoizedState = null, d;
    }
    function vk(e, t, a, i, o) {
      var c = t.mode, d = {
        mode: "visible",
        children: a
      }, m = IS(d, c), g = Lu(i, c, o, null);
      return g.flags |= un, m.return = t, g.return = t, m.sibling = g, t.child = m, (t.mode & Ge) !== Ye && Mf(t, e.child, null, o), g;
    }
    function hk(e, t, a) {
      return (e.mode & Ge) === Ye ? (y("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ze) : u0(t) ? e.lanes = zi : e.lanes = _r, null;
    }
    function mk(e, t, a, i, o, c, d) {
      if (a)
        if (t.flags & Tn) {
          t.flags &= ~Tn;
          var H = OS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return py(e, t, d, H);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= ft, null;
          var J = i.children, P = i.fallback, fe = vk(e, t, J, P, d), Me = t.child;
          return Me.memoizedState = BS(d), t.memoizedState = PS, fe;
        }
      else {
        if (r_(), (t.mode & Ge) === Ye)
          return py(
            e,
            t,
            d,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (u0(o)) {
          var m, g, T;
          {
            var x = Cw(o);
            m = x.digest, g = x.message, T = x.stack;
          }
          var L;
          g ? L = new Error(g) : L = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var M = OS(L, m, T);
          return py(e, t, d, M);
        }
        var I = Jr(d, e.childLanes);
        if (Qi || I) {
          var W = xy();
          if (W !== null) {
            var X = Vh(W, d);
            if (X !== jn && X !== c.retryLane) {
              c.retryLane = X;
              var we = ln;
              Va(e, X), Er(W, e, X, we);
            }
          }
          fC();
          var nt = OS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return py(e, t, d, nt);
        } else if (PE(o)) {
          t.flags |= ft, t.child = e.child;
          var qe = PD.bind(null, e);
          return Ew(o, qe), null;
        } else {
          l_(t, o, c.treeContext);
          var Lt = i.children, Ot = $S(t, Lt);
          return Ot.flags |= _a, Ot;
        }
      }
    }
    function Sb(e, t, a) {
      e.lanes = Ct(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = Ct(i.lanes, t)), L0(e.return, t, a);
    }
    function yk(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Q) {
          var o = i.memoizedState;
          o !== null && Sb(i, a, e);
        } else if (i.tag === Ne)
          Sb(i, a, e);
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
    function gk(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Ym(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function Sk(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !FS[e])
        if (FS[e] = !0, typeof e == "string")
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
    function Ck(e, t) {
      e !== void 0 && !dy[e] && (e !== "collapsed" && e !== "hidden" ? (dy[e] = !0, y('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (dy[e] = !0, y('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function Cb(e, t) {
      {
        var a = nr(e), i = !a && typeof oa(e) == "function";
        if (a || i) {
          var o = a ? "array" : "iterable";
          return y("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", o, t, o), !1;
        }
      }
      return !0;
    }
    function Ek(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (nr(e)) {
          for (var a = 0; a < e.length; a++)
            if (!Cb(e[a], a))
              return;
        } else {
          var i = oa(e);
          if (typeof i == "function") {
            var o = i.call(e);
            if (o)
              for (var c = o.next(), d = 0; !c.done; c = o.next()) {
                if (!Cb(c.value, d))
                  return;
                d++;
              }
          } else
            y('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function YS(e, t, a, i, o) {
      var c = e.memoizedState;
      c === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: o
      } : (c.isBackwards = t, c.rendering = null, c.renderingStartTime = 0, c.last = i, c.tail = a, c.tailMode = o);
    }
    function Eb(e, t, a) {
      var i = t.pendingProps, o = i.revealOrder, c = i.tail, d = i.children;
      Sk(o), Ck(c, o), Ek(d, o), ha(e, t, d, a);
      var m = Ii.current, g = $0(m, Hp);
      if (g)
        m = I0(m, Hp), t.flags |= ft;
      else {
        var T = e !== null && (e.flags & ft) !== tt;
        T && yk(t, t.child, a), m = zf(m);
      }
      if (wu(t, m), (t.mode & Ge) === Ye)
        t.memoizedState = null;
      else
        switch (o) {
          case "forwards": {
            var x = gk(t.child), L;
            x === null ? (L = t.child, t.child = null) : (L = x.sibling, x.sibling = null), YS(
              t,
              !1,
              // isBackwards
              L,
              x,
              c
            );
            break;
          }
          case "backwards": {
            var M = null, I = t.child;
            for (t.child = null; I !== null; ) {
              var W = I.alternate;
              if (W !== null && Ym(W) === null) {
                t.child = I;
                break;
              }
              var X = I.sibling;
              I.sibling = M, M = I, I = X;
            }
            YS(
              t,
              !0,
              // isBackwards
              M,
              null,
              // last
              c
            );
            break;
          }
          case "together": {
            YS(
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
    function bk(e, t, a) {
      H0(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = Mf(t, null, i, a) : ha(e, t, i, a), t.child;
    }
    var bb = !1;
    function Tk(e, t, a) {
      var i = t.type, o = i._context, c = t.pendingProps, d = t.memoizedProps, m = c.value;
      {
        "value" in c || bb || (bb = !0, y("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var g = t.type.propTypes;
        g && Pi(g, c, "prop", "Context.Provider");
      }
      if (v1(t, o, m), d !== null) {
        var T = d.value;
        if (Ve(T, m)) {
          if (d.children === c.children && !bm())
            return mo(e, t, a);
        } else
          S_(t, o, a);
      }
      var x = c.children;
      return ha(e, t, x, a), t.child;
    }
    var Tb = !1;
    function xk(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (Tb || (Tb = !0, y("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var o = t.pendingProps, c = o.children;
      typeof c != "function" && y("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Lf(t, a);
      var d = ur(i);
      Yo(t);
      var m;
      return qp.current = t, qa(!0), m = c(d), qa(!1), qr(), t.flags |= ol, ha(e, t, m, a), t.child;
    }
    function Jp() {
      Qi = !0;
    }
    function vy(e, t) {
      (t.mode & Ge) === Ye && e !== null && (e.alternate = null, t.alternate = null, t.flags |= un);
    }
    function mo(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), J1(), cv(t.lanes), Jr(a, t.childLanes) ? (y_(e, t), t.child) : null;
    }
    function Rk(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var o = i.child;
          if (o === null)
            throw new Error("Expected parent to have a child.");
          for (; o.sibling !== t; )
            if (o = o.sibling, o === null)
              throw new Error("Expected to find the previous sibling.");
          o.sibling = a;
        }
        var c = i.deletions;
        return c === null ? (i.deletions = [e], i.flags |= Bt) : c.push(e), a.flags |= un, a;
      }
    }
    function WS(e, t) {
      var a = e.lanes;
      return !!Jr(a, t);
    }
    function wk(e, t, a) {
      switch (t.tag) {
        case A:
          hb(t), t.stateNode, Af();
          break;
        case q:
          b1(t);
          break;
        case j: {
          var i = t.type;
          Cl(i) && xm(t);
          break;
        }
        case z:
          H0(t, t.stateNode.containerInfo);
          break;
        case ge: {
          var o = t.memoizedProps.value, c = t.type._context;
          v1(t, c, o);
          break;
        }
        case _e:
          {
            var d = Jr(a, t.childLanes);
            d && (t.flags |= Et);
            {
              var m = t.stateNode;
              m.effectDuration = 0, m.passiveEffectDuration = 0;
            }
          }
          break;
        case Q: {
          var g = t.memoizedState;
          if (g !== null) {
            if (g.dehydrated !== null)
              return wu(t, zf(Ii.current)), t.flags |= ft, null;
            var T = t.child, x = T.childLanes;
            if (Jr(a, x))
              return yb(e, t, a);
            wu(t, zf(Ii.current));
            var L = mo(e, t, a);
            return L !== null ? L.sibling : null;
          } else
            wu(t, zf(Ii.current));
          break;
        }
        case Ne: {
          var M = (e.flags & ft) !== tt, I = Jr(a, t.childLanes);
          if (M) {
            if (I)
              return Eb(e, t, a);
            t.flags |= ft;
          }
          var W = t.memoizedState;
          if (W !== null && (W.rendering = null, W.tail = null, W.lastEffect = null), wu(t, Ii.current), I)
            break;
          return null;
        }
        case ye:
        case Le:
          return t.lanes = ae, db(e, t, a);
      }
      return mo(e, t, a);
    }
    function xb(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Rk(e, t, bC(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, o = t.pendingProps;
        if (i !== o || bm() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Qi = !0;
        else {
          var c = WS(e, a);
          if (!c && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & ft) === tt)
            return Qi = !1, wk(e, t, a);
          (e.flags & fs) !== tt ? Qi = !0 : Qi = !1;
        }
      } else if (Qi = !1, Nr() && Xw(t)) {
        var d = t.index, m = Jw();
        JE(t, m, d);
      }
      switch (t.lanes = ae, t.tag) {
        case G:
          return ok(e, t, t.type, a);
        case xt: {
          var g = t.elementType;
          return ik(e, t, g, a);
        }
        case U: {
          var T = t.type, x = t.pendingProps, L = t.elementType === T ? x : Wi(T, x);
          return jS(e, t, T, L, a);
        }
        case j: {
          var M = t.type, I = t.pendingProps, W = t.elementType === M ? I : Wi(M, I);
          return vb(e, t, M, W, a);
        }
        case A:
          return nk(e, t, a);
        case q:
          return rk(e, t, a);
        case ee:
          return ak(e, t);
        case Q:
          return yb(e, t, a);
        case z:
          return bk(e, t, a);
        case ne: {
          var X = t.type, we = t.pendingProps, nt = t.elementType === X ? we : Wi(X, we);
          return sb(e, t, X, nt, a);
        }
        case re:
          return Z_(e, t, a);
        case de:
          return ek(e, t, a);
        case _e:
          return tk(e, t, a);
        case ge:
          return Tk(e, t, a);
        case Ue:
          return xk(e, t, a);
        case ot: {
          var qe = t.type, Lt = t.pendingProps, Ot = Wi(qe, Lt);
          if (t.type !== t.elementType) {
            var H = qe.propTypes;
            H && Pi(
              H,
              Ot,
              // Resolved for outer only
              "prop",
              Gt(qe)
            );
          }
          return Ot = Wi(qe.type, Ot), cb(e, t, qe, Ot, a);
        }
        case Ke:
          return fb(e, t, t.type, t.pendingProps, a);
        case R: {
          var J = t.type, P = t.pendingProps, fe = t.elementType === J ? P : Wi(J, P);
          return lk(e, t, J, fe, a);
        }
        case Ne:
          return Eb(e, t, a);
        case be:
          break;
        case ye:
          return db(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Bf(e) {
      e.flags |= Et;
    }
    function Rb(e) {
      e.flags |= Ir, e.flags |= jd;
    }
    var wb, QS, _b, kb;
    wb = function(e, t, a, i) {
      for (var o = t.child; o !== null; ) {
        if (o.tag === q || o.tag === ee)
          GR(e, o.stateNode);
        else if (o.tag !== z) {
          if (o.child !== null) {
            o.child.return = o, o = o.child;
            continue;
          }
        }
        if (o === t)
          return;
        for (; o.sibling === null; ) {
          if (o.return === null || o.return === t)
            return;
          o = o.return;
        }
        o.sibling.return = o.return, o = o.sibling;
      }
    }, QS = function(e, t) {
    }, _b = function(e, t, a, i, o) {
      var c = e.memoizedProps;
      if (c !== i) {
        var d = t.stateNode, m = P0(), g = KR(d, a, c, i, o, m);
        t.updateQueue = g, g && Bf(t);
      }
    }, kb = function(e, t, a, i) {
      a !== i && Bf(t);
    };
    function Zp(e, t) {
      if (!Nr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var o = e.tail, c = null; o !== null; )
              o.alternate !== null && (c = o), o = o.sibling;
            c === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : c.sibling = null;
            break;
          }
        }
    }
    function Ur(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = ae, i = tt;
      if (t) {
        if ((e.mode & dt) !== Ye) {
          for (var g = e.selfBaseDuration, T = e.child; T !== null; )
            a = Ct(a, Ct(T.lanes, T.childLanes)), i |= T.subtreeFlags & fr, i |= T.flags & fr, g += T.treeBaseDuration, T = T.sibling;
          e.treeBaseDuration = g;
        } else
          for (var x = e.child; x !== null; )
            a = Ct(a, Ct(x.lanes, x.childLanes)), i |= x.subtreeFlags & fr, i |= x.flags & fr, x.return = e, x = x.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & dt) !== Ye) {
          for (var o = e.actualDuration, c = e.selfBaseDuration, d = e.child; d !== null; )
            a = Ct(a, Ct(d.lanes, d.childLanes)), i |= d.subtreeFlags, i |= d.flags, o += d.actualDuration, c += d.treeBaseDuration, d = d.sibling;
          e.actualDuration = o, e.treeBaseDuration = c;
        } else
          for (var m = e.child; m !== null; )
            a = Ct(a, Ct(m.lanes, m.childLanes)), i |= m.subtreeFlags, i |= m.flags, m.return = e, m = m.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function _k(e, t, a) {
      if (f_() && (t.mode & Ge) !== Ye && (t.flags & ft) === tt)
        return i1(t), Af(), t.flags |= Tn | sa | ar, !1;
      var i = Dm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (s_(t), Ur(t), (t.mode & dt) !== Ye) {
            var o = a !== null;
            if (o) {
              var c = t.child;
              c !== null && (t.treeBaseDuration -= c.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Af(), (t.flags & ft) === tt && (t.memoizedState = null), t.flags |= Et, Ur(t), (t.mode & dt) !== Ye) {
            var d = a !== null;
            if (d) {
              var m = t.child;
              m !== null && (t.treeBaseDuration -= m.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return l1(), !0;
    }
    function Db(e, t, a) {
      var i = t.pendingProps;
      switch (S0(t), t.tag) {
        case G:
        case xt:
        case Ke:
        case U:
        case ne:
        case re:
        case de:
        case _e:
        case Ue:
        case ot:
          return Ur(t), null;
        case j: {
          var o = t.type;
          return Cl(o) && Tm(t), Ur(t), null;
        }
        case A: {
          var c = t.stateNode;
          if (Uf(t), h0(t), W0(), c.pendingContext && (c.context = c.pendingContext, c.pendingContext = null), e === null || e.child === null) {
            var d = Dm(t);
            if (d)
              Bf(t);
            else if (e !== null) {
              var m = e.memoizedState;
              // Check if this is a client root
              (!m.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Tn) !== tt) && (t.flags |= wa, l1());
            }
          }
          return QS(e, t), Ur(t), null;
        }
        case q: {
          B0(t);
          var g = E1(), T = t.type;
          if (e !== null && t.stateNode != null)
            _b(e, t, T, i, g), e.ref !== t.ref && Rb(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Ur(t), null;
            }
            var x = P0(), L = Dm(t);
            if (L)
              o_(t, g, x) && Bf(t);
            else {
              var M = QR(T, i, g, x, t);
              wb(M, t, !1, !1), t.stateNode = M, qR(M, T, i, g) && Bf(t);
            }
            t.ref !== null && Rb(t);
          }
          return Ur(t), null;
        }
        case ee: {
          var I = i;
          if (e && t.stateNode != null) {
            var W = e.memoizedProps;
            kb(e, t, W, I);
          } else {
            if (typeof I != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var X = E1(), we = P0(), nt = Dm(t);
            nt ? u_(t) && Bf(t) : t.stateNode = XR(I, X, we, t);
          }
          return Ur(t), null;
        }
        case Q: {
          Ff(t);
          var qe = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var Lt = _k(e, t, qe);
            if (!Lt)
              return t.flags & ar ? t : null;
          }
          if ((t.flags & ft) !== tt)
            return t.lanes = a, (t.mode & dt) !== Ye && yS(t), t;
          var Ot = qe !== null, H = e !== null && e.memoizedState !== null;
          if (Ot !== H && Ot) {
            var J = t.child;
            if (J.flags |= ul, (t.mode & Ge) !== Ye) {
              var P = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !se);
              P || $0(Ii.current, x1) ? kD() : fC();
            }
          }
          var fe = t.updateQueue;
          if (fe !== null && (t.flags |= Et), Ur(t), (t.mode & dt) !== Ye && Ot) {
            var Me = t.child;
            Me !== null && (t.treeBaseDuration -= Me.treeBaseDuration);
          }
          return null;
        }
        case z:
          return Uf(t), QS(e, t), e === null && Iw(t.stateNode.containerInfo), Ur(t), null;
        case ge:
          var ke = t.type._context;
          return N0(ke, t), Ur(t), null;
        case R: {
          var st = t.type;
          return Cl(st) && Tm(t), Ur(t), null;
        }
        case Ne: {
          Ff(t);
          var yt = t.memoizedState;
          if (yt === null)
            return Ur(t), null;
          var Xt = (t.flags & ft) !== tt, Vt = yt.rendering;
          if (Vt === null)
            if (Xt)
              Zp(yt, !1);
            else {
              var Kn = OD() && (e === null || (e.flags & ft) === tt);
              if (!Kn)
                for (var Ht = t.child; Ht !== null; ) {
                  var Vn = Ym(Ht);
                  if (Vn !== null) {
                    Xt = !0, t.flags |= ft, Zp(yt, !1);
                    var ra = Vn.updateQueue;
                    return ra !== null && (t.updateQueue = ra, t.flags |= Et), t.subtreeFlags = tt, g_(t, a), wu(t, I0(Ii.current, Hp)), t.child;
                  }
                  Ht = Ht.sibling;
                }
              yt.tail !== null && Sn() > Kb() && (t.flags |= ft, Xt = !0, Zp(yt, !1), t.lanes = kh);
            }
          else {
            if (!Xt) {
              var Hr = Ym(Vt);
              if (Hr !== null) {
                t.flags |= ft, Xt = !0;
                var ni = Hr.updateQueue;
                if (ni !== null && (t.updateQueue = ni, t.flags |= Et), Zp(yt, !0), yt.tail === null && yt.tailMode === "hidden" && !Vt.alternate && !Nr())
                  return Ur(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Sn() * 2 - yt.renderingStartTime > Kb() && a !== _r && (t.flags |= ft, Xt = !0, Zp(yt, !1), t.lanes = kh);
            }
            if (yt.isBackwards)
              Vt.sibling = t.child, t.child = Vt;
            else {
              var ga = yt.last;
              ga !== null ? ga.sibling = Vt : t.child = Vt, yt.last = Vt;
            }
          }
          if (yt.tail !== null) {
            var Sa = yt.tail;
            yt.rendering = Sa, yt.tail = Sa.sibling, yt.renderingStartTime = Sn(), Sa.sibling = null;
            var aa = Ii.current;
            return Xt ? aa = I0(aa, Hp) : aa = zf(aa), wu(t, aa), Sa;
          }
          return Ur(t), null;
        }
        case be:
          break;
        case ye:
        case Le: {
          cC(t);
          var Eo = t.memoizedState, Kf = Eo !== null;
          if (e !== null) {
            var hv = e.memoizedState, kl = hv !== null;
            kl !== Kf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !V && (t.flags |= ul);
          }
          return !Kf || (t.mode & Ge) === Ye ? Ur(t) : Jr(_l, _r) && (Ur(t), t.subtreeFlags & (un | Et) && (t.flags |= ul)), null;
        }
        case bt:
          return null;
        case ct:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function kk(e, t, a) {
      switch (S0(t), t.tag) {
        case j: {
          var i = t.type;
          Cl(i) && Tm(t);
          var o = t.flags;
          return o & ar ? (t.flags = o & ~ar | ft, (t.mode & dt) !== Ye && yS(t), t) : null;
        }
        case A: {
          t.stateNode, Uf(t), h0(t), W0();
          var c = t.flags;
          return (c & ar) !== tt && (c & ft) === tt ? (t.flags = c & ~ar | ft, t) : null;
        }
        case q:
          return B0(t), null;
        case Q: {
          Ff(t);
          var d = t.memoizedState;
          if (d !== null && d.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Af();
          }
          var m = t.flags;
          return m & ar ? (t.flags = m & ~ar | ft, (t.mode & dt) !== Ye && yS(t), t) : null;
        }
        case Ne:
          return Ff(t), null;
        case z:
          return Uf(t), null;
        case ge:
          var g = t.type._context;
          return N0(g, t), null;
        case ye:
        case Le:
          return cC(t), null;
        case bt:
          return null;
        default:
          return null;
      }
    }
    function Ob(e, t, a) {
      switch (S0(t), t.tag) {
        case j: {
          var i = t.type.childContextTypes;
          i != null && Tm(t);
          break;
        }
        case A: {
          t.stateNode, Uf(t), h0(t), W0();
          break;
        }
        case q: {
          B0(t);
          break;
        }
        case z:
          Uf(t);
          break;
        case Q:
          Ff(t);
          break;
        case Ne:
          Ff(t);
          break;
        case ge:
          var o = t.type._context;
          N0(o, t);
          break;
        case ye:
        case Le:
          cC(t);
          break;
      }
    }
    var Ab = null;
    Ab = /* @__PURE__ */ new Set();
    var hy = !1, zr = !1, Dk = typeof WeakSet == "function" ? WeakSet : Set, He = null, $f = null, If = null;
    function Ok(e) {
      Yl(null, function() {
        throw e;
      }), zd();
    }
    var Ak = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & dt)
        try {
          Rl(), t.componentWillUnmount();
        } finally {
          xl(e);
        }
      else
        t.componentWillUnmount();
    };
    function Mb(e, t) {
      try {
        Du(hr, e);
      } catch (a) {
        fn(e, t, a);
      }
    }
    function GS(e, t, a) {
      try {
        Ak(e, a);
      } catch (i) {
        fn(e, t, i);
      }
    }
    function Mk(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        fn(e, t, i);
      }
    }
    function Nb(e, t) {
      try {
        Ub(e);
      } catch (a) {
        fn(e, t, a);
      }
    }
    function Yf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ie && at && e.mode & dt)
              try {
                Rl(), i = a(null);
              } finally {
                xl(e);
              }
            else
              i = a(null);
          } catch (o) {
            fn(e, t, o);
          }
          typeof i == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", St(e));
        } else
          a.current = null;
    }
    function my(e, t, a) {
      try {
        a();
      } catch (i) {
        fn(e, t, i);
      }
    }
    var Lb = !1;
    function Nk(e, t) {
      YR(e.containerInfo), He = t, Lk();
      var a = Lb;
      return Lb = !1, a;
    }
    function Lk() {
      for (; He !== null; ) {
        var e = He, t = e.child;
        (e.subtreeFlags & Bo) !== tt && t !== null ? (t.return = e, He = t) : Uk();
      }
    }
    function Uk() {
      for (; He !== null; ) {
        var e = He;
        qt(e);
        try {
          zk(e);
        } catch (a) {
          fn(e, e.return, a);
        }
        In();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, He = t;
          return;
        }
        He = e.return;
      }
    }
    function zk(e) {
      var t = e.alternate, a = e.flags;
      if ((a & wa) !== tt) {
        switch (qt(e), e.tag) {
          case U:
          case ne:
          case Ke:
            break;
          case j: {
            if (t !== null) {
              var i = t.memoizedProps, o = t.memoizedState, c = e.stateNode;
              e.type === e.elementType && !Ws && (c.props !== e.memoizedProps && y("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", St(e) || "instance"), c.state !== e.memoizedState && y("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", St(e) || "instance"));
              var d = c.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Wi(e.type, i), o);
              {
                var m = Ab;
                d === void 0 && !m.has(e.type) && (m.add(e.type), y("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", St(e)));
              }
              c.__reactInternalSnapshotBeforeUpdate = d;
            }
            break;
          }
          case A: {
            {
              var g = e.stateNode;
              mw(g.containerInfo);
            }
            break;
          }
          case q:
          case ee:
          case z:
          case R:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        In();
      }
    }
    function Gi(e, t, a) {
      var i = t.updateQueue, o = i !== null ? i.lastEffect : null;
      if (o !== null) {
        var c = o.next, d = c;
        do {
          if ((d.tag & e) === e) {
            var m = d.destroy;
            d.destroy = void 0, m !== void 0 && ((e & Lr) !== Ha ? Rh(t) : (e & hr) !== Ha && Za(t), (e & El) !== Ha && dv(!0), my(t, a, m), (e & El) !== Ha && dv(!1), (e & Lr) !== Ha ? Oc() : (e & hr) !== Ha && Wo());
          }
          d = d.next;
        } while (d !== c);
      }
    }
    function Du(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var o = i.next, c = o;
        do {
          if ((c.tag & e) === e) {
            (e & Lr) !== Ha ? fl(t) : (e & hr) !== Ha && wh(t);
            var d = c.create;
            (e & El) !== Ha && dv(!0), c.destroy = d(), (e & El) !== Ha && dv(!1), (e & Lr) !== Ha ? Dc() : (e & hr) !== Ha && ds();
            {
              var m = c.destroy;
              if (m !== void 0 && typeof m != "function") {
                var g = void 0;
                (c.tag & hr) !== tt ? g = "useLayoutEffect" : (c.tag & El) !== tt ? g = "useInsertionEffect" : g = "useEffect";
                var T = void 0;
                m === null ? T = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof m.then == "function" ? T = `

It looks like you wrote ` + g + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + g + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : T = " You returned: " + m, y("%s must not return anything besides a function, which is used for clean-up.%s", g, T);
              }
            }
          }
          c = c.next;
        } while (c !== o);
      }
    }
    function Fk(e, t) {
      if ((t.flags & Et) !== tt)
        switch (t.tag) {
          case _e: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, o = i.id, c = i.onPostCommit, d = K1(), m = t.alternate === null ? "mount" : "update";
            q1() && (m = "nested-update"), typeof c == "function" && c(o, m, a, d);
            var g = t.return;
            e: for (; g !== null; ) {
              switch (g.tag) {
                case A:
                  var T = g.stateNode;
                  T.passiveEffectDuration += a;
                  break e;
                case _e:
                  var x = g.stateNode;
                  x.passiveEffectDuration += a;
                  break e;
              }
              g = g.return;
            }
            break;
          }
        }
    }
    function jk(e, t, a, i) {
      if ((a.flags & Rr) !== tt)
        switch (a.tag) {
          case U:
          case ne:
          case Ke: {
            if (!zr)
              if (a.mode & dt)
                try {
                  Rl(), Du(hr | vr, a);
                } finally {
                  xl(a);
                }
              else
                Du(hr | vr, a);
            break;
          }
          case j: {
            var o = a.stateNode;
            if (a.flags & Et && !zr)
              if (t === null)
                if (a.type === a.elementType && !Ws && (o.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", St(a) || "instance"), o.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", St(a) || "instance")), a.mode & dt)
                  try {
                    Rl(), o.componentDidMount();
                  } finally {
                    xl(a);
                  }
                else
                  o.componentDidMount();
              else {
                var c = a.elementType === a.type ? t.memoizedProps : Wi(a.type, t.memoizedProps), d = t.memoizedState;
                if (a.type === a.elementType && !Ws && (o.props !== a.memoizedProps && y("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", St(a) || "instance"), o.state !== a.memoizedState && y("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", St(a) || "instance")), a.mode & dt)
                  try {
                    Rl(), o.componentDidUpdate(c, d, o.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    xl(a);
                  }
                else
                  o.componentDidUpdate(c, d, o.__reactInternalSnapshotBeforeUpdate);
              }
            var m = a.updateQueue;
            m !== null && (a.type === a.elementType && !Ws && (o.props !== a.memoizedProps && y("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", St(a) || "instance"), o.state !== a.memoizedState && y("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", St(a) || "instance")), C1(a, m, o));
            break;
          }
          case A: {
            var g = a.updateQueue;
            if (g !== null) {
              var T = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case q:
                    T = a.child.stateNode;
                    break;
                  case j:
                    T = a.child.stateNode;
                    break;
                }
              C1(a, g, T);
            }
            break;
          }
          case q: {
            var x = a.stateNode;
            if (t === null && a.flags & Et) {
              var L = a.type, M = a.memoizedProps;
              nw(x, L, M);
            }
            break;
          }
          case ee:
            break;
          case z:
            break;
          case _e: {
            {
              var I = a.memoizedProps, W = I.onCommit, X = I.onRender, we = a.stateNode.effectDuration, nt = K1(), qe = t === null ? "mount" : "update";
              q1() && (qe = "nested-update"), typeof X == "function" && X(a.memoizedProps.id, qe, a.actualDuration, a.treeBaseDuration, a.actualStartTime, nt);
              {
                typeof W == "function" && W(a.memoizedProps.id, qe, we, nt), UD(a);
                var Lt = a.return;
                e: for (; Lt !== null; ) {
                  switch (Lt.tag) {
                    case A:
                      var Ot = Lt.stateNode;
                      Ot.effectDuration += we;
                      break e;
                    case _e:
                      var H = Lt.stateNode;
                      H.effectDuration += we;
                      break e;
                  }
                  Lt = Lt.return;
                }
              }
            }
            break;
          }
          case Q: {
            Wk(e, a);
            break;
          }
          case Ne:
          case R:
          case be:
          case ye:
          case Le:
          case ct:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      zr || a.flags & Ir && Ub(a);
    }
    function Vk(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          if (e.mode & dt)
            try {
              Rl(), Mb(e, e.return);
            } finally {
              xl(e);
            }
          else
            Mb(e, e.return);
          break;
        }
        case j: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Mk(e, e.return, t), Nb(e, e.return);
          break;
        }
        case q: {
          Nb(e, e.return);
          break;
        }
      }
    }
    function Hk(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === q) {
          if (a === null) {
            a = i;
            try {
              var o = i.stateNode;
              t ? dw(o) : vw(i.stateNode, i.memoizedProps);
            } catch (d) {
              fn(e, e.return, d);
            }
          }
        } else if (i.tag === ee) {
          if (a === null)
            try {
              var c = i.stateNode;
              t ? pw(c) : hw(c, i.memoizedProps);
            } catch (d) {
              fn(e, e.return, d);
            }
        } else if (!((i.tag === ye || i.tag === Le) && i.memoizedState !== null && i !== e)) {
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
    function Ub(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case q:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var o;
          if (e.mode & dt)
            try {
              Rl(), o = t(i);
            } finally {
              xl(e);
            }
          else
            o = t(i);
          typeof o == "function" && y("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", St(e));
        } else
          t.hasOwnProperty("current") || y("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", St(e)), t.current = i;
      }
    }
    function Pk(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function zb(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, zb(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === q) {
          var a = e.stateNode;
          a !== null && Qw(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Bk(e) {
      for (var t = e.return; t !== null; ) {
        if (Fb(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Fb(e) {
      return e.tag === q || e.tag === A || e.tag === z;
    }
    function jb(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || Fb(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== q && t.tag !== ee && t.tag !== pe; ) {
          if (t.flags & un || t.child === null || t.tag === z)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & un))
          return t.stateNode;
      }
    }
    function $k(e) {
      var t = Bk(e);
      switch (t.tag) {
        case q: {
          var a = t.stateNode;
          t.flags & Yt && (HE(a), t.flags &= ~Yt);
          var i = jb(e);
          KS(e, i, a);
          break;
        }
        case A:
        case z: {
          var o = t.stateNode.containerInfo, c = jb(e);
          qS(e, c, o);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function qS(e, t, a) {
      var i = e.tag, o = i === q || i === ee;
      if (o) {
        var c = e.stateNode;
        t ? uw(a, c, t) : lw(a, c);
      } else if (i !== z) {
        var d = e.child;
        if (d !== null) {
          qS(d, t, a);
          for (var m = d.sibling; m !== null; )
            qS(m, t, a), m = m.sibling;
        }
      }
    }
    function KS(e, t, a) {
      var i = e.tag, o = i === q || i === ee;
      if (o) {
        var c = e.stateNode;
        t ? ow(a, c, t) : iw(a, c);
      } else if (i !== z) {
        var d = e.child;
        if (d !== null) {
          KS(d, t, a);
          for (var m = d.sibling; m !== null; )
            KS(m, t, a), m = m.sibling;
        }
      }
    }
    var Fr = null, qi = !1;
    function Ik(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case q: {
              Fr = i.stateNode, qi = !1;
              break e;
            }
            case A: {
              Fr = i.stateNode.containerInfo, qi = !0;
              break e;
            }
            case z: {
              Fr = i.stateNode.containerInfo, qi = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Fr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        Vb(e, t, a), Fr = null, qi = !1;
      }
      Pk(a);
    }
    function Ou(e, t, a) {
      for (var i = a.child; i !== null; )
        Vb(e, t, i), i = i.sibling;
    }
    function Vb(e, t, a) {
      switch (Gl(a), a.tag) {
        case q:
          zr || Yf(a, t);
        case ee: {
          {
            var i = Fr, o = qi;
            Fr = null, Ou(e, t, a), Fr = i, qi = o, Fr !== null && (qi ? cw(Fr, a.stateNode) : sw(Fr, a.stateNode));
          }
          return;
        }
        case pe: {
          Fr !== null && (qi ? fw(Fr, a.stateNode) : o0(Fr, a.stateNode));
          return;
        }
        case z: {
          {
            var c = Fr, d = qi;
            Fr = a.stateNode.containerInfo, qi = !0, Ou(e, t, a), Fr = c, qi = d;
          }
          return;
        }
        case U:
        case ne:
        case ot:
        case Ke: {
          if (!zr) {
            var m = a.updateQueue;
            if (m !== null) {
              var g = m.lastEffect;
              if (g !== null) {
                var T = g.next, x = T;
                do {
                  var L = x, M = L.destroy, I = L.tag;
                  M !== void 0 && ((I & El) !== Ha ? my(a, t, M) : (I & hr) !== Ha && (Za(a), a.mode & dt ? (Rl(), my(a, t, M), xl(a)) : my(a, t, M), Wo())), x = x.next;
                } while (x !== T);
              }
            }
          }
          Ou(e, t, a);
          return;
        }
        case j: {
          if (!zr) {
            Yf(a, t);
            var W = a.stateNode;
            typeof W.componentWillUnmount == "function" && GS(a, t, W);
          }
          Ou(e, t, a);
          return;
        }
        case be: {
          Ou(e, t, a);
          return;
        }
        case ye: {
          if (
            // TODO: Remove this dead flag
            a.mode & Ge
          ) {
            var X = zr;
            zr = X || a.memoizedState !== null, Ou(e, t, a), zr = X;
          } else
            Ou(e, t, a);
          break;
        }
        default: {
          Ou(e, t, a);
          return;
        }
      }
    }
    function Yk(e) {
      e.memoizedState;
    }
    function Wk(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var o = i.memoizedState;
          if (o !== null) {
            var c = o.dehydrated;
            c !== null && Ow(c);
          }
        }
      }
    }
    function Hb(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new Dk()), t.forEach(function(i) {
          var o = BD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), da)
              if ($f !== null && If !== null)
                fv(If, $f);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(o, o);
          }
        });
      }
    }
    function Qk(e, t, a) {
      $f = a, If = e, qt(t), Pb(t, e), qt(t), $f = null, If = null;
    }
    function Ki(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var o = 0; o < i.length; o++) {
          var c = i[o];
          try {
            Ik(e, t, c);
          } catch (g) {
            fn(c, t, g);
          }
        }
      var d = ug();
      if (t.subtreeFlags & Qr)
        for (var m = t.child; m !== null; )
          qt(m), Pb(m, e), m = m.sibling;
      qt(d);
    }
    function Pb(e, t, a) {
      var i = e.alternate, o = e.flags;
      switch (e.tag) {
        case U:
        case ne:
        case ot:
        case Ke: {
          if (Ki(t, e), wl(e), o & Et) {
            try {
              Gi(El | vr, e, e.return), Du(El | vr, e);
            } catch (st) {
              fn(e, e.return, st);
            }
            if (e.mode & dt) {
              try {
                Rl(), Gi(hr | vr, e, e.return);
              } catch (st) {
                fn(e, e.return, st);
              }
              xl(e);
            } else
              try {
                Gi(hr | vr, e, e.return);
              } catch (st) {
                fn(e, e.return, st);
              }
          }
          return;
        }
        case j: {
          Ki(t, e), wl(e), o & Ir && i !== null && Yf(i, i.return);
          return;
        }
        case q: {
          Ki(t, e), wl(e), o & Ir && i !== null && Yf(i, i.return);
          {
            if (e.flags & Yt) {
              var c = e.stateNode;
              try {
                HE(c);
              } catch (st) {
                fn(e, e.return, st);
              }
            }
            if (o & Et) {
              var d = e.stateNode;
              if (d != null) {
                var m = e.memoizedProps, g = i !== null ? i.memoizedProps : m, T = e.type, x = e.updateQueue;
                if (e.updateQueue = null, x !== null)
                  try {
                    rw(d, x, T, g, m, e);
                  } catch (st) {
                    fn(e, e.return, st);
                  }
              }
            }
          }
          return;
        }
        case ee: {
          if (Ki(t, e), wl(e), o & Et) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var L = e.stateNode, M = e.memoizedProps, I = i !== null ? i.memoizedProps : M;
            try {
              aw(L, I, M);
            } catch (st) {
              fn(e, e.return, st);
            }
          }
          return;
        }
        case A: {
          if (Ki(t, e), wl(e), o & Et && i !== null) {
            var W = i.memoizedState;
            if (W.isDehydrated)
              try {
                Dw(t.containerInfo);
              } catch (st) {
                fn(e, e.return, st);
              }
          }
          return;
        }
        case z: {
          Ki(t, e), wl(e);
          return;
        }
        case Q: {
          Ki(t, e), wl(e);
          var X = e.child;
          if (X.flags & ul) {
            var we = X.stateNode, nt = X.memoizedState, qe = nt !== null;
            if (we.isHidden = qe, qe) {
              var Lt = X.alternate !== null && X.alternate.memoizedState !== null;
              Lt || _D();
            }
          }
          if (o & Et) {
            try {
              Yk(e);
            } catch (st) {
              fn(e, e.return, st);
            }
            Hb(e);
          }
          return;
        }
        case ye: {
          var Ot = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Ge
          ) {
            var H = zr;
            zr = H || Ot, Ki(t, e), zr = H;
          } else
            Ki(t, e);
          if (wl(e), o & ul) {
            var J = e.stateNode, P = e.memoizedState, fe = P !== null, Me = e;
            if (J.isHidden = fe, fe && !Ot && (Me.mode & Ge) !== Ye) {
              He = Me;
              for (var ke = Me.child; ke !== null; )
                He = ke, qk(ke), ke = ke.sibling;
            }
            Hk(Me, fe);
          }
          return;
        }
        case Ne: {
          Ki(t, e), wl(e), o & Et && Hb(e);
          return;
        }
        case be:
          return;
        default: {
          Ki(t, e), wl(e);
          return;
        }
      }
    }
    function wl(e) {
      var t = e.flags;
      if (t & un) {
        try {
          $k(e);
        } catch (a) {
          fn(e, e.return, a);
        }
        e.flags &= ~un;
      }
      t & _a && (e.flags &= ~_a);
    }
    function Gk(e, t, a) {
      $f = a, If = t, He = e, Bb(e, t, a), $f = null, If = null;
    }
    function Bb(e, t, a) {
      for (var i = (e.mode & Ge) !== Ye; He !== null; ) {
        var o = He, c = o.child;
        if (o.tag === ye && i) {
          var d = o.memoizedState !== null, m = d || hy;
          if (m) {
            XS(e, t, a);
            continue;
          } else {
            var g = o.alternate, T = g !== null && g.memoizedState !== null, x = T || zr, L = hy, M = zr;
            hy = m, zr = x, zr && !M && (He = o, Kk(o));
            for (var I = c; I !== null; )
              He = I, Bb(
                I,
                // New root; bubble back up to here and stop.
                t,
                a
              ), I = I.sibling;
            He = o, hy = L, zr = M, XS(e, t, a);
            continue;
          }
        }
        (o.subtreeFlags & Rr) !== tt && c !== null ? (c.return = o, He = c) : XS(e, t, a);
      }
    }
    function XS(e, t, a) {
      for (; He !== null; ) {
        var i = He;
        if ((i.flags & Rr) !== tt) {
          var o = i.alternate;
          qt(i);
          try {
            jk(t, o, i, a);
          } catch (d) {
            fn(i, i.return, d);
          }
          In();
        }
        if (i === e) {
          He = null;
          return;
        }
        var c = i.sibling;
        if (c !== null) {
          c.return = i.return, He = c;
          return;
        }
        He = i.return;
      }
    }
    function qk(e) {
      for (; He !== null; ) {
        var t = He, a = t.child;
        switch (t.tag) {
          case U:
          case ne:
          case ot:
          case Ke: {
            if (t.mode & dt)
              try {
                Rl(), Gi(hr, t, t.return);
              } finally {
                xl(t);
              }
            else
              Gi(hr, t, t.return);
            break;
          }
          case j: {
            Yf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && GS(t, t.return, i);
            break;
          }
          case q: {
            Yf(t, t.return);
            break;
          }
          case ye: {
            var o = t.memoizedState !== null;
            if (o) {
              $b(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, He = a) : $b(e);
      }
    }
    function $b(e) {
      for (; He !== null; ) {
        var t = He;
        if (t === e) {
          He = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, He = a;
          return;
        }
        He = t.return;
      }
    }
    function Kk(e) {
      for (; He !== null; ) {
        var t = He, a = t.child;
        if (t.tag === ye) {
          var i = t.memoizedState !== null;
          if (i) {
            Ib(e);
            continue;
          }
        }
        a !== null ? (a.return = t, He = a) : Ib(e);
      }
    }
    function Ib(e) {
      for (; He !== null; ) {
        var t = He;
        qt(t);
        try {
          Vk(t);
        } catch (i) {
          fn(t, t.return, i);
        }
        if (In(), t === e) {
          He = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, He = a;
          return;
        }
        He = t.return;
      }
    }
    function Xk(e, t, a, i) {
      He = t, Jk(t, e, a, i);
    }
    function Jk(e, t, a, i) {
      for (; He !== null; ) {
        var o = He, c = o.child;
        (o.subtreeFlags & ka) !== tt && c !== null ? (c.return = o, He = c) : Zk(e, t, a, i);
      }
    }
    function Zk(e, t, a, i) {
      for (; He !== null; ) {
        var o = He;
        if ((o.flags & hn) !== tt) {
          qt(o);
          try {
            eD(t, o, a, i);
          } catch (d) {
            fn(o, o.return, d);
          }
          In();
        }
        if (o === e) {
          He = null;
          return;
        }
        var c = o.sibling;
        if (c !== null) {
          c.return = o.return, He = c;
          return;
        }
        He = o.return;
      }
    }
    function eD(e, t, a, i) {
      switch (t.tag) {
        case U:
        case ne:
        case Ke: {
          if (t.mode & dt) {
            mS();
            try {
              Du(Lr | vr, t);
            } finally {
              hS(t);
            }
          } else
            Du(Lr | vr, t);
          break;
        }
      }
    }
    function tD(e) {
      He = e, nD();
    }
    function nD() {
      for (; He !== null; ) {
        var e = He, t = e.child;
        if ((He.flags & Bt) !== tt) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var o = a[i];
              He = o, iD(o, e);
            }
            {
              var c = e.alternate;
              if (c !== null) {
                var d = c.child;
                if (d !== null) {
                  c.child = null;
                  do {
                    var m = d.sibling;
                    d.sibling = null, d = m;
                  } while (d !== null);
                }
              }
            }
            He = e;
          }
        }
        (e.subtreeFlags & ka) !== tt && t !== null ? (t.return = e, He = t) : rD();
      }
    }
    function rD() {
      for (; He !== null; ) {
        var e = He;
        (e.flags & hn) !== tt && (qt(e), aD(e), In());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, He = t;
          return;
        }
        He = e.return;
      }
    }
    function aD(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          e.mode & dt ? (mS(), Gi(Lr | vr, e, e.return), hS(e)) : Gi(Lr | vr, e, e.return);
          break;
        }
      }
    }
    function iD(e, t) {
      for (; He !== null; ) {
        var a = He;
        qt(a), oD(a, t), In();
        var i = a.child;
        i !== null ? (i.return = a, He = i) : lD(e);
      }
    }
    function lD(e) {
      for (; He !== null; ) {
        var t = He, a = t.sibling, i = t.return;
        if (zb(t), t === e) {
          He = null;
          return;
        }
        if (a !== null) {
          a.return = i, He = a;
          return;
        }
        He = i;
      }
    }
    function oD(e, t) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          e.mode & dt ? (mS(), Gi(Lr, e, t), hS(e)) : Gi(Lr, e, t);
          break;
        }
      }
    }
    function uD(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          try {
            Du(hr | vr, e);
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
        case j: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
      }
    }
    function sD(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          try {
            Du(Lr | vr, e);
          } catch (t) {
            fn(e, e.return, t);
          }
          break;
        }
      }
    }
    function cD(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke: {
          try {
            Gi(hr | vr, e, e.return);
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
        case j: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && GS(e, e.return, t);
          break;
        }
      }
    }
    function fD(e) {
      switch (e.tag) {
        case U:
        case ne:
        case Ke:
          try {
            Gi(Lr | vr, e, e.return);
          } catch (t) {
            fn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var ev = Symbol.for;
      ev("selector.component"), ev("selector.has_pseudo_class"), ev("selector.role"), ev("selector.test_id"), ev("selector.text");
    }
    var dD = [];
    function pD() {
      dD.forEach(function(e) {
        return e();
      });
    }
    var vD = p.ReactCurrentActQueue;
    function hD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Yb() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && vD.current !== null && y("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var mD = Math.ceil, JS = p.ReactCurrentDispatcher, ZS = p.ReactCurrentOwner, jr = p.ReactCurrentBatchConfig, Xi = p.ReactCurrentActQueue, gr = (
      /*             */
      0
    ), Wb = (
      /*               */
      1
    ), Vr = (
      /*                */
      2
    ), Ei = (
      /*                */
      4
    ), yo = 0, tv = 1, Qs = 2, yy = 3, nv = 4, Qb = 5, eC = 6, Nt = gr, ma = null, Ln = null, Sr = ae, _l = ae, tC = Cu(ae), Cr = yo, rv = null, gy = ae, av = ae, Sy = ae, iv = null, Pa = null, nC = 0, Gb = 500, qb = 1 / 0, yD = 500, go = null;
    function lv() {
      qb = Sn() + yD;
    }
    function Kb() {
      return qb;
    }
    var Cy = !1, rC = null, Wf = null, Gs = !1, Au = null, ov = ae, aC = [], iC = null, gD = 50, uv = 0, lC = null, oC = !1, Ey = !1, SD = 50, Qf = 0, by = null, sv = ln, Ty = ae, Xb = !1;
    function xy() {
      return ma;
    }
    function ya() {
      return (Nt & (Vr | Ei)) !== gr ? Sn() : (sv !== ln || (sv = Sn()), sv);
    }
    function Mu(e) {
      var t = e.mode;
      if ((t & Ge) === Ye)
        return Ze;
      if ((Nt & Vr) !== gr && Sr !== ae)
        return tu(Sr);
      var a = v_() !== p_;
      if (a) {
        if (jr.transition !== null) {
          var i = jr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Ty === jn && (Ty = zh()), Ty;
      }
      var o = Na();
      if (o !== jn)
        return o;
      var c = JR();
      return c;
    }
    function CD(e) {
      var t = e.mode;
      return (t & Ge) === Ye ? Ze : Xr();
    }
    function Er(e, t, a, i) {
      ID(), Xb && y("useInsertionEffect must not schedule updates."), oC && (Ey = !0), no(e, a, i), (Nt & Vr) !== ae && e === ma ? QD(t) : (da && Zc(e, t, a), GD(t), e === ma && ((Nt & Vr) === gr && (av = Ct(av, a)), Cr === nv && Nu(e, Sr)), Ba(e, i), a === Ze && Nt === gr && (t.mode & Ge) === Ye && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Xi.isBatchingLegacy && (lv(), XE()));
    }
    function ED(e, t, a) {
      var i = e.current;
      i.lanes = t, no(e, t, a), Ba(e, a);
    }
    function bD(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Nt & Vr) !== gr
      );
    }
    function Ba(e, t) {
      var a = e.callbackNode;
      Ah(e, t);
      var i = eo(e, e === ma ? Sr : ae);
      if (i === ae) {
        a !== null && pT(a), e.callbackNode = null, e.callbackPriority = jn;
        return;
      }
      var o = An(i), c = e.callbackPriority;
      if (c === o && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Xi.current !== null && a !== vC)) {
        a == null && c !== Ze && y("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && pT(a);
      var d;
      if (o === Ze)
        e.tag === Eu ? (Xi.isBatchingLegacy !== null && (Xi.didScheduleLegacyUpdate = !0), Kw(eT.bind(null, e))) : KE(eT.bind(null, e)), Xi.current !== null ? Xi.current.push(bu) : ew(function() {
          (Nt & (Vr | Ei)) === gr && bu();
        }), d = null;
      else {
        var m;
        switch (pr(i)) {
          case Mn:
            m = wc;
            break;
          case Fi:
            m = Ql;
            break;
          case di:
            m = fi;
            break;
          case nu:
            m = _c;
            break;
          default:
            m = fi;
            break;
        }
        d = hC(m, Jb.bind(null, e));
      }
      e.callbackPriority = o, e.callbackNode = d;
    }
    function Jb(e, t) {
      if (H_(), sv = ln, Ty = ae, (Nt & (Vr | Ei)) !== gr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Co();
      if (i && e.callbackNode !== a)
        return null;
      var o = eo(e, e === ma ? Sr : ae);
      if (o === ae)
        return null;
      var c = !Cs(e, o) && !Uh(e, o) && !t, d = c ? MD(e, o) : wy(e, o);
      if (d !== yo) {
        if (d === Qs) {
          var m = pl(e);
          m !== ae && (o = m, d = uC(e, m));
        }
        if (d === tv) {
          var g = rv;
          throw qs(e, ae), Nu(e, o), Ba(e, Sn()), g;
        }
        if (d === eC)
          Nu(e, o);
        else {
          var T = !Cs(e, o), x = e.current.alternate;
          if (T && !xD(x)) {
            if (d = wy(e, o), d === Qs) {
              var L = pl(e);
              L !== ae && (o = L, d = uC(e, L));
            }
            if (d === tv) {
              var M = rv;
              throw qs(e, ae), Nu(e, o), Ba(e, Sn()), M;
            }
          }
          e.finishedWork = x, e.finishedLanes = o, TD(e, d, o);
        }
      }
      return Ba(e, Sn()), e.callbackNode === a ? Jb.bind(null, e) : null;
    }
    function uC(e, t) {
      var a = iv;
      if (ef(e)) {
        var i = qs(e, t);
        i.flags |= Tn, $w(e.containerInfo);
      }
      var o = wy(e, t);
      if (o !== Qs) {
        var c = Pa;
        Pa = a, c !== null && Zb(c);
      }
      return o;
    }
    function Zb(e) {
      Pa === null ? Pa = e : Pa.push.apply(Pa, e);
    }
    function TD(e, t, a) {
      switch (t) {
        case yo:
        case tv:
          throw new Error("Root did not complete. This is a bug in React.");
        case Qs: {
          Ks(e, Pa, go);
          break;
        }
        case yy: {
          if (Nu(e, a), Mh(a) && // do not delay if we're inside an act() scope
          !vT()) {
            var i = nC + Gb - Sn();
            if (i > 10) {
              var o = eo(e, ae);
              if (o !== ae)
                break;
              var c = e.suspendedLanes;
              if (!to(c, a)) {
                ya(), Xc(e, c);
                break;
              }
              e.timeoutHandle = i0(Ks.bind(null, e, Pa, go), i);
              break;
            }
          }
          Ks(e, Pa, go);
          break;
        }
        case nv: {
          if (Nu(e, a), Lh(a))
            break;
          if (!vT()) {
            var d = Dh(e, a), m = d, g = Sn() - m, T = $D(g) - g;
            if (T > 10) {
              e.timeoutHandle = i0(Ks.bind(null, e, Pa, go), T);
              break;
            }
          }
          Ks(e, Pa, go);
          break;
        }
        case Qb: {
          Ks(e, Pa, go);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function xD(e) {
      for (var t = e; ; ) {
        if (t.flags & cs) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var o = 0; o < i.length; o++) {
                var c = i[o], d = c.getSnapshot, m = c.value;
                try {
                  if (!Ve(d(), m))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var g = t.child;
        if (t.subtreeFlags & cs && g !== null) {
          g.return = t, t = g;
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
    function Nu(e, t) {
      t = Es(t, Sy), t = Es(t, av), jh(e, t);
    }
    function eT(e) {
      if (P_(), (Nt & (Vr | Ei)) !== gr)
        throw new Error("Should not already be working.");
      Co();
      var t = eo(e, ae);
      if (!Jr(t, Ze))
        return Ba(e, Sn()), null;
      var a = wy(e, t);
      if (e.tag !== Eu && a === Qs) {
        var i = pl(e);
        i !== ae && (t = i, a = uC(e, i));
      }
      if (a === tv) {
        var o = rv;
        throw qs(e, ae), Nu(e, t), Ba(e, Sn()), o;
      }
      if (a === eC)
        throw new Error("Root did not complete. This is a bug in React.");
      var c = e.current.alternate;
      return e.finishedWork = c, e.finishedLanes = t, Ks(e, Pa, go), Ba(e, Sn()), null;
    }
    function RD(e, t) {
      t !== ae && (Zd(e, Ct(t, Ze)), Ba(e, Sn()), (Nt & (Vr | Ei)) === gr && (lv(), bu()));
    }
    function sC(e, t) {
      var a = Nt;
      Nt |= Wb;
      try {
        return e(t);
      } finally {
        Nt = a, Nt === gr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Xi.isBatchingLegacy && (lv(), XE());
      }
    }
    function wD(e, t, a, i, o) {
      var c = Na(), d = jr.transition;
      try {
        return jr.transition = null, xn(Mn), e(t, a, i, o);
      } finally {
        xn(c), jr.transition = d, Nt === gr && lv();
      }
    }
    function So(e) {
      Au !== null && Au.tag === Eu && (Nt & (Vr | Ei)) === gr && Co();
      var t = Nt;
      Nt |= Wb;
      var a = jr.transition, i = Na();
      try {
        return jr.transition = null, xn(Mn), e ? e() : void 0;
      } finally {
        xn(i), jr.transition = a, Nt = t, (Nt & (Vr | Ei)) === gr && bu();
      }
    }
    function tT() {
      return (Nt & (Vr | Ei)) !== gr;
    }
    function Ry(e, t) {
      ta(tC, _l, e), _l = Ct(_l, t);
    }
    function cC(e) {
      _l = tC.current, ea(tC, e);
    }
    function qs(e, t) {
      e.finishedWork = null, e.finishedLanes = ae;
      var a = e.timeoutHandle;
      if (a !== l0 && (e.timeoutHandle = l0, ZR(a)), Ln !== null)
        for (var i = Ln.return; i !== null; ) {
          var o = i.alternate;
          Ob(o, i), i = i.return;
        }
      ma = e;
      var c = Xs(e.current, null);
      return Ln = c, Sr = _l = t, Cr = yo, rv = null, gy = ae, av = ae, Sy = ae, iv = null, Pa = null, E_(), $i.discardPendingWarnings(), c;
    }
    function nT(e, t) {
      do {
        var a = Ln;
        try {
          if (Um(), w1(), In(), ZS.current = null, a === null || a.return === null) {
            Cr = tv, rv = t, Ln = null;
            return;
          }
          if (Ie && a.mode & dt && cy(a, !0), ht)
            if (qr(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              ql(a, i, Sr);
            } else
              ps(a, t, Sr);
          K_(e, a.return, a, t, Sr), lT(a);
        } catch (o) {
          t = o, Ln === a && a !== null ? (a = a.return, Ln = a) : a = Ln;
          continue;
        }
        return;
      } while (!0);
    }
    function rT() {
      var e = JS.current;
      return JS.current = iy, e === null ? iy : e;
    }
    function aT(e) {
      JS.current = e;
    }
    function _D() {
      nC = Sn();
    }
    function cv(e) {
      gy = Ct(e, gy);
    }
    function kD() {
      Cr === yo && (Cr = yy);
    }
    function fC() {
      (Cr === yo || Cr === yy || Cr === Qs) && (Cr = nv), ma !== null && (Ss(gy) || Ss(av)) && Nu(ma, Sr);
    }
    function DD(e) {
      Cr !== nv && (Cr = Qs), iv === null ? iv = [e] : iv.push(e);
    }
    function OD() {
      return Cr === yo;
    }
    function wy(e, t) {
      var a = Nt;
      Nt |= Vr;
      var i = rT();
      if (ma !== e || Sr !== t) {
        if (da) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (fv(e, Sr), o.clear()), ep(e, t);
        }
        go = Ts(), qs(e, t);
      }
      mn(t);
      do
        try {
          AD();
          break;
        } catch (c) {
          nT(e, c);
        }
      while (!0);
      if (Um(), Nt = a, aT(i), Ln !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Mc(), ma = null, Sr = ae, Cr;
    }
    function AD() {
      for (; Ln !== null; )
        iT(Ln);
    }
    function MD(e, t) {
      var a = Nt;
      Nt |= Vr;
      var i = rT();
      if (ma !== e || Sr !== t) {
        if (da) {
          var o = e.memoizedUpdaters;
          o.size > 0 && (fv(e, Sr), o.clear()), ep(e, t);
        }
        go = Ts(), lv(), qs(e, t);
      }
      mn(t);
      do
        try {
          ND();
          break;
        } catch (c) {
          nT(e, c);
        }
      while (!0);
      return Um(), aT(i), Nt = a, Ln !== null ? (Ac(), yo) : (Mc(), ma = null, Sr = ae, Cr);
    }
    function ND() {
      for (; Ln !== null && !Rc(); )
        iT(Ln);
    }
    function iT(e) {
      var t = e.alternate;
      qt(e);
      var a;
      (e.mode & dt) !== Ye ? (vS(e), a = dC(t, e, _l), cy(e, !0)) : a = dC(t, e, _l), In(), e.memoizedProps = e.pendingProps, a === null ? lT(e) : Ln = a, ZS.current = null;
    }
    function lT(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & sa) === tt) {
          qt(t);
          var o = void 0;
          if ((t.mode & dt) === Ye ? o = Db(a, t, _l) : (vS(t), o = Db(a, t, _l), cy(t, !1)), In(), o !== null) {
            Ln = o;
            return;
          }
        } else {
          var c = kk(a, t);
          if (c !== null) {
            c.flags &= gh, Ln = c;
            return;
          }
          if ((t.mode & dt) !== Ye) {
            cy(t, !1);
            for (var d = t.actualDuration, m = t.child; m !== null; )
              d += m.actualDuration, m = m.sibling;
            t.actualDuration = d;
          }
          if (i !== null)
            i.flags |= sa, i.subtreeFlags = tt, i.deletions = null;
          else {
            Cr = eC, Ln = null;
            return;
          }
        }
        var g = t.sibling;
        if (g !== null) {
          Ln = g;
          return;
        }
        t = i, Ln = t;
      } while (t !== null);
      Cr === yo && (Cr = Qb);
    }
    function Ks(e, t, a) {
      var i = Na(), o = jr.transition;
      try {
        jr.transition = null, xn(Mn), LD(e, t, a, i);
      } finally {
        jr.transition = o, xn(i);
      }
      return null;
    }
    function LD(e, t, a, i) {
      do
        Co();
      while (Au !== null);
      if (YD(), (Nt & (Vr | Ei)) !== gr)
        throw new Error("Should not already be working.");
      var o = e.finishedWork, c = e.finishedLanes;
      if (cl(c), o === null)
        return kc(), null;
      if (c === ae && y("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = ae, o === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = jn;
      var d = Ct(o.lanes, o.childLanes);
      Jc(e, d), e === ma && (ma = null, Ln = null, Sr = ae), ((o.subtreeFlags & ka) !== tt || (o.flags & ka) !== tt) && (Gs || (Gs = !0, iC = a, hC(fi, function() {
        return Co(), null;
      })));
      var m = (o.subtreeFlags & (Bo | Qr | Rr | ka)) !== tt, g = (o.flags & (Bo | Qr | Rr | ka)) !== tt;
      if (m || g) {
        var T = jr.transition;
        jr.transition = null;
        var x = Na();
        xn(Mn);
        var L = Nt;
        Nt |= Ei, ZS.current = null, Nk(e, o), X1(), Qk(e, o, c), WR(e.containerInfo), e.current = o, Yd(c), Gk(o, e, c), Qo(), Eh(), Nt = L, xn(x), jr.transition = T;
      } else
        e.current = o, X1();
      var M = Gs;
      if (Gs ? (Gs = !1, Au = e, ov = c) : (Qf = 0, by = null), d = e.pendingLanes, d === ae && (Wf = null), M || cT(e.current, !1), Io(o.stateNode, i), da && e.memoizedUpdaters.clear(), pD(), Ba(e, Sn()), t !== null)
        for (var I = e.onRecoverableError, W = 0; W < t.length; W++) {
          var X = t[W], we = X.stack, nt = X.digest;
          I(X.value, {
            componentStack: we,
            digest: nt
          });
        }
      if (Cy) {
        Cy = !1;
        var qe = rC;
        throw rC = null, qe;
      }
      return Jr(ov, Ze) && e.tag !== Eu && Co(), d = e.pendingLanes, Jr(d, Ze) ? (V_(), e === lC ? uv++ : (uv = 0, lC = e)) : uv = 0, bu(), kc(), null;
    }
    function Co() {
      if (Au !== null) {
        var e = pr(ov), t = Og(di, e), a = jr.transition, i = Na();
        try {
          return jr.transition = null, xn(t), zD();
        } finally {
          xn(i), jr.transition = a;
        }
      }
      return !1;
    }
    function UD(e) {
      aC.push(e), Gs || (Gs = !0, hC(fi, function() {
        return Co(), null;
      }));
    }
    function zD() {
      if (Au === null)
        return !1;
      var e = iC;
      iC = null;
      var t = Au, a = ov;
      if (Au = null, ov = ae, (Nt & (Vr | Ei)) !== gr)
        throw new Error("Cannot flush passive effects while already rendering.");
      oC = !0, Ey = !1, _h(a);
      var i = Nt;
      Nt |= Ei, tD(t.current), Xk(t, t.current, a, e);
      {
        var o = aC;
        aC = [];
        for (var c = 0; c < o.length; c++) {
          var d = o[c];
          Fk(t, d);
        }
      }
      Wd(), cT(t.current, !0), Nt = i, bu(), Ey ? t === by ? Qf++ : (Qf = 0, by = t) : Qf = 0, oC = !1, Ey = !1, Aa(t);
      {
        var m = t.current.stateNode;
        m.effectDuration = 0, m.passiveEffectDuration = 0;
      }
      return !0;
    }
    function oT(e) {
      return Wf !== null && Wf.has(e);
    }
    function FD(e) {
      Wf === null ? Wf = /* @__PURE__ */ new Set([e]) : Wf.add(e);
    }
    function jD(e) {
      Cy || (Cy = !0, rC = e);
    }
    var VD = jD;
    function uT(e, t, a) {
      var i = Ys(a, t), o = ib(e, i, Ze), c = xu(e, o, Ze), d = ya();
      c !== null && (no(c, Ze, d), Ba(c, d));
    }
    function fn(e, t, a) {
      if (Ok(a), dv(!1), e.tag === A) {
        uT(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === A) {
          uT(i, e, a);
          return;
        } else if (i.tag === j) {
          var o = i.type, c = i.stateNode;
          if (typeof o.getDerivedStateFromError == "function" || typeof c.componentDidCatch == "function" && !oT(c)) {
            var d = Ys(a, e), m = MS(i, d, Ze), g = xu(i, m, Ze), T = ya();
            g !== null && (no(g, Ze, T), Ba(g, T));
            return;
          }
        }
        i = i.return;
      }
      y(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function HD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var o = ya();
      Xc(e, a), qD(e), ma === e && to(Sr, a) && (Cr === nv || Cr === yy && Mh(Sr) && Sn() - nC < Gb ? qs(e, ae) : Sy = Ct(Sy, a)), Ba(e, o);
    }
    function sT(e, t) {
      t === jn && (t = CD(e));
      var a = ya(), i = Va(e, t);
      i !== null && (no(i, t, a), Ba(i, a));
    }
    function PD(e) {
      var t = e.memoizedState, a = jn;
      t !== null && (a = t.retryLane), sT(e, a);
    }
    function BD(e, t) {
      var a = jn, i;
      switch (e.tag) {
        case Q:
          i = e.stateNode;
          var o = e.memoizedState;
          o !== null && (a = o.retryLane);
          break;
        case Ne:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), sT(e, a);
    }
    function $D(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : mD(e / 1960) * 1960;
    }
    function ID() {
      if (uv > gD)
        throw uv = 0, lC = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Qf > SD && (Qf = 0, by = null, y("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function YD() {
      $i.flushLegacyContextWarning(), $i.flushPendingUnsafeLifecycleWarnings();
    }
    function cT(e, t) {
      qt(e), _y(e, Wr, cD), t && _y(e, Wl, fD), _y(e, Wr, uD), t && _y(e, Wl, sD), In();
    }
    function _y(e, t, a) {
      for (var i = e, o = null; i !== null; ) {
        var c = i.subtreeFlags & t;
        i !== o && i.child !== null && c !== tt ? i = i.child : ((i.flags & t) !== tt && a(i), i.sibling !== null ? i = i.sibling : i = o = i.return);
      }
    }
    var ky = null;
    function fT(e) {
      {
        if ((Nt & Vr) !== gr || !(e.mode & Ge))
          return;
        var t = e.tag;
        if (t !== G && t !== A && t !== j && t !== U && t !== ne && t !== ot && t !== Ke)
          return;
        var a = St(e) || "ReactComponent";
        if (ky !== null) {
          if (ky.has(a))
            return;
          ky.add(a);
        } else
          ky = /* @__PURE__ */ new Set([a]);
        var i = Un;
        try {
          qt(e), y("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? qt(e) : In();
        }
      }
    }
    var dC;
    {
      var WD = null;
      dC = function(e, t, a) {
        var i = ST(WD, t);
        try {
          return xb(e, t, a);
        } catch (c) {
          if (a_() || c !== null && typeof c == "object" && typeof c.then == "function")
            throw c;
          if (Um(), w1(), Ob(e, t), ST(t, i), t.mode & dt && vS(t), Yl(null, xb, null, e, t, a), Rg()) {
            var o = zd();
            typeof o == "object" && o !== null && o._suppressLogging && typeof c == "object" && c !== null && !c._suppressLogging && (c._suppressLogging = !0);
          }
          throw c;
        }
      };
    }
    var dT = !1, pC;
    pC = /* @__PURE__ */ new Set();
    function QD(e) {
      if (ba && !z_())
        switch (e.tag) {
          case U:
          case ne:
          case Ke: {
            var t = Ln && St(Ln) || "Unknown", a = t;
            if (!pC.has(a)) {
              pC.add(a);
              var i = St(e) || "Unknown";
              y("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case j: {
            dT || (y("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), dT = !0);
            break;
          }
        }
    }
    function fv(e, t) {
      if (da) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Zc(e, i, t);
        });
      }
    }
    var vC = {};
    function hC(e, t) {
      {
        var a = Xi.current;
        return a !== null ? (a.push(t), vC) : xc(e, t);
      }
    }
    function pT(e) {
      if (e !== vC)
        return Ch(e);
    }
    function vT() {
      return Xi.current !== null;
    }
    function GD(e) {
      {
        if (e.mode & Ge) {
          if (!Yb())
            return;
        } else if (!hD() || Nt !== gr || e.tag !== U && e.tag !== ne && e.tag !== Ke)
          return;
        if (Xi.current === null) {
          var t = Un;
          try {
            qt(e), y(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, St(e));
          } finally {
            t ? qt(e) : In();
          }
        }
      }
    }
    function qD(e) {
      e.tag !== Eu && Yb() && Xi.current === null && y(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function dv(e) {
      Xb = e;
    }
    var bi = null, Gf = null, KD = function(e) {
      bi = e;
    };
    function qf(e) {
      {
        if (bi === null)
          return e;
        var t = bi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function mC(e) {
      return qf(e);
    }
    function yC(e) {
      {
        if (bi === null)
          return e;
        var t = bi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = qf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: Te,
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
    function hT(e, t) {
      {
        if (bi === null)
          return !1;
        var a = e.elementType, i = t.type, o = !1, c = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case j: {
            typeof i == "function" && (o = !0);
            break;
          }
          case U: {
            (typeof i == "function" || c === ut) && (o = !0);
            break;
          }
          case ne: {
            (c === Te || c === ut) && (o = !0);
            break;
          }
          case ot:
          case Ke: {
            (c === Ut || c === ut) && (o = !0);
            break;
          }
          default:
            return !1;
        }
        if (o) {
          var d = bi(a);
          if (d !== void 0 && d === bi(i))
            return !0;
        }
        return !1;
      }
    }
    function mT(e) {
      {
        if (bi === null || typeof WeakSet != "function")
          return;
        Gf === null && (Gf = /* @__PURE__ */ new WeakSet()), Gf.add(e);
      }
    }
    var XD = function(e, t) {
      {
        if (bi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Co(), So(function() {
          gC(e.current, i, a);
        });
      }
    }, JD = function(e, t) {
      {
        if (e.context !== ei)
          return;
        Co(), So(function() {
          pv(t, e, null, null);
        });
      }
    };
    function gC(e, t, a) {
      {
        var i = e.alternate, o = e.child, c = e.sibling, d = e.tag, m = e.type, g = null;
        switch (d) {
          case U:
          case Ke:
          case j:
            g = m;
            break;
          case ne:
            g = m.render;
            break;
        }
        if (bi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var T = !1, x = !1;
        if (g !== null) {
          var L = bi(g);
          L !== void 0 && (a.has(L) ? x = !0 : t.has(L) && (d === j ? x = !0 : T = !0));
        }
        if (Gf !== null && (Gf.has(e) || i !== null && Gf.has(i)) && (x = !0), x && (e._debugNeedsRemount = !0), x || T) {
          var M = Va(e, Ze);
          M !== null && Er(M, e, Ze, ln);
        }
        o !== null && !x && gC(o, t, a), c !== null && gC(c, t, a);
      }
    }
    var ZD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(o) {
          return o.current;
        }));
        return SC(e.current, i, a), a;
      }
    };
    function SC(e, t, a) {
      {
        var i = e.child, o = e.sibling, c = e.tag, d = e.type, m = null;
        switch (c) {
          case U:
          case Ke:
          case j:
            m = d;
            break;
          case ne:
            m = d.render;
            break;
        }
        var g = !1;
        m !== null && t.has(m) && (g = !0), g ? eO(e, a) : i !== null && SC(i, t, a), o !== null && SC(o, t, a);
      }
    }
    function eO(e, t) {
      {
        var a = tO(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case q:
              t.add(i.stateNode);
              return;
            case z:
              t.add(i.stateNode.containerInfo);
              return;
            case A:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function tO(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === q)
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
    var CC;
    {
      CC = !1;
      try {
        var yT = Object.preventExtensions({});
      } catch {
        CC = !0;
      }
    }
    function nO(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = tt, this.subtreeFlags = tt, this.deletions = null, this.lanes = ae, this.childLanes = ae, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !CC && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var ti = function(e, t, a, i) {
      return new nO(e, t, a, i);
    };
    function EC(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function rO(e) {
      return typeof e == "function" && !EC(e) && e.defaultProps === void 0;
    }
    function aO(e) {
      if (typeof e == "function")
        return EC(e) ? j : U;
      if (e != null) {
        var t = e.$$typeof;
        if (t === Te)
          return ne;
        if (t === Ut)
          return ot;
      }
      return G;
    }
    function Xs(e, t) {
      var a = e.alternate;
      a === null ? (a = ti(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = tt, a.subtreeFlags = tt, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & fr, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case G:
        case U:
        case Ke:
          a.type = qf(e.type);
          break;
        case j:
          a.type = mC(e.type);
          break;
        case ne:
          a.type = yC(e.type);
          break;
      }
      return a;
    }
    function iO(e, t) {
      e.flags &= fr | un;
      var a = e.alternate;
      if (a === null)
        e.childLanes = ae, e.lanes = t, e.child = null, e.subtreeFlags = tt, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = tt, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function lO(e, t, a) {
      var i;
      return e === Rm ? (i = Ge, t === !0 && (i |= kt, i |= pa)) : i = Ye, da && (i |= dt), ti(A, null, null, i);
    }
    function bC(e, t, a, i, o, c) {
      var d = G, m = e;
      if (typeof e == "function")
        EC(e) ? (d = j, m = mC(m)) : m = qf(m);
      else if (typeof e == "string")
        d = q;
      else
        e: switch (e) {
          case Wa:
            return Lu(a.children, o, c, t);
          case Zi:
            d = de, o |= kt, (o & Ge) !== Ye && (o |= pa);
            break;
          case Ul:
            return oO(a, o, c, t);
          case Je:
            return uO(a, o, c, t);
          case Mt:
            return sO(a, o, c, t);
          case on:
            return gT(a, o, c, t);
          case gn:
          case wt:
          case Br:
          case el:
          case tr:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case _:
                  d = ge;
                  break e;
                case oe:
                  d = Ue;
                  break e;
                case Te:
                  d = ne, m = yC(m);
                  break e;
                case Ut:
                  d = ot;
                  break e;
                case ut:
                  d = xt, m = null;
                  break e;
              }
            var g = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (g += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var T = i ? St(i) : null;
              T && (g += `

Check the render method of \`` + T + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + g));
          }
        }
      var x = ti(d, a, t, o);
      return x.elementType = e, x.type = m, x.lanes = c, x._debugOwner = i, x;
    }
    function TC(e, t, a) {
      var i = null;
      i = e._owner;
      var o = e.type, c = e.key, d = e.props, m = bC(o, c, d, i, t, a);
      return m._debugSource = e._source, m._debugOwner = e._owner, m;
    }
    function Lu(e, t, a, i) {
      var o = ti(re, e, i, t);
      return o.lanes = a, o;
    }
    function oO(e, t, a, i) {
      typeof e.id != "string" && y('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var o = ti(_e, e, i, t | dt);
      return o.elementType = Ul, o.lanes = a, o.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, o;
    }
    function uO(e, t, a, i) {
      var o = ti(Q, e, i, t);
      return o.elementType = Je, o.lanes = a, o;
    }
    function sO(e, t, a, i) {
      var o = ti(Ne, e, i, t);
      return o.elementType = Mt, o.lanes = a, o;
    }
    function gT(e, t, a, i) {
      var o = ti(ye, e, i, t);
      o.elementType = on, o.lanes = a;
      var c = {
        isHidden: !1
      };
      return o.stateNode = c, o;
    }
    function xC(e, t, a) {
      var i = ti(ee, e, null, t);
      return i.lanes = a, i;
    }
    function cO() {
      var e = ti(q, null, null, Ye);
      return e.elementType = "DELETED", e;
    }
    function fO(e) {
      var t = ti(pe, null, null, Ye);
      return t.stateNode = e, t;
    }
    function RC(e, t, a) {
      var i = e.children !== null ? e.children : [], o = ti(z, i, e.key, t);
      return o.lanes = a, o.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, o;
    }
    function ST(e, t) {
      return e === null && (e = ti(G, null, null, Ye)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function dO(e, t, a, i, o) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = l0, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = jn, this.eventTimes = bs(ae), this.expirationTimes = bs(ln), this.pendingLanes = ae, this.suspendedLanes = ae, this.pingedLanes = ae, this.expiredLanes = ae, this.mutableReadLanes = ae, this.finishedLanes = ae, this.entangledLanes = ae, this.entanglements = bs(ae), this.identifierPrefix = i, this.onRecoverableError = o, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var c = this.pendingUpdatersLaneMap = [], d = 0; d < ms; d++)
          c.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Rm:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Eu:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function CT(e, t, a, i, o, c, d, m, g, T) {
      var x = new dO(e, t, a, m, g), L = lO(t, c);
      x.current = L, L.stateNode = x;
      {
        var M = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        L.memoizedState = M;
      }
      return j0(L), x;
    }
    var wC = "18.3.1";
    function pO(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return B(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: la,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var _C, kC;
    _C = !1, kC = {};
    function ET(e) {
      if (!e)
        return ei;
      var t = Ra(e), a = qw(t);
      if (t.tag === j) {
        var i = t.type;
        if (Cl(i))
          return GE(t, i, a);
      }
      return a;
    }
    function vO(e, t) {
      {
        var a = Ra(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var o = Da(a);
        if (o === null)
          return null;
        if (o.mode & kt) {
          var c = St(a) || "Component";
          if (!kC[c]) {
            kC[c] = !0;
            var d = Un;
            try {
              qt(o), a.mode & kt ? y("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, c) : y("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, c);
            } finally {
              d ? qt(d) : In();
            }
          }
        }
        return o.stateNode;
      }
    }
    function bT(e, t, a, i, o, c, d, m) {
      var g = !1, T = null;
      return CT(e, t, g, T, a, i, o, c, d);
    }
    function TT(e, t, a, i, o, c, d, m, g, T) {
      var x = !0, L = CT(a, i, x, e, o, c, d, m, g);
      L.context = ET(null);
      var M = L.current, I = ya(), W = Mu(M), X = ho(I, W);
      return X.callback = t ?? null, xu(M, X, W), ED(L, W, I), L;
    }
    function pv(e, t, a, i) {
      Id(t, e);
      var o = t.current, c = ya(), d = Mu(o);
      Qd(d);
      var m = ET(a);
      t.context === null ? t.context = m : t.pendingContext = m, ba && Un !== null && !_C && (_C = !0, y(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, St(Un) || "Unknown"));
      var g = ho(c, d);
      g.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && y("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), g.callback = i);
      var T = xu(o, g, d);
      return T !== null && (Er(T, o, d, c), Hm(T, o, d)), d;
    }
    function Dy(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case q:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function hO(e) {
      switch (e.tag) {
        case A: {
          var t = e.stateNode;
          if (ef(t)) {
            var a = Kd(t);
            RD(t, a);
          }
          break;
        }
        case Q: {
          So(function() {
            var o = Va(e, Ze);
            if (o !== null) {
              var c = ya();
              Er(o, e, Ze, c);
            }
          });
          var i = Ze;
          DC(e, i);
          break;
        }
      }
    }
    function xT(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = Fh(a.retryLane, t));
    }
    function DC(e, t) {
      xT(e, t);
      var a = e.alternate;
      a && xT(a, t);
    }
    function mO(e) {
      if (e.tag === Q) {
        var t = gs, a = Va(e, t);
        if (a !== null) {
          var i = ya();
          Er(a, e, t, i);
        }
        DC(e, t);
      }
    }
    function yO(e) {
      if (e.tag === Q) {
        var t = Mu(e), a = Va(e, t);
        if (a !== null) {
          var i = ya();
          Er(a, e, t, i);
        }
        DC(e, t);
      }
    }
    function RT(e) {
      var t = Sh(e);
      return t === null ? null : t.stateNode;
    }
    var wT = function(e) {
      return null;
    };
    function gO(e) {
      return wT(e);
    }
    var _T = function(e) {
      return !1;
    };
    function SO(e) {
      return _T(e);
    }
    var kT = null, DT = null, OT = null, AT = null, MT = null, NT = null, LT = null, UT = null, zT = null;
    {
      var FT = function(e, t, a) {
        var i = t[a], o = nr(e) ? e.slice() : _t({}, e);
        return a + 1 === t.length ? (nr(o) ? o.splice(i, 1) : delete o[i], o) : (o[i] = FT(e[i], t, a + 1), o);
      }, jT = function(e, t) {
        return FT(e, t, 0);
      }, VT = function(e, t, a, i) {
        var o = t[i], c = nr(e) ? e.slice() : _t({}, e);
        if (i + 1 === t.length) {
          var d = a[i];
          c[d] = c[o], nr(c) ? c.splice(o, 1) : delete c[o];
        } else
          c[o] = VT(
            // $FlowFixMe number or string is fine here
            e[o],
            t,
            a,
            i + 1
          );
        return c;
      }, HT = function(e, t, a) {
        if (t.length !== a.length) {
          E("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              E("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return VT(e, t, a, 0);
      }, PT = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var o = t[a], c = nr(e) ? e.slice() : _t({}, e);
        return c[o] = PT(e[o], t, a + 1, i), c;
      }, BT = function(e, t, a) {
        return PT(e, t, 0, a);
      }, OC = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      kT = function(e, t, a, i) {
        var o = OC(e, t);
        if (o !== null) {
          var c = BT(o.memoizedState, a, i);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = _t({}, e.memoizedProps);
          var d = Va(e, Ze);
          d !== null && Er(d, e, Ze, ln);
        }
      }, DT = function(e, t, a) {
        var i = OC(e, t);
        if (i !== null) {
          var o = jT(i.memoizedState, a);
          i.memoizedState = o, i.baseState = o, e.memoizedProps = _t({}, e.memoizedProps);
          var c = Va(e, Ze);
          c !== null && Er(c, e, Ze, ln);
        }
      }, OT = function(e, t, a, i) {
        var o = OC(e, t);
        if (o !== null) {
          var c = HT(o.memoizedState, a, i);
          o.memoizedState = c, o.baseState = c, e.memoizedProps = _t({}, e.memoizedProps);
          var d = Va(e, Ze);
          d !== null && Er(d, e, Ze, ln);
        }
      }, AT = function(e, t, a) {
        e.pendingProps = BT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Va(e, Ze);
        i !== null && Er(i, e, Ze, ln);
      }, MT = function(e, t) {
        e.pendingProps = jT(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Va(e, Ze);
        a !== null && Er(a, e, Ze, ln);
      }, NT = function(e, t, a) {
        e.pendingProps = HT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Va(e, Ze);
        i !== null && Er(i, e, Ze, ln);
      }, LT = function(e) {
        var t = Va(e, Ze);
        t !== null && Er(t, e, Ze, ln);
      }, UT = function(e) {
        wT = e;
      }, zT = function(e) {
        _T = e;
      };
    }
    function CO(e) {
      var t = Da(e);
      return t === null ? null : t.stateNode;
    }
    function EO(e) {
      return null;
    }
    function bO() {
      return Un;
    }
    function TO(e) {
      var t = e.findFiberByHostInstance, a = p.ReactCurrentDispatcher;
      return $d({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: kT,
        overrideHookStateDeletePath: DT,
        overrideHookStateRenamePath: OT,
        overrideProps: AT,
        overridePropsDeletePath: MT,
        overridePropsRenamePath: NT,
        setErrorHandler: UT,
        setSuspenseHandler: zT,
        scheduleUpdate: LT,
        currentDispatcherRef: a,
        findHostInstanceByFiber: CO,
        findFiberByHostInstance: t || EO,
        // React Refresh
        findHostInstancesForRefresh: ZD,
        scheduleRefresh: XD,
        scheduleRoot: JD,
        setRefreshHandler: KD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: bO,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: wC
      });
    }
    var $T = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function AC(e) {
      this._internalRoot = e;
    }
    Oy.prototype.render = AC.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? y("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Ay(arguments[1]) ? y("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && y("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== zn) {
          var i = RT(t.current);
          i && i.parentNode !== a && y("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      pv(e, t, null, null);
    }, Oy.prototype.unmount = AC.prototype.unmount = function() {
      typeof arguments[0] == "function" && y("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        tT() && y("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), So(function() {
          pv(null, e, null, null);
        }), $E(t);
      }
    };
    function xO(e, t) {
      if (!Ay(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      IT(e);
      var a = !1, i = !1, o = "", c = $T;
      t != null && (t.hydrate ? E("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Ri && y(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (o = t.identifierPrefix), t.onRecoverableError !== void 0 && (c = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var d = bT(e, Rm, null, a, i, o, c);
      gm(d.current, e);
      var m = e.nodeType === zn ? e.parentNode : e;
      return Sp(m), new AC(d);
    }
    function Oy(e) {
      this._internalRoot = e;
    }
    function RO(e) {
      e && Ng(e);
    }
    Oy.prototype.unstable_scheduleHydration = RO;
    function wO(e, t, a) {
      if (!Ay(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      IT(e), t === void 0 && y("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, o = a != null && a.hydratedSources || null, c = !1, d = !1, m = "", g = $T;
      a != null && (a.unstable_strictMode === !0 && (c = !0), a.identifierPrefix !== void 0 && (m = a.identifierPrefix), a.onRecoverableError !== void 0 && (g = a.onRecoverableError));
      var T = TT(t, null, e, Rm, i, c, d, m, g);
      if (gm(T.current, e), Sp(e), o)
        for (var x = 0; x < o.length; x++) {
          var L = o[x];
          O_(T, L);
        }
      return new Oy(T);
    }
    function Ay(e) {
      return !!(e && (e.nodeType === $r || e.nodeType === Ka || e.nodeType === Vl || !De));
    }
    function vv(e) {
      return !!(e && (e.nodeType === $r || e.nodeType === Ka || e.nodeType === Vl || e.nodeType === zn && e.nodeValue === " react-mount-point-unstable "));
    }
    function IT(e) {
      e.nodeType === $r && e.tagName && e.tagName.toUpperCase() === "BODY" && y("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Op(e) && (e._reactRootContainer ? y("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : y("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var _O = p.ReactCurrentOwner, YT;
    YT = function(e) {
      if (e._reactRootContainer && e.nodeType !== zn) {
        var t = RT(e._reactRootContainer.current);
        t && t.parentNode !== e && y("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = MC(e), o = !!(i && Su(i));
      o && !a && y("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === $r && e.tagName && e.tagName.toUpperCase() === "BODY" && y("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function MC(e) {
      return e ? e.nodeType === Ka ? e.documentElement : e.firstChild : null;
    }
    function WT() {
    }
    function kO(e, t, a, i, o) {
      if (o) {
        if (typeof i == "function") {
          var c = i;
          i = function() {
            var M = Dy(d);
            c.call(M);
          };
        }
        var d = TT(
          t,
          i,
          e,
          Eu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          WT
        );
        e._reactRootContainer = d, gm(d.current, e);
        var m = e.nodeType === zn ? e.parentNode : e;
        return Sp(m), So(), d;
      } else {
        for (var g; g = e.lastChild; )
          e.removeChild(g);
        if (typeof i == "function") {
          var T = i;
          i = function() {
            var M = Dy(x);
            T.call(M);
          };
        }
        var x = bT(
          e,
          Eu,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          WT
        );
        e._reactRootContainer = x, gm(x.current, e);
        var L = e.nodeType === zn ? e.parentNode : e;
        return Sp(L), So(function() {
          pv(t, x, a, i);
        }), x;
      }
    }
    function DO(e, t) {
      e !== null && typeof e != "function" && y("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function My(e, t, a, i, o) {
      YT(a), DO(o === void 0 ? null : o, "render");
      var c = a._reactRootContainer, d;
      if (!c)
        d = kO(a, t, e, o, i);
      else {
        if (d = c, typeof o == "function") {
          var m = o;
          o = function() {
            var g = Dy(d);
            m.call(g);
          };
        }
        pv(t, d, e, o);
      }
      return Dy(d);
    }
    var QT = !1;
    function OO(e) {
      {
        QT || (QT = !0, y("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = _O.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || y("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Gt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === $r ? e : vO(e, "findDOMNode");
    }
    function AO(e, t, a) {
      if (y("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !vv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Op(t) && t._reactRootContainer === void 0;
        i && y("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return My(null, e, t, !0, a);
    }
    function MO(e, t, a) {
      if (y("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !vv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Op(t) && t._reactRootContainer === void 0;
        i && y("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return My(null, e, t, !1, a);
    }
    function NO(e, t, a, i) {
      if (y("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !vv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ss(e))
        throw new Error("parentComponent must be a valid React Component");
      return My(e, t, a, !1, i);
    }
    var GT = !1;
    function LO(e) {
      if (GT || (GT = !0, y("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !vv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Op(e) && e._reactRootContainer === void 0;
        t && y("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = MC(e), i = a && !Su(a);
          i && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return So(function() {
          My(null, null, e, !1, function() {
            e._reactRootContainer = null, $E(e);
          });
        }), !0;
      } else {
        {
          var o = MC(e), c = !!(o && Su(o)), d = e.nodeType === $r && vv(e.parentNode) && !!e.parentNode._reactRootContainer;
          c && y("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", d ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    iu(hO), Ag(mO), nf(yO), Hh(Na), Ph(kr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && y("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), mh(zR), Sc(sC, wD, So);
    function UO(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Ay(t))
        throw new Error("Target container is not a DOM element.");
      return pO(e, t, null, a);
    }
    function zO(e, t, a, i) {
      return NO(e, t, a, i);
    }
    var NC = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Su, wf, Sm, gc, ls, sC]
    };
    function FO(e, t) {
      return NC.usingClientEntryPoint || y('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), xO(e, t);
    }
    function jO(e, t, a) {
      return NC.usingClientEntryPoint || y('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), wO(e, t, a);
    }
    function VO(e) {
      return tT() && y("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), So(e);
    }
    var HO = TO({
      findFiberByHostInstance: zs,
      bundleType: 1,
      version: wC,
      rendererPackageName: "react-dom"
    });
    if (!HO && Ft && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var qT = window.location.protocol;
      /^(https?|file):$/.test(qT) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (qT === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ia.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = NC, Ia.createPortal = UO, Ia.createRoot = FO, Ia.findDOMNode = OO, Ia.flushSync = VO, Ia.hydrate = AO, Ia.hydrateRoot = jO, Ia.render = MO, Ia.unmountComponentAtNode = LO, Ia.unstable_batchedUpdates = sC, Ia.unstable_renderSubtreeIntoContainer = zO, Ia.version = wC, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ia;
}
function Lx() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Lx);
    } catch (s) {
      console.error(s);
    }
  }
}
process.env.NODE_ENV === "production" ? (Lx(), KC.exports = GO()) : KC.exports = qO();
var KO = KC.exports, XC, Ly = KO;
if (process.env.NODE_ENV === "production")
  XC = Ly.createRoot, Ly.hydrateRoot;
else {
  var tx = Ly.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  XC = function(s, v) {
    tx.usingClientEntryPoint = !0;
    try {
      return Ly.createRoot(s, v);
    } finally {
      tx.usingClientEntryPoint = !1;
    }
  };
}
var XO = Object.defineProperty, JO = (s, v, p) => v in s ? XO(s, v, { enumerable: !0, configurable: !0, writable: !0, value: p }) : s[v] = p, Uy = (s, v, p) => (JO(s, typeof v != "symbol" ? v + "" : v, p), p);
const ZO = {
  stringify: (s) => s,
  parse: (s) => s
}, eA = {
  stringify: (s) => `${s}`,
  parse: (s) => parseFloat(s)
}, tA = {
  stringify: (s) => s ? "true" : "false",
  parse: (s) => /^[ty1-9]/i.test(s)
}, nA = {
  stringify: (s) => s.name,
  parse: (s, v, p) => {
    const S = (() => {
      if (typeof window < "u" && s in window)
        return window[s];
      if (typeof global < "u" && s in global)
        return global[s];
    })();
    return typeof S == "function" ? S.bind(p) : void 0;
  }
}, rA = {
  stringify: (s) => JSON.stringify(s),
  parse: (s) => JSON.parse(s)
}, zC = {
  string: ZO,
  number: eA,
  boolean: tA,
  function: nA,
  json: rA
};
function aA(s) {
  return s.replace(
    /([a-z0-9])([A-Z])/g,
    (v, p, S) => `${p}-${S.toLowerCase()}`
  );
}
const zy = Symbol.for("r2wc.render"), Fy = Symbol.for("r2wc.connected"), Js = Symbol.for("r2wc.context"), Uu = Symbol.for("r2wc.props");
function iA(s, v, p) {
  var S, b, E;
  v.props || (v.props = s.propTypes ? Object.keys(s.propTypes) : []);
  const y = Array.isArray(v.props) ? v.props.slice() : Object.keys(v.props), D = {}, U = {}, j = {};
  for (const A of y) {
    D[A] = Array.isArray(v.props) ? "string" : v.props[A];
    const z = aA(A);
    U[A] = z, j[z] = A;
  }
  class G extends HTMLElement {
    constructor() {
      super(), Uy(this, S, !0), Uy(this, b), Uy(this, E, {}), Uy(this, "container"), v.shadow ? this.container = this.attachShadow({
        mode: v.shadow
      }) : this.container = this, this[Uu].container = this.container;
      for (const z of y) {
        const q = U[z], ee = this.getAttribute(q), re = D[z], de = re ? zC[re] : null;
        de != null && de.parse && ee && (this[Uu][z] = de.parse(ee, q, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(j);
    }
    connectedCallback() {
      this[Fy] = !0, this[zy]();
    }
    disconnectedCallback() {
      this[Fy] = !1, this[Js] && p.unmount(this[Js]), delete this[Js];
    }
    attributeChangedCallback(z, q, ee) {
      const re = j[z], de = D[re], Ue = de ? zC[de] : null;
      re in D && Ue != null && Ue.parse && ee && (this[Uu][re] = Ue.parse(ee, z, this), this[zy]());
    }
    [(S = Fy, b = Js, E = Uu, zy)]() {
      this[Fy] && (this[Js] ? p.update(this[Js], this[Uu]) : this[Js] = p.mount(
        this.container,
        s,
        this[Uu]
      ));
    }
  }
  for (const A of y) {
    const z = U[A], q = D[A];
    Object.defineProperty(G.prototype, A, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[Uu][A];
      },
      set(ee) {
        this[Uu][A] = ee;
        const re = q ? zC[q] : null;
        if (re != null && re.stringify) {
          const de = re.stringify(ee, z, this);
          this.getAttribute(z) !== de && this.setAttribute(z, de);
        } else
          this[zy]();
      }
    });
  }
  return G;
}
function lA(s, v, p) {
  const S = XC(s), b = $n.createElement(v, p);
  return S.render(b), {
    root: S,
    ReactComponent: v
  };
}
function oA({ root: s, ReactComponent: v }, p) {
  const S = $n.createElement(v, p);
  s.render(S);
}
function uA({ root: s }) {
  s.unmount();
}
function rE(s, v = {}) {
  return iA(s, v, { mount: lA, update: oA, unmount: uA });
}
var JC = { exports: {} }, mv = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var nx;
function sA() {
  if (nx) return mv;
  nx = 1;
  var s = $n, v = Symbol.for("react.element"), p = Symbol.for("react.fragment"), S = Object.prototype.hasOwnProperty, b = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, E = { key: !0, ref: !0, __self: !0, __source: !0 };
  function y(D, U, j) {
    var G, A = {}, z = null, q = null;
    j !== void 0 && (z = "" + j), U.key !== void 0 && (z = "" + U.key), U.ref !== void 0 && (q = U.ref);
    for (G in U) S.call(U, G) && !E.hasOwnProperty(G) && (A[G] = U[G]);
    if (D && D.defaultProps) for (G in U = D.defaultProps, U) A[G] === void 0 && (A[G] = U[G]);
    return { $$typeof: v, type: D, key: z, ref: q, props: A, _owner: b.current };
  }
  return mv.Fragment = p, mv.jsx = y, mv.jsxs = y, mv;
}
var yv = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rx;
function cA() {
  return rx || (rx = 1, process.env.NODE_ENV !== "production" && function() {
    var s = $n, v = Symbol.for("react.element"), p = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), y = Symbol.for("react.provider"), D = Symbol.for("react.context"), U = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), G = Symbol.for("react.suspense_list"), A = Symbol.for("react.memo"), z = Symbol.for("react.lazy"), q = Symbol.for("react.offscreen"), ee = Symbol.iterator, re = "@@iterator";
    function de(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var oe = ee && _[ee] || _[re];
      return typeof oe == "function" ? oe : null;
    }
    var Ue = s.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ge(_) {
      {
        for (var oe = arguments.length, Te = new Array(oe > 1 ? oe - 1 : 0), Je = 1; Je < oe; Je++)
          Te[Je - 1] = arguments[Je];
        ne("error", _, Te);
      }
    }
    function ne(_, oe, Te) {
      {
        var Je = Ue.ReactDebugCurrentFrame, Mt = Je.getStackAddendum();
        Mt !== "" && (oe += "%s", Te = Te.concat([Mt]));
        var Ut = Te.map(function(ut) {
          return String(ut);
        });
        Ut.unshift("Warning: " + oe), Function.prototype.apply.call(console[_], console, Ut);
      }
    }
    var _e = !1, Q = !1, ot = !1, Ke = !1, xt = !1, R;
    R = Symbol.for("react.module.reference");
    function pe(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === S || _ === E || xt || _ === b || _ === j || _ === G || Ke || _ === q || _e || Q || ot || typeof _ == "object" && _ !== null && (_.$$typeof === z || _.$$typeof === A || _.$$typeof === y || _.$$typeof === D || _.$$typeof === U || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === R || _.getModuleId !== void 0));
    }
    function Ne(_, oe, Te) {
      var Je = _.displayName;
      if (Je)
        return Je;
      var Mt = oe.displayName || oe.name || "";
      return Mt !== "" ? Te + "(" + Mt + ")" : Te;
    }
    function be(_) {
      return _.displayName || "Context";
    }
    function ye(_) {
      if (_ == null)
        return null;
      if (typeof _.tag == "number" && ge("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof _ == "function")
        return _.displayName || _.name || null;
      if (typeof _ == "string")
        return _;
      switch (_) {
        case S:
          return "Fragment";
        case p:
          return "Portal";
        case E:
          return "Profiler";
        case b:
          return "StrictMode";
        case j:
          return "Suspense";
        case G:
          return "SuspenseList";
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case D:
            var oe = _;
            return be(oe) + ".Consumer";
          case y:
            var Te = _;
            return be(Te._context) + ".Provider";
          case U:
            return Ne(_, _.render, "ForwardRef");
          case A:
            var Je = _.displayName || null;
            return Je !== null ? Je : ye(_.type) || "Memo";
          case z: {
            var Mt = _, Ut = Mt._payload, ut = Mt._init;
            try {
              return ye(ut(Ut));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Le = Object.assign, bt = 0, ct, At, ve, Pe, V, se, De;
    function et() {
    }
    et.__reactDisabledLog = !0;
    function Qe() {
      {
        if (bt === 0) {
          ct = console.log, At = console.info, ve = console.warn, Pe = console.error, V = console.group, se = console.groupCollapsed, De = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: et,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        bt++;
      }
    }
    function ht() {
      {
        if (bt--, bt === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Le({}, _, {
              value: ct
            }),
            info: Le({}, _, {
              value: At
            }),
            warn: Le({}, _, {
              value: ve
            }),
            error: Le({}, _, {
              value: Pe
            }),
            group: Le({}, _, {
              value: V
            }),
            groupCollapsed: Le({}, _, {
              value: se
            }),
            groupEnd: Le({}, _, {
              value: De
            })
          });
        }
        bt < 0 && ge("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = Ue.ReactCurrentDispatcher, at;
    function rt(_, oe, Te) {
      {
        if (at === void 0)
          try {
            throw Error();
          } catch (Mt) {
            var Je = Mt.stack.trim().match(/\n( *(at )?)/);
            at = Je && Je[1] || "";
          }
        return `
` + at + _;
      }
    }
    var pt = !1, mt;
    {
      var zt = typeof WeakMap == "function" ? WeakMap : Map;
      mt = new zt();
    }
    function Se(_, oe) {
      if (!_ || pt)
        return "";
      {
        var Te = mt.get(_);
        if (Te !== void 0)
          return Te;
      }
      var Je;
      pt = !0;
      var Mt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ut;
      Ut = Ie.current, Ie.current = null, Qe();
      try {
        if (oe) {
          var ut = function() {
            throw Error();
          };
          if (Object.defineProperty(ut.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ut, []);
            } catch (Tr) {
              Je = Tr;
            }
            Reflect.construct(_, [], ut);
          } else {
            try {
              ut.call();
            } catch (Tr) {
              Je = Tr;
            }
            _.call(ut.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Tr) {
            Je = Tr;
          }
          _();
        }
      } catch (Tr) {
        if (Tr && Je && typeof Tr.stack == "string") {
          for (var wt = Tr.stack.split(`
`), tr = Je.stack.split(`
`), on = wt.length - 1, gn = tr.length - 1; on >= 1 && gn >= 0 && wt[on] !== tr[gn]; )
            gn--;
          for (; on >= 1 && gn >= 0; on--, gn--)
            if (wt[on] !== tr[gn]) {
              if (on !== 1 || gn !== 1)
                do
                  if (on--, gn--, gn < 0 || wt[on] !== tr[gn]) {
                    var Br = `
` + wt[on].replace(" at new ", " at ");
                    return _.displayName && Br.includes("<anonymous>") && (Br = Br.replace("<anonymous>", _.displayName)), typeof _ == "function" && mt.set(_, Br), Br;
                  }
                while (on >= 1 && gn >= 0);
              break;
            }
        }
      } finally {
        pt = !1, Ie.current = Ut, ht(), Error.prepareStackTrace = Mt;
      }
      var el = _ ? _.displayName || _.name : "", It = el ? rt(el) : "";
      return typeof _ == "function" && mt.set(_, It), It;
    }
    function Ft(_, oe, Te) {
      return Se(_, !1);
    }
    function vn(_) {
      var oe = _.prototype;
      return !!(oe && oe.isReactComponent);
    }
    function kn(_, oe, Te) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return Se(_, vn(_));
      if (typeof _ == "string")
        return rt(_);
      switch (_) {
        case j:
          return rt("Suspense");
        case G:
          return rt("SuspenseList");
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case U:
            return Ft(_.render);
          case A:
            return kn(_.type, oe, Te);
          case z: {
            var Je = _, Mt = Je._payload, Ut = Je._init;
            try {
              return kn(Ut(Mt), oe, Te);
            } catch {
            }
          }
        }
      return "";
    }
    var Zn = Object.prototype.hasOwnProperty, cr = {}, k = Ue.ReactDebugCurrentFrame;
    function B(_) {
      if (_) {
        var oe = _._owner, Te = kn(_.type, _._source, oe ? oe.type : null);
        k.setExtraStackFrame(Te);
      } else
        k.setExtraStackFrame(null);
    }
    function K(_, oe, Te, Je, Mt) {
      {
        var Ut = Function.call.bind(Zn);
        for (var ut in _)
          if (Ut(_, ut)) {
            var wt = void 0;
            try {
              if (typeof _[ut] != "function") {
                var tr = Error((Je || "React class") + ": " + Te + " type `" + ut + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[ut] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw tr.name = "Invariant Violation", tr;
              }
              wt = _[ut](oe, ut, Je, Te, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (on) {
              wt = on;
            }
            wt && !(wt instanceof Error) && (B(Mt), ge("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Je || "React class", Te, ut, typeof wt), B(null)), wt instanceof Error && !(wt.message in cr) && (cr[wt.message] = !0, B(Mt), ge("Failed %s type: %s", Te, wt.message), B(null));
          }
      }
    }
    var Ce = Array.isArray;
    function he(_) {
      return Ce(_);
    }
    function ue(_) {
      {
        var oe = typeof Symbol == "function" && Symbol.toStringTag, Te = oe && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return Te;
      }
    }
    function Fe(_) {
      try {
        return gt(_), !1;
      } catch {
        return !0;
      }
    }
    function gt(_) {
      return "" + _;
    }
    function $t(_) {
      if (Fe(_))
        return ge("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ue(_)), gt(_);
    }
    var Rt = Ue.ReactCurrentOwner, Dn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, li, Or, Ee;
    Ee = {};
    function Xe(_) {
      if (Zn.call(_, "ref")) {
        var oe = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (oe && oe.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function Tt(_) {
      if (Zn.call(_, "key")) {
        var oe = Object.getOwnPropertyDescriptor(_, "key").get;
        if (oe && oe.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function Pt(_, oe) {
      if (typeof _.ref == "string" && Rt.current && oe && Rt.current.stateNode !== oe) {
        var Te = ye(Rt.current.type);
        Ee[Te] || (ge('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', ye(Rt.current.type), _.ref), Ee[Te] = !0);
      }
    }
    function nn(_, oe) {
      {
        var Te = function() {
          li || (li = !0, ge("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", oe));
        };
        Te.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: Te,
          configurable: !0
        });
      }
    }
    function er(_, oe) {
      {
        var Te = function() {
          Or || (Or = !0, ge("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", oe));
        };
        Te.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: Te,
          configurable: !0
        });
      }
    }
    var On = function(_, oe, Te, Je, Mt, Ut, ut) {
      var wt = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: v,
        // Built-in properties that belong on the element
        type: _,
        key: oe,
        ref: Te,
        props: ut,
        // Record the component responsible for creating this element.
        _owner: Ut
      };
      return wt._store = {}, Object.defineProperty(wt._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(wt, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Je
      }), Object.defineProperty(wt, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Mt
      }), Object.freeze && (Object.freeze(wt.props), Object.freeze(wt)), wt;
    };
    function Pr(_, oe, Te, Je, Mt) {
      {
        var Ut, ut = {}, wt = null, tr = null;
        Te !== void 0 && ($t(Te), wt = "" + Te), Tt(oe) && ($t(oe.key), wt = "" + oe.key), Xe(oe) && (tr = oe.ref, Pt(oe, Mt));
        for (Ut in oe)
          Zn.call(oe, Ut) && !Dn.hasOwnProperty(Ut) && (ut[Ut] = oe[Ut]);
        if (_ && _.defaultProps) {
          var on = _.defaultProps;
          for (Ut in on)
            ut[Ut] === void 0 && (ut[Ut] = on[Ut]);
        }
        if (wt || tr) {
          var gn = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          wt && nn(ut, gn), tr && er(ut, gn);
        }
        return On(_, wt, tr, Mt, Je, Rt.current, ut);
      }
    }
    var rn = Ue.ReactCurrentOwner, ia = Ue.ReactDebugCurrentFrame;
    function en(_) {
      if (_) {
        var oe = _._owner, Te = kn(_.type, _._source, oe ? oe.type : null);
        ia.setExtraStackFrame(Te);
      } else
        ia.setExtraStackFrame(null);
    }
    var an;
    an = !1;
    function wo(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === v;
    }
    function Ml() {
      {
        if (rn.current) {
          var _ = ye(rn.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function _o(_) {
      return "";
    }
    var Pu = {};
    function Zs(_) {
      {
        var oe = Ml();
        if (!oe) {
          var Te = typeof _ == "string" ? _ : _.displayName || _.name;
          Te && (oe = `

Check the top-level render call using <` + Te + ">.");
        }
        return oe;
      }
    }
    function Nl(_, oe) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var Te = Zs(oe);
        if (Pu[Te])
          return;
        Pu[Te] = !0;
        var Je = "";
        _ && _._owner && _._owner !== rn.current && (Je = " It was passed a child from " + ye(_._owner.type) + "."), en(_), ge('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', Te, Je), en(null);
      }
    }
    function ko(_, oe) {
      {
        if (typeof _ != "object")
          return;
        if (he(_))
          for (var Te = 0; Te < _.length; Te++) {
            var Je = _[Te];
            wo(Je) && Nl(Je, oe);
          }
        else if (wo(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var Mt = de(_);
          if (typeof Mt == "function" && Mt !== _.entries)
            for (var Ut = Mt.call(_), ut; !(ut = Ut.next()).done; )
              wo(ut.value) && Nl(ut.value, oe);
        }
      }
    }
    function Ll(_) {
      {
        var oe = _.type;
        if (oe == null || typeof oe == "string")
          return;
        var Te;
        if (typeof oe == "function")
          Te = oe.propTypes;
        else if (typeof oe == "object" && (oe.$$typeof === U || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        oe.$$typeof === A))
          Te = oe.propTypes;
        else
          return;
        if (Te) {
          var Je = ye(oe);
          K(Te, _.props, "prop", Je, _);
        } else if (oe.PropTypes !== void 0 && !an) {
          an = !0;
          var Mt = ye(oe);
          ge("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Mt || "Unknown");
        }
        typeof oe.getDefaultProps == "function" && !oe.getDefaultProps.isReactClassApproved && ge("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Do(_) {
      {
        for (var oe = Object.keys(_.props), Te = 0; Te < oe.length; Te++) {
          var Je = oe[Te];
          if (Je !== "children" && Je !== "key") {
            en(_), ge("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Je), en(null);
            break;
          }
        }
        _.ref !== null && (en(_), ge("Invalid attribute `ref` supplied to `React.Fragment`."), en(null));
      }
    }
    var oi = {};
    function Ri(_, oe, Te, Je, Mt, Ut) {
      {
        var ut = pe(_);
        if (!ut) {
          var wt = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (wt += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var tr = _o();
          tr ? wt += tr : wt += Ml();
          var on;
          _ === null ? on = "null" : he(_) ? on = "array" : _ !== void 0 && _.$$typeof === v ? (on = "<" + (ye(_.type) || "Unknown") + " />", wt = " Did you accidentally export a JSX literal instead of a component?") : on = typeof _, ge("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", on, wt);
        }
        var gn = Pr(_, oe, Te, Mt, Ut);
        if (gn == null)
          return gn;
        if (ut) {
          var Br = oe.children;
          if (Br !== void 0)
            if (Je)
              if (he(Br)) {
                for (var el = 0; el < Br.length; el++)
                  ko(Br[el], _);
                Object.freeze && Object.freeze(Br);
              } else
                ge("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ko(Br, _);
        }
        if (Zn.call(oe, "key")) {
          var It = ye(_), Tr = Object.keys(oe).filter(function(ui) {
            return ui !== "key";
          }), oa = Tr.length > 0 ? "{key: someKey, " + Tr.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!oi[It + oa]) {
            var _t = Tr.length > 0 ? "{" + Tr.join(": ..., ") + ": ...}" : "{}";
            ge(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, oa, It, _t, It), oi[It + oa] = !0;
          }
        }
        return _ === S ? Do(gn) : Ll(gn), gn;
      }
    }
    function la(_, oe, Te) {
      return Ri(_, oe, Te, !0);
    }
    function Wa(_, oe, Te) {
      return Ri(_, oe, Te, !1);
    }
    var Zi = Wa, Ul = la;
    yv.Fragment = S, yv.jsx = Zi, yv.jsxs = Ul;
  }()), yv;
}
process.env.NODE_ENV === "production" ? JC.exports = sA() : JC.exports = cA();
var Bn = JC.exports;
const fA = "_wrapper_5bkbt_1", dA = "_logo_5bkbt_19", pA = "_title_5bkbt_33", FC = {
  wrapper: fA,
  logo: dA,
  title: pA
}, vA = ({ text: s, image: v }) => /* @__PURE__ */ Bn.jsx("header", { children: /* @__PURE__ */ Bn.jsxs("div", { className: FC.wrapper, children: [
  /* @__PURE__ */ Bn.jsx("div", { children: /* @__PURE__ */ Bn.jsx("img", { width: 150, height: 150, className: FC.logo, src: v }) }),
  /* @__PURE__ */ Bn.jsx("h1", { className: FC.title, children: s })
] }) });
var _v = (s) => s.type === "checkbox", rd = (s) => s instanceof Date, Ca = (s) => s == null;
const Ux = (s) => typeof s == "object";
var sr = (s) => !Ca(s) && !Array.isArray(s) && Ux(s) && !rd(s), hA = (s) => sr(s) && s.target ? _v(s.target) ? s.target.checked : s.target.value : s, mA = (s) => s.substring(0, s.search(/\.\d+(\.|$)/)) || s, yA = (s, v) => s.has(mA(v)), gA = (s) => {
  const v = s.constructor && s.constructor.prototype;
  return sr(v) && v.hasOwnProperty("isPrototypeOf");
}, aE = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function ri(s) {
  let v;
  const p = Array.isArray(s);
  if (s instanceof Date)
    v = new Date(s);
  else if (s instanceof Set)
    v = new Set(s);
  else if (!(aE && (s instanceof Blob || s instanceof FileList)) && (p || sr(s)))
    if (v = p ? [] : {}, !p && !gA(s))
      v = s;
    else
      for (const S in s)
        s.hasOwnProperty(S) && (v[S] = ri(s[S]));
  else
    return s;
  return v;
}
var Qy = (s) => Array.isArray(s) ? s.filter(Boolean) : [], Xn = (s) => s === void 0, $e = (s, v, p) => {
  if (!v || !sr(s))
    return p;
  const S = Qy(v.split(/[,[\].]+?/)).reduce((b, E) => Ca(b) ? b : b[E], s);
  return Xn(S) || S === s ? Xn(s[v]) ? p : s[v] : S;
}, Ol = (s) => typeof s == "boolean", iE = (s) => /^\w*$/.test(s), zx = (s) => Qy(s.replace(/["|']|\]/g, "").split(/\.|\[/)), bn = (s, v, p) => {
  let S = -1;
  const b = iE(v) ? [v] : zx(v), E = b.length, y = E - 1;
  for (; ++S < E; ) {
    const D = b[S];
    let U = p;
    if (S !== y) {
      const j = s[D];
      U = sr(j) || Array.isArray(j) ? j : isNaN(+b[S + 1]) ? {} : [];
    }
    if (D === "__proto__")
      return;
    s[D] = U, s = s[D];
  }
  return s;
};
const ax = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, Ji = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, bo = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, SA = $n.createContext(null), CA = () => $n.useContext(SA);
var EA = (s, v, p, S = !0) => {
  const b = {
    defaultValues: v._defaultValues
  };
  for (const E in s)
    Object.defineProperty(b, E, {
      get: () => {
        const y = E;
        return v._proxyFormState[y] !== Ji.all && (v._proxyFormState[y] = !S || Ji.all), s[y];
      }
    });
  return b;
}, Ya = (s) => sr(s) && !Object.keys(s).length, bA = (s, v, p, S) => {
  p(s);
  const { name: b, ...E } = s;
  return Ya(E) || Object.keys(E).length >= Object.keys(v).length || Object.keys(E).find((y) => v[y] === Ji.all);
}, Tv = (s) => Array.isArray(s) ? s : [s], TA = (s, v, p) => !s || !v || s === v || Tv(s).some((S) => S && (p ? S === v : S.startsWith(v) || v.startsWith(S)));
function Fx(s) {
  const v = $n.useRef(s);
  v.current = s, $n.useEffect(() => {
    const p = !s.disabled && v.current.subject && v.current.subject.subscribe({
      next: v.current.next
    });
    return () => {
      p && p.unsubscribe();
    };
  }, [s.disabled]);
}
var Al = (s) => typeof s == "string", jx = (s, v, p, S, b) => Al(s) ? (S && v.watch.add(s), $e(p, s, b)) : Array.isArray(s) ? s.map((E) => (S && v.watch.add(E), $e(p, E))) : (S && (v.watchAll = !0), p);
function xA(s) {
  const v = CA(), { control: p = v.control, name: S, defaultValue: b, disabled: E, exact: y } = s || {}, D = $n.useRef(S);
  D.current = S, Fx({
    disabled: E,
    subject: p._subjects.values,
    next: (G) => {
      TA(D.current, G.name, y) && j(ri(jx(D.current, p._names, G.values || p._formValues, !1, b)));
    }
  });
  const [U, j] = $n.useState(p._getWatch(S, b));
  return $n.useEffect(() => p._removeUnmounted()), U;
}
var RA = (s, v, p, S, b) => v ? {
  ...p[s],
  types: {
    ...p[s] && p[s].types ? p[s].types : {},
    [S]: b || !0
  }
} : {}, ix = (s) => ({
  isOnSubmit: !s || s === Ji.onSubmit,
  isOnBlur: s === Ji.onBlur,
  isOnChange: s === Ji.onChange,
  isOnAll: s === Ji.all,
  isOnTouch: s === Ji.onTouched
}), lx = (s, v, p) => !p && (v.watchAll || v.watch.has(s) || [...v.watch].some((S) => s.startsWith(S) && /^\.\w+/.test(s.slice(S.length))));
const xv = (s, v, p, S) => {
  for (const b of p || Object.keys(s)) {
    const E = $e(s, b);
    if (E) {
      const { _f: y, ...D } = E;
      if (y) {
        if (y.refs && y.refs[0] && v(y.refs[0], b) && !S)
          return !0;
        if (y.ref && v(y.ref, y.name) && !S)
          return !0;
        if (xv(D, v))
          break;
      } else if (sr(D) && xv(D, v))
        break;
    }
  }
};
var wA = (s, v, p) => {
  const S = Tv($e(s, p));
  return bn(S, "root", v[p]), bn(s, p, S), s;
}, lE = (s) => s.type === "file", xo = (s) => typeof s == "function", By = (s) => {
  if (!aE)
    return !1;
  const v = s ? s.ownerDocument : 0;
  return s instanceof (v && v.defaultView ? v.defaultView.HTMLElement : HTMLElement);
}, Py = (s) => Al(s), oE = (s) => s.type === "radio", $y = (s) => s instanceof RegExp;
const ox = {
  value: !1,
  isValid: !1
}, ux = { value: !0, isValid: !0 };
var Vx = (s) => {
  if (Array.isArray(s)) {
    if (s.length > 1) {
      const v = s.filter((p) => p && p.checked && !p.disabled).map((p) => p.value);
      return { value: v, isValid: !!v.length };
    }
    return s[0].checked && !s[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      s[0].attributes && !Xn(s[0].attributes.value) ? Xn(s[0].value) || s[0].value === "" ? ux : { value: s[0].value, isValid: !0 } : ux
    ) : ox;
  }
  return ox;
};
const sx = {
  isValid: !1,
  value: null
};
var Hx = (s) => Array.isArray(s) ? s.reduce((v, p) => p && p.checked && !p.disabled ? {
  isValid: !0,
  value: p.value
} : v, sx) : sx;
function cx(s, v, p = "validate") {
  if (Py(s) || Array.isArray(s) && s.every(Py) || Ol(s) && !s)
    return {
      type: p,
      message: Py(s) ? s : "",
      ref: v
    };
}
var Xf = (s) => sr(s) && !$y(s) ? s : {
  value: s,
  message: ""
}, fx = async (s, v, p, S, b) => {
  const { ref: E, refs: y, required: D, maxLength: U, minLength: j, min: G, max: A, pattern: z, validate: q, name: ee, valueAsNumber: re, mount: de, disabled: Ue } = s._f, ge = $e(v, ee);
  if (!de || Ue)
    return {};
  const ne = y ? y[0] : E, _e = (be) => {
    S && ne.reportValidity && (ne.setCustomValidity(Ol(be) ? "" : be || ""), ne.reportValidity());
  }, Q = {}, ot = oE(E), Ke = _v(E), xt = ot || Ke, R = (re || lE(E)) && Xn(E.value) && Xn(ge) || By(E) && E.value === "" || ge === "" || Array.isArray(ge) && !ge.length, pe = RA.bind(null, ee, p, Q), Ne = (be, ye, Le, bt = bo.maxLength, ct = bo.minLength) => {
    const At = be ? ye : Le;
    Q[ee] = {
      type: be ? bt : ct,
      message: At,
      ref: E,
      ...pe(be ? bt : ct, At)
    };
  };
  if (b ? !Array.isArray(ge) || !ge.length : D && (!xt && (R || Ca(ge)) || Ol(ge) && !ge || Ke && !Vx(y).isValid || ot && !Hx(y).isValid)) {
    const { value: be, message: ye } = Py(D) ? { value: !!D, message: D } : Xf(D);
    if (be && (Q[ee] = {
      type: bo.required,
      message: ye,
      ref: ne,
      ...pe(bo.required, ye)
    }, !p))
      return _e(ye), Q;
  }
  if (!R && (!Ca(G) || !Ca(A))) {
    let be, ye;
    const Le = Xf(A), bt = Xf(G);
    if (!Ca(ge) && !isNaN(ge)) {
      const ct = E.valueAsNumber || ge && +ge;
      Ca(Le.value) || (be = ct > Le.value), Ca(bt.value) || (ye = ct < bt.value);
    } else {
      const ct = E.valueAsDate || new Date(ge), At = (V) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + V), ve = E.type == "time", Pe = E.type == "week";
      Al(Le.value) && ge && (be = ve ? At(ge) > At(Le.value) : Pe ? ge > Le.value : ct > new Date(Le.value)), Al(bt.value) && ge && (ye = ve ? At(ge) < At(bt.value) : Pe ? ge < bt.value : ct < new Date(bt.value));
    }
    if ((be || ye) && (Ne(!!be, Le.message, bt.message, bo.max, bo.min), !p))
      return _e(Q[ee].message), Q;
  }
  if ((U || j) && !R && (Al(ge) || b && Array.isArray(ge))) {
    const be = Xf(U), ye = Xf(j), Le = !Ca(be.value) && ge.length > +be.value, bt = !Ca(ye.value) && ge.length < +ye.value;
    if ((Le || bt) && (Ne(Le, be.message, ye.message), !p))
      return _e(Q[ee].message), Q;
  }
  if (z && !R && Al(ge)) {
    const { value: be, message: ye } = Xf(z);
    if ($y(be) && !ge.match(be) && (Q[ee] = {
      type: bo.pattern,
      message: ye,
      ref: E,
      ...pe(bo.pattern, ye)
    }, !p))
      return _e(ye), Q;
  }
  if (q) {
    if (xo(q)) {
      const be = await q(ge, v), ye = cx(be, ne);
      if (ye && (Q[ee] = {
        ...ye,
        ...pe(bo.validate, ye.message)
      }, !p))
        return _e(ye.message), Q;
    } else if (sr(q)) {
      let be = {};
      for (const ye in q) {
        if (!Ya(be) && !p)
          break;
        const Le = cx(await q[ye](ge, v), ne, ye);
        Le && (be = {
          ...Le,
          ...pe(ye, Le.message)
        }, _e(Le.message), p && (Q[ee] = be));
      }
      if (!Ya(be) && (Q[ee] = {
        ref: ne,
        ...be
      }, !p))
        return Q;
    }
  }
  return _e(!0), Q;
};
function _A(s, v) {
  const p = v.slice(0, -1).length;
  let S = 0;
  for (; S < p; )
    s = Xn(s) ? S++ : s[v[S++]];
  return s;
}
function kA(s) {
  for (const v in s)
    if (s.hasOwnProperty(v) && !Xn(s[v]))
      return !1;
  return !0;
}
function br(s, v) {
  const p = Array.isArray(v) ? v : iE(v) ? [v] : zx(v), S = p.length === 1 ? s : _A(s, p), b = p.length - 1, E = p[b];
  return S && delete S[E], b !== 0 && (sr(S) && Ya(S) || Array.isArray(S) && kA(S)) && br(s, p.slice(0, -1)), s;
}
var jC = () => {
  let s = [];
  return {
    get observers() {
      return s;
    },
    next: (b) => {
      for (const E of s)
        E.next && E.next(b);
    },
    subscribe: (b) => (s.push(b), {
      unsubscribe: () => {
        s = s.filter((E) => E !== b);
      }
    }),
    unsubscribe: () => {
      s = [];
    }
  };
}, Iy = (s) => Ca(s) || !Ux(s);
function zu(s, v) {
  if (Iy(s) || Iy(v))
    return s === v;
  if (rd(s) && rd(v))
    return s.getTime() === v.getTime();
  const p = Object.keys(s), S = Object.keys(v);
  if (p.length !== S.length)
    return !1;
  for (const b of p) {
    const E = s[b];
    if (!S.includes(b))
      return !1;
    if (b !== "ref") {
      const y = v[b];
      if (rd(E) && rd(y) || sr(E) && sr(y) || Array.isArray(E) && Array.isArray(y) ? !zu(E, y) : E !== y)
        return !1;
    }
  }
  return !0;
}
var Px = (s) => s.type === "select-multiple", DA = (s) => oE(s) || _v(s), VC = (s) => By(s) && s.isConnected, Bx = (s) => {
  for (const v in s)
    if (xo(s[v]))
      return !0;
  return !1;
};
function Yy(s, v = {}) {
  const p = Array.isArray(s);
  if (sr(s) || p)
    for (const S in s)
      Array.isArray(s[S]) || sr(s[S]) && !Bx(s[S]) ? (v[S] = Array.isArray(s[S]) ? [] : {}, Yy(s[S], v[S])) : Ca(s[S]) || (v[S] = !0);
  return v;
}
function $x(s, v, p) {
  const S = Array.isArray(s);
  if (sr(s) || S)
    for (const b in s)
      Array.isArray(s[b]) || sr(s[b]) && !Bx(s[b]) ? Xn(v) || Iy(p[b]) ? p[b] = Array.isArray(s[b]) ? Yy(s[b], []) : { ...Yy(s[b]) } : $x(s[b], Ca(v) ? {} : v[b], p[b]) : p[b] = !zu(s[b], v[b]);
  return p;
}
var jy = (s, v) => $x(s, v, Yy(v)), Ix = (s, { valueAsNumber: v, valueAsDate: p, setValueAs: S }) => Xn(s) ? s : v ? s === "" ? NaN : s && +s : p && Al(s) ? new Date(s) : S ? S(s) : s;
function HC(s) {
  const v = s.ref;
  if (!(s.refs ? s.refs.every((p) => p.disabled) : v.disabled))
    return lE(v) ? v.files : oE(v) ? Hx(s.refs).value : Px(v) ? [...v.selectedOptions].map(({ value: p }) => p) : _v(v) ? Vx(s.refs).value : Ix(Xn(v.value) ? s.ref.value : v.value, s);
}
var OA = (s, v, p, S) => {
  const b = {};
  for (const E of s) {
    const y = $e(v, E);
    y && bn(b, E, y._f);
  }
  return {
    criteriaMode: p,
    names: [...s],
    fields: b,
    shouldUseNativeValidation: S
  };
}, gv = (s) => Xn(s) ? s : $y(s) ? s.source : sr(s) ? $y(s.value) ? s.value.source : s.value : s;
const dx = "AsyncFunction";
var AA = (s) => (!s || !s.validate) && !!(xo(s.validate) && s.validate.constructor.name === dx || sr(s.validate) && Object.values(s.validate).find((v) => v.constructor.name === dx)), MA = (s) => s.mount && (s.required || s.min || s.max || s.maxLength || s.minLength || s.pattern || s.validate);
function px(s, v, p) {
  const S = $e(s, p);
  if (S || iE(p))
    return {
      error: S,
      name: p
    };
  const b = p.split(".");
  for (; b.length; ) {
    const E = b.join("."), y = $e(v, E), D = $e(s, E);
    if (y && !Array.isArray(y) && p !== E)
      return { name: p };
    if (D && D.type)
      return {
        name: E,
        error: D
      };
    b.pop();
  }
  return {
    name: p
  };
}
var NA = (s, v, p, S, b) => b.isOnAll ? !1 : !p && b.isOnTouch ? !(v || s) : (p ? S.isOnBlur : b.isOnBlur) ? !s : (p ? S.isOnChange : b.isOnChange) ? s : !0, LA = (s, v) => !Qy($e(s, v)).length && br(s, v);
const UA = {
  mode: Ji.onSubmit,
  reValidateMode: Ji.onChange,
  shouldFocusError: !0
};
function zA(s = {}) {
  let v = {
    ...UA,
    ...s
  }, p = {
    submitCount: 0,
    isDirty: !1,
    isLoading: xo(v.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: v.errors || {},
    disabled: v.disabled || !1
  }, S = {}, b = sr(v.defaultValues) || sr(v.values) ? ri(v.defaultValues || v.values) || {} : {}, E = v.shouldUnregister ? {} : ri(b), y = {
    action: !1,
    mount: !1,
    watch: !1
  }, D = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, U, j = 0;
  const G = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, A = {
    values: jC(),
    array: jC(),
    state: jC()
  }, z = ix(v.mode), q = ix(v.reValidateMode), ee = v.criteriaMode === Ji.all, re = (k) => (B) => {
    clearTimeout(j), j = setTimeout(k, B);
  }, de = async (k) => {
    if (G.isValid || k) {
      const B = v.resolver ? Ya((await xt()).errors) : await pe(S, !0);
      B !== p.isValid && A.state.next({
        isValid: B
      });
    }
  }, Ue = (k, B) => {
    (G.isValidating || G.validatingFields) && ((k || Array.from(D.mount)).forEach((K) => {
      K && (B ? bn(p.validatingFields, K, B) : br(p.validatingFields, K));
    }), A.state.next({
      validatingFields: p.validatingFields,
      isValidating: !Ya(p.validatingFields)
    }));
  }, ge = (k, B = [], K, Ce, he = !0, ue = !0) => {
    if (Ce && K) {
      if (y.action = !0, ue && Array.isArray($e(S, k))) {
        const Fe = K($e(S, k), Ce.argA, Ce.argB);
        he && bn(S, k, Fe);
      }
      if (ue && Array.isArray($e(p.errors, k))) {
        const Fe = K($e(p.errors, k), Ce.argA, Ce.argB);
        he && bn(p.errors, k, Fe), LA(p.errors, k);
      }
      if (G.touchedFields && ue && Array.isArray($e(p.touchedFields, k))) {
        const Fe = K($e(p.touchedFields, k), Ce.argA, Ce.argB);
        he && bn(p.touchedFields, k, Fe);
      }
      G.dirtyFields && (p.dirtyFields = jy(b, E)), A.state.next({
        name: k,
        isDirty: be(k, B),
        dirtyFields: p.dirtyFields,
        errors: p.errors,
        isValid: p.isValid
      });
    } else
      bn(E, k, B);
  }, ne = (k, B) => {
    bn(p.errors, k, B), A.state.next({
      errors: p.errors
    });
  }, _e = (k) => {
    p.errors = k, A.state.next({
      errors: p.errors,
      isValid: !1
    });
  }, Q = (k, B, K, Ce) => {
    const he = $e(S, k);
    if (he) {
      const ue = $e(E, k, Xn(K) ? $e(b, k) : K);
      Xn(ue) || Ce && Ce.defaultChecked || B ? bn(E, k, B ? ue : HC(he._f)) : bt(k, ue), y.mount && de();
    }
  }, ot = (k, B, K, Ce, he) => {
    let ue = !1, Fe = !1;
    const gt = {
      name: k
    }, $t = !!($e(S, k) && $e(S, k)._f && $e(S, k)._f.disabled);
    if (!K || Ce) {
      G.isDirty && (Fe = p.isDirty, p.isDirty = gt.isDirty = be(), ue = Fe !== gt.isDirty);
      const Rt = $t || zu($e(b, k), B);
      Fe = !!(!$t && $e(p.dirtyFields, k)), Rt || $t ? br(p.dirtyFields, k) : bn(p.dirtyFields, k, !0), gt.dirtyFields = p.dirtyFields, ue = ue || G.dirtyFields && Fe !== !Rt;
    }
    if (K) {
      const Rt = $e(p.touchedFields, k);
      Rt || (bn(p.touchedFields, k, K), gt.touchedFields = p.touchedFields, ue = ue || G.touchedFields && Rt !== K);
    }
    return ue && he && A.state.next(gt), ue ? gt : {};
  }, Ke = (k, B, K, Ce) => {
    const he = $e(p.errors, k), ue = G.isValid && Ol(B) && p.isValid !== B;
    if (s.delayError && K ? (U = re(() => ne(k, K)), U(s.delayError)) : (clearTimeout(j), U = null, K ? bn(p.errors, k, K) : br(p.errors, k)), (K ? !zu(he, K) : he) || !Ya(Ce) || ue) {
      const Fe = {
        ...Ce,
        ...ue && Ol(B) ? { isValid: B } : {},
        errors: p.errors,
        name: k
      };
      p = {
        ...p,
        ...Fe
      }, A.state.next(Fe);
    }
  }, xt = async (k) => {
    Ue(k, !0);
    const B = await v.resolver(E, v.context, OA(k || D.mount, S, v.criteriaMode, v.shouldUseNativeValidation));
    return Ue(k), B;
  }, R = async (k) => {
    const { errors: B } = await xt(k);
    if (k)
      for (const K of k) {
        const Ce = $e(B, K);
        Ce ? bn(p.errors, K, Ce) : br(p.errors, K);
      }
    else
      p.errors = B;
    return B;
  }, pe = async (k, B, K = {
    valid: !0
  }) => {
    for (const Ce in k) {
      const he = k[Ce];
      if (he) {
        const { _f: ue, ...Fe } = he;
        if (ue) {
          const gt = D.array.has(ue.name), $t = he._f && AA(he._f);
          $t && G.validatingFields && Ue([Ce], !0);
          const Rt = await fx(he, E, ee, v.shouldUseNativeValidation && !B, gt);
          if ($t && G.validatingFields && Ue([Ce]), Rt[ue.name] && (K.valid = !1, B))
            break;
          !B && ($e(Rt, ue.name) ? gt ? wA(p.errors, Rt, ue.name) : bn(p.errors, ue.name, Rt[ue.name]) : br(p.errors, ue.name));
        }
        !Ya(Fe) && await pe(Fe, B, K);
      }
    }
    return K.valid;
  }, Ne = () => {
    for (const k of D.unMount) {
      const B = $e(S, k);
      B && (B._f.refs ? B._f.refs.every((K) => !VC(K)) : !VC(B._f.ref)) && Ie(k);
    }
    D.unMount = /* @__PURE__ */ new Set();
  }, be = (k, B) => (k && B && bn(E, k, B), !zu(se(), b)), ye = (k, B, K) => jx(k, D, {
    ...y.mount ? E : Xn(B) ? b : Al(k) ? { [k]: B } : B
  }, K, B), Le = (k) => Qy($e(y.mount ? E : b, k, s.shouldUnregister ? $e(b, k, []) : [])), bt = (k, B, K = {}) => {
    const Ce = $e(S, k);
    let he = B;
    if (Ce) {
      const ue = Ce._f;
      ue && (!ue.disabled && bn(E, k, Ix(B, ue)), he = By(ue.ref) && Ca(B) ? "" : B, Px(ue.ref) ? [...ue.ref.options].forEach((Fe) => Fe.selected = he.includes(Fe.value)) : ue.refs ? _v(ue.ref) ? ue.refs.length > 1 ? ue.refs.forEach((Fe) => (!Fe.defaultChecked || !Fe.disabled) && (Fe.checked = Array.isArray(he) ? !!he.find((gt) => gt === Fe.value) : he === Fe.value)) : ue.refs[0] && (ue.refs[0].checked = !!he) : ue.refs.forEach((Fe) => Fe.checked = Fe.value === he) : lE(ue.ref) ? ue.ref.value = "" : (ue.ref.value = he, ue.ref.type || A.values.next({
        name: k,
        values: { ...E }
      })));
    }
    (K.shouldDirty || K.shouldTouch) && ot(k, he, K.shouldTouch, K.shouldDirty, !0), K.shouldValidate && V(k);
  }, ct = (k, B, K) => {
    for (const Ce in B) {
      const he = B[Ce], ue = `${k}.${Ce}`, Fe = $e(S, ue);
      (D.array.has(k) || !Iy(he) || Fe && !Fe._f) && !rd(he) ? ct(ue, he, K) : bt(ue, he, K);
    }
  }, At = (k, B, K = {}) => {
    const Ce = $e(S, k), he = D.array.has(k), ue = ri(B);
    bn(E, k, ue), he ? (A.array.next({
      name: k,
      values: { ...E }
    }), (G.isDirty || G.dirtyFields) && K.shouldDirty && A.state.next({
      name: k,
      dirtyFields: jy(b, E),
      isDirty: be(k, ue)
    })) : Ce && !Ce._f && !Ca(ue) ? ct(k, ue, K) : bt(k, ue, K), lx(k, D) && A.state.next({ ...p }), A.values.next({
      name: y.mount ? k : void 0,
      values: { ...E }
    });
  }, ve = async (k) => {
    y.mount = !0;
    const B = k.target;
    let K = B.name, Ce = !0;
    const he = $e(S, K), ue = () => B.type ? HC(he._f) : hA(k), Fe = (gt) => {
      Ce = Number.isNaN(gt) || zu(gt, $e(E, K, gt));
    };
    if (he) {
      let gt, $t;
      const Rt = ue(), Dn = k.type === ax.BLUR || k.type === ax.FOCUS_OUT, li = !MA(he._f) && !v.resolver && !$e(p.errors, K) && !he._f.deps || NA(Dn, $e(p.touchedFields, K), p.isSubmitted, q, z), Or = lx(K, D, Dn);
      bn(E, K, Rt), Dn ? (he._f.onBlur && he._f.onBlur(k), U && U(0)) : he._f.onChange && he._f.onChange(k);
      const Ee = ot(K, Rt, Dn, !1), Xe = !Ya(Ee) || Or;
      if (!Dn && A.values.next({
        name: K,
        type: k.type,
        values: { ...E }
      }), li)
        return G.isValid && (s.mode === "onBlur" ? Dn && de() : de()), Xe && A.state.next({ name: K, ...Or ? {} : Ee });
      if (!Dn && Or && A.state.next({ ...p }), v.resolver) {
        const { errors: Tt } = await xt([K]);
        if (Fe(Rt), Ce) {
          const Pt = px(p.errors, S, K), nn = px(Tt, S, Pt.name || K);
          gt = nn.error, K = nn.name, $t = Ya(Tt);
        }
      } else
        Ue([K], !0), gt = (await fx(he, E, ee, v.shouldUseNativeValidation))[K], Ue([K]), Fe(Rt), Ce && (gt ? $t = !1 : G.isValid && ($t = await pe(S, !0)));
      Ce && (he._f.deps && V(he._f.deps), Ke(K, $t, gt, Ee));
    }
  }, Pe = (k, B) => {
    if ($e(p.errors, B) && k.focus)
      return k.focus(), 1;
  }, V = async (k, B = {}) => {
    let K, Ce;
    const he = Tv(k);
    if (v.resolver) {
      const ue = await R(Xn(k) ? k : he);
      K = Ya(ue), Ce = k ? !he.some((Fe) => $e(ue, Fe)) : K;
    } else k ? (Ce = (await Promise.all(he.map(async (ue) => {
      const Fe = $e(S, ue);
      return await pe(Fe && Fe._f ? { [ue]: Fe } : Fe);
    }))).every(Boolean), !(!Ce && !p.isValid) && de()) : Ce = K = await pe(S);
    return A.state.next({
      ...!Al(k) || G.isValid && K !== p.isValid ? {} : { name: k },
      ...v.resolver || !k ? { isValid: K } : {},
      errors: p.errors
    }), B.shouldFocus && !Ce && xv(S, Pe, k ? he : D.mount), Ce;
  }, se = (k) => {
    const B = {
      ...y.mount ? E : b
    };
    return Xn(k) ? B : Al(k) ? $e(B, k) : k.map((K) => $e(B, K));
  }, De = (k, B) => ({
    invalid: !!$e((B || p).errors, k),
    isDirty: !!$e((B || p).dirtyFields, k),
    error: $e((B || p).errors, k),
    isValidating: !!$e(p.validatingFields, k),
    isTouched: !!$e((B || p).touchedFields, k)
  }), et = (k) => {
    k && Tv(k).forEach((B) => br(p.errors, B)), A.state.next({
      errors: k ? p.errors : {}
    });
  }, Qe = (k, B, K) => {
    const Ce = ($e(S, k, { _f: {} })._f || {}).ref, he = $e(p.errors, k) || {}, { ref: ue, message: Fe, type: gt, ...$t } = he;
    bn(p.errors, k, {
      ...$t,
      ...B,
      ref: Ce
    }), A.state.next({
      name: k,
      errors: p.errors,
      isValid: !1
    }), K && K.shouldFocus && Ce && Ce.focus && Ce.focus();
  }, ht = (k, B) => xo(k) ? A.values.subscribe({
    next: (K) => k(ye(void 0, B), K)
  }) : ye(k, B, !0), Ie = (k, B = {}) => {
    for (const K of k ? Tv(k) : D.mount)
      D.mount.delete(K), D.array.delete(K), B.keepValue || (br(S, K), br(E, K)), !B.keepError && br(p.errors, K), !B.keepDirty && br(p.dirtyFields, K), !B.keepTouched && br(p.touchedFields, K), !B.keepIsValidating && br(p.validatingFields, K), !v.shouldUnregister && !B.keepDefaultValue && br(b, K);
    A.values.next({
      values: { ...E }
    }), A.state.next({
      ...p,
      ...B.keepDirty ? { isDirty: be() } : {}
    }), !B.keepIsValid && de();
  }, at = ({ disabled: k, name: B, field: K, fields: Ce, value: he }) => {
    if (Ol(k) && y.mount || k) {
      const ue = k ? void 0 : Xn(he) ? HC(K ? K._f : $e(Ce, B)._f) : he;
      bn(E, B, ue), ot(B, ue, !1, !1, !0);
    }
  }, rt = (k, B = {}) => {
    let K = $e(S, k);
    const Ce = Ol(B.disabled) || Ol(s.disabled);
    return bn(S, k, {
      ...K || {},
      _f: {
        ...K && K._f ? K._f : { ref: { name: k } },
        name: k,
        mount: !0,
        ...B
      }
    }), D.mount.add(k), K ? at({
      field: K,
      disabled: Ol(B.disabled) ? B.disabled : s.disabled,
      name: k,
      value: B.value
    }) : Q(k, !0, B.value), {
      ...Ce ? { disabled: B.disabled || s.disabled } : {},
      ...v.progressive ? {
        required: !!B.required,
        min: gv(B.min),
        max: gv(B.max),
        minLength: gv(B.minLength),
        maxLength: gv(B.maxLength),
        pattern: gv(B.pattern)
      } : {},
      name: k,
      onChange: ve,
      onBlur: ve,
      ref: (he) => {
        if (he) {
          rt(k, B), K = $e(S, k);
          const ue = Xn(he.value) && he.querySelectorAll && he.querySelectorAll("input,select,textarea")[0] || he, Fe = DA(ue), gt = K._f.refs || [];
          if (Fe ? gt.find(($t) => $t === ue) : ue === K._f.ref)
            return;
          bn(S, k, {
            _f: {
              ...K._f,
              ...Fe ? {
                refs: [
                  ...gt.filter(VC),
                  ue,
                  ...Array.isArray($e(b, k)) ? [{}] : []
                ],
                ref: { type: ue.type, name: k }
              } : { ref: ue }
            }
          }), Q(k, !1, void 0, ue);
        } else
          K = $e(S, k, {}), K._f && (K._f.mount = !1), (v.shouldUnregister || B.shouldUnregister) && !(yA(D.array, k) && y.action) && D.unMount.add(k);
      }
    };
  }, pt = () => v.shouldFocusError && xv(S, Pe, D.mount), mt = (k) => {
    Ol(k) && (A.state.next({ disabled: k }), xv(S, (B, K) => {
      const Ce = $e(S, K);
      Ce && (B.disabled = Ce._f.disabled || k, Array.isArray(Ce._f.refs) && Ce._f.refs.forEach((he) => {
        he.disabled = Ce._f.disabled || k;
      }));
    }, 0, !1));
  }, zt = (k, B) => async (K) => {
    let Ce;
    K && (K.preventDefault && K.preventDefault(), K.persist && K.persist());
    let he = ri(E);
    if (A.state.next({
      isSubmitting: !0
    }), v.resolver) {
      const { errors: ue, values: Fe } = await xt();
      p.errors = ue, he = Fe;
    } else
      await pe(S);
    if (br(p.errors, "root"), Ya(p.errors)) {
      A.state.next({
        errors: {}
      });
      try {
        await k(he, K);
      } catch (ue) {
        Ce = ue;
      }
    } else
      B && await B({ ...p.errors }, K), pt(), setTimeout(pt);
    if (A.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: Ya(p.errors) && !Ce,
      submitCount: p.submitCount + 1,
      errors: p.errors
    }), Ce)
      throw Ce;
  }, Se = (k, B = {}) => {
    $e(S, k) && (Xn(B.defaultValue) ? At(k, ri($e(b, k))) : (At(k, B.defaultValue), bn(b, k, ri(B.defaultValue))), B.keepTouched || br(p.touchedFields, k), B.keepDirty || (br(p.dirtyFields, k), p.isDirty = B.defaultValue ? be(k, ri($e(b, k))) : be()), B.keepError || (br(p.errors, k), G.isValid && de()), A.state.next({ ...p }));
  }, Ft = (k, B = {}) => {
    const K = k ? ri(k) : b, Ce = ri(K), he = Ya(k), ue = he ? b : Ce;
    if (B.keepDefaultValues || (b = K), !B.keepValues) {
      if (B.keepDirtyValues)
        for (const Fe of D.mount)
          $e(p.dirtyFields, Fe) ? bn(ue, Fe, $e(E, Fe)) : At(Fe, $e(ue, Fe));
      else {
        if (aE && Xn(k))
          for (const Fe of D.mount) {
            const gt = $e(S, Fe);
            if (gt && gt._f) {
              const $t = Array.isArray(gt._f.refs) ? gt._f.refs[0] : gt._f.ref;
              if (By($t)) {
                const Rt = $t.closest("form");
                if (Rt) {
                  Rt.reset();
                  break;
                }
              }
            }
          }
        S = {};
      }
      E = s.shouldUnregister ? B.keepDefaultValues ? ri(b) : {} : ri(ue), A.array.next({
        values: { ...ue }
      }), A.values.next({
        values: { ...ue }
      });
    }
    D = {
      mount: B.keepDirtyValues ? D.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, y.mount = !G.isValid || !!B.keepIsValid || !!B.keepDirtyValues, y.watch = !!s.shouldUnregister, A.state.next({
      submitCount: B.keepSubmitCount ? p.submitCount : 0,
      isDirty: he ? !1 : B.keepDirty ? p.isDirty : !!(B.keepDefaultValues && !zu(k, b)),
      isSubmitted: B.keepIsSubmitted ? p.isSubmitted : !1,
      dirtyFields: he ? {} : B.keepDirtyValues ? B.keepDefaultValues && E ? jy(b, E) : p.dirtyFields : B.keepDefaultValues && k ? jy(b, k) : B.keepDirty ? p.dirtyFields : {},
      touchedFields: B.keepTouched ? p.touchedFields : {},
      errors: B.keepErrors ? p.errors : {},
      isSubmitSuccessful: B.keepIsSubmitSuccessful ? p.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, vn = (k, B) => Ft(xo(k) ? k(E) : k, B);
  return {
    control: {
      register: rt,
      unregister: Ie,
      getFieldState: De,
      handleSubmit: zt,
      setError: Qe,
      _executeSchema: xt,
      _getWatch: ye,
      _getDirty: be,
      _updateValid: de,
      _removeUnmounted: Ne,
      _updateFieldArray: ge,
      _updateDisabledField: at,
      _getFieldArray: Le,
      _reset: Ft,
      _resetDefaultValues: () => xo(v.defaultValues) && v.defaultValues().then((k) => {
        vn(k, v.resetOptions), A.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (k) => {
        p = {
          ...p,
          ...k
        };
      },
      _disableForm: mt,
      _subjects: A,
      _proxyFormState: G,
      _setErrors: _e,
      get _fields() {
        return S;
      },
      get _formValues() {
        return E;
      },
      get _state() {
        return y;
      },
      set _state(k) {
        y = k;
      },
      get _defaultValues() {
        return b;
      },
      get _names() {
        return D;
      },
      set _names(k) {
        D = k;
      },
      get _formState() {
        return p;
      },
      set _formState(k) {
        p = k;
      },
      get _options() {
        return v;
      },
      set _options(k) {
        v = {
          ...v,
          ...k
        };
      }
    },
    trigger: V,
    register: rt,
    handleSubmit: zt,
    watch: ht,
    setValue: At,
    getValues: se,
    reset: vn,
    resetField: Se,
    clearErrors: et,
    unregister: Ie,
    setError: Qe,
    setFocus: (k, B = {}) => {
      const K = $e(S, k), Ce = K && K._f;
      if (Ce) {
        const he = Ce.refs ? Ce.refs[0] : Ce.ref;
        he.focus && (he.focus(), B.shouldSelect && he.select());
      }
    },
    getFieldState: De
  };
}
function FA(s = {}) {
  const v = $n.useRef(), p = $n.useRef(), [S, b] = $n.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: xo(s.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: s.errors || {},
    disabled: s.disabled || !1,
    defaultValues: xo(s.defaultValues) ? void 0 : s.defaultValues
  });
  v.current || (v.current = {
    ...zA(s),
    formState: S
  });
  const E = v.current.control;
  return E._options = s, Fx({
    subject: E._subjects.state,
    next: (y) => {
      bA(y, E._proxyFormState, E._updateFormState) && b({ ...E._formState });
    }
  }), $n.useEffect(() => E._disableForm(s.disabled), [E, s.disabled]), $n.useEffect(() => {
    if (E._proxyFormState.isDirty) {
      const y = E._getDirty();
      y !== S.isDirty && E._subjects.state.next({
        isDirty: y
      });
    }
  }, [E, S.isDirty]), $n.useEffect(() => {
    s.values && !zu(s.values, p.current) ? (E._reset(s.values, E._options.resetOptions), p.current = s.values, b((y) => ({ ...y }))) : E._resetDefaultValues();
  }, [s.values, E]), $n.useEffect(() => {
    s.errors && E._setErrors(s.errors);
  }, [s.errors, E]), $n.useEffect(() => {
    E._state.mount || (E._updateValid(), E._state.mount = !0), E._state.watch && (E._state.watch = !1, E._subjects.state.next({ ...E._formState })), E._removeUnmounted();
  }), $n.useEffect(() => {
    s.shouldUnregister && E._subjects.values.next({
      values: E._getWatch()
    });
  }, [s.shouldUnregister, E]), v.current.formState = EA(S, E), v.current;
}
const jA = ({ handleOnSubmit: s }) => {
  const {
    register: v,
    handleSubmit: p,
    formState: { errors: S },
    control: b
  } = FA(), E = (D) => {
    console.log("Internal submit from Form component:", D);
    const U = { type: "onSubmitForm", payload: D };
    window.postMessage(U, window.location.origin), s && s(D);
  }, y = xA({ control: b, name: "name" });
  return $O(() => {
    console.log("useEffect name updated", y);
  }, [y]), /* @__PURE__ */ Bn.jsxs("form", { onSubmit: p(E), children: [
    /* @__PURE__ */ Bn.jsxs("div", { children: [
      /* @__PURE__ */ Bn.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ Bn.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...v("name", { required: "Este campo es requerido" })
        }
      ),
      S.name && /* @__PURE__ */ Bn.jsx("span", { children: S.name.message })
    ] }),
    /* @__PURE__ */ Bn.jsxs("div", { children: [
      /* @__PURE__ */ Bn.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ Bn.jsx(
        "input",
        {
          id: "email",
          type: "email",
          ...v("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo electrónico no válido"
            }
          })
        }
      ),
      S.email && /* @__PURE__ */ Bn.jsx("span", { children: S.email.message })
    ] }),
    /* @__PURE__ */ Bn.jsx("button", { type: "submit", children: "Enviar" })
  ] });
}, VA = "_form-container_cx8oy_1", HA = "_cs-input_cx8oy_49", Yx = {
  "form-container": "_form-container_cx8oy_1",
  formContainer: VA,
  "cs-input": "_cs-input_cx8oy_49",
  csInput: HA
}, PA = ({
  id: s,
  name: v,
  label: p,
  placeholder: S,
  value: b,
  onChange: E,
  required: y
}) => /* @__PURE__ */ Bn.jsxs("div", { className: Yx["cs-input"], children: [
  /* @__PURE__ */ Bn.jsx(
    "input",
    {
      type: "text",
      id: s,
      name: v,
      placeholder: S,
      value: b,
      onChange: (D) => E && E(D.target.value),
      required: y
    }
  ),
  p && /* @__PURE__ */ Bn.jsx("label", { htmlFor: s, style: { marginRight: 8 }, children: p })
] }), BA = ({
  fields: s,
  // layout,
  // gridTemplateColumns,
  onSubmit: v
}) => {
  const [p, S] = IO({}), b = (E) => {
    E.preventDefault(), v(p);
  };
  return /* @__PURE__ */ Bn.jsxs("form", { onSubmit: b, className: Yx["form-container"], children: [
    s.map((E, y) => {
      switch (E.type) {
        case "text":
          return /* @__PURE__ */ Bn.jsx(
            PA,
            {
              id: E.id,
              name: E.name,
              label: E.label,
              placeholder: E.placeholder,
              required: !0,
              value: p[E.name],
              onChange: (D) => {
                S((U) => ({ ...U, [E.name]: D }));
              }
            },
            y
          );
        default:
          return null;
      }
    }),
    /* @__PURE__ */ Bn.jsx("button", { type: "submit", children: "Submit" })
  ] });
}, $A = ({ formConfig: s, onSubmit: v }) => /* @__PURE__ */ Bn.jsx(
  BA,
  {
    fields: s.fields,
    layout: s.layout,
    gridTemplateColumns: s.gridTemplateColumns,
    onSubmit: v
  }
);
function ju(s) {
  let v = "https://mui.com/production-error/?code=" + s;
  for (let p = 1; p < arguments.length; p += 1)
    v += "&args[]=" + encodeURIComponent(arguments[p]);
  return "Minified MUI error #" + s + "; visit " + v + " for the full message.";
}
var ZC = { exports: {} }, Jt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var vx;
function IA() {
  if (vx) return Jt;
  vx = 1;
  var s = typeof Symbol == "function" && Symbol.for, v = s ? Symbol.for("react.element") : 60103, p = s ? Symbol.for("react.portal") : 60106, S = s ? Symbol.for("react.fragment") : 60107, b = s ? Symbol.for("react.strict_mode") : 60108, E = s ? Symbol.for("react.profiler") : 60114, y = s ? Symbol.for("react.provider") : 60109, D = s ? Symbol.for("react.context") : 60110, U = s ? Symbol.for("react.async_mode") : 60111, j = s ? Symbol.for("react.concurrent_mode") : 60111, G = s ? Symbol.for("react.forward_ref") : 60112, A = s ? Symbol.for("react.suspense") : 60113, z = s ? Symbol.for("react.suspense_list") : 60120, q = s ? Symbol.for("react.memo") : 60115, ee = s ? Symbol.for("react.lazy") : 60116, re = s ? Symbol.for("react.block") : 60121, de = s ? Symbol.for("react.fundamental") : 60117, Ue = s ? Symbol.for("react.responder") : 60118, ge = s ? Symbol.for("react.scope") : 60119;
  function ne(Q) {
    if (typeof Q == "object" && Q !== null) {
      var ot = Q.$$typeof;
      switch (ot) {
        case v:
          switch (Q = Q.type, Q) {
            case U:
            case j:
            case S:
            case E:
            case b:
            case A:
              return Q;
            default:
              switch (Q = Q && Q.$$typeof, Q) {
                case D:
                case G:
                case ee:
                case q:
                case y:
                  return Q;
                default:
                  return ot;
              }
          }
        case p:
          return ot;
      }
    }
  }
  function _e(Q) {
    return ne(Q) === j;
  }
  return Jt.AsyncMode = U, Jt.ConcurrentMode = j, Jt.ContextConsumer = D, Jt.ContextProvider = y, Jt.Element = v, Jt.ForwardRef = G, Jt.Fragment = S, Jt.Lazy = ee, Jt.Memo = q, Jt.Portal = p, Jt.Profiler = E, Jt.StrictMode = b, Jt.Suspense = A, Jt.isAsyncMode = function(Q) {
    return _e(Q) || ne(Q) === U;
  }, Jt.isConcurrentMode = _e, Jt.isContextConsumer = function(Q) {
    return ne(Q) === D;
  }, Jt.isContextProvider = function(Q) {
    return ne(Q) === y;
  }, Jt.isElement = function(Q) {
    return typeof Q == "object" && Q !== null && Q.$$typeof === v;
  }, Jt.isForwardRef = function(Q) {
    return ne(Q) === G;
  }, Jt.isFragment = function(Q) {
    return ne(Q) === S;
  }, Jt.isLazy = function(Q) {
    return ne(Q) === ee;
  }, Jt.isMemo = function(Q) {
    return ne(Q) === q;
  }, Jt.isPortal = function(Q) {
    return ne(Q) === p;
  }, Jt.isProfiler = function(Q) {
    return ne(Q) === E;
  }, Jt.isStrictMode = function(Q) {
    return ne(Q) === b;
  }, Jt.isSuspense = function(Q) {
    return ne(Q) === A;
  }, Jt.isValidElementType = function(Q) {
    return typeof Q == "string" || typeof Q == "function" || Q === S || Q === j || Q === E || Q === b || Q === A || Q === z || typeof Q == "object" && Q !== null && (Q.$$typeof === ee || Q.$$typeof === q || Q.$$typeof === y || Q.$$typeof === D || Q.$$typeof === G || Q.$$typeof === de || Q.$$typeof === Ue || Q.$$typeof === ge || Q.$$typeof === re);
  }, Jt.typeOf = ne, Jt;
}
var Zt = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hx;
function YA() {
  return hx || (hx = 1, process.env.NODE_ENV !== "production" && function() {
    var s = typeof Symbol == "function" && Symbol.for, v = s ? Symbol.for("react.element") : 60103, p = s ? Symbol.for("react.portal") : 60106, S = s ? Symbol.for("react.fragment") : 60107, b = s ? Symbol.for("react.strict_mode") : 60108, E = s ? Symbol.for("react.profiler") : 60114, y = s ? Symbol.for("react.provider") : 60109, D = s ? Symbol.for("react.context") : 60110, U = s ? Symbol.for("react.async_mode") : 60111, j = s ? Symbol.for("react.concurrent_mode") : 60111, G = s ? Symbol.for("react.forward_ref") : 60112, A = s ? Symbol.for("react.suspense") : 60113, z = s ? Symbol.for("react.suspense_list") : 60120, q = s ? Symbol.for("react.memo") : 60115, ee = s ? Symbol.for("react.lazy") : 60116, re = s ? Symbol.for("react.block") : 60121, de = s ? Symbol.for("react.fundamental") : 60117, Ue = s ? Symbol.for("react.responder") : 60118, ge = s ? Symbol.for("react.scope") : 60119;
    function ne(Se) {
      return typeof Se == "string" || typeof Se == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      Se === S || Se === j || Se === E || Se === b || Se === A || Se === z || typeof Se == "object" && Se !== null && (Se.$$typeof === ee || Se.$$typeof === q || Se.$$typeof === y || Se.$$typeof === D || Se.$$typeof === G || Se.$$typeof === de || Se.$$typeof === Ue || Se.$$typeof === ge || Se.$$typeof === re);
    }
    function _e(Se) {
      if (typeof Se == "object" && Se !== null) {
        var Ft = Se.$$typeof;
        switch (Ft) {
          case v:
            var vn = Se.type;
            switch (vn) {
              case U:
              case j:
              case S:
              case E:
              case b:
              case A:
                return vn;
              default:
                var kn = vn && vn.$$typeof;
                switch (kn) {
                  case D:
                  case G:
                  case ee:
                  case q:
                  case y:
                    return kn;
                  default:
                    return Ft;
                }
            }
          case p:
            return Ft;
        }
      }
    }
    var Q = U, ot = j, Ke = D, xt = y, R = v, pe = G, Ne = S, be = ee, ye = q, Le = p, bt = E, ct = b, At = A, ve = !1;
    function Pe(Se) {
      return ve || (ve = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), V(Se) || _e(Se) === U;
    }
    function V(Se) {
      return _e(Se) === j;
    }
    function se(Se) {
      return _e(Se) === D;
    }
    function De(Se) {
      return _e(Se) === y;
    }
    function et(Se) {
      return typeof Se == "object" && Se !== null && Se.$$typeof === v;
    }
    function Qe(Se) {
      return _e(Se) === G;
    }
    function ht(Se) {
      return _e(Se) === S;
    }
    function Ie(Se) {
      return _e(Se) === ee;
    }
    function at(Se) {
      return _e(Se) === q;
    }
    function rt(Se) {
      return _e(Se) === p;
    }
    function pt(Se) {
      return _e(Se) === E;
    }
    function mt(Se) {
      return _e(Se) === b;
    }
    function zt(Se) {
      return _e(Se) === A;
    }
    Zt.AsyncMode = Q, Zt.ConcurrentMode = ot, Zt.ContextConsumer = Ke, Zt.ContextProvider = xt, Zt.Element = R, Zt.ForwardRef = pe, Zt.Fragment = Ne, Zt.Lazy = be, Zt.Memo = ye, Zt.Portal = Le, Zt.Profiler = bt, Zt.StrictMode = ct, Zt.Suspense = At, Zt.isAsyncMode = Pe, Zt.isConcurrentMode = V, Zt.isContextConsumer = se, Zt.isContextProvider = De, Zt.isElement = et, Zt.isForwardRef = Qe, Zt.isFragment = ht, Zt.isLazy = Ie, Zt.isMemo = at, Zt.isPortal = rt, Zt.isProfiler = pt, Zt.isStrictMode = mt, Zt.isSuspense = zt, Zt.isValidElementType = ne, Zt.typeOf = _e;
  }()), Zt;
}
process.env.NODE_ENV === "production" ? ZC.exports = IA() : ZC.exports = YA();
var Wx = ZC.exports, eE = { exports: {} };
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var PC, mx;
function WA() {
  if (mx) return PC;
  mx = 1;
  var s = Object.getOwnPropertySymbols, v = Object.prototype.hasOwnProperty, p = Object.prototype.propertyIsEnumerable;
  function S(E) {
    if (E == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(E);
  }
  function b() {
    try {
      if (!Object.assign)
        return !1;
      var E = new String("abc");
      if (E[5] = "de", Object.getOwnPropertyNames(E)[0] === "5")
        return !1;
      for (var y = {}, D = 0; D < 10; D++)
        y["_" + String.fromCharCode(D)] = D;
      var U = Object.getOwnPropertyNames(y).map(function(G) {
        return y[G];
      });
      if (U.join("") !== "0123456789")
        return !1;
      var j = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(G) {
        j[G] = G;
      }), Object.keys(Object.assign({}, j)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return PC = b() ? Object.assign : function(E, y) {
    for (var D, U = S(E), j, G = 1; G < arguments.length; G++) {
      D = Object(arguments[G]);
      for (var A in D)
        v.call(D, A) && (U[A] = D[A]);
      if (s) {
        j = s(D);
        for (var z = 0; z < j.length; z++)
          p.call(D, j[z]) && (U[j[z]] = D[j[z]]);
      }
    }
    return U;
  }, PC;
}
var BC, yx;
function uE() {
  if (yx) return BC;
  yx = 1;
  var s = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return BC = s, BC;
}
var $C, gx;
function Qx() {
  return gx || (gx = 1, $C = Function.call.bind(Object.prototype.hasOwnProperty)), $C;
}
var IC, Sx;
function QA() {
  if (Sx) return IC;
  Sx = 1;
  var s = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var v = uE(), p = {}, S = Qx();
    s = function(E) {
      var y = "Warning: " + E;
      typeof console < "u" && console.error(y);
      try {
        throw new Error(y);
      } catch {
      }
    };
  }
  function b(E, y, D, U, j) {
    if (process.env.NODE_ENV !== "production") {
      for (var G in E)
        if (S(E, G)) {
          var A;
          try {
            if (typeof E[G] != "function") {
              var z = Error(
                (U || "React class") + ": " + D + " type `" + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[G] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw z.name = "Invariant Violation", z;
            }
            A = E[G](y, G, U, D, null, v);
          } catch (ee) {
            A = ee;
          }
          if (A && !(A instanceof Error) && s(
            (U || "React class") + ": type specification of " + D + " `" + G + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof A + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), A instanceof Error && !(A.message in p)) {
            p[A.message] = !0;
            var q = j ? j() : "";
            s(
              "Failed " + D + " type: " + A.message + (q ?? "")
            );
          }
        }
    }
  }
  return b.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (p = {});
  }, IC = b, IC;
}
var YC, Cx;
function GA() {
  if (Cx) return YC;
  Cx = 1;
  var s = Wx, v = WA(), p = uE(), S = Qx(), b = QA(), E = function() {
  };
  process.env.NODE_ENV !== "production" && (E = function(D) {
    var U = "Warning: " + D;
    typeof console < "u" && console.error(U);
    try {
      throw new Error(U);
    } catch {
    }
  });
  function y() {
    return null;
  }
  return YC = function(D, U) {
    var j = typeof Symbol == "function" && Symbol.iterator, G = "@@iterator";
    function A(V) {
      var se = V && (j && V[j] || V[G]);
      if (typeof se == "function")
        return se;
    }
    var z = "<<anonymous>>", q = {
      array: Ue("array"),
      bigint: Ue("bigint"),
      bool: Ue("boolean"),
      func: Ue("function"),
      number: Ue("number"),
      object: Ue("object"),
      string: Ue("string"),
      symbol: Ue("symbol"),
      any: ge(),
      arrayOf: ne,
      element: _e(),
      elementType: Q(),
      instanceOf: ot,
      node: pe(),
      objectOf: xt,
      oneOf: Ke,
      oneOfType: R,
      shape: be,
      exact: ye
    };
    function ee(V, se) {
      return V === se ? V !== 0 || 1 / V === 1 / se : V !== V && se !== se;
    }
    function re(V, se) {
      this.message = V, this.data = se && typeof se == "object" ? se : {}, this.stack = "";
    }
    re.prototype = Error.prototype;
    function de(V) {
      if (process.env.NODE_ENV !== "production")
        var se = {}, De = 0;
      function et(ht, Ie, at, rt, pt, mt, zt) {
        if (rt = rt || z, mt = mt || at, zt !== p) {
          if (U) {
            var Se = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw Se.name = "Invariant Violation", Se;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ft = rt + ":" + at;
            !se[Ft] && // Avoid spamming the console because they are often not actionable except for lib authors
            De < 3 && (E(
              "You are manually calling a React.PropTypes validation function for the `" + mt + "` prop on `" + rt + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), se[Ft] = !0, De++);
          }
        }
        return Ie[at] == null ? ht ? Ie[at] === null ? new re("The " + pt + " `" + mt + "` is marked as required " + ("in `" + rt + "`, but its value is `null`.")) : new re("The " + pt + " `" + mt + "` is marked as required in " + ("`" + rt + "`, but its value is `undefined`.")) : null : V(Ie, at, rt, pt, mt);
      }
      var Qe = et.bind(null, !1);
      return Qe.isRequired = et.bind(null, !0), Qe;
    }
    function Ue(V) {
      function se(De, et, Qe, ht, Ie, at) {
        var rt = De[et], pt = ct(rt);
        if (pt !== V) {
          var mt = At(rt);
          return new re(
            "Invalid " + ht + " `" + Ie + "` of type " + ("`" + mt + "` supplied to `" + Qe + "`, expected ") + ("`" + V + "`."),
            { expectedType: V }
          );
        }
        return null;
      }
      return de(se);
    }
    function ge() {
      return de(y);
    }
    function ne(V) {
      function se(De, et, Qe, ht, Ie) {
        if (typeof V != "function")
          return new re("Property `" + Ie + "` of component `" + Qe + "` has invalid PropType notation inside arrayOf.");
        var at = De[et];
        if (!Array.isArray(at)) {
          var rt = ct(at);
          return new re("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Qe + "`, expected an array."));
        }
        for (var pt = 0; pt < at.length; pt++) {
          var mt = V(at, pt, Qe, ht, Ie + "[" + pt + "]", p);
          if (mt instanceof Error)
            return mt;
        }
        return null;
      }
      return de(se);
    }
    function _e() {
      function V(se, De, et, Qe, ht) {
        var Ie = se[De];
        if (!D(Ie)) {
          var at = ct(Ie);
          return new re("Invalid " + Qe + " `" + ht + "` of type " + ("`" + at + "` supplied to `" + et + "`, expected a single ReactElement."));
        }
        return null;
      }
      return de(V);
    }
    function Q() {
      function V(se, De, et, Qe, ht) {
        var Ie = se[De];
        if (!s.isValidElementType(Ie)) {
          var at = ct(Ie);
          return new re("Invalid " + Qe + " `" + ht + "` of type " + ("`" + at + "` supplied to `" + et + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return de(V);
    }
    function ot(V) {
      function se(De, et, Qe, ht, Ie) {
        if (!(De[et] instanceof V)) {
          var at = V.name || z, rt = Pe(De[et]);
          return new re("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Qe + "`, expected ") + ("instance of `" + at + "`."));
        }
        return null;
      }
      return de(se);
    }
    function Ke(V) {
      if (!Array.isArray(V))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? E(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : E("Invalid argument supplied to oneOf, expected an array.")), y;
      function se(De, et, Qe, ht, Ie) {
        for (var at = De[et], rt = 0; rt < V.length; rt++)
          if (ee(at, V[rt]))
            return null;
        var pt = JSON.stringify(V, function(zt, Se) {
          var Ft = At(Se);
          return Ft === "symbol" ? String(Se) : Se;
        });
        return new re("Invalid " + ht + " `" + Ie + "` of value `" + String(at) + "` " + ("supplied to `" + Qe + "`, expected one of " + pt + "."));
      }
      return de(se);
    }
    function xt(V) {
      function se(De, et, Qe, ht, Ie) {
        if (typeof V != "function")
          return new re("Property `" + Ie + "` of component `" + Qe + "` has invalid PropType notation inside objectOf.");
        var at = De[et], rt = ct(at);
        if (rt !== "object")
          return new re("Invalid " + ht + " `" + Ie + "` of type " + ("`" + rt + "` supplied to `" + Qe + "`, expected an object."));
        for (var pt in at)
          if (S(at, pt)) {
            var mt = V(at, pt, Qe, ht, Ie + "." + pt, p);
            if (mt instanceof Error)
              return mt;
          }
        return null;
      }
      return de(se);
    }
    function R(V) {
      if (!Array.isArray(V))
        return process.env.NODE_ENV !== "production" && E("Invalid argument supplied to oneOfType, expected an instance of array."), y;
      for (var se = 0; se < V.length; se++) {
        var De = V[se];
        if (typeof De != "function")
          return E(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ve(De) + " at index " + se + "."
          ), y;
      }
      function et(Qe, ht, Ie, at, rt) {
        for (var pt = [], mt = 0; mt < V.length; mt++) {
          var zt = V[mt], Se = zt(Qe, ht, Ie, at, rt, p);
          if (Se == null)
            return null;
          Se.data && S(Se.data, "expectedType") && pt.push(Se.data.expectedType);
        }
        var Ft = pt.length > 0 ? ", expected one of type [" + pt.join(", ") + "]" : "";
        return new re("Invalid " + at + " `" + rt + "` supplied to " + ("`" + Ie + "`" + Ft + "."));
      }
      return de(et);
    }
    function pe() {
      function V(se, De, et, Qe, ht) {
        return Le(se[De]) ? null : new re("Invalid " + Qe + " `" + ht + "` supplied to " + ("`" + et + "`, expected a ReactNode."));
      }
      return de(V);
    }
    function Ne(V, se, De, et, Qe) {
      return new re(
        (V || "React class") + ": " + se + " type `" + De + "." + et + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + Qe + "`."
      );
    }
    function be(V) {
      function se(De, et, Qe, ht, Ie) {
        var at = De[et], rt = ct(at);
        if (rt !== "object")
          return new re("Invalid " + ht + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Qe + "`, expected `object`."));
        for (var pt in V) {
          var mt = V[pt];
          if (typeof mt != "function")
            return Ne(Qe, ht, Ie, pt, At(mt));
          var zt = mt(at, pt, Qe, ht, Ie + "." + pt, p);
          if (zt)
            return zt;
        }
        return null;
      }
      return de(se);
    }
    function ye(V) {
      function se(De, et, Qe, ht, Ie) {
        var at = De[et], rt = ct(at);
        if (rt !== "object")
          return new re("Invalid " + ht + " `" + Ie + "` of type `" + rt + "` " + ("supplied to `" + Qe + "`, expected `object`."));
        var pt = v({}, De[et], V);
        for (var mt in pt) {
          var zt = V[mt];
          if (S(V, mt) && typeof zt != "function")
            return Ne(Qe, ht, Ie, mt, At(zt));
          if (!zt)
            return new re(
              "Invalid " + ht + " `" + Ie + "` key `" + mt + "` supplied to `" + Qe + "`.\nBad object: " + JSON.stringify(De[et], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(V), null, "  ")
            );
          var Se = zt(at, mt, Qe, ht, Ie + "." + mt, p);
          if (Se)
            return Se;
        }
        return null;
      }
      return de(se);
    }
    function Le(V) {
      switch (typeof V) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !V;
        case "object":
          if (Array.isArray(V))
            return V.every(Le);
          if (V === null || D(V))
            return !0;
          var se = A(V);
          if (se) {
            var De = se.call(V), et;
            if (se !== V.entries) {
              for (; !(et = De.next()).done; )
                if (!Le(et.value))
                  return !1;
            } else
              for (; !(et = De.next()).done; ) {
                var Qe = et.value;
                if (Qe && !Le(Qe[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function bt(V, se) {
      return V === "symbol" ? !0 : se ? se["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && se instanceof Symbol : !1;
    }
    function ct(V) {
      var se = typeof V;
      return Array.isArray(V) ? "array" : V instanceof RegExp ? "object" : bt(se, V) ? "symbol" : se;
    }
    function At(V) {
      if (typeof V > "u" || V === null)
        return "" + V;
      var se = ct(V);
      if (se === "object") {
        if (V instanceof Date)
          return "date";
        if (V instanceof RegExp)
          return "regexp";
      }
      return se;
    }
    function ve(V) {
      var se = At(V);
      switch (se) {
        case "array":
        case "object":
          return "an " + se;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + se;
        default:
          return se;
      }
    }
    function Pe(V) {
      return !V.constructor || !V.constructor.name ? z : V.constructor.name;
    }
    return q.checkPropTypes = b, q.resetWarningCache = b.resetWarningCache, q.PropTypes = q, q;
  }, YC;
}
var WC, Ex;
function qA() {
  if (Ex) return WC;
  Ex = 1;
  var s = uE();
  function v() {
  }
  function p() {
  }
  return p.resetWarningCache = v, WC = function() {
    function S(y, D, U, j, G, A) {
      if (A !== s) {
        var z = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw z.name = "Invariant Violation", z;
      }
    }
    S.isRequired = S;
    function b() {
      return S;
    }
    var E = {
      array: S,
      bigint: S,
      bool: S,
      func: S,
      number: S,
      object: S,
      string: S,
      symbol: S,
      any: S,
      arrayOf: b,
      element: S,
      elementType: S,
      instanceOf: b,
      node: S,
      objectOf: b,
      oneOf: b,
      oneOfType: b,
      shape: b,
      exact: b,
      checkPropTypes: p,
      resetWarningCache: v
    };
    return E.PropTypes = E, E;
  }, WC;
}
if (process.env.NODE_ENV !== "production") {
  var KA = Wx, XA = !0;
  eE.exports = GA()(KA.isElement, XA);
} else
  eE.exports = qA()();
var JA = eE.exports;
const Sv = /* @__PURE__ */ YO(JA);
function Fu(s) {
  if (typeof s != "object" || s === null)
    return !1;
  const v = Object.getPrototypeOf(s);
  return (v === null || v === Object.prototype || Object.getPrototypeOf(v) === null) && !(Symbol.toStringTag in s) && !(Symbol.iterator in s);
}
function Gx(s) {
  if (!Fu(s))
    return s;
  const v = {};
  return Object.keys(s).forEach((p) => {
    v[p] = Gx(s[p]);
  }), v;
}
function ii(s, v, p = {
  clone: !0
}) {
  const S = p.clone ? {
    ...s
  } : s;
  return Fu(s) && Fu(v) && Object.keys(v).forEach((b) => {
    Fu(v[b]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(s, b) && Fu(s[b]) ? S[b] = ii(s[b], v[b], p) : p.clone ? S[b] = Fu(v[b]) ? Gx(v[b]) : v[b] : S[b] = v[b];
  }), S;
}
const ZA = (s) => {
  const v = Object.keys(s).map((p) => ({
    key: p,
    val: s[p]
  })) || [];
  return v.sort((p, S) => p.val - S.val), v.reduce((p, S) => ({
    ...p,
    [S.key]: S.val
  }), {});
};
function eM(s) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: v = {
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
    unit: p = "px",
    step: S = 5,
    ...b
  } = s, E = ZA(v), y = Object.keys(E);
  function D(z) {
    return `@media (min-width:${typeof v[z] == "number" ? v[z] : z}${p})`;
  }
  function U(z) {
    return `@media (max-width:${(typeof v[z] == "number" ? v[z] : z) - S / 100}${p})`;
  }
  function j(z, q) {
    const ee = y.indexOf(q);
    return `@media (min-width:${typeof v[z] == "number" ? v[z] : z}${p}) and (max-width:${(ee !== -1 && typeof v[y[ee]] == "number" ? v[y[ee]] : q) - S / 100}${p})`;
  }
  function G(z) {
    return y.indexOf(z) + 1 < y.length ? j(z, y[y.indexOf(z) + 1]) : D(z);
  }
  function A(z) {
    const q = y.indexOf(z);
    return q === 0 ? D(y[1]) : q === y.length - 1 ? U(y[q]) : j(z, y[y.indexOf(z) + 1]).replace("@media", "@media not all and");
  }
  return {
    keys: y,
    values: E,
    up: D,
    down: U,
    between: j,
    only: G,
    not: A,
    unit: p,
    ...b
  };
}
function tM(s, v) {
  if (!s.containerQueries)
    return v;
  const p = Object.keys(v).filter((S) => S.startsWith("@container")).sort((S, b) => {
    var y, D;
    const E = /min-width:\s*([0-9.]+)/;
    return +(((y = S.match(E)) == null ? void 0 : y[1]) || 0) - +(((D = b.match(E)) == null ? void 0 : D[1]) || 0);
  });
  return p.length ? p.reduce((S, b) => {
    const E = v[b];
    return delete S[b], S[b] = E, S;
  }, {
    ...v
  }) : v;
}
function nM(s, v) {
  return v === "@" || v.startsWith("@") && (s.some((p) => v.startsWith(`@${p}`)) || !!v.match(/^@\d/));
}
function rM(s, v) {
  const p = v.match(/^@([^/]+)?\/?(.+)?$/);
  if (!p) {
    if (process.env.NODE_ENV !== "production")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The provided shorthand ${`(${v})`} is invalid. The format should be \`@<breakpoint | number>\` or \`@<breakpoint | number>/<container>\`.
For example, \`@sm\` or \`@600\` or \`@40rem/sidebar\`.` : ju(18, `(${v})`));
    return null;
  }
  const [, S, b] = p, E = Number.isNaN(+S) ? S || 0 : +S;
  return s.containerQueries(b).up(E);
}
function aM(s) {
  const v = (E, y) => E.replace("@media", y ? `@container ${y}` : "@container");
  function p(E, y) {
    E.up = (...D) => v(s.breakpoints.up(...D), y), E.down = (...D) => v(s.breakpoints.down(...D), y), E.between = (...D) => v(s.breakpoints.between(...D), y), E.only = (...D) => v(s.breakpoints.only(...D), y), E.not = (...D) => {
      const U = v(s.breakpoints.not(...D), y);
      return U.includes("not all and") ? U.replace("not all and ", "").replace("min-width:", "width<").replace("max-width:", "width>").replace("and", "or") : U;
    };
  }
  const S = {}, b = (E) => (p(S, E), S);
  return p(b), {
    ...s,
    containerQueries: b
  };
}
const iM = {
  borderRadius: 4
}, Hu = process.env.NODE_ENV !== "production" ? Sv.oneOfType([Sv.number, Sv.string, Sv.object, Sv.array]) : {};
function Rv(s, v) {
  return v ? ii(s, v, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : s;
}
const Gy = {
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
}, bx = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (s) => `@media (min-width:${Gy[s]}px)`
}, lM = {
  containerQueries: (s) => ({
    up: (v) => {
      let p = typeof v == "number" ? v : Gy[v] || v;
      return typeof p == "number" && (p = `${p}px`), s ? `@container ${s} (min-width:${p})` : `@container (min-width:${p})`;
    }
  })
};
function Ro(s, v, p) {
  const S = s.theme || {};
  if (Array.isArray(v)) {
    const E = S.breakpoints || bx;
    return v.reduce((y, D, U) => (y[E.up(E.keys[U])] = p(v[U]), y), {});
  }
  if (typeof v == "object") {
    const E = S.breakpoints || bx;
    return Object.keys(v).reduce((y, D) => {
      if (nM(E.keys, D)) {
        const U = rM(S.containerQueries ? S : lM, D);
        U && (y[U] = p(v[D], D));
      } else if (Object.keys(E.values || Gy).includes(D)) {
        const U = E.up(D);
        y[U] = p(v[D], D);
      } else {
        const U = D;
        y[U] = v[U];
      }
      return y;
    }, {});
  }
  return p(v);
}
function oM(s = {}) {
  var p;
  return ((p = s.keys) == null ? void 0 : p.reduce((S, b) => {
    const E = s.up(b);
    return S[E] = {}, S;
  }, {})) || {};
}
function uM(s, v) {
  return s.reduce((p, S) => {
    const b = p[S];
    return (!b || Object.keys(b).length === 0) && delete p[S], p;
  }, v);
}
function qx(s) {
  if (typeof s != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : ju(7));
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function qy(s, v, p = !0) {
  if (!v || typeof v != "string")
    return null;
  if (s && s.vars && p) {
    const S = `vars.${v}`.split(".").reduce((b, E) => b && b[E] ? b[E] : null, s);
    if (S != null)
      return S;
  }
  return v.split(".").reduce((S, b) => S && S[b] != null ? S[b] : null, s);
}
function Wy(s, v, p, S = p) {
  let b;
  return typeof s == "function" ? b = s(p) : Array.isArray(s) ? b = s[p] || S : b = qy(s, p) || S, v && (b = v(b, S, s)), b;
}
function Jn(s) {
  const {
    prop: v,
    cssProperty: p = s.prop,
    themeKey: S,
    transform: b
  } = s, E = (y) => {
    if (y[v] == null)
      return null;
    const D = y[v], U = y.theme, j = qy(U, S) || {};
    return Ro(y, D, (A) => {
      let z = Wy(j, b, A);
      return A === z && typeof A == "string" && (z = Wy(j, b, `${v}${A === "default" ? "" : qx(A)}`, A)), p === !1 ? z : {
        [p]: z
      };
    });
  };
  return E.propTypes = process.env.NODE_ENV !== "production" ? {
    [v]: Hu
  } : {}, E.filterProps = [v], E;
}
function sM(s) {
  const v = {};
  return (p) => (v[p] === void 0 && (v[p] = s(p)), v[p]);
}
const cM = {
  m: "margin",
  p: "padding"
}, fM = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Tx = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, dM = sM((s) => {
  if (s.length > 2)
    if (Tx[s])
      s = Tx[s];
    else
      return [s];
  const [v, p] = s.split(""), S = cM[v], b = fM[p] || "";
  return Array.isArray(b) ? b.map((E) => S + E) : [S + b];
}), Ky = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Xy = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], pM = [...Ky, ...Xy];
function kv(s, v, p, S) {
  const b = qy(s, v, !0) ?? p;
  return typeof b == "number" || typeof b == "string" ? (E) => typeof E == "string" ? E : (process.env.NODE_ENV !== "production" && typeof E != "number" && console.error(`MUI: Expected ${S} argument to be a number or a string, got ${E}.`), typeof b == "string" ? `calc(${E} * ${b})` : b * E) : Array.isArray(b) ? (E) => {
    if (typeof E == "string")
      return E;
    const y = Math.abs(E);
    process.env.NODE_ENV !== "production" && (Number.isInteger(y) ? y > b.length - 1 && console.error([`MUI: The value provided (${y}) overflows.`, `The supported values are: ${JSON.stringify(b)}.`, `${y} > ${b.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${v}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${v}\` as a number.`].join(`
`)));
    const D = b[y];
    return E >= 0 ? D : typeof D == "number" ? -D : `-${D}`;
  } : typeof b == "function" ? b : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${v}\` value (${b}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function sE(s) {
  return kv(s, "spacing", 8, "spacing");
}
function Dv(s, v) {
  return typeof v == "string" || v == null ? v : s(v);
}
function vM(s, v) {
  return (p) => s.reduce((S, b) => (S[b] = Dv(v, p), S), {});
}
function hM(s, v, p, S) {
  if (!v.includes(p))
    return null;
  const b = dM(p), E = vM(b, S), y = s[p];
  return Ro(s, y, E);
}
function Kx(s, v) {
  const p = sE(s.theme);
  return Object.keys(s).map((S) => hM(s, v, S, p)).reduce(Rv, {});
}
function Hn(s) {
  return Kx(s, Ky);
}
Hn.propTypes = process.env.NODE_ENV !== "production" ? Ky.reduce((s, v) => (s[v] = Hu, s), {}) : {};
Hn.filterProps = Ky;
function Pn(s) {
  return Kx(s, Xy);
}
Pn.propTypes = process.env.NODE_ENV !== "production" ? Xy.reduce((s, v) => (s[v] = Hu, s), {}) : {};
Pn.filterProps = Xy;
process.env.NODE_ENV !== "production" && pM.reduce((s, v) => (s[v] = Hu, s), {});
function Xx(s = 8, v = sE({
  spacing: s
})) {
  if (s.mui)
    return s;
  const p = (...S) => (process.env.NODE_ENV !== "production" && (S.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${S.length}`)), (S.length === 0 ? [1] : S).map((E) => {
    const y = v(E);
    return typeof y == "number" ? `${y}px` : y;
  }).join(" "));
  return p.mui = !0, p;
}
function Jy(...s) {
  const v = s.reduce((S, b) => (b.filterProps.forEach((E) => {
    S[E] = b;
  }), S), {}), p = (S) => Object.keys(S).reduce((b, E) => v[E] ? Rv(b, v[E](S)) : b, {});
  return p.propTypes = process.env.NODE_ENV !== "production" ? s.reduce((S, b) => Object.assign(S, b.propTypes), {}) : {}, p.filterProps = s.reduce((S, b) => S.concat(b.filterProps), []), p;
}
function Ti(s) {
  return typeof s != "number" ? s : `${s}px solid`;
}
function xi(s, v) {
  return Jn({
    prop: s,
    themeKey: "borders",
    transform: v
  });
}
const mM = xi("border", Ti), yM = xi("borderTop", Ti), gM = xi("borderRight", Ti), SM = xi("borderBottom", Ti), CM = xi("borderLeft", Ti), EM = xi("borderColor"), bM = xi("borderTopColor"), TM = xi("borderRightColor"), xM = xi("borderBottomColor"), RM = xi("borderLeftColor"), wM = xi("outline", Ti), _M = xi("outlineColor"), Zy = (s) => {
  if (s.borderRadius !== void 0 && s.borderRadius !== null) {
    const v = kv(s.theme, "shape.borderRadius", 4, "borderRadius"), p = (S) => ({
      borderRadius: Dv(v, S)
    });
    return Ro(s, s.borderRadius, p);
  }
  return null;
};
Zy.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Hu
} : {};
Zy.filterProps = ["borderRadius"];
Jy(mM, yM, gM, SM, CM, EM, bM, TM, xM, RM, Zy, wM, _M);
const eg = (s) => {
  if (s.gap !== void 0 && s.gap !== null) {
    const v = kv(s.theme, "spacing", 8, "gap"), p = (S) => ({
      gap: Dv(v, S)
    });
    return Ro(s, s.gap, p);
  }
  return null;
};
eg.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Hu
} : {};
eg.filterProps = ["gap"];
const tg = (s) => {
  if (s.columnGap !== void 0 && s.columnGap !== null) {
    const v = kv(s.theme, "spacing", 8, "columnGap"), p = (S) => ({
      columnGap: Dv(v, S)
    });
    return Ro(s, s.columnGap, p);
  }
  return null;
};
tg.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Hu
} : {};
tg.filterProps = ["columnGap"];
const ng = (s) => {
  if (s.rowGap !== void 0 && s.rowGap !== null) {
    const v = kv(s.theme, "spacing", 8, "rowGap"), p = (S) => ({
      rowGap: Dv(v, S)
    });
    return Ro(s, s.rowGap, p);
  }
  return null;
};
ng.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Hu
} : {};
ng.filterProps = ["rowGap"];
const kM = Jn({
  prop: "gridColumn"
}), DM = Jn({
  prop: "gridRow"
}), OM = Jn({
  prop: "gridAutoFlow"
}), AM = Jn({
  prop: "gridAutoColumns"
}), MM = Jn({
  prop: "gridAutoRows"
}), NM = Jn({
  prop: "gridTemplateColumns"
}), LM = Jn({
  prop: "gridTemplateRows"
}), UM = Jn({
  prop: "gridTemplateAreas"
}), zM = Jn({
  prop: "gridArea"
});
Jy(eg, tg, ng, kM, DM, OM, AM, MM, NM, LM, UM, zM);
function ad(s, v) {
  return v === "grey" ? v : s;
}
const FM = Jn({
  prop: "color",
  themeKey: "palette",
  transform: ad
}), jM = Jn({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: ad
}), VM = Jn({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: ad
});
Jy(FM, jM, VM);
function ai(s) {
  return s <= 1 && s !== 0 ? `${s * 100}%` : s;
}
const HM = Jn({
  prop: "width",
  transform: ai
}), cE = (s) => {
  if (s.maxWidth !== void 0 && s.maxWidth !== null) {
    const v = (p) => {
      var b, E, y, D, U;
      const S = ((y = (E = (b = s.theme) == null ? void 0 : b.breakpoints) == null ? void 0 : E.values) == null ? void 0 : y[p]) || Gy[p];
      return S ? ((U = (D = s.theme) == null ? void 0 : D.breakpoints) == null ? void 0 : U.unit) !== "px" ? {
        maxWidth: `${S}${s.theme.breakpoints.unit}`
      } : {
        maxWidth: S
      } : {
        maxWidth: ai(p)
      };
    };
    return Ro(s, s.maxWidth, v);
  }
  return null;
};
cE.filterProps = ["maxWidth"];
const PM = Jn({
  prop: "minWidth",
  transform: ai
}), BM = Jn({
  prop: "height",
  transform: ai
}), $M = Jn({
  prop: "maxHeight",
  transform: ai
}), IM = Jn({
  prop: "minHeight",
  transform: ai
});
Jn({
  prop: "size",
  cssProperty: "width",
  transform: ai
});
Jn({
  prop: "size",
  cssProperty: "height",
  transform: ai
});
const YM = Jn({
  prop: "boxSizing"
});
Jy(HM, cE, PM, BM, $M, IM, YM);
const rg = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ti
  },
  borderTop: {
    themeKey: "borders",
    transform: Ti
  },
  borderRight: {
    themeKey: "borders",
    transform: Ti
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ti
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ti
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
    transform: Ti
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Zy
  },
  // palette
  color: {
    themeKey: "palette",
    transform: ad
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: ad
  },
  backgroundColor: {
    themeKey: "palette",
    transform: ad
  },
  // spacing
  p: {
    style: Pn
  },
  pt: {
    style: Pn
  },
  pr: {
    style: Pn
  },
  pb: {
    style: Pn
  },
  pl: {
    style: Pn
  },
  px: {
    style: Pn
  },
  py: {
    style: Pn
  },
  padding: {
    style: Pn
  },
  paddingTop: {
    style: Pn
  },
  paddingRight: {
    style: Pn
  },
  paddingBottom: {
    style: Pn
  },
  paddingLeft: {
    style: Pn
  },
  paddingX: {
    style: Pn
  },
  paddingY: {
    style: Pn
  },
  paddingInline: {
    style: Pn
  },
  paddingInlineStart: {
    style: Pn
  },
  paddingInlineEnd: {
    style: Pn
  },
  paddingBlock: {
    style: Pn
  },
  paddingBlockStart: {
    style: Pn
  },
  paddingBlockEnd: {
    style: Pn
  },
  m: {
    style: Hn
  },
  mt: {
    style: Hn
  },
  mr: {
    style: Hn
  },
  mb: {
    style: Hn
  },
  ml: {
    style: Hn
  },
  mx: {
    style: Hn
  },
  my: {
    style: Hn
  },
  margin: {
    style: Hn
  },
  marginTop: {
    style: Hn
  },
  marginRight: {
    style: Hn
  },
  marginBottom: {
    style: Hn
  },
  marginLeft: {
    style: Hn
  },
  marginX: {
    style: Hn
  },
  marginY: {
    style: Hn
  },
  marginInline: {
    style: Hn
  },
  marginInlineStart: {
    style: Hn
  },
  marginInlineEnd: {
    style: Hn
  },
  marginBlock: {
    style: Hn
  },
  marginBlockStart: {
    style: Hn
  },
  marginBlockEnd: {
    style: Hn
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (s) => ({
      "@media print": {
        display: s
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
    style: eg
  },
  rowGap: {
    style: ng
  },
  columnGap: {
    style: tg
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
    transform: ai
  },
  maxWidth: {
    style: cE
  },
  minWidth: {
    transform: ai
  },
  height: {
    transform: ai
  },
  maxHeight: {
    transform: ai
  },
  minHeight: {
    transform: ai
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
function WM(...s) {
  const v = s.reduce((S, b) => S.concat(Object.keys(b)), []), p = new Set(v);
  return s.every((S) => p.size === Object.keys(S).length);
}
function QM(s, v) {
  return typeof s == "function" ? s(v) : s;
}
function GM() {
  function s(p, S, b, E) {
    const y = {
      [p]: S,
      theme: b
    }, D = E[p];
    if (!D)
      return {
        [p]: S
      };
    const {
      cssProperty: U = p,
      themeKey: j,
      transform: G,
      style: A
    } = D;
    if (S == null)
      return null;
    if (j === "typography" && S === "inherit")
      return {
        [p]: S
      };
    const z = qy(b, j) || {};
    return A ? A(y) : Ro(y, S, (ee) => {
      let re = Wy(z, G, ee);
      return ee === re && typeof ee == "string" && (re = Wy(z, G, `${p}${ee === "default" ? "" : qx(ee)}`, ee)), U === !1 ? re : {
        [U]: re
      };
    });
  }
  function v(p) {
    const {
      sx: S,
      theme: b = {}
    } = p || {};
    if (!S)
      return null;
    const E = b.unstable_sxConfig ?? rg;
    function y(D) {
      let U = D;
      if (typeof D == "function")
        U = D(b);
      else if (typeof D != "object")
        return D;
      if (!U)
        return null;
      const j = oM(b.breakpoints), G = Object.keys(j);
      let A = j;
      return Object.keys(U).forEach((z) => {
        const q = QM(U[z], b);
        if (q != null)
          if (typeof q == "object")
            if (E[z])
              A = Rv(A, s(z, q, b, E));
            else {
              const ee = Ro({
                theme: b
              }, q, (re) => ({
                [z]: re
              }));
              WM(ee, q) ? A[z] = v({
                sx: q,
                theme: b
              }) : A = Rv(A, ee);
            }
          else
            A = Rv(A, s(z, q, b, E));
      }), tM(b, uM(G, A));
    }
    return Array.isArray(S) ? S.map(y) : y(S);
  }
  return v;
}
const ag = GM();
ag.filterProps = ["sx"];
function qM(s, v) {
  var S;
  const p = this;
  if (p.vars) {
    if (!((S = p.colorSchemes) != null && S[s]) || typeof p.getColorSchemeSelector != "function")
      return {};
    let b = p.getColorSchemeSelector(s);
    return b === "&" ? v : ((b.includes("data-") || b.includes(".")) && (b = `*:where(${b.replace(/\s*&$/, "")}) &`), {
      [b]: v
    });
  }
  return p.palette.mode === s ? v : {};
}
function KM(s = {}, ...v) {
  const {
    breakpoints: p = {},
    palette: S = {},
    spacing: b,
    shape: E = {},
    ...y
  } = s, D = eM(p), U = Xx(b);
  let j = ii({
    breakpoints: D,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: {
      mode: "light",
      ...S
    },
    spacing: U,
    shape: {
      ...iM,
      ...E
    }
  }, y);
  return j = aM(j), j.applyStyles = qM, j = v.reduce((G, A) => ii(G, A), j), j.unstable_sxConfig = {
    ...rg,
    ...y == null ? void 0 : y.unstable_sxConfig
  }, j.unstable_sx = function(A) {
    return ag({
      sx: A,
      theme: this
    });
  }, j;
}
const xx = (s) => s, XM = () => {
  let s = xx;
  return {
    configure(v) {
      s = v;
    },
    generate(v) {
      return s(v);
    },
    reset() {
      s = xx;
    }
  };
}, JM = XM(), ZM = {
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
function e2(s, v, p = "Mui") {
  const S = ZM[v];
  return S ? `${p}-${S}` : `${JM.generate(s)}-${v}`;
}
function t2(s, v = Number.MIN_SAFE_INTEGER, p = Number.MAX_SAFE_INTEGER) {
  return Math.max(v, Math.min(s, p));
}
function fE(s, v = 0, p = 1) {
  return process.env.NODE_ENV !== "production" && (s < v || s > p) && console.error(`MUI: The value provided ${s} is out of range [${v}, ${p}].`), t2(s, v, p);
}
function n2(s) {
  s = s.slice(1);
  const v = new RegExp(`.{1,${s.length >= 6 ? 2 : 1}}`, "g");
  let p = s.match(v);
  return p && p[0].length === 1 && (p = p.map((S) => S + S)), p ? `rgb${p.length === 4 ? "a" : ""}(${p.map((S, b) => b < 3 ? parseInt(S, 16) : Math.round(parseInt(S, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Vu(s) {
  if (s.type)
    return s;
  if (s.charAt(0) === "#")
    return Vu(n2(s));
  const v = s.indexOf("("), p = s.substring(0, v);
  if (!["rgb", "rgba", "hsl", "hsla", "color"].includes(p))
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${s}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : ju(9, s));
  let S = s.substring(v + 1, s.length - 1), b;
  if (p === "color") {
    if (S = S.split(" "), b = S.shift(), S.length === 4 && S[3].charAt(0) === "/" && (S[3] = S[3].slice(1)), !["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].includes(b))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${b}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : ju(10, b));
  } else
    S = S.split(",");
  return S = S.map((E) => parseFloat(E)), {
    type: p,
    values: S,
    colorSpace: b
  };
}
const r2 = (s) => {
  const v = Vu(s);
  return v.values.slice(0, 3).map((p, S) => v.type.includes("hsl") && S !== 0 ? `${p}%` : p).join(" ");
}, Ev = (s, v) => {
  try {
    return r2(s);
  } catch {
    return v && process.env.NODE_ENV !== "production" && console.warn(v), s;
  }
};
function ig(s) {
  const {
    type: v,
    colorSpace: p
  } = s;
  let {
    values: S
  } = s;
  return v.includes("rgb") ? S = S.map((b, E) => E < 3 ? parseInt(b, 10) : b) : v.includes("hsl") && (S[1] = `${S[1]}%`, S[2] = `${S[2]}%`), v.includes("color") ? S = `${p} ${S.join(" ")}` : S = `${S.join(", ")}`, `${v}(${S})`;
}
function Jx(s) {
  s = Vu(s);
  const {
    values: v
  } = s, p = v[0], S = v[1] / 100, b = v[2] / 100, E = S * Math.min(b, 1 - b), y = (j, G = (j + p / 30) % 12) => b - E * Math.max(Math.min(G - 3, 9 - G, 1), -1);
  let D = "rgb";
  const U = [Math.round(y(0) * 255), Math.round(y(8) * 255), Math.round(y(4) * 255)];
  return s.type === "hsla" && (D += "a", U.push(v[3])), ig({
    type: D,
    values: U
  });
}
function tE(s) {
  s = Vu(s);
  let v = s.type === "hsl" || s.type === "hsla" ? Vu(Jx(s)).values : s.values;
  return v = v.map((p) => (s.type !== "color" && (p /= 255), p <= 0.03928 ? p / 12.92 : ((p + 0.055) / 1.055) ** 2.4)), Number((0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]).toFixed(3));
}
function Rx(s, v) {
  const p = tE(s), S = tE(v);
  return (Math.max(p, S) + 0.05) / (Math.min(p, S) + 0.05);
}
function a2(s, v) {
  return s = Vu(s), v = fE(v), (s.type === "rgb" || s.type === "hsl") && (s.type += "a"), s.type === "color" ? s.values[3] = `/${v}` : s.values[3] = v, ig(s);
}
function Vy(s, v, p) {
  try {
    return a2(s, v);
  } catch {
    return s;
  }
}
function dE(s, v) {
  if (s = Vu(s), v = fE(v), s.type.includes("hsl"))
    s.values[2] *= 1 - v;
  else if (s.type.includes("rgb") || s.type.includes("color"))
    for (let p = 0; p < 3; p += 1)
      s.values[p] *= 1 - v;
  return ig(s);
}
function dn(s, v, p) {
  try {
    return dE(s, v);
  } catch {
    return s;
  }
}
function pE(s, v) {
  if (s = Vu(s), v = fE(v), s.type.includes("hsl"))
    s.values[2] += (100 - s.values[2]) * v;
  else if (s.type.includes("rgb"))
    for (let p = 0; p < 3; p += 1)
      s.values[p] += (255 - s.values[p]) * v;
  else if (s.type.includes("color"))
    for (let p = 0; p < 3; p += 1)
      s.values[p] += (1 - s.values[p]) * v;
  return ig(s);
}
function pn(s, v, p) {
  try {
    return pE(s, v);
  } catch {
    return s;
  }
}
function i2(s, v = 0.15) {
  return tE(s) > 0.5 ? dE(s, v) : pE(s, v);
}
function Hy(s, v, p) {
  try {
    return i2(s, v);
  } catch {
    return s;
  }
}
function l2(s = "") {
  function v(...S) {
    if (!S.length)
      return "";
    const b = S[0];
    return typeof b == "string" && !b.match(/(#|\(|\)|(-?(\d*\.)?\d+)(px|em|%|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc))|^(-?(\d*\.)?\d+)$|(\d+ \d+ \d+)/) ? `, var(--${s ? `${s}-` : ""}${b}${v(...S.slice(1))})` : `, ${b}`;
  }
  return (S, ...b) => `var(--${s ? `${s}-` : ""}${S}${v(...b)})`;
}
const wx = (s, v, p, S = []) => {
  let b = s;
  v.forEach((E, y) => {
    y === v.length - 1 ? Array.isArray(b) ? b[Number(E)] = p : b && typeof b == "object" && (b[E] = p) : b && typeof b == "object" && (b[E] || (b[E] = S.includes(E) ? [] : {}), b = b[E]);
  });
}, o2 = (s, v, p) => {
  function S(b, E = [], y = []) {
    Object.entries(b).forEach(([D, U]) => {
      (!p || p && !p([...E, D])) && U != null && (typeof U == "object" && Object.keys(U).length > 0 ? S(U, [...E, D], Array.isArray(U) ? [...y, D] : y) : v([...E, D], U, y));
    });
  }
  S(s);
}, u2 = (s, v) => typeof v == "number" ? ["lineHeight", "fontWeight", "opacity", "zIndex"].some((S) => s.includes(S)) || s[s.length - 1].toLowerCase().includes("opacity") ? v : `${v}px` : v;
function QC(s, v) {
  const {
    prefix: p,
    shouldSkipGeneratingVar: S
  } = v || {}, b = {}, E = {}, y = {};
  return o2(
    s,
    (D, U, j) => {
      if ((typeof U == "string" || typeof U == "number") && (!S || !S(D, U))) {
        const G = `--${p ? `${p}-` : ""}${D.join("-")}`, A = u2(D, U);
        Object.assign(b, {
          [G]: A
        }), wx(E, D, `var(${G})`, j), wx(y, D, `var(${G}, ${A})`, j);
      }
    },
    (D) => D[0] === "vars"
    // skip 'vars/*' paths
  ), {
    css: b,
    vars: E,
    varsWithDefaults: y
  };
}
function s2(s, v = {}) {
  const {
    getSelector: p = de,
    disableCssColorScheme: S,
    colorSchemeSelector: b
  } = v, {
    colorSchemes: E = {},
    components: y,
    defaultColorScheme: D = "light",
    ...U
  } = s, {
    vars: j,
    css: G,
    varsWithDefaults: A
  } = QC(U, v);
  let z = A;
  const q = {}, {
    [D]: ee,
    ...re
  } = E;
  if (Object.entries(re || {}).forEach(([ne, _e]) => {
    const {
      vars: Q,
      css: ot,
      varsWithDefaults: Ke
    } = QC(_e, v);
    z = ii(z, Ke), q[ne] = {
      css: ot,
      vars: Q
    };
  }), ee) {
    const {
      css: ne,
      vars: _e,
      varsWithDefaults: Q
    } = QC(ee, v);
    z = ii(z, Q), q[D] = {
      css: ne,
      vars: _e
    };
  }
  function de(ne, _e) {
    var ot, Ke;
    let Q = b;
    if (b === "class" && (Q = ".%s"), b === "data" && (Q = "[data-%s]"), b != null && b.startsWith("data-") && !b.includes("%s") && (Q = `[${b}="%s"]`), ne) {
      if (Q === "media")
        return s.defaultColorScheme === ne ? ":root" : {
          [`@media (prefers-color-scheme: ${((Ke = (ot = E[ne]) == null ? void 0 : ot.palette) == null ? void 0 : Ke.mode) || ne})`]: {
            ":root": _e
          }
        };
      if (Q)
        return s.defaultColorScheme === ne ? `:root, ${Q.replace("%s", String(ne))}` : Q.replace("%s", String(ne));
    }
    return ":root";
  }
  return {
    vars: z,
    generateThemeVars: () => {
      let ne = {
        ...j
      };
      return Object.entries(q).forEach(([, {
        vars: _e
      }]) => {
        ne = ii(ne, _e);
      }), ne;
    },
    generateStyleSheets: () => {
      var xt, R;
      const ne = [], _e = s.defaultColorScheme || "light";
      function Q(pe, Ne) {
        Object.keys(Ne).length && ne.push(typeof pe == "string" ? {
          [pe]: {
            ...Ne
          }
        } : pe);
      }
      Q(p(void 0, {
        ...G
      }), G);
      const {
        [_e]: ot,
        ...Ke
      } = q;
      if (ot) {
        const {
          css: pe
        } = ot, Ne = (R = (xt = E[_e]) == null ? void 0 : xt.palette) == null ? void 0 : R.mode, be = !S && Ne ? {
          colorScheme: Ne,
          ...pe
        } : {
          ...pe
        };
        Q(p(_e, {
          ...be
        }), be);
      }
      return Object.entries(Ke).forEach(([pe, {
        css: Ne
      }]) => {
        var Le, bt;
        const be = (bt = (Le = E[pe]) == null ? void 0 : Le.palette) == null ? void 0 : bt.mode, ye = !S && be ? {
          colorScheme: be,
          ...Ne
        } : {
          ...Ne
        };
        Q(p(pe, {
          ...ye
        }), ye);
      }), ne;
    }
  };
}
function c2(s) {
  return function(p) {
    return s === "media" ? (process.env.NODE_ENV !== "production" && p !== "light" && p !== "dark" && console.error(`MUI: @media (prefers-color-scheme) supports only 'light' or 'dark', but receive '${p}'.`), `@media (prefers-color-scheme: ${p})`) : s ? s.startsWith("data-") && !s.includes("%s") ? `[${s}="${p}"] &` : s === "class" ? `.${p} &` : s === "data" ? `[data-${p}] &` : `${s.replace("%s", p)} &` : "&";
  };
}
const wv = {
  black: "#000",
  white: "#fff"
}, f2 = {
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
}, Jf = {
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
}, Zf = {
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
}, Cv = {
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
}, ed = {
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
}, td = {
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
}, nd = {
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
}, _x = {
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
    paper: wv.white,
    default: wv.white
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
}, GC = {
  text: {
    primary: wv.white,
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
    active: wv.white,
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
function kx(s, v, p, S) {
  const b = S.light || S, E = S.dark || S * 1.5;
  s[v] || (s.hasOwnProperty(p) ? s[v] = s[p] : v === "light" ? s.light = pE(s.main, b) : v === "dark" && (s.dark = dE(s.main, E)));
}
function d2(s = "light") {
  return s === "dark" ? {
    main: ed[200],
    light: ed[50],
    dark: ed[400]
  } : {
    main: ed[700],
    light: ed[400],
    dark: ed[800]
  };
}
function p2(s = "light") {
  return s === "dark" ? {
    main: Jf[200],
    light: Jf[50],
    dark: Jf[400]
  } : {
    main: Jf[500],
    light: Jf[300],
    dark: Jf[700]
  };
}
function v2(s = "light") {
  return s === "dark" ? {
    main: Zf[500],
    light: Zf[300],
    dark: Zf[700]
  } : {
    main: Zf[700],
    light: Zf[400],
    dark: Zf[800]
  };
}
function h2(s = "light") {
  return s === "dark" ? {
    main: td[400],
    light: td[300],
    dark: td[700]
  } : {
    main: td[700],
    light: td[500],
    dark: td[900]
  };
}
function m2(s = "light") {
  return s === "dark" ? {
    main: nd[400],
    light: nd[300],
    dark: nd[700]
  } : {
    main: nd[800],
    light: nd[500],
    dark: nd[900]
  };
}
function y2(s = "light") {
  return s === "dark" ? {
    main: Cv[400],
    light: Cv[300],
    dark: Cv[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Cv[500],
    dark: Cv[900]
  };
}
function vE(s) {
  const {
    mode: v = "light",
    contrastThreshold: p = 3,
    tonalOffset: S = 0.2,
    ...b
  } = s, E = s.primary || d2(v), y = s.secondary || p2(v), D = s.error || v2(v), U = s.info || h2(v), j = s.success || m2(v), G = s.warning || y2(v);
  function A(re) {
    const de = Rx(re, GC.text.primary) >= p ? GC.text.primary : _x.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const Ue = Rx(re, de);
      Ue < 3 && console.error([`MUI: The contrast ratio of ${Ue}:1 for ${de} on ${re}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return de;
  }
  const z = ({
    color: re,
    name: de,
    mainShade: Ue = 500,
    lightShade: ge = 300,
    darkShade: ne = 700
  }) => {
    if (re = {
      ...re
    }, !re.main && re[Ue] && (re.main = re[Ue]), !re.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${de ? ` (${de})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${Ue}\` property.` : ju(11, de ? ` (${de})` : "", Ue));
    if (typeof re.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${de ? ` (${de})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(re.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : ju(12, de ? ` (${de})` : "", JSON.stringify(re.main)));
    return kx(re, "light", ge, S), kx(re, "dark", ne, S), re.contrastText || (re.contrastText = A(re.main)), re;
  }, q = {
    dark: GC,
    light: _x
  };
  return process.env.NODE_ENV !== "production" && (q[v] || console.error(`MUI: The palette mode \`${v}\` is not supported.`)), ii({
    // A collection of common colors.
    common: {
      ...wv
    },
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: v,
    // The colors used to represent primary interface elements for a user.
    primary: z({
      color: E,
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
      color: D,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: z({
      color: G,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: z({
      color: U,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: z({
      color: j,
      name: "success"
    }),
    // The grey colors.
    grey: f2,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: p,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: A,
    // Generate a rich color object.
    augmentColor: z,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: S,
    // The light and dark mode object.
    ...q[v]
  }, b);
}
function g2(s) {
  const v = {};
  return Object.entries(s).forEach((S) => {
    const [b, E] = S;
    typeof E == "object" && (v[b] = `${E.fontStyle ? `${E.fontStyle} ` : ""}${E.fontVariant ? `${E.fontVariant} ` : ""}${E.fontWeight ? `${E.fontWeight} ` : ""}${E.fontStretch ? `${E.fontStretch} ` : ""}${E.fontSize || ""}${E.lineHeight ? `/${E.lineHeight} ` : ""}${E.fontFamily || ""}`);
  }), v;
}
function S2(s, v) {
  return {
    toolbar: {
      minHeight: 56,
      [s.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [s.up("sm")]: {
        minHeight: 64
      }
    },
    ...v
  };
}
function C2(s) {
  return Math.round(s * 1e5) / 1e5;
}
const Dx = {
  textTransform: "uppercase"
}, Ox = '"Roboto", "Helvetica", "Arial", sans-serif';
function E2(s, v) {
  const {
    fontFamily: p = Ox,
    // The default font size of the Material Specification.
    fontSize: S = 14,
    // px
    fontWeightLight: b = 300,
    fontWeightRegular: E = 400,
    fontWeightMedium: y = 500,
    fontWeightBold: D = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: U = 16,
    // Apply the CSS properties to all the variants.
    allVariants: j,
    pxToRem: G,
    ...A
  } = typeof v == "function" ? v(s) : v;
  process.env.NODE_ENV !== "production" && (typeof S != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof U != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const z = S / 14, q = G || ((de) => `${de / U * z}rem`), ee = (de, Ue, ge, ne, _e) => ({
    fontFamily: p,
    fontWeight: de,
    fontSize: q(Ue),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: ge,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...p === Ox ? {
      letterSpacing: `${C2(ne / Ue)}em`
    } : {},
    ..._e,
    ...j
  }), re = {
    h1: ee(b, 96, 1.167, -1.5),
    h2: ee(b, 60, 1.2, -0.5),
    h3: ee(E, 48, 1.167, 0),
    h4: ee(E, 34, 1.235, 0.25),
    h5: ee(E, 24, 1.334, 0),
    h6: ee(y, 20, 1.6, 0.15),
    subtitle1: ee(E, 16, 1.75, 0.15),
    subtitle2: ee(y, 14, 1.57, 0.1),
    body1: ee(E, 16, 1.5, 0.15),
    body2: ee(E, 14, 1.43, 0.15),
    button: ee(y, 14, 1.75, 0.4, Dx),
    caption: ee(E, 12, 1.66, 0.4),
    overline: ee(E, 12, 2.66, 1, Dx),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ii({
    htmlFontSize: U,
    pxToRem: q,
    fontFamily: p,
    fontSize: S,
    fontWeightLight: b,
    fontWeightRegular: E,
    fontWeightMedium: y,
    fontWeightBold: D,
    ...re
  }, A, {
    clone: !1
    // No need to clone deep
  });
}
const b2 = 0.2, T2 = 0.14, x2 = 0.12;
function _n(...s) {
  return [`${s[0]}px ${s[1]}px ${s[2]}px ${s[3]}px rgba(0,0,0,${b2})`, `${s[4]}px ${s[5]}px ${s[6]}px ${s[7]}px rgba(0,0,0,${T2})`, `${s[8]}px ${s[9]}px ${s[10]}px ${s[11]}px rgba(0,0,0,${x2})`].join(",");
}
const R2 = ["none", _n(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), _n(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), _n(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), _n(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), _n(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), _n(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), _n(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), _n(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), _n(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), _n(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), _n(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), _n(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), _n(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), _n(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), _n(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), _n(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), _n(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), _n(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), _n(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), _n(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), _n(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), _n(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), _n(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), _n(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], w2 = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, _2 = {
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
function Ax(s) {
  return `${Math.round(s)}ms`;
}
function k2(s) {
  if (!s)
    return 0;
  const v = s / 36;
  return Math.min(Math.round((4 + 15 * v ** 0.25 + v / 5) * 10), 3e3);
}
function D2(s) {
  const v = {
    ...w2,
    ...s.easing
  }, p = {
    ..._2,
    ...s.duration
  };
  return {
    getAutoHeightDuration: k2,
    create: (b = ["all"], E = {}) => {
      const {
        duration: y = p.standard,
        easing: D = v.easeInOut,
        delay: U = 0,
        ...j
      } = E;
      if (process.env.NODE_ENV !== "production") {
        const G = (z) => typeof z == "string", A = (z) => !Number.isNaN(parseFloat(z));
        !G(b) && !Array.isArray(b) && console.error('MUI: Argument "props" must be a string or Array.'), !A(y) && !G(y) && console.error(`MUI: Argument "duration" must be a number or a string but found ${y}.`), G(D) || console.error('MUI: Argument "easing" must be a string.'), !A(U) && !G(U) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof E != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(j).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(j).join(",")}].`);
      }
      return (Array.isArray(b) ? b : [b]).map((G) => `${G} ${typeof y == "string" ? y : Ax(y)} ${D} ${typeof U == "string" ? U : Ax(U)}`).join(",");
    },
    ...s,
    easing: v,
    duration: p
  };
}
const O2 = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
};
function nE(s = {}, ...v) {
  const {
    breakpoints: p,
    mixins: S = {},
    spacing: b,
    palette: E = {},
    transitions: y = {},
    typography: D = {},
    shape: U,
    ...j
  } = s;
  if (s.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : ju(20));
  const G = vE(E), A = KM(s);
  let z = ii(A, {
    mixins: S2(A.breakpoints, S),
    palette: G,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: R2.slice(),
    typography: E2(G, D),
    transitions: D2(y),
    zIndex: {
      ...O2
    }
  });
  if (z = ii(z, j), z = v.reduce((q, ee) => ii(q, ee), z), process.env.NODE_ENV !== "production") {
    const q = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], ee = (re, de) => {
      let Ue;
      for (Ue in re) {
        const ge = re[Ue];
        if (q.includes(Ue) && Object.keys(ge).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const ne = e2("", Ue);
            console.error([`MUI: The \`${de}\` component increases the CSS specificity of the \`${Ue}\` internal state.`, "You can not override it like this: ", JSON.stringify(re, null, 2), "", `Instead, you need to use the '&.${ne}' syntax:`, JSON.stringify({
              root: {
                [`&.${ne}`]: ge
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          re[Ue] = {};
        }
      }
    };
    Object.keys(z.components).forEach((re) => {
      const de = z.components[re].styleOverrides;
      de && re.startsWith("Mui") && ee(de, re);
    });
  }
  return z.unstable_sxConfig = {
    ...rg,
    ...j == null ? void 0 : j.unstable_sxConfig
  }, z.unstable_sx = function(ee) {
    return ag({
      sx: ee,
      theme: this
    });
  }, z;
}
function A2(s) {
  let v;
  return s < 1 ? v = 5.11916 * s ** 2 : v = 4.5 * Math.log(s + 1) + 2, Math.round(v * 10) / 1e3;
}
const M2 = [...Array(25)].map((s, v) => {
  if (v === 0)
    return "none";
  const p = A2(v);
  return `linear-gradient(rgba(255 255 255 / ${p}), rgba(255 255 255 / ${p}))`;
});
function Zx(s) {
  return {
    inputPlaceholder: s === "dark" ? 0.5 : 0.42,
    inputUnderline: s === "dark" ? 0.7 : 0.42,
    switchTrackDisabled: s === "dark" ? 0.2 : 0.12,
    switchTrack: s === "dark" ? 0.3 : 0.38
  };
}
function eR(s) {
  return s === "dark" ? M2 : [];
}
function N2(s) {
  const {
    palette: v = {
      mode: "light"
    },
    // need to cast to avoid module augmentation test
    opacity: p,
    overlays: S,
    ...b
  } = s, E = vE(v);
  return {
    palette: E,
    opacity: {
      ...Zx(E.mode),
      ...p
    },
    overlays: S || eR(E.mode),
    ...b
  };
}
function L2(s) {
  var v;
  return !!s[0].match(/(cssVarPrefix|colorSchemeSelector|typography|mixins|breakpoints|direction|transitions)/) || !!s[0].match(/sxConfig$/) || // ends with sxConfig
  s[0] === "palette" && !!((v = s[1]) != null && v.match(/(mode|contrastThreshold|tonalOffset)/));
}
const U2 = (s) => [...[...Array(25)].map((v, p) => `--${s ? `${s}-` : ""}overlays-${p}`), `--${s ? `${s}-` : ""}palette-AppBar-darkBg`, `--${s ? `${s}-` : ""}palette-AppBar-darkColor`], z2 = (s) => (v, p) => {
  const S = s.colorSchemeSelector;
  let b = S;
  if (S === "class" && (b = ".%s"), S === "data" && (b = "[data-%s]"), S != null && S.startsWith("data-") && !S.includes("%s") && (b = `[${S}="%s"]`), s.defaultColorScheme === v) {
    if (v === "dark") {
      const E = {};
      return U2(s.cssVarPrefix).forEach((y) => {
        E[y] = p[y], delete p[y];
      }), b === "media" ? {
        ":root": p,
        "@media (prefers-color-scheme: dark)": {
          ":root": E
        }
      } : b ? {
        [b.replace("%s", v)]: E,
        [`:root, ${b.replace("%s", v)}`]: p
      } : {
        ":root": {
          ...p,
          ...E
        }
      };
    }
    if (b && b !== "media")
      return `:root, ${b.replace("%s", String(v))}`;
  } else if (v) {
    if (b === "media")
      return {
        [`@media (prefers-color-scheme: ${String(v)})`]: {
          ":root": p
        }
      };
    if (b)
      return b.replace("%s", String(v));
  }
  return ":root";
};
function F2(s) {
  return Fu(s) || typeof s > "u" || typeof s == "string" || typeof s == "boolean" || typeof s == "number" || Array.isArray(s);
}
function j2(s = {}) {
  const v = {
    ...s
  };
  function p(S) {
    const b = Object.entries(S);
    for (let E = 0; E < b.length; E++) {
      const [y, D] = b[E];
      !F2(D) || y.startsWith("unstable_") ? delete S[y] : Fu(D) && (S[y] = {
        ...D
      }, p(S[y]));
    }
  }
  return p(v), `import { unstable_createBreakpoints as createBreakpoints, createTransitions } from '@mui/material/styles';

const theme = ${JSON.stringify(v, null, 2)};

theme.breakpoints = createBreakpoints(theme.breakpoints || {});
theme.transitions = createTransitions(theme.transitions || {});

export default theme;`;
}
function V2(s, v) {
  v.forEach((p) => {
    s[p] || (s[p] = {});
  });
}
function Z(s, v, p) {
  !s[v] && p && (s[v] = p);
}
function bv(s) {
  return !s || !s.startsWith("hsl") ? s : Jx(s);
}
function To(s, v) {
  `${v}Channel` in s || (s[`${v}Channel`] = Ev(bv(s[v]), `MUI: Can't create \`palette.${v}Channel\` because \`palette.${v}\` is not one of these formats: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().
To suppress this warning, you need to explicitly provide the \`palette.${v}Channel\` as a string (in rgb format, for example "12 12 12") or undefined if you want to remove the channel token.`));
}
function H2(s) {
  return typeof s == "number" ? `${s}px` : typeof s == "string" || typeof s == "function" || Array.isArray(s) ? s : "8px";
}
const Dl = (s) => {
  try {
    return s();
  } catch {
  }
}, P2 = (s = "mui") => l2(s);
function qC(s, v, p, S) {
  if (!v)
    return;
  v = v === !0 ? {} : v;
  const b = S === "dark" ? "dark" : "light";
  if (!p) {
    s[S] = N2({
      ...v,
      palette: {
        mode: b,
        ...v == null ? void 0 : v.palette
      }
    });
    return;
  }
  const {
    palette: E,
    ...y
  } = nE({
    ...p,
    palette: {
      mode: b,
      ...v == null ? void 0 : v.palette
    }
  });
  return s[S] = {
    ...v,
    palette: E,
    opacity: {
      ...Zx(b),
      ...v == null ? void 0 : v.opacity
    },
    overlays: (v == null ? void 0 : v.overlays) || eR(b)
  }, y;
}
function B2(s = {}, ...v) {
  const {
    colorSchemes: p = {
      light: !0
    },
    defaultColorScheme: S,
    disableCssColorScheme: b = !1,
    cssVarPrefix: E = "mui",
    shouldSkipGeneratingVar: y = L2,
    colorSchemeSelector: D = p.light && p.dark ? "media" : void 0,
    ...U
  } = s, j = Object.keys(p)[0], G = S || (p.light && j !== "light" ? "light" : j), A = P2(E), {
    [G]: z,
    light: q,
    dark: ee,
    ...re
  } = p, de = {
    ...re
  };
  let Ue = z;
  if ((G === "dark" && !("dark" in p) || G === "light" && !("light" in p)) && (Ue = !0), !Ue)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The \`colorSchemes.${G}\` option is either missing or invalid.` : ju(21, G));
  const ge = qC(de, Ue, U, G);
  q && !de.light && qC(de, q, void 0, "light"), ee && !de.dark && qC(de, ee, void 0, "dark");
  let ne = {
    defaultColorScheme: G,
    ...ge,
    cssVarPrefix: E,
    colorSchemeSelector: D,
    getCssVar: A,
    colorSchemes: de,
    font: {
      ...g2(ge.typography),
      ...ge.font
    },
    spacing: H2(U.spacing)
  };
  Object.keys(ne.colorSchemes).forEach((xt) => {
    const R = ne.colorSchemes[xt].palette, pe = (Ne) => {
      const be = Ne.split("-"), ye = be[1], Le = be[2];
      return A(Ne, R[ye][Le]);
    };
    if (R.mode === "light" && (Z(R.common, "background", "#fff"), Z(R.common, "onBackground", "#000")), R.mode === "dark" && (Z(R.common, "background", "#000"), Z(R.common, "onBackground", "#fff")), V2(R, ["Alert", "AppBar", "Avatar", "Button", "Chip", "FilledInput", "LinearProgress", "Skeleton", "Slider", "SnackbarContent", "SpeedDialAction", "StepConnector", "StepContent", "Switch", "TableCell", "Tooltip"]), R.mode === "light") {
      Z(R.Alert, "errorColor", dn(R.error.light, 0.6)), Z(R.Alert, "infoColor", dn(R.info.light, 0.6)), Z(R.Alert, "successColor", dn(R.success.light, 0.6)), Z(R.Alert, "warningColor", dn(R.warning.light, 0.6)), Z(R.Alert, "errorFilledBg", pe("palette-error-main")), Z(R.Alert, "infoFilledBg", pe("palette-info-main")), Z(R.Alert, "successFilledBg", pe("palette-success-main")), Z(R.Alert, "warningFilledBg", pe("palette-warning-main")), Z(R.Alert, "errorFilledColor", Dl(() => R.getContrastText(R.error.main))), Z(R.Alert, "infoFilledColor", Dl(() => R.getContrastText(R.info.main))), Z(R.Alert, "successFilledColor", Dl(() => R.getContrastText(R.success.main))), Z(R.Alert, "warningFilledColor", Dl(() => R.getContrastText(R.warning.main))), Z(R.Alert, "errorStandardBg", pn(R.error.light, 0.9)), Z(R.Alert, "infoStandardBg", pn(R.info.light, 0.9)), Z(R.Alert, "successStandardBg", pn(R.success.light, 0.9)), Z(R.Alert, "warningStandardBg", pn(R.warning.light, 0.9)), Z(R.Alert, "errorIconColor", pe("palette-error-main")), Z(R.Alert, "infoIconColor", pe("palette-info-main")), Z(R.Alert, "successIconColor", pe("palette-success-main")), Z(R.Alert, "warningIconColor", pe("palette-warning-main")), Z(R.AppBar, "defaultBg", pe("palette-grey-100")), Z(R.Avatar, "defaultBg", pe("palette-grey-400")), Z(R.Button, "inheritContainedBg", pe("palette-grey-300")), Z(R.Button, "inheritContainedHoverBg", pe("palette-grey-A100")), Z(R.Chip, "defaultBorder", pe("palette-grey-400")), Z(R.Chip, "defaultAvatarColor", pe("palette-grey-700")), Z(R.Chip, "defaultIconColor", pe("palette-grey-700")), Z(R.FilledInput, "bg", "rgba(0, 0, 0, 0.06)"), Z(R.FilledInput, "hoverBg", "rgba(0, 0, 0, 0.09)"), Z(R.FilledInput, "disabledBg", "rgba(0, 0, 0, 0.12)"), Z(R.LinearProgress, "primaryBg", pn(R.primary.main, 0.62)), Z(R.LinearProgress, "secondaryBg", pn(R.secondary.main, 0.62)), Z(R.LinearProgress, "errorBg", pn(R.error.main, 0.62)), Z(R.LinearProgress, "infoBg", pn(R.info.main, 0.62)), Z(R.LinearProgress, "successBg", pn(R.success.main, 0.62)), Z(R.LinearProgress, "warningBg", pn(R.warning.main, 0.62)), Z(R.Skeleton, "bg", `rgba(${pe("palette-text-primaryChannel")} / 0.11)`), Z(R.Slider, "primaryTrack", pn(R.primary.main, 0.62)), Z(R.Slider, "secondaryTrack", pn(R.secondary.main, 0.62)), Z(R.Slider, "errorTrack", pn(R.error.main, 0.62)), Z(R.Slider, "infoTrack", pn(R.info.main, 0.62)), Z(R.Slider, "successTrack", pn(R.success.main, 0.62)), Z(R.Slider, "warningTrack", pn(R.warning.main, 0.62));
      const Ne = Hy(R.background.default, 0.8);
      Z(R.SnackbarContent, "bg", Ne), Z(R.SnackbarContent, "color", Dl(() => R.getContrastText(Ne))), Z(R.SpeedDialAction, "fabHoverBg", Hy(R.background.paper, 0.15)), Z(R.StepConnector, "border", pe("palette-grey-400")), Z(R.StepContent, "border", pe("palette-grey-400")), Z(R.Switch, "defaultColor", pe("palette-common-white")), Z(R.Switch, "defaultDisabledColor", pe("palette-grey-100")), Z(R.Switch, "primaryDisabledColor", pn(R.primary.main, 0.62)), Z(R.Switch, "secondaryDisabledColor", pn(R.secondary.main, 0.62)), Z(R.Switch, "errorDisabledColor", pn(R.error.main, 0.62)), Z(R.Switch, "infoDisabledColor", pn(R.info.main, 0.62)), Z(R.Switch, "successDisabledColor", pn(R.success.main, 0.62)), Z(R.Switch, "warningDisabledColor", pn(R.warning.main, 0.62)), Z(R.TableCell, "border", pn(Vy(R.divider, 1), 0.88)), Z(R.Tooltip, "bg", Vy(R.grey[700], 0.92));
    }
    if (R.mode === "dark") {
      Z(R.Alert, "errorColor", pn(R.error.light, 0.6)), Z(R.Alert, "infoColor", pn(R.info.light, 0.6)), Z(R.Alert, "successColor", pn(R.success.light, 0.6)), Z(R.Alert, "warningColor", pn(R.warning.light, 0.6)), Z(R.Alert, "errorFilledBg", pe("palette-error-dark")), Z(R.Alert, "infoFilledBg", pe("palette-info-dark")), Z(R.Alert, "successFilledBg", pe("palette-success-dark")), Z(R.Alert, "warningFilledBg", pe("palette-warning-dark")), Z(R.Alert, "errorFilledColor", Dl(() => R.getContrastText(R.error.dark))), Z(R.Alert, "infoFilledColor", Dl(() => R.getContrastText(R.info.dark))), Z(R.Alert, "successFilledColor", Dl(() => R.getContrastText(R.success.dark))), Z(R.Alert, "warningFilledColor", Dl(() => R.getContrastText(R.warning.dark))), Z(R.Alert, "errorStandardBg", dn(R.error.light, 0.9)), Z(R.Alert, "infoStandardBg", dn(R.info.light, 0.9)), Z(R.Alert, "successStandardBg", dn(R.success.light, 0.9)), Z(R.Alert, "warningStandardBg", dn(R.warning.light, 0.9)), Z(R.Alert, "errorIconColor", pe("palette-error-main")), Z(R.Alert, "infoIconColor", pe("palette-info-main")), Z(R.Alert, "successIconColor", pe("palette-success-main")), Z(R.Alert, "warningIconColor", pe("palette-warning-main")), Z(R.AppBar, "defaultBg", pe("palette-grey-900")), Z(R.AppBar, "darkBg", pe("palette-background-paper")), Z(R.AppBar, "darkColor", pe("palette-text-primary")), Z(R.Avatar, "defaultBg", pe("palette-grey-600")), Z(R.Button, "inheritContainedBg", pe("palette-grey-800")), Z(R.Button, "inheritContainedHoverBg", pe("palette-grey-700")), Z(R.Chip, "defaultBorder", pe("palette-grey-700")), Z(R.Chip, "defaultAvatarColor", pe("palette-grey-300")), Z(R.Chip, "defaultIconColor", pe("palette-grey-300")), Z(R.FilledInput, "bg", "rgba(255, 255, 255, 0.09)"), Z(R.FilledInput, "hoverBg", "rgba(255, 255, 255, 0.13)"), Z(R.FilledInput, "disabledBg", "rgba(255, 255, 255, 0.12)"), Z(R.LinearProgress, "primaryBg", dn(R.primary.main, 0.5)), Z(R.LinearProgress, "secondaryBg", dn(R.secondary.main, 0.5)), Z(R.LinearProgress, "errorBg", dn(R.error.main, 0.5)), Z(R.LinearProgress, "infoBg", dn(R.info.main, 0.5)), Z(R.LinearProgress, "successBg", dn(R.success.main, 0.5)), Z(R.LinearProgress, "warningBg", dn(R.warning.main, 0.5)), Z(R.Skeleton, "bg", `rgba(${pe("palette-text-primaryChannel")} / 0.13)`), Z(R.Slider, "primaryTrack", dn(R.primary.main, 0.5)), Z(R.Slider, "secondaryTrack", dn(R.secondary.main, 0.5)), Z(R.Slider, "errorTrack", dn(R.error.main, 0.5)), Z(R.Slider, "infoTrack", dn(R.info.main, 0.5)), Z(R.Slider, "successTrack", dn(R.success.main, 0.5)), Z(R.Slider, "warningTrack", dn(R.warning.main, 0.5));
      const Ne = Hy(R.background.default, 0.98);
      Z(R.SnackbarContent, "bg", Ne), Z(R.SnackbarContent, "color", Dl(() => R.getContrastText(Ne))), Z(R.SpeedDialAction, "fabHoverBg", Hy(R.background.paper, 0.15)), Z(R.StepConnector, "border", pe("palette-grey-600")), Z(R.StepContent, "border", pe("palette-grey-600")), Z(R.Switch, "defaultColor", pe("palette-grey-300")), Z(R.Switch, "defaultDisabledColor", pe("palette-grey-600")), Z(R.Switch, "primaryDisabledColor", dn(R.primary.main, 0.55)), Z(R.Switch, "secondaryDisabledColor", dn(R.secondary.main, 0.55)), Z(R.Switch, "errorDisabledColor", dn(R.error.main, 0.55)), Z(R.Switch, "infoDisabledColor", dn(R.info.main, 0.55)), Z(R.Switch, "successDisabledColor", dn(R.success.main, 0.55)), Z(R.Switch, "warningDisabledColor", dn(R.warning.main, 0.55)), Z(R.TableCell, "border", dn(Vy(R.divider, 1), 0.68)), Z(R.Tooltip, "bg", Vy(R.grey[700], 0.92));
    }
    To(R.background, "default"), To(R.background, "paper"), To(R.common, "background"), To(R.common, "onBackground"), To(R, "divider"), Object.keys(R).forEach((Ne) => {
      const be = R[Ne];
      be && typeof be == "object" && (be.main && Z(R[Ne], "mainChannel", Ev(bv(be.main))), be.light && Z(R[Ne], "lightChannel", Ev(bv(be.light))), be.dark && Z(R[Ne], "darkChannel", Ev(bv(be.dark))), be.contrastText && Z(R[Ne], "contrastTextChannel", Ev(bv(be.contrastText))), Ne === "text" && (To(R[Ne], "primary"), To(R[Ne], "secondary")), Ne === "action" && (be.active && To(R[Ne], "active"), be.selected && To(R[Ne], "selected")));
    });
  }), ne = v.reduce((xt, R) => ii(xt, R), ne);
  const _e = {
    prefix: E,
    disableCssColorScheme: b,
    shouldSkipGeneratingVar: y,
    getSelector: z2(ne)
  }, {
    vars: Q,
    generateThemeVars: ot,
    generateStyleSheets: Ke
  } = s2(ne, _e);
  return ne.vars = Q, Object.entries(ne.colorSchemes[ne.defaultColorScheme]).forEach(([xt, R]) => {
    ne[xt] = R;
  }), ne.generateThemeVars = ot, ne.generateStyleSheets = Ke, ne.generateSpacing = function() {
    return Xx(U.spacing, sE(this));
  }, ne.getColorSchemeSelector = c2(D), ne.spacing = ne.generateSpacing(), ne.shouldSkipGeneratingVar = y, ne.unstable_sxConfig = {
    ...rg,
    ...U == null ? void 0 : U.unstable_sxConfig
  }, ne.unstable_sx = function(R) {
    return ag({
      sx: R,
      theme: this
    });
  }, ne.toRuntimeSource = j2, ne;
}
function Mx(s, v, p) {
  s.colorSchemes && p && (s.colorSchemes[v] = {
    ...p !== !0 && p,
    palette: vE({
      ...p === !0 ? {} : p.palette,
      mode: v
    })
    // cast type to skip module augmentation test
  });
}
function $2(s = {}, ...v) {
  const {
    palette: p,
    cssVariables: S = !1,
    colorSchemes: b = p ? void 0 : {
      light: !0
    },
    defaultColorScheme: E = p == null ? void 0 : p.mode,
    ...y
  } = s, D = E || "light", U = b == null ? void 0 : b[D], j = {
    ...b,
    ...p ? {
      [D]: {
        ...typeof U != "boolean" && U,
        palette: p
      }
    } : void 0
  };
  if (S === !1) {
    if (!("colorSchemes" in s))
      return nE(s, ...v);
    let G = p;
    "palette" in s || j[D] && (j[D] !== !0 ? G = j[D].palette : D === "dark" && (G = {
      mode: "dark"
    }));
    const A = nE({
      ...s,
      palette: G
    }, ...v);
    return A.defaultColorScheme = D, A.colorSchemes = j, A.palette.mode === "light" && (A.colorSchemes.light = {
      ...j.light !== !0 && j.light,
      palette: A.palette
    }, Mx(A, "dark", j.dark)), A.palette.mode === "dark" && (A.colorSchemes.dark = {
      ...j.dark !== !0 && j.dark,
      palette: A.palette
    }, Mx(A, "light", j.light)), A;
  }
  return !p && !("light" in j) && D === "light" && (j.light = !0), B2({
    ...y,
    colorSchemes: j,
    defaultColorScheme: D,
    ...typeof S != "boolean" && S
  }, ...v);
}
const G2 = $2({
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
  rE(vA, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  rE(jA, {
    props: { handleOnSubmit: "function" }
  })
);
customElements.define(
  "rwc-dinamyc-form",
  rE($A, {
    props: { formConfig: "json", onSubmit: "function" }
  })
);
export {
  jA as Form,
  vA as Header,
  $A as WrapperForm,
  G2 as theme
};
