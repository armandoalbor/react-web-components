import wn, { useEffect as ek, useState as tk } from "react";
var Q0 = { exports: {} }, Ua = {}, Jm = { exports: {} }, V0 = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zT;
function nk() {
  return zT || (zT = 1, function(h) {
    function C(ee, Oe) {
      var de = ee.length;
      ee.push(Oe);
      e: for (; 0 < de; ) {
        var ht = de - 1 >>> 1, gt = ee[ht];
        if (0 < P(gt, Oe)) ee[ht] = Oe, ee[de] = gt, de = ht;
        else break e;
      }
    }
    function y(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function L(ee) {
      if (ee.length === 0) return null;
      var Oe = ee[0], de = ee.pop();
      if (de !== Oe) {
        ee[0] = de;
        e: for (var ht = 0, gt = ee.length, bn = gt >>> 1; ht < bn; ) {
          var An = 2 * (ht + 1) - 1, ca = ee[An], en = An + 1, yr = ee[en];
          if (0 > P(ca, de)) en < gt && 0 > P(yr, ca) ? (ee[ht] = yr, ee[en] = de, ht = en) : (ee[ht] = ca, ee[An] = de, ht = An);
          else if (en < gt && 0 > P(yr, de)) ee[ht] = yr, ee[en] = de, ht = en;
          else break e;
        }
      }
      return Oe;
    }
    function P(ee, Oe) {
      var de = ee.sortIndex - Oe.sortIndex;
      return de !== 0 ? de : ee.id - Oe.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var k = performance;
      h.unstable_now = function() {
        return k.now();
      };
    } else {
      var S = Date, te = S.now();
      h.unstable_now = function() {
        return S.now() - te;
      };
    }
    var ne = [], se = [], De = 1, Y = null, ce = 3, ie = !1, xe = !1, Ze = !1, Ge = typeof setTimeout == "function" ? setTimeout : null, wt = typeof clearTimeout == "function" ? clearTimeout : null, Ee = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Ie(ee) {
      for (var Oe = y(se); Oe !== null; ) {
        if (Oe.callback === null) L(se);
        else if (Oe.startTime <= ee) L(se), Oe.sortIndex = Oe.expirationTime, C(ne, Oe);
        else break;
        Oe = y(se);
      }
    }
    function ot(ee) {
      if (Ze = !1, Ie(ee), !xe) if (y(ne) !== null) xe = !0, st(Ne);
      else {
        var Oe = y(se);
        Oe !== null && Ut(ot, Oe.startTime - ee);
      }
    }
    function Ne(ee, Oe) {
      xe = !1, Ze && (Ze = !1, wt(Yt), Yt = -1), ie = !0;
      var de = ce;
      try {
        for (Ie(Oe), Y = y(ne); Y !== null && (!(Y.expirationTime > Oe) || ee && !Et()); ) {
          var ht = Y.callback;
          if (typeof ht == "function") {
            Y.callback = null, ce = Y.priorityLevel;
            var gt = ht(Y.expirationTime <= Oe);
            Oe = h.unstable_now(), typeof gt == "function" ? Y.callback = gt : Y === y(ne) && L(ne), Ie(Oe);
          } else L(ne);
          Y = y(ne);
        }
        if (Y !== null) var bn = !0;
        else {
          var An = y(se);
          An !== null && Ut(ot, An.startTime - Oe), bn = !1;
        }
        return bn;
      } finally {
        Y = null, ce = de, ie = !1;
      }
    }
    var Ct = !1, Xe = null, Yt = -1, Jt = 5, pt = -1;
    function Et() {
      return !(h.unstable_now() - pt < Jt);
    }
    function Ve() {
      if (Xe !== null) {
        var ee = h.unstable_now();
        pt = ee;
        var Oe = !0;
        try {
          Oe = Xe(!0, ee);
        } finally {
          Oe ? fe() : (Ct = !1, Xe = null);
        }
      } else Ct = !1;
    }
    var fe;
    if (typeof Ee == "function") fe = function() {
      Ee(Ve);
    };
    else if (typeof MessageChannel < "u") {
      var Fe = new MessageChannel(), vt = Fe.port2;
      Fe.port1.onmessage = Ve, fe = function() {
        vt.postMessage(null);
      };
    } else fe = function() {
      Ge(Ve, 0);
    };
    function st(ee) {
      Xe = ee, Ct || (Ct = !0, fe());
    }
    function Ut(ee, Oe) {
      Yt = Ge(function() {
        ee(h.unstable_now());
      }, Oe);
    }
    h.unstable_IdlePriority = 5, h.unstable_ImmediatePriority = 1, h.unstable_LowPriority = 4, h.unstable_NormalPriority = 3, h.unstable_Profiling = null, h.unstable_UserBlockingPriority = 2, h.unstable_cancelCallback = function(ee) {
      ee.callback = null;
    }, h.unstable_continueExecution = function() {
      xe || ie || (xe = !0, st(Ne));
    }, h.unstable_forceFrameRate = function(ee) {
      0 > ee || 125 < ee ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Jt = 0 < ee ? Math.floor(1e3 / ee) : 5;
    }, h.unstable_getCurrentPriorityLevel = function() {
      return ce;
    }, h.unstable_getFirstCallbackNode = function() {
      return y(ne);
    }, h.unstable_next = function(ee) {
      switch (ce) {
        case 1:
        case 2:
        case 3:
          var Oe = 3;
          break;
        default:
          Oe = ce;
      }
      var de = ce;
      ce = Oe;
      try {
        return ee();
      } finally {
        ce = de;
      }
    }, h.unstable_pauseExecution = function() {
    }, h.unstable_requestPaint = function() {
    }, h.unstable_runWithPriority = function(ee, Oe) {
      switch (ee) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          ee = 3;
      }
      var de = ce;
      ce = ee;
      try {
        return Oe();
      } finally {
        ce = de;
      }
    }, h.unstable_scheduleCallback = function(ee, Oe, de) {
      var ht = h.unstable_now();
      switch (typeof de == "object" && de !== null ? (de = de.delay, de = typeof de == "number" && 0 < de ? ht + de : ht) : de = ht, ee) {
        case 1:
          var gt = -1;
          break;
        case 2:
          gt = 250;
          break;
        case 5:
          gt = 1073741823;
          break;
        case 4:
          gt = 1e4;
          break;
        default:
          gt = 5e3;
      }
      return gt = de + gt, ee = { id: De++, callback: Oe, priorityLevel: ee, startTime: de, expirationTime: gt, sortIndex: -1 }, de > ht ? (ee.sortIndex = de, C(se, ee), y(ne) === null && ee === y(se) && (Ze ? (wt(Yt), Yt = -1) : Ze = !0, Ut(ot, de - ht))) : (ee.sortIndex = gt, C(ne, ee), xe || ie || (xe = !0, st(Ne))), ee;
    }, h.unstable_shouldYield = Et, h.unstable_wrapCallback = function(ee) {
      var Oe = ce;
      return function() {
        var de = ce;
        ce = Oe;
        try {
          return ee.apply(this, arguments);
        } finally {
          ce = de;
        }
      };
    };
  }(V0)), V0;
}
var j0 = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var AT;
function rk() {
  return AT || (AT = 1, function(h) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var C = !1, y = !1, L = 5;
      function P(ae, Ue) {
        var rt = ae.length;
        ae.push(Ue), te(ae, Ue, rt);
      }
      function k(ae) {
        return ae.length === 0 ? null : ae[0];
      }
      function S(ae) {
        if (ae.length === 0)
          return null;
        var Ue = ae[0], rt = ae.pop();
        return rt !== Ue && (ae[0] = rt, ne(ae, rt, 0)), Ue;
      }
      function te(ae, Ue, rt) {
        for (var bt = rt; bt > 0; ) {
          var jt = bt - 1 >>> 1, Vn = ae[jt];
          if (se(Vn, Ue) > 0)
            ae[jt] = Ue, ae[bt] = Vn, bt = jt;
          else
            return;
        }
      }
      function ne(ae, Ue, rt) {
        for (var bt = rt, jt = ae.length, Vn = jt >>> 1; bt < Vn; ) {
          var pn = (bt + 1) * 2 - 1, Or = ae[pn], Bt = pn + 1, Gr = ae[Bt];
          if (se(Or, Ue) < 0)
            Bt < jt && se(Gr, Or) < 0 ? (ae[bt] = Gr, ae[Bt] = Ue, bt = Bt) : (ae[bt] = Or, ae[pn] = Ue, bt = pn);
          else if (Bt < jt && se(Gr, Ue) < 0)
            ae[bt] = Gr, ae[Bt] = Ue, bt = Bt;
          else
            return;
        }
      }
      function se(ae, Ue) {
        var rt = ae.sortIndex - Ue.sortIndex;
        return rt !== 0 ? rt : ae.id - Ue.id;
      }
      var De = 1, Y = 2, ce = 3, ie = 4, xe = 5;
      function Ze(ae, Ue) {
      }
      var Ge = typeof performance == "object" && typeof performance.now == "function";
      if (Ge) {
        var wt = performance;
        h.unstable_now = function() {
          return wt.now();
        };
      } else {
        var Ee = Date, Ie = Ee.now();
        h.unstable_now = function() {
          return Ee.now() - Ie;
        };
      }
      var ot = 1073741823, Ne = -1, Ct = 250, Xe = 5e3, Yt = 1e4, Jt = ot, pt = [], Et = [], Ve = 1, fe = null, Fe = ce, vt = !1, st = !1, Ut = !1, ee = typeof setTimeout == "function" ? setTimeout : null, Oe = typeof clearTimeout == "function" ? clearTimeout : null, de = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ht(ae) {
        for (var Ue = k(Et); Ue !== null; ) {
          if (Ue.callback === null)
            S(Et);
          else if (Ue.startTime <= ae)
            S(Et), Ue.sortIndex = Ue.expirationTime, P(pt, Ue);
          else
            return;
          Ue = k(Et);
        }
      }
      function gt(ae) {
        if (Ut = !1, ht(ae), !st)
          if (k(pt) !== null)
            st = !0, _t(bn);
          else {
            var Ue = k(Et);
            Ue !== null && at(gt, Ue.startTime - ae);
          }
      }
      function bn(ae, Ue) {
        st = !1, Ut && (Ut = !1, dn()), vt = !0;
        var rt = Fe;
        try {
          var bt;
          if (!y) return An(ae, Ue);
        } finally {
          fe = null, Fe = rt, vt = !1;
        }
      }
      function An(ae, Ue) {
        var rt = Ue;
        for (ht(rt), fe = k(pt); fe !== null && !C && !(fe.expirationTime > rt && (!ae || U())); ) {
          var bt = fe.callback;
          if (typeof bt == "function") {
            fe.callback = null, Fe = fe.priorityLevel;
            var jt = fe.expirationTime <= rt, Vn = bt(jt);
            rt = h.unstable_now(), typeof Vn == "function" ? fe.callback = Vn : fe === k(pt) && S(pt), ht(rt);
          } else
            S(pt);
          fe = k(pt);
        }
        if (fe !== null)
          return !0;
        var pn = k(Et);
        return pn !== null && at(gt, pn.startTime - rt), !1;
      }
      function ca(ae, Ue) {
        switch (ae) {
          case De:
          case Y:
          case ce:
          case ie:
          case xe:
            break;
          default:
            ae = ce;
        }
        var rt = Fe;
        Fe = ae;
        try {
          return Ue();
        } finally {
          Fe = rt;
        }
      }
      function en(ae) {
        var Ue;
        switch (Fe) {
          case De:
          case Y:
          case ce:
            Ue = ce;
            break;
          default:
            Ue = Fe;
            break;
        }
        var rt = Fe;
        Fe = Ue;
        try {
          return ae();
        } finally {
          Fe = rt;
        }
      }
      function yr(ae) {
        var Ue = Fe;
        return function() {
          var rt = Fe;
          Fe = Ue;
          try {
            return ae.apply(this, arguments);
          } finally {
            Fe = rt;
          }
        };
      }
      function gn(ae, Ue, rt) {
        var bt = h.unstable_now(), jt;
        if (typeof rt == "object" && rt !== null) {
          var Vn = rt.delay;
          typeof Vn == "number" && Vn > 0 ? jt = bt + Vn : jt = bt;
        } else
          jt = bt;
        var pn;
        switch (ae) {
          case De:
            pn = Ne;
            break;
          case Y:
            pn = Ct;
            break;
          case xe:
            pn = Jt;
            break;
          case ie:
            pn = Yt;
            break;
          case ce:
          default:
            pn = Xe;
            break;
        }
        var Or = jt + pn, Bt = {
          id: Ve++,
          callback: Ue,
          priorityLevel: ae,
          startTime: jt,
          expirationTime: Or,
          sortIndex: -1
        };
        return jt > bt ? (Bt.sortIndex = jt, P(Et, Bt), k(pt) === null && Bt === k(Et) && (Ut ? dn() : Ut = !0, at(gt, jt - bt))) : (Bt.sortIndex = Or, P(pt, Bt), !st && !vt && (st = !0, _t(bn))), Bt;
      }
      function qn() {
      }
      function fa() {
        !st && !vt && (st = !0, _t(bn));
      }
      function Xn() {
        return k(pt);
      }
      function kr(ae) {
        ae.callback = null;
      }
      function fn() {
        return Fe;
      }
      var Dn = !1, Fn = null, Hn = -1, Kn = L, x = -1;
      function U() {
        var ae = h.unstable_now() - x;
        return !(ae < Kn);
      }
      function V() {
      }
      function re(ae) {
        if (ae < 0 || ae > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        ae > 0 ? Kn = Math.floor(1e3 / ae) : Kn = L;
      }
      var Z = function() {
        if (Fn !== null) {
          var ae = h.unstable_now();
          x = ae;
          var Ue = !0, rt = !0;
          try {
            rt = Fn(Ue, ae);
          } finally {
            rt ? q() : (Dn = !1, Fn = null);
          }
        } else
          Dn = !1;
      }, q;
      if (typeof de == "function")
        q = function() {
          de(Z);
        };
      else if (typeof MessageChannel < "u") {
        var Se = new MessageChannel(), Je = Se.port2;
        Se.port1.onmessage = Z, q = function() {
          Je.postMessage(null);
        };
      } else
        q = function() {
          ee(Z, 0);
        };
      function _t(ae) {
        Fn = ae, Dn || (Dn = !0, q());
      }
      function at(ae, Ue) {
        Hn = ee(function() {
          ae(h.unstable_now());
        }, Ue);
      }
      function dn() {
        Oe(Hn), Hn = -1;
      }
      var qa = V, gr = null;
      h.unstable_IdlePriority = xe, h.unstable_ImmediatePriority = De, h.unstable_LowPriority = ie, h.unstable_NormalPriority = ce, h.unstable_Profiling = gr, h.unstable_UserBlockingPriority = Y, h.unstable_cancelCallback = kr, h.unstable_continueExecution = fa, h.unstable_forceFrameRate = re, h.unstable_getCurrentPriorityLevel = fn, h.unstable_getFirstCallbackNode = Xn, h.unstable_next = en, h.unstable_pauseExecution = qn, h.unstable_requestPaint = qa, h.unstable_runWithPriority = ca, h.unstable_scheduleCallback = gn, h.unstable_shouldYield = U, h.unstable_wrapCallback = yr, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(j0)), j0;
}
var FT;
function JT() {
  return FT || (FT = 1, process.env.NODE_ENV === "production" ? Jm.exports = nk() : Jm.exports = rk()), Jm.exports;
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
var HT;
function ak() {
  if (HT) return Ua;
  HT = 1;
  var h = wn, C = JT();
  function y(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var L = /* @__PURE__ */ new Set(), P = {};
  function k(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (P[n] = r, n = 0; n < r.length; n++) L.add(r[n]);
  }
  var te = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ne = Object.prototype.hasOwnProperty, se = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, De = {}, Y = {};
  function ce(n) {
    return ne.call(Y, n) ? !0 : ne.call(De, n) ? !1 : se.test(n) ? Y[n] = !0 : (De[n] = !0, !1);
  }
  function ie(n, r, l, o) {
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
  function xe(n, r, l, o) {
    if (r === null || typeof r > "u" || ie(n, r, l, o)) return !0;
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
  function Ze(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var Ge = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    Ge[n] = new Ze(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    Ge[r] = new Ze(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    Ge[n] = new Ze(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    Ge[n] = new Ze(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    Ge[n] = new Ze(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    Ge[n] = new Ze(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    Ge[n] = new Ze(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    Ge[n] = new Ze(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    Ge[n] = new Ze(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var wt = /[\-:]([a-z])/g;
  function Ee(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      wt,
      Ee
    );
    Ge[r] = new Ze(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(wt, Ee);
    Ge[r] = new Ze(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(wt, Ee);
    Ge[r] = new Ze(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    Ge[n] = new Ze(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), Ge.xlinkHref = new Ze("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    Ge[n] = new Ze(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function Ie(n, r, l, o) {
    var c = Ge.hasOwnProperty(r) ? Ge[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (xe(r, l, c, o) && (l = null), o || c === null ? ce(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var ot = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Ne = Symbol.for("react.element"), Ct = Symbol.for("react.portal"), Xe = Symbol.for("react.fragment"), Yt = Symbol.for("react.strict_mode"), Jt = Symbol.for("react.profiler"), pt = Symbol.for("react.provider"), Et = Symbol.for("react.context"), Ve = Symbol.for("react.forward_ref"), fe = Symbol.for("react.suspense"), Fe = Symbol.for("react.suspense_list"), vt = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Ut = Symbol.for("react.offscreen"), ee = Symbol.iterator;
  function Oe(n) {
    return n === null || typeof n != "object" ? null : (n = ee && n[ee] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var de = Object.assign, ht;
  function gt(n) {
    if (ht === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      ht = r && r[1] || "";
    }
    return `
` + ht + n;
  }
  var bn = !1;
  function An(n, r) {
    if (!n || bn) return "";
    bn = !0;
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
        } catch (F) {
          var o = F;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (F) {
          o = F;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (F) {
          o = F;
        }
        n();
      }
    } catch (F) {
      if (F && o && typeof F.stack == "string") {
        for (var c = F.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, T = d.length - 1; 1 <= m && 0 <= T && c[m] !== d[T]; ) T--;
        for (; 1 <= m && 0 <= T; m--, T--) if (c[m] !== d[T]) {
          if (m !== 1 || T !== 1)
            do
              if (m--, T--, 0 > T || c[m] !== d[T]) {
                var w = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && w.includes("<anonymous>") && (w = w.replace("<anonymous>", n.displayName)), w;
              }
            while (1 <= m && 0 <= T);
          break;
        }
      }
    } finally {
      bn = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? gt(n) : "";
  }
  function ca(n) {
    switch (n.tag) {
      case 5:
        return gt(n.type);
      case 16:
        return gt("Lazy");
      case 13:
        return gt("Suspense");
      case 19:
        return gt("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = An(n.type, !1), n;
      case 11:
        return n = An(n.type.render, !1), n;
      case 1:
        return n = An(n.type, !0), n;
      default:
        return "";
    }
  }
  function en(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Xe:
        return "Fragment";
      case Ct:
        return "Portal";
      case Jt:
        return "Profiler";
      case Yt:
        return "StrictMode";
      case fe:
        return "Suspense";
      case Fe:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Et:
        return (n.displayName || "Context") + ".Consumer";
      case pt:
        return (n._context.displayName || "Context") + ".Provider";
      case Ve:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case vt:
        return r = n.displayName || null, r !== null ? r : en(n.type) || "Memo";
      case st:
        r = n._payload, n = n._init;
        try {
          return en(n(r));
        } catch {
        }
    }
    return null;
  }
  function yr(n) {
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
        return en(r);
      case 8:
        return r === Yt ? "StrictMode" : "Mode";
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
  function gn(n) {
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
  function qn(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function fa(n) {
    var r = qn(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Xn(n) {
    n._valueTracker || (n._valueTracker = fa(n));
  }
  function kr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = qn(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function fn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function Dn(n, r) {
    var l = r.checked;
    return de({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Fn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = gn(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Hn(n, r) {
    r = r.checked, r != null && Ie(n, "checked", r, !1);
  }
  function Kn(n, r) {
    Hn(n, r);
    var l = gn(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? U(n, r.type, l) : r.hasOwnProperty("defaultValue") && U(n, r.type, gn(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function x(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function U(n, r, l) {
    (r !== "number" || fn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var V = Array.isArray;
  function re(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + gn(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Z(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(y(91));
    return de({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function q(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(y(92));
        if (V(l)) {
          if (1 < l.length) throw Error(y(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: gn(l) };
  }
  function Se(n, r) {
    var l = gn(r.value), o = gn(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function Je(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function _t(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function at(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? _t(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var dn, qa = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (dn = dn || document.createElement("div"), dn.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = dn.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function gr(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var ae = {
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
  }, Ue = ["Webkit", "ms", "Moz", "O"];
  Object.keys(ae).forEach(function(n) {
    Ue.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), ae[r] = ae[n];
    });
  });
  function rt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || ae.hasOwnProperty(n) && ae[n] ? ("" + r).trim() : r + "px";
  }
  function bt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = rt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var jt = de({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function Vn(n, r) {
    if (r) {
      if (jt[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(y(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(y(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(y(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(y(62));
    }
  }
  function pn(n, r) {
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
  var Or = null;
  function Bt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var Gr = null, Ht = null, Pt = null;
  function su(n) {
    if (n = $o(n)) {
      if (typeof Gr != "function") throw Error(y(280));
      var r = n.stateNode;
      r && (r = He(r), Gr(n.stateNode, n.type, r));
    }
  }
  function gl(n) {
    Ht ? Pt ? Pt.push(n) : Pt = [n] : Ht = n;
  }
  function cu() {
    if (Ht) {
      var n = Ht, r = Pt;
      if (Pt = Ht = null, su(n), r) for (n = 0; n < r.length; n++) su(r[n]);
    }
  }
  function Co(n, r) {
    return n(r);
  }
  function Ns() {
  }
  var Sl = !1;
  function fu(n, r, l) {
    if (Sl) return n(r, l);
    Sl = !0;
    try {
      return Co(n, r, l);
    } finally {
      Sl = !1, (Ht !== null || Pt !== null) && (Ns(), cu());
    }
  }
  function El(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = He(l);
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
    if (l && typeof l != "function") throw Error(y(231, r, typeof l));
    return l;
  }
  var du = !1;
  if (te) try {
    var Xa = {};
    Object.defineProperty(Xa, "passive", { get: function() {
      du = !0;
    } }), window.addEventListener("test", Xa, Xa), window.removeEventListener("test", Xa, Xa);
  } catch {
    du = !1;
  }
  function di(n, r, l, o, c, d, m, T, w) {
    var F = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, F);
    } catch (W) {
      this.onError(W);
    }
  }
  var qr = !1, Fa = null, ji = !1, Cl = null, R = { onError: function(n) {
    qr = !0, Fa = n;
  } };
  function G(n, r, l, o, c, d, m, T, w) {
    qr = !1, Fa = null, di.apply(R, arguments);
  }
  function le(n, r, l, o, c, d, m, T, w) {
    if (G.apply(this, arguments), qr) {
      if (qr) {
        var F = Fa;
        qr = !1, Fa = null;
      } else throw Error(y(198));
      ji || (ji = !0, Cl = F);
    }
  }
  function ze(n) {
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
  function dt(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function St(n) {
    if (ze(n) !== n) throw Error(y(188));
  }
  function $e(n) {
    var r = n.alternate;
    if (!r) {
      if (r = ze(n), r === null) throw Error(y(188));
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
          if (d === l) return St(c), n;
          if (d === o) return St(c), r;
          d = d.sibling;
        }
        throw Error(y(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, T = c.child; T; ) {
          if (T === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (T === o) {
            m = !0, o = c, l = d;
            break;
          }
          T = T.sibling;
        }
        if (!m) {
          for (T = d.child; T; ) {
            if (T === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (T === o) {
              m = !0, o = d, l = c;
              break;
            }
            T = T.sibling;
          }
          if (!m) throw Error(y(189));
        }
      }
      if (l.alternate !== o) throw Error(y(190));
    }
    if (l.tag !== 3) throw Error(y(188));
    return l.stateNode.current === l ? n : r;
  }
  function it(n) {
    return n = $e(n), n !== null ? jn(n) : null;
  }
  function jn(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = jn(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var It = C.unstable_scheduleCallback, tn = C.unstable_cancelCallback, Lr = C.unstable_shouldYield, Bi = C.unstable_requestPaint, kt = C.unstable_now, cr = C.unstable_getCurrentPriorityLevel, Xr = C.unstable_ImmediatePriority, lt = C.unstable_UserBlockingPriority, Ka = C.unstable_NormalPriority, Xp = C.unstable_LowPriority, Nf = C.unstable_IdlePriority, To = null, Ha = null;
  function Kp(n) {
    if (Ha && typeof Ha.onCommitFiberRoot == "function") try {
      Ha.onCommitFiberRoot(To, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var da = Math.clz32 ? Math.clz32 : fy, Zp = Math.log, Jp = Math.LN2;
  function fy(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (Zp(n) / Jp | 0) | 0;
  }
  var Us = 64, pu = 4194304;
  function Tl(n) {
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
  function Va(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var T = m & ~c;
      T !== 0 ? o = Tl(T) : (d &= m, d !== 0 && (o = Tl(d)));
    } else m = l & ~c, m !== 0 ? o = Tl(m) : d !== 0 && (o = Tl(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - da(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Uf(n, r) {
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
  function zs(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - da(d), T = 1 << m, w = c[m];
      w === -1 ? (!(T & l) || T & o) && (c[m] = Uf(T, r)) : w <= r && (n.expiredLanes |= T), d &= ~T;
    }
  }
  function zf(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function As() {
    var n = Us;
    return Us <<= 1, !(Us & 4194240) && (Us = 64), n;
  }
  function Af(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Rl(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - da(r), n[r] = l;
  }
  function dy(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - da(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Ro(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - da(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Mt = 0;
  function Ff(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var ev, Fs, Nt, tv, Hf, et = !1, xo = [], Sn = null, pa = null, va = null, wo = /* @__PURE__ */ new Map(), _n = /* @__PURE__ */ new Map(), zt = [], py = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function ja(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Sn = null;
        break;
      case "dragenter":
      case "dragleave":
        pa = null;
        break;
      case "mouseover":
      case "mouseout":
        va = null;
        break;
      case "pointerover":
      case "pointerout":
        wo.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        _n.delete(r.pointerId);
    }
  }
  function fr(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = $o(r), r !== null && Fs(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Pi(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Sn = fr(Sn, n, r, l, o, c), !0;
      case "dragenter":
        return pa = fr(pa, n, r, l, o, c), !0;
      case "mouseover":
        return va = fr(va, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return wo.set(d, fr(wo.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, _n.set(d, fr(_n.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function nv(n) {
    var r = ma(n.target);
    if (r !== null) {
      var l = ze(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = dt(l), r !== null) {
            n.blockedOn = r, Hf(n.priority, function() {
              Nt(l);
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
  function vu(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = js(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        Or = o, l.target.dispatchEvent(o), Or = null;
      } else return r = $o(l), r !== null && Fs(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function Vf(n, r, l) {
    vu(n) && l.delete(r);
  }
  function rv() {
    et = !1, Sn !== null && vu(Sn) && (Sn = null), pa !== null && vu(pa) && (pa = null), va !== null && vu(va) && (va = null), wo.forEach(Vf), _n.forEach(Vf);
  }
  function bo(n, r) {
    n.blockedOn === r && (n.blockedOn = null, et || (et = !0, C.unstable_scheduleCallback(C.unstable_NormalPriority, rv)));
  }
  function Do(n) {
    function r(c) {
      return bo(c, n);
    }
    if (0 < xo.length) {
      bo(xo[0], n);
      for (var l = 1; l < xo.length; l++) {
        var o = xo[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Sn !== null && bo(Sn, n), pa !== null && bo(pa, n), va !== null && bo(va, n), wo.forEach(r), _n.forEach(r), l = 0; l < zt.length; l++) o = zt[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < zt.length && (l = zt[0], l.blockedOn === null); ) nv(l), l.blockedOn === null && zt.shift();
  }
  var hu = ot.ReactCurrentBatchConfig, xl = !0;
  function av(n, r, l, o) {
    var c = Mt, d = hu.transition;
    hu.transition = null;
    try {
      Mt = 1, Vs(n, r, l, o);
    } finally {
      Mt = c, hu.transition = d;
    }
  }
  function Hs(n, r, l, o) {
    var c = Mt, d = hu.transition;
    hu.transition = null;
    try {
      Mt = 4, Vs(n, r, l, o);
    } finally {
      Mt = c, hu.transition = d;
    }
  }
  function Vs(n, r, l, o) {
    if (xl) {
      var c = js(n, r, l, o);
      if (c === null) Zs(n, r, o, _o, l), ja(n, o);
      else if (Pi(c, n, r, l, o)) o.stopPropagation();
      else if (ja(n, o), r & 4 && -1 < py.indexOf(n)) {
        for (; c !== null; ) {
          var d = $o(c);
          if (d !== null && ev(d), d = js(n, r, l, o), d === null && Zs(n, r, o, _o, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else Zs(n, r, o, null, l);
    }
  }
  var _o = null;
  function js(n, r, l, o) {
    if (_o = null, n = Bt(o), n = ma(n), n !== null) if (r = ze(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = dt(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return _o = n, null;
  }
  function jf(n) {
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
        switch (cr()) {
          case Xr:
            return 1;
          case lt:
            return 4;
          case Ka:
          case Xp:
            return 16;
          case Nf:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pi = null, ko = null, Oo = null;
  function Bf() {
    if (Oo) return Oo;
    var n, r = ko, l = r.length, o, c = "value" in pi ? pi.value : pi.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return Oo = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function mu(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function Lo() {
    return !0;
  }
  function iv() {
    return !1;
  }
  function Kr(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var T in n) n.hasOwnProperty(T) && (l = n[T], this[T] = l ? l(d) : d[T]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? Lo : iv, this.isPropagationStopped = iv, this;
    }
    return de(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Lo);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Lo);
    }, persist: function() {
    }, isPersistent: Lo }), r;
  }
  var $i = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Bs = Kr($i), yu = de({}, $i, { view: 0, detail: 0 }), lv = Kr(yu), Ps, Pf, Mo, Bn = de({}, yu, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Qf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Mo && (Mo && n.type === "mousemove" ? (Ps = n.screenX - Mo.screenX, Pf = n.screenY - Mo.screenY) : Pf = Ps = 0, Mo = n), Ps);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : Pf;
  } }), $s = Kr(Bn), uv = de({}, Bn, { dataTransfer: 0 }), ov = Kr(uv), vy = de({}, yu, { relatedTarget: 0 }), Yi = Kr(vy), $f = de({}, $i, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), sv = Kr($f), hy = de({}, $i, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), my = Kr(hy), yy = de({}, $i, { data: 0 }), Yf = Kr(yy), If = {
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
  }, cv = {
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
  }, fv = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function dv(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = fv[n]) ? !!r[n] : !1;
  }
  function Qf() {
    return dv;
  }
  var vi = de({}, yu, { key: function(n) {
    if (n.key) {
      var r = If[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = mu(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? cv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Qf, charCode: function(n) {
    return n.type === "keypress" ? mu(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? mu(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), gy = Kr(vi), Wf = de({}, Bn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Ys = Kr(Wf), Gf = de({}, yu, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Qf }), Sy = Kr(Gf), Is = de({}, $i, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), pv = Kr(Is), Mr = de({}, Bn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), hi = Kr(Mr), En = [9, 13, 27, 32], Ba = te && "CompositionEvent" in window, wl = null;
  te && "documentMode" in document && (wl = document.documentMode);
  var Qs = te && "TextEvent" in window && !wl, vv = te && (!Ba || wl && 8 < wl && 11 >= wl), gu = " ", hv = !1;
  function mv(n, r) {
    switch (n) {
      case "keyup":
        return En.indexOf(r.keyCode) !== -1;
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
  function Ws(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var Su = !1;
  function Ey(n, r) {
    switch (n) {
      case "compositionend":
        return Ws(r);
      case "keypress":
        return r.which !== 32 ? null : (hv = !0, gu);
      case "textInput":
        return n = r.data, n === gu && hv ? null : n;
      default:
        return null;
    }
  }
  function Cy(n, r) {
    if (Su) return n === "compositionend" || !Ba && mv(n, r) ? (n = Bf(), Oo = ko = pi = null, Su = !1, n) : null;
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
        return vv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var yv = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function gv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!yv[n.type] : r === "textarea";
  }
  function Sv(n, r, l, o) {
    gl(o), r = jo(r, "onChange"), 0 < r.length && (l = new Bs("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var No = null, Eu = null;
  function Cu(n) {
    Ks(n, 0);
  }
  function Tu(n) {
    var r = xu(n);
    if (kr(r)) return n;
  }
  function Ev(n, r) {
    if (n === "change") return r;
  }
  var qf = !1;
  if (te) {
    var Xf;
    if (te) {
      var Kf = "oninput" in document;
      if (!Kf) {
        var Cv = document.createElement("div");
        Cv.setAttribute("oninput", "return;"), Kf = typeof Cv.oninput == "function";
      }
      Xf = Kf;
    } else Xf = !1;
    qf = Xf && (!document.documentMode || 9 < document.documentMode);
  }
  function Tv() {
    No && (No.detachEvent("onpropertychange", Rv), Eu = No = null);
  }
  function Rv(n) {
    if (n.propertyName === "value" && Tu(Eu)) {
      var r = [];
      Sv(r, Eu, n, Bt(n)), fu(Cu, r);
    }
  }
  function Ty(n, r, l) {
    n === "focusin" ? (Tv(), No = r, Eu = l, No.attachEvent("onpropertychange", Rv)) : n === "focusout" && Tv();
  }
  function Ry(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Tu(Eu);
  }
  function xy(n, r) {
    if (n === "click") return Tu(r);
  }
  function xv(n, r) {
    if (n === "input" || n === "change") return Tu(r);
  }
  function wy(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ha = typeof Object.is == "function" ? Object.is : wy;
  function Uo(n, r) {
    if (ha(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!ne.call(r, c) || !ha(n[c], r[c])) return !1;
    }
    return !0;
  }
  function wv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function bv(n, r) {
    var l = wv(n);
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
      l = wv(l);
    }
  }
  function Dv(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Dv(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Gs() {
    for (var n = window, r = fn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = fn(n.document);
    }
    return r;
  }
  function mi(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function qs(n) {
    var r = Gs(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Dv(l.ownerDocument.documentElement, l)) {
      if (o !== null && mi(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = bv(l, d);
          var m = bv(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var _v = te && "documentMode" in document && 11 >= document.documentMode, Pa = null, Zf = null, zo = null, Jf = !1;
  function kv(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    Jf || Pa == null || Pa !== fn(o) || (o = Pa, "selectionStart" in o && mi(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), zo && Uo(zo, o) || (zo = o, o = jo(Zf, "onSelect"), 0 < o.length && (r = new Bs("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = Pa)));
  }
  function Xs(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var bl = { animationend: Xs("Animation", "AnimationEnd"), animationiteration: Xs("Animation", "AnimationIteration"), animationstart: Xs("Animation", "AnimationStart"), transitionend: Xs("Transition", "TransitionEnd") }, ed = {}, td = {};
  te && (td = document.createElement("div").style, "AnimationEvent" in window || (delete bl.animationend.animation, delete bl.animationiteration.animation, delete bl.animationstart.animation), "TransitionEvent" in window || delete bl.transitionend.transition);
  function Pn(n) {
    if (ed[n]) return ed[n];
    if (!bl[n]) return n;
    var r = bl[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in td) return ed[n] = r[l];
    return n;
  }
  var nd = Pn("animationend"), Ov = Pn("animationiteration"), Lv = Pn("animationstart"), Mv = Pn("transitionend"), Nv = /* @__PURE__ */ new Map(), Uv = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function yi(n, r) {
    Nv.set(n, r), k(r, [n]);
  }
  for (var Ao = 0; Ao < Uv.length; Ao++) {
    var Dl = Uv[Ao], by = Dl.toLowerCase(), Fo = Dl[0].toUpperCase() + Dl.slice(1);
    yi(by, "on" + Fo);
  }
  yi(nd, "onAnimationEnd"), yi(Ov, "onAnimationIteration"), yi(Lv, "onAnimationStart"), yi("dblclick", "onDoubleClick"), yi("focusin", "onFocus"), yi("focusout", "onBlur"), yi(Mv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), k("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), k("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), k("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), k("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), k("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var Ho = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Dy = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ho));
  function zv(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, le(o, r, void 0, n), n.currentTarget = null;
  }
  function Ks(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var T = o[m], w = T.instance, F = T.currentTarget;
          if (T = T.listener, w !== d && c.isPropagationStopped()) break e;
          zv(c, T, F), d = w;
        }
        else for (m = 0; m < o.length; m++) {
          if (T = o[m], w = T.instance, F = T.currentTarget, T = T.listener, w !== d && c.isPropagationStopped()) break e;
          zv(c, T, F), d = w;
        }
      }
    }
    if (ji) throw n = Cl, ji = !1, Cl = null, n;
  }
  function Vt(n, r) {
    var l = r[sd];
    l === void 0 && (l = r[sd] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Av(r, n, 2, !1), l.add(o));
  }
  function Ii(n, r, l) {
    var o = 0;
    r && (o |= 4), Av(l, n, o, r);
  }
  var gi = "_reactListening" + Math.random().toString(36).slice(2);
  function Ru(n) {
    if (!n[gi]) {
      n[gi] = !0, L.forEach(function(l) {
        l !== "selectionchange" && (Dy.has(l) || Ii(l, !1, n), Ii(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[gi] || (r[gi] = !0, Ii("selectionchange", !1, r));
    }
  }
  function Av(n, r, l, o) {
    switch (jf(r)) {
      case 1:
        var c = av;
        break;
      case 4:
        c = Hs;
        break;
      default:
        c = Vs;
    }
    l = c.bind(null, r, l, n), c = void 0, !du || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function Zs(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var T = o.stateNode.containerInfo;
        if (T === c || T.nodeType === 8 && T.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var w = m.tag;
          if ((w === 3 || w === 4) && (w = m.stateNode.containerInfo, w === c || w.nodeType === 8 && w.parentNode === c)) return;
          m = m.return;
        }
        for (; T !== null; ) {
          if (m = ma(T), m === null) return;
          if (w = m.tag, w === 5 || w === 6) {
            o = d = m;
            continue e;
          }
          T = T.parentNode;
        }
      }
      o = o.return;
    }
    fu(function() {
      var F = d, W = Bt(l), X = [];
      e: {
        var Q = Nv.get(n);
        if (Q !== void 0) {
          var he = Bs, Ce = n;
          switch (n) {
            case "keypress":
              if (mu(l) === 0) break e;
            case "keydown":
            case "keyup":
              he = gy;
              break;
            case "focusin":
              Ce = "focus", he = Yi;
              break;
            case "focusout":
              Ce = "blur", he = Yi;
              break;
            case "beforeblur":
            case "afterblur":
              he = Yi;
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
              he = $s;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              he = ov;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              he = Sy;
              break;
            case nd:
            case Ov:
            case Lv:
              he = sv;
              break;
            case Mv:
              he = pv;
              break;
            case "scroll":
              he = lv;
              break;
            case "wheel":
              he = hi;
              break;
            case "copy":
            case "cut":
            case "paste":
              he = my;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              he = Ys;
          }
          var we = (r & 4) !== 0, mn = !we && n === "scroll", O = we ? Q !== null ? Q + "Capture" : null : Q;
          we = [];
          for (var D = F, z; D !== null; ) {
            z = D;
            var J = z.stateNode;
            if (z.tag === 5 && J !== null && (z = J, O !== null && (J = El(D, O), J != null && we.push(Vo(D, J, z)))), mn) break;
            D = D.return;
          }
          0 < we.length && (Q = new he(Q, Ce, null, l, W), X.push({ event: Q, listeners: we }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Q = n === "mouseover" || n === "pointerover", he = n === "mouseout" || n === "pointerout", Q && l !== Or && (Ce = l.relatedTarget || l.fromElement) && (ma(Ce) || Ce[Si])) break e;
          if ((he || Q) && (Q = W.window === W ? W : (Q = W.ownerDocument) ? Q.defaultView || Q.parentWindow : window, he ? (Ce = l.relatedTarget || l.toElement, he = F, Ce = Ce ? ma(Ce) : null, Ce !== null && (mn = ze(Ce), Ce !== mn || Ce.tag !== 5 && Ce.tag !== 6) && (Ce = null)) : (he = null, Ce = F), he !== Ce)) {
            if (we = $s, J = "onMouseLeave", O = "onMouseEnter", D = "mouse", (n === "pointerout" || n === "pointerover") && (we = Ys, J = "onPointerLeave", O = "onPointerEnter", D = "pointer"), mn = he == null ? Q : xu(he), z = Ce == null ? Q : xu(Ce), Q = new we(J, D + "leave", he, l, W), Q.target = mn, Q.relatedTarget = z, J = null, ma(W) === F && (we = new we(O, D + "enter", Ce, l, W), we.target = z, we.relatedTarget = mn, J = we), mn = J, he && Ce) t: {
              for (we = he, O = Ce, D = 0, z = we; z; z = _l(z)) D++;
              for (z = 0, J = O; J; J = _l(J)) z++;
              for (; 0 < D - z; ) we = _l(we), D--;
              for (; 0 < z - D; ) O = _l(O), z--;
              for (; D--; ) {
                if (we === O || O !== null && we === O.alternate) break t;
                we = _l(we), O = _l(O);
              }
              we = null;
            }
            else we = null;
            he !== null && rd(X, Q, he, we, !1), Ce !== null && mn !== null && rd(X, mn, Ce, we, !0);
          }
        }
        e: {
          if (Q = F ? xu(F) : window, he = Q.nodeName && Q.nodeName.toLowerCase(), he === "select" || he === "input" && Q.type === "file") var ke = Ev;
          else if (gv(Q)) if (qf) ke = xv;
          else {
            ke = Ry;
            var Be = Ty;
          }
          else (he = Q.nodeName) && he.toLowerCase() === "input" && (Q.type === "checkbox" || Q.type === "radio") && (ke = xy);
          if (ke && (ke = ke(n, F))) {
            Sv(X, ke, l, W);
            break e;
          }
          Be && Be(n, Q, F), n === "focusout" && (Be = Q._wrapperState) && Be.controlled && Q.type === "number" && U(Q, "number", Q.value);
        }
        switch (Be = F ? xu(F) : window, n) {
          case "focusin":
            (gv(Be) || Be.contentEditable === "true") && (Pa = Be, Zf = F, zo = null);
            break;
          case "focusout":
            zo = Zf = Pa = null;
            break;
          case "mousedown":
            Jf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Jf = !1, kv(X, l, W);
            break;
          case "selectionchange":
            if (_v) break;
          case "keydown":
          case "keyup":
            kv(X, l, W);
        }
        var Te;
        if (Ba) e: {
          switch (n) {
            case "compositionstart":
              var Pe = "onCompositionStart";
              break e;
            case "compositionend":
              Pe = "onCompositionEnd";
              break e;
            case "compositionupdate":
              Pe = "onCompositionUpdate";
              break e;
          }
          Pe = void 0;
        }
        else Su ? mv(n, l) && (Pe = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (Pe = "onCompositionStart");
        Pe && (vv && l.locale !== "ko" && (Su || Pe !== "onCompositionStart" ? Pe === "onCompositionEnd" && Su && (Te = Bf()) : (pi = W, ko = "value" in pi ? pi.value : pi.textContent, Su = !0)), Be = jo(F, Pe), 0 < Be.length && (Pe = new Yf(Pe, n, null, l, W), X.push({ event: Pe, listeners: Be }), Te ? Pe.data = Te : (Te = Ws(l), Te !== null && (Pe.data = Te)))), (Te = Qs ? Ey(n, l) : Cy(n, l)) && (F = jo(F, "onBeforeInput"), 0 < F.length && (W = new Yf("onBeforeInput", "beforeinput", null, l, W), X.push({ event: W, listeners: F }), W.data = Te));
      }
      Ks(X, r);
    });
  }
  function Vo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function jo(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = El(n, l), d != null && o.unshift(Vo(n, d, c)), d = El(n, r), d != null && o.push(Vo(n, d, c))), n = n.return;
    }
    return o;
  }
  function _l(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function rd(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var T = l, w = T.alternate, F = T.stateNode;
      if (w !== null && w === o) break;
      T.tag === 5 && F !== null && (T = F, c ? (w = El(l, d), w != null && m.unshift(Vo(l, w, T))) : c || (w = El(l, d), w != null && m.push(Vo(l, w, T)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var ad = /\r\n?/g, _y = /\u0000|\uFFFD/g;
  function id(n) {
    return (typeof n == "string" ? n : "" + n).replace(ad, `
`).replace(_y, "");
  }
  function Js(n, r, l) {
    if (r = id(r), id(n) !== r && l) throw Error(y(425));
  }
  function ec() {
  }
  var ld = null, kl = null;
  function Bo(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Ol = typeof setTimeout == "function" ? setTimeout : void 0, Fv = typeof clearTimeout == "function" ? clearTimeout : void 0, ud = typeof Promise == "function" ? Promise : void 0, od = typeof queueMicrotask == "function" ? queueMicrotask : typeof ud < "u" ? function(n) {
    return ud.resolve(null).then(n).catch(ky);
  } : Ol;
  function ky(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function Qi(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Do(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Do(r);
  }
  function $a(n) {
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
  function Po(n) {
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
  var Wi = Math.random().toString(36).slice(2), Za = "__reactFiber$" + Wi, Ll = "__reactProps$" + Wi, Si = "__reactContainer$" + Wi, sd = "__reactEvents$" + Wi, Oy = "__reactListeners$" + Wi, cd = "__reactHandles$" + Wi;
  function ma(n) {
    var r = n[Za];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Si] || l[Za]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = Po(n); n !== null; ) {
          if (l = n[Za]) return l;
          n = Po(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function $o(n) {
    return n = n[Za] || n[Si], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function xu(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(y(33));
  }
  function He(n) {
    return n[Ll] || null;
  }
  var Gi = [], Qt = -1;
  function nt(n) {
    return { current: n };
  }
  function Dt(n) {
    0 > Qt || (n.current = Gi[Qt], Gi[Qt] = null, Qt--);
  }
  function Ot(n, r) {
    Qt++, Gi[Qt] = n.current, n.current = r;
  }
  var Ja = {}, Qe = nt(Ja), un = nt(!1), Nr = Ja;
  function ya(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Ja;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Xt(n) {
    return n = n.childContextTypes, n != null;
  }
  function ga() {
    Dt(un), Dt(Qe);
  }
  function qi(n, r, l) {
    if (Qe.current !== Ja) throw Error(y(168));
    Ot(Qe, r), Ot(un, l);
  }
  function Yo(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(y(108, yr(n) || "Unknown", c));
    return de({}, l, o);
  }
  function tc(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Ja, Nr = Qe.current, Ot(Qe, n), Ot(un, un.current), !0;
  }
  function Hv(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(y(169));
    l ? (n = Yo(n, r, Nr), o.__reactInternalMemoizedMergedChildContext = n, Dt(un), Dt(Qe), Ot(Qe, n)) : Dt(un), Ot(un, l);
  }
  var Zr = null, $n = !1, Io = !1;
  function fd(n) {
    Zr === null ? Zr = [n] : Zr.push(n);
  }
  function dd(n) {
    $n = !0, fd(n);
  }
  function Ur() {
    if (!Io && Zr !== null) {
      Io = !0;
      var n = 0, r = Mt;
      try {
        var l = Zr;
        for (Mt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Zr = null, $n = !1;
      } catch (c) {
        throw Zr !== null && (Zr = Zr.slice(n + 1)), It(Xr, Ur), c;
      } finally {
        Mt = r, Io = !1;
      }
    }
    return null;
  }
  var Xi = [], zr = 0, Ml = null, wu = 0, Ar = [], dr = 0, Sa = null, Zn = 1, Ei = "";
  function Jr(n, r) {
    Xi[zr++] = wu, Xi[zr++] = Ml, Ml = n, wu = r;
  }
  function pd(n, r, l) {
    Ar[dr++] = Zn, Ar[dr++] = Ei, Ar[dr++] = Sa, Sa = n;
    var o = Zn;
    n = Ei;
    var c = 32 - da(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - da(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Zn = 1 << 32 - da(r) + c | l << c | o, Ei = d + n;
    } else Zn = 1 << d | l << c | o, Ei = n;
  }
  function nc(n) {
    n.return !== null && (Jr(n, 1), pd(n, 1, 0));
  }
  function vd(n) {
    for (; n === Ml; ) Ml = Xi[--zr], Xi[zr] = null, wu = Xi[--zr], Xi[zr] = null;
    for (; n === Sa; ) Sa = Ar[--dr], Ar[dr] = null, Ei = Ar[--dr], Ar[dr] = null, Zn = Ar[--dr], Ar[dr] = null;
  }
  var ea = null, Fr = null, Wt = !1, Ea = null;
  function hd(n, r) {
    var l = _a(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Vv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ea = n, Fr = $a(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ea = n, Fr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = Sa !== null ? { id: Zn, overflow: Ei } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = _a(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, ea = n, Fr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function rc(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function ac(n) {
    if (Wt) {
      var r = Fr;
      if (r) {
        var l = r;
        if (!Vv(n, r)) {
          if (rc(n)) throw Error(y(418));
          r = $a(l.nextSibling);
          var o = ea;
          r && Vv(n, r) ? hd(o, l) : (n.flags = n.flags & -4097 | 2, Wt = !1, ea = n);
        }
      } else {
        if (rc(n)) throw Error(y(418));
        n.flags = n.flags & -4097 | 2, Wt = !1, ea = n;
      }
    }
  }
  function jv(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ea = n;
  }
  function ic(n) {
    if (n !== ea) return !1;
    if (!Wt) return jv(n), Wt = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Bo(n.type, n.memoizedProps)), r && (r = Fr)) {
      if (rc(n)) throw Bv(), Error(y(418));
      for (; r; ) hd(n, r), r = $a(r.nextSibling);
    }
    if (jv(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(y(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Fr = $a(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Fr = null;
      }
    } else Fr = ea ? $a(n.stateNode.nextSibling) : null;
    return !0;
  }
  function Bv() {
    for (var n = Fr; n; ) n = $a(n.nextSibling);
  }
  function nn() {
    Fr = ea = null, Wt = !1;
  }
  function md(n) {
    Ea === null ? Ea = [n] : Ea.push(n);
  }
  var lc = ot.ReactCurrentBatchConfig;
  function Nl(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(y(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(y(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var T = c.refs;
          m === null ? delete T[d] : T[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(y(284));
      if (!l._owner) throw Error(y(290, n));
    }
    return n;
  }
  function ei(n, r) {
    throw n = Object.prototype.toString.call(r), Error(y(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Pv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function uc(n) {
    function r(O, D) {
      if (n) {
        var z = O.deletions;
        z === null ? (O.deletions = [D], O.flags |= 16) : z.push(D);
      }
    }
    function l(O, D) {
      if (!n) return null;
      for (; D !== null; ) r(O, D), D = D.sibling;
      return null;
    }
    function o(O, D) {
      for (O = /* @__PURE__ */ new Map(); D !== null; ) D.key !== null ? O.set(D.key, D) : O.set(D.index, D), D = D.sibling;
      return O;
    }
    function c(O, D) {
      return O = al(O, D), O.index = 0, O.sibling = null, O;
    }
    function d(O, D, z) {
      return O.index = z, n ? (z = O.alternate, z !== null ? (z = z.index, z < D ? (O.flags |= 2, D) : z) : (O.flags |= 2, D)) : (O.flags |= 1048576, D);
    }
    function m(O) {
      return n && O.alternate === null && (O.flags |= 2), O;
    }
    function T(O, D, z, J) {
      return D === null || D.tag !== 6 ? (D = Gc(z, O.mode, J), D.return = O, D) : (D = c(D, z), D.return = O, D);
    }
    function w(O, D, z, J) {
      var ke = z.type;
      return ke === Xe ? W(O, D, z.props.children, J, z.key) : D !== null && (D.elementType === ke || typeof ke == "object" && ke !== null && ke.$$typeof === st && Pv(ke) === D.type) ? (J = c(D, z.props), J.ref = Nl(O, D, z), J.return = O, J) : (J = Qc(z.type, z.key, z.props, null, O.mode, J), J.ref = Nl(O, D, z), J.return = O, J);
    }
    function F(O, D, z, J) {
      return D === null || D.tag !== 4 || D.stateNode.containerInfo !== z.containerInfo || D.stateNode.implementation !== z.implementation ? (D = ss(z, O.mode, J), D.return = O, D) : (D = c(D, z.children || []), D.return = O, D);
    }
    function W(O, D, z, J, ke) {
      return D === null || D.tag !== 7 ? (D = Gl(z, O.mode, J, ke), D.return = O, D) : (D = c(D, z), D.return = O, D);
    }
    function X(O, D, z) {
      if (typeof D == "string" && D !== "" || typeof D == "number") return D = Gc("" + D, O.mode, z), D.return = O, D;
      if (typeof D == "object" && D !== null) {
        switch (D.$$typeof) {
          case Ne:
            return z = Qc(D.type, D.key, D.props, null, O.mode, z), z.ref = Nl(O, null, D), z.return = O, z;
          case Ct:
            return D = ss(D, O.mode, z), D.return = O, D;
          case st:
            var J = D._init;
            return X(O, J(D._payload), z);
        }
        if (V(D) || Oe(D)) return D = Gl(D, O.mode, z, null), D.return = O, D;
        ei(O, D);
      }
      return null;
    }
    function Q(O, D, z, J) {
      var ke = D !== null ? D.key : null;
      if (typeof z == "string" && z !== "" || typeof z == "number") return ke !== null ? null : T(O, D, "" + z, J);
      if (typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case Ne:
            return z.key === ke ? w(O, D, z, J) : null;
          case Ct:
            return z.key === ke ? F(O, D, z, J) : null;
          case st:
            return ke = z._init, Q(
              O,
              D,
              ke(z._payload),
              J
            );
        }
        if (V(z) || Oe(z)) return ke !== null ? null : W(O, D, z, J, null);
        ei(O, z);
      }
      return null;
    }
    function he(O, D, z, J, ke) {
      if (typeof J == "string" && J !== "" || typeof J == "number") return O = O.get(z) || null, T(D, O, "" + J, ke);
      if (typeof J == "object" && J !== null) {
        switch (J.$$typeof) {
          case Ne:
            return O = O.get(J.key === null ? z : J.key) || null, w(D, O, J, ke);
          case Ct:
            return O = O.get(J.key === null ? z : J.key) || null, F(D, O, J, ke);
          case st:
            var Be = J._init;
            return he(O, D, z, Be(J._payload), ke);
        }
        if (V(J) || Oe(J)) return O = O.get(z) || null, W(D, O, J, ke, null);
        ei(D, J);
      }
      return null;
    }
    function Ce(O, D, z, J) {
      for (var ke = null, Be = null, Te = D, Pe = D = 0, Nn = null; Te !== null && Pe < z.length; Pe++) {
        Te.index > Pe ? (Nn = Te, Te = null) : Nn = Te.sibling;
        var Tt = Q(O, Te, z[Pe], J);
        if (Tt === null) {
          Te === null && (Te = Nn);
          break;
        }
        n && Te && Tt.alternate === null && r(O, Te), D = d(Tt, D, Pe), Be === null ? ke = Tt : Be.sibling = Tt, Be = Tt, Te = Nn;
      }
      if (Pe === z.length) return l(O, Te), Wt && Jr(O, Pe), ke;
      if (Te === null) {
        for (; Pe < z.length; Pe++) Te = X(O, z[Pe], J), Te !== null && (D = d(Te, D, Pe), Be === null ? ke = Te : Be.sibling = Te, Be = Te);
        return Wt && Jr(O, Pe), ke;
      }
      for (Te = o(O, Te); Pe < z.length; Pe++) Nn = he(Te, O, Pe, z[Pe], J), Nn !== null && (n && Nn.alternate !== null && Te.delete(Nn.key === null ? Pe : Nn.key), D = d(Nn, D, Pe), Be === null ? ke = Nn : Be.sibling = Nn, Be = Nn);
      return n && Te.forEach(function(Di) {
        return r(O, Di);
      }), Wt && Jr(O, Pe), ke;
    }
    function we(O, D, z, J) {
      var ke = Oe(z);
      if (typeof ke != "function") throw Error(y(150));
      if (z = ke.call(z), z == null) throw Error(y(151));
      for (var Be = ke = null, Te = D, Pe = D = 0, Nn = null, Tt = z.next(); Te !== null && !Tt.done; Pe++, Tt = z.next()) {
        Te.index > Pe ? (Nn = Te, Te = null) : Nn = Te.sibling;
        var Di = Q(O, Te, Tt.value, J);
        if (Di === null) {
          Te === null && (Te = Nn);
          break;
        }
        n && Te && Di.alternate === null && r(O, Te), D = d(Di, D, Pe), Be === null ? ke = Di : Be.sibling = Di, Be = Di, Te = Nn;
      }
      if (Tt.done) return l(
        O,
        Te
      ), Wt && Jr(O, Pe), ke;
      if (Te === null) {
        for (; !Tt.done; Pe++, Tt = z.next()) Tt = X(O, Tt.value, J), Tt !== null && (D = d(Tt, D, Pe), Be === null ? ke = Tt : Be.sibling = Tt, Be = Tt);
        return Wt && Jr(O, Pe), ke;
      }
      for (Te = o(O, Te); !Tt.done; Pe++, Tt = z.next()) Tt = he(Te, O, Pe, Tt.value, J), Tt !== null && (n && Tt.alternate !== null && Te.delete(Tt.key === null ? Pe : Tt.key), D = d(Tt, D, Pe), Be === null ? ke = Tt : Be.sibling = Tt, Be = Tt);
      return n && Te.forEach(function(Gy) {
        return r(O, Gy);
      }), Wt && Jr(O, Pe), ke;
    }
    function mn(O, D, z, J) {
      if (typeof z == "object" && z !== null && z.type === Xe && z.key === null && (z = z.props.children), typeof z == "object" && z !== null) {
        switch (z.$$typeof) {
          case Ne:
            e: {
              for (var ke = z.key, Be = D; Be !== null; ) {
                if (Be.key === ke) {
                  if (ke = z.type, ke === Xe) {
                    if (Be.tag === 7) {
                      l(O, Be.sibling), D = c(Be, z.props.children), D.return = O, O = D;
                      break e;
                    }
                  } else if (Be.elementType === ke || typeof ke == "object" && ke !== null && ke.$$typeof === st && Pv(ke) === Be.type) {
                    l(O, Be.sibling), D = c(Be, z.props), D.ref = Nl(O, Be, z), D.return = O, O = D;
                    break e;
                  }
                  l(O, Be);
                  break;
                } else r(O, Be);
                Be = Be.sibling;
              }
              z.type === Xe ? (D = Gl(z.props.children, O.mode, J, z.key), D.return = O, O = D) : (J = Qc(z.type, z.key, z.props, null, O.mode, J), J.ref = Nl(O, D, z), J.return = O, O = J);
            }
            return m(O);
          case Ct:
            e: {
              for (Be = z.key; D !== null; ) {
                if (D.key === Be) if (D.tag === 4 && D.stateNode.containerInfo === z.containerInfo && D.stateNode.implementation === z.implementation) {
                  l(O, D.sibling), D = c(D, z.children || []), D.return = O, O = D;
                  break e;
                } else {
                  l(O, D);
                  break;
                }
                else r(O, D);
                D = D.sibling;
              }
              D = ss(z, O.mode, J), D.return = O, O = D;
            }
            return m(O);
          case st:
            return Be = z._init, mn(O, D, Be(z._payload), J);
        }
        if (V(z)) return Ce(O, D, z, J);
        if (Oe(z)) return we(O, D, z, J);
        ei(O, z);
      }
      return typeof z == "string" && z !== "" || typeof z == "number" ? (z = "" + z, D !== null && D.tag === 6 ? (l(O, D.sibling), D = c(D, z), D.return = O, O = D) : (l(O, D), D = Gc(z, O.mode, J), D.return = O, O = D), m(O)) : l(O, D);
    }
    return mn;
  }
  var bu = uc(!0), $v = uc(!1), Ci = nt(null), kn = null, ue = null, Ca = null;
  function ta() {
    Ca = ue = kn = null;
  }
  function yd(n) {
    var r = Ci.current;
    Dt(Ci), n._currentValue = r;
  }
  function gd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function Du(n, r) {
    kn = n, Ca = ue = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (jr = !0), n.firstContext = null);
  }
  function Ta(n) {
    var r = n._currentValue;
    if (Ca !== n) if (n = { context: n, memoizedValue: r, next: null }, ue === null) {
      if (kn === null) throw Error(y(308));
      ue = n, kn.dependencies = { lanes: 0, firstContext: n };
    } else ue = ue.next = n;
    return r;
  }
  var Ul = null;
  function Cn(n) {
    Ul === null ? Ul = [n] : Ul.push(n);
  }
  function Yv(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Cn(r)) : (l.next = c.next, c.next = l), r.interleaved = l, Ti(n, o);
  }
  function Ti(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Ki = !1;
  function oc(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function _u(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Hr(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Zi(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, ct & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, Ti(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Cn(o)) : (r.next = c.next, c.next = r), o.interleaved = r, Ti(n, l);
  }
  function sc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Ro(n, l);
    }
  }
  function Iv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function cc(n, r, l, o) {
    var c = n.updateQueue;
    Ki = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, T = c.shared.pending;
    if (T !== null) {
      c.shared.pending = null;
      var w = T, F = w.next;
      w.next = null, m === null ? d = F : m.next = F, m = w;
      var W = n.alternate;
      W !== null && (W = W.updateQueue, T = W.lastBaseUpdate, T !== m && (T === null ? W.firstBaseUpdate = F : T.next = F, W.lastBaseUpdate = w));
    }
    if (d !== null) {
      var X = c.baseState;
      m = 0, W = F = w = null, T = d;
      do {
        var Q = T.lane, he = T.eventTime;
        if ((o & Q) === Q) {
          W !== null && (W = W.next = {
            eventTime: he,
            lane: 0,
            tag: T.tag,
            payload: T.payload,
            callback: T.callback,
            next: null
          });
          e: {
            var Ce = n, we = T;
            switch (Q = r, he = l, we.tag) {
              case 1:
                if (Ce = we.payload, typeof Ce == "function") {
                  X = Ce.call(he, X, Q);
                  break e;
                }
                X = Ce;
                break e;
              case 3:
                Ce.flags = Ce.flags & -65537 | 128;
              case 0:
                if (Ce = we.payload, Q = typeof Ce == "function" ? Ce.call(he, X, Q) : Ce, Q == null) break e;
                X = de({}, X, Q);
                break e;
              case 2:
                Ki = !0;
            }
          }
          T.callback !== null && T.lane !== 0 && (n.flags |= 64, Q = c.effects, Q === null ? c.effects = [T] : Q.push(T));
        } else he = { eventTime: he, lane: Q, tag: T.tag, payload: T.payload, callback: T.callback, next: null }, W === null ? (F = W = he, w = X) : W = W.next = he, m |= Q;
        if (T = T.next, T === null) {
          if (T = c.shared.pending, T === null) break;
          Q = T, T = Q.next, Q.next = null, c.lastBaseUpdate = Q, c.shared.pending = null;
        }
      } while (!0);
      if (W === null && (w = X), c.baseState = w, c.firstBaseUpdate = F, c.lastBaseUpdate = W, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      Yl |= m, n.lanes = m, n.memoizedState = X;
    }
  }
  function Qv(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(y(191, c));
        c.call(o);
      }
    }
  }
  var Qo = {}, Ya = nt(Qo), ku = nt(Qo), Wo = nt(Qo);
  function zl(n) {
    if (n === Qo) throw Error(y(174));
    return n;
  }
  function Sd(n, r) {
    switch (Ot(Wo, r), Ot(ku, n), Ot(Ya, Qo), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : at(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = at(r, n);
    }
    Dt(Ya), Ot(Ya, r);
  }
  function Ou() {
    Dt(Ya), Dt(ku), Dt(Wo);
  }
  function Wv(n) {
    zl(Wo.current);
    var r = zl(Ya.current), l = at(r, n.type);
    r !== l && (Ot(ku, n), Ot(Ya, l));
  }
  function Ed(n) {
    ku.current === n && (Dt(Ya), Dt(ku));
  }
  var Kt = nt(0);
  function fc(n) {
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
  var dc = [];
  function Cd() {
    for (var n = 0; n < dc.length; n++) dc[n]._workInProgressVersionPrimary = null;
    dc.length = 0;
  }
  var pc = ot.ReactCurrentDispatcher, Go = ot.ReactCurrentBatchConfig, _e = 0, Le = null, We = null, ut = null, na = !1, Lu = !1, qo = 0, Ly = 0;
  function pr() {
    throw Error(y(321));
  }
  function Xo(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ha(n[l], r[l])) return !1;
    return !0;
  }
  function I(n, r, l, o, c, d) {
    if (_e = d, Le = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, pc.current = n === null || n.memoizedState === null ? My : $t, n = l(o, c), Lu) {
      d = 0;
      do {
        if (Lu = !1, qo = 0, 25 <= d) throw Error(y(301));
        d += 1, ut = We = null, r.updateQueue = null, pc.current = _c, n = l(o, c);
      } while (Lu);
    }
    if (pc.current = vr, r = We !== null && We.next !== null, _e = 0, ut = We = Le = null, na = !1, r) throw Error(y(300));
    return n;
  }
  function Tn() {
    var n = qo !== 0;
    return qo = 0, n;
  }
  function Ae() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return ut === null ? Le.memoizedState = ut = n : ut = ut.next = n, ut;
  }
  function Jn() {
    if (We === null) {
      var n = Le.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = We.next;
    var r = ut === null ? Le.memoizedState : ut.next;
    if (r !== null) ut = r, We = n;
    else {
      if (n === null) throw Error(y(310));
      We = n, n = { memoizedState: We.memoizedState, baseState: We.baseState, baseQueue: We.baseQueue, queue: We.queue, next: null }, ut === null ? Le.memoizedState = ut = n : ut = ut.next = n;
    }
    return ut;
  }
  function ra(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ri(n) {
    var r = Jn(), l = r.queue;
    if (l === null) throw Error(y(311));
    l.lastRenderedReducer = n;
    var o = We, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var T = m = null, w = null, F = d;
      do {
        var W = F.lane;
        if ((_e & W) === W) w !== null && (w = w.next = { lane: 0, action: F.action, hasEagerState: F.hasEagerState, eagerState: F.eagerState, next: null }), o = F.hasEagerState ? F.eagerState : n(o, F.action);
        else {
          var X = {
            lane: W,
            action: F.action,
            hasEagerState: F.hasEagerState,
            eagerState: F.eagerState,
            next: null
          };
          w === null ? (T = w = X, m = o) : w = w.next = X, Le.lanes |= W, Yl |= W;
        }
        F = F.next;
      } while (F !== null && F !== d);
      w === null ? m = o : w.next = T, ha(o, r.memoizedState) || (jr = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = w, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Le.lanes |= d, Yl |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Ra(n) {
    var r = Jn(), l = r.queue;
    if (l === null) throw Error(y(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      ha(d, r.memoizedState) || (jr = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Mu() {
  }
  function Al(n, r) {
    var l = Le, o = Jn(), c = r(), d = !ha(o.memoizedState, c);
    if (d && (o.memoizedState = c, jr = !0), o = o.queue, Ko(hc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || ut !== null && ut.memoizedState.tag & 1) {
      if (l.flags |= 2048, Fl(9, vc.bind(null, l, o, c, r), void 0, null), sn === null) throw Error(y(349));
      _e & 30 || Nu(l, r, c);
    }
    return c;
  }
  function Nu(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Le.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Le.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function vc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, mc(r) && yc(n);
  }
  function hc(n, r, l) {
    return l(function() {
      mc(r) && yc(n);
    });
  }
  function mc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ha(n, l);
    } catch {
      return !0;
    }
  }
  function yc(n) {
    var r = Ti(n, 1);
    r !== null && rn(r, n, 1, -1);
  }
  function gc(n) {
    var r = Ae();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ra, lastRenderedState: n }, r.queue = n, n = n.dispatch = Zo.bind(null, Le, n), [r.memoizedState, n];
  }
  function Fl(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Le.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Le.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Sc() {
    return Jn().memoizedState;
  }
  function Uu(n, r, l, o) {
    var c = Ae();
    Le.flags |= n, c.memoizedState = Fl(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function zu(n, r, l, o) {
    var c = Jn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (We !== null) {
      var m = We.memoizedState;
      if (d = m.destroy, o !== null && Xo(o, m.deps)) {
        c.memoizedState = Fl(r, l, d, o);
        return;
      }
    }
    Le.flags |= n, c.memoizedState = Fl(1 | r, l, d, o);
  }
  function Ec(n, r) {
    return Uu(8390656, 8, n, r);
  }
  function Ko(n, r) {
    return zu(2048, 8, n, r);
  }
  function Cc(n, r) {
    return zu(4, 2, n, r);
  }
  function Tc(n, r) {
    return zu(4, 4, n, r);
  }
  function Rc(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function xc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, zu(4, 4, Rc.bind(null, r, n), l);
  }
  function Au() {
  }
  function Hl(n, r) {
    var l = Jn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Xo(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function wc(n, r) {
    var l = Jn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Xo(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function bc(n, r, l) {
    return _e & 21 ? (ha(l, r) || (l = As(), Le.lanes |= l, Yl |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, jr = !0), n.memoizedState = l);
  }
  function Td(n, r) {
    var l = Mt;
    Mt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Go.transition;
    Go.transition = {};
    try {
      n(!1), r();
    } finally {
      Mt = l, Go.transition = o;
    }
  }
  function Dc() {
    return Jn().memoizedState;
  }
  function Gv(n, r, l) {
    var o = bi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, Rd(n)) Fu(r, l);
    else if (l = Yv(n, r, l, o), l !== null) {
      var c = Qn();
      rn(l, n, o, c), Ji(l, r, o);
    }
  }
  function Zo(n, r, l) {
    var o = bi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (Rd(n)) Fu(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, T = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = T, ha(T, m)) {
          var w = r.interleaved;
          w === null ? (c.next = c, Cn(r)) : (c.next = w.next, w.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Yv(n, r, c, o), l !== null && (c = Qn(), rn(l, n, o, c), Ji(l, r, o));
    }
  }
  function Rd(n) {
    var r = n.alternate;
    return n === Le || r !== null && r === Le;
  }
  function Fu(n, r) {
    Lu = na = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Ji(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Ro(n, l);
    }
  }
  var vr = { readContext: Ta, useCallback: pr, useContext: pr, useEffect: pr, useImperativeHandle: pr, useInsertionEffect: pr, useLayoutEffect: pr, useMemo: pr, useReducer: pr, useRef: pr, useState: pr, useDebugValue: pr, useDeferredValue: pr, useTransition: pr, useMutableSource: pr, useSyncExternalStore: pr, useId: pr, unstable_isNewReconciler: !1 }, My = { readContext: Ta, useCallback: function(n, r) {
    return Ae().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Ta, useEffect: Ec, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Uu(
      4194308,
      4,
      Rc.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Uu(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Uu(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = Ae();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = Ae();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = Gv.bind(null, Le, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = Ae();
    return n = { current: n }, r.memoizedState = n;
  }, useState: gc, useDebugValue: Au, useDeferredValue: function(n) {
    return Ae().memoizedState = n;
  }, useTransition: function() {
    var n = gc(!1), r = n[0];
    return n = Td.bind(null, n[1]), Ae().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Le, c = Ae();
    if (Wt) {
      if (l === void 0) throw Error(y(407));
      l = l();
    } else {
      if (l = r(), sn === null) throw Error(y(349));
      _e & 30 || Nu(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Ec(hc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Fl(9, vc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = Ae(), r = sn.identifierPrefix;
    if (Wt) {
      var l = Ei, o = Zn;
      l = (o & ~(1 << 32 - da(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = qo++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = Ly++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, $t = {
    readContext: Ta,
    useCallback: Hl,
    useContext: Ta,
    useEffect: Ko,
    useImperativeHandle: xc,
    useInsertionEffect: Cc,
    useLayoutEffect: Tc,
    useMemo: wc,
    useReducer: Ri,
    useRef: Sc,
    useState: function() {
      return Ri(ra);
    },
    useDebugValue: Au,
    useDeferredValue: function(n) {
      var r = Jn();
      return bc(r, We.memoizedState, n);
    },
    useTransition: function() {
      var n = Ri(ra)[0], r = Jn().memoizedState;
      return [n, r];
    },
    useMutableSource: Mu,
    useSyncExternalStore: Al,
    useId: Dc,
    unstable_isNewReconciler: !1
  }, _c = { readContext: Ta, useCallback: Hl, useContext: Ta, useEffect: Ko, useImperativeHandle: xc, useInsertionEffect: Cc, useLayoutEffect: Tc, useMemo: wc, useReducer: Ra, useRef: Sc, useState: function() {
    return Ra(ra);
  }, useDebugValue: Au, useDeferredValue: function(n) {
    var r = Jn();
    return We === null ? r.memoizedState = n : bc(r, We.memoizedState, n);
  }, useTransition: function() {
    var n = Ra(ra)[0], r = Jn().memoizedState;
    return [n, r];
  }, useMutableSource: Mu, useSyncExternalStore: Al, useId: Dc, unstable_isNewReconciler: !1 };
  function Vr(n, r) {
    if (n && n.defaultProps) {
      r = de({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Vl(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : de({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var jl = { isMounted: function(n) {
    return (n = n._reactInternals) ? ze(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Qn(), c = bi(n), d = Hr(o, c);
    d.payload = r, l != null && (d.callback = l), r = Zi(n, d, c), r !== null && (rn(r, n, c, o), sc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Qn(), c = bi(n), d = Hr(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Zi(n, d, c), r !== null && (rn(r, n, c, o), sc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Qn(), o = bi(n), c = Hr(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Zi(n, c, o), r !== null && (rn(r, n, o, l), sc(r, n, o));
  } };
  function qv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Uo(l, o) || !Uo(c, d) : !0;
  }
  function Xv(n, r, l) {
    var o = !1, c = Ja, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Ta(d) : (c = Xt(r) ? Nr : Qe.current, o = r.contextTypes, d = (o = o != null) ? ya(n, c) : Ja), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = jl, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function Kv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && jl.enqueueReplaceState(r, r.state, null);
  }
  function xd(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, oc(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Ta(d) : (d = Xt(r) ? Nr : Qe.current, c.context = ya(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Vl(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && jl.enqueueReplaceState(c, c.state, null), cc(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function el(n, r) {
    try {
      var l = "", o = r;
      do
        l += ca(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function wd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Jo(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Zv = typeof WeakMap == "function" ? WeakMap : Map;
  function Jv(n, r, l) {
    l = Hr(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      jc || (jc = !0, Ud = o), Jo(n, r);
    }, l;
  }
  function eh(n, r, l) {
    l = Hr(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Jo(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Jo(n, r), typeof o != "function" && (ba === null ? ba = /* @__PURE__ */ new Set([this]) : ba.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function es(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Zv();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = Py.bind(null, n, r, l), r.then(n, n));
  }
  function th(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function bd(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Hr(-1, 1), r.tag = 2, Zi(l, r, 1))), l.lanes |= 1), n);
  }
  var nh = ot.ReactCurrentOwner, jr = !1;
  function vn(n, r, l, o) {
    r.child = n === null ? $v(r, null, l, o) : bu(r, n.child, l, o);
  }
  function Hu(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return Du(r, c), o = I(n, r, l, o, d, c), l = Tn(), n !== null && !jr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, hn(n, r, c)) : (Wt && l && nc(r), r.flags |= 1, vn(n, r, o, c), r.child);
  }
  function tl(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Vd(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, kc(n, r, d, o, c)) : (n = Qc(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Uo, l(m, o) && n.ref === r.ref) return hn(n, r, c);
    }
    return r.flags |= 1, n = al(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function kc(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (Uo(d, o) && n.ref === r.ref) if (jr = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (jr = !0);
      else return r.lanes = n.lanes, hn(n, r, c);
    }
    return tt(n, r, l, o, c);
  }
  function Br(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Ot(Gu, Pr), Pr |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Ot(Gu, Pr), Pr |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Ot(Gu, Pr), Pr |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Ot(Gu, Pr), Pr |= o;
    return vn(n, r, c, l), r.child;
  }
  function Bl(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function tt(n, r, l, o, c) {
    var d = Xt(l) ? Nr : Qe.current;
    return d = ya(r, d), Du(r, c), l = I(n, r, l, o, d, c), o = Tn(), n !== null && !jr ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, hn(n, r, c)) : (Wt && o && nc(r), r.flags |= 1, vn(n, r, l, c), r.child);
  }
  function ts(n, r, l, o, c) {
    if (Xt(l)) {
      var d = !0;
      tc(r);
    } else d = !1;
    if (Du(r, c), r.stateNode === null) rs(n, r), Xv(r, l, o), xd(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, T = r.memoizedProps;
      m.props = T;
      var w = m.context, F = l.contextType;
      typeof F == "object" && F !== null ? F = Ta(F) : (F = Xt(l) ? Nr : Qe.current, F = ya(r, F));
      var W = l.getDerivedStateFromProps, X = typeof W == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      X || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== o || w !== F) && Kv(r, m, o, F), Ki = !1;
      var Q = r.memoizedState;
      m.state = Q, cc(r, o, m, c), w = r.memoizedState, T !== o || Q !== w || un.current || Ki ? (typeof W == "function" && (Vl(r, l, W, o), w = r.memoizedState), (T = Ki || qv(r, l, T, o, Q, w, F)) ? (X || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = w), m.props = o, m.state = w, m.context = F, o = T) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, _u(n, r), T = r.memoizedProps, F = r.type === r.elementType ? T : Vr(r.type, T), m.props = F, X = r.pendingProps, Q = m.context, w = l.contextType, typeof w == "object" && w !== null ? w = Ta(w) : (w = Xt(l) ? Nr : Qe.current, w = ya(r, w));
      var he = l.getDerivedStateFromProps;
      (W = typeof he == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (T !== X || Q !== w) && Kv(r, m, o, w), Ki = !1, Q = r.memoizedState, m.state = Q, cc(r, o, m, c);
      var Ce = r.memoizedState;
      T !== X || Q !== Ce || un.current || Ki ? (typeof he == "function" && (Vl(r, l, he, o), Ce = r.memoizedState), (F = Ki || qv(r, l, F, o, Q, Ce, w) || !1) ? (W || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, Ce, w), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, Ce, w)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || T === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = Ce), m.props = o, m.state = Ce, m.context = w, o = F) : (typeof m.componentDidUpdate != "function" || T === n.memoizedProps && Q === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || T === n.memoizedProps && Q === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Oc(n, r, l, o, d, c);
  }
  function Oc(n, r, l, o, c, d) {
    Bl(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Hv(r, l, !1), hn(n, r, d);
    o = r.stateNode, nh.current = r;
    var T = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = bu(r, n.child, null, d), r.child = bu(r, null, T, d)) : vn(n, r, T, d), r.memoizedState = o.state, c && Hv(r, l, !0), r.child;
  }
  function Ny(n) {
    var r = n.stateNode;
    r.pendingContext ? qi(n, r.pendingContext, r.pendingContext !== r.context) : r.context && qi(n, r.context, !1), Sd(n, r.containerInfo);
  }
  function rh(n, r, l, o, c) {
    return nn(), md(c), r.flags |= 256, vn(n, r, l, o), r.child;
  }
  var ns = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Pl(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function ah(n, r, l) {
    var o = r.pendingProps, c = Kt.current, d = !1, m = (r.flags & 128) !== 0, T;
    if ((T = m) || (T = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), T ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Ot(Kt, c & 1), n === null)
      return ac(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = Wc(m, o, 0, null), n = Gl(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Pl(l), r.memoizedState = ns, n) : Lc(r, m));
    if (c = n.memoizedState, c !== null && (T = c.dehydrated, T !== null)) return Dd(n, r, m, o, T, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, T = c.sibling;
      var w = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = w, r.deletions = null) : (o = al(c, w), o.subtreeFlags = c.subtreeFlags & 14680064), T !== null ? d = al(T, d) : (d = Gl(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Pl(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = ns, o;
    }
    return d = n.child, n = d.sibling, o = al(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Lc(n, r) {
    return r = Wc({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Mc(n, r, l, o) {
    return o !== null && md(o), bu(r, n.child, null, l), n = Lc(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Dd(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = wd(Error(y(422))), Mc(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Wc({ mode: "visible", children: o.children }, c, 0, null), d = Gl(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && bu(r, n.child, null, m), r.child.memoizedState = Pl(m), r.memoizedState = ns, d);
    if (!(r.mode & 1)) return Mc(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var T = o.dgst;
      return o = T, d = Error(y(419)), o = wd(d, o, void 0), Mc(n, r, m, o);
    }
    if (T = (m & n.childLanes) !== 0, jr || T) {
      if (o = sn, o !== null) {
        switch (m & -m) {
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
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, Ti(n, c), rn(o, n, c, -1));
      }
      return os(), o = wd(Error(y(421))), Mc(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = Hd.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, Fr = $a(c.nextSibling), ea = r, Wt = !0, Ea = null, n !== null && (Ar[dr++] = Zn, Ar[dr++] = Ei, Ar[dr++] = Sa, Zn = n.id, Ei = n.overflow, Sa = r), r = Lc(r, o.children), r.flags |= 4096, r);
  }
  function ih(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), gd(n.return, r, l);
  }
  function Nc(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function _d(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (vn(n, r, o.children, l), o = Kt.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && ih(n, l, r);
        else if (n.tag === 19) ih(n, l, r);
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
    if (Ot(Kt, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && fc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Nc(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && fc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Nc(r, !0, l, null, d);
        break;
      case "together":
        Nc(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function rs(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function hn(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), Yl |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(y(153));
    if (r.child !== null) {
      for (n = r.child, l = al(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = al(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function xi(n, r, l) {
    switch (r.tag) {
      case 3:
        Ny(r), nn();
        break;
      case 5:
        Wv(r);
        break;
      case 1:
        Xt(r.type) && tc(r);
        break;
      case 4:
        Sd(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Ot(Ci, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Ot(Kt, Kt.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? ah(n, r, l) : (Ot(Kt, Kt.current & 1), n = hn(n, r, l), n !== null ? n.sibling : null);
        Ot(Kt, Kt.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return _d(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Ot(Kt, Kt.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Br(n, r, l);
    }
    return hn(n, r, l);
  }
  var ti, Vu, ju, xa;
  ti = function(n, r) {
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
  }, Vu = function() {
  }, ju = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, zl(Ya.current);
      var d = null;
      switch (l) {
        case "input":
          c = Dn(n, c), o = Dn(n, o), d = [];
          break;
        case "select":
          c = de({}, c, { value: void 0 }), o = de({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Z(n, c), o = Z(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = ec);
      }
      Vn(l, o);
      var m;
      l = null;
      for (F in c) if (!o.hasOwnProperty(F) && c.hasOwnProperty(F) && c[F] != null) if (F === "style") {
        var T = c[F];
        for (m in T) T.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else F !== "dangerouslySetInnerHTML" && F !== "children" && F !== "suppressContentEditableWarning" && F !== "suppressHydrationWarning" && F !== "autoFocus" && (P.hasOwnProperty(F) ? d || (d = []) : (d = d || []).push(F, null));
      for (F in o) {
        var w = o[F];
        if (T = c != null ? c[F] : void 0, o.hasOwnProperty(F) && w !== T && (w != null || T != null)) if (F === "style") if (T) {
          for (m in T) !T.hasOwnProperty(m) || w && w.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in w) w.hasOwnProperty(m) && T[m] !== w[m] && (l || (l = {}), l[m] = w[m]);
        } else l || (d || (d = []), d.push(
          F,
          l
        )), l = w;
        else F === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, T = T ? T.__html : void 0, w != null && T !== w && (d = d || []).push(F, w)) : F === "children" ? typeof w != "string" && typeof w != "number" || (d = d || []).push(F, "" + w) : F !== "suppressContentEditableWarning" && F !== "suppressHydrationWarning" && (P.hasOwnProperty(F) ? (w != null && F === "onScroll" && Vt("scroll", n), d || T === w || (d = [])) : (d = d || []).push(F, w));
      }
      l && (d = d || []).push("style", l);
      var F = d;
      (r.updateQueue = F) && (r.flags |= 4);
    }
  }, xa = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function on(n, r) {
    if (!Wt) switch (n.tailMode) {
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
  function hr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function Uy(n, r, l) {
    var o = r.pendingProps;
    switch (vd(r), r.tag) {
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
        return hr(r), null;
      case 1:
        return Xt(r.type) && ga(), hr(r), null;
      case 3:
        return o = r.stateNode, Ou(), Dt(un), Dt(Qe), Cd(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (ic(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ea !== null && (zd(Ea), Ea = null))), Vu(n, r), hr(r), null;
      case 5:
        Ed(r);
        var c = zl(Wo.current);
        if (l = r.type, n !== null && r.stateNode != null) ju(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(y(166));
            return hr(r), null;
          }
          if (n = zl(Ya.current), ic(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Za] = r, o[Ll] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Vt("cancel", o), Vt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Vt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < Ho.length; c++) Vt(Ho[c], o);
                break;
              case "source":
                Vt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Vt(
                  "error",
                  o
                ), Vt("load", o);
                break;
              case "details":
                Vt("toggle", o);
                break;
              case "input":
                Fn(o, d), Vt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Vt("invalid", o);
                break;
              case "textarea":
                q(o, d), Vt("invalid", o);
            }
            Vn(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var T = d[m];
              m === "children" ? typeof T == "string" ? o.textContent !== T && (d.suppressHydrationWarning !== !0 && Js(o.textContent, T, n), c = ["children", T]) : typeof T == "number" && o.textContent !== "" + T && (d.suppressHydrationWarning !== !0 && Js(
                o.textContent,
                T,
                n
              ), c = ["children", "" + T]) : P.hasOwnProperty(m) && T != null && m === "onScroll" && Vt("scroll", o);
            }
            switch (l) {
              case "input":
                Xn(o), x(o, d, !0);
                break;
              case "textarea":
                Xn(o), Je(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = ec);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = _t(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[Za] = r, n[Ll] = o, ti(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = pn(l, o), l) {
                case "dialog":
                  Vt("cancel", n), Vt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Vt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < Ho.length; c++) Vt(Ho[c], n);
                  c = o;
                  break;
                case "source":
                  Vt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Vt(
                    "error",
                    n
                  ), Vt("load", n), c = o;
                  break;
                case "details":
                  Vt("toggle", n), c = o;
                  break;
                case "input":
                  Fn(n, o), c = Dn(n, o), Vt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = de({}, o, { value: void 0 }), Vt("invalid", n);
                  break;
                case "textarea":
                  q(n, o), c = Z(n, o), Vt("invalid", n);
                  break;
                default:
                  c = o;
              }
              Vn(l, c), T = c;
              for (d in T) if (T.hasOwnProperty(d)) {
                var w = T[d];
                d === "style" ? bt(n, w) : d === "dangerouslySetInnerHTML" ? (w = w ? w.__html : void 0, w != null && qa(n, w)) : d === "children" ? typeof w == "string" ? (l !== "textarea" || w !== "") && gr(n, w) : typeof w == "number" && gr(n, "" + w) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (P.hasOwnProperty(d) ? w != null && d === "onScroll" && Vt("scroll", n) : w != null && Ie(n, d, w, m));
              }
              switch (l) {
                case "input":
                  Xn(n), x(n, o, !1);
                  break;
                case "textarea":
                  Xn(n), Je(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + gn(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? re(n, !!o.multiple, d, !1) : o.defaultValue != null && re(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = ec);
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
        return hr(r), null;
      case 6:
        if (n && r.stateNode != null) xa(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(y(166));
          if (l = zl(Wo.current), zl(Ya.current), ic(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Za] = r, (d = o.nodeValue !== l) && (n = ea, n !== null)) switch (n.tag) {
              case 3:
                Js(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Js(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Za] = r, r.stateNode = o;
        }
        return hr(r), null;
      case 13:
        if (Dt(Kt), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (Wt && Fr !== null && r.mode & 1 && !(r.flags & 128)) Bv(), nn(), r.flags |= 98560, d = !1;
          else if (d = ic(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(y(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(y(317));
              d[Za] = r;
            } else nn(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            hr(r), d = !1;
          } else Ea !== null && (zd(Ea), Ea = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || Kt.current & 1 ? Ln === 0 && (Ln = 3) : os())), r.updateQueue !== null && (r.flags |= 4), hr(r), null);
      case 4:
        return Ou(), Vu(n, r), n === null && Ru(r.stateNode.containerInfo), hr(r), null;
      case 10:
        return yd(r.type._context), hr(r), null;
      case 17:
        return Xt(r.type) && ga(), hr(r), null;
      case 19:
        if (Dt(Kt), d = r.memoizedState, d === null) return hr(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) on(d, !1);
        else {
          if (Ln !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = fc(n), m !== null) {
              for (r.flags |= 128, on(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Ot(Kt, Kt.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && kt() > Xu && (r.flags |= 128, o = !0, on(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = fc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), on(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !Wt) return hr(r), null;
          } else 2 * kt() - d.renderingStartTime > Xu && l !== 1073741824 && (r.flags |= 128, o = !0, on(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = kt(), r.sibling = null, l = Kt.current, Ot(Kt, o ? l & 1 | 2 : l & 1), r) : (hr(r), null);
      case 22:
      case 23:
        return Yc(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? Pr & 1073741824 && (hr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : hr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(y(156, r.tag));
  }
  function zy(n, r) {
    switch (vd(r), r.tag) {
      case 1:
        return Xt(r.type) && ga(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Ou(), Dt(un), Dt(Qe), Cd(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Ed(r), null;
      case 13:
        if (Dt(Kt), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(y(340));
          nn();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Dt(Kt), null;
      case 4:
        return Ou(), null;
      case 10:
        return yd(r.type._context), null;
      case 22:
      case 23:
        return Yc(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Bu = !1, er = !1, Uc = typeof WeakSet == "function" ? WeakSet : Set, ge = null;
  function Pu(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      cn(n, r, o);
    }
    else l.current = null;
  }
  function kd(n, r, l) {
    try {
      l();
    } catch (o) {
      cn(n, r, o);
    }
  }
  var zc = !1;
  function Ay(n, r) {
    if (ld = xl, n = Gs(), mi(n)) {
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
          var m = 0, T = -1, w = -1, F = 0, W = 0, X = n, Q = null;
          t: for (; ; ) {
            for (var he; X !== l || c !== 0 && X.nodeType !== 3 || (T = m + c), X !== d || o !== 0 && X.nodeType !== 3 || (w = m + o), X.nodeType === 3 && (m += X.nodeValue.length), (he = X.firstChild) !== null; )
              Q = X, X = he;
            for (; ; ) {
              if (X === n) break t;
              if (Q === l && ++F === c && (T = m), Q === d && ++W === o && (w = m), (he = X.nextSibling) !== null) break;
              X = Q, Q = X.parentNode;
            }
            X = he;
          }
          l = T === -1 || w === -1 ? null : { start: T, end: w };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (kl = { focusedElem: n, selectionRange: l }, xl = !1, ge = r; ge !== null; ) if (r = ge, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, ge = n;
    else for (; ge !== null; ) {
      r = ge;
      try {
        var Ce = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Ce !== null) {
              var we = Ce.memoizedProps, mn = Ce.memoizedState, O = r.stateNode, D = O.getSnapshotBeforeUpdate(r.elementType === r.type ? we : Vr(r.type, we), mn);
              O.__reactInternalSnapshotBeforeUpdate = D;
            }
            break;
          case 3:
            var z = r.stateNode.containerInfo;
            z.nodeType === 1 ? z.textContent = "" : z.nodeType === 9 && z.documentElement && z.removeChild(z.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(y(163));
        }
      } catch (J) {
        cn(r, r.return, J);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, ge = n;
        break;
      }
      ge = r.return;
    }
    return Ce = zc, zc = !1, Ce;
  }
  function $u(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && kd(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Ac(n, r) {
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
  function Fc(n) {
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
  function lh(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, lh(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Za], delete r[Ll], delete r[sd], delete r[Oy], delete r[cd])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Od(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function uh(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Od(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function as(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = ec));
    else if (o !== 4 && (n = n.child, n !== null)) for (as(n, r, l), n = n.sibling; n !== null; ) as(n, r, l), n = n.sibling;
  }
  function Yu(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Yu(n, r, l), n = n.sibling; n !== null; ) Yu(n, r, l), n = n.sibling;
  }
  var Zt = null, Yn = !1;
  function Sr(n, r, l) {
    for (l = l.child; l !== null; ) Iu(n, r, l), l = l.sibling;
  }
  function Iu(n, r, l) {
    if (Ha && typeof Ha.onCommitFiberUnmount == "function") try {
      Ha.onCommitFiberUnmount(To, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        er || Pu(l, r);
      case 6:
        var o = Zt, c = Yn;
        Zt = null, Sr(n, r, l), Zt = o, Yn = c, Zt !== null && (Yn ? (n = Zt, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : Zt.removeChild(l.stateNode));
        break;
      case 18:
        Zt !== null && (Yn ? (n = Zt, l = l.stateNode, n.nodeType === 8 ? Qi(n.parentNode, l) : n.nodeType === 1 && Qi(n, l), Do(n)) : Qi(Zt, l.stateNode));
        break;
      case 4:
        o = Zt, c = Yn, Zt = l.stateNode.containerInfo, Yn = !0, Sr(n, r, l), Zt = o, Yn = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!er && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && kd(l, r, m), c = c.next;
          } while (c !== o);
        }
        Sr(n, r, l);
        break;
      case 1:
        if (!er && (Pu(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (T) {
          cn(l, r, T);
        }
        Sr(n, r, l);
        break;
      case 21:
        Sr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (er = (o = er) || l.memoizedState !== null, Sr(n, r, l), er = o) : Sr(n, r, l);
        break;
      default:
        Sr(n, r, l);
    }
  }
  function Qu(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new Uc()), r.forEach(function(o) {
        var c = $y.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function In(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, T = m;
        e: for (; T !== null; ) {
          switch (T.tag) {
            case 5:
              Zt = T.stateNode, Yn = !1;
              break e;
            case 3:
              Zt = T.stateNode.containerInfo, Yn = !0;
              break e;
            case 4:
              Zt = T.stateNode.containerInfo, Yn = !0;
              break e;
          }
          T = T.return;
        }
        if (Zt === null) throw Error(y(160));
        Iu(d, m, c), Zt = null, Yn = !1;
        var w = c.alternate;
        w !== null && (w.return = null), c.return = null;
      } catch (F) {
        cn(c, r, F);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) oh(r, n), r = r.sibling;
  }
  function oh(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (In(r, n), ni(n), o & 4) {
          try {
            $u(3, n, n.return), Ac(3, n);
          } catch (we) {
            cn(n, n.return, we);
          }
          try {
            $u(5, n, n.return);
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        break;
      case 1:
        In(r, n), ni(n), o & 512 && l !== null && Pu(l, l.return);
        break;
      case 5:
        if (In(r, n), ni(n), o & 512 && l !== null && Pu(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            gr(c, "");
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, T = n.type, w = n.updateQueue;
          if (n.updateQueue = null, w !== null) try {
            T === "input" && d.type === "radio" && d.name != null && Hn(c, d), pn(T, m);
            var F = pn(T, d);
            for (m = 0; m < w.length; m += 2) {
              var W = w[m], X = w[m + 1];
              W === "style" ? bt(c, X) : W === "dangerouslySetInnerHTML" ? qa(c, X) : W === "children" ? gr(c, X) : Ie(c, W, X, F);
            }
            switch (T) {
              case "input":
                Kn(c, d);
                break;
              case "textarea":
                Se(c, d);
                break;
              case "select":
                var Q = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var he = d.value;
                he != null ? re(c, !!d.multiple, he, !1) : Q !== !!d.multiple && (d.defaultValue != null ? re(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : re(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[Ll] = d;
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        break;
      case 6:
        if (In(r, n), ni(n), o & 4) {
          if (n.stateNode === null) throw Error(y(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (we) {
            cn(n, n.return, we);
          }
        }
        break;
      case 3:
        if (In(r, n), ni(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Do(r.containerInfo);
        } catch (we) {
          cn(n, n.return, we);
        }
        break;
      case 4:
        In(r, n), ni(n);
        break;
      case 13:
        In(r, n), ni(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Vc = kt())), o & 4 && Qu(n);
        break;
      case 22:
        if (W = l !== null && l.memoizedState !== null, n.mode & 1 ? (er = (F = er) || W, In(r, n), er = F) : In(r, n), ni(n), o & 8192) {
          if (F = n.memoizedState !== null, (n.stateNode.isHidden = F) && !W && n.mode & 1) for (ge = n, W = n.child; W !== null; ) {
            for (X = ge = W; ge !== null; ) {
              switch (Q = ge, he = Q.child, Q.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  $u(4, Q, Q.return);
                  break;
                case 1:
                  Pu(Q, Q.return);
                  var Ce = Q.stateNode;
                  if (typeof Ce.componentWillUnmount == "function") {
                    o = Q, l = Q.return;
                    try {
                      r = o, Ce.props = r.memoizedProps, Ce.state = r.memoizedState, Ce.componentWillUnmount();
                    } catch (we) {
                      cn(o, l, we);
                    }
                  }
                  break;
                case 5:
                  Pu(Q, Q.return);
                  break;
                case 22:
                  if (Q.memoizedState !== null) {
                    sh(X);
                    continue;
                  }
              }
              he !== null ? (he.return = Q, ge = he) : sh(X);
            }
            W = W.sibling;
          }
          e: for (W = null, X = n; ; ) {
            if (X.tag === 5) {
              if (W === null) {
                W = X;
                try {
                  c = X.stateNode, F ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (T = X.stateNode, w = X.memoizedProps.style, m = w != null && w.hasOwnProperty("display") ? w.display : null, T.style.display = rt("display", m));
                } catch (we) {
                  cn(n, n.return, we);
                }
              }
            } else if (X.tag === 6) {
              if (W === null) try {
                X.stateNode.nodeValue = F ? "" : X.memoizedProps;
              } catch (we) {
                cn(n, n.return, we);
              }
            } else if ((X.tag !== 22 && X.tag !== 23 || X.memoizedState === null || X === n) && X.child !== null) {
              X.child.return = X, X = X.child;
              continue;
            }
            if (X === n) break e;
            for (; X.sibling === null; ) {
              if (X.return === null || X.return === n) break e;
              W === X && (W = null), X = X.return;
            }
            W === X && (W = null), X.sibling.return = X.return, X = X.sibling;
          }
        }
        break;
      case 19:
        In(r, n), ni(n), o & 4 && Qu(n);
        break;
      case 21:
        break;
      default:
        In(
          r,
          n
        ), ni(n);
    }
  }
  function ni(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Od(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(y(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (gr(c, ""), o.flags &= -33);
            var d = uh(n);
            Yu(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, T = uh(n);
            as(n, T, m);
            break;
          default:
            throw Error(y(161));
        }
      } catch (w) {
        cn(n, n.return, w);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function Fy(n, r, l) {
    ge = n, Ld(n);
  }
  function Ld(n, r, l) {
    for (var o = (n.mode & 1) !== 0; ge !== null; ) {
      var c = ge, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || Bu;
        if (!m) {
          var T = c.alternate, w = T !== null && T.memoizedState !== null || er;
          T = Bu;
          var F = er;
          if (Bu = m, (er = w) && !F) for (ge = c; ge !== null; ) m = ge, w = m.child, m.tag === 22 && m.memoizedState !== null ? Md(c) : w !== null ? (w.return = m, ge = w) : Md(c);
          for (; d !== null; ) ge = d, Ld(d), d = d.sibling;
          ge = c, Bu = T, er = F;
        }
        Wu(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, ge = d) : Wu(n);
    }
  }
  function Wu(n) {
    for (; ge !== null; ) {
      var r = ge;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              er || Ac(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !er) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : Vr(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Qv(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Qv(r, m, l);
              }
              break;
            case 5:
              var T = r.stateNode;
              if (l === null && r.flags & 4) {
                l = T;
                var w = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    w.autoFocus && l.focus();
                    break;
                  case "img":
                    w.src && (l.src = w.src);
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
                var F = r.alternate;
                if (F !== null) {
                  var W = F.memoizedState;
                  if (W !== null) {
                    var X = W.dehydrated;
                    X !== null && Do(X);
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
              throw Error(y(163));
          }
          er || r.flags & 512 && Fc(r);
        } catch (Q) {
          cn(r, r.return, Q);
        }
      }
      if (r === n) {
        ge = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ge = l;
        break;
      }
      ge = r.return;
    }
  }
  function sh(n) {
    for (; ge !== null; ) {
      var r = ge;
      if (r === n) {
        ge = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ge = l;
        break;
      }
      ge = r.return;
    }
  }
  function Md(n) {
    for (; ge !== null; ) {
      var r = ge;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Ac(4, r);
            } catch (w) {
              cn(r, l, w);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (w) {
                cn(r, c, w);
              }
            }
            var d = r.return;
            try {
              Fc(r);
            } catch (w) {
              cn(r, d, w);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Fc(r);
            } catch (w) {
              cn(r, m, w);
            }
        }
      } catch (w) {
        cn(r, r.return, w);
      }
      if (r === n) {
        ge = null;
        break;
      }
      var T = r.sibling;
      if (T !== null) {
        T.return = r.return, ge = T;
        break;
      }
      ge = r.return;
    }
  }
  var Hy = Math.ceil, $l = ot.ReactCurrentDispatcher, Hc = ot.ReactCurrentOwner, wa = ot.ReactCurrentBatchConfig, ct = 0, sn = null, Gt = null, On = 0, Pr = 0, Gu = nt(0), Ln = 0, is = null, Yl = 0, qu = 0, Nd = 0, nl = null, mr = null, Vc = 0, Xu = 1 / 0, wi = null, jc = !1, Ud = null, ba = null, Ku = !1, Da = null, Bc = 0, ls = 0, Pc = null, us = -1, Il = 0;
  function Qn() {
    return ct & 6 ? kt() : us !== -1 ? us : us = kt();
  }
  function bi(n) {
    return n.mode & 1 ? ct & 2 && On !== 0 ? On & -On : lc.transition !== null ? (Il === 0 && (Il = As()), Il) : (n = Mt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : jf(n.type)), n) : 1;
  }
  function rn(n, r, l, o) {
    if (50 < ls) throw ls = 0, Pc = null, Error(y(185));
    Rl(n, l, o), (!(ct & 2) || n !== sn) && (n === sn && (!(ct & 2) && (qu |= l), Ln === 4 && ri(n, On)), Mn(n, o), l === 1 && ct === 0 && !(r.mode & 1) && (Xu = kt() + 500, $n && Ur()));
  }
  function Mn(n, r) {
    var l = n.callbackNode;
    zs(n, r);
    var o = Va(n, n === sn ? On : 0);
    if (o === 0) l !== null && tn(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && tn(l), r === 1) n.tag === 0 ? dd(Zu.bind(null, n)) : fd(Zu.bind(null, n)), od(function() {
        !(ct & 6) && Ur();
      }), l = null;
      else {
        switch (Ff(o)) {
          case 1:
            l = Xr;
            break;
          case 4:
            l = lt;
            break;
          case 16:
            l = Ka;
            break;
          case 536870912:
            l = Nf;
            break;
          default:
            l = Ka;
        }
        l = yh(l, $c.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function $c(n, r) {
    if (us = -1, Il = 0, ct & 6) throw Error(y(327));
    var l = n.callbackNode;
    if (Ju() && n.callbackNode !== l) return null;
    var o = Va(n, n === sn ? On : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = Ic(n, o);
    else {
      r = o;
      var c = ct;
      ct |= 2;
      var d = fh();
      (sn !== n || On !== r) && (wi = null, Xu = kt() + 500, Wl(n, r));
      do
        try {
          jy();
          break;
        } catch (T) {
          ch(n, T);
        }
      while (!0);
      ta(), $l.current = d, ct = c, Gt !== null ? r = 0 : (sn = null, On = 0, r = Ln);
    }
    if (r !== 0) {
      if (r === 2 && (c = zf(n), c !== 0 && (o = c, r = Ql(n, c))), r === 1) throw l = is, Wl(n, 0), ri(n, o), Mn(n, kt()), l;
      if (r === 6) ri(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !Ad(c) && (r = Ic(n, o), r === 2 && (d = zf(n), d !== 0 && (o = d, r = Ql(n, d))), r === 1)) throw l = is, Wl(n, 0), ri(n, o), Mn(n, kt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(y(345));
          case 2:
            rl(n, mr, wi);
            break;
          case 3:
            if (ri(n, o), (o & 130023424) === o && (r = Vc + 500 - kt(), 10 < r)) {
              if (Va(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Qn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Ol(rl.bind(null, n, mr, wi), r);
              break;
            }
            rl(n, mr, wi);
            break;
          case 4:
            if (ri(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - da(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = kt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Hy(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Ol(rl.bind(null, n, mr, wi), o);
              break;
            }
            rl(n, mr, wi);
            break;
          case 5:
            rl(n, mr, wi);
            break;
          default:
            throw Error(y(329));
        }
      }
    }
    return Mn(n, kt()), n.callbackNode === l ? $c.bind(null, n) : null;
  }
  function Ql(n, r) {
    var l = nl;
    return n.current.memoizedState.isDehydrated && (Wl(n, r).flags |= 256), n = Ic(n, r), n !== 2 && (r = mr, mr = l, r !== null && zd(r)), n;
  }
  function zd(n) {
    mr === null ? mr = n : mr.push.apply(mr, n);
  }
  function Ad(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ha(d(), c)) return !1;
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
  function ri(n, r) {
    for (r &= ~Nd, r &= ~qu, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - da(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Zu(n) {
    if (ct & 6) throw Error(y(327));
    Ju();
    var r = Va(n, 0);
    if (!(r & 1)) return Mn(n, kt()), null;
    var l = Ic(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = zf(n);
      o !== 0 && (r = o, l = Ql(n, o));
    }
    if (l === 1) throw l = is, Wl(n, 0), ri(n, r), Mn(n, kt()), l;
    if (l === 6) throw Error(y(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, rl(n, mr, wi), Mn(n, kt()), null;
  }
  function Fd(n, r) {
    var l = ct;
    ct |= 1;
    try {
      return n(r);
    } finally {
      ct = l, ct === 0 && (Xu = kt() + 500, $n && Ur());
    }
  }
  function ai(n) {
    Da !== null && Da.tag === 0 && !(ct & 6) && Ju();
    var r = ct;
    ct |= 1;
    var l = wa.transition, o = Mt;
    try {
      if (wa.transition = null, Mt = 1, n) return n();
    } finally {
      Mt = o, wa.transition = l, ct = r, !(ct & 6) && Ur();
    }
  }
  function Yc() {
    Pr = Gu.current, Dt(Gu);
  }
  function Wl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Fv(l)), Gt !== null) for (l = Gt.return; l !== null; ) {
      var o = l;
      switch (vd(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && ga();
          break;
        case 3:
          Ou(), Dt(un), Dt(Qe), Cd();
          break;
        case 5:
          Ed(o);
          break;
        case 4:
          Ou();
          break;
        case 13:
          Dt(Kt);
          break;
        case 19:
          Dt(Kt);
          break;
        case 10:
          yd(o.type._context);
          break;
        case 22:
        case 23:
          Yc();
      }
      l = l.return;
    }
    if (sn = n, Gt = n = al(n.current, null), On = Pr = r, Ln = 0, is = null, Nd = qu = Yl = 0, mr = nl = null, Ul !== null) {
      for (r = 0; r < Ul.length; r++) if (l = Ul[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      Ul = null;
    }
    return n;
  }
  function ch(n, r) {
    do {
      var l = Gt;
      try {
        if (ta(), pc.current = vr, na) {
          for (var o = Le.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          na = !1;
        }
        if (_e = 0, ut = We = Le = null, Lu = !1, qo = 0, Hc.current = null, l === null || l.return === null) {
          Ln = 1, is = r, Gt = null;
          break;
        }
        e: {
          var d = n, m = l.return, T = l, w = r;
          if (r = On, T.flags |= 32768, w !== null && typeof w == "object" && typeof w.then == "function") {
            var F = w, W = T, X = W.tag;
            if (!(W.mode & 1) && (X === 0 || X === 11 || X === 15)) {
              var Q = W.alternate;
              Q ? (W.updateQueue = Q.updateQueue, W.memoizedState = Q.memoizedState, W.lanes = Q.lanes) : (W.updateQueue = null, W.memoizedState = null);
            }
            var he = th(m);
            if (he !== null) {
              he.flags &= -257, bd(he, m, T, d, r), he.mode & 1 && es(d, F, r), r = he, w = F;
              var Ce = r.updateQueue;
              if (Ce === null) {
                var we = /* @__PURE__ */ new Set();
                we.add(w), r.updateQueue = we;
              } else Ce.add(w);
              break e;
            } else {
              if (!(r & 1)) {
                es(d, F, r), os();
                break e;
              }
              w = Error(y(426));
            }
          } else if (Wt && T.mode & 1) {
            var mn = th(m);
            if (mn !== null) {
              !(mn.flags & 65536) && (mn.flags |= 256), bd(mn, m, T, d, r), md(el(w, T));
              break e;
            }
          }
          d = w = el(w, T), Ln !== 4 && (Ln = 2), nl === null ? nl = [d] : nl.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var O = Jv(d, w, r);
                Iv(d, O);
                break e;
              case 1:
                T = w;
                var D = d.type, z = d.stateNode;
                if (!(d.flags & 128) && (typeof D.getDerivedStateFromError == "function" || z !== null && typeof z.componentDidCatch == "function" && (ba === null || !ba.has(z)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var J = eh(d, T, r);
                  Iv(d, J);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        ph(l);
      } catch (ke) {
        r = ke, Gt === l && l !== null && (Gt = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function fh() {
    var n = $l.current;
    return $l.current = vr, n === null ? vr : n;
  }
  function os() {
    (Ln === 0 || Ln === 3 || Ln === 2) && (Ln = 4), sn === null || !(Yl & 268435455) && !(qu & 268435455) || ri(sn, On);
  }
  function Ic(n, r) {
    var l = ct;
    ct |= 2;
    var o = fh();
    (sn !== n || On !== r) && (wi = null, Wl(n, r));
    do
      try {
        Vy();
        break;
      } catch (c) {
        ch(n, c);
      }
    while (!0);
    if (ta(), ct = l, $l.current = o, Gt !== null) throw Error(y(261));
    return sn = null, On = 0, Ln;
  }
  function Vy() {
    for (; Gt !== null; ) dh(Gt);
  }
  function jy() {
    for (; Gt !== null && !Lr(); ) dh(Gt);
  }
  function dh(n) {
    var r = mh(n.alternate, n, Pr);
    n.memoizedProps = n.pendingProps, r === null ? ph(n) : Gt = r, Hc.current = null;
  }
  function ph(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = zy(l, r), l !== null) {
          l.flags &= 32767, Gt = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Ln = 6, Gt = null;
          return;
        }
      } else if (l = Uy(l, r, Pr), l !== null) {
        Gt = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Gt = r;
        return;
      }
      Gt = r = n;
    } while (r !== null);
    Ln === 0 && (Ln = 5);
  }
  function rl(n, r, l) {
    var o = Mt, c = wa.transition;
    try {
      wa.transition = null, Mt = 1, By(n, r, l, o);
    } finally {
      wa.transition = c, Mt = o;
    }
    return null;
  }
  function By(n, r, l, o) {
    do
      Ju();
    while (Da !== null);
    if (ct & 6) throw Error(y(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(y(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (dy(n, d), n === sn && (Gt = sn = null, On = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || Ku || (Ku = !0, yh(Ka, function() {
      return Ju(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = wa.transition, wa.transition = null;
      var m = Mt;
      Mt = 1;
      var T = ct;
      ct |= 4, Hc.current = null, Ay(n, l), oh(l, n), qs(kl), xl = !!ld, kl = ld = null, n.current = l, Fy(l), Bi(), ct = T, Mt = m, wa.transition = d;
    } else n.current = l;
    if (Ku && (Ku = !1, Da = n, Bc = c), d = n.pendingLanes, d === 0 && (ba = null), Kp(l.stateNode), Mn(n, kt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (jc) throw jc = !1, n = Ud, Ud = null, n;
    return Bc & 1 && n.tag !== 0 && Ju(), d = n.pendingLanes, d & 1 ? n === Pc ? ls++ : (ls = 0, Pc = n) : ls = 0, Ur(), null;
  }
  function Ju() {
    if (Da !== null) {
      var n = Ff(Bc), r = wa.transition, l = Mt;
      try {
        if (wa.transition = null, Mt = 16 > n ? 16 : n, Da === null) var o = !1;
        else {
          if (n = Da, Da = null, Bc = 0, ct & 6) throw Error(y(331));
          var c = ct;
          for (ct |= 4, ge = n.current; ge !== null; ) {
            var d = ge, m = d.child;
            if (ge.flags & 16) {
              var T = d.deletions;
              if (T !== null) {
                for (var w = 0; w < T.length; w++) {
                  var F = T[w];
                  for (ge = F; ge !== null; ) {
                    var W = ge;
                    switch (W.tag) {
                      case 0:
                      case 11:
                      case 15:
                        $u(8, W, d);
                    }
                    var X = W.child;
                    if (X !== null) X.return = W, ge = X;
                    else for (; ge !== null; ) {
                      W = ge;
                      var Q = W.sibling, he = W.return;
                      if (lh(W), W === F) {
                        ge = null;
                        break;
                      }
                      if (Q !== null) {
                        Q.return = he, ge = Q;
                        break;
                      }
                      ge = he;
                    }
                  }
                }
                var Ce = d.alternate;
                if (Ce !== null) {
                  var we = Ce.child;
                  if (we !== null) {
                    Ce.child = null;
                    do {
                      var mn = we.sibling;
                      we.sibling = null, we = mn;
                    } while (we !== null);
                  }
                }
                ge = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, ge = m;
            else e: for (; ge !== null; ) {
              if (d = ge, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  $u(9, d, d.return);
              }
              var O = d.sibling;
              if (O !== null) {
                O.return = d.return, ge = O;
                break e;
              }
              ge = d.return;
            }
          }
          var D = n.current;
          for (ge = D; ge !== null; ) {
            m = ge;
            var z = m.child;
            if (m.subtreeFlags & 2064 && z !== null) z.return = m, ge = z;
            else e: for (m = D; ge !== null; ) {
              if (T = ge, T.flags & 2048) try {
                switch (T.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ac(9, T);
                }
              } catch (ke) {
                cn(T, T.return, ke);
              }
              if (T === m) {
                ge = null;
                break e;
              }
              var J = T.sibling;
              if (J !== null) {
                J.return = T.return, ge = J;
                break e;
              }
              ge = T.return;
            }
          }
          if (ct = c, Ur(), Ha && typeof Ha.onPostCommitFiberRoot == "function") try {
            Ha.onPostCommitFiberRoot(To, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Mt = l, wa.transition = r;
      }
    }
    return !1;
  }
  function vh(n, r, l) {
    r = el(l, r), r = Jv(n, r, 1), n = Zi(n, r, 1), r = Qn(), n !== null && (Rl(n, 1, r), Mn(n, r));
  }
  function cn(n, r, l) {
    if (n.tag === 3) vh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        vh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (ba === null || !ba.has(o))) {
          n = el(l, n), n = eh(r, n, 1), r = Zi(r, n, 1), n = Qn(), r !== null && (Rl(r, 1, n), Mn(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Py(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Qn(), n.pingedLanes |= n.suspendedLanes & l, sn === n && (On & l) === l && (Ln === 4 || Ln === 3 && (On & 130023424) === On && 500 > kt() - Vc ? Wl(n, 0) : Nd |= l), Mn(n, r);
  }
  function hh(n, r) {
    r === 0 && (n.mode & 1 ? (r = pu, pu <<= 1, !(pu & 130023424) && (pu = 4194304)) : r = 1);
    var l = Qn();
    n = Ti(n, r), n !== null && (Rl(n, r, l), Mn(n, l));
  }
  function Hd(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), hh(n, l);
  }
  function $y(n, r) {
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
        throw Error(y(314));
    }
    o !== null && o.delete(r), hh(n, l);
  }
  var mh;
  mh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || un.current) jr = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return jr = !1, xi(n, r, l);
      jr = !!(n.flags & 131072);
    }
    else jr = !1, Wt && r.flags & 1048576 && pd(r, wu, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        rs(n, r), n = r.pendingProps;
        var c = ya(r, Qe.current);
        Du(r, l), c = I(null, r, o, n, c, l);
        var d = Tn();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Xt(o) ? (d = !0, tc(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, oc(r), c.updater = jl, r.stateNode = c, c._reactInternals = r, xd(r, o, n, l), r = Oc(null, r, o, !0, d, l)) : (r.tag = 0, Wt && d && nc(r), vn(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (rs(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Yy(o), n = Vr(o, n), c) {
            case 0:
              r = tt(null, r, o, n, l);
              break e;
            case 1:
              r = ts(null, r, o, n, l);
              break e;
            case 11:
              r = Hu(null, r, o, n, l);
              break e;
            case 14:
              r = tl(null, r, o, Vr(o.type, n), l);
              break e;
          }
          throw Error(y(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Vr(o, c), tt(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Vr(o, c), ts(n, r, o, c, l);
      case 3:
        e: {
          if (Ny(r), n === null) throw Error(y(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, _u(n, r), cc(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = el(Error(y(423)), r), r = rh(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = el(Error(y(424)), r), r = rh(n, r, o, l, c);
            break e;
          } else for (Fr = $a(r.stateNode.containerInfo.firstChild), ea = r, Wt = !0, Ea = null, l = $v(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (nn(), o === c) {
              r = hn(n, r, l);
              break e;
            }
            vn(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Wv(r), n === null && ac(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Bo(o, c) ? m = null : d !== null && Bo(o, d) && (r.flags |= 32), Bl(n, r), vn(n, r, m, l), r.child;
      case 6:
        return n === null && ac(r), null;
      case 13:
        return ah(n, r, l);
      case 4:
        return Sd(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = bu(r, null, o, l) : vn(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Vr(o, c), Hu(n, r, o, c, l);
      case 7:
        return vn(n, r, r.pendingProps, l), r.child;
      case 8:
        return vn(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return vn(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, Ot(Ci, o._currentValue), o._currentValue = m, d !== null) if (ha(d.value, m)) {
            if (d.children === c.children && !un.current) {
              r = hn(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var T = d.dependencies;
            if (T !== null) {
              m = d.child;
              for (var w = T.firstContext; w !== null; ) {
                if (w.context === o) {
                  if (d.tag === 1) {
                    w = Hr(-1, l & -l), w.tag = 2;
                    var F = d.updateQueue;
                    if (F !== null) {
                      F = F.shared;
                      var W = F.pending;
                      W === null ? w.next = w : (w.next = W.next, W.next = w), F.pending = w;
                    }
                  }
                  d.lanes |= l, w = d.alternate, w !== null && (w.lanes |= l), gd(
                    d.return,
                    l,
                    r
                  ), T.lanes |= l;
                  break;
                }
                w = w.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(y(341));
              m.lanes |= l, T = m.alternate, T !== null && (T.lanes |= l), gd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          vn(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, Du(r, l), c = Ta(c), o = o(c), r.flags |= 1, vn(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = Vr(o, r.pendingProps), c = Vr(o.type, c), tl(n, r, o, c, l);
      case 15:
        return kc(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : Vr(o, c), rs(n, r), r.tag = 1, Xt(o) ? (n = !0, tc(r)) : n = !1, Du(r, l), Xv(r, o, c), xd(r, o, c, l), Oc(null, r, o, !0, n, l);
      case 19:
        return _d(n, r, l);
      case 22:
        return Br(n, r, l);
    }
    throw Error(y(156, r.tag));
  };
  function yh(n, r) {
    return It(n, r);
  }
  function gh(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function _a(n, r, l, o) {
    return new gh(n, r, l, o);
  }
  function Vd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Yy(n) {
    if (typeof n == "function") return Vd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === Ve) return 11;
      if (n === vt) return 14;
    }
    return 2;
  }
  function al(n, r) {
    var l = n.alternate;
    return l === null ? (l = _a(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Qc(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Vd(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case Xe:
        return Gl(l.children, c, d, r);
      case Yt:
        m = 8, c |= 8;
        break;
      case Jt:
        return n = _a(12, l, r, c | 2), n.elementType = Jt, n.lanes = d, n;
      case fe:
        return n = _a(13, l, r, c), n.elementType = fe, n.lanes = d, n;
      case Fe:
        return n = _a(19, l, r, c), n.elementType = Fe, n.lanes = d, n;
      case Ut:
        return Wc(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case pt:
            m = 10;
            break e;
          case Et:
            m = 9;
            break e;
          case Ve:
            m = 11;
            break e;
          case vt:
            m = 14;
            break e;
          case st:
            m = 16, o = null;
            break e;
        }
        throw Error(y(130, n == null ? n : typeof n, ""));
    }
    return r = _a(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Gl(n, r, l, o) {
    return n = _a(7, n, o, r), n.lanes = l, n;
  }
  function Wc(n, r, l, o) {
    return n = _a(22, n, o, r), n.elementType = Ut, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Gc(n, r, l) {
    return n = _a(6, n, null, r), n.lanes = l, n;
  }
  function ss(n, r, l) {
    return r = _a(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function cs(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Af(0), this.expirationTimes = Af(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Af(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function jd(n, r, l, o, c, d, m, T, w) {
    return n = new cs(n, r, l, T, w), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = _a(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, oc(d), n;
  }
  function Sh(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Ct, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Bd(n) {
    if (!n) return Ja;
    n = n._reactInternals;
    e: {
      if (ze(n) !== n || n.tag !== 1) throw Error(y(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Xt(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(y(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Xt(l)) return Yo(n, l, r);
    }
    return r;
  }
  function Pd(n, r, l, o, c, d, m, T, w) {
    return n = jd(l, o, !0, n, c, d, m, T, w), n.context = Bd(null), l = n.current, o = Qn(), c = bi(l), d = Hr(o, c), d.callback = r ?? null, Zi(l, d, c), n.current.lanes = c, Rl(n, c, o), Mn(n, o), n;
  }
  function qc(n, r, l, o) {
    var c = r.current, d = Qn(), m = bi(c);
    return l = Bd(l), r.context === null ? r.context = l : r.pendingContext = l, r = Hr(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Zi(c, r, m), n !== null && (rn(n, c, m, d), sc(n, c, m)), m;
  }
  function fs(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Eh(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function $d(n, r) {
    Eh(n, r), (n = n.alternate) && Eh(n, r);
  }
  function Iy() {
    return null;
  }
  var Yd = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Xc(n) {
    this._internalRoot = n;
  }
  ds.prototype.render = Xc.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(y(409));
    qc(n, r, null, null);
  }, ds.prototype.unmount = Xc.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      ai(function() {
        qc(null, n, null, null);
      }), r[Si] = null;
    }
  };
  function ds(n) {
    this._internalRoot = n;
  }
  ds.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = tv();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < zt.length && r !== 0 && r < zt[l].priority; l++) ;
      zt.splice(l, 0, n), l === 0 && nv(n);
    }
  };
  function il(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function Kc(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Ch() {
  }
  function Qy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var F = fs(m);
          d.call(F);
        };
      }
      var m = Pd(r, o, n, 0, null, !1, !1, "", Ch);
      return n._reactRootContainer = m, n[Si] = m.current, Ru(n.nodeType === 8 ? n.parentNode : n), ai(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var T = o;
      o = function() {
        var F = fs(w);
        T.call(F);
      };
    }
    var w = jd(n, 0, !1, null, null, !1, !1, "", Ch);
    return n._reactRootContainer = w, n[Si] = w.current, Ru(n.nodeType === 8 ? n.parentNode : n), ai(function() {
      qc(r, w, l, o);
    }), w;
  }
  function Zc(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var T = c;
        c = function() {
          var w = fs(m);
          T.call(w);
        };
      }
      qc(r, m, n, c);
    } else m = Qy(l, r, n, c, o);
    return fs(m);
  }
  ev = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Tl(r.pendingLanes);
          l !== 0 && (Ro(r, l | 1), Mn(r, kt()), !(ct & 6) && (Xu = kt() + 500, Ur()));
        }
        break;
      case 13:
        ai(function() {
          var o = Ti(n, 1);
          if (o !== null) {
            var c = Qn();
            rn(o, n, 1, c);
          }
        }), $d(n, 1);
    }
  }, Fs = function(n) {
    if (n.tag === 13) {
      var r = Ti(n, 134217728);
      if (r !== null) {
        var l = Qn();
        rn(r, n, 134217728, l);
      }
      $d(n, 134217728);
    }
  }, Nt = function(n) {
    if (n.tag === 13) {
      var r = bi(n), l = Ti(n, r);
      if (l !== null) {
        var o = Qn();
        rn(l, n, r, o);
      }
      $d(n, r);
    }
  }, tv = function() {
    return Mt;
  }, Hf = function(n, r) {
    var l = Mt;
    try {
      return Mt = n, r();
    } finally {
      Mt = l;
    }
  }, Gr = function(n, r, l) {
    switch (r) {
      case "input":
        if (Kn(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = He(o);
              if (!c) throw Error(y(90));
              kr(o), Kn(o, c);
            }
          }
        }
        break;
      case "textarea":
        Se(n, l);
        break;
      case "select":
        r = l.value, r != null && re(n, !!l.multiple, r, !1);
    }
  }, Co = Fd, Ns = ai;
  var Wy = { usingClientEntryPoint: !1, Events: [$o, xu, He, gl, cu, Fd] }, ps = { findFiberByHostInstance: ma, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Th = { bundleType: ps.bundleType, version: ps.version, rendererPackageName: ps.rendererPackageName, rendererConfig: ps.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ot.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = it(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: ps.findFiberByHostInstance || Iy, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Jc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Jc.isDisabled && Jc.supportsFiber) try {
      To = Jc.inject(Th), Ha = Jc;
    } catch {
    }
  }
  return Ua.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Wy, Ua.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!il(r)) throw Error(y(200));
    return Sh(n, r, null, l);
  }, Ua.createRoot = function(n, r) {
    if (!il(n)) throw Error(y(299));
    var l = !1, o = "", c = Yd;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = jd(n, 1, !1, null, null, l, !1, o, c), n[Si] = r.current, Ru(n.nodeType === 8 ? n.parentNode : n), new Xc(r);
  }, Ua.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(y(188)) : (n = Object.keys(n).join(","), Error(y(268, n)));
    return n = it(r), n = n === null ? null : n.stateNode, n;
  }, Ua.flushSync = function(n) {
    return ai(n);
  }, Ua.hydrate = function(n, r, l) {
    if (!Kc(r)) throw Error(y(200));
    return Zc(null, n, r, !0, l);
  }, Ua.hydrateRoot = function(n, r, l) {
    if (!il(n)) throw Error(y(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Yd;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = Pd(r, null, n, 1, l ?? null, c, !1, d, m), n[Si] = r.current, Ru(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new ds(r);
  }, Ua.render = function(n, r, l) {
    if (!Kc(r)) throw Error(y(200));
    return Zc(null, n, r, !1, l);
  }, Ua.unmountComponentAtNode = function(n) {
    if (!Kc(n)) throw Error(y(40));
    return n._reactRootContainer ? (ai(function() {
      Zc(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Si] = null;
      });
    }), !0) : !1;
  }, Ua.unstable_batchedUpdates = Fd, Ua.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!Kc(l)) throw Error(y(200));
    if (n == null || n._reactInternals === void 0) throw Error(y(38));
    return Zc(n, r, l, !1, o);
  }, Ua.version = "18.3.1-next-f1338f8080-20240426", Ua;
}
var za = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var VT;
function ik() {
  return VT || (VT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var h = wn, C = JT(), y = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, L = !1;
    function P(e) {
      L = e;
    }
    function k(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        te("warn", e, a);
      }
    }
    function S(e) {
      if (!L) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        te("error", e, a);
      }
    }
    function te(e, t, a) {
      {
        var i = y.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var ne = 0, se = 1, De = 2, Y = 3, ce = 4, ie = 5, xe = 6, Ze = 7, Ge = 8, wt = 9, Ee = 10, Ie = 11, ot = 12, Ne = 13, Ct = 14, Xe = 15, Yt = 16, Jt = 17, pt = 18, Et = 19, Ve = 21, fe = 22, Fe = 23, vt = 24, st = 25, Ut = !0, ee = !1, Oe = !1, de = !1, ht = !1, gt = !0, bn = !1, An = !0, ca = !0, en = !0, yr = !0, gn = /* @__PURE__ */ new Set(), qn = {}, fa = {};
    function Xn(e, t) {
      kr(e, t), kr(e + "Capture", t);
    }
    function kr(e, t) {
      qn[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), qn[e] = t;
      {
        var a = e.toLowerCase();
        fa[a] = e, e === "onDoubleClick" && (fa.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        gn.add(t[i]);
    }
    var fn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Dn = Object.prototype.hasOwnProperty;
    function Fn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function Hn(e) {
      try {
        return Kn(e), !1;
      } catch {
        return !0;
      }
    }
    function Kn(e) {
      return "" + e;
    }
    function x(e, t) {
      if (Hn(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Kn(e);
    }
    function U(e) {
      if (Hn(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Fn(e)), Kn(e);
    }
    function V(e, t) {
      if (Hn(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Kn(e);
    }
    function re(e, t) {
      if (Hn(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Fn(e)), Kn(e);
    }
    function Z(e) {
      if (Hn(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Fn(e)), Kn(e);
    }
    function q(e) {
      if (Hn(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Fn(e)), Kn(e);
    }
    var Se = 0, Je = 1, _t = 2, at = 3, dn = 4, qa = 5, gr = 6, ae = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", Ue = ae + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", rt = new RegExp("^[" + ae + "][" + Ue + "]*$"), bt = {}, jt = {};
    function Vn(e) {
      return Dn.call(jt, e) ? !0 : Dn.call(bt, e) ? !1 : rt.test(e) ? (jt[e] = !0, !0) : (bt[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Se : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function Or(e, t, a, i) {
      if (a !== null && a.type === Se)
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
    function Bt(e, t, a, i) {
      if (t === null || typeof t > "u" || Or(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case at:
            return !t;
          case dn:
            return t === !1;
          case qa:
            return isNaN(t);
          case gr:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function Gr(e) {
      return Pt.hasOwnProperty(e) ? Pt[e] : null;
    }
    function Ht(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === _t || t === at || t === dn, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var Pt = {}, su = [
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
    su.forEach(function(e) {
      Pt[e] = new Ht(
        e,
        Se,
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
      Pt[t] = new Ht(
        t,
        Je,
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
      Pt[e] = new Ht(
        e,
        _t,
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
      Pt[e] = new Ht(
        e,
        _t,
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
      Pt[e] = new Ht(
        e,
        at,
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
      Pt[e] = new Ht(
        e,
        at,
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
      Pt[e] = new Ht(
        e,
        dn,
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
      Pt[e] = new Ht(
        e,
        gr,
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
      Pt[e] = new Ht(
        e,
        qa,
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
    var gl = /[\-\:]([a-z])/g, cu = function(e) {
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
      var t = e.replace(gl, cu);
      Pt[t] = new Ht(
        t,
        Je,
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
      var t = e.replace(gl, cu);
      Pt[t] = new Ht(
        t,
        Je,
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
      var t = e.replace(gl, cu);
      Pt[t] = new Ht(
        t,
        Je,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      Pt[e] = new Ht(
        e,
        Je,
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
    var Co = "xlinkHref";
    Pt[Co] = new Ht(
      "xlinkHref",
      Je,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      Pt[e] = new Ht(
        e,
        Je,
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
    var Ns = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, Sl = !1;
    function fu(e) {
      !Sl && Ns.test(e) && (Sl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function El(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        x(a, t), i.sanitizeURL && fu("" + a);
        var s = i.attributeName, f = null;
        if (i.type === dn) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Bt(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Bt(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === at)
            return a;
          f = e.getAttribute(s);
        }
        return Bt(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function du(e, t, a, i) {
      {
        if (!Vn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return x(a, t), u === "" + a ? a : u;
      }
    }
    function Xa(e, t, a, i) {
      var u = Gr(t);
      if (!pn(t, u, i)) {
        if (Bt(t, a, u, i) && (a = null), i || u === null) {
          if (Vn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (x(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === at ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var g = u.attributeName, E = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(g);
        else {
          var _ = u.type, b;
          _ === at || _ === dn && a === !0 ? b = "" : (x(a, g), b = "" + a, u.sanitizeURL && fu(b.toString())), E ? e.setAttributeNS(E, g, b) : e.setAttribute(g, b);
        }
      }
    }
    var di = Symbol.for("react.element"), qr = Symbol.for("react.portal"), Fa = Symbol.for("react.fragment"), ji = Symbol.for("react.strict_mode"), Cl = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), G = Symbol.for("react.context"), le = Symbol.for("react.forward_ref"), ze = Symbol.for("react.suspense"), dt = Symbol.for("react.suspense_list"), St = Symbol.for("react.memo"), $e = Symbol.for("react.lazy"), it = Symbol.for("react.scope"), jn = Symbol.for("react.debug_trace_mode"), It = Symbol.for("react.offscreen"), tn = Symbol.for("react.legacy_hidden"), Lr = Symbol.for("react.cache"), Bi = Symbol.for("react.tracing_marker"), kt = Symbol.iterator, cr = "@@iterator";
    function Xr(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = kt && e[kt] || e[cr];
      return typeof t == "function" ? t : null;
    }
    var lt = Object.assign, Ka = 0, Xp, Nf, To, Ha, Kp, da, Zp;
    function Jp() {
    }
    Jp.__reactDisabledLog = !0;
    function fy() {
      {
        if (Ka === 0) {
          Xp = console.log, Nf = console.info, To = console.warn, Ha = console.error, Kp = console.group, da = console.groupCollapsed, Zp = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Jp,
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
        Ka++;
      }
    }
    function Us() {
      {
        if (Ka--, Ka === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: lt({}, e, {
              value: Xp
            }),
            info: lt({}, e, {
              value: Nf
            }),
            warn: lt({}, e, {
              value: To
            }),
            error: lt({}, e, {
              value: Ha
            }),
            group: lt({}, e, {
              value: Kp
            }),
            groupCollapsed: lt({}, e, {
              value: da
            }),
            groupEnd: lt({}, e, {
              value: Zp
            })
          });
        }
        Ka < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var pu = y.ReactCurrentDispatcher, Tl;
    function Va(e, t, a) {
      {
        if (Tl === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            Tl = i && i[1] || "";
          }
        return `
` + Tl + e;
      }
    }
    var Uf = !1, zs;
    {
      var zf = typeof WeakMap == "function" ? WeakMap : Map;
      zs = new zf();
    }
    function As(e, t) {
      if (!e || Uf)
        return "";
      {
        var a = zs.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Uf = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = pu.current, pu.current = null, fy();
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
            } catch (H) {
              i = H;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (H) {
              i = H;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (H) {
            i = H;
          }
          e();
        }
      } catch (H) {
        if (H && i && typeof H.stack == "string") {
          for (var p = H.stack.split(`
`), v = i.stack.split(`
`), g = p.length - 1, E = v.length - 1; g >= 1 && E >= 0 && p[g] !== v[E]; )
            E--;
          for (; g >= 1 && E >= 0; g--, E--)
            if (p[g] !== v[E]) {
              if (g !== 1 || E !== 1)
                do
                  if (g--, E--, E < 0 || p[g] !== v[E]) {
                    var _ = `
` + p[g].replace(" at new ", " at ");
                    return e.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", e.displayName)), typeof e == "function" && zs.set(e, _), _;
                  }
                while (g >= 1 && E >= 0);
              break;
            }
        }
      } finally {
        Uf = !1, pu.current = s, Us(), Error.prepareStackTrace = u;
      }
      var b = e ? e.displayName || e.name : "", A = b ? Va(b) : "";
      return typeof e == "function" && zs.set(e, A), A;
    }
    function Af(e, t, a) {
      return As(e, !0);
    }
    function Rl(e, t, a) {
      return As(e, !1);
    }
    function dy(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Ro(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return As(e, dy(e));
      if (typeof e == "string")
        return Va(e);
      switch (e) {
        case ze:
          return Va("Suspense");
        case dt:
          return Va("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case le:
            return Rl(e.render);
          case St:
            return Ro(e.type, t, a);
          case $e: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Ro(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Mt(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ie:
          return Va(e.type);
        case Yt:
          return Va("Lazy");
        case Ne:
          return Va("Suspense");
        case Et:
          return Va("SuspenseList");
        case ne:
        case De:
        case Xe:
          return Rl(e.type);
        case Ie:
          return Rl(e.type.render);
        case se:
          return Af(e.type);
        default:
          return "";
      }
    }
    function Ff(e) {
      try {
        var t = "", a = e;
        do
          t += Mt(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function ev(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function Fs(e) {
      return e.displayName || "Context";
    }
    function Nt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case Fa:
          return "Fragment";
        case qr:
          return "Portal";
        case Cl:
          return "Profiler";
        case ji:
          return "StrictMode";
        case ze:
          return "Suspense";
        case dt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case G:
            var t = e;
            return Fs(t) + ".Consumer";
          case R:
            var a = e;
            return Fs(a._context) + ".Provider";
          case le:
            return ev(e, e.render, "ForwardRef");
          case St:
            var i = e.displayName || null;
            return i !== null ? i : Nt(e.type) || "Memo";
          case $e: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Nt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function tv(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function Hf(e) {
      return e.displayName || "Context";
    }
    function et(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case vt:
          return "Cache";
        case wt:
          var i = a;
          return Hf(i) + ".Consumer";
        case Ee:
          var u = a;
          return Hf(u._context) + ".Provider";
        case pt:
          return "DehydratedFragment";
        case Ie:
          return tv(a, a.render, "ForwardRef");
        case Ze:
          return "Fragment";
        case ie:
          return a;
        case ce:
          return "Portal";
        case Y:
          return "Root";
        case xe:
          return "Text";
        case Yt:
          return Nt(a);
        case Ge:
          return a === ji ? "StrictMode" : "Mode";
        case fe:
          return "Offscreen";
        case ot:
          return "Profiler";
        case Ve:
          return "Scope";
        case Ne:
          return "Suspense";
        case Et:
          return "SuspenseList";
        case st:
          return "TracingMarker";
        case se:
        case ne:
        case Jt:
        case De:
        case Ct:
        case Xe:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var xo = y.ReactDebugCurrentFrame, Sn = null, pa = !1;
    function va() {
      {
        if (Sn === null)
          return null;
        var e = Sn._debugOwner;
        if (e !== null && typeof e < "u")
          return et(e);
      }
      return null;
    }
    function wo() {
      return Sn === null ? "" : Ff(Sn);
    }
    function _n() {
      xo.getCurrentStack = null, Sn = null, pa = !1;
    }
    function zt(e) {
      xo.getCurrentStack = e === null ? null : wo, Sn = e, pa = !1;
    }
    function py() {
      return Sn;
    }
    function ja(e) {
      pa = e;
    }
    function fr(e) {
      return "" + e;
    }
    function Pi(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return q(e), e;
        default:
          return "";
      }
    }
    var nv = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function vu(e, t) {
      nv[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Vf(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function rv(e) {
      return e._valueTracker;
    }
    function bo(e) {
      e._valueTracker = null;
    }
    function Do(e) {
      var t = "";
      return e && (Vf(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function hu(e) {
      var t = Vf(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      q(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            q(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            q(p), i = "" + p;
          },
          stopTracking: function() {
            bo(e), delete e[t];
          }
        };
        return f;
      }
    }
    function xl(e) {
      rv(e) || (e._valueTracker = hu(e));
    }
    function av(e) {
      if (!e)
        return !1;
      var t = rv(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = Do(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function Hs(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Vs = !1, _o = !1, js = !1, jf = !1;
    function pi(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function ko(e, t) {
      var a = e, i = t.checked, u = lt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Oo(e, t) {
      vu("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !_o && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", va() || "A component", t.type), _o = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Vs && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", va() || "A component", t.type), Vs = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Pi(t.value != null ? t.value : i),
        controlled: pi(t)
      };
    }
    function Bf(e, t) {
      var a = e, i = t.checked;
      i != null && Xa(a, "checked", i, !1);
    }
    function mu(e, t) {
      var a = e;
      {
        var i = pi(t);
        !a._wrapperState.controlled && i && !jf && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), jf = !0), a._wrapperState.controlled && !i && !js && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), js = !0);
      }
      Bf(e, t);
      var u = Pi(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = fr(u)) : a.value !== fr(u) && (a.value = fr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? $i(a, t.type, u) : t.hasOwnProperty("defaultValue") && $i(a, t.type, Pi(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function Lo(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = fr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function iv(e, t) {
      var a = e;
      mu(a, t), Kr(a, t);
    }
    function Kr(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        x(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Vh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            av(f), mu(f, p);
          }
        }
      }
    }
    function $i(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || Hs(e.ownerDocument) !== e) && (a == null ? e.defaultValue = fr(e._wrapperState.initialValue) : e.defaultValue !== fr(a) && (e.defaultValue = fr(a)));
    }
    var Bs = !1, yu = !1, lv = !1;
    function Ps(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? h.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || yu || (yu = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (lv || (lv = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Bs && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Bs = !0);
    }
    function Pf(e, t) {
      t.value != null && e.setAttribute("value", fr(Pi(t.value)));
    }
    var Mo = Array.isArray;
    function Bn(e) {
      return Mo(e);
    }
    var $s;
    $s = !1;
    function uv() {
      var e = va();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var ov = ["value", "defaultValue"];
    function vy(e) {
      {
        vu("select", e);
        for (var t = 0; t < ov.length; t++) {
          var a = ov[t];
          if (e[a] != null) {
            var i = Bn(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, uv()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, uv());
          }
        }
      }
    }
    function Yi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var g = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== g && (u[v].selected = g), g && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var E = fr(Pi(a)), _ = null, b = 0; b < u.length; b++) {
          if (u[b].value === E) {
            u[b].selected = !0, i && (u[b].defaultSelected = !0);
            return;
          }
          _ === null && !u[b].disabled && (_ = u[b]);
        }
        _ !== null && (_.selected = !0);
      }
    }
    function $f(e, t) {
      return lt({}, t, {
        value: void 0
      });
    }
    function sv(e, t) {
      var a = e;
      vy(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !$s && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), $s = !0);
    }
    function hy(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Yi(a, !!t.multiple, i, !1) : t.defaultValue != null && Yi(a, !!t.multiple, t.defaultValue, !0);
    }
    function my(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Yi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Yi(a, !!t.multiple, t.defaultValue, !0) : Yi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function yy(e, t) {
      var a = e, i = t.value;
      i != null && Yi(a, !!t.multiple, i, !1);
    }
    var Yf = !1;
    function If(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = lt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: fr(a._wrapperState.initialValue)
      });
      return i;
    }
    function cv(e, t) {
      var a = e;
      vu("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Yf && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", va() || "A component"), Yf = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (Bn(u)) {
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
        initialValue: Pi(i)
      };
    }
    function fv(e, t) {
      var a = e, i = Pi(t.value), u = Pi(t.defaultValue);
      if (i != null) {
        var s = fr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = fr(u));
    }
    function dv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Qf(e, t) {
      fv(e, t);
    }
    var vi = "http://www.w3.org/1999/xhtml", gy = "http://www.w3.org/1998/Math/MathML", Wf = "http://www.w3.org/2000/svg";
    function Ys(e) {
      switch (e) {
        case "svg":
          return Wf;
        case "math":
          return gy;
        default:
          return vi;
      }
    }
    function Gf(e, t) {
      return e == null || e === vi ? Ys(t) : e === Wf && t === "foreignObject" ? vi : e;
    }
    var Sy = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, Is, pv = Sy(function(e, t) {
      if (e.namespaceURI === Wf && !("innerHTML" in e)) {
        Is = Is || document.createElement("div"), Is.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = Is.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Mr = 1, hi = 3, En = 8, Ba = 9, wl = 11, Qs = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === hi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, vv = {
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
    }, gu = {
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
    function hv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var mv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(gu).forEach(function(e) {
      mv.forEach(function(t) {
        gu[hv(t, e)] = gu[e];
      });
    });
    function Ws(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(gu.hasOwnProperty(e) && gu[e]) ? t + "px" : (re(t, e), ("" + t).trim());
    }
    var Su = /([A-Z])/g, Ey = /^ms-/;
    function Cy(e) {
      return e.replace(Su, "-$1").toLowerCase().replace(Ey, "-ms-");
    }
    var yv = function() {
    };
    {
      var gv = /^(?:webkit|moz|o)[A-Z]/, Sv = /^-ms-/, No = /-(.)/g, Eu = /;\s*$/, Cu = {}, Tu = {}, Ev = !1, qf = !1, Xf = function(e) {
        return e.replace(No, function(t, a) {
          return a.toUpperCase();
        });
      }, Kf = function(e) {
        Cu.hasOwnProperty(e) && Cu[e] || (Cu[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Xf(e.replace(Sv, "ms-"))
        ));
      }, Cv = function(e) {
        Cu.hasOwnProperty(e) && Cu[e] || (Cu[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, Tv = function(e, t) {
        Tu.hasOwnProperty(t) && Tu[t] || (Tu[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Eu, "")));
      }, Rv = function(e, t) {
        Ev || (Ev = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, Ty = function(e, t) {
        qf || (qf = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      yv = function(e, t) {
        e.indexOf("-") > -1 ? Kf(e) : gv.test(e) ? Cv(e) : Eu.test(t) && Tv(e, t), typeof t == "number" && (isNaN(t) ? Rv(e, t) : isFinite(t) || Ty(e, t));
      };
    }
    var Ry = yv;
    function xy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : Cy(i)) + ":", t += Ws(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function xv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Ry(i, t[i]);
          var s = Ws(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function wy(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function ha(e) {
      var t = {};
      for (var a in e)
        for (var i = vv[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function Uo(e, t) {
      {
        if (!t)
          return;
        var a = ha(e), i = ha(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", wy(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var wv = {
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
    }, bv = lt({
      menuitem: !0
    }, wv), Dv = "__html";
    function Gs(e, t) {
      if (t) {
        if (bv[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Dv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function mi(e, t) {
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
    var qs = {
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
    }, _v = {
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
    }, Pa = {}, Zf = new RegExp("^(aria)-[" + Ue + "]*$"), zo = new RegExp("^(aria)[A-Z][" + Ue + "]*$");
    function Jf(e, t) {
      {
        if (Dn.call(Pa, t) && Pa[t])
          return !0;
        if (zo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = _v.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), Pa[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), Pa[t] = !0, !0;
        }
        if (Zf.test(t)) {
          var u = t.toLowerCase(), s = _v.hasOwnProperty(u) ? u : null;
          if (s == null)
            return Pa[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), Pa[t] = !0, !0;
        }
      }
      return !0;
    }
    function kv(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = Jf(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function Xs(e, t) {
      mi(e, t) || kv(e, t);
    }
    var bl = !1;
    function ed(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !bl && (bl = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var td = function() {
    };
    {
      var Pn = {}, nd = /^on./, Ov = /^on[^A-Z]/, Lv = new RegExp("^(aria)-[" + Ue + "]*$"), Mv = new RegExp("^(aria)[A-Z][" + Ue + "]*$");
      td = function(e, t, a, i) {
        if (Dn.call(Pn, t) && Pn[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Pn[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), Pn[t] = !0, !0;
          if (nd.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), Pn[t] = !0, !0;
        } else if (nd.test(t))
          return Ov.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Pn[t] = !0, !0;
        if (Lv.test(t) || Mv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Pn[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Pn[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), Pn[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Pn[t] = !0, !0;
        var v = Gr(t), g = v !== null && v.type === Se;
        if (qs.hasOwnProperty(u)) {
          var E = qs[u];
          if (E !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, E), Pn[t] = !0, !0;
        } else if (!g && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), Pn[t] = !0, !0;
        return typeof a == "boolean" && Or(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), Pn[t] = !0, !0) : g ? !0 : Or(t, a, v, !1) ? (Pn[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === at && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), Pn[t] = !0), !0);
      };
    }
    var Nv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = td(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Uv(e, t, a) {
      mi(e, t) || Nv(e, t, a);
    }
    var yi = 1, Ao = 2, Dl = 4, by = yi | Ao | Dl, Fo = null;
    function Ho(e) {
      Fo !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Fo = e;
    }
    function Dy() {
      Fo === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Fo = null;
    }
    function zv(e) {
      return e === Fo;
    }
    function Ks(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === hi ? t.parentNode : t;
    }
    var Vt = null, Ii = null, gi = null;
    function Ru(e) {
      var t = no(e);
      if (t) {
        if (typeof Vt != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Vh(a);
          Vt(t.stateNode, t.type, i);
        }
      }
    }
    function Av(e) {
      Vt = e;
    }
    function Zs(e) {
      Ii ? gi ? gi.push(e) : gi = [e] : Ii = e;
    }
    function Vo() {
      return Ii !== null || gi !== null;
    }
    function jo() {
      if (Ii) {
        var e = Ii, t = gi;
        if (Ii = null, gi = null, Ru(e), t)
          for (var a = 0; a < t.length; a++)
            Ru(t[a]);
      }
    }
    var _l = function(e, t) {
      return e(t);
    }, rd = function() {
    }, ad = !1;
    function _y() {
      var e = Vo();
      e && (rd(), jo());
    }
    function id(e, t, a) {
      if (ad)
        return e(t, a);
      ad = !0;
      try {
        return _l(e, t, a);
      } finally {
        ad = !1, _y();
      }
    }
    function Js(e, t, a) {
      _l = e, rd = a;
    }
    function ec(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function ld(e, t, a) {
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
          return !!(a.disabled && ec(t));
        default:
          return !1;
      }
    }
    function kl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Vh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (ld(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var Bo = !1;
    if (fn)
      try {
        var Ol = {};
        Object.defineProperty(Ol, "passive", {
          get: function() {
            Bo = !0;
          }
        }), window.addEventListener("test", Ol, Ol), window.removeEventListener("test", Ol, Ol);
      } catch {
        Bo = !1;
      }
    function Fv(e, t, a, i, u, s, f, p, v) {
      var g = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, g);
      } catch (E) {
        this.onError(E);
      }
    }
    var ud = Fv;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var od = document.createElement("react");
      ud = function(t, a, i, u, s, f, p, v, g) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var E = document.createEvent("Event"), _ = !1, b = !0, A = window.event, H = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          od.removeEventListener(B, je, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = A);
        }
        var pe = Array.prototype.slice.call(arguments, 3);
        function je() {
          _ = !0, j(), a.apply(i, pe), b = !1;
        }
        var Me, yt = !1, ft = !1;
        function M(N) {
          if (Me = N.error, yt = !0, Me === null && N.colno === 0 && N.lineno === 0 && (ft = !0), N.defaultPrevented && Me != null && typeof Me == "object")
            try {
              Me._suppressLogging = !0;
            } catch {
            }
        }
        var B = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", M), od.addEventListener(B, je, !1), E.initEvent(B, !1, !1), od.dispatchEvent(E), H && Object.defineProperty(window, "event", H), _ && b && (yt ? ft && (Me = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Me = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Me)), window.removeEventListener("error", M), !_)
          return j(), Fv.apply(this, arguments);
      };
    }
    var ky = ud, Qi = !1, $a = null, Po = !1, Wi = null, Za = {
      onError: function(e) {
        Qi = !0, $a = e;
      }
    };
    function Ll(e, t, a, i, u, s, f, p, v) {
      Qi = !1, $a = null, ky.apply(Za, arguments);
    }
    function Si(e, t, a, i, u, s, f, p, v) {
      if (Ll.apply(this, arguments), Qi) {
        var g = cd();
        Po || (Po = !0, Wi = g);
      }
    }
    function sd() {
      if (Po) {
        var e = Wi;
        throw Po = !1, Wi = null, e;
      }
    }
    function Oy() {
      return Qi;
    }
    function cd() {
      if (Qi) {
        var e = $a;
        return Qi = !1, $a = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ma(e) {
      return e._reactInternals;
    }
    function $o(e) {
      return e._reactInternals !== void 0;
    }
    function xu(e, t) {
      e._reactInternals = t;
    }
    var He = (
      /*                      */
      0
    ), Gi = (
      /*                */
      1
    ), Qt = (
      /*                    */
      2
    ), nt = (
      /*                       */
      4
    ), Dt = (
      /*                */
      16
    ), Ot = (
      /*                 */
      32
    ), Ja = (
      /*                     */
      64
    ), Qe = (
      /*                   */
      128
    ), un = (
      /*            */
      256
    ), Nr = (
      /*                          */
      512
    ), ya = (
      /*                     */
      1024
    ), Xt = (
      /*                      */
      2048
    ), ga = (
      /*                    */
      4096
    ), qi = (
      /*                   */
      8192
    ), Yo = (
      /*             */
      16384
    ), tc = Xt | nt | Ja | Nr | ya | Yo, Hv = (
      /*               */
      32767
    ), Zr = (
      /*                   */
      32768
    ), $n = (
      /*                */
      65536
    ), Io = (
      /* */
      131072
    ), fd = (
      /*                       */
      1048576
    ), dd = (
      /*                    */
      2097152
    ), Ur = (
      /*                 */
      4194304
    ), Xi = (
      /*                */
      8388608
    ), zr = (
      /*               */
      16777216
    ), Ml = (
      /*              */
      33554432
    ), wu = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      nt | ya | 0
    ), Ar = Qt | nt | Dt | Ot | Nr | ga | qi, dr = nt | Ja | Nr | qi, Sa = Xt | Dt, Zn = Ur | Xi | dd, Ei = y.ReactCurrentOwner;
    function Jr(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (Qt | ga)) !== He && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === Y ? a : null;
    }
    function pd(e) {
      if (e.tag === Ne) {
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
    function nc(e) {
      return e.tag === Y ? e.stateNode.containerInfo : null;
    }
    function vd(e) {
      return Jr(e) === e;
    }
    function ea(e) {
      {
        var t = Ei.current;
        if (t !== null && t.tag === se) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", et(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = ma(e);
      return u ? Jr(u) === u : !1;
    }
    function Fr(e) {
      if (Jr(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function Wt(e) {
      var t = e.alternate;
      if (!t) {
        var a = Jr(e);
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
              return Fr(s), e;
            if (v === u)
              return Fr(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var g = !1, E = s.child; E; ) {
            if (E === i) {
              g = !0, i = s, u = f;
              break;
            }
            if (E === u) {
              g = !0, u = s, i = f;
              break;
            }
            E = E.sibling;
          }
          if (!g) {
            for (E = f.child; E; ) {
              if (E === i) {
                g = !0, i = f, u = s;
                break;
              }
              if (E === u) {
                g = !0, u = f, i = s;
                break;
              }
              E = E.sibling;
            }
            if (!g)
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
    function Ea(e) {
      var t = Wt(e);
      return t !== null ? hd(t) : null;
    }
    function hd(e) {
      if (e.tag === ie || e.tag === xe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = hd(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function Vv(e) {
      var t = Wt(e);
      return t !== null ? rc(t) : null;
    }
    function rc(e) {
      if (e.tag === ie || e.tag === xe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== ce) {
          var a = rc(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var ac = C.unstable_scheduleCallback, jv = C.unstable_cancelCallback, ic = C.unstable_shouldYield, Bv = C.unstable_requestPaint, nn = C.unstable_now, md = C.unstable_getCurrentPriorityLevel, lc = C.unstable_ImmediatePriority, Nl = C.unstable_UserBlockingPriority, ei = C.unstable_NormalPriority, Pv = C.unstable_LowPriority, uc = C.unstable_IdlePriority, bu = C.unstable_yieldValue, $v = C.unstable_setDisableYieldValue, Ci = null, kn = null, ue = null, Ca = !1, ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function yd(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        ca && (e = lt({}, e, {
          getLaneLabelMap: Ti,
          injectProfilingHooks: Yv
        })), Ci = t.inject(e), kn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function gd(e, t) {
      if (kn && typeof kn.onScheduleFiberRoot == "function")
        try {
          kn.onScheduleFiberRoot(Ci, e, t);
        } catch (a) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function Du(e, t) {
      if (kn && typeof kn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Qe) === Qe;
          if (en) {
            var i;
            switch (t) {
              case hn:
                i = lc;
                break;
              case xi:
                i = Nl;
                break;
              case ti:
                i = ei;
                break;
              case Vu:
                i = uc;
                break;
              default:
                i = ei;
                break;
            }
            kn.onCommitFiberRoot(Ci, e, i, a);
          }
        } catch (u) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function Ta(e) {
      if (kn && typeof kn.onPostCommitFiberRoot == "function")
        try {
          kn.onPostCommitFiberRoot(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Ul(e) {
      if (kn && typeof kn.onCommitFiberUnmount == "function")
        try {
          kn.onCommitFiberUnmount(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Cn(e) {
      if (typeof bu == "function" && ($v(e), P(e)), kn && typeof kn.setStrictMode == "function")
        try {
          kn.setStrictMode(Ci, e);
        } catch (t) {
          Ca || (Ca = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Yv(e) {
      ue = e;
    }
    function Ti() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < Xo; a++) {
          var i = My(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ki(e) {
      ue !== null && typeof ue.markCommitStarted == "function" && ue.markCommitStarted(e);
    }
    function oc() {
      ue !== null && typeof ue.markCommitStopped == "function" && ue.markCommitStopped();
    }
    function _u(e) {
      ue !== null && typeof ue.markComponentRenderStarted == "function" && ue.markComponentRenderStarted(e);
    }
    function Hr() {
      ue !== null && typeof ue.markComponentRenderStopped == "function" && ue.markComponentRenderStopped();
    }
    function Zi(e) {
      ue !== null && typeof ue.markComponentPassiveEffectMountStarted == "function" && ue.markComponentPassiveEffectMountStarted(e);
    }
    function sc() {
      ue !== null && typeof ue.markComponentPassiveEffectMountStopped == "function" && ue.markComponentPassiveEffectMountStopped();
    }
    function Iv(e) {
      ue !== null && typeof ue.markComponentPassiveEffectUnmountStarted == "function" && ue.markComponentPassiveEffectUnmountStarted(e);
    }
    function cc() {
      ue !== null && typeof ue.markComponentPassiveEffectUnmountStopped == "function" && ue.markComponentPassiveEffectUnmountStopped();
    }
    function Qv(e) {
      ue !== null && typeof ue.markComponentLayoutEffectMountStarted == "function" && ue.markComponentLayoutEffectMountStarted(e);
    }
    function Qo() {
      ue !== null && typeof ue.markComponentLayoutEffectMountStopped == "function" && ue.markComponentLayoutEffectMountStopped();
    }
    function Ya(e) {
      ue !== null && typeof ue.markComponentLayoutEffectUnmountStarted == "function" && ue.markComponentLayoutEffectUnmountStarted(e);
    }
    function ku() {
      ue !== null && typeof ue.markComponentLayoutEffectUnmountStopped == "function" && ue.markComponentLayoutEffectUnmountStopped();
    }
    function Wo(e, t, a) {
      ue !== null && typeof ue.markComponentErrored == "function" && ue.markComponentErrored(e, t, a);
    }
    function zl(e, t, a) {
      ue !== null && typeof ue.markComponentSuspended == "function" && ue.markComponentSuspended(e, t, a);
    }
    function Sd(e) {
      ue !== null && typeof ue.markLayoutEffectsStarted == "function" && ue.markLayoutEffectsStarted(e);
    }
    function Ou() {
      ue !== null && typeof ue.markLayoutEffectsStopped == "function" && ue.markLayoutEffectsStopped();
    }
    function Wv(e) {
      ue !== null && typeof ue.markPassiveEffectsStarted == "function" && ue.markPassiveEffectsStarted(e);
    }
    function Ed() {
      ue !== null && typeof ue.markPassiveEffectsStopped == "function" && ue.markPassiveEffectsStopped();
    }
    function Kt(e) {
      ue !== null && typeof ue.markRenderStarted == "function" && ue.markRenderStarted(e);
    }
    function fc() {
      ue !== null && typeof ue.markRenderYielded == "function" && ue.markRenderYielded();
    }
    function dc() {
      ue !== null && typeof ue.markRenderStopped == "function" && ue.markRenderStopped();
    }
    function Cd(e) {
      ue !== null && typeof ue.markRenderScheduled == "function" && ue.markRenderScheduled(e);
    }
    function pc(e, t) {
      ue !== null && typeof ue.markForceUpdateScheduled == "function" && ue.markForceUpdateScheduled(e, t);
    }
    function Go(e, t) {
      ue !== null && typeof ue.markStateUpdateScheduled == "function" && ue.markStateUpdateScheduled(e, t);
    }
    var _e = (
      /*                         */
      0
    ), Le = (
      /*                 */
      1
    ), We = (
      /*                    */
      2
    ), ut = (
      /*               */
      8
    ), na = (
      /*              */
      16
    ), Lu = Math.clz32 ? Math.clz32 : pr, qo = Math.log, Ly = Math.LN2;
    function pr(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (qo(t) / Ly | 0) | 0;
    }
    var Xo = 31, I = (
      /*                        */
      0
    ), Tn = (
      /*                          */
      0
    ), Ae = (
      /*                        */
      1
    ), Jn = (
      /*    */
      2
    ), ra = (
      /*             */
      4
    ), Ri = (
      /*            */
      8
    ), Ra = (
      /*                     */
      16
    ), Mu = (
      /*                */
      32
    ), Al = (
      /*                       */
      4194240
    ), Nu = (
      /*                        */
      64
    ), vc = (
      /*                        */
      128
    ), hc = (
      /*                        */
      256
    ), mc = (
      /*                        */
      512
    ), yc = (
      /*                        */
      1024
    ), gc = (
      /*                        */
      2048
    ), Fl = (
      /*                        */
      4096
    ), Sc = (
      /*                        */
      8192
    ), Uu = (
      /*                        */
      16384
    ), zu = (
      /*                       */
      32768
    ), Ec = (
      /*                       */
      65536
    ), Ko = (
      /*                       */
      131072
    ), Cc = (
      /*                       */
      262144
    ), Tc = (
      /*                       */
      524288
    ), Rc = (
      /*                       */
      1048576
    ), xc = (
      /*                       */
      2097152
    ), Au = (
      /*                            */
      130023424
    ), Hl = (
      /*                             */
      4194304
    ), wc = (
      /*                             */
      8388608
    ), bc = (
      /*                             */
      16777216
    ), Td = (
      /*                             */
      33554432
    ), Dc = (
      /*                             */
      67108864
    ), Gv = Hl, Zo = (
      /*          */
      134217728
    ), Rd = (
      /*                          */
      268435455
    ), Fu = (
      /*               */
      268435456
    ), Ji = (
      /*                        */
      536870912
    ), vr = (
      /*                   */
      1073741824
    );
    function My(e) {
      {
        if (e & Ae)
          return "Sync";
        if (e & Jn)
          return "InputContinuousHydration";
        if (e & ra)
          return "InputContinuous";
        if (e & Ri)
          return "DefaultHydration";
        if (e & Ra)
          return "Default";
        if (e & Mu)
          return "TransitionHydration";
        if (e & Al)
          return "Transition";
        if (e & Au)
          return "Retry";
        if (e & Zo)
          return "SelectiveHydration";
        if (e & Fu)
          return "IdleHydration";
        if (e & Ji)
          return "Idle";
        if (e & vr)
          return "Offscreen";
      }
    }
    var $t = -1, _c = Nu, Vr = Hl;
    function Vl(e) {
      switch (vn(e)) {
        case Ae:
          return Ae;
        case Jn:
          return Jn;
        case ra:
          return ra;
        case Ri:
          return Ri;
        case Ra:
          return Ra;
        case Mu:
          return Mu;
        case Nu:
        case vc:
        case hc:
        case mc:
        case yc:
        case gc:
        case Fl:
        case Sc:
        case Uu:
        case zu:
        case Ec:
        case Ko:
        case Cc:
        case Tc:
        case Rc:
        case xc:
          return e & Al;
        case Hl:
        case wc:
        case bc:
        case Td:
        case Dc:
          return e & Au;
        case Zo:
          return Zo;
        case Fu:
          return Fu;
        case Ji:
          return Ji;
        case vr:
          return vr;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function jl(e, t) {
      var a = e.pendingLanes;
      if (a === I)
        return I;
      var i = I, u = e.suspendedLanes, s = e.pingedLanes, f = a & Rd;
      if (f !== I) {
        var p = f & ~u;
        if (p !== I)
          i = Vl(p);
        else {
          var v = f & s;
          v !== I && (i = Vl(v));
        }
      } else {
        var g = a & ~u;
        g !== I ? i = Vl(g) : s !== I && (i = Vl(s));
      }
      if (i === I)
        return I;
      if (t !== I && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === I) {
        var E = vn(i), _ = vn(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          E >= _ || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          E === Ra && (_ & Al) !== I
        )
          return t;
      }
      (i & ra) !== I && (i |= a & Ra);
      var b = e.entangledLanes;
      if (b !== I)
        for (var A = e.entanglements, H = i & b; H > 0; ) {
          var j = tl(H), pe = 1 << j;
          i |= A[j], H &= ~pe;
        }
      return i;
    }
    function qv(e, t) {
      for (var a = e.eventTimes, i = $t; t > 0; ) {
        var u = tl(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Xv(e, t) {
      switch (e) {
        case Ae:
        case Jn:
        case ra:
          return t + 250;
        case Ri:
        case Ra:
        case Mu:
        case Nu:
        case vc:
        case hc:
        case mc:
        case yc:
        case gc:
        case Fl:
        case Sc:
        case Uu:
        case zu:
        case Ec:
        case Ko:
        case Cc:
        case Tc:
        case Rc:
        case xc:
          return t + 5e3;
        case Hl:
        case wc:
        case bc:
        case Td:
        case Dc:
          return $t;
        case Zo:
        case Fu:
        case Ji:
        case vr:
          return $t;
        default:
          return S("Should have found matching lanes. This is a bug in React."), $t;
      }
    }
    function Kv(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = tl(f), v = 1 << p, g = s[p];
        g === $t ? ((v & i) === I || (v & u) !== I) && (s[p] = Xv(v, t)) : g <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function xd(e) {
      return Vl(e.pendingLanes);
    }
    function el(e) {
      var t = e.pendingLanes & ~vr;
      return t !== I ? t : t & vr ? vr : I;
    }
    function wd(e) {
      return (e & Ae) !== I;
    }
    function Jo(e) {
      return (e & Rd) !== I;
    }
    function Zv(e) {
      return (e & Au) === e;
    }
    function Jv(e) {
      var t = Ae | ra | Ra;
      return (e & t) === I;
    }
    function eh(e) {
      return (e & Al) === e;
    }
    function es(e, t) {
      var a = Jn | ra | Ri | Ra;
      return (t & a) !== I;
    }
    function th(e, t) {
      return (t & e.expiredLanes) !== I;
    }
    function bd(e) {
      return (e & Al) !== I;
    }
    function nh() {
      var e = _c;
      return _c <<= 1, (_c & Al) === I && (_c = Nu), e;
    }
    function jr() {
      var e = Vr;
      return Vr <<= 1, (Vr & Au) === I && (Vr = Hl), e;
    }
    function vn(e) {
      return e & -e;
    }
    function Hu(e) {
      return vn(e);
    }
    function tl(e) {
      return 31 - Lu(e);
    }
    function kc(e) {
      return tl(e);
    }
    function Br(e, t) {
      return (e & t) !== I;
    }
    function Bl(e, t) {
      return (e & t) === t;
    }
    function tt(e, t) {
      return e | t;
    }
    function ts(e, t) {
      return e & ~t;
    }
    function Oc(e, t) {
      return e & t;
    }
    function Ny(e) {
      return e;
    }
    function rh(e, t) {
      return e !== Tn && e < t ? e : t;
    }
    function ns(e) {
      for (var t = [], a = 0; a < Xo; a++)
        t.push(e);
      return t;
    }
    function Pl(e, t, a) {
      e.pendingLanes |= t, t !== Ji && (e.suspendedLanes = I, e.pingedLanes = I);
      var i = e.eventTimes, u = kc(t);
      i[u] = a;
    }
    function ah(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = tl(i), s = 1 << u;
        a[u] = $t, i &= ~s;
      }
    }
    function Lc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Mc(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = I, e.pingedLanes = I, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = tl(f), v = 1 << p;
        i[p] = I, u[p] = $t, s[p] = $t, f &= ~v;
      }
    }
    function Dd(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = tl(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function ih(e, t) {
      var a = vn(t), i;
      switch (a) {
        case ra:
          i = Jn;
          break;
        case Ra:
          i = Ri;
          break;
        case Nu:
        case vc:
        case hc:
        case mc:
        case yc:
        case gc:
        case Fl:
        case Sc:
        case Uu:
        case zu:
        case Ec:
        case Ko:
        case Cc:
        case Tc:
        case Rc:
        case xc:
        case Hl:
        case wc:
        case bc:
        case Td:
        case Dc:
          i = Mu;
          break;
        case Ji:
          i = Fu;
          break;
        default:
          i = Tn;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Tn ? Tn : i;
    }
    function Nc(e, t, a) {
      if (ta)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = kc(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function _d(e, t) {
      if (ta)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = kc(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function rs(e, t) {
      return null;
    }
    var hn = Ae, xi = ra, ti = Ra, Vu = Ji, ju = Tn;
    function xa() {
      return ju;
    }
    function on(e) {
      ju = e;
    }
    function hr(e, t) {
      var a = ju;
      try {
        return ju = e, t();
      } finally {
        ju = a;
      }
    }
    function Uy(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function zy(e, t) {
      return e > t ? e : t;
    }
    function Bu(e, t) {
      return e !== 0 && e < t;
    }
    function er(e) {
      var t = vn(e);
      return Bu(hn, t) ? Bu(xi, t) ? Jo(t) ? ti : Vu : xi : hn;
    }
    function Uc(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var ge;
    function Pu(e) {
      ge = e;
    }
    function kd(e) {
      ge(e);
    }
    var zc;
    function Ay(e) {
      zc = e;
    }
    var $u;
    function Ac(e) {
      $u = e;
    }
    var Fc;
    function lh(e) {
      Fc = e;
    }
    var Od;
    function uh(e) {
      Od = e;
    }
    var as = !1, Yu = [], Zt = null, Yn = null, Sr = null, Iu = /* @__PURE__ */ new Map(), Qu = /* @__PURE__ */ new Map(), In = [], oh = [
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
    function ni(e) {
      return oh.indexOf(e) > -1;
    }
    function Fy(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Ld(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Zt = null;
          break;
        case "dragenter":
        case "dragleave":
          Yn = null;
          break;
        case "mouseover":
        case "mouseout":
          Sr = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          Iu.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Qu.delete(i);
          break;
        }
      }
    }
    function Wu(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = Fy(t, a, i, u, s);
        if (t !== null) {
          var p = no(t);
          p !== null && zc(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function sh(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Zt = Wu(Zt, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Yn = Wu(Yn, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Sr = Wu(Sr, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, g = v.pointerId;
          return Iu.set(g, Wu(Iu.get(g) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var E = u, _ = E.pointerId;
          return Qu.set(_, Wu(Qu.get(_) || null, e, t, a, i, E)), !0;
        }
      }
      return !1;
    }
    function Md(e) {
      var t = ms(e.target);
      if (t !== null) {
        var a = Jr(t);
        if (a !== null) {
          var i = a.tag;
          if (i === Ne) {
            var u = pd(a);
            if (u !== null) {
              e.blockedOn = u, Od(e.priority, function() {
                $u(a);
              });
              return;
            }
          } else if (i === Y) {
            var s = a.stateNode;
            if (Uc(s)) {
              e.blockedOn = nc(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Hy(e) {
      for (var t = Fc(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < In.length && Bu(t, In[i].priority); i++)
        ;
      In.splice(i, 0, a), i === 0 && Md(a);
    }
    function $l(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = mr(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          Ho(s), u.target.dispatchEvent(s), Dy();
        } else {
          var f = no(i);
          return f !== null && zc(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Hc(e, t, a) {
      $l(e) && a.delete(t);
    }
    function wa() {
      as = !1, Zt !== null && $l(Zt) && (Zt = null), Yn !== null && $l(Yn) && (Yn = null), Sr !== null && $l(Sr) && (Sr = null), Iu.forEach(Hc), Qu.forEach(Hc);
    }
    function ct(e, t) {
      e.blockedOn === t && (e.blockedOn = null, as || (as = !0, C.unstable_scheduleCallback(C.unstable_NormalPriority, wa)));
    }
    function sn(e) {
      if (Yu.length > 0) {
        ct(Yu[0], e);
        for (var t = 1; t < Yu.length; t++) {
          var a = Yu[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Zt !== null && ct(Zt, e), Yn !== null && ct(Yn, e), Sr !== null && ct(Sr, e);
      var i = function(p) {
        return ct(p, e);
      };
      Iu.forEach(i), Qu.forEach(i);
      for (var u = 0; u < In.length; u++) {
        var s = In[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; In.length > 0; ) {
        var f = In[0];
        if (f.blockedOn !== null)
          break;
        Md(f), f.blockedOn === null && In.shift();
      }
    }
    var Gt = y.ReactCurrentBatchConfig, On = !0;
    function Pr(e) {
      On = !!e;
    }
    function Gu() {
      return On;
    }
    function Ln(e, t, a) {
      var i = Vc(t), u;
      switch (i) {
        case hn:
          u = is;
          break;
        case xi:
          u = Yl;
          break;
        case ti:
        default:
          u = qu;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function is(e, t, a, i) {
      var u = xa(), s = Gt.transition;
      Gt.transition = null;
      try {
        on(hn), qu(e, t, a, i);
      } finally {
        on(u), Gt.transition = s;
      }
    }
    function Yl(e, t, a, i) {
      var u = xa(), s = Gt.transition;
      Gt.transition = null;
      try {
        on(xi), qu(e, t, a, i);
      } finally {
        on(u), Gt.transition = s;
      }
    }
    function qu(e, t, a, i) {
      On && Nd(e, t, a, i);
    }
    function Nd(e, t, a, i) {
      var u = mr(e, t, a, i);
      if (u === null) {
        tg(e, t, i, nl, a), Ld(e, i);
        return;
      }
      if (sh(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Ld(e, i), t & Dl && ni(e)) {
        for (; u !== null; ) {
          var s = no(u);
          s !== null && kd(s);
          var f = mr(e, t, a, i);
          if (f === null && tg(e, t, i, nl, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      tg(e, t, i, null, a);
    }
    var nl = null;
    function mr(e, t, a, i) {
      nl = null;
      var u = Ks(i), s = ms(u);
      if (s !== null) {
        var f = Jr(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === Ne) {
            var v = pd(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === Y) {
            var g = f.stateNode;
            if (Uc(g))
              return nc(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return nl = s, null;
    }
    function Vc(e) {
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
          return hn;
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
          return xi;
        case "message": {
          var t = md();
          switch (t) {
            case lc:
              return hn;
            case Nl:
              return xi;
            case ei:
            case Pv:
              return ti;
            case uc:
              return Vu;
            default:
              return ti;
          }
        }
        default:
          return ti;
      }
    }
    function Xu(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function wi(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function jc(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Ud(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ba = null, Ku = null, Da = null;
    function Bc(e) {
      return ba = e, Ku = us(), !0;
    }
    function ls() {
      ba = null, Ku = null, Da = null;
    }
    function Pc() {
      if (Da)
        return Da;
      var e, t = Ku, a = t.length, i, u = us(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Da = u.slice(e, p), Da;
    }
    function us() {
      return "value" in ba ? ba.value : ba.textContent;
    }
    function Il(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Qn() {
      return !0;
    }
    function bi() {
      return !1;
    }
    function rn(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var g = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return g ? this.isDefaultPrevented = Qn : this.isDefaultPrevented = bi, this.isPropagationStopped = bi, this;
      }
      return lt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Qn);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Qn);
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
        isPersistent: Qn
      }), t;
    }
    var Mn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, $c = rn(Mn), Ql = lt({}, Mn, {
      view: 0,
      detail: 0
    }), zd = rn(Ql), Ad, ri, Zu;
    function Fd(e) {
      e !== Zu && (Zu && e.type === "mousemove" ? (Ad = e.screenX - Zu.screenX, ri = e.screenY - Zu.screenY) : (Ad = 0, ri = 0), Zu = e);
    }
    var ai = lt({}, Ql, {
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
      getModifierState: Hd,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (Fd(e), Ad);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : ri;
      }
    }), Yc = rn(ai), Wl = lt({}, ai, {
      dataTransfer: 0
    }), ch = rn(Wl), fh = lt({}, Ql, {
      relatedTarget: 0
    }), os = rn(fh), Ic = lt({}, Mn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Vy = rn(Ic), jy = lt({}, Mn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), dh = rn(jy), ph = lt({}, Mn, {
      data: 0
    }), rl = rn(ph), By = rl, Ju = {
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
    }, vh = {
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
    function cn(e) {
      if (e.key) {
        var t = Ju[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Il(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? vh[e.keyCode] || "Unidentified" : "";
    }
    var Py = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function hh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = Py[e];
      return i ? !!a[i] : !1;
    }
    function Hd(e) {
      return hh;
    }
    var $y = lt({}, Ql, {
      key: cn,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Hd,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Il(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Il(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), mh = rn($y), yh = lt({}, ai, {
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
    }), gh = rn(yh), _a = lt({}, Ql, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Hd
    }), Vd = rn(_a), Yy = lt({}, Mn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), al = rn(Yy), Qc = lt({}, ai, {
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
    }), Gl = rn(Qc), Wc = [9, 13, 27, 32], Gc = 229, ss = fn && "CompositionEvent" in window, cs = null;
    fn && "documentMode" in document && (cs = document.documentMode);
    var jd = fn && "TextEvent" in window && !cs, Sh = fn && (!ss || cs && cs > 8 && cs <= 11), Bd = 32, Pd = String.fromCharCode(Bd);
    function qc() {
      Xn("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Xn("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xn("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xn("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var fs = !1;
    function Eh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function $d(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Iy(e, t) {
      return e === "keydown" && t.keyCode === Gc;
    }
    function Yd(e, t) {
      switch (e) {
        case "keyup":
          return Wc.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Gc;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Xc(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function ds(e) {
      return e.locale === "ko";
    }
    var il = !1;
    function Kc(e, t, a, i, u) {
      var s, f;
      if (ss ? s = $d(t) : il ? Yd(t, i) && (s = "onCompositionEnd") : Iy(t, i) && (s = "onCompositionStart"), !s)
        return null;
      Sh && !ds(i) && (!il && s === "onCompositionStart" ? il = Bc(u) : s === "onCompositionEnd" && il && (f = Pc()));
      var p = bh(a, s);
      if (p.length > 0) {
        var v = new rl(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var g = Xc(i);
          g !== null && (v.data = g);
        }
      }
    }
    function Ch(e, t) {
      switch (e) {
        case "compositionend":
          return Xc(t);
        case "keypress":
          var a = t.which;
          return a !== Bd ? null : (fs = !0, Pd);
        case "textInput":
          var i = t.data;
          return i === Pd && fs ? null : i;
        default:
          return null;
      }
    }
    function Qy(e, t) {
      if (il) {
        if (e === "compositionend" || !ss && Yd(e, t)) {
          var a = Pc();
          return ls(), il = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!Eh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return Sh && !ds(t) ? null : t.data;
        default:
          return null;
      }
    }
    function Zc(e, t, a, i, u) {
      var s;
      if (jd ? s = Ch(t, i) : s = Qy(t, i), !s)
        return null;
      var f = bh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new By("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Wy(e, t, a, i, u, s, f) {
      Kc(e, t, a, i, u), Zc(e, t, a, i, u);
    }
    var ps = {
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
    function Th(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!ps[e.type] : t === "textarea";
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
    function Jc(e) {
      if (!fn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function n() {
      Xn("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function r(e, t, a, i) {
      Zs(i);
      var u = bh(t, "onChange");
      if (u.length > 0) {
        var s = new $c("onChange", "change", null, a, i);
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
      r(t, o, e, Ks(e)), id(m, t);
    }
    function m(e) {
      dE(e, 0);
    }
    function T(e) {
      var t = lf(e);
      if (av(t))
        return e;
    }
    function w(e, t) {
      if (e === "change")
        return t;
    }
    var F = !1;
    fn && (F = Jc("input") && (!document.documentMode || document.documentMode > 9));
    function W(e, t) {
      l = e, o = t, l.attachEvent("onpropertychange", Q);
    }
    function X() {
      l && (l.detachEvent("onpropertychange", Q), l = null, o = null);
    }
    function Q(e) {
      e.propertyName === "value" && T(o) && d(e);
    }
    function he(e, t, a) {
      e === "focusin" ? (X(), W(t, a)) : e === "focusout" && X();
    }
    function Ce(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return T(o);
    }
    function we(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function mn(e, t) {
      if (e === "click")
        return T(t);
    }
    function O(e, t) {
      if (e === "input" || e === "change")
        return T(t);
    }
    function D(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || $i(e, "number", e.value);
    }
    function z(e, t, a, i, u, s, f) {
      var p = a ? lf(a) : window, v, g;
      if (c(p) ? v = w : Th(p) ? F ? v = O : (v = Ce, g = he) : we(p) && (v = mn), v) {
        var E = v(t, a);
        if (E) {
          r(e, E, i, u);
          return;
        }
      }
      g && g(t, p, a), t === "focusout" && D(p);
    }
    function J() {
      kr("onMouseEnter", ["mouseout", "mouseover"]), kr("onMouseLeave", ["mouseout", "mouseover"]), kr("onPointerEnter", ["pointerout", "pointerover"]), kr("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function ke(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !zv(i)) {
        var g = i.relatedTarget || i.fromElement;
        if (g && (ms(g) || ap(g)))
          return;
      }
      if (!(!v && !p)) {
        var E;
        if (u.window === u)
          E = u;
        else {
          var _ = u.ownerDocument;
          _ ? E = _.defaultView || _.parentWindow : E = window;
        }
        var b, A;
        if (v) {
          var H = i.relatedTarget || i.toElement;
          if (b = a, A = H ? ms(H) : null, A !== null) {
            var j = Jr(A);
            (A !== j || A.tag !== ie && A.tag !== xe) && (A = null);
          }
        } else
          b = null, A = a;
        if (b !== A) {
          var pe = Yc, je = "onMouseLeave", Me = "onMouseEnter", yt = "mouse";
          (t === "pointerout" || t === "pointerover") && (pe = gh, je = "onPointerLeave", Me = "onPointerEnter", yt = "pointer");
          var ft = b == null ? E : lf(b), M = A == null ? E : lf(A), B = new pe(je, yt + "leave", b, i, u);
          B.target = ft, B.relatedTarget = M;
          var N = null, K = ms(u);
          if (K === a) {
            var ye = new pe(Me, yt + "enter", A, i, u);
            ye.target = M, ye.relatedTarget = ft, N = ye;
          }
          MR(e, B, N, b, A);
        }
      }
    }
    function Be(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Te = typeof Object.is == "function" ? Object.is : Be;
    function Pe(e, t) {
      if (Te(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!Dn.call(t, s) || !Te(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Nn(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Tt(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function Di(e, t) {
      for (var a = Nn(e), i = 0, u = 0; a; ) {
        if (a.nodeType === hi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Nn(Tt(a));
      }
    }
    function Gy(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return dR(e, u, s, f, p);
    }
    function dR(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, g = 0, E = e, _ = null;
      e: for (; ; ) {
        for (var b = null; E === t && (a === 0 || E.nodeType === hi) && (f = s + a), E === i && (u === 0 || E.nodeType === hi) && (p = s + u), E.nodeType === hi && (s += E.nodeValue.length), (b = E.firstChild) !== null; )
          _ = E, E = b;
        for (; ; ) {
          if (E === e)
            break e;
          if (_ === t && ++v === a && (f = s), _ === i && ++g === u && (p = s), (b = E.nextSibling) !== null)
            break;
          E = _, _ = E.parentNode;
        }
        E = b;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function pR(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var g = Di(e, f), E = Di(e, p);
        if (g && E) {
          if (u.rangeCount === 1 && u.anchorNode === g.node && u.anchorOffset === g.offset && u.focusNode === E.node && u.focusOffset === E.offset)
            return;
          var _ = a.createRange();
          _.setStart(g.node, g.offset), u.removeAllRanges(), f > p ? (u.addRange(_), u.extend(E.node, E.offset)) : (_.setEnd(E.node, E.offset), u.addRange(_));
        }
      }
    }
    function eE(e) {
      return e && e.nodeType === hi;
    }
    function tE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : eE(e) ? !1 : eE(t) ? tE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function vR(e) {
      return e && e.ownerDocument && tE(e.ownerDocument.documentElement, e);
    }
    function hR(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function nE() {
      for (var e = window, t = Hs(); t instanceof e.HTMLIFrameElement; ) {
        if (hR(t))
          e = t.contentWindow;
        else
          return t;
        t = Hs(e.document);
      }
      return t;
    }
    function qy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function mR() {
      var e = nE();
      return {
        focusedElem: e,
        selectionRange: qy(e) ? gR(e) : null
      };
    }
    function yR(e) {
      var t = nE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && vR(a)) {
        i !== null && qy(a) && SR(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Mr && u.push({
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
    function gR(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = Gy(e), t || {
        start: 0,
        end: 0
      };
    }
    function SR(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : pR(e, t);
    }
    var ER = fn && "documentMode" in document && document.documentMode <= 11;
    function CR() {
      Xn("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var ef = null, Xy = null, Id = null, Ky = !1;
    function TR(e) {
      if ("selectionStart" in e && qy(e))
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
    function RR(e) {
      return e.window === e ? e.document : e.nodeType === Ba ? e : e.ownerDocument;
    }
    function rE(e, t, a) {
      var i = RR(a);
      if (!(Ky || ef == null || ef !== Hs(i))) {
        var u = TR(ef);
        if (!Id || !Pe(Id, u)) {
          Id = u;
          var s = bh(Xy, "onSelect");
          if (s.length > 0) {
            var f = new $c("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = ef;
          }
        }
      }
    }
    function xR(e, t, a, i, u, s, f) {
      var p = a ? lf(a) : window;
      switch (t) {
        case "focusin":
          (Th(p) || p.contentEditable === "true") && (ef = p, Xy = a, Id = null);
          break;
        case "focusout":
          ef = null, Xy = null, Id = null;
          break;
        case "mousedown":
          Ky = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Ky = !1, rE(e, i, u);
          break;
        case "selectionchange":
          if (ER)
            break;
        case "keydown":
        case "keyup":
          rE(e, i, u);
      }
    }
    function Rh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var tf = {
      animationend: Rh("Animation", "AnimationEnd"),
      animationiteration: Rh("Animation", "AnimationIteration"),
      animationstart: Rh("Animation", "AnimationStart"),
      transitionend: Rh("Transition", "TransitionEnd")
    }, Zy = {}, aE = {};
    fn && (aE = document.createElement("div").style, "AnimationEvent" in window || (delete tf.animationend.animation, delete tf.animationiteration.animation, delete tf.animationstart.animation), "TransitionEvent" in window || delete tf.transitionend.transition);
    function xh(e) {
      if (Zy[e])
        return Zy[e];
      if (!tf[e])
        return e;
      var t = tf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in aE)
          return Zy[e] = t[a];
      return e;
    }
    var iE = xh("animationend"), lE = xh("animationiteration"), uE = xh("animationstart"), oE = xh("transitionend"), sE = /* @__PURE__ */ new Map(), cE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function eo(e, t) {
      sE.set(e, t), Xn(t, [e]);
    }
    function wR() {
      for (var e = 0; e < cE.length; e++) {
        var t = cE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        eo(a, "on" + i);
      }
      eo(iE, "onAnimationEnd"), eo(lE, "onAnimationIteration"), eo(uE, "onAnimationStart"), eo("dblclick", "onDoubleClick"), eo("focusin", "onFocus"), eo("focusout", "onBlur"), eo(oE, "onTransitionEnd");
    }
    function bR(e, t, a, i, u, s, f) {
      var p = sE.get(t);
      if (p !== void 0) {
        var v = $c, g = t;
        switch (t) {
          case "keypress":
            if (Il(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = mh;
            break;
          case "focusin":
            g = "focus", v = os;
            break;
          case "focusout":
            g = "blur", v = os;
            break;
          case "beforeblur":
          case "afterblur":
            v = os;
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
            v = Yc;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = ch;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Vd;
            break;
          case iE:
          case lE:
          case uE:
            v = Vy;
            break;
          case oE:
            v = al;
            break;
          case "scroll":
            v = zd;
            break;
          case "wheel":
            v = Gl;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = dh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = gh;
            break;
        }
        var E = (s & Dl) !== 0;
        {
          var _ = !E && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", b = OR(a, p, i.type, E, _);
          if (b.length > 0) {
            var A = new v(p, g, null, i, u);
            e.push({
              event: A,
              listeners: b
            });
          }
        }
      }
    }
    wR(), J(), n(), CR(), qc();
    function DR(e, t, a, i, u, s, f) {
      bR(e, t, a, i, u, s);
      var p = (s & by) === 0;
      p && (ke(e, t, a, i, u), z(e, t, a, i, u), xR(e, t, a, i, u), Wy(e, t, a, i, u));
    }
    var Qd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Jy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Qd));
    function fE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Si(i, t, void 0, e), e.currentTarget = null;
    }
    function _R(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          fE(e, v, p), i = f;
        }
      else
        for (var g = 0; g < t.length; g++) {
          var E = t[g], _ = E.instance, b = E.currentTarget, A = E.listener;
          if (_ !== i && e.isPropagationStopped())
            return;
          fE(e, A, b), i = _;
        }
    }
    function dE(e, t) {
      for (var a = (t & Dl) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        _R(s, f, a);
      }
      sd();
    }
    function kR(e, t, a, i, u) {
      var s = Ks(a), f = [];
      DR(f, e, i, a, s, t), dE(f, t);
    }
    function an(e, t) {
      Jy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = iw(t), u = NR(e);
      i.has(u) || (pE(t, e, Ao, a), i.add(u));
    }
    function eg(e, t, a) {
      Jy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Dl), pE(a, e, i, t);
    }
    var wh = "_reactListening" + Math.random().toString(36).slice(2);
    function Wd(e) {
      if (!e[wh]) {
        e[wh] = !0, gn.forEach(function(a) {
          a !== "selectionchange" && (Jy.has(a) || eg(a, !1, e), eg(a, !0, e));
        });
        var t = e.nodeType === Ba ? e : e.ownerDocument;
        t !== null && (t[wh] || (t[wh] = !0, eg("selectionchange", !1, t)));
      }
    }
    function pE(e, t, a, i, u) {
      var s = Ln(e, t, a), f = void 0;
      Bo && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? jc(e, t, s, f) : wi(e, t, s) : f !== void 0 ? Ud(e, t, s, f) : Xu(e, t, s);
    }
    function vE(e, t) {
      return e === t || e.nodeType === En && e.parentNode === t;
    }
    function tg(e, t, a, i, u) {
      var s = i;
      if (!(t & yi) && !(t & Ao)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === Y || v === ce) {
              var g = p.stateNode.containerInfo;
              if (vE(g, f))
                break;
              if (v === ce)
                for (var E = p.return; E !== null; ) {
                  var _ = E.tag;
                  if (_ === Y || _ === ce) {
                    var b = E.stateNode.containerInfo;
                    if (vE(b, f))
                      return;
                  }
                  E = E.return;
                }
              for (; g !== null; ) {
                var A = ms(g);
                if (A === null)
                  return;
                var H = A.tag;
                if (H === ie || H === xe) {
                  p = s = A;
                  continue e;
                }
                g = g.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      id(function() {
        return kR(e, t, a, s);
      });
    }
    function Gd(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function OR(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], g = e, E = null; g !== null; ) {
        var _ = g, b = _.stateNode, A = _.tag;
        if (A === ie && b !== null && (E = b, p !== null)) {
          var H = kl(g, p);
          H != null && v.push(Gd(g, H, E));
        }
        if (u)
          break;
        g = g.return;
      }
      return v;
    }
    function bh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ie && f !== null) {
          var v = f, g = kl(u, a);
          g != null && i.unshift(Gd(u, g, v));
          var E = kl(u, t);
          E != null && i.push(Gd(u, E, v));
        }
        u = u.return;
      }
      return i;
    }
    function nf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ie);
      return e || null;
    }
    function LR(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = nf(s))
        u++;
      for (var f = 0, p = i; p; p = nf(p))
        f++;
      for (; u - f > 0; )
        a = nf(a), u--;
      for (; f - u > 0; )
        i = nf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = nf(a), i = nf(i);
      }
      return null;
    }
    function hE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, g = v.alternate, E = v.stateNode, _ = v.tag;
        if (g !== null && g === i)
          break;
        if (_ === ie && E !== null) {
          var b = E;
          if (u) {
            var A = kl(p, s);
            A != null && f.unshift(Gd(p, A, b));
          } else if (!u) {
            var H = kl(p, s);
            H != null && f.push(Gd(p, H, b));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function MR(e, t, a, i, u) {
      var s = i && u ? LR(i, u) : null;
      i !== null && hE(e, t, i, s, !1), u !== null && a !== null && hE(e, a, u, s, !0);
    }
    function NR(e, t) {
      return e + "__bubble";
    }
    var ka = !1, qd = "dangerouslySetInnerHTML", Dh = "suppressContentEditableWarning", to = "suppressHydrationWarning", mE = "autoFocus", vs = "children", hs = "style", _h = "__html", ng, kh, Xd, yE, Oh, gE, SE;
    ng = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, kh = function(e, t) {
      Xs(e, t), ed(e, t), Uv(e, t, {
        registrationNameDependencies: qn,
        possibleRegistrationNames: fa
      });
    }, gE = fn && !document.documentMode, Xd = function(e, t, a) {
      if (!ka) {
        var i = Lh(a), u = Lh(t);
        u !== i && (ka = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, yE = function(e) {
      if (!ka) {
        ka = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, Oh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, SE = function(e, t) {
      var a = e.namespaceURI === vi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var UR = /\r\n?/g, zR = /\u0000|\uFFFD/g;
    function Lh(e) {
      Z(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(UR, `
`).replace(zR, "");
    }
    function Mh(e, t, a, i) {
      var u = Lh(t), s = Lh(e);
      if (s !== u && (i && (ka || (ka = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && Ut))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function EE(e) {
      return e.nodeType === Ba ? e : e.ownerDocument;
    }
    function AR() {
    }
    function Nh(e) {
      e.onclick = AR;
    }
    function FR(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === hs)
            f && Object.freeze(f), xv(t, f);
          else if (s === qd) {
            var p = f ? f[_h] : void 0;
            p != null && pv(t, p);
          } else if (s === vs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && Qs(t, f);
            } else typeof f == "number" && Qs(t, "" + f);
          else s === Dh || s === to || s === mE || (qn.hasOwnProperty(s) ? f != null && (typeof f != "function" && Oh(s, f), s === "onScroll" && an("scroll", t)) : f != null && Xa(t, s, f, u));
        }
    }
    function HR(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === hs ? xv(e, f) : s === qd ? pv(e, f) : s === vs ? Qs(e, f) : Xa(e, s, f, i);
      }
    }
    function VR(e, t, a, i) {
      var u, s = EE(a), f, p = i;
      if (p === vi && (p = Ys(e)), p === vi) {
        if (u = mi(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var g = v.firstChild;
          f = v.removeChild(g);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var E = f;
          t.multiple ? E.multiple = !0 : t.size && (E.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === vi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !Dn.call(ng, e) && (ng[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function jR(e, t) {
      return EE(t).createTextNode(e);
    }
    function BR(e, t, a, i) {
      var u = mi(t, a);
      kh(t, a);
      var s;
      switch (t) {
        case "dialog":
          an("cancel", e), an("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          an("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Qd.length; f++)
            an(Qd[f], e);
          s = a;
          break;
        case "source":
          an("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          an("error", e), an("load", e), s = a;
          break;
        case "details":
          an("toggle", e), s = a;
          break;
        case "input":
          Oo(e, a), s = ko(e, a), an("invalid", e);
          break;
        case "option":
          Ps(e, a), s = a;
          break;
        case "select":
          sv(e, a), s = $f(e, a), an("invalid", e);
          break;
        case "textarea":
          cv(e, a), s = If(e, a), an("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Gs(t, s), FR(t, e, i, s, u), t) {
        case "input":
          xl(e), Lo(e, a, !1);
          break;
        case "textarea":
          xl(e), dv(e);
          break;
        case "option":
          Pf(e, a);
          break;
        case "select":
          hy(e, a);
          break;
        default:
          typeof s.onClick == "function" && Nh(e);
          break;
      }
    }
    function PR(e, t, a, i, u) {
      kh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = ko(e, a), p = ko(e, i), s = [];
          break;
        case "select":
          f = $f(e, a), p = $f(e, i), s = [];
          break;
        case "textarea":
          f = If(e, a), p = If(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Nh(e);
          break;
      }
      Gs(t, p);
      var v, g, E = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === hs) {
            var _ = f[v];
            for (g in _)
              _.hasOwnProperty(g) && (E || (E = {}), E[g] = "");
          } else v === qd || v === vs || v === Dh || v === to || v === mE || (qn.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var b = p[v], A = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || b === A || b == null && A == null))
          if (v === hs)
            if (b && Object.freeze(b), A) {
              for (g in A)
                A.hasOwnProperty(g) && (!b || !b.hasOwnProperty(g)) && (E || (E = {}), E[g] = "");
              for (g in b)
                b.hasOwnProperty(g) && A[g] !== b[g] && (E || (E = {}), E[g] = b[g]);
            } else
              E || (s || (s = []), s.push(v, E)), E = b;
          else if (v === qd) {
            var H = b ? b[_h] : void 0, j = A ? A[_h] : void 0;
            H != null && j !== H && (s = s || []).push(v, H);
          } else v === vs ? (typeof b == "string" || typeof b == "number") && (s = s || []).push(v, "" + b) : v === Dh || v === to || (qn.hasOwnProperty(v) ? (b != null && (typeof b != "function" && Oh(v, b), v === "onScroll" && an("scroll", e)), !s && A !== b && (s = [])) : (s = s || []).push(v, b));
      }
      return E && (Uo(E, p[hs]), (s = s || []).push(hs, E)), s;
    }
    function $R(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && Bf(e, u);
      var s = mi(a, i), f = mi(a, u);
      switch (HR(e, t, s, f), a) {
        case "input":
          mu(e, u);
          break;
        case "textarea":
          fv(e, u);
          break;
        case "select":
          my(e, u);
          break;
      }
    }
    function YR(e) {
      {
        var t = e.toLowerCase();
        return qs.hasOwnProperty(t) && qs[t] || null;
      }
    }
    function IR(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = mi(t, a), kh(t, a), t) {
        case "dialog":
          an("cancel", e), an("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          an("load", e);
          break;
        case "video":
        case "audio":
          for (var g = 0; g < Qd.length; g++)
            an(Qd[g], e);
          break;
        case "source":
          an("error", e);
          break;
        case "img":
        case "image":
        case "link":
          an("error", e), an("load", e);
          break;
        case "details":
          an("toggle", e);
          break;
        case "input":
          Oo(e, a), an("invalid", e);
          break;
        case "option":
          Ps(e, a);
          break;
        case "select":
          sv(e, a), an("invalid", e);
          break;
        case "textarea":
          cv(e, a), an("invalid", e);
          break;
      }
      Gs(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var E = e.attributes, _ = 0; _ < E.length; _++) {
          var b = E[_].name.toLowerCase();
          switch (b) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(E[_].name);
          }
        }
      }
      var A = null;
      for (var H in a)
        if (a.hasOwnProperty(H)) {
          var j = a[H];
          if (H === vs)
            typeof j == "string" ? e.textContent !== j && (a[to] !== !0 && Mh(e.textContent, j, s, f), A = [vs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[to] !== !0 && Mh(e.textContent, j, s, f), A = [vs, "" + j]);
          else if (qn.hasOwnProperty(H))
            j != null && (typeof j != "function" && Oh(H, j), H === "onScroll" && an("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var pe = void 0, je = p && bn ? null : Gr(H);
            if (a[to] !== !0) {
              if (!(H === Dh || H === to || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              H === "value" || H === "checked" || H === "selected")) {
                if (H === qd) {
                  var Me = e.innerHTML, yt = j ? j[_h] : void 0;
                  if (yt != null) {
                    var ft = SE(e, yt);
                    ft !== Me && Xd(H, Me, ft);
                  }
                } else if (H === hs) {
                  if (v.delete(H), gE) {
                    var M = xy(j);
                    pe = e.getAttribute("style"), M !== pe && Xd(H, pe, M);
                  }
                } else if (p && !bn)
                  v.delete(H.toLowerCase()), pe = du(e, H, j), j !== pe && Xd(H, pe, j);
                else if (!pn(H, je, p) && !Bt(H, j, je, p)) {
                  var B = !1;
                  if (je !== null)
                    v.delete(je.attributeName), pe = El(e, H, j, je);
                  else {
                    var N = i;
                    if (N === vi && (N = Ys(t)), N === vi)
                      v.delete(H.toLowerCase());
                    else {
                      var K = YR(H);
                      K !== null && K !== H && (B = !0, v.delete(K)), v.delete(H);
                    }
                    pe = du(e, H, j);
                  }
                  var ye = bn;
                  !ye && j !== pe && !B && Xd(H, pe, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[to] !== !0 && yE(v), t) {
        case "input":
          xl(e), Lo(e, a, !0);
          break;
        case "textarea":
          xl(e), dv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Nh(e);
          break;
      }
      return A;
    }
    function QR(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function rg(e, t) {
      {
        if (ka)
          return;
        ka = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function ag(e, t) {
      {
        if (ka)
          return;
        ka = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function ig(e, t, a) {
      {
        if (ka)
          return;
        ka = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function lg(e, t) {
      {
        if (t === "" || ka)
          return;
        ka = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function WR(e, t, a) {
      switch (t) {
        case "input":
          iv(e, a);
          return;
        case "textarea":
          Qf(e, a);
          return;
        case "select":
          yy(e, a);
          return;
      }
    }
    var Kd = function() {
    }, Zd = function() {
    };
    {
      var GR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], CE = [
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
      ], qR = CE.concat(["button"]), XR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], TE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      Zd = function(e, t) {
        var a = lt({}, e || TE), i = {
          tag: t
        };
        return CE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), qR.indexOf(t) !== -1 && (a.pTagInButtonScope = null), GR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var KR = function(e, t) {
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
            return XR.indexOf(t) === -1;
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
      }, ZR = function(e, t) {
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
      }, RE = {};
      Kd = function(e, t, a) {
        a = a || TE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = KR(e, u) ? null : i, f = s ? null : ZR(e, a), p = s || f;
        if (p) {
          var v = p.tag, g = !!s + "|" + e + "|" + v;
          if (!RE[g]) {
            RE[g] = !0;
            var E = e, _ = "";
            if (e === "#text" ? /\S/.test(t) ? E = "Text nodes" : (E = "Whitespace text nodes", _ = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : E = "<" + e + ">", s) {
              var b = "";
              v === "table" && e === "tr" && (b += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", E, v, _, b);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", E, v);
          }
        }
      };
    }
    var Uh = "suppressHydrationWarning", zh = "$", Ah = "/$", Jd = "$?", ep = "$!", JR = "style", ug = null, og = null;
    function ex(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Ba:
        case wl: {
          t = i === Ba ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Gf(null, "");
          break;
        }
        default: {
          var s = i === En ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Gf(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = Zd(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function tx(e, t, a) {
      {
        var i = e, u = Gf(i.namespace, t), s = Zd(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function Zk(e) {
      return e;
    }
    function nx(e) {
      ug = Gu(), og = mR();
      var t = null;
      return Pr(!1), t;
    }
    function rx(e) {
      yR(og), Pr(ug), ug = null, og = null;
    }
    function ax(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (Kd(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = Zd(f.ancestorInfo, e);
          Kd(null, p, v);
        }
        s = f.namespace;
      }
      var g = VR(e, t, a, s);
      return rp(u, g), mg(g, t), g;
    }
    function ix(e, t) {
      e.appendChild(t);
    }
    function lx(e, t, a, i, u) {
      switch (BR(e, t, a, i), t) {
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
    function ux(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = Zd(f.ancestorInfo, t);
          Kd(null, p, v);
        }
      }
      return PR(e, t, a, i);
    }
    function sg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function ox(e, t, a, i) {
      {
        var u = a;
        Kd(null, e, u.ancestorInfo);
      }
      var s = jR(e, t);
      return rp(i, s), s;
    }
    function sx() {
      var e = window.event;
      return e === void 0 ? ti : Vc(e.type);
    }
    var cg = typeof setTimeout == "function" ? setTimeout : void 0, cx = typeof clearTimeout == "function" ? clearTimeout : void 0, fg = -1, xE = typeof Promise == "function" ? Promise : void 0, fx = typeof queueMicrotask == "function" ? queueMicrotask : typeof xE < "u" ? function(e) {
      return xE.resolve(null).then(e).catch(dx);
    } : cg;
    function dx(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function px(e, t, a, i) {
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
    function vx(e, t, a, i, u, s) {
      $R(e, t, a, i, u), mg(e, u);
    }
    function wE(e) {
      Qs(e, "");
    }
    function hx(e, t, a) {
      e.nodeValue = a;
    }
    function mx(e, t) {
      e.appendChild(t);
    }
    function yx(e, t) {
      var a;
      e.nodeType === En ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Nh(a);
    }
    function gx(e, t, a) {
      e.insertBefore(t, a);
    }
    function Sx(e, t, a) {
      e.nodeType === En ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function Ex(e, t) {
      e.removeChild(t);
    }
    function Cx(e, t) {
      e.nodeType === En ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function dg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === En) {
          var s = u.data;
          if (s === Ah)
            if (i === 0) {
              e.removeChild(u), sn(t);
              return;
            } else
              i--;
          else (s === zh || s === Jd || s === ep) && i++;
        }
        a = u;
      } while (a);
      sn(t);
    }
    function Tx(e, t) {
      e.nodeType === En ? dg(e.parentNode, t) : e.nodeType === Mr && dg(e, t), sn(e);
    }
    function Rx(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function xx(e) {
      e.nodeValue = "";
    }
    function wx(e, t) {
      e = e;
      var a = t[JR], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = Ws("display", i);
    }
    function bx(e, t) {
      e.nodeValue = t;
    }
    function Dx(e) {
      e.nodeType === Mr ? e.textContent = "" : e.nodeType === Ba && e.documentElement && e.removeChild(e.documentElement);
    }
    function _x(e, t, a) {
      return e.nodeType !== Mr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function kx(e, t) {
      return t === "" || e.nodeType !== hi ? null : e;
    }
    function Ox(e) {
      return e.nodeType !== En ? null : e;
    }
    function bE(e) {
      return e.data === Jd;
    }
    function pg(e) {
      return e.data === ep;
    }
    function Lx(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function Mx(e, t) {
      e._reactRetry = t;
    }
    function Fh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Mr || t === hi)
          break;
        if (t === En) {
          var a = e.data;
          if (a === zh || a === ep || a === Jd)
            break;
          if (a === Ah)
            return null;
        }
      }
      return e;
    }
    function tp(e) {
      return Fh(e.nextSibling);
    }
    function Nx(e) {
      return Fh(e.firstChild);
    }
    function Ux(e) {
      return Fh(e.firstChild);
    }
    function zx(e) {
      return Fh(e.nextSibling);
    }
    function Ax(e, t, a, i, u, s, f) {
      rp(s, e), mg(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var g = (s.mode & Le) !== _e;
      return IR(e, t, a, p, i, g, f);
    }
    function Fx(e, t, a, i) {
      return rp(a, e), a.mode & Le, QR(e, t);
    }
    function Hx(e, t) {
      rp(t, e);
    }
    function Vx(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === En) {
          var i = t.data;
          if (i === Ah) {
            if (a === 0)
              return tp(t);
            a--;
          } else (i === zh || i === ep || i === Jd) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function DE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === En) {
          var i = t.data;
          if (i === zh || i === ep || i === Jd) {
            if (a === 0)
              return t;
            a--;
          } else i === Ah && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function jx(e) {
      sn(e);
    }
    function Bx(e) {
      sn(e);
    }
    function Px(e) {
      return e !== "head" && e !== "body";
    }
    function $x(e, t, a, i) {
      var u = !0;
      Mh(t.nodeValue, a, i, u);
    }
    function Yx(e, t, a, i, u, s) {
      if (t[Uh] !== !0) {
        var f = !0;
        Mh(i.nodeValue, u, s, f);
      }
    }
    function Ix(e, t) {
      t.nodeType === Mr ? rg(e, t) : t.nodeType === En || ag(e, t);
    }
    function Qx(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Mr ? rg(a, t) : t.nodeType === En || ag(a, t));
      }
    }
    function Wx(e, t, a, i, u) {
      (u || t[Uh] !== !0) && (i.nodeType === Mr ? rg(a, i) : i.nodeType === En || ag(a, i));
    }
    function Gx(e, t, a) {
      ig(e, t);
    }
    function qx(e, t) {
      lg(e, t);
    }
    function Xx(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && ig(i, t);
      }
    }
    function Kx(e, t) {
      {
        var a = e.parentNode;
        a !== null && lg(a, t);
      }
    }
    function Zx(e, t, a, i, u, s) {
      (s || t[Uh] !== !0) && ig(a, i);
    }
    function Jx(e, t, a, i, u) {
      (u || t[Uh] !== !0) && lg(a, i);
    }
    function ew(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function tw(e) {
      Wd(e);
    }
    var rf = Math.random().toString(36).slice(2), af = "__reactFiber$" + rf, vg = "__reactProps$" + rf, np = "__reactContainer$" + rf, hg = "__reactEvents$" + rf, nw = "__reactListeners$" + rf, rw = "__reactHandles$" + rf;
    function aw(e) {
      delete e[af], delete e[vg], delete e[hg], delete e[nw], delete e[rw];
    }
    function rp(e, t) {
      t[af] = e;
    }
    function Hh(e, t) {
      t[np] = e;
    }
    function _E(e) {
      e[np] = null;
    }
    function ap(e) {
      return !!e[np];
    }
    function ms(e) {
      var t = e[af];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[np] || a[af], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = DE(e); u !== null; ) {
              var s = u[af];
              if (s)
                return s;
              u = DE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function no(e) {
      var t = e[af] || e[np];
      return t && (t.tag === ie || t.tag === xe || t.tag === Ne || t.tag === Y) ? t : null;
    }
    function lf(e) {
      if (e.tag === ie || e.tag === xe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Vh(e) {
      return e[vg] || null;
    }
    function mg(e, t) {
      e[vg] = t;
    }
    function iw(e) {
      var t = e[hg];
      return t === void 0 && (t = e[hg] = /* @__PURE__ */ new Set()), t;
    }
    var kE = {}, OE = y.ReactDebugCurrentFrame;
    function jh(e) {
      if (e) {
        var t = e._owner, a = Ro(e.type, e._source, t ? t.type : null);
        OE.setExtraStackFrame(a);
      } else
        OE.setExtraStackFrame(null);
    }
    function _i(e, t, a, i, u) {
      {
        var s = Function.call.bind(Dn);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (g) {
              p = g;
            }
            p && !(p instanceof Error) && (jh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), jh(null)), p instanceof Error && !(p.message in kE) && (kE[p.message] = !0, jh(u), S("Failed %s type: %s", a, p.message), jh(null));
          }
      }
    }
    var yg = [], Bh;
    Bh = [];
    var ql = -1;
    function ro(e) {
      return {
        current: e
      };
    }
    function $r(e, t) {
      if (ql < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== Bh[ql] && S("Unexpected Fiber popped."), e.current = yg[ql], yg[ql] = null, Bh[ql] = null, ql--;
    }
    function Yr(e, t, a) {
      ql++, yg[ql] = e.current, Bh[ql] = a, e.current = t;
    }
    var gg;
    gg = {};
    var Ia = {};
    Object.freeze(Ia);
    var Xl = ro(Ia), ll = ro(!1), Sg = Ia;
    function uf(e, t, a) {
      return a && ul(t) ? Sg : Xl.current;
    }
    function LE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function of(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return Ia;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = et(e) || "Unknown";
          _i(i, s, "context", p);
        }
        return u && LE(e, t, s), s;
      }
    }
    function Ph() {
      return ll.current;
    }
    function ul(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function $h(e) {
      $r(ll, e), $r(Xl, e);
    }
    function Eg(e) {
      $r(ll, e), $r(Xl, e);
    }
    function ME(e, t, a) {
      {
        if (Xl.current !== Ia)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        Yr(Xl, t, e), Yr(ll, a, e);
      }
    }
    function NE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = et(e) || "Unknown";
            gg[s] || (gg[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((et(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = et(e) || "Unknown";
          _i(u, f, "child context", v);
        }
        return lt({}, a, f);
      }
    }
    function Yh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || Ia;
        return Sg = Xl.current, Yr(Xl, a, e), Yr(ll, ll.current, e), !0;
      }
    }
    function UE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = NE(e, t, Sg);
          i.__reactInternalMemoizedMergedChildContext = u, $r(ll, e), $r(Xl, e), Yr(Xl, u, e), Yr(ll, a, e);
        } else
          $r(ll, e), Yr(ll, a, e);
      }
    }
    function lw(e) {
      {
        if (!vd(e) || e.tag !== se)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case Y:
              return t.stateNode.context;
            case se: {
              var a = t.type;
              if (ul(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var ao = 0, Ih = 1, Kl = null, Cg = !1, Tg = !1;
    function zE(e) {
      Kl === null ? Kl = [e] : Kl.push(e);
    }
    function uw(e) {
      Cg = !0, zE(e);
    }
    function AE() {
      Cg && io();
    }
    function io() {
      if (!Tg && Kl !== null) {
        Tg = !0;
        var e = 0, t = xa();
        try {
          var a = !0, i = Kl;
          for (on(hn); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Kl = null, Cg = !1;
        } catch (s) {
          throw Kl !== null && (Kl = Kl.slice(e + 1)), ac(lc, io), s;
        } finally {
          on(t), Tg = !1;
        }
      }
      return null;
    }
    var sf = [], cf = 0, Qh = null, Wh = 0, ii = [], li = 0, ys = null, Zl = 1, Jl = "";
    function ow(e) {
      return Ss(), (e.flags & fd) !== He;
    }
    function sw(e) {
      return Ss(), Wh;
    }
    function cw() {
      var e = Jl, t = Zl, a = t & ~fw(t);
      return a.toString(32) + e;
    }
    function gs(e, t) {
      Ss(), sf[cf++] = Wh, sf[cf++] = Qh, Qh = e, Wh = t;
    }
    function FE(e, t, a) {
      Ss(), ii[li++] = Zl, ii[li++] = Jl, ii[li++] = ys, ys = e;
      var i = Zl, u = Jl, s = Gh(i) - 1, f = i & ~(1 << s), p = a + 1, v = Gh(t) + s;
      if (v > 30) {
        var g = s - s % 5, E = (1 << g) - 1, _ = (f & E).toString(32), b = f >> g, A = s - g, H = Gh(t) + A, j = p << A, pe = j | b, je = _ + u;
        Zl = 1 << H | pe, Jl = je;
      } else {
        var Me = p << s, yt = Me | f, ft = u;
        Zl = 1 << v | yt, Jl = ft;
      }
    }
    function Rg(e) {
      Ss();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        gs(e, a), FE(e, a, i);
      }
    }
    function Gh(e) {
      return 32 - Lu(e);
    }
    function fw(e) {
      return 1 << Gh(e) - 1;
    }
    function xg(e) {
      for (; e === Qh; )
        Qh = sf[--cf], sf[cf] = null, Wh = sf[--cf], sf[cf] = null;
      for (; e === ys; )
        ys = ii[--li], ii[li] = null, Jl = ii[--li], ii[li] = null, Zl = ii[--li], ii[li] = null;
    }
    function dw() {
      return Ss(), ys !== null ? {
        id: Zl,
        overflow: Jl
      } : null;
    }
    function pw(e, t) {
      Ss(), ii[li++] = Zl, ii[li++] = Jl, ii[li++] = ys, Zl = t.id, Jl = t.overflow, ys = e;
    }
    function Ss() {
      Cr() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Er = null, ui = null, ki = !1, Es = !1, lo = null;
    function vw() {
      ki && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function HE() {
      Es = !0;
    }
    function hw() {
      return Es;
    }
    function mw(e) {
      var t = e.stateNode.containerInfo;
      return ui = Ux(t), Er = e, ki = !0, lo = null, Es = !1, !0;
    }
    function yw(e, t, a) {
      return ui = zx(t), Er = e, ki = !0, lo = null, Es = !1, a !== null && pw(e, a), !0;
    }
    function VE(e, t) {
      switch (e.tag) {
        case Y: {
          Ix(e.stateNode.containerInfo, t);
          break;
        }
        case ie: {
          var a = (e.mode & Le) !== _e;
          Wx(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case Ne: {
          var i = e.memoizedState;
          i.dehydrated !== null && Qx(i.dehydrated, t);
          break;
        }
      }
    }
    function jE(e, t) {
      VE(e, t);
      var a = C_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= Dt) : i.push(a);
    }
    function wg(e, t) {
      {
        if (Es)
          return;
        switch (e.tag) {
          case Y: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ie:
                var i = t.type;
                t.pendingProps, Gx(a, i);
                break;
              case xe:
                var u = t.pendingProps;
                qx(a, u);
                break;
            }
            break;
          }
          case ie: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ie: {
                var v = t.type, g = t.pendingProps, E = (e.mode & Le) !== _e;
                Zx(
                  s,
                  f,
                  p,
                  v,
                  g,
                  // TODO: Delete this argument when we remove the legacy root API.
                  E
                );
                break;
              }
              case xe: {
                var _ = t.pendingProps, b = (e.mode & Le) !== _e;
                Jx(
                  s,
                  f,
                  p,
                  _,
                  // TODO: Delete this argument when we remove the legacy root API.
                  b
                );
                break;
              }
            }
            break;
          }
          case Ne: {
            var A = e.memoizedState, H = A.dehydrated;
            if (H !== null) switch (t.tag) {
              case ie:
                var j = t.type;
                t.pendingProps, Xx(H, j);
                break;
              case xe:
                var pe = t.pendingProps;
                Kx(H, pe);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function BE(e, t) {
      t.flags = t.flags & ~ga | Qt, wg(e, t);
    }
    function PE(e, t) {
      switch (e.tag) {
        case ie: {
          var a = e.type;
          e.pendingProps;
          var i = _x(t, a);
          return i !== null ? (e.stateNode = i, Er = e, ui = Nx(i), !0) : !1;
        }
        case xe: {
          var u = e.pendingProps, s = kx(t, u);
          return s !== null ? (e.stateNode = s, Er = e, ui = null, !0) : !1;
        }
        case Ne: {
          var f = Ox(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: dw(),
              retryLane: vr
            };
            e.memoizedState = p;
            var v = T_(f);
            return v.return = e, e.child = v, Er = e, ui = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function bg(e) {
      return (e.mode & Le) !== _e && (e.flags & Qe) === He;
    }
    function Dg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function _g(e) {
      if (ki) {
        var t = ui;
        if (!t) {
          bg(e) && (wg(Er, e), Dg()), BE(Er, e), ki = !1, Er = e;
          return;
        }
        var a = t;
        if (!PE(e, t)) {
          bg(e) && (wg(Er, e), Dg()), t = tp(a);
          var i = Er;
          if (!t || !PE(e, t)) {
            BE(Er, e), ki = !1, Er = e;
            return;
          }
          jE(i, a);
        }
      }
    }
    function gw(e, t, a) {
      var i = e.stateNode, u = !Es, s = Ax(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function Sw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Fx(t, a, e);
      if (i) {
        var u = Er;
        if (u !== null)
          switch (u.tag) {
            case Y: {
              var s = u.stateNode.containerInfo, f = (u.mode & Le) !== _e;
              $x(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ie: {
              var p = u.type, v = u.memoizedProps, g = u.stateNode, E = (u.mode & Le) !== _e;
              Yx(
                p,
                v,
                g,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                E
              );
              break;
            }
          }
      }
      return i;
    }
    function Ew(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      Hx(a, e);
    }
    function Cw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return Vx(a);
    }
    function $E(e) {
      for (var t = e.return; t !== null && t.tag !== ie && t.tag !== Y && t.tag !== Ne; )
        t = t.return;
      Er = t;
    }
    function qh(e) {
      if (e !== Er)
        return !1;
      if (!ki)
        return $E(e), ki = !0, !1;
      if (e.tag !== Y && (e.tag !== ie || Px(e.type) && !sg(e.type, e.memoizedProps))) {
        var t = ui;
        if (t)
          if (bg(e))
            YE(e), Dg();
          else
            for (; t; )
              jE(e, t), t = tp(t);
      }
      return $E(e), e.tag === Ne ? ui = Cw(e) : ui = Er ? tp(e.stateNode) : null, !0;
    }
    function Tw() {
      return ki && ui !== null;
    }
    function YE(e) {
      for (var t = ui; t; )
        VE(e, t), t = tp(t);
    }
    function ff() {
      Er = null, ui = null, ki = !1, Es = !1;
    }
    function IE() {
      lo !== null && (H1(lo), lo = null);
    }
    function Cr() {
      return ki;
    }
    function kg(e) {
      lo === null ? lo = [e] : lo.push(e);
    }
    var Rw = y.ReactCurrentBatchConfig, xw = null;
    function ww() {
      return Rw.transition;
    }
    var Oi = {
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
      var bw = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & ut && (t = a), a = a.return;
        return t;
      }, Cs = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, ip = [], lp = [], up = [], op = [], sp = [], cp = [], Ts = /* @__PURE__ */ new Set();
      Oi.recordUnsafeLifecycleWarnings = function(e, t) {
        Ts.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && ip.push(e), e.mode & ut && typeof t.UNSAFE_componentWillMount == "function" && lp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && up.push(e), e.mode & ut && typeof t.UNSAFE_componentWillReceiveProps == "function" && op.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && sp.push(e), e.mode & ut && typeof t.UNSAFE_componentWillUpdate == "function" && cp.push(e));
      }, Oi.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        ip.length > 0 && (ip.forEach(function(b) {
          e.add(et(b) || "Component"), Ts.add(b.type);
        }), ip = []);
        var t = /* @__PURE__ */ new Set();
        lp.length > 0 && (lp.forEach(function(b) {
          t.add(et(b) || "Component"), Ts.add(b.type);
        }), lp = []);
        var a = /* @__PURE__ */ new Set();
        up.length > 0 && (up.forEach(function(b) {
          a.add(et(b) || "Component"), Ts.add(b.type);
        }), up = []);
        var i = /* @__PURE__ */ new Set();
        op.length > 0 && (op.forEach(function(b) {
          i.add(et(b) || "Component"), Ts.add(b.type);
        }), op = []);
        var u = /* @__PURE__ */ new Set();
        sp.length > 0 && (sp.forEach(function(b) {
          u.add(et(b) || "Component"), Ts.add(b.type);
        }), sp = []);
        var s = /* @__PURE__ */ new Set();
        if (cp.length > 0 && (cp.forEach(function(b) {
          s.add(et(b) || "Component"), Ts.add(b.type);
        }), cp = []), t.size > 0) {
          var f = Cs(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Cs(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Cs(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var g = Cs(e);
          k(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (a.size > 0) {
          var E = Cs(a);
          k(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, E);
        }
        if (u.size > 0) {
          var _ = Cs(u);
          k(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, _);
        }
      };
      var Xh = /* @__PURE__ */ new Map(), QE = /* @__PURE__ */ new Set();
      Oi.recordLegacyContextWarning = function(e, t) {
        var a = bw(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!QE.has(e.type)) {
          var i = Xh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], Xh.set(a, i)), i.push(e));
        }
      }, Oi.flushLegacyContextWarning = function() {
        Xh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(et(s) || "Component"), QE.add(s.type);
            });
            var u = Cs(i);
            try {
              zt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              _n();
            }
          }
        });
      }, Oi.discardPendingWarnings = function() {
        ip = [], lp = [], up = [], op = [], sp = [], cp = [], Xh = /* @__PURE__ */ new Map();
      };
    }
    var Og, Lg, Mg, Ng, Ug, WE = function(e, t) {
    };
    Og = !1, Lg = !1, Mg = {}, Ng = {}, Ug = {}, WE = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = et(t) || "Component";
        Ng[a] || (Ng[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Dw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function fp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & ut || An) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== se) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Dw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = et(e) || "Component";
          Mg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), Mg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== se)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          V(i, "ref");
          var g = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === g)
            return t.ref;
          var E = function(_) {
            var b = v.refs;
            _ === null ? delete b[g] : b[g] = _;
          };
          return E._stringRef = g, E;
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
    function Kh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Zh(e) {
      {
        var t = et(e) || "Component";
        if (Ug[t])
          return;
        Ug[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function GE(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function qE(e) {
      function t(M, B) {
        if (e) {
          var N = M.deletions;
          N === null ? (M.deletions = [B], M.flags |= Dt) : N.push(B);
        }
      }
      function a(M, B) {
        if (!e)
          return null;
        for (var N = B; N !== null; )
          t(M, N), N = N.sibling;
        return null;
      }
      function i(M, B) {
        for (var N = /* @__PURE__ */ new Map(), K = B; K !== null; )
          K.key !== null ? N.set(K.key, K) : N.set(K.index, K), K = K.sibling;
        return N;
      }
      function u(M, B) {
        var N = Ls(M, B);
        return N.index = 0, N.sibling = null, N;
      }
      function s(M, B, N) {
        if (M.index = N, !e)
          return M.flags |= fd, B;
        var K = M.alternate;
        if (K !== null) {
          var ye = K.index;
          return ye < B ? (M.flags |= Qt, B) : ye;
        } else
          return M.flags |= Qt, B;
      }
      function f(M) {
        return e && M.alternate === null && (M.flags |= Qt), M;
      }
      function p(M, B, N, K) {
        if (B === null || B.tag !== xe) {
          var ye = k0(N, M.mode, K);
          return ye.return = M, ye;
        } else {
          var ve = u(B, N);
          return ve.return = M, ve;
        }
      }
      function v(M, B, N, K) {
        var ye = N.type;
        if (ye === Fa)
          return E(M, B, N.props.children, K, N.key);
        if (B !== null && (B.elementType === ye || // Keep this check inline so it only runs on the false path:
        eT(B, N) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof ye == "object" && ye !== null && ye.$$typeof === $e && GE(ye) === B.type)) {
          var ve = u(B, N.props);
          return ve.ref = fp(M, B, N), ve.return = M, ve._debugSource = N._source, ve._debugOwner = N._owner, ve;
        }
        var Ye = _0(N, M.mode, K);
        return Ye.ref = fp(M, B, N), Ye.return = M, Ye;
      }
      function g(M, B, N, K) {
        if (B === null || B.tag !== ce || B.stateNode.containerInfo !== N.containerInfo || B.stateNode.implementation !== N.implementation) {
          var ye = O0(N, M.mode, K);
          return ye.return = M, ye;
        } else {
          var ve = u(B, N.children || []);
          return ve.return = M, ve;
        }
      }
      function E(M, B, N, K, ye) {
        if (B === null || B.tag !== Ze) {
          var ve = go(N, M.mode, K, ye);
          return ve.return = M, ve;
        } else {
          var Ye = u(B, N);
          return Ye.return = M, Ye;
        }
      }
      function _(M, B, N) {
        if (typeof B == "string" && B !== "" || typeof B == "number") {
          var K = k0("" + B, M.mode, N);
          return K.return = M, K;
        }
        if (typeof B == "object" && B !== null) {
          switch (B.$$typeof) {
            case di: {
              var ye = _0(B, M.mode, N);
              return ye.ref = fp(M, null, B), ye.return = M, ye;
            }
            case qr: {
              var ve = O0(B, M.mode, N);
              return ve.return = M, ve;
            }
            case $e: {
              var Ye = B._payload, Ke = B._init;
              return _(M, Ke(Ye), N);
            }
          }
          if (Bn(B) || Xr(B)) {
            var Ft = go(B, M.mode, N, null);
            return Ft.return = M, Ft;
          }
          Kh(M, B);
        }
        return typeof B == "function" && Zh(M), null;
      }
      function b(M, B, N, K) {
        var ye = B !== null ? B.key : null;
        if (typeof N == "string" && N !== "" || typeof N == "number")
          return ye !== null ? null : p(M, B, "" + N, K);
        if (typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case di:
              return N.key === ye ? v(M, B, N, K) : null;
            case qr:
              return N.key === ye ? g(M, B, N, K) : null;
            case $e: {
              var ve = N._payload, Ye = N._init;
              return b(M, B, Ye(ve), K);
            }
          }
          if (Bn(N) || Xr(N))
            return ye !== null ? null : E(M, B, N, K, null);
          Kh(M, N);
        }
        return typeof N == "function" && Zh(M), null;
      }
      function A(M, B, N, K, ye) {
        if (typeof K == "string" && K !== "" || typeof K == "number") {
          var ve = M.get(N) || null;
          return p(B, ve, "" + K, ye);
        }
        if (typeof K == "object" && K !== null) {
          switch (K.$$typeof) {
            case di: {
              var Ye = M.get(K.key === null ? N : K.key) || null;
              return v(B, Ye, K, ye);
            }
            case qr: {
              var Ke = M.get(K.key === null ? N : K.key) || null;
              return g(B, Ke, K, ye);
            }
            case $e:
              var Ft = K._payload, Rt = K._init;
              return A(M, B, N, Rt(Ft), ye);
          }
          if (Bn(K) || Xr(K)) {
            var Un = M.get(N) || null;
            return E(B, Un, K, ye, null);
          }
          Kh(B, K);
        }
        return typeof K == "function" && Zh(B), null;
      }
      function H(M, B, N) {
        {
          if (typeof M != "object" || M === null)
            return B;
          switch (M.$$typeof) {
            case di:
            case qr:
              WE(M, N);
              var K = M.key;
              if (typeof K != "string")
                break;
              if (B === null) {
                B = /* @__PURE__ */ new Set(), B.add(K);
                break;
              }
              if (!B.has(K)) {
                B.add(K);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", K);
              break;
            case $e:
              var ye = M._payload, ve = M._init;
              H(ve(ye), B, N);
              break;
          }
        }
        return B;
      }
      function j(M, B, N, K) {
        for (var ye = null, ve = 0; ve < N.length; ve++) {
          var Ye = N[ve];
          ye = H(Ye, ye, M);
        }
        for (var Ke = null, Ft = null, Rt = B, Un = 0, xt = 0, Rn = null; Rt !== null && xt < N.length; xt++) {
          Rt.index > xt ? (Rn = Rt, Rt = null) : Rn = Rt.sibling;
          var Qr = b(M, Rt, N[xt], K);
          if (Qr === null) {
            Rt === null && (Rt = Rn);
            break;
          }
          e && Rt && Qr.alternate === null && t(M, Rt), Un = s(Qr, Un, xt), Ft === null ? Ke = Qr : Ft.sibling = Qr, Ft = Qr, Rt = Rn;
        }
        if (xt === N.length) {
          if (a(M, Rt), Cr()) {
            var _r = xt;
            gs(M, _r);
          }
          return Ke;
        }
        if (Rt === null) {
          for (; xt < N.length; xt++) {
            var Wa = _(M, N[xt], K);
            Wa !== null && (Un = s(Wa, Un, xt), Ft === null ? Ke = Wa : Ft.sibling = Wa, Ft = Wa);
          }
          if (Cr()) {
            var ua = xt;
            gs(M, ua);
          }
          return Ke;
        }
        for (var oa = i(M, Rt); xt < N.length; xt++) {
          var Wr = A(oa, M, xt, N[xt], K);
          Wr !== null && (e && Wr.alternate !== null && oa.delete(Wr.key === null ? xt : Wr.key), Un = s(Wr, Un, xt), Ft === null ? Ke = Wr : Ft.sibling = Wr, Ft = Wr);
        }
        if (e && oa.forEach(function(Of) {
          return t(M, Of);
        }), Cr()) {
          var lu = xt;
          gs(M, lu);
        }
        return Ke;
      }
      function pe(M, B, N, K) {
        var ye = Xr(N);
        if (typeof ye != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          N[Symbol.toStringTag] === "Generator" && (Lg || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Lg = !0), N.entries === ye && (Og || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Og = !0);
          var ve = ye.call(N);
          if (ve)
            for (var Ye = null, Ke = ve.next(); !Ke.done; Ke = ve.next()) {
              var Ft = Ke.value;
              Ye = H(Ft, Ye, M);
            }
        }
        var Rt = ye.call(N);
        if (Rt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Un = null, xt = null, Rn = B, Qr = 0, _r = 0, Wa = null, ua = Rt.next(); Rn !== null && !ua.done; _r++, ua = Rt.next()) {
          Rn.index > _r ? (Wa = Rn, Rn = null) : Wa = Rn.sibling;
          var oa = b(M, Rn, ua.value, K);
          if (oa === null) {
            Rn === null && (Rn = Wa);
            break;
          }
          e && Rn && oa.alternate === null && t(M, Rn), Qr = s(oa, Qr, _r), xt === null ? Un = oa : xt.sibling = oa, xt = oa, Rn = Wa;
        }
        if (ua.done) {
          if (a(M, Rn), Cr()) {
            var Wr = _r;
            gs(M, Wr);
          }
          return Un;
        }
        if (Rn === null) {
          for (; !ua.done; _r++, ua = Rt.next()) {
            var lu = _(M, ua.value, K);
            lu !== null && (Qr = s(lu, Qr, _r), xt === null ? Un = lu : xt.sibling = lu, xt = lu);
          }
          if (Cr()) {
            var Of = _r;
            gs(M, Of);
          }
          return Un;
        }
        for (var $p = i(M, Rn); !ua.done; _r++, ua = Rt.next()) {
          var hl = A($p, M, _r, ua.value, K);
          hl !== null && (e && hl.alternate !== null && $p.delete(hl.key === null ? _r : hl.key), Qr = s(hl, Qr, _r), xt === null ? Un = hl : xt.sibling = hl, xt = hl);
        }
        if (e && $p.forEach(function(J_) {
          return t(M, J_);
        }), Cr()) {
          var Z_ = _r;
          gs(M, Z_);
        }
        return Un;
      }
      function je(M, B, N, K) {
        if (B !== null && B.tag === xe) {
          a(M, B.sibling);
          var ye = u(B, N);
          return ye.return = M, ye;
        }
        a(M, B);
        var ve = k0(N, M.mode, K);
        return ve.return = M, ve;
      }
      function Me(M, B, N, K) {
        for (var ye = N.key, ve = B; ve !== null; ) {
          if (ve.key === ye) {
            var Ye = N.type;
            if (Ye === Fa) {
              if (ve.tag === Ze) {
                a(M, ve.sibling);
                var Ke = u(ve, N.props.children);
                return Ke.return = M, Ke._debugSource = N._source, Ke._debugOwner = N._owner, Ke;
              }
            } else if (ve.elementType === Ye || // Keep this check inline so it only runs on the false path:
            eT(ve, N) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Ye == "object" && Ye !== null && Ye.$$typeof === $e && GE(Ye) === ve.type) {
              a(M, ve.sibling);
              var Ft = u(ve, N.props);
              return Ft.ref = fp(M, ve, N), Ft.return = M, Ft._debugSource = N._source, Ft._debugOwner = N._owner, Ft;
            }
            a(M, ve);
            break;
          } else
            t(M, ve);
          ve = ve.sibling;
        }
        if (N.type === Fa) {
          var Rt = go(N.props.children, M.mode, K, N.key);
          return Rt.return = M, Rt;
        } else {
          var Un = _0(N, M.mode, K);
          return Un.ref = fp(M, B, N), Un.return = M, Un;
        }
      }
      function yt(M, B, N, K) {
        for (var ye = N.key, ve = B; ve !== null; ) {
          if (ve.key === ye)
            if (ve.tag === ce && ve.stateNode.containerInfo === N.containerInfo && ve.stateNode.implementation === N.implementation) {
              a(M, ve.sibling);
              var Ye = u(ve, N.children || []);
              return Ye.return = M, Ye;
            } else {
              a(M, ve);
              break;
            }
          else
            t(M, ve);
          ve = ve.sibling;
        }
        var Ke = O0(N, M.mode, K);
        return Ke.return = M, Ke;
      }
      function ft(M, B, N, K) {
        var ye = typeof N == "object" && N !== null && N.type === Fa && N.key === null;
        if (ye && (N = N.props.children), typeof N == "object" && N !== null) {
          switch (N.$$typeof) {
            case di:
              return f(Me(M, B, N, K));
            case qr:
              return f(yt(M, B, N, K));
            case $e:
              var ve = N._payload, Ye = N._init;
              return ft(M, B, Ye(ve), K);
          }
          if (Bn(N))
            return j(M, B, N, K);
          if (Xr(N))
            return pe(M, B, N, K);
          Kh(M, N);
        }
        return typeof N == "string" && N !== "" || typeof N == "number" ? f(je(M, B, "" + N, K)) : (typeof N == "function" && Zh(M), a(M, B));
      }
      return ft;
    }
    var df = qE(!0), XE = qE(!1);
    function _w(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = Ls(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = Ls(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function kw(e, t) {
      for (var a = e.child; a !== null; )
        m_(a, t), a = a.sibling;
    }
    var zg = ro(null), Ag;
    Ag = {};
    var Jh = null, pf = null, Fg = null, em = !1;
    function tm() {
      Jh = null, pf = null, Fg = null, em = !1;
    }
    function KE() {
      em = !0;
    }
    function ZE() {
      em = !1;
    }
    function JE(e, t, a) {
      Yr(zg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Ag && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Ag;
    }
    function Hg(e, t) {
      var a = zg.current;
      $r(zg, t), e._currentValue = a;
    }
    function Vg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (Bl(i.childLanes, t) ? u !== null && !Bl(u.childLanes, t) && (u.childLanes = tt(u.childLanes, t)) : (i.childLanes = tt(i.childLanes, t), u !== null && (u.childLanes = tt(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function Ow(e, t, a) {
      Lw(e, t, a);
    }
    function Lw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === se) {
                var p = Hu(a), v = eu($t, p);
                v.tag = rm;
                var g = i.updateQueue;
                if (g !== null) {
                  var E = g.shared, _ = E.pending;
                  _ === null ? v.next = v : (v.next = _.next, _.next = v), E.pending = v;
                }
              }
              i.lanes = tt(i.lanes, a);
              var b = i.alternate;
              b !== null && (b.lanes = tt(b.lanes, a)), Vg(i.return, a, e), s.lanes = tt(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === Ee)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === pt) {
          var A = i.return;
          if (A === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          A.lanes = tt(A.lanes, a);
          var H = A.alternate;
          H !== null && (H.lanes = tt(H.lanes, a)), Vg(A, a, e), u = i.sibling;
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
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function vf(e, t) {
      Jh = e, pf = null, Fg = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (Br(a.lanes, t) && bp(), a.firstContext = null);
      }
    }
    function Wn(e) {
      em && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Fg !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (pf === null) {
          if (Jh === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          pf = a, Jh.dependencies = {
            lanes: I,
            firstContext: a
          };
        } else
          pf = pf.next = a;
      }
      return t;
    }
    var Rs = null;
    function jg(e) {
      Rs === null ? Rs = [e] : Rs.push(e);
    }
    function Mw() {
      if (Rs !== null) {
        for (var e = 0; e < Rs.length; e++) {
          var t = Rs[e], a = t.interleaved;
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
        Rs = null;
      }
    }
    function eC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, nm(e, i);
    }
    function Nw(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Uw(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, jg(t)) : (a.next = u.next, u.next = a), t.interleaved = a, nm(e, i);
    }
    function Oa(e, t) {
      return nm(e, t);
    }
    var zw = nm;
    function nm(e, t) {
      e.lanes = tt(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = tt(a.lanes, t)), a === null && (e.flags & (Qt | ga)) !== He && X1(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = tt(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = tt(a.childLanes, t) : (u.flags & (Qt | ga)) !== He && X1(e), i = u, u = u.return;
      if (i.tag === Y) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var tC = 0, nC = 1, rm = 2, Bg = 3, am = !1, Pg, im;
    Pg = !1, im = null;
    function $g(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: I
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function rC(e, t) {
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
    function eu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: tC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function uo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (im === u && !Pg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Pg = !0), ND()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, zw(e, a);
      } else
        return Uw(e, u, t, a);
    }
    function lm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (bd(a)) {
          var s = u.lanes;
          s = Oc(s, e.pendingLanes);
          var f = tt(s, a);
          u.lanes = f, Dd(e, f);
        }
      }
    }
    function Yg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var g = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = g : (f.next = g, f = g), v = v.next;
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
      var E = a.lastBaseUpdate;
      E === null ? a.firstBaseUpdate = t : E.next = t, a.lastBaseUpdate = t;
    }
    function Aw(e, t, a, i, u, s) {
      switch (a.tag) {
        case nC: {
          var f = a.payload;
          if (typeof f == "function") {
            KE();
            var p = f.call(s, i, u);
            {
              if (e.mode & ut) {
                Cn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  Cn(!1);
                }
              }
              ZE();
            }
            return p;
          }
          return f;
        }
        case Bg:
          e.flags = e.flags & ~$n | Qe;
        case tC: {
          var v = a.payload, g;
          if (typeof v == "function") {
            KE(), g = v.call(s, i, u);
            {
              if (e.mode & ut) {
                Cn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Cn(!1);
                }
              }
              ZE();
            }
          } else
            g = v;
          return g == null ? i : lt({}, i, g);
        }
        case rm:
          return am = !0, i;
      }
      return i;
    }
    function um(e, t, a, i) {
      var u = e.updateQueue;
      am = !1, im = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, g = v.next;
        v.next = null, f === null ? s = g : f.next = g, f = v;
        var E = e.alternate;
        if (E !== null) {
          var _ = E.updateQueue, b = _.lastBaseUpdate;
          b !== f && (b === null ? _.firstBaseUpdate = g : b.next = g, _.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var A = u.baseState, H = I, j = null, pe = null, je = null, Me = s;
        do {
          var yt = Me.lane, ft = Me.eventTime;
          if (Bl(i, yt)) {
            if (je !== null) {
              var B = {
                eventTime: ft,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Tn,
                tag: Me.tag,
                payload: Me.payload,
                callback: Me.callback,
                next: null
              };
              je = je.next = B;
            }
            A = Aw(e, u, Me, A, t, a);
            var N = Me.callback;
            if (N !== null && // If the update was already committed, we should not queue its
            // callback again.
            Me.lane !== Tn) {
              e.flags |= Ja;
              var K = u.effects;
              K === null ? u.effects = [Me] : K.push(Me);
            }
          } else {
            var M = {
              eventTime: ft,
              lane: yt,
              tag: Me.tag,
              payload: Me.payload,
              callback: Me.callback,
              next: null
            };
            je === null ? (pe = je = M, j = A) : je = je.next = M, H = tt(H, yt);
          }
          if (Me = Me.next, Me === null) {
            if (p = u.shared.pending, p === null)
              break;
            var ye = p, ve = ye.next;
            ye.next = null, Me = ve, u.lastBaseUpdate = ye, u.shared.pending = null;
          }
        } while (!0);
        je === null && (j = A), u.baseState = j, u.firstBaseUpdate = pe, u.lastBaseUpdate = je;
        var Ye = u.shared.interleaved;
        if (Ye !== null) {
          var Ke = Ye;
          do
            H = tt(H, Ke.lane), Ke = Ke.next;
          while (Ke !== Ye);
        } else s === null && (u.shared.lanes = I);
        Hp(H), e.lanes = H, e.memoizedState = A;
      }
      im = null;
    }
    function Fw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function aC() {
      am = !1;
    }
    function om() {
      return am;
    }
    function iC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Fw(f, a));
        }
    }
    var dp = {}, oo = ro(dp), pp = ro(dp), sm = ro(dp);
    function cm(e) {
      if (e === dp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function lC() {
      var e = cm(sm.current);
      return e;
    }
    function Ig(e, t) {
      Yr(sm, t, e), Yr(pp, e, e), Yr(oo, dp, e);
      var a = ex(t);
      $r(oo, e), Yr(oo, a, e);
    }
    function hf(e) {
      $r(oo, e), $r(pp, e), $r(sm, e);
    }
    function Qg() {
      var e = cm(oo.current);
      return e;
    }
    function uC(e) {
      cm(sm.current);
      var t = cm(oo.current), a = tx(t, e.type);
      t !== a && (Yr(pp, e, e), Yr(oo, a, e));
    }
    function Wg(e) {
      pp.current === e && ($r(oo, e), $r(pp, e));
    }
    var Hw = 0, oC = 1, sC = 1, vp = 2, Li = ro(Hw);
    function Gg(e, t) {
      return (e & t) !== 0;
    }
    function mf(e) {
      return e & oC;
    }
    function qg(e, t) {
      return e & oC | t;
    }
    function Vw(e, t) {
      return e | t;
    }
    function so(e, t) {
      Yr(Li, t, e);
    }
    function yf(e) {
      $r(Li, e);
    }
    function jw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function fm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === Ne) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || bE(i) || pg(i))
              return t;
          }
        } else if (t.tag === Et && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Qe) !== He;
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
    var La = (
      /*   */
      0
    ), tr = (
      /* */
      1
    ), ol = (
      /*  */
      2
    ), nr = (
      /*    */
      4
    ), Tr = (
      /*   */
      8
    ), Xg = [];
    function Kg() {
      for (var e = 0; e < Xg.length; e++) {
        var t = Xg[e];
        t._workInProgressVersionPrimary = null;
      }
      Xg.length = 0;
    }
    function Bw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var me = y.ReactCurrentDispatcher, hp = y.ReactCurrentBatchConfig, Zg, gf;
    Zg = /* @__PURE__ */ new Set();
    var xs = I, At = null, rr = null, ar = null, dm = !1, mp = !1, yp = 0, Pw = 0, $w = 25, $ = null, oi = null, co = -1, Jg = !1;
    function Lt() {
      {
        var e = $;
        oi === null ? oi = [e] : oi.push(e);
      }
    }
    function oe() {
      {
        var e = $;
        oi !== null && (co++, oi[co] !== e && Yw(e));
      }
    }
    function Sf(e) {
      e != null && !Bn(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", $, typeof e);
    }
    function Yw(e) {
      {
        var t = et(At);
        if (!Zg.has(t) && (Zg.add(t), oi !== null)) {
          for (var a = "", i = 30, u = 0; u <= co; u++) {
            for (var s = oi[u], f = u === co ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function Ir() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function eS(e, t) {
      if (Jg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", $), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, $, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Te(e[a], t[a]))
          return !1;
      return !0;
    }
    function Ef(e, t, a, i, u, s) {
      xs = s, At = t, oi = e !== null ? e._debugHookTypes : null, co = -1, Jg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = I, e !== null && e.memoizedState !== null ? me.current = LC : oi !== null ? me.current = OC : me.current = kC;
      var f = a(i, u);
      if (mp) {
        var p = 0;
        do {
          if (mp = !1, yp = 0, p >= $w)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Jg = !1, rr = null, ar = null, t.updateQueue = null, co = -1, me.current = MC, f = a(i, u);
        } while (mp);
      }
      me.current = wm, t._debugHookTypes = oi;
      var v = rr !== null && rr.next !== null;
      if (xs = I, At = null, rr = null, ar = null, $ = null, oi = null, co = -1, e !== null && (e.flags & Zn) !== (t.flags & Zn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & Le) !== _e && S("Internal React error: Expected static flag was missing. Please notify the React team."), dm = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function Cf() {
      var e = yp !== 0;
      return yp = 0, e;
    }
    function cC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & na) !== _e ? t.flags &= ~(Ml | zr | Xt | nt) : t.flags &= ~(Xt | nt), e.lanes = ts(e.lanes, a);
    }
    function fC() {
      if (me.current = wm, dm) {
        for (var e = At.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        dm = !1;
      }
      xs = I, At = null, rr = null, ar = null, oi = null, co = -1, $ = null, xC = !1, mp = !1, yp = 0;
    }
    function sl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return ar === null ? At.memoizedState = ar = e : ar = ar.next = e, ar;
    }
    function si() {
      var e;
      if (rr === null) {
        var t = At.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = rr.next;
      var a;
      if (ar === null ? a = At.memoizedState : a = ar.next, a !== null)
        ar = a, a = ar.next, rr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        rr = e;
        var i = {
          memoizedState: rr.memoizedState,
          baseState: rr.baseState,
          baseQueue: rr.baseQueue,
          queue: rr.queue,
          next: null
        };
        ar === null ? At.memoizedState = ar = i : ar = ar.next = i;
      }
      return ar;
    }
    function dC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function tS(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function nS(e, t, a) {
      var i = sl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: I,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Gw.bind(null, At, s);
      return [i.memoizedState, f];
    }
    function rS(e, t, a) {
      var i = si(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = rr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, g = p.next;
          f.next = g, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var E = f.next, _ = s.baseState, b = null, A = null, H = null, j = E;
        do {
          var pe = j.lane;
          if (Bl(xs, pe)) {
            if (H !== null) {
              var Me = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Tn,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              H = H.next = Me;
            }
            if (j.hasEagerState)
              _ = j.eagerState;
            else {
              var yt = j.action;
              _ = e(_, yt);
            }
          } else {
            var je = {
              lane: pe,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            H === null ? (A = H = je, b = _) : H = H.next = je, At.lanes = tt(At.lanes, pe), Hp(pe);
          }
          j = j.next;
        } while (j !== null && j !== E);
        H === null ? b = _ : H.next = A, Te(_, i.memoizedState) || bp(), i.memoizedState = _, i.baseState = b, i.baseQueue = H, u.lastRenderedState = _;
      }
      var ft = u.interleaved;
      if (ft !== null) {
        var M = ft;
        do {
          var B = M.lane;
          At.lanes = tt(At.lanes, B), Hp(B), M = M.next;
        } while (M !== ft);
      } else f === null && (u.lanes = I);
      var N = u.dispatch;
      return [i.memoizedState, N];
    }
    function aS(e, t, a) {
      var i = si(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, g = v;
        do {
          var E = g.action;
          p = e(p, E), g = g.next;
        } while (g !== v);
        Te(p, i.memoizedState) || bp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function Jk(e, t, a) {
    }
    function eO(e, t, a) {
    }
    function iS(e, t, a) {
      var i = At, u = sl(), s, f = Cr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), gf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), gf = !0);
      } else {
        if (s = t(), !gf) {
          var p = t();
          Te(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), gf = !0);
        }
        var v = Ym();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        es(v, xs) || pC(i, t, s);
      }
      u.memoizedState = s;
      var g = {
        value: s,
        getSnapshot: t
      };
      return u.queue = g, ym(hC.bind(null, i, g, e), [e]), i.flags |= Xt, gp(tr | Tr, vC.bind(null, i, g, s, t), void 0, null), s;
    }
    function pm(e, t, a) {
      var i = At, u = si(), s = t();
      if (!gf) {
        var f = t();
        Te(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), gf = !0);
      }
      var p = u.memoizedState, v = !Te(p, s);
      v && (u.memoizedState = s, bp());
      var g = u.queue;
      if (Ep(hC.bind(null, i, g, e), [e]), g.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      ar !== null && ar.memoizedState.tag & tr) {
        i.flags |= Xt, gp(tr | Tr, vC.bind(null, i, g, s, t), void 0, null);
        var E = Ym();
        if (E === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        es(E, xs) || pC(i, t, s);
      }
      return s;
    }
    function pC(e, t, a) {
      e.flags |= Yo;
      var i = {
        getSnapshot: t,
        value: a
      }, u = At.updateQueue;
      if (u === null)
        u = dC(), At.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function vC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, mC(t) && yC(e);
    }
    function hC(e, t, a) {
      var i = function() {
        mC(t) && yC(e);
      };
      return a(i);
    }
    function mC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Te(a, i);
      } catch {
        return !0;
      }
    }
    function yC(e) {
      var t = Oa(e, Ae);
      t !== null && or(t, e, Ae, $t);
    }
    function vm(e) {
      var t = sl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: I,
        dispatch: null,
        lastRenderedReducer: tS,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = qw.bind(null, At, a);
      return [t.memoizedState, i];
    }
    function lS(e) {
      return rS(tS);
    }
    function uS(e) {
      return aS(tS);
    }
    function gp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = At.updateQueue;
      if (s === null)
        s = dC(), At.updateQueue = s, s.lastEffect = u.next = u;
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
    function oS(e) {
      var t = sl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function hm(e) {
      var t = si();
      return t.memoizedState;
    }
    function Sp(e, t, a, i) {
      var u = sl(), s = i === void 0 ? null : i;
      At.flags |= e, u.memoizedState = gp(tr | t, a, void 0, s);
    }
    function mm(e, t, a, i) {
      var u = si(), s = i === void 0 ? null : i, f = void 0;
      if (rr !== null) {
        var p = rr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (eS(s, v)) {
            u.memoizedState = gp(t, a, f, s);
            return;
          }
        }
      }
      At.flags |= e, u.memoizedState = gp(tr | t, a, f, s);
    }
    function ym(e, t) {
      return (At.mode & na) !== _e ? Sp(Ml | Xt | Xi, Tr, e, t) : Sp(Xt | Xi, Tr, e, t);
    }
    function Ep(e, t) {
      return mm(Xt, Tr, e, t);
    }
    function sS(e, t) {
      return Sp(nt, ol, e, t);
    }
    function gm(e, t) {
      return mm(nt, ol, e, t);
    }
    function cS(e, t) {
      var a = nt;
      return a |= Ur, (At.mode & na) !== _e && (a |= zr), Sp(a, nr, e, t);
    }
    function Sm(e, t) {
      return mm(nt, nr, e, t);
    }
    function gC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function fS(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = nt;
      return u |= Ur, (At.mode & na) !== _e && (u |= zr), Sp(u, nr, gC.bind(null, t, e), i);
    }
    function Em(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return mm(nt, nr, gC.bind(null, t, e), i);
    }
    function Iw(e, t) {
    }
    var Cm = Iw;
    function dS(e, t) {
      var a = sl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function Tm(e, t) {
      var a = si(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (eS(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function pS(e, t) {
      var a = sl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function Rm(e, t) {
      var a = si(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (eS(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function vS(e) {
      var t = sl();
      return t.memoizedState = e, e;
    }
    function SC(e) {
      var t = si(), a = rr, i = a.memoizedState;
      return CC(t, i, e);
    }
    function EC(e) {
      var t = si();
      if (rr === null)
        return t.memoizedState = e, e;
      var a = rr.memoizedState;
      return CC(t, a, e);
    }
    function CC(e, t, a) {
      var i = !Jv(xs);
      if (i) {
        if (!Te(a, t)) {
          var u = nh();
          At.lanes = tt(At.lanes, u), Hp(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, bp()), e.memoizedState = a, a;
    }
    function Qw(e, t, a) {
      var i = xa();
      on(Uy(i, xi)), e(!0);
      var u = hp.transition;
      hp.transition = {};
      var s = hp.transition;
      hp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (on(i), hp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && k("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function hS() {
      var e = vm(!1), t = e[0], a = e[1], i = Qw.bind(null, a), u = sl();
      return u.memoizedState = i, [t, i];
    }
    function TC() {
      var e = lS(), t = e[0], a = si(), i = a.memoizedState;
      return [t, i];
    }
    function RC() {
      var e = uS(), t = e[0], a = si(), i = a.memoizedState;
      return [t, i];
    }
    var xC = !1;
    function Ww() {
      return xC;
    }
    function mS() {
      var e = sl(), t = Ym(), a = t.identifierPrefix, i;
      if (Cr()) {
        var u = cw();
        i = ":" + a + "R" + u;
        var s = yp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Pw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function xm() {
      var e = si(), t = e.memoizedState;
      return t;
    }
    function Gw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = mo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wC(e))
        bC(t, u);
      else {
        var s = eC(e, t, u, i);
        if (s !== null) {
          var f = la();
          or(s, e, i, f), DC(s, t, i);
        }
      }
      _C(e, i);
    }
    function qw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = mo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (wC(e))
        bC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === I && (s === null || s.lanes === I)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = me.current, me.current = Mi;
            try {
              var v = t.lastRenderedState, g = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = g, Te(g, v)) {
                Nw(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              me.current = p;
            }
          }
        }
        var E = eC(e, t, u, i);
        if (E !== null) {
          var _ = la();
          or(E, e, i, _), DC(E, t, i);
        }
      }
      _C(e, i);
    }
    function wC(e) {
      var t = e.alternate;
      return e === At || t !== null && t === At;
    }
    function bC(e, t) {
      mp = dm = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function DC(e, t, a) {
      if (bd(a)) {
        var i = t.lanes;
        i = Oc(i, e.pendingLanes);
        var u = tt(i, a);
        t.lanes = u, Dd(e, u);
      }
    }
    function _C(e, t, a) {
      Go(e, t);
    }
    var wm = {
      readContext: Wn,
      useCallback: Ir,
      useContext: Ir,
      useEffect: Ir,
      useImperativeHandle: Ir,
      useInsertionEffect: Ir,
      useLayoutEffect: Ir,
      useMemo: Ir,
      useReducer: Ir,
      useRef: Ir,
      useState: Ir,
      useDebugValue: Ir,
      useDeferredValue: Ir,
      useTransition: Ir,
      useMutableSource: Ir,
      useSyncExternalStore: Ir,
      useId: Ir,
      unstable_isNewReconciler: ee
    }, kC = null, OC = null, LC = null, MC = null, cl = null, Mi = null, bm = null;
    {
      var yS = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, qe = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      kC = {
        readContext: function(e) {
          return Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", Lt(), Sf(t), dS(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", Lt(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", Lt(), Sf(t), ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", Lt(), Sf(a), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", Lt(), Sf(t), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", Lt(), Sf(t), cS(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", Lt(), Sf(t);
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", Lt();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", Lt(), oS(e);
        },
        useState: function(e) {
          $ = "useState", Lt();
          var t = me.current;
          me.current = cl;
          try {
            return vm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", Lt(), void 0;
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", Lt(), vS(e);
        },
        useTransition: function() {
          return $ = "useTransition", Lt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", Lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", Lt(), iS(e, t, a);
        },
        useId: function() {
          return $ = "useId", Lt(), mS();
        },
        unstable_isNewReconciler: ee
      }, OC = {
        readContext: function(e) {
          return Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", oe(), dS(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", oe(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", oe(), ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", oe(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", oe(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", oe(), cS(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", oe();
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", oe();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", oe(), oS(e);
        },
        useState: function(e) {
          $ = "useState", oe();
          var t = me.current;
          me.current = cl;
          try {
            return vm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", oe(), void 0;
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", oe(), vS(e);
        },
        useTransition: function() {
          return $ = "useTransition", oe(), hS();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", oe(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", oe(), iS(e, t, a);
        },
        useId: function() {
          return $ = "useId", oe(), mS();
        },
        unstable_isNewReconciler: ee
      }, LC = {
        readContext: function(e) {
          return Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", oe(), Tm(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", oe(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", oe(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", oe(), Em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", oe(), gm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", oe(), Sm(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", oe();
          var a = me.current;
          me.current = Mi;
          try {
            return Rm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", oe();
          var i = me.current;
          me.current = Mi;
          try {
            return rS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", oe(), hm();
        },
        useState: function(e) {
          $ = "useState", oe();
          var t = me.current;
          me.current = Mi;
          try {
            return lS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", oe(), Cm();
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", oe(), SC(e);
        },
        useTransition: function() {
          return $ = "useTransition", oe(), TC();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", oe(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", oe(), pm(e, t);
        },
        useId: function() {
          return $ = "useId", oe(), xm();
        },
        unstable_isNewReconciler: ee
      }, MC = {
        readContext: function(e) {
          return Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", oe(), Tm(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", oe(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", oe(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", oe(), Em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", oe(), gm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", oe(), Sm(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", oe();
          var a = me.current;
          me.current = bm;
          try {
            return Rm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", oe();
          var i = me.current;
          me.current = bm;
          try {
            return aS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", oe(), hm();
        },
        useState: function(e) {
          $ = "useState", oe();
          var t = me.current;
          me.current = bm;
          try {
            return uS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", oe(), Cm();
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", oe(), EC(e);
        },
        useTransition: function() {
          return $ = "useTransition", oe(), RC();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", oe(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", oe(), pm(e, t);
        },
        useId: function() {
          return $ = "useId", oe(), xm();
        },
        unstable_isNewReconciler: ee
      }, cl = {
        readContext: function(e) {
          return yS(), Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", qe(), Lt(), dS(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", qe(), Lt(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", qe(), Lt(), ym(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", qe(), Lt(), fS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", qe(), Lt(), sS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", qe(), Lt(), cS(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", qe(), Lt();
          var a = me.current;
          me.current = cl;
          try {
            return pS(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", qe(), Lt();
          var i = me.current;
          me.current = cl;
          try {
            return nS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", qe(), Lt(), oS(e);
        },
        useState: function(e) {
          $ = "useState", qe(), Lt();
          var t = me.current;
          me.current = cl;
          try {
            return vm(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", qe(), Lt(), void 0;
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", qe(), Lt(), vS(e);
        },
        useTransition: function() {
          return $ = "useTransition", qe(), Lt(), hS();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", qe(), Lt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", qe(), Lt(), iS(e, t, a);
        },
        useId: function() {
          return $ = "useId", qe(), Lt(), mS();
        },
        unstable_isNewReconciler: ee
      }, Mi = {
        readContext: function(e) {
          return yS(), Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", qe(), oe(), Tm(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", qe(), oe(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", qe(), oe(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", qe(), oe(), Em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", qe(), oe(), gm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", qe(), oe(), Sm(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", qe(), oe();
          var a = me.current;
          me.current = Mi;
          try {
            return Rm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", qe(), oe();
          var i = me.current;
          me.current = Mi;
          try {
            return rS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", qe(), oe(), hm();
        },
        useState: function(e) {
          $ = "useState", qe(), oe();
          var t = me.current;
          me.current = Mi;
          try {
            return lS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", qe(), oe(), Cm();
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", qe(), oe(), SC(e);
        },
        useTransition: function() {
          return $ = "useTransition", qe(), oe(), TC();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", qe(), oe(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", qe(), oe(), pm(e, t);
        },
        useId: function() {
          return $ = "useId", qe(), oe(), xm();
        },
        unstable_isNewReconciler: ee
      }, bm = {
        readContext: function(e) {
          return yS(), Wn(e);
        },
        useCallback: function(e, t) {
          return $ = "useCallback", qe(), oe(), Tm(e, t);
        },
        useContext: function(e) {
          return $ = "useContext", qe(), oe(), Wn(e);
        },
        useEffect: function(e, t) {
          return $ = "useEffect", qe(), oe(), Ep(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return $ = "useImperativeHandle", qe(), oe(), Em(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return $ = "useInsertionEffect", qe(), oe(), gm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return $ = "useLayoutEffect", qe(), oe(), Sm(e, t);
        },
        useMemo: function(e, t) {
          $ = "useMemo", qe(), oe();
          var a = me.current;
          me.current = Mi;
          try {
            return Rm(e, t);
          } finally {
            me.current = a;
          }
        },
        useReducer: function(e, t, a) {
          $ = "useReducer", qe(), oe();
          var i = me.current;
          me.current = Mi;
          try {
            return aS(e, t, a);
          } finally {
            me.current = i;
          }
        },
        useRef: function(e) {
          return $ = "useRef", qe(), oe(), hm();
        },
        useState: function(e) {
          $ = "useState", qe(), oe();
          var t = me.current;
          me.current = Mi;
          try {
            return uS(e);
          } finally {
            me.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return $ = "useDebugValue", qe(), oe(), Cm();
        },
        useDeferredValue: function(e) {
          return $ = "useDeferredValue", qe(), oe(), EC(e);
        },
        useTransition: function() {
          return $ = "useTransition", qe(), oe(), RC();
        },
        useMutableSource: function(e, t, a) {
          return $ = "useMutableSource", qe(), oe(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return $ = "useSyncExternalStore", qe(), oe(), pm(e, t);
        },
        useId: function() {
          return $ = "useId", qe(), oe(), xm();
        },
        unstable_isNewReconciler: ee
      };
    }
    var fo = C.unstable_now, NC = 0, Dm = -1, Cp = -1, _m = -1, gS = !1, km = !1;
    function UC() {
      return gS;
    }
    function Xw() {
      km = !0;
    }
    function Kw() {
      gS = !1, km = !1;
    }
    function Zw() {
      gS = km, km = !1;
    }
    function zC() {
      return NC;
    }
    function AC() {
      NC = fo();
    }
    function SS(e) {
      Cp = fo(), e.actualStartTime < 0 && (e.actualStartTime = fo());
    }
    function FC(e) {
      Cp = -1;
    }
    function Om(e, t) {
      if (Cp >= 0) {
        var a = fo() - Cp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Cp = -1;
      }
    }
    function fl(e) {
      if (Dm >= 0) {
        var t = fo() - Dm;
        Dm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case Y:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case ot:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function ES(e) {
      if (_m >= 0) {
        var t = fo() - _m;
        _m = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case Y:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case ot:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function dl() {
      Dm = fo();
    }
    function CS() {
      _m = fo();
    }
    function TS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function Ni(e, t) {
      if (e && e.defaultProps) {
        var a = lt({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var RS = {}, xS, wS, bS, DS, _S, HC, Lm, kS, OS, LS, Tp;
    {
      xS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), DS = /* @__PURE__ */ new Set(), kS = /* @__PURE__ */ new Set(), _S = /* @__PURE__ */ new Set(), OS = /* @__PURE__ */ new Set(), LS = /* @__PURE__ */ new Set(), Tp = /* @__PURE__ */ new Set();
      var VC = /* @__PURE__ */ new Set();
      Lm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          VC.has(a) || (VC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, HC = function(e, t) {
        if (t === void 0) {
          var a = Nt(e) || "Component";
          _S.has(a) || (_S.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(RS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(RS);
    }
    function MS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & ut) {
          Cn(!0);
          try {
            s = a(i, u);
          } finally {
            Cn(!1);
          }
        }
        HC(t, s);
      }
      var f = s == null ? u : lt({}, u, s);
      if (e.memoizedState = f, e.lanes === I) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var NS = {
      isMounted: ea,
      enqueueSetState: function(e, t, a) {
        var i = ma(e), u = la(), s = mo(i), f = eu(u, s);
        f.payload = t, a != null && (Lm(a, "setState"), f.callback = a);
        var p = uo(i, f, s);
        p !== null && (or(p, i, s, u), lm(p, i, s)), Go(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = ma(e), u = la(), s = mo(i), f = eu(u, s);
        f.tag = nC, f.payload = t, a != null && (Lm(a, "replaceState"), f.callback = a);
        var p = uo(i, f, s);
        p !== null && (or(p, i, s, u), lm(p, i, s)), Go(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = ma(e), i = la(), u = mo(a), s = eu(i, u);
        s.tag = rm, t != null && (Lm(t, "forceUpdate"), s.callback = t);
        var f = uo(a, s, u);
        f !== null && (or(f, a, u, i), lm(f, a, u)), pc(a, u);
      }
    };
    function jC(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & ut) {
            Cn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              Cn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Nt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Pe(a, i) || !Pe(u, s) : !0;
    }
    function Jw(e, t, a) {
      var i = e.stateNode;
      {
        var u = Nt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Tp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & ut) === _e && (Tp.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Tp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & ut) === _e && (Tp.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !OS.has(t) && (OS.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Nt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !bS.has(t) && (bS.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Nt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || Bn(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function BC(e, t) {
      t.updater = NS, e.stateNode = t, xu(t, e), t._reactInternalInstance = RS;
    }
    function PC(e, t, a) {
      var i = !1, u = Ia, s = Ia, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === G && f._context === void 0
        );
        if (!p && !LS.has(t)) {
          LS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === R ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Nt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = Wn(f);
      else {
        u = uf(e, t, !0);
        var g = t.contextTypes;
        i = g != null, s = i ? of(e, u) : Ia;
      }
      var E = new t(a, s);
      if (e.mode & ut) {
        Cn(!0);
        try {
          E = new t(a, s);
        } finally {
          Cn(!1);
        }
      }
      var _ = e.memoizedState = E.state !== null && E.state !== void 0 ? E.state : null;
      BC(e, E);
      {
        if (typeof t.getDerivedStateFromProps == "function" && _ === null) {
          var b = Nt(t) || "Component";
          wS.has(b) || (wS.add(b), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", b, E.state === null ? "null" : "undefined", b));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof E.getSnapshotBeforeUpdate == "function") {
          var A = null, H = null, j = null;
          if (typeof E.componentWillMount == "function" && E.componentWillMount.__suppressDeprecationWarning !== !0 ? A = "componentWillMount" : typeof E.UNSAFE_componentWillMount == "function" && (A = "UNSAFE_componentWillMount"), typeof E.componentWillReceiveProps == "function" && E.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? H = "componentWillReceiveProps" : typeof E.UNSAFE_componentWillReceiveProps == "function" && (H = "UNSAFE_componentWillReceiveProps"), typeof E.componentWillUpdate == "function" && E.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof E.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), A !== null || H !== null || j !== null) {
            var pe = Nt(t) || "Component", je = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            DS.has(pe) || (DS.add(pe), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, pe, je, A !== null ? `
  ` + A : "", H !== null ? `
  ` + H : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && LE(e, u, s), E;
    }
    function eb(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", et(e) || "Component"), NS.enqueueReplaceState(t, t.state, null));
    }
    function $C(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = et(e) || "Component";
          xS.has(s) || (xS.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        NS.enqueueReplaceState(t, t.state, null);
      }
    }
    function US(e, t, a, i) {
      Jw(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, $g(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = Wn(s);
      else {
        var f = uf(e, t, !0);
        u.context = of(e, f);
      }
      {
        if (u.state === a) {
          var p = Nt(t) || "Component";
          kS.has(p) || (kS.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & ut && Oi.recordLegacyContextWarning(e, u), Oi.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (MS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (eb(e, u), um(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var g = nt;
        g |= Ur, (e.mode & na) !== _e && (g |= zr), e.flags |= g;
      }
    }
    function tb(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = Ia;
      if (typeof p == "object" && p !== null)
        v = Wn(p);
      else {
        var g = uf(e, t, !0);
        v = of(e, g);
      }
      var E = t.getDerivedStateFromProps, _ = typeof E == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !_ && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && $C(e, u, a, v), aC();
      var b = e.memoizedState, A = u.state = b;
      if (um(e, a, u, i), A = e.memoizedState, s === a && b === A && !Ph() && !om()) {
        if (typeof u.componentDidMount == "function") {
          var H = nt;
          H |= Ur, (e.mode & na) !== _e && (H |= zr), e.flags |= H;
        }
        return !1;
      }
      typeof E == "function" && (MS(e, t, E, a), A = e.memoizedState);
      var j = om() || jC(e, t, s, a, b, A, v);
      if (j) {
        if (!_ && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var pe = nt;
          pe |= Ur, (e.mode & na) !== _e && (pe |= zr), e.flags |= pe;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var je = nt;
          je |= Ur, (e.mode & na) !== _e && (je |= zr), e.flags |= je;
        }
        e.memoizedProps = a, e.memoizedState = A;
      }
      return u.props = a, u.state = A, u.context = v, j;
    }
    function nb(e, t, a, i, u) {
      var s = t.stateNode;
      rC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : Ni(t.type, f);
      s.props = p;
      var v = t.pendingProps, g = s.context, E = a.contextType, _ = Ia;
      if (typeof E == "object" && E !== null)
        _ = Wn(E);
      else {
        var b = uf(t, a, !0);
        _ = of(t, b);
      }
      var A = a.getDerivedStateFromProps, H = typeof A == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !H && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || g !== _) && $C(t, s, i, _), aC();
      var j = t.memoizedState, pe = s.state = j;
      if (um(t, i, s, u), pe = t.memoizedState, f === v && j === pe && !Ph() && !om() && !Oe)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= ya), !1;
      typeof A == "function" && (MS(t, a, A, i), pe = t.memoizedState);
      var je = om() || jC(t, a, p, i, j, pe, _) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Oe;
      return je ? (!H && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, pe, _), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, pe, _)), typeof s.componentDidUpdate == "function" && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= ya)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= nt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= ya), t.memoizedProps = i, t.memoizedState = pe), s.props = i, s.state = pe, s.context = _, je;
    }
    function ws(e, t) {
      return {
        value: e,
        source: t,
        stack: Ff(t),
        digest: null
      };
    }
    function zS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function rb(e, t) {
      return !0;
    }
    function AS(e, t) {
      try {
        var a = rb(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === se)
            return;
          console.error(i);
        }
        var p = u ? et(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", g;
        if (e.tag === Y)
          g = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var E = et(e) || "Anonymous";
          g = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + E + ".");
        }
        var _ = v + `
` + f + `

` + ("" + g);
        console.error(_);
      } catch (b) {
        setTimeout(function() {
          throw b;
        });
      }
    }
    var ab = typeof WeakMap == "function" ? WeakMap : Map;
    function YC(e, t, a) {
      var i = eu($t, a);
      i.tag = Bg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        XD(u), AS(e, t);
      }, i;
    }
    function FS(e, t, a) {
      var i = eu($t, a);
      i.tag = Bg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          tT(e), AS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        tT(e), AS(e, t), typeof u != "function" && GD(this);
        var v = t.value, g = t.stack;
        this.componentDidCatch(v, {
          componentStack: g !== null ? g : ""
        }), typeof u != "function" && (Br(e.lanes, Ae) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", et(e) || "Unknown"));
      }), i;
    }
    function IC(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new ab(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = KD.bind(null, e, t, a);
        ta && Vp(e, a), t.then(s, s);
      }
    }
    function ib(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function lb(e, t) {
      var a = e.tag;
      if ((e.mode & Le) === _e && (a === ne || a === Ie || a === Xe)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function QC(e) {
      var t = e;
      do {
        if (t.tag === Ne && jw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function WC(e, t, a, i, u) {
      if ((e.mode & Le) === _e) {
        if (e === t)
          e.flags |= $n;
        else {
          if (e.flags |= Qe, a.flags |= Io, a.flags &= ~(tc | Zr), a.tag === se) {
            var s = a.alternate;
            if (s === null)
              a.tag = Jt;
            else {
              var f = eu($t, Ae);
              f.tag = rm, uo(a, f, Ae);
            }
          }
          a.lanes = tt(a.lanes, Ae);
        }
        return e;
      }
      return e.flags |= $n, e.lanes = u, e;
    }
    function ub(e, t, a, i, u) {
      if (a.flags |= Zr, ta && Vp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        lb(a), Cr() && a.mode & Le && HE();
        var f = QC(t);
        if (f !== null) {
          f.flags &= ~un, WC(f, t, a, e, u), f.mode & Le && IC(e, s, u), ib(f, e, s);
          return;
        } else {
          if (!wd(u)) {
            IC(e, s, u), m0();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Cr() && a.mode & Le) {
        HE();
        var v = QC(t);
        if (v !== null) {
          (v.flags & $n) === He && (v.flags |= un), WC(v, t, a, e, u), kg(ws(i, a));
          return;
        }
      }
      i = ws(i, a), jD(i);
      var g = t;
      do {
        switch (g.tag) {
          case Y: {
            var E = i;
            g.flags |= $n;
            var _ = Hu(u);
            g.lanes = tt(g.lanes, _);
            var b = YC(g, E, _);
            Yg(g, b);
            return;
          }
          case se:
            var A = i, H = g.type, j = g.stateNode;
            if ((g.flags & Qe) === He && (typeof H.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !Q1(j))) {
              g.flags |= $n;
              var pe = Hu(u);
              g.lanes = tt(g.lanes, pe);
              var je = FS(g, A, pe);
              Yg(g, je);
              return;
            }
            break;
        }
        g = g.return;
      } while (g !== null);
    }
    function ob() {
      return null;
    }
    var Rp = y.ReactCurrentOwner, Ui = !1, HS, xp, VS, jS, BS, bs, PS, Mm, wp;
    HS = {}, xp = {}, VS = {}, jS = {}, BS = {}, bs = !1, PS = {}, Mm = {}, wp = {};
    function aa(e, t, a, i) {
      e === null ? t.child = XE(t, null, a, i) : t.child = df(t, e.child, a, i);
    }
    function sb(e, t, a, i) {
      t.child = df(t, e.child, null, i), t.child = df(t, null, a, i);
    }
    function GC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && _i(
          s,
          i,
          // Resolved props
          "prop",
          Nt(a)
        );
      }
      var f = a.render, p = t.ref, v, g;
      vf(t, u), _u(t);
      {
        if (Rp.current = t, ja(!0), v = Ef(e, t, f, i, p, u), g = Cf(), t.mode & ut) {
          Cn(!0);
          try {
            v = Ef(e, t, f, i, p, u), g = Cf();
          } finally {
            Cn(!1);
          }
        }
        ja(!1);
      }
      return Hr(), e !== null && !Ui ? (cC(e, t, u), tu(e, t, u)) : (Cr() && g && Rg(t), t.flags |= Gi, aa(e, t, v, u), t.child);
    }
    function qC(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (v_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = kf(s), t.tag = Xe, t.type = f, IS(t, s), XC(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && _i(
            p,
            i,
            // Resolved props
            "prop",
            Nt(s)
          ), a.defaultProps !== void 0) {
            var v = Nt(s) || "Unknown";
            wp[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), wp[v] = !0);
          }
        }
        var g = D0(a.type, null, i, t, t.mode, u);
        return g.ref = t.ref, g.return = t, t.child = g, g;
      }
      {
        var E = a.type, _ = E.propTypes;
        _ && _i(
          _,
          i,
          // Resolved props
          "prop",
          Nt(E)
        );
      }
      var b = e.child, A = KS(e, u);
      if (!A) {
        var H = b.memoizedProps, j = a.compare;
        if (j = j !== null ? j : Pe, j(H, i) && e.ref === t.ref)
          return tu(e, t, u);
      }
      t.flags |= Gi;
      var pe = Ls(b, i);
      return pe.ref = t.ref, pe.return = t, t.child = pe, pe;
    }
    function XC(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === $e) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var g = s && s.propTypes;
          g && _i(
            g,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Nt(s)
          );
        }
      }
      if (e !== null) {
        var E = e.memoizedProps;
        if (Pe(E, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (Ui = !1, t.pendingProps = i = E, KS(e, u))
            (e.flags & Io) !== He && (Ui = !0);
          else return t.lanes = e.lanes, tu(e, t, u);
      }
      return $S(e, t, a, i, u);
    }
    function KC(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || de)
        if ((t.mode & Le) === _e) {
          var f = {
            baseLanes: I,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Im(t, a);
        } else if (Br(a, vr)) {
          var _ = {
            baseLanes: I,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = _;
          var b = s !== null ? s.baseLanes : a;
          Im(t, b);
        } else {
          var p = null, v;
          if (s !== null) {
            var g = s.baseLanes;
            v = tt(g, a);
          } else
            v = a;
          t.lanes = t.childLanes = vr;
          var E = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = E, t.updateQueue = null, Im(t, v), null;
        }
      else {
        var A;
        s !== null ? (A = tt(s.baseLanes, a), t.memoizedState = null) : A = a, Im(t, A);
      }
      return aa(e, t, u, a), t.child;
    }
    function cb(e, t, a) {
      var i = t.pendingProps;
      return aa(e, t, i, a), t.child;
    }
    function fb(e, t, a) {
      var i = t.pendingProps.children;
      return aa(e, t, i, a), t.child;
    }
    function db(e, t, a) {
      {
        t.flags |= nt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return aa(e, t, s, a), t.child;
    }
    function ZC(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Nr, t.flags |= dd);
    }
    function $S(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && _i(
          s,
          i,
          // Resolved props
          "prop",
          Nt(a)
        );
      }
      var f;
      {
        var p = uf(t, a, !0);
        f = of(t, p);
      }
      var v, g;
      vf(t, u), _u(t);
      {
        if (Rp.current = t, ja(!0), v = Ef(e, t, a, i, f, u), g = Cf(), t.mode & ut) {
          Cn(!0);
          try {
            v = Ef(e, t, a, i, f, u), g = Cf();
          } finally {
            Cn(!1);
          }
        }
        ja(!1);
      }
      return Hr(), e !== null && !Ui ? (cC(e, t, u), tu(e, t, u)) : (Cr() && g && Rg(t), t.flags |= Gi, aa(e, t, v, u), t.child);
    }
    function JC(e, t, a, i, u) {
      {
        switch (k_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Qe, t.flags |= $n;
            var g = new Error("Simulated error coming from DevTools"), E = Hu(u);
            t.lanes = tt(t.lanes, E);
            var _ = FS(t, ws(g, t), E);
            Yg(t, _);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var b = a.propTypes;
          b && _i(
            b,
            i,
            // Resolved props
            "prop",
            Nt(a)
          );
        }
      }
      var A;
      ul(a) ? (A = !0, Yh(t)) : A = !1, vf(t, u);
      var H = t.stateNode, j;
      H === null ? (Um(e, t), PC(t, a, i), US(t, a, i, u), j = !0) : e === null ? j = tb(t, a, i, u) : j = nb(e, t, a, i, u);
      var pe = YS(e, t, a, j, A, u);
      {
        var je = t.stateNode;
        j && je.props !== i && (bs || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", et(t) || "a component"), bs = !0);
      }
      return pe;
    }
    function YS(e, t, a, i, u, s) {
      ZC(e, t);
      var f = (t.flags & Qe) !== He;
      if (!i && !f)
        return u && UE(t, a, !1), tu(e, t, s);
      var p = t.stateNode;
      Rp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, FC();
      else {
        _u(t);
        {
          if (ja(!0), v = p.render(), t.mode & ut) {
            Cn(!0);
            try {
              p.render();
            } finally {
              Cn(!1);
            }
          }
          ja(!1);
        }
        Hr();
      }
      return t.flags |= Gi, e !== null && f ? sb(e, t, v, s) : aa(e, t, v, s), t.memoizedState = p.state, u && UE(t, a, !0), t.child;
    }
    function e1(e) {
      var t = e.stateNode;
      t.pendingContext ? ME(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ME(e, t.context, !1), Ig(e, t.containerInfo);
    }
    function pb(e, t, a) {
      if (e1(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      rC(e, t), um(t, i, null, a);
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
        }, g = t.updateQueue;
        if (g.baseState = v, t.memoizedState = v, t.flags & un) {
          var E = ws(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return t1(e, t, p, a, E);
        } else if (p !== s) {
          var _ = ws(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return t1(e, t, p, a, _);
        } else {
          mw(t);
          var b = XE(t, null, p, a);
          t.child = b;
          for (var A = b; A; )
            A.flags = A.flags & ~Qt | ga, A = A.sibling;
        }
      } else {
        if (ff(), p === s)
          return tu(e, t, a);
        aa(e, t, p, a);
      }
      return t.child;
    }
    function t1(e, t, a, i, u) {
      return ff(), kg(u), t.flags |= un, aa(e, t, a, i), t.child;
    }
    function vb(e, t, a) {
      uC(t), e === null && _g(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = sg(i, u);
      return p ? f = null : s !== null && sg(i, s) && (t.flags |= Ot), ZC(e, t), aa(e, t, f, a), t.child;
    }
    function hb(e, t) {
      return e === null && _g(t), null;
    }
    function mb(e, t, a, i) {
      Um(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var g = t.tag = h_(v), E = Ni(v, u), _;
      switch (g) {
        case ne:
          return IS(t, v), t.type = v = kf(v), _ = $S(null, t, v, E, i), _;
        case se:
          return t.type = v = C0(v), _ = JC(null, t, v, E, i), _;
        case Ie:
          return t.type = v = T0(v), _ = GC(null, t, v, E, i), _;
        case Ct: {
          if (t.type !== t.elementType) {
            var b = v.propTypes;
            b && _i(
              b,
              E,
              // Resolved for outer only
              "prop",
              Nt(v)
            );
          }
          return _ = qC(
            null,
            t,
            v,
            Ni(v.type, E),
            // The inner type can have defaults too
            i
          ), _;
        }
      }
      var A = "";
      throw v !== null && typeof v == "object" && v.$$typeof === $e && (A = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + A));
    }
    function yb(e, t, a, i, u) {
      Um(e, t), t.tag = se;
      var s;
      return ul(a) ? (s = !0, Yh(t)) : s = !1, vf(t, u), PC(t, a, i), US(t, a, i, u), YS(null, t, a, !0, s, u);
    }
    function gb(e, t, a, i) {
      Um(e, t);
      var u = t.pendingProps, s;
      {
        var f = uf(t, a, !1);
        s = of(t, f);
      }
      vf(t, i);
      var p, v;
      _u(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var g = Nt(a) || "Unknown";
          HS[g] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", g, g), HS[g] = !0);
        }
        t.mode & ut && Oi.recordLegacyContextWarning(t, null), ja(!0), Rp.current = t, p = Ef(null, t, a, u, s, i), v = Cf(), ja(!1);
      }
      if (Hr(), t.flags |= Gi, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var E = Nt(a) || "Unknown";
        xp[E] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", E, E, E), xp[E] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var _ = Nt(a) || "Unknown";
          xp[_] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", _, _, _), xp[_] = !0);
        }
        t.tag = se, t.memoizedState = null, t.updateQueue = null;
        var b = !1;
        return ul(a) ? (b = !0, Yh(t)) : b = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, $g(t), BC(t, p), US(t, a, u, i), YS(null, t, a, !0, b, i);
      } else {
        if (t.tag = ne, t.mode & ut) {
          Cn(!0);
          try {
            p = Ef(null, t, a, u, s, i), v = Cf();
          } finally {
            Cn(!1);
          }
        }
        return Cr() && v && Rg(t), aa(null, t, p, i), IS(t, a), t.child;
      }
    }
    function IS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = va();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), BS[u] || (BS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Nt(t) || "Unknown";
          wp[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), wp[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Nt(t) || "Unknown";
          jS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), jS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Nt(t) || "Unknown";
          VS[v] || (S("%s: Function components do not support contextType.", v), VS[v] = !0);
        }
      }
    }
    var QS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Tn
    };
    function WS(e) {
      return {
        baseLanes: e,
        cachePool: ob(),
        transitions: null
      };
    }
    function Sb(e, t) {
      var a = null;
      return {
        baseLanes: tt(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function Eb(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Gg(e, vp);
    }
    function Cb(e, t) {
      return ts(e.childLanes, t);
    }
    function n1(e, t, a) {
      var i = t.pendingProps;
      O_(t) && (t.flags |= Qe);
      var u = Li.current, s = !1, f = (t.flags & Qe) !== He;
      if (f || Eb(u, e) ? (s = !0, t.flags &= ~Qe) : (e === null || e.memoizedState !== null) && (u = Vw(u, sC)), u = mf(u), so(t, u), e === null) {
        _g(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return bb(t, v);
        }
        var g = i.children, E = i.fallback;
        if (s) {
          var _ = Tb(t, g, E, a), b = t.child;
          return b.memoizedState = WS(a), t.memoizedState = QS, _;
        } else
          return GS(t, g);
      } else {
        var A = e.memoizedState;
        if (A !== null) {
          var H = A.dehydrated;
          if (H !== null)
            return Db(e, t, f, i, H, A, a);
        }
        if (s) {
          var j = i.fallback, pe = i.children, je = xb(e, t, pe, j, a), Me = t.child, yt = e.child.memoizedState;
          return Me.memoizedState = yt === null ? WS(a) : Sb(yt, a), Me.childLanes = Cb(e, a), t.memoizedState = QS, je;
        } else {
          var ft = i.children, M = Rb(e, t, ft, a);
          return t.memoizedState = null, M;
        }
      }
    }
    function GS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = qS(u, i);
      return s.return = e, e.child = s, s;
    }
    function Tb(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & Le) === _e && s !== null ? (p = s, p.childLanes = I, p.pendingProps = f, e.mode & We && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = go(a, u, i, null)) : (p = qS(f, u), v = go(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function qS(e, t, a) {
      return rT(e, t, I, null);
    }
    function r1(e, t) {
      return Ls(e, t);
    }
    function Rb(e, t, a, i) {
      var u = e.child, s = u.sibling, f = r1(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & Le) === _e && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= Dt) : p.push(s);
      }
      return t.child = f, f;
    }
    function xb(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, g;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & Le) === _e && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var E = t.child;
        g = E, g.childLanes = I, g.pendingProps = v, t.mode & We && (g.actualDuration = 0, g.actualStartTime = -1, g.selfBaseDuration = f.selfBaseDuration, g.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        g = r1(f, v), g.subtreeFlags = f.subtreeFlags & Zn;
      var _;
      return p !== null ? _ = Ls(p, i) : (_ = go(i, s, u, null), _.flags |= Qt), _.return = t, g.return = t, g.sibling = _, t.child = g, _;
    }
    function Nm(e, t, a, i) {
      i !== null && kg(i), df(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = GS(t, s);
      return f.flags |= Qt, t.memoizedState = null, f;
    }
    function wb(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = qS(f, s), v = go(i, s, u, null);
      return v.flags |= Qt, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & Le) !== _e && df(t, e.child, null, u), v;
    }
    function bb(e, t, a) {
      return (e.mode & Le) === _e ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : pg(t) ? e.lanes = Ri : e.lanes = vr, null;
    }
    function Db(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & un) {
          t.flags &= ~un;
          var M = zS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Nm(e, t, f, M);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Qe, null;
          var B = i.children, N = i.fallback, K = wb(e, t, B, N, f), ye = t.child;
          return ye.memoizedState = WS(f), t.memoizedState = QS, K;
        }
      else {
        if (vw(), (t.mode & Le) === _e)
          return Nm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (pg(u)) {
          var p, v, g;
          {
            var E = Lx(u);
            p = E.digest, v = E.message, g = E.stack;
          }
          var _;
          v ? _ = new Error(v) : _ = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var b = zS(_, p, g);
          return Nm(e, t, f, b);
        }
        var A = Br(f, e.childLanes);
        if (Ui || A) {
          var H = Ym();
          if (H !== null) {
            var j = ih(H, f);
            if (j !== Tn && j !== s.retryLane) {
              s.retryLane = j;
              var pe = $t;
              Oa(e, j), or(H, e, j, pe);
            }
          }
          m0();
          var je = zS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Nm(e, t, f, je);
        } else if (bE(u)) {
          t.flags |= Qe, t.child = e.child;
          var Me = ZD.bind(null, e);
          return Mx(u, Me), null;
        } else {
          yw(t, u, s.treeContext);
          var yt = i.children, ft = GS(t, yt);
          return ft.flags |= ga, ft;
        }
      }
    }
    function a1(e, t, a) {
      e.lanes = tt(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = tt(i.lanes, t)), Vg(e.return, t, a);
    }
    function _b(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === Ne) {
          var u = i.memoizedState;
          u !== null && a1(i, a, e);
        } else if (i.tag === Et)
          a1(i, a, e);
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
    function kb(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && fm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function Ob(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !PS[e])
        if (PS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function Lb(e, t) {
      e !== void 0 && !Mm[e] && (e !== "collapsed" && e !== "hidden" ? (Mm[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Mm[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function i1(e, t) {
      {
        var a = Bn(e), i = !a && typeof Xr(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function Mb(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (Bn(e)) {
          for (var a = 0; a < e.length; a++)
            if (!i1(e[a], a))
              return;
        } else {
          var i = Xr(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!i1(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function XS(e, t, a, i, u) {
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
    function l1(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      Ob(u), Lb(s, u), Mb(f, u), aa(e, t, f, a);
      var p = Li.current, v = Gg(p, vp);
      if (v)
        p = qg(p, vp), t.flags |= Qe;
      else {
        var g = e !== null && (e.flags & Qe) !== He;
        g && _b(t, t.child, a), p = mf(p);
      }
      if (so(t, p), (t.mode & Le) === _e)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var E = kb(t.child), _;
            E === null ? (_ = t.child, t.child = null) : (_ = E.sibling, E.sibling = null), XS(
              t,
              !1,
              // isBackwards
              _,
              E,
              s
            );
            break;
          }
          case "backwards": {
            var b = null, A = t.child;
            for (t.child = null; A !== null; ) {
              var H = A.alternate;
              if (H !== null && fm(H) === null) {
                t.child = A;
                break;
              }
              var j = A.sibling;
              A.sibling = b, b = A, A = j;
            }
            XS(
              t,
              !0,
              // isBackwards
              b,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            XS(
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
    function Nb(e, t, a) {
      Ig(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = df(t, null, i, a) : aa(e, t, i, a), t.child;
    }
    var u1 = !1;
    function Ub(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || u1 || (u1 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && _i(v, s, "prop", "Context.Provider");
      }
      if (JE(t, u, p), f !== null) {
        var g = f.value;
        if (Te(g, p)) {
          if (f.children === s.children && !Ph())
            return tu(e, t, a);
        } else
          Ow(t, u, a);
      }
      var E = s.children;
      return aa(e, t, E, a), t.child;
    }
    var o1 = !1;
    function zb(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (o1 || (o1 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), vf(t, a);
      var f = Wn(i);
      _u(t);
      var p;
      return Rp.current = t, ja(!0), p = s(f), ja(!1), Hr(), t.flags |= Gi, aa(e, t, p, a), t.child;
    }
    function bp() {
      Ui = !0;
    }
    function Um(e, t) {
      (t.mode & Le) === _e && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Qt);
    }
    function tu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), FC(), Hp(t.lanes), Br(a, t.childLanes) ? (_w(e, t), t.child) : null;
    }
    function Ab(e, t, a) {
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
        return s === null ? (i.deletions = [e], i.flags |= Dt) : s.push(e), a.flags |= Qt, a;
      }
    }
    function KS(e, t) {
      var a = e.lanes;
      return !!Br(a, t);
    }
    function Fb(e, t, a) {
      switch (t.tag) {
        case Y:
          e1(t), t.stateNode, ff();
          break;
        case ie:
          uC(t);
          break;
        case se: {
          var i = t.type;
          ul(i) && Yh(t);
          break;
        }
        case ce:
          Ig(t, t.stateNode.containerInfo);
          break;
        case Ee: {
          var u = t.memoizedProps.value, s = t.type._context;
          JE(t, s, u);
          break;
        }
        case ot:
          {
            var f = Br(a, t.childLanes);
            f && (t.flags |= nt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case Ne: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return so(t, mf(Li.current)), t.flags |= Qe, null;
            var g = t.child, E = g.childLanes;
            if (Br(a, E))
              return n1(e, t, a);
            so(t, mf(Li.current));
            var _ = tu(e, t, a);
            return _ !== null ? _.sibling : null;
          } else
            so(t, mf(Li.current));
          break;
        }
        case Et: {
          var b = (e.flags & Qe) !== He, A = Br(a, t.childLanes);
          if (b) {
            if (A)
              return l1(e, t, a);
            t.flags |= Qe;
          }
          var H = t.memoizedState;
          if (H !== null && (H.rendering = null, H.tail = null, H.lastEffect = null), so(t, Li.current), A)
            break;
          return null;
        }
        case fe:
        case Fe:
          return t.lanes = I, KC(e, t, a);
      }
      return tu(e, t, a);
    }
    function s1(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Ab(e, t, D0(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Ph() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          Ui = !0;
        else {
          var s = KS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Qe) === He)
            return Ui = !1, Fb(e, t, a);
          (e.flags & Io) !== He ? Ui = !0 : Ui = !1;
        }
      } else if (Ui = !1, Cr() && ow(t)) {
        var f = t.index, p = sw();
        FE(t, p, f);
      }
      switch (t.lanes = I, t.tag) {
        case De:
          return gb(e, t, t.type, a);
        case Yt: {
          var v = t.elementType;
          return mb(e, t, v, a);
        }
        case ne: {
          var g = t.type, E = t.pendingProps, _ = t.elementType === g ? E : Ni(g, E);
          return $S(e, t, g, _, a);
        }
        case se: {
          var b = t.type, A = t.pendingProps, H = t.elementType === b ? A : Ni(b, A);
          return JC(e, t, b, H, a);
        }
        case Y:
          return pb(e, t, a);
        case ie:
          return vb(e, t, a);
        case xe:
          return hb(e, t);
        case Ne:
          return n1(e, t, a);
        case ce:
          return Nb(e, t, a);
        case Ie: {
          var j = t.type, pe = t.pendingProps, je = t.elementType === j ? pe : Ni(j, pe);
          return GC(e, t, j, je, a);
        }
        case Ze:
          return cb(e, t, a);
        case Ge:
          return fb(e, t, a);
        case ot:
          return db(e, t, a);
        case Ee:
          return Ub(e, t, a);
        case wt:
          return zb(e, t, a);
        case Ct: {
          var Me = t.type, yt = t.pendingProps, ft = Ni(Me, yt);
          if (t.type !== t.elementType) {
            var M = Me.propTypes;
            M && _i(
              M,
              ft,
              // Resolved for outer only
              "prop",
              Nt(Me)
            );
          }
          return ft = Ni(Me.type, ft), qC(e, t, Me, ft, a);
        }
        case Xe:
          return XC(e, t, t.type, t.pendingProps, a);
        case Jt: {
          var B = t.type, N = t.pendingProps, K = t.elementType === B ? N : Ni(B, N);
          return yb(e, t, B, K, a);
        }
        case Et:
          return l1(e, t, a);
        case Ve:
          break;
        case fe:
          return KC(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Tf(e) {
      e.flags |= nt;
    }
    function c1(e) {
      e.flags |= Nr, e.flags |= dd;
    }
    var f1, ZS, d1, p1;
    f1 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ie || u.tag === xe)
          ix(e, u.stateNode);
        else if (u.tag !== ce) {
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
    }, ZS = function(e, t) {
    }, d1 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Qg(), v = ux(f, a, s, i, u, p);
        t.updateQueue = v, v && Tf(t);
      }
    }, p1 = function(e, t, a, i) {
      a !== i && Tf(t);
    };
    function Dp(e, t) {
      if (!Cr())
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
    function Rr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = I, i = He;
      if (t) {
        if ((e.mode & We) !== _e) {
          for (var v = e.selfBaseDuration, g = e.child; g !== null; )
            a = tt(a, tt(g.lanes, g.childLanes)), i |= g.subtreeFlags & Zn, i |= g.flags & Zn, v += g.treeBaseDuration, g = g.sibling;
          e.treeBaseDuration = v;
        } else
          for (var E = e.child; E !== null; )
            a = tt(a, tt(E.lanes, E.childLanes)), i |= E.subtreeFlags & Zn, i |= E.flags & Zn, E.return = e, E = E.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & We) !== _e) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = tt(a, tt(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = tt(a, tt(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Hb(e, t, a) {
      if (Tw() && (t.mode & Le) !== _e && (t.flags & Qe) === He)
        return YE(t), ff(), t.flags |= un | Zr | $n, !1;
      var i = qh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (Ew(t), Rr(t), (t.mode & We) !== _e) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (ff(), (t.flags & Qe) === He && (t.memoizedState = null), t.flags |= nt, Rr(t), (t.mode & We) !== _e) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return IE(), !0;
    }
    function v1(e, t, a) {
      var i = t.pendingProps;
      switch (xg(t), t.tag) {
        case De:
        case Yt:
        case Xe:
        case ne:
        case Ie:
        case Ze:
        case Ge:
        case ot:
        case wt:
        case Ct:
          return Rr(t), null;
        case se: {
          var u = t.type;
          return ul(u) && $h(t), Rr(t), null;
        }
        case Y: {
          var s = t.stateNode;
          if (hf(t), Eg(t), Kg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = qh(t);
            if (f)
              Tf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & un) !== He) && (t.flags |= ya, IE());
            }
          }
          return ZS(e, t), Rr(t), null;
        }
        case ie: {
          Wg(t);
          var v = lC(), g = t.type;
          if (e !== null && t.stateNode != null)
            d1(e, t, g, i, v), e.ref !== t.ref && c1(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Rr(t), null;
            }
            var E = Qg(), _ = qh(t);
            if (_)
              gw(t, v, E) && Tf(t);
            else {
              var b = ax(g, i, v, E, t);
              f1(b, t, !1, !1), t.stateNode = b, lx(b, g, i, v) && Tf(t);
            }
            t.ref !== null && c1(t);
          }
          return Rr(t), null;
        }
        case xe: {
          var A = i;
          if (e && t.stateNode != null) {
            var H = e.memoizedProps;
            p1(e, t, H, A);
          } else {
            if (typeof A != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = lC(), pe = Qg(), je = qh(t);
            je ? Sw(t) && Tf(t) : t.stateNode = ox(A, j, pe, t);
          }
          return Rr(t), null;
        }
        case Ne: {
          yf(t);
          var Me = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var yt = Hb(e, t, Me);
            if (!yt)
              return t.flags & $n ? t : null;
          }
          if ((t.flags & Qe) !== He)
            return t.lanes = a, (t.mode & We) !== _e && TS(t), t;
          var ft = Me !== null, M = e !== null && e.memoizedState !== null;
          if (ft !== M && ft) {
            var B = t.child;
            if (B.flags |= qi, (t.mode & Le) !== _e) {
              var N = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !ht);
              N || Gg(Li.current, sC) ? VD() : m0();
            }
          }
          var K = t.updateQueue;
          if (K !== null && (t.flags |= nt), Rr(t), (t.mode & We) !== _e && ft) {
            var ye = t.child;
            ye !== null && (t.treeBaseDuration -= ye.treeBaseDuration);
          }
          return null;
        }
        case ce:
          return hf(t), ZS(e, t), e === null && tw(t.stateNode.containerInfo), Rr(t), null;
        case Ee:
          var ve = t.type._context;
          return Hg(ve, t), Rr(t), null;
        case Jt: {
          var Ye = t.type;
          return ul(Ye) && $h(t), Rr(t), null;
        }
        case Et: {
          yf(t);
          var Ke = t.memoizedState;
          if (Ke === null)
            return Rr(t), null;
          var Ft = (t.flags & Qe) !== He, Rt = Ke.rendering;
          if (Rt === null)
            if (Ft)
              Dp(Ke, !1);
            else {
              var Un = BD() && (e === null || (e.flags & Qe) === He);
              if (!Un)
                for (var xt = t.child; xt !== null; ) {
                  var Rn = fm(xt);
                  if (Rn !== null) {
                    Ft = !0, t.flags |= Qe, Dp(Ke, !1);
                    var Qr = Rn.updateQueue;
                    return Qr !== null && (t.updateQueue = Qr, t.flags |= nt), t.subtreeFlags = He, kw(t, a), so(t, qg(Li.current, vp)), t.child;
                  }
                  xt = xt.sibling;
                }
              Ke.tail !== null && nn() > z1() && (t.flags |= Qe, Ft = !0, Dp(Ke, !1), t.lanes = Gv);
            }
          else {
            if (!Ft) {
              var _r = fm(Rt);
              if (_r !== null) {
                t.flags |= Qe, Ft = !0;
                var Wa = _r.updateQueue;
                if (Wa !== null && (t.updateQueue = Wa, t.flags |= nt), Dp(Ke, !0), Ke.tail === null && Ke.tailMode === "hidden" && !Rt.alternate && !Cr())
                  return Rr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              nn() * 2 - Ke.renderingStartTime > z1() && a !== vr && (t.flags |= Qe, Ft = !0, Dp(Ke, !1), t.lanes = Gv);
            }
            if (Ke.isBackwards)
              Rt.sibling = t.child, t.child = Rt;
            else {
              var ua = Ke.last;
              ua !== null ? ua.sibling = Rt : t.child = Rt, Ke.last = Rt;
            }
          }
          if (Ke.tail !== null) {
            var oa = Ke.tail;
            Ke.rendering = oa, Ke.tail = oa.sibling, Ke.renderingStartTime = nn(), oa.sibling = null;
            var Wr = Li.current;
            return Ft ? Wr = qg(Wr, vp) : Wr = mf(Wr), so(t, Wr), oa;
          }
          return Rr(t), null;
        }
        case Ve:
          break;
        case fe:
        case Fe: {
          h0(t);
          var lu = t.memoizedState, Of = lu !== null;
          if (e !== null) {
            var $p = e.memoizedState, hl = $p !== null;
            hl !== Of && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !de && (t.flags |= qi);
          }
          return !Of || (t.mode & Le) === _e ? Rr(t) : Br(vl, vr) && (Rr(t), t.subtreeFlags & (Qt | nt) && (t.flags |= qi)), null;
        }
        case vt:
          return null;
        case st:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Vb(e, t, a) {
      switch (xg(t), t.tag) {
        case se: {
          var i = t.type;
          ul(i) && $h(t);
          var u = t.flags;
          return u & $n ? (t.flags = u & ~$n | Qe, (t.mode & We) !== _e && TS(t), t) : null;
        }
        case Y: {
          t.stateNode, hf(t), Eg(t), Kg();
          var s = t.flags;
          return (s & $n) !== He && (s & Qe) === He ? (t.flags = s & ~$n | Qe, t) : null;
        }
        case ie:
          return Wg(t), null;
        case Ne: {
          yf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            ff();
          }
          var p = t.flags;
          return p & $n ? (t.flags = p & ~$n | Qe, (t.mode & We) !== _e && TS(t), t) : null;
        }
        case Et:
          return yf(t), null;
        case ce:
          return hf(t), null;
        case Ee:
          var v = t.type._context;
          return Hg(v, t), null;
        case fe:
        case Fe:
          return h0(t), null;
        case vt:
          return null;
        default:
          return null;
      }
    }
    function h1(e, t, a) {
      switch (xg(t), t.tag) {
        case se: {
          var i = t.type.childContextTypes;
          i != null && $h(t);
          break;
        }
        case Y: {
          t.stateNode, hf(t), Eg(t), Kg();
          break;
        }
        case ie: {
          Wg(t);
          break;
        }
        case ce:
          hf(t);
          break;
        case Ne:
          yf(t);
          break;
        case Et:
          yf(t);
          break;
        case Ee:
          var u = t.type._context;
          Hg(u, t);
          break;
        case fe:
        case Fe:
          h0(t);
          break;
      }
    }
    var m1 = null;
    m1 = /* @__PURE__ */ new Set();
    var zm = !1, xr = !1, jb = typeof WeakSet == "function" ? WeakSet : Set, Re = null, Rf = null, xf = null;
    function Bb(e) {
      Ll(null, function() {
        throw e;
      }), cd();
    }
    var Pb = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & We)
        try {
          dl(), t.componentWillUnmount();
        } finally {
          fl(e);
        }
      else
        t.componentWillUnmount();
    };
    function y1(e, t) {
      try {
        po(nr, e);
      } catch (a) {
        qt(e, t, a);
      }
    }
    function JS(e, t, a) {
      try {
        Pb(e, a);
      } catch (i) {
        qt(e, t, i);
      }
    }
    function $b(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        qt(e, t, i);
      }
    }
    function g1(e, t) {
      try {
        E1(e);
      } catch (a) {
        qt(e, t, a);
      }
    }
    function wf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (en && yr && e.mode & We)
              try {
                dl(), i = a(null);
              } finally {
                fl(e);
              }
            else
              i = a(null);
          } catch (u) {
            qt(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", et(e));
        } else
          a.current = null;
    }
    function Am(e, t, a) {
      try {
        a();
      } catch (i) {
        qt(e, t, i);
      }
    }
    var S1 = !1;
    function Yb(e, t) {
      nx(e.containerInfo), Re = t, Ib();
      var a = S1;
      return S1 = !1, a;
    }
    function Ib() {
      for (; Re !== null; ) {
        var e = Re, t = e.child;
        (e.subtreeFlags & wu) !== He && t !== null ? (t.return = e, Re = t) : Qb();
      }
    }
    function Qb() {
      for (; Re !== null; ) {
        var e = Re;
        zt(e);
        try {
          Wb(e);
        } catch (a) {
          qt(e, e.return, a);
        }
        _n();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Re = t;
          return;
        }
        Re = e.return;
      }
    }
    function Wb(e) {
      var t = e.alternate, a = e.flags;
      if ((a & ya) !== He) {
        switch (zt(e), e.tag) {
          case ne:
          case Ie:
          case Xe:
            break;
          case se: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !bs && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : Ni(e.type, i), u);
              {
                var p = m1;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", et(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case Y: {
            {
              var v = e.stateNode;
              Dx(v.containerInfo);
            }
            break;
          }
          case ie:
          case xe:
          case ce:
          case Jt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        _n();
      }
    }
    function zi(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Tr) !== La ? Iv(t) : (e & nr) !== La && Ya(t), (e & ol) !== La && jp(!0), Am(t, a, p), (e & ol) !== La && jp(!1), (e & Tr) !== La ? cc() : (e & nr) !== La && ku());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function po(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Tr) !== La ? Zi(t) : (e & nr) !== La && Qv(t);
            var f = s.create;
            (e & ol) !== La && jp(!0), s.destroy = f(), (e & ol) !== La && jp(!1), (e & Tr) !== La ? sc() : (e & nr) !== La && Qo();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & nr) !== He ? v = "useLayoutEffect" : (s.tag & ol) !== He ? v = "useInsertionEffect" : v = "useEffect";
                var g = void 0;
                p === null ? g = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? g = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : g = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, g);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Gb(e, t) {
      if ((t.flags & nt) !== He)
        switch (t.tag) {
          case ot: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = zC(), p = t.alternate === null ? "mount" : "update";
            UC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case Y:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
                case ot:
                  var E = v.stateNode;
                  E.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function qb(e, t, a, i) {
      if ((a.flags & dr) !== He)
        switch (a.tag) {
          case ne:
          case Ie:
          case Xe: {
            if (!xr)
              if (a.mode & We)
                try {
                  dl(), po(nr | tr, a);
                } finally {
                  fl(a);
                }
              else
                po(nr | tr, a);
            break;
          }
          case se: {
            var u = a.stateNode;
            if (a.flags & nt && !xr)
              if (t === null)
                if (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), a.mode & We)
                  try {
                    dl(), u.componentDidMount();
                  } finally {
                    fl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : Ni(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), a.mode & We)
                  try {
                    dl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    fl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !bs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", et(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", et(a) || "instance")), iC(a, p, u));
            break;
          }
          case Y: {
            var v = a.updateQueue;
            if (v !== null) {
              var g = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ie:
                    g = a.child.stateNode;
                    break;
                  case se:
                    g = a.child.stateNode;
                    break;
                }
              iC(a, v, g);
            }
            break;
          }
          case ie: {
            var E = a.stateNode;
            if (t === null && a.flags & nt) {
              var _ = a.type, b = a.memoizedProps;
              px(E, _, b);
            }
            break;
          }
          case xe:
            break;
          case ce:
            break;
          case ot: {
            {
              var A = a.memoizedProps, H = A.onCommit, j = A.onRender, pe = a.stateNode.effectDuration, je = zC(), Me = t === null ? "mount" : "update";
              UC() && (Me = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, Me, a.actualDuration, a.treeBaseDuration, a.actualStartTime, je);
              {
                typeof H == "function" && H(a.memoizedProps.id, Me, pe, je), QD(a);
                var yt = a.return;
                e: for (; yt !== null; ) {
                  switch (yt.tag) {
                    case Y:
                      var ft = yt.stateNode;
                      ft.effectDuration += pe;
                      break e;
                    case ot:
                      var M = yt.stateNode;
                      M.effectDuration += pe;
                      break e;
                  }
                  yt = yt.return;
                }
              }
            }
            break;
          }
          case Ne: {
            rD(e, a);
            break;
          }
          case Et:
          case Jt:
          case Ve:
          case fe:
          case Fe:
          case st:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      xr || a.flags & Nr && E1(a);
    }
    function Xb(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          if (e.mode & We)
            try {
              dl(), y1(e, e.return);
            } finally {
              fl(e);
            }
          else
            y1(e, e.return);
          break;
        }
        case se: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && $b(e, e.return, t), g1(e, e.return);
          break;
        }
        case ie: {
          g1(e, e.return);
          break;
        }
      }
    }
    function Kb(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ie) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? Rx(u) : wx(i.stateNode, i.memoizedProps);
            } catch (f) {
              qt(e, e.return, f);
            }
          }
        } else if (i.tag === xe) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? xx(s) : bx(s, i.memoizedProps);
            } catch (f) {
              qt(e, e.return, f);
            }
        } else if (!((i.tag === fe || i.tag === Fe) && i.memoizedState !== null && i !== e)) {
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
    function E1(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ie:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & We)
            try {
              dl(), u = t(i);
            } finally {
              fl(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", et(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", et(e)), t.current = i;
      }
    }
    function Zb(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function C1(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, C1(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ie) {
          var a = e.stateNode;
          a !== null && aw(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Jb(e) {
      for (var t = e.return; t !== null; ) {
        if (T1(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function T1(e) {
      return e.tag === ie || e.tag === Y || e.tag === ce;
    }
    function R1(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || T1(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ie && t.tag !== xe && t.tag !== pt; ) {
          if (t.flags & Qt || t.child === null || t.tag === ce)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & Qt))
          return t.stateNode;
      }
    }
    function eD(e) {
      var t = Jb(e);
      switch (t.tag) {
        case ie: {
          var a = t.stateNode;
          t.flags & Ot && (wE(a), t.flags &= ~Ot);
          var i = R1(e);
          t0(e, i, a);
          break;
        }
        case Y:
        case ce: {
          var u = t.stateNode.containerInfo, s = R1(e);
          e0(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function e0(e, t, a) {
      var i = e.tag, u = i === ie || i === xe;
      if (u) {
        var s = e.stateNode;
        t ? Sx(a, s, t) : yx(a, s);
      } else if (i !== ce) {
        var f = e.child;
        if (f !== null) {
          e0(f, t, a);
          for (var p = f.sibling; p !== null; )
            e0(p, t, a), p = p.sibling;
        }
      }
    }
    function t0(e, t, a) {
      var i = e.tag, u = i === ie || i === xe;
      if (u) {
        var s = e.stateNode;
        t ? gx(a, s, t) : mx(a, s);
      } else if (i !== ce) {
        var f = e.child;
        if (f !== null) {
          t0(f, t, a);
          for (var p = f.sibling; p !== null; )
            t0(p, t, a), p = p.sibling;
        }
      }
    }
    var wr = null, Ai = !1;
    function tD(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ie: {
              wr = i.stateNode, Ai = !1;
              break e;
            }
            case Y: {
              wr = i.stateNode.containerInfo, Ai = !0;
              break e;
            }
            case ce: {
              wr = i.stateNode.containerInfo, Ai = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (wr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        x1(e, t, a), wr = null, Ai = !1;
      }
      Zb(a);
    }
    function vo(e, t, a) {
      for (var i = a.child; i !== null; )
        x1(e, t, i), i = i.sibling;
    }
    function x1(e, t, a) {
      switch (Ul(a), a.tag) {
        case ie:
          xr || wf(a, t);
        case xe: {
          {
            var i = wr, u = Ai;
            wr = null, vo(e, t, a), wr = i, Ai = u, wr !== null && (Ai ? Cx(wr, a.stateNode) : Ex(wr, a.stateNode));
          }
          return;
        }
        case pt: {
          wr !== null && (Ai ? Tx(wr, a.stateNode) : dg(wr, a.stateNode));
          return;
        }
        case ce: {
          {
            var s = wr, f = Ai;
            wr = a.stateNode.containerInfo, Ai = !0, vo(e, t, a), wr = s, Ai = f;
          }
          return;
        }
        case ne:
        case Ie:
        case Ct:
        case Xe: {
          if (!xr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var g = v.next, E = g;
                do {
                  var _ = E, b = _.destroy, A = _.tag;
                  b !== void 0 && ((A & ol) !== La ? Am(a, t, b) : (A & nr) !== La && (Ya(a), a.mode & We ? (dl(), Am(a, t, b), fl(a)) : Am(a, t, b), ku())), E = E.next;
                } while (E !== g);
              }
            }
          }
          vo(e, t, a);
          return;
        }
        case se: {
          if (!xr) {
            wf(a, t);
            var H = a.stateNode;
            typeof H.componentWillUnmount == "function" && JS(a, t, H);
          }
          vo(e, t, a);
          return;
        }
        case Ve: {
          vo(e, t, a);
          return;
        }
        case fe: {
          if (
            // TODO: Remove this dead flag
            a.mode & Le
          ) {
            var j = xr;
            xr = j || a.memoizedState !== null, vo(e, t, a), xr = j;
          } else
            vo(e, t, a);
          break;
        }
        default: {
          vo(e, t, a);
          return;
        }
      }
    }
    function nD(e) {
      e.memoizedState;
    }
    function rD(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && Bx(s);
          }
        }
      }
    }
    function w1(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new jb()), t.forEach(function(i) {
          var u = JD.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), ta)
              if (Rf !== null && xf !== null)
                Vp(xf, Rf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function aD(e, t, a) {
      Rf = a, xf = e, zt(t), b1(t, e), zt(t), Rf = null, xf = null;
    }
    function Fi(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            tD(e, t, s);
          } catch (v) {
            qt(s, t, v);
          }
        }
      var f = py();
      if (t.subtreeFlags & Ar)
        for (var p = t.child; p !== null; )
          zt(p), b1(p, e), p = p.sibling;
      zt(f);
    }
    function b1(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case ne:
        case Ie:
        case Ct:
        case Xe: {
          if (Fi(t, e), pl(e), u & nt) {
            try {
              zi(ol | tr, e, e.return), po(ol | tr, e);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
            if (e.mode & We) {
              try {
                dl(), zi(nr | tr, e, e.return);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
              fl(e);
            } else
              try {
                zi(nr | tr, e, e.return);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
          }
          return;
        }
        case se: {
          Fi(t, e), pl(e), u & Nr && i !== null && wf(i, i.return);
          return;
        }
        case ie: {
          Fi(t, e), pl(e), u & Nr && i !== null && wf(i, i.return);
          {
            if (e.flags & Ot) {
              var s = e.stateNode;
              try {
                wE(s);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
            }
            if (u & nt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, g = e.type, E = e.updateQueue;
                if (e.updateQueue = null, E !== null)
                  try {
                    vx(f, E, g, v, p, e);
                  } catch (Ye) {
                    qt(e, e.return, Ye);
                  }
              }
            }
          }
          return;
        }
        case xe: {
          if (Fi(t, e), pl(e), u & nt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var _ = e.stateNode, b = e.memoizedProps, A = i !== null ? i.memoizedProps : b;
            try {
              hx(_, A, b);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
          }
          return;
        }
        case Y: {
          if (Fi(t, e), pl(e), u & nt && i !== null) {
            var H = i.memoizedState;
            if (H.isDehydrated)
              try {
                jx(t.containerInfo);
              } catch (Ye) {
                qt(e, e.return, Ye);
              }
          }
          return;
        }
        case ce: {
          Fi(t, e), pl(e);
          return;
        }
        case Ne: {
          Fi(t, e), pl(e);
          var j = e.child;
          if (j.flags & qi) {
            var pe = j.stateNode, je = j.memoizedState, Me = je !== null;
            if (pe.isHidden = Me, Me) {
              var yt = j.alternate !== null && j.alternate.memoizedState !== null;
              yt || HD();
            }
          }
          if (u & nt) {
            try {
              nD(e);
            } catch (Ye) {
              qt(e, e.return, Ye);
            }
            w1(e);
          }
          return;
        }
        case fe: {
          var ft = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & Le
          ) {
            var M = xr;
            xr = M || ft, Fi(t, e), xr = M;
          } else
            Fi(t, e);
          if (pl(e), u & qi) {
            var B = e.stateNode, N = e.memoizedState, K = N !== null, ye = e;
            if (B.isHidden = K, K && !ft && (ye.mode & Le) !== _e) {
              Re = ye;
              for (var ve = ye.child; ve !== null; )
                Re = ve, lD(ve), ve = ve.sibling;
            }
            Kb(ye, K);
          }
          return;
        }
        case Et: {
          Fi(t, e), pl(e), u & nt && w1(e);
          return;
        }
        case Ve:
          return;
        default: {
          Fi(t, e), pl(e);
          return;
        }
      }
    }
    function pl(e) {
      var t = e.flags;
      if (t & Qt) {
        try {
          eD(e);
        } catch (a) {
          qt(e, e.return, a);
        }
        e.flags &= ~Qt;
      }
      t & ga && (e.flags &= ~ga);
    }
    function iD(e, t, a) {
      Rf = a, xf = t, Re = e, D1(e, t, a), Rf = null, xf = null;
    }
    function D1(e, t, a) {
      for (var i = (e.mode & Le) !== _e; Re !== null; ) {
        var u = Re, s = u.child;
        if (u.tag === fe && i) {
          var f = u.memoizedState !== null, p = f || zm;
          if (p) {
            n0(e, t, a);
            continue;
          } else {
            var v = u.alternate, g = v !== null && v.memoizedState !== null, E = g || xr, _ = zm, b = xr;
            zm = p, xr = E, xr && !b && (Re = u, uD(u));
            for (var A = s; A !== null; )
              Re = A, D1(
                A,
                // New root; bubble back up to here and stop.
                t,
                a
              ), A = A.sibling;
            Re = u, zm = _, xr = b, n0(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & dr) !== He && s !== null ? (s.return = u, Re = s) : n0(e, t, a);
      }
    }
    function n0(e, t, a) {
      for (; Re !== null; ) {
        var i = Re;
        if ((i.flags & dr) !== He) {
          var u = i.alternate;
          zt(i);
          try {
            qb(t, u, i, a);
          } catch (f) {
            qt(i, i.return, f);
          }
          _n();
        }
        if (i === e) {
          Re = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Re = s;
          return;
        }
        Re = i.return;
      }
    }
    function lD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.child;
        switch (t.tag) {
          case ne:
          case Ie:
          case Ct:
          case Xe: {
            if (t.mode & We)
              try {
                dl(), zi(nr, t, t.return);
              } finally {
                fl(t);
              }
            else
              zi(nr, t, t.return);
            break;
          }
          case se: {
            wf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && JS(t, t.return, i);
            break;
          }
          case ie: {
            wf(t, t.return);
            break;
          }
          case fe: {
            var u = t.memoizedState !== null;
            if (u) {
              _1(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Re = a) : _1(e);
      }
    }
    function _1(e) {
      for (; Re !== null; ) {
        var t = Re;
        if (t === e) {
          Re = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Re = a;
          return;
        }
        Re = t.return;
      }
    }
    function uD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.child;
        if (t.tag === fe) {
          var i = t.memoizedState !== null;
          if (i) {
            k1(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Re = a) : k1(e);
      }
    }
    function k1(e) {
      for (; Re !== null; ) {
        var t = Re;
        zt(t);
        try {
          Xb(t);
        } catch (i) {
          qt(t, t.return, i);
        }
        if (_n(), t === e) {
          Re = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Re = a;
          return;
        }
        Re = t.return;
      }
    }
    function oD(e, t, a, i) {
      Re = t, sD(t, e, a, i);
    }
    function sD(e, t, a, i) {
      for (; Re !== null; ) {
        var u = Re, s = u.child;
        (u.subtreeFlags & Sa) !== He && s !== null ? (s.return = u, Re = s) : cD(e, t, a, i);
      }
    }
    function cD(e, t, a, i) {
      for (; Re !== null; ) {
        var u = Re;
        if ((u.flags & Xt) !== He) {
          zt(u);
          try {
            fD(t, u, a, i);
          } catch (f) {
            qt(u, u.return, f);
          }
          _n();
        }
        if (u === e) {
          Re = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Re = s;
          return;
        }
        Re = u.return;
      }
    }
    function fD(e, t, a, i) {
      switch (t.tag) {
        case ne:
        case Ie:
        case Xe: {
          if (t.mode & We) {
            CS();
            try {
              po(Tr | tr, t);
            } finally {
              ES(t);
            }
          } else
            po(Tr | tr, t);
          break;
        }
      }
    }
    function dD(e) {
      Re = e, pD();
    }
    function pD() {
      for (; Re !== null; ) {
        var e = Re, t = e.child;
        if ((Re.flags & Dt) !== He) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Re = u, mD(u, e);
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
            Re = e;
          }
        }
        (e.subtreeFlags & Sa) !== He && t !== null ? (t.return = e, Re = t) : vD();
      }
    }
    function vD() {
      for (; Re !== null; ) {
        var e = Re;
        (e.flags & Xt) !== He && (zt(e), hD(e), _n());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Re = t;
          return;
        }
        Re = e.return;
      }
    }
    function hD(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          e.mode & We ? (CS(), zi(Tr | tr, e, e.return), ES(e)) : zi(Tr | tr, e, e.return);
          break;
        }
      }
    }
    function mD(e, t) {
      for (; Re !== null; ) {
        var a = Re;
        zt(a), gD(a, t), _n();
        var i = a.child;
        i !== null ? (i.return = a, Re = i) : yD(e);
      }
    }
    function yD(e) {
      for (; Re !== null; ) {
        var t = Re, a = t.sibling, i = t.return;
        if (C1(t), t === e) {
          Re = null;
          return;
        }
        if (a !== null) {
          a.return = i, Re = a;
          return;
        }
        Re = i;
      }
    }
    function gD(e, t) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          e.mode & We ? (CS(), zi(Tr, e, t), ES(e)) : zi(Tr, e, t);
          break;
        }
      }
    }
    function SD(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          try {
            po(nr | tr, e);
          } catch (a) {
            qt(e, e.return, a);
          }
          break;
        }
        case se: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            qt(e, e.return, a);
          }
          break;
        }
      }
    }
    function ED(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          try {
            po(Tr | tr, e);
          } catch (t) {
            qt(e, e.return, t);
          }
          break;
        }
      }
    }
    function CD(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe: {
          try {
            zi(nr | tr, e, e.return);
          } catch (a) {
            qt(e, e.return, a);
          }
          break;
        }
        case se: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && JS(e, e.return, t);
          break;
        }
      }
    }
    function TD(e) {
      switch (e.tag) {
        case ne:
        case Ie:
        case Xe:
          try {
            zi(Tr | tr, e, e.return);
          } catch (t) {
            qt(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var _p = Symbol.for;
      _p("selector.component"), _p("selector.has_pseudo_class"), _p("selector.role"), _p("selector.test_id"), _p("selector.text");
    }
    var RD = [];
    function xD() {
      RD.forEach(function(e) {
        return e();
      });
    }
    var wD = y.ReactCurrentActQueue;
    function bD(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function O1() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && wD.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var DD = Math.ceil, r0 = y.ReactCurrentDispatcher, a0 = y.ReactCurrentOwner, br = y.ReactCurrentBatchConfig, Hi = y.ReactCurrentActQueue, ir = (
      /*             */
      0
    ), L1 = (
      /*               */
      1
    ), Dr = (
      /*                */
      2
    ), ci = (
      /*                */
      4
    ), nu = 0, kp = 1, Ds = 2, Fm = 3, Op = 4, M1 = 5, i0 = 6, mt = ir, ia = null, yn = null, lr = I, vl = I, l0 = ro(I), ur = nu, Lp = null, Hm = I, Mp = I, Vm = I, Np = null, Ma = null, u0 = 0, N1 = 500, U1 = 1 / 0, _D = 500, ru = null;
    function Up() {
      U1 = nn() + _D;
    }
    function z1() {
      return U1;
    }
    var jm = !1, o0 = null, bf = null, _s = !1, ho = null, zp = I, s0 = [], c0 = null, kD = 50, Ap = 0, f0 = null, d0 = !1, Bm = !1, OD = 50, Df = 0, Pm = null, Fp = $t, $m = I, A1 = !1;
    function Ym() {
      return ia;
    }
    function la() {
      return (mt & (Dr | ci)) !== ir ? nn() : (Fp !== $t || (Fp = nn()), Fp);
    }
    function mo(e) {
      var t = e.mode;
      if ((t & Le) === _e)
        return Ae;
      if ((mt & Dr) !== ir && lr !== I)
        return Hu(lr);
      var a = ww() !== xw;
      if (a) {
        if (br.transition !== null) {
          var i = br.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return $m === Tn && ($m = nh()), $m;
      }
      var u = xa();
      if (u !== Tn)
        return u;
      var s = sx();
      return s;
    }
    function LD(e) {
      var t = e.mode;
      return (t & Le) === _e ? Ae : jr();
    }
    function or(e, t, a, i) {
      t_(), A1 && S("useInsertionEffect must not schedule updates."), d0 && (Bm = !0), Pl(e, a, i), (mt & Dr) !== I && e === ia ? a_(t) : (ta && Nc(e, t, a), i_(t), e === ia && ((mt & Dr) === ir && (Mp = tt(Mp, a)), ur === Op && yo(e, lr)), Na(e, i), a === Ae && mt === ir && (t.mode & Le) === _e && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Hi.isBatchingLegacy && (Up(), AE()));
    }
    function MD(e, t, a) {
      var i = e.current;
      i.lanes = t, Pl(e, t, a), Na(e, a);
    }
    function ND(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (mt & Dr) !== ir
      );
    }
    function Na(e, t) {
      var a = e.callbackNode;
      Kv(e, t);
      var i = jl(e, e === ia ? lr : I);
      if (i === I) {
        a !== null && Z1(a), e.callbackNode = null, e.callbackPriority = Tn;
        return;
      }
      var u = vn(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(Hi.current !== null && a !== S0)) {
        a == null && s !== Ae && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && Z1(a);
      var f;
      if (u === Ae)
        e.tag === ao ? (Hi.isBatchingLegacy !== null && (Hi.didScheduleLegacyUpdate = !0), uw(V1.bind(null, e))) : zE(V1.bind(null, e)), Hi.current !== null ? Hi.current.push(io) : fx(function() {
          (mt & (Dr | ci)) === ir && io();
        }), f = null;
      else {
        var p;
        switch (er(i)) {
          case hn:
            p = lc;
            break;
          case xi:
            p = Nl;
            break;
          case ti:
            p = ei;
            break;
          case Vu:
            p = uc;
            break;
          default:
            p = ei;
            break;
        }
        f = E0(p, F1.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function F1(e, t) {
      if (Kw(), Fp = $t, $m = I, (mt & (Dr | ci)) !== ir)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = iu();
      if (i && e.callbackNode !== a)
        return null;
      var u = jl(e, e === ia ? lr : I);
      if (u === I)
        return null;
      var s = !es(e, u) && !th(e, u) && !t, f = s ? $D(e, u) : Qm(e, u);
      if (f !== nu) {
        if (f === Ds) {
          var p = el(e);
          p !== I && (u = p, f = p0(e, p));
        }
        if (f === kp) {
          var v = Lp;
          throw ks(e, I), yo(e, u), Na(e, nn()), v;
        }
        if (f === i0)
          yo(e, u);
        else {
          var g = !es(e, u), E = e.current.alternate;
          if (g && !zD(E)) {
            if (f = Qm(e, u), f === Ds) {
              var _ = el(e);
              _ !== I && (u = _, f = p0(e, _));
            }
            if (f === kp) {
              var b = Lp;
              throw ks(e, I), yo(e, u), Na(e, nn()), b;
            }
          }
          e.finishedWork = E, e.finishedLanes = u, UD(e, f, u);
        }
      }
      return Na(e, nn()), e.callbackNode === a ? F1.bind(null, e) : null;
    }
    function p0(e, t) {
      var a = Np;
      if (Uc(e)) {
        var i = ks(e, t);
        i.flags |= un, ew(e.containerInfo);
      }
      var u = Qm(e, t);
      if (u !== Ds) {
        var s = Ma;
        Ma = a, s !== null && H1(s);
      }
      return u;
    }
    function H1(e) {
      Ma === null ? Ma = e : Ma.push.apply(Ma, e);
    }
    function UD(e, t, a) {
      switch (t) {
        case nu:
        case kp:
          throw new Error("Root did not complete. This is a bug in React.");
        case Ds: {
          Os(e, Ma, ru);
          break;
        }
        case Fm: {
          if (yo(e, a), Zv(a) && // do not delay if we're inside an act() scope
          !J1()) {
            var i = u0 + N1 - nn();
            if (i > 10) {
              var u = jl(e, I);
              if (u !== I)
                break;
              var s = e.suspendedLanes;
              if (!Bl(s, a)) {
                la(), Lc(e, s);
                break;
              }
              e.timeoutHandle = cg(Os.bind(null, e, Ma, ru), i);
              break;
            }
          }
          Os(e, Ma, ru);
          break;
        }
        case Op: {
          if (yo(e, a), eh(a))
            break;
          if (!J1()) {
            var f = qv(e, a), p = f, v = nn() - p, g = e_(v) - v;
            if (g > 10) {
              e.timeoutHandle = cg(Os.bind(null, e, Ma, ru), g);
              break;
            }
          }
          Os(e, Ma, ru);
          break;
        }
        case M1: {
          Os(e, Ma, ru);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function zD(e) {
      for (var t = e; ; ) {
        if (t.flags & Yo) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Te(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & Yo && v !== null) {
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
    function yo(e, t) {
      t = ts(t, Vm), t = ts(t, Mp), ah(e, t);
    }
    function V1(e) {
      if (Zw(), (mt & (Dr | ci)) !== ir)
        throw new Error("Should not already be working.");
      iu();
      var t = jl(e, I);
      if (!Br(t, Ae))
        return Na(e, nn()), null;
      var a = Qm(e, t);
      if (e.tag !== ao && a === Ds) {
        var i = el(e);
        i !== I && (t = i, a = p0(e, i));
      }
      if (a === kp) {
        var u = Lp;
        throw ks(e, I), yo(e, t), Na(e, nn()), u;
      }
      if (a === i0)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, Os(e, Ma, ru), Na(e, nn()), null;
    }
    function AD(e, t) {
      t !== I && (Dd(e, tt(t, Ae)), Na(e, nn()), (mt & (Dr | ci)) === ir && (Up(), io()));
    }
    function v0(e, t) {
      var a = mt;
      mt |= L1;
      try {
        return e(t);
      } finally {
        mt = a, mt === ir && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !Hi.isBatchingLegacy && (Up(), AE());
      }
    }
    function FD(e, t, a, i, u) {
      var s = xa(), f = br.transition;
      try {
        return br.transition = null, on(hn), e(t, a, i, u);
      } finally {
        on(s), br.transition = f, mt === ir && Up();
      }
    }
    function au(e) {
      ho !== null && ho.tag === ao && (mt & (Dr | ci)) === ir && iu();
      var t = mt;
      mt |= L1;
      var a = br.transition, i = xa();
      try {
        return br.transition = null, on(hn), e ? e() : void 0;
      } finally {
        on(i), br.transition = a, mt = t, (mt & (Dr | ci)) === ir && io();
      }
    }
    function j1() {
      return (mt & (Dr | ci)) !== ir;
    }
    function Im(e, t) {
      Yr(l0, vl, e), vl = tt(vl, t);
    }
    function h0(e) {
      vl = l0.current, $r(l0, e);
    }
    function ks(e, t) {
      e.finishedWork = null, e.finishedLanes = I;
      var a = e.timeoutHandle;
      if (a !== fg && (e.timeoutHandle = fg, cx(a)), yn !== null)
        for (var i = yn.return; i !== null; ) {
          var u = i.alternate;
          h1(u, i), i = i.return;
        }
      ia = e;
      var s = Ls(e.current, null);
      return yn = s, lr = vl = t, ur = nu, Lp = null, Hm = I, Mp = I, Vm = I, Np = null, Ma = null, Mw(), Oi.discardPendingWarnings(), s;
    }
    function B1(e, t) {
      do {
        var a = yn;
        try {
          if (tm(), fC(), _n(), a0.current = null, a === null || a.return === null) {
            ur = kp, Lp = t, yn = null;
            return;
          }
          if (en && a.mode & We && Om(a, !0), ca)
            if (Hr(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              zl(a, i, lr);
            } else
              Wo(a, t, lr);
          ub(e, a.return, a, t, lr), I1(a);
        } catch (u) {
          t = u, yn === a && a !== null ? (a = a.return, yn = a) : a = yn;
          continue;
        }
        return;
      } while (!0);
    }
    function P1() {
      var e = r0.current;
      return r0.current = wm, e === null ? wm : e;
    }
    function $1(e) {
      r0.current = e;
    }
    function HD() {
      u0 = nn();
    }
    function Hp(e) {
      Hm = tt(e, Hm);
    }
    function VD() {
      ur === nu && (ur = Fm);
    }
    function m0() {
      (ur === nu || ur === Fm || ur === Ds) && (ur = Op), ia !== null && (Jo(Hm) || Jo(Mp)) && yo(ia, lr);
    }
    function jD(e) {
      ur !== Op && (ur = Ds), Np === null ? Np = [e] : Np.push(e);
    }
    function BD() {
      return ur === nu;
    }
    function Qm(e, t) {
      var a = mt;
      mt |= Dr;
      var i = P1();
      if (ia !== e || lr !== t) {
        if (ta) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Vp(e, lr), u.clear()), _d(e, t);
        }
        ru = rs(), ks(e, t);
      }
      Kt(t);
      do
        try {
          PD();
          break;
        } catch (s) {
          B1(e, s);
        }
      while (!0);
      if (tm(), mt = a, $1(i), yn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return dc(), ia = null, lr = I, ur;
    }
    function PD() {
      for (; yn !== null; )
        Y1(yn);
    }
    function $D(e, t) {
      var a = mt;
      mt |= Dr;
      var i = P1();
      if (ia !== e || lr !== t) {
        if (ta) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Vp(e, lr), u.clear()), _d(e, t);
        }
        ru = rs(), Up(), ks(e, t);
      }
      Kt(t);
      do
        try {
          YD();
          break;
        } catch (s) {
          B1(e, s);
        }
      while (!0);
      return tm(), $1(i), mt = a, yn !== null ? (fc(), nu) : (dc(), ia = null, lr = I, ur);
    }
    function YD() {
      for (; yn !== null && !ic(); )
        Y1(yn);
    }
    function Y1(e) {
      var t = e.alternate;
      zt(e);
      var a;
      (e.mode & We) !== _e ? (SS(e), a = y0(t, e, vl), Om(e, !0)) : a = y0(t, e, vl), _n(), e.memoizedProps = e.pendingProps, a === null ? I1(e) : yn = a, a0.current = null;
    }
    function I1(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & Zr) === He) {
          zt(t);
          var u = void 0;
          if ((t.mode & We) === _e ? u = v1(a, t, vl) : (SS(t), u = v1(a, t, vl), Om(t, !1)), _n(), u !== null) {
            yn = u;
            return;
          }
        } else {
          var s = Vb(a, t);
          if (s !== null) {
            s.flags &= Hv, yn = s;
            return;
          }
          if ((t.mode & We) !== _e) {
            Om(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= Zr, i.subtreeFlags = He, i.deletions = null;
          else {
            ur = i0, yn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          yn = v;
          return;
        }
        t = i, yn = t;
      } while (t !== null);
      ur === nu && (ur = M1);
    }
    function Os(e, t, a) {
      var i = xa(), u = br.transition;
      try {
        br.transition = null, on(hn), ID(e, t, a, i);
      } finally {
        br.transition = u, on(i);
      }
      return null;
    }
    function ID(e, t, a, i) {
      do
        iu();
      while (ho !== null);
      if (n_(), (mt & (Dr | ci)) !== ir)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ki(s), u === null)
        return oc(), null;
      if (s === I && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = I, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Tn;
      var f = tt(u.lanes, u.childLanes);
      Mc(e, f), e === ia && (ia = null, yn = null, lr = I), ((u.subtreeFlags & Sa) !== He || (u.flags & Sa) !== He) && (_s || (_s = !0, c0 = a, E0(ei, function() {
        return iu(), null;
      })));
      var p = (u.subtreeFlags & (wu | Ar | dr | Sa)) !== He, v = (u.flags & (wu | Ar | dr | Sa)) !== He;
      if (p || v) {
        var g = br.transition;
        br.transition = null;
        var E = xa();
        on(hn);
        var _ = mt;
        mt |= ci, a0.current = null, Yb(e, u), AC(), aD(e, u, s), rx(e.containerInfo), e.current = u, Sd(s), iD(u, e, s), Ou(), Bv(), mt = _, on(E), br.transition = g;
      } else
        e.current = u, AC();
      var b = _s;
      if (_s ? (_s = !1, ho = e, zp = s) : (Df = 0, Pm = null), f = e.pendingLanes, f === I && (bf = null), b || q1(e.current, !1), Du(u.stateNode, i), ta && e.memoizedUpdaters.clear(), xD(), Na(e, nn()), t !== null)
        for (var A = e.onRecoverableError, H = 0; H < t.length; H++) {
          var j = t[H], pe = j.stack, je = j.digest;
          A(j.value, {
            componentStack: pe,
            digest: je
          });
        }
      if (jm) {
        jm = !1;
        var Me = o0;
        throw o0 = null, Me;
      }
      return Br(zp, Ae) && e.tag !== ao && iu(), f = e.pendingLanes, Br(f, Ae) ? (Xw(), e === f0 ? Ap++ : (Ap = 0, f0 = e)) : Ap = 0, io(), oc(), null;
    }
    function iu() {
      if (ho !== null) {
        var e = er(zp), t = zy(ti, e), a = br.transition, i = xa();
        try {
          return br.transition = null, on(t), WD();
        } finally {
          on(i), br.transition = a;
        }
      }
      return !1;
    }
    function QD(e) {
      s0.push(e), _s || (_s = !0, E0(ei, function() {
        return iu(), null;
      }));
    }
    function WD() {
      if (ho === null)
        return !1;
      var e = c0;
      c0 = null;
      var t = ho, a = zp;
      if (ho = null, zp = I, (mt & (Dr | ci)) !== ir)
        throw new Error("Cannot flush passive effects while already rendering.");
      d0 = !0, Bm = !1, Wv(a);
      var i = mt;
      mt |= ci, dD(t.current), oD(t, t.current, a, e);
      {
        var u = s0;
        s0 = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Gb(t, f);
        }
      }
      Ed(), q1(t.current, !0), mt = i, io(), Bm ? t === Pm ? Df++ : (Df = 0, Pm = t) : Df = 0, d0 = !1, Bm = !1, Ta(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function Q1(e) {
      return bf !== null && bf.has(e);
    }
    function GD(e) {
      bf === null ? bf = /* @__PURE__ */ new Set([e]) : bf.add(e);
    }
    function qD(e) {
      jm || (jm = !0, o0 = e);
    }
    var XD = qD;
    function W1(e, t, a) {
      var i = ws(a, t), u = YC(e, i, Ae), s = uo(e, u, Ae), f = la();
      s !== null && (Pl(s, Ae, f), Na(s, f));
    }
    function qt(e, t, a) {
      if (Bb(a), jp(!1), e.tag === Y) {
        W1(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === Y) {
          W1(i, e, a);
          return;
        } else if (i.tag === se) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !Q1(s)) {
            var f = ws(a, e), p = FS(i, f, Ae), v = uo(i, p, Ae), g = la();
            v !== null && (Pl(v, Ae, g), Na(v, g));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function KD(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = la();
      Lc(e, a), l_(e), ia === e && Bl(lr, a) && (ur === Op || ur === Fm && Zv(lr) && nn() - u0 < N1 ? ks(e, I) : Vm = tt(Vm, a)), Na(e, u);
    }
    function G1(e, t) {
      t === Tn && (t = LD(e));
      var a = la(), i = Oa(e, t);
      i !== null && (Pl(i, t, a), Na(i, a));
    }
    function ZD(e) {
      var t = e.memoizedState, a = Tn;
      t !== null && (a = t.retryLane), G1(e, a);
    }
    function JD(e, t) {
      var a = Tn, i;
      switch (e.tag) {
        case Ne:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case Et:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), G1(e, a);
    }
    function e_(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : DD(e / 1960) * 1960;
    }
    function t_() {
      if (Ap > kD)
        throw Ap = 0, f0 = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Df > OD && (Df = 0, Pm = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function n_() {
      Oi.flushLegacyContextWarning(), Oi.flushPendingUnsafeLifecycleWarnings();
    }
    function q1(e, t) {
      zt(e), Wm(e, zr, CD), t && Wm(e, Ml, TD), Wm(e, zr, SD), t && Wm(e, Ml, ED), _n();
    }
    function Wm(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== He ? i = i.child : ((i.flags & t) !== He && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Gm = null;
    function X1(e) {
      {
        if ((mt & Dr) !== ir || !(e.mode & Le))
          return;
        var t = e.tag;
        if (t !== De && t !== Y && t !== se && t !== ne && t !== Ie && t !== Ct && t !== Xe)
          return;
        var a = et(e) || "ReactComponent";
        if (Gm !== null) {
          if (Gm.has(a))
            return;
          Gm.add(a);
        } else
          Gm = /* @__PURE__ */ new Set([a]);
        var i = Sn;
        try {
          zt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? zt(e) : _n();
        }
      }
    }
    var y0;
    {
      var r_ = null;
      y0 = function(e, t, a) {
        var i = aT(r_, t);
        try {
          return s1(e, t, a);
        } catch (s) {
          if (hw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (tm(), fC(), h1(e, t), aT(t, i), t.mode & We && SS(t), Ll(null, s1, null, e, t, a), Oy()) {
            var u = cd();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var K1 = !1, g0;
    g0 = /* @__PURE__ */ new Set();
    function a_(e) {
      if (pa && !Ww())
        switch (e.tag) {
          case ne:
          case Ie:
          case Xe: {
            var t = yn && et(yn) || "Unknown", a = t;
            if (!g0.has(a)) {
              g0.add(a);
              var i = et(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case se: {
            K1 || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), K1 = !0);
            break;
          }
        }
    }
    function Vp(e, t) {
      if (ta) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Nc(e, i, t);
        });
      }
    }
    var S0 = {};
    function E0(e, t) {
      {
        var a = Hi.current;
        return a !== null ? (a.push(t), S0) : ac(e, t);
      }
    }
    function Z1(e) {
      if (e !== S0)
        return jv(e);
    }
    function J1() {
      return Hi.current !== null;
    }
    function i_(e) {
      {
        if (e.mode & Le) {
          if (!O1())
            return;
        } else if (!bD() || mt !== ir || e.tag !== ne && e.tag !== Ie && e.tag !== Xe)
          return;
        if (Hi.current === null) {
          var t = Sn;
          try {
            zt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, et(e));
          } finally {
            t ? zt(e) : _n();
          }
        }
      }
    }
    function l_(e) {
      e.tag !== ao && O1() && Hi.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function jp(e) {
      A1 = e;
    }
    var fi = null, _f = null, u_ = function(e) {
      fi = e;
    };
    function kf(e) {
      {
        if (fi === null)
          return e;
        var t = fi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function C0(e) {
      return kf(e);
    }
    function T0(e) {
      {
        if (fi === null)
          return e;
        var t = fi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = kf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: le,
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
    function eT(e, t) {
      {
        if (fi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case se: {
            typeof i == "function" && (u = !0);
            break;
          }
          case ne: {
            (typeof i == "function" || s === $e) && (u = !0);
            break;
          }
          case Ie: {
            (s === le || s === $e) && (u = !0);
            break;
          }
          case Ct:
          case Xe: {
            (s === St || s === $e) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = fi(a);
          if (f !== void 0 && f === fi(i))
            return !0;
        }
        return !1;
      }
    }
    function tT(e) {
      {
        if (fi === null || typeof WeakSet != "function")
          return;
        _f === null && (_f = /* @__PURE__ */ new WeakSet()), _f.add(e);
      }
    }
    var o_ = function(e, t) {
      {
        if (fi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        iu(), au(function() {
          R0(e.current, i, a);
        });
      }
    }, s_ = function(e, t) {
      {
        if (e.context !== Ia)
          return;
        iu(), au(function() {
          Bp(t, e, null, null);
        });
      }
    };
    function R0(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case ne:
          case Xe:
          case se:
            v = p;
            break;
          case Ie:
            v = p.render;
            break;
        }
        if (fi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var g = !1, E = !1;
        if (v !== null) {
          var _ = fi(v);
          _ !== void 0 && (a.has(_) ? E = !0 : t.has(_) && (f === se ? E = !0 : g = !0));
        }
        if (_f !== null && (_f.has(e) || i !== null && _f.has(i)) && (E = !0), E && (e._debugNeedsRemount = !0), E || g) {
          var b = Oa(e, Ae);
          b !== null && or(b, e, Ae, $t);
        }
        u !== null && !E && R0(u, t, a), s !== null && R0(s, t, a);
      }
    }
    var c_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return x0(e.current, i, a), a;
      }
    };
    function x0(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case ne:
          case Xe:
          case se:
            p = f;
            break;
          case Ie:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? f_(e, a) : i !== null && x0(i, t, a), u !== null && x0(u, t, a);
      }
    }
    function f_(e, t) {
      {
        var a = d_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ie:
              t.add(i.stateNode);
              return;
            case ce:
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
    function d_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ie)
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
    var w0;
    {
      w0 = !1;
      try {
        var nT = Object.preventExtensions({});
      } catch {
        w0 = !0;
      }
    }
    function p_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = He, this.subtreeFlags = He, this.deletions = null, this.lanes = I, this.childLanes = I, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !w0 && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var Qa = function(e, t, a, i) {
      return new p_(e, t, a, i);
    };
    function b0(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function v_(e) {
      return typeof e == "function" && !b0(e) && e.defaultProps === void 0;
    }
    function h_(e) {
      if (typeof e == "function")
        return b0(e) ? se : ne;
      if (e != null) {
        var t = e.$$typeof;
        if (t === le)
          return Ie;
        if (t === St)
          return Ct;
      }
      return De;
    }
    function Ls(e, t) {
      var a = e.alternate;
      a === null ? (a = Qa(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = He, a.subtreeFlags = He, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Zn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case De:
        case ne:
        case Xe:
          a.type = kf(e.type);
          break;
        case se:
          a.type = C0(e.type);
          break;
        case Ie:
          a.type = T0(e.type);
          break;
      }
      return a;
    }
    function m_(e, t) {
      e.flags &= Zn | Qt;
      var a = e.alternate;
      if (a === null)
        e.childLanes = I, e.lanes = t, e.child = null, e.subtreeFlags = He, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = He, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function y_(e, t, a) {
      var i;
      return e === Ih ? (i = Le, t === !0 && (i |= ut, i |= na)) : i = _e, ta && (i |= We), Qa(Y, null, null, i);
    }
    function D0(e, t, a, i, u, s) {
      var f = De, p = e;
      if (typeof e == "function")
        b0(e) ? (f = se, p = C0(p)) : p = kf(p);
      else if (typeof e == "string")
        f = ie;
      else
        e: switch (e) {
          case Fa:
            return go(a.children, u, s, t);
          case ji:
            f = Ge, u |= ut, (u & Le) !== _e && (u |= na);
            break;
          case Cl:
            return g_(a, u, s, t);
          case ze:
            return S_(a, u, s, t);
          case dt:
            return E_(a, u, s, t);
          case It:
            return rT(a, u, s, t);
          case tn:
          case it:
          case Lr:
          case Bi:
          case jn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case R:
                  f = Ee;
                  break e;
                case G:
                  f = wt;
                  break e;
                case le:
                  f = Ie, p = T0(p);
                  break e;
                case St:
                  f = Ct;
                  break e;
                case $e:
                  f = Yt, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var g = i ? et(i) : null;
              g && (v += `

Check the render method of \`` + g + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var E = Qa(f, a, t, u);
      return E.elementType = e, E.type = p, E.lanes = s, E._debugOwner = i, E;
    }
    function _0(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = D0(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function go(e, t, a, i) {
      var u = Qa(Ze, e, i, t);
      return u.lanes = a, u;
    }
    function g_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = Qa(ot, e, i, t | We);
      return u.elementType = Cl, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function S_(e, t, a, i) {
      var u = Qa(Ne, e, i, t);
      return u.elementType = ze, u.lanes = a, u;
    }
    function E_(e, t, a, i) {
      var u = Qa(Et, e, i, t);
      return u.elementType = dt, u.lanes = a, u;
    }
    function rT(e, t, a, i) {
      var u = Qa(fe, e, i, t);
      u.elementType = It, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function k0(e, t, a) {
      var i = Qa(xe, e, null, t);
      return i.lanes = a, i;
    }
    function C_() {
      var e = Qa(ie, null, null, _e);
      return e.elementType = "DELETED", e;
    }
    function T_(e) {
      var t = Qa(pt, null, null, _e);
      return t.stateNode = e, t;
    }
    function O0(e, t, a) {
      var i = e.children !== null ? e.children : [], u = Qa(ce, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function aT(e, t) {
      return e === null && (e = Qa(De, null, null, _e)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function R_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = fg, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Tn, this.eventTimes = ns(I), this.expirationTimes = ns($t), this.pendingLanes = I, this.suspendedLanes = I, this.pingedLanes = I, this.expiredLanes = I, this.mutableReadLanes = I, this.finishedLanes = I, this.entangledLanes = I, this.entanglements = ns(I), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < Xo; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Ih:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case ao:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function iT(e, t, a, i, u, s, f, p, v, g) {
      var E = new R_(e, t, a, p, v), _ = y_(t, s);
      E.current = _, _.stateNode = E;
      {
        var b = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        _.memoizedState = b;
      }
      return $g(_), E;
    }
    var L0 = "18.3.1";
    function x_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return U(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: qr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var M0, N0;
    M0 = !1, N0 = {};
    function lT(e) {
      if (!e)
        return Ia;
      var t = ma(e), a = lw(t);
      if (t.tag === se) {
        var i = t.type;
        if (ul(i))
          return NE(t, i, a);
      }
      return a;
    }
    function w_(e, t) {
      {
        var a = ma(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Ea(a);
        if (u === null)
          return null;
        if (u.mode & ut) {
          var s = et(a) || "Component";
          if (!N0[s]) {
            N0[s] = !0;
            var f = Sn;
            try {
              zt(u), a.mode & ut ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? zt(f) : _n();
            }
          }
        }
        return u.stateNode;
      }
    }
    function uT(e, t, a, i, u, s, f, p) {
      var v = !1, g = null;
      return iT(e, t, v, g, a, i, u, s, f);
    }
    function oT(e, t, a, i, u, s, f, p, v, g) {
      var E = !0, _ = iT(a, i, E, e, u, s, f, p, v);
      _.context = lT(null);
      var b = _.current, A = la(), H = mo(b), j = eu(A, H);
      return j.callback = t ?? null, uo(b, j, H), MD(_, H, A), _;
    }
    function Bp(e, t, a, i) {
      gd(t, e);
      var u = t.current, s = la(), f = mo(u);
      Cd(f);
      var p = lT(a);
      t.context === null ? t.context = p : t.pendingContext = p, pa && Sn !== null && !M0 && (M0 = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, et(Sn) || "Unknown"));
      var v = eu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var g = uo(u, v, f);
      return g !== null && (or(g, u, f, s), lm(g, u, f)), f;
    }
    function qm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ie:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function b_(e) {
      switch (e.tag) {
        case Y: {
          var t = e.stateNode;
          if (Uc(t)) {
            var a = xd(t);
            AD(t, a);
          }
          break;
        }
        case Ne: {
          au(function() {
            var u = Oa(e, Ae);
            if (u !== null) {
              var s = la();
              or(u, e, Ae, s);
            }
          });
          var i = Ae;
          U0(e, i);
          break;
        }
      }
    }
    function sT(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = rh(a.retryLane, t));
    }
    function U0(e, t) {
      sT(e, t);
      var a = e.alternate;
      a && sT(a, t);
    }
    function D_(e) {
      if (e.tag === Ne) {
        var t = Zo, a = Oa(e, t);
        if (a !== null) {
          var i = la();
          or(a, e, t, i);
        }
        U0(e, t);
      }
    }
    function __(e) {
      if (e.tag === Ne) {
        var t = mo(e), a = Oa(e, t);
        if (a !== null) {
          var i = la();
          or(a, e, t, i);
        }
        U0(e, t);
      }
    }
    function cT(e) {
      var t = Vv(e);
      return t === null ? null : t.stateNode;
    }
    var fT = function(e) {
      return null;
    };
    function k_(e) {
      return fT(e);
    }
    var dT = function(e) {
      return !1;
    };
    function O_(e) {
      return dT(e);
    }
    var pT = null, vT = null, hT = null, mT = null, yT = null, gT = null, ST = null, ET = null, CT = null;
    {
      var TT = function(e, t, a) {
        var i = t[a], u = Bn(e) ? e.slice() : lt({}, e);
        return a + 1 === t.length ? (Bn(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = TT(e[i], t, a + 1), u);
      }, RT = function(e, t) {
        return TT(e, t, 0);
      }, xT = function(e, t, a, i) {
        var u = t[i], s = Bn(e) ? e.slice() : lt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], Bn(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = xT(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, wT = function(e, t, a) {
        if (t.length !== a.length) {
          k("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              k("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return xT(e, t, a, 0);
      }, bT = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = Bn(e) ? e.slice() : lt({}, e);
        return s[u] = bT(e[u], t, a + 1, i), s;
      }, DT = function(e, t, a) {
        return bT(e, t, 0, a);
      }, z0 = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      pT = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = DT(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = lt({}, e.memoizedProps);
          var f = Oa(e, Ae);
          f !== null && or(f, e, Ae, $t);
        }
      }, vT = function(e, t, a) {
        var i = z0(e, t);
        if (i !== null) {
          var u = RT(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = lt({}, e.memoizedProps);
          var s = Oa(e, Ae);
          s !== null && or(s, e, Ae, $t);
        }
      }, hT = function(e, t, a, i) {
        var u = z0(e, t);
        if (u !== null) {
          var s = wT(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = lt({}, e.memoizedProps);
          var f = Oa(e, Ae);
          f !== null && or(f, e, Ae, $t);
        }
      }, mT = function(e, t, a) {
        e.pendingProps = DT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Oa(e, Ae);
        i !== null && or(i, e, Ae, $t);
      }, yT = function(e, t) {
        e.pendingProps = RT(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Oa(e, Ae);
        a !== null && or(a, e, Ae, $t);
      }, gT = function(e, t, a) {
        e.pendingProps = wT(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Oa(e, Ae);
        i !== null && or(i, e, Ae, $t);
      }, ST = function(e) {
        var t = Oa(e, Ae);
        t !== null && or(t, e, Ae, $t);
      }, ET = function(e) {
        fT = e;
      }, CT = function(e) {
        dT = e;
      };
    }
    function L_(e) {
      var t = Ea(e);
      return t === null ? null : t.stateNode;
    }
    function M_(e) {
      return null;
    }
    function N_() {
      return Sn;
    }
    function U_(e) {
      var t = e.findFiberByHostInstance, a = y.ReactCurrentDispatcher;
      return yd({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: pT,
        overrideHookStateDeletePath: vT,
        overrideHookStateRenamePath: hT,
        overrideProps: mT,
        overridePropsDeletePath: yT,
        overridePropsRenamePath: gT,
        setErrorHandler: ET,
        setSuspenseHandler: CT,
        scheduleUpdate: ST,
        currentDispatcherRef: a,
        findHostInstanceByFiber: L_,
        findFiberByHostInstance: t || M_,
        // React Refresh
        findHostInstancesForRefresh: c_,
        scheduleRefresh: o_,
        scheduleRoot: s_,
        setRefreshHandler: u_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: N_,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: L0
      });
    }
    var _T = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function A0(e) {
      this._internalRoot = e;
    }
    Xm.prototype.render = A0.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Km(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== En) {
          var i = cT(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Bp(e, t, null, null);
    }, Xm.prototype.unmount = A0.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        j1() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), au(function() {
          Bp(null, e, null, null);
        }), _E(t);
      }
    };
    function z_(e, t) {
      if (!Km(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      kT(e);
      var a = !1, i = !1, u = "", s = _T;
      t != null && (t.hydrate ? k("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === di && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = uT(e, Ih, null, a, i, u, s);
      Hh(f.current, e);
      var p = e.nodeType === En ? e.parentNode : e;
      return Wd(p), new A0(f);
    }
    function Xm(e) {
      this._internalRoot = e;
    }
    function A_(e) {
      e && Hy(e);
    }
    Xm.prototype.unstable_scheduleHydration = A_;
    function F_(e, t, a) {
      if (!Km(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      kT(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = _T;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var g = oT(t, null, e, Ih, i, s, f, p, v);
      if (Hh(g.current, e), Wd(e), u)
        for (var E = 0; E < u.length; E++) {
          var _ = u[E];
          Bw(g, _);
        }
      return new Xm(g);
    }
    function Km(e) {
      return !!(e && (e.nodeType === Mr || e.nodeType === Ba || e.nodeType === wl || !gt));
    }
    function Pp(e) {
      return !!(e && (e.nodeType === Mr || e.nodeType === Ba || e.nodeType === wl || e.nodeType === En && e.nodeValue === " react-mount-point-unstable "));
    }
    function kT(e) {
      e.nodeType === Mr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), ap(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var H_ = y.ReactCurrentOwner, OT;
    OT = function(e) {
      if (e._reactRootContainer && e.nodeType !== En) {
        var t = cT(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = F0(e), u = !!(i && no(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Mr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function F0(e) {
      return e ? e.nodeType === Ba ? e.documentElement : e.firstChild : null;
    }
    function LT() {
    }
    function V_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var b = qm(f);
            s.call(b);
          };
        }
        var f = oT(
          t,
          i,
          e,
          ao,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          LT
        );
        e._reactRootContainer = f, Hh(f.current, e);
        var p = e.nodeType === En ? e.parentNode : e;
        return Wd(p), au(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var g = i;
          i = function() {
            var b = qm(E);
            g.call(b);
          };
        }
        var E = uT(
          e,
          ao,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          LT
        );
        e._reactRootContainer = E, Hh(E.current, e);
        var _ = e.nodeType === En ? e.parentNode : e;
        return Wd(_), au(function() {
          Bp(t, E, a, i);
        }), E;
      }
    }
    function j_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Zm(e, t, a, i, u) {
      OT(a), j_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = V_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = qm(f);
            p.call(v);
          };
        }
        Bp(t, f, e, u);
      }
      return qm(f);
    }
    var MT = !1;
    function B_(e) {
      {
        MT || (MT = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = H_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Nt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Mr ? e : w_(e, "findDOMNode");
    }
    function P_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = ap(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Zm(null, e, t, !0, a);
    }
    function $_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = ap(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Zm(null, e, t, !1, a);
    }
    function Y_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Pp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !$o(e))
        throw new Error("parentComponent must be a valid React Component");
      return Zm(e, t, a, !1, i);
    }
    var NT = !1;
    function I_(e) {
      if (NT || (NT = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Pp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = ap(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = F0(e), i = a && !no(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return au(function() {
          Zm(null, null, e, !1, function() {
            e._reactRootContainer = null, _E(e);
          });
        }), !0;
      } else {
        {
          var u = F0(e), s = !!(u && no(u)), f = e.nodeType === Mr && Pp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Pu(b_), Ay(D_), Ac(__), lh(xa), uh(hr), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), Av(WR), Js(v0, FD, au);
    function Q_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Km(t))
        throw new Error("Target container is not a DOM element.");
      return x_(e, t, null, a);
    }
    function W_(e, t, a, i) {
      return Y_(e, t, a, i);
    }
    var H0 = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [no, lf, Vh, Zs, jo, v0]
    };
    function G_(e, t) {
      return H0.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), z_(e, t);
    }
    function q_(e, t, a) {
      return H0.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), F_(e, t, a);
    }
    function X_(e) {
      return j1() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), au(e);
    }
    var K_ = U_({
      findFiberByHostInstance: ms,
      bundleType: 1,
      version: L0,
      rendererPackageName: "react-dom"
    });
    if (!K_ && fn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var UT = window.location.protocol;
      /^(https?|file):$/.test(UT) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (UT === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    za.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = H0, za.createPortal = Q_, za.createRoot = G_, za.findDOMNode = B_, za.flushSync = X_, za.hydrate = P_, za.hydrateRoot = q_, za.render = $_, za.unmountComponentAtNode = I_, za.unstable_batchedUpdates = v0, za.unstable_renderSubtreeIntoContainer = W_, za.version = L0, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), za;
}
function eR() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(eR);
    } catch (h) {
      console.error(h);
    }
  }
}
process.env.NODE_ENV === "production" ? (eR(), Q0.exports = ak()) : Q0.exports = ik();
var lk = Q0.exports, W0, ey = lk;
if (process.env.NODE_ENV === "production")
  W0 = ey.createRoot, ey.hydrateRoot;
else {
  var jT = ey.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  W0 = function(h, C) {
    jT.usingClientEntryPoint = !0;
    try {
      return ey.createRoot(h, C);
    } finally {
      jT.usingClientEntryPoint = !1;
    }
  };
}
var uk = Object.defineProperty, ok = (h, C, y) => C in h ? uk(h, C, { enumerable: !0, configurable: !0, writable: !0, value: y }) : h[C] = y, ty = (h, C, y) => (ok(h, typeof C != "symbol" ? C + "" : C, y), y);
const sk = {
  stringify: (h) => h,
  parse: (h) => h
}, ck = {
  stringify: (h) => `${h}`,
  parse: (h) => parseFloat(h)
}, fk = {
  stringify: (h) => h ? "true" : "false",
  parse: (h) => /^[ty1-9]/i.test(h)
}, dk = {
  stringify: (h) => h.name,
  parse: (h, C, y) => {
    const L = (() => {
      if (typeof window < "u" && h in window)
        return window[h];
      if (typeof global < "u" && h in global)
        return global[h];
    })();
    return typeof L == "function" ? L.bind(y) : void 0;
  }
}, pk = {
  stringify: (h) => JSON.stringify(h),
  parse: (h) => JSON.parse(h)
}, B0 = {
  string: sk,
  number: ck,
  boolean: fk,
  function: dk,
  json: pk
};
function vk(h) {
  return h.replace(
    /([a-z0-9])([A-Z])/g,
    (C, y, L) => `${y}-${L.toLowerCase()}`
  );
}
const ny = Symbol.for("r2wc.render"), ry = Symbol.for("r2wc.connected"), Ms = Symbol.for("r2wc.context"), So = Symbol.for("r2wc.props");
function hk(h, C, y) {
  var L, P, k;
  C.props || (C.props = h.propTypes ? Object.keys(h.propTypes) : []);
  const S = Array.isArray(C.props) ? C.props.slice() : Object.keys(C.props), te = {}, ne = {}, se = {};
  for (const Y of S) {
    te[Y] = Array.isArray(C.props) ? "string" : C.props[Y];
    const ce = vk(Y);
    ne[Y] = ce, se[ce] = Y;
  }
  class De extends HTMLElement {
    constructor() {
      super(), ty(this, L, !0), ty(this, P), ty(this, k, {}), ty(this, "container"), C.shadow ? this.container = this.attachShadow({
        mode: C.shadow
      }) : this.container = this, this[So].container = this.container;
      for (const ce of S) {
        const ie = ne[ce], xe = this.getAttribute(ie), Ze = te[ce], Ge = Ze ? B0[Ze] : null;
        Ge != null && Ge.parse && xe && (this[So][ce] = Ge.parse(xe, ie, this));
      }
    }
    static get observedAttributes() {
      return Object.keys(se);
    }
    connectedCallback() {
      this[ry] = !0, this[ny]();
    }
    disconnectedCallback() {
      this[ry] = !1, this[Ms] && y.unmount(this[Ms]), delete this[Ms];
    }
    attributeChangedCallback(ce, ie, xe) {
      const Ze = se[ce], Ge = te[Ze], wt = Ge ? B0[Ge] : null;
      Ze in te && wt != null && wt.parse && xe && (this[So][Ze] = wt.parse(xe, ce, this), this[ny]());
    }
    [(L = ry, P = Ms, k = So, ny)]() {
      this[ry] && (this[Ms] ? y.update(this[Ms], this[So]) : this[Ms] = y.mount(
        this.container,
        h,
        this[So]
      ));
    }
  }
  for (const Y of S) {
    const ce = ne[Y], ie = te[Y];
    Object.defineProperty(De.prototype, Y, {
      enumerable: !0,
      configurable: !0,
      get() {
        return this[So][Y];
      },
      set(xe) {
        this[So][Y] = xe;
        const Ze = ie ? B0[ie] : null;
        if (Ze != null && Ze.stringify) {
          const Ge = Ze.stringify(xe, ce, this);
          this.getAttribute(ce) !== Ge && this.setAttribute(ce, Ge);
        } else
          this[ny]();
      }
    });
  }
  return De;
}
function mk(h, C, y) {
  const L = W0(h), P = wn.createElement(C, y);
  return L.render(P), {
    root: L,
    ReactComponent: C
  };
}
function yk({ root: h, ReactComponent: C }, y) {
  const L = wn.createElement(C, y);
  h.render(L);
}
function gk({ root: h }) {
  h.unmount();
}
function q0(h, C = {}) {
  return hk(h, C, { mount: mk, update: yk, unmount: gk });
}
var G0 = { exports: {} }, Yp = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var BT;
function Sk() {
  if (BT) return Yp;
  BT = 1;
  var h = wn, C = Symbol.for("react.element"), y = Symbol.for("react.fragment"), L = Object.prototype.hasOwnProperty, P = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, k = { key: !0, ref: !0, __self: !0, __source: !0 };
  function S(te, ne, se) {
    var De, Y = {}, ce = null, ie = null;
    se !== void 0 && (ce = "" + se), ne.key !== void 0 && (ce = "" + ne.key), ne.ref !== void 0 && (ie = ne.ref);
    for (De in ne) L.call(ne, De) && !k.hasOwnProperty(De) && (Y[De] = ne[De]);
    if (te && te.defaultProps) for (De in ne = te.defaultProps, ne) Y[De] === void 0 && (Y[De] = ne[De]);
    return { $$typeof: C, type: te, key: ce, ref: ie, props: Y, _owner: P.current };
  }
  return Yp.Fragment = y, Yp.jsx = S, Yp.jsxs = S, Yp;
}
var Ip = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var PT;
function Ek() {
  return PT || (PT = 1, process.env.NODE_ENV !== "production" && function() {
    var h = wn, C = Symbol.for("react.element"), y = Symbol.for("react.portal"), L = Symbol.for("react.fragment"), P = Symbol.for("react.strict_mode"), k = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), te = Symbol.for("react.context"), ne = Symbol.for("react.forward_ref"), se = Symbol.for("react.suspense"), De = Symbol.for("react.suspense_list"), Y = Symbol.for("react.memo"), ce = Symbol.for("react.lazy"), ie = Symbol.for("react.offscreen"), xe = Symbol.iterator, Ze = "@@iterator";
    function Ge(R) {
      if (R === null || typeof R != "object")
        return null;
      var G = xe && R[xe] || R[Ze];
      return typeof G == "function" ? G : null;
    }
    var wt = h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function Ee(R) {
      {
        for (var G = arguments.length, le = new Array(G > 1 ? G - 1 : 0), ze = 1; ze < G; ze++)
          le[ze - 1] = arguments[ze];
        Ie("error", R, le);
      }
    }
    function Ie(R, G, le) {
      {
        var ze = wt.ReactDebugCurrentFrame, dt = ze.getStackAddendum();
        dt !== "" && (G += "%s", le = le.concat([dt]));
        var St = le.map(function($e) {
          return String($e);
        });
        St.unshift("Warning: " + G), Function.prototype.apply.call(console[R], console, St);
      }
    }
    var ot = !1, Ne = !1, Ct = !1, Xe = !1, Yt = !1, Jt;
    Jt = Symbol.for("react.module.reference");
    function pt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === L || R === k || Yt || R === P || R === se || R === De || Xe || R === ie || ot || Ne || Ct || typeof R == "object" && R !== null && (R.$$typeof === ce || R.$$typeof === Y || R.$$typeof === S || R.$$typeof === te || R.$$typeof === ne || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Jt || R.getModuleId !== void 0));
    }
    function Et(R, G, le) {
      var ze = R.displayName;
      if (ze)
        return ze;
      var dt = G.displayName || G.name || "";
      return dt !== "" ? le + "(" + dt + ")" : le;
    }
    function Ve(R) {
      return R.displayName || "Context";
    }
    function fe(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && Ee("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case L:
          return "Fragment";
        case y:
          return "Portal";
        case k:
          return "Profiler";
        case P:
          return "StrictMode";
        case se:
          return "Suspense";
        case De:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case te:
            var G = R;
            return Ve(G) + ".Consumer";
          case S:
            var le = R;
            return Ve(le._context) + ".Provider";
          case ne:
            return Et(R, R.render, "ForwardRef");
          case Y:
            var ze = R.displayName || null;
            return ze !== null ? ze : fe(R.type) || "Memo";
          case ce: {
            var dt = R, St = dt._payload, $e = dt._init;
            try {
              return fe($e(St));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Fe = Object.assign, vt = 0, st, Ut, ee, Oe, de, ht, gt;
    function bn() {
    }
    bn.__reactDisabledLog = !0;
    function An() {
      {
        if (vt === 0) {
          st = console.log, Ut = console.info, ee = console.warn, Oe = console.error, de = console.group, ht = console.groupCollapsed, gt = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: bn,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        vt++;
      }
    }
    function ca() {
      {
        if (vt--, vt === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Fe({}, R, {
              value: st
            }),
            info: Fe({}, R, {
              value: Ut
            }),
            warn: Fe({}, R, {
              value: ee
            }),
            error: Fe({}, R, {
              value: Oe
            }),
            group: Fe({}, R, {
              value: de
            }),
            groupCollapsed: Fe({}, R, {
              value: ht
            }),
            groupEnd: Fe({}, R, {
              value: gt
            })
          });
        }
        vt < 0 && Ee("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var en = wt.ReactCurrentDispatcher, yr;
    function gn(R, G, le) {
      {
        if (yr === void 0)
          try {
            throw Error();
          } catch (dt) {
            var ze = dt.stack.trim().match(/\n( *(at )?)/);
            yr = ze && ze[1] || "";
          }
        return `
` + yr + R;
      }
    }
    var qn = !1, fa;
    {
      var Xn = typeof WeakMap == "function" ? WeakMap : Map;
      fa = new Xn();
    }
    function kr(R, G) {
      if (!R || qn)
        return "";
      {
        var le = fa.get(R);
        if (le !== void 0)
          return le;
      }
      var ze;
      qn = !0;
      var dt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var St;
      St = en.current, en.current = null, An();
      try {
        if (G) {
          var $e = function() {
            throw Error();
          };
          if (Object.defineProperty($e.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct($e, []);
            } catch (cr) {
              ze = cr;
            }
            Reflect.construct(R, [], $e);
          } else {
            try {
              $e.call();
            } catch (cr) {
              ze = cr;
            }
            R.call($e.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (cr) {
            ze = cr;
          }
          R();
        }
      } catch (cr) {
        if (cr && ze && typeof cr.stack == "string") {
          for (var it = cr.stack.split(`
`), jn = ze.stack.split(`
`), It = it.length - 1, tn = jn.length - 1; It >= 1 && tn >= 0 && it[It] !== jn[tn]; )
            tn--;
          for (; It >= 1 && tn >= 0; It--, tn--)
            if (it[It] !== jn[tn]) {
              if (It !== 1 || tn !== 1)
                do
                  if (It--, tn--, tn < 0 || it[It] !== jn[tn]) {
                    var Lr = `
` + it[It].replace(" at new ", " at ");
                    return R.displayName && Lr.includes("<anonymous>") && (Lr = Lr.replace("<anonymous>", R.displayName)), typeof R == "function" && fa.set(R, Lr), Lr;
                  }
                while (It >= 1 && tn >= 0);
              break;
            }
        }
      } finally {
        qn = !1, en.current = St, ca(), Error.prepareStackTrace = dt;
      }
      var Bi = R ? R.displayName || R.name : "", kt = Bi ? gn(Bi) : "";
      return typeof R == "function" && fa.set(R, kt), kt;
    }
    function fn(R, G, le) {
      return kr(R, !1);
    }
    function Dn(R) {
      var G = R.prototype;
      return !!(G && G.isReactComponent);
    }
    function Fn(R, G, le) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return kr(R, Dn(R));
      if (typeof R == "string")
        return gn(R);
      switch (R) {
        case se:
          return gn("Suspense");
        case De:
          return gn("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case ne:
            return fn(R.render);
          case Y:
            return Fn(R.type, G, le);
          case ce: {
            var ze = R, dt = ze._payload, St = ze._init;
            try {
              return Fn(St(dt), G, le);
            } catch {
            }
          }
        }
      return "";
    }
    var Hn = Object.prototype.hasOwnProperty, Kn = {}, x = wt.ReactDebugCurrentFrame;
    function U(R) {
      if (R) {
        var G = R._owner, le = Fn(R.type, R._source, G ? G.type : null);
        x.setExtraStackFrame(le);
      } else
        x.setExtraStackFrame(null);
    }
    function V(R, G, le, ze, dt) {
      {
        var St = Function.call.bind(Hn);
        for (var $e in R)
          if (St(R, $e)) {
            var it = void 0;
            try {
              if (typeof R[$e] != "function") {
                var jn = Error((ze || "React class") + ": " + le + " type `" + $e + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[$e] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw jn.name = "Invariant Violation", jn;
              }
              it = R[$e](G, $e, ze, le, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (It) {
              it = It;
            }
            it && !(it instanceof Error) && (U(dt), Ee("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ze || "React class", le, $e, typeof it), U(null)), it instanceof Error && !(it.message in Kn) && (Kn[it.message] = !0, U(dt), Ee("Failed %s type: %s", le, it.message), U(null));
          }
      }
    }
    var re = Array.isArray;
    function Z(R) {
      return re(R);
    }
    function q(R) {
      {
        var G = typeof Symbol == "function" && Symbol.toStringTag, le = G && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return le;
      }
    }
    function Se(R) {
      try {
        return Je(R), !1;
      } catch {
        return !0;
      }
    }
    function Je(R) {
      return "" + R;
    }
    function _t(R) {
      if (Se(R))
        return Ee("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", q(R)), Je(R);
    }
    var at = wt.ReactCurrentOwner, dn = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, qa, gr, ae;
    ae = {};
    function Ue(R) {
      if (Hn.call(R, "ref")) {
        var G = Object.getOwnPropertyDescriptor(R, "ref").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function rt(R) {
      if (Hn.call(R, "key")) {
        var G = Object.getOwnPropertyDescriptor(R, "key").get;
        if (G && G.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function bt(R, G) {
      if (typeof R.ref == "string" && at.current && G && at.current.stateNode !== G) {
        var le = fe(at.current.type);
        ae[le] || (Ee('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', fe(at.current.type), R.ref), ae[le] = !0);
      }
    }
    function jt(R, G) {
      {
        var le = function() {
          qa || (qa = !0, Ee("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        le.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: le,
          configurable: !0
        });
      }
    }
    function Vn(R, G) {
      {
        var le = function() {
          gr || (gr = !0, Ee("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", G));
        };
        le.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: le,
          configurable: !0
        });
      }
    }
    var pn = function(R, G, le, ze, dt, St, $e) {
      var it = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: C,
        // Built-in properties that belong on the element
        type: R,
        key: G,
        ref: le,
        props: $e,
        // Record the component responsible for creating this element.
        _owner: St
      };
      return it._store = {}, Object.defineProperty(it._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(it, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ze
      }), Object.defineProperty(it, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: dt
      }), Object.freeze && (Object.freeze(it.props), Object.freeze(it)), it;
    };
    function Or(R, G, le, ze, dt) {
      {
        var St, $e = {}, it = null, jn = null;
        le !== void 0 && (_t(le), it = "" + le), rt(G) && (_t(G.key), it = "" + G.key), Ue(G) && (jn = G.ref, bt(G, dt));
        for (St in G)
          Hn.call(G, St) && !dn.hasOwnProperty(St) && ($e[St] = G[St]);
        if (R && R.defaultProps) {
          var It = R.defaultProps;
          for (St in It)
            $e[St] === void 0 && ($e[St] = It[St]);
        }
        if (it || jn) {
          var tn = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          it && jt($e, tn), jn && Vn($e, tn);
        }
        return pn(R, it, jn, dt, ze, at.current, $e);
      }
    }
    var Bt = wt.ReactCurrentOwner, Gr = wt.ReactDebugCurrentFrame;
    function Ht(R) {
      if (R) {
        var G = R._owner, le = Fn(R.type, R._source, G ? G.type : null);
        Gr.setExtraStackFrame(le);
      } else
        Gr.setExtraStackFrame(null);
    }
    var Pt;
    Pt = !1;
    function su(R) {
      return typeof R == "object" && R !== null && R.$$typeof === C;
    }
    function gl() {
      {
        if (Bt.current) {
          var R = fe(Bt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function cu(R) {
      return "";
    }
    var Co = {};
    function Ns(R) {
      {
        var G = gl();
        if (!G) {
          var le = typeof R == "string" ? R : R.displayName || R.name;
          le && (G = `

Check the top-level render call using <` + le + ">.");
        }
        return G;
      }
    }
    function Sl(R, G) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var le = Ns(G);
        if (Co[le])
          return;
        Co[le] = !0;
        var ze = "";
        R && R._owner && R._owner !== Bt.current && (ze = " It was passed a child from " + fe(R._owner.type) + "."), Ht(R), Ee('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', le, ze), Ht(null);
      }
    }
    function fu(R, G) {
      {
        if (typeof R != "object")
          return;
        if (Z(R))
          for (var le = 0; le < R.length; le++) {
            var ze = R[le];
            su(ze) && Sl(ze, G);
          }
        else if (su(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var dt = Ge(R);
          if (typeof dt == "function" && dt !== R.entries)
            for (var St = dt.call(R), $e; !($e = St.next()).done; )
              su($e.value) && Sl($e.value, G);
        }
      }
    }
    function El(R) {
      {
        var G = R.type;
        if (G == null || typeof G == "string")
          return;
        var le;
        if (typeof G == "function")
          le = G.propTypes;
        else if (typeof G == "object" && (G.$$typeof === ne || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        G.$$typeof === Y))
          le = G.propTypes;
        else
          return;
        if (le) {
          var ze = fe(G);
          V(le, R.props, "prop", ze, R);
        } else if (G.PropTypes !== void 0 && !Pt) {
          Pt = !0;
          var dt = fe(G);
          Ee("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", dt || "Unknown");
        }
        typeof G.getDefaultProps == "function" && !G.getDefaultProps.isReactClassApproved && Ee("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function du(R) {
      {
        for (var G = Object.keys(R.props), le = 0; le < G.length; le++) {
          var ze = G[le];
          if (ze !== "children" && ze !== "key") {
            Ht(R), Ee("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ze), Ht(null);
            break;
          }
        }
        R.ref !== null && (Ht(R), Ee("Invalid attribute `ref` supplied to `React.Fragment`."), Ht(null));
      }
    }
    var Xa = {};
    function di(R, G, le, ze, dt, St) {
      {
        var $e = pt(R);
        if (!$e) {
          var it = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (it += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var jn = cu();
          jn ? it += jn : it += gl();
          var It;
          R === null ? It = "null" : Z(R) ? It = "array" : R !== void 0 && R.$$typeof === C ? (It = "<" + (fe(R.type) || "Unknown") + " />", it = " Did you accidentally export a JSX literal instead of a component?") : It = typeof R, Ee("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", It, it);
        }
        var tn = Or(R, G, le, dt, St);
        if (tn == null)
          return tn;
        if ($e) {
          var Lr = G.children;
          if (Lr !== void 0)
            if (ze)
              if (Z(Lr)) {
                for (var Bi = 0; Bi < Lr.length; Bi++)
                  fu(Lr[Bi], R);
                Object.freeze && Object.freeze(Lr);
              } else
                Ee("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              fu(Lr, R);
        }
        if (Hn.call(G, "key")) {
          var kt = fe(R), cr = Object.keys(G).filter(function(Ka) {
            return Ka !== "key";
          }), Xr = cr.length > 0 ? "{key: someKey, " + cr.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!Xa[kt + Xr]) {
            var lt = cr.length > 0 ? "{" + cr.join(": ..., ") + ": ...}" : "{}";
            Ee(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Xr, kt, lt, kt), Xa[kt + Xr] = !0;
          }
        }
        return R === L ? du(tn) : El(tn), tn;
      }
    }
    function qr(R, G, le) {
      return di(R, G, le, !0);
    }
    function Fa(R, G, le) {
      return di(R, G, le, !1);
    }
    var ji = Fa, Cl = qr;
    Ip.Fragment = L, Ip.jsx = ji, Ip.jsxs = Cl;
  }()), Ip;
}
process.env.NODE_ENV === "production" ? G0.exports = Sk() : G0.exports = Ek();
var xn = G0.exports;
const Ck = "_wrapper_5bkbt_1", Tk = "_logo_5bkbt_19", Rk = "_title_5bkbt_33", P0 = {
  wrapper: Ck,
  logo: Tk,
  title: Rk
}, xk = ({ text: h, image: C }) => /* @__PURE__ */ xn.jsx("header", { children: /* @__PURE__ */ xn.jsxs("div", { className: P0.wrapper, children: [
  /* @__PURE__ */ xn.jsx("div", { children: /* @__PURE__ */ xn.jsx("img", { width: 150, height: 150, className: P0.logo, src: C }) }),
  /* @__PURE__ */ xn.jsx("h1", { className: P0.title, children: h })
] }) });
var qp = (h) => h.type === "checkbox", Mf = (h) => h instanceof Date, sa = (h) => h == null;
const tR = (h) => typeof h == "object";
var Gn = (h) => !sa(h) && !Array.isArray(h) && tR(h) && !Mf(h), wk = (h) => Gn(h) && h.target ? qp(h.target) ? h.target.checked : h.target.value : h, bk = (h) => h.substring(0, h.search(/\.\d+(\.|$)/)) || h, Dk = (h, C) => h.has(bk(C)), _k = (h) => {
  const C = h.constructor && h.constructor.prototype;
  return Gn(C) && C.hasOwnProperty("isPrototypeOf");
}, X0 = typeof window < "u" && typeof window.HTMLElement < "u" && typeof document < "u";
function Ga(h) {
  let C;
  const y = Array.isArray(h);
  if (h instanceof Date)
    C = new Date(h);
  else if (h instanceof Set)
    C = new Set(h);
  else if (!(X0 && (h instanceof Blob || h instanceof FileList)) && (y || Gn(h)))
    if (C = y ? [] : {}, !y && !_k(h))
      C = h;
    else
      for (const L in h)
        h.hasOwnProperty(L) && (C[L] = Ga(h[L]));
  else
    return h;
  return C;
}
var cy = (h) => Array.isArray(h) ? h.filter(Boolean) : [], zn = (h) => h === void 0, be = (h, C, y) => {
  if (!C || !Gn(h))
    return y;
  const L = cy(C.split(/[,[\].]+?/)).reduce((P, k) => sa(P) ? P : P[k], h);
  return zn(L) || L === h ? zn(h[C]) ? y : h[C] : L;
}, ml = (h) => typeof h == "boolean", K0 = (h) => /^\w*$/.test(h), nR = (h) => cy(h.replace(/["|']|\]/g, "").split(/\.|\[/)), ln = (h, C, y) => {
  let L = -1;
  const P = K0(C) ? [C] : nR(C), k = P.length, S = k - 1;
  for (; ++L < k; ) {
    const te = P[L];
    let ne = y;
    if (L !== S) {
      const se = h[te];
      ne = Gn(se) || Array.isArray(se) ? se : isNaN(+P[L + 1]) ? {} : [];
    }
    if (te === "__proto__")
      return;
    h[te] = ne, h = h[te];
  }
  return h;
};
const $T = {
  BLUR: "blur",
  FOCUS_OUT: "focusout",
  CHANGE: "change"
}, Vi = {
  onBlur: "onBlur",
  onChange: "onChange",
  onSubmit: "onSubmit",
  onTouched: "onTouched",
  all: "all"
}, uu = {
  max: "max",
  min: "min",
  maxLength: "maxLength",
  minLength: "minLength",
  pattern: "pattern",
  required: "required",
  validate: "validate"
}, kk = wn.createContext(null), Ok = () => wn.useContext(kk);
var Lk = (h, C, y, L = !0) => {
  const P = {
    defaultValues: C._defaultValues
  };
  for (const k in h)
    Object.defineProperty(P, k, {
      get: () => {
        const S = k;
        return C._proxyFormState[S] !== Vi.all && (C._proxyFormState[S] = !L || Vi.all), h[S];
      }
    });
  return P;
}, Aa = (h) => Gn(h) && !Object.keys(h).length, Mk = (h, C, y, L) => {
  y(h);
  const { name: P, ...k } = h;
  return Aa(k) || Object.keys(k).length >= Object.keys(C).length || Object.keys(k).find((S) => C[S] === Vi.all);
}, Wp = (h) => Array.isArray(h) ? h : [h], Nk = (h, C, y) => !h || !C || h === C || Wp(h).some((L) => L && (y ? L === C : L.startsWith(C) || C.startsWith(L)));
function rR(h) {
  const C = wn.useRef(h);
  C.current = h, wn.useEffect(() => {
    const y = !h.disabled && C.current.subject && C.current.subject.subscribe({
      next: C.current.next
    });
    return () => {
      y && y.unsubscribe();
    };
  }, [h.disabled]);
}
var yl = (h) => typeof h == "string", aR = (h, C, y, L, P) => yl(h) ? (L && C.watch.add(h), be(y, h, P)) : Array.isArray(h) ? h.map((k) => (L && C.watch.add(k), be(y, k))) : (L && (C.watchAll = !0), y);
function Uk(h) {
  const C = Ok(), { control: y = C.control, name: L, defaultValue: P, disabled: k, exact: S } = h || {}, te = wn.useRef(L);
  te.current = L, rR({
    disabled: k,
    subject: y._subjects.values,
    next: (De) => {
      Nk(te.current, De.name, S) && se(Ga(aR(te.current, y._names, De.values || y._formValues, !1, P)));
    }
  });
  const [ne, se] = wn.useState(y._getWatch(L, P));
  return wn.useEffect(() => y._removeUnmounted()), ne;
}
var zk = (h, C, y, L, P) => C ? {
  ...y[h],
  types: {
    ...y[h] && y[h].types ? y[h].types : {},
    [L]: P || !0
  }
} : {}, YT = (h) => ({
  isOnSubmit: !h || h === Vi.onSubmit,
  isOnBlur: h === Vi.onBlur,
  isOnChange: h === Vi.onChange,
  isOnAll: h === Vi.all,
  isOnTouch: h === Vi.onTouched
}), IT = (h, C, y) => !y && (C.watchAll || C.watch.has(h) || [...C.watch].some((L) => h.startsWith(L) && /^\.\w+/.test(h.slice(L.length))));
const Gp = (h, C, y, L) => {
  for (const P of y || Object.keys(h)) {
    const k = be(h, P);
    if (k) {
      const { _f: S, ...te } = k;
      if (S) {
        if (S.refs && S.refs[0] && C(S.refs[0], P) && !L)
          return !0;
        if (S.ref && C(S.ref, S.name) && !L)
          return !0;
        if (Gp(te, C))
          break;
      } else if (Gn(te) && Gp(te, C))
        break;
    }
  }
};
var Ak = (h, C, y) => {
  const L = Wp(be(h, y));
  return ln(L, "root", C[y]), ln(h, y, L), h;
}, Z0 = (h) => h.type === "file", ou = (h) => typeof h == "function", ly = (h) => {
  if (!X0)
    return !1;
  const C = h ? h.ownerDocument : 0;
  return h instanceof (C && C.defaultView ? C.defaultView.HTMLElement : HTMLElement);
}, iy = (h) => yl(h), J0 = (h) => h.type === "radio", uy = (h) => h instanceof RegExp;
const QT = {
  value: !1,
  isValid: !1
}, WT = { value: !0, isValid: !0 };
var iR = (h) => {
  if (Array.isArray(h)) {
    if (h.length > 1) {
      const C = h.filter((y) => y && y.checked && !y.disabled).map((y) => y.value);
      return { value: C, isValid: !!C.length };
    }
    return h[0].checked && !h[0].disabled ? (
      // @ts-expect-error expected to work in the browser
      h[0].attributes && !zn(h[0].attributes.value) ? zn(h[0].value) || h[0].value === "" ? WT : { value: h[0].value, isValid: !0 } : WT
    ) : QT;
  }
  return QT;
};
const GT = {
  isValid: !1,
  value: null
};
var lR = (h) => Array.isArray(h) ? h.reduce((C, y) => y && y.checked && !y.disabled ? {
  isValid: !0,
  value: y.value
} : C, GT) : GT;
function qT(h, C, y = "validate") {
  if (iy(h) || Array.isArray(h) && h.every(iy) || ml(h) && !h)
    return {
      type: y,
      message: iy(h) ? h : "",
      ref: C
    };
}
var Lf = (h) => Gn(h) && !uy(h) ? h : {
  value: h,
  message: ""
}, XT = async (h, C, y, L, P) => {
  const { ref: k, refs: S, required: te, maxLength: ne, minLength: se, min: De, max: Y, pattern: ce, validate: ie, name: xe, valueAsNumber: Ze, mount: Ge, disabled: wt } = h._f, Ee = be(C, xe);
  if (!Ge || wt)
    return {};
  const Ie = S ? S[0] : k, ot = (Ve) => {
    L && Ie.reportValidity && (Ie.setCustomValidity(ml(Ve) ? "" : Ve || ""), Ie.reportValidity());
  }, Ne = {}, Ct = J0(k), Xe = qp(k), Yt = Ct || Xe, Jt = (Ze || Z0(k)) && zn(k.value) && zn(Ee) || ly(k) && k.value === "" || Ee === "" || Array.isArray(Ee) && !Ee.length, pt = zk.bind(null, xe, y, Ne), Et = (Ve, fe, Fe, vt = uu.maxLength, st = uu.minLength) => {
    const Ut = Ve ? fe : Fe;
    Ne[xe] = {
      type: Ve ? vt : st,
      message: Ut,
      ref: k,
      ...pt(Ve ? vt : st, Ut)
    };
  };
  if (P ? !Array.isArray(Ee) || !Ee.length : te && (!Yt && (Jt || sa(Ee)) || ml(Ee) && !Ee || Xe && !iR(S).isValid || Ct && !lR(S).isValid)) {
    const { value: Ve, message: fe } = iy(te) ? { value: !!te, message: te } : Lf(te);
    if (Ve && (Ne[xe] = {
      type: uu.required,
      message: fe,
      ref: Ie,
      ...pt(uu.required, fe)
    }, !y))
      return ot(fe), Ne;
  }
  if (!Jt && (!sa(De) || !sa(Y))) {
    let Ve, fe;
    const Fe = Lf(Y), vt = Lf(De);
    if (!sa(Ee) && !isNaN(Ee)) {
      const st = k.valueAsNumber || Ee && +Ee;
      sa(Fe.value) || (Ve = st > Fe.value), sa(vt.value) || (fe = st < vt.value);
    } else {
      const st = k.valueAsDate || new Date(Ee), Ut = (de) => /* @__PURE__ */ new Date((/* @__PURE__ */ new Date()).toDateString() + " " + de), ee = k.type == "time", Oe = k.type == "week";
      yl(Fe.value) && Ee && (Ve = ee ? Ut(Ee) > Ut(Fe.value) : Oe ? Ee > Fe.value : st > new Date(Fe.value)), yl(vt.value) && Ee && (fe = ee ? Ut(Ee) < Ut(vt.value) : Oe ? Ee < vt.value : st < new Date(vt.value));
    }
    if ((Ve || fe) && (Et(!!Ve, Fe.message, vt.message, uu.max, uu.min), !y))
      return ot(Ne[xe].message), Ne;
  }
  if ((ne || se) && !Jt && (yl(Ee) || P && Array.isArray(Ee))) {
    const Ve = Lf(ne), fe = Lf(se), Fe = !sa(Ve.value) && Ee.length > +Ve.value, vt = !sa(fe.value) && Ee.length < +fe.value;
    if ((Fe || vt) && (Et(Fe, Ve.message, fe.message), !y))
      return ot(Ne[xe].message), Ne;
  }
  if (ce && !Jt && yl(Ee)) {
    const { value: Ve, message: fe } = Lf(ce);
    if (uy(Ve) && !Ee.match(Ve) && (Ne[xe] = {
      type: uu.pattern,
      message: fe,
      ref: k,
      ...pt(uu.pattern, fe)
    }, !y))
      return ot(fe), Ne;
  }
  if (ie) {
    if (ou(ie)) {
      const Ve = await ie(Ee, C), fe = qT(Ve, Ie);
      if (fe && (Ne[xe] = {
        ...fe,
        ...pt(uu.validate, fe.message)
      }, !y))
        return ot(fe.message), Ne;
    } else if (Gn(ie)) {
      let Ve = {};
      for (const fe in ie) {
        if (!Aa(Ve) && !y)
          break;
        const Fe = qT(await ie[fe](Ee, C), Ie, fe);
        Fe && (Ve = {
          ...Fe,
          ...pt(fe, Fe.message)
        }, ot(Fe.message), y && (Ne[xe] = Ve));
      }
      if (!Aa(Ve) && (Ne[xe] = {
        ref: Ie,
        ...Ve
      }, !y))
        return Ne;
    }
  }
  return ot(!0), Ne;
};
function Fk(h, C) {
  const y = C.slice(0, -1).length;
  let L = 0;
  for (; L < y; )
    h = zn(h) ? L++ : h[C[L++]];
  return h;
}
function Hk(h) {
  for (const C in h)
    if (h.hasOwnProperty(C) && !zn(h[C]))
      return !1;
  return !0;
}
function sr(h, C) {
  const y = Array.isArray(C) ? C : K0(C) ? [C] : nR(C), L = y.length === 1 ? h : Fk(h, y), P = y.length - 1, k = y[P];
  return L && delete L[k], P !== 0 && (Gn(L) && Aa(L) || Array.isArray(L) && Hk(L)) && sr(h, y.slice(0, -1)), h;
}
var $0 = () => {
  let h = [];
  return {
    get observers() {
      return h;
    },
    next: (P) => {
      for (const k of h)
        k.next && k.next(P);
    },
    subscribe: (P) => (h.push(P), {
      unsubscribe: () => {
        h = h.filter((k) => k !== P);
      }
    }),
    unsubscribe: () => {
      h = [];
    }
  };
}, oy = (h) => sa(h) || !tR(h);
function Eo(h, C) {
  if (oy(h) || oy(C))
    return h === C;
  if (Mf(h) && Mf(C))
    return h.getTime() === C.getTime();
  const y = Object.keys(h), L = Object.keys(C);
  if (y.length !== L.length)
    return !1;
  for (const P of y) {
    const k = h[P];
    if (!L.includes(P))
      return !1;
    if (P !== "ref") {
      const S = C[P];
      if (Mf(k) && Mf(S) || Gn(k) && Gn(S) || Array.isArray(k) && Array.isArray(S) ? !Eo(k, S) : k !== S)
        return !1;
    }
  }
  return !0;
}
var uR = (h) => h.type === "select-multiple", Vk = (h) => J0(h) || qp(h), Y0 = (h) => ly(h) && h.isConnected, oR = (h) => {
  for (const C in h)
    if (ou(h[C]))
      return !0;
  return !1;
};
function sy(h, C = {}) {
  const y = Array.isArray(h);
  if (Gn(h) || y)
    for (const L in h)
      Array.isArray(h[L]) || Gn(h[L]) && !oR(h[L]) ? (C[L] = Array.isArray(h[L]) ? [] : {}, sy(h[L], C[L])) : sa(h[L]) || (C[L] = !0);
  return C;
}
function sR(h, C, y) {
  const L = Array.isArray(h);
  if (Gn(h) || L)
    for (const P in h)
      Array.isArray(h[P]) || Gn(h[P]) && !oR(h[P]) ? zn(C) || oy(y[P]) ? y[P] = Array.isArray(h[P]) ? sy(h[P], []) : { ...sy(h[P]) } : sR(h[P], sa(C) ? {} : C[P], y[P]) : y[P] = !Eo(h[P], C[P]);
  return y;
}
var ay = (h, C) => sR(h, C, sy(C)), cR = (h, { valueAsNumber: C, valueAsDate: y, setValueAs: L }) => zn(h) ? h : C ? h === "" ? NaN : h && +h : y && yl(h) ? new Date(h) : L ? L(h) : h;
function I0(h) {
  const C = h.ref;
  if (!(h.refs ? h.refs.every((y) => y.disabled) : C.disabled))
    return Z0(C) ? C.files : J0(C) ? lR(h.refs).value : uR(C) ? [...C.selectedOptions].map(({ value: y }) => y) : qp(C) ? iR(h.refs).value : cR(zn(C.value) ? h.ref.value : C.value, h);
}
var jk = (h, C, y, L) => {
  const P = {};
  for (const k of h) {
    const S = be(C, k);
    S && ln(P, k, S._f);
  }
  return {
    criteriaMode: y,
    names: [...h],
    fields: P,
    shouldUseNativeValidation: L
  };
}, Qp = (h) => zn(h) ? h : uy(h) ? h.source : Gn(h) ? uy(h.value) ? h.value.source : h.value : h;
const KT = "AsyncFunction";
var Bk = (h) => (!h || !h.validate) && !!(ou(h.validate) && h.validate.constructor.name === KT || Gn(h.validate) && Object.values(h.validate).find((C) => C.constructor.name === KT)), Pk = (h) => h.mount && (h.required || h.min || h.max || h.maxLength || h.minLength || h.pattern || h.validate);
function ZT(h, C, y) {
  const L = be(h, y);
  if (L || K0(y))
    return {
      error: L,
      name: y
    };
  const P = y.split(".");
  for (; P.length; ) {
    const k = P.join("."), S = be(C, k), te = be(h, k);
    if (S && !Array.isArray(S) && y !== k)
      return { name: y };
    if (te && te.type)
      return {
        name: k,
        error: te
      };
    P.pop();
  }
  return {
    name: y
  };
}
var $k = (h, C, y, L, P) => P.isOnAll ? !1 : !y && P.isOnTouch ? !(C || h) : (y ? L.isOnBlur : P.isOnBlur) ? !h : (y ? L.isOnChange : P.isOnChange) ? h : !0, Yk = (h, C) => !cy(be(h, C)).length && sr(h, C);
const Ik = {
  mode: Vi.onSubmit,
  reValidateMode: Vi.onChange,
  shouldFocusError: !0
};
function Qk(h = {}) {
  let C = {
    ...Ik,
    ...h
  }, y = {
    submitCount: 0,
    isDirty: !1,
    isLoading: ou(C.defaultValues),
    isValidating: !1,
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    touchedFields: {},
    dirtyFields: {},
    validatingFields: {},
    errors: C.errors || {},
    disabled: C.disabled || !1
  }, L = {}, P = Gn(C.defaultValues) || Gn(C.values) ? Ga(C.defaultValues || C.values) || {} : {}, k = C.shouldUnregister ? {} : Ga(P), S = {
    action: !1,
    mount: !1,
    watch: !1
  }, te = {
    mount: /* @__PURE__ */ new Set(),
    unMount: /* @__PURE__ */ new Set(),
    array: /* @__PURE__ */ new Set(),
    watch: /* @__PURE__ */ new Set()
  }, ne, se = 0;
  const De = {
    isDirty: !1,
    dirtyFields: !1,
    validatingFields: !1,
    touchedFields: !1,
    isValidating: !1,
    isValid: !1,
    errors: !1
  }, Y = {
    values: $0(),
    array: $0(),
    state: $0()
  }, ce = YT(C.mode), ie = YT(C.reValidateMode), xe = C.criteriaMode === Vi.all, Ze = (x) => (U) => {
    clearTimeout(se), se = setTimeout(x, U);
  }, Ge = async (x) => {
    if (De.isValid || x) {
      const U = C.resolver ? Aa((await Yt()).errors) : await pt(L, !0);
      U !== y.isValid && Y.state.next({
        isValid: U
      });
    }
  }, wt = (x, U) => {
    (De.isValidating || De.validatingFields) && ((x || Array.from(te.mount)).forEach((V) => {
      V && (U ? ln(y.validatingFields, V, U) : sr(y.validatingFields, V));
    }), Y.state.next({
      validatingFields: y.validatingFields,
      isValidating: !Aa(y.validatingFields)
    }));
  }, Ee = (x, U = [], V, re, Z = !0, q = !0) => {
    if (re && V) {
      if (S.action = !0, q && Array.isArray(be(L, x))) {
        const Se = V(be(L, x), re.argA, re.argB);
        Z && ln(L, x, Se);
      }
      if (q && Array.isArray(be(y.errors, x))) {
        const Se = V(be(y.errors, x), re.argA, re.argB);
        Z && ln(y.errors, x, Se), Yk(y.errors, x);
      }
      if (De.touchedFields && q && Array.isArray(be(y.touchedFields, x))) {
        const Se = V(be(y.touchedFields, x), re.argA, re.argB);
        Z && ln(y.touchedFields, x, Se);
      }
      De.dirtyFields && (y.dirtyFields = ay(P, k)), Y.state.next({
        name: x,
        isDirty: Ve(x, U),
        dirtyFields: y.dirtyFields,
        errors: y.errors,
        isValid: y.isValid
      });
    } else
      ln(k, x, U);
  }, Ie = (x, U) => {
    ln(y.errors, x, U), Y.state.next({
      errors: y.errors
    });
  }, ot = (x) => {
    y.errors = x, Y.state.next({
      errors: y.errors,
      isValid: !1
    });
  }, Ne = (x, U, V, re) => {
    const Z = be(L, x);
    if (Z) {
      const q = be(k, x, zn(V) ? be(P, x) : V);
      zn(q) || re && re.defaultChecked || U ? ln(k, x, U ? q : I0(Z._f)) : vt(x, q), S.mount && Ge();
    }
  }, Ct = (x, U, V, re, Z) => {
    let q = !1, Se = !1;
    const Je = {
      name: x
    }, _t = !!(be(L, x) && be(L, x)._f && be(L, x)._f.disabled);
    if (!V || re) {
      De.isDirty && (Se = y.isDirty, y.isDirty = Je.isDirty = Ve(), q = Se !== Je.isDirty);
      const at = _t || Eo(be(P, x), U);
      Se = !!(!_t && be(y.dirtyFields, x)), at || _t ? sr(y.dirtyFields, x) : ln(y.dirtyFields, x, !0), Je.dirtyFields = y.dirtyFields, q = q || De.dirtyFields && Se !== !at;
    }
    if (V) {
      const at = be(y.touchedFields, x);
      at || (ln(y.touchedFields, x, V), Je.touchedFields = y.touchedFields, q = q || De.touchedFields && at !== V);
    }
    return q && Z && Y.state.next(Je), q ? Je : {};
  }, Xe = (x, U, V, re) => {
    const Z = be(y.errors, x), q = De.isValid && ml(U) && y.isValid !== U;
    if (h.delayError && V ? (ne = Ze(() => Ie(x, V)), ne(h.delayError)) : (clearTimeout(se), ne = null, V ? ln(y.errors, x, V) : sr(y.errors, x)), (V ? !Eo(Z, V) : Z) || !Aa(re) || q) {
      const Se = {
        ...re,
        ...q && ml(U) ? { isValid: U } : {},
        errors: y.errors,
        name: x
      };
      y = {
        ...y,
        ...Se
      }, Y.state.next(Se);
    }
  }, Yt = async (x) => {
    wt(x, !0);
    const U = await C.resolver(k, C.context, jk(x || te.mount, L, C.criteriaMode, C.shouldUseNativeValidation));
    return wt(x), U;
  }, Jt = async (x) => {
    const { errors: U } = await Yt(x);
    if (x)
      for (const V of x) {
        const re = be(U, V);
        re ? ln(y.errors, V, re) : sr(y.errors, V);
      }
    else
      y.errors = U;
    return U;
  }, pt = async (x, U, V = {
    valid: !0
  }) => {
    for (const re in x) {
      const Z = x[re];
      if (Z) {
        const { _f: q, ...Se } = Z;
        if (q) {
          const Je = te.array.has(q.name), _t = Z._f && Bk(Z._f);
          _t && De.validatingFields && wt([re], !0);
          const at = await XT(Z, k, xe, C.shouldUseNativeValidation && !U, Je);
          if (_t && De.validatingFields && wt([re]), at[q.name] && (V.valid = !1, U))
            break;
          !U && (be(at, q.name) ? Je ? Ak(y.errors, at, q.name) : ln(y.errors, q.name, at[q.name]) : sr(y.errors, q.name));
        }
        !Aa(Se) && await pt(Se, U, V);
      }
    }
    return V.valid;
  }, Et = () => {
    for (const x of te.unMount) {
      const U = be(L, x);
      U && (U._f.refs ? U._f.refs.every((V) => !Y0(V)) : !Y0(U._f.ref)) && en(x);
    }
    te.unMount = /* @__PURE__ */ new Set();
  }, Ve = (x, U) => (x && U && ln(k, x, U), !Eo(ht(), P)), fe = (x, U, V) => aR(x, te, {
    ...S.mount ? k : zn(U) ? P : yl(x) ? { [x]: U } : U
  }, V, U), Fe = (x) => cy(be(S.mount ? k : P, x, h.shouldUnregister ? be(P, x, []) : [])), vt = (x, U, V = {}) => {
    const re = be(L, x);
    let Z = U;
    if (re) {
      const q = re._f;
      q && (!q.disabled && ln(k, x, cR(U, q)), Z = ly(q.ref) && sa(U) ? "" : U, uR(q.ref) ? [...q.ref.options].forEach((Se) => Se.selected = Z.includes(Se.value)) : q.refs ? qp(q.ref) ? q.refs.length > 1 ? q.refs.forEach((Se) => (!Se.defaultChecked || !Se.disabled) && (Se.checked = Array.isArray(Z) ? !!Z.find((Je) => Je === Se.value) : Z === Se.value)) : q.refs[0] && (q.refs[0].checked = !!Z) : q.refs.forEach((Se) => Se.checked = Se.value === Z) : Z0(q.ref) ? q.ref.value = "" : (q.ref.value = Z, q.ref.type || Y.values.next({
        name: x,
        values: { ...k }
      })));
    }
    (V.shouldDirty || V.shouldTouch) && Ct(x, Z, V.shouldTouch, V.shouldDirty, !0), V.shouldValidate && de(x);
  }, st = (x, U, V) => {
    for (const re in U) {
      const Z = U[re], q = `${x}.${re}`, Se = be(L, q);
      (te.array.has(x) || !oy(Z) || Se && !Se._f) && !Mf(Z) ? st(q, Z, V) : vt(q, Z, V);
    }
  }, Ut = (x, U, V = {}) => {
    const re = be(L, x), Z = te.array.has(x), q = Ga(U);
    ln(k, x, q), Z ? (Y.array.next({
      name: x,
      values: { ...k }
    }), (De.isDirty || De.dirtyFields) && V.shouldDirty && Y.state.next({
      name: x,
      dirtyFields: ay(P, k),
      isDirty: Ve(x, q)
    })) : re && !re._f && !sa(q) ? st(x, q, V) : vt(x, q, V), IT(x, te) && Y.state.next({ ...y }), Y.values.next({
      name: S.mount ? x : void 0,
      values: { ...k }
    });
  }, ee = async (x) => {
    S.mount = !0;
    const U = x.target;
    let V = U.name, re = !0;
    const Z = be(L, V), q = () => U.type ? I0(Z._f) : wk(x), Se = (Je) => {
      re = Number.isNaN(Je) || Eo(Je, be(k, V, Je));
    };
    if (Z) {
      let Je, _t;
      const at = q(), dn = x.type === $T.BLUR || x.type === $T.FOCUS_OUT, qa = !Pk(Z._f) && !C.resolver && !be(y.errors, V) && !Z._f.deps || $k(dn, be(y.touchedFields, V), y.isSubmitted, ie, ce), gr = IT(V, te, dn);
      ln(k, V, at), dn ? (Z._f.onBlur && Z._f.onBlur(x), ne && ne(0)) : Z._f.onChange && Z._f.onChange(x);
      const ae = Ct(V, at, dn, !1), Ue = !Aa(ae) || gr;
      if (!dn && Y.values.next({
        name: V,
        type: x.type,
        values: { ...k }
      }), qa)
        return De.isValid && (h.mode === "onBlur" ? dn && Ge() : Ge()), Ue && Y.state.next({ name: V, ...gr ? {} : ae });
      if (!dn && gr && Y.state.next({ ...y }), C.resolver) {
        const { errors: rt } = await Yt([V]);
        if (Se(at), re) {
          const bt = ZT(y.errors, L, V), jt = ZT(rt, L, bt.name || V);
          Je = jt.error, V = jt.name, _t = Aa(rt);
        }
      } else
        wt([V], !0), Je = (await XT(Z, k, xe, C.shouldUseNativeValidation))[V], wt([V]), Se(at), re && (Je ? _t = !1 : De.isValid && (_t = await pt(L, !0)));
      re && (Z._f.deps && de(Z._f.deps), Xe(V, _t, Je, ae));
    }
  }, Oe = (x, U) => {
    if (be(y.errors, U) && x.focus)
      return x.focus(), 1;
  }, de = async (x, U = {}) => {
    let V, re;
    const Z = Wp(x);
    if (C.resolver) {
      const q = await Jt(zn(x) ? x : Z);
      V = Aa(q), re = x ? !Z.some((Se) => be(q, Se)) : V;
    } else x ? (re = (await Promise.all(Z.map(async (q) => {
      const Se = be(L, q);
      return await pt(Se && Se._f ? { [q]: Se } : Se);
    }))).every(Boolean), !(!re && !y.isValid) && Ge()) : re = V = await pt(L);
    return Y.state.next({
      ...!yl(x) || De.isValid && V !== y.isValid ? {} : { name: x },
      ...C.resolver || !x ? { isValid: V } : {},
      errors: y.errors
    }), U.shouldFocus && !re && Gp(L, Oe, x ? Z : te.mount), re;
  }, ht = (x) => {
    const U = {
      ...S.mount ? k : P
    };
    return zn(x) ? U : yl(x) ? be(U, x) : x.map((V) => be(U, V));
  }, gt = (x, U) => ({
    invalid: !!be((U || y).errors, x),
    isDirty: !!be((U || y).dirtyFields, x),
    error: be((U || y).errors, x),
    isValidating: !!be(y.validatingFields, x),
    isTouched: !!be((U || y).touchedFields, x)
  }), bn = (x) => {
    x && Wp(x).forEach((U) => sr(y.errors, U)), Y.state.next({
      errors: x ? y.errors : {}
    });
  }, An = (x, U, V) => {
    const re = (be(L, x, { _f: {} })._f || {}).ref, Z = be(y.errors, x) || {}, { ref: q, message: Se, type: Je, ..._t } = Z;
    ln(y.errors, x, {
      ..._t,
      ...U,
      ref: re
    }), Y.state.next({
      name: x,
      errors: y.errors,
      isValid: !1
    }), V && V.shouldFocus && re && re.focus && re.focus();
  }, ca = (x, U) => ou(x) ? Y.values.subscribe({
    next: (V) => x(fe(void 0, U), V)
  }) : fe(x, U, !0), en = (x, U = {}) => {
    for (const V of x ? Wp(x) : te.mount)
      te.mount.delete(V), te.array.delete(V), U.keepValue || (sr(L, V), sr(k, V)), !U.keepError && sr(y.errors, V), !U.keepDirty && sr(y.dirtyFields, V), !U.keepTouched && sr(y.touchedFields, V), !U.keepIsValidating && sr(y.validatingFields, V), !C.shouldUnregister && !U.keepDefaultValue && sr(P, V);
    Y.values.next({
      values: { ...k }
    }), Y.state.next({
      ...y,
      ...U.keepDirty ? { isDirty: Ve() } : {}
    }), !U.keepIsValid && Ge();
  }, yr = ({ disabled: x, name: U, field: V, fields: re, value: Z }) => {
    if (ml(x) && S.mount || x) {
      const q = x ? void 0 : zn(Z) ? I0(V ? V._f : be(re, U)._f) : Z;
      ln(k, U, q), Ct(U, q, !1, !1, !0);
    }
  }, gn = (x, U = {}) => {
    let V = be(L, x);
    const re = ml(U.disabled) || ml(h.disabled);
    return ln(L, x, {
      ...V || {},
      _f: {
        ...V && V._f ? V._f : { ref: { name: x } },
        name: x,
        mount: !0,
        ...U
      }
    }), te.mount.add(x), V ? yr({
      field: V,
      disabled: ml(U.disabled) ? U.disabled : h.disabled,
      name: x,
      value: U.value
    }) : Ne(x, !0, U.value), {
      ...re ? { disabled: U.disabled || h.disabled } : {},
      ...C.progressive ? {
        required: !!U.required,
        min: Qp(U.min),
        max: Qp(U.max),
        minLength: Qp(U.minLength),
        maxLength: Qp(U.maxLength),
        pattern: Qp(U.pattern)
      } : {},
      name: x,
      onChange: ee,
      onBlur: ee,
      ref: (Z) => {
        if (Z) {
          gn(x, U), V = be(L, x);
          const q = zn(Z.value) && Z.querySelectorAll && Z.querySelectorAll("input,select,textarea")[0] || Z, Se = Vk(q), Je = V._f.refs || [];
          if (Se ? Je.find((_t) => _t === q) : q === V._f.ref)
            return;
          ln(L, x, {
            _f: {
              ...V._f,
              ...Se ? {
                refs: [
                  ...Je.filter(Y0),
                  q,
                  ...Array.isArray(be(P, x)) ? [{}] : []
                ],
                ref: { type: q.type, name: x }
              } : { ref: q }
            }
          }), Ne(x, !1, void 0, q);
        } else
          V = be(L, x, {}), V._f && (V._f.mount = !1), (C.shouldUnregister || U.shouldUnregister) && !(Dk(te.array, x) && S.action) && te.unMount.add(x);
      }
    };
  }, qn = () => C.shouldFocusError && Gp(L, Oe, te.mount), fa = (x) => {
    ml(x) && (Y.state.next({ disabled: x }), Gp(L, (U, V) => {
      const re = be(L, V);
      re && (U.disabled = re._f.disabled || x, Array.isArray(re._f.refs) && re._f.refs.forEach((Z) => {
        Z.disabled = re._f.disabled || x;
      }));
    }, 0, !1));
  }, Xn = (x, U) => async (V) => {
    let re;
    V && (V.preventDefault && V.preventDefault(), V.persist && V.persist());
    let Z = Ga(k);
    if (Y.state.next({
      isSubmitting: !0
    }), C.resolver) {
      const { errors: q, values: Se } = await Yt();
      y.errors = q, Z = Se;
    } else
      await pt(L);
    if (sr(y.errors, "root"), Aa(y.errors)) {
      Y.state.next({
        errors: {}
      });
      try {
        await x(Z, V);
      } catch (q) {
        re = q;
      }
    } else
      U && await U({ ...y.errors }, V), qn(), setTimeout(qn);
    if (Y.state.next({
      isSubmitted: !0,
      isSubmitting: !1,
      isSubmitSuccessful: Aa(y.errors) && !re,
      submitCount: y.submitCount + 1,
      errors: y.errors
    }), re)
      throw re;
  }, kr = (x, U = {}) => {
    be(L, x) && (zn(U.defaultValue) ? Ut(x, Ga(be(P, x))) : (Ut(x, U.defaultValue), ln(P, x, Ga(U.defaultValue))), U.keepTouched || sr(y.touchedFields, x), U.keepDirty || (sr(y.dirtyFields, x), y.isDirty = U.defaultValue ? Ve(x, Ga(be(P, x))) : Ve()), U.keepError || (sr(y.errors, x), De.isValid && Ge()), Y.state.next({ ...y }));
  }, fn = (x, U = {}) => {
    const V = x ? Ga(x) : P, re = Ga(V), Z = Aa(x), q = Z ? P : re;
    if (U.keepDefaultValues || (P = V), !U.keepValues) {
      if (U.keepDirtyValues)
        for (const Se of te.mount)
          be(y.dirtyFields, Se) ? ln(q, Se, be(k, Se)) : Ut(Se, be(q, Se));
      else {
        if (X0 && zn(x))
          for (const Se of te.mount) {
            const Je = be(L, Se);
            if (Je && Je._f) {
              const _t = Array.isArray(Je._f.refs) ? Je._f.refs[0] : Je._f.ref;
              if (ly(_t)) {
                const at = _t.closest("form");
                if (at) {
                  at.reset();
                  break;
                }
              }
            }
          }
        L = {};
      }
      k = h.shouldUnregister ? U.keepDefaultValues ? Ga(P) : {} : Ga(q), Y.array.next({
        values: { ...q }
      }), Y.values.next({
        values: { ...q }
      });
    }
    te = {
      mount: U.keepDirtyValues ? te.mount : /* @__PURE__ */ new Set(),
      unMount: /* @__PURE__ */ new Set(),
      array: /* @__PURE__ */ new Set(),
      watch: /* @__PURE__ */ new Set(),
      watchAll: !1,
      focus: ""
    }, S.mount = !De.isValid || !!U.keepIsValid || !!U.keepDirtyValues, S.watch = !!h.shouldUnregister, Y.state.next({
      submitCount: U.keepSubmitCount ? y.submitCount : 0,
      isDirty: Z ? !1 : U.keepDirty ? y.isDirty : !!(U.keepDefaultValues && !Eo(x, P)),
      isSubmitted: U.keepIsSubmitted ? y.isSubmitted : !1,
      dirtyFields: Z ? {} : U.keepDirtyValues ? U.keepDefaultValues && k ? ay(P, k) : y.dirtyFields : U.keepDefaultValues && x ? ay(P, x) : U.keepDirty ? y.dirtyFields : {},
      touchedFields: U.keepTouched ? y.touchedFields : {},
      errors: U.keepErrors ? y.errors : {},
      isSubmitSuccessful: U.keepIsSubmitSuccessful ? y.isSubmitSuccessful : !1,
      isSubmitting: !1
    });
  }, Dn = (x, U) => fn(ou(x) ? x(k) : x, U);
  return {
    control: {
      register: gn,
      unregister: en,
      getFieldState: gt,
      handleSubmit: Xn,
      setError: An,
      _executeSchema: Yt,
      _getWatch: fe,
      _getDirty: Ve,
      _updateValid: Ge,
      _removeUnmounted: Et,
      _updateFieldArray: Ee,
      _updateDisabledField: yr,
      _getFieldArray: Fe,
      _reset: fn,
      _resetDefaultValues: () => ou(C.defaultValues) && C.defaultValues().then((x) => {
        Dn(x, C.resetOptions), Y.state.next({
          isLoading: !1
        });
      }),
      _updateFormState: (x) => {
        y = {
          ...y,
          ...x
        };
      },
      _disableForm: fa,
      _subjects: Y,
      _proxyFormState: De,
      _setErrors: ot,
      get _fields() {
        return L;
      },
      get _formValues() {
        return k;
      },
      get _state() {
        return S;
      },
      set _state(x) {
        S = x;
      },
      get _defaultValues() {
        return P;
      },
      get _names() {
        return te;
      },
      set _names(x) {
        te = x;
      },
      get _formState() {
        return y;
      },
      set _formState(x) {
        y = x;
      },
      get _options() {
        return C;
      },
      set _options(x) {
        C = {
          ...C,
          ...x
        };
      }
    },
    trigger: de,
    register: gn,
    handleSubmit: Xn,
    watch: ca,
    setValue: Ut,
    getValues: ht,
    reset: Dn,
    resetField: kr,
    clearErrors: bn,
    unregister: en,
    setError: An,
    setFocus: (x, U = {}) => {
      const V = be(L, x), re = V && V._f;
      if (re) {
        const Z = re.refs ? re.refs[0] : re.ref;
        Z.focus && (Z.focus(), U.shouldSelect && Z.select());
      }
    },
    getFieldState: gt
  };
}
function Wk(h = {}) {
  const C = wn.useRef(), y = wn.useRef(), [L, P] = wn.useState({
    isDirty: !1,
    isValidating: !1,
    isLoading: ou(h.defaultValues),
    isSubmitted: !1,
    isSubmitting: !1,
    isSubmitSuccessful: !1,
    isValid: !1,
    submitCount: 0,
    dirtyFields: {},
    touchedFields: {},
    validatingFields: {},
    errors: h.errors || {},
    disabled: h.disabled || !1,
    defaultValues: ou(h.defaultValues) ? void 0 : h.defaultValues
  });
  C.current || (C.current = {
    ...Qk(h),
    formState: L
  });
  const k = C.current.control;
  return k._options = h, rR({
    subject: k._subjects.state,
    next: (S) => {
      Mk(S, k._proxyFormState, k._updateFormState) && P({ ...k._formState });
    }
  }), wn.useEffect(() => k._disableForm(h.disabled), [k, h.disabled]), wn.useEffect(() => {
    if (k._proxyFormState.isDirty) {
      const S = k._getDirty();
      S !== L.isDirty && k._subjects.state.next({
        isDirty: S
      });
    }
  }, [k, L.isDirty]), wn.useEffect(() => {
    h.values && !Eo(h.values, y.current) ? (k._reset(h.values, k._options.resetOptions), y.current = h.values, P((S) => ({ ...S }))) : k._resetDefaultValues();
  }, [h.values, k]), wn.useEffect(() => {
    h.errors && k._setErrors(h.errors);
  }, [h.errors, k]), wn.useEffect(() => {
    k._state.mount || (k._updateValid(), k._state.mount = !0), k._state.watch && (k._state.watch = !1, k._subjects.state.next({ ...k._formState })), k._removeUnmounted();
  }), wn.useEffect(() => {
    h.shouldUnregister && k._subjects.values.next({
      values: k._getWatch()
    });
  }, [h.shouldUnregister, k]), C.current.formState = Lk(L, k), C.current;
}
const Gk = ({ handleOnSubmit: h }) => {
  const {
    register: C,
    handleSubmit: y,
    formState: { errors: L },
    control: P
  } = Wk(), k = (te) => {
    console.log("Internal submit from Form component:", te), h(te);
    const ne = { type: "onSubmitForm", payload: te };
    window.postMessage(ne, window.location.origin);
  }, S = Uk({ control: P, name: "name" });
  return ek(() => {
    console.log("useEffect name updated", S);
  }, [S]), /* @__PURE__ */ xn.jsxs("form", { onSubmit: y(k), children: [
    /* @__PURE__ */ xn.jsxs("div", { children: [
      /* @__PURE__ */ xn.jsx("label", { htmlFor: "name", children: "Nombre:" }),
      /* @__PURE__ */ xn.jsx(
        "input",
        {
          id: "name",
          type: "text",
          ...C("name", { required: "Este campo es requerido" })
        }
      ),
      L.name && /* @__PURE__ */ xn.jsx("span", { children: L.name.message })
    ] }),
    /* @__PURE__ */ xn.jsxs("div", { children: [
      /* @__PURE__ */ xn.jsx("label", { htmlFor: "email", children: "Correo Electrónico:" }),
      /* @__PURE__ */ xn.jsx(
        "input",
        {
          id: "email",
          type: "email",
          ...C("email", {
            required: "Este campo es requerido",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Formato de correo electrónico no válido"
            }
          })
        }
      ),
      L.email && /* @__PURE__ */ xn.jsx("span", { children: L.email.message })
    ] }),
    /* @__PURE__ */ xn.jsx("button", { type: "submit", children: "Enviar" })
  ] });
}, fR = {
  "form-container": "_form-container_cx8oy_1",
  "cs-input": "_cs-input_cx8oy_49"
}, qk = ({
  id: h,
  name: C,
  label: y,
  placeholder: L,
  value: P,
  onChange: k,
  required: S
}) => /* @__PURE__ */ xn.jsxs("div", { className: fR["cs-input"], children: [
  /* @__PURE__ */ xn.jsx(
    "input",
    {
      type: "text",
      id: h,
      name: C,
      placeholder: L,
      value: P,
      onChange: (te) => k && k(te.target.value),
      required: S
    }
  ),
  y && /* @__PURE__ */ xn.jsx("label", { htmlFor: h, style: { marginRight: 8 }, children: y })
] }), Xk = ({
  fields: h,
  // layout,
  // gridTemplateColumns,
  onSubmit: C
}) => {
  const [y, L] = tk({}), P = (k) => {
    k.preventDefault(), C(y);
  };
  return /* @__PURE__ */ xn.jsxs("form", { onSubmit: P, className: fR["form-container"], children: [
    h.map((k, S) => {
      switch (k.type) {
        case "text":
          return /* @__PURE__ */ xn.jsx(
            qk,
            {
              id: k.id,
              name: k.name,
              label: k.label,
              placeholder: k.placeholder,
              required: !0,
              value: y[k.name],
              onChange: (te) => {
                L((ne) => ({ ...ne, [k.name]: te }));
              }
            },
            S
          );
        default:
          return null;
      }
    }),
    /* @__PURE__ */ xn.jsx("button", { type: "submit", children: "Submit" })
  ] });
}, Kk = ({ formConfig: h, onSubmit: C }) => /* @__PURE__ */ xn.jsx(
  Xk,
  {
    fields: h.fields,
    layout: h.layout,
    gridTemplateColumns: h.gridTemplateColumns,
    onSubmit: C
  }
);
customElements.define(
  "rwc-header",
  q0(xk, {
    props: { text: "string", image: "string" }
  })
);
customElements.define(
  "rwc-form",
  q0(Gk, {
    props: { handleOnSubmit: "function" }
  })
);
customElements.define(
  "rwc-dinamyc-form",
  q0(Kk, {
    props: { formConfig: "json", onSubmit: "function" }
  })
);
export {
  Gk as Form,
  xk as Header,
  Kk as WrapperForm
};
